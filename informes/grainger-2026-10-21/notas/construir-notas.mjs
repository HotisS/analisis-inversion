// Escribe las notas A-E de W.W. Grainger (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL de
// la SEC (cuentas-xbrl.json y docs/companyfacts.json), de bolsa.json (Yahoo, cierre del 20-oct-2026), de yahoo-datos.json
// (Yahoo quoteSummary del 21-oct-2026, 15:54 UTC, sesión abierta), de form4.json y de la ficha sectorial de distribución
// industrial (14-oct-2026). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/grainger-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const F4 = lee('form4.json');
const ED = 'https://www.sec.gov/Archives/edgar/data/277135';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cuentas, segmentos, ingresos por sector de cliente y geografía, deuda, LIFO, salida del Reino Unido, riesgos)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-19', url: `${ED}/000027713526000011/gww-20251231.htm` },
  { id: 2, titulo: 'Grainger Reports Results for the Second Quarter 2026 (8-K, anexo 99.1): cuenta, balance y flujos a 30-jun-2026, devoluciones IEEPA, guía 2026', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000027713526000076/gww8kex991q22026.htm` },
  { id: 3, titulo: 'Form 10-Q del segundo trimestre de 2026 (segmentos, geografía, préstamos de MonotaRO, recompras, acciones en circulación)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000027713526000079/gww-20260630.htm` },
  { id: 4, titulo: 'Grainger Reports Results for the First Quarter 2026 (8-K, anexo 99.1)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000027713526000056/gww8kex991q12026.htm` },
  { id: 5, titulo: 'Grainger Reports Results for the Fourth Quarter and Full Year 2025 (8-K, anexo 99.1): BPA ajustado 39,48 USD, pérdida por la salida del Reino Unido, guía 2026', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-03', url: `${ED}/000027713526000004/gww8kex991q42025.htm` },
  { id: 6, titulo: 'Grainger Reports Results for the Third Quarter 2025 (8-K, anexo 99.1): pérdida no monetaria por la venta de Cromwell', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-31', url: `${ED}/000027713525000145/gww8kex991q32025.htm` },
  { id: 7, titulo: 'Notas de resultados anuales 2019-2024 (8-K, anexos 99.1): BPA y resultado operativo publicados y ajustados, guías anuales', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-01-31', url: `${ED}/000027713525000004/gww8kex991q42024.htm` },
  { id: 8, titulo: 'Form 10-K del ejercicio 2023 (segmentos 2021-2023, proveedores 2022)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-22', url: `${ED}/000027713524000011/gww-20231231.htm` },
  { id: 9, titulo: 'XBRL company facts de Grainger (depreciación y amortización del estado de flujos, LIFO, proveedores, trimestres)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000277135.json' },
  { id: 10, titulo: 'Q2 2026 W.W. Grainger Inc Earnings Call (transcripción: precio ≈ 4 % en 2026, 90 pb de IEEPA en el margen bruto, MonotaRO +24 % en yenes, guía del 3T)', editor: 'AllMind (transcripción de la conferencia)', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://allmind.ai/earnings/event/2935904' },
  { id: 11, titulo: 'Grainger acquires technology assets from Adroit Worldwide Media (210 M USD en efectivo)', editor: 'W.W. Grainger (PR Newswire, vía Placera)', tipo: 'Primaria', fecha: '2026-08-26', url: 'https://www.placera.se/pressmeddelanden/w-w-grainger-grainger-acquires-technology-assets-from-adroit-worldwide-media-20260826' },
];

// Cuenta del XBRL [9], comprobada con el 10-K [1] y las notas de resultados [5, 7]. Corrección importante: el concepto
// DepreciationDepletionAndAmortization del XBRL (330 M en 2025) SUMA el gasto no monetario de arrendamientos operativos
// (82 M): es la cifra de «depreciación, amortización y gasto no monetario de arrendamientos» de la nota de segmentos. En US
// GAAP el alquiler debe quedar DENTRO del EBITDA, así que usamos la depreciación y amortización del estado de flujos
// (DepreciationAndAmortization: 254 M en 2025). No recurrentes en el resultado operativo (publicado − ajustado) [5, 7]:
// 2019 ≈ 116 (estimación propia: margen ajustado del 12,0 % menos el publicado del 11,0 %), 2020 308 (Fabory y
// reestructuración), 2022 −21 (plusvalía), 2023 26, 2024 16 (reestructuración), 2025 196 (salida del Reino Unido).
const DA = { 2019: 229, 2020: 182, 2021: 187, 2022: 205, 2023: 214, 2024: 237, 2025: 254 };
const NR = { 2019: 116, 2020: 308, 2021: 0, 2022: -21, 2023: 26, 2024: 16, 2025: 196 };
const AP = { 2019: 719, 2020: 779, 2021: 816, 2022: 1047, 2023: 954, 2024: 952, 2025: 963 };
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, amortizaciones: DA[c.periodo], ebitda: c.ebit + DA[c.periodo], gastos_financieros: c.gastos_financieros ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[c.periodo] || null, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
// Gastos financieros 2019-2022 sin concepto en el XBRL: intereses pagados del estado de flujos [9] como aproximación.
const INT = { 2019: 84, 2020: 94, 2021: 87, 2022: 91 };
cuenta.forEach((c) => { if (c.gastos_financieros == null) c.gastos_financieros = INT[c.periodo]; });
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  // Arrendamientos operativos fuera de la deuda (US GAAP); proveedores del XBRL (AccountsPayableTradeCurrentAndNoncurrent) [9].
  const o = { ...b, arrendamientos: 0, proveedores: AP[b.periodo], activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, recompras: f.recompras ?? 0 };
  delete o.fin; return o;
});

// Trimestres [2, 4, 5, 6, 9]: ventas, resultado operativo y BPA publicados; EBITDA = resultado operativo + depreciación y
// amortización del estado de flujos (2024 y 2S25 repartidos a partes iguales: estimación propia). 3T25 con el resultado
// operativo AJUSTADO (707 M; el publicado, 511, lleva 196 M de la salida del Reino Unido) y BPA ajustado (10,21; 6,12
// publicado). 2T26 lleva 43 M de devoluciones de aranceles IEEPA en el coste de ventas.
const trim = (p, ing, g, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: oi + da, margen_ebitda_pct: r2((oi + da) / ing * 100), bpa, vs_consenso: vs });
const items = [
  trim('3T24', 4388, 4.3, 686, 59, 9.87, null),
  trim('4T24', 4233, 5.9, 633, 59, 9.71, null),
  trim('1T25', 4306, 1.7, 672, 61, 9.86, null),
  trim('2T25', 4554, 5.6, 678, 64, 9.97, 'Inferior'),
  trim('3T25', 4657, 6.1, 707, 64.5, 10.21, 'En línea'),
  trim('4T25', 4425, 4.5, 634, 64.5, 9.44, 'En línea'),
  trim('1T26', 4742, 10.1, 793, 62, 11.65, 'Superior'),
  trim('2T26', 5021, 10.3, 807, 66, 12.01, 'Superior'),
];
items.find((t) => t.periodo === '1T26').crecimiento_organico_pct = 12.2;
items.find((t) => t.periodo === '2T26').crecimiento_organico_pct = 13.7;
items.find((t) => t.periodo === '4T25').crecimiento_organico_pct = 4.6;

const seg = (nombre, desc, h) => ({ nombre, descripcion: desc, tipo_resultado: 'EBIT', historico: h.map(([p, i, r]) => ({ periodo: p, ingresos: i, resultado: r })) });
const A = {
  _estado: 'Completa. Cuentas 2019-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados; amortizaciones corregidas (sin el gasto no monetario de arrendamientos que el concepto del XBRL incluye); no recurrentes de las conciliaciones de la empresa. Arrendamientos operativos fuera de la deuda (US GAAP). MonotaRO consolidado al 100 % con un mes de retraso; su parte ajena (≈ 49,5 %) en minoritarios.',
  financieros: {
    cuenta,
    // LTM a 30-jun-2026 = 2025 − 1S25 + 1S26 [1, 2]. EBIT publicado 2.745 (con 196 de la salida del Reino Unido en el 3T25 y 43 de IEEPA en el 2T26).
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 18845, ebitda: 3002, ebit: 2745, beneficio_neto: 1870, bpa: 39.23, dpa: 9.27, dpa_extraordinario: 0, fcf: 1510, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 196 },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Venta de Cromwell (Reino Unido) completada el 17-dic-2025 y cierre de Zoro U.K. en el 4T25: salen del balance a cierre de 2025 y la cuenta lleva sus ventas de casi todo el año (324 M de «Otros») [1].' },
    ],
    comentario: 'Las ventas pasaron de 11.486 M USD en 2019 a 17.942 M en 2025 (TCAC del 7,7 %) y 18.845 M en los doce meses a junio de 2026, casi todo orgánico: la última compra grande fue Cromwell en 2015 y se ha vendido [9, 1]. 2021-2022 fueron años de inflación y de cuota tras la pandemia (+10 % y +17 %) [9]; 2023-2025 se frenaron al 8 %, 4 % y 4,5 % con la industria de EE. UU. plana [1, 5]. El margen operativo ajustado subió del 11,2 % de 2020 al 15,7 % de 2023 por la mezcla y el apalancamiento de gastos en High-Touch N.A., y bajó al 15,0 % en 2025 por los aranceles (precio/coste y 102 M de cargo LIFO) y la sanidad de los empleados [5, 9]. En 2026 vuelve a acelerar: ventas +10,1 % y +10,3 % en el 1T y el 2T (+12,2 % y +13,7 % orgánico a tipo constante), con un precio de ≈ 4 % en el año y margen operativo del 16,7 % y del 16,1 % [4, 2, 10]. Años no comparables: 2019-2020 (deterioros de Cromwell y venta de Fabory) y 2025 (196 M de pérdida por la salida del Reino Unido) [7, 5].',
    ajustes: 'Grainger publica un BPA ajustado que solo quita partidas puntuales: 2019 (deterioro de intangibles de Cromwell y reestructuración: 17,29 frente a 15,32 publicado), 2020 (venta de Fabory y reestructuración: 16,18 frente a 12,82), 2022 (plusvalía: 29,66 frente a 30,06), 2023 (36,67 frente a 36,23), 2024 (reestructuración de 16 M: 38,96 frente a 38,71) y 2025 (196 M de pérdida por la venta de Cromwell y el cierre de Zoro U.K., sin efecto fiscal: 39,48 frente a 35,40) [7, 5]. No ajusta la amortización de intangibles ni los pagos en acciones, así que el ajustado es casi el publicado. En 2026 publicado y ajustado coinciden, pero el 2T26 lleva 43 M de devoluciones de aranceles IEEPA (≈ 0,68 USD por acción tras impuestos; 23 pb de margen bruto en el año según la dirección) que no se repetirán [2, 10]. El cargo LIFO resta beneficio en los años de inflación (102 M en 2025, 139 M en 2022) [9].',
    confianza: 'Alta',
  },
  trimestres: {
    items,
    ultima_presentacion: 'En el 2T26 (4-ago-2026) las ventas crecieron un 10,3 % (13,7 % orgánico a tipo constante): High-Touch N.A. +11,9 % «por volumen y un precio sano» y Endless Assortment +20,6 % orgánico, con Zoro EE. UU. +18,4 % y MonotaRO +24 % en yenes [2, 10]. El margen bruto subió al 39,5 %, pero 90 pb eran devoluciones de aranceles IEEPA (43 M); sin ellas, el margen bruto bajó por fletes, mezcla de proyectos grandes y marca propia [2, 10]. La dirección (D.G. Macpherson y la directora financiera Deidra Merriwether, que dejó el cargo el 4-sep) subió la guía de BPA a 45,50-47,25 USD (antes 44,25-46,25) y de ventas a 19.400-19.700 M, con un precio de ≈ 4 % en 2026 y nuevas subidas en septiembre para cubrir costes; espera un 3T con ventas de más de 5.000 M (+12 % orgánico) y margen operativo en torno al 15,5 %, y dijo que julio creció «más del 13 %» [2, 10]. Los analistas preguntaron por qué el margen bruto del año sube menos que la devolución (proyectos grandes, fletes y combustible), por el peso de los centros de datos (menos del 1 % de las ventas), por los ≈ 45 M de compras anticipadas de productos derivados del petróleo en MonotaRO, que «ya han desaparecido», y por la visibilidad de los proyectos grandes [10]. Frente al 1T26 (7-may), el discurso pasa de «buen arranque» a «demanda que acelera en casi todos los mercados», con la duda en la calidad del margen [4, 10].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 2 }, { anio: '2027', importe: 0 }, { anio: '2028', importe: 0 }, { anio: '2034', importe: 500 }, { anio: '2035+', importe: 1906 }],
    liquidez: 'Caja 589 M USD (30-jun-2026) + crédito sindicado comprometido de 1.250 M sin disponer hasta octubre de 2028 (ampliable a 1.875 M), que respalda el papel comercial [2, 1].',
    rating: 'S&P A+ y Moody\'s A2, ambas estables (deuda sénior no garantizada; últimos datos publicados por la empresa, 2024) [1].',
    coste_deuda_pct: 4.0, vida_media_anios: 15.0,
    otros_pasivos: 'Deuda de 2.408 M a 30-jun-2026: bonos sénior a tipo fijo de 500 M al 4,45 % (2034), 1.000 M al 4,60 % (2045), 400 M al 3,75 % (2046) y 400 M al 4,20 % (2047), más préstamos de MonotaRO en yenes (13.000 M de yenes en 2025 y 7.500 M en 2026, al 1,27-1,74 %, hasta 2035) [1, 3]. Sin covenants financieros [1]. Arrendamientos operativos de 389 M (72 a corto) que, en US GAAP, no se suman a la deuda [2]. Pensiones: planes de prestación definida menores, sobre todo en el extranjero, sin déficit relevante [1]. Después del balance, 210 M en efectivo por los activos de Adroit Worldwide Media (26-ago-2026), que se restan en el puente [11]. Minoritarios: ≈ 49,5 % de MonotaRO, cotizada en Tokio (a valor contable 405 M a final de 2025; a mercado, muy por encima) [1].',
    comentario: 'El circulante comercial pasó de 3.598 M (21,0 % de las ventas) en 2025 a 3.916 M en junio de 2026 (20,8 % de las ventas de doce meses): las cuentas a cobrar suben un 21 % en seis meses (proyectos grandes y clientes que pagan más tarde) y los proveedores lo compensan en parte [2]. Las existencias se mantienen (2.371 M) pese a vender un 10 % más [2]. La deuda bruta apenas cambia desde 2016 (2.200-2.800 M); la caja ha bajado de 1.036 M en 2024 a 589 M tras devolver 500 M de bonos en 2025 [1, 2]. Deuda neta de ≈ 1.800 M, 0,6 veces el EBITDA: holgura para recomprar.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'Conversión de beneficio en caja alta pero con años de circulante: flujo operativo de 1.123 M en 2020 y 937 M en 2021 (acopio de existencias en la pandemia y la inflación) y de 2.031-2.111 M en 2023-2024 [9]. En 2025, 2.015 M (113 % del beneficio publicado, 104 % del ajustado) [5]. El capex sube del 2 % de las ventas en 2019-2022 al 3,8 % en 2025 (684 M) y a 575-650 M en 2026 por la ampliación de centros de distribución en EE. UU. y Japón y la tecnología [5, 2]; estimación propia: el mantenimiento ronda la amortización (≈ 1,4 % de las ventas) y el resto es crecimiento. Reparte casi todo: 467 M de dividendos y 1.045 M de recompras en 2025 (1.512 M frente a 1.336 M de flujo libre) [5]. En el 1S26 el flujo operativo fue de 1.183 M y el libre de 902 M [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable, sin salvedades, también sobre el control interno (2025)',
    comentario: 'Cuentas sencillas de distribución: ingreso al entregar, sin capitalización relevante salvo software, compras escasas y fondo de comercio de 360 M (4 % del activo) [1]. Los pagos en acciones son pequeños (64 M en 2025, 3,4 % del beneficio) y no se ajustan [9]. Tres puntos que vigilar: (1) el LIFO (80 % de las existencias) baja el beneficio en años de inflación y lo subiría si los precios cayeran: la reserva LIFO es de 939 M a final de 2025 [1, 9]; (2) la pérdida de 196 M por el Reino Unido fue no monetaria y sin efecto fiscal, lo que subió el tipo efectivo publicado al 25,6 % [5]; (3) MonotaRO se consolida con un mes de retraso y en US GAAP, distinto de lo que publica en Japón [2]. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con un patrimonio pequeño por las recompras: un Altman muy alto es normal; si el Beneish se acercara a −1,78 sería por las cuentas a cobrar de 2026, que la empresa atribuye a proyectos grandes [2].',
    senales: [
      { senal: 'Margen de 2026 con devoluciones de aranceles IEEPA', nivel: 'Media', comentario: '43 M en el coste de ventas del 2T26 (90 pb de margen bruto del trimestre, 23 pb en el año); no se repiten en 2027 [2, 10].' },
      { senal: 'Cuentas a cobrar que crecen más que las ventas', nivel: 'Baja', comentario: '+21 % en seis meses con ventas +10 %; proyectos grandes y plazos de clientes [2].' },
      { senal: 'Cargo LIFO variable con la inflación', nivel: 'Baja', comentario: '102 M en 2025 por los aranceles; reserva LIFO de 939 M [9].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo creciente durante 54 años seguidos: 2,26 USD por trimestre en 2025 y 2,49 desde mayo de 2026 (+10,2 %) [4]. Recompras constantes con el flujo libre que sobra tras el dividendo y el capex: 1.045 M en 2025 y 975-1.050 M guiados para 2026, con el programa de 2024 de hasta 5 M de acciones sin caducidad [2, 3]. Prioridades declaradas: invertir en el negocio (centros de distribución, tecnología), dividendo y recompras; compras de empresas pequeñas y raras [1]. La deuda se mantiene estable con rating A.',
    adquisiciones: [
      { anio: '2026', objetivo: 'Activos tecnológicos, propiedad intelectual y equipo de Adroit Worldwide Media (inventario autónomo con visión artificial, RFID y estanterías inteligentes)', importe: 210, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integración en curso; piloto comercial en los próximos meses; sin efecto material a corto plazo [11].' },
      { anio: '2025', objetivo: 'Venta de Cromwell (Reino Unido) y cierre de Zoro U.K.', importe: null, ev_ebitda: null, financiacion: 'Desinversión', resultado: 'Pérdida no monetaria de 196 M; Cromwell se compró en 2015 por ≈ 482 M y había acumulado deterioros (120 M de intangibles en 2019): una compra que no salió bien [1, 5, 7].' },
      { anio: '2020', objetivo: 'Venta de Fabory (Europa continental)', importe: null, ev_ebitda: null, financiacion: 'Desinversión', resultado: 'Cargos de ≈ 300 M en 2020; salida de un negocio europeo sin rentabilidad [7].' },
    ],
    comentario: 'La dirección asigna bien el capital en lo que controla: el crecimiento es orgánico y rentable (ROIC ajustado de la empresa del 41 % en 2024) y lo que sobra vuelve al accionista, con las acciones diluidas bajando de 54,9 M en 2019 a 47,1 M (−14 %) [9, 3]. Las compras grandes fuera de Norteamérica y Japón fueron un error (Fabory y Cromwell, vendidas con pérdidas) y la empresa lo ha corregido saliendo de Europa [1, 7]. La compra de AWM (210 M) es tecnológica y pequeña [11]. El límite: con la acción a 26-29 veces beneficios, las recompras crean poco valor, y el patrimonio contable (3.736 M atribuidos a final de 2025) queda pequeño frente al beneficio, lo que infla el ROE.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('High-Touch Solutions N.A.', 'Grainger en EE. UU. y Canadá (y México): ≈ 2 millones de productos para clientes medianos y grandes con contrato, entrega al día siguiente, 245 sucursales, KeepStock en planta y gestores de cuenta.', [['2021', 10186, 1334], ['2022', 12182, 1983], ['2023', 13267, 2334], ['2024', 13720, 2385], ['2025', 13993, 2354]]),
      seg('Endless Assortment', 'Zoro (EE. UU., ≈ 13 millones de productos) y MonotaRO (Japón, ≈ 29 millones; ≈ 50,5 % de Grainger): comercio electrónico para clientes pequeños y, en Japón, también empresas grandes.', [['2021', 2576, 232], ['2022', 2787, 223], ['2023', 2916, 233], ['2024', 3134, 260], ['2025', 3625, 345]]),
      seg('Otros (Cromwell y Zoro U.K., vendidos o cerrados en 2025)', 'Negocios del Reino Unido, fuera desde diciembre de 2025; en 2025 incluye la pérdida de 196 M (186 en «Otros»).', [['2021', 260, -19], ['2022', 259, 9], ['2023', 295, -2], ['2024', 314, -8], ['2025', 324, -204]]),
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 80.5 }, { nombre: 'Japón', peso_pct: 12.1 }, { nombre: 'Canadá', peso_pct: 3.8 }, { nombre: 'Otros (Reino Unido hasta 2025, México y otros)', peso_pct: 3.6 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas diarias orgánicas a tipo constante (2T)', valor_anterior: '+5,6 % aprox. (2T25, publicado)', valor_actual: '+13,7 % (2T26)', variacion: 'Aceleración', comentario: 'High-Touch N.A. +11,7 %, Endless Assortment +20,6 % [2].' },
      { kpi: 'Margen operativo del grupo (2T)', valor_anterior: '14,9 %', valor_actual: '16,1 %', variacion: '+1,2 pp', comentario: 'Con 43 M de devoluciones IEEPA; sin ellas ≈ 15,3 % [2].' },
      { kpi: 'Margen operativo de High-Touch N.A. (2T)', valor_anterior: '16,6 %', valor_actual: '17,3 %', variacion: '+0,7 pp', comentario: 'Guía del año 17,2-17,6 % [3, 2].' },
      { kpi: 'Margen operativo de Endless Assortment (2T)', valor_anterior: '9,9 %', valor_actual: '11,5 %', variacion: '+1,6 pp', comentario: 'MonotaRO 14 %, Zoro 7,6 % [3, 10].' },
      { kpi: 'Margen bruto del grupo (2T)', valor_anterior: '38,5 %', valor_actual: '39,5 %', variacion: '+1,0 pp', comentario: '90 pb de devoluciones IEEPA [2, 10].' },
      { kpi: 'Clientes atendidos', valor_anterior: 'n.d.', valor_actual: 'más de 4,6 millones (2025)', variacion: null, comentario: '≈ 25.000 empleados, 90 % en Norteamérica [1].' },
    ],
    clientes: 'Más de 4,6 millones de clientes; ninguno relevante por sí solo [1]. Por sector (2025): fabricación 30 %, administraciones públicas 15 %, mayoristas 9 %, servicios 8 %, contratistas 7 %, sanidad 6 %, transporte 5 % y otros [1]. High-Touch N.A. vende con contrato a clientes medianos y grandes (KeepStock, compras electrónicas integradas, asesores técnicos), lo que crea costes de cambio; Endless Assortment vende por internet a clientes pequeños con precio transparente [1]. Poder de precios demostrado: en 2025-2026 trasladó los aranceles con ≈ 4 % de precio en 2026 y un precio/coste casi neutro en el 2T26, aunque con trimestres de retraso (cargo LIFO de 102 M en 2025) [9, 10]. Las administraciones (15 %) compran por contratos marco y exponen a cierres del gobierno [1].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Grainger (sector grande y fragmentado, competidores, KeepStock, Zoro y MonotaRO, IA, aranceles, historia)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-19', url: `${ED}/000027713526000011/gww-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2025 de Fastenal (mercado norteamericano de suministros industriales de más de 140.000 M USD)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: 'https://www.sec.gov/Archives/edgar/data/815556/000081555626000009/fast-20251231.htm' },
  { id: 3, titulo: 'Form 10-K 2018 de W.W. Grainger (mercado MRO de EE. UU. de 93.000 M USD y de Canadá de 12.000 M)', editor: 'W.W. Grainger (SEC)', tipo: 'Primaria', fecha: '2019-02-27', url: `${ED}/000027713519000010/gww20181231-10k.htm` },
  { id: 4, titulo: 'Ficha sectorial: distribución industrial especializada (perímetro, economía, ciclo, comparables, márgenes y ROIC)', editor: 'Repositorio de análisis (sectores/distribucion-industrial-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
  { id: 5, titulo: 'Informe value de Fastenal del 21-oct-2026 (competidor; márgenes, cuota, aranceles, ciclo 2026)', editor: 'Repositorio de análisis (informes/fastenal-2026-10-21)', tipo: 'Analistas', fecha: '2026-10-21', url: 'informes/fastenal-2026-10-21/' },
  { id: 6, titulo: 'Form 10-Q del 3T26 de Fastenal (el Tribunal Supremo de EE. UU. anula en 2026 los aranceles IEEPA)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/Archives/edgar/data/815556/000081555626000049/fast-20260930.htm' },
  { id: 7, titulo: 'Grainger Makes $210M Tech Acquisition to Boost High-Touch Solutions Offering', editor: 'Modern Distribution Management', tipo: 'Prensa', fecha: '2026-08-26', url: 'https://www.mdm.com/news/technology/digital-commerce/grainger-makes-210m-tech-acquisition-to-boost-high-touch-solutions-offering/' },
  { id: 8, titulo: 'Proxy statement 2026 de Grainger (descripción del negocio, 2 millones de productos, 5.000 proveedores, 4,6 millones de clientes)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-10', url: `${ED}/000110465926025575/tm261342-1_def14a.htm` },
  { id: 9, titulo: 'Q2 2026 W.W. Grainger Inc Earnings Call (demanda, centros de datos < 1 %, MonotaRO, precio)', editor: 'AllMind (transcripción de la conferencia)', tipo: 'Prensa', fecha: '2026-08-04', url: 'https://allmind.ai/earnings/event/2935904' },
  { id: 10, titulo: 'Grainger buys majority stake in Japanese MRO direct marketer (MonotaRO, 2006-2008)', editor: 'Electrical Marketing', tipo: 'Prensa', fecha: '2008', url: 'https://www.electricalmarketing.com/news/people/article/20913406/grainger-buys-majority-stake-in-japanese-mro-direct-marketer' },
];
const B_ = {
  _estado: 'Completa. Mercado con dos fuentes primarias (Fastenal 10-K 2025 y Grainger 10-K 2018, perímetros distintos); competidores con cifras de sus cuentas a través de Yahoo y la ficha sectorial.',
  historia: {
    resumen: 'William W. Grainger fundó la empresa en Chicago en 1927 como mayorista de motores eléctricos por catálogo; se constituyó en Illinois en 1928 [1]. Creció con sucursales y el catálogo hasta ser el mayor distribuidor de suministros MRO de Norteamérica [1]. En los años 2000 entró en Japón (MonotaRO, comercio electrónico, con mayoría desde 2008) y en 2011 creó Zoro en EE. UU., las dos piezas del segmento Endless Assortment [10, 1]. Probó Europa con Fabory (Países Bajos) y Cromwell (Reino Unido, 2015) y salió de las dos con pérdidas (2020 y 2025) [1]. Desde 2021 se organiza en dos modelos: High-Touch Solutions para clientes con contrato y Endless Assortment para clientes pequeños por internet [1]. D.G. Macpherson es consejero delegado desde 2016 y presidente desde 2017.',
    hitos: [
      { anio: '1927', hito: 'Fundación en Chicago como mayorista de motores eléctricos por catálogo [1].' },
      { anio: '2008', hito: 'Mayoría de MonotaRO (Japón), comercio electrónico de suministros MRO [10].' },
      { anio: '2011', hito: 'Lanzamiento de Zoro en EE. UU. [1].' },
      { anio: '2015', hito: 'Compra de Cromwell (Reino Unido) por ≈ 482 M USD [7].' },
      { anio: '2020', hito: 'Venta de Fabory (Europa continental) con ≈ 300 M de cargos [1].' },
      { anio: '2021', hito: 'Nueva segmentación: High-Touch Solutions N.A. y Endless Assortment [1].' },
      { anio: '2025', hito: 'Salida del Reino Unido: venta de Cromwell y cierre de Zoro U.K. (pérdida de 196 M) [1].' },
      { anio: '2026', hito: 'Compra de los activos tecnológicos de Adroit Worldwide Media (210 M USD) para inventario autónomo [7].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Grainger distribuye productos de mantenimiento, reparación y operaciones (MRO): seguridad, herramientas, motores, fontanería, iluminación, limpieza, manutención y miles de familias más [1]. Tiene dos modelos: High-Touch Solutions N.A. (78 % de las ventas de 2025) vende ≈ 2 millones de productos con entrega al día siguiente desde centros de distribución automatizados y 245 sucursales a clientes medianos y grandes con contrato, con servicios como KeepStock (inventario en planta) y asesoría técnica [1]; Endless Assortment (20 %) vende por internet ≈ 13 millones de productos con Zoro en EE. UU. y ≈ 29 millones con MonotaRO en Japón [1]. Sirve a más de 4,6 millones de clientes con ≈ 25.000 empleados y más de 5.000 proveedores [8]. Desde 2026 ya no tiene negocio en el Reino Unido [1].',
    como_gana_dinero: 'Compra a miles de fabricantes y revende con un margen bruto del 39-40 %: cobra la disponibilidad (casi todo en stock y entregado al día siguiente), el surtido y el servicio técnico, no el producto [1, 2]. High-Touch N.A. tiene margen bruto del ≈ 42 % y operativo del 17 %; Endless Assortment, margen bruto menor y operativo del 10-11 % (MonotaRO 14 %, Zoro 7,6 %) [3, 9]. El beneficio depende del volumen (apalancamiento de una red logística con costes fijos), del precio frente al coste (aranceles con trimestres de retraso y LIFO) y de la mezcla entre segmentos y clientes (los grandes compran con menos margen) [1]. Ingresos casi todos recurrentes (reposición de consumibles y repuestos), poco estacionales y sensibles a la producción industrial y a la actividad de EE. UU.',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Distribución de suministros MRO a empresas e instituciones de Norteamérica (y, para Endless Assortment, Japón). Usamos como tamaño la estimación de Fastenal (más de 140.000 M USD al año en Norteamérica, con la tornillería de producción), que es la cifra primaria más reciente [2]; la segunda fuente, la propia Grainger, daba 105.000 M USD en 2018 solo para MRO en EE. UU. y Canadá [3]. En su 10-K 2025 Grainger lo describe como «grande y fragmentado» sin cifra [1]. Ninguna fuente gratuita independiente publica una serie; el crecimiento sale de la producción y la actividad más el precio [4].',
    tamano: '> 140.000 M USD al año en Norteamérica (Fastenal, 10-K 2025) [2]; 105.000 M USD de MRO en EE. UU. y Canadá en 2018 (Grainger) [3]',
    unidad_serie: 'millones de USD', serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentado',
    drivers: [
      { driver: 'Actividad industrial de EE. UU. (ISM manufacturero, producción)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Fabricación es el 30 % de las ventas de Grainger; 2023-2025 con la industria plana y ventas +4-8 %; en 2026 la dirección ve «aceleración en casi todos los mercados» [1, 9].' },
      { driver: 'Precio por aranceles e inflación', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Precio de ≈ 4 % en 2026; cargo LIFO de 102 M en 2025; aranceles IEEPA anulados por el Tribunal Supremo en 2026 y devueltos en parte [9, 6].' },
      { driver: 'Consolidación de proveedores y compras electrónicas de los clientes grandes', efecto: '+', horizonte: 'Estructural', evidencia: 'High-Touch N.A. crece por encima del mercado con KeepStock y compras integradas; 2 millones de productos en stock [1].' },
      { driver: 'Comercio electrónico de catálogo (Amazon Business, Zoro, MonotaRO)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Endless Assortment +20,6 % orgánico en el 2T26: Grainger es a la vez amenazado y ganador [9].' },
      { driver: 'Gasto público y sanidad', efecto: '+', horizonte: 'Estructural', evidencia: 'Administraciones 15 % y sanidad 6 % de las ventas, menos cíclicos [1].' },
      { driver: 'IA en búsqueda y compras', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Grainger cree que la IA «tendrá un impacto significativo en las preferencias de los clientes y la dinámica del mercado» e invierte en ella [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Fragmentado, con grandes nacionales (Grainger, Fastenal, MSC), distribuidores especializados, Amazon Business y miles de locales; compiten en disponibilidad, servicio y precio [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Ningún cliente relevante, pero los grandes negocian contratos y las administraciones compran por concurso [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Más de 5.000 proveedores; algunos venden directo, pero ninguno domina [8, 1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala logística (centros automatizados, 2 millones de productos en stock) difícil de replicar; Amazon Business es la excepción [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Venta directa de fabricantes y mercados en línea en el catálogo estándar [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Tras dos años de industria plana (2024-2025), 2026 muestra aceleración: ventas orgánicas +12-14 % en el 1S26 con ≈ 4 puntos de precio y volumen en casi todos los mercados [9]. Comportamiento histórico: en 2020 las ventas subieron un 3 % gracias a los equipos de protección pese a la caída industrial; en 2022, +17 % por la inflación; en 2023-2025, +4-8 % con el ISM por debajo de 50 la mayor parte del tiempo [9 del A, 1]. El precio de los aranceles infla las ventas de 2025-2026 y saldrá de la comparación en 2027.' },
    regulacion: 'Aranceles de EE. UU. desde 2025 sobre importaciones (China, acero, aluminio); los impuestos al amparo de la IEEPA los anuló el Tribunal Supremo en 2026 y Grainger recibió devoluciones por lo que importó directamente (43 M en el 2T26) [6, 9]. Como contratista del gobierno, está expuesta a auditorías de precios y a cierres administrativos [1]. Normas de seguridad laboral (OSHA) sostienen la demanda de equipos de protección. Japón: normativa de comercio electrónico y protección de datos para MonotaRO [1].',
    tendencias: 'Tres tendencias: (1) los clientes grandes reducen proveedores y automatizan la reposición (KeepStock, máquinas, compras electrónicas), lo que favorece a los grandes con red logística [1]; (2) el comercio electrónico de catálogo gana cuota en los clientes pequeños, donde Grainger compite consigo misma con Zoro y MonotaRO y con Amazon Business [1, 9]; (3) la IA cambia cómo se busca y se compra: puede convertir el catálogo estándar en mercancía comparada por agentes de compra, pero Grainger tiene el surtido, los datos de producto y la logística, y la compra de AWM (inventario autónomo con visión artificial) va en esa línea [1, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 12.8, posicion: '1.º distribuidor de suministros MRO de Norteamérica: ventas de High-Touch N.A. y Zoro de ≈ 17.000 M en 2025 frente a un mercado de más de 140.000 M (≈ 12-13 %; estimación propia con la cifra de Fastenal) [1, 2]; MonotaRO es el líder del comercio electrónico MRO en Japón [1].',
    competidores: [
      { nombre: 'Fastenal', pais: 'EE. UU.', ticker: 'FAST', ingresos: 8201, cuota_pct: 5.9, margen_ebit_pct: 20.2, comentario: 'Tornillería y consumibles en la planta del cliente (máquinas y Onsites); el más rentable del sector [5].' },
      { nombre: 'MSC Industrial Direct', pais: 'EE. UU.', ticker: 'MSM', ingresos: 3770, cuota_pct: null, margen_ebit_pct: 8.0, comentario: 'Herramientas de corte y metalurgia; más expuesta a la fabricación pesada [4].' },
      { nombre: 'Applied Industrial Technologies', pais: 'EE. UU.', ticker: 'AIT', ingresos: 4967, cuota_pct: null, margen_ebit_pct: 11.1, comentario: 'Rodamientos, transmisión e hidráulica; crece con compras [4].' },
      { nombre: 'Amazon Business (Amazon.com)', pais: 'EE. UU.', ticker: 'AMZN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mercado en línea para empresas; compite en precio y surtido en el cliente pequeño y en compras no planificadas; sin cifras separadas [1].' },
      { nombre: 'Wesco International', pais: 'EE. UU.', ticker: 'WCC', ingresos: 23511, cuota_pct: null, margen_ebit_pct: 5.2, comentario: 'Material eléctrico y de comunicaciones; coincide en la parte eléctrica [4].' },
      { nombre: 'Würth (no cotiza)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor grupo mundial de tornillería y montaje; en EE. UU. por filiales [4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Más proveedores y datos de producto mejoran el catálogo de Zoro y MonotaRO, pero no hay efecto de red fuerte entre clientes [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos con compras electrónicas integradas y KeepStock en planta; las administraciones compran por contratos marco [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca Grainger reconocida en MRO y datos de producto propios; sin patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Escala de compras y logística: margen operativo del 17 % en High-Touch N.A. frente al 8 % de MSC y el 11 % de Applied; ROIC ajustado del 41 % (2024) [3 del A, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Red de centros automatizados con 2 millones de productos en stock y entrega al día siguiente que un nuevo competidor no puede justificar [1].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable: (1) que el precio de los aranceles se invierta o se frene y deje a la vista un volumen más débil, con presión sobre el margen bruto (probabilidad media en 2027) [9]; (2) que Amazon Business y los agentes de compra con IA abaraten la comparación de precios en el catálogo estándar y en los clientes pequeños, donde Zoro ya compite en precio (probabilidad media a cinco años) [1]; (3) que la mezcla hacia Endless Assortment, de menor margen, y hacia proyectos grandes baje el margen del grupo (probabilidad media, efecto pequeño) [9]. La ventaja de escala logística no está en riesgo a corto plazo.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo que mueve cifras: (1) seguridad laboral en centros de distribución y sucursales (≈ 25.000 empleados) y el coste sanitario de la plantilla, que restó margen en el 4T25 («costes sanitarios imprevistos») [1]; (2) cumplimiento en la cadena de suministro (origen, trabajo forzoso, aranceles) con más de 5.000 proveedores [1, 8]; (3) emisiones de la logística y de los edificios, sin coste regulatorio material hoy en EE. UU. [1].',
    controversias: 'Sin sanciones ni litigios materiales en los últimos tres años según el 10-K 2025; los pleitos por el incendio de KMCO (2019) se han cerrado sin efecto en el beneficio ni en la caja [1].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño de mercado, TCAC y CR5', tipo: 'Complemento', intentos: '1) 10-K 2025 de Grainger (sin cifra); 2) 10-K 2025 de Fastenal y 10-K 2018 de Grainger (cifras sueltas, sin serie); 3) Precedence Research (la página redirige y no deja leer la cifra) y MDM (de pago)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 10-K y proxy 2026 (no las citan); 2) web de la empresa (no consultada con éxito); 3) agencias (MSCI y Sustainalytics, de pago o con sesión)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas de más del 5 %, ratio de remuneración, derecho de nombramiento de la familia Slavik', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-10', url: `${ED}/000110465926025575/tm261342-1_def14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 29-abr-2026 (votos de consejeros, auditor y remuneración)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${ED}/000027713526000033/gww-20260429.htm` },
  { id: 3, titulo: 'Form 8-K: dimisión de la directora financiera Deidra Merriwether (efectiva el 4-sep-2026) y nombramiento de Laurie Thomson como directora financiera interina', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-03', url: `${ED}/000110465926089478/tm2621790d1_8k.htm` },
  { id: 4, titulo: 'Form 4 de directivos y consejeros (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000277135&type=4' },
  { id: 5, titulo: 'Notas de resultados anuales 2021-2025 (guías de BPA y resultados reales)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-03', url: `${ED}/000027713526000004/gww8kex991q42025.htm` },
  { id: 6, titulo: 'Grainger Reports Results for the Third Quarter 2025 (guía 2025 rebajada a 39,00-39,75 USD)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-31', url: `${ED}/000027713525000145/gww8kex991q32025.htm` },
  { id: 7, titulo: 'Grainger Reports Results for the Second Quarter 2026 (guía 2026 subida a 45,50-47,25 USD)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000027713526000076/gww8kex991q22026.htm` },
];
const ops = F4.operaciones.filter((o) => ['P', 'S'].includes(o.codigo) && o.fecha >= '2025-10-21').sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
const C = {
  _estado: 'Completa. Proxy 2026, votos de la junta de 2026, 8-K de la salida de la directora financiera y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'D.G. Macpherson', cargo: 'Presidente y consejero delegado', desde: '2016', participacion_pct: 0.21, trayectoria: 'Consejero delegado desde octubre de 2016 y presidente desde 2017; antes director de operaciones y de Grainger EE. UU. Con él, las ventas pasaron de ≈ 10.100 M a 17.900 M, el margen operativo ajustado del 11-12 % al 15-16 % y salió de Europa [1, 5].' },
      { nombre: 'Laurie R. Thomson', cargo: 'Directora financiera interina (desde el 5-sep-2026) y vicepresidenta, directora contable', desde: '2026', participacion_pct: 0.0, trayectoria: 'En Grainger desde 2008 (auditoría interna, finanzas); directora contable desde mayo de 2021. Interina mientras se busca un director financiero [3].' },
      { nombre: 'Deidra C. Merriwether', cargo: 'Directora financiera hasta el 4-sep-2026', desde: '2019', participacion_pct: 0.02, trayectoria: 'Dimitió para «buscar otra oportunidad», sin desacuerdos con la empresa [3].' },
      { nombre: 'Jonny M. LeRoy', cargo: 'Vicepresidente sénior y director de tecnología', desde: '2019', participacion_pct: null, trayectoria: 'Responsable de tecnología, datos e IA de los canales digitales [1, 4].' },
      { nombre: 'Paige K. Robbins', cargo: 'Vicepresidenta sénior (High-Touch Solutions)', desde: '2017', participacion_pct: null, trayectoria: 'Dirige el negocio de High-Touch Solutions N.A. [1, 4].' },
      { nombre: 'E. Scott Santi', cargo: 'Consejero coordinador independiente', desde: '2010', participacion_pct: null, trayectoria: 'Ex consejero delegado y presidente de Illinois Tool Works [1].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'BPA de 23,50-25,50 USD [5]', real: '29,66 ajustado [5]', cumplida: 'Sí' },
      { anio: '2023', guia: 'BPA de 32,00-34,50 USD [5]', real: '36,67 ajustado [5]', cumplida: 'Sí' },
      { anio: '2024', guia: 'BPA de 38,00-40,50 USD [5]', real: '38,96 ajustado [5]', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA de 39,00-41,50 USD, rebajado a 39,00-39,75 en octubre [5, 6]', real: '39,48 ajustado [5]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'BPA de 42,25-44,75 USD, subido a 44,25-46,25 en mayo y a 45,50-47,25 en agosto [5, 7]', real: '23,66 en el 1S26; en curso [7]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y con historial: Macpherson lleva diez años y ha cumplido o batido la guía de BPA en 2022-2024; en 2025 la cumplió en la parte baja tras rebajarla por los aranceles, y en 2026 la ha subido dos veces [5, 6, 7]. La salida de la directora financiera en septiembre de 2026, para irse a otra empresa, deja una interina de la casa mientras se busca sustituto: no hay señal de desacuerdo, pero es el cambio más relevante del año y coincide con un pico de márgenes [3]. No hay sucesor declarado de Macpherson; el consejo tiene un consejero coordinador fuerte (Santi, ex ITW) [1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'D.G. Macpherson', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2016', comisiones: '—' },
      { nombre: 'E. Scott Santi', cargo: 'Consejero coordinador', tipo: 'Independiente', desde: '2010', comisiones: 'Consejero coordinador' },
      { nombre: 'Rodney C. Adkins', cargo: 'Consejero', tipo: 'Independiente', desde: '2014', comisiones: 'n.d.' },
      { nombre: 'George S. Davis', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'n.d.' },
      { nombre: 'Katherine D. Jaspon', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'n.d.' },
      { nombre: 'Christopher J. Klein', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'n.d.' },
      { nombre: 'Cindy J. Miller', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'n.d.' },
      { nombre: 'Neil S. Novich', cargo: 'Consejero', tipo: 'Independiente', desde: '1999', comisiones: 'n.d.' },
      { nombre: 'Beatriz R. Perez', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'n.d.' },
      { nombre: 'Susan Slavik Williams', cargo: 'Consejera (familia fundadora, 5,9 %)', tipo: 'Dominical', desde: '2019', comisiones: 'n.d.' },
      { nombre: 'Lucas E. Watson', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'n.d.' },
      { nombre: 'Steven A. White', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'n.d.' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.1, voto_remuneracion_contra_pct: 3.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 11.61, fijo: 1.18, variable_corto: 1.65, variable_largo: 8.45, ratio_salario_medio: 172 },
    remuneracion: 'El consejero delegado cobró 11,61 M USD en 2025 (1,18 de fijo, 1,65 de bonus anual y 8,45 en acciones), 172 veces el empleado mediano [1]. El bonus anual (MIP) depende del crecimiento de las ventas diarias orgánicas a tipo constante y del ROIC ajustado del grupo; el incentivo a largo plazo en acciones también lleva métricas de rentabilidad: premia crecer con rentabilidad sobre el capital, no a cualquier precio [1]. Hay política de recuperación (clawback) y guías de tenencia de acciones [1]. Voto en contra de la remuneración en la junta de 2026: 3,5 % (96,1 % a favor de los votos emitidos) [2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.71, tipo: 'Institucional (fondos índice)', variacion: '13G a 31-dic-2025' },
      { nombre: 'BlackRock, Inc.', pct: 8.10, tipo: 'Institucional (fondos índice)', variacion: '13G a 31-dic-2025' },
      { nombre: 'Susan Slavik Williams (familia del fundador)', pct: 5.9, tipo: 'Familia fundadora, con derecho a proponer un consejero', variacion: 'Estable' },
    ],
    insiders: ops.map((o) => ({ fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: o.acciones, importe: r2(o.importe / 1e6) })),
    control_y_defensas: 'Sin accionista de control: Vanguard 11,7 %, BlackRock 8,1 % y la familia Slavik (descendientes del fundador) 5,9 % [1]. La familia tiene, por una carta de entendimiento, el derecho a proponer un consejero mientras conserve al menos el 5 % (hoy, la propia Susan Slavik Williams) [1]. Una acción, un voto; consejeros elegidos cada año [1, 2]. El presidente es también consejero delegado, con un consejero coordinador independiente elegido cada año (Santi) [1]. Sin operaciones vinculadas relevantes ni defensas especiales más allá de la ley de Illinois [1].',
    alertas: ['Dimisión de la directora financiera (efectiva el 4-sep-2026) para irse a otra empresa, sin desacuerdos declarados; directora financiera interina hasta que se nombre otra [3].', 'Ventas de directivos de 33,5 M USD en 12 meses, sin compras; el 90 % con planes 10b5-1 (25,96 M del consejero delegado) [4].'],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'votos de remuneración de 2024 y 2025 y composición de las comisiones', tipo: 'Complemento', intentos: '1) 8-K de la junta de 2026 (solo 2026); 2) proxy 2026 (texto de comisiones en tablas que la extracción no separa); 3) búsqueda de los 8-K de 2024 y 2025 (no descargados en esta iteración)', decision: 'Omitido (una junta en vez de tres; comisiones n.d.)' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (GWW, SPY, XLI) y cierres de cada ejercicio, hasta el 20-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/GWW/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de Grainger, MonotaRO y comparables (consenso de BPA y ventas, recomendaciones, objetivos, valor empresa, EBITDA de 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/GWW/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 2T26 de Grainger (47.100.942 acciones en circulación el 28-jul-2026)', editor: 'W.W. Grainger, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000027713526000079/gww-20260630.htm` },
  { id: 6, titulo: 'Home Depot: adquisición de SRS Distribution (18.250 M USD, ≈ 16,1x el EBITDA ajustado 2023e), presentación 8-K', editor: 'The Home Depot (SEC)', tipo: 'Primaria', fecha: '2024-03-28', url: 'https://www.sec.gov/Archives/edgar/data/354950/000110465924040163/tm2410002d1_ex99-2.htm' },
  { id: 7, titulo: 'Lowe\'s: acuerdo para comprar Foundation Building Materials (≈ 8.800 M USD; 6.500 M de ventas y 635 M de EBITDA ajustado pro forma 2024)', editor: 'Lowe\'s Companies (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-20', url: 'https://www.sec.gov/Archives/edgar/data/60667/000006066725000162/exhibit991-08012025fbm.htm' },
  { id: 8, titulo: 'GMS: acuerdo con Home Depot/SRS (valor empresa ≈ 5.500 M USD) y cuentas XBRL de FY2025 (ventas 5.514 M, EBITDA 422 M)', editor: 'GMS Inc. (SEC, 8-K y XBRL)', tipo: 'Primaria', fecha: '2025-06-30', url: 'https://www.sec.gov/Archives/edgar/data/1600438/000110465925063833/tm2519400d1_ex99-1.htm' },
  { id: 9, titulo: 'QXO to Acquire Beacon Roofing Supply for $11 Billion; cuentas XBRL de Beacon 2024 (ventas 9.763 M, EBITDA 867 M)', editor: 'QXO (Business Wire) y SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-20', url: 'https://www.businesswire.com/news/home/20250320149865/en/QXO-to-Acquire-Beacon-Roofing-Supply-for-11-Billion' },
  { id: 10, titulo: 'Ficha sectorial de distribución industrial (ROIC y rentabilidad por FCF de los comparables, 14-oct-2026)', editor: 'Repositorio de análisis (sectores/distribucion-industrial-2026-10-14-comparables.json)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14-comparables.json' },
  { id: 11, titulo: 'Tipos de cambio de referencia del BCE (20-oct-2026: 1,1215 USD, 177,34 JPY y 0,84028 GBP por euro)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml' },
  { id: 12, titulo: 'MonotaRO: accionistas principales (Grainger Global Holdings ≈ 50,3-50,5 %)', editor: 'Simply Wall St (propiedad de MonotaRO) y MonotaRO (perfil corporativo)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://simplywall.st/stocks/us/capital-goods/otc-mono.f/monotaro/ownership' },
  { id: 13, titulo: 'Grainger: acciones de los analistas (Stephens rebaja a Equal Weight el 14-jul-2026; Wolfe sube a Peer Perform el 9-jul; RBC, Barclays, Morgan Stanley, DA Davidson, Oppenheimer mantienen)', editor: 'FN2', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://fn2.ai/earnings/gww/2026-q1' },
];
const GBPUSD = 1.1215 / 0.84028;
const JPYUSD = 1.1215 / 177.34;
const yf = (t) => Y[t];
const comp = (t, nombre, pais, ext = {}) => {
  const d = yf(t); const fx = d.divisa === 'GBp' ? GBPUSD : 1;
  const tr = d.trend.filter((x) => /y$/.test(x.periodo));
  const g = tr[1]?.crec_ventas != null ? r1(tr[1].crec_ventas * 100) : null;
  const cap = d.cap ? d.cap / 1e6 * fx : null;
  return { nombre, ticker: t.replace('.L', ''), pais, capitalizacion: cap ? Math.round(cap) : null, ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda ?? d.ev / d.ebitda), ev_ebitda_ntm: null, per_ntm: r1(d.per_adelantado), crecimiento_pct: g, margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: ext.roic ?? null, dn_ebitda: r1((d.ev - (d.cap || 0)) / d.ebitda), fcf_yield_pct: ext.fcf ?? null };
};
const comparables = [
  comp('FAST', 'Fastenal', 'US', { roic: 32.6, fcf: 2.0 }),
  comp('MSM', 'MSC Industrial Direct', 'US', { roic: 13.6, fcf: 3.0 }),
  comp('AIT', 'Applied Industrial Technologies', 'US', { roic: 19.6, fcf: 3.7 }),
  comp('WCC', 'Wesco International', 'US'),
  comp('FERG', 'Ferguson Enterprises', 'US'),
  comp('WSO', 'Watsco', 'US'),
  comp('DPLM.L', 'Diploma', 'GB', { roic: 14.4 }),
  comp('RS1.L', 'RS Group', 'GB', { roic: 9.7, fcf: 6.8 }),
];
// MSC: Yahoo no da capitalización; precio × 55,9 M acciones diluidas de FY2025 (XBRL de la SEC, como en el informe de Fastenal).
const msm = comparables.find((c) => c.ticker === 'MSM'); msm.capitalizacion = Math.round(yf('MSM').precio * 55.9); msm.dn_ebitda = r1((yf('MSM').ev / 1e6 - msm.capitalizacion) / (yf('MSM').ebitda / 1e6));
const pers = comparables.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = r1((pers[3] + pers[4]) / 2);
const g = yf('GWW');
const mono = yf('3064.T');
const monoCapUsd = Math.round(mono.cap / 1e6 * JPYUSD);
const cierres = B.cierres_ejercicio.filter((c) => anios.includes(c.anio));
const t0 = g.trend.find((x) => x.periodo === '0y'), t1 = g.trend.find((x) => x.periodo === '+1y');
const D = {
  _estado: 'Completa. Precio y bolsa de Yahoo (cierre del 20-oct-2026; el 21-oct la sesión estaba abierta), consenso y comparables de Yahoo quoteSummary del 21-oct-2026 a las 15:54 UTC, MonotaRO a su cotización de Tokio pasada a dólares con el BCE, transacciones de distribución para la construcción (sin compras MRO con múltiplo).',
  _per_mediana_comparables: medPer,
  _monotaro: { cap_jpy_m: Math.round(mono.cap / 1e6), cap_usd_m: monoCapUsd, pct_ajeno: 49.5, minoritarios_mercado_usd_m: Math.round(monoCapUsd * 0.495) },
  identificacion: {
    nombre: 'W.W. Grainger, Inc.', nombre_corto: 'Grainger', ticker: 'GWW', isin: 'US3848021040', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Distribuidores de comercio (GICS 201070)', sede: 'Lake Forest (Illinois)', fundacion: '1927', empleados: 25000, web: 'https://www.grainger.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 47.1, capitalizacion_publicada: Math.round(g.cap / 1e6), free_float_pct: 93.7,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: 'Guía de 2026 (ajustada), subida dos veces: ventas de 19.400-19.700 M USD (+8,4-10,0 %; +11,5-13,0 % orgánico a tipo constante), margen bruto del 39,3-39,6 %, margen operativo del 15,8-16,2 %, BPA de 45,50-47,25 USD, flujo operativo de 2.250-2.400 M, capex de 575-650 M, recompras de 975-1.050 M y tipo fiscal de ≈ 25 % (4-ago-2026; en febrero era BPA de 42,25-44,75) [2 del A]. Por segmentos: High-Touch N.A. 17,2-17,6 % y Endless Assortment 10,4-10,8 % de margen operativo. Para el 3T26 la dirección espera ventas de más de 5.000 M y margen operativo en torno al 15,5 %. No hay objetivos a medio plazo publicados con cifra.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t0.ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t0.bpa), dpa: 9.73, fuente: `Yahoo Finance (${t0.n} analistas de BPA) [2]; DPA = 2,26 + 3 × 2,49 declarados` },
      { periodo: '2027e', ingresos: Math.round(t1.ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t1.bpa), dpa: null, fuente: `Yahoo Finance (${t1.n} analistas) [2]` },
    ],
    recomendaciones: { n_analistas: 19, comprar: 4, mantener: 13, vender: 2, po_medio: r2(g.po_medio), po_min: g.po_min, po_max: g.po_max },
    revisiones: `BPA de 2026 del consenso: ${String(r2(t0.bpa_hace90)).replace('.', ',')} USD hace 90 días y ${String(r2(t0.bpa)).replace('.', ',')} hoy (+1,8 %); 2027: ${String(r2(t1.bpa_hace90)).replace('.', ',')} hace 90 días y ${String(r2(t1.bpa)).replace('.', ',')} hoy (+1,2 %) [2]. Las revisiones al alza siguen a las dos subidas de guía (mayo y agosto) y al precio de los aranceles. Recomendaciones de Yahoo: 1 compra fuerte, 3 comprar, 13 mantener y 2 venta fuerte (19); objetivo medio de ${g.n_analistas} analistas ${String(r2(g.po_medio)).replace('.', ',')} USD (${g.po_min}-${g.po_max}), justo por debajo del precio [2]. Acciones de 2026: Stephens rebaja a Equal Weight por valoración (14-jul), Wolfe sube a Peer Perform (9-jul); el resto mantiene (Barclays Underweight) [13]. Solo una fuente gratuita con estimaciones completas (Yahoo).`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(g.corto_pct * 100),
    comentario: 'Grainger ha batido al S&P 500 a 1, 5 y 10 años (22,4 % anual con dividendos en diez años frente al 15,5 %) y en 2026 sube un 33,2 % frente al 13,7 % [1]. La subida de 2026 es de resultados (dos subidas de guía, ventas orgánicas de dos dígitos) y de múltiplo: el PER sobre el BPA de los doce meses siguientes pasa de ≈ 22 veces a final de 2025 a ≈ 27 hoy [1, 2]. En 2025 bajó un 3,4 % por la rebaja de guía de agosto (caída del 11 % el día de resultados del 2T25) [1]. Los días de resultados mueven la acción: −5,2 % el 4-ago-2026 pese a subir la guía, porque parte del margen eran devoluciones de aranceles [1]. Beta mensual de 5 años de 0,96 (semanal de 2 años 0,64) [1].',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año (Yahoo) [1]. Grainger cotizó a 16-21 veces el BPA ajustado del año siguiente entre 2018 y 2022 y se revalorizó desde 2023 (21 veces) y 2024 (27 veces) cuando el mercado premió el salto de márgenes y el ROIC por encima del 40 %; con tipos al 5 %, el múltiplo no ha vuelto atrás. Hoy, a ≈ 27 veces nuestro BPA de los próximos doce meses, está por encima de su mediana adelantada de cinco años (≈ 21 veces) y cerca del máximo de 2024 (detalle en la regla a 12 meses).',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Distribuidores industriales cotizados de EE. UU. y Reino Unido con clientes profesionales: Fastenal y MSC (competidores directos en MRO), Applied (componentes industriales), Wesco y Ferguson (eléctrico, fontanería), Watsco (climatización) y Diploma y RS (especialistas europeos). Fuera MonotaRO (filial consolidada), Amazon (no comparable en negocio ni múltiplo), Würth (no cotiza) y Bunzl (consumibles no industriales). Todos con datos de Yahoo del 21-oct-2026 [2]; libras a dólares con el BCE [11]; ROIC y rentabilidad por FCF de la ficha sectorial del 14-oct cuando existen [10].',
    empresas: comparables,
    comentario: `Grainger cotiza a ≈ 26 veces el BPA adelantado de consenso, por encima de la mediana de los comparables (${String(medPer).replace('.', ',')} veces) y por debajo de Fastenal (37 veces) y Diploma (28) [2]. La prima frente a la mediana se justifica en parte: ROIC por encima del 30 % (con Fastenal), margen EBITDA del 17 % frente al 9-14 % de MSC, Applied, Ferguson o Wesco, y crecimiento orgánico del 12-14 % en 2026 [2, 10]. Usaríamos el PER (mismo criterio GAAP en EE. UU.); el EV/EBITDA de Yahoo de Grainger mezcla los minoritarios de MonotaRO a valor contable.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Foundation Building Materials (distribución de materiales de interior)', comprador: 'Lowe\'s', ev: 8800, ev_ventas: r2(8800 / 6500), ev_ebitda: r1(8800 / 635), prima_pct: null, excluir: false, comentario: 'EBITDA ajustado pro forma 2024 de 635 M y ventas de 6.500 M [7].' },
      { fecha: '2025-06', objetivo: 'GMS (distribución de placas de yeso y techos)', comprador: 'Home Depot (SRS)', ev: 5500, ev_ventas: r2(5500 / 5514), ev_ebitda: r1(5500 / 422), prima_pct: null, excluir: false, comentario: 'Valor empresa del comunicado; EBITDA GAAP de FY2025 del XBRL [8].' },
      { fecha: '2025-03', objetivo: 'Beacon Roofing Supply (distribución de tejados)', comprador: 'QXO', ev: 11000, ev_ventas: r2(11000 / 9763), ev_ebitda: r1(11000 / 867), prima_pct: null, excluir: false, comentario: 'Valor con deuda del comunicado; EBITDA GAAP 2024 del XBRL [9].' },
      { fecha: '2024-03', objetivo: 'SRS Distribution (distribución especializada para profesionales)', comprador: 'Home Depot', ev: 18250, ev_ventas: null, ev_ebitda: 16.1, prima_pct: null, excluir: false, comentario: '≈ 16,1x el EBITDA ajustado 2023e según el comprador [6].' },
    ],
    comentario: 'Las compras recientes de distribuidores para profesionales en EE. UU. se pagaron a 12,7-16,1 veces el EBITDA, con control y sinergias [6-9]. Grainger cotiza a ≈ 20 veces su EBITDA de doce meses sin prima de control. No es objetivo de compra verosímil (≈ 63.000 M USD de capitalización) y vendió Cromwell sin múltiplo publicado. Son distribuidores de construcción, no de MRO: referencia lejana, sin peso en la valoración.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA del consenso y BPA de 2028e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (dos ejercicios, sin EBITDA); 2) MarketScreener (no abre sin sesión); 3) Nasdaq/Zacks (solo BPA del año y el siguiente)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'compras de distribuidores MRO puros con múltiplo publicado', tipo: 'Complemento', intentos: '1) 10-K 2025 de Grainger (venta de Cromwell, sin múltiplo); 2) 8-K de Applied Industrial y DSG (sin múltiplo); 3) prensa sectorial (MDM, de pago)', decision: 'Se usan distribuidores de construcción, marcados como referencia lejana' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $GWW (30 mensajes, mayo a octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-16', url: 'https://api.stocktwits.com/api/2/streams/symbol/GWW.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y titulares sobre Grainger (febrero-octubre de 2026: «Great Company, At A Bad Price», «Why I Bought The Post-Earnings Pullback», ClearBridge sale de GWW)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://seekingalpha.com/api/sa/combined/GWW.xml' },
];
const E = {
  _estado: 'Completa. Stocktwits y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($GWW)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mensajes alcistas en julio («cada gráfico es increíble», «imprime dinero») con la acción en máximos; en octubre, «el sentimiento está más frío que el negocio», salida de dinero institucional y la cotización bajo las medias de 20 y 50 sesiones; mucha operativa de opciones [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'Conviven «gran empresa a mal precio» (junio) y «compré la caída tras resultados» (agosto); titulares de rebaja de Stephens por valoración y de un fondo de crecimiento (ClearBridge) que vende la posición en octubre [2].' },
    ],
    temas: [
      { tema: 'Valoración (PER de 26-29 veces)', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos les dan la razón en parte: ≈ 27 veces nuestro BPA de doce meses frente a una mediana adelantada de ≈ 21 veces en cinco años.' },
      { tema: 'Calidad del negocio y del equipo', postura: 'Alcista', peso: 'Alto', contraste: 'Confirmado: ROIC por encima del 30 %, guía cumplida y subida dos veces en 2026.' },
      { tema: 'Calidad del margen (devoluciones de aranceles)', postura: 'Dividida', peso: 'Medio', contraste: 'Correcto: 43 M de IEEPA en el 2T26 que no se repiten; la caída del 5,2 % del 4-ago lo descontó.' },
      { tema: 'Dividendo creciente (54 años)', postura: 'Alcista', peso: 'Bajo', contraste: 'Cierto, pero la rentabilidad por dividendo es del 0,7 %.' },
    ],
    lectura: 'Los particulares admiran la empresa y discuten el precio; no hay euforia ni capitulación. Tras el máximo de julio el tono se ha enfriado (salida de un fondo de crecimiento, rebaja de Stephens por valoración), lo que coincide con la lectura del informe: el negocio es de calidad y el múltiplo, exigente. El foro no aporta un riesgo que el informe no recoja.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, 'MonotaRO USD', monoCapUsd, comparables.map((c) => `${c.ticker} ${c.per_ntm} cap ${c.capitalizacion} g ${c.crecimiento_pct} m ${c.margen_ebitda_pct} dn ${c.dn_ebitda}`));
