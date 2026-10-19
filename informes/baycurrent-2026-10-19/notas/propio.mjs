// Parte del analista (BayCurrent, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA (NIIF básico; la empresa no publica ajustado) con la proyección del DCF:
//   resultado operativo = ventas × (margen EBITDA del DCF − 2,1 % de amortización) + ingresos financieros netos
//   × (1 − 25,8 % de impuestos, el tipo efectivo de FY2025 y del 1S FY2026) ÷ acciones.
// Calibrado con FY2026e: 196.000 M × 33,1 % + 150 → 48.249 M ÷ 148,2 M de acciones medias (149,43 en el 1S y 146,98 desde
// la amortización de agosto) = 325,6 JPY (guía 323,79 con 190.000 M de ventas; consenso 326,07).
// Acciones: 146,98 M en circulación a 31-ago-2026, SIN recompras nuevas (la política de octubre las permite, sin importe).
const ACC = 146.98, T_IMP = 0.742, AM = 2.1;
const bpa = (v, margen, fin, acc) => Math.round(((v * (margen - AM) / 100 + fin) * T_IMP) / acc * 100) / 100;
const v26 = 196000;
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 150, 148.2);
const caso = (dg, dm) => {
  const v27 = v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
  const v28 = v27 * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return { FY2027: bpa(v27, S.anios[1].margen_ebitda_pct + dm, 200, ACC), FY2028: bpa(v28, S.anios[2].margen_ebitda_pct + dm, 250, ACC) };
};
const cb = caso(0, 0), cbaj = caso(-8.0, -4.0), calc_ = caso(4.0, 1.5);
export const BPA = { FY2026: bpa26, FY2027: cb.FY2027, FY2028: cb.FY2028, Bajista: cbaj.FY2028, Base: cb.FY2028, Alcista: calc_.FY2028, Bajista27: cbaj.FY2027, Alcista27: calc_.FY2027 };

// Historia del PER [D1]: cierres del último día de febrero (ejercicio «inicio»: el cierre de FY2024 es el 28-feb-2025).
// BPA real de cada ejercicio de los tanshin [A1, A6, A7] (split 10:1 de 2022 ya aplicado).
const cierres = { FY2017: 332.5, FY2018: 333, FY2019: 644, FY2020: 2144, FY2021: 4535, FY2022: 5350, FY2023: 3354, FY2024: 6364, FY2025: 4505 };
const bpaReal = { FY2017: 18.84, FY2018: 20.27, FY2019: 38.91, FY2020: 65.45, FY2021: 101.39, FY2022: 142.96, FY2023: 166.04, FY2024: 202.16, FY2025: 249.16, FY2026: BPA.FY2026 };
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adel = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaReal[sig(a)])]);
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).slice(1).map((a) => [a, r1(cierres[a] / bpaReal[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 10740;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 19-oct-2026 quedan 4,3 meses de
// FY2026 (hasta el 28-feb-2027) y entran 7,7 de FY2027.
export const BPA_NTM = r2(4.3 / 12 * BPA.FY2026 + 7.7 / 12 * BPA.FY2027);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2026: r1(PRECIO / BPA.FY2026), solo_fy2027: r1(PRECIO / BPA.FY2027),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 2, etiqueta_ejercicio: 'inicio', normas_contables: 'NIIF', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (consultoría) y un solo segmento contable [A5].', confianza: 'Alta' },
  valoracion: {
    // Puente a 31-ago-2026 [A3]: sin deuda bancaria; arrendamientos 3.201 + 5.672 = 8.873; caja 54.483 + depósitos a plazo
    // a corto 3.020 = 57.503. otros_ajustes = dividendo a cuenta de 65 JPY con fecha de registro 31-ago-2026, pagadero el
    // 30-nov (9.554 M): la caja de agosto lo incluye y quien compra hoy ya no lo cobra. Las fianzas de oficinas (no corrientes)
    // no se suman: son operativas.
    puente: { fecha: '2026-08-31', deuda_financiera: 0, arrendamientos: 8873, caja: 57503, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 9554 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA: precio de cierre de cada ejercicio (último día de febrero, Yahoo [D1]) ÷ BPA real del ejercicio siguiente [A1, A6, A7]; para el cierre de FY2025 (4.505 JPY, 27-feb-2026, en plena «sacudida Anthropic»), ÷ nuestro FY2026e (${n2(BPA.FY2026)}; guía 323,79, consenso 326,07). Ejercicios etiquetados por el año en que empiezan. Serie: ${fmt(adel)}. Mediana y mínimo de FY2021-FY2025; media de FY2018-FY2025. Sin exclusiones: no hay pérdidas ni BPA atípicos; el mínimo de cinco años (FY2025) es el pánico por la IA de febrero de 2026, un precio real de hace ocho meses. PER actual = precio (10.740 JPY, cierre del 19-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 4,3/12 de FY2026e ${n2(BPA.FY2026)} + 7,7/12 de FY2027e ${n2(BPA.FY2027)}). Con solo FY2026e sería ${n2(PER.solo_fy2026)}x y con solo FY2027e ${n2(PER.solo_fy2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA del mismo ejercicio): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de FY2021-FY2025, media de FY2018-FY2025.` },
      },
      comparables_per: { mediana: 12.3 },
      consenso: { bpa_ano1: 326.07, bpa_ano2: 408.81, objetivo_medio: 9341.54, objetivo_min: 8000, objetivo_max: 11200, analistas: 13, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 19-oct-2026: BPA de FY2026 (año a feb-2027) de 326,07 JPY (14 analistas; 288,24 hace 90 días) y de FY2027 de 408,81 (403,90 hace 90 días); objetivo medio de 13 analistas [D2]' },
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
  fuentes: [],
  huecos: [],
};
