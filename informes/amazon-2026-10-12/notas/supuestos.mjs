// Supuestos del DCF y de los escenarios (Amazon, corte 2026-10-12). Millones de USD; ejercicio natural; US GAAP.
// Base: 2025 real (ingresos 716.924 M; EBITDA 125.152 M = beneficio operativo + D&A de inmovilizado —con arrendamiento financiero— e intangibles + 2.500 M de la FTC).
// Criterio: los arrendamientos operativos son gasto dentro del EBITDA (no van a la deuda); los contenidos, gasto dentro del margen.
// Capex del DCF = capex neto de incentivos + principal de arrendamientos financieros y financing obligations (≈ 0,3 % de las ventas),
// porque esos activos no pasan por el capex del estado de flujos y su deuda sí está en el puente.
// 2026e (fijo): H1 real 382,2 bn de ventas y 51,3 bn de EBIT; guía 3T 197-202 bn y 22,5-26,5 bn; 4T al +14 %: ≈ 826 bn (+15,2 %), EBIT ≈ 104 bn (12,6 %).
// Capex 2026: guía de ≈ 220.000 M en caja (conferencia 2T26) → 26,4 % de las ventas con los arrendamientos.

export const modelo = [
  //  periodo   crec   margen  amort  capex  nwc   tasa   fijo
  ['2026e', 15.2, 19.8, 7.2, 26.4, -2.0, 19.0, true],
  ['2027e', 14.0, 23.0, 8.6, 25.0, -2.0, 19.0, false],
  ['2028e', 13.5, 26.0, 9.6, 22.0, -2.0, 19.0, false],
  ['2029e', 12.0, 27.5, 10.2, 19.0, -2.0, 19.0, false],
  ['2030e', 10.5, 28.6, 10.6, 16.5, -2.0, 19.0, false],
  ['2031e', 9.5, 29.4, 10.8, 14.5, -2.0, 19.0, false],
  ['2032e', 8.5, 30.0, 10.9, 13.0, -2.0, 19.0, false],
  ['2033e', 7.5, 30.5, 11.0, 12.0, -2.0, 19.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro a 10 años (FRED DGS10, 8-oct-2026) 5,22 %. Beta 1,32: media de la ajustada mensual a 5 años (1,33) y la ajustada semanal a 5 años (1,31) frente al SPY.
// Coste de la deuda: bono a 10 años de julio de 2026 al 5,34 %. Peso de la deuda: 5,1 % (deuda + arrendamientos financieros sobre deuda + capitalización).
export const wacc = { tasa_libre_pct: 5.22, beta: 1.32, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.34, tasa_impositiva_pct: 21.0, peso_deuda_pct: 5.1 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: true, anios: 7, margen_final_pct: null };

export const casos = [
  // Bajista: exceso de capacidad de IA (como la nube en 2022-23: AWS pasó del +37 % al +12 %) y guerra de precios con Azure, Google y Oracle; tiendas con aranceles.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la cartera de AWS (496.000 M) se convierte en ventas al ritmo actual y la publicidad sigue al +20 %.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 10, escenarios: 25 };
