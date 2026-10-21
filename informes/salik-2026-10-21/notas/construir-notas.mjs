// Notas A-E de Salik Company P.J.S.C. (DFM: SALIK, Yahoo SALIK.AE; corte 2026-10-21).
// Emiratos no tiene XBRL en cuentas.mjs: cuentas auditadas por PwC de 2025 y 2024 (informes anuales 2025 y 2024, con 2024 y 2023
// comparativos), intermedios revisados del 1S26 (balance escaneado, leído como imagen), comunicados trimestrales y los comunicados
// anuales de 2022 y 2023 (que dan 2021 y 2022). HISTORIAL CORTO: Salik opera como sociedad desde el 1-jul-2022 (concesión de 49 años
// de la RTA, hasta 2071; salida a bolsa el 29-sep-2022). 2021 es el negocio de peajes dentro de la RTA («carve-out»: sin canon, sin
// impuesto y sin deuda) y 2022 mezcla un primer semestre carve-out con un segundo semestre como sociedad. No son comparables con
// 2023-2025 y así se dice en limitaciones.
// Ejecutar: node informes/salik-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const r4 = (x) => Math.round(x * 10000) / 10000;
const DFM = 'https://feeds.dfm.ae/documents/';
const AR25 = 'https://ar2025.salik.ae/download/full-reports/ar_en_annual-report_pages_salik_2025.pdf';
const AR24 = 'https://ar2024.salik.ae/download/full-reports/ar_en_annual-report_pages_salik_2024.pdf';
const FS1S26 = `${DFM}2026/Aug/5/db18d242-8fc8-41b2-8f6c-f67d8d9fc41f/EN%20Salik%20Q2%202026%20Signed.Pdf.pdf`;
const PR2T26 = `${DFM}2026/Aug/5/9069488c-a65b-4802-aaca-09c4748d7296/Salik%20Q2%202026%20Press%20Release%20EN.Pdf.pdf`;
const PR4T25 = 'https://mediaoffice.ae/en/news/2026/march/04-03/salik';
const PR3T25 = 'https://mediaoffice.ae/en/news/2025/november/13-11/salik-reports';
const PR1T26 = 'https://mediaoffice.ae/en/news/2026/may/11-05/salik';
const PR4T23 = `${DFM}2024/Mar/04/24999f25-75b6-4a4c-8da2-1aca78f6ec41/Salik_Q4_23_Earnings-Release.pdf`;
const PR4T22 = `${DFM}2023/Mar/06/9786c8b0-6d57-4557-8caf-e97460943dd0/SALIK_PR_E_ANN_07_3_2022.pdf`;
const N = 7500; // acciones (millones), sin autocartera ni instrumentos dilutivos [A1, nota 32]

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025: financial statements for the year ended 31 December 2025 (PwC, opinión favorable): cuenta, balance y flujos 2025 y 2024; ingresos por línea (nota 6), concesión y canon variable del 22,5 % (15-16), vinculadas y derechos de las dos puertas nuevas (23), préstamo de Emirates NBD (24), impuesto del 9 % (28), dividendos (31), deuda neta (35) y hechos posteriores (36); revisión del director financiero y guía 2026', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 2, titulo: 'Annual Report 2024: financial statements for the year ended 31 December 2024 (PwC): cuenta, balance y flujos 2024 y 2023; ingresos por línea 2023', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2025-03-04', url: AR24 },
  { id: 3, titulo: 'Condensed interim financial statements for the three-month and six-month periods ended 30 June 2026 (revisión limitada de PwC, 5-ago-2026): balance a 30-jun-2026, cuenta del 2T y del 1S, flujos, vinculadas (nota 21), préstamo clasificado a corto (nota 22), IVA y compensación de la RTA (nota 34)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-08-05', url: FS1S26 },
  { id: 4, titulo: 'Financial Results – H1 2026 (comunicado al DFM: viajes, ingresos por línea, EBITDA, deuda neta de 5.038,6 M, flujo de caja libre, nuevos negocios)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-08-05', url: PR2T26 },
  { id: 5, titulo: 'Salik Achieves Stable Results Supported by High Resilience: AED 728.9 million revenue in Q1 2026', editor: 'Government of Dubai Media Office', tipo: 'Primaria', fecha: '2026-05-11', url: PR1T26 },
  { id: 6, titulo: 'Salik Reports FY 2025 Revenue of AED 3.10 Billion, Up 35.1% YoY (4T25: ingresos, EBITDA y beneficio; dividendo de 890,3 M con 107,8 M extraordinarios)', editor: 'Government of Dubai Media Office', tipo: 'Primaria', fecha: '2026-03-04', url: PR4T25 },
  { id: 7, titulo: 'Salik Reports AED 2.28 billion Revenue in 9M 2025, Up 38.6% YoY (3T25)', editor: 'Government of Dubai Media Office', tipo: 'Primaria', fecha: '2025-11-13', url: PR3T25 },
  { id: 8, titulo: 'Salik Reports Record Full-Year Revenues of AED 2.1bn (resultados de 2023 con 2022 comparativo: ingresos por línea, EBITDA, viajes, flujo de caja)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2024-03-04', url: PR4T23 },
  { id: 9, titulo: 'Salik Company PJSC Achieves H2 2022 Net Profit of AED 529 million (resultados de 2022 con 2021 «carve-out» comparativo: ingresos por línea, EBITDA, beneficio, viajes, balance y flujos)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2023-03-06', url: PR4T22 },
  { id: 10, titulo: 'Yahoo Finance, series anuales (fundamentals-timeseries) de SALIK.AE: amortizaciones y gastos por intereses de 2022', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/SALIK.AE/financials' },
];

