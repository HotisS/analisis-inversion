// Escribe las notas A-E de Sartorius Stedim Biotech (corte 2026-10-14). Sin subagentes: hechos leídos en los documentos de notas/docs
// (URD 2025, 2024 y 2022, informe anual 2021, informe semestral 1S26, 1T26, 9M25, nota de resultados 2025, datos financieros en Excel,
// votaciones de la junta de 2026), el XBRL ESEF (cuentas-xbrl.json) y bolsa.json (Yahoo). Cada nota cita solo su propia lista de fuentes.
// Ejecutar: node informes/sartorius-stedim-2026-10-14/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const NOTAS = {};
const guarda = (letra, obj) => { NOTAS[letra] = obj; };
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EURUSD = 1.1195; // BCE 14-oct-2026
const EURCHF = 0.9330; // BCE 14-oct-2026

const URD25 = 'https://www.sartorius.com/download/1796564/fy-2025-download-urd-ssb-en-data.pdf';
const H1R = 'https://www.sartorius.com/download/1845890/h1-2026-download-half-year-report-ssb-en-data.pdf';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Universal Registration Document 2025 (cuentas consolidadas y notas: deuda, arrendamientos, factoring, partes vinculadas)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-16', url: URD25 },
  { id: 2, titulo: 'Financial Data FY 2025 (Excel: resumen de 5 años 2021-2025, cuenta, balance, flujos, conciliación del BPA subyacente)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-16', url: 'https://www.sartorius.com/download/1796602/fy-2025-download-financial-data-ssb-data.xlsx' },
  { id: 3, titulo: 'First-Half Financial Report January to June 2026 (cuentas intermedias, deuda, partes vinculadas, calendario)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-07-23', url: H1R },
  { id: 4, titulo: 'Q1 2026 results: «Sartorius Stedim Biotech reports robust first quarter results»', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-04-23', url: 'https://www.sartorius.com/en/company/newsroom/corporate-news/2026-first-quarter-results-sartorius-stedim-biotech-1817704' },
  { id: 5, titulo: 'Earnings Release 9M 2025 (cifras del 3T25 y guía de 2025 afinada)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2025-10-16', url: 'https://www.sartorius.com/download/1754002/9m-2025-download-earnings-report-ssb-en-data.pdf' },
  { id: 6, titulo: 'Preliminary full-year results 2025 (BPA subyacente 4,40, deuda bruta 2.599 M, guía 2026)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-03', url: 'https://www.sartorius.com/en/company/newsroom/corporate-news/preliminary-full-year-results-2025-sartorius-stedim-biotech-1793966' },
  { id: 7, titulo: 'Universal Registration Document 2022 (cifras clave 2018-2022, flujos 2021-2022, proveedores y anticipos)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2023-02', url: 'https://www.sartorius.com/download/1379314/ssb-annual-report-2022-e-data.pdf' },
  { id: 8, titulo: 'Annual Report 2021 (balance y flujos de 2020: clientes, proveedores, anticipos, capex, arrendamientos)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2022-02', url: 'https://www.sartorius.com/download/1138890/ssb-annual-report-2021-e-data.pdf' },
  { id: 9, titulo: 'Informes anuales ESEF 2020-2025 en xBRL-JSON (LEI 52990006IVXY7GCSSR39)', editor: 'XBRL International (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-02', url: 'https://filings.xbrl.org/52990006IVXY7GCSSR39/2025-12-31/ESEF/' },
  { id: 10, titulo: 'Financial Data FY 2024 (Excel: balance y flujos de 2023 y 2024, conciliación 2023)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sartorius.com/download/1662022/fy-2024-download-ssb-financial-data-data.xlsx' },
  { id: 11, titulo: 'Universal Registration Document 2024 (comparación guía-real de 2024)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sartorius.com/download/1662024/fy-2024-download-ssb-annual-report-en-data.pdf' },
];

const cuenta = [
  // EBITDA = EBIT + amortizaciones publicadas (sin ajustar); EBITDA subyacente en el comentario. BPA diluido publicado.
  { periodo: '2020', ingresos: 1910.1, coste_ventas: 906.8, gastos_generales: 391.5, ebitda: 572.0, amortizaciones: 100.3, ebit: 471.7, resultado_financiero: -11.0, bai: 460.7, impuestos: 122.1, minoritarios: 2.7, beneficio_neto: 335.9, gastos_financieros: 38.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.64, dpa: 0.68, dpa_extraordinario: 0, acciones_diluidas: 92.2 },
  { periodo: '2021', ingresos: 2887.0, coste_ventas: 1334.0, gastos_generales: 531.7, ebitda: 1006.9, amortizaciones: 141.5, ebit: 865.4, resultado_financiero: -218.7, bai: 646.7, impuestos: 232.4, minoritarios: -0.1, beneficio_neto: 414.4, gastos_financieros: 241.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.50, dpa: 1.26, dpa_extraordinario: 0, acciones_diluidas: 92.2 },
  { periodo: '2022', ingresos: 3492.7, coste_ventas: 1675.0, gastos_generales: 612.0, ebitda: 1174.9, amortizaciones: 179.9, ebit: 995.0, resultado_financiero: 135.2, bai: 1130.4, impuestos: 251.0, minoritarios: 3.8, beneficio_neto: 876.1, gastos_financieros: 50.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 9.51, dpa: 1.44, dpa_extraordinario: 0, acciones_diluidas: 92.2 },
  { periodo: '2023', ingresos: 2775.5, coste_ventas: 1542.0, gastos_generales: 616.0, ebitda: 686.8, amortizaciones: 236.8, ebit: 450.0, resultado_financiero: -47.6, bai: 401.9, impuestos: 89.2, minoritarios: 2.4, beneficio_neto: 310.3, gastos_financieros: 142.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.37, dpa: 0.69, dpa_extraordinario: 0, acciones_diluidas: 92.2 },
  { periodo: '2024', ingresos: 2780.0, coste_ventas: 1573.3, gastos_generales: 648.5, ebitda: 672.3, amortizaciones: 301.7, ebit: 370.6, resultado_financiero: -151.3, bai: 219.2, impuestos: 40.7, minoritarios: 3.4, beneficio_neto: 175.1, gastos_financieros: 196.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.81, dpa: 0.69, dpa_extraordinario: 0, acciones_diluidas: 96.6 },
  { periodo: '2025', ingresos: 2967.5, coste_ventas: 1622.2, gastos_generales: 661.3, ebitda: 843.8, amortizaciones: 318.1, ebit: 525.7, resultado_financiero: -152.5, bai: 373.2, impuestos: 107.3, minoritarios: 0.3, beneficio_neto: 265.6, gastos_financieros: 192.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.73, dpa: 0.69, dpa_extraordinario: 0, acciones_diluidas: 97.3 },
];

