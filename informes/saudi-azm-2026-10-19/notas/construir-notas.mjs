// Notas A-E de Saudi Azm for Communication and Information Technology Co. (Tadawul 7211; corte 2026-10-19).
// Arabia Saudí sin XBRL. Ejercicio cerrado a 30 de JUNIO (no a 31-dic como decía el encargo): FY2026 = jul-2025 a jun-2026.
// Fuente primaria: cuentas anuales auditadas FY2022-FY2025 y estados intermedios de 1T, 2T y 3T de FY2026 (árabe), bajados de la
// web de inversores (azm.com, API JSON:API de Drupal; ficheros en el almacén público de la empresa). Las cuentas auditadas de FY2026
// (cerrado el 30-jun-2026) aún no están en la web: la cuenta anual de FY2026 sale del anuncio de resultados a Tadawul (2-ago-2026,
// reproducido por Argaam y Mubasher) y de Yahoo; el balance y los flujos de FY2026, de Stock Analysis (S&P Global), SECUNDARIA.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/saudi-azm-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const MAN = JSON.parse(fs.readFileSync(path.join(dir, 'docs', '_manifest.json'), 'utf8'));
const U = (k) => MAN[k].url_final || MAN[k].url;
const comps = Object.fromEntries(Y.comps.map((c) => [c.s, c]));
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const ART = (id) => `https://www.argaam.com/en/article/articledetail/id/${id}`;
const MUB = (id, slug) => `https://english.mubasher.info/news/${id}/${slug}/`;
const MUBLISTA = 'https://english.mubasher.info/markets/TDWL/stocks/7211/news';
const SA = 'https://stockanalysis.com/quote/tadawul/7211/financials/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated financial statements for the year ended 30 June 2025 (auditadas, PKF Al-Bassam; árabe): balance, cuenta, flujos, ingresos por línea y por tipo de cliente, vinculadas, sukuk, fondos, arrendamientos, zakat', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2025-09', url: U('fs-fy2025') },
  { id: 2, titulo: 'Consolidated financial statements for the year ended 30 June 2024 (auditadas; árabe), con FY2023 reexpresado', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2024-09', url: U('fs-fy2024') },
  { id: 3, titulo: 'Consolidated financial statements for the year ended 30 June 2023 (auditadas; árabe)', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2023-09', url: U('fs-fy2023') },
  { id: 4, titulo: 'Consolidated financial statements for the year ended 30 June 2022 (auditadas; árabe), con FY2021 comparativo', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2022-09', url: U('fs-fy2022') },
  { id: 5, titulo: 'Condensed consolidated interim financial statements, nueve meses a 31-mar-2026 (3T FY2026; revisión limitada; árabe): ingresos por línea y por tipo de cliente, mayor cliente, vinculadas (AZM FinTech, Azm Digital), activos y pasivos de contrato, intangibles en desarrollo', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2026-05', url: U('fs-3t-fy2026') },
  { id: 6, titulo: 'Condensed consolidated interim financial statements, seis meses a 31-dic-2025 (2T FY2026; árabe)', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2026-02', url: U('fs-2t-fy2026') },
  { id: 7, titulo: 'Condensed consolidated interim financial statements, tres meses a 30-sep-2025 (1T FY2026; árabe)', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2025-11', url: U('fs-1t-fy2026') },
  { id: 8, titulo: 'Saudi Azm records 36% higher profits in FY25/26 (anuncio a Tadawul del 2/3-ago-2026: ventas 307,4 M, beneficio neto 51,0 M, BPA 0,85)', editor: 'Mubasher (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-08-03', url: MUBLISTA },
  { id: 9, titulo: 'Yahoo Finance, fundamentals-timeseries de 7211.SR: cuenta anual FY2023-FY2026 y trimestral (ventas, bruto, operativo, BAI, zakat, neto, amortización, pagos basados en acciones, capex, flujo operativo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7211.SR/financials' },
  { id: 10, titulo: 'Saudi Azm (7211): balance y estado de flujos de FY2026 (30-jun-2026; S&P Global Market Intelligence), actualizado el 6-ago-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: `${SA}balance-sheet/` },
  { id: 11, titulo: 'Informe del consejo de FY2025 (árabe): actividades, filiales, accionistas, consejo y comisiones, remuneraciones, operaciones vinculadas, acciones propias', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2025-09', url: U('ar-2025') },
  { id: 12, titulo: 'Informe del consejo de FY2024 (árabe)', editor: 'Saudi Azm (web de inversores)', tipo: 'Primaria', fecha: '2024-09', url: U('ar-2024') },
];
const A = {
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'cuentas anuales auditadas de FY2026 (30-jun-2026)', tipo: 'Núcleo', intentos: '1) web de inversores de azm.com (API JSON:API: el último documento financiero es el intermedio de 9M a mar-2026); 2) saudiexchange.sa (403 desde el contenedor); 3) Argaam (zona de pago). Se usan el anuncio de resultados a Tadawul (cuenta) y Stock Analysis (balance y flujos, secundaria)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'trimestres', campo: 'EBITDA y margen trimestral', tipo: 'Complemento', intentos: '1) intermedios (cuentas escaneadas, solo las notas en texto); 2) Yahoo (EBITDA con otros ingresos, no comparable); 3) Argaam (de pago)', decision: 'Omitido' },
  ],
  financieros: {
    // Periodos FY = ejercicio que TERMINA el 30 de junio de ese año. EBIT = beneficio operativo publicado (después de los pagos en
    // acciones: 14,0 M en FY2025 y 16,6 M en FY2026). EBITDA = EBIT + amortización total (inmovilizado, derechos de uso e intangibles).
    // gastos_generales = gastos de explotación totales (bruto − EBIT). resultado_financiero = BAI − EBIT (incluye asociadas, rendimiento
    // de fondos y sukuk, otros ingresos y los intereses). Acciones: 60 M tras el desdoblamiento de 2023 (nominal 0,5 SAR); el BPA
    // publicado se calcula sobre las acciones en circulación sin las propias (≈ 58-60 M).
    cuenta: [
      { periodo: 'FY2022', ingresos: 152.56, coste_ventas: 121.75, gastos_generales: 16.36, ebitda: 15.54, amortizaciones: 1.09, ebit: 14.45, resultado_financiero: 6.04, bai: 20.49, impuestos: 1.39, minoritarios: -0.01, beneficio_neto: 19.1, gastos_financieros: 0.69, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.32, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.0 },
      { periodo: 'FY2023', ingresos: 170.83, coste_ventas: 132.36, gastos_generales: 21.14, ebitda: 19.55, amortizaciones: 2.22, ebit: 17.33, resultado_financiero: 8.27, bai: 25.6, impuestos: 1.64, minoritarios: 0.89, beneficio_neto: 23.08, gastos_financieros: 1.16, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.39, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 59.2 },
      { periodo: 'FY2024', ingresos: 217.64, coste_ventas: 159.82, gastos_generales: 30.14, ebitda: 30.26, amortizaciones: 2.58, ebit: 27.68, resultado_financiero: 5.54, bai: 33.22, impuestos: 3.06, minoritarios: 2.21, beneficio_neto: 27.95, gastos_financieros: 1.54, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.47, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 59.0 },
      { periodo: 'FY2025', ingresos: 253.16, coste_ventas: 179.75, gastos_generales: 41.13, ebitda: 36.52, amortizaciones: 4.24, ebit: 32.28, resultado_financiero: 8.7, bai: 40.98, impuestos: 1.76, minoritarios: 1.77, beneficio_neto: 37.45, gastos_financieros: 2.77, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.62, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.4 },
      { periodo: 'FY2026', ingresos: 307.36, coste_ventas: 207.48, gastos_generales: 51.9, ebitda: 52.93, amortizaciones: 4.95, ebit: 47.98, resultado_financiero: 5.26, bai: 53.24, impuestos: 3.25, minoritarios: -1.0, beneficio_neto: 50.99, gastos_financieros: 2.57, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.85, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 60.0 },
    ],
    ltm: null,
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 135,1 M SAR en FY2021 a 307,4 M en FY2026 (ejercicio a 30-jun-2026): +18 % anual, todo orgánico y todo en Arabia Saudí [A4, A8]. El salto de FY2026 (+21 %) vino de las plataformas de terceros (41,6 M en 9M frente a 31,1 M en todo FY2025) y de los servicios a empresas; la tecnología propia bajó (50,2 M en FY2025 y 39,7 M en 9M) [A1, A5]. El 4T de FY2026 (abr-jun) facturó 87,0 M (+36 %) [A9]. El margen EBITDA subió del 10,2 % de FY2022 al 17,2 % de FY2026, aunque desde FY2025 el EBIT lleva cargados 14-17 M al año de pagos en acciones a empleados [A9, A1]. El beneficio neto pasó de 19,1 M a 51,0 M; en FY2023-FY2025 un 20-25 % del BAI venía de fuera del negocio (asociadas, fondos, sukuk y una plusvalía de 5,3 M en FY2023) [A3, A1].',
    ajustes: 'Cifras publicadas, sin ajustes. FY2026: cuenta del anuncio a Tadawul y de Yahoo (las cuentas auditadas no están aún en la web); el desglose de gastos y de otros ingresos de FY2026 no está publicado [A8, A9]. Partidas que se repiten y no se quitan: pagos en acciones (14,0 M en FY2025, 16,6 M en FY2026), pérdidas esperadas de crédito (1,6 M en FY2025) y deterioro de intangibles (1,1 M en FY2025) [A9, A1]. FY2023 incluye 5,3 M de plusvalía por la venta de una asociada en otros ingresos [A3]. FY2021 solo tiene cifras básicas (ventas 135,1 M) y no entra en la serie [A4].',
    confianza: 'Media',
  },
  trimestres: {
    // Etiquetas FISCALES: 1T26 = jul-sep 2025, 2T26 = oct-dic 2025, 3T26 = ene-mar 2026, 4T26 = abr-jun 2026.
    items: [
      { periodo: '3T25', ingresos: 64.47, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 64.06, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.21, vs_consenso: null },
      { periodo: '1T26', ingresos: 69.95, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.24, vs_consenso: null },
      { periodo: '2T26', ingresos: 74.67, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.17, vs_consenso: null },
      { periodo: '3T26', ingresos: 75.78, crecimiento_pct: 17.5, crecimiento_organico_pct: 17.5, ebitda: null, margen_ebitda_pct: null, bpa: 0.19, vs_consenso: null },
      { periodo: '4T26', ingresos: 86.96, crecimiento_pct: 35.7, crecimiento_organico_pct: 35.7, ebitda: null, margen_ebitda_pct: null, bpa: 0.28, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    // FY2022-FY2025: cuentas auditadas [A1-A4]. FY2026: Stock Analysis [A10] (secundaria), contrastado con el intermedio de mar-2026 [A5].
    // clientes = clientes comerciales + activos de contrato (obra hecha pendiente de facturar), juntos porque la fuente de FY2026 no los
    // separa. proveedores = proveedores + gastos devengados (sobre todo subcontratistas, incluidas las vinculadas) + deudas con vinculadas.
    // caja = efectivo + fondos a valor razonable con cambios en resultados + sukuk a coste amortizado. inmovilizado con derechos de uso.
    historico: [
      { periodo: 'FY2022', activo_total: 107.6, activo_corriente: 81.46, pasivo_corriente: 40.06, pasivo_total: 55.78, fondo_comercio: 0, intangibles: 0.47, inmovilizado_material: 16.69, existencias: 0, clientes: 24.64, proveedores: 25.49, activos_contrato: null, pasivos_contrato: 9.91, caja: 44.22, deuda_financiera: 2.01, arrendamientos: 13.12, patrimonio_neto: 51.84, minoritarios: -0.02, reservas: 18.22 },
      { periodo: 'FY2023', activo_total: 158.86, activo_corriente: 109.69, pasivo_corriente: 70.63, pasivo_total: 89.58, fondo_comercio: 0, intangibles: 0.81, inmovilizado_material: 15.42, existencias: 0, clientes: 44.46, proveedores: 28.94, activos_contrato: null, pasivos_contrato: 24.69, caja: 77.62, deuda_financiera: 8.25, arrendamientos: 11.59, patrimonio_neto: 68.42, minoritarios: 0.86, reservas: 39.25 },
      { periodo: 'FY2024', activo_total: 241.67, activo_corriente: 169.39, pasivo_corriente: 124.63, pasivo_total: 150.12, fondo_comercio: 0, intangibles: 2.79, inmovilizado_material: 28.25, existencias: 0, clientes: 117.11, proveedores: 67.38, activos_contrato: null, pasivos_contrato: 33.86, caja: 69.14, deuda_financiera: 11.18, arrendamientos: 24.1, patrimonio_neto: 88.44, minoritarios: 3.1, reservas: 74.1 },
      { periodo: 'FY2025', activo_total: 345.26, activo_corriente: 273.43, pasivo_corriente: 177.51, pasivo_total: 202.61, fondo_comercio: 0, intangibles: 7.8, inmovilizado_material: 30.89, existencias: 0, clientes: 115.25, proveedores: 76.56, activos_contrato: null, pasivos_contrato: 87.64, caja: 157.94, deuda_financiera: 5.03, arrendamientos: 22.6, patrimonio_neto: 140.81, minoritarios: 1.84, reservas: 114.11 },
      { periodo: 'FY2026', activo_total: 383.46, activo_corriente: 285.59, pasivo_corriente: 173.05, pasivo_total: 201.22, fondo_comercio: 0, intangibles: 37.25, inmovilizado_material: 28.13, existencias: 0, clientes: 134.43, proveedores: 90.1, activos_contrato: null, pasivos_contrato: 68.25, caja: 146.8, deuda_financiera: 9.42, arrendamientos: 18.6, patrimonio_neto: 181.37, minoritarios: 0.87, reservas: 168.43 },
    ],
    vencimientos: [],
    liquidez: 'A 30-jun-2026: efectivo 17,9 M, fondos a valor razonable 110,4 M y sukuk ≈ 18,5 M (146,8 M), frente a 9,4 M de préstamos bancarios a corto y largo plazo y 18,6 M de arrendamientos [A10, A5]. Línea de crédito de 60 M SAR con Bank AlJazira (ene-2026, según prensa; no leída). La junta del 5-nov-2026 vota recomprar hasta 3,6 M acciones (≈ 106 M al precio de hoy) con fondos propios, para el plan de acciones de empleados [D12].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Indemnizaciones por cese (ley laboral saudí, sin fondos): 6,45 M a jun-2025 y 8,86 M a jun-2026 (como pensiones en el puente) [A1, A10]. Provisión de zakat de 4,3 M (jun-2025) [A1]. Gastos devengados de 74,7 M a jun-2026, en buena parte trabajo de subcontratistas pendiente de facturar, entre ellos las empresas hermanas AZM FinTech y Azm Digital [A10, A5].',
    comentario: 'Balance de empresa de proyectos con caja neta: 146,8 M de efectivo, fondos y sukuk frente a 28 M de deuda y arrendamientos a jun-2026 [A10]. El punto delicado son los cobros: clientes más activos de contrato (obra hecha sin facturar) pasaron de 24,6 M en FY2022 a 117,1 M en FY2024 (54 % de las ventas) y 134,4 M en FY2026 (44 %), porque el 75 % de las ventas es a la Administración y entidades semipúblicas, que pagan por hitos [A2, A10, A5]. Lo compensan los anticipos de clientes (pasivos de contrato: 87,6 M en FY2025, 68,3 M en FY2026) y lo que se debe a subcontratistas [A1, A10]. Los intangibles saltaron de 7,8 M a 37,3 M en FY2026 por plataformas propias en desarrollo (17,2 M en 9M, aún sin amortizar) [A5, A10].',
    confianza: 'Media',
  },
  flujos: {
    historico: [
      { periodo: 'FY2022', flujo_operativo: 33.29, capex: 7.54, pagos_arrendamientos: 0.8, adquisiciones: 0, desinversiones: 5.84, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: 'FY2023', flujo_operativo: 33.24, capex: 1.43, pagos_arrendamientos: 1.53, adquisiciones: 0, desinversiones: 5.69, dividendos: 0, recompras: 11.13, emision_acciones: 0, intereses_en_financiacion: 0.72 },
      { periodo: 'FY2024', flujo_operativo: 1.57, capex: 2.71, pagos_arrendamientos: 2.14, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 12.01, emision_acciones: 0, intereses_en_financiacion: 1.06 },
      { periodo: 'FY2025', flujo_operativo: 108.94, capex: 12.08, pagos_arrendamientos: 2.38, adquisiciones: 5.81, desinversiones: 0, dividendos: 0, recompras: 0.23, emision_acciones: 0, intereses_en_financiacion: 1.95 },
      { periodo: 'FY2026', flujo_operativo: 41.27, capex: 31.37, pagos_arrendamientos: 3.86, adquisiciones: 0, desinversiones: 0, dividendos: 0, recompras: 29.81, emision_acciones: 0, intereses_en_financiacion: 1.68 },
    ],
    comentario: 'El flujo operativo salta con los cobros públicos: 1,6 M en FY2024 (los activos de contrato subieron 62 M), 108,9 M en FY2025 (anticipos de clientes +54 M) y 41,3 M en FY2026 [A2, A1, A10]. En cinco años suma 218 M frente a 159 M de beneficio: convierte bien, pero año a año es muy irregular [A1-A4, A10]. El capex se disparó en FY2026 (31,4 M, de ellos 29,1 M en intangibles: plataformas propias capitalizadas) [A10, A5]. Nunca ha pagado dividendos: el dinero va a fondos y sukuk (≈ 129 M) y a comprar acciones propias para el plan de empleados (11,1 M en FY2023, 12,0 M en FY2024, 29,8 M en FY2026) [A1, A10]. En FY2025 compró minoritarios de una filial (3,0 M) y entró en una asociada (2,8 M) [A1].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PKF Al-Bassam (Ibrahim Ahmed Al-Bassam & Co.), cuentas de FY2025; FY2024 auditado por otra firma',
    anios_auditor: 1,
    opinion: 'Sin salvedades (FY2022-FY2025); intermedios de FY2026 con revisión limitada sin salvedades',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Servicios a empresas y Administración', descripcion: 'Desarrollo e integración de sistemas, operación y soporte de plataformas digitales para ministerios y grandes entidades', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 116.1, resultado: null }, { periodo: 'FY2025', ingresos: 139.5, resultado: null }, { periodo: '9M FY2026', ingresos: 116.35, resultado: null }] },
      { nombre: 'Tecnología propia', descripcion: 'Plataformas y productos de la casa (licencias, suscripciones, plataformas como Wasl)', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 58.9, resultado: null }, { periodo: 'FY2025', ingresos: 50.2, resultado: null }, { periodo: '9M FY2026', ingresos: 39.73, resultado: null }] },
      { nombre: 'Consultoría', descripcion: 'Consultoría de transformación digital y estrategia tecnológica', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 24.6, resultado: null }, { periodo: 'FY2025', ingresos: 32.3, resultado: null }, { periodo: '9M FY2026', ingresos: 22.71, resultado: null }] },
      { nombre: 'Plataformas de terceros', descripcion: 'Reventa e implantación de software de terceros', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 18.0, resultado: null }, { periodo: 'FY2025', ingresos: 31.1, resultado: null }, { periodo: '9M FY2026', ingresos: 41.62, resultado: null }] },
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas a Administración y semipúblicas', valor_anterior: '137,9 M (63 %, FY2024)', valor_actual: '166,3 M (75,5 %, 9M FY2026)', variacion: '+12 pp', comentario: '190,6 M (75,3 %) en FY2025 [A2, A1, A5]' },
      { kpi: 'Mayor cliente', valor_anterior: '17 % y 10 % (dos clientes, FY2024)', valor_actual: '10,2 % (9M FY2026)', variacion: 'Menos concentrado', comentario: '10,7 % en FY2025 [A2, A1, A5]' },
      { kpi: 'Subcontratación a empresas hermanas (AZM FinTech + Azm Digital)', valor_anterior: '30,9 M (FY2024)', valor_actual: '115,5 M (9M FY2026, ≈ 52 % de las ventas)', variacion: '×3,7', comentario: '116,4 M en FY2025 (46 %) [A1, A5]' },
      { kpi: 'Pagos en acciones a empleados', valor_anterior: '0,65 M (FY2024)', valor_actual: '16,6 M (FY2026)', variacion: '×25', comentario: '5,4 % de las ventas [A9]' },
      { kpi: 'Intangibles (plataformas propias)', valor_anterior: '7,8 M (FY2025)', valor_actual: '37,3 M (FY2026)', variacion: '+29,5 M', comentario: 'Capitalización de desarrollo [A10, A5]' },
    ],
  },
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Saudi Arabia IT Services Market Size, Share & Report 2034 (12.091,5 M USD en 2025; 22.065,7 M en 2034; +6,91 % anual 2026-2034)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: U('imarc-it') },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: ventas, EBITDA, márgenes, crecimiento y múltiplos de solutions by stc, Elm, 2P, MIS, Arab Sea, Edarat, Infosys, Cognizant y EPAM', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7202.SR' },
  { id: 3, titulo: 'Informe del consejo de FY2025: actividades, líneas de negocio, filiales (Azm Development Software en Egipto, Tajribat Azm, Wasl), más de 500 empleados, paso al mercado principal', editor: 'Saudi Azm', tipo: 'Primaria', fecha: '2025-09', url: U('ar-2025') },
  { id: 4, titulo: 'Cuentas FY2025 y 9M FY2026: ingresos por línea, por tipo de cliente y momento de reconocimiento (todo a lo largo del tiempo)', editor: 'Saudi Azm', tipo: 'Primaria', fecha: '2026-05', url: U('fs-3t-fy2026') },
  { id: 5, titulo: 'AZM signs strategic partnership agreement with Elm (5 años, reparto de ingresos de proyectos conjuntos; sin vinculadas)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-09-01', url: U('art-1933168') },
  { id: 6, titulo: 'Saudi Azm awarded project contract with Ministry of Human Resources (plataforma de ayudas sociales; adjudicación 16/19-jul-2026; > 5 % de las ventas de 2025)', editor: 'Mubasher (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-07-20', url: MUB(4643663, 'Saudi-Azm-awarded-project-contract-with-Ministry-of-Human-Resources') },
  { id: 7, titulo: 'Azm: Wasl platform licensed by SAMA for digital brokerage (licencia del 6-ago-2026)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-08-09', url: U('art-1927310') },
];
const ym = (s) => comps[s];
const B = {
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) IMARC (de pago el reparto por empresas); 2) CST (Comisión de Comunicaciones, Espacio y Tecnología: solo tamaño del mercado tecnológico); 3) suma de las cotizadas (solutions by stc y Elm facturan ≈ 23.600 M SAR, la mitad del mercado de servicios informáticos de IMARC, pero con telecomunicaciones y servicios de gobierno que IMARC no cuenta)', decision: 'Omitido' },
  ],
  historia: {
    resumen: 'Saudi Azm nació en Riad el 29-nov-2017 como empresa de servicios y soluciones digitales para la Administración y grandes empresas, de la mano de sus dos fundadores, Majed Al-Osaimi (presidente) y Ali Al-Ballaa (consejero delegado), que conservan ≈ 20 % cada uno [B3, C1]. Creció con contratos de digitalización de ministerios y entidades semipúblicas al calor de la Visión 2030 [B3]. Salió a bolsa en el mercado paralelo Nomu el 1-mar-2022 y pasó al mercado principal (TASI) a mediados de 2025 [B3]. Tiene una filial de desarrollo en Egipto, una participada de experiencia de usuario (Tajribat Azm, 75 %) y Wasl, plataforma de intermediación digital de financiación que obtuvo licencia del banco central en ago-2026 [B3, B7].',
    hitos: [
      { anio: '2017', hito: 'Constitución en Riad (29-nov-2017) [B3]' },
      { anio: '2022', hito: 'Salida a bolsa en Nomu (1-mar-2022) [B3]' },
      { anio: '2023', hito: 'Desdoblamiento de 10 por 1 (60 M acciones de 0,5 SAR) y primeras recompras para el plan de empleados [A3]' },
      { anio: '2025', hito: 'Paso al mercado principal de Tadawul; ventas de 253 M y beneficio de 37 M [B3, A1]' },
      { anio: '2026', hito: 'Ventas de 307 M (+21 %); contrato del Ministerio de Recursos Humanos; licencia de Wasl; alianza con Elm; memorando para comprar AZM FinTech, de los fundadores [A8, B6, B7, B5, C3]' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Saudi Azm hace proyectos informáticos para la Administración saudí y grandes empresas: diseña, desarrolla y opera plataformas digitales (portales de servicios, sistemas de gestión, aplicaciones), da consultoría de transformación digital, implanta software de terceros y vende algunas plataformas propias [B3, B4]. El 75 % de las ventas de 9M FY2026 fue a ministerios y entidades semipúblicas y el 100 % en Arabia Saudí [B4]. Más de 500 empleados, con un centro de desarrollo en Egipto [B3].',
    como_gana_dinero: 'Cobra por proyecto (hitos y avance, todo reconocido a lo largo del tiempo) y por operación y soporte de las plataformas [B4]. El margen bruto es del 32 % (FY2026) y el EBITDA del 17 % [A9]. Una parte grande del trabajo la subcontrata: AZM FinTech y Azm Digital, empresas de los mismos fundadores, facturaron al grupo ≈ 116 M en FY2025 y en 9M FY2026, el 46-52 % de las ventas, y la nota dice que en su mayor parte se compensa con ingresos como actividad de agencia [A1, A5]. El modelo es, por tanto, de integrador que gana el contrato y reparte la ejecución, con poco capital propio en el proyecto [A1].',
    clientes: 'Ministerios, entidades públicas y semipúblicas (75 %) y empresas privadas (25 %) [B4]. El mayor cliente pesó el 10,2 % en 9M FY2026 (en FY2024, dos clientes sumaban el 27 %) [A5, A2]. Los contratos se adjudican por concurso o asignación directa; la cartera supera los 300 M SAR según la dirección (sep-2026), ≈ 1 año de ventas [D9]. Poder de precios limitado: la Administración licita y compara.',
    confianza: 'Media',
  },
  sector: {
    definicion: 'Servicios informáticos en Arabia Saudí (desarrollo, integración, consultoría, operación y externalización), según IMARC. Azm compite en la parte de proyectos digitales para la Administración, que crece con la Visión 2030 [B1].',
    tamano: '12.091,5 M USD (≈ 45.370 M SAR) en 2025, con +6,91 % anual previsto en 2026-2034 [B1]',
    unidad_serie: 'M USD',
    serie: [{ anio: '2025', tamano: 12091.5 }, { anio: '2034e', tamano: 22065.7 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 6.9,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Visión 2030 y digitalización de la Administración', efecto: '+', horizonte: 'Estructural', evidencia: 'El 75 % de las ventas de Azm es público o semipúblico; contrato del Ministerio de Recursos Humanos en jul-2026 [B4, B6]' },
      { driver: 'Gasto público y precio del petróleo', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los cobros públicos mueven el circulante: activos de contrato de 82,7 M en FY2024 [A2]' },
      { driver: 'IA generativa y agentes de programación', efecto: '−', horizonte: 'Estructural', evidencia: 'Abaratan el desarrollo a medida y la consultoría, que son el grueso de lo que vende Azm [B4]' },
      { driver: 'Saudización de la plantilla técnica y localización del gasto', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Favorece a proveedores locales; encarece la plantilla [B3]' },
      { driver: 'Alianzas con grandes estatales (Elm, stc)', efecto: '+', horizonte: 'Estructural', evidencia: 'Alianza de 5 años con Elm con reparto de ingresos (sep-2026) [B5]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cientos de integradores locales y extranjeros; las grandes estatales (solutions by stc, Elm) tienen escala 50-80 veces mayor [B2]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'La Administración licita, paga por hitos y concentra el 75 % de las ventas [B4]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Talento técnico escaso y caro (saudización); subcontratistas vinculados que ejecutan la mitad del trabajo [A1, A5]' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras bajas en desarrollo a medida; más altas en homologaciones y referencias con ministerios [B3]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Plataformas en la nube, software estándar y herramientas de IA que reducen las horas de desarrollo [B1]' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en digitalización pública sigue fuerte (IMARC espera +6,9 % anual) y Azm creció +21 % en FY2026 con un 4T de +36 % [B1, A9]. El riesgo de ciclo es fiscal: con el petróleo bajo, la Administración retrasa pagos y adjudicaciones; en FY2024 el flujo operativo cayó a 1,6 M porque los activos de contrato se triplicaron [A2]. El índice saudí (ETF KSA) cae un 11 % en un año [D1].' },
    regulacion: 'La contratación pública se rige por la ley de compras del Estado (concursos, preferencia local y contenido local). Wasl necesita licencia del banco central (SAMA) para intermediar financiación, obtenida el 6-ago-2026 [B7]. Las normas de protección de datos (PDPL) y de ciberseguridad (NCA) exigen alojar datos en el país, lo que favorece a proveedores locales [B3].',
    tendencias: 'Tres cambios: la IA generativa (agentes que programan y prueban) reduce las horas que se facturan por proyecto; la Administración centraliza en grandes estatales (Elm, solutions by stc) que subcontratan a especialistas como Azm (alianza con Elm de sep-2026); y crecen los modelos de reparto de ingresos y de plataforma en lugar de proyectos a precio cerrado [B5, B1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.68,
    posicion: 'Integrador pequeño: ≈ 0,7 % del mercado saudí de servicios informáticos de IMARC (307 M SAR de 45.370 M) [A8, B1]',
    competidores: [
      { nombre: 'Arabian Internet and Communications Services (solutions by stc)', pais: 'Arabia Saudí', ticker: '7202.SR', ingresos: r1(ym('7202.SR').rev / 1e6), cuota_pct: null, margen_ebit_pct: r1(ym('7202.SR').opM * 100), comentario: 'El mayor integrador saudí, filial de stc [B2]' },
      { nombre: 'Elm', pais: 'Arabia Saudí', ticker: '7203.SR', ingresos: r1(ym('7203.SR').rev / 1e6), cuota_pct: null, margen_ebit_pct: r1(ym('7203.SR').opM * 100), comentario: 'Plataformas de gobierno (PIF); socio de Azm desde sep-2026 [B2, B5]' },
      { nombre: 'Al Moammar Information Systems (MIS)', pais: 'Arabia Saudí', ticker: '7200.SR', ingresos: r1(ym('7200.SR').rev / 1e6), cuota_pct: null, margen_ebit_pct: r1(ym('7200.SR').opM * 100), comentario: 'Integrador de infraestructura [B2]' },
      { nombre: 'Perfect Presentation (2P)', pais: 'Arabia Saudí', ticker: '7204.SR', ingresos: r1(ym('7204.SR').rev / 1e6), cuota_pct: null, margen_ebit_pct: r1(ym('7204.SR').opM * 100), comentario: 'Centros de contacto y soluciones digitales para la Administración [B2]' },
      { nombre: 'Edarat Communication and Information Technology', pais: 'Arabia Saudí', ticker: '9557.SR', ingresos: r1(ym('9557.SR').rev / 1e6), cuota_pct: null, margen_ebit_pct: r1(ym('9557.SR').opM * 100), comentario: 'Pequeña, en Nomu [B2]' },
    ],
    foso: {
      veredicto: 'Sin foso',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'Proyectos a medida sin red [B4]' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Operar y mantener plataformas ya hechas para un ministerio crea cierta continuidad; los contratos se vuelven a licitar [B4]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Referencias con ministerios; licencia de Wasl (SAMA) [B7]' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Centro de desarrollo en Egipto; subcontratación flexible [B3, A1]' },
        { fuente: 'Escala eficiente', puntuacion: 0, evidencia: 'Mercado fragmentado; competidores 50-80 veces mayores [B2]' },
      ],
    },
    amenazas: 'La mayor es tecnológica: la IA generativa abarata el desarrollo a medida y la consultoría, que son ≈ 60 % de las ventas, y la Administración puede pedir más por menos al renovar [B4]. Después, que las grandes estatales (Elm, solutions by stc) se queden los contratos y den a Azm solo la parte subcontratada, con menos margen [B5]. Probabilidad media-alta.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el gobierno: la mitad del trabajo la ejecutan empresas de los dos fundadores (vinculadas), y la empresa planea comprarles una de ellas [A5, C3]. En lo social, saudización de la plantilla técnica [B3].',
    controversias: 'Sin sanciones ni litigios encontrados en los anuncios y la prensa revisados (Argaam, Mubasher).',
    confianza: 'Baja',
  },
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Informe del consejo de FY2025 (árabe): consejo, comisiones, participaciones y operaciones de consejeros y directivos, remuneraciones, contratos con vinculadas', editor: 'Saudi Azm', tipo: 'Primaria', fecha: '2025-09', url: U('ar-2025') },
  { id: 2, titulo: 'Saudi Azm announces new board leadership for 2nd term (22-jun-2026 a 21-jun-2030; presidente Majed Al-Osaimi, vicepresidente Ahmed Al-Haqbani, consejero delegado Ali Al-Ballaa)', editor: 'Mubasher (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-06-30', url: MUB(4634594, 'Saudi-Azm-announces-new-board-leadership-for-2nd-term') },
  { id: 3, titulo: 'Saudi Azm signs MoU to acquire 100% of AZM FinTech (no vinculante, 12 meses; vinculadas: presidente, consejero delegado y Firas Al-Mosli; asesor Alistithmar Capital)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-08-03', url: U('art-1925086') },
  { id: 4, titulo: 'Saudi Azm invites shareholders to vote on share buyback, contracts (junta del 5-nov-2026: recompra de 3,6 M acciones; contratos marco de 5 años con Azm Digital 105,79 M, AZM FinTech 74,67 M, Machine Learning 9,98 M y Real Estate Technologies 1,17 M; consejo a 6 miembros; 0,58 M de remuneración)', editor: 'Mubasher (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-10-15', url: MUB(4685736, 'Saudi-Azm-invites-shareholders-to-vote-on-share-buyback-contracts') },
  { id: 5, titulo: 'Cuentas FY2025 y 9M FY2026: nota de vinculadas (compras a AZM FinTech y Azm Digital, saldos, remuneración de la alta dirección)', editor: 'Saudi Azm', tipo: 'Primaria', fecha: '2026-05', url: U('fs-3t-fy2026') },
  { id: 6, titulo: 'Saudi Azm sees 40% profit rise through June 2027 on PPP projects; backlog tops SAR 300M (titular; texto de pago)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-09-07', url: U('art-1934680') },
];
const C = {
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) informe del consejo de FY2025 (solo los cinco primeros directivos en bloque, 5,21 M; el presidente y el consejero delegado renunciaron a la remuneración de consejeros); 2) nota de vinculadas (alta dirección 6,74 M); 3) prensa', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'votos de la junta (porcentajes)', tipo: 'Complemento', intentos: '1) actas de las juntas 5.ª y 6.ª (web de inversores, sin porcentajes en el texto extraído); 2) Tadawul (403); 3) Argaam', decision: 'Omitido' },
  ],
  directivos: {
    equipo: [
      { nombre: 'Ali Mohammed Al-Ballaa', cargo: 'Consejero delegado y consejero (cofundador)', desde: '2017', participacion_pct: 20.4, trayectoria: 'Cofundador; dirige la empresa desde 2017. Es también director general y accionista de AZM FinTech, subcontratista y objetivo de compra [C1, C3].' },
      { nombre: 'Majed Saad Al-Osaimi', cargo: 'Presidente no ejecutivo (cofundador)', desde: '2017', participacion_pct: 20.4, trayectoria: 'Cofundador y mayor accionista; preside también AZM FinTech [C1, C3].' },
      { nombre: 'Muath Mansour', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Firma las cuentas [C1].' },
      { nombre: 'Haitham Naeem Hannoun', cargo: 'Directivo; miembro de la comisión de nombramientos', desde: null, participacion_pct: 1.5, trayectoria: '928.733 acciones; vendió 179.003 en FY2025 [C1, C2].' },
    ],
    historial_guidance: [
      { anio: 'FY2027', guia: 'Beneficio +40 % hasta jun-2027 por proyectos de colaboración público-privada; cartera de más de 300 M (sep-2026)', real: 'Pendiente', cumplida: 'Pendiente' },
    ],
    comentario: 'Empresa de fundadores: los dos cofundadores tienen ≈ 41 % del capital y dirigen desde 2017; el crecimiento (ventas ×2,3 desde FY2021) es suyo [C1, A8]. El problema es que también son dueños de los principales subcontratistas, AZM FinTech y Azm Digital, que facturan al grupo la mitad de sus ventas, y ahora la empresa negocia comprar AZM FinTech a un precio aún sin fijar [A5, C3]. No hay historial de guía numérica antes de sep-2026 [C6].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Majed Saad Al-Osaimi', cargo: 'Presidente', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Ahmed Abdulaziz Al-Haqbani', cargo: 'Vicepresidente', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Ali Mohammed Al-Ballaa', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2022', comisiones: null },
      { nombre: 'Omar Al-Juraisy', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos (hasta jun-2026)' },
      { nombre: 'Omar Al-Sunaidi', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: null, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La alta dirección cobró 6,74 M SAR en FY2025 (los cinco primeros directivos, 5,21 M); el presidente y el consejero delegado renunciaron a la remuneración de consejeros, y la junta del 5-nov-2026 vota 0,58 M para todo el consejo y comisiones por FY2026 [C1, C4]. El plan de acciones para empleados costó 16,6 M en FY2026 (5,4 % de las ventas) y se alimenta con recompras [C4].',
    accionistas: [
      { nombre: 'Majed Saad Al-Osaimi', pct: 20.4, tipo: 'Fundador', variacion: 'Vendió 340.000 acciones en FY2025' },
      { nombre: 'Ali Mohammed Al-Ballaa', pct: 20.4, tipo: 'Fundador / consejero delegado', variacion: 'Vendió 340.000 acciones en FY2025' },
      { nombre: 'Acciones propias (plan de empleados)', pct: 2.92, tipo: 'Autocartera', variacion: 'Hasta 6 % más si la junta aprueba la recompra' },
    ],
    insiders: [
      { fecha: '2025-06-30', persona: 'Majed Al-Osaimi (presidente)', operacion: 'Venta', acciones: 340000, importe: null },
      { fecha: '2025-06-30', persona: 'Ali Al-Ballaa (consejero delegado)', operacion: 'Venta', acciones: 340000, importe: null },
      { fecha: '2025-06-30', persona: 'Haitham Hannoun (directivo)', operacion: 'Venta', acciones: 179003, importe: null },
    ],
    control_y_defensas: 'Los dos fundadores suman ≈ 41 % y actúan juntos en las empresas hermanas (AZM FinTech, Azm Digital) [C1, C3]. Una acción, un voto; límite del 49 % a la propiedad extranjera. El consejo tiene cinco miembros (tres independientes) y la junta del 5-nov-2026 vota ampliarlo a seis [C2, C4].',
    alertas: [
      'Subcontratación a empresas de los fundadores: AZM FinTech y Azm Digital facturaron ≈ 116 M en FY2025 (46 % de las ventas) y 115,5 M en 9M FY2026 (≈ 52 %) [C5].',
      'Compra propuesta de AZM FinTech a los fundadores (memorando de ago-2026), sin precio ni forma de pago [C3].',
      'Nuevos contratos marco de 5 años con vinculadas por 191,6 M a votar el 5-nov-2026 [C4].',
      'Ventas de los dos fundadores (340.000 acciones cada uno) en FY2025 [C1].',
    ],
    confianza: 'Media',
  },
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 7211.SR, KSA e IGV (bolsa.mjs) y movimiento (movimiento.mjs) hasta el 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7211.SR/history' },
  { id: 2, titulo: 'Saudi Azm (AZM): cotización del 19-oct-2026 (29,52 SAR, +2,57 %; 464.984 acciones; 13,85 M SAR; media de 3 meses 5,39 M SAR), capitalización, beta', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.argaam.com/en/company/companyoverview/marketid/3/companyid/4/13995' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary (7211.SR y comparables): múltiplos, márgenes, estimaciones; tipos de cambio (USDSAR 3,7522)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/7211.SR/' },
  { id: 4, titulo: 'FRED, DGS10: bono del Tesoro de EE. UU. a 10 años (5,10 % el 15-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí Aa3: diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: U('damodaran-ctry') },
  { id: 6, titulo: 'Implied ERP by month: prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'GIB Capital previews Q3 2026 earnings (Saudi Azm, 1T FY2027: 17 M, +112,2 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-11', url: U('art-1942966') },
  { id: 8, titulo: 'GIB Capital previews Q2 2026 earnings (Saudi Azm, 4T FY2026: 13 M, +7 %; real 16,2 M)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-07-12', url: U('art-1919771') },
  { id: 9, titulo: 'Saudi Azm sees 40% profit rise through June 2027 on PPP projects; backlog tops SAR 300M (titular; texto de pago)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-09-07', url: U('art-1934680') },
  { id: 10, titulo: 'GIB Capital sets recommendation, TP for Saudi Azm (sobreponderar; objetivo elevado, cifra de pago)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-09-27', url: U('art-1939368') },
  { id: 11, titulo: 'Access the Saudi Exchange with your IBKR account (acceso de clientes minoristas extranjeros vía SNB Capital)', editor: 'Interactive Brokers', tipo: 'Primaria', fecha: '2026-10-19', url: U('ibkr-saudi') },
  { id: 12, titulo: 'Saudi Azm to vote on repurchasing up to 3.6M treasury shares on Nov. 5 (acciones propias 2,92 %; 6 % del capital)', editor: 'Argaam (anuncio a Tadawul)', tipo: 'Prensa', fecha: '2026-10-15', url: U('art-1944283') },
  { id: 13, titulo: 'Saudi Azm: titulares de los anuncios a Tadawul de jun-oct 2026 (consejo, resultados, recompra, memorando, Wasl, Elm, junta)', editor: 'Mubasher', tipo: 'Prensa', fecha: '2026-10-19', url: MUBLISTA },
];
const C1 = (s, fx = 1) => {
  const c = comps[s];
  let per = c.fpe;
  if (per == null) { const e = c.et.find((t) => t.p === '+1y')?.eps; if (e > 0) per = c.price / e; }
  const g0 = c.et.find((t) => t.p === '0y')?.g, g1 = c.et.find((t) => t.p === '+1y')?.g;
  const crec = g0 != null && g1 != null ? r1((0.2 * g0 + 0.8 * g1) * 100) : (c.revG != null ? r1(c.revG * 100) : null);
  return { nombre: c.name, ticker: s, capitalizacion: Math.round(c.mcap / 1e6 * fx), ev_ventas: c.evRev, ev_ebitda_ltm: c.evEbitda > 0 ? c.evEbitda : null, ev_ebitda_ntm: null, per_ntm: per != null ? r1(per) : null, crecimiento_pct: crec, margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: c.ebitda > 0 ? r2((c.debt - c.cash) / c.ebitda) : null, fcf_yield_pct: c.fcf ? r1(c.fcf / c.mcap * 100) : null };
};
const D = {
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) compras de integradores saudíes (memorando de AZM FinTech sin precio; sin múltiplos publicados en el sector local); 2) compras de integradores globales (múltiplos solo en prensa); 3) Argaam M&A (de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Tadawul (préstamo de valores, 403); 2) Argaam; 3) en Tadawul no hay cortos relevantes en valores de este tamaño', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de BPA', tipo: 'Complemento', intentos: '1) Yahoo (sin analistas para 7211.SR); 2) Argaam (estimaciones de pago; GIB solo da trimestres); 3) informe de GIB (de pago)', decision: 'Omitido' },
  ],
  identificacion: {
    nombre: 'Saudi Azm for Communication and Information Technology Company', nombre_corto: 'Saudi Azm', ticker: '7211.SR', isin: 'SA16BGF3GLH0', mercado: 'Saudi Exchange (Tadawul), mercado principal', indice_referencia: 'TASI (medido con el ETF KSA)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Tecnología', industria: 'Servicios informáticos y transformación digital', sede: 'Riad', fundacion: '2017', empleados: 500, web: 'https://azm.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 60.0, capitalizacion_publicada: 1771.2, free_float_pct: null,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: '≈ 5,4 M SAR/día (≈ 200.000 acciones; 3 meses) ≈ 1,4 M USD', proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'La dirección espera que el beneficio suba ≈ 40 % hasta jun-2027 (FY2027) por proyectos de colaboración público-privada, con una cartera de más de 300 M SAR (conferencia de resultados de sep-2026) [D9]. No da cifras de ventas ni de margen.',
    estimaciones: [],
    recomendaciones: { n_analistas: 1, comprar: 1, mantener: 0, vender: 0, po_medio: null, po_min: null, po_max: null },
    revisiones: 'Solo una casa publica: GIB Capital, sobreponderar desde mar-2026 y objetivo elevado el 27-sep-2026 (cifra de pago) [D10]. Para el 1T FY2027 (jul-sep 2026) espera 17 M de beneficio, +112 % según su tabla; la base que implica (≈ 8 M) no cuadra con los 14,1 M del 1T FY2026 que da Yahoo, así que su cifra de comparación es dudosa [D7, D3]. En el 4T FY2026 esperaba 13 M y la empresa ganó 16,2 M [D8].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, confianza: 'Media' },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      C1('7202.SR'), C1('7203.SR'), C1('7204.SR'), C1('7200.SR'), C1('9557.SR'),
      C1('INFY', Y.fx['USDSAR=X']), C1('CTSH', Y.fx['USDSAR=X']), C1('EPAM', Y.fx['USDSAR=X']),
    ],
    confianza: 'Media',
  },
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Hawamer y Mubasher (foros: 403 o sin hilo útil); 2) Argaam (comentarios de los anuncios vacíos: «Be the first to comment»; análisis de comentarios 0 %); 3) Reddit, X y Stocktwits (sin debate sobre 7211.SR)', decision: 'Omitido' },
  ],
  sentimiento: null,
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
