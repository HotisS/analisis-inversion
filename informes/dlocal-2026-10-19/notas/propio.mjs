// Trabajo propio del analista: supuestos del DCF, escenarios, objetivo a 12 meses y textos.
// Los textos que dependen del cálculo están en textos.mjs (se escriben después de calcular).
import T from './textos.mjs';

const g = [
  ['2026e', 46.0, 20.0, 2.2, 3.2, 1.0, 17.0, true],
  ['2027e', 25.0, 20.5, 2.3, 3.0, 1.0, 19.0, false],
  ['2028e', 18.0, 21.0, 2.3, 2.9, 1.0, 20.0, false],
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
    fecha_corte: '2026-10-19', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones', cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin',
    normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados ?? [],
  },
  ...T.secciones,
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.09, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 2.5, coste_deuda_pct: 6.0, tasa_impositiva_pct: 20.0, peso_deuda_pct: 1.5 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 10.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 65.0, precio_pct: -19.0, otros_pct: 0.0, comentario: T.puente[0] },
        { periodo: '2027e', volumen_pct: 40.0, precio_pct: -15.0, otros_pct: 0.0, comentario: T.puente[1] },
        { periodo: '2028e', volumen_pct: 28.0, precio_pct: -10.0, otros_pct: 0.0, comentario: T.puente[2] },
        { periodo: '2029e', volumen_pct: 22.0, precio_pct: -8.0, otros_pct: 0.0, comentario: T.puente[3] },
        { periodo: '2030e', volumen_pct: 17.0, precio_pct: -6.0, otros_pct: 0.0, comentario: T.puente[4] },
      ],
      mercado_final: { periodo: '2030e', tamano: 97400 },
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
    puente: { fecha: '2026-06-30', deuda_financiera: 64.6, arrendamientos: 2.7, caja: 448.3, minoritarios: 0.3, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; el riesgo país va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D6]' },
    pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
    comentario: T.val_comentario,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 0.92, multiplo: null, precio: null, justificacion: T.bpa[0] },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.21, multiplo: null, precio: null, justificacion: T.bpa[1] },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.45, multiplo: null, precio: null, justificacion: T.bpa[2] },
      ],
      per_historico: {
        base: 'adelantado', actual: 14.44, mediana_5a: 24.6, minimo_5a: 17.2, media_larga: 27.9,
        excluidos: T.per_excluidos,
        v2: { actual: 14.44, mediana_5a: 32.5, minimo_5a: 21.8, media_larga: 32.8, base: 'cierre' },
      },
      comparables_per: { mediana: 12.1 },
      consenso: { bpa_ano1: 1.08, bpa_ano2: 1.27, objetivo_medio: 18.8, objetivo_min: 15, objetivo_max: 21, analistas: 10, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA 2027-2028, 19-oct-2026) y S&P Global vía Stock Analysis (objetivos, 8-oct-2026) [D2, D3]' },
      diferencia_consenso: T.dif_consenso,
      media: null,
      comentario: T.obj_comentario,
    },
  },
  ...T.finales,
};
