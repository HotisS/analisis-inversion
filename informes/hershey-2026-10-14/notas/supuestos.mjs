// Supuestos del DCF, escenarios y pesos de Hershey (corte 2026-10-14). USD, US GAAP, ejercicio natural.
// Margen EBITDA AJUSTADO (beneficio operativo ajustado + amortizaciones): el año base 2025 lleva 528,9 M de derivados y reorganización devueltos
// (no_recurrentes_en_ebitda). 2026e fijo con la guía de julio (ventas +4,5-5 %, BPA ajustado 8,36-8,52 USD).
// Capex: guía 2026 de 425-475 M (≈3,7 %); sube hacia la amortización (4,3 %) en el estado estacionario.
// Circulante comercial (existencias + clientes − proveedores) al cierre: 7,7 % de las ventas en 2025; 8 % con el cacao aún caro en inventario.
const a = (periodo, g, m, am, cx, fijo = false, t = 25.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.0, tasa_impositiva_pct: t, fijo });
export default {
  anios: [
    a('2026e', 4.7, 25.0, 4.4, 3.8, true, 26),
    a('2027e', 3.0, 26.0, 4.4, 4.0),
    a('2028e', 3.5, 26.8, 4.3, 4.2),
    a('2029e', 3.5, 27.2, 4.3, 4.3),
    a('2030e', 3.5, 27.4, 4.3, 4.3),
    a('2031e', 3.0, 27.5, 4.3, 4.3),
    a('2032e', 3.0, 27.5, 4.3, 4.3),
    a('2033e', 2.5, 27.5, 4.3, 4.4),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 25.5, peso_deuda_pct: 14.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -3.0, precio_pct: 6.0, otros_pct: 1.7 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  mercado_final: null,
  // BPA ajustado del ejercicio objetivo (2028e): ventas × margen EBITDA − amortización − intereses y otros gastos (≈225 M) − impuestos (25,5 %)
  // ÷ 199 M acciones diluidas (200,9 M en circulación hoy + 0,6 M de dilución, con recompras ya anunciadas que compensan la dilución y algo más).
  // Cuadre con 2026e: 12.242 × 25,0 % − 539 − 215 = 2.306 × 0,74 / 201,8 = 8,46 USD (guía 8,36-8,52).
  bpa12m: { Bajista: 8.55, Base: 10.15, Alcista: 11.01 },
};
