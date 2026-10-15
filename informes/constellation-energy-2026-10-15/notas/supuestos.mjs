// Supuestos del DCF, escenarios y pesos de Constellation Energy (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA antes de la amortización del combustible nuclear y de la actualización de las obligaciones de desmantelamiento
// (las dos van en «amortizaciones», como en el estado de flujos y en el XBRL), y sin el MtM no realizado de las coberturas.
// Capex = inversión del estado de flujos, que incluye las compras de combustible nuclear (≈ 29 % del capex de 2026-2027).
// 2026e lleva Calpine (cerrada el 7-ene-2026); 2027e pierde las centrales vendidas a LS Power (≈ 5 GW de gas).
const a = (periodo, g, m, capex, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 10.0, capex_pct_ventas: capex, nwc_pct_ventas: 10.0, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('2026e', 40.0, 29.5, 16.0, true),
    a('2027e', -1.0, 30.5, 13.3),
    a('2028e', 4.5, 31.5, 12.0),
    a('2029e', 4.5, 31.5, 11.5),
    a('2030e', 4.0, 31.5, 11.0),
    a('2031e', 3.5, 31.5, 10.5),
    a('2032e', 3.0, 31.0, 10.5),
    a('2033e', 2.5, 31.0, 10.5),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 25.5, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 38.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: -4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 670000 },
  // BPA ajustado propio (misma base que el BPA ajustado de la empresa), de la proyección: ventas × margen − amortización
  // − intereses (≈ 1.050 M) − impuestos (25,5 %) − minoritarios, entre acciones (359 M en 2026, 350 M en 2027, 346 M en 2028).
  bpa: { '2026e': 12.14, '2027e': 13.21, '2028e': { Bajista: 12.54, Base: 14.85, Alcista: 16.71 } },
};
