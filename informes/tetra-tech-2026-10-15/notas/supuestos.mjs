// Supuestos del DCF, escenarios y pesos de Tetra Tech (corte 2026-10-15). Ejercicio a finales de septiembre (FY2026 = oct-25 a sep-26, cerrado el 27-sep-2026 y sin publicar), USD, US GAAP.
// Proyección sobre ingresos brutos (con subcontratas), que es lo que da el XBRL; la guía de la empresa va en ingresos netos (≈85 % de los brutos).
// FY2026e fijo: 9 meses publicados (3.739 M brutos) + 4T estimado ≈1.330 M = ≈5.070 M (−6,8 %); EBITDA ≈654 M (guía de BPA 1,56-1,59 y consenso 654 M ajustado).
// Amortización con la de intangibles comprados (≈1,0 % de las ventas hoy), que baja hacia el capex.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 11.5, tasa_impositiva_pct: 27.0, fijo });
export default {
  anios: [
    a('FY2026e', -6.8, 12.9, 1.1, 0.45, true),
    a('FY2027e', 4.0, 13.1, 1.0, 0.5),
    a('FY2028e', 5.0, 13.4, 0.9, 0.5),
    a('FY2029e', 5.5, 13.6, 0.8, 0.55),
    a('FY2030e', 5.0, 13.8, 0.7, 0.55),
    a('FY2031e', 4.5, 14.0, 0.65, 0.6),
    a('FY2032e', 4.0, 14.0, 0.6, 0.6),
  ],
  wacc: { tasa_libre_pct: 5.19, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 26.0, peso_deuda_pct: 9.0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: -9.0, precio_pct: 1.0, otros_pct: 1.2 },
    { periodo: 'FY2027e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 1.5 },
    { periodo: 'FY2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado: ingresos de diseño de las 500 mayores de ENR (158.700 M en 2025) creciendo un 5 % al año hasta 2032.
  mercado_final: { periodo: 'FY2032e', tamano: 223000 },
  // BPA FY2028e (US GAAP, con amortización de intangibles, tipo 27 %): ventas × margen − amortización − intereses netos (≈30 M) − impuesto, ÷ ≈250 M acciones (parte de la recompra anunciada).
  bpa_12m: { Bajista: 1.57, Base: 1.90, Alcista: 2.08 },
};
