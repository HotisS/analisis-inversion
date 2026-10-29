// Parte del analista (Lennox, corte 2026-10-29, tras el 3T26 del 28-oct). El DCF, el puente y el objetivo a 12 meses vienen de D
// (cuentas de A comprobadas en EDGAR); aquí van escenarios, textos de síntesis y resumen. Citas: [A3] = fuente 3 de A.json.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-29', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? []), { ruta: 'bolsa.contexto.comentario', valor: T.contexto_comentario }],
  huecos_resueltos: [],
  rentabilidad: T.rentabilidad ?? null,
  dcf: { lectura: T.dcf_lectura ?? null },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: residencial (Home Comfort Solutions) y comercial (Building Climate Solutions) comparten fábricas, compras y red de distribución, y no hay comparables puros de cada uno que den un valor distinto [A].', confianza: 'Media' },
  valoracion: {
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      base_bpa: 'ajustado',
      // v2 (control) al cierre: cierre de cada año sobre el BPA ajustado del mismo año, 2021-2025 (25,7 / 16,9 / 24,9 / 26,8 / 21,0); media de 2018-2025 [D].
      per_historico: { v2: { actual: 15.7, mediana_5a: 24.9, minimo_5a: 16.9, media_larga: 23.5, base: 'cierre' } },
      diferencia_consenso: T.diferencia_consenso ?? null, comentario: T.objetivo12m_comentario ?? null },
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [],
  huecos: [],
};
