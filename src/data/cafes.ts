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
 * Where he gave a name but not yet a reason, the entry sits here with
 * `verified: false` and an empty `note`. It renders nothing until there is a
 * line behind it, deliberately: a name on its own is a directory listing, and a
 * directory listing is what this list exists instead of.
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
    note: "Became the regular stop during the month on Narva Mantee. It's where I met the group of people that ended the night at someone's apartment at 7am — the night that made the whole trip make sense.",
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
    name: 'Islenski Barinn',
    category: 'Food',
    city: 'Reykjavik',
    note: 'Good for a proper local Icelandic evening meal.',
    since: 'September 2022',
    url: null,
    verified: true,
  },

  /*
   * Held back — Chandler named these but hasn't said why yet. One line each
   * and they publish; the `note` is the whole point of the entry.
   */
  {
    name: 'Mokka Kaffi',
    category: 'Coffee',
    city: 'Reykjavik',
    note: '',
    since: 'September 2022',
    url: null,
    verified: false,
  },
  {
    /* Category is a guess pending confirmation — coffee, or a sit-down meal? */
    name: 'Kafe Loki',
    category: 'Food',
    city: 'Reykjavik',
    note: '',
    since: 'September 2022',
    url: null,
    verified: false,
  },
  {
    /* Category unconfirmed — bakery, café or somewhere to eat? */
    name: 'BakaBaka',
    category: 'Food',
    city: 'Reykjavik',
    note: '',
    since: 'September 2022',
    url: null,
    verified: false,
  },
];
