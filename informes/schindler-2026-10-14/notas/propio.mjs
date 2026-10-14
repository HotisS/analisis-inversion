// Parte del analista (Schindler, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }
let R = null;
try { R = (await import('./resumen.mjs')).default; } catch (e) { console.error('resumen.mjs:', e.message); R = null; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'funcion',
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
    // Balance de junio de 2026 (Stock Analysis): caja 1.893 + inversiones a corto 1.810; deuda 717 con arrendamientos [A].
    // Minoritarios a valor de mercado estimado: ≈58 M de beneficio × 12 = 700 M (estimación propia; sin valor contable).
    puente: { fecha: '2026-06-30', deuda_financiera: 717, arrendamientos: 0, caja: 3703, minoritarios: 700, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth [P1]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: [
        { escenario: 'Bajista', metrica: 'PER', beneficio_por_accion: T.bpa?.Bajista ?? 10.5, multiplo: null, precio: null, justificacion: T.oj?.Bajista ?? null },
        { escenario: 'Base', metrica: 'PER', beneficio_por_accion: T.bpa?.Base ?? 11.67, multiplo: null, precio: null, justificacion: T.oj?.Base ?? null },
        { escenario: 'Alcista', metrica: 'PER', beneficio_por_accion: T.bpa?.Alcista ?? 12.3, multiplo: null, precio: null, justificacion: T.oj?.Alcista ?? null },
      ],
      per_historico: { base: 'adelantado', actual: T.per_actual ?? 23.8, mediana_5a: 24.2, minimo_5a: 21.6, media_larga: 26.5, excluidos: T.excluidos ?? null },
      comparables_per: { mediana: 19.5 },
      consenso: { bpa_ano1: 10.03, bpa_ano2: 10.99, objetivo_medio: 298.0, objetivo_min: 233.0, objetivo_max: 333.0, analistas: 24, tendencia_3m: 'recortes', fuente: 'aktien.guide, cash.ch, MarketScreener y Goldman Sachs [P10, P11, D2, P12]' },
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
  esg: T.esg ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026 (4,20 %)', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Bono de la Confederación a 10 años (0,54 % el 8-oct-2026), tomado del informe de Roche del 14-oct-2026 de este repositorio', editor: 'Repositorio analisis-inversion (SNB)', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'informes/roche-2026-10-14/datos.json' },
    { id: 3, titulo: 'Análisis value de KONE (14-oct-2026): PER adelantado, DCF y revisión a 12 meses', editor: 'Repositorio analisis-inversion', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/kone-2026-10-14/revision-12m-2026-10-14.md' },
    ...(T.fuentes ?? []),
  ],
  huecos: T.huecos ?? [],
};
