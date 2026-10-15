// Parte del analista (Tetra Tech, corte 2026-10-15). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 9, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
      veredicto: T.veredicto ?? 'En parte',
      justificacion: T.sostenibilidad_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los dos segmentos (GSG y CIG) comparten marca, plantilla técnica y clientes de agua y medio ambiente, y no hay comparables puros que den múltiplos distintos con fiabilidad (los dos son consultoría de ingeniería).', confianza: 'Media' },
  valoracion: {
    // Balance a 28-jun-2026 [A2, A3]. Deuda: 801 M a largo (575 M de convertibles al 2,25 % con vencimiento en ago-2028 y 235 M del banco) + ≈9 M de arrendamientos financieros y deuda corriente.
    // Arrendamientos operativos (US GAAP) fuera: ya están en el EBITDA. otros_ajustes: −114 M de pagos aplazados por compras (earn-outs: 43,6 corrientes + 70,2 no corrientes).
    // Convertibles a valor contable: conversión a 39,31 USD con cobertura hasta 51,89 (por encima del precio: sin dilución hoy).
    puente: { fecha: '2026-06-28', deuda_financiera: 810, arrendamientos: 0, caja: 230.8, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -114 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D16]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 19.1, mediana_5a: 24.1, minimo_5a: 18.7, media_larga: 25.5,
        excluidos: T.per_excluidos ?? null,
        v2: { base: 'cierre', actual: 21.3, mediana_5a: 28.6, minimo_5a: 20.9, media_larga: 29.2, excluidos: T.per_v2 ?? null },
      },
      comparables_per: { mediana: 13.9 },
      consenso: { bpa_ano1: 1.73, bpa_ano2: 1.88, objetivo_medio: 40.33, objetivo_min: 36.0, objetivo_max: 46.0, analistas: 8, tendencia_3m: 'a la baja', fuente: 'MarketScreener: BPA ajustado de FY2027 y FY2028 y objetivos de 8 analistas [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: [...(T.fuentes ?? [])],
};
