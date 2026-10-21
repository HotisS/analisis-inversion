// Supuestos numéricos (Moody's, corte 2026-10-21, tras el 3T26). Base: 2025 real del 10-K (7.718 M USD) [A].
// 2026e: guía de crecimiento de «un dígito alto» con un 3T de +1 % (MIS −1 %) [A]: +7,5 %.
const crec = [7.5, 7.0, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 4.0];
// Margen EBITDA GAAP (EBIT + amortizaciones): 49,6 % en 2025 y 50,6 % en los últimos 12 meses [A]; sube con el apalancamiento operativo de MA.
const margen = [50.0, 51.0, 51.5, 52.0, 52.5, 52.5, 53.0, 53.0, 53.0, 53.0];
const amort = [6.0, 5.9, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0];
const capex = [4.3, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: 25, tasa_impositiva_pct: 24, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.12, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 24, peso_deuda_pct: 7.7 };
export const terminal = { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 18 };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 3.5, precio_pct: 4.0, otros_pct: 0 },
  { periodo: '2027e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.5, precio_pct: 3.5, otros_pct: 0 },
];
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    // A 12 meses, un año de emisión como 2022 (BPA −30 %): 2027e −1 % de ventas y 4 puntos menos de margen; 2028e +3 % y −3 puntos.
    perfil: [{ periodo: '2027e', crecimiento_pp: -8, margen_pp: -4 }, { periodo: '2028e', crecimiento_pp: -4, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 40, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 25 };

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados ni reestructuración):
// (EBITDA − depreciación 3,6 % de las ventas − gasto financiero neto) × (1 − 23,5 %) + 140 M (reestructuración y otros que la empresa excluye),
// calibrado con 2025 (EBITDA 3.831, depreciación ≈ 280 M, financiero 221 M → 2.688 M = 14,94 USD × 179,9 M de acciones) [A, D].
// Acciones diluidas: 174,5 M de media en 2026 (173,3 en el 3T [D]), −2,6 % al año por recompras (hasta 3.000 M en 2026).
const V25 = 7718, ACC = [174.5, 170.0, 165.6], FIN = [230, 240, 250];
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f, i) => {
    const per = caso?.perfil?.find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const neto = (v * (f.margen_ebitda_pct + dm - 3.6) / 100 - FIN[i]) * 0.765 + 140;
    return { periodo: f.periodo, ventas: red(v, 0), neto: red(neto, 0), bpa: red(neto / ACC[i], 2) };
  });
}
export default { anios, wacc, terminal, puente_ingresos, casos, pesos };
if (process.argv[1]?.endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
