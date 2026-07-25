# Project Theos

> An immersive exploration of world religions. Sit inside each tradition long
> enough to get a felt sense of what it is like from within.

A static, content-first site built with [Astro](https://astro.build). No React,
no database, no accounts, just Markdown + JSON compiled to plain HTML, hostable
anywhere for free. Built to stay maintainable by one non-coding person.

**Read [`DECISIONS.md`](DECISIONS.md) first**, it's the short list of the choices
made and the ones that are yours. [`PLAN.md`](PLAN.md) has the full phased plan.

---

## Run it

```bash
npm install
npm run dev        # local dev at http://localhost:4321
npm run build      # sourcing gate (report) + static build → dist/
npm run preview    # serve the built dist/
npm run check      # astro type-check
npm run check:sourcing            # editorial/sourcing report
npm run check:sourcing -- --strict   # block if any narrative/testimony not reviewed
```

Requires Node 18+ (built and verified on Node 24).

---

## What's where

```
src/
  content.config.ts          # THE schema, the enforced content contract (Zod)
  content/
    traditions/<slug>/        # seven Markdown sections per tradition
      01-origins.md … 07-tensions.md
    meta/<slug>.json          # name, palette, symbol, disclaimer, audio
  data/symbols.ts             # generated symbol library (npm run gen:symbols)
  components/
    modules/                  # EditorialModule · ImmersiveModule · QuoteModule
    Backdrop, Hero, TraditionCard, SectionMeta, LensLabel, SoundToggle
  layouts/                    # BaseLayout · TraditionLayout
  pages/
    index.astro               # the tradition index
    [tradition].astro         # one static page per tradition
    governance.astro          # editorial-status dashboard  →  /governance
  styles/global.css           # the whole design system (tokens + modules)
scripts/check-sourcing.mjs    # the ship gate
public/                       # favicon, and assets/<slug>/ for real media later
```

## The content model

Every tradition is **seven sections in a fixed order**, the uniform template is
what makes adding a tradition a content exercise, not a redesign:

| # | Section | Module | Voice |
|---|---|---|---|
| 1 | Origins & Cosmology | editorial | third |
| 2 | Core Beliefs | editorial | third |
| 3 | A Day / A Life | immersive | second |
| 4 | Practice & Ritual | editorial | third |
| 5 | Sacred Text & Voice | quote | first |
| 6 | Symbols & Sensory World | editorial | third |
| 7 | Tensions & Questions | quote | first |

Each section's Markdown frontmatter carries its `contentType`, `sources` (min 1),
and `review_status`. The schema in `content.config.ts` validates all of it **at
build time**, a malformed or sourceless section fails the build.

## Editorial governance

Content honesty is enforced, not hoped for:

- **`/governance`**: a live dashboard of every section's sources and review status.
- **`npm run check:sourcing`**: reports status; `--strict` blocks a public build
  if any immersive/testimony section isn't `reviewed`.
- No section currently reads `reviewed`, the shipped narratives are honest
  *illustrative syntheses* awaiting practitioner review. See `DECISIONS.md` §A.3.

## Add a tradition (the whole procedure)

1. Copy any `src/content/traditions/<slug>/` folder; rename it (e.g. `buddhism`).
2. Fill the seven Markdown files.
3. Copy a `src/content/meta/<slug>.json`; set name, `weight`, `palette`, `pattern`,
   `disclaimer`.
4. (Optional) drop images/audio in `public/assets/<slug>/` and reference them.

No component, layout, or config changes. If a new tradition *needs* a code change,
the template is wrong, fix the template (PRD's Phase 4 gate).

## Deploy

Static output in `dist/`. Point Netlify, Vercel, or GitHub Pages at:
`npm run build` → publish `dist/`. Zero server, zero ops. Recommended: make the
public deploy run `check:sourcing -- --strict` so un-reviewed narratives can't ship.
