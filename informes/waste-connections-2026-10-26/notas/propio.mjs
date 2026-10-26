// Parte del analista (Waste Connections, corte 2026-10-26, tras el 3T26). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const B = S.bpa12m;
export default {
  meta: {
    fecha_corte: '2026-10-26', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'Sí',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: las seis regiones hacen el mismo negocio integrado de residuos sólidos; E&P (7 % de los ingresos) se reporta dentro de las regiones y no tiene cifras propias de EBITDA.', confianza: 'Media' },
  valoracion: {
    // 30-sep-2026 [A11, A12]: deuda en balance 9.434,9 (incluye 13,7 de arrendamientos financieros); otros_ajustes = 79,6 de contraprestaciones
    // contingentes + 102,9 de recompras de octubre (las acciones del informe ya las descuentan).
    puente: { fecha: '2026-09-30', deuda_financiera: 9435, arrendamientos: 0, caja: 96, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 182.5 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D17]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: B.Bajista.bpa, multiplo: null, precio: null, justificacion: T.casos_12m?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: B.Base.bpa, multiplo: null, precio: null, justificacion: T.casos_12m?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: B.Alcista.bpa, multiplo: null, precio: null, justificacion: T.casos_12m?.Alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado', actual: Math.round((186.6 / B.base2027.bpa) * 10) / 10, mediana_5a: 31.6, minimo_5a: 30.8, media_larga: 32.0,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 35.6, minimo_5a: 34.1, media_larga: 35.5, excluidos: 'Ninguno: historia al cierre (precio ÷ BPA ajustado del mismo año), 2018-2025.' },
      },
      comparables_per: { mediana: 30.8 },
      consenso: { bpa_ano1: 6.17, bpa_ano2: 6.83, objetivo_medio: 206.32, objetivo_min: 170, objetivo_max: 225, analistas: 26, tendencia_3m: 'subidas', fuente: 'Yahoo Finance (BPA 2027 de 27 analistas y objetivos de 26, 26-oct) y TickFlow (BPA 2028, 5 analistas) [D5, D4]; contraste MarketBeat 202,39 (19) [D6]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  rentabilidad: { comentario: T.rentabilidad ?? null, confianza: 'Media' },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
