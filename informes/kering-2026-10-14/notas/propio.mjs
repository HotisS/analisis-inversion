// Parte del analista (Kering, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
// Base del DCF: 2025 recurrente sin Kering Beauté (14.675 M de ingresos, EBITDA recurrente 3.675 M). NIIF 16: arrendamientos en la deuda,
// capex del DCF con las altas de derechos de uso (≈7-8 % de las ventas) además del capex operativo.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const crec = [-2.0, 5.0, 6.0, 6.0, 5.0, 4.5, 4.0, 3.0];
const margen = [27.0, 28.5, 30.0, 31.5, 32.5, 33.0, 33.0, 33.0];
const capex = [12.5, 13.0, 13.5, 13.5, 13.5, 14.0, 14.0, 14.0];
const nwc = [24.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 13.9, capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 28, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  huecos_resueltos: [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 28, peso_deuda_pct: 35 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: -3.0, precio_pct: 2.0, otros_pct: -1.0, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.5, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 3.5, precio_pct: 2.0, otros_pct: 0.5, comentario: T.puente?.['2029e'] ?? null },
      ],
      mercado_final: { periodo: '2033e', tamano: 471000 },
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 45, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2, ajuste_margen_pp: 2, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Baja',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Balance de 30-jun-2026: caja 8.500 M y deuda neta 3.300 M (deuda bruta 11.800 M por diferencia); arrendamientos de dic-2025 (6.212 M).
    // Minoritarios y participación del 30 % en Valentino sin cifra localizada: 0 (se explica en el comentario).
    puente: { fecha: '2026-06-30', deuda_financiera: 11800, arrendamientos: 6212, caja: 8500, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D19]' },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 8.70, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 12.33, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e (BPA recurrente)', beneficio_por_accion: 14.98, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 20.8, mediana_5a: 21.1, minimo_5a: 19.0, media_larga: 21.4,
        excluidos: 'PER adelantado (regla v3): precio de cierre de cada año ÷ BPA recurrente del ejercicio siguiente. Serie: dic-2020 22,0x (594,40 ÷ 27,02); dic-2021 23,2x (706,90 ÷ 30,46); dic-2022 19,0x (475,50 ÷ 25,02); dic-2023 37,7x (399,00 ÷ 10,59), dic-2024 54,9x (238,25 ÷ 4,34) y dic-2025 ≈45x (303,10 ÷ ≈6,8, nuestro BPA de 2026e) excluidos por BPA atípico: el beneficio se hundió un 86 % y el mercado pagaba la recuperación, no el beneficio [D8, A2, A3, A5, A16]. Mediana y mínimo de 5 años con los dos cierres limpios de la ventana (2021 y 2022); media larga con 2020-2022. Actual = 209,10 ÷ 10,03 (nuestro BPA recurrente de 2027e).',
      },
      comparables_per: { mediana: 19.75 },
      consenso: { bpa_ano1: 9.30, bpa_ano2: 12.56, objetivo_medio: 282.46, objetivo_min: 175, objetivo_max: 360, analistas: 24, tendencia_3m: 'recortes', fuente: 'MarketScreener (2-sep-2026) e Investing.com (julio de 2026); recortes de Morgan Stanley y Citi el 2-oct [D1, D7, D2]' },
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
