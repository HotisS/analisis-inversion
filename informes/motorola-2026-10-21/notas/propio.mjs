// Parte del analista (Motorola Solutions, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA NO GAAP (definición de la empresa: sin pagos en acciones, amortización de intangibles comprados ni partidas destacadas;
// es la base de la guía y del consenso), con la proyección del DCF:
//   resultado operativo no GAAP = ventas × (margen del DCF + 1,95 puntos: pagos en acciones 3,2 + reestructuración 0,45
//   − depreciación 1,7) − intereses y otros (≈ 335-340 M: deuda de ≈ 9.000 M al 4-5 % tras la compra de Silvus, menos
//   ingresos financieros y la parte de pensiones) × (1 − 22,5 % de tipo no GAAP, centro de la guía del 22-22,5 %) ÷ acciones.
// Calibrado con la guía de 2026 (ventas 12.975, 168 M de acciones → 17,64; guía 17,62-17,72, consenso 17,72 [D2]).
// Acciones: 165,5 M en circulación el 31-jul-2026 [A3] + ≈ 2,5 M de dilución de opciones y acciones = 168 M en 2026e;
// 167,5 M en 2027e y 167 M en 2028e con recompras que solo compensan la dilución (sin recompras netas no anunciadas).
// Los casos aplican el ajuste del escenario (crecimiento y margen) a 2027e y 2028e, como el DCF.
const VENTAS_25 = 11682;
const bpa = (v, margenDcf, interes, acc) => Math.round(((v * (margenDcf + 1.95) / 100 - interes) * 0.775) / acc * 100) / 100;
const v26 = VENTAS_25 * (1 + S.anios[0].crecimiento_pct / 100);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 335, 168.0);
const v27 = v26 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa27 = bpa(v27, S.anios[1].margen_ebitda_pct, 340, 167.5);
const caso = (dg, dm) => {
  const a = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const b = a * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return bpa(b, S.anios[2].margen_ebitda_pct + dm, 340, 167.0);
};
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-3.0, -1.5), Base: caso(0, 0), Alcista: caso(1.5, 0.5) };

// Historia del PER en la base del BPA NO GAAP publicado [A4-A13]. Cierres a 31 de diciembre (Yahoo [D1]).
const cierres = { 2017: 90.34, 2018: 115.04, 2019: 161.14, 2020: 170.06, 2021: 271.70, 2022: 257.71, 2023: 313.09, 2024: 462.23, 2025: 383.32 };
const bpaAj = { 2017: null, 2018: 7.15, 2019: 7.96, 2020: 7.69, 2021: 9.15, 2022: 10.36, 2023: 11.95, 2024: 13.84, 2025: 15.38, 2026: bpa26 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 463.46;
// PER actual en la MISMA base que la historia (precio en una fecha ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan
// 2,3 meses de 2026 y entran 9,7 de 2027 → BPA de los próximos 12 meses = 0,19 × 2026e + 0,81 × 2027e.
export const BPA_NTM = r2(0.19 * bpa26 + 0.81 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / bpa27), solo_2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
export const RESUMEN_PER = { fmtAdel: fmt(adel), fmtCierre: fmt(alCierre) };

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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica como método de valoración: los dos segmentos (Productos e Integración de Sistemas, 58 % de las ventas de 2025, y Software y Servicios, 42 %) venden a los mismos clientes (policía, bomberos, emergencias, administraciones) y los servicios y el software se apoyan en la base instalada de radios y redes ASTRO y TETRA [A1]. Separarlos daría un resultado parecido al DCF con más supuestos.', confianza: 'Media' },
  valoracion: {
    // Puente al 4-jul-2026 (10-Q del 2T26 [A2]): deuda financiera 9.032 (bonos y papel comercial, sin arrendamientos operativos:
    // US GAAP); caja 710; minoritarios 16; pensiones: déficit de ≈ 418 M antes de impuestos × 0,77 = 322; asociadas e
    // inversiones 300; otros_ajustes = earnout de Silvus pendiente (127). Los cobros pendientes de Hytera (100 M al año
    // ordenados por el tribunal; 232 M cobrados) son un potencial al alza y no se suman.
    puente: { fecha: '2026-07-04', deuda_financiera: 9032, arrendamientos: 0, caja: 710, minoritarios: 16, pensiones: 322, asociadas: 300, otros_ajustes: 127 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA NO GAAP de la empresa (la misma base que nuestros casos, la guía y el consenso): precio de cierre de cada ejercicio (31 de diciembre, Yahoo [D1]) ÷ BPA no GAAP real del ejercicio siguiente [A8, A5]; para el cierre de 2025 (383,32 USD), ÷ nuestro 2026e (${n2(bpa26)}, dentro de la guía de 17,62-17,72). Serie: ${fmt(adel)}. Mediana y mínimo de 2021-2025; media de 2018-2025. Sin exclusiones: el BPA no GAAP no tiene pérdidas. El de 2024 (30,1x) recoge el máximo de la acción tras el 4T24; el de 2017 (12,6x) queda fuera de la media. PER actual = precio (463,46 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 0,19 × 2026e ${n2(bpa26)} + 0,81 × 2027e ${n2(bpa27)}), la misma base que la historia. Con solo 2027e sería ${n2(PER.solo_2027)}x y con solo 2028e ${n2(PER.solo_2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA no GAAP del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de 2021-2025, media de 2018-2025.` },
      },
      comparables_per: { mediana: 19.6 },
      consenso: { bpa_ano1: 17.72, bpa_ano2: 19.43, objetivo_medio: 526.91, objetivo_min: 476, objetivo_max: 550, analistas: 11, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA no GAAP 2026 de 17,72 USD (5 analistas; 16,98 hace 90 días) y 2027 de 19,43 (18,52 hace 90 días); objetivo medio de 11 analistas [D2]' },
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
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/' },
    { id: 2, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Mercado', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/' },
  ],
  huecos: [],
};
