---
name: Project Theos
description: A generative, palette-driven atmosphere system, one shared component grammar, a different ember of color per tradition.
colors:
  stone-bg: "#0c0a09"
  stone-surface: "#1c1917"
  stone-text: "#e7e5e4"
  stone-muted: "#a8a29e"
  stone-accent: "#d6b06b"
  stone-border: "#44403c"
  christianity-bg: "#0c0a09"
  christianity-surface: "#1c1917"
  christianity-text: "#e7e5e4"
  christianity-muted: "#a8a29e"
  christianity-accent: "#f59e0b"
  christianity-border: "#78350f"
  islam-bg: "#021a14"
  islam-surface: "#064e3b"
  islam-text: "#ecfdf5"
  islam-muted: "#89b3a3"
  islam-accent: "#34d399"
  islam-border: "#065f46"
  hinduism-bg: "#1a0803"
  hinduism-surface: "#431407"
  hinduism-text: "#fff7ed"
  hinduism-muted: "#c9a48a"
  hinduism-accent: "#fb923c"
  hinduism-border: "#9a3412"
  status-reviewed: "#34d399"
  status-reviewed-text: "#6ee7b7"
  status-warn: "#eab308"
  status-warn-text: "#fde047"
typography:
  display:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif'
    fontSize: "clamp(3.5rem, 12vw, 9rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif'
    fontSize: "clamp(3rem, 10vw, 7rem)"
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif'
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.02
  body-editorial:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.15rem, 1rem + 0.7vw, 1.4rem)"
    fontWeight: 400
    lineHeight: 1.75
  body-immersive:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    fontSize: "clamp(1.3rem, 1.1rem + 1.1vw, 1.9rem)"
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: "-0.01em"
  quote:
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif'
    fontSize: "clamp(1.5rem, 1.2rem + 1.4vw, 2.3rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  label:
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    fontSize: "0.72rem"
    fontWeight: 500
    letterSpacing: "0.22em"
rounded:
  sm: "3px"
  md: "4px"
  pill: "999px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 3rem)"
  measure: "52rem"
  measure-wide: "52rem"
components:
  tradition-card:
    backgroundColor: "{colors.stone-surface}"
    textColor: "{colors.stone-text}"
    rounded: "{rounded.md}"
    height: "20rem"
  tradition-card-hover:
    backgroundColor: "{colors.stone-surface}"
    textColor: "{colors.stone-accent}"
    rounded: "{rounded.md}"
  sound-toggle:
    backgroundColor: "rgba(0,0,0,0.55)"
    textColor: "{colors.stone-text}"
    rounded: "{rounded.pill}"
    padding: "0.55rem 0.85rem"
  status-badge-reviewed:
    textColor: "{colors.status-reviewed-text}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
  status-badge-warn:
    textColor: "{colors.status-warn-text}"
    rounded: "{rounded.sm}"
    padding: "0.15rem 0.5rem"
---

# Design System: Project Theos

## 1. Overview

**Creative North Star: "The Ember Room"**

Every tradition page is the same dark room with a different single coal glowing
in it. The nine palette tokens in each `meta.json` (`bg`, `surface`, `text`,
`muted`, `accent`, `border`, and the three gradient stops) are the *entire*
mechanism by which Christianity, Islam, and Hinduism feel distinct, everything
else (layout, components, motion, type) is one shared grammar. Christianity
glows amber, Islam glows emerald, Hinduism glows orange-ember. The room itself,
near-black, grain-textured, and generatively lit from below, never changes
shape. This is the direct visual expression of PRODUCT.md's "one template,
honestly adapted" principle: uniformity is the scaling mechanism, color is the
only thing that's allowed to vary.

The system explicitly rejects photography, 3D/WebGL spectacle, and decorative
gradients-as-content, atmosphere is generated entirely from CSS (radial +
linear gradients, SVG turbulence grain, a single symbol watermark), never from
stock imagery, in keeping with PRODUCT.md's anti-reference list. It also
rejects anything that reads as brochure-confident: sourcing and review status
are surfaced in the same visual language as the content itself (`SectionMeta`,
`/governance`), not hidden in an admin panel, because honesty about what isn't
yet verified is part of the brand, not an implementation detail.

