// Supuestos numéricos (Mastercard, corte 2026-10-14). Base: 2025 real (32.791 M USD). Ejercicio natural.
// 2026e casi cerrado por la guía: 1S26 +15 % (17.677 M) y guía en la parte alta de «low double digits» a tipo constante + 1 punto de divisa.
// Margen EBITDA en base contable con litigios recurrentes: 2025 contable 61,1 % (EBIT 57,6 % + 3,5 % de amortización);
// ajustado ≈ 62,6 %. Proyectamos 62,5-63,5 %: el margen ajustado menos ≈1 punto de litigios y especiales que se repiten.
const crec = [14.0, 12.0, 11.5, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const margen = [62.5, 63.0, 63.5, 63.5, 63.5, 63.5, 63.5, 63.5, 63.5, 63.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.5,
  capex_pct_ventas: i < 5 ? 3.8 : 3.6,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 20.0,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 20.0, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 3.0 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 7.5, precio_pct: 2.0, otros_pct: 2.0 },
    { periodo: '2029e', volumen_pct: 7.5, precio_pct: 2.0, otros_pct: 1.5 },
    { periodo: '2030e', volumen_pct: 7.0, precio_pct: 1.5, otros_pct: 1.5 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
