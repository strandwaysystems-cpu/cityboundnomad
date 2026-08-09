/*
 * Site-wide configuration. Everything that is "per-site" lives here so the
 * rest of the codebase never hardcodes a URL, a handle, or an account ID.
 */

export const SITE = {
  name: 'CityboundNomad',
  domain: 'cityboundnomad.com',
  url: 'https://cityboundnomad.com',
  title: "CityboundNomad — Places I've Been, Things I Use",
  tagline: 'A personal catalogue by Chandler',
  description:
    "A Canadian documenting European cities first-hand — the places I've been, the cafés and tours worth the time, what's in the bag, and why I travel this way. Everything here is from experience, not research.",
  author: 'Chandler',
  parentEntity: 'An entity of Strandway Systems',
  locale: 'en',
  ogImage: '/og-image.jpg',
} as const;

export const SOCIAL = {
  instagram: 'https://instagram.com/cityboundnomad',
  tiktok: 'https://tiktok.com/@cityboundnomad',
  facebook: 'https://facebook.com/cityboundnomad',
} as const;

export const CONTACT = {
  email: 'hello@cityboundnomad.com',
} as const;

/*
 * Analytics / consent. Both are gated behind public/consent.js and stay off
 * until the visitor opts in. Empty values disable the corresponding script, so
 * the site is compliant before these are filled in.
 * See docs/analytics-privacy-standard.md in strandway-ventures.
 */
export const ANALYTICS = {
  gaId: '',
  crazyEggSrc: '',
  searchConsoleVerification: '',
} as const;

export const NAV = [
  { label: 'Places', href: '/places' },
  { label: 'Things', href: '/things' },
  { label: 'Notes', href: '/notes' },
  { label: 'About', href: '/about' },
] as const;

export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
] as const;

/*
 * The four things the site is. Used on the homepage and in the footer.
 * Deliberately plain: this is a catalogue of one person's experience, not a
 * content brand with pillars.
 */
export const SECTIONS = [
  {
    num: '01',
    label: 'Places',
    href: '/places',
    tagline: "Every city I've been to, and what I did there.",
    description:
      'Cities, what they cost, where I slept, the cafés I kept going back to, and the tours that were worth the day. Grouped by the trip they belong to.',
  },
  {
    num: '02',
    label: 'Things',
    href: '/things',
    tagline: 'What I own, what I use, what I travel with.',
    description:
      "The wardrobe that fits in one bag, the hair and skin routine, the gear. Nothing listed that isn't actually in use.",
  },
  {
    num: '03',
    label: 'Notes',
    href: '/notes',
    tagline: 'Why I do it this way.',
    description:
      'The origin story, the trip timeline, and the thinking behind travelling light and staying longer. Written when there is something to say, not on a schedule.',
  },
] as const;
