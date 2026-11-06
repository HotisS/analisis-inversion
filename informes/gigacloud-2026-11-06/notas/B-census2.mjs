// Total anual de 442 (tiendas de muebles y hogar) y 4541 (venta electrónica) por hoja del libro del Census.
import { readFileSync } from 'node:fs';
import { leerXlsx } from '../../../herramientas/xlsx-leer.mjs';
const buf = readFileSync(new URL('./docs/census-mrts-ventas.xlsx', import.meta.url));
for (let h = 1; h <= 40; h++) {
  let filas; try { filas = leerXlsx(buf, { hoja: h }); } catch { break; }
  const anio = String(filas[0]?.[0] ?? '').slice(-4);
  const cab = filas.find((f) => f.some((c) => /TOTAL/i.test(String(c))));
  const iTot = cab ? cab.findIndex((c) => /TOTAL/i.test(String(c))) : -1;
  const r = {};
  for (const f of filas) { const k = String(f[0] ?? '').trim(); if ((k === '442' || k === '4541' || k === '4421') && !(k in r)) r[k] = f[iTot]; }
  console.log(anio, 'col', iTot, JSON.stringify(r));
}
