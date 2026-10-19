// Escribe las notas A-E de Lasertec (6920.T, corte 2026-10-19) a partir de los resultados anuales (tanshin, J-GAAP,
// millones de JPY), el Excel «Financial Highlights» de agosto de 2026, el guion de las dos últimas conferencias, el yuho
// FY2026 (traducción parcial), el informe de gobierno, la junta de 2026, bolsa.mjs, MarketScreener, Stock Analysis y foros.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const MOV = JSON.parse(fs.readFileSync(path.join(dir, 'movimiento.json'), 'utf8'))['6920.T'];
const E = 'https://ssl4.eir-parts.net/doc/6920';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2026 (Japanese GAAP): cuenta, balance, flujos, ingresos por región y producto, pedidos y cartera, guía FY2027', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym7/209786/00.pdf` },
  { id: 2, titulo: 'Financial Highlights [Excel]: series anuales FY2019-FY2026 y trimestrales (cuenta, balance, flujos, pedidos, cartera, regiones, productos, plantilla)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym9/209785/00.xlsx` },
  { id: 3, titulo: 'Presentation Material - Fiscal Year ended June 2026 Financial Results (ventas y pedidos de ACTIS y MATRICS, guía FY2027)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym5/209787/00.pdf` },
  { id: 4, titulo: 'Financial Results Briefing for the Fiscal Year Ended June 2026 (guion con preguntas y respuestas)', editor: 'Lasertec Corporation / SCRIPTS Asia', tipo: 'Primaria', fecha: '2026-08-10', url: `${E}/ir_material_for_fiscal_ym5/210010/00.pdf` },
  { id: 5, titulo: 'Fiscal Year Ended June 2026 - 1on1 FAQ (desglose de ventas y pedidos por producto, sensibilidad al tipo de cambio)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym9/209783/00.pdf` },
  { id: 6, titulo: 'Securities Report (yuho) for Fiscal Year Ended June 30, 2026, traducción parcial (riesgos, clientes principales, gobierno)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-10-15', url: `${E}/ir_material_for_fiscal_ym14/214098/00.pdf` },
  { id: 7, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2025 (Japanese GAAP)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-08-07', url: `${E}/ir_material_for_fiscal_ym7/184432/00.pdf` },
  { id: 8, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2024 (Japanese GAAP)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2024-08-07', url: `${E}/ir_material_for_fiscal_ym7/161105/00.pdf` },
  { id: 9, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2023 (Japanese GAAP)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2023-08-07', url: `${E}/ir_material_for_fiscal_ym7/139401/00.pdf` },
  { id: 10, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2022 (Japanese GAAP)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2022-08-05', url: `${E}/ir_material_for_fiscal_ym7/121946/00.pdf` },
  { id: 11, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2021 (Japanese GAAP; incluye FY2020)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2021-08-06', url: `${E}/ir_material_for_fiscal_ym7/104519/00.pdf` },
  { id: 12, titulo: 'Presentation Material - Third Quarter of Fiscal Year Ending June 2026 Financial Results (guion con preguntas y respuestas)', editor: 'Lasertec Corporation / SCRIPTS Asia', tipo: 'Primaria', fecha: '2026-05-01', url: `${E}/ir_material_for_fiscal_ym5/202349/00.pdf` },
  { id: 13, titulo: 'Consolidated Financial Results for the Third Quarter Ended March 31, 2026 (Japanese GAAP)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-04-30', url: `${E}/ir_material_for_fiscal_ym7/202350/00.pdf` },
  { id: 14, titulo: 'Fact Sheet 2026 (series de cinco años, cotización al cierre, accionistas)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym6/209869/00.pdf` },
  { id: 15, titulo: 'Revised Forecast of Consolidated Financial Results for FY2026', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-01-30', url: `${E}/tdnet/2747189/00.pdf` },
  { id: 16, titulo: 'Notice Regarding Share Buyback (hasta 1 millón de acciones y 12.000 M JPY)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-08-07', url: `${E}/tdnet/2669212/00.pdf` },
  { id: 17, titulo: 'Notice Regarding the Status and Completion of Share Buyback (560.600 acciones, 11.998 M JPY)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-12-16', url: `${E}/tdnet/2731992/00.pdf` },
  { id: 18, titulo: 'Short seller Scorpion Capital targets Lasertec with fraud allegations', editor: 'Fortune', tipo: 'Prensa', fecha: '2024-06-05', url: 'https://fortune.com/2024/06/05/short-seller-scorpion-capital-lasertec-japan-semiconductors-chips-euv-fraud-allegations' },
  { id: 19, titulo: 'Lasertec Says Its Inventory Valued Properly, Actis Orders Strong', editor: 'Bloomberg Tax', tipo: 'Prensa', fecha: '2024-06', url: 'https://news.bloombergtax.com/financial-accounting/lasertec-says-its-inventory-valued-properly-actis-orders-strong' },
];

// FY2020-FY2026 (etiqueta «fin»: FY2026 = julio 2025 - junio 2026). Millones de JPY.
const P = ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const ventas = [42572, 70248, 90378, 152832, 213506, 251477, 230485];
const bruto = [22991, 36952, 47787, 84014, 107479, 148256, 136479];
const sga = [7929, 10878, 15295, 21726, 26103, 25413, 31220];
const ebit = [15062, 26074, 32492, 62287, 81375, 122843, 105259];
const ordinario = [15115, 26438, 33582, 63668, 82021, 119444, 107895];
const neto = [10823, 19250, 24850, 46164, 59076, 84652, 77485];
const amort = [881, 1642, 3483, 3486, 4726, 4676, 4674];
const bpaDil = [119.92, 213.29, 275.34, 511.46, 654.49, 937.82, 862.26];
const dpa = [42.5, 75, 97, 180, 230, 329, 329];
const gfin = [0, 0, 0, 27, 10, 12, 0];
const cuenta = P.map((p, i) => ({
  periodo: p, ingresos: ventas[i], coste_ventas: ventas[i] - bruto[i], gastos_generales: sga[i],
  ebitda: ebit[i] + amort[i], amortizaciones: amort[i], ebit: ebit[i],
  resultado_financiero: ordinario[i] - ebit[i], bai: ordinario[i], impuestos: ordinario[i] - neto[i], minoritarios: 0,
  beneficio_neto: neto[i], gastos_financieros: gfin[i], participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa: bpaDil[i], dpa: dpa[i], dpa_extraordinario: 0, acciones_diluidas: Math.round(neto[i] / bpaDil[i] * 100) / 100,
}));

const bal = {
  ac: [70002, 101725, 161031, 231090, 231978, 286861, 295082],
  caja: [24723, 27918, 23494, 29773, 38152, 86087, 91503],
  cli: [5662, 7892, 10449, 21611, 22905, 24790, 26963],
  exist: [30083 + 3978, 48712 + 5176, 94308 + 9774, 131056 + 21017, 126087 + 36314, 123672 + 45333, 122449 + 45342],
  ppe: [7914, 9918, 8912, 28424, 28168, 30285, 29255],
  intang: [843, 3070, 5956, 6164, 4245, 2451, 1251],
  at: [81794, 118725, 178629, 271574, 271288, 329601, 336650],
  pc: [42058, 62984, 105167, 161438, 118284, 117919, 86368],
  pnc: [559, 552, 714, 993, 1688, 1782, 3432],
  prov: [4985, 6484, 11015, 17034, 11514, 9606, 12534],
  anticipos: [25655, 41205, 60092, 95155, 74426, 64388, 44284],
  pn: [39175, 55188, 72747, 109142, 151315, 209900, 246850],
  reservas: [38014, 53026, 70031, 105551, 146500, 206621, 252975],
  deuda: [0, 0, 10000, 5000, 0, 0, 0],
};
const historicoBalance = P.map((p, i) => ({
  periodo: p, activo_total: bal.at[i], activo_corriente: bal.ac[i], pasivo_corriente: bal.pc[i], pasivo_total: bal.pc[i] + bal.pnc[i],
  fondo_comercio: 0, intangibles: bal.intang[i], inmovilizado_material: bal.ppe[i], existencias: bal.exist[i], clientes: bal.cli[i],
  proveedores: bal.prov[i], activos_contrato: null, pasivos_contrato: bal.anticipos[i], caja: bal.caja[i], deuda_financiera: bal.deuda[i],
  arrendamientos: 0, patrimonio_neto: bal.pn[i], minoritarios: 0, reservas: bal.reservas[i],
}));

const fo = [16486, 10488, -3464, 40548, 33317, 77874, 48540];
const capex = [1178 + 621, 771 + 2868, 760 + 4605, 18752 + 1793, 2970 + 562, 2113 + 210, 1492 + 299];
const divs = [2796, 4238, 7846, 10551, 18127, 24531, 31131];
const recompras = [0, 0, 0, 0, 0, 0, 12003];
const historicoFlujos = P.map((p, i) => ({
  periodo: p, flujo_operativo: fo[i], capex: capex[i], pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0,
  dividendos: divs[i], recompras: recompras[i], emision_acciones: 0, intereses_en_financiacion: 0,
}));

// Trimestres FY2025 1T - FY2026 4T (Excel, hoja «Quarterly»). Crecimiento frente al mismo trimestre del año anterior.
const qP = ['1T25', '2T25', '3T25', '4T25', '1T26', '2T26', '3T26', '4T26'];
const qV = [36737, 92230, 39866, 82641, 54171, 74087, 41280, 60945];
const qPrev = [47305, 47684, 62213, 56303, 36737, 92230, 39866, 82641];
const qEbit = [15922, 47739, 15629, 43551, 26728, 36263, 15200, 27068];
const qAm = [965, 1083, 1300, 1327, 1199, 1121, 1157, 1196];
const qNeto = [8930, 34387, 9375, 31958, 19057, 26687, 11077, 20662];
const qAcc = [90.19, 90.19, 90.19, 90.19, 89.79, 89.79, 89.79, 89.79];
const r1 = (x) => Math.round(x * 10) / 10;
const items = qP.map((p, i) => ({
  periodo: p, ingresos: qV[i], crecimiento_pct: r1((qV[i] / qPrev[i] - 1) * 100), crecimiento_organico_pct: null,
  ebitda: qEbit[i] + qAm[i], margen_ebitda_pct: r1((qEbit[i] + qAm[i]) / qV[i] * 100),
  bpa: Math.round(qNeto[i] / qAcc[i] * 100) / 100, vs_consenso: null,
}));

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 230485, ebitda: 109933, ebit: 105259, beneficio_neto: 77485, bpa: 862.26, dpa: 329, dpa_extraordinario: 0, fcf: 48540 - 1791, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 42.572 M JPY en FY2020 a 230.485 M en FY2026, todo orgánico (sin compras; un único segmento) [1, 2]. El motor es la inspección de máscaras para litografía EUV: ACTIS (inspección actínica, con luz EUV de 13,5 nm) facturó 114.800 M en FY2025 y 70.500 M en FY2026, y MATRICS (inspección de máscaras con luz DUV, también para EUV) 50.600 M y 51.200 M [3, 5]. FY2026 cayó un 8,3 % en ventas y un 14,3 % en resultado de explotación porque reflejó los pedidos de FY2025, que se hundieron a 105.226 M por cancelaciones de ACTIS (pedidos netos de ACTIS: −10.500 M) [1, 3]. El margen bruto pasó del 50,3 % (FY2024) al 59,0 % (FY2025) y 59,2 % (FY2026) por la mezcla (ACTIS y servicios) y el yen débil [3, 5]; el margen de explotación bajó de 48,8 % a 45,7 % por la I+D (16.292 M, +39,5 %) y el aumento de plantilla (1.335 empleados, +172) [3]. Los servicios crecieron un 36,5 % hasta 58.646 M (25,4 % de las ventas): es la parte recurrente de la base instalada [1].',
    ajustes: 'Cifras publicadas en normas japonesas (J-GAAP), sin ajustes. No hay partidas extraordinarias desde FY2020: el beneficio antes de impuestos coincide con el resultado ordinario todos los años [1, 7-11]. El resultado no operativo es casi todo diferencias de cambio: +2.068 M en FY2026 y −3.676 M en FY2025 [1]. No se usa un BPA ajustado. La compañía estima que cada yen de depreciación frente al dólar suma 1.100 M de ventas y 1.000 M de resultado de explotación [5].',
    confianza: 'Alta',
  },
  trimestres: {
    items,
    ultima_presentacion: 'En la conferencia del 6-ago-2026 la dirección dio por cerrada la caída: pedidos de FY2026 de 237.504 M (+125,7 %), en la parte alta de la horquilla de 200.000-240.000 M que había dado en abril, y una previsión de pedidos para FY2027 de 300.000-400.000 M (punto medio 350.000 M), con MATRICS y ACTIS duplicando pedidos [3, 4]. El punto alto depende de que el ACTIS A200HiT (inspección actínica de alto rendimiento para fábricas de obleas) supere la evaluación en las fábricas de los clientes, que aún no había empezado; según el consejero delegado, como pronto en el segundo semestre del ejercicio [4]. Los analistas preguntaron sobre todo por tres cosas: el reparto de pedidos entre talleres de máscaras y fábricas, el plazo de la evaluación del A200HiT y por qué el margen de explotación previsto baja al 43,1 % si crece ACTIS; la respuesta fue la mezcla (las ventas de FY2027 vienen de pedidos de hace más de un año, cuando ACTIS tuvo pedidos negativos) y más I+D (más de 20.000 M) [4]. En la de abril (3T) ya había subido la previsión de pedidos de 170.000-220.000 M a 200.000-240.000 M y dijo que algunos clientes que habían cancelado volvían a pedir [12]. La dirección no dio cifras trimestrales de pedidos (las dejó de publicar en FY2025) ni nombres de clientes, y evitó cuantificar el efecto del A200HiT («50.000 M no es una cifra determinada») [4, 12].',
    confianza: 'Alta',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: [],
    liquidez: 'Caja y depósitos de 91.503 M JPY a 30-jun-2026, sin deuda financiera ni gastos por intereses en FY2026 [1].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Sin deuda financiera desde FY2024 (los préstamos a corto de 10.000 M en FY2022 y 5.000 M en FY2023 se devolvieron) [1, 8, 9]. El pasivo relevante son los anticipos de clientes: 44.284 M a 30-jun-2026, frente a 95.155 M en el pico de FY2023 [2]; se compensan con entregas (no se devuelven en caja), por eso van al circulante y no al puente. Ingresos diferidos de servicios: 7.794 M [1]. Impuestos a pagar 12.767 M. Provisión para pagos en acciones 2.467 M [1]. El dividendo final de FY2026 (197 JPY por acción, 17.657 M) se pagó el 28-sep-2026, después del balance [1]. Arrendamientos: en J-GAAP solo figuran 136 M de activos arrendados; los alquileres van en gastos.',
    comentario: 'El circulante es la clave del balance. Las existencias (casi todo producto en curso: equipos fabricados que esperan la aceptación del cliente) fueron de 167.791 M en FY2026, el 72,8 % de las ventas, y los anticipos cayeron de 95.155 M (FY2023) a 44.284 M [2]. Resultado: el circulante comercial neto (existencias + clientes − proveedores − anticipos) pasó del 40 % de las ventas en FY2023 al 60 % en FY2026. Es lo que hay que vigilar: en un ciclo con pedidos que se cancelan, el producto en curso puede quedarse sin cliente. La compañía explica que el equipo se monta en casa del cliente y se cuenta como producto en curso hasta su aceptación [19].',
    confianza: 'Alta',
  },
  flujos: {
    historico: historicoFlujos,
    comentario: 'La conversión del beneficio en caja es irregular porque depende de los anticipos y del producto en curso: flujo operativo negativo en FY2022 (−3.464 M con un beneficio de 24.850 M) mientras el producto en curso se doblaba, y 77.874 M en FY2025 (92 % del beneficio) [2]. En FY2026 bajó a 48.540 M por 43.451 M de impuestos pagados y 21.120 M de anticipos consumidos [1]. La inversión es pequeña: 1.791 M de inmovilizado en FY2026 (0,8 % de las ventas); el pico de FY2023 (20.545 M) fue la compra de terrenos y edificios en Shin-Yokohama para el «Lasertec Innovation Park» [2, 9]. Para FY2027 la compañía prevé 5.700 M de inversión y 3.600 M de amortización [3]. Casi todo el capex es de crecimiento o de instalaciones; el de mantenimiento es inferior a la amortización (estimación propia).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Japan LLC', anios_auditor: null, opinion: 'Sin salvedades conocidas (el informe de auditoría del yuho solo se publica en japonés)',
    comentario: 'En junio de 2024 el bajista Scorpion Capital acusó a Lasertec de inflar ventas y existencias [18]. La compañía respondió que el producto en curso se mantiene hasta que el cliente acepta el equipo montado en su fábrica y que su contabilidad es correcta [19]. Ningún regulador ha actuado desde entonces y las cuentas posteriores no se han reexpresado [1, 7]. La señal que sí está en las cuentas es la proporción de existencias (72,8 % de las ventas en FY2026) y la caída de anticipos: si un cliente cancela tras fabricarse el equipo, el ajuste llegaría por deterioro de existencias. No hay capitalización de I+D (16.292 M a gasto) ni fondo de comercio. Los pagos en acciones son pequeños (provisión de 2.467 M) [1]. Ver Altman, Piotroski y Beneish en la tabla.',
    senales: [
      { senal: 'Existencias del 72,8 % de las ventas y anticipos a la baja', nivel: 'Media', comentario: 'Producto en curso de 122.449 M y anticipos de 44.284 M en FY2026, frente a 131.056 M y 95.155 M en FY2023 [2].' },
      { senal: 'Acusación de un bajista en 2024', nivel: 'Baja', comentario: 'Scorpion Capital (jun-2024); sin actuación del regulador ni reexpresión posterior [18, 19].' },
      { senal: 'Concentración de clientes', nivel: 'Media', comentario: 'TSMC, Intel y Samsung suman el 62,3 % de las ventas de FY2026 (79,5 % en FY2025) [6].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'La política es un pago del 35 % del beneficio consolidado (desde FY2015), flexible según resultados [1, 3]. FY2026 pagó 329 JPY por acción (38,1 % del beneficio) y la previsión de FY2027 es de 351 JPY (35 %) [1]. En agosto de 2025 aprobó su primera recompra relevante, de hasta 12.000 M o un millón de acciones, terminada en diciembre con 560.600 acciones por 11.998 M [16, 17]; dijo que podría usar las acciones propias para compras. La prioridad declarada es el circulante y la inversión a medio plazo [16].',
    adquisiciones: [],
    comentario: 'Asignación de capital sencilla: sin compras en diez años, inversión en inmovilizado baja y dividendo del 35 %. Entre FY2020 y FY2026 se generaron 223.789 M de flujo operativo, se invirtieron 38.993 M y se repartieron 99.220 M en dividendos y 12.003 M en recompras; la caja pasó de 24.723 M a 91.503 M [2]. La única decisión discutible es dejar crecer la caja en un negocio cíclico: es prudente (un año malo de pedidos consume circulante, como en FY2022), pero baja el ROE. La recompra de 2025 se hizo a 21.400 JPY de media (11.998 M / 560.600 acciones), por debajo del precio actual [17].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Equipos para semiconductores', descripcion: 'Inspección de máscaras (ACTIS, MATRICS; <80 % en FY2026), de sustratos de máscara (ABICS, MAGICS; <15 %) y de obleas (>5 %).', tipo_resultado: null, historico: P.map((p, i) => ({ periodo: p, ingresos: [34372, 58401, 75971, 130730, 181752, 202965, 168090][i], resultado: null })) },
      { nombre: 'Otros equipos', descripcion: 'Inspección de máscaras para pantallas planas, microscopios y equipos para baterías.', tipo_resultado: null, historico: P.map((p, i) => ({ periodo: p, ingresos: [2150, 3638, 1983, 3179, 2783, 5552, 3747][i], resultado: null })) },
      { nombre: 'Servicios', descripcion: 'Mantenimiento, piezas y mejoras de la base instalada.', tipo_resultado: null, historico: P.map((p, i) => ({ periodo: p, ingresos: [6049, 8208, 12423, 18922, 28970, 42959, 58646][i], resultado: null })) },
    ],
    geografias: [
      { nombre: 'Corea', peso_pct: 28.7 }, { nombre: 'EE. UU.', peso_pct: 22.4 }, { nombre: 'Taiwán', peso_pct: 19.9 },
      { nombre: 'Otros de Asia (incl. China)', peso_pct: 13.5 }, { nombre: 'Japón', peso_pct: 12.2 }, { nombre: 'Europa', peso_pct: 3.3 },
    ],
    geografias_criterio: 'destino',
    clientes: 'La concentración es extrema: TSMC (21,4 %), Intel (20,7 %) y Samsung (20,2 %) sumaron el 62,3 % de las ventas de FY2026; en FY2025, el 79,5 %, con Intel en el 33,3 % [6]. Son los tres fabricantes con litografía EUV en lógica avanzada, más los talleres de máscaras (propios de esos fabricantes o independientes) [3]. Las ventas por destino de FY2026: Corea 66.075 M, EE. UU. 51.610 M, Taiwán 45.854 M [1]. No hay contratos plurianuales: se trabaja por pedido, con anticipos y un plazo de alrededor de un año entre pedido y venta [4]. El poder de precios se ve en el margen bruto, del 59,2 % en FY2026, y en que la compañía dice haber trasladado a precios la subida de materiales y memorias [3, 5]. En FY2025 un cliente canceló pedidos de ACTIS (pedidos netos de −10.500 M) [3, 12].',
    kpis: [
      { kpi: 'Pedidos (M JPY)', valor_anterior: '105.226', valor_actual: '237.504', variacion: '+125,7 %', comentario: 'Previsión FY2027: 300.000-400.000 M [1, 3].' },
      { kpi: 'Cartera de pedidos (M JPY)', valor_anterior: '315.945', valor_actual: '322.964', variacion: '+2,2 %', comentario: 'Unos 1,4 años de ventas; incluye 17.400 M de efecto divisa [1, 3].' },
      { kpi: 'Ventas de ACTIS (M JPY)', valor_anterior: '114.800', valor_actual: '70.500', variacion: '−38,6 %', comentario: 'Inspección actínica; 30,6 % de las ventas [3, 5].' },
      { kpi: 'Pedidos de ACTIS (M JPY)', valor_anterior: '−10.500', valor_actual: '62.000', variacion: 'n. s.', comentario: 'FY2025 negativo por cancelaciones [3].' },
      { kpi: 'Pedidos de MATRICS (M JPY)', valor_anterior: '45.300', valor_actual: '77.200', variacion: '+70,4 %', comentario: 'Nodos de 2-3 nm y China (DUV) [3, 4].' },
      { kpi: 'Ventas de servicios (M JPY)', valor_anterior: '42.959', valor_actual: '58.646', variacion: '+36,5 %', comentario: 'Récord trimestral de 16.582 M en el 4T [2].' },
      { kpi: 'I+D (M JPY)', valor_anterior: '11.677', valor_actual: '16.292', variacion: '+39,5 %', comentario: '7,1 % de las ventas; más de 20.000 M previstos en FY2027 [3].' },
      { kpi: 'Empleados', valor_anterior: '1.163', valor_actual: '1.335', variacion: '+14,8 %', comentario: 'Previsión de 1.542 en FY2027 [3].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) yuho FY2026 en inglés (traducción parcial, sin la sección de auditoría); 2) yuho en japonés (PDF sin texto extraíble: fuentes CJK no incrustadas); 3) informe de gobierno de 2026 (solo nombra a PwC Japan)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) tanshin FY2026: sin deuda financiera; 2) balance FY2024-FY2026: deuda 0; 3) no aplica', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Integrated Report 2025 (estrategia, tecnología, materialidad, clima)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-02-19', url: `${E}/ir_material_for_fiscal_ym16/199172/00.pdf` },
  { id: 2, titulo: 'Milestones (historia de la compañía)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.lasertec.co.jp/en/company/history.html' },
  { id: 3, titulo: 'EUV Mask-related Inspection Systems', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.lasertec.co.jp/en/ir/individuals/euv.html' },
  { id: 4, titulo: 'Securities Report FY2026 (traducción parcial): riesgos, clientes principales', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-10-15', url: `${E}/ir_material_for_fiscal_ym14/214098/00.pdf` },
  { id: 5, titulo: 'Presentation Material - Fiscal Year ended June 2026 Financial Results', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym5/209787/00.pdf` },
  { id: 6, titulo: 'Financial Results Briefing for the Fiscal Year Ended June 2026 (guion con preguntas y respuestas)', editor: 'Lasertec Corporation / SCRIPTS Asia', tipo: 'Primaria', fecha: '2026-08-10', url: `${E}/ir_material_for_fiscal_ym5/210010/00.pdf` },
  { id: 7, titulo: 'Fiscal Year Ended June 2026 - 1on1 FAQ', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym9/209783/00.pdf` },
  { id: 8, titulo: 'Photomask Inspection Systems Market Research Report 2034', editor: 'Market Intelo', tipo: 'Sectorial', fecha: '2026-06-10', url: 'https://marketintelo.com/report/photomask-inspection-systems-market' },
  { id: 9, titulo: 'Photomask Inspection System Market', editor: 'DataHorizzon Research', tipo: 'Sectorial', fecha: '2026-07-15', url: 'https://datahorizzonresearch.com/photomask-inspection-system-market-76262' },
  { id: 10, titulo: 'KLA Corporation, Form 10-K del ejercicio 2026 (cerrado el 30-jun-2026)', editor: 'KLA Corporation (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/319201/000031920126000027/klac-20260630.htm' },
  { id: 11, titulo: 'Presentation Material - Third Quarter of Fiscal Year Ending June 2026 (guion con preguntas y respuestas)', editor: 'Lasertec Corporation / SCRIPTS Asia', tipo: 'Primaria', fecha: '2026-05-01', url: `${E}/ir_material_for_fiscal_ym5/202349/00.pdf` },
  { id: 12, titulo: 'Lasertec Releases ACTIS A200HiT Series Actinic EUV Patterned Mask Inspection System', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-10-31', url: `${E}/tdnet/2705318/00.pdf` },
  { id: 13, titulo: 'Financial Highlights [Excel] (regiones y plantilla)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym9/209785/00.xlsx` },
  { id: 14, titulo: 'Lasertec fell sharply after ASML shares declined on news that China has begun manufacturing DUV lithography systems', editor: 'Moomoo', tipo: 'Prensa', fecha: '2026-07-27', url: 'https://www.moomoo.com/news' },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Fundada en 1960 en Tokio como fabricante de equipos de rayos X para televisión (NJS Corporation), lanzó en 1975-1976 el primer sistema del mundo de inspección de máscaras para circuitos integrados y en 1986 adoptó el nombre de Lasertec [2]. Cotiza desde 1990 en el mercado no oficial de Japón (código 6920), en JASDAQ desde 2004 y en la primera sección de Tokio desde 2013 [2]. Su transformación llegó con la litografía EUV: en 2017 lanzó el primer equipo del mundo de inspección de sustratos de máscara EUV con luz EUV (ABICS E120) y en 2019 el primero de inspección actínica de máscaras con patrón (ACTIS A150) [2]. Las ventas se multiplicaron por ocho entre FY2019 y FY2025 [13]. Osamu Okabayashi presidió la compañía de 2009 a 2024; desde julio de 2024 la dirige Tetsuya Sendoda, que viene de ventas y tecnología de inspección de máscaras [2].',
    hitos: [
      { anio: '1960', hito: 'Fundación de la compañía (equipos de rayos X para televisión) [2].' },
      { anio: '1976', hito: 'Primer sistema del mundo de inspección de máscaras para circuitos integrados (1MD1) [2].' },
      { anio: '1986', hito: 'Cambio de nombre a Lasertec y filial en EE. UU. [2].' },
      { anio: '2006', hito: 'Serie MATRICS de inspección de máscaras; ventas de 10.000 M JPY [2].' },
      { anio: '2013', hito: 'Primera sección de la Bolsa de Tokio [2].' },
      { anio: '2017', hito: 'ABICS E120: primera inspección de sustratos de máscara EUV con luz EUV [2].' },
      { anio: '2019', hito: 'ACTIS A150: primera inspección actínica de máscaras EUV con patrón [2].' },
      { anio: '2022', hito: 'Compra de terrenos en Shin-Yokohama para el Lasertec Innovation Park [2].' },
      { anio: '2024', hito: 'Tetsuya Sendoda, consejero delegado; acusación del bajista Scorpion Capital [2].' },
      { anio: '2025', hito: 'Cancelaciones de pedidos de ACTIS (pedidos netos negativos) y lanzamiento del ACTIS A200HiT para fábricas [5, 12].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Lasertec diseña y fabrica equipos de inspección óptica para semiconductores. Su producto clave son los sistemas de inspección de máscaras (fotomáscaras: la plantilla que la litografía copia en la oblea) para litografía EUV: ACTIS, que inspecciona con la misma luz EUV de 13,5 nm de la exposición y es el único de su clase en el mercado, y MATRICS, que usa luz DUV [3, 7]. Completan la oferta la inspección de sustratos de máscara (ABICS para EUV, MAGICS) y de obleas, y un negocio pequeño de pantallas planas, microscopios y baterías [7]. Los clientes son los talleres de máscaras (de los fabricantes de chips o independientes) y, cada vez más, las fábricas de obleas, que inspeccionan las máscaras durante su uso [5]. Diseña y monta en Yokohama, con proveedores externos para la óptica y la fuente de luz, y da servicio desde filiales en EE. UU., Corea, Taiwán, China y Singapur [4].',
    como_gana_dinero: 'Vende equipos de precio muy alto y pocos clientes, con anticipos y un plazo de alrededor de un año entre pedido y entrega; la venta se reconoce cuando el cliente acepta el equipo instalado [6]. El margen bruto (59,2 % en FY2026) depende de la mezcla: ACTIS, sin competencia, deja más que MATRICS [6]. Los servicios (25,4 % de las ventas, 58.646 M) crecen con la base instalada y son la parte recurrente [7]. La estructura es ligera: con un 45,7 % de margen de explotación, cada 1.000 M de ventas adicionales llegan casi enteros al beneficio, y la I+D (7,1 % de las ventas) es el gasto que más crece [5]. No hay estacionalidad, pero sí ciclos fuertes de pedidos ligados a la inversión en litografía EUV y a la entrada de nodos nuevos (2 nm, 1,4 nm) [5, 6]. Factura sobre todo en yenes; el yen débil suma (1.000 M de resultado por yen) [7].',
  },
  sector: {
    definicion: 'El mercado relevante es la inspección de fotomáscaras (con patrón y sin él), un nicho del control de procesos de semiconductores. Market Intelo lo estima en 1.800 M USD en 2025 con un crecimiento anual del 7,2 % hasta 2034 [8]; DataHorizzon da 4.800 M USD, pero su perímetro es más amplio y su lista de empresas no incluye a Lasertec (incluye una farmacéutica), así que no se usa [9]. Se toma Market Intelo. Encaja con las ventas de Lasertec: su inspección de máscaras facturó en torno a 134.000 M JPY en FY2026 (menos del 80 % de 168.090 M), unos 900 M USD, alrededor de la mitad del mercado [7, 8]. KLA, el otro gran proveedor, no publica sus ventas de inspección de máscaras por separado [10].',
    tamano: '≈ 1.800 M USD en 2025 (≈ 270.000 M JPY a 150 JPY/USD) [8]',
    unidad_serie: 'millones de USD',
    serie: [ { anio: '2019', tamano: 1200 }, { anio: '2022', tamano: 1500 }, { anio: '2025', tamano: 1800 }, { anio: '2030e', tamano: 2550 }, { anio: '2034e', tamano: 3400 } ],
    tcac_historico_pct: 6.0, tcac_previsto_pct: 7.2, cr5_pct: 95, estructura: 'Concentrada',
    drivers: [
      { driver: 'Capas EUV por chip y nodos de 2 nm y 1,4 nm', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de MATRICS +70 % en FY2026 por la expansión de 2-3 nm; la tecnología de 1,4 nm está en desarrollo [5, 6].' },
      { driver: 'Inspección de máscaras en la fábrica (A200HiT)', efecto: '+', horizonte: 'Estructural', evidencia: 'La dirección espera que todas las fábricas de lógica adopten el A200HiT; evaluación en clientes desde el segundo semestre de FY2027 [6].' },
      { driver: 'Memoria DRAM y HBM con EUV', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de A300 de talleres de máscaras de DRAM y consultas de fábricas de DRAM [6].' },
      { driver: 'Ciclo de inversión de los tres grandes clientes', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Pedidos de 323.762 M (FY2022) → 105.226 M (FY2025) → 237.504 M (FY2026) [13].' },
      { driver: 'Restricciones de exportación a China', efecto: '−', horizonte: 'Estructural', evidencia: 'No puede vender equipos EUV en China; vende MATRICS para DUV, con demanda casi doble en FY2027 [6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'En inspección actínica no hay competidor comercial; en DUV compite con KLA y NuFlare [3, 6].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Tres clientes suman el 62,3 % de las ventas y pueden cancelar pedidos, como en FY2025 [4, 5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Fuentes de luz y óptica especiales, difíciles de sustituir (riesgo declarado en el yuho) [4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Diez años de desarrollo de la inspección actínica; KLA defiende la vía DUV y de haz de electrones [6].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Inspección DUV o por haz de electrones de los rivales y cambios de película protectora (pellicle) que pueden ayudar o restar [6].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Los pedidos tocaron fondo en FY2025 (105.226 M) y se recuperaron en FY2026 (237.504 M), con una previsión de 300.000-400.000 M para FY2027 [5, 13]. La inversión en lógica y memoria crece por la IA [5]. Lasertec no estaba en el tamaño actual en 2008-2009; en la caída de 2022-2023 de la memoria sus pedidos siguieron altos por la EUV, y la caída llegó en FY2024-FY2025 con cancelaciones de un cliente [13, 11].' },
    regulacion: 'Las restricciones de exportación de EE. UU., Japón y los Países Bajos impiden vender equipos para EUV en China; Lasertec vende allí inspección DUV (MATRICS) y la dirección espera casi duplicar esas ventas en FY2027 [6]. «Otros de Asia», que incluye China, fue el 13,5 % de las ventas de FY2026 [13]. Un endurecimiento de los controles a la inspección DUV restaría parte de ese crecimiento.',
    tendencias: 'Tres tendencias favorecen a Lasertec: más capas EUV por chip y máscaras más complejas (curvilíneas) que la inspección DUV no resuelve bien; la inspección en las fábricas de obleas con equipos de alto rendimiento (A200HiT); y la EUV en la DRAM y la HBM [6]. La que más preocupa es la película protectora de la máscara: si es de un material que solo deja pasar la luz EUV, favorece a ACTIS; la decisión no está tomada [6]. En julio de 2026 la noticia de que China fabrica escáneres DUV castigó a ASML y a Lasertec [14].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 50, posicion: '≈ 50 % de la inspección de máscaras (estimación propia: ≈ 900 M USD de ventas de Lasertec frente a un mercado de 1.800 M USD); único proveedor comercial de inspección actínica de máscaras EUV con patrón [3, 7, 8]',
    competidores: [
      { nombre: 'KLA', pais: 'EE. UU.', ticker: 'KLAC', ingresos: 2148000, cuota_pct: null, margen_ebit_pct: 41.7, comentario: 'Líder del control de procesos; inspección de máscaras con luz DUV (Teron) y haz de electrones; ingresos del grupo FY2026 13.580 M USD convertidos a 158,18 JPY/USD [10].' },
      { nombre: 'NuFlare Technology (Toshiba)', pais: 'Japón', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inspección de máscaras DUV y escritura de máscaras por haz de electrones; filial no cotizada [8].' },
      { nombre: 'Applied Materials', pais: 'EE. UU.', ticker: 'AMAT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inspección de máscaras (Aera) y por haz de electrones; nicho dentro de un grupo de equipos [8].' },
      { nombre: 'Carl Zeiss SMT', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Revisión de imagen aérea (AIMS EUV): complemento de la inspección, no sustituto [8].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Los procesos de los clientes se califican con sus equipos y recetas; la evaluación del A200HiT dura más de seis meses [6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Única inspección actínica comercial desde 2019; márgenes brutos del 59 % [2, 5].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación ligera con proveedores externos; sin ventaja de escala frente a KLA.' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado de unos 1.800 M USD: no caben muchos proveedores con diez años de I+D [8].' },
      ],
    },
    amenazas: 'Tres amenazas. Que la inspección DUV y por haz de electrones de KLA baste para los nodos que vienen (KLA lo defendió; según un analista en la conferencia de agosto, ese discurso ha perdido apoyo) [6]. Que los clientes reduzcan capas EUV o retrasen nodos, como en las cancelaciones de FY2025 [5]. Y que Intel, que fue el 33,3 % de las ventas de FY2025, recorte inversión [4]. Probabilidad de erosión del foso en cinco años: baja; de un año malo de pedidos: alta.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'competidores.ingresos (NuFlare, AMAT, Zeiss en inspección de máscaras)', tipo: 'Complemento', intentos: '1) informes anuales de los rivales: no separan la inspección de máscaras; 2) estudios de mercado (Market Intelo, DataHorizzon): sin cuotas por empresa; 3) KLA 10-K: no separa las máscaras', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe integrado 2025: sin calificaciones de agencias; 2) yuho y ESG Data Book (no descargado); 3) búsqueda MSCI/Sustainalytics en el informe integrado: sin resultados', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Notice of the 64th Ordinary General Meeting of Shareholders (candidatos al consejo, trayectorias, acciones)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-27', url: `${E}/ir_material10/284698/00.pdf` },
  { id: 2, titulo: 'Extraordinary Report: resultados de las votaciones de la 64.ª junta (25-sep-2026)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-09-28', url: `${E}/ir_material6/286373/00.pdf` },
  { id: 3, titulo: 'Corporate Governance Report (accionistas, consejo, remuneración)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-09-28', url: `${E}/tdnet/2887814/00.pdf` },
  { id: 4, titulo: 'Announcement of Changes to Members of the Board', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/tdnet/2865492/00.pdf` },
  { id: 5, titulo: 'Announcement of Organizational Changes and Executive Officer Appointments', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-09-25', url: `${E}/tdnet/2887640/00.pdf` },
  { id: 6, titulo: 'Revised Forecast of Consolidated Financial Results for FY2026 (guía de agosto de 2025 y revisión)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-01-30', url: `${E}/tdnet/2747189/00.pdf` },
  { id: 7, titulo: 'Financial Highlights [Excel] (resultados anuales)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym9/209785/00.xlsx` },
  { id: 8, titulo: 'Presentation Material - FY2026 Financial Results (guía de FY2026 y FY2027)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym5/209787/00.pdf` },
  { id: 9, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2025 (guía FY2026 inicial)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-08-07', url: `${E}/ir_material_for_fiscal_ym7/184432/00.pdf` },
  { id: 10, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2024 (guía FY2025 inicial)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2024-08-07', url: `${E}/ir_material_for_fiscal_ym7/161105/00.pdf` },
  { id: 11, titulo: 'Notice Regarding the Status and Completion of Share Buyback', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2025-12-16', url: `${E}/tdnet/2731992/00.pdf` },
  { id: 12, titulo: 'Notice of Resolutions Adopted at the 64th Ordinary General Meeting of Shareholders', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-09-28', url: `${E}/ir_material6/286398/00.pdf` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Tetsuya Sendoda', cargo: 'Consejero delegado (Representative Director, President & CEO)', desde: '2024', participacion_pct: 0.01, trayectoria: 'Ingeniero de la casa desde 2008, especialista en inspección de máscaras; dirigió ventas antes de ser consejero delegado en julio de 2024 [1]. En su mandato los pedidos cayeron a 105.226 M (FY2025) y se recuperaron a 237.504 M (FY2026) [7].' },
      { nombre: 'Osamu Okabayashi', cargo: 'Presidente ejecutivo (Director, Chairman & Executive Officer)', desde: '2009', participacion_pct: 0.10, trayectoria: 'Presidente de 2009 a 2024, periodo en que las ventas pasaron de menos de 10.000 M a 213.506 M y llegó la serie ACTIS [1, 7]. Desde 2024 lleva planificación y cumplimiento.' },
      { nombre: 'Haruhiko Kusunose', cargo: 'Vicepresidente ejecutivo (Director, Vice Chairman & Executive Officer)', desde: '2001', participacion_pct: 0.09, trayectoria: 'Director técnico desde 2009; responsable de desarrollo avanzado, personal y producción [1].' },
      { nombre: 'Hisashi Yokokawa', cargo: 'Director financiero (Executive Officer, CFO)', desde: null, participacion_pct: null, trayectoria: 'Director financiero y de planificación; presenta los resultados [5, 8].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Ventas 200.000 M y resultado de explotación 85.000 M (ago-2025); subida a 220.000 M y 100.000 M (ene-2026) [6]', real: 'Ventas 230.485 M; resultado de explotación 105.259 M [7]', cumplida: 'Sí' },
      { anio: 'FY2026 (pedidos)', guia: 'Pedidos de 170.000-220.000 M; subida a 200.000-240.000 M en abril [8]', real: '237.504 M [8]', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Guía inicial de ventas 250.000 M y resultado de explotación 103.000 M (ago-2024) [10]', real: 'Ventas 251.477 M; resultado de explotación 122.843 M [9]', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y técnico: los tres consejeros ejecutivos llevan entre 18 y 31 años en la casa [1]. La sucesión de 2024 fue ordenada: Okabayashi pasó a presidente ejecutivo y Sendoda, de 47 años, a consejero delegado [1]. La guía se cumple o se supera con prudencia; el riesgo de credibilidad está en las previsiones de pedidos, que dependen de pocos clientes. En agosto de 2026 dejó el consejo Atsushi Tajima (consejero ejecutivo) sin motivo publicado, y en septiembre se suprimieron las divisiones de ventas y tecnología para decidir más rápido [4, 5].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Tetsuya Sendoda', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Osamu Okabayashi', cargo: 'Presidente ejecutivo (Chairman & Executive Officer)', tipo: 'Ejecutivo', desde: '2003', comisiones: '—' },
      { nombre: 'Haruhiko Kusunose', cargo: 'Vicepresidente ejecutivo', tipo: 'Ejecutivo', desde: '2001', comisiones: '—' },
      { nombre: 'Koji Mihara', cargo: 'Consejero externo (catedrático, Universidad de Waseda)', tipo: 'Independiente', desde: '2020', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Yoshiko Iwata', cargo: 'Consejera externa (J-Eurus IR; consejera de SMC)', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Miyuki Ishiguro', cargo: 'Consejera externa (abogada, Nagashima Ohno & Tsunematsu; consejera de Nomura)', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Takashi Yuri', cargo: 'Consejero externo (ex consejero delegado de TechMatrix)', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y retribuciones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 98.15, voto_remuneracion_contra_pct: 1.32, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: 98.57,
    remuneracion_ceo: null,
    remuneracion: 'Tres partes: fijo mensual, variable anual y acciones restringidas (RS y RSU) [3]. El variable se calcula con una fórmula ligada al beneficio neto, multiplicada por un coeficiente individual de 0 a 2 salvo para presidente, vicepresidente y consejero delegado; la junta de 2026 aprobó 818 M JPY de variable para los cuatro consejeros ejecutivos de FY2026 [2, 3]. Las acciones restringidas tienen un tope de 300 M JPY y 30.000 acciones al año y pueden recortarse o anularse por mala conducta (cláusula de reducción) [3]. No hay métrica de ROIC, flujo de caja ni rentabilidad para el accionista: premia el beneficio del año, que en un negocio cíclico paga los picos. Solo se publica la remuneración individual de quien supera 100 M JPY, en el yuho en japonés [3]. La junta aprobó la revisión del plan de RSU con un 98,15 % a favor [2].',
    accionistas: [
      { nombre: 'The Master Trust Bank of Japan (cuenta fiduciaria)', pct: 20.59, tipo: 'Custodio (fondos nacionales)', variacion: 'n. d.' },
      { nombre: 'Custody Bank of Japan (cuenta fiduciaria)', pct: 6.92, tipo: 'Custodio (fondos nacionales)', variacion: 'n. d.' },
      { nombre: 'State Street Bank and Trust Company 505001', pct: 3.58, tipo: 'Custodio (extranjeros)', variacion: 'n. d.' },
      { nombre: 'Hiroshi Uchiyama', pct: 3.13, tipo: 'Familia fundadora', variacion: 'n. d.' },
      { nombre: 'Setsuko Maeda', pct: 3.05, tipo: 'Particular', variacion: 'n. d.' },
      { nombre: 'Uchiyama Holdings', pct: 1.64, tipo: 'Familia fundadora', variacion: 'n. d.' },
      { nombre: 'Haruka Takahashi', pct: 1.60, tipo: 'Particular', variacion: 'n. d.' },
      { nombre: 'Autocartera', pct: 4.94, tipo: 'Autocartera (4.655.734 acciones sobre 94.286.400 emitidas)', variacion: '+559.692 acciones en FY2026 por la recompra' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control ni sociedad matriz: el mayor accionista directo es un custodio de fondos (20,59 %) y la familia Uchiyama suma en torno al 4,8 % entre persona física y sociedad [3]. Una acción, un voto; sin medidas antiopa declaradas en el informe de gobierno [3]. Mandato de un año para los consejeros [3]. Sin participaciones cruzadas relevantes [3]. El consejo lo preside un consejero externo y cuatro de siete son independientes [3]. Es una sociedad con consejo de auditoría (Audit & Supervisory Board) de tres miembros, dos externos [3].',
    alertas: [
      'Salida del consejero ejecutivo Atsushi Tajima en septiembre de 2026, sin motivo publicado [4].',
      'Remuneración variable ligada solo al beneficio neto del año [3].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo', tipo: 'Complemento', intentos: '1) yuho FY2026 en inglés: la sección de remuneración no está traducida; 2) yuho en japonés: PDF sin texto extraíble; 3) informe de gobierno y convocatoria: solo el variable agregado (818 M JPY para cuatro consejeros)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Japón no tiene registro público de operaciones de directivos; 2) informes de grandes participaciones (EDINET): ninguno de directivos; 3) convocatoria: acciones de cada consejero (10.610 Sendoda, 87.180 Okabayashi, 83.530 Kusunose)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (6920.T, 1305.T, 1625.T) hasta el 19-oct-2026 (bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/6920.T/history' },
  { id: 2, titulo: 'Lasertec Corporation: Financial Data Forecasts Estimates and Expectations', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/LASERTEC-CORPORATION-11551536/finances/' },
  { id: 3, titulo: 'Lasertec Corporation: Target Price Consensus and Analysts Recommendations', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/LASERTEC-CORPORATION-11551536/consensus/' },
  { id: 4, titulo: 'Lasertec (TYO:6920) Stock Forecast & Price Target (S&P Global)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/tyo/6920/forecast/' },
  { id: 5, titulo: 'Interest Rate (JGB), jgbcme.csv: bono a 10 años del 16-oct-2026, 2,958 %', editor: 'Ministerio de Hacienda de Japón', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.mof.go.jp/english/policy/jgbs/reference/interest_rate/jgbcme.csv' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 de octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Consolidated Financial Results for the Year Ended June 30, 2026 (acciones, autocartera, caja, dividendo final)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym7/209786/00.pdf` },
  { id: 8, titulo: 'Comparables del análisis de Advantest (Stock Analysis, 15-oct-2026; repositorio, informes/advantest-2026-10-15/notas/D.json)', editor: 'Stock Analysis vía análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/' },
  { id: 9, titulo: 'Comparables del análisis de KLA (Stock Analysis, 14-oct-2026; repositorio, informes/kla-2026-10-15/notas/D.json)', editor: 'Stock Analysis vía análisis propio', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/' },
  { id: 10, titulo: 'Yahoo Finance, cierres del 14 al 19-oct-2026 de 8035.T, 6146.T, KLAC, LRCX, ASML, TER, ONTO, NVMI y USD/JPY', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 11, titulo: 'Macquarie keeps JPY 36,000 target for Lasertec stock', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-10-17', url: 'https://www.ad-hoc-news.de/' },
  { id: 12, titulo: 'Goldman Sachs sets JPY 70,000 target for Lasertec stock', editor: 'AD HOC NEWS / Moomoo', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.ad-hoc-news.de/' },
  { id: 13, titulo: 'Why is Lasertec stock tumbling today?', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-08-07', url: 'https://www.investing.com/news/stock-market-news' },
  { id: 14, titulo: 'Lasertec Shares Drop After Outlook Misses Market Expectations', editor: 'Bloomberg', tipo: 'Prensa', fecha: '2026-02-01', url: 'https://www.bloomberg.com/news/articles/2026-02-01' },
  { id: 15, titulo: 'Lasertec fell sharply after ASML shares declined on news that China has begun manufacturing DUV lithography systems', editor: 'Moomoo', tipo: 'Prensa', fecha: '2026-07-27', url: 'https://www.moomoo.com/news' },
  { id: 16, titulo: 'Lasertec Target Price Raised to ¥70,000 by Major U.S. Securities Firm', editor: 'BigGo Finance', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://finance.biggo.com/' },
  { id: 17, titulo: 'Japan Morning Connection: Intel\'s Upsized Share Offering May Lift Suppliers Lasertec, Screen and TOK', editor: 'Smartkarma', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.smartkarma.com/' },
  { id: 18, titulo: 'IR Calendar / anuncio de resultados del 1T FY2027 el 30-oct-2026 (feed de eir-parts)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.lasertec.co.jp/en/ir/calendar.html' },
  { id: 19, titulo: 'Fact Sheet 2026 (cotización al cierre de cada ejercicio)', editor: 'Lasertec Corporation', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/ir_material_for_fiscal_ym6/209869/00.pdf` },
];

// Comparables: cifras de las notas D de Advantest (15-oct, a media sesión de EE. UU.) y de KLA (cierre del 14-oct),
// llevadas al cierre del 16-oct (EE. UU.) y del 19-oct (Japón) con la variación del precio (capitalización, EV/ventas,
// EV/EBITDA y PER escalan con el precio; la rentabilidad por FCF, a la inversa) y a JPY con 158,14 JPY/USD.
const esc = (c, f, fx = 1) => ({ ...c, capitalizacion: Math.round(c.capitalizacion * f * fx), ev_ventas: c.ev_ventas == null ? null : Math.round(c.ev_ventas * f * 100) / 100, ev_ebitda_ltm: c.ev_ebitda_ltm == null ? null : Math.round(c.ev_ebitda_ltm * f * 10) / 10, per_ntm: c.per_ntm == null ? null : Math.round(c.per_ntm * f * 10) / 10, fcf_yield_pct: c.fcf_yield_pct == null ? null : Math.round(c.fcf_yield_pct / f * 100) / 100 });
const fxAdv = 158.14 / 157.96;
const comparables = [
  esc({ nombre: 'Tokyo Electron', ticker: '8035', pais: 'JP', capitalizacion: 23560000, ev_ventas: 8.82, ev_ebitda_ltm: 29.64, ev_ebitda_ntm: null, per_ntm: 27.64, crecimiento_pct: 27.13, margen_ebitda_pct: 29.64, roic_pct: 32.1, dn_ebitda: -0.53, fcf_yield_pct: 1.66 }, 10350 / 10365),
  esc({ nombre: 'Disco', ticker: '6146', pais: 'JP', capitalizacion: 5770000, ev_ventas: 13.05, ev_ebitda_ltm: 28.11, ev_ebitda_ntm: null, per_ntm: 30.73, crecimiento_pct: 20.69, margen_ebitda_pct: 46.4, roic_pct: 48.53, dn_ebitda: -1.33, fcf_yield_pct: 1.56 }, 53360 / 53180),
  esc({ nombre: 'KLA', ticker: 'KLAC', pais: 'US', capitalizacion: 35668941, ev_ventas: 16.76, ev_ebitda_ltm: 37.59, ev_ebitda_ntm: null, per_ntm: 32.88, crecimiento_pct: 22.51, margen_ebitda_pct: 44.59, roic_pct: 66.75, dn_ebitda: 0.21, fcf_yield_pct: 1.66 }, 165.74 / 174.46, fxAdv),
  esc({ nombre: 'Lam Research', ticker: 'LRCX', pais: 'US', capitalizacion: 53837793, ev_ventas: 15.39, ev_ebitda_ltm: 41.38, ev_ebitda_ntm: null, per_ntm: 30.28, crecimiento_pct: 27.12, margen_ebitda_pct: 37.19, roic_pct: 70.07, dn_ebitda: -0.17, fcf_yield_pct: 1.36 }, 263.94 / 277.46, fxAdv),
  esc({ nombre: 'ASML', ticker: 'ASML', pais: 'NL', capitalizacion: 102482001, ev_ventas: 16.05, ev_ebitda_ltm: 42.03, ev_ebitda_ntm: null, per_ntm: 26.87, crecimiento_pct: 29.3, margen_ebitda_pct: 38.18, roic_pct: 65.98, dn_ebitda: -0.41, fcf_yield_pct: 1.72 }, 1641.52 / 1657.44, fxAdv),
  esc({ nombre: 'Teradyne', ticker: 'TER', pais: 'US', capitalizacion: 8290764, ev_ventas: 11.8, ev_ebitda_ltm: 34.99, ev_ebitda_ntm: null, per_ntm: 34.42, crecimiento_pct: 34.5, margen_ebitda_pct: 33.71, roic_pct: 38.24, dn_ebitda: -0.28, fcf_yield_pct: 1.51 }, 325.0 / 343.21, fxAdv),
  esc({ nombre: 'Onto Innovation', ticker: 'ONTO', pais: 'US', capitalizacion: 11020, ev_ventas: 9.47, ev_ebitda_ltm: 34.3, ev_ebitda_ntm: null, per_ntm: 21.71, crecimiento_pct: null, margen_ebitda_pct: 27.6, roic_pct: 12.61, dn_ebitda: -1.33, fcf_yield_pct: 2.13 }, 220.7 / 241.41, 158.14),
  esc({ nombre: 'Nova', ticker: 'NVMI', pais: 'IL', capitalizacion: 10260, ev_ventas: 9.97, ev_ebitda_ltm: 31.6, ev_ebitda_ntm: null, per_ntm: 25.93, crecimiento_pct: null, margen_ebitda_pct: 31.6, roic_pct: 19.75, dn_ebitda: -3.05, fcf_yield_pct: 1.84 }, 321.2 / 331.38, 158.14),
];

const bi = BOLSA.identificacion;
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Lasertec Corporation', nombre_corto: 'Lasertec', ticker: '6920', isin: 'JP3979200007', mercado: 'Bolsa de Tokio (Prime)', indice_referencia: 'TOPIX (ETF 1305.T)',
    pais: 'Japón', pais_iso: 'JP', sector: 'Tecnología de la información', industria: 'Equipos de semiconductores', sede: 'Yokohama (Kanagawa)', fundacion: '1960', empleados: 1335, web: 'https://www.lasertec.co.jp/en/',
    precio: bi.precio, fecha_precio: bi.fecha_precio, acciones: 89.63, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: bi.max_52s, min_52s: bi.min_52s, volumen_medio_diario: '≈ 149.000 M JPY/día (3 meses; 3,7 M de acciones)', proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: 'Guía de FY2027 (julio 2026 - junio 2027), del 6-ago-2026: ventas de 290.000 M JPY (+25,8 %), resultado de explotación de 125.000 M (margen del 43,1 %), beneficio neto de 90.000 M y BPA de 1.004,12 JPY, con 150 JPY/USD; pedidos de 300.000-400.000 M; dividendo de 351 JPY [7]. Es la primera guía del ejercicio y se revisará con el 1T el 30-oct-2026 [18].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 299177, ebitda: 142021, ebit: 137221, bpa: 1118, dpa: 364.6, fuente: 'MarketScreener, 17 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 388100, ebitda: 189004, ebit: 186134, bpa: 1509, dpa: 501.7, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 461943, ebitda: 225075, ebit: 224135, bpa: 1818, dpa: 594.9, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 9, mantener: 6, vender: 2, po_medio: 49337.5, po_min: 34000, po_max: 70000 },
    revisiones: 'Solo MarketScreener da estimaciones completas a tres años [2]; Stock Analysis (S&P Global) coincide en el objetivo medio (49.338 JPY, mediana 48.900) y da ventas de FY2027 de 302.000 M (280.000-318.000) [4]. Recomendaciones de octubre: 8 compra fuerte, 1 compra, 6 mantener y 2 venta fuerte; en mayo eran 7, 0, 7 y 2 [4]. Movimientos recientes: Goldman Sachs a 70.000 JPY (7-oct), Macquarie mantiene 36.000 (17-oct), Jefferies bajó de 57.000 a 51.000 en agosto [3, 11, 12]. El consenso de ventas de FY2027 (299.177 M) supera en un 3 % la guía; el BPA (1.118) en un 11 % [2, 7].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción es de las más volátiles del Nikkei (volatilidad de 77 % a un año; caída máxima del 76,6 % entre mayo de 2024 y abril de 2025) [1]. A diez años rinde un 56,1 % anual frente a un 14,2 % del TOPIX, pero a cinco años solo un 9,0 % frente a un 17,7 %: el pico de 2021 (cotizó a 78 veces el beneficio del año siguiente) y la caída de 2024, cuando se supo de las cancelaciones de ACTIS, se comieron la subida [1]. En el último año ha ganado un 94,6 % por la recuperación de pedidos y la demanda de la IA, pero está un 31 % por debajo del máximo del 19-jun-2026 [1].',
    contexto: {
      movimiento: {
        fecha: MOV.fecha, var_1m_pct: MOV.var_1m_pct, var_3m_pct: MOV.var_3m_pct, var_6m_pct: MOV.var_6m_pct, var_12m_pct: MOV.var_12m_pct,
        dist_max_52s_pct: MOV.dist_max_52s_pct, dist_min_52s_pct: MOV.dist_min_52s_pct, dist_max_historico_pct: MOV.dist_max_historico_pct,
        tendencia: MOV.tendencia, volatilidad_60d_pct: MOV.volatilidad_60d_pct, avisos: MOV.avisos,
      },
      movimientos_fuertes: [
        { periodo: 'jun-2026', var_pct: 58.3, causa: 'Subida de mayo a junio hasta el máximo del 19-jun (58.580 JPY): pedidos del 3T por encima de lo esperado, subida de la horquilla de pedidos a 200.000-240.000 M y euforia por los equipos para IA [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -32.4, causa: 'Caída de un mes hasta el 30-jul: el 27-jul la noticia de que China fabrica escáneres DUV hundió a ASML y a Lasertec (−9,7 % el 17-jul y −14 % el 28-jul), con el terremoto de Kumamoto del 28-jul en el sector [15, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: -13.5, causa: 'Caída del 7-ago tras los resultados: el margen de explotación previsto (43,1 %) y la guía de ventas (290.000 M) decepcionaron frente a un consenso más alto [13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2026', var_pct: -13.6, causa: 'Caída del 15-oct de todo el sector de equipos japonés (Advantest −15 %, Tokyo Electron −7,8 %) por la deuda de CoreWeave y el IPC de EE. UU., sin noticia propia [10, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-2026', var_pct: -14.0, causa: 'Caída del 2-feb tras los resultados del 2T: la previsión subió menos de lo esperado [14].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-30', tipo: 'resultados', hecho: 'Resultados del 1T FY2027 (julio-septiembre) el 30-oct-2026 a las 15:45 de Tokio, con conferencia a las 16:00 [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-17', tipo: 'recomendación', hecho: 'Macquarie mantiene su objetivo en 36.000 JPY [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-07', tipo: 'recomendación', hecho: 'Goldman Sachs fija un objetivo de 70.000 JPY, el máximo del consenso [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-11', tipo: 'rumor', hecho: 'La ampliación de capital de Intel, mayor de lo previsto, se lee como apoyo a la inversión de un cliente que fue el 20,7 % de las ventas [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'directivos', hecho: 'Sale del consejo el consejero ejecutivo Atsushi Tajima (efectivo el 25-sep), sin motivo publicado; no hay registro de ventas de acciones [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-16', tipo: 'ampliación o convertible', hecho: 'Termina la recompra de 560.600 acciones por 11.998 M JPY; no hay ampliaciones, convertibles ni colocaciones de accionistas [7].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-30',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sube un 14,8 % en un mes pero cae un 12,2 % en tres meses y está un 31,1 % por debajo del máximo de 52 semanas; cotiza un 2 % por encima de la media de 200 sesiones (tendencia alcista) con una volatilidad de 60 días del 84 % [1]. Las caídas fuertes tienen causa sectorial o de expectativas (resultados de febrero y agosto, China y la DUV en julio, sector el 15-oct), ninguna de deterioro propio del negocio. No hay colocaciones, ampliaciones, litigios ni ventas de directivos conocidas. El único hecho pendiente son los resultados del 30-oct, que por la regla 11 no retrasan. Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ['FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === 'FY2021' })),
    comentario: null,
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Equipos de semiconductores de alto margen y foso tecnológico: el control de procesos (KLA, Onto, Nova), la litografía de la que depende la demanda de Lasertec (ASML), los equipos de proceso (Lam Research, Tokyo Electron), el corte y pulido japonés (Disco) y el test (Teradyne). No hay ningún comparable puro de inspección de máscaras cotizado. Se excluye a Advantest (el análisis del 15-oct le da un BPA del FY2025 duplicado que distorsiona su PER) [8, 9].',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) inspección de máscaras: ninguna compra con precio publicado en 5-7 años (NuFlare es filial de Toshiba desde antes); 2) control de procesos: KLA-Orbotech (2019) y Nova-Ancosys (2021) sin múltiplos de EBITDA verificados en fuente primaria; 3) prensa: múltiplos con sinergias, no comprobables', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) JPX publica solo posiciones cortas por encima del 0,5 % del capital; 2) búsqueda en el listado de JPX no hecha por falta de tiempo; 3) Stock Analysis no da cortos en Japón', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'free_float_pct', tipo: 'Complemento', intentos: '1) informe de gobierno (no lo da); 2) Fact Sheet 2026 (composición por tipo de accionista sin flotante); 3) Yahoo (no lo da para Tokio)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Tablón de Yahoo! Finance Japón de レーザーテック (6920): mensajes y «evaluación de todos» de la última semana', editor: 'Yahoo! Finance Japón', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://finance.yahoo.co.jp/quote/6920.T/bbs' },
  { id: 2, titulo: 'Seeking Alpha, canal de noticias y análisis de LSRCY (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/LSRCY.xml' },
  { id: 3, titulo: 'Lasertec Stock Leads 3 Japanese Growth Picks With High Insider Ownership', editor: 'Simply Wall St / Yahoo Finance', tipo: 'Foros y redes', fecha: '2026-08-30', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'JPX Margin Trading Weekly (Oct 2nd): Mitsubishi UFJ Financial, Advantest, Fujikura, Lasertec', editor: 'Smartkarma', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://www.smartkarma.com/' },
  { id: 5, titulo: 'SBI Securities (full-day trading) reported net selling of Lasertec', editor: 'Moomoo', tipo: 'Foros y redes', fecha: '2026-06-16', url: 'https://www.moomoo.com/news' },
];
const Eobj = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Yahoo! Finance Japón (tablón de 6920)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'En la última semana el 61 % de los que votan quiere comprar y el 21 % vender; el debate es de corto plazo (la caída del 15-oct, el Nasdaq, la «anomalía de octubre») y espera un rango de 39.000-42.000 JPY hasta los resultados del 30-oct, donde «lo bueno ya se da por hecho» y se busca sorpresa [1].' },
      { plataforma: 'Seeking Alpha (LSRCY)', fecha: '2026-08', n_comentarios: 0, tono: 'Neutro', resumen: 'Solo noticias y transcripciones de resultados; el último análisis con debate es de junio de 2024 («debilidad como oportunidad») [2].' },
      { plataforma: 'Smartkarma y Moomoo (posiciones de particulares)', fecha: '2026-10', n_comentarios: 5, tono: 'Dividido', resumen: 'Lasertec figura entre los valores con más crédito al margen en Tokio y los particulares de SBI fueron vendedores netos en junio, en el máximo [4, 5].' },
      { plataforma: 'Simply Wall St (Yahoo Finance)', fecha: '2026-08', n_comentarios: 0, tono: 'Positivo', resumen: 'La destaca como valor de crecimiento japonés con alta participación de directivos [3].' },
    ],
    temas: [
      { tema: 'Resultados del 1T (30-oct) y pedidos', postura: 'Dividida', peso: 'Alto', contraste: 'La guía ya pide +25,8 % de ventas; la cifra que mueve es la de pedidos, que la compañía no da por trimestres [1].' },
      { tema: 'Volatilidad y apalancamiento de particulares', postura: 'Bajista', peso: 'Medio', contraste: 'Volatilidad de 60 días del 84 % y mucho crédito al margen: caídas del 13-14 % en un día cuatro veces en un año [4].' },
      { tema: 'IA y semiconductores avanzados', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en pedidos (237.504 M en FY2026), pero el negocio depende de tres clientes [1].' },
    ],
    lectura: 'El inversor particular japonés domina la conversación y es de corto plazo: mucho crédito al margen y debate sobre el día a día. No señala un riesgo que el informe no recoja; confirma que la acción reacciona con fuerza a los resultados (−13,5 % el día después de los anuales) y que el 30-oct puede moverla en cualquier dirección. No hay euforia ni capitulación: el tablón está dividido con mayoría compradora.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', Eobj);
console.log('Notas A-E escritas.');
