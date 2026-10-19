// Supuestos del DCF, escenarios y BPA ajustado propio (EssilorLuxottica, corte 2026-10-19). Base: 2025 real (28.491 M EUR, NIIF) [A1, A3].
// EBITDA publicado (NIIF 16). La amortización incluye la de los intangibles de las compras (PPA: 830 M en 2025, 415 M en el 1S26 [A2]),
// que no es caja; la «ordinaria» fue el 7,8 % de las ventas en el 1S26. El capex suma el del estado de flujos (5,4 %) y las altas de
// derechos de uso (3,7 % en 2025), porque los arrendamientos van en la deuda del puente.
const red = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
export const VENTAS_2025 = 28491;
const crec = [5.5, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0];
const margen = [24.1, 24.3, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4, 24.4];
const amort = [10.5, 10.2, 10.0, 9.8, 9.6, 9.4, 9.2, 9.0, 8.8, 8.6];
const capex = [9.0, 9.0, 9.0, 9.0, 8.9, 8.9, 8.9, 8.8, 8.8, 8.8];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 15.0,
  tasa_impositiva_pct: 24.5,
  fijo: i === 0,
}));

// WACC: Bund 10 años 3,49 % (19-oct) [D6]; beta 0,97 (ajustada mensual 5 a; bruta 0,95; semanal 2 a 1,07) [D1]; deuda neta con arrendamientos 13.385 M
// sobre 69.700 M de capitalización + deuda: 16 %.
export const wacc = { tasa_libre_pct: 3.49, beta: 0.97, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 24.5, peso_deuda_pct: 16 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 };

export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 6.5, precio_pct: 3.0, otros_pct: -4.0 },
  { periodo: '2027e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0.5 },
  { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
];

// BPA ajustado propio (sin la amortización de compras, como lo publica la empresa):
// EBIT ajustado = EBITDA − amortización ordinaria (7,7 % de las ventas; 7,8 % en el 1S26 [A2]);
// − coste financiero (111 M en el 1S26 → 230 M en 2026-27, 225 M en 2028) − impuesto ajustado 24,5 % (24,0 % en el 1S26, «algo más» en el año [A2])
// − minoritarios ajustados (86 M en el 1S26 por Top Charoen: 165, 175 y 185 M) ÷ 461 M de acciones diluidas (458,4 M en circulación a 30-sep [A11]
// más planes de acciones, menos recompras).
// Cuadre 2025: (6.492 EBITDA + 249 no recurrentes − 2.283 amortización ordinaria − 184) × (1 − 22,8 %) − 143 ≈ 3.157 M → 6,79 EUR (publicado 3.157 M y 6,79) [A1].
export const ACCIONES = 461;
const AMORT_ORD = 7.7;
const FIN = [230, 230, 225];
const MINOR = [165, 175, 185];
export function bpa(caso = {}) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((a, i) => {
    const dg = i === 0 ? 0 : (caso.ajuste_crecimiento_pp ?? 0);
    const dm = i === 0 ? 0 : (caso.ajuste_margen_pp ?? 0);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebitAj = v * (a.margen_ebitda_pct + dm - AMORT_ORD) / 100;
    const neto = (ebitAj - FIN[i]) * (1 - 0.245) - MINOR[i];
    return { periodo: a.periodo, ventas: red(v, 0), ebit_ajustado: red(ebitAj, 0), margen_ebit_aj: red(ebitAj / v * 100, 1), neto_ajustado: red(neto, 0), bpa: red(neto / ACCIONES, 2) };
  });
}

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
}
