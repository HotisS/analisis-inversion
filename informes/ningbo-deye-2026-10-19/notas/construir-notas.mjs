// Notas A-E de Ningbo Deye Technology Group (605117.SS, corte 2026-10-19). China sin XBRL público:
// 2023-2025 del informe de los auditores (NIIF, BDO Limited) del folleto actualizado de solicitud en HKEX (28-jul-2026,
// apéndice I, en inglés); 2021-2022 de los informes anuales CAS (CNINFO); 1S26 y trimestres de los informes de CNINFO (CAS).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/ningbo-deye-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const CN = 'http://static.cninfo.com.cn/finalpage';
const HK = 'https://www1.hkexnews.hk/app/sehk/2026/108768/documents/sehk26072800883.pdf';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, CAS: ventas por producto y región, trimestres, dividendos, auditor)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225089135.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024, CAS: ventas por producto, trimestres 2024, dividendo)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2025-04-30', url: `${CN}/2025-04-30/1223427135.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023, CAS: ventas por producto, trimestres 2023, reservas)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2024-04-25', url: `${CN}/2024-04-25/1219796690.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022, CAS: balance, cuenta y flujos consolidados de 2022 y 2021, notas)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2023-04-18', url: `${CN}/2023-04-18/1216442355.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021, CAS: ventas por producto 2021)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2022-04-21', url: `${CN}/2022-04-21/1212999292.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026, CAS: balance a 30-jun-2026, cuenta y flujos del 1S26, ventas por producto, activos restringidos)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225509880.PDF` },
  { id: 7, titulo: '2026年第一季度报告 (informe del 1T26)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225254498.PDF` },
  { id: 8, titulo: '2025年半年度报告 (informe semestral 2025, CAS: amortizaciones y resultado del 1S25)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2025-08-26', url: `${CN}/2025-08-26/1224571841.PDF` },
  { id: 9, titulo: 'Application Proof (versión actualizada, 28-jul-2026), apéndice I: informe de los auditores (BDO Limited) con los estados NIIF de 2023, 2024, 2025 y de los cuatro meses a 30-abr-2026; capítulo «Financial Information» (ventas por región)', editor: 'Ningbo Deye Technology Corporation / HKEXnews', tipo: 'Primaria', fecha: '2026-07-28', url: HK },
  { id: 10, titulo: '2026年前三季度业绩预增公告 (avance de beneficio de los nueve primeros meses de 2026)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225605030.PDF` },
  { id: 11, titulo: '2025年度利润分配及资本公积金转增股本方案 (dividendo final de 1,8 CNY y ampliación liberada 0,4 por acción)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225089131.PDF` },
  { id: 12, titulo: '2026年半年度权益分派实施公告 (dividendo a cuenta de 1,6 CNY sobre 1.273,28 M de acciones, pagado el 14-oct-2026)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-09-30', url: `${CN}/2026-09-30/1225587910.PDF` },
  { id: 13, titulo: 'Soochow Securities (东吴证券): «2026年Q3业绩预告点评»', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610151830499726_1.pdf' },
  { id: 14, titulo: 'Guosen Securities (国信证券): «2026Q3业绩延续高增，户储及工商储业务拉动业绩增长»', editor: 'Guosen Securities', tipo: 'Analistas', fecha: '2026-10-18', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610181830660953_1.pdf' },
  { id: 15, titulo: '2022年股票期权激励计划（草案）摘要 (objetivos de beneficio 2022-2024 del plan de opciones)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2022-07-06', url: `${CN}/2022-07-06/1213956293.PDF` },
];

const cuenta = [
  { periodo: '2021', ingresos: 4167.9, coste_ventas: 3211.4, gastos_generales: 184.4, ebitda: 678.9, amortizaciones: 54.3, ebit: 624.6, resultado_financiero: 32.9, bai: 657.5, impuestos: 78.9, minoritarios: 0, beneficio_neto: 578.6, gastos_financieros: 1.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.53, dpa: 0.17, dpa_extraordinario: 0, acciones_diluidas: 1092 },
  { periodo: '2022', ingresos: 5955.5, coste_ventas: 3690.4, gastos_generales: 304.6, ebitda: 1715.7, amortizaciones: 70.2, ebit: 1645.5, resultado_financiero: 108.6, bai: 1754.1, impuestos: 230.7, minoritarios: 6.1, beneficio_neto: 1517.4, gastos_financieros: 29.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.29, dpa: 0.46, dpa_extraordinario: 0, acciones_diluidas: 1177 },
  { periodo: '2023', ingresos: 7479.7, coste_ventas: 4550.7, gastos_generales: 533.4, ebitda: 2125.8, amortizaciones: 128.5, ebit: 1997.3, resultado_financiero: 99.0, bai: 2096.3, impuestos: 305.3, minoritarios: 0, beneficio_neto: 1791.0, gastos_financieros: 72.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.52, dpa: 0.77, dpa_extraordinario: 0, acciones_diluidas: 1178 },
  { periodo: '2024', ingresos: 11206.5, coste_ventas: 6877.7, gastos_generales: 669.2, ebitda: 3304.5, amortizaciones: 181.9, ebit: 3122.6, resultado_financiero: 278.0, bai: 3400.6, impuestos: 440.2, minoritarios: 0, beneficio_neto: 2960.3, gastos_financieros: 43.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.44, dpa: 1.93, dpa_extraordinario: 0, acciones_diluidas: 1213 },
  { periodo: '2025', ingresos: 12223.7, coste_ventas: 7574.9, gastos_generales: 789.8, ebitda: 3621.5, amortizaciones: 232.2, ebit: 3389.3, resultado_financiero: 246.3, bai: 3635.6, impuestos: 466.9, minoritarios: -2.1, beneficio_neto: 3170.8, gastos_financieros: 57.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.51, dpa: 2.07, dpa_extraordinario: 0, acciones_diluidas: 1263 },
];

const balanceH = [
  { periodo: '2021', activo_total: 3923.5, activo_corriente: 2997.1, pasivo_corriente: 1241.8, pasivo_total: 1283.3, fondo_comercio: 0, intangibles: 80.9, inmovilizado_material: 789.4, existencias: 455.9, clientes: 295.9, proveedores: 1050.5, activos_contrato: null, pasivos_contrato: null, caja: 2174.4, deuda_financiera: 0, arrendamientos: 13.7, patrimonio_neto: 2640.2, minoritarios: 0, reservas: 1098.5 },
  { periodo: '2022', activo_total: 8507.5, activo_corriente: 6760.1, pasivo_corriente: 3852.0, pasivo_total: 4417.6, fondo_comercio: 0, intangibles: 147.2, inmovilizado_material: 1493.9, existencias: 865.5, clientes: 650.3, proveedores: 2090.7, activos_contrato: null, pasivos_contrato: null, caja: 5106.7, deuda_financiera: 1809.2, arrendamientos: 4.4, patrimonio_neto: 4062.5, minoritarios: 27.3, reservas: 2411.1 },
  { periodo: '2023', activo_total: 10817.4, activo_corriente: 7932.0, pasivo_corriente: 5170.0, pasivo_total: 5586.0, fondo_comercio: 0, intangibles: 4.8, inmovilizado_material: 2068.6, existencias: 754.0, clientes: 571.2, proveedores: 1509.5, activos_contrato: null, pasivos_contrato: 190.9, caja: 6984.7, deuda_financiera: 3213.5, arrendamientos: 10.3, patrimonio_neto: 5231.4, minoritarios: 0, reservas: 3663.8 },
  { periodo: '2024', activo_total: 15114.4, activo_corriente: 10814.8, pasivo_corriente: 5510.3, pasivo_total: 5659.7, fondo_comercio: 0, intangibles: 3.6, inmovilizado_material: 2413.2, existencias: 1360.5, clientes: 1729.3, proveedores: 3500.3, activos_contrato: null, pasivos_contrato: 264.5, caja: 8924.5, deuda_financiera: 1010.5, arrendamientos: 9.5, patrimonio_neto: 9454.1, minoritarios: 0.6, reservas: 4946.7 },
  { periodo: '2025', activo_total: 19906.8, activo_corriente: 14749.1, pasivo_corriente: 9250.0, pasivo_total: 9577.4, fondo_comercio: 0, intangibles: 10.2, inmovilizado_material: 3124.0, existencias: 1785.4, clientes: 1747.4, proveedores: 4711.3, activos_contrato: null, pasivos_contrato: 479.9, caja: 12080.4, deuda_financiera: 3393.1, arrendamientos: 27.3, patrimonio_neto: 10310.9, minoritarios: 18.5, reservas: 5434.1 },
];

const flujosH = [
  { periodo: '2021', flujo_operativo: 796.6, capex: 601.9, pagos_arrendamientos: 2.8, adquisiciones: 0, desinversiones: 0.4, dividendos: 131.6, recompras: 0, emision_acciones: 1352.2, intereses_en_financiacion: 1.5 },
  { periodo: '2022', flujo_operativo: 2203.6, capex: 809.1, pagos_arrendamientos: 5.0, adquisiciones: 0, desinversiones: 4.7, dividendos: 202.8, recompras: 0, emision_acciones: 22.0, intereses_en_financiacion: 29.5 },
  { periodo: '2023', flujo_operativo: 2081.0, capex: 748.8, pagos_arrendamientos: 3.7, adquisiciones: 137.2, desinversiones: 0.9, dividendos: 538.2, recompras: 200.0, emision_acciones: 0, intereses_en_financiacion: 71.4 },
  { periodo: '2024', flujo_operativo: 3366.7, capex: 462.4, pagos_arrendamientos: 6.5, adquisiciones: 10.6, desinversiones: 51.4, dividendos: 1677.5, recompras: 0, emision_acciones: 2716.5, intereses_en_financiacion: 44.4 },
  { periodo: '2025', flujo_operativo: 3986.3, capex: 1287.0, pagos_arrendamientos: 14.8, adquisiciones: 88.0, desinversiones: 2.7, dividendos: 2683.4, recompras: 100.0, emision_acciones: 380.6, intereses_en_financiacion: 56.5 },
];

const segHist = (vals) => ['2021', '2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: vals[i], resultado: null }));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 17329.3, ebitda: 5293.3, ebit: 5016.1, beneficio_neto: 4366.1, bpa: 3.44, dpa: 2.07, dpa_extraordinario: 0, fcf: 5497.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: null, ajustes: null,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 3267.9, crecimiento_pct: 128.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.79, vs_consenso: null },
      { periodo: '4T24', ingresos: 3190.4, crecimiento_pct: 176.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.57, vs_consenso: null },
      { periodo: '1T25', ingresos: 2566.3, crecimiento_pct: 36.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.56, vs_consenso: null },
      { periodo: '2T25', ingresos: 2969.1, crecimiento_pct: 3.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.64, vs_consenso: null },
      { periodo: '3T25', ingresos: 3310.9, crecimiento_pct: 1.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.65, vs_consenso: null },
      { periodo: '4T25', ingresos: 3377.3, crecimiento_pct: 5.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.65, vs_consenso: null },
      { periodo: '1T26', ingresos: 4459.4, crecimiento_pct: 73.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.94, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 6181.7, crecimiento_pct: 108.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.20, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 1888.0 }, { anio: '2027', importe: 11.0 }, { anio: '2028+', importe: 87.6 }],
    liquidez: 'Caja, depósitos y productos financieros de 13.260 M CNY a 30-jun-2026 (6.038 de tesorería, 4.288 de activos financieros a valor razonable, 2.935 de depósitos a plazo y certificados) frente a 1.987 M de deuda bancaria y 34 M de arrendamientos [A6]. De la tesorería, 1.065 M están pignorados como garantía de efectos comerciales a pagar, y otros 504 M de depósitos también [A6].',
    rating: 'Sin rating',
    coste_deuda_pct: 2.5,
    vida_media_anios: 0.5,
    otros_pasivos: null, comentario: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosH, comentario: null, confianza: 'Alta' },
  calidad: {
    auditor: 'BDO China Shu Lun Pan (立信会计师事务所) en las cuentas CAS; BDO Limited (Hong Kong) en el informe NIIF del folleto',
    anios_auditor: 9,
    opinion: 'Favorable (CAS 2025 y NIIF 2023-2025 sin salvedades)',
    comentario: null, senales: null,
    confianza: 'Alta',
  },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2023', objetivo: 'Compra de minoritarios de filiales (pago de 137,2 M CNY)', importe: 137.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integración de participaciones minoritarias; sin fondo de comercio' },
      { anio: '2025', objetivo: 'Aportación a asociadas (88 M CNY; 130 M a 30-abr-2026)', importe: 88.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Participaciones pequeñas; resultado de asociadas −0,5 M en 2025' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Inversores', descripcion: 'Inversores de almacenamiento (híbridos, residenciales y comerciales), de cadena y microinversores, y accesorios', tipo_resultado: null, historico: segHist([1197.5, 3956.8, 4429.5, 5556.4, 6348.1]) },
      { nombre: 'Baterías de almacenamiento', descripcion: 'Paquetes de baterías de litio-ferrofosfato para hogares y armarios comerciales, vendidos junto con el inversor', tipo_resultado: null, historico: segHist([0, 0, 884.3, 2451.3, 3832.4]) },
      { nombre: 'Intercambiadores de calor', descripcion: 'Evaporadores y condensadores para fabricantes chinos de aire acondicionado', tipo_resultado: null, historico: segHist([2327.6, 1237.0, 1344.5, 1954.9, 937.7]) },
      { nombre: 'Deshumidificadores', descripcion: 'Deshumidificadores domésticos e industriales (marca propia y para terceros)', tipo_resultado: null, historico: segHist([562.3, 579.3, 703.9, 969.2, 805.3]) },
      { nombre: 'Otros', descripcion: 'Aire acondicionado solar, bombas solares, otros productos e ingresos no principales', tipo_resultado: null, historico: segHist([80.5, 182.4, 117.5, 274.7, 300.2]) },
    ],
    geografias: [
      { nombre: 'Europa', peso_pct: 32.7 },
      { nombre: 'Asia (sin China continental)', peso_pct: 28.3 },
      { nombre: 'China continental', peso_pct: 20.3 },
      { nombre: 'África', peso_pct: 9.3 },
      { nombre: 'Norteamérica', peso_pct: 4.7 },
      { nombre: 'Sudamérica', peso_pct: 2.4 },
      { nombre: 'Oceanía', peso_pct: 2.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Inversores de almacenamiento vendidos (miles)', valor_anterior: '561 (2024)', valor_actual: '772 (2025)', variacion: '+37,5 %', comentario: 'En el 1S26 se vendieron 1.153.000 inversores, de ellos 570.300 de almacenamiento residencial y 60.500 comerciales [A6, A1]' },
      { kpi: 'Paquetes de baterías vendidos (miles)', valor_anterior: '465 (2024)', valor_actual: '777 (2025)', variacion: '+67,2 %', comentario: 'Ventas de baterías del 1S26: 4.894 M CNY, +244 % [A6, A1]' },
      { kpi: 'Margen bruto inversores de almacenamiento', valor_anterior: '51,8 % (2024)', valor_actual: '51,1 % (2025)', variacion: '−0,7 pp', comentario: 'El producto de mayor margen; el de baterías bajó 9,5 pp hasta el 31,8 % [A1]' },
      { kpi: 'Peso de las ventas fuera de China', valor_anterior: '70,9 % (2024)', valor_actual: '79,7 % (2025)', variacion: '+8,8 pp', comentario: '87,6 % en los cuatro primeros meses de 2026 [A9]' },
      { kpi: 'Margen bruto del grupo', valor_anterior: '38,6 % (2024)', valor_actual: '38,0 % (2025)', variacion: '−0,6 pp', comentario: '37,6 % en el 1S26 (CAS) [A9, A6]' },
      { kpi: 'Intercambiadores de calor (ventas, M CNY)', valor_anterior: '1.955 (2024)', valor_actual: '938 (2025)', variacion: '−52 %', comentario: 'Reducción deliberada de un negocio de margen bajo (7,7 %) [A1, A9]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS (solo cuenta abreviada sin amortizaciones trimestrales); 2) informe semestral (amortización solo semestral); 3) derivarlo con la amortización semestral prorrateada: descartado por mezclar diferencias de cambio', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Application Proof (28-jul-2026), capítulo «Industry Overview» (Frost & Sullivan): mercado mundial de almacenamiento residencial y comercial, inversores, cuotas 2025', editor: 'Ningbo Deye Technology Corporation / HKEXnews', tipo: 'Sectorial', fecha: '2026-07-28', url: HK },
  { id: 2, titulo: 'Application Proof (28-jul-2026), capítulos «Business», «History» y «Financial Information» (clientes, regiones, hitos)', editor: 'Ningbo Deye Technology Corporation / HKEXnews', tipo: 'Primaria', fecha: '2026-07-28', url: HK },
  { id: 3, titulo: '2025年年度报告 (informe anual 2025: mercados por país y posición competitiva)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225089135.PDF` },
  { id: 4, titulo: '2026年半年度报告 (informe semestral 2026: ventas por producto, I+D, cadena de suministro)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225509880.PDF` },
  { id: 5, titulo: 'Soochow Securities (东吴证券): «质造光储拓全场景，全球布局引领高增» (estudio de 47 páginas: instalaciones de almacenamiento residencial y comercial por región 2023-2030e)', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-09-10', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609101829216898_1.pdf' },
  { id: 6, titulo: 'EU moves to ban high-risk inverters from China over cybersecurity threats', editor: 'Euronews', tipo: 'Prensa', fecha: '2026-05-04', url: 'https://www.euronews.com/my-europe/2026/05/04/eu-moves-to-ban-high-risk-inverters-from-china-over-cybersecurity-threats' },
  { id: 7, titulo: 'EU’s Chinese inverter ban could affect 14% of future solar demand, Wood Mackenzie says', editor: 'PV Tech', tipo: 'Prensa', fecha: '2026-05', url: 'https://www.pv-tech.org/eus-chinese-inverter-ban-could-affect-14-of-future-solar-demand-wood-mackenzie-says/' },
  { id: 8, titulo: 'Yahoo Finance: cuentas anuales 2025 y últimos doce meses de Sungrow, GoodWe, Ginlong, Kstar, Pylontech, CATL, Enphase, SMA y SolarEdge', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 9, titulo: 'Photovoltaics: Deactivated Deye and Sol-Ark inverters in the USA', editor: 'heise online', tipo: 'Prensa', fecha: '2024-11-28', url: 'https://heise.de/-10183716' },
  { id: 10, titulo: '关于全资子公司签署二期投资协议暨对外投资进展公告 (segunda fase de 9 GWh de la fábrica de 16 GWh de almacenamiento comercial, ≥ 1.232 M CNY)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-06-24', url: `${CN}/2026-06-24/1225383163.PDF` },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: null,
    hitos: [
      { anio: '2000', hito: 'Zhang Hejun funda en Ningbo la predecesora (Deye Limited), que fabrica piezas inyectadas y de chapa [B2].' },
      { anio: '2003', hito: 'Nace Zhejiang Deye Environmental Appliances (deshumidificadores) [B2].' },
      { anio: '2016', hito: 'La filial Deye Frequency Conversion entra en los inversores fotovoltaicos y abre la planta de Beilun [B2].' },
      { anio: '2018', hito: 'Primer inversor de almacenamiento (híbrido) [B2].' },
      { anio: '2019', hito: 'Exporta inversores de almacenamiento a EE. UU. en volumen [B2].' },
      { anio: '2021', hito: 'Salida a la bolsa de Shanghái (abril) [B2].' },
      { anio: '2022', hito: 'Primer paquete de baterías propio; la acción multiplica por 1,7 en el año [B2].' },
      { anio: '2023', hito: 'Fábrica de baterías de Cixi; caída de la demanda en Sudáfrica y desplome de las ventas del 2S23 [B2].' },
      { anio: '2024', hito: 'Supera 10.000 M CNY de ventas y se convierte en el primer fabricante mundial de inversores de almacenamiento residencial por ingresos [B2].' },
      { anio: '2025', hito: 'Empieza la planta de Malasia y aprueba la fábrica de 16 GWh de almacenamiento comercial en Cixi [B2, B10].' },
      { anio: '2026', hito: 'Pide cotizar acciones H en Hong Kong (27-ene, actualizada el 28-jul) [B2].' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: null,
    tamano: '≈ 99.500 M CNY en 2025: 67.600 M de almacenamiento residencial y 31.900 M de comercial e industrial, según Frost & Sullivan [B1].',
    unidad_serie: 'miles de millones de CNY (residencial + comercial e industrial, Frost & Sullivan)',
    serie: [
      { anio: '2021', tamano: 13.0 }, { anio: '2022', tamano: 32.5 }, { anio: '2023', tamano: 50.5 }, { anio: '2024', tamano: 70.7 },
      { anio: '2025', tamano: 99.5 }, { anio: '2026e', tamano: 128.8 }, { anio: '2027e', tamano: 164.8 }, { anio: '2028e', tamano: 213.3 }, { anio: '2031e', tamano: 491.3 },
    ],
    tcac_historico_pct: 66.3, tcac_previsto_pct: 30.0, cr5_pct: 64.5, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Apagones y redes débiles en mercados emergentes', efecto: '+', horizonte: 'Estructural', evidencia: 'África pasó de 606 a 1.139 M CNY de ventas de Deye en 2025 y Asia sin China, de 2.340 a 3.460 M; Pakistán, Líbano, Irak, Yemen, India y Vietnam crecen por falta de suministro [B2, B3].' },
      { driver: 'Precio de la electricidad y subvenciones en Europa y Australia', efecto: '+', horizonte: 'Cíclico', evidencia: 'El programa australiano «Cheaper Home Batteries» llevó Oceanía de 31 a 204 M CNY en cuatro meses; las ayudas de Polonia, Rumanía, Bulgaria y España y la guerra en Ucrania impulsan Europa [B2, B3].' },
      { driver: 'Almacenamiento comercial e industrial', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de 31.900 M CNY en 2025 que crecería un 36,1 % anual hasta 200.700 M en 2031 [B1].' },
      { driver: 'Ciclo de existencias de los distribuidores', efecto: '−', horizonte: 'Cíclico', evidencia: 'En 2023 los distribuidores europeos y sudafricanos dejaron de comprar: las ventas trimestrales de Deye cayeron de 2.809 M (2T23) a 1.154 M (4T23) [B2].' },
      { driver: 'Restricciones a inversores chinos por ciberseguridad', efecto: '−', horizonte: 'Estructural', evidencia: 'Desde el 1-may-2026 la UE no financia proyectos con inversores de países de alto riesgo; Wood Mackenzie calcula que afecta al 14 % de la demanda futura [B6, B7].' },
      { driver: 'Precio de las celdas de litio', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las celdas son la primera materia prima de Deye; el margen bruto de las baterías bajó 9,5 pp en 2025 hasta el 31,8 % [B2, B3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Más de diez fabricantes chinos con capacidad sobrante; los cinco primeros del inversor residencial de cadena solo suman el 30,3 %; Deye bajó precios para ganar cuota [B1, B2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Vende sobre todo a distribuidores; el primer cliente supone el 10 % de las ventas de enero-abril de 2026 y los cinco primeros el 23,8 %; cobro a 40-90 días o por adelantado [B2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Celdas de litio (CATL, EVE y otros) y chips; en el 1S26 la escasez de PCB y chips obligó a sustituir proveedores y adelantar compras [B4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La técnica es accesible, pero la certificación por país, la red de servicio en más de 20 países y la base instalada frenan a los recién llegados [B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Para hogares sin red fiable no hay alternativa barata; en Europa compiten las baterías de coche bidireccionales a largo plazo [B1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: null },
    regulacion: null,
    tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.2,
    posicion: '1.º mundial en inversores de almacenamiento residencial (20,6 % por ingresos en 2025), 2.º en inversores comerciales (20,4 %) y 6.º en sistemas residenciales completos (5,9 %) [B1]',
    competidores: [
      { nombre: 'Sungrow Power Supply', pais: 'China', ticker: '300274.SZ', ingresos: 89184, cuota_pct: null, margen_ebit_pct: 18.6, comentario: 'Líder mundial de inversores y de almacenamiento a gran escala; 1.º en inversores de cadena residenciales [B1, B8].' },
      { nombre: 'Huawei Digital Power', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival fuerte en Europa y en sistemas residenciales; no publica cuentas separadas.' },
      { nombre: 'GoodWe', pais: 'China', ticker: '688390.SS', ingresos: 8889, cuota_pct: null, margen_ebit_pct: 1.6, comentario: 'Inversores híbridos en Europa; margen hundido por la guerra de precios [B8].' },
      { nombre: 'Ginlong (Solis)', pais: 'China', ticker: '300763.SZ', ingresos: 6952, cuota_pct: null, margen_ebit_pct: 14.8, comentario: 'Inversores de cadena; muy endeudado por su cartera de plantas [B8].' },
      { nombre: 'Kstar', pais: 'China', ticker: '002518.SZ', ingresos: 5270, cuota_pct: null, margen_ebit_pct: 13.8, comentario: 'SAI, inversores y almacenamiento residencial [B8].' },
      { nombre: 'Pylontech', pais: 'China', ticker: '688063.SS', ingresos: 3164, cuota_pct: null, margen_ebit_pct: 1.4, comentario: 'Baterías residenciales; rival directo del paquete de baterías de Deye [B8].' },
      { nombre: 'Enphase Energy', pais: 'EE. UU.', ticker: 'ENPH', ingresos: 9849, cuota_pct: null, margen_ebit_pct: 14.2, comentario: 'Microinversores y baterías en EE. UU. y Europa; ventas convertidas a 6,686 CNY/USD [B8].' },
      { nombre: 'SMA Solar', pais: 'Alemania', ticker: 'S92.DE', ingresos: 11406, cuota_pct: null, margen_ebit_pct: -12.3, comentario: 'Pierde dinero en 2025; referencia europea de inversores (ventas a 7,524 CNY/EUR) [B8].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La aplicación de monitorización (德业云) y la red de instaladores dan algo de fidelidad, pero no un efecto de red [B3].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Quien compró el inversor compra la batería compatible (protocolo, gestión de energía): las baterías pasaron de 884 a 4.894 M CNY semestrales en dos años y medio [B4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca reconocida entre instaladores de mercados emergentes (1.º en Sudáfrica) y certificaciones por país; sin patentes que bloqueen [B1, B3].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen bruto del 51 % en inversores de almacenamiento y EBIT del 27,7 % en 2025, frente al 1,6 % de GoodWe y el 14,8 % de Ginlong; cadena integrada heredada de los electrodomésticos [B3, B8].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'El mercado residencial está fragmentado por país; Deye tiene el 20,6 % del inversor residencial pero solo el 5,9 % del sistema completo [B1].' },
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
  negocio: {
    descripcion: null, como_gana_dinero: null, clientes: null,
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (CNINFO): no cita calificaciones externas; 2) búsqueda de MSCI y Sustainalytics para 605117: sin ficha pública abierta; 3) prensa china (Wind ESG): sin dato verificable', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Application Proof (28-jul-2026), capítulos «Directors and Senior Management» y «Substantial Shareholders»', editor: 'Ningbo Deye Technology Corporation / HKEXnews', tipo: 'Primaria', fecha: '2026-07-28', url: HK },
  { id: 2, titulo: '2025年年度报告: consejo, comisiones, remuneración de consejeros y directivos, auditor', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225089135.PDF` },
  { id: 3, titulo: '2026年半年度报告: diez primeros accionistas a 30-jun-2026', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225509880.PDF` },
  { id: 4, titulo: '关于以集中竞价方式回购股份的回购报告书 (recompra de 100-200 M CNY a ≤ 133 CNY para planes de incentivos, propuesta por el presidente)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-09-24', url: `${CN}/2026-09-24/1225578250.PDF` },
  { id: 5, titulo: '关于以集中竞价交易方式首次回购公司股份的公告 (primera recompra: 0,57 M acciones por 40,4 M CNY)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-10-16', url: `${CN}/2026-10-16/1225605974.PDF` },
  { id: 6, titulo: '股东集中竞价减持计划时间届满暨减持结果公告 (venta del vehículo de empleados Hengli: 1,58 M acciones)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-01-16', url: `${CN}/2026-01-16/1224936389.PDF` },
  { id: 7, titulo: '2022年股票期权激励计划（草案）摘要 (objetivos de beneficio 2022-2024)', editor: 'Ningbo Deye Technology (CNINFO)', tipo: 'Primaria', fecha: '2022-07-06', url: `${CN}/2022-07-06/1213956293.PDF` },
  { id: 8, titulo: '关于向香港联交所递交H股发行并上市申请的进展公告 (solicitud actualizada de acciones H, 28-jul-2026)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-07-29', url: `${CN}/2026-07-29/1225445397.PDF` },
  { id: 9, titulo: '关于2026年度董事及高级管理人员薪酬方案的公告 (política de remuneración de consejeros y directivos 2026)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225089115.PDF` },
  { id: 10, titulo: '关于收到实际控制人、董事长提议回购公司股份的提示性公告', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-09-09', url: `${CN}/2026-09-09/1225552985.PDF` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Zhang Hejun', cargo: 'Presidente ejecutivo y fundador', desde: '2000', participacion_pct: 57.46, trayectoria: 'Fundó el grupo en 2000 como fabricante de piezas y lo llevó a los electrodomésticos y, desde 2016, a los inversores. Con él las ventas pasaron de 4.168 M CNY en 2021 a 12.224 M en 2025 y el beneficio de 579 a 3.171 M [C1, C2]. Participación directa del 22,26 % más el 35,20 % de Aisirui, que controla [C3].' },
      { nombre: 'Zhang Dong Ye', cargo: 'Vicepresidente y consejero delegado (general manager)', desde: '2022', participacion_pct: null, trayectoria: 'Hijo del fundador; en el grupo desde 2005 (ventas) y director general de Deye Environmental Appliances desde 2014; consejero delegado desde septiembre de 2022, etapa en la que el beneficio se ha duplicado [C1, C2].' },
      { nombre: 'Zhang Dongbin', cargo: 'Consejero ejecutivo (operaciones)', desde: '2017', participacion_pct: null, trayectoria: 'Hijo del fundador; fue controller financiero y presidente de Deye Frequency Conversion, la filial de inversores [C1].' },
      { nombre: 'Tan Zui', cargo: 'Consejero, subdirector general y director financiero', desde: '2001', participacion_pct: 0.01, trayectoria: 'En el grupo desde 2001 (contable, compras, finanzas); director financiero de la filial de inversores antes que del grupo [C1, C2].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Plan de opciones: beneficio recurrente de las filiales de inversores y electrodomésticos ≥ 700 M CNY', real: 'Beneficio recurrente del grupo de 1.536 M CNY', cumplida: 'Sí' },
      { anio: '2023', guia: 'Plan de opciones: ≥ 1.200 M CNY', real: 'Beneficio recurrente del grupo de 1.853 M CNY', cumplida: 'Sí' },
      { anio: '2024', guia: 'Plan de opciones: ≥ 1.460 M CNY', real: 'Beneficio recurrente del grupo de 2.805 M CNY', cumplida: 'Sí' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Zhang Hejun', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Estrategia y sostenibilidad (preside)' },
      { nombre: 'Zhang Dong Ye', cargo: 'Vicepresidente y consejero delegado', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Estrategia y sostenibilidad' },
      { nombre: 'Zhang Dongbin', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2017', comisiones: null },
      { nombre: 'Tan Zui', cargo: 'Consejero y director financiero', tipo: 'Ejecutivo', desde: '2017', comisiones: 'Remuneraciones; estrategia' },
      { nombre: 'Le Jingna', cargo: 'Consejera representante de los empleados', tipo: 'Otro externo', desde: '2025', comisiones: null },
      { nombre: 'Zhu Yihong', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneraciones (preside); auditoría' },
      { nombre: 'Zhu Chenggang', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (preside); nombramientos' },
      { nombre: 'Sha Liangliang', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos (preside); remuneraciones' },
      { nombre: 'Lo Chi Chiu', cargo: 'Consejero (efectivo al cotizar en Hong Kong)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 6.58, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: null,
    accionistas: [
      { nombre: 'Ningbo Meishan Aisirui Investment (controlada por Zhang Hejun)', pct: 35.20, tipo: 'Control (sociedad del fundador)', variacion: 'Sin ventas; solo la ampliación liberada de 2026' },
      { nombre: 'Zhang Hejun', pct: 22.26, tipo: 'Control (directa)', variacion: 'Sin ventas; compra marginal en 2025' },
      { nombre: 'HKSCC (inversores de Stock Connect)', pct: 7.98, tipo: 'Institucional extranjero (nominee)', variacion: '+29,5 M acciones en el 1S26' },
      { nombre: 'Hengli (vehículo de los empleados)', pct: 1.60, tipo: 'Empleados', variacion: 'Vendió 1,58 M acciones entre oct-2025 y ene-2026' },
      { nombre: 'Fondo de la Seguridad Social 103', pct: 0.86, tipo: 'Público', variacion: '+3,97 M acciones en el 1S26' },
      { nombre: 'Lu Yazhu', pct: 0.70, tipo: 'Particular', variacion: 'Sin cambios relevantes' },
    ],
    insiders: [
      { fecha: '2026-01-15', persona: 'Hengli (vehículo de empleados; socio gestor Zhang Hejun)', operacion: 'Venta', acciones: 1580428, importe: null },
      { fecha: '2026-10-15', persona: 'La sociedad (recompra propuesta por el presidente)', operacion: 'Compra', acciones: 571960, importe: 40.4 },
    ],
    control_y_defensas: null,
    alertas: null,
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Actas de las juntas de 2025 y 2026 (CNINFO): dan el resultado por punto sin desglose de votos en contra en la remuneración; 2) dictamen del abogado de la junta: solo valida; 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo desglose', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo el total antes de impuestos (6,58 M CNY); 2) política 2026: criterios sin cifras; 3) folleto de Hong Kong: remuneración agregada de consejeros sin reparto por persona', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de 605117.SS, 510300.SS (ETF del CSI 300) y 159915.SZ (ETF de ChiNext): precio, rango, rentabilidades, beta, volatilidad y cierres de ejercicio (bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/605117.SS' },
  { id: 2, titulo: 'MarketScreener: estimaciones de consenso 2026-2028 de Ningbo Deye (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/NINGBO-DEYE-TECHNOLOGY-GR-141869275/finances/' },
  { id: 3, titulo: 'MarketScreener: consenso de 10 analistas, objetivo medio 135,48 CNY (máx. 187,86, mín. 91,00)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/NINGBO-DEYE-TECHNOLOGY-GR-141869275/consensus/' },
  { id: 4, titulo: 'Eastmoney, centro de informes de analistas: 20 informes sobre 605117 de abr-oct 2026 con BPA 2026-2028e y recomendación', editor: 'Eastmoney (东方财富)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://data.eastmoney.com/report/stock.jshtml' },
  { id: 5, titulo: 'Soochow Securities: «2026年Q3业绩预告点评» (recorte de beneficio 2026-2028e a 5.887/7.857/9.854 M; objetivo 123 CNY)', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610151830499726_1.pdf' },
  { id: 6, titulo: 'Guosen Securities: «2026Q3业绩延续高增» (recorte de beneficio 2026-2028e a 5.850/7.560/8.370 M)', editor: 'Guosen Securities', tipo: 'Analistas', fecha: '2026-10-18', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610181830660953_1.pdf' },
  { id: 7, titulo: 'Curva de rendimientos de la deuda pública china (中债国债收益率曲线), 16-oct-2026: 10 años 1,648 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://yield.chinabond.com.cn/' },
  { id: 8, titulo: 'Tipos de cambio de referencia del euro, 16-oct-2026 (CNY 7,5240; USD 1,1253)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 9, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500, octubre de 2026 (4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 10, titulo: 'CNINFO: calendario de publicación (预约披露) del informe del 3T26 de 605117: 30-oct-2026', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-19', url: 'http://www.cninfo.com.cn/new/information/getPrbookInfo' },
  { id: 11, titulo: 'Yahoo Finance: capitalización, ventas, EBITDA, EBIT, beneficio, deuda, caja y flujo libre (anual 2025 y últimos doce meses) de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com' },
  { id: 12, titulo: 'Eastmoney: BPA 2026-2027e de los informes de analistas de Sungrow, GoodWe, Kstar, Pylontech, CATL y Kehua (jul-oct 2026)', editor: 'Eastmoney (东方财富)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://data.eastmoney.com/report/stock.jshtml' },
  { id: 13, titulo: '2026年半年度报告: balance a 30-jun-2026 (caja, depósitos, deuda, arrendamientos, minoritarios, asociadas)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-08-27', url: `${CN}/2026-08-27/1225509880.PDF` },
  { id: 14, titulo: '关于向香港联交所递交H股发行并上市申请的进展公告 (solicitud de acciones H actualizada el 28-jul-2026; aún sin cotizar)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-07-29', url: `${CN}/2026-07-29/1225445397.PDF` },
  { id: 15, titulo: 'movimiento.mjs y movimiento-precio.mjs sobre 605117.SS (Yahoo): variación a 1-12 meses, media de 200 sesiones, caídas diarias de más del 5 %', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/605117.SS' },
  { id: 16, titulo: '2026年前三季度业绩预增公告 (beneficio de 9M26 de 4.220-4.320 M CNY, +80-84 %)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225605030.PDF` },
  { id: 17, titulo: '2026年半年度业绩预增公告 (beneficio del 1S26 de 2.668-2.728 M CNY)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-07-09', url: `${CN}/2026-07-09/1225414720.PDF` },
  { id: 18, titulo: 'EU moves to ban high-risk inverters from China over cybersecurity threats', editor: 'Euronews', tipo: 'Prensa', fecha: '2026-05-04', url: 'https://www.euronews.com/my-europe/2026/05/04/eu-moves-to-ban-high-risk-inverters-from-china-over-cybersecurity-threats' },
  { id: 19, titulo: '关于以集中竞价交易方式首次回购公司股份的公告 (primera recompra del 15-oct-2026)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-10-16', url: `${CN}/2026-10-16/1225605974.PDF` },
  { id: 20, titulo: '2026年第一季度报告 (ventas del 1T26 +73,8 %; beneficio +68,4 %)', editor: 'Ningbo Deye Technology Group (CNINFO)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225254498.PDF` },
];

const bo = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Ningbo Deye Technology Group Co., Ltd. (宁波德业科技股份有限公司)', nombre_corto: 'Deye', ticker: '605117.SS', isin: 'CNE1000052S3',
    mercado: 'Bolsa de Shanghái (consejo principal, acciones A); compra desde el extranjero solo por Shanghai-Hong Kong Stock Connect', indice_referencia: 'CSI 300 (ETF 510300.SS)',
    pais: 'China', pais_iso: 'CN', sector: 'Industria', industria: 'Equipos eléctricos (inversores y almacenamiento)', sede: 'Ningbo (Zhejiang)', fundacion: '2000', empleados: 6044, web: 'https://www.deye.com.cn',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1272.7, capitalizacion_publicada: 90849, free_float_pct: 41.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones.toLocaleString('es-ES', { maximumFractionDigits: 0 })} M CNY/día (3 meses)`, proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: 22579, ebitda: 6507, ebit: 6452, bpa: 4.52, dpa: 2.98, fuente: 'MarketScreener [D2]' },
      { periodo: '2027e', ingresos: 27696, ebitda: 8214, ebit: 8022, bpa: 5.64, dpa: 3.80, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 32803, ebitda: 9650, ebit: 9382, bpa: 6.59, dpa: 4.40, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 9, mantener: 0, vender: 1, po_medio: 135.48, po_min: 91.0, po_max: 187.86 },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
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
    serie: [
      { anio: '2021', precio_cierre: cierre['2021'], ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: cierre['2022'], ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: cierre['2023'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: cierre['2024'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: cierre['2025'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas: [
      { nombre: 'Sungrow Power Supply', ticker: '300274.SZ', pais: 'CN', capitalizacion: 161047, ev_ventas: 1.89, ev_ebitda_ltm: 9.8, ev_ebitda_ntm: null, per_ntm: 9.6, crecimiento_pct: null, margen_ebitda_pct: 19.9, roic_pct: 26.6, dn_ebitda: -1.1, fcf_yield_pct: 9.0 },
      { nombre: 'GoodWe', ticker: '688390.SS', pais: 'CN', capitalizacion: 12008, ev_ventas: 1.06, ev_ebitda_ltm: 18.5, ev_ebitda_ntm: null, per_ntm: 11.6, crecimiento_pct: null, margen_ebitda_pct: 5.8, roic_pct: 2.8, dn_ebitda: -0.4, fcf_yield_pct: 5.4 },
      { nombre: 'Ginlong (Solis)', ticker: '300763.SZ', pais: 'CN', capitalizacion: 19220, ev_ventas: 3.69, ev_ebitda_ltm: 15.3, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: null, margen_ebitda_pct: 24.0, roic_pct: 6.3, dn_ebitda: 4.0, fcf_yield_pct: 10.0 },
      { nombre: 'Kstar', ticker: '002518.SZ', pais: 'CN', capitalizacion: 16401, ev_ventas: 2.81, ev_ebitda_ltm: 18.5, ev_ebitda_ntm: null, per_ntm: 16.4, crecimiento_pct: null, margen_ebitda_pct: 15.2, roic_pct: 12.4, dn_ebitda: -0.4, fcf_yield_pct: 4.4 },
      { nombre: 'Pylontech', ticker: '688063.SS', pais: 'CN', capitalizacion: 9289, ev_ventas: 1.13, ev_ebitda_ltm: 13.7, ev_ebitda_ntm: null, per_ntm: 22.0, crecimiento_pct: null, margen_ebitda_pct: 8.3, roic_pct: 0.4, dn_ebitda: -10.4, fcf_yield_pct: -6.8 },
      { nombre: 'CATL', ticker: '300750.SZ', pais: 'CN', capitalizacion: 1235568, ev_ventas: 1.96, ev_ebitda_ltm: 7.4, ev_ebitda_ntm: null, per_ntm: 10.7, crecimiento_pct: null, margen_ebitda_pct: 26.3, roic_pct: 18.3, dn_ebitda: -1.6, fcf_yield_pct: 7.1 },
      { nombre: 'Kehua Data', ticker: '002335.SZ', pais: 'CN', capitalizacion: 19267, ev_ventas: 2.38, ev_ebitda_ltm: 14.9, ev_ebitda_ntm: null, per_ntm: 25.1, crecimiento_pct: null, margen_ebitda_pct: 16.0, roic_pct: 6.9, dn_ebitda: 0.5, fcf_yield_pct: 7.7 },
      { nombre: 'Enphase Energy', ticker: 'ENPH', pais: 'US', capitalizacion: 27051, ev_ventas: 3.60, ev_ebitda_ltm: 19.3, ev_ebitda_ntm: null, per_ntm: 14.1, crecimiento_pct: null, margen_ebitda_pct: 18.7, roic_pct: 7.7, dn_ebitda: 3.0, fcf_yield_pct: 3.8 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Folleto de Hong Kong y prensa sectorial (pv magazine, PV Tech): compras de fabricantes de inversores sin múltiplo publicado (Siemens-Kaco, SolarEdge-Kokam); 2) búsqueda de operaciones de almacenamiento 2020-2026 con EV/EBITDA: solo estimaciones de prensa sobre EBITDA futuro (Nextpower-Prevalon, T1-KORE), no comparables; 3) comunicados de compradores cotizados: sin múltiplos oficiales', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SSE: no publica posiciones cortas por valor; 2) saldo de préstamo de valores (融券) no publicado de forma abierta para 605117; 3) Stock Analysis y Yahoo: sin dato para acciones A', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Eastmoney Guba (股吧) de 605117: hilos de particulares, páginas 1-6 (8-19 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,605117.html' },
  { id: 2, titulo: 'Eastmoney Guba de 605117: debates sobre el dividendo a cuenta de 1,6 CNY y el avance del 3T (11-15 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://guba.eastmoney.com/list,605117_4.html' },
  { id: 3, titulo: 'Eastmoney Guba: artículos de prensa y análisis compartidos en el foro (recompras, fondos, sector de almacenamiento)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,605117_2.html' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Eastmoney Guba (hilos de particulares)', fecha: '2026-10', n_comentarios: 300, tono: 'Negativo', resumen: 'Frustración de pequeños inversores atrapados a 80-98 CNY: «el mejor crecimiento del sector y la acción más floja», «ya no es una acción de crecimiento sino de dividendo»; muchos hablan de vender al recuperar su precio [E1].' },
      { plataforma: 'Eastmoney Guba (dividendo y avance del 3T)', fecha: '2026-10', n_comentarios: 120, tono: 'Dividido', resumen: 'El dividendo de 1,6 CNY se recibe con quejas porque la acción bajó el doble el día del corte; otros compran «para cobrar el dividendo» y destacan que los fondos institucionales siguen dentro [E2].' },
      { plataforma: 'Eastmoney Guba (artículos compartidos)', fecha: '2026-10', n_comentarios: 60, tono: 'Neutro', resumen: 'Se comparten notas de los bancos con objetivos un 70 % por encima, la entrada del fondo de la Seguridad Social y la ola de recompras; los comentarios dudan del ciclo del sector y de la competencia [E3].' },
    ],
    temas: [
      { tema: 'Beneficio que crece y acción que cae', postura: 'Dividida', peso: 'Alto', contraste: null },
      { tema: 'Dividendo alto (de crecimiento a renta)', postura: 'Alcista', peso: 'Medio', contraste: null },
      { tema: 'Duda sobre el ciclo del almacenamiento y la guerra de precios', postura: 'Bajista', peso: 'Medio', contraste: null },
      { tema: 'Recompra pequeña y para incentivos', postura: 'Bajista', peso: 'Bajo', contraste: null },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (otras plataformas)', tipo: 'Complemento', intentos: '1) Xueqiu (雪球): la página exige JavaScript y no devuelve los mensajes; 2) Stocktwits: el símbolo 605117 no existe (404); 3) Reddit y Seeking Alpha: sin hilos sobre Deye en tres meses', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas en', dir);
