// Supuestos numéricos del analista (Hammond Power Solutions, TSX HPS.A, corte 2026-10-19). Cuentas en millones de CAD (NIIF).
// Base: 2025 (898,3 M de ventas; EBITDA publicado de 124,7 M, el 13,9 %, con el pago en acciones liquidado en caja dentro) [A1].
// Margen EBITDA del DCF: neto de un pago en acciones «normal» del 1 % de las ventas (el exceso por la revalorización de la acción no se proyecta).
// 2026e fijo: 1S26 publicado (589,6 M) + 2S26 de HPS (≈ 650 M, ritmo del 2T26) + medio año de AEG (cerrada el 29-jun; ≈ 165 M) ≈ 1.400 M [A6, A12].
const crec = [55.9, 22.9, 10.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.5, 3.0];
const margen = [14.5, 14.7, 14.5, 14.2, 14.0, 13.8, 13.6, 13.5, 13.5, 13.5];
const amort = [2.7, 2.9, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const capex = [3.3, 4.6, 3.8, 3.5, 3.4, 3.3, 3.3, 3.3, 3.3, 3.3];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 22,
  tasa_impositiva_pct: 26,
  fijo: i === 0,
}));

const S = {
  anios,
  wacc: { tasa_libre_pct: 3.83, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 26, peso_deuda_pct: 14 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  // Suma aditiva = crecimiento del año. «otros» = perímetro de AEG (cerrada el 29-jun-2026).
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 29.0, precio_pct: 6.0, otros_pct: 20.9 },
    { periodo: '2027e', volumen_pct: 8.0, precio_pct: 3.0, otros_pct: 11.9 },
    { periodo: '2028e', volumen_pct: 7.0, precio_pct: 2.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 6.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 5.5, precio_pct: 1.5, otros_pct: 0 },
  ],
  // Mercado de transformadores secos de Norteamérica, el perímetro del 23 % de cuota que da la empresa [B1]: 3.700 M USD en 2026,
  // a +6,5 % anual (MarketsandMarkets, potencia [B3]) hasta 2030e = 4.760 M USD × 1,4154 CAD/USD [D6] = 6.737 M CAD (estimación propia).
  // Nuestras ventas de 2030e incluyen ≈ 400 M de AEG (SAI industriales), fuera de ese perímetro: la cuota implícita sale inflada.
  mercado_final: { periodo: '2030e', tamano: 6737 },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 4.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
  // BPA propio: resultado financiero recurrente = intereses de la deuda (líneas de 70 M a 27-jun + préstamo de AEG de 365 M desde el 29-jun,
  // ≈ 5,5 %, más arrendamientos), sin diferencias de cambio; desapalancamiento con el flujo de caja en 2027-2028 [A6, A12].
  // Impuesto del 26 % (25,4 % en 2025 [A1]). Acciones: 9.126.624 A + 2.778.300 B = 11,905 M; los DSU, PSU y RSU se pagan en efectivo: sin dilución [D16].
  bpa: { fin_recurrente: { '2026e': -14, '2027e': -22, '2028e': -18 }, minoritarios: 0, acciones: { '2026e': 11.905, '2027e': 11.905, '2028e': 11.905 } },
};
export default S;

const VENTAS_2025 = 898.255;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S26 está publicado y AEG ya consolida; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
