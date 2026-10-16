// Parte del analista (HKEX, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const anios = [
  // periodo, crecimiento, margen EBITDA, amortización, capex, circulante, impuestos, fijo
  ['2026e', 9.2, 78.0, 5.5, 15.5, 0, 16.0, true],
  ['2027e', -3.0, 76.0, 6.0, 7.0, 0, 16.5, false],
  ['2028e', 6.0, 76.5, 6.2, 7.0, 0, 16.5, false],
  ['2029e', 6.5, 76.5, 6.3, 7.0, 0, 16.5, false],
  ['2030e', 6.0, 76.5, 6.4, 7.0, 0, 16.5, false],
  ['2031e', 5.5, 76.0, 6.5, 7.0, 0, 16.5, false],
  ['2032e', 4.5, 76.0, 6.5, 7.0, 0, 16.5, false],
  ['2033e', 3.5, 76.0, 6.5, 7.0, 0, 16.5, false],
].map(([periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo]) => ({ periodo, crecimiento_pct, margen_ebitda_pct, amortizacion_pct_ventas, capex_pct_ventas, nwc_pct_ventas, tasa_impositiva_pct, fijo }));

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'HKD', divisa_cotizacion: 'HKD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'HKFRS (equivalentes a NIIF)', formato_cuenta: 'naturaleza',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  huecos_resueltos: T.huecos_resueltos ?? [],
  _parches: T.parches ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 5.19, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.0, tasa_impositiva_pct: 16.5, peso_deuda_pct: 0 },
    terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 15 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 10.2, precio_pct: -1.0, otros_pct: 0.0, comentario: T.puente?.['2026e'] ?? null },
        { periodo: '2027e', volumen_pct: -2.0, precio_pct: -1.0, otros_pct: 0.0, comentario: T.puente?.['2027e'] ?? null },
        { periodo: '2028e', volumen_pct: 5.0, precio_pct: 0.0, otros_pct: 1.0, comentario: T.puente?.['2028e'] ?? null },
        { periodo: '2029e', volumen_pct: 5.0, precio_pct: 0.0, otros_pct: 1.5, comentario: T.puente?.['2029e'] ?? null },
        { periodo: '2030e', volumen_pct: 4.5, precio_pct: 0.0, otros_pct: 1.5, comentario: T.puente?.['2030e'] ?? null },
      ],
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: '2027e', crecimiento_pp: -14, margen_pp: -5 }], narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 55, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [], narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los cuatro segmentos comparten la misma economía de bolsa y cámara (comisiones por volumen, costes fijos comunes) y el único negocio distinto, la LME (8 % del EBITDA de 2025), no cambia el valor por separado; se valora con el DCF del grupo.', confianza: 'Media' },
  valoracion: {
    pesos: { dcf: 50, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 20 },
    objetivo_12m: T.objetivo_12m ?? null,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
