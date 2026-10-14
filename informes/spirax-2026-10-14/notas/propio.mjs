// Parte del analista (Spirax Group, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Proyección sobre 2025 (1.702,9 M GBP). EBITDA ajustado (sin amortización de intangibles de compras ni reestructuración):
// 2025 ≈ 339,9 + 67,6 = 407,5 M (23,9 %). La amortización del DCF es la de inmovilizado, software y derechos de uso (≈4 % de las ventas),
// sin la de intangibles de compras (≈34,6 M), para que el EBIT del DCF sea el beneficio operativo ajustado y el BPA, el ajustado.
const crec = [3.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0, 3.0, 2.75, 2.5];
const margen = [24.3, 24.7, 25.0, 25.3, 25.5, 25.5, 25.5, 25.5, 25.5, 25.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 4.0, capex_pct_ventas: i < 5 ? 5.4 : 4.9, nwc_pct_ventas: 0,
  tasa_impositiva_pct: 26.5, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 4.9, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 26.5, peso_deuda_pct: 11 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 14 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: -1.5, comentario: T.pc?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0, comentario: T.pc?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0, comentario: T.pc?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 1.5, precio_pct: 3.0, otros_pct: 0, comentario: T.pc?.['2029e'] ?? null },
        { periodo: '2030e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0, comentario: T.pc?.['2030e'] ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, narrativa: T.narr?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narr?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narr?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Baja',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda neta de jun-26 (618,2 M, incluye arrendamientos según la definición de la empresa) de un resumen secundario [A3].
    puente: { fecha: '2026-06-30', deuda_financiera: 618.2, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth, octubre de 2026, según verticales/empresa/prompt.md [P1]' },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos12 ?? [],
      per_historico: { actual: 20.6, mediana_5a: 26.1, minimo_5a: 23.5, media_larga: 27.2, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 28.0 },
      consenso: { bpa_ano1: 3.12, bpa_ano2: 3.22, objetivo_medio: 81.19, objetivo_min: 68.0, objetivo_max: 105.0, analistas: 17, tendencia_3m: 'estables', fuente: 'Consenso de la empresa (3-ago-26), Simply Wall St e Investing.com [D3, D4, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [{ id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' }],
  huecos: T.huecos ?? [],
};
