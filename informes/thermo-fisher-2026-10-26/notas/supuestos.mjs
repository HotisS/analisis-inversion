// Supuestos numéricos del analista (Thermo Fisher, corte 2026-10-26). Base: 2025 (44.556 M USD), EBITDA GAAP (EBIT + amortizaciones).
// 2026e fijo: punto medio de la guía del 21-oct-2026 (47.700-48.200 M), con tres trimestres publicados.
const crec = [7.6, 5.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [24.8, 25.3, 25.8, 26.2, 26.5, 26.5, 26.5, 26.5, 26.5, 26.5];
// Amortización: 6,6 % de las ventas en los últimos 12 meses (3.105 M, dos tercios intangibles de compras) que baja hacia la
// depreciación; capex: guía 2026 de 1.900-2.000 M (≈4,1 %), después 3,5-3,6 %; en el último año capex = amortización.
const amort = [6.6, 6.2, 5.8, 5.4, 5.0, 4.6, 4.3, 4.0, 3.8, 3.6];
const capex = [4.1, 3.8, 3.6, 3.5, 3.5, 3.5, 3.5, 3.5, 3.6, 3.6];
const tasa = [12, 12.5, 13, 14, 15, 15, 15, 15, 15, 15];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 21.5,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

export default {
  anios,
  // Beta 0,90: la ajustada (Blume) de la regresión mensual de 5 años de la propia TMO frente al S&P 500 (0,85 bruta), que ya
  // lleva su apalancamiento: D/E de mercado 41.370 / 249.140 = 0,166. Desapalancada con un 15 % de impuestos: 0,79;
  // reapalancada con la misma estructura: 0,90.
  wacc: { tasa_libre_pct: 5.0, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 15, peso_deuda_pct: 14.3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 3.6 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 1.0 },
  ],
  // Mercado servido según la empresa (255.000 M en 2026, el perímetro de la cuota del 17,5 %) al 6,7 % anual de IMARC.
  mercado_final: { periodo: '2030e', tamano: 330000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 40, transacciones: 0, suma_partes: 0, escenarios: 20 },
};
