// Escribe las notas A-E de VeriSign (corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR y webs citadas),
// del XBRL de la SEC (cuentas-xbrl.json y docs/companyfacts.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary
// del 20-oct-2026, 14:16 UTC, sesión abierta) y de movimiento.mjs. Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/verisign-2026-10-20/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1014473';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: cuentas, ingresos por región, contratos .com y .net, deuda, impuestos, riesgos', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000101447326000006/vrsn-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, flujos del semestre, bonos, subida del precio de .com', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000101447326000028/vrsn-20260630.htm` },
  { id: 3, titulo: 'Verisign Reports Second Quarter 2026 Results', editor: 'VeriSign, Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000101447326000026/q22026earningsrelease.htm` },
  { id: 4, titulo: 'Verisign Reports First Quarter 2026 Results (anuncio de la subida de .com a 10,97 USD)', editor: 'VeriSign, Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-04-23', url: `${ED}/000101447326000019/q12026earningsrelease.htm` },
  { id: 5, titulo: 'Verisign Reports Fourth Quarter and Full Year 2025 Results', editor: 'VeriSign, Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000101447326000005/q42025earningsrelease.htm` },
  { id: 6, titulo: 'Verisign Reports Third Quarter 2025 Results', editor: 'VeriSign, Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-10-23', url: `${ED}/000101447325000045/q32025earningsrelease.htm` },
  { id: 7, titulo: 'Hechos XBRL de VeriSign (companyfacts): cuenta, balance, flujos, valores negociables, ingresos diferidos, trimestres', editor: 'SEC (data.sec.gov)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001014473.json' },
  { id: 8, titulo: '8-K: emisión de 550 M USD de bonos al 5,100 % con vencimiento en 2031 (y amortización de los de 2027)', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-26', url: `${ED}/000114036126026574/ef20076830_8k.htm` },
  { id: 9, titulo: 'Pricing term sheet (FWP) de los bonos 2031: calificaciones previstas Baa2 / BBB', editor: 'VeriSign, Inc. (SEC, FWP)', tipo: 'Primaria', fecha: '2026-06-18', url: `${ED}/000114036126025786/ny20076344x2_fwp.htm` },
  { id: 10, titulo: '8-K: ampliación del programa de recompras hasta 1.500 M USD', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000101447326000026/vrsn-20260723.htm` },
  { id: 11, titulo: 'Titulares de resultados frente al consenso (RSS de VRSN: 2T26 +0,03 USD, 1T26 +0,09, 4T25 −0,05)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-17', url: 'https://seekingalpha.com/api/sa/combined/VRSN.xml' },
  { id: 12, titulo: 'Form 10-Q del 1T26 (31-mar-2026)', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-23', url: `${ED}/000101447326000020/vrsn-20260331.htm` },
];

const anios = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const BPA = { 2023: 7.9, 2024: 8.0, 2025: 8.81 };
const DPA = { 2025: 2.31 };
const VALORES = { 2018: 912.3, 2019: 709.9, 2020: 765.7, 2021: 982.3, 2022: 606.8, 2023: 686.3, 2024: 393.2, 2025: 272.6 };
const BONOS = { 2018: 1785.0, 2019: 1787.6, 2020: 1790.1, 2021: 1785.7, 2022: 1787.9, 2023: 1790.2, 2024: 1792.3, 2025: 1788.2 };
const DIFERIDOS = { 2018: 1018.1, 2019: 1033.9, 2020: 1062.9, 2021: 1153.4, 2022: 1219.1, 2023: 1246.1, 2024: 1304.2, 2025: 1384.5 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, minoritarios: 0, beneficio_neto: r1(c.bai - c.impuestos), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: c.bpa ?? BPA[c.periodo], dpa: DPA[c.periodo] ?? 0, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, intangibles: 0, existencias: 0, activos_contrato: null, pasivos_contrato: DIFERIDOS[b.periodo], caja: r1(b.caja + VALORES[b.periodo]),
    deuda_financiera: BONOS[b.periodo], arrendamientos: 0, minoritarios: 0 };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos ?? 0, emision_acciones: 0 };
  delete o.fin; return o;
});

// Trimestres (XBRL; el 4T = año − nueve meses). EBITDA = resultado operativo + depreciación del trimestre.
const T = [
  ['3T24', 390.6, 376.3, 269.3, 9.0, 2.07, null], ['4T24', 395.4, 380.4, 263.8, 8.8, 2.00, null],
  ['1T25', 402.3, 384.3, 271.2, 8.9, 2.10, null], ['2T25', 409.9, 387.1, 280.7, 8.3, 2.21, null],
  ['3T25', 419.1, 390.6, 284.3, 7.3, 2.27, null], ['4T25', 425.3, 395.4, 284.8, 6.7, 2.23, 'Inferior'],
  ['1T26', 428.9, 402.3, 293.6, 6.4, 2.34, 'Superior'], ['2T26', 434.6, 409.9, 296.3, 6.6, 2.38, 'Superior'],
].map(([p, v, va, ebit, da, bpa, vs]) => ({ periodo: p, ingresos: v, crecimiento_pct: r1((v / va - 1) * 100), crecimiento_organico_pct: null, ebitda: r1(ebit + da), margen_ebitda_pct: r1((ebit + da) / v * 100), bpa, vs_consenso: vs }));

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K de 2025 y las notas de resultados. Serie 2018-2025 (en 2016-2017 había obligaciones convertibles que se liquidaron en 2017-2018 y cambian la deuda y las acciones). Caja = efectivo + valores negociables (letras del Tesoro). Pasivos de contrato = ingresos diferidos a corto y largo. Arrendamientos operativos fuera (US GAAP). Beneficio neto = BAI − impuestos (sin minoritarios).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1707.9, ebitda: 1186.0, ebit: 1159.0, beneficio_neto: 850.0, bpa: 9.21, dpa: 3.16, dpa_extraordinario: 0, fcf: 1066.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 1.215 M USD en 2018 a 1.657 M en 2025 (TCAC del 4,5 %) sin compras: son casi todos de registrar y renovar dominios .com y .net [1]. El crecimiento sale de dos palancas: el precio mayorista de .com (7,85 USD hasta 2021; 8,39 en sep-2021, 8,97 en sep-2022, 9,59 en sep-2023 y 10,26 en sep-2024) y el número de dominios, que cayó en 2023-2024 (de 174,7 a 169,0 M; China y registros especulativos) y volvió a crecer en 2025 (173,5 M, +2,6 %) y 2026 (179,1 M en junio, +5,1 % interanual) [1, 3]. El margen operativo subió del 63,2 % en 2018 al 67,7 % en 2025 y al 68,2 % en el primer semestre de 2026: los costes (535 M en 2025) crecen ≈ 3-5 % al año y cada subida de precio va casi entera al resultado [1, 3]. La subida de .com a 10,97 USD (+6,9 %) entra el 1-nov-2026 y la de .net a 12,00 el 1-mar-2027 [4, 2].',
    ajustes: 'Se usan cifras publicadas (US GAAP); la empresa no publica un BPA ajustado. Partidas no recurrentes: beneficios fiscales en 2020 (impuesto de −64,7 M USD) y 2021 (−2,6 M) por la reorganización fiscal internacional, que inflan el beneficio neto (815 y 785 M) y el BPA (7,07 y 7,00 USD); con un tipo normal del 23 % el BPA habría sido ≈ 5,0 y 5,4 USD [1, 7]. Por eso esos dos años quedan fuera de la historia del PER. En 2023 el tipo fue del 16 % (159 M). La remuneración en acciones (70,6 M en 2025) está dentro de los costes y del EBITDA [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: T,
    ultima_presentacion: 'En el 2T26 (23-jul-2026) los ingresos subieron un 6,0 % (434,6 M USD), el resultado operativo fue de 296,3 M (68,2 %) y el BPA de 2,38 USD, 0,03 por encima del consenso; el 1T26 lo batió en 0,09 y el 4T25 quedó 0,05 por debajo [3, 4, 5, 11]. La dirección subió por tercera vez la guía de 2026: crecimiento de la base de dominios del 5,2-6,0 % (era 1,5-3,5 % en febrero y 3,1-4,3 % en abril) e ingresos de 1.745-1.755 M (1.715-1.735 en febrero) [3, 11]. Dato clave: 12,7 M de altas nuevas en el trimestre frente a 10,4 M un año antes y renovación del 76,3 % en el 1T26 (75,5 %) [3]. La dirección atribuye parte de las altas a las herramientas de IA que crean webs y contenido y al marketing con los registradores [2]. Los analistas preguntaron cuánto del crecimiento viene de la IA y cuánto del marketing, si las altas récord renovarán, el efecto adelantado de la subida de precio de noviembre y el coste del hardware; la dirección no cuantificó la parte de la IA ni dio guía para 2027 [3]. Los resultados del 3T26 se publican el 22-oct-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2027 (amortizado el 20-jul-2026)', importe: 550 }, { anio: '2031', importe: 1300 }, { anio: '2032', importe: 500 }],
    liquidez: 'Efectivo y valores negociables de 1.034 M USD a 30-jun-2026, de los que ≈ 550 M se usaron el 20-jul-2026 para amortizar los bonos de 2027 [3]; línea de crédito no dispuesta de 200 M (covenant: apalancamiento ≤ 4,0 veces) [1].',
    rating: 'Moody\'s Baa2 y S&P BBB (calificaciones previstas en la emisión de junio de 2026) [9]',
    coste_deuda_pct: 4.1,
    vida_media_anios: 5.0,
    otros_pasivos: 'Ingresos diferidos de 1.449 M USD a 30-jun-2026 (1.085 M a corto): cobros por adelantado de registros de 1 a 10 años que se reconocen a lo largo del plazo; no son deuda financiera, se pagan con servicio de registro, y por eso van al circulante [3]. Depósito de 145,2 M para adquirir intangibles (el derecho a operar .web, delegado en 2026) [3]. No hay pensiones relevantes ni litigios con provisión material; el 10-K advierte de reclamaciones y de impugnaciones de los precios de .com [1]. Pasivo fiscal y otros a largo de 8,6 M [3].',
    comentario: 'El patrimonio es negativo (−2.254 M USD a junio de 2026) porque la empresa lleva dos décadas recomprando más de lo que gana: ≈ 6.900 M en recompras de 2018 a 2025 [1, 7]. La deuda bruta es de 1.800 M en tres bonos (2,70 % 2031, 5,10 % 2031 y 5,25 % 2032) y la deuda neta de ≈ 1.300 M, 1,1 veces el EBITDA [3]. El circulante comercial es muy negativo: los clientes (registradores) pagan por adelantado, así que clientes − proveedores − ingresos diferidos = −1.675 M en 2025 (−101 % de las ventas) [1]: crecer genera caja.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es superior al 100 %: flujo operativo de 1.091 M USD en 2025 frente a un beneficio de 826 M, por los cobros anticipados (ingresos diferidos +80 M), la remuneración en acciones (71 M) y menos impuestos pagados por la ley fiscal de 2025 [1, 5]. La inversión es mínima: 22,8 M en 2025 (1,4 % de las ventas) y 26,0 M en el primer semestre de 2026; casi todo es mantenimiento de centros de datos y red [1, 3]. Toda la caja vuelve al accionista: 882 M de recompras y 215 M de dividendos en 2025, y 427 M y 148 M en el primer semestre de 2026 [1, 3]. En 2016 se pagaron 143 M por el depósito de .web, el único gasto «de compra» de la década [7].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 31, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno [1]',
    comentario: 'Cuentas sencillas y limpias: un solo segmento, sin compras, sin deterioros, sin I+D activado y con ingresos que se cobran antes de reconocerse (los diferidos cubren ≈ 10 meses de ventas) [1]. El único ruido del BPA son los impuestos: beneficios fiscales de 2020 y 2021 por la reorganización internacional y el tipo bajo de 2023 [1, 7]. La remuneración en acciones es moderada (70,6 M USD, 4,3 % de las ventas) [1]. KPMG audita a la empresa desde 1995, lo que es mucho tiempo [1]. Los indicadores del motor (Altman, ROE) pierden sentido con patrimonio negativo; el circulante negativo es una fortaleza (cobro anticipado), no un riesgo.',
    senales: [
      { senal: 'Patrimonio negativo por recompras', nivel: 'Baja', comentario: '−2.154 M USD en 2025; financiado con caja propia y 1.800 M de bonos baratos; invalida ROE y Altman [1].' },
      { senal: 'Beneficios fiscales en 2020-2021', nivel: 'Baja', comentario: 'BPA de 7,07 y 7,00 USD inflados por impuestos negativos; con un tipo normal, ≈ 5,0 y 5,4 [1, 7].' },
      { senal: 'Auditor con 31 años', nivel: 'Media', comentario: 'KPMG desde 1995; un 6,8 % de votos en contra de su ratificación en 2026 [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Todo el flujo libre vuelve al accionista: «más del 100 % del flujo libre» en el 2T26 [3]. Dividendo trimestral desde 2025 (0,77 USD; 0,81 desde febrero de 2026, +5,2 %) y recompras sin fecha de caducidad: el consejo amplió el programa el 23-jul-2026 hasta 1.500 M USD disponibles [10, 5]. La deuda se refinancia al vencer (2025 y 2027) sin reducirla [8].',
    adquisiciones: [
      { anio: '2016-2026', objetivo: 'Derecho a operar .web (depósito de 145 M USD; subasta de 135 M de 2016, litigios hasta 2025; delegado en la raíz en julio de 2026)', importe: 145, ev_ebitda: null, financiacion: 'Caja', resultado: 'Lanzamiento previsto a finales de 2026 por el canal de registradores; la empresa no espera ingresos relevantes en 2026 [3, 1].' },
    ],
    comentario: 'La dirección asigna el capital con disciplina y sin compras: de 2018 a 2025 recompró ≈ 6.980 M USD y las acciones diluidas bajaron de 122,7 a 93,8 M (−3,8 % al año) [1, 7]. El problema es el precio de las recompras: se compraron a 25-40 veces beneficios (PER de 2021 cercano a 40) y el patrimonio negativo crece. El ROIC sobre el capital operativo (inmovilizado, fondo de comercio y depósito de .web: ≈ 410 M) supera el 200 %: no hay dónde reinvertir y devolver la caja es lo correcto. El riesgo de la apuesta .web (145 M y diez años de litigios) es pequeño frente al tamaño [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Registro de dominios (.com, .net y otros)', descripcion: 'Un solo segmento (NIIF/US GAAP): registro y resolución de .com y .net, más .name, .cc, dominios internacionalizados y servicios para .edu; .web en lanzamiento.', tipo_resultado: null, historico: cuenta.map((c) => ({ periodo: c.periodo, ingresos: c.ingresos, resultado: null })) },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 66.0 }, { nombre: 'Europa, Oriente Medio y África', peso_pct: 16.9 }, { nombre: 'Asia-Pacífico', peso_pct: 11.1 }, { nombre: 'Otros (Canadá, Latinoamérica)', peso_pct: 6.0 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Base de dominios .com y .net (M)', valor_anterior: '173,5 (dic-25)', valor_actual: '179,1 (jun-26)', variacion: '+5,1 % interanual', comentario: '169,0 M en dic-24 (−2 %) [1, 3].' },
      { kpi: 'Altas nuevas en el trimestre (M)', valor_anterior: '10,4 (2T25)', valor_actual: '12,7 (2T26)', variacion: '+22 %', comentario: '41,7 M en 2025 frente a 37,4 M en 2024 [3, 1].' },
      { kpi: 'Tasa de renovación (%)', valor_anterior: '75,5 (1T25)', valor_actual: '76,3 (1T26)', variacion: '+0,8 puntos', comentario: 'Previsión del 2T26: 75,2 % [3].' },
      { kpi: 'Precio mayorista de .com (USD/año)', valor_anterior: '10,26', valor_actual: '10,97 desde el 1-nov-2026', variacion: '+6,9 %', comentario: 'Tope contractual: +7 % al año en los cuatro últimos años de cada periodo de seis [4, 1].' },
      { kpi: 'Margen operativo (%)', valor_anterior: '67,7 (2025)', valor_actual: '68,2 (1S26)', variacion: '+0,5 puntos', comentario: '63,2 % en 2018 [1, 3].' },
      { kpi: 'Ingresos diferidos (M USD)', valor_anterior: '1.385 (dic-25)', valor_actual: '1.449 (jun-26)', variacion: '+4,6 %', comentario: 'Cobro anticipado de los registros [3].' },
    ],
    clientes: 'Los clientes directos son ≈ 2.000 registradores acreditados por ICANN (GoDaddy, Tucows, Namecheap, Squarespace, Alibaba…), que venden a los titulares; ninguno se desglosa como cliente significativo en el 10-K, pero el sector está concentrado en pocos registradores grandes [1]. Los contratos son de registro anual (1 a 10 años) y la renovación ronda el 75-76 % [3]. El poder de precios está demostrado y limitado por contrato: el precio de .com subió de 7,85 a 10,26 USD en 2021-2024 (+31 %) y sube a 10,97 en noviembre de 2026, con la base de dominios creciendo de nuevo [1, 4]. En .net puede subir un 10 % al año (12,00 USD en marzo de 2027) [2].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de 3T24-3T25', tipo: 'Complemento', intentos: '1) notas de resultados de la empresa (no comparan con consenso); 2) titulares del RSS de Seeking Alpha (solo desde el 4T25); 3) Yahoo quoteSummary (solo el trimestre en curso)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K de 2025: competencia, regulación, .com Registry Agreement, Cooperative Agreement (Amendment 35), .net', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000101447326000006/vrsn-20251231.htm` },
  { id: 2, titulo: '8-K: renovación del .com Registry Agreement con ICANN (vigente del 1-dic-2024 al 30-nov-2030; sin cambios en la cláusula de precios)', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-11-27', url: `${ED}/000101447324000044/vrsn-20241125.htm` },
  { id: 3, titulo: 'Q2 2026 Domain Name Industry Brief: 401,6 M de dominios en el mundo (+8,1 % interanual)', editor: 'Verisign (DNIB)', tipo: 'Sectorial', fecha: '2026-07', url: 'https://blog.verisign.com/domain-names/q2-2026-domain-name-industry-brief-quarterly-report/' },
  { id: 4, titulo: 'Verisign Reports First Quarter 2026 Results (subida de .com de 10,26 a 10,97 USD el 1-nov-2026)', editor: 'VeriSign, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-23', url: `${ED}/000101447326000019/q12026earningsrelease.htm` },
  { id: 5, titulo: '8-K: subida de .net de 10,91 a 12,00 USD el 1-mar-2027', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-27', url: `${ED}/000101447326000030/vrsn-20260827.htm` },
  { id: 6, titulo: 'Form 10-Q del 2T26 (las herramientas de IA para crear webs y contenido impulsan la base de dominios)', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000101447326000028/vrsn-20260630.htm` },
  { id: 7, titulo: 'Declaración sobre el efecto de los cambios de AdSense en la base de dominios (menos del 2 %)', editor: 'VeriSign, Inc. (SEC, 8-K, anexo 99.1)', tipo: 'Primaria', fecha: '2025-10-24', url: `${ED}/000101447325000048/vrsn8-k102425xex991.htm` },
  { id: 8, titulo: 'Verisign may regain the option to raise .com prices in 2026 (NTIA: precios congelados hasta sep-2026; periodo de precios desde el 26-oct-2026)', editor: 'WebHosting.Today', tipo: 'Prensa', fecha: '2026-01-07', url: 'https://webhosting.today/2026/01/07/verisign-may-regain-the-option-to-raise-com-prices-in-2026/' },
  { id: 9, titulo: 'VeriSign Controls the Internet\'s Address Book, But AI Disruption and a Key Contract Renewal Loom Large', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-06', url: 'https://www.fool.com/investing/2026/07/06/verisign-controls-the-internets-address-book-but-a/' },
  { id: 10, titulo: 'Yahoo Finance quoteSummary de GoDaddy, Akamai y Team Internet (ventas, EBITDA, capitalización)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/GDDY' },
  { id: 11, titulo: 'Verisign finally won .web: unlike .com, no one caps its price', editor: 'WebHosting.Today', tipo: 'Prensa', fecha: '2026-07-24', url: 'https://webhosting.today/2026/07/24/verisign-finally-won-web-unlike-com-no-one-caps-its-price/' },
];
const gd = Y.GDDY, ak = Y.AKAM, ti = Y['TIG.L'];
const B_ = {
  _estado: 'Completa con una sola fuente de tamaño de mercado en número de dominios (DNIB, publicado por la propia Verisign); el valor en dinero es estimación propia. Competidores con datos de Yahoo (EBITDA, no EBIT).',
  sector: {
    definicion: 'El mercado relevante es el registro de nombres de dominio de primer nivel en el mundo: genéricos históricos (.com, .net, .org), nuevos genéricos (.xyz, .online, .shop…) y los de país (.de, .cn, .uk). VeriSign es el operador mayorista («registry»): cobra a los registradores una tarifa anual por dominio y opera la resolución; los registradores (GoDaddy, Namecheap) venden al público. Se usa el recuento del Domain Name Industry Brief (DNIB) en número de dominios, la única serie pública y periódica; no hay una estadística independiente en dinero, así que el valor se estima a precio mayorista medio [3, 1].',
    tamano: '401,6 M de dominios registrados a 30-jun-2026 (+8,1 % interanual), de los que 179,1 M son .com y .net (44,6 %) [3]. A un precio mayorista medio de ≈ 10 USD, el mercado mayorista vale ≈ 4.000 M USD al año (estimación propia; los dominios de país tienen precios muy distintos) [3, 1].',
    unidad_serie: 'millones de dominios (todas las extensiones, DNIB)',
    serie: [{ anio: '2T25', tamano: 371.7 }, { anio: '2T26', tamano: 401.6 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: null,
    estructura: 'Concentrada en .com (≈ 45 % de todos los dominios) con una cola larga de cientos de extensiones',
    drivers: [
      { driver: 'Creación de negocios y webs (también con IA)', efecto: '+', horizonte: 'Estructural', evidencia: '12,7 M de altas .com/.net en el 2T26 frente a 10,4 M un año antes; la empresa lo atribuye en parte a herramientas de IA que crean webs [6].' },
      { driver: 'Subidas de precio contractuales', efecto: '+', horizonte: 'Estructural', evidencia: '.com +6,9 % en nov-2026 (tope del 7 % en cuatro de cada seis años); .net +10 % en mar-2027 [4, 5, 1].' },
      { driver: 'Navegación por buscadores y asistentes de IA', efecto: '−', horizonte: 'Estructural', evidencia: 'Si los usuarios llegan a las marcas por un asistente y no tecleando la dirección, un .com memorable vale menos; riesgo citado por la prensa en 2026 [9].' },
      { driver: 'Especulación y aparcamiento de dominios', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los dominios para publicidad (AdSense for Domains) son menos del 2 % de la base, según la empresa [7]; China restó base en 2023-2024 [1].' },
      { driver: 'Competencia de otras extensiones y de redes sociales', efecto: '−', horizonte: 'Estructural', evidencia: 'Los .com y .net bajaron de 174,7 M (2022) a 169,0 M (2024) antes de recuperarse [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Cada registro es un monopolio de su extensión; la rivalidad es entre extensiones y .com conserva ≈ 45 % de todos los dominios [3].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Los registradores no pueden cambiar de proveedor para .com; trasladan el precio al titular [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Costes de red y personal; la tarifa a ICANN es de 0,2575 USD por dominio [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Nadie puede operar .com mientras el contrato se renueve; la entrada es de extensiones nuevas, que en diez años no han quitado cuota relevante [1, 3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Redes sociales, aplicaciones y asistentes de IA son alternativas de presencia en internet; el 10-K lo señala como riesgo [1, 9].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La base de .com y .net creció un 5,1 % interanual en junio de 2026, el mejor ritmo en años, tras caer en 2023-2024 por China y el fin del auge de registros de la pandemia [1, 3]. El negocio es poco cíclico: en 2008-2009, 2020 y 2022 los ingresos de VeriSign siguieron creciendo porque se cobran por adelantado y la renovación ronda el 75 % [1]. Los indicadores son la base de dominios, las altas y la tasa de renovación, que publica cada trimestre.' },
    regulacion: '.com se opera bajo dos contratos: el .com Registry Agreement con ICANN, renovado hasta el 30-nov-2030 con derecho presuntivo de renovación y sin cambios en la cláusula de precio [2], y el Cooperative Agreement con el Departamento de Comercio (Amendment 35, de 2018), renovado automáticamente hasta el 30-nov-2030 [1]. El precio puede subir hasta un 7 % al año en los cuatro últimos años de cada periodo de seis (el actual empezó el 26-oct-2024); cambiar la cláusula exige el acuerdo de Comercio [1]. En 2024 la NTIA dijo que una bajada de precios sería de interés público, pero no logró acordarla con VeriSign [8]. .net (hasta 2029) puede subir un 10 % al año [1].',
    tendencias: 'Tres tendencias: (1) la IA crea webs y negocios más deprisa, y la empresa ve en ello parte de las altas récord de 2026 [6]; (2) la IA también cambia cómo se navega: si los asistentes responden sin enviar tráfico o las marcas se encuentran por un agente, un dominio vale menos para el titular y sube el riesgo de bajas en la renovación, aunque cualquier agente sigue necesitando el DNS para llegar a un servicio [9]; (3) el fin de AdSense for Domains en 2025 resta dominios aparcados (< 2 % de la base) [7]. .web, sin tope de precio, es la única extensión nueva de VeriSign [11].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 44.6,
    posicion: '1.º del mundo: .com y .net suman 179,1 M de 401,6 M de dominios (44,6 %) [3]; monopolio legal de .com y .net mientras se renueven los contratos.',
    competidores: [
      { nombre: 'Identity Digital (Donuts y Afilias)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Operador de más de 300 extensiones nuevas y de .info; privada (Ethos Capital) [1].' },
      { nombre: 'Public Interest Registry (.org)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Sin ánimo de lucro; en 2019-2020 ICANN bloqueó su venta a un fondo [1].' },
      { nombre: 'GoDaddy (registrador y registro)', pais: 'EE. UU.', ticker: 'GDDY', ingresos: Math.round(gd.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: `Primer registrador del mundo y cliente de VeriSign; opera también registros (antiguo Neustar). EBITDA de ${Math.round(gd.ebitda / 1e6)} M USD (Yahoo, ${r1(gd.ebitda / gd.ventas * 100)} % de las ventas) [10].` },
      { nombre: 'CNNIC (.cn) y DENIC (.de)', pais: 'China / Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayores registros de país; compiten por los titulares locales [1].' },
      { nombre: 'Team Internet Group (CentralNic)', pais: 'Reino Unido', ticker: 'TIG.L', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Registros y registradores, muy dependiente de la publicidad en dominios; capitalización de ≈ ${Math.round(ti.cap / 1e6)} M GBP [10].` },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: '.com es la extensión por defecto que todo el mundo reconoce: 44,6 % de todos los dominios [3].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Cambiar de dominio obliga a cambiar marca, correos y enlaces: renovación del 75-76 % con el precio subiendo [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Licencia exclusiva de .com hasta 2030 con renovación presuntiva; 29 años de disponibilidad del 100 % [2, 1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo del 67,7 % con 928 empleados [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un mercado que solo admite un operador por extensión [1].' },
      ],
    },
    amenazas: 'El foso es contractual: lo que más podría erosionarlo es que Comercio o ICANN limiten el precio en la renovación de 2030 (probabilidad baja, impacto alto) [1, 8]. La segunda amenaza es de uso: que los asistentes de IA y las aplicaciones hagan menos necesario un dominio propio y la renovación baje del 75 % (probabilidad media a largo plazo, aún sin señales: la base crece al 5 %) [9, 6]. Las extensiones nuevas llevan doce años sin quitar cuota relevante a .com [3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'VeriSign opera el registro de los dominios .com y .net, los dos más usados del mundo: mantiene la base de datos de quién tiene cada nombre y los servidores que traducen cada nombre a la dirección de la máquina (resolución), con 100 % de disponibilidad durante 29 años [3]. Además opera dos de los 13 servidores raíz de internet y es el mantenedor de la zona raíz, y registra .name, .cc y dominios internacionalizados; .web, delegado en julio de 2026, se lanzará por los registradores [1, 3]. Tiene 928 empleados, el 93 % en EE. UU. [1]. No vende al público: cobra a ≈ 2.000 registradores acreditados, que revenden el dominio con su margen [1].',
    como_gana_dinero: 'Cobra una tarifa fija por cada año de registro o renovación: 10,26 USD por .com (10,97 desde el 1-nov-2026) y 10,91 por .net (12,00 desde marzo de 2027), por adelantado, y la reconoce durante el plazo [4, 5]. Los ingresos dependen de tres cosas: dominios nuevos, tasa de renovación (≈ 75 %) y precio [1]. El coste es casi fijo (personal, centros de datos, 0,2575 USD por dominio a ICANN), así que el apalancamiento operativo es alto: con ingresos +6,4 % en 2025 el resultado operativo creció un 5,9 % y el margen se mantuvo en el 67,7 % [1]. No hay estacionalidad relevante; el 66 % de los ingresos se factura a registradores con sede en EE. UU. [1].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de una segunda fuente independiente y TCAC de cinco años', tipo: 'Complemento', intentos: '1) DNIB de Verisign (solo número de dominios, por trimestre); 2) ICANN (informes mensuales por registro, sin agregado anual accesible); 3) prensa sectorial (Domain Name Wire, DomainIncite: sin estudio de mercado en dinero)', decision: 'Omitido; serie corta del DNIB y valor estimado' },
    { seccion: 'competencia', campo: 'ingresos y margen EBIT de los registros competidores', tipo: 'Complemento', intentos: '1) Identity Digital y PIR (privadas o sin ánimo de lucro: no publican cuentas comparables); 2) GoDaddy 10-K (no separa su negocio de registro); 3) Yahoo (solo EBITDA del grupo)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement (DEF 14A) de la junta de 2026: consejo, comisiones, remuneración, propiedad', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-10', url: `${ED}/000101447326000013/vrsn-20260409.htm` },
  { id: 2, titulo: '8-K: resultados de la junta del 21-may-2026', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-21', url: `${ED}/000101447326000023/vrsn-20260521.htm` },
  { id: 3, titulo: '8-K: dimisión del consejero Timothy Tomlinson', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: `${ED}/000101447325000051/vrsn-20251121.htm` },
  { id: 4, titulo: '8-K: nombramiento de Matthew Desch como consejero', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-08', url: `${ED}/000101447325000042/vrsn-20251006.htm` },
  { id: 5, titulo: 'Form 4 de directivos y consejeros (20-oct-2025 a 20-oct-2026), agregados con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001014473&type=4' },
  { id: 6, titulo: 'Schedule 13G/A de Berkshire Hathaway: 8.989.880 acciones (9,7 %)', editor: 'Berkshire Hathaway (SEC)', tipo: 'Primaria', fecha: '2025-11-14', url: `${ED}/000119312525283610/xslSCHEDULE_13G_X01/primary_doc.xml` },
  { id: 7, titulo: 'Form 13F-HR de Berkshire Hathaway a 30-jun-2026 (VeriSign: 8.016.933 + 972.947 acciones)', editor: 'Berkshire Hathaway (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: 'https://www.sec.gov/Archives/edgar/data/1067983/000119312526352200/56757.xml' },
  { id: 8, titulo: 'Schedule 13G de AQR Capital Management (5,44 %)', editor: 'AQR (SEC)', tipo: 'Primaria', fecha: '2026-08-13', url: `${ED}/000116755726000171/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 9, titulo: 'Schedule 13G de Vanguard Capital Management (6,74 %) y Vanguard Portfolio Management (5,73 %)', editor: 'Vanguard (SEC)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000210011926001251/xslSCHEDULE_13G_X02/primary_doc.xml` },
  { id: 10, titulo: 'VeriSign (VRSN) Q3 2025 earnings call transcript (guía de 2025: ingresos 1.652-1.657 M; base de dominios +2,2-2,5 %)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2025-10-23', url: 'https://www.fool.com/earnings/call-transcripts/2025/11/27/verisign-vrsn-q3-2025-earnings-call-transcript/' },
  { id: 11, titulo: 'Form 4 de D. James Bidzos del 13-oct-2026 (ventas marcadas como plan 10b5-1; 375.127 acciones después)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: `${ED}/000120481626000053/wk-form4_1792012963.xml` },
  { id: 12, titulo: 'Form 10-K de 2025: directivos', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000101447326000006/vrsn-20251231.htm` },
  { id: 13, titulo: 'Titulares de guía de 2026 (base de dominios 1,5-3,5 % en feb; 3,1-4,3 % en abr; 5,2-6 % en jul)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://seekingalpha.com/api/sa/combined/VRSN.xml' },
  { id: 14, titulo: 'Resumen de la conferencia del 2T26 (guía de ingresos 1.745-1.755 M USD)', editor: 'FN2', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://fn2.ai/earnings/vrsn/2026-q2' },
];
const F4 = lee('form4.json');
const C = {
  _estado: 'Completa. Ventas de directivos del Form 4 (form4.mjs); la herramienta no detecta la marca de plan 10b5-1 de VeriSign, comprobada a mano en el Form 4 de Bidzos del 13-oct-2026 (aff10b5One = 1).',
  directivos: {
    equipo: [
      { nombre: 'D. James Bidzos', cargo: 'Presidente ejecutivo del consejo, consejero delegado y presidente', desde: '2011', participacion_pct: 0.43, trayectoria: 'Fundador y presidente del consejo desde 1995 (antes, de RSA Security); consejero delegado desde 2011. Con él la empresa vendió todo lo que no era registro y llevó el margen operativo del 63 % de 2018 al 68 % [12, 1].' },
      { nombre: 'John D. Calys', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.02, trayectoria: 'En la empresa desde 2010 (contralor global y director de contabilidad); sustituyó a George Kilguss en mayo de 2025 [12].' },
      { nombre: 'Danny R. McPherson', cargo: 'Vicepresidente ejecutivo de Tecnología y director de seguridad', desde: '2022', participacion_pct: 0.02, trayectoria: 'En la empresa desde 2010; antes en Arbor Networks. Responsable de la disponibilidad del 100 % de la resolución [12].' },
      { nombre: 'Thomas C. Indelicarto', cargo: 'Vicepresidente ejecutivo, secretario general y director jurídico', desde: '2014', participacion_pct: 0.02, trayectoria: 'En la empresa desde 2006; lleva la relación con ICANN, Comercio y el litigio de .web [12].' },
      { nombre: 'Kathleen A. Cote', cargo: 'Consejera independiente coordinadora', desde: '2008', participacion_pct: 0.03, trayectoria: 'Exconsejera delegada de Worldport Communications; consejera coordinadora y presidenta de la comisión de remuneraciones [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos de 1.635-1.650 M USD y base de dominios −0,7 % a +0,9 % (abril de 2025); subida a 1.652-1.657 M y +2,2-2,5 % en octubre', real: 'Ingresos de 1.656,6 M y base +2,6 %', cumplida: 'Sí' },
      { anio: '2026 (en curso)', guia: 'Ingresos de 1.715-1.735 M y base +1,5-3,5 % (febrero); 1.745-1.755 M y +5,2-6,0 % (julio)', real: '863,5 M en el primer semestre (+6,3 %) y base +5,1 % interanual en junio', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de casa: el director financiero, el jurídico y el técnico llevan más de diez años en la empresa, y la guía se ha cumplido y subido varias veces en 2025 y 2026 [10, 13, 14]. El punto débil es la sucesión: Bidzos tiene 71 años, acumula la presidencia ejecutiva, la dirección general y la presidencia de la compañía, y no hay un sucesor anunciado [1, 12]. Una propuesta de accionistas para separar los cargos recibió el 23 % de los votos en 2026 [2].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'D. James Bidzos', cargo: 'Presidente ejecutivo y consejero delegado', tipo: 'Ejecutivo', desde: '1995', comisiones: 'Ciberseguridad' },
      { nombre: 'Kathleen A. Cote', cargo: 'Consejera coordinadora', tipo: 'Independiente', desde: '2008', comisiones: 'Remuneraciones (presidenta), Gobierno' },
      { nombre: 'Courtney D. Armstrong', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Gobierno (presidente)' },
      { nombre: 'Yehuda Ari Buchalter', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Remuneraciones, Ciberseguridad (presidente)' },
      { nombre: 'Matthew J. Desch', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría, Ciberseguridad' },
      { nombre: 'Jamie S. Gorelick', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Gobierno, Ciberseguridad' },
      { nombre: 'Debra W. McCann', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta), Remuneraciones' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.0, voto_remuneracion_contra_pct: 4.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 15.54, fijo: 0.95, variable_corto: 1.59, variable_largo: 13.0, ratio_salario_medio: 67 },
    remuneracion: 'El primer ejecutivo cobró 15,5 M USD en 2025: 0,95 M de fijo, 1,59 M de bonus anual y 13,0 M en acciones (60 % por objetivos y 40 % por permanencia) [1]. El bonus anual depende a partes iguales de ingresos y margen operativo, con un mínimo del 98 % del objetivo [1]. Las acciones por objetivos se miden en tres años (2025-2027) por la TCAC del resultado operativo, con un máximo del 100 % si la rentabilidad para el accionista no bate al S&P 500 [1]: premia crecer el resultado, no el tamaño. Ratio con el empleado medio: 67 veces [1]. El voto consultivo sobre la remuneración tuvo un 93 % a favor en 2025 y un 95 % en 2026 (4,2 % en contra) [1, 2].',
    accionistas: [
      { nombre: 'Berkshire Hathaway (Warren Buffett)', pct: 9.9, tipo: 'Accionista de referencia', variacion: 'Vendió 4,3 M de acciones a 285 USD en julio de 2025 (de 14,2 % a 9,6-9,9 %) con un año de bloqueo; sin cambios a 30-jun-2026: 8.989.880 acciones [6, 7]' },
      { nombre: 'BlackRock', pct: 7.95, tipo: 'Institucional', variacion: 'Proxy de abril de 2026 [1]' },
      { nombre: 'Vanguard (dos gestoras)', pct: 12.5, tipo: 'Institucional', variacion: '6,74 % + 5,73 % tras separar sus gestoras en enero de 2026 [9]' },
      { nombre: 'Ninety One UK', pct: 5.75, tipo: 'Institucional', variacion: 'Proxy de abril de 2026 [1]' },
      { nombre: 'AQR Capital Management', pct: 5.44, tipo: 'Institucional', variacion: 'Nuevo 13G en agosto de 2026 [8]' },
      { nombre: 'Consejeros y directivos', pct: 0.56, tipo: 'Directivos', variacion: '509.395 acciones; Bidzos vende de forma continua [1, 5]' },
    ],
    insiders: F4.personas.filter((p) => p.ventas_importe > 0 || p.compras_importe > 0).map((p) => ({
      fecha: '2025-10-20 a 2026-10-15', persona: `${p.persona} (${p.cargo})`, operacion: p.compras_importe > p.ventas_importe ? 'Compra' : 'Venta',
      acciones: Math.round(p.compras_importe > p.ventas_importe ? p.compras_acciones : p.ventas_acciones), importe: r2((p.compras_importe > p.ventas_importe ? p.compras_importe : p.ventas_importe) / 1e6),
    })),
    control_y_defensas: 'Sin accionista de control: el mayor es Berkshire con ≈ 9,9 %, que redujo su posición en julio de 2025 para bajar del 10 % y no vota en bloque con la dirección [6, 1]. Una acción, un voto; consejo de siete con seis independientes, elección anual y consejera coordinadora [1]. La principal debilidad es la concentración de cargos en el fundador (presidente ejecutivo, consejero delegado y presidente), que los accionistas aceptaron en 2026 con un 23 % a favor de separarlos [2]. No hay operaciones vinculadas desde 2025 [1].',
    alertas: [
      'Bidzos (71 años) acumula los tres cargos y no hay sucesor anunciado; la propuesta de separar presidencia y dirección obtuvo el 23 % de los votos en 2026 [2].',
      'Desch recibió un 27 % de votos en contra en su elección de 2026 (dirige otra cotizada) [2].',
      `Ventas continuas de directivos: ${r1(F4.total_ventas / 1e6)} M USD en 12 meses, ${r1(F4.personas[0].ventas_importe / 1e6)} M de Bidzos, dentro de un plan 10b5-1 [5, 11].`,
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de VRSN, SPY y XLK (herramientas/bolsa.mjs): precio, rango, rentabilidades, beta, cierres de cada ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/VRSN/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de VeriSign y comparables (consenso, objetivos, PER adelantado, valor empresa)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VRSN/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Noticias y cambios de recomendación de VRSN (Wedbush 351 USD el 19-20-oct; Zacks a Mantener el 25-sep; JP Morgan Mantener el 31-jul; objetivo de consenso 333 USD)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/VRSN/news/' },
  { id: 6, titulo: 'Titulares de VRSN (guías y resultados frente al consenso, artículos de opinión)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-17', url: 'https://seekingalpha.com/api/sa/combined/VRSN.xml' },
  { id: 7, titulo: 'VeriSign FY2026 Q2: guía de ingresos subida de 1.730-1.745 a 1.745-1.755 M USD', editor: 'FN2', tipo: 'Prensa', fecha: '2026-07-23', url: 'https://fn2.ai/earnings/vrsn/2026-q2' },
  { id: 8, titulo: 'VeriSign Stock Slid Despite Strong Results, But Is The Real Test Still To Come? (caída de ≈ 20 % en junio)', editor: 'Trefis', tipo: 'Prensa', fecha: '2026-06-23', url: 'https://www.trefis.com/stock/vrsn/articles2/604038/verisign-stock-slid-despite-strong-results-but-is-the-real-test-still-to-come/2026-06-23' },
  { id: 9, titulo: 'VeriSign stock dives nearly 10% after outlook, costs take the shine off results', editor: 'TS2 Tech', tipo: 'Prensa', fecha: '2026-02-06', url: 'https://ts2.tech/en/verisign-stock-dives-nearly-10-after-outlook-costs-take-the-shine-off-results/' },
  { id: 10, titulo: '8-K: contrato de colocación de las acciones de Berkshire Hathaway con J.P. Morgan', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-07-30', url: `${ED}/000114036125027935/ny20052578x3_8k.htm` },
  { id: 11, titulo: 'Berkshire Hathaway has sold roughly one-third of its stake in VeriSign (4,3 M de acciones a 285 USD; bloqueo de un año)', editor: 'investingLive', tipo: 'Prensa', fecha: '2025-07-29', url: 'https://www.investinglive.com/stocks/berkshire-hathaway-has-sold-roughly-one-third-of-its-stake-in-verisign-raising-123-bn-20250729/' },
  { id: 12, titulo: 'Form 13F-HR de Berkshire Hathaway a 30-jun-2026', editor: 'Berkshire Hathaway (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: 'https://www.sec.gov/Archives/edgar/data/1067983/000119312526352200/56757.xml' },
  { id: 13, titulo: 'Verisign: fecha de los resultados del 3T26 (22-oct-2026, 16:05 de Nueva York)', editor: 'Earnings Whispers', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://www.earningswhispers.com/article/VRSN/2610016224' },
  { id: 14, titulo: 'Movimiento del precio (herramientas/movimiento.mjs): 1-12 meses, máximos, media de 200 sesiones, volatilidad', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/VRSN/history' },
  { id: 15, titulo: 'Verisign Reports Second Quarter 2026 Results', editor: 'VeriSign, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-23', url: `${ED}/000101447326000026/q22026earningsrelease.htm` },
  { id: 16, titulo: 'Form 4 de directivos (form4.mjs) y 8-K de la junta de 2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001014473&type=4' },
  { id: 17, titulo: '8-K: subida de .net a 12,00 USD (1-mar-2027)', editor: 'VeriSign, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-27', url: `${ED}/000101447326000030/vrsn-20260827.htm` },
];
const v = Y.VRSN;
const trend = (d, p) => d.trend.find((x) => x.periodo === p);
// Comparables: PER de los próximos 12 meses = precio ÷ (2,4/12 del BPA del año en curso + 9,6/12 del siguiente);
// FICO cierra en septiembre: su año en curso ya terminó y los próximos 12 meses son su FY2027.
const comps = [['GoDaddy', 'GDDY', 'US'], ['Akamai Technologies', 'AKAM', 'US'], ["Moody's", 'MCO', 'US'], ['S&P Global', 'SPGI', 'US'], ['MSCI', 'MSCI', 'US'], ['Fair Isaac (FICO)', 'FICO', 'US'], ['CME Group', 'CME', 'US'], ['Verisk Analytics', 'VRSK', 'US'], ['Intercontinental Exchange', 'ICE', 'US']].map(([n, t, p]) => {
  const d = Y[t], y0 = trend(d, '0y'), y1 = trend(d, '+1y');
  const ntm = t === 'FICO' ? y1.bpa : (2.4 / 12) * y0.bpa + (9.6 / 12) * y1.bpa;
  const ventasNtm = t === 'FICO' ? y1.ventas : (2.4 / 12) * y0.ventas + (9.6 / 12) * y1.ventas;
  return { nombre: n, ticker: t, pais: p, capitalizacion: Math.round(d.cap / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(d.precio / ntm), crecimiento_pct: r1((ventasNtm / d.ventas - 1) * 100), margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null,
    dn_ebitda: r1((d.ev - d.cap) / d.ebitda), fcf_yield_pct: null };
});
const pers = comps.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = pers[Math.floor(pers.length / 2)];
const id = B.identificacion;
const D = {
  _estado: 'Completa. Precio del informe: cierre del 19-oct-2026 (la sesión del 20-oct estaba abierta). Consenso de Yahoo (4 analistas con estimaciones; 5 con objetivo); MarketScreener no abre sin sesión.',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'VeriSign, Inc.', nombre_corto: 'VeriSign', ticker: 'VRSN', isin: 'US92343E1029', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnología de la información', industria: 'Servicios de TI (servicios e infraestructura de internet)', sede: 'Reston (Virginia)', fundacion: '1995', empleados: 928, web: 'https://www.verisign.com',
    precio: id.precio, fecha_precio: id.fecha_precio, acciones: 90.7, capitalizacion_publicada: Math.round(v.cap / 1e6), free_float_pct: 89.5,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Guía de 2026 (23-jul-2026, tercera subida del año): ingresos de 1.745-1.755 M USD (+5,3-5,9 %) y crecimiento de la base de dominios del 5,2-6,0 % [7, 6]; en febrero era de 1.715-1.735 M y +1,5-3,5 % [6]. Gastos financieros netos estimados por la empresa en 59-65 M [7]. La empresa no da guía de 2027 hasta febrero; los cambios conocidos para 2027 son la subida de .com a 10,97 USD (1-nov-2026) y la de .net a 12,00 (1-mar-2027) [15, 17]. No espera ingresos relevantes de .web en 2026 [7].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(trend(v, '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(trend(v, '0y').bpa), dpa: 3.24, fuente: `Yahoo Finance, ${trend(v, '0y').n} analistas [2]` },
      { periodo: '2027e', ingresos: Math.round(trend(v, '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(trend(v, '+1y').bpa), dpa: null, fuente: `Yahoo Finance, ${trend(v, '+1y').n} analistas [2]` },
    ],
    recomendaciones: { n_analistas: 5, comprar: 3, mantener: 2, vender: 0, po_medio: v.po_medio, po_min: v.po_min, po_max: v.po_max },
    revisiones: `El BPA de 2026 del consenso sube de ${r2(trend(v, '0y').bpa_hace90)} USD hace 90 días a ${r2(trend(v, '0y').bpa)} y el de 2027 de ${r2(trend(v, '+1y').bpa_hace90)} a ${r2(trend(v, '+1y').bpa)} (+4,8 %), por la guía subida en julio y la subida de .com [2, 7]. Los objetivos suben: Wedbush de 324 a 341 en septiembre y a 351 USD el 19-oct; JP Morgan a 316 en julio (Mantener); Zacks bajó a Mantener el 25-sep [5]. Solo 4-5 analistas publican estimaciones en Yahoo: el consenso es estrecho; MarketBeat da un objetivo medio de 333 USD [5].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(v.corto_pct * 100),
    comentario: 'VeriSign subió un 27,3 % en 2026 hasta el 19-oct, el doble que el S&P 500 (13,3 %), pero a cinco años rinde un 7,8 % anual frente al 12,6 % del índice [1]: el PER bajó de ≈ 40 veces en 2021 a ≈ 25 en 2022-2024 con los dominios cayendo [1]. En 2025-2026 el precio se ha movido por tres cosas: la venta de Berkshire en julio de 2025 (−7 % en el día) [11], la caída de ≈ 20 % de mayo a junio de 2026 por el miedo a que la subida de .com frene las altas [8] y la recuperación de julio-agosto tras subir la guía de dominios al 5,2-6 % [6]. Beta de 0,67 (mensual, 5 años) y volatilidad del 29 % [1].',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: -0.3, var_3m_pct: 17.0, var_6m_pct: 13.9, var_12m_pct: 16.0, dist_max_52s_pct: -0.9, dist_min_52s_pct: 45.3, dist_max_historico_pct: -0.9, tendencia: 'alcista', volatilidad_60d_pct: 24.5, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'feb-2026', var_pct: -9.5, causa: 'Resultados del 4T25 (BPA 0,05 USD bajo el consenso) y guía de 2026 prudente (base de dominios +1,5-3,5 %); mínimo del año el 6-feb (−7,6 % en el día) [9, 6, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jun-2026', var_pct: -19.2, causa: 'Del máximo del 22-may a 23-jun: miedo a que la subida de .com (+6,9 % en noviembre) frene las altas y adelante bajas, más ventas de directivos; caída del 6,4 % el 22-jun sin noticia de la empresa [8, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago-2026', var_pct: 16.6, causa: 'Resultados del 2T26 y guía de base de dominios subida al 5,2-6,0 % y de ingresos a 1.745-1.755 M; ampliación de recompras a 1.500 M [15, 7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-22', tipo: 'resultados', hecho: 'Resultados del 3T26 el 22-oct a las 16:05 de Nueva York; consenso de BPA 2,42 USD e ingresos de 440 M [13, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-19', tipo: 'recomendación', hecho: 'Wedbush sube el objetivo a 351 USD (Superior); antes, 341 en septiembre [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-25', tipo: 'recomendación', hecho: 'Zacks Research baja la recomendación a Mantener [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-27', tipo: 'demanda o regulador', hecho: 'Subida de .net de 10,91 a 12,00 USD el 1-mar-2027 (máximo del 10 % permitido) [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-28', tipo: 'accionista de referencia', hecho: 'Vence el bloqueo de un año de Berkshire Hathaway tras vender 4,3 M de acciones en julio de 2025; a 30-jun-2026 mantenía 8,99 M (≈ 9,9 %), sin nueva colocación anunciada [10, 11, 12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-23', tipo: 'resultados', hecho: 'Guía de 2026 subida por tercera vez; recompras ampliadas a 1.500 M USD [15, 7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-26', tipo: 'ampliación o convertible', hecho: 'Bonos de 550 M USD al 5,10 % hasta 2031 para amortizar los de 2027 al 4,75 %: refinanciación, no deuda nueva [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-23', tipo: 'demanda o regulador', hecho: 'Subida de .com de 10,26 a 10,97 USD el 1-nov-2026 (+6,9 %, dentro del tope del 7 %); la NTIA había defendido en 2024 una bajada de precios sin lograr acordarla [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-10-20 a 2026-10-15', tipo: 'directivos', hecho: 'Ventas de directivos por 37,4 M USD en 12 meses (Bidzos 32,1 M, 120.000 acciones; conserva 375.127), dentro de un plan 10b5-1 y sin compras relevantes [16].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-22',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'El precio está a un 0,9 % de su máximo histórico tras subir un 17 % en tres meses, con tendencia alcista (14 % sobre la media de 200 sesiones) y sin avisos de movimiento [14]. Los movimientos fuertes de 2026 tienen causas que el análisis recoge: la guía de dominios y la subida de .com [8, 15]. No hay ningún hecho pendiente ajeno al análisis con fecha que pueda mover el precio más de un 5 % en contra: Berkshire puede volver a vender desde finales de julio de 2026 (el 9,9 % restante), pero no hay colocación anunciada y su 13F de junio no muestra ventas [12]. Las ventas de Bidzos son de un plan programado y repetido cada mes. Los resultados del 22-oct no retrasan (regla 11). Veredicto global: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => +c.anio >= 2018).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2020' || c.anio === '2021' })),
    comentario: 'Se excluyen 2020 y 2021 en el PER de los últimos 12 meses porque el BPA de esos años está inflado por beneficios fiscales (impuesto negativo): el PER publicado parece más bajo de lo que era. Con el BPA normalizado, la acción cotizó a ≈ 40 veces en 2020-2021 y bajó a ≈ 26 en 2022-2024, cuando la base de dominios dejó de crecer; en 2025-2026 se ha recuperado a ≈ 28-30 con la vuelta del crecimiento de dominios y la nueva subida de precio [1].',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'No hay otro registro cotizado de tamaño comparable: los demás son privados (Identity Digital), sin ánimo de lucro (PIR) o diminutos (Team Internet, ≈ 90 M GBP, excluido). Se usan negocios de «peaje» con márgenes muy altos, ingresos recurrentes y poder de precios regulado o casi monopolístico (Moody\'s, S&P Global, MSCI, FICO, CME, Verisk, ICE) y dos de infraestructura de internet (GoDaddy, cliente y registrador; Akamai). Todas con Yahoo a 20-oct-2026, PER de los próximos 12 meses con el BPA del consenso (ajustado en varias: no es la misma base que el GAAP de VeriSign) [2].',
    empresas: comps,
    comentario: `VeriSign cotiza a ≈ 28 veces el beneficio de los próximos 12 meses, por encima de la mediana de los comparables (${String(medPer).replace('.', ',')} veces) y en la parte alta con Moody's y MSCI, con menos crecimiento de ventas que la mayoría pero el mayor margen EBITDA (≈ 69 %) y casi sin capital invertido [2]. La prima se explica por el monopolio contractual de .com y la conversión en caja; la penaliza el crecimiento limitado por contrato y la dependencia de un solo producto. GoDaddy (≈ 10 veces) y Akamai (≈ 13) cotizan bajo porque tienen competencia real y más inversión. Uso del PER: el EV/EBITDA de Yahoo es ajustado en varias y no es comparable.`,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo publicado', tipo: 'Complemento', intentos: '1) compras de registros (Afilias por Donuts en 2020, Neustar Registry por GoDaddy en 2020, PIR por Ethos en 2019-2020, bloqueada): precio sin EBITDA publicado o no publicado; 2) prensa sectorial (Domain Name Wire, DomainIncite) sin múltiplos oficiales; 3) VeriSign no tiene precedente comparable: un control de .com exigiría el visto bueno de ICANN y Comercio', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones de 2028e y EBITDA del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026 y 2027, BPA y ventas); 2) MarketBeat (solo año en curso y siguiente); 3) MarketScreener no abre sin sesión', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $VRSN (30 últimos, jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/VRSN.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos de opinión sobre VRSN (dic-2025 a oct-2026: «Too Expensive Despite Its Monopoly», «Recovering Domain Base…», «Healthy Registrations, Exorbitant Price»…)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-17', url: 'https://seekingalpha.com/api/sa/combined/VRSN.xml' },
  { id: 3, titulo: 'MarketBeat: noticias y comentarios de VRSN', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://www.marketbeat.com/stocks/NASDAQ/VRSN/news/' },
  { id: 4, titulo: 'VeriSign Controls the Internet\'s Address Book, But AI Disruption and a Key Contract Renewal Loom Large', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-07-06', url: 'https://www.fool.com/investing/2026/07/06/verisign-controls-the-internets-address-book-but-a/' },
];
const E = {
  _estado: 'Completa con poco debate: Stocktwits tiene pocos mensajes con contenido; Seeking Alpha da titulares y tesis de los autores. Reddit da 403.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($VRSN)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Pocos mensajes con contenido; 7 alcistas y 1 bajista marcados. Se comenta la «base enorme» del gráfico y las subidas de objetivo; el único bajista dice que las empresas usan .ai en vez de .com [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mitad caro y mitad comprar: «demasiado cara pese al monopolio» (12-oct) frente a «una base de dominios que se recupera da peso al motor de precios» (17-oct); en julio, «registros sanos, precio exorbitante» y una mejora de recomendación [2].' },
      { plataforma: 'MarketBeat (noticias y comentarios)', fecha: '2026-10', n_comentarios: 15, tono: 'Neutro', resumen: 'Recoge subidas de objetivo (Wedbush 351 USD) y la rebaja de Zacks a Mantener; objetivo medio de 333 USD [3].' },
      { plataforma: 'The Motley Fool (artículo y comentarios)', fecha: '2026-07', n_comentarios: 10, tono: 'Dividido', resumen: 'El riesgo citado es la IA: si los agentes navegan por nosotros, la dirección .com pierde relevancia; también la renovación de los contratos en 2029-2030 [4].' },
    ],
    temas: [
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en parte: ≈ 28 veces los beneficios de 12 meses frente a una mediana de ≈ 22 de los comparables; el DCF del informe no justifica el precio con la tasa de descuento de hoy [2].' },
      { tema: 'Recuperación de la base de dominios', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo confirman: +5,1 % interanual en junio y guía del 5,2-6 % [2].' },
      { tema: 'Subidas de precio de .com y .net', postura: 'Alcista', peso: 'Medio', contraste: '+6,9 % en .com desde noviembre y +10 % en .net desde marzo: dan ≈ 5 puntos de crecimiento en 2027-2028 si no frenan las altas [2].' },
      { tema: 'IA y extensiones como .ai', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real a largo plazo pero sin señal en los datos: las altas suben y la empresa atribuye parte a la IA; el informe lo recoge en el bajista [1, 4].' },
    ],
    lectura: 'El sentimiento está dividido entre quienes ven un peaje de internet que vuelve a crecer y quienes lo ven caro; no hay euforia (pocos mensajes, recomendaciones de Mantener y Comprar a partes iguales) ni capitulación. El tema de la IA aparece en los foros como amenaza (.ai, agentes) y en la empresa como impulso de las altas: la sección de riesgos lo recoge. Coincide con los analistas: objetivo medio de 326-333 USD, ≈ 7-9 % sobre el precio [3].',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, comps.map((c) => `${c.ticker} ${c.per_ntm}`).join(', '));
