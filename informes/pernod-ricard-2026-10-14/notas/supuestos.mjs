// Supuestos del DCF, escenarios y pesos de Pernod Ricard (corte 2026-10-14). Ejercicio a junio, etiqueta «fin».
const a = (periodo, g, m, cx = 8.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.9, capex_pct_ventas: cx, nwc_pct_ventas: 0, tasa_impositiva_pct: 25, fijo: false });
export default {
  anios: [
    a('FY2027e', -2.0, 30.6, 7.5),
    a('FY2028e', 2.0, 30.9, 9.0),
    a('FY2029e', 2.5, 31.2, 9.0),
    a('FY2030e', 2.5, 31.4, 9.0),
    a('FY2031e', 2.5, 31.5, 9.0),
    a('FY2032e', 2.0, 31.5, 9.0),
    a('FY2033e', 2.0, 31.5, 8.0),
  ],
  wacc: { tasa_libre_pct: 3.53, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.8, tasa_impositiva_pct: 25, peso_deuda_pct: 40 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 50 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: -1.0, precio_pct: 1.0, otros_pct: -2.0 },
    { periodo: 'FY2028e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
