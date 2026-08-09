/*
 * Pillar 02 — Scandinavian Men's Style.
 *
 * The four principles are brand philosophy from the Three-Pillar Framework and
 * are published. The capsule wardrobe and the style posts are not: the specific
 * brands, prices and quantities were generated as first-draft filler, and the
 * post excerpts make first-person claims ("I've washed it 60+ times") about
 * articles that were never written. Confirm the real capsule and they publish —
 * see src/data/flags.ts.
 */

export interface Principle {
  num: string;
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    num: '01',
    title: 'Functionality first',
    body: "Every piece has to work. Not just look good — work. If it can't be worn three different ways, it doesn't go in the bag.",
  },
  {
    num: '02',
    title: 'Monochromatic palette',
    body: 'Black, navy, grey, and off-white. The palette that works in every city, every context, every season. No decisions in the morning.',
  },
  {
    num: '03',
    title: 'One bag, always',
    body: "The one-bag constraint is the design constraint. If it doesn't fit in a 26L pack, it doesn't come. This forces better decisions.",
  },
  {
    num: '04',
    title: 'Buy once, buy well',
    body: 'The Scandinavian approach to consumption. Fewer, better things. No fast fashion. No impulse purchases. Only what earns its place.',
  },
];

export interface CapsuleItem {
  category: string;
  name: string;
  brand: string;
  price: string;
  notes: string;
  /** Real affiliate URL, or null. Never a placeholder — see affiliate-id-guard.yml */
  affiliateUrl: string | null;
  verified: boolean;
}

export const CAPSULE: CapsuleItem[] = [
  { category: 'Tops', name: 'Merino wool crew neck', brand: 'Uniqlo', price: '€35', notes: '3× — black, navy, grey', affiliateUrl: null, verified: false },
  { category: 'Tops', name: 'Oxford button-down', brand: 'COS', price: '€65', notes: '2× — white, light blue', affiliateUrl: null, verified: false },
  { category: 'Tops', name: 'Merino T-shirt', brand: 'Outlier', price: '€95', notes: '2× — black, charcoal', affiliateUrl: null, verified: false },
  { category: 'Bottoms', name: 'Slim chino', brand: 'COS', price: '€75', notes: '2× — black, navy', affiliateUrl: null, verified: false },
  { category: 'Bottoms', name: 'Technical jogger', brand: 'Lululemon', price: '€110', notes: '1× — black', affiliateUrl: null, verified: false },
  { category: 'Outerwear', name: 'Packable down jacket', brand: "Arc'teryx", price: '€280', notes: '1× — black. The one splurge.', affiliateUrl: null, verified: false },
  { category: 'Outerwear', name: 'Merino cardigan', brand: 'Uniqlo', price: '€45', notes: '1× — charcoal', affiliateUrl: null, verified: false },
  { category: 'Footwear', name: 'White leather sneaker', brand: 'Common Projects', price: '€350', notes: '1× — the only pair', affiliateUrl: null, verified: false },
  { category: 'Footwear', name: 'Merino wool socks', brand: 'Darn Tough', price: '€22', notes: '5× — black', affiliateUrl: null, verified: false },
  { category: 'Bag', name: 'Everyday Backpack 26L', brand: 'Peak Design', price: '€290', notes: 'The entire wardrobe fits in this.', affiliateUrl: null, verified: false },
];

export const CAPSULE_CATEGORY_ORDER = ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Bag'];

export interface StylePost {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: string;
  verified: boolean;
}

export const STYLE_POSTS: StylePost[] = [
  {
    title: 'The Uniqlo Merino Crew: 18 Months In',
    slug: 'uniqlo-merino-crew-18-months',
    excerpt:
      "I've washed it 60+ times. It's still the first thing I pack. Here's why it's the best €35 you can spend on travel clothing.",
    date: 'April 2026',
    readTime: '5 min',
    verified: false,
  },
  {
    title: 'Why I Switched to a 26L Bag (And Never Looked Back)',
    slug: '26l-bag-switch',
    excerpt:
      'The constraint is the point. When you can only bring 26 litres, you make better decisions about everything.',
    date: 'March 2026',
    readTime: '7 min',
    verified: false,
  },
  {
    title: 'COS vs. Arket: Which Scandinavian Brand Is Worth It?',
    slug: 'cos-vs-arket',
    excerpt:
      "I've spent money at both. Here's an honest comparison from someone who actually wears these clothes while travelling.",
    date: 'February 2026',
    readTime: '6 min',
    verified: false,
  },
];
