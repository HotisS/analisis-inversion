// Supuestos numéricos del analista (DCF, escenarios, pesos) para CAF. Los textos van en propio.mjs.
// Base 2025: ventas 4.486,5 M; EBITDA 350 M (7,8 %); amortización 107,9 M (2,4 %); tipo efectivo 29,8 % [cuentas 2025].
// 2026e fijo: guía de ventas +«un dígito alto» y mejora de rentabilidad; 1S26 con ventas +16 % y EBITDA 206 M (8,2 %).
// Circulante del motor (existencias + clientes y activos por contrato − proveedores y pasivos por contrato): 9,0 % en 2025; 10 % desde 2026 (el 1S26 lo subió).
// Capex con NIIF 16: inversión material e inmaterial (2,5 % en 2025) + pagos de arrendamiento (0,6 %).
const crec = [10.0, 7.5, 7.0, 5.5, 4.5, 4.0, 3.5, 3.0, 2.5, 2.5];
const margen = [8.4, 8.5, 8.6, 8.6, 8.6, 8.6, 8.6, 8.6, 8.6, 8.6];
const amort = [2.4, 2.4, 2.4, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5];
const capex = [3.2, 3.4, 3.2, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const nwc = [10.0, 10.75, 11.5, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 27.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 4.1, beta: 0.94, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25, peso_deuda_pct: 26 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 7.5 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: -0.3, crecimiento_terminal_pct: 2.25, multiplo_salida: null },
];
export const pesos = { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 10, escenarios: 30 };
