# Infographic Commission Package — Project Theos

> A package of nine educational infographics — three per tradition — each built
> around **one real-world photograph** as a focused content element. This folder
> is the brief you hand to a commissioned designer/illustrator. Read this file
> first; it is the shared house style every individual brief inherits. Then read
> the per-infographic brief for the specific piece.

---

## 0. Why these exist (read before designing)

Project Theos is a reading experience, not a brochure. Its whole design bet is
**restraint**: near-black "ember room" backgrounds, one accent colour per
tradition, a literary serif, and *deliberately no photography* (see the site's
`PRODUCT.md` and `DESIGN.md`). These infographics are a **bounded, sanctioned
exception** to the no-photography rule — the *only* place a real photograph
appears on the site. That privilege comes with a constraint: each infographic
must feel like it belongs **inside** the ember room, not like a stock-image
panel dropped on top of it.

Each infographic does one job: take a single idea already written in the site's
prose and make it **legible at a glance and emotionally grounded** by one honest,
real-world photo. They are educational, not decorative. If a reader learns the
structure of the Five Pillars or the shape of the liturgical year from the
graphic alone, it works.

**The reader context:** unhurried, private, full-attention reading on a dark
screen. The infographic sits *within a column of serif prose*, roughly 640–720px
wide on desktop. It is not a poster seen across a room; it is read close, in
sequence, as part of a page.

---

## 1. The one hard rule: photography treatment

Every infographic contains exactly **one** photograph (the "window"). It is the
real-world lens — a cultural/material detail of the tradition, honestly
depicted. The photo must be **treated so it reads as part of the ember room**:

- **Duotone / deep tint toward the tradition palette.** Map the photo's shadows
  to the tradition `bg` (near-black, hue-tinted) and its highlights toward the
  tradition `accent`. The photograph should look lit by the same single ember
  as the rest of the room — never a full-colour, full-saturation stock photo.
- **One window, not a collage.** A single focal image per graphic. No photo
  grids, no montages, no cut-out people floating on gradients.
- **Grain-matched.** Add a fine film grain (≈3–5% opacity) over the photo so it
  sits in the same textured air as the site's SVG-noise grain layer. No glossy,
  crisp, HDR stock look.
- **No text baked into the photo.** All type is a separate vector layer so it
  stays crisp and editable.

> The photographs themselves are sourced separately. See `photo-picker.html` in
> this folder — a lightweight page of curated Unsplash search lenses, one set
> per infographic, for the client to choose the source image. The chosen photo
> is then treated as above. **Whatever photo is chosen must be free to use
> (Unsplash licence) and credited** in the site's `CREDITS.md`.

---

## 2. Palette tokens (exact values — use these, not eyeballed colour)

The site is token-driven. Each tradition has a fixed nine-value palette. Use the
**exact hex** below; these are the same tokens the live site pulls from each
tradition's `meta.json`. Do not invent new colours — a tradition gets exactly
**one accent** ("the One Ember Rule").

### Stone / neutral (shared chrome, captions, the "outside the ember" default)
| Token | Hex | Use |
|---|---|---|
| `stone-bg` | `#0c0a09` | deepest background |
| `stone-surface` | `#1c1917` | raised panel |
| `stone-text` | `#e7e5e4` | body/label text on dark |
| `stone-muted` | `#a8a29e` | secondary text, captions |
| `stone-accent` | `#d6b06b` | neutral warm gold (chrome only) |
| `stone-border` | `#44403c` | hairline rules |

### Christianity — "Amber Ember"
| Token | Hex |
|---|---|
| `bg` | `#0c0a09` |
| `surface` | `#1c1917` |
| `text` | `#e7e5e4` |
| `muted` | `#a8a29e` |
| **`accent`** | **`#f59e0b`** |
| `border` | `#78350f` |
| gradient | `#0c0a09` → `#1c1917` → `#0c0a09` |
| accent tonal ramp | `#2b1704 · #47250a · #6b3810 · #8f4d14 · #b6641a · #d98420 · #f59e0b · #fbc86b` |

