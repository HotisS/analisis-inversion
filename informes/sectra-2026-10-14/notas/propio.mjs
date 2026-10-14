// Parte del analista (Sectra, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'SEK', divisa_cotizacion: 'SEK', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 4, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: [...(T.parches ?? [])],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  dcf: {
    anios: S.anios, wacc: S.wacc, terminal: S.terminal,
    etapa2: { ...S.etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Secure Communications es el 14 % de las ventas y no se pudo aislar su resultado; una suma de partes con un segmento sin beneficio publicado no añade información.', confianza: 'Baja' },
  valoracion: {
    // Balance de 30-abr-2026 (el del 1T no se pudo leer). Otros ajustes: dividendo de 2,30 SEK × 192,6 M acciones pagado en septiembre de 2026.
    puente: { fecha: '2026-04-30', deuda_financiera: 0, arrendamientos: 76.5, caja: 1810, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 443 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D22]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 3.54, multiplo: null, precio: null, justificacion: 'Ventas de 4.284 M en FY2028e (12 % y 8 % de crecimiento) y margen EBITDA del 22,5 %, el de FY2026 sin mejora: EBIT de 848 M, 20 M de intereses de la caja, impuesto del 21,5 % y 192,6 M de acciones. Es lo que pasaría si los pedidos de 2026 no se recuperan.' },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 4.43, multiplo: null, precio: null, justificacion: 'Ventas de 4.683 M (17 % y 13 %) y margen EBITDA del 25,5 %: EBIT de 1.068 M, 20 M de intereses de la caja, impuesto del 21,5 % y 192,6 M de acciones sin recompras. La nube madura y el margen recupera el nivel de antes de la transición.' },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 5.06, multiplo: null, precio: null, justificacion: 'Ventas de 4.930 M (20 % y 16 %, el ritmo del 1T) y margen del 27,5 %: EBIT de 1.223 M. El apalancamiento operativo del 1T (resultado +61 % con ventas +26 %) se mantiene dos años.' },
      ],
      per_historico: { actual: 82.5, mediana_5a: 90, minimo_5a: 60, media_larga: 95, excluidos: T.per_excluidos ?? null },
      comparables_per: { mediana: 41.9 },
      consenso: { bpa_ano1: 3.88, bpa_ano2: 4.48, objetivo_medio: 340, objetivo_min: 340, objetivo_max: 370, analistas: 3, tendencia_3m: 'subidas', fuente: 'MarketScreener, SEB y DNB Carnegie [D2, D4, D5]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.secciones?.catalizadores ?? null,
  riesgos: T.secciones?.riesgos ?? null,
  preguntas: T.secciones?.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