// Cuenta por naturaleza (NIIF). EBITDA = ingresos + otros ingresos − gastos de explotación (sin ingresos financieros, como la empresa).
// 2021: carve-out [A9] (EBITDA 1.387 y beneficio 1.381: ≈ 6 M de amortización, sin canon, sin financieros ni impuesto).
// 2022: medio año carve-out y medio como sociedad [A9]; amortización e intereses de Yahoo [A10].
const g23 = { ing: 2108.593, otros: 4.041, fin_ing: 30.047, tags: 27.920, om: 84.372, pers: 26.570, da: 82.973, com: 43.027, canon: 461.369, soft: 12.886, det: 34.412, cons: 6.635, fin: 239.191, otr: 25.359, imp: 0 };
const g24 = { ing: 2291.907, otros: 3.024, fin_ing: 48.515, tags: 33.681, om: 85.504, pers: 31.480, da: 91.100, com: 41.568, canon: 460.582, soft: 11.863, det: 13.990, cons: 5.090, fin: 256.824, otr: 32.078, imp: 115.138 };
const g25 = { ing: 3096.913, otros: 2.277, fin_ing: 21.010, tags: 37.314, om: 104.275, pers: 45.477, da: 144.769, com: 52.661, canon: 615.632, soft: 18.465, det: 36.810, cons: 5.520, fin: 313.146, otr: 39.177, imp: 153.592 };
const fila = (periodo, g, dpa, extra) => {
  const ebitda = g.ing + g.otros - (g.tags + g.om + g.pers + g.com + g.canon + g.soft + g.det + g.cons + g.otr);
  const ebit = ebitda - g.da;
  const rf = g.fin_ing - g.fin;
  const bai = ebit + rf;
  const bn = bai - g.imp;
  return { periodo, ingresos: r1(g.ing), coste_ventas: r1(g.tags), gastos_generales: null, ebitda: r1(ebitda), amortizaciones: r1(g.da), ebit: r1(ebit), resultado_financiero: r1(rf), bai: r1(bai), impuestos: r1(g.imp), minoritarios: 0, beneficio_neto: r1(bn), gastos_financieros: r1(g.fin), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r4(bn / N), dpa, dpa_extraordinario: extra, acciones_diluidas: N };
};
const cuenta = [
  { periodo: '2021', ingresos: 1693, coste_ventas: null, gastos_generales: null, ebitda: 1387, amortizaciones: 6, ebit: 1381, resultado_financiero: 0, bai: 1381, impuestos: 0, minoritarios: 0, beneficio_neto: 1381, gastos_financieros: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: null, dpa: null, dpa_extraordinario: 0, acciones_diluidas: null },
  { periodo: '2022', ingresos: 1892.3, coste_ventas: null, gastos_generales: null, ebitda: 1440, amortizaciones: 44.1, ebit: 1395.9, resultado_financiero: -70.2, bai: 1325.7, impuestos: 0, minoritarios: 0, beneficio_neto: 1325.7, gastos_financieros: 73.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.1768, dpa: 0.066, dpa_extraordinario: 0, acciones_diluidas: N },
  fila('2023', g23, 0.1464, 0),
  fila('2024', g24, 0.1553, 0),
  fila('2025', g25, 0.2215, 0.0144),
];
// LTM jun-26 = 2025 − 1S25 + 1S26 [A1, A3]. 1S25: ingresos 1.527,3; EBITDA 1.065,0; amortización 72,3; beneficio 770,9.
// 1S26: ingresos 1.412,0; EBITDA 975,6; amortización 72,6; beneficio 704,0 [A3, A4].
// FCF (estimación): flujo operativo LTM 2.082,5 − 1.111,6 + 551,0 = 1.521,9 − capex ≈ 3 − intereses pagados en financiación LTM ≈ 246 − arrendamientos ≈ 2.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2981.6, ebitda: 2054.5, ebit: 1909.5, beneficio_neto: 1486.5, bpa: 0.1982, dpa: 0.2126, dpa_extraordinario: 0.0144, fcf: 1271, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null };

