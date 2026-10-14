// Supuestos del DCF y de los escenarios (Nvidia, corte 2026-10-14). Ejercicio = año en que termina (FY2027 = feb-26 a ene-27).
const a = (periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct: 16, fijo,
});

export default {
  anios: [
    a('FY2027e', 92, 68, 1.2, 2.6, 26, true),
    a('FY2028e', 55, 66, 1.3, 2.6, 25),
    a('FY2029e', 15, 63, 1.4, 2.6, 24),
    a('FY2030e', -3, 59, 1.6, 2.5, 23),
    a('FY2031e', 5, 57, 1.8, 2.5, 22),
    a('FY2032e', 6, 56, 1.9, 2.5, 22),
    a('FY2033e', 6, 55, 2.0, 2.5, 22),
    a('FY2034e', 5, 54, 2.0, 2.5, 22),
    a('FY2035e', 5, 53, 2.0, 2.5, 22),
    a('FY2036e', 4, 53, 2.0, 2.5, 22),
  ],
  wacc: { tasa_libre_pct: 5.22, beta: 1.4, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 16, peso_deuda_pct: 0.6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 78, precio_pct: 14, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 43, precio_pct: 12, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 12, precio_pct: 3, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: -5, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4, precio_pct: 1, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1, ajuste_margen_pp: -8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
      perfil: [ { periodo: 'FY2028e', crecimiento_pp: -30, margen_pp: -5 }, { periodo: 'FY2029e', crecimiento_pp: -25, margen_pp: -8 }, { periodo: 'FY2030e', crecimiento_pp: -10, margen_pp: -10 } ] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [ { periodo: 'FY2028e', crecimiento_pp: 15, margen_pp: 0 }, { periodo: 'FY2029e', crecimiento_pp: 15, margen_pp: 3 }, { periodo: 'FY2030e', crecimiento_pp: 10, margen_pp: 4 } ] },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
