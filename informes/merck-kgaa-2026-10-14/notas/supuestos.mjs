// Supuestos numéricos (Merck KGaA, corte 2026-10-14). Base: 2025, ventas 21.102 M EUR.
// Margen EBITDA del DCF = margen EBITDA publicado ≈ EBITDA pre − 1 punto (los ajustes «pre» de reestructuración e integración se
// repiten cada año: 210 M en 2025, 293 M en 2024). Bio-Techne queda fuera de la proyección y del puente (no ha cerrado; la empresa no
// espera que aporte al BPA pre hasta el tercer año: se supone comprada a su valor).
// 2028e-2030e rebajados medio punto (de 4,5/4,5/4,0 a 4,0/4,0/3,5) tras la prueba de sostenibilidad hecha a mano (ver textos).
const crec = [1.4, 3.0, 4.0, 4.0, 3.5, 3.5, 3.0, 3.0, 2.5, 2.5];
const margen = [27.5, 27.5, 28.0, 28.3, 28.5, 28.5, 28.5, 28.5, 28.5, 28.5];
// Amortización sin la de intangibles comprados (≈ 5 % de ventas, no es caja y en buena parte no deduce): la del inmovilizado
// propio y el software, que cuadra con el BPA pre de 2025 (≈ 5,5 %), más algo de margen por la capitalización de I+D.
const amort = [6.0, 6.0, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7];
const capex = [9.3, 9.0, 8.7, 8.4, 8.1, 7.8, 7.5, 7.3, 7.1, 7.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 29.5,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 22, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: -2.1 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 0.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
  // BPA pre 2028e (base «pre», la del PER histórico): ventas × (margen del DCF + 1 punto) − amortización sin intangibles comprados
  // (5,5 % de ventas, la que cuadra el BPA pre de 2025) − 300 M de resultado financiero − 22 % de impuestos − 10 M de minoritarios,
  // ÷ 434,8 M de acciones. Detalle en revision-12m-2026-10-14.md.
  bpa: { 2026: 8.27, 2027: 8.53, Bajista: 8.14, Base: 9.10, Alcista: 9.71 },
};
