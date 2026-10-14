// Parte del analista (Symrise, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((escenario) => ({
  escenario, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_2028[escenario], multiplo: null, precio: null,
  justificacion: T.casos_12m?.[escenario] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los dos segmentos comparten clientes, centros de creación y compras, tienen márgenes parecidos (23,8 % y 18,9 % de EBITDA ajustado en 2025) y no hay comparables puros de cada uno que aporten más que la tabla de comparables del grupo.', confianza: 'Media' },
  valoracion: {
    puente: S.puente,
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: {
        base: 'adelantado', actual: 23.3, mediana_5a: 28.6, minimo_5a: 18.4, media_larga: 28.2, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 32.5, minimo_5a: 18.8, media_larga: 30.1, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 25.0 },
      consenso: { bpa_ano1: 3.84, bpa_ano2: 4.36, objetivo_medio: 101.30, objetivo_min: null, objetivo_max: null, analistas: 16, tendencia_3m: 'estables', fuente: 'MarketScreener, 14-oct-2026 [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 109.4,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
