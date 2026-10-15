// Supuestos del DCF, escenarios y pesos de Broadridge (corte 2026-10-15). Ejercicio a 30 de junio, USD, US GAAP.
// EBITDA = EBIT + depreciación + amortización de intangibles comprados + amortización de otros activos (costes de conversión de clientes).
// Capex = inmovilizado y software (≈1,5 % de ventas) + costes de conversión de clientes activados (≈2,1 %, en «otros activos no corrientes» del flujo operativo).
// La amortización baja del 6,8 % de las ventas al 3,7 % porque la de intangibles comprados (203,6 M en 2026, ≈130 M en la guía 2027) se agota.
const a = (periodo, g, m, am, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: 3.7, nwc_pct_ventas: -3.0, tasa_impositiva_pct: 23.0, fijo });
export default {
  anios: [
    a('FY2027e', 5.0, 24.6, 5.7),
    a('FY2028e', 4.0, 25.2, 5.2),
    a('FY2029e', 4.5, 25.6, 4.8),
    a('FY2030e', 4.5, 25.8, 4.4),
    a('FY2031e', 4.0, 26.0, 4.1),
    a('FY2032e', 3.5, 26.0, 3.9),
    a('FY2033e', 3.0, 26.0, 3.7),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23.0, peso_deuda_pct: 14.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: -1.0 },
    { periodo: 'FY2029e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: -0.5 },
    { periodo: 'FY2030e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: 'FY2031e', volumen_pct: 3.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: 'FY2033e', tamano: 85000 },
  // BPA FY2028e (US GAAP normalizado, sin activos digitales): ventas × margen − amortización − intereses (−105 M) − impuesto 23 %, ÷ 113,5 M acciones.
  bpa_12m: { Bajista: 8.96, Base: 10.37, Alcista: 11.14 },
};
