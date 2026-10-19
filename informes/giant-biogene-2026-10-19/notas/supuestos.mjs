// Supuestos numéricos del analista (Giant Biogene, corte 2026-10-19). Cuentas consolidadas NIIF en millones de RMB.
// Base: 2025 (ventas 5.518,5 M, −0,4 %; EBITDA 2.220,7 M, 40,2 %) [A1]. 1S26 publicado: ventas 2.917,7 M (−6,3 %),
// EBITDA 993,8 M (34,1 %), beneficio 939,5 M, impuesto del 14,2 % [A4].
// 2026e fijo: 1S publicado y un 2S26 de ≈ 2.490 M (+3,5 % frente al 2S25, con el 618 de KOMFYMED +25 % y un 11.11 sin dato)
// con un margen EBITDA del ≈ 33,8 %: ventas de 5.408 M (−2,0 %; la empresa quiere «volver a crecer», el consenso 6.062 M) y EBITDA del 34 %.
const crec = [-2.0, 6.0, 6.0, 5.0, 4.0, 3.0, 2.5, 2.0];
const margen = [34.0, 34.0, 34.5, 34.5, 34.5, 34.5, 34.5, 34.5];
const amort = [1.8, 1.9, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const capex = [4.5, 4.0, 3.0, 2.5, 2.5, 2.2, 2.2, 2.2];
const tasa = [17, 18, 18, 18, 18, 18, 18, 18];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 7.5,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  // Todo en RMB: bono chino a 10 años del 1,648 % (ChinaBond, 16-oct-2026) [D4]; beta 1,0; prima de mercado del 5,5 % y 2,5 puntos
  // adicionales (China y su regulador, canal de plataformas, producto estrella dañado). Sin deuda: WACC ≈ 9,65 %.
  wacc: { tasa_libre_pct: 1.648, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 2.5, coste_deuda_pct: 2.5, tasa_impositiva_pct: 18, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: -1.5, otros_pct: 0.5 },
    { periodo: '2027e', volumen_pct: 4.5, precio_pct: 0.0, otros_pct: 1.5 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 0.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  // Venta minorista de cosmética en China (NBS, empresas por encima del tamaño mínimo): 465.300 M RMB en 2025 (+5,1 %) [B1];
  // al 4 % anual, 2030e ≈ 566.100 M RMB. Es la referencia más prudente (la asociación da 1,1 billones con todos los canales [B2]).
  mercado_final: { periodo: '2030e', tamano: 566100 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // BPA propio: resultado financiero recurrente (intereses de ≈ 7.600 M de caja, depósitos y fondos al 2-3 %, más subvenciones;
  // 1S26: otros ingresos 142,1 M, de ellos 116,8 M de intereses, y otras ganancias 21,1 M) [A4] que baja con los dividendos y los tipos:
  // 280 M en 2026e, 240 M en 2027e y 230 M en 2028e. Minoritarios ≈ 0. Acciones diluidas: 1.055,5 M (1S26), 1.058 y 1.060 M (opciones).
  bpa: { fin_recurrente: { '2026e': 280, '2027e': 240, '2028e': 230 }, minoritarios: 0, acciones: { '2026e': 1055.5, '2027e': 1058, '2028e': 1060 } },
};
export default S;

const VENTAS_2025 = 5518.5;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
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
