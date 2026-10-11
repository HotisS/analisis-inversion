// Supuestos del DCF y de los escenarios (Gartner, corte 2026-10-11). Millones de USD; ejercicio natural.
// Base: 2025 real (ventas 6.497,2 M con 227,4 M de Digital Markets, vendida el 5-feb-2026; EBITDA GAAP 1.226 M + 150 M de deterioro = 1.376 M, 21,2 %).
// El EBITDA del DCF es GAAP: lleva dentro los pagos en acciones (2,4 % de ventas) y los despidos recurrentes.
// 2026e: guía de ago-2026 (ingresos ≥ 6.375 M, EBITDA ajustado ≥ 1.570 M) y consenso MarketScreener (6.417 M; 1.607 M ajustado → ≈ 1.453 M GAAP, 22,6 %).
//   1S26 publicado (EBITDA GAAP 779,7 M, 24,5 %): año fijo.
// 2027e-2028e: consenso +4,0 % y +4,8 %; margen ajustado 25,2-25,3 % → 22,8-22,9 % GAAP. Base por debajo del consenso en crecimiento (CV +2 %).
// Amortización: 3,1 % de ventas en 2025 con la de intangibles de CEB, que se agota; capex 1,8 % (2025) y 1,4 % LTM.

export const modelo = [
  //  periodo   crec   margen amort capex  nwc    tasa  fijo
  ['2026e', -1.2, 22.6, 2.9, 1.6, -36.0, 24.5, true],
  ['2027e', 2.5, 22.9, 2.7, 1.7, -36.0, 24.5, false],
  ['2028e', 3.5, 23.2, 2.5, 1.8, -36.0, 24.5, false],
  ['2029e', 4.0, 23.4, 2.3, 1.9, -36.0, 24.5, false],
  ['2030e', 4.0, 23.5, 2.1, 2.0, -36.0, 24.5, false],
  ['2031e', 3.5, 23.5, 2.0, 2.0, -36.0, 24.5, false],
  ['2032e', 3.0, 23.5, 2.0, 2.0, -36.0, 24.5, false],
  ['2033e', 3.0, 23.5, 2.0, 2.0, -36.0, 24.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro a 10 años del 9-oct-2026, 5,24 % [D40]. Beta ajustada mensual a 5 años frente al SPY 0,97 [D4];
// Damodaran «Information Services» reapalancada ≈ 0,84 [D31]. Coste de la deuda marginal 5,6 % (bonos 2035 al 5,60 %) [A22].
// Peso de la deuda a mercado ≈ 19,9 % [D1, D5].
export const wacc = { tasa_libre_pct: 5.24, beta: 0.97, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 25.0, peso_deuda_pct: 19.9 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA generativa erosiona Insights como el CV de Forrester (−6 % en 2025, −3 % a jun-2026): ingresos a la baja
  // (≈ −1,5 % anual) y cuatro puntos menos de margen (el EBITDA GAAP volvería al 19-20 % de 2019-2020 y del 2S25), con g terminal del 1,5 %.
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el CV vuelve al 6-8 % de 2023-2024 con la IA como motor de demanda y el margen sube con el apalancamiento operativo.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran, T12m con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D30]' };
