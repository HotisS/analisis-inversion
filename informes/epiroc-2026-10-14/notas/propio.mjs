// Parte del analista (Epiroc, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'SEK', divisa_cotizacion: 'SEK', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las dos áreas de negocio comparten clientes mineros, red de servicio y cadena de suministro (Tools & Attachments gestiona los recambios de todo el grupo), y el mercado valora a Epiroc como un todo; Tools & Attachments pesa un 15 % del EBIT.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 18773 - 2769, arrendamientos: 2769, caja: 6928 + 608, minoritarios: 6, pensiones: 150, asociadas: 31, otros_ajustes: 198 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: T.per_actual ?? null, mediana_5a: 27.1, minimo_5a: 24.3, media_larga: 25.9,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 27.3, minimo_5a: 25.9, media_larga: 28.0, excluidos: 'Ninguno. Historia al cierre: precio de cierre ÷ BPA diluido del mismo año (2018-2025): 18,7 / 23,4 / 33,4 / 39,2 / 27,3 / 25,9 / 26,6 / 29,5.' },
      },
      comparables_per: { mediana: 20.4 },
      consenso: { bpa_ano1: 8.23, bpa_ano2: 10.03, objetivo_medio: 284.86, objetivo_min: 230, objetivo_max: 340, analistas: 21, tendencia_3m: 'subidas', fuente: 'MarketScreener, 14-oct-2026 [D2, D3]' },
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
