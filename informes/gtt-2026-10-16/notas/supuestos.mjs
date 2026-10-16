// Supuestos del DCF, escenarios y pesos de GTT (corte 2026-10-16). Ejercicio natural, EUR, NIIF-UE.
// EBITDA recurrente (sin los 48,7 M no corrientes de Elogen de 2025): 541,8 M en 2025, un 67,5 % de las ventas.
// Los ingresos siguen la cartera publicada (300 M en el 2S26, 655 M en 2027, 603 M en 2028, 295 M en 2029+) más
// pedidos nuevos, servicios y GTT Marine. Capex con altas de derechos de uso; impuesto bajo por el régimen de patentes.
const a = (periodo, g, m, am, cx, nwc, t, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', -4.7, 67.5, 3.8, 4.0, 0.5, 15.0, true),
    a('2027e', 7.2, 67.0, 3.6, 3.8, 1.0, 15.5),
    a('2028e', 9.8, 67.0, 3.4, 3.6, 1.0, 16.0),
    a('2029e', 2.0, 66.5, 3.3, 3.5, 1.0, 16.0),
    a('2030e', -3.0, 65.5, 3.3, 3.5, 1.0, 16.5),
    a('2031e', -3.0, 65.0, 3.3, 3.5, 1.0, 16.5),
    a('2032e', 2.5, 65.0, 3.3, 3.5, 1.0, 17.0),
  ],
  wacc: { tasa_libre_pct: 3.45, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 1.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -8.0, precio_pct: 1.0, otros_pct: 2.3 },
    { periodo: '2027e', volumen_pct: 5.7, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 8.3, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: -4.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA 2028e (cálculo en revision-12m): ventas × margen EBIT + financiero − impuestos, ÷ 37,15 M acciones
  bpa_12m: { Bajista: 11.69, Base: 13.10, Alcista: 13.94 },
};
