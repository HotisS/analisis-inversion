// Supuestos numéricos (Ryanair, corte 2026-10-14). Base: FY2026 real (15.544,3 M EUR; EBITDA 3.747,6 M con 85 M de excepcional).
// FY27e: tráfico de 214 M (+2,7 %) y tarifa algo más baja; combustible cubierto al 80 % a 67 USD. FY28e: combustible poco cubierto
// (15 % a 85 USD) y primeros MAX 10. Después, crecimiento de flota hacia 300 M de pasajeros en FY34 (≈+4,5 % anual de tráfico).
const crec = [2.5, 5.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5];
const margen = [21.5, 21.5, 22.5, 23.0, 23.0, 23.0, 23.0, 22.5, 22.5, 22.5];
const capex = [13.0, 14.0, 14.0, 13.5, 13.0, 12.0, 11.0, 10.5, 10.0, 10.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 9.0,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 12.5,
  fijo: false,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 12.5, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 2.7, precio_pct: -0.2, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 4.5, precio_pct: 1.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 4.0, precio_pct: 1.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
