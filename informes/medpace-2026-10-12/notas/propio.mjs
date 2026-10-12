// Parte del analista (Medpace, corte 2026-10-12). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, referencia_mercado, puente_ingresos, mercado_final } from './supuestos.mjs';
import { empresas, transacciones } from './comparables.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const fuentes = [
  { id: 1, titulo: 'Datos financieros y previsiones del consenso de IQVIA, ICON, Charles River, Fortrea, Thermo Fisher y Labcorp (EBITDA ajustado y BPA de los últimos y próximos 12 meses)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/IQVIA-HOLDINGS-INC-40331382/finances/' },
  { id: 2, titulo: 'Cotización, capitalización, deuda, caja y estimaciones de BPA de los comparables (IQV, ICLR, CRL, FTRE, TMO, LH)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://finance.yahoo.com/quote/IQV/analysis/' },
  { id: 3, titulo: 'Estadísticas de ICON, IQVIA, Charles River, Fortrea, Thermo Fisher y Labcorp (rentabilidad del capital invertido y por flujo libre)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/stocks/iclr/statistics/' },
  { id: 4, titulo: 'Análisis de inversión de ICON plc, corte 2026-10-09 (tabla de comparables y puente a 30-jun-2026)', editor: 'Informe interno del repositorio', tipo: 'Analistas', fecha: '2026-10-09', url: 'informes/icon-2026-10-09/ICON - 2026-10-09.pdf' },
  { id: 5, titulo: 'Cierres diarios del 8 y 9 de octubre de 2026 de IQV, ICLR, CRL, FTRE, TMO y LH', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/IQV/history/' },
  { id: 6, titulo: 'ICON Public Limited Company (ICLR): datos financieros y previsiones del consenso', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/ICON-PUBLIC-LIMITED-COMPA-12685103/finances/' },
  { id: 8, titulo: 'Thermo Fisher Scientific to Acquire Clario (nota de prensa, anexo 99.1 del 8-K)', editor: 'Thermo Fisher Scientific / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-29', url: 'https://www.sec.gov/Archives/edgar/data/97745/000009774525000156/thermofisherscientifictoac.htm' },
  { id: 9, titulo: 'Syneos Health: Definitive Proxy Statement (DEFM14A) de la fusión con Elliott, Patient Square y Veritas (incluye el análisis de operaciones de BofA Securities)', editor: 'Syneos Health / SEC EDGAR', tipo: 'Primaria', fecha: '2023-06-27', url: 'https://www.sec.gov/Archives/edgar/data/1610950/000119312523176268/d450417ddefm14a.htm' },
  { id: 10, titulo: 'PPD, Inc.: Definitive Information Statement (DEFM14C) de la fusión con Thermo Fisher', editor: 'PPD / SEC EDGAR', tipo: 'Primaria', fecha: '2021-05-25', url: 'https://www.sec.gov/Archives/edgar/data/1793294/000119312521172340/d238109ddefm14c.htm' },
  { id: 11, titulo: 'ICON to acquire PRA Health Sciences (comunicación 425)', editor: 'ICON plc / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-24', url: 'https://www.sec.gov/Archives/edgar/data/1060955/000114036121005941/nc10020781x7_425.htm' },
  ...(T.fuentes_extra ?? []),
];

export default {
  meta: {
    fecha_corte: '2026-10-12', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  ...(T.secciones ?? {}),
  comparables: { criterio: T.comparables_criterio ?? null, empresas, comentario: T.comparables_comentario ?? null, confianza: 'Media' },
  transacciones: { operaciones: transacciones, comentario: T.transacciones_comentario ?? null, confianza: 'Media' },
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: {
      puente_ingresos: puente_ingresos.map((p) => ({ ...p, comentario: T.puente_comentarios?.[p.periodo] ?? null })),
      mercado_final,
      veredicto: T.sost_veredicto ?? 'En parte',
      justificacion: T.sost_justificacion ?? null,
    },
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: 'Medpace tiene un único segmento (CRO clínica de servicio completo) y desglosa sus ingresos por área terapéutica, que comparten personal, márgenes y clientes: no hay negocios con perfiles distintos que valorar por separado [A1].', confianza: 'Alta' },
  valoracion: {
    referencia_mercado,
    pesos,
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  catalizadores: T.catalizadores ?? null,
  riesgos: T.riesgos ?? null,
  preguntas: T.preguntas ?? null,
  resumen: T.resumen ?? null,
  fuentes,
  huecos: T.huecos ?? [],
};
