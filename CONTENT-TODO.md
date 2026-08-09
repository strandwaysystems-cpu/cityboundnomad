# Content TODO

The site is a catalogue of first-hand experience. That means most of what's
missing can only be written by the person who was there — this file is the list
of what that is.

---

## 1. The lists to fill in

Each of these is a data file in `src/data/`. Adding an entry is copying an
object and filling it in; see "Adding an entry" in the README for the shape.

| List | File | State |
|---|---|---|
| Cafés & bars | `cafes.ts` | **1 entry** — Butterfly Lounge, Tallinn, from the origin story. Everywhere else is blank. |
| Tours | `tours.ts` | **Empty.** The Iceland south-coast day trips are the obvious first entries. |
| Hair & skin | `grooming.ts` | **Empty.** |
| Stays | `stays.ts` | **1 published** — Hi Loft Hostel, Reykjavik. Four others held back (below). |
| Wardrobe | `wardrobe.ts` | **10 items, none confirmed** (below). |

Nothing was invented to fill these. A café list for cities someone hasn't sat in
is exactly what this site exists not to be.

### Tours and the GetYourGuide store

`url` is `null` on every tour entry because there is no GetYourGuide partner ID
in this repo yet. Once there is:

1. Put the real partner link in `url`.
2. Set `affiliate: true` — that adds `rel="noopener sponsored"`, which is what
   makes the analytics tracker fire `affiliate_click`, and surfaces the
   disclosure line on the page.

Never commit a placeholder ID — `affiliate-id-guard.yml` fails the build on
them, deliberately.

---

## 2. Content that is written but not published

Held back behind `verified: false`, rendered by nothing. Set an item's
`verified` to `true` to publish it, or flip `PUBLISH_UNVERIFIED` in
`src/data/flags.ts` to see everything at once while designing.

| What | Where | Why it's held back |
|---|---|---|
| 4 stay reviews — Generator Copenhagen, Reykjavik Downtown Hostel, Old Town Apartment (Tallinn), Pärnu Beach Apartment | `stays.ts` | Invented ratings and pros/cons, and bare `booking.com` / `airbnb.com` links with no affiliate ID. |
| The 10-item wardrobe | `wardrobe.ts` | Brands, prices and quantities were never confirmed — including a €350 sneaker and a €280 jacket. |
| 4 notes | `journey.ts` | Titles and excerpts with no body behind them. |

**Published as-is** (all real): the 28 cities, the trip timeline, the Tallinn
May 2022 origin note, the Hi Loft Hostel review, the Butterfly Lounge, and the
About page story.

### Removed outright

- The **Dispatch** — the newsletter, its signup forms, the four unwritten
  issues, and the Beehiiv configuration. `/dispatch` now 301s to `/notes`.
- The fabricated audience metrics that went with it: **"4,200+ subscribers"**
  and **"52% open rate"**, plus the About page's **"4,000 readers who trust
  me"** and "I've turned down several [partnerships]".
- A **second, contradictory timeline** from the pre-authenticity seed — a
  one-way flight out of Halifax in September 2022, "47 subscribers in week one",
  "first brand partnership". It described a different history from the real one.

If any of those numbers were real, say so and they go back in.

---

## 3. Images

`src/data/images.ts` is the only file with image URLs in it.

**Still pointing at Manus's CDN** (`d2xsxph8kpxj0f.cloudfront.net`) — works
today, but it is not our infrastructure and can disappear without notice: hero,
travel, style, journey, Stockholm, Reykjavik, Pärnu. Download each, convert to
`.webp`, put them in `public/images/`, update `images.ts`.

**Lost in the Manus export** — these lived at `/manus-storage/...` paths that
only resolved inside Manus's runtime:

- `tartuPortrait` — the Tartu portrait, used on the Tartu card and About
- `londonTowerBridge` — the London card and About

Both are `null`, and every component treats a null image as "render without
media" — city cards without a photo get a typographic panel with the country
flag instead, so the grid stays even.

**Stock stand-ins** worth replacing with Chandler's own shots: Tallinn,
Copenhagen, Chania (all Unsplash).

**Photographs wanted** for the 21 cities with none — the whole 2023 run, plus
Lisbon, Lagos, Sevilla, Gothenburg and Jönköping.

The fastest way to fix all of this at once is the photo importer: export the
camera roll out of Apple Photos with location data intact and run
`npm run photos`. It sorts the shots into cities by their GPS and puts a gallery
on each city page. See "Photos from Apple Photos" in the README — including the
export checkbox that Apple hides, and what the importer does about the privacy
side.

---

## 4. Configuration

- [ ] **Confirm `hello@cityboundnomad.com`** exists, or change `CONTACT.email`
      in `src/data/site.ts` — it is the only contact route on the site now.
- [ ] **GA4 Measurement ID** → `ANALYTICS.gaId` in `src/data/site.ts` *and*
      `CONFIG.gaId` in `public/consent.js`.
- [ ] **Google Search Console token** → `ANALYTICS.searchConsoleVerification`.
- [ ] **Crazy Egg script** → `CONFIG.crazyEggSrc` if this site joins the
      portfolio's shared account.
- [ ] **Social URLs** — TikTok and Facebook in `SOCIAL` are built from the
      handle; confirm they resolve.
- [ ] **Replace `public/consent.js`** with the portfolio's byte-identical copy
      from `stay-albanian-riviera` and re-set only the `CONFIG` block. This one
      was written from the spec in `docs/analytics-privacy-standard.md` because
      that repo wasn't reachable during the build.

---

## 5. Ideas not built

- **Tech & everyday carry** — bag, laptop, camera, chargers. Overlaps the
  one-bag angle. One data file plus a four-line page.
- **Restaurants** — same shape as cafés; currently they'd go in `cafes.ts`
  under a "Food" category.
- **Books, music, film** — the "things I like" that aren't bought or visited.
- Per-entry detail pages, if any café or tour ever justifies more than a
  paragraph.
- Search across the lists, once there is enough to search.

---

## 6. Security

The Manus export shipped `.project-config.json` containing a **live TiDB
connection string with password, AWS session credentials, a JWT secret, and
Manus API keys**. It is gitignored and was never committed to this repo, but it
existed in a zip file. Rotate all of it.
