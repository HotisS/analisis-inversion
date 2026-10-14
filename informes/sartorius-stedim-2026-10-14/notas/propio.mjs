// Parte del analista (Sartorius Stedim Biotech, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'EUR', divisa_cotizacion: 'EUR', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF-UE', formato_cuenta: 'funcion',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: Sartorius Stedim Biotech tiene un solo segmento (Biopharm) y consumibles y equipos comparten clientes, fábricas y fuerza de ventas; la empresa no publica el resultado de cada línea.', confianza: 'Media' },
  valoracion: {
    // Puente al 30-jun-2026 [A3]: préstamos 1.941,7 + 289,9; arrendamientos 146,1 + 24,9; caja 203,9; minoritarios contables 10,0;
    // pensiones 33,2 × (1 − 26 %); otros ajustes = factoring sin recurso 307,8 (dic-25) + compensación de aranceles a clientes ≈23.
    puente: { fecha: '2026-06-30', deuda_financiera: 2231.6, arrendamientos: 171.0, caja: 203.9, minoritarios: 10.0, pensiones: 24.6, asociadas: 0, otros_ajustes: 330.8 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D6]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: T.casos_12m ?? [],
      per_historico: {
        base: 'adelantado', actual: 38.6, mediana_5a: 35.5, minimo_5a: 25.3, media_larga: 35.5, excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 47.7, minimo_5a: 36.7, media_larga: 45.4, excluidos: T.per_excluidos_v2 ?? null },
      },
      comparables_per: { mediana: 26.3 },
      consenso: { bpa_ano1: 3.90, bpa_ano2: 5.06, objetivo_medio: 237.29, objetivo_min: 208, objetivo_max: 262, analistas: 14, tendencia_3m: 'subidas', fuente: 'MarketScreener (BPA publicado, no subyacente; 14 analistas) y Simply Wall St tras el 1S26 (rango 208-262) [D2, D3]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      media: null,
      comentario: T.objetivo_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: { ...(T.resumen ?? {}), confianza: 'Media' },
  fuentes: T.fuentes ?? [],
};
