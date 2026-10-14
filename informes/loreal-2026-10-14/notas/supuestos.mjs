// Supuestos numéricos (L'Oréal, corte 2026-10-14). Base: 2025 (44.053 M EUR de ventas, EBITDA con NIIF 16 de 10.705 M).
// 2026e incluye Kering Beauté desde abril (≈+2 puntos de perímetro) y la divisa en contra (≈−3); 2027-28e, la licencia de Gucci (1-jul-2027).
// Capex = inversión (≈3,6 % de las ventas) + altas de derechos de uso (≈1,2 %): con NIIF 16 el EBITDA no lleva alquileres.
const crec = [5.5, 6.5, 7.0, 5.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [24.6, 24.8, 25.0, 25.2, 25.3, 25.4, 25.5, 25.5, 25.5, 25.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.2,
  capex_pct_ventas: 4.8,
  nwc_pct_ventas: 10.3,
  tasa_impositiva_pct: 25.5,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25.5, peso_deuda_pct: 7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: -1.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.5 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2035e', tamano: 466000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 55, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
