// Parte del analista (Straumann, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const anios = [
  { periodo: '2026e', crecimiento_pct: 3.0, margen_ebitda_pct: 30.8, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 8.5, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: true },
  { periodo: '2027e', crecimiento_pct: 7.0, margen_ebitda_pct: 31.6, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 8.5, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
  { periodo: '2028e', crecimiento_pct: 7.0, margen_ebitda_pct: 32.2, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 8.2, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
  { periodo: '2029e', crecimiento_pct: 6.5, margen_ebitda_pct: 32.6, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 8.0, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
  { periodo: '2030e', crecimiento_pct: 6.0, margen_ebitda_pct: 32.8, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 7.7, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
  { periodo: '2031e', crecimiento_pct: 5.5, margen_ebitda_pct: 33.0, amortizacion_pct_ventas: 5.4, capex_pct_ventas: 7.4, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
  { periodo: '2032e', crecimiento_pct: 5.0, margen_ebitda_pct: 33.0, amortizacion_pct_ventas: 5.5, capex_pct_ventas: 7.0, nwc_pct_ventas: 0.0, tasa_impositiva_pct: 21.0, fijo: false },
];

const puente = [
  { periodo: '2026e', volumen_pct: 5.8, precio_pct: 2.0, otros_pct: -4.8 },
  { periodo: '2027e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
  { periodo: '2028e', volumen_pct: 5.0, precio_pct: 2.0, otros_pct: 0.0 },
  { periodo: '2029e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 0.0 },
  { periodo: '2030e', volumen_pct: 4.0, precio_pct: 2.0, otros_pct: 0.0 },
];

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IFRS)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 0.54, beta: 1.1, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.0, tasa_impositiva_pct: 21.0, peso_deuda_pct: 3.0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 18.0 },
    etapa2: { usar: true, anios: 5, margen_final_pct: null, justificacion: T.etapa2_justificacion ?? null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? 'No aplica: la empresa publica un solo segmento operativo.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 509, arrendamientos: 0, caja: 381, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D16]' },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.35, multiplo: null, precio: null, justificacion: T.bpa_just?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.76, multiplo: null, precio: null, justificacion: T.bpa_just?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 4.05, multiplo: null, precio: null, justificacion: T.bpa_just?.Alcista ?? null },
      ],
      per_historico: { actual: 26.7, mediana_5a: 34.9, minimo_5a: 31.2, media_larga: 40.0, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 22.9 },
      consenso: { bpa_ano1: 3.12, bpa_ano2: 3.62, objetivo_medio: 114.75, objetivo_min: 81.11, objetivo_max: 152.83, analistas: 22, tendencia_3m: 'estables', fuente: 'Simply Wall St, Stocksguide y Fintel [D3, D6, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
