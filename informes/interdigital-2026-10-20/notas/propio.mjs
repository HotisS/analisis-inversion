// Parte del analista (InterDigital, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP por ACCIÓN ECONÓMICA (beneficio neto GAAP ÷ acciones diluidas no GAAP de la empresa: 30,6 M en la guía de 2026,
// que incluyen la dilución de los warrants a 105,43 USD y excluyen la del convertible de 2027, cubierta por la opción
// comprada hasta 105,43 [A3]). No se usa el BPA «no GAAP» de la empresa ni del consenso: suma la remuneración en acciones
// (61 M USD en 2026) y la amortización de patentes compradas (32 M), que son coste. La proyección sigue al DCF:
//   ventas × margen EBITDA − amortización = EBIT; + resultado financiero neto de 10 M (intereses de la caja menos el cupón;
//   el convertible de 2027 se paga en caja) × (1 − 18 %) ÷ 30,6 M de acciones (sin recompras no anunciadas).
// Calibrado con la guía de 2026 [A3]: 810 M de ingresos, 54 % de margen, 79 M de amortización, resultado financiero ≈ 1 M
// y 16,5 % de impuesto → beneficio neto ≈ 300 M (guía 270-330) → 9,80 USD por acción económica (7,91-9,67 GAAP con 34,1 M
// de acciones GAAP, que cuentan el convertible como si se convirtiera). Equivalencia con el consenso no GAAP: sumar
// ≈ 75 M después de impuestos (remuneración en acciones y patentes compradas) = +2,45 USD por acción.
const VENTAS_2025 = 834.0, ACC = 30.6, FIN = 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpaDe = (v, margen, amPct, fin, tipo) => r2(((v * (margen - amPct) / 100 + fin) * (1 - tipo / 100)) / ACC);
const a = S.anios;
const v26 = VENTAS_2025 * (1 + a[0].crecimiento_pct / 100);
const bpa26 = bpaDe(v26, a[0].margen_ebitda_pct, a[0].amortizacion_pct_ventas, 1, a[0].tasa_impositiva_pct);
// Escenarios: desplazamientos de crecimiento y margen en los años no fijos (2027e y 2028e).
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (a[1].crecimiento_pct + dg) / 100), v28 = v27 * (1 + (a[2].crecimiento_pct + dg) / 100);
  return {
    b27: bpaDe(v27, a[1].margen_ebitda_pct + dm, a[1].amortizacion_pct_ventas, FIN, a[1].tasa_impositiva_pct),
    b28: bpaDe(v28, a[2].margen_ebitda_pct + dm, a[2].amortizacion_pct_ventas, FIN, a[2].tasa_impositiva_pct),
  };
};
const cb = caso(0, 0), cbaj = caso(-4.0, -6.0), calc = caso(3.0, 3.0);
export const BPA = { '2026e': bpa26, '2027e': cb.b27, Bajista: cbaj.b28, Base: cb.b28, Alcista: calc.b28, Bajista_2027: cbaj.b27 };

