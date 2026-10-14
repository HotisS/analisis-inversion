// Escribe las notas A-E de Sanofi (corte 2026-10-14) a partir de lo leído en los resultados de búsqueda.
// Entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red). Cada cifra lleva la URL de la página que la publica.
// Base de las cuentas: «business» de Sanofi (resultado operativo y beneficio antes de amortización de intangibles adquiridos,
// deterioros, reestructuración y otras partidas no recurrentes), que es la que guía la empresa y sigue el consenso.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const w = (l, o) => fs.writeFileSync(path.join(dir, `${l}.json`), JSON.stringify(o, null, 2), 'utf8');
const SIN_RED = 'entorno nube: solo WebSearch (WebFetch, curl, descargar.mjs y bolsa.mjs sin red)';

// ---------------------------------------------------------------- A. Cuentas
const A = {
  _estado: 'completo con huecos',
  negocio: {
    segmentos: [
      { nombre: 'Dupixent', descripcion: 'Anticuerpo anti-IL-4/IL-13 (con Regeneron) para dermatitis atópica, asma, EPOC, urticaria y otras inflamaciones tipo 2; patente principal en EE. UU. hasta marzo de 2031.', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 15700, resultado: null }] },
      { nombre: 'Vacunas', descripcion: 'Gripe, pediátricas, meningitis, refuerzos y Beyfortus (anticuerpo frente al VRS en lactantes, con AstraZeneca).', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 7900, resultado: null }] },
      { nombre: 'Resto de farma', descripcion: 'Lanzamientos (ALTUVIIIO, Sarclisa, Nexviazyme, Qfitlia…), enfermedades raras, Blueprint (Ayvakit), medicina general (insulinas, cardiovascular, trombosis) y otros.', tipo_resultado: null,
        historico: [{ periodo: '2025', ingresos: 20026, resultado: null }] },
    ],
    geografias: null,
    kpis: [
      { kpi: 'Ventas netas (M EUR)', valor_anterior: '41.081 (2024)', valor_actual: '43.626 (2025)', variacion: '+6,2 % publicado; +9,9 % a tipo constante', comentario: 'En el extremo alto de la guía [2, 12].' },
      { kpi: 'Ventas de Dupixent (M EUR)', valor_anterior: '≈3.830 (2T25)', valor_actual: '5.150 (2T26)', variacion: '+37,6 %', comentario: 'Ventas anuales de 15.700 M en 2025; ≈42 % de las ventas del 1S26 [1, 10].' },
      { kpi: 'BPA business (EUR)', valor_anterior: '7,12 (2024)', valor_actual: '7,83 (2025)', variacion: '+10,0 % publicado; +15,0 % a tipo constante', comentario: 'Incluye el efecto de las recompras (sin ellas, +12,2 %) [2, 12].' },
      { kpi: 'Margen operativo business', valor_anterior: '27,6 % (2024)', valor_actual: '27,8 % (2025)', variacion: '+0,2 pp', comentario: 'Resultado operativo business sobre ventas netas [3, 12].' },
      { kpi: 'Flujo de caja libre (definición Sanofi, M EUR)', valor_anterior: '≈5.960 (2024)', valor_actual: '8.100 (2025)', variacion: '+35,8 %', comentario: 'Reducción de casi 30 días de existencias; 3.724 M en el 1S26 (+51,5 %) [8, 12].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    // Base business (millones de EUR). 2022 incluye Opella (consumo), 2023-2025 sin Opella (reexpresado por la empresa).
    cuenta: [
      { periodo: '2022', ingresos: 42997, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 13040, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 10341, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 8.26, dpa: 3.56, dpa_extraordinario: 0, acciones_diluidas: 1252 },
      { periodo: '2023', ingresos: 37817, coste_ventas: null, gastos_generales: null, ebitda: null, amortizaciones: null, ebit: 11178, resultado_financiero: null, bai: null, impuestos: null, minoritarios: null, beneficio_neto: 9077, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.25, dpa: 3.76, dpa_extraordinario: 0, acciones_diluidas: 1252 },
      { periodo: '2024', ingresos: 41081, coste_ventas: null, gastos_generales: null, ebitda: 12986, amortizaciones: 1643, ebit: 11343, resultado_financiero: -231, bai: 11112, impuestos: 2200, minoritarios: 0, beneficio_neto: 8912, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.12, dpa: 3.92, dpa_extraordinario: 0, acciones_diluidas: 1251.4 },
      { periodo: '2025', ingresos: 43626, coste_ventas: null, gastos_generales: null, ebitda: 13904, amortizaciones: 1776, ebit: 12128, resultado_financiero: -199, bai: 11929, impuestos: 2374, minoritarios: 0, beneficio_neto: 9555, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.83, dpa: 4.12, dpa_extraordinario: 0, acciones_diluidas: 1220.4 },
    ],
    ltm: { periodo: 'LTM dic-25', fecha_fin: '2025-12-31', ingresos: 43626, ebitda: 13904, ebit: 12128, beneficio_neto: 9555, bpa: 7.83, dpa: 4.12, dpa_extraordinario: 0, fcf: 8100, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Opella (salud de consumo) pasa a actividad interrumpida a finales de 2024 y la empresa reexpresa 2023: las ventas bajan de 43.070 a 37.817 M; 2022 no está reexpresado en lo que hemos podido leer.' },
      { periodo: '2025', descripcion: 'Venta del 50 % de Opella a CD&R (30-abr-2025; Sanofi conserva el 48,2 %, por puesta en equivalencia) y compra de Blueprint Medicines (julio de 2025).' },
    ],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 19889, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2S25', ingresos: 23737, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1S26', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: 15.7, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2025', activo_total: 126805, activo_corriente: null, pasivo_corriente: null, pasivo_total: 55095, fondo_comercio: 41300, intangibles: 17530, inmovilizado_material: null, existencias: 10214, clientes: 11046, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 7657, deuda_financiera: 18665, arrendamientos: null, patrimonio_neto: 71710, minoritarios: null, reservas: null },
    ],
    vencimientos: [],
    liquidez: 'Caja de 7.657 M EUR a 31-dic-2025 [2]; emisión de 2.300 M en bonos EMTN en el 2T26 [13].',
    rating: null, coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Baja',
  },
  flujos: {
    historico: [
      { periodo: '2023', flujo_operativo: 10258, capex: 2906, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: null, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 8914, capex: 3195, pagos_arrendamientos: null, adquisiciones: null, desinversiones: null, dividendos: null, recompras: null, emision_acciones: null, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 10917, capex: 2817, pagos_arrendamientos: null, adquisiciones: null, desinversiones: 10400, dividendos: null, recompras: 5000, emision_acciones: null, intereses_en_financiacion: 0 },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Press release Q2 2026: double-digit sales growth and strong business EPS growth; 2026 guidance upgraded (Form 6-K)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.sec.gov/Archives/edgar/data/0001121404/000112140426000008/pressreleaseq22026english.htm' },
    { id: 2, titulo: 'Press release Q4 and full year 2025 results (Form 6-K)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140426000001/pressreleaseq42025english.htm' },
    { id: 3, titulo: 'Form 20-F 2024 (resultado operativo business 2024 y 2023 reexpresado; ventas 2023 sin Opella)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140425000010/sny-20241231.htm' },
    { id: 4, titulo: 'Press release Q4 and full year 2023 results (Form 6-K)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2024-02-01', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140424000003/pressreleaseq42023english.htm' },
    { id: 5, titulo: 'Sanofi (SNY) financials: income statement (D&A 2025: 1.776 M EUR)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/sny/financials/' },
    { id: 6, titulo: 'Sanofi (SNY) balance sheet 2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/stocks/sny/financials/balance-sheet/' },
    { id: 7, titulo: 'Sanofi SA cash flow statement (flujo operativo y capex 2023-2025)', editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockopedia.com/share-prices/sanofi-sa-NSQ:SNY/cashflow' },
    { id: 8, titulo: 'Sanofi (SAN) Q2 2026 earnings summary (deuda neta 15.513 M a 30-jun-2026; FCF 1S26 3.724 M)', editor: 'Quartr', tipo: 'Datos de mercado', fecha: '2026-07-30', url: 'https://quartr.com/events/sanofi-san-q2-2026_3erTN0T6' },
    { id: 9, titulo: 'Sanofi Q2 earnings call highlights', editor: 'Nasdaq', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.nasdaq.com/articles/sanofi-q2-earnings-call-highlights' },
    { id: 10, titulo: 'Sanofi FY2025 sales results (Dupixent 15.700 M; vacunas 7.900 M; Beyfortus 1.800 M)', editor: 'Pharmaceutical Technology', tipo: 'Prensa', fecha: '2026-01-29', url: 'https://www.pharmaceutical-technology.com/news/sanofi-fy2025-sales-results/' },
    { id: 11, titulo: 'Half-year financial report 2025 (ventas por región del 1S25)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2025-07-31', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140425000022/exhibit992-2025halfyearman.htm' },
    { id: 12, titulo: 'Sanofi posts strong full year figures despite development setbacks', editor: 'Hargreaves Lansdown', tipo: 'Prensa', fecha: '2026-01-29', url: 'https://www.hl.co.uk/shares/stock-market-news/company--news/sanofi-posts-strong-full-year-figures-despite-development-setbacks' },
    { id: 13, titulo: 'Q2 2026 aide-mémoire (deuda neta 1T26 12.900 M; emisión EMTN de 2.300 M; recompra de 1.000 M)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2026-07-01', url: 'https://www.sanofi.com/assets/dotcom/content-app/events/quaterly-results/2026/2026-q2-2026-results/20260701-sanofi-q2-2026-aide-me-moire.pdf' },
    { id: 14, titulo: 'Half-year 2026 financial report (Form 6-K): recompra de 12.571.455 acciones por ≈1.003 M EUR', editor: 'Sanofi', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://www.sec.gov/Archives/edgar/data/0001121404/000162828026050803/sny-20260630_d2.htm' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'cuenta 2021 y anteriores', tipo: 'Núcleo', intentos: `1) resultados anuales 2021-2022 de Sanofi (no aparecen en la búsqueda); 2) Stock Analysis (cifras NIIF con perímetros mezclados); 3) prensa. ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'balance', campo: 'balance 2022-2024 y desglose de circulante y arrendamientos', tipo: 'Núcleo', intentos: `1) 20-F 2024 y 2025 (no legibles desde la búsqueda); 2) Stock Analysis y Weiss (cifras discrepantes); 3) solo deuda neta 2024 (8.772 M) y 2025 (11.008 M). ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ventas, margen y BPA trimestrales', tipo: 'Complemento', intentos: `1) comunicados trimestrales; 2) Quartr; 3) prensa: solo 2T26 (11.597 M, BPA 2,09) y semestres. ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  _estado: 'parcial',
  historia: {
    resumen: null,
    hitos: [
      { anio: '2004', hito: 'Fusión de Sanofi-Synthélabo y Aventis.' },
      { anio: '2017', hito: 'Lanzamiento de Dupixent con Regeneron, hoy el 36 % de las ventas del grupo [3].' },
      { anio: '2025', hito: 'Venta del 50 % de Opella (consumo) a CD&R por unos 10.400 M de caja neta; compra de Blueprint Medicines [2, 4].' },
      { anio: '2026', hito: 'El consejo no renueva a Paul Hudson; Belén Garijo (ex Merck KGaA) es consejera delegada desde la junta del 29-abr [5].' },
      { anio: '2026', hito: 'Abandono de amlitelimab e itepekimab (deterioro de 952 M en el 1S26) y nuevo acuerdo con Regeneron de hasta 8.000 M USD (1-oct) [6, 7].' },
    ],
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null, posicion: null,
    competidores: [
      { nombre: 'Eli Lilly', pais: 'EE. UU.', ticker: 'LLY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ebglyss (lebrikizumab) compite con Dupixent en dermatitis atópica.' },
      { nombre: 'AbbVie', pais: 'EE. UU.', ticker: 'ABBV', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rinvoq (inhibidor JAK oral) en dermatitis atópica.' },
      { nombre: 'GSK', pais: 'Reino Unido', ticker: 'GSK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en vacunas (gripe, meningitis, VRS en adultos).' },
      { nombre: 'Pfizer', pais: 'EE. UU.', ticker: 'PFE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Vacunas (Prevnar, VRS) e inmunología.' },
      { nombre: 'AstraZeneca', pais: 'Reino Unido', ticker: 'AZN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Socio en Beyfortus y rival en respiratorio (Tezspire, Fasenra).' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'With Dupixent driving growth, Sanofi touts «vigorous defense» to extend US exclusivity', editor: 'Fierce Pharma', tipo: 'Prensa', fecha: '2026-01', url: 'https://www.fiercepharma.com/pharma/sanofi-expects-extend-its-loe-dupixent-beyond-2031' },
    { id: 2, titulo: 'Press release Q4 and full year 2025 results (Opella, 2.874 M de resultado de actividades interrumpidas)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140426000001/pressreleaseq42025english.htm' },
    { id: 3, titulo: 'Sanofi pénalisé en Bourse par l’abandon du développement de l’amlitelimab (Dupixent, 36 % de los ingresos; dominio público en 2031)', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://www.abcbourse.com/marches/sanofi-penalise-en-bourse-par-l-abandon-du-developpement-de-l-amlitelimab-dans-l_700300' },
    { id: 4, titulo: 'Half-year financial report 2025 (cierre de la operación Opella, 48,2 % retenido)', editor: 'Sanofi', tipo: 'Primaria', fecha: '2025-07-31', url: 'https://www.sec.gov/Archives/edgar/data/1121404/000112140425000022/exhibit992-2025halfyearman.htm' },
    { id: 5, titulo: 'Sanofi officially appoints Belén Garijo chief executive officer following shareholder vote', editor: 'Pharmaceutical Executive', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://pharmexec.com/view/sanofi-officially-appoints-belen-garijo-chief-executive-officer-following-shareholder-vote' },
    { id: 6, titulo: 'Sanofi raises sales outlook on Dupixent strength in boost for new CEO (Reuters; deterioro de 952 M por amlitelimab)', editor: 'Reuters (vía WMBD)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://wmbdradio.com/2026/07/30/sanofi-raises-sales-outlook-on-dupixent-strength-in-boost-for-new-ceo/' },
    { id: 7, titulo: 'Sanofi élargit son partenariat avec Regeneron dans le cadre d’un accord à 8 milliards de dollars', editor: 'ABC Bourse', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.abcbourse.com/marches/sanofi-elargit-son-partenariat-avec-regeneron-dans-le-cadre-d-un-accord-a-8-mill_703528' },
    { id: 8, titulo: 'Pourquoi 2026 s’annonce encore morne en Bourse pour Sanofi selon JPMorgan (17.300 M EUR de ventas en riesgo 2030-2035)', editor: 'Tradingsat / BFM Bourse', tipo: 'Analistas', fecha: '2026-01', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-sanofi-pourquoi-2026-s-annonce-encore-morne-en-bourse-pour-sanofi-selon-jpmorgan-1152143.html' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado farmacéutico y de inmunología tipo 2 con dos fuentes', tipo: 'Núcleo', intentos: `1) IQVIA y EFPIA (no consultados por el límite de búsquedas); 2) informes de mercado de dermatitis atópica; 3) prensa. ${SIN_RED}; búsquedas compartidas reservadas a cuentas y valoración`, decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos, cuota y margen EBIT de los competidores', tipo: 'Núcleo', intentos: `1) cuentas de cada competidor; 2) Stock Analysis; 3) comparables de la sección 18 (sin ventas por área terapéutica). ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: `1) MSCI y Sustainalytics; 2) informe de sostenibilidad; 3) prensa. ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'parcial',
  directivos: {
    equipo: [
      { nombre: 'Belén Garijo', cargo: 'Consejera delegada', desde: '2026', participacion_pct: null, trayectoria: 'Consejera delegada de Merck KGaA desde 2021; antes, 15 años en Sanofi al frente de las operaciones farmacéuticas en Europa y Canadá y miembro del comité ejecutivo [1, 2]. En sus primeros cinco meses ha cortado amlitelimab e itepekimab y ha cerrado la paz con Regeneron con un acuerdo de hasta 8.000 M USD [3, 4].' },
      { nombre: 'Frédéric Oudéa', cargo: 'Presidente no ejecutivo', desde: null, participacion_pct: null, trayectoria: 'Ex consejero delegado de Société Générale; respaldó públicamente el relevo de Paul Hudson por Garijo [1].' },
      { nombre: 'Olivier Charmeil', cargo: 'Vicepresidente ejecutivo, Medicina General (consejero delegado interino feb-abr 2026)', desde: null, participacion_pct: null, trayectoria: 'Dirigió el grupo entre la salida de Hudson (17-feb-2026) y la llegada de Garijo [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento de ventas de un dígito alto a tipo constante y BPA business con crecimiento de doble dígito bajo', real: 'Ventas +9,9 % y BPA business +15,0 % a tipo constante', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial: ventas de un dígito alto y BPA algo por encima; elevada en julio a ≈+10 % de ventas', real: '1S26: ventas +15,7 % y BPA business +22,7 % a tipo constante', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Frédéric Oudéa', cargo: 'Presidente', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Belén Garijo', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 2,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'L’Oréal', pct: 7.2, tipo: 'Industrial (13,1 % de los derechos de voto)', variacion: 'Bajó del 9,4 % al vender 29,6 M de acciones a Sanofi por 3.000 M EUR (101,50 EUR/acción) en febrero de 2025 [5]' },
      { nombre: 'Empleados y antiguos empleados', pct: 2.93, tipo: 'Plan de accionariado', variacion: 'Plan «Action 2026» a 59,87 EUR (descuento del 20 %) en junio de 2026 [6]' },
      { nombre: 'Autocartera', pct: 0.6, tipo: 'Autocartera', variacion: 'Estimación propia: derechos de voto teóricos menos reales a 31-ago-2026 (≈7,2 M de acciones) [7]' },
    ],
    insiders: [],
    alertas: [
      'Relevo no previsto del consejero delegado: el consejo no renovó a Paul Hudson (salida el 17-feb-2026) [1].',
      'Doble derecho de voto: 1.343 M de derechos teóricos sobre 1.208 M de acciones (31-ago-2026) [7].',
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Belén Garijo to succeed Paul Hudson as CEO of Sanofi', editor: 'Paperjam', tipo: 'Prensa', fecha: '2026-02-12', url: 'https://en.paperjam.lu/article/belen-garijo-to-succeed-paul-hudson-as-ceo-of-sanofi' },
    { id: 2, titulo: 'Sanofi officially appoints Belén Garijo chief executive officer following shareholder vote', editor: 'Pharmaceutical Executive', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://pharmexec.com/view/sanofi-officially-appoints-belen-garijo-chief-executive-officer-following-shareholder-vote' },
    { id: 3, titulo: 'New CEO Garijo sketches out vision to reverse Sanofi’s fortunes as Q2 delivers impressive sales beat', editor: 'Fierce Pharma', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.fiercepharma.com/pharma/new-ceo-garijo-sketches-out-vision-reverse-sanofis-fortunes-q2-delivers-impressive-sales' },
    { id: 4, titulo: 'Une victoire importante pour la nouvelle DG: Sanofi se rabiboche avec l’allié qui lui a fourni sa locomotive de croissance', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-sanofi-une-victoire-importante-pour-la-nouvelle-dg-sanofi-se-rabiboche-avec-l-allie-qui-lui-a-fourni-sa-locomotive-de-croissance-et-retrouve-un-peu-de-credit-aupres-des-analystes-1171141.html' },
    { id: 5, titulo: 'Agreement between L’Oréal and Sanofi for the repurchase by Sanofi of 2.3% of its own shares held by L’Oréal', editor: 'L’Oréal', tipo: 'Primaria', fecha: '2025-02-03', url: 'https://www.loreal.com/en/press-release/group/agreement-between-loreal-and-sanofi-for-the-repurchase-by-sanofi-of-2-3-percent-of-its-own-shares-held-by-l-oreal/' },
    { id: 6, titulo: 'Sanofi va démarrer un plan mondial d’actionnariat salarié (Action 2026)', editor: 'Tradingsat / Zonebourse', tipo: 'Prensa', fecha: '2026-06-04', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-sanofi-va-demarrer-un-plan-mondial-d-actionnariat-salarie-1164457.html' },
    { id: 7, titulo: 'Sanofi: information concerning the total number of voting rights and shares, August 2026', editor: 'Sanofi (vía BiopharmaWatch)', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.biopharmawatch.com/news/SNY/sanofi-voting-rights-shares-august-2026' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, comisiones, votos de remuneración y remuneración del consejero delegado', tipo: 'Núcleo', intentos: `1) Document d’enregistrement universel 2025 (no legible); 2) actas de la junta del 29-abr-2026; 3) prensa: solo presidente y consejera delegada. ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (BDIF de la AMF)', tipo: 'Complemento', intentos: `1) API de la BDIF (sin red); 2) prensa; 3) Form 144 del ADR. ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
// Comparables reutilizados del informe de Roche (14-oct-2026, en CHF), pasados a EUR a 0,9326 CHF por EUR.
const CHF = 0.9326;
const comp = [
  ['Eli Lilly', 'LLY', 'US', 848666, 13.34, 25.5, 20.6, 26.7, 24.4, 52.4, 42.2, 1.08, 1.75],
  ['AstraZeneca', 'AZN', 'GB', 204343, 4.44, 13.5, 11.4, 18.3, 7.8, 33, 16.1, 1.35, 4.28],
  ['Novartis', 'NOVN', 'CH', 224978, 5.47, 13.4, 12.5, 17.2, 7, 40.7, 18.8, 1.79, 6.13],
  ['Merck & Co', 'MRK', 'US', 287148, 5.88, 13.6, 13.3, 20.9, 4.3, 43.4, 14.1, 1.62, 4.56],
  ['GSK', 'GSK', 'GB', 77152, 2.54, 7.8, 6.9, 11.7, 5.4, 32.6, 26.4, 1.4, 9.63],
  ['Novo Nordisk', 'NOVO B', 'DK', 130247, 3.64, 6.9, null, 11.7, -2.7, 52.7, 39.2, 0.55, 6.9],
].map(([nombre, ticker, pais, capCHF, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct]) => ({
  nombre, ticker, pais, capitalizacion: Math.round(capCHF / CHF), ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct,
}));
const D = {
  _estado: 'completo con huecos',
  identificacion: {
    nombre: 'Sanofi S.A.', nombre_corto: 'Sanofi', ticker: 'SAN', isin: 'FR0000120578', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Salud', industria: 'Farmacéutica', sede: 'París', fundacion: '1973', empleados: null, web: 'https://www.sanofi.com',
    precio: 73.10, fecha_precio: '2026-10-03', acciones: 1203, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 84.97, min_52s: 70.96, volumen_medio_diario: null, proximos_resultados: '2026-10-30',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: 8.58, dpa: null, fuente: 'Idéal Investisseur, 15-sep-2026: PER 2026e de consenso de 8,65 a 74,21 EUR (BPA implícito, cálculo propio) [3]' },
    ],
    recomendaciones: { n_analistas: 24, comprar: null, mantener: null, vender: null, po_medio: 90.0, po_min: 78.0, po_max: 100.0 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: null,
  multiplos_historicos: {
    serie: [
      { anio: '2022', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 89.76, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 91.50, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 82.72, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas: comp, confianza: 'Media' },
  transacciones: null,
  fuentes: [
    { id: 1, titulo: 'Sanofi (SAN, Euronext París): cierres diarios del 16-sep al 3-oct-2026 (73,10 EUR el 3-oct; rango de 2026: 70,96-84,97; cierre de 2025: 82,24)', editor: 'InvestSMART', tipo: 'Datos de mercado', fecha: '2026-10-03', url: 'https://www.investsmart.com.au/security/par/san/sanofi/share-price' },
    { id: 2, titulo: 'Sanofi: cierre del año anterior 89,76 EUR (29-dic-2023), 91,50 EUR (19-dic-2024) y 82,72 EUR (31-dic-2025)', editor: 'Trade Direct (Cornèr)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://cug.tradedirect.ch/td/details/overview/699381,25,814?lang=en_GB' },
    { id: 3, titulo: 'Action Sanofi: consensus de 24 analystes, objectif médian 90 EUR (78-100), PER 2026e 8,65 (15-sep-2026)', editor: 'Idéal Investisseur', tipo: 'Analistas', fecha: '2026-09-15', url: 'https://www.ideal-investisseur.fr/actions/sanofi.html' },
    { id: 4, titulo: 'UBS cuts Sanofi to Neutral amid pipeline setbacks and Dupixent patent concerns (objetivo de 105 a 88 EUR)', editor: 'StockInvest.us', tipo: 'Analistas', fecha: '2026-01', url: 'https://stockinvest.us/digest/ubs-cuts-sanofi-to-neutral-amid-pipeline-setbacks-and-dupixent-patent-concerns' },
    { id: 5, titulo: 'Sanofi: information concerning the total number of voting rights and shares, August 2026 (1.207.773.393 acciones)', editor: 'Sanofi (vía BiopharmaWatch)', tipo: 'Primaria', fecha: '2026-09', url: 'https://www.biopharmawatch.com/news/SNY/sanofi-voting-rights-shares-august-2026' },
    { id: 6, titulo: 'Comparables farmacéuticos del informe de Roche de este repositorio (14-oct-2026; Stock Analysis y MarketScreener, 8-oct-2026), en CHF', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://stockanalysis.com/' },
    { id: 7, titulo: 'Rendimiento del Bund a 10 años (12-oct-2026, 3,53 %), serie BBSIS (vía informe de Endesa de este repositorio)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-12', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
    { id: 8, titulo: 'Idéal Investisseur, 20-jul-2026: objetivo mediano de 95 EUR (23 analistas), mayoría «comprar»', editor: 'Idéal Investisseur', tipo: 'Analistas', fecha: '2026-07-20', url: 'https://www.ideal-investisseur.fr/actions/sanofi-FR0000120578.html' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad y caída máxima', tipo: 'Complemento', intentos: `1) bolsa.mjs (sin red); 2) Yahoo y Stock Analysis vía búsqueda (sin series); 3) Simply Wall St da beta 0,37, no comparable con la mensual de 5 años. ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones con múltiplo publicado', tipo: 'Complemento', intentos: `1) comunicados de Sanofi (Blueprint, Opella); 2) prensa; 3) Mergermarket. Sin múltiplos legibles. ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de ventas, EBITDA y BPA 2027e-2028e', tipo: 'Núcleo', intentos: `1) MarketScreener y Zonebourse (no indexados); 2) MarketBeat (en USD por ADR, fechas dudosas); 3) Idéal Investisseur: solo PER 2026e. ${SIN_RED}`, decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'precio de cierre de 2022', tipo: 'Complemento', intentos: `1) Trade Direct (solo 2023-2025); 2) Digrin (ADR en USD); 3) MarketScreener. ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo con huecos',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Tradingsat / BFM Bourse (noticias con comentarios de lectores)', fecha: '2026-10', n_comentarios: 10, tono: 'Dividido', resumen: 'El acuerdo con Regeneron se celebra el 1-oct como «victoria» de Garijo y al día siguiente la acción es la peor del CAC 40: el mercado duda de pagar 1.000 M USD por cuatro moléculas tempranas [1, 2].' },
      { plataforma: 'Tradingsat (resultados del 2T26)', fecha: '2026-07', n_comentarios: 10, tono: 'Negativo', resumen: 'Pese a subir la guía, la acción cae un 9 %: los lectores hablan de beneficios «de una sola vez» y de una cartera que no sustituye a Dupixent [3].' },
      { plataforma: 'Tickeron (blog para particulares)', fecha: '2026-09', n_comentarios: 5, tono: 'Dividido', resumen: '−8,3 % en 30 días: «reinicio de la cartera» frente al impulso de Dupixent, que pesa ≈42 % de las ventas del semestre [4].' },
      { plataforma: 'ABC Bourse (análisis técnico y comentarios)', fecha: '2026-08', n_comentarios: 5, tono: 'Neutro', resumen: 'Horizonte estratégico «frágil», con un soporte técnico que aguanta; descuento frente al sector [5].' },
    ],
    temas: [
      { tema: 'El precipicio de Dupixent en 2031', postura: 'Bajista', peso: 'Alto', contraste: 'Es el riesgo central también en nuestro modelo: suponemos caídas de ventas del 6 % y del 8 % en 2031e-2032e; JPMorgan cifra en 17.300 M las ventas en riesgo.' },
      { tema: 'Credibilidad de la cartera tras amlitelimab e itepekimab', postura: 'Bajista', peso: 'Alto', contraste: 'Fundado: deterioro de 952 M en el 1S26 y abandono de dos de las grandes apuestas; nuestro bajista no da valor a la cartera temprana.' },
      { tema: 'Valoración barata y dividendo del 5-6 %', postura: 'Alcista', peso: 'Medio', contraste: 'El PER de ≈8,5 veces el BPA de 2026e y el dividendo de 4,12 EUR lo confirman; la cuestión es si es una trampa de valor.' },
      { tema: 'Nueva consejera delegada y acuerdo con Regeneron', postura: 'Dividida', peso: 'Medio', contraste: 'Analistas (Jefferies, Oddo) lo leen como primer paso; el mercado lo castigó un día después [1, 2].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Une victoire importante pour la nouvelle DG: Sanofi se rabiboche avec l’allié qui lui a fourni sa locomotive de croissance', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-sanofi-une-victoire-importante-pour-la-nouvelle-dg-sanofi-se-rabiboche-avec-l-allie-qui-lui-a-fourni-sa-locomotive-de-croissance-et-retrouve-un-peu-de-credit-aupres-des-analystes-1171141.html' },
    { id: 2, titulo: 'Pourquoi la Bourse révise son jugement sur l’armistice et le nouveau partenariat entre Sanofi et Regeneron (lanterne rouge du CAC 40)', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-10-02', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-pourquoi-la-bourse-revise-son-jugement-sur-l-armistice-et-le-nouveau-partenariat-entre-sanofi-et-son-allie-americain-regeneron-l-action-etant-lanterne-rouge-du-cac-40-36-ce-vendredi-1171193.html' },
    { id: 3, titulo: 'Malgré des objectifs relevés et des résultats supérieurs aux attentes, Sanofi dévisse de 9 % en Bourse', editor: 'Tradingsat / BFM Bourse', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.tradingsat.com/sanofi-FR0000120578/actualites/sanofi-malgre-des-objectifs-releves-et-des-resultats-superieurs-aux-attentes-sanofi-devisse-de-9-en-bourse-voici-pourquoi-1167857.html' },
    { id: 4, titulo: 'Sanofi (SNY) down 8.3% over 30 days: pipeline reset and Dupixent momentum', editor: 'Tickeron', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://tickeron.com/blogs/sanofi-sny-down-8-3-over-30-days-pipeline-reset-and-dupixent-momentum-17253/' },
    { id: 5, titulo: 'Sanofi: un horizon stratégique encore fragile mais un support technique qui résiste', editor: 'ABC Bourse', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.abcbourse.com/analyses/sanofi_un_horizon_strategique_encore_fragile_mais_un_support_techniq-7000' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares (Reddit, Stocktwits, foro de Boursorama)', tipo: 'Complemento', intentos: `1) Reddit (sin hilos indexados); 2) foro de Boursorama (no indexado); 3) Seeking Alpha (último artículo indexado de oct-2025). Se usa prensa con comentarios. ${SIN_RED}`, decision: 'Omitido' },
  ],
};
w('E', E);
console.log('notas A-E escritas');
