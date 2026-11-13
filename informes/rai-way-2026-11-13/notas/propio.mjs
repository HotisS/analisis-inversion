// Parte del analista (Rai Way, corte 2026-11-13). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
const CTX = (await import('./contexto.mjs')).default;
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (EUR, ejercicio natural). Ingresos = ingresos core. EBITDA publicado (con no recurrentes).
// Amortización = amortizaciones, deterioros y provisiones (incluye derechos de uso, NIIF 16).
// Capex = inversión en inmovilizado e intangibles + altas de derechos de uso (≈ 12 M/año, sustituyen a los alquileres que no pasan por el EBITDA).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 8.5, tasa_impositiva_pct: 28.8, fijo });
const anios = [
  a('2026e', 2.1, 65.0, 21.5, 19.5, true),
  a('2027e', 4.5, 65.3, 21.5, 19.0),
  a('2028e', 3.0, 65.6, 21.0, 18.5),
  a('2029e', 2.5, 66.0, 20.0, 18.0),
  a('2030e', 2.0, 66.3, 19.0, 17.5),
  a('2031e', 2.0, 66.5, 18.0, 17.5),
  a('2032e', 2.0, 66.5, 17.5, 17.5),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.0, multiplo_salida: null,
    perfil: [ { periodo: '2029e', crecimiento_pp: -8.0, margen_pp: -4.0 } ] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente = [
  { periodo: '2026e', volumen_pct: 0.8, precio_pct: 1.3, otros_pct: 0 },
  { periodo: '2027e', volumen_pct: 1.0, precio_pct: 3.5, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 0.3, precio_pct: 1.7, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-11-13', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
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
    wacc: { tasa_libre_pct: 3.36, beta: 0.6, prima_mercado_pct: 5.5, prima_adicional_pct: 1.3, coste_deuda_pct: 4.0, tasa_impositiva_pct: 28.8, peso_deuda_pct: 14 },
    terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 9 },
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la diversificación (centros de datos, CDN, solar) aporta menos de 1 M EUR de EBITDA neto y el resto del negocio (difusión para RAI y torres) comparte red, emplazamientos y costes; el plan de centros de datos se valora como opción en el escenario alcista, no por separado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-09-30', deuda_financiera: 137.7, arrendamientos: 25.7, caja: 2.5, minoritarios: 0, pensiones: 6.1, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: { dcf: 45, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 45 },
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', base_bpa: 'publicado', actual: T.per_actual ?? 12.6, mediana_5a: 16.7, minimo_5a: 15.3, media_larga: 19.0, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 16.9, minimo_5a: 15.8, media_larga: 19.9, excluidos: T.per_excluidos_v2 ?? null } },
      comparables_per: { mediana: 23.6 },
      consenso: { bpa_ano1: 0.314, bpa_ano2: 0.3396, objetivo_medio: 6.0, objetivo_min: 4.6, objetivo_max: 7.2, analistas: 6, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (quoteSummary, 13-nov-2026: BPA, objetivos y recomendaciones) [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  bolsa: { contexto: CTX },
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Alta' },
  capital: { comentario: T.capital_comentario ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
