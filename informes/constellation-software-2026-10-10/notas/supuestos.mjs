// Supuestos del DCF y de los escenarios (Constellation Software, corte 2026-10-10). Millones de USD; ejercicio natural.
// Base: 2025 real (ingresos 11.623 M; EBITDA 28,2 %; EBIT 16,3 %, con ≈ 1.200 M de amortización de intangibles adquiridos).
// Constellation crece comprando: el crecimiento orgánico es del 2-4 % (1 % sin divisa en el 2T26) y el resto llega por adquisiciones.
// Para no contar ese crecimiento gratis, las adquisiciones van como inversión: cada punto de crecimiento comprado cuesta ≈ 1,3 veces
// las ventas adquiridas (2025: ≈ 11,5 puntos de crecimiento adquirido con 1.340 M en compras netas de caja más los pagos aplazados).
// capex = adquisiciones (≈ 1,3 × crecimiento adquirido) + capex propio (0,6 %) + altas de derechos de uso (≈ 1 %).
// 2026e fijo: dos trimestres publicados (+19 % en el 1S26) y 818 M comprometidos tras el balance; el consenso da 13.819 M (+18,9 %).
// La amortización (11,9 % de las ventas en 2025, sobre todo intangibles adquiridos) converge al capex cuando se frenan las compras.

export const modelo = [
  //  periodo   crec   margen  amort  capex  nwc     tasa   fijo
  ['2026e', 18.9, 28.0, 12.0, 18.0, -18.0, 25.0, true],
  ['2027e', 14.0, 28.0, 11.8, 15.9, -18.0, 25.0, false],
  ['2028e', 12.0, 28.0, 11.4, 13.3, -18.0, 25.0, false],
  ['2029e', 11.0, 28.0, 11.0, 12.0, -18.0, 25.0, false],
  ['2030e', 10.0, 28.0, 10.5, 10.7, -18.0, 25.0, false],
  ['2031e', 9.0, 28.0, 10.0, 9.4, -18.0, 25.0, false],
  ['2032e', 8.0, 28.0, 9.0, 8.1, -18.0, 25.0, false],
  ['2033e', 7.0, 28.0, 8.0, 6.8, -18.0, 25.0, false],
  ['2034e', 6.0, 28.0, 7.0, 5.5, -18.0, 25.0, false],
  ['2035e', 5.0, 28.0, 5.5, 5.5, -18.0, 25.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años (FRED DGS10, 8-oct-2026), porque los flujos están en USD. Beta 0,79: mensual a 5 años
// de la acción en USD frente al S&P 500 (0,69) ajustada por Blume. Deuda a valor de mercado: 4.196 + 445 = 4.641 M frente a 44.603 M: 9,4 %.
export const wacc = { tasa_libre_pct: 5.22, beta: 0.79, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.3, tasa_impositiva_pct: 25.0, peso_deuda_pct: 9.4 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA generativa abarata el software a medida y erosiona el poder de precios del mantenimiento (orgánico negativo, como el −19 %
  // de Altera en el 2T26 o las licencias, −8 % en 2025) y la competencia por las compras sube los precios y baja el volumen invertido.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el orgánico vuelve al 4-5 % (2021-2022), la IA baja costes de desarrollo y soporte y el capital desplegado sube con compras grandes.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 10, suma_partes: 0, escenarios: 20 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(anios); }
