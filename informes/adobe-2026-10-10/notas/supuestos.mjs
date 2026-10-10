// Supuestos del DCF y de los escenarios (Adobe, corte 2026-10-10). Millones de USD; ejercicio de 52/53 semanas a finales de noviembre.
// Base: FY2025 real (ingresos 23.769 M; EBITDA GAAP 40,1 %, con los pagos en acciones como gasto, 8,2 % de las ventas).
// FY2026e fijo: tres trimestres publicados y guía de 26.576-26.626 M (+12,0 %, con Semrush desde abril); EBITDA GAAP ≈ 39,5 %
// (consenso no GAAP de 12.722 M menos el 8,3 % de pagos en acciones de la conciliación de la guía).
// FY2027e: consenso de 29.053 M (+9,2 %), con medio año más de Semrush. Capex 0,8 % de las ventas en FY2025; la amortización (3,5 %)
// incluye la de los intangibles comprados y converge al capex.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa   fijo
  ['FY2026e', 12.0, 39.5, 3.6, 1.0, 8.0, 21.0, true],
  ['FY2027e', 8.5, 40.0, 3.4, 1.2, 8.0, 21.0, false],
  ['FY2028e', 8.0, 40.5, 3.1, 1.4, 8.0, 21.0, false],
  ['FY2029e', 7.0, 40.5, 2.8, 1.6, 8.0, 21.0, false],
  ['FY2030e', 6.0, 40.5, 2.5, 1.8, 8.0, 21.0, false],
  ['FY2031e', 5.0, 40.5, 2.2, 2.0, 8.0, 21.0, false],
  ['FY2032e', 4.0, 40.5, 2.0, 2.0, 8.0, 21.0, false],
  ['FY2033e', 3.0, 40.5, 2.0, 2.0, 8.0, 21.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años (FRED DGS10, 8-oct-2026). Beta ajustada (Blume) 1,26 frente al S&P 500.
// Deuda a valor de mercado: 6.363 M frente a 94.291 M de capitalización (6,3 %); bonos al 2,7-5,4 %.
export const wacc = { tasa_libre_pct: 5.22, beta: 1.26, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 21.0, peso_deuda_pct: 6.3 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA generativa convierte la edición creativa en un servicio barato (Canva gratis, modelos de imagen y vídeo de Google y OpenAI):
  // los ingresos dejan de crecer y Adobe defiende la base con precios a la baja, como el software de fotografía tras los móviles.
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Firefly y los agentes se cobran (el ARR de productos de IA ya crece más del 150 %) y el ARR vuelve al 12-13 %.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 };
