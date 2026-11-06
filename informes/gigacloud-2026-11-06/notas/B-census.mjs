// Lee el libro de ventas minoristas mensuales del Census (mrtssales92-present.xlsx): filas de muebles (442), no tienda (454/4541) y total.
import { readFileSync } from 'node:fs';
import { leerXlsx } from '../../../herramientas/xlsx-leer.mjs';
const buf = readFileSync(new URL('./docs/census-mrts-ventas.xlsx', import.meta.url));
for (let h = 1; h <= 8; h++) {
  let filas; try { filas = leerXlsx(buf, { hoja: h }); } catch { break; }
  const cab = filas.slice(0, 6).map((f) => f.join(' | ')).join(' / ');
  console.log(`\n### hoja ${h}: ${cab.slice(0, 200)}`);
  for (const f of filas) {
    const t = String(f[0] ?? '') + ' ' + String(f[1] ?? '');
    if (/^\s*(442|4541|454|444|Retail and food|NAICS)/.test(String(f[0] ?? '')) || /Furniture|Electronic shopping|Nonstore|TOTAL|^\s*CY|Kind of business/i.test(t)) {
      console.log(f.slice(0, 2).join(' | '), '||', f.slice(-14).join(' ; '));
    }
  }
}
