// Supuestos del DCF y de los escenarios (Rovi, corte 2026-10-27). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos operativos 743,5 M; EBITDA 216,2 M con 12,6 M de la ayuda LAISOLID del CDTI).
// 2026e: 1S26 publicado (ingresos 344,2 M, +9,4 %; EBITDA sin el badwill de Phoenix 58,8 M, −10 %). Guía: crecimiento de ingresos del 0-10 % [A].
//   Consenso 774,1 M y EBITDA 197,6 M (25,5 %) [D]. El badwill de 62,4 M no es caja ni se repite: fuera del EBITDA del DCF.
// 2027e: sale Neparvis (contrato de distribución terminado el 16-oct-2026; 56,7 M de ventas en 2025) [B];
//   entran un año entero de Phoenix (mínimo 50 M USD al año de BMS), Roche y, si se autoriza, las jeringas de la farmacéutica global [A, B].
// Capex: 9,1 % de las ventas en 2025 (67,8 M; 21,6 de mantenimiento) [A]; baja hacia el 5 % cuando la capacidad se llene.
// Amortización: 4,1 % en 2025 y ≈ 4,4 % en el LTM con Phoenix [A]. Circulante comercial: 46,7 % en 2025 y 43,8 % en 2024 (heparina en existencias).
// Impuestos: 23,4 % en 2025 y 23,0 % en 2024 [A].

export const modelo = [
  //  periodo   crec  margen amort capex  nwc   tasa  fijo
  ['2026e', 4.5, 25.5, 4.4, 9.0, 45.0, 23.5, true],
  ['2027e', 10.0, 28.0, 4.4, 8.5, 44.5, 23.5, false],
  ['2028e', 9.0, 29.5, 4.5, 8.0, 44.0, 23.5, false],
  ['2029e', 8.0, 30.0, 4.6, 7.5, 43.5, 23.5, false],
  ['2030e', 7.0, 30.0, 4.7, 7.0, 43.0, 23.5, false],
  ['2031e', 6.0, 30.0, 4.8, 6.5, 42.5, 23.5, false],
  ['2032e', 5.0, 30.0, 4.8, 6.0, 42.0, 23.5, false],
  ['2033e', 4.5, 30.0, 4.9, 5.7, 42.0, 23.5, false],
  ['2034e', 4.0, 30.0, 4.9, 5.5, 42.0, 23.5, false],
  ['2035e', 3.5, 30.0, 5.0, 5.4, 42.0, 23.5, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 26-oct-2026 (3,43 %) [D]. Beta 0,78: la semanal a 2 años (0,67) ajustada a la Blume; la mensual a 5 años (0,26) está deformada por el ciclo de la vacuna.
// Prima adicional 0,5 por tamaño y concentración de clientes en la CDMO. Deuda: préstamos del BEI y bancarios al 0,7-3,0 % [D]; peso a mercado ≈ 3,3 %.
export const wacc = { tasa_libre_pct: 3.43, beta: 0.78, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.0, tasa_impositiva_pct: 23.5, peso_deuda_pct: 3.3 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12.8 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: lo que ya pasó en 2024-2025: el contrato de jeringas no arranca (o se queda pequeño), Moderna sigue bajando y la heparina pierde precio; la CDMO no llena la capacidad.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: se cumple el plan de 2030 (CDMO de ≈ 700 M e ingresos de 1,5 veces los de 2024): jeringas en 2027, Roche y BMS en marcha, Okedi hacia 100 M.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 };

// BPA de 2026e-2028e: (EBITDA − amortizaciones + resultado financiero) × (1 − impuestos) − minoritarios, ÷ 51,143 M de acciones (emitidas menos autocartera a 30-jun-2026) [D].
// Resultado financiero recurrente −3 M (−2,6 M en 2025; 2026 con −4 M por los intereses de demora de la inspección). Minoritarios ≈ 0.
// Calibrado con 2025: 743,5 × 29,08 % − 30,4 − 2,6 = 183,2 × 76,6 % = 140,4 M → 2,75 EUR (real 2,75). Sin el badwill de Phoenix (base ajustada).
const V25 = 743.5, ACC = 51.143;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f, i) => {
    const per = (caso?.perfil ?? []).find((p) => p.periodo === f.periodo);
    const dg = f.fijo ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = f.fijo ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const fin = f.periodo === '2026e' ? -4 : -3;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + fin) * (1 - f.tasa_impositiva_pct / 100);
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); } }
