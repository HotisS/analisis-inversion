// Supuestos del DCF, escenarios y pesos de GTT (corte 2026-10-26, tras la actividad del 3T26). Ejercicio natural, EUR, NIIF-UE.
// EBITDA recurrente (sin los 48,7 M no corrientes de Elogen de 2025): 541,8 M en 2025, un 67,5 % de las ventas.
// Cambios frente al 16-oct: 2026e baja a 757 M (9M26 de 570,1 M; 3T de 182,8 M, −13,3 %) y margen del 67,0 % (más gasto en
// servicios); 2027-2028 con margen del 66,5 %; 2029-2030 algo mejores por los 71 metaneros de 9M26 (entregas en 2028-2030) y el
// desplazamiento de entregas a sus fechas contractuales. WACC: Bund del 23-oct (3,39 %) y beta reapalancada con la deuda de GTT.
const a = (periodo, g, m, am, cx, nwc, t, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', -5.7, 67.0, 3.8, 4.0, 0.5, 15.0, true),
    a('2027e', 8.0, 66.5, 3.6, 3.8, 1.0, 15.5),
    a('2028e', 9.8, 66.5, 3.4, 3.6, 1.0, 16.0),
    a('2029e', 3.0, 66.0, 3.3, 3.5, 1.0, 16.0),
    a('2030e', -2.0, 65.5, 3.3, 3.5, 1.0, 16.5),
    a('2031e', -3.0, 65.0, 3.3, 3.5, 1.0, 16.5),
    a('2032e', 2.5, 65.0, 3.3, 3.5, 1.0, 17.0),
  ],
  // Beta: ajustada (Blume) mensual a 5 años frente al STOXX Europe 600 = 0,80 con D/E de mercado del 1,4 % (104,7 M de deuda con
  // arrendamientos frente a 7.600 M de capitalización); desapalancada 0,79; reapalancada con la misma estructura = 0,80.
  wacc: { tasa_libre_pct: 3.39, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 1.4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -9.0, precio_pct: 1.0, otros_pct: 2.3 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 8.3, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: -3.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA (publicado, sin no recurrentes previstos) = (ventas × (margen EBITDA − amortización) + 5 M de financiero) × (1 − impuesto) ÷ 37,15 M
  // 2026e 10,99; 2027e 11,81; 2028e: bajista 11,53, base 12,92, alcista 13,73 (cálculo en revision-12m)
  bpa_12m: { Bajista: 11.53, Base: 12.92, Alcista: 13.73 },
  per_historico: { base: 'adelantado', actual: 17.36, mediana_5a: 14.25, minimo_5a: 11.56, media_larga: 16.99 },
  comparables_per: 12.8,
};
