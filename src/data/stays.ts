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
