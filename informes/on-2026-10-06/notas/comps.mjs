// Comparables de On a 6-oct-2026. Capitalización, valor empresa, ROIC y FCF yield: Stock Analysis (/statistics/,
// leído el 6-oct-2026, docs/D_sa_*_stats.txt). Ventas, EBITDA y BPA anuales reales y estimados: MarketScreener
// (/finances/, docs/D_ms_comps_finances.txt), el MISMO proveedor para los últimos y los próximos 12 meses.
// LTM y NTM = mezcla de ejercicios por meses (estimación propia, ver pesos). Divisas: BCE 6-oct-2026.
import { writeFileSync } from 'node:fs';
const EURCHF = 0.9359, EURUSD = 1.1269, EURJPY = 178.15;
const aCHF = { USD: EURCHF / EURUSD, EUR: EURCHF, JPY: EURCHF / EURJPY };
// fy: [ejercicio cerrado más reciente, en curso, siguiente] de MarketScreener; wl = peso del ejercicio cerrado en el LTM,
// wn = peso del ejercicio en curso en el NTM; finLtm = fin aproximado del LTM (último trimestre publicado).
const E = [
  { nombre: 'Deckers (HOKA, UGG)', ticker: 'DECK', pais: 'US', mon: 'USD', capL: 11160, evL: 10030, evMon: 'USD', acc: 136.18, roic: 90.59, fcfy: 10.24,
    fy: { ventas: [5472, 5879, 6303], ebitda: [1341, 1362, 1462], bpa: [7.02, 7.513, 8.351], dn: -1907 }, wl: 0.75, wn: 0.48, finLtm: '2026-06-30', nota: 'ejercicio a marzo: FY26 real, FY27-28e' },
  { nombre: 'Nike', ticker: 'NKE', pais: 'US', mon: 'USD', capL: 51120, evL: 53870, evMon: 'USD', acc: 1490, roic: 18.86, fcfy: 4.11,
    fy: { ventas: [46398, 43208, 43837], ebitda: [3558, 3251, 3845], bpa: [2.1, 1.29, 1.671], dn: 2006 }, wl: 0.75, wn: 0.65, finLtm: '2026-08-31', nota: 'ejercicio a mayo: FY26 real, FY27-28e' },
  { nombre: 'adidas', ticker: 'ADS', pais: 'DE', mon: 'EUR', capL: 24760, evL: 29570, evMon: 'EUR', acc: 173.98, roic: 14.75, fcfy: 7.83,
    fy: { ventas: [24811, 26936, 28881], ebitda: [3210, 3571, 4098], bpa: [7.51, 9.238, 11.62], dn: 3937 }, wl: 0.5, wn: 0.236, finLtm: '2026-06-30', nota: 'ejercicio natural' },
  { nombre: 'Asics', ticker: '7936', pais: 'JP', mon: 'JPY', capL: 2930000, evL: 2890000, evMon: 'JPY', acc: 683.91, roic: 41.84, fcfy: 3.61,
    fy: { ventas: [810916, 1034039, 1150371], ebitda: [168442, 226759, 250724], bpa: [138.1, 181.2, 210], dn: -13738 }, wl: 0.5, wn: 0.236, finLtm: '2026-06-30', nota: 'ejercicio natural' },
  { nombre: 'Lululemon', ticker: 'LULU', pais: 'US', mon: 'USD', capL: 10390, evL: 11140, evMon: 'USD', acc: 110.71, roic: 23.70, fcfy: 13.05,
    fy: { ventas: [11103, 10463, 10341], ebitda: [2707, 2044, 1855], bpa: [13.26, 9.63, 8.636], dn: -1807 }, wl: 0.5, wn: 0.32, finLtm: '2026-08-01', nota: 'ejercicio a enero: «2026» real (feb-25 a ene-26), «2027-2028»e' },
  { nombre: 'Amer Sports (Salomon, Arc\'teryx)', ticker: 'AS', pais: 'FI', mon: 'USD', capL: 16150, evL: 16530, evMon: 'USD', acc: 581.82, roic: 9.51, fcfy: 4.32,
    fy: { ventas: [6566, 8206, 9448], ebitda: [1151, 1606, 1878], bpa: [0.76, 1.239, 1.605], dn: 271 }, wl: 0.5, wn: 0.236, finLtm: '2026-06-30', nota: 'ejercicio natural' },
  { nombre: 'Birkenstock', ticker: 'BIRK', pais: 'DE', mon: 'EUR', capL: 6030, evL: 7440, evMon: 'USD', acc: 177.89, roic: 10.39, fcfy: 5.49, capMon: 'USD',
    fy: { ventas: [2097, 2349, 2672], ebitda: [667, 717.6, 821.3], bpa: [1.87, 1.777, 2.443], dn: 894 }, wl: 0.25, wn: 0.0, finLtm: '2026-06-30', nota: 'ejercicio a septiembre: FY25 real, FY26e (cerrado, sin publicar) y FY27e; cotiza en USD y presenta en EUR' },
];
const corte = new Date('2026-10-06');
const r1 = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const out = E.map((e) => {
  const capMon = e.capMon || e.mon;
  const cap = e.capL * aCHF[capMon];
  const evRep = e.evL * (e.evMon === e.mon ? 1 : aCHF[e.evMon] / aCHF[e.mon]); // EV en la divisa de las cuentas
  const ltm = (k) => e.wl * e.fy[k][0] + (1 - e.wl) * e.fy[k][1];
  const ntm = (k) => e.wn * e.fy[k][1] + (1 - e.wn) * e.fy[k][2];
  const precioRep = (e.capL / e.acc) * (capMon === e.mon ? 1 : aCHF[capMon] / aCHF[e.mon]);
  const anios = (corte - new Date(e.finLtm)) / 31557600000 + 1;
  return {
    nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: Math.round(cap),
    ev_ventas: r1(evRep / ltm('ventas'), 2), ev_ebitda_ltm: r1(evRep / ltm('ebitda')), ev_ebitda_ntm: r1(evRep / ntm('ebitda')),
    per_ntm: r1(precioRep / ntm('bpa')), crecimiento_pct: r1(((ntm('ventas') / ltm('ventas')) ** (1 / anios) - 1) * 100),
    margen_ebitda_pct: r1((100 * e.fy.ebitda[0]) / e.fy.ventas[0]), roic_pct: e.roic, dn_ebitda: r1(e.fy.dn / e.fy.ebitda[0]), fcf_yield_pct: e.fcfy,
    _nota: `${e.nota}; LTM = ${e.wl}·FYreal + ${r1(1 - e.wl, 2)}·FYcurso; NTM = ${e.wn}·FYcurso + ${r1(1 - e.wn, 2)}·FYsig.; cap. ${e.capL} M ${capMon}`,
  };
});
writeFileSync(new URL('./comps.json', import.meta.url), JSON.stringify(out, null, 1));
console.table(out.map(({ _nota, ...x }) => x));
