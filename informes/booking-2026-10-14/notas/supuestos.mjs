// Supuestos numéricos (Booking Holdings, corte 2026-10-14). Base: 2025 (26.917 M USD de ingresos; EBITDA ajustado 36,9 %).
// 2026e fijo: dos trimestres publicados y guía de crecimiento de un dígito alto (+8,5 %, consenso 29.250 M = +8,7 %).
const crec = [8.5, 8.0, 8.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
// Margen EBITDA (ajustado, con pagos en acciones como gasto): 36,9 % en 2025; el ahorro de transformación (≈650 M a final de 2027)
// lo sube a 38 %, por debajo del +15 % anual de EBITDA del plan a medio plazo. Se queda en 38 % (no seguimos subiendo).
const margen = [37.0, 37.5, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0, 38.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 5 ? 2.1 : 2.0,
  capex_pct_ventas: i < 5 ? 1.5 : 2.0,
  nwc_pct_ventas: -2.0,
  tasa_impositiva_pct: 21,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 21, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
};
