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
 * The Iceland south-coast day trips out of Reykjavik are the obvious first
 * entries — the Hi Loft staff recommended the operators — but the specifics
 * (which operator, which route, what it cost) need to come from Chandler.
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

export const TOURS: Entry[] = [];
