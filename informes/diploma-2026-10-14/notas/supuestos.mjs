// Supuestos del DCF, escenarios y pesos de Diploma (corte 2026-10-14). Ejercicio a septiembre («fin»), GBP.
// EBITDA = EBIT estatutario + toda la amortización (también la de intangibles comprados), como en financieros.cuenta.
// FY2026e (cerrado el 30-sep-2026, sin publicar) va fijo: la guía de julio lo deja casi cerrado; el motor no cuenta su flujo (fracción 0).
// Capex = inmovilizado (≈1 %) + altas de derechos de uso (≈1 %) + compras pequeñas para el crecimiento comprado (≈1,6 veces las ventas compradas).
const a = (periodo, g, m, da, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: cx, nwc_pct_ventas: 19.5, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('FY2026e', 18.4, 27.4, 5.6, 14.4, true),
    a('FY2027e', 8.0, 26.4, 5.6, 2.2),
    a('FY2028e', 7.0, 26.3, 5.5, 5.4),
    a('FY2029e', 6.5, 26.2, 5.4, 5.4),
    a('FY2030e', 6.0, 26.0, 5.3, 5.4),
    a('FY2031e', 5.0, 26.0, 5.2, 5.3),
    a('FY2032e', 4.0, 26.0, 5.2, 5.2),
  ],
  wacc: { tasa_libre_pct: 5.39, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 25, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 12.0, precio_pct: 2.0, otros_pct: 4.4 },
    { periodo: 'FY2027e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 3.0 },
    { periodo: 'FY2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 2.0 },
    { periodo: 'FY2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 2.0 },
  ],
  mercado_final: null,
};
