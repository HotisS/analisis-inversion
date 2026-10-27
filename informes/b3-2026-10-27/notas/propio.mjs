// Parte del analista (B3, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'BRL', divisa_cotizacion: 'BRL', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS, CPC en Brasil)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'No aplica: contado, derivados, renta fija y datos comparten la misma infraestructura de negociación, compensación y depósito.', confianza: 'Media' },
  valoracion: {
    // 30-jun-2026 (último balance publicado; el 3T26 sale el 12-nov): deuda bruta 2.623 + 12.310 = 14.933 (debentures y bonos; sin arrendamientos relevantes);
    // caja 1.163 + inversiones 15.308 a corto + 2.820 a largo = 19.291, menos 2.655 de garantías en efectivo de los participantes de la cámara y 184 de proventos
    // en custodia (dinero de clientes, como en HKEX, CME y LSEG) = 16.452. Minoritarios 24 (libros). Asociadas 113. Otros: +1.582 de JCP y dividendos declarados por pagar.
    // No se ajustan los recursos propios que B3 dedica a las salvaguardas de la cámara (importe no publicado en las notas leídas): hueco.
    puente: { fecha: '2026-06-30', deuda_financiera: 14933, arrendamientos: 0, caja: 16452, minoritarios: 24, pensiones: 0, asociadas: 113, otros_ajustes: 1582 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, octubre de 2026; vale para mercados desarrollados, se aplica sobre la tasa en BRL)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', actual: T.per_actual ?? null, mediana_5a: 13.8, minimo_5a: 10.4, media_larga: 13.9, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 15.2, minimo_5a: 11.8, media_larga: 15.1, excluidos: '2021 y anteriores (sin BPA recurrente comparable; amortización de Cetip y desdoblamiento de 2021). Serie al cierre: 2022 16,4x; 2023 18,0x; 2024 11,8x; 2025 14,0x (precio de cierre ÷ BPA recurrente del mismo año).' } },
      comparables_per: { mediana: 22.6 },
      consenso: { bpa_ano1: 1.202, bpa_ano2: 1.346, objetivo_medio: 22.64, objetivo_min: 16.0, objetivo_max: 30.0, analistas: 14, tendencia_3m: 'estables', fuente: 'BPA 2026e y 2027e (8 analistas) y objetivos (14 analistas) de Yahoo Finance, anteriores a la segunda vuelta: no recogen la caída del 26-oct [D2]' },
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
