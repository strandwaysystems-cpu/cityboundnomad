/*
 * Cafés, bars and places to eat — by city.
 *
 * Mostly empty on purpose: these have to come from Chandler, because the whole
 * value of the list is that every entry is somewhere he actually sat. Inventing
 * plausible cafés for cities he's visited would be the exact thing this site
 * exists not to do.
 *
 * Tallinn comes out of the origin story. Reykjavik came from Chandler directly
 * — September 2022, the trip where he started keeping records properly.
 *
 * An entry with a name but no reason behind it sits at `verified: false` with
 * an empty `note` and renders nothing, deliberately: a name on its own is a
 * directory listing, and a directory listing is what this list exists instead
 * of. The `note` is the entry.
 *
 * To add one, copy the object and fill it in. `city` must match a city name in
 * src/data/cities.ts exactly, which is what makes it show up on that city's
 * page as well as here.
 */

import type { Entry, ListMeta } from './lists';

export const CAFES_META: ListMeta = {
  slug: 'cafes',
  title: 'Cafés & Bars',
  intro:
    'Places I actually sat in, drank in, or kept going back to. One entry per place, no rankings, and nothing here from a list someone else wrote.',
  empty:
    'This list is being written from memory and camera roll, city by city. It fills up as I get to each one.',
  order: ['Coffee', 'Bars', 'Food'],
};

export const CAFES: Entry[] = [
  /* ── Tallinn, May 2022 ─────────────────────────────────────────────────── */
  {
    name: 'Butterfly Lounge',
    category: 'Bars',
    city: 'Tallinn',
    note: "Became the regular stop during the month on Narva Mantee. It's where I met the group of people that ended the night at someone's apartment at 7am — the night that made the whole trip make sense. Looking back I leaned on it far too heavily that month, though: it turned into the default rather than one option among several.",
    since: 'May 2022',
    url: null,
    verified: true,
  },

  {
    name: 'Kohvipaus',
    category: 'Coffee',
    city: 'Tallinn',
    note: 'The other regular during the month on Narva Mantee — somewhere I went often enough that it counted.',
    since: 'May 2022',
    url: null,
    verified: true,
  },

  /* ── Reykjavik, September 2022 ─────────────────────────────────────────── */
  {
    name: 'Kaffitár',
    category: 'Coffee',
    city: 'Reykjavik',
    note: 'The quick-coffee stop.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'BakaBaka',
    category: 'Coffee',
    city: 'Reykjavik',
    note: 'More of a pastry café than a coffee stop.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'Mokka Kaffi',
    category: 'Coffee',
    city: 'Reykjavik',
    note: 'Just a good place to have a coffee.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'The Dubliner',
    category: 'Bars',
    city: 'Reykjavik',
    note: 'Good local vibe, and the right room if you are travelling as a younger backpacker.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'Jungle Cocktail Bar',
    category: 'Bars',
    city: 'Reykjavik',
    note: 'Where to go when you want something a little fancier.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    /*
     * The same building as the Hi Loft Hostel stay review in stays.ts — this
     * entry is the bar, which is a different recommendation from the bed.
     */
    name: 'Hi Loft Hostel Bar',
    category: 'Bars',
    city: 'Reykjavik',
    note: "A good place to start an evening, and the happy hour matters in a city this expensive. You don't have to be staying there — anyone can walk in. I did stay at the hostel as well; that review is on the stays list.",
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'Islenski Barinn',
    category: 'Food',
    city: 'Reykjavik',
    note: 'Good for a proper local Icelandic evening meal.',
    since: 'September 2022',
    url: null,
    verified: true,
  },
  {
    name: 'Kafe Loki',
    category: 'Food',
    city: 'Reykjavik',
    note: 'Midday Icelandic dishes done well — the plokkfiskur is the one to order. Where I ended up the day after a heavy night.',
    since: 'September 2022',
    url: null,
    verified: true,
  },

];
