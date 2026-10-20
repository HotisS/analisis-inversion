// Parte del analista (IHG, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?v=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO (definición de IHG: resultado de segmentos reportables − interés ajustado − impuesto ajustado − minoritarios,
// sin Fondo del Sistema, excepcionales ni el resultado de divisas y derivados) con la proyección del DCF:
//   resultado de segmentos = ingresos × (margen EBITDA − amortización 2,7 %) − interés ajustado × (1 − 27 %) − 1 M de
//   minoritarios ÷ acciones medias.
// Calibrado con 2025 real (ingresos 2.468, resultado 1.265, interés 200, tipo 27,2 %, 154,4 M de acciones → 5,02 frente a 5,013
// publicado) y con 2026 (consenso 5,79; guía de interés 230-240 M y tipo del 26-27 %).
// Acciones: 147,16 M de derechos de voto el 30-sep-2026 − ≈ 1,4 M de lo que queda de la recompra de 950 M de 2026 + ≈ 1,1 M de
// dilución por planes = 146,9 M desde 2027, SIN recompras no anunciadas (el consenso sí las incluye: ≈ 900 M al año).
// Interés: sin recompras nuevas la caja crece (≈ 650 M al año tras dividendos) y el interés baja de 235 a 225 y 205 M.
const V25 = 2468, ACC = 146.9, T_IMP = 0.27;
const bpa = (v, margen, interes, acc) => Math.round(((v * (margen - 2.7) / 100 - interes) * (1 - T_IMP) - 1) / acc * 100) / 100;
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
const caso = (dg27, dm27, dg, dm) => bpa(v27(dg27) * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, 205, ACC);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 235, 149.5);
const bpa27 = bpa(v27(0), S.anios[1].margen_ebitda_pct, 225, ACC);
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-14.0, -4.0, -1.5, -2.0), Base: caso(0, 0, 0, 0), Alcista: caso(1.5, 1.5, 1.5, 1.5) };

// Historia del PER ADELANTADO en BPA ajustado: cierre del ADR (1:1, USD) de cada año ÷ BPA ajustado real del año siguiente.
const cierres = { 2017: 66.92, 2018: 57.52, 2019: 68.67, 2020: 65.12, 2021: 65.21, 2022: 58.34, 2023: 91.18, 2024: 124.92, 2025: 140.83 };
const bpaAj = { 2018: 2.932, 2019: 3.033, 2020: 0.313, 2021: 1.470, 2022: 2.823, 2023: 3.757, 2024: 4.324, 2025: 5.013, 2026: bpa26 };
const excl = ['2019', '2020'];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const adelTodos = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const adel = adelTodos.filter(([a]) => !excl.includes(a));
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a] && !['2020', '2021'].includes(a)).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 167.75;
// PER actual en la misma base (precio ÷ BPA de los 12 meses siguientes): a 20-oct-2026 quedan 2,4 meses de 2026 y entran 9,6 de 2027.
export const BPA_NTM = r2(2.4 / 12 * bpa26 + 9.6 / 12 * bpa27);
export const PER = {
  actual: r1(PRECIO / BPA_NTM), solo_2026: r1(PRECIO / bpa26), solo_2027: r1(PRECIO / bpa27),
  mediana_5a: u5[2], minimo_5a: u5[0], media_larga: r1(adel.reduce((s, x) => s + x[1], 0) / adel.length), adel, adelTodos,
  v2: { mediana_5a: c5[2], minimo_5a: c5[0], media_larga: r1(alCierre.reduce((s, x) => s + x[1], 0) / alCierre.length), alCierre },
};
const fmt = (l) => l.map(([a, p]) => `${a} ${String(p).replace('.', ',')}x`).join('; ');
const n2 = (x) => String(x).replace('.', ',');
export const CTX = { BPA, PER, BPA_NTM, n2, fmt };

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UK-adopted)', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: el 98 % del resultado de segmentos viene del mismo negocio de comisiones de marca, franquicia y gestión en tres regiones (Américas, EMEAA y Gran China) con el mismo modelo, los mismos sistemas y la misma fidelidad; los pocos hoteles en propiedad y arrendamiento y la aseguradora cautiva no tienen peso para valorarlos aparte [A1].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A2]: préstamos 4.147 − derivados de cobertura 53 = 4.094 de deuda financiera; arrendamientos 394; caja
    // 825. Pensiones 67 (déficit de los planes de prestación definida). Minoritarios 4. Asociadas y negocios conjuntos 58.
    // otros_ajustes 391 = recompras de julio a septiembre (≈ 1,84 M de acciones a ≈ 160 USD ≈ 295 M, ya fuera de las 147,16 M
    // acciones del 30-sep) + dividendo a cuenta de 96 M pagado el 1-oct: caja que ya no está.
    puente: { fecha: '2026-06-30', deuda_financiera: 4094, arrendamientos: 394, caja: 825, minoritarios: 4, pensiones: 67, asociadas: 58, otros_ajustes: 391 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado de IHG (la base de nuestros casos y del consenso): cierre del ADR de NYSE de cada año (1:1 con la acción, en USD; la serie de Londres de Yahoo convierte la historia en GBp al cambio de hoy y no sirve) [D1] ÷ BPA ajustado real del año siguiente [A1, A4, A5, A6]; para el cierre de 2025 (140,83), ÷ nuestro 2026e (${n2(bpa26)}, consenso 5,79). Serie completa: ${fmt(adelTodos)}. Se excluyen 2019 y 2020: el BPA del año siguiente (0,31 y 1,47 USD) es el de la pandemia y da PER de 219 y 44 veces que no dicen nada. Mediana y mínimo de 2021-2025; media de 2017, 2018 y 2021-2025. PER actual = precio (167,75 USD, cierre del 19-oct-2026 en Londres) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,4/12 de 2026e ${n2(bpa26)} + 9,6/12 de 2027e ${n2(bpa27)}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA ajustado del mismo año), sin 2020 y 2021 (pandemia): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de los cinco últimos.` },
      },
      comparables_per: { mediana: 14.6 },
      consenso: { bpa_ano1: 5.79, bpa_ano2: 6.56, objetivo_medio: 164.67, objetivo_min: 120, objetivo_max: 195, analistas: 16, tendencia_3m: 'subidas', fuente: 'Consenso recopilado por IHG (15-oct-2026, 16 analistas): BPA ajustado de 2026 de 5,79 USD y de 2027 de 6,56 [D2]; objetivo medio, mínimo y máximo de Yahoo y MarketScreener, 20-oct-2026 [D4, D3]' },
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
    { id: 1, titulo: 'Tipo de cambio de referencia del BCE (EUR/USD 1,1215) y del CFETS (USD/CNY 6,6664) para convertir comparables', editor: 'Banco Central Europeo y Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html' },
  ],
  huecos: [],
};
