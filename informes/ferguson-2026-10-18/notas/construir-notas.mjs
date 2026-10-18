// Escribe las notas A-E de Ferguson Enterprises (FERG, corte 2026-10-18) a partir del XBRL de la SEC
// (cuentas-xbrl.json), el 10-KT del periodo de transición (ago-dic 2025), los 10-K FY2022-FY2025, el 20-F FY2021,
// las notas de resultados (año natural 2025, 1T26, 2T26), los 10-Q, el proxy de 2026, Form 4, bolsa.mjs, Yahoo,
// Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista.
// Ejercicios: hasta FY2023 el ejercicio de la empresa (cierre 31 de julio); 2024 y 2025, años naturales que publica
// la propia empresa (no auditados como tales; suma de periodos auditados). Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const E = 'https://www.sec.gov/Archives/edgar/data/2011641';
const P = 'https://www.sec.gov/Archives/edgar/data/1832433';

const fuentes = (lista) => lista.map((f, i) => ({ id: i + 1, ...f }));

// ───────────────────────────── A · Cuentas ─────────────────────────────
const SA = {
  kt: { titulo: 'Form 10-KT del periodo de transición ago-dic 2025 (estados auditados de ago-dic 2025 y FY2023-FY2025; notas de segmentos, deuda, arrendamientos, pensiones, impuestos y nota 17 con el comparativo ago-dic 2024)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-27', url: `${E}/000201164126000006/ferg-20251231.htm` },
  k25: { titulo: 'Form 10-K del ejercicio a 31-jul-2025', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2025-09-26', url: `${E}/000201164125000027/ferg-20250731.htm` },
  k23: { titulo: 'Form 10-K del ejercicio a 31-jul-2023 (Ferguson plc)', editor: 'Ferguson plc / SEC EDGAR', tipo: 'Primaria', fecha: '2023-09-26', url: `${P}/000183243323000066/ferg-20230731.htm` },
  k22: { titulo: 'Form 10-K del ejercicio a 31-jul-2022 (Ferguson plc): cuenta FY2020-FY2022, operaciones interrumpidas, segmentos', editor: 'Ferguson plc / SEC EDGAR', tipo: 'Primaria', fecha: '2022-09-27', url: `${P}/000183243322000086/ferg-20220731.htm` },
  f21: { titulo: 'Form 20-F del ejercicio a 31-jul-2021 (Ferguson plc): historia, dividendo extraordinario de 180 centavos', editor: 'Ferguson plc / SEC EDGAR', tipo: 'Primaria', fecha: '2021-09-28', url: `${P}/000183243321000026/ferg-20210731.htm` },
  prcy: { titulo: 'Ferguson Reports Strong Calendar 2025 Results and Issues 2026 Guidance (8-K, anexo 99.1): cuenta, flujos y segmentos de los años naturales 2024 y 2025', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-24', url: `${E}/000201164126000002/exhibit991pressreleasetran.htm` },
  pr1: { titulo: 'Ferguson Reports First Quarter Ended March 31, 2026 (8-K, anexo 99.1)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${E}/000201164126000028/exhibit991pressreleasemarc.htm` },
  pr2: { titulo: 'Ferguson Reports Second Quarter Ended June 30, 2026 (8-K, anexo 99.1): guía 2026 elevada, balance y flujos de seis meses', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: `${E}/000201164126000038/exhibit991pressreleasejune.htm` },
  q2: { titulo: 'Form 10-Q del trimestre a 30-jun-2026 (deuda, recompras, acciones en circulación a 3-ago-2026)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: `${E}/000201164126000040/ferg-20260630.htm` },
  qe25: { titulo: 'Form 10-Q del trimestre a 31-ene-2025 (balance a 31-ene-2025)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-11', url: `${E}/000201164125000006/ferg-20250131.htm` },
  xbrl: { titulo: 'Hechos XBRL (companyfacts) de Ferguson Enterprises Inc. y de Ferguson plc: cuenta, balance y flujos FY2020-FY2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-18', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0002011641.json' },
  pr24: { titulo: 'Ferguson Reports Fourth Quarter and Year End Results; Issues FY2025 Guidance (8-K, anexo 99.1)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2024-09-17', url: `${E}/000201164124000003/exhibit991pressreleaseq4fy.htm` },
  pr25: { titulo: 'Resultados del ejercicio a julio de 2025, cambio de ejercicio y guía del año natural 2025 (8-K, anexo 99.1)', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2025-09-16', url: `${E}/000201164125000025/exhibit991pressreleaseq4fy.htm` },
  flo: { titulo: 'Ferguson to Acquire FloWorks for $1.6 Billion (8-K, anexo 99.1): ≈ 10 veces el EBITDA ajustado con sinergias, ventas 2025 ≈ 1.000 M USD', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-13', url: `${E}/000201164126000035/exhibit991pressreleasedate.htm` },
  flo2: { titulo: 'Ferguson Completes Acquisition of FloWorks (cierre el 31-ago-2026)', editor: 'Ferguson Enterprises (sala de prensa)', tipo: 'Primaria', fecha: '2026-09-01', url: 'https://s201.q4cdn.com/465729859/files/doc_news/Ferguson-Completes-Acquisition-of-FloWorks-2026.pdf' },
  bonos: { titulo: '8-K de 14-ago-2026: emisión de 700 M USD al 4,800 % con vencimiento 2029 y 500 M USD al 5,600 % con vencimiento 2036', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-14', url: 'https://www.sec.gov/Archives/edgar/data/2011641/000114036126033163/ef20080115_8k.htm' },
  puente: { titulo: '8-K de 11-ago-2026: préstamo puente de hasta 700 M USD para FloWorks', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-11', url: 'https://www.sec.gov/Archives/edgar/data/2011641/000155278126000433/e26338_ferg-8k.htm' },
  q1: { titulo: 'Form 10-Q del trimestre a 31-mar-2026', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-05', url: `${E}/000201164126000030/ferg-20260331.htm` },
};
const ordA = Object.keys(SA); const a = (k) => ordA.indexOf(k) + 1;

const cuenta = [
  { periodo: '2021', ingresos: 22792, coste_ventas: 15812, gastos_generales: 4732, ebitda: 2248, amortizaciones: 298, ebit: 1950, resultado_financiero: -88, bai: 1862, impuestos: 232, minoritarios: 0, beneficio_neto: 1630, gastos_financieros: 98, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 11, bpa: 7.25, dpa: 4.611, dpa_extraordinario: 1.8, acciones_diluidas: 224.8 },
  { periodo: '2022', ingresos: 28566, coste_ventas: 19810, gastos_generales: 5635, ebitda: 3121, amortizaciones: 301, ebit: 2820, resultado_financiero: -112, bai: 2708, impuestos: 609, minoritarios: 0, beneficio_neto: 2099, gastos_financieros: 111, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 17, bpa: 9.59, dpa: 2.505, dpa_extraordinario: 0, acciones_diluidas: 218.9 },
  { periodo: '2023', ingresos: 29734, coste_ventas: 20709, gastos_generales: 5920, ebitda: 2980, amortizaciones: 321, ebit: 2659, resultado_financiero: -195, bai: 2464, impuestos: 575, minoritarios: 0, beneficio_neto: 1889, gastos_financieros: 184, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 125, bpa: 9.12, dpa: 3.16, dpa_extraordinario: 0, acciones_diluidas: 207.2 },
  { periodo: '2024', ingresos: 29818, coste_ventas: 20774, gastos_generales: 6139, ebitda: 2879, amortizaciones: 351, ebit: 2528, resultado_financiero: -182, bai: 2346, impuestos: 695, minoritarios: 0, beneficio_neto: 1651, gastos_financieros: 179, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 26, bpa: 8.18, dpa: 3.16, dpa_extraordinario: 0, acciones_diluidas: 201.9 },
  { periodo: '2025', ingresos: 31316, coste_ventas: 21608, gastos_generales: 6465, ebitda: 3169, amortizaciones: 380, ebit: 2789, resultado_financiero: -205, bai: 2584, impuestos: 578, minoritarios: 0, beneficio_neto: 2006, gastos_financieros: 190, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 74, bpa: 10.16, dpa: 3.38, dpa_extraordinario: 0, acciones_diluidas: 197.4 },
];
const balance = [
  { periodo: '2021', activo_total: 13709, activo_corriente: 8129, pasivo_corriente: 4738, pasivo_total: 8706, fondo_comercio: 1828, intangibles: 546, inmovilizado_material: 1305, existencias: 3273, clientes: 2786, proveedores: 3030, activos_contrato: null, pasivos_contrato: null, caja: 1335, deuda_financiera: 2512, arrendamientos: 0, patrimonio_neto: 5003, minoritarios: 0, reservas: 6054 },
  { periodo: '2022', activo_total: 15661, activo_corriente: 9551, pasivo_corriente: 5799, pasivo_total: 10996, fondo_comercio: 2048, intangibles: 782, inmovilizado_material: 1376, existencias: 4333, clientes: 3610, proveedores: 3607, activos_contrato: null, pasivos_contrato: null, caja: 771, deuda_financiera: 3929, arrendamientos: 0, patrimonio_neto: 4665, minoritarios: 0, reservas: 7594 },
  { periodo: '2023', activo_total: 15994, activo_corriente: 9077, pasivo_corriente: 5429, pasivo_total: 10957, fondo_comercio: 2241, intangibles: 783, inmovilizado_material: 1595, existencias: 3898, clientes: 3597, proveedores: 3408, activos_contrato: null, pasivos_contrato: null, caja: 601, deuda_financiera: 3766, arrendamientos: 0, patrimonio_neto: 5037, minoritarios: 0, reservas: 8557 },
  { periodo: '2024', activo_total: 16530, activo_corriente: 9225, pasivo_corriente: 5057, pasivo_total: 11041, fondo_comercio: 2361, intangibles: 699, inmovilizado_material: 1808, existencias: 4273, clientes: 3200, proveedores: 3027, activos_contrato: null, pasivos_contrato: null, caja: 764, deuda_financiera: 4349, arrendamientos: 0, patrimonio_neto: 5489, minoritarios: 0, reservas: 5998 },
  { periodo: '2025', activo_total: 17152, activo_corriente: 9536, pasivo_corriente: 5125, pasivo_total: 11295, fondo_comercio: 2470, intangibles: 685, inmovilizado_material: 1911, existencias: 4588, clientes: 3312, proveedores: 3117, activos_contrato: null, pasivos_contrato: null, caja: 557, deuda_financiera: 4126, arrendamientos: 0, patrimonio_neto: 5857, minoritarios: 0, reservas: 7167 },
];
const flujos = [
  { periodo: '2021', flujo_operativo: 1382, capex: 241, pagos_arrendamientos: 0, adquisiciones: 286, desinversiones: 18, dividendos: 1036, recompras: 400, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 1149, capex: 290, pagos_arrendamientos: 0, adquisiciones: 650, desinversiones: 4, dividendos: 538, recompras: 1545, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 2723, capex: 441, pagos_arrendamientos: 0, adquisiciones: 616, desinversiones: 3, dividendos: 711, recompras: 908, emision_acciones: 17, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 2071, capex: 328, pagos_arrendamientos: 0, adquisiciones: 297, desinversiones: 10, dividendos: 637, recompras: 893, emision_acciones: 17, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 2181, capex: 354, pagos_arrendamientos: 0, adquisiciones: 276, desinversiones: 85, dividendos: 656, recompras: 902, emision_acciones: 0, intereses_en_financiacion: 0 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 31963, ebitda: 3332, ebit: 2945, beneficio_neto: 2107, bpa: 10.78, dpa: 3.5, dpa_extraordinario: 0, fcf: 1327, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2 },
    cambios_perimetro: [],
    comentario: `Las ventas pasaron de 22.792 M USD en el ejercicio a julio de 2021 a 31.316 M en el año natural 2025 [${a('k22')}, ${a('prcy')}]. El salto de 2022 (+25,3 %) fue casi todo precio: la inflación de producto aportó en torno al 19 % [${a('k22')}]. Después vinieron dos años planos (29.734 M en FY2023 y 29.818 M en el año natural 2024) con precios ligeramente a la baja, y una vuelta al crecimiento en 2025: +5,0 %, con un 4,5 % orgánico y un 1,0 % de compras, y deflación revertida a inflación baja [${a('prcy')}]. El margen bruto se ha mantenido en el 30-31 % (31,0 % en 2025, +70 pb) y el margen operativo ajustado subió del 9,1 % al 9,6 % [${a('prcy')}]. En el primer semestre de 2026 las ventas crecieron un 4,2 % y el margen operativo ajustado fue del 9,7 % [${a('pr2')}]. El crecimiento por compras es recurrente (≈ 1 punto al año) y FloWorks, cerrada el 31-ago-2026, añade unos 1.000 M USD de ventas anuales [${a('flo')}, ${a('flo2')}].`,
    ajustes: `Cifras publicadas (US GAAP). FY2021 y FY2022 son de operaciones continuadas: el negocio británico, vendido el 29-ene-2021, va en interrumpidas (−158 M en FY2021 y +23 M en FY2022) [${a('k22')}, ${a('f21')}]. No recurrentes dentro del EBIT y del EBITDA, que el motor devuelve: reestructuración del traslado a EE. UU. y de red (11 M en FY2021, 17 M en FY2022, 26 M en 2024, 74 M en 2025, con una plusvalía de 20 M por la venta de un almacén) y 125 M en FY2023 por un proyecto informático abandonado y cierres de sucursales [${a('k23')}, ${a('prcy')}]. La empresa publica además un resultado «ajustado» que suma la amortización de intangibles comprados (148 M en 2025) y quita ajustes fiscales discretos (−87 M en 2025, +94 M en 2024); el BPA ajustado de 2025 fue 10,58 USD frente a 10,16 publicado [${a('prcy')}]. FY2021 lleva un ajuste fiscal discreto de −203 M (tipo efectivo del 12,5 %) [${a('k22')}].`,
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 7234, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 601, margen_ebitda_pct: 8.3, bpa: 1.78, vs_consenso: null },
      { periodo: '1T25', ingresos: 7213, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 600, margen_ebitda_pct: 8.3, bpa: 1.73, vs_consenso: null },
      { periodo: '2T25', ingresos: 8363, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 938, margen_ebitda_pct: 11.2, bpa: 3.21, vs_consenso: null },
      { periodo: '3T25', ingresos: 8245, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 940, margen_ebitda_pct: 11.4, bpa: 3.23, vs_consenso: null },
      { periodo: '4T25', ingresos: 7495, crecimiento_pct: 3.6, crecimiento_organico_pct: 3.0, ebitda: 691, margen_ebitda_pct: 9.2, bpa: 1.99, vs_consenso: null },
      { periodo: '1T26', ingresos: 7472, crecimiento_pct: 3.6, crecimiento_organico_pct: null, ebitda: 709, margen_ebitda_pct: 9.5, bpa: 2.13, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 8751, crecimiento_pct: 4.6, crecimiento_organico_pct: 3.8, ebitda: 992, margen_ebitda_pct: 11.3, bpa: 3.43, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: `Trimestres naturales; el 3T25 sale por diferencia entre el año natural 2025 y los otros tres trimestres publicados, y 2024 solo tiene el cuarto trimestre por separado [${a('prcy')}, ${a('pr1')}, ${a('pr2')}]. EBITDA = beneficio operativo publicado + amortizaciones (no el ajustado). En mayo la dirección mantuvo la guía 2026 (ventas +bajo a medio dígito, margen operativo ajustado 9,4-9,8 %) con «mercados en general planos», y destacó la fuerza de los grandes proyectos no residenciales [${a('pr1')}]. En agosto subió la guía a crecimiento de medio dígito y a un margen de 9,5-9,8 %, sin incluir FloWorks: no residencial +8 % en EE. UU. por cuota ganada en un mercado «mixto», residencial +2 % pese a un mercado débil, margen bruto del 31,0 % (−20 pb frente a un 2T25 inflado por las subidas de precio de los proveedores) y 573 M invertidos en cinco compras [${a('pr2')}]. El cambio de discurso entre las dos conferencias: de prudencia por el mercado a confianza en la cuota y en los proyectos grandes (centros de datos, semiconductores, agua). La caja operativa del semestre bajó a 716 M (1.123 M un año antes) por más existencias y clientes [${a('pr2')}]. No se ha podido leer la transcripción de las preguntas de los analistas (hueco registrado).`,
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 150 }, { anio: '2027', importe: 450 }, { anio: '2028', importe: 750 }, { anio: '2029', importe: 0 }, { anio: '2030', importe: 600 }, { anio: '2031+', importe: 2200 }],
    liquidez: `Caja de 437 M USD a 30-jun-2026, línea de crédito comprometida de 1.500 M (250 M dispuestos; vence en abril de 2031) y titulización de clientes de 900 M (525 M dispuestos; vence en octubre de 2027) [${a('q2')}]. En agosto emitió 1.200 M en bonos (700 M al 4,80 % a 2029 y 500 M al 5,60 % a 2036) y firmó un puente de hasta 700 M para pagar FloWorks [${a('bonos')}, ${a('puente')}].`,
    rating: 'Grado de inversión (la empresa no da la calificación en sus documentos revisados)',
    coste_deuda_pct: 4.6,
    vida_media_anios: 5.0,
    otros_pasivos: `Arrendamientos operativos de 1.891 M a dic-2025 (455 M a corto y 1.436 M a largo) y 2.178 M de pagos sin descontar; en US GAAP su gasto ya está en el EBITDA y no van al puente [${a('kt')}]. Pensiones en el Reino Unido y Canadá con un déficit neto de 14 M a dic-2025 (superávit de 26 M a jul-2025) [${a('kt')}]. Pasivos fiscales por posiciones inciertas de 102 M [${a('kt')}]. Obligaciones de compra de 2.543 M a un año, cancelables en su mayoría [${a('kt')}]. Cumple todos los covenants; la política es mantener deuda neta / EBITDA ajustado entre 1 y 2 veces (1,3 veces a jun-2026, ≈ 1,8 tras FloWorks según la propia empresa) [${a('pr2')}, ${a('kt')}]. Sin factoring sin recurso: la titulización de clientes figura como deuda [${a('q2')}].`,
    comentario: `La deuda financiera bruta subió de 2.512 M (jul-2021) a 4.126 M (dic-2025) y a 4.925 M nominales a jun-2026, financiando recompras (4.700 M del programa de 2021) y compras [${a('q2')}]. La caja, de 1.335 M tras vender el Reino Unido, se ha llevado a un nivel operativo de 400-700 M. El circulante comercial (existencias + clientes − proveedores) es estacional: 15,3 % de las ventas en diciembre de 2025 y 16,6 % de las ventas de doce meses a junio de 2026 [${a('kt')}, ${a('pr2')}]. Los balances de 2021-2023 son de cierre de julio (temporada alta) y el de 2024, de 31-ene-2025 (el más cercano al cierre de diciembre que se publica), lo que hace los ratios de circulante de los años de julio algo más altos [${a('qe25')}].`,
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: `Conversión alta y estable salvo en los años de inflación: en FY2022 el flujo operativo (1.149 M) se quedó en la mitad del beneficio por el aumento de existencias y clientes que exigió la subida de precios; en FY2023 lo devolvió (2.723 M) al liberar 607 M de existencias [${a('k23')}, ${a('kt')}]. En los años naturales 2024 y 2025 el flujo operativo fue de 2.071 M y 2.181 M (1,25 y 1,09 veces el beneficio neto) [${a('prcy')}]. El capex es pequeño (1,0-1,5 % de las ventas: sucursales, centros de distribución y sistemas; 375-425 M de guía para 2026) [${a('pr2')}]; la empresa no separa mantenimiento y crecimiento. Estimación propia: el mantenimiento se acerca a la depreciación del inmovilizado material (≈ 200 M al año) y el resto es crecimiento. Las compras (≈ 300 M al año, 2.183 M en 2026 con FloWorks) son la otra inversión recurrente. El primer semestre de 2026 consumió circulante: flujo operativo de 716 M frente a 1.123 M [${a('pr2')}].`,
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 4, opinion: 'Favorable (y control interno eficaz a 31-dic-2025)',
    comentario: `Deloitte audita desde 2022 (antes, Deloitte LLP en el Reino Unido) y dio opinión favorable sobre el periodo de transición y los tres ejercicios a julio, con un asunto clave de auditoría: la provisión de obsolescencia de existencias (4.600 M de existencias) [${a('kt')}]. Sin cambios de criterio relevantes; el cambio de cierre no reexpresa nada, pero los años naturales 2024 y 2025 que usamos son sumas de periodos auditados y no están auditados como tales [${a('prcy')}]. El pago en acciones es pequeño (88 M en 2025, el 4,4 % del beneficio neto) [${a('prcy')}]. Partidas que conviene vigilar: los ajustes fiscales discretos (liberaciones de posiciones inciertas) suben el beneficio publicado cada año, el «ajustado» de la empresa excluye la amortización de intangibles comprados, y el deterioro de 125 M de FY2023 por un proyecto informático fallido. Los rápeles de proveedores (descuentos por volumen) son una parte relevante del margen bruto y se estiman con objetivos escalonados [${a('kt')}].`,
    senales: [
      { senal: 'Rápeles de proveedores en el margen bruto', nivel: 'Media', comentario: `Se reconocen por estimación; una pequeña parte depende de objetivos escalonados de volumen [${a('kt')}].` },
      { senal: 'Ajustes fiscales discretos recurrentes', nivel: 'Baja', comentario: `−87 M en 2025, −42 M en el periodo de transición, −34 M en el 1S26: rebajan el tipo efectivo publicado al 21-23 % frente al 26 % ajustado [${a('prcy')}, ${a('pr2')}].` },
      { senal: 'Proyecto informático deteriorado en FY2023 (≈ 107 M)', nivel: 'Baja', comentario: `Una solución piloto de sucursales no cumplió; se cargó en FY2023 [${a('k23')}].` },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Estados Unidos', descripcion: 'Marca Ferguson: fontanería, climatización (HVAC), agua y saneamiento, tuberías y válvulas (PVF), contra incendios, exposiciones y comercio digital; 95 % de las ventas.', tipo_resultado: 'EBIT', historico: [ { periodo: '2021', ingresos: 21478, resultado: 2070 }, { periodo: '2022', ingresos: 27067, resultado: 2893 }, { periodo: '2023', ingresos: 28291, resultado: 2892 }, { periodo: '2024', ingresos: 28349, resultado: 2697 }, { periodo: '2025', ingresos: 29807, resultado: 3024 } ] },
      { nombre: 'Canadá', descripcion: 'Marca Wolseley: fontanería, climatización y refrigeración, agua; 5 % de las ventas.', tipo_resultado: 'EBIT', historico: [ { periodo: '2021', ingresos: 1314, resultado: 76 }, { periodo: '2022', ingresos: 1499, resultado: 112 }, { periodo: '2023', ingresos: 1443, resultado: 76 }, { periodo: '2024', ingresos: 1469, resultado: 60 }, { periodo: '2025', ingresos: 1509, resultado: 54 } ] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 95.2 }, { nombre: 'Canadá', peso_pct: 4.8 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas no residenciales en EE. UU. (≈ mitad)', valor_anterior: '+10 % (4T25)', valor_actual: '+8 % (2T26)', variacion: 'Sigue con cuota ganada', comentario: `Agua, comercial/mecánico y grandes proyectos [${a('prcy')}, ${a('pr2')}].` },
      { kpi: 'Ventas residenciales en EE. UU. (≈ mitad)', valor_anterior: '−2 % (4T25)', valor_actual: '+2 % (2T26)', variacion: 'Vuelve a crecer', comentario: `Con viviendas iniciadas y reformas débiles [${a('prcy')}, ${a('pr2')}].` },
      { kpi: 'Margen bruto', valor_anterior: '30,3 % (2024)', valor_actual: '31,0 % (2025 y 1S26)', variacion: '+70 pb', comentario: `Gestión de precios y subidas de proveedores [${a('prcy')}, ${a('pr2')}].` },
      { kpi: 'Margen operativo ajustado', valor_anterior: '9,1 % (2024)', valor_actual: '9,6 % (2025); 9,7 % (1S26)', variacion: '+50 pb', comentario: `Guía 2026: 9,5-9,8 % [${a('prcy')}, ${a('pr2')}].` },
      { kpi: 'Sucursales y empleados', valor_anterior: 'n.d.', valor_actual: '1.729 sucursales, ≈ 35.000 empleados (dic-2025)', variacion: '—', comentario: `9 centros regionales y unos 6.200 vehículos [${a('kt')}].` },
      { kpi: 'Deuda neta / EBITDA ajustado', valor_anterior: '1,1x (dic-2025)', valor_actual: '1,3x (jun-2026)', variacion: '≈ 1,8x tras FloWorks', comentario: `Objetivo de 1-2 veces [${a('pr2')}].` },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: `Prioridades declaradas: invertir en crecimiento orgánico, dividendo creciente, compras de consolidación y devolver el excedente con recompras, con deuda neta / EBITDA ajustado de 1-2 veces y métricas de grado de inversión [${a('pr2')}]. Dividendo trimestral de 0,89 USD (3,56 USD anualizados, ≈ 1,5 % de rentabilidad) [${a('pr2')}]. En abril de 2026 el consejo aprobó un programa de recompra de hasta 2.000 M que sustituye al de 2021 (4.700 M ejecutados de 5.000 M); a jun-2026 llevaba 136 M [${a('q2')}].`,
    adquisiciones: [
      { anio: '2026', objetivo: 'FloWorks (FWI Holdings): válvulas y control de fluidos industrial, ≈ 1.000 M USD de ventas 2025', importe: 1600, ev_ebitda: 10.0, financiacion: 'Bonos de 1.200 M (ago-2026), puente de hasta 700 M y caja', resultado: `Cerrada el 31-ago-2026; ≈ 10 veces el EBITDA ajustado de doce meses con 45 M de sinergias; acrecitiva en BPA ajustado según la empresa [${a('flo')}, ${a('flo2')}]` },
      { anio: '2026', objetivo: 'Cinco compras del 2T26 (Carrier Great Lakes, Dealers Supply, New England Applied Products, Hamlett, PRD) y tres del 1T26', importe: 583, ev_ebitda: null, financiacion: 'Caja y titulización', resultado: `Las ocho del año (con FloWorks) suman ≈ 1.400 M de ventas anuales [${a('pr2')}]` },
      { anio: '2025', objetivo: 'Ocho compras en el año natural', importe: 276, ev_ebitda: null, financiacion: 'Caja', resultado: `> 300 M de ventas anuales; ≈ 0,9 veces ventas [${a('prcy')}]` },
      { anio: '2024', objetivo: 'Compras del año natural 2024', importe: 297, ev_ebitda: null, financiacion: 'Caja', resultado: `Aportaron ≈ 1 punto de crecimiento [${a('prcy')}]` },
      { anio: '2023', objetivo: 'Compras de FY2023 (entre ellas Guarino, Monarch y Power Process Controls)', importe: 616, ev_ebitda: null, financiacion: 'Caja', resultado: `Sin deterioros de fondo de comercio desde entonces [${a('kt')}]` },
      { anio: '2022', objetivo: 'Compras de FY2022 (entre ellas Airefco, Signature Fire y Pacific Coast Lighting)', importe: 650, ev_ebitda: null, financiacion: 'Caja y bono de 1.000 M', resultado: `Sin deterioros de fondo de comercio [${a('k22')}]` },
    ],
    confianza: 'Alta',
  },
  fuentes: fuentes(ordA.map((k) => SA[k])),
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento de 4T24-3T25 y transcripción', tipo: 'Complemento', intentos: '1) Notas de resultados de cada trimestre natural: la empresa no publicó los trimestres naturales de 2024; 2) 10-Q de 2026: solo comparan con 2025; 3) transcripciones en Seeking Alpha, Benzinga y Quartr: de pago o bloqueadas', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ───────────────────────────── B · Sector, competencia, historia, ESG ─────────────────────────────
const SB = {
  kt: SA.kt,
  census: { titulo: 'Ventas de mayoristas de ferretería, fontanería y calefacción (NAICS 4237), mensual sin desestacionalizar (Monthly Wholesale Trade, S4237SM144NCEN)', editor: 'U.S. Census Bureau vía FRED', tipo: 'Sectorial', fecha: '2026-10-18', url: 'https://fred.stlouisfed.org/series/S4237SM144NCEN' },
  f21: SA.f21,
  prcy: SA.prcy,
  flo: SA.flo,
  sa: { titulo: 'Estadísticas de Watsco, Core & Main, WESCO, Pool y SiteOne (ventas, márgenes, ROIC, deuda) a 16-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/wso/statistics/' },
  ficha: { titulo: 'Ficha sectorial corta de distribución industrial especializada (Grainger, Fastenal, Applied Industrial: márgenes y ROIC)', editor: 'Repositorio del análisis (sectores/distribucion-industrial-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/distribucion-industrial-2026-10-14.md' },
  pr2: SA.pr2,
  fbm: { titulo: 'Lowe\'s Announces Agreement to Acquire Foundation Building Materials (8-K, anexo 99.1)', editor: 'Lowe\'s / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-20', url: 'https://www.sec.gov/Archives/edgar/data/60667/000006066725000162/exhibit991-08012025fbm.htm' },
  srs: { titulo: 'Home Depot: presentación de la compra de SRS Distribution (8-K, anexo 99.2)', editor: 'Home Depot / SEC EDGAR', tipo: 'Primaria', fecha: '2024-03-28', url: 'https://www.sec.gov/Archives/edgar/data/354950/000110465924040163/tm2410002d1_ex99-2.htm' },
  k22: SA.k22,
};
const ordB = Object.keys(SB); const b = (k) => ordB.indexOf(k) + 1;
const B = {
  _estado: 'completa',
  historia: {
    resumen: `Ferguson nace de Wolseley, fundada en 1887 en el Reino Unido para fabricar esquiladoras; en 1979 dejó la fabricación para dedicarse a la distribución y en 1982 compró Ferguson Enterprises en EE. UU. [${b('f21')}]. Tras crecer en Europa, desde 2009 fue vendiendo todo lo que no era fontanería y calefacción en Norteamérica: el negocio nórdico (2018), el neerlandés (2019) y el británico (enero de 2021) [${b('f21')}]. En 2017 tomó el nombre de su filial estadounidense, en 2021 empezó a cotizar en Nueva York, en 2022 trasladó allí su cotización principal y en agosto de 2024 se domicilió en Delaware [${b('k22')}, ${b('kt')}]. En 2025 cambió el cierre del ejercicio de julio a diciembre, en julio de 2026 dejó Londres y el 5-ago-2026 entró en el S&P 500 [${b('kt')}, ${b('pr2')}].`,
    hitos: [
      { anio: '1887', hito: `Fundación de Wolseley (esquiladoras) [${b('f21')}]` },
      { anio: '1982', hito: `Compra de Ferguson Enterprises en EE. UU. [${b('f21')}]` },
      { anio: '1986', hito: `Salida a la Bolsa de Londres como Wolseley plc [${b('f21')}]` },
      { anio: '2017', hito: `Cambio de nombre a Ferguson plc [${b('f21')}]` },
      { anio: '2018-2019', hito: `Venta de Stark (nórdicos) y Wasco (Países Bajos) [${b('f21')}]` },
      { anio: '2021', hito: `Venta del negocio británico (29-ene) y dividendo extraordinario; cotización en Nueva York [${b('f21')}]` },
      { anio: '2022', hito: `Cotización principal en la NYSE desde el 12-may-2022 [${b('k22')}]` },
      { anio: '2024', hito: `Nueva matriz domiciliada en Delaware (1-ago-2024) [${b('kt')}]` },
      { anio: '2025', hito: `Cambio del cierre del ejercicio a diciembre; periodo de transición ago-dic 2025 [${b('kt')}]` },
      { anio: '2026', hito: `Exclusión de Londres (20-jul), entrada en el S&P 500 (5-ago) y compra de FloWorks por 1.600 M (31-ago) [${b('pr2')}, ${b('flo')}]` },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: `Ferguson es el mayor distribuidor con valor añadido de soluciones de agua y aire de Norteamérica: fontanería, climatización, electrodomésticos e iluminación, tuberías, válvulas y accesorios (PVF), redes de agua y saneamiento y protección contra incendios [${b('kt')}]. Compra a unos 37.000 proveedores (ninguno supera el 5 %) y vende a contratistas profesionales a través de 1.729 sucursales, 9 centros regionales de distribución y unos 6.200 vehículos [${b('kt')}]. En EE. UU. (95 % de las ventas) se organiza por grupos de clientes: agua y saneamiento 24 %, Ferguson Home 21 % (constructores, reformistas y diseñadores, con exposiciones y comercio digital), comercial/mecánico 15 %, fontanería residencial 15 %, climatización 11 %, industrial 7 %, suministros a instalaciones 4 % y contra incendios 3 % (ago-dic 2025) [${b('kt')}]. Residencial y no residencial pesan la mitad cada uno; dos tercios son reparación, mantenimiento y reforma y un tercio obra nueva [${b('kt')}]. Ningún cliente llega al 1 % de las ventas [${b('kt')}].`,
    como_gana_dinero: `Gana el diferencial entre el precio de compra a fabricantes (con rápeles por volumen) y el de venta a contratistas: margen bruto del 31,0 % en 2025, gastos generales del 20,6 % de las ventas y margen operativo ajustado del 9,6 % [${b('prcy')}]. El margen depende de la escala local (disponibilidad del producto en la sucursal o en la obra al día siguiente), del servicio técnico (diseño, presupuestos, logística de grandes proyectos) y de la mezcla (marca propia, productos técnicos). Casi la mitad de los costes son de personal y de red, así que hay apalancamiento operativo: con deflación de precios en 2024 el margen bajó y con +5 % de ventas en 2025 subió 50 pb [${b('prcy')}]. El negocio es recurrente por el peso de la reparación y el mantenimiento (dos tercios), aunque cíclico por la obra nueva. Estacionalidad: el segundo y el tercer trimestre naturales concentran el beneficio (margen EBITDA del 11 % frente al 8-9 % en invierno) [${b('prcy')}].`,
    clientes: `Clientela muy fragmentada: ningún cliente supera el 1 % de las ventas; son contratistas de fontanería y climatización, constructores, empresas de obra civil y de agua, municipios, contratistas mecánicos de grandes proyectos (centros de datos, fábricas de semiconductores) e industria [${b('kt')}]. No hay contratos plurianuales relevantes: la fidelidad sale del crédito comercial, la disponibilidad y el servicio. **Poder de precios**: en FY2022 trasladó una inflación de producto de en torno al 19 % y el margen bruto subió, y en 2024, con precios a la baja, defendió el 30,3 % [${b('k22')}, ${b('prcy')}]. **Venta al público**: no es un minorista. El grupo Ferguson Home (21 % de las ventas en EE. UU.) incluye exposiciones y comercio electrónico que atienden también a particulares, pero la empresa no publica qué parte es venta directa al consumidor final; el resto es venta a profesionales [${b('kt')}].`,
    confianza: 'Alta',
  },
  sector: {
    definicion: `El mercado relevante es la distribución de productos de fontanería, climatización, agua y saneamiento, PVF e incendios a profesionales de la construcción residencial y no residencial en EE. UU. y Canadá. Usamos la cifra de la propia empresa (340.000 M USD en 2025; 400.000 M con el perímetro industrial de FloWorks), porque es la que define su cuota [${b('prcy')}, ${b('flo')}]. Como segunda fuente, la estadística mensual del Census para los mayoristas de ferretería, fontanería y calefacción (NAICS 4237): 257.975 M USD en 2025, un perímetro más estrecho (sin agua y saneamiento ni PVF industrial) que sirve para medir el crecimiento [${b('census')}].`,
    tamano: `≈ 340.000 M USD en 2025 (estimación de la empresa) y ≈ 400.000 M con FloWorks [${b('prcy')}, ${b('flo')}]; mayoristas NAICS 4237 de EE. UU.: 257.975 M USD en 2025 [${b('census')}]`,
    unidad_serie: 'millones de USD (mayoristas NAICS 4237, Census)',
    serie: [ { anio: '2019', tamano: 168158 }, { anio: '2020', tamano: 172496 }, { anio: '2021', tamano: 204577 }, { anio: '2022', tamano: 230962 }, { anio: '2023', tamano: 230302 }, { anio: '2024', tamano: 244329 }, { anio: '2025', tamano: 257975 } ],
    tcac_historico_pct: 8.4,
    tcac_previsto_pct: 4.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Reparación, mantenimiento y reforma (dos tercios de las ventas)', efecto: '+', horizonte: 'Estructural', evidencia: `Parque de viviendas envejecido y con déficit de construcción; reformas débiles en 2025-26 [${b('kt')}, ${b('pr2')}]` },
      { driver: 'Obra nueva residencial', efecto: '−', horizonte: 'Cíclico', evidencia: `Viviendas iniciadas y permisos a la baja; residencial −1 % en ago-dic 2025 [${b('kt')}]` },
      { driver: 'Grandes proyectos no residenciales (centros de datos, semiconductores, fábricas)', efecto: '+', horizonte: 'Cíclico', evidencia: `No residencial +11 % en ago-dic 2025 y +8 % en el 2T26 [${b('kt')}, ${b('pr2')}]` },
      { driver: 'Inversión en redes de agua y saneamiento', efecto: '+', horizonte: 'Estructural', evidencia: `Agua y saneamiento pasó del 21 % (FY2023) al 24 % de las ventas en EE. UU. [${b('kt')}]` },
      { driver: 'Precio de producto (cobre, acero, plástico; aranceles)', efecto: '+/−', horizonte: 'Cíclico', evidencia: `Inflación del ≈ 19 % en FY2022, precios ligeramente a la baja en FY2025, inflación baja en 2026 [${b('k22')}, ${b('pr2')}]` },
      { driver: 'Consolidación de un mercado fragmentado', efecto: '+', horizonte: 'Estructural', evidencia: `≈ 1 punto de crecimiento anual por compras [${b('prcy')}]` },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: `Mercado fragmentado con cientos de distribuidores regionales; Ferguson tiene ≈ 9 % y los grandes ganan cuota [${b('prcy')}]` },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: `Ningún cliente supera el 1 % de las ventas [${b('kt')}]` },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: `37.000 proveedores, ninguno > 5 % de las compras; los fabricantes de climatización tienen más poder [${b('kt')}]` },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: `Home Depot (SRS y GMS) y Lowe's (FBM) han comprado distribuidores para profesionales por 18.250 M y 8.800 M [${b('srs')}, ${b('fbm')}]` },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: `La venta directa del fabricante y el comercio digital existen, pero el contratista necesita disponibilidad local, crédito y servicio [${b('kt')}]` },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: `Residencial débil (obra nueva y reformas a la baja) y no residencial fuerte por grandes proyectos y agua [${b('pr2')}]. Los mayoristas NAICS 4237 vendieron un 2,6 % más en 2020, un 18,6 % más en 2021 y se quedaron planos en 2023 tras el ciclo de inflación [${b('census')}]. Ferguson pasó por 2020 con −4 % de ventas en el segundo semestre del ejercicio y volvió a crecer en FY2021, y en 2023-24 se quedó plana con márgenes a la baja [${b('k22')}, ${b('prcy')}]. En 2008-09 Wolseley tuvo que reestructurarse y cerrar sucursales [${b('f21')}].` },
    regulacion: `Aranceles de EE. UU. sobre importaciones (la empresa compra el 95 % de lo que vende en EE. UU. a proveedores estadounidenses, que a su vez importan componentes) [${b('kt')}]. Normas de eficiencia energética y cambio de refrigerantes en climatización (transición a los A2L desde 2025), que suben el precio medio de los equipos. Programas federales y estatales de inversión en agua potable y saneamiento (la ley de infraestructuras de 2021) [${b('kt')}]. La normativa de la SEC por la nueva domiciliación en Delaware y la salida de Londres simplifican el cumplimiento [${b('pr2')}].`,
    tendencias: `Tres tendencias favorecen a los grandes: (1) la consolidación, porque la escala local da disponibilidad y compras más baratas; (2) los grandes proyectos (centros de datos, semiconductores, energía), que exigen logística y crédito que los pequeños no tienen; (3) el comercio digital con contratistas (pedidos sistema a sistema), donde Ferguson invierte. En contra: la entrada de Home Depot y Lowe's en la distribución a profesionales con compras de 8.800-18.250 M [${b('srs')}, ${b('fbm')}], y la presión de los fabricantes por vender directo en climatización. FloWorks lleva a la empresa al control de fluidos industrial (químico, refino, energía, semiconductores) [${b('flo')}].`,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 9.2,
    posicion: `1.º de Norteamérica en distribución de soluciones de agua y aire para profesionales: 31.316 M USD sobre un mercado de 340.000 M (≈ 9 %; ≈ 8 % sobre 400.000 M con el perímetro de FloWorks) [${b('prcy')}, ${b('flo')}]`,
    competidores: [
      { nombre: 'Core & Main', pais: 'EE. UU.', ticker: 'CNM', ingresos: 7698, cuota_pct: 2.3, margen_ebit_pct: 9.6, comentario: `El rival directo en agua y saneamiento; 12,7 % de ROIC con 2,6 veces deuda / EBITDA [${b('sa')}]` },
      { nombre: 'Watsco', pais: 'EE. UU.', ticker: 'WSO', ingresos: 7284, cuota_pct: 2.1, margen_ebit_pct: 9.0, comentario: `El mayor distribuidor de climatización; compite en HVAC residencial [${b('sa')}]` },
      { nombre: 'WESCO International', pais: 'EE. UU.', ticker: 'WCC', ingresos: 25013, cuota_pct: null, margen_ebit_pct: 5.6, comentario: `Material eléctrico y de comunicaciones; se cruza en centros de datos e industria [${b('sa')}]` },
      { nombre: 'Pool Corp', pais: 'EE. UU.', ticker: 'POOL', ingresos: 5394, cuota_pct: null, margen_ebit_pct: 10.9, comentario: `Distribuidor de piscinas a profesionales; modelo de sucursales parecido [${b('sa')}]` },
      { nombre: 'SiteOne Landscape Supply', pais: 'EE. UU.', ticker: 'SITE', ingresos: 4775, cuota_pct: null, margen_ebit_pct: 5.3, comentario: `Riego y paisajismo para profesionales; comprador en serie [${b('sa')}]` },
      { nombre: 'Home Depot (SRS, GMS, HD Supply)', pais: 'EE. UU.', ticker: 'HD', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Entró en la distribución a profesionales con SRS (18.250 M, 16,1 veces el EBITDA ajustado 2023) [${b('srs')}]` },
      { nombre: 'W.W. Grainger', pais: 'EE. UU.', ticker: 'GWW', ingresos: 18845, cuota_pct: null, margen_ebit_pct: 15.4, comentario: `Suministros industriales (MRO); compite en suministros a instalaciones e industrial [${b('ficha')}]` },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: `Más sucursales y centros dan más disponibilidad, pero no hay efecto de red entre clientes [${b('kt')}]` },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: `Crédito comercial, integración de pedidos y diseño de proyectos; el contratista puede cambiar de proveedor pedido a pedido [${b('kt')}]` },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: `Marca reconocida por profesionales y marca propia; sin patentes relevantes [${b('kt')}]` },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: `Escala de compra (31.300 M) y logística: margen operativo ajustado del 9,6 % frente al 5-9 % de la mayoría de distribuidores comparables [${b('prcy')}, ${b('sa')}]` },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: `Densidad local de sucursales y centros regionales difícil de replicar fuera de las grandes cadenas [${b('kt')}]` },
      ],
    },
    amenazas: `La amenaza más seria es la entrada de Home Depot y Lowe's en la distribución a profesionales: SRS, GMS y FBM les dan red y crédito, y su escala de compra es mayor que la de Ferguson [${b('srs')}, ${b('fbm')}]. Probabilidad media de presión en precios en fontanería residencial y en Ferguson Home, menos en agua, industrial y grandes proyectos. Segunda: venta directa de los fabricantes de climatización a grandes contratistas (baja). Tercera: un ciclo inmobiliario largo que frene la reforma (media).`,
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: `Los asuntos que mueven cifras son: (1) la seguridad vial y laboral de una flota de unos 6.200 vehículos y 35.000 empleados en almacenes [${b('kt')}]; (2) la eficiencia del agua y de la climatización, que es parte del negocio (productos de bajo consumo, refrigerantes nuevos) y empuja el precio medio; (3) la gobernanza de proveedores (37.000, con marca propia importada) por aranceles y responsabilidad de producto [${b('kt')}].`,
    controversias: `Sin litigios ni sanciones materiales: la empresa declara solo procedimientos ordinarios (producto, contratos, laborales, amianto) sin efecto material esperado [${b('kt')}].`,
    confianza: 'Media',
  },
  fuentes: fuentes(ordB.map((k) => SB[k])),
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-KT: «fragmentado», sin cuota de los cinco primeros; 2) Census y asociaciones (ASA, HARDI): sin cuotas públicas; 3) cálculo con cotizadas: faltan los privados (Hajoca, Winsupply, Consolidated Supply)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de la empresa: no da calificaciones de terceros; 2) MSCI y Sustainalytics: de pago o bloqueados; 3) prensa: sin cifras verificables', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ───────────────────────────── C · Directivos y gobierno ─────────────────────────────
const SC = {
  proxy: { titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración del periodo de transición, voto consultivo, participaciones', editor: 'Ferguson Enterprises / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-16', url: `${E}/000201164126000016/ferg-20260315.htm` },
  f4: { titulo: 'Form 4 de directivos y consejeros presentados entre el 18-oct-2025 y el 16-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002011641&type=4' },
  kt: SA.kt,
  pr24: SA.pr24,
  pr25: SA.pr25,
  prcy: SA.prcy,
  pr2: SA.pr2,
};
const ordC = Object.keys(SC); const c = (k) => ordC.indexOf(k) + 1;
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Kevin Murphy', cargo: 'Presidente ejecutivo de operaciones (President) y consejero delegado', desde: '2019', participacion_pct: 0.08, trayectoria: `En Ferguson desde 1999; dirigió la filial estadounidense desde 2017 y el grupo desde noviembre de 2019 [${c('kt')}]. Con él vendió el Reino Unido, trasladó la cotización y la sede a EE. UU. y llevó las ventas de 19.940 M (FY2020) a 31.316 M (2025) [${c('prcy')}].` },
      { nombre: 'Bill Brundage', cargo: 'Director financiero y consejero', desde: '2020', participacion_pct: 0.02, trayectoria: `Director financiero de la filial estadounidense desde 2017 y del grupo desde noviembre de 2020; en la empresa desde 2008 [${c('kt')}].` },
      { nombre: 'Geoff Drabble', cargo: 'Presidente del consejo (independiente)', desde: '2019', participacion_pct: 0.0, trayectoria: `Ex consejero delegado de Ashtead (alquiler de maquinaria), consejero desde mayo de 2019 y presidente desde noviembre de 2019 [${c('proxy')}].` },
      { nombre: 'Bill Thees', cargo: 'Director de operaciones', desde: '2025', participacion_pct: 0.02, trayectoria: `En la empresa desde 1990; dirigió el negocio de agua y saneamiento, hoy el mayor grupo de clientes (24 % de las ventas) [${c('kt')}].` },
      { nombre: 'Jake Schlicher', cargo: 'Director de estrategia', desde: '2025', participacion_pct: 0.01, trayectoria: `Entró en 1999 con la compra de L&H Supply; dirigió marca propia y negocio comercial [${c('kt')}].` },
      { nombre: 'Bo Camposano', cargo: 'Vicepresidente sénior de agua y saneamiento', desde: '2024', participacion_pct: 0.0, trayectoria: `En la empresa desde 1996; vicepresidente de agua y saneamiento de 2019 a 2024 [${c('kt')}].` },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: `Ventas: crecimiento de un dígito bajo; margen operativo ajustado 9,0-9,5 %; capex 400-450 M [${c('pr24')}]`, real: `Ventas +3,8 %; margen ajustado 9,2 %; capex 305 M [${c('pr25')}]`, cumplida: 'Sí' },
      { anio: '2025 (año natural)', guia: `Ventas: crecimiento de un dígito medio; margen ajustado 9,2-9,6 % [${c('pr25')}]`, real: `Ventas +5,0 %; margen ajustado 9,6 % [${c('prcy')}]`, cumplida: 'Sí' },
      { anio: '2026', guia: `Febrero: ventas de un dígito bajo a medio y margen ajustado 9,4-9,8 %; agosto: un dígito medio y 9,5-9,8 % [${c('prcy')}, ${c('pr2')}]`, real: `En curso: primer semestre +4,2 % y margen ajustado 9,7 % [${c('pr2')}]`, cumplida: 'Parcial' },
    ],
    comentario: `Equipo muy estable y de la casa: el consejero delegado, el director financiero y el de operaciones llevan 20-35 años en la empresa [${c('kt')}]. Ha cumplido las tres guías anuales recientes, con revisiones al alza en 2026 [${c('pr2')}]. La dirección tiene poco capital (148.740 acciones el consejero delegado, ≈ 34 M USD) [${c('proxy')}] y en octubre de 2026 vendió acciones dentro de planes 10b5-1 tras la consolidación de incentivos [${c('f4')}]. Sucesión: el banquillo de vicepresidentes sénior por grupo de clientes es amplio; el cambio de responsables de relación con inversores en 2026 fue por jubilación anunciada [${c('prcy')}].`,
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Geoff Drabble', cargo: 'Presidente', tipo: 'Independiente', desde: '2019', comisiones: null },
      { nombre: 'Kevin Murphy', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2017', comisiones: null },
      { nombre: 'Bill Brundage', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Rekha Agrawal', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Kelly Baker', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'Rick Beckwitt', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: null },
      { nombre: 'Cathy Halligan', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: null },
      { nombre: 'Brian May', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: null },
      { nombre: 'James S. Metcalf', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Alan Murray', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: null },
      { nombre: 'Suzanne Wood', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 14.14, fijo: 1.46, variable_corto: 2.63, variable_largo: 9.74, ratio_salario_medio: 239 },
    remuneracion: `El consejero delegado cobró 14,14 M USD en FY2025 (1,46 M de fijo, 2,63 M de variable anual y 9,74 M en acciones y opciones a valor de concesión) y 7,66 M en los cinco meses de transición [${c('proxy')}]. El variable anual se mide con el beneficio operativo ajustado (solo esa métrica en el periodo de transición); el de largo plazo, con acciones por objetivos de tres años, opciones y acciones restringidas [${c('proxy')}]. La relación con el empleado mediano fue de 239 a 1 en el periodo de transición [${c('proxy')}]. El voto consultivo de 2025 sobre la remuneración de FY2025 salió con ≈ 91 % a favor [${c('proxy')}]. La subida de 2024 a 2025 (9,05 M a 14,14 M) se explica por el aumento del incentivo a largo plazo tras el traslado a EE. UU. para acercarse a la mediana de su grupo de comparación estadounidense [${c('proxy')}].`,
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 10.08, tipo: 'Institucional (índices)', variacion: `13G/A del 5-mar-2026 [${c('proxy')}]` },
      { nombre: 'BlackRock', pct: 5.45, tipo: 'Institucional', variacion: `13G del 17-jul-2025 [${c('proxy')}]` },
      { nombre: 'Consejeros y directivos (17 personas)', pct: 0.15, tipo: 'Directivos', variacion: `292.197 acciones [${c('proxy')}]` },
    ],
    insiders: [
      { fecha: '2026-10-12', persona: 'Kevin Murphy (consejero delegado)', operacion: 'Venta', acciones: 13720, importe: 2.99 },
      { fecha: '2026-10-12', persona: 'Bill Brundage (director financiero)', operacion: 'Venta', acciones: 5986, importe: 1.31 },
      { fecha: '2026-10-15', persona: 'Jake Schlicher (director de estrategia; desde 28-ago-2026)', operacion: 'Venta', acciones: 8846, importe: 2.0 },
      { fecha: '2026-10-15', persona: 'Bill Thees (director de operaciones)', operacion: 'Venta', acciones: 4080, importe: 0.9 },
      { fecha: '2026-10-15', persona: 'Ian Graham, Bo Camposano y Allison Stirrup', operacion: 'Venta', acciones: 5079, importe: 1.12 },
    ],
    control_y_defensas: `Sin accionista de control: el mayor es Vanguard con el 10,1 %, como gestor de índices [${c('proxy')}]. Una sola clase de acciones con un voto. Presidente independiente separado del consejero delegado; nueve de los once consejeros son independientes [${c('proxy')}]. La política de operaciones vinculadas exige aprobación previa y no hay operaciones relevantes [${c('proxy')}]. Al domiciliarse en Delaware en 2024 adoptó estatutos estadounidenses; no hemos encontrado píldora venenosa ni consejo escalonado en el proxy.`,
    alertas: [`Ventas de directivos por ≈ 8,3 M USD en octubre de 2026 (86 % dentro de planes 10b5-1), sin ninguna compra en mercado en doce meses [${c('f4')}]`],
    confianza: 'Alta',
  },
  fuentes: fuentes(ordC.map((k) => SC[k])),
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_contra_pct y comisiones', tipo: 'Complemento', intentos: '1) Proxy 2026: solo el ≈ 91 % a favor; 2) 8-K de la junta (punto 5.07) no leído por tiempo; 3) composición de comisiones: el texto extraído del proxy no la asigna por consejero', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ───────────────────────────── D · Mercado y valoración ─────────────────────────────
const SD = {
  bolsa: { titulo: 'Históricos diarios de FERG, SPY y XLI (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/FERG/history' },
  yfe: { titulo: 'Ferguson: estimaciones de consenso (earningsTrend: BPA ajustado 2026e 11,45 y 2027e 12,73; ventas 33.095 y 35.556 M), recomendaciones y precios objetivo', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://finance.yahoo.com/quote/FERG/analysis' },
  tes: { titulo: 'Daily Treasury Par Yield Curve Rates: 10 años al 5,09 % el 16-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  dam: { titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Damodaran Online (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  saf: { titulo: 'Ferguson Enterprises (FERG) Statistics: valor empresa, posiciones cortas 3,65 % del flotante', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/ferg/statistics/' },
  sap: { titulo: 'Estadísticas de Watsco, Core & Main, WESCO, Pool y SiteOne a 16-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://stockanalysis.com/stocks/cnm/statistics/' },
  yfp: { titulo: 'Comparables: precio, capitalización, EV/EBITDA y consenso de BPA y ventas de WSO, CNM, GWW, FAST, WCC, POOL, SITE y AIT', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-18', url: 'https://finance.yahoo.com/quote/WSO/analysis' },
  ficha: SB.ficha,
  flo: SA.flo,
  fbm: SB.fbm,
  srs: SB.srs,
  sarss: { titulo: 'Titulares de Ferguson (entrada en el S&P 500 el 31-jul-2026, RBC prudente con los productos de construcción el 7-oct-2026, resultados, bonos)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://seekingalpha.com/api/sa/combined/FERG.xml' },
  pr2: SA.pr2,
  f4: SC.f4,
  prcy: SA.prcy,
  pr1: SA.pr1,
};
const ordD = Object.keys(SD); const d = (k) => ordD.indexOf(k) + 1;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Ferguson Enterprises Inc.', nombre_corto: 'Ferguson', ticker: 'FERG', isin: 'US31488V1070', mercado: 'Bolsa de Nueva York (NYSE)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Distribuidores de comercio', sede: 'Newport News (Virginia)', fundacion: '1887', empleados: 35000, web: 'corporate.ferguson.com',
    precio: 231.61, fecha_precio: '2026-10-16', acciones: 193.8, capitalizacion_publicada: 44806, free_float_pct: 99.8,
    max_52s: 271.64, min_52s: 212.13, volumen_medio_diario: '≈ 555 M USD/día (3 meses)', proximos_resultados: '2026-11-09',
  },
  consenso: {
    guidance: `Guía del año natural 2026, elevada el 10-ago-2026 y sin FloWorks: ventas con crecimiento de un dígito medio (antes, de un dígito bajo a medio), margen operativo ajustado del 9,5-9,8 % (antes 9,4-9,8 %), gasto por intereses de unos 200 M, capex de 375-425 M y tipo impositivo ajustado del 26 % [${d('pr2')}]. FloWorks (≈ 1.000 M de ventas anuales) consolida desde el 31-ago-2026 [${d('flo')}]. En febrero de 2026 la dirección presentó un marco a medio plazo que la prensa resume como camino hacia 40.000 M de ventas y más del 10 % de margen, sin fecha publicada en los documentos revisados [${d('sarss')}].`,
    estimaciones: [
      { periodo: '2026e', ingresos: 33095, ebitda: null, ebit: null, bpa: 11.45, dpa: null, fuente: `Yahoo Finance, 13 analistas (BPA ajustado) [${d('yfe')}]` },
      { periodo: '2027e', ingresos: 35556, ebitda: null, ebit: null, bpa: 12.73, dpa: null, fuente: `Yahoo Finance, 14 analistas (BPA ajustado) [${d('yfe')}]` },
    ],
    recomendaciones: { n_analistas: 24, comprar: 15, mantener: 9, vender: 0, po_medio: 283.23, po_min: 235, po_max: 325 },
    revisiones: `El BPA ajustado de consenso para 2026 ha subido de 11,26 a 11,45 USD en 90 días y el de 2027 de 12,55 a 12,73 (+1,4 %), tras la guía elevada y la compra de FloWorks [${d('yfe')}]. El precio objetivo medio (283,23 USD, 22 analistas) está un 22 % por encima del precio; en agosto BofA lo bajó de 325 a 315 y Deutsche Bank lo subió de 256 a 261, según comentarios de mercado [${d('yfe')}]. El consenso es del BPA **ajustado** (sin amortización de intangibles comprados ni ajustes fiscales discretos): unos 0,5-0,8 USD por encima del publicado. Solo una fuente gratuita con estimaciones completas; los precios objetivo se contrastan con Stock Analysis [${d('saf')}].`,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.25,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'total (con dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: 5.6, indice_pct: 12.8, sector_pct: 9.0 },
      { periodo: '1 año', accion_pct: -0.2, indice_pct: 16.8, sector_pct: 11.9 },
      { periodo: '3 años (anual.)', accion_pct: 14.0, indice_pct: 22.0, sector_pct: 19.4 },
      { periodo: '5 años (anual.)', accion_pct: 12.0, indice_pct: 12.8, sector_pct: 11.9 },
      { periodo: '10 años (anual.)', accion_pct: 17.5, indice_pct: 15.4, sector_pct: 13.3 },
    ],
    anual: [
      { anio: '2019', accion_pct: 49.6, indice_pct: 31.2 }, { anio: '2020', accion_pct: 31.9, indice_pct: 18.3 }, { anio: '2021', accion_pct: 56.4, indice_pct: 28.7 },
      { anio: '2022', accion_pct: -27.2, indice_pct: -18.2 }, { anio: '2023', accion_pct: 55.1, indice_pct: 26.2 }, { anio: '2024', accion_pct: -8.6, indice_pct: 24.9 }, { anio: '2025', accion_pct: 29.9, indice_pct: 17.7 },
    ],
    beta: 1.12, volatilidad_pct: 29.9, max_drawdown_pct: -43.3, posicion_corta_pct: 3.65,
    comentario: `A diez años la acción ha batido al S&P 500 (17,5 % anual frente a 15,4 %), pero en el último año se ha quedado atrás (−0,2 % frente a +16,8 %) [${d('bolsa')}]. La historia es de ciclo de vivienda y tipos: −27,2 % en 2022 con la subida de tipos, +55,1 % en 2023 y −8,6 % en 2024, cuando las ventas se quedaron planas con deflación [${d('bolsa')}, ${d('prcy')}]. En 2026 ha ido de 263,66 USD (12-feb) a 212,13 (21-sep) pese a cumplir y subir la guía: el mercado descuenta un residencial débil más largo y una normalización de los grandes proyectos. La entrada en el S&P 500 (anuncio el 31-jul) dio un +8 % que se deshizo en seis semanas [${d('sarss')}, ${d('bolsa')}]. Datos en USD del cierre del 16-oct-2026.`,
    contexto: {
      movimiento: { fecha: '2026-10-16', var_1m_pct: 8.1, var_3m_pct: 1.1, var_6m_pct: -11.1, var_12m_pct: -4.0, dist_max_52s_pct: -13.5, dist_min_52s_pct: 8.1, dist_max_historico_pct: -13.5, tendencia: 'bajista', volatilidad_60d_pct: 29, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'dic-2025', var_pct: -8.0, causa: `Caída del 8,0 % el 9-dic-2025, día de los resultados del trimestre ago-oct 2025 y del anuncio de la guía del año natural; el mercado leyó con decepción la debilidad residencial [${d('sarss')}, ${d('bolsa')}]`, veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-mar 2026', var_pct: -17.5, causa: `De 263,66 USD (12-feb) a 217,56 (20-mar), con −5,1 % el 12-mar; tras unos resultados de 2025 que batieron, la guía 2026 «apagada» y el residencial débil pesaron; no hemos encontrado una noticia propia del 12-mar [${d('sarss')}, ${d('bolsa')}]`, veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr 2026', var_pct: 21.0, causa: `Rebote hasta 263,42 USD (20-abr) con el mercado y antes de los resultados del 1T26 [${d('bolsa')}]`, veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -16.2, causa: `Tras los resultados del 1T26 (5-may: batió en BPA, guía mantenida con «mercados en general planos») cayó a 223,82 USD a mediados de mayo [${d('pr1')}, ${d('sarss')}, ${d('bolsa')}]`, veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-sep 2026', var_pct: -18.7, causa: `+8 % el 3-ago por la entrada en el S&P 500 y máximo de 263,78 USD el 10-ago con resultados y guía elevada; después, caída hasta 214,35 (16-sep) con la emisión de 1.200 M en bonos para FloWorks y la vuelta de la prudencia sobre la vivienda [${d('sarss')}, ${d('pr2')}, ${d('bolsa')}]`, veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-07-13', tipo: 'fusión u oferta', hecho: `Compra de FloWorks por 1.600 M USD (≈ 10 veces el EBITDA con sinergias), cerrada el 31-ago-2026 [${d('flo')}]`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-31', tipo: 'rumor', hecho: `S&P Dow Jones anuncia la entrada de Ferguson en el S&P 500 desde el 5-ago-2026 [${d('sarss')}]`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-14', tipo: 'ampliación o convertible', hecho: `Emisión de bonos por 1.200 M USD (4,80 % a 2029 y 5,60 % a 2036); no hay ampliación de capital [${d('pr2')}]`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: `RBC se vuelve prudente con los productos de construcción porque se aleja la recuperación de la vivienda [${d('sarss')}]`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'directivos', hecho: `Ventas de siete directivos por ≈ 8,3 M USD en 12-15 de octubre, el 86 % con planes 10b5-1 y tras la consolidación anual de acciones; ninguna compra en 12 meses [${d('f4')}]`, veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-09', tipo: 'resultados', hecho: `Resultados del 3T26 el 9-nov-2026, primeros con FloWorks (fecha confirmada, no estimada, en Yahoo calendarEvents) [${d('yfe')}]`, veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-09',
      veredicto: 'no cambia',
      condicion: null,
      comentario: `La acción cotiza un 13,5 % por debajo de su máximo de 52 semanas y por debajo de su media de 200 sesiones (tendencia bajista) pese a haber subido la guía: el movimiento es de sector (vivienda y tipos al 5,09 %) y no de la empresa [${d('bolsa')}, ${d('tes')}]. No hay colocaciones, ampliaciones, litigios ni ofertas pendientes. Las ventas de directivos son pequeñas frente a su participación y programadas. Los resultados del 9-nov no aplazan nada (regla 11). Veredicto: no cambia.`,
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 140.05, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 126.08, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 161.62, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 173.57, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 222.63, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: `Precios de cierre de cada ejercicio de la serie: 30 de julio de 2021, 29 de julio de 2022 y 31 de julio de 2023 (cierres de los ejercicios a julio) y 31 de diciembre de 2024 y 2025 (años naturales) [${d('bolsa')}]. Antes de 2021 la acción cotizaba sobre todo en Londres; la serie de Yahoo de FERG la cubre en USD.`,
    confianza: 'Media',
  },
  comparables: {
    criterio: `Distribuidores estadounidenses de producto técnico para profesionales con red de sucursales: los de construcción y agua (Core & Main, Watsco, SiteOne, Pool), los grandes de material eléctrico (WESCO) y los de suministros industriales (Grainger, Fastenal, Applied Industrial). Fuera Home Depot y Lowe's, minoristas con distribución a profesionales dentro, y los europeos (otro ciclo).`,
    empresas: [
      { nombre: 'Watsco', ticker: 'WSO', pais: 'US', capitalizacion: 11420, ev_ventas: 1.58, ev_ebitda_ltm: 16.4, ev_ebitda_ntm: null, per_ntm: 22.7, crecimiento_pct: 6.4, margen_ebitda_pct: 9.6, roic_pct: 15.7, dn_ebitda: 0.1, fcf_yield_pct: 6.1 },
      { nombre: 'Core & Main', ticker: 'CNM', pais: 'US', capitalizacion: 8000, ev_ventas: 1.36, ev_ebitda_ltm: 11.2, ev_ebitda_ntm: null, per_ntm: 12.3, crecimiento_pct: 3.6, margen_ebitda_pct: 12.2, roic_pct: 12.7, dn_ebitda: 2.6, fcf_yield_pct: 7.9 },
      { nombre: 'WESCO International', ticker: 'WCC', pais: 'US', capitalizacion: 16610, ev_ventas: 0.90, ev_ebitda_ltm: 14.2, ev_ebitda_ntm: null, per_ntm: 17.5, crecimiento_pct: 7.5, margen_ebitda_pct: 6.4, roic_pct: 9.8, dn_ebitda: 3.7, fcf_yield_pct: 0.9 },
      { nombre: 'Pool Corp', ticker: 'POOL', pais: 'US', capitalizacion: 6270, ev_ventas: 1.47, ev_ebitda_ltm: 12.3, ev_ebitda_ntm: null, per_ntm: 14.9, crecimiento_pct: 2.6, margen_ebitda_pct: 11.9, roic_pct: 15.9, dn_ebitda: 2.6, fcf_yield_pct: 4.8 },
      { nombre: 'SiteOne Landscape Supply', ticker: 'SITE', pais: 'US', capitalizacion: 4140, ev_ventas: 1.09, ev_ebitda_ltm: 13.4, ev_ebitda_ntm: null, per_ntm: 19.7, crecimiento_pct: 4.0, margen_ebitda_pct: 8.1, roic_pct: 7.2, dn_ebitda: 2.7, fcf_yield_pct: 6.3 },
      { nombre: 'W.W. Grainger', ticker: 'GWW', pais: 'US', capitalizacion: 62677, ev_ventas: 3.46, ev_ebitda_ltm: 20.3, ev_ebitda_ntm: null, per_ntm: 26.5, crecimiento_pct: 7.6, margen_ebitda_pct: 17.1, roic_pct: 33.2, dn_ebitda: 0.6, fcf_yield_pct: 2.0 },
      { nombre: 'Fastenal', ticker: 'FAST', pais: 'US', capitalizacion: 58545, ev_ventas: 6.47, ev_ebitda_ltm: 28.8, ev_ebitda_ntm: null, per_ntm: 37.1, crecimiento_pct: 7.8, margen_ebitda_pct: 22.5, roic_pct: 32.6, dn_ebitda: 0.1, fcf_yield_pct: 1.6 },
      { nombre: 'Applied Industrial Technologies', ticker: 'AIT', pais: 'US', capitalizacion: 12140, ev_ventas: 2.51, ev_ebitda_ltm: 20.3, ev_ebitda_ntm: null, per_ntm: 26.7, crecimiento_pct: 5.8, margen_ebitda_pct: 12.4, roic_pct: 19.6, dn_ebitda: 0.6, fcf_yield_pct: 3.0 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'FloWorks (válvulas y control de fluidos industrial)', comprador: 'Ferguson', ev: 1600, ev_ventas: 1.6, ev_ebitda: 10.0, prima_pct: null, excluir: false, comentario: `≈ 10 veces el EBITDA ajustado de doce meses incluidas 45 M de sinergias; vendedor Wynnchurch Capital [${d('flo')}]` },
      { fecha: '2025-08', objetivo: 'Foundation Building Materials (materiales de interior)', comprador: 'Lowe\'s', ev: 8800, ev_ventas: 1.35, ev_ebitda: 13.4, prima_pct: null, excluir: false, comentario: `6.500 M de ventas y 635 M de EBITDA ajustado 2024 proforma [${d('fbm')}]` },
      { fecha: '2024-03', objetivo: 'SRS Distribution (tejados, piscinas, paisajismo)', comprador: 'Home Depot', ev: 18250, ev_ventas: 1.83, ev_ebitda: 16.1, prima_pct: null, excluir: false, comentario: `≈ 10.000 M de ventas y ≈ 1.100 M de EBITDA ajustado 2023 [${d('srs')}]` },
    ],
    confianza: 'Media',
  },
  fuentes: fuentes(ordD.map((k) => SD[k])),
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA de consenso y segunda fuente de estimaciones', tipo: 'Complemento', intentos: '1) MarketScreener: la ficha de FERG no abre (redirige a otro valor); 2) Stock Analysis y Investing: sin EBITDA estimado gratuito; 3) Yahoo: solo ventas y BPA', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'más operaciones con múltiplo', tipo: 'Complemento', intentos: '1) GMS-Home Depot (5.500 M de valor empresa): sin múltiplo publicado; 2) QXO-Beacon: sin documento primario leído; 3) compras de Core & Main y Watsco: sin múltiplos publicados', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ───────────────────────────── E · Sentimiento ─────────────────────────────
const SE = {
  st: { titulo: 'Stocktwits: últimos 30 mensajes sobre $FERG (ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-04', url: 'https://api.stocktwits.com/api/2/streams/symbol/FERG.json' },
  sa: { titulo: 'Seeking Alpha: artículos de análisis de lectores-autores sobre Ferguson («Attractive Model But A Muted Macro Environment», «Capitalizing On The Infrastructure Supercycle While We Wait For Housing», «Delivers Another Solid Quarter, Despite A Muted Macro»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-08-10', url: 'https://seekingalpha.com/symbol/FERG/analysis' },
};
const ordE = Object.keys(SE); const e = (k) => ordE.indexOf(k) + 1;
const Ejson = {
  _estado: 'parcial',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: `Euforia en agosto por la entrada en el S&P 500 («posicionándose para la inclusión») y decepción en septiembre: mínimos de 52 semanas y quien compró a 260 USD por una recomendación televisiva se arrepiente [${e('st')}].` },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-08', n_comentarios: 4, tono: 'Positivo', resumen: `Tesis repetida: buen modelo y cuota ganada, pero «macro apagada» y espera a la vivienda; los grandes proyectos y el agua como soporte [${e('sa')}].` },
    ],
    temas: [
      { tema: 'Vivienda débil y tipos altos', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: residencial −2 % en el 4T25 y +2 % en el 2T26 con mercado a la baja; es la mitad de las ventas.' },
      { tema: 'Grandes proyectos y centros de datos', postura: 'Alcista', peso: 'Medio', contraste: 'No residencial +8-11 % en los últimos trimestres; FloWorks aumenta la exposición. El riesgo es que el ciclo de inversión en centros de datos se frene.' },
      { tema: 'Efecto S&P 500', postura: 'Dividida', peso: 'Medio', contraste: 'La subida del 3-ago (+8 %) se deshizo en seis semanas; no cambia el valor.' },
    ],
    lectura: `El inversor particular está cansado: tras la euforia de la inclusión en el S&P 500 la acción tocó mínimos y el tema dominante es la vivienda. No contradice a los analistas (15 de 24 recomiendan comprar), pero sí muestra que el mercado no premia la guía elevada mientras la vivienda no gire. No señala ningún riesgo que el informe no recoja. Sentimiento leído en dos plataformas: confianza baja.`,
    confianza: 'Baja',
  },
  fuentes: fuentes(ordE.map((k) => SE[k])),
  huecos: [
    { seccion: 'sentimiento', campo: 'más foros (Reddit, comentarios de prensa)', tipo: 'Complemento', intentos: '1) Reddit: 403 desde la nube; 2) comentarios de Seeking Alpha: requieren registro; 3) Motley Fool y MarketBeat: sin debate de lectores sobre FERG en tres meses', decision: 'Omitido' },
  ],
};
guarda('E', Ejson);
console.log('Notas A-E escritas');
