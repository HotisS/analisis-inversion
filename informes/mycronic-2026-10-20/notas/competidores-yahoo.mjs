// Ingresos y margen operativo de los últimos 12 meses de competidores (Yahoo quoteSummary), corte 2026-10-20.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/mycronic-2026-10-20/notas/competidores-yahoo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const t = ['AMAT', 'NDSN', '0522.HK', 'BESI.AS', '6134.T', '098460.KQ', '6866.T', '6920.T', 'KLAC', 'PLAB'];
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary (financialData)', datos: {} };
for (const s of t) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=price,financialData`);
    const q = r.quoteSummary.result[0]; const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
    out.datos[s] = { nombre: q.price?.longName, divisa: q.financialData?.financialCurrency, ventas: v(q.financialData?.totalRevenue), margen_operativo: v(q.financialData?.operatingMargins), margen_ebitda: v(q.financialData?.ebitdaMargins), roe: v(q.financialData?.returnOnEquity), fcf: v(q.financialData?.freeCashflow) };
    console.log(s, JSON.stringify(out.datos[s]));
  } catch (e) { console.log(s, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'competidores-yahoo.json'), JSON.stringify(out, null, 1));
