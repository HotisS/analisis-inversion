// Parte del analista (Tencent, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

const r2 = (x) => Math.round(x * 100) / 100;
const b = { Bajista: bpa('2028e', { g: -3, m: -3 }), Base: bpa('2028e'), Alcista: bpa('2028e', { g: 2, m: 1.5 }) };
const precio = 365.25; // 425,20 HKD × 0,859
const bpa27 = bpa('2027e').bpa;

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CNY', divisa_cotizacion: 'HKD', tipo_cambio: 0.859, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS)', formato_cuenta: 'funcion',
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
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 453000, arrendamientos: 0, caja: 511200, minoritarios: 86913, pensiones: 0, asociadas: 700080, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D9]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({
        escenario: e, metrica: 'PER 2028e (BPA no NIIF)', beneficio_por_accion: r2(b[e].bpa), multiplo: null, precio: null,
        justificacion: T.just12?.[e] ?? null,
      })),
      per_historico: { actual: Math.round((precio / bpa27) * 10) / 10, mediana_5a: 16.8, minimo_5a: 16.3, media_larga: 17.5,
        excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 15.3 },
      consenso: { bpa_ano1: 30.61, bpa_ano2: 33.83, objetivo_medio: 581.91, objetivo_min: 369.59, objetivo_max: 794.62, analistas: 51, tendencia_3m: 'estables', fuente: 'Fintel (objetivos, 2-oct-2026), Aktien.guide (BPA) y ValueInvesting.io (recomendaciones), a 0,859 RMB/HKD [D5, D6, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
