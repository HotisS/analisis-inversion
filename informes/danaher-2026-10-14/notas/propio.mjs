// Parte del analista (Danaher, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Deuda y caja del 10-Q a 26-jun-2026, ya con Masimo [A5].
    puente: { fecha: '2026-06-26', deuda_financiera: 26558, arrendamientos: 0, caja: 4348, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth (dato del análisis de Thermo Fisher)' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 9.55, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 10.3, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 10.9, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { actual: 22.9, mediana_5a: 30.5, minimo_5a: 29.3, media_larga: 30.2, excluidos: 'BPA ajustado (sin amortización de intangibles), la misma base que los escenarios. Solo tres años limpios: 2023 30,5x (231,34/7,58); 2024 30,7x (229,55/7,48); 2025 29,3x (228,92/7,80) [D4, A2, A3, A7]. Excluidos 2020-2022 (BPA inflado por las pruebas de covid de Cepheid y Cytiva: 9,71 USD en 2022) y los años anteriores (precios y BPA afectados por las escisiones de Envista y Veralto; sin serie fiable en los extractos). Actual = 215,60 ÷ 9,40 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 23.3 },
      consenso: { bpa_ano1: 8.53, bpa_ano2: null, objetivo_medio: 230.89, objetivo_min: 200, objetivo_max: 265, analistas: 43, tendencia_3m: 'bajadas', fuente: 'VCP Scanner (2-jul-2026) e Investing.com (22-jul-2026) [D5, D6]; BPA 2026e = punto medio de la guía' },
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
