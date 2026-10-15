// Parte del analista (Borregaard, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (NOK, ejercicio natural). Capex = inversión en inmovilizado (guía de 900-1.000 M al año en 2026-2029 con participadas)
// + altas de derechos de uso (≈50 M); amortización con derechos de uso (7,7 % de ventas en 2025).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 32, tasa_impositiva_pct: 24, fijo });
const anios = [
  a('2026e', 2.4, 22.9, 7.6, 10.8, true),
  a('2027e', 1.0, 23.5, 7.8, 12.0),
  a('2028e', 5.0, 24.0, 7.9, 11.5),
  a('2029e', 5.0, 24.5, 8.1, 11.0),
  a('2030e', 4.5, 24.5, 8.3, 10.5),
  a('2031e', 4.0, 24.5, 8.5, 10.0),
  a('2032e', 3.5, 24.5, 8.7, 9.5),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 4.0, precio_pct: 0.5, otros_pct: -2.1 },
  { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: -4.0 },
  { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'NOK', divisa_cotizacion: 'NOK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 4.585, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.8, tasa_impositiva_pct: 22, peso_deuda_pct: 13 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres segmentos salen de la misma madera y la misma planta de Sarpsborg, con costes conjuntos repartidos por convención; valorarlos por separado con comparables distintos daría una suma que no se puede vender por partes.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1809, arrendamientos: 457, caja: 125, minoritarios: 21, pensiones: 0, asociadas: 18, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 7.70, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 9.39, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 10.39, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', actual: 17.8, mediana_5a: 21.0, minimo_5a: 17.4, media_larga: 21.6, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 22.1, minimo_5a: 17.0, media_larga: 24.4, excluidos: 'Ninguno. Historia al cierre: precio de cierre ÷ BPA del mismo año (2025 con el BPA sin deterioros de 8,67 NOK); 2020 a 32,4x entra en la media larga.' },
      },
      comparables_per: { mediana: 18.3 },
      consenso: { bpa_ano1: 6.57, bpa_ano2: 10.61, objetivo_medio: 173.75, objetivo_min: 165, objetivo_max: 180, analistas: 6, tendencia_3m: 'estables', fuente: 'MarketScreener (5 analistas, 6-oct-2026) y titulares de seis casas en Nordnet [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 169.14,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses', ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
