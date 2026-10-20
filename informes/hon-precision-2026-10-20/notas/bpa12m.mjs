// BPA propio por escenario (2026e-2028e) desde la proyección del DCF y los desplazamientos de los escenarios.
// BPA = (ventas × margen EBITDA − amortización + resultado financiero recurrente) × (1 − impuestos) ÷ 180 M acciones (179,93 M emitidas; sin dilución conocida ni recompras).
// Resultado financiero recurrente: intereses de la caja (≈ 540 M TWD en el 1S26 sobre ≈ 56.000 M de caja [A2]); sin diferencias de cambio.
// Cuadre con 2025 real: (15.114 EBITDA − 68 amort. + 539 financiero) × (1 − 0,207) = 12.362 → 75,5 por 163,7 M acciones diluidas = 75,54 publicado.
import S from './supuestos.mjs';
const ACC = 180, VENTAS_2025 = 30271, FIN = { '2026e': 1100, '2027e': 1100, '2028e': 1300 };
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
