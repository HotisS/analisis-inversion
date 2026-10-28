// Supuestos numéricos del analista (ICE, corte 2026-10-28). Millones de USD; ejercicio natural; US GAAP.
// Ingresos = netos de gastos por transacción (cifra principal de ICE).
// EBITDA del DCF = sin costes de integración ni asuntos regulatorios (el motor los devuelve con no_recurrentes_en_ebitda).
// Amortización del DCF = solo la de inmovilizado y software propio (566 M en 2025, 5,7 % de las ventas): la de intangibles
//   adquiridos (993 M en 2025) no da escudo fiscal en caja (pasivo diferido de 4.064 M sobre 15.353 M de intangibles) [A1].
// 2026e (fijo): 1S26 +12,5 % [A6] y volumen medio diario del 3T26 +31 % [B21]; consenso de ingresos 11.077 M (+11,5 %) [P7].
//   Margen: guía de gastos ajustados de 4.190-4.230 M (incluyen la amortización propia) [A6] → resultado operativo ajustado
//   ≈ 6.860 M y EBITDA ajustado ≈ 67,5 % de las ventas.
// MarketAxess (cierre pendiente: HSR concedida el 21-oct, junta el 29-oct [P5, P6]) fuera de la proyección y del puente:
//   su EBIT (342 M en 2025) frente a ≈ 295 M de intereses de la deuda nueva mueve el BPA ajustado ±1 %.
const crec = [11.5, 5.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [67.5, 67.5, 67.8, 68.0, 68.0, 68.0, 68.0, 68.0, 68.0, 68.0];
const amort = [5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5, 5.5];
const capex = [7.7, 7.5, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0, 6.0];
const nwc = [4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 23.5, fijo: i === 0,
}));
// Tasa libre: Tesoro a 10 años del 27-oct-2026, 4,99 % [P3]. Beta 0,91 (ajustada, mensual 5 años frente al SPY) [P8].
// Coste de la deuda: 4,99 + 0,82 (diferencial del bono a 2036 de ago-26 [P2]) ≈ 5,8 %. Peso de la deuda a mercado ≈ 19 %.
export const wacc = { tasa_libre_pct: 4.99, beta: 0.91, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.8, tasa_impositiva_pct: 23.5, peso_deuda_pct: 19 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -7.0, margen_pp: -2.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 15, escenarios: 25 };

// BPA AJUSTADO (la base que publica ICE: sin amortización de intangibles adquiridos, integración ni asuntos regulatorios).
// BPA = (ventas × (margen EBITDA − amortización propia) + resultado financiero ajustado) × (1 − 25,1 %) − minoritarios, ÷ 563,4 M acciones.
// Cuadre 2025: 9.931 × (66,05 % − 5,71 %) = 5.992; − 583 = 5.409; × 74,9 % = 4.051; − 55 = 3.996 ÷ 575 = 6,95 (real 6,95) [A5].
// Resultado financiero ajustado: −680 M en 2026e (guía del 3T26: 175-180 M de gasto no operativo ajustado [A6]) y −640 M después
//   (sin la deuda de MarketAxess, que queda fuera con su EBIT). Minoritarios 60 M. Acciones: 563,4 M diluidas (10-Q 2T26), sin recompras.
const V25 = 9931, ACC = 563.4, T = 25.1, MIN = 60;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f) => {
    const per = (caso?.perfil ?? []).find((p) => p.periodo === f.periodo);
    const dg = f.fijo ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = f.fijo ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const fin = f.periodo === '2026e' ? -680 : -640;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + fin) * (1 - T / 100) - MIN;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); } }
