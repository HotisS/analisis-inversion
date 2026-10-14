// Parte del analista (Experian, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'GBp', tipo_cambio: 0.0135, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido); cifras benchmark de la empresa', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los segmentos (B2B y Consumer Services; cuatro regiones) comparten datos y plataforma y no se pudieron leer sus resultados por separado.', confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-03-31', deuda_financiera: 5480, arrendamientos: 0, caja: 300, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D8]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 2.29, multiplo: null, precio: null, justificacion: 'Ingresos de 10.397 M USD en el FY29 (2 puntos menos de crecimiento en FY28-29: la IA y los modelos alternativos abaratan la consulta y Consumer Services no se recupera) con un margen EBITDA del 36,5 %: EBIT de 3.005 M, 210 M de intereses, impuesto del 25,5 %, 10 M de minoritarios y 905 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 2.47, multiplo: null, precio: null, justificacion: 'Ingresos de 10.793 M USD (guía del FY27 en su punto medio y 8 % anual después, en línea con el 8 % orgánico del FY26) y margen EBITDA del 37,5 % (+≈50 pb al año, la guía): EBIT de 3.227 M, 210 M de intereses, impuesto del 25,5 %, 10 M de minoritarios y 905 M de acciones, sin recompras futuras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 2.59, multiplo: null, precio: null, justificacion: 'Ingresos de 11.095 M USD (+1,5 puntos de crecimiento: crédito en EE. UU. y Brasil al alza, hipotecas que se recuperan) y margen del 38 %: EBIT de 3.373 M, 210 M de intereses, impuesto del 25,5 % y 905 M de acciones.' },
      ],
      per_historico: { actual: 14.7, mediana_5a: 29.4, minimo_5a: 19.2, media_larga: 27.8, excluidos: 'Ninguno: BPA benchmark positivo y creciente en toda la serie. PER de cierre de marzo (precio aproximado en peniques pasado a USD ÷ BPA benchmark): FY19 27,6x; FY20 27,1x; FY21 33,5x; FY22 31,0x; FY23 24,8x; FY24 29,9x; FY25 29,4x; FY26 19,2x [D, A1-A6]. Actual = 33,18 USD ÷ 2,25 (nuestro BPA del FY28e).' },
      comparables_per: { mediana: 20.9 },
      consenso: { bpa_ano1: 1.98, bpa_ano2: 2.28, objetivo_medio: 55.18, objetivo_min: 47.25, objetivo_max: 62.1, analistas: 6, tendencia_3m: 'recortes', fuente: 'MarketBeat (objetivos, jul-2026) y Rothschild Redburn (BPA, oct-2025) [D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
