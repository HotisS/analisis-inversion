// Supuestos del DCF, escenarios y pesos de Lantheus Holdings (corte 2026-10-20). Ejercicio a 31 de diciembre. Millones de USD.
// Margen EBITDA del DCF = EBITDA recurrente CON la remuneración en acciones como gasto (85,6 M en 2025, 5,6 % de las ventas):
// 2025 = 380,9 GAAP + 106 no recurrentes (costes de compras, colaboración estratégica, deterioros) = 486,9 → 31,6 % [A1, A2].
// 2026e baja al 31,0 % por la venta del negocio SPECT (márgenes mayores), los gastos de lanzamiento de Tauklarify y Bravnesta
// y la integración de Life Molecular; la dirección (DEFM14A) proyecta un EBIT ajustado sin remuneración en acciones de 525 M
// sobre 1.513 M de ventas (34,7 %), ≈ 31 % de EBITDA con ella [D3].
const g = [-3.0, 6.0, 6.5, 5.0, 2.0, 3.0, 4.0, 4.0];
const m = [31.0, 32.0, 33.0, 33.5, 33.5, 34.0, 34.0, 34.0];
// Amortización total = depreciación (≈ 1,5 % de las ventas) + intangibles comprados (Life Molecular, Evergreen, NAVI/Cerveau):
// 45,3 M en el 1S26 → ≈ 6 % de las ventas; baja a medida que se agotan las vidas útiles; 3 % en el último año (= capex).
const am = [6.0, 5.8, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
// Capex: 36,1 M en 2025 (2,3 %), 51,6 M en 2024 (3,4 %, ampliación de Bedford y de Somerset); 2,5-3 %.
const cx = [2.5, 2.5, 2.5, 2.5, 2.7, 2.8, 3.0, 3.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 23.0, tasa_impositiva_pct: i === 0 ? 26.0 : 26.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 26.5, peso_deuda_pct: 8 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: -6.0, otros_pct: -4.0 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: -3.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: -2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 7.0, precio_pct: -2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: -3.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
