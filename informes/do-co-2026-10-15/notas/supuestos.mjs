// Supuestos del DCF, escenarios y pesos de DO & CO (corte 2026-10-15). Ejercicio cerrado en marzo (FY2027e = abr-26 a mar-27), EUR.
// Capex = inversión en inmovilizado + altas de derechos de uso (NIIF 16: cocinas de aeropuerto alquiladas). Los arrendamientos van en el puente.
const a = (periodo, g, m, cx) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 3.6, capex_pct_ventas: cx, nwc_pct_ventas: 4.5, tasa_impositiva_pct: 26, fijo: false });
export default {
  anios: [
    a('2027e', 7.0, 12.3, 4.5),
    a('2028e', 8.0, 12.4, 4.5),
    a('2029e', 7.5, 12.5, 4.2),
    a('2030e', 6.5, 12.5, 3.8),
    a('2031e', 5.5, 12.5, 3.8),
    a('2032e', 4.5, 12.5, 3.8),
    a('2033e', 3.5, 12.5, 3.8),
  ],
  wacc: { tasa_libre_pct: 3.48, beta: 1.0, prima_mercado_pct: 5.0, prima_adicional_pct: 1.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 26, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: -2.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: -1.0 },
    { periodo: '2029e', volumen_pct: 5.5, precio_pct: 3.0, otros_pct: -1.0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: -0.5 },
    { periodo: '2031e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: -0.5 },
  ],
  mercado_final: null,
};
