// Supuestos numéricos del analista (Shimano, corte 2026-10-14). Base: 2025 (466.243 M JPY de ventas, margen EBITDA del 16,9 %).
// 2026e fijo con la guía de julio (ventas 491.000 M, explotación 47.000 M; amortización ≈ 29.000 M).
// Recuperación gradual del margen hacia el 21 %: por debajo del 22-23 % de antes de la pandemia (2019-2020) y muy por debajo
// del 30 % del pico 2021-22, porque el yen y la presión de precios de las bicicletas no dejan volver al pico.
const crec = [5.3, 4.0, 4.0, 3.5, 3.5, 3.0, 3.0, 2.5, 2.5, 2.5];
const margen = [15.5, 16.8, 18.0, 19.0, 19.5, 20.0, 20.0, 20.0, 20.0, 20.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 5.9 : 6.0,
  capex_pct_ventas: i < 2 ? 8.0 : 7.5,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 29,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.089, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 29, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 2.3 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
