// Parte del analista (Hilton, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?v=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// BPA AJUSTADO («diluted EPS, adjusted for special items» de Hilton, la base de la guía y del consenso) con la proyección del DCF:
//   (ingresos × (margen EBITDA − amortización 4,7 %) − intereses) × (1 − 28,5 %) − 4 M de minoritarios ÷ acciones diluidas.
// Calibrado con 2025 real (EBIT 3.321, intereses 620, impuestos 767 = 28,4 %, 238 M de acciones → 8,11 publicado) y con la guía
// de 2026 (beneficio ajustado 2.037-2.065 M; 8,89-9,01 USD con ≈ 229 M de acciones, sin las recompras posteriores al 30-jun).
// Acciones: 2026e ≈ 227 M de media diluida (229 de la guía − ≈ 2 M por las recompras del 2S); 223 M desde 2027 (225,7 M en
// circulación a 30-jun − ≈ 4,7 M de lo que queda de la devolución de ≈ 3.500 M de 2026 + ≈ 2 M de dilución por planes), SIN
// recompras no anunciadas (el consenso sí las incluye: ≈ 3.500 M al año, un 4-5 % menos de acciones cada año).
// Intereses: guía ≈ 720 M en 2026; sin recompras nuevas la caja crece (≈ 2.000 M al año) y el gasto neto baja a 700 y 640 M.
const V25 = 5011, ACC = 223, T_IMP = 0.285, AM = 4.7;
const bpa = (v, margen, interes, acc) => Math.round(((v * (margen - AM) / 100 - interes) * (1 - T_IMP) - 4) / acc * 100) / 100;
const v26 = V25 * (1 + S.anios[0].crecimiento_pct / 100);
const v27 = (dg) => v26 * (1 + (S.anios[1].crecimiento_pct + dg) / 100);
const caso = (dg27, dm27, dg, dm) => bpa(v27(dg27) * (1 + (S.anios[2].crecimiento_pct + dg) / 100), S.anios[2].margen_ebitda_pct + dm, 640, ACC);
const bpa26 = bpa(v26, S.anios[0].margen_ebitda_pct, 720, 227);
const bpa27 = bpa(v27(0), S.anios[1].margen_ebitda_pct, 700, ACC);
export const BPA = { '2026e': bpa26, '2027e': bpa27, Bajista: caso(-14.0, -4.0, -1.5, -2.0), Base: caso(0, 0, 0, 0), Alcista: caso(1.5, 1.5, 1.5, 1.5) };

// Historia del PER ADELANTADO en BPA ajustado: cierre de cada año (Yahoo, ajustado por las escisiones de 2017) ÷ BPA ajustado real
// del año siguiente [A1-A12]; para el cierre de 2025, ÷ nuestro 2026e.
const cierres = { 2017: 79.86, 2018: 71.80, 2019: 110.91, 2020: 111.26, 2021: 155.99, 2022: 126.36, 2023: 182.09, 2024: 247.16, 2025: 287.25 };
const bpaAj = { 2018: 3.42, 2019: 3.90, 2020: 0.10, 2021: 2.08, 2022: 4.90, 2023: 6.20, 2024: 7.12, 2025: 8.11, 2026: bpa26 };
const excl = ['2019', '2020'];
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const adelTodos = Object.keys(cierres).map((a) => [a, r1(cierres[a] / bpaAj[+a + 1])]);
const adel = adelTodos.filter(([a]) => !excl.includes(a));
const u5 = adel.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
const alCierre = Object.keys(cierres).filter((a) => bpaAj[a] && !['2020', '2021'].includes(a)).map((a) => [a, r1(cierres[a] / bpaAj[a])]);
const c5 = alCierre.slice(-5).map((x) => x[1]).sort((a, b) => a - b);
export const PRECIO = 359.29;
// PER actual en la misma base (precio ÷ BPA de los 12 meses siguientes): a 21-oct-2026 quedan 2,3 meses de 2026 y entran 9,7 de 2027.
export const BPA_NTM = r2(2.3 / 12 * bpa26 + 9.7 / 12 * bpa27);
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
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: el 95 % del EBITDA de las divisiones viene del negocio de gestión y franquicia (comisiones sobre ≈ 9.300 hoteles de otros: 3.575 M en 2025); la división de propiedad (46 hoteles propios o arrendados, 177 M de EBITDA) es pequeña y con margen bajo, y no cambia el valor si se valora aparte [A1, A2].', confianza: 'Alta' },
  valoracion: {
    // Puente a 30-jun-2026 [A3]: deuda contable 13.343 (13.400 de nominal, con arrendamientos financieros); caja 1.064 (con 55
    // restringidos). Minoritarios 28. Arrendamientos operativos fuera (US GAAP; el alquiler ya está en el EBITDA).
    // otros_ajustes 1.674 = lo que queda de la devolución de ≈ 3.500 M de 2026 tras los 1.826 M del 1S (≈ 1.607 M de recompras y
    // ≈ 67 M de dividendos): caja que sale y que ya no está en las 223 M de acciones que usamos.
    puente: { fecha: '2026-06-30', deuda_financiera: 13343, arrendamientos: 0, caja: 1064, minoritarios: 28, pensiones: 0, asociadas: 0, otros_ajustes: 1674 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: PER.actual, mediana_5a: PER.mediana_5a, minimo_5a: PER.minimo_5a, media_larga: PER.media_larga,
        excluidos: `Historia ADELANTADA en BPA ajustado de Hilton (la base de nuestros casos, de la guía y del consenso): cierre de cada año de Yahoo (ajustado por las escisiones de Park y HGV de 2017) [D1] ÷ BPA ajustado real del año siguiente [A1-A12]; para el cierre de 2025 (287,25), ÷ nuestro 2026e (${n2(bpa26)}; consenso 9,05, guía 8,89-9,01). Serie completa: ${fmt(adelTodos)}. Se excluyen 2019 y 2020: el BPA del año siguiente (0,10 y 2,08 USD) es el de la pandemia y da PER de 1.109 y 53,5 veces que no dicen nada. Mediana y mínimo de 2021-2025; media de 2017, 2018 y 2021-2025. PER actual = precio (359,29 USD, cierre del 20-oct-2026) ÷ nuestro BPA de los próximos 12 meses (${n2(BPA_NTM)} = 2,3/12 de 2026e ${n2(bpa26)} + 9,7/12 de 2027e ${n2(bpa27)}). Con solo 2026e sería ${n2(PER.solo_2026)}x y con solo 2027e ${n2(PER.solo_2027)}x.`,
        v2: { mediana_5a: PER.v2.mediana_5a, minimo_5a: PER.v2.minimo_5a, media_larga: PER.v2.media_larga, excluidos: `Historia AL CIERRE (cierre ÷ BPA ajustado del mismo año), sin 2020 y 2021 (pandemia): ${fmt(PER.v2.alCierre)}. Mediana y mínimo de los cinco últimos.` },
      },
      comparables_per: { mediana: 16.4 },
      consenso: { bpa_ano1: 9.05, bpa_ano2: 10.42, objetivo_medio: 353.93, objetivo_min: 270, objetivo_max: 390, analistas: 29, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, 21-oct-2026: BPA de 2026 y 2027 (29 analistas) y objetivo medio, mínimo y máximo [D2]' },
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
    { id: 1, titulo: 'Cálculos propios del analista sobre las cuentas de Hilton (ROIC operativo, cuota de habitaciones, BPA proyectado)', editor: 'Analista', tipo: 'Cálculo propio', fecha: '2026-10-21', url: null },
  ],
  huecos: [],
};
