// Supuestos del DCF, escenarios y pesos de Royal Unibrew (corte 2026-10-21). Ejercicio a 31-dic. Millones de DKK.
// Margen EBITDA del DCF = EBITDA publicado (la empresa no ajusta partidas: no hay «EBITDA ajustado» aparte).
// 2026e fijo en la guía (EBIT 2.325-2.425; ventas planas; capex ≈ 7 %) [A2]. 2029e: fin de las licencias de PepsiCo en
// Dinamarca, Finlandia y Bálticos (≈ 13 % de las ventas, margen EBIT cercano al del grupo) y ≈ 300 M de costes de transición
// (que restamos del EBITDA de 2029e, ≈ 2 puntos de margen) [A7]. La empresa dice que el EBIT de 2030 superará al de 2028.
const g = [0.6, 3.5, 3.5, -9.0, 4.0, 3.5, 3.0, 2.5];
const m = [19.9, 20.4, 20.8, 18.6, 21.2, 21.3, 21.4, 21.4];
// Amortización total (material, derechos de uso e intangibles): 4,6 % de las ventas en 2025 y 4,9 % en el semestre de 2026.
const am = [4.9, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0];
// Capex con altas de derechos de uso: 6,4 % en 2025, guía ≈ 7 % en 2026; la dirección espera un capex menor tras PepsiCo.
const cx = [7.0, 7.0, 6.5, 5.5, 5.5, 5.5, 5.5, 5.5];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 4.6, tasa_impositiva_pct: 22.0, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 3.47, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 22.0, peso_deuda_pct: 24 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 35 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: -2.4 },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: -11.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  mercado_final: null,
};
