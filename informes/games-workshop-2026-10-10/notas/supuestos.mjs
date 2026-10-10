// Supuestos del DCF y de los escenarios (Games Workshop, corte 2026-10-10). Millones de GBP; ejercicio a finales de mayo, nombrado por el año en que termina.
// Base: FY2026 real (ingresos 659,7 M; EBITDA 321,5 M = 48,7 %; Core 626,8 M y licencias 32,9 M).
// FY2027e: el consenso de MarketScreener es solo del Core: 692,2 M (+10,4 % sobre 626,8 M) y 316,2 M de EBITDA; con unas licencias de ≈25 M
// (32,9 M en FY2026, sin el pico de Space Marine 2) el grupo crece ≈ +8,5 % con un margen EBITDA de ≈47 %. Core +12,2 % a tipo constante en FY2026.
// Capex = el de caja (7,5 % de las ventas en FY2026, con el desarrollo de producto capitalizado) + altas de derechos de uso de las tiendas
// (23,6 M en FY2026, 3,6 % de las ventas; NIIF 16). Amortización: 7,0 % (EBITDA − EBIT de FY2026), con la de los derechos de uso.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', 9.0, 47.0, 7.0, 11.0, 5.5, 25.0],
  ['FY2028e', 10.0, 47.5, 7.0, 10.8, 5.5, 25.0],
  ['FY2029e', 9.0, 47.5, 7.0, 10.5, 5.5, 25.0],
  ['FY2030e', 8.0, 47.5, 7.0, 10.2, 5.5, 25.0],
  ['FY2031e', 7.0, 47.5, 7.0, 10.0, 5.5, 25.0],
  ['FY2032e', 6.0, 47.5, 7.0, 9.8, 5.5, 25.0],
  ['FY2033e', 5.0, 47.5, 7.0, 9.6, 5.5, 25.0],
  ['FY2034e', 4.0, 47.5, 7.0, 9.5, 5.5, 25.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: gilt a 10 años del Banco de Inglaterra (7-oct-2026). Beta 0,99 frente al FTSE 100. Sin deuda financiera.
export const wacc = { tasa_libre_pct: 5.39, beta: 0.99, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: el frenazo del Core del 2S26 (+5,1 %) se prolonga y las licencias no se recuperan.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la serie de Amazon y nuevos videojuegos atraen aficionados como Space Marine 2 y el Core crece al ritmo de FY2022-FY2025 (≈ 12 %).
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 15, transacciones: 10, suma_partes: 0, escenarios: 25 };
