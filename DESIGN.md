---
name: CityboundNomad
description: A personal catalogue of European cities and the things one person travels with. Editorial, restrained, Scandinavian in temperament.
colors:
  bg: "oklch(0.994 0.0008 260)"
  bg-alt: "oklch(0.968 0.0015 260)"
  bg-raised: "oklch(1 0 0)"
  ink: "oklch(0.19 0.006 260)"
  ink-soft: "oklch(0.44 0.008 260)"
  ink-muted: "oklch(0.56 0.008 260)"
  ink-faint: "oklch(0.68 0.006 260)"
  accent: "oklch(0.5 0.075 168)"
  accent-dark: "oklch(0.42 0.075 168)"
  accent-bright: "oklch(0.68 0.09 168)"
  line: "oklch(0.19 0.006 260 / 0.13)"
  line-soft: "oklch(0.19 0.006 260 / 0.07)"
  line-strong: "oklch(0.19 0.006 260 / 0.24)"
  dark: "oklch(0.17 0.006 260)"
  on-dark: "oklch(0.97 0.001 260)"
typography:
  display:
    fontFamily: "Schibsted Grotesk, -apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 600
    lineHeight: 1.03
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.875rem, 4vw, 2.875rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  title:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.024em"
  subtitle:
    fontFamily: "{typography.display.fontFamily}"
    fontSize: "1.1875rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.016em"
  lede:
    fontFamily: "-apple-system, BlinkMacSystemFont, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "-0.005em"
  body:
    fontFamily: "{typography.lede.fontFamily}"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0"
  small:
    fontFamily: "{typography.lede.fontFamily}"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.002em"
rounded:
  control: "10px"
  surface: "14px"
  pill: "999px"
  focus: "6px"
elevation:
  sm: "0 1px 2px oklch(0.19 0.006 260 / 0.05)"
  md: "0 1px 2px oklch(0.19 0.006 260 / 0.04), 0 6px 16px -6px oklch(0.19 0.006 260 / 0.08)"
  lg: "0 1px 2px oklch(0.19 0.006 260 / 0.04), 0 14px 34px -10px oklch(0.19 0.006 260 / 0.14)"
motion:
  ease-out: "cubic-bezier(0.23, 1, 0.32, 1)"
  ease-in-out: "cubic-bezier(0.77, 0, 0.175, 1)"
  ease-drawer: "cubic-bezier(0.32, 0.72, 0, 1)"
  press: "140ms"
  hover: "180ms"
  pop: "200ms"
  pop-exit: "160ms"
  panel: "260ms"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
    rounded: "{rounded.control}"
    padding: "0.6875rem 1.125rem"
    press: "scale(0.97)"
  button-ghost:
    backgroundColor: "{colors.bg-raised}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line}"
    rounded: "{rounded.control}"
    padding: "0.625rem 1rem"
    press: "scale(0.97)"
  card:
    backgroundColor: "{colors.bg-raised}"
    border: "1px solid {colors.line}"
    rounded: "{rounded.surface}"
    hover: "translateY(-2px) + elevation.lg"
    press: "scale(0.988)"
  chrome:
    backgroundColor: "oklch(0.994 0.0008 260 / 0.72)"
    backdropFilter: "blur(20px) saturate(180%)"
    height: "3.75rem"
---

# Design System: CityboundNomad

## 1. Overview

A personal catalogue, not a travel blog. Every entry is somewhere one person
went or something they own, so the design's job is to make a small, slowly
growing body of first-hand material feel deliberate rather than thin. The
temperament is Scandinavian: quiet ground, one accent, real hierarchy from
weight and size rather than from colour and ornament.

The site's mode is **Read** on its collection and city pages and **Persuade**
on the homepage and `/links`. Nothing here is an app, so density stays low and
scanability outranks expression only where a list gets long.

### Where the rules come from

This system is a merge of four sources. They are not interchangeable; each owns
a layer, and knowing which one governs a question is how conflicts get settled.

