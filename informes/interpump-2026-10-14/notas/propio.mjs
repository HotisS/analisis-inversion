// Parte del analista (Interpump, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S, { bpa } from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const B = Object.fromEntries(S.casos.map((c) => [c.escenario, bpa(c)['2028e'].bpa]));
const just12 = T.casos_12m ?? {};

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
    // Puente a 30-jun-2026: deuda bruta 675,3 M (bancos 33,4 + con intereses 641,9) de la que ≈77,1 M son arrendamientos (dato de dic-25);
    // TFR 21,9 M neto de impuestos (24 %) = 16,6; otros_ajustes = deuda por compra de minoritarios 64,3 M + MVV y Teknoice (24 M, jul-26).
    puente: { fecha: '2026-06-30', deuda_financiera: 598.2, arrendamientos: 77.1, caja: 369.6, minoritarios: 10.5, pensiones: 16.6, asociadas: 0, otros_ajustes: 88.3 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: B[e], multiplo: null, precio: null, justificacion: just12[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 15.14, mediana_5a: 21.82, minimo_5a: 16.44, media_larga: 20.61,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 20.08, minimo_5a: 16.70, media_larga: 22.11, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 23.65 },
      consenso: { bpa_ano1: 2.147, bpa_ano2: 2.39, objetivo_medio: 46.56, objetivo_min: null, objetivo_max: null, analistas: 8, tendencia_3m: 'estables', fuente: 'Zonebourse/MarketScreener (BPA 2026-2027 y objetivo medio) [D3]' },
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
