// Supuestos del DCF y de los escenarios (Netflix, corte 2026-10-28). Millones de USD; ejercicio natural.
// Base: 2025 real (ingresos 45.183 M; EBITDA 13.660 M = beneficio operativo + depreciación de inmovilizado; 495 M de Brasil de años anteriores, no recurrente).
// EBITDA del informe: la amortización de contenidos es gasto (dentro del margen). El «capex» del DCF = compras de inmovilizado (≈ 1,5 % de las ventas)
// + exceso de pagos de caja por contenidos sobre su amortización ((ratio − 1) × amortización de contenidos): 2025 = 2,8 % de las ventas; 2026 con ratio ≈ 1,1x = ≈ 3,5 %.
// La amortización del DCF es solo la de inmovilizado (0,7-1,0 % de las ventas): la de contenidos ya está en el margen.

export const modelo = [
  //  periodo   crec   margen  amort  capex  nwc   tasa   fijo
  ['2026e', 13.1, 32.3, 0.8, 6.0, 1.2, 15.0, true],  // guía del 20-oct: 51.100 M y margen operativo del 31,5 %; FCF ≈12.000 M (compra de un inmueble) [A14]
  ['2027e', 10.5, 34.3, 0.8, 4.8, 1.2, 15.0, false], // antes 11,0: publicidad 2026 rebajada a ≈2.700 M y 4T26 al +11,5 % [A14]
  ['2028e', 10.0, 36.0, 0.9, 4.5, 1.2, 15.0, false],
  ['2029e', 9.0, 37.2, 0.9, 4.2, 1.2, 15.0, false],
  ['2030e', 8.0, 38.2, 1.0, 4.0, 1.2, 15.0, false],
  ['2031e', 7.0, 38.8, 1.0, 3.8, 1.2, 15.0, false],
  ['2032e', 6.0, 39.2, 1.0, 3.5, 1.2, 15.0, false],
  ['2033e', 5.0, 39.5, 1.0, 3.3, 1.2, 15.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro a 10 años (curva oficial del Tesoro, 27-oct-2026) 4,99 %. Beta 1,20: media de la semanal a 2 años ajustada (0,95), la semanal a 5 años ajustada (1,27)
// y la mensual a 5 años ajustada (1,40). Coste de la deuda: bono a 10 años emitido en jul-2026 al 5,25 %. Deuda a mercado: 15.132 / (260.521 + 15.132) = 5,5 % (deuda a 30-sep-2026, capitalización a 27-oct).
export const wacc = { tasa_libre_pct: 4.99, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.25, tasa_impositiva_pct: 15.0, peso_deuda_pct: 5.5 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15.0 };
export const etapa2 = { usar: true, anios: 7, margen_final_pct: null };

export const casos = [
  // Bajista: la televisión de creadores (YouTube) y Paramount-Warner frenan altas y precios: crecimiento de un dígito bajo desde 2027 y margen estancado, como 2022.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la publicidad y el directo sostienen un crecimiento de dos dígitos y el margen operativo sube hacia el 40 %.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 };
