// Escribe las notas A-E de Borregaard (corte 2026-10-15) a partir de los documentos de notas/docs
// (informe anual 2025, informe y cifras del 2T26, presentaciones del 1T26, 2T26, julio-26 y del día del inversor del 17-sep-26),
// del XBRL ESEF (notas/cuentas-xbrl.json y los JSON de filings.xbrl.org), de Yahoo (notas/bolsa.json) y de páginas web leídas.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const EURNOK = 10.6035, USDNOK = 10.6035 / 1.1195, CHFNOK = 10.6035 / 0.9330; // BCE 14-oct-2026
const r1 = (x) => Math.round(x * 10) / 10;
const HUB = 'https://www.borregaard.com/hubfs';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Borregaard Annual Report 2025 (cuentas consolidadas y notas; cifras clave históricas 2021-2025)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-03-18', url: `${HUB}/Media/Investors/2025%20Annual%20Report.pdf` },
  { id: 2, titulo: 'Borregaard 2nd quarter 2026 interim report', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/2nd%20quarter%202026%20report.pdf` },
  { id: 3, titulo: 'Quarterly and accounting figures 2nd quarter 2026 (cuenta, balance, flujos y segmentos trimestrales 2022-2T26)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/Quarterly%20and%20accounting%20figures%202nd%20quarter%202026.pdf` },
  { id: 4, titulo: 'Borregaard ASA: informes anuales ESEF 2021-2024 (xBRL-JSON)', editor: 'XBRL International, filings.xbrl.org', tipo: 'Primaria', fecha: '2025-03', url: 'https://filings.xbrl.org/5967007LIEEXZXGYXC05/2024-12-31/ESEF/NO/0/' },
  { id: 5, titulo: 'Borregaard Capital Markets Day 2026 (presentación)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-09-17', url: `${HUB}/Borregaard%20Capital%20Markets%20Day%202026.pdf` },
  { id: 6, titulo: 'Presentation of 2nd quarter 2026 results', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/2nd%20quarter%202026%20presentation.pdf` },
  { id: 7, titulo: 'Presentation of 1st quarter 2026 results', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-04-29', url: `${HUB}/Q12026/1st%20quarter%202026%20presentation.pdf` },
];
const c = (periodo, o) => ({ periodo, gastos_generales: null, participadas_en_ebitda: null, dpa_extraordinario: 0, ...o });
const A = {
  financieros: {
    cuenta: [
      c('2021', { ingresos: 5805, coste_ventas: 2152, ebitda: 1372, amortizaciones: 420, ebit: 952, resultado_financiero: -79, bai: 873, impuestos: 213, minoritarios: -32, beneficio_neto: 692, gastos_financieros: null, no_recurrentes_en_ebitda: null, bpa: 6.94, dpa: 2.75, dpa_extraordinario: 2.25, acciones_diluidas: 99.743 }),
      c('2022', { ingresos: 6881, coste_ventas: 2628, ebitda: 1635, amortizaciones: 449, ebit: 1186, resultado_financiero: -68, bai: 1118, impuestos: 267, minoritarios: -41, beneficio_neto: 892, gastos_financieros: null, no_recurrentes_en_ebitda: 8, bpa: 8.92, dpa: 3.25, acciones_diluidas: 99.753 }),
      c('2023', { ingresos: 7132, coste_ventas: 2545, ebitda: 1781, amortizaciones: 490, ebit: 1291, resultado_financiero: -167, bai: 1124, impuestos: 268, minoritarios: -14, beneficio_neto: 870, gastos_financieros: null, no_recurrentes_en_ebitda: null, bpa: 8.71, dpa: 3.75, acciones_diluidas: 99.753 }),
      c('2024', { ingresos: 7617, coste_ventas: 2732, ebitda: 1844, amortizaciones: 561, ebit: 1283, resultado_financiero: -204, bai: 1079, impuestos: 250, minoritarios: 6, beneficio_neto: 823, gastos_financieros: 193, no_recurrentes_en_ebitda: 30, bpa: 8.25, dpa: 4.25, acciones_diluidas: 99.598 }),
      c('2025', { ingresos: 7713, coste_ventas: 2659, ebitda: 1878, amortizaciones: 591, ebit: 1287, resultado_financiero: -423, bai: 864, impuestos: 264, minoritarios: -20, beneficio_neto: 620, gastos_financieros: 162, no_recurrentes_en_ebitda: null, bpa: 6.22, dpa: 4.75, acciones_diluidas: 99.731 }),
    ],
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 7751, ebitda: 1758, ebit: 1155, beneficio_neto: 169, bpa: 1.69, dpa: 4.75, dpa_extraordinario: 0, fcf: 791, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 30 },
    cambios_perimetro: [],
    comentario: 'Los ingresos crecieron de 5.805 M NOK en 2021 a 7.713 M en 2025, todo orgánico: no hubo compras consolidadas en el periodo [1]. La empresa da un crecimiento anual compuesto del 7,7 % en 2020-2025 en NOK y de en torno al 5,0 % sin divisa ni coberturas [5]: casi un tercio del crecimiento fue la depreciación de la corona. El EBITDA pasó de 1.372 M a 1.878 M y el margen, del 23,6 % al 24,3 % (máximo del 25,0 % en 2023) [1]; la mejora vino de precio y mezcla en BioMaterials (precio medio de 14.283 NOK/t en 2022 a 17.678 en 2025) y de la especialización en BioSolutions, mientras Fine Chemicals cayó de 336 M a 174 M de EBITDA en 2025 por el desplome del precio del bioetanol [1, 3]. Las coberturas de divisa restaron 365 M al EBITDA en 2024 y 174 M en 2025, y suman 90 M en el 1S26 [3]. En el 1S26 el EBITDA bajó de 1.033 M a 943 M por energía, mezcla en BioSolutions y la corona fuerte [2].',
    ajustes: 'Cifras publicadas (NIIF). El EBITDA de la empresa excluye «otros ingresos y gastos», que sí restan en el EBIT: −8 M en 2022, −30 M en 2024 (descontaminación de suelos) y −30 M en el 2T26 (estabilización del terreno de Sarpsborg por un puente del condado) [1, 2]; aquí van como no recurrentes dentro del EBITDA para que el motor los devuelva. El resultado financiero de 2025 incluye 245 M de deterioro de participadas (225 M de Alginor) y el del 2T26 otro deterioro de Alginor de 337 M, sin efecto fiscal [1, 2]. Sin ellos, el BPA fue de 8,67 NOK en 2025 y de 4,17 NOK en el 1S26 (tipo efectivo del 24 %) [1, 2]. Alginor queda a cero en el balance tras el 2T26 y Borregaard bajará al 10 % [2]: el BPA normalizado del informe excluye esas pérdidas, que no se repetirán con ese importe.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1949, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 524, margen_ebitda_pct: 26.9, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 1744, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 398, margen_ebitda_pct: 22.8, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 2036, crecimiento_pct: 3.1, crecimiento_organico_pct: null, ebitda: 511, margen_ebitda_pct: 25.1, bpa: 2.52, vs_consenso: null },
      { periodo: '2T25', ingresos: 2045, crecimiento_pct: 4.9, crecimiento_organico_pct: null, ebitda: 522, margen_ebitda_pct: 25.5, bpa: 2.56, vs_consenso: null },
      { periodo: '3T25', ingresos: 1799, crecimiento_pct: -7.7, crecimiento_organico_pct: null, ebitda: 440, margen_ebitda_pct: 24.5, bpa: 1.95, vs_consenso: null },
      { periodo: '4T25', ingresos: 1833, crecimiento_pct: 5.1, crecimiento_organico_pct: null, ebitda: 405, margen_ebitda_pct: 22.1, bpa: 0.24, vs_consenso: null },
      { periodo: '1T26', ingresos: 2005, crecimiento_pct: -1.5, crecimiento_organico_pct: null, ebitda: 428, margen_ebitda_pct: 21.3, bpa: 1.82, vs_consenso: null },
      { periodo: '2T26', ingresos: 2114, crecimiento_pct: 3.4, crecimiento_organico_pct: null, ebitda: 515, margen_ebitda_pct: 24.4, bpa: -1.27, vs_consenso: null },
    ],
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 7166, activo_corriente: 2023, pasivo_corriente: 1283, pasivo_total: 2860, fondo_comercio: null, intangibles: 89, inmovilizado_material: 4191, existencias: 792, clientes: 1107, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 124, deuda_financiera: 1544, arrendamientos: null, patrimonio_neto: 4222, minoritarios: 84, reservas: null },
      { periodo: '2022', activo_total: 8114, activo_corriente: 2920, pasivo_corriente: 2004, pasivo_total: 3669, fondo_comercio: null, intangibles: 82, inmovilizado_material: 4371, existencias: 1299, clientes: 1387, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 234, deuda_financiera: 2072, arrendamientos: null, patrimonio_neto: 4394, minoritarios: 51, reservas: null },
      { periodo: '2023', activo_total: 9115, activo_corriente: 3117, pasivo_corriente: 1804, pasivo_total: 4221, fondo_comercio: null, intangibles: 84, inmovilizado_material: 4661, existencias: 1447, clientes: 1201, proveedores: null, activos_contrato: null, pasivos_contrato: null, caja: 469, deuda_financiera: 1699, arrendamientos: 563, patrimonio_neto: 4855, minoritarios: 39, reservas: 2583 },
      { periodo: '2024', activo_total: 9584, activo_corriente: 3021, pasivo_corriente: 1869, pasivo_total: 4494, fondo_comercio: null, intangibles: 88, inmovilizado_material: 5026, existencias: 1498, clientes: 1441, proveedores: 551, activos_contrato: null, pasivos_contrato: null, caja: 82, deuda_financiera: 1769, arrendamientos: 554, patrimonio_neto: 5041, minoritarios: 49, reservas: 2934 },
      { periodo: '2025', activo_total: 9670, activo_corriente: 3128, pasivo_corriente: 1681, pasivo_total: 3792, fondo_comercio: null, intangibles: 79, inmovilizado_material: 5255, existencias: 1521, clientes: 1516, proveedores: 503, activos_contrato: null, pasivos_contrato: null, caja: 91, deuda_financiera: 1683, arrendamientos: 497, patrimonio_neto: 5853, minoritarios: 25, reservas: 3100 },
    ],
    vencimientos: [
      { anio: '2026', importe: 463 }, { anio: '2027-2028', importe: 1105 }, { anio: '2029-2030', importe: 211 }, { anio: '2031-2032', importe: 162 }, { anio: '2033+', importe: 240 },
    ],
    liquidez: 'Caja 91 M NOK y líneas comprometidas no dispuestas de 1.795 M (revolving de 1.500 M con Handelsbanken, DNB y SEB hasta 2027, más descubiertos de 250 M) a 31-dic-2025 [1]; caja de 125 M al 30-jun-2026 [3].',
    rating: 'A-/Estable (rating de grado de inversión que cita la empresa en su día del inversor; agencia no especificada en el documento) [5]',
    coste_deuda_pct: 7.4,
    vida_media_anios: null,
    otros_pasivos: 'Pensiones: plan neto con superávit de 210 M NOK en otros activos a cierre de 2025 [1]. Pasivos por arrendamiento de 497 M (99 M a corto) [1]. Covenants de la financiación bancaria y del préstamo del NIB cumplidos a 31-dic-2025; los créditos están ligados a objetivos de sostenibilidad (CO₂, accidentes y vertidos al Glomma) que ajustan el margen [1]. Préstamo de LignoTech Florida de 40,8 M USD garantizado al 70 % por la agencia noruega de crédito a la exportación, con garantía proporcional de los socios [1]. Provisión de 30 M en el 2T26 por la estabilización del terreno de Sarpsborg [2]. Compromiso de suscribir hasta 10 M NOK en la reestructuración de Alginor [2]. Derechos antidumping provisionales del 6,54 % sobre la celulosa de alta pureza exportada a EE. UU. desde mayo de 2026 (depósito en efectivo) [2].',
    comentario: 'El balance es conservador: deuda neta con arrendamientos de 2.090 M NOK a cierre de 2025 y 2.141 M en junio de 2026, 1,1-1,2 veces el EBITDA, con un objetivo de 1,0-2,25 veces y un ratio de capital del 59-61 % [1, 2, 5]. El circulante pesa mucho: existencias de 1.521 M (casi todo producto terminado, 1.198 M) y clientes de 1.516 M frente a proveedores de 503 M, un circulante comercial del 33 % de las ventas frente al objetivo del 20 % de la empresa (que lo mide con otra definición) [1, 5]. La deuda bancaria y el bono verde de 500 M son a tipo variable (100 %) [1], así que la subida de tipos en NOK pasa directa a la cuenta. Hasta 2022 la deuda financiera de la serie incluye los arrendamientos (no se desglosan en el XBRL de esos años).',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 1431, capex: 556, pagos_arrendamientos: null, adquisiciones: 145, desinversiones: 0, dividendos: 249, recompras: 118, emision_acciones: 59, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 735, capex: 464, pagos_arrendamientos: null, adquisiciones: 0, desinversiones: 0, dividendos: 499, recompras: 68, emision_acciones: 41, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 1563, capex: 667, pagos_arrendamientos: null, adquisiciones: 171, desinversiones: 0, dividendos: 324, recompras: 92, emision_acciones: 49, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 1068, capex: 711, pagos_arrendamientos: 110, adquisiciones: 150, desinversiones: 19, dividendos: 374, recompras: 98, emision_acciones: 52, intereses_en_financiacion: 0 },
      { periodo: '2025', flujo_operativo: 1356, capex: 793, pagos_arrendamientos: 114, adquisiciones: 132, desinversiones: 18, dividendos: 424, recompras: 30, emision_acciones: 48, intereses_en_financiacion: 0 },
    ],
    comentario: 'El flujo operativo oscila con el circulante: 735 M NOK en 2022 (existencias de 792 M a 1.299 M) y 1.563 M en 2023 [1, 4]. En el 1S26 fue de 772 M frente a 514 M, por la bajada del circulante [2]. La inversión crece: 793 M en inmovilizado en 2025 (576 M de reposición y 217 M de expansión) más 132 M en participadas, y la empresa prevé 900-1.000 M al año en 2026-2029 (550-600 M de reposición, al nivel de la amortización sin NIIF 16, y 300-450 M de expansión) [1, 5]. Las adquisiciones de la serie son aportaciones a Alginor y a otras empresas emergentes de base biológica (551 M invertidos en Alginor en total), hoy deterioradas casi por completo [1, 2]. Los pagos de arrendamiento (principal) se derivan de la nota 12: pagos totales de 147 M en 2025 y 146 M en 2024 menos sus intereses de 33 M y 36 M [1]; 2021-2023 sin dato.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'BioSolutions', descripcion: 'Biopolímeros de lignina (lignosulfonatos) para agricultura, construcción e industria, y biovainillina', tipo_resultado: 'EBITDA', historico: [{ periodo: '2022', ingresos: 4050, resultado: 986 }, { periodo: '2023', ingresos: 3944, resultado: 915 }, { periodo: '2024', ingresos: 4241, resultado: 1104 }, { periodo: '2025', ingresos: 4396, resultado: 1209 }] },
      { nombre: 'BioMaterials', descripcion: 'Celulosa especial (éteres, acetato, nitrocelulosa…) y fibrilas de celulosa', tipo_resultado: 'EBITDA', historico: [{ periodo: '2022', ingresos: 2250, resultado: 427 }, { periodo: '2023', ingresos: 2439, resultado: 534 }, { periodo: '2024', ingresos: 2622, resultado: 434 }, { periodo: '2025', ingresos: 2691, resultado: 495 }] },
      { nombre: 'Fine Chemicals', descripcion: 'Intermedios de química fina para contrastes de rayos X y bioetanol avanzado', tipo_resultado: 'EBITDA', historico: [{ periodo: '2022', ingresos: 632, resultado: 230 }, { periodo: '2023', ingresos: 786, resultado: 332 }, { periodo: '2024', ingresos: 799, resultado: 336 }, { periodo: '2025', ingresos: 670, resultado: 174 }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre segmentos', tipo_resultado: 'EBITDA', historico: [{ periodo: '2022', ingresos: -51, resultado: 0 }, { periodo: '2023', ingresos: -37, resultado: 0 }, { periodo: '2024', ingresos: -45, resultado: 0 }, { periodo: '2025', ingresos: -44, resultado: 0 }] },
    ],
    geografias: [{ nombre: 'Europa', peso_pct: 45 }, { nombre: 'América', peso_pct: 29 }, { nombre: 'Asia', peso_pct: 25 }, { nombre: 'Resto', peso_pct: 1 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen BioSolutions (miles de t secas)', valor_anterior: '327', valor_actual: '330', variacion: '+0,9 %', comentario: 'Guía 2026: 335.000 t; 3T26 ≈ 85.000 t [2, 3]' },
      { kpi: 'Precio medio bruto BioSolutions (NOK/t seca)', valor_anterior: '12.045', valor_actual: '12.027', variacion: '−0,1 %', comentario: '10.770 en el 2T26 por mezcla y divisa [3]' },
      { kpi: 'Volumen BioMaterials (miles de t)', valor_anterior: '159,9', valor_actual: '146,4', variacion: '−8,4 %', comentario: 'Guía 2026: más de 160.000 t [2, 3]' },
      { kpi: 'Precio medio bruto BioMaterials (NOK/t)', valor_anterior: '16.343', valor_actual: '17.678', variacion: '+8,2 %', comentario: 'Baja a 15.889 en el 1S26 (−4 % en divisa de venta) [2, 3]' },
      { kpi: 'Grados muy especializados (% del volumen de celulosa)', valor_anterior: '83 %', valor_actual: '87 %', variacion: '+4 pp', comentario: '[3]' },
      { kpi: 'Efecto de las coberturas en el EBITDA (M NOK)', valor_anterior: '−365', valor_actual: '−174', variacion: '+191', comentario: '+90 M en el 1S26 [3]' },
      { kpi: 'ROCE antes de impuestos (%)', valor_anterior: '17,1', valor_actual: '15,7', variacion: '−1,4 pp', comentario: 'Objetivo > 15 %; 14,4 % LTM jun-26 [1, 2]' },
    ],
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY (Ernst & Young AS)', anios_auditor: null, opinion: 'Favorable (informe del auditor de las cuentas de 2025)',
    comentario: null,
    senales: [
      { senal: 'Deterioros sucesivos de Alginor (225 M en 2025 y 337 M en el 2T26)', nivel: 'Media', comentario: 'La valoración de 2025 suponía escenarios de éxito comercial; medio año después la participación vale cero. Muestra optimismo en la valoración de las participadas, no en el negocio principal [1, 2].' },
      { senal: 'Coberturas de divisa con efecto grande en el EBITDA (−365 M en 2024, +90 M en el 1S26)', nivel: 'Baja', comentario: 'Se informan aparte cada trimestre; mueven el margen de un año a otro sin cambiar el negocio [3].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'gastos_financieros 2021-2023 (intereses sin diferencias de cambio)', tipo: 'Complemento', intentos: '1) XBRL ESEF: solo FinanceCosts con diferencias de cambio; 2) informe anual 2025: solo 2024 y 2025; 3) informes anuales anteriores: enlaces de borregaard.no caídos (404)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'arrendamientos y proveedores 2021-2022', tipo: 'Complemento', intentos: '1) XBRL ESEF 2021-2022 (sin concepto de pasivo por arrendamiento ni de proveedores); 2) informe anual 2025 (solo 2024-2025, y el saldo inicial de 2024); 3) informes anuales 2020-2021 (404)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Borregaard Capital Markets Day 2026: mercados, competidores en celulosa especial (mercado de 2.400 M USD) y ambiciones', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-09-17', url: `${HUB}/Borregaard%20Capital%20Markets%20Day%202026.pdf` },
  { id: 2, titulo: 'Borregaard general presentation - July 2026 (demanda de celulosa especial ≈1,4 Mt; mercados finales; vainillina)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07', url: `${HUB}/Media/InvestorFiles/Q22026/Borregaard%20general%20presentation%20-%20July%202026.pdf` },
  { id: 3, titulo: 'Borregaard Annual Report 2025', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-03-18', url: `${HUB}/Media/Investors/2025%20Annual%20Report.pdf` },
  { id: 4, titulo: 'Kemira Oyj: finances (ventas, EBITDA y EBIT 2025-2027)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/KEMIRA-OYJ-1412476/finances/' },
  { id: 5, titulo: 'Ingevity Corporation: finances (ventas, EBITDA y EBIT 2025-2027)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/INGEVITY-CORPORATION-27724049/finances/' },
  { id: 6, titulo: 'High Purity Dissolving Pulp From Brazil and Norway: Preliminary Affirmative Determinations of Sales at Less Than Fair Value (FR 2026-10527)', editor: 'U.S. Department of Commerce, Federal Register', tipo: 'Primaria', fecha: '2026-05-27', url: 'https://public-inspection.federalregister.gov/2026-10527.pdf' },
  { id: 7, titulo: 'Borregaard 2nd quarter 2026 interim report (antidumping, perspectivas, costes)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/2nd%20quarter%202026%20report.pdf` },
  { id: 8, titulo: 'Ficha sectorial: química de especialidades de la madera (biorrefinería, lignina, celulosa especial, vainillina)', editor: 'Análisis propio (repositorio, sectores/quimica-especialidades-madera-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/quimica-especialidades-madera-2026-10-15.md' },
];
const B = {
  historia: {
    resumen: 'Borregaard nace en 1889 en Sarpsborg (Noruega) como fábrica de celulosa al sulfito de capital británico, y desde 1918 fue noruega; durante un siglo fue la división química de Orkla [3]. En los años noventa y dos mil abandonó el papel y la celulosa genérica y convirtió Sarpsborg en una biorrefinería que aprovecha la celulosa, la lignina y los azúcares de la madera [1, 3]. Salió a bolsa en Oslo en octubre de 2012, separada de Orkla, y desde entonces sigue una estrategia de especialización: más grados de alto valor y menos volumen genérico, lo que ha llevado el margen EBITDA del 19 % de 2012 al 24 % de 2025 y el BPA de 2,76 a 8,67 NOK sin deterioros [1]. En agosto de 2025 Tom Erik Foss-Jacobsen sustituyó como consejero delegado a Per A. Sørlie, que llevaba 35 años en la empresa [3].',
    hitos: [
      { anio: '1889', hito: 'Fundación de la fábrica de celulosa al sulfito de Sarpsborg [3]' },
      { anio: '1986', hito: 'Fusión con Orkla; Borregaard pasa a ser su área química [3]' },
      { anio: '2012', hito: 'Salida a bolsa en Oslo, escindida de Orkla [1]' },
      { anio: '2017', hito: 'LignoTech Florida (55 %): planta de lignina con materia prima de un tercero en EE. UU.; préstamo de 60 M USD [3]' },
      { anio: '2020', hito: 'Cierre de LignoTech South Africa tras la conversión de la línea de Sappi; pérdida de materia prima de lignina [3]' },
      { anio: '2021', hito: 'Primera inversión en Alginor (145 M NOK; biorrefinería de algas) [3]' },
      { anio: '2025', hito: 'Nuevo consejero delegado; deterioro de 225 M en Alginor; petición antidumping de RYAM en EE. UU. contra su celulosa [3, 7]' },
      { anio: '2026', hito: 'Deterioro total de Alginor (337 M); derecho antidumping provisional del 6,54 %; día del inversor con ambición de crecer un 5 % anual y margen EBITDA del 25 % a lo largo del ciclo [1, 6, 7]' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Borregaard es una biorrefinería de madera con una gran planta en Sarpsborg (Noruega) y plantas de lignina en EE. UU., Alemania, España y otros países, que trabajan con lejía de sulfito comprada a papeleras [2, 3]. Del abeto noruego saca tres productos: fibras (45 % del valor: celulosa especial para éteres de celulosa, acetato, nitrocelulosa y tripas de embutido), lignina (30 %: biopolímeros dispersantes y aglutinantes para hormigón, agricultura, piensos, baterías de plomo y cerámica) y azúcares (25 %: bioetanol y la base de la vainillina) [1, 2]. Vende unos 800 productos a 3.100 clientes de 100 países con 120 técnicos comerciales, con fuerte presencia en Europa (45 % de las ventas), América (29 %) y Asia (25 %) [1, 2]. Fine Chemicals añade intermedios para contrastes de rayos X, que fabrica para un único gran cliente farmacéutico (la empresa no lo nombra) [2].',
    como_gana_dinero: 'El negocio es de proceso continuo con costes en NOK y ventas en USD y EUR: la exposición del EBITDA es de unos 268 M USD y 146 M EUR al año [1]. El margen depende de cuatro cosas: el precio y la mezcla de grados especializados (los muy especializados son el 87 % del volumen de celulosa), el coste de la madera (≈866 M NOK en 2025), el de la energía (472 M) y los productos químicos, y la divisa [3]. Un 1 % de precio en BioSolutions mueve el EBITDA unos 40 M y un 1 % de NOK sin coberturas, en torno a 40-45 M [1]. Casi todo es venta recurrente de consumo industrial, sin estacionalidad marcada salvo el cuarto trimestre, más flojo. El apalancamiento operativo es alto: la planta tiene costes fijos y la estrategia es exprimir más valor al mismo volumen de madera.',
    clientes: 'Clientes industriales muy diversos: los diez primeros de BioSolutions suman menos del 30 % de sus ventas y el primero, en torno al 5-10 % (gráfico de la presentación general) [2]. Fine Chemicals depende de un gran cliente farmacéutico de contrastes. El poder de precios se ha demostrado en BioMaterials: el precio medio de la celulosa subió de 14.283 NOK/t en 2022 a 17.678 en 2025 (+24 %) con la inflación de costes [3]; en BioSolutions la especialización compensó la pérdida de lignina sudafricana. En 2026 el poder de precio flojea: −4 % en divisa de venta en BioMaterials en el 1S26 y mezcla peor en BioSolutions [7]. Los contratos son mayoritariamente anuales o de uno a tres años con revisiones de precio.',
  },
  sector: {
    definicion: 'El mercado relevante son tres nichos de química de base biológica: biopolímeros de lignina (lignosulfonatos), celulosa especial de alta pureza y vainillina. La celulosa especial es el único con tamaño publicado: demanda de ≈1,4 Mt en 2025 y un valor de unos 2.400 M USD (≈22.700 M NOK) según Borregaard con datos de Hawkins Wright [1, 2]. De la lignina y la vainillina no hay fuente independiente gratuita con cifra fiable; Borregaard dice ser el mayor productor mundial de biopolímeros de lignina y el único de vainillina de madera [2]. Ámbito mundial. Detalle y perímetro en la ficha sectorial propia [8].',
    tamano: '≈2.400 M USD (≈22.700 M NOK) de celulosa especial en 2025, ≈1,4 Mt de demanda [1, 2]; lignina y vainillina sin cifra independiente',
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Construcción (aditivos de hormigón con lignosulfonatos)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La construcción es el 29 % del volumen de BioSolutions; volumen de construcción estable en 97.000 t en 2024 y 2025 tras caer de 117.000 t en 2022 [1, 3].' },
      { driver: 'Agricultura (micronutrientes, bioestimulantes, fitosanitarios)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercados que crecen un 7-12 % anual según los estudios que cita la empresa; motor de las ventas de 2025 [2, 3].' },
      { driver: 'Sustitución de químicos fósiles por biológicos (vainillina, lignina, éteres)', efecto: '+', horizonte: 'Estructural', evidencia: 'La biovainillina crece ≈5 % anual frente al 2-3 % de la sintética; antidumping de la UE y EE. UU. a la vainillina china [2].' },
      { driver: 'Energía, madera y productos químicos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Impacto neto de −40 M en el 2T26 frente al 2T25 por energía, logística y químicos; madera −15 % [7].' },
      { driver: 'Corona noruega frente a USD y EUR', efecto: '−', horizonte: 'Cíclico', evidencia: 'La empresa espera «presión en el margen los próximos tres años» por la NOK fuerte, suavizada por coberturas y un plan de ahorro de 150 M [1, 7].' },
      { driver: 'Aranceles y antidumping en EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Derecho provisional del 6,54 % a su celulosa (RYAM es el demandante); decisión final prevista en octubre de 2026 [6, 7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Pocos productores en cada nicho: en celulosa especial, Borregaard, RYAM, Sappi, Bracell, AustroCel, Domsjö y Nippon Paper [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes atomizados (3.100); el producto pesa poco en el coste del cliente y requiere homologación [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Madera noruega y energía con precios de mercado; la lignina de fuera de Sarpsborg depende de papeleras (riesgo visto en Sudáfrica) [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Una biorrefinería de sulfito no se replica: la última grande se construyó hace décadas y la tecnología kraft no da la misma lignina [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Policarboxilatos sintéticos en hormigón, vainillina fósil china a menos de 10 USD/kg y celulosa de línteres de algodón [2].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda es industrial y algo cíclica: el volumen de construcción de BioSolutions bajó un 17 % de 2022 a 2024 [3]. En 2020 el EBITDA siguió subiendo (1.132 M) y en 2022-2023 la inflación se trasladó a precio con retraso; el margen tocó máximo en 2023 (25,0 %) [1]. Hoy el ciclo de costes (energía por el conflicto de Oriente Medio) y la corona aprietan el margen mientras los volúmenes aguantan [7].' },
    regulacion: 'Antidumping de EE. UU. a la celulosa de alta pureza de Noruega y Brasil: margen provisional del 6,54 % desde el 27-may-2026; decisión final del Departamento de Comercio prevista para octubre de 2026 y luego la de la ITC sobre el daño [6, 7]. Antidumping de la UE (definitivo desde el 11-jun) y de EE. UU. a la vainillina china, que favorece a la biovainillina [2]. Taxonomía y normas de la UE a favor de productos de base biológica y de la reducción de microplásticos [2]. Cuotas de CO₂ y precios de la electricidad del sur de Noruega afectan a los costes; la empresa tiene objetivos aprobados por SBTi (−42 % de emisiones en 2030) [2].',
    tendencias: 'La tendencia de fondo es la sustitución de químicos fósiles por biológicos en mercados regulados (piensos, cosmética, alimentación, agricultura), que favorece a Borregaard [1, 2]. En contra: la vainillina fósil china barata, los dispersantes sintéticos en hormigón y la caída de la construcción en Europa y China. La empresa aplica IA y sensores al mantenimiento predictivo (≈70 M de efecto acumulado desde 2023) [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.5,
    posicion: 'Mayor productor mundial de biopolímeros de lignina y único de vainillina de madera; en celulosa especial, ≈10 % del volumen mundial (146.000 t de ≈1,4 Mt) en el segmento más especializado [1, 2, 3].',
    competidores: [
      { nombre: 'RYAM (Rayonier Advanced Materials)', pais: 'EE. UU.', ticker: 'RYAM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor productor de celulosa de alta pureza; demandante del antidumping contra Borregaard [1, 6].' },
      { nombre: 'Sappi (Saiccor)', pais: 'Sudáfrica', ticker: 'SAP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Celulosa disolvente sobre todo para viscosa textil; usa el textil como relleno de capacidad [2].' },
      { nombre: 'Bracell', pais: 'Brasil', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Celulosa especial de eucalipto; antidumping provisional del 7,20 % en EE. UU. [1, 6].' },
      { nombre: 'Domsjö (Aditya Birla)', pais: 'Suecia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Biorrefinería de sulfito; competidor también en lignosulfonatos [2].' },
      { nombre: 'Ingevity', pais: 'EE. UU.', ticker: 'NGVT', ingresos: Math.round(1289 * USDNOK), cuota_pct: null, margen_ebit_pct: r1(291.1 / 1289 * 100), comentario: 'Química del pino (lignina kraft y aceite de resina); comparable de la química de la madera [5].' },
      { nombre: 'Kemira', pais: 'Finlandia', ticker: 'KEMIRA', ingresos: Math.round(2754 * EURNOK), cuota_pct: null, margen_ebit_pct: r1(324.4 / 2754 * 100), comentario: 'Química para agua y papel; nórdica con exposición parecida a energía y divisa [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta industrial B2B.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Productos homologados en la fórmula del cliente (piensos, fármacos, alimentación); 800 productos con asistencia técnica [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Saber hacer de aplicación más que patentes; tasa de innovación del 11 % de las ventas (objetivo 15 %) [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Biorrefinería integrada que aprovecha toda la madera; pero coste de energía y madera noruegas y salarios altos [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Nichos pequeños donde una planta nueva no cabe: la demanda de celulosa especial es de 1,4 Mt y la capacidad mundial de 1,6 Mt [2].' },
      ],
    },
    amenazas: 'El foso se estrecharía por tres vías: (1) dispersantes sintéticos y lignina kraft más barata en hormigón y agricultura; (2) productores chinos de vainillina fósil y celulosa de línteres a bajo precio; (3) que los grandes de la celulosa disolvente (Sappi, Bracell) bajen hacia los grados especializados cuando el textil va mal. La probabilidad de que cualquiera de ellas rompa el margen en cinco años es baja-media; la de que lo apriete uno o dos puntos en un año malo, alta [1, 2].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'CDP (clima)', calificacion: 'Lista A (5 % mejor de más de 130.000 empresas)', fecha: '2026-07' }],
    materialidad: 'Lo material es la energía y el CO₂ (177.000 t de alcance 1 y 2 en los últimos doce meses a junio de 2026, +6 % por más producción y menos renovable; objetivo de −42 % en 2030) y los vertidos al río Glomma (47 t/día de DQO frente a menos de 40 en 2030) [7]. La madera viene en un 80 % de Noruega con certificación PEFC/FSC [3]. Los créditos bancarios están ligados a estos objetivos [3].',
    controversias: 'Sin multas relevantes en tres años. Deterioro de Alginor (562 M entre 2025 y 2026) y medidas de estabilización del terreno de Sarpsborg (30 M) [3, 7]. Investigación antidumping en EE. UU. iniciada por RYAM y el sindicato del acero (USW) en agosto de 2025 [7].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño del mercado de lignina y vainillina', tipo: 'Complemento', intentos: '1) presentaciones de la empresa (solo crecimientos por aplicación); 2) búsqueda de estudios de mercado de lignosulfonatos (resúmenes de pago sin cifra verificable); 3) informes de competidores (no publican tamaño)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de RYAM, Sappi, Bracell y Domsjö', tipo: 'Complemento', intentos: '1) MarketScreener y Stock Analysis (bloqueado por Cloudflare); 2) informes de competidores (no leídos por tiempo); 3) prensa sectorial', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Borregaard Annual Report 2025: consejo, dirección, informe de gobierno, nota 9 (remuneración) y nota 30 (accionistas)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-03-18', url: `${HUB}/Media/Investors/2025%20Annual%20Report.pdf` },
  { id: 2, titulo: 'Borregaard 2nd quarter 2026 interim report (recompras, Alginor, firmantes del consejo)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/2nd%20quarter%202026%20report.pdf` },
  { id: 3, titulo: 'Borregaard Capital Markets Day 2026 (objetivos financieros y política de dividendo)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-09-17', url: `${HUB}/Borregaard%20Capital%20Markets%20Day%202026.pdf` },
  { id: 4, titulo: '3rd Quarter 2026 - Borregaard (convocatoria de resultados del 28-oct-2026)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.borregaard.com/investors/ir-news/3rd-quarter-2026-borregaard' },
];
const C = {
  directivos: {
    equipo: [
      { nombre: 'Tom Erik Foss-Jacobsen', cargo: 'Consejero delegado', desde: '2025', participacion_pct: 0.01, trayectoria: 'Consejero delegado desde el 1-ago-2025; antes dirigía la división de celulosa especial y química fina de Borregaard (carrera interna). Su remuneración de 2025 fue de 5,7 M NOK [1].' },
      { nombre: 'Per Bjarne Lyngstad', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Director financiero; presentó las ambiciones financieras del día del inversor de 2026 [1, 3].' },
      { nombre: 'Helge Aasen', cargo: 'Presidente del consejo', desde: null, participacion_pct: null, trayectoria: 'Presidente del consejo y de la comisión de remuneración; ex consejero delegado de Elkem [1].' },
      { nombre: 'Knut-Harald Bakke', cargo: 'Vicepresidente ejecutivo, BioSolutions', desde: null, participacion_pct: null, trayectoria: 'Responsable de BioSolutions, el 56 % de las ventas [1, 3].' },
      { nombre: 'Gisle Løhre Johansen', cargo: 'Vicepresidente ejecutivo, celulosa especial y química fina', desde: null, participacion_pct: null, trayectoria: 'Responsable de BioMaterials y Fine Chemicals [1].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Volumen BioSolutions 335.000 t; BioMaterials > 160.000 t; madera del 2S26 un 3-4 % más barata [2]', real: 'Pendiente (1S26: 172.000 t y 85.600 t)', cumplida: 'Parcial' },
      { anio: '2025', guia: 'ROCE antes de impuestos > 15 %; dividendo del 40-60 % del beneficio [1]', real: 'ROCE 15,7 %; dividendo de 4,75 NOK, 55 % del beneficio sin deterioros [1]', cumplida: 'Sí' },
      { anio: '2024', guia: 'ROCE > 15 %; apalancamiento 1,0-2,25 veces [1]', real: 'ROCE 17,1 %; 1,20 veces [1]', cumplida: 'Sí' },
      { anio: '2021-2025', guia: 'Alginor: planta de demostración y comercialización (inversión de 551 M) [1]', real: 'Retrasos, sobrecostes y valor cero en junio de 2026 [2]', cumplida: 'No' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Helge Aasen', cargo: 'Presidente', tipo: 'Independiente', desde: null, comisiones: 'Remuneración (presidente)' },
      { nombre: 'Terje Andersen', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y sostenibilidad (presidente)' },
      { nombre: 'Tove Andersen', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría y sostenibilidad' },
      { nombre: 'Margrethe Hauge', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Remuneración' },
      { nombre: 'Magnus Krogh Ankarstrand', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Arundel Kristiansen', cargo: 'Consejero elegido por los empleados', tipo: 'Otro externo', desde: null, comisiones: 'Auditoría y sostenibilidad' },
      { nombre: 'Ragnhild Anker Eide', cargo: 'Consejera elegida por los empleados', tipo: 'Otro externo', desde: null, comisiones: 'Remuneración' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false, accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.68, fijo: 3.74, variable_corto: 1.05, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'Salario base, bonus anual (con tope) ligado a objetivos financieros y personales, pensión de aportación y opciones sobre acciones con precio de ejercicio un 10 % por encima de la cotización (1,39 M de opciones vivas a cierre de 2025 a un precio medio de 198 NOK) [1]. El nuevo consejero delegado cobró 5,7 M NOK en 2025 por cinco meses en el cargo más su puesto anterior; el anterior, 7,3 M [1]. No hay plan a largo plazo ligado a ROIC ni a rentabilidad total para el accionista: las opciones premian la cotización. El consejero delegado no tiene pacto de indemnización [1]. Presidente del consejo: 732.000 NOK al año [1].',
    accionistas: [
      { nombre: 'Folketrygdfondet (fondo de pensiones del Estado noruego)', pct: 12.55, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Must Invest', pct: 7.32, tipo: 'Inversor privado', variacion: 'Coinversor en Alginor [2]' },
      { nombre: 'Goldman Sachs Asset Management', pct: 5.72, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Pareto Asset Management', pct: 4.67, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Nordea Investment Management', pct: 4.41, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Vanguard', pct: 3.71, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0.36, tipo: 'Autocartera', variacion: '355.404 acciones a 30-jun-2026 tras recomprar 300.000 en el 2T26 a 145,98 NOK [2]' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el primero es el fondo de pensiones del Estado (12,55 %) y los veinte primeros suman el 71 % [1]. Una acción, un voto; 100 millones de acciones [1]. No hay blindajes estatutarios. El consejo tiene cinco consejeros independientes elegidos por la junta y dos elegidos por los empleados, como manda la ley noruega [1]. La comisión de nombramientos la elige la junta. Operaciones vinculadas: Must Invest, segundo accionista, es coinversor de Borregaard en Alginor, y la reestructuración de 2026 pasa acciones de Borregaard a Hatteland sin contraprestación [2]; no es una transferencia de valor a un consejero, pero conviene vigilarla.',
    alertas: ['Pérdida total de la inversión en Alginor (551 M NOK) en dos años: decisión de asignación de capital fallida, junto a otro accionista significativo [1, 2].', 'Cambio de consejero delegado en agosto de 2025 (sucesión interna anunciada) [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración', tipo: 'Complemento', intentos: '1) informe anual 2025 (no da el recuento); 2) acta de la junta de 2026 en la web (no localizada en la página de comunicados); 3) búsqueda web sin resultado', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos en 12 meses (registro de Oslo Børs)', tipo: 'Complemento', intentos: '1) página de comunicados de la empresa (lista dinámica, no legible sin navegador); 2) Newsweb de Oslo Børs (JavaScript); 3) prensa (sin resultado)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado, consenso, comparables, transacciones
const fD = [
  { id: 1, titulo: 'Históricos diarios de BRG.OL, OSEBX.OL y EXV7.DE (cierre del 14-oct-2026, rango, rentabilidades, beta y cierres de año)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/BRG.OL/history' },
  { id: 2, titulo: 'Borregaard ASA: finances y consenso (ventas, EBITDA, EBIT, BPA y DPA 2021-2028e; 5 analistas; objetivo medio 173,75 NOK)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://www.marketscreener.com/quote/stock/BORREGAARD-ASA-120796940/finances/' },
  { id: 3, titulo: 'Borregaard (BRG): titulares de precios objetivo de Berenberg, Danske Bank, Handelsbanken, SB1 Markets, SEB y DNB Carnegie', editor: 'Nordnet', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.nordnet.no/aksjer/kurser/borregaard-brg-xosl' },
  { id: 4, titulo: 'Government bonds, generic rates: 10 years (14-oct-2026: 4,585 %)', editor: 'Norges Bank', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.norges-bank.no/api/data/GOVT_GENERIC_RATES/B.10Y.GBON?format=csv&lastNObservations=5&locale=en' },
  { id: 5, titulo: 'Euro foreign exchange reference rates (14-oct-2026: 10,6035 NOK/EUR; 1,1195 USD/EUR; 0,9330 CHF/EUR)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Comparables de ingredientes especiales (Croda, Symrise, Kerry) a 14-oct-2026, de MarketScreener', editor: 'Análisis propio (repositorio, sectores/ingredientes-especiales-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/ingredientes-especiales-2026-10-14-comparables.json' },
  { id: 8, titulo: 'Kemira Oyj: finances (2025-2027e) y cotización', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/KEMIRA-OYJ-1412476/finances/' },
  { id: 9, titulo: 'Ingevity Corporation: finances (2025-2027e) y cotización', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/INGEVITY-CORPORATION-27724049/finances/' },
  { id: 10, titulo: 'dsm-firmenich announces agreement to divest Animal Nutrition & Health to CVC Capital Partners (2.200 M EUR, ~7x EBITDA ajustado)', editor: 'dsm-firmenich', tipo: 'Primaria', fecha: '2026-02-09', url: 'https://www.dsm-firmenich.com/anh/news/press-releases/2026/2026-02-09-dsm-firmenich-announces-agreement-to-divest-animal-nutrition-and-health-to-cvc-capital-partners.html' },
  { id: 11, titulo: 'Sika to acquire MBCC Group (5.500 M CHF; 11,5x EBITDA 2022e)', editor: 'Sika AG', tipo: 'Primaria', fecha: '2021-11-11', url: 'https://gbr.sika.com/en/media/news/2021/sika-to-acquire-mbcc-group.html' },
  { id: 12, titulo: 'Anbefalte aksjer uke 37 (Borregaard: PER adelantado 17,1x, a dos años 14,5x; beta 0,6; consenso 4,3 sobre 5)', editor: 'DNB Carnegie', tipo: 'Analistas', fecha: '2026-09-07', url: 'https://content.dnb.no/docs/10912970/anbefalte-aksjer-uke-37.pdf' },
  { id: 13, titulo: 'Borregaard Annual Report 2025: cifras clave históricas (cotización y acciones)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-03-18', url: `${HUB}/Media/Investors/2025%20Annual%20Report.pdf` },
  { id: 15, titulo: 'Borregaard Capital Markets Day 2026 (ambiciones financieras)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-09-17', url: `${HUB}/Borregaard%20Capital%20Markets%20Day%202026.pdf` },
  { id: 14, titulo: 'Borregaard 2nd quarter 2026 interim report (deuda neta y acciones a 30-jun-2026)', editor: 'Borregaard ASA', tipo: 'Primaria', fecha: '2026-07-15', url: `${HUB}/Media/InvestorFiles/Q22026/2nd%20quarter%202026%20report.pdf` },
];
// Comparables en NOK. Kemira (EUR) e Ingevity (USD): acciones = beneficio ÷ BPA 2026e; NTM ≈ 0,2 × 2026e + 0,8 × 2027e (corte a mediados de octubre).
const kem = (() => { const acc = 160 / 1.065, cap = acc * 16.86, dn = 506, ev = cap + dn; const ventasN = 0.2 * 2809 + 0.8 * 2951, ventasL = 0.25 * 2754 + 0.75 * 2809; const ebitdaN = 0.2 * 458.4 + 0.8 * 510.3; const bpaN = 0.2 * 1.065 + 0.8 * 1.368;
  return { nombre: 'Kemira', ticker: 'KEMIRA', pais: 'FI', capitalizacion: Math.round(cap * EURNOK), ev_ventas: +(ev / ventasL).toFixed(2), ev_ebitda_ltm: r1(ev / 524.6), ev_ebitda_ntm: r1(ev / ebitdaN), per_ntm: r1(16.86 / bpaN), crecimiento_pct: r1((ventasN / ventasL - 1) * 100), margen_ebitda_pct: r1(524.6 / 2754 * 100), roic_pct: null, dn_ebitda: +(dn / 524.6).toFixed(2), fcf_yield_pct: r1(131.9 / cap * 100) }; })();
const ngv = (() => { const acc = 156.9 / 4.05, cap = acc * 70.14, dn = 977, ev = cap + dn; const ventasN = 0.2 * 1110 + 0.8 * 1130, ventasL = 0.25 * 1289 + 0.75 * 1110; const ebitdaN = 0.2 * 388 + 0.8 * 414.5; const bpaN = 0.2 * 4.05 + 0.8 * 5.953;
  return { nombre: 'Ingevity', ticker: 'NGVT', pais: 'US', capitalizacion: Math.round(cap * USDNOK), ev_ventas: +(ev / ventasL).toFixed(2), ev_ebitda_ltm: r1(ev / 397.5), ev_ebitda_ntm: r1(ev / ebitdaN), per_ntm: r1(70.14 / bpaN), crecimiento_pct: r1((ventasN / ventasL - 1) * 100), margen_ebitda_pct: r1(397.5 / 1289 * 100), roic_pct: null, dn_ebitda: +(dn / 397.5).toFixed(2), fcf_yield_pct: r1(240 / cap * 100) }; })();
const ficha = JSON.parse(fs.readFileSync(path.join(raiz, 'sectores/ingredientes-especiales-2026-10-14-comparables.json'), 'utf8'));
const deFicha = ficha.empresas.filter((e) => ['Croda', 'Symrise', 'Kerry Group'].includes(e.nombre)).map((e) => ({ ...e, capitalizacion: Math.round(e.capitalizacion * EURNOK) }));
const D = {
  identificacion: {
    nombre: 'Borregaard ASA', nombre_corto: 'Borregaard', ticker: 'BRG', isin: 'NO0010657505', mercado: 'Oslo Børs', indice_referencia: 'OSEBX',
    pais: 'Noruega', pais_iso: 'NO', sector: 'Materiales', industria: 'Química especializada', sede: 'Sarpsborg (Noruega)', fundacion: '1889', empleados: 1177, web: 'www.borregaard.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 99.645, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M NOK/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía 2026 (15-jul-2026): volumen de BioSolutions de 335.000 t (≈85.000 t en el 3T), de BioMaterials de más de 160.000 t (≈40.000 t en el 3T) con más grados muy especializados que en 2025; bioetanol a precios de 2025 con menos entregas; mezcla peor en química fina en el 2S26; madera un 3-4 % más barata en el 2S26 que en el 1S26; divisa con coberturas +45 M en el año [14]. Plan de ahorro de 150 M anuales con efecto completo en 2028 [14]. Ambición del día del inversor (17-sep-2026): crecer un 5 % anual sin divisa a lo largo del ciclo desde 2025, margen EBITDA del 25 % a lo largo del ciclo, ROCE > 15 %, dividendo del 40-60 % del beneficio, y avisa de presión en el margen los próximos tres años por la corona fuerte y los costes de energía [15].',
    estimaciones: [
      { periodo: '2026e', ingresos: 7945, ebitda: 1873, ebit: 1265, bpa: 6.57, dpa: 4.16, fuente: 'MarketScreener, 5 analistas (BPA con el deterioro de Alginor) [2]' },
      { periodo: '2027e', ingresos: 8387, ebitda: 2117, ebit: 1499, bpa: 10.61, dpa: 5.81, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 8761, ebitda: 2219, ebit: 1579, bpa: 11.38, dpa: 6.41, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 4, mantener: 2, vender: 0, po_medio: 173.75, po_min: 165, po_max: 180 },
    revisiones: 'DNB Carnegie (7-sep-2026) atribuye la caída de un 30 % desde agosto de 2025 a los recortes del BPA de 2026, y dice que tras el 2T las estimaciones de 2027 se han estabilizado [12]. SEB subió su objetivo de 165 a 180 NOK en julio y Berenberg a 165 NOK manteniendo «mantener» [3]. MarketScreener da un objetivo medio de 173,75 NOK con 5 analistas [2]; los seis titulares de Nordnet van de 165 a 180 NOK (cuatro comprar, dos mantener) [3]. El consenso de 2027 (EBITDA de 2.117 M, +13 %) parece hecho con tipos de cambio anteriores: la corona se ha apreciado otro 3-5 % desde julio [5].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 222.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 152.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 171.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 182.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 199.4, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null, confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay otra biorrefinería de madera cotizada con el mismo perfil. Se usan dos químicas de la madera o nórdicas con ciclo parecido (Ingevity, química del pino y lignina kraft; Kemira, química nórdica expuesta a energía y divisa) y tres de ingredientes y especialidades con las que comparte clientes de aromas, cosmética, alimentación y agricultura (Croda, Symrise y Kerry), estas tomadas de la ficha sectorial de ingredientes del 14-oct [7]. Quedan fuera RYAM y Lenzing (pérdidas; PER sin sentido), Sappi (papel y celulosa genérica) y Novonesis y Givaudan (crecimiento y márgenes de otra liga). Cifras de MarketScreener pasadas a NOK con el BCE del 14-oct [5, 7, 8, 9].',
    empresas: [kem, ngv, ...deFicha],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2021-11', objetivo: 'MBCC Group (química de construcción, aditivos de hormigón)', comprador: 'Sika', ev: Math.round(5500 * CHFNOK), ev_ventas: null, ev_ebitda: 11.5, prima_pct: null, excluir: false, comentario: '5.500 M CHF; 11,5x el EBITDA 2022e pro forma (8,5x con sinergias) [11]. Cliente-tipo de los lignosulfonatos de construcción.' },
      { fecha: '2026-02', objetivo: 'Animal Nutrition & Health de dsm-firmenich', comprador: 'CVC Capital Partners', ev: Math.round(2200 * EURNOK), ev_ventas: null, ev_ebitda: 7.0, prima_pct: null, excluir: false, comentario: '2.200 M EUR, ~7x el EBITDA ajustado; aditivos de piensos cíclicos de menor margen [10].' },
    ],
    comentario: null, confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones de lignina y celulosa especial con múltiplo', tipo: 'Complemento', intentos: '1) búsqueda de compras de productores de lignosulfonatos y celulosa especial (sin múltiplos publicados); 2) informes de RYAM e Ingevity (no publican el múltiplo de sus ventas de activos); 3) transacciones de otros informes del repositorio (solo dos aplicables)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Finanstilsynet (registro de cortos, tabla dinámica); 2) Nordnet; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Borregaard (BRG): foro de Nordnet Social (mensajes de octubre de 2026)', editor: 'Nordnet', tipo: 'Foros y redes', fecha: '2026-10-10', url: 'https://www.nordnet.no/aksjer/kurser/borregaard-brg-xosl' },
  { id: 2, titulo: 'Borregaard ASA: canal de noticias y análisis (sin comentarios de lectores en el periodo)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-17', url: 'https://seekingalpha.com/api/sa/combined/BRRDF.xml' },
  { id: 3, titulo: 'Dagens aksjetips: DNB Carnegies anbefaling på Borregaard', editor: 'DNB Nyheter', tipo: 'Prensa', fecha: '2026-09', url: 'https://www.dnb.no/dnbnyheter/no/bors-og-marked/dnb-carnegies-anbefaling-pa-borregaard' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Nordnet Social (foro de la acción)', fecha: '2026-10', n_comentarios: 9, tono: 'Positivo', resumen: 'Mayoría alcista: ven la caída de un 40 % desde agosto como punto de entrada y creen que el mercado no descuenta el valor; un mensaje frustrado por la lentitud de la acción; se comenta que Varner Equities ha subido al 0,7 % y se esperan los resultados del 28-oct [1].' },
      { plataforma: 'Seeking Alpha (BRRDF/BRGAY)', fecha: '2026-09', n_comentarios: 0, tono: 'Neutro', resumen: 'Solo transcripciones del 2T26 y del día del inversor, sin debate de lectores [2].' },
      { plataforma: 'DNB Nyheter (recomendación con comentarios de prensa)', fecha: '2026-09', n_comentarios: 0, tono: 'Positivo', resumen: 'Recomendación de compra de DNB Carnegie tras «volver a la senda» con el 2T26 [3].' },
    ],
    temas: [
      { tema: 'Caída de la acción como oportunidad de compra', postura: 'Alcista', peso: 'Alto', contraste: 'El precio (147,4 NOK) está un 26 % por debajo del máximo de 52 semanas, pero el BPA normalizado de 2026 también baja: el abaratamiento es en parte real (corona, energía), no solo de múltiplo.' },
      { tema: 'Resultados del 3T26 (28-oct)', postura: 'Dividida', peso: 'Medio', contraste: 'La guía de volúmenes es buena; el riesgo está en el precio y la mezcla de BioSolutions y en la divisa, que el foro apenas menciona.' },
      { tema: 'Entrada de inversores conocidos (Varner)', postura: 'Alcista', peso: 'Bajo', contraste: 'Una participación del 0,7 % no cambia la tesis; no se usa como dato.' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'foros con debate amplio (Reddit, Stocktwits, Hegnar/Finansavisen)', tipo: 'Complemento', intentos: '1) API de Stocktwits (BRGAY y BRRDF: 0 mensajes); 2) RSS de Seeking Alpha (sin comentarios); 3) búsqueda de foros noruegos (sin hilos abiertos legibles)', decision: 'Omitido' }],
};
guarda('E', E);
console.log('Notas A-E escritas. Kemira:', kem, 'Ingevity:', ngv);
