// Parte del analista (Rollins, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (2026e-2032e). Rollins es un comprador en serie: el crecimiento incluye 2-3 puntos de compras al año
// (guía de la empresa) y su coste va en el capex: capex de inmovilizado ≈ 1,0 % de las ventas + compras ≈ 2,3-2,5 veces las
// ventas compradas (Saela 2,8x, Romex 2,3x). 2026e fijo: 1S26 publicado y guía rebajada (≥ 6 % orgánico + ≈ 2,5 % de compras).
// Amortización del 3,2-3,4 % (2025: 3,3 %; incluye la de las carteras de clientes compradas). Circulante comercial ≈ 5 %.
const g = [8.5, 7.5, 7.5, 7.0, 6.5, 5.5, 4.5];
const m = [21.6, 21.9, 22.2, 22.5, 22.7, 22.8, 22.8];
const cx = [6.9, 6.0, 6.0, 5.8, 5.5, 4.5, 3.5];
const am = [3.2, 3.3, 3.4, 3.4, 3.4, 3.4, 3.4];
const anios = g.map((c, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: c, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i], nwc_pct_ventas: 5.0, tasa_impositiva_pct: 24.8, fijo: i === 0 }));

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.19, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.9, tasa_impositiva_pct: 24.8, peso_deuda_pct: 4 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 16 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 2.8, precio_pct: 3.2, otros_pct: 2.5, comentario: T.puente?.[0] ?? null },
        { periodo: '2027e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 2.0, comentario: T.puente?.[1] ?? null },
        { periodo: '2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 2.0, comentario: T.puente?.[2] ?? null },
        { periodo: '2029e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 1.5, comentario: T.puente?.[3] ?? null },
        { periodo: '2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 1.5, comentario: T.puente?.[4] ?? null },
      ],
      mercado_final: { periodo: '2032e', tamano: 22000 },
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: residencial, comercial y termitas comparten marcas, sucursales, técnicos y rutas, la empresa publica un solo segmento y no hay comparables cotizados puros de cada línea [A1].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 703.0, arrendamientos: 0, caja: 109.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 1.20, multiplo: null, precio: null, justificacion: T.casos12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 1.34, multiplo: null, precio: null, justificacion: T.casos12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 1.44, multiplo: null, precio: null, justificacion: T.casos12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 26.7, mediana_5a: 45.5, minimo_5a: 41.1, media_larga: 46.3,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 48.7, minimo_5a: 47.5, media_larga: 53.2, excluidos: '2019 excluido (BPA deprimido por la liquidación del plan de pensiones). Historia al cierre: precio de cierre ÷ BPA del mismo año, 2018 y 2020-2025.' },
      },
      comparables_per: { mediana: 20.2 },
      consenso: { bpa_ano1: 1.26, bpa_ano2: 1.39, objetivo_medio: 41.59, objetivo_min: 27, objetivo_max: 66, analistas: 19, tendencia_3m: 'bajadas', fuente: 'BPA de MarketScreener; objetivos de 19 analistas de Stock Analysis [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
