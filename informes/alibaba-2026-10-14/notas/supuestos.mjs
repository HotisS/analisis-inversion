// Supuestos numéricos (Alibaba, corte 2026-10-14). Millones de RMB; base FY2026 (1.023.670 M; EBITDA 92.296 M + 10.007 M de
// deterioro del fondo de comercio = 102.303 M, 10,0 %). EBITDA después de pagos en acciones (≈1,1 % de las ventas).
const crec = [9, 9, 8, 7, 6, 5, 4, 3.5];
const margen = [12.3, 16.5, 17.5, 19, 20, 20.5, 21, 21];
const amort = [5.5, 6.5, 7.0, 7.0, 7.0, 6.8, 6.6, 6.5];
const capex = [18, 12, 10, 8.5, 7.5, 7.0, 7.0, 7.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 20,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 1.67, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.9, coste_deuda_pct: 3.0, tasa_impositiva_pct: 20, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.1, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 7, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 7, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 6, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 5, precio_pct: 2, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4, precio_pct: 2, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 1, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
