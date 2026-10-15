// Supuestos del DCF, escenarios y pesos de Johnson Controls (corte 2026-10-15). Ejercicio a 30-sep, USD, US GAAP, operaciones continuadas.
// EBITDA del DCF = EBITDA ajustado de la empresa MENOS una reestructuración y unos costes de transformación normalizados
// (2,4 % de las ventas en 2026, bajando al 0,8 %): JCI reestructura todos los años (701, 1.049, 510 y 546 M en 2022-2025).
// Amortización con la de intangibles comprados (≈1 % de las ventas en 2026, se va agotando). Arrendamientos operativos dentro del EBITDA (US GAAP).
// Circulante = existencias + clientes − proveedores − ingresos diferidos (8,3 % de las ventas a jun-26).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.0, tasa_impositiva_pct: 17, fijo });
export default {
  anios: [
    a('2026e', 8.4, 15.7, 2.6, 1.5, true),
    a('2027e', 7.5, 18.0, 2.5, 1.6),
    a('2028e', 7.0, 18.8, 2.4, 1.7),
    a('2029e', 6.0, 19.3, 2.3, 1.8),
    a('2030e', 5.0, 19.5, 2.2, 1.9),
    a('2031e', 4.5, 19.6, 2.1, 2.0),
    a('2032e', 4.0, 19.6, 2.0, 2.0),
    a('2033e', 3.5, 19.6, 2.0, 2.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 17, peso_deuda_pct: 9.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.4 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
