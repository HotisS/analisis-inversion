import fs from 'fs';
const want = { D_cf_flir:['2020'], D_cf_ni:['2022'], D_cf_azpn:['2024','2025'], D_cf_altr:['2023','2024'] };
const tags = ['Revenues','RevenueFromContractWithCustomerExcludingAssessedTax','SalesRevenueNet','OperatingIncomeLoss','DepreciationDepletionAndAmortization','DepreciationAndAmortization','DepreciationAmortizationAndAccretionNet','AmortizationOfIntangibleAssets','Depreciation','LongTermDebt','LongTermDebtNoncurrent','LongTermDebtCurrent','DebtCurrent','ShortTermBorrowings','CashAndCashEquivalentsAtCarryingValue','ShortTermInvestments','MarketableSecuritiesCurrent'];
for (const [f, years] of Object.entries(want)) {
  const j = JSON.parse(fs.readFileSync(new URL('./docs/' + f + '.json', import.meta.url)));
  console.log('==', f, j.entityName);
  for (const t of tags) {
    const u = j.facts['us-gaap']?.[t]?.units?.USD; if (!u) continue;
    const rows = u.filter(r => (r.form === '10-K') && r.fp === 'FY');
    const pick = {};
    for (const r of rows) {
      const y = r.end.slice(0, 4);
      const dur = r.start ? (new Date(r.end) - new Date(r.start)) / 864e5 : 0;
      if (r.start && (dur < 350 || dur > 380)) continue;
      // año fiscal: para AspenTech (cierre 30-jun) se usa el año del fin
      if (years.includes(y)) pick[r.end] = r.val;
    }
    if (Object.keys(pick).length) console.log(' ', t, JSON.stringify(pick));
  }
}
