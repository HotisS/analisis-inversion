// Parte del analista (Nvidia, corte 2026-11-13, previo a los resultados del 3T FY27 del 17-nov).
// Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const anio = (periodo, c, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: c, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 21, tasa_impositiva_pct: 16.5, fijo });

// BPA propio (base «ajustado»: sin ganancias de participaciones, con la remuneración en acciones como gasto):
// (ventas × (margen EBITDA − amortización) + 1.000 M de resultado financiero neto recurrente) × (1 − 16,5 %) ÷ 24.240 M de acciones.
const BPA = { bajista: 7.81, base: 14.55, alcista: 19.02, base_fy28: 13.67 };

export default {
  meta: {
    fecha_corte: '2026-11-13', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: [],
  rentabilidad: { comentario: T.rentabilidad ?? null, confianza: 'Alta' },
  dcf: {
    anios: [
      anio('FY2027e', 88.9, 67.0, 1.2, 2.6, true),
      anio('FY2028e', 50.0, 66.0, 1.3, 2.5),
      anio('FY2029e', 12.0, 63.0, 1.5, 2.5),
      anio('FY2030e', -5.0, 58.0, 1.7, 2.3),
      anio('FY2031e', 5.0, 56.0, 1.9, 2.3),
      anio('FY2032e', 6.0, 55.0, 2.0, 2.3),
      anio('FY2033e', 6.0, 55.0, 2.1, 2.3),
      anio('FY2034e', 5.0, 55.0, 2.2, 2.3),
      anio('FY2035e', 4.0, 55.0, 2.2, 2.3),
      anio('FY2036e', 3.5, 55.0, 2.3, 2.3),
    ],
    wacc: { tasa_libre_pct: 5.10, beta: 1.55, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 4.4, tasa_impositiva_pct: 16.5, peso_deuda_pct: 1.0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 12.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: 'FY2027e', volumen_pct: 80.0, precio_pct: 8.9, otros_pct: 0, comentario: T.puente?.FY2027e ?? null },
        { periodo: 'FY2028e', volumen_pct: 42.0, precio_pct: 8.0, otros_pct: 0, comentario: T.puente?.FY2028e ?? null },
        { periodo: 'FY2029e', volumen_pct: 9.0, precio_pct: 3.0, otros_pct: 0, comentario: T.puente?.FY2029e ?? null },
        { periodo: 'FY2030e', volumen_pct: -3.0, precio_pct: -2.0, otros_pct: 0, comentario: T.puente?.FY2030e ?? null },
        { periodo: 'FY2031e', volumen_pct: 5.0, precio_pct: 0, otros_pct: 0, comentario: T.puente?.FY2031e ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -8.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
        perfil: [{ periodo: 'FY2028e', crecimiento_pp: -35.0, margen_pp: -8.0 }, { periodo: 'FY2029e', crecimiento_pp: -22.0, margen_pp: -8.0 }], narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 3.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
        perfil: [{ periodo: 'FY2028e', crecimiento_pp: 15.0, margen_pp: 3.0 }, { periodo: 'FY2029e', crecimiento_pp: 15.0, margen_pp: 3.0 }], narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 2T FY27 (26-jul-26) [A4]: deuda 33.366 M; caja y valores de deuda 22.443 + 34.143 = 56.586 M;
    // acciones cotizadas (42.783 M, a mercado) y participaciones no cotizadas (51.157 M, a valor contable) como «asociadas».
    puente: { fecha: '2026-07-26', deuda_financiera: 33366, arrendamientos: 0, caja: 56586, minoritarios: 0, pensiones: 0, asociadas: 93940, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth, noviembre de 2026 [D17]' },
    pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
    objetivo_12m: {
      ejercicio: 'FY2029e',
      base_bpa: 'ajustado',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2029e', beneficio_por_accion: BPA.bajista, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2029e', beneficio_por_accion: BPA.base, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2029e', beneficio_por_accion: BPA.alcista, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado',
        actual: 12.2, mediana_5a: 20.9, minimo_5a: 16.5, media_larga: 26.3,
        v2: { mediana_5a: 46.8, minimo_5a: 41.4, media_larga: 49.6, excluidos: 'Historia al cierre (precio de enero ÷ BPA ajustado del mismo ejercicio): FY2019 21,6x; FY2020 52,3x; FY2021 75,1x; FY2022 63,6x; FY2023 112,3x (excluido); FY2024 51,9x; FY2025 41,4x; FY2026 41,6x.' },
        excluidos: 'FY2022 (cierre de enero de 2022 ÷ BPA de FY2023 de 0,17 USD: 140,7 veces, beneficio hundido por la caída del juego y el cargo de Arm). Serie adelantada: FY2019 31,8x; FY2020 34,2x; FY2021 33,7x; FY2023 16,5x; FY2024 21,2x; FY2025 26,2x; FY2026 20,6x (191,13 ÷ 9,28 de nuestro FY2027e). BPA ajustado: GAAP sin ganancias de participaciones (FY2024 1,18; FY2025 2,90; FY2026 4,59 USD).',
      },
      comparables_per: { mediana: 24.6 },
      consenso: { bpa_ano1: 9.32, bpa_ano2: 15.85, objetivo_medio: 285.35, objetivo_min: 174.0, objetivo_max: 515.0, analistas: 53, tendencia_3m: 'recortes', fuente: 'Yahoo Finance, 13-nov-2026 [D12]; Stock Analysis, 3-nov-2026 [D14]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
