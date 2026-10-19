// Supuestos numéricos del analista (HD Hyundai Electric, corte 2026-10-19). Cuentas consolidadas K-IFRS en millones de KRW.
// Base: 2025 (4.079.498 M de ventas, margen EBITDA del 26,2 %; beneficio operativo 995.313 M, 24,4 %) [A1].
// 2026e fijo: 1S26 publicado (2.178.313 M de ventas, beneficio operativo 545.304 M, 25,0 %) [A5] y un 2S con ventas de ≈ 2,40 billones
// (+11 % sobre el 2S25) y margen operativo del 26 %, en línea con el consenso del 3T26 (1,17 billones y 306.500 M) [D2].
// Ciclo: margen de pico en 2026-2028 (cartera de 8.490 M USD firmada a precios de escasez), normalización desde 2029 hacia un
// margen EBITDA del 20 % (ciclo normal del sector del 10-15 %, pico del 20-28 % [B4]; la empresa ganó un 13,6 % en 2023 [A3]).
const crec = [12.2, 16.0, 13.0, 9.0, 7.0, 5.0, 4.0, 3.5];
const margen = [27.4, 28.5, 28.5, 27.0, 25.0, 23.0, 21.5, 20.0];
const amort = [1.8, 1.9, 2.0, 2.2, 2.4, 2.5, 2.6, 2.6];
const capex = [6.5, 6.0, 5.5, 4.5, 4.0, 3.5, 3.0, 3.0];
// Circulante comercial (existencias + clientes − proveedores + activos de contrato − pasivos de contrato) sobre ventas:
// 15,7 % en 2021, 29,1 % en 2022, 31,7 % en 2023, 15,4 % en 2024 y 6,6 % en 2025 [A1-A4]. Los anticipos se devuelven al normalizarse los pedidos.
const nwc = [7, 8, 9, 10, 12, 13, 14, 15];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: 25,
  fijo: i === 0,
}));

const S = {
  anios,
  // Bono coreano a 10 años del 4,154 % (Naver, cierre del 19-oct-2026) [D7]. Beta 1,0: la de la acción frente al KOSPI es de 0,82
  // mensual a 5 años (0,88 ajustada) y 0,90 semanal a 2 años [D1]; la subimos por el apalancamiento operativo de un fabricante cíclico.
  wacc: { tasa_libre_pct: 4.154, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.8, tasa_impositiva_pct: 25, peso_deuda_pct: 2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 7.0, precio_pct: 6.0, otros_pct: -0.8 },
    { periodo: '2027e', volumen_pct: 11.0, precio_pct: 4.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 10.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 8.0, precio_pct: 1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 6.5, precio_pct: 0.5, otros_pct: 0.0 },
  ],
  // Mercado mundial de transformadores (potencia y distribución) de GlobalData: 89.340 M USD en 2030 [B4] × 1.329,95 KRW/USD [D8].
  mercado_final: { periodo: '2030e', tamano: 118817000 },
  casos: [
    // Bajista: la capacidad nueva llega antes (2027-2028: 5 puntos menos de crecimiento y 6 de margen) y después el negocio crece
    // 2 puntos menos que el base con un margen 6 puntos más bajo (EBITDA terminal del 14 %, el ciclo normal del sector [B4]).
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -6.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null,
      perfil: ['2029e', '2030e', '2031e', '2032e', '2033e'].map((p) => ({ periodo: p, crecimiento_pp: -2.0, margen_pp: -6.0 })) },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    // Alcista: el consenso acierta en 2027-2028 (+3 puntos de crecimiento y +2 de margen) y la escasez dura: desde 2029 el margen
    // se queda 6 puntos por encima del base (EBITDA terminal del 26 %, como en 2025).
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: ['2029e', '2030e', '2031e', '2032e', '2033e'].map((p) => ({ periodo: p, crecimiento_pp: 3.0, margen_pp: 6.0 })) },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio: resultado financiero recurrente de +10.000 M (1,01 billones de caja al 2-2,5 % frente a 114.467 M de deuda al 4,8-5,5 % y
  // 67.752 M de arrendamientos; el 1S26 dejó +34.100 M con diferencias de cambio, 2025 −38.928 M) [A1, A5]; minoritarios ≈ 0 (filiales al 100 %
  // salvo participaciones pequeñas con pérdidas); 35,99 M de acciones en circulación (36.047.135 emitidas − 54.431 en autocartera) [A1].
  bpa: { fin_recurrente: 10000, minoritarios: 0, acciones: { '2026e': 35.99, '2027e': 35.99, '2028e': 35.99 } },
};
export default S;

const VENTAS_2025 = 4079498;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1; // 2026e fijo: el 1S está publicado; los ajustes empiezan en 2027e
    v = v * (1 + (a.crecimiento_pct + k * c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + k * c.ajuste_margen_pp) / 100;
    const amortiz = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amortiz;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = S.bpa.acciones[a.periodo];
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
