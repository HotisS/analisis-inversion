// Supuestos numéricos del analista (Takasago Thermal Engineering, 1969.T, corte 2026-10-19). Millones de JPY, J-GAAP.
// Ejercicio japonés a marzo, etiqueta por el año en que EMPIEZA: FY2025 = abril 2025 - marzo 2026 (la de la empresa).
// Base: FY2025 real (ventas 423.923 M; EBITDA = beneficio de explotación 47.745 + amortización 3.444 + fondo de comercio 314 = 51.503 M, 12,1 %) [A1].
const crec = [3.8, 8.0, 6.0, 4.5, 3.5, 2.5, 2.0];
const margen = [12.4, 12.8, 13.0, 12.7, 12.3, 12.0, 11.7];
const amort = [0.95, 1.0, 1.0, 1.0, 1.05, 1.05, 1.1];
const capex = [1.3, 1.3, 1.25, 1.2, 1.2, 1.15, 1.15];
export const anios = crec.map((g, i) => ({
  periodo: `FY${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 32.5,
  tasa_impositiva_pct: 30.5,
  fijo: false,
}));

const S = {
  anios,
  // Bono japonés a 10 años del 16-oct-2026 (último publicado por el Ministerio de Hacienda al corte): 2,958 % [P1].
  // Beta 1,05: mensual de 5 años ajustada (bruta 1,08; semanal 2 años 0,95) frente al ETF del TOPIX [D1]. Coste de la deuda 1,0 %
  // (intereses 423 M / deuda media 40.000 M en FY2025 [A1]). Peso de la deuda 7 % (40.593 / (548.000 + 40.593)).
  wacc: { tasa_libre_pct: 2.958, beta: 1.05, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 1.0, tasa_impositiva_pct: 30.5, peso_deuda_pct: 7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 9.5 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: 1.3, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2027e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: 'FY2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0.0 },
  ],
  // Mercado: obras de instalaciones de climatización y fontanería (管工事業) en Japón, 10.315.700 M JPY en el ejercicio fiscal 2024
  // (estadística de obras del MLIT, vía CREX [B3]); +3 % anual hasta FY2032e = 10.315.700 × 1,03^8 ≈ 13.068.000 M.
  mercado_final: { periodo: 'FY2032e', tamano: 13068000 },
  casos: [
    // Bajista: la caída del ciclo de capex de semiconductores y el margen vuelve a medio camino de su media de 5 años (FY2022: 4,5 % de explotación).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null,
      perfil: [{ periodo: 'FY2027e', crecimiento_pp: -10.0, margen_pp: -2.5 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 20 },
  // BPA propio: resultado no operativo recurrente (dividendos de la cartera de acciones, participadas, alquileres, intereses netos:
  // +2.897 M en FY2025 [A1]) más las plusvalías de venta de acciones de cartera que la empresa realiza todos los años (799-2.712 M
  // en FY2024-FY2025; plan de vender 20.000 M en el plan a medio plazo [A2]); impuesto del 29 % sobre el BAI (28,0 % en FY2025);
  // minoritarios 600 M; 130,89 M de acciones a 30-jun-2026 (sin la autocartera) y sin suponer recompras no anunciadas [A5].
  bpa: {
    no_operativo: { 'FY2026e': 2600, 'FY2027e': 2500, 'FY2028e': 2400 },
    plusvalias_cartera: { 'FY2026e': 2000, 'FY2027e': 1500, 'FY2028e': 1200 },
    tasa: 29, minoritarios: 600, acciones: 130.89,
  },
};
export default S;

const VENTAS_FY2025 = 423923;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const p = (c.perfil || []).find((x) => x.periodo === a.periodo);
    const k = a.fijo ? 0 : 1;
    const dg = p ? p.crecimiento_pp : c.ajuste_crecimiento_pp;
    const dm = p ? p.margen_pp : c.ajuste_margen_pp;
    v = v * (1 + (a.crecimiento_pct + k * dg) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * dm) / 100;
    const ebit = ebitda - v * a.amortizacion_pct_ventas / 100;
    const bai = ebit + S.bpa.no_operativo[a.periodo] + S.bpa.plusvalias_cartera[a.periodo];
    const neto = bai * (1 - S.bpa.tasa / 100) - S.bpa.minoritarios;
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, bpa: neto / S.bpa.acciones };
  }
  return r;
}
