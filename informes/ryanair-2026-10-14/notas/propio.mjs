// Parte del analista (Ryanair, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'naturaleza',
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
    confianza: 'Baja',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Baja' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Un solo negocio (transporte aéreo de corto radio con ingresos complementarios ligados al pasajero): no hay partes con perfiles distintos.', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 (1T FY27): caja bruta ≈2.800 M y caja neta ≈2.700 M tras devolver el último bono en mayo.
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 145, caja: 2800, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D27]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2029e', beneficio_por_accion: 1.51, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2029e', beneficio_por_accion: 2.05, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2029e', beneficio_por_accion: 2.33, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado',
        actual: 13.5, mediana_5a: 10.8, minimo_5a: 9.3, media_larga: 10.8,
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 7.3 },
      consenso: { bpa_ano1: 1.72, bpa_ano2: 1.98, objetivo_medio: 30.17, objetivo_min: 26.10, objetivo_max: 33.52, analistas: 6, tendencia_3m: 'recortes', fuente: 'Stock Analysis (S&P Global), Simply Wall St y Erste vía MarketBeat; objetivos en USD por ADR convertidos a euros por acción [D4, D5, D6, D9]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Baja',
  },
  resumen: R,
  rentabilidad: { comentario: T.rentabilidad_comentario ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
