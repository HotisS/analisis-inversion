// Datos de balance y caja de Yahoo (financialData) para los comparables, corte 2026-10-21. Guarda notas/yahoo-extra.json.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/wallenius-2026-10-21/notas/yahoo-extra.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const tickers = ['WAWI.OL', 'HAUTO.OL', '086280.KS', '9101.T', '9104.T', '9107.T', 'HLAG.DE', 'MAERSK-B.CO', '1919.HK'];
const v = (o) => (o && typeof o === 'object' ? o.raw ?? null : o ?? null);
const out = { fecha: new Date().toISOString(), fuente: 'Yahoo Finance quoteSummary (financialData, price)', datos: {} };
for (const t of tickers) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(t)}?modules=financialData,price,defaultKeyStatistics`);
    const q = r.quoteSummary.result[0]; const f = q.financialData;
    out.datos[t] = { divisa_precio: q.price?.currency, divisa_cuentas: f?.financialCurrency, cap: v(q.price?.marketCap), caja: v(f?.totalCash), deuda: v(f?.totalDebt),
      ebitda: v(f?.ebitda), ventas: v(f?.totalRevenue), margen_ebitda: v(f?.ebitdaMargins), fcf: v(f?.freeCashflow), roe: v(f?.returnOnEquity), crec_ventas: v(f?.revenueGrowth), margen_operativo: v(f?.operatingMargins), roa: v(f?.returnOnAssets), bpa_ltm: v(q.defaultKeyStatistics?.trailingEps) };
    console.log(t, JSON.stringify(out.datos[t]));
  } catch (e) { console.log(t, 'ERROR', e.message); }
}
fs.writeFileSync(path.join(dir, 'yahoo-extra.json'), JSON.stringify(out, null, 1));