**Key Characteristics:**
- One component set, nine swappable CSS custom properties per tradition, no bespoke per-tradition CSS
- Near-black, hue-tinted backgrounds (never true `#000`) with a single accent ember per tradition
- Serif for reading and reverence, sans for labels, chrome, and the second-person immersive voice
- Flat by default; atmosphere belongs to the continuous reading canvas, while glass is reserved for floating interface moments
- Motion is subtle, state-driven, and fully optional, every effect degrades cleanly under `prefers-reduced-motion`

## 2. Colors

Three independent dark palettes, one per tradition, plus a neutral "stone"
default used on the landing index and any chrome outside a tradition's scope.
Each palette pairs a near-black hue-tinted background with exactly one
saturated accent, the accent is the ember; everything else is ash and shadow
around it.

### Primary (per-tradition accent: the ember)
- **Amber Ember** (`#f59e0b`, Christianity): the sole warm highlight, kickers, links, the hero glyph watermark, card hover states, focus rings. Appears on a small fraction of any given view; its rarity is what makes it read as light rather than decoration.
- **Emerald Ember** (`#34d399`, Islam): same role, cooler register. Also happens to double as the fixed "reviewed" status color elsewhere in the system, coincidental overlap, not a rule; don't read tradition accents as semantic status colors.
- **Orange Ember** (`#fb923c`, Hinduism): same role, warmer/redder than Christianity's amber, keeps the two from reading as the same color at a glance.
- **Warm Gold** (`#d6b06b`, stone/default): the landing page and any un-themed chrome uses this as its accent before a tradition's palette takes over.

### Neutral (per-tradition bg / surface / text / muted / border)
- **Christianity, Charcoal Stone**: bg `#0c0a09`, surface `#1c1917`, text `#e7e5e4`, muted `#a8a29e`, border `#78350f` (a warm umber border, not gray, it still carries the ember).
- **Islam, Deep Emerald Night**: bg `#021a14`, surface `#064e3b`, text `#ecfdf5`, muted `#89b3a3`, border `#065f46`.
- **Hinduism, Ember Rust**: bg `#1a0803`, surface `#431407`, text `#fff7ed`, muted `#c9a48a`, border `#9a3412`.

Every neutral is tinted toward its tradition's hue even at near-black or
near-white extremes, there is no true `#000` or `#fff` anywhere in the
system, and no gray that reads as neutral-gray rather than "this tradition's
dark."

