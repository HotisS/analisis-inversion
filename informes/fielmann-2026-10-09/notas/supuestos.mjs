// Supuestos del DCF y de los escenarios (Fielmann Group, corte 2026-10-09).
// EBITDA reportado NIIF 16 (con los ajustes recurrentes de integración dentro). Con los arrendamientos en la deuda,
// el capex incluye las altas de derechos de uso y la amortización, la de esos derechos.

// Capex de inmovilizado (% ventas) y altas de derechos de uso (% ventas), por año.
const CAPEX_PPE = [5.6, 6.0, 6.0, 5.6, 5.4, 5.2, 5.0, 5.0];
const ALTAS_DU = [6.0, 6.0, 5.9, 5.8, 5.7, 5.6, 5.5, 5.5];
const AMORT = [9.5, 9.5, 9.6, 9.6, 9.7, 9.7, 9.8, 9.8]; // inmovilizado ~4,4 % + derechos de uso ~5,1 %

const BASE = [
  // periodo, crecimiento, margen EBITDA, fijo
  ['2026e', 3.2, 22.3, true],
  ['2027e', 5.0, 22.7, false],
  ['2028e', 5.5, 23.0, false],
  ['2029e', 5.5, 23.2, false],
  ['2030e', 5.0, 23.3, false],
  ['2031e', 4.5, 23.3, false],
  ['2032e', 4.0, 23.3, false],
  ['2033e', 3.5, 23.3, false],
];

export const NWC = 9.0;
export const TAX = 29.5;

export const anios = BASE.map(([periodo, g, m, fijo], i) => ({
  periodo, crecimiento_pct: g, margen_ebitda_pct: m,
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: +(CAPEX_PPE[i] + ALTAS_DU[i]).toFixed(1),
  nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX, fijo,
}));

export const wacc = { tasa_libre_pct: 3.57, beta: 0.89, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 29.5, peso_deuda_pct: 20.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 8.0 };
export const etapa2 = { usar: true, anios: 5, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.75, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 };
