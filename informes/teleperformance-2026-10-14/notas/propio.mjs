// Parte del analista (Teleperformance, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Balance de 30-jun-2026 (Stock Analysis): deuda 3.629 + 617; arrendamientos 601 + 200; caja 1.027. Minoritarios no significativos (sin dato).
    puente: { fecha: '2026-06-30', deuda_financiera: 4246, arrendamientos: 801, caja: 1027, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 6.36, multiplo: null, precio: null, justificacion: 'Ventas de 9.384 M (−4 puntos de crecimiento en 2027-28: los clientes automatizan con IA y los volúmenes caen un 3-4 % al año, como descuenta hoy Concentrix) y margen EBITDA del 15,0 %: EBIT de 826 M, 280 M de gasto financiero, impuesto del 32 % y 58,4 M de acciones.' },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 10.12, multiplo: null, precio: null, justificacion: 'Ventas de 10.170 M (+1 % en 2027 y +2 % en 2028, volúmenes planos y algo de precio y servicios de IA) y margen EBITDA del 17,5 % con los ahorros de 150-170 M: EBIT de 1.149 M, 280 M de gasto financiero, impuesto del 32 % y 58,4 M de acciones sin recompras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 11.13, multiplo: null, precio: null, justificacion: 'Ventas de 10.473 M (+1,5 puntos: vuelve el crecimiento comparable del 2-3 % con servicios de IA) y margen del 18,0 %: EBIT de 1.236 M.' },
      ],
      per_historico: { actual: 8.15, mediana_5a: 11.35, minimo_5a: 7.36, media_larga: 12.70, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 7.9 },
      consenso: { bpa_ano1: 9.00, bpa_ano2: 9.89, objetivo_medio: 75.33, objetivo_min: null, objetivo_max: null, analistas: null, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA, antes del 1S26) y ABC Bourse (objetivo medio, octubre) [D6, D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
