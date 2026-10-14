// Parte del analista (Sunbelt Rentals / Ashtead, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 4, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP (FY2025-FY2026); NIIF (FY2022-FY2024, Ashtead Group plc)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: T.parches ?? [],
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: General Tool y Specialty comparten flota, clientes y red de locales, y no hay cifras de resultado por segmento para valorarlos por separado.', confianza: 'Media' },
  valoracion: {
    // Deuda neta a 31-jul-2026 ≈ 1,8x × EBITDA ajustado LTM (4.782 M) = ≈8.600 M (estimación propia [A3, A13]); se pone como deuda bruta
    // 8.630 y caja 30. Arrendamientos operativos fuera (US GAAP: su gasto ya resta en el EBITDA).
    puente: { fecha: '2026-07-31', deuda_financiera: 8630, arrendamientos: 0, caja: 30, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D20]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 2.86, multiplo: null, precio: null, justificacion: T.o12?.bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 4.20, multiplo: null, precio: null, justificacion: T.o12?.base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 4.63, multiplo: null, precio: null, justificacion: T.o12?.alcista ?? null },
      ],
      per_historico: { actual: 19.2, mediana_5a: 18.55, minimo_5a: 15.26, media_larga: 18.19, excluidos: 'FY2021 (31,1x, máximo de la pandemia: burbuja de múltiplos). FY2026 con BPA limpio de los 134 M de costes no recurrentes (3,39 USD; PER 21,6x).' },
      comparables_per: { mediana: 19.35 },
      consenso: { bpa_ano1: 4.04, bpa_ano2: 4.57, objetivo_medio: 84.8, objetivo_min: 62, objetivo_max: 90, analistas: 11, tendencia_3m: 'subidas', fuente: 'WallStreetZen, Stockalarm, TickFlow y Google Finance [D3, D4, D7, D6]' },
      diferencia_consenso: T.o12?.diferencia ?? null,
      media: null,
      comentario: T.o12?.comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  fuentes: [],
};
