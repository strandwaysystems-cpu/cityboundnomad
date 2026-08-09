/*
 * Every image reference on the site, in one file.
 *
 * ⚠️  These CloudFront URLs are Manus's asset CDN, inherited from the previous
 * build. They render today but they are NOT under our control and can vanish
 * without notice. Before this site is treated as permanent, download each one,
 * convert to .webp, drop it in `public/images/`, and change the value here to
 * the local path — that is the only edit required, nothing else imports these
 * URLs directly.
 *
 * `null` means the original asset did not survive the Manus export (it lived at
 * a `/manus-storage/...` path that only resolved inside Manus's runtime). Every
 * component treats a null image as "render without media", so the layout stays
 * intact — but these are the photos worth restoring first. See CONTENT-TODO.md.
 */

const CDN = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663417824304/F7b6SFnWCLwyMjqYJ7ubHh';

export const IMAGES = {
  /** Copenhagen cobblestone street — homepage hero */
  hero: `${CDN}/IMG_1068_6e0e777a.jpeg`,
  /** Travel pillar */
  travel: `${CDN}/IMG_8108_df1be0e7.jpeg`,
  /** All-black travel outfit — Style pillar */
  style: `${CDN}/IMG_7866_4114edb3.png`,
  /** Chandler in a European cafe — The Journey pillar */
  journey: `${CDN}/IMG_0943_a7de6966.png`,
  stockholm: `${CDN}/IMG_8123_74822907.jpeg`,
  reykjavik: `${CDN}/IMG_7501_59090165.jpeg`,
  parnu: `${CDN}/parnu-dusk_7e356beb.jpeg`,

  /* Stock stand-ins from the original seed — replace with Chandler's own shots */
  tallinn: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=900&h=600&fit=crop&auto=format',
  copenhagen: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=900&h=600&fit=crop&auto=format',
  chania: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=900&h=600&fit=crop&auto=format',

  /* Lost in the Manus export */
  tartuPortrait: null,
  londonTowerBridge: null,
} as const;

export type ImageRef = string | null;
