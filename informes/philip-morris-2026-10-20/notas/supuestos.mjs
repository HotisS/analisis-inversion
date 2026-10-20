// Supuestos del DCF, escenarios y pesos de Philip Morris International (corte 2026-10-20). Ejercicio a 31 de diciembre.
// Millones de USD. Margen EBITDA del DCF = EBITDA ajustado de la empresa (resultado operativo sin la amortización de
// intangibles comprados ni las partidas que la empresa excluye, + depreciación; 42,9 % de las ventas en 2025) MENOS 0,3
// puntos de ventas por las partidas «no recurrentes» que se repiten casi todos los años (513, 503, 1.284, 451 y 533 M de
// 2021 a 2025: reestructuraciones, litigios fiscales, deterioros).
const g = [7.0, 5.5, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const m = [43.7, 44.3, 44.8, 45.2, 45.5, 45.7, 45.8, 45.8];
// Amortización total (depreciación ≈ 2,45 % de las ventas + intangibles comprados ≈ 1.000 M USD fijos, casi todos de
// Swedish Match): 4,9 % de las ventas en 2025 (1.996 M); baja al diluirse la amortización fija.
const am = [4.7, 4.6, 4.4, 4.2, 4.0, 3.9, 3.7, 3.6];
// Inversión: guía 2026 de 1.400-1.600 M USD (≈ 3,5 % de las ventas), sobre todo para productos sin humo (fábricas de
// ZYN en EE. UU.); en el último año igual a la amortización.
const cx = [3.5, 3.5, 3.5, 3.5, 3.5, 3.6, 3.6, 3.6];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 28.0, tasa_impositiva_pct: 22.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 0.65, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.6, tasa_impositiva_pct: 22.0, peso_deuda_pct: 13.5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.5, precio_pct: 5.0, otros_pct: 1.5 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 5.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 1.0, precio_pct: 4.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 1.0, precio_pct: 4.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 3.5, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
