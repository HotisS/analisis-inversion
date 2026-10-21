// Escribe las notas A-D de Lagercrantz Group (corte 2026-10-21) a partir de los documentos de notas/docs (informes anuales
// 2021/22, 2022/23, 2024/25 y 2025/26; trimestrales 2025/26 y 1T 2026/27; juntas; compras), del XBRL ESEF (cuentas-xbrl.json,
// FY2023-FY2024), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary, 21-oct-2026 ~14:16 UTC) y de comparables-calc.json.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/lagercrantz-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const B = lee('bolsa.json');
const COMP = lee('comparables-calc.json');
const MFN = 'https://storage.mfn.se';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025/26 (ejercicio cerrado el 31-mar-2026): cuentas consolidadas, notas 3, 5, 11, 15, 31, 35, 37 y resumen plurianual', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-03', url: `${MFN}/b7e5d4dd-6584-4853-9685-eb6194fcc19a/lagercrantz-annual-report-2025-26.pdf` },
  { id: 2, titulo: 'Annual Report 2024/25 (ejercicio cerrado el 31-mar-2025): cuentas consolidadas y comparativo 2023/24', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-07-04', url: `${MFN}/86592a3c-1aff-4a8e-b041-dbcba91ba27a/lagercrantz-annual-report-2024_25.pdf` },
  { id: 3, titulo: 'Annual Report 2022/23 (ejercicio cerrado el 31-mar-2023): cuentas consolidadas y nota de compras', editor: 'Lagercrantz Group AB (publ), vía Cision', tipo: 'Primaria', fecha: '2023-07-07', url: 'https://mb.cision.com/Main/995/3803562/2183916.pdf' },
  { id: 4, titulo: 'Annual Report 2021/22 (ejercicio cerrado el 31-mar-2022): cuentas consolidadas, comparativo 2020/21 y resumen plurianual 2017/18-2021/22 (reexpresado por el split 3:1)', editor: 'Lagercrantz Group AB (publ), vía Cision', tipo: 'Primaria', fecha: '2022-07-11', url: 'https://mb.cision.com/Main/995/3599675/1603226.pdf' },
  { id: 5, titulo: 'Interim Report Q1 2026/27 (1 de abril - 30 de junio de 2026)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: `${MFN}/8f854b36-a942-47b7-a342-2c0de88b6c60/interim-report-q1-2026-27.pdf` },
  { id: 6, titulo: 'Year-end Report 2025/26 (Q4, enero-marzo 2026)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-05-19', url: `${MFN}/adb2fcff-3d7c-43ba-9971-fb68b8f7a400/year-end-report-2025-26.pdf` },
  { id: 7, titulo: 'Interim Report Q3 2025/26 (1 de abril - 31 de diciembre de 2025)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-02-06', url: `${MFN}/a/lagercrantz-group/bc0652c5-fc7c-4391-8dd5-582513ce43f4/interim-report-1-april-31-december-2025.pdf` },
  { id: 8, titulo: 'Interim Report Q2 2025/26 (1 de abril - 30 de septiembre de 2025)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-10-24', url: `${MFN}/1096f5c1-cf87-4a3f-b445-ba0c004af708/interim-report-lagercrantz-q2-2025-26-q2.pdf` },
  { id: 9, titulo: 'Interim Report Q1 2025/26 (1 de abril - 30 de junio de 2025)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-07-15', url: `${MFN}/a9580c99-e57d-4051-9d9d-432799e4ca5b/interim-report-q1-2025-26.pdf` },
  { id: 10, titulo: 'Informe anual ESEF 2023/24 en XBRL (cuenta, balance y flujos de 2022/23 y 2023/24)', editor: 'XBRL International, filings.xbrl.org (LEI 5493002L6I4YHANEYR87)', tipo: 'Primaria', fecha: '2025-05-08', url: 'https://filings.xbrl.org/5493002L6I4YHANEYR87/2024-03-31/ESEF/SE/0/lage-2024-03-31-sv.zip' },
];

// Cuenta [1, 2, 3, 4, 10]. EBITDA = EBIT + depreciación de inmovilizado y derechos de uso + amortización de intangibles comprados
// (resumen plurianual: «Profit before depreciation and amortisation»). Sin minoritarios en la cuenta: la empresa no los
// reconoce porque tiene opciones de compra y venta sobre ellos (la parte de los socios minoritarios va como pasivo).
const c = (periodo, ingresos, cv, sga, ebitda, amort, ebit, fin, gf, imp, bn, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: sga, ebitda, amortizaciones: amort, ebit, resultado_financiero: fin, bai: ebit + fin,
  impuestos: imp, minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('FY2021', 4091, 2513, 722 + 349, 774, 158 + 87, 529, -27, 45, 114, 388, 1.91, 1.00, 203.673),
  c('FY2022', 5482, 3389, 876 + 454, 1094, 199 + 114, 781, -40, 52, 169, 572, 2.80, 1.30, 204.102),
  c('FY2023', 7246, 4506, 1095 + 590, 1451, 246 + 143, 1062, -94, 141, 210, 758, 3.70, 1.60, 204.718),
  c('FY2024', 8129, 4932, 1279 + 687, 1704, 273 + 175, 1256, -140, 172, 239, 877, 4.25, 1.90, 206.227),
  c('FY2025', 9389, 5730, 1448 + 811, 1967, 321 + 207, 1439, -141, 186, 279, 1019, 4.93, 2.20, 206.553),
  c('FY2026', 10609, 6450, 1583 + 937, 2284, 361 + 229, 1694, -171, 193, 323, 1200, 5.81, 2.50, 206.537),
];

// Balance al cierre (31 de marzo) [1, 2, 3, 4, 10]. Deuda financiera = entidades de crédito + líneas comprometidas + otros
// pasivos con interés (sin pensiones ni arrendamientos). Intangibles = intangibles distintos del fondo de comercio.
// Inmovilizado material sin derechos de uso. Clientes = cuentas a cobrar comerciales; activos y pasivos de contrato aparte.
const b = (periodo, at, ac, pc, fc, intg, inm, ex, cli, prov, acon, pcon, caja, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: at - pn, fondo_comercio: fc, intangibles: intg,
  inmovilizado_material: inm, existencias: ex, clientes: cli, proveedores: prov, activos_contrato: acon, pasivos_contrato: pcon, caja,
  deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res,
});
const historico = [
  b('FY2021', 4610, 1609, 1583, 1609, 297 + 488, 586 - 246, 655, 635, 366, 37, 36, 151, 707 + 1 + 130 + 307, 150 + 96, 1855, 1549),
  b('FY2022', 6207, 2356, 1794, 2006, 359 + 726, 741 - 326, 949, 882, 497, 90, 72, 210, 1582 + 1 + 242 + 7, 216 + 113, 2228, 1870),
  b('FY2023', 8033, 3074, 2044, 2446, 468 + 1050, 608, 1167, 1146, 588, 91, 85, 360, 2227 + 14 + 19 + 2, 247 + 123, 3009, 2506),
  b('FY2024', 9842, 3522, 2489, 3110, 2042, 695, 1369, 1271, 631, 101, 117, 355, 2292 + 1 + 490 + 10 + 1, 306 + 149, 3468, 2932),
  b('FY2025', 11222, 3794, 2809, 3618, 2488, 753, 1426, 1356, 679, 113, 67, 456, 2997 + 2 + 482 + 6 + 2, 364 + 182, 3837, 3452),
  b('FY2026', 12771, 4317, 3161, 4214, 2861, 849, 1688, 1687, 806, 111, 85, 331, 3483 + 21 + 469 + 9 + 2, 314 + 191, 4436, 4057),
];

