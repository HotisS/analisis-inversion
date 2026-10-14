// Parte del analista (Graco, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)['2028e'].bpa]));
const just12 = T.casos_12m ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente a 26-jun-2026: deuda = notes payable 28,1 + parte corriente de deuda a largo 1,1; arrendamientos operativos fuera (US GAAP: ya en el EBITDA).
    // Pensiones: déficit de 12,1 (pensiones) + 20,8 (médico de jubilados) a dic-25 = 32,9, neto de impuestos (21 %) = 26,0.
    // otros_ajustes = Valco Melton pagada el 31-ago-26 (447 M − ≈40 M de valor actual de ventajas fiscales = 407) + contraprestación contingente 1,6.
    puente: { fecha: '2026-06-26', deuda_financiera: 29.2, arrendamientos: 0, caja: 507.6, minoritarios: 0, pensiones: 26.0, asociadas: 0, otros_ajustes: 408.6 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D26]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e], multiplo: null, precio: null, justificacion: just12[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 23.06, mediana_5a: 27.91, minimo_5a: 21.49, media_larga: 26.54,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 27.72, minimo_5a: 25.29, media_larga: 28.33, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 24.1 },
      consenso: { bpa_ano1: 3.22, bpa_ano2: 3.44, objetivo_medio: 91.14, objetivo_min: 84, objetivo_max: 100, analistas: 10, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA 2026-2027) y Stock Analysis (objetivos) [D24, D23]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
