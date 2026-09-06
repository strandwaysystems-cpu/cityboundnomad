/*
 * Design pre-flight.
 *
 * The design system this site is built on is a merge of four rule sources
 * (see DESIGN.md for which one governs what). Prose rules rot; this file is
 * the half of them that a machine can decide, run against the built pages in
 * a real browser with real computed styles.
 *
 *   npm run design:check          all routes, both schemes
 *   npm run design:check -- --url http://localhost:4321
 *
 * Every finding names the rule and the source it comes from. A finding is a
 * failure, not a warning: if a rule is wrong for this site, change the rule in
 * DESIGN.md and here, deliberately, rather than letting the check go yellow.
 */
import { chromium } from 'playwright';
import { readFileSync, existsSync } from 'node:fs';
import { spawn } from 'node:child_process';

const BASE = process.argv.includes('--url')
  ? process.argv[process.argv.indexOf('--url') + 1]
  : 'http://localhost:4321';

const ROUTES = [
  '/', '/places', '/things', '/notes', '/about', '/stays',
  '/wardrobe', '/cafes', '/tours', '/grooming',
  '/places/copenhagen', '/notes/tallinn-may-2022', '/links', '/404',
];

const findings = [];
const add = (rule, source, where, detail) =>
  findings.push({ rule, source, where, detail });

