// Supuestos del DCF y de los escenarios (Equifax, corte 2026-10-08).
// El motor proyecta ingresos y margen EBITDA del grupo. Aquí se separan dos líneas:
//  - el negocio propio (sin FICO), con su crecimiento y su margen EBITDA ajustado;
//  - la reventa de la puntuación hipotecaria de FICO, que desde 2026 entra en ingresos a margen casi nulo
//    (≈385 M en 2026 según la presentación de julio de 2026 [A21]).
// EBITDA del motor = EBITDA contable + no recurrentes = EBITDA ajustado de la empresa (1.936 M en 2025 frente a 1.935,3 publicado).

// Base 2025 real (M USD) [A4]: ingresos 6.074,5; EBITDA ajustado 1.935,3. FICO revendido en 2025: ≈175 M
// (ingresos 2025 sin FICO ≈ 6.360 / 1,078, punto medio del crecimiento sin FICO de la guía, 7,2-8,4 %).
export const BASE = { ingresos: 6074.5, fico: 175 };

// 2026e fijado por la guía de julio de 2026 [A21]: ingresos 6.745 M (punto medio), EBITDA ajustado 2.130 M, FICO ≈385 M.
// Desde 2027e: crecimiento del negocio sin FICO (%), margen EBITDA sin FICO (%) e importe de FICO revendido (M).
export const modelo = [
  { periodo: '2026e', ing: 6745, ebitda: 2130, fico: 385 },
  { periodo: '2027e', g: 7.0, m: 34.0, fico: 400 },
  { periodo: '2028e', g: 7.5, m: 34.5, fico: 360 },
  { periodo: '2029e', g: 7.5, m: 35.0, fico: 330 },
  { periodo: '2030e', g: 7.0, m: 35.3, fico: 340 },
  { periodo: '2031e', g: 6.5, m: 35.6, fico: 350 },
  { periodo: '2032e', g: 6.0, m: 35.8, fico: 360 },
  { periodo: '2033e', g: 5.0, m: 36.0, fico: 371 },
  { periodo: '2034e', g: 4.5, m: 36.0, fico: 382 },
  { periodo: '2035e', g: 4.0, m: 36.0, fico: 393 },
];
// Amortización total (incluye ≈245 M/año de intangibles de compras, que se agota) y capex en % de las ventas.
export const AMORT = [11.4, 10.9, 10.3, 9.7, 9.1, 8.5, 8.0, 7.6, 7.3, 7.0];
export const CAPEX = [7.5, 7.3, 7.2, 7.1, 7.0, 7.0, 7.0, 7.0, 7.0, 7.0];
export const NWC = 13.0;
export const TAX = [27.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0, 26.0];

export function construir(m = modelo) {
  let core = null, ingPrev = BASE.ingresos;
  return m.map((y, i) => {
    let ing, ebitda, coreIng, coreEbitda;
    if (y.ing != null) { ing = y.ing; ebitda = y.ebitda; coreIng = ing - y.fico; coreEbitda = ebitda; }
    else { coreIng = core * (1 + y.g / 100); coreEbitda = coreIng * y.m / 100; ing = coreIng + y.fico; ebitda = coreEbitda; }
    const fila = { periodo: y.periodo, core: coreIng, fico: y.fico, ingresos: ing, g_ing: (ing / ingPrev - 1) * 100, g_core: i === 0 ? (coreIng / (BASE.ingresos - BASE.fico) - 1) * 100 : y.g,
      ebitda, margen: ebitda / ing * 100, margen_core: coreEbitda / coreIng * 100 };
    core = coreIng; ingPrev = ing;
    return fila;
  });
}

const red = (x, d = 1) => Math.round(x * 10 ** d) / 10 ** d;
export const filas = construir();
export const anios = filas.map((f, i) => ({
  periodo: f.periodo, crecimiento_pct: red(f.g_ing, 2), margen_ebitda_pct: red(f.margen, 2),
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));
export const tabla = filas.map((f) => ({ periodo: f.periodo, core: red(f.core, 0), fico: f.fico, ing: red(f.ingresos, 0), g: red(f.g_ing, 1), g_core: red(f.g_core, 1), ebitda: red(f.ebitda, 0), m: red(f.margen, 1), m_core: red(f.margen_core, 1) }));

// WACC: Tesoro a 10 años 5,28 % (7-oct-2026) [D10]; beta 1,22 ajustada mensual 5 años frente al S&P 500 [D3];
// coste de la deuda 5,65 %: cupón del bono a 2033 emitido el 22-jul-2026 [C4]; peso de la deuda a mercado ≈24,4 %.
export const wacc = { tasa_libre_pct: 5.28, beta: 1.22, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.65, tasa_impositiva_pct: 26.0, peso_deuda_pct: 24.4 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 11.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: la FHFA aprueba el informe doble en 2027 y empuja hacia uno; Truv y Argyle y la presión de los estados
  // recortan precio en The Work Number. Como en 2022-2023 (crecimiento del 4 % y del 3 %, margen −1,1 puntos) [A3].
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -6.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el mercado hipotecario recupera la mitad de la distancia a 2015-2019 en 2027-2029 (la empresa calcula
  // ≈1.000-1.200 M de ingresos sin FICO para la recuperación completa) [A21, A22] y Medicaid acelera Gobierno desde 2027.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2028e', crecimiento_pp: 4.0, margen_pp: 1.5 }, { periodo: '2029e', crecimiento_pp: 3.0, margen_pp: 1.5 }] },
];

export const pesos = { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 10, escenarios: 30 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) { console.table(tabla); console.table(anios); }