### Islam — "Emerald Ember"
| Token | Hex |
|---|---|
| `bg` | `#021a14` |
| `surface` | `#064e3b` |
| `text` | `#ecfdf5` |
| `muted` | `#89b3a3` |
| **`accent`** | **`#34d399`** |
| `border` | `#065f46` |
| gradient | `#021a14` → `#052e26` → `#021a14` |
| accent tonal ramp | `#04150f · #08281d · #0e3f2c · #15583c · #1c744e · #279661 · #34d399 · #8ff0c4` |

### Hinduism — "Orange Ember"
| Token | Hex |
|---|---|
| `bg` | `#1a0803` |
| `surface` | `#431407` |
| `text` | `#fff7ed` |
| `muted` | `#c9a48a` |
| **`accent`** | **`#fb923c`** |
| `border` | `#9a3412` |
| gradient | `#1a0803` → `#3b0d0d` → `#1a0803` |
| accent tonal ramp | `#2c0f04 · #481909 · #6c260d · #903511 · #b84616 · #df5c1c · #fb923c · #fdc294` |

**Tinted-Neutral Rule:** there is no pure `#000` or `#fff` and no neutral grey
anywhere. Every dark and every light must be tinted toward the tradition's hue.
Use the accent tonal ramp for anything that needs a mid-tone of the ember (bars,
fills, dividers, the photo duotone highlights).

---

## 3. Typography tokens

System-stack only — **do not introduce a licensed or web font.** These are the
exact stacks the site ships. The type does the reverence; keep it disciplined.

- **Serif (display, titles, body):**
  `"Iowan Old Style", "Palatino Linotype", Palatino, "Book Antiqua", Georgia, "Times New Roman", serif`
- **Sans (labels, chrome, data, captions):**
  `system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`

| Role | Font | Weight | Size (in-graphic guide) | Tracking | Case |
|---|---|---|---|---|---|
| **Kicker / label** | sans | 500 | 12–13px | `+0.22em` | UPPERCASE |
| **Title** | serif | 500 | 34–44px | `−0.02em` | Sentence |
| **Subhead / step label** | serif | 500 | 20–24px | `−0.01em` | Sentence |
| **Body / caption** | serif (body), sans (data) | 400 | 15–17px | normal | Sentence |
| **Data value / number** | sans | 500 | 22–30px | `+0.02em` | — |
| **Source / credit** | sans | 400 | 11px | `+0.04em` | Sentence |

**The Label-Is-Accent Rule:** the kicker/label style is the *one* text element
always set in the tradition's **accent** colour. Titles and body are `text`;
captions are `muted`. Never set body copy in the accent.

---

## 4. Shared layout & composition spec

- **Artboard:** portrait **1200 × 1600 px** master (design at 1×; export @1×,
  @2× and an SVG vector layer). This portrait ratio drops cleanly into the
  site's reading column. Where a piece is inherently horizontal (e.g. a
  timeline), a **1200 × 900** landscape variant is allowed and noted in that
  piece's brief.
- **Safe margin:** 80px on all sides at master scale. Nothing critical in the
  outer margin.
- **Background:** the tradition gradient (radial glow at top-centre using
  `accent` at ~22% over the linear `bg → surface → bg`), plus the fine grain
  overlay. Same recipe as the site `Backdrop`.
- **Corner radius:** small and architectural — **4px** on panels, **3px** on
  small chips. The system reads carved/etched, not soft. (Only true pill shape
  allowed: none here — pills are reserved for site UI.)
- **Rhythm:** one clear focal photo (the window), one title block, and a single
  structured data element (steps / cycle / list / ramp). Do not cram three data
  systems into one graphic — one idea, made clear.
- **Motion:** these are static assets. No animation.

---

## 5. Iconography

Use the site's own symbol family so the graphics match the pages. Symbols are
**self-hosted Font Awesome Free (solid), CC BY 4.0** vector paths — non-figurative,
single-colour, always the tradition accent as a low-opacity watermark or a
small solid mark.

