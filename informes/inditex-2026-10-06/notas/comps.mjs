// Comparables de Inditex a 6-oct-2026. Reproducible: node comps.mjs -> comps.json
// Fuentes (leídas el 6-oct-2026):
//  - Ventas, EBITDA y BPA anuales reales y estimados: MarketScreener /finances/ (docs/D_ms_fin_<x>.txt, tablas en docs/D_ms_fin_<x>.json
//    con D_ms_parse.mjs). EL MISMO proveedor para los últimos y los próximos 12 meses.
//  - Capitalización, valor empresa (incluye pasivos por arrendamiento en la deuda para todas: comprobado en TJX, Ross, Gap y Lululemon
//    contra el 10-Q), ROIC y rentabilidad por FCF: Stock Analysis /statistics/ (docs/D_sa_stats_<x>.txt). Precios de las americanas: intradía
//    del 6-oct (mercado abierto, ~15:40 EDT).
//  - Coste fijo de arrendamientos operativos de las americanas (US GAAP): SEC XBRL companyfacts, OperatingLeaseCost del último 10-K
//    (docs/D_sec_<x>.json).
//  - Divisas: BCE, 6-oct-2026 (docs/D_bce_eurofxref.xml).
// Criterio de homogeneización con Inditex (NIIF 16: EBITDA antes de alquileres fijos y arrendamientos en la deuda):
//  - Europeas y Fast Retailing (NIIF 16): EBITDA de MarketScreener tal cual; EV de Stock Analysis (con arrendamientos).
//  - Americanas (US GAAP, ASC 842): el alquiler operativo fijo está en el EBITDA; se le suma el OperatingLeaseCost del último 10-K en %
//    de las ventas de ese ejercicio, aplicado a las ventas LTM y NTM (estimación propia). EV de Stock Analysis (con pasivos por arrendamiento).
// LTM y NTM = mezcla de ejercicios por meses (estimación propia, como hace el motor): wl = peso del ejercicio cerrado en el LTM (que acaba en
// el último trimestre publicado, finLtm); wn = peso del ejercicio en curso en el NTM (meses que le quedan desde el 6-oct-2026 / 12).
import { readFileSync, writeFileSync } from 'node:fs';
const FX = { EUR: 1, USD: 1.1269, JPY: 178.15, GBP: 0.8488, SEK: 11.2425 }; // unidades por 1 EUR, BCE 6-oct-2026
const ms = x => JSON.parse(readFileSync(new URL(`./docs/D_ms_fin_${x}.json`, import.meta.url))).tablas;
function serie(x, y0) { // devuelve {ventas,ebitda,ebit,bpa,dpa,fcf,dn} para los 3 años [y0, y0+1, y0+2] (etiquetas de MarketScreener)
  const T = ms(x); const f = {}; for (const t of T) for (const [k, v] of Object.entries(t.filas)) f[k] = Object.fromEntries(t.per.map((p, i) => [p, v[i]]));
  const g = k => [y0, y0 + 1, y0 + 2, y0 + 3].map(y => f[k]?.[String(y)] ?? null);
  return { ventas: g('Net sales'), ebitda: g('EBITDA'), ebit: g('EBIT'), bpa: g('EPS'), dpa: g('Dividend per Share'), fcf: g('Free Cash Flow (FCF)'), dn: g('Net Debt') };
}
// y0 = etiqueta de MarketScreener del último ejercicio cerrado y publicado.
// cap/ev en miles de millones de la divisa de cotización (Stock Analysis); precio en la divisa de cotización (pence para las británicas).
const E = [
  { nombre: 'H&M (Hennes & Mauritz)', ticker: 'HM-B', pais: 'SE', x: 'hm', mon: 'SEK', y0: 2025, wl: 0.25, wn: 0.15, finLtm: '2026-08-31', cap: 255.90, ev: 308.84, precio: 160.30, roic: 16.10, fcfy: 10.57, gaap: 'NIIF 16',
    nota: 'ejercicio diciembre-noviembre: «2025» real (dic-24 a nov-25), «2026-2027»e; 9M publicados el 24-sep-2026' },
  { nombre: 'Fast Retailing (Uniqlo)', ticker: '9983', pais: 'JP', x: 'fr', mon: 'JPY', y0: 2025, wl: 0.25, wn: 0.9, nt: 2, finLtm: '2026-05-31', cap: 23190, ev: 21980, precio: 75590, roic: 37.51, fcfy: 3.10, gaap: 'NIIF 16',
    nota: 'ejercicio septiembre-agosto: «2025» real (sep-24 a ago-25); «2026»e ya cerrado (ago-26) pero sin publicar (resultados el 9-oct aprox.); NTM = 0,90·«2027»e + 0,10·«2028»e; 9M publicados el 9-jul-2026' },
  { nombre: 'TJX Companies', ticker: 'TJX', pais: 'US', x: 'tjx', mon: 'USD', y0: 2026, wl: 0.5, wn: 0.32, finLtm: '2026-08-01', cap: 150.28, ev: 158.59, precio: 136.62, roic: 30.13, fcfy: 3.93, gaap: 'US GAAP', alquiler: 2196, alqFY: 'feb-25 a ene-26',
    nota: 'ejercicio febrero-enero: «2026» real (feb-25 a ene-26), «2027-2028»e; 1S publicado el 19-ago-2026' },
  { nombre: 'Ross Stores', ticker: 'ROST', pais: 'US', x: 'rost', mon: 'USD', y0: 2026, wl: 0.5, wn: 0.32, finLtm: '2026-08-01', cap: 71.20, ev: 71.65, precio: 222.89, roic: 33.59, fcfy: 3.93, gaap: 'US GAAP', alquiler: 843.374, alqFY: 'feb-25 a ene-26',
    nota: 'ejercicio febrero-enero: «2026» real, «2027-2028»e; 1S publicado el 20-ago-2026' },
  { nombre: 'Next', ticker: 'NXT', pais: 'GB', x: 'next', mon: 'GBP', y0: 2026, wl: 0.5, wn: 0.32, finLtm: '2026-07-31', cap: 16.66, ev: 18.68, precio: 145.95, roic: 28.62, fcfy: 6.65, gaap: 'NIIF 16',
    nota: 'ejercicio febrero-enero: «2026» real (feb-25 a ene-26), «2027-2028»e; 1S publicado el 17-sep-2026' },
  { nombre: 'Associated British Foods (Primark)', ticker: 'ABF', pais: 'GB', x: 'abf', mon: 'GBP', y0: 2025, wl: 0.5, wn: 0.94, nt: 2, finLtm: '2026-02-28', cap: 12.67, ev: 15.85, precio: 18.34, roic: 7.31, fcfy: 9.35, gaap: 'NIIF 16',
    nota: 'CONGLOMERADO: Primark es aprox. la mitad de las ventas; el resto es alimentación, azúcar, ingredientes y agricultura. Ejercicio a mediados de septiembre: «2025» real, «2026»e cerrado sin publicar (resultados en noviembre), NTM = 0,94·«2027»e + 0,06·«2028»e; 1S publicado el 21-abr-2026' },
  { nombre: 'Zalando', ticker: 'ZAL', pais: 'DE', x: 'zal', mon: 'EUR', y0: 2025, wl: 0.5, wn: 0.236, finLtm: '2026-06-30', cap: 5.40, ev: 5.31, precio: 22.40, roic: 7.61, fcfy: 16.90, gaap: 'NIIF 16',
    nota: 'ejercicio natural: «2025» real, «2026-2027»e; 1S publicado el 4-ago-2026; distribución online (incluye About You desde 2025)' },
  { nombre: 'Gap Inc.', ticker: 'GAP', pais: 'US', x: 'gap', mon: 'USD', y0: 2026, wl: 0.5, wn: 0.32, finLtm: '2026-08-01', cap: 8.37, ev: 11.61, precio: 23.83, roic: 10.06, fcfy: 11.49, gaap: 'US GAAP', alquiler: 907, alqFY: 'feb-25 a ene-26',
    nota: 'ejercicio febrero-enero: «2026» real, «2027-2028»e; 1S publicado el 27-ago-2026. El BPA «2027»e (3,68 USD) lleva un extraordinario: el beneficio neto estimado salta a 1.382 M frente a 816 y 937 M en los años vecinos' },
  { nombre: 'Lululemon Athletica', ticker: 'LULU', pais: 'US', x: 'lulu', mon: 'USD', y0: 2026, wl: 0.5, wn: 0.32, finLtm: '2026-08-02', cap: 10.38, ev: 11.13, precio: 93.78, roic: 23.70, fcfy: 13.05, gaap: 'US GAAP', alquiler: 405.987, alqFY: 'feb-25 a feb-26',
    nota: 'ejercicio a principios de febrero: «2026» real, «2027-2028»e; 1S publicado el 3-sep-2026; ventas en descenso' },
];
const corte = new Date('2026-10-06');
const r1 = (v, d = 1) => v == null ? null : Math.round(v * 10 ** d) / 10 ** d;
const out = E.map(e => {
  const s = serie(e.x, e.y0);
  const ltm = k => e.wl * s[k][0] + (1 - e.wl) * s[k][1];
  const n0 = e.nt || 1; const ntm = k => e.wn * s[k][n0] + (1 - e.wn) * s[k][n0 + 1];
  const capM = e.cap * 1000, evM = e.ev * 1000; // millones de la divisa
  const alqPct = e.alquiler ? e.alquiler / s.ventas[0] : 0; // alquiler fijo / ventas del último ejercicio (US GAAP)
  const ebitdaH = (ebitda, ventas) => ebitda + alqPct * ventas;
  const eL = ebitdaH(ltm('ebitda'), ltm('ventas')), eN = ebitdaH(ntm('ebitda'), ntm('ventas')), e0 = ebitdaH(s.ebitda[0], s.ventas[0]);
  const anios = (corte - new Date(e.finLtm)) / 31557600000 + 1;
  const dnArr = evM - capM; // deuda neta con arrendamientos implícita en el EV de Stock Analysis
  return {
    nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: Math.round(capM / FX[e.mon]),
    ev_ventas: r1(evM / ltm('ventas'), 2), ev_ebitda_ltm: r1(evM / eL), ev_ebitda_ntm: r1(evM / eN),
    per_ntm: r1(e.precio / ntm('bpa')), crecimiento_pct: r1(((ntm('ventas') / ltm('ventas')) ** (1 / anios) - 1) * 100),
    margen_ebitda_pct: r1(100 * e0 / s.ventas[0]), roic_pct: e.roic, dn_ebitda: r1(dnArr / e0), fcf_yield_pct: e.fcfy,
    _nota: `${e.gaap}${e.alquiler ? ` (EBITDA homogeneizado: + alquiler operativo fijo ${e.alquiler} M ${e.mon} del 10-K ${e.alqFY}, ${r1(alqPct * 100, 2)} % de las ventas)` : ''}; ${e.nota}; ` +
      `LTM = ${e.wl}·«${e.y0}» + ${r1(1 - e.wl, 2)}·«${e.y0 + 1}»; NTM = ${e.wn}·«${e.y0 + (e.nt || 1)}» + ${r1(1 - e.wn, 2)}·«${e.y0 + (e.nt || 1) + 1}»; cap. ${e.cap} mil M ${e.mon}, EV ${e.ev} mil M ${e.mon} (Stock Analysis, con arrendamientos); ` +
      `sin homogeneizar (MarketScreener): EV/EBITDA LTM ${r1(evM / ltm('ebitda'))}x y NTM ${r1(evM / ntm('ebitda'))}x; cap. + deuda neta de MarketScreener del último ejercicio (${s.dn[0]} M; su definición incluye arrendamientos en unas empresas y no en otras) / EBITDA LTM sin homogeneizar: ${r1((capM + s.dn[0]) / ltm('ebitda'))}x; ` +
      `ventas LTM ${Math.round(ltm('ventas'))} y NTM ${Math.round(ntm('ventas'))} M ${e.mon}; EBITDA homogéneo LTM ${Math.round(eL)} y NTM ${Math.round(eN)} M ${e.mon}; BPA NTM ${r1(ntm('bpa'), 3)}`,
    _datos: { mon: e.mon, fy: s, alquiler_pct_ventas: r1(alqPct * 100, 2), precio: e.precio },
  };
});
writeFileSync(new URL('./comps.json', import.meta.url), JSON.stringify(out, null, 1));
console.table(out.map(({ _nota, _datos, ...x }) => x));
