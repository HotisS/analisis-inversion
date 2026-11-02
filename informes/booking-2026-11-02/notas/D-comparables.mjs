// Subagente D: múltiplos de comparables a 30-oct-2026 desde Yahoo quoteSummary (mismo proveedor para todos).
// Cambio BCE 30-oct-2026: 1 EUR = 1,1172 USD; 1 EUR = 7,4326 CNY → 1 USD = 6,6528 CNY.
import { readFileSync } from 'node:fs';
const v = (x) => (x && typeof x === 'object' ? (x.raw ?? null) : x ?? null);
const EURUSD = 1.1172, USDCNY = 7.4326 / 1.1172;
// fx: USD por unidad de divisa financiera; w1: peso del ejercicio en curso en los próximos 12 meses (nov-26 a oct-27)
const conf = {
  BKNG: { fx: 1, w1: 2 / 12 },
  EXPE: { fx: 1, w1: 2 / 12 },
  ABNB: { fx: 1, w1: 2 / 12 },
  TCOM: { fx: 1 / USDCNY, w1: 2 / 12 },
  MMYT: { fx: 1, w1: 5 / 12 },
  'EDR.MC': { fx: 1, w1: 5 / 12, precioEnEUR: true },
  'AMS.MC': { fx: 1, w1: 2 / 12, precioEnEUR: true },
  TRVG: { fx: EURUSD, w1: 2 / 12 },
};
const r1 = (x, d = 1) => (x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
for (const s of Object.keys(conf)) {
  const c = conf[s];
  const r = JSON.parse(readFileSync(`informes/booking-2026-11-02/notas/docs/D-yahoo/${s}.json`, 'utf8')).quoteSummary.result[0];
  const fd = r.financialData, p = r.price;
  // Todo a la divisa de las cuentas (fin) primero, luego a USD
  const fin = fd.financialCurrency;
  const cotiz = p.currency;
  // mcap en divisa de cotización → divisa de cuentas
  const cotizAFin = cotiz === fin ? 1 : (cotiz === 'USD' && fin === 'CNY') ? USDCNY : (cotiz === 'USD' && fin === 'EUR') ? 1 / EURUSD : null;
  const mcapFin = v(p.marketCap) * cotizAFin;
  const caja = v(fd.totalCash), deuda = v(fd.totalDebt), ebitda = v(fd.ebitda), ventas = v(fd.totalRevenue), fcf = v(fd.freeCashflow);
  const ev = mcapFin + deuda - caja;
  const t = r.earningsTrend.trend;
  const y0 = t.find((x) => x.period === '0y'), y1 = t.find((x) => x.period === '+1y');
  const epsNtm = c.w1 * v(y0.earningsEstimate.avg) + (1 - c.w1) * v(y1.earningsEstimate.avg);
  const revNtm = c.w1 * v(y0.revenueEstimate.avg) + (1 - c.w1) * v(y1.revenueEstimate.avg);
  const precioFin = v(p.regularMarketPrice) * cotizAFin;
  console.log(JSON.stringify({ s, cotiz, fin, mcapUSD: r1(mcapFin * (fin === 'USD' ? 1 : fin === 'EUR' ? EURUSD : 1 / USDCNY), 0), ev_ventas: r1(ev / ventas, 2), ev_ebitda_ltm: r1(ev / ebitda), per_ntm: r1(precioFin / epsNtm), epsNtm: r1(epsNtm, 3), crec: r1((revNtm / ventas - 1) * 100), margen: r1((ebitda / ventas) * 100), dn_ebitda: r1((deuda - caja) / ebitda, 2), fcf_yield: r1((fcf / mcapFin) * 100), ventasLTM: ventas, ebitdaLTM: ebitda, caja, deuda }));
}
