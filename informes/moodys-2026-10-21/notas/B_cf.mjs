// B: ingresos y beneficio operativo anuales (10-K) desde companyfacts
import fs from 'fs';
for (const t of ['SPGI', 'VRSK', 'MORN', 'FDS']) {
  const j = JSON.parse(fs.readFileSync(new URL(`docs/B_cf_${t}.json`, import.meta.url), 'utf8'));
  const g = j.facts['us-gaap'];
  const out = {};
  for (const k of ['Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'OperatingIncomeLoss']) {
    const u = g[k]?.units?.USD || [];
    for (const f of u) {
      if (f.form !== '10-K' || f.fp !== 'FY' || !f.frame || f.frame.length !== 6) continue;
      (out[f.frame] ??= {})[k] = Math.round(f.val / 1e6);
    }
  }
  console.log(t, JSON.stringify(Object.fromEntries(Object.entries(out).filter(([y]) => y >= 'CY2021'))));
}
