// Supuestos del DCF, escenarios y pesos de Colgate-Palmolive (corte 2026-10-14). USD, ejercicio natural, US GAAP.
// Margen EBITDA del DCF = margen base (sin deterioros) menos ≈0,2-0,3 puntos de reestructuración casi recurrente; 2026e incluye los
// costes del Strategic Growth and Productivity Program (305 M antes de impuestos en el 1S26).
const a = (periodo, g, m, fijo = false, am = 3.0, cx = 3.0) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.0, tasa_impositiva_pct: 23.5, fijo });
export default {
  anios: [
    a('2026e', 4.5, 23.0, true),
    a('2027e', 3.3, 23.9),
    a('2028e', 3.5, 24.1),
    a('2029e', 3.5, 24.2),
    a('2030e', 3.5, 24.2),
    a('2031e', 3.2, 24.2),
    a('2032e', 3.0, 24.2, false, 3.0, 3.1),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.68, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 23.5, peso_deuda_pct: 9.6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.3, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.9, precio_pct: 1.8, otros_pct: 1.8 },
    { periodo: '2027e', volumen_pct: 1.3, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  bpa: { Bajista: 3.83, Base: 4.28, Alcista: 4.55 },
};
