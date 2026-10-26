// BPA propio por escenario (FY2026e-FY2028e) con la proyección del informe y las reglas que cuadran FY2025
// (178,46 calculado frente a 178,47 publicado). Uso: node informes/fanuc-2026-10-26/notas/bpa-fanuc.mjs
import { anios, casos } from './supuestos-fanuc.mjs';
const V0 = 857831, ACC = 924.914, T = 0.295, MIN = 0.018;
// Resultado no operativo: participadas + intereses y dividendos (LTM sep-26: 38.783 + ≈15.200)
const NOP = { Base: { part: 38783, fin: 15217 }, Alcista: { part: 38783, fin: 15217 }, Bajista: { part: 27900, fin: 11936 } };
const base = {}; let v = V0; for (const a of anios.slice(0, 3)) { v *= 1 + a.crecimiento_pct / 100; base[a.periodo] = { v, am: v * a.amortizacion_pct_ventas / 100 }; }
for (const c of casos) {
  let ventas = V0; const out = [];
  for (const a of anios.slice(0, 3)) {
    const p = (c.perfil || []).find((x) => x.periodo === a.periodo) || { crecimiento_pp: 0, margen_pp: 0 };
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp + p.crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp + p.margen_pp;
    ventas *= 1 + g / 100;
    const am = c.escenario === 'Bajista' ? base[a.periodo].am : ventas * a.amortizacion_pct_ventas / 100;
    const ebit = ventas * m / 100 - am, n = a.periodo === 'FY2026e' ? NOP.Base : NOP[c.escenario];
    const bai = ebit + n.part + n.fin, imp = T * (bai - n.part), bn = (bai - imp) * (1 - MIN);
    out.push({ periodo: a.periodo, g: +g.toFixed(1), m: +m.toFixed(1), ventas: Math.round(ventas), ebit: Math.round(ebit), bn: Math.round(bn), bpa: +(bn / ACC).toFixed(2) });
  }
  console.log(c.escenario); console.table(out);
}
// Cuadre FY2025: ventas 857.831, BE 183.476? (se comprueba con las cifras publicadas en A.json)
