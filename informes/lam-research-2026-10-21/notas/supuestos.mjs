// Supuestos del DCF, escenarios y pesos de Lam Research (corte 2026-10-21). Ejercicio a finales de junio
// (FY2027 = jul-2026 a jun-2027), USD, US GAAP. EBITDA contable (después de pagos en acciones, ≈1,7 % de las ventas).
// Capex 3,8-4,2 % de las ventas (FY2025-FY2026: 4,1-4,2 %, con la ampliación de fábricas en Malasia e India).
// Circulante del motor: existencias + clientes − proveedores − ingresos diferidos.
const a = (periodo, g, m, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 1.9, capex_pct_ventas: periodo === 'FY2027e' || periodo === 'FY2028e' ? 4.2 : 3.6, nwc_pct_ventas: nwc, tasa_impositiva_pct: 13, fijo });
export default {
  anios: [
    a('FY2027e', 49.0, 41.5, 24),
    a('FY2028e', 15.0, 41.5, 25),
    a('FY2029e', -6.0, 40.0, 26),
    a('FY2030e', 6.0, 41.0, 26),
    a('FY2031e', 9.0, 42.0, 26),
    a('FY2032e', 7.0, 42.0, 26),
    a('FY2033e', 6.0, 42.0, 26),
    a('FY2034e', 5.0, 42.0, 26),
    a('FY2035e', 4.0, 42.0, 26),
    a('FY2036e', 3.5, 42.0, 26),
  ],
  wacc: { tasa_libre_pct: 5.13, beta: 1.45, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 13, peso_deuda_pct: 1.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: 'FY2028e', crecimiento_pp: -25.0, margen_pp: -5.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 45.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: 'FY2028e', volumen_pct: 12.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: -8.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2036e', tamano: 295000 },
};
