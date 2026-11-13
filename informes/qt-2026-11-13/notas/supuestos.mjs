// Supuestos del DCF, escenarios y pesos de Qt Group (corte 2026-11-13). Ejercicio natural (31 de diciembre). Millones de EUR.
// 2026e (fijo, en curso desde hace 10,4 meses, con nueve meses publicados): 165,7 M de ventas en enero-septiembre [A11] y un 4T de
// ≈ 77,8 M (77,1 en el 4T25 con 2,5 meses de IAR; licencias nuevas al alza, IAR todo el trimestre pero en suscripción, distribución
// incierta) → 243,5 M (+12,6 %; Inderes 243,0, Yahoo 243,75 [D16, D2]). Margen EBITDA del 23,7 % con los 9,7 M de reorganización
// dentro: 24,2 M en nueve meses + ≈ 33,5 M en el 4T (EBITA ≈ 32 M, como Inderes, que da un EBITA del 21,4 % en el año [D16]).
// Margen EBITDA del DCF = EBITDA NIIF (con arrendamientos fuera, NIIF 16). Por eso el «capex» del DCF suma la inversión
// (≈ 0,5 % de las ventas) y los pagos de arrendamientos (≈ 1,3-1,7 %), y el puente no resta arrendamientos.
// Amortización del DCF = solo depreciación (≈ 2 %); la de los intangibles comprados (PPA, ≈ 13 M) no desgrava (compra de acciones).
// 2027e: +8,0 % (Inderes +7,3 %, Yahoo +8,9 %) y margen del 29,5 % (sin reorganización: 27,7 % en 2026 + parte de los ahorros).
const g = [12.6, 8.0, 8.0, 7.5, 7.0, 6.0, 5.0, 4.0];
const m = [23.7, 29.5, 30.5, 31.5, 32.0, 32.5, 32.5, 32.5];
const am = [2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const cx = [2.0, 1.8, 1.8, 1.9, 1.9, 2.0, 2.0, 2.0];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 15.0, tasa_impositiva_pct: 21.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.33, beta: 1.35, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.8, tasa_impositiva_pct: 21.0, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 15.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 0.0, otros_pct: 10.6 },
    { periodo: '2027e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 5.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Software embebido en 2033e: 42.600 M USD (Grand View Research [B2]) ÷ 1,1063 USD por EUR (13-nov-2026 [D2]).
  mercado_final: { periodo: '2033e', tamano: 38507 },
};
