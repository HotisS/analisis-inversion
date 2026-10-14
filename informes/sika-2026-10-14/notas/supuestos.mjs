// Supuestos numéricos del analista (Sika, corte 2026-10-14). Base: 2025 (11.201 M CHF, margen EBITDA publicado 18,4 %).
// 2026e casi cerrado (1S26 publicado y guía de julio): +1 % en CHF = +4,5 % en moneda local, −4,5 % de divisa y +1 % de compras (Akkim).
// Caso base rebajado por la prueba de sostenibilidad: 2027-2029 medio punto menos (5,0/5,5/5,0 → 4,5/5,0/4,5).
// Margen 2026e 19,2 % (guía 19,0-19,5 %); sube hacia el 21 % (Strategy 2028 pide 20-23 %) sin llegar al centro del rango.
const crec = [1.0, 4.5, 5.0, 4.5, 4.5, 4.0, 3.5, 3.0, 2.5, 2.0];
const margen = [19.2, 19.8, 20.3, 20.6, 20.8, 21.0, 21.0, 21.0, 21.0, 21.0];
const amort = [4.8, 4.7, 4.6, 4.5, 4.4, 4.2, 4.0, 3.8, 3.7, 3.6];
// Capex con ≈0,7 puntos de circulante (≈15 % de las ventas × crecimiento): el balance no da el circulante y nwc va a 0.
const capex = [4.0, 4.1, 4.2, 4.1, 4.1, 4.0, 3.9, 3.8, 3.7, 3.6];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 21.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 0.54, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 21.5, peso_deuda_pct: 16 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -3.5 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado mundial de química de construcción: 82.548 M USD en 2025 → 101.889 M USD en 2030 (ResearchAndMarkets), a 0,80 CHF/USD.
  mercado_final: { periodo: '2030e', tamano: 81500 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
