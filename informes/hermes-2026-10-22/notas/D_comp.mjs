// Comparables de Hermès (nota D, corte 2026-10-22, precio al cierre del 21-oct). Copiados de informes/moncler-2026-10-21/notas/D_comp.mjs
// (LVMH, Kering, Richemont, Prada, Cucinelli y Moncler) y de informes/lvmh-2026-10-21/notas/D_comp.mjs (L'Oréal, llevado al cierre del 21-oct de Euronext, 405,70).
// Origen: Estimaciones de MarketScreener leídas el 21-oct-2026
// (las de Hermès, Kering, Richemont, Prada y Cucinelli, en informes/lvmh-2026-10-21/notas/D_comp.mjs; las de LVMH, leídas aquí).
// Precio: cierre del 21-oct-2026 (Prada: 20-oct, último de Hong Kong), convertido a EUR con el BCE del 21-oct (CHF 0,9256; HKD 8,8155).
// LTM = ejercicio 2025 (Richemont: a mar-26); NTM = nov-26 a oct-27 ponderando los dos ejercicios estimados por los meses que caen dentro.
// EV = capitalización + deuda neta del último ejercicio publicado (definición de MarketScreener, con arrendamientos donde los incluye).
const C = [
  { n: 'LVMH', t: 'MC.PA', p: 'FR', px: 388.6, sh: 493099, l: { v: 80807, e: 25756, b: 17755, dn: 27567, fcf: 11333 }, a1: { v: 80474, e: 24017, b: 17249, bpa: 22.01 }, a2: { v: 84269, e: 25517, b: 18381, bpa: 23.94 }, w: 2 / 12, m: 22 },
  { n: 'Kering', t: 'KER.PA', p: 'FR', px: 216.25, sh: 122618, l: { v: 14675, e: 3675, b: 1631, dn: 8039, fcf: 2300 }, a1: { v: 14555, e: 3763, b: 1831, bpa: 5.035 }, a2: { v: 15456, e: 4144, b: 2278, bpa: 8.842 }, w: 2 / 12, m: 22 },
  { n: 'Richemont', t: 'CFR.SW', p: 'CH', px: 175.6 / 0.9256, sh: 588340, l: { v: 22420, e: 6101, b: 4492, dn: -8496, fcf: 3918 }, a1: { v: 25206, e: 7178, b: 5499, bpa: 7.45 }, a2: { v: 27200, e: 8047, b: 6298, bpa: 8.584 }, w: 5 / 12, m: 19 },
  { n: 'Prada', t: '1913.HK', p: 'IT', px: 39.46 / 8.8155, sh: 2558824, l: { v: 5718, e: 2139, b: 1324, dn: 3563, fcf: 1043 }, a1: { v: 6401, e: 2131, b: 1209, bpa: 0.2961 }, a2: { v: 6717, e: 2290, b: 1312, bpa: 0.3294 }, w: 2 / 12, m: 22 },
  { n: 'Brunello Cucinelli', t: 'BC.MI', p: 'IT', px: 85.18, sh: 68000, l: { v: 1408, e: 416.5, b: 235.9, dn: 983, fcf: 100.9 }, a1: { v: 1549, e: 462.6, b: 263.8, bpa: 2.272 }, a2: { v: 1720, e: 514.9, b: 298.5, bpa: 2.629 }, w: 2 / 12, m: 22 },
  { n: 'Moncler', t: 'MONC.MI', p: 'IT', px: 42.94, sh: 271598, l: { v: 3132, e: 1283, b: 913.4, dn: -1458, fcf: 529 }, a1: { v: 3236, e: 1302, b: 946.3, bpa: 2.352 }, a2: { v: 3466, e: 1419, b: 1024, bpa: 2.552 }, w: 2 / 12, m: 22 },
  { n: "L'Oréal", t: 'OR.PA', p: 'FR', px: 405.7, sh: 532387, l: { v: 44052, e: 10709, b: 8892, dn: 2051, fcf: 7167 }, a1: { v: 47035, e: 11358, b: 9595, bpa: 13.04 }, a2: { v: 50027, e: 12242, b: 10396, bpa: 14.53 }, w: 2 / 12, m: 22 },
];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const out = C.map((c) => {
  const cap = (c.px * c.sh) / 1000, ev = cap + c.l.dn, w = c.w, nt = (k) => w * c.a1[k] + (1 - w) * c.a2[k];
  return {
    nombre: c.n, ticker: c.t, pais: c.p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / c.l.v),
    ev_ebitda_ltm: r1(ev / c.l.e), ev_ebitda_ntm: r1(ev / nt('e')), per_ntm: r1(c.px / nt('bpa')),
    crecimiento_pct: r1((Math.pow(nt('v') / c.l.v, 12 / c.m) - 1) * 100), margen_ebitda_pct: r1((c.l.e / c.l.v) * 100),
    roic_pct: null, dn_ebitda: r2(c.l.dn / c.l.e), fcf_yield_pct: r1((c.l.fcf / cap) * 100),
    _ev_ebit_ntm: r1(ev / nt('b')),
  };
});
console.log(JSON.stringify(out, null, 1));
const med = (a) => { const s = [...a].sort((x, y) => x - y), k = s.length >> 1; return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; };
const p = out.filter((o) => !o.nombre.includes('ref.'));
console.error('mediana PER NTM', med(p.map((o) => o.per_ntm)), 'EV/EBITDA NTM', med(p.map((o) => o.ev_ebitda_ntm)), 'EV/EBIT NTM', med(p.map((o) => o._ev_ebit_ntm)));
