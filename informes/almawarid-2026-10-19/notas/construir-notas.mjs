// Notas A-E de Almawarid Manpower Company (Tadawul 1833; corte 2026-10-19).
// Arabia Saudí sin XBRL. Saudi Exchange (y su copia en web.archive.org) da 403/cortes desde este contenedor, y la empresa no está
// en Euroland. Fuente primaria usada: estados intermedios consolidados del 1T26 y del 2T26 (revisión limitada de BDO Dr. Mohamed
// Al-Amri), con el balance auditado a 31-dic-2025 como comparativo, descargados del almacén público de Argaam (argaamplus S3).
// Cuenta anual 2022-2025: cifras de los anuncios de resultados de Tadawul tal como las reproduce Argaam (ventas, beneficio bruto,
// operativo y neto) y la serie de Yahoo (fundamentals-timeseries: coste de ventas, BAI, zakat, intereses, amortización).
// Balances 2021-2024 y flujos 2021-2025: Stock Analysis (S&P Global), SECUNDARIA, porque las cuentas anuales auditadas están
// en saudiexchange.sa (403) y en la zona de pago de Argaam. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/almawarid-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const comps = Object.fromEntries(Y.comps.map((c) => [c.s, c]));
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const S3 = (id) => `https://argaamplus.s3.amazonaws.com/${id}.pdf`;
const FS2T26 = S3('522188a3-2739-49bb-8431-68c7f698cd16');
const FS1T26 = S3('2f0f4cf1-3535-448a-b931-a57065ac9388');
const AR = (id) => `https://www.argaam.com/en/financial-reports/company-report/15170/${id}`;
const ART = (id) => `https://www.argaam.com/en/article/articledetail/id/${id}`;
const SA = 'https://stockanalysis.com/quote/tadawul/1833/financials/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Condensed Consolidated Interim Financial Statements for the three-month and six-month periods ended 30 June 2026 (revisión limitada de BDO Dr. Mohamed Al-Amri & Co., 10-ago-2026): balance a 30-jun-2026 y 31-dic-2025 (auditado), cuenta del 2T y 1S de 2026 y 2025, flujos, segmentos (nota 6), ingresos por cliente y duración (nota 7), coste de ventas (nota 8), clientes (nota 12), vinculadas (nota 15), capital (nota 16), dividendos (nota 18), indemnizaciones (nota 19), zakat (nota 21), hechos posteriores (nota 26)', editor: 'Almawarid Manpower (vía Argaam)', tipo: 'Primaria', fecha: '2026-08-10', url: FS2T26 },
  { id: 2, titulo: 'Condensed Consolidated Interim Financial Statements for the three-month period ended 31 March 2026', editor: 'Almawarid Manpower (vía Argaam)', tipo: 'Primaria', fecha: '2026-05-10', url: FS1T26 },
  { id: 3, titulo: 'Resultados anuales de 2025 (anuncio a Tadawul reproducido): ventas 2.610,99 M, beneficio bruto 235,87 M, operativo 147,11 M, neto 138,47 M; 4T25', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-03-30', url: AR('2025/1') },
  { id: 4, titulo: 'Resultados anuales de 2024 (anuncio a Tadawul reproducido): ventas 2.027,75 M y 1.446,01 M en 2023; neto 95,42 M y 88,77 M; 4T24 y 4T23', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2025-03-31', url: AR('2024/1') },
  { id: 5, titulo: 'Resultados de 9M y 3T de 2024 y 2025; 1T y 1S de 2024, 2025 y 2026 (anuncios a Tadawul reproducidos, con las causas que da la empresa)', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-08-10', url: AR('2026/71') },
  { id: 6, titulo: 'Yahoo Finance, fundamentals-timeseries de 1833.SR: coste de ventas, BAI, zakat, gastos financieros, amortización, flujo operativo 2022-2025', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1833.SR/financials' },
  { id: 7, titulo: 'Almawarid (1833): balance anual 2021-2025 y estado de flujos 2021-2025 (S&P Global Market Intelligence)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: `${SA}balance-sheet/` },
  { id: 8, titulo: 'Almawarid (1833): cuenta de resultados resumida 2021-2025 (ventas, beneficio bruto y operativo, neto, BPA)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: SA },
  { id: 9, titulo: 'Al Mawarid shareholders authorize board to pay 2026 interim dividends (junta del 11-may-2026: contratos con Al Ayuni, 237,43 M, y con Limak Al Ayuni, 173,19 M, en 2025; dividendos de 2025, 48,25 M)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-05-12', url: ART(1904754) },
  { id: 10, titulo: 'Al Mawarid CEO says domestic labor force up 30% in 2024 (ingresos de 2024: 265 M de servicio residencial a particulares y 157 M de servicio por horas; más de 40.000 trabajadores)', editor: 'Argaam', tipo: 'Prensa', fecha: '2025-04-03', url: ART(1802286) },
  { id: 11, titulo: 'Investor Relations: dividendos pagados (fechas e importes), calendario financiero (3T26 previsto el 28-oct-2026), consejo y dirección', editor: 'Almawarid Manpower', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://investors.mawarid.com.sa/' },
];
const A = {
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'cuentas anuales auditadas 2021-2025 (PDF)', tipo: 'Núcleo', intentos: '1) saudiexchange.sa/Resources/fsPdf (enlazados desde la web de inversores): 403 Akamai, también con otro User-Agent; 2) web.archive.org tiene copia (API de disponibilidad) pero la conexión se corta desde el contenedor y WebFetch no puede abrirla; Argaam los tiene en la zona de pago (2022-2025 bloqueados); 3) cifras anuales de los anuncios de Tadawul (Argaam), Yahoo y Stock Analysis (secundaria) contrastadas con el balance auditado a 31-dic-2025 que traen los intermedios de 2026', decision: 'Calculado y marcado como estimación' },
    { seccion: 'financieros', campo: 'gastos_generales (comerciales y de administración anuales)', tipo: 'Complemento', intentos: '1) cuentas anuales (no accesibles); 2) Yahoo da solo una parte (10-26 M, gastos de venta); 3) Stock Analysis no los desglosa', decision: 'Omitido' },
    { seccion: 'balance', campo: 'activos de contrato 2021-2024', tipo: 'Complemento', intentos: '1) cuentas anuales (no accesibles); 2) Stock Analysis los mezcla en otros activos corrientes y no corrientes; 3) no hay forma de separarlos sin la nota', decision: 'Omitido' },
  ],
  financieros: {
    // EBIT = BAI + gastos financieros (incluye otros ingresos operativos y no operativos, que la empresa no separa del todo).
    // EBITDA = EBIT + amortización total (inmovilizado, intangibles y derechos de uso). 2021: solo ventas, bruto, operativo y neto (Stock Analysis).
    cuenta: [
      { periodo: '2021', ingresos: 663.72, coste_ventas: 566.96, gastos_generales: null, ebitda: 71.4, amortizaciones: 13.35, ebit: 58.05, resultado_financiero: -1.07, bai: 56.98, impuestos: 1.32, minoritarios: 0, beneficio_neto: 55.66, gastos_financieros: 1.07, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.78, dpa: 1.0, dpa_extraordinario: 0, acciones_diluidas: 20.0 },
      { periodo: '2022', ingresos: 944.73, coste_ventas: 815.04, gastos_generales: null, ebitda: 100.62, amortizaciones: 15.33, ebit: 85.29, resultado_financiero: -1.04, bai: 84.25, impuestos: 8.27, minoritarios: 0, beneficio_neto: 75.99, gastos_financieros: 1.04, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.8, dpa: 0.75, dpa_extraordinario: 0, acciones_diluidas: 20.0 },
      { periodo: '2023', ingresos: 1446.01, coste_ventas: 1298.77, gastos_generales: null, ebitda: 122.6, amortizaciones: 19.61, ebit: 102.99, resultado_financiero: -4.23, bai: 98.76, impuestos: 9.99, minoritarios: 0, beneficio_neto: 88.77, gastos_financieros: 4.23, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.44, dpa: 1.88, dpa_extraordinario: 0, acciones_diluidas: 20.0 },
      { periodo: '2024', ingresos: 2027.75, coste_ventas: 1842.89, gastos_generales: null, ebitda: 133.3, amortizaciones: 22.49, ebit: 110.81, resultado_financiero: -5.95, bai: 104.85, impuestos: 9.43, minoritarios: 0, beneficio_neto: 95.42, gastos_financieros: 5.95, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.77, dpa: 1.88, dpa_extraordinario: 0, acciones_diluidas: 20.0 },
      { periodo: '2025', ingresos: 2610.99, coste_ventas: 2375.12, gastos_generales: null, ebitda: 187.73, amortizaciones: 29.79, ebit: 157.94, resultado_financiero: -8.77, bai: 149.17, impuestos: 10.71, minoritarios: 0, beneficio_neto: 138.46, gastos_financieros: 8.77, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.92, dpa: 2.41, dpa_extraordinario: 0, acciones_diluidas: 20.0 },
    ],
    // LTM jun-26 = 2025 + 1S26 − 1S25 [A1]: ventas 2.939,64; BAI 191,08 + gastos financieros 9,59 = EBIT 200,67; amortización 32,22.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2939.64, ebitda: 232.89, ebit: 200.67, beneficio_neto: 178.35, bpa: 8.92, dpa: 3.0, dpa_extraordinario: 0, fcf: 131.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 663,7 M SAR en 2021 a 2.611,0 M en 2025 (+41 % anual) y a 2.939,6 M en los doce meses a junio de 2026 [A3, A8, A1]. Todo es orgánico: más trabajadores cedidos (plantilla media +21 % en 9M25, +17 % en el segmento de empresas en el 1S26) y mejor ocupación en el servicio a particulares [A5]. El salto de 2023-2024 tiene además un cambio de presentación: el 3T23 facturó 320 M y el 4T23 527 M, y la propia empresa dio +37 % para 9M24 frente al +60 % que sale de las cifras publicadas [A5]. El margen bruto bajó del 13,7 % de 2022 al 9,0 % de 2025 al crecer el segmento de empresas, que factura el sueldo del trabajador con un margen fino, y subió al 9,9 % en el 1S26 por la mejora del servicio a particulares (17 % de margen bruto en el 1T26 frente al 11 %) y de la contratación de saudíes (+199 % en ventas) [A1, A5]. El margen EBITDA (con la amortización de los derechos de uso) fue del 7,2 % en 2025 y del 8,5 % en el 1S26.',
    ajustes: 'Cifras publicadas, sin ajustes. El EBITDA y el EBIT de este informe incluyen los otros ingresos de explotación (9,7 M en el 1S26: ayudas del HRDF por contratar saudíes, intereses de depósitos) y los otros ingresos (1,0 M); por eso el EBIT supera al «resultado operativo» que publica Argaam (103,6 M en el 1S26 frente a 113,2 M de «profit from operations» y 114,2 M de BAI más gastos financieros) [A1, A5]. Partidas que se repiten y no se quitan: pérdidas esperadas de crédito (8,6 M en 2025; 24 M más en 2024 que en 2023 por provisiones de un año que la empresa llama no recurrentes) y deterioro de anticipos a agencias de contratación (5 M en 2025; 2,15 M en el 1S26) [A3, A1]. 2021: el BAI y el zakat son estimación propia (el operativo de Stock Analysis menos los intereses pagados); no hay desglose.',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 548.2, crecimiento_pct: 71.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.85, vs_consenso: null },
      { periodo: '4T24', ingresos: 558.82, crecimiento_pct: 6.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.43, vs_consenso: null },
      { periodo: '1T25', ingresos: 588.68, crecimiento_pct: 34.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.5, vs_consenso: null },
      { periodo: '2T25', ingresos: 624.36, crecimiento_pct: 29.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.62, vs_consenso: null },
      { periodo: '3T25', ingresos: 678.78, crecimiento_pct: 23.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.85, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 719.17, crecimiento_pct: 28.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.96, vs_consenso: null },
      { periodo: '1T26', ingresos: 758.49, crecimiento_pct: 28.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.61, vs_consenso: null },
      { periodo: '2T26', ingresos: 783.19, crecimiento_pct: 25.4, crecimiento_organico_pct: null, ebitda: 64.4, margen_ebitda_pct: 8.2, bpa: 2.5, vs_consenso: 'En línea' },
    ],
    confianza: 'Media',
  },
  balance: {
    // 2021-2024: Stock Analysis [A7]; 2025: balance auditado que trae el intermedio del 2T26 [A1]. Caja = efectivo + inversiones a valor
    // razonable con cambios en resultados (fondos monetarios y de murabaha). Proveedores = cuentas a pagar y otros pasivos corrientes
    // (vacaciones y billetes devengados, sueldos, IVA…) sin los pasivos de contrato. Arrendamientos = pasivos por arrendamiento (NIIF 16).
    historico: [
      { periodo: '2021', activo_total: 405.05, activo_corriente: 329.73, pasivo_corriente: 135.97, pasivo_total: 172.02, fondo_comercio: 0, intangibles: 1.79, inmovilizado_material: 32.08, existencias: 0, clientes: 136.55, proveedores: 98.26, activos_contrato: null, pasivos_contrato: 18.71, caja: 57.02, deuda_financiera: 0, arrendamientos: 19.52, patrimonio_neto: 233.02, minoritarios: 0, reservas: 133.02 },
      { periodo: '2022', activo_total: 504.1, activo_corriente: 420.22, pasivo_corriente: 174.09, pasivo_total: 211.03, fondo_comercio: 0, intangibles: 1.37, inmovilizado_material: 35.9, existencias: 0, clientes: 210.3, proveedores: 127.97, activos_contrato: null, pasivos_contrato: 27.0, caja: 59.41, deuda_financiera: 0, arrendamientos: 20.83, patrimonio_neto: 293.07, minoritarios: 0, reservas: 143.07 },
      { periodo: '2023', activo_total: 676.61, activo_corriente: 532.26, pasivo_corriente: 238.98, pasivo_total: 332.73, fondo_comercio: 0, intangibles: 1.41, inmovilizado_material: 58.49, existencias: 0, clientes: 214.64, proveedores: 152.27, activos_contrato: null, pasivos_contrato: 62.11, caja: 146.75, deuda_financiera: 0, arrendamientos: 40.73, patrimonio_neto: 343.88, minoritarios: 0, reservas: 193.88 },
      { periodo: '2024', activo_total: 860.35, activo_corriente: 685.7, pasivo_corriente: 336.9, pasivo_total: 462.34, fondo_comercio: 0, intangibles: 1.32, inmovilizado_material: 72.86, existencias: 0, clientes: 278.45, proveedores: 245.44, activos_contrato: null, pasivos_contrato: 61.07, caja: 186.82, deuda_financiera: 0, arrendamientos: 54.93, patrimonio_neto: 398.01, minoritarios: 0, reservas: 248.01 },
      { periodo: '2025', activo_total: 1114.84, activo_corriente: 876.9, pasivo_corriente: 439.33, pasivo_total: 608.8, fondo_comercio: 0, intangibles: 0.69, inmovilizado_material: 76.95, existencias: 0, clientes: 372.36, proveedores: 271.75, activos_contrato: 188.45, pasivos_contrato: 122.61, caja: 203.29, deuda_financiera: 0, arrendamientos: 60.94, patrimonio_neto: 506.04, minoritarios: 0, reservas: 355.6 },
    ],
    vencimientos: [],
    liquidez: 'Caja 164,97 M + fondos a valor razonable 47,35 M + sukuk 20,33 M a 30-jun-2026; sin deuda financiera. Aval bancario de 10 M a favor del Ministerio de Recursos Humanos para la licencia [A1].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Indemnizaciones por cese (plan de prestación definida sin fondos, ley laboral saudí): 144,49 M a 30-jun-2026, frente a 132,77 M en dic-2025 y 89,22 M en dic-2024; crecen con la plantilla cedida (coste del servicio de 31,0 M en el 1S26) y se pagan al terminar cada contrato (13,4 M en el 1S26) [A1, A7]. En el puente van como pensiones. Garantías de clientes (7,6 M) y de agencias de contratación (1,5 M); vacaciones y billetes devengados (185,0 M) y sueldos (84,4 M) dentro de proveedores [A1]. Zakat: provisión de 8,36 M; liquidaciones cerradas hasta 2024 sin diferencias [A1]. Pasivos por arrendamiento de 66,37 M (alojamiento de trabajadores y sucursales) [A1].',
    comentario: 'El balance es de una empresa de servicios que adelanta el sueldo de los trabajadores y cobra después: clientes (475,5 M netos) y activos de contrato (223,5 M) suman 699 M a junio de 2026, el 24 % de las ventas de doce meses, frente a 561 M (21 %) en diciembre [A1]. La provisión de insolvencias es de 60,1 M (11 % de lo facturado pendiente) y crece 6,6 M por semestre [A1]. Lo financia sin deuda: con el patrimonio (588,4 M), los pasivos de explotación (vacaciones, sueldos, anticipos) y la caja de 232,7 M [A1]. En 2021-2024 los activos de contrato iban dentro de otros activos en la fuente secundaria [A7]: el circulante de esos años sale menor.',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: -19.07, capex: 1.98, pagos_arrendamientos: 11.32, adquisiciones: 0, desinversiones: 0, dividendos: 20.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 66.11, capex: 3.44, pagos_arrendamientos: 14.02, adquisiciones: 0, desinversiones: 0, dividendos: 20.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 85.81, capex: 4.87, pagos_arrendamientos: 17.54, adquisiciones: 0, desinversiones: 0, dividendos: 37.5, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 79.15, capex: 3.42, pagos_arrendamientos: 19.15, adquisiciones: 0, desinversiones: 0, dividendos: 33.75, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 137.82, capex: 1.64, pagos_arrendamientos: 25.52, adquisiciones: 0, desinversiones: 0, dividendos: 39.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo depende del circulante: en 2021 fue negativo (−19,1 M) y en 2025 llegó a 137,8 M, pero 39,2 M de ese año fueron ventas de fondos a valor razonable que la empresa clasifica en explotación [A7, A1]. Sin ellas, la conversión del beneficio en caja fue del 71 % en 2025 y del 49 % en el 1S26 (50,0 M de flujo operativo con 102,2 M de beneficio), porque los clientes y los activos de contrato crecieron 145 M en el semestre [A1]. El capex es casi nulo (0,5 M en el 1S26); la inversión de verdad son los alquileres de alojamiento (20,3 M de altas de derechos de uso en el 1S26) y el circulante [A1]. No hay compras de empresas. Los dividendos (39,0 M en 2025, 28,0 M en el 1S26 y 32,0 M en agosto) absorben ≈ 30-35 % del beneficio [A1, A9].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'BDO Dr. Mohamed Al-Amri & Co. (revisión limitada de los intermedios de 2026)',
    anios_auditor: null,
    opinion: 'Revisión limitada sin salvedades (2T26); opinión de las cuentas de 2025 no leída (documento no accesible)',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Empresas', descripcion: 'Cesión de trabajadores extranjeros y saudíes a empresas con contratos de uno a dos años; también contratación y externalización de personal saudí', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 1605.75, resultado: null }, { periodo: '1S25', ingresos: 971.65, resultado: null }, { periodo: '1S26', ingresos: 1249.46, resultado: null }] },
      { nombre: 'Particulares', descripcion: 'Trabajadoras domésticas residentes cedidas a familias por meses o años (licencia del Ministerio de Recursos Humanos)', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 265.0, resultado: null }, { periodo: '1S25', ingresos: 149.22, resultado: null }, { periodo: '1S26', ingresos: 176.43, resultado: null }] },
      { nombre: 'Por horas', descripcion: 'Limpieza a domicilio por horas o visitas (marca Hemma; ≈ 4 horas por visita)', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 157.0, resultado: null }, { periodo: '1S25', ingresos: 92.17, resultado: null }, { periodo: '1S26', ingresos: 115.8, resultado: null }] },
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas a empresas de construcción (1S)', valor_anterior: '636,6 M SAR (52 %)', valor_actual: '706,5 M SAR (46 %)', variacion: '+11 %', comentario: 'Planas en ≈ 350 M por trimestre desde el 3T25 [A1]' },
      { kpi: 'Ventas a hostelería y ocio (1S)', valor_anterior: '112,5 M SAR', valor_actual: '214,5 M SAR', variacion: '+91 %', comentario: 'El motor del crecimiento de 2026 [A1]' },
      { kpi: 'Ventas a comercio y servicios (1S)', valor_anterior: '70,0 M SAR', valor_actual: '181,8 M SAR', variacion: '+160 %', comentario: '[A1]' },
      { kpi: 'Ventas a vinculadas (Al Ayuni y Limak Al Ayuni, 1S)', valor_anterior: '190,9 M SAR (15,7 %)', valor_actual: '222,6 M SAR (14,4 %)', variacion: '+17 %', comentario: 'Accionista del 23,9 % y su empresa conjunta [A1]' },
      { kpi: 'Margen bruto (1S)', valor_anterior: '8,9 %', valor_actual: '9,9 %', variacion: '+1,0 pp', comentario: 'Particulares 8,3 % → 13,9 %; por horas 14,1 % → 20,1 % [A1]' },
      { kpi: 'Contratos de más de un año (1S, % de ventas)', valor_anterior: '72,1 %', valor_actual: '70,1 %', variacion: '−2,0 pp', comentario: '[A1]' },
    ],
  },
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Innovations Group, «Workforce 2030»: suministro de mano de obra en Arabia Saudí (1.680 M USD obreros y 1.160 M USD cualificados en 2030; +3,35 % y +3,86 % anual); externalización de RR. HH. +6,63 % anual 2024-2030', editor: 'Communicate (Innovations Group)', tipo: 'Sectorial', fecha: '2025-08-25', url: 'https://communicateonline.me/news/innovations-group-unveils-workforce-2030-report-to-decode-saudi-arabias-evolving-talent-landscape/' },
  { id: 2, titulo: 'Easier Recruitment and Preserved Rights: Musaned Continues to Enhance the Efficiency of the Domestic Labor Recruitment Sector in H1 2026 (721 oficinas locales, 6.164 en el extranjero, 39 países, 50 días de llegada, 450.000 pólizas)', editor: 'Ministerio de Recursos Humanos y Desarrollo Social', tipo: 'Primaria', fecha: '2026-09-09', url: 'https://www.hrsd.gov.sa/en/media-center/news/%D8%A7%D8%B3%D8%AA%D9%82%D8%AF%D8%A7%D9%85-%D8%A3%D8%B3%D9%87%D9%84-%D9%88%D8%AD%D9%82%D9%88%D9%82-%D9%85%D8%AD%D9%81%D9%88%D8%B8%D8%A9' },
  { id: 3, titulo: 'Musaned confirms mandatory salary transfers for domestic workers via official channels (desde el 1-ene-2026)', editor: 'Arab News', tipo: 'Prensa', fecha: '2025-12-21', url: 'https://www.arabnews.com/node/2627040' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary: ventas, EBITDA y márgenes de Maharah (1831), SMASCO (1834), Tamkeen (1835), Randstad, Adecco y ManpowerGroup', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1831.SR' },
  { id: 5, titulo: 'Al Mawarid’s Q2 results likely to mirror Q1 2025: CEO (más competencia en el servicio a particulares; precios según el mercado)', editor: 'Argaam', tipo: 'Prensa', fecha: '2025-05-18', url: ART(1814654) },
  { id: 6, titulo: 'Company Profile 2025 (fundada en 2012, más de 20 sucursales, más de 50.000 empleados, más de 250.000 contratados)', editor: 'Almawarid Manpower', tipo: 'Primaria', fecha: '2025', url: 'https://mawarid.com.sa/assests/pdf/MawaridProfile2025English.pdf' },
  { id: 7, titulo: 'Interim financial statements 2T26: actividades y licencia del Ministerio (nota 1), ingresos por tipo de cliente (nota 7)', editor: 'Almawarid Manpower (vía Argaam)', tipo: 'Primaria', fecha: '2026-08-10', url: FS2T26 },
  { id: 8, titulo: 'Maharah CEO sees up to 13% revenue growth in 2026', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-05', url: ART(1905544) },
];
const ym = (s) => comps[s];
const B = {
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y serie del tamaño del mercado', tipo: 'Complemento', intentos: '1) Ministerio de Recursos Humanos (solo datos de Musaned: oficinas, contratos); 2) estudios de mercado (Innovations Group mide comisiones, no la facturación con sueldos: 2.840 M USD en 2030, menos que las ventas de las cuatro cotizadas); 3) suma de las cotizadas como aproximación, sin dato de las no cotizadas', decision: 'Omitido' },
  ],
  historia: {
    resumen: 'Almawarid nació en 2012 en Riad como empresa de cesión de mano de obra al amparo de la reforma que permitió a compañías con licencia del Ministerio de Trabajo traer y ceder trabajadores extranjeros, sobre todo domésticos [A1, B6]. Abrió sucursales por el Reino (Buraida, Jubail, Hail, Yeda, Medina, Abha, Al Ahsa) y en 2016-2020 sumó las filiales Musanid Al Tasheed (contratación) y Sawaid, hoy Talents Sea [A1]. Salió a bolsa en el mercado principal de Tadawul el 19-jun-2023, colocando el 30 % a 64 SAR por acción (48 SAR ajustados por las acciones gratuitas), con el libro institucional cubierto 54 veces [D5]. Desde entonces ha crecido con el segmento de empresas (construcción, hostelería, comercio) y ha añadido la contratación de personal saudí; en 2026 amplió capital con una acción gratuita por cada tres [A1].',
    hitos: [
      { anio: '2012', hito: 'Constitución en Riad (registro mercantil de 2-jul-2012) y licencia del Ministerio de Trabajo para cesión de mano de obra (19-nov-2012) [A1]' },
      { anio: '2016', hito: 'Sucursales en Buraida, Jubail, Hail y Yeda [A1]' },
      { anio: '2020', hito: 'Primera declaración de Sawaid (hoy Talents Sea), filial de mano de obra [A1]' },
      { anio: '2023', hito: 'Salida a bolsa en el mercado principal (19-jun), 30 % del capital a 64 SAR; fin del bloqueo de los grandes accionistas el 18-dic [D5, C4]' },
      { anio: '2024', hito: 'Ventas de 2.028 M SAR (+40 %) por los contratos con empresas; provisiones de insolvencias de un año [A4]' },
      { anio: '2025', hito: 'Ventas de 2.611 M SAR y beneficio de 138,5 M (+45 %); traspaso de la reserva legal a reservas voluntarias [A3, A1]' },
      { anio: '2026', hito: 'Ampliación gratuita de 150 a 200 M SAR (una por cada tres, 15-feb); dividendos semestrales de 1,40 y 1,60 SAR [A1]' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Almawarid trae trabajadores extranjeros con visados a su nombre (patrocinio), los aloja y los cede a empresas y familias, y cobra una tarifa mensual que cubre el sueldo, la residencia (iqama), el permiso de trabajo, el seguro, el alojamiento y su margen [A1]. Tres segmentos: empresas (81 % de las ventas del 1S26: construcción, hostelería y ocio, comercio, sanidad, mantenimiento), particulares (11 %: trabajadoras domésticas residentes, contratos de un mes a dos años) y por horas (8 %: limpieza a domicilio por visitas) [A1]. Todo en Arabia Saudí, con más de 20 sucursales y más de 50.000 empleados [B6]. Desde 2025 crece también la contratación y externalización de personal saudí (+199 % en el 1S26) [A5].',
    como_gana_dinero: 'Es un negocio de margen fino sobre un coste grande: el 73 % del coste de ventas del 1S26 son sueldos y prestaciones del trabajador cedido, y el 16 % tasas de residencia y permisos (219,6 M) [A1]. El margen bruto es del 8,4 % en empresas, del 13,9 % en particulares y del 20,1 % en el servicio por horas [A1]. El 70 % de las ventas viene de contratos de más de un año, lo que da visibilidad [A1]. El margen depende de la ocupación (trabajadores cedidos frente a disponibles), del coste de traer a cada trabajador (comisiones de agencias y visados, que se amortizan) y de las tasas del Estado; los gastos generales son solo el 2,6 % de las ventas, así que cada punto de ocupación cae casi entero al beneficio [A1].',
    clientes: 'No hay un cliente dominante declarado, pero sí un grupo vinculado: Al Ayuni Investment and Contracting (accionista del 23,9 %) y su empresa conjunta Limak Al Ayuni compraron 410,6 M en 2025 (15,7 % de las ventas) y 222,6 M en el 1S26 (14,4 %), aprobados por la junta [A9, A1]. El 46 % de las ventas del 1S26 son de empresas de construcción, cuyo ritmo depende de los grandes proyectos públicos [A1]. Los contratos con empresas duran uno o dos años; en particulares la competencia es dura (721 oficinas locales de contratación en Musaned) y la empresa ajusta precios según la demanda [B2, B5]. Poder de precios demostrado en particulares y por horas (margen bruto +5,6 y +6,0 puntos en un año), no en empresas [A1].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Cesión de mano de obra con licencia del Ministerio de Recursos Humanos en Arabia Saudí: empresas que traen trabajadores extranjeros (y cada vez más saudíes) y los ceden a empresas y familias, con la facturación del sueldo incluida. Perímetro: Reino de Arabia Saudí. Los estudios disponibles miden otra cosa (comisiones de suministro de personal) y dan una cifra menor que las ventas de las cuatro cotizadas, así que el tamaño se aproxima con la facturación de las cotizadas [B1, B4].',
    tamano: 'Sin cifra fiable: Innovations Group estima 2.840 M USD en 2030 para el suministro de personal (comisiones), cuando solo las cuatro cotizadas facturan ≈ 9.700 M SAR al año (Almawarid 2.940, Maharah 3.499, SMASCO 2.211 y Tamkeen 1.045 en doce meses) [B1, B4, A1]',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: 12.3,
    tcac_previsto_pct: 6.6,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Visión 2030 y grandes proyectos (construcción, turismo, ocio)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Construcción = 46 % de las ventas del 1S26, plana en ≈ 350 M por trimestre; hostelería y ocio +91 % [A1]' },
      { driver: 'Saudización (Nitaqat) y empleo de saudíes', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Ventas de contratación de saudíes +199 % en el 1S26; ayudas del HRDF en otros ingresos [A5, A1]' },
      { driver: 'Tasas del Estado por trabajador extranjero (iqama, permisos, visados)', efecto: '−', horizonte: 'Estructural', evidencia: '244 M de tasas y visados en el 1S26 (17,6 % del coste de ventas) [A1]' },
      { driver: 'Demanda de servicio doméstico de familias (mujer en el trabajo, hogares)', efecto: '+', horizonte: 'Estructural', evidencia: 'Particulares +21 % y plantilla +19 % en el 1S26 [A5]' },
      { driver: 'Digitalización y control de Musaned (salarios por canal oficial, seguro, ausencias)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Salarios por canal oficial desde el 1-ene-2026; 450.000 pólizas en el 1S26 [B3, B2]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cuatro cotizadas y cientos de oficinas; la dirección reconoce más competencia en particulares y la guerra de precios de 2024 en el servicio por horas [B5, A5]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Las constructoras negocian contratos de uno a dos años; un grupo vinculado compra el 14-16 % [A1, A9]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Agencias en los países de origen y el Estado (tasas): deterioros de anticipos a agencias de 5 M en 2025 [A3]' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Hace falta licencia y aval (10 M), pero Musaned tiene 721 oficinas locales [A1, B2]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Las empresas pueden patrocinar directamente a sus trabajadores; las familias, contratar por Musaned [B2]' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Las ventas a constructoras no crecen desde el 3T25 (≈ 350 M por trimestre) mientras hostelería y comercio tiran: es la señal de que el ciclo de los grandes proyectos se ha estabilizado [A1]. La empresa no cotizaba en 2008-09 ni en 2020; en 2021 sus ventas cayeron un 3 % con la pandemia y el flujo operativo fue negativo [A8, A7]. El índice saudí cae un 13 % en un año y muchas cotizadas marcan mínimos, con el petróleo y el gasto público como causa de fondo [D1].' },
    regulacion: 'La actividad necesita licencia del Ministerio de Recursos Humanos (la de Almawarid es de 2012) y un aval de 10 M [A1]. Desde el 1-ene-2026 los sueldos de las trabajadoras domésticas se pagan por canales oficiales de Musaned; en 2026 entraron el servicio de interrupción de trabajo, el seguro médico obligatorio y un periodo de gracia para regularizar ausencias, que terminó el 11-may-2026 [B3, B2]. Los cupos de saudización (Nitaqat) y las tasas por trabajador extranjero mueven el coste y la demanda; un cambio en las tasas se repercute con retraso en contratos de uno a dos años [A1].',
    tendencias: 'Tres cambios: más contratación de saudíes, que da margen y ayudas (HRDF) y que Almawarid aprovecha (+199 %); servicio por horas con aplicación y flota propia (440 vehículos en 2025, 2,1 M de visitas), donde la escala da ventaja; y control digital de Musaned, que reduce las disputas y las ausencias pero hace más fácil a las familias contratar sin intermediario [A5, D9, B2].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 30.3,
    posicion: '2.ª de las cuatro cotizadas por ventas (30 % de su facturación conjunta en doce meses, estimación propia), por detrás de Maharah',
    competidores: [
      { nombre: 'Maharah Human Resources', pais: 'Arabia Saudí', ticker: '1831.SR', ingresos: r1(ym('1831.SR').rev / 1e6), cuota_pct: 36.1, margen_ebit_pct: r1(ym('1831.SR').opM * 100), comentario: 'La mayor; empresas y particulares; espera hasta +13 % de ventas en 2026 [B8]' },
      { nombre: 'Saudi Manpower Solutions (SMASCO)', pais: 'Arabia Saudí', ticker: '1834.SR', ingresos: r1(ym('1834.SR').rev / 1e6), cuota_pct: 22.8, margen_ebit_pct: r1(ym('1834.SR').opM * 100), comentario: 'Más peso en particulares; margen EBITDA del 14 % [B4]' },
      { nombre: 'Tamkeen Human Resource', pais: 'Arabia Saudí', ticker: '1835.SR', ingresos: r1(ym('1835.SR').rev / 1e6), cuota_pct: 10.8, margen_ebit_pct: r1(ym('1835.SR').opM * 100), comentario: 'La más pequeña y de mayor margen operativo [B4]' },
      { nombre: 'Randstad', pais: 'Países Bajos', ticker: 'RAND.AS', ingresos: r1(ym('RAND.AS').rev / 1e6 * Y.fx['EURSAR=X']), cuota_pct: null, margen_ebit_pct: r1(ym('RAND.AS').opM * 100), comentario: 'Trabajo temporal global; referencia de margen del sector [B4]' },
      { nombre: 'Adecco', pais: 'Suiza', ticker: 'ADEN.SW', ingresos: r1(ym('ADEN.SW').rev / 1e6 * Y.fx['EURSAR=X']), cuota_pct: null, margen_ebit_pct: r1(ym('ADEN.SW').opM * 100), comentario: 'Cuentas en EUR [B4]' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La aplicación y la flota del servicio por horas ganan densidad por barrio (1.550 barrios servidos en 2025), pero sin red de dos lados [D9]' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Contratos de uno a dos años con empresas y el trabajador ya instalado; el 70 % de las ventas es de contratos de más de un año [A1]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Licencia del Ministerio y aval; marca Hemma; pero hay 721 oficinas locales con licencia [A1, B2]' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Gastos generales del 2,6 % de las ventas; incorporación en 15 días frente a 4-6 semanas según la empresa [A1, B6]' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Cuatro cotizadas con márgenes EBIT del 6-10 %, sin que ninguna los suba con la escala [B4]' },
      ],
    },
    amenazas: 'Lo que puede erosionar el margen: una guerra de precios en particulares (ya la hubo en el servicio por horas en 2024), que las constructoras patrocinen directamente o que un frenazo de los grandes proyectos deje trabajadores sin ceder (cada punto de ocupación pesa en un margen bruto del 9-10 %), y cambios de tasas que no se puedan repercutir en contratos ya firmados [A5, A1]. Probabilidad media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El asunto material es el trato a los trabajadores migrantes: la empresa paga sus sueldos (1.020,7 M en el 1S26), su alojamiento y su residencia, y responde de ellos ante el Ministerio [A1]. Las nuevas normas de Musaned (salario por canal oficial, seguro médico, ausencias) reducen el riesgo legal y de reputación [B3, B2]. La saudización da ingresos y ayudas (HRDF) [A5].',
    controversias: 'No se encontraron sanciones ni litigios propios en los anuncios y la prensa revisados (Argaam, Arab News); la empresa colabora con el Ministerio contra las ausencias de trabajadores [B5].',
    confianza: 'Baja',
  },
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Investor Relations: consejo (7 miembros) y dirección (consejero delegado, director financiero, directores de operaciones y ventas)', editor: 'Almawarid Manpower', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://investors.mawarid.com.sa/' },
  { id: 2, titulo: 'Interim financial statements 2T26: remuneración del consejo y de la alta dirección (nota 15), vinculadas, firmas (presidente Ahmad Mohammed Al Rakban, consejero delegado Riyadh Ibrahim Al Romaizan, director financiero Tarek Fouad Mahmoud)', editor: 'Almawarid Manpower (vía Argaam)', tipo: 'Primaria', fecha: '2026-08-10', url: FS2T26 },
  { id: 3, titulo: 'Al Mawarid shareholders authorize board to pay 2026 interim dividends (contratos con Al Ayuni, donde el fallecido consejero Ahmed Al-Issa tenía interés indirecto)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-05-12', url: ART(1904754) },
  { id: 4, titulo: 'Lock-up period for Al Mawarid Manpower major shareholders ends today (accionistas tras la salida a bolsa: Alomaier 23,94 %, Al-Ayuni 23,94 %, Saudi Edarah 6,62 %, Khalda 5,05 %, Almawarid kom 4,66 %, Alsaraya 3,64 %)', editor: 'Argaam', tipo: 'Prensa', fecha: '2023-12-18', url: ART(1692278) },
  { id: 5, titulo: 'Al Mawarid EGM OKs 33.3% capital hike via bonus issue (junta extraordinaria del 10-feb-2026)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-02-11', url: ART(1879453) },
  { id: 6, titulo: 'Al Mawarid CEO sees sustained demand in Q2 2026 (política de dividendos en estudio)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-05-12', url: ART(1904855) },
];
const C = {
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'participaciones actuales, operaciones de directivos y votos de la junta', tipo: 'Núcleo', intentos: '1) saudiexchange.sa (accionistas significativos, anuncios y actas): 403; 2) Argaam (accionistas y consejo en la zona de pago); Mubasher 403; 3) Argaam de dic-2023 (tras la salida a bolsa) como última foto pública', decision: 'Calculado y marcado como estimación' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) informe del consejo de 2025 (Tadawul, 403); 2) nota 15 de los intermedios (solo la alta dirección en bloque: 8,58 M en el 1S26); 3) prensa (Argaam, ranking de sueldos, de pago)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) anuncios y presentaciones (la empresa no publica guía numérica); 2) entrevistas del consejero delegado (solo cualitativas: «el 2T como el 1T», «el 3T igual o mejor»); 3) Argaam', decision: 'Calculado y marcado como estimación' },
  ],
  directivos: {
    equipo: [
      { nombre: 'Riyadh Ibrahim Al Romaizan', cargo: 'Consejero delegado y consejero', desde: null, participacion_pct: null, trayectoria: 'Dirige la empresa desde antes de la salida a bolsa; con él las ventas pasaron de 945 M en 2022 a 2.940 M en doce meses y el beneficio de 76 a 178 M [C1, A3, A1].' },
      { nombre: 'Tarek Fouad Mahmoud', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Firma las cuentas de 2026 [C2].' },
      { nombre: 'Ahmad Mohammed Al Rakban', cargo: 'Presidente', desde: null, participacion_pct: null, trayectoria: 'Presidente no ejecutivo [C1, C2].' },
      { nombre: 'Abdullah Al-Omair', cargo: 'Vicepresidente', desde: null, participacion_pct: null, trayectoria: 'Ligado por apellido al grupo Alomaier, accionista del 23,94 % tras la salida a bolsa y cliente vinculado (0,8 M en el 1S26) [C1, C4, A1].' },
      { nombre: 'Fahd Alobisi', cargo: 'Director de operaciones', desde: null, participacion_pct: null, trayectoria: '[C1]' },
    ],
    historial_guidance: [
      { anio: '2025', guia: '2T25 en línea con el 1T25 (consejero delegado, may-2025)', real: '2T25: 32,4 M frente a 29,9 M en el 1T25', cumplida: 'Sí' },
      { anio: '2025', guia: '3T25 igual o mejor que el 2T25 (ago-2025)', real: '3T25: 37,0 M frente a 32,4 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Demanda sostenida en el 2T26 (may-2026)', real: '2T26: 50,0 M frente a 52,2 M en el 1T26 (−4 %, estacional)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable: el consejero delegado lleva la empresa desde antes de la salida a bolsa y sus previsiones cualitativas de 2025 se cumplieron [C1, A5]. No publica guía numérica. El consejo perdió a un consejero (Ahmed Al-Issa, fallecido) que representaba el interés de Al Ayuni, el mayor cliente vinculado [C3]. Sin plan de sucesión publicado.',
    confianza: 'Baja',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ahmad Mohammed Al Rakban', cargo: 'Presidente', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Abdullah Al-Omair', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Riyadh Ibrahim Al Romaizan', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Tariq Al-Awaji', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Youssef Al-Olayan', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Abdulaziz Al Rashid', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
      { nombre: 'Abdulaziz Al-Nasser', cargo: 'Consejero', tipo: 'Otro externo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: null, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Solo hay cifras en bloque: la alta dirección cobró 8,58 M SAR en el 1S26 (7,73 M en el 1S25), y el consejo 1,73 M entre remuneración y dietas de comisiones (1,38 M) [C2]. No se ha podido leer el informe de remuneraciones (Tadawul no accesible), así que no se sabe con qué métricas se paga el variable.',
    accionistas: [
      { nombre: 'Alomaier Trading and Contracting Co.', pct: 23.94, tipo: 'Fundador / empresa familiar', variacion: 'Sin cambio conocido desde dic-2023 (foto tras la salida a bolsa)' },
      { nombre: 'Al-Ayuni Investment and Contracting Co.', pct: 23.94, tipo: 'Fundador / cliente vinculado', variacion: 'Sin cambio conocido desde dic-2023' },
      { nombre: 'Saudi Edarah Co. (directa e indirecta vía Alsaraya)', pct: 6.62, tipo: 'Inversor', variacion: 'Foto de dic-2023' },
      { nombre: 'Khalda Trading Group', pct: 5.05, tipo: 'Inversor', variacion: 'Foto de dic-2023' },
      { nombre: 'Almawarid kom Trading Group', pct: 4.66, tipo: 'Inversor', variacion: 'Foto de dic-2023' },
      { nombre: 'Alsaraya Investment Co.', pct: 3.64, tipo: 'Inversor', variacion: 'Foto de dic-2023' },
    ],
    insiders: [],
    control_y_defensas: 'Dos grupos de contratistas con el 23,94 % cada uno (Alomaier y Al-Ayuni) controlaban casi la mitad del capital tras la salida a bolsa, y los seis grandes accionistas el 68 % [C4]. No hay un controlador único, pero los dos grandes son también clientes: Al Ayuni y su empresa conjunta con Limak compraron 410,6 M en 2025 (15,7 % de las ventas), aprobados por la junta, y Al Omaier 0,8 M en el 1S26 [C3, A1]. Una acción, un voto; sin clases. El bloqueo de los fundadores terminó el 18-dic-2023 [C4].',
    alertas: [
      'Operaciones vinculadas grandes: 15,7 % de las ventas de 2025 a Al Ayuni y Limak Al Ayuni (accionista del 23,94 %) [C3].',
      'Sin informe de remuneraciones ni registro de operaciones de directivos accesibles (Tadawul 403): no se ha podido comprobar si hubo ventas de los fundadores en 12 meses.',
    ],
    confianza: 'Baja',
  },
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 1833.SR, KSA y XLI (bolsa.mjs) y movimiento (movimiento.mjs) hasta el 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1833.SR/history' },
  { id: 2, titulo: 'Al Mawarid Manpower Co. (1833): cotización del 19-oct-2026 (87,80 SAR, −3,52 %; 67.400 acciones, 5,95 M SAR; media de 3 meses 7,14 M SAR), recomendaciones (AlJazira Capital y SNB Capital, sobreponderar), calendario', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.argaam.com/en/company/companyoverview/marketid/3/companyid/15170' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary (1833.SR y comparables): consenso de 4 analistas (objetivo 126,14; 118,80-133,00), BPA 2026e 9,00 y 2027e 10,31, múltiplos, márgenes; tipos de cambio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1833.SR/analysis' },
  { id: 4, titulo: 'FRED, DGS10: bono del Tesoro de EE. UU. a 10 años (5,10 % el 15-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Al Mawarid shares set to make Tadawul debut on June 19 / salida a bolsa a 64 SAR, libro institucional cubierto 54 veces', editor: 'Argaam', tipo: 'Prensa', fecha: '2023-06-18', url: ART(1651325) },
  { id: 6, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'AlJazira Capital issues Q3 2026 earnings forecasts (Al Mawarid: 54,8 M, +48 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-07', url: ART(1942257) },
  { id: 9, titulo: 'GIB Capital previews Q3 2026 earnings (Al Mawarid: 49 M, +32,5 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-11', url: ART(1942966) },
  { id: 10, titulo: 'AlJazira Capital: Al Mawarid Q2 profit matches estimates; rating reiterated', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-08-08', url: ART(1927164) },
  { id: 11, titulo: 'Al Mawarid CEO sees stronger Q3 2025 results, SAR 70M cash invested', editor: 'Argaam', tipo: 'Prensa', fecha: '2025-08-12', url: ART(1835580) },
  { id: 12, titulo: 'Investor Relations: calendario financiero (3T26 previsto el 28-oct-2026) y dividendos pagados', editor: 'Almawarid Manpower', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://investors.mawarid.com.sa/' },
  { id: 13, titulo: 'Yahoo Finance chart 1833.SR: cierres de 2023-2025 ajustados solo por las acciones gratuitas (4:3, 15-feb-2026) y dividendos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1833.SR/chart' },
];
const C1 = (s, fx = 1) => {
  const c = comps[s];
  const per = c.fpe ?? (s === '2181.T' ? r1(c.price / (0.5 * c.et[2].eps + 0.5 * c.et[3].eps)) : null);
  const g0 = c.et.find((t) => t.p === '0y')?.g, g1 = c.et.find((t) => t.p === '+1y')?.g;
  const crec = s === '2181.T' ? r1(g1 * 100) : (g0 != null && g1 != null ? r1((0.2 * g0 + 0.8 * g1) * 100) : null);
  return { nombre: c.name, ticker: s, capitalizacion: Math.round(c.mcap / 1e6 * fx), ev_ventas: c.evRev, ev_ebitda_ltm: c.evEbitda, ev_ebitda_ntm: null, per_ntm: r1(per), crecimiento_pct: crec, margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: r2((c.debt - c.cash) / c.ebitda), fcf_yield_pct: c.fcf ? r1(c.fcf / c.mcap * 100) : null };
};
const D = {
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) anuncios de compras de las cotizadas saudíes del sector (Maharah, SMASCO, Tamkeen: sin múltiplos publicados); 2) operaciones europeas de trabajo temporal (Adecco-Akka, Randstad): múltiplos solo en prensa, sin la nota oficial; 3) Argaam M&A (de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Tadawul (préstamo de valores, 403); 2) Argaam; 3) no hay ventas en corto relevantes en Tadawul para valores de este tamaño', decision: 'Omitido' },
  ],
  identificacion: {
    nombre: 'Almawarid Manpower Company (Al Mawarid Manpower Co.)', nombre_corto: 'Almawarid', ticker: '1833.SR', isin: null, mercado: 'Saudi Exchange (Tadawul), mercado principal', indice_referencia: 'TASI (medido con el ETF KSA)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Industriales', industria: 'Servicios de personal (cesión de mano de obra)', sede: 'Riad', fundacion: '2012', empleados: 50000, web: 'https://mawarid.com.sa',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 20.0, capitalizacion_publicada: 1756.0, free_float_pct: null,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 7,1 M SAR/día (≈ 70.000 acciones; 3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'La empresa no publica guía numérica. El consejero delegado habló en mayo de 2026 de demanda sostenida por hostelería, ocio y servicios públicos, y en la conferencia del 2T26 la dirección dijo que el impulso seguirá en el 2S26 [C6, D10]. La junta autorizó dividendos semestrales o trimestrales para 2026, y el consejo trabaja en una política de dividendos [C6].',
    estimaciones: [
      { periodo: '2026e', ingresos: 3010, ebitda: null, ebit: null, bpa: 9.0, dpa: null, fuente: 'Yahoo Finance (1 analista para el BPA, 4 para el objetivo) [D3]' },
      { periodo: '2027e', ingresos: 3357, ebitda: null, ebit: null, bpa: 10.31, dpa: null, fuente: 'Yahoo Finance (1 analista) [D3]' },
    ],
    recomendaciones: { n_analistas: 4, comprar: 4, mantener: 0, vender: 0, po_medio: 126.14, po_min: 118.8, po_max: 133.0 },
    revisiones: 'Solo una fuente con estimaciones (Yahoo, un analista para el BPA); el objetivo y las recomendaciones se contrastan con Argaam: AlJazira Capital (sobreponderar, ago-2026) y SNB Capital (sobreponderar, jun-2026) [D3, D2]. Para el 3T26, AlJazira espera 54,8 M (+48 %) y GIB Capital 49 M (+32,5 %) [D8, D9]. El BPA de 2026e de Yahoo (9,00) queda por debajo de lo que ya suman el 1S26 (5,11) y una segunda mitad como la de 2025 (3,81): está desfasado.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, confianza: 'Media' },
  multiplos_historicos: {
    serie: [
      { anio: '2023', precio_cierre: 93.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 79.05, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 97.57, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      C1('1831.SR'), C1('1834.SR'), C1('1835.SR'),
      C1('RAND.AS', Y.fx['EURSAR=X']), C1('ADEN.SW', Y.fx['CHFSAR=X']), C1('MAN', Y.fx['USDSAR=X']), C1('2181.T', Y.fx['JPYSAR=X']), C1('KELYA', Y.fx['USDSAR=X']),
    ],
    confianza: 'Media',
  },
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Hawamer y Mubasher (403); 2) Argaam (comentarios de los artículos vacíos: «Be the first to comment») y Stocktwits (sin flujo para 1833.SR); 3) Reddit y X (403 o sin debate sobre la empresa)', decision: 'Omitido' },
  ],
  sentimiento: null,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