const A = {
  _estado: 'completa',
  negocio: {
    segmentos: [
      { nombre: 'Consumibles y servicios (recurrente)', descripcion: 'Bolsas y sistemas de un solo uso, filtros y membranas, medios de cultivo y reactivos (Polyplus), resinas y consumibles de cromatografía, servicios de validación.', tipo_resultado: null, historico: [{ periodo: '1S25', ingresos: 1274.3, resultado: null }, { periodo: '1S26', ingresos: 1317.3, resultado: null }] },
      { nombre: 'Equipos (no recurrente)', descripcion: 'Biorreactores, sistemas de cromatografía y filtración, sistemas de proceso continuo (Pionic), equipos de desarrollo (Ambr).', tipo_resultado: null, historico: [{ periodo: '1S25', ingresos: 215.3, resultado: null }, { periodo: '1S26', ingresos: 209.9, resultado: null }] },
    ],
    geografias: [
      { nombre: 'EMEA', peso_pct: 41.8 }, { nombre: 'Américas', peso_pct: 35.5 }, { nombre: 'Asia-Pacífico', peso_pct: 22.7 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento a tipos constantes', valor_anterior: '0,6 % (2024)', valor_actual: '9,6 % (2025); 6,4 % en 1S26 (8,0 % operativo sin compensación de aranceles)', variacion: '+9,0 pp', comentario: 'Salida del desestocaje [A2, A3].' },
      { kpi: 'Margen EBITDA subyacente', valor_anterior: '28,0 % (2024)', valor_actual: '30,8 % (2025); 31,4 % en 1S26', variacion: '+2,8 pp', comentario: 'Volumen y escala; mezcla y aranceles en contra [A2, A3].' },
      { kpi: 'Peso del negocio recurrente (consumibles y servicios)', valor_anterior: '85,5 % (1S25)', valor_actual: '86,3 % (1S26)', variacion: '+0,8 pp', comentario: 'Equipos vuelven a crecer ligeramente en el 2T26 [A3].' },
      { kpi: 'Deuda neta / EBITDA subyacente', valor_anterior: '2,81 (2024)', valor_actual: '2,38 (2025); 2,36 (jun-26)', variacion: '−0,45', comentario: 'Guía 2026: algo por encima de 2 [A3].' },
      { kpi: 'Capex / ventas', valor_anterior: '12,2 % (2024)', valor_actual: '13,3 % (2025); 9,3 % en 1S26', variacion: '+1,1 pp', comentario: 'Guía 2026 similar a 2025 [A3].' },
      { kpi: 'Empleados', valor_anterior: '9.901 (2024)', valor_actual: '10.265 (2025); 10.477 (jun-26)', variacion: '+3,7 %', comentario: 'Sobre todo producción [A2, A3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 3005.1, ebitda: 882.0, ebit: 558.7, beneficio_neto: 292.6, bpa: 3.01, dpa: 0.69, dpa_extraordinario: 0, fcf: 200, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'Polyplus (≈2.400 M), consolidada desde julio de 2023: entra entera en el balance de 2023 y solo medio año en la cuenta.' },
      { periodo: '2022', descripcion: 'Compras de Albumedix, de la división de purificación de Novasep y de BIA Separations (cerrada a finales de 2020) que cambian el perímetro de 2021-2022.' },
    ],
    comentario: 'Las ventas pasaron de 1.910 M en 2020 a 3.493 M en 2022 con la demanda de la pandemia (vacunas y acopio de consumibles) y cayeron un 18,7 % a tipos constantes en 2023 por el desestocaje de los clientes; 2024 quedó plano (+0,6 %) y 2025 volvió a crecer un 9,6 % a tipos constantes (6,7 % publicado por el dólar) hasta 2.967,5 M [A2, A11]. El EBITDA subyacente pasó del 35,8 % en 2021 al 28,0 % en 2024 (pérdida de apalancamiento operativo y mezcla) y se recuperó al 30,8 % en 2025 y al 31,4 % en el 1S26 [A2, A3]. Polyplus, consolidada desde julio de 2023, aporta ventas de medios y reactivos de margen alto, pero también 112-117 M anuales de amortización de intangibles de compras [A2]. En el 1S26 las ventas subieron un 2,5 % (6,4 % a tipos constantes) y el beneficio neto un 17,6 %, ayudado por menos partidas extraordinarias (15,1 M frente a 36,4 M) y un efecto técnico de aranceles: la devolución de aranceles de EE. UU. se abonó al coste de ventas y la compensación a clientes (≈23 M) se restó de las ventas [A3].',
    ajustes: 'La empresa publica EBITDA subyacente (sin partidas extraordinarias) y BPA subyacente (sin extraordinarias ni amortización de intangibles de compras, con resultado financiero normalizado y un tipo del 26 %). En 2025: BPA subyacente 4,40 frente a 2,73 publicado; en 2024, 3,49 frente a 1,81 [A2, A6]. La diferencia de 2025 (1,67 EUR) es 70,0 M de extraordinarias, 112,6 M de amortización de compras y 22,6 M de diferencias de cambio y valoración en el resultado financiero, netos de impuestos [A2]. Las extraordinarias se repiten todos los años (26,5 M en 2021, 46,3 M en 2022, 99,1 M en 2023, 106,7 M en 2024, 70,0 M en 2025 y 15,1 M en 1S26) [A2, A7, A10]: no son no recurrentes. En la cuenta usamos el EBITDA publicado (EBIT + amortizaciones), y en el DCF las tratamos como gasto (≈1 % de las ventas).',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 744.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 229.0, margen_ebitda_pct: 30.8, bpa: 1.16, vs_consenso: null },
      { periodo: '2T25', ingresos: 745.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 232.9, margen_ebitda_pct: 31.3, bpa: 1.18, vs_consenso: null },
      { periodo: '3T25', ingresos: 705.7, crecimiento_pct: 7.7, crecimiento_organico_pct: 12.0, ebitda: 221.1, margen_ebitda_pct: 31.3, bpa: 0.94, vs_consenso: null },
      { periodo: '4T25', ingresos: 772.2, crecimiento_pct: 2.8, crecimiento_organico_pct: null, ebitda: 230.6, margen_ebitda_pct: 29.9, bpa: 1.12, vs_consenso: null },
      { periodo: '1T26', ingresos: 761.5, crecimiento_pct: 2.3, crecimiento_organico_pct: 7.9, ebitda: 233.4, margen_ebitda_pct: 30.7, bpa: 1.17, vs_consenso: null },
      { periodo: '2T26', ingresos: 765.7, crecimiento_pct: 2.8, crecimiento_organico_pct: 4.9, ebitda: 245.5, margen_ebitda_pct: 32.1, bpa: 1.25, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 1T26 (23-abr) la dirección habló de un buen comienzo con consumibles fuertes y equipos «blandos como se esperaba», con mejora prevista en el 2T; el margen subyacente se quedó en el 30,7 % (30,8 % un año antes) por mezcla y aranceles, y la acción cayó un 14,2 % ese día [A4]. En el 1S26 (23-jul) el discurso pasó a «impulso positivo y mercados finales que mejoran gradualmente»: equipos volvieron a crecer ligeramente, Asia-Pacífico creció un 12,5 % con la recuperación de China y el margen subió al 32,1 % en el 2T [A3]. Lo que cambió entre una y otra: la sentencia del Tribunal Supremo de EE. UU. (20-feb-2026) que anuló los aranceles IEEPA; la empresa cobró la devolución a final de junio y compensará a los clientes hasta 35 M, lo que deja el crecimiento de 2026 en la mitad baja de la guía del 6-10 % (operativo, hacia el punto medio) [A3]. En marzo de 2026 presentó objetivos a medio plazo desde 2027: crecimiento orgánico del 9-12 % anual (mercado del 8-10 %) y +60-85 pb de margen subyacente al año [A3]. No dio cifras de pedidos de equipos ni del efecto neto de los aranceles por trimestre. (Sin transcripción literal de las conferencias: resumen de los informes oficiales.)',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2020', activo_total: 2856.7, activo_corriente: 874.0, pasivo_corriente: 568.0, pasivo_total: 1395.7, fondo_comercio: 725.0, intangibles: 572.0, inmovilizado_material: 644.0, existencias: 471.0, clientes: 256.9, proveedores: 174.7, activos_contrato: null, pasivos_contrato: 132.2, caja: 59.8, deuda_financiera: 529.0, arrendamientos: 58.3, patrimonio_neto: 1438.1, minoritarios: 22.9, reservas: null },
      { periodo: '2021', activo_total: 3951.1, activo_corriente: 1456.0, pasivo_corriente: 1037.0, pasivo_total: 2217.9, fondo_comercio: 821.0, intangibles: 684.0, inmovilizado_material: 928.0, existencias: 783.0, clientes: 356.0, proveedores: 251.4, activos_contrato: null, pasivos_contrato: 219.8, caja: 223.6, deuda_financiera: 547.0, arrendamientos: 78.9, patrimonio_neto: 1655.8, minoritarios: 77.4, reservas: null },
      { periodo: '2022', activo_total: 5065.4, activo_corriente: 1671.0, pasivo_corriente: 1036.0, pasivo_total: 2551.2, fondo_comercio: 1136.0, intangibles: 877.0, inmovilizado_material: 1292.0, existencias: 1025.0, clientes: 404.6, proveedores: 251.6, activos_contrato: null, pasivos_contrato: 234.0, caja: 107.1, deuda_financiera: 1025.0, arrendamientos: 110.6, patrimonio_neto: 2449.3, minoritarios: 64.9, reservas: null },
      { periodo: '2023', activo_total: 7730.1, activo_corriente: 1415.0, pasivo_corriente: 937.0, pasivo_total: 5056.3, fondo_comercio: 2885.0, intangibles: 1693.0, inmovilizado_material: 1633.2, existencias: 882.4, clientes: 293.7, proveedores: 258.5, activos_contrato: null, pasivos_contrato: 238.6, caja: 116.6, deuda_financiera: 3567.4, arrendamientos: 114.5, patrimonio_neto: 2638.5, minoritarios: 35.3, reservas: 2391.1 },
      { periodo: '2024', activo_total: 8256.4, activo_corriente: 1741.0, pasivo_corriente: 938.8, pasivo_total: 4232.6, fondo_comercio: 2907.9, intangibles: 1631.7, inmovilizado_material: 1885.2, existencias: 684.9, clientes: 265.9, proveedores: 310.0, activos_contrato: null, pasivos_contrato: 216.1, caja: 678.9, deuda_financiera: 2723.9, arrendamientos: 145.6, patrimonio_neto: 3986.6, minoritarios: 37.2, reservas: 2496.0 },
      { periodo: '2025', activo_total: 7984.0, activo_corriente: 1441.2, pasivo_corriente: 1412.1, pasivo_total: 3857.8, fondo_comercio: 2883.8, intangibles: 1536.7, inmovilizado_material: 2024.6, existencias: 690.9, clientes: 192.8, proveedores: 277.8, activos_contrato: null, pasivos_contrato: 167.6, caja: 426.1, deuda_financiera: 2424.6, arrendamientos: 174.6, patrimonio_neto: 4090.5, minoritarios: 35.6, reservas: 2703.0 },
    ],
    vencimientos: [
      { anio: '2026', importe: 0 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 0 }, { anio: '2029', importe: 520 }, { anio: '2032', importe: 680 }, { anio: '2033+', importe: 975 },
    ],
    liquidez: 'Caja de 203,9 M (jun-26) + línea de crédito de 260 M de Sartorius AG (0,4 M dispuestos a dic-25) + líneas bilaterales bancarias de ≈129 M sin usar [A1, A3].',
    rating: 'Sin rating propio (los bonos los emite Sartorius Finance B.V., filial de Sartorius AG)',
    coste_deuda_pct: 4.6,
    vida_media_anios: 5.5,
    otros_pasivos: 'Casi toda la deuda (2.419,7 M de 2.424,7 M a dic-25) son préstamos de Sartorius Finance B.V. con las mismas condiciones que los bonos de 3.000 M que emitió Sartorius AG en 2023 para pagar Polyplus (cupones del 4,25 % al 4,875 %, vencimientos 2026-2035), más una comisión de tesorería «a coste más margen»; sin covenants [A1]. En mayo de 2026 el tramo de 520 M con vencimiento en septiembre se refinanció: SSB pagó 537,2 M y recibió 295 M en préstamos al 3,75 % (bono nuevo de 500 M de Sartorius Finance) [A3]. Otros pasivos asimilables a deuda: venta sin recurso de clientes por ≈307,8 M a dic-25 (269,7 M en 2024) [A1]; compensación de aranceles a clientes ≈23 M (jun-26) [A3]; pensiones 33,2 M [A3]. La opción de venta del 24 % de CellGenix (71,3 M) se liquidó en el 1S26 por 71,8 M [A3]. Compromiso de servicios con una empresa conjunta hasta 2033 (≈94 M) [A1].',
    comentario: 'La deuda saltó de 1.025 M en 2022 a 3.567 M en 2023 por Polyplus y bajó con la ampliación de capital de 1.194 M de 2024 y la caja libre: deuda bruta de 2.599 M (con arrendamientos) a dic-25 y 2.403 M a jun-26; deuda neta de 2.199 M, 2,36 veces el EBITDA subyacente [A3]. El circulante comercial cayó de 1.178 M en 2022 a 606 M en 2025 al deshacer el exceso de existencias; parte de la caída de clientes (192,8 M a dic-25 frente a 265,9 M) es factoring, no cobro: con los 307,8 M vendidos, los días de cobro reales rondan los 60 [A1]. En el 1S26 el circulante subió de 884 a 987 M con el crecimiento [A3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2020', flujo_operativo: 416.9, capex: 159.2, pagos_arrendamientos: 11.2, adquisiciones: 471.0, desinversiones: 0, dividendos: 31.3, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 8.1 },
      { periodo: '2021', flujo_operativo: 701.9, capex: 324.0, pagos_arrendamientos: 13.6, adquisiciones: 141.7, desinversiones: 0, dividendos: 62.7, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 8.3 },
      { periodo: '2022', flujo_operativo: 612.3, capex: 430.6, pagos_arrendamientos: 18.1, adquisiciones: 515.6, desinversiones: 0, dividendos: 116.1, recompras: 3.2, emision_acciones: 0, intereses_en_financiacion: 10.3 },
      { periodo: '2023', flujo_operativo: 746.4, capex: 473.6, pagos_arrendamientos: null, adquisiciones: 2241.0, desinversiones: 0, dividendos: 133.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 117.0 },
      { periodo: '2024', flujo_operativo: 815.1, capex: 339.8, pagos_arrendamientos: 23.8, adquisiciones: 0, desinversiones: 0, dividendos: 67.1, recompras: 1.9, emision_acciones: 1193.6, intereses_en_financiacion: 176.9 },
      { periodo: '2025', flujo_operativo: 692.2, capex: 393.2, pagos_arrendamientos: 20.9, adquisiciones: 0, desinversiones: 0, dividendos: 67.1, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 153.6 },
    ],
    comentario: 'El flujo operativo se movió entre 612 y 815 M en 2021-2025 aunque el EBITDA cayó un tercio en 2023-2024: la liberación de existencias (207,6 M en 2024) sostuvo la caja en la parte baja del ciclo [A2, A10]. El capex ha sido muy alto (17,1 % de las ventas en 2023, 13,3 % en 2025) por las ampliaciones de Aubagne, Gotinga, Songdo y Marlborough; la empresa no separa mantenimiento y crecimiento, y con la amortización sin compras en ≈205 M (6,9 % de las ventas) estimamos el capex de mantenimiento en ≈7 % de las ventas (estimación propia) [A2]. Los intereses se pagan en financiación (153,6 M en 2025). La caja libre de 2025 después de intereses y arrendamientos fue de ≈125 M; en el 1S26, 198,8 M según la empresa (antes de intereses), ayudada por la devolución de aranceles y menos impuestos [A3]. Los pagos de arrendamientos de 2023 no se han podido separar (van con la devolución de préstamos).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Audit y KPMG S.A. (cotitulares, obligatorio en Francia)',
    anios_auditor: null,
    opinion: 'Favorable (cuentas de 2025); revisión limitada sin salvedades del 1S26',
    comentario: 'Las cifras cuadran entre el XBRL ESEF, el Excel de la empresa y el URD: ingresos (RevenueFromContractsWithCustomers) iguales a las ventas publicadas todos los años y deuda financiera = préstamos a largo más corto plazo (2.424,6 M en 2025 = 1.867,3 + 557,3) [A1, A9]. El XBRL no recoge los arrendamientos dentro de la deuda (174,6 M aparte), ni el factoring (307,8 M), ni la opción de CellGenix: los añadimos al puente. La contabilidad tiene tres puntos que vigilar. Primero, el BPA «subyacente» que guía al mercado excluye cada año extraordinarias que se repiten (70-107 M en 2023-2025) y la amortización de compras (112,6 M). Segundo, el factoring creciente (269,7 → 307,8 M) mejora la caja y los días de cobro publicados. Tercero, las operaciones con el grupo Sartorius: 103,7 M de servicios centrales, 19,6 M de canon de marca (12,0 M en 2024) y 2.426 M de deuda con el grupo [A1]. El 1S26 lleva un efecto técnico de aranceles (devolución en coste de ventas y compensación a clientes en ventas) que la empresa declara neutral en el margen del semestre [A3].',
    senales: [
      { senal: 'Partidas «extraordinarias» que se repiten todos los años', nivel: 'Media', comentario: '26,5 / 46,3 / 99,1 / 106,7 / 70,0 M en 2021-2025: inflan el EBITDA y el BPA subyacentes [A2, A7, A10].' },
      { senal: 'Factoring sin recurso creciente', nivel: 'Media', comentario: '307,8 M de clientes vendidos a dic-25 (+38 M en el año): deuda económica fuera del balance [A1].' },
      { senal: 'Canon de marca a la matriz +63 %', nivel: 'Media', comentario: '19,6 M en 2025 frente a 12,0 M en 2024 [A1].' },
      { senal: 'Efecto técnico de la devolución de aranceles en 2026', nivel: 'Baja', comentario: 'Devolución en coste de ventas, compensación de ≈23 M restada de ventas; hasta 35 M en el año [A3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo de en torno al 15-20 % del beneficio subyacente: 0,69 EUR por 2024 y por 2025 (67 M), frente a 1,44 EUR por 2022 [A2]. No hay recompras: la junta de 2026 solo renovó la autorización técnica (resolución 12) [C2]. La prioridad declarada es invertir en capacidad (capex en torno al 13 % de las ventas en 2026), reducir la deuda a algo más de 2 veces el EBITDA y compras selectivas [A3, A6].',
    adquisiciones: [
      { anio: '2023', objetivo: 'Polyplus (vectores de transfección y reactivos para terapias génicas)', importe: 2400, ev_ebitda: null, financiacion: 'Préstamos de Sartorius AG financiados con bonos de 3.000 M; ampliación de capital de 1.194 M en 2024', resultado: 'Sin deterioro, pero las terapias génicas crecieron menos de lo previsto; añade ≈112 M anuales de amortización y la mayor parte de los 2.884 M de fondo de comercio [A1].' },
      { anio: '2022', objetivo: 'Albumedix y división de purificación de Novasep', importe: 516, ev_ebitda: null, financiacion: 'Deuda con la matriz', resultado: 'Integradas en medios y cromatografía; sin deterioros publicados [A7].' },
      { anio: '2021', objetivo: 'CellGenix (76 %; el 24 % restante comprado en 2026 por 71,8 M)', importe: 142, ev_ebitda: null, financiacion: 'Caja y deuda con la matriz', resultado: 'Opción de venta liquidada en el 1S26 [A3].' },
      { anio: '2020', objetivo: 'BIA Separations y unidades de Danaher (Biosafe, purificación)', importe: 471, ev_ebitda: null, financiacion: 'Deuda con la matriz', resultado: 'Pagos aplazados de BIA liquidados en 2022-2023 [A7].' },
    ],
    comentario: 'La dirección compró caro en el pico: Polyplus por 2.400 M en marzo de 2023, con ventas «de dos cifras altas» de millones, justo antes del desestocaje; el ROIC del grupo cayó del 25-30 % de 2021-2022 a un dígito y la deuda neta llegó a 4,5 veces el EBITDA, lo que obligó a una ampliación de 1.194 M en 2024 (5,15 M de acciones nuevas, +5,6 % de dilución) [A1, A2]. Desde entonces la asignación es prudente: sin compras grandes, capex alto pero decreciente y deuda a la baja. La remuneración variable a largo plazo (crecimiento orgánico, BPA y CO2) no premia el rendimiento sobre el capital, y eso explica en parte el historial.',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'flujos', campo: 'pagos de arrendamientos de 2023', tipo: 'Complemento', intentos: '1) Excel FY2024 (no separa la devolución de arrendamientos); 2) URD 2025 (solo 2024 y 2025); 3) estimación por diferencia de los movimientos de arrendamientos (no publicada)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'consenso previo de cada trimestre (vs_consenso)', tipo: 'Complemento', intentos: '1) Notas de resultados (no lo citan); 2) prensa (Boursorama, Reuters por buscador, sin cifra fiable); 3) MarketScreener (solo consenso anual)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Universal Registration Document 2025: mercado biofarmacéutico, competidores, riesgos y sostenibilidad', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-16', url: URD25 },
  { id: 2, titulo: 'First-Half Financial Report 2026: objetivos a medio plazo del día del inversor (mercado de bioprocesado +8-10 % anual)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-07-23', url: H1R },
  { id: 3, titulo: 'Danaher Reports Fourth Quarter and Full Year 2025 Results (Biotecnología: crecimiento básico 6,5 %, margen operativo 25,6 %)', editor: 'Danaher Corporation', tipo: 'Primaria', fecha: '2026-01-28', url: 'https://investors.danaher.com/2026-01-28-Danaher-Reports-Fourth-Quarter-and-Full-Year-2025-Results' },
  { id: 4, titulo: 'Thermo Fisher completes acquisition of Solventum’s Purification & Filtration business (≈4.000 M USD; ≈750 M USD de ventas en 2025)', editor: 'Thermo Fisher Scientific (Business Wire)', tipo: 'Primaria', fecha: '2025-09-02', url: 'https://www.businesswire.com/news/home/20250902757637/en' },
  { id: 5, titulo: 'Bioprocessing Equipment Market size (≈48.100 M USD en 2025)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/bioprocessing-equipment-market' },
  { id: 6, titulo: 'Bioprocessing Market Global Industry Analysis and Forecast 2026-2035 (≈48.680 M USD en 2025; consumibles y reactivos ≈44 %)', editor: 'Next Move Strategy Consulting', tipo: 'Sectorial', fecha: '2026', url: 'https://www.nextmsc.com/report/bioprocessing-market-hc5951' },
  { id: 7, titulo: 'Repligen (RGEN): estadísticas (ventas 785 M USD LTM, EBITDA 144 M, caja neta, PER adelantado 77,8x)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rgen/statistics/' },
  { id: 8, titulo: 'Sartorius Stedim Biotech to acquire Polyplus (≈2.400 M EUR)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2023-03-31', url: 'https://www.sartorius.com/en/company/newsroom/corporate-news/sartorius-stedim-biotech-to-acquire-polyplus-1410678' },
  { id: 9, titulo: 'Pour la Bourse, Sartorius Stedim Biotech paye trop cher l’acquisition de Polyplus', editor: 'BFM Bourse / Tradingsat', tipo: 'Prensa', fecha: '2023-03-31', url: 'https://www.tradingsat.com/sartorius-sted-bio-FR0013154002/actualites/sartorius-sted-bio-pour-la-bourse-sartorius-stedim-biotech-paye-trop-cher-l-acquisition-de-polyplus-1063183.html' },
  { id: 10, titulo: 'Universal Registration Document 2022 (historia, objetivo de 4.400 M y margen > 35 % para 2025)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2023-02', url: 'https://www.sartorius.com/download/1379314/ssb-annual-report-2022-e-data.pdf' },
  { id: 11, titulo: 'Ficha sectorial «Herramientas y consumibles de bioproducción» (14-oct-2026)', editor: 'Análisis propio (sectores/bioproduccion-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/bioproduccion-2026-10-14.md' },
  { id: 12, titulo: 'Merck KGaA: Life Science 9.000 M EUR de ventas y 2.600 M de EBITDA pre en 2025 (vía el análisis de Merck KGaA del repositorio, 14-oct-2026)', editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-03', url: 'https://www.merckgroup.com/en/investors/reports-and-financials.html' },
  { id: 13, titulo: 'Thermo Fisher: segmento Life Sciences Solutions 10.374 M USD en 2025 (vía el análisis de Thermo Fisher del repositorio, 14-oct-2026)', editor: 'Thermo Fisher Scientific', tipo: 'Primaria', fecha: '2026-02', url: 'https://ir.thermofisher.com/investors/financials/annual-reports/default.aspx' },
];

