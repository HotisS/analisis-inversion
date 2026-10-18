// Supuestos numéricos del analista (Transsion, línea H, corte 2026-10-18). Cuentas en millones de CNY (NIIF).
// Base: 2025 (65.591 M CNY de ventas, margen EBITDA limpio del 4,3 %; EBIT sin ganancias de productos de tesorería).
const crec = [10.4, 5.0, 6.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 2.5];
const margen = [5.2, 5.9, 6.5, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8];
const nwc = [-1, -3, -4, -4, -4, -4, -4, -4, -4, -4];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 0.75,
  capex_pct_ventas: 1.3,
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 18,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 1.648, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 3.0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 18, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.2, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -6.0, precio_pct: 15.0, otros_pct: 1.4 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  // Teléfonos en mercados emergentes (Frost & Sullivan [B1]): 266.700 M USD en 2030e × 6,677 CNY/USD = 1.780.756 M CNY,
  // dividido por la parte de las ventas que son teléfonos (89,1 % en 2025: 58.448 / 65.591 [A1]) para que la cuota implícita compare lo mismo que la de hoy (4,7 %).
  mercado_final: { periodo: '2030e', tamano: 1998604 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.7, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente (intereses de ≈ 18.000 M de tesorería a tipos chinos del 1,5-2 % y ganancias de productos de tesorería; 2025: 851 M con diferencias de cambio fuera),
  // minoritarios y acciones (1.146,9 M medias en 2025 + 86,6 M H desde el 15-oct-2026; 1.237,8 M desde 2027).
  bpa: { fin_recurrente: 520, minoritarios: 40, acciones: { '2026e': 1170, '2027e': 1237.8, '2028e': 1237.8 } },
};
export default S;

const VENTAS_2025 = 65591.2;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S26 está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
