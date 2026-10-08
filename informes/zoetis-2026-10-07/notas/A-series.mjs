import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const f = JSON.parse(fs.readFileSync(path.join(dir, 'docs', 'A-facts.json'), 'utf8'));
const g = f.facts['us-gaap'];
const want = process.argv.slice(2);
const mode = want[0] === '--q' ? 'q' : 'a';
const names = mode === 'q' ? want.slice(1) : want;
for (const n of names) {
  const c = g[n];
  if (!c) { console.log(n, 'NO'); continue; }
  const u = Object.values(c.units)[0];
  const out = {};
  for (const x of u) {
    if (!x.frame) continue;
    if (mode === 'a') {
      if (/^CY\d{4}$/.test(x.frame) || /^CY\d{4}Q4I$/.test(x.frame)) out[x.frame.slice(2, 6)] = x.val;
    } else {
      if (/^CY\d{4}Q\dI?$/.test(x.frame)) out[x.frame.slice(2)] = x.val;
    }
  }
  const keys = Object.keys(out).sort().filter(k => k >= (mode === 'a' ? '2014' : '2024Q2'));
  console.log(n.padEnd(60), keys.map(k => k + ':' + (Math.abs(out[k]) > 1000 ? Math.round(out[k] / 1e5) / 10 : out[k])).join(' '));
}
