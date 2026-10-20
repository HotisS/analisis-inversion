// Notas A-E de solutions by stc (Arabian Internet and Communications Services Co., Tadawul 7202, corte 2026-10-20).
// Arabia Saudí no tiene XBRL en cuentas.mjs: cuentas consolidadas auditadas (Deloitte en 2025; EY hasta 2024) e intermedias
// revisadas, informe anual 2025, presentaciones y el «Data Supplement» en Excel de la web de inversores (solutions.com.sa;
// el servidor no envía el intermedio de DigiCert y un cortafuegos rechaza los agentes de usuario sin navegador: se bajó con
// curl, con ese intermedio añadido a un paquete de CA propio y sin desactivar la verificación). El Data Supplement es la serie
// oficial de la empresa (cuenta, balance y flujos 2019-2T26) y se ha cotejado con las cuentas de 2025 (notas 6, 14, 27, 29,
// 31, 33, 36, 39, 40) y con Yahoo (ventas, EBIT, BPA y flujo operativo idénticos).
// AMPLIACIÓN GRATUITA 1×1 (junta del 6-oct-2026): 120 → 240 M de acciones. Todo lo «por acción» va en la base de 240 M
// (BPA y DPA publicados ÷ 2); los precios de Yahoo ya vienen ajustados.
// Ejecutar: node informes/solutions-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const Y = JSON.parse(fs.readFileSync(path.join(dir, 'yahoo-raw.json'), 'utf8'));
const W = 'https://solutions.com.sa/wp-content/uploads/2026/';
const ART = (id) => `https://www.argaam.com/en/article/articledetail/id/${id}`;
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Statements for the year ended 31 December 2025 (Deloitte and Touche & Co., primer año): ingresos por línea, por tipo de cliente y por geografía (nota 6), otros gastos (9), zakat (11), clientes y antigüedad (14), participadas (19), fondo de comercio (20), deuda (27), arrendamientos (29), capital y autocartera (31, 33), BPA (36), vinculadas (39), segmentos por entidad (40), avales (42)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-02-15', url: `${W}08/solutions-YE-2025-FS-ENG-Final-Signed-Version.pdf` },
  { id: 2, titulo: 'Financial Data Supplement 2T26 (Excel): cuenta, balance y flujos anuales 2019-2025 y trimestrales 1T24-2T26; ingresos por línea de negocio y por canal (venta a stc), composición de costes', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Data-Supplement-11.xlsx` },
  { id: 3, titulo: 'Interim condensed consolidated financial statements, six months ended 30 June 2026 (revisión limitada de Deloitte): balance a 30-jun-2026, deuda (nota 12), vinculadas (13), cambio de las regalías de la marca stc', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Q2-2026-FS-Eng-Signed71.pdf` },
  { id: 4, titulo: 'Interim condensed consolidated financial statements, three months ended 31 March 2026 (reversión de 63 M de regalías a stc devengadas desde 2022)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-04-27', url: `${W}08/Solutions-Q1-2026-FS-Eng-Final-Signed-Version.pdf` },
  { id: 5, titulo: 'Consolidated Financial Statements 2024 (Ernst & Young): reversión de zakat de 104 M y plusvalía por la venta del canal AVL de 68,3 M', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2025-02', url: `${W}08/Solutions-YE-2024-ENG-Consolidated-Signed-FS.pdf` },
  { id: 6, titulo: 'Consolidated Financial Statements 2023 (Ernst & Young): compra de Contact Center Company por 513,7 M (abril de 2023) y asignación del precio de Giza', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2024-02', url: `${W}08/Signed-Solutions-YE-2023-EN-Consolidated-FS.pdf` },
  { id: 7, titulo: 'Consolidated Financial Statements 2022 (Ernst & Young): compra de Giza Systems (octubre de 2022), arrendamientos de 2021 y 2022', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2023-02', url: `${W}08/Solutions-YE-2022-FS-signed-English-report.pdf` },
  { id: 8, titulo: 'Earnings Release 1H 2026 (29-jul-2026): ingresos por línea, entidad y tipo de cliente; flujo libre del semestre; consenso del 2T26 frente al real', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Earnings-Release-8.pdf` },
  { id: 9, titulo: 'Earnings Release 1Q 2026 (27-abr-2026): consenso del 1T26 frente al real; ahorro estructural por las nuevas regalías', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-04-27', url: `${W}08/Earnings-Release-7.pdf` },
  { id: 10, titulo: 'Earnings Release 9M 2025 (28-oct-2025): consenso del 3T25 frente al real', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2025-10-28', url: `${W}08/Earnings-Release-5.pdf` },
  { id: 11, titulo: '1H 2026 Results Presentation: cartera de pedidos de 14.500 M SAR, guía de 2026 (ventas +6-8 %, margen EBITDA 14-16 %, capex 2-3 %)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Earnings-Presentation-7.pdf` },
  { id: 12, titulo: 'Annual Report 2025: plantilla (3.126 en el grupo, 1.358 en la matriz, −7,2 %), cuota de mercado, revisión del director financiero', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-03', url: `${W}08/solutions-by-stc-AR25_English_Full_compressed-2.pdf` },
  { id: 13, titulo: 'Acta de la junta extraordinaria del 6-oct-2026: ampliación gratuita de 1 acción nueva por cada una (120 → 240 M) con cargo a 1.200 M de reservas', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-10-06', url: `${W}10/Minutes-of-Meetings-06-10-2026.pdf` },
];

// Cuenta por función (NIIF adoptadas en Arabia Saudí). Cifras del Data Supplement [A2], idénticas a las cuentas [A1, A5-A7].
// EBITDA = EBIT + amortizaciones (también las de derechos de uso). gastos_generales = administración + comerciales (incluye
// las pérdidas esperadas de crédito). resultado_financiero = todo lo que hay entre el EBIT y el resultado antes de zakat:
// «otros ingresos/gastos» (diferencias de cambio en Egipto, prejubilaciones, plusvalía AVL de 2024, valor razonable),
// financiero neto y participadas. impuestos = zakat + impuesto de sociedades de las filiales extranjeras.
// BPA y DPA en la base de 240 M de acciones (publicados ÷ 2, por la gratuita 1×1 de oct-2026 [A13]).
const cuenta = [
  { periodo: '2021', ingresos: 7208.3, coste_ventas: 5500.4, gastos_generales: 808.9, ebitda: 1107.0, amortizaciones: 207.9, ebit: 899.1, resultado_financiero: 4.9, bai: 904.0, impuestos: 71.1, minoritarios: 0, beneficio_neto: 832.9, gastos_financieros: 1.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.47, dpa: 2.0, dpa_extraordinario: 0, acciones_diluidas: 240.0 },
  { periodo: '2022', ingresos: 8805.1, coste_ventas: 6793.8, gastos_generales: 851.0, ebitda: 1392.3, amortizaciones: 232.1, ebit: 1160.2, resultado_financiero: 11.3, bai: 1171.5, impuestos: 117.8, minoritarios: 0.8, beneficio_neto: 1052.9, gastos_financieros: 16.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.39, dpa: 2.5, dpa_extraordinario: 0, acciones_diluidas: 240.0 },
  { periodo: '2023', ingresos: 11040.5, coste_ventas: 8442.9, gastos_generales: 1210.7, ebitda: 1669.2, amortizaciones: 282.3, ebit: 1386.9, resultado_financiero: 17.8, bai: 1404.7, impuestos: 209.6, minoritarios: 3.0, beneficio_neto: 1192.1, gastos_financieros: 76.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.97, dpa: 3.0, dpa_extraordinario: 0, acciones_diluidas: 240.0 },
  { periodo: '2024', ingresos: 12063.9, coste_ventas: 9280.9, gastos_generales: 1122.4, ebitda: 1947.6, amortizaciones: 287.0, ebit: 1660.6, resultado_financiero: -18.8, bai: 1641.8, impuestos: 39.0, minoritarios: 6.2, beneficio_neto: 1596.6, gastos_financieros: 73.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.66, dpa: 5.0, dpa_extraordinario: 1.0, acciones_diluidas: 240.0 },
  { periodo: '2025', ingresos: 12730.2, coste_ventas: 10052.3, gastos_generales: 1036.5, ebitda: 1987.4, amortizaciones: 346.0, ebit: 1641.4, resultado_financiero: 3.4, bai: 1644.8, impuestos: 132.3, minoritarios: 9.9, beneficio_neto: 1502.5, gastos_financieros: 89.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 6.26, dpa: 4.0, dpa_extraordinario: 0, acciones_diluidas: 240.0 },
];
// LTM a jun-26 = 2025 + 1S26 − 1S25 [A2]. El 1T26 lleva una reversión de 63 M de regalías a stc devengadas desde 2022 [A4]
// dentro del EBITDA (ingreso no recurrente: −63). FCF = flujo operativo − capex (definición de la empresa): −364,1 + 315,0 + 881,9.
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 13247.5, ebitda: 2107.0, ebit: 1729.8, beneficio_neto: 1519.3, bpa: 6.33, dpa: 4.0, dpa_extraordinario: 0, fcf: 832.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -63.0 };

// Balance al cierre [A2; FS para fondo de comercio y arrendamientos]. caja = efectivo + murabahas a corto. proveedores =
// acreedores y periodificaciones SIN la parte corriente de los arrendamientos (que va en arrendamientos). pasivos_contrato =
// pasivos de contrato + ingresos diferidos (facturación anticipada). deuda_financiera = murabahas y préstamos (corto + largo).
// arrendamientos = pasivo total por arrendamientos (nota 29). intangibles sin el fondo de comercio. reservas = ganancias acumuladas.
const balanceH = [
  { periodo: '2021', activo_total: 7172.7, activo_corriente: 6446.3, pasivo_corriente: 4634.3, pasivo_total: 4902.2, fondo_comercio: 0, intangibles: 98.2, inmovilizado_material: 550.6, existencias: 274.0, clientes: 3020.6, proveedores: 1902.0, activos_contrato: 1256.2, pasivos_contrato: 2630.6, caja: 1607.6, deuda_financiera: 0, arrendamientos: 60.6, patrimonio_neto: 2270.6, minoritarios: 0, reservas: 959.9 },
  { periodo: '2022', activo_total: 10325.1, activo_corriente: 9374.5, pasivo_corriente: 6706.8, pasivo_total: 7485.5, fondo_comercio: 219.7, intangibles: 195.7, inmovilizado_material: 473.1, existencias: 322.4, clientes: 4344.7, proveedores: 2595.3, activos_contrato: 1276.6, pasivos_contrato: 3753.5, caja: 3244.8, deuda_financiera: 696.4, arrendamientos: 43.6, patrimonio_neto: 2809.9, minoritarios: 29.7, reservas: 1432.2 },
  { periodo: '2023', activo_total: 11516.2, activo_corriente: 10296.3, pasivo_corriente: 7195.4, pasivo_total: 8163.7, fondo_comercio: 311.3, intangibles: 314.2, inmovilizado_material: 390.3, existencias: 248.6, clientes: 4363.7, proveedores: 3272.6, activos_contrato: 1691.5, pasivos_contrato: 3429.1, caja: 3438.2, deuda_financiera: 710.4, arrendamientos: 61.2, patrimonio_neto: 3324.0, minoritarios: 28.6, reservas: 2338.3 },
  { periodo: '2024', activo_total: 12042.7, activo_corriente: 10358.7, pasivo_corriente: 6682.0, pasivo_total: 8009.6, fondo_comercio: 289.7, intangibles: 270.1, inmovilizado_material: 425.3, existencias: 212.1, clientes: 3758.6, proveedores: 3846.7, activos_contrato: 2249.4, pasivos_contrato: 2556.9, caja: 3702.1, deuda_financiera: 735.3, arrendamientos: 96.2, patrimonio_neto: 4007.6, minoritarios: 25.5, reservas: 3219.9 },
  { periodo: '2025', activo_total: 12916.9, activo_corriente: 10744.7, pasivo_corriente: 7020.4, pasivo_total: 8589.8, fondo_comercio: 293.3, intangibles: 315.2, inmovilizado_material: 363.2, existencias: 406.2, clientes: 4659.8, proveedores: 4331.1, activos_contrato: 2970.2, pasivos_contrato: 2198.9, caja: 2119.0, deuda_financiera: 782.3, arrendamientos: 416.3, patrimonio_neto: 4287.3, minoritarios: 39.8, reservas: 3532.0 },
];

// Flujos [A2]. capex = inmovilizado e intangibles. adquisiciones: Giza (2022), CCC (2023), 40 % de Devoteam Middle East (2024,
// 297,9 M) y LABS (14,7 M). recompras 2021 = 1,2 M de acciones compradas a stc a 151 SAR para el plan de empleados (nota 33).
// intereses_en_financiacion = «finance cost paid» (la empresa lo clasifica en financiación).
const flujosH = [
  { periodo: '2021', flujo_operativo: 1395.3, capex: 154.9, pagos_arrendamientos: 28.8, adquisiciones: 0, desinversiones: 0.2, dividendos: 400.0, recompras: 181.2, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 2122.1, capex: 133.9, pagos_arrendamientos: 21.8, adquisiciones: 371.8, desinversiones: 0, dividendos: 475.2, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 15.6 },
  { periodo: '2023', flujo_operativo: 1715.3, capex: 112.0, pagos_arrendamientos: 38.1, adquisiciones: 415.1, desinversiones: 0, dividendos: 594.9, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 70.0 },
  { periodo: '2024', flujo_operativo: 1509.3, capex: 255.2, pagos_arrendamientos: 52.7, adquisiciones: 312.6, desinversiones: 0, dividendos: 714.0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 66.1 },
  { periodo: '2025', flujo_operativo: -100.7, capex: 191.1, pagos_arrendamientos: 72.3, adquisiciones: 0.4, desinversiones: 0.4, dividendos: 1190.4, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 67.0 },
];

// Trimestres [A2]; BPA en la base de 240 M. vs_consenso con las tablas de consenso de las notas de resultados [A8-A10] y,
// para el 4T25, la caída del 8 % del 16-feb-2026 con ventas por debajo de lo esperado (D).
const tri = [
  { periodo: '3T24', ingresos: 2753.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 552.9, margen_ebitda_pct: 20.1, bpa: 1.93, vs_consenso: null },
  { periodo: '4T24', ingresos: 3730.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 485.7, margen_ebitda_pct: 13.0, bpa: 1.36, vs_consenso: null },
  { periodo: '1T25', ingresos: 2823.9, crecimiento_pct: 0.5, crecimiento_organico_pct: null, ebitda: 447.7, margen_ebitda_pct: 15.9, bpa: 1.50, vs_consenso: null },
  { periodo: '2T25', ingresos: 2901.5, crecimiento_pct: 4.7, crecimiento_organico_pct: null, ebitda: 521.5, margen_ebitda_pct: 18.0, bpa: 1.86, vs_consenso: null },
  { periodo: '3T25', ingresos: 3097.6, crecimiento_pct: 12.5, crecimiento_organico_pct: null, ebitda: 538.4, margen_ebitda_pct: 17.4, bpa: 1.74, vs_consenso: 'Inferior' },
  { periodo: '4T25', ingresos: 3907.2, crecimiento_pct: 4.7, crecimiento_organico_pct: null, ebitda: 479.8, margen_ebitda_pct: 12.3, bpa: 1.16, vs_consenso: 'Inferior' },
  { periodo: '1T26', ingresos: 3002.5, crecimiento_pct: 6.3, crecimiento_organico_pct: null, ebitda: 491.6, margen_ebitda_pct: 16.4, bpa: 1.54, vs_consenso: 'Superior' },
  { periodo: '2T26', ingresos: 3240.2, crecimiento_pct: 11.7, crecimiento_organico_pct: null, ebitda: 597.2, margen_ebitda_pct: 18.4, bpa: 1.89, vs_consenso: 'Superior' },
];

// Líneas de negocio (la empresa segmenta por entidad desde 2024 —solutions, Giza/pulse, CCC/upsource— y publica ingresos por
// línea de 2019 en adelante; sin resultado por línea) [A1, A2].
const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) });

