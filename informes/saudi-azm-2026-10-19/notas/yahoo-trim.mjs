// Serie trimestral de Yahoo para Saudi Azm (7211.SR): ventas, beneficio bruto, operativo y neto por trimestre.
import { json } from '../../../herramientas/yahoo.mjs';
const tipos = ['TotalRevenue', 'GrossProfit', 'OperatingIncome', 'NetIncomeCommonStockholders', 'EBITDA', 'DilutedEPS'].map((t) => 'quarterly' + t);
const p1 = Math.floor(Date.UTC(2023, 0, 1) / 1000), p2 = Math.floor(Date.now() / 1000);
const r = await json(`https://query2.finance.yahoo.com/ws/fundamentals-timeseries/v1/finance/timeseries/7211.SR?type=${tipos.join(',')}&period1=${p1}&period2=${p2}`);
const out = {};
for (const x of r.timeseries.result) { const k = x.meta.type[0]; out[k] = (x[k] || []).filter(Boolean).map((d) => [d.asOfDate, d.reportedValue?.raw]); }
console.log(JSON.stringify(out, null, 1));
