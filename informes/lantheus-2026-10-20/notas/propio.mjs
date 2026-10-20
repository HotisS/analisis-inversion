// Parte del analista (Lantheus Holdings, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA de la regla = BPA AJUSTADO CON REMUNERACIÓN EN ACCIONES: el ajustado de la empresa (sin amortización de intangibles
// comprados, costes de compras, colaboración estratégica, deterioros ni plusvalías de ventas de negocios) MENOS la
// remuneración en acciones después de impuestos (85,6 M en 2025 = 1,25 USD por acción × 0,77), porque es un coste real que se
// repite y la empresa no lo resta [A2, A3]. Proyección con el DCF:
//   (ventas × (margen EBITDA del DCF − 1,5 % de depreciación de inmovilizado) + resultado financiero neto) × (1 − 26,5 %) ÷ acciones.
// Calibrado con 2025: 1.541,6 × (31,6 − 1,5) % + 3 = 467 × 0,735 ÷ 68,4 = 5,02 frente a 5,12 real (6,08 ajustado − 1,25 × 0,77).
// Resultado financiero: caja ≈ 600 M al 4 % menos el convertible (575 M al 2,625 %) → +10 en 2026e, +16 en 2027e y +30 en 2028e
// (el convertible vence el 15-dic-2027 y se paga con caja). Acciones: 67,3 / 67,8 / 68,5 M (dilución de ≈ 0,7 M al año por la
// remuneración en acciones; el acuerdo de fusión prohíbe recompras [D3]).
const VENTAS_2025 = 1541.6;
const bpa = (v, margen, fin, acc, t = 0.265) => Math.round(((v * (margen - 1.5) / 100 + fin) * (1 - t)) / acc * 100) / 100;
const v26 = VENTAS_2025 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 10, 67.3, 0.26);
const bpa27 = bpa(v27, S.anios[1].margen_ebitda_pct, 16, 67.8);
const caso = (dg, dm) => bpa(v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, 30, 68.5);
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-5.0, -3.0), Base: caso(0, 0), Alcista: caso(3.0, 2.0) };
BPA['2028e'] = BPA.Base;

// Historia del PER en la MISMA base (ajustado − remuneración en acciones después de impuestos) [A2, A3, A12]:
// ajustado 2019 1,17 / 2020 0,47 / 2021 0,49 / 2022 4,22 / 2023 6,23 / 2024 6,76 / 2025 6,08; remuneración en acciones por
// acción 0,31 / 0,26 / 0,24 / 0,41 / 0,72 / 1,07 / 1,25. Cierres a 31-dic (Yahoo [D1]).
const cierres = { 2018: 15.65, 2019: 20.51, 2020: 13.49, 2021: 28.89, 2022: 50.96, 2023: 62.00, 2024: 89.46, 2025: 66.55 };
const bpaBase = { 2019: 0.93, 2020: 0.27, 2021: 0.31, 2022: 3.90, 2023: 5.68, 2024: 5.94, 2025: 5.12, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaBase[+a + 1])]);
// Se excluyen 2019 y 2020: el BPA del año siguiente (0,27 y 0,31) era casi nulo, antes de PYLARIFY (lanzado en 2021-2022).
const EXCL = ['2019', '2020'];
const validos = adel.filter(([a]) => !EXCL.includes(a));
const u5 = validos.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaBase[a]).map((a) => [a, r1(cierres[a] / bpaBase[a])]);
const c5v = alCierre.filter(([a]) => +a >= 2022);
const c5 = c5v.map((x) => x[1]).sort((a, b) => a - b);
const med = (s) => (s.length % 2 ? s[(s.length - 1) / 2] : r1((s[s.length / 2 - 1] + s[s.length / 2]) / 2));
export const PRECIO = 99.92;
// PER actual en la misma base que la historia: a 20-oct-2026 quedan 2,4 meses de 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * bpa26 + 9.6 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / bpa27),
  mediana_5a: med(u5), minimo_5a: u5[0], media_larga: r1(validos.reduce((s, x) => s + x[1], 0) / validos.length), adel,
  v2: { mediana_5a: med(c5), minimo_5a: c5[0], media_larga: r1(c5.reduce((s, x) => s + x, 0) / c5.length), alCierre },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: PYLARIFY (64 % de las ventas de 2025), DEFINITY (21 %) y el resto comparten fábricas, red comercial de medicina nuclear y clientes (hospitales y centros de imagen); no hay segmentos con resultado propio publicado [A1]. Las participaciones en Radiopharm Theranostics y Perspective Therapeutics (119 M USD) se suman en el puente como asociadas.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A1]: convertible de 575 M (2,625 %, vence el 15-dic-2027, conversión a 79,81 USD; el exceso sobre el
    // nominal se paga en acciones y ya está en las 67,5 M diluidas); caja 593,3; participaciones (Radiopharm, Perspective y otras)
    // 119,0 como asociadas; otros_ajustes = pagos contingentes por compras (51,1 M a largo plazo) − pagarés de SHINE (24,5) = 26,6.
    // Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-06-30', deuda_financiera: 575, arrendamientos: 0, caja: 593.3, minoritarios: 0, pensiones: 0, asociadas: 119.0, otros_ajustes: 26.6 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado CON remuneración en acciones (la misma base que nuestros casos): cierre de cada ejercicio (31-dic, Yahoo [D1]) ÷ BPA del ejercicio siguiente [A2, A3, A12]; para el cierre de 2025 (66,55), ÷ nuestro 2026e (${n2(bpa26)}). Serie: ${fmt(adel)}. Se excluyen 2019 y 2020: el BPA del año siguiente (0,27 y 0,31 USD) era casi nulo, antes del lanzamiento de PYLARIFY, y el PER no mide nada. Mediana y mínimo de 2021-2025; media de 2018 y 2021-2025. PER actual = precio (99,92 USD, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(bpa26)} + 9,6/12 de 2027e ${n2(bpa27)}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x. Ojo: el precio está anclado desde el 3-ago-2026 a la oferta en efectivo de Curium (102,50 USD + CVR), no a los beneficios.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA del mismo ejercicio, misma base): ${fmt(PER.v2.alCierre)}. Se excluyen 2019-2021 (BPA casi nulo antes de PYLARIFY); mediana, mínimo y media de 2022-2025.` },
      },
      comparables_per: { mediana: 14.8 },
      consenso: { bpa_ano1: 5.36, bpa_ano2: 6.38, objetivo_medio: 106.99, objetivo_min: 102.5, objetivo_max: 115, analistas: 8, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 20-oct-2026: BPA ajustado (sin remuneración en acciones) de 2026 de 5,36 USD y de 2027 de 6,38 (9 analistas); objetivo medio de 8 analistas, casi todos ya en el precio de la oferta [D2]' },
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
    { id: 1, titulo: 'Cálculo propio: BPA ajustado con remuneración en acciones, PER adelantado y proyección (notas/propio.mjs)', editor: 'Análisis propio', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/lantheus-2026-10-20/notas/propio.mjs' },
  ],
  huecos: [],
};
console.error('BPA', JSON.stringify(BPA), 'NTM', BPA_NTM, 'PER', JSON.stringify({ ...PER, adel: undefined }));
