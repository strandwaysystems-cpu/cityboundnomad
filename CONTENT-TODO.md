# Content TODO

What needs a decision from Chandler before it can be published, and what got
left out of the port and why.

---

## 1. Content that is written but not published

The Manus build's database mixed two kinds of content. The trips are real — they
came out of the "authenticity pass" that replaced the generic first draft. The
rest was filler written before those passes: plausible-sounding, but making
first-person claims that were never checked against anything.

Since this is a personal brand whose entire premise is honest documentation,
the unverified material is kept in the data files with `verified: false` and is
not rendered. Set an item's `verified` to `true` to publish it, or flip
`PUBLISH_UNVERIFIED` in `src/data/flags.ts` to publish all of it at once.

| What | Where | Why it's held back |
|---|---|---|
| 4 stay reviews — Generator Copenhagen, Reykjavik Downtown Hostel, Old Town Apartment (Tallinn), Pärnu Beach Apartment | `src/data/stays.ts` | Invented ratings and pros/cons. Also carried bare `booking.com` / `airbnb.com` links with no affiliate ID. |
| The 10-item capsule wardrobe | `src/data/style.ts` | Specific brands, prices and quantities that were never confirmed — including a €350 sneaker and a €280 jacket. |
| 3 gear notes | `src/data/style.ts` | Excerpts make claims ("I've washed it 60+ times") about articles that were never written. |
| 4 journey essays | `src/data/journey.ts` | Titles and excerpts only, no body. |
| 4 Dispatch issues | `src/data/dispatch.ts` | Never sent. The titles are good and worth keeping as a writing queue. |

**Published as-is** (all from the authenticity passes): the 28 cities, the trip
timeline, the Tallinn May 2022 origin essay, the Hi Loft Hostel review, and the
About page story.

### Removed outright

The first-draft seed also carried a **second, contradictory timeline** — a
one-way flight out of Halifax in September 2022, "47 subscribers in week one",
"crossed 1,000 subscribers", "first brand partnership, turned down three
others", "Dispatch at 4,200 subscribers". It describes a different history from
the real one (May 2022 Tallinn → September 2022 Iceland → the 2023 run), so it
was not carried over at all rather than left sitting behind a flag.

Two claims were also cut from page copy for the same reason:

- The Dispatch page's stat strip — **"4,200+ subscribers"** and **"52% open
  rate"**. Replaced with the cadence, the price, and the sponsorship policy,
  which are all true today.
- The About page's **"I'd rather have 4,000 readers who trust me than 40,000 who
  don't"** and "I've turned down several [partnerships]". Rewritten as a
  forward-looking policy with no invented track record.

If any of these numbers are real, say so and they go straight back in.

---

## 2. Images

`src/data/images.ts` is the only file with image URLs in it.

**Still pointing at Manus's CDN** (`d2xsxph8kpxj0f.cloudfront.net`) — works
today, but it is not our infrastructure and can disappear without notice:
hero (Copenhagen street), travel, style, journey, Stockholm, Reykjavik, Pärnu.
Download each, convert to `.webp`, put them in `public/images/`, and change the
values in `images.ts`.

**Lost in the export** — these lived at `/manus-storage/...` paths that only
resolved inside Manus's runtime and are not in the zip:

- `tartu-chandler` — the Tartu portrait, used for the Tartu city card and the
  About page
- `london-tower-bridge` — used for the London city card and the About page

They are `null` in `images.ts`, and every component treats a null image as
"render without media", so the layout is intact — city cards without a photo get
a typographic panel with the country flag instead. Supplying the files and
setting the paths is all that's needed.

**Stock stand-ins** from the original seed, worth replacing with Chandler's own
shots: Tallinn, Copenhagen, Chania (all Unsplash).

**Photographs wanted** for the 21 cities that have none — the whole 2023 run,
plus Lisbon, Lagos, Sevilla, Gothenburg and Jönköping.

---

## 3. Configuration

- [ ] **Beehiiv form URL** → `NEWSLETTER.action` in `src/data/site.ts`. Until
      then all signup forms fall back to `mailto:hello@cityboundnomad.com`.
- [ ] **Confirm that email address** actually exists, or change
      `NEWSLETTER.fallbackMailto`.
- [ ] **GA4 Measurement ID** → `ANALYTICS.gaId` in `src/data/site.ts` *and*
      `CONFIG.gaId` in `public/consent.js`.
- [ ] **Google Search Console token** → `ANALYTICS.searchConsoleVerification`.
- [ ] **Crazy Egg script** → `CONFIG.crazyEggSrc` in `public/consent.js` if this
      site is joining the portfolio's shared account.
- [ ] **Social URLs** — TikTok and Facebook in `SOCIAL` (`src/data/site.ts`) are
      constructed from the handle; confirm they resolve.
- [ ] **Replace `public/consent.js`** with the portfolio's byte-identical copy
      from `stay-albanian-riviera` and re-set only the `CONFIG` block. This
      version was written from the spec in `docs/analytics-privacy-standard.md`
      because that repo wasn't reachable during the build; the standard's rule
      is that the body of the file is never forked per site.

---

## 4. Backlog carried over from the Manus build

Not started, listed so nothing is lost:

- Individual city detail pages (`/travel/copenhagen`)
- Individual stay-log and gear-note pages
- Search across all content
- Instagram feed on the homepage
- Monthly cost-breakdown page (there is a real data model for this in the
  trip cost ranges already)
- The affiliate links themselves — no real affiliate IDs exist in this repo
  yet, which is why `bookingUrl` and `affiliateUrl` are `null` everywhere

---

## 5. Security

The Manus export shipped `.project-config.json` containing a **live TiDB
connection string with password, AWS session credentials, a JWT secret, and
Manus API keys**. It is gitignored and was never committed to this repo, but it
existed in a zip file. Rotate all of it.
