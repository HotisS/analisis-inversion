// Datos del backtest de calidad ampliada (28-oct-2026). Fuera del repo: se ejecuta en una carpeta de trabajo.
//   1) universo-todo.json [{tk, cik, sector, indice}] (S&P 500/400/600 de Wikipedia; CIK de la tabla o de sec.gov/files/company_tickers.json)
//   2) NODE_USE_ENV_PROXY=1 node <repo>/herramientas/bajar-datos-backtest.mjs   → sec/<cik>.json (conceptos útiles de los 10-K) y yh/<símbolo>.json
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const U = JSON.parse(readFileSync('universo-todo.json','utf8'));
const CONC = ['EarningsPerShareDiluted','EarningsPerShareBasic','OperatingIncomeLoss','StockholdersEquity','StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest','LongTermDebtNoncurrent','LongTermDebt','LongTermDebtCurrent','DebtCurrent','ShortTermBorrowings','CashAndCashEquivalentsAtCarryingValue','NetIncomeLoss','ProfitLoss','NetCashProvidedByUsedInOperatingActivities','PaymentsToAcquirePropertyPlantAndEquipment','Revenues','RevenueFromContractWithCustomerExcludingAssessedTax','SalesRevenueNet','RevenueFromContractWithCustomerIncludingAssessedTax','GrossProfit','CostOfRevenue','CostOfGoodsAndServicesSold','Assets','AssetsCurrent','LiabilitiesCurrent','Liabilities','RetainedEarningsAccumulatedDeficit','InterestExpense','InterestExpenseNonoperating','InterestExpenseDebt','InterestPaidNet','WeightedAverageNumberOfDilutedSharesOutstanding','WeightedAverageNumberOfSharesOutstandingBasic','Goodwill','ShareBasedCompensation','AllocatedShareBasedCompensationExpense','DepreciationDepletionAndAmortization','DepreciationAndAmortization','DepreciationAmortizationAndAccretionNet','IncomeTaxExpenseBenefit','IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest','IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments','PaymentsForRepurchaseOfCommonStock','PaymentsOfDividends','PaymentsOfDividendsCommonStock','OperatingLeaseLiability','IntangibleAssetsNetExcludingGoodwill','InventoryNet','AccountsReceivableNetCurrent'];
const UA = 'analisis-inversion h.solescoda@gmail.com';
const espera = (ms) => new Promise(r => setTimeout(r, ms));
async function get(url, ua) { for (let i = 0; i < 4; i++) { try { const r = await fetch(url, { headers: { 'User-Agent': ua, 'Accept-Encoding': 'gzip' } }); if (r.status === 404) return null; if (r.ok) return await r.json(); await espera(2000 * (i + 1)); } catch { await espera(2000 * (i + 1)); } } return null; }
let hechos = 0;
async function sec(u) {
  const f = `sec/${u.cik}.json`; if (existsSync(f)) return;
  const j = await get(`https://data.sec.gov/api/xbrl/companyfacts/CIK${u.cik}.json`, UA);
  const out = { cik: u.cik, nombre: j?.entityName, c: {} };
  for (const k of CONC) { const g = j?.facts?.['us-gaap']?.[k]; if (!g) continue;
    for (const [uni, arr] of Object.entries(g.units)) out.c[k] = { u: uni, f: arr.filter(x => /^10-K/.test(x.form)).map(x => [x.start || null, x.end, x.val, x.filed, x.fp, x.form]) }; }
  const so = j?.facts?.dei?.EntityCommonStockSharesOutstanding; if (so) out.c.dei_shares = { u: 'shares', f: Object.values(so.units)[0].filter(x => /^10-K/.test(x.form)).map(x => [null, x.end, x.val, x.filed, x.fp, x.form]) };
  writeFileSync(f, JSON.stringify(out));
}
async function yh(u) {
  const sim = u.tk.replace('.', '-'), f = `yh/${sim.replace(/[^\w.^-]/g, '_')}.json`; if (existsSync(f)) return;
  const j = await get(`https://query1.finance.yahoo.com/v8/finance/chart/${sim}?period1=1104537600&period2=${Math.floor(Date.now()/1000)}&interval=1d&events=div,split`, 'Mozilla/5.0');
  if (j) writeFileSync(f, JSON.stringify(j));
}
const cola = [...U]; for (const s of ['SPY','IJH','IJR']) cola.push({ tk: s, soloYh: true });
async function trab() { while (cola.length) { const u = cola.shift(); const t0 = Date.now(); if (!u.soloYh) await sec(u); await yh(u); hechos++; if (hechos % 100 === 0) console.log(hechos, new Date().toISOString()); const d = Date.now() - t0; if (d < 450) await espera(450 - d); } }
await Promise.all([trab(), trab(), trab()]);
console.log('fin', hechos);
