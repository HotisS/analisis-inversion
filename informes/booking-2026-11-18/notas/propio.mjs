// Parte del analista (Booking Holdings, corte 2026-11-18). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-11-18', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Booking informa un solo segmento: sus marcas (Booking.com, Priceline, Agoda, KAYAK, OpenTable) comparten el modelo de comisión y no publican beneficio por separado [A1]. No aplica.', confianza: 'Media' },
  valoracion: {
    // Balance del 30-sep-2026 [D1]: bonos 20.061 M contables (1.987 a corto, 18.074 a largo), caja 15.814 M, inversiones a largo 435 M.
    // otros_ajustes = 1.180 (exceso estacional de reservas cobradas por adelantado: 6.450 M en septiembre frente a 5.270 M en diciembre)
    // + 1.000 (FTC provisionada y sin pagar) + 469 (multa de la CNMC provisionada) + ≈ 360 (recompras del 30-sep al 26-oct, fecha de las acciones).
    puente: { fecha: '2026-09-30', deuda_financiera: 20061, arrendamientos: 0, caja: 15814, minoritarios: 0, pensiones: 0, asociadas: 435, otros_ajustes: 3009 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx [D13]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'ajustado',
      casos: T.casos12m ?? [
        { escenario: 'Bajista', metrica: 'PER 2028e', beneficio_por_accion: 10.60, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Base', metrica: 'PER 2028e', beneficio_por_accion: 12.40, multiplo: null, precio: null, justificacion: null },
        { escenario: 'Alcista', metrica: 'PER 2028e', beneficio_por_accion: 12.94, multiplo: null, precio: null, justificacion: null },
      ],
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado',
        actual: 13.5, mediana_5a: 20.7, minimo_5a: 13.2, media_larga: 19.2,
        v2: { base: 'cierre', actual: 13.5, mediana_5a: 23.3, minimo_5a: 20.0, media_larga: 22.1 },
        excluidos: T.per_excluidos ?? null,
      },
      comparables_per: { mediana: 16.0 },
      consenso: { bpa_ano1: 10.42, bpa_ano2: 12.23, objetivo_medio: 215.53, objetivo_min: 150, objetivo_max: 267, analistas: 36, tendencia_3m: 'recortes', fuente: 'Yahoo Finance (18-nov-2026) y Stock Analysis/S&P Global (13-nov); objetivos recortados casi todos el 4-nov tras la guía del 4T [D4, D5]' },
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
