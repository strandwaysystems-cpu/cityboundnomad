# cityboundnomad

The website for **cityboundnomad.com** — Chandler's personal catalogue: the places
he's actually been and the things he actually uses.

**The rule the whole site runs on:** nothing is listed that hasn't been visited,
stayed in, gone on, or worn. No research layer, no round-ups, no second-hand
recommendations. That is what separates this repo from the AI-assembled
affiliate sites elsewhere in the portfolio — and it is why several pages ship
deliberately empty.

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
| `/places` | 200 |
| `/places.html` | 301 → `/places` |
| `/notes` | 200 — the one that breaks if the rewrite rules are edited carelessly, because a `notes/` directory exists alongside `notes.html`. Same for `/places`. |
| `/places/tallinn` | 200 |
| `/notes/tallinn-may-2022` | 200 |
| `/travel`, `/cities` | 301 → `/places` |
| `/style` | 301 → `/wardrobe` |
| `/stay-logs` | 301 → `/stays` |
| `/the-journey`, `/philosophy`, `/dispatch` | 301 → `/notes` |
| `/the-journey/tallinn-may-2022` | 301 → `/notes/tallinn-may-2022` |
| `/nope` | 404, styled 404 page |
| `http://cityboundnomad.com` | 301 → `https://` |
| `https://www.cityboundnomad.com` | 301 → non-`www` |

> **Do not** enable a Node/SSR runtime. The site is deliberately static so it
> can move between Hostinger and Cloudflare Pages without changes.

### URLs

`astro.config.mjs` uses `build.format: 'file'`, so pages are emitted as
`places.html`, `about.html`, `places/tallinn.html`. The `.htaccess` rewrite
serves those at `/places`, `/about`, `/places/tallinn`, which is the canonical
form used in links, `<link rel="canonical">` and the sitemap.

Two generations of old URLs 301 to their new homes: the original site
(`/cities`, `/stay-logs`, `/philosophy`) and the three-pillar build that
followed (`/travel`, `/style`, `/the-journey`, `/dispatch`).

---

## Where things live

```
src/
  data/          ← ALL content. Edit here, not in the pages.
    site.ts        site metadata, nav, analytics config, the three sections
    lists.ts       the shared Entry type behind every list + grouping helpers
    cafes.ts       cafés & bars, tagged by city
    tours.ts       tours actually taken (the GetYourGuide layer)
    wardrobe.ts    what's in the bag, plus the four principles
    grooming.ts    hair & skin
    cities.ts      28 cities, grouped by trip
    stays.ts       accommodation reviews
    journey.ts     timeline + long-form notes (essay bodies included)
    images.ts      every image URL in one place
    flags.ts       which content is published — read this first
  components/    ← presentational Astro components
  layouts/
    BaseLayout     head, SEO, JSON-LD, header/footer
    ListPage       every collection page is this + a data file
  pages/         ← one file per route
  styles/
    global.css   ← the entire design system, all tokens in :root
public/          ← copied verbatim into dist/
```

### Adding an entry

Open the relevant data file and copy an existing object. Every list — cafés,
tours, wardrobe, grooming — uses the same `Entry` shape from `lists.ts`:

```ts
{
  name: 'Somewhere I actually went',
  category: 'Coffee',          // groups it on the page
  city: 'Tallinn',             // must match a name in cities.ts exactly
  detail: 'Address, price, brand — whatever the specifics are',
  note: 'First person, and why it earned a place on the list.',
  since: 'May 2022',
  url: null,                   // real link, or null. Never a placeholder.
  affiliate: false,            // true adds rel="sponsored" + the disclosure
  verified: true,              // false keeps it out of the build
}
```

Setting `city` is what makes an entry appear on that city's own page as well as
on its list — the same data read two ways.

### Adding a whole new list

Three steps, no framework work:

1. Copy `src/data/grooming.ts` to e.g. `src/data/tech.ts`, edit the `ListMeta`.
2. Add `src/pages/tech.astro` — four lines, copy `grooming.astro`.
3. Add it to the `COLLECTIONS` array in `src/pages/things.astro` and to `LISTS`
   in `src/components/Footer.astro`.

## The design system