/* Rules evaluated in the page, against computed style rather than source. */
function inPage() {
  const out = [];
  const push = (rule, detail) => out.push({ rule, detail });
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && cs.visibility !== 'hidden' && cs.display !== 'none';
  };
  const px = (v) => parseFloat(v) || 0;

  // impeccable: kicker-above-heading. An absolute ban, stricter than
  // tasteskill's ceil(sections/3) cap, so the strict one governs.
  const HEADING = /^H[1-6]$/;
  for (const el of document.querySelectorAll('main p, main span, main div')) {
    if (!vis(el) || el.children.length) continue;
    const text = (el.textContent || '').trim();
    if (!text || text.length > 40) continue;
    const next = el.nextElementSibling;
    if (!next || !HEADING.test(next.tagName)) continue;
    const cs = getComputedStyle(el);
    const size = px(cs.fontSize);
    const nextSize = px(getComputedStyle(next).fontSize);
    if (size < nextSize * 0.7) push('kicker-above-heading', `"${text}" above <${next.tagName.toLowerCase()}>`);
  }

  // impeccable: content-hidden-at-rest. Real content must not sit at opacity 0
  // waiting for script. Checked after load with motion allowed to finish.
  for (const el of document.querySelectorAll('main *')) {
    const cs = getComputedStyle(el);
    if (parseFloat(cs.opacity) < 0.05 && (el.textContent || '').trim().length > 20) {
      push('content-hidden-at-rest', `${el.tagName.toLowerCase()}.${el.className || ''}`.slice(0, 60));
      break;
    }
  }

  // impeccable: line-length. Reading measure 65-75ch; 45 is the floor below
  // which a column stops being a column.
  const ctx2d = document.createElement('canvas').getContext('2d');
  const chWidth = (cs) => {
    ctx2d.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    return ctx2d.measureText('0').width || px(cs.fontSize) * 0.5;
  };
  for (const el of document.querySelectorAll('main p')) {
    if (!vis(el)) continue;
    const t = (el.textContent || '').trim();
    if (t.length < 160) continue;
    const cs = getComputedStyle(el);
    const ch = el.getBoundingClientRect().width / chWidth(cs);
    if (ch > 78) push('line-length', `${Math.round(ch)}ch: "${t.slice(0, 40)}..."`);
  }

  // impeccable: extreme-negative-tracking, tracking floor -0.04em.
  for (const el of document.querySelectorAll('main h1, main h2, main h3, main p')) {
    if (!vis(el)) continue;
    const cs = getComputedStyle(el);
    const ls = px(cs.letterSpacing);
    if (!ls) continue;
    const em = ls / px(cs.fontSize);
    if (em < -0.04) push('extreme-negative-tracking', `${em.toFixed(3)}em on ${el.tagName.toLowerCase()}`);
  }

  // impeccable: oversized-h1, display ceiling 6rem.
  for (const el of document.querySelectorAll('h1')) {
    if (!vis(el)) continue;
    const size = px(getComputedStyle(el).fontSize);
    if (size > 96) push('oversized-h1', `${Math.round(size)}px`);
  }

  // impeccable: tiny-text / undersized-ui-text.
  for (const el of document.querySelectorAll('main *, footer *')) {
    if (el.children.length || !(el.textContent || '').trim()) continue;
    if (!vis(el)) continue;
    const size = px(getComputedStyle(el).fontSize);
    if (size && size < 11) push('tiny-text', `${size}px: "${el.textContent.trim().slice(0, 30)}"`);
  }

  // impeccable: all-caps-body and wide-tracking.
  for (const el of document.querySelectorAll('main *')) {
    if (el.children.length || !vis(el)) continue;
    const t = (el.textContent || '').trim();
    const cs = getComputedStyle(el);
    if (cs.textTransform === 'uppercase' && t.length > 40) push('all-caps-body', t.slice(0, 40));
    const em = px(cs.letterSpacing) / px(cs.fontSize);
    if (em > 0.12 && t.length > 24) push('wide-tracking', `${em.toFixed(2)}em: "${t.slice(0, 30)}"`);
  }

  // impeccable: nested-cards. A bordered surface directly inside another.
  const surface = (el) => {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    // Card-sized, or it is a pill/tag/badge and nesting one is not the defect
    // the rule is about.
    return px(cs.borderTopWidth) > 0 && px(cs.borderRadius) >= 8 && r.width >= 180 && r.height >= 90;
  };
  for (const el of document.querySelectorAll('main *')) {
    if (!surface(el) || !vis(el)) continue;
    let p = el.parentElement;
    while (p && p.tagName !== 'MAIN') {
      if (surface(p)) { push('nested-cards', `${el.className}`.slice(0, 50)); break; }
      p = p.parentElement;
    }
  }

  // impeccable: border-accent-on-rounded, coloured edge over 1px on a surface.
  for (const el of document.querySelectorAll('main *')) {
    if (!vis(el)) continue;
    const cs = getComputedStyle(el);
    if (px(cs.borderRadius) < 4) continue;
    for (const side of ['Left', 'Right']) {
      const w = px(cs[`border${side}Width`]);
      if (w > 1 && cs[`border${side}Color`] !== cs.borderTopColor) {
        push('border-accent-on-rounded', `${w}px ${side.toLowerCase()} on ${el.className}`.slice(0, 60));
      }
    }
  }

  // impeccable: gradient-text.
  for (const el of document.querySelectorAll('main h1, main h2, main h3')) {
    const cs = getComputedStyle(el);
    if (cs.webkitTextFillColor === 'rgba(0, 0, 0, 0)' && cs.backgroundImage.includes('gradient')) {
      push('gradient-text', el.textContent.trim().slice(0, 30));
    }
  }

  // impeccable: skipped-heading, the outline must not jump a level.
  const levels = [...document.querySelectorAll('main h1, main h2, main h3, main h4, main h5, main h6')]
    .filter(vis).map((h) => +h.tagName[1]);
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i - 1] > 1) push('skipped-heading', `h${levels[i - 1]} then h${levels[i]}`);
  }

  // impeccable: design-system-font. The display voice must be the committed
  // face, not whatever the platform happens to ship.
  for (const el of document.querySelectorAll('main h1, main h2')) {
    if (!vis(el)) continue;
    const fam = getComputedStyle(el).fontFamily;
    if (!/Schibsted Grotesk/i.test(fam)) push('design-system-font', `${el.tagName}: ${fam.slice(0, 50)}`);
  }

  // craft-floor: browser surfaces must be themed, not inherited.
  const html = getComputedStyle(document.documentElement);
  if (!html.caretColor || html.caretColor === 'auto') push('unthemed-caret', 'caret-color is auto');

  // tasteskill 9.G: zero em-dashes and en-dashes, anywhere a reader sees them.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const p = n.parentElement;
    if (!p || ['SCRIPT', 'STYLE'].includes(p.tagName)) continue;
    const m = n.textContent.match(/[—–]/);
    if (m) push('em-dash', n.textContent.trim().slice(0, 50));
  }
  if (/[—–]/.test(document.title)) push('em-dash', `<title> ${document.title}`);

  // tasteskill 9.F: the middle dot is rationed to one per rendered line.
  for (const el of document.querySelectorAll('p, dd, li, span, figcaption')) {
    if (el.children.length || !vis(el)) continue;
    const dots = ((el.textContent || '').match(/·/g) || []).length;
    if (dots > 1) push('middle-dot-chain', el.textContent.trim().slice(0, 50));
  }

  // tasteskill 9.F: no section numbering as a label.
  for (const el of document.querySelectorAll('main p, main span, main dt')) {
    if (el.children.length || !vis(el)) continue;
    if (/^0\d\s*[/·:-]\s*\S/.test((el.textContent || '').trim())) {
      push('numbered-section-label', el.textContent.trim().slice(0, 30));
    }
  }

  // tasteskill 4.7: hero headline holds to two lines and the CTA stays in view.
  const h1 = document.querySelector('.hero h1');
  if (h1) {
    const lh = px(getComputedStyle(h1).lineHeight);
    const lines = Math.round(h1.getBoundingClientRect().height / lh);
    if (lines > 2 && window.innerWidth >= 1024) push('hero-headline-lines', `${lines} lines`);
    const cta = document.querySelector('.hero .btn-primary');
    if (cta && cta.getBoundingClientRect().bottom > window.innerHeight) {
      push('hero-cta-below-fold', 'primary CTA is not in the first viewport');
    }
  }

  // emil-design-eng: no transition: all, and no ease-in on a UI element.
  for (const el of document.querySelectorAll('main *, header *, footer *')) {
    const cs = getComputedStyle(el);
    // `all` is also the computed default on an element with no transition, so
    // a duration is what separates a declared `transition: all` from nothing.
    const dur = cs.transitionDuration.split(',').some((d) => parseFloat(d) > 0);
    if (!dur) continue;
    if (cs.transitionProperty === 'all') push('transition-all', el.className.toString().slice(0, 40));
    if (cs.transitionTimingFunction.split(',').some((f) => f.trim() === 'ease-in'))
      push('ease-in-on-ui', el.className.toString().slice(0, 40));
  }

  // apple-design §12 / a11y: no horizontal document scroll.
  const overflow = document.documentElement.scrollWidth - document.documentElement.clientWidth;
  if (overflow > 1) push('horizontal-overflow', `${overflow}px`);

  return out;
}

