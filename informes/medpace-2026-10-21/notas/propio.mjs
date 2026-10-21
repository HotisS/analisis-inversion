// Parte del analista (Medpace, corte 2026-10-21). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { anios, wacc, terminal, etapa2, casos, pesos, referencia_mercado, puente_ingresos, mercado_final, bpa } from './supuestos.mjs';
const PRECIO = 662.48;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;
const r1 = (x) => Math.round(x * 10) / 10;
import { empresas, transacciones } from './comparables.mjs';

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const fuentes = [
  { id: 1, titulo: 'Datos financieros y previsiones del consenso de IQVIA, ICON, Charles River, Fortrea, Thermo Fisher y Labcorp (EBITDA ajustado y BPA de los últimos y próximos 12 meses)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/IQVIA-HOLDINGS-INC-40331382/finances/' },
  { id: 2, titulo: 'Cotización, capitalización, deuda, caja y estimaciones de BPA de los comparables (IQV, ICLR, CRL, FTRE, TMO, LH)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://finance.yahoo.com/quote/IQV/analysis/' },
  { id: 3, titulo: 'Estadísticas de ICON, IQVIA, Charles River, Fortrea, Thermo Fisher y Labcorp (rentabilidad del capital invertido y por flujo libre)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/stocks/iclr/statistics/' },
  { id: 4, titulo: 'Análisis de inversión de ICON plc, corte 2026-10-09 (tabla de comparables y puente a 30-jun-2026)', editor: 'Informe interno del repositorio', tipo: 'Analistas', fecha: '2026-10-09', url: 'informes/icon-2026-10-09/ICON - 2026-10-09.pdf' },
  { id: 5, titulo: 'Cierres diarios del 8 y 21 de octubre de 2026 de IQV, ICLR, CRL, FTRE, TMO y LH', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://finance.yahoo.com/quote/IQV/history/' },
  { id: 6, titulo: 'ICON Public Limited Company (ICLR): datos financieros y previsiones del consenso', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://www.marketscreener.com/quote/stock/ICON-PUBLIC-LIMITED-COMPA-12685103/finances/' },
  { id: 8, titulo: 'Thermo Fisher Scientific to Acquire Clario (nota de prensa, anexo 99.1 del 8-K)', editor: 'Thermo Fisher Scientific / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-29', url: 'https://www.sec.gov/Archives/edgar/data/97745/000009774525000156/thermofisherscientifictoac.htm' },
  { id: 9, titulo: 'Syneos Health: Definitive Proxy Statement (DEFM14A) de la fusión con Elliott, Patient Square y Veritas (incluye el análisis de operaciones de BofA Securities)', editor: 'Syneos Health / SEC EDGAR', tipo: 'Primaria', fecha: '2023-06-27', url: 'https://www.sec.gov/Archives/edgar/data/1610950/000119312523176268/d450417ddefm14a.htm' },
  { id: 10, titulo: 'PPD, Inc.: Definitive Information Statement (DEFM14C) de la fusión con Thermo Fisher', editor: 'PPD / SEC EDGAR', tipo: 'Primaria', fecha: '2021-05-25', url: 'https://www.sec.gov/Archives/edgar/data/1793294/000119312521172340/d238109ddefm14c.htm' },
  { id: 11, titulo: 'ICON to acquire PRA Health Sciences (comunicación 425)', editor: 'ICON plc / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-24', url: 'https://www.sec.gov/Archives/edgar/data/1060955/000114036121005941/nc10020781x7_425.htm' },
  ...(T.fuentes_extra ?? []),
];

export default {
  meta: {
    fecha_corte: '2026-10-21', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
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
    // PER adelantado (cierre de cada año ÷ BPA diluido del año siguiente) [A, D]: 2018 19,8x (52,93/2,67), 2019 21,9x (84,06/3,84),
    // 2020 28,9x (139,20/4,81), 2021 29,9x (217,64/7,28), 2022 23,9x (212,41/8,88), 2023 24,3x (306,53/12,63), 2024 21,7x (332,23/15,28),
    // 2025 31,0x (561,65/18,12, BPA propio de 2026e dentro de la guía). Mediana 2021-2025 24,3x; mínimo 21,7x; media 2018-2025 25,2x.
    // v2 (cierre ÷ BPA del mismo año): 2021 45,2x (excluido), 2022 29,2x, 2023 34,5x, 2024 26,3x, 2025 36,8x; media 2018-2025 sin 2021 31,6x.
    objetivo_12m: {
      ejercicio: '2028e',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: { base: 'adelantado', actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 24.3, minimo_5a: 21.7, media_larga: 25.2, excluidos: null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: 34.5, minimo_5a: 26.3, media_larga: 31.6, base: 'cierre' } },
      comparables_per: { mediana: 21.0 },
      consenso: { bpa_ano1: 19.18, bpa_ano2: 21.47, objetivo_medio: 595.92, objetivo_min: 370, objetivo_max: 700, analistas: 14, tendencia_3m: 'estables', fuente: 'MarketScreener, 21-oct-2026, antes de los resultados del 3T26 [D7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      comentario: T.objetivo12m_comentario ?? null,
    },
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
