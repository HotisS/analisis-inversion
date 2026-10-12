// Extrae series anuales (y trimestrales) de companyfacts: para cada periodo, el valor de la presentación más reciente.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const cf = JSON.parse(readFileSync(join(dir, 'docs', 'A-companyfacts.json'), 'utf8'));
const g = cf.facts['us-gaap'];
const modo = process.argv[2] || 'anual'; // anual | inst | trim
const filtro = process.argv.slice(3);
const tags = filtro.length ? filtro : Object.keys(g);
for (const t of tags) {
  if (!g[t]) { console.log(t, 'NO'); continue; }
  const u = g[t].units.USD || g[t].units['USD/shares'] || g[t].units.shares || Object.values(g[t].units)[0];
  const por = {};
  for (const f of u) {
    let clave;
    if (modo === 'inst') { if (f.start) continue; if (!f.end.endsWith('12-31') && !f.end.endsWith('06-30') && !f.end.endsWith('03-31') && !f.end.endsWith('09-30')) continue; clave = f.end; }
    else {
      if (!f.start) continue;
      const d = (new Date(f.end) - new Date(f.start)) / 864e5;
      if (modo === 'anual' && (d < 350 || d > 380)) continue;
      if (modo === 'trim' && (d < 80 || d > 100)) continue;
      if (modo === 'semi' && (d < 170 || d > 190)) continue;
      clave = f.start + '_' + f.end;
    }
    if (clave < '2015') continue;
    if (!por[clave] || f.filed > por[clave].filed) por[clave] = f;
  }
  const ks = Object.keys(por).sort();
  if (!ks.length) continue;
  console.log('## ' + t);
  for (const k of ks) { const f = por[k]; console.log('  ' + k, (f.val / (Math.abs(f.val) > 1e5 ? 1e6 : 1)).toFixed(2), f.form, f.filed); }
}
