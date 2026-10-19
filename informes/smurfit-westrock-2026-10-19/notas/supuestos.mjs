// Supuestos numéricos del analista (Smurfit Westrock, NYSE SW, corte 2026-10-19). Cuentas en millones de USD, US GAAP.
// Base: 2025, primer año completo del grupo fusionado (31.179 M de ventas; EBITDA del motor 4.269 + 531 de no recurrentes = 4.800, 15,4 %;
// el EBITDA ajustado de la empresa, 4.939, suma además la retribución en acciones) [A1].
// El margen del motor es el EBITDA ajustado de la empresa MENOS la retribución en acciones (≈ 0,45 % de las ventas).
const crec = [2.5, 5.5, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5];
const margen = [15.0, 16.2, 16.9, 17.2, 17.4, 17.4, 17.4, 17.4, 17.4, 17.4];
const amort = [8.1, 7.9, 7.8, 7.7, 7.6, 7.5, 7.4, 7.4, 7.3, 7.3];
const capex = [7.7, 7.5, 7.4, 7.4, 7.4, 7.4, 7.4, 7.4, 7.4, 7.4];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 14.0,
  tasa_impositiva_pct: i === 0 ? 28 : 27,
  fijo: i === 0,
}));

const S = {
  anios,
  // Bono del Tesoro de EE. UU. a 10 años del 16-oct-2026 (5,09 %) [D4]; beta 0,95 (0,91 a 5 años mensual, 0,80 semanal a 2 años, ajustada 0,94-1,05) [D1].
  wacc: { tasa_libre_pct: 5.09, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 25, peso_deuda_pct: 39 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 7.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 0.0, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 3.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 0.0 },
  ],
  // Mercado mundial de cartón ondulado de Mordor Intelligence en 2030e (238.200 M USD) [B1].
  mercado_final: { periodo: '2030e', tamano: 238200 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 5, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero (intereses en caja ≈ 700 M en 2026 según la guía [A12]; baja algo con la deuda), impuesto de la cuenta,
  // minoritarios despreciables (24 M de patrimonio) y 526,5 M de acciones (sin suponer recompras, que el plan abre en 2027).
  bpa: { fin_recurrente: { '2026e': -720, '2027e': -700, '2028e': -680 }, minoritarios: 0, acciones: { '2026e': 526.5, '2027e': 526.5, '2028e': 526.5 } },
};
export default S;

const VENTAS_2025 = 31179;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: 1S publicado y guía de EBITDA; los ajustes empiezan en 2027e
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
