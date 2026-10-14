// Parte del analista (Bureau Veritas, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
// Base del DCF: 2025 (6.466,4 M EUR). EBITDA = beneficio operativo publicado + amortizaciones totales (NIIF 16: incluye la de derechos de uso
// y la de intangibles de adquisiciones). El capex del DCF incluye una estimación de las altas de derechos de uso (≈1,5 % de las ventas).
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

// Crecimiento: 2026e casi cerrado (5-6 % orgánico, −4,5 % de divisa, +1,5-2 % de compras); 2027e recoge la venta de ≈450 M EUR de ingresos
// (petróleo, petroquímica, carbón y Gobiernos) neta de las compras de 2026 (≈138 M EUR): −4,7 puntos sobre un orgánico del 5,7 %.
// Sin compras futuras (se suponen neutras en valor): el objetivo de «dos dígitos» del día del inversor incluye compras.
const crec = [3.0, 1.0, 6.0, 5.5, 5.0, 4.5, 4.0, 3.0];
const margen = [20.3, 20.8, 21.1, 21.3, 21.5, 21.5, 21.5, 21.5];
const amort = [4.6, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0];
const capex = [3.8, 3.8, 4.2, 4.2, 4.3, 4.3, 4.3, 4.3];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i], capex_pct_ventas: capex[i],
  nwc_pct_ventas: 0, tasa_impositiva_pct: i < 2 ? 29.5 : 28.0, fijo: i === 0,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 28, peso_deuda_pct: 21 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 13 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: [
        { periodo: '2026e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: -2.5 },
        { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.7, otros_pct: -4.7 },
        { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
        { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
        { periodo: '2030e', volumen_pct: 2.7, precio_pct: 2.3, otros_pct: 0 },
      ].map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.5, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null, confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Balance del 30-jun-2026: deuda bruta = deuda neta ajustada (1.688,6) + caja (942,1); arrendamientos de dic-25 (no hay dato semestral).
    // Minoritarios a valor de mercado estimado: 21,5 M EUR de resultado (2025) × 18 veces.
    puente: { fecha: '2026-06-30', deuda_financiera: 2630.7, arrendamientos: 465.6, caja: 942.1, minoritarios: 387, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P2]' },
    pesos: { dcf: 60, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 15 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos12m ?? [],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 23.15 },
      consenso: { bpa_ano1: 1.54, bpa_ano2: 1.69, objetivo_medio: 32.4, objetivo_min: 28.0, objetivo_max: 38.5, analistas: 15, tendencia_3m: 'subidas', fuente: 'Consenso de la empresa (1-jul-2026) y TradersUnion (septiembre) [D5, D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  capital: { comentario: T.capital_comentario ?? null },
  comparables: { comentario: T.comparables_comentario ?? null },
  transacciones: { comentario: T.transacciones_comentario ?? null },
  multiplos_historicos: { comentario: T.multiplos_comentario ?? null },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: [
    { id: 1, titulo: 'Rendimiento del Bund a 10 años (12-oct-2026), serie BBSIS (vía informes del repositorio del 14-oct)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    ...(T.fuentes_extra ?? []),
  ],
  huecos: T.huecos ?? [],
};
