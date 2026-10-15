// Supuestos del DCF, escenarios y pesos de Thales (corte 2026-10-15). Ejercicio natural, EUR, NIIF-UE.
// EBITDA publicado sin participadas (Naval Group va en el puente) y con los no recurrentes devueltos: 14,5 % en 2025.
// Equivale al EBIT ajustado de la empresa − participadas (≈0,9 % de ventas) + amortizaciones sin PPA (≈3,1 %).
// Amortización con la de los activos de compras (PPA: 395 M en 2025, decreciente) y la de derechos de uso;
// capex = inversión neta de explotación (3,4 %) + altas de derechos de uso (≈0,9 %).
const a = (periodo, g, m, am, cx, nwc, t = 24.5, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', 6.2, 15.0, 4.4, 4.3, -25.0, 25.5, true),
    a('2027e', 8.0, 15.4, 4.2, 4.3, -24.5),
    a('2028e', 8.0, 15.8, 4.0, 4.2, -24.0),
    a('2029e', 6.5, 16.0, 3.9, 4.1, -23.5),
    a('2030e', 5.5, 16.1, 3.8, 4.0, -23.0),
    a('2031e', 4.0, 16.1, 3.7, 3.9, -23.0),
    a('2032e', 3.0, 16.1, 3.7, 3.8, -23.0),
  ],
  wacc: { tasa_libre_pct: 3.51, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25, peso_deuda_pct: 10.8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: -1.3 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  // BPA ajustado 2028e (cálculo en revision-12m): ventas × margen EBIT ajustado (con Naval Group) − financiero − impuestos − minoritarios, ÷ 205,5 M acciones
  bpa_12m: { Bajista: 11.4, Base: 13.35, Alcista: 14.3 },
};
