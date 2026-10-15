// Parte del analista (Lockheed Martin, corte 2026-10-15). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los cuatro segmentos venden al mismo cliente, con los mismos tipos de contrato y márgenes parecidos (9-14 %), y no hay comparables puros que den múltiplos distintos con fiabilidad. La única participada relevante (50 % de ULA) está en el puente a valor contable.', confianza: 'Media' },
  valoracion: {
    // Balance a 28-jun-2026 [A3]. Deuda: bonos a largo plazo 20.538 (sin vencimientos a corto ni papel comercial). Arrendamientos operativos (US GAAP) fuera.
    // Pensiones: pasivo devengado de 3.931 M × (1 − 21 %) = 3.105 M, tratado como deuda (encargo). Asociadas: ULA a valor contable (617 M) [A4].
    // Ultra Maritime (3.450 M) no está cerrada: ni en el puente ni en la proyección (se compra a un precio que suponemos igual a su valor).
    puente: { fecha: '2026-06-28', deuda_financiera: 20538, arrendamientos: 0, caja: 3791, minoritarios: 0, pensiones: 3105, asociadas: 617, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 16.5, mediana_5a: 16.0, minimo_5a: 13.1, media_larga: 15.0,
        excluidos: T.per_excluidos ?? null,
        v2: { base: 'cierre', actual: 16.5, mediana_5a: 16.7, minimo_5a: 12.9, media_larga: 16.0, excluidos: T.per_v2 ?? null },
      },
      comparables_per: { mediana: 19.1 },
      consenso: { bpa_ano1: 30.43, bpa_ano2: 32.73, objetivo_medio: 621.24, objetivo_min: 486.0, objetivo_max: 756.0, analistas: 23, tendencia_3m: 'estables', fuente: 'MarketScreener: BPA de 2026 y 2027 y objetivos de 23 analistas [D1, D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: [...(T.fuentes ?? [])],
};
