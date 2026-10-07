// Supuestos del DCF y de los escenarios (Edenred, corte 2026-10-07).
// El DCF del motor proyecta ingresos totales y margen EBITDA. Aquí se construyen a partir de dos motores
// separados: (1) ingresos operativos y su margen EBITDA operativo; (2) el float (fondos de clientes) por su
// rendimiento («other revenue», que llega casi entero al EBITDA). Así el efecto de los tipos se ve aparte.

// Base 2025 real [A]: ingresos operativos 2.732 M, other revenue 229 M, EBITDA 1.360 M (operativo 1.131 M).
const OP_2025 = 2732, OTRO_2025 = 229;
// Parte del float que está en caja restringida (no se resta en la deuda neta de la empresa): 1.661 / 4.668 = 36 % a dic-25; 1.618 / 4.357 = 37 % a jun-26 [A1, A5].
// El resto (≈ 64 %) financia caja que el puente cuenta como caja libre: su rendimiento se saca del EBITDA del DCF para no contarlo dos veces.
export const RETENIDO = 1.0; // visión operativa (caso base): el float no es caja libre y todo su rendimiento se queda en el EBITDA. Con 0,36 se obtiene la variante «criterio de la empresa».

// Proyección: crecimiento de ingresos operativos (%), margen EBITDA operativo (%), float medio / ingresos operativos (x), rendimiento del float (%).
export const modelo = [
  { periodo: '2026e', g_op: 2.1, m_op: 37.5, float_x: null, rend: null, otro_fijo: 210 }, // guía: other revenue ≈ 210 M; EBITDA ≈ 1.255 M (centro-alto de 1.230-1.270)
  { periodo: '2027e', g_op: 6.0, m_op: 39.6, float_x: 1.62, rend: 4.3 },  // EBITDA +9,6 % (guía +8 % / +12 %)
  { periodo: '2028e', g_op: 7.0, m_op: 40.6, float_x: 1.62, rend: 4.0 },  // EBITDA +8,4 %
  { periodo: '2029e', g_op: 6.5, m_op: 41.0, float_x: 1.62, rend: 3.8 },
  { periodo: '2030e', g_op: 6.0, m_op: 41.0, float_x: 1.62, rend: 3.6 },
  { periodo: '2031e', g_op: 5.5, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2032e', g_op: 5.0, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2033e', g_op: 4.5, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2034e', g_op: 4.0, m_op: 41.0, float_x: 1.62, rend: 3.5 },
  { periodo: '2035e', g_op: 3.5, m_op: 41.0, float_x: 1.62, rend: 3.5 },
];

export function construir(modeloIn = modelo, { delta_rend = 0, retenido = RETENIDO } = {}) {
  let op = OP_2025, tot = OP_2025 + OTRO_2025;
  return modeloIn.map((m) => {
    const opN = op * (1 + m.g_op / 100);
    const otro = m.otro_fijo ?? opN * m.float_x * (m.rend + delta_rend) / 100;
    const totN = opN + otro;
    const ebitdaEmpresa = opN * m.m_op / 100 + otro;
    const ebitda = opN * m.m_op / 100 + otro * retenido;
    const fila = { periodo: m.periodo, op: opN, otro, total: totN, ebitda, ebitdaEmpresa, margenEmpresa: ebitdaEmpresa / totN * 100, g_tot: (totN / tot - 1) * 100, margen: ebitda / totN * 100 };
    op = opN; tot = totN;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
const filas = construir();
// Capex: 6-8 % de los ingresos totales según la empresa (6,7 % en 2025) + pagos de arrendamientos (1,5 %; NIIF 16).
// Amortización: 9,0 % en 2025 (incluye la del PPA de Reward Gateway, ≈ 1,5-2 puntos); converge al capex.
const amort = [8.8, 8.6, 8.4, 8.2, 8.0, 7.9, 7.8, 7.7, 7.7, 7.7];
const capex = [8.2, 8.0, 7.9, 7.8, 7.8, 7.7, 7.7, 7.7, 7.7, 7.7];
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_tot, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: -30.0, tasa_impositiva_pct: 33.0, fijo: i === 0,
}));
export const tabla_modelo = filas.map((f) => ({ periodo: f.periodo, ingresos_operativos: red(f.op, 0), other_revenue: red(f.otro, 0), ingresos: red(f.total, 0), ebitda_empresa: red(f.ebitdaEmpresa, 0), margen_empresa_pct: red(f.margenEmpresa, 1), ebitda_dcf: red(f.ebitda, 0), margen_dcf_pct: red(f.margen, 1), crec_pct: red(f.g_tot, 1) }));

export const wacc = { tasa_libre_pct: 4.0, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.8, coste_deuda_pct: 4.2, tasa_impositiva_pct: 33.0, peso_deuda_pct: 22 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null,
    perfil: [{ periodo: '2028e', crecimiento_pp: -6.0, margen_pp: -4.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 3.0, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 55, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 35 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(tabla_modelo); console.table(anios); }
