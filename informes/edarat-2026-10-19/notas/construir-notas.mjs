// Notas A-E de Edarat Communication and Information Technology Co. (Nomu, Tadawul 9557; corte 2026-10-19).
// Arabia Saudí sin XBRL y Saudi Exchange cerrado (403, Akamai): anuncios y adjuntos oficiales de Tadawul a través de la API
// de Euroland (la web de inversores de Edarat usa sus widgets); cuentas auditadas de 2022 (PKF Al-Bassam; estados primarios
// escaneados, leídos como imagen) e intermedios del 1S26 (revisión limitada) del almacén público de Argaam. Balances y flujos
// de 2023-2024 de Stock Analysis (secundaria) porque los PDF anuales de esos años son de pago en Argaam y Edarat no los cuelga.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/edarat-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = Object.fromEntries(JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8')).map((c) => [c.s, c]));
const MSG = (id) => `https://ksatools.eurolandir.com/tools/Pressreleases/Main/GetMessage/?id=${id}&lang=en-GB&companycode=sa-9557`;
const ADJ = 'https://ksastorage.eurolandir.com/press-releases-attachments/';
const FS1S26 = 'https://argaamplus.s3.amazonaws.com/9406bf87-5858-49c8-8902-ac6d7c60cb48.pdf';
const SA = 'https://stockanalysis.com/quote/tadawul/9557/financials/';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const ACC = 7.545; // acciones medias tras las ampliaciones gratuitas (7,56 M emitidas menos autocartera y acciones del plan de empleados)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Financial Statements for the year ended 31 December 2022 with Independent Auditor’s Report (PKF Al-Bassam): cuenta, balance y flujos de 2022 y 2021, coste de servicios, deuda, indemnizaciones por cese', editor: 'Edarat (anuncio de Tadawul, adjunto)', tipo: 'Primaria', fecha: '2023-04-13', url: `${ADJ}3506250/14617_3884_2023_04_13_11_21_55_en_20230413164826.pdf` },
  { id: 2, titulo: 'Interim condensed financial statements for the six-month period ended 30 June 2026 (revisión limitada): cuenta del 1S26 y 1S25, balance a 30-jun-2026 y 31-dic-2025, flujos, segmentos (nota 19), vinculadas (nota 7), préstamos (nota 12)', editor: 'Edarat (vía Argaam)', tipo: 'Primaria', fecha: '2026-07-29', url: FS1S26 },
  { id: 3, titulo: 'Annual Financial results for the period ending on 2025-12-31 (ventas, beneficio bruto, operativo y neto; segmentos; préstamo a largo plazo de 2025)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-02-09', url: MSG(7896365) },
  { id: 4, titulo: 'Annual consolidated Financial Results for the Period Ending on 2024-12-31', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-02-02', url: MSG(7338770) },
  { id: 5, titulo: 'Annual Financial results for the period ending on 2023-12-31 (2022 reexpresado)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2024-01-30', url: MSG(7309368) },
  { id: 6, titulo: 'Interim Financial Results for the Period Ending on 2026-06-30 (Six Months): ventas por segmento y causas', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-07-29', url: MSG(8107393) },
  { id: 7, titulo: 'Interim Financial Results 1S25, 1S24 y 1S23 (ventas, beneficio y margen bruto por segmento)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-08-06', url: MSG(7765780) },
  { id: 8, titulo: 'Edarat (9557): balance y estado de flujos anuales 2021-2025', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: `${SA}balance-sheet/` },
  { id: 9, titulo: 'Yahoo Finance, fundamentals-timeseries de 9557.SR: EBITDA, beneficio antes de impuestos y tipo impositivo 2022-2025', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/9557.SR/financials' },
  { id: 10, titulo: 'Related Parties Transactions for the fiscal year ending Dec 31, 2025 (MIS: 77,55 M SAR de servicios prestados; Edarat Lebanon)', editor: 'Edarat (adjunto a la convocatoria de la junta)', tipo: 'Primaria', fecha: '2026-03-31', url: `${ADJ}4135614/945_14617_3884_2026-06-18_04-54-44_en.pdf` },
  { id: 11, titulo: 'Audit Committee Report for the General Assembly, year ended 31-12-2025', editor: 'Edarat (adjunto)', tipo: 'Primaria', fecha: '2026-06-15', url: `${ADJ}4133082/267_14617_3884_2026-06-15_06-46-08_en.pdf` },
  { id: 12, titulo: 'Annual Financial Results for the Period Ending on 2022-12-31', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2023-01-31', url: MSG(7309403) },
  { id: 13, titulo: 'Obtaining a Shari’ah Compliant Facilities (Saudi Awwal Bank, 18 M SAR)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2024-12-25', url: MSG(7324793) },
  { id: 14, titulo: 'Purchase of a 40% stake in National Excellence Data Centers (400.000 SAR de capital)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-10-08', url: MSG(7813983) },
];

// Cuenta por función (NIIF adoptadas en Arabia Saudí). EBITDA = beneficio operativo + amortizaciones (equipos, intangibles y
// derechos de uso; flujos). 2021-2022: el beneficio operativo publicado es igual al beneficio antes de zakat (los gastos financieros,
// pequeños, van dentro). impuestos = zakat + impuesto de sociedades (la sucursal de Dubái y la parte extranjera del capital).
// BPA reexpresado a las acciones de hoy (7,545 M tras las ampliaciones gratuitas de 2023, 2024, 2025 y 2026) [3, 6].
const C = (periodo, ingresos, bruto, ebit, am, bai, imp, bn, dpa = 0) => ({
  periodo, ingresos, coste_ventas: r2(ingresos - bruto), gastos_generales: r2(bruto - ebit), ebitda: r2(ebit + am), amortizaciones: am, ebit,
  resultado_financiero: r2(bai - ebit), bai, impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: null,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(bn / ACC), dpa, dpa_extraordinario: 0, acciones_diluidas: ACC,
});
const cuenta = [
  C('2021', 37.33, 12.79, 7.48, 0.84, 7.48, 1.00, 6.48),
  C('2022', 58.89, 23.46, 14.15, 2.04, 14.15, 1.55, 12.60, r2(3.5 / ACC)),
  C('2023', 80.24, 34.59, 19.79, 2.96, 19.41, 2.04, 17.37),
  C('2024', 104.57, 45.31, 27.75, 3.49, 27.43, 2.77, 24.66),
  C('2025', 192.36, 62.19, 40.55, 5.08, 39.72, 3.38, 36.34),
];
// LTM a jun-26 = 2025 + 1S26 − 1S25 [2, 3]. Amortización: 1S26 3,65 M; 1S25 2,13 M. Flujo libre: operativo 33,63 − capex 14,69 − arrendamientos ≈ 0,86.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 208.85, ebitda: 51.91, ebit: 45.31, beneficio_neto: 40.88, bpa: r2(40.88 / ACC), dpa: 0, dpa_extraordinario: 0, fcf: 18.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance. clientes = clientes + saldos con vinculadas (sobre todo MIS) [1, 2]; 2023-2024, cobros totales de Stock Analysis (incluyen
// la obra pendiente de facturar) [8]. deuda = préstamos bancarios + financiación a corto. reservas = ganancias acumuladas.
const balanceH = [
  { periodo: '2021', activo_total: 25.15, activo_corriente: 22.54, pasivo_corriente: 9.93, pasivo_total: 12.24, fondo_comercio: 0, intangibles: null, inmovilizado_material: 2.61, existencias: 0, clientes: 7.32, proveedores: 2.22, activos_contrato: 11.47, pasivos_contrato: null, caja: 0.09, deuda_financiera: 2.32, arrendamientos: 0, patrimonio_neto: 12.91, minoritarios: 0, reservas: 6.12 },
  { periodo: '2022', activo_total: 39.01, activo_corriente: 26.62, pasivo_corriente: 12.15, pasivo_total: 17.56, fondo_comercio: 0, intangibles: null, inmovilizado_material: 9.81, existencias: 0, clientes: 9.13, proveedores: 3.27, activos_contrato: 7.09, pasivos_contrato: 2.05, caja: 6.02, deuda_financiera: 0.71, arrendamientos: 2.39, patrimonio_neto: 21.46, minoritarios: 0, reservas: 14.27 },
  { periodo: '2023', activo_total: 60.09, activo_corriente: 49.29, pasivo_corriente: 15.63, pasivo_total: 21.06, fondo_comercio: 0, intangibles: 2.16, inmovilizado_material: 8.64, existencias: 0, clientes: 37.64, proveedores: 4.59, activos_contrato: null, pasivos_contrato: 3.47, caja: 8.90, deuda_financiera: 0.74, arrendamientos: 1.90, patrimonio_neto: 39.03, minoritarios: 0, reservas: 27.23 },
  { periodo: '2024', activo_total: 89.45, activo_corriente: 76.91, pasivo_corriente: 19.98, pasivo_total: 26.57, fondo_comercio: 0, intangibles: 2.68, inmovilizado_material: 9.86, existencias: 0, clientes: 58.72, proveedores: 7.46, activos_contrato: null, pasivos_contrato: 3.04, caja: 12.76, deuda_financiera: 2.48, arrendamientos: 1.37, patrimonio_neto: 62.88, minoritarios: 0, reservas: 40.04 },
  { periodo: '2025', activo_total: 165.82, activo_corriente: 140.91, pasivo_corriente: 57.02, pasivo_total: 70.74, fondo_comercio: 0, intangibles: 2.45, inmovilizado_material: 21.63, existencias: 0, clientes: 64.08, proveedores: 26.05, activos_contrato: 28.79, pasivos_contrato: 8.27, caja: 31.28, deuda_financiera: 8.04, arrendamientos: 0.71, patrimonio_neto: 95.08, minoritarios: 0, reservas: 51.18 },
];

// Flujos [1, 8, 2]. capex = equipos e intangibles. 2022: dividendo de 3,5 M del 2S21 (1,73 M en caja; el resto compensado con
// saldos de socios) [1]. 2024-2025: recompras de autocartera para el plan de acciones de empleados.
const flujosH = [
  { periodo: '2021', flujo_operativo: -0.99, capex: 0.37, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: '2022', flujo_operativo: 14.62, capex: 4.70, pagos_arrendamientos: 0.65, adquisiciones: 0, desinversiones: 0, dividendos: 1.73, recompras: 0, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: '2023', flujo_operativo: 4.92, capex: 1.36, pagos_arrendamientos: 0.65, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: '2024', flujo_operativo: 8.16, capex: 5.24, pagos_arrendamientos: 0.65, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 0.88, emision_acciones: 0, intereses_en_financiacion: null },
  { periodo: '2025', flujo_operativo: 33.43, capex: 17.44, pagos_arrendamientos: 0.75, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 1.84, emision_acciones: 0, intereses_en_financiacion: null },
];

// Nomu solo exige cuentas semestrales: no hay trimestres. Semestres de los anuncios oficiales [6, 7, 3, 4, 5]; los segundos
// semestres, por diferencia con el año. EBITDA solo donde se conoce la amortización del semestre (1S25 y 1S26) [2].
const S = (periodo, ingresos, crec, bn, ebitda = null) => ({ periodo, ingresos, crecimiento_pct: crec, crecimiento_organico_pct: crec, ebitda, margen_ebitda_pct: ebitda ? r1(ebitda / ingresos * 100) : null, bpa: r2(bn / ACC), vs_consenso: null });
const tri = [
  S('1S23', 39.87, 39.7, 8.27),
  S('2S23', 40.37, 32.9, 9.10),
  S('1S24', 45.62, 14.4, 11.58),
  S('2S24', 58.95, 46.0, 13.08),
  S('1S25', 75.15, 64.7, 15.24, 19.29),
  S('2S25', 117.21, 98.8, 21.10),
  S('1S26', 91.64, 21.9, 19.79, 25.57),
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2026', descripcion: '40 % de National Excellence Data Centers, comprado a MIS (vinculada) por 400.000 SAR de capital; puesta en equivalencia, sin efecto en ventas [14, 2].' },
    ],
    comentario: null, ajustes: null,
    confianza: 'Media',
  },
  trimestres: { items: tri, ultima_presentacion: null, confianza: 'Media' },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026-27', importe: 2.67 }, { anio: '2027-28', importe: 2.58 }],
    liquidez: 'Caja de 36,24 M SAR a 30-jun-2026 frente a 5,26 M de préstamo a largo plazo (2,67 M a corto) y 0,85 M de arrendamientos; línea de 18 M con Saudi Awwal Bank (SAIBOR + 3,5 % a corto y + 4 % en capex), avalada en 4,5 M por MIS, con un límite de pasivo total / patrimonio tangible de 1,25 [2, 13]. El pedido de GPU de 127,5 M (sep-2026) se paga con crédito del proveedor y bancos: la deuda subirá en el 4T26-1T27.',
    rating: 'Sin rating',
    coste_deuda_pct: 9.0,
    vida_media_anios: 1.5,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: null, confianza: 'Media' },
  calidad: { auditor: 'PKF Al-Bassam & Co.', anios_auditor: null, opinion: 'Favorable', comentario: null, senales: null, confianza: 'Media' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2025', objetivo: 'National Excellence Data Centers (40 %, a MIS)', importe: 0.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sociedad recién creada; aportación de capital de 400.000 SAR [14].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Ingeniería y servicios de centros de datos', descripcion: 'Diseño, supervisión de obra, pruebas, puesta en marcha y gestión técnica de instalaciones (TFM) de centros de datos', tipo_resultado: 'Margen bruto', historico: [
        { periodo: '2021', ingresos: 24.36, resultado: null }, { periodo: '2022', ingresos: 46.81, resultado: null }, { periodo: '2023', ingresos: 49.80, resultado: null }, { periodo: '2024', ingresos: 55.63, resultado: null }, { periodo: '2025', ingresos: 116.20, resultado: null } ] },
      { nombre: 'Nube (EdaratCloud) y colocation', descripcion: 'Infraestructura como servicio, nube soberana, colocation y computación en el borde (desde abr-2025)', tipo_resultado: 'Margen bruto', historico: [
        { periodo: '2021', ingresos: 12.97, resultado: null }, { periodo: '2022', ingresos: 12.08, resultado: null }, { periodo: '2023', ingresos: 30.44, resultado: null }, { periodo: '2024', ingresos: 48.94, resultado: null }, { periodo: '2025', ingresos: 76.16, resultado: null } ] },
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 97 }, { nombre: 'Emiratos (sucursal de Dubái) y Líbano', peso_pct: 3 }],
    geografias_criterio: 'destino (estimación: la empresa no publica el reparto)',
    kpis: [
      { kpi: 'Ventas a MIS (vinculada, accionista del 30 %) / total', valor_anterior: '39 % (2024: 41,2 M SAR)', valor_actual: '40 % en 2025 (77,6 M); 55 % en el 1S26 (50,2 M)', variacion: '+15 pp en el 1S26', comentario: 'Diseño y supervisión de centros de datos de MIS [10, 2].' },
      { kpi: 'Saldo a cobrar de MIS (M SAR)', valor_anterior: '51,2 (dic-2025)', valor_actual: '56,5 (jun-2026)', variacion: '+10 %', comentario: 'Más de medio año de ventas a MIS sin cobrar [2].' },
      { kpi: 'Margen bruto de ingeniería', valor_anterior: '41,8 % (1S25)', valor_actual: '55,4 % (1S26)', variacion: '+13,6 pp', comentario: 'Proyectos de MIS de más margen [2].' },
      { kpi: 'Margen bruto de nube y colocation', valor_anterior: '30,5 % (1S25)', valor_actual: '7,6 % (1S26)', variacion: '−22,9 pp', comentario: 'Coste de la capacidad de colocation y amortización de la nube ampliada [2, 6].' },
      { kpi: 'Gastos generales / ventas', valor_anterior: '12,4 % (2024)', valor_actual: '7,4 % (2025)', variacion: '−5,0 pp', comentario: 'Apalancamiento operativo [3].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'margen bruto anual por segmento (resultado)', tipo: 'Complemento', intentos: '1) Anuncios de resultados anuales 2023-2025: solo ventas por segmento; 2) cuentas auditadas de 2023-2025: no accesibles (Saudi Exchange 403; PDF de pago en Argaam); 3) intermedios del 1S26: solo 1S26 y 1S25', decision: 'Omitido; margen semestral en los indicadores' },
    { seccion: 'trimestres', campo: 'trimestres y EBITDA semestral de 2023-2024', tipo: 'Complemento', intentos: '1) Nomu solo exige cuentas semestrales; 2) anuncios semestrales: sin amortización; 3) Yahoo y Stock Analysis: sin desglose semestral', decision: 'Semestres en lugar de trimestres; EBITDA solo 1S25 y 1S26' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Saudi CDC 2025: showcasing one of the fastest-growing DC markets in MENA (Mordor Intelligence: centros de datos de Arabia Saudí 2.110 M USD en 2025 y 3.900 M en 2030, +13,07 % anual)', editor: 'W.Media', tipo: 'Sectorial', fecha: '2025', url: 'https://w.media/saudi-cdc-2025-showcasing-one-of-the-fastest-growing-dc-markets-in-mena/' },
  { id: 2, titulo: 'Saudi Arabia Data Center Colocation Market (315 M USD en 2024, 1.800 M en 2030, +33,71 % anual; ≈ 1.290 MW en 2030)', editor: 'Arizton', tipo: 'Sectorial', fecha: '2025', url: 'https://www.arizton.com/market-reports/saudi-arabia-data-center-colocation-market' },
  { id: 3, titulo: 'Informe anual de 2022 del consejo (árabe): historia, accionistas, consejo y directivos', editor: 'Edarat (adjunto)', tipo: 'Primaria', fecha: '2023-04-13', url: `${ADJ}3506254/14617_3884_2023_04_13_11_30_01_en_20230413164826.pdf` },
  { id: 4, titulo: 'Interim condensed financial statements 1S26, nota 1 (constitución en 2008, salida a Nomu el 26-dic-2022, sucursal de Dubái) y nota 19 (segmentos)', editor: 'Edarat (vía Argaam)', tipo: 'Primaria', fecha: '2026-07-29', url: FS1S26 },
  { id: 5, titulo: 'Award letter from Almoammar Information Systems (MIS): diseño, supervisión, pruebas y puesta en marcha de un centro de datos de IA de 200 MW, 197,8 M SAR con IVA', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-09', url: MSG(8134651) },
  { id: 6, titulo: 'Board approval of an investment plan for up to SAR 150 Million to expand its EdaratCloud Stack (GPU)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-09', url: MSG(8135076) },
  { id: 7, titulo: 'Purchasing of Cloud infrastructure and GPU computing equipment for SAR 127,539,553 (Aklaniat; crédito del proveedor y bancos; amortización en cinco años)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-16', url: MSG(8137508) },
  { id: 8, titulo: 'Letter of Award from Etihad Etisalat (Mobily): colocation, 18,05 M SAR al año', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-11-13', url: MSG(7835173) },
  { id: 9, titulo: 'Data Center Colocation Services Agreement with SenseTime KSA (16,49 M SAR en tres años)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-10-22', url: MSG(7821600) },
  { id: 10, titulo: 'Contract with Edge Network Services Limited for data center colocation services (más del 25 % de las ventas de 2025 en cinco años)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-04-01', url: MSG(7933333) },
  { id: 11, titulo: 'Contract Sign Off with Rackspace Arabia (servicios VMware, 28,27 M SAR en 42 meses desde el 2T27)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-28', url: MSG(8145058) },
  { id: 12, titulo: 'Yahoo Finance (quoteSummary): ventas y márgenes de los últimos doce meses de Al Moammar (7200), Solutions by stc (7202), Elm (7203), 2P (7204), Equinix, Digital Realty, WSP y Jacobs (19-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7200.SR' },
  { id: 13, titulo: 'Framework Contract with Saudi Energy (SE) y contratos con Center3 (stc), NEOM, Tadawul, BSF y Ma’aden (anuncios de 2024-2026)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-05-11', url: MSG(7961603) },
  { id: 14, titulo: 'Purchase Order from Al Moammar Information Systems (incorporación a colocation, 19,84 M SAR)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-07-29', url: MSG(8107770) },
];
const comp = (s, nombre, pais, fx) => { const c = comps[s]; return { nombre, pais, ticker: s, ingresos: Math.round(c.rev * fx / 1e6), cuota_pct: null, margen_ebit_pct: c.opM != null ? r1(c.opM * 100) : null }; };
const CAD = 3.75 * 1.1225 / 1.5798; // SAR por CAD con los cambios del BCE del 19-oct-2026 (SAR anclado a 3,75 por USD)
const B = {
  _estado: 'completo',
  historia: {
    resumen: null,
    hitos: [
      { anio: '2008', hito: 'Se constituye en Riad (registro mercantil del 23-ago-2008) por tres socios libaneses, Adel Rizk, Erick Baduy y Ghassan Al-Khazen, como ingeniería de centros de datos [4, 3].' },
      { anio: '2015', hito: 'Abre una sucursal en Dubai Silicon Oasis (Emiratos) [4].' },
      { anio: '2021', hito: 'EdaratCloud, su nube de infraestructura como servicio, ya factura 13 M SAR; antes de salir a bolsa, Al Moammar Information Systems (MIS) tiene el 40 % del capital y cada fundador el 13,33 % [3].' },
      { anio: '2022', hito: 'Salida directa al mercado paralelo Nomu el 26-dic-2022 con el 20 % del capital (126.000 acciones) [4].' },
      { anio: '2024', hito: 'MIS vende el 10 % en operación privada por 61,49 M SAR para dar flotante; el consejo aprueba pasar al mercado principal [A].' },
      { anio: '2025', hito: 'Ventas de 192 M SAR (+84 %) con proyectos de MIS; entra en colocation y computación en el borde (Mobily, SenseTime, Ma’aden) [8, 9].' },
      { anio: '2026', hito: 'Contrato de MIS para un centro de datos de IA de 200 MW (197,8 M SAR) y plan de 150 M SAR en GPU; consejo nuevo con mayoría independiente [5, 6].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: null,
    tamano: '≈ 7.900 M SAR (2.110 M USD) en centros de datos en 2025 según Mordor Intelligence, con un 13,07 % anual hasta 2030 [1]; la colocation sola, 315 M USD en 2024 y 1.800 M en 2030 según Arizton (+33,7 % anual) [2]',
    unidad_serie: 'millones de SAR (centros de datos de Arabia Saudí, Mordor Intelligence; 1 USD = 3,75 SAR)',
    serie: [
      { anio: '2025', tamano: 7913 }, { anio: '2026e', tamano: 8947 }, { anio: '2027e', tamano: 10117 }, { anio: '2028e', tamano: 11439 }, { anio: '2029e', tamano: 12935 }, { anio: '2030e', tamano: 14625 },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 13.1, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión en IA y centros de datos de hiperescala (Visión 2030, Humain, PIF)', efecto: '+', horizonte: 'Estructural', evidencia: 'MIS encarga a Edarat el diseño y la supervisión de un centro de IA de 200 MW; Arizton prevé ≈ 1.290 MW de colocation en 2030 [5, 2].' },
      { driver: 'Soberanía de datos (los datos públicos y regulados deben quedarse en el país)', efecto: '+', horizonte: 'Estructural', evidencia: 'La nube soberana local gana a la extranjera en organismos y bancos: contratos con NEOM, Tadawul, BSF y Saudi Energy [13].' },
      { driver: 'Entrada de los hiperescaladores (Google, Microsoft, Oracle, AWS) con regiones propias', efecto: '−', horizonte: 'Estructural', evidencia: 'Compiten con EdaratCloud en precio y servicios; Edarat se apoya en el VMware de Rackspace y en GPU propias [11, 6].' },
      { driver: 'Gasto público y del PIF', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los proyectos de centros de datos dependen de presupuestos públicos y de grupos del PIF; un recorte frena la ingeniería [5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'En ingeniería compite con consultoras globales (Jacobs, WSP, Arup) y con los integradores locales; en nube, con stc (Center3), Mobily, Oracle, Google y Microsoft [12].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'MIS, accionista del 30 %, compró el 55 % de las ventas del 1S26 y debe 56,5 M; los demás son grandes grupos y organismos [A].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'GPU (Nvidia vía distribuidores), licencias de VMware y espacio de colocation de terceros: el margen bruto de la nube cayó al 7,6 % en el 1S26 [4, 7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Hace falta historial de proyectos y homologaciones; pero cualquier gran ingeniería puede entrar en un mercado que crece al 13 % [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La nube pública de los hiperescaladores sustituye a la nube local salvo en datos regulados [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: null },
    regulacion: null, tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.4,
    posicion: 'Pequeña ingeniería especializada en centros de datos y nube local: ≈ 2,4 % del mercado de centros de datos de Mordor en 2025 (192 M SAR sobre ≈ 7.900 M) [1]',
    competidores: [
      comp('7200.SR', 'Al Moammar Information Systems (MIS)', 'Arabia Saudí', 1),
      comp('7202.SR', 'Solutions by stc', 'Arabia Saudí', 1),
      comp('7204.SR', 'Perfect Presentation (2P)', 'Arabia Saudí', 1),
      comp('EQIX', 'Equinix', 'EE. UU.', 3.75),
      comp('WSP.TO', 'WSP Global', 'Canadá', CAD),
      comp('J', 'Jacobs Solutions', 'EE. UU.', 3.75),
    ],
    foso: {
      veredicto: 'Sin foso', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Sin red: proyectos y contratos de capacidad uno a uno [A].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'La nube y la colocation contratadas a 3-5 años (SenseTime, Edge Network) cuestan de migrar; la ingeniería se adjudica proyecto a proyecto [9, 10].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Historial de 18 años en centros de datos saudíes y certificaciones; ninguna licencia exclusiva [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Margen bruto de la nube del 7,6 % en el 1S26: sin escala frente a stc, Mobily o los hiperescaladores [4].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado grande y en crecimiento con muchos actores [1].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: { calificaciones: null, materialidad: null, controversias: null, confianza: 'Baja' },
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null, confianza: 'Media' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y tcac_historico_pct', tipo: 'Complemento', intentos: '1) Mordor (vía W.Media) y Arizton: solo tamaño y previsión, sin cuotas; 2) informes de la CST: sin cuotas de ingeniería de centros de datos; 3) cálculo con los ingresos de stc (Center3), Mobily y MIS: mezcla telecomunicaciones, integración y colocation', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2022: sin calificaciones; 2) MSCI y Sustainalytics: sin ficha para 9557; 3) prensa saudí: sin dato', decision: 'Omitido' },
  ],
};
// La cita [A] de los hitos remite al anuncio de MIS; se cambia por la fuente propia de B.
B.historia.hitos[4].hito = 'MIS vende el 10 % en operación privada por 61,49 M SAR «para cumplir los requisitos de liquidez del paso al mercado principal», que el consejo aprueba el 17-abr-2024 [15, 16].';
fB.push(
  { id: 15, titulo: 'Letter from one of the company’s major shareholders (MIS vende el 10 % por 61.490.835 SAR en operación privada)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2024-03-31', url: MSG(7309362) },
  { id: 16, titulo: 'Board resolution to transfer from the Parallel Market (Nomu) to the Main Market; actualización: Al Rajhi Capital, nuevo asesor (23-abr-2026)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-04-23', url: MSG(7947435) },
);
B.sector.porter[1].justificacion = 'MIS, accionista del 30 %, compró el 55 % de las ventas del 1S26 y debe 56,5 M; los demás son grandes grupos y organismos [4, 5].';
B.competencia.foso.fuentes[0].evidencia = 'Sin red: proyectos y contratos de capacidad uno a uno [4].';

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Results of the Extraordinary General Assembly (17-sep-2026): consejo nuevo de cinco miembros (tres independientes) y recompra de hasta 15.000 acciones (97,2 % a favor)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-20', url: MSG(8138623) },
  { id: 2, titulo: 'Appointment of the Chairman and Vice Chairman of the Board (Salam Al-Khunaizi y Musaed Al-Sudairi) and the Board Secretary', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-29', url: MSG(8146076) },
  { id: 3, titulo: 'Informe anual de 2022 del consejo (árabe): accionistas (MIS 40 %, tres fundadores 13,33 % cada uno), directivos y consejo', editor: 'Edarat (adjunto)', tipo: 'Primaria', fecha: '2023-04-13', url: `${ADJ}3506254/14617_3884_2023_04_13_11_30_01_en_20230413164826.pdf` },
  { id: 4, titulo: 'Related Parties Transactions 2025 (MIS, Excellence Medical Systems, Edarat Lebanon: participaciones de Baduy y Rizk)', editor: 'Edarat (adjunto)', tipo: 'Primaria', fecha: '2026-03-31', url: `${ADJ}4135614/945_14617_3884_2026-06-18_04-54-44_en.pdf` },
  { id: 5, titulo: 'Interim condensed financial statements 1S26, nota 7 (vinculadas; remuneración de consejeros y directivos) y firmantes (consejero delegado Erick Baduy; director financiero Ghassan Abou Ammar)', editor: 'Edarat (vía Argaam)', tipo: 'Primaria', fecha: '2026-07-29', url: FS1S26 },
  { id: 6, titulo: 'Letter from one of the company’s major shareholders (MIS vende el 10 %)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2024-03-31', url: MSG(7309362) },
  { id: 7, titulo: 'Audit Committee Report 2025 y ampliación del mandato de la comisión de auditoría (presidente Fahad Al-Humaidi)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-08-18', url: MSG(8119826) },
  { id: 8, titulo: 'Yahoo Finance, 9557.SR: participación de internos (47,5 %)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/9557.SR/holders' },
];
const cons = (nombre, cargo, tipo, comisiones) => ({ nombre, cargo, tipo, desde: '2026-09-17', comisiones });
const Cn = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Erick Ernest Baduy (Al-Baduy)', cargo: 'Consejero delegado y consejero ejecutivo', desde: '2008', participacion_pct: 13.33, trayectoria: 'Cofundador en 2008; dirige la empresa desde entonces y firma las cuentas. Tenía el 13,33 % a fin de 2022 (último dato publicado) y el 16,66 % de Edarat Lebanon, vinculada [3, 4].' },
      { nombre: 'Adel Fouad Rizk', cargo: 'Consejero ejecutivo (vicepresidente hasta sep-2026)', desde: '2008', participacion_pct: 13.33, trayectoria: 'Cofundador; 13,33 % a fin de 2022 y 16,66 % de Edarat Lebanon [3, 4].' },
      { nombre: 'Ghassan Abou Ammar', cargo: 'Director financiero', desde: '2008', participacion_pct: null, trayectoria: 'Director financiero y administrativo desde 2008 [3, 5].' },
      { nombre: 'Salam bin Zaki Al-Khunaizi', cargo: 'Presidente (independiente)', desde: '2026-09-28', participacion_pct: null, trayectoria: 'Elegido en la junta del 17-sep-2026 y nombrado presidente el 28-sep; sustituye a Abdullah Al-Ghamdi, que tenía un interés indirecto en MIS [1, 2, 4].' },
    ],
    historial_guidance: [],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Salam bin Zaki Al-Khunaizi', 'Presidente', 'Independiente', null),
      cons('Musaed bin Fahad Al-Sudairi', 'Vicepresidente', 'Independiente', null),
      cons('Mohammed bin Abdullah Al-Sabeq', 'Consejero', 'Independiente', null),
      cons('Erick Ernest Baduy', 'Consejero delegado', 'Ejecutivo', null),
      cons('Adel Fouad Rizk', 'Consejero', 'Ejecutivo', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Al Moammar Information Systems (MIS, 7200.SR)', pct: 30.0, tipo: 'Corporativo (cliente y vinculada)', variacion: 'Vendió el 10 % en 2024 (del 40 % al 30 %) por 61,49 M SAR' },
      { nombre: 'Erick Ernest Baduy (cofundador, consejero delegado)', pct: 13.33, tipo: 'Fundador', variacion: 'Dato de fin de 2022; sin publicación posterior' },
      { nombre: 'Adel Fouad Rizk (cofundador)', pct: 13.33, tipo: 'Fundador', variacion: 'Dato de fin de 2022' },
      { nombre: 'Ghassan Adel Al-Khazen (cofundador)', pct: 13.33, tipo: 'Fundador', variacion: 'Dato de fin de 2022' },
    ],
    insiders: [],
    control_y_defensas: null,
    alertas: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Núcleo', intentos: '1) Intermedios del 1S26, nota 7.5: solo el total de directivos clave (1,53 M SAR en salarios); 2) informe del comité de auditoría 2025: sin remuneraciones; 3) informe anual del consejo de 2023-2025: no publicado en Euroland ni accesible en Saudi Exchange (403)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'accionistas actuales de los fundadores', tipo: 'Complemento', intentos: '1) Informe anual 2022: 13,33 % cada uno; 2) Saudi Exchange, accionistas principales: 403; 3) Argaam: perfil sin desglose abierto', decision: 'Se da el dato de fin de 2022' },
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Anuncios de resultados 2023-2026: sin guía; 2) llamadas con inversores (2025): sin transcripción publicada; 3) prensa: sin guía', decision: 'Omitido: Edarat no da guía' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 9557.SR, KSA (iShares MSCI Saudi Arabia) e IGV: precio, rango, rentabilidades, beta, volatilidad, volumen y cierres de ejercicio (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/9557.SR' },
  { id: 2, titulo: 'Argaam, Edarat (Nomu): cierre del 19-oct-2026 a 275,40 SAR (−3,37 %), 1.136 acciones negociadas', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.argaam.com/en/company/companyoverview/marketid/14/companyid/5225' },
  { id: 3, titulo: 'Yahoo Finance (quoteSummary): capitalización, valor empresa, múltiplos y estimaciones de Edarat y sus comparables, 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/9557.SR/key-statistics' },
  { id: 4, titulo: 'FRED, DGS10: bono del Tesoro de EE. UU. a 10 años (5,10 % el 15-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Interim condensed financial statements 1S26: balance a 30-jun-2026 (préstamo, arrendamientos, caja, indemnizaciones por cese, asociada)', editor: 'Edarat (vía Argaam)', tipo: 'Primaria', fecha: '2026-07-29', url: FS1S26 },
  { id: 8, titulo: 'movimiento.mjs sobre 9557.SR (Yahoo): variación a 1-12 meses, media de 200 sesiones, mayores movimientos', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/9557.SR/history' },
  { id: 9, titulo: 'Edarat scales 52-week high (3-feb-2026)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-02-03', url: 'https://www.argaam.com/en/article/articledetail/id/1877335' },
  { id: 10, titulo: 'Award letter from MIS: centro de datos de IA de 200 MW (197,8 M SAR con IVA)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-09', url: MSG(8134651) },
  { id: 11, titulo: 'Plan de inversión de hasta 150 M SAR en EdaratCloud (GPU) y pedido de 127,5 M a Aklaniat', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-16', url: MSG(8137508) },
  { id: 12, titulo: 'Award letter from MIS (8-mar-2026; 72,45 M SAR)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-03-08', url: MSG(7913335) },
  { id: 13, titulo: 'Interim Financial Results 1S26 (ventas +22 %, beneficio +30 %)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-07-29', url: MSG(8107393) },
  { id: 14, titulo: 'Annual Financial results 2025 (ventas +84 %, beneficio +47 %)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-02-09', url: MSG(7896365) },
  { id: 15, titulo: 'Capital increase: aprobación de la CMA (10-may-2026) y de la junta (14-jun-2026), de 50,4 M a 75,6 M SAR con acciones gratuitas', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-06-15', url: MSG(8072955) },
  { id: 16, titulo: 'Paso del mercado paralelo al principal: Al Rajhi Capital, nuevo asesor financiero', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-04-23', url: MSG(7947435) },
  { id: 17, titulo: 'Letter from one of the company’s major shareholders (MIS vende el 10 % por 61,49 M SAR en operación privada)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2024-03-31', url: MSG(7309362) },
  { id: 18, titulo: 'Contract Sign Off with Rackspace Arabia (28,27 M SAR en 42 meses)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-28', url: MSG(8145058) },
  { id: 19, titulo: 'Purchase Order from MIS (incorporación a colocation, 19,84 M SAR)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-07-29', url: MSG(8107770) },
  { id: 20, titulo: 'Contract with Edge Network Services (colocation, cinco años)', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-04-01', url: MSG(7933333) },
  { id: 21, titulo: 'Results of the Extraordinary General Assembly (17-sep-2026): consejo nuevo y recompra de hasta 15.000 acciones', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2026-09-20', url: MSG(8138623) },
  { id: 22, titulo: 'Letter of Award from Etihad Etisalat (Mobily), colocation de 18,05 M SAR al año', editor: 'Edarat (Tadawul)', tipo: 'Primaria', fecha: '2025-11-13', url: MSG(7835173) },
];
const id = bolsa.identificacion;
const cmp = (s, nombre, pais, fx, w, o = {}) => {
  const c = comps[s]; const e = Object.fromEntries((c.et || []).map((t) => [t.p, t]));
  const ok = e['0y']?.eps != null && e['+1y']?.eps != null;
  const eps = ok ? (1 - w) * e['0y'].eps + w * e['+1y'].eps : null;
  const rev = e['0y']?.rev && e['+1y']?.rev ? (1 - w) * e['0y'].rev + w * e['+1y'].rev : null;
  const g = rev && (c.fcur === c.cur) ? rev / c.rev - 1 : null;
  const mc = c.mcap * fx / 1e6;
  return { nombre, ticker: s, pais, capitalizacion: Math.round(mc), ev_ventas: r2(c.evRev), ev_ebitda_ltm: c.evEbitda > 0 ? r1(c.evEbitda) : null, ev_ebitda_ntm: g != null && c.evEbitda > 0 ? r1(c.evEbitda / (1 + g)) : null, per_ntm: eps > 0 ? r1(c.price / eps) : null, crecimiento_pct: g != null ? r1(g * 100) : null, margen_ebitda_pct: c.ebitdaM != null ? r1(c.ebitdaM * 100) : null, roic_pct: null, dn_ebitda: c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : (c.ebitdaM ? r2((c.debt - c.cash) / (c.ebitdaM * c.rev)) : null), fcf_yield_pct: c.fcf ? r1(c.fcf / c.mcap * 100) : null, ...(o.extra ?? {}) };
};
// Cierres de ejercicio ajustados por las acciones gratuitas [1] y EV con la caja neta de cada cierre [A]: EV/EBITDA del año siguiente.
const evn = { '2022': 20.03 * ACC - 2.92, '2023': 62.83 * ACC - 6.26, '2024': 229.27 * ACC - 8.91, '2025': 159.6 * ACC - 22.53 };
const ebitdaSig = { '2022': 22.75, '2023': 31.24, '2024': 45.63, '2025': 57.7 };
const bpaSig = { '2022': 2.30, '2023': 3.27, '2024': 4.82, '2025': 5.62 };
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Edarat Communication and Information Technology Co.', nombre_corto: 'Edarat', ticker: '9557.SR', isin: null, mercado: 'Saudi Exchange (Tadawul), mercado paralelo Nomu', indice_referencia: 'Nomu Parallel Market Index (MSCI Saudi Arabia, ETF KSA, como aproximación)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Tecnología de la información', industria: 'Ingeniería de centros de datos y nube', sede: 'Riad', fundacion: '2008', empleados: null, web: 'https://edaratgroup.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 7.55, capitalizacion_publicada: Math.round(comps['9557.SR'].mcap / 1e6), free_float_pct: 52.5,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.acciones_dia.toLocaleString('es-ES')} acciones y ≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SAR/día (3 meses)`, proximos_resultados: '2027-02-09',
  },
  consenso: {
    guidance: null,
    estimaciones: [],
    recomendaciones: { n_analistas: 0, comprar: null, mantener: null, vender: null, po_medio: null, po_min: null, po_max: null },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: null, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      ...bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: r1(evn[c.anio] / ebitdaSig[c.anio]), per_ntm: r1(c.precio_cierre / bpaSig[c.anio]), excluir: c.anio === '2022' })),
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      cmp('7203.SR', 'Elm', 'SA', 1, 0.8),
      cmp('7202.SR', 'Solutions by stc', 'SA', 1, 0.8),
      cmp('7204.SR', 'Perfect Presentation (2P)', 'SA', 1, 0.8),
      cmp('EQIX', 'Equinix', 'US', 3.75, 0.8),
      cmp('DLR', 'Digital Realty', 'US', 3.75, 0.8),
      cmp('WSP.TO', 'WSP Global', 'CA', CAD, 0.8, { extra: { crecimiento_pct: null, ev_ebitda_ntm: null } }), // Yahoo estima ingresos netos (sin subcontratas): el crecimiento frente a los brutos no es comparable
      cmp('J', 'Jacobs Solutions', 'US', 3.75, 0.95),
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-03', objetivo: 'Edarat (10 %, venta de MIS en operación privada)', comprador: 'Inversores no identificados', ev: r1(614.91 - 6.26), ev_ventas: r2((614.91 - 6.26) / 80.24), ev_ebitda: r1((614.91 - 6.26) / 22.75), prima_pct: null, excluir: false, comentario: '61,49 M SAR por el 10 % = 614,9 M por el 100 % (≈ 81,3 SAR por acción de hoy); caja neta de fin de 2023 de 6,3 M; múltiplos sobre 2023. No es una compra de control.' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones, recomendaciones y objetivos', tipo: 'Complemento', intentos: '1) Yahoo: sin analistas para 9557.SR; 2) MarketScreener: ficha sin estimaciones; 3) Argaam: sin cobertura de casas de análisis para valores de Nomu', decision: 'Omitido: sin cobertura de analistas' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Tadawul: no publica posiciones cortas de Nomu; 2) Yahoo: sin dato; 3) Argaam: sin dato', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'isin y empleados', tipo: 'Complemento', intentos: '1) Saudi Exchange: 403; 2) Euroland y Argaam: sin ISIN en la ficha abierta; 3) cuentas del 1S26: sin plantilla', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Hawamer (foro saudí de referencia): 403; 2) Stocktwits: el símbolo no existe (404); 3) Reddit: 403 y sin hilos sobre Edarat', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', Cn); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas en', dir);
