// Parte del analista (Reply, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA PUBLICADO (Reply no publica un ajustado) con la proyección del DCF:
//   BAI = ventas × (margen EBITDA − 2,75 % de amortización) + resultado financiero recurrente
//   beneficio = BAI × (1 − 31,5 %) − minoritarios; BPA = beneficio ÷ acciones.
// Resultado financiero recurrente: intereses netos de la caja (≈ +6 M) menos deterioros de empresas emergentes (≈ −8 M; −20 en
// 2024 y −8,5 en 2025) ≈ −1 a −2 M; en 2026e, además, el ajuste de earn-out del 1S26 (−8,1 M).
// Calibración: 2025 real con este esquema (ventas 2.450, EBITDA 467,6, amortización 89,4, financiero −8,6 con +13,4 de earn-out,
// impuestos 31,7 %, minoritarios 1,7, 37,28 M de acciones) = 6,73 EUR, el publicado [A1].
// 2026e: 1S real (beneficio 131,8 M, 36,81 M de acciones medias [A2]) + 2S proyectado; acciones medias del año ≈ 36,57 M.
// Acciones: 36,33 M a 30-jul-2026 (37.411.428 − 1.083.192 propias) [A2, D2], SIN más recompras: el programa termina el 23-oct y
// la nueva autorización no tiene anuncio de uso.
const ACC = 36.33, TAX = 0.685;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const V25 = 2450.0;
const bpaAnio = (v, margen, fin, minor, acc) => r2(((v * (margen - 2.75) / 100 + fin) * TAX - minor) / acc);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
// 2026e: EBITDA del año al 18,3 % (1S 233,2 real + 2S), amortización 2,75 %, earn-out −8,1 y financiero ≈ −0,3.
const bpa26 = bpaAnio(v26, S.anios[0].margen_ebitda_pct, -8.4, 2.5, 36.57);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { b27: bpaAnio(v27, S.anios[1].margen_ebitda_pct + dm, -2, 2.6, ACC), b28: bpaAnio(v28, S.anios[2].margen_ebitda_pct + dm, -1, 2.8, ACC) };
};
const base = caso(0, 0), baj = caso(-4.0, -1.5), alc = caso(1.5, 0.5);
export const BPA = { '2026': bpa26, '2027': base.b27, Bajista: baj.b28, Base: base.b28, Alcista: alc.b28 };

// Historia del PER ADELANTADO: cierre de cada ejercicio [D1] ÷ BPA publicado del ejercicio siguiente [A1, A3, A5] (2015-2016
// reexpresados por el desdoblamiento de 2017); para el cierre de 2025, ÷ nuestro 2026e.
const cierres = { 2016: 29.5, 2017: 46.17, 2018: 44.08, 2019: 69.45, 2020: 95.3, 2021: 178.7, 2022: 107.0, 2023: 119.5, 2024: 153.4, 2025: 114.7 };
const bpaPub = { 2016: 1.81, 2017: 2.08, 2018: 2.67, 2019: 3.04, 2020: 3.30, 2021: 4.03, 2022: 5.13, 2023: 5.01, 2024: 5.65, 2025: 6.73, 2026: bpa26 };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaPub[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaPub[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b), c8 = alCierre.slice(-8).map((x) => x[1]);
export const PRECIO = 128.30;
// PER actual en la misma base: precio ÷ BPA de los 12 meses siguientes = 2,3/12 de 2026e + 9,7/12 de 2027e.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * base.b27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / base.b27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(c8.reduce((s, x) => s + x, 0) / c8.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las tres regiones venden lo mismo (consultoría e integración de tecnología) a clientes parecidos, comparten marca, ofertas y alianzas, y la empresa no da resultados por línea de negocio. Las ≈ 290 sociedades no cotizan por separado y las participaciones en empresas emergentes (11 M de asociadas en el balance) son pequeñas y ya van en el puente [A1, A2].', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda bancaria 39,8; arrendamientos 139,9; caja 512,8 + activos financieros corrientes 69,1 = 581,9;
    // minoritarios 2,1 (contable); pensiones = TFR 83,0 × (1 − 24 %) ≈ 63 (pasivo sin fondos, deducible); asociadas 11,0 (contable).
    // otros_ajustes = earn-out y opciones de venta de minoritarios 63,2 + recompra pagada entre el 30-jun y el 30-jul (203.146
    // acciones a ≈ 105 EUR ≈ 21 M; las acciones de hoy ya las descuentan) = 84,2. FedTec (julio) sin precio publicado: fuera.
    puente: { fecha: '2026-06-30', deuda_financiera: 39.8, arrendamientos: 139.9, caja: 581.9, minoritarios: 2.1, pensiones: 63.1, asociadas: 11.0, otros_ajustes: 84.2 },
    rab: null,
    referencia_mercado: { mercado: 'Europa / Italia (prima implícita de Damodaran, T12m with sustainable payout, S&P 500 como referencia)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D9]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA publicado (Reply no publica un ajustado; la misma base que nuestros casos y que el consenso): precio de cierre de cada ejercicio (Yahoo [D1]) ÷ BPA real del ejercicio siguiente [A1, A3, A5]; para el cierre de 2025 (114,70), ÷ nuestro 2026e (${n2(bpa26)}; consenso 7,70). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: no hay pérdidas ni años con el BPA deformado (los no recurrentes de 2024-2025 se compensan: +25,2 M de gasto y −29,0 M de ingreso). El pico de 2021 (34,8x) se deja: la mediana no depende de él. PER actual = precio (128,30 EUR, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(base.b27)}), la misma base que la historia. Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA publicado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 10.7 },
      consenso: { bpa_ano1: 7.70, bpa_ano2: 8.32, objetivo_medio: 153.36, objetivo_min: 121, objetivo_max: 195, analistas: 11, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 de 7,70 EUR (10 analistas; 7,44 hace 90 días) y de 2027 de 8,32 (7,96 hace 90 días); objetivo medio de 11 analistas [D2]' },
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
    { id: 1, titulo: 'Cálculos propios: EBITDA subyacente, BPA por escenario, PER adelantado, voto libre en la junta, cuota en Italia', editor: 'Análisis propio (notas/propio.mjs)', tipo: 'Propia', fecha: '2026-10-21', url: 'informes/reply-2026-10-21/notas/propio.mjs' },
    { id: 2, titulo: 'Fourth Quarter 2025 Earnings Call (transcripción): «the market is deteriorating our rates»; «Time & material will decrease a lot or almost disappear»', editor: 'Reply S.p.A.', tipo: 'Primaria', fecha: '2026-03-12', url: 'https://www.reply.com/contents/Fourth_Quarter_2025_Earnings_Call_Supporting_Materials.zip' },
  ],
  huecos: [],
};
