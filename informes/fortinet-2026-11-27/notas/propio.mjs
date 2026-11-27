// Parte del analista (Fortinet, corte 2026-11-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo segmento (US GAAP, un único segmento operativo); producto y servicios se venden juntos sobre FortiOS y no hay resultados por línea.', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 497.1, arrendamientos: 0, caja: 5318.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre de 2026 [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: T.casos_12m ?? [],
      per_historico: T.per_historico ? { ...T.per_historico, base_bpa: 'publicado' } : null,
      comparables_per: { mediana: 45.7 },
      consenso: { bpa_ano1: 3.56, bpa_ano2: 3.90, objetivo_medio: 144.68, objetivo_min: 110, objetivo_max: 190, analistas: 37, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (earningsTrend y financialData, 27-nov-2026; BPA ajustado, sin pagos en acciones; 42-43 analistas de BPA y 37 de objetivo) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
