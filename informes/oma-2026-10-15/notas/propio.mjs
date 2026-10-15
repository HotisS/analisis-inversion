// Parte del analista (OMA, corte 2026-10-15). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'MXN', divisa_cotizacion: 'MXN', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF (IASB)', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los negocios no aeronáuticos (comerciales, carga, hoteles y parque industrial) dependen del pasajero y del suelo de la concesión, y la empresa no publica su resultado por separado.', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 14130.6, arrendamientos: 141.7, caja: 2577.4, minoritarios: 183.5, pensiones: 149.4, asociadas: 0, otros_ajustes: 2912.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout); el riesgo país ya está en el bono mexicano', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D5]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 15.36, multiplo: null, precio: null, justificacion: T.casos_12m?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 16.78, multiplo: null, precio: null, justificacion: T.casos_12m?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 17.74, multiplo: null, precio: null, justificacion: T.casos_12m?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: 13.25, mediana_5a: 13.6, minimo_5a: 11.5, media_larga: 13.9,
        excluidos: 'Historia adelantada (cierre de cada año ÷ BPA real del año siguiente; 2025 ÷ nuestro BPA 2026e de 14,16): 2016 16,5x; 2017 14,0x; 2018 11,4x; 2021 13,6x; 2022 11,5x; 2023 14,1x; 2024 13,0x; 2025 17,3x. Fuera 2019 (141,14 ÷ BPA 2020 de 2,80 = 50x, COVID) y 2020 (BPA 2021 de 7,35 aún hundido por el COVID). Actual = 204,78 ÷ nuestro BPA 2027e de 15,45.',
        v2: { mediana_5a: 14.45, minimo_5a: 13.8, media_larga: 16.0, excluidos: 'Al cierre (precio ÷ BPA del mismo año): 2022 14,8x; 2023 13,8x; 2024 14,1x; 2025 17,7x; fuera 2020 (46x) y 2021 (18,7x con BPA hundido por el COVID). Media larga con 2016-2019 y 2022-2025.' },
      },
      comparables_per: { mediana: 15.6 },
      consenso: { bpa_ano1: 16.02, bpa_ano2: 18.76, objetivo_medio: 259.60, objetivo_min: null, objetivo_max: null, analistas: 15, tendencia_3m: null, fuente: 'MarketScreener, 14-oct-2026 [D2]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: 221.98,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
