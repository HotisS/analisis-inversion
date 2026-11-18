// Supuestos numéricos del analista (Powell Industries, POWL, corte 2026-11-18). Millones de USD, US GAAP, ejercicio a 30 de septiembre.
// Base: FY2026 real (10-K del 17-nov-2026): ventas 1.256,2 M, EBITDA 273,7 M (21,8 %), EBIT 265,0 M, BPA 6,04 USD [A1, A2].
// Cartera de 2.700 M a 30-sep-2026, de la que ≈ 1.300 M se facturará en FY2027 y la mayor parte del resto en FY2028 [A1, A3].
// Pedidos que se facturan dentro del año («book and ship») ≈ 75-80 M por trimestre [A3]. FY2026: ≈ 840 M salieron de la cartera
// de sep-2025 (60 % de 1.400 M) y ≈ 416 M de pedidos del propio año; FY2027e: 1.300 + ≈ 300-420 = 1.600-1.720 M.
const crec = [27.0, 15.0, 8.0, 4.0, 3.5, 3.0, 3.0, 3.0, 3.0, 3.0];
// Margen bruto de FY2026 del 31,3 % con 150 pb de cierres de proyectos (base ≈ 30 %); la dirección ve sostenible el de FY2026 en FY2027 [A3].
const margen = [21.5, 21.0, 20.0, 19.0, 18.0, 17.5, 17.0, 17.0, 17.0, 17.0];
const amort = [0.75, 0.85, 0.95, 1.05, 1.1, 1.15, 1.2, 1.2, 1.2, 1.2];
// Capex FY2026 18,5 M; FY2027: 15-20 M más por la nave de 275.000 pies² y Jacintoport [A3] → ≈ 36 M (2,3 %); FY2028e con margen para la fábrica nueva.
const capex = [2.3, 3.0, 2.0, 1.5, 1.3, 1.3, 1.3, 1.3, 1.3, 1.3];
// Circulante con contratos: −7,0 % de las ventas a sep-26 (anticipos de 578,7 M) frente a +6,7 % a sep-25 [A1]; vuelve hacia el 5 % al ejecutarse la cartera.
const nwc = [-3.0, 1.0, 3.5, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0, 5.0];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 23,
  fijo: false,
}));

const S = {
  anios,
  // Treasury a 10 años del 17-nov-2026 (5,10 %) [D4]; beta 1,25 (mensual 5 años 1,25; semanal 5 años 1,27 [D1]); prima de mercado 5,0
  // y 0,5 de prima adicional por tamaño y ciclicidad (igual que en octubre). Sin deuda financiera [A1].
  wacc: { tasa_libre_pct: 5.10, beta: 1.25, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 23, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 23.5, precio_pct: 3.5, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 12.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Aparamenta de media tensión de Norteamérica (GMI [B2]): 3.920 M en 2025 al 8,3 % anual → 3.920 × 1,083^5 = 5.837 M en 2030
  // y 6.322 M en 2031. Mismo perímetro que la cuota de hoy (ventas de EE. UU. y Canadá frente a ese mercado [A1, B2]).
  mercado_final: { periodo: 'FY2031e', tamano: 6322 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero recurrente = intereses de la caja (860,8 M a sep-26; 20,1 M de intereses netos en FY2026 con una caja media
  // de ≈ 650 M [A1]); parte de la caja se consumirá al ejecutar la cartera (anticipos). Impuesto del 23 % (23 % en FY2026 [A1]).
  // Acciones diluidas 36,6 M (36.458.474 en circulación a 16-nov-2026 más ≈ 0,2 M de RSU [A1]); +0,1 M al año por RSU sin recompras.
  bpa: { fin_recurrente: { 'FY2027e': 28, 'FY2028e': 30 }, minoritarios: 0, acciones: { 'FY2027e': 36.7, 'FY2028e': 36.8 } },
};
export default S;

const VENTAS_FY2026 = 1256.2;
export function bpa(caso = 'Base', hasta = 2) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2026; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    v = v * (1 + (a.crecimiento_pct + c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
