// Comparables desde MarketScreener (mismo proveedor para LTM y NTM). Escribe D-comp.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { leer } from './D-ms-parse.mjs';
const dir = path.dirname(fileURLToPath(import.meta.url));
const GBP_EUR = 1 / 0.84880; // BCE, 6-oct-2026: 1 EUR = 0,84880 GBP
const CORTE = new Date('2026-10-07');

const lista = [
  { id: 'snam', nombre: 'Snam', ticker: 'SRG.MI', pais: 'IT', fin_mes: 12 },
  { id: 'italgas', nombre: 'Italgas', ticker: 'IG.MI', pais: 'IT', fin_mes: 12 },
  { id: 'terna', nombre: 'Terna', ticker: 'TRN.MI', pais: 'IT', fin_mes: 12 },
  { id: 'redeia', nombre: 'Redeia', ticker: 'RED.MC', pais: 'ES', fin_mes: 12 },
  { id: 'elia', nombre: 'Elia Group', ticker: 'ELI.BR', pais: 'BE', fin_mes: 12 },
  { id: 'ng', nombre: 'National Grid', ticker: 'NG.L', pais: 'GB', fin_mes: 3, fx: GBP_EUR },
  { id: 'naturgy', nombre: 'Naturgy', ticker: 'NTGY.MC', pais: 'ES', fin_mes: 12 },
  { id: 'eng', nombre: 'Enagás (control)', ticker: 'ENG.MC', pais: 'ES', fin_mes: 12 },
];
const r1 = x => x == null || !isFinite(x) ? null : Math.round(x * 10) / 10;
const r2 = x => x == null || !isFinite(x) ? null : Math.round(x * 100) / 100;

const out = [];
for (const c of lista) {
  const fin = leer(c.id === "eng" ? "D-ms-eng-finances" : `D-ms-${c.id}-fin`), val = leer(`D-ms-${c.id}-val`);
  const anual = fin.bloques.filter(b => !/ [QS]\d/.test(b.periodos[0]));
  const get = (lab) => { for (const b of anual) if (b.filas[lab]) return { per: b.periodos, v: b.filas[lab], ann: b.filas['Announcement Date'] }; return null; };
  const ventas = get('Net sales'), ebitda = get('EBITDA'), nd = get('Net Debt'), fcf = get('Free Cash Flow (FCF)'), eps = get('EPS'), ni = get('Net income');
  const per = ventas.per; const ann = ventas.ann;
  const iUlt = ann.reduce((a, v, i) => v != null ? i : a, -1); // último ejercicio real
  const fy0 = per[iUlt], fy1 = per[iUlt + 1], fy2 = per[iUlt + 2];
  // peso del primer ejercicio estimado en los próximos 12 meses
  const finFy1 = new Date(Date.UTC(+fy1, c.fin_mes, 0));
  const w1 = Math.max(0, Math.min(1, (finFy1 - CORTE) / (365.25 * 864e5)));
  const ntm = (s) => s ? w1 * s.v[iUlt + 1] + (1 - w1) * s.v[iUlt + 2] : null;
  // LTM: con semestres si hay 1S del año en curso y del anterior (solo dic)
  let ltmV = ventas.v[iUlt], ltmE = ebitda.v[iUlt], ltmNota = `ejercicio ${fy0}`;
  const sem = fin.bloques.find(b => / S1$/.test(b.periodos[0]) || / S[12]$/.test(b.periodos[0]));
  if (c.fin_mes === 12 && sem) {
    const a = sem.periodos.indexOf(`${+fy0 + 1} S1`), p = sem.periodos.indexOf(`${fy0} S1`);
    const sv = sem.filas['Net sales'], se = sem.filas['EBITDA'];
    if (a >= 0 && p >= 0 && sv && se && sv[a] != null && sv[p] != null && se[a] != null && se[p] != null) {
      ltmV = ventas.v[iUlt] + sv[a] - sv[p]; ltmE = ebitda.v[iUlt] + se[a] - se[p]; ltmNota = `FY${fy0} + 1S${+fy0 + 1} − 1S${fy0}`;
    }
  }
  const mcRow = val.bloques.flatMap(b => b.filas['Market Cap'] ? [b.filas['Market Cap']] : [])[0];
  const mcap = mcRow.filter(v => v != null).slice(-1)[0];
  const fx = c.fx || 1;
  const ndv = nd.v[iUlt];
  const ev = mcap + ndv;
  const precio = parseFloat(val.precio.replace(/,/g, '')) / (/GBX/.test(val.precio) ? 100 : 1);
  const epsNtm = ntm(eps);
  out.push({
    nombre: c.nombre, ticker: c.ticker, pais: c.pais,
    capitalizacion: Math.round(mcap * fx), ev_meur: Math.round(ev * fx),
    ev_ventas: r2(ev / ltmV), ev_ebitda_ltm: r1(ev / ltmE), ev_ebitda_ntm: r1(ev / ntm(ebitda)), per_ntm: r1(precio / epsNtm),
    crecimiento_pct: r1((ntm(ventas) / ltmV - 1) * 100), margen_ebitda_pct: r1(ebitda.v[iUlt] / ventas.v[iUlt] * 100), roic_pct: null,
    dn_ebitda: r1(ndv / ebitda.v[iUlt]), fcf_yield_pct: r1(fcf.v[iUlt] / mcap * 100),
    _detalle: { divisa: c.fx ? 'GBP' : 'EUR', precio, mcap, deuda_neta: ndv, ejercicio_real: fy0, ltm: ltmNota, ventas_ltm: r1(ltmV), ebitda_ltm: r1(ltmE), peso_fy1_ntm: r2(w1), fy1, fy2, ebitda_ntm: r1(ntm(ebitda)), ventas_ntm: r1(ntm(ventas)), eps_ntm: r2(epsNtm), ebitda_ultimo: ebitda.v[iUlt], ventas_ultimo: ventas.v[iUlt], fcf_ultimo: fcf.v[iUlt], fx_a_eur: r2(fx) },
  });
}
fs.writeFileSync(path.join(dir, 'D-comp.json'), JSON.stringify(out, null, 2));
for (const o of out) console.log(o.nombre.padEnd(18), o.capitalizacion, o.ev_meur, o.ev_ventas, o.ev_ebitda_ltm, o.ev_ebitda_ntm, o.per_ntm, o.crecimiento_pct, o.margen_ebitda_pct, o.dn_ebitda, o.fcf_yield_pct, JSON.stringify(o._detalle));
