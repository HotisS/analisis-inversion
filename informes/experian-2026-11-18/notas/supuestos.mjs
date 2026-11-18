// Supuestos numéricos (Experian, corte 2026-11-18). Base: FY2026 (abril 2025-marzo 2026), 8.445 M USD de ingresos.
// EBITDA benchmark (sin amortización de intangibles adquiridos): 3.010 M en el FY26 (35,6 %); 1S FY27 35,9 %.
// FY27e = guía del 18-nov-2026: orgánico 6-7 %, +1 % compras, +1 % divisa; margen EBIT +≥50 pb (29,1 %).
const crec = [8.2, 7.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
const margen = [36.2, 36.6, 36.9, 37.2, 37.4, 37.5, 37.5, 37.5, 37.5, 37.5];
const amort = [7.2, 7.1, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0];
const capex = [8.0, 7.5, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 2,
  tasa_impositiva_pct: 25.75,
  fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.10, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.75, peso_deuda_pct: 16 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 1.7 },
    { periodo: 'FY2028e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
