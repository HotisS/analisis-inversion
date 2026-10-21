// Parte del analista (Monster Beverage, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Todo BPA y número de acciones en acciones de HOY (después del split 2:1 del 11-ago-2026).
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA GAAP diluido (con las pérdidas del alcohol; sin deterioros nuevos), con la proyección del DCF:
//   EBIT = ventas × (margen EBITDA del DCF − amortizaciones 1,25 %) + resultado financiero (intereses de la caja que se
//   acumula al ≈ 3 %, menos diferencias de cambio) × (1 − 23,5 %) ÷ acciones diluidas.
// Calibrado con 2025 real (8.294,3 de ventas, margen 31,2 % sin deterioros, financiero 63 → 0,99 frente a 0,97 publicado con
// 50 M de deterioros) y con el 1S26 (0,58 USD).
// Acciones: 1.977 M diluidas en el 2T26 (10-Q, proforma del split) [A2]; +0,5 % al año por pagos en acciones, SIN recompras
// no anunciadas: la caja que no se recompra rinde intereses (de ahí el resultado financiero creciente).
const VENTAS_25 = 8294.3;
const FIN = { '2026e': 115, '2027e': 175, '2028e': 245 };
const ACC = { '2026e': 1975, '2027e': 1985, '2028e': 1995 };
const bpa = (v, margen, fin, acc) => Math.round(((v * (margen - 1.25) / 100 + fin) * (1 - 0.235)) / acc * 1000) / 1000;
const g = S.anios.map((a) => a.crecimiento_pct), mg = S.anios.map((a) => a.margen_ebitda_pct);
const v26 = VENTAS_25 * (1 + g[0] / 100);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (g[1] + dg) / 100), v28 = v27 * (1 + (g[2] + dg) / 100);
  return { b27: bpa(v27, mg[1] + dm, FIN['2027e'], ACC['2027e']), b28: bpa(v28, mg[2] + dm, FIN['2028e'], ACC['2028e']), v28 };
};
const base = caso(0, 0), baj = caso(-4.0, -1.5), alc = caso(2.0, 0.8);
export const BPA = { '2026e': bpa(v26, mg[0], FIN['2026e'], ACC['2026e']), '2027e': base.b27, Bajista: baj.b28, Base: base.b28, Alcista: alc.b28 };

// Historia del PER [D1, A7]: cierre de cada ejercicio (31-dic, Yahoo, ajustado por splits) y BPA GAAP diluido real en acciones
// de hoy (beneficio neto ÷ acciones diluidas × 2 en 2021-2025 y × 4 en 2016-2020).
const cierres = { 2016: 11.09, 2017: 15.82, 2018: 12.31, 2019: 15.89, 2020: 23.12, 2021: 24.01, 2022: 25.38, 2023: 28.81, 2024: 26.28, 2025: 38.33 };
const bpaReal = { 2016: 0.297, 2017: 0.356, 2018: 0.440, 2019: 0.507, 2020: 0.659, 2021: 0.643, 2022: 0.559, 2023: 0.771, 2024: 0.745, 2025: 0.968, 2026: BPA['2026e'] };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b), c8 = alCierre.slice(-8).map((x) => x[1]);
export const PRECIO = 47.04;
// PER actual = precio ÷ nuestro BPA del ejercicio siguiente (2027e), como dice objetivo-12m.md. Con el BPA de los próximos
// 12 meses (2,3/12 de 2026e + 9,7/12 de 2027e) sería algo mayor.
export const BPA_NTM = r2(2.3 / 12 * BPA['2026e'] + 9.7 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA['2027e']), ntm: r1(PRECIO / BPA_NTM), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(c8.reduce((s, x) => s + x, 0) / c8.length), alCierre },
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
    etapa2: { ...S.etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la bebida energética (Monster Energy Drinks y Strategic Brands) es el 98 % de las ventas y más del 100 % del resultado de los segmentos; el alcohol pierde dinero (−127 M USD en 2025) y vale poco por separado (sus activos ya se han deteriorado en ≈ 230 M) [A1]. Un cierre o venta del alcohol subiría el BPA ≈ 0,03-0,04 USD.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: sin deuda financiera; caja + inversiones a corto y largo = 2.192,4 + 1.226,8 + 781,3 = 4.200,5.
    // Sin minoritarios. Arrendamientos operativos fuera (US GAAP). Los ingresos diferidos de Coca-Cola (≈ 200 M, que se
    // reconocen como ventas sin caja) no se restan: su efecto es menor del 0,3 % del valor.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 0, caja: 4200.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA GAAP diluido (la misma base que nuestros casos), en acciones de hoy: precio de cierre de cada ejercicio (31-dic, Yahoo, ajustado por los splits de 2023 y 2026 [D1]) ÷ BPA real del ejercicio siguiente [A7, A1]; para el cierre de 2025 (38,33), ÷ nuestro 2026e (${n2(BPA['2026e'])}, consenso 1,15). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: no hay años con pérdidas; 2024 lleva 135 M de deterioros del alcohol (con ellos fuera, el BPA de 2024 sería ≈ 0,80 y el PER de 2023 ≈ 36 en vez de ${n2(adel.find((x) => x[0] === '2023')[1])}: la mediana no cambia). PER actual = precio (47,04 USD, cierre del 20-oct-2026) ÷ nuestro BPA de 2027e (${n2(BPA['2027e'])}), el ejercicio siguiente. Con el BPA de los próximos 12 meses (${n2(BPA_NTM)}) sería ${n2(PER.ntm)}x y con 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA GAAP del mismo ejercicio, en acciones de hoy): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 15.8 },
      consenso: { bpa_ano1: 1.15, bpa_ano2: 1.31, objetivo_medio: 49.85, objetivo_min: 35, objetivo_max: 57, analistas: 23, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 1,15 USD (11 analistas; 1,13 hace 90 días) y de 2027 de 1,31 (13 analistas; 1,28 hace 90 días); objetivo medio de 23 analistas [D2]' },
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
    { id: 1, titulo: 'Cálculos propios del analista: BPA por escenario, historia del PER en acciones de hoy, DCF (supuestos.mjs y propio.mjs)', editor: 'Repositorio de análisis (informes/monster-2026-10-21/notas)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/monster-2026-10-21/notas/propio.mjs' },
  ],
  huecos: [],
};
