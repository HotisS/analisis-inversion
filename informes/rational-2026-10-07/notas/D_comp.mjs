import { todo } from './D_parse2.mjs';
const fx = { EUR: 1, USD: 1.1269, SEK: 11.2425, JPY: 178.15, CHF: 0.9359 };
const lista = [['midd','The Middleby Corporation','MIDD','US'],['epro','Electrolux Professional','EPRO B','SE'],['hosh','Hoshizaki','6465','JP'],['jbtm','JBT Marel','JBTM','US'],['krn','Krones','KRN','DE'],['kone','Kone','KNEBV','FI'],['schp','Schindler','SCHP','CH'],['inrn','Interroll','INRN','CH'],['itw','Illinois Tool Works','ITW','US'],['rational','Rational (control)','RAA','DE']];
const r1 = x => x == null || !isFinite(x) ? null : Math.round(x * 10) / 10;
const out = [];
for (const [k, nombre, ticker, pais] of lista) {
  const fv = k === 'rational' ? 'docs/D-ms-val.txt' : `docs/D-cmp-${k}-val.txt`, ff = k === 'rational' ? 'docs/D-ms-fin.txt' : `docs/D-cmp-${k}-fin.txt`;
  const v = todo(fv), f = todo(ff); const F = { ...f.filas, ...v.filas };
  const cur = (v.unidad.match(/^[A-Z]{3}/) || [''])[0]; const g = (l, y) => F[l]?.[y] ?? null;
  const cap = g('Market Cap', '2026'), ev = g('Enterprise Value (EV)', '2026');
  const L = l => (g(l, '2025') + g(l, '2026')) / 2, N = l => 0.25 * g(l, '2026') + 0.75 * g(l, '2027');
  const o = { nombre, ticker, pais, divisa: cur, mes: v.mes, precio: v.precio, cap_local: cap, ev_local: ev,
    capitalizacion: Math.round(cap / fx[cur]), ev_ventas: Math.round(ev / L('Net sales') * 100) / 100,
    ev_ebitda_ltm: r1(ev / L('EBITDA')), ev_ebitda_ntm: r1(ev / N('EBITDA')), per_ntm: r1(cap / N('Net income')),
    crecimiento_pct: r1((Math.pow(N('Net sales') / L('Net sales'), 1 / 1.25) - 1) * 100),
    margen_ebitda_pct: r1(g('EBITDA', '2025') / g('Net sales', '2025') * 100), roic_pct: null,
    dn_ebitda: r1(g('Net Debt', '2025') / g('EBITDA', '2025')), fcf_yield_pct: r1(g('FCF Yield', '2026')),
    ventas: [g('Net sales','2025'), g('Net sales','2026'), g('Net sales','2027')], ebitda: [g('EBITDA','2025'), g('EBITDA','2026'), g('EBITDA','2027')], ni: [g('Net income','2025'), g('Net income','2026'), g('Net income','2027')], nd25: g('Net Debt','2025'), roe25: g('ROE','2025'), anios: v.anios.join(',') };
  out.push(o);
}
console.log(JSON.stringify(out, null, 0).replace(/\},\{/g, '},\n{'));
