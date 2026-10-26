// Supuestos del DCF, escenarios y pesos de LSEG (corte 2026-10-26). Cambios frente al 14-oct: 2026e +7,4 % y 51,3 % (guía del 3T26), 2027e +7,0 % (suscripciones ≈ 7 %), márgenes +0,1 pp, gilt 5,33 %.
// Octus y Trumid (sin cerrar) quedan fuera de la proyección y del puente: se tratan como de valor neutro (neutrales para el BPA ajustado en 2028 según la empresa). GBP, ejercicio natural. Ingresos = total income excl. recoveries.
// Margen = EBITDA ajustado menos ≈0,5 pp de reestructuración recurrente. Amortización = la ajustada (inmovilizado propio, software);
// la de intangibles comprados (Refinitiv, SwapClear) no es coste de caja y queda fuera (los impuestos se calculan sin su ahorro: prudente).
const a = (periodo, g, m, am, cx, fijo = false, nwc = -5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 24.5, fijo });
export default {
  anios: [
    a('2026e', 7.4, 51.3, 11.0, 9.5, true, -8),
    a('2027e', 7.0, 51.9, 10.8, 9.0, false, -7),
    a('2028e', 6.5, 52.4, 10.5, 8.5, false, -6),
    a('2029e', 6.0, 52.8, 10.0, 8.0),
    a('2030e', 5.0, 52.9, 9.3, 8.0),
    a('2031e', 4.0, 53.0, 8.6, 8.0),
    a('2032e', 3.5, 53.0, 8.0, 8.0),
  ],
  wacc: { tasa_libre_pct: 5.33, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 24.5, peso_deuda_pct: 22 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // Ingresos: volumen = clientes y uso (datos, contratos, activos indexados); precio = subidas anuales de suscripción; otros = divisa y perímetro.
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.4, precio_pct: 3.3, otros_pct: -0.3 },
    { periodo: '2027e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  // Mercado final: gasto mundial en datos y análisis (Burton-Taylor) ≈ 70.000 M USD en 2030e (ficha sectorial), en GBP a 1,3154.
  // Prueba de cuota a mano (el motor dividiría los ingresos del grupo, con Markets, entre un mercado que no incluye Markets).
  mercado_final: null,
};
