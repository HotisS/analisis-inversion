// Supuestos numéricos (Texas Instruments, corte 2026-10-21, tras el 3T26). Base: 2025 real del 10-K (17.682 M USD) [A].
// 2026e fijo con la guía del 4T26: 6.441 M en nueve meses más 6.050 M del punto medio = ≈22.393 M (+26,6 %) y BPA ≈9,06 USD [A, D].
// 2027e +10 % (consenso +14,6 %) por la cautela de ciclo; 2028e +6 %; después el mercado analógico (≈6 %) bajando al 3,5 %.
const crec = [26.6, 10.0, 6.0, 6.0, 6.0, 5.0, 5.0, 4.0, 4.0, 3.5];
// Margen EBITDA GAAP: 44,9 % en 2025, 51,3 % en los últimos 12 meses y 55,2 % en el pico de 2022 [A]; las fábricas de 300 mm se llenan.
const margen = [53.5, 55.0, 56.0, 56.0, 56.0, 55.5, 55.5, 55.0, 55.0, 55.0];
// Amortización 10,8 % de las ventas en 2025 por las fábricas nuevas [A]; baja con las ventas hasta el nivel del capex de mantenimiento.
const amort = [9.4, 9.0, 8.7, 8.4, 8.0, 7.8, 7.5, 7.5, 7.5, 7.5];
// Capex: guía de 2.000-3.000 M en 2026 (1.653 M en nueve meses) [A]; 8 % en 2027e y el 7,5 % de mantenimiento después.
const capex = [10.0, 8.0, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5, 7.5];
// Impuestos: 12,4 % efectivo en 2025 con el crédito fiscal a la inversión del 35 % [A, B]; 13 % en 2026e y 14 % después.
const tax = [13, 14, 14, 14, 14, 14, 14, 14, 14, 14];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: [33, 32, 31, 30, 30, 30, 30, 30, 30, 30][i], tasa_impositiva_pct: tax[i], fijo: i === 0,
}));
// WACC: Tesoro a 10 años 5,13 % (21-oct) [D9]; beta 1,27 (mensual ajustada a 5 años frente al SPY; bruta 1,41, semanal a 2 años 1,26) [D];
// deuda 13.555 M al ≈4,2 % (≈5 % del valor) [D].
export const wacc = { tasa_libre_pct: 5.13, beta: 1.27, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.2, tasa_impositiva_pct: 14, peso_deuda_pct: 5 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 20.0, precio_pct: 4.0, otros_pct: 2.6 },
  { periodo: '2027e', volumen_pct: 8.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 5.0, precio_pct: 1.0, otros_pct: 0 },
];
// Mercado analógico de WSTS: 86.519 M USD en 2025 [B]; al 6 % anual, ≈155.000 M en 2035 (estimación propia). Las ventas de TI
// incluyen procesado embebido (≈17 %), así que la «cuota» del motor sobrestima la de analógico (16,2 % en 2025 [B]).
export const mercado_final = { periodo: '2035e', tamano: 155000 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
    // El rebote de 2026 era en parte reposición de inventario: 2027e −4 % de ventas y 6 puntos menos de margen; 2028e +1 % y −5 puntos.
    perfil: [{ periodo: '2027e', crecimiento_pp: -14, margen_pp: -6 }, { periodo: '2028e', crecimiento_pp: -5, margen_pp: -5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };

// BPA diluido GAAP (TI no publica ajustado): (EBIT + resultado financiero) × (1 − impuestos) ÷ 921 M de acciones diluidas del 3T26 [D].
// Resultado financiero: −313 M en 2025 [A]; −300 M en 2026e y −320 M después, sin la deuda de Silicon Labs (no cerrada).
// Control: 2026e da 9,05 USD frente a ≈9,06 de la guía [D].
const V25 = 17682, ACC = 921, FIN = [-300, -320, -320];
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f, i) => {
    const per = caso?.perfil?.find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + FIN[i]) * (1 - f.tasa_impositiva_pct / 100);
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}
export default { anios, wacc, terminal, etapa2, puente_ingresos, mercado_final, casos, pesos };
if (process.argv[1]?.endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
