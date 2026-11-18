// Supuestos numéricos del analista (BSE, corte 2026-11-18). Cuentas consolidadas Ind AS en millones de INR.
// Base: FY2026 (48.340 M de ingresos de explotación, EBITDA operativo con Core SGF de 30.787 M, 63,7 %; amortización 1.590 M,
// 3,3 %) [A1, A6]. FY2027e no es fijo, pero ya hay dos trimestres: 1T 15.660 + 2T 14.327 = 29.987 M (+48 %) [A15].
// Segundo semestre: octubre fue el mejor mes de la historia en prima de opciones (35.481 crore diarios frente a 22.531 de media en
// el 2T) y desde diciembre los contratos que vencen se liquidan otra vez con la media de la última media hora [A16]; suponemos
// 3T ≈ 15.800 y 4T ≈ 15.100 → FY2027e ≈ 60.900 M (+26 %; PL Capital +24 % [A17]). FY2028e +11 % (año entero con STT, normas del
// RBI y sin suprimir los vencimientos semanales en el base), después el mercado indio de bolsas (≈ +12 % anual, estimación
// propia) y bajando al 7 % en FY2034e.
const crec = [26.0, 11.0, 12.0, 11.0, 10.0, 9.0, 8.0, 7.0];
// Margen EBITDA operativo (con la aportación al Core SGF): 67,3 % en el primer semestre de FY2027 y 67,9 % en el 2T [A15]; la
// dirección ve sostenible un 65-70 % y no bajará el gasto en tecnología [A17]. 67 % en FY2027e-FY2028e y 68 % desde FY2030e; por
// debajo del 89 % de la NSE [D3], porque BSE paga más tecnología y contribución regulatoria por rupia de ingreso.
const margen = [67.0, 67.0, 67.5, 68.0, 68.0, 68.0, 68.0, 68.0];
const amort = [3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3, 3.3];
// Capex: 10,7 % de las ventas en FY2026 (centro de datos, motor de negociación, sede de la cámara), 5,2 % en FY2025 [A1] y 5,8 %
// en el primer semestre de FY2027 (1.727 M) [A15]; 170-190 bastidores nuevos de colocación y un solar en BKC [A17].
const capex = [6.0, 5.0, 4.5, 4.0, 4.0, 3.8, 3.6, 3.5];
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
  // Bono indio a 10 años del 7,38 % (FRED, oct-2026) [D4]; beta de 1,26 frente al Nifty 50 (60 meses) [D1]; prima de 5,5 %
  // (4,41 % implícita de Damodaran en noviembre [D6] más ≈ 1,1 por mercado emergente, sin doble prima país: el bono local ya
  // la lleva) y 1,0 punto adicional por la dependencia de un regulador (SEBI) y de un producto (opciones semanales). Sin deuda.
  wacc: { tasa_libre_pct: 7.38, beta: 1.26, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 8.5, tasa_impositiva_pct: 25.2, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 6.0, multiplo_salida: 20 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 23.0, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: 'FY2028e', volumen_pct: 9.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2029e', volumen_pct: 10.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2030e', volumen_pct: 9.0, precio_pct: 0.0, otros_pct: 2.0 },
    { periodo: 'FY2031e', volumen_pct: 8.0, precio_pct: 0.0, otros_pct: 2.0 },
  ],
  // Ingresos de las bolsas indias (NSE + MCX + BSE): ≈ 273.600 M INR en los doce meses a junio de 2026 [B3], creciendo un 12 %
  // anual (estimación propia, como el ahorro financiero de los hogares) durante cinco años: ≈ 482.000 M en FY2031e.
  mercado_final: { periodo: 'FY2031e', tamano: 482000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 5.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio. Resultado financiero recurrente = rendimiento de la caja PROPIA LIBRE + otros ingresos + asociadas (CDSL). En el
  // primer semestre de FY2027 fue 3.057 M (ingresos de inversiones 2.433 + otros 153 + asociadas 471) [A15], ≈ 7 % anual sobre una
  // caja propia media de ≈ 59.000 M (52.251 M en marzo, ≈ 66.000 M en septiembre). La caja crece con el flujo libre (≈ 30.000 M
  // al año) menos el dividendo; suponemos un 6,5 % de rendimiento: 6.000 M en FY2027e, 7.200 M en FY2028e y 8.800 M en
  // FY2029e, con asociadas de ≈ 1.000 M. Minoritarios: −80 M (las filiales de GIFT City pierden dinero; −30 M en el semestre
  // [A15]). Acciones: 411,98 M (las del BPA publicado, con las que están en suspenso; sin dilución) [A15].
  bpa: { fin_recurrente: { 'FY2027e': 6000, 'FY2028e': 7200, 'FY2029e': 8800 }, minoritarios: -80, acciones: 411.98 },
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
