// Parte del analista (Edwards Lifesciences, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// Base: 2025 real (6.067,6 M USD). 2026e casi cerrado (1S26 publicado y guía de +10-11 % a divisa constante con divisa a favor).
const crec = [12.0, 9.5, 9.5, 9.0, 8.5, 7.5, 6.5, 5.5, 4.5, 3.5];
// Margen EBITDA contable (con remuneración en acciones y con parte de los cargos que la empresa ajusta): 30,7 % en los 12 meses a jun-26.
const margen = [31.0, 31.5, 32.0, 32.5, 33.0, 33.0, 33.0, 33.0, 33.0, 33.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 2.6, capex_pct_ventas: i < 3 ? 4.3 : 3.8, nwc_pct_ventas: 29, tasa_impositiva_pct: 17, fijo: i === 0,
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
    wacc: { tasa_libre_pct: 5.22, beta: 1.0, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 4.3, tasa_impositiva_pct: 17, peso_deuda_pct: 1 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 10.5, precio_pct: 0, otros_pct: 1.5 },
        { periodo: '2027e', volumen_pct: 9.5, precio_pct: 0, otros_pct: 0 },
        { periodo: '2028e', volumen_pct: 9.5, precio_pct: 0, otros_pct: 0 },
        { periodo: '2029e', volumen_pct: 9.0, precio_pct: 0, otros_pct: 0 },
        { periodo: '2030e', volumen_pct: 8.5, precio_pct: 0, otros_pct: 0 },
      ].map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      // La cuota publicada es la de TAVR (un segmento): la prueba de cuota se hace a mano (lección del repo).
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 1, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    ].map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })),
    comentario: T.escenarios_comentario ?? null, confianza: 'Baja',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 598.7, arrendamientos: 0, caja: 4253, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D13]' },
    pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 3.18, multiplo: null, precio: null, justificacion: 'Ventas de 7.708 M en 2028e (−3 puntos de crecimiento en 2027-28: Medtronic y Abbott ganan cuota en los centros nuevos y la cobertura de asintomáticos se retrasa) con un margen EBITDA del 30 %: EBIT de 2.112 M, +100 M de intereses netos de la caja, impuesto del 17 % y 577 M de acciones.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 3.59, multiplo: null, precio: null, justificacion: 'Ventas de 8.148 M (+9,5 % anual en 2027-28: TAVR +8 % con la nueva cobertura de Medicare y TMTT +30-40 %) con un margen EBITDA del 32 %: EBIT de 2.396 M, +100 M de intereses netos, impuesto del 17 % y 577 M de acciones, sin recompras no anunciadas.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 3.84, multiplo: null, precio: null, justificacion: 'Ventas de 8.449 M (+2 puntos: PROGRESS positivo y asintomáticos cubiertos pronto) y margen del 33 % con TMTT ya rentable: EBIT de 2.568 M y BPA de 3,84 USD.' },
      ],
      per_historico: { base: 'adelantado', actual: 26.5, mediana_5a: 29.05, minimo_5a: 28.5, media_larga: 31.5, excluidos: 'PER adelantado = cierre ÷ BPA ajustado del año siguiente [D7, D8, D15, A4, A7]: 2020 41,1x (91,23 ÷ 2,22); 2022 29,7x (74,61 ÷ 2,51, BPA de 2023 con Critical Care); 2023 28,5x ((76,25 − 7,0 de Critical Care) ÷ 2,43); 2024 28,9x (74,03 ÷ 2,56); 2025 29,2x (85,25 ÷ 2,92, nuestro BPA de 2026e). Excluidos: 2019 (BPA de 2020 hundido por el covid) y 2021 (52x, burbuja de múltiplos). Actual = 85,76 ÷ 3,24 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 17.45 },
      consenso: { bpa_ano1: 3.00, bpa_ano2: 3.38, objetivo_medio: 101.59, objetivo_min: 81, objetivo_max: 110, analistas: 28, tendencia_3m: 'subidas', fuente: 'Stock Analysis (S&P Global), Benzinga y Kalkine [D11, D4, D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
