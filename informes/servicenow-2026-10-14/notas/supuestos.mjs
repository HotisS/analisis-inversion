// Supuestos numéricos (ServiceNow, corte 2026-10-14). Base: 2025 real (13.278 M USD). EBITDA GAAP: la remuneración
// en acciones (14,7 % de las ventas en 2025) es gasto; la amortización incluye la de los intangibles de Armis y Moveworks.
// 2026e fijo: dos trimestres publicados y guía de suscripciones de ≈15.770 M (consenso de ventas 16.220 M).
// 2027-2030: senda del objetivo de la empresa de ≈30.000 M de suscripciones en 2030; luego baja hasta el 5 % en 2035.
const crec = [22.2, 18.5, 17.0, 16.0, 15.0, 13.0, 11.0, 9.0, 7.0, 5.0];
// Margen EBITDA GAAP: 19,3 % en 2025; 17,5 % en 2026 por los costes de Armis; sube con el apalancamiento operativo
// y la menor remuneración en acciones relativa hasta el 33 % (SAP 31 %, Salesforce 27 %, Adobe 39 %).
const margen = [17.5, 22.5, 24.0, 26.0, 28.0, 29.5, 31.0, 32.0, 33.0, 33.0];
const amort = [6.2, 6.0, 6.0, 5.8, 5.6, 5.4, 5.2, 5.0, 5.0, 5.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: 6.0,
  nwc_pct_ventas: -40,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 22, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 14.0, precio_pct: 4.0, otros_pct: 4.2 },
    { periodo: '2027e', volumen_pct: 12.0, precio_pct: 4.5, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 12.5, precio_pct: 4.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 12.0, precio_pct: 4.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 11.0, precio_pct: 4.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
};
