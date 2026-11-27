// Comparables de LVMH (nota D, corte 2026-11-27). Precio: cierre del 26-nov-2026 (Yahoo, regularMarketPreviousClose leído el 27-nov; CHF y HKD al cambio de Yahoo del 26-nov).
// BPA de los dos ejercicios: consenso de Yahoo (earningsTrend) del 27-nov, posterior a los resultados de todos. Ventas, EBITDA y EBIT estimados y LTM: MarketScreener del 21-oct (sin cambio de perímetro).
// LTM = último ejercicio publicado; NTM = dic-26 a nov-27 ponderando los dos ejercicios estimados por los meses que caen dentro.
// EV = capitalización (último cierre × acciones del ejercicio en curso) + deuda neta del último ejercicio publicado.
// Crecimiento = NTM / LTM anualizado por los meses entre el final del LTM y el final del NTM (nov-27).
const C = [
  // nombre, ticker, pais, precio, acciones (miles), LTM {v,e,b,bpa,dn,fcf}, A1, A2, peso A1, meses LTM→NTM
  { n: 'Hermès', t: 'RMS.PA', p: 'FR', px: 1272.5, sh: 104742, l: { v: 16002, e: 7495, b: 6569, dn: -9893, fcf: 4213 }, a1: { v: 16681, e: 7538, b: 6680, bpa: 43.85 }, a2: { v: 17932, e: 8079, b: 7170, bpa: 47.83 }, w: 1 / 12, m: 23 },
  { n: 'Kering', t: 'KER.PA', p: 'FR', px: 177.9, sh: 122618, l: { v: 14675, e: 3675, b: 1631, dn: 8039, fcf: 2300 }, a1: { v: 14555, e: 3763, b: 1831, bpa: 6.044 }, a2: { v: 15456, e: 4144, b: 2278, bpa: 8.863 }, w: 1 / 12, m: 23 },
  { n: 'Richemont', t: 'CFR.SW', p: 'CH', px: 187.95, sh: 588340, l: { v: 22420, e: 6101, b: 4492, dn: -8496, fcf: 3918 }, a1: { v: 25206, e: 7178, b: 5499, bpa: 7.616 }, a2: { v: 27200, e: 8047, b: 6298, bpa: 8.7 }, w: 4 / 12, m: 20 },
  { n: 'Moncler', t: 'MONC.MI', p: 'IT', px: 40.31, sh: 271990, l: { v: 3132, e: 1283, b: 913.4, dn: -1458, fcf: 529 }, a1: { v: 3236, e: 1302, b: 946.3, bpa: 2.32 }, a2: { v: 3466, e: 1419, b: 1024, bpa: 2.5 }, w: 1 / 12, m: 23 },
  { n: 'Prada', t: '1913.HK', p: 'IT', px: 4.47, sh: 2558824, l: { v: 5718, e: 2139, b: 1324, dn: 3563, fcf: 1043 }, a1: { v: 6401, e: 2131, b: 1209, bpa: 0.2973 }, a2: { v: 6717, e: 2290, b: 1312, bpa: 0.3199 }, w: 1 / 12, m: 23 },
  { n: 'Brunello Cucinelli', t: 'BC.MI', p: 'IT', px: 88.88, sh: 68000, l: { v: 1408, e: 416.5, b: 235.9, dn: 983, fcf: 100.9 }, a1: { v: 1549, e: 462.6, b: 263.8, bpa: 2.28 }, a2: { v: 1720, e: 514.9, b: 298.5, bpa: 2.642 }, w: 1 / 12, m: 23 },
  { n: 'Pernod Ricard', t: 'RI.PA', p: 'FR', px: 70.94, sh: 251680, l: { v: 9404, e: 2836, b: 2423, dn: 10662, fcf: 1197 }, a1: { v: 9329, e: 2818, b: 2412, bpa: 5.663 }, a2: { v: 9517, e: 2903, b: 2493, bpa: 5.904 }, w: 7 / 12, m: 17 },
  { n: "L'Oréal", t: 'OR.PA', p: 'FR', px: 445.15, sh: 532387, l: { v: 44052, e: 10709, b: 8892, dn: 2051, fcf: 7167 }, a1: { v: 47035, e: 11358, b: 9595, bpa: 13.83 }, a2: { v: 50027, e: 12242, b: 10396, bpa: 15.27 }, w: 1 / 12, m: 23 },
];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const out = C.map((c) => {
  const cap = (c.px * c.sh) / 1000, ev = cap + c.l.dn, w = c.w, nt = (k) => w * c.a1[k] + (1 - w) * c.a2[k];
  return {
    nombre: c.n, ticker: c.t, pais: c.p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / c.l.v),
    ev_ebitda_ltm: r1(ev / c.l.e), ev_ebitda_ntm: r1(ev / nt('e')), per_ntm: r1(c.px / nt('bpa')),
    crecimiento_pct: r1((Math.pow(nt('v') / c.l.v, 12 / c.m) - 1) * 100), margen_ebitda_pct: r1((c.l.e / c.l.v) * 100),
    roic_pct: null, dn_ebitda: r2(c.l.dn / c.l.e), fcf_yield_pct: r1((c.l.fcf / cap) * 100),
    _ev_ebit_ltm: r1(ev / c.l.b), _ev_ebit_ntm: r1(ev / nt('b')), _margen_ebit: r1((c.l.b / c.l.v) * 100),
  };
});
console.log(JSON.stringify(out, null, 1));
const med = (a) => { const s = [...a].sort((x, y) => x - y), k = s.length >> 1; return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; };
console.error('mediana PER NTM', med(out.map((o) => o.per_ntm)), 'mediana EV/EBITDA NTM', med(out.map((o) => o.ev_ebitda_ntm)));
