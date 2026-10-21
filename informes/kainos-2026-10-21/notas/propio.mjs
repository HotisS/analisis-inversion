// Parte del analista (Kainos Group, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { FIN, ACC } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?t=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA CONTABLE diluido (con la remuneración en acciones como gasto) con la proyección del DCF:
//   (ventas × (margen EBITDA contable − amortización 1,4 %) + intereses netos de la caja) × (1 − 26,5 %) ÷ acciones.
// Calibrado con FY2026 real: 431,1 × (14,06 − 1,36) % = 54,8 + 3,3 = 58,1 × (1 − 26,8 %) = 42,5 M ÷ 121,1 M = 0,351 GBP
// (publicado 35,1 p [A1]). Acciones: 116,26 M en circulación el 1-oct-2026 [C7] + ≈ 0,3 M de dilución = 116,6 M, SIN
// recompras nuevas (el consejo dice que no tiene planes [A2]); la media de FY2027e es algo mayor (la recompra terminó el
// 15-may-2026): ≈ 116,8 M.
const VENTAS_FY26 = 431.1, AM = 1.4, IMP = 0.265;
const r1 = (x) => Math.round(x * 10) / 10;
const r3 = (x) => Math.round(x * 1000) / 1000;
const bpa = (v, margen, fin, acc) => r3(((v * (margen - AM) / 100 + fin) * (1 - IMP)) / acc);
const v27 = VENTAS_FY26 * (1 + S.anios[0].crecimiento_pct / 100);
const v28 = v27 * (1 + S.anios[1].crecimiento_pct / 100);
const bpa27 = bpa(v27, S.anios[0].margen_ebitda_pct, FIN[0], 116.8);
const bpa28 = bpa(v28, S.anios[1].margen_ebitda_pct, FIN[1], ACC);
const caso = (dg, dm) => {
  const a = v27 * (1 + (S.anios[1].crecimiento_pct + dg) / 100) * (1 + (S.anios[2].crecimiento_pct + dg) / 100);
  return bpa(a, S.anios[2].margen_ebitda_pct + dm, FIN[2], ACC);
};
const cB = S.casos.find((c) => c.escenario === 'Bajista'), cA = S.casos.find((c) => c.escenario === 'Alcista');
export const BPA = { FY2027: bpa27, FY2028: bpa28, Bajista: caso(cB.ajuste_crecimiento_pp, cB.ajuste_margen_pp), Base: caso(0, 0), Alcista: caso(cA.ajuste_crecimiento_pp, cA.ajuste_margen_pp) };
BPA.FY2029 = BPA.Base;
export const VENTAS = { FY2027: r1(v27), FY2028: r1(v28), FY2029: r1(v28 * (1 + S.anios[2].crecimiento_pct / 100)) };

