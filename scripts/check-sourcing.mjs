#!/usr/bin/env node
/**
 * Sourcing gate — Project Theos.
 *
 * The PRD's central content rule: every immersive/testimony section must trace
 * to a real account, and composites must never be presented as authentic.
 * This script is the enforcement.
 *
 * By default it REPORTS (exit 0) so the site can be developed and previewed
 * while content is still being sourced. In strict mode it BLOCKS (exit 1) if
 * any narrative ("immersive-paraphrase") or testimony ("attributed-quote")
 * section is not yet "reviewed".
 *
 *   node scripts/check-sourcing.mjs            # report only
 *   node scripts/check-sourcing.mjs --strict   # block public build
 *   THEOS_STRICT=1 node scripts/check-sourcing.mjs
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = join(root, 'src', 'content', 'traditions');
const strict = process.argv.includes('--strict') || process.env.THEOS_STRICT === '1';

const C = {
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  green: (s) => `\x1b[32m${s}\x1b[0m`,
  yellow: (s) => `\x1b[33m${s}\x1b[0m`,
  red: (s) => `\x1b[31m${s}\x1b[0m`,
  bold: (s) => `\x1b[1m${s}\x1b[0m`,
};

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (name.endsWith('.md')) out.push(full);
  }
  return out;
}

function frontmatter(text) {
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return m ? m[1] : '';
}

const field = (fm, key) => {
  const m = fm.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return m ? m[1].trim().replace(/^['"]|['"]$/g, '') : undefined;
};

let files;
try {
  files = walk(contentDir);
} catch {
  console.error(C.red(`Cannot read content directory: ${contentDir}`));
  process.exit(1);
}

const rows = [];
const problems = [];

for (const file of files) {
  const rel = relative(root, file);
  const fm = frontmatter(readFileSync(file, 'utf8'));
  const contentType = field(fm, 'contentType');
  const review = field(fm, 'review_status');
  const title = field(fm, 'title');
  const hasSources = /\n\s*sources:\s*\n\s*-/.test('\n' + fm);

  if (!contentType || !review) {
    problems.push(`${rel}: missing contentType or review_status`);
    continue;
  }
  if (!hasSources) {
    problems.push(`${rel}: no sources listed (schema also enforces min 1)`);
  }
  rows.push({ rel, title, contentType, review });
}

const counts = { reviewed: 0, 'needs-practitioner-review': 0, draft: 0 };
for (const r of rows) counts[r.review] = (counts[r.review] ?? 0) + 1;

const blocking = rows.filter(
  (r) => r.contentType !== 'editorial' && r.review !== 'reviewed'
);

console.log('');
console.log(C.bold('  Project Theos — sourcing gate'));
console.log(C.dim(`  ${rows.length} sections · ${strict ? 'STRICT' : 'report'} mode`));
console.log('');
console.log(`  ${C.green(counts.reviewed + ' reviewed')}   ` +
  `${C.yellow(counts['needs-practitioner-review'] + ' need review')}   ` +
  `${C.dim(counts.draft + ' draft')}`);
console.log('');

if (problems.length) {
  console.log(C.red('  Structural problems:'));
  for (const p of problems) console.log('   • ' + p);
  console.log('');
}

if (blocking.length) {
  console.log(C.yellow('  Narrative / testimony sections awaiting review:'));
  for (const r of blocking) {
    console.log(`   • ${C.dim(r.rel)} — ${r.title} (${r.contentType})`);
  }
  console.log('');
}

const hardFail = problems.length > 0;
const gateFail = strict && blocking.length > 0;

if (gateFail) {
  console.log(C.red(`  ✗ Public-ship gate FAILED: ${blocking.length} section(s) not reviewed.`));
  console.log('');
} else if (blocking.length) {
  console.log(C.dim('  Report only — pass --strict to block a public build on the above.'));
  console.log('');
} else if (!problems.length) {
  console.log(C.green('  ✓ All narrative/testimony sections reviewed.'));
  console.log('');
}

process.exit(hardFail || gateFail ? 1 : 0);
