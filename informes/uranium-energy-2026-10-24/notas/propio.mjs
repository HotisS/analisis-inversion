// Parte del analista (Uranium Energy Corp, corte 2026-10-24, precio de cierre del 23-oct-2026). Citas: [A3] = fuente 3 de A.json.
let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

// Proyección por ejercicios fiscales (cierre a 31 de julio). Ventas = libras vendidas × precio realizado.
const A = (periodo, crecimiento_pct, margen_ebitda_pct, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, amortizacion_pct_ventas = 5) =>
  ({ periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo: false });

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -12, ajuste_margen_pp: -8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 8, ajuste_margen_pp: 5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

export default {
  meta: {
    fecha_corte: '2026-10-24', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 7, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: [{ seccion: 'valoracion', campo: 'referencia_mercado (prima implícita de Damodaran)' }],
  negocio: { descripcion: T.negocio_descripcion ?? null, como_gana_dinero: T.negocio_como_gana ?? null },
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  dcf: {
    anios: [
      A('2027e', 70.7, -185, 45, 100, 0),
      A('2028e', 135, -45, 25, 50, 0),
      A('2029e', 70, -3, 15, 30, 0),
      A('2030e', 38, 16, 10, 22, 0),
      A('2031e', 25, 25, 8, 20, 10),
      A('2032e', 12, 30, 7, 20, 15),
      A('2033e', 8, 37, 6, 20, 21),
      A('2034e', 5, 40, 6, 20, 21),
      A('2035e', 3.5, 42, 6, 20, 21),
      A('2036e', 2.5, 42, 6, 20, 21),
    ],
    wacc: { tasa_libre_pct: 5.0, beta: 1.35, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 7.0, tasa_impositiva_pct: 21, peso_deuda_pct: 0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: 'No aplica: el ROIC es negativo y no supera al WACC.' },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2027e', volumen_pct: 60.7, precio_pct: 10, otros_pct: 0, comentario: 'Volumen: de 400.000 lb vendidas (todas de inventario comprado) a ≈ 650.000 lb, en línea con el consenso de ventas de 63,6 M USD [D3]; precio realizado de 93,13 a ≈ 100 USD/lb si se mantiene el largo plazo de 96,5-97 [B1, A1].' },
        { periodo: '2028e', volumen_pct: 125, precio_pct: 10, otros_pct: 0, comentario: 'Primeras ventas de producción propia: Christensen Ranch y Burke Hollow pasan de 82.744 lb en el 4T26 (≈ 330.000 lb anualizadas) a ≈ 1,4 M lb, con nuevas áreas de pozos [A1]; el consenso da 177,2 M USD de ventas, por encima de nuestro 150 [D3].' },
        { periodo: '2029e', volumen_pct: 70, precio_pct: 0, otros_pct: 0, comentario: 'Ludeman y más áreas en Texas; ≈ 2,4 M lb a precio plano. No hay guía de la empresa: la dirección se negó a darla el 29-sep [A11].' },
        { periodo: '2030e', volumen_pct: 38, precio_pct: 0, otros_pct: 0, comentario: 'Sweetwater solo si el permiso llega en 2027 (evaluación ambiental en mar-2027, plan de operaciones en may-2027) [A1]; ≈ 3,3 M lb, el 27 % de la capacidad licenciada de 12,1 M lb [D1].' },
      ],
      mercado_final: { periodo: '2036e', tamano: 21500 },
      veredicto: 'No',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica de forma útil: el segmento corporativo (compraventa de uranio y participaciones) ya está en el puente a valor de mercado (Uranium Royalty, acciones cotizadas) y en el circulante (inventario); el resto es un único negocio minero ISR [A, D].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-07-31', deuda_financiera: 0, arrendamientos: 0, caja: 495.5, minoritarios: 0, pensiones: 0, asociadas: 99.4, otros_ajustes: -7.1 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m con pago sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth (4,20 % en octubre de 2026, cifra del prompt) [P1]' },
    pesos: { dcf: 50, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 50 },
    comentario: T.valoracion_comentario ?? null,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'P/VC (valor contable por acción a jul-2027e)', beneficio_por_accion: -0.13, multiplo: 2.16, precio: 5.46, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'P/VC (valor contable por acción a jul-2027e)', beneficio_por_accion: -0.13, multiplo: 2.91, precio: 7.36, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'P/VC (valor contable por acción a jul-2027e)', beneficio_por_accion: -0.12, multiplo: 3.5, precio: 8.86, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { base: 'adelantado', actual: null, mediana_5a: null, minimo_5a: null, media_larga: null, excluidos: 'Todos: UEC ha perdido dinero en ocho de los diez últimos ejercicios (solo FY2022, por plusvalías financieras, y ninguno con beneficio operativo recurrente) y el BPA de FY2027e y FY2028e es negativo; el PER no tiene sentido. Se usa el P/VC con la misma regla común aplicada a mano (base a mitad de camino hacia la mediana de 5 años con tope ×1,1; bajista = mínimo de 5 años; alcista = mediana de los comparables con techo ×1,35).' },
      comparables_per: { mediana: null },
      consenso: { bpa_ano1: -0.23, bpa_ano2: -0.07, objetivo_medio: 16.03, objetivo_min: 10, objetivo_max: 26.75, analistas: 11, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (LSEG) y StockAnalysis, 19/23-oct-2026 [D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 7.23,
      comentario: T.objetivo12m_comentario ?? null,
    },
    confianza: 'Baja',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
  huecos: [],
};
