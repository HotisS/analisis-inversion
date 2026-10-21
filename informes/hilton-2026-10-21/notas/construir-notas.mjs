// Escribe las notas A-E de Hilton Worldwide Holdings (corte 2026-10-21) a partir de los documentos de notas/docs
// (10-K 2025, 10-Q 2T26, notas de resultados 8-K de 2018 a 2T26, proxy 2026, 8-K de 2025-2026), del XBRL de la SEC
// (cuentas-xbrl.json), de bolsa.json (Yahoo, cierre del 20-oct-2026), de yahoo-datos.json (Yahoo quoteSummary del
// 21-oct-2026, 11:26 UTC, antes de abrir Nueva York) y de form4.json (SEC).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/hilton-2026-10-21/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1585689';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas, notas de deuda, adquisiciones, ingresos, Hilton Honors, segmentos, riesgos)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000007/hlt-20251231.htm` },
  { id: 2, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2025 (conciliaciones no GAAP, guía 2026)', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000005/q42025earningsrelease.htm` },
  { id: 3, titulo: 'Hilton Reports Second Quarter Results 2026 (cuenta, RevPAR, cartera de proyectos, deuda, guía)', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000042/q22026earningsrelease.htm` },
  { id: 4, titulo: 'Form 10-Q del segundo trimestre de 2026 (balance, flujos, recompras, RevPAR por región)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000043/hlt-20260630.htm` },
  { id: 5, titulo: 'Hilton Reports First Quarter Results 2026', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-04-28', url: `${ED}/000158568926000031/q12026earningsrelease.htm` },
  { id: 6, titulo: 'Hilton Reports Third Quarter Results 2025', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-10-22', url: `${ED}/000158568925000158/q32025earningsrelease.htm` },
  { id: 7, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2024', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-02-06', url: `${ED}/000158568925000006/q42024earningsrelease.htm` },
  { id: 8, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2023', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2024-02-07', url: `${ED}/000158568924000023/q42023earningsrelease.htm` },
  { id: 9, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2022', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2023-02-09', url: `${ED}/000158568923000032/q42022earningsrelease.htm` },
  { id: 10, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2021', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2022-02-16', url: `${ED}/000158568922000009/a2021-q4earningsrelease.htm` },
  { id: 11, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2020', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2021-02-17', url: `${ED}/000158568921000011/a2020-q4earningsrelease.htm` },
  { id: 12, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2019', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2020-02-11', url: `${ED}/000158568920000010/a2019-q4earningsrelease.htm` },
  { id: 13, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2018', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2019-02-13', url: `${ED}/000158568919000032/a2018-q4earningsrelease.htm` },
  { id: 14, titulo: 'XBRL company facts de Hilton (10-K): balance, flujos, intangibles, pasivos de contratos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001585689.json' },
  { id: 15, titulo: 'Form 10-K 2023 (balance de 2022 y 2023: marcas, contratos, pasivos de fidelidad)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-07', url: `${ED}/000158568924000027/hlt-20231231.htm` },
  { id: 16, titulo: 'Form 10-K 2021 (balance de 2020 y 2021)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2022-02-16', url: `${ED}/000158568922000013/hlt-20211231.htm` },
  { id: 17, titulo: 'Transcripción de la conferencia de resultados del 2T26 (generada por máquina)', editor: 'Platform Aeronaut', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://transcripts.platformaeronaut.com/transcripts/HLT-2Q26-transcript' },
];

// Base «ajustada» de Hilton (la de la guía, el consenso y el BPA ajustado):
//   ingresos = «total revenues, as adjusted» (sin los ingresos por reembolso de costes de los hoteles de terceros, con la
//              amortización de los costes de captación de contratos devuelta) [2, 7-13];
//   EBITDA   = EBITDA ajustado − pagos en acciones (los pagos en acciones son coste: el BPA ajustado ya los resta);
//   amortizaciones = D&A − amortización de la compra de 2007 (que el BPA ajustado excluye) + amortización de los costes de
//              captación de contratos (que el BPA ajustado sí resta, como menos ingreso);
//   resultado financiero = − gasto por intereses; beneficio = beneficio ajustado; impuestos = el resto (tipo 27-29 %).
const C = [
  // periodo, ingresos, ebitdaAj, pagosAcc, DyA, amortCompra, amortCAC, interes, benefAj, minor, bpaAj, dpa, acc
  ['2018', 3695, 2101, 127, 325, 204, 27, 371, 1041, 5, 3.42, 0.60, 305],
  ['2019', 3795, 2308, 154, 346, 202, 29, 414, 1129, 5, 3.90, 0.60, 290],
  ['2020', 1629, 842, 97, 331, 164, 29, 429, 28, -5, 0.10, 0.15, 278],
  ['2021', 2476, 1629, 193, 188, 47, 32, 397, 584, -3, 2.08, 0, 281],
  ['2022', 3774, 2599, 162, 162, 45, 38, 415, 1357, 2, 4.90, 0.45, 277],
  ['2023', 4451, 3089, 169, 147, 37, 43, 464, 1638, 10, 6.20, 0.60, 264],
  ['2024', 4796, 3429, 176, 146, 5, 50, 569, 1780, 4, 7.12, 0.60, 250],
  ['2025', 5011, 3725, 170, 177, 0, 57, 620, 1930, 4, 8.11, 0.60, 238],
];
const cuenta = C.map(([periodo, ingresos, ebA, sbc, da, pa, cac, int, ni, minor, bpa, dpa, acc]) => {
  const ebitda = ebA - sbc, amort = da - pa + cac, ebit = ebitda - amort, bai = ebit - int;
  return { periodo, ingresos, coste_ventas: null, gastos_generales: null, ebitda, amortizaciones: amort, ebit, resultado_financiero: -int, bai,
    impuestos: bai - ni - minor, minoritarios: minor, beneficio_neto: ni, gastos_financieros: int, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc };
});
const anios = C.map((c) => c[0]);
// Intangibles = marcas + contratos de gestión y franquicia + otros (10-K 2025, 2023 y 2021; 2018-2019 del XBRL) [1, 15, 16, 14].
const INTANG = { 2018: 4869 + 872, 2019: 4877 + 780, 2020: 4904 + 653 + 266, 2021: 4883 + 758 + 194, 2022: 4840 + 887 + 161, 2023: 4846 + 1064 + 173, 2024: 4990 + 1235 + 194, 2025: 5023 + 1471 + 206 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  // US GAAP: los arrendamientos operativos ya están en el EBITDA y no van a la deuda; los financieros están en `deuda_financiera`.
  const o = { ...b, existencias: 0, activos_contrato: null, pasivos_contrato: null, intangibles: INTANG[b.periodo], arrendamientos: 0 };
  delete o.fin; return o;
});
// Inversión = inmovilizado + software capitalizado (notas de resultados; incluye la parte que reembolsan terceros) [2, 7-13].
const CAPEX = { 2018: 159, 2019: 205, 2020: 92, 2021: 79, 2022: 102, 2023: 247, 2024: 198, 2025: 185 };
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: CAPEX[f.periodo], pagos_arrendamientos: f.pagos_arrendamientos ?? 0,
  adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: 0, intereses_en_financiacion: 0,
}));
const trim = (p, ing, g, ebA, sbc, bpa) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: ebA - sbc, margen_ebitda_pct: r1((ebA - sbc) / ing * 100), bpa, vs_consenso: null });