// Historia del PER en BPA CONTABLE diluido [A1, A6, A8]; FY2025 NORMALIZADO sin la reestructuración (28,2 p publicado + 4,9 p
// = 6,2 M tras impuestos ÷ 126,1 M [A3]). Cierres a 31 de marzo en GBP [D1].
const cierres = { FY2018: 3.40, FY2019: 5.52, FY2020: 6.58, FY2021: 14.92, FY2022: 13.23, FY2023: 13.82, FY2024: 9.655, FY2025: 6.64, FY2026: 7.30 };
const bpaC = { FY2019: 0.139, FY2020: 0.151, FY2021: 0.321, FY2022: 0.285, FY2023: 0.331, FY2024: 0.386, FY2025: 0.331, FY2026: 0.351, FY2027: bpa27 };
const EXCL = ['FY2021']; // cierre de la burbuja tecnológica de 2021 (52x adelantado; la acción cayó un 71 % después)
const sig = (a) => 'FY' + (+a.slice(2) + 1);
const adelTodo = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaC[sig(a)])]);
const adel = adelTodo.filter(([a]) => !EXCL.includes(a));
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b), u8 = adel.slice(-8).map((x) => x[1]);
const alCierre = Object.keys(cierres).filter((a) => bpaC[a] && !EXCL.includes(a)).map((a) => [a, r1(cierres[a] / bpaC[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 13.20;
// PER actual en la MISMA base que la historia (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 5,3 meses de
// FY2027e y entran 6,7 de FY2028e.
export const BPA_NTM = r3(5.3 / 12 * bpa27 + 6.7 / 12 * bpa28);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_fy2027: r1(PRECIO / bpa27), solo_fy2028: r1(PRECIO / bpa28),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(u8.reduce((s, x) => s + x, 0) / u8.length), adel, adelTodo,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
const pen = (x) => n2(r1(x * 100));

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'GBP', divisa_cotizacion: 'GBp', tipo_cambio: 0.01, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Puente a 31-mar-2026 [A1, A2]: caja y depósitos 89,1; deuda financiera 0; arrendamientos 6,1. otros_ajustes = salidas de
    // caja después del cierre que ya no son del comprador de hoy: recompra de 11,6 M (abr-may 2026; las acciones del cálculo
    // son las de octubre, ya sin esas) + dividendo final de 19,8 p × 116,26 M = 23,0 M (ex-dividendo el 1-oct-2026) = 34,6 M.
    // El inmueble de inversión (3,9 M) no se suma: pequeño y se usa para la sede.
    puente: { fecha: '2026-03-31', deuda_financiera: 0, arrendamientos: 6.1, caja: 89.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 34.6 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA CONTABLE diluido (la misma base que nuestros casos): precio de cierre de cada ejercicio (31 de marzo, Yahoo [D1]) ÷ BPA contable del ejercicio siguiente [A1, A6, A8], con FY2025 normalizado sin la reestructuración (33,1 p en vez de 28,2 p [A3]); para el cierre de FY2026 (7,30 GBP), ÷ nuestro FY2027e (${pen(bpa27)} p). Serie: ${fmt(adelTodo)}. Se excluye el cierre de FY2021 (burbuja de 2021: 52x, y la acción cayó un 71 % después). Mediana y mínimo de los cierres FY2022-FY2026; media de FY2018-FY2026 sin FY2021. PER actual = precio (13,20 GBP, cierre del 21-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${pen(BPA_NTM)} p = 5,3/12 de FY2027e ${pen(bpa27)} p + 6,7/12 de FY2028e ${pen(bpa28)} p). Con solo FY2027e sería ${n2(PER.solo_fy2027)}x y con solo FY2028e ${n2(PER.solo_fy2028)}x. En BPA ajustado de la empresa (41,1 p en FY2026, sin remuneración en acciones) todos los PER serían ≈ 15 % más bajos y las conclusiones no cambian.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (precio de cierre ÷ BPA contable del mismo ejercicio, FY2025 normalizado): ${fmt(PER.v2.alCierre)}. Sin FY2021 (burbuja). Mediana y mínimo de FY2022-FY2026.` },
      },
      comparables_per: { mediana: 11.15 },
      consenso: { bpa_ano1: 0.464, bpa_ano2: 0.537, objetivo_medio: 12.73, objetivo_min: 10.65, objetivo_max: 15.0, analistas: 11, tendencia_3m: 'subidas', fuente: 'MarketScreener, 21-oct-2026: BPA de FY2027 de 0,464 GBP y FY2028 de 0,537 (base cercana a la contable; FY2029 0,605) y objetivo medio de 11 analistas [D2]; Yahoo da 0,525 y 0,587 en BPA ajustado (0,484 hace 90 días) [D3].' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  bolsa: {
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 5.6, var_3m_pct: 63.5, var_6m_pct: 57.3, var_12m_pct: 37.4, dist_max_52s_pct: 0, dist_min_52s_pct: 87.8, dist_max_historico_pct: -37.0, tendencia: 'alcista', volatilidad_60d_pct: 49, avisos: ['P1: subida fuerte, +64 % en tres meses', 'P2: en el máximo de 52 semanas tras subir un 64 % en tres meses'] },
      movimientos_fuertes: T.movimientos_fuertes ?? [],
      noticias: T.noticias ?? [],
      proximos_resultados: '2026-11-09',
      veredicto: 'no cambia',
      condicion: null,
      comentario: T.contexto_comentario ?? null,
    },
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Software y servicios de TI: lecciones del repositorio (IA en servicios por horas, ingresos diferidos al circulante)', editor: 'Repositorio de análisis (verticales/empresa/lecciones-casos.md)', tipo: 'Analistas', fecha: '2026-10-21', url: 'verticales/empresa/lecciones-casos.md' },
    { id: 2, titulo: 'Reply: análisis value del 21-oct-2026 (servicios de TI europeos; comparables y riesgo de IA)', editor: 'Repositorio de análisis (informes/reply-2026-10-21)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/reply-2026-10-21/' },
  ],
  huecos: [],
};
