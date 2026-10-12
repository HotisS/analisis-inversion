// Supuestos numéricos del analista principal (Coloplast, corte 2026-10-12). Base: FY2025 (2024/25).
const crec = [3.0, 6.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [31.8, 31.6, 32.0, 32.4, 32.8, 33.0, 33.0, 33.0, 33.0, 33.0];
const amort = [5.3, 5.1, 5.0, 4.9, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
const capex = [6.0, 6.0, 5.8, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 26,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 22, peso_deuda_pct: 19.1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: -3.0 },
    { periodo: 'FY2027e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2035e', tamano: 189000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
