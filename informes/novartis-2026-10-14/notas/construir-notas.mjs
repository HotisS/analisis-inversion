// Escribe las notas A-E de Novartis (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
// Entorno nube: solo WebSearch. Cada cifra lleva la URL de la página que la publica. Divisa de las cuentas: USD.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2), 'utf8');
const SIN_RED = 'entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red)';

// ---------------------------------------------------------------- A. Cuentas
// Stock Analysis (NVS, millones de USD, operaciones continuadas: 2021-2022 reexpresados sin Sandoz).
// EBITDA = resultado de explotación + amortizaciones y depreciaciones (incluye la amortización de intangibles).
const fila = (periodo, ingresos, ebit, amort, beneficio, extra = {}) => ({
  periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda: ebit + amort, amortizaciones: amort, ebit,
  resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: beneficio, gastos_financieros: null,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null, ...extra,
});
const A = {
  _estado: 'completo con huecos',
  negocio: {
    segmentos: [],
    kpis: [
      { kpi: 'Ventas netas (M USD)', valor_anterior: '50.300 (2024)', valor_actual: '54.500 (2025)', variacion: '+8 % a tipo constante', comentario: 'Volumen +15 puntos, genéricos −6 y precio −1 [1].' },
      { kpi: 'Margen operativo core', valor_anterior: '38,7 % (2024)', valor_actual: '40,1 % (2025)', variacion: '+1,4 puntos', comentario: 'En el 2T26, 41,2 % [1, 9, 2].' },
      { kpi: 'BPA core (USD)', valor_anterior: '7,81 (2024)', valor_actual: '8,98 (2025)', variacion: '+15 % en USD', comentario: '1S26: 4,39 USD (−6 % en USD) por los genéricos de Entresto [1, 2].' },
      { kpi: 'Kisqali, ventas trimestrales (M USD)', valor_anterior: '≈1.180 (2T25)', valor_actual: '1.700 (2T26)', variacion: '+44 %', comentario: 'Primer motor de crecimiento; en el 1T26, 1.520 M (+59 %) [12, 3].' },
      { kpi: 'Entresto, ventas trimestrales (M USD)', valor_anterior: '≈2.400 (2T25)', valor_actual: '1.200 (2T26)', variacion: '−50 %', comentario: 'Genéricos en EE. UU. desde mediados de 2025 [12].' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '16.253 (2024)', valor_actual: '17.596 (2025)', variacion: '+8 %', comentario: 'Últimos 12 meses a jun-26: 16.763 M [1, 5].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    cuenta: [
      fila('2021', 43974, 10056, 5559, 22905),
      fila('2022', 43461, 7946, 6965, 6049),
      fila('2023', 46660, 9769, 8383, 8572),
      fila('2024', 51722, 14544, 6114, 11939),
      fila('2025', 56674, 17644, 5275, 13984, { resultado_financiero: -1292, bai: 16352, impuestos: 2385, minoritarios: -17, bpa: 7.15, dpa: 4.63, acciones_diluidas: 1955 }),
    ],
    ltm: { periodo: 'LTM dic-25', fecha_fin: '2025-12-31', ingresos: 56674, ebitda: 22919, ebit: 17644, beneficio_neto: 13984, bpa: 7.15, dpa: 4.63, dpa_extraordinario: 0, fcf: 17596, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Escisión de Sandoz (genéricos) en octubre de 2023: la cuenta de 2021-2022 está reexpresada sin Sandoz (operaciones continuadas), pero el balance de 2021-2022 la incluye.' },
    ],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '4T25', ingresos: null, crecimiento_pct: 1, crecimiento_organico_pct: -1, ebitda: null, margen_ebitda_pct: null, bpa: 2.03, vs_consenso: null },
      { periodo: '1T26', ingresos: 13100, crecimiento_pct: -1, crecimiento_organico_pct: -5, ebitda: null, margen_ebitda_pct: null, bpa: 1.99, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 14400, crecimiento_pct: 3, crecimiento_organico_pct: 1, ebitda: null, margen_ebitda_pct: null, bpa: 2.41, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    // Activo total = pasivo total + patrimonio (Stock Analysis). Deuda = deuda a largo plazo (sin la de corto: hueco); 2025, deuda neta de la empresa + caja.
    historico: [
      { periodo: '2021', activo_total: 131795, activo_corriente: null, pasivo_corriente: null, pasivo_total: 63973, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: 8005, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 12407, deuda_financiera: 22902, arrendamientos: null, patrimonio_neto: 67822, minoritarios: null, reservas: null },
      { periodo: '2022', activo_total: 117453, activo_corriente: null, pasivo_corriente: null, pasivo_total: 58030, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: 8066, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 7517, deuda_financiera: 20244, arrendamientos: null, patrimonio_neto: 59423, minoritarios: null, reservas: null },
      { periodo: '2023', activo_total: 99945, activo_corriente: null, pasivo_corriente: null, pasivo_total: 53195, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: 7107, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 13393, deuda_financiera: 18436, arrendamientos: null, patrimonio_neto: 46750, minoritarios: null, reservas: null },
      { periodo: '2024', activo_total: 102246, activo_corriente: null, pasivo_corriente: null, pasivo_total: 58120, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: 7423, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 11459, deuda_financiera: 21366, arrendamientos: null, patrimonio_neto: 44126, minoritarios: null, reservas: null },
      { periodo: '2025', activo_total: 110949, activo_corriente: null, pasivo_corriente: null, pasivo_total: 64400, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: 8937, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 11435, deuda_financiera: 33335, arrendamientos: null, patrimonio_neto: 46549, minoritarios: null, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja de 11.435 M USD a dic-25 [6]; deuda neta de 21.900 M a dic-25 y de 39.400 M a jun-26 tras pagar Avidity (≈12.000 M) y el dividendo [11, 15].',
    rating: null,
    coste_deuda_pct: null,
    vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: {
    // Flujo operativo, recompras y dividendos: Chartrow (de los 20-F, en miles de millones); capex = flujo operativo − flujo libre de Stock Analysis.
    historico: [
      { periodo: '2023', flujo_operativo: 14500, capex: 1102, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7250, recompras: 8520, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 17600, capex: 1347, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7620, recompras: 8450, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 19100, capex: 1504, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: 7820, recompras: 9120, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    confianza: 'Media',
  },
  calidad: { auditor: null, anios_auditor: null, opinion: null, senales: [], confianza: 'Baja' },
  capital: {
    adquisiciones: [
      { anio: '2021', objetivo: 'Venta a Roche del 33 % de sus acciones al portador (53,3 M de acciones)', importe: -19024, ev_ebitda: null, financiacion: 'Desinversión (19.024 M CHF cobrados)', resultado: 'Plusvalía que infla el beneficio de 2021; la caja financió recompras [16].' },
      { anio: '2023', objetivo: 'Escisión de Sandoz (genéricos y biosimilares) a sus accionistas', importe: null, ev_ebitda: null, financiacion: 'Escisión sin caja', resultado: 'Novartis queda como farmacéutica pura de medicamentos innovadores; el margen core sube de ≈36 % a 40 % en dos años [1, 10].' },
      { anio: '2026', objetivo: 'Avidity Biosciences (ARN dirigido a músculo: DM1, FSHD, Duchenne)', importe: 12000, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Cerrada el 27-feb-2026 (72 USD por acción; valor empresa ≈11.000 M). En septiembre, del-desiran (DM1), su activo principal, falló la fase III HARBOR: riesgo de deterioro [15, B3].' },
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Novartis delivered high single-digit sales growth, achieved 40% core margin and further advanced the pipeline in 2025 (ad hoc, resultados 2025)', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://www.novartis.com/news/media-releases/novartis-delivered-high-single-digit-sales-growth-achieved-40-core-margin-and-further-advanced-pipeline-2025' },
    { id: 2, titulo: 'Q2 2026 media release: Novartis delivered sales growth in Q2 and further advanced the pipeline; full-year guidance reaffirmed', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-07-21', url: 'https://prod1.novartis.com/sites/novartis_com/files/q2-2026-media-release-en.pdf' },
    { id: 3, titulo: 'Q1 2026 media release', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://prod1.novartis.com/sites/novartis_com/files/q1-2026-media-release-en.pdf' },
    { id: 4, titulo: 'Novartis AG (NVS): income statement (ingresos, resultado de explotación y beneficio 2021-2025)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-07-28', url: 'https://stockanalysis.com/stocks/nvs/financials/income-statement/' },
    { id: 5, titulo: 'Novartis AG (NVS): cash flow statement (amortizaciones y flujo libre 2021-2025 y LTM)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://stockanalysis.com/stocks/nvs/financials/cash-flow-statement/' },
    { id: 6, titulo: 'Novartis AG (NVS): balance sheet 2021-2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-07', url: 'https://stockanalysis.com/stocks/nvs/financials/balance-sheet/' },
    { id: 7, titulo: 'NVS financial statements (flujo operativo, recompras y dividendos de los 20-F)', editor: 'Chartrow', tipo: 'Datos de mercado', fecha: '2026', url: 'https://chartrow.com/quote/nvs/financials' },
    { id: 8, titulo: 'Form 6-K: estados financieros consolidados 2025 (BAI 16.352 M, impuestos 2.385 M, BPA diluido 7,15)', editor: 'Novartis / SEC', tipo: 'Primaria', fecha: '2026-02-04', url: 'https://www.sec.gov/Archives/edgar/data/1114448/000111444826000008/a260204-99_1.pdf' },
    { id: 9, titulo: 'Q4 2024 media release: ventas 50.300 M, BPA core 7,81, flujo libre 16.300 M', editor: 'Novartis', tipo: 'Primaria', fecha: '2025-01-31', url: 'https://novartis.com/sites/novartis_com/files/q4-2024-media-release-en.pdf' },
    { id: 10, titulo: 'Form 6-K FY2023: ventas continuadas 45.400 M, BPA core 6,47 (+18 % en USD), flujo libre 13.200 M', editor: 'Novartis / SEC', tipo: 'Primaria', fecha: '2024-01-31', url: 'https://www.sec.gov/Archives/edgar/data/1114448/000137036824000007/a240131-99_1.htm' },
    { id: 11, titulo: 'Novartis Aktie: Verschuldung verdoppelt sich (deuda neta 39.400 M a jun-26; quedan 5.600 M de la recompra de 10.000 M)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.boerse-express.com/news/articles/novartis-aktie-verschuldung-verdoppelt-sich-930795' },
    { id: 12, titulo: 'Novartis Aktie: Entresto-Umsatz um 42 Prozent eingebrochen (1T26: Kisqali 1.520 M)', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.boerse-express.com/news/articles/novartis-aktie-entresto-umsatz-um-42-prozent-eingebrochen-899232' },
    { id: 13, titulo: 'Novartis Q2 2026: ingresos 14.400 M (esperado 14.100), BPA core 2,41 (esperado 2,20)', editor: 'Newsquawk', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://www.newsquawk.com/headlines/novartis-novn-sw---q2-2026-usd-net-revenue-144bln-exp-141bln-core-eps-241-exp-220-operating-income-475bln-prev-486bln-yy-net-income-326bln-prev-402bln-yy-backs-fy26-view' },
    { id: 14, titulo: 'Novartis Q1 2026: BPA core 1,99 (esperado 2,11), ingresos 13.100 M (esperado 13.600)', editor: 'Newsquawk', tipo: 'Prensa', fecha: '2026-04-28', url: 'https://www.newsquawk.com/headlines/novartis-novn-sw-q1-2026-usd-core-eps-199-exp-211-revenue-131bln-exp-136bln-adj-op-income-49bln-exp-509bln-reaffirms-2026-guidance-' },
    { id: 15, titulo: 'Novartis successfully completes acquisition of Avidity Biosciences (27-feb-2026)', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-02-27', url: 'https://www.novartis.com/news/media-releases/novartis-successfully-completes-acquisition-avidity-biosciences-strengthening-late-stage-neuroscience-pipeline-and-advancing-xrna-strategy' },
    { id: 16, titulo: 'Roche to repurchase equity stake held by Novartis (19.024 M CHF)', editor: 'Roche', tipo: 'Primaria', fecha: '2021-11-04', url: 'https://www.roche.com/investors/updates/inv-update-2021-11-04' },
    { id: 18, titulo: 'Dividend information: 3,70 CHF por acción por 2025 (+5,7 %, 29.ª subida seguida; ≈8.900 M USD al cambio del 31-dic-2025)', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://www.novartis.com/investors/share-data-analysis/dividend-information' },
    { id: 17, titulo: 'Novartis (NOVN) Q2 2026 earnings summary (guía del 2S: ventas de un dígito medio)', editor: 'Quartr', tipo: 'Prensa', fecha: '2026-07-21', url: 'https://quartr.com/events/novartis-ag-novn-q2-2026_36kHrICq' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'coste de ventas, gastos generales, resultado financiero, impuestos, BPA y acciones de 2021-2024', tipo: 'Complemento', intentos: `1) 20-F 2025 y comunicados anuales: la búsqueda solo devuelve cifras de cabecera; 2) Stock Analysis: el extracto da ingresos, resultado de explotación, beneficio y amortizaciones; 3) AlphaQuery y Chartrow: líneas sin año claro; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'balance', campo: 'activo y pasivo corriente, existencias, proveedores, fondo de comercio, intangibles, deuda a corto y arrendamientos', tipo: 'Complemento', intentos: `1) balance del 20-F 2025: no accesible; 2) Stock Analysis: el extracto corta antes de esas filas; 3) vcpscanner: trimestres sin fecha clara; ${SIN_RED}`, decision: 'Omitido; deuda de 2021-2024 = solo largo plazo (la neta queda infravalorada); 2025 = deuda neta publicada + caja' },
    { seccion: 'flujos', campo: 'flujos de 2021-2022 (operaciones continuadas) y compras de negocios por año', tipo: 'Complemento', intentos: '1) 20-F 2023 (reexpresión sin Sandoz): no accesible; 2) Stock Analysis y Chartrow: 2021-2022 incluyen Sandoz; 3) comunicados de cada compra: importes sueltos sin calendario de pagos', decision: 'Omitido (tres ejercicios de flujos)' },
    { seccion: 'negocio', campo: 'segmentos (Novartis reporta un solo segmento) y ventas por producto y por geografía de 2021-2025', tipo: 'Complemento', intentos: `1) informe anual 2025: no accesible; 2) comunicados trimestrales: solo marcas sueltas; 3) prensa: cifras parciales; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'calidad', campo: 'auditor y opinión', tipo: 'Complemento', intentos: `1) 20-F 2025: no accesible; 2) búsqueda no hecha por cupo compartido; 3) ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  historia: {
    hitos: [
      { anio: '1996', hito: 'Fusión de Ciba-Geigy y Sandoz, la mayor de su tiempo en el sector, que crea Novartis en Basilea.' },
      { anio: '2018', hito: 'Vas Narasimhan, consejero delegado; empieza la reducción a medicamentos innovadores (venta de Alcon en 2019) [C3].' },
      { anio: '2021', hito: 'Vende a Roche su 33 % de acciones al portador por 19.024 M CHF [A16].' },
      { anio: '2023', hito: 'Escisión de Sandoz: Novartis queda como farmacéutica pura [A10].' },
      { anio: '2025', hito: 'Genéricos de Entresto en EE. UU.; margen core del 40,1 % y BPA core de 8,98 USD [A1].' },
      { anio: '2026', hito: 'Compra de Avidity (≈12.000 M USD, febrero); en septiembre fallan pelacarsen (Lp(a)HORIZON) y del-desiran (HARBOR) y la acción cae un 10,9 % en un día [A15, 1, 2].' },
    ],
    confianza: 'Media',
  },
  sector: {
    drivers: [
      { driver: 'Pérdidas de exclusividad', efecto: '−', horizonte: 'Estructural', evidencia: 'Los genéricos restaron 6 puntos al crecimiento de 2025 y Entresto cayó un 50 % en el 2T26 [A1, A12]; Cosentyx, Kisqali y Kesimpta vencen a principios de los años 2030 [4].' },
      { driver: 'Precios de medicamentos en EE. UU.', efecto: '−', horizonte: 'Estructural', evidencia: 'El precio restó 1 punto en 2025 [A1]; el sector cotizó a ≈12x beneficios en el mínimo de 2025 por los acuerdos de nación más favorecida [5].' },
      { driver: 'Nuevos medicamentos en oncología, inmunología y neurociencia', efecto: '+', horizonte: 'Estructural', evidencia: 'El volumen sumó 15 puntos en 2025; Kisqali creció un 44 % en el 2T26 [A1, A2].' },
      { driver: 'Productividad de la I+D en cardiología', efecto: '−', horizonte: 'Cíclico', evidencia: 'Pelacarsen bajó el Lp(a) pero no los episodios cardiovasculares en Lp(a)HORIZON [3].' },
    ],
    confianza: 'Baja',
  },
  competencia: {
    competidores: [
      { nombre: 'Roche', pais: 'Suiza', ticker: 'ROP', ingresos: 79195, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ingresos de 63.356 M CHF en 2025 (≈79.200 M USD a 1,25); margen EBITDA del 34,5 % [5].' },
      { nombre: 'AstraZeneca', pais: 'Reino Unido', ticker: 'AZN', ingresos: 61370, cuota_pct: null, margen_ebit_pct: null, comentario: 'Oncología y cardiometabólico; 61.370 M USD de ventas en 12 meses, margen EBITDA del 33 % [5].' },
      { nombre: 'Merck & Co', pais: 'EE. UU.', ticker: 'MRK', ingresos: 66570, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en oncología; 66.570 M USD, margen EBITDA del 43,4 % [5].' },
      { nombre: 'Sanofi', pais: 'Francia', ticker: 'SAN', ingresos: 55890, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inmunología (Dupixent frente a Cosentyx en dermatología); 55.890 M USD, margen EBITDA del 27,7 % [5].' },
      { nombre: 'Eli Lilly', pais: 'EE. UU.', ticker: 'LLY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Margen EBITDA del 52,4 % y crecimiento del 24 %: la referencia del sector por la obesidad [5].' },
    ],
    confianza: 'Baja',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'Novartis shares fall the most since 2020: what is behind the 10% decline (guía a medio plazo de +5-6 % anual mantenida)', editor: 'XTB', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.xtb.com/en/market-analysis/novartis-shares-fall-the-most-since-2020-what-is-behind-the-10-decline' },
    { id: 2, titulo: 'Novartis loses 24 billion francs in market value in a single day (cierre de 111,80 CHF)', editor: 'blue News', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.bluewin.ch/en/news/novartis-loses-24-billion-francs-in-market-value-in-a-single-day-li.3592726' },
    { id: 3, titulo: 'Novartis announces Lp(a)HORIZON Phase III topline results for pelacarsen', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-09-04', url: 'https://novartis.com/news/media-releases/novartis-announces-lpahorizon-phase-iii-topline-results-pelacarsen-patients-elevated-lpa-and-established-cardiovascular-disease-cvd' },
    { id: 4, titulo: 'Rückschlag für Novartis: so schätzen Analysten den Studienflop bei Pelacarsen ein (Deutsche Bank a Mantener, 120 CHF)', editor: 'cash.ch', tipo: 'Analistas', fecha: '2026-09', url: 'https://www.cash.ch/news/top-news/ruckschlag-fur-novartis-so-schatzen-analysten-den-studienflop-bei-pelacarsen-ein-966520' },
    { id: 5, titulo: 'Comparables farmacéuticos (Stock Analysis y MarketScreener, 8-oct-2026) recogidos en el informe de Roche del 14-oct-2026 del repo', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/' },
    { id: 6, titulo: 'Novartis Phase III misses compound Novo’s cardiovascular setback', editor: 'BioCentury', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.biocentury.com/article/660735/novartis-phase-iii-misses-compound-novo-s-cardiovascular-setback' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado farmacéutico, serie, TCAC, CR5 y Porter', tipo: 'Núcleo', intentos: `1) IQVIA Global Use of Medicines y EvaluatePharma: no accesibles; 2) búsqueda de tamaño de mercado: no hecha por el cupo compartido; 3) informe anual de Novartis: no accesible; ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota de mercado y margen EBIT de los competidores', tipo: 'Núcleo', intentos: '1) informes anuales de los competidores: no accesibles; 2) Stock Analysis da EBITDA, no EBIT; 3) prensa: sin cifras comparables', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG y controversias', tipo: 'Complemento', intentos: `1) MSCI y Sustainalytics: no consultados por cupo; 2) informe de sostenibilidad: no accesible; 3) ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  directivos: {
    equipo: [
      { nombre: 'Vasant (Vas) Narasimhan', cargo: 'Consejero delegado', desde: '2018', participacion_pct: null, trayectoria: 'Médico; antes, director de desarrollo de fármacos del grupo. Ha llevado a Novartis a farmacéutica pura (Alcon en 2019, Sandoz en 2023) y del 36 % al 40 % de margen core [A1, A10].' },
      { nombre: 'Giovanni Caforio', cargo: 'Presidente', desde: '2025', participacion_pct: null, trayectoria: 'Antiguo consejero delegado de Bristol Myers Squibb; reelegido presidente en 2026 con el 97,5 % de los votos [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Ventas: crecimiento de un dígito alto; resultado operativo core: de dos dígitos bajos (tipo constante)', real: 'Ventas +12 % y resultado operativo core +22 % a tipo constante', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas: un dígito alto; resultado operativo core: de dos dígitos bajos', real: 'Ventas +8 %, resultado operativo core +14 % a tipo constante', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas: un dígito bajo; resultado operativo core: caída de un dígito bajo (tipo constante)', real: '1S26: ventas −2 % a tipo constante; guía confirmada en julio, con un 2S de crecimiento de un dígito medio', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Giovanni Caforio', cargo: 'Presidente', tipo: 'Independiente', desde: '2025', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 87.2, voto_remuneracion_contra_pct: 11.6, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [],
    insiders: [],
    alertas: ['Ninguna relevante detectada en los extractos revisados (junta de 2026 con todas las propuestas aprobadas); el informe de remuneración y el de gobierno no se pudieron leer.'],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Novartis AGM 2026 voting results (informe de remuneración 87,9 % a favor y 11,6 % en contra; Caforio 97,5 %)', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://www.novartis.com/sites/novartis_com/files/novartis-agm-2026-voting-results-en.pdf' },
    { id: 2, titulo: 'Novartis shareholders approve all resolutions proposed by the Board of Directors at the 2026 Annual General Meeting', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://novartis.com/news/media-releases/novartis-shareholders-approve-all-resolutions-proposed-board-directors-2026-annual-general-meeting' },
    { id: 3, titulo: 'Novartis AGM 2025 voting results (informe de remuneración 2024: 87,2 % a favor)', editor: 'Novartis', tipo: 'Primaria', fecha: '2025-03-07', url: 'https://prod1.biome.novartis.com/sites/novartis_com/files/novartis-agm-2025-voting-results-en.pdf' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones, remuneración del consejero delegado y accionistas significativos', tipo: 'Núcleo', intentos: `1) Compensation Report 2025 y Corporate Governance Report: no accesibles; 2) SIX (participaciones significativas): sin red; 3) prensa suiza: sin desglose; ${SIN_RED}`, decision: 'Omitido; se usan los votos de la junta' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (insiders)', tipo: 'Complemento', intentos: '1) SIX Management Transactions: anónimas y no accesibles; 2) Form 144 de NVS: sin red a EDGAR; 3) prensa: sin operaciones relevantes', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'director financiero y directores de división', tipo: 'Complemento', intentos: '1) web de Novartis (comité ejecutivo): no accesible; 2) búsqueda no hecha por cupo; 3) comunicados: sin nombres en el extracto', decision: 'Omitido (no se ponen cargos sin comprobar)' },
  ],
};
w('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
// Comparables del informe de Roche (14-oct, que los tomó del de Novo Nordisk del 8-oct): capitalización en DKK × 0,12478 CHF/DKK × 1,25 USD/CHF.
const usd = (capDKK) => Math.round(capDKK * 0.12478 * 1.25);
const comp = (n, t, p, capDKK, o) => ({ nombre: n, ticker: t, pais: p, capitalizacion: usd(capDKK), ...o });
const D = {
  identificacion: {
    nombre: 'Novartis AG', nombre_corto: 'Novartis', ticker: 'NOVN', isin: 'CH0012005267', mercado: 'SIX Swiss Exchange (ADR NVS en la NYSE)', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Salud', industria: 'Farmacéuticas', sede: 'Basilea (Suiza)', fundacion: '1996', empleados: null, web: 'www.novartis.com',
    precio: 140.93, fecha_precio: '2026-10-05', acciones: 1923, capitalizacion_publicada: 271008, free_float_pct: null,
    max_52s: null, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-10-27',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: 8.74, dpa: null, fuente: 'BPA core: 4,39 del 1S26 real + 2,23 (3T26e) + 2,12 (4T26e) del consenso trimestral de Benzinga [A2, 7]' },
      { periodo: '2027e', ingresos: 60000, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Ventas: modelo de VCP Scanner (no es consenso) [16]' },
      { periodo: '2028e', ingresos: 61800, ebitda: null, ebit: null, bpa: null, dpa: null, fuente: 'Ventas: modelo de VCP Scanner [16]' },
    ],
    recomendaciones: { n_analistas: 34, comprar: 17, mantener: 14, vender: 3, po_medio: 128.42, po_min: 95.95, po_max: 150.69 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: { tipo_rentabilidad: 'de precio (sin dividendos)', rentabilidades: [], anual: [
    { anio: '2021', accion_pct: -7.9, indice_pct: null },
    { anio: '2022', accion_pct: 3.6, indice_pct: null },
    { anio: '2023', accion_pct: 17.1, indice_pct: null },
    { anio: '2024', accion_pct: -2.8, indice_pct: null },
    { anio: '2025', accion_pct: 42.3, indice_pct: null },
  ], beta: null, volatilidad_pct: null, max_drawdown_pct: null, posicion_corta_pct: null, confianza: 'Baja' },
  multiplos_historicos: {
    // Cierres de diciembre del ADR NVS en USD (1 ADR = 1 acción), ajustados por la escisión de Sandoz (Tradersunion).
    serie: [
      { anio: '2021', precio_cierre: 82.77, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 85.85, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 100.97, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 97.31, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 138.72, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      comp('Eli Lilly', 'LLY', 'US', 6801297, { ev_ventas: 13.34, ev_ebitda_ltm: 25.5, ev_ebitda_ntm: 20.6, per_ntm: 26.7, crecimiento_pct: 24.4, margen_ebitda_pct: 52.4, roic_pct: 42.2, dn_ebitda: 1.08, fcf_yield_pct: 1.75 }),
      comp('AstraZeneca', 'AZN', 'GB', 1637630, { ev_ventas: 4.44, ev_ebitda_ltm: 13.5, ev_ebitda_ntm: 11.4, per_ntm: 18.3, crecimiento_pct: 7.8, margen_ebitda_pct: 33, roic_pct: 16.1, dn_ebitda: 1.35, fcf_yield_pct: 4.28 }),
      comp('Sanofi', 'SAN', 'FR', 634673, { ev_ventas: 2.05, ev_ebitda_ltm: 7.4, ev_ebitda_ntm: 6.6, per_ntm: 9.9, crecimiento_pct: 0.2, margen_ebitda_pct: 27.7, roic_pct: 9.1, dn_ebitda: 1.27, fcf_yield_pct: 11.66 }),
      comp('Merck & Co', 'MRK', 'US', 2301234, { ev_ventas: 5.88, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: 13.3, per_ntm: 20.9, crecimiento_pct: 4.3, margen_ebitda_pct: 43.4, roic_pct: 14.1, dn_ebitda: 1.62, fcf_yield_pct: 4.56 }),
      comp('GSK', 'GSK', 'GB', 618304, { ev_ventas: 2.54, ev_ebitda_ltm: 7.8, ev_ebitda_ntm: 6.9, per_ntm: 11.7, crecimiento_pct: 5.4, margen_ebitda_pct: 32.6, roic_pct: 26.4, dn_ebitda: 1.4, fcf_yield_pct: 9.63 }),
      { nombre: 'Novo Nordisk', ticker: 'NOVO B', pais: 'DK', capitalizacion: 167628, ev_ventas: 3.64, ev_ebitda_ltm: 6.9, ev_ebitda_ntm: null, per_ntm: 11.7, crecimiento_pct: -2.7, margen_ebitda_pct: 52.7, roic_pct: 39.2, dn_ebitda: 0.55, fcf_yield_pct: 6.9 },
      // Roche: cifras calculadas en su informe del 14-oct (capitalización 265.976 M CHF × 1,25).
      { nombre: 'Roche', ticker: 'ROP', pais: 'CH', capitalizacion: 332470, ev_ventas: 4.95, ev_ebitda_ltm: 14.3, ev_ebitda_ntm: 12.8, per_ntm: 15.5, crecimiento_pct: 1.6, margen_ebitda_pct: 34.5, roic_pct: 27.1, dn_ebitda: 1.1, fcf_yield_pct: 5.7 },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Why Novartis AG’s (NVS) stock is down 12.46% (cierre de 140,93 USD el 5-oct-2026)', editor: 'AAII', tipo: 'Datos de mercado', fecha: '2026-10-05', url: 'https://www.aaii.com/investingideas/article/539319-why-novartis-ag8217s-nvs-stock-is-down-1246' },
    { id: 2, titulo: 'Novartis loses 24 billion francs in market value in a single day (111,80 CHF; capitalización de 239.000 a 215.000 M CHF)', editor: 'blue News', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.bluewin.ch/en/news/novartis-loses-24-billion-francs-in-market-value-in-a-single-day-li.3592726' },
    { id: 3, titulo: 'USD to CHF exchange rate history (0,8088 el 5-ago; 1 CHF = 1,2370 USD el 4-sep-2026)', editor: 'OFX', tipo: 'Datos de mercado', fecha: '2026-09-04', url: 'https://www.ofx.com/en-us/exchange-rates/chf-to-usd/' },
    { id: 4, titulo: 'Novartis Kursziel: 27 objetivos, media 128,42 CHF (95,95-150,69); 17 comprar, 14 mantener, 3 vender', editor: 'aktien.guide', tipo: 'Analistas', fecha: '2026-10', url: 'https://aktien.guide/kursziel/Novartis-CH0012005267' },
    { id: 5, titulo: 'Rückschlag für Novartis: so schätzen Analysten den Studienflop bei Pelacarsen ein (Deutsche Bank: Mantener, 140→120 CHF)', editor: 'cash.ch', tipo: 'Analistas', fecha: '2026-09', url: 'https://www.cash.ch/news/top-news/ruckschlag-fur-novartis-so-schatzen-analysten-den-studienflop-bei-pelacarsen-ein-966520' },
    { id: 6, titulo: 'Novartis stock crashed 11% on Tuesday: two failed trials are to blame (23 analistas: 5 comprar, 4 sobreponderar, 10 mantener, 1 infraponderar, 3 vender)', editor: 'TIKR', tipo: 'Analistas', fecha: '2026-09-09', url: 'https://www.tikr.com/blog/novartis-stock-crashed-11-on-tuesday-two-failed-trials-are-to-blame' },
    { id: 7, titulo: 'NVS earnings forecasts (consenso trimestral: 3T26e 2,23; 4T26e 2,12; 1T27e 2,29; 2T27e 2,54 USD)', editor: 'Benzinga', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.benzinga.com/quote/NVS/earnings-forecasts' },
    { id: 8, titulo: 'Novartis (NVS) historical price data: cierres de diciembre 2021-2025 (82,77; 85,85; 100,97; 97,31; 138,72 USD)', editor: 'Traders Union', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://tradersunion.com/currencies/price-history/nvs-usd/' },
    { id: 9, titulo: 'NVS returns by year (cierres ajustados por dividendos: 2025 137,87 USD)', editor: 'Chartrow', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://chartrow.com/quote/nvs/returns' },
    { id: 10, titulo: 'Comparables farmacéuticos (Stock Analysis y MarketScreener, 8-oct-2026) del informe de Roche del 14-oct-2026 (informes/roche-2026-10-14)', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/' },
    { id: 11, titulo: 'US Treasury yields (13-oct-2026): bono a 10 años en el 5,21-5,24 % (FRED DGS10 y Forbes)', editor: 'CNBC / FRED', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://www.cnbc.com/2026/10/13/us-treasurys-bonds-yields.html' },
    { id: 12, titulo: 'Novartis financial results Q3 2026 (27-oct-2026)', editor: 'Novartis', tipo: 'Primaria', fecha: '2026-10', url: 'https://prod1.novartis.com/events/novartis-financial-results-q3-2026' },
    { id: 13, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita de octubre de 2026, 4,20 % (dato del repo, verticales/empresa/prompt.md)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 14, titulo: 'Novartis assumed with a Hold at Jefferies (objetivo 110 CHF)', editor: 'TipRanks / The Fly', tipo: 'Analistas', fecha: '2026', url: 'https://www.tipranks.com/news/the-fly/novartis-assumed-with-a-hold-at-jefferies-thefly' },
    { id: 15, titulo: 'Novartis shares: cotización de 131,32 CHF y capitalización de 249.600 M CHF (20-ago-2026)', editor: 'Simply Wall St', tipo: 'Datos de mercado', fecha: '2026-08-20', url: 'https://www.simplywall.st/stocks/ch/pharmaceuticals-biotech/vtx-novn/novartis-shares' },
    { id: 16, titulo: 'Novartis AG (NVS) estimates: modelo propio de ventas y BPA 2026e-2028e', editor: 'VCP Scanner', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.vcpscanner.com/valuation/nvs/estimates' },
  ],
  huecos: [
    { seccion: 'identificacion', campo: 'precio de cierre del 13-oct-2026 en la SIX', tipo: 'Núcleo', intentos: '1) SIX y cash.ch: sin acceso; 2) búsqueda de cierres de octubre en francos: solo 111,80 CHF del 8-sep; 3) ADR NVS: 140,93 USD el 5-oct (AAII), 1 ADR = 1 acción', decision: 'Calculado y marcado como estimación (precio en USD del ADR; en francos, ÷ 1,25)' },
    { seccion: 'identificacion', campo: 'acciones en circulación', tipo: 'Núcleo', intentos: '1) informe trimestral del 2T26: sin extracto; 2) Stock Analysis: solo acciones diluidas medias de 2025 (1.955 M); 3) capitalización de blue News (215.000 M CHF) ÷ 111,80 CHF = 1.923 M', decision: 'Calculado y marcado como estimación' },
    { seccion: 'consenso', campo: 'estimaciones anuales de ventas, EBITDA y BPA core de 2027e-2028e', tipo: 'Núcleo', intentos: '1) consenso compilado por Novartis: no aparece en la búsqueda; 2) aktien.guide y MarketScreener: estimaciones tras registro; 3) Benzinga: solo trimestres hasta el 2T27', decision: 'Omitido; BPA core 2026e sumando trimestres' },
    { seccion: 'bolsa', campo: 'rentabilidades frente a índices, beta, volatilidad y caída máxima', tipo: 'Complemento', intentos: `1) bolsa.mjs sin red; 2) Yahoo y SIX: no accesibles; 3) búsquedas de beta: sin cifras fiables; en Suiza no hay registro público de cortos; ${SIN_RED}`, decision: 'Omitido; se dan solo las rentabilidades anuales del ADR' },
    { seccion: 'transacciones', campo: 'transacciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) compras farmacéuticas 2020-2026: biotecnológicas sin EBITDA; 2) Avidity: precio sin múltiplo; 3) operaciones de control de grandes farmacéuticas: ninguna comparable', decision: 'Omitido (sección a null)' },
  ],
};
w('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'cash.ch (noticias de pelacarsen y del-desiran con comentarios de lectores)', fecha: '2026-09', n_comentarios: 20, tono: 'Negativo', resumen: 'Los lectores se preguntan si la compra de Avidity fue un error y si la I+D cardiovascular de Novartis sirve; pocos defienden comprar en la caída [1, 2].' },
      { plataforma: 'TIKR (blog con debate de inversores)', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: 'Peor día de la historia de la acción; el escenario medio del autor sigue siendo alcista, pero los analistas quedan repartidos (9 a favor, 10 neutrales, 4 en contra) [3].' },
      { plataforma: 'XTB y blue News (análisis de mercado para particulares)', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'Dos de tres estudios clave fallan en una semana: dudas sobre las fuentes de crecimiento tras los vencimientos de patentes [4, 5].' },
      { plataforma: 'Allmind y portales de análisis automático', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'Recomiendan no comprar la caída hasta los resultados del 3T: la acción quedaría en un rango si la guía se recorta [6].' },
    ],
    temas: [
      { tema: 'Fracasos de pelacarsen y del-desiran', postura: 'Bajista', peso: 'Alto', contraste: 'Correcto en el riesgo de cartera: el consenso no llevaba más de ≈1.000 M USD de pelacarsen en 2030 (ZKB lo quitó entero); en nuestras cifras no cambia 2026-2028, sí el crecimiento de después de 2030 [B4].' },
      { tema: 'La compra de Avidity (≈12.000 M USD) pierde su activo principal', postura: 'Bajista', peso: 'Alto', contraste: 'Fundado: la deuda neta pasó de 21.900 a 39.400 M USD en el 1S26 y del-desiran era el programa más avanzado; queda la opción de FSHD y Duchenne [A11, A15].' },
      { tema: 'Precipicio de patentes de principios de los años 2030', postura: 'Bajista', peso: 'Medio', contraste: 'Lo recoge nuestro DCF con crecimiento cero y negativo en 2031e-2032e y margen a la baja [B4].' },
      { tema: 'Dividendo y recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Correcto: 7.820 M USD de dividendos y 9.120 M de recompras en 2025, y quedan 5.600 M del programa de 10.000 M [A7, A11].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Novartis-Aktien nach Forschungsrückschlag satt im Minus', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-09-04', url: 'https://www.cash.ch/news/novartis-aktien-nach-forschungsruckschlag-satt-im-minus-966513' },
    { id: 2, titulo: 'Rückschlag für Novartis: so schätzen Analysten den Studienflop bei Pelacarsen ein', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.cash.ch/news/top-news/ruckschlag-fur-novartis-so-schatzen-analysten-den-studienflop-bei-pelacarsen-ein-966520' },
    { id: 3, titulo: 'Novartis stock crashed 11% on Tuesday: two failed trials are to blame', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-09-09', url: 'https://www.tikr.com/blog/novartis-stock-crashed-11-on-tuesday-two-failed-trials-are-to-blame' },
    { id: 4, titulo: 'Novartis shares fall the most since 2020: what is behind the 10% decline', editor: 'XTB', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://www.xtb.com/en/market-analysis/novartis-shares-fall-the-most-since-2020-what-is-behind-the-10-decline' },
    { id: 5, titulo: 'Novartis loses 24 billion francs in market value in a single day', editor: 'blue News', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://www.bluewin.ch/en/news/novartis-loses-24-billion-francs-in-market-value-in-a-single-day-li.3592726' },
    { id: 6, titulo: 'Novartis stock falls 10% after second drug setback in a week; analyst cuts PT', editor: 'Allmind', tipo: 'Foros y redes', fecha: '2026-09-08', url: 'https://allmind.ai/news/0f693f85a0d642c2251d49701895531c454158322422471cb33ba6b67f76b222' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit, Stocktwits, Seeking Alpha y foros en alemán (finanzen.net, wallstreet-online)', tipo: 'Complemento', intentos: '1) búsqueda de hilos de Reddit y Seeking Alpha sobre NVS tras los fracasos: sin resultados de 2026; 2) búsqueda de foros en alemán y de Rankia: sin hilos en el extracto; 3) API de Stocktwits y RSS de Seeking Alpha: sin red', decision: 'Omitido; el tono se lee en cash.ch, TIKR, XTB, blue News y portales de análisis' },
  ],
};
w('E', E);
console.log('notas A-E escritas');
