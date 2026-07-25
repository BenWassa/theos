# Build Plan: Project Theos

_Companion to `religions-prd.md` and the `immersive_religions_alpha_v1.tsx` prototype._
_Status: proposed v1, Ben to approve before Phase 0._

---

## 0. The one decision that shapes everything

The PRD and the prototype disagree on the stack, and the plan hinges on reconciling them.

- **PRD says:** Astro (or plain HTML/CSS/JS). React is _"deliberately excluded from v1."_ Rationale: the bottleneck is Ben's ability to review and maintain, not AI's ability to generate. Content must be editable without touching code. Static output, zero-ops.
- **Prototype is:** a React + Tailwind + `lucide-react` single-file app, with all content hardcoded in a `TRADITIONS` object.

The prototype's own header comment resolves this: _"In a true production environment (like Astro), the TRADITIONS object below would be extracted into individual Markdown/JSON files."_ It was built in React only because it was authored in a single-file, React-only canvas.

**Recommendation: build in Astro. Treat the prototype as the reference design + interaction spec, not the codebase to extend.**

The prototype is genuinely valuable, it has already designed the visual language, the content-module system, and (importantly) an editorial governance model. We port those ideas into Astro; we do not port the runtime. This honors the PRD's #1 success driver: _maintainable by one non-coding person a year from now._

> **If Ben overrides this** and wants to keep React: the fallback is Astro with React islands (`@astrojs/react`) so the three content modules stay as `.tsx` but content still lives in Markdown/JSON. This preserves most of the plan below; only §4 (component form) changes. Everything about content, governance, sourcing, and phasing is stack-independent.

---

## 1. What the prototype already earned (keep this)

These are solved problems. Do not re-litigate them; carry them forward.

1. **Three content-module types**, routed by `contentType`:
   - `editorial` (third-person, serif, calm) → Origins, Beliefs, Symbols
   - `immersive-paraphrase` (second-person, full-bleed image, glass panel) → A Day, Practice
   - `attributed-quote` (first-person testimony, pull-quote) → Text, Tensions
2. **Editorial governance metadata** on every section: `sources[]`, `review_status`, `last_reviewed`. This is the seed of the sourcing discipline the PRD demands, extend it, don't discard it.
3. **The "Lived Lens" label** (`branch · occasion · location · period`). This is the honest-scoping mechanism that keeps immersive sections from over-claiming. Excellent; make it schema-required for immersive sections.
4. **Per-tradition disclaimer** shown on the hero. Keep.
5. **Accessibility baseline:** `prefers-reduced-motion` respected, focus rings with offsets, `sr-only` section headings, `loading="lazy"`, decorative images marked `aria-hidden`. Preserve all of it.
6. **The visual grammar:** serif display + sans meta, uppercase tracked labels, dark tradition-tinted backgrounds, parallax hero, scroll-reveal.

## 2. Gaps between prototype and PRD (this is the actual work)

| Gap | Prototype today | PRD requires |
|---|---|---|
| **Sections** | 2–3 per tradition | **All 7**, same order, every tradition |
| **Section 7, Tensions & Questions** | Missing entirely | Load-bearing; _"should not be trimmed"_ |
| **Content location** | Hardcoded JS object | Markdown + `meta.json` per tradition folder |
| **Sourcing integrity** | Content is composite/AI ("Composite description of standard Fajr…", `needs-practitioner-review`) | Every immersive section **traces to a real account**. Composites presented as authentic _"defeat the entire purpose."_ |
| **Theme tokens** | Tailwind class strings (`bg-stone-950`) hardcoded per tradition | Editable palette tokens in `meta.json` (also fixes a latent bug, see §4.3) |
| **Ambient audio** | None | Per-section ambient audio |
| **Imagery** | Hotlinked Unsplash URLs | Self-hosted, license-cleared, credited; must handle **aniconism** (Islam) |
| **Routing** | Hash router (`#islam`) | Real static routes (`/islam`) for SEO, sharing, back-button |

---

## 3. Target architecture (Astro)

