import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'docs');
const tags = ['Revenues','RevenueFromContractWithCustomerExcludingAssessedTax','SalesRevenueNet','OperatingIncomeLoss','Revenue','ProfitLossFromOperatingActivities','RevenueFromContractsWithCustomers','GrossProfit'];
for (const f of ['B_cf_nike','B_cf_crocs','B_cf_on','B_cf_birk','B_cf_skx']) {
  const j = JSON.parse(fs.readFileSync(path.join(dir, f + '.json'), 'utf8'));
  console.log('==', f, j.entityName);
  for (const tax of Object.keys(j.facts)) {
    for (const t of tags) {
      const c = j.facts[tax][t]; if (!c) continue;
      for (const [u, arr] of Object.entries(c.units)) {
        const ann = arr.filter(x => (x.form === '10-K' || x.form === '20-F') && x.fp === 'FY' && x.start && (new Date(x.end) - new Date(x.start)) > 300 * 864e5);
        const by = {};
        for (const x of ann) by[x.end] = x;
        const last = Object.values(by).sort((a, b) => a.end.localeCompare(b.end)).slice(-4);
        if (last.length) console.log(tax, t, u, last.map(x => `${x.end}:${(x.val / 1e6).toFixed(1)}(${x.form} ${x.filed})`).join(' | '));
      }
    }
  }
}
