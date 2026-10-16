// BPA propio por escenario (2027e y 2028e) desde la proyección del DCF y los desplazamientos de los escenarios.
// BPA = (ventas × margen EBITDA − amortización + resultado financiero recurrente) × (1 − impuestos) ÷ 562 M acciones diluidas.
// Resultado financiero recurrente: intereses de la caja (≈1.100 M TWD en los últimos 12 meses [A1]); sin diferencias de cambio.
import S from './supuestos.mjs';
const ACC = 562, VENTAS_2025 = 248320, FIN = { '2026e': 1000, '2027e': 1000, '2028e': 1200 };
export function bpas(caso) {
  let v = VENTAS_2025; const out = {};
  for (const a of S.anios.slice(0, 3)) {
    const p = (caso.perfil ?? []).find((x) => x.periodo === a.periodo);
    const dg = a.fijo ? 0 : (p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp);
    const dm = a.fijo ? 0 : (p ? p.margen_pp : caso.ajuste_margen_pp);
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const ebit = v * (a.margen_ebitda_pct + dm) / 100 - v * a.amortizacion_pct_ventas / 100;
    const bn = (ebit + FIN[a.periodo]) * (1 - a.tasa_impositiva_pct / 100);
    out[a.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: +(bn / ACC).toFixed(2) };
  }
  return out;
}
if (process.argv[1]?.endsWith('bpa12m.mjs')) for (const c of S.casos) console.log(c.escenario, JSON.stringify(bpas(c)));
