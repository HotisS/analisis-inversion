// Supuestos del DCF, escenarios y pesos de KLA (corte 2026-10-15). Ejercicio a junio, USD, US GAAP.
// EBITDA contable (después de pagos en acciones, ≈2,3 % de las ventas). Circulante = existencias + clientes − proveedores
// + activos de contrato − pasivos de contrato (≈31 % de las ventas en el FY2026).
const a = (periodo, g, m, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 2.6, capex_pct_ventas: 3.0, nwc_pct_ventas: 31, tasa_impositiva_pct: 14.5, fijo });
export default {
  anios: [
    a('FY2027e', 30.0, 47.0),
    a('FY2028e', 17.0, 48.0),
    a('FY2029e', 13.0, 48.0),
    a('FY2030e', 9.0, 47.5),
    a('FY2031e', 8.0, 47.0),
    a('FY2032e', 7.0, 46.5),
    a('FY2033e', 7.0, 46.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.3, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.8, tasa_impositiva_pct: 14.5, peso_deuda_pct: 2.4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: true, anios: 5, margen_final_pct: 45.0 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: 'FY2028e', crecimiento_pp: -29.0, margen_pp: -5.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 26.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 14.0, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 10.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