```
theos/
├─ astro.config.mjs
├─ package.json
├─ src/
│  ├─ content/
│  │  ├─ config.ts                 # Zod schema = the enforced content contract
│  │  ├─ traditions/
│  │  │  ├─ christianity/
│  │  │  │  ├─ 01-origins.md
│  │  │  │  ├─ 02-beliefs.md
│  │  │  │  ├─ 03-a-day.md
│  │  │  │  ├─ 04-practice.md
│  │  │  │  ├─ 05-text.md
│  │  │  │  ├─ 06-symbols.md
│  │  │  │  └─ 07-tensions.md
│  │  │  ├─ islam/            (identical 7 files)
│  │  │  └─ hinduism/         (identical 7 files)
│  │  └─ meta/
│  │     ├─ christianity.json       # display name, palette, audio, hero, weight
│  │     ├─ islam.json
│  │     └─ hinduism.json
│  ├─ components/
│  │  ├─ modules/
│  │  │  ├─ EditorialModule.astro
│  │  │  ├─ ImmersiveModule.astro
│  │  │  └─ QuoteModule.astro
│  │  ├─ SectionMeta.astro          # sources + review badge
│  │  ├─ LensLabel.astro
│  │  ├─ Hero.astro
│  │  ├─ TraditionCard.astro
│  │  └─ SoundToggle.astro
│  ├─ layouts/
│  │  └─ TraditionLayout.astro
│  ├─ pages/
│  │  ├─ index.astro                # landing / index of traditions
│  │  ├─ [tradition].astro          # one static page per tradition
│  │  └─ dev/governance.astro       # dev-only editorial dashboard (§5.3)
│  ├─ scripts/
│  │  ├─ reveal.ts                  # tiny vanilla scroll-reveal fallback
│  │  └─ ambient.ts                 # ambient audio controller
│  └─ styles/
│     └─ tokens.css                 # maps meta palette → CSS variables
├─ public/
│  └─ assets/<tradition>/           # self-hosted images + audio + LICENSES.md
├─ scripts/
│  └─ check-sourcing.mjs            # build gate (§5.2)
└─ PLAN.md
```

**Add-a-tradition procedure (must stay this simple):** copy a `traditions/<slug>/` folder, copy one `meta/<slug>.json`, drop assets in `public/assets/<slug>/`, fill the slots. No component or config changes. This _is_ the scaling test.

### 3.1 Content schema (the contract): `src/content/config.ts`

```ts
import { defineCollection, z } from 'astro:content';

const source = z.object({
  id: z.string(),
  // Priority order from PRD §3: lived accounts first, scholarly last
  type: z.enum(['first-person','oral-history','documentary','sacred-text','scholarly']),
  text: z.string(),
  url: z.string().url().optional(),
});

const traditions = defineCollection({
  type: 'content', // markdown body = the section prose
  schema: z.object({
    section: z.enum(['origins','beliefs','a-day','practice','text','symbols','tensions']),
    title: z.string(),
    order: z.number().int().min(1).max(7),
    contentType: z.enum(['editorial','immersive-paraphrase','attributed-quote']),
    voice: z.enum(['first','second','third']),
    lens: z.object({
      branch: z.string(), occasion: z.string(),
      location: z.string(), period: z.string(),
    }).optional(),                       // required at build for immersive (see refine)
    attribution: z.string().optional(),  // required for attributed-quote
    image: z.object({ src: z.string(), alt: z.string(), credit: z.string() }).optional(),
    aniconic: z.boolean().default(false),// §7, geometric/typographic treatment instead of figure
    audio: z.string().optional(),
    sources: z.array(source).min(1),     // hard floor: no section ships sourceless
    review_status: z.enum(['draft','needs-practitioner-review','reviewed']),
    last_reviewed: z.string().optional(),
  }).refine(s => s.contentType !== 'immersive-paraphrase' || !!s.lens,
    { message: 'Immersive sections must declare a lived lens.' })
    .refine(s => s.contentType !== 'attributed-quote' || !!s.attribution,
    { message: 'Quote sections must name an attribution.' }),
});

const meta = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    weight: z.number(),                  // ordering on the index
    disclaimer: z.string(),
    palette: z.object({                  // CSS-variable values, editable by a non-coder
      bg: z.string(), text: z.string(), accent: z.string(),
      border: z.string(), gradientFrom: z.string(), gradientTo: z.string(),
    }),
    hero: z.object({ image: z.string(), alt: z.string(), credit: z.string() }),
    ambientAudio: z.string().optional(),
  }),
});

export const collections = { traditions, meta };
```

Zod runs at build time, so a malformed or sourceless section **fails the build** rather than shipping. The schema is the governance.

---

## 4. Component mapping (prototype → Astro)

| Prototype | Astro | Notes |
|---|---|---|
| `TRADITIONS` object | `src/content/**` | Data, not code |
| `EditorialModule` | `EditorialModule.astro` | Same layout, prose from MD body |
| `ImmersiveModule` | `ImmersiveModule.astro` | `<Image>` optimized; glass panel; honors `aniconic` |
| `QuoteModule` | `QuoteModule.astro` | Pull-quote + attribution |
| `EditorialMeta` | `SectionMeta.astro` | Sources + review badge |
| `LensLabel` | `LensLabel.astro` | Unchanged |
| `TraditionView` | `TraditionLayout.astro` + `[tradition].astro` | Real route |
| `LandingPage` | `index.astro` + `TraditionCard.astro` | Sorted by `weight` |
| `App` hash router | Astro file routing | Delete hash router |
| `useReducedMotion`/`useScrollReveal` | CSS + `scripts/reveal.ts` | §4.2 |

