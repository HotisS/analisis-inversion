// Supuestos del DCF y de los escenarios (Cochlear, corte 2026-10-08).
// Base: FY2026 real (ingresos 2.347,6 M; EBITDA subyacente 538,6 M = 22,9 %, sin cloud ni inversiones).
// FY2027e: guía de 330-350 M de beneficio subyacente (≈ 456 M de EBIT, ≈ 561 M de EBITDA subyacente, 23,8 %) y
// MENOS el gasto cloud del último año del programa (≈ 60 M después de impuestos ≈ 86 M antes), que es caja real
// aunque la empresa lo deje fuera del subyacente: margen del DCF 23,8 − 3,6 = 20,2 %.
// Desde FY2028e, sin cloud. Amortización y capex incluyen los derechos de uso (NIIF 16): pagos de arrendamientos ≈ 1,5 % de ventas.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e',  0.5, 20.2, 4.6, 6.0, 31.0, 25.5],
  ['FY2028e',  5.5, 24.5, 4.6, 5.6, 30.5, 25.5],
  ['FY2029e',  6.5, 25.3, 4.6, 5.4, 30.0, 25.5],
  ['FY2030e',  7.0, 26.0, 4.6, 5.3, 29.5, 25.5],
  ['FY2031e',  7.0, 26.5, 4.6, 5.3, 29.0, 25.5],
  ['FY2032e',  6.5, 27.0, 4.6, 5.2, 29.0, 25.5],
  ['FY2033e',  6.0, 27.0, 4.6, 5.2, 29.0, 25.5],
  ['FY2034e',  5.5, 27.0, 4.6, 5.2, 29.0, 25.5],
  ['FY2035e',  5.0, 27.0, 4.6, 5.2, 29.0, 25.5],
  ['FY2036e',  5.0, 27.0, 4.6, 5.2, 29.0, 25.5],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Sin deuda financiera: WACC = coste de los fondos propios. Beta ajustada (Blume) mensual a 5 años frente al S&P/ASX 200.
export const wacc = { tasa_libre_pct: 5.34, beta: 0.93, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15.0 };
export const etapa2 = { usar: true, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: los implantes de adultos en mercados desarrollados no recuperan (como en FY2026: ventas −1 % reportadas,
  // margen EBITDA subyacente −4,6 puntos) y China sigue bajando precios.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la medicalización devuelve a los adultos al ~10 % anual de antes de 2025 y el margen neto llega al 18 % del objetivo.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(anios); }
