# VELANCE

Premium European women's wellness and skincare ecommerce — built with React, Vite, Tailwind CSS, Stripe, and Supabase.

**Target market:** Women aged 35–55 across UK, Ireland, France, Germany, Netherlands, Spain, and Italy.

---

## Quick start

```bash
npm install
cp .env.example .env.local
# Fill in your keys in .env.local

npm run dev           # Frontend only
npm run dev:full      # Frontend + Express API together
npm run build         # Production build
```

---

## Environment variables

| Variable | Description |
|---|---|
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe publishable key (safe for browser) |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key (safe for browser) |
| `STRIPE_SECRET_KEY` | Stripe secret key (API server only — never expose) |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signing secret |
| `SUPABASE_SERVICE_KEY` | Supabase service role key (API server only) |

---

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + Vite 8 |
| Styling | Tailwind CSS 3 with VELANCE custom tokens |
| Routing | React Router v7 |
| State | Zustand (with localStorage persistence) |
| Animations | Framer Motion |
| Icons | Lucide React |
| Notifications | React Hot Toast |
| SEO | React Helmet Async |
| Payments | Stripe Elements |
| Database / Auth | Supabase |

---

## Stripe test mode

- Card: **4242 4242 4242 4242**, any future expiry, any CVC
- Without a running API server, checkout auto-simulates success (demo mode)

---

## Supplier integrations

- **SelfNamed** — white-label skincare formulation for the Skin line
- **Supliful** — white-label/dropship supplements for the Balance line

To add a product: edit `src/data/products.js` following the existing schema.

---

## Deployment

- **Frontend:** Vercel (`vercel.json` included — handles SPA routing)
- **API:** Railway (deploy the `api/` folder as a Node.js service)

---

## Brand

Sage `#4A6741` · Ivory `#F8F4EE` · Gold `#C4A35A` · Cream `#FDFCFA` · Charcoal `#2C2C2A`
Fonts: Cormorant Garamond (headings) · Inter (body)
