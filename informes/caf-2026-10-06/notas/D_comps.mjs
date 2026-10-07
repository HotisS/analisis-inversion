// Comparables de CAF a 6-oct-2026 con MarketScreener (docs/D_ms_<x>_fin|val.json, de D_ms_parse.mjs) y ROIC de Stock Analysis.
// Uso: node D_comps.mjs  -> imprime y guarda D_comps.json
import { readFileSync, writeFileSync } from 'node:fs';
const J = x => JSON.parse(readFileSync(new URL(`./docs/D_ms_${x}.json`, import.meta.url), 'utf8'));
const FX = { EUR: 1, USD: 1.1269, CHF: 0.9359, SEK: 11.2425 }; // BCE 6-oct-2026, unidades por 1 EUR
const corte = new Date('2026-10-06');
const peers = [
  { x: 'alstom', nombre: 'Alstom', ticker: 'ALO', pais: 'FR', div: 'EUR', fyFin: '2027', mesCierre: 3, ltm: '2026', roic: 3.57 },
  { x: 'stadler', nombre: 'Stadler Rail', ticker: 'SRAIL', pais: 'CH', div: 'CHF', roic: 10.27 },
  { x: 'talgo', nombre: 'Talgo', ticker: 'TLGO', pais: 'ES', div: 'EUR', roic: 1.39 },
  { x: 'knorr', nombre: 'Knorr-Bremse', ticker: 'KBX', pais: 'DE', div: 'EUR', roic: 15.95 },
  { x: 'wabtec', nombre: 'Wabtec', ticker: 'WAB', pais: 'US', div: 'USD', roic: 9.18 },
  { x: 'dtruck', nombre: 'Daimler Truck', ticker: 'DTG', pais: 'DE', div: 'EUR', roic: 4.11, ndOverride: -7700, ndNota: 'liquidez neta industrial 7.700 M EUR a 31-dic-2025 (nota de resultados FY25) en vez de la deuda neta de MarketScreener (18.013 M, incluye la financiera)' },
  { x: 'volvo', nombre: 'Volvo', ticker: 'VOLV-B', pais: 'SE', div: 'SEK', roic: 9.35 },
  { x: 'caf', nombre: 'CAF (control)', ticker: 'CAF', pais: 'ES', div: 'EUR', roic: 15.59 },
];
const row = (j, k) => { for (const t of j.tablas) if (t.filas[k]) return { per: t.per, v: t.filas[k] }; return null; };
const at = (r, p) => r ? r.v[r.per.indexOf(p)] : null;
const out = [];
for (const P of peers) {
  const f = J(P.x + '_fin'), v = J(P.x + '_val');
  const mc = row(v, 'Market Cap'); const capLoc = mc.v.filter(n => n != null).at(-1);
  const price = row(v, 'Reference price').v.filter(n => n != null).at(-1);
  const mes = P.mesCierre || 12;
  const ltm = P.ltm || '2025', y1 = String(+ltm + 1), y2 = String(+ltm + 2);
  const finFY = new Date(Date.UTC(+y1, mes, 0)); // último día del ejercicio en curso
  const w1 = Math.max(0, Math.min(1, (finFY - corte) / 864e5 / 365)), w2 = 1 - w1;
  const S = k => [at(row(f, k), ltm), at(row(f, k), y1), at(row(f, k), y2)];
  const [sL, s1, s2] = S('Net sales'), [eL, e1, e2] = S('EBITDA'), [, p1, p2] = S('EPS');
  const nd = P.ndOverride ?? at(row(f, 'Net Debt'), ltm), fcf = at(row(f, 'Free Cash Flow (FCF)'), ltm);
  const sN = w1 * s1 + w2 * s2, eN = w1 * e1 + w2 * e2, pN = w1 * p1 + w2 * p2;
  const ev = capLoc + nd;
  const midL = new Date(Date.UTC(+ltm, mes - 6, 1)), midN = new Date(corte.getTime() + 182.5 * 864e5);
  const yrs = (midN - midL) / 864e5 / 365.25;
  const r1 = n => n == null || !isFinite(n) ? null : Math.round(n * 10) / 10, r2 = n => n == null || !isFinite(n) ? null : Math.round(n * 100) / 100;
  const okE = eL > 0.03 * sL;
  out.push({ nombre: P.nombre, ticker: P.ticker, pais: P.pais, capitalizacion: Math.round(capLoc / FX[P.div]),
    ev_ventas: r2(ev / sL), ev_ebitda_ltm: okE ? r1(ev / eL) : null, ev_ebitda_ntm: r1(ev / eN), per_ntm: pN > 0 ? r1(price / pN) : null,
    crecimiento_pct: r1((Math.pow(sN / sL, 1 / yrs) - 1) * 100), margen_ebitda_pct: r1(eL / sL * 100), roic_pct: P.roic,
    dn_ebitda: okE ? r2(nd / eL) : null, fcf_yield_pct: r1(fcf / capLoc * 100),
    _det: { div: P.div, precio: price, cap_local: capLoc, dn_local: nd, ev_local: Math.round(ev), ltm, ventas_ltm: sL, ebitda_ltm: eL, w: [r2(w1), r2(w2)], ventas_ntm: Math.round(sN), ebitda_ntm: Math.round(eN), bpa_ntm: r2(pN), fcf_ltm: fcf, anios_crec: r2(yrs), nd_nota: P.ndNota || null } });
}
for (const o of out) console.log(JSON.stringify(o));
writeFileSync(new URL('./D_comps.json', import.meta.url), JSON.stringify(out, null, 1));
