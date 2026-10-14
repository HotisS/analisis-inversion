// Parte del analista (Alibaba, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CNY', divisa_cotizacion: 'USD', tipo_cambio: 6.70, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Baja' },
  valoracion: {
    // Caja e inversiones líquidas a 30-jun-2026 y deuda total (Stock Analysis) del mismo trimestre; la colocación de agosto
    // (≈68.600 M RMB netos) entra como caja (otros_ajustes negativo) porque las acciones ya la incluyen. Participadas por el
    // método de la participación (Ant Group, 33 %, y otras) a valor contable de marzo; los valores estratégicos no se suman
    // para no contar dos veces la tesorería a largo plazo que la empresa ya incluye en sus «inversiones líquidas».
    // Minoritarios: estimación (patrimonio total menos el de Stockopedia).
    puente: { fecha: '2026-06-30', deuda_financiera: 293165, arrendamientos: 0, caja: 474505, minoritarios: 65384, pensiones: 0, asociadas: 206803, otros_ajustes: -68600 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D16]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: 35.92, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: 49.44, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: 59.21, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      per_historico: { actual: 21.7, mediana_5a: 12.98, minimo_5a: 8.4, media_larga: 12.26, excluidos: T.excluidos ?? null },
      comparables_per: { mediana: 12.8 },
      consenso: { bpa_ano1: 39.6, bpa_ano2: 56.3, objetivo_medio: 1264.3, objetivo_min: 904.5, objetivo_max: 1507.5, analistas: 22, tendencia_3m: 'subidas', fuente: 'MarketBeat, Erste Group y TipRanks [D6, D7, D8, D20]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Baja' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
