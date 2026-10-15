// Parte del analista (Autodesk, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs?t=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
const O = T.o12 ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las cinco familias de producto comparten plataforma, clientes, canal y modelo de suscripción, y la empresa publica un solo segmento sin resultado por familia [A1].', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-07-31', deuda_financiera: 3478, arrendamientos: 0, caja: 4357, minoritarios: 0, pensiones: 0, asociadas: 392, otros_ajustes: 3530 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: O.casos ?? [],
      per_historico: { base: 'adelantado', actual: O.actual ?? null, mediana_5a: O.mediana ?? null, minimo_5a: O.minimo ?? null, media_larga: O.media_larga ?? null, excluidos: O.excluidos ?? null, v2: O.v2 ?? null },
      comparables_per: { mediana: 28.1 },
      consenso: { bpa_ano1: 9.78, bpa_ano2: 11.61, objetivo_medio: 307.54, objetivo_min: null, objetivo_max: null, analistas: 36, tendencia_3m: 'recortes', fuente: 'MarketScreener: BPA GAAP de FY2028e y FY2029e y objetivo medio de 36 analistas; recortes de Citi (331 → 246 USD) y Wells Fargo (350 → 330) [D2, D21]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: O.media ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  riesgos: T.riesgos ?? null,
  catalizadores: T.catalizadores ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
