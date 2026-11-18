// Supuestos del DCF y de los escenarios (ATOSS Software, corte 2026-11-18). Millones de EUR; ejercicio natural.
// Base: 2025 real (ventas 189,3 M; EBITDA 72,9 M, 38,5 %; EBIT 68,1 M, 36,0 %). Nueve meses de 2026 (23-oct): ventas 155,8 M
//   (+12 %), EBITDA 60,9 M (39,1 %), EBIT 57,3 M (36,8 %), amortizaciones 2,3 % de las ventas.
// 2026e: ventas en la parte baja de 210-215 M por las licencias y margen EBIT «en torno al 37 %» (guía del 23-oct): +11,4 % =
//   210,8 M y EBITDA 39,3 % (EBIT 37 % + 2,3 %). Tres trimestres publicados y guía recién fijada: año fijo.
// 2027e: guía 235-245 M y EBIT >= 35 %; el CFO dijo parte baja y 36-37 % (NuWays): +11,5 % = 235,1 M y EBITDA 39,0 % (EBIT ≈ 36,6 %).
//   Consenso (Yahoo, 18-nov) 237,7 M. Antes: +12,5 % y 37,5 %.
// 2028e: +11,0 % y 39,5 %. Después, crecimiento hacia el 5 % en 2035e y margen EBITDA hasta el 40,5 % (EBIT ≈ 38 %) desde 2030e por la
//   escala de la nube y la productividad de la IA; el CFO habla de más del 40 % de EBIT a largo plazo y no se supone.
// Inversión: capex de caja 0,5-1,2 % de las ventas + pagos de arrendamientos 1,8 % (NIIF 16) + aumento de las comisiones activadas
//   (NIIF 15, +0,5 puntos mientras crece al 11 % y +0,2 al final) → 2,9 % → 2,6 %; amortización 2,4 %.
// Circulante comercial (clientes − proveedores − pasivos de contrato) 2,5 % de las ventas (2,4-2,9 % en 2023-2025).
// Impuestos: 32,5 % (32,1-32,9 % en 2022-2025).

export const modelo = [
  //  periodo   crec  margen amort capex nwc  tasa  fijo
  ['2026e', 11.4, 39.3, 2.4, 2.9, 2.5, 32.5, true],
  ['2027e', 11.5, 39.0, 2.4, 2.9, 2.5, 32.5, false],
  ['2028e', 11.0, 39.5, 2.4, 2.9, 2.5, 32.5, false],
  ['2029e', 10.0, 40.0, 2.4, 2.8, 2.5, 32.5, false],
  ['2030e', 9.0, 40.5, 2.4, 2.8, 2.5, 32.5, false],
  ['2031e', 8.0, 40.5, 2.4, 2.7, 2.5, 32.5, false],
  ['2032e', 7.0, 40.5, 2.4, 2.7, 2.5, 32.5, false],
  ['2033e', 6.0, 40.5, 2.4, 2.6, 2.5, 32.5, false],
  ['2034e', 5.5, 40.5, 2.4, 2.6, 2.5, 32.5, false],
  ['2035e', 5.0, 40.5, 2.4, 2.6, 2.5, 32.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 17-nov-2026 (Bundesbank, 3,42 %). Beta 1,05: entre la ajustada de la acción frente al SDAX
// (1,22; 1,33 sin ajustar; 1,04 semanal) y la sectorial de Damodaran para software europeo (0,96 corregida por caja).
// Prima adicional de 0,5 puntos: tamaño (1.319 M de capitalización), concentración en Alemania (84,5 % de las ventas) y relevo
// del fundador. Sin deuda: peso de la deuda 0 %.
export const wacc = { tasa_libre_pct: 3.42, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 32.5, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA y las suites (Workday, SAP, UKG) frenan las altas y suben las bajas: crecimiento 4 puntos menor (≈ 8 % en
  // 2027e, como la caída del New ACV del 1T26 prolongada) y margen 3 puntos menor por precios y más gasto comercial; el mercado
  // exige un punto más de WACC a un software «en riesgo» (como en la caída de feb-jun 2026, de 124 a 65 EUR).
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la nube y la IA aceleran (cartera de nube +25 %, como hoy) y la expansión fuera de DACH funciona: 2,5 puntos más
  // de crecimiento y el margen de 2024 (EBITDA ≈ 40 %, +1,5 puntos).
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 15, transacciones: 5, suma_partes: 0, escenarios: 30 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre de 2026 [D11]' };
