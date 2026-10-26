// Nota D (mercado y valoración) de Elevance Health, 26-oct-2026. Escribe notas/D.json.
// Precio, rango, rentabilidades, betas y cierres de bolsa.json (herramientas/bolsa.mjs); consenso de Stock Analysis
// (S&P Global), MarketBeat y MarketScreener; comparables de Stock Analysis del 23-oct (PER adelantado, capitalización,
// múltiplos y ROIC) con el crecimiento, margen y deuda del informe de UnitedHealth del 18-oct; transacciones del
// mismo informe (8-K de cada operación y XBRL de las compradas).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const bolsa = JSON.parse(readFileSync(join(aqui, 'bolsa.json'), 'utf8'));
const unh = JSON.parse(readFileSync(join(aqui, '../../unitedhealth-2026-10-18/datos.json'), 'utf8'));

const fuentes = [
  { id: 1, titulo: 'Elevance Health (ELV), CI, CVS, HUM, CNC, MOH, OSCR, ALHC, UNH, SPY y XLV: históricos diarios (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/ELV/history' },
  { id: 2, titulo: 'Elevance Health (ELV) Stock Forecast & Analyst Price Targets (S&P Global, 22 analistas)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://stockanalysis.com/stocks/elv/forecast/' },
  { id: 3, titulo: 'Elevance Health (ELV) Stock Forecast and Price Target (23 analistas)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-26', url: 'https://www.marketbeat.com/stocks/NYSE/ELV/forecast/' },
  { id: 4, titulo: 'Elevance Health, Inc.: valoración y estimaciones 2024-2028', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-23', url: 'https://uk.marketscreener.com/quote/stock/ELEVANCE-HEALTH-INC-18740543/valuation/' },
  { id: 5, titulo: 'Elevance Health (ELV) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/elv/statistics/' },
  { id: 6, titulo: 'UnitedHealth Group (UNH) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/unh/statistics/' },
  { id: 7, titulo: 'The Cigna Group (CI) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/ci/statistics/' },
  { id: 8, titulo: 'CVS Health (CVS) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/cvs/statistics/' },
  { id: 9, titulo: 'Humana (HUM) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/hum/statistics/' },
  { id: 10, titulo: 'Centene (CNC) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/cnc/statistics/' },
  { id: 11, titulo: 'Molina Healthcare (MOH) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/moh/statistics/' },
  { id: 12, titulo: 'Oscar Health (OSCR) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/oscr/statistics/' },
  { id: 13, titulo: 'Alignment Healthcare (ALHC) statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/stocks/alhc/statistics/' },
  { id: 14, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,00 % el 23-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-23', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 15, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 16, titulo: 'Betas by Sector (US), enero de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Sectorial', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/Betas.html' },
  { id: 17, titulo: 'Elevance Health, informe trimestral 10-Q del 3T26 (acciones en circulación a 15-oct-2026, deuda y caja de la matriz)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000071/elv-20260930.htm' },
  { id: 18, titulo: 'Elevance Health Reports Third Quarter 2026 Results (8-K, exhibit 99.1)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000068/a3q2026elvearningsrelease.htm' },
  { id: 19, titulo: 'Elevance Health, proxy statement 2026 (plantilla: más de 97.000 empleados)', editor: 'Elevance Health (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-27', url: 'https://www.sec.gov/Archives/edgar/data/1156039/000115603926000031/elv-20260326.htm' },
  { id: 20, titulo: 'Informe de UnitedHealth del 18-oct-2026 (comparables: crecimiento, margen y deuda de cada aseguradora de sus 10-K y del consenso)', editor: 'Repositorio propio (informes/unitedhealth-2026-10-18)', tipo: 'Analistas', fecha: '2026-10-18', url: 'informes/unitedhealth-2026-10-18/datos.json' },
  { id: 21, titulo: 'Elevance Health (ELV) earnings history', editor: 'MarketBeat', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://www.marketbeat.com/stocks/NYSE/ELV/earnings/' },
];
// Transacciones del informe de UnitedHealth (ids 88-99 allí → 22-33 aquí)
const mapa = {};
let n = 22;
for (const f of unh.fuentes.filter(f => f.id >= 88 && f.id <= 99)) { mapa[f.id] = n; fuentes.push({ ...f, id: n }); n++; }
const recita = (t) => t.replace(/\[([\d,\s-]+)\]/g, (m, g) => '[' + g.split(',').map(x => mapa[x.trim()] ?? x.trim()).join(', ') + ']');
const operaciones = unh.transacciones.operaciones.map(o => ({ ...o, comentario: recita(o.comentario) }));
operaciones.push({ fecha: '2024-01', objetivo: 'Blue Cross and Blue Shield de Luisiana (retirada)', comprador: 'Elevance Health', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Compra anunciada en 2023 y retirada en 2024 sin precio publicado comparable; muestra el interés de Elevance por sumar licencias Blue, no un múltiplo.' });

const id = bolsa.identificacion;
const D = {
  _estado: 'completa (26-oct-2026, 10:50)',
  identificacion: {
    nombre: 'Elevance Health, Inc.', nombre_corto: 'Elevance', ticker: 'ELV', isin: 'US0367521038', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Health Care', industria: 'Managed Health Care', sede: 'Indianápolis (Indiana)', fundacion: '2004', empleados: 97000, web: 'elevancehealth.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 217.1, capitalizacion_publicada: 95050, free_float_pct: 99.8,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: '≈ 468 M USD/día (1,15 M de acciones, 3 meses)', proximos_resultados: '2027-01-27',
  },
  consenso: {
    guidance: 'Guía de 2026 (21-oct-2026): BPA ajustado de al menos 29,00 USD (≥ 25,50 en enero, ≥ 26,75 en abril, ≥ 27,00 en julio), BPA contable de al menos 22,00 USD y flujo operativo de al menos 6.500 M [18]. La guía incluye partidas no operativas favorables; la «base» de 2026 sin ellas es de al menos 26,75 USD (26,00 en julio), y sobre ella la dirección promete un crecimiento del BPA ajustado de al menos el 12 % en 2027 (≥ 29,96 USD) [18]. Medicare Advantage con margen de al menos el 2 % en 2026 y objetivo del 3-5 %; Medicaid con objetivo del 2-4 % y 2026 como suelo. Detalle de 2027 en enero [18].',
    estimaciones: [
      { periodo: '2026e', ingresos: 198740, ebitda: 10538, ebit: 9396, bpa: 29.08, dpa: 6.86, fuente: 'BPA ajustado: S&P Global vía Stock Analysis [2]; ingresos, EBITDA, EBIT y DPA: MarketScreener [4]' },
      { periodo: '2027e', ingresos: 203604, ebitda: 10798, ebit: 9679, bpa: 30.22, dpa: 7.21, fuente: 'BPA ajustado: S&P Global vía Stock Analysis [2]; resto: MarketScreener [4]' },
      { periodo: '2028e', ingresos: 212387, ebitda: 11581, ebit: 10768, bpa: null, dpa: 7.65, fuente: 'MarketScreener [4] (su BPA de 2028e, 32,82 USD, es contable y no se mezcla con el ajustado)' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 14, mantener: 8, vender: 0, po_medio: 481.48, po_min: 406, po_max: 523 },
    revisiones: 'Las estimaciones suben desde abril con cada subida de la guía: el BPA ajustado de 2026 pasa de ≈ 26,9 USD antes del 3T26 a 29,08, y el de 2027 a 30,22 (≈ 29,1 antes) [2]. Tras los resultados, TD Cowen subió su objetivo de 465 a 495 USD, Mizuho de 470 a 490, Goldman Sachs de 395 a 451 (Mantener), Truist de 475 a 500 y UBS de 460 a 523 [2]. El objetivo medio de S&P Global (22 analistas) es de 481,48 USD; el de MarketBeat (23, incluye objetivos más viejos) de 455,57 [2, 3]. MarketScreener solo da cifras contables (BPA de 22,43, 28,17 y 32,82 USD en 2026-2028) [4]. Las estimaciones de ingresos de 2026 (198.740 M) incluyen ya la pérdida de afiliados [4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    beta: bolsa.betas.mensual_5a,
    volatilidad_pct: bolsa.bolsa.volatilidad_pct,
    max_drawdown_pct: bolsa.bolsa.max_drawdown_pct,
    posicion_corta_pct: 2.25,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter(c => c.anio >= '2021').map(c => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Las seis grandes aseguradoras de salud gestionada cotizadas en EE. UU. (UnitedHealth, Cigna, CVS Health con Aetna, Humana, Centene y Molina), con la misma mezcla de primas de Medicare Advantage, Medicaid y planes de empresa, y dos aseguradoras pequeñas de crecimiento (Oscar en el ACA y Alignment en Medicare Advantage), las mismas del informe de UnitedHealth del 18-oct [20]. Cigna, CVS y UnitedHealth suman gestión de farmacia como CarelonRx. Se usa sobre todo el PER: el valor empresa de Stock Analysis resta la caja de las filiales reguladas y no es comparable [5].',
    empresas: [
      { nombre: 'UnitedHealth Group', ticker: 'UNH', pais: 'US', capitalizacion: 375280, ev_ventas: 0.94, ev_ebitda_ltm: 14.7, ev_ebitda_ntm: null, per_ntm: 18.4, crecimiento_pct: 3.0, margen_ebitda_pct: 6.4, roic_pct: 12.4, dn_ebitda: 2.5, fcf_yield_pct: 6.1 },
      { nombre: 'The Cigna Group', ticker: 'CI', pais: 'US', capitalizacion: 81110, ev_ventas: 0.37, ev_ebitda_ltm: 8.3, ev_ebitda_ntm: null, per_ntm: 9.7, crecimiento_pct: 5.0, margen_ebitda_pct: 4.5, roic_pct: 13.4, dn_ebitda: 1.9, fcf_yield_pct: 11.2 },
      { nombre: 'CVS Health', ticker: 'CVS', pais: 'US', capitalizacion: 119550, ev_ventas: 0.44, ev_ebitda_ltm: 10.9, ev_ebitda_ntm: null, per_ntm: 11.5, crecimiento_pct: 3.6, margen_ebitda_pct: 4.0, roic_pct: 7.2, dn_ebitda: 3.7, fcf_yield_pct: 9.8 },
      { nombre: 'Humana', ticker: 'HUM', pais: 'US', capitalizacion: 50680, ev_ventas: 0.40, ev_ebitda_ltm: 16.3, ev_ebitda_ntm: null, per_ntm: 34.0, crecimiento_pct: 14.8, margen_ebitda_pct: 2.5, roic_pct: 8.1, dn_ebitda: 2.2, fcf_yield_pct: 3.9 },
      { nombre: 'Centene', ticker: 'CNC', pais: 'US', capitalizacion: 34660, ev_ventas: 0.15, ev_ebitda_ltm: 5.8, ev_ebitda_ntm: null, per_ntm: 15.1, crecimiento_pct: 7.3, margen_ebitda_pct: 2.6, roic_pct: 8.8, dn_ebitda: -2.4, fcf_yield_pct: 25.8 },
      { nombre: 'Molina Healthcare', ticker: 'MOH', pais: 'US', capitalizacion: 10890, ev_ventas: 0.25, ev_ebitda_ltm: 29.5, ev_ebitda_ntm: null, per_ntm: 25.9, crecimiento_pct: 11.2, margen_ebitda_pct: 0.9, roic_pct: 3.3, dn_ebitda: -2.6, fcf_yield_pct: 2.2 },
      { nombre: 'Oscar Health', ticker: 'OSCR', pais: 'US', capitalizacion: 9560, ev_ventas: 0.39, ev_ebitda_ltm: 9.1, ev_ebitda_ntm: null, per_ntm: 17.0, crecimiento_pct: 32.7, margen_ebitda_pct: 4.3, roic_pct: 25.1, dn_ebitda: -5.5, fcf_yield_pct: 45.8 },
      { nombre: 'Alignment Healthcare', ticker: 'ALHC', pais: 'US', capitalizacion: 1670, ev_ventas: 0.29, ev_ebitda_ltm: 15.0, ev_ebitda_ntm: null, per_ntm: 14.6, crecimiento_pct: 35.8, margen_ebitda_pct: 1.9, roic_pct: 9.9, dn_ebitda: -4.2, fcf_yield_pct: 10.6 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones,
    comentario: null,
    confianza: 'Media',
  },
  datos_wacc: { tasa_libre_pct: 5.00, fecha: '2026-10-23', beta_mensual_5a: bolsa.betas.mensual_5a, beta_semanal_2a: bolsa.betas.semanal_2a, beta_ajustada_mensual: bolsa.betas.ajustada_mensual_5a, prima_implicita_pct: 4.2 },
  fuentes,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones 2028e BPA ajustado', tipo: 'Complemento', intentos: '1) Stock Analysis (solo dos años de BPA); 2) MarketScreener (BPA contable); 3) MarketBeat (solo año en curso y siguiente)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm', tipo: 'Complemento', intentos: '1) Stock Analysis (solo LTM); 2) MarketScreener de cada comparable (EV con la caja regulada restada); 3) consenso de EBITDA por empresa no disponible gratis con la misma definición', decision: 'Omitido' },
  ],
};
delete D.datos_wacc; // va en el diario y en propio
writeFileSync(join(aqui, 'D.json'), JSON.stringify(D, null, 2));
console.log('D.json', Object.keys(D.bolsa), D.identificacion.precio, D.identificacion.fecha_precio, operaciones.length);
