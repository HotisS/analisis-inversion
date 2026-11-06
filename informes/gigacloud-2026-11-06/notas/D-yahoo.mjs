// Subagente D: descarga quoteSummary de Yahoo para BKNG y comparables (consenso, estadísticas).
import { json } from '../../../herramientas/yahoo.mjs';
import { writeFileSync, mkdirSync } from 'node:fs';
const simbolos = process.argv.slice(2);
const mods = 'price,summaryDetail,defaultKeyStatistics,financialData,earningsTrend,recommendationTrend,calendarEvents,upgradeDowngradeHistory';
mkdirSync('informes/gigacloud-2026-11-06/notas/docs/D-yahoo', { recursive: true });
for (const s of simbolos) {
  try {
    const url = `https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${mods}`;
    const d = await json(url);
    writeFileSync(`informes/gigacloud-2026-11-06/notas/docs/D-yahoo/${s}.json`, JSON.stringify(d, null, 1));
    console.log(s, 'ok');
  } catch (e) { console.log(s, 'error', e.message); }
}
