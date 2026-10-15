// Parte del analista (GEA Group, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)['2028e'].bpa]));
const just12 = T.casos_12m ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
    // Balance de junio de 2026; acciones de octubre (162,8 M menos ≈1,1 M recompradas desde el 10-ago): la caja se ajusta con ≈75 M pagados.
    // Pensiones netas de impuestos (507,7 M × 0,70); factoring sin recurso (58 M) como deuda.
    puente: { fecha: '2026-06-30', deuda_financiera: 1.2, arrendamientos: 261.0, caja: 333.2, minoritarios: 0.4, pensiones: 355, asociadas: 0, otros_ajustes: 133 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e], multiplo: null, precio: null, justificacion: just12[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 20.25, mediana_5a: 18.8, minimo_5a: 16.4, media_larga: 18.23,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 20.8, minimo_5a: 16.5, media_larga: 21.0, excluidos: 'Historia al cierre (precio de cierre ÷ BPA del mismo año): 2021 28,3x; 2022 16,8x; 2023 16,5x; 2024 20,8x; 2025 22,8x. Sin 2017-2020 (reestructuración y pérdidas de 2019).' },
      },
      comparables_per: { mediana: 20.55 },
      consenso: { bpa_ano1: 3.38, bpa_ano2: 3.76, objetivo_medio: 70.83, objetivo_min: 53.0, objetivo_max: 79.0, analistas: 18, tendencia_3m: 'subidas', fuente: 'Stock Analysis (BPA 2026-2027 y objetivos) y Börse Express (consenso de 17 analistas de 66,88 EUR en julio) [D2, D3]' },
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
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
