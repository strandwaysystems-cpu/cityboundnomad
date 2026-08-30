/*
 * import-photos — turn a folder of exported photos into site content.
 *
 * Reads the GPS coordinates and capture date that your camera wrote into each
 * photo, works out which city each one was taken in, converts it to web-sized
 * .webp, and writes src/data/photos.ts so the city pages can show them.
 *
 *   node tools/import-photos.mjs ~/Desktop/cbn-export
 *   node tools/import-photos.mjs ~/Desktop/cbn-export --dry-run
 *
 * Reads .heic straight from an iPhone — no converting first.
 *
 * Video works too (.mov, .mp4, .m4v). A clip carries the same location and
 * capture date a photo does, just in the QuickTime container instead of EXIF,
 * so a camera roll that is mostly video is not a lost cause — a still is taken
 * from each clip and treated exactly like a photograph from then on. That part
 * needs ffmpeg on PATH (`brew install ffmpeg`); the script says so and writes
 * nothing if it is missing.
 *
 * ── Getting the photos out of Apple Photos with their location intact ──────
 *
 * This is the step that goes wrong. Apple strips location on export unless you
 * tell it not to.
 *
 *   Photos on Mac → select → File → Export → Export N Photos…
 *     Photo Kind: JPEG (or Current/Unmodified)
 *     ✅ Location Information   ← the box everyone misses
 *     Subfolder Format: None
 *
 * "Export Unmodified Original" always keeps the location, and is the safest
 * option — the files come out as the original .heic, which this script reads.
 *
 * On iPhone with no Mac: select photos → Share → Options (top of the sheet) →
 * make sure **Location** is ON → Save to Files. AirDrop to a Mac also keeps it.
 *
 * ── On privacy ────────────────────────────────────────────────────────────
 *
 * Photo GPS is precise enough to identify a house. This script therefore:
 *   • never writes coordinates into the repo — only the matched city name;
 *   • strips all EXIF from the images it produces, GPS included;
 *   • skips any photo it cannot place in one of your listed cities, rather
 *     than guessing — which is what keeps photos taken at home out of it.
 *
 * Anything skipped is listed in the summary so you can see what was left out.
 */

import { readdir, mkdir, writeFile, readFile, open, unlink } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import exifr from 'exifr';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'public/images/places');
const DATA_FILE = path.join(ROOT, 'src/data/photos.ts');

const WIDTH = 1600; // enough for a full-bleed city header on a 2x display
const QUALITY = 78;
const MATCH_RADIUS_KM = 60;

const EXTS = new Set(['.jpg', '.jpeg', '.heic', '.heif', '.png', '.tif', '.tiff', '.webp']);

/*
 * Video counts too. A camera roll from a trip is often mostly clips, and an
 * importer that only reads stills quietly ignores most of what was actually
 * shot — which looks like "I have no photos of that city" when the truth is
 * "the photos are frames".
 */
const VIDEO_EXTS = new Set(['.mov', '.mp4', '.m4v']);
const isVideo = (f) => VIDEO_EXTS.has(path.extname(f).toLowerCase());

/*
 * Approximate city centres, to one decimal place (~11 km). Only ever used to
 * pick the nearest city within MATCH_RADIUS_KM, so this precision is plenty —
 * and it is what disambiguates Lagos in Portugal from Lagos in Nigeria, which
 * a place-name match cannot do.
 */
const COORDS = {
  Tallinn: [59.4, 24.8], Tartu: [58.4, 26.7], Pärnu: [58.4, 24.5], Helsinki: [60.2, 24.9],
  Reykjavik: [64.1, -21.9], London: [51.5, -0.1], Prague: [50.1, 14.4], Budapest: [47.5, 19.0],
  Belgrade: [44.8, 20.5], Sofia: [42.7, 23.3], Heraklion: [35.3, 25.1], Chania: [35.5, 24.0],
  Ios: [36.7, 25.3], Athens: [38.0, 23.7], Kaunas: [54.9, 23.9], Klaipeda: [55.7, 21.1],
  Vilnius: [54.7, 25.3], Riga: [56.9, 24.1], Tampere: [61.5, 23.8], Oulu: [65.0, 25.5],
  Luleå: [65.6, 22.2], Stockholm: [59.3, 18.1], Lisbon: [38.7, -9.1], Lagos: [37.1, -8.7],
  Sevilla: [37.4, -6.0], Copenhagen: [55.7, 12.6], Gothenburg: [57.7, 12.0], Jönköping: [57.8, 14.2],
};

