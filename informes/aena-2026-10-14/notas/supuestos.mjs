// Supuestos numéricos del analista (Aena, corte 2026-10-14). Base: 2025 (6.379,2 M EUR de ingresos totales).
// 2026e casi cerrado (1S26 publicado; tarifa 2026 ya fijada): fijo. 2027-2031 = DORA III (+0,33 % de tarifa al año,
// 9.991 M de inversión regulada y 12.888 M en total). 2032-2035: DORA IV, con la nueva base de activos retribuida.
const crec = [8.0, 4.0, 4.5, 4.5, 4.5, 4.0, 4.5, 4.0, 3.0, 2.5];
const margen = [57.5, 56.5, 56.5, 56.5, 56.5, 56.5, 57.0, 57.0, 57.0, 57.0];
const amort = [12.5, 12.5, 13.0, 13.5, 14.5, 15.5, 16.0, 16.0, 16.0, 16.0];
const capex = [24, 33, 35, 35, 33, 30, 22, 20, 18, 17];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -3,
  tasa_impositiva_pct: 24,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 24, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: 0.3, otros_pct: 1.7 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 0.3, otros_pct: 2.2 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 0.3, otros_pct: 2.2 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 0.3, otros_pct: 2.2 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
