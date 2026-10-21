// Parte del analista (Moody's, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Supuestos numéricos aquí; textos largos en textos.mjs.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Base: 2025 (7.718 M USD). 2026e fijo: 1S26 +11,5 %, 3T con emisión fuerte; guía «un dígito alto».
const crec = [10.0, 8.0, 7.5, 7.0, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0];
// Margen EBITDA GAAP (EBIT + todas las amortizaciones): 49,6 % en 2025; 1S26 ≈ 52 % (margen operativo GAAP 46,2 % + amortización ≈ 6 %).
const margen = [51.5, 52.0, 52.5, 53.0, 53.0, 53.0, 53.0, 53.0, 53.0, 53.0];
// Amortización: 6,2 % en 2025 (480 M, de ellos ≈ 200 M de intangibles comprados que se van agotando); capex 4,2 %.
const amort = [6.0, 5.9, 5.8, 5.6, 5.4, 5.3, 5.2, 5.1, 5.0, 5.0];
const capex = [4.3, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.0, 5.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: 0, tasa_impositiva_pct: 22.5, fijo: i === 0,
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
    wacc: { tasa_libre_pct: 5.24, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 22.5, peso_deuda_pct: 8 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 18 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 5.0, precio_pct: 4.0, otros_pct: 1.0, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 3.5, precio_pct: 4.0, otros_pct: 0.5, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 0.5, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 3.0, precio_pct: 3.5, otros_pct: 0.5, comentario: T.puente?.['2029e'] ?? null },
        { periodo: '2030e', volumen_pct: 2.5, precio_pct: 3.5, otros_pct: 0.5, comentario: T.puente?.['2030e'] ?? null },
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
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: {
    aplica: false, descuento_holding_pct: 0,
    partes: T.sdp_partes ?? [],
    comentario: T.suma_partes_comentario ?? null, confianza: 'Baja',
  },
  valoracion: {
    // Balance del 30-jun-2026: deuda 571 + 6.375 M; caja 1.467 + 29 M de inversiones a corto [A6, A9, A2]. Arrendamientos operativos (US GAAP): fuera.
    puente: { fecha: '2026-06-30', deuda_financiera: 6946, arrendamientos: 0, caja: 1496, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [P2]' },
    pesos: { dcf: 40, comparables: 35, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 18.61, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 20.58, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA ajustado)', beneficio_por_accion: 21.82, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { actual: 24.6, mediana_5a: 36.1, minimo_5a: 31.8, media_larga: 35.9, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 23.4 },
      consenso: { bpa_ano1: 16.78, bpa_ano2: null, objetivo_medio: 553, objetivo_min: 490, objetivo_max: 610, analistas: 19, tendencia_3m: 'subidas', fuente: 'Benzinga y Teleborsa [D4, D12]' },
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
  esg: T.esg ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: '10-Year Treasury Constant Maturity Rate (DGS10), dato del 9-oct-2026 tomado del informe de S&P Global', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DGS10' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...(T.fuentes_extra ?? []),
  ],
  huecos: T.huecos ?? [],
};
