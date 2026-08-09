/*
 * GENERATED FILE — do not edit by hand.
 *
 * Written by tools/import-photos.mjs from exported photos. Re-running the
 * import overwrites this file, so any manual change here is lost.
 *
 * This is the empty starting state. To fill it:
 *
 *   1. Export from Apple Photos with "Location Information" ticked
 *      (see the notes at the top of tools/import-photos.mjs — that checkbox is
 *      the step that usually goes wrong).
 *   2. npm run photos -- ~/Desktop/cbn-export --dry-run     # see the matches
 *   3. npm run photos -- ~/Desktop/cbn-export               # write them
 *
 * Improve the default "City, Country" alt text by adding entries to
 * ALT_OVERRIDES below — those survive a re-import.
 *
 * No coordinates are stored here, and the .webp files carry no EXIF — see the
 * privacy notes in tools/import-photos.mjs.
 */

export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Matches a name in cities.ts */
  city: string;
  /** YYYY-MM-DD, or null when the photo had no capture date */
  taken: string | null;
  alt: string;
}

/** Hand-written alt text, keyed by `src`. Survives re-importing. */
export const ALT_OVERRIDES: Record<string, string> = {};

const RAW: Photo[] = [];

export const PHOTOS: Photo[] = RAW.map((p) => ({ ...p, alt: ALT_OVERRIDES[p.src] ?? p.alt }));

export function photosFor(city: string): Photo[] {
  return PHOTOS.filter((p) => p.city === city);
}
