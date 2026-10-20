// Parte del analista (Philip Morris International, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados, reestructuración, deterioros, ajustes de
// valor razonable de participaciones ni el efecto fiscal de la financiación de Swedish Match), con la proyección del DCF:
//   EBITDA ajustado = ventas × (margen del DCF + 0,30 puntos que el DCF resta por las partidas excluidas que se repiten)
//   − depreciación (2,45 % de las ventas: 993 M en 2025) − costes financieros netos (≈ 1.000 M; guía 2026 «estables»)
//   × (1 − 21,5 %, guía de tipo efectivo) + participadas (≈ 150 M) − minoritarios (500 M en 2025, +5 % al año)
//   ÷ acciones diluidas (1.557 M; la empresa no recompra en 2026 y no anuncia recompras después).
// Calibrado con 2025 real (ventas 40.648, EBITDA ajustado 17.421, costes financieros 1.012 → 7,54, igual que el publicado)
// y con la guía de 2026 (8,35-8,50 USD en septiembre, 8,26-8,41 en julio; consenso 8,41).
const V25 = 40648, ACC = 1557;
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const bpa = (v, margenDcf, fin, minor) => r2((((v * (margenDcf + 0.30 - 2.45) / 100) - fin) * 0.785 + 150 - minor) / ACC);
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
const v28 = (dg) => v27(dg) * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
export const BPA = {
  '2025': r2(((V25 * 0.4286 - V25 * 0.0245 - 1012) * 0.785 + 150 - 500) / 1558),
  '2026e': bpa(v26, S.anios[0].margen_ebitda_pct, 1030, 525),
  '2027e': bpa(v27(0), S.anios[1].margen_ebitda_pct, 1000, 550),
};
const caso = (dg, dm) => bpa(v28(dg), S.anios[2].margen_ebitda_pct + dm, 960, 580);
BPA.Bajista = caso(-2.0, -2.5);
BPA.Base = caso(0, 0);
BPA.Alcista = caso(1.0, 0.8);

// Historia del PER ADELANTADO en BPA AJUSTADO publicado [A2, A7-A10]: cierre de cada año (Yahoo [D1]) ÷ BPA ajustado real
// del año siguiente; para el cierre de 2025, ÷ nuestro 2026e.
const cierres = { 2017: 105.65, 2018: 66.76, 2019: 85.09, 2020: 82.79, 2021: 95.0, 2022: 101.21, 2023: 94.08, 2024: 120.35, 2025: 160.4 };
const bpaAj = { 2017: 4.72, 2018: 5.10, 2019: 5.19, 2020: 5.17, 2021: 6.08, 2022: 5.98, 2023: 6.01, 2024: 6.57, 2025: 7.54, 2026: BPA['2026e'] };
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 201.05;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 2,4 meses de
// 2026 y entran 9,6 de 2027 → BPA de los próximos 12 meses = 2,4/12 × 2026e + 9,6/12 × 2027e.
export const BPA_NTM = r2(2.4 / 12 * BPA['2026e'] + 9.6 / 12 * BPA['2027e']);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / BPA['2026e']), solo_2027: r1(PRECIO / BPA['2027e']),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
if (process.argv[1]?.endsWith('propio.mjs')) console.log(JSON.stringify({ BPA, BPA_NTM, PER }, null, 1));

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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A3 = 10-Q del 2T26]: deuda financiera 49.113 (3.341 a corto + 45.772 a largo, con 99 de
    // arrendamientos financieros); caja 5.999. Minoritarios a ≈ 12 veces su beneficio de 12 meses (556 M) ≈ 6.670 (en libros
    // 1.926: son filiales de Oriente Medio, Indonesia y Egipto que valen más que su coste). Asociadas ≈ 2.042 (1.008 por puesta
    // en equivalencia + 983 de participaciones a valor razonable + 51 de RBH tras el deterioro). Pensiones: déficit de 578 M
    // antes de impuestos ≈ 460 después. Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-06-30', deuda_financiera: 49113, arrendamientos: 0, caja: 5999, minoritarios: 6670, pensiones: 460, asociadas: 2042, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que el consenso): precio de cierre de cada año (Yahoo [D1]) ÷ BPA ajustado real del año siguiente [A2, A7, A8, A9, A10]; para el cierre de 2025 (160,40 USD), ÷ nuestro 2026e (${n2(BPA['2026e'])}, en el extremo bajo de la guía de 8,35-8,50 dada en septiembre [A13]). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: el BPA ajustado no tiene pérdidas ni saltos de perímetro grandes salvo Swedish Match (nov-2022), cuya amortización está fuera. PER actual = precio (201,05 USD, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(BPA['2026e'])} + 9,6/12 de 2027e ${n2(BPA['2027e'])}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo año): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 13.5 },
      consenso: { bpa_ano1: 8.41, bpa_ano2: 9.18, objetivo_medio: 208.71, objetivo_min: 175, objetivo_max: 230, analistas: 15, tendencia_3m: 'estable', fuente: 'Yahoo Finance, 19-oct-2026: BPA ajustado de 2026 de 8,41 USD y de 2027 de 9,18; objetivo medio de 15 analistas (11 comprar, 4 mantener) [D2]' },
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
    { id: 1, titulo: 'Implied ERP by month (prima de riesgo implícita del S&P 500), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Académica', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html' },
    { id: 2, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (bono a 10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Oficial', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_par_yield_curve&field_tdr_date_value=2026' },
  ],
  huecos: [],
};
