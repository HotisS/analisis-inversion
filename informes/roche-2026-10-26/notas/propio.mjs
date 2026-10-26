// Parte del analista (Roche, corte 2026-10-26, tras las ventas del 3T26 del 22-oct). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Base del DCF: ingresos totales de 2025 (ventas + otros ingresos, 63.356 M CHF) y EBITDA NIIF con los deterioros devueltos (35,6 % en 2025; 36,1 % LTM jun-26).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// 2026e fijo (tres trimestres publicados, guía confirmada el 22-oct): +6 % a tipo constante (un dígito medio) − ≈3 puntos de divisa − ≈1 punto de otros ingresos y Japón = ≈+2 % en francos.
// 2027e: consenso +4,6-4,9 %; nosotros 4,5 %. Luego, bajando hacia el terminal (pérdidas de exclusividad de Ocrevus, Xolair y Perjeta a partir de 2029).
const crec = [2.0, 4.5, 4.5, 3.5, 3.0, 2.5, 2.0, 1.5, 1.0, 1.0];
// Margen EBITDA NIIF sin deterioros: 35,6 % (2025), 36,1 % (LTM); el margen core del 1S26 es del 39 %. La diferencia (≈3 puntos) es reestructuración y otros que Roche saca del core: la dejamos dentro.
const margen = [36.5, 37.0, 37.5, 37.5, 37.5, 37.5, 37.0, 37.0, 37.0, 37.0];
// Amortizaciones 5,3 % (2025; 0,7 mil millones de intangibles, el resto inmovilizado y derechos de uso). Capex 9,1 % en 2025 (7,3-8,0 % en 2021-2024), con la inversión en EE. UU. (50.000 M USD en 5 años).
const amort = [5.4, 5.6, 5.8, 6.0, 6.2, 6.4, 6.5, 6.6, 6.7, 6.8];
const capex = [9.0, 9.0, 8.8, 8.5, 8.0, 7.5, 7.2, 7.0, 7.0, 7.0];
// Circulante comercial (existencias + clientes − proveedores) a su nivel real: 20,8 % de las ventas en 2025.
const nwc = Array(10).fill(21.0);
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 19, fijo: i === 0,
}));

// WACC en francos. Tasa libre: bono de la Confederación a 10 años, 0,59 % (sep-2026, OCDE vía FRED) [D].
// Beta: propia mensual 5 años 0,97 frente al SMI [D1] desapalancada con la deuda de Roche (D/E de mercado 31.805/317.180 = 10,0 %, t = 18 %): 0,97/1,082 = 0,90;
// Damodaran Europa farmacéutica desapalancada (corregida por caja) 1,09 [D14]. Media 0,99, reapalancada con la deuda propia de Roche: 0,99 × 1,082 = 1,07.
// Coste de la deuda 3,0 % antes de impuestos (bonos en CHF ≈1 %, EUR ≈3 %, USD ≈4,5-5 %; calificación AA). Peso de la deuda a mercado 9,1 %.
const wacc = { tasa_libre_pct: 0.59, beta: 1.07, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.0, tasa_impositiva_pct: 18, peso_deuda_pct: 9.1 };

export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc,
    terminal: { metodo: 'gordon', crecimiento_pct: 0.8, multiplo_salida: 12 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 6.0, precio_pct: -0.5, otros_pct: -3.5, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: 0, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 5.0, precio_pct: -0.5, otros_pct: 0, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 4.0, precio_pct: -0.5, otros_pct: 0, comentario: T.puente?.['2029e'] ?? null },
        { periodo: '2030e', volumen_pct: 3.5, precio_pct: -0.5, otros_pct: 0, comentario: T.puente?.['2030e'] ?? null },
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
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 1S26 (30-jun-2026) [A5]: deuda 31.805, arrendamientos 1.503, caja y valores 9.734.
    // Minoritarios: el 38,9 % de Chugai a mercado (6.795 JPY × 1.646 M acciones el 23-oct = 11,18 billones JPY; 4,35 billones / 190,21 JPY por CHF) [P4].
    // Pensiones: déficit bruto 2.398 M (obligaciones 3.904 − activos 1.506), neto de impuestos al 18 %: 1.966 M.
    // Otros ajustes: dividendo de 2025 ya pagado en marzo (en el balance de junio); nada más.
    puente: { fecha: '2026-06-30', deuda_financiera: 31805, arrendamientos: 1503, caja: 9734, minoritarios: 22870, pensiones: 1966, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth, octubre de 2026 [P2]' },
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 20.6, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 22.8, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 23.7, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', anios: 5, actual: 18.1, mediana_5a: 15.64, minimo_5a: 13.01, media_larga: 15.1,
        v2: { mediana_5a: 14.31, minimo_5a: 13.17, media_larga: 15.54, excluidos: 'Historia AL CIERRE (cierre ÷ BPA core del mismo ejercicio): 2019 15,58x (314,0/20,16); 2020 16,13x (309,0/19,16); 2021 19,14x (379,1/19,81); 2022 14,31x (290,5/20,30); 2023 13,17x (244,5/18,57); 2024 13,59x (255,5/18,80); 2025 16,87x (328,2/19,46).' },
        excluidos: 'BPA core diluido (sin amortización ni deterioro de intangibles, reestructuración ni partidas no recurrentes), la misma base que los tres casos. PER adelantado al cierre de cada año = cierre ÷ BPA core real del año siguiente: 2018 12,07x (243,4/20,16), 2019 16,39x (314,0/19,16), 2020 15,60x (309,0/19,81), 2021 18,67x (379,1/20,30), 2022 15,64x (290,5/18,57), 2023 13,01x (244,5/18,80), 2024 13,13x (255,5/19,46) y 2025 16,25x (328,2/20,20, nuestro 2026e) [D1, A]. Mediana de 5 años (2021-2025) 15,64x, mínimo 13,01x; media de 2018-2025 15,10x. Ningún año excluido. Actual = 390,90 ÷ 21,60 (nuestro BPA core de 2027e).',
      },
      comparables_per: { mediana: 16.03 },
      consenso: { bpa_ano1: 20.33, bpa_ano2: 21.99, objetivo_medio: 386.36, objetivo_min: 250, objetivo_max: 440, analistas: 21, tendencia_3m: 'subidas', fuente: 'Stock Analysis (S&P Global, 26-oct: 21 analistas) y encuesta de consenso de Roche (31-ago, 17 analistas); contraste con MarketBeat (ADR, objetivo 60 USD ≈ 396 CHF) [D3, D6, D5]' },
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
    { id: 1, titulo: 'Long-Term Government Bond Yields: 10-Year, Switzerland (IRLTLT01CHM156N): 0,59 % en septiembre de 2026', editor: 'OCDE vía FRED (Banco de la Reserva Federal de St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/IRLTLT01CHM156N' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026 (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/implpr.html' },
    { id: 3, titulo: 'Tipos de cambio de referencia del euro del 23-oct-2026 (USD 1,1193; CHF 0,9227; JPY 175,51)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
    { id: 4, titulo: 'Chugai Pharmaceutical (4519.T): cierre de 6.795 JPY el 23-oct-2026 y 1.646 M de acciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/4519.T/' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
