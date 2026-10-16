// Parte del analista (Accton, corte 2026-10-16). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-16', divisa: 'TWD', divisa_cotizacion: 'TWD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF adoptadas en Taiwán (TIFRS)', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Accton publica un único segmento operativo; conmutadores y módulos aceleradores comparten fábricas, clientes y cadena de suministro, y no hay desglose de resultado por línea: una suma de partes no tendría cifras propias en que apoyarse.', confianza: 'Media' },
  valoracion: {
    // Puente: balance de jun-26 [A1]. Caja = efectivo 27.677 + inversiones a corto 13.140 + títulos negociables 2.590. Deuda financiera = préstamos a corto 3.430 + parte corriente del largo 480 + largo 2.280.
    // asociadas = inversiones financieras a largo plazo (2.693). otros_ajustes = dividendo de 15 TWD × 558,91 M acciones aprobado en junio y pagado en julio (8.384 M), que sigue en la caja de jun-26.
    puente: { fecha: '2026-06-30', deuda_financiera: 6190, arrendamientos: 3232, caja: 43407, minoritarios: 85, pensiones: 24, asociadas: 2693, otros_ajustes: 8384 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P2]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos12m ?? [],
      per_historico: T.per_historico ?? null,
      comparables_per: { mediana: 16.8 },
      consenso: { bpa_ano1: 86.24, bpa_ano2: 112.4, objetivo_medio: 3273.86, objetivo_min: 2380, objetivo_max: 3700, analistas: 14, tendencia_3m: 'estables', fuente: 'MarketScreener (14 analistas) y prensa taiwanesa [D1, D2, A7]' },
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
  esg: T.esg ?? null,
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
