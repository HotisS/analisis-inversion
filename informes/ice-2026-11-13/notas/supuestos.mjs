// Supuestos numéricos del analista (ICE, corte 2026-11-13, tras el 3T26; iteración nueva sobre la del 9-nov). Millones de USD; ejercicio natural; US GAAP.
// Ingresos = netos de gastos por transacción (cifra principal de ICE).
// EBITDA del DCF = sin costes de integración ni asuntos regulatorios (el motor los devuelve con no_recurrentes_en_ebitda).
// Amortización del DCF = solo la de inmovilizado y software propio (566 M en 2025, 5,7 % de las ventas; 459 M en 9M26):
//   la de intangibles adquiridos (713 M en 9M26) no da escudo fiscal en caja (pasivo diferido de 4.133 M) [P16].
// 2026e (fijo): 9M26 8.408 M (+13,2 %) [P15] + consenso del 4T26 de 2.729 M [P7] = 11.137 M (+12,1 %).
//   Margen: gastos ajustados de 9M26 3.141 M + guía del 4T26 de 1.082-1.092 M = 4.228 M [P15] → resultado operativo
//   ajustado 6.909 M (62,0 %) + amortización propia ≈ 615 M (5,5 %) → EBITDA ajustado ≈ 67,6 %.
//   Inversión: guía de unos 1.050 M en 2026 (antes ~850 M) [P15] = 9,4 % de las ventas.
// MarketAxess (cierre previsto en el 1T27 [P15]) fuera de la proyección, del BPA y del puente (bonos de 3.704 M y su caja restringida fuera).
const crec = [12.1, 5.0, 6.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [67.6, 67.5, 67.8, 68.0, 68.0, 68.0, 68.0, 68.0, 68.0, 68.0];
const amort = [5.5, 5.6, 5.7, 5.8, 5.8, 5.8, 5.8, 5.8, 5.8, 5.8];
const capex = [9.4, 8.5, 7.8, 7.3, 7.0, 6.8, 6.6, 6.4, 6.2, 6.0];
const nwc = [4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8, 4.8];
export const anios = crec.map((c, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 23.5, fijo: i === 0,
}));
// Tasa libre: Tesoro a 10 años del 12-nov-2026, 5,10 % [P3] (4,86 % el 6-nov). Beta 0,89 (ajustada, mensual 5 años frente al SPY, hasta el 12-nov) [P8].
// Coste de la deuda: 5,10 + 0,82 (diferencial del bono a 2036 de ago-26 [P2]) ≈ 5,9 %. Peso de la deuda a mercado ≈ 16 %
//   (19.600 M de deuda sin la de MarketAxess frente a 99.762 M de capitalización: 177,86 × 560,9 M).
export const wacc = { tasa_libre_pct: 5.10, beta: 0.89, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 5.9, tasa_impositiva_pct: 23.5, peso_deuda_pct: 16 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -7.0, margen_pp: -2.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: 3.25, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 15, escenarios: 25 };

// BPA AJUSTADO (la base que publica ICE: sin amortización de intangibles adquiridos, integración, asuntos regulatorios,
// participadas ni revalorizaciones de inversiones).
// BPA = (ventas × (margen EBITDA − amortización propia) + resultado financiero ajustado) × (1 − 24,0 %) − minoritarios, ÷ acciones.
// Cuadre 9M26: resultado operativo ajustado 5.267 M − 545 M de gasto no operativo ajustado (−40 − 59 de participadas − 452 de
//   revalorizaciones + 6 de intereses previos a MarketAxess) = 4.722 M; beneficio ajustado 3.548 M + 52 de minoritarios = 3.600 M
//   → tipo del 23,8 %; 3.548 ÷ 566 M acciones = 6,27 USD (publicado 6,27) [P15].
// Resultado financiero ajustado: −725 M en 2026e (−545 M en 9M26 y guía de 175-185 M en el 4T26 [P15]) y −720 M después
//   (el ritmo del 4T26, sin la deuda de MarketAxess, que queda fuera con su EBIT). Minoritarios 70 M.
// Acciones: 2026e, 565 M de media (566 M en 9M26 y guía de 558-563 M en el 4T26 [P15]); 2027e y 2028e, 560,9 M diluidas
//   (558,86 M en circulación el 26-oct-2026 + 2 M de efecto dilutivo [P16]), sin recompras no anunciadas.
const V25 = 9931, T = 24.0, MIN = 70;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f) => {
    const per = (caso?.perfil ?? []).find((p) => p.periodo === f.periodo);
    const dg = f.fijo ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = f.fijo ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const fin = f.periodo === '2026e' ? -725 : -720;
    const acc = f.periodo === '2026e' ? 565 : 560.9;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + fin) * (1 - T / 100) - MIN;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / acc, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); } }
