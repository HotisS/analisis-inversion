// Supuestos del DCF, escenarios y BPA propio (Saint-Gobain, corte 2026-10-20). Base: 2025 real (46.483 M EUR, NIIF) [A1].
// EBITDA publicado (NIIF 16). La amortización es la de explotación con derechos de uso (4,6 % de las ventas en 2025, 4,7 % en los
// últimos 12 meses); la de los intangibles de las compras (290 M en 2025) va por debajo del EBIT [A1]. El capex suma el del estado de
// flujos (4,7 % en 2025; guía de ≈2.000 M en 2026) y las altas de derechos de uso (≈1,5 %), porque los arrendamientos van en la deuda del puente.
const red = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;
export const VENTAS_2025 = 46483;
const crec = [0.5, 2.5, 4.0, 4.0, 3.5, 3.0, 3.0, 2.8, 2.6, 2.5];
const margen = [15.3, 15.5, 15.8, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0, 16.0];
const amort = [4.7, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
const capex = [5.8, 5.7, 5.6, 5.5, 5.4, 5.3, 5.3, 5.2, 5.2, 5.2];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 10.4,
  tasa_impositiva_pct: 25.5,
  fijo: i === 0,
}));

// WACC: Bund 10 años 3,49 % (Bundesbank, 19-oct) [D5]; beta 1,30 (mensual 5 a 1,63; ajustada 1,42; semanal 2 a 1,74 frente al STOXX 600 [D1];
// la del sector de materiales de construcción reapalancada ≈1,2); prima de mercado 5,5 %; prima adicional 0,6 % = primas de riesgo país de
// Damodaran ponderadas por ventas (Francia 0,78 % × 23 %, Latinoamérica, India, Oriente Medio) [D13]. Coste de la deuda 3,9 % antes de impuestos
// (bonos BBB+ a tipo de mercado con la OAT al 4,85 %; 3,2 % de coste medio contable en 2025 [A1]); peso de la deuda 26 % (11.519 M de deuda neta
// con arrendamientos sobre 44.000 M de capitalización más deuda).
export const wacc = { tasa_libre_pct: 3.49, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 0.6, coste_deuda_pct: 3.9, tasa_impositiva_pct: 25.5, peso_deuda_pct: 26 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8 };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 };

export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 0.5, precio_pct: 0.5, otros_pct: -0.5 },
  { periodo: '2027e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0 },
];

// BPA publicado (NIIF) propio, la base del consenso de MarketScreener [D3]:
// EBIT = EBITDA − amortización de explotación; − amortización de intangibles de compras (300 M; 290 M en 2025 [A1])
// − otros no recurrentes (deterioros, minusvalías por ventas de negocios, reestructuración: 300 M en 2026, con las ventas en curso
// de 1.882 M de activos [A2]; 150 M después) − resultado financiero (550, 570, 570 M; 605 M en 2025 y 266 M en el 1S26 [A2])
// + asociadas (70 M); impuesto del 25,5 % sobre el resultado sin asociadas (24,7 % en 2025 [A1]); minoritarios 100, 105 y 110 M (92 M en 2025);
// acciones diluidas 489, 485 y 481 M (489 M en circulación en junio; recompras netas de 2.000 M en 2026-2030 [A2]).
// Cuadre 2025: 5.062 EBIT − 290 − 287 − 605 + 70 = 3.950 BAI; − 975 impuestos − 92 minoritarios = 2.883 M → 5,78 EUR (publicado) [A1].
export const ACCIONES = [489, 485, 481];
const PPA = 300;
const NR = [300, 150, 150];
const FIN = [550, 570, 570];
const ASOC = 70;
const MINOR = [100, 105, 110];
export function bpa(caso = {}) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((a, i) => {
    const dg = i === 0 ? 0 : (caso.ajuste_crecimiento_pp ?? 0);
    const dm = i === 0 ? 0 : (caso.ajuste_margen_pp ?? 0);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebit = v * (a.margen_ebitda_pct + dm - a.amortizacion_pct_ventas) / 100;
    const bai = ebit - PPA - NR[i] - FIN[i] + ASOC;
    const neto = bai - (bai - ASOC) * 0.255 - MINOR[i];
    return { periodo: a.periodo, ventas: red(v, 0), ebit: red(ebit, 0), margen_ebit: red(ebit / v * 100, 1), neto: red(neto, 0), bpa: red(neto / ACCIONES[i], 2) };
  });
}

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
}
