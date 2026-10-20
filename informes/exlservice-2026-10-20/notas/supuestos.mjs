// Supuestos del DCF, escenarios y pesos de ExlService (corte 2026-10-20). Ejercicio natural (31-dic); 2026e en curso
// (quedan 2,4 meses). Millones de USD.
// Margen EBITDA del DCF = EBITDA GAAP (CON los pagos en acciones como coste: 79,5 M USD en 2025, 3,8 % de las ventas;
// 17,9 % de margen en 2025 y 17,6 % en el LTM a jun-26 [A1, A3]). El EBITDA ajustado de la empresa (21,7 % en 2025) los
// excluye; aquí se tratan como un coste recurrente de personal.
const g = [15.0, 10.5, 9.0, 8.0, 7.0, 6.0, 5.0, 4.0];
const m = [17.5, 17.6, 17.8, 18.0, 18.0, 18.0, 18.0, 18.0];
// Amortización total (depreciación ≈ 2,2 % + intangibles comprados ≈ 0,6 %, que suben con iMerit): 2,8 % en 2025.
const am = [2.6, 2.7, 2.6, 2.5, 2.5, 2.5, 2.5, 2.5];
// Inversión: 52,6 M en 2025 (2,5 %); guía 2026 de 58-62 M (2,5 %) [A5, A3].
const cx = [2.5, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6, 2.6];
// Circulante: clientes y activos de contrato ≈ 16-17 % de las ventas (343 M de clientes en 2025 con 2.088 M de ventas) [A1].
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 17.0, tasa_impositiva_pct: i < 3 ? 22.0 : 22.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.5, tasa_impositiva_pct: 22.0, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 12.5, precio_pct: 1.0, otros_pct: 1.5 },
    { periodo: '2027e', volumen_pct: 7.5, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 7.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Gasto mundial en servicios de TI (Gartner: 1.870.197 M USD en 2026e [B2]) creciendo un 6 % anual hasta 2033e.
  mercado_final: { periodo: '2033e', tamano: 2812000 },
};
