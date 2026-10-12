// Supuestos numéricos del analista principal (Pro Medicus, corte 2026-10-12).
const crec = [26, 23, 21, 19, 17, 15, 13, 11, 9, 7];
const capex = [4.4, 4.2, 4.0, 3.9, 3.8, 3.7, 3.6, 3.5, 3.4, 3.3];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: [78.5, 79, 79.5, 80, 80, 80, 80, 80, 80, 80][i],
  amortizacion_pct_ventas: [3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1, 3.1][i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 5,
  tasa_impositiva_pct: 30,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 5.4, beta: 1.25, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.9, tasa_impositiva_pct: 30, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 25 },
  etapa2: { usar: true, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 25.5, precio_pct: 3, otros_pct: -2.5 },
    { periodo: 'FY2028e', volumen_pct: 20.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 18.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 16.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 14.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2036e', tamano: 3700 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6, ajuste_margen_pp: -5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.5, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 35 },
};
