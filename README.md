# AbleGod Enterprise website

Sample online fabric store for AbleGod Enterprise, House of Fabric (Ekeoha Shopping Center, Aba).
Built with React, Vite and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev
```

Build for production with `npm run build`, which outputs to `dist/`.

## Where things live

| What | File |
| --- | --- |
| Phone, WhatsApp number, address, Instagram | `src/config/store.js` |
| Fabrics: name, colour, price, stock status, photo | `src/data/products.js` |
| Delivery photos and captions | `src/data/deliveries.js` |
| Brand colours and fonts | `src/index.css` (`@theme`) |
| WhatsApp links and input cleaning | `src/lib/whatsapp.js` |
| Order message text | `src/lib/messages.js` |
| Page sections | `src/components/` |

To add a fabric, put the photo in `public/images/fabrics/` and add an entry to `PRODUCTS`.
Set `status` to `in-stock`, `low-stock` or `sold-out`.

## Security

- No backend, no API keys, no customer data stored. Orders go straight to WhatsApp.
- All customer input is trimmed, length-limited and URL-encoded before it goes into a WhatsApp link.
- External links use `rel="noopener noreferrer"`.
- No `dangerouslySetInnerHTML` anywhere.
- `vercel.json` adds security headers (Content-Security-Policy, HSTS, X-Frame-Options, nosniff).
- Production builds have source maps turned off.

## Before going live

- Replace the placeholder prices in `src/data/products.js` with AbleGod's real prices
  (only the pink cord lace at ₦6,500 comes from his own post).
- Product photos are cropped from AbleGod's Instagram. Ask for clean photos without the
  text overlay for the final site.

## Admin preview (`/admin`)

Open `http://localhost:5173/admin` to see the owner's admin preview: stock status,
price editing, adding fabrics, a sales overview and orders. It shares data with the shop,
so marking a fabric "Sold out" there shows in the shop straight away.

It is a demo only: there is no login or database, changes stay in the browser tab,
and the sales and orders are sample data (`src/admin/demoData.js`). The real version
needs a backend with a secure login.
