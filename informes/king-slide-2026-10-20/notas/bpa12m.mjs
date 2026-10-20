// BPA propio por escenario (2026e-2028e) desde la proyección del DCF y los desplazamientos de los escenarios.
// BPA = (ventas × margen EBITDA − amortización + resultado financiero recurrente) × (1 − impuestos) ÷ 95,3 M acciones
// (95,30 M emitidas, base básica; sin recompras ni ampliaciones anunciadas).
// Resultado financiero recurrente: intereses de la caja (≈ 2-2,5 % sobre 30.000-55.000 M) sin diferencias de cambio,
// salvo en 2026e, que suma las ya contabilizadas en el 1S26 (+418 M).
// Cuadre con 2025 real: (12.449 EBITDA − 360 amort. + 334 financiero) × (1 − 0,208) = 9.837 → 103,2 por 95,3 M = 103,23 básico publicado.
import S from './supuestos.mjs';
const ACC = 95.3, VENTAS_2025 = 17501, FIN = { '2026e': 1320, '2027e': 1000, '2028e': 1200 };
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
