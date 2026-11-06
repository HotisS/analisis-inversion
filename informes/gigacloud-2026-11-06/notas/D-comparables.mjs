// Subagente D (GigaCloud): múltiplos de comparables desde Yahoo quoteSummary (mismo proveedor para todos),
// descargado el 6-nov-2026 con el cierre del 5-nov-2026. Todo en USD.
// NTM = nov-2026 a oct-2027: peso del ejercicio en curso (0y) según los meses que quedan de él en esos 12.
import { readFileSync } from 'node:fs';
const v = (x) => (x && typeof x === 'object' ? (x.raw ?? null) : x ?? null);
const r1 = (x, d = 1) => (x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const mesesRestantes = (fin) => { // meses desde nov-2026 hasta el fin del ejercicio 0y (incluido)
  const d = new Date(fin); return Math.max(0, Math.min(12, (d.getUTCFullYear() - 2026) * 12 + d.getUTCMonth() - 10 + 1));
};
for (const s of process.argv.slice(2)) {
  const r = JSON.parse(readFileSync(`informes/gigacloud-2026-11-06/notas/docs/D-yahoo/${s}.json`, 'utf8')).quoteSummary.result[0];
  const fd = r.financialData, p = r.price, ks = r.defaultKeyStatistics;
  const mcap = v(p.marketCap), caja = v(fd.totalCash), deuda = v(fd.totalDebt), ebitda = v(fd.ebitda), ventas = v(fd.totalRevenue), fcf = v(fd.freeCashflow);
  const ev = mcap + deuda - caja;
  const t = r.earningsTrend.trend;
  const y0 = t.find((x) => x.period === '0y'), y1 = t.find((x) => x.period === '+1y');
  const w1 = mesesRestantes(y0.endDate) / 12;
  const epsNtm = w1 * v(y0.earningsEstimate.avg) + (1 - w1) * v(y1.earningsEstimate.avg);
  const revNtm = w1 * v(y0.revenueEstimate.avg) + (1 - w1) * v(y1.revenueEstimate.avg);
  console.log(JSON.stringify({ s, nombre: p.longName, precio: v(p.regularMarketPrice), t: new Date(p.regularMarketTime * 1000).toISOString().slice(0, 10), fin0y: y0.endDate, w1: r1(w1, 2),
    mcap: r1(mcap / 1e6, 0), ev: r1(ev / 1e6, 0), ev_yahoo: r1(v(ks.enterpriseValue) / 1e6, 0), ev_ventas: r1(ev / ventas, 2), ev_ebitda_ltm: r1(ev / ebitda), per_ntm: r1(v(p.regularMarketPrice) / epsNtm),
    eps0: v(y0.earningsEstimate.avg), eps1: v(y1.earningsEstimate.avg), nEps: v(y1.earningsEstimate.numberOfAnalysts), epsNtm: r1(epsNtm, 3), revNtm: r1(revNtm / 1e6, 0),
    crec: r1((revNtm / ventas - 1) * 100), margen: r1((ebitda / ventas) * 100), dn_ebitda: r1((deuda - caja) / ebitda, 2), fcf_yield: r1((fcf / mcap) * 100),
    ventasLTM: r1(ventas / 1e6, 0), ebitdaLTM: r1(ebitda / 1e6, 0), caja: r1(caja / 1e6, 0), deuda: r1(deuda / 1e6, 0), roe: v(fd.returnOnEquity), roa: v(fd.returnOnAssets) }));
}
