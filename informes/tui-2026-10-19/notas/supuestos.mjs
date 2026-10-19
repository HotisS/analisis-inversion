// Supuestos numéricos del analista (TUI AG, corte 2026-10-19). Cuentas consolidadas NIIF en millones de EUR; ejercicio a 30-sep.
// El DCF es el de las sociedades consolidadas SIN el resultado de las participadas (TUI Cruises, sociedades conjuntas de hoteles,
// Royalton), que el motor saca del EBITDA y se valoran en el puente (asociadas) por múltiplo de su beneficio.
// Margen EBITDA = EBITDA subyacente sin participadas: FY2023 7,0 %, FY2024 7,6 %, FY2025 7,5 % (1.808 M) [A1, A5].
// FY2026e (oct-25 a sep-26) ya cerrado sin publicar: fijo con la guía de 1.200-1.300 M de EBIT subyacente [A9].
// Capex = inversión en inmovilizado (≈ 3,4 % de las ventas; inversión neta de 810-830 M en FY2026 [A2]) + altas de derechos de uso
// (aviones y hoteles arrendados, ≈ 1,4 %: los arrendamientos van en el puente como deuda).
const crec = [-3.4, 2.5, 4.0, 4.0, 3.5, 3.0, 3.0, 2.5];
const margen = [7.3, 7.0, 7.4, 7.5, 7.5, 7.5, 7.5, 7.5];
const capex = [4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.3];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.9,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -20.5,
  tasa_impositiva_pct: 20,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 3.48, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 20, peso_deuda_pct: 45 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 6.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: -5.0, precio_pct: 1.6, otros_pct: 0 },
    { periodo: 'FY2027e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2028e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado final: ingresos por exportación turística de Europa (707.000 M EUR en 2025 [B3]) creciendo un 4 % al año hasta 2030.
  mercado_final: { periodo: 'FY2030e', tamano: 860000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 },
  // BPA publicado (no el subyacente) para que case con la historia del PER. Por año:
  // ajustes = partidas separadas + amortización de compras (FY2026e: guía de 70-90 M [A2]);
  // participadas = resultado por puesta en equivalencia (FY2025: 463,9 M; LTM jun-26: 455,5 M; TUI Cruises crece con Mein Schiff
  // Relax y Flow, 35-40 M de beneficio para TUI cada uno [A11]); fin = resultado financiero neto (FY2026e: guía de −325 a −350 M [A2]);
  // impuesto del 18 % sobre el beneficio antes de impuestos (FY2025: 18,6 %; guía FY2026: ≈ 18 % [A2]); minoritarios (familia Riu).
  bpa: {
    ajustes: { FY2026e: 80, FY2027e: 50, FY2028e: 40 },
    participadas: { Bajista: { FY2026e: 460, FY2027e: 465, FY2028e: 475 }, Base: { FY2026e: 460, FY2027e: 495, FY2028e: 535 }, Alcista: { FY2026e: 460, FY2027e: 515, FY2028e: 580 } },
    fin: { FY2026e: -340, FY2027e: -335, FY2028e: -315 },
    minoritarios: { Bajista: { FY2026e: 195, FY2027e: 195, FY2028e: 200 }, Base: { FY2026e: 195, FY2027e: 205, FY2028e: 215 }, Alcista: { FY2026e: 195, FY2027e: 215, FY2028e: 230 } },
    impuesto_pct: 18,
    acciones: 507.4,
  },
};
export default S;

const VENTAS_FY2025 = 24178.7;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebitSin = ebitda - amort;
    const part = S.bpa.participadas[caso][a.periodo];
    const ebitSub = ebitSin + part;
    const ebitPub = ebitSub - S.bpa.ajustes[a.periodo];
    const bai = ebitPub + S.bpa.fin[a.periodo];
    const imp = Math.max(0, bai * S.bpa.impuesto_pct / 100);
    const neto = bai - imp - S.bpa.minoritarios[caso][a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit_sin_participadas: ebitSin, participadas: part, ebit_subyacente: ebitSub, ebit: ebitPub, bai, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
