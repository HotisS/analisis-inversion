// Escribe las notas A-E de SFS Group (corte 2026-10-15) a partir de los PDF de la empresa leídos en notas/docs
// (informes anuales 2022-2025, semestrales 2025-2026, día del inversor 2026, acta de la junta 2026) y de fuentes de mercado.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/sfs-group-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const W = 'https://www.sfs.com/downloads/investor-relations';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas Swiss GAAP FER, notas, gobierno y remuneración)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-03-06', url: `${W}/publications/annual-report-2025.pdf` },
  { id: 2, titulo: 'Half-Year Report 2026 (cuentas del 1S26 sin auditar)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-07-23', url: `${W}/publications/half-year-report-2026.pdf` },
  { id: 3, titulo: 'Annual Report 2024', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2025-03-07', url: `${W}/publications/annual-report-2024.pdf` },
  { id: 4, titulo: 'Annual Report 2023 (cuenta, balance y flujos 2023 y 2022; cifras clave 2019-2023)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2024-03-08', url: `${W}/publications/annual-report-2023.pdf` },
  { id: 5, titulo: 'Annual Report 2022, Financial report (cuentas 2022 y 2021; compra de Hoffmann SE)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2023-03-10', url: `${W}/publications-archive/2022/finanzbericht.pdf` },
  { id: 6, titulo: 'Half-Year Report 2025', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2025-07-23', url: `${W}/publications/halbjahresbericht-2025.pdf` },
  { id: 7, titulo: 'Investor Day 2026: presentación (guía a medio plazo, asignación de capital, programa de red productiva)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-09-17', url: `${W}/publikationen/presentation-investor-day-2026.pdf` },
  { id: 8, titulo: 'SFS Provides Insights Into Business Areas at Investor Day (bono de 250 M CHF al 1,2 % a siete años; calificaciones)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-09-16', url: 'https://www.sfs.com/ch/en/media-newsroom/sfs-provides-insights-into-business-areas-at-investor-day.html' },
  { id: 9, titulo: 'Ad hoc: SFS acquires Heartland Precision Fasteners (ventas de unos 30 M USD; precio confidencial)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-07-10', url: 'https://www.sfs.com/news/pdfs/2026-07-10-ad-hoc-mitteilung-2.pdf' },
  { id: 10, titulo: 'Analyst consensus on results of SFS Group AG: 1H2026 E (ocho bancos)', editor: 'SFS Group AG (Investor Relations)', tipo: 'Analistas', fecha: '2026-07-13', url: `${W}/consensus/analyst-expectations_1h2026.pdf` },
];

// Cuenta por naturaleza (Swiss GAAP FER). coste_ventas = materiales − variación de existencias de producto (aprovisionamientos netos).
// resultado_financiero incluye la participación en asociadas para que BAI cuadre con el publicado.
const cuenta = [
  { periodo: '2021', ingresos: 1897.3, coste_ventas: 665.5, gastos_generales: null, ebitda: 407.1, amortizaciones: 105.4, ebit: 301.7, resultado_financiero: 0.0, bai: 301.7, impuestos: 53.7, minoritarios: 4.2, beneficio_neto: 243.8, gastos_financieros: 1.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -3.1, bpa: 6.51, dpa: 2.20, dpa_extraordinario: 0, acciones_diluidas: 37.46 },
  { periodo: '2022', ingresos: 2738.7, coste_ventas: 1166.2, gastos_generales: null, ebitda: 448.1, amortizaciones: 117.8, ebit: 330.3, resultado_financiero: 7.5, bai: 337.8, impuestos: 67.2, minoritarios: 3.9, beneficio_neto: 266.7, gastos_financieros: 9.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 22.9, bpa: 6.95, dpa: 2.50, dpa_extraordinario: 0, acciones_diluidas: 38.365 },
  { periodo: '2023', ingresos: 3073.0, coste_ventas: 1333.5, gastos_generales: null, ebitda: 486.0, amortizaciones: 127.4, ebit: 358.6, resultado_financiero: -6.4, bai: 352.2, impuestos: 83.7, minoritarios: 2.5, beneficio_neto: 266.0, gastos_financieros: 20.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.84, dpa: 2.50, dpa_extraordinario: 0, acciones_diluidas: 38.887 },
  { periodo: '2024', ingresos: 3031.1, coste_ventas: 1278.8, gastos_generales: null, ebitda: 479.8, amortizaciones: 129.6, ebit: 350.2, resultado_financiero: -23.9, bai: 326.3, impuestos: 83.6, minoritarios: 1.4, beneficio_neto: 241.3, gastos_financieros: 18.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.21, dpa: 2.50, dpa_extraordinario: 0, acciones_diluidas: 38.883 },
  { periodo: '2025', ingresos: 3045.4, coste_ventas: 1293.3, gastos_generales: null, ebitda: 466.6, amortizaciones: 142.3, ebit: 324.3, resultado_financiero: -24.6, bai: 299.7, impuestos: 79.5, minoritarios: 1.2, beneficio_neto: 219.0, gastos_financieros: 14.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 46.7, bpa: 5.63, dpa: 2.50, dpa_extraordinario: 0, acciones_diluidas: 38.860 },
];

// Balance: Swiss GAAP FER compensa el fondo de comercio contra el patrimonio. Para medir el capital invertido como la propia empresa
// (su ROIC suma al patrimonio el fondo de comercio compensado [1, p. 195]) lo reponemos: fondo_comercio = compensado acumulado,
// y lo sumamos al activo, al patrimonio y a las reservas. Sin arrendamientos en balance (FER: operativos fuera; el alquiler va en el EBITDA).
const gw = { 2021: 1022.7, 2022: 1509.6, 2023: 1518.5, 2024: 1526.1, 2025: 1524.1 };
const b = (periodo, at, ac, pc, pt, intang, ppe, exist, cli, prov, caja, deuda, pn, min, res) => ({
  periodo, activo_total: +(at + gw[periodo]).toFixed(1), activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt,
  fondo_comercio: gw[periodo], intangibles: intang, inmovilizado_material: ppe, existencias: exist, clientes: cli, proveedores: prov,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: 0,
  patrimonio_neto: +(pn + gw[periodo]).toFixed(1), minoritarios: min, reservas: +(res + gw[periodo]).toFixed(1),
});
const historico = [
  b('2021', 1839.1, 1028.8, 298.7, 388.7, 28.4, 702.0, 378.8, 313.6, 126.0, 286.0, 6.8, 1431.7, 18.7, 1423.7),
  b('2022', 2574.2, 1394.5, 498.6, 1270.6, 57.7, 1001.5, 630.6, 412.7, 202.6, 221.5, 699.2, 1284.7, 18.9, 1102.5),
  b('2023', 2546.8, 1354.7, 440.9, 1171.1, 59.4, 991.9, 550.9, 458.5, 186.9, 227.5, 672.8, 1357.4, 18.3, 1223.8),
  b('2024', 2612.2, 1384.2, 672.9, 1053.0, 65.3, 1037.2, 552.4, 468.4, 168.0, 224.6, 559.6, 1541.4, 17.8, 1459.0),
  b('2025', 2512.7, 1368.8, 446.4, 893.9, 54.9, 963.5, 552.6, 474.9, 175.8, 209.8, 374.6, 1600.9, 17.9, 1566.1),
];

const flujos = [
  { periodo: '2021', flujo_operativo: 324.5, capex: 121.4, pagos_arrendamientos: 0, adquisiciones: 7.6, desinversiones: 15.6, dividendos: 67.5, recompras: 8.3, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 287.9, capex: 171.0, pagos_arrendamientos: 0, adquisiciones: 519.1, desinversiones: 1.4, dividendos: 82.0, recompras: 19.5, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 313.4, capex: 174.0, pagos_arrendamientos: 0, adquisiciones: 10.3, desinversiones: 3.9, dividendos: 97.2, recompras: 1.6, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 375.0, capex: 148.9, pagos_arrendamientos: 0, adquisiciones: 17.1, desinversiones: 4.2, dividendos: 97.2, recompras: 4.0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 377.3, capex: 103.7, pagos_arrendamientos: 0, adquisiciones: 7.2, desinversiones: 6.8, dividendos: 97.2, recompras: 0.7, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'Completo. Cuentas de los PDF de la empresa (Suiza no tiene XBRL en cuentas.mjs).',
  negocio: {
    descripcion: 'SFS Group (Heerbrugg, Suiza) fabrica componentes de precisión conformados en frío, estampados y mecanizados, sistemas de fijación y remaches, y distribuye herramientas y consumibles industriales. Tres segmentos: Engineered Components (EC, 1.134 M CHF de ventas a terceros en 2025: piezas a medida para electrónica —componentes estampados para dispositivos móviles y piezas de discos duros nearline de centros de datos—, automoción —frenos y sistemas de seguridad—, dispositivos médicos y aeronáutica), Fastening Systems (FS, 575 M: fijaciones para envolventes de edificios en Europa y Norteamérica) y Distribution & Logistics (D&L, 1.348 M: Hoffmann Group, distribuidor de herramientas de calidad con 500.000 referencias y más de 100.000 clientes, y la distribución suiza de fijaciones) [1, 5]. 14.341 empleados a tiempo completo a junio de 2026 y unos 150 centros en 35 países [2].',
    segmentos: [
      { nombre: 'Engineered Components', descripcion: 'Componentes de precisión a medida (electrónica, automoción, médico, aeronáutica).', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 1124.9, resultado: 155.2 }, { periodo: '2025', ingresos: 1140.3, resultado: 165.5 }] },
      { nombre: 'Fastening Systems', descripcion: 'Fijaciones para construcción (envolvente de edificios), Europa y Norteamérica.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 589.1, resultado: 75.2 }, { periodo: '2025', ingresos: 580.0, resultado: 61.9 }] },
      { nombre: 'Distribution & Logistics', descripcion: 'Hoffmann Group (herramientas de calidad) y distribución suiza de fijaciones y herramientas.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 1336.5, resultado: 122.3 }, { periodo: '2025', ingresos: 1339.7, resultado: 113.5 }] },
      { nombre: 'Corporativo y eliminaciones', descripcion: 'Funciones de tecnología y soporte y eliminaciones entre segmentos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: -19.4, resultado: -2.5 }, { periodo: '2025', ingresos: -14.6, resultado: -16.6 }] },
    ],
    geografias: [
      { nombre: 'Alemania', peso_pct: 29.7 }, { nombre: 'Resto de Europa', peso_pct: 27.1 }, { nombre: 'Norteamérica', peso_pct: 17.8 },
      { nombre: 'Suiza', peso_pct: 11.1 }, { nombre: 'China', peso_pct: 8.8 }, { nombre: 'Resto de Asia', peso_pct: 5.2 }, { nombre: 'África y Australia', peso_pct: 0.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '0,1 % (2024)', valor_actual: '2,9 % (2025); 4,0 % (1S26)', variacion: '+2,8 pp', comentario: 'Divisa −2,9 % en 2025 y −4,2 % en el 1S26 [1, 2].' },
      { kpi: 'Margen EBIT ajustado', valor_anterior: '11,6 % (2024)', valor_actual: '12,2 % (2025); 13,3 % (1S26)', variacion: '+0,6 pp', comentario: 'Guía 2026 y a medio plazo: 12-15 % [1, 2, 7].' },
      { kpi: 'Caja libre operativa', valor_anterior: '226,1 M (2024)', valor_actual: '273,6 M (2025)', variacion: '+21 %', comentario: 'Flujo operativo menos capex; 120,9 M en el 1S26 [1, 2].' },
      { kpi: 'ROCE (EBIT ajustado / capital empleado medio)', valor_anterior: '19,4 % (2024)', valor_actual: '21,1 % (2025); 23,4 % (1S26)', variacion: '+1,7 pp', comentario: 'Sin fondo de comercio ni impuestos [1, 2].' },
      { kpi: 'ROIC de la empresa (con fondo de comercio compensado, impuesto teórico del 17,5 %)', valor_anterior: '8,4 % (2024)', valor_actual: '9,3 % (2025); 9,6 % (1S26)', variacion: '+0,9 pp', comentario: 'Objetivo a medio plazo: > 10 % [1, 2].' },
      { kpi: 'Ventas de EC por electrónica (mercado final del grupo)', valor_anterior: '400,0 M (2024)', valor_actual: '422,0 M (2025)', variacion: '+5,5 %', comentario: '13,8 % de las ventas; ningún cliente supera el 10 % [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3066.6, ebitda: 513.0, ebit: 373.3, beneficio_neto: 256.4, bpa: 6.59, dpa: 2.50, dpa_extraordinario: 0, fcf: 272.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 35.6 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Hoffmann SE, consolidada desde el 1-may-2022 (ventas de unos 1.000 M EUR en 2021): entra entera en el balance de 2022 y solo ocho meses en la cuenta.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 1543.5, crecimiento_pct: -1.9, crecimiento_organico_pct: 0.1, ebitda: 245.8, margen_ebitda_pct: 15.9, bpa: 3.00, vs_consenso: null },
      { periodo: '2S24', ingresos: 1487.6, crecimiento_pct: -0.8, crecimiento_organico_pct: 0.1, ebitda: 234.0, margen_ebitda_pct: 15.7, bpa: 3.21, vs_consenso: null },
      { periodo: '1S25', ingresos: 1533.5, crecimiento_pct: -0.6, crecimiento_organico_pct: 1.1, ebitda: 230.4, margen_ebitda_pct: 15.0, bpa: 2.86, vs_consenso: null },
      { periodo: '2S25', ingresos: 1511.9, crecimiento_pct: 1.6, crecimiento_organico_pct: 4.7, ebitda: 236.2, margen_ebitda_pct: 15.6, bpa: 2.77, vs_consenso: null },
      { periodo: '1S26', ingresos: 1554.7, crecimiento_pct: 1.4, crecimiento_organico_pct: 4.0, ebitda: 276.8, margen_ebitda_pct: 17.8, bpa: 3.82, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 27.9 }, { anio: '2027', importe: 150.0 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 342.8 }, { anio: '2030+', importe: 22.0 }],
    liquidez: 'Caja 222,4 M (30-jun-26) + línea sindicada comprometida de 600 M CHF hasta mayo de 2029 (342,8 M dispuestos), ampliable en 100 M; bono de 250 M CHF al 1,2 % a siete años emitido el 2-sep-2026 [2, 8].',
    rating: 'Sin rating de agencia; A-/estable de ZKB y fedafin y BBB+ de UBS (bancos, previas a la emisión de septiembre de 2026) [8].',
    coste_deuda_pct: 1.5,
    vida_media_anios: 3.5,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: {
    auditor: 'PricewaterhouseCoopers AG (St. Gallen)', anios_auditor: 33, opinion: 'Favorable',
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo estable con un reparto objetivo del 35-50 % del beneficio neto (2,50 CHF por acción desde 2022, 44,4 % de reparto en 2025, 0,50 CHF de la reserva de capital exenta de retención); capex objetivo del 4-6 % de las ventas; caja para compras (plataformas de aeronáutica y dispositivos médicos, fijaciones en Europa y Norteamérica, distribución) y reducción de deuda. Sin recompras: la autocartera (0,06 %) cubre los planes de acciones [1, 7].',
    adquisiciones: [
      { anio: '2022', objetivo: 'Hoffmann SE (distribución de herramientas, Múnich; ~1.000 M EUR de ventas)', importe: 1064.4, ev_ebitda: null, financiacion: '519 M en caja (bonos de 400 M) y 520 M en 1,4 M de acciones nuevas y 0,2 M de autocartera; fondo de comercio de 486,9 M compensado contra el patrimonio', resultado: 'Llevó las ventas de 1.897 M a 2.739 M; el margen de D&L bajó (9,8 % ajustado en 2025) y el ROIC del grupo se quedó en el 8-9 %; sin deterioro visible por la compensación FER [5, 1].' },
      { anio: '2025', objetivo: 'DB Building Fasteners (California, distribución de fijaciones)', importe: 5.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; acceso a la construcción del oeste de EE. UU. [1].' },
      { anio: '2026', objetivo: 'Gödde, Oltrogge y Perschmann (socios de Hoffmann), Harald Zahn (fijaciones para cubiertas planas) y 51 % de Jellypipe', importe: 202.1, ev_ebitda: null, financiacion: 'Caja y deuda; 13,6 M aplazados y 8,6 M de pago contingente', resultado: 'Consolidadas en el 1S26 (+1,5 % de perímetro); 106,5 M de fondo de comercio compensado [2].' },
      { anio: '2026', objetivo: 'Heartland Precision Fasteners (EE. UU., fijaciones aeronáuticas, ~30 M USD de ventas)', importe: null, ev_ebitda: null, financiacion: 'Precio confidencial', resultado: 'Firmada el 9-jul-2026; cierre previsto antes de fin de septiembre de 2026 [9].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025 (segmentos, mercados finales, estrategia)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-03-06', url: `${W}/publications/annual-report-2025.pdf` },
  { id: 2, titulo: 'Industrial Fasteners Market Size, Share, Trends and Forecast 2026-2034 (105,9 mil M USD en 2025; TCAC 3,69 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://imarcgroup.com/industrial-fasteners-market' },
  { id: 3, titulo: 'Industrial Fasteners Market Size (129,2 mil M USD en 2025; TCAC 3,2 % 2026-2035; cinco primeros 14,9 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/industrial-fasteners-market' },
  { id: 4, titulo: 'Bossard Holding AG (SWX:BOSN): statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/swx/BOSN/statistics/' },
  { id: 5, titulo: 'Bufab AB (STO:BUFAB): statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/sto/BUFAB/statistics/' },
  { id: 6, titulo: 'Illinois Tool Works (ITW): statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/itw/statistics/' },
  { id: 7, titulo: 'Ficha sectorial: distribución industrial especializada (Fastenal, MSC, Applied, RS Group; Stock Analysis a 14-oct-2026)', editor: 'Repositorio analisis-inversion (sectores/)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
  { id: 8, titulo: 'Investor Day 2026: presentación (objetivos por segmento a 2030)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-09-17', url: `${W}/publikationen/presentation-investor-day-2026.pdf` },
  { id: 9, titulo: 'Half-Year Report 2026', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-07-23', url: `${W}/publications/half-year-report-2026.pdf` },
  { id: 10, titulo: 'Ficha sectorial: componentes de precisión y fijaciones (15-oct-2026)', editor: 'Repositorio analisis-inversion (sectores/)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/componentes-fijaciones-2026-10-15.md' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado con dos fuentes sectoriales (perímetros distintos); competidores con datos de Stock Analysis.',
  historia: {
    resumen: 'SFS nace en 1928 en Heerbrugg (valle del Rin de San Galo) como taller de las familias fundadoras, que aún controlan el 53 % del capital. Creció como especialista en conformado en frío y fijaciones, se internacionalizó en Asia con la compra de Unisteel (Singapur, componentes para discos duros y electrónica) y salió a bolsa en la SIX en mayo de 2014. En 2017 pasó de NIIF a Swiss GAAP FER. En 2022 compró Hoffmann SE (Múnich), lo que convirtió la distribución en el segmento más grande. Desde 2025 reorganiza su red productiva (cierre o venta de nueve centros, unos 650 empleos) y vuelve a comprar: tres socios de Hoffmann, Harald Zahn y Heartland en 2026 [1, 9].',
    hitos: [
      { anio: '1928', hito: 'Fundación en Heerbrugg (Suiza).' },
      { anio: '2014', hito: 'Salida a bolsa en la SIX Swiss Exchange (7 de mayo).' },
      { anio: '2017', hito: 'Cuentas en Swiss GAAP FER en lugar de NIIF: el fondo de comercio se compensa contra el patrimonio.' },
      { anio: '2022', hito: 'Compra de Hoffmann SE por 1.064 M CHF (mitad en acciones); las ventas pasan de 1.897 M a 2.739 M.' },
      { anio: '2025', hito: 'Programa para reducir la red de producción y distribución: −110 M de ventas, 75 M de costes únicos y +0,8 pp de margen EBIT hasta 2027.' },
      { anio: '2026', hito: 'Compras de Gödde, Oltrogge, Perschmann, Harald Zahn, Jellypipe (51 %) y Heartland Precision Fasteners; día del inversor con ventas de 3.600-4.000 M en 2030.' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    como_gana_dinero: 'En EC, SFS desarrolla con el cliente una pieza a medida (por ejemplo, un componente estampado de un teléfono o una pieza de freno) y la fabrica durante la vida del modelo: el margen depende de ganar la siguiente plataforma, del uso de la capacidad instalada y de la mezcla (electrónica y aeronáutica dejan más que automoción). En FS vende fijaciones de catálogo y sistemas con servicio técnico a instaladores de cubiertas y fachadas; en D&L, Hoffmann cobra la disponibilidad logística y el servicio sobre herramientas de marca propia (Garant, Holex) y de terceros. El margen EBIT ajustado de 2025 fue del 15,8 % en EC, 12,2 % en FS y 9,8 % en D&L. El apalancamiento operativo es alto en EC (en el 1S26 el EBIT subió un 30,8 % con ventas +2,5 %). Estacionalidad: segundo semestre más fuerte en electrónica y construcción [1, 9].',
    clientes: 'Ningún cliente supera el 10 % de las ventas (2025 y 2024) [1]. La empresa no identifica a sus clientes de electrónica; el mercado final de electrónica pesa el 13,8 % de las ventas del grupo (422 M en 2025), repartido entre dispositivos móviles y discos duros nearline [1]. Por mercado final: industria manufacturera 27,0 %, automoción 20,5 %, construcción 20,2 %, electrónica 13,8 %, dispositivos médicos 5,9 % y otros 12,6 % [1]. Las piezas a medida se adjudican por plataforma y duran años (costes de cambio altos por cualificación del proceso); Hoffmann sirve a más de 100.000 clientes con contratos de suministro y máquinas expendedoras en planta. Poder de precios: el margen ajustado se mantuvo en el 11,6-12,9 % en 2022-2025 pese a la inflación de costes y a un franco fuerte, sin crecimiento orgánico en 2024 [1].',
  },
  sector: {
    definicion: 'Mercado relevante: fijaciones industriales y componentes metálicos de precisión (tornillos, remaches, piezas conformadas en frío y estampadas) más la distribución especializada de herramientas y consumibles (MRO) en Europa. Usamos IMARC para el tamaño de fijaciones (105,9 mil M USD en 2025, ≈ 88.260 M CHF) [2]; Global Market Insights da 129,2 mil M USD con un perímetro más amplio [3]. La distribución de herramientas de Hoffmann no tiene una estadística comparable; la ficha sectorial del repositorio la trata como distribución industrial especializada [7, 10].',
    tamano: '≈ 88.260 M CHF en 2025 (105,9 mil M USD, IMARC) [2]; 129,2 mil M USD según Global Market Insights [3].',
    unidad_serie: 'millones de CHF (IMARC, a 0,8334 CHF por USD)',
    serie: [{ anio: '2025', tamano: 88260 }, { anio: '2026e', tamano: 91517 }, { anio: '2027e', tamano: 94894 }, { anio: '2028e', tamano: 98396 }, { anio: '2030e', tamano: 105791 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.7, cr5_pct: 14.9, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Producción industrial europea', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Industria manufacturera, 27 % de las ventas; D&L con ventas planas en 2024-2025 por la atonía inversora [1].' },
      { driver: 'Automoción (frenos electrónicos y seguridad)', efecto: '+/−', horizonte: 'Cíclico', evidencia: '20,5 % de las ventas; exceso de capacidad en Europa, rampas de componentes de frenos en Heerbrugg, Medina y Nantong [1].' },
      { driver: 'Electrónica: móviles y discos duros de centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Electrónica +5,5 % en 2025; crecimiento orgánico de EC del 8,6 % en el 1S26 [1, 9].' },
      { driver: 'Aeronáutica', efecto: '+', horizonte: 'Estructural', evidencia: 'Compra de Heartland para entrar en Norteamérica; aeronáutica, área más dinámica de EC [9, 8].' },
      { driver: 'Construcción (envolvente de edificios)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'FS −1,6 % orgánico en 2025 y +1,2 % en el 1S26 [1, 9].' },
      { driver: 'Franco suizo fuerte', efecto: '−', horizonte: 'Estructural', evidencia: 'Divisa −2,9 % en ventas de 2025 y −4,2 % en el 1S26; solo el 11 % de las ventas en Suiza [1, 9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Mercado fragmentado (cinco primeros, 14,9 %) [3]; en piezas a medida la rivalidad es por plataforma, con pocos rivales cualificados.' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Grandes fabricantes de automoción y electrónica negocian precio anual; en electrónica la dependencia de pocos programas es alta aunque ningún cliente supere el 10 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Acero y alambre son materias primas con muchos proveedores; energía, ≈ 1,5 % de las ventas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Cualificación de procesos (automoción, médico, aeronáutica AS9100) y escala logística de Hoffmann.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Adhesivos y uniones soldadas sustituyen fijaciones en algunos usos; la impresión 3D, en prototipos (SFS compró Jellypipe) [9].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'En 2025 las ventas orgánicas crecieron un 2,9 % y en el 1S26 un 4,0 %, tras un 0,1 % en 2024; el consenso de bancos esperaba 1.542 M de ventas en el 1S26 y salieron 1.559 M [1, 9]. En 2020 las ventas orgánicas cayeron un 3,2 % con un margen EBIT que se sostuvo en el 13,3 %; en 2021-2022 crecieron un 10,3 % y un 9,1 %; 2023-2024 fueron planas por la debilidad industrial europea [1]. La recuperación es desigual: EC crece, FS y D&L solo mejoran ligeramente [9].' },
    regulacion: 'Aranceles de EE. UU. y tensiones comerciales: la estrategia «local para local» (producción en EE. UU., China, India, Malasia y Vietnam) limita el efecto [9, 8]. Certificaciones de aeronáutica y de dispositivos médicos condicionan la entrada. CBAM europeo sobre el acero importado desde 2026 encarece el material de origen extracomunitario. Objetivos climáticos validados por SBTi; 81,5 % de electricidad renovable en 2025 [1].',
    tendencias: 'Frenos electrónicos y sistemas por cable en el coche (SFS fabrica componentes para BSD/EMB), centros de datos con discos duros nearline de mayor capacidad, aeronáutica comercial en máximo de cadencia y relocalización de la producción hacia EE. UU. e India favorecen a SFS [8, 1]. En contra: el exceso de capacidad del automóvil europeo, la caída de la inversión industrial en Alemania (29,7 % de las ventas) y la venta directa en línea de herramientas estándar frente al modelo de Hoffmann [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.9,
    posicion: 'Especialista europeo en fijaciones y componentes de precisión con ≈ 1,9 % del mercado mundial de fijaciones (EC + FS, 1.709 M CHF frente a ≈ 88.260 M; estimación propia) [2, 1]; Hoffmann es el mayor distribuidor europeo de herramientas de calidad según la empresa [1].',
    competidores: [
      { nombre: 'Würth Group', pais: 'DE', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor grupo mundial de fijaciones y montaje (no cotiza); compite con FS y con la distribución.' },
      { nombre: 'Illinois Tool Works', pais: 'US', ticker: 'ITW', ingresos: 13726, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fijaciones y componentes industriales; margen EBITDA del 29,2 % y ROIC del 29,3 % [6].' },
      { nombre: 'Bossard', pais: 'CH', ticker: 'BOSN', ingresos: 1100, cuota_pct: null, margen_ebit_pct: null, comentario: 'Distribución y gestión logística de fijaciones; margen EBITDA del 12,9 % [4].' },
      { nombre: 'Bufab', pais: 'SE', ticker: 'BUFAB', ingresos: 697, cuota_pct: null, margen_ebit_pct: null, comentario: 'Distribución de componentes (C-parts); margen EBITDA del 14,4 % [5].' },
      { nombre: 'LISI Group', pais: 'FR', ticker: 'FII', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fijaciones aeronáuticas y de automoción; rival en aeronáutica [3].' },
      { nombre: 'Howmet Aerospace (fijaciones)', pais: 'US', ticker: 'HWM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en fijaciones aeronáuticas; rival de la nueva plataforma de Heartland [3].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Piezas codesarrolladas y cualificadas por plataforma (automoción, médico, aeronáutica); máquinas expendedoras y contratos de Hoffmann en planta [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marcas GESIPA, UNISTEEL, Tegra Medical, Garant y Holex; I+D de 68,5 M (2,2 % de las ventas) [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Conformado en frío y estampado multietapa de alta precisión; ROCE del 21,1 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'LogisticCity de Hoffmann en Núremberg, el centro logístico de herramientas más eficiente de Europa según la empresa [1].' },
      ],
    },
    amenazas: 'El foso es real en las piezas cualificadas pero no se nota en el margen consolidado: el EBIT ajustado del grupo (12,2 %) queda lejos del de ITW y la distribución rinde un 9,8 %. Lo que podría erosionarlo: pérdida de un programa grande de electrónica (la empresa no publica la concentración por cliente dentro del 13,8 % de electrónica), electrificación que reduce piezas mecánicas por coche, venta en línea de herramientas estándar y competidores asiáticos en fijaciones de catálogo. Probabilidad media en cinco años [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el carbono de la producción (alcance 1 y 2 de 15,7 t por millón de ventas en 2025, −77,1 % frente a 2020; 81,5 % de electricidad renovable) y la cadena de suministro del acero (proveedores críticos reducidos de 621 a 249) [1]. Seguridad laboral: 2,9 accidentes por millón de horas (4,2 en 2024) [1]. Objetivos validados por SBTi a finales de 2025 [1].',
    controversias: 'Sin multas ni procedimientos por incumplimiento, corrupción o derechos humanos en 2025 según la empresa [1]. No hemos encontrado controversias en prensa de los últimos tres años.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Siete cotizadas de fijaciones y distribución industrial: Bossard y Bufab (gestión de componentes y fijaciones en Europa), ITW (fabricante de fijaciones y componentes, el mejor del sector en margen) y Fastenal, MSC, Applied Industrial y RS Group (distribución industrial, el modelo de Hoffmann). Datos de Stock Analysis a 14-15-oct-2026 (los cuatro últimos, de la ficha sectorial del 14-oct, pasados a CHF con el BCE) [4-7]. Fuera: Georg Fischer (desinversiones, beneficio no comparable), Norma Group (vendió su negocio principal) y Würth (no cotiza).',
    empresas: [
      { nombre: 'Bossard', ticker: 'BOSN', pais: 'CH', capitalizacion: 2020, ev_ventas: 2.15, ev_ebitda_ltm: 16.7, ev_ebitda_ntm: null, per_ntm: 20.4, crecimiento_pct: null, margen_ebitda_pct: 12.9, roic_pct: 13.0, dn_ebitda: 2.2, fcf_yield_pct: 3.8 },
      { nombre: 'Bufab', ticker: 'BUFAB', pais: 'SE', capitalizacion: 2230, ev_ventas: 3.69, ev_ebitda_ltm: 22.4, ev_ebitda_ntm: null, per_ntm: 30.7, crecimiento_pct: null, margen_ebitda_pct: 14.4, roic_pct: 10.5, dn_ebitda: 2.9, fcf_yield_pct: 3.5 },
      { nombre: 'Illinois Tool Works', ticker: 'ITW', pais: 'US', capitalizacion: 63964, ev_ventas: 5.20, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: null, per_ntm: 22.9, crecimiento_pct: null, margen_ebitda_pct: 29.2, roic_pct: 29.3, dn_ebitda: 1.8, fcf_yield_pct: 3.8 },
      { nombre: 'Fastenal', ticker: 'FAST', pais: 'US', capitalizacion: 49832, ev_ventas: 6.53, ev_ebitda_ltm: 29.0, ev_ebitda_ntm: null, per_ntm: 37.4, crecimiento_pct: null, margen_ebitda_pct: 22.5, roic_pct: 32.6, dn_ebitda: -0.1, fcf_yield_pct: 2.0 },
      { nombre: 'MSC Industrial Direct', ticker: 'MSM', pais: 'US', capitalizacion: 6159, ev_ventas: 2.01, ev_ebitda_ltm: 17.7, ev_ebitda_ntm: null, per_ntm: 24.7, crecimiento_pct: null, margen_ebitda_pct: 11.4, roic_pct: 13.6, dn_ebitda: 1.1, fcf_yield_pct: 3.0 },
      { nombre: 'Applied Industrial Technologies', ticker: 'AIT', pais: 'US', capitalizacion: 10227, ev_ventas: 2.56, ev_ebitda_ltm: 20.7, ev_ebitda_ntm: null, per_ntm: 27.8, crecimiento_pct: null, margen_ebitda_pct: 12.4, roic_pct: 19.6, dn_ebitda: 0.5, fcf_yield_pct: 3.7 },
      { nombre: 'RS Group', ticker: 'RS1', pais: 'GB', capitalizacion: 4058, ev_ventas: 1.37, ev_ebitda_ltm: 13.8, ev_ebitda_ntm: null, per_ntm: 18.8, crecimiento_pct: null, margen_ebitda_pct: 9.3, roic_pct: 9.7, dn_ebitda: 1.2, fcf_yield_pct: 6.8 },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: Corporate Governance y Compensation Report', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-03-06', url: `${W}/publications/annual-report-2025.pdf` },
  { id: 2, titulo: 'Protokoll der 33. ordentlichen Generalversammlung (22-abr-2026): resultados de las votaciones', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-04-22', url: `${W}/annual-general-meeting/minutes_agm-2026.pdf` },
  { id: 3, titulo: 'Annual Report 2023 (guía 2023 y resultados)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2024-03-08', url: `${W}/publications/annual-report-2023.pdf` },
  { id: 4, titulo: 'Annual Report 2024 (guía 2024 y resultados)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2025-03-07', url: `${W}/publications/annual-report-2024.pdf` },
  { id: 5, titulo: 'Half-Year Report 2026 (guía confirmada)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-07-23', url: `${W}/publications/half-year-report-2026.pdf` },
];
const C = {
  _estado: 'Completo. Operaciones de directivos: en Suiza son anónimas (solo cargo e importe); no se han revisado una a una.',
  directivos: {
    equipo: [
      { nombre: 'Jens Breu', cargo: 'Consejero delegado (CEO)', desde: '2016', participacion_pct: 0.10, trayectoria: 'En SFS desde hace más de dos décadas; antes dirigió la división de electrónica. Con él las ventas pasaron de unos 1.600 M a 3.057 M (compra de Hoffmann) y el margen EBIT ajustado del 13-16 % al 12,2 % [1].' },
      { nombre: 'Volker Dostmann', cargo: 'Director financiero (CFO)', desde: '2021', participacion_pct: 0.01, trayectoria: 'Lideró la financiación de Hoffmann (bonos de 400 M) y el bono de 250 M de 2026 [1].' },
      { nombre: 'Thomas Oetterli', cargo: 'Presidente del consejo', desde: '2022', participacion_pct: null, trayectoria: 'Exconsejero delegado de Schindler (2016-2022); consejero de SFS desde 2011 y presidente desde 2022 [1].' },
      { nombre: 'Urs Langenauer', cargo: 'Jefe del segmento EC', desde: '2026', participacion_pct: 0.02, trayectoria: 'Antes jefe de la división de automoción [1].' },
      { nombre: 'George Poh', cargo: 'Jefe de electrónica (EC)', desde: null, participacion_pct: 0.13, trayectoria: 'Viene de Unisteel; la electrónica es la unidad que más crece [1].' },
      { nombre: 'Iso Raunjak', cargo: 'Jefe del segmento D&L', desde: '2026', participacion_pct: 0.01, trayectoria: 'Antes jefe de D&L Suiza [1].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Margen EBIT en torno al del año anterior (11,7 %) [3]', real: '11,6 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Margen EBIT en torno al del año anterior (11,6 %) [4]', real: '12,2 % ajustado (10,6 % publicado, con 46,7 M del programa)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Crecimiento en moneda local del 3-6 % con perímetro; margen EBIT ajustado 12-15 % (confirmada en julio y septiembre) [5]', real: '1S26: +5,5 % en moneda local; 13,3 %', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Thomas Oetterli', cargo: 'Presidente', tipo: 'Independiente', desde: '2011', comisiones: '—' },
      { nombre: 'Urs Kaufmann', cargo: 'Vicepresidente', tipo: 'Independiente', desde: '2012', comisiones: 'Nombramientos y Retribuciones (presidente)' },
      { nombre: 'Jörg Walther', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Manuela Suter', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría' },
      { nombre: 'Peter Bauschatz', cargo: 'Consejero', tipo: 'Otro externo', desde: '2022', comisiones: '—' },
      { nombre: 'Tanja Birner', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y Retribuciones' },
      { nombre: 'Nick Huber', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: 'Nombramientos y Retribuciones' },
      { nombre: 'Fabian Tschan', cargo: 'Consejero', tipo: 'Dominical', desde: '2023', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 84.78, voto_remuneracion_contra_pct: 15.22, voto_remuneracion_contra_libre_pct: 41.0, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.62, fijo: 0.70, variable_corto: 0.38, variable_largo: 0.35, ratio_salario_medio: 25 },
    accionistas: [
      { nombre: 'Familias fundadoras Huber y Stadler/Tschan (pacto)', pct: 53.31, tipo: 'Control (grupo organizado)', variacion: '+0,23 pp en 2025' },
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.75, tipo: 'Institucional', variacion: 'Sin cambios' },
      { nombre: 'First SALT Stiftung / First ELF Stiftung (antiguos dueños de Hoffmann)', pct: 4.11, tipo: 'Estratégico (bloqueo de siete años desde 2021)', variacion: 'Sin cambios' },
      { nombre: 'Autocartera', pct: 0.06, tipo: 'Autocartera', variacion: '−0,03 pp' },
    ],
    insiders: [],
    alertas: [
      'Voto consultivo del informe de remuneración 2025 con un 15,2 % en contra; descontados los votos del pacto familiar (que vota a favor), un 41 % del capital libre presente votó en contra [2].',
      'PwC audita SFS desde 1993 (33 años); rota el socio, no la firma [1].',
      'Peter Bauschatz, consejero calificado de independiente, preside el consejo de supervisión de Hoffmann SE, filial del grupo cuyos antiguos dueños tienen el 4,11 % [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'SFSN.SW, ^SSHI y EXH4.DE: históricos diarios (precio, rango, volumen, beta, volatilidad, cierres anuales)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SFSN.SW/history' },
  { id: 2, titulo: 'SFS Group AG: finances (estimaciones 2026-2028, objetivo medio, número de analistas)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/SFS-GROUP-AG-16421371/finances/' },
  { id: 3, titulo: 'SFS Group AG (SWX:SFSN) forecast: 6 analistas, objetivos 140-152 CHF, BPA 2026e 7,23', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/swx/SFSN/forecast/' },
  { id: 4, titulo: 'SFS Group N: consenso de analistas (8 analistas, 2 comprar y 6 neutral; objetivo medio 142 CHF)', editor: 'cash.ch', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.cash.ch/aktien/sfs-group-n-23922930/swx/chf' },
  { id: 5, titulo: 'SFS Group AG (SWX:SFSN) statistics (capitalización 5.400 M CHF; 38,88 M de acciones)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/swx/SFSN/statistics/' },
  { id: 6, titulo: 'Swiss Bond Yield: bono de la Confederación a 10 años al 0,54 % (8-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-08', url: 'https://tradingeconomics.com/switzerland/government-bond-yield/news/590510' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Tipos de cambio de referencia del BCE, 14-oct-2026 (0,9330 CHF, 1,1195 USD, 0,84385 GBP y 11,1580 SEK por EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 9, titulo: 'Simpson Manufacturing: presentación a inversores sobre la compra de Etanco (725 M EUR, ≈ 11,9 veces el EBITDA, ventas de 258 M EUR)', editor: 'Simpson Manufacturing (SEC, 8-K)', tipo: 'Primaria', fecha: '2021-12-29', url: 'https://www.sec.gov/Archives/edgar/data/920371/000092037122000005/exhibit992investorpresen.htm' },
  { id: 10, titulo: 'Annual Report 2022, Financial report: compra de Hoffmann SE (precio 1.064,4 M CHF)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2023-03-10', url: `${W}/publications-archive/2022/finanzbericht.pdf` },
  { id: 11, titulo: 'Half-Year Report 2026 (balance a 30-jun-2026 para el puente)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-07-23', url: `${W}/publications/half-year-report-2026.pdf` },
  { id: 12, titulo: 'SFS Group AG: Just Released Its Half-Yearly Earnings, Here\'s What Analysts Think (objetivo de consenso 141 CHF; BPA 2026e de 6,40 a 6,72)', editor: 'Simply Wall St (vía Webull)', tipo: 'Analistas', fecha: '2026-07-26', url: 'https://www.webull.com/news/15292566163973120' },
  { id: 13, titulo: 'Financial agenda 2026 y 2027 (informe anual 2026 el 26-feb-2027)', editor: 'SFS Group AG', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.sfs.com/ch/en/investors/agenda/' },
];
const D = {
  _estado: 'Completo. Precio: cierre del 14-oct-2026 (la sesión del 15-oct no había cerrado al hacer el análisis).',
  identificacion: {
    nombre: 'SFS Group AG', nombre_corto: 'SFS', ticker: 'SFSN', isin: 'CH0239229302', mercado: 'SIX Swiss Exchange', indice_referencia: 'SPI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Maquinaria y componentes industriales', sede: 'Heerbrugg (Widnau, San Galo)', fundacion: '1928', empleados: 14341, web: 'https://www.sfs.com',
    precio: 140.6, fecha_precio: '2026-10-14', acciones: 38.88, capitalizacion_publicada: 5400, free_float_pct: 42.6,
    max_52s: 146.4, min_52s: 98.3, volumen_medio_diario: '≈ 3,8 M CHF/día (3 meses)', proximos_resultados: '2027-02-26',
  },
  consenso: {
    guidance: 'Para 2026: crecimiento de las ventas en moneda local del 3-6 % con perímetro y margen EBIT ajustado del 12-15 %, confirmado el 23-jul-2026 con el semestral y el 16-sep-2026 antes del día del inversor; la misma guía vale a medio plazo. En el día del inversor la empresa dibujó unas ventas de unos 3.600-4.000 M CHF en 2030 a divisa constante, con compras, y el programa de red productiva (−110 M de ventas, 75 M de costes únicos, +0,8 pp de margen EBIT a finales de 2027) [11, 2].',
    estimaciones: [
      { periodo: '2026e', ingresos: 3114, ebitda: 536.3, ebit: 397.1, bpa: 7.26, dpa: 2.78, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 3233, ebitda: 558.8, ebit: 413.6, bpa: 7.46, dpa: 3.02, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 3347, ebitda: 589.3, ebit: 440.0, bpa: 8.20, dpa: 3.27, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 2, mantener: 6, vender: 0, po_medio: 142.0, po_min: 135.0, po_max: 146.0 },
    revisiones: 'Tras el 1S26 (EBIT ajustado de 206 M frente a 185 M del consenso recogido por la empresa) el BPA de 2026 del consenso subió de 6,40 a 6,72 CHF según Simply Wall St [12] y hoy está en 7,23-7,26 [3, 2]. El objetivo medio sube de 132,6 CHF (julio) a 141-146 CHF; UBS pasó de comprar a neutral tras la subida. Solo MarketScreener da tres años; S&P Global (6 analistas, 140-152 CHF) [3] y cash.ch (8 analistas, 135-146 CHF) [4] contrastan el objetivo.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 126.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 87.5, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 104.2, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 125.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 108.6, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Alta',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-05', objetivo: 'Hoffmann SE (distribución de herramientas, DE)', comprador: 'SFS Group', ev: 1064, ev_ventas: 1.02, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 1.064,4 M CHF con costes, mitad en acciones; ventas de 2021 ≈ 1.000 M EUR (≈ 1,04 CHF/EUR); EBITDA no publicado [10].' },
      { fecha: '2022-04', objetivo: 'Etanco Group (fijaciones para construcción, FR)', comprador: 'Simpson Manufacturing', ev: 754, ev_ventas: 2.81, ev_ebitda: 11.9, prima_pct: null, excluir: false, comentario: '725 M EUR (≈ 1,04 CHF/EUR); 11,9 veces el EBITDA de 12 meses; margen operativo del 19,7 % [9].' },
      { fecha: '2026-07', objetivo: 'Heartland Precision Fasteners (fijaciones aeronáuticas, EE. UU.)', comprador: 'SFS Group', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas de unos 30 M USD; precio confidencial.' },
    ],
    confianza: 'Baja',
  },
  bolsa: null,
  fuentes: fD,
};
// bolsa: de bolsa.json (de precio, sin dividendos; el SPI de Yahoo no lleva dividendos)
const bj = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
D.bolsa = { ...bj.bolsa, posicion_corta_pct: null, confianza: 'Alta' };
delete D.bolsa.tramo_drawdown;
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'SFS Group N: página de la acción con foro de lectores (sin mensajes) y noticias', editor: 'cash.ch', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.cash.ch/aktien/sfs-group-n-23922930/swx/chf' },
  { id: 2, titulo: 'SFS Group AG (SFSLF): flujo RSS de noticias y transcripciones (1S26, día del inversor)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-17', url: 'https://seekingalpha.com/api/sa/combined/SFSLF.xml' },
  { id: 3, titulo: 'SFS Group: foro de la acción', editor: 'ariva.de', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.ariva.de/forum/sfs-group' },
  { id: 4, titulo: 'SFS Group AG Just Released Its Half-Yearly Earnings: Here\'s What Analysts Think', editor: 'Simply Wall St (vía Webull)', tipo: 'Prensa', fecha: '2026-07-26', url: 'https://www.webull.com/news/15292566163973120' },
  { id: 5, titulo: 'SFS Group Aktie: artículos automáticos (máximos históricos en julio, cruces de la media de 50 sesiones en agosto-septiembre)', editor: 'boerse.de', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.boerse.de/nachrichten/SFS-Group-Aktie-unter-50-Tage-Linie/38521632' },
  { id: 6, titulo: 'Kevin Durkin: SFS Group (tesis presentada en el European Investing Summit)', editor: 'MOI Global', tipo: 'Foros y redes', fecha: '2025-10', url: 'https://moiglobal.com/kevin-durkin-sfs-group-202510/' },
];
const E = {
  _estado: 'Debate de particulares muy escaso: cash.ch y ariva sin mensajes; Reddit y Stocktwits sin hilos sobre SFS. Se resume lo que hay (prensa financiera y tesis de un gestor).',
  sentimiento: {
    tono: 'Neutro', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'cash.ch (foro de la acción)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'Sin mensajes de lectores; la página recoge 2 recomendaciones de comprar y 6 neutrales, las dos últimas «mantener» de julio y septiembre [1].' },
      { plataforma: 'Seeking Alpha (RSS de SFSLF)', fecha: '2026-09', n_comentarios: 5, tono: 'Neutro', resumen: 'Solo transcripciones y presentaciones (cuentas de 2025, 1S26 y día del inversor), sin artículos de opinión ni comentarios recientes [2].' },
      { plataforma: 'Simply Wall St (prensa con datos de consenso)', fecha: '2026-07', n_comentarios: 1, tono: 'Dividido', resumen: 'Tras el 1S26 la acción cayó un 6,9 % en una semana pese a subir el BPA esperado: el mercado dudó del segundo semestre y de un crecimiento de ventas que se frena [4].' },
      { plataforma: 'boerse.de (notas técnicas)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Máximos históricos en julio y tendencia alcista desde diciembre de 2025, con cruces de la media de 50 sesiones en agosto y septiembre [5].' },
    ],
    temas: [
      { tema: 'Recuperación de márgenes por el programa de red productiva', postura: 'Alcista', peso: 'Alto', contraste: 'El EBIT ajustado del 1S26 subió un 22,5 % (13,3 % de margen), por encima del consenso [4]; el programa promete +0,8 pp a finales de 2027.' },
      { tema: 'Calidad «suiza» a precio razonable', postura: 'Alcista', peso: 'Medio', contraste: 'La tesis de un gestor de 2025 destacaba un ROIC histórico alto y caja estable [6]; con el fondo de comercio de Hoffmann el ROIC de la empresa es del 9,3 %, no del 20 % (el 21 % es el ROCE, sin fondo de comercio).' },
      { tema: 'Segundo semestre más flojo y franco fuerte', postura: 'Bajista', peso: 'Medio', contraste: 'La caída de julio y la rebaja de UBS a neutral reflejan esa duda [4]; la divisa restó un 4,2 % a las ventas del 1S26.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
