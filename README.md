# cityboundnomad

The website for **cityboundnomad.com** — Chandler's personal brand: minimalist solo
travel, Scandinavian men's style, and lifestyle freedom.

Static [Astro](https://astro.build) site, built to
[`STRANDWAY-WEB-STANDARD.md`](https://github.com/strandwaysystems-cpu/strandway-ventures/blob/main/STRANDWAY-WEB-STANDARD.md)
Tier 1: Astro + npm, static output, no server, no database. Deploys to Hostinger.

---

## Quick start

```bash
nvm use          # Node 20
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/ locally
```

---

## Deploying to Hostinger

The build output is plain static files, so there is nothing to configure on the
server beyond uploading them.

1. `npm run build`
2. Upload **the contents of `dist/`** (not the folder itself) into `public_html`
   on the Hostinger account for cityboundnomad.com.
3. Done. `public/.htaccess` is copied into `dist/` by the build and handles
   HTTPS, the `www` → non-`www` redirect, extensionless URLs, the legacy
   redirects, caching, and the 404 page.

If you prefer Hostinger's Git deployment, point it at this repo with build
command `npm run build` and public directory `dist`.

> **Do not** enable a Node/SSR runtime. The site is deliberately static so it
> can move between Hostinger and Cloudflare Pages without changes.

### URLs

`astro.config.mjs` uses `build.format: 'file'`, so pages are emitted as
`travel.html`, `about.html`, `the-journey/tallinn-may-2022.html`. The `.htaccess`
rewrite serves those at `/travel`, `/about`, `/the-journey/tallinn-may-2022`,
which is the canonical form used in links, `<link rel="canonical">` and the
sitemap. Old URLs from the previous site (`/cities`, `/stay-logs`,
`/philosophy`) 301 to their new homes.

---

## Where things live

```
src/
  data/          ← ALL content. Edit here, not in the pages.
    site.ts        site metadata, nav, newsletter + analytics config, pillars
    images.ts      every image URL in one place
    cities.ts      28 cities, grouped by trip
    stays.ts       stay logs
    style.ts       style principles, capsule wardrobe, gear notes
    journey.ts     timeline + essays (essay bodies included)
    dispatch.ts    newsletter facts, what-to-expect, issue archive
    flags.ts       which content is published — read this first
  components/    ← presentational Astro components
  layouts/       ← BaseLayout: head, SEO, JSON-LD, header/footer
  pages/         ← one file per route
  styles/
    global.css   ← the entire design system, all tokens in :root
public/          ← copied verbatim into dist/: .htaccess, consent.js,
                   script.js, favicons, robots.txt, og-image.jpg
```

Adding a city is one object in `src/data/cities.ts`. Restyling the whole site
is the `:root` block in `src/styles/global.css` — nothing else hardcodes a
colour.

---

## Before this goes live

See [`CONTENT-TODO.md`](CONTENT-TODO.md) for the full list. The three that
matter most:

1. **Connect the newsletter.** `NEWSLETTER.action` in `src/data/site.ts` is
   empty, so every signup form currently falls back to a `mailto:` link. Paste
   the Beehiiv form URL in and the forms start submitting properly.
   (Beehiiv is this brand's platform — not MailerLite, not ConvertKit. See
   `docs/email-infrastructure.md` in strandway-ventures.)
2. **Self-host the images.** `src/data/images.ts` still points at Manus's
   CloudFront CDN, which we do not control.
3. **Set the GA4 ID** in `ANALYTICS.gaId` (`src/data/site.ts`) and
   `CONFIG.gaId` (`public/consent.js`), plus the Search Console verification
   token. Until then the site simply runs without analytics — it stays
   compliant either way, because `consent.js` is fail-closed.

---

## Provenance

The content and visual direction come from a Manus build
(`cityboundnomad-framework-realignment`) which ran React + Vite + tRPC + Drizzle
against a TiDB database. That stack was a Tier 2 shape for what is a content
site, so it was rebuilt here as Tier 1 static Astro and the database content was
lifted into typed files under `src/data/`.

⚠️ The Manus export's `.project-config.json` contained a live TiDB connection
string, AWS session credentials, a JWT secret and API keys. That file is
gitignored here and was never committed — **rotate those credentials** if it has
not been done already.
