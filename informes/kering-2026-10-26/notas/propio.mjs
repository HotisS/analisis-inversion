// Parte del analista (Kering, corte 2026-10-26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Base: cuenta RECURRENTE de Kering en todo (historia del PER v3 y v2, BPA de los tres casos 2028e y 2027e del PER actual).
// NIIF 16: arrendamientos en el puente; capex del DCF = capex operativo (5,5-6 %) + pagos/altas de arrendamientos (≈7 %).
// Circulante del DCF a su nivel real (existencias + clientes − proveedores: 16,3-17,7 % de las ventas).
// Beta reapalancada con la deuda propia: 1,32 ajustada → 1,10 sin deuda (D/E media 2021-2025 ≈ 28 %) → 1,44 con D/E de hoy (43 %).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const crec = [-2.0, 2.5, 4.5, 5.0, 5.0, 4.5, 4.0, 3.0];
const margen = [26.3, 27.5, 29.0, 30.5, 31.5, 32.0, 32.0, 32.0];
const capex = [12.5, 12.5, 12.5, 12.5, 12.5, 12.0, 12.0, 12.0];
const amort = [13.9, 13.6, 13.2, 12.8, 12.4, 12.0, 11.8, 11.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i], nwc_pct_ventas: 16.5, tasa_impositiva_pct: 30, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.39, beta: 1.44, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.6, tasa_impositiva_pct: 28, peso_deuda_pct: 30 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: -2.5, precio_pct: 2.0, otros_pct: -1.5, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 0.5, precio_pct: 2.0, otros_pct: 0.0, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.5, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.5, comentario: T.puente?.['2029e'] ?? null },
      ],
      mercado_final: { periodo: '2033e', tamano: 471000 },
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 6.85, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 10.21, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 12.61, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 21.9, mediana_5a: 22.0, minimo_5a: 19.0, media_larga: 21.4, anios: 3,
        excluidos: T.per_excluidos ?? 'PER adelantado en base recurrente.',
        v2: { mediana_5a: 16.0, minimo_5a: 15.6, media_larga: 19.3, base: 'cierre', excluidos: T.per_excluidos_v2 ?? 'PER al cierre en base recurrente.' },
      },
      comparables_per: { mediana: 19.2 },
      consenso: { bpa_ano1: 8.85, bpa_ano2: 11.94, objetivo_medio: 249.72, objetivo_min: 175, objetivo_max: 340, analistas: 26, tendencia_3m: 'recortes', fuente: 'MarketScreener (BPA) y Stock Analysis/S&P Global (objetivos), leídos el 26-oct; ninguno recoge aún el 3T [D5, P1]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Kering (EPA:KER) Stock Forecast: price target, ratings and EPS estimates', editor: 'Stock Analysis (datos de S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://stockanalysis.com/quote/epa/KER/forecast/' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
