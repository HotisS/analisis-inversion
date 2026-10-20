// BPA propio por escenario (2026e-2028e) desde la proyección del DCF y los desplazamientos de los escenarios.
// BPA = (ventas × margen EBITDA − amortización + resultado financiero recurrente) × (1 − impuestos) ÷ 41,6 M acciones
// (41,58 M emitidas tras el dividendo en acciones de julio de 2026; diluidas 41,62 M).
// Resultado financiero: 2026e suma lo contabilizado en el 1S26 (288,7 M, con +56,3 M de cambio y +121,6 M de valor razonable [A5])
// y unos 110 M de intereses del 2S; 2027e-2028e solo intereses de la caja (≈ 1,5 % sobre 13.000-17.000 M), sin diferencias de cambio.
import S from './supuestos.mjs';
const ACC = 41.6, VENTAS_2025 = 9084.9, FIN = { '2026e': 400, '2027e': 200, '2028e': 250 };
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
