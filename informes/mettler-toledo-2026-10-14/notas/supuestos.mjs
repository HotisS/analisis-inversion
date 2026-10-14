// Supuestos numéricos del analista (Mettler-Toledo, corte 2026-10-14). Base: 2025 (4.026 M USD), EBITDA GAAP (EBIT + amortizaciones), 30,9 %.
// 2026e fijo: guía de julio (4-5 % en moneda local + ≈1 punto de divisa; primer semestre +5,5 % publicado).
const crec = [5.8, 5.0, 5.0, 5.0, 4.5, 4.0, 3.5, 3.5, 3.0, 3.0];
const margen = [31.5, 32.0, 32.5, 32.8, 33.0, 33.0, 33.0, 33.0, 33.0, 33.0];
// Amortización ≈3,1 % de las ventas (125 M en 2025); capex 2,7 % en 2025 que sube hasta igualar la amortización al final.
const amort = [3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1];
const capex = [2.7, 2.8, 2.8, 2.9, 2.9, 3.0, 3.0, 3.1, 3.1, 3.1];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 28,
  tasa_impositiva_pct: 19.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 19.5, peso_deuda_pct: 6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 22 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.8, precio_pct: 2.7, otros_pct: 1.3 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.75, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 40, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
