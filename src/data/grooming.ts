/*
 * Hair and skin — what actually gets used.
 *
 * Empty until Chandler fills it in. This is the list where invented entries
 * would be most obviously wrong: nobody can guess someone else's routine, and
 * a grooming list that isn't real is just an affiliate page wearing a costume.
 *
 * The shape to copy:
 *
 *   {
 *     name: 'Moisturiser',
 *     category: 'Skin',
 *     detail: 'Brand · size · roughly what it costs',
 *     note: 'Why this one, and what it replaced.',
 *     since: 'Using it since 2024',
 *     url: null,          // real affiliate link, or null
 *     affiliate: false,
 *     verified: true,
 *   }
 */

import type { Entry, ListMeta } from './lists';

export const GROOMING_META: ListMeta = {
  slug: 'grooming',
  title: 'Hair & Skin',
  intro:
    'The routine, such as it is. Travel-sized, minimal, and the same in every city — which is the only reason it holds up.',
  empty:
    'Not written up yet. It is a short list, which is rather the point, but it should be an accurate one before it goes here.',
  order: ['Hair', 'Skin', 'Body', 'Fragrance'],
};

export const GROOMING: Entry[] = [];
