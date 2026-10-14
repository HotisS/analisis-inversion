// Parte del analista (Watches of Switzerland, corte 2026-10-14). Citas con la letra de la nota: [A1] = fuente 1 de A.json.
// Base: ajustada y ANTES de NIIF 16 (alquiler dentro del EBITDA; arrendamientos fuera del puente), como la guía de la empresa.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const crec = [7.0, 7.0, 6.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [11.6, 11.9, 12.0, 12.0, 12.0, 12.0, 12.0, 12.0];
const anios = crec.map((g, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.7, capex_pct_ventas: i < 3 ? 3.5 : 3.0, nwc_pct_ventas: 12.5, tasa_impositiva_pct: 27, fijo: false,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 4, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (Reino Unido)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.1, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 6.5, tasa_impositiva_pct: 25, peso_deuda_pct: 8 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 8 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: 'FY2027e', volumen_pct: 3.0, precio_pct: 4.0, otros_pct: 0, comentario: T.puente?.[0] ?? null },
        { periodo: 'FY2028e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 0, comentario: T.puente?.[1] ?? null },
        { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0, comentario: T.puente?.[2] ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Baja',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Un solo negocio (minorista de relojes y joyería de lujo en dos países): no aplica.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-05-03', deuda_financiera: 120.5, arrendamientos: 0, caja: 63.5, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D14]' },
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 0.436, multiplo: null, precio: null, justificacion: 'Ventas de 1.939 M GBP (3 % anual: Rolex recorta asignación o EE. UU. se enfría) y margen EBITDA del 10,4 %, como en FY24: EBIT de 149 M, 10 M de intereses, impuesto del 27 % y 233,5 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 0.577, multiplo: null, precio: null, justificacion: 'Ventas de 2.093 M GBP (7 % anual, en la guía de 5-10 %) y margen EBITDA del 11,9 % (+70 pb sobre el EBIT de FY26 en dos años, dentro de la guía): EBIT de 192 M, 8 M de intereses, impuesto del 27 % y 233,5 M de acciones sin recompras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 0.634, multiplo: null, precio: null, justificacion: 'Ventas de 2.172 M GBP (9 % anual: EE. UU. sigue a +15-20 %) y margen del 12,4 %, cerca del máximo de FY23: EBIT de 211 M.' },
      ],
      per_historico: { actual: 13.1, mediana_5a: 11.5, minimo_5a: 8.2, media_larga: 11.5, excluidos: 'Sin exclusiones, pero la serie es corta y aproximada: FY23 ≈14,8x (≥778,5 p ÷ 52,7 p), FY24 ≈8,7x (332 p ÷ 38,0 p), FY25 ≈8,2x (340 p ÷ 41,6 p), FY26 ≈14,3x (644,5 p ÷ 45,2 p); FY22 sin precio de cierre. BPA ajustado, la misma base que los casos [D10, D12, D13, D8, A1, A4, A5]. Actual = 673,5 p ÷ 51,3 p (nuestro BPA de FY27e).' },
      comparables_per: { mediana: 14.2 },
      consenso: { bpa_ano1: 0.50, bpa_ano2: 0.55, objetivo_medio: 7.00, objetivo_min: null, objetivo_max: 8.50, analistas: null, tendencia_3m: 'subidas', fuente: 'MarketScreener, Stockopedia y Stock Analysis [D7, D2, D5]' },
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
  fuentes: [],
  huecos: [],
};
