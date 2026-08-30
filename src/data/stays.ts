/*
 * Stay logs — the honest accommodation reviews under Pillar 01.
 *
 * Only the Hi Loft Hostel entry came out of the authenticity pass with real
 * detail behind it. The other four are first-draft filler: invented ratings,
 * invented pros and cons, and bare booking.com / airbnb.com links with no
 * affiliate ID on them. They stay here, unpublished, until there are real notes
 * to write them from. See src/data/flags.ts.
 */

export interface Stay {
  name: string;
  city: string;
  country: string;
  stayType: 'hostel' | 'airbnb' | 'hotel' | 'guesthouse' | 'other';
  pricePerNight: string;
  rating: number;
  pros: string[];
  cons: string[];
  verdict: string;
  /** Must carry a real affiliate ID before it is rendered — see affiliate-id-guard.yml */
  bookingUrl: string | null;
  stayDate: string;
  verified: boolean;
}

export const STAYS: Stay[] = [
  {
    /*
     * Rating is read from "I would highly recommend it" — Chandler gave the
     * endorsement, not the number. Drop it to 4 if 5 overstates it.
     *
     * `cons` is empty on purpose. He was asked for downsides and had none, and
     * StayLog.astro renders nothing for an empty list rather than an empty
     * heading, so the review reads as written rather than as unfinished.
     */
    name: 'Avantgard building, Narva Mantee',
    city: 'Tallinn',
    country: 'Estonia',
    stayType: 'airbnb',
    pricePerNight: 'CAD 71/night — CAD 2,000 for 28 nights, about €53/night',
    rating: 5,
    pros: [
      'A 50% long-stay discount cut the rate from CAD 143 to about CAD 71 a night — roughly €105 down to €53 — so booking 28 nights rather than a week halved the price',
      'Historical building with genuinely nice rooms, central to both the old town and Kadriorg without being in the middle of either',
      'Lift, a laundromat in the basement and a small gym — the things that are irrelevant on a weekend and matter enormously on a month-long stay',
      'Good enough that I stayed there again on my second visit to Tallinn',
    ],
    cons: [],
    verdict:
      'A historical building on Narva Mantee, central to both the old town and Kadriorg without being in the middle of either. Lift, laundry in the basement, a small gym, and rooms that are genuinely nice. I stayed here both times I visited Tallinn, and I would highly recommend it.',
    bookingUrl: null,
    stayDate: 'May 2022, and again on the 2023 run',
    verified: true,
  },
  {
    name: 'Hi Loft Hostel',
    city: 'Reykjavik',
    country: 'Iceland',
    stayType: 'hostel',
    pricePerNight: '€45/night',
    rating: 4,
    pros: [
      'Central Reykjavik location',
      'Great social atmosphere — met people doing the same south coast day trips',
      'Staff give genuinely useful local advice',
      "Good value for Iceland's price level",
    ],
    cons: [
      'Iceland is expensive regardless of where you stay',
      'Dorm noise on weekend nights when the city goes out',
    ],
    verdict:
      'A solid base for exploring Iceland. Central location in Reykjavik, good social atmosphere, and the staff actually know the city well — they pointed me toward day trip operators that were worth the money. For a hostel in one of the most expensive cities in Europe, the value is genuinely good.',
    bookingUrl: null,
    stayDate: 'September 2022',
    verified: true,
  },

  /* ── Unpublished: first-draft filler, no real notes behind these ───────── */
  {
    name: 'Generator Copenhagen',
    city: 'Copenhagen',
    country: 'Denmark',
    stayType: 'hostel',
    pricePerNight: '€32/night',
    rating: 4.2,
    pros: ['Central location', 'Clean dorms', 'Good bar'],
    cons: ['Noisy on weekends', 'Small lockers'],
    verdict: 'Solid choice for budget Copenhagen. Book the 4-bed dorm.',
    bookingUrl: null,
    stayDate: '',
    verified: false,
  },
  {
    name: 'Reykjavik Downtown Hostel',
    city: 'Reykjavik',
    country: 'Iceland',
    stayType: 'hostel',
    pricePerNight: '€45/night',
    rating: 4.0,
    pros: ['Walking distance to everything', 'Good kitchen'],
    cons: ['Expensive for a hostel', 'Thin walls'],
    verdict: 'Best budget option in Reykjavik. Nothing is cheap here anyway.',
    bookingUrl: null,
    stayDate: '',
    verified: false,
  },
  {
    name: 'Old Town Apartment',
    city: 'Tallinn',
    country: 'Estonia',
    stayType: 'airbnb',
    pricePerNight: '€35/night',
    rating: 4.5,
    pros: ['Inside the medieval walls', 'Full kitchen', 'Quiet'],
    cons: ['Steep stairs', 'No elevator'],
    verdict: "The best value I've found in Europe. Book it.",
    bookingUrl: null,
    stayDate: '',
    verified: false,
  },
  {
    name: 'Pärnu Beach Apartment',
    city: 'Pärnu',
    country: 'Estonia',
    stayType: 'airbnb',
    pricePerNight: '€28/night',
    rating: 4.7,
    pros: ['5 min walk to beach', 'Full apartment', 'Quiet neighbourhood'],
    cons: ['20 min walk to centre'],
    verdict: 'Exceptional value. Off-season Pärnu is a hidden gem.',
    bookingUrl: null,
    stayDate: '',
    verified: false,
  },
];
