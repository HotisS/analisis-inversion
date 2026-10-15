// Supuestos del DCF, escenarios y pesos de Fortinet (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA contable (después de pagos en acciones, ≈4 % de las ventas).
// Capex = inmovilizado (incluye compras de edificios: 365 M en 2025, 149 M en el 1S26) + aumento neto de comisiones activadas (≈1,5 % de ventas).
// Circulante: existencias + clientes − proveedores − ingresos diferidos corrientes y no corrientes (−77 % de las ventas en 2025).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: -75, tasa_impositiva_pct: 19, fijo });
export default {
  anios: [
    a('2026e', 19.0, 34.5, 2.2, 5.0, true),
    a('2027e', 10.0, 34.5, 2.3, 5.0),
    a('2028e', 9.0, 35.0, 2.3, 4.8),
    a('2029e', 8.0, 35.0, 2.4, 4.6),
    a('2030e', 7.0, 35.0, 2.5, 4.5),
    a('2031e', 6.0, 35.0, 2.5, 4.3),
    a('2032e', 5.0, 35.0, 2.6, 4.2),
    a('2033e', 4.0, 35.0, 2.6, 4.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 19, peso_deuda_pct: 0.4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 12.0, precio_pct: 4.0, otros_pct: 3.0 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 55700 },
};
