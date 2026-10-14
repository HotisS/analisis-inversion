// Parte del analista (Cadence, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA non-GAAP de 2028e por escenario (la base en que guía la empresa y cotiza el PER histórico):
// margen operativo non-GAAP = margen EBITDA limpio del DCF + remuneración en acciones (8,0 % de ventas) − depreciación (2,4 %).
// Resultado financiero recurrente ≈ −50 M (intereses de 2.482 M de bonos menos rendimiento de ≈ 1.440 M de caja).
// Impuesto non-GAAP del 16,5 % (el que usa la empresa). Acciones: 276 M (273,2 M diluidas de 2025 + 3,2 M de Hexagon), sin recompras no anunciadas.
const PRECIO = 352.84;
const VENTAS_2025 = 5297;
const ACC = 276.0;
const FIN = -50;
const SBC = 8.0, DEP = 2.4, TAX = 16.5;
function bpa(n, dg, dm) {
  let v = VENTAS_2025;
  const a = S.anios;
  for (let i = 0; i < n; i++) v *= 1 + (a[i].crecimiento_pct + (a[i].fijo ? 0 : dg)) / 100;
  const y = a[n - 1];
  const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
  const ebitNG = v * (m + SBC - DEP) / 100;
  const bn = (ebitNG + FIN) * (1 - TAX / 100);
  return { ventas: Math.round(v), margen_ng: Math.round((m + SBC - DEP) * 10) / 10, ebit: Math.round(ebitNG), beneficio: Math.round(bn), bpa: Math.round((bn / ACC) * 100) / 100 };
}
export const BPA = {
  Bajista: bpa(3, S.casos[0].ajuste_crecimiento_pp, S.casos[0].ajuste_margen_pp),
  Base: bpa(3, 0, 0),
  Alcista: bpa(3, S.casos[2].ajuste_crecimiento_pp, S.casos[2].ajuste_margen_pp),
};
export const BPA25 = (() => { const ebit = VENTAS_2025 * (38.4 + 8.6 - DEP) / 100; return Math.round(((ebit - 20) * (1 - TAX / 100) / 273.2) * 100) / 100; })();
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Cadence publica un solo segmento; sus tres familias (EDA de núcleo, IP y diseño de sistemas) se venden a los mismos clientes con el mismo modelo de licencia y no publica resultado por familia: no hay negocios con perfiles distintos que valorar por separado.', confianza: 'Media' },
  valoracion: {
    // Puente al 30-jun-2026 (10-Q del 2T26): bonos 2.482 M; caja 1.440 M. US GAAP: arrendamientos operativos fuera.
    puente: { fecha: '2026-06-30', deuda_financiera: 2482, arrendamientos: 0, caja: 1440, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D15]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e (BPA non-GAAP)', beneficio_por_accion: BPA[e].bpa, multiplo: null, precio: null, justificacion: J[e] ?? null })),
      per_historico: { actual: Math.round((PRECIO / BPA27.bpa) * 10) / 10, mediana_5a: 47.1, minimo_5a: 37.6, media_larga: 39.9, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 25.5 },
      consenso: { bpa_ano1: 8.12, bpa_ano2: 9.40, objetivo_medio: 401.44, objetivo_min: 349, objetivo_max: null, analistas: 18, tendencia_3m: 'subidas', fuente: 'Tickflow (BPA 2026e y 2027e) y MarketBeat (objetivos, 28-jul-2026) [D8, D5, D6]' },
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
