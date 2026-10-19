// Supuestos numéricos del analista (Pandora A/S, corte 2026-10-19). Cuentas consolidadas NIIF en millones de DKK; ejercicio natural.
// Margen EBITDA publicado: 2023 32,4 %, 2024 32,6 %, 2025 31,7 % [A1]. Amortización (con derechos de uso de tiendas): 7,8 % en 2025 [A1].
// 2026e: fijo con la guía (orgánico 0-3 %, margen EBIT 22-23 % con ≈ 100 pb de devolución de aranceles IEEPA) y el dólar más débil [A2, A9].
// 2027e: el año del golpe de la plata (guía ≥ 12 % de margen EBIT con plata a 82 USD; ≥ 14 % sin costes únicos; cubierta al 90-100 %
// a ≈ 65 USD, unos +200 pb) [A9, A10]. Tomamos un 15 % de margen EBIT. 2028e: plata sin cubrir a ≈ 57-60 USD y primeras ventas en
// platino: 19 % (objetivo de medio plazo > 21 % [A9]). Capex = inmovilizado e intangibles (1.911 M en 2025, 5,9 %) + altas de derechos
// de uso de tiendas (2.102 M, 6,5 %) [A1]: los arrendamientos van como deuda en el puente.
const crec = [1.7, 4.0, 4.5, 4.5, 4.0, 3.5, 3.0];
const margen = [30.7, 23.2, 27.2, 28.7, 29.2, 29.2, 29.2];
const capex = [12.5, 11.0, 10.5, 10.0, 9.8, 9.5, 9.5];
const nwc = [5.5, 6.0, 5.0, 5.0, 5.0, 5.0, 5.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 8.2,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 3.48, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.0, tasa_impositiva_pct: 25, peso_deuda_pct: 20.7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -1.0, precio_pct: 4.0, otros_pct: -1.3 },
    { periodo: '2027e', volumen_pct: 0.0, precio_pct: 3.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.5 },
  ],
  // Mercado final: joyería mundial, ≈ 2.397.000 M DKK en 2025 creciendo ≈ 4 % al año hasta ≈ 2.917.000 M en 2030 [B3, B4].
  mercado_final: { periodo: '2030e', tamano: 2917000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA diluido: EBIT + resultado financiero (intereses de bonos y arrendamientos, derivados; 2025: −870 M; 1S26 más deuda) [A1, A2],
  // impuesto del 25 % (2025: 24,2 %), sin minoritarios; 75,0 M de acciones diluidas sin recompras (suspendidas en 2026 [A2]).
  bpa: { fin: { '2026e': -1125, '2027e': -1050, '2028e': -1000 }, impuesto_pct: 25, acciones: 75.0 },
};
export default S;

const VENTAS_2025 = 32549;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const ebit = ebitda - v * a.amortizacion_pct_ventas / 100;
    const bai = ebit + S.bpa.fin[a.periodo];
    const neto = bai * (1 - S.bpa.impuesto_pct / 100);
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, margen_ebit: ebit / v * 100, bai, neto, bpa: neto / S.bpa.acciones };
  }
  return r;
}