const A = {
  _estado: 'Completa. Cuenta en la base ajustada de Hilton (sin reembolsos de costes de los hoteles, con los pagos en acciones como coste), la de la guía, el consenso y el BPA ajustado; balance y flujos US GAAP del XBRL de la SEC comprobados con los 10-K y las notas de resultados.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5166, ebitda: 3692, ebit: 3438, beneficio_neto: 1975, bpa: 8.49, dpa: 0.60, dpa_extraordinario: 0, fcf: 1898, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Compra de la marca Graduate (210 M USD, mayo de 2024) y del control de Sydell Group, dueño de NoMad (abril de 2024); compras de marcas y contratos, sin hoteles [1].' },
    ],
    comentario: 'Los ingresos ajustados pasaron de 3.795 M USD en 2019 a 5.011 M en 2025 (+32 %) y el EBITDA ajustado de 2.308 a 3.725 M (+61 %): el margen ajustado de la empresa subió del 60,8 % al 74,4 % [12, 2]. 2020 (1.629 M de ingresos y BPA ajustado de 0,10 USD) y 2021 no son comparables por la pandemia [11, 10]. La palanca es el negocio de comisiones: las comisiones de franquicia y licencia crecieron un 6,9 % en 2025 (2.780 M), con 60 M por hoteles nuevos y 104 M más de licencias (tarjetas de crédito con marca compartida y Hilton Grand Vacations), mientras el RevPAR comparable de los franquiciados bajó un 0,8 % [1]. Los hoteles en propiedad o arrendados (1.233 M de ingresos y 177 M de EBITDA de segmento en 2025) diluyen el margen y bajan año a año [1]. En el 1S26 los ingresos ajustados subieron un 6,4 % y el EBITDA ajustado un 8,4 %, con el RevPAR +3,9 % [3].',
    ajustes: 'La cuenta usa las medidas de Hilton: ingresos «as adjusted» y BPA y beneficio ajustados por partidas especiales [2]. Quedan fuera: los ingresos por reembolso de costes de los hoteles (7.085 M USD en 2025) y los gastos reembolsados (7.550 M), cuya diferencia (−465 M en 2025, −557 M en 2024) es temporal porque Hilton tiene derecho contractual a recuperarla de los propietarios; las reservas para mobiliario de los hoteles arrendados (73 M), la amortización de la compra de Blackstone de 2007 (202 M en 2019, 0 en 2025), pérdidas por garantías de deuda (50 M en 2024) y ajustes fiscales [2, 7, 12]. Nuestro EBITDA resta los pagos en acciones (170 M en 2025), que el EBITDA ajustado de la empresa suma: es la misma base que el BPA ajustado [2]. En GAAP el BPA diluido de 2025 fue 6,12 USD frente a 8,11 del ajustado [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 1252, null, 904, 44, 1.92),
      trim('4T24', 1209, 4.6, 858, 36, 1.76),
      trim('1T25', 1079, null, 795, 36, 1.72),
      trim('2T25', 1339, null, 1008, 55, 2.20),
      trim('3T25', 1298, 3.7, 976, 44, 2.11),
      trim('4T25', 1295, 7.1, 946, 35, 2.08),
      trim('1T26', 1197, 10.9, 901, 45, 2.01),
      trim('2T26', 1376, 2.8, 1054, 61, 2.29),
    ],
    ultima_presentacion: 'En el 2T26 (28-jul-2026) el BPA ajustado subió un 4 %, a 2,29 USD, el RevPAR comparable un 3,9 % (EE. UU. +5,4 %, Europa +4,3 %, Oriente Medio y África −29,5 %, Asia-Pacífico +1,2 %) y la red neta un 6,1 % interanual [3]. Hilton subió la guía de 2026: RevPAR +3,0-3,5 % (desde +2-3 % en abril y +1-2 % en febrero), EBITDA ajustado de 4.040-4.080 M y BPA ajustado de 8,89-9,01 USD, sin recompras futuras [3, 5, 2]. El director financiero atribuyó 17 M del trimestre a partidas que se esperaban en el segundo semestre, y la guía del 3T (BPA ajustado de 2,28-2,34) quedó por debajo de lo que esperaba el mercado [3]. En la conferencia el consejero delegado dijo que la mitad del RevPAR del trimestre venía de hechos puntuales (Mundial, calendario) y que EE. UU. «empieza 2027 en el 2-2,5 %»; reiteró un crecimiento de la red del 6-7 % «en el futuro previsible» con 541.000 habitaciones en cartera [17]. Los analistas preguntaron por la salud de los propietarios (costes de seguros, energía y personal), la recuperación en forma de «C» de la gama media y el dinero clave del Waldorf Astoria Miami Beach; la dirección no dio cifras de 2027, ni de dinero clave por hotel, ni de la tarjeta de crédito [17]. Próximo dato: 3T26 el 27-oct-2026 [3].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 25 }, { anio: '2027', importe: 619 }, { anio: '2028', importe: 12 },
      { anio: '2029', importe: 1360 }, { anio: '2030', importe: 4124 }, { anio: '2031+', importe: 7319 },
    ],
    liquidez: 'Caja de 1.064 M USD (55 M restringidos) y línea de crédito con garantía de 2.000 M, de la que quedaban 1.894 M disponibles tras 106 M de avales, a 30-jun-2026 [3]. La línea se amplió hasta marzo de 2031 en marzo de 2026 [4]. Sin vencimientos relevantes hasta el bono de 600 M de abril de 2027 [3].',
    rating: null,
    coste_deuda_pct: 5.0,
    vida_media_anios: null,
    otros_pasivos: 'Pasivo del programa Hilton Honors de 3.077 M USD y ingresos diferidos de 2.532 M a 30-jun-2026 (1.514 M de ellos de Honors y 825 M de cuotas de entrada de propietarios a fin de 2025): son puntos cobrados a los hoteles y a los socios de las tarjetas (American Express) que se cancelan con estancias, no con caja del accionista, y que crecen con el sistema (+481 M en 2025) [4, 1]. Garantías de deuda a propietarios de algunos hoteles gestionados (pérdida de 50 M en 2024) [1]. Opción de venta de los minoritarios de Sydell (NoMad) desde el 2T2030 a un múltiplo de su beneficio [1]. Arrendamientos operativos de 730 M (fuera de la deuda en US GAAP; el alquiler de 214 M de 2025 ya está en el EBITDA) [1]. Inspección fiscal federal de 2011-2020 en curso; la disputa sobre Honors se dio por resuelta [1].',
    comentario: 'El patrimonio es negativo (−6.303 M USD a 30-jun-2026) porque Hilton devuelve más de lo que gana con deuda: 3.300 M en 2025 y una guía de 3.500 M en 2026 [2, 3]. La deuda bruta pasó de 7.993 M en 2019 a 12.363 M en 2025 y a 13.343 M en junio de 2026 (13.400 M de nominal al 5,03 % medio) [12, 2, 3]. La deuda neta de la empresa es de 11.489 M a fin de 2025, 3,1 veces el EBITDA ajustado (2,9 en 2024), y ≈ 3,2 veces a junio con el EBITDA de 12 meses (estimación propia) [2, 3]. El circulante comercial (clientes menos proveedores) es de 1.314 M (26 % de los ingresos ajustados) porque los clientes incluyen lo que deben los propietarios por los programas, pero lo financian de sobra los 5.400 M de pasivos de Honors y diferidos [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta: el flujo operativo de 2025 fue de 2.129 M USD y, restados 185 M de inversión en inmovilizado y software, el flujo libre fue de 1.944 M frente a un beneficio ajustado de 1.930 M [1, 2]. Ese flujo ya descuenta el dinero clave a propietarios (231 M netos en 2025, 105 M en 2024 y 233 M en 2023), que va en explotación, y lleva el crecimiento de los pasivos de Honors y diferidos [2, 7, 8]. Guía de 2026: dinero clave e inversión, sin lo que reembolsan terceros, de ≈ 300 M [3]. Usos de 2025: recompras de 3.182 M y dividendos de 143 M, por encima del flujo libre: la diferencia se pagó con deuda [14]. En el 1S26 el flujo operativo fue de 1.090 M y las recompras de 1.787 M [4].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades) sobre las cuentas de 2025; auditor desde 2002; asunto clave de auditoría: el programa de fidelidad Hilton Honors [1]',
    comentario: 'Las cifras son limpias pero tienen tres capas. Primera, los reembolsos: 7.085 M USD de ingresos y 7.550 M de gastos en 2025 que no son del accionista; la diferencia negativa (−465 M) se debe a que Hilton gasta antes de cobrar a los propietarios y se excluye del ajustado [2, 1]. Segunda, Honors: los puntos se reconocen al canjearse con estimaciones actuariales de coste por punto y de puntos que no se canjean; un cambio de supuestos mueve las licencias y el pasivo, y el auditor lo trata como asunto clave [1]. Tercera, el dinero clave: los pagos a propietarios se activan (1.471 M de contratos netos) y se amortizan restando ingresos (57 M en 2025), así que no aparecen como inversión [1, 2]. Los pagos en acciones (170 M, 3,4 % de los ingresos ajustados) son un coste real que el EBITDA ajustado suma [2]. Altman y ROE pierden sentido con patrimonio negativo; el Beneish no se calcula con la cuenta en esta base.',
    senales: [
      { senal: 'Patrimonio negativo por recompras', nivel: 'Baja', comentario: '−5.388 M USD a fin de 2025 y −6.303 M a junio de 2026: invalida ROE y Altman; la solvencia la da el flujo libre (≈ 1.900 M) y la deuda neta de ≈ 3 veces el EBITDA [1, 3].' },
      { senal: 'Diferencia negativa de los reembolsos', nivel: 'Media', comentario: '−557 M USD en 2024, −465 M en 2025 y −120 M en el 1S26: Hilton dice que la recupera de los propietarios; si no, sería coste del accionista [2, 3].' },
      { senal: 'Estimaciones de Hilton Honors', nivel: 'Media', comentario: 'Pasivo de 2.913 M y diferidos de Honors de 1.514 M a fin de 2025 que dependen del coste por punto y de los puntos no canjeados; asunto clave de auditoría [1].' },
      { senal: 'Dinero clave activado', nivel: 'Baja', comentario: '231 M USD netos en 2025 frente a 105 M en 2024; se amortiza contra ingresos y el EBITDA ajustado lo devuelve [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Hilton reparte casi todo el flujo libre y más: dividendo trimestral fijo de 0,15 USD por acción (0,60 al año, ≈ 0,2 % de rentabilidad) y recompras periódicas; devolución de 3.300 M USD en 2025 y guía de ≈ 3.500 M en 2026 (2.034 M hechos hasta julio) [2, 3]. En enero de 2026 el consejo amplió la autorización de recompra en 3.500 M [2]. La empresa usa deuda para mantener el apalancamiento cerca de 3 veces el EBITDA ajustado [2]. Inversión propia pequeña: dinero clave e inversión de ≈ 300 M al año sin lo reembolsado [3].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Marca Graduate (hoteles de ciudades universitarias) y sus contratos de franquicia', importe: 210, ev_ebitda: null, financiacion: 'Caja', resultado: 'De 35 hoteles a la nueva marca Undergraduate (gama media alta) lanzada en junio de 2026 [1, 3].' },
      { anio: '2024', objetivo: 'Control de Sydell Group (marca NoMad)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Un hotel abierto a junio de 2026; opción de venta de los minoritarios desde 2030 [1, 3].' },
    ],
    comentario: 'La dirección asigna bien el capital en un negocio que casi no lo necesita: de 2019 a 2025 el EBITDA ajustado subió de 2.308 a 3.725 M USD con una inversión de 80-250 M al año, y las acciones diluidas bajaron de 290 a 238 M (−18 %) por las recompras [12, 2]. Las compras son marcas pequeñas, sin deterioros. Hilton crea marcas propias en vez de comprarlas (Spark, Tempo, Motto, LivSmart, Apartment Collection, Undergraduate, Select) [3, 5]. El riesgo es el apalancamiento: devolver más de lo que se gana dejó el patrimonio en −6.303 M y la deuda neta en ≈ 3 veces el EBITDA; en 2020 Hilton suspendió el dividendo y las recompras [3, 11].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Gestión y franquicia', descripcion: 'Comisiones de franquicia y licencia (marca, reservas, Honors, tarjetas de crédito, Hilton Grand Vacations) y de gestión de 9.300 hoteles de terceros; incluye lo que cobra a sus propios hoteles.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2019', ingresos: 2315, resultado: null }, { periodo: '2020', ingresos: 1138, resultado: null }, { periodo: '2021', ingresos: 1809, resultado: null }, { periodo: '2022', ingresos: 2619, resultado: null }, { periodo: '2023', ingresos: 3055, resultado: 3055 }, { periodo: '2024', ingresos: 3339, resultado: 3339 }, { periodo: '2025', ingresos: 3575, resultado: 3575 }] },
      { nombre: 'Propiedad', descripcion: 'Unos 46 hoteles en propiedad o arrendamiento, la mayoría en Europa; margen bajo.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2019', ingresos: 1422, resultado: null }, { periodo: '2020', ingresos: 421, resultado: null }, { periodo: '2021', ingresos: 598, resultado: null }, { periodo: '2022', ingresos: 1076, resultado: null }, { periodo: '2023', ingresos: 1244, resultado: 150 }, { periodo: '2024', ingresos: 1255, resultado: 172 }, { periodo: '2025', ingresos: 1233, resultado: 177 }] },
      { nombre: 'Otros, corporativo y eliminaciones', descripcion: 'Otros ingresos, amortización del dinero clave devuelta y eliminación de lo que el segmento de comisiones cobra a los hoteles propios; resultado = corporativo menos pagos en acciones.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2019', ingresos: 58, resultado: null }, { periodo: '2020', ingresos: 70, resultado: null }, { periodo: '2021', ingresos: 69, resultado: null }, { periodo: '2022', ingresos: 79, resultado: null }, { periodo: '2023', ingresos: 152, resultado: -335 }, { periodo: '2024', ingresos: 202, resultado: -258 }, { periodo: '2025', ingresos: 203, resultado: -197 }] },
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 79.1 }, { nombre: 'Resto del mundo', peso_pct: 20.9 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Habitaciones en el sistema (miles)', valor_anterior: '1.267 (2024, estimación con la red neta)', valor_actual: '1.351 (2025); 1.385 (jun-26)', variacion: '+6,7 % neto en 2025', comentario: '+6,1 % interanual a junio de 2026; guía de 6-7 % en 2026 [1, 3, 2].' },
      { kpi: 'Cartera de proyectos (miles de habitaciones)', valor_anterior: '515 (sep-25)', valor_actual: '520,5 (dic-25); 541,3 (jun-26)', variacion: '+6 % interanual', comentario: '≈ 40 % del sistema; casi la mitad en construcción y más de la mitad fuera de EE. UU. [2, 3].' },
      { kpi: 'RevPAR comparable del sistema', valor_anterior: '+2,7 % (2024)', valor_actual: '+0,4 % (2025); +3,9 % (1S26)', variacion: 'Mejora', comentario: 'Guía de 2026: +3,0-3,5 % (desde +1-2 % en febrero) [7, 2, 3].' },
      { kpi: 'Socios de Hilton Honors', valor_anterior: '≈ 211 M (2024, estimación con el +15 %)', valor_actual: '243 M (2025); 260 M (oct-26)', variacion: '+15 %', comentario: 'Los socios que reservan directamente ganan puntos; base del canal directo [1, 3].' },
      { kpi: 'Margen de EBITDA ajustado (empresa)', valor_anterior: '71,5 % (2024)', valor_actual: '74,4 % (2025); 76,0 % (1S26)', variacion: '+2,9 puntos', comentario: 'Sube por la mezcla: crecen las comisiones y bajan los hoteles en propiedad [2, 3].' },
    ],
    clientes: 'Hilton cobra a ≈ 9.300 hoteles de terceros: 8.404 franquiciados o con licencia (1,08 M de habitaciones) y 882 gestionados (266.000), frente a solo 46 en propiedad o arrendados (15.000) [3]. La franquicia paga un canon sobre los ingresos por habitación y cuotas de programas; la gestión, una base sobre los ingresos del hotel y un incentivo sobre su beneficio [1]. Los contratos son largos (10-20 años en franquicia y 20-30 en gestión, según la vida de amortización de sus costes) [1]. Ningún propietario pesa de forma relevante. El poder de precios se ve en el canon efectivo: en 2025 las comisiones de los franquiciados comparables subieron 8 M con el RevPAR −0,8 %, por la subida de las tarifas pactadas [1]. Licencias: tarjetas con American Express, Hilton Grand Vacations y 562 hoteles socios [1, 3].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q 2T26 (grep «Moody», «S&P», «rating»): no lo publican; 2) 8-K de las emisiones de mayo de 2026 y diciembre de 2025: no lo citan; 3) búsqueda web de una acción de S&P o Moody\'s en 2026: sin resultado fiable', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) 10-K 2025 nota de deuda: da vencimientos, no vida media; 2) 10-Q 2T26: igual; 3) cálculo con el calendario: no se hace por los préstamos a plazo de 2030 con amortización variable', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'crecimiento de 3T24, 1T25 y 2T25', tipo: 'Complemento', intentos: '1) Notas de resultados de esos trimestres no descargadas (solo los comparativos de 3T25, 1T26 y 2T26); 2) 10-K 2025 (solo anual); 3) derivado de los acumulados: no hay acumulados de 2023 por trimestre', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia y ESG
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 (competencia, Hilton Honors, riesgos: canales de terceros y grandes modelos de lenguaje)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000007/hlt-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (RevPAR por región: EE. UU., Oriente Medio, China)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000043/hlt-20260630.htm` },
  { id: 3, titulo: 'Hilton Reports Second Quarter Results 2026 (RevPAR por región y marca, sistema, cartera)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000042/q22026earningsrelease.htm` },
  { id: 4, titulo: 'Hilton Announces Planned Transfer of Stock Listing to Nasdaq (historia: 1946, 2013, de 10 a 28 marcas)', editor: 'Hilton Worldwide Holdings Inc. (8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-10-20', url: `${ED}/000158568926000045/projectrepositionrelease.htm` },
  { id: 5, titulo: 'InterContinental Hotels Group, Annual Report 2025 y Half Year Results 2026: tamaño de la industria (≈ 750.000 M USD), cinco grandes 24 %, oferta de EE. UU. (STR) — leídos en el informe de IHG de este repositorio (20-oct-2026)', editor: 'InterContinental Hotels Group PLC', tipo: 'Sectorial', fecha: '2026-08-11', url: 'https://www.ihgplc.com/~/media/Files/I/Ihg-Plc/results/2026/half-year-results-2026/stock-exchange-announcement.pdf' },
  { id: 6, titulo: 'XBRL de los 10-K 2025 de Marriott, Wyndham, Choice y Airbnb y ESEF de Accor (ingresos y resultado de explotación), recogidos en el informe de IHG de este repositorio', editor: 'SEC EDGAR y filings.xbrl.org', tipo: 'Primaria', fecha: '2026-02-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001048286.json' },
  { id: 7, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2020 y 2019 (RevPAR −56 % en 2020)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2021-02-17', url: `${ED}/000158568921000011/a2020-q4earningsrelease.htm` },
  { id: 8, titulo: 'Hilton Introduces the Hilton AI Planner', editor: 'Hospitality Net', tipo: 'Prensa', fecha: '2026-03-11', url: 'https://www.hospitalitynet.org/' },
  { id: 9, titulo: 'Hilton CEO calls the rise of AI «unstoppable»', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://finance.yahoo.com/quote/HLT/news/' },
  { id: 10, titulo: 'Hilton removes Minneapolis hotel after franchise refuses to host US immigration agents', editor: 'Reuters', tipo: 'Prensa', fecha: '2026-01-07', url: 'https://www.reuters.com/' },
  { id: 11, titulo: 'Hilton faces ADA lawsuit over bed heights in accessible hotel rooms', editor: 'Top Class Actions', tipo: 'Prensa', fecha: '2026-02-25', url: 'https://topclassactions.com/' },
  { id: 12, titulo: 'Hilton reaches $12M settlement with San Francisco banquet workers', editor: 'Daily Journal', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://www.dailyjournal.com/' },
  { id: 13, titulo: 'Transcripción de la conferencia del 2T26 (Navan, Hilton AI Planner, propietarios)', editor: 'Platform Aeronaut', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://transcripts.platformaeronaut.com/transcripts/HLT-2Q26-transcript' },
  { id: 14, titulo: 'Hilton Reports Fourth Quarter and Full Year Results 2025 (RevPAR 2025 por región)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000005/q42025earningsrelease.htm` },
];
const B_ = {
  _estado: 'Completa. Tamaño del mercado y oferta del informe anual y los resultados de IHG (con STR), ya leídos en el informe de IHG del repositorio; competidores con XBRL; RevPAR de las notas de Hilton.',
  historia: {
    resumen: 'Conrad Hilton compró su primer hotel en 1919 en Cisco (Texas); en 1946 Hilton fue la primera hotelera en cotizar en la Bolsa de Nueva York [4]. En 2007 la compró Blackstone, que la sacó de nuevo a bolsa en diciembre de 2013 con 10 marcas y ≈ 4.100 hoteles en 90 países [4, 1]. Con Christopher Nassetta como consejero delegado desde 2007, Hilton se deshizo de los inmuebles: en 2017 separó los hoteles en propiedad (Park Hotels & Resorts) y el tiempo compartido (Hilton Grand Vacations), y quedó como empresa de marcas y comisiones [1]. Hoy tiene 28 marcas y más de 9.400 establecimientos en 144 países, ha pasado de ≈ 50 a 1.200 hoteles de lujo y estilo de vida y 260 M de socios de Honors [4]. El 5-nov-2026 pasa a cotizar en el Nasdaq [4].',
    hitos: [
      { anio: '1919', hito: 'Conrad Hilton compra su primer hotel en Cisco (Texas) [1].' },
      { anio: '1946', hito: 'Primera hotelera que cotiza en la Bolsa de Nueva York [4].' },
      { anio: '2007', hito: 'Blackstone compra Hilton; Christopher Nassetta, consejero delegado [1].' },
      { anio: '2013', hito: 'Vuelta a bolsa: 10 marcas y ≈ 4.100 hoteles [4].' },
      { anio: '2017', hito: 'Escisión de Park Hotels & Resorts y Hilton Grand Vacations: Hilton queda casi sin inmuebles [1].' },
      { anio: '2020', hito: 'Pandemia: RevPAR −56 %, BPA ajustado de 0,10 USD y dividendo y recompras suspendidos [7].' },
      { anio: '2024', hito: 'Compra de las marcas Graduate y NoMad [1].' },
      { anio: '2026', hito: 'Marcas nuevas (Apartment Collection, Select by Hilton, Undergraduate) y paso al Nasdaq el 5-nov [3, 4].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Hilton es la segunda hotelera del mundo por habitaciones: 9.332 hoteles y 1,36 M de habitaciones en junio de 2026, más 121 complejos de tiempo compartido de Hilton Grand Vacations [3]. Tiene 28 marcas, del lujo (Waldorf Astoria, Conrad, LXR) a la gama media y económica (Hampton, con 3.230 hoteles; Hilton Garden Inn, Home2 Suites, Tru, Spark) [3]. No suele ser dueña de los hoteles: el 90 % de los hoteles son franquicias o licencias y el 9 % contratos de gestión; solo 46 son propios o arrendados [3]. El 63 % de las habitaciones está en EE. UU., el 18 % en Asia-Pacífico y el 10 % en Europa [3, 2]. Vende a dos clientes: los propietarios, que pagan por la marca, la central de reservas y la fidelidad, y los huéspedes, que reservan sobre todo en sus canales directos con Hilton Honors (260 M de socios) [4, 1].',
    como_gana_dinero: 'Cobra un porcentaje de los ingresos por habitación de los hoteles franquiciados (canon) y de los ingresos y beneficios de los gestionados, más licencias por las tarjetas de crédito de marca compartida, Hilton Grand Vacations y los hoteles socios [1]. Casi no invierte: los propietarios ponen el hotel, y Hilton solo paga dinero clave para firmar algunos contratos (≈ 300 M USD al año con la inversión propia) [3]. Por eso el 74 % de los ingresos ajustados se convierte en EBITDA ajustado [3]. El crecimiento sale de dos palancas: más habitaciones (6-7 % al año) y más RevPAR (precio por habitación disponible, ligado al ciclo de viajes); las licencias de tarjetas crecen con el gasto de los socios [3, 1]. Apalancamiento operativo alto: el coste del segmento de comisiones no se asigna y casi no crece. Estacionalidad suave, con el segundo y tercer trimestre más fuertes [3].',
  },
  sector: {
    definicion: 'Mercado relevante: la industria hotelera mundial, de la que Hilton cobra comisiones por marca, distribución, fidelidad y gestión. IHG la cifra en ≈ 750.000 M USD de ingresos en 2025, con el 57 % de las habitaciones afiliadas a una cadena y un 24 % en manos de los cinco grandes [5]. Se usa esta cifra porque es la única con fuente primaria; la serie de años anteriores y posteriores es estimación propia con el crecimiento histórico (4,2 % anual) y el previsto de noches. Hilton tiene ≈ 7 % de las habitaciones del mundo (estimación propia: 1,36 M frente a ≈ 19 M, el mismo denominador que da el 5,5 % de IHG) [3, 5].',
    tamano: '≈ 750.000 M USD de ingresos de la industria hotelera mundial en 2025 [5]',
    unidad_serie: 'millones de USD (ingresos de la industria hotelera mundial; 2025 de IHG/STR, resto estimación propia)',
    serie: [{ anio: '2023', tamano: 690000 }, { anio: '2024', tamano: 720000 }, { anio: '2025', tamano: 750000 }, { anio: '2026e', tamano: 780000 }, { anio: '2027e', tamano: 810000 }, { anio: '2028e', tamano: 845000 }],
    tcac_historico_pct: 4.2, tcac_previsto_pct: 4.0, cr5_pct: 24, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Demanda de viajes (noches de hotel)', efecto: '+', horizonte: 'Estructural', evidencia: 'Noches +2,7 % anual en 2015-2025 y +3,6 % previsto hasta 2035 (Oxford Economics, citada por IHG) [5].' },
      { driver: 'Penetración de las marcas y conversiones', efecto: '+', horizonte: 'Estructural', evidencia: '57 % de las habitaciones son de cadena y el 79 % de la cartera mundial de proyectos (STR): las marcas ganan cuota todos los años [5].' },
      { driver: 'Ciclo de EE. UU. (63 % de las habitaciones de Hilton)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'RevPAR de EE. UU. de Hilton −0,8 % en 2025 (−2,3 % en el 3T25 y −1,6 % en el 4T25) y +3,4 % y +5,4 % en el 1T y 2T26, con el Mundial [14, 3].' },
      { driver: 'China y Asia-Pacífico', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Asia-Pacífico +1,1 % en 2025 y +2,9 % en el 1S26, pero el RevPAR de China bajó en el 1S26 por las restricciones a los viajes de funcionarios [14, 2].' },
      { driver: 'Oferta nueva', efecto: '+', horizonte: 'Cíclico', evidencia: 'Oferta neta de EE. UU. +0,4 % en 2026 y +0,8 % en 2027 (STR, citada por IHG): poca obra nueva sostiene el RevPAR y empuja las conversiones a marca [5].' },
      { driver: 'Geopolítica', efecto: '−', horizonte: 'Cíclico', evidencia: 'Oriente Medio y África −29,5 % de RevPAR en el 2T26 por el conflicto (3 % de las habitaciones de Hilton) [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Marriott, IHG, Hyatt, Wyndham y Accor compiten por firmar propietarios con marcas, fidelidad y dinero clave; Hilton pagó 231 M USD netos de dinero clave en 2025 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los propietarios son muchos y pequeños, pero sus márgenes sufren (seguros, energía, personal) y Hilton ha recortado cuotas de fidelidad para ayudarles (75-100 pb de margen) [13].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Booking y Expedia cobran comisiones altas por la reserva que no llega por el canal directo; los buscadores y los grandes modelos de lenguaje pueden desviar reservas, como avisa el 10-K [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta escala de fidelidad y tecnología: los cinco grandes tienen el 24 % del mundo y el 79 % de la cartera de proyectos es de marca [5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Alquileres turísticos (Airbnb: 12.241 M USD de ingresos en 2025) en ocio; agentes de IA que reserven fuera del canal propio [6, 1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El RevPAR del sistema creció un 2,7 % en 2024, un 0,4 % en 2025 y un 3,9 % en el 1S26, con EE. UU. saliendo de dos trimestres negativos gracias a la economía, los hechos especiales (Mundial) y poca oferta nueva [3, 14]. La dirección ve EE. UU. «empezando 2027 en el 2-2,5 %» [13]. Es un sector cíclico: en 2009 el RevPAR de EE. UU. cayó ≈ 17 % y en 2020 el de Hilton un 56 %, con el BPA ajustado de 3,90 a 0,10 USD [7]. En 2022 subió con la reapertura. Las comisiones caen menos que el RevPAR porque la red sigue creciendo.' },
    regulacion: 'No hay regulación de precios. Afectan las normas de franquicia de EE. UU. (FTC), las comisiones y la paridad de precios con las agencias en línea en Europa (Ley de Mercados Digitales) y las normas laborales de los hoteles gestionados, donde Hilton emplea al personal (≈ 182.000 personas) [1, 5]. Litigios recientes: acuerdo de 12 M USD con camareros de banquetes de San Francisco y demanda por accesibilidad (ADA) [12, 11].',
    tendencias: 'Tres tendencias. (1) Conversiones de hoteles independientes y marcas de colección (Curio, Tapestry, Select by Hilton con YOTEL), que aceleran la red sin obra nueva [3]. (2) Gama media y estancias largas en EE. UU. (Spark, LivSmart, Home2, Apartment Collection), donde Hilton crece más [3]. (3) Inteligencia artificial: Hilton lanzó en marzo de 2026 un planificador de viajes con IA y una conexión directa con Navan que se salta intermediarios; su consejero delegado llama a la IA «imparable» [8, 13, 9]. El riesgo es que los agentes de IA de Google u OpenAI ocupen el lugar del buscador y cobren como una agencia [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 7.1, posicion: '2.º grupo hotelero del mundo por habitaciones (1,36 M), tras Marriott (≈ 1,7 M); líder en gama media alta de EE. UU. con Hampton (3.230 hoteles) [3, 5]',
    competidores: [
      { nombre: 'Marriott International', pais: 'EE. UU.', ticker: 'MAR', ingresos: 26186, cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Mayor grupo; ingresos con reembolsos de costes (por eso el margen GAAP es bajo); más lujo e internacional [6].' },
      { nombre: 'InterContinental Hotels Group', pais: 'Reino Unido', ticker: 'IHG', ingresos: 2468, cuota_pct: 5.5, margen_ebit_pct: 51.3, comentario: 'Ingresos y resultado de segmentos reportables (sin Fondo del Sistema); modelo casi idéntico, red neta +5 % [5].' },
      { nombre: 'Wyndham Hotels & Resorts', pais: 'EE. UU.', ticker: 'WH', ingresos: 1429, cuota_pct: null, margen_ebit_pct: 28.1, comentario: 'Franquicia pura de gama económica en EE. UU. [6].' },
      { nombre: 'Choice Hotels International', pais: 'EE. UU.', ticker: 'CHH', ingresos: 1597, cuota_pct: null, margen_ebit_pct: 28.1, comentario: 'Franquicia de gama económica y media; compró Radisson Américas en 2022 [6].' },
      { nombre: 'Accor', pais: 'Francia', ticker: 'AC', ingresos: 6324, cuota_pct: null, margen_ebit_pct: 14.3, comentario: 'Líder en Europa, Oriente Medio y Asia; 5.639 M EUR convertidos a 1,1215 USD/EUR [6].' },
      { nombre: 'Airbnb', pais: 'EE. UU.', ticker: 'ABNB', ingresos: 12241, cuota_pct: null, margen_ebit_pct: 20.8, comentario: 'Sustituto en ocio; empieza a ofrecer hoteles [6].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'Hilton Honors: 260 M de socios (+15 % en 2025); más hoteles atraen más socios y al revés, y las tarjetas de American Express pagan licencias crecientes (+104 M en 2025 con HGV) [4, 1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Contratos de 10-20 años en franquicia y 20-30 en gestión; el dinero clave se amortiza en esos plazos [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '28 marcas; Hampton con 3.230 hoteles; cartera récord de 541.300 habitaciones (40 % del sistema) [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'La escala reparte tecnología, reservas y fidelidad: margen de EBITDA ajustado del 74,4 % frente al 51 % de margen de segmentos de IHG [2, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Los cinco grandes tienen el 24 % del mundo; pocos pueden igualar Honors y la red de distribución [5].' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, que los agentes de IA (Google, OpenAI) se conviertan en el nuevo intermediario y cobren como una agencia o rompan el vínculo con Honors; el 10-K ya cita los grandes modelos de lenguaje como riesgo para el canal directo (probabilidad media a cinco años) [1]. La segunda, la salud de los propietarios: costes al alza y tipos altos frenan la obra nueva y aumentan el dinero clave para firmar (probabilidad media) [13]. La tercera, la competencia por conversiones con Marriott, IHG y Wyndham, que sube el coste de firmar (probabilidad media) [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es el personal y la relación con los propietarios. Hilton emplea a ≈ 182.000 personas en hoteles gestionados y oficinas; los costes laborales los paga el propietario, pero los litigios recaen en Hilton (acuerdo de 12 M USD con camareros de San Francisco en 2026) [1, 12]. Las emisiones de los hoteles son de los propietarios; Hilton fija normas de marca. La reputación de la marca depende de franquiciados que no controla: en enero de 2026 retiró la marca a un hotel de Minneapolis que se negó a alojar a agentes de inmigración [10].',
    controversias: 'En 2026: hotel de Minneapolis expulsado del sistema por negarse a alojar a agentes de inmigración (enero) [10]; acuerdo de 12 M USD con camareros de banquetes de San Francisco (febrero) [12]; demanda colectiva por la altura de las camas en habitaciones adaptadas (febrero) [11]. Ninguna mueve las cifras.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K 2025 y proxy 2026 (grep «MSCI», «Sustainalytics», «CDP»): no las citan; 2) web de inversores de Hilton: no accesible sin navegador; 3) búsqueda web: sin una fuente primaria de la agencia', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas significativos', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: `${ED}/000158568926000023/hlt-20260401.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 14-may-2026 (votos)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${ED}/000158568926000037/hlt-20260514.htm` },
  { id: 3, titulo: 'Form 8-K: retiro de Christopher Silcock y cambios en la dirección (5-may-2026)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-05', url: `${ED}/000119312526205180/d29790d8k.htm` },
  { id: 4, titulo: 'Form 4 presentados entre el 21-oct-2025 y el 21-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001585689&type=4' },
  { id: 5, titulo: 'Notas de resultados anuales 2022-2025 (guía y real de cada año)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000005/q42025earningsrelease.htm` },
  { id: 6, titulo: 'Hilton Reports Second Quarter Results 2026 (guía de 2026 revisada)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000042/q22026earningsrelease.htm` },
  { id: 7, titulo: 'Jeff Moore has been appointed as EVP & Chief Technology Officer at Hilton', editor: 'Hospitality Net', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.hospitalitynet.org/' },
  { id: 8, titulo: 'Form 10-K 2025 (directivos)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000007/hlt-20251231.htm` },
];
const C_ = {
  _estado: 'Completa. Consejo, remuneración y accionistas del proxy 2026; votos de la junta de 2026 (8-K) y de 2025 (proxy); operaciones de directivos de los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Christopher J. Nassetta', cargo: 'Presidente ejecutivo de la compañía y consejero delegado (President & CEO)', desde: '2007', participacion_pct: 2.0, trayectoria: 'Antes consejero delegado de Host Hotels & Resorts (2000-2007). Con él Hilton pasó de 10 a 28 marcas y de ≈ 4.100 a 9.400 hoteles desde 2013, y el BPA ajustado de 3,42 USD en 2018 a 8,11 en 2025 [1, 5].' },
      { nombre: 'Kevin J. Jacobs', cargo: 'Director financiero (EVP & CFO)', desde: '2013', participacion_pct: 0.21, trayectoria: 'En Hilton desde 2008 (estrategia y desarrollo); director financiero desde 2013. Ha llevado la política de devolver todo el flujo con deuda ≈ 3 veces el EBITDA [1, 5].' },
      { nombre: 'Jonathan D. Gray', cargo: 'Presidente no ejecutivo del consejo', desde: '2007', participacion_pct: 0.32, trayectoria: 'Presidente y director de operaciones de Blackstone, que compró Hilton en 2007 y vendió su participación tras la salida a bolsa; preside el consejo desde 2007 [1].' },
      { nombre: 'Christopher W. Silcock', cargo: 'Presidente de marcas globales y servicios comerciales', desde: '2008', participacion_pct: 0.08, trayectoria: 'Se jubila en el 1T27; Laura Fuentes pasa a directora de marcas y Chris Wilroy entra en el comité ejecutivo [3].' },
      { nombre: 'Jeff Moore', cargo: 'Director de tecnología (EVP & CTO)', desde: '2026', participacion_pct: null, trayectoria: 'Puesto nuevo, cubierto con búsqueda externa en octubre de 2026; encargado de la plataforma de IA y del canal directo [3, 7].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'RevPAR +4-8 %; BPA ajustado 5,42-5,68 USD; EBITDA ajustado 2.800-2.900 M; red +5,0-5,5 %', real: 'RevPAR +12,6 %; BPA 6,20; EBITDA 3.089 M; red +4,9 %', cumplida: 'Parcial' },
      { anio: '2024', guia: 'RevPAR +2-4 %; BPA 6,80-6,94; EBITDA 3.330-3.380 M; red +5,5-6,0 %', real: 'RevPAR +2,7 %; BPA 7,12; EBITDA 3.429 M; red +7,3 %', cumplida: 'Sí' },
      { anio: '2025', guia: 'RevPAR +2-3 %; BPA 7,71-7,82; EBITDA 3.700-3.740 M; red +6-7 %', real: 'RevPAR +0,4 %; BPA 8,11; EBITDA 3.725 M; red +6,7 %', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Febrero: RevPAR +1-2 %; BPA 8,65-8,77; EBITDA 4.000-4.040 M; red +6-7 %', real: 'Julio: subida a RevPAR +3,0-3,5 %, BPA 8,89-9,01 y EBITDA 4.040-4.080 M; 1S26 BPA 4,30 (+10 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo muy estable y creíble: Nassetta lleva 19 años y Jacobs 13 como director financiero. En los tres últimos años el BPA ajustado batió siempre la guía de febrero (6,20 frente a 5,42-5,68; 7,12 frente a 6,80-6,94; 8,11 frente a 7,71-7,82), aunque el RevPAR quedó por debajo en 2025 (+0,4 % frente a +2-3 %): las recompras y los costes compensan el ciclo [5]. La sucesión es el riesgo: Nassetta tiene 63 años y no hay sucesor anunciado; Silcock se jubila en 2027 [1, 3].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Jonathan D. Gray', cargo: 'Presidente no ejecutivo', tipo: 'Otro externo', desde: '2007', comisiones: '—' },
      { nombre: 'Christopher J. Nassetta', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2007', comisiones: '—' },
      { nombre: 'Douglas M. Steenland', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2009', comisiones: 'Auditoría, Remuneración' },
      { nombre: 'Charlene T. Begley', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Gobierno (presidenta), Auditoría' },
      { nombre: 'Chris Carr', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Gobierno' },
      { nombre: 'Melanie L. Healey', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Raymond E. Mabus, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Gobierno' },
      { nombre: 'Marissa A. Mayer', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración' },
      { nombre: 'Elizabeth A. Smith', cargo: 'Consejera', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría (presidenta)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 92.0, voto_remuneracion_contra_pct: 7.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 27.67, fijo: 1.30, variable_corto: 2.97, variable_largo: 23.10, ratio_salario_medio: 549 },
    remuneracion: 'Remuneración total del consejero delegado en 2025: 27,67 M USD: salario de 1,30 M, bonus anual de 2,97 M, acciones de 17,32 M y opciones de 5,77 M [1]. El plan a largo plazo es 50 % acciones por objetivos, 25 % acciones restringidas y 25 % opciones; los objetivos a tres años pesan lo mismo: EBITDA ajustado, flujo libre por acción, crecimiento de la red y cuota de RevPAR (RPI) [1]. Premia el flujo por acción, que las recompras con deuda inflan. Hay política de recuperación (clawback) conforme a la SEC [1]. Ratio con el empleado mediano: 549 a 1 [1]. Voto consultivo: 92,5 % a favor y 7,4 % en contra en 2026 (189,7 M frente a 15,1 M) y ≈ 92 % a favor en 2025 [2, 1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.1, tipo: 'Institucional', variacion: 'Sin cambios relevantes notificados (13G/A de 2024) [1]' },
      { nombre: 'BlackRock', pct: 8.4, tipo: 'Institucional', variacion: '13G/A de enero de 2026 [1]' },
      { nombre: 'Consejeros y directivos (14 personas)', pct: 2.7, tipo: 'Directivos', variacion: 'Nassetta 2,0 % [1]' },
    ],
    insiders: [
      { fecha: '2026-02-17', persona: 'Christopher J. Nassetta (consejero delegado)', operacion: 'Venta', acciones: 114289, importe: 36.28 },
      { fecha: '2026-09-14', persona: 'Laura Fuentes (directora de personas, luego de marcas)', operacion: 'Venta', acciones: 7289, importe: 2.26 },
      { fecha: '2026-09-14', persona: 'Chris Carr (consejero)', operacion: 'Venta', acciones: 439, importe: 0.14 },
    ],
    control_y_defensas: 'Sin accionista de control: Vanguard (11,1 %) y BlackRock (8,4 %) son gestoras pasivas; Blackstone salió del capital tras la salida a bolsa [1]. Una acción, un voto; consejo reelegido cada año; presidente no ejecutivo (Jonathan Gray, de Blackstone) separado del consejero delegado y consejero independiente coordinador [1]. Siete de nueve consejeros son independientes y presiden las tres comisiones [1]. La venta de Nassetta de febrero de 2026 (114.289 acciones, 36,3 M USD) es el ejercicio de opciones a 41,41 USD que vencían y su venta el mismo día, ≈ 2,4 % de su participación [4].',
    alertas: [
      'Sucesión del consejero delegado sin plan público: Nassetta tiene 63 años y 19 en el cargo [1].',
      'Ventas de directivos en 12 meses de 38,7 M USD y ninguna compra; la mayor es el ejercicio de opciones que vencían del consejero delegado [4].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C_);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de Yahoo Finance: HLT, SPY y PEJ (herramientas/bolsa.mjs) y movimiento (herramientas/movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/HLT' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de Hilton y comparables (precio, capitalización, valor empresa, EBITDA, PER adelantado, consenso de BPA, recomendaciones y objetivos)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://query2.finance.yahoo.com/v10/finance/quoteSummary/HLT' },
  { id: 3, titulo: 'Hilton Reports Second Quarter Results 2026 (acciones en circulación el 23-jul-2026, guía de 2026, deuda y caja a 30-jun)', editor: 'Hilton Worldwide Holdings Inc. (8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000042/q22026earningsrelease.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026)', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000158568926000043/hlt-20260630.htm` },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Form 8-K y nota: traslado de la cotización al Nasdaq el 5-nov-2026', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-20', url: `${ED}/000158568926000045/hlt-20261020.htm` },
  { id: 8, titulo: 'Hilton Announces Third Quarter 2026 Earnings Release Date (27-oct-2026)', editor: 'Business Wire (vía Finviz)', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://finviz.com/news/397222/hilton-announces-third-quarter-2026-earnings-release-date' },
  { id: 9, titulo: 'Form 10-K 2025, nota 3: Graduate (210 M USD) y NoMad', editor: 'Hilton Worldwide Holdings Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${ED}/000158568926000007/hlt-20251231.htm` },
  { id: 10, titulo: 'Form 8-K de Choice Hotels: compra de Radisson Hotels Americas (675 M USD) y nota de Hyatt sobre Apple Leisure Group (2.700 M USD), recogidos en el informe de IHG del repositorio', editor: 'SEC EDGAR y Business Wire', tipo: 'Primaria', fecha: '2022-06-13', url: 'https://www.sec.gov/Archives/edgar/data/1046311/000119312522172398/d358861d8k.htm' },
  { id: 11, titulo: 'Seeking Alpha, titulares de HLT (RSS): Deutsche Bank a comprar (13-ago-2026), Wolfe (2-sep), rebaja (27-jul), «Valuation Has Gone A Bit Too Far» (1-jun)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/HLT.xml' },
  { id: 12, titulo: 'Evercore ISI sube el objetivo de Hilton a 375 USD (19-oct-2026); Freedom Broker inicia con comprar y 359 USD (14-oct)', editor: 'Yahoo Finance y Stocktwits (titulares)', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/HLT/news/' },
  { id: 13, titulo: 'Stocktwits HLT: traslado al Nasdaq y posible entrada en el Nasdaq-100 (Dow Jones Newswires); máximo histórico con 6,2 veces el volumen', editor: 'Stocktwits', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/HLT.json' },
  { id: 14, titulo: 'Form 4 de directivos de Hilton (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001585689&type=4' },
  { id: 15, titulo: 'Seeking Alpha: «Cruise operators, airlines, and hotels fall on renewed geopolitical tensions» (8-jul-2026) y «Travel stocks move higher as oil tumbles on US-Iran deal talks» (6-may-2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-08', url: 'https://seekingalpha.com/api/sa/combined/HLT.xml' },
];
const EURUSD = 1.1215, USDCNY = 6.6664;
const conv = (t, x) => (x == null ? null : Y[t].divisa === 'EUR' ? x * EURUSD : x);
const comp = (t, nombre, pais) => {
  const d = Y[t]; const tr0 = d.trend.find((x) => x.periodo === '0y'); const tr1 = d.trend.find((x) => x.periodo === '+1y');
  return {
    nombre, ticker: t, pais, capitalizacion: Math.round(conv(t, d.cap) / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev / d.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.per_adelantado), crecimiento_pct: tr0?.ventas && tr1?.ventas ? r1((tr1.ventas / tr0.ventas - 1) * 100) : null,
    margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null, dn_ebitda: r1((d.deuda - d.caja) / d.ebitda), fcf_yield_pct: d.fcf != null ? r1(d.fcf / d.cap * 100) : null,
  };
};
// H World (HTHT) y Atour (ATAT) cotizan en EE. UU. en USD (ADS) pero publican en CNY: su valor empresa y EBITDA de Yahoo
// mezclan divisas (EV/EBITDA 3,8x y 0,0x), así que solo se usa su PER.
const compCN = (t, nombre) => ({ ...comp(t, nombre, 'CN'), ev_ventas: null, ev_ebitda_ltm: null, margen_ebitda_pct: null, dn_ebitda: null, fcf_yield_pct: null });
// IHG: el EBITDA de Yahoo (NIIF con el Fondo del Sistema) da un EV/EBITDA sin sentido; se usa la cifra de segmentos del informe de IHG.
const ihg = { ...comp('IHG', 'InterContinental Hotels Group', 'GB'), ev_ventas: null, ev_ebitda_ltm: null, margen_ebitda_pct: 56.0, dn_ebitda: 2.6, fcf_yield_pct: null };
const empresas = [
  comp('MAR', 'Marriott International', 'US'), ihg, comp('H', 'Hyatt Hotels', 'US'),
  comp('WH', 'Wyndham Hotels & Resorts', 'US'), comp('CHH', 'Choice Hotels', 'US'), comp('AC.PA', 'Accor', 'FR'),
  compCN('HTHT', 'H World Group'), compCN('ATAT', 'Atour Lifestyle'),
];
const pers = empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const perMed = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const bolsa = B.bolsa;
const H = Y.HLT;
const D = {
  _estado: 'Completa. Precio: cierre del 20-oct-2026 (la sesión del 21-oct no ha abierto al hacer el informe). Consenso de Yahoo (29 analistas de BPA, 27 con objetivo).',
  _per_mediana_comparables: r1(perMed),
  identificacion: {
    nombre: 'Hilton Worldwide Holdings Inc.', nombre_corto: 'Hilton', ticker: 'HLT', isin: 'US43300A2033', mercado: 'New York Stock Exchange (Nasdaq Global Select desde el 5-nov-2026)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Consumo discrecional (GICS)', industria: 'Hoteles, complejos y cruceros', sede: 'McLean (Virginia)', fundacion: '1919', empleados: 182000, web: 'www.hilton.com',
    precio: 359.29, fecha_precio: '2026-10-20', acciones: 223.0, capitalizacion_publicada: Math.round(H.cap / 1e6), free_float_pct: 97.3,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: '≈ 576 M USD/día (1,79 M de acciones, 3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de 2026, subida el 28-jul-2026: RevPAR comparable +3,0-3,5 % (antes +2-3 % en abril y +1-2 % en febrero), EBITDA ajustado de 4.040-4.080 M USD, BPA ajustado de 8,89-9,01 USD sin recompras posteriores al 2T, beneficio neto de 1.883-1.911 M, red neta +6-7 % con el segundo semestre mejor que el primero, dinero clave e inversión de ≈ 300 M y devolución al accionista de ≈ 3.500 M [3]. 3T26: RevPAR ≈ +4 % y BPA ajustado de 2,28-2,34 [3]. A medio plazo la dirección repite un crecimiento de la red del 6-7 % y no da guía de 2027 [3].',
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: null, ebit: null, bpa: r2(H.trend.find((x) => x.periodo === '0y').bpa), dpa: 0.60, fuente: 'Yahoo Finance, 29 analistas, 21-oct-2026 [2]' },
      { periodo: '2027e', ingresos: null, ebitda: null, ebit: null, bpa: r2(H.trend.find((x) => x.periodo === '+1y').bpa), dpa: 0.60, fuente: 'Yahoo Finance, 29 analistas, 21-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 29, comprar: 18, mantener: 10, vender: 1, po_medio: r2(H.po_medio), po_min: H.po_min, po_max: H.po_max },
    revisiones: 'El BPA ajustado de 2026 del consenso subió de 9,00 a 9,05 USD en 90 días y el de 2027 bajó de 10,45 a 10,42 [2]. La guía de la empresa subió dos veces en 2026 (de 8,65-8,77 a 8,79-8,91 en abril y a 8,89-9,01 en julio) por el RevPAR de EE. UU. y el Mundial [3]. El consenso incluye recompras de ≈ 3.000-3.500 M al año, que la guía no incluye. El objetivo medio de 27 analistas es 353,93 USD (270-390), por debajo del precio; en octubre Evercore subió su objetivo a 375 USD y Freedom Broker empezó con comprar y 359 [2, 12]. Solo se encuentra gratis el consenso de Yahoo para ingresos (con reembolsos, otra base) y BPA; no se usa el de ingresos.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 3.4,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.tipo_rentabilidad, rentabilidades: bolsa.rentabilidades, anual: bolsa.anual,
    beta: bolsa.beta, volatilidad_pct: bolsa.volatilidad_pct, max_drawdown_pct: bolsa.max_drawdown_pct, posicion_corta_pct: r1(H.corto_pct * 100),
    comentario: 'Rentabilidades con dividendos en USD frente al S&P 500 (SPY) y al sector ocio de EE. UU. (PEJ) [1]. Hilton ha batido al índice en 3, 5 y 10 años (34,9 %, 20,8 % y 23,1 % anual frente a 23,7 %, 12,6 % y 15,5 %): el BPA ajustado se multiplicó por 2,4 de 2018 a 2025 y el PER subió [1]. En 2026 sube un 25,3 % frente al 13,7 % del índice, con el RevPAR de EE. UU. de vuelta a positivo y la guía subida dos veces [1, 3]. Beta de 1,09 (mensual, 5 años) y 0,78 (semanal, 2 años); volatilidad del 23,8 %; peor caída del 32,6 % en abril-julio de 2022 [1].',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 17.0, var_3m_pct: 10.8, var_6m_pct: 5.6, var_12m_pct: 38.0, dist_max_52s_pct: 0.0, dist_min_52s_pct: 39.8, dist_max_historico_pct: 0.0, tendencia: 'alcista', volatilidad_60d_pct: 24.0, avisos: ['P1 Subida fuerte (+17,0 % en un mes)', 'P2 Cerca de máximos tras subir (en el máximo histórico)'] },
      movimientos_fuertes: [
        { periodo: '18-sep a 20-oct-2026', var_pct: 17.5, causa: 'Subida de todo el sector, no propia: Marriott +17,2 %, Hyatt +13,6 %, IHG +11,7 % y el ETF de ocio PEJ +7,5 % en el mismo mes, con el S&P 500 +1,0 % [1]. Dos saltos: el 15-oct todo el sector subió (Hilton +4,6 %, Marriott +3,7 %, Hyatt +5,4 %) sin noticia propia, y el 20-oct Hilton subió un 3,8 % con 6,2 veces su volumen al anunciar el paso al Nasdaq, que abre la puerta al Nasdaq-100 [7, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: -9.0, causa: 'De 348,84 USD (18-jun) a 311,00 (10-ago): petróleo y Oriente Medio (−3,9 % el 13-jul, la mayor caída diaria del año) y guía del 3T por debajo de lo esperado el 28-jul (−3,4 %) [1, 15, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr 2026', var_pct: 11.8, causa: 'De 298,37 USD (10-mar) a 333,67 (22-abr): alivio en Oriente Medio y petróleo a la baja, máximos de sector [15].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-27', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de abrir; guía del 3T de RevPAR ≈ +4 % y BPA ajustado de 2,28-2,34 USD [8, 3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-20', tipo: 'fusión u oferta', hecho: 'Traslado de la cotización del NYSE al Nasdaq el 5-nov-2026; la prensa apunta a una posible entrada en el Nasdaq-100 en la revisión anual de diciembre, que traería compras de fondos indexados [7, 13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Evercore ISI sube el objetivo a 375 USD (mantiene sobreponderar); Freedom Broker empieza con comprar y 359 USD (14-oct) [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-14', tipo: 'directivos', hecho: 'Laura Fuentes (2,26 M USD) y el consejero Chris Carr (0,14 M) venden en mercado fuera de un plan 10b5-1; en febrero el consejero delegado ejerció y vendió opciones que vencían (36,3 M USD, ≈ 2,4 % de su participación) [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-13', tipo: 'recomendación', hecho: 'Deutsche Bank empieza con comprar; en julio hubo una rebaja («Growth Is Great, But Not Great Enough To Avoid A Downgrade») [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-11', tipo: 'ampliación o convertible', hecho: 'Bono de 1.000 M USD al 5,5 % a 2031; deuda ordinaria, sin dilución [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-25', tipo: 'demanda o regulador', hecho: 'Demanda colectiva por accesibilidad (altura de las camas) y acuerdo de 12 M USD con camareros de San Francisco: importes pequeños [11].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-27',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está en su máximo histórico tras subir un 17 % en un mes con todo el sector hotelero (avisos P1 y P2, que no cambian la señal pero obligan a explicar la causa) y un 3,8 % el 20-oct por el paso al Nasdaq [1, 7]. No hay colocaciones, ampliaciones, ofertas ni decisiones judiciales pendientes que puedan mover el precio más de un 5 %; las ventas de directivos son pequeñas o ejercicios de opciones que vencían [14]. La posible entrada en el Nasdaq-100 es un hecho a favor, no en contra. Los resultados del 27-oct no aplazan la decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio >= 2018).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2020', '2021'].includes(c.anio) })),
    comentario: 'Con el precio de cierre de cada año y el beneficio de ese año, el PER de Hilton en base ajustada fue de 21x en 2018, 28x en 2019, 26x en 2022, 29x en 2023, 35x en 2024 y 35x en 2025; 2020 y 2021 se excluyen por la pandemia [1]. Hoy cotiza a 40x el BPA de los últimos 12 meses y ≈ 35x el de los próximos 12: la prima frente a su historia y frente a los comparables (mediana de ≈ 16x) se explica por el crecimiento de la red del 6-7 %, el margen del 74 % y las recompras, pero se ha ampliado mucho desde 2022 (≈ 20x adelantado al cierre de 2022) [2].',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Grupos hoteleros de marcas, franquicia y gestión con poco inmueble: Marriott, IHG, Hyatt, Wyndham, Choice y Accor; y H World y Atour como grandes de China (ADS en USD, solo PER). Fuera Airbnb y Booking (otro modelo). El PER es el de los próximos 12 meses de Yahoo sobre BPA ajustado. La muestra está partida: Marriott, IHG y Hyatt cotizan a 25-36x y el resto a 12-18x.',
    empresas,
    comentario: 'Hilton cotiza a 34,5x el BPA del consenso de 2027 frente a una mediana de comparables de ' + String(r1(perMed)).replace('.', ',') + 'x y a 30,2x de Marriott, su par más cercano [2]. La prima frente a IHG (25,2x) y Marriott se justifica en parte por el mayor crecimiento de la red (6-7 % frente a ≈ 5 %) y el margen, pero no frente a toda la muestra; las de gama económica (Wyndham, Choice, 14-15x) crecen menos y las chinas (12-15x) cargan riesgo país. Como el EBITDA de cada proveedor lleva ajustes distintos, para el valor se usa sobre todo el PER [2].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-05', objetivo: 'Graduate Hotels (marca y contratos de franquicia)', comprador: 'Hilton', ev: 210, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Compra de activos; múltiplo no publicado [9].' },
      { fecha: '2024-04', objetivo: 'Sydell Group (marca NoMad)', comprador: 'Hilton', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Control con opción de venta futura a un múltiplo de beneficio no publicado [9].' },
      { fecha: '2022-08', objetivo: 'Radisson Hotels Americas', comprador: 'Choice Hotels', ev: 674, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Franquicia con tres hoteles en propiedad; múltiplo no publicado [10].' },
      { fecha: '2021-11', objetivo: 'Apple Leisure Group', comprador: 'Hyatt', ev: 2700, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Marcas de resorts y distribución; múltiplo no publicado [10].' },
    ],
    comentario: 'Las compras del sector son de marcas y plataformas pequeñas frente a Hilton (≈ 81.000 M USD de capitalización) y casi nunca publican múltiplo: no sirven para valorar el control y pesan 0. Hilton no tiene accionista de control; una oferta sobre ella es improbable por tamaño y competencia en EE. UU.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos pagados', tipo: 'Complemento', intentos: '1) 10-K 2025 nota 3 (Graduate, NoMad): sin EBITDA; 2) 8-K de Choice y nota de Hyatt: sin múltiplo; 3) prensa: cifras sin fuente primaria', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'ingresos, EBITDA y BPA de 2028e del consenso', tipo: 'Complemento', intentos: '1) MarketScreener con WebFetch: página de acceso sin datos; 2) búsqueda web de la tabla de MarketScreener: solo hasta 2027; 3) Simply Wall St da beneficio total de 2028 (9 analistas) sin BPA', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha, titulares y análisis de HLT (RSS), jun-oct 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/HLT.xml' },
  { id: 2, titulo: 'Stocktwits, hilo de $HLT (30 mensajes, ago-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/HLT.json' },
  { id: 3, titulo: 'Simply Wall St y Yahoo Finance: «Hilton (HLT) Stock Looks Fully Priced After A 130% Run» (26-sep) y «Has Negative Shareholder Equity» (6-oct)', editor: 'Simply Wall St / Yahoo Finance', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://finance.yahoo.com/quote/HLT/news/' },
  { id: 4, titulo: 'Merlintrader: «Can 6.1% Net Unit Growth Outrun a $6.3 Billion Deficit?» (3-sep) y hoteles tras renta, inversión y deuda (25-sep)', editor: 'Merlintrader (vía Stocktwits)', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://www.merlintrader.com/hilton-worldwide-stock-hub/' },
];
const E = {
  _estado: 'Completa. Seeking Alpha (RSS), Stocktwits (API) y portales de inversores particulares; Reddit da 403.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis y titulares)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Los autores alaban el modelo y el crecimiento de la red, pero varios titulan que la valoración «ha ido demasiado lejos» (junio) o que el crecimiento «no basta para evitar una rebaja» (julio); Wolfe prefiere Hyatt en lujo [1].' },
      { plataforma: 'Stocktwits ($HLT)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Euforia por el máximo histórico y el paso al Nasdaq (posible Nasdaq-100); algún bajista habla del «rally hotelero de la guerra de Irán» como algo difícil de explicar y de Marriott a más de 40x [2].' },
      { plataforma: 'Simply Wall St / Yahoo (artículos para particulares)', fecha: '2026-10', n_comentarios: 6, tono: 'Neutro', resumen: 'Repiten que la acción «parece valorada del todo» tras subir un 130 % y explican el patrimonio negativo por recompras [3].' },
      { plataforma: 'Merlintrader (blog de particulares)', fecha: '2026-09', n_comentarios: 4, tono: 'Dividido', resumen: 'Se preguntan si el 6 % de red puede con un déficit patrimonial de 6.300 M y comparan la caja que queda tras deuda en hoteleras y casinos [4].' },
    ],
    temas: [
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos les dan la razón: ≈ 35x el BPA de los próximos 12 meses frente a una mediana adelantada de 5 años de ≈ 30x y un valor intrínseco muy inferior al precio (sección de valoración).' },
      { tema: 'Nasdaq y Nasdaq-100', postura: 'Alcista', peso: 'Alto', contraste: 'El traslado es un hecho (5-nov) [2]; la entrada en el índice no está anunciada y su efecto sería de flujos, no de beneficio.' },
      { tema: 'Patrimonio negativo y deuda', postura: 'Dividida', peso: 'Medio', contraste: 'Es fruto de las recompras, no de pérdidas; la deuda neta es ≈ 3 veces el EBITDA y los vencimientos llegan en 2029-2030 (sección de balance) [4].' },
      { tema: 'Ciclo de viajes y geopolítica', postura: 'Dividida', peso: 'Medio', contraste: 'El RevPAR de EE. UU. volvió a positivo en 2026, pero la mitad del 2T fue por hechos puntuales (Mundial), según la propia empresa [1].' },
    ],
    lectura: 'El sentimiento de los particulares es más alcista que nunca en precio (máximo histórico, Nasdaq), mientras los analistas que escriben en Seeking Alpha llevan desde junio diciendo que la valoración está llena; el consenso profesional tiene un objetivo medio de 354 USD, ya por debajo del precio. No aporta un riesgo que el informe no recoja; sí confirma que el precio depende del múltiplo más que del beneficio.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', r1(perMed), pers);
