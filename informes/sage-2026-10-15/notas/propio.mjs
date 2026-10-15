// Parte del analista (Sage, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
import T12 from './textos12m.mjs';
T = { ...T12, ...T };

// Supuestos del DCF (GBP, ejercicio a septiembre; FY2026 cerrado el 30-sep-2026 y sin publicar: fijo con nueve meses conocidos).
// EBITDA publicado = EBIT + amortización total (incluida la de intangibles de compras, que baja con el tiempo).
// Capex = inmovilizado e intangibles (≈2,3 %) + altas de derechos de uso (≈0,7 %). Circulante comercial sin ingresos diferidos (1,5 %).
const a = (periodo, g, m, am, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: 3.0, nwc_pct_ventas: 1.5, tasa_impositiva_pct: 25.0, fijo });
const anios = [
  a('FY2026e', 9.8, 25.4, 3.4, true),
  a('FY2027e', 9.0, 26.0, 3.3),
  a('FY2028e', 8.5, 26.6, 3.2),
  a('FY2029e', 7.5, 27.0, 3.1),
  a('FY2030e', 6.5, 27.3, 3.0),
  a('FY2031e', 5.0, 27.5, 3.0),
  a('FY2032e', 4.0, 27.5, 3.0),
];
const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
const puente = [
  { periodo: 'FY2026e', volumen_pct: 5.0, precio_pct: 4.3, otros_pct: 0.5 },
  { periodo: 'FY2027e', volumen_pct: 4.5, precio_pct: 4.0, otros_pct: 0.5 },
  { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 4.0, otros_pct: 0 },
  { periodo: 'FY2029e', volumen_pct: 4.0, precio_pct: 3.5, otros_pct: 0 },
  { periodo: 'FY2030e', volumen_pct: 3.5, precio_pct: 3.0, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UK-adopted)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.39, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.5, tasa_impositiva_pct: 25.0, peso_deuda_pct: 17 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las tres regiones venden los mismos productos (Intacct, Sage 50, Sage 200, X3, nómina) sobre la misma plataforma, con márgenes parecidos (20-25 % de EBIT subyacente), y no hay comparables puros por región.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-03-31', deuda_financiera: 1911, arrendamientos: 111, caja: 518, minoritarios: 0, pensiones: 19, asociadas: 0, otros_ajustes: 257 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: T.casos_12m ?? [],
      per_historico: { base: 'adelantado', actual: T.per_actual ?? null, mediana_5a: 28.2, minimo_5a: T.per_min ?? 25.0, media_larga: T.per_media ?? 28.3, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 31.1, minimo_5a: 27.7, media_larga: 30.4, excluidos: 'Historia al cierre (precio de cierre ÷ BPA diluido del mismo ejercicio): FY2022 6,972 / 0,2517 = 27,7x; FY2023 9,89 / 0,237 (normalizado) = 41,7x; FY2024 10,245 / 0,3155 = 32,5x; FY2025 11,00 / 0,3716 = 29,6x; FY2018 5,864 / 0,2707 = 21,7x y FY2017 6,985 / 0,2378 = 29,4x en la media larga. Fuera FY2019-FY2021 (plusvalías de desinversiones en el BPA). Mediana de los cuatro años recientes 31,1x; mínimo 27,7x.' } },
      comparables_per: { mediana: 22.1 },
      consenso: { bpa_ano1: 0.4443, bpa_ano2: 0.5227, objetivo_medio: 11.43, objetivo_min: 8.5, objetivo_max: 14.0, analistas: 19, tendencia_3m: 'estables', fuente: 'MarketScreener, 15-oct-2026 [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
