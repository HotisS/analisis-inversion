// Supuestos numéricos (ASSA ABLOY, corte 2026-10-14). Base: 2025 (152.409 M SEK; EBITDA publicado 29.232 M, ajustado 30.745 M).
// Comprador en serie: el crecimiento comprado entra en el DCF con su coste. Capex = capex propio (1,8 % de ventas, 2023-2025)
// + compras ≈ 2,5 veces las ventas compradas (2025: 11.409 M pagados por 6.576 M de ventas aportadas en el año, ≈1,7x en año parcial;
// HHI se pagó a 14x EBITDA). La amortización (4,0 % de ventas, con la de intangibles comprados) converge al capex al final.
const organico = [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0];
const compras  = [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.5, 2.0, 1.5, 1.0];
const divisa   = [-5.0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const crec = organico.map((o, i) => Math.round((o + compras[i] + divisa[i]) * 10) / 10);
const margen = [20.7, 20.8, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9, 20.9];
const amort = [4.0, 4.0, 4.0, 3.9, 3.8, 3.6, 3.4, 3.2, 3.0, 3.0];
const capex = compras.map((m, i) => Math.max(3.0, Math.round((1.8 + 2.5 * m) * 10) / 10));
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 20.6,
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.0, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.3, tasa_impositiva_pct: 25, peso_deuda_pct: 15 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [0, 1, 2, 3, 4].map((i) => ({ periodo: `${2026 + i}e`, volumen_pct: Math.round((organico[i] - 1.5) * 10) / 10, precio_pct: 1.5, otros_pct: Math.round((compras[i] + divisa[i]) * 10) / 10 })),
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