const SOURCE = {
  'kicker-above-heading': 'impeccable craft-floor',
  'content-hidden-at-rest': 'impeccable detector',
  'line-length': 'impeccable craft-floor',
  'extreme-negative-tracking': 'impeccable craft-floor',
  'oversized-h1': 'impeccable detector',
  'tiny-text': 'impeccable detector',
  'all-caps-body': 'impeccable detector',
  'wide-tracking': 'impeccable detector',
  'nested-cards': 'impeccable craft-floor',
  'border-accent-on-rounded': 'impeccable craft-floor',
  'gradient-text': 'impeccable craft-floor',
  'skipped-heading': 'impeccable detector',
  'design-system-font': 'impeccable craft-floor',
  'unthemed-caret': 'impeccable craft-floor',
  'em-dash': 'tasteskill 9.G',
  'middle-dot-chain': 'tasteskill 9.F',
  'numbered-section-label': 'tasteskill 9.F',
  'hero-headline-lines': 'tasteskill 4.7',
  'hero-cta-below-fold': 'tasteskill 4.7',
  'transition-all': 'emil-design-eng',
  'ease-in-on-ui': 'emil-design-eng',
  'horizontal-overflow': 'apple-design',
};

/* Serve dist/ ourselves unless something is already listening, so the whole
   check is one command and nobody has to remember to start a second terminal. */
const reachable = async () =>
  fetch(BASE, { signal: AbortSignal.timeout(1500) }).then(() => true).catch(() => false);

let server = null;
if (!(await reachable())) {
  const port = new URL(BASE).port || '4321';
  server = spawn('npx', ['astro', 'preview', '--port', port], { stdio: 'ignore' });
  const deadline = Date.now() + 30000;
  while (!(await reachable())) {
    if (Date.now() > deadline) {
      server.kill();
      console.error(`design-check: could not reach ${BASE}. Run \`npm run build\` first.`);
      process.exit(2);
    }
    await new Promise((r) => setTimeout(r, 400));
  }
}
const shutdown = () => server && server.kill();
process.on('exit', shutdown);

const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
});

for (const scheme of ['light', 'dark']) {
  for (const [w, h, label] of [[1280, 900, 'desktop'], [390, 844, 'mobile']]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: scheme });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => add('script-error', 'runtime', `${scheme}/${label}`, e.message));
    for (const route of ROUTES) {
      const res = await page.goto(BASE + route, { waitUntil: 'domcontentloaded' }).catch(() => null);
      if (!res || res.status() >= 400) {
        if (route !== '/404') add('route-error', 'build', route, `status ${res && res.status()}`);
        continue;
      }
      // Let the hero's authored moment finish before judging opacity.
      await page.waitForTimeout(1100);
      for (const f of await page.evaluate(inPage)) {
        add(f.rule, SOURCE[f.rule] || 'design system', `${route} ${label}/${scheme}`, f.detail);
      }
    }
    await ctx.close();
  }
}
await browser.close();

/* Source-level checks that do not need a browser. */
const css = readFileSync(new URL('../src/styles/global.css', import.meta.url), 'utf8');
if (!existsSync(new URL('../DESIGN.md', import.meta.url)))
  add('missing-design-md', 'getdesign.md', 'repo root', 'no DESIGN.md for agents to read');
if (!/prefers-reduced-motion/.test(css))
  add('no-reduced-motion', 'emil-design-eng', 'global.css', 'no reduced-motion variant');
if (!/prefers-color-scheme:\s*dark/.test(css))
  add('no-dark-mode', 'impeccable', 'global.css', 'no dark scheme');
if (/transform:\s*scale\(0\)/.test(css))
  add('scale-zero-entrance', 'emil-design-eng', 'global.css', 'entrance from scale(0)');

/* Report, deduplicated by rule + detail so one systemic fault is one line. */
const seen = new Map();
for (const f of findings) {
  const k = `${f.rule}|${f.detail}`;
  if (!seen.has(k)) seen.set(k, { ...f, count: 0 });
  seen.get(k).count++;
}
const rows = [...seen.values()].sort((a, b) => a.rule.localeCompare(b.rule));

if (!rows.length) {
  console.log(`design-check: clean across ${ROUTES.length} routes, 2 schemes, 2 viewports.`);
  process.exit(0);
}
console.log(`design-check: ${rows.length} finding(s)\n`);
for (const r of rows) {
  console.log(`  ${r.rule}  [${r.source}]`);
  console.log(`    ${r.where}${r.count > 1 ? ` (+${r.count - 1} more)` : ''}`);
  console.log(`    ${r.detail}\n`);
}
process.exit(1);