| Layer | Owner | What it decides |
|---|---|---|
| Brand | **this file** | Tokens, type scale, components. The only place a value is authored. |
| Quality floor | **[impeccable](https://impeccable.style/)** | Hierarchy, contrast, measure, materiality, the absolute bans. |
| Composition | **[tasteskill](https://www.tasteskill.dev/)** | What not to default to: slop patterns, hero discipline, copy tells. |
| Motion & interaction | **[emilkowalski/skills](https://github.com/emilkowalski/skills)** | Curves, durations, press feedback, interruption, reduced motion. |
| Enforcement | **Playwright** (`npm run design:check`) | Runs the machine-decidable half of all four against the built pages. |

**Conflict rule: the strictest rule wins, unless a source is speaking outside
its layer.** The four conflicts that actually came up, and how they resolved:

1. **Eyebrows.** tasteskill caps them at `ceil(sections / 3)`; impeccable bans
   them outright and says no brief earns one back. → **Banned.** A label above
   a heading is deleted. A label above a block with no heading was never an
   eyebrow: it is a heading, and it is marked up as one.
2. **The display face.** apple-design says prefer the platform font, which
   already ships optical sizing. impeccable says a system display face on an
   own-world page is a failure, not a fallback. → **Split by role.** Headings
   take Schibsted Grotesk, self-hosted; body and UI text stay on the platform
   stack. Emil's argument is about UI text and holds there; impeccable's is
   about a brand's voice and holds at display sizes.
3. **Motion properties.** Emil says animate transform and opacity only.
   impeccable says reach past them into blur, clip-path and shadow. →
   **Split by frequency.** Anything a visitor triggers, and anything they see
   more than once a session, is transform and opacity. The one authored moment
   may use more, because it runs once on three elements.
4. **Scroll reveals.** Emil's system permits a staggered reveal; impeccable
   flags content sitting at opacity 0 and rejects the same entrance on every
   section. → **One authored moment**, on the hero, on load, in CSS, settling
   from a state that is already legible. Nothing else animates in.

## 2. Colors

Neutral ground, one accent, and no second hue anywhere on the page.

### Neutral
The ground is a near-white with a trace of blue, not a cream. Ink runs in four
steps (`ink` → `ink-faint`) and lines in three. Both schemes define the same
token names, so light and dark are one design rather than two.

### Accent
A single desaturated green (`oklch(0.5 0.075 168)`), lifted to
`accent-bright` in dark. It marks affordances and nothing else: links, the
active nav item, list markers, the focus ring. **Primary buttons are ink, not
accent.** Chroma stays under 0.1 so it never competes with a photograph.

### Named Rules
- One accent for the whole site. A green page does not grow a blue button.
- Contrast: body and placeholder ≥ 4.5:1, large text ≥ 3:1.
- On a dark band, secondary text tints from the band, never flat grey.
- Shadows carry an offset and a soft blur, tinted to the ink hue. No haloes.

## 3. Typography

Two faces, split by role. **Schibsted Grotesk** for display, self-hosted as one
48KB variable woff2 and preloaded; a Norwegian editorial grotesk, which is the
right voice for a catalogue of Scandinavian cities. The **platform sans** for
body and UI.

### Hierarchy
Tracking tightens as size grows and leading loosens as size shrinks: `-0.035em`
at `display`, `-0.005em` at `lede`, slightly positive at `small`. A single
letter-spacing across the scale is wrong at one end of it.

### Named Rules
- Tracking floor `-0.04em`. Display ceiling `6rem`.
- Reading measure 65–75ch on every column of running text, not only `.prose`.
- Hierarchy comes from weight and size. No gradient text, no all-caps body,
  no tracking above `0.12em`.
- Headings read in one run. No `<br>`-split, half-italicised headline.
- Numerals that compare down a column are tabular.

## 4. Elevation

Three steps, all layered and shallow: a card is a sheet of paper, not a box.
Chrome is a translucent layer with content scrolling under it and a 14px
gradient scroll edge instead of a 1px rule. `prefers-reduced-transparency`
makes every translucent surface solid.

### Named Rules
- One radius scale, one rule for it: pills `999px`, controls `10px`, every
  surface `14px`. A card is a card whether it is a city tile or a stay log.
- No coloured `border-left` or `border-right` above 1px on a rounded surface.
- No card inside a card.

## 5. Components

**Buttons** — primary is ink on ground; ghost is a bordered raised surface.
Both press to `scale(0.97)` in 140ms. On the hero photograph primary inverts to
near-white, because near-black disappears into a scrim.

**Cards** — a bordered raised surface at `14px`. Hover lifts 2px and deepens
the shadow, gated behind `(hover: hover) and (pointer: fine)`. Press is
`scale(0.988)`, shallower than a button because a full-width card taking 0.97
reads as the page flinching. The photograph inside does not move.

**Chrome** — 60px translucent bar, blurred and saturated, with the page
scrolling underneath. The mobile panel is a popover scaling from the control
that opened it, closable by Escape, by tapping away, and by reaching a desktop
width; the bar goes opaque alongside it so the two read as one surface.

**Trio grid** — three items compose rather than repeat: the first cell takes
the taller left column and leads with display type, so its height reads as
emphasis. Three identical cards in a row is the generic feature grid.

**Browser surfaces** — selection, caret, scrollbar, underline offset and
tabular numerals are all themed from the palette. They ship browser defaults
otherwise, and defaults belong to no design system.

## 6. Do and Do Not

### Do
- Delete the label and let the heading speak.
- Give every column of running text a measure.
- Put the press feedback on `:active`, at 140ms, on anything pressable.
- Gate hover motion behind a fine pointer, and ship the reduced-motion
  variant with the animation rather than after it.
- Name the exact properties a transition animates.
- Use a real count; never a zero-padded index dressed as one.

### Do Not
- No eyebrow or kicker above a heading. Ever.
- No section numbering unless the sequence itself carries information.
- No em-dash or en-dash anywhere a reader can see one, `<title>` included.
- No more than one middle dot per line.
- No content sitting at opacity 0 waiting for script.
- No `transition: all`, no `ease-in` on a UI element, no entrance from
  `scale(0)`.
- No emoji standing in for an icon or an illustration.
- No hand-rolled fake screenshots or decorative SVG.

## 7. Checking

`npm run design:check` builds nothing and assumes `dist/` is current: run
`npm run build` first. It serves the site, drives Chromium over 14 routes in
both schemes at two viewports, and reports every finding with the rule name and
the source it came from. A finding is a failure. If a rule is wrong for this
site, change it here and in `tools/design-check.mjs` deliberately, rather than
letting the check go yellow.
