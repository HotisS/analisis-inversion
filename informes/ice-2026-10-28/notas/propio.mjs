// Parte del analista (ICE, corte 2026-10-28). Citas con la letra de la nota: [A3] = fuente 3 de A.json; [P1] = fuente propia.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { anios, wacc, terminal, etapa2, casos, pesos, bpa } from './supuestos.mjs';

const aqui = dirname(fileURLToPath(import.meta.url));
const leer = (f) => JSON.parse(readFileSync(join(aqui, f), 'utf8'));
const D = leer('D.json');
const B = leer('bolsa.json');
const C0 = leer('comparables-2026-10-23.json');

const PRECIO = 155.44;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const b = Object.fromEntries(casos.map((c) => [c.escenario, bpa(c)]));
const bpaDe = (e, p) => b[e].find((f) => f.periodo === p).bpa;

// Historia del PER en BPA AJUSTADO (la misma base que los casos). Adelantada (v3): cierre de cada año ÷ BPA ajustado real del año
// siguiente; 2025 ÷ nuestro BPA ajustado de 2026e. BPA ajustado de las notas de resultados del 4T (cifra más reciente publicada de
// cada año): 2019 3,88 [P9]; 2020 4,41 [P10]; 2021 5,06 y 2022 5,30 [A10]; 2023 5,62 [A9]; 2024 6,07 [P11]; 2025 6,95 [A5].
// Cierres de Yahoo [P8]. Sin pérdidas ni años atípicos en base ajustada: no se excluye ninguno.
const cierres = { 2018: 75.33, 2019: 92.55, 2020: 115.29, 2021: 136.77, 2022: 102.59, 2023: 128.43, 2024: 149.01, 2025: 161.96 };
const bpaAj = { 2019: 3.88, 2020: 4.41, 2021: 5.06, 2022: 5.30, 2023: 5.62, 2024: 6.07, 2025: 6.95, 2026: bpaDe('Base', '2026e') };
const anosH = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025];
const adel = anosH.map((y) => ({ y, per: r1(cierres[y] / bpaAj[y + 1]) }));
const alCierre = anosH.filter((y) => bpaAj[y]).map((y) => ({ y, per: r1(cierres[y] / bpaAj[y]) }));
const mediana = (xs) => { const s = [...xs].sort((a, c) => a - c); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const ult5 = (h) => h.slice(-5).map((x) => x.per);
const media = (xs) => r1(xs.reduce((a, c) => a + c, 0) / xs.length);
export const historia = { adel, alCierre };

// Comparables: los nueve llevados al 27-oct con el precio.
const comps = C0.empresas.map((c) => {
  const [p0, p1] = C0.precios[c.ticker]; const f = p1 / p0;
  const m = (x) => (x == null ? null : r1(x * f));
  return { ...c, capitalizacion: Math.round(c.capitalizacion * f), ev_ventas: c.ev_ventas == null ? null : r2(c.ev_ventas * f), ev_ebitda_ltm: m(c.ev_ebitda_ltm), ev_ebitda_ntm: m(c.ev_ebitda_ntm), per_ntm: m(c.per_ntm), fcf_yield_pct: c.fcf_yield_pct == null ? null : r1(c.fcf_yield_pct / f) };
});

let T = {};
try { T = await import('./textos.mjs'); } catch (e) { if (!/Cannot find module|ERR_MODULE_NOT_FOUND/.test(String(e))) throw e; T = {}; }

const { rentabilidades, anual, ...restoBolsa } = B.bolsa;

export default {
  meta: {
    fecha_corte: '2026-10-28', divisa: 'USD', divisa_cotizacion: 'USD', tipo_cambio: 1, unidades: 'millones',
    cierre_ejercicio_mes: 12, etiqueta_ejercicio: 'fin', normas_contables: 'US GAAP', formato_cuenta: 'funcion',
    limitaciones: T.limitaciones ?? null,
    controles_explicados: T.controles_explicados ?? [],
  },
  _parches: T.parches ?? [],
  huecos_resueltos: T.huecos_resueltos ?? [],
  identificacion: {
    ...D.identificacion,
    precio: PRECIO, fecha_precio: '2026-10-27', acciones: 563.4, capitalizacion_publicada: 87263,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s,
    volumen_medio_diario: '≈ 516 M USD/día (3,30 M de acciones; 64 sesiones hasta el 27-oct-2026)',
    proximos_resultados: '2026-10-29',
    sector: 'Financieras', industria: 'Mercados de capitales: bolsas y datos financieros', sede: 'Atlanta (Georgia, EE. UU.)', fundacion: '2000', empleados: 12844, web: 'www.ice.com',
  },
  consenso: {
    ...D.consenso,
    estimaciones: [
      { periodo: '2026e', ingresos: 11077, ebitda: 7420, ebit: 6874, bpa: 8.18, dpa: 2.12, fuente: 'Ingresos y BPA ajustado: Yahoo Finance, 15 analistas, 28-oct-2026 [P7]; EBITDA, EBIT y DPA: MarketScreener, 8-oct-2026 [D6]' },
      { periodo: '2027e', ingresos: 11721, ebitda: 7812, ebit: 7244, bpa: 8.88, dpa: 2.28, fuente: 'Ingresos y BPA ajustado: Yahoo Finance, 15 analistas, 28-oct-2026 [P7]; EBITDA, EBIT y DPA: MarketScreener, 8-oct-2026 [D6]' },
      { periodo: '2028e', ingresos: 12478, ebitda: 8354, ebit: 7847, bpa: null, dpa: 2.45, fuente: 'MarketScreener, 16 analistas, 8-oct-2026 [D6]; su BPA de 2028e (8,19) es contable y no se usa' },
    ],
    recomendaciones: { n_analistas: 16, comprar: 13, mantener: 2, vender: 1, po_medio: 187.53, po_min: 160, po_max: 243 },
    revisiones: T.consenso_revisiones ?? D.consenso.revisiones,
    guidance: T.consenso_guidance ?? D.consenso.guidance,
  },
  bolsa: {
    ...restoBolsa, rentabilidades, anual,
    beta: 0.87, posicion_corta_pct: 1.18,
    comentario: T.bolsa_comentario ?? null,
    contexto: T.contexto ?? null,
    confianza: 'Alta',
  },
  multiplos_historicos: { ...D.multiplos_historicos, comentario: T.multiplos_comentario ?? D.multiplos_historicos.comentario },
  comparables: { ...D.comparables, empresas: comps, criterio: T.comparables_criterio ?? null, comentario: T.comparables_comentario ?? null, confianza: 'Media' },
  ...(T.secciones ?? {}),
  dcf: {
    anios, wacc, terminal, etapa2: { ...etapa2, justificacion: T.etapa2_justificacion ?? null }, mitad_de_anio: true,
    justificacion: T.dcf_justificacion ?? null,
    sostenibilidad: T.sostenibilidad ?? null,
    lectura: T.dcf_lectura ?? null,
    confianza: 'Media',
  },
  escenarios: { casos: casos.map((c) => ({ ...c, narrativa: T.narrativas?.[c.escenario] ?? null })), comentario: T.escenarios_comentario ?? null, confianza: 'Media' },
  suma_partes: T.suma_partes ?? { aplica: false, descuento_holding_pct: 0, partes: [], comentario: null, confianza: 'Media' },
  valoracion: {
    puente: { ...D.valoracion.puente, pensiones: 49 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran, válida para mercados desarrollados)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, Implied ERP by month, columna «ERP (T12m with sustainable payout)» de octubre de 2026 [P1]' },
    pesos,
    objetivo_12m: {
      ejercicio: '2028e',
      base_bpa: 'ajustado',
      casos: ['Bajista', 'Base', 'Alcista'].map((e) => ({ escenario: e, metrica: 'PER 2028e', beneficio_por_accion: bpaDe(e, '2028e'), multiplo: null, precio: null, justificacion: T.just12m?.[e] ?? null })),
      per_historico: {
        base: 'adelantado', base_bpa: 'ajustado',
        actual: r1(PRECIO / bpaDe('Base', '2027e')),
        mediana_5a: mediana(ult5(adel)), minimo_5a: Math.min(...ult5(adel)), media_larga: media(adel.map((x) => x.per)),
        excluidos: T.excluidos ?? null,
        v2: { actual: r1(PRECIO / bpaDe('Base', '2027e')), mediana_5a: mediana(ult5(alCierre)), minimo_5a: Math.min(...ult5(alCierre)), media_larga: media(alCierre.map((x) => x.per)), base: 'cierre' },
      },
      comparables_per: { mediana: mediana(comps.map((c) => c.per_ntm).filter((x) => x != null)) },
      consenso: { bpa_ano1: 8.18, bpa_ano2: 8.88, objetivo_medio: 187.53, objetivo_min: 160, objetivo_max: 243, analistas: 15, tendencia_3m: 'estables', fuente: 'Yahoo Finance: BPA ajustado de 2026e y 2027e (15 analistas) y objetivos (15), 28-oct-2026 [P7]' },
      diferencia_consenso: T.diferencia_consenso ?? null,
      comentario: T.objetivo12m_comentario ?? null,
    },
    comentario: T.valoracion_comentario ?? null,
    confianza: 'Media',
  },
  resumen: T.resumen ?? null,
  fuentes: [
    { id: 1, titulo: 'Implied ERP by month (ERPbymonth.xlsx), fila de octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 2, titulo: 'Pricing term sheet de los bonos senior 2029, 2031, 2033 y 2036 (FWP)', editor: 'Intercontinental Exchange (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.sec.gov/Archives/edgar/data/1571949/000119312526345198/d177529dfwp.htm' },
    { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 4,99 % el 27-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
    { id: 4, titulo: 'Formularios 4 de directivos y consejeros de Intercontinental Exchange presentados desde el 28-oct-2025 (91 presentaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-28', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001571949&type=4' },
    { id: 5, titulo: 'MarketAxess Holdings: Form 8-K (fin anticipado del plazo de la ley HSR el 21-oct-2026)', editor: 'MarketAxess (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001278021&type=8-K' },
    { id: 6, titulo: 'MarketAxess Holdings: Form 8-K (junta extraordinaria del 29-oct-2026 sobre la fusión) y resultados del 3T26', editor: 'MarketAxess (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001278021&type=8-K' },
    { id: 7, titulo: 'Intercontinental Exchange: estimaciones (earningsTrend), objetivos, recomendaciones, cambios de recomendación y calendario', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-28', url: 'https://finance.yahoo.com/quote/ICE/analysis/' },
    { id: 8, titulo: 'Históricos diarios de cotización (ICE, SPY, XLF y comparables) hasta el 27-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/ICE/history/' },
    { id: 9, titulo: 'Nota de prensa de resultados del 4T20 y del ejercicio 2020 (8-K, anexo 99.1)', editor: 'Intercontinental Exchange (SEC EDGAR)', tipo: 'Primaria', fecha: '2021-02-04', url: 'https://www.sec.gov/Archives/edgar/data/1571949/000110465921011938/tm214960d1_ex99-1.htm' },
    { id: 10, titulo: 'Nota de prensa de resultados del 4T21 y del ejercicio 2021 (8-K, anexo 99.1)', editor: 'Intercontinental Exchange (SEC EDGAR)', tipo: 'Primaria', fecha: '2022-02-03', url: 'https://www.sec.gov/Archives/edgar/data/1571949/000110465922011150/tm225009d1_ex99-1.htm' },
    { id: 11, titulo: 'Nota de prensa de resultados del 4T24 y del ejercicio 2024 (8-K, anexo 99.1)', editor: 'Intercontinental Exchange (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-02-06', url: 'https://www.sec.gov/Archives/edgar/data/1571949/000110465925009884/tm255453d1_ex99-1.htm' },
    { id: 12, titulo: 'Comparables de infraestructura de mercados al 23-oct-2026 (MarketScreener y Stock Analysis), informes de CME Group y LSEG del 26-oct-2026', editor: 'Elaboración propia sobre MarketScreener y Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://www.marketscreener.com/' },
    { id: 13, titulo: 'Deep Dive: Can NYSE-Owner ICE Heat Back Up?', editor: 'eToro', tipo: 'Prensa', fecha: '2026-06-05', url: 'https://www.etoro.com/news-and-analysis/market-insights/deep-dives/deep-dive-can-nyse-owner-ice-heat-back-up/' },
    { id: 14, titulo: 'Intercontinental Exchange Slides as Softer June Volume Trends Trigger Estimate Cuts', editor: 'Quiver Quantitative', tipo: 'Prensa', fecha: '2026-07-09', url: 'https://www.quiverquant.com/news/Intercontinental+Exchange+Slides+as+Softer+June+Volume+Trends+Trigger+Estimate+Cuts' },
  ],
  huecos: T.huecos ?? [],
};
