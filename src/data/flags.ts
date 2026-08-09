/*
 * Content publication flags.
 *
 * The Manus build this site was ported from mixed two very different kinds of
 * content in the same database:
 *
 *   1. Chandler's real trips, written during the "authenticity pass" — the
 *      cities, the May 2022 Tallinn origin story, the trip timeline, the Hi
 *      Loft Hostel review. All of that is published.
 *
 *   2. First-draft filler generated before the authenticity pass — invented
 *      stay reviews for places with no notes behind them, a capsule wardrobe
 *      with specific brands and prices, style posts and essays that were never
 *      written, and newsletter metrics (subscriber counts, open rates) that
 *      were never measured.
 *
 * The second group is first-person claims about a real person, on that person's
 * own brand, and the brand's entire premise is honest documentation — so it is
 * kept in the data files but not published. Each item carries `verified: false`.
 *
 * Two ways to publish it:
 *   • Per item — set that item's `verified` to true once the details are right.
 *   • All at once — set PUBLISH_UNVERIFIED to true below (useful in `npm run
 *     dev` to see every section fully populated while designing).
 */

export const PUBLISH_UNVERIFIED = false;

export function published<T extends { verified: boolean }>(items: T[]): T[] {
  return PUBLISH_UNVERIFIED ? items : items.filter((item) => item.verified);
}
