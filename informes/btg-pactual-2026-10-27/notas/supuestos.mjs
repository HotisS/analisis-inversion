// Supuestos del «DCF» de BTG Pactual (corte 2026-10-27), ADAPTADO A UN BANCO. Millones de BRL; ejercicio natural.
// El motor valora flujos libres para toda la empresa (FCFF), y en un banco no hay «deuda» separable de la operación: los
// depósitos y las emisiones son la materia prima. Se adapta así (ver valoracion-banco.md):
//   · «ingresos» = ingresos totales ajustados; «EBITDA» = beneficio antes de impuestos ajustado (margen 62,5 %); amortización 0;
//     impuestos del 21,5 % (tipo efectivo de 2025-1S26, con el escudo de los JCP). Así EBIT × (1 − t) = lucro líquido ajustado.
//   · «capex» = beneficio RETENIDO que el banco necesita para que crezca su patrimonio (y su capital regulatorio): (1 − payout)
//     × beneficio. Circulante 0. Así el «FCFF» = beneficio − retención = dividendos + JCP: el DCF es un modelo de dividendos.
//   · Puente de deuda en cero y peso de la deuda 0 %: el WACC es el coste del capital propio (Ke).
// El beneficio de cada año sale del modelo de exceso de rentabilidad (banco-ri.mjs): ROE sobre el valor contable del año,
// payout y crecimiento del patrimonio. Por eso el DCF y el modelo de exceso de rentabilidad dan casi lo mismo.
import { ri, BASE, UNITS, RF_HOY, BETA, PRIMA, G } from './banco-ri.mjs';

export const MARGEN = 62.5, TIPO = 21.5;
export const K = (MARGEN / 100) * (1 - TIPO / 100); // beneficio neto ÷ «ingresos» = 0,490625
const ING25 = 33039.3, BN1S26 = 9950.5; // ingresos ajustados 2025 y lucro ajustado del 1S26 [A1, A2]
const r2 = (x) => Math.round(x * 100) / 100;

// Beneficio neto anual del modelo de exceso de rentabilidad: 2026e = 1S26 real + 2H26 del modelo.
export function beneficios(dRoe = 0) {
  const f = ri({ dRoe }).filas;
  return f.map((x, i) => (i === 0 ? BN1S26 : 0) + x.bpa * UNITS);
}
const bn = beneficios(0);
const payout = BASE.payout;
const g = bn.map((x, i) => r2(((i === 0 ? x / K / ING25 : x / bn[i - 1]) - 1) * 100));

export const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: MARGEN, amortizacion_pct_ventas: 0,
  capex_pct_ventas: r2((1 - payout[i] / 100) * K * 100), nwc_pct_ventas: 0, tasa_impositiva_pct: TIPO, fijo: i === 0,
}));

// Escenarios: el mismo ROE −4 puntos (bajista) y +2 puntos (alcista) del modelo de exceso de rentabilidad, con el mismo payout.
// Se pasan como «perfil» año a año: el crecimiento cambia lo justo para que el beneficio (y la retención) sean los del
// escenario, con el margen igual.
function perfil(dRoe) {
  const s = beneficios(dRoe);
  return s.map((x, i) => {
    const gs = ((i === 0 ? x / K / ING25 : x / s[i - 1]) - 1) * 100;
    return { periodo: `${2026 + i}e`, crecimiento_pp: r2(gs - g[i]), margen_pp: 0 };
  });
}

// Puente: volumen = crecimiento del valor contable medio por unit; precio = cambio del ROE sobre él; otros = el resto
// (en 2026e, el paso del margen real de 2025, 64,6 %, al 62,5 % normal del modelo y la entrada de Banco Pan al 100 %).
function puente() {
  const f = ri().filas;
  // valor contable medio de cada año: 2026 = (fin 2025 + fin 2026); después, (inicio + fin)
  const vMed = [(18.1 + f[1].vc_inicio) / 2, (f[1].vc_inicio + f[2].vc_inicio) / 2, (f[2].vc_inicio + f[3].vc_inicio) / 2, (f[3].vc_inicio + f[4].vc_inicio) / 2, (f[4].vc_inicio + f[5].vc_inicio) / 2];
  const vPrev = (15.1 + 18.1) / 2;
  const bpa = bn.map((x) => x / UNITS);
  const roe = vMed.map((v, i) => bpa[i] / v);
  const roePrev = 4.32 / vPrev;
  return vMed.map((v, i) => {
    const vol = r2(((v / (i ? vMed[i - 1] : vPrev)) - 1) * 100);
    const pre = r2(((roe[i] / (i ? roe[i - 1] : roePrev)) - 1) * 100);
    return { periodo: `${2026 + i}e`, volumen_pct: vol, precio_pct: pre, otros_pct: r2(g[i] - vol - pre) };
  });
}

export default {
  anios,
  wacc: { tasa_libre_pct: RF_HOY, beta: BETA, prima_mercado_pct: PRIMA, prima_adicional_pct: 0, coste_deuda_pct: 0, tasa_impositiva_pct: TIPO, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: G, multiplo_salida: null },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: perfil(-4) },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: perfil(2) },
  ],
  pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 50 },
  // Puente de ingresos: en un banco no hay «volumen × precio» de un producto. Volumen = crecimiento del patrimonio (que es lo
  // que deja crecer el balance con el capital regulatorio); precio = cambio del ROE; otros = el resto (Banco Pan en 2026e).
  puente_ingresos: puente(),
  mercado_final: null,
};
