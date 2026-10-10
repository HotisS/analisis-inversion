// Supuestos del DCF y de los escenarios (Intuit, corte 2026-10-10). Millones de USD; ejercicio a 31 de julio, nombrado por el año en que termina.
// Base: FY2026 real (ingresos 21.448 M; EBITDA GAAP de 6.730 M con 2.056 M de pagos en acciones dentro y 293 M de reestructuración).
// FY2027e: guía del 25-ago-2026 de ingresos de 23.279-23.512 M (+9-10 %) y beneficio operativo GAAP de 7.408-7.490 M; con ≈ 850 M
// de amortizaciones, EBITDA GAAP ≈ 8.300 M (35,5 %). El consenso no GAAP (10.520 M) menos el 8,6 % de pagos en acciones da 36,3 %.
// Capex: el de caja (1,0 % de las ventas); la amortización (3,9 %) incluye 659 M de intangibles de Credit Karma y Mailchimp y converge al capex.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc    tasa
  ['FY2027e', 9.5, 35.5, 3.8, 1.5, -1.2, 22.0],
  ['FY2028e', 9.0, 37.0, 3.5, 1.7, -1.2, 22.0],
  ['FY2029e', 8.5, 38.0, 3.2, 1.9, -1.2, 22.0],
  ['FY2030e', 8.0, 38.5, 3.0, 2.1, -1.2, 22.0],
  ['FY2031e', 7.0, 38.5, 2.8, 2.3, -1.2, 22.0],
  ['FY2032e', 6.0, 38.5, 2.6, 2.5, -1.2, 22.0],
  ['FY2033e', 5.0, 38.5, 2.5, 2.5, -1.2, 22.0],
  ['FY2034e', 4.0, 38.5, 2.5, 2.5, -1.2, 22.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años (FRED DGS10, 8-oct-2026). Beta mensual a 5 años frente al S&P 500 (0,97); la semanal a 2 años da 0,48.
// Deuda a valor de mercado: 7.669 M frente a 81.561 M de capitalización (8,6 %); bono de jun-2026 a 2036 al 5,6 %.
export const wacc = { tasa_libre_pct: 5.22, beta: 0.97, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 22.0, peso_deuda_pct: 8.6 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: los agentes de IA hacen la declaración de impuestos y la contabilidad de la pyme casi gratis: TurboTax pierde clientes por precio
  // (ya es el primer motivo de baja) y QuickBooks frena, como le pasó a Chegg con los asistentes de IA: ingresos casi planos y margen 6 puntos menor.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -7.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: TurboTax Live y los servicios con expertos asistidos por IA siguen creciendo un 30 % y QuickBooks Online gana el mercado medio.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 15, transacciones: 5, suma_partes: 0, escenarios: 25 };
