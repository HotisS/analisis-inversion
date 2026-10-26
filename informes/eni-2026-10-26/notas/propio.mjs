// Parte del analista (Eni, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de 30-sep-2026 [A3]: deuda bruta 34.390; caja 11.767 + activos financieros a valor razonable 8.371 + créditos
    // financieros no operativos 7.550 = 27.688 (deuda neta 6.702). Participadas: método de la participación 24.362 + otras
    // 1.429. Otros ajustes: híbridos perpetuos de Eni 5.990 + aportación de inversores a la cartera de infraestructuras de
    // E&P 1.753 (derecho a sus dividendos, como un minoritario) + recompra del 1 al 16-oct 240 (las acciones son las del 16-oct).
    // Pensiones: 719 de provisiones por prestaciones a empleados, netas de impuestos al 24 % = 546.
    puente: { fecha: '2026-09-30', deuda_financiera: 34390, arrendamientos: 5614, caja: 27688, minoritarios: 3132, pensiones: 546, asociadas: 25791, otros_ajustes: 7983 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 7.97 },
      consenso: { bpa_ano1: 2.94, bpa_ano2: 2.7, objetivo_medio: 26.99, objetivo_min: 21.8, objetivo_max: 32, analistas: 22, tendencia_3m: 'subidas', fuente: 'Stock Analysis / S&P Global, 22 analistas, 24-oct-2026 (BPA ajustado) [D2]' },
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
