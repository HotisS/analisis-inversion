// Supuestos del DCF, escenarios y pesos de Amphenol (corte 2026-10-21). Ejercicio a 31 de diciembre. Millones de USD.
// Margen EBITDA del DCF = EBITDA ajustado de la empresa (resultado operativo ajustado + amortizaciones totales; 33,7 % en el
// 1S26: 4.688,8 + 827,2 sobre 16.378,2 de ventas [A4]) MENOS 0,5 puntos de ventas por los gastos de compras y la revalorización
// de existencias compradas (140,4 + 132,0 M en el 1S26, 0,9 + 0,8 puntos) que la empresa excluye de su ajustado y que en un
// comprador en serie se repiten cada año (media de 2024-2026 ≈ 0,5-0,8 puntos).
// 2026e (fijo): consenso de ventas (35.661 M, +54,4 % [D2]) = 1S26 real (16.378) + guía del 3T26 (9.300-9.400) + 4T26 ≈ 9.900.
const g = [54.4, 17.0, 9.0, 6.0, 5.5, 5.0, 4.5, 4.0];
const m = [32.8, 33.0, 32.5, 32.0, 31.5, 31.0, 31.0, 31.0];
// Amortizaciones totales (depreciación + intangibles comprados): 4,0 % de las ventas en 2025 (922 M) y 5,1 % en el 1S26 por
// los intangibles de CCS; bajan con la escala hasta el 3,5 %.
const am = [4.3, 4.0, 3.8, 3.7, 3.6, 3.5, 3.5, 3.5];
// Capex: 4,0 % de las ventas en el 1S26 (647 M) y guía en el máximo del 3-4 %; baja al 3,6 %, por encima de la amortización final.
const cx = [4.0, 4.0, 3.9, 3.8, 3.7, 3.6, 3.6, 3.6];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 22.0, tasa_impositiva_pct: i < 2 ? 27.0 : 26.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.20, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 26.0, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -12.0, margen_pp: -3.0 }, { periodo: '2028e', crecimiento_pp: -15.0, margen_pp: -4.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: 4.0, margen_pp: 1.0 }, { periodo: '2028e', crecimiento_pp: 4.0, margen_pp: 1.0 }] },
  ],
  pesos: { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 45 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: 12.0, precio_pct: 1.0, otros_pct: 4.0 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2031e', volumen_pct: 3.5, precio_pct: 1.0, otros_pct: 0.5 },
  ],
  mercado_final: null,
};
