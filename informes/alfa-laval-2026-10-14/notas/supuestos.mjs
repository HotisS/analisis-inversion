// Supuestos del DCF, escenarios, pesos y BPA propio de Alfa Laval (corte 2026-10-14). SEK, ejercicio natural, NIIF.
// Capex = inversión en inmovilizado (guía 2026: 2.500-3.000 M) + altas de derechos de uso (pagos de arrendamientos ≈0,7 % de ventas)
// + compras complementarias (≈1,0 % de ventas: la guía de 100.000 M en 2030 incluye compras; 2021-2025 gastaron 17.300 M en ellas).
const a = (periodo, g, m, cx, fijo = false, da = 3.7) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: 18.5, tasa_impositiva_pct: 25, fijo });
const anios = [
  a('2026e', 6.0, 20.6, 4.6, true, 3.9),
  a('2027e', 8.0, 21.0, 6.5, false, 3.8),
  a('2028e', 7.0, 21.2, 6.4),
  a('2029e', 6.0, 21.3, 6.2),
  a('2030e', 5.0, 21.3, 5.9),
  a('2031e', 4.5, 21.3, 5.7),
  a('2032e', 4.0, 21.3, 5.4),
  a('2033e', 3.5, 21.3, 5.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -8.0, margen_pp: -2.0 }, { periodo: '2028e', crecimiento_pp: -5.0, margen_pp: -1.8 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
// BPA propio: ventas × (margen EBITDA − amortización) + resultado financiero recurrente, × (1 − 25 %), − minoritarios, ÷ 413,326 M acciones.
// Cuadre con 2025: 69.674 × (20,46 % − 3,59 %) = 11.749; − 551 = 11.198; × 0,743 (impuesto real 25,7 %) − 50 = 8.272 → 20,01 SEK.
const VENTAS_2025 = 69674, ACC = 413.326;
const FIN = { '2026e': -600, '2027e': -560, '2028e': -500 };
const MIN = { '2026e': 55, '2027e': 60, '2028e': 65 };
export function bpa(caso, hasta = '2028e') {
  let v = VENTAS_2025; const out = {};
  for (const y of anios) {
    const p = (caso.perfil || []).find((q) => q.periodo === y.periodo);
    const dg = y.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = y.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (y.crecimiento_pct + dg) / 100;
    const ebit = v * (y.margen_ebitda_pct + dm - y.amortizacion_pct_ventas) / 100;
    if (FIN[y.periodo] != null) out[y.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bpa: Math.round(((ebit + FIN[y.periodo]) * 0.75 - MIN[y.periodo]) / ACC * 100) / 100 };
    if (y.periodo === hasta) break;
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 3.17, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.25, coste_deuda_pct: 3.8, tasa_impositiva_pct: 25, peso_deuda_pct: 8 },
  terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: -0.5 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