Everything visual lives in `src/styles/global.css`. It is built on
[Emil Kowalski's design-engineering skills](https://github.com/emilkowalski/skills)
(`emil-design-eng`, `animate`, `apple-design`), and the rules below are the ones
worth knowing before you change anything in it.

**Colour is signal.** Surfaces are neutral; the single green accent marks
affordances — links, active nav, list markers — and nothing else. Primary
buttons are ink, not accent. Every value is a token in `:root`, with a dark
counterpart under `prefers-color-scheme: dark`, so light and dark are one design
rather than two. There is also a `prefers-reduced-transparency` block that makes
the translucent chrome solid, and a `prefers-contrast: more` block that
strengthens the hairlines.

**Type is sized *and* tracked.** Tracking runs from `-0.035em` on `.display-xl`
to roughly `0` on body and slightly positive on the small sizes — a single
`letter-spacing` across a scale is wrong at one end of it. The face is the
platform's own, so there is no webfont, no `preconnect`, and no third-party
request on a site that otherwise loads nothing before consent.

**Motion is decided, not decorated.** Before adding any:

- Ask whether it should animate. Something seen tens of times a day gets a
  near-imperceptible effect or none.
- Name the exact properties. `transition: all` is never correct.
- Use one of the three curves in `:root` — `--ease-out` for entering and
  exiting, `--ease-in-out` for on-screen movement, `--ease-drawer` for sheets.
  Never `ease-in`: it delays the moment the user is watching most closely.
- Use the duration tokens. UI stays under 300ms; the scroll reveal at 440ms is
  the one exception, because it explains rather than responds.
- Animate `transform` and `opacity` only — they skip layout and paint.
- Never enter from `scale(0)`. Start at `0.95`–`0.98` with `opacity: 0`.
- Exits are faster than entrances.
- Ship the `prefers-reduced-motion` and `(hover: hover) and (pointer: fine)`
  variants *with* the animation, not afterwards. Reduced motion means gentler,
  not absent: colour and opacity stay, travel goes.

**Scroll reveals are progressive enhancement.** Content is visible by default;
the inline head script in `BaseLayout` only adds `.has-scroll-fx` once it has
confirmed the browser can both animate and observe. `public/script.js` staggers
each batch by 60ms in document order, capped at four steps, and a 2.5s safety
net reveals anything still hidden. A blocked or slow `script.js` can never leave
a section invisible.

Add `fade-in` to an element to opt it into the reveal. Put it on the cards in a
grid rather than on the grid itself — that is what makes the row cascade instead
of arriving as one slab.

## Photos from Apple Photos

`tools/import-photos.mjs` turns a folder of exported photos into site content:
it reads the GPS the camera wrote into each file, works out which city it was
taken in, converts it to a web-sized `.webp`, and writes `src/data/photos.ts`
so the city pages show them.

```bash
npm run photos -- ~/Desktop/cbn-export --dry-run   # see what matches where
npm run photos -- ~/Desktop/cbn-export             # write the images + data
```

It reads `.heic` straight off an iPhone — no converting first.

### Exporting with the location intact

This is the step that goes wrong. **Apple strips location on export unless you
tell it not to.**

> Photos on Mac → select → File → Export → Export N Photos…
> → tick **Location Information** → Subfolder Format: None

*Export Unmodified Original* always keeps the location and is the safest
option. On iPhone: select → Share → **Options** at the top of the sheet →
Location **on** → Save to Files (or AirDrop to a Mac).

If the importer reports photos with no location, that checkbox is why.

### Privacy

Photo GPS is precise enough to identify a house, so the importer:

- **never writes coordinates into the repo** — only the matched city name;
- **strips all EXIF** from the `.webp` files it produces, GPS included;
- **skips any photo it cannot place** in one of your listed cities rather than
  guessing, which is what keeps photos taken at home out of the build.

Everything skipped is listed in the summary, so nothing disappears silently.

### Matching

Photos are matched to the nearest city in `cities.ts` within 60km, using the
approximate coordinates in `COORDS` at the top of the importer. Matching on
position rather than Apple's place names is what tells Lagos in Portugal from
Lagos in Nigeria. Add a city to `cities.ts` and its coordinates to `COORDS`
together — the script warns if the two drift apart.

---

## Before this goes live

See [`CONTENT-TODO.md`](CONTENT-TODO.md) for the full list. The three that
matter most:

1. **Fill the lists.** Cafés, tours and grooming are near-empty scaffolds by
   design — they can only be written by the person who was there. One object
   per entry.
2. **Self-host the images.** `src/data/images.ts` still points at Manus's
   CloudFront CDN, which we do not control.
3. **Set the GA4 ID** in `ANALYTICS.gaId` (`src/data/site.ts`) and
   `CONFIG.gaId` (`public/consent.js`), plus the Search Console verification
   token. Until then the site simply runs without analytics — it stays
   compliant either way, because `consent.js` is fail-closed.

## Provenance

The content and visual direction come from a Manus build
(`cityboundnomad-framework-realignment`) which ran React + Vite + tRPC + Drizzle
against a TiDB database. That stack was a Tier 2 shape for what is a content
site, so it was rebuilt here as Tier 1 static Astro and the database content was
lifted into typed files under `src/data/`.

That build framed the site as a three-pillar content brand with a weekly
newsletter ("The Dispatch"). The newsletter has since been dropped and the site
re-scoped as a personal catalogue — Places, Things, Notes. The Dispatch, its
signup forms and its Beehiiv configuration are gone; `/dispatch` 301s to
`/notes`, as do the old `/travel`, `/style` and `/the-journey` URLs.

⚠️ The Manus export's `.project-config.json` contained a live TiDB connection
string, AWS session credentials, a JWT secret and API keys. That file is
gitignored here and was never committed — **rotate those credentials** if it has
not been done already.
