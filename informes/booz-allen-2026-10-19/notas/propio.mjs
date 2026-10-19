// Parte del analista (Booz Allen, corte 2026-10-19). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Defensa, Inteligencia y Civil comparten plantilla, contratos marco y costes indirectos, y la empresa no publica el resultado de cada tipo de cliente; no hay comparables puros que den un múltiplo distinto con fiabilidad.', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [A3]. Deuda a valor contable (3.917 + 19). Arrendamientos operativos (US GAAP) fuera: ya están en el EBITDA.
    // otros_ajustes: +720 M = precio de Ultra Mission Solutions, pagado el 24-ago-2026, después del balance [A13]. Los bonos de agosto (1.200 M)
    // menos el préstamo A-1 amortizado (714 M) suben deuda y caja en 486 M: neutro para la deuda neta.
    puente: { fecha: '2026-06-30', deuda_financiera: 3936, arrendamientos: 0, caja: 540, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 720 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 13.4, mediana_5a: 19.0, minimo_5a: 14.1, media_larga: 19.0,
        excluidos: T.per_excluidos ?? null,
        v2: { base: 'cierre', actual: 13.4, mediana_5a: 21.7, minimo_5a: 14.2, media_larga: 20.9, excluidos: T.per_v2 ?? null },
      },
      comparables_per: { mediana: 12.0 },
      consenso: { bpa_ano1: 5.92, bpa_ano2: 6.39, objetivo_medio: 84.38, objetivo_min: 63.0, objetivo_max: 140.0, analistas: 15, tendencia_3m: 'estables', fuente: 'MarketScreener: BPA de FY2027 y FY2028 y objetivos de 15 analistas [D2, D3]' },
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
