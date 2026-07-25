// The seven fixed template slots, in reading order. This is the same taxonomy
// the content schema enforces (see src/content.config.ts). Keeping the per-slot
// icon and reading measure here — keyed by the section enum — means a new
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
// These orient the eye and light up the reading rail — they are navigation,
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

// The reading measure each content module caps itself to. The section header
// matches its slot's measure so its left edge lines up with the prose beneath.
export const SECTION_MEASURE: Record<SectionKey, string> = {
  origins: 'var(--measure)',
  beliefs: 'var(--measure)',
  'a-day': '46rem',
  practice: 'var(--measure)',
  text: '44rem',
  symbols: 'var(--measure)',
  tensions: '44rem',
};
