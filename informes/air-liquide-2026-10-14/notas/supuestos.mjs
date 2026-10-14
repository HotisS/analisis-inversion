// Supuestos numéricos del analista (Air Liquide, corte 2026-10-14). Base: 2025 (26.940 M EUR).
// Margen EBITDA del DCF = EBITDA recurrente (OIR + amortización) − 0,8 puntos por los «no recurrentes» que se repiten cada año.
// 2025: EBITDA recurrente 30,2 % (8.145 M); 2026e con +100 pb de margen operativo (guía) y amortización del 9,7 % (compra de DIG Airgas).
const crec = [3.0, 5.0, 5.0, 4.5, 4.5, 4.0, 3.5, 3.5, 3.0, 3.0];
const margen = [30.4, 31.2, 31.7, 32.1, 32.4, 32.4, 32.4, 32.4, 32.4, 32.4];
const capex = [14.0, 14.5, 14.5, 14.5, 14.0, 13.5, 13.0, 12.5, 12.0, 11.5];
const amort = [9.7, 9.7, 9.8, 9.8, 9.9, 10.0, 10.0, 10.0, 10.0, 10.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 11.0,
  tasa_impositiva_pct: 26.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.51, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 26, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado mundial de gases industriales: ≈95.760 M EUR en 2025 (Vyansa, 107.200 M USD a 1,1195), al 5 % anual hasta 2035.
  mercado_final: { periodo: '2035e', tamano: 155980 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
