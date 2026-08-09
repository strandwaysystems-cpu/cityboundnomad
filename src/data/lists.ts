/*
 * The shared shape behind every list on this site.
 *
 * The site is a catalogue of first-hand experience: places actually visited,
 * things actually owned and used. Every list — cafés, tours, wardrobe, grooming
 * — is the same `Entry` type, so adding a new collection is one data file plus
 * one page that renders it, and nothing else changes.
 *
 * NOTHING GOES IN A LIST THAT HASN'T BEEN USED OR VISITED. That is the entire
 * premise of the site and the only thing separating it from the AI-assembled
 * affiliate sites elsewhere in the portfolio. Entries carry `verified` for the
 * same reason the rest of the codebase does — see src/data/flags.ts.
 */

export interface Entry {
  /** What it is — the café, the tour, the jacket. */
  name: string;
  /** Free-text grouping within its own list: "Coffee", "Outerwear", "Skin". */
  category: string;
  /** First person, and the reason it earned a place on the list. */
  note: string;
  /** Ties the entry to a city in src/data/cities.ts. Match the name exactly. */
  city?: string;
  /** Brand, model, operator, price — whatever the specifics are. */
  detail?: string;
  /** When it was visited, or how long it has been in use. */
  since?: string;
  /** Real URL or null. Never a placeholder — see affiliate-id-guard.yml. */
  url?: string | null;
  /** True when `url` earns a commission. Adds rel="sponsored" and disclosure. */
  affiliate?: boolean;
  verified: boolean;
}

export interface ListMeta {
  /** URL slug, e.g. "cafes" -> /cafes */
  slug: string;
  /** Nav and heading label */
  title: string;
  /** Sits under the heading */
  intro: string;
  /** Shown when nothing is published yet */
  empty: string;
  /** Fixed ordering for the category groupings */
  order?: string[];
}

/** Groups entries by `category`, honouring a fixed order when given. */
export function groupByCategory(entries: Entry[], order?: string[]) {
  const seen = new Map<string, Entry[]>();
  for (const entry of entries) {
    if (!seen.has(entry.category)) seen.set(entry.category, []);
    seen.get(entry.category)!.push(entry);
  }
  const keys = order
    ? order.filter((k) => seen.has(k)).concat([...seen.keys()].filter((k) => !order.includes(k)))
    : [...seen.keys()];
  return keys.map((category) => ({ category, entries: seen.get(category)! }));
}

/** Groups entries by city, for the per-city pages. */
export function byCity(entries: Entry[], city: string) {
  return entries.filter((e) => e.city === city);
}
