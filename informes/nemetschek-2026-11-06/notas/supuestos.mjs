// Supuestos del DCF y de los escenarios (Nemetschek, corte 2026-11-06, tras el 3T26). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos 1.191,2 M; EBITDA 371,1 M, 31,2 %). HCSS consolida desde el 1-jul-2026.
// 2026e (fijo, tres trimestres publicados): 9M26 1.011,8 M + 4T26 del consenso de Yahoo (410,3 M, 6 analistas) = 1.422 M (+19,4 %);
//   margen 31,0 % = punto medio de la guía (32,5 %) − 150 pb de HCSS; 9M26 en el 30,9 %.
// 2027e: orgánico ≈ 10,5 % (el 3T26 bajó al 12,5 % a tipo constante; Design más lento, Manage y Media recortan) y HCSS completa
//   (≈ 230 M frente a ≈ 71 M en el 2S26, sin la rebaja de ingresos diferidos): +21,0 %. Consenso: 1.727 M (+21,5 %), margen 33,0 %.
// Amortización: 9M26 78,7 M (55,8 de compras); 3T26 39,9 M con HCSS → ≈ 160 M/año en 2027e (9,2 %), baja con la de compras antiguas.
// Capex con NIIF 16: capex de caja + pagos de arrendamientos ≈ 2,0 % en 9M26 y 2,8 % en 2025; se deja en 3,0 % (comisiones activadas).
// Circulante con los ingresos diferidos (pasivos por contrato): −28,6 % de las ventas en 2025; −27 %.
// Impuestos: 20,5 %. Las sociedades de Build tributan por transparencia: el impuesto del grupo solo recae sobre el 72 % de Nemetschek
//   (tipo del 9M26: 20,1 %; 2025: 21,8 %). El minoritario de Thoma Bravo se valora en el puente por su derecho antes de impuestos.

export const modelo = [
  //  periodo   crec   margen amort capex  nwc    tasa  fijo
  ['2026e', 19.4, 31.0, 8.4, 3.0, -27.0, 20.5, true],
  ['2027e', 21.0, 33.0, 9.2, 3.0, -27.0, 20.5, false],
  ['2028e', 12.0, 34.0, 8.0, 3.0, -27.0, 20.5, false],
  ['2029e', 11.0, 34.5, 7.0, 3.0, -27.0, 20.5, false],
  ['2030e', 10.0, 35.0, 6.0, 3.0, -27.0, 20.5, false],
  ['2031e', 9.0, 35.5, 5.0, 3.0, -27.0, 20.5, false],
  ['2032e', 8.0, 35.5, 4.0, 3.0, -27.0, 20.5, false],
  ['2033e', 6.5, 35.5, 3.5, 3.0, -27.0, 20.5, false],
  ['2034e', 5.0, 35.5, 3.0, 3.0, -27.0, 20.5, false],
  ['2035e', 3.5, 35.5, 3.0, 3.0, -27.0, 20.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del Bundesbank, 3,27 % el 5-nov-2026. Beta 1,00: semanal a 5 años frente al MDAX 1,00 (ajustada 1,00),
// semanal a 2 años 0,86; la mensual a 5 años (0,54) no es creíble con una volatilidad del 48 %. Deuda a mercado: 733 M de 8.586 M ≈ 8,5 %.
export const wacc = { tasa_libre_pct: 3.27, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 20.5, peso_deuda_pct: 8.5 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la IA generativa abarata el diseño y reduce los puestos de proyectistas (licencias por usuario) mientras la construcción
  // no residencial frena, como en 2022-2023, cuando el crecimiento cayó del 17,7 % al 6,2 %: 4 puntos menos de crecimiento y 3 de margen.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: HCSS y Bluebeam cruzan ventas en EE. UU. y fuera, y la IA se cobra como módulo adicional: 2 puntos más de crecimiento y 1,5 de margen.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 25 };

// BPA propio (publicado, después de la amortización de compras y del minoritario) para el objetivo a 12 meses.
// Minoritario: 28 % del beneficio antes de impuestos de Build (Build ≈ 62 % del EBITDA en 2027e y 64 % en 2028e; amortización de Build
// ≈ 115 y 112 M, con la de HCSS ≈ 80 M/año) + 4 M de otros socios (Maxon). 3T26 real: 12,3 M.
// Impuestos: 22 % sobre el beneficio antes de impuestos menos la parte de Thoma Bravo. Financieros: −24 M (2027e) y −18 M (2028e).
export function bpa({ ventas, margen, amort, fin, pesoBuild, amortBuild }) {
  const ebitda = ventas * margen / 100;
  const ebt = ebitda - amort + fin;
  const tb = 0.28 * (pesoBuild * ebitda - amortBuild);
  const imp = 0.22 * (ebt - tb);
  const neto = ebt - imp - tb - 4;
  return { ventas, ebitda, ebit: ebitda - amort, ebt, minoritarios: tb + 4, impuestos: imp, neto, bpa: neto / 115.491 };
}
