// Parte del analista (KONE, corte 2026-10-18). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { if (!/Cannot find module/.test(e.message)) console.error('textos.mjs:', e.message); }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { if (!/Cannot find module/.test(e.message)) console.error('resumen.mjs:', e.message); }
const BPA = { Bajista: 2.16, Base: 2.41, Alcista: 2.55 };
export default {
  meta: {
    fecha_corte: '2026-10-18', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
      mercado_final: T.mercado_final ?? null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 211.8, arrendamientos: 472.6, caja: 1130.6, minoritarios: 33.4, pensiones: 117.8, asociadas: 0, otros_ajustes: 48.6 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (Damodaran, ERP T12m with sustainable payout); vale para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: BPA[e], multiplo: null, precio: null, justificacion: T.oj?.[e] ?? null })),
      per_historico: { base: 'adelantado', actual: 25.2, mediana_5a: 27.0, minimo_5a: 24.6, media_larga: 28.9, excluidos: T.excluidos ?? null, v2: { actual: 25.2, mediana_5a: 32.0, minimo_5a: 25.3, media_larga: 30.3, base: 'cierre' } },
      comparables_per: { mediana: 18.9 },
      consenso: { bpa_ano1: 2.05, bpa_ano2: 2.40, objetivo_medio: 59.75, objetivo_min: 46, objetivo_max: 82, analistas: 21, tendencia_3m: 'estables', fuente: 'MarketScreener (BPA publicado, 21 analistas) y Yahoo (objetivos) [D5, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
