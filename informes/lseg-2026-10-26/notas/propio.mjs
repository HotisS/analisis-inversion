// Parte del analista (LSEG, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (adoptadas en el Reino Unido)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'No aplica como método de valoración: los negocios comparten datos, clientes y tecnología y Tradeweb ya entra con sus minoritarios a valor de mercado.', confianza: 'Media' },
  valoracion: {
    // 30-jun-2026 (último balance publicado; el 3T26 no da balance): deuda bruta 13.511 − arrendamientos 614; caja 4.056; minoritarios a mercado (Tradeweb ≈ 57 % ajeno ×
    // 28.676 M USD al 23-oct ÷ 1,336 ≈ 12.235 M, más ≈ 270 M de LCH y PTS en libros = 12.500 M); otros: 1.277 M de caja regulatoria + recompras desde julio
    // (500 M en el 3T26 [A8] y ≈ 165 M del 1 al 23-oct, ≈ 1,9 M de acciones a ≈ 86 GBP [D13]) + 267 M del dividendo a cuenta de septiembre = 2.209 M.
    // Octus (3.535 M USD, cierre 1S27, deuda) y Trumid (≈ 1.750 M USD, caja de Tradeweb) no entran: valor neutro (precio = valor que se compra).
    puente: { fecha: '2026-06-30', deuda_financiera: 12897, arrendamientos: 614, caja: 4056, minoritarios: 12500, pensiones: 0, asociadas: 0, otros_ajustes: 2209 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', actual: T.per_actual ?? null, mediana_5a: 22.0, minimo_5a: 18.8, media_larga: 23.0, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 25.4, minimo_5a: 21.3, media_larga: 25.8, excluidos: '2020 y anteriores (antes de Refinitiv, otro negocio). Serie al cierre: 2021 25,4x; 2022 22,5x; 2023 28,6x; 2024 31,0x; 2025 21,3x (precio de cierre ÷ BPA ajustado del mismo año).' } },
      comparables_per: { mediana: 25.8 },
      consenso: { bpa_ano1: 4.806, bpa_ano2: 5.509, objetivo_medio: 118.15, objetivo_min: 104.0, objetivo_max: 137.7, analistas: 16, tendencia_3m: 'subidas', fuente: 'BPA ajustado 2026e y 2027e del consenso compilado por la empresa del 13-oct-2026, previo al 3T26 [D2]; objetivo medio, mínimo y máximo de MarketScreener al 23-oct (16 analistas; 115,91 en el consenso de la empresa del 13-oct) [D3]' },
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
