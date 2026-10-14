// Parte del analista (Veeva Systems, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 1, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // 10-Q a 31-jul-2026: efectivo 1.812,0 M + inversiones a corto 5.430,9 M; sin deuda financiera.
    // US GAAP: arrendamientos operativos dentro del EBITDA, fuera del puente.
    puente: { fecha: '2026-07-31', deuda_financiera: 0, arrendamientos: 0, caja: 7242.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D10]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER FY2029e', beneficio_por_accion: 6.95, multiplo: null, precio: null, justificacion: T.oc_bajista ?? null },
        { escenario: 'Base', metrica: 'PER FY2029e', beneficio_por_accion: 8.33, multiplo: null, precio: null, justificacion: T.oc_base ?? null },
        { escenario: 'Alcista', metrica: 'PER FY2029e', beneficio_por_accion: 9.03, multiplo: null, precio: null, justificacion: T.oc_alcista ?? null },
      ],
      per_historico: {
        base: 'adelantado',
        actual: 40.3, mediana_5a: 45.5, minimo_5a: 36.2, media_larga: 48.4,
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 24.6 },
      consenso: { bpa_ano1: 9.21, bpa_ano2: 10.25, objetivo_medio: 290.5, objetivo_min: 250, objetivo_max: 325, analistas: 18, tendencia_3m: 'subidas', fuente: 'Guía de la empresa y Yahoo Finance (BPA no GAAP); objetivos de ocho bancos tras el 2T27 [D5, D7, D8, D14]' },
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
