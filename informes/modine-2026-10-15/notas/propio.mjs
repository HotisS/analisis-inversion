// Parte del analista (Modine, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (perímetro sin Performance Technologies; ejercicio abril-marzo, etiqueta del año en que termina).
const anios = [
  { periodo: 'FY2027e', crecimiento_pct: 38, margen_ebitda_pct: 15.0, amortizacion_pct_ventas: 2.2, capex_pct_ventas: 5.5, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2028e', crecimiento_pct: 30, margen_ebitda_pct: 17.0, amortizacion_pct_ventas: 2.3, capex_pct_ventas: 5.0, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2029e', crecimiento_pct: 18, margen_ebitda_pct: 17.5, amortizacion_pct_ventas: 2.5, capex_pct_ventas: 4.8, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2030e', crecimiento_pct: 12, margen_ebitda_pct: 17.5, amortizacion_pct_ventas: 2.7, capex_pct_ventas: 4.2, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2031e', crecimiento_pct: 9, margen_ebitda_pct: 17.0, amortizacion_pct_ventas: 2.9, capex_pct_ventas: 4.0, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2032e', crecimiento_pct: 7, margen_ebitda_pct: 17.0, amortizacion_pct_ventas: 3.0, capex_pct_ventas: 3.8, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
  { periodo: 'FY2033e', crecimiento_pct: 5, margen_ebitda_pct: 17.0, amortizacion_pct_ventas: 3.1, capex_pct_ventas: 3.6, nwc_pct_ventas: 22, tasa_impositiva_pct: 24, fijo: false },
];
const wacc = { tasa_libre_pct: 5.21, beta: 1.45, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 6.0, tasa_impositiva_pct: 24, peso_deuda_pct: 4 };
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -8, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 6, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio de FY2029e (ejercicio objetivo: el primero que cierra más de 18 meses después del corte) y FY2028e.
// ventas × margen − amortización − intereses (15 M) − impuestos 24 %, ÷ 54,5 M de acciones (54,0 hoy + dilución de planes).
const bpa = (g, dm) => {
  let v = 2055.4; const cr = [38, 30, 18], mg = [15.0, 17.0, 17.5], am = [2.2, 2.3, 2.5];
  let out = [];
  for (let i = 0; i < 3; i++) { v *= 1 + (cr[i] + g) / 100; const e = v * (mg[i] + dm) / 100 - v * am[i] / 100 - [20, 17, 15][i]; out.push(Math.round((e * 0.76 / [54.1, 54.3, 54.5][i]) * 100) / 100); }
  return out;
};
const B = { Bajista: bpa(-8, -2.5), Base: bpa(0, 0), Alcista: bpa(6, 2) };

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc,
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 13 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: 'FY2027e', volumen_pct: 33, precio_pct: 3, otros_pct: 2, comentario: T.puente?.FY2027e ?? null },
        { periodo: 'FY2028e', volumen_pct: 27, precio_pct: 3, otros_pct: 0, comentario: T.puente?.FY2028e ?? null },
        { periodo: 'FY2029e', volumen_pct: 15, precio_pct: 3, otros_pct: 0, comentario: T.puente?.FY2029e ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: tras la escisión quedan dos segmentos con la misma base de clientes industriales y comerciales, y solo hay resultado reexpresado de un ejercicio; la suma de partes la sustituye el escenario alcista (centros de datos a múltiplo de Vertiv).', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 319.4, arrendamientos: 0, caja: 54.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 31.0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: { dcf: 60, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2029e', beneficio_por_accion: B[e][2], multiplo: null, precio: null, justificacion: T.casos12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', anios: 3, actual: Math.round((157.75 / B.Base[1]) * 10) / 10, mediana_5a: 27.8, minimo_5a: 19.9, media_larga: 29.2,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 31.4, minimo_5a: 22.4, media_larga: 36.6, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 22.9 },
      consenso: { bpa_ano1: 6.51, bpa_ano2: 10.16, objetivo_medio: 302.13, objetivo_min: 260, objetivo_max: 355, analistas: 9, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (BPA de 3 analistas; FY2027e con Performance Technologies en el 1S) [D2]; Stock Analysis (9 analistas, objetivo medio 302,13 USD) [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
