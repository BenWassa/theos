# Decisions: Project Theos build

This is the single file to read. It records the judgment calls I made turning the
PRD + prototype into a working site, and the handful of calls that are yours.

Everything here was built to the PRD's vision. Where the PRD was explicit, I
followed it. Where it left a question open, I picked the option that best serves
the core goal, *a felt sense from within, maintainable by one non-coder*, and
flagged it below so you can override.

---

## A. Decisions I made (with how to change each)

### 1. Stack: Astro, not React
The PRD explicitly excludes React; the prototype was React only because of the
canvas it was drawn in. I rebuilt in **Astro** and treated the prototype as the
design/interaction spec. Result: static HTML, **zero framework JS** shipped (only
~2 KB of optional scroll-reveal + parallax that the site works fine without).
- **Kept from the prototype:** the three module types, the "Lived Lens" label,
  the sources + review-status governance, the accessibility baseline, the visual
  grammar.
- **Change it:** you'd have to reintroduce a framework. Not recommended, the
  whole maintainability bet rests on this.

### 2. No Tailwind: hand-written CSS + design tokens
The prototype stored each tradition's theme as Tailwind class strings
(`bg-emerald-950`). That is (a) not editable by a non-coder and (b) a latent bug:
Tailwind purges classes it can't see literally. I replaced it with plain scoped
CSS and **CSS custom properties fed from `meta.json`**.
- **Consequence:** changing a tradition's colours = editing six hex values in one
  JSON file. No build knowledge, no purge risk.
- **Change it:** swap values in `src/content/meta/<tradition>.json → palette`.

### 3. ⚠️ Content is honestly staged, not falsely "reviewed": the big one
The PRD's hardest rule: immersive sections must trace to real accounts, and
composites must **never** be presented as authentic. I am an AI; I cannot conduct
real practitioner interviews. So I did the honest thing the PRD's own governance
model implies:
- **Editorial/factual sections** (Origins, Beliefs, Practice, Symbols) cite real,
  verifiable primary sources (scripture with chapter/verse, documented practice)
  and are marked **`draft`**, accurate, but not yet human-reviewed.
- **Immersive & testimony sections** (A Day, Text, Tensions) are written as clearly
  labelled **illustrative syntheses** grounded in documented practice, each marked
  **`needs-practitioner-review`**, with a source note stating plainly that it must
  be replaced or verified by a real first-person account before it can ship.
- **Nothing is marked `reviewed`.** That is deliberate. The `/governance` dashboard
  and `npm run check:sourcing` tell the true story at all times.
- **To move content to `reviewed`:** replace/verify the narrative against a real
  sourced account, then set `review_status: reviewed` + `last_reviewed:` in that
  file's frontmatter. See §B.1, this needs you.

### 4. Imagery: colour gradients + a symbol emblem, not stock photos
The prototype hotlinked Unsplash. I dropped that (fragile, licensing, offline,
perf) in favour of **palette-driven colour gradients** per tradition. Immersion
here comes from writing, pacing, and typography, not photography.
- Texture patterns (`rays`/`geometric`/`bloom`) were built first, then **removed**
  so the tradition symbol (§4a) is the focus; only the colour gradient remains. The
  `pattern` field is left in the schema as dormant, optional plumbing.
- **The schema still supports real images** (`hero.image`, section `image`). Drop
  a licensed asset in `public/assets/<tradition>/`, reference it, done, no template
  change. See §B.2.

### 4a. Symbols: one consistent icon family, self-hosted
Each tradition shows its symbol as an accent-tinted watermark behind its card and
hero (cross, star-and-crescent, om). Source: **Font Awesome Free (solid), CC BY
4.0**, one cohesive style with broad coverage. Exact SVG paths are extracted at
build time into `src/data/symbols.ts` (`npm run gen:symbols`); the Font Awesome
runtime is a devDependency only and is **not** shipped. 17 symbols are in the
library already (Buddhism, Judaism, Sikhism, Taoism, Baháʼí, Shinto… ) so future
traditions are a one-line `symbol:` in their `meta.json`. Attribution: footer +
`CREDITS.md`. Symbols are non-figurative, so they sit within the aniconic approach.

