// Parte del analista (Swisscom, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (publicado, NIIF) con la proyección del DCF, en base EBITDAaL:
//   EBIT después de arrendamientos = ventas × (margen EBITDAaL − amortización sin derechos de uso)
//   − resultado financiero sin intereses de arrendamientos (intereses de la deuda financiera ≈ 220 M al año en el 1S26 y otros)
//   × (1 − 18 % de impuesto: 18,3 % en el 1S26, guía 17-18 %) ÷ 51,80 M de acciones (sin recompras; minoritarios ≈ 0).
// Calibrado con el 1S26 anualizado (EBIT después de arrendamientos 951 × 2, financiero −133 × 2 → 25,8 CHF frente a 25,84
// = 2 × 12,92) y con la guía de 2026 (EBITDAaL 5.000-5.100 M).
const VENTAS_25 = 15048, ACC = 51.80, TAX = 0.18;
const FIN = { 2026: 255, 2027: 245, 2028: 235 };
const bpa = (v, m, am, fin) => Math.round(((v * (m - am) / 100 - fin) * (1 - TAX)) / ACC * 100) / 100;
const a = S.anios;
const v26 = VENTAS_25 * (1 + a[0].crecimiento_pct / 100), v27 = v26 * (1 + a[1].crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (a[2].crecimiento_pct + dg) / 100), a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, FIN[2028]);
const bpa26 = bpa(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, FIN[2026]);
const bpa27 = bpa(v27, a[1].margen_ebitda_pct, a[1].amortizacion_pct_ventas, FIN[2027]);
export const BPA = { 2026: bpa26, 2027: bpa27, Bajista: caso(-1.0, -1.5), Base: caso(0, 0), Alcista: caso(0.5, 0.8) };
BPA[2028] = BPA.Base;

// Historia del PER en BPA publicado [A1, A2, A3; 2017-2020 de los informes anuales]. Cierres de diciembre [D1].
const cierres = { 2016: 456.1, 2017: 518.5, 2018: 469.7, 2019: 512.6, 2020: 477.1, 2021: 514.6, 2022: 506.6, 2023: 506.0, 2024: 504.5, 2025: 575.5 };
const bpaP = { 2017: 30.31, 2018: 29.48, 2019: 32.28, 2020: 29.54, 2021: 35.37, 2022: 30.93, 2023: 33.03, 2024: 29.77, 2025: 24.54, 2026: BPA[2026] };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((y) => [y, r1(cierres[y] / bpaP[+y + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((p, q) => p - q), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((y) => [y, r1(cierres[y] / bpaP[y])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((p, q) => p - q);
export const PRECIO = 672.0;
// PER actual en la misma base que la historia (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 2,4 meses de
// 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * BPA[2026] + 9.6 / 12 * BPA[2027]);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2027: r1(PRECIO / BPA[2027]), solo_2028: r1(PRECIO / BPA[2028]),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([y, p]) => `${y} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER }, null, 1));

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS); no Swiss GAAP FER', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A4]: deuda financiera 13.021 (bonos 11.730, bancos 575, colocaciones privadas 323, otros 393 con
    // derivados); arrendamientos 0 (base EBITDAaL; 3.480 M fuera); caja 215 + otros activos financieros de la deuda neta 351 = 566;
    // minoritarios −2 ≈ 0; pensiones 54 (déficit contable); asociadas 26 (participadas por puesta en equivalencia);
    // otros_ajustes 96 = pago aplazado pendiente de Vodafone Italia (≈ 104 M EUR × 0,9261).
    puente: { fecha: '2026-06-30', deuda_financiera: 13021, arrendamientos: 0, caja: 566, minoritarios: 0, pensiones: 54, asociadas: 26, otros_ajustes: 96 },
    rab: null,
    referencia_mercado: { mercado: 'Mercado maduro (prima implícita del S&P 500 de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA publicado (NIIF, la misma base que nuestros casos y que el consenso): precio de cierre de diciembre (Yahoo [D1]) ÷ BPA real del año siguiente [A1, A2, A3]; para el cierre de 2025 (575,50), ÷ nuestro 2026e (${n2(bpa26)}; consenso 26,64). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones, pero 2024 y 2025 están subidos porque el BPA de 2025-2026 lleva la amortización de los activos comprados de Vodafone Italia, los intereses de la deuda nueva y los costes de integración: con el perímetro antiguo el PER adelantado fue de 13,5-17,6 veces. PER actual = precio (672,00 CHF, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(bpa26)} + 9,6/12 de 2027e ${n2(bpa27)}). Con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2017-2025.` },
      },
      comparables_per: { mediana: 13.3 },
      consenso: { bpa_ano1: 26.64, bpa_ano2: 28.46, objetivo_medio: 575.76, objetivo_min: 460, objetivo_max: 735, analistas: 17, tendencia_3m: 'estables', fuente: 'Consenso recopilado por Swisscom (8-oct-2026, 15 analistas): beneficio de 1.380 M en 2026 y 1.474 M en 2027 ÷ 51,80 M de acciones [D3]; objetivos de 17 analistas en Yahoo, 20-oct-2026 [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Cálculos propios del analista: BPA 2026e-2028e en base EBITDAaL, historia del PER adelantado y puente de valoración', editor: 'Repositorio de análisis (informes/swisscom-2026-10-20/notas/propio.mjs)', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/swisscom-2026-10-20/notas/propio.mjs' },
  ],
  huecos: [],
};
