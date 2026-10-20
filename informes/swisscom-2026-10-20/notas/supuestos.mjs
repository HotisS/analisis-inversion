// Supuestos del DCF, escenarios y pesos de Swisscom (corte 2026-10-20). Ejercicio natural; millones de CHF.
// BASE EBITDAaL: margen = EBITDAaL / ventas (la métrica de la empresa, de su guía y del consenso); amortización = solo
// inmovilizado e intangibles (sin derechos de uso, que ya están restados en el EBITDAaL); los arrendamientos no están en la
// deuda del puente. 2026e fijo en la guía (ventas 14.700-14.900; EBITDAaL 5.000-5.100; inversión 3.000-3.100).
const g = [-2.2, -0.4, 0.0, 0.2, 0.5, 0.5, 0.5];
const m = [34.6, 34.9, 35.4, 35.8, 35.8, 35.8, 35.8];
// Amortización sin derechos de uso: 21,0 % en 2025 y ≈ 22 % en el 1S26 (1.606 M sobre 7.221); baja con la inversión y al
// terminar la amortización acelerada de la integración y de los activos comprados (PPA).
const am = [21.8, 21.4, 21.0, 20.6, 20.2, 19.9, 19.6];
// Inversión: guía de 2026 (≈ 3.030 M) y consenso (2.961 M en 2027, 2.841 en 2028) [D3]; a largo plazo igual a la amortización.
const cx = [20.6, 20.2, 19.4, 19.2, 19.4, 19.6, 19.6];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 2.0, tasa_impositiva_pct: 18.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 0.6, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0.8, coste_deuda_pct: 2.0, tasa_impositiva_pct: 18.0, peso_deuda_pct: 26 },
  terminal: { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 9.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.3, crecimiento_terminal_pct: 0.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -0.5, precio_pct: -0.7, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: -0.2, precio_pct: -0.2, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 0.0, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 0.2, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 0.3, precio_pct: 0.2, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
