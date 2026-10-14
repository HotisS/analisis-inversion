// Parte del analista (Novonesis, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((escenario) => ({
  escenario, metrica: 'PER 2028e', beneficio_por_accion: S.bpa12m[escenario], multiplo: null, precio: null,
  justificacion: T.casos_12m?.[escenario] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'DKK', tipo_cambio: 0.13377, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  identificacion: {
    nombre: 'Novonesis A/S (sociedad: Novozymes A/S)', nombre_corto: 'Novonesis', ticker: 'NSIS B', isin: 'DK0060336014', mercado: 'Nasdaq Copenhague', indice_referencia: 'OMX Copenhagen 25',
    pais: 'Dinamarca', pais_iso: 'DK', sector: 'Materiales', industria: 'Química especializada (biosoluciones: enzimas y microorganismos)', sede: 'Bagsværd (Dinamarca)', fundacion: '1925', empleados: 11641, web: 'https://www.novonesis.com',
    acciones: 467.2, capitalizacion_publicada: null, free_float_pct: 74.5,
  },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los dos segmentos (Food & Health y Planetary Health) comparten plataforma de fermentación, I+D y plantas, tienen márgenes parecidos (36-38 %) y la empresa no publica activos por segmento [A1].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 2876.4, arrendamientos: 192.0, caja: 308.7, minoritarios: 0, pensiones: 0, asociadas: 14.9, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: {
        base: 'adelantado', actual: 25.8, mediana_5a: 27.5, minimo_5a: 25.3, media_larga: 28.1, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 28.2, minimo_5a: 26.1, media_larga: 28.6, excluidos: 'Historia al cierre (precio de cierre ÷ BPA ajustado sin PPA del mismo año, en EUR): 2022 26,1x; 2023 28,9x; 2024 31,8x; 2025 27,4x. Excluido 2021 (47,8x, burbuja de múltiplos de tipos cero). Media larga con 2022-2025 y el 2020 no disponible: 28,6x.' },
      },
      comparables_per: { mediana: 23.0 },
      consenso: { bpa_ano1: 2.11, bpa_ano2: 2.36, objetivo_medio: 66.8, objetivo_min: null, objetivo_max: null, analistas: 15, tendencia_3m: 'subidas', fuente: 'MarketScreener (15 analistas; BPA NIIF llevado a la base sin PPA, estimación propia; objetivo medio 499,33 DKK) y tradedesk.dk (491,93 DKK en septiembre) [D2, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  esg: T.esg ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
