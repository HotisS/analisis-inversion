// Supuestos del DCF, escenarios y BPA propio (Bureau Veritas, corte 2026-10-26, tras los ingresos del 3T26).
// Base del motor: 2025 real publicado (6.466,4 M EUR, con las actividades que salen). 2026e ya en el perímetro NIIF 5
// (sin Petróleo y Petroquímica, Carbón ni Servicios a Gobiernos): ≈ 6.180 M EUR, de ahí el −4,4 %.
// EBITDA = beneficio operativo publicado + amortizaciones totales (NIIF 16: incluye derechos de uso e intangibles de compras).
// Beneficio operativo ajustado (AOP) = EBITDA − amortizaciones + amortización de intangibles de compras (0,9 % de las ventas en 2025)
// + reestructuración y otros que el AOP excluye (0,55 %). Cuadre 2025: 1.257,2 (EBITDA recurrente) − 299,5 + 57,8 + 37,4 = 1.052,9 = AOP publicado.
const VENTAS_2025 = 6466.4;
const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;

export const crec = [-4.4, 7.9, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
export const margen = [19.8, 20.0, 20.2, 20.4, 20.5, 20.6, 20.6, 20.6];
// Reestructuración y otros gastos que el AOP excluye pero el EBITDA NIIF recurrente incluye: 37,4 M en 2025 (0,58 % de las ventas) [A2].
export const RESTR = 0.55;
export const amort = [4.6, 4.5, 4.5, 4.4, 4.4, 4.3, 4.3, 4.3];
export const amortCompras = [0.85, 0.8, 0.8, 0.75, 0.7, 0.7, 0.7, 0.7];
// Capex 2,6 % (guía 2,5-3,0 %) + altas de derechos de uso ≈ 2,2 % (pagos de arrendamientos de 157,8 M en 2025 = 2,4 %).
export const capex = [4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i],
  // Circulante a su nivel real: necesidad de circulante de 236,8 M a dic-25 (3,7 % de los ingresos) [A2].
  nwc_pct_ventas: 3.7, tasa_impositiva_pct: i < 2 ? 29.5 : 28.5, fijo: i === 0,
}));

// WACC: Bund 3,39 % (23-oct) [P1]; beta ajustada de 0,98 (mensual, cinco años, frente al CAC 40) desapalancada con la deuda
// propia (deuda neta con arrendamientos ≈ 2.100 M / capitalización 12.996 M = 16 %) → 0,88, y reapalancada al 15 % de deuda
// objetivo (D/E 17,6 %, impuesto 29 %) → 0,99. Prima de mercado 5,5 % (Damodaran implícita 4,2 % como referencia [P2]).
export const wacc = { tasa_libre_pct: 3.39, beta: 0.99, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.9, tasa_impositiva_pct: 29, peso_deuda_pct: 15 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13 };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.6, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 60, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 15 };

// BPA AJUSTADO propio (la misma base que el BPA ajustado publicado y que la historia del PER):
// (AOP − resultado financiero 115 M) × (1 − 29,5 %) × (1 − 3,5 % minoritarios) ÷ acciones.
// Cuadre 2025: (1.052,9 − 116) × 0,70 × 0,965 ≈ 633 M → 1,42 EUR con 445,6 M de acciones (publicado: 1,42) [A2].
// Acciones: 444,9 M diluidas hoy; 442 M en 2027e y 440,4 M en 2028e con el resto de la recompra de 200 M (quedan 132 M).
export const ACCIONES = { '2026e': 446.0, '2027e': 442.0, '2028e': 440.4 };
export const FIN = 115, IMP = 0.295, MIN = 0.035;
export function bpa(caso) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((a, i) => {
    const dg = i === 0 ? 0 : (caso?.ajuste_crecimiento_pp ?? 0);
    const dm = i === 0 ? 0 : (caso?.ajuste_margen_pp ?? 0);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const m = a.margen_ebitda_pct + dm;
    const aop = v * (m - amort[i] + amortCompras[i] + RESTR) / 100;
    const neto = (aop - FIN) * (1 - IMP) * (1 - MIN);
    return { periodo: a.periodo, ventas: red(v, 0), margen_aop_pct: red(aop / v * 100, 1), aop: red(aop, 0), neto: red(neto, 0), bpa: red(neto / ACCIONES[a.periodo], 2) };
  });
}

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
}
