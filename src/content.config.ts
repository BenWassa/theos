import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================================================
// THE CONTENT CONTRACT
// ----------------------------------------------------------------------------
// This schema is the governance. Zod runs at build time, so a section that is
// malformed, sourceless, or missing its required scoping metadata FAILS the
// build rather than shipping. Adding a tradition means adding data that passes
// this contract — never editing code.
// ============================================================================

// PRD sourcing priority: lived accounts first, scholarly scaffolding last.
const source = z.object({
  id: z.string(),
  type: z.enum([
    'first-person', // memoir, testimony, direct account
    'oral-history',
    'documentary',
    'sacred-text', // primary scripture, translated excerpt
    'scholarly', // academic — factual scaffolding only
  ]),
  text: z.string(),
  url: z.string().url().optional(),
});

const traditions = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/traditions' }),
  schema: z
    .object({
      // Which of the seven fixed template slots this file fills.
      section: z.enum([
        'origins',
        'beliefs',
        'a-day',
        'practice',
        'text',
        'symbols',
        'tensions',
      ]),
      title: z.string(),
      order: z.number().int().min(1).max(7),

      // How the prose is rendered. Drives which module component is used.
      contentType: z.enum(['editorial', 'immersive-paraphrase', 'attributed-quote']),
      voice: z.enum(['first', 'second', 'third']),

      // The honest scope of an immersive account. Required for immersive sections
      // (enforced below). This is what keeps "You wake before dawn..." from
      // over-claiming to speak for an entire tradition.
      lens: z
        .object({
          branch: z.string(),
          occasion: z.string(),
          location: z.string(),
          period: z.string(),
        })
        .optional(),

      // Required for attributed-quote sections (enforced below).
      attribution: z.string().optional(),

      // Optional per-section figurative imagery. When absent, the generative
      // backdrop system renders a palette-driven atmosphere instead.
      image: z
        .object({
          src: z.string(),
          alt: z.string(),
          credit: z.string(),
        })
        .optional(),

      // When true, this section refuses figurative imagery and renders a
      // geometric / calligraphic / typographic treatment instead. One template,
      // honestly adapted (e.g. aniconism in Islam) — no bespoke per-tradition code.
      aniconic: z.boolean().default(false),

      // Optional ambient loop for this section (relative to /public).
      audio: z.string().optional(),

      // Governance. `sources` has a hard floor of one — no section ships
      // sourceless. `review_status` is the ship gate (see scripts/check-sourcing.mjs).
      sources: z.array(source).min(1),
      review_status: z.enum(['draft', 'needs-practitioner-review', 'reviewed']),
      last_reviewed: z.string().optional(),
    })
    .refine((s) => s.contentType !== 'immersive-paraphrase' || !!s.lens, {
      message: 'Immersive sections must declare a lived lens (branch/occasion/location/period).',
      path: ['lens'],
    })
    .refine((s) => s.contentType !== 'attributed-quote' || !!s.attribution, {
      message: 'Attributed-quote sections must name an attribution.',
      path: ['attribution'],
    }),
});

const meta = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/meta' }),
  schema: z.object({
    name: z.string(),
    weight: z.number(), // ordering on the index — lower shows first
    disclaimer: z.string(),

    // Palette tokens are raw CSS colour values, editable by a non-coder.
    // tokens.css maps these onto CSS custom properties per tradition.
    palette: z.object({
      bg: z.string(),
      surface: z.string(),
      text: z.string(),
      muted: z.string(),
      accent: z.string(),
      border: z.string(),
      gradientFrom: z.string(),
      gradientVia: z.string(),
      gradientTo: z.string(),
    }),

    // Generative backdrop character. 'geometric' honours aniconic traditions.
    pattern: z.enum(['rays', 'geometric', 'bloom']).default('rays'),

    hero: z.object({
      // Optional figurative hero. Absent → generative atmosphere.
      image: z.string().optional(),
      alt: z.string(),
      credit: z.string().optional(),
      kicker: z.string(), // small line above the title, e.g. "A living tradition"
    }),

    ambientAudio: z.string().optional(),
  }),
});

export const collections = { traditions, meta };
