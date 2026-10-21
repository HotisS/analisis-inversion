// Supuestos del DCF, escenarios y pesos de Hilton (corte 2026-10-21). Ejercicio natural; millones de USD.
// Base de la cuenta: la «ajustada» de Hilton (ingresos sin reembolsos de costes, con la amortización de captación de contratos
// devuelta; EBITDA ajustado − pagos en acciones). Margen EBITDA de 2025: (3.725 − 170) ÷ 5.011 = 70,9 %.
// 2026e fijo: guía de EBITDA ajustado 4.040-4.080 M (punto medio 4.060) − pagos en acciones ≈ 192 = 3.868 M sobre ingresos
// 5.011 × 1,065 = 5.337 M → 72,5 %.
const g = [6.5, 8.0, 7.5, 7.0, 6.5, 6.0, 5.0, 4.0];
const m = [72.5, 73.5, 74.3, 75.0, 75.5, 76.0, 76.0, 76.0];
// Amortización (D&A sin la de la compra de 2007 + amortización de costes de captación de contratos): 234 M en 2025 (4,7 %).
const am = [4.7, 4.7, 4.7, 4.7, 4.7, 4.7, 4.7, 4.7];
// Inversión: dinero clave (costes de captación de contratos) + inmovilizado y software sin lo reembolsado. Guía 2026 ≈ 300 M (5,6 %);
// 416 M en 2025 (185 de inversión + 231 de dinero clave neto, 8,3 %). Tomamos 5,8-6,5 %.
const cx = [5.8, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 26.0, tasa_impositiva_pct: 28.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.12, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25.0, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -14.0, margen_pp: -4.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 6.0, precio_pct: 3.0, otros_pct: -2.5 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
