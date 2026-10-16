// Supuestos del DCF, escenarios y pesos de Sungrow (corte 2026-10-16). CNY, ejercicio natural, base NIIF 2025.
// 2026e casi cerrado (1S26 publicado): ventas ≈ 30.912 M del 1S + ≈ 37.100 M del 2S (−19 % frente al 2S25).
// Margen EBITDA recurrente del 1S26 ≈ 20,6 % sin las ganancias de valor razonable; baja hacia el 17,5 % por la
// competencia en almacenamiento. Capex alto los primeros años (fábricas fuera de China) y converge a 2,2 %.
const a = (periodo, g, m, fijo = false, am = 1.9, cx = 3.0) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 9.0, tasa_impositiva_pct: 16.0, fijo });
export default {
  anios: [
    a('2026e', -23.5, 20.5, true),
    a('2027e', 12.0, 20.0, false, 2.0, 3.0),
    a('2028e', 10.0, 19.5, false, 2.0, 2.8),
    a('2029e', 8.0, 19.0, false, 2.0, 2.6),
    a('2030e', 6.0, 18.5, false, 2.0, 2.4),
    a('2031e', 5.0, 18.0, false, 2.0, 2.3),
    a('2032e', 3.5, 17.5, false, 2.0, 2.2),
    a('2033e', 2.5, 17.5, false, 2.0, 2.2),
  ],
  wacc: { tasa_libre_pct: 1.66, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 3.4, tasa_impositiva_pct: 16.0, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -14.0, precio_pct: -4.0, otros_pct: -5.5 },
    { periodo: '2027e', volumen_pct: 15.0, precio_pct: -4.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 13.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 10.5, precio_pct: -2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 8.0, precio_pct: -2.0, otros_pct: 0 },
  ],
  // mercado_final en null: la cuota publicada (25,2 %) es solo de inversores por volumen; la prueba de cuota se hace a mano (textos).
  mercado_final: null,
};
