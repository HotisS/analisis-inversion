// Escribe las notas A-E de Novonesis (corte 2026-10-14) a partir de los documentos descargados en notas/docs
// (informe anual 2025 ESEF, informe del 1S26, XBRL ESEF 2021-2025 de Novozymes/Novonesis) y de las páginas web leídas.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/novonesis-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => Math.round(x * 10) / 10;
// DKK por EUR: medias implícitas en la cuenta (ventas DKK ÷ ventas EUR del resumen de cinco años del informe 2025) y cierres del BCE.
const MEDIA = { 2021: 14951 / 2010.3, 2022: 17553 / 2359.4, 2023: 17899 / 2402.2 };
const CIERRE = { 2021: 7.4364, 2022: 7.4365, 2023: 7.4529 };
const m = (dkk, y) => r1(dkk / MEDIA[y]);
const b = (dkk, y) => r1(dkk / CIERRE[y]);

const URL_AR25 = 'https://filings.xbrl.org/529900T6WNZXD2R3JW38/2025-12-31/ESEF/DK/0/Novonesis-2025-12-31-en/reports/Novonesis-2025-12-31-en.xhtml';
const URL_H126 = 'https://attachment.news.eu.nasdaq.com/aadfa0724b0126405dc41a39d9afb011c';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Novonesis Annual Report 2025 (ESEF): cuentas consolidadas, resumen de cinco años 2021-2025, notas 2.2 (ventas), 2.6 (BPA), 3.3 (arrendamientos), 4.3 (deuda), medidas no NIIF', editor: 'Novonesis (Novozymes A/S)', tipo: 'Primaria', fecha: '2026-02-25', url: URL_AR25 },
  { id: 2, titulo: 'Interim report H1 2026 (Company Announcement no. 15): cuenta, balance, flujos, segmentos, deuda, conciliación no NIIF y guía 2026', editor: 'Novonesis (Novozymes A/S)', tipo: 'Primaria', fecha: '2026-08-19', url: URL_H126 },
  { id: 3, titulo: 'Novozymes Annual Report 2023 (ESEF, DKK): cuenta, balance y flujos 2022-2023', editor: 'Novozymes A/S', tipo: 'Primaria', fecha: '2024-02', url: 'https://filings.xbrl.org/529900T6WNZXD2R3JW38/2023-12-31/ESEF/DK/0/NOVOZYMES-2023-12-31-en/reports/NOVOZYMES-2023-12-31-en.xhtml' },
  { id: 4, titulo: 'Novozymes Annual Report 2022 (ESEF, DKK): cuenta, balance y flujos 2021-2022', editor: 'Novozymes A/S', tipo: 'Primaria', fecha: '2023-02', url: 'https://filings.xbrl.org/529900T6WNZXD2R3JW38/2022-12-31/ESEF/DK/0/NOVOZYMES-2022-12-31-en/reports/NOVOZYMES-2022-12-31-en.xhtml' },
  { id: 5, titulo: 'Novonesis to acquire dsm-firmenich’s share of the Feed Enzyme Alliance (Company Announcement, 1.500 M EUR, ~70 M EUR de EBITDA ajustado)', editor: 'Novonesis', tipo: 'Primaria', fecha: '2025-02-11', url: 'https://backend.novonesis.com/sites/default/files/document/2025-02/2025_02_Company_Announcement_Acquisition.pdf' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro (DKK, USD, CHF, GBP) del 14-oct-2026 y de cierre de año', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Interim report H1 2026: nota de prensa en Nasdaq Copenhagen', editor: 'Nasdaq Copenhagen / Novonesis', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://view.news.eu.nasdaq.com/view?id=1459154' },
];

const cuenta = [
  { periodo: '2021', ingresos: 2010.3, coste_ventas: 850.8, gastos_generales: 350.6, ebitda: 729.2, amortizaciones: 190.4, ebit: 538.8, resultado_financiero: -10.6, bai: 528.2, impuestos: m(779, 2021), minoritarios: -0.1, beneficio_neto: m(3146, 2021), gastos_financieros: m(253, 2021), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.51, dpa: 0.74, dpa_extraordinario: null, acciones_diluidas: 280.1 },
  { periodo: '2022', ingresos: 2359.4, coste_ventas: 1072.1, gastos_generales: 405.2, ebitda: 812.7, amortizaciones: 199.6, ebit: 613.1, resultado_financiero: 0.3, bai: 613.4, impuestos: m(870, 2022), minoritarios: m(10, 2022), beneficio_neto: m(3676, 2022), gastos_financieros: m(531, 2022), participadas_en_ebitda: null, no_recurrentes_en_ebitda: 9.1, bpa: 1.77, dpa: 0.81, dpa_extraordinario: null, acciones_diluidas: 279.2 },
  { periodo: '2023', ingresos: 2402.2, coste_ventas: 1097.4, gastos_generales: 500.5, ebitda: 720.0, amortizaciones: 186.4, ebit: 533.6, resultado_financiero: -6.5, bai: 527.1, impuestos: m(870, 2023), minoritarios: m(15, 2023), beneficio_neto: m(3024, 2023), gastos_financieros: m(331, 2023), participadas_en_ebitda: null, no_recurrentes_en_ebitda: 77.3, bpa: 1.46, dpa: 0.83, dpa_extraordinario: null, acciones_diluidas: 277.9 },
  { periodo: '2024', ingresos: 3833.5, coste_ventas: 2024.0, gastos_generales: 895.3, ebitda: 1098.4, amortizaciones: 597.4, ebit: 501.0, resultado_financiero: -83.9, bai: 417.1, impuestos: 111.3, minoritarios: 0, beneficio_neto: 305.8, gastos_financieros: 107.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 288.6, bpa: 0.67, dpa: 0.83, dpa_extraordinario: null, acciones_diluidas: 459.6 },
  { periodo: '2025', ingresos: 4157.6, coste_ventas: 1916.1, gastos_generales: 961.0, ebitda: 1413.6, amortizaciones: 596.9, ebit: 816.7, resultado_financiero: -73.3, bai: 743.4, impuestos: 159.8, minoritarios: 0, beneficio_neto: 583.6, gastos_financieros: 102.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 129.7, bpa: 1.25, dpa: 0.87, dpa_extraordinario: null, acciones_diluidas: 467.6 },
];

