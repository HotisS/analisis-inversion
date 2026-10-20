// Supuestos numéricos del analista (Cheryong Electric, corte 2026-10-20). Cuentas individuales K-IFRS en millones de KRW.
// Base: 2025 (224.017 M de ventas; EBITDA 68.929 M, 30,8 %; beneficio operativo 67.027 M, 29,9 %) [A1].
// 2026e fijo: 1S26 publicado (70.323 M de ventas, −36,4 %; beneficio operativo 11.123 M, 15,8 %; EBITDA 12.198 M, 17,3 %) [A2]
// y un 2S de ≈ 75.000 M (3T ≈ 37.000 M y 4T ≈ 38.000 M: cartera de 141.580 M a 30-jun y pedidos de ≈ 31.000 M por trimestre)
// con un margen operativo del ≈ 14,5-15 % (2T26: 14,7 %, con fletes y aduanas del 27,8 % de las ventas por la sección 232):
// ventas de ≈ 145.300 M (−35,1 %) y EBITDA del 16,5 % con amortización del 1,65 % (2.150 M en el 1S anualizados + nave nueva).
const crec = [-35.1, 8.0, 12.0, 8.0, 6.0, 5.0, 4.0, 3.5];
// Margen EBITDA: del 16,5 % de 2026e a un 13 % de ciclo medio en 2032e-2033e. Antes de la escasez (2019-2021) el margen operativo
// era del 0-9 %; en el pico (2024) del 37 %. El 13 % supone que la gama de 154 kV y el precio por unidad de EE. UU. (11,9 M KRW por
// unidad en 2025 frente a 8,0 en 2024) aguantan una parte del pico, no todo.
const margen = [16.5, 15.5, 15.0, 14.5, 14.0, 13.5, 13.0, 13.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  // Amortización: 1.902 M en 2025 (0,85 %) y 1.075 M en el 1S26; con la nave de Bosch (40.000 M) y la línea de 154 kV
  // (≈ 85.000 M de inmovilizado), ≈ 4.500-5.000 M al año desde 2027e (≈ 2,8 % de las ventas).
  amortizacion_pct_ventas: i === 0 ? 1.65 : 2.8,
  // Capex: 2026e ≈ 48.000 M (la nave de Bosch, 40.000 M pagados en el 1S, y equipos; plan de 45.545 M en el informe semestral) [A2,
  // A13] ≈ 33 % de las ventas; 2027e ≈ 10.000 M de equipos de 154 kV (6,4 %); después, mantenimiento del ≈ 3 %.
  capex_pct_ventas: [33.0, 6.4, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0][i],
  // Circulante comercial: 16,2 % de las ventas en 2025, 20,2 % en 2024 y ≈ 25 % de las ventas anualizadas del 1S26 (existencias de
  // 31.181 M con ventas que caen) [A1, A2]; baja al 20 % con ventas estables.
  nwc_pct_ventas: [24, 23, 22, 21, 20, 20, 20, 20][i],
  tasa_impositiva_pct: 21.5,
  fijo: i === 0,
}));

const S = {
  anios,
  // Bono coreano a 10 años del 4,454 % (sep-2026) [D4]; beta de 1,1 (mensual a 5 años 1,11; semanal 1,25) [D1]; prima de 5,5 % y
  // 2 puntos adicionales por tamaño (688.000 M KRW), concentración (un cliente es el 37,9 % de las ventas) y ciclo. Sin deuda.
  wacc: { tasa_libre_pct: 4.454, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 21.5, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -38.0, precio_pct: 1.0, otros_pct: 1.9 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 0.0, otros_pct: 3.0 },
    { periodo: '2028e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 8.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 4.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 2.0 },
  ],
  // Mercado final: transformadores en el mundo, 53.510 M USD en 2030 (GlobalData, ficha sectorial [B3]) × 1.327,38 KRW/USD
  // (Yahoo, 20-oct-2026) ≈ 71.028.000 M KRW. Nuestras ventas de 2030e (≈ 201.000 M) serían el 0,28 %.
  mercado_final: { periodo: '2030e', tamano: 71028000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 8.0, ajuste_margen_pp: 4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  // Sin consenso (ninguna casa la sigue) no hay BPA ni EBITDA de los próximos 12 meses: los comparables no dan valor en el motor
  // y no se pesan; el PER de los comparables (20,4x) se usa solo para el alcista a 12 meses y como contraste.
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // BPA propio: resultado financiero recurrente de +4.000 M (intereses de ≈ 154.000 M de caja y depósitos al ≈ 2,6-3 %, menos lo que
  // se va en capex y dividendos; sin las plusvalías de activos financieros, 16.792 M en el 1S26), sin minoritarios ni autocartera.
  bpa: { fin_recurrente: 4000, minoritarios: 0, acciones: { '2026e': 16.062409, '2027e': 16.062409, '2028e': 16.062409 } },
};
export default S;

const VENTAS_2025 = 224017;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = (v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp)) / 100;
    const amort = (v * a.amortizacion_pct_ventas) / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
