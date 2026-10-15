// Parte del analista (Constellation Energy, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

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
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: S.mercado_final,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: la empresa publica sus segmentos por región y no por tecnología (nuclear, gas, comercialización), sin resultado por segmento más allá del margen sobre combustible; separar la nuclear de Calpine exigiría inventar el EBITDA de cada parte.', confianza: 'Media' },
  valoracion: {
    // Balance del 30-jun-2026 (10-Q). Deuda = pagarés y préstamos a corto 5.226 + vencimientos 363 + largo plazo 19.111.
    // Pensiones: 1.844 M de obligación neta × (1 − 25,5 %). Otros ajustes: −4.500 M de cobro neto de impuestos por las ventas
    // a LS Power (4,4 GW y Brazos Valley; la empresa lo estima en su plan de caja) + 250 M de recompras de julio.
    puente: { fecha: '2026-06-30', deuda_financiera: 24700, arrendamientos: 0, caja: 697, minoritarios: 345, pensiones: 1374, asociadas: 0, otros_ajustes: -4250 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D4]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Bajista, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Base, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: S.bpa['2028e'].Alcista, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', actual: 21.2, mediana_5a: 18.8, minimo_5a: 13.5, media_larga: 20.0,
        excluidos: 'Historia adelantada (cierre de cada año ÷ BPA ajustado real del año siguiente): 2022 13,7x (86,21 ÷ 6,28); 2023 13,5x (116,89 ÷ 8,67); 2024 23,8x (223,71 ÷ 9,39); 2025 29,1x (353,27 ÷ nuestro BPA de 2026e, 12,14). Sin exclusiones; no hay años anteriores porque la empresa cotiza desde febrero de 2022. Actual: 279,54 ÷ 13,21 (nuestro BPA de 2027e) = 21,2x.',
        v2: { mediana_5a: 25.8, minimo_5a: 18.6, media_larga: 27.3, excluidos: 'Historia al cierre (precio ÷ BPA ajustado del mismo año): 2023 18,6x; 2024 25,8x; 2025 37,6x. 2022 fuera: la empresa no publicó BPA ajustado (daba EBITDA ajustado).' },
      },
      comparables_per: { mediana: 16.7 },
      consenso: { bpa_ano1: 12.14, bpa_ano2: 13.31, objetivo_medio: 336.6, objetivo_min: 238, objetivo_max: 395, analistas: 23, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (19 analistas en BPA; 2027e 13,58 hace 90 días) [D3]; Stock Analysis (23 analistas, objetivo medio 336,6 USD) [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { recomendacion: 'Mantener', conviccion: 'Media', justificacion_recomendacion: null, horizonte: '12 meses', ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
