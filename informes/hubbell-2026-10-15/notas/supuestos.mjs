// Supuestos del DCF, escenarios y pesos de Hubbell (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// 2026e con NSI desde el 9-jun (≈330 M de ventas en 2026 y ≈240 M más en 2027 hasta el año completo) y DMC Power.
// Amortización: depreciación (≈1,7 % de ventas) + intangibles de compras (≈170 M en 2026, ≈200 M en 2027, que bajan con las ventas).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 23, tasa_impositiva_pct: 22, fijo });
export default {
  anios: [
    a('2026e', 17.2, 24.2, 4.0, 2.6, true),
    a('2027e', 10.0, 25.0, 4.1, 2.8),
    a('2028e', 7.5, 25.3, 4.0, 2.9),
    a('2029e', 7.0, 25.3, 3.8, 3.0),
    a('2030e', 6.5, 25.3, 3.6, 3.0),
    a('2031e', 5.5, 25.3, 3.4, 3.1),
    a('2032e', 4.5, 25.3, 3.3, 3.2),
    a('2033e', 3.5, 25.3, 3.2, 3.2),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 22, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 4.0, otros_pct: 7.2 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 3.0 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
