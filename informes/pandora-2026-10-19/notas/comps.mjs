// Descarga de Yahoo quoteSummary (Pandora y comparables) para la nota D. Ejecutar con NODE_USE_ENV_PROXY=1.
import { json } from '../../../herramientas/yahoo.mjs';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const sims = process.argv.slice(2).length ? process.argv.slice(2) : ["PNDORA.CO","CFR.SW","SIG","UHR.SW","1929.HK","TITAN.NS","TPR","KER.PA","0590.HK","MC.PA"];
const mods = 'price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend,recommendationTrend,incomeStatementHistory';
const out = {};
for (const s of sims) {
  try {
    const r = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(s)}?modules=${mods}`);
    out[s] = r?.quoteSummary?.result?.[0] ?? r;
    console.log(s, 'ok');
  } catch (e) { console.log(s, 'error', e.message); }
}
fs.writeFileSync(path.join(dir, 'comparables-yahoo-raw.json'), JSON.stringify(out, null, 1));
