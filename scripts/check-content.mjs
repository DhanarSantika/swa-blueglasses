import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const content = await readFile(new URL('../src/content/site.ts', import.meta.url), 'utf8');
const required = [
  'Dhanar Santika',
  'SIKAP',
  'SIKARE',
  'Pilot',
  'In Development',
  'dhanar.santika@gmail.com',
  'www.blueglasses.xyz',
];
for (const value of required) assert.ok(content.includes(value), `Missing required public content: ${value}`);

const forbidden = ['Posyandu Wortel', 'SIKARE-PRD-v1.0.md', 'AGPLv3'];
for (const value of forbidden) assert.ok(!content.includes(value), `Forbidden content present: ${value}`);

async function filesUnder(path) {
  const entries = await readdir(path, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => {
    const fullPath = join(path, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  }));
  return nested.flat();
}

const publicFiles = await filesUnder(fileURLToPath(new URL('../public/', import.meta.url)));
assert.ok(!publicFiles.some((path) => /PRD|sikare|posyandu/i.test(path)), 'Internal project material must not be in public assets');

if (process.argv.includes('--dist')) {
  const dist = fileURLToPath(new URL('../dist/', import.meta.url));
  const builtFiles = await filesUnder(dist);
  const builtText = await Promise.all(builtFiles
    .filter((path) => /\.(html|json|xml|txt|js|css|svg)$/i.test(path))
    .map((path) => readFile(path, 'utf8')));
  const bundle = builtText.join('\n');
  for (const value of forbidden) assert.ok(!bundle.includes(value), `Forbidden content found in build: ${value}`);
  assert.ok(builtFiles.includes(join(dist, 'index.html')), 'English homepage missing from build');
  assert.ok(builtFiles.includes(join(dist, 'id/index.html')), 'Indonesian homepage missing from build');
}
console.log('Public content allowlist checks passed.');
