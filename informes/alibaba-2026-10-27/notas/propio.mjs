// Parte del analista (Alibaba, corte 2026-10-27). Citas con la letra de la nota: [A3] = fuente 3 de A.json.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-27', divisa: 'CNY', divisa_cotizacion: 'USD', tipo_cambio: 6.6681, unidades: 'millones',
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
    confianza: 'Media',
  },
  escenarios: { casos: S.casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes_comentario ?? null, confianza: 'Media' },
  valoracion: {
    // Puente de la nota D (balance del 30-jun-2026): caja y tesorería líquida que publica la empresa, deuda con convertibles y
    // canjeables, participadas y valores estratégicos a valor contable (Ant Group incluido), minoritarios y colocación de agosto.
    puente: { fecha: '2026-06-30', deuda_financiera: 266530, arrendamientos: 0, caja: 474505, minoritarios: 57272, pensiones: 0, asociadas: 457417, otros_ajustes: -60233 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (Damodaran, prima implícita con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [D19]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: 'FY2029e',
      base_bpa: 'ajustado',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: S.bpa.Bajista, multiplo: null, precio: null, justificacion: T.j12?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: S.bpa.Base, multiplo: null, precio: null, justificacion: T.j12?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: S.bpa.Alcista, multiplo: null, precio: null, justificacion: T.j12?.Alcista ?? null },
      ],
      // Historia adelantada en BPA no GAAP diluido por ADS (precio de cierre de marzo ÷ BPA no GAAP del ejercicio siguiente) [D, A]:
      // FY2018 30,1 · FY2019 23,1 · FY2020 21,1 · FY2021 28,2 · FY2022 12,6 · FY2023 11,3 · FY2024 8,0 · FY2025 35,8 (excluido)
      // · FY2026 21,3 (865,42 ÷ nuestro FY2027e 40,7). Mediana de 5 años (FY2022-26 sin FY2025) 11,95; media larga 19,5.
      // v2 al lado (al cierre: precio de marzo ÷ BPA no GAAP del mismo año): FY2019 31,9 · FY2020 26,0 · FY2021 22,8 · FY2022 13,1
      // · FY2023 12,9 · FY2024 8,4 · FY2025 14,7 · FY2026 32,3 (excluido, BPA hundido). Mediana FY2022-25 13,0; mínimo 8,4; media 18,5.
      per_historico: { base: 'adelantado', base_bpa: 'ajustado', actual: 16.4, mediana_5a: 11.95, minimo_5a: 8.0, media_larga: 19.5, excluidos: T.excluidos ?? null,
        v2: { mediana_5a: 13.0, minimo_5a: 8.4, media_larga: 18.5 } },
      comparables_per: { mediana: 13.3 },
      consenso: { bpa_ano1: 44.45, bpa_ano2: 62.05, objetivo_medio: 1242, objetivo_min: 639.9, objetivo_max: 1601.2, analistas: 41, tendencia_3m: 'estables', fuente: 'Yahoo Finance, earningsTrend y financialData a 27-oct-2026; BPA no GAAP por ADS en RMB [D2, D4]' },
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
  fuentes: T.fuentes ?? [],
  huecos: T.huecos ?? [],
};
