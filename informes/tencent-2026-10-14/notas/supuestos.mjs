// Supuestos numéricos (Tencent, corte 2026-10-14). Millones de RMB; base 2025 (751.766 M de ingresos; EBITDA 279.616 M =
// resultado operativo sin otras ganancias 245.628 M + amortizaciones 33.988 M, 37,2 %). EBITDA después de pagos en acciones.
// La IA dispara la inversión en 2026-27 (2T26: 52.800 M en un trimestre) y la amortización la sigue con 1-2 años de retraso.
const crec = [11, 11, 10, 9, 8, 7, 6, 5, 4, 3];
const margen = [37.0, 38.0, 39.0, 39.5, 40.0, 40.0, 40.0, 40.0, 40.0, 40.0];
const amort = [6.5, 8.5, 10.0, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5, 10.5];
const capex = [22, 18, 15, 13, 12, 11.5, 11, 11, 10.5, 10.5];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 18,
  fijo: i === 0,
}));

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 1, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio en base no NIIF (la de la historia del PER): EBIT del DCF + pagos en acciones y amortización de intangibles
// comprados (4,5 % de las ventas; 4,7 % en 2025) + participadas y financiero neto (≈36.000 M en 2025, cuadrado con el
// beneficio no NIIF de 259.600 M; +4 % al año menos el coste de la deuda nueva) − impuesto del 18 % ÷ 9.250 M de acciones.
export const ACCIONES = 9250;
export function bpa(anio, desp = { g: 0, m: 0 }) {
  let v = 751766;
  let r = null;
  anios.forEach((a, i) => {
    const fijo = a.fijo;
    v = v * (1 + (a.crecimiento_pct + (fijo ? 0 : desp.g)) / 100);
    const m = a.margen_ebitda_pct + (fijo ? 0 : desp.m);
    const ebit = v * (m - a.amortizacion_pct_ventas) / 100;
    const otros = 36000 * Math.pow(1.04, i + 1) - 1500 * (i + 1);
    const bn = (ebit + 0.045 * v + otros) * (1 - 0.18);
    if (a.periodo === anio) r = { ventas: v, margen: m, ebitda: v * m / 100, amort: v * a.amortizacion_pct_ventas / 100, ebit, nonifrs: 0.045 * v, otros, bn, bpa: bn / ACCIONES };
  });
  return r;
}

export default {
  anios,
  wacc: { tasa_libre_pct: 1.67, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.9, coste_deuda_pct: 3.0, tasa_impositiva_pct: 18, peso_deuda_pct: 10 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.1, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 5, precio_pct: 3, otros_pct: 3 },
    { periodo: '2027e', volumen_pct: 5, precio_pct: 3, otros_pct: 3 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 3, otros_pct: 2.5 },
    { periodo: '2029e', volumen_pct: 4, precio_pct: 2.5, otros_pct: 2.5 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 2 },
  ],
  mercado_final: null,
  casos,
  pesos: { dcf: 45, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
