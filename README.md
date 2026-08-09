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

> **The one thing to understand first:** Hostinger's shared hosting serves
> static files. It does **not** run `npm install` or a build command on deploy.
> So what goes into `public_html` is the contents of `dist/` — never this
> repository. Pointing Hostinger's Git integration at `main` would put the Astro
> *source* on the server: no `index.html` at the root, nothing rendering.
>
> There is no Node runtime to configure and no startup file. If you find
> yourself on a "Node.js app" setup screen asking for an entry point, that is
> the wrong tool for this site — back out of it.

### Option A — upload the build (simplest)

1. `npm run build`, or download the `dist` artifact from the latest
   [astro-build run](../../actions/workflows/astro-build.yml).
2. Upload **the contents of `dist/`** — not the folder itself — into
   `public_html`, via hPanel → File Manager or FTP.

That's the whole deploy. `public/.htaccess` is copied into `dist/` by the build
and handles HTTPS, the `www` → non-`www` redirect, extensionless URLs, the
legacy redirects, caching and the 404 page.

### Option B — Git auto-deploy (push to main → live)

`publish-deploy-branch.yml` builds on every push to `main` and force-pushes the
finished static files to a **`deploy`** branch, which contains nothing but the
contents of `dist/`. Hostinger is pointed at that branch, so there is nothing
for it to build.

In hPanel → **Advanced → GIT**:

| Field | Value |
|---|---|
| Repository | `https://github.com/strandwaysystems-cpu/cityboundnomad.git` |
| Branch | **`deploy`** — not `main` |
| Directory | `public_html` |

Then use **Auto Deployment** to copy the webhook URL, and add it in GitHub under
Settings → Webhooks (content type `application/json`, push events). After that,
merging to `main` rebuilds and updates the live site on its own.

The directory must be empty before the first clone — clear out any old site
first, and keep a copy.

> Deploying this way leaves a `.git/` directory inside `public_html`. The
> `.htaccess` blocks requests to it, but the files are still on disk.

### Which to use

Option A if the site changes rarely and you would rather not wire up a webhook.
Option B once the content starts moving — it removes the manual upload step
entirely.

**If the site returns a 500 the moment it's uploaded**, the cause is almost
certainly the single `Options -Indexes` line in `.htaccess`, which needs
`AllowOverride Options`. Delete that line and re-test — nothing else in the file
depends on it.

### After uploading, spot-check these

They exercise every rewrite rule in the file:

| URL | Expected |
|---|---|
| `/` | 200, homepage |
| `/travel` | 200 |
| `/travel.html` | 301 → `/travel` |
| `/the-journey` | 200 — the one that breaks if the rewrite rules are edited carelessly, because a `the-journey/` directory exists alongside `the-journey.html` |
| `/the-journey/tallinn-may-2022` | 200 |
| `/cities`, `/stay-logs` | 301 → `/travel` |
| `/philosophy` | 301 → `/the-journey` |
| `/nope` | 404, styled 404 page |
| `http://cityboundnomad.com` | 301 → `https://` |
| `https://www.cityboundnomad.com` | 301 → non-`www` |

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
