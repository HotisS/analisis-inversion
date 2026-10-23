// Parte del analista (Viscofan, corte 2026-10-23, tras los resultados de 9M26). El DCF, el puente y el objetivo a 12 meses vienen de D
// (supuestos revisados con la nota oficial de 9M26); aquí van escenarios, textos de síntesis y resumen. Citas: [A3] = fuente 3 de A.json.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -2, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: 8 },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-23', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: [],
  dcf: { lectura: T.dcf_lectura ?? null },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la empresa reporta un único segmento (NIIF 8) y no publica resultados por división; una suma de partes exigiría inventar márgenes [A].', confianza: 'Alta' },
  valoracion: {
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      // v2 (control) al cierre: PER de cada cierre sobre el BPA del año, 2021-2025 (19,9 / 20,1 / 17,6 / 17,7 / 15,2), como en el informe del 6-oct.
      per_historico: { v2: { actual: 15.1, mediana_5a: 17.7, minimo_5a: 15.2, media_larga: 18.1, base: 'cierre' } },
      diferencia_consenso: T.diferencia_consenso ?? null, comentario: T.objetivo12m_comentario ?? null },
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: [],
  huecos: [],
};