// Flujos [1, 2, 3, 4]. Capex = intangibles + inmovilizado material. Pagos de arrendamientos: FY2024-FY2026 publicados
// («Amortisation of lease liabilities»); FY2021-FY2023 la empresa los mezcla con las líneas de crédito: estimación propia
// igual a la depreciación de derechos de uso (89, 110 y 137). Adquisiciones = «Investments in businesses» (incluye pagos
// aplazados de compras anteriores). Dividendos = a los accionistas de la matriz (los de minoritarios de filiales, 5-53 M,
// van en el comentario). Recompras = recompra de opciones del programa de incentivos; emisión = opciones emitidas y
// acciones vendidas al ejercer opciones. Intereses pagados dentro del flujo operativo.
const f = (periodo, fo, capex, arr, adq, des, div, rec, em) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0 });
const flujosH = [
  f('FY2021', 782, 19 + 68, 89, 325, 0, 135, 25, 16),
  f('FY2022', 594, 27 + 96, 110, 653, 11, 204, 70, 18),
  f('FY2023', 1070, 39 + 139, 137, 847, 8, 265, 17, 9),
  f('FY2024', 1327, 34 + 91, 146, 1175, 3, 329, 10, 10),
  f('FY2025', 1322, 42 + 127, 175, 1136, 23, 392, 80, 18),
  f('FY2026', 1502, 53 + 161, 192, 1082, 32, 453, 32, 22),
];

const trim = (p, ing, g, org, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: org, ebitda: null, margen_ebitda_pct: null, bpa, vs_consenso: vs });

