// Supuestos del DCF y de los escenarios (Rightmove, corte 2026-10-14). Millones de GBP. Base: 2025 real (ingresos 425,1 M;
// EBITDA publicado 296,2 M = 69,7 %, con los pagos en acciones dentro).
// 2026e: guía de ingresos +6-8 % (punto medio 7 %) y beneficio operativo subyacente +3-5 % (≈309 M); el publicado resta ≈10 M de
// pagos en acciones y la amortización sube con los ≈6 M capitalizados del plan de IA: EBITDA ≈ 311 M (68,4 %). Año fijo (1S publicado).
// 2027-2028e: fase de inversión (beneficio operativo +3-10 % al año según el plan de noviembre de 2025); ingresos +7 % por ARPA.
// 2029-2030e: la ambición de ≥ 12 % de crecimiento del beneficio operativo en 2030 (no es guía) se recoge solo a medias: margen al 71 %.
const crec = [7.0, 7.0, 7.0, 6.5, 6.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [68.4, 68.5, 69.0, 70.0, 71.0, 71.0, 71.0, 71.0, 71.0, 71.0];
const amort = [2.6, 2.8, 2.9, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const capex = [3.5, 3.4, 3.3, 3.2, 3.1, 3.0, 3.0, 3.0, 3.0, 3.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0, tasa_impositiva_pct: 25.0, fijo: i === 0,
}));

// Gilt a 10 años del Banco de Inglaterra (7-oct-2026). Beta 0,99 (Lightyear, mar-2026) y 0,75 la de Auto Trader: usamos 0,90.
// Deuda: la línea de 200 M para recompras, ≈5 % del valor de mercado.
export const wacc = { tasa_libre_pct: 5.39, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 5.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 0.0, precio_pct: 7.0, otros_pct: 0.0 },
  { periodo: '2027e', volumen_pct: 0.5, precio_pct: 6.0, otros_pct: 0.5 },
  { periodo: '2028e', volumen_pct: 0.5, precio_pct: 6.0, otros_pct: 0.5 },
  { periodo: '2029e', volumen_pct: 0.5, precio_pct: 5.5, otros_pct: 0.5 },
  { periodo: '2030e', volumen_pct: 0.5, precio_pct: 5.0, otros_pct: 0.5 },
];

export const casos = [
  // Bajista: la demanda colectiva o la presión de las agencias limita las subidas (ARPA +3 %), CoStar y la IA restan clientes, y el
  // margen baja 5 puntos por más inversión defensiva y un posible acuerdo. Ya pasó en 2020 (descuentos voluntarios) y en 2026 (obra nueva).
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  // Alcista: la IA sube el ARPA (valoraciones, datos, hipotecas) como en 2021-2023 (+9-10 %) y el margen vuelve al 72 % de 2023.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };
