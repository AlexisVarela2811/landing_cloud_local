# CloudLocal — Landing

Official landing page for [CloudLocal](https://github.com/AlexisVarela2811/CloudLocal), a free and
open-source file cloud that runs on your own computer. This site presents the project with an
interactive demo of the real UI, in English and Spanish.

Built with **Astro 7** and **Tailwind CSS v4**. The visual language follows the design system
captured in `design/system.md` (cream palette, teal accent, Inter type).

## Features

- **Centered hero** flanked by two animated ASCII silhouettes (cloud and local server) drawn on
  canvas — decorative only: `aria-hidden`, static under `prefers-reduced-motion`, hidden below 900px.
- **Interactive demo** of the actual CloudLocal interface (fictional Spanish data): rail navigation,
  breadcrumb, type filters, list/grid views, "Añadido recientemente" strip, selection bar, working
  trash with restore/empty, settings, and a light/dark theme switch. The frame keeps a constant
  height across views and scrolls internally.
- **Bilingual copy (EN/ES)** with automatic language detection from the browser and a manual
  selector in the header. The demo stays Spanish by design.
- **SEO and sharing**: Open Graph and Twitter cards with a 1200×630 image, canonical URL, JSON-LD,
  generated `robots.txt`, sitemap, real GitHub star count fetched at build time.
- **404 page** and a bilingual privacy notice (`/privacy`) — the site itself sets no cookies and
  collects no personal data.

## Getting started

Requires Node.js **≥ 22.23.4**.

```sh
npm install
npm run dev       # http://localhost:4321
```

| Command           | Action                                       |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start the dev server with hot reload         |
| `npm run build`   | Build the static site to `./dist/`           |
| `npm run preview` | Serve the production build locally           |

## Configuration before deploying

The output is fully static; it works on Netlify, Vercel, GitHub Pages or any static host.

Set the production URL once in `astro.config.mjs`:

```js
site: 'https://your-domain.example',
```

This single value activates the canonical URL, absolute `og:url`/`og:image`, the sitemap
(`sitemap-index.xml`) and the `Sitemap:` line in `robots.txt`. Everything degrades gracefully while
it is unset.

## Project structure

```text/
├── design/system.md          # design tokens captured from the product repo
├── odd/tasks/                # ODD feature spec and work log
├── public/                   # static assets: favicons, og.png
└── src/
    ├── components/site/      # Header, Hero, AppDemo, Story, Cta, Footer
    ├── layouts/              # base layout with SEO/OpenGraph head
    ├── pages/                # index, 404, privacy, robots.txt endpoint
    ├── scripts/              # ascii-tiles, app-demo, i18n (vanilla JS)
    └── styles/               # global tokens + app demo styles
```

## Links

- Application and source: [github.com/AlexisVarela2811/CloudLocal](https://github.com/AlexisVarela2811/CloudLocal)
- Author: [AlexsibDev](https://alexsibdev.netlify.app/)

## License

MIT — see the license in the [application repository](https://github.com/AlexisVarela2811/CloudLocal).
