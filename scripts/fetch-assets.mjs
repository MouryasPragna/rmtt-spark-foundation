// Downloads every Lovable-hosted image referenced by src/assets/*.asset.json into
// public/images/assets/ and rewrites each pointer's `url` to a RELATIVE path
// ("images/assets/<file>") so it works under any base path (GitHub Pages or a domain).
// Usage: node scripts/fetch-assets.mjs https://<your-lovable-preview-host>
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const origin = (process.argv[2] || '').replace(/\/$/, '');
if (!/^https:\/\//.test(origin)) {
  console.error('Usage: node scripts/fetch-assets.mjs https://rmtt-website.lovable.app');
  process.exit(1);
}
const dir = 'src/assets';
const out = 'public/images/assets';
mkdirSync(out, { recursive: true });
let failed = 0;
for (const f of readdirSync(dir).filter((n) => n.endsWith('.asset.json'))) {
  const p = join(dir, f);
  const j = JSON.parse(readFileSync(p, 'utf8'));
  const name = j.original_filename;
  if (!name || /[\\/]/.test(name)) { console.error('skip bad name', f); failed++; continue; }
  const target = join(out, name);
  if (j.url.startsWith('/__l5e/')) {
    const res = await fetch(origin + j.url);
    if (!res.ok) { console.error('FAIL', res.status, j.url); failed++; continue; }
    writeFileSync(target, Buffer.from(await res.arrayBuffer()));
    j.url = `images/assets/${name}`;
    writeFileSync(p, JSON.stringify(j, null, 2) + '\n');
    console.log('ok', name);
  } else if (!existsSync(target)) {
    console.error('missing file for', f); failed++;
  }
}
console.log(failed ? `${failed} problem(s)` : 'all assets downloaded');
process.exit(failed ? 1 : 0);
