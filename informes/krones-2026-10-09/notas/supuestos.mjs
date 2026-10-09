// Supuestos del DCF y de los escenarios (Krones, corte 2026-10-09).
// Modelo de grupo: ingresos y margen EBITDA. Base 2025 real: ingresos 5.664 M, EBITDA 602 M (10,6 %).
// 2026e fijado por la guía (3-5 % a tipo constante, margen 10,7-11,1 %) y el 1S26 (-0,4 % reportado, +1,8 % a tipo constante).

const red = (x, d = 2) => Math.round(x * 10 ** d) / 10 ** d;

//                 crecimiento  margen EBITDA
const G = [1.8, 3.5, 4.0, 4.0, 3.5, 3.25, 3.0, 2.75, 2.5, 2.5];
const M = [10.9, 11.1, 11.3, 11.3, 11.2, 11.0, 10.9, 10.7, 10.6, 10.5];
// Amortización total (incluida la de derechos de uso) y capex con altas de derechos de uso (NIIF 16), en % de ventas.
const AMORT = [3.5, 3.5, 3.55, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6];
const CAPEX = [4.7, 4.4, 4.2, 4.0, 4.0, 3.9, 3.9, 3.9, 3.9, 3.9];
const NWC = 17.0;
const TAX = 29.5;

export const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: M[i],
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX, fijo: i === 0,
}));

export const wacc = { tasa_libre_pct: 3.57, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 29.5, peso_deuda_pct: 8.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 7.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: repetición de 2019-2020. Los embotelladores congelan la inversión en 2027: ventas −11,5 % (−16,1 % en 2020, −21,7 % en 2009),
  // margen EBITDA del 7,1 % (6,2 % sin reestructuración en 2020) y 2028 plano con margen del 8,3 %; después el margen se queda en torno al 9 %,
  // la media de 2016-2025, porque la competencia china y la de KHS se llevan la mejora de precios.
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.75, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -15.0, margen_pp: -4.0 }, { periodo: '2028e', crecimiento_pp: -4.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: Krones cumple el plan a 2028 (unos 7.000 M de ventas, margen EBITDA del 11-13 %) y lo mantiene.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: 5.5, margen_pp: 0.6 }, { periodo: '2028e', crecimiento_pp: 5.5, margen_pp: 0.9 }] },
];

export const pesos = { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 };

// Puente a 30-jun-2026 (semestral) [A]. Pendiente de la nota de cuentas.
export const puente = { fecha: '2026-06-30', deuda_financiera: 2.8, arrendamientos: 139.6, caja: 405.4, minoritarios: 0.4, pensiones: 115.6, asociadas: 6.6, otros_ajustes: 31.7 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) console.table(anios);
