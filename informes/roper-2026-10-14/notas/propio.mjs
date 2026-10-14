// Parte del analista (Roper Technologies, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const B = S.bpas;
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No la usamos: los tres segmentos comparten la misma lógica de caja (márgenes altos, poca inversión) y solo publican el resultado antes de costes centrales; una suma de partes con múltiplos de software para el 78 % y de instrumentos para el 22 % daría un valor parecido al de los comparables, que ya mezclan los dos grupos.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 11319.4, arrendamientos: 0, caja: 364.9, minoritarios: 0, pensiones: 0, asociadas: 1792.2, otros_ajustes: 200 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: B.bajista2028.bpa, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: B.b2028.bpa, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: B.alcista2028.bpa, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { ...S.per_historico, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 30.7 },
      consenso: { bpa_ano1: 18.72, bpa_ano2: 20.16, objetivo_medio: 439.43, objetivo_min: 355, objetivo_max: 625, analistas: 19, tendencia_3m: 'estables', fuente: 'BPA GAAP 2027-2028 y objetivo medio de MarketScreener; mínimo y máximo de MarketBeat [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media12 ?? null,
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
