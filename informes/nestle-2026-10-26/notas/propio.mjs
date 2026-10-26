// Parte del analista (Nestlé, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const PRECIO = 83.7; // cierre del 23-oct-2026 (la sesión del 26 no había cerrado)
const r1 = (x) => Math.round(x * 10) / 10;

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
      mercado_final: { periodo: S.mercado_final.periodo, tamano: S.mercado_final.tamano },
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-26 [A5, D28]: deuda financiera 60.242 (62.845 de deuda bruta − 2.603 de arrendamientos); caja 6.501
    // (6.134 de caja e inversiones a corto + 367 de derivados de cobertura de la deuda; deuda neta publicada 56.344).
    // Minoritarios 274; pensiones ≈490 (déficit neto de 631 M, después de impuestos al 23 %).
    // Asociadas: L'Oréal a mercado (107,621 M de acciones × 436,30 EUR × 0,9227 CHF/EUR = 43.325 M CHF [D29, D27]) +
    // resto (Froneri y otras) a valor contable ≈2.674 M = 45.999.
    // otros_ajustes −2.700: +900 de deuda que sube al desconsolidar Rusia [D1]; −2.800 de caja neta de la sociedad conjunta de
    // aguas y −800 de la venta de vitaminas (cobros en el 1S27, negocios que salen de la proyección) [A7].
    puente: { fecha: '2026-06-30', deuda_financiera: 60242, arrendamientos: 2603, caja: 6501, minoritarios: 274, pensiones: 490, asociadas: 45999, otros_ajustes: -2700 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, Implied ERP by month [D26]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos12m ?? ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'][e], multiplo: null, precio: null, justificacion: null })),
      per_historico: {
        base: 'adelantado', actual: r1(PRECIO / S.bpa['2027e']), mediana_5a: 20.4, minimo_5a: 16.9, media_larga: 21.3, anios: 9,
        excluidos: T.per_excluidos ?? null,
        v2: { actual: r1(PRECIO / S.bpa['2027e']), mediana_5a: 20.3, minimo_5a: 15.7, media_larga: 21.7, base: 'cierre' },
      },
      comparables_per: { mediana: 19.3 },
      consenso: { bpa_ano1: 3.83, bpa_ano2: 4.35, objetivo_medio: 89.04, objetivo_min: 72, objetivo_max: 100, analistas: 23, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA publicado, con reestructuración y deterioros) e Investing.com (objetivos) [D5, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Alta' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
