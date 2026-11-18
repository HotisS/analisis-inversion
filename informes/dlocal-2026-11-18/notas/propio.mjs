// Trabajo propio del analista: supuestos del DCF, escenarios, objetivo a 12 meses y textos.
// Los textos que dependen del cálculo están en textos.mjs (se escriben después de calcular).
import T from './textos.mjs';

const g = [
  ['2026e', 42.0, 20.0, 2.1, 2.6, 1.0, 17.0, true],
  ['2027e', 24.0, 20.0, 2.3, 3.0, 1.0, 19.0, false],
  ['2028e', 18.0, 20.5, 2.3, 2.9, 1.0, 20.0, false],
  ['2029e', 14.0, 21.0, 2.4, 2.8, 1.0, 20.0, false],
  ['2030e', 11.0, 21.0, 2.4, 2.7, 1.0, 20.0, false],
  ['2031e', 9.0, 21.0, 2.4, 2.7, 1.0, 20.0, false],
  ['2032e', 7.0, 21.0, 2.5, 2.6, 1.0, 20.0, false],
  ['2033e', 6.0, 21.0, 2.5, 2.6, 1.0, 20.0, false],
  ['2034e', 5.0, 21.0, 2.5, 2.6, 1.0, 20.0, false],
  ['2035e', 4.0, 21.0, 2.5, 2.6, 1.0, 20.0, false],
];
const anios = g.map(([periodo, c, m, a, k, n, t, fijo]) => ({ periodo, crecimiento_pct: c, margen_ebitda_pct: m, amortizacion_pct_ventas: a, capex_pct_ventas: k, nwc_pct_ventas: n, tasa_impositiva_pct: t, fijo }));

export default {
  meta: {
    fecha_corte: '2026-11-18', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones', cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin',
    normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados ?? [],
  },
  ...T.secciones,
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.10, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 2.5, coste_deuda_pct: 6.3, tasa_impositiva_pct: 20.0, peso_deuda_pct: 4.3 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 70.0, precio_pct: -28.0, otros_pct: 0.0, comentario: T.puente[0] },
        { periodo: '2027e', volumen_pct: 40.0, precio_pct: -13.0, otros_pct: -3.0, comentario: T.puente[1] },
        { periodo: '2028e', volumen_pct: 28.0, precio_pct: -10.0, otros_pct: 0.0, comentario: T.puente[2] },
        { periodo: '2029e', volumen_pct: 22.0, precio_pct: -8.0, otros_pct: 0.0, comentario: T.puente[3] },
        { periodo: '2030e', volumen_pct: 17.0, precio_pct: -6.0, otros_pct: 0.0, comentario: T.puente[4] },
      ],
      mercado_final: { periodo: '2030e', tamano: 94900 },
      veredicto: T.sost_veredicto,
      justificacion: T.sost_justificacion,
    },
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.esc[0] },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.esc[1] },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.esc[2] },
    ],
    comentario: T.esc_comentario,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.sdp, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 163.5, arrendamientos: 3.8, caja: 617.0, minoritarios: 0.5, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; el riesgo país va en la prima adicional)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
    comentario: T.val_comentario,
    objetivo_12m: {
      ejercicio: '2028e', base_bpa: 'publicado',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.87, multiplo: null, precio: null, justificacion: T.bpa[0] },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.15, multiplo: null, precio: null, justificacion: T.bpa[1] },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.38, multiplo: null, precio: null, justificacion: T.bpa[2] },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado', actual: 12.98, mediana_5a: 24.6, minimo_5a: 17.3, media_larga: 28.0,
        excluidos: T.per_excluidos,
        v2: { actual: 12.98, mediana_5a: 32.5, minimo_5a: 21.8, media_larga: 32.8, base: 'cierre' },
      },
      comparables_per: { mediana: 11.1 },
      consenso: { bpa_ano1: 1.12, bpa_ano2: 1.26, objetivo_medio: 18.5, objetivo_min: 15, objetivo_max: 21, analistas: 10, tendencia_3m: 'estables', fuente: 'Yahoo Finance (BPA 2027 y objetivos tras resultados, 17-nov-2026) y MarketScreener (BPA 2028, 23-oct-2026) [D3, D2]' },
      diferencia_consenso: T.dif_consenso,
      media: null,
      comentario: T.obj_comentario,
    },
  },
  ...T.finales,
};
