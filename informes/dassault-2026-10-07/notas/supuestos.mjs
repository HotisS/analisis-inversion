// Supuestos del DCF de Dassault Systèmes (corte 2026-10-07). Base NIIF: la remuneración en acciones es coste
// (normalizada en ~3 % de ventas a partir de 2027; 2026 con la guía de ~115 M). Amortización sin la de intangibles
// adquiridos (Medidata), que no genera escudo fiscal relevante y no es inversión que haya que reponer.
const fila = (periodo, crecimiento_pct, margen_ebitda_pct, fijo = false) => ({
  periodo, crecimiento_pct, margen_ebitda_pct,
  amortizacion_pct_ventas: 3.4, capex_pct_ventas: 4.0, nwc_pct_ventas: 6.5, tasa_impositiva_pct: 21.0, fijo,
});

export const anios = [
  fila('2026e', 2.1, 33.4, true),
  fila('2027e', 5.0, 33.0),
  fila('2028e', 5.5, 33.5),
  fila('2029e', 5.5, 33.9),
  fila('2030e', 5.0, 34.3),
  fila('2031e', 4.5, 34.6),
  fila('2032e', 4.0, 34.6),
  fila('2033e', 3.5, 34.6),
  fila('2034e', 3.0, 34.6),
  fila('2035e', 3.0, 34.6),
];

export const wacc = {
  tasa_libre_pct: 3.52, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 4.0, tasa_impositiva_pct: 25.8, peso_deuda_pct: 10.6,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16.0 };

export const pesos = { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 };
