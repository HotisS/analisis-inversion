// Parte del analista (Olympus, corte 2026-10-09). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { textos as T } from './textos.mjs';

export default {
  meta: {
    fecha_corte: '2026-10-09', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'fin',
    normas_contables: 'NIIF (IFRS del IASB, adoptadas voluntariamente en Japón)',
    formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  identificacion: { indice_referencia: 'TOPIX (Nikkei 225 como contraste)', pais: 'Japón', pais_iso: 'JP', sector: 'Salud', industria: 'Equipos y suministros médicos', sede: 'Hachioji y Shinjuku-ku, Tokio', proximos_resultados: '2026-11-10' },
  resumen: T.resumen,
  rentabilidad: T.rentabilidad,
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: T.etapa2 },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes, confianza: 'Media' },
  valoracion: {
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible), válida para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, fila de octubre de 2026, columna «ERP (T12m with sustainable payout)» [P1].' },
    pesos,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores,
  riesgos: T.riesgos,
  preguntas: T.preguntas,
  ...(T.extra || {}),
  _parches: T.parches || [],
  huecos_resueltos: T.huecos_resueltos || [],
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Country Default Spreads and Risk Premiums (ctryprem.xlsx), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
    { id: 3, titulo: 'Betas by Sector: Japan y Global (betaJapan.xls, betaGlobal.xls), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-07', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaJapan.xls' },
    { id: 4, titulo: 'Históricos diarios de 7733.T frente a 1305.T (TOPIX), ^N225 (Nikkei 225), IHI (tecnología médica de EE. UU.) e IXJ (salud mundial), hasta el 9-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/7733.T/history' },
  ],
  huecos: T.huecos || [],
};
