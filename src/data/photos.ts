/*
 * GENERATED FILE — do not edit by hand.
 *
 * Written by tools/import-photos.mjs from exported photos. Re-running the
 * import overwrites this file, so any manual change here is lost.
 *
 * The one thing worth editing is `alt`: it defaults to "City, Country", which
 * is accurate but says nothing. Better alt text describes what is in the frame.
 * If you improve it, move the photo's object into ALT_OVERRIDES below instead,
 * which the importer preserves.
 *
 * No coordinates are stored here, and the .webp files carry no EXIF — see the
 * privacy notes in tools/import-photos.mjs.
 */

export interface Photo {
  src: string;
  /** Narrower copy for the photo grid; `src` is for full-width use. */
  thumb: string;
  width: number;
  height: number;
  /** Matches a name in cities.ts */
  city: string;
  /** YYYY-MM-DD, or null when the photo had no capture date */
  taken: string | null;
  alt: string;
}

/** Hand-written alt text, keyed by `src`. Survives re-importing. */
export const ALT_OVERRIDES: Record<string, string> = {
  '/images/places/tallinn/tallinn-01.webp':
    "Red tile roofs of Tallinn's old town seen from a viewing platform, with ferries in the harbour beyond",
  '/images/places/tallinn/tallinn-02.webp':
    'Alexander Nevsky Cathedral and a tower of the medieval town wall, across the park below Toompea',
  '/images/places/tallinn/tallinn-03.webp':
    "An empty cobbled street in Tallinn's old town, lit by wall lamps at dusk",
  '/images/places/tallinn/tallinn-04.webp':
    'Chandler walking below the Toompea limestone cliff in Tallinn, under bare spring branches',
  '/images/places/tartu/tartu-01.webp':
    "Chandler at a railing above Tartu's rooftops, with the brick tower of St John's Church behind",
  '/images/places/tartu/tartu-02.webp':
    'An empty street in central Tartu in the low evening light',
  '/images/places/tartu/tartu-03.webp':
    "Tartu's town hall across Raekoja plats, café umbrellas in the foreground under a storm sky",
};

const RAW: Photo[] = [
  {
    "src": "/images/places/tartu/tartu-01.webp",
    "thumb": "/images/places/tartu/tartu-01-720.webp",
    "width": 1600,
    "height": 2133,
    "city": "Tartu",
    "taken": null,
    "alt": "Tartu, Estonia"
  },
  {
    "src": "/images/places/tartu/tartu-02.webp",
    "thumb": "/images/places/tartu/tartu-02-720.webp",
    "width": 1600,
    "height": 2133,
    "city": "Tartu",
    "taken": null,
    "alt": "Tartu, Estonia"
  },
  {
    "src": "/images/places/tartu/tartu-03.webp",
    "thumb": "/images/places/tartu/tartu-03-720.webp",
    "width": 1600,
    "height": 2133,
    "city": "Tartu",
    "taken": null,
    "alt": "Tartu, Estonia"
  }
];

export const PHOTOS: Photo[] = RAW.map((p) => ({ ...p, alt: ALT_OVERRIDES[p.src] ?? p.alt }));

export function photosFor(city: string): Photo[] {
  return PHOTOS.filter((p) => p.city === city);
}
