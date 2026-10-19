// Notas A-E de Elm Company (Tadawul 7203, corte 2026-10-19). Arabia Saudí sin XBRL en cuentas.mjs: estados consolidados
// auditados (BDO Dr. Mohamed Al-Amri & Co.) e intermedios revisados descargados de la web de inversores de Elm
// (elm.sa; el servidor no envía el certificado intermedio de DigiCert: se descargó con ese intermedio añadido al almacén,
// sin desactivar la verificación). Los estados primarios de 2025 y del 2T26 vienen con una fuente codificada: se leyeron
// como imagen (pdftoppm); los de 2021-2023 y las notas tienen texto. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/elm-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8')).map((c) => [c.s, c]));
const FS = 'https://elm.sa/en/investor-relations/financial-information/FinancialStatements/';
const AR = 'https://elm.sa/annualreport/2025/pdfs/en/';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Statements for the year ended 31 December 2025 (BDO Dr. Mohamed Al-Amri & Co.): cuenta, balance y flujos de 2025 y 2024, segmentos (nota 35), compra de Thiqah (nota 40), deuda (nota 29), vinculadas (nota 34), zakat (nota 33), dividendos (nota 41)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03', url: `${FS}ELM%20YE25%20FS-EN%20Version%20-%20Signed.pdf` },
  { id: 2, titulo: 'Consolidated Financial Statements for the year ended 31 December 2023 (BDO): cuenta, balance y flujos de 2023 y 2022, segmentos, acreedores', editor: 'Elm Company', tipo: 'Primaria', fecha: '2024-03-10', url: `${FS}Elm%20YE%2023%20Signed%20Financial%20Statements%20-%20EN.pdf` },
  { id: 3, titulo: 'Consolidated Financial Statements for the year ended 31 December 2022 (segmentos de 2022 y 2021)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2023-03', url: `${FS}ELM%20YE22%20FS-%20Final%20EN%20-%20Signed.pdf` },
  { id: 4, titulo: 'Consolidated Financial Statements for the year ended 31 December 2021 (cuenta, balance y flujos de 2021 y 2020; segmentos)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2022-03', url: `${FS}2021%20Elm%20Consolidated%20FS%20-%20EN.pdf` },
  { id: 5, titulo: 'Interim condensed consolidated financial statements, three and six months ended 30 June 2026 (revisión limitada de BDO, 5-ago-2026): cuenta trimestral y semestral, balance a 30-jun-2026, flujos, compra de Sahel Al Madar', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-08-05', url: `${FS}ELM%20Q2%2026%20FS%20-EN%20-%20Signed%20Final.pdf` },
  { id: 6, titulo: 'Interim condensed consolidated financial statements, three months ended 31 March 2026 (ingresos de clientes privados y de organismos públicos)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-05', url: `${FS}ELM%20Q1%2026%20FS%20-English-%20Signed.pdf` },
  { id: 7, titulo: 'Interim condensed consolidated financial statements, three and nine months ended 30 September 2025 (3T25 y 3T24; ingresos privados y públicos; reclasificaciones de 2024)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2025-11-02', url: `${FS}ELM%20Q3%2025%20FS%20-EN%20Signed.pdf` },
  { id: 8, titulo: 'Earnings Release: annual financial results 2025 (aportación de Thiqah: 1.088 M de ingresos y −69,7 M de resultado operativo; reversión de zakat de 69 M)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03-01', url: `${FS}Earnings%20Release%20YE%202025%20-EN.pdf` },
  { id: 9, titulo: 'Earnings Release H1 2026 (resultados del 1S26 por segmento)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-08-03', url: `${FS}Press%20Release%20H1%202026%20-EN.pdf` },
  { id: 10, titulo: 'H1 2026 Results Presentation (3-ago-2026): seis primeros productos, Thiqah, adjudicaciones de proyectos (4.800 M en el 2T26), días de cobro, guía de 2026', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-08-03', url: `${FS}Results%20presentation-H1-2026-EN.pdf` },
  { id: 11, titulo: 'FY2025 Results Presentation: seis primeros productos (4.457 M), Thiqah reexpresada (ventas 1.548 M, pérdida −177 M), IA, guía de 2026', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03', url: `${FS}Results%20presentation%20%20-FY2025-EN.pdf` },
  { id: 12, titulo: 'Annual Report 2025, Dividends (política y dividendos de 2025; 4,5 SAR por el 2S25)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Dividends.pdf` },
];

// Cuenta por función (NIIF adoptadas en Arabia Saudí). EBITDA = beneficio operativo + «depreciation and amortization» de la cuenta
// (la misma cifra que suma el estado de flujos y la que usa el consenso de MarketScreener). Los deterioros (5,9-36,5 M al año) y la
// amortización de gastos anticipados a largo plazo (67 M en 2025) quedan dentro del EBITDA. gastos_generales = I+D + comerciales
// + administración (las pérdidas esperadas de crédito, aparte, dentro del EBIT). resultado_financiero = todo lo que hay entre el
// beneficio operativo y el resultado antes de zakat (intereses de murabahas, coste financiero, participadas, valor razonable y otros
// ingresos). impuestos = zakat. BPA diluido publicado; acciones diluidas = beneficio atribuido ÷ BPA diluido.
// DPA = dividendo pagado en el año por acción (2022: 388 M ÷ 80 M; 2023: 6,0; 2024: 7,5; 2025: 4,0 + 4,5).
const cuenta = [
  { periodo: '2021', ingresos: 3827.65, coste_ventas: 2632.25, gastos_generales: 375.12, ebitda: 730.25, amortizaciones: 115.66, ebit: 614.60, resultado_financiero: 34.02, bai: 648.62, impuestos: 81.73, minoritarios: 0, beneficio_neto: 566.89, gastos_financieros: 4.78, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 7.09, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 80.0 },
  { periodo: '2022', ingresos: 4606.10, coste_ventas: 2720.24, gastos_generales: 608.14, ebitda: 1092.44, amortizaciones: 120.05, ebit: 972.39, resultado_financiero: 50.69, bai: 1023.08, impuestos: 92.89, minoritarios: 0, beneficio_neto: 930.19, gastos_financieros: 7.94, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 11.63, dpa: 4.85, dpa_extraordinario: 0, acciones_diluidas: 79.98 },
  { periodo: '2023', ingresos: 5898.36, coste_ventas: 3547.31, gastos_generales: 752.83, ebitda: 1500.54, amortizaciones: 149.95, ebit: 1350.58, resultado_financiero: 122.67, bai: 1473.25, impuestos: 117.06, minoritarios: -0.04, beneficio_neto: 1356.23, gastos_financieros: 5.86, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 16.95, dpa: 6.0, dpa_extraordinario: 0, acciones_diluidas: 80.01 },
  { periodo: '2024', ingresos: 7406.79, coste_ventas: 4375.70, gastos_generales: 967.71, ebitda: 1899.29, amortizaciones: 198.84, ebit: 1700.45, resultado_financiero: 253.42, bai: 1953.87, impuestos: 127.02, minoritarios: -0.02, beneficio_neto: 1826.87, gastos_financieros: 28.45, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 23.44, dpa: 7.5, dpa_extraordinario: 0, acciones_diluidas: 77.94 },
  { periodo: '2025', ingresos: 9464.88, coste_ventas: 5787.33, gastos_generales: 1257.26, ebitda: 2284.37, amortizaciones: 254.42, ebit: 2029.95, resultado_financiero: 106.09, bai: 2136.04, impuestos: 45.71, minoritarios: -0.03, beneficio_neto: 2090.35, gastos_financieros: 105.80, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 26.80, dpa: 8.5, dpa_extraordinario: 0, acciones_diluidas: 78.0 },
];
// LTM a jun-26 = 2025 + 1S26 − 1S25 [1, 5]. Lleva la plusvalía no recurrente de 59,1 M por la toma de control de Sahel Al Madar
// (debajo del EBIT) y el zakat normal; 2025 llevaba la reversión de zakat de 69 M.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 10339.76, ebitda: 2498.11, ebit: 2183.51, beneficio_neto: 2174.28, bpa: 27.86, dpa: 9.5, dpa_extraordinario: 0, fcf: 2122.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance al cierre. caja = efectivo + depósitos murabaha + fondos monetarios (otros activos financieros corrientes).
// deuda_financiera: 2021-2023, el aplazamiento del pago de un inmueble; 2025, el préstamo de 1.900 M de SNB (+ comisión devengada).
// proveedores = acreedores comerciales + participación en ingresos a socios públicos («income sharing») + coste contractual.
// inmovilizado_material = inmovilizado + obra en curso (sin derechos de uso). reservas = ganancias acumuladas.
const balanceH = [
  { periodo: '2021', activo_total: 5194.29, activo_corriente: 4392.47, pasivo_corriente: 1984.04, pasivo_total: 2384.63, fondo_comercio: 0, intangibles: 165.27, inmovilizado_material: 404.59, existencias: 0, clientes: 1654.81, proveedores: 1079.45, activos_contrato: 660.30, pasivos_contrato: 235.71, caja: 1954.05, deuda_financiera: 74.26, arrendamientos: 106.83, patrimonio_neto: 2809.66, minoritarios: 0, reservas: 1954.51 },
  { periodo: '2022', activo_total: 6026.39, activo_corriente: 5155.16, pasivo_corriente: 2575.33, pasivo_total: 2979.38, fondo_comercio: 0, intangibles: 179.63, inmovilizado_material: 411.28, existencias: 0, clientes: 1465.08, proveedores: 1501.94, activos_contrato: 804.46, pasivos_contrato: 472.26, caja: 2672.90, deuda_financiera: 50.14, arrendamientos: 82.76, patrimonio_neto: 3047.01, minoritarios: 0, reservas: 2403.68 },
  { periodo: '2023', activo_total: 8097.21, activo_corriente: 6966.73, pasivo_corriente: 3529.76, pasivo_total: 4102.54, fondo_comercio: 0, intangibles: 174.65, inmovilizado_material: 494.99, existencias: 0, clientes: 2322.35, proveedores: 2292.06, activos_contrato: 847.63, pasivos_contrato: 503.71, caja: 3459.30, deuda_financiera: 25.40, arrendamientos: 224.08, patrimonio_neto: 3994.51, minoritarios: 0.16, reservas: 3301.73 },
  { periodo: '2024', activo_total: 9554.06, activo_corriente: 8026.50, pasivo_corriente: 3392.56, pasivo_total: 4260.81, fondo_comercio: 0, intangibles: 70.61, inmovilizado_material: 569.14, existencias: 0, clientes: 2895.22, proveedores: 1883.79, activos_contrato: 641.67, pasivos_contrato: 609.81, caja: 4157.47, deuda_financiera: 0, arrendamientos: 566.01, patrimonio_neto: 5293.10, minoritarios: 0.14, reservas: 4725.55 },
  { periodo: '2025', activo_total: 11886.99, activo_corriente: 9801.54, pasivo_corriente: 5605.59, pasivo_total: 8265.68, fondo_comercio: 0, intangibles: 251.08, inmovilizado_material: 885.47, existencias: 0, clientes: 3606.50, proveedores: 2738.01, activos_contrato: 1173.20, pasivos_contrato: 1407.44, caja: 4546.97, deuda_financiera: 1973.41, arrendamientos: 653.48, patrimonio_neto: 3621.20, minoritarios: 0.11, reservas: 3062.12 },
];

// Flujos. capex = inmovilizado e intangibles + obra en curso + pagos aplazados del inmueble (2021-2024). No incluye las altas de
// gastos anticipados a largo plazo (98 M en 2025; su amortización va dentro del EBITDA). adquisiciones 2025 = Thiqah neta de caja
// (3.141,1 M) + aportaciones a asociadas (19,6 M). recompras 2022 = autocartera para el plan de acciones de empleados.
const flujosH = [
  { periodo: '2021', flujo_operativo: 598.43, capex: 117.87, pagos_arrendamientos: 32.73, adquisiciones: 0.15, desinversiones: 7.80, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 3.80 },
  { periodo: '2022', flujo_operativo: 1706.17, capex: 177.80, pagos_arrendamientos: 26.38, adquisiciones: 0, desinversiones: 1.17, dividendos: 388.0, recompras: 307.2, emision_acciones: 0, intereses_en_financiacion: 2.73 },
  { periodo: '2023', flujo_operativo: 1558.62, capex: 233.35, pagos_arrendamientos: 39.48, adquisiciones: 0, desinversiones: 0.39, dividendos: 466.18, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 1.93 },
  { periodo: '2024', flujo_operativo: 1659.34, capex: 253.55, pagos_arrendamientos: 81.29, adquisiciones: 4.53, desinversiones: 0, dividendos: 582.73, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 7.61 },
  { periodo: '2025', flujo_operativo: 2662.74, capex: 330.06, pagos_arrendamientos: 70.33, adquisiciones: 3160.67, desinversiones: 0, dividendos: 661.21, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 13.72 },
];

// Trimestres (3T24-2T26). Los trimestres sueltos que no se publican se obtienen por diferencia de acumulados [1, 5, 7]:
// 4T24 = 2024 − 9M24; 1T25 = 1S25 − 2T25; 4T25 = 2025 − 9M25; 1T26 = 1S26 − 2T26. EBITDA = beneficio operativo + D&A.
const tri = [
  { periodo: '3T24', ingresos: 1871.54, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 552.20, margen_ebitda_pct: 29.5, bpa: 6.23, vs_consenso: null },
  { periodo: '4T24', ingresos: 2129.23, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 458.22, margen_ebitda_pct: 21.5, bpa: 6.82, vs_consenso: null },
  { periodo: '1T25', ingresos: 1877.42, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 511.83, margen_ebitda_pct: 27.3, bpa: 6.36, vs_consenso: null },
  { periodo: '2T25', ingresos: 2244.77, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 576.97, margen_ebitda_pct: 25.7, bpa: 7.57, vs_consenso: null },
  { periodo: '3T25', ingresos: 2534.99, crecimiento_pct: 35.4, crecimiento_organico_pct: null, ebitda: 660.74, margen_ebitda_pct: 26.1, bpa: 6.98, vs_consenso: null },
  { periodo: '4T25', ingresos: 2807.70, crecimiento_pct: 31.9, crecimiento_organico_pct: null, ebitda: 534.84, margen_ebitda_pct: 19.0, bpa: 6.25, vs_consenso: null },
  { periodo: '1T26', ingresos: 2471.80, crecimiento_pct: 31.7, crecimiento_organico_pct: null, ebitda: 690.87, margen_ebitda_pct: 27.9, bpa: 8.42, vs_consenso: null },
  { periodo: '2T26', ingresos: 2525.28, crecimiento_pct: 12.5, crecimiento_organico_pct: null, ebitda: 611.67, margen_ebitda_pct: 24.2, bpa: 6.57, vs_consenso: null },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Thiqah Business Services, comprada al PIF por 3.385,9 M SAR y consolidada desde el 30-abr-2025 (ocho meses: 1.088 M de ingresos y −69,7 M de resultado operativo). Combinación bajo control común: sin fondo de comercio; el exceso pagado (3.121,8 M) se cargó a reservas.' },
      { periodo: '2026', descripcion: 'Sahel Al Madar (plataforma digital de logística), del 30 % al 60 % el 5-feb-2026; consolidada cinco meses en el 1S26 (14,1 M de ingresos). Plusvalía de 59,1 M por la participación previa.' },
    ],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: { items: tri, ultima_presentacion: null, confianza: 'Alta' },
  balance: {
    historico: balanceH,
    vencimientos: [
      { anio: '2027', importe: 380 }, { anio: '2028', importe: 380 }, { anio: '2029', importe: 380 }, { anio: '2030', importe: 380 },
    ],
    liquidez: 'Caja, murabahas y fondos monetarios de 3.906 M SAR a 30-jun-2026 (1.574,6 M de efectivo, 1.916,2 M en murabahas y 415,4 M en fondos) frente a 1.535,7 M de deuda bancaria; línea de 500 M con Al Rajhi renovada en septiembre-octubre de 2026 [5].',
    rating: 'Sin rating',
    coste_deuda_pct: 5.8,
    vida_media_anios: 2.5,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: null, confianza: 'Alta' },
  calidad: { auditor: 'BDO Dr. Mohamed Al-Amri & Co.', anios_auditor: 3, opinion: 'Favorable', comentario: null, senales: null, confianza: 'Media' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'Thiqah Business Services (100 %, al PIF)', importe: 3385.9, ev_ebitda: null, financiacion: 'Préstamo de 1.900 M de SNB y caja propia', resultado: 'Thiqah perdió 177 M en 2025 (142 M en 2024 reexpresado); sus activos netos se rebajaron 311,4 M al cerrar la auditoría; vuelve a beneficio (1 M) en el 2T26.' },
      { anio: '2026', objetivo: 'Sahel Al Madar (30 % adicional, hasta el 60 %)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pérdida de 6,2 M en cinco meses; plusvalía contable de 59,1 M.' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Negocio digital', descripcion: 'Productos de gobierno digital (Absher, Muqeem, Tamm, Yakeen, Nusuk, Fasah…) y proyectos de tecnología', tipo_resultado: 'Margen bruto', historico: [
        { periodo: '2021', ingresos: 2102.37, resultado: 703.69 }, { periodo: '2022', ingresos: 3151.78, resultado: 1452.33 }, { periodo: '2023', ingresos: 4254.97, resultado: 1959.97 }, { periodo: '2024', ingresos: 5469.46, resultado: 2579.81 }, { periodo: '2025', ingresos: 6724.58, resultado: 3165.57 } ] },
      { nombre: 'Externalización de procesos (BPO)', descripcion: 'Operación de servicios y centros por cuenta de organismos públicos y privados; proyectos en colaboración público-privada', tipo_resultado: 'Margen bruto', historico: [
        { periodo: '2021', ingresos: 1635.18, resultado: 502.55 }, { periodo: '2022', ingresos: 1301.38, resultado: 399.38 }, { periodo: '2023', ingresos: 1478.99, resultado: 366.55 }, { periodo: '2024', ingresos: 1784.76, resultado: 427.97 }, { periodo: '2025', ingresos: 2557.94, resultado: 475.35 } ] },
      { nombre: 'Servicios profesionales', descripcion: 'Consultoría, análisis de datos e IA', tipo_resultado: 'Margen bruto', historico: [
        { periodo: '2021', ingresos: 90.10, resultado: -10.84 }, { periodo: '2022', ingresos: 152.94, resultado: 34.15 }, { periodo: '2023', ingresos: 164.40, resultado: 24.53 }, { periodo: '2024', ingresos: 152.57, resultado: 23.31 }, { periodo: '2025', ingresos: 182.36, resultado: 36.64 } ] },
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos de los seis primeros productos digitales (M SAR)', valor_anterior: '3.943 (2024)', valor_actual: '4.457 (2025); 2.359 en el 1S26', variacion: '+13 %; +14 % en el 1S26', comentario: 'Absher, Muqeem, Tamm, Yakeen, Nusuk y Fasah; Fasah pasó de principal a agente en algunos contratos [11, 10].' },
      { kpi: 'Ingresos de organismos públicos / total', valor_anterior: '38,5 % (2024)', valor_actual: '42,6 % (2025)', variacion: '+4,1 pp', comentario: 'Más un 5,0 % de entidades vinculadas al Estado; el resto, «privados», paga sobre todo tasas de servicios públicos digitales [1].' },
      { kpi: 'Días de cobro (DSO)', valor_anterior: '151 (2025)', valor_actual: '166 (1S26)', variacion: '+15 días', comentario: 'Cobro más lento del sector público [10].' },
      { kpi: 'Flujo operativo / beneficio neto', valor_anterior: '127 % (2025)', valor_actual: '35 % (1S26)', variacion: '−92 pp', comentario: 'Guía de 2026: 85-95 % [10].' },
      { kpi: 'Adjudicaciones de proyectos llave en mano', valor_anterior: 'n. d.', valor_actual: '4.800 M SAR en el 2T26 (9 proyectos)', variacion: '—', comentario: 'Se reconocen en 3-5 años [10].' },
      { kpi: 'Ingresos de Thiqah (M SAR)', valor_anterior: '1.430 (2024 reexpresado)', valor_actual: '1.548 (2025)', variacion: '+8 %', comentario: 'Pérdida de 177 M en 2025; beneficio de 1 M en el 2T26 [11, 10].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento 3T24-2T25 y orgánico por trimestre', tipo: 'Complemento', intentos: '1) Estados intermedios 3T24, 1T25 y 2T25: escaneados, solo dan el trimestre del año anterior para los que sí se leyeron; 2) notas de prensa trimestrales: dan el semestre y el acumulado, no el trimestre de 2023-2024; 3) presentaciones: crecimiento del semestre sin Thiqah no publicado', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Notas de resultados de Elm: no comparan con el consenso; 2) Argaam (análisis del 2T26 de seis casas): de pago; 3) MarketScreener: sin consenso trimestral histórico', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025, Market Overview (mercado TIC de Arabia Saudí ≈ 190.000 M USD en 2025, +5 %; presupuesto público 2026-2028)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Strategic%20Review/Market%20Overview.pdf` },
  { id: 2, titulo: 'Saudi Arabia IT Services Market: 12.090 M USD en 2025, 22.066 M USD en 2034 (TCAC 6,91 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/saudi-arabia-it-services-market' },
  { id: 3, titulo: 'CST reports SAR 180 bn tech market size at Riyadh Forum (mercado de comunicaciones y tecnología de 180.000 M SAR en 2024; TCAC del 7,5 % en cinco años)', editor: 'Sharikat Mubasher', tipo: 'Prensa', fecha: '2025', url: 'https://en.sharikatmubasher.com/media-hub/news/21484890/CST-reports-SAR-180-bn-tech-market-size-at-Riyadh-Forum' },
  { id: 4, titulo: 'Annual Report 2025, Digital Business (plataformas Absher, Muqeem, Tamm, Nusuk, Yakeen; nuevos productos y servicios)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Business%20Review/Digital%20Business.pdf` },
  { id: 5, titulo: 'Annual Report 2025, Research and AI (Nuha, LLM en árabe; IA en Absher, Nusuk y Qiyas)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Strategic%20Review/Research%20and%20AI.pdf` },
  { id: 6, titulo: 'Annual Report 2025, Thiqah Acquisition Case Study', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Strategic%20Review/Thiqah.pdf` },
  { id: 7, titulo: 'Yahoo Finance: ingresos y margen operativo de los últimos doce meses de Solutions by stc (7202), Al Moammar (7200), Perfect Presentation (7204), Tyler Technologies, Booz Allen, Maximus e Infosys (19-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7202.SR' },
  { id: 8, titulo: 'Consolidated Financial Statements 2025, nota 1 (historia y filiales) y nota 34 (vinculadas: 4.034,7 M de ingresos de organismos públicos)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03', url: `${FS}ELM%20YE25%20FS-EN%20Version%20-%20Signed.pdf` },
  { id: 9, titulo: 'FY2025 Results Presentation (IA: 10 servicios en producción; alianza de infraestructura con Humain; objetivos B2B de 250 M en 2026)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03', url: `${FS}Results%20presentation%20%20-FY2025-EN.pdf` },
  { id: 10, titulo: 'Annual Report 2025, Shareholders’ Information (salida a bolsa el 16-feb-2022 a 128 SAR; PIF 67 %)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Overview/Shareholders%20Information.pdf` },
  { id: 11, titulo: 'Annual Report 2025, Risk Management', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Strategic%20Review/Risk%20Management.pdf` },
];
const comp = (s, nombre, pais, fx) => { const c = comps[s]; return { nombre, pais, ticker: s, ingresos: Math.round(c.rev * fx / 1e6), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100) }; };
const B = {
  _estado: 'completo',
  historia: {
    resumen: null,
    hitos: [
      { anio: '1988', hito: 'Se constituye en Riad como Al Elm Information Security Company, ligada al Ministerio del Interior (seguridad de la información y servicios electrónicos) [8].' },
      { anio: '2005', hito: 'Primeros servicios electrónicos del Ministerio del Interior: base de lo que será Absher, la plataforma de trámites de ciudadanos y residentes [4].' },
      { anio: '2009', hito: 'Saudi Information Exchange Company (Tabadul), filial para el intercambio electrónico de información, creada por real decreto [8].' },
      { anio: '2014', hito: 'Emdad Al Khebrat: centros de llamadas y de servicio, base del segmento de externalización (BPO) [8].' },
      { anio: '2021', hito: 'Pasa a sociedad anónima; el capital sube a 800 M SAR [8].' },
      { anio: '2022', hito: 'Salida a bolsa el 16-feb-2022: el PIF vende el 30 % a 128 SAR por acción [10].' },
      { anio: '2025', hito: 'Compra Thiqah Business Services al PIF por 3.385,9 M SAR, financiada con un préstamo de 1.900 M [6].' },
      { anio: '2026', hito: 'Toma el control de Sahel Al Madar (logística digital) y firma contratos de cinco años por reparto de ingresos con el Ministerio de Comercio y SASO [9].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: '≈ 45.300 M SAR (12.090 M USD) en servicios de TI en 2025 según IMARC [2]; el mercado de comunicaciones y tecnología completo es de 180.000 M SAR en 2024 según la CST [3] y ≈ 190.000 M USD en 2025 según Elm [1]',
    unidad_serie: 'millones de SAR (servicios de TI, IMARC; 1 USD = 3,75 SAR)',
    serie: [
      { anio: '2025', tamano: 45338 }, { anio: '2026e', tamano: 48471 }, { anio: '2027e', tamano: 51820 }, { anio: '2028e', tamano: 55402 }, { anio: '2029e', tamano: 59230 }, { anio: '2030e', tamano: 63323 },
    ],
    tcac_historico_pct: 7.5, tcac_previsto_pct: 6.9, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Digitalización de los servicios públicos (Visión 2030)', efecto: '+', horizonte: 'Estructural', evidencia: 'Tawakkalna llegó a 711 servicios en 2025 y prevé 926 a fin de 2026; Nafath, más de 33 millones de usuarios [1].' },
      { driver: 'Gasto público y su priorización', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Presupuesto 2026: ingresos de 1.147.000 M SAR y gastos de 1.313.000 M SAR (déficit) [1]; Elm cita la priorización del gasto como causa de menos adjudicaciones de proyectos en 2026 [9].' },
      { driver: 'Población residente y trabajadores extranjeros', efecto: '+', horizonte: 'Estructural', evidencia: 'Muqeem y Tamm cobran por residente y por vehículo; los seis primeros productos crecieron un 13 % en 2025 [4].' },
      { driver: 'Peregrinación (Hajj y Umrah)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Nusuk acusó en 2025 un Hajj con unos 200.000 peregrinos menos [9].' },
      { driver: 'Inteligencia artificial generativa', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Elm tiene 10 servicios de IA en producción y su propio LLM en árabe (Nuha); la IA abarata el desarrollo de software y amenaza el trabajo por horas del BPO y la consultoría [5, 9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En plataformas públicas, Elm opera en exclusiva por contrato; en proyectos y BPO compite con Solutions by stc, Thiqah (ya suya), Accenture, IBM y consultoras locales [7].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'El Estado es cliente (42,6 % de los ingresos), regulador, dueño del 67 % y socio que cobra una parte de las tasas; puede renegociar el reparto (Fasah pasó de principal a agente) [8, 9].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Talento técnico saudí escaso y cuotas de saudización; nube y centros de datos de proveedores públicos y de hiperescala [11].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Acceso a datos de identidad del Ministerio del Interior y homologaciones de seguridad que tardan años; las grandes tecnológicas entran por alianzas, no de frente [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'El Estado puede internalizar plataformas (SDAIA, Centro Nacional de Información) y la IA reduce el coste de construirlas [5].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 20.9,
    posicion: 'Primer proveedor de servicios públicos digitales de Arabia Saudí (plataformas del Ministerio del Interior); ≈ 21 % del mercado de servicios de TI de IMARC [2], que no recoge del todo las tasas de plataforma',
    competidores: [
      comp('7202.SR', 'Solutions by stc (Arabian Internet and Communications Services)', 'Arabia Saudí', 1),
      comp('7204.SR', 'Perfect Presentation (2P)', 'Arabia Saudí', 1),
      comp('7200.SR', 'Al Moammar Information Systems (MIS)', 'Arabia Saudí', 1),
      comp('TYL', 'Tyler Technologies', 'EE. UU.', 3.75),
      comp('BAH', 'Booz Allen Hamilton', 'EE. UU.', 3.75),
      comp('MMS', 'Maximus', 'EE. UU.', 3.75),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Absher y Nafath reúnen a ciudadanos, residentes, empresas y 945 plataformas conectadas, pero el valor de la red es del Estado, no de Elm [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Plataformas críticas de identidad y extranjería con 20 años de historia; contratos de cinco años renovados (Ministerio de Comercio, SASO) [9].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Acceso a datos del Ministerio del Interior y homologaciones de ciberseguridad; licencia de facto como brazo tecnológico del Estado [8].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen bruto del negocio digital del 47 % frente al 15-19 % de Solutions by stc en EBIT; pero el BPO, al 18,5 %, no tiene ventaja [7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Un único proveedor por plataforma nacional: el mercado no admite dos Absher [4].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: { calificaciones: null, materialidad: null, controversias: null, confianza: 'Baja' },
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null, confianza: 'Media' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) IMARC y CST: sin cuotas de los cinco primeros; 2) informe anual de Elm: se declara líder sin cifra; 3) cálculo con los ingresos de Elm, Solutions, 2P y MIS: mezcla perímetros (telecomunicaciones, tasas de plataforma)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025, sostenibilidad: sin calificaciones externas citadas; 2) MSCI y Sustainalytics: sin ficha pública abierta para 7203; 3) prensa saudí: sin dato', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025, Board of Directors (nueve consejeros: seis no ejecutivos y tres independientes; trayectorias)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Board%20of%20Directors.pdf` },
  { id: 2, titulo: 'Annual Report 2025, Board Committees (comisión de auditoría de cinco miembros presidida por un externo)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Board%20Committees.pdf` },
  { id: 3, titulo: 'Annual Report 2025, Compensation and Remuneration (consejo: 2,99 M SAR; cinco primeros directivos: 30,05 M SAR)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Compensation%20and%20Remuneration.pdf` },
  { id: 4, titulo: 'Annual Report 2025, Competing Business and Related Party Transactions (Thiqah, Ministerio del Interior, SDAIA, Tawuniya, Mobily)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Competing%20Business%20and%20Related%20Party%20Transactions.pdf` },
  { id: 5, titulo: 'Annual Report 2025, Share Ownership (acciones de consejeros y directivos a 31-dic-2025)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Share%20Ownership.pdf` },
  { id: 6, titulo: 'Annual Report 2025, Shareholders (juntas del 17-mar y 11-may-2025; operaciones vinculadas aprobadas; nombramiento de BDO)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Shareholders.pdf` },
  { id: 7, titulo: 'Annual Report 2025, Executive Management (consejero delegado Mohammad Alomair; VP de Finanzas Othman Altwaijri)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Executive%20Management.pdf` },
  { id: 8, titulo: 'Annual Report 2025, Shareholders’ Information (PIF 67,0 %, flotante 30,3 %, autocartera 2,7 %, extranjeros 9,37 %)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Overview/Shareholders%20Information.pdf` },
  { id: 9, titulo: 'Annual Report 2025, Compliance with Corporate Governance Regulations (no detalla la remuneración individual de los cinco primeros directivos)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}Governance/Compliance%20with%20Corporate%20Governance.pdf` },
  { id: 10, titulo: 'FY2025 y H1 2026 Results Presentations: guía anual y cumplimiento', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-08-03', url: `${FS}Results%20presentation-H1-2026-EN.pdf` },
  { id: 11, titulo: 'Consolidated Financial Statements 2025, nota 34 (remuneración del consejo y la alta dirección: 49,8 M SAR)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-03', url: `${FS}ELM%20YE25%20FS-EN%20Version%20-%20Signed.pdf` },
];
const cons = (nombre, cargo, tipo, comisiones) => ({ nombre, cargo, tipo, desde: null, comisiones });
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Mohammad Abdulaziz Alomair', cargo: 'Consejero delegado', desde: '2024', participacion_pct: 0.003, trayectoria: '24 años en Elm; jefe de Productos Digitales de 2016 a 2024, la etapa en que los productos digitales pasaron a ser dos tercios de las ventas [7].' },
      { nombre: 'Othman Mohammed Altwaijri', cargo: 'Vicepresidente de Finanzas (director financiero)', desde: null, participacion_pct: 0.003, trayectoria: '17 años en finanzas; antes, director ejecutivo de Operaciones Financieras de Elm (2018-2019) [7].' },
      { nombre: 'Rayed Abdullah bin Ahmed', cargo: 'Presidente (no ejecutivo)', desde: null, participacion_pct: 0.001, trayectoria: 'Asesor de Su Alteza el ministro del Interior; antes, vicepresidente de Elm y altos cargos en la Autoridad del Mercado de Capitales [1].' },
      { nombre: 'Majed Faleh Alotaibi', cargo: 'Jefe del grupo de Productos de Gobierno', desde: null, participacion_pct: 0.003, trayectoria: 'Antes, consejero delegado de Tabadul (2021-2023) [7].' },
      { nombre: 'Alameen Shawqi Alhazmi', cargo: 'Jefe del grupo de Soluciones Integradas y presidente de Thiqah', desde: null, participacion_pct: 0.002, trayectoria: 'En Elm desde 2003; dirige la integración de Thiqah [7].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Guía de ingresos, margen EBIT y conversión de caja publicada con los resultados de 2024', real: 'Ingresos +27,8 % con Thiqah, margen EBIT del 21,4 %, flujo operativo del 127 % del beneficio', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ingresos +17-19 %, margen EBIT del 21-23 %, flujo operativo del 85-95 % del beneficio (con Thiqah)', real: '1S26: ingresos +21 %, margen EBIT del 23 %, flujo operativo del 35 % del beneficio; guía mantenida', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Rayed Abdullah bin Ahmed', 'Presidente', 'Dominical', null),
      cons('Raed Abdullah Ismail', 'Vicepresidente', 'Dominical', null),
      cons('Esam Abdullah Alwagait', 'Consejero', 'Dominical', null),
      cons('Alshayhana Saleh Alazzaz', 'Consejera', 'Dominical', null),
      cons('Thamer Mohammad Alharbi', 'Consejero', 'Dominical', null),
      cons('Abdullah Saad Alsalem', 'Consejero', 'Dominical', null),
      cons('Khaled Abdulaziz Alghoneim', 'Consejero', 'Independiente', null),
      cons('Abdularahman Mohammed Alodan', 'Consejero', 'Independiente', null),
      cons('Faris Ibrahim Alrashed Alhumaid', 'Consejero', 'Independiente', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Public Investment Fund (PIF)', pct: 67.0, tipo: 'Estado (fondo soberano)', variacion: 'Sin cambios desde la salida a bolsa' },
      { nombre: 'Autocartera (plan de acciones de empleados)', pct: 2.67, tipo: 'Autocartera', variacion: '2,14 M de acciones a fin de 2025; 2,03 M estimadas a 30-jun-2026 tras entregas' },
      { nombre: 'Inversores extranjeros', pct: 9.37, tipo: 'Institucionales', variacion: 'Dentro del flotante del 30,3 %' },
    ],
    insiders: [
      { fecha: '2025-12-31', persona: 'Mohammad Alomair (consejero delegado)', operacion: 'Compra', acciones: 2326, importe: 1.7 },
    ],
    control_y_defensas: null,
    alertas: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Núcleo', intentos: '1) Informe anual 2025, remuneraciones: solo el total de los cinco primeros directivos (30,05 M SAR); 2) cumplimiento de gobierno: la empresa declara que no desglosa por cargo; 3) nota 34 de las cuentas: total del consejo y la alta dirección (49,8 M)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Informe anual 2025, juntas: resultados sin porcentajes de voto; 2) Tadawul, anuncios de resultados de juntas: no accesibles (403); 3) Argaam: sin porcentajes abiertos', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'desde (fecha de nombramiento de los consejeros)', tipo: 'Complemento', intentos: '1) Informe anual 2025: biografías sin fecha de primer nombramiento; 2) comisión de auditoría: mandato del 25-nov-2024 al 24-nov-2028; 3) Tadawul: sin acceso', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 7203.SR, KSA (iShares MSCI Saudi Arabia, USD anclado al SAR) e IGV (software): precio, rango, rentabilidades, beta, volatilidad y cierres de ejercicio (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7203.SR' },
  { id: 2, titulo: 'MarketScreener: estimaciones 2026-2028 de Elm (ventas, EBITDA, EBIT, beneficio, BPA, dividendo, caja neta); 11 analistas, consenso «Outperform», objetivo medio de 748,77 SAR', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/ELM-COMPANY-133509697/finances/' },
  { id: 3, titulo: 'Elm’s platform push meets market skepticism (seis de diez analistas en «Comprar»; UBS rebaja el objetivo el 16-oct manteniendo «Neutral»)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://www.marketscreener.com/news/elm-s-platform-push-meets-market-skepticism-ce7858d2de8cf125' },
  { id: 4, titulo: 'Yahoo Finance (quoteSummary): capitalización, valor empresa, múltiplos y estimaciones de BPA y ventas de Elm y sus comparables, 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7203.SR/key-statistics' },
  { id: 5, titulo: 'FRED, DGS10: bono del Tesoro de EE. UU. a 10 años (5,10 % el 15-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: Aa3, diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'SNB Capital issues Q3 2026 earnings estimates (Elm: 562 M SAR, +0,6 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-11', url: 'https://www.argaam.com/en/article/articledetail/id/1942999' },
  { id: 9, titulo: 'Q3 2026 earnings forecasts: Riyad Capital (Elm: 589 M SAR, +5 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-12', url: 'https://www.argaam.com/en/article/articledetail/id/1943230' },
  { id: 10, titulo: 'Elm inks development, operation contract with SASO (cinco años, reparto de ingresos, ≈ 15 % de los ingresos de 2025 en total)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-09-22', url: 'https://www.argaam.com/en/article/articledetail/id/1938360' },
  { id: 11, titulo: 'Elm subsidiary signs contract with Ministry of Commerce to digitize services (cinco años desde el 3-sep-2026, ≈ 19 % de los ingresos de 2025 en total)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-09-08', url: 'https://www.argaam.com/en/article/articledetail/id/1934890' },
  { id: 12, titulo: 'Elm renews SAR 500M credit facility deal with Al Rajhi Bank', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.argaam.com/en/article/articledetail/id/1941843' },
  { id: 13, titulo: 'Elm’s board greenlights SAR 390m interim cash dividends for H1-26 (5 SAR por acción; derecho el 4-ago, pago desde el 16-ago-2026; 77,97 M de acciones con derecho)', editor: 'Decypha (Mubasher)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.decypha.com/en/news/details/Elm-s-board-greenlights-SAR-390m-interim-cash-dividends-for-H1-26/21565679?L=EN' },
  { id: 14, titulo: 'Elm: Slower project awards weigh on growth, Thiqah turns profitable in Q2 (titular y entradilla; texto de pago)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://www.argaam.com/en/article/articledetail/id/1925634' },
  { id: 15, titulo: 'Interim condensed consolidated financial statements 1S26: balance a 30-jun-2026 (deuda, arrendamientos, caja, murabahas, fondos, indemnizaciones por cese, participadas, minoritarios)', editor: 'Elm Company', tipo: 'Primaria', fecha: '2026-08-05', url: `${FS}ELM%20Q2%2026%20FS%20-EN%20-%20Signed%20Final.pdf` },
  { id: 16, titulo: 'movimiento.mjs sobre 7203.SR (Yahoo): variación a 1-12 meses, media de 200 sesiones, caídas diarias de más del 5 %', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7203.SR' },
  { id: 17, titulo: 'TASI falls 2.2% to 10,476 pts (primera sesión tras los ataques de EE. UU. e Israel contra Irán, 1-mar-2026)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-03-01', url: 'https://www.argaam.com/en/market-daily-report/3/56397' },
  { id: 18, titulo: 'Elm Company (Tadawul:7203) analysts just trimmed their revenue forecasts (objetivo medio de 859 a 798 SAR, abril de 2026)', editor: 'Simply Wall St', tipo: 'Analistas', fecha: '2026-04-21', url: 'https://simplywall.st/stocks/sa/software/sase-7203/elm-shares/news/elm-company-tadawul7203-analysts-just-trimmed-their-revenue' },
];
const id = bolsa.identificacion;
const cmp = (s, nombre, pais, fx, w, o = {}) => {
  const c = comps[s]; const e = Object.fromEntries(c.et.map((t) => [t.p, t]));
  const eps = (1 - w) * e['0y'].eps + w * e['+1y'].eps;
  const rev = (1 - w) * e['0y'].rev + w * e['+1y'].rev;
  const g = c.fcur === c.cur || c.cur === 'SAR' ? rev / c.rev - 1 : null;
  const mc = c.mcap * fx / 1e6;
  return { nombre, ticker: s, pais, capitalizacion: Math.round(mc), ev_ventas: o.evv ?? r2(c.evRev), ev_ebitda_ltm: o.evl ?? r1(c.evEbitda), ev_ebitda_ntm: o.evl === null ? null : (g != null ? r1(c.evEbitda / (1 + g)) : null), per_ntm: r1(c.price / eps), crecimiento_pct: g != null ? r1(g * 100) : null, margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: o.dn ?? r2((c.debt - c.cash) / c.ebitda), fcf_yield_pct: c.fcf ? r1(c.fcf / c.mcap * 100) : null, ...(o.extra ?? {}) };
};
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Elm Company', nombre_corto: 'Elm', ticker: '7203.SR', isin: 'SA15GG53GHH3', mercado: 'Saudi Exchange (Tadawul)', indice_referencia: 'TASI (MSCI Saudi Arabia como aproximación)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Tecnología de la información', industria: 'Servicios de TI', sede: 'Riad', fundacion: '1988', empleados: null, web: 'https://www.elm.sa',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 77.97, capitalizacion_publicada: Math.round(comps['7203.SR'].mcap / 1e6), free_float_pct: 30.3,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SAR/día (3 meses)`, proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 11096, ebitda: 2724, ebit: 2384, bpa: 29.71, dpa: 10.29, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 12639, ebitda: 3089, ebit: 2749, bpa: 33.74, dpa: 12.44, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 14203, ebitda: 3513, ebit: 3169, bpa: 38.83, dpa: 14.39, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 6, mantener: null, vender: null, po_medio: 748.77, po_min: null, po_max: null },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      ...bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      cmp('7202.SR', 'Solutions by stc', 'SA', 1, 0.8),
      cmp('7204.SR', 'Perfect Presentation (2P)', 'SA', 1, 0.8),
      cmp('TYL', 'Tyler Technologies', 'US', 3.75, 0.8),
      cmp('BAH', 'Booz Allen Hamilton', 'US', 3.75, 0.4),
      cmp('MMS', 'Maximus', 'US', 3.75, 0.95, { evv: 0.93, evl: 7.1, dn: 2.42 }),
      { ...cmp('INFY', 'Infosys (ADR)', 'IN', 3.75, 0.55, { evv: null, evl: null }), crecimiento_pct: null, dn_ebitda: null },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-04', objetivo: 'Thiqah Business Services (100 %)', comprador: 'Elm Company (al PIF)', ev: 3016, ev_ventas: 2.11, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 3.385,9 M menos 370 M de caja y murabahas adquiridos; ventas de 2024 reexpresadas de 1.430 M; EBITDA negativo (pérdida de 142 M en 2024).' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (≥ 3 con múltiplo)', tipo: 'Complemento', intentos: '1) Informes de Elm: solo Thiqah (y Sahel Al Madar sin precio publicado); 2) operaciones de gobierno digital en el Golfo (Solutions by stc, Thiqah, Tabadul): sin múltiplos publicados; 3) operaciones de EE. UU. del sector (Tyler-NIC, Maximus-Attain): no se abrió la nota oficial con el EBITDA, y los de prensa no se usan sin comprobar', decision: 'Omitido; peso cero en la síntesis' },
    { seccion: 'consenso', campo: 'recomendaciones (mantener/vender) y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener: solo media y número; 2) Argaam, análisis de seis casas: de pago; 3) Yahoo: media de 748,77 y «buy», sin reparto', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Tadawul: no publica posiciones cortas por valor de forma abierta; 2) Yahoo: sin dato para 7203.SR; 3) Argaam: sin dato', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Hawamer (foro saudí de referencia) y Reddit: 403 para lectura; 2) Stocktwits: el símbolo 7203.SR no existe (404) y TradingView solo tiene una entrada de 2024 sin opinión; 3) Simply Wall St (comunidad, 403) e Investing (comentarios, 404)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas en', dir);