- Christianity → **cross**
- Islam → **star-and-crescent** (and geometric tessellation as pattern)
- Hinduism → **om**

Treat a symbol either as a large low-opacity (≈8–13%) watermark bleeding off an
edge, *or* as a small solid accent mark beside the kicker — never both in the
same graphic. Do not add symbols that aren't the tradition's own.

---

## 6. Accessibility (WCAG 2.1 AA — non-negotiable)

- **Contrast:** all text ≥ 4.5:1 against whatever sits directly behind it
  (including over the photo — darken/tint the photo region under any text).
- **Legible small:** the graphic must still read at 640px column width. Test by
  viewing the export at that size; if a number or label breaks, the design is
  too dense.
- **Colour is never the only signal:** don't encode meaning in hue alone (e.g.
  a cycle's seasons) without also using position, label, or shape.
- **Alt text is a deliverable.** Each piece's brief ends with the alt text to
  ship with the asset. Write the graphic so that alt text is honestly complete.

---

## 7. Deliverables per infographic

1. **Editable source** (Figma, or layered SVG/AI) with the photo on its own
   layer, all type live/editable, colours as named styles.
2. **SVG** of the vector+type layer (photo embedded or referenced).
3. **PNG** at @1× (1200px wide) and @2× (2400px wide), on transparent *and* on
   the tradition `bg`.
4. **The treated photo** as a standalone asset (for the site to reference at
   `public/assets/<tradition>/`).
5. **The alt text** (from the brief) and the **photo credit line** (photographer
   + Unsplash) for `CREDITS.md`.

---

## 8. Global do / don't

**Do**
- Keep every graphic on this one shared grammar; a reader should feel all nine
  are siblings, differing only by their ember.
- Let the single photo carry the emotion and the type carry the information.
- Tint everything — photo, fills, darks — toward the tradition hue.
- Keep it honest: if a graphic simplifies a diverse tradition, the caption says so.

**Don't**
- Don't use more than one photograph, or a photo montage/collage.
- Don't add a second accent colour, gradient duo, or "pop" colour to a tradition.
- Don't bake text into the photo, use gradient text, or `background-clip: text`.
- Don't introduce a licensed/web font or a second display face.
- Don't make it look like an ad, a quiz, an achievement/streak UI, or a
  Wikipedia infobox — no CTAs, no gamification, no spec-sheet tables.
- Don't use a full-saturation, glossy, HDR stock photo. Treat it into the room.

---

## 9. The nine pieces

| # | Tradition | Piece | Brief |
|---|---|---|---|
| 1 | Christianity | The Cross — an instrument of death made a sign of hope | [`01-christianity-the-cross.md`](01-christianity-the-cross.md) |
| 2 | Christianity | Light in Sacred Space | [`02-christianity-light-in-sacred-space.md`](02-christianity-light-in-sacred-space.md) |
| 3 | Christianity | The Liturgical Year | [`03-christianity-the-liturgical-year.md`](03-christianity-the-liturgical-year.md) |
| 4 | Islam | The Five Pillars | [`04-islam-the-five-pillars.md`](04-islam-the-five-pillars.md) |
| 5 | Islam | Word & Pattern | [`05-islam-word-and-pattern.md`](05-islam-word-and-pattern.md) |
| 6 | Islam | The Adhan — the call to prayer | [`06-islam-the-adhan.md`](06-islam-the-adhan.md) |
| 7 | Hinduism | The Sensory Grammar of Worship | [`07-hinduism-the-sensory-grammar.md`](07-hinduism-the-sensory-grammar.md) |
| 8 | Hinduism | The Four Paths (Yogas) | [`08-hinduism-the-four-paths.md`](08-hinduism-the-four-paths.md) |
| 9 | Hinduism | Om & Darshan | [`09-hinduism-om-and-darshan.md`](09-hinduism-om-and-darshan.md) |

Photo sourcing tool: [`photo-picker.html`](photo-picker.html)
