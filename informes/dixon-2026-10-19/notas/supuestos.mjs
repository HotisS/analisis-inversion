// Supuestos numéricos del analista (Dixon, corte 2026-10-19). Cuentas consolidadas Ind AS en millones de INR.
// Base: FY2026 (488.728 M de ventas, EBITDA operativo de 18.665 M, 3,82 %; amortización 3.930 M, 0,80 %) [A1].
// FY2027e no es fijo: solo hay un trimestre publicado (1T FY27: ventas +21 %, margen operativo 3,0 %) [A5, A9].
// Ventas: FY2027e ≈ 560.000 M de la guía sin Vivo + ≈ 50.000 M de Vivo en el 2S [A13]; FY2028e con Vivo un año entero
// (≈ 230.000 M de los ≈ 300.000 M a pleno ritmo que da la empresa) y el resto +8 %; después, el mercado EMS indio
// (+25 % anual según KPMG) por debajo, bajando al 6,5 % en FY2034e [B2].
const crec = [24.8, 37.7, 15.0, 11.0, 9.0, 8.0, 7.0, 6.5];
// Margen EBITDA operativo: 3,2 % en FY2027e (3,0 % en el 1T sin PLI; 3,8 % en FY2026 con PLI), subiendo con los componentes
// (pantallas, cámaras) hasta el 3,7 %, por debajo del 3,9-4,2 % de FY2023-FY2025, que llevaban el PLI de móviles [A1, A14].
const margen = [3.2, 3.4, 3.6, 3.7, 3.7, 3.7, 3.7, 3.7];
const amort = [0.85, 0.9, 0.95, 1.0, 1.0, 1.0, 1.0, 1.0];
const capex = [2.2, 2.2, 2.0, 1.8, 1.6, 1.5, 1.4, 1.3];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25,
  fijo: false,
}));

const S = {
  anios,
  // Bono indio a 10 años del 7,06 % (FRED, sep-2026) [D4]; beta de 1,13 frente al Nifty 50 (60 meses) [D1]; prima de 5,5 %
  // y 1,0 punto adicional por la concentración de clientes y la dependencia de la política industrial. Deuda pequeña (3 %).
  wacc: { tasa_libre_pct: 7.06, beta: 1.13, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 8.5, tasa_impositiva_pct: 25, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 6.0, multiplo_salida: 15 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 4.0, precio_pct: 12.0, otros_pct: 8.8 },
    { periodo: 'FY2028e', volumen_pct: 6.0, precio_pct: 2.0, otros_pct: 29.7 },
    { periodo: 'FY2029e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 4.0 },
    { periodo: 'FY2030e', volumen_pct: 9.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: 'FY2031e', volumen_pct: 7.5, precio_pct: 1.0, otros_pct: 0.5 },
  ],
  // Mercado EMS de India en FY2030 (año que termina en marzo de 2030): más de 150.000 M USD según KPMG [B1, B2],
  // × 94,915 INR/USD (19-oct-2026) [D5] = 14.237.000 M INR.
  mercado_final: { periodo: 'FY2030e', tamano: 14237000 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 5.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de −1.000 M (FY2026: gastos financieros de 1.375 M, incluidos los intereses de
  // arrendamientos, frente a 203 M de otros ingresos recurrentes y 215 M de las JV; sin las plusvalías de Aditya) [A1];
  // minoritarios en % del beneficio: 19,5 % en FY2026 ajustado (2.050 de 10.500 M) [A10]; con Vivo (49 % del socio) sube
  // al 20,5 % en FY2027e y al 26 % desde FY2028e (estimación propia: 1.700 M del 49 % de Vivo sobre ≈ 15.000 M);
  // acciones: 61,74 M diluidas hoy (61,17 M emitidas + 0,57 M de opciones) [C2] más un 0,5 % anual de opciones.
  bpa: { fin_recurrente: -1000, minoritarios_pct: { 'FY2027e': 20.5, 'FY2028e': 26, 'FY2029e': 26 }, acciones: { 'FY2027e': 61.9, 'FY2028e': 62.2, 'FY2029e': 62.5 } },
};
export default S;

const VENTAS_FY2026 = 488728;
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
    const bai = ebit + S.bpa.fin_recurrente;
    const tras = bai * (1 - a.tasa_impositiva_pct / 100);
    const minor = tras * S.bpa.minoritarios_pct[a.periodo] / 100;
    const neto = tras - minor;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, minoritarios: minor, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
