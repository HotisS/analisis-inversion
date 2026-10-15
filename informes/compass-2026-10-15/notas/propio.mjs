// Parte del analista (Compass Group, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido)', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las dos regiones hacen el mismo negocio (restauración colectiva por sectores) con las mismas compras y marcas; Norteamérica tiene más margen (8,2 %) que Internacional (6,2 %), pero no hay comparables puros de cada región que justifiquen múltiplos distintos.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-03-31', deuda_financiera: 7490, arrendamientos: 1641, caja: 523, minoritarios: 125, pensiones: 86, asociadas: 231, otros_ajustes: 24 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D16]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: T.per_actual ?? 19.6, mediana_5a: 23.49, minimo_5a: 20.38, media_larga: 22.0, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 26.59, minimo_5a: 23.23, media_larga: 25.27, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 12.7 },
      consenso: { bpa_ano1: 1.484, bpa_ano2: 1.634, objetivo_medio: 38.06, objetivo_min: 31.0, objetivo_max: 42.5, analistas: 19, tendencia_3m: 'estables', fuente: 'Yahoo Finance (BPA subyacente, 18 analistas; objetivo de 19) y MarketScreener (20 analistas, objetivo medio 38,06 USD) [D4, D3]' },
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