// Balance. clientes = clientes y otras cuentas a cobrar + saldos a cobrar de vinculadas (Dubai E-Government cobra las recargas
// en línea, la RTA, Dubai Taxi): son circulante de explotación. proveedores = acreedores + saldo a pagar a la RTA SIN la parte de
// los derechos de las puertas nuevas (es deuda financiera: se paga en 6 años y devenga coste financiero). pasivos_contrato =
// saldos prepagados de los clientes y cuotas de activación pendientes (corto y largo). deuda_financiera = préstamo de Emirates NBD
// + pasivo por los derechos de las dos puertas nuevas (la empresa lo incluye en su deuda neta [A1 nota 35]). caja = caja + depósitos.
// 2022: del comunicado de 2022 [A9] (intangibles = 3.877,6 + 81,6 de amortización de 2023 [A2], estimación).
const balanceH = [
  { periodo: '2022', activo_total: 5303.0, activo_corriente: null, pasivo_corriente: null, pasivo_total: 4699.0, fondo_comercio: 0, intangibles: 3959.2, inmovilizado_material: null, existencias: 12, clientes: 308, proveedores: 173, activos_contrato: null, pasivos_contrato: 338, caja: 822.7, deuda_financiera: 3985.6, arrendamientos: null, patrimonio_neto: 603.9, minoritarios: 0, reservas: 491.4 },
  { periodo: '2023', activo_total: 5223.8, activo_corriente: 1334.3, pasivo_corriente: 510.5, pasivo_total: 4561.2, fondo_comercio: 0, intangibles: 3877.6, inmovilizado_material: 11.4, existencias: 5.6, clientes: 312.6, proveedores: 209.0, activos_contrato: 0, pasivos_contrato: 353.1, caja: 1016.2, deuda_financiera: 3988.8, arrendamientos: 7.9, patrimonio_neto: 662.5, minoritarios: 0, reservas: 550.0 },
  { periodo: '2024', activo_total: 7985.9, activo_corriente: 1445.2, pasivo_corriente: 1018.3, pasivo_total: 6897.9, fondo_comercio: 0, intangibles: 6526.9, inmovilizado_material: 13.4, existencias: 16.9, clientes: 440.2, proveedores: 234.9, activos_contrato: 24.4, pasivos_contrato: 382.3, caja: 963.7, deuda_financiera: 6154.3, arrendamientos: 8.0, patrimonio_neto: 1088.0, minoritarios: 0, reservas: 975.5 },
  { periodo: '2025', activo_total: 7871.5, activo_corriente: 1472.8, pasivo_corriente: 1130.5, pasivo_total: 6652.8, fondo_comercio: 0, intangibles: 6387.6, inmovilizado_material: 10.8, existencias: 30.4, clientes: 424.4, proveedores: 254.9, activos_contrato: 2.8, pasivos_contrato: 425.3, caja: 1015.2, deuda_financiera: 5808.7, arrendamientos: 5.7, patrimonio_neto: 1218.7, minoritarios: 0, reservas: 1106.2 },
];
// Flujos. Salik clasifica los intereses pagados en financiación [A1]. 2022: el pago inicial de la concesión (4.000 M) va en adquisiciones;
// los 826,7 M de «dividendos» de 2022 son sobre todo transferencias a la RTA antes de la salida a bolsa [A9, A10].
// La amortización del principal de los derechos de las puertas nuevas (216,3 M en 2024 y 348,7 M en 2025) es devolución de deuda.
const flujosH = [
  { periodo: '2021', flujo_operativo: 1234, capex: 1, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: null, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 1515.6, capex: 3.2, pagos_arrendamientos: null, adquisiciones: 4000, desinversiones: 0, dividendos: 826.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 73.0 },
  { periodo: '2023', flujo_operativo: 1454.2, capex: 4.6, pagos_arrendamientos: 0.2, adquisiciones: 0, desinversiones: 0, dividendos: 1039.3, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 236.0 },
  { periodo: '2024', flujo_operativo: 1463.1, capex: 5.9, pagos_arrendamientos: 2.2, adquisiciones: 0, desinversiones: 0, dividendos: 1094.8, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 253.6 },
  { periodo: '2025', flujo_operativo: 2082.5, capex: 2.9, pagos_arrendamientos: 2.3, adquisiciones: 0, desinversiones: 0, dividendos: 1390.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 310.0 },
];
// Trimestres tal como los publica la empresa [A4-A7]. 3T24 y 4T24 se derivan de los crecimientos publicados del 3T25 (+36,9 % en
// ingresos, +37,7 % en EBITDA, +34,5 % en beneficio) y del 4T25 (+26,3 %, +20,7 %, +19,6 %). 1T25 = 1S25 − 2T25.
const t = (periodo, ingresos, crec, ebitda, bn, vs = null) => ({ periodo, ingresos, crecimiento_pct: crec, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r1((ebitda / ingresos) * 100), bpa: r4(bn / N), vs_consenso: vs });
const tri = [
  t('3T24', 546.2, 7.3, 376.7, 277.3),
  t('4T24', 650.8, 15.6, 464.1, 342.5),
  t('1T25', 751.6, null, 519.7, 370.6),
  t('2T25', 775.7, null, 545.3, 400.2),
  t('3T25', 747.7, 36.9, 518.7, 372.9),
  t('4T25', 821.9, 26.3, 560.2, 409.6),
  t('1T26', 728.9, -3.0, 507.2, 369.3),
  t('2T26', 683.1, -11.9, 468.4, 334.8),
];
const lin = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) });

