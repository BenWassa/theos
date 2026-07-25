// The seven fixed template slots, in reading order. This is the same taxonomy
// the content schema enforces (see src/content.config.ts). Keeping the per-slot
// icon and reading measure here, keyed by the section enum, means a new
// tradition inherits section chrome for free; there is no per-tradition code.

import type { SymbolName } from './symbols';

export type SectionKey =
  | 'origins'
  | 'beliefs'
  | 'a-day'
  | 'practice'
  | 'text'
  | 'symbols'
  | 'tensions';

// One tradition-agnostic glyph per slot, drawn from the self-hosted library.
// These orient the eye and light up the reading rail, they are navigation,
// not decoration, so they stay semantic (a sun for "A Day", a book for the
// sacred text, a balance for the tensions).
export const SECTION_ICONS: Record<SectionKey, SymbolName> = {
  origins: 'seedling',
  beliefs: 'heart',
  'a-day': 'sun',
  practice: 'hands-praying',
  text: 'book-open',
  symbols: 'shapes',
  tensions: 'scale-balanced',
};

// Every voice shares one outer reading lane. Type size and treatment distinguish
// editorial, immersive, and quoted material without making the page jump between
// unrelated widths from chapter to chapter.
export const SECTION_MEASURE = 'var(--measure)';
