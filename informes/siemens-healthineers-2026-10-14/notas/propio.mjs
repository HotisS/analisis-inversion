// Parte del analista (Siemens Healthineers, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Base del DCF: FY2025 (23.375 M de ingresos, EBITDA 4.730 M, de agregador). Ejercicio a septiembre, etiqueta «fin».
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const crec = [2.0, 5.0, 5.5, 5.5, 5.0, 4.5, 3.5, 3.0];
const margen = [20.6, 21.3, 22.0, 22.3, 22.5, 22.5, 22.5, 22.5];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 5.2, capex_pct_ventas: i === 0 ? 5.3 : (i < 5 ? 6.3 : 5.9), nwc_pct_ventas: 0, tasa_impositiva_pct: 27, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  huecos_resueltos: [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 27, peso_deuda_pct: 22 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 2.0, precio_pct: 1.8, otros_pct: -1.8, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 3.5, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 4.0, precio_pct: 1.5, otros_pct: 0, comentario: T.puente?.['2029e'] ?? null },
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
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Baja',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda neta publicada (≈12.000 M a 30-jun-2026, 2,8x EBITDA) sin desglose de deuda bruta, caja, arrendamientos y pensiones.
    puente: { fecha: '2026-06-30', deuda_financiera: 12000, arrendamientos: 0, caja: 0, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D7]' },
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2028e (BPA ajustado)', beneficio_por_accion: 2.54, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2028e (BPA ajustado)', beneficio_por_accion: 2.82, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2028e (BPA ajustado)', beneficio_por_accion: 2.97, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { base: 'adelantado', actual: 14.9, mediana_5a: 23.4, minimo_5a: 19.7, media_larga: 22.7, excluidos: 'PER adelantado (regla v3): cierre de diciembre de cada año ÷ BPA ajustado del ejercicio siguiente. Dic-2021 28,7x (65,82 ÷ 2,29) excluido: pruebas de covid y burbuja de salud. Serie limpia: dic-2022 23,1x (46,73 ÷ 2,02); dic-2023 23,6x (52,60 ÷ 2,23); dic-2024 24,4x (58,20 ÷ 2,39); dic-2025 19,7x (44,3 estimado ÷ 2,25, BPA subyacente de FY2026 sin aranceles devueltos, guía aún sin cerrar) [D3, D9, A2, A5, A6, A7, A12]. Los cierres de diciembre caen tres meses dentro del ejercicio siguiente (no hay cierres de septiembre). Media larga: los cuatro años limpios. Actual = 37,67 ÷ 2,53 (nuestro BPA ajustado de FY2027e).' },
      comparables_per: { mediana: 15.5 },
      consenso: { bpa_ano1: null, bpa_ano2: null, objetivo_medio: 45.14, objetivo_min: 37.37, objetivo_max: 63.0, analistas: 20, tendencia_3m: 'recortes', fuente: 'Börse Express (30-ago-2026) y StocksGuide (julio de 2026) [D2, D4]' },
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
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
