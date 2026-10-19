// Supuestos numéricos del analista (Norwegian Air Shuttle, corte 2026-10-19). Cuentas consolidadas NIIF en millones de NOK.
// Base: 2025 (37.646 M de ventas, EBITDA 7.887 M = 20,9 %; amortización 4.155 M neta de 858 M de ganancias por comprar aviones que tenía arrendados) [A1].
// 2026e fijo: 1S26 publicado (ventas 17.312 M, EBITDA 1.457 M, EBIT −824 M con 733 M de pérdida del EU ETS) y un 2S26
// con el queroseno a 190 USD/barril y un 53-55 % cubierto a ≈ 760 USD/t [A2, A9]: EBITDA del 2S26 ≈ 4.150 M (−20 % frente al 2S25).
// El DCF es el de Norwegian sola (con Widerøe), SIN NLTG: la compra se cierra al final del 4T26 y se paga en caja y acciones a un
// precio de mercado (6,6 veces el EBITDA); su efecto entra en el BPA a 12 meses, no en el DCF.
const crec = [3.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0, 2.5];
const margen = [14.4, 17.0, 18.5, 19.0, 19.0, 19.0, 19.0, 19.0];
const capex = [14.0, 18.0, 17.0, 15.0, 15.0, 13.0, 12.5, 12.5];
const tasa = [20, 20, 21, 22, 22, 22, 22, 22];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 12.3 : 12.0,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -5,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.54, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 22, peso_deuda_pct: 45 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 4.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  // Sin mercado final en dinero: la cuota se mide en pasajeros (≈ 2,5 % de los de la UE) y en asientos de los Nórdicos [B2].
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA a 12 meses del grupo con NLTG (cierre previsto al final del 4T26 [D14]):
  // resultado financiero recurrente (2025: −716 M; más intereses de arrendamientos de los MAX nuevos y menos caja tras pagar
  // 3.500 M SEK por NLTG) y aportación neta de NLTG (beneficio de 517 M SEK a mar-26 [A10] menos amortización de intangibles
  // de la compra y el coste de la caja usada) en NOK; acciones: 1.051,5 M hoy + 300 M de contraprestación = 1.351,5 M.
  bpa: {
    fin: { '2026e': -750, '2027e': -850, '2028e': -950 },
    nltg: { Bajista: { '2027e': 100, '2028e': 150 }, Base: { '2027e': 300, '2028e': 450 }, Alcista: { '2027e': 450, '2028e': 650 } },
    acciones: { '2026e': 1051.5, '2027e': 1351.5, '2028e': 1351.5 },
  },
};
export default S;

const VENTAS_2025 = 37646;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin[a.periodo];
    // 2026e: la pérdida de 733 M del ETS no es deducible; el impuesto se aplica sobre el resultado sin ella.
    const imp = a.periodo === '2026e' ? Math.max(0, (bai + 733) * a.tasa_impositiva_pct / 100) : Math.max(0, bai * a.tasa_impositiva_pct / 100);
    const nltg = S.bpa.nltg[caso]?.[a.periodo] ?? 0;
    const neto = bai - imp + nltg;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
