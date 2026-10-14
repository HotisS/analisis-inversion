// Parte del analista (ServiceNow, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 10-Q a 30-jun-2026: bonos 5.435 M + pagarés 2.100 M; efectivo 2.503 M + valores negociables ≈4.200 M.
    // US GAAP: los arrendamientos operativos ya están en el EBITDA y no van al puente.
    puente: { fecha: '2026-06-30', deuda_financiera: 7535, arrendamientos: 0, caja: 6703, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D23]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 2.14, multiplo: null, precio: null, justificacion: T.oc_bajista ?? 'Ventas de 20.619 M (5 puntos menos de crecimiento en 2027-28) y margen EBITDA del 20 %: EBIT de 2.887 M, resultado financiero nulo, impuesto del 22 % y 1.050 M de acciones.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.01, multiplo: null, precio: null, justificacion: T.oc_base ?? 'Ventas de 22.488 M y margen EBITDA del 24 % menos un 6 % de amortización: EBIT de 4.048 M, resultado financiero nulo, impuesto del 22 % y 1.050 M de acciones.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.51, multiplo: null, precio: null, justificacion: T.oc_alcista ?? 'Ventas de 23.649 M y margen EBITDA del 26 %: EBIT de 4.730 M y 1.050 M de acciones.' },
      ],
      per_historico: {
        base: 'adelantado',
        actual: 58.7, mediana_5a: null, minimo_5a: null, media_larga: null,
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 24.7 },
      consenso: { bpa_ano1: 4.07, bpa_ano2: 5.01, objetivo_medio: 149.38, objetivo_min: null, objetivo_max: null, analistas: 49, tendencia_3m: 'subidas', fuente: 'Stock Analysis (S&P Global), BPA no GAAP; subidas de BofA, Evercore y Oppenheimer [D5, D7-D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
