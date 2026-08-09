/*
 * Cafés, bars and places to eat — by city.
 *
 * Mostly empty on purpose: these have to come from Chandler, because the whole
 * value of the list is that every entry is somewhere he actually sat. Inventing
 * plausible cafés for cities he's visited would be the exact thing this site
 * exists not to do.
 *
 * The one entry below is real — it comes out of the Tallinn origin story.
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
  {
    name: 'Butterfly Lounge',
    category: 'Bars',
    city: 'Tallinn',
    note: "Became the regular stop during the month on Narva Mantee. It's where I met the group of people that ended the night at someone's apartment at 7am — the night that made the whole trip make sense.",
    since: 'May 2022',
    url: null,
    verified: true,
  },
];
