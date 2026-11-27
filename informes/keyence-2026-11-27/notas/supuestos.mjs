// Supuestos numéricos del analista (DCF, escenarios, pesos). Los textos van en propio.mjs.
// Ejercicio de Keyence: FY2026e = 21-mar-2026 a 20-mar-2027 (etiqueta por año de inicio). Corte 27-nov-2026.
// FY2026e casi cerrado: primer semestre publicado (+34,9 % de ventas, margen EBITDA del 56,8 %) y segundo semestre
// a ≈ +23 % (2T a +36,8 %, con el efecto divisa a la baja). Después, normalización sin divisa, corrección cíclica en
// FY2029e (calibrada con FY2019: −6,0 % y −3,4 puntos de margen) y convergencia en tres etapas.
const crec = [28.5, 10.0, 7.5, -5.0, 9.0, 8.5, 8.0, 7.0, 6.5, 6.0];
const margen = [56.5, 56.0, 55.5, 52.0, 54.0, 53.5, 53.5, 53.5, 53.5, 53.5];
const amort = [1.3, 1.5, 1.6, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8];
const capex = [2.0, 2.2, 2.0, 1.8, 2.0, 2.0, 2.0, 2.0, 2.0, 2.0];
const nwc = [38.5, 38.0, 38.0, 38.5, 38.0, 37.5, 37.5, 37.5, 37.5, 37.5];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 30.0, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 2.704, beta: 1.05, prima_mercado_pct: 5.14, prima_adicional_pct: 0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 30, peso_deuda_pct: 0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.2, multiplo_salida: 20 };
export const etapa2 = { usar: true, anios: 10, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.8, multiplo_salida: null,
    perfil: [{ periodo: 'FY2027e', crecimiento_pp: -19.0, margen_pp: -5.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: -0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };

// BPA propio para el objetivo a 12 meses: ventas × margen EBITDA − amortización + resultado financiero recurrente,
// × (1 − 30 %), ÷ 1.212,625 M de acciones (sin recompras: no hay ninguna anunciada).
// Resultado financiero recurrente: intereses del semestre × 2 (13.967 × 2 = 27.934) + asociadas (3.202 × 2 = 6.404) ≈ 34.300 M JPY,
// constante (la caja crece, pero los tipos a corto pueden bajar); las diferencias de cambio no se proyectan.
export const FIN = 34300, ACC = 1212.625, VENTAS_FY2025 = 1169289;
export function bpaPropio({ dc = 0, dm = 0, perfil = [] } = {}) {
  let v = VENTAS_FY2025; const out = {};
  anios.forEach((a, i) => {
    const p = perfil.find((x) => x.periodo === a.periodo);
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + (p ? p.crecimiento_pp : dc);
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + (p ? p.margen_pp : dm);
    v *= 1 + g / 100;
    const ebit = v * (m - a.amortizacion_pct_ventas) / 100;
    out[a.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), bn: Math.round((ebit + FIN) * 0.7), bpa: Math.round((ebit + FIN) * 0.7 / ACC * 100) / 100 };
  });
  return out;
}
