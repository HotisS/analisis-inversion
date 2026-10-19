// Supuestos numéricos del analista (Powell Industries, POWL, corte 2026-10-19). Millones de USD, US GAAP, ejercicio a 30 de septiembre.
// Base: FY2025 (1.104,3 M de ventas, margen EBITDA del 20,4 %, EBIT del 19,7 %) [A1]. FY2026e cerrado pero sin publicar: 9M = 859,5 M de ventas
// y 170,9 M de EBITDA [A3]; 4T estimado en ≈ 330 M con margen del 21 % (cartera facturable a 12 meses de ≈ 1.300 M [A3]).
const crec = [7.8, 22.0, 14.0, 8.0, 5.0, 4.0, 3.5, 3.0, 3.0, 3.0];
const margen = [20.3, 20.5, 20.5, 19.5, 18.5, 17.5, 17.0, 16.5, 16.5, 16.5];
const amort = [0.75, 0.8, 0.95, 1.05, 1.1, 1.15, 1.2, 1.2, 1.2, 1.2];
const capex = [1.35, 4.0, 4.0, 2.5, 1.5, 1.3, 1.3, 1.3, 1.3, 1.3];
const nwc = [2.0, 3.5, 5.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0, 6.0];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 23,
  fijo: i === 0,
}));

const S = {
  anios,
  // Treasury a 10 años del 16-oct-2026 (5,09 %) [D4]; beta 1,25 (mensual 5 años 1,22, semanal 5 años 1,26 [D1]); prima de mercado 5,0 (Damodaran 4,2 % + 0,8 de margen)
  // y 0,5 de prima adicional por tamaño y ciclicidad. Sin deuda financiera [A3].
  wacc: { tasa_libre_pct: 5.09, beta: 1.25, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 23, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 4.8, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2027e', volumen_pct: 18.5, precio_pct: 3.5, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 11.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Aparamenta de media tensión de Norteamérica (GMI [B2]): 3.920 M en 2025 al 8,3 % anual → 3.920 × 1,083^5 = 5.837 M en 2030.
  // Mismo perímetro que la cuota de hoy (26,5 %, ventas de EE. UU. y Canadá frente a ese mercado [B1, B2]).
  mercado_final: { periodo: 'FY2030e', tamano: 5837 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero recurrente = intereses de la caja (633,6 M a jun-26, ≈ 3,5-4 %; últimos 12 meses ≈ 19 M [A3]),
  // impuesto del 23 % (22,6 % en FY2025 [A1]) y acciones diluidas (36,6 M [A3]; las RSU suman ≈ 0,2 M al año y las recompras son pequeñas [A1]).
  bpa: { fin_recurrente: { 'FY2026e': 18.5, 'FY2027e': 22, 'FY2028e': 22 }, minoritarios: 0, acciones: { 'FY2026e': 36.6, 'FY2027e': 36.8, 'FY2028e': 37.0 } },
};
export default S;

const VENTAS_FY2025 = 1104.3;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // FY2026e fijo: el ejercicio ya cerró; los ajustes de escenario empiezan en FY2027e
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
