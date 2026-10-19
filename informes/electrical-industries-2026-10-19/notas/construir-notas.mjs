// Notas A-E de Electrical Industries Company (EIC, Tadawul 1303, corte 2026-10-19). Arabia Saudí sin XBRL en cuentas.mjs:
// estados consolidados auditados (KPMG 2022-2025, PwC 2021) e informes intermedios descargados de la web de inversores
// (eic.argaam-ir.com → data.argaam.com). Los estados primarios de los PDF son imágenes escaneadas: se leyeron como imagen
// (pdftoppm) y se copiaron a mano; las notas sí tienen texto. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/electrical-industries-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const AR = 'https://data.argaam.com/files/download';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Statements for the year ended 31 December 2025 (auditor KPMG; balance, cuenta, flujos y notas: segmentos, geografía, cliente principal, préstamos, BPA, partes vinculadas, contingencias, dividendos)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03-08', url: `${AR}/6a0a4ee4-c8c9-4f36-8b6a-bb85ffced644.pdf` },
  { id: 2, titulo: 'Consolidated Financial Statements for the year ended 31 December 2024 (KPMG; balance 2024 con anticipos de clientes separados)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2025-03-03', url: `${AR}/4cb0798c-4de0-47ad-aeff-b687969e5b20.pdf` },
  { id: 3, titulo: 'Consolidated Financial Statements for the year ended 31 December 2023 (KPMG; cuenta, balance y flujos de 2023 y 2022, segmentos)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2024-03-11', url: `${AR}/33ddd64e-6202-4982-8f51-9eb4957e4895.pdf` },
  { id: 4, titulo: 'Consolidated Financial Statements for the year ended 31 December 2022 (KPMG; cuenta, balance y flujos de 2022 y 2021, segmentos, accionistas)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2023-03-28', url: `${AR}/cfe6acfd-7774-4100-82b3-53e7e6697e1c.pdf` },
  { id: 5, titulo: 'Consolidated Financial Statements for the year ended 31 December 2021 (PwC)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2022-03', url: `${AR}/c273157f-b285-44c8-a79b-94e262987d0e.pdf` },
  { id: 6, titulo: 'Condensed consolidated interim financial statements, six months ended 30 June 2026 (balance, cuenta trimestral y semestral, flujos; reembolso de la multa de competencia; dividendos)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-07-23', url: `${AR}/e022dcfd-a45f-440e-917f-be13e55ae301.pdf` },
  { id: 7, titulo: 'Condensed consolidated interim financial statements, three months ended 31 March 2026', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-04', url: `${AR}/09ef0d2a-4d02-4ec2-9682-b8cf4e5a53c5.pdf` },
  { id: 8, titulo: 'Condensed consolidated interim financial statements, nine months ended 30 September 2025 (3T25 y 3T24)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2025-10-23', url: `${AR}/1fe39e01-6213-4977-95b3-ac9782f2e194.pdf` },
  { id: 9, titulo: 'Condensed consolidated interim financial statements, six months ended 30 June 2025 (2T25 y 2T24)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2025-07', url: `${AR}/be68b5aa-867c-48d1-becd-58962f0f120e.pdf` },
  { id: 10, titulo: 'Condensed consolidated interim financial statements, nine months ended 30 September 2024 (3T24 y 3T23)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2024-10', url: `${AR}/d86a04f2-ffc2-4b22-adb0-77d42a66e36f.pdf` },
  { id: 11, titulo: 'Board of Directors Annual Report 2025 (ventas por actividad, cartera de pedidos de 3.300 M SAR, acuerdos marco, contratos firmados, dividendos, préstamos por banco, consejo, remuneraciones)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03', url: `${AR}/4f18836e-1580-4d94-9375-daa1b67b2874.pdf` },
  { id: 12, titulo: 'Board of Directors Annual Report 2024 (cartera de pedidos de 3.200 M SAR a fin de 2024; capacidad de transformadores de potencia +70 % en el 2S24)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2025-03', url: `${AR}/175338dd-1d27-4f82-a1d8-ff1ff49ef413.pdf` },
  { id: 13, titulo: 'EIC’s net profits leap 55% in Q2-26 on strong high-voltage project demand', editor: 'Mubasher', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://english.mubasher.info/news/4645617/EIC-s-net-profits-leap-55-in-Q2-26-on-strong-high-voltage-project-demand/' },
  { id: 14, titulo: 'EIC to distribute 25% cash dividends for H1-26 (0,125 SAR por acción; derecho el 4-ago-2026, pago el 23-ago-2026)', editor: 'Decypha (Mubasher)', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://www.decypha.com/en/news/details/EIC-to-distribute-25--cash-dividends-for-H1-26/21563934?L=EN' },
];

const cuenta = [
  { periodo: '2021', ingresos: 770.7, coste_ventas: 621.1, gastos_generales: 80.3, ebitda: 99.0, amortizaciones: 28.7, ebit: 70.3, resultado_financiero: -7.9, bai: 62.3, impuestos: 13.5, minoritarios: 0, beneficio_neto: 48.8, gastos_financieros: 7.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.04, dpa: 0.04, dpa_extraordinario: 0, acciones_diluidas: 1112.5 },
  { periodo: '2022', ingresos: 1066.1, coste_ventas: 828.5, gastos_generales: 100.7, ebitda: 159.4, amortizaciones: 27.8, ebit: 131.6, resultado_financiero: -19.6, bai: 112.0, impuestos: 17.9, minoritarios: 0, beneficio_neto: 94.2, gastos_financieros: 19.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.08, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1112.5 },
  { periodo: '2023', ingresos: 1559.4, coste_ventas: 1158.1, gastos_generales: 125.5, ebitda: 292.2, amortizaciones: 27.6, ebit: 264.5, resultado_financiero: -34.9, bai: 229.6, impuestos: 28.6, minoritarios: 0, beneficio_neto: 201.0, gastos_financieros: 34.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.18, dpa: 0.15, dpa_extraordinario: 0, acciones_diluidas: 1112.5 },
  { periodo: '2024', ingresos: 1987.1, coste_ventas: 1321.8, gastos_generales: 195.4, ebitda: 484.8, amortizaciones: 28.9, ebit: 456.0, resultado_financiero: -33.7, bai: 422.2, impuestos: 20.5, minoritarios: 0, beneficio_neto: 401.7, gastos_financieros: 33.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 26.1, bpa: 0.36, dpa: 0.225, dpa_extraordinario: 0, acciones_diluidas: 1119.9 },
  { periodo: '2025', ingresos: 2296.2, coste_ventas: 1436.0, gastos_generales: 191.0, ebitda: 710.8, amortizaciones: 36.2, ebit: 674.6, resultado_financiero: -10.5, bai: 664.2, impuestos: 34.2, minoritarios: 0, beneficio_neto: 629.9, gastos_financieros: 15.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.56, dpa: 0.5, dpa_extraordinario: 0.25, acciones_diluidas: 1121.8 },
];

const balanceH = [
  { periodo: '2021', activo_total: 1248.0, activo_corriente: 925.1, pasivo_corriente: 535.9, pasivo_total: 660.2, fondo_comercio: 0, intangibles: 6.9, inmovilizado_material: 270.6, existencias: 441.2, clientes: 388.8, proveedores: 124.0, activos_contrato: null, pasivos_contrato: 119.3, caja: 65.6, deuda_financiera: 227.8, arrendamientos: 31.2, patrimonio_neto: 587.8, minoritarios: 0, reservas: 95.0 },
  { periodo: '2022', activo_total: 1673.8, activo_corriente: 1369.8, pasivo_corriente: 929.5, pasivo_total: 1043.0, fondo_comercio: 0, intangibles: 10.1, inmovilizado_material: 253.9, existencias: 718.9, clientes: 464.2, proveedores: 150.4, activos_contrato: null, pasivos_contrato: 153.3, caja: 122.3, deuda_financiera: 431.6, arrendamientos: 25.9, patrimonio_neto: 630.8, minoritarios: 0, reservas: 129.0 },
  { periodo: '2023', activo_total: 1895.9, activo_corriente: 1588.4, pasivo_corriente: 1026.1, pasivo_total: 1151.1, fondo_comercio: 0, intangibles: 10.8, inmovilizado_material: 253.0, existencias: 911.9, clientes: 558.4, proveedores: 164.9, activos_contrato: null, pasivos_contrato: 295.0, caja: 68.3, deuda_financiera: 392.0, arrendamientos: 23.9, patrimonio_neto: 744.8, minoritarios: 0, reservas: 129.2 },
  { periodo: '2024', activo_total: 1951.0, activo_corriente: 1625.7, pasivo_corriente: 867.2, pasivo_total: 1004.9, fondo_comercio: 0, intangibles: 7.7, inmovilizado_material: 273.2, existencias: 756.6, clientes: 619.0, proveedores: 142.2, activos_contrato: null, pasivos_contrato: 474.1, caja: 188.9, deuda_financiera: 66.4, arrendamientos: 24.8, patrimonio_neto: 946.1, minoritarios: 0, reservas: 394.5 },
  { periodo: '2025', activo_total: 2595.4, activo_corriente: 2115.9, pasivo_corriente: 1136.9, pasivo_total: 1297.4, fondo_comercio: 0, intangibles: 6.1, inmovilizado_material: 434.6, existencias: 873.4, clientes: 835.2, proveedores: 196.9, activos_contrato: 9.6, pasivos_contrato: 662.3, caja: 350.4, deuda_financiera: 15.1, arrendamientos: 17.0, patrimonio_neto: 1298.0, minoritarios: 0, reservas: 737.8 },
];

const flujosH = [
  { periodo: '2021', flujo_operativo: 12.1, capex: 25.0, pagos_arrendamientos: 2.1, adquisiciones: 0.1, desinversiones: 0, dividendos: 22.3, recompras: 0.2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: -87.6, capex: 10.6, pagos_arrendamientos: 4.0, adquisiciones: 0, desinversiones: 0.1, dividendos: 45.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 107.1, capex: 23.1, pagos_arrendamientos: 3.6, adquisiciones: 6.3, desinversiones: 0, dividendos: 84.4, recompras: 3.1, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 688.2, capex: 44.8, pagos_arrendamientos: 4.2, adquisiciones: 0, desinversiones: 1.7, dividendos: 196.6, recompras: 1.8, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 673.5, capex: 175.5, pagos_arrendamientos: 4.7, adquisiciones: 0, desinversiones: 0.1, dividendos: 280.1, recompras: 5.6, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const segHist = (vals, res) => ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: vals[i], resultado: res[i] }));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2628.2, ebitda: 844.9, ebit: 807.3, beneficio_neto: 772.1, bpa: 0.69, dpa: 0.5, dpa_extraordinario: 0.25, fcf: 414.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 505.8, crecimiento_pct: 28.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.11, vs_consenso: null },
      { periodo: '4T24', ingresos: 444.2, crecimiento_pct: 7.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.09, vs_consenso: null },
      { periodo: '1T25', ingresos: 506.7, crecimiento_pct: -6.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.11, vs_consenso: null },
      { periodo: '2T25', ingresos: 531.4, crecimiento_pct: 7.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.12, vs_consenso: null },
      { periodo: '3T25', ingresos: 560.0, crecimiento_pct: 10.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.14, vs_consenso: null },
      { periodo: '4T25', ingresos: 698.2, crecimiento_pct: 57.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.19, vs_consenso: null },
      { periodo: '1T26', ingresos: 661.4, crecimiento_pct: 30.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.17, vs_consenso: null },
      { periodo: '2T26', ingresos: 708.6, crecimiento_pct: 33.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.19, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 15.1 }],
    liquidez: 'Caja de 143,2 M SAR a 30-jun-2026 frente a 122,7 M de murabaha a corto plazo y 19,3 M de arrendamientos [A6]; después del balance entraron 26,1 M del reembolso de la multa de competencia (14-jul-2026) y salieron ≈ 139 M del dividendo del 1S26 (pagado el 23-ago-2026) [A6, A14]. Las murabahas vencen a 3-6 meses y se refinancian con líneas bancarias de diez bancos saudíes y del Golfo [A1, A11].',
    rating: 'Sin rating',
    coste_deuda_pct: 5.5,
    vida_media_anios: 0.3,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: null, confianza: 'Alta' },
  calidad: {
    auditor: 'KPMG Professional Services (desde el ejercicio 2022; PwC hasta 2021)',
    anios_auditor: 4,
    opinion: 'Favorable (2025, sin salvedades; asunto clave: pérdidas esperadas de clientes)',
    comentario: null, senales: null,
    confianza: 'Alta',
  },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2021', objetivo: 'Activos, conocimientos y propiedad intelectual de CG Power Systems Belgium (Pauwels Transformers, Malinas)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fábrica de transformadores de potencia en Bélgica reactivada en abril de 2021; en 2025 Europa ya aporta 174 M SAR de ventas (7,6 %) [A1].' },
      { anio: '2025', objetivo: 'Terrenos y naves de la planta de Pauwels en Bélgica (subasta pública)', importe: 79.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Asegura la base europea; los activos no corrientes en Europa pasan de 16 a 100 M SAR [A1, A11].' },
    ],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Fabricación y suministro', descripcion: 'Transformadores de distribución y de potencia (hasta 380 kV), subestaciones compactas, aparamenta de media y baja tensión, cuadros y bandejas portacables', tipo_resultado: 'EBIT', historico: segHist([702.3, 990.5, 1470.4, 1898.3, 2185.9], [38.8, 102.6, 228.7, 426.1, 629.3]) },
      { nombre: 'Servicios', descripcion: 'Mantenimiento, reparación, pruebas en campo y modernización de equipos eléctricos', tipo_resultado: 'EBIT', historico: segHist([68.4, 75.6, 89.0, 88.8, 110.3], [34.0, 32.2, 43.4, 43.2, 44.8]) },
    ],
    geografias: [
      { nombre: 'Arabia Saudí', peso_pct: 89.5 },
      { nombre: 'Europa', peso_pct: 7.6 },
      { nombre: 'Otros países del Golfo', peso_pct: 2.8 },
      { nombre: 'Asia', peso_pct: 0.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos confirmados', valor_anterior: '≈ 3.200 M SAR (fin 2024)', valor_actual: '≈ 3.300 M SAR (fin 2025)', variacion: '+3 %', comentario: 'Equivale a 1,4 años de ventas de 2025; aparte, 2.500 M de acuerdos marco no convertidos en pedidos, de los que ≈ 1.000 M son compromiso firme [A11, A12].' },
      { kpi: 'Ventas de transformadores y subestaciones', valor_anterior: 'n.d. (2024)', valor_actual: '1.811 M SAR (2025)', variacion: '79 % del total', comentario: 'Aparamenta 280 M (12 %), servicios 110 M (5 %) y bandejas 95 M (4 %) [A11].' },
      { kpi: 'Producción de transformadores de potencia', valor_anterior: '+70 % de capacidad en el 2S24', valor_actual: '> 10.000 MVA (2025)', variacion: '200 % de la capacidad original', comentario: 'Récord de producción en 2025; ampliación a 380 kV (192 M SAR) con producción comercial prevista en el 3T27 [A11, A12].' },
      { kpi: 'Margen bruto', valor_anterior: '33,5 % (2024)', valor_actual: '37,5 % (2025)', variacion: '+4,0 pp', comentario: '37,8 % en el 1S26 y 37,8 % en el 2T26 [A1, A6].' },
      { kpi: 'Primer cliente (Saudi Electricity)', valor_anterior: '288,6 M SAR (2024)', valor_actual: '367,0 M SAR (2025)', variacion: '+27 %', comentario: '16 % de las ventas de 2025; el cliente no se nombra en las cuentas, pero los grandes acuerdos marco de 2025 son con SEC [A1, A11].' },
      { kpi: 'Anticipos de clientes', valor_anterior: '474 M SAR (2024)', valor_actual: '662 M SAR (2025)', variacion: '+40 %', comentario: 'Bajan a 582 M a 30-jun-2026 al entregar pedidos: el circulante absorbió caja en el 1S26 [A1, A6].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Informes intermedios: solo amortización semestral o acumulada en el estado de flujos; 2) informe del consejo: sin desglose trimestral; 3) derivarlo prorrateando la amortización: descartado (la amortización es solo un 1,6 % de las ventas y no cambia la lectura)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ultima_presentacion (transcripciones)', tipo: 'Complemento', intentos: '1) Web de inversores (eic.argaam-ir.com): sin presentaciones ni conferencias de resultados; 2) Argaam y Mubasher: solo notas de resultados y una entrevista al consejero delegado (oct-2025); 3) Tadawul: anuncios de resultados sin conferencia', decision: 'Omitido: se resume el anuncio de resultados y la entrevista' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Board of Directors Annual Report 2025 (actividades, ventajas competitivas, riesgos, estrategia, contratos con SEC)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03', url: `${AR}/4f18836e-1580-4d94-9375-daa1b67b2874.pdf` },
  { id: 2, titulo: 'History (Wescosa 1976, Saudi Transformers, Pauwels, Saudi Power Transformers, más de 1.600 empleados)', editor: 'Electrical Industries Company (web)', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.eic.com.sa/about-us/history' },
  { id: 3, titulo: 'Saudi Arabia Transformer Market: 1.000 M USD en 2025, 1.310 M en 2031 (TCAC 4,65 %); distribución 59,85 %', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/saudi-arabia-transformer-market' },
  { id: 4, titulo: 'Saudi Arabia Power Transformer Market: 249,0 M USD en 2025, 394,7 M en 2034 (TCAC 5,25 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/saudi-arabia-power-transformer-market' },
  { id: 5, titulo: 'Saudi Electricity Company reveals 2030 expenditure details (220.000 M SAR en 2025-2030: 135.000 M en transporte y 85.000 M en distribución)', editor: 'MEED', tipo: 'Prensa', fecha: '2025-09', url: 'https://www.meed.com/saudi-electricity-company-reveals-2030-expenditure-details' },
  { id: 6, titulo: 'Expanding customer base sends Saudi Energy revenue up 11% (inversión de 39.000 M SAR en el 1S26, +6 %)', editor: 'AGBI', tipo: 'Prensa', fecha: '2026-08', url: 'https://agbi.com/energy/2026/08/expanding-customer-base-sends-saudi-energy-revenue-up-11' },
  { id: 7, titulo: 'Voltamp Energy to set up RO 9.5m transformer project in Saudi', editor: 'Oman Observer', tipo: 'Prensa', fecha: '2026-08-03', url: 'https://www.omanobserver.om/article/1149859/business/energy/voltamp-energy-to-set-up-ro-95m-transformer-project-in-saudi' },
  { id: 8, titulo: 'Electrical Industries unveils SAR 192M expansion of SPTC plant (transformadores y reactancias de 380 kV; producción comercial en el 3T27)', editor: 'Argaam', tipo: 'Prensa', fecha: '2024-05-15', url: 'https://www.argaam.com/en/article/articledetail/id/1728119' },
  { id: 9, titulo: 'Electrical Industries sees strong profitability until year-end: CEO (exportaciones del 12 % en el 3T25; Jafurah y Aramco)', editor: 'Argaam', tipo: 'Prensa', fecha: '2025-10-26', url: 'https://www.argaam.com/en/article/articledetail/id/1852746' },
  { id: 10, titulo: 'Stock Analysis: estadísticas de HD Hyundai Electric, Hyosung Heavy Industries, LS Electric, Hammond Power, WEG, Siemens Energy y ElSewedy Electric (16 y 18-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/quote/egx/SWDY/statistics/' },
  { id: 11, titulo: 'Consolidated Financial Statements 2025, nota 34.1 (multa de la Autoridad General de Competencia de 26,1 M SAR, recurrida y ganada en dos instancias)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03-08', url: `${AR}/6a0a4ee4-c8c9-4f36-8b6a-bb85ffced644.pdf` },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: null,
    hitos: [
      { anio: '1976', hito: 'Nace Wahah Electric Supply Co. (Wescosa), empresa conjunta de Westinghouse y Ali Zaid Al Quraishi & Bros [B2].' },
      { anio: '1978', hito: 'Saudi Transformers Company empieza a fabricar transformadores de distribución (4-6 al día) [B2].' },
      { anio: '1979', hito: 'Pauwels International entra como socio industrial de Saudi Transformers; la familia Al Quraishi compra después la parte de Westinghouse [B2].' },
      { anio: '1996', hito: 'Wescosa empieza a fabricar transformadores de potencia para generación y petróleo y gas [B2].' },
      { anio: '2005', hito: 'Se crea Electrical Industries Company como cabecera de Saudi Transformers y Wescosa [B2].' },
      { anio: '2010', hito: 'Nace Saudi Power Transformers Co. con CG Power Systems Belgium; pasa al 100 % de EIC en 2016 [B2].' },
      { anio: '2021', hito: 'Compra los activos, el conocimiento y las patentes de CG Power Systems Belgium y reabre Pauwels en Malinas (abril) [B2].' },
      { anio: '2024', hito: 'Aprueba la ampliación de Saudi Power Transformers a 380 kV (192 M SAR) y sube un 70 % la capacidad de transformadores de potencia [B8, B1].' },
      { anio: '2025', hito: 'Acuerdos con SEC por 1.410 M SAR (transformadores de muy alta tensión), 785,5 M (subestaciones) y 198,5 M (distribución); compra los terrenos de Pauwels [B1].' },
      { anio: '2026', hito: 'La Autoridad de Competencia le devuelve los 26,1 M SAR de la multa de 2024 (14-jul) [B11].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: null,
    tamano: '≈ 1.000 M USD (3.750 M SAR) en 2025 el mercado saudí de transformadores, según Mordor Intelligence; IMARC da 249 M USD solo para los de potencia [B3, B4].',
    unidad_serie: 'millones de USD (mercado saudí de transformadores, Mordor Intelligence)',
    serie: [
      { anio: '2025', tamano: 1000 }, { anio: '2026e', tamano: 1050 }, { anio: '2031e', tamano: 1310 },
    ],
    tcac_historico_pct: null, tcac_previsto_pct: 4.65, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Inversión de Saudi Electricity (Saudi Energy) en redes', efecto: '+', horizonte: 'Estructural', evidencia: 'Plan de 220.000 M SAR en 2025-2030 (135.000 M en transporte y 85.000 M en distribución); 39.000 M invertidos en el 1S26, +6 % [B5, B6].' },
      { driver: 'Proyectos de petróleo y gas de Aramco', efecto: '+', horizonte: 'Cíclico', evidencia: 'Entregas a Jafurah fase 2 y a otros proyectos de Aramco; contrato de 129,4 M SAR con Técnicas Reunidas y de 281 M con Hyundai E&C [B9, B1].' },
      { driver: 'Contenido local y preferencia por fabricante saudí', efecto: '+', horizonte: 'Estructural', evidencia: 'EIC es la única empresa del Reino que diseña y fabrica transformadores de alta tensión; las compras públicas premian el contenido local [B1].' },
      { driver: 'Escasez mundial de transformadores', efecto: '+', horizonte: 'Cíclico', evidencia: 'Primeras exportaciones de transformadores de alta tensión a Europa en 2025 y acuerdo marco con distribuidoras belgas [B1, B9].' },
      { driver: 'Nueva capacidad de competidores en el Reino', efecto: '−', horizonte: 'Estructural', evidencia: 'Voltamp (Omán) anuncia una fábrica de transformadores en Arabia Saudí de 9,5 M OMR [B7].' },
      { driver: 'Precio del cobre, acero eléctrico y aceite', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las materias primas son la mayor parte del coste de ventas (1.436 M SAR en 2025); los contratos largos con precio fijo trasladan el riesgo a la empresa [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'La propia empresa describe una competencia «severa» que aumenta cuando baja la demanda; hoy la demanda supera a la capacidad y el margen bruto ha subido del 19,4 % de 2021 al 37,5 % de 2025 [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Un cliente (SEC) compra el 16 % de las ventas y fija los acuerdos marco por concurso; Aramco y sus contratistas son el otro gran comprador [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Chapa magnética de grano orientado, cobre y componentes de alta tensión con pocos proveedores mundiales [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La homologación de SEC y Aramco y la escala (más de 10.000 MVA al año) frenan la entrada, pero Voltamp construye fábrica en el Reino y los grandes fabricantes extranjeros pueden localizar [B1, B7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto para el transformador en la red eléctrica [B3].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: null },
    regulacion: null,
    tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.ª fabricante saudí de transformadores y única del Reino que diseña y fabrica transformadores de alta y muy alta tensión [B1]',
    competidores: [
      { nombre: 'Alfanar', pais: 'Arabia Saudí', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Grupo privado saudí: aparamenta, cuadros y transformadores de distribución; no publica cuentas.' },
      { nombre: 'Hitachi Energy, Siemens Energy y Schneider (filiales saudíes)', pais: 'Multinacional', ticker: 'ENR.DE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compiten en alta tensión, subestaciones y aparamenta con fábricas locales; las cuentas de las filiales no se publican [B3].' },
      { nombre: 'ElSewedy Electric', pais: 'Egipto', ticker: 'SWDY.CA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cables y transformadores de distribución para Oriente Medio y África; margen EBITDA del 10 % [B10].' },
      { nombre: 'HD Hyundai Electric', pais: 'Corea del Sur', ticker: '267260.KS', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Transformadores de potencia con fábrica en Arabia Saudí; margen EBITDA del 27,5 % [B10].' },
      { nombre: 'Voltamp Energy', pais: 'Omán', ticker: 'VOES.OM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Transformadores de distribución; construye fábrica en Arabia Saudí [B7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Homologación de cada diseño por SEC y Aramco y servicio posventa propio (110 M SAR de servicios en 2025, margen del segmento del 41 %) [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Único fabricante saudí de transformadores de alta tensión y conocimiento propio de Pauwels (diseños hasta 380 kV) [B1, B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Contenido local y fábricas cercanas al cliente; el margen EBITDA del 31 % de 2025 supera al de ElSewedy (10 %) y al de Hyosung (14 %) [B10].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Más de 10.000 MVA al año y el 89,5 % de las ventas en un mercado de un solo gran comprador; poca demanda para dos fabricantes locales de alta tensión [B1].' },
      ],
    },
    amenazas: null,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: null, controversias: null,
    confianza: 'Media',
  },
  negocio: { descripcion: null, como_gana_dinero: null, clientes: null },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Núcleo', intentos: '1) Informe del consejo 2025: se declara líder y único fabricante de alta tensión, sin cuota; 2) Mordor e IMARC: el tamaño que publican (1.000 M USD) es menor que lo que factura EIC en transformadores (1.811 M SAR ≈ 483 M USD) y no sirve para una cuota fiable; 3) prensa saudí: sin cuota publicada', decision: 'Omitido; posición cualitativa' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe del consejo 2025, sección 47: sin calificaciones externas; 2) búsqueda de MSCI y Sustainalytics para 1303: sin ficha pública abierta; 3) Argaam: sin dato', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de los competidores locales', tipo: 'Complemento', intentos: '1) Alfanar y las filiales saudíes de multinacionales no publican cuentas; 2) Voltamp: cuentas de Omán sin desglose saudí; 3) Stock Analysis: solo los cotizados (usados en comparables)', decision: 'Omitido; los márgenes van en comparables' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Board of Directors Annual Report 2025: consejo, comisiones, biografías, participaciones de consejeros y directivos, remuneraciones, partes vinculadas, autocartera, gobierno', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03', url: `${AR}/4f18836e-1580-4d94-9375-daa1b67b2874.pdf` },
  { id: 2, titulo: 'Major shareholders, historial de participaciones y propiedad extranjera (Adja 15,00 %; Fahad 5,45 % y Faisal Al-Tuwaijri 5,15 %; extranjeros 18,96 % frente a un máximo del 46 %)', editor: 'EIC Investor Relations (Argaam IR)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://eic.argaam-ir.com/' },
  { id: 3, titulo: 'EIC’s major shareholder Ajda transfers 42m shares via internal restructuring', editor: 'Mubasher', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://english.mubasher.info/news/4646371/EIC-s-major-shareholder-Ajda-transfers-42m-shares-via-internal-restructuring/' },
  { id: 4, titulo: 'Consolidated Financial Statements 2025: notas 15 (autocartera), 18 (plan de acciones), 32 (BPA), 33 (partes vinculadas y retribución del personal clave), 34 (multa de competencia)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-03-08', url: `${AR}/6a0a4ee4-c8c9-4f36-8b6a-bb85ffced644.pdf` },
  { id: 5, titulo: 'Condensed interim financial statements 1S26, nota 11.1 (reembolso íntegro de la multa el 14-jul-2026) y nota 16 (dividendos)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-07-23', url: `${AR}/e022dcfd-a45f-440e-917f-be13e55ae301.pdf` },
  { id: 6, titulo: 'Electrical Industries eyes further growth in sales, profit in 2024: CEO', editor: 'Argaam', tipo: 'Prensa', fecha: '2024', url: 'https://www.argaam.com/en/article/articledetail/id/1724722' },
  { id: 7, titulo: 'Electrical Industries sees strong profitability until year-end: CEO', editor: 'Argaam', tipo: 'Prensa', fecha: '2025-10-26', url: 'https://www.argaam.com/en/article/articledetail/id/1852746' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Tariq Mohamad Al-Tahini', cargo: 'Consejero delegado y consejero ejecutivo', desde: null, participacion_pct: 0.01, trayectoria: 'Ingeniero mecánico (KFUPM) con más de 25 años en puestos de dirección de Saudi Electricity, el principal cliente. Con él las ventas pasaron de 771 M SAR en 2021 a 2.296 M en 2025 y el beneficio de 49 a 630 M [C1, A1].' },
      { nombre: 'Medhat Adham Ghaleb', cargo: 'Vicepresidente ejecutivo de Finanzas y TI (director financiero)', desde: null, participacion_pct: 0.01, trayectoria: 'Carrera entera en el grupo: contable jefe y director financiero de Saudi Transformers y vicepresidente de finanzas y servicios compartidos; consejero de Saudi Power Transformers y Pauwels. Vendió 145.000 acciones en 2025 [C1].' },
      { nombre: 'Yousef Ali Al-Quraishi', cargo: 'Presidente (no ejecutivo)', desde: null, participacion_pct: null, trayectoria: 'Consejero delegado de Ali Zaid Al-Quraishi & Brothers, la familia que fundó Wescosa en 1976 y que controla Adja, primer accionista (15 %) [C1, C2].' },
      { nombre: 'Hossam Abdulhaleem Al-Sheikh', cargo: 'Consejero delegado de Saudi Power Transformers', desde: null, participacion_pct: null, trayectoria: 'Antes vicepresidente ejecutivo de operaciones e ingeniería de EIC y director de planta y de diseño de Saudi Transformers; dirige la filial de alta tensión que en 2025 produjo más de 10.000 MVA [C1, A11].' },
      { nombre: 'Koen Van Peteghem', cargo: 'Consejero delegado de Pauwels Transformers (Bélgica)', desde: null, participacion_pct: null, trayectoria: 'Directivo histórico de Pauwels y de CG Power Systems; lidera la entrada en Europa (174 M SAR de ventas en 2025) [C1, A1].' },
    ],
    historial_guidance: [],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Yousef Ali Al-Quraishi', cargo: 'Presidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Mahmoud M. Al-Toukhi', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Faisal Saleh Al-Quraishi', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Fahad Saad Al-Tuwaijri', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Jameel Abdullah Al-Molhem', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones (preside)' },
      { nombre: 'Sattam Abdulaziz Al-Zamil', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Khalid Sulaiman Al-Harbi', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Tariq Mohamad Al-Tahini', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: false, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: null,
    accionistas: [
      { nombre: 'Adja Company for Industrial Services (familia Al-Quraishi)', pct: 15.00, tipo: 'Industrial (fundador)', variacion: '28,0 % hasta ago-2024; 20,68 % (ago-2024), 18,75 % (oct-2024) y 15,00 % (20-jul-2026, traspaso de 42,2 M acciones a sus filiales)' },
      { nombre: 'Fahad Saad Al-Tuwaijri', pct: 5.45, tipo: 'Particular (familia Al-Tuwaijri; consejero)', variacion: 'Recibe acciones en nov-2025 al repartir el holding familiar su 22,81 %' },
      { nombre: 'Faisal Saad Al-Tuwaijri', pct: 5.15, tipo: 'Particular (familia Al-Tuwaijri)', variacion: 'Vende poco a poco: 5,44 % (nov-2025) → 5,15 % (17-sep-2026)' },
      { nombre: 'Mahmoud Al-Toukhi y familiares', pct: 5.91, tipo: 'Particular (vicepresidente)', variacion: '2,32 % directo y 3,59 % de familiares; vendió 0,73 M acciones en 2025 y sus familiares compraron 2,88 M' },
      { nombre: 'Inversores extranjeros (todos)', pct: 18.96, tipo: 'Extranjeros (QFI y swaps)', variacion: 'Máximo permitido: 46 %' },
      { nombre: 'Autocartera', pct: 1.11, tipo: 'Autocartera', variacion: '12,5 M acciones compradas en 2019-2020 para el plan de empleados' },
    ],
    insiders: [
      { fecha: '2025-12-31', persona: 'Mahmoud Al-Toukhi (vicepresidente), neto del año', operacion: 'Venta', acciones: 732408, importe: null },
      { fecha: '2025-12-31', persona: 'Abdulaziz Al-Dhafiyari (directivo) y familiares, neto del año', operacion: 'Venta', acciones: 418334, importe: null },
      { fecha: '2025-12-31', persona: 'Medhat Ghaleb (director financiero), neto del año', operacion: 'Venta', acciones: 145000, importe: null },
      { fecha: '2026-03-31', persona: 'Abdullah Saad Al-Tuwaijri (familia de un consejero; sale del registro de accionistas significativos)', operacion: 'Venta', acciones: null, importe: null },
      { fecha: '2026-09-17', persona: 'Faisal Saad Al-Tuwaijri (familia de un consejero): de 5,44 % a 5,15 %', operacion: 'Venta', acciones: 3262500, importe: null },
    ],
    control_y_defensas: null,
    alertas: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Informe del consejo 2025: lista de juntas sin resultados de votación; 2) Tadawul y Argaam: anuncios de resultados de juntas sin porcentajes de voto; 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo (individual)', tipo: 'Complemento', intentos: '1) Informe del consejo 2025: solo el total de los seis primeros directivos (19,18 M SAR) y la dieta de consejero del consejero delegado (0,315 M); 2) cuentas, nota 33.2: total del personal clave (27,9 M); 3) normativa saudí: no exige desglose individual', decision: 'Omitido; se usa el total de los seis directivos' },
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Informes del consejo 2024-2025: sin objetivos numéricos; 2) entrevistas al consejero delegado (Argaam 2024 y 2025): solo expectativas cualitativas; 3) anuncios de Tadawul: sin previsiones', decision: 'Omitido: la empresa no publica guía' },
    { seccion: 'gobierno', campo: 'desde (fecha de nombramiento de consejeros y directivos)', tipo: 'Complemento', intentos: '1) Informe del consejo 2025: mandato actual del 9-dic-2024 al 8-dic-2028 sin fecha de primer nombramiento; 2) web de la empresa (consejo y dirección): sin fechas; 3) Argaam: perfiles sin fechas verificables', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 1303.SR, KSA (iShares MSCI Saudi Arabia, USD anclado al SAR) y GRID (First Trust Smart Grid): precio, rango, rentabilidades, beta, volatilidad y cierres de ejercicio (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: bolsa.identificacion.fecha_precio, url: 'https://finance.yahoo.com/quote/1303.SR' },
  { id: 2, titulo: 'MarketScreener: estimaciones 2026-2028 de EIC (ventas, EBITDA, EBIT, beneficio, BPA, dividendo; un analista)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/ELECTRICAL-INDUSTRIES-COM-20708288/finances/' },
  { id: 3, titulo: 'MarketScreener: consenso «Outperform», un analista con objetivo de 15,50 SAR; cambios de EFG-Hermes (23-jul) y Sadif (3-sep)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/ELECTRICAL-INDUSTRIES-COM-20708288/consensus/' },
  { id: 4, titulo: 'Argaam, ficha de EIC: ANB Capital pasa a «Overweight» (23-jul-2026, antes «Neutral»); previsiones del 2T26 y del 3T26', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-11', url: 'https://www.argaam.com/en/company/companyoverview/marketid/3/companyid/3829' },
  { id: 5, titulo: 'ANB Capital issues Q2 2026 earnings forecasts (EIC: 205,7 M SAR, +50 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-07-15', url: 'https://www.argaam.com/en/article/articledetail/id/1920468' },
  { id: 6, titulo: 'FRED, DGS10: rendimiento del bono del Tesoro de EE. UU. a 10 años (5,10 % el 15-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 7, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: Aa3, diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Stock Analysis: estadísticas de HD Hyundai Electric, Hyosung Heavy, LS Electric, Hammond Power, WEG, Shihlin, Chung-Hsin, Allis y Siemens Energy (16-oct-2026), recogidas en el informe de Fortune Electric', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/krx/267260/statistics/' },
  { id: 10, titulo: 'Stock Analysis: estadísticas de ElSewedy Electric (EGX: SWDY), 18-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/quote/egx/SWDY/statistics/' },
  { id: 11, titulo: 'Yahoo Finance: tipos de cambio TWD=X (32,33 por USD) y EGP=X (53,40 por USD), 16-oct-2026; SAR anclado a 3,75 por USD', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/TWD=X' },
  { id: 12, titulo: 'GE Vernova to fully acquire Prolec GE joint venture (5.275 M USD por el 50 %)', editor: 'Prolec GE', tipo: 'Primaria', fecha: '2025-10', url: 'https://www.prolec.energy/news/ge-vernova-to-fully-acquire-prolec-ge-joint-venture/' },
  { id: 13, titulo: 'Hubbell to acquire NSI Industries (8-K, Ex. 99.1): 3.000 M USD, ~15,5 veces el EBITDA ajustado', editor: 'Hubbell Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05', url: 'https://www.sec.gov/Archives/edgar/data/48898/000119312526204099/d133302dex991.htm' },
  { id: 14, titulo: 'Hammond Power Solutions to acquire AEG Power Solutions (valor empresa de 365 M CAD; ventas de ≈ 326 M CAD)', editor: 'Hammond Power Solutions', tipo: 'Primaria', fecha: '2026-02-17', url: 'https://americas.hammondpowersolutions.com/news/2026/february/hps-aeg-power-solutions-aquisition' },
  { id: 15, titulo: 'Tipos de cambio de referencia del euro, 16-oct-2026 (USD 1,1253; CAD 1,5935)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 16, titulo: 'Condensed interim financial statements 1S26: balance a 30-jun-2026 (caja, murabaha, arrendamientos, indemnizaciones por cese, inversiones financieras)', editor: 'Electrical Industries Company', tipo: 'Primaria', fecha: '2026-07-23', url: `${AR}/e022dcfd-a45f-440e-917f-be13e55ae301.pdf` },
  { id: 17, titulo: 'movimiento.mjs y movimiento-precio.mjs sobre 1303.SR (Yahoo): variación a 1-12 meses, media de 200 sesiones, caídas diarias de más del 5 %', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/1303.SR' },
  { id: 18, titulo: 'Mubasher Research: «سهم الصناعات الكهربائية يواجه ضغوطاً بيعية وسط اختبار مستويات دعم محورية» (análisis técnico: ruptura de 14,40 SAR)', editor: 'Mubasher', tipo: 'Prensa', fecha: '2026-10-08', url: 'https://www.mubasher.info/markets/TDWL/stocks/1303/news/analysis' },
  { id: 19, titulo: 'EIC stock summary (Argaam IR): cierre, volumen, rango y variación a 1, 3 y 6 meses (19-oct-2026)', editor: 'EIC Investor Relations (Argaam IR)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://eic.argaam-ir.com/' },
  { id: 20, titulo: 'EIC logs 42% surge in 9M-25 net profits (publicación de los resultados del 3T25 el 23-oct-2025)', editor: 'Mubasher', tipo: 'Prensa', fecha: '2025-10-23', url: 'https://english.mubasher.info/news/4512850/EIC-logs-42-surge-in-9M-25-net-profits/' },
  { id: 21, titulo: 'TASI falls 2.2% to 10,476 pts; turnover at SAR 5.4B (primera sesión tras los ataques de EE. UU. e Israel contra Irán, 1-mar-2026)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-03-01', url: 'https://www.argaam.com/en/market-daily-report/3/56397' },
];

const bo = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const tw = 3.75 / 32.33; // SAR por TWD (Yahoo, 16-oct-2026)
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Electrical Industries Company', nombre_corto: 'EIC', ticker: '1303.SR', isin: 'SA13LG50KBH9',
    mercado: 'Saudi Exchange (Tadawul), mercado principal; cotiza de domingo a jueves', indice_referencia: 'TASI (rentabilidades con el ETF iShares MSCI Saudi Arabia, KSA)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Industria', industria: 'Equipos eléctricos (transformadores y aparamenta)', sede: 'Dammam', fundacion: '2005', empleados: 1600, web: 'https://www.eic.com.sa',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1121.8, capitalizacion_publicada: 13556, free_float_pct: 68.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M SAR/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 2872, ebitda: 934, ebit: 892, bpa: 0.75, dpa: 0.25, fuente: 'MarketScreener, un analista [D2]' },
      { periodo: '2027e', ingresos: 3171, ebitda: 1082, ebit: 1034, bpa: 0.86, dpa: 0.52, fuente: 'MarketScreener, un analista [D2]' },
      { periodo: '2028e', ingresos: 3765, ebitda: 1356, ebit: 1303, bpa: 1.09, dpa: 0.71, fuente: 'MarketScreener, un analista [D2]' },
    ],
    recomendaciones: { n_analistas: 1, comprar: 1, mantener: 0, vender: 0, po_medio: 15.5, po_min: 15.5, po_max: 15.5 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual,
    beta: bo.beta, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: null,
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((y) => ({ anio: y, precio_cierre: cierre[y], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'HD Hyundai Electric', ticker: '267260.KS', pais: 'KR', capitalizacion: Math.round(446232 * tw), ev_ventas: 3.85, ev_ebitda_ltm: 14.0, ev_ebitda_ntm: null, per_ntm: 16.3, crecimiento_pct: 16.3, margen_ebitda_pct: 27.5, roic_pct: 66.3, dn_ebitda: -0.7, fcf_yield_pct: 3.8 },
      { nombre: 'Hyosung Heavy Industries', ticker: '298040.KS', pais: 'KR', capitalizacion: Math.round(430907 * tw), ev_ventas: 2.67, ev_ebitda_ltm: 18.9, ev_ebitda_ntm: null, per_ntm: 18.0, crecimiento_pct: 18.8, margen_ebitda_pct: 14.3, roic_pct: 23.0, dn_ebitda: 0.1, fcf_yield_pct: 3.0 },
      { nombre: 'LS Electric', ticker: '010120.KS', pais: 'KR', capitalizacion: Math.round(567094 * tw), ev_ventas: 4.22, ev_ebitda_ltm: 35.6, ev_ebitda_ntm: null, per_ntm: 36.5, crecimiento_pct: 23.5, margen_ebitda_pct: 11.8, roic_pct: 13.4, dn_ebitda: 1.2, fcf_yield_pct: -0.8 },
      { nombre: 'Hammond Power Solutions', ticker: 'HPS-A.TO', pais: 'CA', capitalizacion: Math.round(69653 * tw), ev_ventas: 2.94, ev_ebitda_ltm: 26.0, ev_ebitda_ntm: null, per_ntm: 27.0, crecimiento_pct: 28.8, margen_ebitda_pct: 10.7, roic_pct: 16.8, dn_ebitda: 0.5, fcf_yield_pct: 0.1 },
      { nombre: 'WEG', ticker: 'WEGE3.SA', pais: 'BR', capitalizacion: Math.round(1317118 * tw), ev_ventas: 5.09, ev_ebitda_ltm: 23.6, ev_ebitda_ntm: null, per_ntm: 29.1, crecimiento_pct: 11.7, margen_ebitda_pct: 21.2, roic_pct: 38.3, dn_ebitda: -0.4, fcf_yield_pct: 2.0 },
      { nombre: 'Shihlin Electric & Engineering', ticker: '1503.TW', pais: 'TW', capitalizacion: Math.round(103413 * tw), ev_ventas: 2.56, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: null, per_ntm: 19.9, crecimiento_pct: null, margen_ebitda_pct: 13.8, roic_pct: 10.0, dn_ebitda: -0.7, fcf_yield_pct: 1.9 },
      { nombre: 'Chung-Hsin Electric & Machinery', ticker: '1513.TW', pais: 'TW', capitalizacion: Math.round(81522 * tw), ev_ventas: 3.09, ev_ebitda_ltm: 9.7, ev_ebitda_ntm: null, per_ntm: 17.0, crecimiento_pct: 8.3, margen_ebitda_pct: 25.5, roic_pct: 16.1, dn_ebitda: 0.6, fcf_yield_pct: 10.7 },
      { nombre: 'Allis Electric', ticker: '1514.TW', pais: 'TW', capitalizacion: Math.round(27358 * tw), ev_ventas: 2.50, ev_ebitda_ltm: 21.6, ev_ebitda_ntm: null, per_ntm: 24.5, crecimiento_pct: null, margen_ebitda_pct: 11.1, roic_pct: 12.5, dn_ebitda: 0.8, fcf_yield_pct: 2.6 },
      { nombre: 'Siemens Energy', ticker: 'ENR.DE', pais: 'DE', capitalizacion: Math.round(4146683 * tw), ev_ventas: 2.52, ev_ebitda_ltm: 20.4, ev_ebitda_ntm: null, per_ntm: 22.8, crecimiento_pct: 13.6, margen_ebitda_pct: 11.0, roic_pct: null, dn_ebitda: -1.8, fcf_yield_pct: 6.9 },
      { nombre: 'ElSewedy Electric', ticker: 'SWDY.CA', pais: 'EG', capitalizacion: Math.round(225810 * 3.75 / 53.40), ev_ventas: 0.81, ev_ebitda_ltm: 7.7, ev_ebitda_ntm: null, per_ntm: 13.4, crecimiento_pct: 10.2, margen_ebitda_pct: 10.0, roic_pct: 19.9, dn_ebitda: 1.1, fcf_yield_pct: -1.4 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-10', objetivo: 'Prolec GE (transformadores; 50 % restante)', comprador: 'GE Vernova', ev: 39563, ev_ventas: 3.52, ev_ebitda: 14.1, prima_pct: null, excluir: false, comentario: '5.275 M USD por el 50 % → 10.550 M USD por el 100 % (39.563 M SAR); ventas de ≈ 3.000 M USD y margen EBITDA ajustado de ≈ 25 % (múltiplos implícitos, cálculo propio) [D12].' },
      { fecha: '2026-05', objetivo: 'NSI Industries (equipos y accesorios eléctricos)', comprador: 'Hubbell', ev: 11250, ev_ventas: 5.26, ev_ebitda: 15.5, prima_pct: null, excluir: false, comentario: '3.000 M USD; múltiplo de EBITDA ajustado publicado por Hubbell [D13].' },
      { fecha: '2026-02', objetivo: 'AEG Power Solutions (electrónica de potencia)', comprador: 'Hammond Power Solutions', ev: 967, ev_ventas: 1.12, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '365 M CAD (≈ 258 M USD al cambio del BCE) frente a 326 M CAD de ventas de 2025 [D14, D15].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Saudi Exchange: el préstamo de valores y las ventas en corto cubiertas son mínimos y no se publican por valor; 2) Argaam IR: sin dato; 3) Stock Analysis: sin dato para Tadawul', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'operaciones en el Golfo', tipo: 'Complemento', intentos: '1) Compras de EIC (activos de CG Power Belgium en 2021, terrenos de Pauwels en 2025): sin múltiplo; 2) operaciones del Golfo (Alfanar, Voltamp): sin precio publicado; 3) prensa regional (Argaam, MEED): sin múltiplos oficiales', decision: 'Omitido; se usan tres operaciones internacionales' },
    { seccion: 'consenso', campo: 'segunda fuente de estimaciones', tipo: 'Complemento', intentos: '1) MarketScreener: un solo analista con estimaciones; 2) Argaam: ANB Capital publica previsiones trimestrales y la recomendación, sin objetivo abierto; 3) EFG-Hermes y Sadif: informes de pago', decision: 'Una sola fuente de estimaciones; confianza baja' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Hawamer (هوامير البورصة), el foro saudí de referencia: las páginas del valor exigen registro (403 para lectura); 2) Stocktwits: el símbolo 1303 no existe (404) y Reddit bloquea la lectura; 3) Argaam y Mubasher: sin comentarios de lectores abiertos, solo notas técnicas de Mubasher Research (usadas en bolsa como prensa)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
