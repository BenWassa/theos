# Infographic 03: The Liturgical Year

**Tradition:** Christianity · **Ember:** Amber (`#f59e0b`)
**Sits within:** §4 Practice & Ritual
**Orientation:** **Landscape 1200 × 900** (this is a cycle/timeline, the one
Christianity piece that goes horizontal; see README §4)

> Read [`README.md`](README.md) first for the shared house style.

---

## Purpose (one sentence)

Show that Christian time is *shaped*, the year is walked, annually, through the
whole story from waiting to release, so a reader grasps the cycle at a glance.

## The idea to communicate

From the prose: *"The liturgical year walks the community through the whole story
annually: the waiting of Advent, the birth at Christmas, the fasting and
self-examination of Lent, the shock of Good Friday, the release of Easter… to
rehearse dying and rising every single year."*

Facts a reader should leave with:
1. The year is a **repeating cycle**, not a line, it returns.
2. The seasons in order: **Advent → Christmas → (Ordinary Time) → Lent → Good
   Friday → Easter → Pentecost → Ordinary Time**.
3. The emotional arc is **waiting → birth → fasting → death → resurrection**,
   dying and rising, rehearsed yearly.

## The photo (the "window")

- **Subject:** a single seasonal, material marker of the church year, an Advent
  candle/wreath, ash on a forehead (Lent), or Easter light. Choose **one**
  moment; do not try to photograph the whole cycle. The Advent wreath (candles
  in a ring) is ideal because it *is* itself a small circle of time.
- **Placement:** a contained circular or panel window at the centre of the cycle
  ring, or anchored left. In landscape, keep it to ~⅓ width so the cycle reads.
- **Treatment:** amber duotone, shadows to `bg`, grain ~4%.
- Sourcing: "Christianity · The Liturgical Year" lens set in
  [`photo-picker.html`](photo-picker.html).

## Composition: the cycle ring

```
        Christmas
    Advent   ·   Ordinary
  ·                     ·
Pentecost   ( PHOTO )   Lent
  ·                     ·
    Easter  ·  Good Friday
```

- A **ring of labelled nodes** running clockwise in liturgical order. Each node:
  a small dot (accent), the season name (serif), and a one-word mood
  (`waiting`, `birth`, `fasting`, `death`, `release`).
- Node **size or fill weight** encodes emotional intensity (Good Friday / Easter
  are the heaviest), but never colour *alone* (accessibility).
- The photo sits inside the ring, literally at the centre of the year.
- A subtle arrowhead on the ring makes the **return** explicit: it comes back to
  Advent.

## Type

- Kicker: `PRACTICE · CHRISTIANITY`, sans amber, `+0.22em`.
- Title: `The Liturgical Year`, serif 500, `#e7e5e4`.
- Node labels: serif 500, 18px, `#e7e5e4`; mood words sans 400, 12px, `#a8a29e`,
  UPPERCASE `+0.14em`.
- The two heaviest nodes (Good Friday, Easter) may set their label in `#f59e0b`.

## Iconography

The **cross** may sit small at the top of the ring (the year's hinge). Keep it a
single solid accent mark, not a watermark competing with the ring.

## Piece-specific don'ts

- Don't render it as a straight left-to-right timeline, the theological point is
  that it *returns*. It must read as a loop.
- Don't add month names or dates as a calendar grid, this is a felt cycle, not a
  planner (no infobox/spec-sheet feel).

## Accessibility & alt text

Encode intensity with size + label, never hue alone. Ensure node labels clear the
ring and the photo. Ship:

> Alt: "A ring diagram of the Christian liturgical year running clockwise through
> Advent, Christmas, Lent, Good Friday, Easter, Pentecost and Ordinary Time, with
> mood words from waiting to release. A seasonal photograph sits at the centre.
> An arrow shows the year returning to its start, rehearsing dying and rising
> each year."

Deliverables: per README §7 (note the landscape ratio in the export).
