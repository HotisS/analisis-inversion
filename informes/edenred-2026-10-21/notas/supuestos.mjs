// Supuestos del DCF, escenarios y BPA propio (Edenred, corte 2026-10-21, tras las ventas del 3T26).
// Dos motores: (1) ingresos operativos y margen EBITDA operativo; (2) float × rendimiento («other revenue»).
// Base 2025 real [A]: ingresos operativos 2.732 M, other revenue 229 M, EBITDA 1.360 M (operativo 1.131 M, 41,4 %).
const OP_2025 = 2732, OTRO_2025 = 229;

// crecimiento de ingresos operativos (%), margen EBITDA operativo (%), float medio / ingresos operativos (x), rendimiento (%)
export const modelo = [
  { periodo: '2026e', g_op: 0.3, m_op: 37.6, otro_fijo: 210 }, // 3T26: nueve meses 2.027 M (+0,6 % comparable) y un 4T de ≈ 710 M (Edenred Pay North America en equivalencia desde el 1-ago); guía EBITDA ≈ 1.220-1.260 M (−7/−10 % comparable), other revenue ≥ 210 M
  { periodo: '2027e', g_op: 5.5, m_op: 39.3, float_x: 1.62, rend: 4.3 }, // guía 2027: EBITDA +8/+12 % comparable; −1 pt por Edenred Pay North America
  { periodo: '2028e', g_op: 6.5, m_op: 40.3, float_x: 1.62, rend: 4.1 },
  { periodo: '2029e', g_op: 6.0, m_op: 40.8, float_x: 1.62, rend: 3.9 },
  { periodo: '2030e', g_op: 5.5, m_op: 41.0, float_x: 1.62, rend: 3.7 },
  { periodo: '2031e', g_op: 5.0, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2032e', g_op: 4.5, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2033e', g_op: 4.0, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2034e', g_op: 3.5, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2035e', g_op: 3.0, m_op: 41.0, float_x: 1.62, rend: 3.5 },
];

export function construir(modeloIn = modelo, { delta_rend = 0 } = {}) {
  let op = OP_2025, tot = OP_2025 + OTRO_2025;
  return modeloIn.map((m) => {
    const opN = op * (1 + m.g_op / 100);
    const otro = m.otro_fijo ?? opN * m.float_x * (m.rend + delta_rend) / 100;
    const totN = opN + otro;
    const ebitda = opN * m.m_op / 100 + otro;
    const fila = { periodo: m.periodo, op: opN, otro, total: totN, ebitda, g_tot: (totN / tot - 1) * 100, margen: ebitda / totN * 100 };
    op = opN; tot = totN;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const filas = construir();
// Amortización 9,0 % de las ventas en 2025 (incluye la del PPA de Reward Gateway); capex 6,7 % + arrendamientos 1,5 % (NIIF 16).
export const amort = [9.0, 8.8, 8.6, 8.4, 8.2, 8.0, 7.9, 7.8, 7.7, 7.7];
export const capex = [8.2, 8.1, 8.0, 7.9, 7.8, 7.8, 7.7, 7.7, 7.7, 7.7];
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_tot, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: -30.0, tasa_impositiva_pct: 33.0, fijo: i === 0,
}));
export const tabla_modelo = filas.map((f) => ({ periodo: f.periodo, ingresos_operativos: red(f.op, 0), other_revenue: red(f.otro, 0), ingresos: red(f.total, 0), ebitda: red(f.ebitda, 0), margen_pct: red(f.margen, 1), crec_pct: red(f.g_tot, 1) }));

export const wacc = { tasa_libre_pct: 3.48, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.8, coste_deuda_pct: 4.2, tasa_impositiva_pct: 33.0, peso_deuda_pct: 22 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [{ periodo: '2028e', crecimiento_pp: -6.0, margen_pp: -4.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 55, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 35 };

// BPA propio: EBITDA − amortización − otros ingresos y gastos (−37 M, media 2024-2025) + resultado financiero (−210 M, el de 2025)
// − impuestos 33 % − minoritarios 7,6 % del beneficio tras impuestos (43/564 en 2025) ÷ 232,7 M de acciones diluidas [D].
// Cuadre 2025: (1.094 − 46 − 210) × (1 − 0,327) − 43 = 521 M → 2,12 EUR con 246,2 M (publicado 2,12).
export const ACCIONES = 232.7;
export function bpa(caso) {
  const filasC = [];
  let tot = OP_2025 + OTRO_2025;
  const base = construir();
  base.forEach((f, i) => {
    const per = caso?.perfil?.find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    const totN = tot * (1 + (f.g_tot + dg) / 100);
    const ebitda = totN * (f.margen + dm) / 100;
    const ebit = ebitda - totN * amort[i] / 100;
    const bai = ebit - 37 - 210;
    const bdi = bai * 0.67;
    const neto = bdi * (1 - 0.076);
    filasC.push({ periodo: f.periodo, ventas: red(totN, 0), ebitda: red(ebitda, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACCIONES, 2) });
    tot = totN;
  });
  return filasC;
}

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  console.table(tabla_modelo);
  for (const c of casos) { console.log(c.escenario); console.table(bpa(c).slice(0, 4)); }
}
