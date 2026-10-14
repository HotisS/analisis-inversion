// Supuestos del DCF, escenarios y pesos de Lindt & Sprüngli (corte 2026-10-14). Ejercicio natural, CHF, NIIF 16.
// Capex = inmovilizado e intangibles (≈5,5 % de ventas) + altas de derechos de uso (≈1,4 %, aproximadas por los pagos de arrendamientos).
// Circulante comercial (existencias + clientes − proveedores) al cierre: 34,3 % de las ventas en 2025 por el cacao caro; baja hacia el 31 % de 2024.
const a = (periodo, g, m, cx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 5.4, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 21, fijo });
export default {
  anios: [
    a('2026e', -2.0, 22.0, 7.0, 33.0, true),
    a('2027e', 3.0, 22.4, 6.9, 31.5),
    a('2028e', 5.0, 22.7, 6.6, 31.0),
    a('2029e', 5.5, 23.0, 6.5, 31.0),
    a('2030e', 5.5, 23.2, 6.4, 31.0),
    a('2031e', 5.0, 23.3, 6.3, 31.0),
    a('2032e', 4.0, 23.4, 6.2, 31.0),
    a('2033e', 2.0, 23.4, 6.0, 31.0),
  ],
  wacc: { tasa_libre_pct: 0.54, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 1.0, tasa_impositiva_pct: 21, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -5.0, precio_pct: 6.0, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: -1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 121500 },
  // BPA por certificado del ejercicio objetivo (2028e): ventas × margen EBIT − resultado financiero (−45 M) − impuestos (21 %) ÷ 2,235 M de equivalentes diluidos
  bpa12m: { Bajista: 320.9, Base: 367.6, Alcista: 401.6 },
};
