// Parte del analista (Chemed, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (2026e-2032e). 2026e fijo: 1S26 publicado y guía subida dos veces (VITAS ventas sin tope +8,25-9,25 %,
// tope de 7 M frente a 27,2 M en 2025; Roto-Rooter +3-3,5 %). Margen EBITDA publicado (GAAP, con opciones y gastos
// corporativos): 15,9 % en 2025, 17,7 % en 2024. Capex con las compras de franquicias (≈ 0,4 % de las ventas al año).
const g = [7.5, 6.3, 6.0, 5.5, 5.0, 4.5, 4.0];
const m = [16.6, 17.1, 17.5, 17.8, 18.0, 18.0, 18.0];
const cx = [3.0, 3.0, 3.0, 2.8, 2.8, 2.8, 2.8];
const anios = g.map((c, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 2.6, capex_pct_ventas: cx[i], nwc_pct_ventas: 5.0, tasa_impositiva_pct: 25.0, fijo: i === 0 }));

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.19, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 25.0, peso_deuda_pct: 4 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 13 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 3.5, precio_pct: 3.1, otros_pct: 0.9, comentario: T.puente?.[0] ?? null },
        { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.8, comentario: T.puente?.[1] ?? null },
        { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0.5, comentario: T.puente?.[2] ?? null },
        { periodo: '2029e', volumen_pct: 2.8, precio_pct: 2.5, otros_pct: 0.2, comentario: T.puente?.[3] ?? null },
        { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0.0, comentario: T.puente?.[4] ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 0,
    partes: [
      { segmento: 'VITAS (hospicio)', metrica: 'EBITDA ajustado 2026e', valor_metrica: 340, multiplo: 12.0, ev_directo: null, justificacion: T.sdp?.vitas ?? null },
      { segmento: 'Roto-Rooter (fontanería)', metrica: 'EBITDA ajustado 2026e', valor_metrica: 204, multiplo: 14.0, ev_directo: null, justificacion: T.sdp?.roto ?? null },
      { segmento: 'Corporativo (gastos y opciones)', metrica: 'EBITDA 2026e', valor_metrica: -70, multiplo: 12.0, ev_directo: null, justificacion: T.sdp?.corp ?? null },
    ],
    comentario: T.sdp?.comentario ?? null, confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 140.0, arrendamientos: 0, caja: 40.2, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 15, escenarios: 30 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 22.30, multiplo: null, precio: null, justificacion: T.casos12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 25.80, multiplo: null, precio: null, justificacion: T.casos12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 28.20, multiplo: null, precio: null, justificacion: T.casos12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 21.7, mediana_5a: 28.9, minimo_5a: 19.5, media_larga: 26.7,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 30.9, minimo_5a: 23.3, media_larga: 28.7, excluidos: '2020 excluido (BPA inflado por la COVID: ayudas CARES y precios de emergencia). Historia al cierre: precio de cierre ÷ BPA publicado del mismo año, 2018-2019 y 2021-2025.' },
      },
      comparables_per: { mediana: 19.3 },
      consenso: { bpa_ano1: 25.49, bpa_ano2: 27.52, objetivo_medio: 571.6, objetivo_min: 520, objetivo_max: 650, analistas: 5, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (earningsTrend) y Stock Analysis; BPA ajustado [D2, D3]' },
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
