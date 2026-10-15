// Parte del analista (DO & CO, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: catering aéreo, eventos y restaurantes comparten cocinas, compras y marca, y el valor está en el catering aéreo (más del 70 % de las ventas). La participación del 50 % de Turkish Airlines en THY DO & CO se trata en el puente como minoritarios a valor de mercado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 12.6, arrendamientos: 235.5, caja: 269.1, minoritarios: 441.7, pensiones: 19.7, asociadas: 6.65, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D12]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2029e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 16.9, mediana_5a: 16.9, minimo_5a: 14.1, media_larga: 17.6, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 21.05, minimo_5a: 16.8, media_larga: 22.7, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 14.0 },
      consenso: { bpa_ano1: 11.24, bpa_ano2: 12.86, objetivo_medio: 258.06, objetivo_min: null, objetivo_max: null, analistas: 8, tendencia_3m: 'subidas', fuente: 'MarketScreener, estimaciones anuales y consenso (8 analistas) [D2]' },
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
