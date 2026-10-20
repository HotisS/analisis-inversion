// Supuestos numéricos del analista (ITCEN GLOBAL, corte 2026-10-20). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (8.870.845 M de ventas; EBITDA 294.397 M, 3,32 %; beneficio operativo 279.926 M) [A1].
// Se proyecta el consolidado (100 % de las filiales) y la parte de los minoritarios sale en el BPA (≈ 76,5 % del beneficio,
// como en 2025) y en el puente del DCF.
// Por negocio (lo que hay detrás del margen consolidado):
//  - Oro: ventas ≈ 9,1 billones en 2026e (5,50 en el 1S real + ≈ 3,6 en el 2S con el oro ≈ 4.160 USD y menos volumen) y
//    ≈ 8,0 billones en 2027e; margen operativo del 0,8 % en el 2S26 y del 1,1 % normalizado desde 2027e (0,5-0,9 % en
//    2022-2024, 3,25 % en el pico de 2025, 0,6 % en el 2T26) [A1, A3, A5].
//  - Informática: ventas ≈ 1,2 billones y margen operativo del 2,5-3,5 % (≈ 38.000 M en 2026e, ≈ 40.000-42.000 M después).
//  - Ajustes de consolidación y gastos de la matriz: ≈ −6.000 M al año (−14.000 M en el 1S26).
// 2026e fijo: 1S26 publicado (5.580.649 M de ventas; beneficio operativo 107.461 M) + 2S ≈ 4,62 billones con ≈ 61.000 M de
// beneficio operativo (oro ≈ 4,0 billones al 0,8 %, informática ≈ 650.000 M con ≈ 30.000 M por el 4T, ajustes −1.000 M):
// ventas de 10.201.000 M (+15,0 %) y beneficio operativo de ≈ 168.300 M; EBITDA del 1,81 % con amortización del 0,16 %.
const crec = [15.0, -11.8, 4.0, 3.5, 3.0, 3.0, 2.5, 2.5];
const margen = [1.81, 1.57, 1.60, 1.60, 1.60, 1.60, 1.60, 1.60];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: i === 0 ? 0.16 : 0.18,
  // 2026e: 3.387 M en el 1S26 [A3] y ≈ 7.000 M en el 2S. Después ≈ 0,22 % (≈ 20.000 M: media de 2021-2025 sin la sede de 2024).
  capex_pct_ventas: i === 0 ? 0.10 : 0.22,
  // Circulante comercial (existencias + clientes + activos de contrato − proveedores − pasivos de contrato): 3,7 % de las
  // ventas en 2025 y ≈ 476.000 M a 30-jun-2026 (≈ 4,3 % de las ventas de los últimos doce meses) [A1, A3].
  nwc_pct_ventas: [4.2, 4.0, 3.9, 3.8, 3.8, 3.8, 3.8, 3.8][i],
  tasa_impositiva_pct: 24.5,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 4.45, beta: 1.3, prima_mercado_pct: 5.5, prima_adicional_pct: 3.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 24.5, peso_deuda_pct: 25 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 6 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -12.0, precio_pct: 27.0, otros_pct: 0.0 },
    { periodo: '2027e', volumen_pct: -8.0, precio_pct: -4.0, otros_pct: 0.2 },
    { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Mercado final de referencia (escala, no cuota): negociación anual del mercado del oro de la KRX. 19,42 billones del 2-ene
  // al 2-oct de 2026 (≈ 26 billones anualizados) [B3]; tras caer un 80 % de enero a julio [B4] suponemos ≈ 24 billones en
  // 2030e. Mismo perímetro que competencia.cuota_pct (ventas consolidadas ÷ esa negociación: 10,2 ÷ 26 = 39,2 % en 2026e).
  mercado_final: { periodo: '2030e', tamano: 24000000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 25, escenarios: 20 },
  // BPA propio: resultado financiero recurrente de −8.000 M (intereses de ≈ 11.600 M menos ingresos de la caja; sin las
  // coberturas del oro, los vales regalo ni el derivado del CB), impuesto del 24,5 % y minoritarios del 76,5 % del beneficio
  // (2025: 151.634 de 198.284 M) [A1]. Acciones: 23,2 M + 1.052.050 del CB nº 16 = 24,26 M (dilución total, prudente aunque
  // hoy convierta muy por encima del precio) desde 2027e; 2026e ≈ 23,6 M [A3, A8].
  bpa: { fin_recurrente: -8000, minoritarios_pct: 76.5, acciones: { '2026e': 23.6, '2027e': 24.26, '2028e': 24.26 } },
};
export default S;

const VENTAS_2025 = 8870845;
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
    const netoTotal = bai * (1 - a.tasa_impositiva_pct / 100);
    const minor = netoTotal * S.bpa.minoritarios_pct / 100;
    const neto = netoTotal - minor;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, netoTotal, minor, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
// Cuadre con 2025: (279.926 − 17.058) × (1 − 24,6 %) = 198.284; × 23,5 % = 46.650 = 2.010 KRW × 23,21 M [A1].
