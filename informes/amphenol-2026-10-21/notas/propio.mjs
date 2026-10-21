// Parte del analista (Amphenol, corte 2026-10-21). Citas con la letra de la nota: [A4] = fuente 4 de A.json; [P1] = fuente propia.
// Todas las cifras por acción en acciones de HOY (split 2×1 efectivo el 2-sep-2026 [A10]; los anteriores de 2021 y 2024 ya
// estaban en la serie): el BPA ajustado de 2025 publicado (3,34 USD) es 1,67 en acciones de hoy.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin revalorización de existencias compradas, gastos de compras, beneficio fiscal de
// la remuneración en acciones ni partidas fiscales discretas; SÍ resta la amortización de intangibles comprados), con la
// proyección del DCF:
//   resultado operativo ajustado = ventas × (margen del DCF + 0,5 puntos que el DCF resta por los costes de compras − amortización
//   total % ventas) − intereses y otros netos, × (1 − 27 % de tipo ajustado guiado [A4]) × (1 − 0,8 % de minoritarios, el de 2025)
//   ÷ acciones diluidas.
// Calibrado con el 1S26 real (ventas 16.378, resultado operativo ajustado 4.688,8, intereses ≈ 390 → 1,21 USD, igual que el
// publicado [A4]) y con la guía del 3T26 (0,70-0,71): 2026e da 2,68 frente a 2,69 del consenso [D2].
// Acciones: 2.578 M diluidas en el 2T26 (1.289,2 antes del split [A2]); recompras (≈ 1.000 M USD al año en 2025-2026) compensan
// la dilución de opciones (≈ 1 % anual): 2.575 M en 2027e y 2.570 M en 2028e. Intereses y otros: 790 M en 2026e (≈ 200 por
// trimestre guiados [A4]), 760 en 2027e y 700 en 2028e (la deuda neta baja con el flujo libre).
const VENTAS_25 = 23094.7;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margenDcf, am, interes, acc) => r2(((v * (margenDcf + 0.5 - am) / 100 - interes) * 0.73 * 0.992) / acc);
const [a26, a27, a28] = S.anios;
const v26 = VENTAS_25 * (1 + a26.crecimiento_pct / 100);
const bpa26 = bpa(v26, a26.margen_ebitda_pct, a26.amortizacion_pct_ventas, 790, 2578);
const caso = (nombre) => {
  const c = S.casos.find((x) => x.escenario === nombre);
  const aj = (per) => c.perfil?.find((p) => p.periodo === per) ?? { crecimiento_pp: c.ajuste_crecimiento_pp, margen_pp: c.ajuste_margen_pp };
  const p27 = aj('2027e'), p28 = aj('2028e');
  const v27 = v26 * (1 + (a27.crecimiento_pct + p27.crecimiento_pp) / 100);
  const v28 = v27 * (1 + (a28.crecimiento_pct + p28.crecimiento_pp) / 100);
  return {
    b27: bpa(v27, a27.margen_ebitda_pct + p27.margen_pp, a27.amortizacion_pct_ventas, 760, 2575),
    b28: bpa(v28, a28.margen_ebitda_pct + p28.margen_pp, a28.amortizacion_pct_ventas, nombre === 'Bajista' ? 760 : 700, 2570),
    v27: Math.round(v27), v28: Math.round(v28),
  };
};
export const CASOS = { Bajista: caso('Bajista'), Base: caso('Base'), Alcista: caso('Alcista') };
export const BPA = { '2026e': bpa26, '2027e': CASOS.Base.b27, Bajista: CASOS.Bajista.b28, Base: CASOS.Base.b28, Alcista: CASOS.Alcista.b28 };

// Historia del PER en la base del BPA AJUSTADO publicado [A6, A8], pasado a acciones de hoy (÷ 8 hasta 2020, ÷ 4 en 2021-2023,
// ÷ 2 en 2024-2025). Cierres de cada ejercicio ajustados por los splits [D1].
const cierres = { 2018: 10.13, 2019: 13.53, 2020: 16.35, 2021: 21.86, 2022: 19.03, 2023: 24.78, 2024: 34.72, 2025: 67.57 };
const bpaAj = { 2019: 0.4675, 2020: 0.4675, 2021: 0.62, 2022: 0.75, 2023: 0.7525, 2024: 0.945, 2025: 1.67, 2026: bpa26 };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 79.32;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 2,3 meses de
// 2026 y entran 9,7 de 2027 → BPA de los próximos 12 meses = 2,3/12 × 2026e + 9,7/12 × 2027e.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / BPA['2027e']), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, CASOS, BPA_NTM, PER }, null, 1));

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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres segmentos (Communications Solutions, Harsh Environment Solutions e Interconnect and Sensor Systems; CCS dentro de Communications) fabrican lo mismo, conectores, cables y sensores, con la misma organización descentralizada, los mismos clientes industriales y márgenes parecidos (27-34 % operativo en el 2T26) [A2]. Separarlos no revela valor escondido: los comparables de cada uno serían los mismos (TE, Molex, Corning en fibra).', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda financiera 18.811,3 (1.634,3 a corto); caja e inversiones a corto 5.419,1. Minoritarios
    // 121,5 + 9,0 rescatables = 130,5. Pensiones: déficit de 158,9 × (1 − 25 %) ≈ 119. Arrendamientos operativos fuera (US GAAP).
    // otros_ajustes: asunto fiscal de China pendiente de pago (230 M de avisos de pago a marzo de 2026, ya provisionados en
    // pasivos fiscales del balance): 0, no se resta dos veces.
    puente: { fecha: '2026-06-30', deuda_financiera: 18811.3, arrendamientos: 0, caja: 5419.1, minoritarios: 130.5, pensiones: 119, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso; no quita la amortización de intangibles), en acciones de hoy: cierre de cada ejercicio (Yahoo, ajustado por los splits [D1]) ÷ BPA ajustado real del ejercicio siguiente [A6, A8]; para el cierre de 2025 (67,57), ÷ nuestro 2026e (${n2(bpa26)}; consenso 2,69). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: el BPA ajustado no tiene pérdidas ni años anómalos (2020 cae un 0 % con la pandemia). PER actual = precio (79,32 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(BPA['2027e'])}), la misma base que la historia. Con solo 2026e sería ${n2(PER.solo_2026)}x, con solo 2027e ${n2(PER.solo_2027)}x y con 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio, acciones de hoy): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2019-2025. Sale alta porque el BPA se duplicó en 2024-2025 y el mercado lo anticipaba en el precio de cierre.` },
      },
      comparables_per: { mediana: 18.5 },
      consenso: { bpa_ano1: 2.69, bpa_ano2: 3.33, objetivo_medio: 102.97, objetivo_min: 85, objetivo_max: 116, analistas: 19, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA ajustado 2026 de 2,69 USD (18 analistas; 2,45 hace 90 días) y 2027 de 3,33 (19 analistas; 2,92 hace 90 días); objetivo medio de 19 analistas [D2]' },
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
    { id: 1, titulo: 'Modelo propio de BPA ajustado 2026e-2028e y de la historia del PER adelantado (notas/propio.mjs y supuestos.mjs)', editor: 'Repositorio de análisis (informes/amphenol-2026-10-21/notas)', tipo: 'Propia', fecha: '2026-10-21', url: 'informes/amphenol-2026-10-21/notas/propio.mjs' },
  ],
  huecos: [],
};
