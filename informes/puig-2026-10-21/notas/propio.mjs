// Parte del analista (Puig, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, referencia_mercado } from './supuestos.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [
    // Regla 13: ni las ventas ya publicadas ni el Capital Markets Day del 28-oct retrasan (METODO-VIGENTE §4.13).
    { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.condicion', valor: null },
    ...(T.parches ?? []),
  ],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    ...(T.puente ? { puente: T.puente } : {}),
    referencia_mercado,
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      // BPA de la revisión del 13-oct (0,91 / 1,21 / 1,33) con 0,5 puntos más de ventas en 2026e (nueve meses mejores de lo previsto).
      casos: [['Bajista', 0.92], ['Base', 1.22], ['Alcista', 1.34]].map(([e, b]) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: b, multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      // Solo dos cierres desde la OPV: historia al cierre (regla v2). Actual = 19,59 ÷ 1,13 (nuestro BPA de 2027e).
      per_historico: { base: 'adelantado', actual: 17.3, mediana_5a: 15.2, minimo_5a: 13.5, media_larga: null, excluidos: 'Solo dos años desde la OPV. Adelantado: cierre de 2024 (17,83 EUR) ÷ BPA de 2025 (1,05) = 17,0x; cierre de 2025 (14,87) ÷ BPA de 2026e (≈1,10) = 13,5x. Actual = 19,59 EUR ÷ 1,13 (nuestro BPA de 2027e).', v2: { actual: 17.3, mediana_5a: 16.6, minimo_5a: 14.2, media_larga: null, base: 'cierre' } },
      comparables_per: { mediana: 28.2 },
      consenso: { bpa_ano1: 1.108, bpa_ano2: 1.191, objetivo_medio: 19.94, objetivo_min: 16, objetivo_max: 22, analistas: 16, tendencia_3m: 'subidas', fuente: 'MarketScreener y Stock Analysis, 21-oct-2026, antes de las revisiones tras las ventas [D5, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
