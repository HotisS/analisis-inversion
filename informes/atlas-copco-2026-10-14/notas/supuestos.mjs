// Supuestos numéricos (Atlas Copco, corte 2026-10-14). Base: 2025 (168.343 M SEK; EBITDA 43.643 M, 25,9 %).
// Crecimiento = orgánico + compras + divisa. Pedidos del 2T26 +26 % orgánico (vacío para semiconductores): 2027 fuerte.
// Capex = capex propio (material + intangibles, 3,7 % de ventas en 2025) + compras a ≈2,5 veces las ventas compradas
// (2021-2025: 4,6 % de las ventas al año en compras para ≈2 puntos de crecimiento).
const organico = [5.0, 6.5, 4.5, 3.5, 4.0, 3.5, 3.0, 2.5, 2.0, 1.0];
const compras  = [2.0, 2.0, 2.0, 2.0, 2.0, 1.5, 1.5, 1.0, 1.0, 1.0];
const divisa   = [-1.0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const crec = organico.map((o, i) => Math.round((o + compras[i] + divisa[i]) * 10) / 10);
const margen = [26.0, 26.5, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0];
const amort = [5.7, 5.7, 5.7, 5.6, 5.5, 5.4, 5.3, 5.2, 5.1, 5.0];
const capex = compras.map((m) => Math.round((3.7 + 2.5 * m) * 10) / 10);
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: Math.max(capex[i] + 1.6, amort[i]),
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 22,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.0, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 22, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [0, 1, 2, 3, 4].map((i) => ({ periodo: `${2026 + i}e`, volumen_pct: Math.round((organico[i] - 2.0) * 10) / 10, precio_pct: 2.0, otros_pct: Math.round((compras[i] + divisa[i]) * 10) / 10 })),
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
