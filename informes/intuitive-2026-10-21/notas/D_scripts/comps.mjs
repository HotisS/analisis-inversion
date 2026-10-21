// Lleva los comparables del 6-oct (informes/intuitive-2026-10-06/notas/D_scripts/comps_out.json) al cierre del 20-oct-2026:
// capitalización y valor empresa con la variación de precio (Yahoo), y los próximos 12 meses con el peso del ejercicio
// en curso al 20-oct. Mismos EBITDA (MarketScreener) y BPA no GAAP (S&P Global) que el 6-oct.
// node informes/intuitive-2026-10-21/notas/D_scripts/comps.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const C = JSON.parse(readFileSync('informes/intuitive-2026-10-06/notas/D_scripts/comps_out.json', 'utf8'));
const P = JSON.parse(readFileSync('informes/intuitive-2026-10-21/notas/D_scripts/precios.json', 'utf8'));
const nombres = { syk: ['Stryker', 'SYK'], bsx: ['Boston Scientific', 'BSX'], mdt: ['Medtronic', 'MDT'], abt: ['Abbott Laboratories', 'ABT'], ew: ['Edwards Lifesciences', 'EW'], dxcm: ['Dexcom', 'DXCM'], podd: ['Insulet', 'PODD'], idxx: ['IDEXX Laboratories', 'IDXX'], rmd: ['ResMed', 'RMD'], zbh: ['Zimmer Biomet', 'ZBH'] };
const pais = { mdt: 'IE' };
const sinSBC = new Set(['dxcm', 'podd']);
// meses que quedan del ejercicio en curso a 20-oct-2026 (cierre dic: 2,37; abril: 6,33; junio: 8,33)
const mesesRestantes = { 12: 2.37, 4: 6.33, 6: 8.33 };
const r = (x, d = 1) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const filas = [], control = [];
for (const [t, [nombre, ticker]] of Object.entries(nombres)) {
  const c = C[t];
  const p0 = P[ticker].serie['2026-10-06'], p1 = P[ticker].serie['2026-10-20'];
  if (Math.abs(p0 - c.precio) > 0.02) console.warn('precio del 6-oct distinto', t, p0, c.precio);
  const f = p1 / p0;
  const cap = c.cap * f, ev = c.ev + (cap - c.cap);
  const peso = mesesRestantes[c.fy_mes] / 12;
  const fy0 = c.fy_en_curso, fy1 = String(+fy0 + 1);
  const ventasNtm = peso * c.ventas_fy[fy0] + (1 - peso) * c.ventas_fy[fy1];
  let ebitdaNtm = peso * c.ebitda_fy[fy0] + (1 - peso) * c.ebitda_fy[fy1];
  const sbcPct = c.sa_ttm.sbc / c.ventas_ltm;
  let ebitdaLtm = c.ebitda_ltm;
  if (sinSBC.has(t)) { ebitdaLtm -= c.sa_ttm.sbc; ebitdaNtm -= sbcPct * ventasNtm; }
  const epsNtm = peso * c.eps_ng.eps0.v + (1 - peso) * c.eps_ng.eps1.v;
  const fila = {
    nombre, ticker, pais: pais[t] || 'US', capitalizacion: Math.round(cap), ev_ventas: r(ev / c.ventas_ltm, 2), ev_ebitda_ltm: r(ev / ebitdaLtm), ev_ebitda_ntm: r(ev / ebitdaNtm),
    per_ntm: r(p1 / epsNtm), crecimiento_pct: r((ventasNtm / c.ventas_ltm - 1) * 100), margen_ebitda_pct: null, roic_pct: r(c.roic_pct), dn_ebitda: r((c.ev - c.cap) / ebitdaLtm, 2), fcf_yield_pct: r(c.fcf_yield_pct / f),
  };
  // margen del último ejercicio cerrado: el mismo del 6-oct
  fila.margen_ebitda_pct = C[t].margen_ebitda_pct;
  if (sinSBC.has(t)) { const fyU = Object.keys(c.ebitda_fy)[0]; fila.margen_ebitda_pct = r((c.ebitda_fy[fyU] - sbcPct * c.ventas_fy[fyU]) / c.ventas_fy[fyU] * 100); }
  filas.push(fila);
  control.push({ t, p0, p1, var_pct: r((f - 1) * 100), cap: Math.round(cap), ev: Math.round(ev), peso: r(peso, 3), ventasNtm: Math.round(ventasNtm), ebitdaNtm: Math.round(ebitdaNtm), epsNtm: r(epsNtm, 2) });
}
writeFileSync('informes/intuitive-2026-10-21/notas/D_scripts/comps_filas.json', JSON.stringify({ filas, control }, null, 1));
console.table(filas.map(({ pais, nombre, ...x }) => x));
console.table(control);
const med = (a) => { const s = a.filter((x) => x != null).sort((x, y) => x - y); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
console.log('medianas: EV/EBITDA ltm', med(filas.map((x) => x.ev_ebitda_ltm)), 'ntm', med(filas.map((x) => x.ev_ebitda_ntm)), 'PER ntm', med(filas.map((x) => x.per_ntm)), 'EV/ventas', med(filas.map((x) => x.ev_ventas)));
