// Supuestos del DCF y de los escenarios (ATOSS Software, corte 2026-10-11). Millones de EUR; ejercicio natural.
// Base: 2025 real (ventas 189,3 M; EBITDA 72,9 M, 38,5 %; EBIT 68,1 M, 36,0 %; amortizaciones 2,5 % de las ventas).
// 2026e: guía 210-215 M y margen EBIT >= 34 % (1S26: +12 %, EBIT 35 %). +12,5 % = 213 M; EBITDA 37,5 % ≈ EBIT 35 % + 2,5 %.
//   Dos trimestres publicados y guía confirmada el 24-jul: año fijo. Consenso 213,6 M y EBITDA 79,6 M (37,3 %).
// 2027e: guía 235-245 M (+10-15 %) y margen EBIT >= 35 %; consenso +13,8 % y EBITDA 37,6 %. Nosotros +12,5 % y 37,5 %.
// 2028e: consenso +13,3 % y 38,1 %; nosotros +12,0 % y 38,0 %. Después, el crecimiento converge al 5 % en 2035e y el margen
//   sube al 39,5 % (EBIT ≈ 37 %, el de 2024) por la escala de la nube; no se supone la vuelta al 39,8 % de EBITDA de 2024.
// Inversión: capex de caja 0,5-1,2 % de las ventas + pagos de arrendamientos 1,8 % (NIIF 16) → 2,4 %; amortización 2,4 %.
// Más el aumento de las comisiones activadas (costes de contrato, NIIF 15: 7,3 → 11,4 M en 2025, ≈ 6 % de las ventas), que no pasa
//   por el EBITDA ni por el circulante: +0,5 puntos de capex mientras crece al 11-12 % y +0,2 al final → 2,9 % → 2,6 %.
// Circulante comercial (clientes − proveedores − pasivos de contrato) 2,5 % de las ventas (2,4-2,9 % en 2023-2025).
// Impuestos: 32,5 % (32,1-32,9 % en 2022-2025: Múnich, impuesto de sociedades + Gewerbesteuer).

export const modelo = [
  //  periodo   crec  margen amort capex nwc  tasa  fijo
  ['2026e', 12.5, 37.5, 2.4, 2.9, 2.5, 32.5, true],
  ['2027e', 12.5, 37.5, 2.4, 2.9, 2.5, 32.5, false],
  ['2028e', 12.0, 38.0, 2.4, 2.9, 2.5, 32.5, false],
  ['2029e', 11.0, 38.5, 2.4, 2.8, 2.5, 32.5, false],
  ['2030e', 10.0, 39.0, 2.4, 2.8, 2.5, 32.5, false],
  ['2031e', 9.0, 39.5, 2.4, 2.7, 2.5, 32.5, false],
  ['2032e', 8.0, 39.5, 2.4, 2.7, 2.5, 32.5, false],
  ['2033e', 7.0, 39.5, 2.4, 2.6, 2.5, 32.5, false],
  ['2034e', 6.0, 39.5, 2.4, 2.6, 2.5, 32.5, false],
  ['2035e', 5.0, 39.5, 2.4, 2.6, 2.5, 32.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 9-oct-2026 (Bundesbank, 3,53 %). Beta 1,05: entre la ajustada de la acción frente al SDAX
// (1,18; 1,27 sin ajustar; 1,03 semanal) y la sectorial de Damodaran para software europeo (0,96 corregida por caja).
// Prima adicional de 0,5 puntos: tamaño (1.389 M de capitalización), concentración en Alemania (84,5 % de las ventas) y relevo
// del fundador. Sin deuda: peso de la deuda 0 %.
export const wacc = { tasa_libre_pct: 3.53, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 32.5, peso_deuda_pct: 0 };
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

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D11]' };