const segs = (nombre, descripcion, datos) => ({ nombre, descripcion, tipo_resultado: 'EBITA', historico: datos.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completa. FY2021-FY2026 de los informes anuales (FY2023-FY2024 cuadrados con el XBRL ESEF; el XBRL sumaba los arrendamientos a corto a la deuda en FY2024 y algo más en FY2023: se usa la cifra de las cuentas). LTM a 30-jun-2026 del 1T 2026/27. Sin minoritarios en la cuenta (opciones sobre ellos).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 11043, ebitda: 2351, ebit: 1754, beneficio_neto: 1252, bpa: 6.07, dpa: 2.50, dpa_extraordinario: 0, fcf: 1493 - 241 - 195, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Ocho compras con ≈ 1.070 M SEK de ventas anuales (Epoke, I Holland, Friggeråkers, Sit Right, Enskede Hydraul, Orax y dos complementarias); I Holland (335 M) consolidada desde noviembre de 2025 [1].' },
      { periodo: 'FY2025', descripcion: 'Compras con ≈ 825 M SEK de ventas anuales (contribución de 350 M en el año; 841 M si hubieran estado el año entero) [2].' },
      { periodo: 'FY2024', descripcion: 'Compras con ≈ 1.193 M SEK de ventas anuales a año completo [2].' },
    ],
    comentario: 'Las ventas pasaron de 4.091 M SEK en FY2021 a 10.609 M en FY2026 (TCAC del 21 %) y el EBITA de 616 a 1.923 M [1, 4]. Dos tercios del crecimiento son comprados: en FY2026 las ventas subieron un 13 %, con un 13 % de compras, un 3 % orgánico y un −3 % de divisa [1]; en el 1T 2026/27, +18 % con un 12 % comprado y un 6 % orgánico, el mejor orgánico en dos años [5]. El orgánico de los cinco trimestres hasta junio de 2026 fue del 3, 1, 2, 6 y 6 % [5]. El margen EBITA subió de 15,1 % (FY2021) a 18,1 % (FY2026) por la mezcla: los productos propios pasan del 78 al 80 % de las ventas y las compras recientes llegan con márgenes altos [1]. En el 1T 2026/27 el margen bajó a 17,1 % (17,5) por la estacionalidad de Epoke y Friggeråkers (máquinas de invierno) en International (14,6 % frente a 18,0 %) y por Control (14,0 % frente a 16,0 %) [5]. Ningún año es no comparable por partidas extraordinarias: el perímetro cambia cada año por compras.',
    ajustes: 'Lagercrantz publica el EBITA (resultado antes de amortizar los intangibles comprados: 229 M SEK en FY2026, 207 en FY2025) como medida principal, y el EBT [1]. El informe usa cifras NIIF publicadas: EBITDA = EBITA + depreciación (361 M), EBIT y BPA diluido después de amortizaciones de intangibles comprados. No hay deterioros ni reestructuraciones en los seis años [1, 2, 3, 4]. Los costes de transacción (11 M en FY2026, 21 en FY2025, 7 en el 1T 2026/27) y la revalorización de pagos aplazados (+30 M de ingreso en FY2026, +17 en el 1T) van dentro del resultado operativo y se repiten cada año, así que no se ajustan [1, 5]. El beneficio atribuido incluye el 100 % de las filiales con socios minoritarios: los dividendos a minoritarios (53 M en FY2026, 4,4 % del beneficio) y los cambios del valor de las opciones de venta van contra patrimonio [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T25', 2253, null, null, 1.08, null),
      trim('2T25', 2172, null, null, 1.08, null),
      trim('3T25', 2462, null, null, 1.30, null),
      trim('4T25', 2503, null, null, 1.48, null),
      trim('1T26', 2473, 10, 3, 1.27, null),
      trim('2T26', 2457, 13, 1, 1.25, null),
      trim('3T26', 2854, 16, 2, 1.52, null),
      trim('4T26', 2825, 13, 6, 1.76, 'Superior'),
      trim('1T27', 2907, 18, 6, 1.53, null),
    ],
    ultima_presentacion: 'Trimestres del ejercicio de abril a marzo (1T27 = abril-junio de 2026). La empresa no publica el EBITDA trimestral; publica el EBITA: 386, 387, 428 y 446 M SEK en FY2025, 432, 440, 513 y 536 en FY2026 y 498 en el 1T 2026/27 (margen 17,1 %) [5]. El 4T26 (19-may-2026) batió lo esperado y subió el dividendo a 2,50 SEK (+14 %) [6]. En el 1T27 (17-jul-2026) el consejero delegado habló de un «trimestre fuerte»: pedidos de unidades comparables un 10 % por encima de lo facturado y grandes proyectos para más adelante; electrificación, infraestructura, seguridad y defensa fuertes y construcción floja; inflación de metales, plásticos y fletes que se traslada a precios; y la meta de margen EBITA del 20 % en 2-3 años y de rentabilidad del circulante por encima del 60 % [5]. Repitió que, a largo plazo, dos tercios del crecimiento vendrán de compras y que es «cautamente optimista» [5]. Lo que no explicó con cifras: cuánto restó la estacionalidad de Epoke y Friggeråkers al margen de International ni por qué Control cayó dos puntos [5]. La acción bajó un 7,1 % ese día.',
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: 'FY2027 (corto plazo)', importe: 480 },
      { anio: 'sep-2027 (líneas sindicadas)', importe: 3504 },
    ],
    liquidez: 'Caja de 331 M SEK a 31-mar-2026 (386 M a 30-jun-2026), descubierto comprometido de 1.000 M y líneas revolventes de 2 × 2.100 M más dos préstamos a plazo de 500 M; un tramo vencía en septiembre de 2026 con opción de prórroga de un año (ventana del 23-jul al 23-ago-2026) y el otro vence en septiembre de 2027 [1].',
    rating: 'Sin rating',
    coste_deuda_pct: 3.8,
    vida_media_anios: 1.2,
    otros_pasivos: 'Pagos aplazados de compras (contingent considerations): 383 M SEK a 30-jun-2026 (331 a 31-mar-2026), con un máximo de 500 M, que vencen en tres años; en FY2026 se pagaron 140 M y se revirtieron 30 M contra resultados [5, 1]. Opciones de venta de los socios minoritarios de filiales: 613 M SEK a 30-jun-2026 (591 a 31-mar), valoradas con flujos descontados y que se revalorizan contra patrimonio (−79 M en FY2026) [5, 1]. Las dos partidas son pasivos sin interés pero asimilables a deuda (996 M en total) y van en el puente. Pensiones: 55 M [1]. Covenants (ratio de solvencia y cobertura de intereses) cumplidos con holgura [1]. Avales y garantías: 78 M [1].',
    comentario: 'La deuda neta con arrendamientos y pensiones subió de 1.314 M SEK en FY2021 a 4.213 M en FY2026 y 4.532 M en junio de 2026, siempre por compras: 2,1 veces el EBITDA de FY2026 (1,6 veces sin arrendamientos) [1, 5]. Con los pagos aplazados y las opciones de venta (996 M), la deuda ajustada es de ≈ 5.500 M, 2,3 veces el EBITDA de los últimos 12 meses. El circulante comercial pasó del 21 % de las ventas en FY2023 al 24 % en FY2026 por las existencias de compras industriales; la empresa mide la rentabilidad del circulante (EBITA ÷ circulante medio: 81 % en FY2026, 75 % en junio de 2026) [1, 5]. La deuda bancaria a largo vence casi toda en septiembre de 2027: refinanciación en los próximos 12 meses, sin señales de tensión (cobertura de intereses de 9 veces) [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'El flujo operativo pasó de 594 M SEK en FY2022 (año de acumulación de existencias: −293 M de circulante) a 1.502 M en FY2026, 1,25 veces el beneficio neto [1, 4]. La inversión propia es baja: 214 M en FY2026 (2,0 % de las ventas) más 192 M de arrendamientos; casi todo es mantenimiento y algo de capacidad en las fábricas propias (estimación propia: la depreciación de inmovilizado propio fue de ≈ 160 M). El uso principal de la caja son las compras: 1.082 M en FY2026, 1.136 en FY2025 y 1.175 en FY2024, unos 5.200 M en cinco años, casi el 90 % del flujo operativo de esos años [1, 2]. Los dividendos (453 M) y las compras se pagan con el flujo y con deuda: la caja después de compras y dividendos fue negativa todos los años, y la deuda neta creció ≈ 580 M al año [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte AB (desde la junta del 26-ago-2025; antes KPMG AB)', anios_auditor: 1, opinion: 'Favorable, sin salvedades, sobre el ejercicio 2025/26 [1]',
    comentario: 'Las cuentas son sencillas: sin deterioros en seis años, sin ajustes fuera de NIIF salvo el EBITA (resta solo la amortización de intangibles comprados), y con el flujo operativo por encima del beneficio [1]. Los dos juicios que importan son la asignación del precio de compra (en FY2026, de 1.276 M pagados, 509 fueron fondo de comercio y 594 intangibles que se amortizan) y la valoración de los pagos aplazados y de las opciones de venta de minoritarios, que se revalorizan con previsiones de cada filial [1]. En FY2026 la reversión de pagos aplazados sumó 30 M al resultado (1,8 % del EBIT) y en el 1T 2026/27, 17 M (3,9 %) [1, 5]: pequeño, pero va en el sentido de mejorar el resultado cuando las compradas rinden menos de lo previsto. El cambio de auditor (KPMG por Deloitte en 2025) y de director financiero (Peter Thysell por Karin Mellegård Djärf el 1-abr-2026) coinciden en el tiempo; no hay salvedades ni reexpresiones [1].',
    senales: [
      { senal: 'Reversión de pagos aplazados en el resultado', nivel: 'Baja', comentario: '30 M SEK en FY2026 y 17 M en el 1T 2026/27: cuando una comprada rinde menos, baja el pago y sube el resultado [1, 5].' },
      { senal: 'Cambio de auditor y de director financiero en un año', nivel: 'Baja', comentario: 'Deloitte desde agosto de 2025 y nueva directora financiera desde abril de 2026, sin salvedades [1].' },
      { senal: 'Minoritarios fuera de la cuenta', nivel: 'Media', comentario: 'El BPA incluye el 100 % de las filiales con socios; su parte (opciones de venta de 613 M) se lleva como pasivo y los dividendos a minoritarios (53 M) contra patrimonio [1, 5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo del 30-50 % del beneficio (2,50 SEK por FY2026, 43 % del BPA); el resto de la caja va a compras de pymes tecnológicas con dueño gestor del norte de Europa, de 20 a 400 M SEK de ventas, con precio fijo, pagos aplazados según resultados con tope y opciones sobre los minoritarios que se quedan [1, 5]. Autocartera de 3,03 M de acciones B (1,4 %) solo para cubrir los programas de opciones de directivos; la junta autoriza a emitir hasta un 10 % de acciones B para pagar compras, sin uso reciente [1]. Objetivos: EBT +15 % al año y por encima de 2.000 M SEK hacia 2027/28, ROE > 25 %, margen EBITA > 20 % en 2-3 años y rentabilidad del circulante > 60 % [1].',
    adquisiciones: [
      { anio: 'FY2027 (abr-ago 2026)', objetivo: 'Michael Smith Switchgear (GB), Nivex Topsafe, FMK, Hycon (DK), Stalon, Marsden (GB), bf1systems (GB) y Skandinavisk Radoninvest (NO)', importe: null, ev_ebitda: null, financiacion: 'Caja y deuda; pagos aplazados', resultado: 'Siete compras en el 1T y dos en agosto; ≈ 400 M SEK de ventas anuales las del 1T [5].' },
      { anio: 'FY2026', objetivo: 'Ocho compras (Epoke, I Holland, Friggeråkers, Sit Right, Enskede Hydraul, Orax, MT Miljøteknik, Qvintus)', importe: 1276, ev_ebitda: null, financiacion: 'Caja y deuda; 72 M de pagos aplazados', resultado: '1.072 M SEK de ventas y 164 M de resultado operativo a año completo: 1,19 veces ventas y 7,8 veces el resultado operativo [1].' },
      { anio: 'FY2025', objetivo: 'Compras del ejercicio 2024/25 (≈ 825 M SEK de ventas)', importe: 1447, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: '841 M SEK de ventas y 143 M de resultado operativo a año completo: 1,72 veces ventas y 10,1 veces el resultado [2].' },
      { anio: 'FY2024', objetivo: 'Compras del ejercicio 2023/24', importe: 1543, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: '1.193 M SEK de ventas y 204 M de resultado operativo a año completo: 1,29 veces ventas y 7,6 veces el resultado [2].' },
      { anio: 'FY2023', objetivo: 'Compras del ejercicio 2022/23', importe: 1225, ev_ebitda: null, financiacion: 'Caja y deuda; 99 M de pagos aplazados', resultado: '1.068 M SEK de ventas a año completo: 1,15 veces ventas [3].' },
      { anio: 'FY2022', objetivo: 'Compras del ejercicio 2021/22', importe: 840, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Ventas del 34 % más en el año (5.482 M) [4].' },
    ],
    comentario: 'En cinco años Lagercrantz pagó ≈ 6.300 M SEK por compras que suman ≈ 4.200 M de ventas, a 7,6-10,1 veces su resultado operativo anual: un rendimiento antes de impuestos del 10-13 % sobre lo pagado, por encima de un coste de capital de ≈ 9 % [1, 2, 3]. El ROIC con fondo de comercio se ha mantenido en el 15-16 % mientras el capital invertido se triplicaba: las compras no han diluido la rentabilidad. La rentabilidad sobre el patrimonio fue del 27-29 % todos los años [1]. Ninguna compra se ha deteriorado desde 2020 [1, 4]. La dilución es nula: 206,5 M de acciones diluidas en FY2026 frente a 203,7 M en FY2021, sin ampliaciones [1]. Lo que se ha gastado de más son las compras de FY2025 (1,72 veces ventas) y el uso creciente de deuda (deuda neta de 1,0 a 2,1 veces el EBITDA).',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      segs('Electrify', 'Productos para electrificación, redes eléctricas, seguridad vial e infraestructura (Elpress, Nordic Road Safety, Mastsystem, Elfac).', [['FY2022', 1480, 246], ['FY2023', 1695, 283], ['FY2024', 1823, 312], ['FY2025', 2307, 387], ['FY2026', 2651, 543]]),
      segs('Control', 'Control, medida y sensores (Direktronik, Radonova, Precimeter, Hycon).', [['FY2022', 670, 118], ['FY2023', 759, 119], ['FY2024', 1012, 144], ['FY2025', 1200, 175], ['FY2026', 1344, 228]]),
      segs('TecSec', 'Seguridad física y electrónica, puertas y sistemas para edificios (ISG Nordic, Idesco, I Holland, Door and Joinery).', [['FY2022', 907, 161], ['FY2023', 1749, 303], ['FY2024', 2067, 367], ['FY2025', 2172, 359], ['FY2026', 2317, 339]]),
      segs('Niche Products', 'Productos propios de nicho (Truxor, Wapro, Tormek, Thermod, Asept, Nivex).', [['FY2022', 1463, 289], ['FY2023', 1879, 375], ['FY2024', 1763, 399], ['FY2025', 2176, 479], ['FY2026', 2393, 492]]),
      segs('International', 'Empresas fuera de los nórdicos y negocio marino e invernal (DP Seals, Libra, Tebul, G9, Epoke, Friggeråkers).', [['FY2022', 997, 134], ['FY2023', 1205, 185], ['FY2024', 1501, 252], ['FY2025', 1568, 273], ['FY2026', 1933, 358]]),
      segs('Eliminaciones y matriz', 'Ventas entre divisiones y gastos de la matriz.', [['FY2022', -35, -53], ['FY2023', -43, -60], ['FY2024', -36, -43], ['FY2025', -34, -27], ['FY2026', -29, -37]]),
    ],
    geografias: [
      { nombre: 'Suecia', peso_pct: 30.8 }, { nombre: 'Dinamarca', peso_pct: 11.1 }, { nombre: 'Reino Unido', peso_pct: 9.3 }, { nombre: 'Noruega', peso_pct: 8.8 },
      { nombre: 'Finlandia', peso_pct: 6.2 }, { nombre: 'Alemania', peso_pct: 6.0 }, { nombre: 'Resto de Europa', peso_pct: 14.3 }, { nombre: 'Asia y resto del mundo', peso_pct: 13.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Crecimiento orgánico', valor_anterior: '3 % (FY2025)', valor_actual: '3 % (FY2026); 6 % en el 1T 2026/27', variacion: '+3 pp en el último trimestre', comentario: 'Electrify +10 % y TecSec +12 % orgánico en el 1T 2026/27 [5].' },
      { kpi: 'Crecimiento comprado', valor_anterior: '13 % (FY2025)', valor_actual: '13 % (FY2026); 12 % en el 1T 2026/27', variacion: 'estable', comentario: '14 compras desde abril de 2025 con ≈ 1.500 M SEK de ventas anuales [5].' },
      { kpi: 'Margen EBITA', valor_anterior: '17,5 % (FY2025)', valor_actual: '18,1 % (FY2026); 17,1 % en el 1T 2026/27', variacion: '+0,6 pp en el año', comentario: 'Objetivo: más del 20 % en 2-3 años [1, 5].' },
      { kpi: 'Rentabilidad del circulante (EBITA ÷ circulante)', valor_anterior: '79 %', valor_actual: '81 % (FY2026); 75 % (LTM jun-26)', variacion: '+2 pp; −6 pp en el trimestre', comentario: 'Objetivo > 60 % [1, 5].' },
      { kpi: 'Productos propios sobre ventas', valor_anterior: '78 %', valor_actual: '80 %', variacion: '+2 pp', comentario: 'Más margen que la distribución [1].' },
      { kpi: 'Rentabilidad sobre patrimonio', valor_anterior: '28 %', valor_actual: '29 % (FY2026); 28 % (LTM)', variacion: '+1 pp', comentario: 'Objetivo > 25 % [1].' },
    ],
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025/26: estrategia, mercados, divisiones y empresas del grupo', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-03', url: `${MFN}/b7e5d4dd-6584-4853-9685-eb6194fcc19a/lagercrantz-annual-report-2025-26.pdf` },
  { id: 2, titulo: 'Yahoo Finance quoteSummary (ventas, márgenes y crecimiento de Indutrade, Addtech, Lifco, Bergman & Beving, Momentum, Sdiptech, Beijer Alma, OEM y Diploma)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/INDT.ST?modules=financialData' },
  { id: 3, titulo: 'Interim Report Q1 2026/27 (mercados por división, inflación de costes, compras)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: `${MFN}/8f854b36-a942-47b7-a342-2c0de88b6c60/interim-report-q1-2026-27.pdf` },
  { id: 4, titulo: 'Comunicados de compras de 2026: Michael Smith Switchgear, Nivex, Hycon, Stalon, Marsden, bf1systems, Skandinavisk Radoninvest', editor: 'Lagercrantz Group AB (publ), vía MFN', tipo: 'Primaria', fecha: '2026-08-18', url: `${MFN}/55ce8284-187b-477c-a04e-d05293327255/acquisition-bf1.pdf` },
  { id: 5, titulo: 'Annual Report 2021/22: historia del grupo y escisión de Bergman & Beving en 2001', editor: 'Lagercrantz Group AB (publ), vía Cision', tipo: 'Primaria', fecha: '2022-07-11', url: 'https://mb.cision.com/Main/995/3599675/1603226.pdf' },
];
const comp = (n, p, t, ing, ebit, cm) => ({ nombre: n, pais: p, ticker: t, ingresos: ing, cuota_pct: null, margen_ebit_pct: ebit, comentario: cm });
const B_ = {
  _estado: 'Completa salvo el tamaño del mercado (hueco registrado en propio). Márgenes de los competidores de Yahoo (margen operativo de los últimos 12 meses); ventas en M SEK.',
  negocio: {
    descripcion: 'Lagercrantz es un grupo sueco de unas 90 pymes tecnológicas (3.822 empleados en junio de 2026) que venden a empresas productos de nicho con alto valor técnico: conectores y herramientas para redes eléctricas, señalización vial y barreras, mástiles, sensores y medida de radón, cerraduras y control de accesos, puertas de seguridad, herramientas de compresión para la industria farmacéutica, vehículos anfibios, silenciadores, armarios de seguridad [1, 3]. El 80 % de las ventas son productos propios (diseño y fabricación propia o por encargo), el 10 % distribución y el resto producción e integración de sistemas [3]. El 69 % se vende fuera de Suecia, sobre todo en Dinamarca, Reino Unido, Noruega, Finlandia y Alemania [1]. Cada filial tiene su propio director y su cuenta de resultados; la matriz decide las compras, fija objetivos y asigna el capital [1].',
    como_gana_dinero: 'El beneficio sale del margen bruto alto de productos con poca competencia directa (39 % en FY2026) y de una estructura ligera: cada filial vende entre 20 y 400 M SEK, con clientes industriales, eléctricas, administraciones e integradores [1]. No hay ingresos recurrentes por contrato; la recurrencia viene de recambios, normas técnicas y relaciones largas. El margen depende de la mezcla (productos propios frente a distribución), de trasladar a precios la inflación de metales, plásticos y fletes (lo está haciendo en 2026) y del volumen [3]. El apalancamiento operativo es moderado porque la estructura es pequeña en cada filial. Hay estacionalidad: el 2T (julio-septiembre) es el más flojo y las compañías de invierno (Epoke, Friggeråkers) venden en otoño e invierno [3].',
    clientes: 'Concentración muy baja: ningún cliente relevante a nivel de grupo; miles de clientes industriales y públicos en el norte de Europa [1]. No hay contratos largos publicados; la retención depende de la norma técnica, del servicio y del coste de cambiar un componente certificado (conectores eléctricos, barreras viales CE, cerraduras homologadas) [1, 3]. Poder de precios demostrado: en 2022-2023, con inflación alta, el margen EBITA subió de 16,3 % a 16,6 % y en FY2026 al 18,1 %, y en 2026 las filiales están subiendo precios por metales y fletes [1, 3]. Cifra que falta: la empresa no publica el peso del primer cliente ni de los diez primeros.',
  },
  sector: {
    definicion: 'El mercado relevante es el de componentes y sistemas técnicos de nicho para empresas en el norte de Europa (electrificación e infraestructura, seguridad, control y medida, productos industriales de nicho), en cientos de submercados de 50 a 2.000 M SEK cada uno, y, como segundo mercado, el de compra de pymes tecnológicas con dueño gestor, donde compite con otros compradores en serie suecos (Indutrade, Addtech, Lifco, Bergman & Beving, Momentum, Sdiptech) y británicos (Halma, Diploma) [1, 2]. No hay una estadística de tamaño para esta suma de nichos: la cuota se mide filial a filial y la empresa dice ser líder en muchos de sus nichos [1].',
    tamano: 'Sin cifra publicada para la suma de nichos en que opera (ver huecos).',
    unidad_serie: null,
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Electrificación y redes eléctricas', efecto: '+', horizonte: 'Estructural', evidencia: 'Electrify creció un 10 % orgánico en el 1T 2026/27 con margen EBITA del 20,1 % [3].' },
      { driver: 'Infraestructura y gasto público (carreteras, invierno, agua)', efecto: '+', horizonte: 'Estructural', evidencia: 'Compras de Epoke, Friggeråkers, Nordic Road Safety y FMK; demanda «robusta» según la empresa [3].' },
      { driver: 'Seguridad y defensa', efecto: '+', horizonte: 'Estructural', evidencia: 'TecSec +12 % orgánico en el 1T 2026/27; silenciadores (Stalon) y armarios de seguridad (Nivex) [3, 4].' },
      { driver: 'Construcción en Suecia y Reino Unido', efecto: '−', horizonte: 'Cíclico', evidencia: 'La construcción sigue con poca actividad; PcP y Door and Joinery por debajo del año anterior [3].' },
      { driver: 'Inflación de metales, plásticos y fletes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Subidas de precios en curso en 2026 para compensar [3].' },
      { driver: 'Oferta de pymes en venta por relevo generacional', efecto: '+', horizonte: 'Estructural', evidencia: '14 compras desde abril de 2025 (≈ 1.500 M SEK de ventas) [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En cada nicho compiten pocos fabricantes; Lagercrantz es líder en muchos, con margen EBITA del 18 % frente al 13-16 % de Indutrade, Addtech y Bergman & Beving [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes muy repartidos; el componente pesa poco en el coste del cliente y está certificado [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Metales, plásticos y fletes suben en 2026; el 10 % de distribución depende de marcas de terceros [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Nichos pequeños poco atractivos para grandes rivales; normas y certificaciones como barrera [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Productos técnicos y físicos (conectores, barreras, cerraduras, herramientas); poca sustitución digital [1].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'El orgánico pasó del 1-2 % en julio-diciembre de 2025 al 6 % en enero-junio de 2026, con pedidos de unidades comparables un 10 % por encima de lo facturado [3]. La construcción sigue floja y la industria general mejora. En 2008-09 el grupo bajó ventas pero siguió en beneficios; en 2020 las ventas cayeron un 2,1 % (FY2021) y el beneficio subió un 6 %; en 2022-2023 la inflación se trasladó a precios y el margen subió [5, 1].' },
    regulacion: 'No hay una regulación que afecte a todo el grupo. Sí a nichos concretos: normas CE de barreras viales y señalización, homologación de cerraduras y armarios de seguridad, medida de radón (umbral sueco de 200 Bq/m³), y la inversión pública en redes eléctricas y carreteras en Suecia, Noruega, Dinamarca y Reino Unido [1, 4]. En compras: controles de inversión extranjera en Reino Unido para algunos activos de defensa (la compra de TASL necesitó aprobación en febrero de 2025) [1].',
    tendencias: 'La electrificación (redes, cargadores, centros de datos) y el gasto en defensa e infraestructura impulsan las divisiones Electrify y TecSec; la construcción residencial, no [3]. En compras, la competencia de otros compradores en serie y de capital privado sube los precios: Lagercrantz pagó 1,72 veces ventas en FY2025 y 1,19 en FY2026 [1]. La digitalización de productos (sensores conectados, control de accesos) es una oportunidad en Control y TecSec. Gana con todo ello mientras pueda seguir comprando a 8-10 veces el resultado.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder o número dos en muchos nichos del norte de Europa (no publica cuotas); quinto comprador en serie industrial sueco por capitalización, tras Lifco, Indutrade, Addtech y Beijer Alma por ventas [1, 2].',
    competidores: [
      comp('Indutrade', 'SE', 'INDT', 33123, 12.6, 'El mayor comprador de pymes industriales de Suecia (más de 200 filiales); más distribución y algo menos de margen [2].'),
      comp('Addtech', 'SE', 'ADDT B', 23036, 14.4, 'Mismo origen (Bergman & Beving) y mismo modelo; más grande y con más distribución técnica [2].'),
      comp('Lifco', 'SE', 'LIFCO B', 29257, 19.3, 'Compra de pymes en dental, demolición e industria; margen más alto [2].'),
      comp('Bergman & Beving', 'SE', 'BERG B', 5024, 8.0, 'Mismo grupo de control (Tisenhult); más distribución de consumibles industriales [2].'),
      comp('Momentum Group', 'SE', 'MMGR B', 3160, 10.9, 'Escindida de B&B; componentes y servicios industriales [2].'),
      comp('Sdiptech', 'SE', 'SDIP B', 5126, 16.2, 'Infraestructura técnica y seguridad; crecimiento flojo en 2026 [2].'),
      comp('OEM International', 'SE', 'OEM B', 5941, 14.7, 'Distribución técnica de componentes industriales [2].'),
      comp('Diploma', 'GB', 'DPLM', 21797, 19.7, 'Comprador en serie británico de componentes técnicos; margen alto [2].'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a productos industriales de nicho.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Componentes certificados (conectores eléctricos, barreras CE, cerraduras) caros de cambiar para el cliente; margen bruto del 39 % [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marcas de nicho (Elpress, Truxor, Tormek) y conocimiento técnico; pocas patentes relevantes a nivel de grupo [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'Las filiales son pequeñas; la ventaja es de margen por producto propio, no de coste [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos de 50-2.000 M SEK que no compensan a un rival grande; margen EBITA del 18 % sostenido seis años [1].' },
      ],
    },
    amenazas: 'Dos amenazas reales. Primera, el precio de las compras: con más compradores en serie y fondos buscando pymes, el múltiplo pagado sube (1,72 veces ventas en FY2025) y el rendimiento del capital nuevo puede bajar del 12-13 % actual; probabilidad media [1]. Segunda, la cíclica: la construcción ya resta en TecSec y Niche Products, y una recesión industrial europea quitaría crecimiento orgánico durante uno o dos años; probabilidad media [3]. En los productos, la competencia de importaciones asiáticas en los nichos con menos certificación (herramientas, distribución) es baja-media.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Lagercrantz nació en 1906 como distribuidor sueco de componentes y entró en Bergman & Beving en los años noventa; en 2001 se escindió de Bergman & Beving (a la vez que Addtech) y salió a bolsa en Estocolmo el 3 de septiembre de 2001 [1, 5]. En sus primeros años fue sobre todo distribución de electrónica; desde 2006, con Jörgen Wigh como consejero delegado, giró hacia productos propios de nicho y hacia compras de pymes con dueño gestor, sobre todo en los nórdicos y después en Reino Unido, Alemania y Polonia [1]. El grupo ha aumentado su beneficio dieciséis años seguidos; en 2020 hizo un split 3:1 [1, 4].',
    hitos: [
      { anio: '1906', hito: 'Origen como distribuidor de componentes técnicos en Suecia [5].' },
      { anio: '2001', hito: 'Escisión de Bergman & Beving y salida a bolsa en Estocolmo (3-sep-2001) [1].' },
      { anio: '2006', hito: 'Jörgen Wigh, consejero delegado: giro a productos propios y compras de nicho [1].' },
      { anio: '2020', hito: 'Split 3:1 de las acciones [5].' },
      { anio: '2022', hito: 'Reorganización en cinco divisiones (Electrify, Control, TecSec, Niche Products, International) y compras récord (+34 % de ventas en FY2022) [5].' },
      { anio: '2023', hito: 'Objetivo de 1.000 M SEK de beneficio logrado; programa «hacia 2.000 millones» de EBT en cinco años [1].' },
      { anio: '2025', hito: 'Ocho compras con ≈ 1.070 M SEK de ventas, entre ellas Epoke (Dinamarca) e I Holland (Reino Unido) [1].' },
      { anio: '2026', hito: 'Nueva directora financiera, objetivos de margen EBITA > 20 % y siete compras en abril-agosto, cuatro en Reino Unido [1, 3, 4].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es poco: emisiones bajas (fabricación ligera y montaje en pymes) y productos que ayudan a la electrificación y a la seguridad vial. El informe de sostenibilidad 2025/26 forma parte del informe del consejo y sigue la directiva europea de información de sostenibilidad [1]. La parte social que importa es la retención de los dueños gestores después de la compra, que la empresa protege con pagos aplazados y opciones sobre los minoritarios [1].',
    controversias: 'No hemos encontrado sanciones, litigios relevantes ni incidentes en 2023-2026 en los informes anuales ni en las noticias revisadas [1].',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025/26: informe de gobierno corporativo, consejo, dirección, nota 5 (remuneración) y nota 7 (opciones)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-03', url: `${MFN}/b7e5d4dd-6584-4853-9685-eb6194fcc19a/lagercrantz-annual-report-2025-26.pdf` },
  { id: 2, titulo: 'The Annual General Meeting of Lagercrantz Group AB on 25 August 2026 (acuerdos)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-08-25', url: `${MFN}/57f65855-9384-48dd-84fa-671f6c02eb25/report-from-the-annual-general-meeting-2026.pdf` },
  { id: 3, titulo: 'Report from the Annual General Meeting 2025 (26-ago-2025)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-08-26', url: `${MFN}/114a498a-063d-4b2d-aea4-8604422475c5/pr-250826-report-from-the-annual-general-meeting-final.pdf` },
  { id: 4, titulo: 'Registro de operaciones de directivos (Insynshandel), emisor Lagercrantz Group AB, octubre de 2025 - octubre de 2026', editor: 'Finansinspektionen', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://marknadssok.fi.se/publiceringsklient/sv-SE/Search/Search?SearchFunctionType=Insyn&Utgivare=Lagercrantz+Group+AB&button=search' },
  { id: 5, titulo: 'Lagercrantz appoints Karin Mellegård Djärf as new CFO', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-12-08', url: `${MFN}/c8a6a93a-7c27-4f7b-8536-79853bb1c3a3/new-cfo.pdf` },
  { id: 6, titulo: 'Annual Report 2022/23 y 2024/25: objetivos y resultados de cada ejercicio', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2025-07-04', url: `${MFN}/86592a3c-1aff-4a8e-b041-dbcba91ba27a/lagercrantz-annual-report-2024_25.pdf` },
  { id: 7, titulo: 'Lagercrantz’ share-based incentive programme fully subscribed', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-10-01', url: `${MFN}/86213428-3792-4006-a2e8-98a7706ae567/call-option-programme-fully-subscribed.pdf` },
];
const C = {
  _estado: 'Completa. Votos de la junta: los comunicados no dan el recuento de la votación de remuneración (hueco en propio).',
  directivos: {
    equipo: [
      { nombre: 'Jörgen Wigh', cargo: 'Presidente ejecutivo y consejero delegado', desde: '2006', participacion_pct: 1.2, trayectoria: 'Antes vicepresidente de Bergman & Beving, fundador de PriceGain, consultor de McKinsey. Con él, el beneficio ha subido dieciséis años seguidos y el EBITA pasó de 616 M SEK (FY2021) a 1.923 M (FY2026) [1]. Preside Bergman & Beving.' },
      { nombre: 'Jonas Ahlberg', cargo: 'Vicepresidente ejecutivo, desarrollo de negocio y compras', desde: '2012', participacion_pct: null, trayectoria: 'Responsable de las compras: 14 desde abril de 2025 con ≈ 1.500 M SEK de ventas. Compró 5.000 acciones B a 213,95 SEK el 15-sep-2026 [1, 4].' },
      { nombre: 'Karin Mellegård Djärf', cargo: 'Directora financiera', desde: '2026', participacion_pct: null, trayectoria: 'Desde el 1-abr-2026; antes directora financiera de ByggPartner y Knightec, CFO de división y jefa de compras de AFRY, Swedish Match, EY y PwC [5]. Sustituye a Peter Thysell (2021-2026).' },
      { nombre: 'Fredrik Börjesson', cargo: 'Presidente del consejo', desde: '2016', participacion_pct: 5.6, trayectoria: 'Presidente desde 2021; directivo del grupo familiar Tisenhult (Anders Börjesson), que controla el 29 % de los votos; consejero de Addtech y Bergman & Beving [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Beneficio de al menos 1.000 M SEK en cinco años (plan 2019)', real: 'Logrado en el verano de 2023, antes de plazo', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'EBT +15 % al año a lo largo del ciclo', real: '+15 % (1.116 M)', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'EBT +15 % al año', real: '+16 % (1.298 M)', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'EBT +15 % al año; ROE > 25 %', real: '+17 % (1.523 M); ROE 29 %', cumplida: 'Sí' },
      { anio: 'FY2028', guia: 'EBT > 2.000 M SEK en cinco años desde 2023/24', real: 'LTM jun-26: 1.585 M (a medio camino)', cumplida: 'Parcial' },
      { anio: 'FY2028-29', guia: 'Margen EBITA > 20 % en 2-3 años (fijado en 2025/26)', real: '18,1 % en FY2026; 17,1 % en el 1T 2026/27', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y probado: Wigh lleva veinte años al frente y el beneficio ha crecido todos los años, con objetivos públicos cumplidos o batidos [1, 6]. El cambio relevante es la directora financiera (abril de 2026), que llega con el auditor también nuevo (Deloitte, 2025) [1, 5]. La sucesión es el punto débil: Wigh tiene 61 años y no hay un sucesor anunciado; el vicepresidente Ahlberg (60) lleva las compras [1]. Los directivos compraron acciones tras la caída de julio de 2026 y nadie ha vendido acciones en 12 meses [4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Fredrik Börjesson', cargo: 'Presidente', tipo: 'Dominical', desde: '2016', comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Malin Nordesjö', cargo: 'Consejera', tipo: 'Dominical', desde: '2024', comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Anna Almlöf', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría' },
      { nombre: 'Anna Marsell', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría' },
      { nombre: 'Anders Claeson', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
      { nombre: 'Jörgen Wigh', cargo: 'Consejero y consejero delegado', tipo: 'Ejecutivo', desde: '2006', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 15.28, fijo: 8.83, variable_corto: 2.34, variable_largo: 1.32, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 15,3 M SEK en FY2026 (+15 %): 8,8 de fijo, 2,3 de variable anual, 1,3 de variable plurianual, 2,7 de pensión y 0,1 de otros [1]. El variable depende del crecimiento del beneficio (EBT) y de la rentabilidad del circulante; el plurianual se cobra en caja y se reinvierte en acciones. Además, los directivos compran a precio de mercado opciones de compra sobre acciones en autocartera (programas anuales de 800.000 opciones, precio de ejercicio del 125 % de la cotización; el de 2026 se suscribió entero) [1, 7]. Premia crecer el beneficio y no diluye, pero no mide el rendimiento del capital de las compras (ROIC). El informe de remuneración se aprobó en las juntas de 2025 y 2026 [2, 3].',
    accionistas: [
      { nombre: 'Anders Börjesson y Tisenhult-gruppen', pct: 5.6, tipo: 'Familia de control (acciones A y B; 29,0 % de los votos)', variacion: 'Estable' },
      { nombre: 'Fidelity Investments (FMR)', pct: 9.4, tipo: 'Institucional', variacion: 'Sin cambio relevante publicado' },
      { nombre: 'SEB Fonder', pct: 7.4, tipo: 'Institucional', variacion: '—' },
      { nombre: 'Swedbank Robur Fonder', pct: 6.9, tipo: 'Institucional', variacion: 'Pasó del 5 % en septiembre de 2026' },
      { nombre: 'Lannebo Fonder', pct: 6.2, tipo: 'Institucional', variacion: 'Aumentó en julio-agosto de 2026' },
      { nombre: 'Handelsbanken Fonder', pct: 4.5, tipo: 'Institucional', variacion: '—' },
      { nombre: 'Jörgen Wigh', pct: 1.2, tipo: 'Consejero delegado (3,0 % de los votos)', variacion: 'Estable' },
      { nombre: 'Autocartera (acciones B)', pct: 1.4, tipo: 'Autocartera', variacion: '3,03 M de acciones para los programas de opciones' },
    ],
    insiders: [
      { fecha: '2026-09-15', persona: 'Jonas Ahlberg (vicepresidente ejecutivo)', operacion: 'Compra', acciones: 5000, importe: 1.07 },
      { fecha: '2026-08-05', persona: 'Anna Marsell (consejera)', operacion: 'Compra', acciones: 2125, importe: 0.50 },
      { fecha: '2026-07-20', persona: 'Karin Mellegård Djärf (directora financiera)', operacion: 'Compra', acciones: 2200, importe: 0.52 },
      { fecha: '2026-07-21', persona: 'Anna Schmidt Almlöf (consejera)', operacion: 'Compra', acciones: 433, importe: 0.10 },
      { fecha: '2026-06-15', persona: 'Peter Thysell (directivo)', operacion: 'Compra', acciones: 1500, importe: 0.38 },
      { fecha: '2026-06-01', persona: 'Patrik Klerck (directivo)', operacion: 'Compra', acciones: 1100, importe: 0.28 },
      { fecha: '2025-11-24', persona: 'Peter Thysell (director financiero)', operacion: 'Compra', acciones: 2000, importe: 0.42 },
    ],
    control_y_defensas: 'Hay dos clases de acciones: las A tienen 10 votos y las B uno [1]. La familia Börjesson (Tisenhult-gruppen) tiene 8,19 M de acciones A y 3,45 M de B: el 5,6 % del capital y el 29,0 % de los votos; con el consejero delegado (3,0 % de los votos), los directores y sus familias controlan ≈ 32 % de los votos [1]. La familia preside el consejo y la comisión de nombramientos y tiene dos de los seis consejeros; es también la de control en Addtech y Bergman & Beving, con consejeros cruzados (Börjesson, Nordesjö y Wigh) [1]. No hay operaciones vinculadas relevantes [1]. Defensas: la doble clase de acciones hace casi imposible una oferta hostil.',
    alertas: [
      'Cambio de auditor (KPMG por Deloitte, agosto de 2025) y de director financiero (abril de 2026) en el mismo año [1, 5].',
      'Consejeros cruzados con Addtech y Bergman & Beving, del mismo grupo de control: posible conflicto si compiten por la misma compra [1].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LAGR-B.ST, ^OMXSPI y EXH4.DE (precio, rango, volumen, betas, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/LAGR-B.ST/history' },
  { id: 2, titulo: 'Lagercrantz Group AB: finances y consensus (estimaciones FY2027-FY2029, 7 analistas, objetivos)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/LAGERCRANTZ-GROUP-AB-24220547/finances/' },
  { id: 3, titulo: 'Lagercrantz Group AB Class B: consensus estimates (5 comprar, 2 mantener; objetivo medio 268,88 SEK)', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.investing.com/equities/lagercrantz-group-consensus-estimates' },
  { id: 4, titulo: 'Lagercrantz Group AB: noticias (cambios de recomendación, compras de directivos, compras de empresas)', editor: 'MarketScreener', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/LAGERCRANTZ-GROUP-AB-24220547/news/' },
  { id: 5, titulo: 'Rendimiento del bono del Estado sueco a 10 años (SEGVB10YC)', editor: 'Sveriges Riksbank', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-01/2026-10-21' },
  { id: 6, titulo: 'Implied ERP by month (ERP T12m with sustainable payout, octubre de 2026: 4,20 %)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Yahoo Finance quoteSummary de los comparables (precio, capitalización, valor empresa, EBITDA, consenso de BPA y ventas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/ADDT-B.ST?modules=price,summaryDetail,financialData,defaultKeyStatistics,earningsTrend' },
  { id: 8, titulo: 'Etiqueta Lagercrantz Group: titulares de 2026 (resultados del 19-may, compra ligada a centros de datos del 2-abr, artículos sobre compradores en serie)', editor: 'EFN', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://www.efn.se/tagg/lagercrantz-group' },
  { id: 9, titulo: 'Annual Report 2025/26 y 2021/22: datos por acción, cotización al cierre de cada ejercicio y nota 35 de compras', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-03', url: `${MFN}/b7e5d4dd-6584-4853-9685-eb6194fcc19a/lagercrantz-annual-report-2025-26.pdf` },
  { id: 10, titulo: 'Interim Report Q1 2026/27 (acciones, puente, pagos aplazados, opciones de venta, calendario)', editor: 'Lagercrantz Group AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: `${MFN}/8f854b36-a942-47b7-a342-2c0de88b6c60/interim-report-q1-2026-27.pdf` },
];
const comps = COMP.filter((x) => x.ticker !== 'LAGR-B.ST').map(({ _eps_ntm, ...x }) => x);
const dip = comps.find((x) => x.ticker === 'DPLM.L');
if (dip) { dip.capitalizacion = Math.round(10131 * 13.23415); dip.dn_ebitda = r1((10485 - 10131) / 400); }
const D = {
  _estado: 'Completa. Precio del informe: cierre del 20-oct-2026 (228,80 SEK); la sesión del 21-oct seguía abierta al corte (229,60-229,80 a las 14:16 UTC). Consenso de BPA de MarketScreener (Yahoo da 7,32 SEK para FY2027 con 8 analistas, otra base o muestra: solo contraste).',
  identificacion: {
    nombre: 'Lagercrantz Group AB (publ)', nombre_corto: 'Lagercrantz', ticker: 'LAGR B', isin: 'SE0014990966', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm PI',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Conglomerados industriales y componentes eléctricos', sede: 'Estocolmo', fundacion: '1906', empleados: 3822, web: 'www.lagercrantz.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 206.5, capitalizacion_publicada: 47375, free_float_pct: 87.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M SEK/día (3 meses)`, proximos_resultados: '2026-10-23',
  },
  consenso: {
    guidance: 'Lagercrantz no da previsiones anuales; tiene objetivos a medio plazo, confirmados en el informe anual 2025/26 (3-jul-2026) y en el 1T 2026/27 (17-jul-2026): EBT +15 % al año a lo largo del ciclo y por encima de 2.000 M SEK en 2027/28 (programa «hacia 2.000 millones»), ROE > 25 %, margen EBITA > 20 % en 2-3 años y rentabilidad del circulante > 60 % en cada filial; dos tercios del crecimiento vendrán de compras [9, 10]. La dirección se declara «cautamente optimista» [10].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 12181, ebitda: 2587, ebit: 1963, bpa: 6.81, dpa: 2.89, fuente: 'MarketScreener (7 analistas) [2]' },
      { periodo: 'FY2028e', ingresos: 13104, ebitda: 2821, ebit: 2163, bpa: 7.59, dpa: 3.17, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 13864, ebitda: 3024, ebit: 2328, bpa: 8.26, dpa: 3.40, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 7, comprar: 5, mantener: 2, vender: 0, po_medio: 268.88, po_min: 230.00, po_max: 290.00 },
    revisiones: 'Una sola fuente gratuita con estimaciones completas (MarketScreener) [2]; Investing.com confirma el objetivo medio (268,88 SEK), el rango (230-290) y 5 comprar y 2 mantener [3]. Yahoo da un BPA de 7,32 SEK para FY2027 y 8,13 para FY2028 (8 analistas), un 7 % más: otra base o muestra; se usa como contraste [7]. Tras el 1T 2026/27 (17-jul) Kepler y Nordea recortaron el objetivo (290 → 280 y 285 → 280), mientras Handelsbanken, Pareto y SEB pasaban a comprar; en octubre Nordea lo subió a 283 SEK y DNB Carnegie lo bajó a 248 (mantener) [4]. FactSet espera un EBITA de 502 M SEK en el 2T 2026/27 (+14 %) [4]. Tendencia de los objetivos en tres meses: estable.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 15,3 % anual en cinco años y un 22,9 % en diez (de precio), frente al 2,9 % y el 8,0 % del índice sueco: el mercado ha pagado el crecimiento del beneficio (TCAC del BPA del 25 % en cinco años) y una expansión del múltiplo hasta 2024-2025 [1, 9]. En el último año, +7,0 % frente a +10,4 % del índice: el PER bajó de ≈ 42 veces el beneficio publicado a 37 mientras el BPA crecía un 18 %. El año fue de vaivenes de los compradores en serie suecos (caída en el 1T de 2026, recuperación en abril-mayo y nueva corrección tras los resultados de julio) [1, 8].',
  },
  multiplos_historicos: {
    serie: (B.cierres_ejercicio || []).filter((x) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: '',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Compradores en serie y grupos de pymes industriales cotizados en Estocolmo con el mismo modelo (compra de nichos con dueño gestor, gestión descentralizada): Indutrade, Addtech y Lifco (los tres grandes), Bergman & Beving y Momentum (mismo origen y grupo de control), Sdiptech, Beijer Alma y OEM; y Diploma como referencia británica. Halma queda fuera porque Yahoo no daba su capitalización; Volati por estar en pérdidas en 2026. Todos con el consenso de Yahoo del 21-oct-2026, BPA de los próximos 12 meses ponderado por meses [7]. Diploma usa BPA ajustado (sin amortizar intangibles comprados): su PER queda algo bajo frente a los suecos, que publican el BPA después de amortizaciones.',
    empresas: comps,
    comentario: '',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-03', objetivo: 'Compras de Lagercrantz en 2025/26 (ocho empresas)', comprador: 'Lagercrantz', ev: 1276, ev_ventas: 1.19, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.072 M SEK de ventas y 164 M de resultado operativo a año completo: 7,8 veces [9].' },
      { fecha: '2025-03', objetivo: 'Compras de Lagercrantz en 2024/25', comprador: 'Lagercrantz', ev: 1447, ev_ventas: 1.72, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '841 M de ventas y 143 M de resultado operativo: 10,1 veces [9].' },
      { fecha: '2024-03', objetivo: 'Compras de Lagercrantz en 2023/24', comprador: 'Lagercrantz', ev: 1543, ev_ventas: 1.29, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.193 M de ventas y 204 M de resultado operativo: 7,6 veces [9].' },
      { fecha: '2023-03', objetivo: 'Compras de Lagercrantz en 2022/23', comprador: 'Lagercrantz', ev: 1225, ev_ventas: 1.15, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.068 M de ventas a año completo [9].' },
      { fecha: '2026-06', objetivo: 'Compras de Lagercrantz desde el 1-jul-2025 (11 empresas, asignación provisional)', comprador: 'Lagercrantz', ev: 1421, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 1.421 M SEK; 601 M de fondo de comercio y 669 de intangibles [10].' },
    ],
    comentario: '',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fD,
};
guarda('D', D);
console.log('Notas A-D escritas.');
