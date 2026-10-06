// Extrae de MarketScreener (finances) y Stock Analysis (statistics, IS y CF de 12 meses) las cifras de cada comparable
// y calcula los múltiplos con un único proveedor para el EBITDA de 12 meses pasados y futuros (MarketScreener).
// node informes/intuitive-2026-10-06/notas/D_scripts/comps.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const DOC = 'informes/intuitive-2026-10-06/notas/docs';
const CORTE = new Date('2026-10-06T00:00:00Z');
const tick = process.argv.slice(2).length ? process.argv.slice(2) : ['isrg', 'syk', 'bsx', 'mdt', 'abt', 'ew', 'dxcm', 'podd', 'idxx', 'rmd', 'zbh'];
const num = (s) => { if (s == null) return null; s = String(s).trim(); if (s === '-' || s === '' || s === 'n/a') return null; const neg = /^\(.*\)$/.test(s); s = s.replace(/[(),%$]/g, ''); let m = 1; if (/B$/.test(s)) { m = 1000; s = s.slice(0, -1); } else if (/M$/.test(s)) { m = 1; s = s.slice(0, -1); } else if (/K$/.test(s)) { m = 0.001; s = s.slice(0, -1); } const v = parseFloat(s) * m; return Number.isFinite(v) ? (neg ? -v : v) : null; };
const MES = { January: 1, February: 2, March: 3, April: 4, May: 5, June: 6, July: 7, August: 8, September: 9, October: 10, November: 11, December: 12 };