guarda('A', {
  _estado: 'completo',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Arranque de Salik como sociedad el 1-jul-2022: entran la concesión (4.000 M de intangible), el préstamo de 4.000 M, el canon variable del 25 % y los costes propios; 2021 y el primer semestre de 2022 son el negocio dentro de la RTA y no son comparables [A1, A9].' },
      { periodo: '2024', descripcion: 'Dos puertas nuevas (Business Bay y Al Safa Sur) desde el 24-nov-2024: 2.734,3 M de derechos de cobro en el intangible y un pasivo con la RTA de 2.378,6 M a valor razonable que se paga en 6 años; entran en balance a final de 2024 y en la cuenta casi solo en 2025 [A1].' },
    ],
    confianza: 'Alta',
  },
  trimestres: { items: tri, confianza: 'Alta' },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 227.9 }, { anio: '2027', importe: 4455.7 }, { anio: '2028', importe: 455.7 }, { anio: '2029', importe: 455.7 }, { anio: '2030', importe: 227.9 }],
    liquidez: 'Caja y depósitos de 594,6 M y línea revolvente sin disponer de 50 M a 30-jun-2026; el préstamo de 4.000 M de Emirates NBD vence el 30-jun-2027 y está clasificado a corto [A3]',
    rating: 'Fitch A (perspectiva negativa desde jul-2026); Moody\'s A3 estable (dic-2025)',
    coste_deuda_pct: 5.1,
    vida_media_anios: 1.2,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers Limited Partnership, Dubai Branch', anios_auditor: 4, opinion: 'Favorable', confianza: 'Alta' },
  negocio: {
    segmentos: [
      lin('Uso de peajes', 'Tarifa por paso por cada puerta: 4 AED fija hasta ene-2025; desde el 31-ene-2025, 6 AED en hora punta, 4 AED fuera de punta y 0 de madrugada; paga el 22,5 % de canon a la RTA.', [1467, 1652, 1845.5, 1992.5, 2736.1]),
      lin('Multas', 'Sanciones por pasar sin saldo o sin etiqueta; no pagan canon.', [184, 202, 216.8, 236.9, 280.6]),
      lin('Activación de etiquetas', 'Venta de la etiqueta RFID (100 AED); se reconoce en cinco años.', [36, 32, 38.2, 40.9, 46.9]),
      lin('Otros (construcción de puertas, aparcamiento y varios)', 'Margen del 10 % sobre la obra de las puertas nuevas para la RTA (6,6 M en 2024), pagos de aparcamiento con el monedero de Salik (Emaar Malls, Parkonic, aeropuerto) y otros.', [6, 6.3, 8.1, 21.7, 33.3]),
    ],
    geografias: [{ nombre: 'Emirato de Dubái', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Viajes totales por las puertas (M)', valor_anterior: '638,2 (2024)', valor_actual: '852,7 (2025)', variacion: '+33,6 %', comentario: 'Diez puertas desde nov-2024; en el 1S26, 383,8 M (−9,5 %) por la guerra con Irán [A1, A4].' },
      { kpi: 'Viajes de pago (M)', valor_anterior: '318,4 (1S25)', valor_actual: '278,5 (1S26)', variacion: '−12,5 %', comentario: 'En 2025, 639,1 M; en el 2T26, −17,2 % [A4, A6].' },
      { kpi: 'Viajes en hora punta a 6 AED (M)', valor_anterior: '57,7 (2T25)', valor_actual: '49,3 (2T26)', variacion: '−14,6 %', comentario: 'Fuera de punta (4 AED) cayeron más: −18,5 % [A4].' },
      { kpi: 'Tarifa media combinada (AED por viaje de pago)', valor_anterior: '4,00 (2024)', valor_actual: '4,28 (2025)', variacion: '+7 %', comentario: 'Primer año de tarifa variable [A1].' },
      { kpi: 'Cuentas activas registradas (M)', valor_anterior: '2,7 (1S25)', valor_actual: '2,9 (1S26)', variacion: '+6,6 %', comentario: 'Crecen con la población aunque caigan los viajes [A4].' },
      { kpi: 'Multas sobre ingresos', valor_anterior: '10,3 % (2024)', valor_actual: '9,1 % (2025)', variacion: '−1,2 p.p.', comentario: 'En el 2T26 subieron al 11,0 % (+14,2 %) [A4, A6].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    adquisiciones: [
      { anio: '2022', objetivo: 'Concesión de 49 años de los peajes de Dubái (RTA), hasta 2071', importe: 4000, ev_ebitda: null, financiacion: 'Préstamo murabaha de 4.000 M de Emirates NBD a 5 años (EIBOR + 0,82 %)', resultado: 'EBITDA de 1.390 M en 2023 y 2.144 M en 2025: el pago se recupera en menos de dos años de EBITDA; sin deterioros [A1, A8].' },
      { anio: '2024', objetivo: 'Derechos de cobro de dos puertas nuevas (Business Bay y Al Safa Sur)', importe: 2734.3, ev_ebitda: null, financiacion: 'Aplazado a la RTA en 6 años (valor razonable de 2.378,6 M; 355,7 M de diferencia como aportación al patrimonio)', resultado: 'Con la tarifa variable, los ingresos por peaje subieron un 37,3 % en 2025; la empresa no publica el ingreso por puerta [A1, A6].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento del 1T25 y del 2T25', tipo: 'Complemento', intentos: '1) Comunicado del 1S26 (solo 2026 frente a 2025); 2) comunicado del 3T25 (solo el acumulado de 9 meses, +38,6 %); 3) los intermedios del 1T25 y del 2T25 no están descargados y el crecimiento por trimestre de 2024 no se publica en lo leído', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'cuenta completa de 2021 y 2022 y BPA de 2021', tipo: 'Complemento', intentos: '1) Folleto de salida a bolsa (ipo.salik.ae) no accesible desde el contenedor; 2) comunicado de 2022 (solo ingresos por línea, EBITDA y beneficio); 3) Yahoo da amortización e intereses de 2022, no de 2021', decision: 'Calculado y marcado como estimación (amortización de 2021 = EBITDA − beneficio)' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const C = Object.fromEntries(Y.comps.map((c) => [c.s, c]));
const fx = { AED: 1, EUR: Y.fx['EURAED=X'], AUD: Y.fx['AUDAED=X'], HKD: Y.fx['HKDAED=X'], USD: Y.fx['USDAED=X'], MXN: null };
const fB = [
  { id: 1, titulo: 'Annual Report 2025: Market Overview and Outlook (población de Dubái de 4,04 M en nov-2025, +5,4 %; 19,6 M de visitantes; PIB +5,0 % previsto en 2026; plan urbano 2040 con 5,8 M de habitantes), modelo de negocio y comparación con otros sistemas de peaje', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 2, titulo: 'Annual Report 2025, nota 16: acuerdo de concesión (exclusividad de puertas actuales y futuras, revisión de tarifas por el Consejo Ejecutivo, compensación por inflación vía canon, nuevas puertas a coste + 10 %, rescate voluntario de la RTA, reversión sin pago en 2071)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 3, titulo: 'Annual Report 2024: Investment Case (viajes de pago +3,1 % anual 2014-2024 frente a un PIB real del 2,4 %; población de Dubái prevista +61 % hasta 2040)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2025-03-04', url: AR24 },
  { id: 4, titulo: 'Financial Results – H1 2026 (viajes −9,5 % por los hechos regionales de finales de febrero; recuperación en abril-junio)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-08-05', url: PR2T26 },
  { id: 5, titulo: 'Salik announces 5% VAT from June 1 on toll tariff, tag activation fees (tarifa de 6 a 6,30 AED en punta; sin efecto en el beneficio)', editor: 'Khaleej Times', tipo: 'Prensa', fecha: '2026-05-22', url: 'https://www.khaleejtimes.com/uae/transport/salik-announces-5-vat-from-june-1-on-toll-tariff-tag-activation' },
  { id: 6, titulo: 'Yahoo Finance quoteSummary: ingresos y margen operativo de los últimos 12 meses de Parkin, Transurban, Atlas Arteria, Getlink y Ferrovial', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/TCL.AX/' },
  { id: 7, titulo: 'Resultados de 2022 (viajes totales 539,1 M en 2022 y 481,2 M en 2021; recuperación tras la pandemia y la Expo 2020)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2023-03-06', url: PR4T22 },
  { id: 8, titulo: 'Dubai traffic nears normal in June, with recovery gaining pace in Q2: Salik CEO', editor: 'Gulf News', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://gulfnews.com/business/markets/dubai-traffic-nears-normal-in-june-with-recovery-gaining-pace-in-q2-salik-ceo-1.500631531' },
];
const comp = (nombre, pais, s, cuota, comentario) => {
  const c = C[s];
  return { nombre, pais, ticker: s, ingresos: c?.rev && fx[c.fcur] ? Math.round(c.rev * fx[c.fcur] / 1e6) : null, cuota_pct: cuota, margen_ebit_pct: c?.opM != null ? r1(c.opM * 100) : null, comentario };
};
guarda('B', {
  _estado: 'completo',
  sector: {
    tamano: '≈ 3.097 M AED en 2025: todo el peaje urbano de Dubái lo cobra Salik [B1]',
    unidad_serie: 'millones de AED (ingresos del peaje urbano de Dubái = ingresos de Salik)',
    serie: [{ anio: '2021', tamano: 1693 }, { anio: '2022', tamano: 1892 }, { anio: '2023', tamano: 2109 }, { anio: '2024', tamano: 2292 }, { anio: '2025', tamano: 3097 }, { anio: '2026e', tamano: 3020 }, { anio: '2027e', tamano: 3231 }],
    tcac_historico_pct: 16.3,
    tcac_previsto_pct: 4.5,
    cr5_pct: 100,
    estructura: 'Concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 100,
    posicion: 'Único operador de peajes de Dubái, en exclusiva hasta 2071 para las puertas actuales y las futuras [B2]',
    competidores: [
      comp('Parkin (aparcamiento público de Dubái)', 'Emiratos', 'PARKIN.AE', null, 'Otra concesión de la RTA con el mismo modelo (49 años, canon variable); no compite por el mismo viaje, pero comparte cliente, concedente y riesgo regulatorio.'),
      comp('Transurban', 'Australia', 'TCL.AX', null, 'Autopistas urbanas de peaje en Sídney, Melbourne, Brisbane y Norteamérica; dueña de la infraestructura, con capex y deuda mucho mayores.'),
      comp('Atlas Arteria', 'Australia', 'ALX.AX', null, 'Autopistas de peaje en Francia (APRR) y EE. UU.; participadas por puesta en equivalencia, de ahí el margen operativo bajo.'),
      comp('Getlink', 'Francia', 'GET.PA', null, 'Concesión del túnel bajo el Canal hasta 2086: monopolio de infraestructura con tarifas libres.'),
      comp('Ferrovial', 'España', 'FER.MC', null, 'Autopistas de peaje (407 ETR, Managed Lanes de Texas) con tarifa dinámica, dentro de un grupo de construcción.'),
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: '2,9 M de cuentas activas y el monedero de Salik aceptado en aparcamientos (aeropuerto, Emaar, Parkonic): cuanto más se usa, más socios quieren cobrar con él; todavía es el 1 % de los ingresos [A4].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'No hay alternativa: la etiqueta RFID y la cuenta son obligatorias para circular por las diez puertas; el cambio de conducta posible es el de ruta u horario, no el de proveedor [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Concesión exclusiva de 49 años, hasta 2071, para las puertas actuales y cualquier puerta futura de Dubái [B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBITDA del 69,2 % en 2025 sin poseer la carretera: la RTA es dueña de los activos y Salik solo opera el cobro [A1, B1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un mercado que solo admite un operador: duplicar puertas no tiene sentido económico ni legal [B2].' },
      ],
    },
    confianza: 'Alta',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'segunda fuente independiente del tamaño del mercado', tipo: 'Complemento', intentos: '1) RTA y Dubai Data and Statistics (no publican ingresos de peaje aparte de Salik); 2) informes de mercado de peajes del Golfo (de pago); 3) el mercado coincide por definición con los ingresos de Salik, auditados', decision: 'Omitido: se usan las cuentas y se explica en la definición' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: Corporate Governance Report (consejo, comisiones, remuneración del consejo de 4,95 M, sueldos de la alta dirección, operaciones de consejeros en 2025, accionistas de más del 5 %, auditor y honorarios, sin infracciones)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 2, titulo: 'Annual Report 2025, nota 1 y nota 23 (Dubai Investment Fund 75,1 %; vinculadas: RTA, Emirates NBD, Dubai Taxi, ENOC; préstamo de Emirates NBD; acuerdo de servicios transitorios)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 3, titulo: 'Condensed interim financial statements 1S26, notas 21 y 34 (compensación de la RTA por el IVA histórico de 489,3 M, netada contra saldos con la RTA)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-08-05', url: FS1S26 },
  { id: 4, titulo: 'Outcome: Salik Company (PJSC) – Board of Directors Meeting (6-oct-2026): dividendo a cuenta de 9,3872 fils (704,0 M), fecha ex 15-oct-2026', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-10-06', url: `${DFM}2026/Oct/6/c9b066be-9cce-41c6-89c1-194595d8b24e/BOD%20SALIK%20%205%20For%202026%20Outcome.Pdf.pdf` },
  { id: 5, titulo: 'General Disclosure: Fitch affirms Salik at ‘A’, Outlook revised to Negative', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-07-30', url: `${DFM}2026/Jul/30/13437693-efdb-471c-848d-62e0f435b8d0/Salik%20General%20Disclosure%20%20%20%20Fitch%20Credit%20Rating.Pd.pdf` },
  { id: 6, titulo: 'Material Disclosure: renovación por 5 años del contrato de operación y mantenimiento con TransCore (gasto del 5-5,5 % de los ingresos)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-09-06', url: `${DFM}2026/Sep/6/6259165e-c048-466e-a84e-bb540c47be22/Salik%20Material%20Disclosure%20Form%20%20%20%20Transcore%20Contra.pdf` },
  { id: 7, titulo: 'Annual Report 2025: CFO Review (guía 2026 inicial: ingresos +4-6 %, margen EBITDA 68-69 %, margen neto 50-51 %; dividendos)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2026-03-04', url: AR25 },
  { id: 8, titulo: 'Salik Company (SALIK) Q2 2026 earnings summary (guía 2026 revisada: ingresos −3 % a 0 %, margen EBITDA 67,5-68,5 %, margen neto 49,5-50,5 %; refinanciación antes de jun-2027)', editor: 'Quartr', tipo: 'Datos de mercado', fecha: '2026-08-06', url: 'https://quartr.com/events/salik-company-p-j-s-c-salik-q2-2026_F3Tq5kcV' },
  { id: 9, titulo: 'Resultados de 2022 (guía 2023: viajes de pago +5-6 %, margen EBITDA 63-64 %)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2023-03-06', url: PR4T22 },
  { id: 10, titulo: 'Annual Report 2024: CFO Review (guía 2025: ingresos +28-29 % con las dos puertas nuevas y la tarifa variable)', editor: 'Salik Company P.J.S.C.', tipo: 'Primaria', fecha: '2025-03-04', url: AR24 },
  { id: 11, titulo: 'Resultados de 2023 (cumplimiento de la guía 2023)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2024-03-04', url: PR4T23 },
];
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Ibrahim Sultan Al Haddad', cargo: 'Consejero delegado (CEO)', desde: '2022', participacion_pct: null, trayectoria: 'Venía de la RTA, donde dirigió proyectos de transporte y el centro de control; llevó a Salik a bolsa en 2022, abrió dos puertas nuevas en 2024 y lanzó la tarifa variable en 2025 (ingresos +35 %). Remuneración de 3,38 M AED en 2025 [C1].' },
      { nombre: 'Maged Ibrahim', cargo: 'Director financiero (CFO)', desde: '2022', participacion_pct: null, trayectoria: 'Antes en la RTA y en banca de inversión islámica; estructuró el préstamo murabaha de 4.000 M. Remuneración de 2,35 M AED en 2025 [C1].' },
      { nombre: 'Mattar Mohammed Al Tayer', cargo: 'Presidente del consejo', desde: '2022', participacion_pct: 0.02, trayectoria: 'Director general y presidente del consejo ejecutivo de la RTA, el concedente; presidió la creación de Salik, Parkin, Dubai Taxi y Mada. Tiene 1,5 M de acciones [C1].' },
      { nombre: 'Abdulmuhsen Ibrahim Kalbat', cargo: 'Vicepresidente', desde: '2022', participacion_pct: 0.01, trayectoria: 'Presidente de Dubai Taxi; preside la comisión de auditoría. Vendió 100.000 acciones en 2025 y tenía 900.000 a final de año [C1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Viajes de pago +5-6 % y margen EBITDA del 63-64 % [C9]', real: 'Viajes de pago +11,7 % y margen EBITDA del 65,9 % [C11]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ingresos +28-29 % con las dos puertas nuevas y la tarifa variable [C10]', real: 'Ingresos +35,1 % y margen EBITDA del 69,2 % [A1]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial (mar-26): ingresos +4-6 %, margen EBITDA 68-69 %, margen neto 50-51 % [C7]', real: 'Rebajada en ago-26 a ingresos −3 % a 0 %, margen EBITDA 67,5-68,5 % y margen neto 49,5-50,5 % por la guerra con Irán; 1S26: ingresos −7,5 % [C8, A4]', cumplida: 'No' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Mattar Mohammed Al Tayer', cargo: 'Presidente', tipo: 'Otro externo', desde: '2022', comisiones: '—' },
      { nombre: 'Abdulmuhsen Ibrahim Kalbat', cargo: 'Vicepresidente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Mohammed Abdulla Lengawi', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos, retribuciones y ESG' },
      { nombre: 'Faisal Belhoul', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Inversiones' },
      { nombre: 'Moaza Saeed Al Marri', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos, retribuciones y ESG' },
      { nombre: 'Abdulla Al Madani', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Sabah Al Shamsi', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Inversiones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.38, fijo: null, variable_corto: null, variable_largo: 0, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Dubai Investment Fund (Gobierno de Dubái)', pct: 75.1, tipo: 'Control (público)', variacion: 'Sin cambios desde la salida a bolsa de 2022' },
      { nombre: 'Capital flotante (DFM)', pct: 24.9, tipo: 'Flotante', variacion: '57.928 accionistas con menos de 50.000 acciones a dic-2025; sin autocartera' },
    ],
    insiders: [
      { fecha: '2025-12-31', persona: 'Abdulmuhsen Ibrahim Kalbat (vicepresidente)', operacion: 'Venta', acciones: 100000, importe: null },
      { fecha: '2025-12-31', persona: 'Moaza Saeed Al Marri (consejera)', operacion: 'Venta', acciones: 250000, importe: null },
    ],
    alertas: [
      'El presidente, Mattar Al Tayer, es a la vez director general de la RTA, el concedente que fija el canon, aprueba las tarifas y decide las puertas nuevas; el informe anual lo clasifica como independiente [C1].',
      'Operaciones vinculadas recurrentes con la RTA (canon de 615,6 M en 2025, derechos de las puertas nuevas, compensación del IVA histórico de 489,3 M netada en 2026) y con Emirates NBD (prestamista de los 4.000 M) [C2, C3].',
      'Fitch pasó la perspectiva de A a negativa en jul-2026 por el entorno regional [C5].',
    ],
    confianza: 'Media',
  },
  consenso: {
    guidance: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la junta sobre la remuneración', tipo: 'Complemento', intentos: '1) Informe de gobierno 2025 (solo los acuerdos aprobados); 2) avisos de la junta de abr-2026 en el DFM (la API solo da los 10 últimos avisos); 3) prensa de la junta (sin porcentajes)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'fijo y variable del consejero delegado', tipo: 'Complemento', intentos: '1) Informe de gobierno 2025 (solo el total de sueldos, pluses y bonus: 3,38 M); 2) nota 23 de vinculadas (solo el total del personal clave: 11,0 M); 3) no hay informe de remuneraciones aparte', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const S = C['SALIK.AE'];
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (SALIK.AE, ETF iShares MSCI UAE y ETF de infraestructuras globales IGF), con herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/SALIK.AE/history' },
  { id: 2, titulo: 'Salik Company: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo, deuda neta), 12 analistas, consenso «Outperform», objetivo medio 6,191 AED', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://in.marketscreener.com/quote/stock/SALIK-COMPANY-144378258/finances/' },
  { id: 3, titulo: 'Yahoo Finance quoteSummary: SALIK.AE (12 analistas: 6 comprar y 6 mantener; objetivo 5,10-6,90; BPA 2026e 0,199 y 2027e 0,230) y comparables (Parkin, Transurban, Atlas Arteria, Vinci, Ferrovial, Getlink, Eiffage, Pinfra, Jiangsu y Zhejiang Expressway), tipos de cambio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/SALIK.AE/analysis' },
  { id: 4, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10): 5,15 % el 19-oct-2026', editor: 'FRED (Reserva Federal de St. Louis)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Country Default Spreads and Risk Premiums (Abu Dabi, Aa2: diferencial soberano 0,42 %, prima de país 0,64 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Interactive Brokers Expands Market Access with United Arab Emirates Equities (DFM y ADX para clientes de todo el mundo, en AED)', editor: 'Interactive Brokers (vía Business Wire)', tipo: 'Primaria', fecha: '2025-12-09', url: 'https://www.interactivebrokers.com/en/general/about/mediaRelations/12-9-25.php' },
  { id: 8, titulo: 'Condensed interim financial statements 1S26: balance a 30-jun-2026 (préstamo 3.996,8 M; derechos de las puertas nuevas 1.631,9 M; arrendamientos 4,5 M; caja 134,5 M y depósitos 460,1 M; indemnizaciones 5,3 M)', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-08-05', url: FS1S26 },
  { id: 9, titulo: 'Outcome: Board of Directors Meeting (6-oct-2026): dividendo a cuenta de 704,0 M, fecha ex 15-oct-2026', editor: 'Salik Company P.J.S.C. (DFM)', tipo: 'Primaria', fecha: '2026-10-06', url: `${DFM}2026/Oct/6/c9b066be-9cce-41c6-89c1-194595d8b24e/BOD%20SALIK%20%205%20For%202026%20Outcome.Pdf.pdf` },
];
// Comparables: múltiplos de Yahoo (mismo proveedor y fecha). PER NTM = forwardPE de Yahoo. Crecimiento = ingresos del ejercicio
// siguiente sobre el estimado en curso cuando Yahoo los da. Capitalización convertida a AED con los tipos de Yahoo del 21-oct.
const cp = (nombre, s, pais, extra = {}) => {
  const c = C[s];
  const f = fx[c.cur] ?? null;
  const y0 = c.et?.find((e) => e.p === '0y'), y1 = c.et?.find((e) => e.p === '+1y');
  const crec = y0?.rev && y1?.rev ? r1((y1.rev / y0.rev - 1) * 100) : null;
  return {
    nombre, ticker: s, pais,
    capitalizacion: f && c.mcap ? Math.round(c.mcap * f / 1e6) : null,
    ev_ventas: c.evRev ?? null, ev_ebitda_ltm: c.evEbitda ? r1(c.evEbitda) : null, ev_ebitda_ntm: null,
    per_ntm: c.fpe ? r1(c.fpe) : null, crecimiento_pct: crec, margen_ebitda_pct: c.ebitdaM ? r1(c.ebitdaM * 100) : null,
    roic_pct: null, dn_ebitda: c.debt != null && c.cash != null && c.ebitda ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf && c.mcap ? r1((c.fcf / c.mcap) * 100) : null, ...extra,
  };
};
const comparables = [
  cp('Parkin', 'PARKIN.AE', 'AE'),
  cp('Transurban', 'TCL.AX', 'AU'),
  cp('Vinci', 'DG.PA', 'FR'),
  cp('Ferrovial', 'FER.MC', 'ES'),
  cp('Getlink', 'GET.PA', 'FR'),
  cp('Eiffage', 'FGR.PA', 'FR'),
  cp('Jiangsu Expressway', '0177.HK', 'CN'),
  cp('Zhejiang Expressway', '0576.HK', 'CN'),
];
const b = bolsa.bolsa;
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Salik Company P.J.S.C.', nombre_corto: 'Salik', ticker: 'SALIK', isin: 'AEE01110S227', mercado: 'Dubai Financial Market (DFM)', indice_referencia: 'DFM General Index (DFMGI)',
    pais: 'Emiratos Árabes Unidos', pais_iso: 'AE', sector: 'Industria', industria: 'Infraestructura de transporte', sede: 'Festival Tower, Dubai Festival City, Dubái', fundacion: '2007', empleados: 62, web: 'https://www.salik.ae',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: N, capitalizacion_publicada: Math.round(S.mcap / 1e6), free_float_pct: 24.9,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M AED/día (3 meses; ≈ 5,9 M USD)`,
    proximos_resultados: null,
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 2994, ebitda: 2042, ebit: 1903, bpa: 0.199, dpa: 0.2002, fuente: 'MarketScreener, 12 analistas [D2]' },
      { periodo: '2027e', ingresos: 3229, ebitda: 2258, ebit: 2130, bpa: 0.2292, dpa: 0.2299, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 3426, ebitda: 2436, ebit: 2314, bpa: 0.2542, dpa: 0.2532, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 6, mantener: 6, vender: 0, po_medio: 6.19, po_min: 5.10, po_max: 6.90 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual,
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2022', precio_cierre: 2.58, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 3.11, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 5.40, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 6.35, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas: comparables, confianza: 'Media' },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo', tipo: 'Complemento', intentos: '1) Concesiones de peaje urbano vendidas en 5-7 años con múltiplo publicado: no hay ninguna de cobro sin activo; 2) compras de autopistas (Transurban-WestConnex, Abertis, 407 ETR) se pagan por la infraestructura con capex y plazo distintos; 3) el pago de Salik por las puertas nuevas (2.734 M) no tiene EBITDA publicado por puerta', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) DFM no publica posiciones cortas por valor; 2) el préstamo de valores en el DFM es marginal; 3) Yahoo no da dato', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ROIC de los comparables', tipo: 'Complemento', intentos: '1) Yahoo no lo da; 2) Stock Analysis (no consultado por presupuesto); 3) calcularlo exige el capital invertido de cada uno', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'fecha de los próximos resultados (3T26)', tipo: 'Complemento', intentos: '1) Avisos del DFM (la convocatoria del consejo del 3T aún no está publicada); 2) Yahoo (sin fecha); 3) calendario de 2025 (13-nov-2025)', decision: 'Omitido: se espera en la segunda semana de noviembre' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
guarda('E', {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'foros y comentarios de los últimos tres meses', tipo: 'Complemento', intentos: '1) Reddit y Stocktwits (403 desde el contenedor; Stocktwits no cubre el DFM); 2) foros árabes del DFM (Mubasher, Argaam: sin hilos legibles sin cuenta); 3) noticias.mjs con 12 meses de Google Noticias: solo prensa, sin debate de inversores', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas en', dir);