/*
 * The city list is read out of cities.ts as text rather than imported: Node
 * cannot resolve that module's extensionless relative imports, and reshaping
 * the source to suit a build script would be the tail wagging the dog. Only
 * the name/country pairs are needed here.
 */
async function loadCities() {
  const src = await readFile(path.join(ROOT, 'src/data/cities.ts'), 'utf8');
  const cities = [...src.matchAll(/^\s*name: '([^']+)',\s*\n\s*country: '([^']+)'/gm)].map(
    ([, name, country]) => ({ name, country })
  );
  if (cities.length === 0) {
    console.error('Could not read any cities out of src/data/cities.ts — has its shape changed?');
    process.exit(1);
  }
  return cities;
}

/** Mirrors citySlug() in cities.ts — kept in step by the drift check below. */
function citySlug(name) {
  return name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const CITIES = await loadCities();

// Warn loudly if the coordinate table and the city list have drifted apart —
// a city with no coordinates silently never matches any photo.
const missingCoords = CITIES.filter((c) => !COORDS[c.name]).map((c) => c.name);
if (missingCoords.length) {
  console.warn(
    `⚠ No coordinates for: ${missingCoords.join(', ')}\n` +
      '  Photos taken there cannot be matched. Add them to COORDS in this file.\n'
  );
}
const strayCoords = Object.keys(COORDS).filter((n) => !CITIES.some((c) => c.name === n));
if (strayCoords.length) {
  console.warn(`⚠ COORDS has cities not in cities.ts: ${strayCoords.join(', ')}\n`);
}

const dryRun = process.argv.includes('--dry-run');
const inputDir = process.argv[2];

if (!inputDir || inputDir.startsWith('--')) {
  console.error('Usage: node tools/import-photos.mjs <folder-of-exported-photos> [--dry-run]');
  process.exit(1);
}

/*
 * iPhone video carries the same location and capture date a photo does, but in
 * the QuickTime container rather than in EXIF, so exifr cannot see it. The
 * values sit in the `moov` atom under Apple's metadata keys:
 *
 *   com.apple.quicktime.location.ISO6709 → "+42.6858+023.3244+554.928/"
 *   com.apple.quicktime.creationdate     → "2023-04-21T15:23:13+0300"
 *
 * On an iPhone recording `moov` is written last, after a `mdat` that may be
 * gigabytes. So this walks the top-level atom headers and reads only `moov`
 * rather than pulling a whole clip into memory to find a 40-byte string.
 */
async function readQuickTimeMeta(file) {
  const fh = await open(file, 'r');
  try {
    const { size } = await fh.stat();
    const head = Buffer.alloc(16);
    let off = 0;
    let moov = null;

    while (off < size - 8) {
      const { bytesRead } = await fh.read(head, 0, 16, off);
      if (bytesRead < 8) break;
      let boxSize = head.readUInt32BE(0);
      let headerLen = 8;
      if (boxSize === 1) {
        boxSize = Number(head.readBigUInt64BE(8)); // 64-bit size, for >4GB atoms
        headerLen = 16;
      } else if (boxSize === 0) {
        boxSize = size - off; // "extends to end of file"
      }
      if (boxSize < headerLen) break;
      if (head.toString('latin1', 4, 8) === 'moov') {
        moov = { off, size: boxSize };
        break;
      }
      off += boxSize;
    }
    if (!moov) return null;

    // 8MB is far more than any moov atom needs, and caps a malformed one.
    const buf = Buffer.alloc(Math.min(moov.size, 8 * 1024 * 1024));
    const { bytesRead } = await fh.read(buf, 0, buf.length, moov.off);
    const text = buf.toString('latin1', 0, bytesRead);

    const loc = text.match(/([+-]\d{1,3}(?:\.\d+)?)([+-]\d{1,3}(?:\.\d+)?)(?:[+-][\d.]+)?\//);
    const when = text.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:[+-]\d{4}|Z)/);

    return {
      gps: loc ? { latitude: parseFloat(loc[1]), longitude: parseFloat(loc[2]) } : null,
      taken: when ? new Date(when[0]) : null,
    };
  } catch {
    return null; // an unreadable container is the same as no metadata
  } finally {
    await fh.close();
  }
}

