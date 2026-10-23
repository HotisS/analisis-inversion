// Parte del analista (Schneider Electric, corte 2026-10-23, tras las ventas del 3T26 y la compra de PTC). El DCF, el puente y el objetivo a 12 meses vienen de D
// (supuestos revisados con la nota oficial de 9M26); aquí van escenarios, textos de síntesis y resumen. Citas: [A3] = fuente 3 de A.json.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-23', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: [],
  dcf: { lectura: T.dcf_lectura ?? null },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Gestión de la Energía y Automatización Industrial comparten clientes, software y costes centrales; el valor se calcula para el grupo [A].', confianza: 'Media' },
  valoracion: {
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      // v2 (control) al cierre: cierre de cada año sobre el BPA ajustado del año, 2021-2025 (28,2 / 18,4 / 25,0 / 28,9 / 27,3) [D].
      per_historico: { v2: { actual: 20.7, mediana_5a: 27.3, minimo_5a: 18.4, media_larga: 25.6, base: 'cierre' } },
      diferencia_consenso: T.diferencia_consenso ?? null, comentario: T.objetivo12m_comentario ?? null },
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [],
  huecos: [],
};
