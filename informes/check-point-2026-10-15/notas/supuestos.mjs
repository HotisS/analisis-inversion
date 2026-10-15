// Supuestos del DCF, escenarios y pesos de Check Point (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA contable (después de pagos en acciones, ≈8 % de las ventas, y con las subvenciones de I+D israelíes, ≈4 puntos en 2026).
// Capex = inmovilizado y software (≈1 %) + campus de Tel Aviv hasta 2032 (≈1,5 %) + compras pequeñas recurrentes (≈2 %).
// Circulante: clientes − proveedores − ingresos diferidos (−52 % de las ventas en 2025).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -52, tasa_impositiva_pct: 15, fijo });
export default {
  anios: [
    a('2026e', 2.4, 30.5, 2.8, 4.5, true),
    a('2027e', 5.0, 30.0, 2.8, 4.5),
    a('2028e', 5.5, 31.0, 2.7, 4.5),
    a('2029e', 5.0, 31.5, 2.6, 4.0),
    a('2030e', 4.5, 32.0, 2.5, 4.0),
    a('2031e', 4.0, 32.0, 2.5, 3.5),
    a('2032e', 3.5, 32.0, 2.5, 3.5),
    a('2033e', 3.0, 32.0, 2.5, 3.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 15, peso_deuda_pct: 12.7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0.4 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: { periodo: '2033e', tamano: 147300 },
};
