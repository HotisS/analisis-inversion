// Supuestos del DCF y de los escenarios (ICON plc, corte 2026-10-09).
// Base del EBITDA del informe: el contable con los pagos en acciones, la reestructuración y los costes de transacción dentro
// (se repiten todos los años); fuera solo los deterioros de 2025, la pérdida por la venta de Data Solutions y los costes
// de la investigación contable [A]. Queda unos 2,3 puntos de ventas por debajo del EBITDA ajustado de ICON y del consenso [D].

// 2026e fijado por la guía (7.850-8.150 M; reafirmada el 29-jul) y el consenso (8.139 M) [D]: 8.120 M, −1,6 %.
// Margen 2026e: consenso de EBITDA ajustado 1.322 M (16,2 %) menos 2,3 puntos = 13,9 % (14,0 % en el 1S26 en la misma base [A]).
const G = [-1.6, 3.5, 5.0, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const M = [13.9, 14.6, 15.2, 15.7, 16.1, 16.4, 16.5, 16.5, 16.5, 16.5];
// Amortización total: la de intangibles de PRA (227 M en 2025) se va agotando; la depreciación ronda el 1,8 % de las ventas [A].
const AMORT = [4.4, 4.1, 3.8, 3.5, 3.2, 2.9, 2.6, 2.3, 2.1, 2.0];
const CAPEX = [2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1, 2.1];
// Circulante: clientes + facturación pendiente − proveedores − cobros anticipados = 10,0 % de las ventas en 2025 y 9,7 % en 2024 [A].
const NWC = 10.0;
// Tipo efectivo: 16,9 % sobre el beneficio ajustado en 2025 y 17,8 % en el 1S26 [A]; 19 % porque aquí se aplica sobre un EBIT
// que resta la amortización de intangibles de PRA, que no desgrava (compra de acciones), y por el impuesto mínimo global.
const TAX = [19, 19, 19, 19, 19, 19, 19, 19, 19, 19];

export const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: M[i], amortizacion_pct_ventas: AMORT[i],
  capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));

// WACC: Tesoro a 10 años 5,28 % (7-oct-2026, FRED) [D7]; beta 1,15 ajustada mensual 5 años frente al S&P 500 [D1]
// (frente a salud 1,06; semanal 2 años 0,99; media ajustada de IQVIA, Medpace y Charles River 1,16);
// deuda 5,5 % antes de impuestos (cupones de los bonos de agosto de 2026) [D4]; peso de la deuda a mercado ≈ 21 %.
export const wacc = { tasa_libre_pct: 5.28, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 19, peso_deuda_pct: 21 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -4.5, margen_pp: -1.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 };

export const referencia_mercado = { mercado: 'S&P 500 (prima implícita con reparto sostenible de los últimos 12 meses)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, prima implícita mensual [D8]' };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) console.table(anios);