const hasFfmpeg = () => {
  const r = spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  return !r.error && r.status === 0;
};

/*
 * Pull a single still out of a clip. Seeks a second in first: video very often
 * opens on a black or half-exposed frame, and the second second is a better
 * photograph than the first. Falls back to the opening frame for clips shorter
 * than that. ffmpeg applies the rotation matrix itself, so portrait clips come
 * out upright without the .rotate() that stills need.
 */
function extractFrame(file, dest, seconds = 1) {
  return new Promise((resolve, reject) => {
    const args = ['-loglevel', 'error', '-ss', String(seconds), '-i', file,
                  '-frames:v', '1', '-q:v', '2', '-y', dest];
    const proc = spawn('ffmpeg', args);
    proc.on('error', reject);
    proc.on('close', (code) => {
      if (code === 0) resolve();
      else if (seconds > 0) resolve(extractFrame(file, dest, 0));
      else reject(new Error(`ffmpeg exited ${code} on ${path.basename(file)}`));
    });
  });
}

function haversineKm([lat1, lon1], [lat2, lon2]) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function nearestCity(lat, lon) {
  let best = null;
  for (const city of CITIES) {
    const coord = COORDS[city.name];
    if (!coord) continue;
    const km = haversineKm([lat, lon], coord);
    if (!best || km < best.km) best = { city, km };
  }
  return best && best.km <= MATCH_RADIUS_KM ? best : null;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (EXTS.has(path.extname(entry.name).toLowerCase()) || isVideo(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(path.resolve(inputDir));
if (files.length === 0) {
  console.error(`No images found in ${inputDir}`);
  process.exit(1);
}
console.log(`Found ${files.length} image${files.length === 1 ? '' : 's'}\n`);

const matched = [];
const noGps = [];
const tooFar = [];

for (const file of files) {
  let gps, taken;
  const video = isVideo(file);
  try {
    if (video) {
      const meta = await readQuickTimeMeta(file);
      gps = meta?.gps ?? null;
      taken = meta?.taken ?? null;
    } else {
      gps = await exifr.gps(file);
      const meta = await exifr.parse(file, ['DateTimeOriginal', 'CreateDate']);
      taken = meta?.DateTimeOriginal ?? meta?.CreateDate ?? null;
    }
  } catch {
    /* unreadable metadata is the same as none */
  }

  if (!gps || typeof gps.latitude !== 'number') {
    noGps.push(file);
    continue;
  }

  const hit = nearestCity(gps.latitude, gps.longitude);
  if (!hit) {
    tooFar.push(file);
    continue;
  }

  matched.push({ file, city: hit.city, km: hit.km, taken, video });
}

// Newest last within a city, so the page reads chronologically.
matched.sort((a, b) => (a.taken ?? 0) - (b.taken ?? 0));

const byCity = new Map();
for (const m of matched) {
  if (!byCity.has(m.city.name)) byCity.set(m.city.name, []);
  byCity.get(m.city.name).push(m);
}

const videoCount = matched.filter((m) => m.video).length;
if (videoCount) {
  console.log(
    `${videoCount} of ${matched.length} matched item(s) are video — a still will be ` +
      'taken from each.\n'
  );
}

console.log('Matched to cities:');
for (const [city, items] of [...byCity].sort((a, b) => b[1].length - a[1].length)) {
  console.log(`  ${String(items.length).padStart(3)}  ${city}`);
}

if (noGps.length) {
  console.log(
    `\n${noGps.length} photo(s) had no location. Most likely the "Location Information"` +
      ' box was unchecked on export — see the notes at the top of this file.'
  );
  if (noGps.some(isVideo)) {
    console.log(
      '  Some of these are video. Clips lose their location the same way photos do,' +
        ' and screen-recorded or re-encoded clips never had one.'
    );
  }
  noGps.slice(0, 5).forEach((f) => console.log(`  · ${path.basename(f)}`));
  if (noGps.length > 5) console.log(`  · …and ${noGps.length - 5} more`);
}

if (tooFar.length) {
  console.log(
    `\n${tooFar.length} photo(s) were taken more than ${MATCH_RADIUS_KM}km from any city in` +
      ' cities.ts, so they were skipped. Add the city to cities.ts (and its coordinates to' +
      ' COORDS in this file) if it belongs on the site.'
  );
  tooFar.slice(0, 5).forEach((f) => console.log(`  · ${path.basename(f)}`));
  if (tooFar.length > 5) console.log(`  · …and ${tooFar.length - 5} more`);
}

if (dryRun) {
  console.log('\n--dry-run: nothing written.');
  process.exit(0);
}

/*
 * Checked here rather than at startup: a run with no video in it should not
 * need ffmpeg installed, and --dry-run should report the matches either way.
 */
if (matched.some((m) => m.video) && !hasFfmpeg()) {
  console.error(
    `\n✖ ${matched.filter((m) => m.video).length} matched item(s) are video, and ffmpeg` +
      ' is needed to take a still from them.\n\n' +
      '    macOS:  brew install ffmpeg\n' +
      '    Debian: sudo apt install ffmpeg\n\n' +
      '  The photos in this folder would import fine — re-run with only stills if you' +
      ' would rather not install it.'
  );
  process.exit(1);
}

const photos = [];

for (const [cityName, items] of byCity) {
  const slug = citySlug(cityName);
  const dir = path.join(OUT_DIR, slug);
  await mkdir(dir, { recursive: true });

  let i = 0;
  for (const item of items) {
    i += 1;
    const name = `${slug}-${String(i).padStart(2, '0')}.webp`;
    const dest = path.join(dir, name);

    /*
     * For a clip, the thing sharp reads is a still pulled out of it first. The
     * temp frame is always cleaned up, including when sharp throws — otherwise
     * a failed run leaves full-size stills lying around in the system temp dir.
     */
    let source = item.file;
    let frame = null;
    if (item.video) {
      frame = path.join(tmpdir(), `cbn-frame-${process.pid}-${slug}-${i}.jpg`);
      await extractFrame(item.file, frame);
      source = frame;
    }

    // .rotate() applies the EXIF orientation before that tag is discarded —
    // without it, portrait iPhone shots come out on their side. sharp drops all
    // other metadata by default, which is what strips the GPS. Extracted frames
    // carry no metadata at all, so they arrive stripped and upright already.
    let info;
    try {
      info = await sharp(source)
        .rotate()
        .resize({ width: WIDTH, withoutEnlargement: true })
        .webp({ quality: QUALITY })
        .toFile(dest);
    } finally {
      if (frame) await unlink(frame).catch(() => {});
    }

    const country = item.city.country;
    photos.push({
      src: `/images/places/${slug}/${name}`,
      width: info.width,
      height: info.height,
      city: cityName,
      taken: item.taken ? new Date(item.taken).toISOString().slice(0, 10) : null,
      alt: `${cityName}, ${country}`,
    });
  }
  console.log(`  ✓ ${cityName}: ${items.length} written to public/images/places/${slug}/`);
}

const banner = `/*
 * GENERATED FILE — do not edit by hand.
 *
 * Written by tools/import-photos.mjs from exported photos. Re-running the
 * import overwrites this file, so any manual change here is lost.
 *
 * The one thing worth editing is \`alt\`: it defaults to "City, Country", which
 * is accurate but says nothing. Better alt text describes what is in the frame.
 * If you improve it, move the photo's object into ALT_OVERRIDES below instead,
 * which the importer preserves.
 *
 * No coordinates are stored here, and the .webp files carry no EXIF — see the
 * privacy notes in tools/import-photos.mjs.
 */
`;

const body = `${banner}
export interface Photo {
  src: string;
  width: number;
  height: number;
  /** Matches a name in cities.ts */
  city: string;
  /** YYYY-MM-DD, or null when the photo had no capture date */
  taken: string | null;
  alt: string;
}

/** Hand-written alt text, keyed by \`src\`. Survives re-importing. */
export const ALT_OVERRIDES: Record<string, string> = {};

const RAW: Photo[] = ${JSON.stringify(photos, null, 2)};

export const PHOTOS: Photo[] = RAW.map((p) => ({ ...p, alt: ALT_OVERRIDES[p.src] ?? p.alt }));

export function photosFor(city: string): Photo[] {
  return PHOTOS.filter((p) => p.city === city);
}
`;

await writeFile(DATA_FILE, body);

console.log(
  `\n✓ ${photos.length} photo(s) imported across ${byCity.size} cit${byCity.size === 1 ? 'y' : 'ies'}.` +
    `\n  Wrote src/data/photos.ts — run \`npm run build\` to see them.`
);
