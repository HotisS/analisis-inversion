// Supuestos numéricos del analista (ASML, corte 2026-11-27). Base: 2025 real (32.667 M EUR, XBRL del 20-F).
// 2026e fijo: guía de 44.000-45.000 M del 14-oct (punto medio, +36,2 %); margen EBITDA de 9 meses reales + 4T con la guía.
const crec = [36.2, 26.0, 20.0, 2.0, 6.0, 7.0, 6.0, 5.0, 4.5, 4.0];
const margen = [44.0, 47.0, 48.5, 47.0, 47.0, 47.0, 47.0, 47.0, 47.0, 47.0];
const amort = [2.3, 2.3, 2.4, 2.6, 2.8, 3.0, 3.0, 3.0, 3.0, 3.0];
const capex = [4.5, 5.0, 5.0, 4.0, 3.8, 3.5, 3.5, 3.5, 3.5, 3.5];
const nwc = [-12, -12, -11, -10, -9, -8, -8, -7, -7, -7];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 17,
  fijo: i === 0,
}));

export default {
  anios,
  wacc: { tasa_libre_pct: 3.32, beta: 1.35, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 2.6, tasa_impositiva_pct: 17, peso_deuda_pct: 0.6 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 20 },
  etapa2: { usar: true, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 30.0, precio_pct: 3.0, otros_pct: 3.2 },
    { periodo: '2027e', volumen_pct: 20.0, precio_pct: 4.0, otros_pct: 2.0 },
    { periodo: '2028e', volumen_pct: 14.0, precio_pct: 5.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: -2.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 1.0 },
  ],
  // WFE (SEMI): 229.000 M USD en 2028 ≈ 208.000 M EUR; +4 % anual hasta 2035 ≈ 274.000 M EUR (mismo perímetro que la cuota de B).
  mercado_final: { periodo: '2035e', tamano: 274000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
      perfil: [{ periodo: '2028e', crecimiento_pp: -18, margen_pp: -4 }, { periodo: '2029e', crecimiento_pp: -8, margen_pp: -4 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
};
