// Supuestos del DCF y de los escenarios (DSV, corte 2026-10-07).
// El motor proyecta ingresos y margen EBITDA. En un transitario los ingresos suben y bajan con las tarifas de flete
// (que se repercuten al cliente), así que aquí se modela lo que de verdad gana la empresa: el margen bruto
// (gross profit) y su conversión en EBIT (EBIT antes de partidas especiales / margen bruto). Los ingresos salen de
// dividir el margen bruto por un margen bruto sobre ventas normalizado (sin pico ni valle de fletes).
// EBITDA del DCF = EBIT antes de partidas especiales + amortizaciones − partidas especiales (costes de integración en caja).

// Base 2025 real [P3]: ingresos 247.331 M, margen bruto 66.859 M, EBIT antes de partidas especiales 19.611 M.
const GP_2025 = 66859, ING_2025 = 247331;

// Proyección: crecimiento del margen bruto (%), margen bruto sobre ventas (%), conversión (%), partidas especiales (M), amortización (% ventas).
export const modelo = [
  { periodo: '2026e', gp: 79500, gm: 26.7, conv: 30.5, esp: 0 },  // 1S26 39.180 + 2S ≈ 40.300; EBIT ≈ 24.250 (centro de la guía 23.500-25.500) [P1]
  { periodo: '2027e', g: 2.5, gm: 27.0, conv: 34.5, esp: 0 },      // +4.000 M de sinergias; fletes a la baja
  { periodo: '2028e', g: 4.0, gm: 27.0, conv: 37.0, esp: 0 },
  { periodo: '2029e', g: 4.0, gm: 27.0, conv: 39.0, esp: 0 },
  { periodo: '2030e', g: 4.0, gm: 27.0, conv: 40.5, esp: 0 },
  { periodo: '2031e', g: 3.5, gm: 27.0, conv: 41.0, esp: 0 },
  { periodo: '2032e', g: 3.5, gm: 27.0, conv: 41.0, esp: 0 },
  { periodo: '2033e', g: 3.0, gm: 27.0, conv: 41.0, esp: 0 },
  { periodo: '2034e', g: 3.0, gm: 27.0, conv: 41.0, esp: 0 },
  { periodo: '2035e', g: 2.5, gm: 27.0, conv: 41.0, esp: 0 },
];
export const AMORT = [3.6, 3.5, 3.5, 3.4, 3.4, 3.4, 3.4, 3.4, 3.4, 3.4];
export const CAPEX = [4.1, 4.1, 4.1, 4.0, 4.0, 3.9, 3.9, 3.9, 3.9, 3.9];
export const NWC = 8.5;
export const TAX = [28.0, 25.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0, 24.0];

export function construir(m = modelo, { conv_pp = 0, g_pp = 0 } = {}) {
  let gp = GP_2025, ing = ING_2025;
  return m.map((f, i) => {
    const gpN = f.gp ?? gp * (1 + (f.g + g_pp) / 100);
    const ingN = gpN / (f.gm / 100);
    const conv = f.conv + (i === 0 ? 0 : conv_pp);
    const ebit = gpN * conv / 100;
    const da = ingN * AMORT[i] / 100;
    const ebitda = ebit + da - f.esp;
    const fila = { periodo: f.periodo, gp: gpN, ing: ingN, ebit, ebitda_bsi: ebit + da, ebitda, margen: ebitda / ingN * 100, g_ing: (ingN / ing - 1) * 100, conv };
    gp = gpN; ing = ingN;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const filas = construir();
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_ing, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));
export const tabla = filas.map((f) => ({ periodo: f.periodo, margen_bruto: red(f.gp, 0), ingresos: red(f.ing, 0), conversion_pct: f.conv, ebit_aepe: red(f.ebit, 0), ebitda_aepe: red(f.ebitda_bsi, 0), ebitda_dcf: red(f.ebitda, 0), margen_dcf_pct: red(f.margen, 2), crec_ing_pct: red(f.g_ing, 1) }));

export const wacc = { tasa_libre_pct: 3.1, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 24.0, peso_deuda_pct: 26 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: -6.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 35 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(tabla); console.table(anios); }