function ms(t) {
  const L = readFileSync(`${DOC}/D_ms_${t}_fin.txt`, 'utf8').split(/\r?\n/).map((x) => x.trim());
  const tabla = (k) => {
    const idx = L.map((x, i) => (x.startsWith('Fiscal Period:') ? i : -1)).filter((i) => i >= 0)[k];
    const mes = MES[L[idx].split(':')[1].trim()];
    let i = idx + 1; const per = [];
    while (/^\d{4}( Q\d)?$/.test(L[i])) per.push(L[i++]);
    const fin = L.findIndex((x, j) => j > idx && (x.startsWith('Fiscal Period:') || /^1USD/.test(x)));
    const out = { mes, per };
    for (const lab of ['Net sales', 'EBITDA', 'EBIT', 'Net income', 'EPS', 'Net Debt', 'Free Cash Flow (FCF)', 'Announcement Date']) {
      const j = L.findIndex((x, jj) => jj > i - 1 && jj < (fin < 0 ? L.length : fin) && x === lab);
      if (j < 0) continue;
      let p = j + 1; if (L[p] === '1') p++;
      out[lab] = L.slice(p, p + per.length);
    }
    return out;
  };
  return { anual: tabla(0), trim: tabla(1), ratios: tabla(4) };
}
function sa(t, pag) {
  const L = readFileSync(`${DOC}/D_sa_${t}_${pag}.txt`, 'utf8').split(/\r?\n/);
  if (pag === 'stats') {
    const g = (re) => { for (const l of L) { const m = l.match(re); if (m) return m[1]; } return null; };
    return {
      cap: num(g(/^\s*Market Cap \| ([^|]+)$/)), ev: num(g(/^\s*Enterprise Value \| ([^|]+)$/)), roic: num(g(/Return on Invested Capital \(ROIC\) \| ([^|]+)$/)),
      fcfy: num(g(/^\s*FCF Yield \| ([^|]+)$/)), ebitda_gaap: num(g(/^\s*EBITDA \| ([^|]+)$/)), deuda: num(g(/^\s*Total Debt \| ([^|]+)$/)), caja_neta: num(g(/^\s*Net Cash \| ([^|]+)$/)),
      precio: num(L.map((l) => l.trim()).find((l, i, a) => /Real-Time Price|Delayed Price/.test(a[i - 1] || '') === false && /^\d[\d,]*\.\d+$/.test(l))),
      fecha: g(/(At close: [^\n]+)/), ev_ebitda_sa: num(g(/^\s*EV \/ EBITDA \| ([^|]+)$/)), beta: num(g(/^\s*Beta \(5Y\) \| ([^|]+)$/)),
    };
  }
  const fila = (re) => { for (let i = 0; i < L.length; i++) if (re.test(L[i].trim())) { for (let k = i + 1; k < i + 4; k++) if (/^\s*\|/.test(L[k] || '')) return num(L[k].split('|')[1]); } return null; };
  const cab = L.find((l) => /^\s*\| (TTM|Q\d)/.test(l)) || '';
  return pag === 'cf' ? { sbc: fila(/^Stock-Based Compensation$/), da: fila(/^Depreciation & Amortization$/), fcf: fila(/^Free Cash Flow$/), cab: cab.trim().slice(0, 40) }
    : { ventas: fila(/^Revenue$/), ebit_gaap: fila(/^Operating Income$/), ebitda_gaap: fila(/^EBITDA$/), cab: cab.trim().slice(0, 40) };
}
const r1 = (x, d = 1) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
function fc(t) {
  const L = readFileSync(`${DOC}/D_sa_${t}_fc.txt`, 'utf8').split(/\r?\n/).map((x) => x.trim());
  const g = (lab) => { const i = L.indexOf(lab); if (i < 0) return null; const m = L[i + 1].match(/^([\d.,]+)(B|M)? from ([\d.,]+)/); return m ? { v: num(m[1] + (m[2] || '')), base: num(m[3] + (m[2] || '')) } : null; };
  const na = L.find((l) => /^\| - \|/.test(l) && /\| \d+ \| Upgrade/.test(l));
  return { eps0: g('EPS This Year'), eps1: g('EPS Next Year'), rev0: g('Revenue This Year'), rev1: g('Revenue Next Year'), analistas: na ? +na.match(/\| (\d+) \| Upgrade/)[1] : null };
}
const res = {};
for (const t of tick) {
  const M = ms(t), S = sa(t, 'stats'), CF = sa(t, 'cf'), IS = sa(t, 'is');
  const A = M.anual, Q = M.trim;
  // Ejercicio en curso: el primero sin fecha de publicación
  const ia = A['Announcement Date'].findIndex((x) => x === '-');
  const fy0 = A.per[ia], fy1 = A.per[ia + 1];
  const finFY = new Date(Date.UTC(+fy0, A.mes, 0));
  const meses = Math.max(0, Math.min(12, (finFY - CORTE) / (365.25 / 12 * 86400000)));
  const w0 = meses / 12, w1 = 1 - w0;
  const an = (lab, j) => num(A[lab]?.[j]);
  const ntm = (lab) => (an(lab, ia) == null || an(lab, ia + 1) == null ? null : w0 * an(lab, ia) + w1 * an(lab, ia + 1));
  // LTM: cuatro últimos trimestres publicados
  const iq = Q['Announcement Date'].findIndex((x) => x === '-');
  const ltmq = (lab) => { const v = [iq - 4, iq - 3, iq - 2, iq - 1].map((j) => num(Q[lab]?.[j])); return v.some((x) => x == null) ? null : v.reduce((p, x) => p + x, 0); };
  const ventas_ltm = ltmq('Net sales'), ebitda_ltm = ltmq('EBITDA'), ebit_ltm = ltmq('EBIT');
  const ventas_ntm = ntm('Net sales'), ebitda_ntm = ntm('EBITDA'), eps_ntm = ntm('EPS') ?? null;
  const epsA = (j) => num(M.ratios['EPS']?.[j]);
  const eps_ntm2 = epsA(ia) != null && epsA(ia + 1) != null ? w0 * epsA(ia) + w1 * epsA(ia + 1) : null;
  const ev = S.ev, cap = S.cap;
  const F = fc(t);
  const eps_ntm_ng = F.eps0 && F.eps1 ? w0 * F.eps0.v + w1 * F.eps1.v : null;
  const dn = ev != null && cap != null ? ev - cap : null;
  const ultFY = ia - 1;
  res[t] = {
    fy_mes: A.mes, fy_en_curso: fy0, peso_fy_en_curso: r1(w0, 3), trimestres_ltm: Q.per.slice(iq - 4, iq).join(','),
    cap, ev, precio: S.precio, fecha_precio: S.fecha,
    ventas_ltm, ebitda_ltm, ebit_ltm, ventas_ntm: r1(ventas_ntm, 0), ebitda_ntm: r1(ebitda_ntm, 0), eps_ntm: r1(eps_ntm2, 3),
    ventas_fy: { [A.per[ultFY]]: an('Net sales', ultFY), [fy0]: an('Net sales', ia), [fy1]: an('Net sales', ia + 1) },
    ebitda_fy: { [A.per[ultFY]]: an('EBITDA', ultFY), [fy0]: an('EBITDA', ia), [fy1]: an('EBITDA', ia + 1) },
    ebit_fy_ms: an('EBIT', ultFY), eps_fy: { [A.per[ultFY]]: epsA(ultFY), [fy0]: epsA(ia), [fy1]: epsA(ia + 1) },
    sa_ttm: { ventas: IS.ventas, ebit_gaap: IS.ebit_gaap, ebitda_gaap: IS.ebitda_gaap, sbc: CF.sbc, da: CF.da, cab: IS.cab },
    // múltiplos
    ev_ventas: r1(ev / ventas_ltm, 2), ev_ebitda_ltm: r1(ev / ebitda_ltm), ev_ebitda_ntm: r1(ev / ebitda_ntm), per_ntm: r1(S.precio / eps_ntm_ng), per_ntm_ms: r1(S.precio / eps_ntm2), eps_ng: F, 
    crecimiento_pct: r1((ventas_ntm / ventas_ltm - 1) * 100), margen_ebitda_pct: r1(an('EBITDA', ultFY) / an('Net sales', ultFY) * 100),
    margen_ebitda_ltm_pct: r1(ebitda_ltm / ventas_ltm * 100), roic_pct: S.roic, dn_ebitda: r1(dn / ebitda_ltm, 2), fcf_yield_pct: S.fcfy,
    sbc_pct_ventas: r1(CF.sbc / IS.ventas * 100), ebit_ms_vs_gaap_ltm: r1(ebit_ltm - IS.ebit_gaap, 0), ev_ebitda_sa_gaap: S.ev_ebitda_sa, beta_sa: S.beta,
  };
}
writeFileSync('informes/intuitive-2026-10-06/notas/D_scripts/comps_out.json', JSON.stringify(res, null, 1));
for (const [t, r] of Object.entries(res)) console.log(t, JSON.stringify(r));