const balance = [
  { periodo: '2021', activo_total: 3330.5, activo_corriente: b(7823, 2021), pasivo_corriente: b(5673, 2021), pasivo_total: b(12561, 2021), fondo_comercio: null, intangibles: b(5024, 2021), inmovilizado_material: null, existencias: b(2992, 2021), clientes: b(2948, 2021), proveedores: b(1490, 2021), activos_contrato: null, pasivos_contrato: null, caja: b(963, 2021), deuda_financiera: 767.3, arrendamientos: b(482, 2021), patrimonio_neto: b(12206 - 379, 2021), minoritarios: b(379, 2021), reservas: null },
  { periodo: '2022', activo_total: 3762.9, activo_corriente: b(9241, 2022), pasivo_corriente: b(6963, 2022), pasivo_total: b(13755, 2022), fondo_comercio: null, intangibles: b(4698, 2022), inmovilizado_material: null, existencias: b(3803, 2022), clientes: b(3454, 2022), proveedores: b(1869, 2022), activos_contrato: b(151, 2022), pasivos_contrato: b(94, 2022), caja: b(1041, 2022), deuda_financiera: b(3619 + 2919, 2022), arrendamientos: b(411, 2022), patrimonio_neto: b(14228 - 391, 2022), minoritarios: b(391, 2022), reservas: null },
  { periodo: '2023', activo_total: 3809.4, activo_corriente: b(9462, 2023), pasivo_corriente: b(7262, 2023), pasivo_total: b(14040, 2023), fondo_comercio: null, intangibles: b(4532, 2023), inmovilizado_material: null, existencias: b(3627, 2023), clientes: b(3702, 2023), proveedores: b(1616, 2023), activos_contrato: b(70, 2023), pasivos_contrato: b(65, 2023), caja: 149.7, deuda_financiera: b(4329 + 3083, 2023), arrendamientos: b(369, 2023), patrimonio_neto: b(14351 - 373, 2023), minoritarios: b(373, 2023), reservas: null },
  { periodo: '2024', activo_total: 15195.6, activo_corriente: 1879.4, pasivo_corriente: 1088.3, pasivo_total: 4019.6, fondo_comercio: 5605.0, intangibles: 4419.2, inmovilizado_material: 2968.3, existencias: 720.6, clientes: 665.6, proveedores: 423.1, activos_contrato: 23.6, pasivos_contrato: 22.8, caja: 280.0, deuda_financiera: 1602.9, arrendamientos: 193.9, patrimonio_neto: 11176.0, minoritarios: 0, reservas: 11050.4 },
  { periodo: '2025', activo_total: 16349.1, activo_corriente: 1983.2, pasivo_corriente: 2741.3, pasivo_total: 5493.9, fondo_comercio: 6192.9, intangibles: 4895.5, inmovilizado_material: 2998.3, existencias: 772.2, clientes: 716.5, proveedores: 420.8, activos_contrato: 35.9, pasivos_contrato: 26.0, caja: 275.3, deuda_financiera: 2815.8, arrendamientos: 189.6, patrimonio_neto: 10855.2, minoritarios: 0, reservas: 10729.7 },
];

const flujos = [
  { periodo: '2021', flujo_operativo: 546.2, capex: m(1071 + 169, 2021), pagos_arrendamientos: m(103, 2021), adquisiciones: null, desinversiones: m(124, 2021), dividendos: m(1466, 2021), recompras: m(1500, 2021), emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 538.7, capex: m(2760 + 130, 2022), pagos_arrendamientos: m(120, 2022), adquisiciones: null, desinversiones: m(28, 2022), dividendos: m(1525, 2022), recompras: m(500, 2022), emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 557.1, capex: m(1857 + 199, 2023), pagos_arrendamientos: m(123, 2023), adquisiciones: null, desinversiones: m(4, 2023), dividendos: m(2856, 2023), recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1019.9, capex: 359.8, pagos_arrendamientos: 36.4, adquisiciones: 71.1, desinversiones: 145.3, dividendos: 249.8, recompras: 0, emision_acciones: 37.8, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 1221.5, capex: 470.8, pagos_arrendamientos: 37.9, adquisiciones: 1519.8, desinversiones: 19.7, dividendos: 402.7, recompras: 99.9, emision_acciones: 44.0, intereses_en_financiacion: 0 },
];

