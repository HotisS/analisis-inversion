// Parte del analista (Netflix, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos } from './supuestos.mjs';
import { objetivo_12m } from './nuevo.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [
    ...(T.parches ?? []),
    // Acciones a 30-sep: la media ponderada diluida del 3T (4.195,1 M) no recoge del todo la recompra de 63,9 M de acciones del trimestre [D31].
    { ruta: 'identificacion.acciones', valor: 4170 },
    // Regla 13: unos resultados nunca retrasan una decisión; la reacción de hoy se mide con robustez --actual al precio del momento.
    { ruta: 'bolsa.contexto.veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.condicion', valor: null },
    { ruta: 'bolsa.contexto.noticias[0].veredicto', valor: 'no cambia' },
    { ruta: 'bolsa.contexto.noticias[0].condicion', valor: null },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Netflix tiene un único segmento operativo y no publica resultados por región ni por línea de negocio (suscripción, publicidad, juegos); una suma de partes dependería de cómo se repartieran los 16.422 M de amortización de contenidos de 2025 [A1].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 15132, arrendamientos: 0, caja: 8223, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    pesos,
    objetivo_12m,
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
