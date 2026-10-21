// Supuestos del DCF, escenarios y pesos de Apple (corte 2026-10-21). Ejercicio a finales de septiembre, etiquetado por el
// año en que termina (FY2026 = 28-sep-2025 a 26-sep-2026: CERRADO pero aún sin publicar; resultados el 2-nov-2026).
// Millones de USD. El motor parte del último ejercicio publicado (FY2025).
// FY2026e (fijo): 9M reales (364.357 M de ventas; EBIT 122.432 + D&A 9.973) + 4T con la guía (ventas ≈ 113.000 M, +10 %;
// margen bruto 47,5 %; gastos 19.250 M; D&A ≈ 3.400) → ventas 477.357 (+14,7 %), EBITDA ≈ 170.200 (35,65 %).
// FY2027e: +8,0 % (consenso +10,4 %): la memoria limita unidades y margen; FY2028e en adelante, convergencia al 3 %.
// Margen EBITDA: 34,6 % en FY2027e (sin reembolsos de aranceles, memoria más cara, I+D de IA +30 %), 35 % después.
const g = [14.7, 8.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [35.65, 34.6, 34.9, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0, 35.0];
const am = [2.8, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9, 2.9];
const cx = [2.2, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const anios = g.map((x, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -5.5, tasa_impositiva_pct: 17.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.05, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 17.5, peso_deuda_pct: 1.7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 22.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 1.5 },
    { periodo: 'FY2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: 'FY2030e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: 'FY2031e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 1.0 },
  ],
  mercado_final: null,
};
