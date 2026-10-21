// Supuestos del DCF, escenarios y pesos de Interparfums SA (corte 2026-10-21, tras las ventas de los nueve meses). Ejercicio natural, EUR, millones.
// EBITDA = resultado operativo + amortizaciones (2,8 % de ventas). Capex incluye derechos de licencia y marcas.
const a = (periodo, g, m, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 2.8, capex_pct_ventas: cx, nwc_pct_ventas: 30, tasa_impositiva_pct: 25.5, fijo });
export default {
  anios: [
    a('2026e', -3.4, 21.0, 2.5, true), // guía: el alto de 850-870 M (≈870 M, 21-oct) y margen operativo ≈18 %
    a('2027e', 6.0, 21.6, 3.5),
    a('2028e', 5.0, 22.1, 3.5),
    a('2029e', 4.5, 22.3, 3.2),
    a('2030e', 4.0, 22.5, 3.2),
    a('2031e', 3.5, 22.5, 3.0),
    a('2032e', 3.0, 22.5, 3.0),
  ],
  wacc: { tasa_libre_pct: 3.47, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2031e', crecimiento_pp: -18, margen_pp: -3 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 2.0, otros_pct: -4.4 },
    { periodo: '2027e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 35736 },
  // BPA propio 2028e por escenario (ventas × margen EBIT − 3 M de resultado financiero, 25 % de impuestos, +0,3 M de participadas y minoritarios) ÷ 87,83 M
  bpa_2028: { Bajista: 1.34, Base: 1.574, Alcista: 1.72 },
};
