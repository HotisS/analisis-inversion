// Extrae ingresos y resultado operativo FY2025 de companyfacts (SEC) ya descargados en %TEMP%\analisis-inversion\novoB
import fs from 'node:fs';
import path from 'node:path';
const dir = path.join(process.env.TEMP, 'analisis-inversion', 'novoB');
const files = process.argv.slice(2);
const tags = ['Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'OperatingIncomeLoss', 'Revenue', 'ProfitLossFromOperatingActivities', 'RevenueFromContractsWithCustomers', 'CostsAndExpenses', 'ResearchAndDevelopmentExpense'];
for (const f of files) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f + '.json'), 'utf8'));
  console.log('##', f, j.entityName);
  for (const tax of Object.keys(j.facts)) {
    for (const t of tags) {
      const u = j.facts[tax][t]?.units;
      if (!u) continue;
      for (const [unit, arr] of Object.entries(u)) {
        const fy = arr.filter(x => (x.fp === 'FY') && x.end && x.end.startsWith('2025-12') && x.start && x.start.startsWith('2025-01') && /10-K|20-F/.test(x.form));
        const last = fy[fy.length - 1];
        if (last) console.log(tax, t, unit, last.val, last.form, last.filed, last.accn);
      }
    }
  }
}
