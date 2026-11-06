// Parte del analista (GigaCloud Technology, corte 2026-11-06). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-11-06', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'GigaCloud declara un solo segmento operativo y no publica resultado por línea de ingresos (servicios, producto en la plataforma y fuera de ella) [A1]. No aplica.', confianza: 'Media' },
  valoracion: {
    // Puente a 30-sep-2026 [D1]: caja 374,2 + inversiones a corto 43,0 = 417,3 M; arrendamientos financieros 1,2 M; otros ajustes 8,4 M
    // (3,4 M de pago contingente por New Classic + 5,0 M de recompras posteriores al balance). Los operativos (474,7 M) NO van (US GAAP).
    puente: { fecha: '2026-09-30', deuda_financiera: 0, arrendamientos: 1.2, caja: 417.3, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 8.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [D9]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'publicado',
      casos: T.casos12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 4.01, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 5.85, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 6.65, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'publicado',
        actual: 11.3, mediana_5a: 6.0, minimo_5a: 5.2, media_larga: 6.4,
        v2: { base: 'cierre', actual: 13.6, mediana_5a: 8.0, minimo_5a: 6.1, media_larga: 8.3 },
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 16.8 },
      consenso: { bpa_ano1: 4.70, bpa_ano2: 5.20, objetivo_medio: 61.33, objetivo_min: 53, objetivo_max: 73, analistas: 3, tendencia_3m: 'sin cambios', fuente: 'Zacks (BPA GAAP, 2 analistas, antes del 3T26), S&P Global vía Yahoo y MarketBeat (objetivos de Maxim, Roth y Lake Street) [D4, D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: R,
  rentabilidad: T.rentabilidad ?? null,
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
