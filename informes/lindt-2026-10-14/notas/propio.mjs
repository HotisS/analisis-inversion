// Parte del analista (Lindt & Sprüngli, corte 2026-10-14). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import S from './supuestos.mjs';

let T = {};
try { T = (await import('./textos.mjs')).default; } catch (e) { console.error('textos.mjs:', e.message); T = {}; }

export default {
  meta: {
    fecha_corte: '2026-10-14', divisa: 'CHF', divisa_cotizacion: 'CHF', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'NIIF', formato_cuenta: 'naturaleza',
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
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'No aplica: los tres segmentos geográficos venden los mismos productos con las mismas marcas y fábricas compartidas; no hay negocios con perfiles distintos que valorar por separado.', confianza: 'Alta' },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1301.1, arrendamientos: 545.1, caja: 410.7, minoritarios: 0, pensiones: 70, asociadas: 0, otros_ajustes: 116.4 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, T12m with sustainable payout; vale para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [P2]' },
    pesos: S.pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: S.bpa12m[e], multiplo: null, precio: null, justificacion: T.casos_12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', actual: 23.2, mediana_5a: 36.8, minimo_5a: 32.1, media_larga: 39.4,
        excluidos: T.per_excluidos ?? null,
        v2: { mediana_5a: 36.6, minimo_5a: 34.5, media_larga: 41.4, excluidos: 'Historia al cierre (cotización de cierre ÷ BPA del mismo año, PER del informe anual por certificado): 2021 61,6x; 2022 39,0x; 2023 34,9x; 2024 34,5x; 2025 36,6x. Sin 2020 (beneficio hundido por la pandemia).' },
      },
      comparables_per: { mediana: 17.2 },
      consenso: { bpa_ano1: 316.7, bpa_ano2: 339.7, objetivo_medio: 9628, objetivo_min: 7226, objetivo_max: 12500, analistas: 17, tendencia_3m: 'recortes', fuente: 'MarketScreener, estimaciones y consenso por nominativa ÷ 10 [D2, D3]' },
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
  fuentes: [
    { id: 1, titulo: 'Ficha sectorial «Chocolate y confitería prémium» (sectores/chocolate-2026-10-14.md)', editor: 'Elaboración propia', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/chocolate-2026-10-14.md' },
    { id: 2, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 3, titulo: 'Swiss Bond Yield at One-Week High: bono de la Confederación a 10 años al 0,54 % (8-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://tradingeconomics.com/switzerland/government-bond-yield/news/590510' },
    { id: 4, titulo: 'Cocoa futures (CC=F): cierre de 5.746 USD/t el 14-oct-2026; máximo mensual de 11.882 en ene-2025 y mínimo de 2.992 en abr-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CC%3DF/history/' },
  ],
};
