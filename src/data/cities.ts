/*
 * Cities — Pillar 01, Minimalist Solo Travel.
 *
 * Sourced from the final state of the Manus build's TiDB `cities` table, which
 * was reached by running seed.mjs and then four "authenticity pass" scripts
 * that replaced the generic first-draft copy with Chandler's real trips. Where
 * a later script overwrote an earlier description, the later text is what's
 * here. All 28 entries below are real destinations from real trips.
 *
 * `trip` groups each city under the journey it belongs to, which is how the
 * Travel page organises them.
 */

import { IMAGES, type ImageRef } from './images';

export interface City {
  name: string;
  country: string;
  flag: string;
  description: string;
  /*
   * ⚠️ Unverified. Every costPerDay range below came from the Manus seed and
   * has never been checked against what Chandler actually spent. Tallinn is
   * the one case where we now have a real number to test against, and it does
   * not hold: 35–55/day cannot absorb ~€53/night of accommodation on its own,
   * and elsewhere on the site the range reads as total daily spend (Reykjavik
   * is 80–130/day against a €45/night hostel). Treat all 28 as placeholders
   * until Chandler confirms them.
   */
  costPerDayMin: number;
  costPerDayMax: number;
  tags: string[];
  image: ImageRef;
  trip: TripId;
  /** Marks the city as a repeat visit on a later trip */
  returnedOn?: TripId[];
}

export type TripId = '2022-tallinn' | '2022-iceland' | '2023-run' | '2024-iberia' | '2025-scandinavia';

export interface Trip {
  id: TripId;
  label: string;
  period: string;
  blurb: string;
}

export const TRIPS: Trip[] = [
  {
    id: '2022-tallinn',
    label: 'Tallinn & the Baltics',
    period: 'May 2022',
    blurb:
      'One month on Narva Mantee, and the trip that started everything. Day trips to Tartu and Pärnu, the ferry across to Helsinki.',
  },
  {
    id: '2022-iceland',
    label: 'Iceland',
    period: 'September 2022',
    blurb:
      'Based at the Hi Loft Hostel in Reykjavik, day-tripping the south coast. The people are crazy and the landscape is crazy.',
  },
  {
    id: '2023-run',
    label: 'The four-month run',
    period: '2023',
    blurb:
      'Twenty-one cities from London to Stockholm — down through Central Europe and the Balkans, out to Crete and the Cyclades, then north through the Baltics and Finland into the Arctic.',
  },
  {
    id: '2024-iberia',
    label: 'Iberia',
    period: '2024',
    blurb: 'Lisbon, Lagos and Sevilla — the first trip with company.',
  },
  {
    id: '2025-scandinavia',
    label: 'Scandinavia',
    period: '2025',
    blurb: 'Copenhagen, Gothenburg, Jönköping and Stockholm. A return to the region that started the style obsession.',
  },
];

