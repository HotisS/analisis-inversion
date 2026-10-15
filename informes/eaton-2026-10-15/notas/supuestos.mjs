// Supuestos del DCF, escenarios y pesos de Eaton (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA contable (después de reestructuraciones, costes de compras y de la separación de Mobility; antes de la amortización de intangibles).
// El DCF valora el grupo entero con Mobility: el canje con Dana cambia acciones de Eaton por acciones de la nueva empresa a valor de mercado (neutro en valor por acción).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 19, tasa_impositiva_pct: 19, fijo });
export default {
  anios: [
    a('2026e', 20.0, 22.5, 4.4, 3.4, true),
    a('2027e', 11.5, 23.5, 4.4, 3.4),
    a('2028e', 10.0, 24.5, 4.2, 3.4),
    a('2029e', 9.0, 25.0, 4.0, 3.4),
    a('2030e', 8.0, 25.5, 3.8, 3.4),
    a('2031e', 7.0, 25.5, 3.6, 3.4),
    a('2032e', 7.0, 25.5, 3.5, 3.4),
    a('2033e', 6.0, 25.5, 3.4, 3.4),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 19, peso_deuda_pct: 11.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: true, anios: 8, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 10.0, precio_pct: 2.0, otros_pct: 8.0 },
    { periodo: '2027e', volumen_pct: 9.0, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
