// Supuestos del DCF, escenarios y pesos de Manhattan Associates (corte 2026-10-19). Ejercicio natural (cierre 31-dic).
// Millones de USD. Margen EBITDA del DCF = EBITDA GAAP (resultado operativo GAAP + amortización), es decir, CON la
// remuneración en acciones como coste (111 M en 2025, 10,3 % de las ventas) y con la reestructuración de 2026.
// 2025 real: ventas 1.081,4; EBITDA 286,1 (26,5 %). 2026e fijo: guía de ventas 1.160-1.166 (+7,5 %) y de BPA GAAP
// 3,59-3,65 → resultado operativo GAAP ≈ 280 M incluida la reestructuración de 8,3 M (≈ 24,1 %) + amortización 7 M.
const g = [7.5, 9.0, 9.5, 9.0, 8.5, 8.0, 7.0, 6.0, 5.0, 4.0];
const m = [24.8, 26.0, 27.0, 28.0, 29.0, 29.5, 30.0, 30.5, 30.5, 30.5];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 0.6, capex_pct_ventas: 1.4,
  nwc_pct_ventas: -13.0, tasa_impositiva_pct: 23.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.09, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 22.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 2.5, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.0, precio_pct: 2.5, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 58420 },
};
