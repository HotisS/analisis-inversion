// Supuestos numéricos del analista (Orange SA, corte 2026-10-20). Cuentas consolidadas NIIF en millones de EUR; ejercicio natural.
// Perímetro: Orange con MasOrange (España) al 100 % desde el 8-jun-2026 [A2]; sin SFR (protocolo, cierre posible en el 2S27 [A12]).
// Margen EBITDA del motor = EBIT + amortizaciones, sin puestas en equivalencia y sin partidas específicas, ANTES de arrendamientos:
// 2022 32,9 %, 2023 32,4 %, 2024 34,4 %, 2025 35,5 % (14.335 M). Para 2026e: EBITDAaL ≈ 14.400 M (guía > +4 % sin España + 7 meses
// de MasOrange) + ≈ 2.000 M de amortización de derechos de uso e intereses de arrendamientos ≈ 16.400 M (35,8 %); restamos un 1,0 %
// de las ventas de reestructuración y cargas de personal «específicas» que en la práctica se repiten (media de 2021-2025: ≈ 590 M al
// año sin deterioros ni plusvalías, un 1,4 % de las ventas [A1, A5]): 34,8 %.
// Capex = eCAPEX (15,2 % en el 1S26 → ≈ 14 % en 2028 [A4, A7]) + licencias (≈ 0,8 %) + altas de derechos de uso (≈ 3,6 %; los
// arrendamientos van en el puente como deuda).
const crec = [13.5, 8.8, 1.8, 2.0, 1.8, 1.8, 1.6, 1.5];
const margen = [34.8, 35.1, 35.3, 35.5, 35.5, 35.5, 35.5, 35.5];
const amort = [21.2, 21.3, 21.0, 20.6, 20.3, 20.0, 19.8, 19.6];
const capex = [19.8, 19.6, 19.4, 19.4, 19.5, 19.6, 19.7, 19.8];
const tasa = [31, 31, 30, 30, 29, 29, 29, 29];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: -3,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 3.49, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 2.0, coste_deuda_pct: 4.2, tasa_impositiva_pct: 29, peso_deuda_pct: 55 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 6.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.5, precio_pct: 0.5, otros_pct: 11.5 },
    { periodo: '2027e', volumen_pct: 1.0, precio_pct: 0.5, otros_pct: 7.3 },
    { periodo: '2028e', volumen_pct: 1.3, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 0.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.3, precio_pct: 0.5, otros_pct: 0 },
  ],
  // Mercado final: servicios de telecomunicaciones de los países de Orange. Aproximación: Francia minorista + mayorista (46.000 M en
  // 2025 [B2]) + España (≈ 33.000 M, mercado de MasOrange) + Europa y África de Orange con sus cuotas (≈ 75.000 M): ≈ 154.000 M en
  // 2025, creciendo ≈ 1,5 % al año: ≈ 166.000 M en 2030 (estimación propia).
  mercado_final: { periodo: '2030e', tamano: 166000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  // BPA AJUSTADO (definición de Orange: sin partidas específicas, deterioros, plusvalías ni amortización de compras; menos los cupones
  // de los híbridos), para que case con la historia del PER (0,95 € en 2024 y 0,86 € en 2025 [A6]).
  // fin = resultado financiero (con los intereses de arrendamientos, porque el EBITDA del motor va antes de ellos): 2025 −1.254 M;
  // 1S26 −764 M con MasOrange solo en junio [A2]; deuda neta de 35.683 M tras MasOrange [A4].
  // part = puestas en equivalencia (MasOrange en ene-may 2026: −203 M en el 1S26 [A2]).
  // impuesto: 2026 con la contribución excepcional sobre el beneficio de las grandes empresas (CEB); el PLF 2027 la prorroga a un
  // tipo menor en 2027; base: desaparece en 2028 solo en parte (Orange paga también en África, con tipos del 25-30 %).
  // otros = +116 M de calibración: con las mismas fórmulas el BPA ajustado de 2025 sale 0,82 € frente a 0,86 € publicado.
  bpa: {
    fin: { Bajista: { '2026e': -1750, '2027e': -2050, '2028e': -2000 }, Base: { '2026e': -1750, '2027e': -1950, '2028e': -1950 }, Alcista: { '2026e': -1750, '2027e': -1900, '2028e': -1800 } },
    part: { '2026e': -210, '2027e': 30, '2028e': 40 },
    impuesto_pct: { Bajista: { '2026e': 31, '2027e': 33, '2028e': 34 }, Base: { '2026e': 31, '2027e': 31, '2028e': 32 }, Alcista: { '2026e': 31, '2027e': 30, '2028e': 30 } },
    minoritarios: { '2026e': 690, '2027e': 730, '2028e': 760 },
    hibridos: 190,
    reestructuracion_pct: 1.0, // el BPA ajustado de Orange excluye la reestructuración: se devuelve al EBITDA del BPA
    otros: 116,
    acciones: 2652.8,
  },
};
export default S;

const VENTAS_2025 = 40396;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + S.bpa.reestructuracion_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const p = a.periodo;
    const bai = ebit + S.bpa.part[p] + S.bpa.fin[caso][p];
    const t = S.bpa.impuesto_pct[caso][p];
    const neto = bai * (1 - t / 100) - S.bpa.minoritarios[p] - S.bpa.hibridos + S.bpa.otros;
    r = { periodo: p, ventas: v, ebitda, ebit, bai, impuesto_pct: t, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
