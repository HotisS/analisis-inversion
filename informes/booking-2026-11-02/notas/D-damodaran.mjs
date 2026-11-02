// Subagente D: lee betas.xls (xlsx) y ERPbymonth.xlsx de Damodaran.
import { readFileSync } from 'node:fs';
import { leerXlsx } from '../../../herramientas/xlsx-leer.mjs';
const d = 'informes/booking-2026-11-02/notas/docs/';
for (const h of [1, 2, 3]) {
  try {
    const f = leerXlsx(readFileSync(d + 'D-damodaran-betas.xlsx'), { hoja: h });
    for (const fila of f) if (/^(Industry Name|Retail \(Online|Hotel|Retail \(General|Retail \(Special|Total Market|Information Services|Software \(Internet)/.test(String(fila[0]))) console.log('betas h' + h, JSON.stringify(fila));
    for (const fila of f.slice(0, 9)) if (/Date|updated|January|July/i.test(JSON.stringify(fila))) console.log('cab', JSON.stringify(fila).slice(0, 200));
  } catch (e) { console.log('hoja', h, e.message); }
}
const e = leerXlsx(readFileSync(d + 'D-damodaran-erp.xlsx'), { hoja: 1 });
console.log(JSON.stringify(e[0])); console.log(JSON.stringify(e[1]));
for (const fila of e.slice(-4)) console.log(JSON.stringify(fila));
