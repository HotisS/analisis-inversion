// Supuestos del DCF y de los escenarios (Trigano, corte 2026-10-11). Millones de EUR; ejercicio a 31 de agosto, etiqueta «fin».
// Base: FY2025 real (ventas 3.660,2 M; EBITDA 409,8 M, 11,2 %; amortizaciones 2,1 % de las ventas).
// FY2026e: ventas ya publicadas (3.800,0 M, +3,8 %) y margen operativo corriente «cercano al 10 %» (≈ 11,7 % de EBITDA con
// 2,0 % de amortizaciones); consenso EBITDA 447 M (11,7 %). Año fijo: el ejercicio ya cerró (el motor le da fracción 0 porque
// el puente se lleva a 31-ago-2026 con la tesorería neta que anunció la empresa).
// FY2027e: producción de autocaravanas estable en el 1S27 y «attentisme» de los particulares; tarifas +1,5-2 %. Consenso +4,2 %
// (MarketScreener) y +2,8 % (FactSet). Nosotros +2,0 % y margen algo menor (11,6 %).
// Margen de ciclo medio: EBITDA del 12,0 %, la media de FY2017-FY2025 (≈ 12,0 %), por debajo del consenso FY2028e (12,5 %).
// Capex con derechos de uso (NIIF 16): capex de caja ≈ 1,2-1,6 % + pagos de arrendamientos ≈ 0,5-0,6 % → 2,2 %; amortización 2,1 %.
// Circulante comercial 20 % de las ventas (FY2025 20,1 %; FY2024 26,2 % con sobrestock; FY2023 17,5 %).

export const modelo = [
  //  periodo     crec  margen amort capex  nwc   tasa  fijo
  ['FY2026e', 3.8, 11.7, 2.0, 2.2, 20.0, 26.0, true],
  ['FY2027e', 2.0, 11.4, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2028e', 4.0, 11.5, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2029e', 4.0, 11.5, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2030e', 3.5, 11.5, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2031e', 3.0, 11.5, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2032e', 2.5, 11.5, 2.1, 2.2, 20.0, 26.0, false],
  ['FY2033e', 2.0, 11.5, 2.1, 2.2, 20.0, 26.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 9-oct-2026 (Bundesbank, 3,53 %). Beta 1,15: la ajustada de la acción frente al CAC 40 (mensual a
// 5 años; 1,23 sin ajustar), por encima de la sectorial de Damodaran para Europa («Recreation», 0,89 corregida por caja), porque
// Trigano es un fabricante cíclico puro. Prima adicional de 0,5 puntos por concentración en un solo producto discrecional.
// Deuda a valor de mercado: 73 M financiera + 76 M de arrendamientos + 46 M de pagos aplazados ≈ 195 M frente a 2.367 M (≈ 8 %);
// se usa un 5 % porque la caja la supera con creces.
export const wacc = { tasa_libre_pct: 3.53, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 26.0, peso_deuda_pct: 5 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 6.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: una recesión europea en FY2028 como la de 2009 a la mitad: ventas −18 % ese año (FY2009: ventas de 636 M; FY2025:
  // −10,9 % orgánico) y margen EBITDA 4,5 puntos menor (FY2025 perdió 3,5 puntos); recuperación parcial en FY2029 y un punto
  // menos de margen para siempre por guerra de precios (Hymer y Knaus Tabbert con márgenes del 2 %).
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -0.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 1.0, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [ { periodo: 'FY2027e', crecimiento_pp: -20.0, margen_pp: -4.0 }, { periodo: 'FY2028e', crecimiento_pp: -15.0, margen_pp: -6.0 }, { periodo: 'FY2029e', crecimiento_pp: 5.0, margen_pp: -3.0 } ] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: las carteras de la gama 2027 se convierten en ventas al público, Trigano gana cuota con la red Libertium y el margen vuelve
  // al 13 % de FY2022-FY2023 (EBITDA del 12,7 % y 13,8 %).
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 45, comparables: 20, transacciones: 10, suma_partes: 0, escenarios: 25 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D31]' };
