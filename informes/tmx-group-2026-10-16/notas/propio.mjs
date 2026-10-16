// Parte del analista (TMX Group, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'CAD', divisa_cotizacion: 'CAD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'No aplica: los segmentos comparten plataforma tecnológica, clientes y costes centrales, y el EBIT por segmento que publica TMX lleva repartos de costes que no permiten valorar cada parte por separado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1963.9, arrendamientos: 95.3, caja: 277.3, minoritarios: 880, pensiones: 0, asociadas: 1.4, otros_ajustes: 1093.1 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D17]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', actual: T.per_actual ?? null, mediana_5a: 18.85, minimo_5a: 17.99, media_larga: 19.22, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 21.95, minimo_5a: 18.06, media_larga: 21.87, excluidos: T.per_v2_excluidos ?? null } },
      comparables_per: { mediana: 23.35 },
      consenso: { bpa_ano1: 2.253, bpa_ano2: 2.45, objetivo_medio: 65.55, objetivo_min: 59, objetivo_max: 71, analistas: 10, tendencia_3m: 'estables', fuente: 'Zonebourse (estimaciones) y MarketBeat (objetivos y recomendaciones), 15/16-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
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
