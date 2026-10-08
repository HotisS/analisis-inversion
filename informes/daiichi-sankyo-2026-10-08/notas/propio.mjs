// Parte del analista (Daiichi Sankyo, corte 2026-10-08). Citas con prefijo: [A3] = fuente 3 de A.json; [P1] = propia.
import { anios, wacc, terminal, casos, pesos } from './supuestos.mjs';
import { catalizadores } from './catalizadores.mjs';
import { preguntas } from './preguntas.mjs';
import { riesgos } from './riesgos.mjs';
import { textos } from './textos.mjs';

const T = textos;

export default {
  meta: {
    fecha_corte: '2026-10-08', divisa: 'JPY', divisa_cotizacion: 'JPY', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 3, etiqueta_ejercicio: 'inicio',
    normas_contables: 'NIIF (IFRS del IASB, adoptadas voluntariamente en Japón)',
    formato_cuenta: 'funcion',
    limitaciones: T.limitaciones,
    controles_explicados: T.controles_explicados,
  },
  identificacion: { indice_referencia: 'TOPIX (Nikkei 225 como contraste)', pais: 'Japón', pais_iso: 'JP', sector: 'Salud', industria: 'Productos farmacéuticos', sede: 'Chuo-ku, Tokio', fundacion: '2005', empleados: 20171, web: 'https://www.daiichisankyo.com' },
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
    lectura: T.dcf_lectura,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map(c => ({ ...c, narrativa: T.narrativas[c.escenario] })), comentario: T.escenarios_comentario, confianza: 'Media' },
  suma_partes: { aplica: false, descuento_holding_pct: 0, partes: [], comentario: T.suma_partes, confianza: 'Media' },
  valoracion: {
    puente: T.puente,
    rab: null,
    referencia_mercado: { mercado: 'S&P 500, prima implícita de Damodaran (T12m con payout sostenible), válida para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, fila de octubre de 2026, columna «ERP (T12m with sustainable payout)» [P1].' },
    pesos,
    comentario: T.valoracion_comentario,
    confianza: 'Media',
  },
  catalizadores,
  riesgos: riesgos(T.riesgos_valor),
  esg: T.esg,
  preguntas,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Country Default Spreads and Risk Premiums (ctryprem.xlsx), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
    { id: 3, titulo: 'Betas by Sector: Japan y Global (betaJapan.xls, betaGlobal.xls), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betaJapan.xls' },
    { id: 4, titulo: 'Históricos diarios de 4568.T, 1305.T (TOPIX), ^N225 (Nikkei 225), 1621.T (TOPIX-17 farmacéutico) e IXJ (salud mundial), hasta el 7-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://finance.yahoo.com/quote/4568.T/history' },
    { id: 5, titulo: 'ENHERTU demonstrated statistically significant PFS improvement in DESTINY-Lung04 (nota de prensa)', editor: 'Daiichi Sankyo', tipo: 'Primaria', fecha: '2026-08-17', url: 'https://www.daiichisankyo.com/files/news/pressrelease/pdf/202608/20260817_E.pdf' },
  ],
  huecos: T.huecos,
};
