// Supuestos del DCF, escenarios, pesos y puente (Kongsberg, corte 2026-10-07). Cifras en millones de NOK.
// Base: perímetro sin Maritime (Defence Systems + Missiles & Aerostructures + Discovery), NIIF sin JV proporcionales.

const filas = [
  ['2026e', 34.7, 20.0, 3.5, 8.5, -16, true],
  ['2027e', 46.0, 20.3, 3.3, 7.5, -14, false],
  ['2028e', 30.0, 20.5, 3.3, 6.5, -12, false],
  ['2029e', 18.0, 20.5, 3.4, 5.5, -10, false],
  ['2030e', 12.0, 20.3, 3.5, 5.0, -10, false],
  ['2031e', 9.0, 20.0, 3.5, 4.7, -10, false],
  ['2032e', 7.0, 19.8, 3.5, 4.5, -9, false],
  ['2033e', 6.0, 19.5, 3.5, 4.4, -9, false],
  ['2034e', 5.0, 19.5, 3.5, 4.3, -8, false],
  ['2035e', 4.0, 19.5, 3.5, 4.3, -8, false],
];

export const anios = filas.map(([periodo, g, m, da, capex, nwc, fijo]) => ({
  periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: da, capex_pct_ventas: capex,
  nwc_pct_ventas: nwc, tasa_impositiva_pct: 22.5, fijo,
}));

export const wacc = {
  tasa_libre_pct: 4.68, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0,
  coste_deuda_pct: 5.0, tasa_impositiva_pct: 22, peso_deuda_pct: 1.2,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13 };

// Participadas por múltiplo de beneficio (regla: resultado > 5 % del EBIT → múltiplo, no valor contable).
export const participadas = {
  patria: { resultado_ltm: 607, per: 18 },     // parte de Kongsberg, LTM jun-26 [A]
  ksat: { resultado_2025: 179, per: 18 },      // parte de Kongsberg, 2025 [A]
  otras_contable: 120,
};
export const asociadas = Math.round(participadas.patria.resultado_ltm * participadas.patria.per
  + participadas.ksat.resultado_2025 * participadas.ksat.per + participadas.otras_contable);

export const pesos = { dcf: 45, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 30 };
