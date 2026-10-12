// Supuestos del DCF y de los escenarios (Salesforce, corte 2026-10-12). Millones de USD; ejercicio a 31 de enero, etiqueta «fin».
// Base: FY2026 real (ingresos 41.525 M; EBITDA GAAP 27,0 %, con la remuneración en acciones como gasto, 8,5 % de las ventas).
// FY2027e fijo: dos trimestres publicados y guía de 46.100-46.400 M (+11-12 %, con algo más de 3 puntos de Informatica y ~0,5 de Contentful y Fin);
// margen operativo GAAP guiado del 20,1 % + amortizaciones (intangibles 4,4 % y depreciación sin derechos de uso) ≈ 27,0 % de EBITDA GAAP.
// Capex: 1,5 % de las ventas guiado + aumento neto de las comisiones activadas (lección ATOSS: ≈ 12 % de las ventas de saldo × crecimiento).
// Circulante: pasivos de contrato dentro (lección SAP): −41,9 % de las ventas en FY2026; se proyecta −41 %.
// Perímetro: el crecimiento solo incluye las compras ya pagadas o en el puente (Informatica, Qualified, Contentful, Fin); no se proyectan compras nuevas.

export const modelo = [
  //  periodo     crec   margen  amort  capex  nwc    tasa   fijo
  ['FY2027e', 11.4, 27.0, 6.9, 2.6, -41.0, 22.3, true],
  ['FY2028e', 9.5, 28.0, 6.2, 2.6, -41.0, 21.5, false],
  ['FY2029e', 8.5, 29.0, 5.5, 2.5, -41.0, 21.5, false],
  ['FY2030e', 8.0, 29.5, 4.8, 2.4, -41.0, 21.5, false],
  ['FY2031e', 7.0, 30.0, 4.1, 2.3, -41.0, 21.5, false],
  ['FY2032e', 6.0, 30.5, 3.4, 2.2, -41.0, 21.5, false],
  ['FY2033e', 5.0, 31.0, 2.8, 2.1, -41.0, 21.5, false],
  ['FY2034e', 4.5, 31.0, 2.3, 2.0, -41.0, 21.5, false],
  ['FY2035e', 4.0, 31.0, 2.0, 2.0, -41.0, 21.5, false],
  ['FY2036e', 3.5, 31.0, 1.9, 1.9, -41.0, 21.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Tesoro de EE. UU. a 10 años, 5,24 % (9-oct-2026). Beta 1,30: entre la mensual de 5 años (1,24) y la sectorial reapalancada (≈1,47),
// porque la deuda subió de 14.400 a 39.300 M con la recompra acelerada de marzo de 2026 y la beta histórica no lo recoge.
// Deuda a mercado: 39.921 M (bonos, préstamo y arrendamientos financieros) frente a 181.013 M de capitalización: 18 %.
export const wacc = { tasa_libre_pct: 5.24, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21.0, peso_deuda_pct: 18.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export const pesos = { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 };
