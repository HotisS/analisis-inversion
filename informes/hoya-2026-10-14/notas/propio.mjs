// Parte del analista (HOYA, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA propio por escenario (FY2027e y FY2028e) con la fórmula del método v2.
const VENTAS_FY2026 = 947749;
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
const PRECIO = 25055;

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS)', formato_cuenta: 'naturaleza',
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
    // Balance de mar-26. Acciones de hoy (333,87 M: 334,84 M emitidas tras amortizar en mayo las de la recompra de 100.000 M, menos las 973.500 compradas en agosto).
    // otros_ajustes: dividendo final de FY2026 pagado en junio (170 JPY × 334,8 M ≈ 56.900 M) + recompra de agosto (25.000 M), pagados después del balance.
    puente: { fecha: '2026-03-31', deuda_financiera: 0, arrendamientos: 42200, caja: 574092, minoritarios: 14544, pensiones: 0, asociadas: 0, otros_ajustes: 81900 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D15]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: { actual: Math.round((PRECIO / bpa27) * 10) / 10, mediana_5a: 36.6, minimo_5a: 26.7, media_larga: 34.3, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 17.8 },
      consenso: { bpa_ano1: 791, bpa_ano2: null, objetivo_medio: 27771, objetivo_min: 22000, objetivo_max: 31500, analistas: 14, tendencia_3m: 'estables', fuente: 'Stockopedia e Investing [D4, D5]' },
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
