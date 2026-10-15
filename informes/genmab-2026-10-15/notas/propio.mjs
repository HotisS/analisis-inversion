// Parte del analista (Genmab, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((e) => ({
  escenario: e, metrica: 'PER 2028e (BPA normalizado 2028e-2030e)', beneficio_por_accion: S.BPA_NORM[e], multiplo: null, precio: null,
  justificacion: T.just12?.[e] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'DKK', tipo_cambio: 0.14994, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica de forma fiable: las regalías y los productos propios comparten I+D y estructura, y la empresa no publica el beneficio de cada negocio. La caducidad de las regalías se recoge en la proyección del DCF año a año.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 5375, arrendamientos: 150, caja: 1503, minoritarios: 0, pensiones: 0, asociadas: 37, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: {
        base: 'adelantado', actual: 22.9, mediana_5a: 28.5, minimo_5a: 13.5, media_larga: 32.8,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 33.4, minimo_5a: 11.9, media_larga: 31.9, excluidos: 'Historia al cierre (precio de cierre en USD ÷ BPA diluido del mismo año): 2021 56,3x; 2022 37,1x; 2023 33,4x; 2024 11,9x; 2025 20,7x. Media larga 2021-2025.' },
      },
      comparables_per: { mediana: 12.2 },
      consenso: { bpa_ano1: 17.23, bpa_ano2: 25.94, objetivo_medio: 395.19, objetivo_min: 335.0, objetivo_max: 580.0, analistas: 17, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA 2027e 114,9 y 2028e 173 DKK; objetivo medio 2.635,67 DKK) y Stock Analysis (mínimo 33,5 y máximo 58 USD por ADS) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario12 ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  fuentes: T.fuentes ?? [],
};
