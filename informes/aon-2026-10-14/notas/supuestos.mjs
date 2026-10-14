// Supuestos del DCF, escenarios y pesos de Aon (AON), corte 2026-10-14. USD, ejercicio natural, US GAAP.
// USI entra en la proyección desde 2027e (cierre previsto en el 4T26); su precio (17.000 M) va al puente como deuda.
// Margen EBITDA en base publicada: incluye la reestructuración (Aon United, 2026) y los costes de integración de USI (2027-2028).
// Amortización = inmovilizado y software (≈2,2 %); la de intangibles comprados no se proyecta (conservador en impuestos).
// Capex = capex propio (1,5 %) + compras pequeñas de corretaje (≈1,0 %).
const a = (periodo, g, m, fijo = false, cx = 2.5, am = 2.2) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 9.0, tasa_impositiva_pct: 21.0, fijo });
export default {
  anios: [
    a('2026e', 4.3, 31.5, true),
    a('2027e', 22.9, 31.0),
    a('2028e', 5.0, 32.5),
    a('2029e', 5.0, 33.5),
    a('2030e', 4.5, 34.0),
    a('2031e', 4.0, 34.5),
    a('2032e', 3.5, 34.5),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 21.0, peso_deuda_pct: 35.0 },
  terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 13.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: 10.5 },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 15.5 },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: -0.7 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 18.4 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
