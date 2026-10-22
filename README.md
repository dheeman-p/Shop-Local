# Shop-Local

A frontend-only prototype of a local bakery shop. No backend, no payment provider — all
state lives in `localStorage`, so it is safe to click through and demo.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run preview  # serve the built bundle
```

## What's included

| Route | Screen |
| --- | --- |
| `#/` | Shop: search, category filters, sorting, product grid |
| `#/product/:id` | Product detail, allergen info, quantity picker |
| `#/cart` | Basket with quantity editing and removal |
| `#/checkout` | Collection vs. local delivery, contact details, order summary |
| `#/order/:id` | Order confirmation |
| `#/orders` | Order history for the current browser |

## Structure

```
src/
  data/products.ts     mock catalogue (12 bakery items)
  store/StoreContext.tsx  cart + orders, persisted to localStorage
  router.ts            ~20-line hash router (no react-router dependency)
  pages/               one file per screen
  App.tsx              shell: header, nav, route switch
  index.css            all styling, mobile-first, plain CSS
```

## Prototype limitations

- No authentication; orders are per-browser, not per-user.
- No real payment — "Place order" just writes to `localStorage`.
- Product imagery is emoji placeholders, not photos.
- Prices are hardcoded in GBP.

## Next steps (when it graduates from prototype)

1. Swap `data/products.ts` for a real API call.
2. Add a payment provider (Stripe Checkout is the smallest lift).
3. Replace emoji placeholders with real product photography.
4. Add a CMS or admin screen so staff can manage the catalogue.
