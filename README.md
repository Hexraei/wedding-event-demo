# Wedding vendor demo site

One build, reused for every lead. Everything vendor-specific lives in `src/config.ts`.

**To make a demo for a new lead: edit `config.ts`, run `npm run build`, deploy.**

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # static site in dist/
```

## Deploy

`dist/` is a plain static site.

- **Vercel**: import the repo at vercel.com/new and deploy. `vercel.json` already sets the build (`npm run build`), output (`dist`) and long-term caching for hashed assets and fonts. Each push to `main` redeploys.
- **Netlify**: build command `npm run build`, publish directory `dist`. Or drag the `dist` folder onto app.netlify.com/drop.

## What to edit in `src/config.ts`

| Field | Notes |
| --- | --- |
| `businessName`, `tagline`, `vendorType`, `city`, `area` | Name is also used for the favicon initial and tab title. |
| `phone`, `whatsappNumber`, `whatsappMessage` | `whatsappNumber` is digits only with country code, e.g. `919876543210`. |
| `instagramUrl`, `email` | Leave as `''` to hide. |
| `heroImages` | Three photos. The first is preloaded and used for link previews. |
| `galleryImages` | Twelve photos with `alt`, `category` (filter tabs come from these), `ratio` (`portrait` / `landscape` / `square`) and an optional loading `color`. |
| `services` | Six items. The first is shown large with its `image`. `icon` must be a name from `src/lib/icons.ts` (add any Lucide icon there). |
| `packages`, `stats`, `testimonials`, `faq`, `eventTypes` | Content as shown. Mark one package `featured: true`. |
| `palette` | `marigold`, `jasmine`, `temple` or `ink-gold`. |
| `copy` | Section headings and the search-engine description. |

Unsplash photo URLs are resized automatically (`w=` and `q=` are rewritten per screen size). Any other image URL is used as is.

## Checks

```bash
npx tsc -b && npm run lint && npm test && npm run build
```

`npm test` covers the WhatsApp link builder, phone validation and price formatting.

## How the build works

`npm run build` type-checks, builds the client, then `scripts/prerender.js` renders the page to static HTML and inlines the CSS. The page is complete before any JavaScript runs, and the app script starts after the window `load` event. Booking buttons are plain `#book` links until then.
