// Parte del analista (Daiichi Sankyo, corte 2026-11-09, tras el 2T FY2026). Citas con prefijo: [A20] = fuente 20 de A.json; [P1] = propia.
// Iteración del informe del 8-oct-2026 (carpeta daiichi-sankyo-2026-10-08, v5): mismos textos de fondo, puestos al día.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { catalizadores } from './catalizadores.mjs';
import { preguntas } from './preguntas.mjs';
import { riesgos } from './riesgos.mjs';
import { textos } from './textos.mjs';

const T = textos;

export default {
  meta: {
    fecha_corte: '2026-11-09', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'inicio',
    normas_contables: 'NIIF (IFRS del IASB, adoptadas voluntariamente en Japón)',
    formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  identificacion: { indice_referencia: 'TOPIX (Nikkei 225 como contraste)', pais: 'Japón', pais_iso: 'JP', sector: 'Salud', industria: 'Productos farmacéuticos', sede: 'Chuo-ku, Tokio', fundacion: '2005', empleados: 20171, web: 'https://www.daiichisankyo.com', simbolo_yahoo: '4568.T' },
  resumen: T.resumen,
  sector: T.sector,
  competencia: T.competencia,
  financieros: T.financieros,
  trimestres: T.trimestres,
  balance: T.balance,
  flujos: T.flujos,
  calidad: T.calidad,
  rentabilidad: T.rentabilidad,
  capital: T.capital,
  directivos: T.directivos,
  gobierno: T.gobierno,
  consenso: T.consenso,
  bolsa: T.bolsa,
  multiplos_historicos: T.multiplos_historicos,
  comparables: T.comparables,
  transacciones: T.transacciones,
  dcf: {
    anios, wacc, terminal,
    etapa2: { usar: false, anios: 10, margen_final_pct: null, justificacion: T.etapa2 },
    mitad_de_anio: true,
    justificacion: T.dcf_justificacion,
    sostenibilidad: T.sostenibilidad,
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map(c => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes, confianza: 'Media' },
  valoracion: {
    puente: T.puente,
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible), válida para mercados desarrollados', prima_implicita_pct: 4.41, fecha: '2026-11', fuente: 'Damodaran, ERPbymonth.xlsx, fila de noviembre de 2026, columna «ERP (T12m with sustainable payout)» [P1].' },
    pesos,
    objetivo_12m: T.objetivo_12m,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores,
  riesgos: { ...riesgos(T.riesgos_valor), ia: T.ia },
  esg: T.esg,
  preguntas,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de noviembre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-11-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Country Default Spreads and Risk Premiums (ctryprem.xlsx), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
    { id: 3, titulo: 'Betas by Sector: Japan y Global (betaJapan.xls, betaGlobal.xls), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaJapan.xls' },
    { id: 4, titulo: 'Históricos diarios de 4568.T, 1305.T (TOPIX), ^N225, 1621.T e IXJ (betas del informe del 8-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://finance.yahoo.com/quote/4568.T/history' },
    { id: 5, titulo: 'ENHERTU demonstrated statistically significant PFS improvement in DESTINY-Lung04 (nota de prensa)', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-08-17', url: 'https://www.daiichisankyo.com/files/news/pressrelease/pdf/202608/20260817_E.pdf' },
    { id: 6, titulo: '第一三共---大幅反落、アストラゼネカのESMOイベントを受けて', editor: 'Kabutan (Fisco)', tipo: 'Prensa', fecha: '2026-10-27', url: 'https://kabutan.jp/stock/news?code=4568&b=n202610270717' },
    { id: 7, titulo: '第一三共が急落、米ブリストル・マイヤーズとシスティミューンによる治験結果を嫌気', editor: 'Kabutan (Minkabu Press)', tipo: 'Prensa', fecha: '2026-10-27', url: 'https://kabutan.jp/stock/news?code=4568&b=n202610270485' },
    { id: 8, titulo: '日経平均が暴落、3,643円安は歴代3位（2026年11月6日）', editor: 'kabu.tagu-blog', tipo: 'Prensa', fecha: '2026-11-06', url: 'https://kabu.tagu-blog.com/nikkei-crash-3643-yen-2026-11-06/' },
    { id: 9, titulo: 'FY2026 Q1 Financial Results Presentation (calendario de AVANZAR: «CY2026 H2»)', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-07-31', url: 'https://www.daiichisankyo.com/files/investors/library/quarterly_result/2026/FY2026Q1_Financial_Results_Presentation_E.pdf' },
    { id: 10, titulo: 'Daiichi Sankyo (DSNKY) shares gap up on earnings beat', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://www.marketbeat.com/instant-alerts/price-daiichi-sankyo-otcmkts-dsnky-shares-gap-up-on-earnings-beat-2026-11-02/' },
    { id: 11, titulo: 'Daiichi stops internal development of next-wave ADC as key Datroway readout delayed again', editor: 'Fierce Biotech', tipo: 'Prensa', fecha: '2026-01-30', url: 'https://www.fiercebiotech.com/biotech/daiichi-stops-internal-development-next-wave-adc-key-datroway-readout-delayed-again' },
  ],
  huecos: T.huecos,
};
