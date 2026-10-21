// Supuestos del DCF, escenarios y pesos de MONY Group (corte 2026-10-21). Ejercicio natural; millones de GBP.
// Margen EBITDA del DCF = EBITDA publicado (resultado operativo + amortizaciones), es decir, DESPUÉS del IVA irrecuperable
// que la empresa excluye de su ajustado (1,0 / 3,0 / 4,4 M en 2023-2025 y 2,3 M en el 1S26 [A1, A3]): se trata como un
// coste que se repite a medio plazo (−1,0 punto en 2026e y −0,5 puntos después) y la provisión pendiente va al puente.
// EBITDA ajustado previsto: 32,2 % en 2026e (≈ 145,5 M, centro del consenso de 140-148 M [D7]) → 33,0 % en 2029e.
const g = [1.3, 3.5, 3.5, 3.0, 3.0, 2.5, 2.5];
const ajustado = [32.2, 32.5, 32.8, 33.0, 33.0, 33.0, 33.0];
const m = ajustado.map((x, i) => Math.round((x - (i === 0 ? 1.0 : 0.5)) * 10) / 10);
// Amortización total (con la de los intangibles comprados, que se acaba: Quidco y la marca MSE): 5,2 % de las ventas en
// 2025 (23,3 M [A15]); la subyacente (software y derechos de uso) es ≈ 3,0 %.
const am = [4.8, 4.2, 3.7, 3.3, 3.1, 3.0, 3.0];
// Capex (software capitalizado e inmovilizado) + pagos de arrendamientos: 9,6 + 2,9 = 12,5 M en 2025 (2,8 %) [A15].
const cx = [2.9, 2.9, 3.0, 3.0, 3.0, 3.0, 3.0];
export const AJUSTADO = ajustado;
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -1.5, tasa_impositiva_pct: 25.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.30, beta: 0.92, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25.0, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 9.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.5, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 0.8, otros_pct: -3.0 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.0 },
  ],
  // Mercado de comparadores del Reino Unido (IBISWorld ≈ 2.100 M GBP en 2025, +2,7 % anual [B1]) llevado a 2030e.
  mercado_final: { periodo: '2030e', tamano: 2400 },
};