### 4.1 Section renderer

`[tradition].astro` loads the tradition's 7 entries, sorts by `order`, and switches on `contentType` to pick the module, identical dispatch logic to the prototype, now server-rendered to static HTML.

### 4.2 Immersion without React

- **Scroll-reveal:** CSS scroll-driven animations (`animation-timeline: view()`) as the primary path; a ~15-line `IntersectionObserver` in `reveal.ts` as the fallback for older browsers. Both gated behind `@media (prefers-reduced-motion: no-preference)`.
- **Parallax hero:** `position: sticky` + `transform` in pure CSS where possible; keep the prototype's rAF handler only if a CSS-only version can't match it.
- **No hydration.** Ship zero framework JS. The only client JS is `reveal.ts` and `ambient.ts`, both tiny and optional.

### 4.3 Theming = CSS variables (fixes a real bug)

The prototype stores themes as Tailwind class strings per tradition (`bg-stone-950`, `from-emerald-950`). This is a **latent bug**: Tailwind's JIT compiler purges classes it can't see as literal strings, so tokens assembled dynamically per tradition are fragile. It's also un-editable by a non-coder.

Fix: `meta.json` holds raw color values → `tokens.css` maps them to CSS custom properties (`--bg`, `--accent`, `--gradient-from`…) set on the tradition's root element. Components reference `var(--accent)`. Result: **adding a tradition's palette means editing six hex values in a JSON file**, no Tailwind knowledge, no purge risk.

---

## 5. Content governance & the sourcing pipeline

This is the part the PRD cares about most and the prototype only gestures at. _"Every immersive section traces to a real source."_

### 5.1 Sourcing rules (encoded, not aspirational)
- `sources` has a **minimum of 1** (schema-enforced). Immersive/quote sections should cite lived accounts (`first-person`, `oral-history`, `documentary`) per PRD priority order.
- Immersive sections must declare a **lens** (enforced), the honest scope of what this specific account represents.
- A `sources/<tradition>.md` bibliography per tradition, assembled **before** writing that tradition (PRD open question, resolve at Phase 0).

### 5.2 Build gate: `scripts/check-sourcing.mjs`
Run in CI and pre-deploy. It **fails the build** if, for any published tradition:
- an `immersive-paraphrase` or `attributed-quote` section has `review_status !== 'reviewed'`, or
- any section's newest source is a `scholarly` synthesis with no lived account behind an immersive claim.

This turns the prototype's `needs-practitioner-review` flag from decoration into a real gate. Today's prototype content ("Composite description…") would correctly **fail** this gate, which is the point.

### 5.3 Editorial dashboard: `/dev/governance`
A dev-only page listing every section across every tradition with its `review_status`, `last_reviewed`, and source types. This is Ben's cockpit for knowing what's real, what's placeholder, and what's blocking ship. Excluded from production build.

---

## 6. Design & immersion system (Phase 3 detail)

- **Typography:** self-hosted serif display + sans meta (subset, `font-display: swap`). One scale, shared across traditions.
- **Palette:** shared structural system; per-tradition tint via the CSS variables in §4.3. Answers PRD open question: **shared visual system + per-tradition palette**, not bespoke-per-tradition (bespoke breaks uniform-template scaling).
- **Ambient audio:** per-section loop referenced in frontmatter. **Off by default, user-toggled** (`SoundToggle`), browser autoplay policy forbids autoplay-with-sound anyway, and default-off is the accessible/public-friendly choice. Provide transcripts/description for any recognizable spoken audio (adhan, chant). Licensing tracked in `public/assets/<tradition>/LICENSES.md`.
- **Imagery:** self-host everything (perf, offline, longevity, proper credit). Astro `<Image>` for responsive/optimized output.
- **Aniconism:** the `aniconic: true` flag makes a section render its "image" slot as geometric pattern / calligraphic / typographic treatment instead of figurative imagery, one template, honestly adapted, no bespoke Islam layout. Answers that PRD open question.

---

## 7. Phased build sequence (maps to PRD §5, made concrete)

Each phase ends in a working, deployable state.

