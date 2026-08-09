/*
 * Site-wide configuration. Everything that is "per-site" lives here so the
 * rest of the codebase never hardcodes a URL, a handle, or an account ID.
 */

export const SITE = {
  name: 'CityboundNomad',
  domain: 'cityboundnomad.com',
  url: 'https://cityboundnomad.com',
  title: "CityboundNomad — Minimalist Solo Travel, Scandinavian Style, Lifestyle Freedom",
  tagline: 'A minimalist travel journal by Chandler',
  description:
    "A Canadian solo traveller documenting European cities, honest stay reviews, Scandinavian men's style, and the minimalist philosophy of building a life without a fixed address.",
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

/*
 * The Dispatch newsletter.
 *
 * Per docs/email-infrastructure.md in strandway-ventures, CityboundNomad's
 * newsletter platform is Beehiiv (never MailerLite or ConvertKit — those
 * belong to the travel-affiliate and Digital City brands respectively). The
 * publication/form IDs were still marked TBD in that doc, so `action` is empty
 * here.
 *
 * While `action` is empty every signup form falls back to a mailto: link, which
 * works on day one without pretending an endpoint exists. Paste the Beehiiv
 * form POST URL in below and the forms switch to real submissions with no other
 * change. Beehiiv's embedded form action looks like:
 *   https://embeds.beehiiv.com/<publication-uuid>
 */
export const NEWSLETTER = {
  action: '',
  emailField: 'email',
  fallbackMailto: 'hello@cityboundnomad.com',
  cadence: 'Every Friday',
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
  { label: 'Travel', href: '/travel' },
  { label: 'Style', href: '/style' },
  { label: 'The Journey', href: '/the-journey' },
  { label: 'Dispatch', href: '/dispatch' },
  { label: 'About', href: '/about' },
] as const;

export const LEGAL_NAV = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Cookie Policy', href: '/cookie-policy' },
  { label: 'Affiliate Disclosure', href: '/affiliate-disclosure' },
] as const;

export const PILLARS = [
  {
    num: '01',
    label: 'Minimalist Solo Travel',
    href: '/travel',
    tagline: 'Real cities. Real costs. Honest reviews.',
    description:
      'The documentary layer of the brand. City journals, stay logs, cost breakdowns, and the honest record of what it actually costs to travel this way. No sponsored destinations — only genuine experience.',
    short:
      'The documentary layer. City journals, stay logs, cost breakdowns. The honest record of what it actually costs to travel this way.',
    monetization: 'Hostelworld · Booking.com · GetYourGuide · Airbnb',
  },
  {
    num: '02',
    label: "Scandinavian Men's Style",
    href: '/style',
    tagline: 'Functionality-first dressing. One bag. No compromises.',
    description:
      'The aesthetic identity layer. Capsule wardrobes, one-bag packing, and the design philosophy behind dressing the same in Atlantic Canada as in Copenhagen. Honest product reviews — only what is actually worn.',
    short:
      'The aesthetic identity layer. Capsule wardrobes, one-bag packing, and the design philosophy behind dressing the same in Atlantic Canada as in Copenhagen.',
    monetization: 'Clothing & gear affiliate links · Brand partnerships',
  },
  {
    num: '03',
    label: 'Lifestyle Freedom',
    href: '/the-journey',
    tagline: 'Building a life without a fixed address. The honest version.',
    description:
      'The connective tissue of the brand. It started with a one-month Airbnb in Tallinn in May 2022. Journey updates, systems essays, and the honest realities of building a life without a fixed address. This is where readers become subscribers.',
    short:
      'The connective tissue. Journey updates, systems essays, and the honest realities of building a location-independent life.',
    monetization: 'Newsletter growth · Digital products · Future course pipeline',
  },
] as const;
