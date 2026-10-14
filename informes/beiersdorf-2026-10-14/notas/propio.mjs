// Parte del analista (Beiersdorf, corte 2026-10-14). Citas con la letra de la nota: [A1] = fuente 1 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const anios = [
  // EBITDA publicado (con factores especiales ≈0,3 % de las ventas). Capex con altas de derechos de uso (≈0,6 % de las ventas).
  { periodo: '2026e', crecimiento_pct: -2.4, margen_ebitda_pct: 15.2, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.9, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: true },
  { periodo: '2027e', crecimiento_pct: 2.5, margen_ebitda_pct: 15.3, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.8, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2028e', crecimiento_pct: 4.0, margen_ebitda_pct: 15.8, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.6, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2029e', crecimiento_pct: 4.0, margen_ebitda_pct: 16.2, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.5, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2030e', crecimiento_pct: 3.8, margen_ebitda_pct: 16.5, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.4, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2031e', crecimiento_pct: 3.5, margen_ebitda_pct: 16.7, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.3, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2032e', crecimiento_pct: 3.2, margen_ebitda_pct: 16.8, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.2, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
  { periodo: '2033e', crecimiento_pct: 3.0, margen_ebitda_pct: 16.8, amortizacion_pct_ventas: 3.5, capex_pct_ventas: 4.1, nwc_pct_ventas: 10.5, tasa_impositiva_pct: 29.5, fijo: false },
];

const puente_ingresos = [
  { periodo: '2026e', volumen_pct: -2.5, precio_pct: 0.5, otros_pct: -0.4 },
  { periodo: '2027e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: -0.5 },
  { periodo: '2028e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0.0 },
  { periodo: '2029e', volumen_pct: 2.3, precio_pct: 1.5, otros_pct: 0.2 },
  { periodo: '2030e', volumen_pct: 2.0, precio_pct: 1.5, otros_pct: 0.3 },
];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.51, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 0.3, coste_deuda_pct: 4.0, tasa_impositiva_pct: 29.5, peso_deuda_pct: 1.3 },
    terminal: { metodo: 'media', crecimiento_pct: 2.5, multiplo_salida: 13.0 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: 11.0, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: 15.0, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: {
    aplica: true, descuento_holding_pct: 5,
    partes: [
      { segmento: 'Consumer', metrica: 'EBITDA 2027e', valor_metrica: 1215, multiplo: 13.0, ev_directo: null, justificacion: 'Mediana del EV/EBITDA NTM de los comparables de cuidado personal ≈15x, con descuento por la caída de NIVEA y un margen por debajo de L’Oréal y P&G.' },
      { segmento: 'tesa', metrica: 'EBITDA 2027e', valor_metrica: 345, multiplo: 10.0, ev_directo: null, justificacion: 'Química de especialidad y adhesivos (Henkel, 3M, Avery Dennison) cotizan entre 9 y 12 veces; tesa crece poco y depende de la electrónica china.' },
    ],
    comentario: T.suma_partes_comentario ?? null,
    confianza: 'Baja',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 44, arrendamientos: 194, caja: 4283, minoritarios: 9, pensiones: 102, asociadas: 10, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 10, escenarios: 30 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 20.7, mediana_5a: 29.2, minimo_5a: 25.1, media_larga: 29.7,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 32.2, minimo_5a: 22.0, media_larga: 29.8, excluidos: 'Al cierre (precio ÷ BPA del mismo año): fuera 2020 (BPA de la covid) y 2023 (deterioro de Chantecaille); quedan 2019, 2021, 2022, 2024 y 2025; media larga 2018-2025 sin esos dos.' },
      },
      comparables_per: { mediana: 22.1 },
      consenso: { bpa_ano1: 3.76, bpa_ano2: 3.94, objetivo_medio: 79.90, objetivo_min: 67.00, objetivo_max: 95.00, analistas: 20, tendencia_3m: 'recortes', fuente: 'finanzen.net (20 analistas) y Yahoo Finance (objetivo medio 81,05 EUR, 19 analistas) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 101.46,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes: T.fuentes ?? [],
};
