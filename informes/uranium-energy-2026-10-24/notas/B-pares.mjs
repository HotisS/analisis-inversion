// B: extrae ingresos y resultado operativo anuales de companyfacts (SEC) de los comparables de uranio.
import { readFileSync, existsSync } from 'node:fs';
const dir = process.argv[2];
const empresas = { CCJ: 1009001, UUUU: 1385849, URG: 1375205, EU: 1500881, DNN: 1063259, NXE: 1698535, UEC: 1334933 };
const conceptos = {
  ingresos: ['Revenue', 'Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'RevenueFromContractsWithCustomers'],
  ebit: ['OperatingIncomeLoss', 'ProfitLossFromOperatingActivities'],
  neto: ['NetIncomeLoss', 'ProfitLoss', 'ProfitLossAttributableToOwnersOfParent'],
  acciones: ['EntityCommonStockSharesOutstanding'],
};
for (const [t, cik] of Object.entries(empresas)) {
  const f = `${dir}/B-cf-${t}.json`;
  if (!existsSync(f)) { console.log(t, 'sin archivo'); continue; }
  const d = JSON.parse(readFileSync(f, 'utf8'));
  const out = {};
  for (const [campo, lista] of Object.entries(conceptos)) {
    for (const tax of ['us-gaap', 'ifrs-full', 'dei']) {
      for (const c of lista) {
        const u = d.facts?.[tax]?.[c]?.units; if (!u) continue;
        const [moneda, vals] = Object.entries(u)[0];
        const anuales = vals.filter(v => (campo === 'acciones' ? true : (v.form || '').match(/10-K|40-F|20-F/)) && (campo === 'acciones' ? true : (v.fp === 'FY' && v.start && (new Date(v.end) - new Date(v.start)) > 300 * 864e5)));
        const porFin = {};
        for (const v of anuales) porFin[v.end] = v;
        const ult = Object.keys(porFin).sort().slice(-3).map(k => `${k}:${(porFin[k].val / (campo === 'acciones' ? 1e6 : 1e6)).toFixed(1)}`);
        if (ult.length) { out[campo] = `${tax}:${c} [${moneda}] ${ult.join(' | ')}`; break; }
      }
      if (out[campo]) break;
    }
  }
  console.log(t, JSON.stringify(out, null, 1));
}
