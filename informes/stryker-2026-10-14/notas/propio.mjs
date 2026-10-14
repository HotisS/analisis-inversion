// Parte del analista (Stryker, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { F } from './fuentes.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (USD, ejercicio natural). EBITDA = el contable sin deterioros (resta reestructuración e integración, que se repiten).
// Amortización = depreciación (1,9 %) + intangibles comprados (2,8 % en 2026, bajando); capex = inmovilizado (3,0 %) + sistemas Mako cedidos.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 30.0, tasa_impositiva_pct: 17.0, fijo });
const anios = [
  a('2026e', 8.5, 26.8, 4.6, 3.1, true),
  a('2027e', 8.5, 27.4, 4.4, 3.2),
  a('2028e', 8.0, 27.9, 4.2, 3.2),
  a('2029e', 7.5, 28.3, 4.0, 3.3),
  a('2030e', 7.0, 28.6, 3.8, 3.3),
  a('2031e', 6.0, 28.8, 3.5, 3.3),
  a('2032e', 5.0, 29.0, 3.3, 3.3),
];
const puente = [
  { periodo: '2026e', volumen_pct: 7.8, precio_pct: 0.3, otros_pct: 0.4 },
  { periodo: '2027e', volumen_pct: 7.7, precio_pct: 0.5, otros_pct: 0.3 },
  { periodo: '2028e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 0.0 },
  { periodo: '2029e', volumen_pct: 7.0, precio_pct: 0.5, otros_pct: 0.0 },
  { periodo: '2030e', volumen_pct: 6.5, precio_pct: 0.5, otros_pct: 0.0 },
];

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
    anios,
    wacc: { tasa_libre_pct: 5.21, beta: 0.87, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.8, tasa_impositiva_pct: 17.0, peso_deuda_pct: 12 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 14 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los dos segmentos tienen márgenes casi iguales (29,9 % y 29,8 % de EBIT de segmento en 2025) y comparables comunes (grandes de tecnología médica); separar Inari no cambia el valor porque su contribución es ≈2,5 % de las ventas.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 14942, arrendamientos: 0, caja: 3476, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 756 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 16.56, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 18.2, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 19.22, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', actual: 17.0, mediana_5a: 24.6, minimo_5a: 23.1, media_larga: 24.0,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 28.3, minimo_5a: 25.8, media_larga: 26.2, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 15.9 },
      consenso: { bpa_ano1: 14.98, bpa_ano2: 16.58, objetivo_medio: 362.62, objetivo_min: null, objetivo_max: null, analistas: 29, tendencia_3m: 'recortes', fuente: 'MarketScreener (objetivo medio y número) y Barchart (BPA ajustado 2026-2027) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: [
    { id: 1, ...F.damo },
    { id: 2, ...F.fred },
    { id: 3, ...F.ficha },
    { id: 4, ...F.cmr },
    { id: 5, ...F.ceo },
  ],
};
