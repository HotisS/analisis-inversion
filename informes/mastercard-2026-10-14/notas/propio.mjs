// Parte del analista (Mastercard, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA de 2028e por escenario con la fórmula del método v2 (ventas × margen − amortización − financiero − impuestos) ÷ acciones.
const PRECIO = 589.14;
const VENTAS_2025 = 32791;
const ACC = 886; // acciones de hoy (estimación: 893 M de media diluida del 2T26 menos las recompras de jul-sep), sin recompras no anunciadas
const FIN = -350; // resultado financiero neto recurrente: intereses de ≈22.200 M de deuda menos los rendimientos de ≈13.000 M de caja e inversiones
function bpa(n, dg, dm) {
  let v = VENTAS_2025;
  const a = S.anios;
  for (let i = 0; i < n; i++) v *= 1 + (a[i].crecimiento_pct + (a[i].fijo ? 0 : dg)) / 100;
  const y = a[n - 1];
  const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
  const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
  const bn = (ebit + FIN) * (1 - y.tasa_impositiva_pct / 100);
  return { ventas: Math.round(v), ebitda: Math.round(v * m / 100), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: Math.round((bn / ACC) * 100) / 100 };
}
export const BPA = {
  Bajista: bpa(3, S.casos[0].ajuste_crecimiento_pp, S.casos[0].ajuste_margen_pp),
  Base: bpa(3, 0, 0),
  Alcista: bpa(3, S.casos[2].ajuste_crecimiento_pp, S.casos[2].ajuste_margen_pp),
};
export const BPA26 = bpa(1, 0, 0);
export const BPA27 = bpa(2, 0, 0);

const J = T.bpa_justificacion ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Mastercard publica dos líneas de ingresos (red de pagos y servicios de valor añadido), pero los servicios se venden sobre la misma red y a los mismos clientes, sin resultado por línea: no hay negocios con perfiles distintos que valorar por separado.', confianza: 'Media' },
  valoracion: {
    // Puente al 30-jun-2026 (10-Q del 2T y balance trimestral): deuda a largo plazo ≈22.200 M; caja 11.291 M + inversiones a corto 318 M.
    // US GAAP: los arrendamientos operativos no van al puente.
    puente: { fecha: '2026-06-30', deuda_financiera: 22200, arrendamientos: 0, caja: 11609, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D18]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER', beneficio_por_accion: BPA[e].bpa, multiplo: null, precio: null, justificacion: J[e] ?? null })),
      per_historico: { actual: Math.round((PRECIO / BPA27.bpa) * 10) / 10, mediana_5a: 33.9, minimo_5a: 32.0, media_larga: 33.9, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 18.8 },
      consenso: { bpa_ano1: 19.61, bpa_ano2: 22.27, objetivo_medio: 667.3, objetivo_min: 550, objetivo_max: 735, analistas: 37, tendencia_3m: 'subidas', fuente: 'MarketBeat y Zacks (BPA de 2026e y 2027e) e Investing.com (objetivos) [D3, D4]' },
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
