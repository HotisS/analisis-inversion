// Supuestos del DCF, escenarios y pesos de Sartorius Stedim Biotech (corte 2026-10-14). EUR, ejercicio natural.
// Margen EBITDA del DCF = EBITDA subyacente − ≈1 punto de partidas «extraordinarias» que se repiten (70 M en 2025, 15 M en 1S26).
// Amortización: incluye la de intangibles de compras (112,6 M en 2025, decreciente). Capex con altas de derechos de uso (≈0,7 % de ventas).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 15.5, tasa_impositiva_pct: 26.0, fijo });
export default {
  anios: [
    a('2026e', 4.8, 30.2, 10.4, 13.0, true),
    a('2027e', 9.0, 31.0, 10.2, 11.5),
    a('2028e', 9.5, 31.7, 10.0, 10.5),
    a('2029e', 9.0, 32.3, 9.8, 9.8),
    a('2030e', 8.0, 32.8, 9.5, 9.2),
    a('2031e', 6.5, 33.2, 9.2, 8.9),
    a('2032e', 5.0, 33.5, 8.9, 8.7),
    a('2033e', 3.5, 33.5, 8.4, 8.5),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.4, tasa_impositiva_pct: 26.0, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: -3.2 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 50800 },
};
