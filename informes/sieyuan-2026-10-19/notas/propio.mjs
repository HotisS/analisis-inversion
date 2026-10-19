// Parte del analista (Sieyuan Electric, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas chinas CAS (2021-2025 y 1S26)', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 796.9, arrendamientos: 58.06, caja: 8189.8, minoritarios: 353.18, pensiones: 0, asociadas: 130.3, otros_ajustes: 547.7 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
};
