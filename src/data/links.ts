/*
 * The link-in-bio page at /links.
 *
 * One place to point an Instagram or TikTok bio at: it sends people into the
 * site, out to the other profiles, and to the handful of things worth
 * recommending. Deliberately unlisted — it isn't in the nav and it carries
 * noindex, because it is a hallway, not a page anyone should land on from
 * search.
 *
 * ── Affiliate links ───────────────────────────────────────────────────────
 *
 * Set `affiliate: true` and the link renders with rel="noopener sponsored",
 * which is what makes the tracker log it as an affiliate click rather than a
 * plain outbound one, and what puts it under the disclosure line. The
 * disclosure is not optional — it is the FTC/ASA requirement and it is also
 * just the honest thing to do on a site whose whole premise is honesty.
 *
 * Only ever put real, working links here. `affiliate-id-guard.yml` fails the
 * build on placeholder IDs, so a half-finished link cannot reach the site.
 */

export interface BioLink {
  label: string;
  /** The small line under the label. Say what it actually is. */
  sublabel?: string;
  href: string;
  /** External links open in a new tab; internal ones stay put. */
  external?: boolean;
  affiliate?: boolean;
}

export interface BioGroup {
  heading: string;
  /** Shown under the heading — used for the affiliate disclosure. */
  note?: string;
  links: BioLink[];
}

export const BIO = {
  handle: '@cityboundnomad',
  strapline: "Places I've been. Things I use. All of it first-hand.",
} as const;

export const BIO_GROUPS: BioGroup[] = [
  {
    heading: 'The site',
    links: [
      {
        label: 'Places',
        sublabel: "Every city I've been to, and what I did there",
        href: '/places',
      },
      {
        label: 'Things I use',
        sublabel: 'The wardrobe, the routine, the gear',
        href: '/things',
      },
      {
        label: 'Notes',
        sublabel: 'Why I travel this way',
        href: '/notes',
      },
      {
        label: 'About me',
        sublabel: 'Chandler — Atlantic Canada, then Europe',
        href: '/about',
      },
    ],
  },
  {
    heading: 'Elsewhere',
    links: [
      { label: 'Instagram', href: 'https://instagram.com/cityboundnomad', external: true },
      { label: 'TikTok', href: 'https://tiktok.com/@cityboundnomad', external: true },
    ],
  },
  {
    heading: 'What I use',
    note: 'These earn me a commission at no extra cost to you.',
    links: [
      {
        label: 'Travelpayouts',
        sublabel: 'The affiliate network behind the travel links on this site',
        href: 'https://www.travelpayouts.com/?marker=726094',
        external: true,
        affiliate: true,
      },
      /*
       * Room for more. The obvious next ones for this brand are a
       * GetYourGuide partner link (which would also unblock src/data/tours.ts)
       * and whatever accommodation programme ends up being used. Add them the
       * same way — real link, `affiliate: true`, and a sublabel that says what
       * the thing actually is rather than selling it.
       */
    ],
  },
];
