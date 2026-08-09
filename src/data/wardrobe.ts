/*
 * The wardrobe — what's in the bag.
 *
 * Carried over from the Manus build's capsule list. Every item below is still
 * `verified: false`: the brands, prices and quantities were generated as
 * first-draft filler and were never checked against what Chandler actually
 * owns. They render nothing until confirmed. See src/data/flags.ts.
 *
 * Confirming one is a one-word edit. Correcting one is editing the object.
 */

import type { Entry, ListMeta } from './lists';

export const WARDROBE_META: ListMeta = {
  slug: 'wardrobe',
  title: 'Wardrobe',
  intro:
    "Everything I travel with, listed. Functionality first, one bag, a palette that works in every city. Nothing here I don't wear.",
  empty:
    'Being rebuilt from what is genuinely in the bag right now, rather than approximated. Back shortly.',
  order: ['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Bag'],
};

export const WARDROBE: Entry[] = [
  { name: 'Merino wool crew neck', category: 'Tops', detail: 'Uniqlo · €35', note: '3× — black, navy, grey', url: null, verified: false },
  { name: 'Oxford button-down', category: 'Tops', detail: 'COS · €65', note: '2× — white, light blue', url: null, verified: false },
  { name: 'Merino T-shirt', category: 'Tops', detail: 'Outlier · €95', note: '2× — black, charcoal', url: null, verified: false },
  { name: 'Slim chino', category: 'Bottoms', detail: 'COS · €75', note: '2× — black, navy', url: null, verified: false },
  { name: 'Technical jogger', category: 'Bottoms', detail: 'Lululemon · €110', note: '1× — black', url: null, verified: false },
  { name: 'Packable down jacket', category: 'Outerwear', detail: "Arc'teryx · €280", note: '1× — black. The one splurge.', url: null, verified: false },
  { name: 'Merino cardigan', category: 'Outerwear', detail: 'Uniqlo · €45', note: '1× — charcoal', url: null, verified: false },
  { name: 'White leather sneaker', category: 'Footwear', detail: 'Common Projects · €350', note: '1× — the only pair', url: null, verified: false },
  { name: 'Merino wool socks', category: 'Footwear', detail: 'Darn Tough · €22', note: '5× — black', url: null, verified: false },
  { name: 'Everyday Backpack 26L', category: 'Bag', detail: 'Peak Design · €290', note: 'The entire wardrobe fits in this.', url: null, verified: false },
];

/** The four principles behind the wardrobe. Brand philosophy, not product claims. */
export const WARDROBE_PRINCIPLES = [
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
