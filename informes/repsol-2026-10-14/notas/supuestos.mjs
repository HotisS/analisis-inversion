// Supuestos numéricos (Repsol, corte 2026-10-14). Base: 2025 en base CCS de MarketScreener (ventas 57.218 M, EBITDA 7.678 M, 13,4 %).
// 2026e casi cerrado (dos trimestres publicados y el Brent por encima de 90 USD de media): +20 % de ventas y 15,5 % de margen.
// Después el ciclo vuelve: el Brent hacia 70-75 USD y el refino hacia la media; margen de 13,0-13,6 %, el de 2024-25.
const crec = [20, -8, -4, 2, 2, 2, 2, 2, 1.5, 1.5];
const margen = [15.5, 14.0, 13.6, 13.4, 13.4, 13.2, 13.0, 13.0, 13.0, 13.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 5.3,
  capex_pct_ventas: i < 3 ? 7.0 : 6.0,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 36,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.53, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 3.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  mitad_de_anio: true,
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 2.0, precio_pct: 18.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 2.0, precio_pct: -10.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: -6.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
