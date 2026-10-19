// Supuestos numéricos (Tencent, corte 2026-10-19). Millones de RMB. Año base 2025: ingresos 751.766 M; EBITDA de la empresa
// 310.767 M (41,3 %) = resultado operativo sin otras ganancias + amortizaciones de inmovilizado, derechos de uso, intangibles
// (contenidos y licencias de juegos incluidos) y suelo (66.028 M, 8,8 %). Capex = inmovilizado + intangibles + suelo (112.875 M, 15,0 %).
// 1S26: ingresos +10,1 %, EBITDA 42,4 %, amortización 9,0 %, capex 26,7 % de las ventas [A5].
const crec = [9.5, 9.0, 8.5, 7.5, 6.5, 5.5, 4.0, 3.0];
const margen = [40.5, 40.5, 41.5, 42.0, 42.5, 42.5, 42.5, 42.5];
const amort = [9.6, 12.0, 13.5, 13.5, 13.0, 12.5, 12.0, 11.5];
const capex = [24.0, 20.0, 16.0, 13.5, 12.5, 12.0, 11.5, 11.5];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -8,
  tasa_impositiva_pct: 18,
  fijo: i === 0,
}));

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 1, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio en base NO NIIF diluida (la de la historia del PER y del consenso): EBIT del DCF + pagos en acciones y amortización
// de intangibles comprados (4,6 % de las ventas; 4,8 % en 2025: 280.656 − 244.739 M) + participadas, intereses netos y resto
// (37.000 M: 35.961 M en 2025 y 37.826 M en los 12 meses a jun-26, cuadrados con el no NIIF publicado) − 18 % de impuestos,
// ÷ 9.133 M de acciones diluidas (hoy, sin recompras no anunciadas). Cuadre 2025: (244.739 + 35.917 + 35.961) × 0,82 = 259.626 M.
export const ACCIONES = 9133;
export function bpa(anio, desp = { g: 0, m: 0 }) {
  let v = 751766;
  let r = null;
  anios.forEach((a) => {
    const fijo = a.fijo;
    v = v * (1 + (a.crecimiento_pct + (fijo ? 0 : desp.g)) / 100);
    const m = a.margen_ebitda_pct + (fijo ? 0 : desp.m);
    const ebit = v * (m - a.amortizacion_pct_ventas) / 100;
    const nonifrs = 0.046 * v;
    const otros = 37000;
    const bn = (ebit + nonifrs + otros) * (1 - 0.18);
    if (a.periodo === anio) r = { ventas: v, margen: m, ebitda: v * m / 100, amort: v * a.amortizacion_pct_ventas / 100, ebit, nonifrs, otros, bn, bpa: bn / ACCIONES };
  });
  return r;
}

export default {
  anios,
  // Tasa libre: bono chino a 10 años, 1,66 % (19-oct) [D3]; beta ajustada mensual de 5 años frente al Hang Seng 1,20 (bruta 1,30) [D1];
  // prima 5,5 %; adicional 1,5 (VIE, lista 1260H, CFIUS, regulación); deuda 3,7 % antes de impuestos [A1]; peso de la deuda 12 %.
  wacc: { tasa_libre_pct: 1.66, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 3.7, tasa_impositiva_pct: 18, peso_deuda_pct: 12 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.1, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 3.0, otros_pct: 1.5 },
    { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 1.5 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.0 },
  ],
  mercado_final: null,
  casos,
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