### 5. Aniconism handled by a flag, not a bespoke Islam layout
`aniconic: true` on a section (and `pattern: "geometric"` on Islam's meta) forces
the non-figurative treatment. One template, honestly adapted. Islam's disclaimer
names the choice.

### 6. Ambient audio: fully built, no files shipped
`SoundToggle` exists, is **off by default**, user-initiated, reduced-motion aware,
and renders only when a tradition declares `ambientAudio`. No loops are included
(licensing is yours, see §B.3). Add a path to `meta.json → ambientAudio` to switch
it on for a tradition.

### 7. Real routes + deep links, hash router dropped
`/christianity` etc. are real static pages (SEO, sharing, back-button). Every
section also has an `id` (`#section-a-day`) for deep-linking.

### 8. Sourcing gate is report-by-default, strict-on-demand
`npm run build` runs the gate in **report** mode (exits 0) so you can develop and
preview while content is staged. `npm run check:sourcing -- --strict` **blocks**
if any narrative/testimony section isn't `reviewed`. Wire strict mode into your
public deploy once review is done.

### 9. Fonts: system stack, not web fonts
A refined system serif/sans stack, zero network requests, works offline forever.
Swapping in a licensed display serif is a one-file change in `global.css` (Phase 3
polish), deferred so nothing depends on a font CDN to stay alive.

### 10. Site title = "Project Theos"
I used the PRD's working title, not the prototype's "The Felt Sense". This is an
open question, see §B.4. Changing it: `src/pages/index.astro` + `BaseLayout` title.

### 11. The React prototype is kept as reference
`immersive_religions_alpha_v1.tsx` stays at the repo root as the design reference
but is excluded from type-checking and the build. Delete it whenever you like.

---

## B. Decisions that are yours (I did not guess these)

1. **Practitioner review / sourcing.** Nothing can honestly reach `reviewed`
   until a real person with standing in each tradition reads it, and the immersive
   narratives are ideally replaced with (or verified against) genuine first-person
   accounts. This is the one thing the build cannot manufacture. How do you want to
   run this, known practitioners, published memoirs/oral-history archives, a
   reviewer per tradition?

2. **Visual direction.** Keep the generative atmospheres, or commission/lice­nse
   real photography per tradition? The template supports either with no code change.
   - **Partially exercised (2026-07-24).** Rather than reverse the no-photography
     rule sitewide, a **bounded exception** is being scoped: nine commissioned
     educational infographics (three per tradition), each anchored by a *single*
     real photograph treated (duotone/grain) into its tradition's palette. The
     generative ember-room atmosphere is unchanged everywhere else. Commission
     briefs + a photo-sourcing tool live in `docs/infographics/`. Still yours to
     decide: whether to run the commission, and whether any photography goes
     beyond these nine windows.

3. **Ambient audio.** Do you want it, and if so what's the licensing approach for
   chant / call to prayer / temple sound? (Off and empty until you decide.)

4. **Title & domain.** "Project Theos" vs "The Felt Sense" vs something else. Locks
   OG tags and wordmark; worth deciding before any design polish pass.

5. **Is `/governance` public?** Right now it's a normal (buildable) page. Keep it
   public as an honesty feature, or gate it to internal-only?

6. **Ship gate policy.** Should a public production deploy be *blocked* on strict
   sourcing (recommended), or allowed to ship staged content with visible badges?

---

## C. Deliberately not done yet (future, per PRD roadmap)

- Buddhism, Judaism (pure content-fill, copy a folder, fill 7 files, add meta).
- Real practitioner-sourced narratives replacing the illustrative syntheses.
- Licensed display font + optional photography + ambient audio pass (Phase 3).
- CI wiring (astro check → strict sourcing gate → link check → Lighthouse budget).
- Appendix format for smaller traditions (decide at Phase 6).

See `PLAN.md` for the full phased plan and `README.md` for how to run and extend.
