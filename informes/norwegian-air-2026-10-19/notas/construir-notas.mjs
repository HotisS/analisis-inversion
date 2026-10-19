// Escribe las notas A-E de Norwegian Air Shuttle ASA (NAS.OL, Euronext Oslo Børs; corte 2026-10-19).
// Fuentes primarias: informe anual integrado 2025 (10-abr-2026), informes trimestrales 2T25, 3T25, 4T25, 1T26 y 2T26,
// presentaciones de resultados, cifras de tráfico de septiembre de 2026, comunicados de la bolsa de Oslo (NewsWeb:
// api3.oslo.oslobors.no), convocatorias y actas de las juntas de 2026, XBRL ESEF de 2021-2024 (filings.xbrl.org),
// registro de posiciones cortas de Finanstilsynet y Norges Bank (bono a 10 años). Mercado: Yahoo Finance y MarketScreener.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/norwegian-air-2026-10-19/notas/construir-notas.mjs
// Ejercicio natural (31-dic). Cifras en millones de NOK salvo que se diga otra cosa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const NW = (m, a) => `https://api3.oslo.oslobors.no/v1/newsreader/attachment?messageId=${m}&attachmentId=${a}`;
const NM = (m) => `https://newsweb.oslobors.no/message/${m}`;
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Integrated Annual Report 2025: estados consolidados 2025 y 2024, notas 4 (Widerøe), 6 (segmentos), 7-9, 10 (otras pérdidas y ganancias), 12 (impuestos), 13-16, 22, 26 (deuda), 32 (compromisos de aviones) y política de dividendos', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-10', url: NW(670345, 323105) },
  { id: 2, titulo: 'Second quarter 2026 financial report (2T26 y 1S26: cuenta, balance a 30-jun-2026, flujos, notas 2-14)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-14', url: NW(678122, 329635) },
  { id: 3, titulo: 'First quarter 2026 financial report', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-28', url: NW(671581, 324158) },
  { id: 4, titulo: 'Fourth quarter 2025 financial report', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-02-13', url: NW(665745, 318957) },
  { id: 5, titulo: 'Third quarter 2025 financial report', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-10-22', url: NW(657627, 313047) },
  { id: 6, titulo: 'Second quarter 2025 financial report (con 2T24 y 1S24 comparativos)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-07-11', url: NW(651084, 308214) },
  { id: 7, titulo: 'Informes anuales ESEF 2021-2024 en XBRL (cuenta, balance y flujos; conceptos NOR: de amortización, EBITDAR, intereses pagados y reversión del deterioro de anticipos de 2022)', editor: 'XBRL International (filings.xbrl.org) / Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-04-10', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=549300IEUH2FEM2Y6B51' },
  { id: 8, titulo: 'Q2 2026 presentation (combustible, coste unitario, reservas, NLTG)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-14', url: NW(678122, 329636) },
  { id: 9, titulo: 'Traffic figures September 2026 (incluye coberturas de combustible por trimestre)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-10-06', url: NW(683613, 334196) },
  { id: 10, titulo: 'Norwegian agrees to acquire Nordic Leisure Travel Group (comunicado y presentación a inversores)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-16', url: NW(676265, 328263) },
  { id: 11, titulo: 'Norwegian Group delivers record result for 2025 and increases dividend', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-02-13', url: NM(665745) },
  { id: 12, titulo: 'Norwegian orders 30 Boeing 737 aircraft', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-09-26', url: NM(656201) },
  { id: 13, titulo: 'Defeasance of the NOK 3,156 million Zero-Coupon Bonds; dividend following strong second quarter', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-07-11', url: NM(651120) },
  { id: 14, titulo: 'Completion of share buy-back (2.000.000 acciones; 4.328.636 en autocartera)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-03-12', url: NM(668236) },
  { id: 15, titulo: 'Norwegian Air Shuttle ASA, Notice of Extraordinary General Meeting 2026 (condiciones de las acciones de contraprestación de NLTG)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-17', url: NW(676411, 328377) },
];

const cuenta = [
  { periodo: '2021', ingresos: 5068, coste_ventas: 1413.8, gastos_generales: null, ebitda: -1516, amortizaciones: 1270, ebit: -2786, resultado_financiero: 4662, bai: 1876, impuestos: 5.5, minoritarios: 0, beneficio_neto: 1871, gastos_financieros: 682, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -737.5, bpa: 2.68, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 698 },
  { periodo: '2022', ingresos: 18869, coste_ventas: 7371.4, gastos_generales: null, ebitda: 2363.4, amortizaciones: 861.1, ebit: 1502, resultado_financiero: -455.9, bai: 1046, impuestos: 41, minoritarios: 0, beneficio_neto: 1006, gastos_financieros: 650, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -7.3, bpa: 0.89, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1130 },
  { periodo: '2023', ingresos: 25539, coste_ventas: 7714.7, gastos_generales: null, ebitda: 5754.1, amortizaciones: 3522, ebit: 2232, resultado_financiero: -428.2, bai: 1804, impuestos: 66.9, minoritarios: 0, beneficio_neto: 1737, gastos_financieros: 848, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 35.1, bpa: 1.54, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 1128 },
  { periodo: '2024', ingresos: 35317, coste_ventas: 9376.8, gastos_generales: null, ebitda: 6906.6, amortizaciones: 5034, ebit: 1872.6, resultado_financiero: -517.6, bai: 1355, impuestos: 0, minoritarios: 0, beneficio_neto: 1355, gastos_financieros: 1135, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 291, bpa: 1.2, dpa: 0.9, dpa_extraordinario: 0, acciones_diluidas: 1129 },
  { periodo: '2025', ingresos: 37646, coste_ventas: 9573, gastos_generales: null, ebitda: 7887, amortizaciones: 4155, ebit: 3732, resultado_financiero: -716, bai: 3016, impuestos: 308, minoritarios: 0, beneficio_neto: 2708, gastos_financieros: 1271, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -409, bpa: 2.49, dpa: 0.8, dpa_extraordinario: 0, acciones_diluidas: 1086 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 38087, ebitda: 6673, ebit: 2269, beneficio_neto: 1617, bpa: 1.5, dpa: 0.8, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 545 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Widerøe consolidada desde el 12-ene-2024 (compra por 1.020 M NOK en caja; aportó 7.241 M de ingresos en 2024): 2024 no es comparable con 2023 [1].' },
    ],
    comentario: 'Los ingresos pasan de 5.068 M en 2021 (pandemia y reconstrucción) a 37.646 M en 2025 [1, 7]. El salto de 2023 a 2024 (+38 %) es sobre todo inorgánico: Widerøe aportó 7.241 M; sin ella, Norwegian creció un 11 % (28.344 M) y en 2025 un 6 % (30.092 M) [1]. El EBITDA del informe es el EBITDAR de la empresa (con NIIF 16 el alquiler de aviones va a amortización e intereses): 5.754 M en 2023, 6.907 M en 2024 y 7.887 M en 2025; sin «otras pérdidas (ganancias)» de tipo de cambio, 7.478 M (19,9 % de margen) [1]. El EBIT récord de 2025 (3.732 M) lleva dentro 409 M de ganancias de cambio y 858 M de plusvalías por comprar 13 Boeing 737-800 que tenía en arrendamiento, apuntadas como menor amortización: el EBIT subyacente es ≈ 2.465 M (6,5 %) [1]. En 2026 el combustible (+33 % en el 2T) y la multa del EU ETS de 2020 (733 M, no deducible) llevan el 1S a −824 M de EBIT [2]. El combustible pesa un 25-39 % de los costes operativos según el trimestre [2].',
    ajustes: 'Cifras publicadas NIIF. Partidas no recurrentes del EBITDA (gasto en positivo): «otras pérdidas (ganancias)» de cada año, sobre todo diferencias de cambio de pasivos operativos en USD (2021: −737,5; 2022: −7,3; 2023: +35,1; 2024: +291; 2025: −409; LTM: +545, con la pérdida del EU ETS de 733 M) [1, 2, 7]. Debajo del EBITDA hay dos partidas más que no se repiten: la reversión de 2.099 M del deterioro de anticipos de aviones en 2022 (acuerdo con Boeing), que se resta de la amortización de ese año (861 M netos frente a 2.960 M brutos), y las plusvalías de 858 M (2025) y 95 M (2T26) por comprar aviones arrendados, que reducen la línea de arrendamiento y amortización [1, 2, 7]. El BPA de 2025 sin esas ganancias (409 + 858 M antes de impuestos) sería ≈ 1,58 NOK frente a 2,49 publicado (estimación propia con el 22 %). El BPA de 2021 lleva ganancias de la reconstrucción en el resultado financiero (+4.662 M) [7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 11594, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3578, margen_ebitda_pct: 30.9, bpa: 1.78, vs_consenso: null },
      { periodo: '4T24', ingresos: 8232, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1179, margen_ebitda_pct: 14.3, bpa: -0.27, vs_consenso: null },
      { periodo: '1T25', ingresos: 6582, crecimiento_pct: 7.1, crecimiento_organico_pct: null, ebitda: 61, margen_ebitda_pct: 0.9, bpa: -0.82, vs_consenso: null },
      { periodo: '2T25', ingresos: 10289, crecimiento_pct: 10.1, crecimiento_organico_pct: null, ebitda: 2609, margen_ebitda_pct: 25.4, bpa: 0.82, vs_consenso: null },
      { periodo: '3T25', ingresos: 12252, crecimiento_pct: 5.7, crecimiento_organico_pct: null, ebitda: 3986, margen_ebitda_pct: 32.5, bpa: 2.41, vs_consenso: null },
      { periodo: '4T25', ingresos: 8522, crecimiento_pct: 3.5, crecimiento_organico_pct: null, ebitda: 1230, margen_ebitda_pct: 14.4, bpa: -0.02, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 6904, crecimiento_pct: 4.9, crecimiento_organico_pct: null, ebitda: 904, margen_ebitda_pct: 13.1, bpa: -0.34, vs_consenso: null },
      { periodo: '2T26', ingresos: 10408, crecimiento_pct: 1.2, crecimiento_organico_pct: null, ebitda: 553, margen_ebitda_pct: 5.3, bpa: -0.53, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'En el 1T26 (28-abr) la dirección habló de una «mejora significativa»: EBIT de −220 M frente a −611 M, ocupación récord del 87,6 % y liquidez de 14.200 M, con ayuda de la corona fuerte, las coberturas de combustible y el precio bajo de los derechos de emisión [3]. En el 2T26 (14-jul) el tono cambió: EBIT de −603 M (213 M sin otras pérdidas), combustible +33 % por el cierre del estrecho de Ormuz, pérdida de 733 M por el EU ETS de 2020 y demanda «algo más floja de lo esperado» en abril-mayo por la Semana Santa temprana y el miedo a la escasez de queroseno [2, 8]. La dirección insistió en el coste: coste unitario sin combustible de 0,48 NOK, −5 %, y guía de coste unitario subyacente sin combustible plano en 2026 (antes, subida de un dígito bajo) [2]. Reservas de julio-octubre por delante de 2025 (160.000 billetes más) con rendimiento casi plano [8]. La compra de NLTG ocupó buena parte de la presentación [8]. No dio guía de beneficio ni de combustible para 2027: solo que tiene cubierto el 25 % del consumo del 1S27 a 661 USD/t y el 18 % del 2S27 a 660 USD/t [9], con el queroseno spot muy por encima.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 18825, activo_corriente: 9864, pasivo_corriente: 6068, pasivo_total: 15556, fondo_comercio: null, intangibles: 200.9, inmovilizado_material: null, existencias: 16.3, clientes: 2153, proveedores: 3783, activos_contrato: null, pasivos_contrato: null, caja: 7695, deuda_financiera: 4165, arrendamientos: 5213, patrimonio_neto: 3270, minoritarios: 0, reservas: -25029.8 },
      { periodo: '2022', activo_total: 22670, activo_corriente: 10045, pasivo_corriente: 7624, pasivo_total: 18466, fondo_comercio: null, intangibles: 180.2, inmovilizado_material: null, existencias: 81.3, clientes: 2185, proveedores: 3651, activos_contrato: null, pasivos_contrato: null, caja: 7759, deuda_financiera: 4249, arrendamientos: 5837, patrimonio_neto: 4203, minoritarios: 0, reservas: -24117.1 },
      { periodo: '2023', activo_total: 30550, activo_corriente: 13044, pasivo_corriente: 8961, pasivo_total: 24777, fondo_comercio: null, intangibles: 189.1, inmovilizado_material: 10580.7, existencias: 260, clientes: 2313, proveedores: 3859, activos_contrato: null, pasivos_contrato: null, caja: 9478, deuda_financiera: 3745, arrendamientos: 10280, patrimonio_neto: 5773, minoritarios: 0, reservas: -22526.9 },
      { periodo: '2024', activo_total: 37600, activo_corriente: 15254, pasivo_corriente: 13125, pasivo_total: 30359, fondo_comercio: 213, intangibles: 1307, inmovilizado_material: 19403, existencias: 502, clientes: 2899, proveedores: 4860, activos_contrato: null, pasivos_contrato: null, caja: 9868, deuda_financiera: 4753, arrendamientos: 11325, patrimonio_neto: 7241, minoritarios: 0, reservas: -21359 },
      { periodo: '2025', activo_total: 42031, activo_corriente: 14513, pasivo_corriente: 14028, pasivo_total: 34364, fondo_comercio: 213, intangibles: 1082, inmovilizado_material: 24791, existencias: 566, clientes: 3129, proveedores: 5520, activos_contrato: null, pasivos_contrato: null, caja: 7434, deuda_financiera: 5847, arrendamientos: 13704, patrimonio_neto: 7668, minoritarios: 0, reservas: -18892 },
    ],
    vencimientos: [
      { anio: '2026', importe: 2065 },
      { anio: '2027', importe: 700 },
      { anio: '2028+', importe: 3082 },
    ],
    liquidez: 'Caja 11.041 M + inversiones financieras 2.659 M (1.532 M de depósito para el bono de reclamaciones retenidas que vencía el 30-sep-2026 y 1.127 M en fondos de renta fija) = 13.700 M a 30-jun-2026; incluye 8.621 M de billetes cobrados por adelantado (estacional) [2].',
    rating: 'Sin rating público (la deuda es financiación de aviones con garantía de agencias de crédito a la exportación y un préstamo a plazo) [1].',
    coste_deuda_pct: 6.4,
    vida_media_anios: null,
    otros_pasivos: 'Pasivos que no son deuda pero pesan: provisión de mantenimiento periódico de 4.077 M a cierre de 2025 (devoluciones de aviones arrendados) [1]; obligaciones por pensiones de 418 M [1]; billetes cobrados por adelantado de 4.396 M a diciembre y 8.621 M a junio, que se consumen en el 2S [2]; la obligación de entregar 372.818 derechos de emisión de 2020 tras perder el pleito del EU ETS (pérdida de 733 M en el 2T26; la multa de ≈ 400 M ya se pagó en 2023) [2]. Compromisos de compra de aviones de 45.062 M (78 Boeing 737 MAX 8 hasta 2031: 3.838 M en 2026, 8.114 M en 2027, 7.862 M en 2028, 6.249 M en 2029, 11.843 M en 2030 y 7.156 M después) [1]. Covenants solo en la financiación de Widerøe (capital ≥ 20 %, deuda neta/EBITDAR < 2,4), cumplidos [1]. La compra de NLTG añade un pago en caja de 3.500 M SEK, financiado con caja, un bono nuevo y otras fuentes [10].',
    comentario: 'El capital circulante es negativo: los billetes cobrados por adelantado (4.396 M a cierre de 2025) y los proveedores (5.520 M) superan con mucho a clientes y existencias [1]. La deuda financiera sin arrendamientos sube de 3.745 M (2023) a 5.847 M (2025) porque la empresa compra aviones en vez de arrendarlos (13 737-800 en 2025 y los primeros MAX en propiedad); los arrendamientos suben a 13.704 M por las altas de aviones [1]. La deuda neta con arrendamientos e inversiones financieras fue de 9.491 M a cierre de 2025 y de 5.264 M a 30-jun-2026, con la caja estacional del verano [2]. En julio de 2025 la empresa depositó el importe del bono cupón cero de 3.156 M para liberarse de sus restricciones y empezar a pagar dividendos [13]. El patrimonio neto es pequeño (6.660 M, 14,2 % del activo a junio) porque arrastra 25.000 M de pérdidas de la reconstrucción de 2020-21 [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 139.1, capex: 14.8, pagos_arrendamientos: 52, adquisiciones: 0, desinversiones: 237.5, dividendos: 377.7, recompras: 0, emision_acciones: 5862.9, intereses_en_financiacion: 240.1 },
      { periodo: '2022', flujo_operativo: 2425.7, capex: 48.6, pagos_arrendamientos: 891.4, adquisiciones: 0, desinversiones: 72.7, dividendos: 7.6, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 443.7 },
      { periodo: '2023', flujo_operativo: 5257.5, capex: 542.4, pagos_arrendamientos: 1460.2, adquisiciones: 0, desinversiones: 7.8, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 745.1 },
      { periodo: '2024', flujo_operativo: 6946, capex: 1247.7, pagos_arrendamientos: 1839.9, adquisiciones: 1020, desinversiones: 138.8, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 1029.8 },
      { periodo: '2025', flujo_operativo: 7840, capex: 5450, pagos_arrendamientos: 1780, adquisiciones: 0, desinversiones: 530, dividendos: 950, recompras: 948, emision_acciones: 0, intereses_en_financiacion: 1063 },
    ],
    comentario: 'La caja de explotación (7.840 M en 2025) parece alta, pero va antes de intereses y del principal de los arrendamientos, que la empresa clasifica en financiación (1.063 M y 1.780 M en 2025) [1, 7]. El capex de 2025 (5.450 M: compras de inmovilizado, intangibles y anticipos a Boeing) incluye la compra de 13 aviones que ya operaba en arrendamiento, que sustituye pagos de alquiler futuros [1]. Las altas de aviones en arrendamiento no pasan por el capex (los pasivos por arrendamiento subieron 2.400 M en 2025 pese a pagar 1.780 M) [1]. Por eso el DCF usa un capex que incluye las altas de derechos de uso. Con los compromisos con Boeing (8.114 M en 2027 y 7.862 M en 2028) [1], la inversión total en flota de 2027-2030 será de ≈ 15-18 % de las ventas (estimación propia), frente a una amortización de ≈ 12 %. En 2021 el XBRL clasifica 377,7 M como dividendos pagados, aunque a los accionistas no se les pagó dividendo hasta agosto de 2025 [1, 7]. Las «recompras» de 2025 son la recompra de los bonos perpetuos convertibles (900 M) y 48 M de acciones propias [1].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers AS',
    anios_auditor: null,
    opinion: 'Favorable (informe de auditoría de 2025 incluido en el informe anual, sin salvedades mencionadas en las notas) [1]',
    comentario: 'Tres asuntos de juicio contable mueven el resultado. Primero, las plusvalías por comprar aviones que la empresa tenía en arrendamiento se apuntan como menor amortización (858 M en 2025, 95 M en 2026), lo que infla el EBIT y el coste unitario «limpio» si no se ajustan [1, 2]. Segundo, los impuestos: el gasto fiscal fue del 10 % en 2025 y del 0 % en 2024 porque Norwegian reconoce créditos fiscales por pérdidas pasadas por tramos (1.579 M activados y 526 M sin reconocer) [1]; el beneficio normalizado al 22 % es menor. Tercero, la cobertura de combustible pasa por patrimonio: el patrimonio cayó 2.412 M en el 2T26 por la valoración de las coberturas y el dividendo [8]. Las «otras pérdidas (ganancias)» por cambio de divisa son grandes y cambian de signo cada año (+291 M en 2024, −409 M en 2025) [1]. Los indicadores del motor deben leerse con cuidado: el patrimonio arrastra pérdidas acumuladas de la reconstrucción (reservas de −18.892 M), lo que hunde el Altman Z sin que haya hoy riesgo de liquidez (13.700 M de liquidez) [1, 2].',
    senales: [
      { senal: 'Plusvalías por compra de aviones arrendados dentro de la amortización (858 M en 2025)', nivel: 'Media', comentario: 'Suben el EBIT de 2025 un 30 %; no se repiten al mismo nivel [1].' },
      { senal: 'Tipo impositivo efectivo del 0-10 % por créditos fiscales', nivel: 'Media', comentario: 'Quedan 526 M de créditos sin reconocer; a medio plazo el tipo vuelve al 22 % [1].' },
      { senal: 'Pérdida del pleito del EU ETS de 2020 (733 M en el 2T26)', nivel: 'Baja', comentario: 'Asunto heredado de la reconstrucción, cerrado por el Tribunal Supremo el 25-jun-2026 [2].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Los dividendos no se pagan si el patrimonio no es adecuado [1]. Tras liberar el bono cupón cero en julio de 2025, Norwegian pagó su primer dividendo (0,90 NOK por acción en agosto de 2025, con el fondo de dividendos de 2022 y 2023) y propuso 0,80 NOK por 2025 (844 M, un 31 % del beneficio), pagado en mayo de 2026 [1, 11]. El dividendo de 2024 (0,60 NOK) se destinó a recomprar los bonos perpetuos convertibles en mayo de 2025 [1]. Hace recompras pequeñas para los planes de empleados (3 M de acciones en noviembre de 2025 y 2 M en marzo de 2026) [14]. La prioridad de la caja es la flota: 78 Boeing 737 MAX 8 pendientes hasta 2031 (45.062 M de compromisos) [1, 12] y, desde junio de 2026, el pago en caja de NLTG [10].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Widerøe AS (aerolínea regional noruega, 48 aviones)', importe: 1020, ev_ebitda: null, financiacion: 'Caja', resultado: 'Bueno: aportó 524 M de beneficio neto en 2025 y 585 M de EBIT; precio de 1.020 M, menos de dos veces el beneficio de un año [1].' },
      { anio: '2026', objetivo: 'Nordic Leisure Travel Group (Ving, Spies, Tjäreborg, Globetrotter, Sunclass; 26 hoteles)', importe: 7543, ev_ebitda: 6.6, financiacion: '3.500 M SEK en caja + 300 M de acciones nuevas (≈ 28 % de dilución)', resultado: 'Pendiente de cierre (aprobación de competencia de la UE; previsto en el 4T26). EV/EBITDA SGAAP de 6,6x con los datos de la empresa [10, 15].' },
    ],
    comentario: 'La dirección ha asignado bien el capital desde 2021: compró Widerøe por 1.020 M y ha devuelto valor con la recompra de los convertibles y dos dividendos [1]. La compra de aviones arrendados en 2025 ahorra ≈ 200 M al año [1]. Dos decisiones elevan el riesgo: el pedido ampliado a 80 MAX (45.062 M de compromisos, más de cuatro veces la capitalización) y NLTG, pagada con un 28 % de acciones nuevas emitidas a 14,95 NOK de referencia cuando la acción cotiza hoy a 11,05 NOK [10, 12]. La dilución histórica es enorme (de 2,5 M a 1.055 M de acciones en la reconstrucción) [7].',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Norwegian', descripcion: 'Aerolínea de bajo coste de corto y medio radio: 95 Boeing 737, rutas nacionales en Noruega y de los países nórdicos a Europa.', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 5068, resultado: -2786 }, { periodo: '2022', ingresos: 18869, resultado: 1502 }, { periodo: '2023', ingresos: 25539, resultado: 2232 }, { periodo: '2024', ingresos: 28344, resultado: 1373 }, { periodo: '2025', ingresos: 30092, resultado: 3159 }] },
      { nombre: 'Widerøe', descripcion: 'Aerolínea regional noruega: 47 turbohélices Dash 8 y 3 Embraer E190-E2; rutas de servicio público (PSO) pagadas por el Estado.', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 7241, resultado: 499 }, { periodo: '2025', ingresos: 7903, resultado: 585 }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre segmentos (asistencia en tierra de Widerøe a Norwegian).', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: -269, resultado: 0 }, { periodo: '2025', ingresos: -349, resultado: -12 }] },
    ],
    geografias: [
      { nombre: 'Noruega', peso_pct: 49.9 }, { nombre: 'España', peso_pct: 12.7 }, { nombre: 'Dinamarca', peso_pct: 8.8 }, { nombre: 'Suecia', peso_pct: 8.6 },
      { nombre: 'Reino Unido', peso_pct: 3.2 }, { nombre: 'Finlandia', peso_pct: 2.5 }, { nombre: 'Italia', peso_pct: 2.4 }, { nombre: 'Otros', peso_pct: 11.9 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Pasajeros del grupo (millones)', valor_anterior: '26,4 (2024)', valor_actual: '27,3 (2025)', variacion: '+3 %', comentario: 'Norwegian 23,1 M y Widerøe 4,1 M [1].' },
      { kpi: 'Pasajeros de Norwegian, 12 meses móviles (millones)', valor_anterior: '23,12 (sep-25)', valor_actual: '23,76 (sep-26)', variacion: '+3 %', comentario: 'Ocupación de 12 meses del 86,1 % (+0,7 pp) [9].' },
      { kpi: 'Coste unitario sin combustible de Norwegian (NOK/AKO)', valor_anterior: '0,50 (2T25)', valor_actual: '0,48 (2T26)', variacion: '−5 %', comentario: 'Programa X; 2025 ajustado por las plusvalías: 0,52 [1, 2].' },
      { kpi: 'Ingresos complementarios por pasajero de Norwegian (NOK)', valor_anterior: '205 (2T25)', valor_actual: '208 (2T26)', variacion: '+1 %', comentario: 'Equipaje, asientos y prioridad [2].' },
      { kpi: 'Combustible cubierto (consumo previsto y precio)', valor_anterior: '4T26: 55 % a 759 USD/t', valor_actual: '1S27: 25 % a 661 USD/t; 2S27: 18 % a 660 USD/t', variacion: 'menos cobertura en 2027', comentario: 'Política: hasta 25 % a 36 meses [1, 9].' },
      { kpi: 'Flota del grupo (aviones)', valor_anterior: '141 (2T25)', valor_actual: '145 (2T26)', variacion: '+4', comentario: '95 de Norwegian (36 MAX 8) y 50 de Widerøe [2].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Crecimiento interanual de 3T24 y 4T24', tipo: 'Complemento', intentos: '1) Informes del 3T25 y 4T25 (solo dan 2024 y 2025); 2) XBRL ESEF (solo anual); 3) Widerøe entra en enero de 2024 y rompe la comparación con 2023', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'Consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Informes de la empresa (no lo publican desde 2023); 2) MarketScreener (solo el vigente); 3) prensa (RTE/Reuters: 4T25 «por debajo de lo previsto» y 2T26 «pérdida mayor de la esperada»)', decision: 'Omitido salvo 4T25 y 2T26' },
    { seccion: 'balance', campo: 'Inmovilizado material de 2021 y 2022', tipo: 'Complemento', intentos: '1) XBRL ESEF 2021-2022 (conceptos propios sin total); 2) informe anual 2025 (solo 2024 y 2025); 3) suma de partidas (falta el detalle de derechos de uso)', decision: 'Omitido' },
  ],
};

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Integrated Annual Report 2025: modelo de negocio, red de rutas, flota, programa X, riesgos y clima', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-10', url: NW(670345, 323105) },
  { id: 2, titulo: 'Ficha sectorial corta: aerolíneas europeas de pasajeros (Eurostat 2025 vía Cyprus Mail, IATA, CAPA)', editor: 'analisis-inversion (sectores/aerolineas-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/HotisS/analisis-inversion/blob/main/sectores/aerolineas-2026-10-14.md' },
  { id: 3, titulo: 'IATA Jet Fuel Price Monitor (media mundial semanal: 192,44 USD/barril)', editor: 'IATA', tipo: 'Sectorial', fecha: '2026-10-19', url: 'https://www.iata.org/en/publications/economics/fuel-monitor/' },
  { id: 4, titulo: 'Aviation fuel spotlight: oil is flowing but Jet-A didn’t get the memo (septiembre de 2026)', editor: 'GlobalAir.com', tipo: 'Prensa', fecha: '2026-10-02', url: 'https://www.globalair.com/articles/aviation-fuel-spotlight-oil-is-flowing-but-jet-a-didnt-get-the-memo/12728' },
  { id: 5, titulo: 'Hormuz supply squeeze lifts jet fuel prices to 10-year high', editor: 'AGBI', tipo: 'Prensa', fecha: '2026-03-25', url: 'https://www.agbi.com/analysis/aviation/2026/03/hormuz-supply-squeeze-lifts-jet-fuel-prices-to-10‑year-high/' },
  { id: 6, titulo: 'NLTG acquisition investor presentation (mercado nórdico de viajes de ocio, cifras de NLTG)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-16', url: NW(676265, 328263) },
  { id: 7, titulo: 'Fichas de Yahoo Finance de Ryanair, easyJet, Wizz Air, IAG, Lufthansa, Air France-KLM, Jet2 y Finnair (márgenes y estimaciones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/RYA.IR/' },
  { id: 8, titulo: 'Norwegian will appeal EU ETS ruling to the Supreme Court / Supreme Court decide not to admit EU ETS appeal', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-25', url: NM(677062) },
  { id: 9, titulo: 'Norwegian Air adds 120 flights after SAS cancellations', editor: 'Reuters', tipo: 'Prensa', fecha: '2026-03-18', url: 'https://www.reuters.com/business/aerospace-defense/' },
  { id: 10, titulo: 'Second quarter 2026 financial report (riesgos, perspectivas, ingresos por país)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-14', url: NW(678122, 329635) },
  { id: 11, titulo: 'Airlines may face renewed jet fuel cost pressure as Hormuz disruption continues', editor: 'New Straits Times', tipo: 'Prensa', fecha: '2026-07-15', url: 'https://www.nst.com.my/amp/business/economy/2026/07/1478624/airlines-may-face-renewed-jet-fuel-cost-pressure-hormuz-disruption' },
  { id: 12, titulo: 'The Rise, Fall and Return of Norwegian', editor: 'Flightradar24', tipo: 'Prensa', fecha: '2026-01-22', url: 'https://www.flightradar24.com/blog/' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Norwegian nació en 1993 como aerolínea regional que volaba para Braathens y se convirtió en aerolínea de bajo coste en 2002, cuando Braathens se fusionó con SAS [1]. Creció muy deprisa: largo radio con Boeing 787 desde 2013, bases en España, Reino Unido, Argentina y EE. UU., y una deuda que la llevó al borde de la quiebra antes de la pandemia [12]. En 2020-21 se reestructuró en Irlanda (examinership) y Noruega: los acreedores convirtieron deuda en acciones, cerró el largo radio y salió de la reconstrucción en mayo de 2021 como aerolínea nórdica de corto radio con 51 aviones [1, 12]. Desde entonces ha vuelto a beneficios (2022-2025), compró Widerøe en 2024, encargó 80 Boeing 737 MAX y en 2025 pagó su primer dividendo [1]. En junio de 2026 acordó comprar NLTG (Ving, Spies, Tjäreborg) [6].',
    hitos: [
      { anio: '1993', hito: 'Fundación como aerolínea regional que opera para Braathens [1].' },
      { anio: '2002', hito: 'Pasa a bajo coste con Boeing 737 en Noruega [1].' },
      { anio: '2013', hito: 'Largo radio con Boeing 787 y crecimiento internacional financiado con deuda [12].' },
      { anio: '2020', hito: 'Pandemia: reconstrucción en Irlanda y Noruega; los acreedores pasan a ser accionistas [12].' },
      { anio: '2021', hito: 'Sale de la reconstrucción como aerolínea nórdica de corto radio; Geir Karlsen, consejero delegado [1].' },
      { anio: '2022', hito: 'Pedido de 50 Boeing 737 MAX 8 con opción a 30 más [1].' },
      { anio: '2024', hito: 'Compra Widerøe, la mayor aerolínea regional de Noruega, por 1.020 M NOK [1].' },
      { anio: '2025', hito: 'Beneficio récord (EBIT de 3.732 M), recompra de los convertibles, primer dividendo y pedido ampliado a 80 MAX [1].' },
      { anio: '2026', hito: 'Pierde el pleito del EU ETS (733 M), el combustible se dispara por Ormuz y acuerda comprar NLTG [6, 8, 10].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Norwegian Air Shuttle es el grupo aéreo con más pasajeros de Noruega y uno de los dos mayores de los países nórdicos [1]. Tiene dos aerolíneas: Norwegian, de bajo coste, con 95 Boeing 737 (36 MAX 8) y unas 390 rutas desde Noruega, Suecia, Dinamarca y Finlandia hacia Europa (sobre todo ocio en el sur de Europa) y vuelos nacionales; y Widerøe, aerolínea regional con 50 aviones que une pequeñas ciudades de Noruega, muchas con contratos de servicio público del Estado [1, 10]. Vende a particulares (ocio y visitas) y a empresas, que ganan peso (contratos corporativos), sobre todo por su web y su aplicación [1]. El programa de fidelidad Norwegian Reward (más de 8,5 M de socios) usa la moneda Spenn compartida con Strawberry y REMA 1000 [10]. Si se cierra la compra de NLTG, añadirá viajes combinados y 26 hoteles propios [6].',
    como_gana_dinero: 'Cobra el billete por adelantado (4.000-8.600 M de billetes cobrados sin volar) y gana en el margen entre la tarifa por asiento-kilómetro y el coste por asiento-kilómetro [1, 10]. El 87 % de los ingresos son billetes; los servicios complementarios (equipaje, asiento) suman 200-208 NOK por pasajero en Norwegian [1, 10]. El margen depende de cuatro cosas: el combustible (25-39 % del coste operativo, en USD), el dólar frente a la corona (aviones, combustible y mantenimiento en USD), la ocupación (85-87 %) y la tarifa media, que fija la competencia [10]. El apalancamiento operativo es alto: un 1 % de combustible más caro cuesta 42 M al año y un 1 % de dólar más caro, 106 M [10]. Es muy estacional: gana en el 2T y sobre todo en el 3T (verano) y pierde en el 1T y el 4T [10].',
    clientes: 'No hay concentración de clientes: 27,3 M de pasajeros al año, la mitad de los ingresos sale de Noruega (49,9 %) [1]. Widerøe depende en parte del Estado noruego por las rutas de servicio público, que se licitan por periodos [1]. El poder de precios es escaso: la tarifa media de Norwegian fue de 0,91 NOK por pasajero-kilómetro en 2T25 y 2T26 a pesar de que el combustible subió un 36 % [10]; en septiembre de 2026 el ingreso unitario fue plano (0,79 NOK) [7]. En 2025 la empresa compensó la inflación de costes con eficiencias (programa X), no con precio [1]. La ficha sectorial muestra que la tarifa es cíclica en todo el sector (Ryanair −7 % en FY25 y +10 % en FY26) [2].',
  },
  sector: {
    definicion: 'Mercado relevante: transporte aéreo regular de pasajeros con origen o destino en los países nórdicos y, en general, el corto radio europeo de bajo coste, donde compite Norwegian [1, 2]. No hay una cifra fiable en coronas de ese mercado: se usa el número de pasajeros de la UE de Eurostat (la misma unidad que la ficha sectorial) como medida de tamaño y, como segunda referencia, los pasajeros de Norwegian frente a los de Ryanair y Lufthansa [2]. La cuota en ingresos del mercado nórdico no se publica.',
    tamano: '≈ 1.093,6 M de pasajeros en la UE en 2025 (+3,9 %; +5,7 % frente a 2019) [2]; Norwegian 23,1 M y el grupo 27,3 M (≈ 2,5 % de los pasajeros de la UE) [1].',
    unidad_serie: 'millones de pasajeros en la UE',
    serie: [{ anio: '2019', tamano: 1034.6 }, { anio: '2025', tamano: 1093.6 }],
    tcac_historico_pct: 0.9,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Precio del queroseno (y del dólar)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Media mundial de 192,44 USD/barril en la última semana (IATA), frente a ≈ 96 en noviembre de 2025; Norwegian cubre el 25 % del 1S27 a 661 USD/t [3, 4, 9].' },
      { driver: 'Demanda de ocio nórdica hacia el sur de Europa', efecto: '+', horizonte: 'Estructural', evidencia: 'Pasajeros de Norwegian +3 % en 12 meses a sep-26 con ocupación del 86,1 % [7].' },
      { driver: 'Capacidad de la competencia (SAS, Wizz Air, Ryanair) y escasez de aviones', efecto: '+', horizonte: 'Cíclico', evidencia: 'Retrasos de Boeing y Airbus y problemas de motores limitan la oferta; SAS canceló vuelos en marzo de 2026 [2, 9].' },
      { driver: 'Coste regulatorio del CO2 (EU ETS sin derechos gratuitos desde 2026, SAF obligatorio)', efecto: '−', horizonte: 'Estructural', evidencia: 'Pérdida de 733 M por el ETS de 2020; los derechos gratuitos desaparecen en 2026 [2, 8].' },
      { driver: 'Corona noruega frente al dólar y al euro', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Un 1 % de USD más caro cuesta 106 M al año; la corona fuerte rebajó el rendimiento en el 2T26 [10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'SAS (Air France-KLM), Ryanair, Wizz Air y Lufthansa compiten en las rutas al sur de Europa; la tarifa se fija en el mercado [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Particulares que comparan precios en internet; las empresas negocian contratos [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Duopolio Boeing-Airbus con retrasos, arrendadores, refinerías (queroseno) y aeropuertos con tasas reguladas al alza [1, 2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las franjas horarias de Oslo y el acceso a aviones frenan a los nuevos, pero las grandes de bajo coste pueden abrir bases [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Tren de alta velocidad casi inexistente en los Nórdicos; las videollamadas restan viajes de empresa [1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Indicadores: queroseno de 130-215 USD/barril en 2026 frente a ≈ 96 a finales de 2025 [3, 4, 11], márgenes de las europeas recortados y estimaciones de beneficio de 2027 rebajadas un 15-20 % en 90 días (Ryanair, Norwegian, Lufthansa) [7]. Antecedentes: en 2008-09 el sector perdió dinero salvo Ryanair; en 2020-21 Norwegian tuvo que reestructurarse y perdió 23.000 M; en 2022 el queroseno caro volvió a apretar los márgenes [2, 12]. La demanda aguanta (ocupación del 87 % en septiembre) pero el coste no se traslada entero al billete [7].' },
    regulacion: 'El comercio de derechos de emisión de la UE deja de dar derechos gratuitos a la aviación en 2026, y el reglamento ReFuelEU obliga a mezclar un 2 % de SAF desde 2025 y un 6 % desde 2030 [2]. Noruega mantiene una tasa al pasajero y Dinamarca introdujo otra [1]. Widerøe depende de las licitaciones de rutas de servicio público del Estado noruego [1]. La compra de NLTG necesita la aprobación de competencia de la UE (cierre previsto en el 4T26) [6].',
    tendencias: 'Tres tendencias. Primera, la renovación de flota hacia el 737 MAX (un 15-20 % menos de consumo por asiento): Norwegian tiene 78 pendientes hasta 2031 [1]. Segunda, la integración de vuelo, hotel y fidelidad (Spenn, NLTG): la empresa quiere vender paquetes como Jet2, la aerolínea de ocio más rentable del Reino Unido [6]. Tercera, la consolidación: Air France-KLM controla SAS y las aerolíneas pequeñas pierden escala [2]. Norwegian gana con la primera y la tercera; la segunda es una apuesta con riesgo de ejecución.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.ª aerolínea de Noruega por pasajeros y una de las dos mayores de los Nórdicos con SAS [1]; ≈ 2,5 % de los pasajeros de la UE [2].',
    competidores: [
      { nombre: 'SAS (grupo Air France-KLM)', pais: 'SE/DK/NO', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en los Nórdicos; no cotiza tras su reestructuración de 2024 [2].' },
      { nombre: 'Ryanair', pais: 'IE', ticker: 'RYA', ingresos: 168400, cuota_pct: null, margen_ebit_pct: 13.1, comentario: 'La de menor coste de Europa; ingresos y margen LTM de Yahoo [7].' },
      { nombre: 'Wizz Air', pais: 'HU', ticker: 'WIZZ', ingresos: 65900, cuota_pct: null, margen_ebit_pct: -12.2, comentario: 'Bajo coste con pérdidas por motores parados [7].' },
      { nombre: 'easyJet', pais: 'GB', ticker: 'EZJ', ingresos: 133900, cuota_pct: null, margen_ebit_pct: null, comentario: 'Bajo coste con paquetes (easyJet holidays) [7].' },
      { nombre: 'Lufthansa', pais: 'DE', ticker: 'LHA', ingresos: 448300, cuota_pct: null, margen_ebit_pct: null, comentario: 'Red con Eurowings en ocio [7].' },
      { nombre: 'Jet2', pais: 'GB', ticker: 'JET2', ingresos: 100300, cuota_pct: null, margen_ebit_pct: null, comentario: 'Modelo de vuelo + paquete al que aspira Norwegian con NLTG [7].' },
    ],
    foso: {
      veredicto: 'Sin foso',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Red densa en Noruega y Widerøe como alimentador; Spenn con Strawberry y REMA 1000 [1, 10].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El viajero compara precios; solo el programa de fidelidad crea algo de lealtad [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca conocida y franjas en Oslo; rutas de servicio público de Widerøe [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Coste unitario sin combustible de 0,48 NOK, por encima del de Ryanair; margen EBIT de 6,5 % subyacente en 2025 frente al 13 % de Ryanair [7, 10].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado nacional noruego pequeño con dos grupos (Norwegian/Widerøe y SAS) [1].' },
      ],
    },
    amenazas: 'Lo que puede erosionar su posición: que Air France-KLM use SAS para recuperar cuota en Noruega con precios bajos (probabilidad media), que Ryanair o Wizz abran bases nórdicas cuando tengan aviones (baja-media), que el queroseno caro no pueda trasladarse a la tarifa (alta en 2026-27) y que la integración de NLTG distraiga a la dirección (media) [1, 2, 6].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'El clima es el asunto que más mueve las cifras: el EU ETS deja de dar derechos gratuitos a la aviación en 2026 y el SAF obligatorio encarece el combustible [2]. Norwegian emite 69-71 g de CO2 por pasajero-kilómetro (2026), un 2 % menos que en 2025 gracias a los MAX [1, 7 de A]. La seguridad y la puntualidad (Norwegian fue la aerolínea más puntual de Europa en mayo de 2026 según Cirium) son el otro asunto material [10]. Las relaciones laborales (huelgas de pilotos en 2024) pueden parar la operación [1].',
    controversias: 'Pleito del EU ETS de 2020 perdido en el Tribunal Supremo (25-jun-2026): pérdida de 733 M y multa de ≈ 400 M pagada en 2023 [8]. Demanda de Erling Haaland por usar su imagen en un anuncio (octubre de 2026), sin efecto económico relevante (prensa).',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Tamaño del mercado nórdico en coronas, previsión a 5 años y CR5', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo pasajeros propios); 2) Avinor y Eurostat (pasajeros, no ingresos; serie anual de Avinor no localizada); 3) presentación de NLTG (solo ocio)', decision: 'Omitido; se usa el número de pasajeros de la UE' },
    { seccion: 'esg', campo: 'Calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) Informe anual 2025 (no las cita); 2) MSCI y Sustainalytics (de pago); 3) CDP (sin respuesta pública localizada)', decision: 'Omitido' },
  ],
};

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Integrated Annual Report 2025: consejo, dirección, gobierno corporativo y nota 8 (remuneración)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-10', url: NW(670345, 323105) },
  { id: 2, titulo: 'Minutes from the Annual General Meeting 2026 (votos por punto)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-05-06', url: NW(672541, 325111) },
  { id: 3, titulo: 'Notice of Annual General Meeting 2026 (honorarios del auditor, autorizaciones)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-13', url: NW(670499, 323219) },
  { id: 4, titulo: 'Minutes from Extraordinary General Meeting 2026 (aprobación de NLTG y de las acciones de contraprestación)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-08', url: NW(677824, 329351) },
  { id: 5, titulo: 'Mandatory notification of trade: compras de consejeros (29-oct-2025, 25-nov-2025, 16-jul-2026 y 23-jul-2026)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-27', url: NM(678338) },
  { id: 6, titulo: 'Hans-Jørgen Wibstad resigns as CFO', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-10-08', url: NM(683748) },
  { id: 7, titulo: 'Resignation of board member (Daniel Skjeldam)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-21', url: NM(678483) },
  { id: 8, titulo: 'Second quarter 2026 financial report, nota 11 (20 mayores accionistas a 30-jun-2026)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-14', url: NW(678122, 329635) },
  { id: 9, titulo: 'Notice of Extraordinary General Meeting – Election of new Chair of the Board', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-10-28', url: NM(658120) },
  { id: 10, titulo: 'Notificación de participaciones significativas de Goldman Sachs (25-sep-2026) y de DNB Asset Management (28-sep-2026)', editor: 'Norwegian Air Shuttle ASA / Finanstilsynet', tipo: 'Primaria', fecha: '2026-09-29', url: NW(683214, 333959) },
  { id: 11, titulo: 'Mandatory notification of trade: prórroga de 250.000 opciones del consejero delegado', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-19', url: NM(676665) },
  { id: 12, titulo: 'Norwegian Group delivers record result for 2025 (guía de 2026) y comunicados de resultados de 2022-2025', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-02-13', url: NM(665745) },
  { id: 13, titulo: 'Exercise of employee share options under LTI and mandatory notification of trade (ventas de directivos)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2025-07-15', url: NM(651331) },
  { id: 14, titulo: 'Geir Karlsen appointed new CEO of Norwegian (sueldo base de 4,5 M NOK en 2021)', editor: 'Norwegian Air Shuttle ASA (Mynewsdesk)', tipo: 'Primaria', fecha: '2021-06-21', url: 'https://www.mynewsdesk.com/uk/norwegian/pressreleases/geir-karlsen-appointed-new-ceo-of-norwegian-3110756' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Geir Karlsen', cargo: 'Consejero delegado', desde: '2021', participacion_pct: 0.06, trayectoria: 'Director financiero desde 2018 y consejero delegado interino en 2018-19; llevó la reconstrucción de 2020-21 y la vuelta a beneficios (EBIT récord de 3.732 M en 2025). Antes, director financiero de Navig8, Golden Ocean y Songa Offshore [1]. 651.478 acciones y 3,8 M de opciones [11].' },
      { nombre: 'Hans-Jørgen Wibstad', cargo: 'Director financiero (sale el 31-oct-2026)', desde: '2022', participacion_pct: 0.01, trayectoria: 'Ex director financiero de Multiconsult y Kongsberg Gruppen. Deja la empresa para volver a Multiconsult; le sustituye de forma interina Gjermund Aasen, responsable de finanzas corporativas y flota [1, 6].' },
      { nombre: 'Dag Mejdell', cargo: 'Presidente del consejo', desde: '2025', participacion_pct: 0.01, trayectoria: 'Ex consejero delegado de Dyno Nobel y de Posten Norge; presidente de Norsk Hydro, Vygruppen y vicepresidente de SAS. Elegido presidente en la junta extraordinaria de noviembre de 2025 y reelegido en mayo de 2026 [1, 2, 9].' },
      { nombre: 'Jeanette Bø-Alnes', cargo: 'Directora de rendimiento (Chief Performance Officer)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Responsable del programa X de eficiencias; antes, control interno de Norwegian, Frontline y EY [1].' },
      { nombre: 'Knut Olav Irgens Høeg', cargo: 'Director de TI y servicios', desde: '2021', participacion_pct: 0.02, trayectoria: 'Miembro de la dirección; vendió 54.371 acciones en julio de 2025 al ejercer opciones [13].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Rentabilidad mejor que 2023 tras la compra de Widerøe', real: 'EBIT de 1.873 M frente a 2.232 M en 2023, con huelga de pilotos y rebaja de la guía por la divisa', cumplida: 'No' },
      { anio: '2025', guia: 'Coste unitario sin combustible estable; crecimiento de capacidad ≈ 3 %', real: 'EBIT récord de 3.732 M (9,9 %); coste unitario sin combustible ajustado de 0,52 NOK', cumplida: 'Sí' },
      { anio: '2026', guia: 'Capacidad de Norwegian +3 %, Widerøe +4 % (luego +2 %); coste unitario sin combustible: subida de un dígito bajo, mejorada a plano en julio', real: 'En curso: capacidad 3T +5 %; coste unitario del 2T −5 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo con credibilidad en costes y en balance: Karlsen sacó a la empresa de la reconstrucción y ha cumplido la guía de coste unitario [1, 12]. Dos señales de inestabilidad en 2026: la salida del director financiero el 31-oct-2026, a tres semanas de los resultados del 3T y en plena integración de NLTG [6], y la dimisión del consejero Daniel Skjeldam en julio [7]. No hay plan de sucesión publicado para el consejero delegado, que lleva ocho años en la cúpula. Los consejeros compraron acciones en octubre de 2025 y en julio de 2026, tras la caída [5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dag Mejdell', cargo: 'Presidente', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración' },
      { nombre: 'Karina Deacon', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Stephen Kavanagh', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Sofia Arhall', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Katrine Gundersen', cargo: 'Consejera (representante de los empleados)', tipo: 'Otro externo', desde: '2019', comisiones: null },
      { nombre: 'Torstein Hiorth Soland', cargo: 'Consejero (representante de los empleados)', tipo: 'Otro externo', desde: '2025', comisiones: null },
      { nombre: 'Trond Moe', cargo: 'Consejero (representante de los empleados)', tipo: 'Otro externo', desde: '2025', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 68.91, voto_remuneracion_contra_pct: 31.09, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 82.21,
    remuneracion_ceo: null,
    remuneracion: 'La junta de mayo de 2026 aprobó el informe de remuneraciones con solo un 68,91 % a favor y un 31,09 % en contra, un voto en contra muy alto [2]. La remuneración de la dirección y el consejo sumó 59 M NOK en 2025 frente a 41 M en 2024 (+44 %, con el beneficio récord) [1]. El variable a largo plazo son opciones sobre acciones (el consejero delegado tiene 3,8 M; en junio de 2026 el consejo prorrogó 250.000 que vencían, a un precio de ejercicio de 8,40 NOK) [11]: premian la cotización, no el ROIC ni la caja. La prórroga de opciones vencidas es una mala práctica para el minoritario. El sueldo base del consejero delegado al nombrarle fue de 4,5 M NOK [14]; la cifra total de 2025 está en el informe de remuneraciones, que no se ha podido abrir.',
    accionistas: [
      { nombre: 'Geveran Trading Company (John Fredriksen)', pct: 13.3, tipo: 'Inversor de referencia', variacion: 'Apoya la compra de NLTG; tras el cierre bajará a ≈ 10,4 % [8, 4].' },
      { nombre: 'Folketrygdfondet (fondo público noruego)', pct: 9.4, tipo: 'Institucional', variacion: 'Estable [8].' },
      { nombre: 'Fondos de DNB Asset Management', pct: 4.81, tipo: 'Institucional', variacion: 'Bajó del 5 % el 28-sep-2026 tras vender 2,1 M de acciones [10].' },
      { nombre: 'Goldman Sachs Group (acciones y préstamo de valores)', pct: 4.84, tipo: 'Intermediario', variacion: 'Bajó del 6,13 % al 4,84 % el 25-sep-2026 [10].' },
      { nombre: 'Strawberry Equities (Petter Stordalen), Altor y TDR Capital', pct: 22.2, tipo: 'Futuros accionistas (vendedores de NLTG)', variacion: 'Recibirán 300 M de acciones al cierre (22,2 % del capital ampliado), con un bloqueo de 180 días [4, 10 de A].' },
      { nombre: 'Autocartera', pct: 0.4, tipo: 'Autocartera', variacion: '4.328.636 acciones tras la recompra de marzo de 2026 [1].' },
    ],
    insiders: [
      { fecha: '2025-10-29', persona: 'Cuatro consejeros (Deacon, Kavanagh, Skjeldam, Arhall)', operacion: 'Compra', acciones: 22554, importe: 0.34 },
      { fecha: '2025-11-25', persona: 'Dag Mejdell (presidente)', operacion: 'Compra', acciones: 65000, importe: 1.08 },
      { fecha: '2026-07-16', persona: 'Mejdell, Deacon y Kavanagh', operacion: 'Compra', acciones: 40050, importe: 0.51 },
      { fecha: '2026-07-23', persona: 'Sofia Arhall', operacion: 'Compra', acciones: 5826, importe: 0.07 },
      { fecha: '2025-07-15', persona: 'Knut Olav Irgens Høeg (dirección)', operacion: 'Venta', acciones: 54371, importe: 1.0 },
    ],
    control_y_defensas: 'No hay accionista de control: el mayor es Geveran (Fredriksen) con el 13,3 % y el segundo el fondo público Folketrygdfondet con el 9,4 % [8]. La ley noruega de aviación limita la propiedad extranjera de las aerolíneas para mantener las licencias (límite legal, no estatutario) [1]. Con NLTG entran Strawberry (Stordalen), Altor y TDR con el 22 % entre los tres; Strawberry ya es socia de Norwegian en Spenn, la sociedad conjunta de fidelidad, por lo que hay operaciones con partes vinculadas en el futuro [1, 4]. La junta de mayo de 2026 autorizó ampliaciones de capital con un 22,45 % en contra [2].',
    alertas: [
      'Salida del director financiero el 31-oct-2026, con un sustituto interino [6].',
      'Voto en contra del 31,09 % al informe de remuneraciones de 2026 [2].',
      'Prórroga de 250.000 opciones del consejero delegado que vencían en junio de 2026 [11].',
      'Dimisión del consejero Daniel Skjeldam en julio de 2026 [7].',
    ],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Remuneración total del consejero delegado en 2025', tipo: 'Núcleo', intentos: '1) Informe anual 2025, nota 8 (remite al informe de remuneraciones); 2) web de inversores de Norwegian (bloqueada por antibot); 3) prensa noruega (DN, de pago) y búsqueda web', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'Años seguidos del auditor (PwC)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (el informe de auditoría es una imagen); 2) informe ESEF 2024 (PwC firma la verificación de sostenibilidad); 3) convocatoria de la junta 2026 (solo honorarios)', decision: 'Omitido' },
  ],
};

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de NAS.OL, OSEBX.OL y EXV9.DE (bolsa.mjs) y movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/NAS.OL/history/' },
  { id: 2, titulo: 'Norwegian Air Shuttle ASA: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/NORWEGIAN-AIR-SHUTTLE-ASA-1413204/finances/' },
  { id: 3, titulo: 'Norwegian Air Shuttle ASA: consenso, objetivos y cambios de recomendación (abril-octubre de 2026)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/NORWEGIAN-AIR-SHUTTLE-ASA-1413204/consensus/' },
  { id: 4, titulo: 'Fichas quoteSummary y earningsTrend de NAS.OL y ocho aerolíneas europeas; tipos de cambio EURNOK, GBPNOK, USDNOK y SEKNOK', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/NAS.OL/analysis/' },
  { id: 5, titulo: 'Rentabilidad de la deuda pública noruega a 10 años (GOVT_GENERIC_RATES, B.10Y.GBON)', editor: 'Norges Bank', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://data.norges-bank.no/api/data/GOVT_GENERIC_RATES/B.10Y.GBON?format=csv&lastNObservations=5&locale=en' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Damodaran Online (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Norwegian agrees to acquire Nordic Leisure Travel Group (precio, EBITDA LTM de NLTG)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-06-16', url: NM(676265) },
  { id: 8, titulo: 'Integrated Annual Report 2025, nota 4 (compra de Widerøe)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-04-10', url: NW(670345, 323105) },
  { id: 9, titulo: 'Alaska Air to buy Hawaiian Airlines in a $1.9 billion deal with debt', editor: 'AP (ClickOrlando)', tipo: 'Prensa', fecha: '2023-12-03', url: 'https://www.clickorlando.com/business/2023/12/03/alaska-air-to-buy-hawaiian-airlines-in-a-19-billion-deal-with-debt/' },
  { id: 10, titulo: 'Norwegian Air Shuttle Aktie: Barclays senkt Rating und Kursziel auf 11,50 NOK', editor: 'Goldesel', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://goldesel.de/aktien/news/norwegian-air-shuttle-aktie-barclays-senkt-rating-und-kursziel-auf-1150-nok' },
  { id: 11, titulo: 'Registro de posiciones cortas (SSR): NO0010196140, 1,12 % a 15-oct-2026', editor: 'Finanstilsynet', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://ssr.finanstilsynet.no/api/v2/instruments' },
  { id: 12, titulo: 'Second quarter 2026 financial report (balance a 30-jun-2026 y nota 6: acciones)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-07-14', url: NW(678122, 329635) },
  { id: 13, titulo: 'Financial calendar (resultados del 3T26 el 28-oct-2026)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-02-09', url: NM(665180) },
  { id: 14, titulo: 'Approval and publication of prospectus (300 M de acciones de contraprestación; cierre previsto al final del 4T26)', editor: 'Norwegian Air Shuttle ASA', tipo: 'Primaria', fecha: '2026-10-16', url: NM(684212) },
  { id: 15, titulo: 'Norwegian Air Shuttle reports wider-than-expected quarterly loss; Norwegian Air\'s operating profit lags forecast due to higher costs', editor: 'RTE / Reuters', tipo: 'Prensa', fecha: '2026-07-14', url: 'https://www.rte.ie/news/business/' },
];
const fx = comps.fx; const GBP = fx['GBPNOK=X'], EUR = fx['EURNOK=X'];
const per = { 'RYA.IR': 13.5, 'EZJ.L': 18.3, 'IAG.L': 6.8, 'LHA.DE': 6.1, 'AF.PA': 2.5, 'JET2.L': 8.6, 'FIA1S.HE': 13.1, 'WIZZ.L': null };
const crec = { 'RYA.IR': 9.2, 'EZJ.L': 9.8, 'WIZZ.L': 16.0, 'IAG.L': 5.5, 'LHA.DE': 4.9, 'AF.PA': 5.2, 'JET2.L': 10.7, 'FIA1S.HE': 1.6 };
const nombres = { 'RYA.IR': ['Ryanair', 'RYA', 'IE', EUR], 'EZJ.L': ['easyJet', 'EZJ', 'GB', GBP], 'WIZZ.L': ['Wizz Air', 'WIZZ', 'HU', GBP], 'IAG.L': ['IAG', 'IAG', 'ES', GBP], 'LHA.DE': ['Lufthansa', 'LHA', 'DE', EUR], 'AF.PA': ['Air France-KLM', 'AF', 'FR', EUR], 'JET2.L': ['Jet2', 'JET2', 'GB', GBP], 'FIA1S.HE': ['Finnair', 'FIA1S', 'FI', EUR] };
const r1 = (x) => (x === null || x === undefined ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x === null || x === undefined ? null : Math.round(x * 100) / 100);
const empresas = comps.comps.filter((c) => nombres[c.s]).map((c) => {
  const [nombre, ticker, pais, fxm] = nombres[c.s];
  return { nombre, ticker, pais, capitalizacion: Math.round((c.mcap / 1e6) * fxm), ev_ventas: r2(c.evRev), ev_ebitda_ltm: r1(c.evEbitda), ev_ebitda_ntm: null, per_ntm: per[c.s], crecimiento_pct: crec[c.s], margen_ebitda_pct: r1(c.ebitdaM * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: null };
});
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Norwegian Air Shuttle ASA', nombre_corto: 'Norwegian', ticker: 'NAS', isin: 'NO0010196140', mercado: 'Euronext Oslo Børs', indice_referencia: 'OSEBX',
    pais: 'Noruega', pais_iso: 'NO', sector: 'Industrials', industria: 'Passenger Airlines', sede: 'Fornebu (Bærum), Noruega', fundacion: '1993', empleados: 8992, web: 'https://www.norwegian.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1051.5, capitalizacion_publicada: 11542, free_float_pct: 77,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M NOK/día (3 meses; ${(bolsa.volumen_3m.acciones_dia / 1e6).toFixed(1).replace('.', ',')} M de acciones)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía de 2026 (confirmada el 14-jul-2026): capacidad de Norwegian +5 % en el 3T y ≈ +3 % en el año; Widerøe ≈ +2 %; coste unitario subyacente sin combustible de Norwegian plano frente a 2025 con los tipos de cambio actuales (antes, subida de un dígito bajo); programa X con mejoras recurrentes de más de 1.250 M al cierre de 2026 [12]. No da guía de beneficio. NLTG: «acreditiva para el BPA ya en 2027» y +2 puntos de margen operativo en NLTG en 2027 [7]. Plan a medio plazo: no publicado.',
    estimaciones: [
      { periodo: '2026e', ingresos: 39103, ebitda: 6177, ebit: 1885, bpa: 0.56, dpa: 0.87, fuente: 'MarketScreener, 6 analistas [2]' },
      { periodo: '2027e', ingresos: 41780, ebitda: 8384, ebit: 2992, bpa: 1.7, dpa: 0.87, fuente: 'MarketScreener [2]; Yahoo: 1,67 (4 analistas; 2,05 hace 90 días) [4]' },
      { periodo: '2028e', ingresos: 46606, ebitda: 9501, ebit: 3711, bpa: 2.12, dpa: 0.69, fuente: 'MarketScreener [2] (2028 parece incluir NLTG: beneficio 2.633 M ÷ 2,12 = 1.243 M de acciones)' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 3, mantener: 3, vender: 0, po_medio: 14.0, po_min: 11.5, po_max: 17.5 },
    revisiones: 'Recortes fuertes en tres meses: el BPA de 2026 del consenso de Yahoo pasó de 1,19 a 0,92 NOK y el de 2027 de 2,05 a 1,67 (−19 %) [4]. En octubre de 2026 Barclays bajó a «igual que el mercado» con objetivo de 11,50 NOK (desde 20), SB1 Markets recortó a 12 (desde 16), Pareto a 16 (desde 18) y Danske a 13 (desde 14) [3, 10]. Causas: el queroseno vuelve a 190 USD/barril con poca cobertura para 2027, la salida del director financiero y la dilución de NLTG [3]. Solo una fuente da estimaciones completas (MarketScreener); Yahoo sirve de contraste del BPA y del objetivo medio (14 NOK, 6 analistas) [2, 4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: 1.12, comentario: 'La acción subió de 7,34 NOK a cierre de 2022 a 17,45 a cierre de 2025 (+138 %) con la vuelta a beneficios, la compra de Widerøe y el primer dividendo [1]. En 2026 pierde un 33 % frente al +24,5 % del OSEBX (empujado por el petróleo, que perjudica a Norwegian) y al +0,4 % del ETF europeo de viajes y ocio [1]. La caída tiene tres fases: marzo (−14 %, guerra con Irán y queroseno a 215 USD/barril), junio-julio (−23 %, compra de NLTG con 300 M de acciones nuevas, pérdida del pleito del ETS y pérdida del 2T peor de lo esperado) y octubre (−9,5 %, queroseno de nuevo a 190 USD y rebajas de analistas) [1, 3, 15]. La beta frente al OSEBX (0,23 mensual a 5 años) no sirve: el índice sube con el petróleo y la aerolínea baja [1].', tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 10.75, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 7.34, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 10.72, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 11.0, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 17.45, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: 'Precios de cierre de cada año de Yahoo [1]. Se excluyen 2021 (EBITDA negativo y BPA con ganancias de la reconstrucción) y 2022 (BPA inflado por la reversión de 2.099 M del deterioro de anticipos de aviones). En 2023-2025 la acción cotizó a 4-7 veces el beneficio del año: el mercado nunca ha pagado más por una aerolínea que se reestructuró dos veces en diez años. El múltiplo de hoy sobre el beneficio de 2026 es alto porque 2026 es un año de valle (combustible y multa del ETS), no porque la acción esté cara.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Aerolíneas europeas cotizadas de corto y medio radio con negocio de ocio: cuatro de bajo coste (Ryanair, easyJet, Wizz Air, Jet2) y cuatro de red (IAG, Lufthansa, Air France-KLM, Finnair, esta última nórdica). SAS no cotiza. Cifras de Yahoo a 19-oct-2026 en coronas con EURNOK 10,56 y GBPNOK 12,54 [4]. El PER de los próximos 12 meses pondera los dos ejercicios estimados por los meses que caen en el periodo; Wizz Air está en pérdidas y no tiene PER. El EV/EBITDA es de los últimos 12 meses de Yahoo, con definiciones que no siempre coinciden (NIIF 16 en todas) [4].',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-06', objetivo: 'Nordic Leisure Travel Group (Ving, Spies, Tjäreborg)', comprador: 'Norwegian Air Shuttle', ev: 6386, ev_ventas: 0.39, ev_ebitda: 6.6, prima_pct: null, excluir: false, comentario: 'Precio de 7.940 M SEK (3.500 M en caja y 300 M de acciones a 14,95 NOK) menos caja neta de ≈ 1.233 M SEK; EBITDA ajustado SGAAP de 1.024 M SEK y ventas de 16.995 M SEK a mar-26 [7]; SEKNOK 0,95 [4].' },
      { fecha: '2024-01', objetivo: 'Widerøe', comprador: 'Norwegian Air Shuttle', ev: 2128, ev_ventas: 0.29, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 1.020 M en caja más 1.108 M de deuda asumida (sin arrendamientos) sobre 7.241 M de ventas de 2024 [8].' },
      { fecha: '2023-12', objetivo: 'Hawaiian Holdings', comprador: 'Alaska Air Group', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: 270, excluir: false, comentario: '18 USD por acción frente a 4,86 de cierre (+270 %); valor de la operación ≈ 1.900 M USD con 900 M de deuda neta; EBITDA negativo, sin múltiplo [9].' },
    ],
    comentario: 'Las operaciones del sector rara vez publican múltiplos: las aerolíneas se compran por red, franjas y escala, y a menudo en pérdidas (Hawaiian). Las dos de la propia Norwegian salieron baratas: Widerøe a 0,29 veces las ventas y NLTG a 6,6 veces el EBITDA [7, 8]. Norwegian no es un objetivo probable: la ley noruega de aviación limita la propiedad extranjera y Air France-KLM ya controla SAS [1 de C]. Las transacciones no pesan en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'Múltiplos de EV/EBITDA de 5 operaciones', tipo: 'Complemento', intentos: '1) Comunicados de las operaciones (Widerøe, NLTG, Hawaiian, ITA-Lufthansa, SAS-Air France-KLM); 2) prensa (los múltiplos no se publican: compras en pérdidas o de participaciones); 3) cálculo propio (solo posible en NLTG)', decision: 'Calculado y marcado como estimación en NLTG; el resto omitido' },
    { seccion: 'multiplos_historicos', campo: 'Múltiplos de los próximos 12 meses de cada año', tipo: 'Complemento', intentos: '1) MarketScreener (solo el vigente); 2) consensos de la empresa en su web (bloqueada); 3) Yahoo (sin histórico de estimaciones)', decision: 'Omitido' },
  ],
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Narrativa «Rising Regulatory Costs Will Strain Nordic Routes Despite Cost Cuts» y sus actualizaciones (abr-oct 2026)', editor: 'Simply Wall St Community', tipo: 'Foros y redes', fecha: '2026-10-17', url: 'https://simplywall.st/community/narratives/no/transportation/ob-nas/norwegian-air-shuttle-shares/5l3r2nn6-rising-regulatory-costs-will-strain-nordic-routes-despite-cost-cuts/updates' },
  { id: 2, titulo: 'Stocktwits, flujo de $NWARF (30 mensajes, jul-2025 a may-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-05-19', url: 'https://api.stocktwits.com/api/2/streams/symbol/NWARF.json' },
  { id: 3, titulo: 'Seeking Alpha, feed de NWARF (transcripciones y titulares de resultados, jul-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-14', url: 'https://seekingalpha.com/api/sa/combined/NWARF.xml' },
  { id: 4, titulo: 'What Comes Next For Norwegian Air Shuttle After A 27% Fall; Is Norwegian Air Shuttle Undervalued After The CFO Change And Traffic Update?', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://simplywall.st/stocks/no/transportation/ob-nas/norwegian-air-shuttle-shares' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Simply Wall St Community (narrativa de NAS)', fecha: '2026-10', n_comentarios: 6, tono: 'Negativo', resumen: 'La narrativa más seguida baja su valor razonable seis veces desde abril, de 15 a 11,5 NOK, por el combustible, la multa del ETS, el cambio de director financiero y márgenes más bajos; ve la acción «en un rango» [1].' },
      { plataforma: 'Simply Wall St (artículos de octubre)', fecha: '2026-10', n_comentarios: 3, tono: 'Dividido', resumen: 'Se pregunta si la caída del 27 % deja la acción barata tras el tráfico récord de septiembre y la salida del director financiero [4].' },
      { plataforma: 'Stocktwits ($NWARF)', fecha: '2026-05', n_comentarios: 30, tono: 'Positivo', resumen: 'Inversores particulares estadounidenses, alcistas por las compras de consejeros, el dividendo y las recompras; algún mensaje pide votar contra la emisión de acciones; sin actividad desde mayo [2].' },
    ],
    temas: [
      { tema: 'Combustible y Ormuz', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón: el queroseno está en ≈ 190 USD/barril y Norwegian solo cubre el 25 % del 1S27; es el mayor riesgo del informe [1].' },
      { tema: 'Dilución por NLTG', postura: 'Bajista', peso: 'Medio', contraste: 'Las 300 M de acciones son un 28 % más; el BPA de 2028 del informe ya las incluye [2].' },
      { tema: 'Compras de consejeros y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Los consejeros compraron a 12,7-12,8 NOK en julio, pero son importes pequeños (0,6 M NOK) [2].' },
      { tema: 'Salida del director financiero', postura: 'Bajista', peso: 'Bajo', contraste: 'Se va a otra empresa cotizada (Multiconsult), sin indicios de problemas contables [1].' },
    ],
    lectura: 'El sentimiento es negativo y empeora, en línea con los analistas (seis recortes de objetivo en octubre) y con el precio, en mínimos de 52 semanas. No hay euforia ni capitulación visible: el debate es escaso (foros noruegos cerrados a la consulta y Reddit bloqueado), y lo que hay coincide con el informe en el riesgo principal, el combustible de 2027. El foro no aporta riesgos nuevos; la única lectura útil es que nadie espera un catalizador a corto plazo, lo que encaja con un objetivo a 12 meses cercano al precio.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Foros noruegos y Reddit', tipo: 'Complemento', intentos: '1) Foro de Finansavisen/Hegnar (bucle de redirecciones) y Shareville (404); 2) Reddit r/aksjer (bloqueado, 403); 3) Nordnet y XtraInvestor (sin hilos accesibles)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('A-E escritas;', empresas.length, 'comparables');
