// Supuestos numéricos del analista (KION GROUP AG, KGX, corte 2026-10-19). Millones de EUR, NIIF-UE.
// Definición de EBITDA de este informe (no la de KION): EBIT publicado + amortizaciones y deterioros del inmovilizado SIN la flota de
// alquiler y de arrendamiento operativo (588,5 M en 2025 [A1]). La depreciación de la flota (611,2 M en 2025) se queda como coste
// operativo (equivale a su reposición) y los pasivos que la financian van como deuda en el puente (`arrendamientos`).
// Base: 2025, 11.297,2 M de ventas; EBITDA así definido 1.089,4 M + 166,9 M de no recurrentes = 1.256,3 M (11,1 %) [A1].
const crec = [2.7, 2.5, 4.0, 4.0, 3.5, 3.0, 2.8, 2.5, 2.3, 2.0];
const margen = [11.6, 12.0, 12.4, 12.8, 13.0, 13.1, 13.1, 13.1, 13.1, 13.1];
const amort = [5.2, 5.0, 4.9, 4.8, 4.7, 4.6, 4.6, 4.5, 4.5, 4.5];
// Capex = inmovilizado material e intangible (395,7 M en 2025, 3,5 %) + altas de derechos de uso de arrendamientos de compra
// (≈ 1,7 % de las ventas; pagos de principal de 187,6 M en 2025) [A1].
const capex = [5.2, 5.1, 5.0, 4.9, 4.8, 4.8, 4.7, 4.7, 4.6, 4.6];
const tasa = [33, 31, 30, 30, 30, 30, 30, 30, 30, 30];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 13.5,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  // Bund 10 años 3,45 % (Bundesbank, 16-oct-2026) [D3]; beta ajustada semanal de 5 años frente al DAX 1,59 (mensual 2,07) [D1];
  // prima adicional 0,5 por el accionista de control chino y la exposición a China; Kd 4,25 % (bonos 2029 al 4,0 % y 2031 al 4,125 %,
  // pagarés al 2,2-5,1 % [A1, A6]); deuda 40 % del capital a mercado (deuda y pasivos de arrendamiento ≈ 4.460 M frente a 4.470 M de
  // capitalización, rebajado porque los pasivos de la flota están casados con contratos de clientes).
  wacc: { tasa_libre_pct: 3.45, beta: 1.6, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.25, tasa_impositiva_pct: 30, peso_deuda_pct: 40 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 7.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.2, precio_pct: 1.5, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: 0.5, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 0.5 },
  ],
  // La cuota publicada es por segmento (n.º 2 mundial en carretillas por ingresos, n.º 1 en automatización de almacenes), no del grupo:
  // mercado_final en null y prueba de cuota a mano (lección de sostenibilidad).
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -6.0, margen_pp: -2.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero recurrente (intereses de la deuda financiera, de los arrendamientos de compra y de las pensiones,
  // más el diferencial neto del negocio de arrendamiento; −147,4 M en 2025 y −69,3 M en el 1S26 [A1, A6]); minoritarios 12 M
  // (10,4 en 2025, 5,5 en el 1S26); 131,1 M de acciones sin recompras.
  bpa: { fin_recurrente: { '2026e': -140, '2027e': -135, '2028e': -130 }, minoritarios: 12, acciones: 131.1 },
};
export default S;

const VENTAS_2025 = 11297.2;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    const p = (c.perfil || []).find((x) => x.periodo === a.periodo);
    const dg = k * (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp);
    const dm = k * (p ? p.margen_pp : c.ajuste_margen_pp);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebitda = v * (a.margen_ebitda_pct + dm) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
