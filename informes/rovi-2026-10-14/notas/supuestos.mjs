// Supuestos numéricos (Rovi, corte 2026-10-14). Base: 2025 real (743,5 M de ingresos operativos, EBITDA 216,2 M).
// 2026e fijo: guía de 0-10 % (de un dígito bajo a medio) y 1S26 con EBITDA sin badwill de 58,8 M; el badwill de 62,4 M no entra.
const crec = [3.0, 11.0, 8.0, 5.5, 4.5, 4.0, 3.5, 3.0];
const margen = [26.0, 28.5, 29.5, 30.0, 30.0, 30.0, 30.0, 30.0];
const capex = [10.0, 8.5, 8.0, 7.5, 7.0, 6.5, 6.5, 6.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i < 2 ? 4.3 : 4.6,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 42,
  tasa_impositiva_pct: 23,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 23, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: -1.0, otros_pct: 2.5 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: 0.0, otros_pct: 4.0 },
    { periodo: '2028e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
