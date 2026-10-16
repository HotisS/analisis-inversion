// Parte del analista (Recordati, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (EUR, ejercicio natural). EBITDA = el de la empresa (sin no recurrentes ni revalorización de existencias de compras).
// Amortización incluye la de intangibles de producto (licencias y compras), que es un coste económico recurrente.
// Capex = inmovilizado material + intangibles (licencias e hitos de productos): ≈ 6,9 % de las ventas de media en 2021-2025 sin compras de empresas.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 29, tasa_impositiva_pct: 24, fijo });
const anios = [
  a('2026e', 5.6, 36.6, 7.6, 7.0, true),
  a('2027e', 7.5, 37.5, 7.4, 7.0),
  a('2028e', 6.5, 38.0, 7.2, 7.0),
  a('2029e', 5.0, 38.0, 7.0, 6.9),
  a('2030e', 4.0, 37.5, 6.9, 6.9),
  a('2031e', 3.0, 37.0, 6.8, 6.8),
  a('2032e', 2.5, 36.5, 6.8, 6.8),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente = [
  { periodo: '2026e', volumen_pct: 7.5, precio_pct: -0.5, otros_pct: -1.4 },
  { periodo: '2027e', volumen_pct: 6.5, precio_pct: 0, otros_pct: 1.0 },
  { periodo: '2028e', volumen_pct: 6.5, precio_pct: 0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 5.5, precio_pct: -0.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 4.5, precio_pct: -0.5, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.45, beta: 0.8, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.8, tasa_impositiva_pct: 24, peso_deuda_pct: 15 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 12 },
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
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 2260.7, arrendamientos: 49.2, caja: 391.4, minoritarios: 0, pensiones: 16.0, asociadas: 0, otros_ajustes: -1.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: { dcf: 45, comparables: 15, transacciones: 15, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', actual: 18.0, mediana_5a: 20.6, minimo_5a: 18.4, media_larga: 22.8, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 23.2, minimo_5a: 19.8, media_larga: 23.9, excluidos: T.per_excluidos_v2 ?? null } },
      comparables_per: { mediana: 17.65 },
      consenso: { bpa_ano1: 2.467, bpa_ano2: 3.024, objetivo_medio: 60.1, objetivo_min: 51.3, objetivo_max: 71.0, analistas: 8, tendencia_3m: 'estable', fuente: 'MarketScreener, 15-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  capital: { comentario: T.capital_comentario ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
