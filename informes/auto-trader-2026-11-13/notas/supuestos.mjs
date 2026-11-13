// Supuestos del DCF y de los escenarios (Auto Trader, corte 2026-11-13). Millones de GBP; ejercicio a 31 de marzo, nombrado por el año en que termina.
// Base: FY2026 real (ingresos 624,3 M; EBITDA sin Dealer Auction 412,0 M = 66,0 %).
// FY2027e (fijo: el 1S ya publicado y la guía de beneficio operativo de 395-415 M mantenida el 5-nov-2026): 1S 313,4 M; 2S sin venta de vehículos
// +3 % sobre 293,5 M (aceleración prometida) ≈ 302,3 M y venta de vehículos ≈ 13,4 M (≈25 M en el año): ≈ 629,1 M (+0,8 %).
// Beneficio operativo de ≈402 M (algo por debajo del punto medio, tras un 1S de −1 %): EBITDA sin DA ≈ 402 − 4,5 + 22,5 = 420 M = 66,8 %.
// Consenso Yahoo FY27e: ingresos 635,8 M (+1,8 %).
// Capex: el normal de software (0,6-0,7 % de las ventas) más las altas de derechos de uso (NIIF 16); 0,5 M en el 1S27 tras la obra de la sede.
// Amortización: 3,6 % de las ventas en FY2027e (22,4 M en los últimos 12 meses); converge al capex al final de la proyección.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', 0.8, 66.8, 3.6, 1.0, 4.2, 25.0],
  ['FY2028e', 4.5, 66.5, 3.2, 1.5, 4.2, 25.0],
  ['FY2029e', 5.0, 67.0, 2.8, 1.6, 4.2, 25.0],
  ['FY2030e', 4.8, 67.0, 2.5, 1.7, 4.2, 25.0],
  ['FY2031e', 4.5, 67.0, 2.2, 1.8, 4.2, 25.0],
  ['FY2032e', 4.0, 67.0, 2.0, 1.9, 4.2, 25.0],
  ['FY2033e', 3.5, 67.0, 2.0, 2.0, 4.2, 25.0],
  ['FY2034e', 3.0, 67.0, 2.0, 2.0, 4.2, 25.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: periodo === 'FY2027e',
}));

// Tasa libre: gilt a 10 años del Banco de Inglaterra (10-nov-2026, último publicado: 5,19 %). Beta ajustada (Blume) mensual a 5 años frente al FTSE 100 (0,81 → 0,87).
// Deuda a valor de mercado: deuda neta ajustada ≈ 335 + 43,2 − 15,0 + 35,5 ≈ 399 M frente a ≈ 4.317 M de capitalización: ≈ 8,5 %. Coste: intereses del 1S27 sobre la deuda media (≈5,4 %).
export const wacc = { tasa_libre_pct: 5.19, beta: 0.87, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 25.0, peso_deuda_pct: 8.5 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el rechazo a Deal Builder y la desintermediación por la IA (asistentes y Amazon Autos) le quitan el poder de precios:
  // ARPR plano en términos reales y forecourts −2 % al año, como en el 2S26; margen a la baja por inversión defensiva.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Deal Builder se convierte en la palanca de producto que fue Co-Driver, los forecourts vuelven a crecer y el ARPR sube al ritmo de FY22-FY24.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 25, transacciones: 5, suma_partes: 0, escenarios: 20 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(anios); }
