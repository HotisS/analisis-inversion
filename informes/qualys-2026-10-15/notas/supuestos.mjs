// Supuestos del DCF, escenarios y pesos de Qualys (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA contable (después de pagos en acciones, ≈10-11 % de las ventas): el DCF trata los pagos en acciones como coste.
// Capex = inmovilizado (guía 2026 de 8-12 M USD, ≈1,4 % de ventas) + aumento de comisiones activadas (≈0,6 %).
// Circulante: clientes − proveedores − ingresos diferidos (−37 % de las ventas en 2025).
const a = (periodo, g, m, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 1.8, capex_pct_ventas: 2.0, nwc_pct_ventas: -36, tasa_impositiva_pct: 21, fijo });
export default {
  anios: [
    a('2026e', 10.0, 35.0, true),
    a('2027e', 8.5, 35.0),
    a('2028e', 8.0, 35.5),
    a('2029e', 7.5, 36.0),
    a('2030e', 7.0, 36.0),
    a('2031e', 6.0, 36.0),
    a('2032e', 5.0, 36.0),
    a('2033e', 4.0, 36.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 29050 },
};
