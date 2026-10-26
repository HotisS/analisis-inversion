// Parte del analista (Danaher, corte 2026-10-26, tras el 3T26 del 21-oct). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Supuestos del DCF: base 2025 de operaciones continuadas (24.568 M USD), EBITDA contable (EBIT + amortizaciones, con intangibles de compras).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// 2026e fijo (tres trimestres publicados y guía del 21-oct): +7,3 % = básico ≈2,5 % + divisa 1 % + Masimo desde el 2T26 y StatLab.
// 2027e: básico 4-5 % sin respiratorio (≈3,5 % con él) + Masimo año completo (≈+2,6 pp) + StatLab (≈+0,9 pp) − algo de prudencia.
const crec = [7.3, 7.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5];
// Margen EBITDA contable: 29,1 % en 2025 (31,4 % sin 562 M de no recurrentes); LTM sep-26 30,6 % (31,7 % sin 275 M). 2026e con ≈1 punto de cargos de Masimo y opciones especiales.
const margen = [31.0, 32.0, 32.5, 33.0, 33.0, 33.0, 33.0, 33.0];
// Amortizaciones 10,0 % en 2025: 1.697 M de intangibles comprados (6,9 %) + 750 M de depreciación (3,1 %); 2026e con 1.900 M de intangibles.
// Los intangibles se agotan y la amortización converge a la depreciación y al capex (≈4,7 % de ventas en 2021-2025).
const amort = [10.3, 10.0, 9.4, 8.6, 7.6, 6.6, 5.6, 4.8];
const capex = [4.6, 4.7, 4.7, 4.7, 4.8, 4.8, 4.8, 4.8];
// Circulante comercial (existencias + clientes − proveedores) a su nivel real: 18,6 % en 2025, 17,2 % en 2024, 19,9 % en 2023.
const nwc = [18.5, 18.5, 18.5, 18.5, 18.5, 18.5, 18.5, 18.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 17, fijo: i === 0,
}));

// WACC: tasa libre = bono a 10 años de EE. UU. del 23-oct-2026 (5,00 %) [P1].
// Beta: ajustada mensual 5 años 0,85 (Blume; semanales 0,80-0,96) [D1]. Desapalancada con la deuda de Danaher (D/E de mercado 26.482/162.160 = 16,3 %, t = 17 %):
// βu = 0,85 / (1 + 0,83 × 0,163) = 0,749; reapalancada con la misma estructura de Danaher (peso de la deuda 14 %): 0,749 × 1,135 = 0,85.
const wacc = { tasa_libre_pct: 5.0, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.3, tasa_impositiva_pct: 17, peso_deuda_pct: 14 };

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc,
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 20 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 1.5, precio_pct: 1.0, otros_pct: 4.8, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 2.5, precio_pct: 1.0, otros_pct: 4.0, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 4.5, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2029e'] ?? null },
        { periodo: '2030e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2030e'] ?? null },
      ],
      mercado_final: { periodo: '2030e', tamano: 415000 },
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.5, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 10-Q a 25-sep-2026 [A]. StatLab (≈1.400 M en caja, cerrada el 28-sep) y 79 M de pagos aplazados de compras, en otros_ajustes.
    puente: { fecha: '2026-09-25', deuda_financiera: 26482, arrendamientos: 0, caja: 5682, minoritarios: 7, pensiones: 0, asociadas: 0, otros_ajustes: 1479 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth, octubre de 2026 [P2]' },
    pesos: { dcf: 40, comparables: 40, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 9.07, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 9.96, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 10.44, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', anios: 4, actual: 25.3, mediana_5a: 30.2, minimo_5a: 26.7, media_larga: 29.5,
        v2: { mediana_5a: 30.5, minimo_5a: 29.3, media_larga: 30.2, excluidos: 'Historia AL CIERRE (cierre ajustado ÷ BPA ajustado del mismo ejercicio): 2023 30,5x (231,34/7,58); 2024 30,7x (229,55/7,48); 2025 29,3x (228,92/7,80). Excluidos 2021 y 2022 (BPA de covid: 9,71 en 2022).' },
        excluidos: 'BPA ajustado de operaciones continuadas (sin amortización de intangibles ni partidas no recurrentes), la misma base que los tres casos. PER adelantado al cierre de cada año = cierre ajustado por la escisión de Veralto ÷ BPA ajustado real del año siguiente: 2022 31,0x (235,30/7,58), 2023 30,9x (231,34/7,48), 2024 29,4x (229,55/7,80) y 2025 26,7x (228,92/8,58, nuestro 2026e, en la guía de 8,57-8,62) [D1, A]. Excluido 2021 (291,68/9,71): el BPA de 2022 está inflado por las pruebas de covid y sale un 22 % por encima del de 2023. Sin años anteriores fiables por las escisiones de Envista (2019) y Veralto (2023). Actual = 230,50 ÷ 9,10 (nuestro BPA ajustado de 2027e).',
      },
      comparables_per: { mediana: 26.4 },
      consenso: { bpa_ano1: 8.51, bpa_ano2: 9.30, objetivo_medio: 242.91, objetivo_min: 195, objetivo_max: 275, analistas: 23, tendencia_3m: 'subidas', fuente: 'MarketBeat (23-oct) y Stock Analysis (26-oct: 244,14, 25 analistas, 200-310); BPA ajustado de S&P Global vía TIKR (21-oct) [D5, D3, D6]' },
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
    { id: 1, titulo: 'Daily Treasury Par Yield Curve Rates 2026: bono a 10 años al 5,00 % el 23-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html' },
    { id: 3, titulo: 'Tipos de cambio de referencia del euro del 23-oct-2026 (USD 1,1193; CHF 0,9227)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
