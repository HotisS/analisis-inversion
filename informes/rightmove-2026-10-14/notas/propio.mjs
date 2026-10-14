// Parte del analista (Rightmove, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import * as S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'GBP', divisa_cotizacion: 'GBP', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en el Reino Unido', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal, etapa2: { ...S.etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: S.puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final: null,
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: un solo negocio (portal inmobiliario británico); las áreas de crecimiento facturaron 29,1 M en 2025, el 7 % de los ingresos [A2].', confianza: 'Alta' },
  valoracion: {
    // Puente a 31-dic-2025 (último balance completo) con las acciones del 14-sep-2026 (732,5 M). otros_ajustes = caja consumida
    // desde el cierre hasta mediados de septiembre: recompras ≈ 122 M (≈ 28 M de acciones a ≈ 4,4 GBP), dividendos ≈ 80 M (final de 6,59 p
    // e intermedio de 4,17 p) menos ≈ 178 M de caja libre de nueve meses (estimación propia) = ≈ 24 M.
    puente: { fecha: '2025-12-31', deuda_financiera: 0, arrendamientos: 0, caja: 42.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 24 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D11]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 0.321, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 0.382, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 0.399, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { actual: 14.2, mediana_5a: 23.5, minimo_5a: 18.5, media_larga: 26.6, excluidos: '2020: BPA hundido por los descuentos de la pandemia (PER 51,8x). BPA básico publicado, la misma base (pagos en acciones dentro) que los escenarios. 2019 32,3x; 2021 37,3x; 2022 21,8x; 2023 23,5x; 2024 26,3x; 2025 18,5x [D7, A9]. Actual = 4,889 ÷ 0,345 (nuestro BPA de 2027e).' },
      comparables_per: { mediana: 15.1 },
      consenso: { bpa_ano1: 0.302, bpa_ano2: null, objetivo_medio: 5.95, objetivo_min: 4.29, objetivo_max: 6.65, analistas: 8, tendencia_3m: 'recortes', fuente: 'MarketBeat [D4, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
