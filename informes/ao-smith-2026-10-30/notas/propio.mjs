// Parte del analista (A. O. Smith, corte 2026-10-30, tras la venta del 81 % de China y el 3T26). El DCF, el puente y el objetivo a 12 meses vienen de D
// (cuentas de A comprobadas en EDGAR); aquí van escenarios, textos de síntesis y resumen. Citas: [A3] = fuente 3 de A.json.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-30', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  bolsa: { contexto: { comentario: T.contexto_comentario ?? null } },
  huecos_resueltos: [],
  rentabilidad: T.rentabilidad ?? null,
  dcf: { lectura: T.dcf_lectura ?? null },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica a la empresa que queda: Norteamérica es el 94 % de las ventas sin China. China, en venta, entra en el puente por el valor de la operación (en asociadas) [D].', confianza: 'Media' },
  valoracion: {
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      base_bpa: 'ajustado',
      // v2 (control) al cierre: cierre de cada año ÷ BPA ajustado del mismo año [D, notas de D].
      per_historico: { base_bpa: 'ajustado', v2: { actual: 17.2, mediana_5a: 18.3, minimo_5a: 17.4, media_larga: 21.0, base: 'cierre' } },
      diferencia_consenso: T.diferencia_consenso ?? null, comentario: T.objetivo12m_comentario ?? null },
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [],
  huecos: [],
};
