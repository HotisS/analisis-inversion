// Parte del analista (MSCI, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

const casos12 = ['Bajista', 'Base', 'Alcista'].map((e) => ({
  escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa_12m[e], multiplo: null, precio: null, justificacion: T.just_12m?.[e] ?? null,
}));

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
  escenarios: { casos: S.casos.map((c) => ({ ...c, perfil: c.perfil ?? [], narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica en el valor objetivo: Index aporta el 74 % del EBITDA de segmentos y las otras tres unidades comparten clientes, datos y plataforma. Como contraste, Index a 22 veces su EBITDA ajustado de 2025 (1.366 M) ya vale ≈ 30.000 M, el 64 % del valor empresa [A1].', confianza: 'Media' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 6425, arrendamientos: 0, caja: 356.4, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 153.9 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: casos12,
      per_historico: { ...S.per_historico, excluidos: T.per_excluidos ?? null, v2: { ...S.per_historico_v2, excluidos: T.per_excluidos_v2 ?? null } },
      comparables_per: S.comparables_per,
      consenso: { bpa_ano1: 19.69, bpa_ano2: 22.43, objetivo_medio: 677.65, objetivo_min: 570, objetivo_max: 755, analistas: 18, tendencia_3m: 'recortes', fuente: 'Stock Analysis (BPA ajustado 2026e y 2027e, objetivos de 18 analistas); recortes tras el 2T26 según Barchart [D3, D4]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: T.media_12m ?? null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? T.secciones?.resumen ?? {}), confianza: 'Media' },
  fuentes: [],
};
