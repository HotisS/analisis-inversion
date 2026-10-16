// Notas A-E de HKEX (corte 2026-10-16), escritas por el analista sin subagentes (no hay herramienta para lanzarlos).
// Cifras copiadas de los documentos de notas/docs (informes anuales 2019, 2021, 2023 y 2025, resultados 1S26, 9M25, 1T26,
// Monthly Market Highlights de sep-2026) y de proveedores citados. Ejecutar: node informes/hkex-2026-10-16/notas/construir.mjs
import { writeFileSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const dir = dirname(fileURLToPath(import.meta.url));
const w = (n, o) => writeFileSync(join(dir, n), JSON.stringify(o, null, 2));
const bolsa = JSON.parse(readFileSync(join(dir, 'bolsa.json'), 'utf8'));

// ---------------------------------------------------------------- A. Cuentas
// Ingresos = «revenue and other income less transaction-related expenses» MENOS el rendimiento de los Corporate Funds
// (la caja propia), que va al resultado financiero; la caja propia va en el puente. EBITDA = el publicado menos ese rendimiento.
const anual = [
  // periodo, ingr. y otros − gastos de transacción, rto. Corporate Funds, opex, EBITDA publicado, amort., gastos fin., participadas, BAI, impuestos, minoritarios, BN, BPA básico, BPA diluido, DPA
  ['2018', 15813, 207, 4056, 11757, 762, 114, 2, 10883, 1592, -21, 9312, 7.50, 7.48, 6.71],
  ['2019', 16260, 1233, 3997, 12263, 1044, 177, 32, 10951, 1561, -1, 9391, 7.49, 7.47, 6.71],
  ['2020', 19080, 842, 4439, 14641, 1197, 181, 69, 13332, 1845, -18, 11505, 9.11, 9.09, 8.17],
  ['2021', 20798, 708, 4529, 16269, 1354, 154, 80, 14841, 2343, -37, 12535, 9.91, 9.89, 8.87],
  ['2022', 18280, -48, 5095, 13185, 1459, 138, 71, 11659, 1564, 17, 10078, 7.96, 7.95, 7.14],
  ['2023', 20269, 1487, 5441, 14828, 1443, 135, 82, 13332, 1351, 119, 11862, 9.37, 9.36, 8.41],
  ['2024', 22042, 1748, 5761, 16281, 1402, 114, 88, 14853, 1698, 105, 13050, 10.32, 10.29, 9.26],
  ['2025', 28864, 1870, 6068, 22796, 1568, 96, 26, 21158, 3321, 83, 17754, 14.05, 14.01, 12.52],
];
const cuenta = anual.map(([p, rt, cf, opex, eb, am, gf, jv, bai, imp, mi, bn, bpa, bpad, dpa]) => {
  const lseg = p === '2019' ? 123 : 0; // costes de la propuesta sobre LSEG (2019), fuera del EBITDA publicado
  const ebitda = eb - cf - lseg;
  return {
    periodo: p, ingresos: rt - cf, coste_ventas: null, gastos_generales: null, ebitda, amortizaciones: am,
    ebit: ebitda - am, resultado_financiero: cf - gf + jv, bai, impuestos: imp, minoritarios: mi, beneficio_neto: bn,
    gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: lseg || null,
    bpa: bpad, dpa, dpa_extraordinario: 0, acciones_diluidas: Math.round((bn / bpad) * 10) / 10,
  };
});
const bal = [
  // periodo, fondo de comercio, intangibles (resto), inmovilizado, derechos de uso, Corporate Funds, «skin in the game», deuda, arrendamientos, PN dominante, minoritarios, reservas (ganancias acumuladas)
  ['2018', 13298, 4721, 1625, 0, 24833, 724, 1166, 0, 40729, 174, 13379],
  ['2019', 13344, 5034, 1589, 2366, 29138, 818, 418, 2506, 44173, 328, 14204],
  ['2020', 13286, 5451, 1657, 2193, 33747, 1241, 423, 2358, 48918, 318, 17214],
  ['2021', 13361, 5611, 1605, 1896, 33794, 1267, 426, 2059, 49626, 284, 18173],
  ['2022', 13367, 5601, 1640, 1446, 34830, 1298, 491, 1745, 49728, 371, 18547],
  ['2023', 13371, 5908, 1553, 1370, 34812, 1571, 447, 1604, 51344, 452, 19723],
  ['2024', 13297, 6308, 1504, 1174, 36880, 2080, 452, 1294, 53852, 555, 21890],
  ['2025', 13274, 6664, 1822, 3134, 39393, 2276, 398, 851, 58147, 582, 25653],
];
const historicoBal = bal.map(([p, fc, int, inm, rou, cf, sitg, deuda, arr, pn, mi, res]) => ({
  periodo: p, activo_total: null, activo_corriente: null, pasivo_corriente: null, pasivo_total: null,
  fondo_comercio: fc, intangibles: int, inmovilizado_material: inm + rou, existencias: 0, clientes: null, proveedores: null,
  activos_contrato: null, pasivos_contrato: null, caja: cf - sitg, deuda_financiera: deuda, arrendamientos: arr,
  patrimonio_neto: pn, minoritarios: mi, reservas: res,
}));
const flu = [
  // periodo, flujo operativo principal (no HKFRS), capex, principal arrendamientos, adquisiciones, dividendos, compras para el plan de acciones, intereses en financiación
  ['2018', 10416, 860, 0, 0, 5427, 300, 104],
  ['2019', 11143, 1091, 159, 0, 5785, 285, 181],
  ['2020', 11956, 1351, 284, 0, 6983, 31, 176],
  ['2021', 13897, 1070, 310, 0, 11527, 681, 151],
  ['2022', 13062, 1284, 309, 0, 9665, 350, 134],
  ['2023', 11294, 1386, 307, 0, 10316, 448, 128],
  ['2024', 12783, 1604, 255, 0, 10416, 481, 109],
  ['2025', 19855, 4881, 251, 455, 13781, 512, 91],
];
const historicoFlu = flu.map(([p, fo, cx, la, adq, div, rec, int]) => ({
  periodo: p, flujo_operativo: fo, capex: cx, pagos_arrendamientos: la, adquisiciones: adq, desinversiones: 0,
  dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: int,
}));
const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: {
      periodo: 'LTM jun-26', fecha_fin: '2026-06-30',
      // 2025 + 1S26 − 1S25: ingresos 31.518 − rto. caja propia 1.909; EBITDA 25.268 − 1.909; amortización 1.602
      ingresos: 29609, ebitda: 23359, ebit: 21757, beneficio_neto: 19803, bpa: 15.63, dpa: 13.95, dpa_extraordinario: 0,
      fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    },
    cambios_perimetro: [],
    comentario: 'Los ingresos de este informe son los «revenue and other income less transaction-related expenses» publicados sin el rendimiento de la caja propia (Corporate Funds: 1.870 M en 2025, −48 M en 2022), que pasa al resultado financiero; el rendimiento de los fondos de garantía y márgenes de los miembros (Margin Funds y Clearing House Funds) sí queda en ingresos porque nace de la actividad de compensación [A1]. Con ese criterio los ingresos pasan de 15.606 M en 2018 a 26.994 M en 2025 y el EBITDA de 11.550 M a 20.926 M; el crecimiento es orgánico (sin compras relevantes desde la LME en 2012) y sigue al volumen: 2022 cayó un 9 % con la contratación media diaria en 124.900 M (−25 %) y 2025 subió un 33 % con 249.800 M (+90 %) [A1, A3]. El margen EBITDA sin caja propia va del 71,0 % (2023) al 77,5 % (2021 y 2025): los costes son casi fijos (6.068 M en 2025, +5 %) y cada punto de volumen cae al margen [A1]. 1S26: ingresos y otros 16.702 M (+19 %), EBITDA 13.411 M (+23 %) y beneficio 10.568 M (+24 %), récord semestral [A2].',
    ajustes: 'No hay EBITDA ajustado distinto del publicado: la cifra «EBITDA (non-HKFRS)» de HKEX excluye participadas y gastos financieros [A1]. Ajustes del informe: (1) rendimiento de la caja propia fuera de ingresos y EBITDA (en 1S26 incluye 298 M de revalorización de participaciones no cotizadas, no recurrente) [A2]; (2) en 2019, 123 M de costes de la propuesta de compra de LSEG, fuera del EBITDA publicado, se tratan como no recurrentes [A5]; (3) en 2025 una multa de 90 M de la FCA por el níquel de 2022 dentro de los gastos y en 1S26 una indemnización de seguro de 24 M, sin ajustar por su tamaño (0,3 % de los ingresos) [A1, A2]; (4) plusvalía contable de 76 M por modificación de arrendamientos en 2025, dentro del resultado [A1]. El BPA es el diluido publicado.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 6315, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 5254, margen_ebitda_pct: null, bpa: 3.23, vs_consenso: null },
      { periodo: '2T25', ingresos: 6639, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 5685, margen_ebitda_pct: 80, bpa: 3.51, vs_consenso: null },
      { periodo: '3T25', ingresos: 7484, crecimiento_pct: 54.2, crecimiento_organico_pct: null, ebitda: 6225, margen_ebitda_pct: 81, bpa: 3.88, vs_consenso: null },
      { periodo: '4T25', ingresos: 6665, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 5632, margen_ebitda_pct: null, bpa: 3.43, vs_consenso: null },
      { periodo: '1T26', ingresos: 7685, crecimiento_pct: 21.7, crecimiento_organico_pct: null, ebitda: 6592, margen_ebitda_pct: 81, bpa: 4.10, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 7789, crecimiento_pct: 17.3, crecimiento_organico_pct: null, ebitda: 6819, margen_ebitda_pct: 81, bpa: 4.26, vs_consenso: null },
    ],
    ultima_presentacion: 'Las cifras trimestrales son los «core business revenue» (sin la caja propia ni las donaciones), el BPA básico y el EBITDA publicado, que sí incluye el rendimiento de la caja propia [A2, A7, A8]. En la presentación de 2025 (26-feb-2026) la dirección habló de un año récord por volumen, de recuperar el primer puesto mundial en salidas a bolsa y de invertir en infraestructura (compra de la sede por 6.300 M, sistemas de derivados) mientras esperaba que la volatilidad siguiera en 2026 [A6]. En la de 1S26 (19-ago-2026) el mensaje cambió de «récord por mercado» a «más productos en la estantería»: futuros de bonos del Gobierno chino a 5 años (3-ago), índices propios (HKEX Tech 100 con su primer ETF), liquidación acelerada en consulta y reforma del lote mínimo [A2]. El punto débil que reconoce la propia empresa es el rendimiento de los fondos de márgenes, que bajó un 19 % (1.477 M) por mayores reembolsos a los miembros tras cambiar las garantías en enero [A2]. El 1T26 batió las previsiones según la prensa (SCMP, 29-abr-2026) [A8]. No hemos podido leer las transcripciones completas de las dos últimas conferencias (Seeking Alpha, de pago): las preguntas de los analistas no se recogen.',
    confianza: 'Media',
  },
  balance: {
    historico: historicoBal,
    vencimientos: [{ anio: '2026', importe: 129 }, { anio: '2027+', importe: 21 }],
    liquidez: 'Caja propia (Corporate Funds) de 39.901 M a 30-jun-2026, de la que 2.186 M está reservada a las aportaciones propias a los fondos de garantía («skin in the game»); líneas bancarias de 25.944 M (18.997 M comprometidas y 6.500 M de repos) y 7.000 M más para los periodos de mayor necesidad, a 31-dic-2025 [A1, A2].',
    rating: 'Sin rating de agencia publicado en el informe anual 2025 (no tiene bonos en circulación).',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'La única «deuda» son opciones de venta concedidas a minoritarios de una filial (150 M a 30-jun-2026, 398 M a dic-25) y 796 M de arrendamientos [A2]. El balance consolidado (577.078 M de activo) recoge los márgenes y fondos de garantía de los miembros de las cámaras (288.066 M de depósitos y 35.678 M de aportaciones), los contratos de metales de la LME en derivados (118.603 M a cada lado) y saldos de liquidación de Stock Connect: son de los miembros y se excluyen del puente y del capital invertido [A2]. Compromisos: 3.424 M pendientes de la sede a dic-25 (de los que 2.447 M se pagaron en 1S26) y 1.861 M de inversión en sistemas [A1, A2]. Litigio: Elliott demandó a HKEX y la LME el 3-sep-2026 ante el Competition Appeal Tribunal británico por la cancelación de operaciones de níquel de 2022; no hay importe y la demanda no está notificada [A12]. Sin pensiones de prestación definida relevantes.',
    comentario: 'HKEX no tiene deuda financiera: la caja propia neta de la reserva para los fondos de garantía (37.715 M a 30-jun-2026) supera de largo los 946 M de opciones de venta y arrendamientos [A2]. Crece con el beneficio no repartido (el 10 % que no paga) y en 2025-26 bajó por la sede (4.296 M de inversión en 2025 y 3.301 M en 1S26). El circulante comercial no es relevante: las comisiones se cobran en días a través de los miembros, y las cuentas a cobrar y a pagar del balance son saldos de liquidación de los miembros que se compensan [A1]. El ROIC del informe usa como capital invertido el patrimonio más la deuda menos esta caja propia.',
    confianza: 'Alta',
  },
  flujos: {
    historico: historicoFlu,
    comentario: 'El flujo operativo es el «principal operating activities» que publica HKEX (no HKFRS): el estatutario mezcla los movimientos de los fondos de los miembros y no sirve [A1]. Entre 2018 y 2025 pasó de 10.416 M a 19.855 M, en línea con el beneficio (conversión cercana al 100 %). El capex recurrente es de 1.100-1.900 M al año (6-7 % de los ingresos, sistemas de negociación y compensación, plataforma de derivados ODP); 2025 incluye 3.148 M pagados por la sede de Exchange Square, una inversión única de 6.300 M que reduce alquileres [A1]. Los dividendos son el 90 % del beneficio (sin la Fundación) y se pagan en dos veces; las «recompras» son compras de acciones para el plan de incentivos, no amortización [A1]. Estimación propia: capex de mantenimiento ≈ amortización (1.568 M en 2025), el resto, crecimiento.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers hasta la junta de 29-abr-2026; KPMG desde entonces', anios_auditor: null, opinion: 'Favorable (2025)',
    comentario: 'Las cuentas son sencillas: ingresos por comisiones reconocidos en el momento de la operación (18.691 M de 23.745 M en 2025) o a lo largo del tiempo (cuotas de cotización y datos, 5.054 M) [A1]. No hay capitalización agresiva: los sistemas desarrollados se amortizan y se capitalizaron 1.930 M en 2025. El pago en acciones es pequeño (361 M, el 2 % del beneficio). El punto contable relevante es que el beneficio incluye el rendimiento de dos carteras: la caja propia (1.870 M) y los márgenes de los miembros (neto de reembolsos, 3.241 M en 2025), ambos sensibles a los tipos de interés [A1]. El cambio de auditor (PwC a KPMG en 2026) se hizo por concurso tras la política de rotación y PwC no comunicó asuntos [A1]. Altman, Piotroski y Beneish: el motor no los calcula porque no se dan activo ni pasivo totales (el balance de las cámaras, 577.078 M, los haría inútiles).',
    senales: [
      { senal: 'Cambio de auditor en 2026', nivel: 'Baja', comentario: 'Concurso por rotación; PwC confirmó que no había asuntos que comunicar [C3].' },
      { senal: 'Beneficio ligado a los tipos de interés', nivel: 'Media', comentario: 'Rendimiento de márgenes y caja propia ≈ 22 % del EBITDA de 2025; baja con los tipos y con los reembolsos a los miembros (−19 % en 1S26).' },
      { senal: 'Litigio de Elliott por el níquel', nivel: 'Baja', comentario: 'Demanda nueva en el CAT (sep-2026) tras perder la revisión judicial en todas las instancias.' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo del 90 % del beneficio atribuido (sin la Fundación), en dos pagos: 6,00 y 6,52 HKD por 2025 (12,52 HKD) y 7,43 HKD a cuenta de 2026, pagado el 15-sep-2026 [A1, A2]. No hay recompras de amortización: compra acciones en mercado solo para el plan de incentivos (512 M en 2025). La junta renueva cada año una autorización para recomprar hasta el 10 % que no usa [C2]; acciones emitidas a 30-sep-2026: 1.267,8 M, sin autocartera [A11]. Prioridades declaradas: invertir en la infraestructura y en el ecosistema multiactivo, y el dividendo [A1].',
    adquisiciones: [
      { anio: '2012', objetivo: 'London Metal Exchange (LME)', importe: 16700, ev_ebitda: null, financiacion: 'Caja, deuda y ampliación de capital', resultado: 'Fondo de comercio de ≈ 13.300 M sin deterioro; el segmento de materias primas da 1.822 M de EBITDA en 2025, ≈ 10 % de rendimiento antes de impuestos sobre lo pagado tras 13 años; crisis del níquel de 2022 con multa de la FCA (90 M) y litigios.' },
      { anio: '2025', objetivo: '20 % de CMU OmniClear', importe: 455, ev_ebitda: null, financiacion: 'Caja propia', resultado: 'Participación en la central de custodia de bonos de la HKMA; demasiado reciente para juzgarla.' },
      { anio: '2025', objetivo: 'Sede en One Exchange Square (inmueble)', importe: 6300, ev_ebitda: null, financiacion: 'Caja propia', resultado: 'Sustituye alquileres; inversión no recurrente, pagada en 2025-26.' },
    ],
    comentario: 'La dirección asigna el capital de forma conservadora: reparte el 90 %, no se endeuda y no ha hecho compras grandes desde la LME. Esa compra es el borrón: 16.700 M HKD (1.388 M GBP) por un negocio que hoy rinde un 10 % antes de impuestos y que costó una crisis de reputación en 2022. El fracaso de la oferta por LSEG (2019, 123 M de costes) muestra apetito por operaciones grandes, pero no se materializó [A5]. El ROIC se mantiene muy alto porque el capital invertido apenas crece. El riesgo es que la caja propia (≈ 37.700 M) se use en otra compra cara en vez de devolverse.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Contado (Cash)', descripcion: 'Cotización y contratación de acciones, ETF y productos en Hong Kong y Stock Connect; compensación y liquidación de HKSCC.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2022', ingresos: 9023, resultado: 7996 }, { periodo: '2023', ingresos: 8154, resultado: 7027 }, { periodo: '2024', ingresos: 9413, resultado: 8169 }, { periodo: '2025', ingresos: 14693, resultado: 13398 }] },
      { nombre: 'Derivados de renta variable y financieros', descripcion: 'Futuros y opciones (índice Hang Seng, opciones sobre acciones), warrants y CBBC, OTC Clear; incluye el rendimiento de los márgenes.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2022', ingresos: 5114, resultado: 4243 }, { periodo: '2023', ingresos: 6265, resultado: 5403 }, { periodo: '2024', ingresos: 5881, resultado: 4990 }, { periodo: '2025', ingresos: 6577, resultado: 5597 }] },
      { nombre: 'Materias primas (LME)', descripcion: 'London Metal Exchange y LME Clear, y la bolsa de materias primas de Qianhai.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2022', ingresos: 2051, resultado: 958 }, { periodo: '2023', ingresos: 2188, resultado: 980 }, { periodo: '2024', ingresos: 2788, resultado: 1574 }, { periodo: '2025', ingresos: 3171, resultado: 1822 }] },
      { nombre: 'Datos y conectividad', descripcion: 'Datos de mercado, conectividad de Stock Connect y servicios de red.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2022', ingresos: 1998, resultado: 1551 }, { periodo: '2023', ingresos: 2073, resultado: 1635 }, { periodo: '2024', ingresos: 2126, resultado: 1692 }, { periodo: '2025', ingresos: 2270, resultado: 1834 }] },
      { nombre: 'Corporativo (sin caja propia)', descripcion: 'Donaciones de la Fundación y costes centrales; el rendimiento de la caja propia se lleva al resultado financiero.', tipo_resultado: 'EBITDA', historico: [
        { periodo: '2022', ingresos: 142, resultado: -1515 }, { periodo: '2023', ingresos: 102, resultado: -1704 }, { periodo: '2024', ingresos: 86, resultado: -1892 }, { periodo: '2025', ingresos: 283, resultado: -1725 }] },
    ],
    geografias: [{ nombre: 'Hong Kong', peso_pct: 87.2 }, { nombre: 'Reino Unido', peso_pct: 12.4 }, { nombre: 'China continental', peso_pct: 0.3 }, { nombre: 'Otros', peso_pct: 0.1 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Contratación media diaria en la bolsa (ADT, M HKD)', valor_anterior: '131.800 (2024)', valor_actual: '249.800 (2025); 272.900 en 9M26', variacion: '+90 %; +6 % en 9M26', comentario: 'Septiembre de 2026: 201.900 M, −20 % frente a agosto [A10].' },
      { kpi: 'Stock Connect hacia el norte (ADT, M RMB)', valor_anterior: '171.300 (1S25)', valor_actual: '345.300 (1S26)', variacion: '+102 %', comentario: 'Récord semestral [A2].' },
      { kpi: 'Stock Connect hacia el sur (ADT, M HKD)', valor_anterior: '111.000 (1S25)', valor_actual: '123.100 (1S26)', variacion: '+11 %', comentario: 'Inversores de China continental en Hong Kong [A2].' },
      { kpi: 'Derivados en la HKFE (miles de contratos/día)', valor_anterior: '832 (1S25)', valor_actual: '867 (1S26)', variacion: '+4 %', comentario: '[A2]' },
      { kpi: 'Metales en la LME (miles de lotes/día facturables)', valor_anterior: '715 (1S25)', valor_actual: '844 (1S26)', variacion: '+18 %', comentario: 'Récord semestral [A2].' },
      { kpi: 'Fondos captados en salidas a bolsa (M HKD)', valor_anterior: '188.300 (9M25)', valor_actual: '388.000 (9M26)', variacion: '+106 %', comentario: '118 nuevas cotizadas en 9M26 [A10].' },
    ],
  },
  fuentes: [
    { id: 1, titulo: 'HKEX Annual Report 2025', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-03-16', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0316/2026031600319.pdf' },
    { id: 2, titulo: '2026 Interim Results, Interim Dividend and Closure of Register of Members', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/News/News-Release/2026/260819news/260819news_eng.pdf' },
    { id: 3, titulo: 'HKEX Annual Report 2023', editor: 'HKEX', tipo: 'Primaria', fecha: '2024-03-18', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2024/0318/2024031800198.pdf' },
    { id: 4, titulo: 'HKEX Annual Report 2021', editor: 'HKEX', tipo: 'Primaria', fecha: '2022-03-14', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2022/0314/2022031400253.pdf' },
    { id: 5, titulo: 'HKEX Annual Report 2019', editor: 'HKEX', tipo: 'Primaria', fecha: '2020-03-16', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2020/0316/2020031600386.pdf' },
    { id: 6, titulo: '2025 Final Results, Dividend and Closure of Register of Members', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/News/News-Release/2026/260226news/260226news_eng.pdf' },
    { id: 7, titulo: 'Quarterly Results for the nine months ended 30 September 2025', editor: 'HKEX', tipo: 'Primaria', fecha: '2025-11-05', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2025/1105/2025110500313.pdf' },
    { id: 8, titulo: 'Quarterly Results for the three months ended 31 March 2026', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-04-29', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0429/2026042900419.pdf' },
    { id: 9, titulo: 'HKEX 2026 Interim Report', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-31', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0831/2026083100411.pdf' },
    { id: 10, titulo: 'HKEX Monthly Market Highlights, September 2026', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.hkex.com.hk/Market-Data/Statistics/Consolidated-Reports/HKEX-Monthly-Market-Highlights?sc_lang=en' },
    { id: 11, titulo: 'Monthly Return of Equity Issuer, September 2026', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-05', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1005/2026100501304.pdf' },
    { id: 12, titulo: 'Legal proceedings (demanda de Elliott ante el Competition Appeal Tribunal)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0908/2026090800216.pdf' },
  ],
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de 3T24-2T26', tipo: 'Complemento', intentos: '1) Comunicados trimestrales de HKEX (no dan consenso); 2) MarketScreener y Stock Analysis (sin histórico de sorpresas abierto); 3) prensa: solo el 1T26 «por encima de lo previsto» (SCMP)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'HKEX nació en el año 2000 de la fusión, impuesta por el Gobierno de Hong Kong, de la bolsa de valores (SEHK, 1891 en su origen), la de futuros (HKFE) y la cámara de compensación (HKSCC), y salió a bolsa en su propio mercado ese mismo año [B2]. El Gobierno es «controlador minoritario» desde 2007 y nombra a seis de los trece consejeros [B2]. Las decisiones que la hicieron como es: abrir la puerta a las empresas chinas (las H desde 1993), comprar la LME en 2012, los enlaces con Shanghái (2014) y Shenzhen (2016) que crearon Stock Connect, las acciones con voto múltiple y las biotecnológicas sin ingresos (2018) que trajeron a Alibaba, Meituan o Xiaomi, y la segunda cotización de las chinas de EE. UU. desde 2019 [B2, B10].',
    hitos: [
      { anio: '2000', hito: 'Fusión de SEHK, HKFE y HKSCC y salida a bolsa de HKEX.' },
      { anio: '2007', hito: 'El Gobierno de Hong Kong pasa a ser controlador minoritario (6,17 % hoy).' },
      { anio: '2012', hito: 'Compra de la London Metal Exchange por 1.388 M GBP.' },
      { anio: '2014', hito: 'Shanghai-Hong Kong Stock Connect; Shenzhen en 2016 y Bond Connect en 2017.' },
      { anio: '2018', hito: 'Reforma de cotización: voto múltiple y biotecnológicas sin ingresos (capítulos 8A y 18A).' },
      { anio: '2019', hito: 'Oferta no solicitada por LSEG (29.600 M GBP), retirada; segunda cotización de Alibaba.' },
      { anio: '2022', hito: 'Crisis del níquel en la LME: se cancelan operaciones del 8-mar; multa de la FCA en 2025.' },
      { anio: '2024', hito: 'Bonnie Chan, primera consejera delegada que viene de la casa (antes, jefa de cotización).' },
      { anio: '2025', hito: 'Primera bolsa del mundo en salidas a bolsa; contratación media récord de 249.800 M HKD; compra de la sede.' },
      { anio: '2026', hito: 'Reforma de competitividad de la cotización (24-jul), futuros de bonos del Gobierno chino (3-ago) y récord semestral de beneficio.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'HKEX opera el mercado de valores y derivados de Hong Kong en monopolio legal: la bolsa (SEHK), la de futuros (HKFE), tres cámaras de compensación (HKSCC para acciones, HKCC y SEOCH para derivados) y OTC Clear; en Londres, la London Metal Exchange y LME Clear; y la plataforma Stock Connect, la vía principal de los inversores extranjeros hacia las acciones A de Shanghái y Shenzhen y de los continentales hacia Hong Kong [B2]. Sus clientes son los miembros (intermediarios), los emisores (2.772 cotizadas y 17.144 valores a sep-2026) y los consumidores de datos [B3]. Cobra por operación (comisiones de contratación y tarifas de liquidación), por cotizar (cuotas de salida y anuales), por custodia y por datos, y gana el diferencial entre lo que rinden los márgenes de los miembros y lo que les devuelve [B2]. Plantilla: 2.497 empleados fijos [B2].',
    como_gana_dinero: 'Alrededor del 80 % de los ingresos depende del volumen: comisiones de contratación y liquidación (17.375 M de 23.745 M de ingresos en 2025) que cobra en puntos básicos sobre lo negociado en contado y por contrato en derivados [B2]. Lo recurrente son las cuotas anuales de cotización, la custodia y los datos (≈ 5.000 M). Encima va el rendimiento de los márgenes (3.241 M netos en 2025), que sube con los tipos y con el interés abierto. Los costes (6.068 M) son casi fijos: personal (66 %) y sistemas; por eso el margen EBITDA sin caja propia salta del 71 % (2023, contratación de 105.000 M/día) al 77,5 % (2025, 249.800 M/día) [B2]. No hay estacionalidad marcada; sí ciclos de 2-3 años ligados a la bolsa china y a los flujos de Stock Connect.',
    clientes: 'No hay concentración: ningún cliente supera el 10 % de los ingresos según la nota de segmentos del informe anual 2025 [B2]. Los miembros son unos 600 intermediarios; los emisores, 2.772 empresas. El poder de precios es limitado y se usa poco: HKEX no ha subido sus comisiones de contratación en años y en 2026 recortó los diferenciales mínimos (fase 2 desde el 3-ago-2026) y aumentó los reembolsos de intereses a los miembros para ganar volumen [B10]. La «renovación» la marca la ley: las empresas cotizadas en Hong Kong y los flujos de Stock Connect solo pueden pasar por sus sistemas.',
  },
  sector: {
    definicion: 'Mercado relevante: los ingresos de las bolsas cotizadas del mundo (negociación, compensación, cotización y datos de bolsas como CME, ICE, Nasdaq, Deutsche Börse, LSEG, Euronext, SGX, JPX y HKEX), ≈ 40.000 M USD según la estimación de la ficha sectorial del repo [B1]. Para el crecimiento usamos el volumen de su propio mercado, la contratación media diaria en la bolsa de Hong Kong, porque HKEX tiene el 100 % de ese mercado y su cuota mundial no se mueve por competir sino por el volumen de Hong Kong frente al de otras plazas [B2, B3].',
    tamano: '≈ 40.000 M USD de ingresos de las bolsas cotizadas en 2025 (estimación de la ficha del repo) [B1]; contratación media diaria en Hong Kong de 249.800 M HKD en 2025 y 272.900 M en 9M26 [B2, B3].',
    unidad_serie: 'miles de millones de HKD de contratación media diaria en la bolsa de Hong Kong (ADT)',
    serie: [
      { anio: '2018', tamano: 107.4 }, { anio: '2019', tamano: 87.2 }, { anio: '2020', tamano: 129.5 }, { anio: '2021', tamano: 166.7 },
      { anio: '2022', tamano: 124.9 }, { anio: '2023', tamano: 105.0 }, { anio: '2024', tamano: 131.8 }, { anio: '2025', tamano: 249.8 }, { anio: '2026e', tamano: 262 },
    ],
    tcac_historico_pct: 14.0, tcac_previsto_pct: 3.0, cr5_pct: null, estructura: 'Concentrada (monopolio legal en Hong Kong; oligopolio de bolsas en el mundo)',
    drivers: [
      { driver: 'Flujos de Stock Connect y peso de China en las carteras', efecto: '+', horizonte: 'Estructural', evidencia: 'Hacia el norte, 345.300 M RMB diarios en 1S26 (+102 %); hacia el sur, 123.100 M HKD (+11 %) [B10].' },
      { driver: 'Salidas a bolsa de tecnológicas chinas e internacionales', efecto: '+', horizonte: 'Cíclico', evidencia: '388.000 M HKD captados en 9M26 (+106 %), 118 nuevas cotizadas [B3]; reforma de cotización del 24-jul-2026 [B11].' },
      { driver: 'Volatilidad y precio de las acciones chinas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'ADT de 105.000 M en 2023 frente a 249.800 M en 2025 [B2]; septiembre de 2026, 201.900 M (−20 % sobre agosto) [B3].' },
      { driver: 'Tipos de interés en HKD/USD', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Rendimiento anualizado de los márgenes en Hong Kong del 1,40 % en 1S26 frente al 2,20 % en 1S25 [B10].' },
      { driver: 'Ampliación de productos (bonos del Gobierno chino, índices propios, RMB)', efecto: '+', horizonte: 'Estructural', evidencia: 'Futuros de bonos a 5 años desde el 3-ago-2026; primer ETF sobre el HKEX Tech 100 [B10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Monopolio legal en Hong Kong; compite por cotizaciones con Nueva York, Shanghái, Shenzhen y Singapur, y por derivados de índices chinos con SGX (FTSE China A50) [B4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Unos 600 intermediarios atomizados; los grandes bancos presionan por reembolsos de intereses y diferenciales menores (cambios de 2026) [B10].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Proveedores de sistemas y centros de datos sustituibles; HKEX desarrolla sus plataformas (ODP) [B2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Hace falta la licencia de la SFC como bolsa reconocida y el acuerdo de los reguladores chinos para Stock Connect [B2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Cotizar en acciones A o en EE. UU., derivados OTC, y a largo plazo la tokenización y las criptomonedas; la regulación china decide adónde van las empresas [B14].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La contratación de 2025-26 es la más alta de la historia (249.800 M en 2025, 272.900 M en 9M26) y septiembre ya marcó 201.900 M [B2, B3]. Los ciclos anteriores fueron duros: tras el pico de 2021 (166.700 M) la ADT cayó un 25 % en 2022 y otro 16 % en 2023, y los ingresos sin caja propia bajaron un 9 % en 2022; en 2008-09 no tenemos cifras primarias en este informe; en 2020 la contratación subió un 49 % con la covid [B2]. Indicadores: ADT mensual, salidas a bolsa y flujos de Stock Connect.' },
    regulacion: 'HKEX es a la vez empresa cotizada y regulador de primera línea de la bolsa (cotización), bajo la supervisión de la SFC y la Ordenanza de Valores y Futuros; nadie puede tener más del 5 % sin permiso de la SFC [B2]. Cambios: reforma de competitividad de la cotización en vigor desde el 24-jul-2026 [B11]; mercado sin certificados (USM) desde el 16-nov-2026 [B10]; consulta sobre liquidación acelerada (T+1), sin prisa según la prensa (14-oct-2026) [B13]; ampliación del horario y fin de la pausa de mediodía en estudio [B12]. En la LME, la FCA británica (multa de 2025) y el litigio de Elliott [B16]. Riesgo geopolítico: las relaciones EE. UU.-China deciden la segunda cotización de las chinas de EE. UU. y la presencia de inversores extranjeros.',
    tendencias: 'Las tendencias favorecen a HKEX: más productos en RMB y de renta fija (futuros de bonos del Gobierno chino, Swap Connect), más salidas a bolsa de tecnológicas e inteligencia artificial chinas, más acceso desde ASEAN y Oriente Medio (acuerdos con Bursa Malaysia y Astana en 2026) [B10]. Le juegan en contra la competición de Shanghái (STAR) y Shenzhen por las empresas chinas, la caída de comisiones por operación y el riesgo de que los inversores occidentales reduzcan su peso en China. La IA cambia poco su negocio, que es la infraestructura por la que pasan las operaciones; sí acelera la contratación algorítmica y la demanda de datos [B15].',
  },
  competencia: {
    cuota_pct: 8.6,
    posicion: '100 % de la contratación y la compensación en Hong Kong y operador único de Stock Connect; ≈ 8,6 % de los ingresos de las bolsas cotizadas del mundo (estimación propia: 26.994 M HKD ≈ 3.440 M USD sobre ≈ 40.000 M USD) [B1, B2]. En metales, la LME es la referencia mundial de los metales básicos.',
    competidores: [
      { nombre: 'CME Group', pais: 'EE. UU.', ticker: 'CME', ingresos: 51170, cuota_pct: 16.3, margen_ebit_pct: 64.9, comentario: 'Derivados de tipos, índices, energía y metales (COMEX compite con la LME en cobre). Ingresos de 2025, 6.521 M USD [B5].' },
      { nombre: 'Intercontinental Exchange', pais: 'EE. UU.', ticker: 'ICE', ingresos: 77929, cuota_pct: null, margen_ebit_pct: 49.6, comentario: 'NYSE, futuros de energía y tecnología hipotecaria; compite por cotizaciones chinas en Nueva York. 9.931 M USD en 2025 [B6].' },
      { nombre: 'Deutsche Börse', pais: 'Alemania', ticker: 'DB1', ingresos: 52938, cuota_pct: null, margen_ebit_pct: 50.0, comentario: 'Eurex, Clearstream y software; 6.026 M EUR en 2025 [B7].' },
      { nombre: 'London Stock Exchange Group', pais: 'Reino Unido', ticker: 'LSEG', ingresos: 93302, cuota_pct: null, margen_ebit_pct: 23.7, comentario: 'Datos (Refinitiv), LCH y FTSE Russell; 8.986 M GBP en 2025 [B8].' },
      { nombre: 'Euronext', pais: 'Países Bajos', ticker: 'ENX', ingresos: 15978, cuota_pct: null, margen_ebit_pct: 50.8, comentario: 'Siete bolsas europeas y Borsa Italiana; 1.818,8 M EUR en 2025 [B9].' },
      { nombre: 'Singapore Exchange (SGX)', pais: 'Singapur', ticker: 'S68', ingresos: 9032, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en derivados sobre China (FTSE China A50) y en cotizaciones de ASEAN; ingresos netos FY2026 de 1.478,3 M SGD y EBITDA ajustado de 980,6 M (66,3 %) [B4].' },
      { nombre: 'Bolsas de Shanghái y Shenzhen', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Públicas, no cotizadas: compiten por las salidas a bolsa chinas (STAR y ChiNext) y son socias en Stock Connect.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 5, evidencia: 'La liquidez atrae emisores y la liquidez atrae inversores: 2.772 cotizadas, 272.900 M HKD diarios en 9M26 y Stock Connect con exclusividad [B3, B10].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Las cotizadas no cambian de bolsa con facilidad; los intermediarios están conectados a sus sistemas; pero una empresa china puede elegir Shanghái o Nueva York para su salida.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Licencia legal de bolsa reconocida y de cámara en Hong Kong y acuerdos de Stock Connect con la CSRC; la LME es el precio de referencia de los metales [B2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA del 77,5 % sin caja propia en 2025 frente al 49,6-64,9 % de margen EBIT de ICE y CME [B2, B5, B6].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Un mercado del tamaño de Hong Kong solo admite un operador; los costes (6.068 M) son casi fijos [B2].' },
      ],
    },
    amenazas: 'La amenaza principal no es otra bolsa sino la política: que Pekín dirija las salidas a bolsa hacia Shanghái y Shenzhen, que se restrinja Stock Connect o que EE. UU. limite la inversión en empresas chinas (probabilidad media en 5 años). Segunda: la presión de los intermediarios sobre comisiones y reembolsos, que ya bajó el rendimiento de los márgenes un 19 % en 1S26 [B10]. Tercera: SGX en derivados sobre índices chinos y la tokenización a largo plazo (baja). El litigio de Elliott contra la LME es de reputación más que de foso [B16].',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que mueven las cifras de HKEX son de gobierno y de mercado, no ambientales: (1) la gestión de riesgos de las cámaras y de la LME (la crisis del níquel de 2022 costó una multa de 90 M de la FCA en 2025, litigios y reputación) [B2, B16]; (2) su papel de regulador de la cotización, que exige independencia frente a su propio interés comercial (las salidas a bolsa son ingresos); (3) los requisitos climáticos de divulgación para las cotizadas (alineados con IFRS S2 desde el 1-ene-2025) y el mercado de carbono Core Climate, que son negocio pequeño [B2]. Emisiones propias irrelevantes para el valor.',
    controversias: 'Crisis del níquel de la LME (marzo de 2022): cancelación de operaciones, revisión judicial ganada por la LME en el Tribunal Superior (2023), el de Apelación (2024) y el Supremo británico, que negó el recurso; multa de la FCA de 90 M HKD (2025) y nueva demanda de Elliott por abuso de posición dominante ante el Competition Appeal Tribunal (3-sep-2026) [B16, B2].',
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros (Burton-Taylor, FIA, MarketScreener)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14.md' },
    { id: 2, titulo: 'HKEX Annual Report 2025', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-03-16', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0316/2026031600319.pdf' },
    { id: 3, titulo: 'HKEX Monthly Market Highlights, September 2026', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.hkex.com.hk/Market-Data/Statistics/Consolidated-Reports/HKEX-Monthly-Market-Highlights?sc_lang=en' },
    { id: 4, titulo: 'SGX Group reports FY2026 net profit of S$759 million', editor: 'Mondo Visione (comunicado de SGX)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://mondovisione.com/news/sgx-group-reports-fy2026-net-profit-of-s759-million-202686/' },
    { id: 5, titulo: 'Informe value de CME Group (cuentas 2025)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/cme-group-2026-10-14' },
    { id: 6, titulo: 'Informe value de Intercontinental Exchange (cuentas 2025)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-08', url: 'informes/ice-2026-10-08' },
    { id: 7, titulo: 'Informe value de Deutsche Börse (cuentas 2025)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/deutsche-borse-2026-10-14' },
    { id: 8, titulo: 'Informe value de LSEG (cuentas 2025)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/lseg-2026-10-14' },
    { id: 9, titulo: 'Informe value de Euronext (cuentas 2025)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/euronext-2026-10-14' },
    { id: 10, titulo: '2026 Interim Results announcement (Strategic and operational highlights, Financial review)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/News/News-Release/2026/260819news/260819news_eng.pdf' },
    { id: 11, titulo: 'Hong Kong stock exchange relaxes listing rules to compete with US rivals', editor: 'Financial Times', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://news.google.com/rss/search?q=HKEX+listing+rules+FT' },
    { id: 12, titulo: 'HKEX reviews trading hours to boost market access', editor: 'Reuters', tipo: 'Prensa', fecha: '2026-07-20', url: 'https://news.google.com/rss/search?q=HKEX+trading+hours+Reuters' },
    { id: 13, titulo: 'Hong Kong exchange won’t rush into T+1 settlement times, sources say', editor: 'South China Morning Post', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://news.google.com/rss/search?q=HKEX+T%2B1+SCMP' },
    { id: 14, titulo: 'Breakingviews: HKEX diversification drive has a focus problem', editor: 'Reuters', tipo: 'Prensa', fecha: '2026-08-20', url: 'https://news.google.com/rss/search?q=HKEX+diversification+Breakingviews' },
    { id: 15, titulo: 'Hong Kong Exchanges and Clearing Should See Long-Term Growth as the Conduit to China Markets', editor: 'Morningstar', tipo: 'Analistas', fecha: '2026-09-29', url: 'https://news.google.com/rss/search?q=Hong+Kong+Exchanges+Morningstar+conduit' },
    { id: 16, titulo: 'Legal proceedings (demanda de Elliott ante el Competition Appeal Tribunal)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0908/2026090800216.pdf' },
  ],
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Ficha sectorial del repo (sin cuota de ingresos por bolsa); 2) WFE (estadísticas de ingresos de pago); 3) estimación con los informes del repo (solo 7 bolsas con cifras)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual y de sostenibilidad 2025 de HKEX (no las listan); 2) MSCI ESG y Sustainalytics (requieren registro); 3) prensa (sin resultados)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Bonnie Y Chan', cargo: 'Consejera delegada (Chief Executive) y consejera ejecutiva', desde: '2024', participacion_pct: 0.01, trayectoria: 'Abogada (socia de Davis Polk 2010-2019), jefa de cotización de HKEX (2020-2023) y codirectora de operaciones (2023-24). Con ella al frente: récord de salidas a bolsa en 2025, beneficio de 17.754 M (+36 %) y la reforma de cotización de 2026. Contrato renovado hasta feb-2030 [C4, C1].' },
      { nombre: 'Carlson Tong', cargo: 'Presidente (consejero nombrado por el Gobierno)', desde: '2023', participacion_pct: 0.0, trayectoria: 'Expresidente de la SFC y de KPMG China; preside el consejo y las comisiones de nombramientos y de remuneración [C1].' },
      { nombre: 'Herbert Hui', cargo: 'Director financiero del grupo', desde: '2025', participacion_pct: null, trayectoria: 'Exdirector financiero de MTR (2016-2023) y de K Wah; llegó en junio de 2025 [C1].' },
      { nombre: 'Vanessa Lau', cargo: 'Directora de operaciones (COO)', desde: '2025', participacion_pct: null, trayectoria: 'Directora financiera de HKEX entre 2020 y 2025; consejera delegada de SEHK, HKFE y HKSCC [C1].' },
      { nombre: 'Richard Leung', cargo: 'Director de sistemas del grupo', desde: '2023', participacion_pct: null, trayectoria: 'En HKEX desde 2011 (exdirector de tecnología de Chi-X Global); responsable de la nueva plataforma de derivados ODP [C1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo estable y de la casa: la consejera delegada lleva seis años en HKEX y el Consejo le renovó el contrato en agosto de 2026 por tres años más, con aprobación de la SFC [C4]. La rotación de 2025 (nuevo director financiero externo y la anterior directora financiera a operaciones) fue ordenada. HKEX no publica previsiones de resultados ni objetivos financieros a medio plazo: no hay historial de guía que contrastar; su credibilidad se mide por la ejecución de las reformas anunciadas (reforma de cotización, USM, Stock Connect), que se han cumplido en plazo [C1]. El plan de sucesión lo revisa el Consejo cada año [C1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Carlson Tong', cargo: 'Presidente', tipo: 'Dominical', desde: '2023', comisiones: 'Nombramientos y gobierno (pres.), Remuneración (pres.), Ejecutiva (pres.), Riesgos legal (pres.)' },
      { nombre: 'Bonnie Y Chan', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Ejecutiva, Responsabilidad corporativa' },
      { nombre: 'Nicholas Charles Allen', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría (pres.), Nombramientos, Remuneración, Riesgos' },
      { nombre: 'Peter Wilhelm Hubert Brien', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Auditoría, Ejecutiva' },
      { nombre: 'Clement Chan Kam Wing', cargo: 'Consejero (nombrado por el Gobierno)', tipo: 'Dominical', desde: '2026', comisiones: 'Auditoría, Inversiones' },
      { nombre: 'Chan Kin Por', cargo: 'Consejero (nombrado por el Gobierno)', tipo: 'Dominical', desde: null, comisiones: 'Inversiones, Responsabilidad corporativa' },
      { nombre: 'Anna Cheung', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: 'Auditoría, Nombramientos, Remuneración' },
      { nombre: 'Herbert Chia', cargo: 'Consejero (nombrado por el Gobierno)', tipo: 'Dominical', desde: null, comisiones: 'Auditoría, Inversiones' },
      { nombre: 'Ding Chen', cargo: 'Consejera (nombrada por el Gobierno)', tipo: 'Dominical', desde: null, comisiones: 'Responsabilidad corporativa' },
      { nombre: 'Miranda Kwok', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Gordon Robert Halyburton Orr', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Joseph Yam', cargo: 'Consejero (nombrado por el Gobierno)', tipo: 'Dominical', desde: null, comisiones: 'Remuneración' },
      { nombre: 'Zhang Yichen', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos, Responsabilidad corporativa' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 78.81,
    remuneracion_ceo: { anio: '2025', total: 50.65, fijo: 11.67, variable_corto: 11.69, variable_largo: 27.29, ratio_salario_medio: 32 },
    remuneracion: 'Remuneración de la consejera delegada en 2025: 50,6 M HKD (salario 10,3 M, incentivo en efectivo 11,7 M, beneficios y pensión 1,4 M y acciones concedidas por 27,3 M que se consolidan en tres años) [C1]. El incentivo depende de una evaluación de resultados corporativos con indicadores fijados por la comisión de remuneración (financieros, estratégicos, de riesgo y de cumplimiento) y de la valoración individual en una escala de cinco puntos; no hay una métrica explícita de ROIC, TSR o flujo [C1]. En Hong Kong la remuneración no se vota en junta; los honorarios de los consejeros no ejecutivos sí (99,96 % a favor en 2026) [C2]. Ratio frente al coste medio por empleado (4.000 M / 2.497): ≈ 32 veces (estimación propia).',
    accionistas: [
      { nombre: 'JPMorgan Chase & Co. (incluye gestión, préstamo y custodia)', pct: 6.92, tipo: 'Financiero', variacion: 'Posición declarada a dic-25; como beneficiario directo, 0,77 %' },
      { nombre: 'Gobierno de Hong Kong (Exchange Fund)', pct: 6.17, tipo: 'Público', variacion: 'Estable; controlador minoritario desde 2007' },
      { nombre: 'Computershare (fideicomiso del plan de acciones)', pct: 0.30, tipo: 'Autocartera del plan', variacion: '3,8 M de acciones; compra ≈ 500 M HKD al año' },
      { nombre: 'Resto (capital libre)', pct: 92.7, tipo: 'Flotante', variacion: '13 controladores minoritarios aprobados por la SFC suman ≈ 76 % como intermediarios' },
    ],
    insiders: [],
    control_y_defensas: 'Nadie puede controlar más del 5 % sin permiso de la SFC («controlador minoritario»): es un límite legal de la Ordenanza de Valores y Futuros, no estatutario [C1]. El Gobierno de Hong Kong tiene el 6,17 % y nombra a seis de los trece consejeros (entre ellos el presidente, Carlson Tong); los consejeros nombrados por el Gobierno no se someten a elección, y el nombramiento del presidente y del consejero delegado necesita la aprobación del Gobierno o de la SFC [C1, C4]. Por eso tratamos al Gobierno como accionista de control de hecho: decide la cúpula y su interés (Hong Kong como plaza financiera) puede no coincidir con el del accionista (por ejemplo, en comisiones o en su papel de regulador). No hay clases de acciones ni blindajes.',
    alertas: [
      'El Gobierno nombra a seis de trece consejeros y aprueba al presidente y al consejero delegado: el minoritario no decide la cúpula [C1].',
      'Gordon Orr fue elegido con un 21,19 % de votos en contra en la junta de 29-abr-2026 [C2].',
      'Cambio de auditor en 2026 (PwC a KPMG) por concurso, sin asuntos comunicados [C3].',
      'Nueva demanda de Elliott por el níquel ante el Competition Appeal Tribunal (sep-2026) [C6].',
    ],
    confianza: 'Media',
  },
  fuentes: [
    { id: 1, titulo: 'HKEX Annual Report 2025 (Corporate Governance Report, Remuneration Committee Report, Board and Senior Management)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-03-16', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0316/2026031600319.pdf' },
    { id: 2, titulo: 'Poll Results of the 2026 Annual General Meeting and Changes in Directorate', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-04-29', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0429/2026042903695.pdf' },
    { id: 3, titulo: 'Notice of AGM 2026: Proposals for Election of Directors, Change of Auditor, General Mandates', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-03-17', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0317/2026031701088.pdf' },
    { id: 4, titulo: 'Renewal of Contract of Chief Executive', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-17', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0817/2026081701443.pdf' },
    { id: 5, titulo: 'Proposed Adoption of New Articles of Association of HKEX', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-08', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/1008/2026100800613.pdf' },
    { id: 6, titulo: 'Legal proceedings (demanda de Elliott ante el Competition Appeal Tribunal)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0908/2026090800216.pdf' },
  ],
  huecos: [
    { seccion: 'gobierno', campo: 'insiders (operaciones de consejeros en 12 meses)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (participaciones a dic-25, no operaciones); 2) registro de intereses de la SFC/HKEX (DI, búsqueda por emisor sin acceso automático); 3) prensa (sin noticias de compras o ventas)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Informes anuales 2021-2025 (HKEX no da previsiones); 2) presentaciones de resultados (solo prioridades estratégicas); 3) prensa (sin objetivos cuantitativos)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'desde (año de nombramiento) de varios consejeros', tipo: 'Complemento', intentos: '1) Informe anual 2025 (biografías sin fecha en la parte leída); 2) web de gobierno de HKEX; 3) anuncios de cambios de consejo (solo 2026)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const usd = 7.847; // HKD por USD, Yahoo 15-oct-2026
const comp = [
  ['CME Group', 'CME', 'US', 99974, 0, 19.0, 22.3, 5.9, 71.0, 12.2, -0.3, null],
  ['Intercontinental Exchange', 'ICE', 'US', 87813, 0, 13.8, 21.6, 8.1, 66.0, 8.6, 2.8, null],
  ['Nasdaq', 'NDAQ', 'US', 52253, 0, 16.1, 24.3, 10.1, 58.4, 10.4, 2.7, null],
  ['Deutsche Börse', 'DB1', 'DE', 60769, 0, 14.1, 22.7, 7.0, 58.3, 14.0, 1.1, null],
  ['London Stock Exchange Group', 'LSEG', 'GB', 53114, 0, 9.4, 24.0, 6.5, 48.4, 6.5, 2.0, null],
  ['Tradeweb', 'TW', 'US', 25739, 0, 16.8, 28.8, 13.3, 54.0, 10.1, -1.9, null],
  ['MSCI', 'MSCI', 'US', 40771, 0, 20.2, 26.4, 10.2, 60.8, 39.9, 3.0, null],
  ['S&P Global', 'SPGI', 'US', 120906, 0, 17.2, 23.5, 7.6, 51.1, 11.1, 1.3, null],
];
const sec = JSON.parse(readFileSync(join(dir, '../../../sectores/bolsas-datos-financieros-2026-10-14-comparables.json'), 'utf8'));
const empresas = comp.map(([nombre, ticker, pais]) => {
  const s = sec.empresas.find((e) => e.ticker === ticker);
  return { nombre, ticker, pais, capitalizacion: Math.round(s.capitalizacion * usd), ev_ventas: s.ev_ventas, ev_ebitda_ltm: s.ev_ebitda_ltm, ev_ebitda_ntm: s.ev_ebitda_ntm, per_ntm: s.per_ntm, crecimiento_pct: s.crecimiento_pct, margen_ebitda_pct: s.margen_ebitda_pct, roic_pct: s.roic_pct, dn_ebitda: s.dn_ebitda, fcf_yield_pct: s.fcf_yield_pct };
});
const mov = { fecha: '2026-10-16', var_1m_pct: -5.6, var_3m_pct: -6.0, var_6m_pct: -9.1, var_12m_pct: -16.0, dist_max_52s_pct: -18.2, dist_min_52s_pct: 3.1, dist_max_historico_pct: -23.9, tendencia: 'bajista', volatilidad_60d_pct: 19, avisos: [] };
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Hong Kong Exchanges and Clearing Limited', nombre_corto: 'HKEX', ticker: '0388.HK', isin: 'HK0388045442', mercado: 'Bolsa de Hong Kong (SEHK)', indice_referencia: 'Hang Seng',
    pais: 'Hong Kong (China)', pais_iso: 'HK', sector: 'Financials', industria: 'Financial Exchanges & Data', sede: 'Hong Kong', fundacion: '2000', empleados: 2497, web: 'www.hkexgroup.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 1267.5, capitalizacion_publicada: null, free_float_pct: 92.7,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones)} M HKD/día (3 meses)`, proximos_resultados: '2026-11-06',
  },
  consenso: {
    guidance: 'HKEX no publica previsiones de beneficio ni objetivos financieros. Su «guía» son prioridades estratégicas: ampliar el ecosistema multiactivo (renta fija y divisas, materias primas en Asia, índices propios), reformar la microestructura (liquidación acelerada, lotes, horario) y conectar con nuevos mercados (ASEAN, Oriente Medio, Asia Central), con la compra de la sede y la plataforma de derivados ODP como inversiones principales [D18]. En la presentación de 1S26 (19-ago-2026) la dirección advirtió de la incertidumbre macro y geopolítica persistente [D18].',
    estimaciones: [
      { periodo: '2026e', ingresos: 32145, ebitda: 25507, ebit: 23968, bpa: 15.87, dpa: 14.17, fuente: 'MarketScreener (17 analistas); Stock Analysis da BPA 15,84 [D2, D4]' },
      { periodo: '2027e', ingresos: 32777, ebitda: 25674, ebit: 23946, bpa: 16.06, dpa: 14.38, fuente: 'MarketScreener; Stock Analysis da BPA 16,12 [D2, D4]' },
      { periodo: '2028e', ingresos: 34651, ebitda: 27177, ebit: 25362, bpa: 16.95, dpa: 15.32, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 15, mantener: 2, vender: 0, po_medio: 504.19, po_min: 410, po_max: 542 },
    revisiones: 'Las estimaciones son de MarketScreener (ingresos y EBITDA con el rendimiento de la caja propia, como los publica HKEX) y se contrastan con Stock Analysis (S&P Global): BPA 2026e 15,84 y 2027e 16,12, recomendación 11 «compra fuerte», 4 «compra» y 2 «mantener», objetivo medio 504,19 HKD, mediana 516,50 [D2, D3, D4]. En los últimos días los objetivos bajan: Goldman Sachs a 523 HKD el 12-oct-2026, avisando de que el beneficio del 3T26 puede caer por primera vez en dos años, y UBS de 450 a 420 HKD el 15-oct-2026 [D12, D13]. No tenemos la serie de revisiones del BPA a 3 y 12 meses (gráficos sin cifras).',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 5.3,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    beta: 0.79,
    posicion_corta_pct: null,
    comentario: 'La acción subió un 42 % en 2025 con la contratación récord y cae un 5,8 % en lo que va de 2026 (rentabilidad total) frente al −2,5 % del Tracker Fund y el +8,1 % del ETF financiero mundial (IXG) [D1]. A 3 años gana un 12,4 % anual; a 5 años pierde un 1,8 % anual porque el punto de partida (2021) era el pico de la burbuja de las tecnológicas chinas, con una caída máxima del 56,4 % entre oct-2021 y oct-2022 [D1]. La beta mensual a 5 años es 1,44 frente al Tracker Fund y 0,79 frente al índice mundial ACWI: es una acción muy ligada al ciclo de la bolsa de Hong Kong pero poco al mercado mundial. Volatilidad de un año del 20,2 % [D1].',
    contexto: {
      movimiento: mov,
      movimientos_fuertes: [
        { periodo: 'may-jun 2026', var_pct: -11.8, causa: 'Caída de un mes hasta el 11-jun-2026 con la bolsa de Hong Kong, ante el vencimiento en julio de bloqueos de acciones de salidas a bolsa por 255.000 M HKD y la toma de beneficios tras el récord de 1T26 [D14]; el mínimo de 52 semanas (360 HKD) llegó el 29-jun [D1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul 2026', var_pct: 12.2, causa: 'Subida de un mes hasta el 30-jul-2026: Goldman Sachs reitera «compra» citando el apoyo de Pekín (16-jul) [D15], la reforma de cotización más grande en ocho años (24-jul) [D16] y la contratación récord de julio (307.200 M HKD diarios) [D19].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-11-06', tipo: 'resultados', hecho: 'Resultados de 9M26 el viernes 6-nov-2026 (aviso de consejo del 18-sep) [D10]; el 3T26 tuvo una contratación media ≈ 11 % inferior a la del 3T25 y Goldman avisa de un posible primer descenso del beneficio en dos años [D12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'UBS rebaja su objetivo de 450 a 420 HKD [D13]; Goldman Sachs lo baja a 523 HKD el 12-oct [D12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-08', tipo: 'demanda o regulador', hecho: 'Elliott demanda a HKEX y la LME ante el Competition Appeal Tribunal británico por la cancelación de operaciones de níquel de 2022; sin importe, no notificada; HKEX la considera sin fundamento [D17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-01', tipo: 'resultados', hecho: 'Cotiza sin el dividendo a cuenta de 7,43 HKD (pagado el 15-sep); la caída de 4,6 % de ese día es en su mayor parte el dividendo y el mercado [D11, D1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-17', tipo: 'directivos', hecho: 'Renovado el contrato de la consejera delegada, Bonnie Chan, hasta feb-2030 [D19].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'resultados', hecho: 'Junta extraordinaria el 6-nov-2026 para adaptar los estatutos al mercado sin certificados (USM); trámite sin efecto económico [D18].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-06',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 18,2 % bajo su máximo de 52 semanas (444,80 HKD el 29-ene-2026) y un 3,1 % sobre el mínimo, con tendencia bajista (7,5 % bajo la media de 200 sesiones) [D1]. La causa es conocida y está en la tesis: la contratación de Hong Kong bajó de 307.200 M diarios en julio a 201.900 M en septiembre y el 3T26 será peor que el 3T25; los analistas recortan objetivos [D12, D13]. No hay colocaciones, ampliaciones ni ofertas pendientes. El litigio de Elliott no tiene fecha ni importe. Los resultados del 6-nov no retrasan nada (regla 11). Veredicto: no cambia. Fuentes buscadas: avisos de HKEXnews de 12 meses, Google Noticias y la prensa financiera de Hong Kong.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((c) => +c.anio >= 2018).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' || c.anio === '2021' })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Ocho infraestructuras de mercado con negocio de bolsa, cámara, plataforma o índices: CME, ICE, Nasdaq, Deutsche Börse, LSEG, Tradeweb, MSCI y S&P Global, con cifras de la ficha sectorial del repo (MarketScreener y Stock Analysis al 13/14-oct-2026), capitalización pasada a HKD a 7,847 [D5, D9]. Fuera Moody\'s, Verisk, FactSet y Thomson Reuters (datos y calificaciones, menos parecidas). Faltan SGX y JPX, las más cercanas por región, porque no tenemos sus estimaciones del mismo proveedor: es una limitación (SGX cotiza a un múltiplo menor que las estadounidenses).',
    empresas,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'MarketAxess Holdings', comprador: 'Intercontinental Exchange', ev: 43786, ev_ventas: 6.41, ev_ebitda: 13.0, prima_pct: 33, excluir: false, comentario: 'Pendiente, en efectivo; 5.580 M USD a 7,847 HKD; ventas y EBITDA de 12 meses a jun-2026 [D6].' },
      { fecha: '2023-06', objetivo: 'Adenza', comprador: 'Nasdaq', ev: 82394, ev_ventas: 17.8, ev_ebitda: 30.7, prima_pct: null, excluir: false, comentario: 'Software de riesgo; múltiplos sobre las previsiones de 2023 publicadas por Nasdaq (estimación del informe de ICE) [D6].' },
      { fecha: '2020-11', objetivo: 'IHS Markit', comprador: 'S&P Global', ev: 345268, ev_ventas: 10.26, ev_ebitda: 24.0, prima_pct: null, excluir: false, comentario: 'Fusión en acciones; 44.000 M USD de valor empresa publicado [D6].' },
      { fecha: '2019-08', objetivo: 'Refinitiv', comprador: 'London Stock Exchange Group', ev: 211869, ev_ventas: 4.35, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: 'En acciones; valor empresa con 12.500 M USD de deuda; EBITDA ajustado de 2018 [D6].' },
      { fecha: '2022-05', objetivo: 'Black Knight', comprador: 'Intercontinental Exchange', ev: 92595, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Cerrada en sep-2023; sin EBITDA oficial del perímetro comprado [D6].' },
    ],
    comentario: 'Las transacciones del sector se pagan a 13-31 veces el EBITDA, pero son de datos, software o plataformas, no de bolsas con monopolio legal, y HKEX no puede ser comprada: el límite del 5 % sin permiso de la SFC y el papel del Gobierno lo impiden [D6]. Sirven solo de contraste; no pesan en el valor objetivo.',
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 150, arrendamientos: 796, caja: 37715, minoritarios: 295, pensiones: 0, asociadas: 883, otros_ajustes: 10369 },
    rab: null,
    referencia_mercado: { mercado: 'S&P 500 (Damodaran, prima implícita con payout sostenible)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' },
  },
  fuentes: [
    { id: 1, titulo: 'Históricos diarios de 0388.HK, 2800.HK, IXG y ACWI (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/0388.HK/history' },
    { id: 2, titulo: 'Hong Kong Exchanges and Clearing: finances (estimaciones 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/HONG-KONG-EXCHANGES-AND-C-1412659/finances/' },
    { id: 3, titulo: 'Hong Kong Exchanges and Clearing: consensus', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/HONG-KONG-EXCHANGES-AND-C-1412659/consensus/' },
    { id: 4, titulo: 'HKEX (0388) forecast', editor: 'Stock Analysis (S&P Global)', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/quote/hkg/0388/forecast/' },
    { id: 5, titulo: 'Comparables de la ficha sectorial de bolsas y datos financieros', editor: 'Repo analisis-inversion', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'sectores/bolsas-datos-financieros-2026-10-14-comparables.json' },
    { id: 6, titulo: 'Transacciones precedentes de los informes de ICE (8-oct) y LSEG (14-oct)', editor: 'Repo analisis-inversion', tipo: 'Sectorial', fecha: '2026-10-14', url: 'informes/lseg-2026-10-14' },
    { id: 7, titulo: '10-Year Treasury Constant Maturity Rate (DGS10)', editor: 'FRED, Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://fred.stlouisfed.org/series/DGS10' },
    { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
    { id: 9, titulo: 'Tipos de cambio USDHKD, EURHKD, GBPHKD, SGDHKD', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HKD=X' },
    { id: 10, titulo: 'Date of Board Meeting (resultados de 9M26 el 6-nov-2026)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-09-18', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0918/2026091800175.pdf' },
    { id: 11, titulo: 'Interim Dividend for the year ending 31 December 2026 and Closure of Register of Members', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0819/2026081900215.pdf' },
    { id: 12, titulo: 'Goldman Sachs Cuts HKEX Target Price to HK$523, Warns Q3 Profit May Post First Decline in Two Years', editor: 'BigGo Finance', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://news.google.com/rss/search?q=Goldman+Sachs+HKEX+523' },
    { id: 13, titulo: 'UBS cuts target for HKEX stock from HKD 450 to HKD 420', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://news.google.com/rss/search?q=UBS+HKEX+420' },
    { id: 14, titulo: 'Hong Kong market faces pressure as HK$255 billion in locked shares expire in July', editor: 'The Business Times', tipo: 'Prensa', fecha: '2026-06-16', url: 'https://news.google.com/rss/search?q=HK%24255+billion+locked+shares' },
    { id: 15, titulo: 'Goldman Sachs backs HKEX with ‘buy’ rating, citing Beijing’s policy support', editor: 'South China Morning Post', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://news.google.com/rss/search?q=Goldman+HKEX+buy+Beijing+policy' },
    { id: 16, titulo: 'Hong Kong exchange’s biggest reform in 8 years opens IPO gates', editor: 'South China Morning Post', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://news.google.com/rss/search?q=HKEX+biggest+reform+8+years' },
    { id: 17, titulo: 'Legal proceedings (demanda de Elliott)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www1.hkexnews.hk/listedco/listconews/sehk/2026/0908/2026090800216.pdf' },
    { id: 18, titulo: '2026 Interim Results announcement y Proposed Adoption of New Articles (8-oct-2026)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-08-19', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/News/News-Release/2026/260819news/260819news_eng.pdf' },
    { id: 19, titulo: 'HKEX Monthly Market Highlights (jul-sep 2026) y Renewal of Contract of Chief Executive', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.hkex.com.hk/Market-Data/Statistics/Consolidated-Reports/HKEX-Monthly-Market-Highlights?sc_lang=en' },
  ],
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SFC, posiciones cortas agregadas semanales (descarga no automatizable); 2) HKEX, ventas en corto diarias (flujo, no posición); 3) proveedores (de pago)', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm y per_ntm por año', tipo: 'Complemento', intentos: '1) MarketScreener (solo 2026-27); 2) Stock Analysis (sin histórico gratuito); 3) cálculo con el consenso histórico (no disponible)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completo',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'sección completa', tipo: 'Complemento', intentos: '1) API de Stocktwits para HKXCY (sin mensajes); 2) RSS de Seeking Alpha de HKXCY (último artículo de opinión, jul-2025; solo transcripciones después); 3) Google Noticias y foros de Hong Kong (LIHKG y Futu no abren sin registro; solo titulares de prensa, no debate de inversores)', decision: 'Omitido' },
  ],
};

w('A.json', A); w('B.json', B); w('C.json', C); w('D.json', D); w('E.json', E);
console.log('Notas A-E escritas');
