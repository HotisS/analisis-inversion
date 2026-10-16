// Escribe las notas A-E de Midea Group (línea H 0300.HK; corte 2026-10-16) a partir de los documentos de notas/docs
// (informe anual 2025, anuncio de resultados 2025 y 2024, informe semestral 2026 y 2025, folleto de la salida a bolsa H
// de 2024 con las cuentas NIIF 2021-2023, informes trimestrales en normas chinas, anuncios de HKEXnews), de Yahoo Finance
// (bolsa, consenso y comparables), MarketScreener (consenso a 3 años) y fuentes sectoriales.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/midea-2026-10-16/notas/construir-notas.mjs
// Ejercicio natural (cierre a 31-dic). Cifras en millones de RMB (CNY) salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const man = JSON.parse(fs.readFileSync(path.join(dir, 'docs', '_manifest.json'), 'utf8'));
const u = (k) => (typeof man[k] === 'string' ? man[k] : man[k].url);
const bolsaH = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
const TC = 0.8515; // RMB por HKD, 16-oct-2026 (Yahoo HKDCNY=X)

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (NIIF): estados financieros, notas de inmovilizado, intangibles y fondo de comercio, otros ingresos, flujos, remuneraciones', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: u('ar2025') },
  { id: 2, titulo: 'Annual Results Announcement for the year ended 31 December 2025 (cuenta, balance, segmentos, deuda, BPA)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-03-30', url: u('res2025') },
  { id: 3, titulo: 'Interim Results Announcement / Interim Report for the six months ended 30 June 2026 (cuenta, balance, flujos, negocio, recompras, convertibles)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-08-28', url: u('int2026') },
  { id: 4, titulo: 'Annual Results Announcement for the year ended 31 December 2024 (ingresos por negocio 2023-2024)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2025-03-28', url: u('res2024') },
  { id: 5, titulo: 'Global Offering (folleto de la salida a bolsa H), Apéndice I: informe de los contables con las cuentas NIIF de 2021, 2022 y 2023', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2024-09-09', url: u('folleto2024') },
  { id: 6, titulo: 'Interim Results Announcement for the six months ended 30 June 2025 (comparativo del 1S24)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2025-08-29', url: u('int2025') },
  { id: 7, titulo: 'First Quarterly Report of 2026 (normas contables chinas)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-29', url: u('q1_2026') },
  { id: 8, titulo: 'Proposed issue of HK$8.624 bn zero coupon guaranteed convertible bonds due 2027 and HK$8.624 bn due 2033', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-05-07', url: u('cb_emision') },
  { id: 9, titulo: 'Adjustment to the conversion price of the convertible bonds due 2027 and 2033 (91,82 y 109,78 HKD)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-07-08', url: u('cb_ajuste') },
  { id: 10, titulo: 'Proposed Distribution of Interim Dividend for the six months ended 30 June 2026 (Updated): 5 RMB por 10 acciones, ex-dividendo 6-nov-2026', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-10-13', url: u('div_int2026') },
  { id: 11, titulo: 'Proposed Distribution of Final Dividend for the year ended 31 December 2025 (Updated): 38 RMB por 10 acciones, ex-dividendo 18-jun-2026', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-05', url: u('div_final2025') },
];

// Cuenta NIIF. EBIT «limpio» = resultado operativo publicado − intereses cobrados de la tesorería (dentro de «otros ingresos»)
// − ganancias netas de instrumentos financieros − diferencias de cambio netas (dentro de «otras ganancias»). Esas partidas
// pasan al resultado financiero, porque la tesorería (≈ 330.000 M) se valora en el puente. EBITDA = EBIT limpio + amortizaciones.
const cuenta = [
  { periodo: '2021', ingresos: 343361, coste_ventas: 266451, gastos_generales: 39389, ebitda: 33322, amortizaciones: 6491, ebit: 26831, resultado_financiero: 6908, bai: 33739, impuestos: 4707, minoritarios: 444, beneficio_neto: 28587, gastos_financieros: 1300, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.14, dpa: 1.70, dpa_extraordinario: 0, acciones_diluidas: 6905 },
  { periodo: '2022', ingresos: 345709, coste_ventas: 262322, gastos_generales: 40739, ebitda: 37845, amortizaciones: 6505, ebit: 31340, resultado_financiero: 3618, bai: 34958, impuestos: 5146, minoritarios: 259, beneficio_neto: 29553, gastos_financieros: 1902, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.33, dpa: 2.50, dpa_extraordinario: 0, acciones_diluidas: 6825 },
  { periodo: '2023', ingresos: 373710, coste_ventas: 275320, gastos_generales: 48857, ebitda: 43858, amortizaciones: 7347, ebit: 36511, resultado_financiero: 3768, bai: 40279, impuestos: 6532, minoritarios: 25, beneficio_neto: 33722, gastos_financieros: 3373, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 4.92, dpa: 3.00, dpa_extraordinario: 0, acciones_diluidas: 6854 },
  { periodo: '2024', ingresos: 409084, coste_ventas: 301983, gastos_generales: 54157, ebitda: 48200, amortizaciones: 7821, ebit: 40379, resultado_financiero: 6313, bai: 46692, impuestos: 7933, minoritarios: 220, beneficio_neto: 38539, gastos_financieros: 1917, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.42, dpa: 3.50, dpa_extraordinario: 0, acciones_diluidas: 7113 },
  { periodo: '2025', ingresos: 458502, coste_ventas: 338462, gastos_generales: 59657, ebitda: 54162, amortizaciones: 9340, ebit: 44822, resultado_financiero: 8263, bai: 53085, impuestos: 8565, minoritarios: 575, beneficio_neto: 43945, gastos_financieros: 3001, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 5.76, dpa: 4.30, dpa_extraordinario: 0, acciones_diluidas: 7608 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 467223, ebitda: 56563, ebit: 46491, beneficio_neto: 44377, bpa: 5.85, dpa: 4.30, dpa_extraordinario: 0, fcf: 39400, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Compra de la división de climatización de Arbonia (cerrada el 26-feb-2025) y de Teka (2025): 6.089 M pagados netos de caja; el fondo de comercio sube de 29.581 a 34.257 M [1].' },
      { periodo: '2024', descripcion: 'Salida a bolsa H (17-sep-2024): 32.235 M de entrada de caja y 650,8 M de acciones nuevas; no cambia el perímetro operativo pero sí la caja y el BPA (acciones medias +3,4 %) [1, 2].' },
    ],
    comentario: 'Ingresos de 343.361 M en 2021 a 458.502 M en 2025 (7,5 % anual), con 2022 plano (+0,7 %: confinamientos y caída de la vivienda en China) y aceleración en 2024-2025 (+9,5 % y +12,1 %) por el exterior (+15,9 % en 2025, 195.948 M, el 42,7 % del total) y por los negocios para empresas (+17,5 %) [1, 2, 4, 5]. El margen bruto pasó del 22,4 % al 26,2 % (materias primas más baratas, mezcla de marca propia y climatización comercial) y el margen EBITDA limpio del 9,7 % al 11,8 %; el EBIT limpio, del 7,8 % al 9,8 %. El 1S26 frena: ventas +3,5 % (China +1,9 %, exterior +5,5 %), margen bruto −0,5 puntos por precios más bajos en China, materias primas y el yuan más fuerte, compensado con menos gasto comercial (8,3 % de las ventas, −0,9 puntos) [3]. El beneficio neto crece más que el EBIT por los intereses de una tesorería que pasó de 170.000 a 330.000 M.',
    ajustes: 'Cifras publicadas NIIF, con una sola reclasificación propia: los intereses cobrados por la tesorería (7.398 M en 2025, dentro de «otros ingresos»), las ganancias de instrumentos financieros (1.968 M) y las diferencias de cambio netas (555 M; −1.935 M en 2024) salen del EBIT y van al resultado financiero, porque esa tesorería se valora aparte en el puente; el beneficio neto y el BPA no cambian [1, 2, 5]. Las subvenciones (1.708 M en 2025) y la deducción adicional de IVA (1.034 M) se quedan en el EBIT porque son recurrentes desde hace años. En el 1S26 la cobertura de divisa da +6.799 M de ganancias de derivados frente a −5.886 M de diferencias de cambio: netas, 913 M [3]. El deterioro de asociadas de 2025 (367 M) está fuera del EBIT. Los trimestrales se publican en normas chinas (CAS) y no se mezclan con la serie NIIF [7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 218122, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 27816, margen_ebitda_pct: 12.8, bpa: 3.01, vs_consenso: null },
      { periodo: '2S24', ingresos: 190962, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 20384, margen_ebitda_pct: 10.7, bpa: 2.41, vs_consenso: null },
      { periodo: '1S25', ingresos: 252331, crecimiento_pct: 15.7, crecimiento_organico_pct: null, ebitda: 30244, margen_ebitda_pct: 12.0, bpa: 3.41, vs_consenso: null },
      { periodo: '2S25', ingresos: 206171, crecimiento_pct: 8.0, crecimiento_organico_pct: null, ebitda: 23918, margen_ebitda_pct: 11.6, bpa: 2.35, vs_consenso: null },
      { periodo: '1S26', ingresos: 261052, crecimiento_pct: 3.5, crecimiento_organico_pct: null, ebitda: 32645, margen_ebitda_pct: 12.5, bpa: 3.50, vs_consenso: null },
    ],
    ultima_presentacion: 'El informe del 1S26 (28-ago-2026) cambia el tono frente al anual de 2025 [1, 3]. En marzo la dirección hablaba de un año récord (ingresos +12,1 %, beneficio +14 %) y de más de 11.600 M recomprados; en agosto describe un mercado chino con «inmunidad» a las ayudas al recambio: las ventas minoristas de electrodomésticos en China cayeron un 9,9 % en el 1S26 y las de aire acondicionado un 15,9 % (datos de AVC), y la Tecnología Industrial (compresores y motores) cayó un 12,7 % por el frenazo del aire acondicionado doméstico [3]. Lo que defiende: marca propia en el exterior (más del 50 % de las ventas de hogar fuera de China; EE. UU. +24 %; Teka +20 %), Tecnología de Edificios +10,8 % con centros de datos y refrigeración líquida (fábrica de más de 1.000 M en Shunde para 2027) y KUKA +10,3 % con KUKA China como segundo vendedor de robots en China [3]. El 1T26 en normas chinas ya avisaba: ingresos +2,55 % y beneficio recurrente −14,0 %, sostenido por 1.713 M de partidas no recurrentes [7]. No hay transcripción pública en inglés de las conferencias; las preguntas de inversores registradas en 2025 se centraron en aranceles de EE. UU., cobre y ventas del 3T [1].',
    confianza: 'Media',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 387939, activo_corriente: 248865, pasivo_corriente: 222851, pasivo_total: 253119, fondo_comercio: 27875, intangibles: 9199, inmovilizado_material: 25996, existencias: 45924, clientes: 39695, proveedores: 98736, activos_contrato: 3823, pasivos_contrato: 23917, caja: 71876, deuda_financiera: 53382, arrendamientos: 2394, patrimonio_neto: 124865, minoritarios: 9955, reservas: 102979 },
      { periodo: '2022', activo_total: 422551, activo_corriente: 261099, pasivo_corriente: 206342, pasivo_total: 270630, fondo_comercio: 28549, intangibles: 8758, inmovilizado_material: 30516, existencias: 46045, clientes: 46523, proveedores: 89806, activos_contrato: 4499, pasivos_contrato: 27960, caja: 55270, deuda_financiera: 65268, arrendamientos: 2500, patrimonio_neto: 142932, minoritarios: 8989, reservas: 119676 },
      { periodo: '2023', activo_total: 486036, activo_corriente: 281321, pasivo_corriente: 251246, pasivo_total: 311738, fondo_comercio: 30858, intangibles: 10003, inmovilizado_material: 36383, existencias: 47339, clientes: 51737, proveedores: 94238, activos_contrato: 4046, pasivos_contrato: 41765, caja: 81674, deuda_financiera: 71467, arrendamientos: 3214, patrimonio_neto: 162877, minoritarios: 11421, reservas: 136282 },
      { periodo: '2024', activo_total: 604352, activo_corriente: 389064, pasivo_corriente: 351820, pasivo_total: 376684, fondo_comercio: 29581, intangibles: 8981, inmovilizado_material: 39629, existencias: 63339, clientes: 60164, proveedores: 118774, activos_contrato: 3500, pasivos_contrato: 49255, caja: 140411, deuda_financiera: 83308, arrendamientos: 2947, patrimonio_neto: 216750, minoritarios: 10917, reservas: 153591 },
      { periodo: '2025', activo_total: 608792, activo_corriente: 416662, pasivo_corriente: 343384, pasivo_total: 372368, fondo_comercio: 34257, intangibles: 13237, inmovilizado_material: 48931, existencias: 64629, clientes: 60632, proveedores: 130802, activos_contrato: 4269, pasivos_contrato: 46993, caja: 85247, deuda_financiera: 64185, arrendamientos: 3296, patrimonio_neto: 223221, minoritarios: 13203, reservas: 167228 },
    ],
    vencimientos: [
      { anio: '2026', importe: 48331 },
      { anio: '2027', importe: 6307 },
      { anio: '2028-2030', importe: 9422 },
      { anio: '2031+', importe: 125 },
    ],
    liquidez: 'Tesorería total de 328.842 M a 30-jun-2026: efectivo 74.614 M, depósitos a plazo y caja restringida 16.029 M, otros activos financieros a coste amortizado 227.742 M (depósitos estructurados y productos de bancos) y a valor razonable 10.456 M, frente a una deuda financiera de 80.327 M (58.244 M a corto) y 3.312 M de arrendamientos [3].',
    rating: 'S&P A / Moody\'s A2 / Fitch A (según el folleto de 2024) [5]',
    coste_deuda_pct: 3.4,
    vida_media_anios: null,
    otros_pasivos: 'Los grandes pasivos no financieros son de explotación: proveedores y efectos 157.036 M, anticipos de clientes 45.458 M y «otras cuentas a pagar y devengos» 115.219 M (descuentos a distribuidores, gastos comerciales y de instalación devengados, salarios) a 30-jun-2026 [3]. Financian el circulante y explican por qué la tesorería es tan grande: no se suman al puente porque se renuevan con la actividad, pero si las ventas cayeran fuerte parte de esa caja se iría con ellos. Convertibles en acciones H de cupón cero por 17.248 M HKD (≈ 14.690 M RMB) emitidos en mayo de 2026: la mitad vence en 2027 con conversión a 91,82 HKD (por debajo del precio de hoy, 93,95) y la otra mitad en 2033 a 109,78 HKD; la conversión total añadiría 172,5 M de acciones H (2,2 % del capital) [3, 8, 9]. Garantías a filiales aprobadas en la junta de 2026. Sin pensiones relevantes (plan de prestación definida pequeño en KUKA y Toshiba).',
    comentario: 'La deuda bruta bajó de 83.308 M en 2024 a 64.185 M en 2025 (se devolvieron 112.064 M y se pidieron 88.860 M) y subió a 80.327 M en junio de 2026 por los convertibles [1, 3]. La caja que usamos en la serie del balance es solo el efectivo y los depósitos a plazo (85.247 M en 2025); la tesorería total, que es la del puente, incluye además 211.000-228.000 M de depósitos y productos a más de tres meses, que la empresa mueve entre partidas de un año a otro (en 2024 eran depósitos a plazo; en 2025, activos a coste amortizado). El circulante comercial es negativo: existencias y clientes (129.530 M en 2025) menos proveedores y anticipos (177.795 M) dan −48.265 M, el −10,5 % de las ventas; los días de pago a proveedores superan a los de cobro e inventario juntos.',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 35449, capex: 6825, pagos_arrendamientos: 1315, adquisiciones: 2075, desinversiones: 226, dividendos: 11066, recompras: 13803, emision_acciones: 1482, intereses_en_financiacion: 1401 },
      { periodo: '2022', flujo_operativo: 34658, capex: 7352, pagos_arrendamientos: 1198, adquisiciones: 837, desinversiones: 228, dividendos: 11678, recompras: 2832, emision_acciones: 1398, intereses_en_financiacion: 1783 },
      { periodo: '2023', flujo_operativo: 57903, capex: 6314, pagos_arrendamientos: 1554, adquisiciones: 6, desinversiones: 388, dividendos: 17189, recompras: 258, emision_acciones: 2647, intereses_en_financiacion: 2122 },
      { periodo: '2024', flujo_operativo: 60512, capex: 7840, pagos_arrendamientos: 1442, adquisiciones: 0, desinversiones: 127, dividendos: 20780, recompras: 63, emision_acciones: 34675, intereses_en_financiacion: 1632 },
      { periodo: '2025', flujo_operativo: 53346, capex: 11142, pagos_arrendamientos: 1587, adquisiciones: 6105, desinversiones: 320, dividendos: 30487, recompras: 11699, emision_acciones: 2765, intereses_en_financiacion: 2044 },
    ],
    comentario: 'El flujo operativo acumulado de 2021-2025 (241.868 M) es 1,4 veces el beneficio neto (174.346 M), porque el circulante negativo crece con las ventas [1, 5]. 2023 y 2024 son altos (57.903 y 60.512 M) por anticipos de clientes y proveedores; 2025 baja a 53.346 M al cobrar menos anticipos (−2.262 M) y subir las existencias. Los intereses cobrados de la tesorería se clasifican en inversión (8.491 M en 2025) y no cuentan en nuestro flujo libre. El capex fue del 1,7-2,4 % de las ventas; en 2025 sube a 11.142 M (2,4 %) por fábricas en Tailandia, Arabia Saudí, Egipto y México y por Arbonia y Teka [1, 3]. La empresa no separa mantenimiento y crecimiento; estimación propia: el mantenimiento se parece a la amortización (2,0 % de las ventas) y el resto, unos 1.800 M en 2025, es crecimiento. Dividendos y recompras de 2025 (42.186 M) superaron al beneficio neto [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers (Hong Kong) y PricewaterhouseCoopers Zhong Tian LLP (normas chinas)',
    anios_auditor: null,
    opinion: 'Favorable (imagen fiel, sin salvedades) en 2025; revisión limitada sin reservas del 1S26 [1, 3]',
    comentario: 'Cuentas NIIF auditadas por PwC desde la salida a bolsa H y en normas chinas por PwC Zhong Tian; la empresa dice que no ha cambiado de auditor nacional en los tres últimos años (no da el año de inicio) [1]. Las cuestiones clave de auditoría de 2025 son el deterioro del fondo de comercio de KUKA y el reconocimiento de ingresos [1]. Tres puntos a vigilar: (1) la remuneración en acciones (1.245 M en 2023, según el folleto) es real y recurrente y está dentro del EBITDA [5]; (2) los resultados se apoyan en partidas fuera del negocio: intereses de 7.398 M, subvenciones de 1.708 M y deducción de IVA de 1.034 M en 2025 (el 19 % del beneficio antes de impuestos entre las tres) [1]; en el 1T26 el beneficio recurrente en normas chinas cayó un 14 % mientras el publicado subía un 2 % [7]; (3) los clientes envejecen: los de más de seis meses pasan de 2.774 M a 4.735 M en 2025 [2]. Altman, Piotroski y Beneish se leen en el cálculo; la tesorería enorme hace que el Altman salga alto por construcción.',
    senales: [
      { senal: 'Beneficio apoyado en partidas no operativas (intereses, subvenciones, IVA)', nivel: 'Media', comentario: '10.140 M de «otros ingresos» en 2025, el 19 % del beneficio antes de impuestos; los intereses bajan con los tipos chinos (−20 % en el 1S26) [1, 3].' },
      { senal: 'Beneficio recurrente del 1T26 en normas chinas −14 %', nivel: 'Media', comentario: 'Lo publicado (+2 %) lleva 1.713 M de ventas de activos y valor razonable [7].' },
      { senal: 'Clientes con más de seis meses casi se duplican en 2025', nivel: 'Baja', comentario: 'De 2.774 a 4.735 M sobre 42.170 M de clientes; provisión de 1.720 M [2].' },
      { senal: 'Fondo de comercio de KUKA, cuestión clave de auditoría', nivel: 'Baja', comentario: 'Fondo de comercio total de 34.257 M (15 % del patrimonio); KUKA crece en China pero sus márgenes son bajos [1, 3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Plan de retribución al accionista 2025-2027: dividendo en efectivo prioritario y recompras [1]. Dividendo de 4,30 RMB por acción en 2025 (0,5 a cuenta y 3,8 final; 32.364 M, el 74 % del beneficio), con 0,5 RMB a cuenta en 2026 (ex-dividendo el 6-nov-2026) [1, 10, 11]. Recompras: 11.699 M en 2025 y, en el 1S26, el plan de 1.500-3.000 M terminado (19,8 M de acciones) y 5.476 M del plan de 6.500-13.000 M (68,7 M de acciones a 75-86 RMB), cuyas acciones se amortizarán (cambio aprobado en la junta del 5-jun-2026) [3]. Desde 2013, 166.000 M en dividendos y 38.800 M en recompras [1].',
    adquisiciones: [
      { anio: '2025', objetivo: 'División de climatización de Arbonia (bombas de calor, radiadores; Europa)', importe: 5928, ev_ebitda: null, financiacion: 'Caja', resultado: '760 M EUR de valor empresa; integrada en MBT Climate como plataforma europea; Tecnología de Edificios +25,7 % en 2025 [1, 3].' },
      { anio: '2025', objetivo: 'Teka (cocina y baño; España)', importe: null, financiacion: 'Caja', ev_ebitda: null, resultado: 'Ventas de la marca +20 % en el 1S26 [3]; el importe no se publica por separado (6.089 M pagados entre las dos compras de 2025) [1].' },
      { anio: '2017', objetivo: 'KUKA (robots industriales; Alemania)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Ventas de Robótica y Automatización de 25.287 M (2021) a 31.011 M (2025); margen bruto del 21 %; el fondo de comercio de KUKA es cuestión clave de auditoría [1, 5].' },
      { anio: '2016', objetivo: 'Toshiba Lifestyle (80,1 %) y Clivet (Italia)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Toshiba pasó de pérdidas a beneficios y sus ventas en Japón crecen más del 10 % en el 1S26; Clivet aporta climatización comercial en Europa [3, 5].' },
    ],
    comentario: 'Asignación de capital sólida: de 2021 a 2025 el flujo operativo (241.868 M) cubrió el capex (39.473 M), las compras (9.023 M), los dividendos (91.200 M) y las recompras (28.655 M) y aun así la tesorería creció de 170.000 a 300.000 M, en parte por la salida a bolsa H (32.235 M) [1, 5]. La pega es que la caja crece más que su uso: rinde un 2-2,5 % en RMB, por debajo del coste de capital, y diluye el ROE. La salida a bolsa H y los convertibles de 2026 (17.248 M HKD, «para la expansión internacional») añadieron capital que no hacía falta [8]. Las compras recientes son de tamaño medio y en Europa (Arbonia, Teka), sin deterioros hasta hoy.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Hogar inteligente (Smart Home)', descripcion: 'Aire acondicionado doméstico, frigoríficos, lavadoras, cocina y pequeño electrodoméstico (Midea, Little Swan, Toshiba, Teka, Colmo, Comfee).', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 234918, resultado: null }, { periodo: '2022', ingresos: 232826, resultado: null }, { periodo: '2023', ingresos: 246351, resultado: null }, { periodo: '2024', ingresos: 269532, resultado: null }, { periodo: '2025', ingresos: 299927, resultado: null }] },
      { nombre: 'Comercial e industrial', descripcion: 'Tecnología de Edificios (climatización comercial, enfriadoras, VRF, ascensores, Clivet, Arbonia), Tecnología Industrial (compresores GMCC, motores Welling, componentes de vehículo eléctrico), Robótica y Automatización (KUKA, Swisslog) y otros (energía, médica, logística Annto).', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 73379, resultado: null }, { periodo: '2022', ingresos: 83639, resultado: null }, { periodo: '2023', ingresos: 97781, resultado: null }, { periodo: '2024', ingresos: 104496, resultado: null }, { periodo: '2025', ingresos: 122753, resultado: null }] },
      { nombre: 'Otros (materias primas y otros)', descripcion: 'Venta de materias primas a proveedores y otros ingresos de bajo margen.', tipo_resultado: null, historico: [{ periodo: '2021', ingresos: 35063, resultado: null }, { periodo: '2022', ingresos: 29244, resultado: null }, { periodo: '2023', ingresos: 29577, resultado: null }, { periodo: '2024', ingresos: 35056, resultado: null }, { periodo: '2025', ingresos: 35822, resultado: null }] },
    ],
    geografias: [{ nombre: 'China continental', peso_pct: 57.3 }, { nombre: 'Resto del mundo', peso_pct: 42.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas fuera de China (M RMB)', valor_anterior: '169.034 (2024)', valor_actual: '195.948 (2025)', variacion: '+15,9 %', comentario: '1S26: 113.127 M, +5,5 % [2, 3].' },
      { kpi: 'Marca propia en ventas de hogar fuera de China', valor_anterior: 'n.d.', valor_actual: '> 50 % (1S26)', variacion: 'n.d.', comentario: 'Estrategia «OBM primero»; EE. UU. +24 % en el 1S26 [3].' },
      { kpi: 'Margen bruto del grupo', valor_anterior: '26,2 % (2024)', valor_actual: '25,0 % (1S26)', variacion: '−0,5 puntos interanual', comentario: 'Precios en China, materias primas y yuan [3].' },
      { kpi: 'Ingresos de Tecnología de Edificios (M RMB)', valor_anterior: '28.470 (2024)', valor_actual: '35.791 (2025)', variacion: '+25,7 %', comentario: '1S26 +10,8 %; centros de datos y refrigeración líquida [1, 3].' },
      { kpi: 'Ingresos de Tecnología Industrial (M RMB)', valor_anterior: '15.053 (1S25)', valor_actual: '13.138 (1S26)', variacion: '−12,7 %', comentario: 'Compresores y motores para el aire acondicionado chino [3].' },
      { kpi: 'Empleados', valor_anterior: '≈ 190.000 (2025)', valor_actual: '198.050 (30-jun-2026)', variacion: '+4 %', comentario: '[1, 3]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'Resultado (EBIT) por negocio de 2021-2025', tipo: 'Complemento', intentos: '1) Nota de segmentos del anuncio de 2025: solo 2024-2025 con la segmentación nueva (Smart Home, Building Technology, Industrial Technology, Otros), distinta de la de ingresos por negocio; 2) folleto de 2024: margen bruto por negocio, no EBIT; 3) informe semestral 2026: margen bruto por negocio', decision: 'Omitido (se comenta el margen bruto en el texto)' },
    { seccion: 'trimestres', campo: 'Crecimiento interanual del 1S24 y 2S24 y comparación con el consenso de cada semestre', tipo: 'Complemento', intentos: '1) Informe semestral 2024 no descargado (la empresa cotiza en Hong Kong desde sep-2024 y no publicó semestral NIIF de 2024: exención de la regla 13.48); 2) folleto: solo cuatro meses de 2024; 3) consenso semestral previo no disponible gratis', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Interim Report 2026: panorama del sector (AVC, ChinaIOL, Aduanas, MIR Databank) y negocios', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-09-15', url: u('int2026') },
  { id: 2, titulo: 'Annual Report 2025: estrategia, riesgos, mercados y adquisiciones', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: u('ar2025') },
  { id: 3, titulo: 'Global Home Appliances Market: 529.000 M USD en 2025, 5,22 % anual hasta 718.000 M en 2031', editor: 'Ken Research', tipo: 'Sectorial', fecha: '2026-08', url: 'https://www.kenresearch.com/global-home-appliance-market' },
  { id: 4, titulo: 'Global HVAC Market: 215.000 M USD en 2025 y 292.200 M en 2031 (5,25 % anual)', editor: 'Arizton', tipo: 'Sectorial', fecha: '2026-08', url: 'https://www.arizton.com/market-reports/hvac-market' },
  { id: 5, titulo: 'Yahoo Finance: ingresos y margen operativo de los últimos 12 meses de Gree, Haier, Daikin, Carrier, Trane, Johnson Controls, Whirlpool y Lennox (16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'Ficha sectorial: componentes de climatización (HVAC) y control de edificios', editor: 'Repositorio analisis-inversion (sectores/climatizacion-hvac-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/climatizacion-hvac-2026-10-14.md' },
  { id: 7, titulo: 'Global Offering (folleto H): historia, cuotas de mercado (Frost & Sullivan) y competencia', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2024-09-09', url: u('folleto2024') },
  { id: 8, titulo: '2025 ESG Report (Midea Group)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0424/2026042400796.pdf' },
];
const usd = 6.6857;
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Midea nace en 1968 en Beijiao (Shunde, Cantón) como taller de plástico y metal fundado por He Xiangjian, entra en los electrodomésticos en 1980 con ventiladores y en 1985 en el aire acondicionado [7]. Midea Electric sale a bolsa en Shenzhen en 1993, compra Little Swan en 2008 y en 2012 He cede la presidencia a Fang Hongbo, directivo profesional. En 2013 el grupo entero cotiza en Shenzhen (000333). De 2016 a 2017 se internacionaliza con compras: Toshiba Lifestyle, Clivet y KUKA. Desde 2020 suma negocios para empresas (Hiconics, Winone, Wandong Medical, CLOU) y en 2024 sale a bolsa en Hong Kong con la mayor colocación de la plaza en tres años; en 2025 compra la climatización de Arbonia y Teka [2, 7].',
    hitos: [
      { anio: '1968', hito: 'He Xiangjian funda la empresa en Shunde [7].' },
      { anio: '1985', hito: 'Primeros aires acondicionados [7].' },
      { anio: '1993', hito: 'Midea Electric cotiza en Shenzhen [7].' },
      { anio: '2008', hito: 'Compra de Little Swan (lavado) [7].' },
      { anio: '2012', hito: 'Fang Hongbo sustituye al fundador como presidente [7].' },
      { anio: '2013', hito: 'El grupo cotiza en Shenzhen (000333) tras absorber Midea Electric [2].' },
      { anio: '2016', hito: 'Compra del 80,1 % de Toshiba Lifestyle y de Clivet (climatización comercial italiana) [7].' },
      { anio: '2017', hito: 'Compra de KUKA, uno de los cuatro grandes de la robótica industrial [7].' },
      { anio: '2024', hito: 'Salida a bolsa H en Hong Kong (17-sep-2024) [2].' },
      { anio: '2025', hito: 'Compra de la división de climatización de Arbonia (760 M EUR) y de Teka [2].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Primer grupo mundial de electrodomésticos por ventas y volumen en 2023 (7,9 % del volumen mundial, según Frost & Sullivan) [7]. El 65 % de los ingresos de 2025 es hogar: aire acondicionado doméstico (líder en China y cuota mundial del 21 % en valor), frigoríficos, lavadoras, cocina y pequeño electrodoméstico, con las marcas Midea, Colmo, Little Swan, Toshiba, Comfee y Teka [1, 2]. El 27 % es comercial e industrial: climatización comercial y enfriadoras (primera en China con más del 22 % del mercado de aire central en el 1S26), ascensores, compresores (número uno mundial en compresores de aire acondicionado, 45 % del volumen), motores, robots KUKA, logística Annto, energía y equipos médicos [1, 7]. Tiene 68 bases de producción, 45 fuera de China, y vende en más de 200 países [1].',
    como_gana_dinero: 'Fabricante a gran escala con integración vertical: hace sus propios compresores, motores y chips de control, lo que le da coste por unidad bajo y le permite repartir el I+D (17.788 M en 2025, el 3,9 % de las ventas) [2]. El margen depende de materias primas (cobre, acero, aluminio: 266.002 M de consumos, el 58 % de las ventas), de la mezcla (marca propia frente a fabricación para terceros, alta gama, climatización comercial con margen bruto del 30,6 %) y del precio en China, donde la guerra de precios del aire acondicionado de 2026 restó medio punto de margen bruto [1, 2]. Cobra antes de pagar: los distribuidores anticipan y los proveedores cobran a 90 días, y esa caja rinde intereses. Estacionalidad: el primer semestre (temporada de aire acondicionado) da el 55 % de las ventas y más margen.',
    clientes: 'Sin cliente de más del 10 % de las ventas [2]. En China vende a través de distribuidores y del canal directo al consumidor (DTC) en tiendas propias y comercio electrónico; fuera, a grandes minoristas (en EE. UU., las principales cadenas) y como fabricante para otras marcas, que va perdiendo peso frente a la marca propia (más del 50 % en el 1S26) [1]. Poder de precios moderado: subió el margen bruto de 2021 a 2025 (22,4 % a 26,2 %) con materias primas a favor, pero en 2026 bajó medio punto al caer los precios medios en China, y en el aire acondicionado chino compite con Gree, Haier y Xiaomi [1, 2]. En climatización comercial y enfriadoras de levitación magnética (cuota del 29,7 % en China) el cliente compra por eficiencia y servicio, no solo por precio [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Electrodomésticos y climatización a escala mundial: electrodomésticos grandes y pequeños (529.000 M USD en 2025 según Ken Research) más equipos de climatización residencial y comercial (215.000 M USD según Arizton), en total unos 744.000 M USD (≈ 4.974.000 M RMB) [3, 4]. Es el mercado donde vende el 73 % del grupo (hogar y edificios). Las cifras de los consultores difieren mucho según la definición (las de HVAC van de 215.000 a 525.000 M USD); usamos las dos más prudentes, con perímetros que no se solapan. El 27 % restante (robots, componentes, energía, logística) juega en otros mercados y no entra en la cuota.',
    tamano: '≈ 744.000 M USD en 2025 (529.000 M de electrodomésticos [3] + 215.000 M de climatización [4]); ≈ 4.974.000 M RMB al cambio de hoy',
    unidad_serie: 'miles de millones de USD (electrodomésticos + climatización)',
    serie: [
      { anio: '2025', tamano: 744 }, { anio: '2026e', tamano: 783 }, { anio: '2027e', tamano: 824 }, { anio: '2028e', tamano: 867 }, { anio: '2029e', tamano: 912 }, { anio: '2030e', tamano: 960 }, { anio: '2031e', tamano: 1010 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 5.2,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Ayudas chinas al recambio de electrodomésticos', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Impulsaron 2024-2025; en el 1S26 las ventas minoristas en China cayeron un 9,9 % (aire acondicionado −15,9 %) porque la demanda se adelantó [1].' },
      { driver: 'Vivienda en China (obra nueva y compraventas)', efecto: '−', horizonte: 'Cíclico', evidencia: 'La obra nueva arrastra la primera instalación de aire, cocina y ascensores; el aire central doméstico cayó un 5,7 % en China en el 1S26 [1].' },
      { driver: 'Penetración del aire acondicionado en mercados emergentes y calor extremo', efecto: '+', horizonte: 'Estructural', evidencia: 'Exportaciones chinas de electrodomésticos +2,4 % en el 1S26 pese a aranceles; Midea número uno en aire doméstico en Brasil y 46 % del volumen de equipos en EE. UU. [1].' },
      { driver: 'Electrificación del calor y eficiencia (bombas de calor, normas energéticas)', efecto: '+', horizonte: 'Estructural', evidencia: 'Compra de Arbonia para bombas de calor en Europa; nueva norma china de eficiencia de frigoríficos desde jun-2026 [1, 2].' },
      { driver: 'Refrigeración de centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Aire acondicionado de centros de datos en China ≈ 20.000 M RMB en 2025 (+22,4 %, ChinaIOL); fábrica de refrigeración líquida de Midea en 2027 [1, 6].' },
      { driver: 'Aranceles y proteccionismo', efecto: '−', horizonte: 'Estructural', evidencia: 'Riesgo declarado por la empresa (antidumping, aranceles adicionales); respuesta: 45 de 68 fábricas fuera de China [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Guerra de precios en el aire acondicionado chino en 2026 (precios medios a la baja, margen bruto −0,5 puntos) con Gree, Haier, Xiaomi y Hisense [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Sin cliente de más del 10 %; los grandes minoristas de EE. UU. y Europa negocian fuerte; en China el canal se acorta con el DTC [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas cotizadas (cobre, acero) que se repercuten con retraso; Midea fabrica sus compresores y motores [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Xiaomi entró en el aire acondicionado chino con éxito; la escala de fabricación y la red de servicio (5.500 puntos fuera de China) frenan a otros [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del frío, el lavado o la cocina; la bomba de calor sustituye a la caldera y favorece a Midea [2].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'En China el ciclo está en caída: ventas minoristas −9,9 % en el 1S26 tras dos años de ayudas, y la vivienda sigue débil [1]. Fuera, crecimiento moderado (exportaciones +2,4 %). En 2008-09 el sector chino cayó y se recuperó con las ayudas rurales; en 2020 Midea vendió +2 % pese a la pandemia y en 2022 +0,7 % con confinamientos [7]. El negocio de edificios con centros de datos y la marca propia fuera compensan en parte.' },
    regulacion: 'China: programa de recambio de bienes de consumo (2024-2026) y renovación de ascensores antiguos; nueva norma de eficiencia de frigoríficos (jun-2026); objetivos de carbono para edificios (opiniones de abril de 2026) [1]. UE: directiva de eficiencia de edificios (EPBD 2024) y gases fluorados, favorables a las bombas de calor [6]. EE. UU.: aranceles a productos chinos y AIM Act sobre refrigerantes [6]. Exportaciones: antidumping y certificaciones más estrictas citadas por la empresa como riesgo [1].',
    tendencias: 'Tres tendencias: (1) marca propia y producción local fuera de China (Midea gana: más del 50 % de las ventas de hogar fuera ya con marca propia) [1]; (2) electrodomésticos conectados e IA en el producto (aire con radar y voz) y en la distribución, donde Midea invierte en datos y digitalización [1]; (3) refrigeración de centros de datos y electrificación del calor, en las que Midea llega tarde frente a Vertiv, Schneider o Trane pero con coste bajo y una fábrica de refrigeración líquida en 2027 [1, 6]. El riesgo es Xiaomi y los fabricantes de bajo coste en China.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 6.7,
    posicion: '1.º mundial en electrodomésticos por ventas y volumen (7,9 % del volumen en 2023) [7]; ≈ 6,7 % del mercado de electrodomésticos y climatización con las ventas de hogar y edificios (335.718 M RMB de 2025 sobre ≈ 4.974.000 M; estimación propia) [3, 4]; 1.º en aire central en China (> 22 %) y en compresores de aire doméstico en el mundo (45 % del volumen) [1, 7].',
    competidores: [
      { nombre: 'Haier Smart Home', pais: 'China', ticker: '600690.SS', ingresos: 297968, cuota_pct: null, margen_ebit_pct: 8.3, comentario: 'Primer rival en frigoríficos y lavadoras; fuerte en EE. UU. con GE Appliances [5].' },
      { nombre: 'Gree Electric', pais: 'China', ticker: '000651.SZ', ingresos: 162520, cuota_pct: null, margen_ebit_pct: 16.5, comentario: 'Especialista en aire doméstico, muy rentable en China, poco diversificado; ventas en caída (−10 % en 2025) [5].' },
      { nombre: 'Daikin Industries', pais: 'Japón', ticker: '6367.T', ingresos: Math.round(5228025 * 0.042173), cuota_pct: null, margen_ebit_pct: 9.2, comentario: 'Primer fabricante mundial de climatización pura; fuerte en VRF y EE. UU. (Goodman) [5].' },
      { nombre: 'Carrier Global', pais: 'EE. UU.', ticker: 'CARR', ingresos: Math.round(22108 * usd), cuota_pct: null, margen_ebit_pct: 13.1, comentario: 'Climatización residencial y comercial; Viessmann en Europa [5].' },
      { nombre: 'Trane Technologies', pais: 'Irlanda/EE. UU.', ticker: 'TT', ingresos: Math.round(22210 * usd), cuota_pct: null, margen_ebit_pct: 19.3, comentario: 'Líder en enfriadoras comerciales y centros de datos en EE. UU. [5].' },
      { nombre: 'Johnson Controls', pais: 'Irlanda/EE. UU.', ticker: 'JCI', ingresos: Math.round(24995 * usd), cuota_pct: null, margen_ebit_pct: 15.9, comentario: 'Enfriadoras York y control de edificios [5].' },
      { nombre: 'Whirlpool', pais: 'EE. UU.', ticker: 'WHR', ingresos: Math.round(14921 * usd), cuota_pct: null, margen_ebit_pct: 1.6, comentario: 'Electrodomésticos en América; márgenes hundidos y deuda alta [5].' },
      { nombre: 'Lennox International', pais: 'EE. UU.', ticker: 'LII', ingresos: Math.round(5302 * usd), cuota_pct: null, margen_ebit_pct: 22.9, comentario: 'Climatización residencial en Norteamérica [5].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: un electrodoméstico no gana valor porque otros lo usen.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos en el hogar; algo mayores en climatización comercial y ascensores por el servicio y el mantenimiento (posventa +35 % en el 1S26) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marcas líderes en China (Midea, Colmo, Little Swan) y Toshiba en Japón; unas 65.000 familias de patentes activas (top 10 mundial) [7]. Fuera de Asia la marca aún es secundaria.' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Integración vertical (compresores, motores, chips), 45 % del volumen mundial de compresores de aire, compras de 266.000 M de materias primas: margen EBIT del 9,8 % frente al 8,3 % de Haier y el 1,6 % de Whirlpool [2, 5, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primer fabricante mundial en volumen; 68 fábricas y 5.500 puntos de servicio fuera de China [1, 7].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) Xiaomi y la guerra de precios en el aire acondicionado chino, que ya quitó medio punto de margen bruto en el 1S26 (probabilidad media-alta) [1]; (2) aranceles de EE. UU. y Europa a productos chinos, que obligan a producir fuera con más coste (media) [1, 2]; (3) en climatización comercial y centros de datos, los líderes occidentales (Trane, Vertiv, Daikin) tienen la especificación y el servicio; Midea compite en precio (media) [6]. A favor: escala y coste que nadie iguala en volumen.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI ESG', calificacion: 'n.d. (la empresa cita su informe ESG 2025)', fecha: '2026-04' },
    ],
    materialidad: 'Tres asuntos con cifra: (1) eficiencia energética de los productos (aire de alta eficiencia, bombas de calor), que es a la vez regulación y ventaja comercial; (2) emisiones de la fabricación y refrigerantes (gases fluorados en la UE y AIM Act en EE. UU.); (3) seguridad laboral en 198.050 empleados y 68 fábricas [1, 8]. El informe ESG 2025 es el quinto de la empresa [8].',
    controversias: 'Sin multas ni litigios relevantes publicados por la empresa en 2023-2026; el informe anual no declara contingencias materiales [2]. No hemos encontrado sanciones de reguladores con fuente primaria.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Crecimiento histórico del mercado y CR5', tipo: 'Complemento', intentos: '1) Informe anual y semestral: dan series de China (AVC, ChinaIOL), no mundiales; 2) folleto (Frost & Sullivan): cuotas de Midea pero no el CR5 en el texto leído; 3) Ken Research y Arizton: solo 2025 y la previsión', decision: 'Omitido' },
    { seccion: 'esg', campo: 'Calificaciones ESG de agencias', tipo: 'Complemento', intentos: '1) Informe ESG 2025 en HKEXnews (25 MB, no leído entero); 2) web de MSCI ESG (requiere JavaScript); 3) búsqueda de Sustainalytics sin resultado abierto', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: informe de gobierno corporativo, consejo, comisiones, remuneraciones (nota 9), participaciones de consejeros', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-24', url: u('ar2025') },
  { id: 2, titulo: 'Interim Report 2026: accionistas significativos, consejo, recompras, planes de incentivos', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-09-15', url: u('int2026') },
  { id: 3, titulo: 'Poll results of the 2025 Annual General Meeting (5-jun-2026)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-05', url: u('votos2026') },
  { id: 4, titulo: 'Poll results of the 2024 Annual General Meeting (30-may-2025)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2025-05-30', url: u('votos2025') },
  { id: 5, titulo: 'Resignation of independent non-executive director and proposed appointment (abr-2026)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-04-29', url: u('ined2026') },
  { id: 6, titulo: 'Announcement on the submission of updated listing application by Annto to the Stock Exchange (jun-2026)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-15', url: u('annto') },
  { id: 7, titulo: 'Global Offering (folleto H, 2024): directivos, trayectoria y estructura de control', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2024-09-09', url: u('folleto2024') },
  { id: 8, titulo: 'Repurchase and cancellation of certain restricted shares; notice of the 2026 first EGM', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-09-27', url: u('egm2026_rs') },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Fang Hongbo', cargo: 'Presidente y consejero delegado', desde: '2012', participacion_pct: 1.54, trayectoria: 'En Midea desde 1992; presidente desde 2012, cuando el fundador le cedió el mando. Con él las ventas pasaron de unos 100.000 M (2012) a 458.502 M en 2025 y el grupo compró Toshiba Lifestyle, KUKA, Arbonia y Teka [1, 7]. Tiene 116,99 M de acciones A (≈ 9.400 M RMB) [3].' },
      { nombre: 'Zhong Zheng', cargo: 'Vicepresidenta y directora financiera', desde: '2020', participacion_pct: null, trayectoria: 'Ha sido directora financiera de Midea Electric y trabajó en Midea Holding; 44 años [1].' },
      { nombre: 'Wang Jianguo', cargo: 'Consejero ejecutivo y presidente ejecutivo', desde: '2023', participacion_pct: 0.01, trayectoria: 'Dirige las operaciones del grupo; antes al frente de negocios de hogar [1].' },
      { nombre: 'Gu Yanmin', cargo: 'Consejero ejecutivo y vicepresidente', desde: '2020', participacion_pct: 0.00, trayectoria: 'Responsable de la estrategia y los negocios para empresas (robótica, KUKA) [1].' },
      { nombre: 'Guan Jinwei', cargo: 'Consejero ejecutivo y vicepresidente', desde: '2022', participacion_pct: 0.02, trayectoria: 'Directivo de la casa, responsable de negocios industriales [1].' },
    ],
    historial_guidance: [
      { anio: '2025-2027', guia: 'Plan de retribución al accionista 2025-2027 con dividendo en efectivo prioritario y estable', real: 'Dividendo de 4,30 RMB en 2025 (+23 %) y 0,5 a cuenta en 2026; recompras de 11.699 M en 2025 [1, 2]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Planes de incentivos: ROE medio ponderado ≥ 18 % en 2025-2027', real: 'ROE de 2025 en torno al 20 % (beneficio 43.945 M sobre patrimonio medio de 219.986 M) [1]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Recompra de 6.500-13.000 M de acciones A antes de mar-2027 (para amortizar)', real: '5.476 M ejecutados a 30-jun-2026 [2]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de la casa: Fang Hongbo preside desde 2012 y los consejeros ejecutivos llevan décadas en el grupo [1, 7]. Midea no publica objetivos anuales de ventas o beneficio, así que la credibilidad se mide con lo que sí promete: dividendos, recompras y el umbral de ROE de los incentivos (≥ 18 %), que cumple [1, 2]. La sucesión es la gran pregunta: Fang acumula presidencia y dirección ejecutiva y no hay sucesor declarado; el fundador tiene el 28,9 % a través de Midea Holding y su hijo He Jianfeng dejó el consejo en julio de 2024 [1, 2].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Fang Hongbo', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2012', comisiones: 'Estrategia (presidente)' },
      { nombre: 'Wang Jianguo', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Gu Yanmin', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2020', comisiones: '—' },
      { nombre: 'Guan Jinwei', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2022', comisiones: '—' },
      { nombre: 'Zhang Tian', cargo: 'Consejero ejecutivo (representante de los empleados)', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Zhao Jun', cargo: 'Consejero no ejecutivo', tipo: 'Dominical', desde: '2022', comisiones: '—' },
      { nombre: 'Xu Dingbo', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidente), Remuneración, Nombramientos' },
      { nombre: 'Xiao Geng', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración (presidente), Auditoría, Nombramientos' },
      { nombre: 'Liu Qiao', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos (presidente), Auditoría, Remuneración' },
      { nombre: 'Zhang Ya', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, Remuneración, Nombramientos, Estrategia' },
    ],
    presidente_ceo_separados: false,
    presidente_ejecutivo: true,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.98,
    voto_remuneracion_contra_pct: 0.01,
    voto_remuneracion_contra_libre_pct: 0.01,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 81.89, fijo: 6.74, variable_corto: 7.04, variable_largo: 68.10, ratio_salario_medio: 340 },
    remuneracion: 'Fang Hongbo cobró 81,9 M RMB en 2025: 6,7 M de sueldo, 7,0 M de bonus y 68,1 M de pagos en acciones (planes de acciones restringidas, opciones y participación de empleados) [1]. Es unas 340 veces el coste medio por empleado (45.736 M entre unos 190.000 empleados; estimación propia). Los planes de 2025-2026 exigen un ROE medio ponderado ≥ 18 % en 2025-2027 y ≥ 17,5 % en 2028-2029 y evaluación individual [1, 2]: premian rentabilidad, no tamaño. No consta cláusula de recuperación (clawback) en lo leído. La junta de 2026 aprobó la remuneración con el 99,98 % a favor y un 0,007 % en contra, y el plan de participación de empleados de 2026 con un 3,2 % en contra [3].',
    accionistas: [
      { nombre: 'Midea Holding (controlada al 94,55 % por He Xiangjian)', pct: 28.49, tipo: 'Accionista de control (fundador)', variacion: 'Estable' },
      { nombre: 'He Xiangjian (directas)', pct: 0.42, tipo: 'Fundador', variacion: 'Estable' },
      { nombre: 'Fang Hongbo', pct: 1.54, tipo: 'Presidente y consejero delegado', variacion: '116,99 M de acciones A en mayo de 2026 [3]' },
      { nombre: 'HHLR Advisors (Hillhouse)', pct: 1.79, tipo: 'Inversor institucional (20,9 % de las H)', variacion: 'Inversor ancla de la salida a bolsa H' },
      { nombre: 'COSCO Shipping', pct: 0.53, tipo: 'Inversor ancla (6,2 % de las H)', variacion: 'Estable' },
      { nombre: 'Autocartera (acciones A)', pct: 2.32, tipo: 'Autocartera', variacion: '176,9 M de acciones a 18-ago-2026, frente a 123,4 M en junio; para amortizar' },
    ],
    insiders: [],
    control_y_defensas: 'Midea Holding, controlada por el fundador He Xiangjian, tiene el 28,9 % con sus acciones directas: controla de hecho la junta (asistencia del 54 % del capital en 2026) pero no la mayoría absoluta [2, 3]. Una acción, un voto; A y H con los mismos derechos económicos. El presidente es un directivo profesional, no de la familia; Zhao Jun es dominical [1]. Sin blindajes estatutarios conocidos. Operaciones vinculadas con Midea Holding de importe menor (nota 45 del informe anual) [1]. Annto Logistics, filial, pidió cotizar en Hong Kong (solicitud actualizada en jun-2026): la escisión parcial puede crear minoritarios en una filial [6].',
    alertas: [
      'Presidente y consejero delegado en la misma persona desde 2012, sin consejero independiente coordinador y sin sucesor declarado [1].',
      'Remuneración del primer ejecutivo de 81,9 M RMB, 340 veces la media, aunque ligada a acciones y a un ROE mínimo [1].',
      'Independientes en minoría (4 de 10) [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Operaciones de consejeros y directivos de los últimos 12 meses', tipo: 'Complemento', intentos: '1) Informes anual y semestral: solo participaciones a fecha, no operaciones; 2) avisos de interés (SFO, «Disclosure of Interests») de HKEX para 0300: no consultados por bloqueo de la búsqueda; 3) cninfo (Shenzhen) no responde desde la nube', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 0300.HK, ^HSI y 2800.HK hasta el 16-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/0300.HK/history' },
  { id: 2, titulo: 'Históricos diarios de 000333.SZ (línea A) hasta el 16-oct-2026 y cierres anuales 2016-2025', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/000333.SZ/history' },
  { id: 3, titulo: 'Consenso de Yahoo Finance para 0300.HK y 000333.SZ: BPA y ventas de 2026-2027, objetivos y recomendaciones (16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/0300.HK/analysis' },
  { id: 4, titulo: 'Midea Group: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/MIDEA-GROUP-CO-LTD-16166364/finances/' },
  { id: 5, titulo: 'Comparables: precio, capitalización, valor empresa, EV/EBITDA, BPA esperado y márgenes de Gree, Haier, Daikin, Carrier, Trane, JCI, Lennox y Whirlpool (16-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com' },
  { id: 6, titulo: 'China 10-Year Government Bond Yield: 1,67 % (16-oct-2026)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-16', url: u('bono_cn') },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Tipos de cambio HKD/CNY (0,8515), USD/CNY (6,6857) y JPY/CNY (0,042173), 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/HKDCNY=X' },
  { id: 9, titulo: 'Informe de Daikin del repositorio (14-oct-2026): transacciones de climatización con su fuente (Eaton-Boyd, Schneider-Motivair, Carrier-Viessmann, Pentair-Manitowoc Ice, Daikin-AHT)', editor: 'Repositorio analisis-inversion (informes/daikin-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/tree/main/informes/daikin-2026-10-14' },
  { id: 10, titulo: 'Midea to acquire Arbonia\'s Climate Division for EUR 760 million', editor: 'Lenz & Staehelin', tipo: 'Prensa', fecha: '2024-04', url: 'https://lenzstaehelin.com/news-and-insights/browse-deals-and-cases/dealscases-detail/midea-to-acquire-arbonias-climate-division-for-eur-760-million' },
  { id: 11, titulo: 'Midea Group (000333): recomendaciones recientes (CLSA Comprar 91 RMB, 27-jul-2026; JPMorgan a Comprar 82 RMB, 10-jun-2026)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10', url: 'https://www.investing.com/equities/midea-group-a-consensus-estimates' },
  { id: 12, titulo: 'Interim Report 2026 y anuncios de dividendos (ex-dividendo del 18-jun-2026, 4,37 HKD)', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-06-05', url: u('div_final2025') },
  { id: 13, titulo: 'Interim Report 2026: acciones emitidas, autocartera y convertibles', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-09-15', url: u('int2026') },
  { id: 14, titulo: 'Date of Board Meeting: resultados de los nueve meses el 29-oct-2026', editor: 'Midea Group Co., Ltd.', tipo: 'Primaria', fecha: '2026-10-14', url: u('consejo_fecha') },
];
const precioH = bolsaH.identificacion.precio; // HKD
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Midea Group Co., Ltd.', nombre_corto: 'Midea', ticker: '0300.HK', isin: 'CNE100006M58', mercado: 'Bolsa de Hong Kong (línea H; la línea A cotiza en Shenzhen, 000333)', indice_referencia: 'Hang Seng',
    pais: 'China', pais_iso: 'CN', sector: 'Consumo discrecional', industria: 'Electrodomésticos', sede: 'Foshan (Cantón, China)', fundacion: '1968', empleados: 198050, web: 'www.midea.com',
    precio: +(precioH * TC).toFixed(2), fecha_precio: bolsaH.identificacion.fecha_precio, acciones: 7497, capitalizacion_publicada: Math.round(716850.86 * TC), free_float_pct: 69.0,
    max_52s: +(bolsaH.identificacion.max_52s * TC).toFixed(2), min_52s: +(bolsaH.identificacion.min_52s * TC).toFixed(2), volumen_medio_diario: '≈ 490 M HKD/día en la línea H (3 meses) y ≈ 2.350 M RMB/día en la A', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Midea no publica objetivos anuales de ventas ni de beneficio. Lo que sí fija: plan de retribución al accionista 2025-2027, recompra de 6.500-13.000 M de acciones A para amortizar antes de marzo de 2027 (5.476 M hechos a junio) y un ROE mínimo del 18 % en los incentivos de 2026-2027 [13]. En agosto describió un 2S26 con caída del mercado chino algo menor que en el 1S y defendió la marca propia fuera y los negocios para empresas [13].',
    estimaciones: [
      { periodo: '2026e', ingresos: 479407, ebitda: 56867, ebit: 45605, bpa: 6.10, dpa: 4.44, fuente: 'MarketScreener (15-oct-2026) [4]' },
      { periodo: '2027e', ingresos: 510793, ebitda: 61181, ebit: 50624, bpa: 6.60, dpa: 4.83, fuente: 'MarketScreener [4]; Yahoo: BPA 6,60 con 21 analistas [3]' },
      { periodo: '2028e', ingresos: 546848, ebitda: 66524, ebit: 58963, bpa: 7.19, dpa: 5.28, fuente: 'MarketScreener [4]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 9, mantener: 2, vender: 0, po_medio: +(112.52 * TC).toFixed(2), po_min: +(88.96 * TC).toFixed(2), po_max: +(135.67 * TC).toFixed(2) },
    revisiones: 'Una sola fuente gratuita con estimaciones completas a tres años (MarketScreener) [4], cotejada con Yahoo: BPA de 2027 de 6,60 RMB con 21 analistas en la línea A y objetivos de 11 analistas en la H (media 112,52 HKD, de 88,96 a 135,67; recomendación «comprar») y de 19 en la A (media 100,79 RMB) [3]. El consenso de ventas de 2026 (+4,6 %) ya recoge el frenazo del 1S26. Movimientos recientes: CLSA mantuvo Comprar con 91 RMB (27-jul-2026) y JPMorgan subió a Comprar con 82 RMB (10-jun-2026) [11]. No tenemos la serie de revisiones de BPA de 3 y 12 meses. El EBITDA del consenso está en normas chinas e incluye partidas que nuestro EBITDA limpio excluye; usamos sobre todo el BPA.',
    base_ebitda: 'NIIF',
    ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: bolsaH.bolsa.rentabilidades,
    anual: bolsaH.bolsa.anual,
    beta: 0.72,
    volatilidad_pct: bolsaH.bolsa.volatilidad_pct,
    max_drawdown_pct: -47.2,
    posicion_corta_pct: null,
    comentario: 'La línea H cotiza desde el 17-sep-2024, así que la historia larga es la de la A: +16,4 % anual en 10 años, +8,4 % en 5 y +21,2 % en 3, con una caída máxima del 47,2 % de enero a octubre de 2022 (vivienda china y confinamientos) [2]. En el último año la H sube un 14,6 % frente al −6,6 % del Hang Seng y la A un 22,3 % [1, 2]. Los datos de Yahoo de 0300.HK anteriores a la salida a bolsa son de otra empresa con el mismo código y dan betas sin sentido; la beta mensual de 5 años de la A frente al Hang Seng es 0,72 (estimación propia con Yahoo) y la semanal de 2 años de la H frente al Tracker Fund, 0,43 [1, 2]. La H cotiza con un descuento del 5,4 % frente a la A (80,00 RMB frente a 84,60).',
    contexto: {
      movimiento: { fecha: '2026-10-16', var_1m_pct: -4.8, var_3m_pct: -0.4, var_6m_pct: 6.4, var_12m_pct: 15.8, dist_max_52s_pct: -7.3, dist_min_52s_pct: 19.8, dist_max_historico_pct: -7.3, tendencia: 'alcista', volatilidad_60d_pct: 18.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'jun-2026', var_pct: -10.3, causa: 'Caída de un mes hasta el 24-jun: el 18-jun la acción cotizó sin el dividendo final de 4,37 HKD por acción (≈ 4,9 %, el −5,6 % de ese día), con el mercado chino de aire acondicionado en caída del 15,9 % [12, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 19.9, causa: 'Rebote del 24-jun al 28-jul desde el mínimo tras el dividendo, con todo el sector y el mercado al alza: Hang Seng +8,1 %, Gree +9,9 % y Haier +10,4 % en el mismo periodo; recompras diarias de acciones A [1, 5, 13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados de los nueve meses (3T26) el 29-oct-2026 [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-07', tipo: 'ampliación o convertible', hecho: 'Convertibles en acciones H de cupón cero por 17.248 M HKD (vencimientos 2027 y 2033; conversión a 91,82 y 109,78 HKD tras el ajuste de julio): dilución máxima del 2,2 % y posible cobertura de los compradores vendiendo H [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-30', tipo: 'directivos', hecho: 'Recompra de 6.500-13.000 M de acciones A antes de mar-2027, para amortizar; 5.476 M hechos a junio y la autocartera sube a 176,9 M de acciones en agosto [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-15', tipo: 'fusión u oferta', hecho: 'Annto (logística, filial) actualizó su solicitud para cotizar en Hong Kong: escisión parcial sin fecha [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-27', tipo: 'recomendación', hecho: 'CLSA mantiene Comprar (91 RMB); JPMorgan sube a Comprar (82 RMB) el 10-jun; objetivo medio de 11 analistas en la H: 112,52 HKD [3, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-28', tipo: 'resultados', hecho: 'Resultados del 1S26: ventas +3,5 %, beneficio +1,7 %; ventas minoristas de electrodomésticos en China −9,9 % y Tecnología Industrial −12,7 % [13].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 7,3 % por debajo de su máximo de 52 semanas (101,70 HKD, 31-ago) y un 4,1 % por encima de su media de 200 sesiones, en tendencia alcista y sin avisos P1-P5 [1]. Los dos movimientos fuertes del año se explican por el dividendo de junio (cotización sin dividendo) y por un rebote general del mercado de Hong Kong y del sector en julio, no por noticias propias. No hay colocaciones de accionistas de referencia anunciadas ni ampliaciones pendientes; los convertibles ya se emitieron en mayo. Resultados del 3T el 29-oct: no aplazan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 69.82, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 49.00, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 51.68, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 71.02, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 76.02, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precio de cierre en RMB de la línea H: 2024 y 2025 son cierres reales de 0300.HK pasados a RMB (75,55 HKD × 0,9400 y 84,55 × 0,8991) [1, 8]; 2021-2023 son cierres de la A (73,81, 51,80 y 54,63 RMB) multiplicados por 0,946, el cociente H/A de hoy, para no suponer que la prima de la A se cierra (estimación propia) [2].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Cuatro fabricantes de electrodomésticos (Haier y Gree, sus rivales chinos; Whirlpool, el mayor de América; Daikin, número uno de la climatización y muy expuesto a Asia) y cuatro de climatización occidentales (Carrier, Trane, Johnson Controls, Lennox), que es donde Midea quiere crecer con Edificios. Fuera Electrolux (datos de Yahoo incoherentes), LG y Samsung (conglomerados de electrónica) y Hisense (sin datos en Yahoo). Todo en RMB al cambio del 16-oct; PER de los próximos 12 meses con el BPA esperado de Yahoo ponderado por meses [5, 8].',
    empresas: comps,
    comentario: 'Midea queda en la zona barata del mapa: cotiza a un PER parecido al de Haier y por encima de Gree, pero muy por debajo de Daikin y de los occidentales de climatización (14-27 veces), con un margen EBITDA del 12 % frente al 14-22 % de estos [5]. La prima de los occidentales se explica por su exposición a centros de datos en EE. UU., su margen y el riesgo país; la de Midea frente a Gree, por su diversificación y su crecimiento fuera. Usamos el PER: el EV/EBITDA de las chinas sale muy bajo porque su caja neta es enorme y en las occidentales la deuda pesa.',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: Math.round(1505319 * 0.042173), ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: '9.500 M USD; múltiplo sobre el EBITDA estimado de 2026 [9].' },
      { fecha: '2024-10', objetivo: 'Motivair (refrigeración líquida; 75 %)', comprador: 'Schneider Electric', ev: Math.round(179529 * 0.042173), ev_ventas: 5.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor del 100 % estimado [9].' },
      { fecha: '2024-04', objetivo: 'División de climatización de Arbonia', comprador: 'Midea Group', ev: 5928, ev_ventas: 1.26, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '760 M EUR sobre ventas de 576,6 M CHF en 2023 (estimación propia del múltiplo de ventas) [10].' },
      { fecha: '2023-04', objetivo: 'Viessmann Climate Solutions (bombas de calor)', comprador: 'Carrier', ev: Math.round(2128680 * 0.042173), ev_ventas: 3.0, ev_ebitda: 17.1, prima_pct: null, excluir: false, comentario: '12.000 M EUR; ≈ 17 veces sin sinergias [9].' },
      { fecha: '2022-03', objetivo: 'Manitowoc Ice', comprador: 'Pentair', ev: Math.round(253527 * 0.042173), ev_ventas: 5.19, ev_ebitda: 17.4, prima_pct: null, excluir: false, comentario: 'Frío comercial; 1.600 M USD [9].' },
      { fecha: '2019-01', objetivo: 'AHT Cooling Systems (frío comercial)', comprador: 'Daikin', ev: Math.round(114500 * 0.042173), ev_ventas: 1.83, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '881 M EUR [9].' },
    ],
    comentario: 'Las compras recientes en climatización especializada se pagan a 17-22,5 veces el EBITDA (Viessmann, Manitowoc Ice, Boyd), muy por encima de las 6 veces del valor empresa de Midea con toda su caja neta [9]. No son su referencia de control: Midea es un fabricante de volumen con margen EBITDA del 12 % y un accionista de control (28,9 %) que no venderá. Las compras de Midea (Arbonia a 1,26 veces las ventas) muestran que compra barato, no que pueda ser comprada [10].',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'Posición corta oficial', tipo: 'Complemento', intentos: '1) Estadísticas de ventas en corto de HKEX (no abiertas desde la nube); 2) etnet: página de ventas en corto de 0300 sin texto legible; 3) Stock Analysis bloquea (403)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'Sección entera', tipo: 'Complemento', intentos: '1) Foros chinos de la línea A (Guba de Eastmoney y Xueqiu): comprobación antibot, sin texto; 2) Seeking Alpha y Stocktwits (MIDEF): 404, y Reddit: 403; 3) búsquedas web de debates de inversores sobre 0300.HK o 000333 en los últimos tres meses: solo agregadores de noticias y fichas de cotización, sin debate', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
