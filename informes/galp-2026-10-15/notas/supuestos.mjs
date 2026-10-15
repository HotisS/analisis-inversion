// Supuestos del DCF, escenarios, pesos y objetivo a 12 meses de Galp (corte 2026-10-15). EUR, NIIF, base RCA.
// EBITDA RCA (sin efecto inventario ni partidas especiales). Capex = orgánico (~1.000 M) + compras + pagos de arrendamientos (NIIF 16: el EBITDA no lleva los alquileres de los FPSO).
// Macro: Brent 2026e ~92 USD de media (1S 92, 3T 97, 4T ~100); 2027e ~90 (curva: mar-27 99, dic-27 86); 2028e ~80 (dic-28 78); después 75 USD reales.
const a = (periodo, g, m, am, cx, fijo = false, t = 44) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.0, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', 30.2, 18.9, 3.2, 6.3, true), // 25.400 M de ventas, 4.800 M de EBITDA RCA (1S 2.216 + 3T ~1.400 + 4T ~1.200)
    a('2027e', -10.0, 18.0, 3.6, 5.8), // 22.860 M, 4.115 M
    a('2028e', -10.0, 17.5, 3.6, 6.0), // 20.575 M, 3.600 M
    a('2029e', 1.0, 17.0, 3.6, 5.5, false, 43),
    a('2030e', 1.5, 16.5, 3.7, 5.0, false, 42),
    a('2031e', 1.5, 16.5, 3.7, 4.6, false, 42),
    a('2032e', 1.5, 16.5, 3.8, 4.2, false, 42),
    a('2033e', 1.5, 16.5, 3.8, 4.0, false, 42),
  ],
  wacc: { tasa_libre_pct: 3.42, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 30, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 4.5 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 15, escenarios: 20 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.0, precio_pct: 22.2, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: -13.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: -11.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: -0.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // BPA RCA 2028e (ejercicio objetivo) de la proyección: (EBITDA − amortización − financiero 110 M) × (1 − 44 %) × (1 − 14 % de minoritarios) ÷ 722 M de acciones.
  // Base: 20.575 × 17,5 % = 3.601 − 741 − 110 = 2.750 → 1.540 → 1.324 → 1,83. Bajista: 19.500 × 15,5 % = 3.023 − 702 − 110 = 2.211 → 1,47. Alcista: 21.800 × 19,5 % = 4.251 − 785 − 110 = 3.356 → 2,24.
  // BPA 2027e base (para el PER actual): 22.860 × 18 % = 4.115 − 823 − 110 = 3.182 → 1.782 → 1.532 → 2,12.
  bpa12: { Bajista: 1.47, Base: 1.83, Alcista: 2.24 },
};
