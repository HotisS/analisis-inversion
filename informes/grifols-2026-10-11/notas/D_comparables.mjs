// Comparables de Grifols a 9-oct-2026 con datos de MarketScreener, Yahoo y BCE. Escribe D_comp.json
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const aqui = path.dirname(fileURLToPath(import.meta.url));
// EUR por unidad: 1 EUR = x divisa (BCE 9-oct-2026)
const fx = { EUR: 1, USD: 1.1206, JPY: 177.34, AUD: 1.6052, CNY: 7.4992, ILS: 3.4260 };
// f0 = último ejercicio cerrado, f1 y f2 = estimados. wL = peso de f0 en el LTM (resto f1); wN = peso de f1 en el NTM (resto f2)
const c = [
  { nombre: 'CSL', ticker: 'CSL.AX', pais: 'AU', precio: 183.84, divP: 'AUD', acc: 478.912, div: 'USD', nd: 9383, wL: 1, wN: 0.75,
    s: [15797, 15757, 16316], e: [4438, 5081, 5320], ni: [-2579, 2822, 3149], fcf: [2866, 3147, 2937], fy: 'jun' },
  { nombre: 'Takeda', ticker: '4502.T', pais: 'JP', precio: 5843, divP: 'JPY', acc: 1579.813, div: 'JPY', nd: 3817600, wL: 0.75, wN: 0.5,
    s: [4505700, 4701018, 4788104], e: [1129888, 1330941, 1427287], ni: [191800, 196495, 322724], fcf: [630531, 705277, 701177], fy: 'mar' },
  { nombre: 'ADMA Biologics', ticker: 'ADMA', pais: 'US', precio: 10.36, divP: 'USD', acc: 223.985, div: 'USD', nd: 67.82, wL: 0.5, wN: 0.25,
    s: [510.2, 535.3, 629.5], e: [231, 280.9, 345.4], ni: [146.9, 191.3, 222.7], fcf: [null, 101.9, 191.9], fy: 'dic' },
  { nombre: 'Shanghai RAAS', ticker: '002252.SZ', pais: 'CN', precio: 5.06, divP: 'CNY', acc: 6604.635, div: 'CNY', nd: 1798, wL: 1, wN: null,
    s: [7348, null, null], e: [1818, null, null], ni: [1577, null, null], fcf: [null, null, null], fy: 'dic' },
  { nombre: 'Hualan Biological', ticker: '002007.SZ', pais: 'CN', precio: 13.35, divP: 'CNY', acc: 1825.691, div: 'CNY', nd: -327, wL: 0.5, wN: 0.25,
    s: [4595, 4497, 4971], e: [1510, 1340, 1622], ni: [940.4, 884, 1147], fcf: [null, 141, null], fy: 'dic' },
  { nombre: 'Tiantan Biological', ticker: '600161.SS', pais: 'CN', precio: 12.73, divP: 'CNY', acc: 1977.371, div: 'CNY', nd: -1898, wL: 0.5, wN: 0.25,
    s: [6168, 6120, 6355], e: [2295, 1764, 1991], ni: [1091, 726.5, 1010], fcf: [null, null, null], fy: 'dic' },
  { nombre: 'Kamada', ticker: 'KMDA', pais: 'IL', precio: 8.08, divP: 'USD', acc: 57.682, div: 'ILS', nd: null, wL: 0.5, wN: 0.25,
    s: [555.7, 608.5, 685.4], e: [129.3, 151.9, 197.9], ni: [62.2, 83.39, 101.3], fcf: [48.63, 58.98, 89.15], fy: 'dic' }
];
const r = (x, d = 1) => x == null || !isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d;
const mix = (a, b, w) => a == null || b == null ? (w === 1 ? a : null) : a * w + b * (1 - w);
const out = c.map(x => {
  const capE = x.precio * x.acc / fx[x.divP];              // M EUR
  const toE = v => v == null ? null : v / fx[x.div];
  const ndE = toE(x.nd ?? 0);
  const ev = capE + ndE;
  const sL = toE(mix(x.s[0], x.s[1], x.wL)), eL = toE(mix(x.e[0], x.e[1], x.wL));
  const sN = x.wN == null ? null : toE(mix(x.s[1], x.s[2], x.wN)), eN = x.wN == null ? null : toE(mix(x.e[1], x.e[2], x.wN));
  const niN = x.wN == null ? null : toE(mix(x.ni[1], x.ni[2], x.wN));
  const fcfN = x.wN == null ? null : toE(mix(x.fcf[1], x.fcf[2], x.wN));
  const g = sN && sL ? (Math.pow(sN / sL, 12 / 15) - 1) * 100 : null;
  return {
    nombre: x.nombre, ticker: x.ticker, pais: x.pais, capitalizacion: Math.round(capE),
    ev_ventas: r(ev / sL, 2), ev_ebitda_ltm: r(ev / eL), ev_ebitda_ntm: eN ? r(ev / eN) : null, per_ntm: niN ? r(capE / niN) : null,
    crecimiento_pct: r(g), margen_ebitda_pct: r(x.e[0] / x.s[0] * 100), roic_pct: null,
    dn_ebitda: x.nd == null ? null : r(ndE / toE(x.e[0]), 1), fcf_yield_pct: fcfN ? r(fcfN / capE * 100) : null,
    _ev_meur: Math.round(ev), _ebitda_ltm_meur: Math.round(eL), _ebitda_ntm_meur: eN ? Math.round(eN) : null
  };
});
fs.writeFileSync(path.join(aqui, 'D_comp.json'), JSON.stringify(out, null, 2), 'utf8');
console.table(out);
