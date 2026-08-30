/*
 * Tours and experiences — the GetYourGuide layer.
 *
 * The rule that makes this list worth anything: only tours actually taken. A
 * GetYourGuide storefront full of tours nobody has been on is just an affiliate
 * feed, which is what the rest of the portfolio already does. This one is a
 * record.
 *
 * `url` stays null until there is a real GetYourGuide partner link — the
 * affiliate-id-guard CI fails on placeholder IDs, and a bare gyg link with no
 * partner ID earns nothing anyway. Set `affiliate: true` alongside a real URL
 * and the entry renders with rel="sponsored" and the disclosure note.
 *
 * The three Iceland entries came from Chandler. None of them carries an
 * operator or a price yet — those are the specifics that make a tour entry
 * useful to someone deciding, and they still need to come from him. The south
 * coast note is assembled from what he has already written on the Reykjavik
 * city page and the Hi Loft review, so it is his own account rather than
 * anything filled in around him.
 *
 * Note that Golden Circle is published as a negative recommendation. That is
 * the point of the list: a tour that was not worth it is worth saying so about,
 * and an affiliate feed structurally cannot.
 */

import type { Entry, ListMeta } from './lists';

export const TOURS_META: ListMeta = {
  slug: 'tours',
  title: 'Tours',
  intro:
    'Every tour on this page is one I actually went on. If a booking link earns a commission it is marked — but nothing gets listed because it pays, only because it was worth the day.',
  empty:
    'Nothing listed yet. The Iceland south-coast trips are first up once I write them down properly — operator, route, what it actually cost.',
  order: ['Day trips', 'Walking tours', 'Food & drink', 'Outdoors'],
};

export const TOURS: Entry[] = [
  /* ── Iceland, September 2022 ───────────────────────────────────────────── */
  {
    /* TODO: which operator, and what it cost. */
    name: 'South Coast day trip',
    category: 'Day trips',
    city: 'Reykjavik',
    note: "Seljalandsfoss, Skógafoss and the black sand beaches, in one long day out of Reykjavik — the kind of scenery that makes you feel like you're on a different planet. The Hi Loft staff pointed me at the operators that were worth the money.",
    since: 'September 2022',
    url: null,
    affiliate: false,
    verified: true,
  },

  {
    name: 'Golden Circle',
    category: 'Day trips',
    city: 'Reykjavik',
    note: "Overrated, with the exception of Gullfoss. If renting a car is an option, do that instead and set your own schedule — the stops are worth what you decide to give them, not what a coach timetable decides.",
    since: 'September 2022',
    url: null,
    affiliate: false,
    verified: true,
  },
  {
    name: 'Sky Lagoon',
    category: 'Outdoors',
    city: 'Reykjavik',
    note: 'An easily accessible alternative to the Blue Lagoon — and good enough that I felt fine about skipping the Blue Lagoon altogether.',
    since: 'September 2022',
    url: null,
    affiliate: false,
    verified: true,
  },
];
