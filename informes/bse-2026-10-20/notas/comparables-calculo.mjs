// Comparables de BSE desde las fichas de Yahoo (quoteSummary, 20-oct-2026) en notas/yahoo-comparables.json.
// Todo en millones de INR con el tipo de cambio de Yahoo del mismo día. NTM = media de los dos ejercicios del consenso
// ponderada por los meses que caen en los próximos 12 (corte 20-oct-2026).
// Uso: node comparables-calculo.mjs  → imprime la tabla y escribe notas/comparables.json
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const Y = JSON.parse(readFileSync(join(dir, 'yahoo-comparables.json'), 'utf8'));
const v = (o) => (o && typeof o === 'object' ? o.raw : o);
const fx = {
  INR: 1,
  USD: v(Y['USDINR=X'].regularMarketPrice),
  EUR: v(Y['EURINR=X'].regularMarketPrice),
  GBP: v(Y['GBPINR=X'].regularMarketPrice),
  GBp: v(Y['GBPINR=X'].regularMarketPrice) / 100,
  HKD: v(Y['HKDINR=X'].regularMarketPrice),
};
const corte = new Date('2026-10-20');
const lista = [
  ['NSE.BO', 'National Stock Exchange of India', 'IN'],
  ['MCX.NS', 'Multi Commodity Exchange of India', 'IN'],
  ['CDSL.NS', 'Central Depository Services (India)', 'IN'],
  ['CAMS.NS', 'Computer Age Management Services', 'IN'],
  ['CME', 'CME Group', 'US'],
  ['ICE', 'Intercontinental Exchange', 'US'],
  ['CBOE', 'Cboe Global Markets', 'US'],
  ['NDAQ', 'Nasdaq Inc.', 'US'],
  ['0388.HK', 'Hong Kong Exchanges and Clearing', 'HK'],
  ['DB1.DE', 'Deutsche Börse', 'DE'],
  ['LSEG.L', 'London Stock Exchange Group', 'GB'],
];
const out = [];
for (const [s, nombre, pais] of lista) {
  const r = Y[s];
  const p = r.price, f = r.financialData || {}, k = r.defaultKeyStatistics || {};
  const div = p.currency;
  const t = div === 'GBp' ? fx.GBP : fx[div];
  const precio = v(p.regularMarketPrice) / (div === 'GBp' ? 100 : 1); // LSEG: peniques → libras (el BPA del consenso va en libras)
  const acc = v(k.sharesOutstanding) || v(p.marketCap) / precio;
  const mcapLoc = v(p.marketCap) || (v(k.enterpriseValue) + (v(f.totalCash) || 0) - (v(f.totalDebt) || 0)); // MCX: Yahoo no da capitalización; se reconstruye desde su valor empresa
  const tr = (r.earningsTrend?.trend || []).filter((x) => x.period === '0y' || x.period === '+1y');
  const y0 = tr.find((x) => x.period === '0y'), y1 = tr.find((x) => x.period === '+1y');
  const fin0 = new Date(y0.endDate);
  const meses0 = Math.max(0, (fin0 - corte) / (1000 * 3600 * 24 * 30.44));
  const w0 = Math.min(1, meses0 / 12);
  const eps = (x) => v(x.earningsEstimate?.avg);
  const rev = (x) => v(x.revenueEstimate?.avg);
  const epsNtm = w0 * eps(y0) + (1 - w0) * eps(y1);
  const revNtm = w0 * rev(y0) + (1 - w0) * rev(y1);
  const revLtm = v(f.totalRevenue);
  const ebitdaLtm = v(f.ebitda);
  const deuda = v(f.totalDebt) || 0, caja = v(f.totalCash) || 0;
  const evLoc = mcapLoc + deuda - caja;
  const margen = ebitdaLtm / revLtm;
  const ebitdaNtm = margen * revNtm;
  const fcf = v(f.freeCashflow);
  // Cboe y Deutsche Börse: Yahoo da ingresos brutos LTM (con costes de transacción) y el consenso netos: crecimiento y NTM no comparables
  const bruto = ['CBOE', 'DB1.DE'].includes(s);
  const fila = {
    nombre, ticker: s, pais,
    capitalizacion: Math.round(mcapLoc * t / 1e6),
    ev_ventas: +(evLoc / revLtm).toFixed(2),
    ev_ebitda_ltm: +(evLoc / ebitdaLtm).toFixed(1),
    ev_ebitda_ntm: bruto ? null : +(evLoc / ebitdaNtm).toFixed(1),
    per_ntm: +(precio / epsNtm).toFixed(1),
    crecimiento_pct: bruto ? null : +((revNtm / revLtm - 1) * 100).toFixed(1),
    margen_ebitda_pct: +(margen * 100).toFixed(1),
    roic_pct: null,
    dn_ebitda: +((deuda - caja) / ebitdaLtm).toFixed(1),
    fcf_yield_pct: fcf ? +((fcf / mcapLoc) * 100).toFixed(1) : null,
    _divisa: div, _precio: precio, _eps_ntm: +epsNtm.toFixed(2), _w0: +w0.toFixed(2), _roe_pct: v(f.returnOnEquity) ? +(v(f.returnOnEquity) * 100).toFixed(1) : null,
  };
  out.push(fila);
  console.log(JSON.stringify(fila));
}
const pers = out.map((x) => x.per_ntm).sort((a, b) => a - b);
const med = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
console.log('mediana PER NTM', med, 'fx', fx);
writeFileSync(join(dir, 'comparables.json'), JSON.stringify({ fx, empresas: out, mediana_per_ntm: med }, null, 1));
