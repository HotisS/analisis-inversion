// Parte del analista (Diploma, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBp', tipo_cambio: 0.01, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF del Reino Unido (UK-adopted IAS)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres sectores comparten modelo (distribución especializada con valor añadido), capital y compras; no hay comparables puros distintos para cada uno que cambien el valor.', confianza: 'Media' },
  valoracion: {
    // Puente a 31-mar-2026 (último balance publicado). otros_ajustes: pasivos por compras (pagos aplazados y opciones de minoritarios, 11,3 + 27,2)
    // más la variación estimada de la deuda neta entre abril y septiembre (compras de CDM y cuatro más, c. 163 M, y dividendo a cuenta de 26 M,
    // menos una caja libre del segundo semestre de unos 180 M), porque el DCF no cuenta el flujo de FY2026e.
    puente: { fecha: '2026-03-31', deuda_financiera: 412.6, arrendamientos: 88.8, caja: 68.7, minoritarios: 4.5, pensiones: 0, asociadas: 0, otros_ajustes: 47.5 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D14]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 38.9, mediana_5a: 31.3, minimo_5a: 25.7, media_larga: 33.7, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 38.6, minimo_5a: 30.6, media_larga: 40.0, excluidos: 'Historia al cierre (precio de cierre de septiembre ÷ BPA diluido estatutario del mismo ejercicio): FY2019 30,4x; FY2020 50,6x; FY2021 50,8x; FY2022 30,6x; FY2023 33,2x; FY2024 46,1x; FY2025 38,6x. Sin exclusiones.' },
      },
      comparables_per: { mediana: 25.8 },
      consenso: { bpa_ano1: 2.367, bpa_ano2: 2.515, objetivo_medio: 83.29, objetivo_min: 70.0, objetivo_max: 90.0, analistas: 16, tendencia_3m: 'subidas', fuente: 'BPA FY2027e y FY2028e y objetivos de MarketScreener (16 analistas) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Alta' },
  fuentes: [],
};
