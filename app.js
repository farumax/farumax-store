
const products = [
{id:1,name:"Wireless Bluetooth Headphones",category:"Electronics",price:7490,emoji:"🎧",image:"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700"},
{id:2,name:"Smart Watch Series",category:"Electronics",price:12990,emoji:"⌚",image:"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700"},
{id:3,name:"Everyday Backpack",category:"Fashion",price:5490,emoji:"🎒",image:"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700"},
{id:4,name:"Classic Sneakers",category:"Fashion",price:8990,emoji:"👟",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700"},
{id:5,name:"Coffee Maker",category:"Home",price:15990,emoji:"☕",image:"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700"},
{id:6,name:"Desk Lamp",category:"Home",price:4290,emoji:"💡",image:"https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700"},
{id:7,name:"Organic Grocery Box",category:"Groceries",price:3250,emoji:"🥑",image:"https://images.unsplash.com/photo-1542838132-92c53300491e?w=700"},
{id:8,name:"Skincare Essentials Set",category:"Beauty",price:6250,emoji:"🧴",image:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=700"},
{id:9,name:"Football Training Ball",category:"Sports",price:3990,emoji:"⚽",image:"https://images.unsplash.com/photo-1614632537423-1e6c2e7e0c4e?w=700"},
{id:10,name:"Portable Speaker",category:"Electronics",price:6850,emoji:"🔊",image:"https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700"},
{id:11,name:"Ceramic Dinner Set",category:"Home",price:7850,emoji:"🍽️",image:"https://images.unsplash.com/photo-1603199506016-b9a594b593c0?w=700"},
{id:12,name:"Daily Care Bundle",category:"Beauty",price:2890,emoji:"✨",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700"}
];

// Set an adult-managed store WhatsApp number here.
// Country code included; do not use + or spaces.
const STORE_WHATSAPP = "94753777492";

const categories = [
["All","✦"],["Electronics","⌁"],["Fashion","✧"],
["Groceries","♧"],["Home","⌂"],["Beauty","❀"],["Sports","⚽"]
];

let activeCategory = "All";
let cart = JSON.parse(localStorage.getItem("farumax_cart") || "[]");

const $ = s => document.querySelector(s);
const money = n => "LKR " + Number(n).toLocaleString("en-LK");

function toast(msg) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2300);
}

function renderCategories() {
  $("#categories").innerHTML = categories.map(([n,e]) =>
    `<button class="category ${activeCategory===n?"active":""}" data-category="${n}">
      <span class="emoji">${e}</span>
      <span>${n==="All"?"All products":n}</span>
    </button>`
  ).join("");

  document.querySelectorAll("[data-category]").forEach(b => {
    b.onclick = () => {
      activeCategory = b.dataset.category;
      $("#productHeading").textContent =
        activeCategory==="All" ? "Popular right now" : activeCategory;
      renderCategories();
      renderProducts();
    };
  });
}

function renderProducts() {
  const q = $("#searchInput").value.toLowerCase();

  let list = products.filter(p =>
    (activeCategory==="All" || p.category===activeCategory) &&
    (p.name+" "+p.category).toLowerCase().includes(q)
  );

  const sort = $("#sortSelect").value;
  if (sort==="low") list.sort((a,b)=>a.price-b.price);
  if (sort==="high") list.sort((a,b)=>b.price-a.price);
  if (sort==="name") list.sort((a,b)=>a.name.localeCompare(b.name));

  $("#productGrid").innerHTML = list.map(p => `
    <article class="product-card">
      <div class="product-image" data-detail="${p.id}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.remove()">
        <span class="product-placeholder">${p.emoji}</span>
      </div>
      <div class="product-info">
        <span class="product-category">${p.category}</span>
        <h3>${p.name}</h3>
        <div class="product-foot">
          <span class="price">${money(p.price)}</span>
          <button class="add-btn" data-add="${p.id}">＋ Add</button>
        </div>
      </div>
    </article>
  `).join("");

  $("#emptyState").classList.toggle("hidden",list.length>0);

  document.querySelectorAll("[data-add]").forEach(b =>
    b.onclick = () => add(Number(b.dataset.add))
  );

  document.querySelectorAll("[data-detail]").forEach(b =>
    b.onclick = () => showDetail(Number(b.dataset.detail))
  );
}

function persist() {
  localStorage.setItem("farumax_cart",JSON.stringify(cart));
  $("#cartCount").textContent = cart.reduce((s,x)=>s+x.qty,0);
  renderCart();
}

function add(id) {
  const x = cart.find(x=>x.id===id);
  if (x) x.qty++;
  else cart.push({id,qty:1});
  persist();
  toast("Added to your bag");
}

function changeQty(id,d) {
  const x = cart.find(x=>x.id===id);
  if (x) x.qty += d;
  cart = cart.filter(x=>x.qty>0);
  persist();
}

function renderCart() {
  let total = 0;

  $("#cartItems").innerHTML = cart.length ? cart.map(x => {
    const p = products.find(p=>p.id===x.id);
    total += p.price*x.qty;

    return `
      <div class="cart-row">
        <div class="cart-thumb">${p.emoji}</div>
        <div>
          <h4>${p.name}</h4>
          <small>${money(p.price)}</small>
          <div class="qty">
            <button data-qty="${p.id}" data-d="-1">−</button>
            ${x.qty}
            <button data-qty="${p.id}" data-d="1">+</button>
          </div>
        </div>
        <button class="remove" data-remove="${p.id}">Remove</button>
      </div>
    `;
  }).join("") : '<p class="muted">Your bag is empty. Find something you love.</p>';

  $("#cartTotal").textContent = money(total);

  document.querySelectorAll("[data-qty]").forEach(b =>
    b.onclick = () => changeQty(Number(b.dataset.qty),Number(b.dataset.d))
  );

  document.querySelectorAll("[data-remove]").forEach(b =>
    b.onclick = () => {
      cart = cart.filter(x=>x.id!==Number(b.dataset.remove));
      persist();
    }
  );

  $("#checkoutBtn").disabled = !cart.length;
  $("#checkoutBtn").style.opacity = cart.length ? 1 : .5;
}

function showDetail(id) {
  const p = products.find(x=>x.id===id);

  $("#productDetail").innerHTML = `
    <div class="detail-image">${p.emoji}</div>
    <p class="eyebrow">${p.category}</p>
    <h2>${p.name}</h2>
    <h3>${money(p.price)}</h3>
    <p class="muted">A selected FARUMAX demo product. Contact the store to confirm availability, delivery and final price.</p>
    <button class="primary-btn full" id="detailAdd">Add to bag</button>
  `;

  $("#productOverlay").classList.remove("hidden");

  $("#detailAdd").onclick = () => {
    add(id);
    $("#productOverlay").classList.add("hidden");
  };
}

function open(id) {
  $("#" + id).classList.remove("hidden");
}

function close(id) {
  $("#" + id).classList.add("hidden");
}

$("#cartBtn").onclick = () => open("cartOverlay");

$("#checkoutBtn").onclick = () => {
  close("cartOverlay");
  open("checkoutOverlay");
};

document.querySelectorAll("[data-close]").forEach(b =>
  b.onclick = () => close(b.dataset.close)
);

document.querySelectorAll(".overlay").forEach(o =>
  o.addEventListener("click",e => {
    if (e.target===o) close(o.id);
  })
);

$("#searchInput").addEventListener("input",renderProducts);
$("#sortSelect").onchange = renderProducts;

// WHATSAPP CHECKOUT
$("#checkoutForm").onsubmit = e => {
  e.preventDefault();

  if (!cart.length) {
    toast("Your shopping bag is empty.");
    return;
  }

  if (STORE_WHATSAPP.includes("X")) {
    alert("Store WhatsApp number has not been configured.");
    return;
  }

  const data = Object.fromEntries(new FormData(e.target));

  const items = cart.map(x => ({
    ...products.find(p=>p.id===x.id),
    qty:x.qty
  }));

  const total = items.reduce((sum,p)=>sum+p.price*p.qty,0);
  const reference = "FM"+Date.now().toString().slice(-8);

  const customerName = data.name || data.customer || data.fullName || "";
  const phone = data.phone || data.mobile || "";
  const address = data.address || data.deliveryAddress || "";
  const payment = data.payment || data.paymentMethod || "Cash on delivery";

  const message = [
    "🛍️ FARUMAX NEW ORDER",
    "Order: "+reference,
    "",
    "Customer: "+customerName,
    "Phone: "+phone,
    "Address: "+address,
    "",
    "PRODUCTS:",
    ...items.map(p=>p.name+" x "+p.qty+" = "+money(p.price*p.qty)),
    "",
    "TOTAL: "+money(total),
    "Payment: "+payment,
    "",
    "Thank you for choosing FARUMAX!"
  ].join("\n");

  const url = "https://wa.me/"+STORE_WHATSAPP+"?text="+encodeURIComponent(message);

  // Important: use window.open, not the custom open() function.
  window.open(url,"_blank");
};

$("#newsletterForm").onsubmit = e => {
  e.preventDefault();
  toast("Thanks! Newsletter signup is a demo only.");
  e.target.reset();
};

$("#accountBtn").onclick = () =>
  toast("Customer accounts will be enabled after backend setup.");

$("#year").textContent = new Date().getFullYear();

renderCategories();
renderProducts();
persist();
