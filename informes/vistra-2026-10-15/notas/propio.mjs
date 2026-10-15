// Parte del analista (Vistra, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  esg: T.esg ?? null,
  preguntas: T.preguntas ?? null,
  sentimiento: { lectura: T.sentimiento_lectura ?? null },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la nuclear, el gas y la comercialización están integrados (la comercializadora compra a la propia generación) y la empresa publica el resultado por región, no por tecnología; separar la nuclear exigiría inventar su EBITDA.', confianza: 'Media' },
  valoracion: {
    // Balance del 30-jun-2026 (10-Q) [D14]: deuda = financiación de clientes 300 + vencimientos 1.876 + largo 17.719 = 19.895.
    // Otros ajustes: preferentes 2.476 (liquidación) + obligación de recompra del 15 % de Vistra Vision a Nuveen 613
    // + Cogentrix pendiente: 2.300 de caja + 1.500 de deuda asumida − 700 de beneficios fiscales = 3.100. Total 6.189.
    // Los 1.500 M de bonos subordinados de septiembre [D13] no se suman: sustituyen a preferentes (misma obligación).
    // Pensiones: déficit de 101 M (10-K) × (1 − 23 %) = 78. Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-06-30', deuda_financiera: 19895, arrendamientos: 0, caja: 435, minoritarios: 12, pensiones: 78, asociadas: 0, otros_ajustes: 6189 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Bajista, multiplo: null, precio: null, justificacion: T.just12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Base, multiplo: null, precio: null, justificacion: T.just12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Alcista, multiplo: null, precio: null, justificacion: T.just12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 16.1, mediana_5a: 20.3, minimo_5a: 7.0, media_larga: 16.8, anios: 7,
        excluidos: 'Historia adelantada en base ajustada propia (cierre de cada año ÷ BPA ajustado del año siguiente = (EBITDA ajustado − amortizaciones con combustible nuclear − intereses) × 0,77 − preferentes − minoritarios, entre acciones diluidas): 2018 14,4x; 2019 10,5x; 2021 25,0x; 2022 7,0x; 2023 9,2x; 2024 30,9x; 2025 20,3x (con nuestro BPA de 2026e, 7,95). Fuera 2020 (BPA de 2021 en pérdidas por la tormenta Uri). Actual: 151,79 ÷ 9,43 (nuestro BPA de 2027e) = 16,1x.',
        v2: { mediana_5a: 25.5, minimo_5a: 9.0, media_larga: 21.7, excluidos: 'Historia al cierre en la misma base (precio ÷ BPA ajustado del mismo año): 2019 14,5x; 2020 9,0x; 2022 25,5x; 2023 11,7x; 2024 33,1x; 2025 36,2x; fuera 2021 (pérdidas por Uri). Media larga 2019-2025 sin 2021.' },
      },
      comparables_per: { mediana: 16.9 },
      consenso: { bpa_ano1: 9.58, bpa_ano2: 10.36, objetivo_medio: 210.25, objetivo_min: 106, objetivo_max: 305, analistas: 20, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA ajustado del consenso; 9-10 analistas; objetivo de 20) [D2]' },
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
