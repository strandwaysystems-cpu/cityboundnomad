/*
 * The Dispatch — the newsletter hub.
 *
 * The original build's header carried a stat strip reading "4,200+ subscribers"
 * and "52% open rate". Neither number was ever measured — they were written as
 * first-draft filler, and docs/email-infrastructure.md still lists the Beehiiv
 * publication for this brand as TBD. Publishing invented audience metrics on a
 * page whose selling point is honesty is the one thing this brand cannot do, so
 * the strip now states only what is true: the cadence, the price, and the
 * sponsorship policy.
 *
 * The four issues below are likewise unwritten. Their titles read as real
 * observations (Reynisfjara, Nyhavn, Tallinn) and are worth keeping as a
 * writing queue, but they are not published until they exist.
 */

export interface DispatchFact {
  value: string;
  label: string;
}

export const DISPATCH_FACTS: DispatchFact[] = [
  { value: 'Every Friday', label: 'Delivery' },
  { value: 'Free', label: 'Price' },
  { value: 'None', label: 'Sponsored content' },
];

export interface ExpectationItem {
  title: string;
  body: string;
}

export const WHAT_TO_EXPECT: ExpectationItem[] = [
  {
    title: 'City observations',
    body: "What I noticed, what surprised me, what I'd do differently. Not a travel guide — a journal.",
  },
  {
    title: 'Stay reviews',
    body: 'Honest assessments of hostels, apartments, and hotels. Pros, cons, price, and whether I\'d return.',
  },
  {
    title: 'Style notes',
    body: "What I'm wearing, what's working, what I'm replacing. Capsule wardrobe updates from the road.",
  },
  {
    title: 'Monthly cost breakdowns',
    body: 'Real numbers. What I spent, where, and whether it was worth it.',
  },
];

export interface Issue {
  number: number;
  title: string;
  preview: string;
  tags: string[];
  date: string;
  verified: boolean;
}

export const ISSUES: Issue[] = [
  {
    number: 1,
    title: "The First Issue: Why I'm Writing This",
    preview:
      "I've been travelling for three years and I've been terrible at documenting it. The Dispatch is my attempt to fix that — one honest note per week, from wherever I happen to be.",
    tags: ['Meta', 'Origin'],
    date: '18 April 2026',
    verified: false,
  },
  {
    number: 2,
    title: 'Reynisfjara Changed Everything',
    preview:
      "Black sand. Basalt columns. Waves that will kill you if you turn your back. I stood there for an hour and didn't take a single photo. Some places deserve your full attention.",
    tags: ['Iceland', 'Nature', 'Reflection'],
    date: '25 April 2026',
    verified: false,
  },
  {
    number: 3,
    title: 'Why Tallinn Is the Most Underrated City in Europe',
    preview:
      "€35/night apartments inside medieval walls. A digital nomad visa that actually works. The best coffee I've had since Copenhagen. I've been here three times and I keep coming back.",
    tags: ['Tallinn', 'Budget', 'Digital Nomad'],
    date: '2 May 2026',
    verified: false,
  },
  {
    number: 4,
    title: 'Nyhavn and the History You Walk Past',
    preview:
      "The colourful townhouses look like a postcard. They were built on the proceeds of the slave trade. Both things are true, and Copenhagen doesn't hide it — you just have to look.",
    tags: ['Copenhagen', 'History', 'Travel'],
    date: '9 May 2026',
    verified: false,
  },
];
