// Supuestos del DCF y de los escenarios (Auto Trader, corte 2026-10-10). Millones de GBP; ejercicio a 31 de marzo, nombrado por el año en que termina.
// Base: FY2026 real (ingresos 624,3 M; EBITDA sin Dealer Auction 412,0 M = 66,0 %).
// FY2027e: guía de beneficio operativo de 395-415 M (punto medio 405 M) con palancas del ARPR de +120-130 GBP (precio +85-95, producto +65-75,
// stock −30-40) y forecourts −1-2 %: ingresos de concesionarios ≈ +2,5-3 %; Autorama sube sus ventas de vehículos a ≈40 M (29,6 M en FY26).
// Consenso FY27e: ingresos 648,6 M (+3,9 %) y EBITDA 429,9 M (66,3 %).
// Capex: el normal de software (0,6-0,7 % de las ventas) más las altas de derechos de uso (NIIF 16); el 4,4 % de FY26 fue la obra de la sede (25,1 M), que no se repite.
// Amortización: 3,7 % de las ventas en FY26, con la de intangibles adquiridos; converge al capex al final de la proyección.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc   tasa
  ['FY2027e', 3.6, 66.0, 3.6, 1.4, 4.2, 25.0],
  ['FY2028e', 4.5, 66.5, 3.2, 1.5, 4.2, 25.0],
  ['FY2029e', 5.0, 67.0, 2.8, 1.6, 4.2, 25.0],
  ['FY2030e', 4.8, 67.0, 2.5, 1.7, 4.2, 25.0],
  ['FY2031e', 4.5, 67.0, 2.2, 1.8, 4.2, 25.0],
  ['FY2032e', 4.0, 67.0, 2.0, 1.9, 4.2, 25.0],
  ['FY2033e', 3.5, 67.0, 2.0, 2.0, 4.2, 25.0],
  ['FY2034e', 3.0, 67.0, 2.0, 2.0, 4.2, 25.0],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: gilt a 10 años del Banco de Inglaterra (7-oct-2026, último publicado). Beta ajustada (Blume) mensual a 5 años frente al FTSE 100.
// Deuda a valor de mercado: deuda neta ajustada ≈ 470 M frente a ≈ 3.750 M de capitalización: ≈ 10 %. RCF referenciado al SONIA.
export const wacc = { tasa_libre_pct: 5.39, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.9, tasa_impositiva_pct: 25.0, peso_deuda_pct: 10.0 };
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