// Historia del PER en la MISMA base (beneficio neto GAAP ÷ acciones económicas) [A1, A6, A7, cuentas-xbrl]: 2016-2022 con
// las diluidas GAAP (no había convertible en el dinero ni warrants relevantes); 2023-2025 con las diluidas no GAAP
// (27,6, 27,3 y 30,4 M [A4]). Cierres de cada año de Yahoo [D1].
const cierres = { 2016: 91.35, 2017: 76.15, 2018: 66.43, 2019: 54.49, 2020: 60.68, 2021: 71.63, 2022: 49.48, 2023: 108.54, 2024: 193.72, 2025: 318.38 };
const bpaHist = { 2016: 8.78, 2017: 4.93, 2018: 1.84, 2019: 0.66, 2020: 1.44, 2021: 1.77, 2022: 3.07, 2023: 7.76, 2024: 13.14, 2025: 13.38, 2026: bpa26 };
const mediana = (l) => { const s = [...l].sort((x, y) => x - y), k = s.length >> 1; return s.length % 2 ? s[k] : (s[k - 1] + s[k]) / 2; };
// Atípicos con el mismo criterio que herramientas/historia-adelantada.mjs: PER ≥ 150x, o a más de 3 veces o menos de un
// tercio de la mediana del resto (con cinco años o más).
const marca = (filas) => {
  const pos = filas.filter((f) => f.per > 0 && f.per < 150);
  for (const f of pos) { const resto = pos.filter((x) => x !== f).map((x) => x.per); if (resto.length >= 4) { const m = mediana(resto); if (f.per > 3 * m || f.per < m / 3) f.atipico = true; } }
  return pos.filter((f) => !f.atipico);
};
const adel = Object.keys(cierres).map((y) => ({ anio: y, per: r1(cierres[y] / bpaHist[+y + 1]) }));
const limpiasA = marca(adel), u5 = limpiasA.slice(-5).map((f) => f.per), u8 = limpiasA.slice(-8).map((f) => f.per);
const alCierre = Object.keys(cierres).map((y) => ({ anio: y, per: r1(cierres[y] / bpaHist[y]) }));
const limpiasC = marca(alCierre), c5 = limpiasC.slice(-5).map((f) => f.per), c8 = limpiasC.slice(-8).map((f) => f.per);
export const PRECIO = 322.40;
// PER actual en la MISMA base que la historia: a 20-oct-2026 quedan 2,4 meses de 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * BPA['2026e'] + 9.6 / 12 * BPA['2027e']);
const media = (l) => r1(l.reduce((s, x) => s + x, 0) / l.length);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA['2026e']), solo_2027: r1(PRECIO / BPA['2027e']), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: r1(mediana(u5)), minimo_5a: Math.min(...u5), media_larga: media(u8), adel,
  v2: { mediana_5a: r1(mediana(c5)), minimo_5a: Math.min(...c5), media_larga: media(c8), alCierre },
};
const fmt = (l) => l.map((f) => `${f.anio} ${String(f.per).replace('.', ',')}x${f.per >= 150 ? ' (excluido, ≥150x)' : f.atipico ? ' (excluido, atípico)' : ''}`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER: { ...PER, adel: fmt(PER.adel), v2: { ...PER.v2, alCierre: fmt(PER.v2.alCierre) } } }, null, 1));

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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres programas de licencias (móviles, electrónica de consumo e IoT, y streaming) comparten la misma cartera de patentes, el mismo equipo de investigación y los mismos litigios; no hay partes que se puedan vender por separado ni resultados por segmento publicados [A1].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda = convertible de 2027 (380 M de principal; 378,2 contables), que se paga en caja (80,3 M
    // ya convertidos en el 3T26); caja = efectivo + inversiones a corto plazo (1.112,4). El exceso de conversión lo cubre la
    // opción comprada hasta 105,43 USD; por encima diluyen los warrants, que ya están en las 30,6 M de acciones económicas.
    // Arrendamientos operativos fuera (US GAAP). Sin minoritarios ni pensiones relevantes.
    puente: { fecha: '2026-06-30', deuda_financiera: 378.2, arrendamientos: 0, caja: 1112.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP por acción económica (la misma base que nuestros casos): precio de cierre de cada año (Yahoo [D1]) ÷ BPA real del año siguiente [A1, A6, A7] (2016-2022 con acciones diluidas GAAP; 2023-2025 con las diluidas no GAAP de la empresa, 27,6, 27,3 y 30,4 M, que no cuentan el convertible cubierto [A4]); para el cierre de 2025 (318,38), ÷ nuestro 2026e (${n2(BPA['2026e'])}, centro de la guía). Serie: ${fmt(PER.adel)}. Atípicos con el criterio común (a más de 3 veces o menos de un tercio de la mediana del resto): 2018 (BPA de 2019 hundido a 0,66 por litigios y fin de contratos) y 2022-2023 (BPA de 2023 y 2024 inflado por 141 y 460 M de cobros atrasados de Samsung, Apple y Lenovo). Mediana y mínimo de los últimos cinco años válidos (2019, 2020, 2021, 2024 y 2025); media de los siete válidos. PER actual = precio (322,40 USD, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA['2026e'])} + 9,6/12 de 2027e ${n2(BPA['2027e'])}). Con solo 2026e sería ${n2(PER.solo_2026)}x, con solo 2027e ${n2(PER.solo_2027)}x y con 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo año, misma base): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de los últimos cinco años válidos, media de los ocho últimos válidos.` },
      },
      comparables_per: { mediana: 17.0 },
      consenso: { bpa_ano1: 11.56, bpa_ano2: 11.27, objetivo_medio: 462.67, objetivo_min: 366, objetivo_max: 488, analistas: 4, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 20-oct-2026: BPA NO GAAP de 2026 de 11,56 USD (4 analistas; 9,62 hace 90 días) y de 2027 de 11,27 (11,24 hace 90 días); objetivo medio de 3 analistas (425-488) y Argus en 366 (14-oct) [D2, D6]' },
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
    { id: 1, titulo: 'Proyección propia de ingresos recurrentes y atrasados de InterDigital (ARR del 2T26, guía de 2026, objetivos de 2030)', editor: 'Análisis propio sobre A3, A4 y D9', tipo: 'Analistas', fecha: '2026-10-20', url: 'informes/interdigital-2026-10-20/notas/supuestos.mjs' },
  ],
  huecos: [],
};
