// Parte del analista (Diageo, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }
let S = {};
try { S = await import('./supuestos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; S = {}; }
export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'USD', divisa_cotizacion: 'GBP', tipo_cambio: 1.32354, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (adoptadas en el Reino Unido y emitidas por el IASB)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  ...(S.dcf ? { dcf: { ...S.dcf, justificacion: T.dcf_justificacion ?? null, lectura: T.dcf_lectura ?? null, sostenibilidad: { ...S.sostenibilidad, veredicto: T.sost_veredicto ?? null, justificacion: T.sost_justificacion ?? null }, confianza: 'Media' } } : {}),
  ...(S.casos ? { escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' } } : {}),
  ...(S.suma_partes ? { suma_partes: { ...S.suma_partes, comentario: T.sdp_comentario ?? null, confianza: 'Media' } } : {}),
  valoracion: { puente: S.puente ?? {}, referencia_mercado: S.referencia_mercado ?? null, pesos: S.pesos ?? { dcf: 0, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 0 }, comentario: T.valoracion_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
