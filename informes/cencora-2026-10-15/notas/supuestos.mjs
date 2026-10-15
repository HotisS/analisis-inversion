// Supuestos del DCF, escenarios y pesos de Cencora (corte 2026-10-15). Ejercicio a 30 de septiembre, etiquetado por el año
// en que termina (FY2026 = oct-25 a sep-26, ya cerrado pero sin publicar: resultados el 4-nov-2026). Millones de USD.
// Margen EBITDA del DCF = EBITDA ajustado de la empresa (resultado operativo ajustado + depreciación, sin amortización de
// intangibles comprados) MENOS 0,07 puntos de ventas por los costes de reestructuración e integración, que se repiten
// todos los años (≈ 230 M anuales en FY2023-FY2025) y la empresa excluye de su ajustado.
const g = [5.0, 4.0, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [1.52, 1.58, 1.62, 1.65, 1.67, 1.68, 1.68, 1.68];
// Amortización: depreciación (≈ 0,17-0,18 % de ventas) + intangibles comprados (≈ 480 M en FY2026, decrecientes).
const am = [0.31, 0.30, 0.29, 0.28, 0.27, 0.27, 0.26, 0.26];
// Capex: guía FY2026 ≈ 900 M (0,27 % de ventas); converge con la amortización al final.
const cx = [0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27];
const anios = g.map((x, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -2.7, tasa_impositiva_pct: 21.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.19, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.8, tasa_impositiva_pct: 21.0, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.12, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.06, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 4.5, precio_pct: 0.5, otros_pct: 0.0 },
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: -0.5 },
    { periodo: 'FY2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2029e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
