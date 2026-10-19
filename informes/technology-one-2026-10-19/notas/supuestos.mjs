// Supuestos numéricos del analista (Technology One, corte 2026-10-19). Millones de AUD, ejercicio cerrado a 30-sep ("FY2025" = oct-24 a sep-25).
// Base: FY2025 (598,5 M de ingresos, EBITDA 254,3 M = 42,5 %; D&A 13,5 %; capex 17,8 % con desarrollo y comisiones activadas) [A1].
// FY2026e fijo: el ejercicio ya ha cerrado (30-sep-2026) pero se publica hacia el 17-nov. H1 publicado (318,4 M, +11,5 %) y guía reafirmada
// el 19-may: beneficio antes de impuestos +18-20 % en el extremo alto (≈ 218 M) [A6, A8, A12]; consenso de ingresos 679 M [D2].
const crec = [13.5, 14.0, 13.0, 12.5, 12.0, 10.0, 8.0, 6.0, 5.0, 4.0];
const margen = [44.5, 45.5, 46.5, 47.5, 48.0, 48.5, 48.5, 48.5, 48.5, 48.5];
const amort = [13.5, 13.7, 13.8, 13.9, 14.0, 14.0, 14.0, 14.0, 14.0, 14.0];
// Capex = pagos de desarrollo, intangibles (con comisiones activadas) e inmovilizado (17,8 % en FY25) + ≈ 1,1 puntos de altas de derechos de uso (pagos de arrendamiento de 7,2 M en FY25), porque los arrendamientos van en el puente (NIIF 16).
const capex = [18.8, 18.5, 18.1, 17.9, 17.6, 17.4, 17.3, 17.1, 17.0, 17.0];
const nwc = [-42, -42, -42, -42, -42, -42, -42, -42, -42, -42];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

const S = {
  anios,
  // Bono australiano a 10 años del 5,31 % (RBA F2, 14-oct-2026) [D]; beta 1,15 (1,30 mensual a 5 años, 1,20 ajustada; la bajamos algo por
  // la caja neta y el cobro recurrente); prima de 5,0 % (Damodaran: 4,2 % implícita en EE. UU. + algo de prima de mercado más pequeño). Sin deuda.
  wacc: { tasa_libre_pct: 5.31, beta: 1.15, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 25, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 6.5, precio_pct: 5.5, otros_pct: 1.5 },
    { periodo: 'FY2027e', volumen_pct: 8.0, precio_pct: 5.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 8.0, precio_pct: 4.5, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 8.0, precio_pct: 4.0, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 8.0, precio_pct: 4.0, otros_pct: 0.0 },
  ],
  // Mercado de ERP y software de gestión del sector público, educación y medianas empresas de Australia, Nueva Zelanda y Reino Unido:
  // ≈ 13.500 M AUD en FY2025 creciendo ≈ 7 % al año (nota B) → FY2030e ≈ 13.500 × 1,07^5 ≈ 18.934 M AUD [B].
  mercado_final: { periodo: 'FY2030e', tamano: 18934 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente ≈ +7 M (intereses de ≈ 245 M de caja al 3,5-4 % menos ≈ 3,5 M de intereses de arrendamientos;
  // FY25 +8,0 M, H1 FY26 +2,7 M) y 330 M de acciones diluidas (329,8 M en FY25) [A1, A6].
  bpa: { fin_recurrente: 7, minoritarios: 0, acciones: { 'FY2026e': 330, 'FY2027e': 330, 'FY2028e': 330 } },
};
export default S;

const VENTAS_FY2025 = 598.502;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // FY2026e ya cerrado: los ajustes de escenario empiezan en FY2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
