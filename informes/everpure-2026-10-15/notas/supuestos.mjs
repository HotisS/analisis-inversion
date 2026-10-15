// Supuestos del DCF, escenarios y pesos de Everpure (corte 2026-10-15). Ejercicio a 1-feb (FY = año en que termina), USD, US GAAP.
// EBITDA contable (después de pagos en acciones, ≈12-13 % de las ventas): el DCF trata los pagos en acciones como coste.
// Circulante: clientes + existencias − proveedores − ingresos diferidos (−37 % de las ventas en FY2026); el peso de los diferidos baja
// porque crece más el producto (hiperescala) que la suscripción.
const a = (periodo, g, m, am, cx, nwc, t, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('FY2027e', 38.0, 10.0, 3.5, 6.5, -33, 15, true),
    a('FY2028e', 32.0, 16.5, 3.5, 5.5, -30, 18),
    a('FY2029e', 18.0, 19.0, 3.5, 5.0, -28, 20),
    a('FY2030e', 13.0, 20.0, 3.5, 4.5, -27, 20),
    a('FY2031e', 10.0, 21.0, 3.5, 4.0, -26, 20),
    a('FY2032e', 8.0, 21.5, 3.5, 4.0, -25, 20),
    a('FY2033e', 6.0, 22.0, 3.5, 4.0, -25, 20),
    a('FY2034e', 4.5, 22.0, 3.5, 4.0, -25, 20),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.5, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 21, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 26.0, precio_pct: 10.0, otros_pct: 2.0 },
    { periodo: 'FY2028e', volumen_pct: 28.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: 'FY2029e', volumen_pct: 16.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: 'FY2030e', volumen_pct: 12.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
