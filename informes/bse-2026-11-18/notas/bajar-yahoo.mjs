// Baja de Yahoo (quoteSummary) las fichas de BSE y de sus comparables a la fecha de corte (18-nov-2026) y las deja en
// notas/yahoo-comparables.json. Uso: NODE_USE_ENV_PROXY=1 node informes/bse-2026-11-18/notas/bajar-yahoo.mjs
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { json } from '../../../herramientas/yahoo.mjs';
const dir = dirname(fileURLToPath(import.meta.url));
const simbolos = ['BSE.NS', 'NSE.BO', 'MCX.NS', 'CDSL.NS', 'CAMS.NS', 'CME', 'ICE', 'CBOE', 'NDAQ', '0388.HK', 'DB1.DE', 'LSEG.L',
  'USDINR=X', 'EURINR=X', 'GBPINR=X', 'HKDINR=X'];
const mod = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,calendarEvents';
const out = {};
for (const s of simbolos) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${mod}`);
    out[s] = r?.quoteSummary?.result?.[0] ?? null;
    console.log(s, out[s] ? 'ok' : 'vacío');
  } catch (e) { console.log(s, 'ERROR', e.message); out[s] = null; }
}
writeFileSync(join(dir, 'yahoo-comparables.json'), JSON.stringify(out, null, 1));
