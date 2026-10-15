// Parte del analista (Broadridge, corte 2026-10-15). Citas con la letra de la nota: [A2] = fuente 2 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-15', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 6, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: ICS y GTO comparten clientes (bancos y brókeres) y la tesis depende del conjunto; GTO es el 26 % de los ingresos y el 21 % del beneficio de los segmentos, sin comparables puros que den un múltiplo distinto con fiabilidad.', confianza: 'Media' },
  valoracion: {
    // Balance a 30-jun-2026 [A1]. Deuda a valor contable (principal 3.274,7 M). Arrendamientos operativos (US GAAP) fuera: ya están en el EBITDA.
    // otros_ajustes: −168 M = monedas Canton (216,1 M a valor razonable, 189,9 M bloqueadas) netas del impuesto al 22,2 %: activo financiero que suma valor.
    puente: { fecha: '2026-06-30', deuda_financiera: 3254.6, arrendamientos: 0, caja: 402.9, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: -168 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D7]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER FY2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 18.1, mediana_5a: 27.7, minimo_5a: 14.7, media_larga: 28.3,
        excluidos: T.per_excluidos ?? null,
        v2: { base: 'cierre', actual: 18.1, mediana_5a: 31.3, minimo_5a: 17.0, media_larga: 31.3, excluidos: 'Historia al cierre (precio de cierre de junio ÷ BPA normalizado del mismo ejercicio): FY2019 31,4x; FY2020 32,7x; FY2021 38,8x; FY2022 31,3x; FY2023 31,3x; FY2024 33,6x; FY2025 34,2x; FY2026 17,0x. Sin exclusiones.' },
      },
      comparables_per: { mediana: 16.5 },
      consenso: { bpa_ano1: 10.55, bpa_ano2: null, objetivo_medio: 216.0, objetivo_min: 176.0, objetivo_max: 257.0, analistas: 8, tendencia_3m: 'estables', fuente: 'BPA ajustado FY2027 de S&P Global (9 analistas) vía Stock Analysis; objetivos de MarketBeat (8 analistas) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: [...(T.fuentes ?? [])],
};
