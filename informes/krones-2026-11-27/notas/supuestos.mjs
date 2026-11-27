// Supuestos del DCF y de los escenarios (Krones, corte 2026-11-27).
// Base 2025 real: ingresos 5.664 M, EBITDA 602 M (10,6 %). 2026e fijado por la guía rebajada del 22-oct (ventas +1-2 %
// sin divisas; 9M +0,8 % sin divisas y −0,2 % reportado, con unos 40 M de efecto divisa) y por el margen de 9M (11,1 %).
// 2027e «crecimiento ligero» (primer ejecutivo, 6-nov) y 2028e en el suelo del objetivo nuevo (6.000-6.200 M, 11-12 %).

//                 crecimiento  margen EBITDA
const G = [0.6, 2.0, 3.5, 3.5, 3.25, 3.0, 2.75, 2.5, 2.5, 2.5];
const M = [11.0, 11.0, 11.3, 11.3, 11.2, 11.0, 10.9, 10.7, 10.6, 10.5];
// Amortización total (incluida la de derechos de uso) y capex con altas de derechos de uso (NIIF 16), en % de ventas.
const AMORT = [3.5, 3.5, 3.55, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6, 3.6];
const CAPEX = [4.7, 4.4, 4.2, 4.0, 4.0, 3.9, 3.9, 3.9, 3.9, 3.9];
const NWC = 17.5;
const TAX = 29.5;

export const anios = G.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: M[i],
  amortizacion_pct_ventas: AMORT[i], capex_pct_ventas: CAPEX[i], nwc_pct_ventas: NWC, tasa_impositiva_pct: TAX, fijo: i === 0,
}));

export const wacc = { tasa_libre_pct: 3.32, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 29.5, peso_deuda_pct: 8.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 7.0 };
export const etapa2 = { usar: false, anios: 10, margen_final_pct: null };

export const casos = [
  // Bajista: repetición de 2019-2020 un año después del aviso. Ventas de 2027 −13 % y margen del 7,0 %; 2028 casi plano con margen del 8,3 %.
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.75, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -15.0, margen_pp: -4.0 }, { periodo: '2028e', crecimiento_pp: -4.0, margen_pp: -3.0 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  // Alcista: el techo del objetivo nuevo (≈ 6.250 M y 12 % de margen en 2028) y algo de crecimiento después.
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: 2.0, margen_pp: 0.4 }, { periodo: '2028e', crecimiento_pp: 2.0, margen_pp: 0.7 }] },
];

export const pesos = { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 };

// BPA propio por escenario con la misma fórmula que el DCF: ventas × margen − amortización + resultado financiero
// recurrente (+3 M: 2,4 M en 9M26 y 7,1 M en 2025) − impuestos (29,5 %) − minoritarios (0,3 M), ÷ 31,593 M de acciones.
// Cuadre con 2025: (602,3 − 185,3 + 7,1) × (1 − 0,295) − 0,5 = 298,6 M ÷ 31,593 = 9,45 EUR (publicado 9,45).
const ACC = 31.593072, FIN = 3, MIN = 0.3;
export function bpaEscenario(caso, hasta = '2028e') {
  let v = 5663.8; const out = {};
  for (const a of anios) {
    const p = caso.perfil?.find((x) => x.periodo === a.periodo);
    const dg = a.fijo ? 0 : p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp;
    const dm = a.fijo ? 0 : p ? p.margen_pp : caso.ajuste_margen_pp;
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const ebit = v * (a.margen_ebitda_pct + dm) / 100 - v * a.amortizacion_pct_ventas / 100;
    const bn = (ebit + FIN) * (1 - a.tasa_impositiva_pct / 100) - MIN;
    out[a.periodo] = { ventas: v, margen: a.margen_ebitda_pct + dm, bpa: bn / ACC };
    if (a.periodo === hasta) break;
  }
  return out;
}

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) {
  for (const c of casos) { const o = bpaEscenario(c); console.log(c.escenario, Object.entries(o).map(([k, x]) => `${k}: ${x.ventas.toFixed(0)} M, ${x.margen.toFixed(1)} %, BPA ${x.bpa.toFixed(2)}`).join(' · ')); }
}
