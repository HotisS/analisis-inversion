// Parte del analista (Grand Canyon Education, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de los intangibles de Orbis, 8,4 M al año, ni acuerdos judiciales,
// deterioros o indemnizaciones; con los pagos en acciones como coste) con la proyección del DCF:
//   (ventas × (margen EBITDA − 3,6 % de amortización) + 8,4 de Orbis + intereses cobrados) × (1 − 23,5 %) ÷ acciones diluidas.
// Calibrado con la guía de 2026 (ventas 1.169 M, margen operativo GAAP del 28,1 %, intereses ≈ 11 M, 26,1 M de acciones →
// 10,20 USD; guía 10,18-10,32 y consenso 10,21 [A3, D2]). Acciones: 25,4 M, las de la guía del 4T26 [A3], SIN recompras
// no anunciadas en 2027-2028 (quedan 124 M de autorización a 30-jul-2026, que vence el 1-mar-2027 [A4]).
const VENTAS_25 = 1106.1, ACC = 25.4, T_IMP = 23.5;
const bpa = (v, margen, interes, acc) => Math.round(((v * (margen - 3.6) / 100 + 8.4 + interes) * (1 - T_IMP / 100)) / acc * 100) / 100;
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const caso = (dg, dm) => bpa(v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, 10, ACC);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 11, 26.1);
const bpa27 = bpa(v27, S.anios[1].margen_ebitda_pct, 10, ACC);
// Bajista a 12 meses: el del DCF (−3 puntos de crecimiento y −2 de margen) aplicado a 2027e y 2028e.
const v27b = v26 * (1 + (S.anios[1].crecimiento_pct - 3) / 100);
const bajista = bpa(v27b * (1 + (S.anios[2].crecimiento_pct - 3) / 100), S.anios[2].margen_ebitda_pct - 2.0, 10, ACC);
const v27a = v26 * (1 + (S.anios[1].crecimiento_pct + 1.5) / 100);
const alcista = bpa(v27a * (1 + (S.anios[2].crecimiento_pct + 1.5) / 100), S.anios[2].margen_ebitda_pct + 0.8, 10, ACC);
export const BPA = { '2026': bpa26, '2027': bpa27, Bajista: bajista, Base: caso(0, 0), Alcista: alcista };
BPA['2028'] = BPA.Base;

// Historia del PER en la base del BPA AJUSTADO publicado [A5, A2] (2026 = nuestro 2026e). Cierres a 31 de diciembre [D1].
const cierres = { 2018: 96.14, 2019: 95.79, 2020: 93.11, 2021: 85.71, 2022: 105.66, 2023: 132.04, 2024: 163.8, 2025: 166.31 };
const bpaAj = { 2019: 5.48, 2020: 5.59, 2021: 6.00, 2022: 5.96, 2023: 7.04, 2024: 8.04, 2025: 9.08, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a]).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 162.11;
// PER actual = precio ÷ BPA propio del ejercicio siguiente (2027e), como dice el método vigente. Con el BPA de los próximos
// 12 meses (2,4/12 de 2026e + 9,6/12 de 2027e) sería algo mayor; se da como referencia.
export const BPA_NTM = r2(2.4 / 12 * bpa26 + 9.6 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / bpa27), ntm: r1(PRECIO / BPA_NTM), solo_2028: r1(PRECIO / BPA['2028']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo segmento (servicios de educación a universidades socias), con GCU como el 89 % de los ingresos [A1].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A3, A4]: sin deuda financiera (la línea revolving de 100 M de septiembre está sin disponer [A8]);
    // caja e inversiones 274,5 M. Arrendamientos operativos fuera (US GAAP). Los litigios abiertos sin provisión (Smith y Wang,
    // Ogdon, Valerio) no se restan: la empresa no puede estimar la pérdida [A4]; están en los riesgos.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 274.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada año (31 de diciembre, Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A5, A2]; para el cierre de 2025 (166,31 USD), ÷ nuestro 2026e (${n2(bpa26)}, dentro de la guía de 10,18-10,32). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: el BPA ajustado no tiene pérdidas ni atípicos. PER actual = precio (162,11 USD, cierre del 19-oct-2026) ÷ nuestro BPA de 2027e (${n2(bpa27)}). Con el BPA de los próximos 12 meses (${n2(BPA_NTM)}) sería ${n2(PER.ntm)}x y con 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año; 2025 ÷ 9,08 real): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2019-2025.` },
      },
      comparables_per: { mediana: 14.7 },
      consenso: { bpa_ano1: 10.21, bpa_ano2: 11.31, objetivo_medio: 194, objetivo_min: 182, objetivo_max: 200, analistas: 3, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 20-oct-2026: BPA ajustado de 2026 de 10,21 USD y de 2027 de 11,31 (11,16 hace 90 días); objetivo medio de 3 analistas, todos con compra; BMO bajó a 182 el 17-oct [D2, D6]' },
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
    { id: 1, titulo: 'Cálculos propios con las cuentas XBRL de la SEC (10-K 2016-2025) y la guía de 2026: BPA ajustado proyectado, PER adelantado e histórico, ROIC exigente', editor: 'Repositorio de análisis (informes/grand-canyon-2026-10-20/notas/propio.mjs)', tipo: 'Propia', fecha: '2026-10-20', url: 'informes/grand-canyon-2026-10-20/notas/propio.mjs' },
  ],
  huecos: [],
};
