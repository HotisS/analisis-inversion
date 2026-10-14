// Parte del analista (Cintas, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Supuestos del DCF (FY2027e-FY2036e). Capex = inmovilizado (≈3,5 %) + comisiones activadas (≈1,2 %) + aumento del inventario en servicio (≈1,0 %).
const g = [8.5, 7.5, 7.2, 7.0, 6.7, 6.2, 5.7, 5.2, 4.6, 4.0];
const m = [28.2, 28.7, 29.0, 29.3, 29.5, 29.7, 29.8, 29.9, 30.0, 30.0];
const cx = [5.6, 5.6, 5.6, 5.5, 5.5, 5.4, 5.4, 5.3, 5.2, 5.0];
const anios = g.map((c, i) => ({ periodo: `FY${2027 + i}e`, crecimiento_pct: c, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 4.55, capex_pct_ventas: cx[i], nwc_pct_ventas: 13.7, tasa_impositiva_pct: i === 0 ? 20.4 : 21.0, fijo: false }));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 5, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.21, beta: 0.93, prima_mercado_pct: 5.0, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 21, peso_deuda_pct: 3 },
    terminal: { metodo: 'media', crecimiento_pct: 3.0, multiplo_salida: 18 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: 'FY2027e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.5, comentario: T.puente?.[0] ?? null },
        { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 2.5, otros_pct: 0.0, comentario: T.puente?.[1] ?? null },
        { periodo: 'FY2029e', volumen_pct: 4.7, precio_pct: 2.5, otros_pct: 0.0, comentario: T.puente?.[2] ?? null },
        { periodo: 'FY2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0, comentario: T.puente?.[3] ?? null },
        { periodo: 'FY2031e', volumen_pct: 4.2, precio_pct: 2.5, otros_pct: 0.0, comentario: T.puente?.[4] ?? null },
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
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres negocios comparten clientes, rutas y sistemas, tienen márgenes operativos parecidos (24,1 %, 25,4 % y 15,3 %) y no hay comparables cotizados puros de cada uno.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-08-31', deuda_financiera: 2428.8, arrendamientos: 0, caja: 243.6, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 500 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 5.39, multiplo: null, precio: null, justificacion: T.casos12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 6.05, multiplo: null, precio: null, justificacion: T.casos12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 6.49, multiplo: null, precio: null, justificacion: T.casos12?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 34.1, mediana_5a: 31.1, minimo_5a: 30.6, media_larga: 32.4,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 36.3, minimo_5a: 34.2, media_larga: 36.8, excluidos: 'Ninguno: FY2019-FY2026 al cierre (precio de cierre de mayo ÷ BPA del mismo ejercicio, en acciones de hoy).' },
      },
      comparables_per: { mediana: 19.8 },
      consenso: { bpa_ano1: 5.54, bpa_ano2: 6.16, objetivo_medio: 218.31, objetivo_min: 181, objetivo_max: 250, analistas: 20, tendencia_3m: 'subidas', fuente: 'BPA de 18 analistas de Yahoo Finance; objetivos de 20 analistas de Stock Analysis [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 182.1,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
