# Infographic 06 — The Adhan

**Tradition:** Islam · **Ember:** Emerald (`#34d399`)
**Sits within:** §6 Symbols & Sensory World
**Orientation:** Portrait 1200 × 1600

> Read [`README.md`](README.md) first for the shared house style.
> **Aniconism note:** no faces/figures. A minaret, a skyline, sound rendered as
> abstract form — all fine. A muezzin's face — not.

---

## Purpose (one sentence)

Convey the *adhan* — the call to prayer — as the central recurring **sound** of
Muslim public life: a human voice, five times a day, stretching the name of God
across a city.

## The idea to communicate

From the prose: *"Five times a day the adhan rises over a city — a human voice,
unaccompanied, stretching the name of God across the rooftops. It is not music
exactly and not speech exactly. It is a reminder made audible."*

A reader should leave with:
1. The adhan is **sound**, not image — the defining sense of the tradition.
2. It recurs **five times a day**, marking time over a whole city.
3. It is **one unaccompanied human voice** — between speech and song.
4. Its absence, for those raised inside it, "can feel like a light switched off."

The design challenge: **make sound visible** without a person and without
gimmicky soundwave clip-art.

## The photo (the "window")

- **Subject (aniconic):** a **minaret** against sky at dawn/dusk, a rooftop
  skyline, the geometry of a mosque tower — the *source* of the sound rather than
  a singer. Silhouette and open sky read as "voice travelling out."
- **Placement:** vertical emphasis — a minaret suits the portrait format; place
  it left or centred, reaching top to bottom, with the sound-diagram radiating
  from it.
- **Treatment:** emerald duotone; a dawn/dusk sky can keep a graded emerald glow
  (still one ember). Grain ~4%.
- Sourcing: "Islam · The Adhan" lens set in [`photo-picker.html`](photo-picker.html).

## Composition — sound made visible

```
┌──────────────────────────────┐
│  SENSORY WORLD · ISLAM        │  ← kicker emerald
│  The Adhan                    │  ← serif title
│              ) ) )            │  ← concentric arcs radiate from the minaret
│         )  ▲  ) )             │     top, widening outward = the voice carrying
│      )   ▲▲▲   ) )            │     (minaret = the PHOTO silhouette)
│    )   [MINARET] )  )         │
│      )  PHOTO   )  )          │
│         )  )  )               │
│                               │
│  FIVE TIMES A DAY             │  ← the one datum: ×5, sans, emerald
│  one unaccompanied voice      │  ← serif sub-line muted
│  between speech and song      │
│                               │
│  Source · review status       │
└──────────────────────────────┘
```

Render the voice as **concentric arcs** (not a jagged audio-waveform) radiating
from the top of the minaret across the city — calm, expanding, like the actual
carry of a call. Five small tick-marks along a thin vertical line (dawn→night)
can encode the five daily times as a quiet secondary read.

## Type

- Kicker: `SENSORY WORLD · ISLAM`, sans emerald, `+0.22em`.
- Title: `The Adhan`, serif 500, `#ecfdf5`.
- Key datum: `FIVE TIMES A DAY` or `×5`, sans 500, 24px, `#34d399`.
- Sub-lines: serif 400, 15px, `#89b3a3`.

## Iconography

The arcs *are* the icon. Optional small star-and-crescent by the kicker. Do not
add a literal loudspeaker/megaphone icon — it cheapens the reverence.

## Piece-specific don'ts

- **Don't** depict a muezzin's face or figure — aniconic.
- Don't use a stock "audio waveform" or equalizer graphic — the site already
  owns the equalizer motif in its Sound Toggle; use calm concentric arcs instead.
- Don't render the sky in a non-emerald hue (no blue-hour blues) — keep the one
  ember.

## Accessibility & alt text

Encode the "five" with a number *and* the five tick-marks — never colour alone.
Text over sky must stay ≥4.5:1 (darken the sky band under the title). Ship:

> Alt: "A minaret silhouetted against an emerald dawn sky, with calm concentric
> arcs radiating outward to show the adhan — the Muslim call to prayer —
> carrying across a city. A label notes it sounds five times a day, one
> unaccompanied human voice between speech and song."

Deliverables: per README §7.
