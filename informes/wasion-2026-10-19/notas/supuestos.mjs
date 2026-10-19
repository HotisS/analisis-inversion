// Supuestos del DCF, escenarios y pesos de Wasion (corte 2026-10-19). CNY, ejercicio natural, base HKFRS 2025.
// 2026e casi cerrado: 1S26 publicado (5.389 M de ventas, margen EBITDA 17,2 %) y pedidos del 1S26 (+101 % en energía digital).
// Ventas 2026e ≈ 12.290 M (+22 %, por debajo del consenso de 12.870 M); margen EBITDA del 19 % (21,3 % en 2025; el 2S pesa más).
// Capex con el desarrollo capitalizado (≈ 160-190 M al año) y fábricas fuera; circulante del 30 % de las ventas (contratos incluidos).
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 22.0, 19.0, 3.7, 5.8, 15.0, 33.0, true),
    a('2027e', 17.0, 19.0, 3.7, 6.5, 15.5, 36.0),
    a('2028e', 13.0, 19.0, 3.8, 6.0, 15.5, 38.0),
    a('2029e', 9.0, 18.8, 3.9, 5.5, 16.0, 38.0),
    a('2030e', 6.0, 18.5, 4.0, 5.0, 16.0, 38.0),
    a('2031e', 3.5, 18.5, 4.0, 4.5, 16.0, 38.0),
  ],
  wacc: { tasa_libre_pct: 1.65, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.2, tasa_impositiva_pct: 15.0, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 9 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 35, comparables: 15, transacciones: 0, suma_partes: 25, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 25.0, precio_pct: -3.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 19.0, precio_pct: -2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 14.5, precio_pct: -1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: -1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: -1.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
