// Parte del analista (ASML, corte 2026-11-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const BPA = { Bajista: 49.65, Base: 68.37, Alcista: 75.17 };

export default {
  meta: {
    fecha_corte: '2026-11-27', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'ASML es un solo negocio (litografía y su servicio): sistemas y base instalada comparten clientes, tecnología y múltiplo. No aplica.', confianza: 'Alta' },
  valoracion: {
    // Balance del 3T26 (27-sep): caja e inversiones a corto 12.735 M; deuda ≈ 2.697 M (4.391 M de dic-25 − 1.694 M devueltos en 2026; largo plazo 1.963 M).
    // Asociadas: puesta en equivalencia (Zeiss SMT) 1.129 M + participaciones a valor razonable (Mistral AI) 2.239 M. Otros ajustes: −2.086 M de préstamos a cobrar a Zeiss SMT
    // (activo financiero) + 718 M del dividendo pagado el 4-nov (1,88 × 382 M). Arrendamientos operativos fuera (US GAAP).
    puente: { fecha: '2026-09-27', deuda_financiera: 2697, arrendamientos: 0, caja: 12735, minoritarios: 0, pensiones: 0, asociadas: 3369, otros_ajustes: -1368 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, noviembre de 2026 [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e', base_bpa: 'publicado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.objetivo_casos?.[e] ?? null })),
      per_historico: { base: 'adelantado', base_bpa: 'publicado', actual: 21.1, mediana_5a: 26.4, minimo_5a: 22.3, media_larga: 27.4, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 20.2 },
      consenso: { bpa_ano1: 41.38, bpa_ano2: 56.94, objetivo_medio: 2095.94, objetivo_min: 1288, objetivo_max: 2507, analistas: 33, tendencia_3m: 'subidas', fuente: 'Yahoo Finance, earningsTrend y financialData del 27-nov-2026 [D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
