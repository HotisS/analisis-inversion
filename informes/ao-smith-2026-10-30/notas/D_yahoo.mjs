// Nota D: consenso de Yahoo (earningsTrend, recomendaciones, objetivos) de una lista de símbolos.
// Uso: NODE_USE_ENV_PROXY=1 node informes/ao-smith-2026-10-30/notas/D_yahoo.mjs AOS WTS ...
import { json } from '../../../herramientas/yahoo.mjs';
import { writeFileSync } from 'node:fs';
const BASE = 'https://query2.finance.yahoo.com';
const out = {};
for (const s of process.argv.slice(2)) {
  const r = await json(`${BASE}/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=earningsTrend,financialData,recommendationTrend,price,defaultKeyStatistics,summaryDetail,calendarEvents,upgradeDowngradeHistory`);
  out[s] = r?.quoteSummary?.result?.[0] || r;
}
writeFileSync(new URL('./docs/D_yahoo_consenso.json', import.meta.url), JSON.stringify(out, null, 1));
console.log('ok', Object.keys(out));
