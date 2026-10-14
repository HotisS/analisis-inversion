// Supuestos del DCF, escenarios y pesos de Demant (corte 2026-10-14). Ejercicio natural, DKK.
// Capex = inversión en inmovilizado e intangibles (≈ 3,7 % de ventas) + altas de derechos de uso (NIIF 16, ≈ 3,3 %: 883 M en 2025).
// 2026e fijo: guía del 9-oct (orgánico 7-8 %, compras +9 %, divisa −1 %; EBIT antes de especiales 4.700-5.000 M y especiales −400 M).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 23.5, tasa_impositiva_pct: 23, fijo });
export default {
  anios: [
    a('2026e', 15.5, 23.6, 6.8, 6.9, true),
    a('2027e', 7.0, 25.0, 6.8, 7.0),
    a('2028e', 6.5, 25.6, 6.7, 7.0),
    a('2029e', 6.0, 26.0, 6.6, 7.0),
    a('2030e', 5.5, 26.2, 6.6, 7.0),
    a('2031e', 5.0, 26.3, 6.6, 7.0),
    a('2032e', 4.5, 26.3, 6.6, 7.0),
  ],
  wacc: { tasa_libre_pct: 3.48, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.3, tasa_impositiva_pct: 23, peso_deuda_pct: 20 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 8.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 1.0 },
  ],
  mercado_final: { periodo: '2032e', tamano: 194500 },
};
