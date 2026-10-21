// Supuestos numéricos (TSMC, corte 2026-10-21, tras el 3T26). Base: 2025 real del 20-F (3.809.054 M TWD) [A].
// 2026e fijo con la guía: 1T-3T publicados (3.898.727 M) + 4T al punto medio (53.300 M USD × 31,8) ≈ 5.594.000 M (+46,9 %) [A, D].
const crec = [46.9, 32, 22, 14, 10, 8, 7, 5.5, 4.5, 3.5];
// Margen EBITDA: 72,3 % en los últimos 12 meses [A]; baja por la dilución de las fábricas del extranjero (2 puntos en 2026, 3-4 después) y el arranque del 2 nm [A, B].
const margen = [72.0, 70.5, 70.0, 69.5, 69.0, 68.5, 68.0, 68.0, 67.5, 67.5];
// Amortización: ≈13 % de las ventas en 2026 (≈182.000 M por trimestre en el 1S26 [A]); sube con el capex récord hacia la media histórica (18-25 %).
const amort = [13.0, 14.0, 15.0, 16.5, 18.0, 19.0, 19.5, 20.0, 20.0, 20.0];
// Capex: 60.000-64.000 M USD en 2026 (≈35 % de las ventas) y «significativamente superior» en 2027-2028 [A, C]; converge al 22-25 % de sus años normales.
const capex = [35, 38, 37, 34, 32, 30, 28, 26, 24, 22.5];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 12.5,
  tasa_impositiva_pct: 17,
  fijo: i === 0,
}));

export const wacc = { tasa_libre_pct: 2.01, beta: 1.14, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 1.85, tasa_impositiva_pct: 17, peso_deuda_pct: 1.7 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: null };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 32, precio_pct: 12, otros_pct: 2.9 },
  { periodo: '2027e', volumen_pct: 22, precio_pct: 10, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 15, precio_pct: 7, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 10, precio_pct: 4, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 7, precio_pct: 3, otros_pct: 0 },
];
// Mercado de fabricación por encargo «Foundry 2.0» (Counterpoint): 320.000 M USD en 2025 [B] ≈ 9,95 billones TWD; al 12 % anual hasta 2035 (estimación propia).
export const mercado_final = { periodo: '2035e', tamano: 30900000 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8, ajuste_margen_pp: -4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -14, margen_pp: -4 }, { periodo: '2028e', crecimiento_pp: -14, margen_pp: -5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 };

// BPA por caso (para el objetivo a 12 meses): ventas × (margen EBITDA − amortización) + ingresos financieros netos, impuesto del 17 %,
// 25.930 M de acciones (sin recompras), minoritarios despreciables (0,15 % del beneficio en 2025 [A]).
const VENTAS_2025 = 3809054, ACCIONES = 25930;
const FIN = [125000, 140000, 150000];
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((f, i) => {
    const per = caso?.perfil?.find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v = v * (1 + (f.crecimiento_pct + dg) / 100);
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + FIN[i]) * (1 - 0.17) * 0.9985;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACCIONES, 2) };
  });
}

export default { anios, wacc, terminal, etapa2, puente_ingresos, mercado_final, casos, pesos };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
