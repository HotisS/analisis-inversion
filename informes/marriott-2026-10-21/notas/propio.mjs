// Parte del analista (Marriott International, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json;
// [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin la diferencia de costes reembolsados, reestructuración, deterioros ni partidas
// fiscales especiales; CON los pagos en acciones), con la proyección del DCF:
//   resultado operativo ajustado = ingresos ajustados × (margen EBITDA del DCF − amortización)
//   + 25 M de otros (ingresos financieros y participadas: calibra 2025) − gastos financieros, × (1 − 26,25 %, centro de
//   la guía del 26-26,5 %) ÷ acciones diluidas.
// Calibrado con 2025 real (6.997 × 63,9 % = 4.476; 809 de intereses; 25,5 % de tipo; 273,6 M → 10,03 frente a 10,02) y
// con la guía de 2026 (ingresos +10 %, margen 70,5 %, intereses 880, 263 M → 11,74; guía 11,64-11,81, consenso 11,74).
// Acciones: 264,5 M diluidas en el 2T26 y 260,8 M en circulación el 27-jul-2026 [A6]; la guía de más de 4.500 M de
// devolución en 2026 deja ≈ 1.550 M de recompras para el 2S26 (≈ 3,9 M de acciones) → 263 M de media en 2026 y 259 M en
// 2027-2028, SIN recompras no anunciadas (la regla común no supone recompras futuras).
const VENTAS_25 = 6997;
const OTROS = 25, TIPO = 0.2625;
const bpa = (v, margen, amort, interes, acc) => Math.round(((v * (margen - amort) / 100 + OTROS - interes) * (1 - TIPO)) / acc * 100) / 100;
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, S.anios[0].amortizacion_pct_ventas, 880, 263.0);
const bpa27 = bpa(v27, S.anios[1].margen_ebitda_pct, S.anios[1].amortizacion_pct_ventas, 900, 259.0);
// Casos del ejercicio objetivo (2028e): bajista = RevPAR que cae ≈ 2 % (crecimiento de los ingresos del +1 % en vez del
// +7 %) y 2,5 puntos menos de margen (incentivos que caen más que el RevPAR); alcista = +2 puntos de crecimiento y +1 de margen.
const caso = (dg, dm) => bpa(v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, S.anios[2].amortizacion_pct_ventas, 920, 259.0);
export const BPA = { 2026: bpa26, 2027: bpa27, Bajista: caso(-6.0, -2.5), Base: caso(0, 0), Alcista: caso(2.0, 1.0) };
BPA[2028] = BPA.Base;

// Historia del PER ADELANTADO en BPA AJUSTADO publicado [A10, A3, A2, D11]. Cierres de Yahoo [D1].
// Normalizados: 2018 sin 0,65 USD de plusvalías (6,21 → 5,56) [A10]; 2023 sin 1,52 USD de beneficios fiscales (9,99 →
// 8,47) [A11]. Excluidos 2019 y 2020: el BPA del año siguiente es el de la pandemia (0,18 y 3,19 USD).
const cierres = { 2017: 135.73, 2018: 108.56, 2019: 151.43, 2020: 131.92, 2021: 165.24, 2022: 148.89, 2023: 225.51, 2024: 278.94, 2025: 310.24 };
const bpaAj = { 2018: 5.56, 2019: 6.00, 2020: 0.18, 2021: 3.19, 2022: 6.69, 2023: 8.47, 2024: 9.33, 2025: 10.02, 2026: bpa26 };
const EXCL = ['2019', '2020'];
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adelTodos = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[String(+a + 1)])]);
const adel = adelTodos.filter(([a]) => !EXCL.includes(a));
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
// v2 (al cierre: precio ÷ BPA ajustado del mismo año), sin 2020 y 2021 (BPA de la pandemia).
const alCierre = ['2018', '2019', '2022', '2023', '2024', '2025'].map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 397.31;
export const PER = {
  actual: r1(PRECIO / bpa27), solo_2026: r1(PRECIO / bpa26),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel, adelTodos,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las comisiones de franquicia, gestión y tarjetas son un solo negocio que comparte marcas, Bonvoy y sistema de reservas; los 51 hoteles propios o arrendados (14.406 habitaciones) son el 3 % del resultado y no cambian el total [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A6]: deuda financiera 460 + 16.455 = 16.915 (con arrendamientos financieros); caja 462;
    // participadas (método de la participación) 340, que suman. Arrendamientos operativos fuera (US GAAP).
    // El pasivo de fidelidad (8.444 M a 30-jun-2026) NO se resta: es financiación de clientes que crece con el sistema y se
    // repaga en noches cuyo coste ya está en la proyección; restarlo como deuda costaría ≈ 32 USD por acción (ver textos).
    // Las emisiones de agosto (1.250 M) y las recompras del 3T no se suman: las acciones son las del 27-jul (260,8 M).
    puente: { fecha: '2026-06-30', deuda_financiera: 16915, arrendamientos: 0, caja: 462, minoritarios: 0, pensiones: 0, asociadas: 340, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos, la guía y el consenso): precio de cierre de cada año (Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A10, A3, A2]; para el cierre de 2025 (310,24 USD), ÷ nuestro 2026e (${n2(bpa26)}; guía 11,64-11,81, consenso 11,74). Normalizados: 2018 sin 0,65 USD de plusvalías (5,56) [A10] y 2023 sin 1,52 USD de beneficios fiscales (8,47) [A11]; sin normalizar, el PER de 2022 sería 14,9x y el de 2017 21,9x. Excluidos 2019 (${n2(adelTodos.find((x) => x[0] === '2019')[1])}x) y 2020 (${n2(adelTodos.find((x) => x[0] === '2020')[1])}x): el BPA del año siguiente es el de la pandemia, como hizo el análisis de Hilton del mismo día [P1]. Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de los siete años útiles (2017-2018 y 2021-2025). PER actual = precio (397,31 USD, cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${n2(bpa27)}). Con 2026e sería ${n2(PER.solo_2026)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año, con 2018 y 2023 normalizados): ${fmt(PER.v2.alCierre)}. Sin 2020 y 2021 (BPA de la pandemia). Mediana y mínimo de los cinco últimos útiles.` },
      },
      comparables_per: { mediana: 21.5 },
      consenso: { bpa_ano1: 11.74, bpa_ano2: 13.15, objetivo_medio: 385.38, objetivo_min: 280, objetivo_max: 429, analistas: 26, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA ajustado 2026 de 11,74 USD (29 analistas; 11,63 hace 90 días) y 2027 de 13,15 (13,11 hace 90 días); objetivo medio de 26 analistas [D2]' },
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
    { id: 1, titulo: 'Hilton e IHG: análisis value del 21-oct y del 20-oct-2026 (mismo sector; historia del PER de Hilton sin los años de la pandemia, comparables y riesgos comunes)', editor: 'Repositorio de análisis (informes/hilton-2026-10-21, informes/ihg-2026-10-20)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/hilton-2026-10-21/' },
  ],
  huecos: [],
};
