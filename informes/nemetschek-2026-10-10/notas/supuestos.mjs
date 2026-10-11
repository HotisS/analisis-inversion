// Supuestos del DCF y de los escenarios (Nemetschek, corte 2026-10-10). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos 1.191,2 M; EBITDA 371,1 M, 31,2 %), sin HCSS. HCSS consolida desde el 1-jul-2026.
// 2026e: guía orgánica +14-15 % a tipo constante y margen 32-33 %; HCSS suma ≈ 600 pb de crecimiento y resta ≈ 150 pb de margen
// (con la PPA, que reduce los ingresos del 2S26 en 25-30 M). Consenso: 1.421 M y 440,8 M de EBITDA (31,0 %). Fijo: ya hay dos trimestres.
// 2027e: primer año completo de HCSS (≈ +10 puntos) y orgánico ≈ +10 %. Consenso 1.724 M (+21,3 %) y 32,8 % de margen.
// Capex con NIIF 16: capex de caja (1,2 % de las ventas en 2025) + pagos de arrendamientos (1,6 %) ≈ 3,0 %.
// Amortización: 6,1 % de las ventas en 2025, de ellas 3,6 puntos de PPA; sube con la PPA de HCSS y converge al capex.
// Circulante con los ingresos diferidos (pasivos por contrato): −28,6 % de las ventas en 2025 (−26,0 % en 2024).

export const modelo = [
  //  periodo   crec   margen amort capex  nwc    tasa  fijo
  ['2026e', 19.2, 31.0, 6.0, 3.0, -27.0, 23.0, true],
  ['2027e', 20.0, 33.0, 6.5, 3.0, -27.0, 23.0, false],
  ['2028e', 12.5, 34.0, 6.0, 3.0, -27.0, 23.0, false],
  ['2029e', 11.0, 34.5, 5.5, 3.0, -27.0, 23.0, false],
  ['2030e', 10.0, 35.0, 5.0, 3.0, -27.0, 23.0, false],
  ['2031e', 9.0, 35.5, 4.5, 3.0, -27.0, 23.0, false],
  ['2032e', 8.0, 35.5, 4.0, 3.0, -27.0, 23.0, false],
  ['2033e', 6.5, 35.5, 3.5, 3.0, -27.0, 23.0, false],
  ['2034e', 5.0, 35.5, 3.0, 3.0, -27.0, 23.0, false],
  ['2035e', 3.5, 35.5, 3.0, 3.0, -27.0, 23.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del Bundesbank, 3,47 % el 9-oct-2026. Beta 1,00: entre la mensual a 5 años frente al DAX ajustada (0,89)
// y la semanal a 5 años frente al MDAX ajustada (1,01) y frente al DAX (1,08); la mensual frente al MDAX (0,51) es poco fiable.
// Coste de la deuda 3,5 % antes de impuestos (Schuldschein y la refinanciación de HCSS a tipos de 2026). Deuda a mercado ≈ 11,4 %.
export const wacc = { tasa_libre_pct: 3.47, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 23.0, peso_deuda_pct: 11.4 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA generativa abarata el diseño y reduce los puestos de proyectistas (licencias por usuario) mientras la construcción
  // no residencial frena, como en 2022-2023, cuando el crecimiento cayó del 17,7 % al 6,2 %: 4 puntos menos de crecimiento y 3 de margen.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: HCSS y Bluebeam cruzan ventas en EE. UU. y la IA se cobra como módulo adicional: 2 puntos más de crecimiento y 1,5 de margen.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 25 };

// Minoritarios del puente: 37,6 M contables (Maxon y otros) + el ≈ 28 % de Build de Thoma Bravo. Build pesará ≈ 60 % del EBITDA del grupo
// con HCSS (56 % en el 1S26 sin HCSS): 28 % × 60 % ≈ 16,8 % del valor empresa. Se fija con el valor empresa del DCF base (iterado).
export const PCT_MINORITARIO_EV = 0.168;
export const minoritarios_build = 1900; // 16,8 % del valor empresa del DCF base (≈ 11.300 M)
