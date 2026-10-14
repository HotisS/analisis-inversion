// Parte del analista (Unilever, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Proyección del perímetro actual (con la alimentación): la operación con McCormick se trata como neutral en valor (ver limitaciones).
const crec = [1.0, 4.0, 4.5, 4.5, 4.0, 3.5, 3.0];
const margen = [22.3, 22.6, 22.9, 23.0, 23.0, 23.0, 23.0];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.0,
  capex_pct_ventas: 3.2,
  nwc_pct_ventas: 0,
  tasa_impositiva_pct: 25.7,
  fijo: i === 0,
}));

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.5, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.7, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 3.0, precio_pct: 1.5, otros_pct: -3.5 },
  { periodo: '2027e', volumen_pct: 2.5, precio_pct: 1.5, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'GBp', tipo_cambio: 0.0118374, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (UE y Reino Unido)', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios,
    wacc: { tasa_libre_pct: 3.53, beta: 0.75, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.5, tasa_impositiva_pct: 25.7, peso_deuda_pct: 18 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 12 },
    etapa2: { usar: false, anios: 5, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Baja',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda neta de 26.000 M a 30-jun-2026 [A5]: deuda bruta con arrendamientos de 32.110 M [A15], arrendamientos ≈1.490 M (estimación).
    // Minoritarios a valor estimado: beneficio atribuido a minoritarios (≈480 M en 2025) × 20.
    puente: { fecha: '2026-06-30', deuda_financiera: 30620, arrendamientos: 1490, caja: 6110, minoritarios: 9600, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P1]' },
    pesos: { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 },
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 3.32, multiplo: null, precio: null, justificacion: T.o12_just?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 3.60, multiplo: null, precio: null, justificacion: T.o12_just?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 3.80, multiplo: null, precio: null, justificacion: T.o12_just?.Alcista ?? null },
      ],
      per_historico: { actual: 16.5, mediana_5a: 17.9, minimo_5a: 17.1, media_larga: 18.7, excluidos: 'Ninguno: PER medio anual sobre BPA subyacente (Sure Dividend [E6]) de 2018-2025: 19,6; 20,6; 19,8; 18,8; 17,1; 18,1; 17,9; 17,8. Es el PER medio del año, no el de cierre, porque no se pudieron obtener los cierres anuales desde la nube.' },
      comparables_per: { mediana: 18.1 },
      consenso: { bpa_ano1: 3.04, bpa_ano2: null, objetivo_medio: 61.90, objetivo_min: 47.10, objetivo_max: 70.08, analistas: 20, tendencia_3m: 'subidas', fuente: 'Simply Wall St y Webull, convertidos con el tipo del BCE [D7, D6, D8]' },
      diferencia_consenso: T.o12_dif ?? null,
      media: null,
      comentario: T.o12_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Rendimiento del Bund a 10 años (12-oct-2026: 3,53 %), serie BBSIS (vía informes del repositorio del 14-oct)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  ],
};
