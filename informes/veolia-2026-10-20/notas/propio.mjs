// Parte del analista (Veolia, corte 2026-10-20). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-20', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: "Media" },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 31603, arrendamientos: 2177, caja: 9332, minoritarios: 5100, pensiones: 480, asociadas: 1607, otros_ajustes: 3744 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 13.1 },
      consenso: { bpa_ano1: 2.41, bpa_ano2: 2.64, objetivo_medio: 38.56, objetivo_min: 33, objetivo_max: 45.3, analistas: 18, tendencia_3m: 'mixta', fuente: 'Yahoo Finance (earningsTrend, BPA corriente sin PPA; 18 analistas) [D4]; Morgan Stanley a «en línea» el 28-jul y RBC sube el objetivo a 41,5 el 19-ago [D14, D15]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  ...(T.catalizadores ? { catalizadores: T.catalizadores } : {}),
  ...(T.riesgos ? { riesgos: T.riesgos } : {}),
  ...(T.esg ? { esg: T.esg } : {}),
  ...(T.preguntas ? { preguntas: T.preguntas } : {}),
  ...(T.sentimiento_temas ? { sentimiento: { temas: T.sentimiento_temas, lectura: T.sentimiento_lectura ?? null } } : {}),
  fuentes: T.fuentes ?? [],
};
