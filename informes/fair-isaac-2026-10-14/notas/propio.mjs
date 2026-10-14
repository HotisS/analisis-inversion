// Parte del analista (FICO, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia 1.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica en este análisis: Scores y Software tienen perfiles distintos, pero no se pudo leer el resultado de cada segmento del FY2025 (el 10-K no abre en este entorno) y Scores es más del 80 % del beneficio.', confianza: 'Baja' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 5610, arrendamientos: 0, caja: 248.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -300 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D12]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 24.9, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 34.95, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 40.5, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { actual: 22.6, mediana_5a: 63.7, minimo_5a: 42.2, media_larga: 59.7, excluidos: 'FY2021 (BPA inflado por la plusvalía de la venta de líneas de producto) y FY2024 (97 veces, burbuja de la acción). PER = cierre de diciembre ÷ BPA GAAP del ejercicio a septiembre: FY2019 59,1x; FY2020 64,7x; FY2022 42,2x; FY2023 68,8x; FY2025 63,7x [D9, A10, A14]. Actual = 728,80 USD ÷ 32,3 USD (nuestro BPA del FY2027e).' },
      comparables_per: { mediana: 20.9 },
      consenso: { bpa_ano1: 37.37, bpa_ano2: 42.15, objetivo_medio: 1081.25, objetivo_min: 700, objetivo_max: 1525, analistas: 4, tendencia_3m: 'recortes', fuente: 'Barchart (BPA, ago-2026); BofA, Wells Fargo, BMO y RBC (objetivos, 1-12 oct-2026) [D8, D4, D5, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: T.resumen ?? null,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
