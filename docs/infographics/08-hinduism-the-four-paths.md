# Infographic 08: The Four Paths (Yogas)

**Tradition:** Hinduism · **Ember:** Orange (`#fb923c`)
**Sits within:** §4 Practice & Ritual
**Orientation:** Portrait 1200 × 1600 (a 4-up grid; landscape 1200 × 900 is an
acceptable alternate if the client prefers a 2×2 that reads wider)

> Read [`README.md`](README.md) first for the shared house style.

---

## Purpose (one sentence)

Show Hinduism's generous premise, **not one practice but four roads up the same
mountain**, matched to four human temperaments.

## The idea to communicate

From the prose: *"Because Hinduism assumes people are built differently, it offers
not one practice but several roads up the same mountain, the classical four
yogas."* And the closing: *"there is no single correct temperament for the
spiritual life. The scholar, the servant, the lover, and the meditator are all
going somewhere."*

The four paths, each = a path + a temperament + an essence:
1. **Bhakti**, the path of **devotion**, the *lover*, love directed at a chosen
   form of God (the most widely walked).
2. **Karma**, the path of **action**, the *servant*, duty done fully, released
   from its results; work as offering.
3. **Jnana**, the path of **knowledge**, the *scholar*, disciplined inquiry
   that sees through Maya to the identity of self and absolute.
4. **Raja**, the path of **meditation**, the *meditator*, systematic stilling
   of the mind.

The load-bearing idea: **four routes, one summit**, plurality by design, not
compromise.

## The photo (the "window")

- **Subject:** one image evoking *path/practice* rather than any single deity,
  worn temple steps climbing, a pilgrim path, hands in a devotional gesture
  (bhakti), or a figure meditating in silhouette. A path/steps image best
  literalises "roads up the mountain."
- **Placement:** as a header window across the top, *or* embedded at the centre
  of the 2×2 as the shared summit the four surround.
- **Treatment:** orange duotone, shadows to `bg`, grain ~4%.
- Sourcing: "Hinduism · The Four Paths" lens set in
  [`photo-picker.html`](photo-picker.html).

## Composition: four roads, one summit

```
┌──────────────────────────────┐
│  PRACTICE · HINDUISM          │  ← kicker orange
│  The Four Paths               │  ← serif title
│                               │
│  ┌──────────┐  ┌──────────┐   │  ← 2×2 grid of path cards
│  │ BHAKTI   │  │ KARMA    │   │     each card: path name (serif) ·
│  │ devotion │  │ action   │   │     temperament chip (the lover / servant /
│  │ the lover│  │ servant  │   │     scholar / meditator) · one essence line
│  └──────────┘  └──────────┘   │
│  ┌──────────┐  ┌──────────┐   │
│  │ JNANA    │  │ RAJA     │   │
│  │ knowledge│  │ meditation│  │
│  │ scholar  │  │ meditator│   │
│  └──────────┘  └──────────┘   │
│        ▲  one summit  ▲       │  ← four thin lines converge to a single
│         ( PHOTO/peak )        │     point/photo below the grid: same goal
│  Source · review status       │
└──────────────────────────────┘
```

Four equal cards (no path ranked above another, though a small note may say
bhakti is "the most widely walked"), with four convergence lines meeting at one
point: **the summit**. The convergence is the argument.

## Type

- Kicker: `PRACTICE · HINDUISM`, sans orange, `+0.22em`.
- Title: `The Four Paths`, serif 500, `#fff7ed`.
- Path names: serif 500, 24px, `#fff7ed`; the Sanskrit name may take a small
  `#fb923c` accent.
- Path descriptor (`devotion` / `action` / `knowledge` / `meditation`): sans 500,
  14px, UPPERCASE `+0.14em`, `#fb923c`.
- Temperament (`the lover`, etc.): serif italic 400, `#c9a48a`.

## Iconography

The **om** as a low-opacity watermark behind the summit point, or small beside
the kicker. One symbol only. Do not add four different deity marks to the cards.

## Piece-specific don'ts

- Don't rank the four as a hierarchy/ladder, they are parallel roads. Equal
  cards, converging (not ascending steps).
- Don't assign a different colour to each path, one ember. Distinguish by label
  and position, per accessibility.
- Don't depict a specific named deity as if representative of the whole.

## Accessibility & alt text

Four cards differ by label, not hue. Convergence lines must not drop text contrast
below 4.5:1. Ship:

> Alt: "A two-by-two grid of the four classical Hindu paths, Bhakti (devotion,
> the lover), Karma (action, the servant), Jnana (knowledge, the scholar) and
> Raja (meditation, the meditator), with four lines converging to a single point
> below, over a photograph of a climbing path. It illustrates four routes up one
> mountain, matched to different temperaments."

Deliverables: per README §7.
