// Parte del analista (Grainger, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (base ajustada de Grainger, que solo quita partidas puntuales; nuestra proyección no tiene ninguna) con la del DCF:
//   BAI = ventas × (margen EBITDA − amortización) − 65 M de gasto financiero neto (−65 M en 2025)
//   Beneficio atribuido = BAI × (1 − 25 %) − parte de los minoritarios de MonotaRO (≈ 49,5 % de su beneficio: 102 M en 2025,
//   ≈ 118 M en 2026e por el crecimiento en yenes del 13 % y el yen más débil; +10 % al año después)
//   BPA = ÷ acciones diluidas: 47,4 M de media en 2026 (47,1 M en circulación el 28-jul más dilución, menos las recompras
//   guiadas de 975-1.050 M) y 46,8 M después (las de final de 2026), SIN recompras no anunciadas.
// Calibrado con 2025 ajustado: 17.942 × (16,41 % − 1,42 %) − 65 = 2.626 × (1 − 23,7 %) − 102 = 1.902 ÷ 48,0 = 39,6 (publicado 39,48).
const VENTAS_2025 = 17942;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margen, amort, mino, acc) => r2(((v * (margen - amort) / 100 - 65) * 0.75 - mino) / acc);
const a = S.anios;
const v26 = VENTAS_2025 * (1 + a[0].crecimiento_pct / 100);
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, 118, 47.4);
const caso = (perf27, dg, dm, mino27, mino28) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + perf27.g) / 100);
  const v28 = v27 * (1 + (a[2].crecimiento_pct + dg) / 100);
  return { v27, v28, b27: bpa(v27, a[1].margen_ebitda_pct + perf27.m, a[1].amortizacion_pct_ventas, mino27, 46.8), b28: bpa(v28, a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, mino28, 46.8) };
};
const base = caso({ g: 0, m: 0 }, 0, 0, 130, 143);
const baj = caso({ g: -8.5, m: -2.0 }, -2.5, -1.5, 118, 122);
const alc = caso({ g: 1.5, m: 0.6 }, 1.5, 0.6, 132, 148);
export const BPA = { 2026: bpa26, 2027: base.b27, Bajista: baj.b28, Base: base.b28, Alcista: alc.b28 };

// Historia del PER ADELANTADA: precio de cierre de cada año [D1] ÷ BPA ajustado real del año siguiente [A5, A6, A7]
// (para 2025: nuestro 2026e). Grainger no ha dividido acciones en el periodo.
const cierres = { 2018: 282.36, 2019: 338.52, 2020: 408.34, 2021: 518.24, 2022: 556.25, 2023: 828.69, 2024: 1054.05, 2025: 1009.05 };
const bpaReal = { 2019: 17.29, 2020: 16.18, 2021: 19.84, 2022: 29.66, 2023: 36.67, 2024: 38.96, 2025: 39.48, 2026: bpa26 };
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaReal[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((y) => bpaReal[y]).map((y) => [y, r1(cierres[y] / bpaReal[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((p, q) => p - q), c7 = alCierre.map((x) => x[1]);
export const PRECIO = 1335.96;
// PER actual en la MISMA base que la historia: a 21-oct-2026 quedan 2,3 meses de 2026 y entran 9,7 de 2027.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * base.b27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / base.b27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(c7.reduce((s, x) => s + x, 0) / c7.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No se usa como método: el único negocio separable con precio de mercado es MonotaRO, y ya entra en el DCF consolidado al 100 % con su parte ajena restada a valor de mercado en el puente (3.536 M USD) [D12, D2]. Hacer suma de partes con High-Touch a múltiplo duplicaría el DCF sin información nueva.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda 2.408 (bonos y préstamos de MonotaRO), caja 589. Arrendamientos operativos fuera (US GAAP).
    // Minoritarios: el 49,5 % de MonotaRO que no es de Grainger, A VALOR DE MERCADO (capitalización de 1.129.692 M JPY a
    // 158,13 JPY/USD = 7.144 M USD × 49,5 % = 3.536 M) [D2, D11, D12], no al contable (405 M), porque el DCF consolida el 100 %
    // de sus flujos y el mercado paga por ella ≈ 30 veces beneficio. Otros: 210 M pagados por AWM el 26-ago-2026 [A11].
    puente: { fecha: '2026-06-30', deuda_financiera: 2408, arrendamientos: 0, caja: 589, minoritarios: 3536, pensiones: 0, asociadas: 0, otros_ajustes: 210 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado de la empresa (solo quita partidas puntuales: deterioros y ventas de Fabory y Cromwell; la misma base que nuestros casos y que el consenso): precio de cierre de cada año [D1] ÷ BPA ajustado real del año siguiente [A5, A6, A7]; para el cierre de 2025 (1.009,05), ÷ nuestro 2026e (${n2(bpa26)}; consenso 46,47). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025 (ocho años: el BPA ajustado de 2017-2018 no está en las fuentes primarias que hemos leído). Sin exclusiones: no hay pérdidas ni PER ≥ 150x. 2022 (15,2x) es el mínimo por la caída de la bolsa de ese año con el BPA disparado por la inflación, y 2024 (26,7x) el máximo. PER actual = precio (1.335,96 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(base.b27)}), la misma base que la historia; con solo 2027e sería ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado real del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2019-2025 (siete años).` },
      },
      comparables_per: { mediana: 23.6 },
      consenso: { bpa_ano1: 46.47, bpa_ano2: 51.06, objetivo_medio: 1331.57, objetivo_min: 1100, objetivo_max: 1500, analistas: 14, tendencia_3m: 'al alza', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 46,47 USD (45,65 hace 90 días) y de 2027 de 51,06 (50,48 hace 90 días); objetivo medio de 14 analistas [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Distribución industrial especializada: ficha sectorial corta (14-oct-2026)', editor: 'Repositorio de análisis (sectores/)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
    { id: 2, titulo: 'Movimiento del precio de GWW (herramientas/movimiento.mjs, Yahoo): 1, 3, 6 y 12 meses, máximos, medias, volatilidad', editor: 'Yahoo Finance (cálculo propio)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GWW/history' },
    { id: 3, titulo: 'Informe value de Fastenal del 21-oct-2026 (competidor: márgenes, aranceles, PER adelantado)', editor: 'Repositorio de análisis (informes/)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/fastenal-2026-10-21/' },
  ],
  huecos: [],
};
