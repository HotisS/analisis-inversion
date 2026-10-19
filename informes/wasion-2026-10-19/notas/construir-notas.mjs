// Notas A-E de Wasion Holdings Limited (3393.HK, corte 2026-10-19). Hong Kong sin XBRL público: cuentas de los
// informes anuales 2021-2025 y de los anuncios de resultados (HKFRS, auditor Ernst & Young), 1S26 del informe
// intermedio (revisado por EY). Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/wasion-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const H = 'https://www1.hkexnews.hk/listedco/listconews/sehk';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (estados consolidados, notas de segmentos, minoritarios de Willfar, deterioro de clientes, remuneración, flujos)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-22', url: `${H}/2026/0422/2026042201403.pdf` },
  { id: 2, titulo: 'Annual Report 2024 (estados consolidados 2024 y 2023)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-04-23', url: `${H}/2025/0423/2025042300881.pdf` },
  { id: 3, titulo: 'Annual Report 2023 (flujos de 2023 y 2022, patrimonio)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2024-04-11', url: `${H}/2024/0411/2024041100258.pdf` },
  { id: 4, titulo: 'Annual Report 2022 (patrimonio 2022 y 2021)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2023-04-20', url: `${H}/2023/0420/2023042001009.pdf` },
  { id: 5, titulo: 'Annual Report 2021 (flujos 2021, resumen financiero de cinco años 2017-2021)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2022-04-28', url: `${H}/2022/0428/2022042801763.pdf` },
  { id: 6, titulo: 'Announcement of the annual results for the year ended 31 December 2025', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-03-26', url: `${H}/2026/0326/2026032600357.pdf` },
  { id: 7, titulo: 'Announcement of the annual results for the year ended 31 December 2024', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-03-27', url: `${H}/2025/0327/2025032700269.pdf` },
  { id: 8, titulo: 'Announcement of the annual results for the year ended 31 December 2023', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2024-03-15', url: `${H}/2024/0315/2024031500223.pdf` },
  { id: 9, titulo: 'Announcement of the annual results for the year ended 31 December 2022', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2023-03-27', url: `${H}/2023/0327/2023032700238.pdf` },
  { id: 10, titulo: 'Announcement of the annual results for the year ended 31 December 2021', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2022-03-28', url: `${H}/2022/0328/2022032801882.pdf` },
  { id: 11, titulo: 'Announcement of the interim results for the six months ended 30 June 2026 (cuenta, balance, segmentos, geografías, pedidos)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-08-27', url: `${H}/2026/0827/2026082700157.pdf` },
  { id: 12, titulo: 'Interim Report 2026 (flujos del 1S26, opciones de venta concedidas a minoritarios de Wayon Energy, participaciones)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-09-18', url: `${H}/2026/0918/2026091800305.pdf` },
  { id: 13, titulo: 'Interim Report 2025 (cuenta del 1S25 y del 1S24, amortizaciones)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-09-16', url: `${H}/2025/0916/2025091600475.pdf` },
  { id: 14, titulo: 'Unaudited financial information of Willfar Information Technology for the six months ended 30 June 2026', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-08-17', url: `${H}/2026/0817/2026081700464.pdf` },
  { id: 15, titulo: 'Top-up placing of existing shares and subscription of new shares under general mandate (50 M acciones a 30,00 HKD)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-21', url: `${H}/2026/0421/2026042100013.pdf` },
  { id: 16, titulo: 'Voluntary announcement – capital increase agreement with Boyu Capital (8 % de Wayon Energy por 380 M CNY)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-12-24', url: `${H}/2025/1224/2025122400367.pdf` },
  { id: 17, titulo: 'Next Day Disclosure Return (acciones en circulación y autocartera a 16-oct-2026)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-16', url: `${H}/2026/1016/2026101600691.pdf` },
  { id: 18, titulo: 'Positive profit alert (beneficio 2025 de 1.000-1.060 M CNY)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-03-06', url: `${H}/2026/0306/2026030600210.pdf` },
];

const c = (periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, bpa, dpa, acciones_diluidas) =>
  ({ periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero, bai, impuestos, minoritarios, beneficio_neto, gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas });
// EBIT = beneficio antes de impuestos + gastos financieros − ingresos por intereses − participadas (la empresa da
// «earnings before finance costs and tax» con los intereses cobrados dentro). Amortizaciones = inmovilizado +
// inversiones inmobiliarias + derechos de uso + intangibles + desarrollo capitalizado (nota «Profit before tax»).
// gastos_generales = venta + administración (la I+D va aparte, 7-8 % de las ventas). DPA = dividendo final en CNY.
const cuenta = [
  c('2021', 4590.8, 3092.0, 615.1, 708.9, 219.2, 489.7, -16.9, 472.7, 44.8, 159.9, 268.1, 99.3, 0.272, 0.163, 985.6),
  c('2022', 5855.8, 3926.6, 728.6, 879.7, 267.0, 612.7, -30.2, 582.4, 71.3, 187.4, 323.8, 112.5, 0.329, 0.202, 984.2),
  c('2023', 7252.3, 4671.5, 976.8, 1200.2, 276.8, 923.4, -62.7, 860.7, 100.1, 239.4, 521.2, 131.5, 0.527, 0.258, 989.1),
  c('2024', 8716.5, 5681.4, 1105.4, 1554.8, 315.8, 1239.1, -31.5, 1207.6, 177.4, 324.6, 705.6, 125.5, 0.712, 0.354, 991.0),
  c('2025', 10073.5, 6476.6, 1202.1, 2148.1, 369.9, 1778.3, -33.4, 1744.9, 263.8, 422.9, 1058.2, 106.6, 1.066, 0.422, 992.7),
];

const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) =>
  ({ periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas });
// caja = efectivo y saldos bancarios + depósitos estructurados + productos financieros a corto (sin los depósitos pignorados
// que garantizan pagarés a proveedores). Clientes = cuentas y efectos a cobrar netos de deterioro.
const historicoBalance = [
  b('2021', 12672.1, 9588.3, 5758.6, 6592.3, 338.3, 568.2, 1472.2, 990.8, 4095.2, 3312.7, 567.3, 111.2, 2581.2, 2836.9, 16.8, 4631.9, 1447.9, 3061.7),
  b('2022', 13026.1, 9796.3, 5912.7, 6897.6, 330.6, 546.5, 1615.6, 1080.8, 4395.2, 3641.6, 552.7, 175.4, 2097.9, 2661.6, 13.8, 4655.9, 1472.6, 3309.7),
  b('2023', 13880.1, 10489.5, 6227.7, 7103.5, 330.6, 523.8, 1958.2, 1205.9, 4550.2, 3938.5, 405.0, 156.8, 2964.9, 2514.4, 9.0, 5166.6, 1610.0, 3746.5),
  b('2024', 15726.9, 11774.1, 7351.9, 8406.0, 330.6, 511.6, 2076.5, 1264.1, 5821.0, 5081.7, 388.5, 159.3, 2840.3, 2587.2, 35.2, 5432.6, 1888.3, 4347.8),
  b('2025', 17582.9, 13318.8, 8095.4, 9267.4, 330.6, 519.3, 2333.1, 1437.9, 7112.0, 5952.0, 425.0, 121.3, 3015.2, 2486.9, 22.1, 6235.8, 2079.7, 5065.0),
];

const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion) =>
  ({ periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras, emision_acciones, intereses_en_financiacion });
// capex = inmovilizado material + intangibles (sobre todo desarrollo capitalizado) + depósitos para compra de inmovilizado.
// desinversiones = ventas parciales de filiales a minoritarios (entrada de caja); recompras = recompras de Willfar.
const historicoFlujos = [
  f('2021', 251.6, 371.8, 10.6, 44.5, 198.1, 164.9, 0, 0, 98.4),
  f('2022', 863.2, 389.7, 11.2, 102.9, 45.9, 168.5, 157.1, 0, 111.7),
  f('2023', 1496.6, 564.6, 11.7, 38.0, 242.6, 206.3, 142.0, 0, 131.0),
  f('2024', 926.8, 522.3, 10.5, 95.0, 0, 254.3, 6.3, 0, 124.9),
  f('2025', 1407.7, 634.2, 22.1, 7.5, 0, 346.7, 127.5, 5.8, 104.8),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 11072.5, ebitda: 2201.7, ebit: 1807.0, beneficio_neto: 1064.5, bpa: 1.066, dpa: 0.422, dpa_extraordinario: 0, fcf: 214.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasan de 4.591 M CNY en 2021 a 10.074 M en 2025 (+21,8 % anual) y el beneficio atribuido de 268 a 1.058 M (+41 % anual) [1, 6, 10]. El crecimiento es orgánico: las compras de cinco años suman menos de 300 M y ninguna supera el 2 % de las ventas [1, 3, 5]. El margen bruto sube del 32,6 % de 2021 al 35,7 % de 2025 y el EBITDA (con la amortización del desarrollo capitalizado) del 15,4 % al 21,3 %, por mezcla (más distribución y centros de datos, más exterior) y apalancamiento de los gastos de venta y administración, que bajan del 13,4 % al 11,9 % de las ventas [6, 10]. El giro llega en 2026: en el 1S26 las ventas crecen un 23 % pero el margen bruto cae al 31,3 % (35,1 % un año antes), Willfar (energía con IA) vende un 22 % menos y el beneficio atribuido solo sube un 1 %, porque la parte que crece (servicios de energía digital, +98 %) es de margen menor y tiene más minoritarios [11, 14]. El BPA del 1S26 (0,444 CNY) es igual al del 1S25 con un 5 % más de acciones tras la colocación de abril [11, 15].',
    ajustes: 'Cifras publicadas, sin ajustes. Partidas a vigilar: el deterioro de clientes (48,6 M en 2025, 99,4 M en 2024 y 35,6 M en el 1S26) va dentro del EBIT y es recurrente [6, 11]; la I+D capitalizada (162,9 M en 2025) entra como capex y su amortización (151,3 M) en el EBITDA del informe se suma de vuelta, de modo que el EBITDA es más alto que el de una empresa que la gasta [6]. En 2025 hay una plusvalía de 14,2 M por la venta de una filial a Harbour Equity (no recurrente, inferior al 1 % del beneficio) [1]. Desde 2026 las opciones de venta concedidas a los minoritarios de Wayon Energy generan un coste por actualización (en «otras pérdidas», 6,4 M en el 1S26) [12].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S24', ingresos: 3741.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 717.9, margen_ebitda_pct: 19.2, bpa: 0.334, vs_consenso: null },
      { periodo: '2S24', ingresos: 4975.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 836.9, margen_ebitda_pct: 16.8, bpa: 0.378, vs_consenso: null },
      { periodo: '1S25', ingresos: 4390.4, crecimiento_pct: 17.3, crecimiento_organico_pct: null, ebitda: 875.4, margen_ebitda_pct: 19.9, bpa: 0.444, vs_consenso: null },
      { periodo: '2S25', ingresos: 5683.1, crecimiento_pct: 14.2, crecimiento_organico_pct: null, ebitda: 1272.7, margen_ebitda_pct: 22.4, bpa: 0.622, vs_consenso: null },
      { periodo: '1S26', ingresos: 5389.4, crecimiento_pct: 22.8, crecimiento_organico_pct: null, ebitda: 929.0, margen_ebitda_pct: 17.2, bpa: 0.444, vs_consenso: null },
    ],
    ultima_presentacion: 'Wasion publica semestres, sin conferencia con transcripción pública; se leen los dos últimos anuncios. En marzo de 2026 (resultados de 2025) la dirección vendía tres motores: centros de datos (pedidos duplicados), exterior y el ciclo de inversión de la red china, y el beneficio llegó al techo del aviso (1.058 M frente a 1.000-1.060 M) [6, 18]. En agosto, el discurso cambia de tono: se habla de pedidos récord (servicios de energía digital 4.469 M, +101 %; pedidos exteriores 4.435 M, +108 %; contratos de la red +46 %) y de que la contratación con la red crecerá más de un 30 % en 2026 por la base baja de 2025, pero el texto apenas explica la caída del margen bruto (31,3 % frente a 35,1 %), la caída del 22 % de Willfar ni el aumento de las cuentas a cobrar de 181-365 días (de 1.296 a 2.593 M en seis meses) [11]. Tampoco dice nada del estado de la salida a bolsa de Wayon Energy, solicitada el 27-ene-2026, mientras el informe intermedio revela 1.437 M de opciones de venta concedidas a sus minoritarios [12]. El mercado lo leyó como un beneficio por debajo de lo esperado: −13,8 % el 27-ago.',
    confianza: 'Media',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: [{ anio: 'A menos de un año (jun-27)', importe: 1440.3 }, { anio: 'De uno a cuatro años', importe: 904.3 }],
    liquidez: 'Caja y equivalentes 3.659,5 M + depósitos estructurados 135 M + productos financieros a corto 200 M (30-jun-2026), frente a 2.344,7 M de préstamos bancarios (1.440,3 M a menos de un año); además 393,5 M de depósitos pignorados que garantizan pagarés [11]. Neto: caja neta de ≈ 1.650 M.',
    rating: 'Sin rating',
    coste_deuda_pct: 4.2,
    vida_media_anios: null,
    otros_pasivos: 'Lo que no parece deuda y lo es: (1) opciones de venta concedidas en 2026 a minoritarios de Wayon Energy, 1.436,8 M a coste amortizado, ejercitables durante tres años si se dan «hechos desencadenantes» (en la práctica, que no salga a bolsa) [12]; (2) pagarés a proveedores por 1.844 M dentro de proveedores (financiación de circulante con garantía de 393,5 M de depósitos) [11]; (3) 23,3 M de obligación de recompra de acciones restringidas de Willfar [12]. Las cuentas a cobrar brutas son 8.893 M (el 43 % del activo) con 444 M de deterioro, y la parte de 181-365 días se dobla en el 1S26 (2.593 M) [11]; el auditor las trata como la primera cuestión clave de auditoría [1]. Sin contingencias materiales declaradas; compromisos de capex de 79,9 M [11].',
    comentario: 'El circulante es el problema del modelo: cuentas a cobrar de 7.112 M a fin de 2025 (71 % de las ventas; 8.449 M en junio de 2026) financiadas con proveedores y pagarés (5.952 M) [6, 11]. La deuda bancaria baja de 2.837 M (2021) a 2.487 M (2025) y la caja neta mejora porque el flujo operativo de 2023 y 2025 cubrió el capex; en el 1S26 la caja sube a 3.995 M solo por financiación: colocación de 1.291 M netos y 570 M de inversores en Wayon, con flujo operativo negativo (−161 M) [12]. El coste medio de la deuda es ≈ 4,2 % (106,6 M de gastos financieros sobre 2.537 M de deuda media en 2025), con tipos del 0,75 % al 8,87 % según el país [6, 11].',
    confianza: 'Alta',
  },
  flujos: {
    historico: historicoFlujos,
    comentario: 'La conversión en caja es irregular: flujo operativo de 252 M en 2021 (beneficio 428 M), 863 M en 2022, 1.497 M en 2023, 927 M en 2024 y 1.408 M en 2025, y negativo en el 1S26 (−161 M) por existencias (+609 M) y clientes (+1.336 M) [1, 3, 5, 12]. El capex sube de 372 M a 634 M (6,3 % de las ventas en 2025), con ≈ 160-185 M al año de desarrollo capitalizado y fábricas nuevas en Indonesia, Malasia, México, Brasil, Sudáfrica y Hungría [1, 11]. Estimación propia: el mantenimiento ronda la amortización (≈ 370 M en 2025) y el resto, ≈ 260 M, es crecimiento. Tras capex, arrendamientos e intereses, el FCF acumulado de 2021-2025 es ≈ 1.826 M, por debajo de los 1.141 M de dividendos, 404 M de dividendos a minoritarios, 433 M de recompras de Willfar y 288 M de compras del periodo (2.266 M): la diferencia la cubrieron ventas de participaciones a minoritarios (487 M) y, en 2026, la colocación [1, 3, 5, 12].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young (Hong Kong)', anios_auditor: null, opinion: 'Favorable (sin salvedades); cuestiones clave: deterioro de cuentas a cobrar y capitalización de gastos de desarrollo',
    comentario: 'Las cuentas son HKFRS auditadas por EY con opinión limpia [1]. Las dos cuestiones clave de auditoría son las que importan: las cuentas a cobrar brutas (7.449 M a fin de 2025, el 42 % del activo, con 413 M de deterioro estimado con un tasador externo) y la capitalización de desarrollo (428,6 M en balance; 162,9 M capitalizados en 2025, el 22 % del gasto en I+D) [1, 6]. La capitalización es estable (124-163 M al año) y su amortización la iguala (140-151 M), así que no infla el beneficio de forma visible [6, 7, 8, 9]. Lo que sí pesa es el circulante: el beneficio de 2021 se cobró a medias (flujo operativo 252 M) y en el 1S26 el flujo operativo es negativo con un beneficio de 651 M [5, 12]. El pago en acciones es pequeño (36,7 M en 2025, 3,5 % del beneficio) [1]. Los tres indicadores del motor se leen con esta cautela: un Beneish alto en 2025 o 2026 vendría del salto de clientes, que es real (el exterior y los centros de datos cobran a 90-365 días) pero también el principal riesgo de pérdidas [11].',
    senales: [
      { senal: 'Cuentas a cobrar de 181-365 días dobladas en el 1S26 (1.296 → 2.593 M)', nivel: 'Alta', comentario: 'Ventas a red china y a clientes exteriores con hitos; el deterioro del 1S26 (35,6 M) bajó frente al 1S25 (70,3 M) pese al envejecimiento [11].' },
      { senal: 'Flujo operativo negativo en el 1S26 (−161 M) con beneficio de 651 M', nivel: 'Media', comentario: 'Existencias +609 M y clientes +1.336 M por los pedidos de centros de datos y exterior [12].' },
      { senal: 'Opciones de venta a minoritarios de Wayon por 1.437 M', nivel: 'Media', comentario: 'Pasivo nuevo, contra reservas, que depende de la salida a bolsa de Wayon [12].' },
      { senal: 'Capitalización de desarrollo (22 % de la I+D)', nivel: 'Baja', comentario: 'Estable y amortizada al mismo ritmo; cuestión clave de auditoría [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo final anual (sin dividendo a cuenta) con un pago en torno al 40 % del beneficio: 0,48 HKD por acción con cargo a 2025 (0,422 CNY), frente a 0,38 HKD en 2024 y 0,20 HKD en 2021 [1, 6, 10]. En junio de 2026 anunció recompras en bolsa de hasta 200 M HKD y ha recomprado 13,2 M de acciones hasta el 16-oct (autocartera) [17]. La prioridad declarada para la caja de la colocación de abril (1.474 M HKD netos) es el exterior (34 %), relés de enclavamiento magnético y HVDC (15 %), I+D y fabricación (14 %), una compra en gestión digital de energía (14 %) y deuda y circulante [11].',
    adquisiciones: [
      { anio: '2023', objetivo: 'Filial (adquisición de una sociedad, nota 37)', importe: 38.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pequeña; sin deterioro del fondo de comercio posterior [3].' },
      { anio: '2024', objetivo: 'Compra de minoritarios de filiales', importe: 95.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Aumento de participación; sin efecto en el perímetro [1].' },
      { anio: '2026', objetivo: 'Dos sociedades (gestión digital de energía y otra), 1S26', importe: 73.0, ev_ebitda: null, financiacion: 'Caja de la colocación', resultado: 'Fondo de comercio +38 M; demasiado pronto [12].' },
      { anio: '2025', objetivo: 'Ampliación de capital de Wayon Energy con Boyu Capital (8 % por 380 M; 570 M en total con otros inversores en 2026)', importe: 570.0, ev_ebitda: null, financiacion: 'Venta de participación (entrada de caja)', resultado: 'Valora Wayon en ≈ 4.750 M después de la ampliación; a cambio, opciones de venta de 1.437 M si no sale a bolsa [12, 16].' },
    ],
    comentario: 'La dirección asigna capital con dos rasgos: reparte dividendo creciente y vende minorías de sus filiales para financiar el crecimiento (Willfar salió al STAR Market y Wasion bajó al 59,55 %; de Wayon ha vendido ≈ 8 puntos a inversores (del 68 % al ≈ 60 %)), en vez de endeudarse [1, 12]. El resultado es que los minoritarios ya se quedan con el 28,5 % del beneficio (31,5 % en el 1S26) [6, 11]. En abril de 2026, con la acción en máximos (31,94 HKD), colocó 50 M de acciones nuevas a 30 HKD (5 % de dilución): bien en el precio, pero en seis meses ha recomprado 13,2 M a 12-20 HKD, una cuarta parte de lo emitido [15, 17]. Las compras son pequeñas y sin deterioros; el ROIC y la dilución que calcula el motor dirán si el capital incremental rinde.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Soluciones de red inteligente (antes AMI eléctrico)', descripcion: 'Contadores eléctricos inteligentes monofásicos, trifásicos y de alta gama, transformadores de medida y monitorización; red china, red local y eléctricas exteriores (México, Brasil, África, Oriente Medio).', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1714.4, resultado: 56.1 }, { periodo: '2022', ingresos: 2059.3, resultado: 141.6 }, { periodo: '2023', ingresos: 2650.4, resultado: 286.7 }, { periodo: '2024', ingresos: 3198.8, resultado: 379.6 }, { periodo: '2025', ingresos: 3652.1, resultado: 598.7 }] },
      { nombre: 'Eficiencia energética con IA (Willfar, 59,55 %)', descripcion: 'Comunicaciones, chips de portadora, contadores de agua y gas y digitalización de la distribución; la opera la filial cotizada Willfar Information Technology (688100.SS).', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1719.4, resultado: 323.0 }, { periodo: '2022', ingresos: 1901.9, resultado: 373.7 }, { periodo: '2023', ingresos: 2117.0, resultado: 462.8 }, { periodo: '2024', ingresos: 2614.8, resultado: 603.4 }, { periodo: '2025', ingresos: 2857.1, resultado: 658.8 }] },
      { nombre: 'Servicios de energía digital (Wayon Energy)', descripcion: 'Distribución inteligente (aparamenta, reconectadores, transformadores), centros de datos (cabinas prefabricadas, distribución, HVDC, refrigeración líquida) y almacenamiento.', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 1156.9, resultado: 112.5 }, { periodo: '2022', ingresos: 1894.7, resultado: 104.8 }, { periodo: '2023', ingresos: 2484.9, resultado: 172.1 }, { periodo: '2024', ingresos: 2903.0, resultado: 257.0 }, { periodo: '2025', ingresos: 3564.3, resultado: 521.2 }] },
    ],
    geografias: [{ nombre: 'China', peso_pct: 70.2 }, { nombre: 'América', peso_pct: 13.1 }, { nombre: 'Asia sin China', peso_pct: 11.6 }, { nombre: 'África', peso_pct: 4.4 }, { nombre: 'Europa y otros', peso_pct: 0.7 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos de servicios de energía digital (1S)', valor_anterior: '2.227 M CNY', valor_actual: '4.469 M CNY', variacion: '+101 %', comentario: 'Centros de datos 1.892 M (+153 %) [11].' },
      { kpi: 'Pedidos exteriores (1S)', valor_anterior: '2.130 M CNY', valor_actual: '4.435 M CNY', variacion: '+108 %', comentario: 'Ventas exteriores del 1S26: 2.391 M (+92 %) [11].' },
      { kpi: 'Pedidos domésticos de red inteligente (1S)', valor_anterior: '776 M CNY', valor_actual: '1.131 M CNY', variacion: '+46 %', comentario: 'Red estatal 309 M, primer puesto [11].' },
      { kpi: 'Cartera de Willfar (contratos firmados pendientes)', valor_anterior: 'n.d.', valor_actual: '3.823 M CNY', variacion: null, comentario: 'Nuevos contratos del 1S26: 1.306 M [11].' },
      { kpi: 'Margen bruto (1S)', valor_anterior: '35,1 %', valor_actual: '31,3 %', variacion: '−3,9 pp', comentario: 'Mezcla hacia centros de datos y exterior [11].' },
      { kpi: 'Cuentas a cobrar netas', valor_anterior: '7.112 M (dic-25)', valor_actual: '8.449 M (jun-26)', variacion: '+19 %', comentario: 'Tramo de 181-365 días ×2 [11].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) Informe de gobierno 2025 (solo nombra a EY); 2) informes anuales 2021-2023 (EY ya era el auditor); 3) circular de la junta 2026 (reelección sin fecha de primer nombramiento)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'vs_consenso (1S24-1S25)', tipo: 'Complemento', intentos: '1) Anuncios de resultados (no comparan con consenso); 2) Guba y prensa (sin consenso previo publicado); 3) Emperor Capital (solo 2025)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Interim results announcement 1S26: revisión del mercado (red china, contadores en el mundo, distribución y centros de datos)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-08-27', url: `${H}/2026/0827/2026082700157.pdf` },
  { id: 2, titulo: 'Smart Meter Market – Global Forecast to 2031 (resumen público)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2026', url: 'https://www.marketsandmarkets.com/Market-Reports/smart-meter-market-609.html' },
  { id: 3, titulo: 'Annual Report 2025 (historia, ESG, segmentos, clientes)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-22', url: `${H}/2026/0422/2026042201403.pdf` },
  { id: 4, titulo: 'Fichas de Ningbo Sanxing, Linyang, Hexing, Itron, Landis+Gyr, NARI, XJ Electric y Kehua Data (ventas, margen operativo y EBITDA de los últimos 12 meses)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/ITRI/' },
  { id: 5, titulo: 'Voluntary announcement – State Grid tender results (contratos acumulados de 383 M CNY en 2026)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-05-07', url: `${H}/2026/0507/2026050701878.pdf` },
  { id: 6, titulo: 'Voluntary announcement – latest update on the development of overseas business (1.250 M CNY en Oriente Medio)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-12', url: `${H}/2026/1012/2026101200043.pdf` },
  { id: 7, titulo: 'Voluntary announcement – recent new overseas orders of Wayon Energy (> 4.000 M CNY en 2026)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-08', url: `${H}/2026/1008/2026100800326.pdf` },
  { id: 8, titulo: 'Proposed spin-off and separate listing of Wayon Energy Technology on the Main Board', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-01-27', url: `${H}/2026/0127/2026012700891.pdf` },
  { id: 9, titulo: '惟远能源递表港交所 (cifras del folleto de solicitud: ventas y beneficio 2023-9M25, accionistas)', editor: 'Sina Finance / Zhitong', tipo: 'Prensa', fecha: '2026-01-28', url: 'https://cj.sina.com.cn/articles/view/5835524730/15bd30a7a020023bk8' },
  { id: 10, titulo: 'Inclusion of the Company as a constituent stock of the Hang Seng Composite Index', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-02-20', url: `${H}/2026/0220/2026022000137.pdf` },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Ji Wei, antiguo directivo de comercio exterior de Hunan, funda el grupo en Changsha en 2000 con el equipo de I+D de Hunan Weisheng Electronics; sale a bolsa en Hong Kong en diciembre de 2005 [3]. Durante quince años es un fabricante de contadores para la red china; la transformación llega con tres decisiones: sacar a bolsa la filial de comunicaciones y chips (Willfar, STAR Market de Shanghái, hoy el 59,55 %), convertir la antigua división de distribución en Wayon Energy, orientada a centros de datos, y fabricar fuera (México, Brasil, Hungría, Tanzania, Sudáfrica, Indonesia, Malasia) [1, 3]. En 2025 entra en el índice compuesto Hang Seng y en el Stock Connect, y en 2026 coloca un 5 % de capital y pide la salida a bolsa de Wayon [8, 10]. El control sigue en la familia fundadora (52 %).',
    hitos: [
      { anio: '2000', hito: 'Fundación en Changsha (Hunan) por Ji Wei [3].' },
      { anio: '2005', hito: 'Salida a bolsa en el Main Board de Hong Kong (diciembre) [3].' },
      { anio: '2017-2021', hito: 'Ventas estancadas en torno a 3.000-4.600 M CNY y beneficio de 230-300 M [3].' },
      { anio: '2025', hito: 'Ventas de 10.074 M y beneficio de 1.058 M (+50 %); fábricas de Indonesia y Malasia en marcha [3].' },
      { anio: 'dic-2025', hito: 'Boyu Capital compra el 8 % de Wayon Energy por 380 M CNY [9].' },
      { anio: 'ene-2026', hito: 'Solicitud de salida a bolsa de Wayon Energy en Hong Kong (formulario A1, 27-ene) [8].' },
      { anio: 'mar-2026', hito: 'Entrada en el índice compuesto Hang Seng (efectiva el 9-mar) y en el Stock Connect [10].' },
      { anio: 'abr-2026', hito: 'Colocación de 50 M de acciones nuevas a 30 HKD (≈ 1.500 M HKD); máximo de la acción (33,80 HKD, 17-abr) [1].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de la medición inteligente (contadores eléctricos, de agua y gas, comunicaciones y plataformas AMI) en el mundo, al que se suma la distribución eléctrica de media tensión y la infraestructura de energía de centros de datos de Wayon, que no tienen un tamaño homogéneo publicado. Se usa la cifra de MarketsandMarkets para el mercado mundial de contadores (31.600 M USD en 2026, con 28.830 M en 2025) [2] y se contrasta con la que cita la empresa (ingresos mundiales del sector de 26.800 M USD en 2026, base instalada de 1.250 M de contadores y penetración del 56 %) [1]. La diferencia (≈ 15 %) es de perímetro: la de MarketsandMarkets incluye servicios y comunicaciones.',
    tamano: '≈ 31.600 M USD en 2026 (MarketsandMarkets) [2]; 26.800 M USD según la cifra que cita la empresa [1].',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 28830 }, { anio: '2026e', tamano: 31600 }, { anio: '2031e', tamano: 50820 }],
    tcac_historico_pct: null, tcac_previsto_pct: 10.0, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión de la red china (XV Plan quinquenal)', efecto: '+', horizonte: 'Estructural', evidencia: 'La red estatal prevé 4 billones CNY en 2026-2030 (+40 % frente al XIV Plan) y ejecutó 310.000 M en el 1S26 (+13 %) [1].' },
      { driver: 'Sustitución de contadores y AMI 2.0 fuera de China', efecto: '+', horizonte: 'Estructural', evidencia: 'Penetración mundial del 56 % con objetivo del 70 % en 2030; Latinoamérica, Oriente Medio y África crecen más de un 10 % al año [1].' },
      { driver: 'Demanda eléctrica de los centros de datos de IA', efecto: '+', horizonte: 'Estructural', evidencia: 'Consumo eléctrico de servicios de datos +45 % en enero-mayo de 2026 en China; pedidos de centros de datos de Wayon 1.892 M (+153 %) [1].' },
      { driver: 'Ciclo de licitaciones de la red (volumen y precio)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Las licitaciones centralizadas de contadores de 2025 quedaron por debajo de la media histórica; la empresa espera +30 % de contratación con la red en 2026 [1].' },
      { driver: 'Aranceles y localización', efecto: '−', horizonte: 'Estructural', evidencia: 'Obliga a fabricar en México, Brasil o Hungría para servir EE. UU., Latinoamérica y Europa [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'En China compiten en cada licitación de la red estatal decenas de fabricantes (Sanxing, Linyang, Hexing, Holley…); Wasion fue primera en el 1S26 con solo 309 M de contratos [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Dos redes estatales chinas y eléctricas públicas fuera; un cliente superó el 10 % de las ventas en 2025 (1.085 M) y los plazos de cobro llegan a 365 días o más [3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Componentes electrónicos y chips en parte propios (Willfar diseña chips de portadora); menos del 30 % de compras en los cinco primeros proveedores [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Las homologaciones de la red y de cada país (ANSI, MID, DLMS) son una barrera; en centros de datos entran fabricantes eléctricos grandes [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'El contador inteligente no tiene sustituto; el riesgo es que el valor pase al software y a los servicios (28 % de los ingresos del sector) [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La inversión de las dos redes chinas marcó récords en el 1S26 (cerca de 400.000 M CNY entre ambas, +13-15 %) y el XV Plan la sube un 40 % [1]. Las licitaciones de contadores, en cambio, bajaron en 2025 por debajo de la media y se recuperan en 2026. En 2020 la pandemia retrasó entregas y Wasion vendió un 8 % más que en 2019; en 2022 los confinamientos de China dejaron el margen EBITDA en el 15 % [3]. El tramo de centros de datos depende del gasto en IA, que hoy acelera.' },
    regulacion: 'En China, la red estatal homologa y licita los contadores con especificaciones técnicas nuevas (norma de 2025, que obliga a renovar producto y relés de enclavamiento magnético) [1]. El XV Plan quinquenal (2026-2030) y el plan de «coordinación de cómputo y electricidad» (que exige más del 80 % de energía verde en los centros de datos nuevos de los nodos nacionales a fin de 2026) empujan la distribución y la medición; el plan de «seis redes» de 2026 prioriza la distribución inteligente con bonos especiales [1]. Fuera, los aranceles de EE. UU. y la certificación ANSI (obtenida por Wasion Americas en octubre de 2026) condicionan el acceso [6].',
    tendencias: 'El contador pasa de aparato a pasarela con IA en el borde (desagregación de cargas, detección de fraude) y el negocio a hardware más software y servicios [1]. La gran tendencia es la electrificación de los centros de datos: HVDC de 800 V, transformadores de estado sólido y refrigeración líquida, donde Wayon está en desarrollo y compite con Vertiv, Schneider o Eaton fuera y con Kehua o Sungrow en China [1]. Wasion gana con la localización industrial fuera de China (pedidos exteriores +108 %), pero pierde margen: lo que crece es de margen bruto más bajo [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.2,
    posicion: 'Uno de los cinco primeros fabricantes chinos de contadores (primero en las licitaciones de la red estatal del 1S26) y ≈ 3 % del mercado mundial de medición inteligente (estimación propia: 6.509 M CNY de ventas de contadores y comunicaciones en 2025 sobre 28.830 M USD) [1, 2]. En distribución y centros de datos su cuota es pequeña.',
    competidores: [
      { nombre: 'Ningbo Sanxing Medical Electric', pais: 'China', ticker: '601567.SS', ingresos: 13650.8, cuota_pct: null, margen_ebit_pct: 7.5, comentario: 'Contadores y distribución para la red china, más hospitales; margen operativo bajo [4].' },
      { nombre: 'Jiangsu Linyang Energy', pais: 'China', ticker: '601222.SS', ingresos: 6920.4, cuota_pct: null, margen_ebit_pct: 12.5, comentario: 'Contadores, distribución y renovables; caja neta [4].' },
      { nombre: 'Hexing Electrical', pais: 'China', ticker: '603556.SS', ingresos: 5241.1, cuota_pct: null, margen_ebit_pct: 16.3, comentario: 'El más parecido: AMI sobre todo fuera de China (África, Latinoamérica) [4].' },
      { nombre: 'Itron', pais: 'EE. UU.', ticker: 'ITRI', ingresos: 15398.7, cuota_pct: null, margen_ebit_pct: 13.5, comentario: 'Líder en AMI en EE. UU., con mucho software y servicios [4].' },
      { nombre: 'Landis+Gyr', pais: 'Suiza', ticker: 'LAND.SW', ingresos: 7797.4, cuota_pct: null, margen_ebit_pct: 10.8, comentario: 'Contadores y AMI en Europa y EE. UU.; vendió EMEA [4].' },
      { nombre: 'Kehua Data', pais: 'China', ticker: '002335.SZ', ingresos: 8311.4, cuota_pct: null, margen_ebit_pct: 6.7, comentario: 'Competidor de Wayon en energía para centros de datos (SAI, cabinas) [4].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: cada licitación es independiente.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Homologaciones por país y compatibilidad con la plataforma AMI instalada (CPFL en Brasil, CFE en México renuevan pedidos anuales) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: '2.209 patentes y chips de comunicación propios de Willfar que cubren los estándares AMI de más del 70 % de los países [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBIT del grupo del 17,7 % en 2025 frente al 7,5-16,3 % de Sanxing, Linyang y Hexing; fábricas locales para evitar aranceles [1, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado de contadores grande y fragmentado; la escala ayuda en compras pero no excluye a nadie [2].' },
      ],
    },
    amenazas: 'La principal es el precio: en la red china la rivalidad en licitaciones y en el exterior la competencia de otros chinos (Hexing, Holley) presionan el margen, y lo que más crece (centros de datos y distribución fuera) tiene menos margen bruto, como se vio en el 1S26 (31,3 % frente a 35,1 %) [1]. En centros de datos compite con grupos mucho mayores (Schneider, Vertiv, Eaton) y con chinos especializados (Kehua); si la inversión en IA se frena, el segmento que más crece se para. Probabilidad media.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son tres: la calidad y seguridad del producto (un fallo de lote en contadores o en cabinas de centros de datos obliga a sustituir a cargo del fabricante; la empresa pagó penalizaciones por retraso de entregas en el 1S26) [1]; el cobro a eléctricas públicas de países emergentes (riesgo de crédito y de país en África, Oriente Medio y Latinoamérica) [1]; y la transición energética, que es su mercado: el negocio está alineado con la electrificación y la eficiencia, y el informe ESG de 2025 da cifras de emisiones propias sin coste material de CO₂ [3].',
    controversias: 'Sin sanciones, litigios ni incidentes relevantes en los últimos tres años en los anuncios de HKEX, los informes anuales (sin contingencias materiales) ni la prensa revisada [1, 3].',
    confianza: 'Baja',
  },
  negocio: {
    descripcion: 'Wasion Holdings, con sede operativa en Changsha (Hunan) y domicilio en las Caimán, fabrica y vende equipos de medición y distribución de energía en tres segmentos [3]. Soluciones de red inteligente (36 % de las ventas de 2025): contadores eléctricos inteligentes, transformadores de medida y monitorización, para la red estatal, la del sur, redes locales y eléctricas de México (CFE), Brasil (CPFL), África y Oriente Medio. Eficiencia energética con IA (28 %), que opera Willfar (cotiza en el STAR Market; Wasion tiene el 59,55 %): módulos y chips de comunicación, contadores de agua y gas, digitalización de la distribución. Servicios de energía digital (35 %), que opera Wayon Energy (≈ 60 %): aparamenta y reconectadores, transformadores, cabinas prefabricadas y distribución para centros de datos y almacenamiento. Tiene 5.442 empleados y fábricas en China, México, Brasil, Hungría, Tanzania, Sudáfrica, Indonesia y Malasia [1, 3].',
    como_gana_dinero: 'Vende equipos por contrato tras licitación: cada pedido de la red china o de una eléctrica extranjera se entrega en 6-36 meses (los de Oriente Medio de octubre, en tres años) y se cobra por hitos a 90-365 días [1, 6]. El ingreso recurrente son las reposiciones anuales de clientes como CFE o CPFL y el software AMI, todavía pequeño. El margen depende de la mezcla: contadores y chips para la red china dejan el margen bruto alto (≈ 35-40 %) y la distribución y los centros de datos fuera, menos (el margen bruto del grupo baja al 31,3 % en el 1S26 con su peso del 44 %) [1]. La I+D (7,3 % de las ventas) y los gastos de venta (7,8 %) son casi fijos, lo que da apalancamiento operativo. Las ventas se concentran en el segundo semestre (56 % en 2025) por el calendario de la red [1].',
    clientes: 'Un único cliente de contadores (por el tamaño, una de las dos redes estatales chinas) superó el 10 % de las ventas en 2025 (1.085 M, 10,8 %); los cinco primeros clientes suman menos del 30 % [3]. Los contratos son de licitación, de uno a tres años, sin renovación automática, aunque hay clientes fijos con pedidos anuales (CFE en México, hasta 695 M CNY en 2026; CPFL en Brasil) [1]. No hay prueba de poder de precios: el margen bruto subió de 2021 a 2025 por mezcla y escala, y bajó 3,9 puntos en el 1S26 al crecer lo de menos margen [1, 3]. Los plazos de cobro de hasta 365 días y la antigüedad creciente de los saldos dicen que el poder de negociación lo tiene el cliente.',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y tcac_historico_pct', tipo: 'Complemento', intentos: '1) Informe intermedio 1S26 (sin cuotas); 2) MarketsandMarkets resumen público (sin cuotas ni histórico); 3) IMARC y Grand View (resúmenes de pago)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe ESG 2025 (no cita calificaciones externas); 2) búsqueda MSCI y Sustainalytics para 3393; 3) Hang Seng ESG (sin ficha pública)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: biografías, informe de gobierno, participaciones de consejeros, remuneración (nota 8), operaciones vinculadas', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-22', url: `${H}/2026/0422/2026042201403.pdf` },
  { id: 2, titulo: 'Interim Report 2026: participaciones a 30-jun-2026, recompras, plan de acciones', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-09-18', url: `${H}/2026/0918/2026091800305.pdf` },
  { id: 3, titulo: 'Poll results of the annual general meeting held on 15 May 2026', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-05-15', url: `${H}/2026/0515/2026051501927.pdf` },
  { id: 4, titulo: 'Top-up placing of existing shares and subscription of new shares (vendedor: Star Treasure)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-21', url: `${H}/2026/0421/2026042100013.pdf` },
  { id: 5, titulo: 'Continuing connected transactions (Wayon Energy – Renox Technology, 34,3 % de Ji Wei y Kat Chit)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-11-14', url: `${H}/2025/1114/2025111400797.pdf` },
  { id: 6, titulo: 'Connected transaction – disposal of entire equity interest in a subsidiary (46 M CNY a Harbour Equity Partners)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2025-12-24', url: `${H}/2025/1224/2025122400383.pdf` },
  { id: 7, titulo: 'Avisos de compras del presidente Ji Wei (abril-agosto de 2026) y venta de Li Hong (abril), resumidos en el foro de Eastmoney', editor: 'Eastmoney Guba (noticias de Zhitong y Gelonghui)', tipo: 'Prensa', fecha: '2026-08-31', url: 'https://guba.eastmoney.com/list,hk03393.html' },
  { id: 8, titulo: 'Voluntary announcement – intention to conduct on-market share repurchase (hasta 200 M HKD)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-16', url: `${H}/2026/0616/2026061600602.pdf` },
  { id: 9, titulo: 'Positive profit alert (2025)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-03-06', url: `${H}/2026/0306/2026030600210.pdf` },
  { id: 10, titulo: 'Announcement of the interim results 1S26 (previsión de contratación con la red +30 % en 2026)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-08-27', url: `${H}/2026/0827/2026082700157.pdf` },
  { id: 11, titulo: 'Grant of share awards (410.000 acciones)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-09-01', url: `${H}/2026/0901/2026090103587.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Ji Wei', cargo: 'Presidente ejecutivo y fundador', desde: '2000', participacion_pct: 52.4, trayectoria: 'Fundó el grupo en 2000 tras dirigir comercio exterior en empresas públicas de Hunan; 69 años. Con él las ventas pasaron de 3.000 M (2017) a 10.074 M (2025) [1].' },
      { nombre: 'Kat Chit', cargo: 'Consejero delegado (CEO)', desde: '2022', participacion_pct: 0, trayectoria: 'Hijo del fundador, 42 años; banca de mercados de capitales en Macquarie (2007-2011); consejero desde 2014 y CEO desde junio de 2022, periodo en el que el beneficio se ha triplicado (324 → 1.058 M) [1].' },
      { nombre: 'Choi Wai Lung Edward', cargo: 'Director financiero y secretario', desde: null, participacion_pct: 0, trayectoria: 'Contable colegiado en Hong Kong con más de 35 años de experiencia [1].' },
      { nombre: 'Li Hong', cargo: 'Consejera ejecutiva; presidenta de Willfar', desde: '2020', participacion_pct: 0.06, trayectoria: 'Dirige Willfar, que llevó al STAR Market; sus ventas crecieron a 2.978 M en 2025 pero el beneficio cae un 34 % en el 1S26 [1].' },
      { nombre: 'Cao Zhao Hui', cargo: 'Consejera no ejecutiva; presidenta de Wayon Energy', desde: '2005', participacion_pct: 0.19, trayectoria: 'En el grupo desde 2000; Wayon duplicó ventas exteriores y pedidos en el 1S26 [1, 10].' },
      { nombre: 'Tian Zhongping', cargo: 'Consejero ejecutivo; presidente de Wasion Holdings International', desde: '2017', participacion_pct: 0.03, trayectoria: 'Ingeniero de la casa desde 2002; responsable del exterior, cuyas ventas crecieron un 92 % en el 1S26 [1, 10].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Aviso de beneficio: 1.000-1.060 M CNY (+42-50 %)', real: '1.058 M (+50 %)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Contratación con la red china +30 % en 2026 (cualitativa, agosto)', real: 'Pendiente (1S26: pedidos de la red +53 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de la casa: el fundador preside, su hijo es CEO desde 2022 y los demás ejecutivos llevan 20-25 años [1]. No publica guía numérica más allá de los avisos obligatorios de beneficio; el de 2025 se cumplió en el techo [9]. La sucesión está resuelta dentro de la familia, lo que da continuidad pero concentra el poder. Lo que resta credibilidad es la comunicación de 2026: el semestre se presentó con titulares de pedidos y sin explicar la caída de margen, el freno de Willfar ni el estado de la salida a bolsa de Wayon [10]. A favor, el presidente ha comprado en bolsa en cinco ocasiones entre abril y agosto (≈ 2,0 M de acciones) [7].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ji Wei', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2004', comisiones: 'Nombramientos (presidente)' },
      { nombre: 'Kat Chit', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: null },
      { nombre: 'Li Hong', cargo: 'Consejera', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Zheng Xiao Ping', cargo: 'Consejera', tipo: 'Ejecutivo', desde: '2005', comisiones: null },
      { nombre: 'Tian Zhongping', cargo: 'Consejero', tipo: 'Ejecutivo', desde: '2017', comisiones: null },
      { nombre: 'Cao Zhao Hui', cargo: 'Consejera', tipo: 'Otro externo', desde: '2005', comisiones: null },
      { nombre: 'Chan Cheong Tat', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente), remuneraciones, nombramientos' },
      { nombre: 'Jiang Xinjian', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, remuneraciones' },
      { nombre: 'Zhang Libin', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría, nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.57, voto_remuneracion_contra_pct: 0.43, voto_remuneracion_contra_libre_pct: 1.18, voto_cupula_pct: 99.48,
    remuneracion_ceo: { anio: '2025', total: 1.649, fijo: 1.649, variable_corto: 0, variable_largo: 0, ratio_salario_medio: null },
    remuneracion: 'Los consejeros cobran poco: el CEO 1,65 M CNY en 2025, todo en salario y prestaciones, y el presidente 0,55 M; el total de los ejecutivos es 8,4 M, con 1,9 M en acciones (Tian y Li) [1]. No hay variable a largo plazo ligado a ROIC, TSR o FCF; el plan de acciones nuevo de 2026 (aprobado con un 17,5 % en contra, ≈ 54 % del capital libre presente) deja la concesión al consejo [3]. La junta no vota un informe de remuneración (en Hong Kong solo autoriza al consejo a fijarla: 0,43 % en contra). El incentivo real de la familia es su 52 % del capital, no el sueldo. Sin cláusulas de recuperación publicadas.',
    accionistas: [
      { nombre: 'Star Treasure Investments Holdings (Ji Wei)', pct: 52.4, tipo: 'Control (familia fundadora)', variacion: 'Vende 50 M y suscribe 50 M en la colocación de abril; compra ≈ 2,0 M en bolsa (abr-ago 2026)' },
      { nombre: 'Autocartera', pct: 1.3, tipo: 'Autocartera', variacion: '13,2 M de acciones recompradas desde junio de 2026' },
      { nombre: 'Consejeros (Zheng, Cao, Li, Tian, Chan)', pct: 0.6, tipo: 'Consejo', variacion: 'Li Hong vende 0,58 M en abril' },
    ],
    insiders: [
      { fecha: '2026-04-07', persona: 'Li Hong (consejera)', operacion: 'Venta', acciones: 580000, importe: 14.7 },
      { fecha: '2026-04-28', persona: 'Ji Wei (presidente, vía Star Treasure)', operacion: 'Compra', acciones: 700000, importe: 15.1 },
      { fecha: '2026-05-12', persona: 'Ji Wei', operacion: 'Compra', acciones: 400000, importe: 8.4 },
      { fecha: '2026-05-27', persona: 'Ji Wei', operacion: 'Compra', acciones: 200000, importe: 4.0 },
      { fecha: '2026-07-17', persona: 'Ji Wei', operacion: 'Compra', acciones: 400000, importe: 5.9 },
      { fecha: '2026-08-31', persona: 'Ji Wei', operacion: 'Compra', acciones: 300000, importe: 4.5 },
    ],
    control_y_defensas: 'Ji Wei controla el 52 % a través de Star Treasure (BVI) y su hijo es CEO: decide la junta y el consejo [1, 2]. Seis de nueve consejeros son ejecutivos o del grupo; los tres independientes cumplen el mínimo de la bolsa y presiden auditoría. Una acción, un voto, sin blindajes estatutarios. Las vinculadas son pequeñas pero existen: Wayon vende almacenamiento a Renox (34,3 % de Ji Wei y Kat Chit) con límites de 150 M en 2026 y 300 M en 2027, y en diciembre de 2025 se vendió una filial a Harbour Equity Partners por 46 M, calificada como operación vinculada [5, 6]. Los minoritarios libres votaron en contra del mandato para emitir el 20 % del capital (≈ 68 % del capital libre presente) y del plan de acciones (≈ 54 %), que salieron adelante con el voto del control [3].',
    alertas: [
      'Colocación del 5 % a 30 HKD en abril de 2026, con el accionista de control como vendedor en el «top-up», a cuatro días del máximo; la acción cae un 64 % desde entonces [4].',
      'Ventas a Renox (34,3 % de la familia) con límites crecientes (150 M en 2026, 300 M en 2027) [5].',
      'Opciones de venta de 1.437 M concedidas a inversores de Wayon cuya salida a bolsa no aparece entre las solicitudes vivas de HKEX [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo.ratio_salario_medio', tipo: 'Complemento', intentos: '1) Informe anual 2025 (gasto de personal sin plantilla media); 2) informe ESG (plantilla, sin coste); 3) cálculo con 5.448 empleados descartado por mezclar filiales y países', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 3393.HK, ^HSI y 2800.HK (precio, rango, volumen, rentabilidades, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/3393.HK/history/' },
  { id: 2, titulo: 'Wasion Holdings (3393) – Stock forecast: precio objetivo, recomendaciones y estimaciones (S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://stockanalysis.com/quote/hkg/3393/forecast/' },
  { id: 3, titulo: 'Estimaciones de consenso (earningsTrend) y datos de valoración de Wasion y de los comparables', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/3393.HK/analysis/' },
  { id: 4, titulo: 'Euro foreign exchange reference rates (CNY, HKD, USD, CHF) del 16-oct-2026 e histórico', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml' },
  { id: 5, titulo: '中债国债收益率曲线 (curva de deuda pública china): 10 años, 19-oct-2026', editor: 'ChinaBond (China Central Depository & Clearing)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Wasion Holdings (3393): nota tras la colocación (objetivo 32,60 HKD, PER 17,5x)', editor: 'Emperor Capital', tipo: 'Analistas', fecha: '2026-05-14', url: 'https://www.emperorcapital.com/en/market-trend/company-research-report-1/20260514-wasion-holdings-3393/' },
  { id: 8, titulo: 'Next Day Disclosure Return (acciones en circulación a 16-oct-2026) y Monthly Return de septiembre', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-16', url: `${H}/2026/1016/2026101600691.pdf` },
  { id: 9, titulo: 'Willfar Information Technology (688100.SS): cotización y capitalización', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/688100.SS/' },
  { id: 10, titulo: 'Annual Report 2021 (resumen de cinco años: beneficio 2017-2021)', editor: 'Wasion Holdings Limited (HKEXnews)', tipo: 'Primaria', fecha: '2022-04-28', url: `${H}/2022/0428/2022042801763.pdf` },
];
const r = bolsa.bolsa;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Wasion Holdings Limited (威勝控股有限公司)', nombre_corto: 'Wasion', ticker: '3393.HK', isin: 'KYG9463P1081',
    mercado: 'Bolsa de Hong Kong (Main Board); en el Stock Connect desde marzo de 2026', indice_referencia: 'Hang Seng (^HSI; ETF 2800.HK)',
    pais: 'China (domicilio en las Caimán, sede en Hong Kong y Changsha)', pais_iso: 'CN', sector: 'Tecnología de la información', industria: 'Equipos electrónicos e instrumentos (medición y distribución de energía)',
    sede: 'Changsha (Hunan) y Hong Kong', fundacion: '2000', empleados: 5442, web: 'https://www.wasion.com',
    precio: 10.46, fecha_precio: '2026-10-16', acciones: 1033.5, capitalizacion_publicada: null, free_float_pct: 47.0,
    max_52s: 28.80, min_52s: 10.08, volumen_medio_diario: '≈ 60 M HKD/día (3 meses)', proximos_resultados: '2027-03-26',
  },
  consenso: {
    guidance: 'Sin guía numérica. En el 1S26 la dirección espera que la contratación con la red china crezca más del 30 % en 2026 por la base baja de 2025, y que las mejoras de coste del nuevo contador se noten en el 2S26; Wayon suma más de 4.000 M CNY de pedidos exteriores en 2026 hasta el 8-oct (centros de datos y distribución) y el grupo 1.250 M en Oriente Medio a entregar en tres años (anuncios del 8 y 12-oct) [8].',
    estimaciones: [
      { periodo: '2026e', ingresos: 12870.8, ebitda: null, ebit: null, bpa: 1.137, dpa: null, fuente: 'Yahoo Finance (6 analistas) y Stock Analysis/S&P Global [2, 3]' },
      { periodo: '2027e', ingresos: 15826.8, ebitda: null, ebit: null, bpa: 1.382, dpa: null, fuente: 'Yahoo Finance (6 analistas) y Stock Analysis/S&P Global [2, 3]' },
    ],
    recomendaciones: { n_analistas: 7, comprar: 7, mantener: 0, vender: 0, po_medio: 20.30, po_min: 17.93, po_max: 23.11 },
    revisiones: 'Recortes: el BPA de 2026 del consenso pasa de 1,352 a 1,137 CNY en 90 días (−16 %) y el de 2027 de 1,606 a 1,382 (−14 %) tras el semestre [3]. Los objetivos también bajan: Guoyuan de 26,80 a 21,00 HKD (25-sep), CICC y Citi en 22,00 HKD (29-ago), frente a 32,00 de J.P. Morgan en junio y 32,60 de Emperor en mayo [2, 7]. La media de 23,82 HKD (siete analistas, todos «comprar») va por detrás del precio: la acción cotiza un 48 % por debajo. Solo hay una fuente gratuita con estimaciones completas (Yahoo/S&P); el objetivo y las recomendaciones se contrastan con Stock Analysis.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: r.tipo_rentabilidad,
    rentabilidades: r.rentabilidades,
    anual: r.anual,
    beta: 0.56, volatilidad_pct: r.volatilidad_pct ?? null, max_drawdown_pct: r.max_drawdown_pct ?? null, posicion_corta_pct: null,
    comentario: null, contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 2.79, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 2.30, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 3.57, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 6.76, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 15.41, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes de contadores y AMI (Sanxing, Linyang, Hexing en China; Itron y Landis+Gyr fuera), dos de equipos de red chinos que compiten con Wayon en distribución (NARI, XJ Electric) y uno de energía para centros de datos (Kehua Data). Se excluye Willfar porque es filial consolidada, y Holley por no cotizar. PER y crecimiento de los próximos 12 meses con el consenso de Yahoo (2026e y 2027e ponderados 2,5/9,5 meses; Landis+Gyr cierra en marzo), EV/EBITDA de los últimos 12 meses del mismo proveedor; capitalizaciones en CNY al cambio del BCE del 16-oct [3, 4].',
    empresas: [
      { nombre: 'Ningbo Sanxing Medical Electric', ticker: '601567.SS', pais: 'CN', capitalizacion: 17720, ev_ventas: 1.35, ev_ebitda_ltm: 17.2, ev_ebitda_ntm: null, per_ntm: 9.8, crecimiento_pct: 26.9, margen_ebitda_pct: 7.8, roic_pct: null, dn_ebitda: 0.9, fcf_yield_pct: 4.2 },
      { nombre: 'Jiangsu Linyang Energy', ticker: '601222.SS', pais: 'CN', capitalizacion: 12431, ev_ventas: 1.44, ev_ebitda_ltm: 8.6, ev_ebitda_ntm: null, per_ntm: 12.3, crecimiento_pct: 19.9, margen_ebitda_pct: 16.8, roic_pct: null, dn_ebitda: -1.8, fcf_yield_pct: 11.9 },
      { nombre: 'Hexing Electrical', ticker: '603556.SS', pais: 'CN', capitalizacion: 10406, ev_ventas: 1.51, ev_ebitda_ltm: 10.0, ev_ebitda_ntm: null, per_ntm: 11.4, crecimiento_pct: 13.6, margen_ebitda_pct: 15.1, roic_pct: null, dn_ebitda: -2.7, fcf_yield_pct: 2.1 },
      { nombre: 'NARI Technology', ticker: '600406.SS', pais: 'CN', capitalizacion: 184650, ev_ventas: 2.35, ev_ebitda_ltm: 15.8, ev_ebitda_ntm: null, per_ntm: 18.7, crecimiento_pct: 17.7, margen_ebitda_pct: 14.9, roic_pct: null, dn_ebitda: -2.1, fcf_yield_pct: 0.0 },
      { nombre: 'XJ Electric', ticker: '000400.SZ', pais: 'CN', capitalizacion: 23203, ev_ventas: 1.15, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: 15.4, crecimiento_pct: 23.6, margen_ebitda_pct: 9.1, roic_pct: null, dn_ebitda: -4.7, fcf_yield_pct: 2.8 },
      { nombre: 'Itron', ticker: 'ITRI', pais: 'US', capitalizacion: 24311, ev_ventas: 1.96, ev_ebitda_ltm: 12.5, ev_ebitda_ntm: null, per_ntm: 12.1, crecimiento_pct: 9.4, margen_ebitda_pct: 15.7, roic_pct: null, dn_ebitda: 2.4, fcf_yield_pct: 8.1 },
      { nombre: 'Landis+Gyr', ticker: 'LAND.SW', pais: 'CH', capitalizacion: 11083, ev_ventas: 1.76, ev_ebitda_ltm: 10.4, ev_ebitda_ntm: null, per_ntm: 17.9, crecimiento_pct: 0.7, margen_ebitda_pct: 14.0, roic_pct: null, dn_ebitda: 1.5, fcf_yield_pct: 0.5 },
      { nombre: 'Kehua Data', ticker: '002335.SZ', pais: 'CN', capitalizacion: 19267, ev_ventas: 2.04, ev_ebitda_ltm: 19.2, ev_ebitda_ntm: null, per_ntm: 23.4, crecimiento_pct: 27.9, margen_ebitda_pct: 10.6, roic_pct: null, dn_ebitda: -2.4, fcf_yield_pct: 9.3 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Anuncios de HKEX de Wasion (solo la ampliación de Wayon con Boyu, sin múltiplo publicado); 2) operaciones del sector (Itron, Landis+Gyr, Hubbell-Aclara) sin múltiplo verificable en fuente primaria a menos de siete años; 3) prensa china sobre compras de fabricantes de contadores (sin múltiplos)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y roic_pct', tipo: 'Complemento', intentos: '1) Yahoo (sin EBITDA de consenso); 2) MarketScreener (pide registro); 3) Stock Analysis (de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) HKEX short selling turnover (solo volumen diario); 2) SFC posiciones cortas agregadas (no abre sin navegador); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: '威胜控股(03393) 股吧 – páginas 1-4 (julio-octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://guba.eastmoney.com/list,hk03393.html' },
  { id: 2, titulo: '威胜控股(03393) 股吧 – hilos de abril-junio de 2026 (colocación, caída, compras del presidente)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-06-30', url: 'https://guba.eastmoney.com/list,hk03393_4.html' },
  { id: 3, titulo: 'Wasion Holdings – narrativas y cambios de objetivo de la comunidad', editor: 'Simply Wall St (comunidad)', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://simplywall.st/community/narratives/hk/tech/hkg-3393/wasion-holdings-shares/nas3p848-3393-new-contracts-and-steady-metrics-will-shape-outlook-after-recent-tender-wins/updates' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Eastmoney Guba (03393), jul-oct', fecha: '2026-10', n_comentarios: 60, tono: 'Dividido', resumen: 'Mayoría de titulares de pedidos y recompras; los mensajes de inversores alternan «垃圾股» (acción basura) y «跌就是送钱» (caer es regalar dinero); un hilo debate si conviene más comprar Wasion en Hong Kong o Willfar en Shanghái [1].' },
      { plataforma: 'Eastmoney Guba (03393), abr-jun', fecha: '2026-06', n_comentarios: 50, tono: 'Negativo', resumen: 'Enfado con la colocación tras la subida («股价拉高再配股», subir el precio y colocar) y con los inversores atrapados del Stock Connect que compraron a 24-26 HKD [2].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2026-10', n_comentarios: 6, tono: 'Neutro', resumen: 'Actualizaciones automáticas de objetivo tras los recortes de analistas; poco debate propio [3].' },
    ],
    temas: [
      { tema: 'Colocación en máximos por el accionista de control', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto: 50 M de acciones a 30 HKD el 21-abr, cerca del máximo de 33,80; desde entonces −59 % [1, 2].' },
      { tema: 'Pedidos exteriores y centros de datos', postura: 'Alcista', peso: 'Alto', contraste: 'Los pedidos existen (Wayon > 4.000 M en el exterior en 2026), pero el 1S26 mostró que convierten en ventas con menos margen [1].' },
      { tema: 'Willfar frente a Wasion (qué cotiza más barato)', postura: 'Dividida', peso: 'Medio', contraste: 'Con Willfar a 23,55 CNY, la participación del 59,55 % vale ≈ 6.900 M CNY, el 64 % de la capitalización de Wasion [1].' },
      { tema: 'Recompras y compras del presidente', postura: 'Alcista', peso: 'Medio', contraste: 'Ciertas: 13,2 M de acciones recompradas y ≈ 2 M compradas por Ji Wei; no han frenado la caída [1].' },
    ],
    lectura: 'El inversor chino de Stock Connect, que entró con la inclusión en el Hang Seng compuesto, está atrapado y castiga la acción; el tono es de capitulación (mensajes de «vender en el suelo») más que de euforia. Esto contradice al consenso de analistas (siete «comprar» con objetivos un 48-90 % por encima). El foro no aporta riesgos nuevos, pero confirma dos: la desconfianza por la colocación del control y la duda sobre si los pedidos se traducen en beneficio. Ninguna cifra del informe sale de aquí.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas (foros occidentales)', tipo: 'Complemento', intentos: '1) Seeking Alpha RSS (sin cobertura de 3393); 2) Stocktwits (sin flujo); 3) Reddit (403)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
