// Supuestos numéricos del analista (Transsion, línea H, corte 2026-11-13). Cuentas en millones de CNY (NIIF; 9M26 en normas chinas).
// Base: 2025 (65.591 M CNY de ventas, margen EBITDA limpio del 4,3 %; EBIT sin ganancias de productos de tesorería).
// 2026e fijo: 9M26 publicados (50.280 M, +1,5 %) + 4T26e ≈ 13.000 M (−19 %, tras el −27,4 % del 3T26) = ≈ 63.300 M (−3,5 %).
const crec = [-3.5, -4.0, 7.0, 5.0, 5.0, 4.0, 4.0, 3.0, 3.0, 2.5];
const margen = [5.3, 5.5, 6.5, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8, 6.8];
const nwc = [6, 0, -3, -4, -4, -4, -4, -4, -4, -4];
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
  wacc: { tasa_libre_pct: 1.603, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 3.0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 18, peso_deuda_pct: 5 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 7 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -18.0, precio_pct: 16.0, otros_pct: -1.5 },
    { periodo: '2027e', volumen_pct: -6.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  // Teléfonos en mercados emergentes (Frost & Sullivan [B1]): 266.700 M USD en 2030e × 6,6698 CNY/USD (13-nov) = 1.778.836 M CNY,
  // dividido por la parte de las ventas que son teléfonos (89,1 % en 2025: 58.448 / 65.591 [A1]) para que la cuota implícita compare lo mismo que la de hoy (4,7 %).
  mercado_final: { periodo: '2030e', tamano: 1996449 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de 450 M (intereses de ≈ 12.500 M de tesorería neta de deuda tras la salida a bolsa,
  // a tipos chinos del 1,5-2 %, más ganancias recurrentes de productos de tesorería; 2025: 851 M; 9M26: 858 M con +584 M de valor razonable no recurrente).
  // 2026e: resultado financiero de 970 M (858 M de 9M26 publicados + ≈ 110 M del 4T) y minoritarios de 110 M (85 M en 9M26).
  // Acciones: 1.170,0 M medias en 2026e (1.151,2 A + 86,6 H desde el 15-oct + 6,5 H desde el 16-nov); 1.244,3 M desde 2027.
  bpa: { fin_recurrente: 450, minoritarios: 80, fin_2026: 970, minoritarios_2026: 110, acciones: { '2026e': 1170.0, '2027e': 1244.3, '2028e': 1244.3 } },
};
export default S;

const VENTAS_2025 = 65591.2;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: 9M26 publicados; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const fin = a.fijo ? S.bpa.fin_2026 : S.bpa.fin_recurrente;
    const min = a.fijo ? S.bpa.minoritarios_2026 : S.bpa.minoritarios;
    const bai = ebit + fin;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - min;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
