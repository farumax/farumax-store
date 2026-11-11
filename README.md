# FARUMAX — free starter storefront

A responsive dark-purple/black demo shop with LKR pricing, category filters, search, sorting, product details, cart and a demo checkout.

## Run on your PC
1. Extract the ZIP.
2. Open the `farumax-store` folder.
3. Double-click `index.html` (or open it in Chrome/Edge).

No build tools or paid software are required.

## Free publishing (static demo)
**GitHub Pages**
1. Create/sign in to a GitHub account.
2. Create a new public repository named `farumax-store`.
3. Upload `index.html`, `styles.css`, and `app.js` from this folder.
4. Open repository **Settings → Pages**.
5. Under Build and deployment choose **Deploy from a branch**.
6. Select `main` and `/ (root)`, then Save.
7. Wait for GitHub Pages to publish the site. The URL appears in Settings → Pages.

A free `github.io` address is provided. A custom `.com` domain normally costs money.

## Important — before accepting real customer orders
This ZIP is a **front-end demo**, not a production commerce backend:
- Cart and demo orders are stored in the visitor's own browser (`localStorage`).
- The store owner does not receive checkout orders.
- Login/account buttons and newsletter are demo placeholders.
- No real payment is collected.
- Product names, sample prices and stock are examples; replace them with your actual products.
- Product photos load from Unsplash and therefore require internet access.

Do not advertise the demo checkout as a working order system. To launch a real store, connect a secure backend/database (for example Supabase or Firebase), add owner authentication and order notifications, configure shipping/returns/privacy terms, and integrate a supported Sri Lankan payment provider. Never put secret API keys in browser JavaScript.

## Edit products
Open `app.js` and edit the `products` array near the top. Each product has:
`id`, `name`, `category`, `price` (LKR number), `emoji`, and `image` (image URL).

Categories currently include Electronics, Fashion, Groceries, Home, Beauty and Sports.
