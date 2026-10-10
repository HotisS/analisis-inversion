// Supuestos del DCF y de los escenarios (Dunelm, corte 2026-10-10). Millones de GBP; ejercicio a finales de junio, nombrado por el año en que termina.
// Base: FY2026 real (ventas 1.825,5 M; EBITDA NIIF 16 de 313,4 M = 17,2 %; BAI 211,0 M, plano desde FY2022).
// FY2027e: guía de BAI ajustado plano, con 30-40 M de partidas de ajuste del plan «Winning Hearts & Homes» que se restan aquí;
// consenso de ventas de 1.894 M (+3,8 %). Plan: c. 100 M de costes improductivos menos en FY2029 y 125 M de capex adicional en tres años.
// Capex = el de caja (guía de 60-70 M más el adicional del plan) + altas de derechos de uso de las tiendas (NIIF 16: 82,4 M en FY2026,
// 32-50 M en FY2023-FY2025). Amortización: 4,85 % de las ventas en FY2026, con la de los derechos de uso.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', 3.5, 16.5, 5.0, 8.0, 7.0, 25.0],
  ['FY2028e', 4.0, 17.0, 5.0, 7.5, 7.0, 25.0],
  ['FY2029e', 4.0, 17.5, 5.0, 7.0, 7.0, 25.0],
  ['FY2030e', 3.5, 17.5, 5.0, 6.0, 7.0, 25.0],
  ['FY2031e', 3.0, 17.5, 5.0, 5.5, 7.0, 25.0],
  ['FY2032e', 3.0, 17.5, 5.0, 5.2, 7.0, 25.0],
  ['FY2033e', 2.5, 17.5, 5.0, 5.0, 7.0, 25.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: gilt a 10 años del Banco de Inglaterra (7-oct-2026). Beta ajustada 1,11 frente al FTSE 250.
// Deuda a valor de mercado (con arrendamientos NIIF 16): 117 + 268,5 = 385,5 M frente a 1.617 M de capitalización: ≈ 19 %.
export const wacc = { tasa_libre_pct: 5.39, beta: 1.11, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 19.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 7.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: consumo británico débil y competencia de precio (B&M, IKEA, Temu): las ventas apenas crecen y el margen cae como en FY2023.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el plan funciona (ahorros de 100 M y cuota hacia el 9-10 %): ventas +1,5 puntos y margen +1,5 puntos.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 25, transacciones: 5, suma_partes: 0, escenarios: 20 };
