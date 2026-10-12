// Supuestos del DCF y escenarios (Betsson AB, corte 2026-10-12). Millones de EUR.
// Base 2025 real: ingresos 1.197,0 M, EBITDA 313,6 M (26,2 %) [A].
// 2026e: 1S26 real 595,5 M y EBITDA 108,4 M (18,2 %). 2S26 = B2C del 2S25 (452 M) +15 % (ritmo del 1S26) + B2B ~98 M (nivel del 1S26)
//   + Rhino desde el 3-ago (≈25 M, estimación: la empresa no publica sus ingresos) ≈ 643-660 M → ≈1.245 M (+4,0 %). Consenso 1.284 M (+7,3 %).
//   Margen 19,0 % (EBITDA ≈236,5 M; consenso 243,8 M): 2S26 ≈ 20,4 % por el Mundial, Rhino (13,7 M EBITDA/año) y el apalancamiento.
// Capex con pagos de arrendamiento (NIIF 16): 5,4 % + 0,7 % en 2025; desarrollo capitalizado 41,6 M > amortización.

export const anios = [
  { periodo: '2026e', crecimiento_pct: 4.0, margen_ebitda_pct: 19.0, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.8, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: true },
  { periodo: '2027e', crecimiento_pct: 6.0, margen_ebitda_pct: 19.5, amortizacion_pct_ventas: 5.3, capex_pct_ventas: 5.8, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
  { periodo: '2028e', crecimiento_pct: 5.5, margen_ebitda_pct: 20.0, amortizacion_pct_ventas: 5.2, capex_pct_ventas: 5.7, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
  { periodo: '2029e', crecimiento_pct: 5.0, margen_ebitda_pct: 20.5, amortizacion_pct_ventas: 5.2, capex_pct_ventas: 5.6, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
  { periodo: '2030e', crecimiento_pct: 4.5, margen_ebitda_pct: 21.0, amortizacion_pct_ventas: 5.2, capex_pct_ventas: 5.5, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
  { periodo: '2031e', crecimiento_pct: 3.5, margen_ebitda_pct: 21.0, amortizacion_pct_ventas: 5.2, capex_pct_ventas: 5.5, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
  { periodo: '2032e', crecimiento_pct: 2.5, margen_ebitda_pct: 21.0, amortizacion_pct_ventas: 5.2, capex_pct_ventas: 5.4, nwc_pct_ventas: 16.0, tasa_impositiva_pct: 23.0, fijo: false },
];

export const wacc = { tasa_libre_pct: 3.53, beta: 0.87, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23.0, peso_deuda_pct: 13.0 };
export const terminal = { metodo: 'media', crecimiento_pct: 2.0, multiplo_salida: 6.5 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -28.0, margen_pp: -6.0 }] },
  { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 };

// Mercado final: el GGR online europeo (EGBA/H2GC) es ≈70 % del perímetro de la cuota de B; perímetro equivalente = Europa / 0,70.
// 2030e: 66.800 M (2029e) × 1,069 = 71.409 M de Europa → 102.013 M equivalentes.
export const sostenibilidad = {
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 2.0, otros_pct: -7.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.5 },
  ],
  mercado_final: { periodo: '2030e', tamano: 102013 },
  veredicto: 'En parte',
};
