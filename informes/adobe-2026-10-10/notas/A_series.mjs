// Extrae series anuales (FY2016-FY2025) y trimestrales de companyfacts de Adobe.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const cf = JSON.parse(readFileSync(join(dir, 'docs', 'A_companyfacts.json'), 'utf8'));
const g = cf.facts['us-gaap'];
const modo = process.argv[2] || 'anual';
const conceptos = process.argv.slice(3);
const dias = (a, b) => (new Date(b) - new Date(a)) / 864e5;
for (const c of conceptos) {
  const f = g[c]; if (!f) { console.log(c, 'NO'); continue; }
  const unidad = Object.keys(f.units)[0];
  const vals = f.units[unidad];
  const porFin = new Map();
  for (const v of vals) {
    if (modo === 'anual') {
      if (v.start && (dias(v.start, v.end) < 350 || dias(v.start, v.end) > 380)) continue;
      if (!v.form?.startsWith('10-K')) continue;
    } else {
      if (v.start && (dias(v.start, v.end) < 80 || dias(v.start, v.end) > 100)) continue;
      if (v.end < '2024-05-01') continue;
    }
    // último presentado gana
    const prev = porFin.get(v.end);
    if (!prev || v.filed > prev.filed) porFin.set(v.end, v);
  }
  const fil = [...porFin.values()].filter(v => v.end >= (modo === 'anual' ? '2015-11-01' : '2024-05-01')).sort((a, b) => a.end.localeCompare(b.end));
  const div = unidad === 'USD' ? 1e6 : (unidad === 'shares' ? 1e6 : 1);
  console.log(c, unidad, fil.map(v => `${v.end}:${+(v.val / div).toFixed(3)}`).join(' '));
}
