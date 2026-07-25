# Product

## Register

brand

## Users

**Primary:** Ben, the sole author and maintainer, building this as a personal
instrument for exploring faith and meaning. He is a non-coder; every technical
and design decision is made to stay maintainable by one non-coding person a
year from now.

**Secondary:** general public, curious learners who land on a tradition page.
Public usability is a welcome byproduct, not a design driver, the site is not
optimized for acquisition, retention, or breadth of audience.

The context of use is unhurried, private reading, someone giving one
tradition their full attention end to end, not skimming for facts. `/governance`
serves a different, narrower audience: Ben himself (or a future reviewer)
checking sourcing status, not a public-facing experience.

## Product Purpose

A static, content-first site that lets a reader sit inside a religious
tradition long enough to get a **felt sense of what it is like from within**,
not a comparative fact sheet. Three traditions at launch (Christianity, Islam,
Hinduism), each walked through the same seven-section template: Origins &
Cosmology, Core Beliefs, A Day / A Life, Practice & Ritual, Sacred Text &
Voice, Symbols & Sensory World, Tensions & Questions.

Success looks like: reading one tradition end to end produces an emotional
shift, not just information gain. Adding tradition #4 through #10 is a
content-fill exercise, not a redesign. Section 7 (Tensions & Questions) is
explicitly load-bearing, a tradition presented without its internal doubts
reads as brochure copy, which is the one failure mode the whole project
exists to avoid.

Explicit non-goals: not an academic reference or encyclopedia, not a
conversion or apologetics tool for any tradition, not a host for Ben's own
reflections, not a quiz/progress/gamified learning platform, not exhaustive
(diminishing returns past ~10 traditions).

## Brand Personality

**Reverent and intimate.** Quiet, close, personal, like being let into
someone's private practice rather than shown a museum exhibit. Restraint over
spectacle: immersion comes from writing quality, pacing, typography, and
color, not photography, gamification, or 3D/game-engine environments (all
deliberately excluded from v1).

Voice is blended and assigned per section, not uniform across the site:
second person for immersive narrative ("You wake before dawn..."), first
person for testimony and sacred-text engagement, third person (neutral) for
cosmology, beliefs, and historical framing. The tonal throughline across all
three is honesty, the site tells the truth about what it doesn't know
(§ Anti-references, § Design Principles) rather than performing false
authority.

## Anti-references

- **Academic reference / encyclopedia feel** (Wikipedia infobox, comparative
  fact sheet). The PRD explicitly excludes this, structure exists to serve
  immersion, not taxonomy.
- **Gamified / quiz / progress-tracking platforms** (Duolingo-style streaks,
  XP, badges). Antithetical to unhurried, reverent reading.
- **Conversion or apologetics framing** for any tradition, nothing that reads
  as "come join us" or "here's why we're right."
- **Stock spiritual photography.** Hotlinked or licensed stock imagery of
  religious scenes reads as generic and was explicitly removed from the
  prototype in favor of palette-driven gradients and a single symbol emblem.
- **Spectacle for its own sake**: 3D/WebGL scenes, heavy client-side
  animation, anything that draws attention to the interface rather than the
  content. The build ships effectively zero framework JS on purpose.
- **False authority.** Presenting AI-synthesized narrative as an authentic
  first-person account, or marking anything `reviewed` before a real
  practitioner has actually reviewed it.

## Design Principles

1. **One template, honestly adapted.** Every tradition gets the identical
   seven-section structure and the same component set. If a tradition's
   needs (e.g. Islam's aniconism) require a bespoke layout, the template is
   wrong, fix the template, not the exception. Uniformity is both the
   scaling mechanism and the comparison mechanism.

2. **Show the seams, don't hide them.** Sourcing and review status are a
   visible, load-bearing part of the product (`/governance`,
   `check:sourcing`), not backstage tooling. Nothing reaches `reviewed`
   without being true. This honesty is a feature to design for, not an
   implementation detail to minimize.

3. **Immersion is earned by restraint, not decoration.** Color, typography,
   and pacing carry the emotional weight. No photography, no 3D, no
   animation that exists to impress rather than to serve the reading
   experience. Each tradition's palette (from its `meta.json`) is the
   primary differentiator between traditions, not bespoke layouts.

4. **Maintainable by one non-coder.** Every design decision must survive
   being operated by someone who edits JSON and Markdown, not code. Adding a
   tradition is copy-folder-and-fill, never a component or config change.

5. **Section 7 is not optional.** Tensions & Questions, the doubts, the
   internal debates, the hard parts, is where the felt sense actually
   lives. Design must give this section at least as much weight and care as
   the celebratory ones, never treat it as an appendix.

## Accessibility & Inclusion

WCAG 2.1 AA baseline: sufficient color contrast across all three dark,
palette-driven themes; full keyboard navigation; meaningful alt text on
imagery and generative visuals; `prefers-reduced-motion` respected everywhere
motion appears (already the standard for `SoundToggle` and should extend to
any scroll-driven or parallax effects). Ambient audio is opt-in and
user-initiated only, never autoplaying.
