// Supuestos del DCF y de los escenarios (SAP, corte 2026-10-21, tras el 3T26). Millones de EUR; ejercicio natural.
// Base: 2025 real (ingresos 36.800 M; beneficio operativo IFRS 9.617 M; D&A 1.311 M; EBITDA 10.928 M, 29,7 %).
// 2026e: guía de ingresos totales a divisa constante similar a 2025 (+10,6 %) con −1,5 pp de divisa a tipos de junio → ≈ +8,5 % publicado
// (1S26: +8 %). Beneficio operativo no-IFRS de 11.800-12.200 M a divisa constante (−3,5 pp de divisa) menos ≈ 450 M de ajustes → IFRS ≈ 11.150 M;
// con ≈ 1.280 M de D&A, EBITDA ≈ 12.430 M (31,1 %).
// 2027e: la empresa espera que los ingresos aceleren y que los gastos operativos crezcan al 80-90 % del crecimiento de los ingresos.
// Capex: compras de inmovilizado (2,0 % de las ventas en 2025) + pagos de arrendamientos (0,8 %) por NIIF 16 → 2,8 %.
// Circulante: clientes − proveedores − pasivos de contrato (cobros anticipados de la nube) = −4,1 % de las ventas en 2025.

export const modelo = [
  //  periodo   crec  margen amort capex  nwc   tasa
  // 21-oct: 9M26 +9,6 % publicado y 3T26 +13 % (+12 % constante); nube y «nube y software» al alto de la guía [A14] → 2026e +10 %.
  ['2026e', 10.0, 31.5, 3.3, 2.8, -4.0, 28.5],
  ['2027e', 11.5, 32.5, 3.2, 2.8, -4.0, 28.5],
  ['2028e', 11.5, 33.5, 3.1, 2.8, -4.0, 28.5],
  ['2029e', 10.5, 34.5, 3.0, 2.8, -4.0, 28.5],
  ['2030e', 9.5, 35.5, 2.9, 2.8, -4.0, 28.5],
  ['2031e', 8.0, 36.0, 2.8, 2.8, -4.0, 28.5],
  ['2032e', 7.0, 36.0, 2.8, 2.8, -4.0, 28.5],
  ['2033e', 6.0, 36.0, 2.8, 2.8, -4.0, 28.5],
  ['2034e', 5.0, 36.0, 2.8, 2.8, -4.0, 28.5],
  ['2035e', 4.0, 36.0, 2.8, 2.8, -4.0, 28.5],
];

export const anios = modelo.map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct]) => ({
  periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false,
}));

// Tasa libre: Bund a 10 años (Bundesbank, Svensson, 21-oct-2026: 3,47 %) [D33]. Beta mensual a 5 años frente al DAX (1,16; ajustada 1,11).
export const wacc = { tasa_libre_pct: 3.47, beta: 1.10, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 28.5, peso_deuda_pct: 4.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 15.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: los agentes de IA permiten a los clientes sustituir parte del ERP por capas de datos y agentes de terceros (o cobrar por uso en vez de por usuario):
  // el backlog de nube frena al 10-12 % y las migraciones de ECC se alargan, como le pasó a Oracle en 2012-2017 con la nube (ingresos planos).
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la migración de ECC antes de 2027-2030 y la IA sobre los datos del ERP sostienen un backlog al 25 % y el margen converge al de Oracle/Microsoft.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 15, transacciones: 5, suma_partes: 0, escenarios: 25 };

// BPA por caso (objetivo a 12 meses), el método de la revisión del 13-oct: ventas × (margen EBITDA − amortización) × (1 − 28,5 %)
// − 40 M de minoritarios, resultado financiero 0 (caja y deuda casi se compensan), ÷ 1.152,3 M de acciones diluidas (30-sep, tras recomprar
// 8,93 M en el 3T, más ≈7 M de planes) [D30, A14].
const VENTAS_2025 = 36800, ACCIONES = 1152.3;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((f, i) => {
    const dg = i === 0 ? 0 : (caso?.ajuste_crecimiento_pp ?? 0);
    const dm = i === 0 ? 0 : (caso?.ajuste_margen_pp ?? 0);
    v = v * (1 + (f.crecimiento_pct + dg) / 100);
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = ebit * (1 - 0.285) - 40;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACCIONES, 2) };
  });
}
if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
