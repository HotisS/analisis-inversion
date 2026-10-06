// De comps_out.json a la sección comparables de D.json (filas) y a una tabla de control.
import { readFileSync, writeFileSync } from 'node:fs';
const P = 'informes/intuitive-2026-10-06/notas/D_scripts';
const C = JSON.parse(readFileSync(`${P}/comps_out.json`, 'utf8'));
const nombres = { syk: ['Stryker', 'SYK'], bsx: ['Boston Scientific', 'BSX'], mdt: ['Medtronic', 'MDT'], abt: ['Abbott Laboratories', 'ABT'], ew: ['Edwards Lifesciences', 'EW'], dxcm: ['Dexcom', 'DXCM'], podd: ['Insulet', 'PODD'], idxx: ['IDEXX Laboratories', 'IDXX'], rmd: ['ResMed', 'RMD'], zbh: ['Zimmer Biomet', 'ZBH'] };
const pais = { mdt: 'IE' };
// EBITDA de MarketScreener que excluye la remuneración en acciones (deducido del puente con las cuentas): se le resta
const sinSBC = new Set(['dxcm', 'podd']);
const r = (x, d = 1) => (x == null || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const filas = [], control = [];
for (const [t, [nombre, ticker]] of Object.entries(nombres)) {
  const c = C[t];
  const sbcPct = c.sa_ttm.sbc / c.ventas_ltm;
  const aj = sinSBC.has(t);
  const eLtm = aj ? c.ebitda_ltm - c.sa_ttm.sbc : c.ebitda_ltm;
  const eNtm = aj ? c.ebitda_ntm - sbcPct * c.ventas_ntm : c.ebitda_ntm;
  const fyU = Object.keys(c.ebitda_fy)[0];
  const eFy = aj ? c.ebitda_fy[fyU] - sbcPct * c.ventas_fy[fyU] : c.ebitda_fy[fyU];
  const dn = c.ev - c.cap;
  filas.push({
    nombre, ticker, pais: pais[t] || 'US', capitalizacion: Math.round(c.cap), ev_ventas: r(c.ev / c.ventas_ltm, 2), ev_ebitda_ltm: r(c.ev / eLtm), ev_ebitda_ntm: r(c.ev / eNtm),
    per_ntm: c.per_ntm, crecimiento_pct: c.crecimiento_pct, margen_ebitda_pct: r(eFy / c.ventas_fy[fyU] * 100), roic_pct: r(c.roic_pct), dn_ebitda: r(dn / eLtm, 2), fcf_yield_pct: r(c.fcf_yield_pct),
  });
  control.push({ t, ev: c.ev, cap: c.cap, dn: r(dn, 0), ventas_ltm: c.ventas_ltm, ventas_ntm: c.ventas_ntm, ebitda_ms_ltm: r(c.ebitda_ltm, 0), ebitda_ms_ntm: c.ebitda_ntm, ebitda_ltm_usado: r(eLtm, 0), ebitda_ntm_usado: r(eNtm, 0), sbc_ltm: c.sa_ttm.sbc, sbc_pct: r(sbcPct * 100), ebit_ms_ltm: r(c.ebit_ltm, 0), ebit_gaap_ltm: c.sa_ttm.ebit_gaap, da_ltm: c.sa_ttm.da, ebitda_gaap_ltm: r(c.sa_ttm.ebit_gaap + c.sa_ttm.da, 0), fy_ultimo: fyU, peso_fy0: c.peso_fy_en_curso, eps_ng: [c.eps_ng.eps0?.v, c.eps_ng.eps1?.v], analistas: c.eps_ng.analistas, precio: c.precio, ajustado_sbc: aj });
}
writeFileSync(`${P}/comps_filas.json`, JSON.stringify({ filas, control }, null, 1));
console.table(filas.map(({ pais, ...x }) => x));
console.table(control.map(({ t, ebitda_ms_ltm, ebitda_gaap_ltm, sbc_ltm, ebit_ms_ltm, ebit_gaap_ltm, ajustado_sbc }) => ({ t, ebitda_ms_ltm, ebitda_gaap_ltm, dif: ebitda_ms_ltm - ebitda_gaap_ltm, sbc_ltm, ebit_ms_ltm, ebit_gaap_ltm, ajustado_sbc })));
