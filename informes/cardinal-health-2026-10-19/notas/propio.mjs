// Parte del analista (Cardinal Health, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados, remuneración ligada a compras,
// reestructuración, deterioros, litigios ni opioides) SIN el reembolso IEEPA de FY2026 (0,31 USD, no recurrente), con la
// proyección del DCF:
//   EBITDA ajustado = ventas × (margen del DCF + 0,10 puntos que el DCF resta por los costes recurrentes excluidos)
//   − depreciación (0,23 % de las ventas: 589 M en FY2026) − intereses y otros × (1 − 19,5 % de impuesto ajustado, centro
//   de la guía del 19-20 %) ÷ acciones diluidas (minoritarios ≈ 0: −9 M en FY2026).
// Calibrado con FY2026 real (ventas 254.248, margen 1,66 %, intereses y otros 331, 237 M → 11,29 frente a 11,26 publicado)
// y con la guía de FY2027 (ventas +4,5 %, intereses y otros 265, 233 M → 12,58; guía 12,40-12,60, consenso 12,56).
// Acciones: 232,6 M en circulación el 31-jul-2026 + ≈ 1,5 M de dilución − ≈ 4 M de las recompras ya guiadas para FY2027
// (≥ 1.000 M USD) → 230 M en FY2028e, SIN recompras no anunciadas.
const VENTAS_FY26 = 254248, ACC = 230.0;
const bpa = (v, margenDcf, interes, acc) => Math.round(((v * (margenDcf + 0.10 - 0.23) / 100 - interes) * 0.805) / acc * 100) / 100;
const v27 = VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (S.anios[1].crecimiento_pct + dg) / 100), S.anios[1].margen_ebitda_pct + dm, 290, ACC);
const bpa27 = bpa(v27, S.anios[0].margen_ebitda_pct, 265, 233.0);
export const BPA = { FY2027: bpa27, Bajista: caso(-2.0, -0.12), Base: caso(0, 0), Alcista: caso(1.0, 0.06) };
BPA.FY2028 = BPA.Base;

// Historia del PER en la base del BPA AJUSTADO publicado [A4, A3, A2] (FY2026 sin IEEPA: 10,95). Cierres a 30 de junio [D1].
const cierres = { FY2018: 48.83, FY2019: 47.10, FY2020: 52.19, FY2021: 57.09, FY2022: 52.27, FY2023: 94.57, FY2024: 98.32, FY2025: 168.00, FY2026: 237.56 };
const bpaAj = { FY2018: 5.00, FY2019: 5.28, FY2020: 5.45, FY2021: 5.57, FY2022: 5.06, FY2023: 5.79, FY2024: 7.53, FY2025: 8.24, FY2026: 10.95, FY2027: BPA.FY2027 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 254.06;
// PER actual en la MISMA base que la historia (precio en una fecha ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan
// 8,4 meses de FY2027 y entran 3,6 de FY2028 → BPA de los próximos 12 meses = 8,4/12 × FY2027e + 3,6/12 × FY2028e.
export const BPA_NTM = r2(8.4 / 12 * BPA.FY2027 + 3.6 / 12 * BPA.FY2028);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.FY2028),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica como método de valoración: el segmento farmacéutico da el 74 % del resultado de los segmentos y comparte clientes, logística y compras con «Otros» (at-Home, Nuclear, OptiFreight). GMPD (7 % del resultado de segmento en FY2026, 4 % sin IEEPA) tendría valor aparte como fabricante de productos médicos, pero su margen del 1-2 % no cambia el total; el mercado lleva años pidiendo su venta y la dirección no la ha anunciado [A2].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A1]: deuda financiera 8.886 (con arrendamientos financieros); caja 4.856. Minoritarios: participaciones
    // no dominantes 159 + Specialty Alliance Units 1.277 (parte económica de los médicos socios de The Specialty Alliance) = 1.436.
    // otros_ajustes = opioides 4.300 × (1 − 21 %) ≈ 3.397 (deducibles, sin descontar). Arrendamientos operativos fuera (US GAAP).
    // Los ajustes propuestos por el IRS (≈ 1.400 M más intereses) no se restan: la empresa dice estar provisionada y lo
    // provisionado ya está en los pasivos fiscales del balance.
    puente: { fecha: '2026-06-30', deuda_financiera: 8886, arrendamientos: 0, caja: 4856, minoritarios: 1436, pensiones: 0, asociadas: 0, otros_ajustes: 3397 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (30 de junio, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente [A4, A3, A2] (FY2026 sin los 0,31 USD no recurrentes del reembolso IEEPA: 10,95; con ellos el PER de FY2025 sería 14,9 y la mediana no cambia); para el cierre de FY2026 (237,56), ÷ nuestro FY2027e (${n2(bpa27)}, en la guía de 12,40-12,60). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de FY2019-FY2026. Sin exclusiones: el BPA ajustado no tiene pérdidas (opioides y deterioros de GMPD están fuera). El BPA GAAP no sirve para la historia (−12,61 USD en FY2020, −3,37 en FY2022). PER actual = precio (254,06 USD, cierre del 16-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 8,4/12 de FY2027e ${n2(bpa27)} + 3,6/12 de FY2028e ${n2(BPA.FY2028)}), la misma base que la historia (precio de una fecha ÷ BPA de los 12 meses siguientes). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026, media de FY2019-FY2026.` },
      },
      comparables_per: { mediana: 15.6 },
      consenso: { bpa_ano1: 12.56, bpa_ano2: 14.06, objetivo_medio: 271.47, objetivo_min: 235, objetivo_max: 295, analistas: 15, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 19-oct-2026: BPA ajustado FY2027 de 12,56 USD (17 analistas; 12,05 hace 90 días) y FY2028 de 14,06 (13,57 hace 90 días); objetivo medio de 15 analistas [D2]' },
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
    { id: 1, titulo: 'Distribución farmacéutica: ficha sectorial corta (perímetro, cuotas, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
    { id: 2, titulo: 'McKesson y Cencora: análisis value del 19-oct y del 15-oct-2026 (mismo sector; referencia de comparables, ROIC y riesgos comunes)', editor: 'Repositorio de análisis (informes/mckesson-2026-10-19, informes/cencora-2026-10-15)', tipo: 'Analistas', fecha: '2026-10-19', url: 'informes/mckesson-2026-10-19/' },
  ],
  huecos: [],
};
