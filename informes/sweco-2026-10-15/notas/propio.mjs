// Parte del analista (Sweco, corte 2026-10-15). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'SEK', divisa_cotizacion: 'SEK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las ocho áreas geográficas venden el mismo servicio (horas de arquitectos e ingenieros) con márgenes EBITA del 6-14 % y sin comparables puros por país que den múltiplos distintos con fiabilidad.', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [A2]: deuda 1.949 + 1.606; arrendamientos 2.672 + 928; caja 663; pensiones 134 brutos (dic-25) → ≈105 netos de impuestos.
    // otros_ajustes: compras cerradas después del balance (Sitowise Sverige ≈3 M EUR y STEIN, ≈70 M de ventas) ≈80 M, estimación propia.
    puente: { fecha: '2026-06-30', deuda_financiera: 3555, arrendamientos: 3600, caja: 663, minoritarios: 5, pensiones: 105, asociadas: 3, otros_ajustes: 80 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 18.4, mediana_5a: 23.1, minimo_5a: 21.5, media_larga: 21.5,
        excluidos: T.per_excluidos ?? null,
        v2: { base: 'cierre', actual: 18.4, mediana_5a: 26.6, minimo_5a: 21.7, media_larga: 23.5, excluidos: T.per_v2 ?? null },
      },
      comparables_per: { mediana: 11.9 },
      consenso: { bpa_ano1: 6.99, bpa_ano2: 7.94, objetivo_medio: 170.5, objetivo_min: 133.0, objetivo_max: 200.0, analistas: 6, tendencia_3m: 'estables', fuente: 'MarketScreener: BPA de 2026 y 2027 y objetivos de 6 analistas [D2, D3]' },
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