export const CITIES: City[] = [
  /* ── May 2022 — where it started ──────────────────────────────────────── */
  {
    name: 'Tallinn',
    country: 'Estonia',
    flag: '🇪🇪',
    description:
      'Where it all started. In May 2022 I booked a month-long Airbnb on Narva Mantee and discovered that solo travel was my passion. Medieval walls, a functioning digital-nomad visa, a historical building on Narva Mantee at about €53 a night once the long-stay discount landed, and a nightlife scene centred around places like the Butterfly Lounge — where you end up at apartment parties at 7am. I met more interesting people here in four weeks than I had in years.',
    costPerDayMin: 35,
    costPerDayMax: 55,
    tags: ['Origin Story', 'Budget', 'Digital Nomad', 'Nightlife', 'Medieval'],
    image: IMAGES.tallinn,
    trip: '2022-tallinn',
    returnedOn: ['2023-run'],
  },
  {
    name: 'Tartu',
    country: 'Estonia',
    flag: '🇪🇪',
    description:
      "Estonia's second city and its intellectual heart. A university town with a completely different energy to Tallinn — quieter, more local, easier to slow down in. Worth a day trip or a long weekend from the capital.",
    costPerDayMin: 25,
    costPerDayMax: 40,
    tags: ['University Town', 'Day Trip', 'Quiet', 'Local'],
    image: IMAGES.tartuPortrait,
    trip: '2022-tallinn',
    returnedOn: ['2023-run'],
  },
  {
    name: 'Pärnu',
    country: 'Estonia',
    flag: '🇪🇪',
    description:
      "Estonia's summer capital and a welcome change of pace from Tallinn. Beach town, spa culture, and a completely different energy — Estonians come here to decompress. The beach is genuinely good, the town is small enough to walk everywhere, and it's an easy day trip or overnight from the capital.",
    costPerDayMin: 30,
    costPerDayMax: 45,
    tags: ['Beach', 'Summer', 'Relaxed', 'Day Trip'],
    image: IMAGES.parnu,
    trip: '2022-tallinn',
    returnedOn: ['2023-run'],
  },
  {
    name: 'Helsinki',
    country: 'Finland',
    flag: '🇫🇮',
    description:
      "Two hours by ferry from Tallinn and a completely different world. More expensive, more design-forward, quieter. The Scandinavian aesthetic hits differently when you're standing in it. This is where I first understood what I was chasing with the style side of this project.",
    costPerDayMin: 70,
    costPerDayMax: 110,
    tags: ['Scandinavian', 'Design', 'Ferry', 'Nordic Style'],
    image: null,
    trip: '2022-tallinn',
    returnedOn: ['2023-run'],
  },

  /* ── September 2022 — Iceland ─────────────────────────────────────────── */
  {
    name: 'Reykjavik',
    country: 'Iceland',
    flag: '🇮🇸',
    description:
      "The people are crazy and the landscape is crazy — that's the honest summary of Iceland. I based myself at the Hi Loft Hostel in Reykjavik every night and did day trips to the south coast: Seljalandsfoss, Skógafoss, black sand beaches, and the kind of scenery that makes you feel like you're on a different planet. The city itself punches well above its size for nightlife — Reykjavik goes hard on weekends. Expensive, yes. Worth it, absolutely.",
    costPerDayMin: 80,
    costPerDayMax: 130,
    tags: ['Adventure', 'Nightlife', 'Nature', 'Day Trips', 'Hostel'],
    image: IMAGES.reykjavik,
    trip: '2022-iceland',
  },

  /* ── 2023 — the four-month, 21-city run ───────────────────────────────── */
  {
    name: 'London',
    country: 'United Kingdom',
    flag: '🇬🇧',
    description:
      "The gateway city. Expensive by European standards — you feel it immediately — but London has an energy that's hard to replicate. The sheer scale of it means you can spend a week and still feel like you've barely scratched the surface. Good starting point for a long European run because it eases you in with English before you hit the continent.",
    costPerDayMin: 80,
    costPerDayMax: 140,
    tags: ['Gateway', 'Culture', 'Nightlife', 'Expensive'],
    image: IMAGES.londonTowerBridge,
    trip: '2023-run',
  },
  {
    name: 'Prague',
    country: 'Czech Republic',
    flag: '🇨🇿',
    description:
      'One of the most visually striking cities in Europe — the old town looks like it was designed for a film set. Extremely affordable for a capital city, good nightlife, and the kind of place where you can walk for hours without running out of things to look at. Gets crowded in summer but still worth it.',
    costPerDayMin: 35,
    costPerDayMax: 65,
    tags: ['Architecture', 'Affordable', 'Nightlife', 'History'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Budapest',
    country: 'Hungary',
    flag: '🇭🇺',
    description:
      'Budapest surprised me. Split by the Danube into Buda and Pest, it has a completely different feel on each side. The ruin bars are genuinely unique — bars built inside abandoned buildings with mismatched furniture and courtyard vibes. Thermal baths, affordable food, and a nightlife scene that goes until morning. One of the best value cities on the continent.',
    costPerDayMin: 30,
    costPerDayMax: 60,
    tags: ['Ruin Bars', 'Thermal Baths', 'Affordable', 'Nightlife'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Belgrade',
    country: 'Serbia',
    flag: '🇷🇸',
    description:
      "Belgrade is raw in the best way. It doesn't try to be polished for tourists — it just is what it is. The fortress above the river is worth the walk, the food is excellent and cheap, and the nightlife on the river boats (splavovi) is unlike anything else in Europe. People are direct and warm once you're in. Underrated.",
    costPerDayMin: 25,
    costPerDayMax: 50,
    tags: ['Underrated', 'Nightlife', 'Affordable', 'Balkans'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Sofia',
    country: 'Bulgaria',
    flag: '🇧🇬',
    description:
      'Sofia is one of the cheapest capitals in Europe and it shows in the best way — you can eat well, drink well, and stay somewhere decent without watching your budget constantly. The Alexander Nevsky Cathedral is genuinely impressive. The city has a young, creative energy that\'s growing. Good base for day trips into the mountains.',
    costPerDayMin: 20,
    costPerDayMax: 45,
    tags: ['Budget', 'Balkans', 'Culture', 'Mountains'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Heraklion',
    country: 'Greece',
    flag: '🇬🇷',
    description:
      'The gateway to Crete. Heraklion itself is more of a functional city than a destination — most people pass through on the way to the rest of the island. But the Minoan ruins at Knossos just outside the city are genuinely worth half a day. Good food, good weather, and a useful base before heading west toward Chania.',
    costPerDayMin: 40,
    costPerDayMax: 75,
    tags: ['Crete', 'History', 'Gateway', 'Greek Islands'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Chania',
    country: 'Greece',
    flag: '🇬🇷',
    description:
      "Chania is the kind of place that makes you want to slow down. The Venetian harbour at sunset is one of the best views I've seen anywhere in Europe. The old town is full of narrow streets, good tavernas, and a relaxed pace that feels earned. Crete in general has a different energy from the smaller Greek islands — more substantial, more local.",
    costPerDayMin: 45,
    costPerDayMax: 85,
    tags: ['Venetian Harbour', 'Crete', 'Relaxed', 'Scenic'],
    image: IMAGES.chania,
    trip: '2023-run',
  },
  {
    name: 'Ios',
    country: 'Greece',
    flag: '🇬🇷',
    description:
      "Ios has a reputation as a party island and it earns it — but it's more than that. The village (Chora) on the hill is genuinely beautiful, the beaches are excellent, and the nightlife is concentrated enough that you don't have to go far. Small enough to feel like you know the island after a few days. Best experienced in shoulder season if you want a mix of both worlds.",
    costPerDayMin: 50,
    costPerDayMax: 100,
    tags: ['Greek Islands', 'Beaches', 'Nightlife', 'Cyclades'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Athens',
    country: 'Greece',
    flag: '🇬🇷',
    description:
      'Athens is a city that rewards patience. The Acropolis is as impressive as advertised — see it at sunrise if you can. Beyond the obvious, the neighbourhoods of Monastiraki, Psirri, and Exarcheia each have their own character. The food scene is excellent and the city has a creative energy that\'s easy to miss if you only do the tourist circuit.',
    costPerDayMin: 45,
    costPerDayMax: 85,
    tags: ['History', 'Culture', 'Food', 'Acropolis'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Kaunas',
    country: 'Lithuania',
    flag: '🇱🇹',
    description:
      "Kaunas is Lithuania's second city and it has a quiet confidence about it. Less visited than Vilnius, which means it feels more lived-in and less performative. Good street art scene, a walkable old town, and the kind of place where you can sit in a café for hours without feeling rushed. Affordable and underrated.",
    costPerDayMin: 25,
    costPerDayMax: 50,
    tags: ['Underrated', 'Baltics', 'Affordable', 'Walkable'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Klaipeda',
    country: 'Lithuania',
    flag: '🇱🇹',
    description:
      'Klaipeda sits on the Baltic coast and has a distinctly different feel from the rest of Lithuania — more Germanic in its architecture, more maritime in its character. The Curonian Spit is a UNESCO-listed sand dune peninsula just across the ferry and worth a day trip. Small city, easy to navigate, good for a couple of days.',
    costPerDayMin: 25,
    costPerDayMax: 50,
    tags: ['Coastal', 'Baltics', 'Curonian Spit', 'Maritime'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Vilnius',
    country: 'Lithuania',
    flag: '🇱🇹',
    description:
      "Vilnius has one of the best-preserved baroque old towns in Europe and it's genuinely beautiful. The city has invested heavily in its creative scene — there's a neighbourhood called Užupis that declared itself an independent republic, which tells you something about the spirit of the place. Good coffee, good food, affordable, and easy to navigate on foot.",
    costPerDayMin: 30,
    costPerDayMax: 60,
    tags: ['Baroque', 'Baltics', 'Creative', 'Walkable'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Riga',
    country: 'Latvia',
    flag: '🇱🇻',
    description:
      "Riga is the largest of the Baltic capitals and it shows — more cosmopolitan, more varied, more going on. The Art Nouveau architecture in the city centre is exceptional and largely overlooked by people who don't know to look for it. The central market in the old zeppelin hangars is worth a morning. Good nightlife, good food, and a city that feels like it's growing into itself.",
    costPerDayMin: 30,
    costPerDayMax: 65,
    tags: ['Art Nouveau', 'Baltics', 'Architecture', 'Nightlife'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Tampere',
    country: 'Finland',
    flag: '🇫🇮',
    description:
      "Tampere is Finland's second city and it has a warmth that Finns aren't always given credit for. Built between two lakes, the city has a clean industrial character — old factory buildings converted into restaurants, galleries, and market halls. More relaxed than Helsinki, easier to get a feel for everyday Finnish life. Worth a couple of days on the way north.",
    costPerDayMin: 55,
    costPerDayMax: 95,
    tags: ['Finland', 'Lakes', 'Industrial Heritage', 'Relaxed'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Oulu',
    country: 'Finland',
    flag: '🇫🇮',
    description:
      'Oulu is far enough north that you start to feel the shift in light and pace. It\'s a university city with a younger energy than you might expect this far up. The market square by the river is the social centre of the city. A good stop on the way toward the Arctic — the kind of place that makes you understand why Finns are so attached to their country.',
    costPerDayMin: 50,
    costPerDayMax: 90,
    tags: ['Finland', 'North', 'University City', 'Arctic Gateway'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Luleå',
    country: 'Sweden',
    flag: '🇸🇪',
    description:
      'Luleå sits on the Gulf of Bothnia in northern Sweden and has a frontier quality to it — a city that exists because of industry and has built a life around that. The archipelago outside the city is stunning and largely undiscovered. In winter it\'s one of the best places in Europe to experience the Arctic properly. A city that rewards curiosity.',
    costPerDayMin: 55,
    costPerDayMax: 95,
    tags: ['Northern Sweden', 'Arctic', 'Archipelago', 'Frontier'],
    image: null,
    trip: '2023-run',
  },
  {
    name: 'Stockholm',
    country: 'Sweden',
    flag: '🇸🇪',
    description:
      'Stockholm is where the Scandinavian aesthetic you see everywhere online actually lives. Built across fourteen islands, the city has a natural elegance that doesn\'t feel forced. Gamla Stan (the old town) is beautiful without being a theme park. The design culture is embedded in everything — how the city looks, how people dress, how spaces are organised. Expensive, but it earns it.',
    costPerDayMin: 70,
    costPerDayMax: 130,
    tags: ['Scandinavia', 'Design', 'Islands', 'Style'],
    image: IMAGES.stockholm,
    trip: '2023-run',
    returnedOn: ['2025-scandinavia'],
  },

  /* ── 2024 — Iberia ────────────────────────────────────────────────────── */
  {
    name: 'Lisbon',
    country: 'Portugal',
    flag: '🇵🇹',
    description:
      "Lisbon is one of those cities that gets under your skin. Built across seven hills with trams that look like they belong in a different century, it has a melancholy beauty — the Portuguese call it saudade, a kind of nostalgic longing that's baked into the culture. The food is exceptional and cheap by Western European standards. Alfama at night, pastéis de nata in the morning. Went with a friend and it was the right city for it.",
    costPerDayMin: 45,
    costPerDayMax: 85,
    tags: ['Trams', 'Food', 'Culture', 'Nightlife', 'Atlantic'],
    image: null,
    trip: '2024-iberia',
  },
  {
    name: 'Lagos',
    country: 'Portugal',
    flag: '🇵🇹',
    description:
      "Lagos is the Algarve at its best — dramatic limestone cliffs, sea caves, and beaches that look like they were designed to be photographed. It's a small town that fills up in summer but retains its character. The old town is compact and walkable. A completely different pace from Lisbon — slower, more physical, more about being outside. Good place to decompress mid-trip.",
    costPerDayMin: 40,
    costPerDayMax: 75,
    tags: ['Beaches', 'Cliffs', 'Algarve', 'Relaxed', 'Atlantic'],
    image: null,
    trip: '2024-iberia',
  },
  {
    name: 'Sevilla',
    country: 'Spain',
    flag: '🇪🇸',
    description:
      "Sevilla operates on its own time — dinner at 10pm, streets alive at midnight, and a heat in summer that forces you to adapt. The architecture is extraordinary: the cathedral, the Alcázar, the narrow streets of the Santa Cruz quarter. Flamenco here isn't a tourist show, it's a living thing. One of the most atmospheric cities in Europe. Going with a friend made it better — Sevilla is a city for sharing.",
    costPerDayMin: 45,
    costPerDayMax: 80,
    tags: ['Architecture', 'Flamenco', 'Food', 'History', 'Andalusia'],
    image: null,
    trip: '2024-iberia',
  },

  /* ── 2025 — Scandinavia ───────────────────────────────────────────────── */
  {
    name: 'Copenhagen',
    country: 'Denmark',
    flag: '🇩🇰',
    description:
      'Nyhavn, the design museum, and learning to cycle in a city that actually makes it work.',
    costPerDayMin: 80,
    costPerDayMax: 120,
    tags: ['Design', 'Expensive', 'Architecture'],
    image: IMAGES.copenhagen,
    trip: '2025-scandinavia',
  },
  {
    name: 'Gothenburg',
    country: 'Sweden',
    flag: '🇸🇪',
    description:
      "Gothenburg is Sweden's second city and it has a different character from Stockholm — more working-class roots, more direct, more relaxed about itself. The canal district and the Haga neighbourhood have a charm that doesn't feel manufactured. Good food scene, good coffee culture, and a city that's easy to navigate. A natural stop between Copenhagen and Stockholm on the west coast route.",
    costPerDayMin: 65,
    costPerDayMax: 110,
    tags: ['Scandinavia', 'Canals', 'Relaxed', 'Food', 'West Coast'],
    image: null,
    trip: '2025-scandinavia',
  },
  {
    name: 'Jönköping',
    country: 'Sweden',
    flag: '🇸🇪',
    description:
      "Jönköping sits at the southern tip of Lake Vättern — Sweden's second largest lake — and the setting is genuinely beautiful. It's a mid-sized Swedish city with a strong local identity and a lakeside quality of life that's hard to find in bigger cities. Less visited than Gothenburg or Stockholm, which is part of the appeal. A good reminder that the best parts of Scandinavia aren't always the capitals.",
    costPerDayMin: 55,
    costPerDayMax: 90,
    tags: ['Lake Vättern', 'Sweden', 'Underrated', 'Lakeside'],
    image: null,
    trip: '2025-scandinavia',
  },
];

/**
 * URL slug for a city page. Strips the diacritics that Pärnu, Luleå and
 * Jönköping carry, so /places/parnu rather than a percent-encoded mess.
 */
export function citySlug(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Cities shown on the homepage teaser — the ones with real photography. */
export const FEATURED_CITY_NAMES = ['Reykjavik', 'Tallinn', 'Stockholm', 'Pärnu'] as const;

export const featuredCities = FEATURED_CITY_NAMES.map(
  (name) => CITIES.find((c) => c.name === name)!
);

export const citiesByTrip = TRIPS.map((trip) => ({
  trip,
  cities: CITIES.filter((c) => c.trip === trip.id),
}));

export const COUNTRY_COUNT = new Set(CITIES.map((c) => c.country)).size;