### Phase 0: Lock the contract
- Finalize the 7-section template as the Zod schema (§3.1).
- Scaffold Astro project, hosting, CI, sourcing gate (empty), governance dashboard.
- Assemble the **Christianity source list** before writing prose.
- **Exit:** `npm run build` produces an empty-but-valid shell; schema rejects malformed content.

### Phase 1: Shell
- `index.astro` (index sorted by `weight`), `[tradition].astro`, `TraditionLayout`, all three modules, hero, nav, footer, ported from prototype, rendering placeholder content for Christianity's 7 sections.
- CSS-variable theming, scroll-reveal, reduced-motion.
- **Exit:** click from index → Christianity → all 7 section shells render at real URLs, keyboard-navigable.

### Phase 2: Christianity, end to end (reference implementation)
- Author all 7 sections in Markdown from the real source list. Section 7 (Tensions) gets first-class effort.
- Real sources on every section; drive `review_status` toward `reviewed`.
- **Exit:** reading Christianity produces the _"emotional shift"_ success test. Sourcing gate passes for Christianity.

### Phase 3: Design / art / audio pass
- Typography, self-hosted imagery, ambient audio + toggle, transition polish, aniconic treatment built and tested.
- Run the `impeccable`/`polish` design skills against the tradition page.
- **Exit:** Christianity feels finished, not scaffolded.

### Phase 4: Islam (the scaling gate) ⚠️
- Add Islam **using only the copy-folder-and-fill procedure.** Exercises aniconism for real.
- **GATE (from PRD):** if adding Islam requires touching a component, layout, or the schema, **stop and fix the template.** The template is the product; a template that needs edits per tradition has failed.
- **Exit:** Islam complete with zero structural code changes.

### Phase 5: Hinduism → ship v1
- Same procedure. Final cross-tradition QA: accessibility, performance budget, link check, sourcing gate green across all three.
- **Exit:** v1 live. Christianity + Islam + Hinduism.

### Phase 6+: Roadmap
- Buddhism, Judaism (content-fill only).
- Appendix section for smaller traditions, **resolve format at Phase 6 planning** (PRD open question: same 7 at lower depth vs. reduced set). Recommendation: reduced set (Origins, A Day, Text) to keep the appendix a genuine appendix.

---

## 8. Cross-cutting: quality, a11y, perf, ops

- **Accessibility:** carry the prototype's baseline; add real heading semantics, audio transcripts, verified contrast per palette, full keyboard path. Target WCAG 2.2 AA.
- **Performance:** static HTML, near-zero JS, optimized self-hosted media. Lighthouse budget as a CI check.
- **SEO/sharing:** per-tradition `<title>`, meta description, Open Graph image (the hero). Real URLs (already gained by dropping the hash router).
- **CI (per push):** `astro check` → build (Zod validation) → `check-sourcing.mjs` → link check → Lighthouse budget.
- **Hosting:** Netlify or Vercel, static output, auto-deploy on push to `main`. Zero-ops per PRD.
- **Dependencies:** minimize. Astro + a couple of integrations. No lib that requires babysitting to keep the site alive in a year.

---

## 9. Risks & open questions

| Item | Resolution in this plan |
|---|---|
| **React vs Astro** | Astro; prototype = design spec (§0). Ben can override to React islands. |
| **Sourcing integrity** (biggest content risk) | Schema floor + build gate + dashboard (§5). Current placeholder content will fail the gate by design. |
| **Ambient audio licensing** | Track per-asset in `LICENSES.md`; prefer CC/cleared sources; default-off playback (§6). Ben decides sourcing budget. |
| **Aniconism in a uniform template** | `aniconic` flag → non-figurative render path (§6). |
| **Art direction** | Shared system + per-tradition palette (§6). |
| **Appendix format** | Reduced 3-section set; decide at Phase 6 (§7). |
| **Working title / domain** | Prototype uses _"The Felt Sense"_; PRD title is _Project Theos_. **Ben to confirm** before Phase 3 (affects OG/meta). |
| **Template-scaling** | Enforced by the Phase 4 gate, not by hope. |

## 10. Definition of done: v1

1. Christianity, Islam, Hinduism, all 7 sections, each traceable to real sources, all `reviewed`.
2. Adding Islam and Hinduism required **zero** structural changes (proven at the Phase 4 gate).
3. Sourcing gate, a11y, and performance checks green in CI.
4. Static site deployed, zero-ops, editable by editing Markdown + JSON, no code.
5. Reading one tradition end to end lands the emotional shift, not just facts.

---

### Immediate next step
On approval: execute **Phase 0**, scaffold the Astro project, port the schema, stand up the (empty) sourcing gate and governance dashboard, and begin assembling the Christianity source list. Everything after is content-fill against a locked template.
