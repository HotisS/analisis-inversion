// Supuestos del DCF y de los escenarios (Puig, corte 2026-10-11). Millones de EUR; ejercicio natural.
// Base: 2025 real (ventas 5.042 M; EBITDA 1.048 M sin «otros ingresos y gastos operativos», margen 20,8 %; EBIT 812,5 M).
// 2026e: 1S26 +2,4 % reportado (+4,4 % comparable, −2,1 pp de divisa); guía: crecer más que el mercado de prestigio con margen
// EBITDA ajustado estable (20,7 %). Consenso 2026e: 5.228 M (+3,7 %) y EBITDA 1.083 M (20,7 %). Año fijo (semestre publicado + guía).
// Sin ISDIN: la compra del 50 % restante (1.200 M, cierre previsto en el 1T27) no está en el consenso ni en la proyección; la
// participación actual se valora en el puente al precio de esa compra, y pagar 1.200 M por otros 1.200 M de valor es neutro.
// Capex con derechos de uso (NIIF 16): capex de caja 3,9 % de las ventas + pagos de arrendamientos 1,8 % ≈ 5,6 %.
// Amortización 4,7 % de las ventas en 2025 (incluida la de derechos de uso); converge al 5,2 %, por debajo del capex.

export const modelo = [
  //  periodo   crec  margen amort capex  nwc   tasa  fijo
  ['2026e', 3.5, 20.7, 4.7, 5.6, 20.5, 25.0, true],
  ['2027e', 5.5, 20.9, 4.8, 5.6, 20.5, 25.0, false],
  ['2028e', 5.5, 21.1, 4.9, 5.6, 20.5, 25.0, false],
  ['2029e', 5.0, 21.3, 5.0, 5.6, 20.5, 25.0, false],
  ['2030e', 4.5, 21.5, 5.1, 5.6, 20.5, 25.0, false],
  ['2031e', 4.0, 21.5, 5.2, 5.6, 20.5, 25.0, false],
  ['2032e', 3.5, 21.5, 5.2, 5.6, 20.5, 25.0, false],
  ['2033e', 3.0, 21.5, 5.2, 5.6, 20.5, 25.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 9-oct-2026 (Bundesbank, 3,53 %). Beta 0,86: Damodaran (Household Products) desapalancada 0,74,
// reapalancada con un D/E del 21 %; la de la propia acción (0,47-0,71 frente al STOXX 600, solo 29 meses desde la OPV) es poco fiable.
// Deuda a valor de mercado: 1.399 M bancaria + 400 M de arrendamientos + 558 M de opciones de minoritarios = 2.357 M frente a 10.184 M (19 %).
export const wacc = { tasa_libre_pct: 3.53, beta: 0.86, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 19 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el mercado de perfumería selectiva se queda en el +1 % de 2025, la imitación barata («dupes») y las marcas digitales
  // quitan precio, y Puig crece como Coty o Estée Lauder en 2024-2026: +0-2 % al año y 2,5 puntos menos de margen por más publicidad.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la perfumería de nicho y Charlotte Tilbury vuelven al +7-8 % del plan de la OPV y el día del inversor fija un margen del 22-23 %.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 15, transacciones: 5, suma_partes: 0, escenarios: 25 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D21]' };
