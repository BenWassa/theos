# PRD: Project Theos

**Working title:** Project Theos
**Owner:** Ben
**Status:** Draft v1
**Build model:** Solo, AI-assisted, evenings/weekends, no self-authored code

---

## 1. Purpose

A personal instrument for exploring faith and meaning.

The goal is to sit inside each major religious tradition long enough to get a **felt sense of what it is like from within**, not to assemble a comparative fact sheet. Structure exists to serve immersion, not the reverse.

**Primary user:** Ben.
**Secondary:** general public, curious learners. Public usability is a welcome byproduct, not a design driver.

### Success criteria
- Reading one tradition end to end produces an emotional shift, not just information gain
- Adding tradition #4 through #10 is a content-fill exercise, not a redesign
- The site remains maintainable by one non-coding person a year from now

### Explicit non-goals
- Not an academic reference or encyclopedia
- Not a conversion or apologetics tool for any tradition
- Not a host for Ben's own reflections. Personal process stays external
- Not a quiz/progress/gamified learning platform
- Not exhaustive coverage. Diminishing returns past ~10 traditions

---

## 2. Scope

### Launch (v1)
Three traditions, selected by historical influence:
1. Christianity
2. Islam
3. Hinduism

### Roadmap
4. Buddhism
5. Judaism

**Ceiling:** 5-10 major traditions. Beyond that, a single lightweight appendix section covering sects and smaller traditions at reduced depth.

### Depth model
One rigid template applied identically to every tradition. No bespoke sections per religion. Uniformity is the scaling mechanism and the comparison mechanism.

---

## 3. Content model

### Voice
Blended, assigned per section type. Not a single voice across the site.

| Voice | Used for |
|---|---|
| Second person ("You wake before dawn...") | Immersive narrative sections |
| First person (practitioner) | Testimony, lived accounts |
| Third person (neutral) | Cosmology, beliefs, historical framing |

### Sourcing
Weighted toward **lived and practitioner accounts** over academic sources. Priority order:
1. First-person accounts, memoirs, oral histories, documentary transcripts
2. Primary sacred texts (translated excerpts, short)
3. Scholarly/academic sources for factual scaffolding

**Constraint:** narrative sections must be grounded in real accounts. AI-generated composite experiences presented as authentic defeat the entire purpose. Every immersive section traces to a real source.

### The section template

Every tradition gets these seven sections, in this order:

| # | Section | Purpose | Voice |
|---|---|---|---|
| 1 | **Origins & Cosmology** | How this tradition explains why anything exists | Third |
| 2 | **Core Beliefs** | The load-bearing ideas, stated plainly | Third |
| 3 | **A Day / A Life** | Narrative walkthrough of practice through time: a fast day, a festival, a birth or death rite | Second |
| 4 | **Practice & Ritual** | What the body does, not only what the mind believes | Second / Third |
| 5 | **Sacred Text & Voice** | Short grounded excerpts, plus how practitioners describe engaging with them | First / excerpt |
| 6 | **Symbols & Sensory World** | Imagery, sound, color, architecture, motif | Third / visual |
| 7 | **Tensions & Questions** | Honest hard parts, doubts, internal debates | First |

**Note on Section 7:** this is where "felt sense" most often actually lives. A tradition presented without its internal tensions reads as brochure copy. This section is load-bearing for the core purpose and should not be trimmed for time.

### Content schema

Each tradition is a folder. Each section is a file with the same frontmatter shape across all traditions.

```
/content/
  /christianity/
    meta.json
    01-origins.md
    02-beliefs.md
    03-a-day.md
    04-practice.md
    05-text.md
    06-symbols.md
    07-tensions.md
    /assets/
  /islam/
    (identical structure)
  /hinduism/
    (identical structure)
```

`meta.json` holds: display name, color palette tokens, ambient audio reference, hero imagery, ordering weight.

**Add-a-tradition procedure:** copy folder, fill slots, add to index. No template or code changes.

---

## 4. Technical approach

### Guiding constraint
The bottleneck is Ben's capacity to **review, debug, and maintain**, not AI's capacity to generate code. Every technical choice optimizes for low long-term maintenance burden by a non-coder.

### Recommended stack
| Layer | Choice | Rationale |
|---|---|---|
| Framework | Astro (or plain HTML/CSS/JS) | Static output, content-first, minimal runtime complexity |
| Content | Markdown + JSON per tradition | Editable without touching code |
| Immersion | CSS scroll-driven animation, ambient audio per section, strong typography | Delivers "immersive" without 3D maintenance cost |
| Hosting | Netlify / Vercel / GitHub Pages | Free, zero-ops |
| Assets | Static images, short audio loops | No CMS, no database, no auth |

### Deliberately excluded from v1
- 3D / WebGL / game engine environments
- React or heavy client-side state management
- CMS, database, user accounts, progress tracking
- Anything requiring ongoing dependency upgrades to stay functional

**Rationale on immersion:** for this content, immersion comes from writing quality, pacing, sound, and transition design far more than from navigable 3D space. A scroll-based template also reuses trivially across traditions. A 3D scene does not.

---

## 5. Build sequence

| Phase | Deliverable |
|---|---|
| 0 | Lock section template and content schema |
| 1 | Build shell: navigation, one tradition landing, section scaffolding |
| 2 | Fill Christianity end to end as the reference implementation |
| 3 | Design/art pass, ambient audio, transitions |
| 4 | Islam (validates the template scales) |
| 5 | Hinduism, ship v1 |
| 6+ | Buddhism, Judaism, appendix section |

**Gate at Phase 4:** if adding Islam requires template changes, the template is wrong. Fix the template before continuing.

---

## 6. Open questions

- Working title / domain
- Art direction: shared visual system with per-tradition palette, or distinct treatment per tradition?
- Ambient audio: licensing approach for chants, calls to prayer, temple sound
- Handling of imagery restrictions (e.g. aniconism in Islamic tradition) within a uniform visual template
- Appendix section format for smaller traditions: same seven sections at lower depth, or a reduced set?
- Source list per tradition: needs assembling before Phase 2
