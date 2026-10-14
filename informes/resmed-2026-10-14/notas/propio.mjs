// Parte del analista (ResMed, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: el software (12 % de las ventas, y menos tras vender MatrixCare) no cambia la valoración; MatrixCare se valora en el puente por su precio de venta.', confianza: 'Media' },
  valoracion: {
    // Puente al 30-jun-2026. otros_ajustes = recompras pagadas después del balance (ASR de 450 M + ≈ 454 M en el mercado,
    // estimación con las 3,64 M de acciones que suma la autocartera hasta el 22-sep) − MatrixCare a su valor razonable menos costes de venta (457 M).
    puente: { fecha: '2026-06-30', deuda_financiera: 659.4, arrendamientos: 0, caja: 1469.2, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 447 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 20.4, mediana_5a: 23.8, minimo_5a: 16.9, media_larga: 30.1, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 28.2, minimo_5a: 18.0, media_larga: 36.0, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 16.8 },
      consenso: { bpa_ano1: 12.09, bpa_ano2: 13.24, objetivo_medio: 250.52, objetivo_min: 175, objetivo_max: 320, analistas: 20, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (BPA no GAAP, 20 analistas) y Stock Analysis (objetivos) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
