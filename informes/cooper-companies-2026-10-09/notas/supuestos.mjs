// Supuestos del DCF y de los escenarios (Cooper Companies, corte 2026-10-09).
// EBITDA del motor = EBITDA contable + no recurrentes (litigio de fertilidad, salidas de línea de producto, revisión estratégica) [A].
// Es unos 2,3 puntos de ventas inferior al EBITDA non-GAAP de la empresa y del consenso, que además excluye integración,
// regulación europea (MDR) y reorganización, partidas que se repiten todos los años.

// FY2026e fijado por la guía del 9-sep-2026: ventas 4.229-4.252 M (punto medio 4.240,5 M, +3,6 % sobre 4.092,4 M) [D3].
// Margen: consenso de EBITDA non-GAAP 1.323 M [D9] menos 2,3 puntos de ventas = ≈1.226 M (28,9 %).
const G = [3.62, 3.5, 4.0, 4.5, 4.5, 4.2, 3.8, 3.5, 3.2, 3.0];
const M = [28.9, 29.2, 29.7, 30.2, 30.6, 30.9, 31.1, 31.3, 31.5, 31.5];
// Amortización total: la de intangibles adquiridos (199 M en FY2025, 4,9 % de ventas) se va agotando [A].
const AMORT = [9.0, 8.8, 8.5, 8.2, 7.9, 7.6, 7.4, 7.2, 7.0, 7.0];
const CAPEX = [8.0, 7.8, 7.6, 7.4, 7.2, 7.0, 7.0, 7.0, 7.0, 7.0];
const NWC = 33.0;
// Tipo efectivo de caja: el non-GAAP fue ≈13-15 % en FY2025-3T26 por el traspaso de la PI al Reino Unido; subimos al 18-19 %
// porque se aplica sobre un EBIT que ya resta la amortización de intangibles y por el impuesto mínimo global.
const TAX = [18, 18, 18.5, 18.5, 19, 19, 19, 19, 19, 19];

export const anios = G.map((g, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: M[i], amortizacion_pct_ventas: AMORT[i],
  capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX[i], fijo: i === 0,
}));

// WACC: Tesoro a 10 años 5,28 % (7-oct-2026, último dato de FRED) [D13]; beta 0,89 ajustada mensual 5 años frente al S&P 500 [D1];
// deuda 6,4 % antes de impuestos (estimación: SOFR + diferencial de los préstamos) [D]; peso de la deuda a mercado ≈20 %.
export const wacc = { tasa_libre_pct: 5.28, beta: 0.89, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.4, tasa_impositiva_pct: 21, peso_deuda_pct: 20 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.5 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: 'FY2027e', crecimiento_pp: -3.5, margen_pp: -2.5 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 40, comparables: 15, transacciones: 0, suma_partes: 15, escenarios: 30 };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) console.table(anios);
