// Parte del analista (Brady, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 7, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica todavía: Intelligent Productivity Solutions (PSS) tendrá perfil distinto (hardware, margen de dos cifras bajas, comparables como Zebra y Datalogic), pero no hay ni una cifra publicada del segmento dentro de Brady; se valorará por partes cuando salga el 10-Q del 1T27 [A1, A2].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-07-31', deuda_financiera: 15.0, arrendamientos: 0, caja: 187.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 1400 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: S.bpa28.Bajista, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: S.bpa28.Base, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: S.bpa28.Alcista, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: { ...S.per_historico, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 17.9 },
      consenso: { bpa_ano1: 6.55, bpa_ano2: 7.22, objetivo_medio: 110, objetivo_min: 109, objetivo_max: 111, analistas: 2, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (2 analistas; BPA ajustado de la empresa; 2 comprar) [D2]' },
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
