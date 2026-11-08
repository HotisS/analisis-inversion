// Supuestos del DCF y de los escenarios (Solaria, corte 2026-11-08). Millones de EUR; ejercicio natural.
// Base: 2025 real. Cifra de negocios 197,4 M (energía 123,3; servicios de infraestructura 74,1) [A1, A9].
// EBITDA publicado 266,1 M con 54,6 M de plusvalía de Generia (sin caja): recurrente 211,5 M = 107 % de la cifra de negocios,
//   porque la cuenta es por naturaleza y los «otros ingresos» (activaciones de obra 18,5 M; penalizaciones y seguros 18,6 M) no están en ventas [A].
// Base del DCF y del BPA: AJUSTADA (sin plusvalías por desconsolidar filiales ni reversiones de deterioro). Las rotaciones de activos
//   que la empresa mete en su guía (Gravyx 37,8 M en el 1S26) no se proyectan: son revalorizaciones sin caja fijadas por el socio.
// 2026e (fijo): 1S26 publicado: cifra de negocios 167,2 M (99,6 de infraestructura, hitos de «powered land» para centros de datos) y EBITDA 210,1 M
//   con 37,8 M de Gravyx [A6]. Guía de EBITDA 331 M (incluye rotación) → recurrente ≈ 293 M; cifra de negocios ≈ 316 M (+60 %).
// 2027e-2028e: capacidad de 3,06 GW (jun-26) a 3,6 GW a fin de 2026 (rebajada desde 4,3), baterías 1,2 GWh, 438 MW de centros de datos
//   contratados; precio capturado bajando (39 EUR/MWh en el 1S26 frente a 50 en el 1S25) y 35 % de producción sin PPA [A, D].
// Capex: 398 M en 2025 (202 % de las ventas) y 276 M en el 1S26 [A]. Baja con el fin del plan de construcción; al final, por encima de la amortización.
// Amortización: 24,5 % de las ventas en 2025; sube en euros con la base de activos (1.838 M de inmovilizado a dic-25).
// Circulante comercial negativo (clientes 89 − proveedores 142 = −53 M, −27 %): proveedores de obra; tiende a −5 % al bajar el capex.
// Impuestos: 19,2 % en 2025 y 18,8 % en el 1S26 (deducciones y bases negativas) [A, D]; hacia el 25 % legal a largo plazo.

export const modelo = [
  //  periodo   crec  margen amort  capex   nwc    tasa  fijo
  ['2026e', 60.0, 92.0, 19.6, 165.0, -20.0, 20.0, true],
  ['2027e', 20.0, 88.0, 21.5, 95.0, -15.0, 21.0, false],
  ['2028e', 16.0, 86.0, 22.0, 70.0, -10.0, 22.0, false],
  ['2029e', 9.0, 84.0, 22.5, 55.0, -8.0, 23.0, false],
  ['2030e', 7.0, 83.0, 23.0, 48.0, -6.0, 24.0, false],
  ['2031e', 5.0, 82.0, 23.0, 44.0, -5.0, 25.0, false],
  ['2032e', 4.0, 81.0, 23.0, 42.0, -5.0, 25.0, false],
  ['2033e', 3.0, 80.0, 23.0, 40.0, -5.0, 25.0, false],
  ['2034e', 2.5, 80.0, 23.0, 39.0, -5.0, 25.0, false],
  ['2035e', 2.0, 80.0, 23.0, 38.0, -5.0, 25.0, false],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo,
}));

// Tasa libre: Bund a 10 años del 6-nov-2026, 3,29 % (Bundesbank) [D23]. Beta 0,85: entre la sectorial de Damodaran reapalancada con la deuda de Solaria (0,71) [D25]
//   y la mensual a 5 años frente al IBEX con dividendos (1,00) [D1]; la semanal a 2 años (0,36) se descarta (cortos y volatilidad del 52 %).
// Prima adicional 1,0: 35 % de la producción a precio de mercado (canibalización solar) y riesgo de ejecución de los centros de datos.
// Deuda: coste medio del 3,9 % (84 % fija o cubierta, 91 % de proyecto) [D5]; peso a mercado del 42 % [D].
export const wacc = { tasa_libre_pct: 3.29, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 3.9, tasa_impositiva_pct: 25.0, peso_deuda_pct: 42.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 13.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: lo que ya pasó en 2024 y en el 1S26: el precio capturado cae (−22 % en el 1S26), la capacidad se queda corta otra vez y los centros de datos se retrasan.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -5.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el decreto de centros de datos sale tras las elecciones, se firman más MW de «powered land» y las baterías estabilizan el precio capturado.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 60, comparables: 10, transacciones: 5, suma_partes: 0, escenarios: 25 };

// BPA 2026e-2028e: (EBITDA − amortizaciones + resultado financiero) × (1 − impuestos) − minoritarios, ÷ 131,6 M de acciones (emitidas menos autocartera a 30-jun-2026) [D].
// Resultado financiero: −47,6 M en 2025; la deuda neta sube con el capex (1.329 M en jun-26 [D]): −55 / −65 / −72 M. Minoritarios ≈ 0 (Indarberri).
// Calibrado con 2025: 197,4 × 107,1 % − 48,4 − 47,6 = 115,4 × 80,8 % = 93,3 M → 0,75 EUR con 124,95 M de acciones (ajustado publicado: 137,4 − 54,6 × 0,75 = 96,5 M → 0,77).
const V25 = 197.4, ACC = 131.6;
const FIN = { '2026e': -55, '2027e': -65, '2028e': -72 };
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f) => {
    const per = (caso?.perfil ?? []).find((p) => p.periodo === f.periodo);
    const dg = f.fijo ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = f.fijo ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const ebitda = v * (f.margen_ebitda_pct + dm) / 100;
    const ebit = ebitda - v * f.amortizacion_pct_ventas / 100;
    const neto = (ebit + FIN[f.periodo]) * (1 - f.tasa_impositiva_pct / 100);
    return { periodo: f.periodo, ventas: red(v, 0), ebitda: red(ebitda, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); } }
