// Supuestos numéricos del analista (Shanxi Fenjiu, 600809.SS, corte 2026-10-20). Cuentas en millones de CNY (normas chinas CAS).
// Base: 2025 (38.718 M CNY de ventas, margen EBITDA del 43,8 %, EBIT del 42,2 %) [A1]. 1S26 publicado: ventas −12,2 %, beneficio −24,3 % [A6].
// 2026e fijo: 1S26 real (21.044 M) + 2S26 un 16 % por debajo del 2S25 (14.754 M → 12.393 M), como el 2T26 (−17,7 %) [A6, A14].
const crec = [-13.6, 3.0, 6.0, 6.0, 5.0, 4.0, 3.5, 3.0, 2.5, 2.0];
const margen = [37.5, 38.5, 40.0, 41.0, 41.5, 41.5, 41.5, 41.5, 41.5, 41.5];
const amort = [1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.3, 2.3, 2.3, 2.3];
const capex = [3.5, 3.5, 3.3, 3.0, 2.8, 2.6, 2.5, 2.4, 2.4, 2.4];
const nwc = [14.5, 14.5, 14.5, 14.5, 14.5, 14.5, 14.5, 14.5, 14.5, 14.5];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 26,
  fijo: i === 0,
}));

const S = {
  anios,
  // Tasa libre: bono chino a 10 años del 19-oct-2026 (1,6497 %, ChinaBond [D6]). Beta 0,9: la mensual de 5 años es 1,0 y la semanal
  // de 2 años 0,39 [D1]; prima adicional de 2,0 por China, el control estatal y la caída estructural del consumo de baijiu. Sin deuda.
  wacc: { tasa_libre_pct: 1.65, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 26, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -8.0, precio_pct: -5.6, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  // Ventas del sector de baijiu (empresas por encima del umbral, NBS): 796.384 M en 2024 [B1]. Estimación propia para 2030e:
  // −5 % en 2025 (producción −12,1 % [B5], con precio y mezcla mejores), −8 % en 2026 y plano después: 796.384 × 0,95 × 0,92 ≈ 696.000 → 700.000 M.
  mercado_final: { periodo: '2030e', tamano: 700000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 55, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente = rendimiento de la tesorería (310 M en 2025 sobre ≈ 29.000-35.000 M [A1]; tras el dividendo
  // de 8.003 M de julio quedan ≈ 27.400 M a tipos chinos del 1-1,2 %); impuesto del 26 % (26,2 % en 2025 [A1]); minoritarios de ≈ 50 M (48,9 M en 2025);
  // 1.219,96 M de acciones, sin recompras ni ampliaciones previstas [A1].
  bpa: { fin_recurrente: { '2026e': 290, '2027e': 270, '2028e': 280 }, minoritarios: 50, acciones: { '2026e': 1219.96, '2027e': 1219.96, '2028e': 1219.96 } },
};
export default S;

const VENTAS_2025 = 38718.26;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S26 está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
