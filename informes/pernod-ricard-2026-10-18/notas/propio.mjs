// Parte del analista (Pernod Ricard, corte 2026-10-18; precio = cierre del viernes 16-oct-2026).
// Citas con la letra de la nota: [A4] = fuente 4 de A.json; [D7] = fuente 7 de D.json.
// Los textos que dependen del cálculo están en textos.mjs (se escriben después de calcular).
let T = {};
try { T = (await import('./textos.mjs?t=' + Date.now())).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

// Año del DCF: crecimiento, margen EBITDA, amortización, capex y circulante (existencias + clientes − proveedores) sobre ventas.
const a = (periodo, g, m, cx = 5.4, nwc = 79.5) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 4.4, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 25, fijo: false });

const ANIOS = [
  a('FY2027e', -3.0, 30.2),
  a('FY2028e', 3.0, 30.6),
  a('FY2029e', 3.5, 31.0),
  a('FY2030e', 3.0, 31.3),
  a('FY2031e', 3.0, 31.5),
  a('FY2032e', 2.5, 31.5),
  a('FY2033e', 2.5, 31.5),
];

const PUENTE = [
  { periodo: 'FY2027e', volumen_pct: 1.0, precio_pct: -1.0, otros_pct: -3.0 },
  { periodo: 'FY2028e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: 'FY2029e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
  { periodo: 'FY2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  { periodo: 'FY2031e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
];

export default {
  meta: {
    fecha_corte: '2026-10-18', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
    huecos: T.huecos ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  bolsa: T.bolsa ?? {},
  dcf: {
    anios: ANIOS,
    wacc: { tasa_libre_pct: 3.48, beta: 0.9, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 3.7, tasa_impositiva_pct: 25, peso_deuda_pct: 38 },
    terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 11 },
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: null },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: PUENTE.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: {
    casos: [
      { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, narrativa: T.narrativas?.Bajista ?? null },
      { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Base ?? null },
      { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, narrativa: T.narrativas?.Alcista ?? null },
    ],
    comentario: T.escenarios_comentario ?? null,
    confianza: 'Media',
  },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: tras vender los vinos (2024-2025) e Imperial Blue (diciembre de 2025), el grupo es un solo negocio de espirituosos y champán, con márgenes y comparables parecidos en todas las marcas [A1, A2].', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [A1]: deuda bruta tras coberturas 12.206, arrendamientos 449, caja 1.993 (deuda neta 10.662);
    // minoritarios 1.040; pensiones 216 × (1 − 25 %); asociadas 63; otros: dividendo a cuenta de 592 pendiente de pago
    // (pagado el 24-jul-2026) y 1.105 de factoring sin recurso (deuda de hecho, fuera de la deuda neta publicada).
    puente: { fecha: '2026-06-30', deuda_financiera: 12206, arrendamientos: 449, caja: 1993, minoritarios: 1040, pensiones: 162, asociadas: 63, otros_ajustes: 1697 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2028e', beneficio_por_accion: 4.96, multiplo: null, precio: null, justificacion: 'Ventas de 8.957 M (−5 % en el FY27 y +1 % en el FY28: EE. UU. y China no tocan fondo y el resto del mundo no compensa) con margen EBITDA del 28,6 % (dos puntos menos que el base, como Brown-Forman): EBITDA de 2.562 M, amortización de 394 M, EBIT de 2.168 M, 430 M de gasto financiero, impuesto del 25 % y 35 M de minoritarios, sobre 256 M de acciones (más dividendo en acciones a precio bajo).' },
        { escenario: 'Base', metrica: 'PER FY2028e', beneficio_por_accion: 5.85, multiplo: null, precio: null, justificacion: 'Ventas de 9.396 M (−3 % en el FY27 por el perímetro, con orgánico plano según la guía, y +3 % en el FY28, el extremo bajo del objetivo) con margen EBITDA del 30,6 % por el plan de eficiencia: EBITDA de 2.875 M, amortización de 413 M, EBIT de 2.462 M, 415 M de gasto financiero (FY26: 421 M), impuesto del 25 % y 40 M de minoritarios: 1.495 M sobre 255,4 M de acciones (252,3 M más la dilución del dividendo en acciones) [A1, A4].' },
        { escenario: 'Alcista', metrica: 'PER FY2028e', beneficio_por_accion: 6.39, multiplo: null, precio: null, justificacion: 'Ventas de 9.680 M (−1,5 % en el FY27 y +4,5 % en el FY28: EE. UU. termina el desestocaje y China se estabiliza) con margen del 31,6 %: EBITDA de 3.059 M, EBIT de 2.633 M, 405 M de gasto financiero, impuesto del 25 % y 42 M de minoritarios sobre 255 M de acciones.' },
      ],
      per_historico: {
        base: 'adelantado', anios: 3, actual: 12.2, mediana_5a: 14.5, minimo_5a: 11.5, media_larga: 14.5,
        excluidos: 'Historia adelantada (cierre de junio ÷ BPA recurrente diluido del ejercicio siguiente) [D1, A1]: FY2024 126,70 / 7,26 = 17,5x; FY2025 84,60 / 5,85 = 14,5x; FY2026 63,86 / 5,57 (nuestro FY27e) = 11,5x. Fuera FY2021-FY2023 (187,20 / 8,18 = 22,9x; 175,30 / 9,11 = 19,2x; 202,40 / 7,90 = 25,6x): auge de los destilados tras la pandemia, con desestocaje y beneficio de pico que no volverán. Actual = 68,22 / 5,57 = 12,2x.',
        v2: { mediana_5a: 11.7, minimo_5a: 10.9, media_larga: 12.9, excluidos: 'Historia al cierre (precio de junio ÷ BPA recurrente del mismo ejercicio), los mismos años: FY2024 126,70 / 7,90 = 16,0x; FY2025 84,60 / 7,26 = 11,7x; FY2026 63,86 / 5,85 = 10,9x.' },
      },
      comparables_per: { mediana: 16.6 },
      consenso: { bpa_ano1: 5.35, bpa_ano2: 5.68, objetivo_medio: 80.45, objetivo_min: 60, objetivo_max: 122, analistas: 20, tendencia_3m: 'estables', fuente: 'MarketScreener a 16-oct-2026 (BPA en NIIF, con partidas no recurrentes: 4,77 en el FY26 frente a 5,85 recurrente) [D2, D3]' },
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
