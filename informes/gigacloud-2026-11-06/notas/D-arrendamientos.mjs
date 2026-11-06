// Subagente D (GigaCloud): pasivos por arrendamiento operativo de cada comparable (último balance en el XBRL de la SEC),
// para quitarlos de la deuda de Yahoo (totalDebt los incluye) y medir el valor empresa como el de GCT en US GAAP.
// Uso: NODE_USE_ENV_PROXY=1 node informes/gigacloud-2026-11-06/notas/D-arrendamientos.mjs W WSM ...
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
const UA = { 'User-Agent': 'AnalisisInversion research-bot admin@example.org' };
const dir = 'informes/gigacloud-2026-11-06/notas/docs/D-sec';
mkdirSync(dir, { recursive: true });
const tickers = JSON.parse(readFileSync(`${dir}/company_tickers.json`, 'utf8'));
const cikDe = (t) => Object.values(tickers).find((x) => x.ticker === t)?.cik_str;
const ultimo = (f, c) => {
  const u = f.facts['us-gaap']?.[c]?.units?.USD; if (!u) return null;
  const x = u.filter((e) => e.form?.startsWith('10-')).sort((a, b) => (a.end < b.end ? 1 : a.end > b.end ? -1 : a.filed < b.filed ? 1 : -1))[0];
  return x ? { v: x.val / 1e6, end: x.end, form: x.form } : null;
};
for (const t of process.argv.slice(2)) {
  const cik = String(cikDe(t)).padStart(10, '0');
  try {
    const r = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, { headers: UA });
    const f = await r.json();
    writeFileSync(`${dir}/${t}-companyfacts-resumen.json`, JSON.stringify({ cik, nombre: f.entityName }, null, 1));
    const out = { t, cik, nombre: f.entityName };
    for (const c of ['OperatingLeaseLiability', 'OperatingLeaseLiabilityCurrent', 'OperatingLeaseLiabilityNoncurrent', 'FinanceLeaseLiability', 'LongTermDebt', 'LongTermDebtNoncurrent', 'LongTermDebtCurrent', 'ConvertibleNotesPayable', 'ConvertibleDebtNoncurrent', 'LineOfCredit', 'CashAndCashEquivalentsAtCarryingValue', 'ShortTermInvestments'])
      out[c] = ultimo(f, c);
    console.log(JSON.stringify(out));
  } catch (e) { console.log(t, 'error', e.message); }
}
