// Supuestos del DCF, escenarios y pesos de Unicharm (corte 2026-10-15). Millones de JPY, NIIF, ejercicio enero-diciembre (etiqueta «fin»).
// Margen EBITDA = beneficio operativo básico + otros ingresos − otros gastos + amortizaciones (incluye arrendamientos NIIF 16).
// 2026e: guía revisada del 5-ago (ventas 1.015.000, básico 113.000); 2027e-2028e, recuperación parcial del margen tras el golpe del SAP y la logística.
const a = (periodo, g, m, cx = 4.8, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.6, capex_pct_ventas: cx, nwc_pct_ventas: 6.0, tasa_impositiva_pct: 30, fijo });
export default {
  anios: [
    a('2026e', 7.4, 15.7, 4.0, true),
    a('2027e', 4.5, 17.1),
    a('2028e', 4.5, 17.4),
    a('2029e', 4.0, 17.6),
    a('2030e', 4.0, 17.8),
    a('2031e', 3.0, 17.8, 4.6),
    a('2032e', 2.5, 17.8, 4.6),
  ],
  wacc: { tasa_libre_pct: 3.015, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 2.5, tasa_impositiva_pct: 30, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 2.9 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
