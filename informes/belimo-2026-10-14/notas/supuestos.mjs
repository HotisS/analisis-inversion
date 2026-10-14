// Supuestos del DCF, escenarios y BPA propio de Belimo (corte 2026-10-14). CHF, ejercicio natural.
// Amortización 3,4 % de ventas (incluye derechos de uso). Capex alto en 2026-27 por la ampliación de capacidad, baja hacia 4,5 %.
const a = (periodo, g, m, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.4, capex_pct_ventas: cx, nwc_pct_ventas: 27, tasa_impositiva_pct: 18.5, fijo });
const anios = [
  a('2026e', 19.0, 24.8, 7.0, true),
  a('2027e', 13.0, 25.5, 6.8),
  a('2028e', 11.0, 25.5, 6.4),
  a('2029e', 9.5, 25.5, 5.9),
  a('2030e', 8.0, 25.5, 5.7),
  a('2031e', 7.0, 25.5, 5.5),
  a('2032e', 6.0, 25.5, 5.4),
  a('2033e', 5.0, 25.5, 5.2),
  a('2034e', 4.0, 25.5, 5.0),
  a('2035e', 3.0, 25.5, 4.9),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
// BPA propio: ventas × margen EBITDA − amortización (3,4 %) + resultado financiero recurrente (−6 M) − impuestos (18,5 %), ÷ 12,3 M acciones.
const V0 = 1120.8, ACC = 12.3, RF = -6, T = 0.185;
export function bpa(caso) {
  let v = V0; const out = {};
  for (const y of anios) {
    const fijo = y.fijo;
    const g = y.crecimiento_pct + (fijo ? 0 : caso.ajuste_crecimiento_pp);
    const m = y.margen_ebitda_pct + (fijo ? 0 : caso.ajuste_margen_pp);
    v = v * (1 + g / 100);
    const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
    out[y.periodo] = { ventas: +v.toFixed(1), ebit: +ebit.toFixed(1), bpa: +(((ebit + RF) * (1 - T)) / ACC).toFixed(2) };
  }
  return out;
}
export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 18.5, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 20.5, precio_pct: 3.0, otros_pct: -4.5 },
    { periodo: '2027e', volumen_pct: 11.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 9.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 7000 },
};
