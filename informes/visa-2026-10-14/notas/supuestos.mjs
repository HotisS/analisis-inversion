// Supuestos numéricos (Visa, corte 2026-10-14). Base: FY2025 real (40.000 M USD). FY = año en que termina (septiembre).
// FY2026e casi cerrado: 3 trimestres publicados (≈33.700 M) + 4T al ritmo de la guía (≈12.000 M) = ≈45.700 M (+14,3 %).
// Margen EBITDA en base «económica» para la clase A: sin las provisiones de litigios cubiertos (las paga la cuenta de garantía
// financiada con la clase B), pero con indemnizaciones y remuneración en acciones. FY2025 ajustado: 67,7 % operativo + 3,0 % de
// amortización ≈ 70,7 %; FY2026e lleva 563 M de indemnizaciones y 237 M del MDL (≈1,7 puntos).
const crec = [14.3, 11.0, 10.5, 10.0, 9.5, 9.0, 8.5, 7.5, 6.5, 5.0];
const margen = [69.5, 70.5, 70.5, 70.5, 70.5, 70.5, 70.5, 70.5, 70.5, 70.5];
const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.0,
  capex_pct_ventas: i < 5 ? 3.6 : 3.3,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 18.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 18.0, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 2.3 },
    { periodo: 'FY2027e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 7.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 7.0, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