### Status (fixed across all palettes: governance & sourcing only)
- **Reviewed Green** (`#34d399` / text `#6ee7b7`): a section's `review_status` is `reviewed`.
- **Needs-Review Amber** (`#eab308` / text `#fde047`): `needs-practitioner-review`.
- These two are the only colors in the system that carry meaning independent of
  which tradition is active, they must never be swapped for a tradition's
  accent, even when a tradition's accent happens to be the same hue family
  (Islam's emerald).

### Named Rules
**The One Ember Rule.** Each tradition gets exactly one accent color. It never
gets a second highlight, a gradient duo, or a complementary pop color, the
entire sense of "this tradition feels different" rests on one hue doing all
the work, at low-opacity/high-opacity contrast (0.06 on the hero glyph
watermark, full saturation on a kicker label) rather than on adding more
colors.

**The Tinted-Neutral Rule.** No background, surface, or border is ever plain
gray or true black. Every neutral carries its tradition's hue even in shadow.

## 3. Typography

**Display/Body Font:** "Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif (system stack, zero network requests)
**Sans/Label Font:** system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif

**Character:** A literary old-style serif carries reverence, reading comfort,
and the third-person/first-person voices; a plain system sans is reserved for
labels, chrome, and the second-person immersive voice, the pairing signals
"a book you're reading" versus "a moment you're inside," and the type change
itself marks the shift in register between `EditorialModule` and
`ImmersiveModule`.

### Hierarchy
- **Display** (weight 500, `clamp(3.5rem, 12vw, 9rem)`, line-height 1.02, tracking -0.02em, serif): the hero `<h1>` tradition name only. Carries a heavy soft text-shadow (`0 30px 60px rgba(0,0,0,0.6)`) to stay legible over the generative backdrop.
- **Headline** (weight 500, `clamp(3rem, 10vw, 7rem)`, line-height 1.02, serif): the landing page's "Project Theos" headline, same scale role as Display, different page.
- **Title** (weight 500, `clamp(2rem, 5vw, 2.75rem)`, serif): tradition names on index cards.
- **Body, Editorial** (weight 400, `clamp(1.15rem, 1rem + 0.7vw, 1.4rem)`, line-height 1.75, serif, set within the shared `52rem`/~70–75ch reading lane): Origins, Beliefs, Practice, Symbols, third-person factual sections.
- **Body, Immersive** (weight 300, `clamp(1.3rem, 1.1rem + 1.1vw, 1.9rem)`, line-height 1.55, tracking -0.01em, sans, set within the shared `52rem` reading lane): "A Day / A Life", second-person narrative, deliberately lighter-weight and larger than editorial body text so it reads as spoken rather than written.
- **Quote** (weight 400, `clamp(1.5rem, 1.2rem + 1.4vw, 2.3rem)`, line-height 1.4, italic, tracking -0.015em, serif): Sacred Text and Tensions & Questions, first-person excerpts and testimony.
- **Label** (weight 500, 0.72rem, tracking 0.22em, uppercase, sans, accent-colored): kickers, section labels, nav chrome, source-type tags, the one text style that's always the tradition's accent color, never body text color.

### Named Rules
**The Voice-Is-Typeface Rule.** Third-person sections are always set in serif
body; second-person narrative is always sans, lighter weight, larger scale.
Never mix, the typeface change is how a reader unconsciously registers "the
voice just shifted," reinforcing PRODUCT.md's per-section voice assignment
without adding any explicit UI chrome to announce it.

## 4. Elevation

Flat by default, surfaces sit directly on the gradient backdrop with no drop
shadows or Material-style tonal layering. Depth is conveyed atmospherically
instead: a radial gradient glow at the top of the viewport, a fine SVG-noise
grain layer (`opacity: 0.04`, `mix-blend-mode: overlay`) that kills gradient
banding, and, in exactly two places, a frosted glass panel that visually
lifts content off the backdrop to signal "you are inside this moment now."

### Shadow Vocabulary
- **Hero title glow** (`text-shadow: 0 30px 60px rgba(0,0,0,0.6)`): keeps the giant serif display legible over a busy generative backdrop; not a UI elevation cue.
- **Reading canvas atmosphere:** three low-opacity, off-axis fields span the complete chapter sequence. They add depth without elevating or spotlighting an individual module.

### Named Rules
**The Floating-Glass Rule.** `backdrop-filter: blur()` is reserved for the
Hero's disclaimer box and the floating `SoundToggle` control. Reading modules
remain flat inside one continuous atmospheric canvas. Glass is a signal that
an interface element sits above the page, not a texture applied to content.

## 5. Components

Six components form the entire system; every tradition reuses all six with
only its nine palette tokens swapped in. Corner radius is small and
architectural throughout (3–4px), the system reads as carved/etched, not soft
or bubbly, with the sole exception of the fully-pill floating `SoundToggle`
and the skip-link.

### Tradition Card (index grid)
- **Shape:** 4px radius, 1px border at 15% text-mix, `20rem` fixed height.
- **Surface:** the tradition's own `Backdrop` gradient at 0.55 opacity plus its `Symbol` glyph watermark at 0.13 opacity, bottom-right, bleeding off the card edge.
- **Hover/Focus:** lifts `-4px`, border shifts to 60%-mix accent, backdrop opacity rises to 0.85, glyph opacity rises to 0.22 with a `scale(1.05) rotate(-3deg)` nudge, and an "Enter →" label fades/slides in. All transitions use the shared ease curve; reduced-motion strips the transform/opacity choreography but keeps the end state visible.

### Hero (tradition landing header)
- **Structure:** full-bleed backdrop with a 0.3x-scroll-speed parallax layer, an oversized low-opacity (0.06) symbol watermark centered behind the title, the Display title, and a glass disclaimer box below it.
- **Disclaimer box:** `color-mix(in srgb, #000 45%, transparent)` background, `blur(8px)` backdrop-filter, 1px border at 14% text-mix, 4px radius, every tradition's editorial disclaimer lives here, always visually present, never collapsed or hidden behind a tooltip.
- **Scroll cue:** a small pill outline with an animated dot at the bottom of the hero; the dot animation is skipped entirely under reduced motion (not just slowed).

### Editorial / Immersive / Quote Modules (the three section voices)
- **Editorial:** flat, shared `52rem` measure, serif body, `strong` set in the accent color, `em` nudged toward the accent via `color-mix`. No local background treatment.
- **Immersive:** flat, sans body, shared `52rem` measure. Voice, scale, and the lived-lens label distinguish the chapter without enclosing it in a panel.
- **Quote:** flat, shared `52rem` measure, serif italic, a 3px accent-tinted left border on the `blockquote` as the only structural marker, `cite` set in small-caps-style sans/muted.

### Section Meta (sources & review-status footer)
- Appears at the bottom of every section, all three module types: a list of source-type pill tags (accent-outlined, uppercase, 0.6rem) each linking to its citation, followed by a status line with a colored dot (`status-reviewed`/`status-warn`) and the literal `review_status` value, never euphemized.

### Sound Toggle (ambient audio control)
- **Shape:** fully pill (`999px` radius), fixed bottom-right, floating over content at `z-index: 60`.
- **Style:** glass background (`color-mix(#000 55%)` + `blur(8px)`), tiny 3-bar equalizer icon that animates only while `aria-pressed="true"` and only outside reduced motion; otherwise a static mid-height bar.
- Renders nothing at all when a tradition has no `ambientAudio` set, never shows a disabled/greyed-out state.

### Governance Table & Status Badges (`/governance` only)
- The one place in the system that looks like a dashboard rather than a reading experience, deliberately: this is internal tooling, not the public reading surface, so a data table and pill badges are the right affordance here even though PRODUCT.md's anti-references rule them out for tradition pages.
- **Badges:** small pill (3px radius), 1px border in the status color, uppercase 0.62rem text, no fill, outline-only so multiple badges in a row don't compete visually with body text.

## 6. Do's and Don'ts

### Do:
- **Do** keep every tradition on the exact same six components (`Hero`, `TraditionCard`, `EditorialModule`, `ImmersiveModule`, `QuoteModule`, `SectionMeta`), a new tradition changes only the nine tokens in its `meta.json → palette`, never a component.
- **Do** tint every neutral toward its tradition's hue, even at near-black or near-white extremes. Never `#000` or `#fff`, never plain gray.
- **Do** keep the accent to one color per tradition, used sparingly (labels, links, glyph watermark, hover/focus), its rarity is what makes it read as an ember rather than a color scheme.
- **Do** match typeface to voice: serif for third/first-person reading, sans for second-person immersive narrative and all UI chrome/labels.
- **Do** give every motion effect (reveal, parallax, equalizer, scroll cue) a `prefers-reduced-motion` fallback that keeps content fully legible with zero animation.
- **Do** keep the `SectionMeta` review-status indicator honest, the actual `review_status` value, unstyled toward "more finished" than it is.

### Don't:
- **Don't** add stock or licensed photography anywhere. Per PRODUCT.md's anti-references, atmosphere is generated (gradients, grain, one symbol emblem), never photographic.
- **Don't** add streaks, XP, progress bars, badges-as-achievement, or any gamified completion UI to a tradition page, the PRD explicitly rules out quiz/gamified learning framing.
- **Don't** add sign-up CTAs, "join now" buttons, or any persuasive/conversion-styled component, no tradition is being sold.
- **Don't** give a tradition page an encyclopedia/infobox layout (comparison tables, spec-sheet sidebars). The `/governance` data table is the one sanctioned exception, and it's explicitly internal tooling, not a public reading pattern.
- **Don't** add 3D/WebGL, canvas scenes, or any animation whose purpose is to impress rather than support reading, the build ships effectively zero framework JS on purpose.
- **Don't** use `backdrop-filter` blur decoratively outside the Hero disclaimer and floating Sound Toggle.
- **Don't** add a second display typeface or a licensed web font, the system is system-stack-only by design (offline-safe, zero network requests).
- **Don't** add new colored left-border "stripe" accents. `LensLabel` and the `QuoteModule` blockquote are the system's only two, and they're load-bearing content markers, not a decorative pattern to extend, reach for a full border, a background tint, or a leading label instead.
- **Don't** use gradient text or `background-clip: text` treatments anywhere in the system.
- **Don't** style Islam's emerald tradition accent as if it were the fixed "reviewed" status color, or vice versa, the overlap in hue is coincidental, not semantic.
