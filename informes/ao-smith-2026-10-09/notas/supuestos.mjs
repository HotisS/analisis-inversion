// Supuestos del DCF y de los escenarios (A. O. Smith, corte 2026-10-09).
// Base 2025 real [A]: ventas 3.830,2 M; EBITDA 813,1 M (21,2 %); amortizaciones 85,1 M (2,2 %); capex 70,8 M (1,8 %);
// circulante comercial 557,5 M (14,6 %); tipo efectivo 23,6 %.
// La reestructuración se repite (5 de los últimos 9 años): queda dentro del EBITDA, también en 2026e (≈20 M).

// 2026e (fijo): dos trimestres publicados (ventas −1,3 % en el 1S26, EBITDA 377,8 M = 19,4 % con 22,6 M de reestructuración) y
// guía de julio (ventas +2-3 %); el 2S necesita +5 % con Leonard Valve (≈16 M por trimestre) y precio. Tomamos +1,8 %
// (≈3.899 M, el extremo bajo de la guía y el consenso de 3.895) y un margen del 20,0 % (2S al 20,5 %, como el 2S25 sin China).
export const modelo = [
  { periodo: '2026e', g: 1.8, m: 20.0, am: 2.5, cx: 2.0, fijo: true },
  { periodo: '2027e', g: 3.5, m: 20.7, am: 2.5, cx: 2.1, fijo: false },
  { periodo: '2028e', g: 3.8, m: 20.9, am: 2.4, cx: 2.2, fijo: false },
  { periodo: '2029e', g: 4.0, m: 21.0, am: 2.4, cx: 2.3, fijo: false },
  { periodo: '2030e', g: 4.0, m: 21.0, am: 2.4, cx: 2.3, fijo: false },
  { periodo: '2031e', g: 3.5, m: 21.0, am: 2.3, cx: 2.4, fijo: false },
  { periodo: '2032e', g: 3.0, m: 21.0, am: 2.3, cx: 2.4, fijo: false },
];
export const NWC = 14.0;
export const TAX = 23.5;

export const anios = modelo.map((y) => ({
  periodo: y.periodo, crecimiento_pct: y.g, margen_ebitda_pct: y.m,
  amortizacion_pct_ventas: y.am, capex_pct_ventas: y.cx, nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX, fijo: y.fijo,
}));

// WACC: Tesoro a 10 años 5,28 % (7-oct-2026, FRED) [D13]; beta 1,03 mensual 5 años ajustada frente al S&P 500 [D1];
// prima 5,5 %; coste de la deuda 6,0 %: el préstamo a plazo cuesta 4,53 % pero es variable y vence en 2029; como coste a largo
// plazo se usa el Tesoro más ≈0,7 puntos (estimación propia para un emisor industrial sin rating con DN/EBITDA ≈0,6x).
export const wacc = { tasa_libre_pct: 5.28, beta: 1.03, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 23.5, peso_deuda_pct: 7.6 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.5 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: 2019-2020 otra vez (ventas −6 % y −3 %, margen EBITDA del 18 %) con China en pérdidas y el acero sin repercutir.
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -6.0, margen_pp: -2.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: la norma del DOE de 2029 sube el precio medio (bomba de calor) y la salida de China eleva el margen del grupo.
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2029e', crecimiento_pp: 3.0, margen_pp: 1.0 }, { periodo: '2030e', crecimiento_pp: 2.0, margen_pp: 1.0 }] },
];

export const pesos = { dcf: 40, comparables: 25, transacciones: 0, suma_partes: 10, escenarios: 25 };