guarda('A', {
  _estado: 'completo',
  financieros: { cuenta, ltm, cambios_perimetro: [
    { periodo: '2022', descripcion: 'Giza Systems (Egipto y Arabia Saudí) consolidada desde octubre de 2022 (491,9 M de precio): 2022 lleva un trimestre y 2023 el año entero.' },
    { periodo: '2023', descripcion: 'Contact Center Company (hoy upsource) consolidada desde el 3-abr-2023 (513,7 M): nueve meses en 2023.' },
  ], confianza: 'Alta' },
  trimestres: { items: tri, confianza: 'Alta' },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 262.8 }, { anio: '2027', importe: 499.8 }, { anio: '2028+', importe: 110.6 }],
    liquidez: 'Caja 1.496,5 M + murabahas 70 M a 30-jun-2026 (801,6 M de la caja en stc Bank, vinculada); líneas islámicas de 2.000 M con bancos locales, de las que 1.500 M son para avales y circulante, y 500 M de Contact Centre Company sin disponer [A1, A3]',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte and Touche & Co. (2025, primer año; antes Ernst & Young)', anios_auditor: 1, opinion: 'Favorable', confianza: 'Alta' },
  negocio: {
    segmentos: [
      seg('Core ICT Services', 'Infraestructura TIC, centros de datos, nube, redes y ciberseguridad: proyectos de integración con mucho hardware y software de terceros.', [3670.2, 4771.6, 5994.2, 6187.7, 6388.7]),
      seg('IT Managed & Operational Services', 'Servicios gestionados, externalización de TI y centros de contacto (upsource).', [1951.8, 2329.7, 3262.4, 3947.6, 4358.6]),
      seg('Digital Services', 'Desarrollo de aplicaciones, plataformas digitales y consultoría.', [1586.3, 1703.8, 1784.0, 1928.6, 1982.9]),
    ],
    geografias: [{ nombre: 'Arabia Saudí', peso_pct: 93.6 }, { nombre: 'Fuera de Arabia Saudí (sobre todo Egipto y norte de África, Giza)', peso_pct: 6.4 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Cartera de pedidos consolidada', valor_anterior: null, valor_actual: '14.500 M SAR (2T26)', variacion: null, comentario: '≈ 1,1 veces las ventas de los últimos doce meses [A11].' },
      { kpi: 'Peso de stc en las ventas', valor_anterior: '34 % (1S25)', valor_actual: '32 % (1S26)', variacion: '−2 pp', comentario: 'stc como cliente final; además ≈ 3.000 M al año se facturan a través de stc sin que sea el cliente final [A1, A8].' },
      { kpi: 'Peso del sector público', valor_anterior: '42 % (1S25)', valor_actual: '41 % (1S26)', variacion: '−1 pp', comentario: 'Crecimiento del 6 % en el 1S26, más lento en el 2T26 [A8].' },
      { kpi: 'Peso del sector privado', valor_anterior: '24 % (1S25)', valor_actual: '26 % (1S26)', variacion: '+2 pp', comentario: 'El que más crece: +21 % en el 1S26 [A8].' },
      { kpi: 'Días de cobro', valor_anterior: '100,8 (2T25)', valor_actual: '109,6 (2T26)', variacion: '+8,8 días', comentario: '120,7 días al cierre de 2025 [A2].' },
      { kpi: 'Plantilla de la matriz', valor_anterior: '≈ 1.463 (2024)', valor_actual: '1.358 (2025)', variacion: '−7,2 %', comentario: 'Grupo: 3.126 personas; el grueso del coste directo es de proveedores y subcontratas [A12].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    adquisiciones: [
      { anio: '2022', objetivo: 'Giza Systems (Egipto; integración de sistemas) y Giza Arabia', importe: 491.9, ev_ebitda: null, financiacion: 'Caja y préstamo de 500 M', resultado: 'Rebautizada «pulse by solutions» en 2026; ventas de 2.639 M y beneficio de 112 M en 2025; sin deterioros; la devaluación de la libra egipcia restó fondo de comercio y genera pérdidas de cambio [A1, A8].' },
      { anio: '2023', objetivo: 'Contact Center Company (hoy upsource; centros de contacto y BPO)', importe: 513.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Ventas de 2.757 M en 2025 (con 1.455 M de eliminaciones de grupo); estancada en el 1S26 (+0 %) [A1, A8].' },
      { anio: '2024', objetivo: '40 % de Devoteam Middle East (consultoría TI, Emiratos)', importe: 297.9, ev_ebitda: null, financiacion: 'Caja', resultado: 'Participada: 11,7 M de resultado en 2025 y 346,1 M de valor en libros; pago contingente revaluado (3,3 M de gasto) [A1].' },
      { anio: '2024', objetivo: 'LABS (por Giza Arabia)', importe: 14.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 12,4 M [A1].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Saudi Arabia IT Services Market: 12.090 M USD en 2025, 22.066 M USD en 2034 (TCAC 6,91 %)', editor: 'IMARC Group', tipo: 'Sectorial', fecha: '2026', url: 'https://www.imarcgroup.com/saudi-arabia-it-services-market' },
  { id: 2, titulo: 'Annual Report 2025, Market overview y CFO review: crecimiento del mercado de TI saudí según IDC (9,1 % en 2025, 9,2 % en 2026, 9,6 % en 2027, 10,1 % en 2028); PIB del Ministerio de Hacienda', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-03', url: `${W}08/solutions-by-stc-AR25_English_Full_compressed-2.pdf` },
  { id: 3, titulo: '9M 2025 Results Presentation: «líder indiscutible con una cuota del 22,7 %» (IDC), tasa de éxito en concursos > 75 %, ROIC del 35,3 %', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2025-10-28', url: `${W}08/Earnings-Presentation-6.pdf` },
  { id: 4, titulo: 'H1 2026 Investor Presentation: n.º 1 en servicios de TI de Arabia Saudí según IDC; gasto público del 29,2 % del PIB en 2024 al 25,7 % en 2027e; petróleo Brent; ROIC medio de cinco años > 30 %', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Investor-Presentation-13.pdf` },
  { id: 5, titulo: 'Yahoo Finance (quoteSummary, 20-oct-2026): ventas y márgenes de los últimos doce meses de Elm, Al Moammar (MIS), Perfect Presentation (2P), Infosys, Cognizant, Capgemini y Sopra Steria', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/7202.SR' },
  { id: 6, titulo: 'solutions wins SAR 364M Center3 contract to build Dammam data center (vinculada; impacto desde el 1T27)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-08-04', url: ART(1925729) },
  { id: 7, titulo: 'solutions signs revenue-sharing agreement to develop «Madares» platform (Ministerio de Educación; cinco años; puede superar el 10 % de las ventas de 2025)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-09-01', url: ART(1933140) },
  { id: 8, titulo: 'Earnings Release 1H 2026 (descenso del 23 % de Digital Services en el 2T26; contratos con Aramco de 1.400 M en computación de alto rendimiento y con la National Water Company de 519 M)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Earnings-Release-8.pdf` },
  { id: 9, titulo: 'Prospecto de la salida a bolsa (sep-2021): historia de la compañía desde 2002, capital y accionistas', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2021-09', url: `${W}09/Project-Premier-Prospectus-Eng-V.13.pdf` },
  { id: 10, titulo: 'Consolidated Financial Statements 2025, nota 1 (filiales) y nota 23 (concesiones de servicio)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-02-15', url: `${W}08/solutions-YE-2025-FS-ENG-Final-Signed-Version.pdf` },
];
const usd = 3.75;
const sector = {
  tamano: '≈ 45.300 M SAR (12.090 M USD) en servicios de TI de Arabia Saudí en 2025 según IMARC [1]; IDC prevé un crecimiento del gasto en TI del 9,1-10,1 % anual en 2025-2028 [2]',
  unidad_serie: 'millones de SAR (servicios de TI, IMARC; 1 USD = 3,75 SAR)',
  serie: [2025, 2026, 2027, 2028, 2029, 2030].map((a, i) => ({ anio: i === 0 ? '2025' : `${a}e`, tamano: Math.round(12090 * usd * 1.0691 ** i) })),
  tcac_historico_pct: null, tcac_previsto_pct: 6.9,
  cr5_pct: null, estructura: 'Moderadamente concentrada',
  confianza: 'Media',
};
// Competidores: ventas y margen operativo de los últimos doce meses de Yahoo [5] (SAR; USD a 3,7508 y EUR a 4,2136).
const cs = Object.fromEntries(Y.comps.map((c) => [c.s, c]));
const fx = { SAR: 1, USD: Y.fx['USDSAR=X'], EUR: Y.fx['EURSAR=X'] };
const comp = (s, nombre, pais, ticker, comentario) => { const c = cs[s]; return { nombre, pais, ticker, ingresos: Math.round(c.rev / 1e6 * fx[c.fcur]), cuota_pct: null, margen_ebit_pct: r1(c.opM * 100), comentario }; };
guarda('B', {
  _estado: 'completo',
  sector,
  competencia: {
    cuota_pct: 22.7,
    posicion: '1.º en servicios de TI de Arabia Saudí según IDC (22,7 % de cuota) [3, 4]',
    competidores: [
      comp('7203.SR', 'Elm', 'Arabia Saudí', '7203.SR', 'Plataformas de la Administración (PIF, 67 %); compró Thiqah en 2025 y compite en proyectos y externalización.'),
      comp('7200.SR', 'Al Moammar Information Systems (MIS)', 'Arabia Saudí', '7200.SR', 'Integrador local de redes y centros de datos; ventas casi duplicadas en un año.'),
      comp('7204.SR', 'Perfect Presentation (2P)', 'Arabia Saudí', '7204.SR', 'Externalización, centros de contacto y desarrollo; rival directo de upsource.'),
      comp('CTSH', 'Cognizant', 'EE. UU.', 'CTSH', 'Servicios de TI globales con presencia en el Golfo.'),
      comp('CAP.PA', 'Capgemini', 'Francia', 'CAP.PA', 'Integrador y consultor global; compite en grandes proyectos públicos y de energía.'),
      comp('INFY', 'Infosys', 'India', 'INFY', 'Servicios de TI con oficinas en Riad; referencia de margen del modelo offshore.'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Negocio de proyectos: más clientes no abaratan ni mejoran el servicio a los demás.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Servicios gestionados y externalización plurianuales (33 % de las ventas) y una cartera de 14.500 M ≈ 1,1 años de ventas [A11 en A]; los proyectos se vuelven a licitar.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca stc (con regalías a la matriz), licencia de gobierno digital GB24121502 y homologaciones de ciberseguridad; > 75 % de éxito en concursos [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA del 15,6 % frente al 23 % de Elm y al 13 % de Capgemini; el margen bruto bajó del 23,5 % (2023) al 21,0 % (2025): sin ventaja clara [5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primer integrador del país (22,7 % de cuota) con la red y los clientes de stc: canal cautivo de ≈ 7.100 M al año [3, A1 en A].' },
      ],
    },
    confianza: 'Media',
  },
  historia: {
    hitos: [
      { anio: '2002', hito: 'Fundada como sociedad limitada en Riad (registro de enero de 2003), filial de stc para servicios de internet y datos [9].' },
      { anio: '2020', hito: 'Pasa a sociedad anónima con un capital de 1.200 M SAR [A1 en A].' },
      { anio: '2021', hito: 'Salida a bolsa del 20 % a 151 SAR por acción (sep-2021); stc mantiene el 79 % [9].' },
      { anio: '2022', hito: 'Compra Giza Systems (Egipto), primer paso fuera del país [A7 en A].' },
      { anio: '2023', hito: 'Compra Contact Center Company (hoy upsource) por 513,7 M [A6 en A].' },
      { anio: '2024', hito: '40 % de Devoteam Middle East y venta del canal AVL (plusvalía de 68,3 M) [A1, A5 en A].' },
      { anio: '2026', hito: 'Contrato de 1.400 M con Aramco en supercomputación; Giza pasa a llamarse pulse; ampliación gratuita 1×1 aprobada el 6-oct [8, A13 en A].' },
    ],
    confianza: 'Alta',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual 2025 y presentaciones: solo la cuota propia (22,7 %); 2) IMARC y Mordor (resúmenes públicos): sin cuotas de los cinco primeros; 3) suma de ventas de competidores cotizados: perímetros no comparables (Elm incluye plataformas públicas, MIS reventa)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) IMARC: solo 2025 y la previsión; 2) informe anual (IDC): solo previsiones 2025-2028; 3) CST: mercado TIC total, no servicios de TI', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual 2025 (sostenibilidad): sin calificaciones de agencias; 2) MSCI y Sustainalytics (páginas públicas): no abren sin registro; 3) prensa saudí: sin calificaciones publicadas', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025, Corporate Governance: consejo (6 no ejecutivos y 3 independientes), comités, remuneración de los cinco primeros directivos (33,5 M SAR), participaciones de directivos, auditor (Deloitte, primer año; honorarios de 1,43 M)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-03', url: `${W}08/solutions-by-stc-AR25_English_Full_compressed-2.pdf` },
  { id: 2, titulo: 'Acta de la junta general ordinaria del 19-may-2026: dividendo de 8 SAR (952,6 M), nombramiento de Tariq Al-Huzaimi (93,85 % a favor), remuneración del consejo de 3,90 M (99,92 % a favor, 0,029 % en contra), asistencia del 85,63 %', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-05-19', url: `${W}08/Minutes-of-Meeting-19-05-2026.pdf` },
  { id: 3, titulo: 'Acta de la junta extraordinaria del 6-oct-2026: ampliación gratuita 1×1 (99,99 % a favor) y nueva política de remuneración del consejo y la alta dirección (99,94 % a favor, 0,0086 % en contra), asistencia del 83,85 %', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-10-06', url: `${W}10/Minutes-of-Meetings-06-10-2026.pdf` },
  { id: 4, titulo: 'Prospecto de la salida a bolsa (2021): biografía del consejero delegado (en el cargo desde 2017; antes vicepresidente de TI de stc)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2021-09', url: `${W}09/Project-Premier-Prospectus-Eng-V.13.pdf` },
  { id: 5, titulo: 'Consolidated Financial Statements 2025, nota 39 (vinculadas: ventas a stc de 6.673 M y a sus filiales de 423,6 M; compras de 437,8 M; 28 % de las ventas a la Administración y entidades públicas) y nota 33 (autocartera de 959.148 acciones)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-02-15', url: `${W}08/solutions-YE-2025-FS-ENG-Final-Signed-Version.pdf` },
  { id: 6, titulo: 'Interim FS 1T26: modificación de la cláusula de regalías del contrato de marca con stc, con efecto retroactivo desde 2022 (reversión de 63 M)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-04-27', url: `${W}08/Solutions-Q1-2026-FS-Eng-Final-Signed-Version.pdf` },
  { id: 7, titulo: 'solutions signs SAR 190M managed messaging contract with STC Bank (vinculada: stc posee el 79 % de solutions y el 92,3 % de STC Bank)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-10-06', url: ART(1941846) },
  { id: 8, titulo: 'FY 2023, 9M 2024, FY 2024 y 9M 2025 Results Presentations: guías anuales de ventas y margen EBITDA y su cumplimiento', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2025-10-28', url: `${W}08/Earnings-Presentation-6.pdf` },
  { id: 9, titulo: 'Annual Report 2025, Shareholders’ information: stc 79 %, flotante 20,2 %, autocartera 0,8 %, límite a extranjeros del 49 %; 22 analistas (18 comprar, 3 mantener, 1 infraponderar)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-03', url: `${W}08/solutions-by-stc-AR25_English_Full_compressed-2.pdf` },
];
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Omer Abdullah Alnomany', cargo: 'Consejero delegado', desde: '2017', participacion_pct: 0.01, trayectoria: 'Vicepresidente de TI de stc de 2010 a 2018 y 23 años en el grupo stc [4]. Con él las ventas pasaron de 5.257 M (2019) a 12.730 M (2025) y la empresa salió a bolsa; poseía 17.294 acciones a fin de 2025 (9.809 un año antes) [1].' },
      { nombre: 'Abdulrahman Hamad Alrubaia', cargo: 'Director financiero', desde: null, participacion_pct: 0.0, trayectoria: 'Antes vicepresidente del área financiera de stc y consejero de stc Kuwait y stc bank; 5.344 acciones a fin de 2025 [1].' },
      { nombre: 'Riyadh Saeed Muawad', cargo: 'Presidente (no ejecutivo, propuesto por stc)', desde: null, participacion_pct: null, trayectoria: 'Preside además la comisión ejecutiva y la de inversiones [3].' },
      { nombre: 'Saleh Abdullah Alzahrani', cargo: 'Director de tecnología', desde: null, participacion_pct: 0.0, trayectoria: 'Antes vicepresidente de entrega de soluciones en la propia empresa [1].' },
      { nombre: 'Yousef Abdulrahman AlMarshad', cargo: 'Director comercial', desde: null, participacion_pct: 0.0, trayectoria: 'Antes director general de ventas a la Administración; consejero de Devoteam Middle East [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Ventas +19-22 %; margen EBITDA 13-15 %', real: 'Ventas +25 %; margen 15,1 %', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas +8-11 %; margen EBITDA 13-15 %', real: 'Ventas +9,3 %; margen 16,1 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas +8-10 %; margen EBITDA 14-16 %', real: 'Ventas +5,5 %; margen 15,6 %', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ventas +6-8 %; margen EBITDA 14-16 %; capex 2-3 % (reiterada el 29-jul)', real: '1S26: ventas +9 %; margen 17,4 % (con 63 M de regalías revertidas)', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Riyadh Saeed Muawad', cargo: 'Presidente', tipo: 'Dominical', desde: null, comisiones: 'Ejecutiva (presidente), inversiones (presidente)' },
      { nombre: 'Mohammed Abdullah AlAbbadi', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Motaz Ali Alangari', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Mathad Faisal AlAjmi', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Ali Abdullah Alharbi', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Tariq Saud Al-Huzaimi', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Abdullatif Ali Al-Seif', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría (presidente)' },
      { nombre: 'Fahad Suliman Abalkhail', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos y retribuciones (presidente)' },
      { nombre: 'Fahad Adnan Al Mansour', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.92, voto_remuneracion_contra_pct: 0.03, voto_remuneracion_contra_libre_pct: 0.38, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Saudi Telecom Company (stc)', pct: 79.0, tipo: 'Control (sociedad cotizada participada por el PIF)', variacion: 'Sin cambios desde la salida a bolsa de 2021' },
      { nombre: 'Autocartera (plan de incentivos de empleados)', pct: 0.8, tipo: 'Autocartera', variacion: '959.148 acciones antes de la gratuita (1.000.415 un año antes)' },
      { nombre: 'Flotante (instituciones locales y extranjeras, particulares)', pct: 20.2, tipo: 'Flotante', variacion: 'Instituciones 12,6 %, particulares 7,6 %; extranjeros 5,4 %' },
    ],
    insiders: [],
    alertas: [
      'Cambio de auditor en 2025: Deloitte sustituye a Ernst & Young (primer año) [1].',
      'Operaciones vinculadas recurrentes con stc: ≈ 7.100 M de ventas en 2025 (56 % de las ventas, incluidos 3.000 M en que stc no es el cliente final), contratos nuevos con Center3 (364 M) y STC Bank (190 M) en 2026, regalías de marca cuya definición se cambió con efecto retroactivo (63 M a favor de solutions) y 801,6 M de la caja depositados en stc Bank a 30-jun-2026 [5, 6, 7].',
      'Nueva política de remuneración del consejo y la alta dirección (6-oct-2026) al alza, justificada por estar «por debajo de la media del mercado» [3].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo el total de los cinco primeros directivos (33,5 M SAR, CEO y CFO incluidos); 2) actas de juntas: no se vota la del CEO; 3) prospecto y prensa: sin cifra individual (la norma saudí no la exige)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders (registro de operaciones de 12 meses)', tipo: 'Complemento', intentos: '1) Saudi Exchange (anuncios de directivos): 403; 2) Argaam (página de la empresa): sin anuncios de compraventa de directivos; 3) informe anual 2025: solo variación anual de acciones de directivos (planes de incentivos, no compras de mercado)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'fecha de nombramiento de consejeros', tipo: 'Complemento', intentos: '1) Informe anual 2025: composición sin fecha de primer nombramiento; 2) web de la empresa: biografías cargadas por JavaScript; 3) actas: solo el nombramiento de Al-Huzaimi (abril de 2026)', decision: 'Omitido salvo los conocidos' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 7202.SR (ajustados por la gratuita), KSA (iShares MSCI Saudi Arabia, USD anclado al SAR) e IGV (software): precio, rango, rentabilidades, beta, volatilidad y cierres de ejercicio (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/7202.SR' },
  { id: 2, titulo: 'MarketScreener: estimaciones 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA y dividendo en la base de 240 M de acciones, caja neta, FCF); 14 analistas, consenso «Comprar», objetivo medio 127,30 SAR (mín. 104,60, máx. 161,00); cambios de recomendación de 2026', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://uk.marketscreener.com/quote/stock/ARABIAN-INTERNET-AND-COMM-127280646/finances/' },
  { id: 3, titulo: 'Argaam, ficha de SOLUTIONS (20-oct-2026): cierre de 92,55 SAR (−1,02 %), capitalización de 22.212 M, 240 M de acciones tras la gratuita, recomendaciones recientes (BofA, United Securities, SICO y HSBC: comprar)', editor: 'Argaam', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://www.argaam.com/en/tadawul/tasi/solutions' },
  { id: 4, titulo: 'Yahoo Finance (quoteSummary, 20-oct-2026): capitalización, valor empresa, múltiplos y estimaciones de BPA y ventas de solutions y de sus comparables; tipos de cambio USD/SAR 3,7508 y EUR/SAR 4,2136', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/7202.SR/key-statistics' },
  { id: 5, titulo: 'FRED, DGS10: bono del Tesoro de EE. UU. a 10 años (5,09 % el 16-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Country Default Spreads and Risk Premiums (Arabia Saudí: Aa3, diferencial soberano 0,51 %, prima de país 0,78 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01', url: 'https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 en octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Ubhar Capital issues Q3 2026 earnings forecasts (solutions: 431,5 M SAR, +4 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-14', url: ART(1944124) },
  { id: 9, titulo: 'Q3 2026 earnings forecasts: Riyad Capital (solutions: 419 M SAR, +1 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-12', url: ART(1943230) },
  { id: 10, titulo: 'ANB Capital issues Q3 2026 earnings forecasts (solutions: 468,7 M SAR, +12,3 %)', editor: 'Argaam', tipo: 'Analistas', fecha: '2026-10-11', url: ART(1943042) },
  { id: 11, titulo: 'solutions OKs 100% capital hike via bonus issue (derecho: accionistas al cierre del 6-oct-2026, registrados dos sesiones después)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-10-07', url: ART(1942028) },
  { id: 12, titulo: 'Interim condensed consolidated financial statements 1S26: balance a 30-jun-2026 (deuda 873,1 M, arrendamientos no corrientes 198,3 M, caja 1.496,5 M, murabahas 70 M, indemnizaciones por cese 734,2 M, participadas, minoritarios 42,9 M)', editor: 'solutions by stc', tipo: 'Primaria', fecha: '2026-07-29', url: `${W}08/Q2-2026-FS-Eng-Signed71.pdf` },
  { id: 13, titulo: 'Solutions by STC misses revenue targets in 4Q25 (titular; caída del 8 % el 16-feb-2026)', editor: 'Investing.com (vía noticias.mjs)', tipo: 'Prensa', fecha: '2026-02-16', url: 'https://www.investing.com/equities/arabian-internet-and-communications-services' },
  { id: 14, titulo: 'movimiento.mjs sobre 7202.SR (Yahoo): variación a 1-12 meses, media de 200 sesiones, mayor subida y caída de un mes', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/7202.SR' },
  { id: 15, titulo: 'TASI falls 2.2% to 10,476 pts (primera sesión tras los ataques de EE. UU. e Israel contra Irán, 1-mar-2026)', editor: 'Argaam', tipo: 'Prensa', fecha: '2026-03-01', url: 'https://www.argaam.com/en/market-daily-report/3/56397' },
  { id: 16, titulo: 'Solutions’ Pulse eyes Gulf listing by 2028 (filial pulse, antigua Giza, estudia salir a bolsa en el Golfo)', editor: 'EnterpriseAM (vía noticias.mjs)', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://enterpriseam.com/' },
];
// Comparables (sin la propia): cifras de Yahoo [4] convertidas a SAR. PER de los próximos 12 meses = precio ÷ BPA NTM
// (2/12 del ejercicio en curso y 10/12 del siguiente; Infosys, con ejercicio a marzo: 5/12 y 7/12). Crecimiento = ventas
// estimadas del ejercicio siguiente sobre el actual. Fuera: Wipro, HCL y TCS (divisas mezcladas en la ficha de Yahoo) y
// Al Moammar (PER de 99x, beneficio deprimido).
const COMPS = [['7203.SR', 'Elm', 'SA', 2 / 12], ['7204.SR', 'Perfect Presentation (2P)', 'SA', 2 / 12], ['INFY', 'Infosys (ADR)', 'IN', 5 / 12], ['CTSH', 'Cognizant', 'US', 2 / 12], ['CAP.PA', 'Capgemini', 'FR', 2 / 12], ['SOP.PA', 'Sopra Steria', 'FR', 2 / 12]];
const empresas = COMPS.map(([s, nombre, pais, w0]) => {
  const c = cs[s]; const f = fx[c.cur]; const ff = fx[c.fcur];
  const e0 = c.et.find((e) => e.p === '0y'), e1 = c.et.find((e) => e.p === '+1y');
  const epsN = e0?.eps && e1?.eps ? w0 * e0.eps + (1 - w0) * e1.eps : null;
  return {
    nombre, ticker: s, pais, capitalizacion: Math.round(c.mcap / 1e6 * f), ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null,
    per_ntm: epsN ? r1(c.price / epsN) : null, crecimiento_pct: e0?.rev && e1?.rev ? r1((e1.rev / e0.rev - 1) * 100) : null,
    margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: r2((c.debt - c.cash) / c.ebitda), fcf_yield_pct: r1(c.fcf * ff / (c.mcap * f) * 100),
  };
});
const yb = bolsa.bolsa;
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Arabian Internet and Communications Services Co. (solutions by stc)', nombre_corto: 'solutions', ticker: '7202.SR', isin: 'SA15CIBJGH12', mercado: 'Saudi Exchange (Tadawul)', indice_referencia: 'TASI (MSCI Saudi Arabia como aproximación)',
    pais: 'Arabia Saudí', pais_iso: 'SA', sector: 'Tecnología de la información', industria: 'Servicios de TI', sede: 'Riad', fundacion: '2002', empleados: 3126, web: 'https://solutions.com.sa',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 240.0, capitalizacion_publicada: 22212, free_float_pct: 20.2,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SAR/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 13630, ebitda: 2129, ebit: 1759, bpa: 6.68, dpa: 4.36, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 14884, ebitda: 2330, ebit: 1953, bpa: 7.45, dpa: 4.92, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 15656, ebitda: 2475, ebit: 2084, bpa: 7.95, dpa: 5.32, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 127.30, po_min: 104.60, po_max: 161.00 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: yb.tipo_rentabilidad, rentabilidades: yb.rentabilidades, anual: yb.anual,
    beta: yb.beta, volatilidad_pct: yb.volatilidad_pct, max_drawdown_pct: yb.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: { empresas, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2022-10', objetivo: 'Giza Systems (Egipto)', comprador: 'solutions by stc', ev: 491.9, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio pagado; sin EBITDA de la adquirida publicado.' },
      { fecha: '2023-04', objetivo: 'Contact Center Company (upsource)', comprador: 'solutions by stc', ev: 513.7, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio pagado (98,6 M de caja adquirida); sin EBITDA de la adquirida publicado.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (≥ 3 con múltiplo)', tipo: 'Complemento', intentos: '1) Cuentas 2022-2025: precios de Giza, CCC y Devoteam ME sin EBITDA de la adquirida; 2) operaciones del Golfo (Thiqah-Elm, Devoteam ME): sin múltiplo publicado; 3) operaciones globales de servicios de TI: no se abrió la nota oficial con el EBITDA y las cifras de prensa no se usan sin comprobar', decision: 'Omitido; peso cero en la síntesis' },
    { seccion: 'consenso', campo: 'recomendaciones (desglose comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener: media «Comprar» y número (14); 2) Argaam: solo las cuatro últimas (todas «comprar») y la sección de pago; 3) informe anual: 18/3/1 a fin de 2025 (desfasado)', decision: 'Omitido el desglose actual' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Saudi Exchange (403); 2) Argaam: sin dato de cortos; 3) Tadawul no tiene un régimen de publicación de posiciones cortas comparable', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
guarda('E', {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección completa', tipo: 'Complemento', intentos: '1) Stocktwits (API de 7202.SR): 404; 2) Hawamer (foro saudí) e Investing (comentarios): 403; 3) TradingView (ideas de TADAWUL:7202): página cargada por JavaScript sin contenido legible; Argaam: comentarios vacíos en las noticias del 6 y 7-oct', decision: 'Omitido' },
  ],
});
console.log('Notas A-E escritas en', dir);
