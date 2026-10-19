// Parte del analista (H&R Block, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de la empresa: sin amortización de intangibles comprados ni efectos fiscales discretos):
//   (ventas × margen del DCF + otros ingresos 27 − depreciación sin intangibles comprados 1,9 % de las ventas
//    − intereses 82) × (1 − 23 %) ÷ acciones diluidas.
// Calibrado con FY2026 real: 3.945,4 × 26,11 % + 26,8 − 75,5 − 80,6 = 900,8 × (1 − 23,6 %) = 688 M → 5,31 USD (publicado
// 5,31) y con la guía de FY2027 (4.135 × 26,6 % → 6,18 USD con 120,5 M de acciones de media; guía 6,04-6,24).
// Acciones: 122,5 M en circulación el 15-sep-2026 [C1] + 2,2 M de acciones de planes de incentivos = 124,7 M diluidas;
// menos la recompra GUIADA para FY2027 (≈ 400 M USD a ≈ 48 USD = 8,3 M) → 116,4 M al final de FY2027, que es la base de
// FY2028e, SIN recompras no anunciadas (quedan 200 M del programa que no se cuentan).
const VENTAS_FY26 = 3945.4, ACC28 = 116.4, ACC27 = 120.5;
const bpa = (v, margen, acc) => Math.round(((v * margen / 100 + 27 - v * 0.019 - 82) * 0.77) / acc * 100) / 100;
const caso = (dg, dm) => {
  const v27 = VENTAS_FY26 * (1 + (S.anios[0].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  return bpa(v28, S.anios[1].margen_ebitda_pct + dm, ACC28);
};
const c = Object.fromEntries(S.casos.map((x) => [x.escenario, x]));
export const BPA = {
  FY2027: bpa(VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100), S.anios[0].margen_ebitda_pct, ACC27),
  Bajista: caso(c.Bajista.ajuste_crecimiento_pp, c.Bajista.ajuste_margen_pp),
  Base: caso(0, 0),
  Alcista: caso(c.Alcista.ajuste_crecimiento_pp, c.Alcista.ajuste_margen_pp),
};

// Historia del PER en BPA AJUSTADO [A10, A9, A8, A6, A2]. Cierres a 30 de junio [D1]. El cierre de FY2020 (14,28, mínimo del
// COVID) sobre el BPA de FY2021 (3,94, con 15 días de la temporada 2020 por el aplazamiento al 15 de julio) se excluye.
const cierres = { FY2021: 23.48, FY2022: 35.32, FY2023: 31.87, FY2024: 54.23, FY2025: 54.89, FY2026: 38.08 };
const bpaAj = { FY2021: 3.94, FY2022: 3.51, FY2023: 3.82, FY2024: 4.41, FY2025: 4.66, FY2026: 5.31, FY2027: BPA.FY2027 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 48.67;
// PER actual en la misma base que la historia (precio ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan 8,4 meses
// de FY2027 y entran 3,6 de FY2028. (El beneficio es estacional, pero el año entero se gana entre febrero y abril: los 12
// meses siguientes contienen una temporada entera, la de 2027.)
export const BPA_NTM = r2(8.4 / 12 * BPA.FY2027 + 3.6 / 12 * BPA.Base);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / BPA.FY2027), solo_fy2028: r1(PRECIO / BPA.Base),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel,
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((x) => ({ ...x, narrativa: T.narrativas?.[x.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la empresa publica un solo segmento y la preparación fiscal en EE. UU. da el 88 % de los ingresos [A2]; Wave (122,7 M de ingresos, 3 %) y los servicios financieros (99,5 M) dependen de la misma base de clientes y no cambian el total.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: deuda 1.491,5 (bonos 1.500 netos de gastos); caja 958,7 (sin los 19,2 restringidos).
    // Arrendamientos operativos fuera (US GAAP: el alquiler está en el EBITDA). otros_ajustes = 77 M: recompras entre el
    // 30-jun y el 15-sep-2026 (124,2 → 122,5 M de acciones; ≈ 1,7 M a ≈ 45 USD), porque las acciones son de septiembre.
    // La pérdida estacional de julio-diciembre no se resta: el DCF cuenta el ejercicio FY2027 entero.
    puente: { fecha: '2026-06-30', deuda_financiera: 1491.5, arrendamientos: 0, caja: 958.7, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 77 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA AJUSTADO de la empresa (la misma base que nuestros casos y que la guía): precio de cierre de cada ejercicio (30 de junio, Yahoo [D1]) ÷ BPA ajustado real del ejercicio siguiente [A10, A9, A8, A6, A2]; para el cierre de FY2026 (38,08), ÷ nuestro FY2027e (${n2(BPA.FY2027)}, dentro de la guía de 6,04-6,24). Serie: ${fmt(adel)}. Mediana y mínimo de FY2022-FY2026; media de los seis cierres FY2021-FY2026. Fuera el cierre de FY2020 (14,28 USD, mínimo del COVID) sobre el BPA de FY2021 (3,94, con 15 días de la temporada 2020 por el aplazamiento del plazo al 15 de julio): daría 3,6x. Los ejercicios anteriores cerraban en abril y su historia no es comparable. PER actual = precio (48,67 USD, cierre del 16-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 8,4/12 de FY2027e + 3,6/12 de FY2028e ${n2(BPA.Base)}). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA ajustado del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2022-FY2026; media de FY2021-FY2026.` },
      },
      comparables_per: { mediana: 16.4 },
      consenso: { bpa_ano1: 6.15, bpa_ano2: 6.92, objetivo_medio: 51.67, objetivo_min: 36, objetivo_max: 60, analistas: 3, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 19-oct-2026: BPA ajustado FY2027 de 6,15 USD (5 analistas; 5,82 hace 90 días) y FY2028 de 6,92 (7,74 hace 90 días); objetivo medio de 3 analistas [D2]' },
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
    { id: 1, titulo: 'Cálculo propio del BPA FY2027e-FY2028e y de la historia del PER adelantada (notas/propio.mjs)', editor: 'Analista', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'informes/hr-block-2026-10-19/notas/propio.mjs' },
  ],
  huecos: [],
};
