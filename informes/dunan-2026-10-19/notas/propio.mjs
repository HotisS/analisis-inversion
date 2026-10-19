// Parte del analista (DunAn, corte 2026-10-19). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import(`./textos.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = {};
try { R = (await import(`./resumen.mjs?t=${Date.now()}`)).default; } catch (e) { console.error('resumen.mjs:', e.message); R = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-19', divisa: 'CNY', divisa_cotizacion: 'CNY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'Normas contables chinas (CAS)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la empresa publica un solo segmento (fabricación de equipos generales) y no da resultado por línea; los equipos (9 %) y la gestión térmica del vehículo (9 %) comparten fábricas, clientes y tecnología con los componentes [A1].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 719.4, arrendamientos: 27.6, caja: 3622.9, minoritarios: 0, pensiones: 0, asociadas: 461.0, otros_ajustes: 107.4 },
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
  resumen: R.resumen ?? null,
  fuentes: T.fuentes ?? [],
};
