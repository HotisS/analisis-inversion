// Parte del analista (Mettler-Toledo, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
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
    // Deuda a 30-jun-2026 del 10-Q [A11]; caja ≈61 M (CSIMarket, periodo ambiguo; en línea con los 59-70 M de cierre de 2023-2025).
    // Acciones (20,1 M) posteriores a la recompra del primer semestre: la caja ya refleja lo pagado hasta junio.
    puente: { fecha: '2026-06-30', deuda_financiera: 2112, arrendamientos: 0, caja: 61, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D14]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 49.9, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 54.8, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 57.9, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { actual: 31.1, mediana_5a: 32.3, minimo_5a: 29.8, media_larga: 32.7, excluidos: 'BPA ajustado, la misma base que los escenarios. Excluidos 2020 (44,3x: 1.139,68/25,72) y 2021 (49,9x: 1.697,21/34,01) por burbuja de múltiplos de la covid y tipos cero; 2018-2019 sin BPA ajustado en los extractos. Serie limpia: 2022 36,5x (1.445,45/39,65); 2023 31,9x (1.212,96/38,03); 2024 29,8x (1.223,68/41,11); 2025 32,6x (1.394,19/42,73) [D4, A2, A12, A13]. Solo cuatro años limpios: mediana 32,3x, mínimo 29,8x, media 32,7x. Actual = 1.595,25 ÷ 51,3 (nuestro BPA ajustado de 2027e).' },
      comparables_per: { mediana: 25.3 },
      consenso: { bpa_ano1: 46.5, bpa_ano2: 51.63, objetivo_medio: 1459.54, objetivo_min: null, objetivo_max: 1700, analistas: 13, tendencia_3m: 'subidas', fuente: 'MarketBeat (objetivo medio, octubre), Barchart (BPA 2027e) y TickFlow (BPA 2026e, agosto) [D3, D5, D6]' },
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
