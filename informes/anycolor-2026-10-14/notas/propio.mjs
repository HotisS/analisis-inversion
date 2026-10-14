// Parte del analista (ANYCOLOR, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA propio por escenario (FY2027e y FY2028e) con la fórmula del método v2.
const VENTAS_FY2026 = 55681;
export function bpa(caso, hasta = 2) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_FY2026; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    v = v * (1 + (a.crecimiento_pct + c.ajuste_crecimiento_pp) / 100);
    const ebitda = v * (a.margen_ebitda_pct + c.ajuste_margen_pp) / 100;
    const amort = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - amort;
    const bai = ebit + S.bpa.fin_recurrente;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    const acc = i === 0 ? S.bpa.acciones_fy2027 : S.bpa.acciones_fy2028;
    r = { ventas: v, ebitda, amort, ebit, bai, impuestos: bai * a.tasa_impositiva_pct / 100, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista'), Base: bpa('Base'), Alcista: bpa('Alcista') };
const bpa27 = bpa('Base', 1).bpa;
const PRECIO = 3050;

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 4, etiqueta_ejercicio: 'fin', normas_contables: 'J-GAAP (no consolidadas)', formato_cuenta: 'funcion',
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Balance de abr-26. Acciones de hoy ≈ 60,3 M (estimación: patrimonio / valor contable por acción del PBR de agosto). otros_ajustes: dividendo final de 40 JPY pagado en julio (≈ 2.412 M).
    puente: { fecha: '2026-04-30', deuda_financiera: 0, arrendamientos: 0, caja: 22050, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 2412 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: { actual: Math.round((PRECIO / bpa27) * 10) / 10, mediana_5a: 15.0, minimo_5a: 12.0, media_larga: 14.6, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 19.7 },
      consenso: { bpa_ano1: 261.5, bpa_ano2: 291.2, objetivo_medio: 3932, objetivo_min: 2650, objetivo_max: 5500, analistas: 5, tendencia_3m: null, fuente: 'Monex 銘柄スカウター e Investing [D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
