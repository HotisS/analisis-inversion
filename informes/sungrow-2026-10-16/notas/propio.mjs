// Parte del analista (Sungrow, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (2023-2025, folleto de Hong Kong) y normas chinas CAS (2021-2022 y 2026)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: inversores y almacenamiento comparten I+D, electrónica de potencia, clientes y red comercial, y la empresa no publica resultado por segmento (solo margen bruto). La promoción de plantas pesa cada vez menos (4 % de las ventas del 1S26) [A4].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 7522.0, arrendamientos: 327.0, caja: 34906.1, minoritarios: 3041.6, pensiones: 0, asociadas: 769.2, otros_ajustes: 818.1 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; el riesgo país de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.87, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 6.10, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 6.98, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: { base: 'adelantado', actual: 13.44, mediana_5a: 14.7, minimo_5a: 11.3, media_larga: 16.2, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 20.05, minimo_5a: 13.7, media_larga: 23.4, excluidos: T.per_v2_excluidos ?? null } },
      comparables_per: { mediana: 12.5 },
      consenso: { bpa_ano1: 6.588, bpa_ano2: 7.702, objetivo_medio: 146.5, objetivo_min: 77.0, objetivo_max: 230.72, analistas: 20, tendencia_3m: 'recortes', fuente: 'MarketScreener (estimaciones y objetivos, 15/16-oct-2026) y Kaiyuan (31-ago-2026) [D2, D3, D4]' },
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