guarda('A', {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 4297.0, ebitda: 1508.8, ebit: 878.3, beneficio_neto: 631.6, bpa: 1.36, dpa: 0.87, dpa_extraordinario: null, fcf: 770.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 93.3 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Fusión con Chr. Hansen (29-ene-2024): consolida 11 meses; 2021-2023 son Novozymes sola, en euros del resumen de cinco años [1].' },
      { periodo: '2025', descripcion: 'Compra de la parte de dsm-firmenich de la Feed Enzyme Alliance (2-jun-2025, 1.520 M EUR en caja): siete meses en la cuenta, todo el balance [1, 5].' },
    ],
    comentario: null, ajustes: null, confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1020.4, crecimiento_pct: null, crecimiento_organico_pct: 11, ebitda: 381.6, margen_ebitda_pct: 37.4, bpa: 0.46, vs_consenso: null },
      { periodo: '4T24', ingresos: 981.4, crecimiento_pct: null, crecimiento_organico_pct: 7, ebitda: 355.3, margen_ebitda_pct: 36.2, bpa: 0.44, vs_consenso: null },
      { periodo: '1T25', ingresos: 1077.6, crecimiento_pct: 11.6, crecimiento_organico_pct: 11, ebitda: 412.7, margen_ebitda_pct: 38.3, bpa: 0.53, vs_consenso: null },
      { periodo: '2T25', ingresos: 1018.5, crecimiento_pct: 4.1, crecimiento_organico_pct: 8, ebitda: 370.6, margen_ebitda_pct: 36.4, bpa: 0.47, vs_consenso: null },
      { periodo: '3T25', ingresos: 1064.9, crecimiento_pct: 4.4, crecimiento_organico_pct: 6, ebitda: 395.1, margen_ebitda_pct: 37.1, bpa: 0.54, vs_consenso: null },
      { periodo: '4T25', ingresos: 996.6, crecimiento_pct: 1.5, crecimiento_organico_pct: 4, ebitda: 364.8, margen_ebitda_pct: 36.6, bpa: 0.45, vs_consenso: null },
      { periodo: '1T26', ingresos: 1119.3, crecimiento_pct: 3.9, crecimiento_organico_pct: 7, ebitda: 423.0, margen_ebitda_pct: 37.8, bpa: 0.57, vs_consenso: null },
      { periodo: '2T26', ingresos: 1116.2, crecimiento_pct: 9.6, crecimiento_organico_pct: 9, ebitda: 419.2, margen_ebitda_pct: 37.6, bpa: 0.52, vs_consenso: null },
    ],
    ultima_presentacion: null, confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 237.3 }, { anio: '2027-2029', importe: 1146.0 }, { anio: '2030', importe: 500 }, { anio: '2033', importe: 600 }, { anio: '2037', importe: 600 },
    ],
    liquidez: 'Caja 308,7 M EUR + líneas comprometidas no dispuestas 940,5 M EUR (vencen 2028-2030) a 30-jun-2026 [2].',
    rating: 'S&P Global Ratings: A- (perspectiva estable), marzo de 2026 [2]',
    coste_deuda_pct: 3.3, vida_media_anios: 6.0,
    otros_pasivos: null, comentario: null, confianza: 'Alta',
  },
  flujos: { historico: flujos, comentario: null, confianza: 'Alta' },
  negocio: {
    segmentos: [
      { nombre: 'Food & Health Biosolutions', descripcion: 'Alimentos y bebidas (lácteos, panadería, cerveza, cultivos, enzimas) y salud humana (probióticos, HMO, proteínas avanzadas).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 1668.1, resultado: 586.7 }, { periodo: '2025', ingresos: 1867.3, resultado: 669.4 }] },
      { nombre: 'Planetary Health Biosolutions', descripcion: 'Cuidado del hogar (enzimas para detergentes) y agricultura, energía y técnica (bioetanol, piensos, biocontrol).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 2165.4, resultado: 800.3 }, { periodo: '2025', ingresos: 2290.3, resultado: 873.9 }] },
    ],
    geografias: [
      { nombre: 'Europa, Oriente Medio y África', peso_pct: 36 }, { nombre: 'Norteamérica', peso_pct: 32 }, { nombre: 'Asia-Pacífico', peso_pct: 19 }, { nombre: 'Latinoamérica', peso_pct: 13 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico de ventas', valor_anterior: '8 % (2024 pro forma)', valor_actual: '7 % (2025); 8 % (1S26)', variacion: '−1 p.p.', comentario: 'Guía 2026 elevada a 7-8 % [2]' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '36,2 %', valor_actual: '37,1 % (2025); 37,7 % (1S26)', variacion: '+0,9 p.p.', comentario: 'Objetivo 2030: ~39 % [1]' },
      { kpi: 'BPA ajustado sin PPA (diluido)', valor_anterior: '1,72 EUR', valor_actual: '1,99 EUR (2025); 1,09 (1S26)', variacion: '+16 %', comentario: 'Excluye la amortización de intangibles de las compras [1]' },
      { kpi: 'Caja libre antes de compras', valor_anterior: '660,9 M EUR', valor_actual: '770,4 M EUR', variacion: '+17 %', comentario: '18,5 % de las ventas en 2025 [1]' },
      { kpi: 'Deuda neta / EBITDA', valor_anterior: '1,4x', valor_actual: '1,9x (2025); 1,8x (jun-26)', variacion: '+0,5x', comentario: 'Por la compra de la Feed Enzyme Alliance [1, 2]' },
      { kpi: 'Capex sobre ventas', valor_anterior: '9,4 %', valor_actual: '11,3 % (2025); guía 12-14 % (2026)', variacion: '+1,9 p.p.', comentario: 'Ampliaciones de capacidad del plan 2030 [2]' },
      { kpi: 'Ventas a los cinco mayores clientes', valor_anterior: '16 %', valor_actual: '14 %', variacion: '−2 p.p.', comentario: 'Nota 2.2 [1]' },
    ],
    confianza: 'Alta',
  },
  calidad: { auditor: 'EY Godkendt Revisionspartnerselskab', anios_auditor: null, opinion: 'Favorable (sin salvedades), 25-feb-2026 [1]', confianza: 'Media' },
  capital: {
    adquisiciones: [
      { anio: '2024', objetivo: 'Chr. Hansen (fusión por canje: 1,5332 acciones B de Novozymes por acción)', importe: 9076.8, ev_ebitda: null, financiacion: 'Acciones (ampliación de 9.076,8 M EUR)', resultado: 'Sinergias de costes al 100 % desde mediados de 2025 y de ingresos ~1 p.p. de crecimiento al año; ROIC ajustado con fondo de comercio del 16,5 % (2023) al 5,6 % (2025) [1]' },
      { anio: '2025', objetivo: 'Parte de dsm-firmenich en la Feed Enzyme Alliance', importe: 1519.8, ev_ebitda: 21.4, financiacion: 'Deuda (puente de 1.470 M EUR refinanciado con bonos en marzo de 2026)', resultado: 'Aporta ~0,25 p.p. de margen en 2026; 3 % de crecimiento por perímetro en el 1S26 [2, 5]' },
      { anio: '2026', objetivo: 'Plumino Precision Fermentation (planta en Rayong, Tailandia)', importe: 41.3, ev_ebitda: null, financiacion: 'Caja', resultado: 'Capacidad en el sudeste asiático [2]' },
      { anio: '2026', objetivo: '77 % restante de MicroBioGen (levaduras, Australia)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pendiente de la ACCC [2]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'flujos', campo: 'adquisiciones 2021-2023', tipo: 'Complemento', intentos: '1) XBRL ESEF de 2022 y 2023 (sin concepto de compras sin dimensiones); 2) resumen de cinco años del informe 2025 (solo inversión neta sin compras); 3) no derivable sin la nota de flujos en DKK', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Novonesis Annual Report 2025: estrategia 2030 (6-9 % de crecimiento orgánico, ~39 % de margen, ~16 % de ROIC sin fondo de comercio), riesgos, segmentos', editor: 'Novonesis', tipo: 'Primaria', fecha: '2026-02-25', url: URL_AR25 },
  { id: 2, titulo: 'Industrial Enzymes Market worth USD 12.01 billion by 2030 (8,42 mil M USD en 2025, TCAC 7,3 %)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketsandmarkets.com/ResearchInsight/emerging-trends-in-industrial-enzymes-market.asp' },
  { id: 3, titulo: 'Global Industrial Enzymes Strategic Industry Report (7,7 mil M USD en 2024; 11,3 mil M USD en 2030, TCAC 6,6 %)', editor: 'Research and Markets (Business Wire)', tipo: 'Sectorial', fecha: '2025-04-23', url: 'https://www.businesswire.com/news/home/20250423021482/en' },
  { id: 4, titulo: 'Interim report H1 2026: crecimiento por área, precio (+2 p.p.), sinergias (+1 p.p.), salida de países', editor: 'Novonesis', tipo: 'Primaria', fecha: '2026-08-19', url: URL_H126 },
  { id: 5, titulo: 'Symrise AG: previsiones financieras (ventas, EBITDA, BPA 2025-2027)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/SYMRISE-AG-534094/finances/' },
  { id: 6, titulo: 'DSM-Firmenich: previsiones financieras 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/DSM-FIRMENICH-153767454/finances/' },
  { id: 7, titulo: 'International Flavors & Fragrances: previsiones financieras 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/INTERNATIONAL-FLAVORS-FRA-13047/finances/' },
  { id: 8, titulo: 'Kerry Group: previsiones financieras 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/KERRY-GROUP-PLC-1412391/finances/' },
  { id: 9, titulo: 'Givaudan: previsiones financieras 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/GIVAUDAN-SA-2956033/finances/' },
  { id: 10, titulo: 'Croda International: previsiones financieras 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/CRODA-INTERNATIONAL-PLC-57672075/finances/' },
  { id: 11, titulo: 'dsm-firmenich announces agreement to divest Animal Nutrition & Health to CVC Capital Partners (2.200 M EUR, ~7x EBITDA ajustado)', editor: 'dsm-firmenich', tipo: 'Primaria', fecha: '2026-02-09', url: 'https://www.dsm-firmenich.com/anh/news/press-releases/2026/2026-02-09-dsm-firmenich-announces-agreement-to-divest-animal-nutrition-and-health-to-cvc-capital-partners.html' },
];
guarda('B', {
  _estado: 'completa',
  sector: { confianza: 'Media' },
  competencia: {
    competidores: [
      { nombre: 'IFF (Health & Biosciences)', pais: 'EE. UU.', ticker: 'IFF', ingresos: 6778, cuota_pct: null, margen_ebit_pct: 12.8, comentario: 'Antigua Genencor/DuPont: segundo en enzimas industriales; grupo de 7.588 M USD de ventas en 2026e tras vender Pharma Solutions [7]. Ingresos = grupo 2026e en EUR; margen EBIT del grupo 2026e.' },
      { nombre: 'DSM-Firmenich', pais: 'Suiza/Países Bajos', ticker: 'DSFIR', ingresos: 9297, cuota_pct: null, margen_ebit_pct: 14.2, comentario: 'Cultivos, enzimas alimentarias, HMO y vitaminas; vende Animal Nutrition & Health a CVC [6, 11]. Grupo 2026e.' },
      { nombre: 'Kerry Group', pais: 'Irlanda', ticker: 'KRZ', ingresos: 6831, cuota_pct: null, margen_ebit_pct: 14.1, comentario: 'Sabor y nutrición; compró el negocio de lactasa que Novonesis tuvo que vender por la fusión [8]. Grupo 2026e.' },
      { nombre: 'Givaudan', pais: 'Suiza', ticker: 'GIVN', ingresos: 8343, cuota_pct: null, margen_ebit_pct: 17.9, comentario: 'Aromas y fragancias; compite en ingredientes de alimentos, no en enzimas [9]. Ventas 2026e en EUR (7.784 M CHF).' },
      { nombre: 'Symrise', pais: 'Alemania', ticker: 'SY1', ingresos: 5029, cuota_pct: null, margen_ebit_pct: 15.9, comentario: 'Aromas, nutrición de mascotas y probióticos (Probi) [5]. 2026e.' },
      { nombre: 'AB Enzymes (AB Foods)', pais: 'Reino Unido', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enzimas para panadería, piensos y textil dentro de Associated British Foods; no publica cifras separadas.' },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-06', objetivo: 'Parte de dsm-firmenich en la Feed Enzyme Alliance', comprador: 'Novonesis', ev: 1500, ev_ventas: null, ev_ebitda: 21.4, prima_pct: null, excluir: false, comentario: '1.500 M EUR por ~70 M EUR de EBITDA ajustado del primer año completo (cálculo propio) [5 de A].' },
      { fecha: '2026-02', objetivo: 'Animal Nutrition & Health de dsm-firmenich', comprador: 'CVC Capital Partners', ev: 2200, ev_ventas: null, ev_ebitda: 7.0, prima_pct: null, excluir: false, comentario: 'Vitaminas y premezclas, negocio cíclico de menor margen; incluye pago variable de hasta 500 M EUR [11].' },
      { fecha: '2024-03', objetivo: 'Pharma Solutions de IFF', comprador: 'Roquette', ev: 2547, ev_ventas: 2.5, ev_ebitda: 13.0, prima_pct: null, excluir: false, comentario: 'Hasta 2.850 M USD (~13x EBITDA según IFF) por ~1.000 M USD de ventas; excipientes y celulósicos.' },
      { fecha: '2022-12', objetivo: 'Chr. Hansen (fusión con Novozymes)', comprador: 'Novozymes', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 49, excluir: false, comentario: 'Canje de acciones con una prima del 49 % para los accionistas de Chr. Hansen; múltiplo no publicado.' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [],
});

// ---------------------------------------------------------------- C. Gobierno
const fC = [
  { id: 1, titulo: 'Novonesis Annual Report 2025: Corporate governance, Board of Directors, Executive Management, Summary of the Remuneration Report, Shareholder information', editor: 'Novonesis', tipo: 'Primaria', fecha: '2026-02-25', url: URL_AR25 },
  { id: 2, titulo: 'Interim report H1 2026: recompra de 1.000 M EUR y participación de Novo Holdings vendiendo acciones', editor: 'Novonesis', tipo: 'Primaria', fecha: '2026-08-19', url: URL_H126 },
];
const consejo = [
  ['Cees de Jong', 'Presidente', 'Independiente', '2020', 'Nombramientos y Remuneración (presidente); Auditoría'],
  ['Heine Dalsgaard', 'Vicepresidente', 'Otro externo', '2020', 'Auditoría'],
  ['Lise Kaae', 'Consejera', 'Independiente', '2024', 'Auditoría (presidenta)'],
  ['Monila Kothari', 'Consejera', 'Independiente', '2025', 'Innovación'],
  ['Kasim Kutay', 'Consejero (CEO de Novo Holdings)', 'Dominical', '2017', 'Nombramientos y Remuneración'],
  ['Kevin Lane', 'Consejero', 'Independiente', '2024', 'Innovación'],
  ['Morten Otto Alexander Sommer', 'Consejero', 'Independiente', '2022', 'Innovación (presidente)'],
  ['Kim Stratton', 'Consejera', 'Independiente', '2017', 'Nombramientos y Remuneración'],
  ['Robert Nøddeskov Jensen', 'Consejero elegido por los empleados', 'Otro externo', '2025', '—'],
  ['Preben Nielsen', 'Consejero elegido por los empleados', 'Otro externo', '2025', 'Nombramientos y Remuneración'],
  ['Lars Bo Køppler', 'Consejero elegido por los empleados', 'Otro externo', '2021', 'Innovación'],
  ['Frederikke Rose Spenner', 'Consejera elegida por los empleados', 'Otro externo', '2025', '—'],
].map(([nombre, cargo, tipo, desde, comisiones]) => ({ nombre, cargo, tipo, desde, comisiones }));
guarda('C', {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Ester Baiget', cargo: 'Presidenta y consejera delegada', desde: '2020', participacion_pct: null, trayectoria: 'Ingeniera química y MBA (Tarragona); llegó de Dow en 2020 como CEO de Novozymes y dirigió la fusión con Chr. Hansen. Bajo su mando el margen EBITDA ajustado pasó del 33,2 % (2023, Novozymes) al 37,1 % (2025) [1].' },
      { nombre: 'Rainer Lehmann', cargo: 'Director financiero', desde: '2023', participacion_pct: null, trayectoria: 'CFO de Novozymes desde 2023 y de Novonesis tras la fusión; refinanció en marzo de 2026 la compra de la Feed Enzyme Alliance con 1.700 M EUR en bonos y obtuvo el A- de S&P [1, 2].' },
      { nombre: 'Cees de Jong', cargo: 'Presidente del consejo', desde: '2023', participacion_pct: null, trayectoria: 'Exdirectivo de la industria alimentaria e ingredientes; vicepresidente de Novo Nordisk; consejero desde 2020 y presidente desde 2023 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento orgánico 5-8 % (inicial), margen EBITDA ajustado 37-38 %', real: '7 % y 37,1 %', cumplida: 'Sí' },
      { anio: '2024', guia: 'Crecimiento orgánico 6-8 %, margen 35-36 % (inicial)', real: '8 % y 36,2 % (pro forma)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento orgánico 5-7 %, elevado a 7-8 % en agosto; margen 37-38 %, ahora en la parte alta', real: '1S26: 8 % y 37,7 %', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo,
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.93, fijo: 1.77, variable_corto: 2.36, variable_largo: 1.80, ratio_salario_medio: 61 },
    accionistas: [
      { nombre: 'Novo Holdings A/S (Fundación Novo Nordisk)', pct: 25.5, tipo: 'Control: todas las acciones A (20 votos) y acciones B; 63,4 % de los votos', variacion: 'Venderá en la recompra para quedarse en ~25,5 % [2]' },
      { nombre: 'Autocartera', pct: 0.4, tipo: 'Autocartera', variacion: '2,05 M de acciones a 30-jun-2026 (0,5 % a dic-25) [2]' },
      { nombre: 'Inversores institucionales (50 mayores, incluido Novo Holdings)', pct: null, tipo: 'Institucional', variacion: '~65 % de las acciones B; ~70 % de las B fuera de Dinamarca [1]' },
    ],
    insiders: [],
    alertas: [
      'Doble clase: las acciones A (todas de Novo Holdings) votan 10 veces más que las B; Novo Holdings decide la junta con el 25,5 % del capital [1].',
      'El presidente es también vicepresidente de Novo Nordisk, controlada por el mismo accionista [1].',
      'Operación vinculada: Novo Holdings venderá acciones en la recompra de 1.000 M EUR para mantener su 25,5 % [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) informe anual 2025 (sin resultados de voto); 2) acta de la junta de marzo de 2026 no localizada en la web de inversores; 3) MFN/Nasdaq sin el acta', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) MFN, avisos «trading by management» (no revisados uno a uno por tiempo); 2) Finanstilsynet sin búsqueda directa; 3) informe anual (solo participaciones en el informe de remuneración)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado
const fD = [
  { id: 1, titulo: 'Históricos diarios de NSIS-B.CO, ^OMXC25 y EXV7.DE hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/NSIS-B.CO/history' },
  { id: 2, titulo: 'Novonesis A/S: previsiones financieras (ventas, EBITDA, EBIT, beneficio, BPA, deuda neta 2023-2028) y consenso (15 analistas, objetivo medio 499,33 DKK)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/NOVONESIS-A-S-1412985/finances/' },
  { id: 3, titulo: 'Rendimiento del Bund a 10 años (serie diaria BBSIS): 3,51 % el 14-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 4, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, octubre de 2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Tipos de referencia del euro del 14-oct-2026 (DKK 7,4754; CHF 0,9330; USD 1,1195; GBP 0,84385)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Novonesis (Novozymes) kursmål og anbefaling 2026/2027 (objetivo medio 491,93 DKK, 7-sep-2026)', editor: 'tradedesk.dk', tipo: 'Analistas', fecha: '2026-09-07', url: 'https://tradedesk.dk/stock/nsis-b.co' },
  { id: 7, titulo: 'Results and events: calendario financiero (9M 2026 el 5-nov-2026)', editor: 'Novonesis', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.novonesis.com/en/investors/results-and-events' },
  ...fB.slice(4, 10).map((f, i) => ({ ...f, id: 8 + i })),
];
// Comparables: cifras de MarketScreener del 14-oct-2026 en EUR (BCE). Capitalización = beneficio 2026e ÷ BPA 2026e × precio.
const comp = (nombre, ticker, pais, fx, precio, v, e, n, bpa, dn, fcf, roic) => {
  const acc = n[0] / bpa[0];
  const cap = (acc * precio) / fx;
  const ev = cap + dn / fx;
  const ebLtm = (e[0] + e[1]) / 2 / fx, ebNtm = (0.2 * e[1] + 0.8 * e[2]) / fx, vNtm = (0.2 * v[1] + 0.8 * v[2]) / fx;
  const bpaNtm = 0.2 * bpa[0] + 0.8 * bpa[1];
  return { nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: Math.round((ev / vNtm) * 100) / 100, ev_ebitda_ltm: r1(ev / ebLtm), ev_ebitda_ntm: r1(ev / ebNtm), per_ntm: r1(precio / bpaNtm), crecimiento_pct: r1((v[2] / v[1] - 1) * 100), margen_ebitda_pct: r1((e[1] / v[1]) * 100), roic_pct: roic, dn_ebitda: Math.round((dn / e[1]) * 100) / 100, fcf_yield_pct: r1((fcf / fx / cap) * 100) };
};
const empresas = [
  // ventas [2025, 2026, 2027], EBITDA [2025, 2026, 2027], beneficio [2026], BPA [2026, 2027], deuda neta 2026, FCF 2026
  comp('Symrise', 'SY1', 'DE', 1, 96.98, [4929, 5029, 5259], [1081, 1095, 1165], [539.6], [3.84, 4.363], 1736, 637.8, 7.0),
  comp('Givaudan', 'GIVN', 'CH', 0.933, 3825, [7472, 7784, 8197], [1751, 1782, 1923], [1047], [112.3, 129.5], 3552, 1026, 14.2),
  comp('DSM-Firmenich', 'DSFIR', 'NL', 1, 104.0, [9297, 9297, 9765], [1812, 1812, 1972], [514], [2.027, 2.853], 3465, 776.9, null),
  comp('IFF', 'IFF', 'US', 1.1195, 88.54, [7588, 7588, 7837], [1580, 1580, 1703], [450.5], [1.735, 2.472], 5672, 491.9, null),
  comp('Kerry Group', 'KRZ', 'IE', 1, 91.3, [6758, 6831, 7172], [1208, 1260, 1355], [718.9], [4.472, 5.119], 1981, 710, 9.4),
  comp('Croda', 'CRDA', 'GB', 0.84385, 35.43, [1699, 1771, 1856], [396.6, 427.6, 470], [183.9], [1.34, 1.58], 475, 170, null),
];
// DSM-Firmenich e IFF: PER sobre BPA NIIF lastrado por amortizaciones de compras y partidas de desinversiones; fuera de la mediana del PER.
for (const e of empresas) if (e.ticker === 'DSFIR' || e.ticker === 'IFF') e.per_ntm = null;
guarda('D', {
  _estado: 'completa',
  // Precio en EUR (divisa de las cuentas): cierre de 449,00 DKK del 14-oct-2026 ÷ 7,4754 DKK/EUR (BCE) [1, 5].
  identificacion: { precio: 60.06, fecha_precio: '2026-10-14', max_52s: 62.2, min_52s: 45.05, volumen_medio_diario: '≈ 248 M DKK/día (≈ 33 M EUR; 3 meses) [1]', proximos_resultados: '2026-11-05' },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: r1(33381 / 7.4754), ebitda: r1(12586 / 7.4754), ebit: r1(7885 / 7.4754), bpa: 2.11, dpa: r1((7.29 / 7.4754) * 100) / 100, fuente: 'MarketScreener, 15 analistas, en DKK pasado a EUR; BPA llevado a la base sin PPA (BPA NIIF 11,83 DKK = 1,58 EUR + ~0,53 EUR de amortización PPA neta de impuestos, estimación propia) [2]' },
      { periodo: '2027e', ingresos: r1(35923 / 7.4754), ebitda: r1(13779 / 7.4754), ebit: r1(9135 / 7.4754), bpa: 2.36, dpa: r1((8.156 / 7.4754) * 100) / 100, fuente: 'MarketScreener [2]; BPA NIIF 13,70 DKK = 1,83 EUR + ~0,53 EUR de PPA neta (estimación propia)' },
      { periodo: '2028e', ingresos: r1(38524 / 7.4754), ebitda: r1(14941 / 7.4754), ebit: r1(10208 / 7.4754), bpa: 2.62, dpa: r1((8.644 / 7.4754) * 100) / 100, fuente: 'MarketScreener [2]; BPA NIIF 15,71 DKK = 2,10 EUR + ~0,52 EUR de PPA neta (estimación propia)' },
    ],
    recomendaciones: { n_analistas: 15, comprar: null, mantener: null, vender: null, po_medio: r1(499.33 / 7.4754 * 100) / 100, po_min: null, po_max: null },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: (() => { const bj = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8')).bolsa; return { tipo_rentabilidad: bj.tipo_rentabilidad, rentabilidades: bj.rentabilidades, anual: bj.anual.filter((x) => +x.anio >= 2017), beta: bj.beta, volatilidad_pct: bj.volatilidad_pct, max_drawdown_pct: bj.max_drawdown_pct, posicion_corta_pct: null, confianza: 'Alta' }; })(),
  // Cierres de año en EUR (DKK ÷ EUR/DKK del BCE al cierre) [1, 5].
  multiplos_historicos: { serie: [['2021', 537.2, 7.4364], ['2022', 351.9, 7.4365], ['2023', 371.1, 7.4529], ['2024', 407.7, 7.4578], ['2025', 407.8, 7.4685]].map(([anio, dkk, fx]) => ({ anio, precio_cierre: Math.round((dkk / fx) * 100) / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: anio === '2021' })), confianza: 'Media' },
  comparables: { empresas, confianza: 'Media' },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'recomendaciones (desglose comprar/mantener/vender, mínimo y máximo)', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «Comprar» y 15 analistas); 2) tradedesk.dk (objetivo medio 491,93 DKK); 3) BioStock (403)', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Feed de Seeking Alpha de NVZMY (titulares de resultados 2T26, transcripción, análisis «Still Too Expensive» y «Industry Leader With Defensive Characteristics»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-20', url: 'https://seekingalpha.com/api/sa/combined/NVZMY.xml' },
  { id: 2, titulo: 'Er Novonesis for dyr? (artículo actualizado el 10-oct-2026)', editor: 'aktietip.dk', tipo: 'Foros y redes', fecha: '2026-10-10', url: 'https://aktietip.dk/er-novonesis-for-dyr/' },
  { id: 3, titulo: 'Bør man eje Novonesis for enhver pris?', editor: 'aktietip.dk', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://aktietip.dk/boer-man-eje-novonesis-for-enhver-pris/' },
  { id: 4, titulo: 'Novonesis (Novozymes) kursmål og anbefaling 2026/2027', editor: 'tradedesk.dk', tipo: 'Foros y redes', fecha: '2026-09-07', url: 'https://tradedesk.dk/stock/nsis-b.co' },
  { id: 5, titulo: 'Stocktwits, flujo de NVZMY (sin mensajes en la API)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/NVZMY.json' },
];
guarda('E', {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (feed de NVZMY)', fecha: '2026-08', n_comentarios: 12, tono: 'Neutro', resumen: 'Sin artículos de opinión nuevos en tres meses: solo resultados del 2T26 (subida de la guía y recompra de 1.000 M EUR) y la transcripción; los últimos análisis de autores oscilan entre «demasiado cara» y «líder defensivo» [1].' },
      { plataforma: 'aktietip.dk (blog danés para particulares)', fecha: '2026-10', n_comentarios: 2, tono: 'Dividido', resumen: 'La pregunta que repite es si la acción está cara: PER de 35 veces para 2026 frente a una cuota cercana al 50 % en enzimas; defendible solo a muy largo plazo [2, 3].' },
      { plataforma: 'tradedesk.dk (agregador danés)', fecha: '2026-09', n_comentarios: 1, tono: 'Positivo', resumen: 'Objetivo medio de 491,93 DKK en septiembre, un 12 % sobre el precio de entonces, con subidas desde agosto [4].' },
      { plataforma: 'Stocktwits (NVZMY)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'Sin debate: la API no devuelve mensajes; el particular estadounidense apenas sigue el ADR [5].' },
    ],
    temas: [
      { tema: 'Valoración exigente (PER de 35 veces el BPA NIIF)', postura: 'Bajista', peso: 'Alto', contraste: null },
      { tema: 'Crecimiento orgánico del 7-8 % y subida de la guía', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Recompra de 1.000 M EUR hasta 2029', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Novo Holdings y el «sello Novo» tras la caída de Novo Nordisk', postura: 'Dividida', peso: 'Bajo', contraste: null },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
});
console.log('Notas A-E escritas en', dir);
