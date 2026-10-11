// Supuestos del DCF y de los escenarios (CTS Eventim, corte 2026-10-11). Millones de EUR; ejercicio natural.
// Base: 2025 real (ventas 3.079,3 M; EBITDA 578,2 M reportado, 584,1 M sin los 5,9 M no recurrentes que el motor devuelve; 19,0 %).
// 2026e: 1S26 con ventas +16,9 % y EBITDA +12,4 % [A2]; si el 2S26 repite el 2S25 (1.785 M de ventas), el año crece un 7,1 %.
// Consenso 2026e: 3.322 M (+7,9 %) y EBITDA 619,3 M (18,6 %) [D4]. La guía («al nivel o algo por encima») es una cota baja.
// 2027e-2028e: consenso +5,1 % y +4,5 %, margen 19,3 % y 19,8 % [D4]. Nosotros, +5,5 % y +5,0 % con margen del 19,0-19,3 %:
// Live Entertainment (margen 6 %) crece más que Ticketing (46 %) y diluye la mezcla, como en 2023-2025 (del 20,9 % al 19,0 %).
// Amortización 3,2-3,3 % de las ventas (2025: 3,3 %, con la del PPA de See Tickets). Capex con derechos de uso: 2025 fue 9,1 %
// por ARENA MILANO; sin el recinto, 2,2-2,5 % de caja + 0,8 % de altas de arrendamientos. Circulante comercial con anticipos de
// Live Entertainment: −25 % de las ventas (2022-2025: −26,8 %, −29,3 %, −28,3 %, −26,3 %). El dinero de entradas de terceros
// NO está en el circulante: va como deuda en el puente.
// Tipo impositivo: 32 % (2023-2025: 33,6 %, 33,0 %, 33,7 % con gastos no deducibles; Alemania ≈ 30-31 %).

export const modelo = [
  //  periodo   crec  margen amort capex  nwc    tasa  fijo
  ['2026e', 7.5, 18.6, 3.2, 3.6, -25.0, 32.0, false],
  ['2027e', 5.5, 18.9, 3.2, 3.1, -25.0, 32.0, false],
  ['2028e', 5.0, 19.1, 3.2, 3.1, -25.0, 32.0, false],
  ['2029e', 4.5, 19.2, 3.2, 3.1, -25.0, 32.0, false],
  ['2030e', 4.0, 19.3, 3.2, 3.2, -25.0, 32.0, false],
  ['2031e', 3.5, 19.3, 3.2, 3.2, -25.0, 32.0, false],
  ['2032e', 3.0, 19.3, 3.2, 3.2, -25.0, 32.0, false],
  ['2033e', 2.5, 19.3, 3.2, 3.2, -25.0, 32.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 9-oct-2026 (Bundesbank, 3,53 %) [D11]. Beta 1,0: entre la de la acción frente al MDAX
// (mensual 5 años 1,24, ajustada 1,16; semanal 0,91-0,94) y la sectorial de Damodaran (0,69-0,73) [D3, D13].
// Prima de mercado 5,5 %; sin prima adicional (vende en Europa occidental). Deuda: arrendamientos (120,5 M) frente a 5.640 M: 2 %.
export const wacc = { tasa_libre_pct: 3.53, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 30.0, peso_deuda_pct: 2 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: lo de 2026 se repite: un contrato grande de ticketing que se va (como el de 2026) y precios regulados en la reventa;
  // Live Entertainment sin giras grandes. Crecimiento −3 pp al año y margen −2 pp (Ticketing pasa del 46 % al 40 %), WACC +0,5.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el plan del día del inversor recupera el margen de Ticketing (40 % en 2025) y Live Entertainment crece con los recintos.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita mensual de Damodaran; vale para los mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D12]' };

// Puente a 30-jun-2026 [D1]. Caja bruta 1.362,1 M (efectivo 1.164,2 + valores 197,9). Criterio de la caja de clientes:
// el dinero de entradas debido a promotores (856,6 M) menos el pendiente de cobro (26,9 M) = 829,7 M es dinero de terceros: se
// resta como deuda (otros_ajustes). Los anticipos de Live Entertainment (880,3 M recibidos, 347,6 M pagados) se compensan con
// eventos propios: circulante, no puente. Opciones de venta de minoritarios, contingentes y aplazados: 169,4 M.
// Minoritarios a valor de mercado: 35,7 M de resultado de 12 meses × 12 = 428 M (contable 144,1 M).
export const puente = { fecha: '2026-06-30', deuda_financiera: 1.6, arrendamientos: 120.5, caja: 1362.1, minoritarios: 428.0, pensiones: 11.1, asociadas: 26.4, otros_ajustes: 999.1 };
