// Parte del analista (Daikin, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente 1 de propio.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// BPA propio por escenario (FY2027e y FY2028e) con la fórmula del método: ventas × margen − amortización + resultado financiero, impuestos, minoritarios, ÷ acciones.
// La amortización incluye la del fondo de comercio (J-GAAP: ≈ 51.000 M al año, sin efecto fiscal relevante; se deja dentro, como en el beneficio publicado).
const VENTAS_FY2026 = 5015036;
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
    const minor = i === 0 ? S.bpa.minoritarios : S.bpa.minoritarios_fy2028;
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - minor;
    const acc = i === 0 ? S.bpa.acciones_fy2027 : S.bpa.acciones_fy2028;
    r = { ventas: v, ebitda, amort, ebit, bai, impuestos: bai * a.tasa_impositiva_pct / 100, neto, acciones: acc, bpa: neto / acc };
  }
  return r;
}
const r2 = (x) => Math.round(x * 100) / 100;
const B = { Bajista: bpa('Bajista'), Base: bpa('Base'), Alcista: bpa('Alcista') };
const bpa27 = bpa('Base', 1).bpa;
const PRECIO = 21575;

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'J-GAAP (normas japonesas)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance de jun-26 (tras la recompra de 349.997 M del 1T). Acciones en circulación: 278,34 M.
    // otros_ajustes: valores de inversión (212.415 M, sobre todo participaciones cruzadas en bancos y clientes que Daikin está vendiendo) netos de un 30 % de impuesto ≈ 148.700 M; se suman como activo no operativo (signo negativo: resta de la deuda).
    puente: { fecha: '2026-06-30', deuda_financiera: 1206598, arrendamientos: 211423, caja: 925534, minoritarios: 63802, pensiones: 0, asociadas: 26706, otros_ajustes: -148700 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: r2(B[e].bpa), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado',
        actual: Math.round((PRECIO / bpa27) * 10) / 10,
        mediana_5a: 22.8, minimo_5a: 17.2, media_larga: 22.4,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 23.2, minimo_5a: 17.9, media_larga: 22.9, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 17.4 },
      consenso: { bpa_ano1: 996.06, bpa_ano2: 1150.45, objetivo_medio: 24638, objetivo_min: 20700, objetivo_max: 28800, analistas: 13, tendencia_3m: 'estables', fuente: 'Yahoo Finance, 14-oct-2026 [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.comentario_12m ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  ...(R ? { resumen: R } : {}),
  fuentes: T.fuentes ?? [],
};
