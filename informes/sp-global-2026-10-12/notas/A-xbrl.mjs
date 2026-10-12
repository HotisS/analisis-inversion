import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const f = JSON.parse(fs.readFileSync(path.join(dir, 'docs', 'companyfacts.json'), 'utf8'));
const g = f.facts['us-gaap'];
const modo = process.argv[2] || 'anual';
const tags = process.argv.slice(3);
for (const t of tags) {
  const x = g[t];
  if (!x) { console.log(t, 'NO'); continue; }
  const u = x.units.USD || x.units['USD/shares'] || x.units.shares || Object.values(x.units)[0];
  const out = {};
  for (const v of u) {
    const dur = v.start ? (new Date(v.end) - new Date(v.start)) / 864e5 : 0;
    if (modo === 'anual') {
      if (!/10-K/.test(v.form)) continue;
      if (v.start && (dur < 350 || dur > 380)) continue;
      const y = v.end.slice(0, 4);
      if (+y < 2018) continue;
      out[v.end] = out[v.end] || {};
      out[v.end][v.fy] = v.val; // valor según el 10-K de ese fy (última versión)
    } else {
      if (v.start && (dur < 80 || dur > 100)) continue;
      if (v.end < '2024-06-01') continue;
      out[v.end] = out[v.end] || {};
      out[v.end][v.form + v.fy + v.fp] = v.val;
    }
  }
  const s = Object.keys(out).sort().map(k => k + ':' + JSON.stringify(out[k])).join(' | ');
  console.log(t, '=>', s);
}
