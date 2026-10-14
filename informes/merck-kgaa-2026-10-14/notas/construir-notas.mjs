// Escribe las notas A-E de Merck KGaA (corte 2026-10-14). Entorno nube: solo WebSearch; cada cifra sale del resultado de
// búsqueda que cita el documento (URL en fuentes). Ejecutar: node informes/merck-kgaa-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const w = (n, o) => fs.writeFileSync(path.join(DIR, `${n}.json`), JSON.stringify(o, null, 2), 'utf8');
const EXT = ' Extracto de búsqueda (sin abrir el documento: la red solo deja WebSearch).';

// ---------------------------------------------------------------- A. Cuentas
const A = {
  _estado: 'Completo en lo esencial (14-oct, 16 búsquedas). Faltan coste de ventas, gastos generales, circulante comercial y pensiones por año.',
  negocio: {
    segmentos: [
      { nombre: 'Life Science', descripcion: 'Productos y servicios para laboratorios, fabricación de biofármacos (Process Solutions) y química de investigación (marca MilliporeSigma en EE. UU.).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2025', ingresos: 9000, resultado: 2600 }] },
      { nombre: 'Healthcare', descripcion: 'Medicamentos con receta: oncología (Bavencio, Erbitux, Ogsiveo/Gomekli de SpringWorks), neurología (Mavenclad, Rebif), fertilidad (Gonal-f) y cardiometabolismo/endocrinología (Glucophage, Concor, Euthyrox).', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 8600, resultado: null }] },
      { nombre: 'Electronics', descripcion: 'Materiales para semiconductores (Semiconductor Solutions), pantallas y, hasta su venta en 2025, pigmentos de Surface Solutions.', tipo_resultado: null, historico: [{ periodo: '2025', ingresos: 3502, resultado: null }] },
    ],
    segmentos_nota: 'Life Science 9.000 M y EBITDA pre ≈ 2.600 M, Healthcare 8.600 M (cifras redondeadas a centenas de millones en la nota de prensa anual) [8]; Electronics = ventas del grupo (21.102 M [1]) menos las otras dos: resta, no cifra leída. Electronics del 3T25: ventas 875 M y EBITDA pre 236 M [7].',
    geografias: [],
    kpis: [
      { kpi: 'Crecimiento orgánico de ventas del grupo', valor_anterior: '+3,1 % (2025)', valor_actual: '+4,1 % (2T26)', variacion: '+1,0 pp', comentario: 'Divisa −1,1 % y perímetro +0,4 % en el 2T26 [3].' },
      { kpi: 'Margen EBITDA pre del grupo', valor_anterior: '27,8 % (2T25)', valor_actual: '29,4 % (2T26)', variacion: '+160 pb', comentario: 'EBITDA pre 2T26 ≈ 1.600 M, +9,3 % orgánico [3].' },
      { kpi: 'Electronics, crecimiento orgánico', valor_anterior: '+4,8 % (3T25)', valor_actual: '+11,7 % (2T26)', variacion: '+6,9 pp', comentario: 'Materiales para chips de IA [3, 7].' },
      { kpi: 'Healthcare, crecimiento orgánico', valor_anterior: '+3,7 % (2025)', valor_actual: '−3,4 % (2T26)', variacion: '−7,1 pp', comentario: 'Genéricos de Mavenclad en EE. UU.; la guía supone cero ventas de Mavenclad en EE. UU. desde agosto de 2026 [3, 14].' },
      { kpi: 'Deuda financiera neta / EBITDA pre', valor_anterior: '1,4x (dic-25)', valor_actual: '1,4x (mar-26)', variacion: '=', comentario: 'Antes de pagar Bio-Techne (≈ 9.900 M EUR) [5, 15].' },
    ],
    confianza: 'Media',
  },
  financieros: {
    cuenta: [
      { periodo: '2021', ingresos: 19687, coste_ventas: null, gastos_generales: null, ebitda: 5946, amortizaciones: 1767, ebit: 4179, resultado_financiero: -255, bai: 3924, impuestos: 859, minoritarios: 8, beneficio_neto: 3057, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.03, dpa: 1.85, dpa_extraordinario: 0, acciones_diluidas: 434.8 },
      { periodo: '2022', ingresos: 22232, coste_ventas: null, gastos_generales: null, ebitda: 6504, amortizaciones: 2030, ebit: 4474, resultado_financiero: -187, bai: 4287, impuestos: 948, minoritarios: 13, beneficio_neto: 3326, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.65, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 434.8 },
      { periodo: '2023', ingresos: 20993, coste_ventas: null, gastos_generales: null, ebitda: 5489, amortizaciones: 1880, ebit: 3609, resultado_financiero: -125, bai: 3484, impuestos: 650, minoritarios: 12, beneficio_neto: 2822, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.49, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 434.8 },
      { periodo: '2024', ingresos: 21156, coste_ventas: null, gastos_generales: null, ebitda: 5779, amortizaciones: 2134, ebit: 3645, resultado_financiero: -109, bai: 3536, impuestos: 750, minoritarios: 9, beneficio_neto: 2777, gastos_financieros: 309, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.39, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 434.8 },
      { periodo: '2025', ingresos: 21102, coste_ventas: null, gastos_generales: null, ebitda: 5899, amortizaciones: 2298, ebit: 3601, resultado_financiero: -293, bai: 3308, impuestos: 693, minoritarios: 7, beneficio_neto: 2608, gastos_financieros: 404, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.00, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 434.8 },
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 21132, ebitda: 6029, ebit: null, beneficio_neto: null, bpa: 5.82, dpa: 2.20, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    ltm_nota: 'Ventas LTM = 2025 (21.102) − 1T25 (≈ 5.283) − 2T25 (≈ 5.255) + 1T26 (5.134) + 2T26 (5.434) [1, 3, 6]. EBITDA LTM = EBITDA pre LTM (6.108,8 − 1.535,1 − 1.462,4 + 1.530,1 + ≈ 1.598 = ≈ 6.239 [5, 3]) menos los ajustes «pre» de 2025 (210 M = 6.109 − 5.899 [1]): estimación propia. BPA diluido LTM 5,82 de Stock Analysis [10].',
    bpa_pre: { 2020: 6.70, 2021: 8.72, 2022: 10.05, 2023: 8.49, 2024: 8.63, 2025: 8.34 },
    bpa_pre_nota: 'BPA pre (sin amortización de intangibles comprados ni partidas excepcionales, con su efecto fiscal): 2020 6,70 y 2021 8,72 [11]; 2022 10,05 y 2023 8,49 [12]; 2024 8,63 y 2025 8,34 [8]. EBITDA pre: 2021 6.103, 2022 6.849, 2023 5.879, 2024 6.072, 2025 6.109 [1].',
    cambios_perimetro: [{ periodo: '2025', descripcion: 'SpringWorks Therapeutics, consolidada desde el 1-jul-2025 (≈ 3.900 M USD; salida de caja por adquisiciones de 2.915 M en 2025) y venta de Surface Solutions (pigmentos) en 2025.' }],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 5283, crecimiento_pct: 3.1, crecimiento_organico_pct: null, ebitda: 1535, margen_ebitda_pct: 29.1, bpa: 2.12, vs_consenso: null },
      { periodo: '2T25', ingresos: 5255, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1462, margen_ebitda_pct: 27.8, bpa: 2.02, vs_consenso: null },
      { periodo: '3T25', ingresos: 5314, crecimiento_pct: 1.0, crecimiento_organico_pct: 5.2, ebitda: 1669, margen_ebitda_pct: 31.4, bpa: 2.32, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 5250, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1443, margen_ebitda_pct: 27.5, bpa: 1.88, vs_consenso: null },
      { periodo: '1T26', ingresos: 5134, crecimiento_pct: -2.8, crecimiento_organico_pct: 2.9, ebitda: 1530, margen_ebitda_pct: 29.8, bpa: 2.11, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 5434, crecimiento_pct: 3.4, crecimiento_organico_pct: 4.1, ebitda: 1598, margen_ebitda_pct: 29.4, bpa: 2.16, vs_consenso: 'Superior' },
    ],
    nota: 'EBITDA y BPA son «pre» (ajustados por la empresa). 1T25 y 2T25: ventas deducidas de las del 1T26 y 2T26 con su variación publicada; 4T25 = año menos tres trimestres; BPA pre del 4T25 = 8,34 − 2,12 − 2,02 − 2,32. EBITDA pre trimestral 2025 de la tabla del 1T26 [5]. 3T25 [7]; 1T26 [6, 5] (con 67 M de efectos únicos en Electronics: 42 M de venta de propiedad intelectual de OLED y 25 M de un litigio con un proveedor [16]); 2T26 [3]. «Superior» del 1T26 frente al consenso VARA de BPA pre 1,96 [19]. 3T25 y 2T26 frente a la prensa («por encima de lo esperado») [13].',
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 45362, activo_corriente: null, pasivo_corriente: null, pasivo_total: 23946, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1899, deuda_financiera: 10801, arrendamientos: 0, patrimonio_neto: 21416, minoritarios: null, reservas: null },
      { periodo: '2022', activo_total: 48535, activo_corriente: null, pasivo_corriente: null, pasivo_total: 22530, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1854, deuda_financiera: 10428, arrendamientos: 0, patrimonio_neto: 26005, minoritarios: null, reservas: null },
      { periodo: '2023', activo_total: 48495, activo_corriente: null, pasivo_corriente: null, pasivo_total: 21741, fondo_comercio: null, intangibles: null, inmovilizado_material: null, existencias: null, clientes: null, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 1982, deuda_financiera: 9941, arrendamientos: 0, patrimonio_neto: 26754, minoritarios: null, reservas: null },
      { periodo: '2024', activo_total: 51596, activo_corriente: null, pasivo_corriente: null, pasivo_total: 21607, fondo_comercio: 19107, intangibles: null, inmovilizado_material: null, existencias: 4484, clientes: 3947, proveedores: 2275, activos_contrato: null, pasivos_contrato: null, caja: 2517, deuda_financiera: 10301, arrendamientos: 0, patrimonio_neto: 29989, minoritarios: null, reservas: null },
      { periodo: '2025', activo_total: 51527, activo_corriente: null, pasivo_corriente: null, pasivo_total: 22867, fondo_comercio: 17934, intangibles: 7662, inmovilizado_material: 9940, existencias: 4562, clientes: 3947, proveedores: 2275, activos_contrato: null, pasivos_contrato: null, caja: 2740, deuda_financiera: 11968, arrendamientos: 0, patrimonio_neto: 28660, minoritarios: null, reservas: null },
    ],
    nota: 'Pasivos financieros (incluyen arrendamientos y no los separamos), caja, activo total y patrimonio neto total (con minoritarios, que son pequeños: 7-13 M de beneficio al año) del resumen de cinco años del informe anual 2025 [1]; pasivo total = activo − patrimonio. Fondo de comercio, intangibles, inmovilizado, existencias (4.562 y 4.484) y clientes y otras cuentas a cobrar corrientes (3.947 en los dos años, cifra repetida que no hemos podido separar) del balance consolidado [2]; proveedores y otras cuentas a pagar corrientes de 2.275 M del balance de 2024 [20], usados también para 2025 (estimación: el de 2025 no aparece). Provisiones no corrientes para prestaciones a empleados de 1.956 M a dic-24 [20]. Deuda financiera neta publicada: 8.619 M (dic-25), 8.318 M (mar-26) y 9.207 M (jun-26, tras el dividendo) [4]; la diferencia con pasivos − caja (9.228 M en 2025) son activos financieros corrientes que la empresa resta.',
    vencimientos: [],
    liquidez: 'Caja de 2.740 M a dic-25 [1]; deuda financiera neta de 9.207 M a jun-26 [4]. La compra de Bio-Techne (≈ 9.900 M EUR) se pagará con caja y deuda nueva, manteniendo el grado de inversión [18].',
    rating: 'Grado de inversión (Scope A− con perspectiva positiva en 2021; híbridos BBB) [17]; no hemos podido leer las notas vigentes de Moody\'s y S&P.',
    coste_deuda_pct: 3.6,
    vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 4616, capex: 1421, pagos_arrendamientos: null, adquisiciones: 4, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 4259, capex: 1806, pagos_arrendamientos: null, adquisiciones: 854, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 3784, capex: 2023, pagos_arrendamientos: null, adquisiciones: 12, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 4586, capex: 2184, pagos_arrendamientos: null, adquisiciones: 774, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 3932, capex: 1958, pagos_arrendamientos: null, adquisiciones: 2915, desinversiones: null, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    nota: 'Flujo operativo y capex (inmovilizado material + intangibles) de Stock Analysis [9]; 2025 cuadra con el resumen de cinco años de la empresa (flujo operativo 3.932; material 1.585; intangibles 373) [1]. Adquisiciones netas de caja [9]. Dividendos pagados (accionistas y retiradas de E. Merck KG) no encontrados.',
    confianza: 'Media',
  },
  calidad: { auditor: null, anios_auditor: null, opinion: null, comentario: null, senales: [], confianza: 'Baja' },
  fuentes: [
    { id: 1, titulo: 'Merck KGaA, Informe anual 2025: «Business development 2021-2025» (resumen de cinco años).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://reports.emdgroup.com/en/annualreport/2025/_assets/downloads/5yr-business-development-emd-ar25.pdf' },
    { id: 2, titulo: 'Merck KGaA, Informe anual 2025: estados financieros consolidados (cuenta, balance).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://reports.emdgroup.com/en/annualreport/2025/_assets/downloads/cfs-consolidated-financial-statements-emd-ar25.pdf' },
    { id: 3, titulo: 'Merck KGaA, nota de prensa de resultados del 2T26 (6-ago-2026).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.emdgroup.com/en/news/q2-2026-06-08-2026' },
    { id: 4, titulo: 'Merck KGaA, informe del 2T26 (deuda financiera neta 9.207 M a 30-jun-2026).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.emdgroup.com/content/dam/web/corporate/non-images/press-kits/q2-2026/us/2026-Q2-Report-NA.pdf' },
    { id: 5, titulo: 'Merck KGaA, estados financieros del 1T26 (EBITDA pre trimestral 2025-2026).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://reporting.emdgroup.com/2026-Q1-Financial-Statement-NA.pdf' },
    { id: 6, titulo: 'Merck KGaA, nota de prensa de resultados del 1T26 (13-may-2026).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://www.emdgroup.com/en/news/q1-2026-13-05-2026' },
    { id: 7, titulo: 'Merck KGaA, resultados del 3T25 (dossier de prensa).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2025-11-13', url: 'https://www.emdgroup.com/en/media-center/press-kits/q3-2025.html' },
    { id: 8, titulo: 'Merck KGaA, nota de prensa de resultados de 2025 («Guidance for 2025 delivered»).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.emdgroup.com/en/news/q4-2025-05-03-2026' },
    { id: 9, titulo: 'Stock Analysis, Merck KGaA (ETR:MRK), estado de flujos de efectivo anual.' + EXT, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/etr/MRK/financials/cash-flow-statement/' },
    { id: 10, titulo: 'Stock Analysis, Merck KGaA (ETR:MRK), cuenta de resultados (BPA diluido anual y LTM).' + EXT, editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://stockanalysis.com/quote/etr/MRK/financials/income-statement/' },
    { id: 11, titulo: 'Merck KGaA, resultados de 2021 (BPA pre 8,72; 2020: 6,70).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2022-03-03', url: 'https://www.emdgroup.com/en/news/financial-results-2021-03-03-2022' },
    { id: 12, titulo: 'Merck KGaA, presentación a analistas del informe anual 2023 (BPA pre 8,49; 2022: 10,05).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2024-03-07', url: 'https://www.emdgroup.com/en/annualreport/2023/_assets/downloads/apr-analyst-presentation-emd-ar23.pdf' },
    { id: 13, titulo: 'MarketBeat, «Merck KGaA Q2 earnings call highlights» (6-ago-2026).' + EXT, editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-08-06', url: 'https://www.marketbeat.com/instant-alerts/merck-kgaa-q2-earnings-call-highlights-2026-08-06/' },
    { id: 14, titulo: 'Fierce Pharma, «After generic defense fails, Merck KGaA expects no US Mavenclad sales».' + EXT, editor: 'Fierce Pharma', tipo: 'Prensa', fecha: '2026', url: 'https://www.fiercepharma.com/pharma/after-generic-defense-fails-merck-kgaa-expects-no-us-mavenclad-sales-after-march' },
    { id: 15, titulo: 'Merck KGaA, informe del 4T25 (dividendo propuesto 2,20 EUR; deuda neta/EBITDA pre 1,4x).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.emdgroup.com/content/dam/web/corporate/non-images/press-kits/q4-2025/us/2025-Q4-Report-NA.pdf' },
    { id: 16, titulo: 'Nasdaq, «Merck KGaA Q1 earnings call highlights» (mayo de 2026).' + EXT, editor: 'Nasdaq', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.nasdaq.com/articles/merck-kgaa-q1-earnings-call-highlights' },
    { id: 17, titulo: 'Scope Ratings, informe de calificación de Merck KGaA (A−, perspectiva positiva; híbridos BBB), oct-2021.' + EXT, editor: 'Scope Ratings', tipo: 'Primaria', fecha: '2021-10-11', url: 'https://www.emdgroup.com/investors/shares-and-bonds/credit-ratings/us/21-10-11_Scope+Ratings_Merck+KGaA+Rating+Report_NA.pdf' },
    { id: 18, titulo: 'goldesel.de, «Merck KGaA kauft Bio-Techne für 73 US-Dollar je Aktie» (financiación con caja y deuda nueva, manteniendo el grado de inversión).' + EXT, editor: 'goldesel.de', tipo: 'Prensa', fecha: '2026-06-25', url: 'https://goldesel.de/aktien/news/merck-kgaa-kauft-bio-techne-fur-73-us-dollar-je-aktie-113-mrd-dollar-deal-mit-36-pramie' },
    { id: 20, titulo: 'Merck KGaA, Informe anual 2024: estados financieros consolidados (proveedores 2.275 M; provisiones para prestaciones a empleados 1.956 M).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2025-03-06', url: 'https://www.emdgroup.com/en/annualreport/2024/_assets/downloads/cfs-consolidated-financial-statements-emd-ar24.pdf' },
    { id: 19, titulo: 'Merck KGaA, consenso VARA del 1T26 (BPA pre medio 1,96).' + EXT, editor: 'Merck KGaA / VARA Research', tipo: 'Analistas', fecha: '2026-05', url: 'https://www.emdgroup.com/en/investors/shares-and-bonds/analysts-and-consensus' },
  ],
  huecos: [
    { seccion: 'financieros', campo: 'coste_ventas y gastos_generales', tipo: 'Complemento', intentos: '1) informe anual 2025 por búsqueda: solo resumen de cinco años; 2) Stock Analysis: sin desglose en el extracto; 3) cuentas trimestrales: sin desglose', decision: 'Omitido' },
    { seccion: 'balance', campo: 'existencias, clientes y proveedores de 2021-2023; proveedores y pensiones de 2025', tipo: 'Complemento', intentos: '1) balance consolidado 2025 (existencias y clientes sí; proveedores y pensiones no); 2) agregadores (Fintel, Simply Wall St) con cifras discrepantes; 3) informe del 2T26: solo deuda neta', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'dividendos pagados y pagos de arrendamientos', tipo: 'Complemento', intentos: '1) resumen de cinco años; 2) Stock Analysis; 3) Stockopedia (filas vacías)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'auditor, opinión y señales', tipo: 'Complemento', intentos: '1) informe anual 2025; 2) orden del día de la junta 2026 (elección del auditor aprobada con >99 %, sin nombre en el extracto); 3) prensa', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografías', tipo: 'Complemento', intentos: '1) informe anual 2025; 2) presentación a analistas; 3) agregadores', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const B = {
  _estado: 'Mínimo (presupuesto de búsquedas reservado a cuentas y valoración). Sector y competencia con lo verificado; tamaños de mercado en huecos.',
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los tres grandes proveedores mundiales de herramientas y consumibles de ciencias de la vida (con Thermo Fisher y Danaher), proveedor líder de materiales para semiconductores y farmacéutica mediana en oncología, neurología y fertilidad.',
    competidores: [
      { nombre: 'Thermo Fisher Scientific', pais: 'EE. UU.', ticker: 'TMO', ingresos: 39850, cuota_pct: null, margen_ebit_pct: 17.4, comentario: 'Ventas 2025 de 44.556 M USD y EBIT de 7.746 M [1], convertidos a 1,1181 USD/EUR. Líder en herramientas y servicios de laboratorio y CDMO.' },
      { nombre: 'Danaher', pais: 'EE. UU.', ticker: 'DHR', ingresos: 21973, cuota_pct: null, margen_ebit_pct: 19.1, comentario: 'Ventas 2025 de 24.568 M USD y EBIT de 4.690 M [2]. Competidor directo en bioprocesos (Cytiva, Pall).' },
      { nombre: 'Sartorius', pais: 'Alemania', ticker: 'SRT3', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor en consumibles de bioprocesos (filtración, bolsas de un solo uso).' },
      { nombre: 'Bio-Techne', pais: 'EE. UU.', ticker: 'TECH', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Reactivos y proteínas para investigación; Merck acordó comprarla el 25-jun-2026 por 73 USD por acción [3].' },
    ],
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'Bio-Techne', comprador: 'Merck KGaA', ev: 9900, ev_ventas: null, ev_ebitda: 26.5, prima_pct: 25, excluir: false, comentario: '73 USD por acción en efectivo; valor empresa ≈ 11.300 M USD (9.900 M EUR); prima del 25 % sobre el cierre previo (36 % sobre la media de un mes); ≈ 26,5 veces el EBITDA esperado de 2026; sinergias de costes de 140 M EUR al tercer año [3, 4].' },
      { fecha: '2025-04', objetivo: 'SpringWorks Therapeutics', comprador: 'Merck KGaA', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '47 USD por acción (≈ 3.900 M USD); oncología de tumores raros, sin EBITDA positivo: no da múltiplo [5].' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'Thermo Fisher Scientific, Form 10-K 2025 (cifras tomadas del análisis paralelo del repo del 14-oct-2026).' + EXT, editor: 'Thermo Fisher / SEC', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.sec.gov/Archives/edgar/data/97745/000009774526000018/tmo-20251231.htm' },
    { id: 2, titulo: 'Danaher, Form 10-K 2025 (cifras tomadas del análisis paralelo del repo del 14-oct-2026).' + EXT, editor: 'Danaher / SEC', tipo: 'Primaria', fecha: '2026-02', url: 'https://www.sec.gov/Archives/edgar/data/313616/000031361626000062/dhr-20251231.htm' },
    { id: 3, titulo: 'Merck KGaA, «Agreement to acquire Bio-Techne» (25-jun-2026).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-06-25', url: 'https://www.emdgroup.com/en/news/agreement-to-acquire-bio-techne-25-06-2026' },
    { id: 4, titulo: 'stock3, «Merck macht teuren Milliardenzukauf in den USA».' + EXT, editor: 'stock3', tipo: 'Prensa', fecha: '2026-06', url: 'https://stock3.com/news/merck-macht-teuren-milliardenzukauf-in-den-usa-17133251' },
    { id: 5, titulo: 'Börsengeflüster (newswire), Merck confirma conversaciones avanzadas con SpringWorks.' + EXT, editor: 'Merck KGaA / Börsengeflüster', tipo: 'Primaria', fecha: '2025-04', url: 'https://app.boersengefluester.de/en/newswire/DE0006599905/merck-kgaa/merck-confirms-late-stage-discussions-with-springworks-therapeutics-inc-on-potential-acquisition-2123844' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'tamaño, serie, TCAC, CR5', tipo: 'Núcleo', intentos: '1) informe anual 2025 (mercado objetivo de Life Science): no buscado por presupuesto compartido; 2) estimaciones de Evaluate/IQVIA y SEMI: sin búsqueda; 3) análisis paralelos de Thermo Fisher y Danaher del repo (sin cifra de mercado para Merck)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Núcleo', intentos: '1) informe anual; 2) prensa sectorial; 3) derivar de ventas/mercado: sin tamaño de mercado', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones con múltiplo (mínimo 3)', tipo: 'Complemento', intentos: '1) Bio-Techne (sí); 2) SpringWorks (sin EBITDA); 3) otras del sector (Abcam, Olink, Solventum purificación) sin múltiplo verificable con WebSearch', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones y controversias', tipo: 'Complemento', intentos: '1) informe de sostenibilidad: no buscado; 2) MSCI/Sustainalytics: no buscado; 3) prensa: nada relevante en las búsquedas hechas', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'Parcial: estructura de control, relevo del CEO y votos de la junta 2026. Sin consejo completo, remuneraciones ni operaciones de directivos.',
  directivos: {
    equipo: [
      { nombre: 'Kai Beckmann', cargo: 'Presidente de la Dirección (CEO)', desde: '2026', participacion_pct: null, trayectoria: 'En la Dirección desde 2011; desde 2017 dirigió Performance Materials, que convirtió en el negocio puro de Electronics (Versum, Intermolecular) [1]. CEO desde el 1-may-2026, tras Belén Garijo [2].' },
      { nombre: 'Belén Garijo', cargo: 'CEO saliente (2021-abr-2026)', desde: '2011', participacion_pct: null, trayectoria: 'Quince años en Merck, primero al frente de Healthcare y desde 2021 como presidenta de la Dirección; su mandato terminó en abril de 2026 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ventas 20.800-21.400 M, EBITDA pre 6.000-6.200 M, BPA pre 8,20-8,60 (3T25)', real: 'Ventas 21.102 M, EBITDA pre 6.109 M, BPA pre 8,34', cumplida: 'Sí' },
      { anio: '2023', guia: 'BPA pre 8,25-9,35', real: 'BPA pre 8,49', cumplida: 'Sí' },
      { anio: '2021', guia: 'BPA pre 8,50-9,00 (tras subir la guía)', real: 'BPA pre 8,72', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial (mar-26) por debajo del consenso; subida en mayo (BPA pre 7,50-8,20) y en agosto (7,90-8,60)', real: 'En curso', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: null, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: null, auditoria_independiente: null, insiders_sin_operaciones: null,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 87.23, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'E. Merck KG (familia Merck)', pct: 70.3, tipo: 'Control (socio personalmente responsable; participa en el capital total, no en acciones cotizadas)', variacion: 'Sin cambios' },
      { nombre: 'Capital flotante (acciones cotizadas)', pct: 29.7, tipo: 'Flotante', variacion: '—' },
    ],
    insiders: [],
    alertas: ['Relevo del CEO el 1-may-2026 (Kai Beckmann sustituye a Belén Garijo), anunciado en septiembre de 2025 con siete meses de antelación [1, 2].', 'Informe de remuneraciones de 2025 aprobado con un 87,23 % (88,28 % el año anterior) [3].'],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Merck KGaA, «Kai Beckmann to succeed Belén Garijo as Chair of the Executive Board and CEO» (25-sep-2025).' + EXT, editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2025-09-25', url: 'https://www.emdgroup.com/en/news/garijo-beckmann-25-09-25' },
    { id: 2, titulo: 'chemeurope.com, «Kai Beckmann to become Merck\'s new CEO on May 1, 2026».' + EXT, editor: 'chemeurope.com', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://www.chemeurope.com/en/news/1188594/kai-beckmann-to-become-merck-s-new-ceo-on-may-1-2026.html' },
    { id: 3, titulo: 'Merck KGaA, resultados de las votaciones de la junta general de 24-abr-2026.' + EXT, editor: 'Merck KGaA / hauptversammlung.de', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.hauptversammlung.de/fileadmin/public/user_upload/Merck_result26.pdf' },
    { id: 4, titulo: 'Merck KGaA, orden del día de la junta general 2026.' + EXT, editor: 'Merck KGaA / hauptversammlung.de', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.hauptversammlung.de/fileadmin/public/user_upload/Merck_TO26.pdf' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'consejo de supervisión y comités', tipo: 'Núcleo', intentos: '1) informe anual 2025 (declaración de gobierno corporativo): no accesible; 2) orden del día de la junta 2026: solo títulos; 3) búsqueda de prensa: nada', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneración del CEO', tipo: 'Complemento', intentos: '1) informe de remuneraciones 2025 (no abierto); 2) orden del día; 3) prensa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos (Directors\' Dealings)', tipo: 'Complemento', intentos: '1) registro de la BaFin: no accesible; 2) web de la empresa: no accesible; 3) prensa: nada', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const D = {
  _estado: 'Completo en lo esencial: precio, acciones, consenso parcial, comparables (reutilizados de los análisis paralelos), cierres anuales y bono.',
  identificacion: {
    nombre: 'Merck KGaA', nombre_corto: 'Merck KGaA', ticker: 'MRK', isin: 'DE0006599905', mercado: 'Xetra (Fráncfort)', indice_referencia: 'DAX',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Salud', industria: 'Farmacéuticas, biotecnología y ciencias de la vida', sede: 'Darmstadt', fundacion: '1668', empleados: null, web: 'https://www.merckgroup.com',
    precio: 137.20, fecha_precio: '2026-10-13', acciones: 434.8, capitalizacion_publicada: 63330, free_float_pct: 29.7,
    max_52s: 148.60, min_52s: null, volumen_medio_diario: null, proximos_resultados: '2026-11-12',
  },
  identificacion_nota: 'Precio: 137,20 EUR el 13-oct-2026 (Börse Stuttgart, 20:16; día anterior 138,10) [1]; sin cierre de Xetra verificable. Acciones: 434,8 M de capital total equivalente (129,2 M cotizadas más la participación de E. Merck KG), con las que la empresa calcula el BPA; la capitalización publicada de 63.330 M a 145,65 EUR [2] da 434,8 M. Máximo de 52 semanas 148,60 [3]. Próximos resultados (3T26): fecha no confirmada; el 3T25 se publicó el 13-nov.',
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 21040, ebitda: 5920, ebit: null, bpa: 7.78, dpa: null, fuente: 'Ventas y EBITDA: MarketScreener; BPA pre: consenso VARA encargado por la empresa (media; rango 7,45-8,03) [4, 5]' },
      { periodo: '2027e', ingresos: 22060, ebitda: 6330, ebit: null, bpa: null, fuente: 'MarketScreener [4]; beneficio neto S&P Global 2.907 M (≈ 6,69 por acción, base publicada) [6]' },
      { periodo: '2028e', ingresos: 23280, ebitda: 6820, ebit: null, bpa: null, fuente: 'MarketScreener [4]; beneficio neto S&P Global 3.216 M (≈ 7,40 por acción, base publicada) [6]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 13, mantener: null, vender: null, po_medio: 146.11, po_min: 130, po_max: 167 },
    recomendaciones_nota: 'Objetivo medio de 146,11 EUR del consenso VARA [5] (Ariva: 151,43 con 7 análisis [7]). 13 de 17 analistas con «Comprar» a finales de 2025 [8]. Objetivos recientes: Deutsche Bank 141 (Mantener, 11-ago-2026) [9], Barclays 150 (8-sep-2026) [1], Goldman Sachs 155, DZ Bank 150 (Comprar), UBS 150 (Neutral) [3, 4]; AlphaValue 167 (Comprar, abr-2026) [10]. Mínimo 130 (Barclays, fecha no visible) [9].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 227.00, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 180.90, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 144.10, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 139.90, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 122.60, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    cierre_2020: 140.35,
    nota: 'Cierres de Xetra de Börsengeflüster y Traders Union (coinciden 2020-2024; 2025: 122,60 frente a 122,20) [11, 12].',
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'Thermo Fisher', ticker: 'TMO', pais: 'US', capitalizacion: 223563, ev_ventas: 6.21, ev_ebitda_ltm: 26.1, ev_ebitda_ntm: null, per_ntm: 24.6, crecimiento_pct: null, margen_ebitda_pct: 23.8, roic_pct: 7.3, dn_ebitda: 3.5, fcf_yield_pct: 2.5 },
      { nombre: 'Danaher', ticker: 'DHR', pais: 'US', capitalizacion: 135538, ev_ventas: 6.92, ev_ebitda_ltm: 24.5, ev_ebitda_ntm: null, per_ntm: 25.3, crecimiento_pct: null, margen_ebitda_pct: 28.2, roic_pct: 5.5, dn_ebitda: 3.1, fcf_yield_pct: 3.5 },
      { nombre: 'Agilent', ticker: 'A', pais: 'US', capitalizacion: null, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 20.6, crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null },
      { nombre: 'Qiagen', ticker: 'QGEN', pais: 'NL', capitalizacion: 7412, ev_ventas: null, ev_ebitda_ltm: 13.1, ev_ebitda_ntm: 12.2, per_ntm: 21.0, crecimiento_pct: 3.8, margen_ebitda_pct: 35.7, roic_pct: 11.4, dn_ebitda: 1.1, fcf_yield_pct: 4.8 },
      { nombre: 'Novartis', ticker: 'NOVN', pais: 'CH', capitalizacion: null, ev_ventas: 5.47, ev_ebitda_ltm: 13.4, ev_ebitda_ntm: 12.5, per_ntm: 17.2, crecimiento_pct: 7.0, margen_ebitda_pct: 40.7, roic_pct: 18.8, dn_ebitda: 1.8, fcf_yield_pct: 6.1 },
      { nombre: 'AstraZeneca', ticker: 'AZN', pais: 'GB', capitalizacion: null, ev_ventas: 4.44, ev_ebitda_ltm: 13.5, ev_ebitda_ntm: 11.4, per_ntm: 18.3, crecimiento_pct: 7.8, margen_ebitda_pct: 33.0, roic_pct: 16.1, dn_ebitda: 1.35, fcf_yield_pct: 4.3 },
      { nombre: 'Sanofi', ticker: 'SAN', pais: 'FR', capitalizacion: null, ev_ventas: 2.05, ev_ebitda_ltm: 7.4, ev_ebitda_ntm: 6.6, per_ntm: 9.9, crecimiento_pct: 0.2, margen_ebitda_pct: 27.7, roic_pct: 9.1, dn_ebitda: 1.27, fcf_yield_pct: 11.7 },
      { nombre: 'GSK', ticker: 'GSK', pais: 'GB', capitalizacion: null, ev_ventas: 2.54, ev_ebitda_ltm: 7.8, ev_ebitda_ntm: 6.9, per_ntm: 11.7, crecimiento_pct: 5.4, margen_ebitda_pct: 32.6, roic_pct: 26.4, dn_ebitda: 1.4, fcf_yield_pct: 9.6 },
    ],
    nota: 'Cifras de los comparables tomadas de los análisis paralelos del repo con corte del 14-oct-2026 (Mettler-Toledo y Danaher para herramientas; Roche para farmacéuticas), que las sacaron de Stock Analysis y MarketScreener [13]. Capitalizaciones en USD convertidas a 1,1181 USD/EUR (BCE, 12-oct) [14]; las de Novartis, AstraZeneca, Sanofi y GSK se dejan vacías (venían en CHF).',
    confianza: 'Media',
  },
  wacc_datos: { bund_10a_pct: 3.53, prima_implicita_pct: 4.2 },
  fuentes: [
    { id: 1, titulo: 'boerse.de, ficha de la acción Merck KGaA (137,20 EUR el 13-oct-2026; Barclays sube el objetivo a 150 EUR el 8-sep-2026).' + EXT, editor: 'boerse.de', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://www.boerse.de/aktien/Merck-Aktie/DE0006599905' },
    { id: 2, titulo: 'Stockopedia, Merck KGaA (ETR:MRK): capitalización 63.330 M EUR a 145,65 EUR.' + EXT, editor: 'Stockopedia', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://www.stockopedia.com/share-prices/merck-k-ga-a-ETR:MRK/' },
    { id: 3, titulo: 'finanzen.at y Lynx: cotizaciones de agosto de 2026 (máximo de 52 semanas 148,60; Goldman Sachs 155; DZ Bank 150).' + EXT, editor: 'finanzen.at / Lynx', tipo: 'Datos de mercado', fecha: '2026-08', url: 'https://www.finanzen.at/analyse/merck-kaufen-1057155' },
    { id: 4, titulo: 'MarketScreener, Merck KGaA: finanzas y estimaciones 2026-2028 (ventas y EBITDA).' + EXT, editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10', url: 'https://uk.marketscreener.com/quote/stock/MERCK-KGAA-436395/finances/' },
    { id: 5, titulo: 'Merck KGaA, consenso de analistas VARA (BPA pre y objetivo medio).' + EXT, editor: 'Merck KGaA / VARA Research', tipo: 'Analistas', fecha: '2026-05', url: 'https://www.emdgroup.com/en/investors/shares-and-bonds/analysts-and-consensus' },
    { id: 6, titulo: 'Simply Wall St, Merck KGaA: previsiones de beneficio (S&P Global) 2026-2028.' + EXT, editor: 'Simply Wall St', tipo: 'Analistas', fecha: '2026-10', url: 'https://simplywall.st/stocks/de/pharmaceuticals-biotech/fra-mrk/merck-kgaa-shares/future' },
    { id: 7, titulo: 'Ariva, objetivos de precio de Merck KGaA (media 151,43 EUR, 7 análisis).' + EXT, editor: 'Ariva', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.ariva.de/merck-aktie/kursziele' },
    { id: 8, titulo: 'Lynx Broker, análisis de Merck (30-dic-2025: 122,60 EUR; 13 de 17 analistas en Comprar; objetivo medio ≈ 144).' + EXT, editor: 'Lynx Broker', tipo: 'Analistas', fecha: '2025-12-30', url: 'https://www.lynxbroker.de/boerse/boerse-kurse/aktien/merck-aktie/merck-analyse/' },
    { id: 9, titulo: 'goldesel.de, «Deutsche Bank Research hebt Kursziel auf 141 EUR an» (11-ago-2026) y Barclays 130 EUR.' + EXT, editor: 'goldesel.de', tipo: 'Analistas', fecha: '2026-08-11', url: 'https://goldesel.de/aktien/news/merck-kgaa-kursziel-auf-141-eur-angehoben-trotz-hold-bleibt-die-aktie-unter-beobachtung' },
    { id: 10, titulo: 'Option Finance, «AlphaValue diminue sa cible de cours sur Merck KGaA» (16-abr-2026).' + EXT, editor: 'Option Finance', tipo: 'Analistas', fecha: '2026-04-16', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2026-04-16-alphavalue-diminue-sa-cible-de-cours-sur-merck-kgaa.html' },
    { id: 11, titulo: 'Börsengeflüster, Merck KGaA: históricos de cotización (cierres anuales).' + EXT, editor: 'Börsengeflüster', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://app.boersengefluester.de/en/c/profile/p/DE0006599905/histories' },
    { id: 12, titulo: 'Traders Union, Merck KGaA (MRK/EUR) historical price data.' + EXT, editor: 'Traders Union', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://tradersunion.com/currencies/price-history/mrk-eur/' },
    { id: 13, titulo: 'Stock Analysis y MarketScreener: múltiplos de los comparables (vía los análisis paralelos de Mettler-Toledo, Danaher y Roche del 14-oct-2026).' + EXT, editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/' },
    { id: 14, titulo: 'Banco Central Europeo, tipos de cambio de referencia del euro (1,1181 USD/EUR, 12-oct-2026).', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://data-api.ecb.europa.eu/service/data/EXR/D.USD+GBP.EUR.SP00.A?startPeriod=2026-10-01&format=csvdata' },
    { id: 15, titulo: 'Deutsche Bundesbank, rendimiento del Bund a 10 años (3,53 %, 12-oct-2026; dato del análisis paralelo de Amadeus).', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-12', url: 'https://www.bundesbank.de/en/statistics/money-and-capital-markets/interest-rates-and-yields' },
    { id: 16, titulo: 'Damodaran, prima de riesgo implícita mensual (ERPbymonth.xlsx; 4,20 % en octubre de 2026).', editor: 'NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'rentabilidades, beta, volatilidad, caída máxima', tipo: 'Complemento', intentos: '1) herramientas/bolsa.mjs: sin red; 2) Yahoo/Stockopedia por búsqueda: solo cotizaciones sueltas; 3) cálculo con cierres anuales: insuficiente para beta', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'BPA pre 2027e y 2028e', tipo: 'Núcleo', intentos: '1) consenso VARA de la empresa: solo el año en curso; 2) MarketScreener: solo ventas y EBITDA en el extracto; 3) S&P Global vía Simply Wall St: beneficio neto publicado (no pre)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'Hecho con WebSearch (sin acceso directo a Reddit, Stocktwits ni wallstreet-online). Lo disponible es prensa con opinión, comunidades de valoración y notas de analistas comentadas.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'stock3 (comentario de mercado alemán)', fecha: '2026-06', n_comentarios: null, tono: 'Negativo', resumen: 'La compra de Bio-Techne se ve estratégicamente lógica pero cara (≈ 26,5 veces el EBITDA de 2026) y «de momento no ayuda a la acción» [1].' },
      { plataforma: 'AInvest (análisis con debate)', fecha: '2026-08', n_comentarios: null, tono: 'Dividido', resumen: 'El mercado sigue descontando el riesgo de Healthcare pese a la mejor caja; la integración de Bio-Techne y el margen de Electronics son los retos [2].' },
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-09', n_comentarios: null, tono: 'Positivo', resumen: 'Las narrativas de usuarios ven la acción infravalorada, apoyadas en el crecimiento de Process Solutions y la cartera de pedidos [3].' },
      { plataforma: 'boerse-express (prensa con comentarios)', fecha: '2025-10', n_comentarios: null, tono: 'Negativo', resumen: 'El día del inversor de octubre de 2025 «asustó» por la guía de 2026; referencia del suelo desde el que rebotó la acción [4].' },
      { plataforma: 'Zonebourse / Tradingsat (notas comentadas)', fecha: '2026', n_comentarios: null, tono: 'Positivo', resumen: 'DZ Bank defiende que la guía conservadora deja margen a sorpresas y que el descuento frente a Danaher y Thermo Fisher no está justificado [5].' },
    ],
    temas: [
      { tema: 'Precio pagado por Bio-Techne', postura: 'Bajista', peso: 'Alto', contraste: 'El múltiplo (≈ 26,5x EBITDA) es alto, pero la compra no entra en nuestro BPA ni en el DCF: la propia empresa no espera que aporte al BPA pre hasta el tercer año.' },
      { tema: 'Healthcare tras Mavenclad', postura: 'Bajista', peso: 'Alto', contraste: 'Healthcare cayó un 3,4 % orgánico en el 2T26 y la guía supone cero ventas de Mavenclad en EE. UU. desde agosto; nuestro 2027e lo incorpora con un crecimiento del grupo del 3 %.' },
      { tema: 'Electronics y la IA', postura: 'Alcista', peso: 'Medio', contraste: 'Electronics creció un 11,7 % orgánico en el 2T26: es el motor que permitió subir dos veces la guía.' },
      { tema: 'Descuento frente a Thermo Fisher y Danaher', postura: 'Alcista', peso: 'Medio', contraste: 'Merck cotiza a ≈ 16 veces nuestro BPA de 2027e frente a 24-25 veces de los dos estadounidenses; parte del descuento es la mezcla (farmacia y electrónica) y el control familiar.' },
    ],
    confianza: 'Baja',
  },
  fuentes: [
    { id: 1, titulo: 'stock3, «Merck macht teuren Milliardenzukauf in den USA».' + EXT, editor: 'stock3', tipo: 'Foros y redes', fecha: '2026-06', url: 'https://stock3.com/news/merck-macht-teuren-milliardenzukauf-in-den-usa-17133251' },
    { id: 2, titulo: 'AInvest, «Merck KGaA: the story is dead, cash flow…».' + EXT, editor: 'AInvest', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.ainvest.com/news/merck-kgaa-story-dead-cash-flow-2608/' },
    { id: 3, titulo: 'Simply Wall St, Merck KGaA: narrativas y valoración de la comunidad.' + EXT, editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://simplywall.st/stocks/de/pharmaceuticals-biotech/etr-mrk/merck-kgaa-shares/news/assessing-merck-kgaa-xtramrk-valuation-following-recent-shar/amp' },
    { id: 4, titulo: 'boerse-express, «Merck Aktie: Kapitalmarkttag schockt».' + EXT, editor: 'boerse-express', tipo: 'Foros y redes', fecha: '2025-10', url: 'https://www.boerse-express.com/news/articles/merck-aktie-kapitalmarkttag-schockt-836370' },
    { id: 5, titulo: 'Tradingsat / Zonebourse, «DZ Bank mise sur des surprises futures pour Merck KGaA».' + EXT, editor: 'Tradingsat', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.tradingsat.com/actualites/informations-societes/dz-bank-mise-sur-des-surprises-futures-pour-merck-kgaa-1157986.html' },
  ],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares (Reddit, Stocktwits, wallstreet-online)', tipo: 'Complemento', intentos: '1) búsqueda en Reddit: sin hilos; 2) wallstreet-online: sin resultados en la búsqueda; 3) Seeking Alpha: sin artículo en los resultados', decision: 'Omitido' },
  ],
};

w('A', A); w('B', B); w('C', C); w('D', D); w('E', E);
console.log('Notas A-E escritas');
