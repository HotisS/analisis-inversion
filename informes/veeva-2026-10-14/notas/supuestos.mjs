// Supuestos numéricos (Veeva, corte 2026-10-14). Base: FY2026 (cerrado el 31-ene-2026), 3.195,3 M USD.
// Todo en base GAAP: la remuneración en acciones (≈14-15 % de las ventas) es gasto dentro del EBITDA.
// Los ingresos financieros de la caja no están en el DCF: la caja va al puente.
const crec = [15.3, 13.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0, 6.0, 5.0];
const margen = [31.0, 32.0, 33.0, 34.0, 34.5, 35.0, 35.0, 35.0, 35.0, 35.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 1.2,
  capex_pct_ventas: i < 9 ? 1.0 : 1.2,
  nwc_pct_ventas: -5,
  tasa_impositiva_pct: 23,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.22, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 10.3, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: 'FY2028e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: 'FY2029e', volumen_pct: 8.5, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 7.0, precio_pct: 3.0, otros_pct: 0 },
  ],
  // Mercado direccionable de Veeva: >20.000 M USD en FY2026 creciendo al 6 % (Evaluate, citado por Veeva) → FY2036e.
  mercado_final: { periodo: 'FY2036e', tamano: 35800 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4, ajuste_margen_pp: -4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
