// Supuestos numéricos del analista (BSE, corte 2026-10-20). Cuentas consolidadas Ind AS en millones de INR.
// Base: FY2026 (48.340 M de ingresos de explotación, EBITDA operativo con Core SGF de 30.787 M, 63,7 %; amortización 1.590 M,
// 3,3 %) [A1, A6]. FY2027e no es fijo: solo hay un trimestre publicado (1T FY27: 15.661 M, plano frente al 4T FY26) [A5, A6].
// Ingresos FY2027e: 1T 15.661 + 2T ≈ 13.300 (derivados −18-20 % con la subasta de cierre y las normas del RBI; el foro lo estima
// así y la prensa midió −12 % de volumen de opciones en agosto [E1, B9]) + 3T ≈ 14.000 + 4T ≈ 14.500 ≈ 57.500 M (+19 %).
// FY2028e +8 % (año entero con STT, CAS y RBI; sin suprimir los vencimientos semanales en el base), después el mercado indio de
// bolsas (≈ +12 % anual, estimación propia) y bajando al 7 % en FY2034e.
const crec = [19.0, 8.0, 12.0, 12.0, 11.0, 10.0, 8.5, 7.0];
// Margen EBITDA operativo (con la aportación al Core SGF): 64,5 % en FY2027e (67 % en el 1T con los ingresos más altos; el 2T
// baja con los volúmenes), subiendo al 66 % por apalancamiento operativo; por debajo del 82 % de la NSE [B3], porque BSE
// paga más tecnología y contribución regulatoria por rupia de ingreso.
const margen = [64.5, 64.5, 65.0, 65.5, 66.0, 66.0, 66.0, 66.0];
const amort = [3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3];
// Capex: 10,7 % de las ventas en FY2026 (centro de datos, motor de negociación, sede de la cámara) y 5,2 % en FY2025 [A1].
const capex = [7.0, 5.0, 4.5, 4.0, 4.0, 3.8, 3.6, 3.5];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 8,
  tasa_impositiva_pct: 25.2,
  fijo: false,
}));

const S = {
  anios,
  // Bono indio a 10 años del 7,06 % (FRED, sep-2026) [D4]; beta de 1,27 frente al Nifty 50 (60 meses) [D1]; prima de 5,5 % y
  // 1,0 punto adicional por la dependencia de un regulador (SEBI) y de un producto (opciones semanales). Sin deuda.
  wacc: { tasa_libre_pct: 7.06, beta: 1.27, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 8.5, tasa_impositiva_pct: 25.2, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 6.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 17.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: 'FY2028e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2029e', volumen_pct: 10.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2030e', volumen_pct: 10.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2031e', volumen_pct: 9.0, precio_pct: 0.0, otros_pct: 2.0 },
  ],
  // Ingresos de las bolsas indias (NSE + MCX + BSE): ≈ 273.600 M INR en los últimos doce meses [B3], creciendo un 12 % anual
  // (estimación propia, como el ahorro financiero de los hogares) durante cinco años: ≈ 482.000 M en FY2031e.
  mercado_final: { periodo: 'FY2031e', tamano: 482000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 5.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio. Resultado financiero recurrente = rendimiento de la caja PROPIA (≈ 5,5 % antes de impuestos; 6,0 % en FY2026
  // sobre una media de 48.700 M [A1]) + otros ingresos (≈ 220 M) + asociadas (CDSL; 654 M en FY2026 [A6]). La caja propia crece
  // con el flujo libre menos dividendos: media de ≈ 71.000 M en FY2027e, ≈ 87.000 M en FY2028e y ≈ 104.000 M en FY2029e.
  // Minoritarios: −80 M (las filiales de GIFT City pierden dinero; −95 M en FY2026 [A1]). Acciones: 411,98 M (sin dilución).
  bpa: { fin_recurrente: { 'FY2027e': 4700, 'FY2028e': 5700, 'FY2029e': 6700 }, minoritarios: -80, acciones: 411.98 },
};
export default S;

const VENTAS_FY2026 = 48340;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2026; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const tras = bai * (1 - a.tasa_impositiva_pct / 100);
    const neto = tras - S.bpa.minoritarios;
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, minoritarios: S.bpa.minoritarios, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
