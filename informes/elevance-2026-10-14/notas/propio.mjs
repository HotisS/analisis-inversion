// Parte del analista (Elevance Health, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Criterio de flotante (lección de UnitedHealth): el EBITDA incluye el rendimiento de la cartera de las filiales reguladas,
// así que la caja del puente es solo la de la matriz (≈ 2.100 M a 30-jun-2026), no los 9.491 M consolidados.
// El capital estatutario que las filiales deben retener al crecer se suma al capex (≈ 12 % del aumento de ventas).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const crec = [0.5, 3.0, 5.0, 5.0, 4.5, 4.0, 3.5];
// 2026e: margen contable de la guía (BPA ≥ 20,10 USD, con el caso de CMS y costes de reorganización); 2027e: vuelta al margen
// subyacente de 2026 (BPA ajustado ≥ 27) y +12 % de BPA; después, recuperación gradual hacia el 6,0 % de 2023-2024.
const margen = [4.6, 5.5, 5.7, 5.9, 6.0, 6.0, 6.0];
// Capex de 0,6-0,8 % de las ventas más el capital estatutario que retienen las filiales al crecer (≈ 12 % del aumento de ventas).
const capex = [0.6, 0.95, 1.2, 1.27, 1.27, 1.24, 1.21];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: 0.78, capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0, tasa_impositiva_pct: 23, fijo: i === 0,
}));

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
    anios,
    wacc: { tasa_libre_pct: 5.22, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 23, peso_deuda_pct: 24.7 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 9.0 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: -4.0, precio_pct: 4.5, otros_pct: 0 },
        { periodo: '2027e', volumen_pct: -2.0, precio_pct: 5.0, otros_pct: 0 },
        { periodo: '2028e', volumen_pct: 0.5, precio_pct: 4.5, otros_pct: 0 },
        { periodo: '2029e', volumen_pct: 0.5, precio_pct: 4.5, otros_pct: 0 },
        { periodo: '2030e', volumen_pct: 0.5, precio_pct: 4.0, otros_pct: 0 },
      ].map((p) => ({ ...p, comentario: T.puente?.[p.periodo] ?? null })),
      mercado_final: { periodo: '2032e', tamano: null },
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.8, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 31075, arrendamientos: 0, caja: 2100, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D22]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 26.44, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 33.55, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 37.29, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { actual: 14.0, mediana_5a: 14.2, minimo_5a: 11.2, media_larga: 14.8, excluidos: 'Ninguno: no hay años de pérdidas ni de burbuja. PER al cierre sobre el BPA ajustado del año, la misma base que los casos (sin amortización de intangibles ni partidas no recurrentes): 2018 16,5x (262,63/15,87); 2019 15,5x (302,03/19,44); 2020 14,3x (321,09/22,48); 2021 17,8x (463,54/25,98); 2022 17,6x (512,97/29,07); 2023 14,2x (471,56/33,14); 2024 11,2x (368,90/≈33,0); 2025 11,6x (≈350,2/30,29) [D9, A14, A15, A2, A16]. El cierre de 2025 es estimación propia (2-oct-2026 a 381,67 USD con +9 % en el año) [D6]. Actual = 425,27 ÷ 30,46 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 14.2 },
      consenso: { bpa_ano1: 26.92, bpa_ano2: 29.12, objetivo_medio: 451.38, objetivo_min: 360, objetivo_max: 498, analistas: 22, tendencia_3m: 'subidas', fuente: 'Stock Analysis (S&P Global), MarketBeat y Barchart [D2, D3, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  rentabilidad: T.secciones?.rentabilidad ?? null,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
