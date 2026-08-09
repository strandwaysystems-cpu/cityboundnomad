/*
 * Pillar 03 — Lifestyle Freedom / The Journey.
 *
 * The timeline below is the real one, assembled from the authenticity-pass
 * seeds: Tallinn May 2022, Iceland September 2022, then the 2023, 2024 and 2025
 * trips. The first-draft seed also contained a contradictory timeline (a
 * one-way flight out of Halifax in September 2022, subscriber-count milestones,
 * a brand partnership) which the authenticity pass replaced — none of it is
 * carried over here, because it describes a different, invented history.
 *
 * The origin-story essay is the one piece of long-form that was actually
 * written, so it is published and has a page at /the-journey/tallinn-may-2022.
 * The other five essays are titles and excerpts with no body behind them.
 */

export interface Milestone {
  date: string;
  label: string;
}

export const MILESTONES: Milestone[] = [
  {
    date: 'May 2022',
    label: 'Booked a one-month Airbnb on Narva Mantee, Tallinn. First solo trip.',
  },
  {
    date: 'May 2022',
    label:
      'Met strangers at the Butterfly Lounge. Ended up at an apartment party at 7am. Walked home at 8am. Realised this was the life.',
  },
  {
    date: 'September 2022',
    label:
      'Reykjavik, Iceland. Hi Loft Hostel, south coast day trips, and a nightlife scene that proved the people are as wild as the landscape.',
  },
  {
    date: '2023',
    label:
      'A four-month, 21-city run across Europe — London, Prague, Budapest, Belgrade, Sofia, Crete, the Greek islands, the Baltics, Finland, and up through Sweden to Stockholm. The trip that turned travel from a passion into a practice.',
  },
  {
    date: '2024',
    label:
      'Lisbon, Lagos, and Sevilla with a friend. The first trip with company — and proof that the right travel partner changes everything.',
  },
  {
    date: '2025',
    label:
      'Copenhagen, Gothenburg, Jönköping, Stockholm. A return to Scandinavia — the region that started the style obsession.',
  },
];

export type EssayType = 'origin_story' | 'systems' | 'philosophy' | 'honest_notes' | 'update';

export const ESSAY_TYPE_LABELS: Record<EssayType, string> = {
  origin_story: 'Origin Story',
  systems: 'Systems',
  philosophy: 'Philosophy',
  honest_notes: 'Honest Notes',
  update: 'Update',
};

export interface Essay {
  title: string;
  slug: string;
  type: EssayType;
  excerpt: string;
  /** Paragraphs. Empty means the essay has a title but was never written. */
  body: string[];
  date: string;
  readTime: string;
  verified: boolean;
}

export const ESSAYS: Essay[] = [
  {
    title: 'Tallinn, May 2022 — Where It Started',
    slug: 'tallinn-may-2022',
    type: 'origin_story',
    excerpt:
      "I booked the Airbnb on a Tuesday. One month, Narva Mantee, Tallinn, Estonia. I had always known I wanted to travel — but it was May 2022 when I found out that travel wasn't just something I wanted to do. It was something I needed to do.",
    body: [
      "I booked the Airbnb on a Tuesday. One month, Narva Mantee, Tallinn, Estonia. I had always known I wanted to travel — that vague, persistent feeling that the life I was living wasn't quite the right shape. But it was May 2022 when I found out that travel wasn't just something I wanted to do. It was something I needed to do.",
      'The apartment was on a long, straight road that runs east from the old town. Nothing glamorous about the street itself — tram lines, Soviet-era blocks, a few cafes. But it was mine for a month, and that felt like everything.',
      "I didn't have a plan. I walked. I found the old town, which is one of the best-preserved medieval centres in Europe and somehow still feels lived-in rather than museumified. I found the Butterfly Lounge, which became a regular stop. I found that I was capable of walking into a room full of strangers and starting a conversation — something I hadn't been entirely sure about before I left.",
      "One night I met a group of people at the Butterfly Lounge. We ended up at someone's apartment. I walked home at 8am as the city was waking up, and I remember thinking: this is what I came for. Not the party specifically. The feeling of being somewhere completely new, with people I'd never met, having a night that couldn't have happened anywhere else.",
      "I took day trips to Tartu, Estonia's university city — quieter, more local, a completely different energy. I went to Pärnu, the beach town where Estonians go to decompress. I took the ferry to Helsinki, which is two hours across the Baltic and a completely different world — more expensive, more design-forward, the Scandinavian aesthetic in full effect. Standing in Helsinki was the first time I really understood what I was chasing with the style side of this project. The way people dressed there wasn't about fashion. It was about function and intention.",
      "I came back from that month with a few things I didn't have before. Confidence, mainly — the knowledge that I could go somewhere alone and not just survive it but genuinely thrive. A clearer sense of what I wanted the next few years to look like. And a deep appreciation for the European approach to life: slower, more intentional, rooted in place and history in a way that's hard to find elsewhere.",
      'That trip is where CityboundNomad started. Not as a brand or a project, but as a realisation. The cities, the style, the freedom — they were always connected. It just took a month in Tallinn to see it clearly.',
    ],
    date: 'April 2026',
    readTime: '7 min',
    verified: true,
  },

  /* ── Unpublished: titles and excerpts with no essay behind them ────────── */
  {
    title: 'The Minimalist Travel Budget: What I Actually Spend',
    slug: 'minimalist-travel-budget',
    type: 'systems',
    excerpt:
      'Real numbers. Monthly breakdowns. The actual cost of this lifestyle — including the months where I got it wrong.',
    body: [],
    date: 'March 2026',
    readTime: '8 min',
    verified: false,
  },
  {
    title: 'On Staying Longer: Why I Stopped Rushing Between Cities',
    slug: 'staying-longer',
    type: 'philosophy',
    excerpt:
      'The shift from tourist to traveler. What changes when you stay two weeks instead of two days.',
    body: [],
    date: 'February 2026',
    readTime: '6 min',
    verified: false,
  },
  {
    title: 'Building a Location-Independent Income: Year One',
    slug: 'location-independent-income-year-one',
    type: 'systems',
    excerpt:
      "What worked, what didn't, and what I wish I'd known. A transparent look at the first year of building income while moving.",
    body: [],
    date: 'April 2026',
    readTime: '11 min',
    verified: false,
  },
  {
    title: 'The Loneliness Nobody Talks About',
    slug: 'loneliness-solo-travel',
    type: 'honest_notes',
    excerpt:
      "Solo travel is incredible. It's also sometimes deeply lonely. Both things are true. Here's what I've learned about navigating that.",
    body: [],
    date: 'December 2025',
    readTime: '7 min',
    verified: false,
  },
];
