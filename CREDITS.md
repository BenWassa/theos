# Credits & licenses

## Symbols
Religious symbols are from **[Font Awesome Free](https://fontawesome.com)** (solid
style), licensed under **[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)**.

Only the SVG path data for a curated set is used, extracted at build time into
`src/data/symbols.ts` by `scripts/gen-symbols.mjs`. The Font Awesome runtime is a
`devDependency` only and is **not** shipped in the built site. Regenerate or extend
the set with `npm run gen:symbols`.

Symbols currently available in the library: cross, star-and-crescent, om,
dharmachakra, star-of-david, khanda, yin-yang, menorah, bahai, ankh, hamsa, peace,
gopuram, torii-gate, kaaba, vihara, atom.

## Imagery
No third-party imagery is used. Per-tradition atmospheres are generated from CSS
gradients and inline SVG patterns driven by palette tokens (see `DECISIONS.md` §A.4).

## Fonts
System font stacks only; no third-party web fonts are bundled or fetched.
