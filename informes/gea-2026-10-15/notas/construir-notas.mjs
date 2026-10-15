// Escribe las notas A-E de GEA Group (corte 2026-10-15). Hechos con fuente; los juicios van en propio.mjs.
// Sin XBRL: filings.xbrl.org no recoge los ESEF alemanes. Cuentas copiadas de los informes anuales 2022, 2024 y 2025 (PDF y Excel de la empresa).
import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = dirname(fileURLToPath(import.meta.url));
const w = (letra, obj) => writeFileSync(join(DIR, `${letra}.json`), JSON.stringify({ _estado: 'completa', ...obj }, null, 1));
const CDN = 'https://cdn.gea.com/-/media/investors';

// ---------------- A. Cuentas ----------------
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas, notas, informe de gestión, gobierno y remuneraciones)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/annual-report-2025-en.pdf` },
  { id: 2, titulo: 'Consolidated financial statements 2025 (Excel: balance, cuenta, flujos)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/consolidated-financial-statements-2025-excel-en.xlsx` },
  { id: 3, titulo: 'Annual Report 2024 (cuentas consolidadas con 2023 comparado)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2025-03', url: `${CDN}/annual-report/2024/annual-report-2024-en.pdf` },
  { id: 4, titulo: 'Annual Report 2022 (cuentas consolidadas con 2021 comparado)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2023-03', url: `${CDN}/annual-report/2022/annual-report-2022-en.pdf` },
  { id: 5, titulo: 'Half-Yearly Financial Report 2026 y estados consolidados del 1S26 (Excel)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-08-10', url: `${CDN}/events-and-releases/quarterly-reports/2026/q2-half-year/q2-26-half-yearly-statement-gea-group-ag-en.pdf` },
  { id: 6, titulo: 'Press release Q2 2026: double-digit growth in order intake and revenue', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-08-10', url: `${CDN}/events-and-releases/quarterly-reports/2026/q2-half-year/q2-26-press-release-en.pdf` },
  { id: 7, titulo: 'Historical KPI since Q1 2024 (Excel: pedidos, ventas, EBITDA, ROCE por división y trimestre, estructura de 2026)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-08', url: `${CDN}/events-and-releases/historical-kpi-since-q1-2024.xlsx` },
  { id: 8, titulo: 'Historical key figures 2017-2023 (Excel por división y trimestre, estructura antigua)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2024-03', url: `${CDN}/annual-report/2023/historical-keyfigures.xlsx` },
  { id: 9, titulo: 'Press release Q3 2025', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2025-11-05', url: `${CDN}/events-and-releases/quarterly-reports/2025/q3/gea-q3-2025-press-release-en.pdf` },
  { id: 10, titulo: 'Quarterly Statement Q3 2024', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2024-11', url: `${CDN}/events-and-releases/quarterly-reports/2024/q3/gea-q3-2024-en.pdf` },
  { id: 11, titulo: 'Q2 2026 earnings call transcript', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-08-10', url: `${CDN}/events-and-releases/quarterly-reports/2026/q2-half-year/q2-2026-transcript-en-only.pdf` },
  { id: 12, titulo: 'Q1 2026 earnings call transcript', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-05-11', url: `${CDN}/events-and-releases/quarterly-reports/2026/q1/q1-2026-transcript-en-only.pdf` },
  { id: 13, titulo: 'Press release annual report 2025', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/press-release-annual-report-2025-en.pdf` },
];
const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, beneficio_neto, gastos_financieros, bpa, dpa, acciones_diluidas) =>
  ({ periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios: 0, beneficio_neto, gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas });
const cuenta = [
  c('2021', 4702.9, 3147.5, 1092.2, 569.3, 189.6, 379.7, -21.7, 358.1, 58.5, 305.2, 29.3, 1.70, 0.90, 180.0),
  c('2022', 5164.7, 3448.9, 1177.7, 654.0, 193.1, 461.0, -14.3, 446.7, 71.7, 401.4, 24.8, 2.28, 0.95, 175.9),
  c('2023', 5373.5, 3551.8, 1203.8, 713.8, 194.1, 519.7, -21.1, 498.6, 94.0, 392.8, 38.1, 2.28, 1.00, 172.2),
  c('2024', 5422.1, 3486.6, 1280.1, 776.7, 219.1, 557.6, -32.9, 524.7, 126.6, 385.0, 49.7, 2.30, 1.15, 167.6),
  c('2025', 5495.4, 3447.4, 1334.3, 859.0, 229.4, 629.6, -35.4, 594.2, 184.3, 414.0, 48.3, 2.54, 1.30, 163.1),
];
const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios: 0.4, reservas });
const balance = [
  b('2021', 5874.4, 2913.1, 2341.8, 3798.2, 1481.2, 381.5, 649.1, 714.9, 682.5, 725.6, 335.6, 766.2, 928.3, 262.7, 165.8, 2075.8, 282.1),
  b('2022', 5921.0, 2938.4, 2599.4, 3640.1, 1475.6, 381.8, 722.7, 846.3, 730.9, 791.8, 373.2, 844.5, 718.7, 207.1, 165.2, 2280.5, 488.4),
  b('2023', 5954.2, 2853.8, 2488.6, 3556.5, 1476.1, 392.4, 796.3, 842.4, 770.9, 769.0, 374.0, 870.3, 627.9, 101.9, 154.8, 2397.3, 628.5),
  b('2024', 6032.2, 2776.1, 2620.0, 3608.0, 1497.4, 391.1, 925.4, 775.7, 800.8, 807.6, 314.3, 752.1, 638.3, 104.2, 190.6, 2423.7, 631.4),
  b('2025', 6088.0, 2785.3, 2631.1, 3634.5, 1480.3, 454.3, 998.3, 771.2, 791.7, 893.7, 356.9, 850.2, 625.9, 0.6, 246.4, 2453.0, 770.3),
];
const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, intereses_en_financiacion) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion });
const flujos = [
  f('2021', 682.0, 129.9, 61.9, 0, 2.6, 153.4, 93.8, 12.6),
  f('2022', 469.3, 203.8, 63.7, 0, 22.3, 159.6, 205.6, 13.3),
  f('2023', 533.6, 228.4, 64.0, 6.5, 21.7, 163.7, 52.7, 13.0),
  f('2024', 710.1, 237.1, 68.3, 6.0, 2.0, 168.6, 230.5, 18.7),
  f('2025', 731.8, 255.3, 71.0, 8.0, 0, 187.2, 120.1, 21.7),
];
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
w('A', {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5640.8, ebitda: 901.3, ebit: 669.0, beneficio_neto: 434.1, bpa: 2.67, dpa: 1.30, dpa_extraordinario: 0, fcf: 422.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Ventas de 4.702,9 M EUR en 2021 a 5.495,4 M en 2025 (+4,0 % anual); el orgánico fue del 8,4 % en 2023, del 3,7 % en 2024 y del 3,7 % en 2025, y las divisas restaron en 2025 [A1, A8]. El margen EBITDA publicado pasó del 12,1 % al 15,6 %, y el de antes de reestructuración del 13,3 % al 16,5 % [A1, A13]: más servicio (40,0 % de las ventas en 2025, frente al 38,9 % de 2024) [A7], precios y la salida de proyectos de poco margen en la antigua Liquid & Powder. En el 1S26 las ventas crecieron un 5,7 % (8,2 % orgánico) y el EBITDA antes de reestructuración un 10,0 %, con margen del 16,8 % [A5, A6]. 2025 lleva un impuesto del 31 % (184,3 M) por impuestos diferidos (39,1 M de gasto frente a 25,4 M de ingreso en 2024) [A2].',
    ajustes: 'La empresa guía y comunica el EBITDA, el EBIT y el BPA «antes de gastos de reestructuración»: 55,5 M en 2021, 58,0 M en 2022, 60,5 M en 2023, 60,6 M en 2024 y 48,4 M en 2025 (diferencia entre el EBITDA antes de reestructuración y el publicado) [A7, A8]. Se repiten todos los años, así que no se tratan como no recurrentes: el informe usa las cifras publicadas. El BPA antes de reestructuración de 2025 fue de 2,74-2,75 EUR frente a 2,54 publicado; en el 1S26, 1,43 frente a 1,36 [A5]. El beneficio neto incluye las operaciones interrumpidas (5,6 M en 2021, 26,4 M en 2022, −11,8 M en 2023, −13,1 M en 2024, 4,1 M en 2025) [A2, A3, A4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1349.8, crecimiento_pct: -0.1, crecimiento_organico_pct: 1.4, ebitda: 209.2, margen_ebitda_pct: 15.5, bpa: 0.67, vs_consenso: null },
      { periodo: '4T24', ingresos: 1507.8, crecimiento_pct: 7.0, crecimiento_organico_pct: 8.7, ebitda: 209.3, margen_ebitda_pct: 13.9, bpa: 0.51, vs_consenso: null },
      { periodo: '1T25', ingresos: 1258.4, crecimiento_pct: 1.4, crecimiento_organico_pct: 0.9, ebitda: 190.9, margen_ebitda_pct: 15.2, bpa: 0.57, vs_consenso: null },
      { periodo: '2T25', ingresos: 1311.8, crecimiento_pct: -0.9, crecimiento_organico_pct: 1.5, ebitda: 207.9, margen_ebitda_pct: 15.8, bpa: 0.66, vs_consenso: null },
      { periodo: '3T25', ingresos: 1365.9, crecimiento_pct: 1.2, crecimiento_organico_pct: 4.5, ebitda: 226.9, margen_ebitda_pct: 16.6, bpa: 0.74, vs_consenso: null },
      { periodo: '4T25', ingresos: 1559.2, crecimiento_pct: 3.4, crecimiento_organico_pct: 7.2, ebitda: 233.3, margen_ebitda_pct: 15.0, bpa: 0.57, vs_consenso: null },
      { periodo: '1T26', ingresos: 1273.1, crecimiento_pct: 1.2, crecimiento_organico_pct: 5.3, ebitda: 200.5, margen_ebitda_pct: 15.7, bpa: 0.61, vs_consenso: null },
      { periodo: '2T26', ingresos: 1442.5, crecimiento_pct: 10.0, crecimiento_organico_pct: 11.0, ebitda: 240.6, margen_ebitda_pct: 16.7, bpa: 0.75, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 2T26 (10-ago) la dirección presentó pedidos de 1.494,7 M (+14,2 %; +15,4 % orgánico), ventas +11,0 % orgánico y margen EBITDA antes de reestructuración del 17,4 %, y subió por segunda vez la guía de 2026: orgánico del 6-8 %, margen del 17,0-17,4 % y ROCE del 36-40 % [A6]. El tirón vino de leche (granjas y procesado) y alimentación; todas las divisiones crecieron. Aprobó una recompra de hasta 500 M EUR hasta finales de 2027, la primera mitad desde agosto [A6]. En el 1T26 (11-may) el discurso fue más prudente: ventas +1,2 % (5,3 % orgánico) con Nutrition Plant Engineering a la baja (−7,8 %) y la guía sin cambios [A7, A12]. Los analistas preguntaron sobre todo por la sostenibilidad del margen de Pure Flow Processing con la entrada de los compresores de la antigua HRT, por los grandes proyectos (más de 15 M) en lácteos y nueva alimentación, y por el efecto de los aranceles de EE. UU.; la dirección no dio una cifra de margen por división para 2027 y remitió al objetivo de Mission 30 (17-19 % en 2030) [A11, A12]. En la llamada previa al cierre del 3T26 (5-oct) confirmó la guía y anticipó grandes pedidos (más de 15 M cada uno) por un importe de tres cifras bajas en millones [B6].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 1.2 }],
    liquidez: 'Caja de 333,2 M a 30-jun-2026 y línea sindicada de 650 M sin disponer hasta agosto de 2028, más 60 M de líneas bilaterales [A1, A5]. Liquidez neta (caja menos deuda bancaria y arrendamientos) de 70,9 M a 30-jun-2026 y de 378,9 M a cierre de 2025 [A5, A1].',
    rating: "Moody's Baa1, perspectiva estable (confirmado en junio de 2025)",
    coste_deuda_pct: 3.5,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: obligaciones de prestación definida de 574,8 M con activos de 86,8 M; provisión neta de 507,7 M en balance a cierre de 2025, sobre todo en Alemania [A1]. Provisiones de garantías 146,6 M, litigios 40,9 M y costes de seguimiento 52,8 M [A1]. Factoring sin recurso de 58,0 M y un programa de pago a proveedores (supply chain finance) voluntario [A1]. Avales bancarios disponibles de 1.036,9 M para anticipos y buena ejecución de proyectos [A5]. Pasivos de contratos (anticipos de clientes) de 850,2 M en 2025: financian buena parte del circulante de los proyectos [A2].',
    comentario: 'GEA pasó de 499,8 M de liquidez neta en 2021 a 378,9 M en 2025 tras devolver 1.430 M en dividendos y recompras en cinco años [A1, A4]; la deuda financiera (pagarés alemanes Schuldschein) quedó en cero tras amortizar 100 M en febrero de 2025, y lo que queda son 246,4 M de arrendamientos (sede de Düsseldorf) [A1]. El circulante comercial (existencias + clientes + activos de contratos − proveedores − anticipos) bajó a unos 176 M en 2025 (3,2 % de las ventas) [A2]. El 1S26 consumió caja por estacionalidad (existencias +147 M, pagos de bonus y dividendo de 211,6 M) y la liquidez neta bajó a 70,9 M, recuperando 131 M en el 2T [A5, A6].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 682 M en 2021, 469 M en 2022 (existencias +97 M con la inflación y los cuellos de botella), 534 M en 2023, 710 M en 2024 y 732 M en 2025 [A1, A3, A4]. El capex (material e intangible) subió de 130 M en 2021 a 255 M en 2025 (4,6 % de las ventas) por el programa de fábricas (nueva planta farmacéutica, ampliación de separadores y bombas de calor) [A1]; en el 1S26 bajó a 72 M (2,7 % de las ventas) al acabar esa fase [A5]. Con 71 M de pagos de arrendamientos, el FCF de 2025 fue de unos 405 M (conversión del 98 % del beneficio). Estimación propia: capex de mantenimiento ≈ amortizaciones sin derechos de uso (≈3 % de las ventas); el resto, crecimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers GmbH WPG', anios_auditor: 2, opinion: 'Favorable (sin salvedades)',
    senales: [
      { senal: 'Cambio de auditor en 2024 (de KPMG a PwC) por rotación obligatoria', nivel: 'Baja', comentario: 'Rotación legal tras diez años; sin salvedades ni reexpresiones [A1].' },
      { senal: 'Gastos de reestructuración todos los años (48-61 M)', nivel: 'Media', comentario: 'La empresa los excluye de la guía y del BPA «antes de reestructuración»; el informe usa las cifras publicadas [A7, A8].' },
      { senal: 'Factoring sin recurso (58 M) y supply chain finance', nivel: 'Baja', comentario: 'Mejoran el circulante; el factoring se suma a la deuda del puente [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparto del 40-60 % del beneficio en dividendo creciente: 0,90 EUR por 2021, 0,95 por 2022, 1,00 por 2023, 1,15 por 2024 y 1,30 por 2025 [A1]. Recompras casi seguidas: 17,69 M de acciones por 700,5 M EUR de 2021 a 2025 (de 180,5 M a 162,8 M en circulación), y un programa nuevo de hasta 500 M EUR de agosto de 2026 a finales de 2027 con amortización de las acciones [A6]. Compras pequeñas (CattleEye en granjas, 2024) [A1].',
    adquisiciones: [
      { anio: '2024', objetivo: 'CattleEye Ltd (visión artificial para ganado, Irlanda del Norte)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en Farm Technologies; importe no material (pagos por compras de 6,0 M en 2024) [A1].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Pure Flow Processing', 'Separadores, decantadores, homogeneizadores, válvulas, bombas y, desde 2026, los compresores y componentes de frío y calor de la antigua HRT.', [['2024', 1912.3, 486.8], ['2025', 1953.1, 522.4]]),
      seg('Nutrition Plant Engineering', 'Plantas llave en mano para lácteos, alimentación, bebidas, farmacia y química, más las soluciones de frío industrial y bombas de calor de la antigua HRT.', [['2024', 1962.4, 201.7], ['2025', 1954.6, 222.4]]),
      seg('Pharma & Food Applications', 'Equipos para farmacia (liofilizadores, comprimidoras) y procesado de alimentos (carne, panadería, envasado).', [['2024', 1007.1, 103.0], ['2025', 1058.3, 140.7]]),
      seg('Farm Technologies', 'Ordeño automático y convencional, alimentación y gestión digital de rebaños.', [['2024', 773.2, 118.6], ['2025', 763.4, 113.0]]),
      seg('Otros y consolidación', 'Centro corporativo y eliminaciones entre divisiones.', [['2024', -232.9, -72.8], ['2025', -234.0, -91.1]]),
    ],
    geografias: [
      { nombre: 'Asia-Pacífico', peso_pct: 20.75 }, { nombre: 'Norteamérica', peso_pct: 20.10 }, { nombre: 'DACH y Europa del Este', peso_pct: 19.39 },
      { nombre: 'Europa occidental, Oriente Medio y África', peso_pct: 17.10 }, { nombre: 'Norte y centro de Europa', peso_pct: 15.59 }, { nombre: 'Latinoamérica', peso_pct: 7.07 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (M EUR)', valor_anterior: '5.553,0', valor_actual: '5.924,1', variacion: '+6,7 %', comentario: 'Récord; 2026 apunta a más de 6.000 M [A1, B6].' },
      { kpi: 'Cartera de pedidos (M EUR)', valor_anterior: '3.127,3', valor_actual: '3.339,2', variacion: '+6,8 %', comentario: '3.540,4 M a junio de 2026 (+13,1 %) [A7, A6].' },
      { kpi: 'Peso del servicio en ventas', valor_anterior: '38,9 %', valor_actual: '40,0 %', variacion: '+1,1 pp', comentario: 'Objetivo de 2030: 40 % y 2.900 M [A1, A7].' },
      { kpi: 'Margen EBITDA antes de reestructuración', valor_anterior: '15,4 %', valor_actual: '16,5 %', variacion: '+1,1 pp', comentario: 'Guía 2026: 17,0-17,4 % [A1, A6].' },
      { kpi: 'ROCE (media de cuatro trimestres)', valor_anterior: '33,8 %', valor_actual: '36,2 %', variacion: '+2,4 pp', comentario: '36,8 % en el 2T26 [A1, A6].' },
      { kpi: 'Frío y calor (antigua HRT): ventas (M EUR)', valor_anterior: '603,3', valor_actual: '624,6', variacion: '+3,5 %', comentario: 'Margen EBITDA antes de reestructuración del 14,3 % y ROCE del 57,4 %; disuelta el 31-dic-2025 [A1].' },
    ],
  },
  fuentes: fA,
});

// ---------------- B. Sector y competencia ----------------
const fB = [
  { id: 1, titulo: 'Food Processing Equipment Market: Size and Share Analysis 2025-2032', editor: 'Coherent Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://coherentmi.com/industry-reports/food-processing-equipment-market/market-size' },
  { id: 2, titulo: 'Food Processing Equipment Market to Reach $103.82 Billion by 2031', editor: 'Meticulous Research', tipo: 'Sectorial', fecha: '2024', url: 'https://meticulousresearch.com/pressrelease/185/food-processing-equipment-market-2031' },
  { id: 3, titulo: 'Annual Report 2025: estructura de grupo, divisiones, Mission 30 y análisis de escenarios climáticos (bombas de calor)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/annual-report-2025-en.pdf` },
  { id: 4, titulo: 'Ficha sectorial «Transferencia de calor y separación de fluidos» (comparables del 14-oct-2026, Yahoo Finance)', editor: 'Repositorio analisis-inversion (sectores/transferencia-calor-2026-10-14.md)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/transferencia-calor-2026-10-14.md' },
  { id: 5, titulo: 'Shaping our next chapter (presentación de la nueva estructura de cuatro divisiones, cifras pro forma 2024)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2025-10-07', url: `${CDN}/events-and-releases/quarterly-reports/2025/presentation/gea-group-shaping-our-next-chapter.pdf` },
  { id: 6, titulo: 'GEA-Aktie steigt auf neuen Höchststand (llamada previa al cierre del 3T26)', editor: 'ms-aktuell.de (dpa-AFX)', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://ms-aktuell.de/welt/gea-aktie-rekordhoch-06-10-2026/' },
  { id: 7, titulo: 'Krones AG: informe del repositorio con transacciones del sector de maquinaria para alimentación y bebidas (Marel, Wenger, Scholle IPN, Welbilt, Netstal)', editor: 'Repositorio analisis-inversion (informes/krones-2026-10-09)', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://github.com/HotisS/analisis-inversion/tree/main/informes/krones-2026-10-09' },
];
w('B', {
  sector: {
    tamano: '≈ 51.600 M EUR en 2025 (57.860 M USD) para el equipo de procesado de alimentos (Coherent Market Insights) [B1]; Meticulous Research lo lleva a 103.820 M USD en 2031 con un 5,6 % anual [B2].',
    unidad_serie: 'millones de EUR (Coherent, a 1,1208 USD/EUR)',
    serie: [{ anio: '2025', tamano: 51624 }, { anio: '2026e', tamano: 53947 }, { anio: '2027e', tamano: 56375 }, { anio: '2028e', tamano: 58912 }, { anio: '2029e', tamano: 61563 }, { anio: '2030e', tamano: 64333 }],
    tcac_historico_pct: null, tcac_previsto_pct: 4.5, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Población y consumo de proteína y lácteos', efecto: '+', horizonte: 'Estructural', evidencia: 'Lácteos (granja y procesado) lideraron los pedidos de 2025 y del 2T26 (+15,4 % orgánico) [B3].' },
      { driver: 'Descarbonización del calor de proceso (bombas de calor industriales)', efecto: '+', horizonte: 'Estructural', evidencia: 'GEA supone un 13 % anual de crecimiento del mercado de bombas de calor industriales hasta 2035 en su análisis de escenarios [B3].' },
      { driver: 'Gases refrigerantes naturales (amoníaco, CO2) por el reglamento europeo de gases fluorados', efecto: '+', horizonte: 'Estructural', evidencia: 'La antigua HRT creció un 4,7 % orgánico en 2025 con margen del 14,3 % [B3].' },
      { driver: 'Inversión en farmacia (inyectables, liofilización)', efecto: '+', horizonte: 'Cíclico', evidencia: 'Pharma & Food Applications pasó de 103 a 141 M de EBITDA en 2025 [B3].' },
      { driver: 'Ciclo de inversión de la industria alimentaria y tipos de interés', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Los pedidos de más de 15 M oscilan mucho: 437 M en 2024 y 561 M en 2025 [B3].' },
      { driver: 'Aranceles de EE. UU. y China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Norteamérica es el 20 % de las ventas; GEA dice que repercute los aranceles [B3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Mercado fragmentado (Tetra Pak, Alfa Laval, JBT Marel, Krones, Bühler, SPX Flow); en plantas llave en mano se compite por precio, en separadores no [B2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes lácteas y alimentarias negocian los proyectos; el servicio (40 % de las ventas) es cautivo [B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Acero inoxidable y componentes estándar; GEA mantuvo margen bruto en 2022-2023 [B3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Referencias, homologaciones higiénicas y farmacéuticas y base instalada; los chinos entran en gama baja.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto físico para separar, secar o enfriar alimentos a escala industrial.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Los pedidos de GEA crecieron un 6,7 % en 2025 y un 8,3 % en el 1S26, con la cartera en 3.540 M (+13,1 %) [B3]. En 2020 las ventas cayeron un 5,0 % (4.635 M frente a 4.880 M en 2019) y el EBITDA antes de reestructuración subió [B3]; en 2022-2023 creció un 9,8 % y un 4,0 % con precios. 2008-09: n.d. con fuente primaria leída.' },
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.6,
    posicion: 'Uno de los mayores proveedores mundiales de sistemas para alimentación, bebidas y farmacia; número 1 o 2 en separadores centrífugos, ordeño y liofilización (estimación propia con la cuota sobre el mercado de Coherent: 5.495 M EUR sobre ≈51.600 M).',
    competidores: [
      { nombre: 'Alfa Laval', pais: 'Suecia', ticker: 'ALFA', ingresos: 6242, cuota_pct: null, margen_ebit_pct: null, comentario: 'Separadores e intercambiadores; rival directo en Pure Flow (ventas 2025 de 69.674 M SEK a 11,1765) [B4].' },
      { nombre: 'JBT Marel', pais: 'EE. UU.', ticker: 'JBTM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Procesado de carne, pescado y aves; rival en Pharma & Food Applications [B7].' },
      { nombre: 'Krones', pais: 'Alemania', ticker: 'KRN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Plantas de bebidas y cervecerías; rival en Nutrition Plant Engineering [B7].' },
      { nombre: 'Tetra Pak (Tetra Laval)', pais: 'Suiza/Suecia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival principal en procesado de leche; no cotiza [B2].' },
      { nombre: 'SPX Flow (Lone Star)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bombas, válvulas y homogeneizadores; no cotiza desde 2022 [B2].' },
      { nombre: 'Johnson Controls (frío industrial Frick/Sabroe)', pais: 'EE. UU.', ticker: 'JCI', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en compresores y plantas de frío industrial con amoníaco.' },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-04', objetivo: 'Marel hf. (equipos de procesado de alimentos, Islandia)', comprador: 'John Bean Technologies (JBT)', ev: 3461, ev_ventas: 2.04, ev_ebitda: 19.9, prima_pct: null, excluir: false, comentario: 'Oferta de 3,60 EUR por acción más deuda; EBITDA de los últimos 12 meses [B7].' },
      { fecha: '2022-04', objetivo: 'Wenger Manufacturing (extrusoras para alimentos y piensos)', comprador: 'Marel hf.', ev: 462, ev_ventas: null, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'Múltiplo de la tabla de operaciones precedentes del folleto de JBT [B7].' },
      { fecha: '2022-02', objetivo: 'Scholle IPN (envases flexibles)', comprador: 'SIG Group', ev: 1362, ev_ventas: 2.87, ev_ebitda: 15.1, prima_pct: null, excluir: false, comentario: 'EBITDA ajustado de 2021 [B7].' },
      { fecha: '2021-07', objetivo: 'Welbilt (equipos de cocina profesional, EE. UU.)', comprador: 'Ali Group', ev: 4060, ev_ventas: null, ev_ebitda: 21.0, prima_pct: null, excluir: false, comentario: 'Múltiplo de la tabla de operaciones precedentes del folleto de JBT [B7].' },
      { fecha: '2025-07', objetivo: 'Chart Industries (equipos criogénicos y de transferencia de calor)', comprador: 'Baker Hughes', ev: 12128, ev_ventas: 3.24, ev_ebitda: 13.6, prima_pct: null, excluir: false, comentario: '13.600 M USD sobre EBITDA ajustado de 1.000 M USD de 2024 [B4].' },
    ],
    confianza: 'Media',
  },
  historia: {
    resumen: 'GEA es el antiguo grupo Metallgesellschaft, que desde mediados de los 2000 se concentró en maquinaria y plantas para alimentación, bebidas y farmacia. En 2019 perdió dinero (EBIT de −109 M por deterioros y reestructuración) [A8]. Stefan Klebert, consejero delegado desde el 15-nov-2018, simplificó la organización, lanzó Mission 26 en 2021 (cumplida a finales de 2024, dos años antes) y Mission 30 en el día del inversor de octubre de 2024 [C5, B3]. GEA entró en el DAX y el 7-oct-2025 anunció la reorganización en cuatro divisiones, con la disolución de Heating & Refrigeration Technologies el 31-dic-2025 [B3, B5].',
    hitos: [
      { anio: '2018', hito: 'Stefan Klebert, consejero delegado (15-nov); empieza la reestructuración [C2].' },
      { anio: '2019', hito: 'Pérdidas: EBIT de −109 M con deterioros en la antigua división de alimentación [A8].' },
      { anio: '2021', hito: 'Mission 26 y primer programa de recompras (93,8 M EUR) [C3].' },
      { anio: '2024', hito: 'Mission 26 cumplida dos años antes; Mission 30: más del 5 % de crecimiento orgánico, margen EBITDA del 17-19 % y ROCE de más del 45 % en 2030 [C5, B3].' },
      { anio: '2025', hito: 'Entrada en el DAX; el fondo soberano de Kuwait supera el 10 %; anuncio de cuatro divisiones desde 2026 [B3, B5].' },
      { anio: '2026', hito: 'HRT se reparte entre Pure Flow Processing (compresores) y Nutrition Plant Engineering (plantas de frío y bombas de calor); recompra de hasta 500 M [B3, A6].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    controversias: 'Sin sanciones ni litigios relevantes en 2023-2026 en el informe anual; provisiones de litigios de 40,9 M a cierre de 2025 [B3].',
    confianza: 'Media',
  },
  fuentes: fB,
});

// ---------------- C. Gobierno y directivos ----------------
const fC = [
  { id: 1, titulo: 'Annual Report 2025: órganos de gobierno, informe del consejo de supervisión, accionariado', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/annual-report-2025-en.pdf` },
  { id: 2, titulo: 'Corporate Governance Report 2025 (incluye el informe de remuneraciones)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-03', url: `${CDN}/annual-report/2025/corporate-governance-report-2025-en.pdf` },
  { id: 3, titulo: 'Share buyback: acciones adquiridas por año e información del programa 2026/2027', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.gea.com/en/investors/share-information/share-buyback/' },
  { id: 4, titulo: 'Kuwaitischer Staatsfonds will GEA-Anteil verringern: 5 Millionen Aktien im Angebot', editor: 'Goldesel (con dpa-AFX)', tipo: 'Prensa', fecha: '2026-09-02', url: 'https://goldesel.de/aktien/news/kuwaitischer-staatsfonds-will-gea-anteil-verringern-5-millionen-aktien-im-angebot' },
  { id: 5, titulo: 'Annual Report 2024 y Quarterly Statement Q3 2024 (previsión frente a real de 2024; Mission 26)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2025-03', url: `${CDN}/annual-report/2024/annual-report-2024-en.pdf` },
];
const sb = (nombre, cargo, tipo, comisiones) => ({ nombre, cargo, tipo, desde: null, comisiones });
w('C', {
  directivos: {
    equipo: [
      { nombre: 'Stefan Klebert', cargo: 'Consejero delegado (CEO) y responsable de Farm Technologies', desde: '2018', participacion_pct: null, trayectoria: 'En GEA desde el 15-nov-2018: margen EBITDA antes de reestructuración del 11,0 % (2019) al 16,5 % (2025) y ROCE de menos del 15 % al 36,2 %; contrato prorrogado hasta el 31-dic-2028 [C1, C2].' },
      { nombre: 'Alexander Kocherscheidt', cargo: 'Director financiero (CFO)', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero desde el 1-nov-2025; sin historial medible todavía en el cargo [C1, C2].' },
      { nombre: 'Peter Lauwers', cargo: 'CEO de división (Pure Flow Processing)', desde: '2026', participacion_pct: null, trayectoria: 'Miembro del consejo de dirección; su división (antes Separation & Flow) tuvo un margen EBITDA antes de reestructuración del 28,5 % en 2025 [C1].' },
      { nombre: 'Kai Becker', cargo: 'CEO de división (Nutrition Plant Engineering)', desde: '2026', participacion_pct: null, trayectoria: 'Lleva las plantas llave en mano y el frío industrial heredado de HRT [C1].' },
      { nombre: 'Klaus Stojentin', cargo: 'CEO de división (Pharma & Food Applications)', desde: '2026', participacion_pct: null, trayectoria: 'La división subió su margen EBITDA del 10,2 % al 13,3 % en 2025 [C1].' },
      { nombre: 'Prof. Dieter Kempf', cargo: 'Presidente del consejo de supervisión', desde: null, participacion_pct: null, trayectoria: 'Presidente del consejo de supervisión y de sus comisiones de presidencia y del art. 27 [C1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Orgánico +2 a +4 %; margen EBITDA antes de reestructuración 14,5-14,8 % (subida dos veces a 15,4-15,6 %); ROCE 29-34 % (subido a 32-35 %)', real: 'Orgánico +3,7 %; margen 15,4 %; ROCE 33,8 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Orgánico +1 a +4 % (subido a +2 a +4 %); margen 15,6-16,0 % (subido a 16,2-16,4 %); ROCE 30-35 % (subido a 34-38 %)', real: 'Orgánico +3,7 %; margen 16,5 %; ROCE 36,2 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Orgánico +5 a +7 %, margen 16,6-17,2 %, ROCE 34-38 %; subida en julio a +6 a +8 %, 17,0-17,4 % y 36-40 %', real: '1S26: orgánico +8,2 %, margen 16,8 %, ROCE 36,8 %', cumplida: 'Parcial' },
      { anio: '2021-2024', guia: 'Mission 26 (2021): objetivos de crecimiento, margen y ROCE para 2026', real: 'Cumplidos a finales de 2024, dos años antes', cumplida: 'Sí' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      sb('Prof. Dieter Kempf', 'Presidente del consejo de supervisión', 'Independiente', 'Presidencia y sostenibilidad (preside); comisión del art. 27 MitbestG (preside); nombramientos'),
      sb('Rainer Gröbel', 'Vicepresidente (representante de los trabajadores)', 'Otro externo', 'Presidencia y sostenibilidad; art. 27 MitbestG'),
      sb('Prof. Dr. Annette G. Köhler', 'Consejera', 'Independiente', 'Auditoría y ciberseguridad (preside; experta financiera)'),
      sb('Prof. Dr.-Ing. Jürgen Fleischer', 'Consejero', 'Independiente', 'Art. 27 MitbestG'),
      sb('Holly Lei', 'Consejera', 'Independiente', null),
      sb('Andreas Renschler', 'Consejero', 'Independiente', null),
      sb('Prof. Dr.-Ing. Axel Stepken', 'Consejero', 'Independiente', 'Presidencia y sostenibilidad'),
      sb('Roger Falk', 'Consejero (presidente del comité de empresa del grupo)', 'Otro externo', 'Presidencia y sostenibilidad'),
      sb('Claudia Claas', 'Consejera (representante de los trabajadores, hasta feb-2026)', 'Otro externo', 'Art. 27 MitbestG'),
      sb('Michael Kämpfert', 'Consejero (representante de los trabajadores)', 'Otro externo', null),
      sb('Brigitte Krönchen', 'Consejera (representante de los trabajadores)', 'Otro externo', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 87.49, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 4.03, fijo: 1.87, variable_corto: 0.86, variable_largo: 1.30, ratio_salario_medio: null },
    remuneracion: 'Remuneración objetivo del consejero delegado de 4,03 M EUR: fijo de 1,44 M, beneficios de 0,03 M, aportación a pensiones de 0,40 M, variable anual de 0,86 M y variable a largo plazo de 1,30 M [C2]. El variable a largo plazo es un plan de acciones de rendimiento a cuatro años que paga según el rendimiento total para el accionista relativo frente al DAX 50 ESG (60 %) y objetivos de sostenibilidad; hay obligación de tener acciones [C2]. La junta de abril de 2025 aprobó el informe de remuneraciones con un 87,85 % y la política con un 87,49 % [C2]. La salida anticipada del CFO anterior en 2025 tuvo indemnización [C2].',
    accionistas: [
      { nombre: 'Kuwait Investment Office (KIA)', pct: 7.5, tipo: 'Fondo soberano', variacion: 'Superó el 10 % el 21-may-2025 (17,09 M de acciones); el 2-sep-2026 colocó unos 5 M de acciones a 64,85-65,50 EUR, y quedaría en torno al 7,5 % [C1, C4].' },
      { nombre: 'Autocartera', pct: 9.8, tipo: 'Autocartera', variacion: '17,69 M de acciones compradas de 2021 a 2025 sobre 180,5 M emitidas; recompra nueva desde el 10-ago-2026 [C3].' },
      { nombre: 'Inversores institucionales', pct: 77.3, tipo: 'Institucionales (EE. UU. 36,8 %)', variacion: 'Análisis de diciembre de 2025 [C1].' },
    ],
    insiders: [],
    alertas: ['Ninguna relevante detectada tras revisar el informe anual 2025 y el informe de gobierno; colocación del 3 % por el fondo soberano de Kuwait el 2-sep-2026 [C4].'],
    confianza: 'Media',
  },
  fuentes: fC,
});

// ---------------- D. Mercado y valoración ----------------
const fD = [
  { id: 1, titulo: 'Históricos diarios de G1A.DE, EXS1.DE (DAX) y EXH4.DE (STOXX Europe 600 Industrial Goods & Services) hasta el 15-oct-2026 (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/G1A.DE/history' },
  { id: 2, titulo: 'GEA Group (ETR:G1A): previsiones y objetivos de los analistas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/etr/G1A/forecast/' },
  { id: 3, titulo: 'GEA Aktie: consenso de 17 analistas (objetivo medio 66,88 EUR, 26-jul-2026) y cambios de objetivo tras el 2T26', editor: 'Börse Express', tipo: 'Analistas', fecha: '2026-07-26', url: 'https://www.boerse-express.com/news/articles/gea-aktie-prognoseanhebung-vom-21-juli-932559' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 3,45 % el 15-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 5, titulo: 'Tipos de cambio de referencia del 15-oct-2026 (1,1208 USD/EUR; 11,1765 SEK/EUR; 0,9305 CHF/EUR; 0,8461 GBP/EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Comparables del sector (capitalización, EV/EBITDA, PER de los próximos 12 meses del consenso de Yahoo, 14-oct-2026)', editor: 'Repositorio analisis-inversion (sectores/transferencia-calor-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/transferencia-calor-2026-10-14-comparables.json' },
  { id: 8, titulo: 'Interim report on the share buyback, 28-sep a 2-oct-2026 (126.500 acciones)', editor: 'GEA Group AG vía EQS / Deutsche Börse', tipo: 'Primaria', fecha: '2026-10-05', url: 'https://live.deutsche-boerse.com/nachrichten/EQS-CMS-GEA-Group-Aktiengesellschaft-Veroeffentlichung-einer-Kapitalmarktinformation-882e814b-aa76-4064-9513-21b0da37cfe4' },
  { id: 9, titulo: 'Financial calendar (Q3 2026 Quarterly Statement: 9-nov-2026)', editor: 'GEA Group AG', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.gea.com/en/investors/calendar/' },
];
const SEK = 11.1765;
const comp = (nombre, ticker, pais, capSEK, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct) =>
  ({ nombre, ticker, pais, capitalizacion: Math.round(capSEK / SEK), ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct });
w('D', {
  identificacion: {
    nombre: 'GEA Group Aktiengesellschaft', nombre_corto: 'GEA', ticker: 'G1A', isin: 'DE0006602006', mercado: 'Xetra (Fráncfort)', indice_referencia: 'DAX',
    pais: 'Alemania', pais_iso: 'DE', sector: 'Industria', industria: 'Maquinaria', sede: 'Düsseldorf', fundacion: '1881', empleados: 18628, web: 'https://www.gea.com',
    precio: 69.05, fecha_precio: '2026-10-15', acciones: 161.7, capitalizacion_publicada: null, free_float_pct: 89.5,
    max_52s: 70.0, min_52s: 53.45, volumen_medio_diario: '≈ 23,4 M EUR/día (3 meses)', proximos_resultados: '2026-11-09',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 5870, ebitda: null, ebit: null, bpa: 3.38, dpa: null, fuente: 'Stock Analysis, 14 analistas [D2]' },
      { periodo: '2027e', ingresos: 6170, ebitda: null, ebit: null, bpa: 3.76, dpa: null, fuente: 'Stock Analysis [D2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 70.83, po_min: 53.0, po_max: 79.0 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 22.1, indice_pct: 3.0, sector_pct: 8.5 }, { periodo: '1 año', accion_pct: 14.7, indice_pct: 4.4, sector_pct: 8.6 },
      { periodo: '3 años (anual.)', accion_pct: 30.7, indice_pct: 18.1, sector_pct: 20.6 }, { periodo: '5 años (anual.)', accion_pct: 14.0, indice_pct: 9.6, sector_pct: 10.2 },
      { periodo: '10 años (anual.)', accion_pct: 6.5, indice_pct: 8.5, sector_pct: 11.8 },
    ],
    anual: [
      { anio: '2016', accion_pct: 4.2, indice_pct: 5.7 }, { anio: '2017', accion_pct: 6.9, indice_pct: 11.7 }, { anio: '2018', accion_pct: -42.3, indice_pct: -18.8 },
      { anio: '2019', accion_pct: 35.5, indice_pct: 24.7 }, { anio: '2020', accion_pct: 2.9, indice_pct: 3.0 }, { anio: '2021', accion_pct: 68.2, indice_pct: 15.2 },
      { anio: '2022', accion_pct: -18.6, indice_pct: -12.8 }, { anio: '2023', accion_pct: 0.9, indice_pct: 19.5 }, { anio: '2024', accion_pct: 30.3, indice_pct: 18.1 },
      { anio: '2025', accion_pct: 23.3, indice_pct: 22.6 },
    ],
    beta: 0.85, volatilidad_pct: 22.4, max_drawdown_pct: -33.1, posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 48.09, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 38.20, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 37.69, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 47.82, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 57.80, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Fabricantes europeos y estadounidenses de equipos de proceso con servicio sobre base instalada: separación, intercambio de calor, bombas, válvulas y compresores, los que compiten con Pure Flow Processing y el frío industrial de GEA. Datos de Yahoo del 14-oct-2026 de la ficha sectorial del repositorio, pasados a EUR con el BCE del 15-oct [D7, D5]. Fuera Krones y JBT Marel (sin datos homogéneos del mismo proveedor a esta fecha) y Belimo (sensores de edificios, PER de 35x que distorsiona).',
    empresas: [
      comp('Alfa Laval', 'ALFA', 'SE', 242953, 3.68, 17.8, 23.9, 6.0, 20.7, 14.0, 1.2, null),
      comp('SPX Technologies', 'SPXC', 'US', 83993, 3.66, 17.0, 17.8, 19.4, 21.6, 10.3, 1.18, 3.6),
      comp('Wärtsilä', 'WRT1V', 'FI', 194187, 2.31, 14.7, 23.3, -1.0, 15.7, 21.0, -1.39, 7.6),
      comp('Atlas Copco', 'ATCO A', 'SE', 1019144, 6.17, 23.3, 28.7, 16.3, 26.5, 19.7, 0.66, 2.5),
      comp('Spirax Group', 'SPX', 'GB', 71476, 3.49, 14.4, 20.8, 5.6, 24.2, 9.2, 1.61, 4.2),
      comp('Sulzer', 'SUN', 'CH', 69686, 1.79, 11.3, 16.2, 4.8, 15.8, 13.3, 0.72, 3.1),
      comp('Xylem', 'XYL', 'US', 239092, 2.85, 14.0, 16.8, 3.4, 20.4, 7.3, 1.06, 4.0),
      comp('Ingersoll Rand', 'IR', 'US', 301407, 4.33, 17.2, 20.3, 4.9, 25.2, 6.1, 2.09, 4.0),
    ],
    confianza: 'Media',
  },
  fuentes: fD,
});

w('E', { sentimiento: null, fuentes: [] });
console.log('Notas A-E escritas en', DIR);
