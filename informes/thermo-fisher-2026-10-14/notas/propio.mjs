// Parte del analista (Thermo Fisher, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
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
    // Deuda y caja a 27-jun-2026 (Stock Analysis); la venta de microbiología (≈1.025 M netos de la nota del vendedor) se cobró en
    // agosto y resta deuda; los pagos aplazados de Clario (125 M en enero de 2027 y una estimación de 200 M de los hasta 400 M
    // variables) suman.
    puente: { fecha: '2026-06-27', deuda_financiera: 42549, arrendamientos: 0, caja: 4064, minoritarios: 100, pensiones: 0, asociadas: 0, otros_ajustes: -700 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D14]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 26.5, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 28.85, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 30.36, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { actual: 24.9, mediana_5a: 24.6, minimo_5a: 23.7, media_larga: 25.2, excluidos: 'Se usa el BPA ajustado (sin amortización de intangibles de compras ni reestructuración), la misma base que los escenarios. Excluidos 2020 y 2021: BPA inflado por las pruebas de covid (19,88 y 25,13 USD; PER de 23,4x y 26,6x). Serie limpia: 2018 23,6x (223,79/9,49); 2019 30,4x (324,87/10,69); 2022 23,7x (550,69/23,24); 2023 24,6x (530,79/21,55); 2024 23,8x (520,23/21,86); 2025 25,3x (579,45/22,87) [D5, D6, A2]. Cinco años limpios: 2019 y 2022-2025. Actual = 663,04 ÷ 26,65 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 23.3 },
      consenso: { bpa_ano1: 25.12, bpa_ano2: 27.43, objetivo_medio: 635.08, objetivo_min: null, objetivo_max: 750, analistas: 26, tendencia_3m: 'subidas', fuente: 'Barchart y Erste Group vía MarketBeat, 1-ago-2026 [D2, D3]' },
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
