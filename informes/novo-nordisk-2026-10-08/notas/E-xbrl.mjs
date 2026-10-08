// Subagente E: caja, deuda e ingresos de las objetivo (XBRL de la SEC) en el último periodo antes del anuncio.
// Uso: node E-xbrl.mjs <CIK> <fecha-anuncio AAAA-MM-DD>
const [cik, fecha] = process.argv.slice(2);
const r = await fetch(`https://data.sec.gov/api/xbrl/companyfacts/CIK${String(cik).padStart(10, '0')}.json`, { headers: { 'User-Agent': 'analisis-inversion research admin@example.com' } });
const j = await r.json();
console.log(j.entityName);
const conceptos = ['CashAndCashEquivalentsAtCarryingValue', 'ShortTermInvestments', 'MarketableSecuritiesCurrent', 'AvailableForSaleSecuritiesDebtSecuritiesCurrent', 'AvailableForSaleSecuritiesDebtSecuritiesNoncurrent', 'MarketableSecuritiesNoncurrent', 'LongTermDebt', 'LongTermDebtNoncurrent', 'ConvertibleNotesPayable', 'ConvertibleDebtNoncurrent', 'Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'OperatingIncomeLoss'];
for (const k of conceptos) {
  const u = j.facts['us-gaap']?.[k]?.units?.USD; if (!u) continue;
  const prev = u.filter(x => x.filed <= fecha);
  if (!prev.length) continue;
  const ultimoFin = prev.reduce((m, x) => (x.end > m ? x.end : m), '');
  const filas = prev.filter(x => x.end === ultimoFin);
  const anual = prev.filter(x => x.fp === 'FY' && x.form.startsWith('10-K') && x.start && (new Date(x.end) - new Date(x.start)) > 3e10).sort((a, b) => a.end < b.end ? 1 : -1)[0];
  for (const x of filas.slice(-2)) console.log(k, x.start || '', x.end, (x.val / 1e6).toFixed(1), x.form, x.accn, x.filed);
  if (anual) console.log('  anual', k, anual.end, (anual.val / 1e6).toFixed(1), anual.accn);
}