const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Sartorius nació en Gotinga en 1870 como taller de balanzas; Stedim, en Aubagne, fabricaba bolsas de un solo uso para la industria farmacéutica. En 2007 Sartorius AG aportó su división de biotecnología a la cotizada francesa Stedim y nació Sartorius Stedim Biotech, controlada por la matriz alemana. Con la sustitución del acero por el plástico de un solo uso en la fabricación de biológicos, las ventas pasaron de ≈1.000 M en 2015 a 3.493 M en 2022, con un salto por la pandemia; en 2023 el desestocaje de los clientes las bajó un 18,7 % y la compra de Polyplus (2.400 M) disparó la deuda [B1, B8, B10]. Desde 2023 el consejero delegado es René Fáber; Joachim Kreuzburg, presidente desde 2007, dejó el consejo en junio de 2025 y le sustituyó Michael Grosse, consejero delegado de Sartorius AG [C1].',
    hitos: [
      { anio: '1978', hito: 'Stedim empieza en Aubagne con bolsas de un solo uso para soluciones parenterales.' },
      { anio: '2007', hito: 'Fusión de la biotecnología de Sartorius AG con Stedim: nace Sartorius Stedim Biotech, controlada por Sartorius AG.' },
      { anio: '2016', hito: 'Desdoblamiento de 6 por 1; entra en el SBF 120 y luego en el CAC 40 (2017).' },
      { anio: '2020-2021', hito: 'Pandemia: ventas +33 % y +51 %; compras de BIA Separations, Biosafe y CellGenix.' },
      { anio: '2022', hito: 'Objetivo de 4.400 M de ventas y margen > 35 % para 2025 (luego incumplido: 2.967 M y 30,8 %).' },
      { anio: '2023', hito: 'Desestocaje: ventas −18,7 % a tipos constantes; compra de Polyplus por 2.400 M financiada con deuda de la matriz.' },
      { anio: '2024', hito: 'Ampliación de capital de 1.194 M para bajar la deuda; ventas planas.' },
      { anio: '2025', hito: 'Recuperación (+9,6 %); Michael Grosse sustituye a Kreuzburg en la presidencia.' },
      { anio: '2026', hito: 'Día del inversor con objetivos del 9-12 % anual desde 2027; devolución de aranceles de EE. UU.' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'Mercado relevante: tecnologías y consumibles para fabricar medicamentos biológicos (bioprocesado): biorreactores y bolsas de un solo uso, medios de cultivo y reactivos, filtración y membranas, cromatografía, gestión de fluidos y analítica de proceso, en todo el mundo. Excluye la fabricación por encargo (CDMO como Lonza o Samsung Biologics, que son clientes) y los instrumentos de laboratorio. Los estudios de mercado dan cifras muy dispares (48.000-67.000 M USD «de equipos») porque suman perímetros distintos; usamos la estimación ascendente de la ficha sectorial: ≈27.000 M EUR en 2025, contrastada con la suma de ingresos de bioprocesado de Danaher (Cytiva), Thermo Fisher, Merck KGaA, Sartorius y Repligen [B11, B3, B5, B6].',
    tamano: '≈ 27.000 M EUR en 2025 (estimación propia ascendente de la ficha sectorial [B11]; Next Move estima ≈ 48.680 M USD con un perímetro más amplio [B6])',
    unidad_serie: 'millones de EUR (estimación propia)',
    serie: [
      { anio: '2022', tamano: 27000 }, { anio: '2023', tamano: 23500 }, { anio: '2024', tamano: 24000 }, { anio: '2025', tamano: 26500 }, { anio: '2026e', tamano: 28500 }, { anio: '2028e', tamano: 33500 }, { anio: '2030e', tamano: 39000 },
    ],
    tcac_historico_pct: 4.0,
    tcac_previsto_pct: 8.5,
    cr5_pct: 60.0,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Crecimiento de los biológicos (anticuerpos, GLP-1 biológicos, ADC)', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de biofármacos +10 % en 2025 hasta 617.000 M USD, 51 % del mercado farmacéutico [B1].' },
      { driver: 'Consumibles recurrentes ligados a la producción comercial', efecto: '+', horizonte: 'Estructural', evidencia: '86 % de las ventas de SSB son recurrentes (1S26) [A3].' },
      { driver: 'Inversión de los clientes en capacidad (equipos)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Equipos de bioprocesado con caída de dos cifras en 2025 en Danaher; en SSB vuelven a crecer ligeramente en el 2T26 [B3, A3].' },
      { driver: 'Ciclo de existencias de los clientes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Desestocaje 2023-2024: SSB −18,7 % en 2023 y +0,6 % en 2024 [A11].' },
      { driver: 'Aranceles y relocalización de la producción en EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Aranceles IEEPA anulados en feb-26; quedan otros aranceles; anuncios de fábricas de farmacéuticas en EE. UU. [A3].' },
      { driver: 'Biosimilares y presión de precios en China', efecto: '−', horizonte: 'Estructural', evidencia: 'Competidores chinos de bolsas y medios citados como riesgo por la empresa [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cuatro grandes (Cytiva, Thermo, Merck, Sartorius) con márgenes EBITDA del 25-35 %; la rivalidad es en innovación y servicio más que en precio [B1, B3].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes farmacéuticas y CDMO compran mucho, pero los consumibles pesan poco en el coste del medicamento y cambiar de proveedor exige revalidar el proceso [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Polímeros, resinas y componentes con varios proveedores; la integración vertical (membranas en Gotinga) reduce la dependencia [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras regulatorias y de validación altas; los entrantes chinos ganan en su mercado, todavía poco fuera [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'El acero inoxidable y el proceso continuo cambian la mezcla, no eliminan los consumibles; Sartorius vende ambos [B1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El sector vivió un auge con la pandemia (2020-2022), un desestocaje profundo en 2023 (Sartorius −18,7 %, Repligen y Cytiva con caídas parecidas) y una recuperación desde 2025 liderada por consumibles; los equipos siguen débiles por la prudencia de los clientes en capacidad [A11, B3]. En 2009 el negocio apenas cayó (consumibles ligados a la producción). Indicadores: crecimiento de consumibles de los cuatro grandes, pedidos de equipos y tono de China. A mediados de 2026 los consumibles crecen a un dígito alto y los equipos se estabilizan: recuperación, aún no expansión.' },
    regulacion: 'La fabricación de biológicos está regulada por la FDA y la EMA: cada proceso validado fija sus consumibles y su proveedor, lo que da costes de cambio altos. Cambios en curso: la BIOSECURE Act en EE. UU. (limita a proveedores biotecnológicos chinos; favorece a los occidentales), la política arancelaria de EE. UU. (aranceles IEEPA anulados por el Tribunal Supremo el 20-feb-2026; otros siguen en vigor) y la restricción europea de PFAS, que afecta a membranas y filtros (Sartorius ya lanzó un filtro sin PFAS) [A3, B1].',
    tendencias: 'Proceso continuo e intensificado (Sartorius lanzó módulos Pionic), terapias celulares y génicas (plataforma Eveo, Polyplus), digitalización y datos para el desarrollo con IA (Ambr), y relocalización de la capacidad en EE. UU. y Asia (nueva planta en Songdo) [A3, A4, B1]. Sartorius gana con el proceso continuo y el un solo uso; pierde si las terapias génicas siguen creciendo menos de lo esperado (Polyplus).',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.0,
    posicion: 'N.º 3-4 mundial en bioprocesado (≈11 % de un mercado de ≈27.000 M EUR, estimación propia) tras Cytiva (Danaher) y junto a Thermo Fisher y Merck KGaA; cuotas «de dos dígitos altos» en bolsas de un solo uso, biorreactores y filtración [B1, B11].',
    competidores: [
      { nombre: 'Danaher (Cytiva, Pall): segmento Biotecnología', pais: 'EE. UU.', ticker: 'DHR', ingresos: 6250, cuota_pct: 23.0, margen_ebit_pct: 25.6, comentario: 'Líder en cromatografía, resinas y filtración; bioprocesado de más de 6.000 M USD, 80 % ligado a anticuerpos [B3].' },
      { nombre: 'Thermo Fisher: Life Sciences Solutions', pais: 'EE. UU.', ticker: 'TMO', ingresos: 9267, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bioproducción (medios, bolsas, resinas) dentro de un segmento más amplio; compró filtración de Solventum por ≈4.000 M USD en 2025 [B4, B13].' },
      { nombre: 'Merck KGaA: Life Science (Process Solutions)', pais: 'Alemania', ticker: 'MRK', ingresos: 9000, cuota_pct: null, margen_ebit_pct: null, comentario: 'Filtración, medios y servicios de proceso; margen EBITDA pre del segmento ≈29 % [B12].' },
      { nombre: 'Repligen', pais: 'EE. UU.', ticker: 'RGEN', ingresos: 701, cuota_pct: 2.6, margen_ebit_pct: null, comentario: 'Especialista en filtración de flujo tangencial y cromatografía; cotiza a 78 veces el beneficio esperado [B7].' },
      { nombre: 'Avantor y fabricantes chinos (Tofflon, Bioengine)', pais: 'EE. UU. / China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competencia en precio en consumibles estándar, sobre todo en China [B1].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'El proveedor queda fijado en el expediente regulatorio del medicamento; 86 % de ventas recurrentes [A3, B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Patentes en membranas, Ambr y plataformas de un solo uso; I+D de 133 M (4,5 % de las ventas) [A2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA subyacente del 30,8 %, cerca de Danaher Biotecnología pero sin ventaja de escala clara frente a Cytiva [A2, B3].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Cuatro proveedores globales comparten un mercado concentrado (CR5 ≈60 %) [B11].' },
      ],
    },
    amenazas: 'La amenaza principal no es la entrada sino la concentración del poder de compra (CDMO grandes como Lonza o Samsung Biologics que negocian volumen) y los proveedores chinos, que ya ganan cuota en China y pueden exportar si la BIOSECURE Act no les cierra EE. UU. Segunda amenaza: que las terapias celulares y génicas, en las que Sartorius pagó Polyplus, sigan creciendo poco. Probabilidad media en los dos casos [B1, B9].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos materiales son la huella de plástico de un solo uso (bolsas y filtros), el CO2 de la fabricación y los PFAS de las membranas. La empresa tiene objetivo de reducir un 42 % las emisiones de alcance 1 y 2 y liga una parte de la remuneración variable a largo plazo al CO2; en 2025 lanzó un filtro sin PFAS y bolsas con materias primas renovables certificadas [A6, B1]. La restricción europea de PFAS es el único que puede mover cifras (reformulación de membranas).',
    controversias: 'Sin sanciones, litigios ni incidentes relevantes en los últimos tres años en el URD 2025 [B1]. La controversia es de gobierno (tamaño de las operaciones con la matriz y votos en contra de los minoritarios en la junta de 2026), recogida en la sección de gobierno.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG (MSCI, Sustainalytics)', tipo: 'Complemento', intentos: '1) URD 2025 (no las publica); 2) web de la empresa (sin página de ratings de SSB); 3) búsqueda en MSCI y Sustainalytics (sin acceso)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tamaño de mercado con dos fuentes independientes en el mismo perímetro', tipo: 'Núcleo', intentos: '1) URD 2025 (no da tamaño del mercado de bioprocesado); 2) GMI, Next Move, Meticulous (perímetros de 48.000-67.000 M USD, no comparables); 3) estimación ascendente con los ingresos de los cinco grandes', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Universal Registration Document 2025: gobierno corporativo, consejo, remuneración, accionistas, partes vinculadas (nota 45) y operaciones de directivos', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-16', url: URD25 },
  { id: 2, titulo: 'Assemblée Générale Mixte du 24 mars 2026: résultat des votes', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-03-24', url: 'https://www.sartorius.com/download/1809240/ssb-resultat-des-votes-asm-2026-fr-data.pdf' },
  { id: 3, titulo: 'Alerte n° 3: Sartorius Stedim Biotech, assemblée de 2026 (comités, recompra, estatutos)', editor: 'Association française de la gestion financière (AFG)', tipo: 'Analistas', fecha: '2026-03', url: 'https://www.afg.asso.fr/app/uploads/2026/03/Div-n°-6458_03_Alerte-n°-3-SARTORIUS-STEDIM-BIOTECH.pdf' },
  { id: 4, titulo: 'BDIF: declaraciones de operaciones de directivos de Sartorius Stedim Biotech (última: 15-dic-2025)', editor: 'Autorité des marchés financiers', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://bdif.amf-france.org/back/api/v1/informations?RechercheTexte=SARTORIUS%20STEDIM&TypesInformation=DD&From=0&Size=20' },
  { id: 5, titulo: 'First-Half Financial Report 2026: partes vinculadas, refinanciación con Sartorius Finance, compra del 24 % de CellGenix', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-07-23', url: H1R },
  { id: 6, titulo: 'Sartorius shares rise after report of Elliott investment (Reuters)', editor: 'Stockopedia / Reuters', tipo: 'Prensa', fecha: '2026-05-18', url: 'https://www.stockopedia.com/share-prices/sartorius-ag-FRA:SRT3/news/sartorius-shares-rise-after-report-of-elliott-investment-019e6dd3-e4de-70ae-a5c3-ad2c47e5b5f8/' },
  { id: 7, titulo: 'Universal Registration Document 2024: comparación guía-real de 2024', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sartorius.com/download/1662024/fy-2024-download-ssb-annual-report-en-data.pdf' },
  { id: 8, titulo: 'Universal Registration Document 2022: objetivo de 2025 (4.400 M de ventas, margen > 35 %)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2023-02', url: 'https://www.sartorius.com/download/1379314/ssb-annual-report-2022-e-data.pdf' },
  { id: 9, titulo: 'Earnings Release 9M 2025 (guía de 2025 afinada) y nota de resultados de 2025', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2025-10-16', url: 'https://www.sartorius.com/download/1754002/9m-2025-download-earnings-report-ssb-en-data.pdf' },
];

const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'René Fáber', cargo: 'Consejero delegado (y miembro del comité ejecutivo de Sartorius AG, responsable de Bioprocess Solutions)', desde: '2023', participacion_pct: null, trayectoria: 'En el grupo Sartorius desde 2016 (marketing y producto en bioprocesado); consejero de SSB desde 2019 y consejero delegado desde marzo de 2023, justo al inicio del desestocaje. Con él las ventas bajaron un 18,7 % en 2023 y volvieron a crecer un 9,6 % en 2025 [C1, C7].' },
      { nombre: 'Michael Grosse', cargo: 'Presidente del consejo (consejero delegado de Sartorius AG)', desde: '2025', participacion_pct: null, trayectoria: 'Consejero delegado de Sartorius AG desde 2025; sustituyó a Joachim Kreuzburg en la presidencia de SSB el 1-jul-2025 por cooptación, ratificada en la junta de 2026 con el 21,6 % de los votos libres en contra [C1, C2].' },
      { nombre: 'Lothar Kappich', cargo: 'Consejero dominical (presidente del consejo de supervisión de Sartorius AG y albacea de la herencia de Horst Sartorius)', desde: '2017', participacion_pct: null, trayectoria: 'Representa los intereses de la familia Sartorius en el grupo [C1].' },
      { nombre: 'Joachim Kreuzburg', cargo: 'Presidente hasta el 30-jun-2025 (antes presidente y consejero delegado, 2007-2023)', desde: '2007', participacion_pct: null, trayectoria: 'Arquitecto de la estrategia de un solo uso y de las compras de 2020-2023, incluida Polyplus; salió del grupo en 2025 [C1].' },
    ],
    historial_guidance: [
      { anio: '2022 (objetivo a medio plazo para 2025)', guia: 'Ventas de ≈4.400 M y margen EBITDA subyacente > 35 % en 2025', real: '2.967,5 M y 30,8 %', cumplida: 'No' },
      { anio: '2024', guia: 'Ene-24: ventas + un dígito medio-alto, margen > 30 %; jul-24: entre −un dígito bajo y +un dígito bajo, margen 27-29 %', real: '+0,6 % y 28,0 %', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Ene-25: aumento moderado de ventas y margen; abr-25: ≈+7 % (±2 pp) y 30-31 %; oct-25: ≈+9 % y ≈31 %', real: '+9,6 % y 30,8 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'Feb-26: +6-10 % a tipos constantes y margen algo > 31 %; jul-26: confirmada, en la mitad baja por la compensación de aranceles', real: '1S26: +6,4 % (8,0 % operativo) y 31,4 %', cumplida: 'Parcial' },
    ],
    comentario: 'La credibilidad de la guía se dañó en 2023-2024: el objetivo de 2025 (4.400 M y > 35 %) se quedó un 33 % corto en ventas, y la guía de 2024 hubo que recortarla a mitad de año. Desde 2025 la dirección guía con rangos amplios y los cumple. El equipo es estable pero muy ligado a la matriz: el consejero delegado y el presidente son a la vez directivos de Sartorius AG, y las funciones centrales (finanzas, relación con inversores, jurídico) las presta una filial de la matriz [C1, C7, C8, C9]. No hay un plan de sucesión propio de SSB distinto del del grupo.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Michael Grosse', cargo: 'Presidente', tipo: 'Dominical', desde: '2025', comisiones: 'Nombramientos y remuneraciones' },
      { nombre: 'René Fáber', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Lothar Kappich', cargo: 'Consejero', tipo: 'Dominical', desde: '2017', comisiones: 'Auditoría' },
      { nombre: 'Pascale Boissel', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Susan Dexter', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Nombramientos y remuneraciones' },
      { nombre: 'Anne-Marie Graffin', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Nombramientos y remuneraciones' },
      { nombre: 'Cécile Dussart', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Christopher Nowers', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Romaine Fernandes', cargo: 'Consejera en representación de los empleados', tipo: 'Otro externo', desde: '2023', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 91.99, voto_remuneracion_contra_pct: 8.01, voto_remuneracion_contra_libre_pct: 66.4, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.72, fijo: 0.85, variable_corto: 0.62, variable_largo: 0.25, ratio_salario_medio: null },
    remuneracion: 'La remuneración de René Fáber cargada a SSB fue de 1,72 M en 2025 (0,85 M fijo, 0,62 M de variable anual y 0,25 M de variable a largo plazo), +42 % sobre 2024; la paga Sartorius AG y SSB la reembolsa [C1]. El variable a largo plazo depende del crecimiento orgánico, el BPA y el CO2, no del ROIC ni del rendimiento para el accionista de SSB [C1]. En la junta de 2026 la política de remuneración del consejero delegado salió con el 92,0 % a favor, pero solo por el voto de Sartorius AG: de los 18,6 M de votos libres (por correspondencia), 12,4 M (66,4 %) votaron en contra; el informe de remuneraciones (resolución 5) tuvo un 54,4 % en contra del capital libre [C2]. La AFG emitió una alerta por la falta de comités separados de nombramientos y de remuneración [C3].',
    accionistas: [
      { nombre: 'Sartorius AG (directa)', pct: 70.7, tipo: 'Control (82,5 % de los votos por el voto doble)', variacion: 'Vendió 750.000 acciones a su filial Sartorius Lab Holding el 10-dic-2025 (operación interna)' },
      { nombre: 'Sartorius Lab Holding GmbH (100 % de Sartorius AG)', pct: 0.8, tipo: 'Control', variacion: 'Compró 750.000 acciones a 211,10 EUR a su matriz (dic-25)' },
      { nombre: 'Capital flotante', pct: 28.5, tipo: 'Libre', variacion: 'Subió del 26,4 % al 28,5 % con la ampliación de 2024' },
      { nombre: 'Autocartera', pct: 0.03, tipo: 'Autocartera', variacion: '33.986 acciones (dic-25)' },
    ],
    insiders: [
      { fecha: '2025-12-10', persona: 'Sartorius AG (persona vinculada a M. Grosse, R. Fáber y L. Kappich)', operacion: 'Venta', acciones: 750000, importe: 158.3 },
    ],
    control_y_defensas: 'Sartorius AG controla el 71,5 % del capital y el 82,9 % de los votos gracias al voto doble francés (acciones nominativas con más de cuatro años) [C1]; nombra al presidente y al consejero delegado, que son directivos suyos, y presta a SSB casi toda su deuda (2.420 M) y sus funciones centrales (103,7 M de servicios, 19,6 M de canon de marca) [C1]. Cinco de nueve consejeros son independientes y la comisión de auditoría la preside una independiente, pero las operaciones con la matriz son la parte central de la relación y los minoritarios no tienen capacidad de bloqueo. En mayo de 2026 se publicó que Elliott había tomado una participación en Sartorius AG (y en Bio-Rad, que tiene ≈28 % de la matriz) para presionar por valor [C6]: una simplificación de la estructura (fusión o compra de los minoritarios de SSB) es posible pero no anunciada.',
    alertas: [
      'Los minoritarios votaron en contra de la política de remuneración del consejero delegado (66,4 % del capital libre) y del informe de remuneraciones (54,4 %) en la junta de 2026; salieron adelante por el voto de Sartorius AG [C2].',
      'Canon de marca a la matriz de 19,6 M en 2025, +63 % sobre 2024, y deuda con el grupo de 2.426 M con comisión de tesorería [C1].',
      'Sin comités separados de nombramientos y remuneración (alerta de la AFG, 2026) [C3].',
      'Elliott en el accionariado de Sartorius AG y de Bio-Rad (mayo de 2026): posible cambio en la estructura del grupo [C6].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'ratio_salario_medio del consejero delegado', tipo: 'Complemento', intentos: '1) URD 2025 (ratio de equidad de la sociedad matriz, no del grupo); 2) informe de remuneraciones (no da el coste medio por empleado del grupo); 3) cálculo con gastos de personal ÷ empleados (no publicado por separado)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'DIM.PA, ^FCHI y EXV4.DE: históricos diarios hasta el 14-oct-2026 (precio, rango, volumen, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/DIM.PA/history' },
  { id: 2, titulo: 'Sartorius Stedim Biotech (DIM): estimaciones anuales 2026-2028, 14 analistas, objetivo medio 237,29 EUR', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://uk.marketscreener.com/quote/stock/SARTORIUS-STEDIM-BIOTECH-27471609/finances/' },
  { id: 3, titulo: 'Results: Sartorius Stedim Biotech exceeded expectations and the consensus has updated its estimates (13 analistas; BPA 2026 3,83; objetivo 232 EUR, rango 208-262)', editor: 'Simply Wall St (vía Webull)', tipo: 'Analistas', fecha: '2026-07-25', url: 'https://www.webull.ca/news-detail/15292621215376384' },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro (USD 1,1195; CHF 0,9330)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Estructura temporal de la deuda federal alemana, 10 años (3,51 % el 14-oct-2026)', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' },
  { id: 6, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, 4,20 % en octubre de 2026)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Análisis value de Thermo Fisher, Danaher, Mettler-Toledo, Merck KGaA y Lonza del repositorio (cifras de mercado del 7 al 13-oct-2026)', editor: 'Análisis propios (informes/*-2026-10-14)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'informes/' },
  { id: 8, titulo: 'Repligen (RGEN): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rgen/statistics/' },
  { id: 9, titulo: 'Sartorius AG (SRT3): estadísticas (capitalización 16.010 M, valor empresa 20.950 M, PER adelantado 62,8x)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/quote/etr/SRT3/statistics/' },
  { id: 10, titulo: 'Financial Data FY 2025 y URD 2022 (BPA subyacente 2018-2025)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-02-16', url: 'https://www.sartorius.com/download/1796602/fy-2025-download-financial-data-ssb-data.xlsx' },
  { id: 11, titulo: 'Thermo Fisher completes acquisition of Solventum’s Purification & Filtration business', editor: 'Thermo Fisher Scientific (Business Wire)', tipo: 'Primaria', fecha: '2025-09-02', url: 'https://www.businesswire.com/news/home/20250902757637/en' },
  { id: 12, titulo: 'Sartorius Stedim Biotech to acquire Polyplus', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2023-03-31', url: 'https://www.sartorius.com/en/company/newsroom/corporate-news/sartorius-stedim-biotech-to-acquire-polyplus-1410678' },
  { id: 13, titulo: 'Merck KGaA: compra de Bio-Techne (≈26,5 veces el EBITDA, prima del 25 %), vía el análisis de Merck KGaA del repositorio', editor: 'Merck KGaA', tipo: 'Primaria', fecha: '2026-06', url: 'https://www.merckgroup.com/en/news.html' },
  { id: 14, titulo: 'Danaher completes acquisition of the Biopharma business of GE Life Sciences (Cytiva, 21.100 M USD)', editor: 'Danaher Corporation', tipo: 'Primaria', fecha: '2020-03-31', url: 'https://investors.danaher.com/' },
  { id: 15, titulo: 'First-Half Financial Report 2026 (calendario: resultados de 9 meses el 22-oct-2026; acciones)', editor: 'Sartorius Stedim Biotech S.A.', tipo: 'Primaria', fecha: '2026-07-23', url: H1R },
];

const b = bolsa.bolsa;
const usd = (x) => Math.round(x / EURUSD);
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Sartorius Stedim Biotech S.A.', nombre_corto: 'Sartorius Stedim', ticker: 'DIM', isin: 'FR0013154002', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Salud', industria: 'Herramientas y servicios de ciencias de la vida (bioprocesado)', sede: 'Aubagne (Francia)', fundacion: '1978', empleados: 10477, web: 'https://www.sartorius.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 97.30, capitalizacion_publicada: null, free_float_pct: 28.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toString().replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Guía de 2026 (3-feb-2026, confirmada el 23-abr y el 23-jul): ventas +6-10 % a tipos constantes, ahora en la mitad baja por la compensación de aranceles a clientes (hasta 35 M), con el negocio operativo hacia el punto medio; margen EBITDA subyacente algo por encima del 31 %; capex en torno al 13 % de las ventas; deuda neta algo por encima de 2 veces el EBITDA subyacente [D15]. Objetivo a medio plazo (día del inversor, marzo de 2026): crecimiento orgánico del 9-12 % anual desde 2027 y +60-85 pb de margen al año [D15].',
    estimaciones: [
      { periodo: '2026e', ingresos: 3133, ebitda: 972.8, ebit: 620.1, bpa: 3.90, dpa: 0.83, fuente: 'MarketScreener, 14 analistas (BPA publicado, no subyacente) [D2]' },
      { periodo: '2027e', ingresos: 3479, ebitda: 1111, ebit: 745.8, bpa: 5.06, dpa: 1.01, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 3859, ebitda: 1263, ebit: 877.8, bpa: 6.13, dpa: 1.24, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 237.29, po_min: 208, po_max: 262 },
    revisiones: 'Tras el 1S26 el consenso recortó el BPA publicado de 2026 de 3,93 a 3,83 EUR y las ventas de 3.170 a 3.130 M por la compensación de aranceles; el objetivo medio se mantuvo en 232 EUR (rango 208-262) [D3]. En octubre MarketScreener da 3,90 EUR y un objetivo medio de 237,29 EUR con 14 analistas y consenso «comprar» [D2]. UBS subió a comprar con objetivo de 260 EUR el 20-ago-2026 (comentado en foros, sin el documento original). Solo una fuente con estimaciones completas: el EBITDA del consenso es el subyacente (972,8 M en 2026 = 31,0 %) y el BPA es el publicado.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual.filter((x) => Number(x.anio) >= 2017),
    beta: b.beta, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción multiplicó por ocho entre 2017 y noviembre de 2021 (máximo de ≈590 EUR) con el un solo uso y la pandemia, y cayó un 71,8 % hasta julio de 2024 con el desestocaje, la compra de Polyplus y la ampliación de capital [D1]. En los últimos 12 meses sube un 18,3 % frente al −0,6 % del CAC 40, pero con caídas fuertes: −14,2 % el 23-abr-2026 (1T con equipos débiles y margen plano), −7,5 % el 21-jul (resultados de Danaher en bioprocesado) y −6,4 % el 23-jul (1S26). Desde el mínimo de 150 EUR del 30-abr ha subido un 44 %, con la mejora de UBS en agosto y la recuperación del sector [D1]. Volatilidad del 40,6 %, el doble que el índice.',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => Number(x.anio) >= 2020).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2020', '2021', '2022'].includes(x.anio) })),
    comentario: 'Con el BPA subyacente, la acción cotizó a 36,7 veces en 2018 y 51,8 en 2019, subió a 64-70 en 2020-2021 (pico de la pandemia) y quedó a 47,7 veces el BPA de 2025 al cierre de 2025 [D10]. Sobre el BPA del año siguiente (base adelantada), 25,3x en 2017, 30,6x en 2018, 35,5x en 2019, 42,9x en 2024 y ≈43x en 2025; hoy, 38,6x nuestro BPA de 2027. Excluimos 2020-2022 de la comparación con el beneficio publicado porque los beneficios de la pandemia y el desestocaje no son repetibles.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Proveedores de herramientas y consumibles para fabricar biológicos y ciencias de la vida con BPA ajustado: Thermo Fisher, Danaher (Cytiva), Merck KGaA (Life Science), Mettler-Toledo, Repligen (puro de bioprocesado) y Lonza (CDMO, cliente y comparable de ciclo). Cifras de los análisis del repositorio del 7 al 13-oct, en euros con el BCE del 14-oct; Repligen del 14-oct. Sartorius AG se deja fuera de la mediana: tiene a SSB dentro (71,5 %) y su PER es contable (62,8x) [D7, D8, D9].',
    empresas: [
      { nombre: 'Thermo Fisher', ticker: 'TMO', pais: 'US', capitalizacion: usd(249966), ev_ventas: 6.21, ev_ebitda_ltm: 26.1, ev_ebitda_ntm: null, per_ntm: 24.6, crecimiento_pct: 3.1, margen_ebitda_pct: 23.8, roic_pct: 7.3, dn_ebitda: 3.5, fcf_yield_pct: 2.5 },
      { nombre: 'Danaher', ticker: 'DHR', pais: 'US', capitalizacion: usd(151545), ev_ventas: 6.92, ev_ebitda_ltm: 24.5, ev_ebitda_ntm: null, per_ntm: 25.3, crecimiento_pct: null, margen_ebitda_pct: 28.2, roic_pct: 5.5, dn_ebitda: 3.1, fcf_yield_pct: 3.5 },
      { nombre: 'Merck KGaA', ticker: 'MRK', pais: 'DE', capitalizacion: 59655, ev_ventas: 3.33, ev_ebitda_ltm: 11.7, ev_ebitda_ntm: 11.7, per_ntm: 17.6, crecimiento_pct: 3.4, margen_ebitda_pct: 28.5, roic_pct: 7.5, dn_ebitda: 1.5, fcf_yield_pct: 3.3 },
      { nombre: 'Mettler-Toledo', ticker: 'MTD', pais: 'US', capitalizacion: usd(32065), ev_ventas: 8.26, ev_ebitda_ltm: 26.7, ev_ebitda_ntm: null, per_ntm: 31.6, crecimiento_pct: 2.5, margen_ebitda_pct: 31.0, roic_pct: 47.6, dn_ebitda: 1.6, fcf_yield_pct: 2.6 },
      { nombre: 'Lonza', ticker: 'LONN', pais: 'CH', capitalizacion: Math.round(40028 / EURCHF), ev_ventas: 6.01, ev_ebitda_ltm: 17.8, ev_ebitda_ntm: null, per_ntm: 27.3, crecimiento_pct: null, margen_ebitda_pct: 33.7, roic_pct: 9.3, dn_ebitda: 1.4, fcf_yield_pct: 2.1 },
      { nombre: 'Repligen', ticker: 'RGEN', pais: 'US', capitalizacion: usd(10110), ev_ventas: 12.46, ev_ebitda_ltm: 67.9, ev_ebitda_ntm: null, per_ntm: 77.8, crecimiento_pct: null, margen_ebitda_pct: 18.4, roic_pct: 2.6, dn_ebitda: -0.8, fcf_yield_pct: 1.1 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'Bio-Techne', comprador: 'Merck KGaA', ev: 9900, ev_ventas: null, ev_ebitda: 26.5, prima_pct: 25, excluir: false, comentario: 'Reactivos y herramientas de ciencias de la vida; ≈26,5 veces el EBITDA esperado [D13].' },
      { fecha: '2025-09', objetivo: 'Filtración y purificación de Solventum', comprador: 'Thermo Fisher', ev: usd(4000), ev_ventas: 4.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '≈4.000 M USD por un negocio de ≈1.000 M USD de ventas en 2024 (≈750 M en 2025) [D11].' },
      { fecha: '2023-03', objetivo: 'Polyplus', comprador: 'Sartorius Stedim Biotech', ev: 2400, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Ventas «de dos cifras altas de millones» y margen EBITDA «muy alto» en 2023: más de 20 veces las ventas (estimación) [D12].' },
      { fecha: '2020-03', objetivo: 'Cytiva (biofarma de GE)', comprador: 'Danaher', ev: usd(21100), ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'La compra que creó al líder del sector [D14].' },
    ],
    comentario: 'Las compras del sector se pagan a 25-30 veces el EBITDA (Bio-Techne 26,5x) y a más de 20 veces las ventas en activos de terapias génicas (Polyplus); solo dos operaciones tienen múltiplo publicado. SSB no es candidata a una compra de terceros mientras Sartorius AG tenga el 71,5 %; la operación posible es interna: que la matriz compre a los minoritarios o fusione las dos sociedades, algo que la entrada de Elliott en Sartorius AG en mayo de 2026 hace algo más probable [C6]. Sin peso en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta registrada (AMF)', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas netas de la AMF (sin posiciones > 0,5 % publicadas encontradas); 2) prensa (sin dato); 3) proveedores de datos (de pago)', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'consenso del BPA subyacente y reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo BPA publicado y número de analistas); 2) web de inversores de Sartorius (sin consenso publicado); 3) Simply Wall St / Webull (BPA publicado)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'tres o más operaciones con múltiplo publicado', tipo: 'Complemento', intentos: '1) Notas de las compras (Polyplus, Cytiva: sin EBITDA); 2) análisis del repositorio (solo Bio-Techne con EBITDA); 3) prensa (múltiplos estimados, no publicados)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Forum SARTORIUS STED BIO: hilo «Resultats» (1S26)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-07-23', url: 'https://www.boursorama.com/bourse/forum/1rPDIM/detail/468250763/' },
  { id: 2, titulo: 'Forum SARTORIUS STED BIO: «chute brutale -10 % à 12h05» y «Danaher!!»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-07-21', url: 'https://www.boursorama.com/bourse/forum/1rPDIM/detail/468244454/' },
  { id: 3, titulo: 'Forum SARTORIUS STED BIO: «Un petit +20 % serait-il possible ?» y «Effet....» (mejora de UBS)', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-09-30', url: 'https://www.boursorama.com/bourse/forum/1rPDIM/detail/468504047/' },
  { id: 4, titulo: 'Forum SARTORIUS STED BIO: «Bonjour, long sur la valeur»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://www.boursorama.com/bourse/forum/1rPDIM/detail/468487382/' },
  { id: 5, titulo: 'Forum SARTORIUS STED BIO: «Lonza» y «Merci Elliott»', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-07-22', url: 'https://www.boursorama.com/bourse/forum/1rPDIM/detail/468246888/' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Boursorama, hilo de resultados del 1S26', fecha: '2026-07', n_comentarios: 25, tono: 'Dividido', resumen: 'Unos ven buenos resultados y no entienden la caída; otros esperan bajar a 160 y comprar ahí; se repite que «el PER sigue un poco alto» [E1].' },
      { plataforma: 'Boursorama, hilos «chute brutale» y «Danaher!!»', fecha: '2026-07', n_comentarios: 25, tono: 'Negativo', resumen: 'Sorpresa por el −10 % por contagio de Danaher; varios recuerdan que la acción cotiza a 40-60 veces el beneficio y que «toda decepción se paga cara» [E2].' },
      { plataforma: 'Boursorama, hilos de septiembre (UBS, «+20 %»)', fecha: '2026-09', n_comentarios: 15, tono: 'Positivo', resumen: 'Celebran la subida desde 160 tras la mejora de UBS (objetivo 260); otros avisan de una vuelta a 200-202 [E3].' },
      { plataforma: 'Boursorama, «long sur la valeur»', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Particulares con objetivos técnicos de 250-320 EUR en 2027 [E4].' },
      { plataforma: 'Boursorama, «Lonza» y «Merci Elliott»', fecha: '2026-07', n_comentarios: 6, tono: 'Neutro', resumen: 'Extrañeza porque Lonza sube y SSB no; la entrada de Elliott en Sartorius AG se vio como un efecto breve [E5].' },
    ],
    temas: [
      { tema: 'Múltiplo exigente', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: 38,6 veces nuestro BPA subyacente de 2027 y ≈79 veces el publicado de los últimos 12 meses.' },
      { tema: 'Contagio de Danaher y del sector', postura: 'Dividida', peso: 'Medio', contraste: 'Los resultados de SSB del 1S26 fueron en línea; la acción se mueve con el sector (beta semanal de 2 años 1,38).' },
      { tema: 'Recuperación de equipos y China', postura: 'Alcista', peso: 'Medio', contraste: 'Asia-Pacífico +12,5 % en 1S26; equipos solo «ligero crecimiento».' },
      { tema: 'Análisis técnico y objetivos de 250-320 EUR', postura: 'Alcista', peso: 'Medio', contraste: 'Sin base en cifras: nuestro objetivo a 12 meses queda muy por debajo.' },
      { tema: 'Elliott y la matriz', postura: 'Dividida', peso: 'Bajo', contraste: 'No hay propuesta sobre los minoritarios de SSB.' },
    ],
    lectura: 'El foro francés de referencia está dividido: tras la subida del 44 % desde abril domina el optimismo técnico (objetivos de 250-320 EUR), pero una minoría recuerda que cualquier decepción se castiga con caídas del 10-15 % en un día, como en abril y julio. No hay euforia ni capitulación, y casi nadie habla del gobierno (votos en contra de los minoritarios, canon de marca) ni de la IA. El sentimiento no cambia la tesis; confirma que el precio ya refleja la recuperación y que los resultados del 22-oct son el riesgo inmediato.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
// Citas [B3, A3] → numeración local de cada nota; una fuente de otra nota se copia a esta (integrar la une por URL).
for (const [L, obj] of Object.entries(NOTAS)) {
  const fuentes = obj.fuentes;
  const local = (x) => {
    const M = x[0], i = x.slice(1);
    if (M === L) return i;
    const f = NOTAS[M].fuentes.find((y) => String(y.id) === i);
    if (!f) throw new Error(`Cita ${x} sin fuente (nota ${L})`);
    let g = fuentes.find((y) => y.url && y.url === f.url && y.titulo === f.titulo);
    if (!g) { g = { ...f, id: Math.max(...fuentes.map((y) => +y.id)) + 1 }; fuentes.push(g); }
    return String(g.id);
  };
  const conv = (v, top = false) => typeof v === 'string' ? v.replace(/\[([A-E]\d+(?:\s*,\s*[A-E]\d+)*)\]/g, (_, g) => '[' + [...new Set(g.split(/\s*,\s*/).map(local))].sort((a, b) => a - b).join(', ') + ']')
    : Array.isArray(v) ? v.map(conv) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, top && k === 'fuentes' ? x : conv(x)])) : v;
  const out = conv(obj, true);
  out.fuentes = fuentes;
  fs.writeFileSync(path.join(dir, `${L}.json`), JSON.stringify(out, null, 2) + '\n', 'utf8');
}
console.log('Notas A-E escritas.');
