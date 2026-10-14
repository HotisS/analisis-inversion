// Parte del analista (Visa, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA de FY2028e por escenario con la fórmula del método v2 (ventas × margen − amortización − financiero − impuestos) ÷ acciones.
const ACC = 1880; // acciones de clase A equivalentes de hoy, sin recompras no anunciadas
const FIN = -250; // resultado financiero neto recurrente: ≈600 M de intereses de 23.858 M de deuda menos ≈350 M de la caja
function bpa2028(dg, dm) {
  let v = 40000;
  const a = S.anios;
  for (let i = 0; i < 3; i++) v *= 1 + (a[i].crecimiento_pct + (a[i].fijo ? 0 : dg)) / 100;
  const m = a[2].margen_ebitda_pct + dm;
  const ebit = v * (m - a[2].amortizacion_pct_ventas) / 100;
  const bn = (ebit + FIN) * (1 - a[2].tasa_impositiva_pct / 100);
  return { ventas: Math.round(v), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: Math.round((bn / ACC) * 100) / 100 };
}
export const BPA = {
  Bajista: bpa2028(S.casos[0].ajuste_crecimiento_pp, S.casos[0].ajuste_margen_pp),
  Base: bpa2028(0, 0),
  Alcista: bpa2028(S.casos[2].ajuste_crecimiento_pp, S.casos[2].ajuste_margen_pp),
};
// BPA de FY2027e base, para el PER actual
const v27 = 40000 * (1 + S.anios[0].crecimiento_pct / 100) * (1 + S.anios[1].crecimiento_pct / 100);
export const BPA27 = Math.round(((v27 * (S.anios[1].margen_ebitda_pct - 3) / 100 + FIN) * 0.82 / ACC) * 100) / 100;

const J = T.bpa_justificacion ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Visa reporta un único segmento y todas sus líneas de ingreso (servicios, procesamiento, internacional y valor añadido) dependen de la misma red: no hay negocios con perfiles distintos que valorar por separado.', confianza: 'Media' },
  valoracion: {
    // Puente al 30-jun-2026 (10-Q del 3T): deuda 23.858 M; caja, equivalentes e inversiones 13.900 M (sin la caja restringida del escrow
    // de litigios, que pertenece a los litigios cubiertos). US GAAP: los arrendamientos operativos no van al puente.
    puente: { fecha: '2026-06-30', deuda_financiera: 23858, arrendamientos: 0, caja: 13900, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D25]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER', beneficio_por_accion: BPA[e].bpa, multiplo: null, precio: null, justificacion: J[e] ?? null })),
      per_historico: { actual: Math.round((396.06 / BPA27) * 10) / 10, mediana_5a: 26.8, minimo_5a: 23.7, media_larga: 26.8, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 18.8 },
      consenso: { bpa_ano1: 13.14, bpa_ano2: 14.94, objetivo_medio: 419.36, objetivo_min: 330, objetivo_max: 466, analistas: 40, tendencia_3m: 'subidas', fuente: 'Zacks (BPA de FY2026e y FY2027e) y Stock Analysis (S&P Global) [D5, D8]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? T.secciones?.catalizadores ?? null,
  riesgos: T.riesgos ?? T.secciones?.riesgos ?? null,
  preguntas: T.preguntas ?? T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
