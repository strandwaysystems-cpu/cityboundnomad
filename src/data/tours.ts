/*
 * Tours and experiences — the GetYourGuide layer.
 *
 * The rule that makes this list worth anything: only tours actually taken. A
 * GetYourGuide storefront full of tours nobody has been on is just an affiliate
 * feed, which is what the rest of the portfolio already does. This one is a
 * record.
 *
 * Tours book through GetYourGuide, partner M0TZRO3 — see AFFILIATES in
 * src/data/site.ts for which programme covers what, and why Travelpayouts is
 * not the one. Build the link in the GetYourGuide partner portal and paste it
 * whole; a gyg URL without the partner ID on it earns nothing and looks
 * identical to one that does. Set `affiliate: true` alongside it and the entry
 * renders with rel="sponsored" and the disclosure note.
 *
 * What is still missing is the tours themselves, not the programme. The
 * Iceland south-coast day trips out of Reykjavik are the obvious first
 * entries — the Hi Loft staff recommended the operators — but the specifics
 * (which operator, which route, what it cost) need to come from Chandler.
 */

import type { Entry, ListMeta } from './lists';

export const TOURS_META: ListMeta = {
  slug: 'tours',
  title: 'Tours',
  intro:
    'Every tour on this page is one I actually went on. If a booking link earns a commission it is marked, but nothing gets listed because it pays, only because it was worth the day.',
  empty:
    'Nothing listed yet. The Iceland south-coast trips are first up once I write them down properly: operator, route, what it actually cost.',
  order: ['Day trips', 'Walking tours', 'Food & drink', 'Outdoors'],
};

export const TOURS: Entry[] = [];
