// Parte del analista (Gentex, corte 2026-11-13). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-11-13', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: automoción es el 86 % de las ventas de los nueve primeros meses de 2026 y casi todo el beneficio operativo (491 M de 474 M en 2025: audio premium gana 8 M y «Otros» pierde 25 M) [A1, A2]; los negocios pequeños no cambian el valor.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 0, caja: 249.1, minoritarios: 0, pensiones: 0, asociadas: 110.0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: T.casos_12m ?? [],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 8.8 },
      consenso: { bpa_ano1: 2.00, bpa_ano2: 2.14, objetivo_medio: 25.28, objetivo_min: 20, objetivo_max: 42, analistas: 9, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (8 analistas de BPA; 3 comprar, 5 mantener, 1 vender) y Stock Analysis (objetivo medio 25,28) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
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
