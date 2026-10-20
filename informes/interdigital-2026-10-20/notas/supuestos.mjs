// Supuestos del DCF, escenarios y pesos de InterDigital (corte 2026-10-20). Ejercicio a 31 de diciembre. Millones de USD.
// Margen EBITDA del DCF = EBITDA GAAP (resultado operativo + amortizaciones), DESPUÉS de la remuneración en acciones
// (61 M guiados en 2026) y de los costes de litigios: la guía de 2026 (beneficio neto 270-330 + impuestos 59 + amortización
// 79 − otros 1) da ≈ 437 M sobre 810 M de ingresos = 54 % [A2]. El EBITDA «ajustado» de la empresa (469-529 M, 62 %) suma
// la remuneración en acciones: no se usa.
// Ingresos = recurrentes (ARR de 626 M a 30-jun-2026 [A2]) + atrasados (cobros de años pasados al firmar o ganar un
// arbitraje: 460 M en 2024, 277 M en 2025, 167 M en 1S26). 2026e (fijo) = centro de la guía (775-845 M). 2027e baja porque
// los atrasados caen (≈ 70 M) aunque el ARR suba (Amazon, Disney, IoT); después el crecimiento es solo recurrente.
const g = [-3.0, -6.0, 6.0, 5.0, 3.0, 3.0, 3.0, 2.5, 2.5, 2.5];
const m = [54.0, 53.0, 55.0, 57.0, 58.0, 58.0, 58.0, 58.0, 58.0, 58.0];
// Amortización: 79 M guiados en 2026 (9,8 %), con 32 M de patentes compradas (Technicolor) que se van agotando.
const am = [9.8, 9.5, 9.0, 8.5, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0];
// Capex = inmovilizado + patentes capitalizadas (54,6 M en 2025, 6,5 %; 70,5 M de pagos en caja con las patentes compradas).
const cx = [7.0, 7.0, 7.0, 7.5, 7.5, 8.0, 8.0, 8.0, 8.0, 8.0];
// Circulante: −28,8 % de las ventas en 2025 (ingresos diferidos de 330 M por cobros adelantados de cuotas fijas). Converge
// poco a poco a −24 % porque los contratos nuevos (streaming, IoT) se cobran más por trimestre que por adelantado.
const nwc = [-28.0, -27.0, -26.0, -25.0, -24.0, -24.0, -24.0, -24.0, -24.0, -24.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: nwc[i], tasa_impositiva_pct: i === 0 ? 16.5 : 18.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.15, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 18.0, peso_deuda_pct: 4 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 9.0, precio_pct: 0.0, otros_pct: -12.0 },
    { periodo: '2027e', volumen_pct: 7.0, precio_pct: 0.0, otros_pct: -13.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 0.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 0.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
