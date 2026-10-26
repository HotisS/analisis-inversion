// Nota D (Mercado y valoración) de Eni, corte 2026-10-26. Precio y bolsa de bolsa.mjs (bolsa.json); consenso de Stock Analysis
// (S&P Global, actualizado el 24-oct, tras los resultados) contrastado con MarketScreener (sin actualizar tras los resultados);
// comparables de Stock Analysis del 23-oct. Cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-26/notas/nota-d.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';
const ED = 'https://www.eni.com/content/dam/enicom/documents';
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];
const usd = 1.1221; // EUR/USD 23-oct-2026
const nok = 10.468; // EUR/NOK 23-oct-2026
const dn = (ev, mc, ebitda) => Math.round(((ev - mc) / ebitda) * 100) / 100;

const fD = [
  { id: 1, titulo: 'Históricos diarios de ENI.MI, FTSE MIB y STOXX Europe 600 Oil & Gas (EXH1.DE)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: BOLSA.identificacion.fecha_precio, url: 'https://finance.yahoo.com/quote/ENI.MI/history/' },
  { id: 2, titulo: 'Eni S.p.A. (BIT: ENI): previsiones de 22 analistas (S&P Global), precio objetivo y recomendaciones, actualizado el 24-oct-2026', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-24', url: 'https://stockanalysis.com/quote/bit/ENI/forecast/' },
  { id: 3, titulo: 'Eni S.p.A.: previsiones financieras 2026-2028 (EBITDA, EBIT, dividendo; sin actualizar tras los resultados del 3T26)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-22', url: 'https://www.marketscreener.com/quote/stock/ENI-S-P-A-413403/finances/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 23-oct-2026: 3,36 %)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Estadísticas de TotalEnergies, Shell, BP, Equinor, Repsol y OMV (capitalización, valor empresa, PER adelantado, EV/EBITDA, ROIC, FCF), cierre del 23-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/quote/epa/TTE/statistics/' },
  { id: 7, titulo: 'Eni: report on the purchase of treasury shares during the period from 12 to 16 October 2026 (6-K): 172.086.219 acciones propias, 5,68 % del capital', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: `${E8}/000117494726000921/form6k-36435_eni.htm` },
  { id: 8, titulo: 'Eni, BofA incrementa target price in vista della trimestrale (24,5 EUR desde 24)', editor: 'Teleborsa / Borsa Italiana', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/eni-bofa-incrementa-target-price-in-vista-delle-trimestrale-111_2026-10-16_TLB.html?lang=it' },
  { id: 9, titulo: 'Conti Eni, attesa per utile record, dividendi e buyback', editor: 'Forbes Italia', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://forbes.it/2026/10/21/conti-eni-utile-record-attesa-dividendi-buyback' },
  { id: 10, titulo: 'Eni: results for the third quarter and nine months of 2026 (deuda neta, participadas, minoritarios, guía y retribución)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/press-release/migrated/2026-en/10/PR-2026-third-quarter-results.pdf` },
  { id: 11, titulo: 'Eni: Board of Directors resolves on the second tranche of the 2026 dividend (0,27 EUR; ex-dividendo el 23-nov-2026)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-22', url: 'https://www.eni.com/en-IT/media/press-release/2026/10/eni-board-directors.html' },
  { id: 12, titulo: 'Annual Report on Form 20-F 2025 (bonos híbridos perpetuos)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
];

const D = {
  _estado: 'Completo: precio, bolsa, consenso (dos fuentes), comparables del 23-oct, tasa libre y prima de mercado. Sin transacciones con múltiplo (hueco).',
  identificacion: {
    nombre: 'Eni S.p.A.', nombre_corto: 'Eni', ticker: 'ENI.MI', isin: 'IT0003132476', mercado: 'Euronext Milan (Borsa Italiana); ADR en NYSE (E)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Energía', industria: 'Petróleo, gas y combustibles integrados', sede: 'Roma', fundacion: '1953', empleados: 32168, web: 'https://www.eni.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 2858.2, capitalizacion_publicada: 79050, free_float_pct: 61.2,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M EUR/día (3 meses)`, proximos_resultados: null,
  },
  consenso: {
    guidance: 'Guía del 23-oct-2026 (escenario: Brent de 95 USD, SERM de 18 USD/b, TTF de 55 EUR/MWh y 1,15 USD/EUR): flujo de caja operativo ajustado de 16.500 M (15.000 M en julio, 11.500 M en el presupuesto); producción +6-7 % subyacente (≈5 % en julio); EBIT proforma de GGP de ≈1.500 M; EBITDA proforma de 1.400 M en Enilive y ≈1.200 M en Plenitude; inversión bruta de 7.000 M y neta por debajo de 4.500 M; gearing proforma en el mínimo del rango del 10-15 %. Retribución: dividendo ordinario de 1,10 EUR (+5 %), dividendo extraordinario de 0,46 EUR (1.300 M, ex-dividendo el 7-dic) y recompra subida a 3.800 M (3.400 M en julio, 1.500 M al principio). Sensibilidades: 110 M por dólar de Brent, 80 M por dólar de SERM y 30 M por euro/MWh de TTF [10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 102430, ebitda: 20478, ebit: 13207, bpa: 2.94, dpa: 1.216, fuente: 'Stock Analysis/S&P Global, 22 analistas, 24-oct (ventas y BPA) [2]; MarketScreener (EBITDA, EBIT, DPA) [3]' },
      { periodo: '2027e', ingresos: 91360, ebitda: 19255, ebit: 11732, bpa: 2.70, dpa: 1.142, fuente: 'Stock Analysis/S&P Global (ventas y BPA) [2]; MarketScreener (EBITDA, EBIT, DPA) [3]' },
      { periodo: '2028e', ingresos: 84188, ebitda: 18463, ebit: 10817, bpa: 2.439, dpa: 1.188, fuente: 'MarketScreener, sin actualizar tras el 3T26 [3]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 9, mantener: 11, vender: 2, po_medio: 26.99, po_min: 21.8, po_max: 32 },
    revisiones: 'Dos fuentes: Stock Analysis (S&P Global, 22 analistas, actualizado el 24-oct, ya con los resultados) y MarketScreener, que el 26-oct seguía mostrando las cifras de antes de los resultados (BPA de 2026e de 3,005 EUR) y el precio del 22-oct [2, 3]. El BPA ajustado de 2026e de S&P Global (2,94 EUR) casi duplica el de 2025 (1,57) por el Brent de la crisis de Ormuz, y el de 2027e (2,70) solo baja un 8 %: los analistas suponen una normalización lenta. El objetivo medio sube de 26,37 EUR (MarketScreener, 15-oct) a 26,99 EUR (S&P Global, 24-oct); antes de los resultados BofA lo subió a 24,5 EUR, y tras ellos Jefferies (30 EUR), UBS (30), JPMorgan (28) y RBC (28, Mantener) lo mantienen [2, 8]. Recomendaciones: 9 Comprar, 11 Mantener y 2 Vender (8 Comprar fuerte en septiembre, 7 hoy).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2020' })),
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Petroleras integradas europeas con producción, GNL, refino y comercialización: TotalEnergies, Shell, BP, Equinor, Repsol y OMV. Todas de un solo proveedor y del mismo cierre (Stock Analysis, 23-oct-2026), convertidas a euros con el cambio de ese día (1,1221 USD y 10,468 NOK por euro) [6]. El PER es el adelantado de los próximos doce meses sobre BPA ajustado (sin restar los cupones de híbridos, como el consenso de Eni). EV/EBITDA de los últimos doce meses; Stock Analysis no da el de los próximos doce meses. DN/EBITDA = (valor empresa − capitalización) ÷ EBITDA. Fuera ExxonMobil y Chevron (prima estructural de EE. UU.) y Galp (tamaño).',
    empresas: [
      { nombre: 'TotalEnergies', ticker: 'TTE', pais: 'FR', capitalizacion: 185280, ev_ventas: 1.25, ev_ebitda_ltm: 5.7, ev_ebitda_ntm: null, per_ntm: 7.91, crecimiento_pct: null, margen_ebitda_pct: 20.2, roic_pct: 10.3, dn_ebitda: dn(214.82, 185.28, 34.71), fcf_yield_pct: 8.2 },
      { nombre: 'Shell', ticker: 'SHEL', pais: 'GB', capitalizacion: Math.round(307870 / usd), ev_ventas: 1.18, ev_ebitda_ltm: 6.09, ev_ebitda_ntm: null, per_ntm: 9.21, crecimiento_pct: null, margen_ebitda_pct: 19.4, roic_pct: 11.4, dn_ebitda: dn(350.92, 307.87, 57.61), fcf_yield_pct: 10.3 },
      { nombre: 'BP', ticker: 'BP', pais: 'GB', capitalizacion: Math.round(131980 / usd), ev_ventas: 0.86, ev_ebitda_ltm: 4.74, ev_ebitda_ntm: null, per_ntm: 6.77, crecimiento_pct: null, margen_ebitda_pct: 18.2, roic_pct: 8.4, dn_ebitda: dn(185.88, 131.98, 39.2), fcf_yield_pct: 12.2 },
      { nombre: 'Equinor', ticker: 'EQNR', pais: 'NO', capitalizacion: Math.round(1070000 / nok), ev_ventas: 1.03, ev_ebitda_ltm: 2.73, ev_ebitda_ntm: null, per_ntm: 9.71, crecimiento_pct: null, margen_ebitda_pct: 36.8, roic_pct: 16.5, dn_ebitda: dn(1150, 1070, 414.8), fcf_yield_pct: 8.8 },
      { nombre: 'Repsol', ticker: 'REP', pais: 'ES', capitalizacion: 31370, ev_ventas: 0.71, ev_ebitda_ltm: 4.68, ev_ebitda_ntm: null, per_ntm: 5.72, crecimiento_pct: null, margen_ebitda_pct: 14.0, roic_pct: 11.8, dn_ebitda: dn(38.53, 31.37, 7.6), fcf_yield_pct: 7.1 },
      { nombre: 'OMV', ticker: 'OMV', pais: 'AT', capitalizacion: 24380, ev_ventas: 1.22, ev_ebitda_ltm: 4.98, ev_ebitda_ntm: null, per_ntm: 8.02, crecimiento_pct: null, margen_ebitda_pct: 22.8, roic_pct: 9.0, dn_ebitda: dn(31.36, 24.38, 5.84), fcf_yield_pct: 5.2 },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
};

fs.writeFileSync(path.join(dir, 'D.json'), JSON.stringify(D, null, 2) + '\n', 'utf8');
console.log('Nota D escrita; precio', D.identificacion.precio, D.identificacion.fecha_precio);
