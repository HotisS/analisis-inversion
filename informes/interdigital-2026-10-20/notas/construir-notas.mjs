// Escribe las notas A-E de InterDigital (IDCC, corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR y
// relación con inversores), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary
// del 20-oct-2026 antes de la apertura, cierre del 19-oct) y de form4.json. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/interdigital-2026-10-20/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1405495';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas, notas de ingresos, clientes, patentes, deuda convertible, litigios, retribución en acciones)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000140549526000011/idcc-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, ingresos contratados, concentración, litigios, Amazon', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000066/idcc-20260630.htm` },
  { id: 3, titulo: 'InterDigital Announces Financial Results for Second Quarter 2026 (nota de resultados y conciliación no GAAP)', editor: 'InterDigital, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000065/ex991q263026pressrelease.htm` },
  { id: 4, titulo: 'Material suplementario del 2T26 (conciliación 2020-2025, ARR por programa, objetivos 2030)', editor: 'InterDigital, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000065/supplementalmaterialsq22.htm` },
  { id: 5, titulo: 'Notas de resultados del 1T26, 4T25, 3T25 y 2T25', editor: 'InterDigital, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000140549526000034/ex991q133126pressrelease.htm` },
  { id: 6, titulo: 'Form 10-K 2024 (ingresos recurrentes y atrasados de 2023-2024, patentes, clientes)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-02-06', url: `${ED}/000140549525000011/idcc-20241231.htm` },
  { id: 7, titulo: 'Form 10-K 2022 (ingresos recurrentes y no recurrentes 2020-2022, patentes capitalizadas)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2023-02-15', url: `${ED}/000140549523000011/idcc-20221231.htm` },
  { id: 8, titulo: 'XBRL company facts de InterDigital (inversiones a corto plazo, pasivos de contrato, pagos en acciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001405495.json' },
  { id: 9, titulo: 'Transcripción de la conferencia del 2T26 (Amazon, Disney, arbitrajes, costes de litigio, conversiones)', editor: 'InterDigital, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2026-07-30', url: 'https://s25.q4cdn.com/626766191/files/doc_earnings/2026/q2/transcript/Transcript-Q2-26.pdf' },
  { id: 10, titulo: 'Transcripción de la conferencia del 1T26 (Xiaomi, renovaciones, gastos de licencia, 6G)', editor: 'InterDigital, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://s25.q4cdn.com/626766191/files/doc_earnings/2026/q1/transcript/Transcript-Q1-26.pdf' },
];

// Caja + inversiones a corto plazo [8, 1]; patentes netas [1, 6, 7]; patentes capitalizadas (capex de intangibles) [1, 6, 7];
// pasivos de contrato = ingresos diferidos corrientes + no corrientes [8].
const ST = { 2020: 453.2, 2021: 235.3, 2022: 508.3, 2023: 569.3, 2024: 430.8, 2025: 504.2 };
const PAT = { 2020: 418.3, 2021: 363.6, 2022: 354.0, 2023: 313.0, 2024: 308.6, 2025: 318.8 };
const CAPPAT = { 2020: 30.6, 2021: 33.4, 2022: 39.6, 2023: 40.4, 2024: 52.9, 2025: 54.6 };
const DIF = { 2020: 219.9 + 108.1, 2021: 291.7 + 19.5, 2022: 189.1 + 237.6, 2023: 153.6 + 223.9, 2024: 178.0 + 182.1, 2025: 193.7 + 135.9 };
const NOREC = { 2020: 9, 2021: 30, 2022: 3, 2023: 10, 2024: -4, 2025: 7 }; // «other operating items» de la conciliación [4]
const anios = ['2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, coste_ventas: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[c.periodo], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const a = b.periodo;
  const o = { ...b, caja: r1(b.caja + ST[a]), intangibles: PAT[a], arrendamientos: 0, existencias: 0, proveedores: null, pasivos_contrato: r1(DIF[a]), minoritarios: b.minoritarios ?? 0 };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const a = f.periodo;
  const o = { ...f, capex: r1(f.capex + CAPPAT[a]), pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0 };
  delete o.fin; return o;
});
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r1(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con los 10-K 2022, 2024 y 2025 y las notas de resultados. Caja = efectivo + inversiones a corto plazo; capex = inmovilizado + patentes capitalizadas; pasivos de contrato = ingresos diferidos.',
  financieros: {
    cuenta, ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 788.5, ebitda: null, ebit: null, beneficio_neto: 302.1, bpa: null, dpa: 2.7, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 8 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 359 M USD en 2020 a 834 M en 2025 (TCAC del 18 %), pero con saltos que no son crecimiento: los ingresos atrasados («catch-up», regalías de periodos anteriores a la firma) fueron 22 M en 2020, 74 M en 2021, 54 M en 2022, 141 M en 2023, 460 M en 2024 y 277 M en 2025 [7, 6, 1], y otros 167 M en el primer semestre de 2026 [2]. Los recurrentes fueron 337 M en 2020, 404 M en 2022, 408 M en 2023 y 2024 y 557 M en 2025 [7, 6, 1]: el salto de 2025 es el arbitraje de Samsung (131 M al año desde julio de 2025, +67 %) y las licencias de vivo, Honor y HP [1]. El margen EBITDA publicado subió del 38 % en 2020 al 65 % en 2025 por apalancamiento operativo: los gastos operativos apenas cambian con los ingresos (373 M en 2025 frente a 429 M en 2024, cuando la cuota de ingresos cedida a Sony y Technicolor por el acuerdo de televisores de Samsung sumó 71 M) [1]. En 2026 el margen baja (GAAP: beneficio neto 192 M en el semestre frente a 296 M) por menos atrasados, más costes de litigio y más pagos en acciones [3].',
    ajustes: 'La empresa publica un EBITDA ajustado (589 M en 2025) que suma los pagos en acciones (43 M), partidas no recurrentes (7 M) y el resultado financiero, y un BPA no GAAP (15,31 USD en 2025) que excluye además la amortización de patentes compradas a Technicolor (36 M) y que se calcula con acciones «económicas» (30,4 M en 2025) que descuentan la dilución de la convertible cubierta por las opciones compradas [4]. El BPA GAAP diluido (11,80 USD) usa 34,5 M de acciones porque la norma no deja restar la cobertura [1]. Usamos cifras publicadas; en «no_recurrentes_en_ebitda» van los «other operating items» de la conciliación (reestructuración de 28 M en 2021, indemnizaciones y reembolsos netos de costas) [4].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 128.7, null, 64.8, 1.14, null),
      trim('4T24', 252.8, null, 198.1, 4.09, null),
      trim('1T25', 210.5, null, 159.1, 3.45, null),
      trim('2T25', 300.6, 34.5, 236.7, 5.35, 'Superior'),
      trim('3T25', 164.7, 28.0, 104.9, 1.93, 'Superior'),
      trim('4T25', 158.2, -37.4, 88.2, 1.20, 'Superior'),
      trim('1T26', 205.4, -2.4, 111.8, 2.14, 'Superior'),
      trim('2T26', 260.2, -13.4, 184.1, 3.40, 'Superior'),
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa (suma los pagos en acciones) y BPA GAAP diluido; «Superior» frente a la guía trimestral de la propia empresa, que solo incluye contratos firmados [3, 5]. En el 2T26 (30-jul-2026) los ingresos fueron 260 M frente a una guía de 139-143 M por el acuerdo con Amazon: 110 M del nuevo programa de streaming y nube, de ellos 104 M atrasados; el ARR (ingresos recurrentes del trimestre × 4) llegó a 626 M (+13 %) y la guía anual subió a 775-845 M [3]. El director financiero dijo que Amazon se contabiliza con una estimación prudente y que el ajuste final del arbitraje (18-24 meses) será «más probablemente» al alza [9]. Los analistas preguntaron por los plazos de Disney (dos mandatos del Tribunal Unificado de Patentes en 11 países), por si otras plataformas esperan al resultado de Amazon y por los costes de litigio; la dirección no dio cifras del acuerdo de Amazon («confidencial») ni dijo qué renovaciones faltan para el 4T [9]. En el 1T26 (30-abr) batió su guía pero mantuvo la anual y dio un 2T de 139-143 M; los gastos de licencia subieron con la cuota cedida del acuerdo de televisores de LG y los litigios, y la acción cayó un 15,9 % ese día [5, 10].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2027', importe: 380 }],
    liquidez: 'Caja e inversiones a corto plazo de 1.112 M USD a 30-jun-2026 (1.243 M a 31-dic-2025) frente a una sola deuda financiera: la convertible al 3,5 % con vencimiento en 2027 (380 M de nominal a 30-jun-2026, de los que 80,3 M ya se pidieron convertir y se liquidan en el 3T26 en efectivo hasta el nominal) [2, 3]. Además, unos 1.900 M de cobros pendientes de contratos de cuota fija [2].',
    rating: 'Sin rating público (no consta en el 10-K)',
    coste_deuda_pct: 3.5,
    vida_media_anios: 0.7,
    otros_pasivos: 'Convertible 2027: conversión a 76,72 USD por acción; la empresa paga en efectivo el nominal y el exceso en acciones o efectivo, y la cobertura comprada (opciones) anula la dilución hasta 105,43 USD [3, 2]. Por encima de 105,43 diluyen los 6,0 M de warrants vendidos, que vencen con entrega neta de acciones entre septiembre de 2027 y abril de 2028: a 322 USD equivalen a unos 4,0 M de acciones nuevas (estimación propia: 6,0 × (322,4 − 105,43) ÷ 322,4), ya incluidas en las acciones no GAAP de la empresa (30,6 M en la guía de 2026) [3]. Ingresos diferidos de 442 M a 30-jun-2026 (cobros anticipados de licencias) [3]. Reparto de ingresos con Technicolor (42,5 % de los cobros de nuevas licencias del programa «Madison») no provisionado por no ser probable [1]. Arrendamientos operativos de 17,6 M (fuera del puente: US GAAP) [1].',
    comentario: 'El circulante es negativo por los cobros anticipados: los ingresos diferidos (330 M a cierre de 2025) superan a clientes y activos de contrato (90 M) [1, 8]. Los saltos de clientes (188 M en 2024, 193 M a junio de 2026) son facturas de atrasados recién firmadas que se cobran en uno o dos trimestres [2, 9]. La deuda bruta bajó de 608 M en 2023 a 378 M en junio de 2026 por conversiones anticipadas pagadas en efectivo (80 M en el 1T26 y 83 M en el 3T26) [9, 3]. La caja neta, unos 734 M a junio de 2026, es el 9 % de la capitalización [3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo sigue a los cobros de licencias, no al ingreso contable: 545 M en 2025 frente a 272 M en 2024, porque los atrasados de 2024 (460 M) se cobraron en parte en 2025 y los contratos de cuota fija se cobran por adelantado [1]. El flujo libre de la empresa (operativo − inmovilizado − patentes capitalizadas) fue de 474 M en 2025 [4]. La inversión es pequeña y casi toda de mantenimiento del catálogo: 16 M de inmovilizado y 55 M de costes externos de patentes capitalizados en 2025 (2,0 % y 6,5 % de las ventas) [1]; la I+D (211 M) va a gasto. Uso de la caja 2021-2025: recompras de unos 610 M, dividendos de 227 M y amortización de deuda [1, 4].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades) en 2025, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias pero el reconocimiento de ingresos exige juicio: en los acuerdos de cuota fija «dinámica» el ingreso se reparte en el plazo, y cuando el precio lo fija un arbitraje (Samsung 2023-2025, Lenovo, Amazon) se reconoce una estimación «prudente» limitada a lo que no tendrá reversión significativa y se ajusta al conocerse el laudo [1, 2]. Eso adelantó 118 M de atrasados de Samsung en 2025 y hará lo mismo con Amazon y Lenovo, en los dos sentidos. Samsung pidió en diciembre de 2025 a la Cámara de Comercio Internacional revisar el laudo de 1.050 M; la empresa presentó objeciones de jurisdicción en julio de 2026 y no provisiona nada [2]. Los pagos en acciones pasaron de 10 M en 2020 a 43 M en 2025 y a 61 M guiados en 2026 (7,5 % de las ventas) [4, 3]: coste real que el no GAAP excluye. Lectura de los indicadores del motor: el Altman alto refleja caja y beneficios acumulados; el Beneish puede saltar por los ingresos atrasados y los saldos de clientes de un año a otro, no por manipulación.',
    senales: [
      { senal: 'Ingresos estimados en arbitrajes abiertos', nivel: 'Media', comentario: 'Amazon y Lenovo se reconocen con una estimación prudente hasta el laudo; el ajuste final irá a resultados de golpe [2, 9].' },
      { senal: 'Samsung impugna el laudo de 1.050 M', nivel: 'Media', comentario: 'Solicitud a la CCI de diciembre de 2025; 131 M de ingresos recurrentes al año en juego [1, 2].' },
      { senal: 'Pagos en acciones crecientes', nivel: 'Media', comentario: 'De 10 M (2020) a 61 M guiados en 2026; el BPA no GAAP los excluye [4, 3].' },
      { senal: 'BPA GAAP con dilución contable de la convertible', nivel: 'Baja', comentario: '3,7-4,1 M de acciones que la cobertura anula; la dilución económica real son los warrants por encima de 105,43 USD [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en investigación y en el catálogo de patentes, mantener un balance «fortaleza» porque litiga contra empresas muy grandes, compras oportunistas y devolver el exceso de caja [4, 9]. Dividendo trimestral de 0,75 USD desde octubre de 2026 (0,35 en 2021, 0,60 en 2025, 0,70 en el 1S26) y 96 M pendientes del programa de recompras a 30-jun-2026, sin plazo [2]. Más de 600 M recomprados en cinco años y acciones −16 % desde 2020 según la empresa [4].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Deep Render (empresa emergente de compresión de vídeo con IA y sus patentes)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en investigación de vídeo; importe no publicado [1].' },
      { anio: '2019', objetivo: 'Unidad de investigación e innovación de Technicolor', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Base del programa de vídeo; reparto de ingresos del 42,5 % con Technicolor en el programa «Madison» [1].' },
      { anio: '2018', objetivo: 'Negocio de licencias de patentes de Technicolor (catálogo de vídeo y televisores)', importe: 143, ev_ebitda: null, financiacion: 'Caja', resultado: 'Abrió el programa de electrónica de consumo: acuerdos de televisores con Samsung (2024) y LG (2026) [1, 6].' },
    ],
    comentario: 'La asignación de capital ha sido buena: con inversiones pequeñas (patentes 30-55 M al año y compras de Technicolor) el beneficio neto pasó de 45 M en 2020 a 407 M en 2025 [1], el capital invertido operativo es muy pequeño (patentes de 319 M y circulante negativo) y las recompras se hicieron sobre todo en 2022-2023 a 50-110 USD por acción, muy por debajo del precio de hoy (340 M en 2023) [1]. Restan dos cosas: la convertible de 2022 dejó 6,0 M de warrants vendidos a 105,43 USD que diluirán unos 4 M de acciones (−15 % sobre 25,8 M) entre 2027 y 2028 [3], y las recompras se han frenado con la acción cara (23 M en el 2T26) [3].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Smartphone', descripcion: 'Licencias de patentes celulares (3G-5G), Wi-Fi y vídeo a fabricantes de móviles, tabletas y equipos de red.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 597.5, resultado: null }, { periodo: '2025', ingresos: 678.9, resultado: null }] },
      { nombre: 'CE, IoT/Auto', descripcion: 'Televisores, ordenadores, consolas, descodificadores, dispositivos de IoT celular y coches conectados.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 268.7, resultado: null }, { periodo: '2025', ingresos: 154.6, resultado: null }] },
      { nombre: 'Streaming y nube', descripcion: 'Plataformas de vídeo bajo demanda y servicios en la nube (primer contrato: Amazon, 2T26).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 0, resultado: null }, { periodo: '2025', ingresos: 0, resultado: null }] },
      { nombre: 'Otros', descripcion: 'Ventas de patentes y otros ingresos menores.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 2.3, resultado: null }, { periodo: '2025', ingresos: 0.5, resultado: null }] },
    ],
    geografias: [
      { nombre: 'China', peso_pct: 37.1 }, { nombre: 'Corea del Sur', peso_pct: 31.5 }, { nombre: 'Estados Unidos', peso_pct: 28.7 },
      { nombre: 'Taiwán', peso_pct: 1.5 }, { nombre: 'Japón', peso_pct: 0.9 }, { nombre: 'Europa', peso_pct: 0.4 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ingresos recurrentes anualizados, ARR (M USD)', valor_anterior: '468,0 (4T24)', valor_actual: '625,7 (2T26)', variacion: '+34 %', comentario: '582,4 al cierre de 2025; objetivo de más de 1.000 M en 2030 [3, 5, 4].' },
      { kpi: 'ARR de móviles (M USD)', valor_anterior: '≈ 417 (1T25)', valor_actual: '491,8 (1T26)', variacion: '+18 %', comentario: 'Objetivo 2030 ≈ 500 M: ya casi alcanzado [5, 4].' },
      { kpi: 'ARR de streaming y nube (M USD)', valor_anterior: '0', valor_actual: '≈ 60 (2T26)', variacion: 'n.s.', comentario: 'Solo Amazon, con estimación prudente; objetivo 2030 de más de 300 M [4, 9].' },
      { kpi: 'Ingresos atrasados (M USD)', valor_anterior: '460,1 (2024)', valor_actual: '277,4 (2025)', variacion: '−40 %', comentario: '167,4 M en el 1S26 [1, 2].' },
      { kpi: 'Cuota del mercado de móviles licenciada', valor_anterior: '≈ 85 % (2025)', valor_actual: '≈ 85 % (2T26)', variacion: '=', comentario: '8 de los 10 mayores fabricantes; fuera Transsion (en litigio) y Lenovo en arbitraje [4].' },
      { kpi: 'Ingresos contratados de cuota fija pendientes (M USD)', valor_anterior: 'n.d.', valor_actual: '2.113 (30-jun-2026)', variacion: 'n.s.', comentario: '573 M en 2027, 477 M en 2028, 417 M en 2029 y 281 M en 2030 [2].' },
    ],
    clientes: 'Concentración muy alta: en 2025 tres licenciatarios superaron el 10 % de los ingresos (Samsung 31 %, Apple 16 % y vivo 14 %) y sumaron el 61 % [1]; en 2024 fueron el 79 % [1]. En el 2T26 Amazon fue el 42 % por los atrasados, y Apple y Samsung el 13 % cada uno [2]. El 93 % de los ingresos de 2025 vino de contratos de cuota fija, que no dependen de las ventas del cliente [1]. Plazos: Apple hasta el 30-sep-2029, Samsung (móviles) hasta el 31-dic-2030, Xiaomi cinco años desde enero de 2026 [1]; el acuerdo de televisores de Samsung venció el 31-dic-2025 sin renovar, y cinco contratos que daban 31,7 M al año siguen sin renovar [1]. Poder de precio demostrado en renovaciones: Samsung +67 % por arbitraje [1].',
  },
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 (negocio, catálogo, competencia, regulación FRAND, riesgos)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000140549526000011/idcc-20251231.htm` },
  { id: 2, titulo: 'Material suplementario del 2T26 (mercados alcanzables con datos de Counterpoint y Omdia, cobertura de licencias)', editor: 'InterDigital, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000065/supplementalmaterialsq22.htm` },
  { id: 3, titulo: 'Qualcomm Form 10-K del ejercicio 2025 (segmento QTL: ingresos de licencias y margen)', editor: 'Qualcomm Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-05', url: 'https://www.sec.gov/Archives/edgar/data/804328/000080432825000085/qcom-20250928.htm' },
  { id: 4, titulo: 'Nokia Form 20-F 2025 (Nokia Technologies: ventas y resultado operativo)', editor: 'Nokia Corporation (SEC)', tipo: 'Primaria', fecha: '2026-03-05', url: 'https://www.sec.gov/Archives/edgar/data/924613/000162828026015034/nok-20251231.htm' },
  { id: 5, titulo: 'Dolby Laboratories, Adeia y Rambus: XBRL de la SEC (ingresos y resultado operativo de 2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001308547.json' },
  { id: 6, titulo: 'Form 10-Q del 2T26 (litigios con Disney, Transsion, Tesla, Dolby; Amazon)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000066/idcc-20260630.htm` },
  { id: 7, titulo: 'Tipos de cambio de referencia del BCE (19-oct-2026: 1,1225 USD por euro)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Transcripción de la conferencia del 1T26 (6G: estándar en 2029 y despliegue amplio en 2030)', editor: 'InterDigital, Inc. (relación con inversores)', tipo: 'Primaria', fecha: '2026-04-30', url: 'https://s25.q4cdn.com/626766191/files/doc_earnings/2026/q1/transcript/Transcript-Q1-26.pdf' },
];
const usd = (eur) => Math.round(eur * 1.1225);
const B_ = {
  _estado: 'Completa salvo la serie histórica del tamaño del mercado de licencias (hueco).',
  historia: {
    resumen: 'Fundada en 1972, InterDigital nació como empresa de tecnología inalámbrica y se convirtió en una de las pocas casas de investigación «pura» que financian I+D con licencias de patentes esenciales para los estándares celulares (3G, 4G, 5G y ya 6G) y Wi-Fi [1]. En 2018-2019 compró a Technicolor su negocio de licencias y su unidad de investigación de vídeo, que le dio el catálogo de códecs (HEVC, VVC) y de televisión con el que abrió los programas de electrónica de consumo y, en 2026, de streaming [1]. Desde 2021 la dirige Liren Chen, antes jefe mundial de propiedad intelectual de Qualcomm, que ha cerrado las grandes renovaciones (Apple 2022, Samsung por arbitraje en 2025, Xiaomi 2026) y llevado la estrategia a litigar en el Tribunal Unificado de Patentes, Alemania, Brasil e India [1, 6].',
    hitos: [
      { anio: '1972', hito: 'Fundación; la empresa contribuye a los sistemas celulares digitales desde los primeros estándares [1].' },
      { anio: '2018', hito: 'Compra del negocio de licencias de patentes de Technicolor (vídeo y televisores) [1].' },
      { anio: '2019', hito: 'Compra de la unidad de investigación e innovación de Technicolor: nace el área de vídeo [1].' },
      { anio: '2021', hito: 'Liren Chen, de Qualcomm, consejero delegado; reestructuración (28 M) [1].' },
      { anio: '2022', hito: 'Renovación con Apple hasta el 30-sep-2029; convertible de 460 M al 3,5 % con vencimiento en 2027 [1].' },
      { anio: '2024', hito: 'Licencias de OPPO y de los televisores de Samsung, arbitraje con Lenovo: 460 M de ingresos atrasados [1].' },
      { anio: '2025', hito: 'Laudo de Samsung (1.050 M en ocho años), licencias de vivo, Honor y HP; demandas contra Disney y Amazon; compra de Deep Render [1].' },
      { anio: '2026', hito: 'Renovación de Xiaomi, televisores de LG, acuerdo con Amazon con precio por arbitraje; entrada en el S&P MidCap 400 [6, 2].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de licencias de patentes de tecnología estándar (celular, Wi-Fi y códecs de vídeo) que pagan los fabricantes de dispositivos y, desde 2026, las plataformas de vídeo. Es un mercado de pocos licenciantes con catálogos grandes: Qualcomm (QTL), Nokia Technologies, Ericsson, Huawei, InterDigital y, en vídeo, Dolby y los consorcios de patentes [1, 3, 4]. No hay estadística oficial: lo medimos como la suma de los ingresos de licencias publicados por los licenciantes cotizados (estimación propia). La empresa usa como mercado alcanzable el de los productos finales: móviles (≈ 465.000 M USD de ventas mayoristas en 2025), electrónica de consumo e IoT (≈ 440.000 M) y vídeo por suscripción y con publicidad (≈ 485.000 M), con datos de Counterpoint y Omdia [2].',
    tamano: '≈ 9.200 M USD en 2025 (estimación propia: Qualcomm QTL 5.582 M [3], Nokia Technologies 1.501 M EUR ≈ 1.685 M USD [4, 7], Dolby 1.349 M [5], InterDigital 834 M [1]; sin Ericsson ni Huawei, que no publican cifras comparables)',
    unidad_serie: 'millones de USD',
    serie: [],
    tcac_historico_pct: null,
    tcac_previsto_pct: null,
    cr5_pct: 90,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Unidades de móviles', efecto: '+/−', horizonte: 'Cíclico', evidencia: '≈ 1.100 M de móviles en 2026 y mercado de ventas mayoristas con TCAC del −1 % en 2025-2030 según Counterpoint [2].' },
      { driver: 'Nuevos licenciatarios: vídeo por internet y nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de vídeo bajo demanda de 485.000 M USD con TCAC del 11 %; primer contrato (Amazon) en 2026 [2, 6].' },
      { driver: 'IoT celular y coche conectado', efecto: '+', horizonte: 'Estructural', evidencia: 'De ≈ 550 M a ≈ 860 M de dispositivos IoT celulares en 2025-2030; el 85 % del coche 4G ya licenciado [2].' },
      { driver: 'Nueva generación (6G)', efecto: '+', horizonte: 'Estructural', evidencia: 'Estándar previsto para 2029 y despliegue amplio en 2030 según la empresa [8].' },
      { driver: 'Tribunales que fijan tasas FRAND mundiales', efecto: '−', horizonte: 'Estructural', evidencia: 'China, Reino Unido (Amazon, Tesla) y el posible reglamento europeo pueden fijar regalías a la baja [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Pocos licenciantes y cada uno con patentes distintas: un fabricante necesita licencia de todos; compiten por la parte de la «pila» de regalías, no por el cliente [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Tres fabricantes (Samsung, Apple y Xiaomi) venden más del 50 % de los móviles y pagan buena parte de las regalías; litigan y arbitran cada renovación [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El insumo son ingenieros e investigadores (460 empleados en InterDigital) y abogados externos; los costes de litigio sí suben en cada campaña (49 M en 2025) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacer un catálogo esencial lleva décadas de contribuciones a 3GPP y JVET; la empresa tiene más de 100 cargos en organismos de estándares [2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'En vídeo, códecs sin regalías (AV1 de la Alliance for Open Media) y códecs neuronales; en celular no hay sustituto del estándar [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El ciclo de los licenciantes es de contratos, no de demanda: los ingresos dependen de cuándo vencen y se renuevan las licencias de los grandes fabricantes. En 2008-09 y 2020 los contratos de cuota fija protegieron los ingresos; en 2022 la acción cayó un 29 % sin que bajaran los recurrentes (404 M) [1]. Hoy los tres mayores clientes están licenciados hasta 2029-2030 y la generación 5G está madura; el siguiente salto (6G) llega con el estándar de 2029 [8].' },
    regulacion: 'Las patentes esenciales se licencian en condiciones FRAND (justas, razonables y no discriminatorias), y los tribunales cada vez fijan la tasa: China lo hizo en 2023 para Nokia, el Reino Unido tramita demandas de Amazon (archivada por el arbitraje) y de Tesla (el Supremo admitió en julio de 2025 su recurso sobre los consorcios) [1, 6]. La Comisión Europea retiró en 2025 su propuesta de reglamento de patentes esenciales (dato del sector, sin comprobar en fuente primaria). El Tribunal Unificado de Patentes europeo (desde 2023) ha dado a InterDigital mandatos que cubren 11 países a la vez contra Disney [6].',
    tendencias: 'Tres cambios: (1) la regalía se desplaza del móvil al vídeo y la nube, donde la empresa empieza a cobrar (Amazon) y litiga (Disney); (2) la IA entra en los códecs de vídeo (redes neuronales que comprimen) y en las redes 6G, y la empresa compró Deep Render y preside grupos de vídeo neuronal en JVET [2, 1]; (3) los tribunales europeos, brasileños e indios conceden mandatos a los titulares de patentes esenciales, lo que acelera los acuerdos (Amazon firmó tras las demandas) [6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 9,
    posicion: 'Quinto o sexto licenciante mundial de patentes celulares por ingresos (detrás de Qualcomm, Nokia, Ericsson y Huawei) y uno de los grandes catálogos de vídeo: ≈ 9 % de nuestra suma de ingresos de licencias (834 de ≈ 9.200 M USD; estimación propia) [1, 3, 4].',
    competidores: [
      { nombre: 'Qualcomm (QTL)', pais: 'EE. UU.', ticker: 'QCOM', ingresos: 5582, cuota_pct: 61, margen_ebit_pct: 72, comentario: 'Margen antes de impuestos del segmento de licencias en el ejercicio 2025; licencia por porcentaje del precio del móvil [3].' },
      { nombre: 'Nokia Technologies', pais: 'Finlandia', ticker: 'NOK', ingresos: usd(1501), cuota_pct: 18, margen_ebit_pct: 70.6, comentario: '1.501 M EUR en 2025 (−22 %), tasa contratada de 1.400 M EUR; también licencia vídeo [4, 7].' },
      { nombre: 'Dolby Laboratories', pais: 'EE. UU.', ticker: 'DLB', ingresos: 1349, cuota_pct: 15, margen_ebit_pct: 19.6, comentario: 'Audio y vídeo (Dolby Vision, consorcios de códecs); ejercicio a septiembre de 2025 [5].' },
      { nombre: 'Adeia', pais: 'EE. UU.', ticker: 'ADEA', ingresos: 443, cuota_pct: null, margen_ebit_pct: 39.5, comentario: 'Licencias de medios y semiconductores a operadores y plataformas de vídeo; litiga con Disney y AMD [5].' },
      { nombre: 'Ericsson (licencias de patentes)', pais: 'Suecia', ticker: 'ERIC', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gran licenciante celular; no publica el margen de licencias por separado [1].' },
      { nombre: 'Huawei', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Primer titular de patentes 5G declaradas; licencia a fabricantes y coches (sin cifras auditadas comparables).' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'El estándar es el efecto de red: quien contribuye a 3GPP y JVET cobra de todos los que lo usan; más de 100 cargos en organismos de estándares [2].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Un fabricante no puede dejar de usar el estándar; solo puede litigar o arbitrar el precio (Samsung pagó +67 % tras arbitraje) [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '≈ 40.000 activos de patentes (19.000 en 2017), siete nuevas al día; tribunales de Alemania, Brasil y el UPC confirman validez e infracción [2, 6].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA del 65 % en 2025 con 460 empleados; similar al 70-72 % de Nokia Technologies y QTL [1, 3, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Pocos catálogos con escala; pero InterDigital es pequeña frente a Qualcomm, Nokia, Ericsson y Huawei [3, 4].' },
      ],
    },
    amenazas: 'Lo que puede erosionarlo: (1) tribunales o reguladores que fijen tasas FRAND mundiales a la baja (probabilidad media; Reino Unido y China lo hacen ya) [1]; (2) que las plataformas de vídeo migren a códecs sin regalías (AV1, AV2) o neuronales y dejen de usar HEVC (probabilidad media a 5-10 años) [1]; (3) la vida de las patentes: las de 4G empiezan a caducar y el valor depende de seguir contribuyendo a 5G avanzado y 6G (probabilidad baja si mantiene la I+D de 211 M al año) [1]; (4) la concentración: perder o rebajar a un cliente del 15-30 % en una renovación (Apple 2029, Samsung 2030) [1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos ESG que tocan las cifras son de gobierno y de conducta: (1) la licencia en condiciones FRAND, que tribunales y reguladores vigilan (Disney la acusa de monopolio en Delaware y el Departamento de Justicia presentó en octubre de 2025 una declaración de interés en ese caso) [6]; (2) la retribución en acciones (61 M en 2026) y las ventas de directivos; (3) la plantilla de investigación (460 empleados, 240 fuera de EE. UU., con comités de empresa en Francia) [1]. El impacto ambiental es irrelevante para la valoración.',
    controversias: 'Demanda antimonopolio de Disney en Delaware (agosto de 2025) con declaración de interés del Departamento de Justicia (octubre de 2025) [6]; acusaciones de Disney y Amazon de licenciar fuera de FRAND (la de Amazon, retirada con el arbitraje) [6]. No constan sanciones de reguladores contra la empresa en los tres últimos años [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'InterDigital investiga y patenta tecnología inalámbrica (celular 4G, 5G y 6G, Wi-Fi), de vídeo (compresión HEVC y VVC, alto rango dinámico, transporte de vídeo) y de IA aplicada a ambas, la aporta a los estándares y cobra licencias a quien los usa [1]. Clientes: los fabricantes de móviles (8 de los 10 mayores, ≈ 85 % del mercado), de televisores y ordenadores (Samsung, LG, HP), de IoT y coches, y desde 2026 plataformas de vídeo (Amazon) [2]. Tiene ≈ 40.000 patentes y solicitudes, 460 empleados (240 fuera de EE. UU., sobre todo en Francia y Canadá) y sede en Wilmington, Delaware [1, 2].',
    como_gana_dinero: 'Cobra regalías por licencias de varios años, el 93 % de cuota fija (no dependen de las unidades vendidas) y el resto por unidad [1]. Cuando un cliente firma tarde paga además los años en que usó las patentes sin licencia: son los ingresos «atrasados», que suponen el 29 % de los ingresos de 2020-2025 (1.028 de 3.495 M; estimación propia con las cifras de los 10-K) [1]. El coste es casi fijo: investigación (211 M), licencias y litigios (94 M, la mitad de litigios) y administración (68 M) en 2025 [1], así que cada dólar nuevo de licencia llega casi entero al beneficio (margen EBITDA del 65 % en 2025). La estacionalidad la marcan las firmas y los laudos, no las ventas.',
  },
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comités, retribución, accionistas', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000140549526000043/idcc-20260430.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 10-jun-2026', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-15', url: `${ED}/000140549526000055/idcc-20260610.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2025', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-06-16', url: `${ED}/000114036125022647/ef20050595_8k.htm` },
  { id: 4, titulo: 'Form 4 presentados entre el 20-oct-2025 y el 20-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001405495&type=4' },
  { id: 5, titulo: 'Notas de resultados 2T25-2T26 (guías trimestrales y anuales frente a lo logrado)', editor: 'InterDigital, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000065/ex991q263026pressrelease.htm` },
  { id: 6, titulo: 'Form 10-K 2025 (directivos, salida de la directora de licencias, política de indemnizaciones)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000140549526000011/idcc-20251231.htm` },
  { id: 7, titulo: 'Form 8-K del 4-sep-2025 (cambios en la política de indemnizaciones de directivos)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-09-08', url: `${ED}/000140549525000054/idcc-20250904.htm` },
];
const ventas = F4.operaciones.filter((o) => !o.adquiere && o.codigo === 'S');
const porPersona = {};
for (const o of ventas) { const k = o.persona; porPersona[k] ??= { fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, acciones: 0, importe: 0 }; porPersona[k].acciones += o.acciones; porPersona[k].importe += o.importe; if (o.fecha > porPersona[k].fecha) porPersona[k].fecha = o.fecha; }
const insiders = Object.values(porPersona).sort((a, b) => b.importe - a.importe).slice(0, 8).map((p) => ({ fecha: p.fecha, persona: p.persona + ' — suma de 12 meses, plan 10b5-1', operacion: 'Venta', acciones: p.acciones, importe: r2(p.importe / 1e6) }));
const C = {
  _estado: 'Completa.',
  directivos: {
    equipo: [
      { nombre: 'Lawrence (Liren) Chen', cargo: 'Presidente ejecutivo y consejero delegado (President and CEO)', desde: '2021', participacion_pct: 2.5, trayectoria: 'Antes, vicepresidente sénior y jefe mundial de propiedad intelectual de Qualcomm (2019-2021). En InterDigital: renovación de Apple (2022), laudo de Samsung (+67 %), Xiaomi, vivo, Honor, HP y Amazon; ARR de ≈ 400 M a 626 M [1, 5]. Su 2,5 % incluye 514.889 opciones ejercitables [1].' },
      { nombre: 'Richard J. Brezski', cargo: 'Director financiero y tesorero', desde: '2021', participacion_pct: 0.27, trayectoria: 'En la empresa desde hace más de una década en finanzas; director financiero desde 2021 [1]. Ha gestionado las conversiones anticipadas de la convertible y la política de recompras.' },
      { nombre: 'Julia C. Mattis', cargo: 'Directora de licencias (Chief Licensing Officer)', desde: '2025', participacion_pct: 0.02, trayectoria: 'Sustituyó en septiembre de 2025 a Eeva Hakoranta, que dejó la empresa [1, 6]. Ha cerrado Xiaomi, LG y Amazon.' },
      { nombre: 'Rajesh Pankaj', cargo: 'Director de tecnología (CTO)', desde: '2021', participacion_pct: 0.23, trayectoria: 'Viene de Qualcomm; dirige la investigación inalámbrica, de vídeo e IA y la presencia en 3GPP y JVET [1].' },
      { nombre: 'Joshua D. Schmidt', cargo: 'Director jurídico y secretario', desde: '2018', participacion_pct: 0.08, trayectoria: 'Lleva las campañas de litigio contra Disney, Amazon y Transsion [1].' },
      { nombre: 'S. Douglas Hutcheson', cargo: 'Presidente no ejecutivo del consejo (independiente)', desde: '2014', participacion_pct: 0.07, trayectoria: 'Presidente desde junio de 2015; antes consejero delegado de Leap Wireless y presidente ejecutivo de Kymeta [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ingresos con punto medio de 710 M (subido a 820 M en julio por Samsung)', real: '834,0 M', cumplida: 'Sí' },
      { anio: '3T25', guia: 'Ingresos del trimestre subidos con los acuerdos firmados (solo contratos existentes)', real: '164,7 M, por encima', cumplida: 'Sí' },
      { anio: '4T25', guia: '144-148 M', real: '158,2 M', cumplida: 'Sí' },
      { anio: '1T26', guia: '194-200 M', real: '205,4 M', cumplida: 'Sí' },
      { anio: '2T26', guia: '139-143 M', real: '260,2 M (Amazon)', cumplida: 'Sí' },
      { anio: '2026', guia: '675-775 M en febrero; 775-845 M desde julio', real: 'En curso: 465,6 M en el 1S26', cumplida: 'Parcial' },
      { anio: '2030', guia: 'ARR de más de 1.000 M (móviles ≈ 500, CE/IoT ≈ 200, streaming 300+)', real: 'ARR de 626 M en el 2T26', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo creíble en lo que controla: ha batido su propia guía trimestral en los últimos cinco trimestres [5], porque la guía solo incluye contratos firmados y deja fuera acuerdos y laudos. La guía anual es un «camino múltiple» sin reparto por cliente, lo que no permite comprobar qué renovaciones faltan [5]. Estabilidad: el consejero delegado, el financiero y el tecnológico llevan desde 2021; la única salida relevante fue la directora de licencias en 2025 (indemnización de 1,48 M en «otros») [1]. No hay plan de sucesión público. Todos los directivos venden con planes 10b5-1 (27,2 M USD en 12 meses, ninguna compra) [4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'S. Douglas Hutcheson', cargo: 'Presidente', tipo: 'Independiente', desde: '2014', comisiones: 'Dos comisiones [1]' },
      { nombre: 'Lawrence (Liren) Chen', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Derek K. Aberle', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Dos comisiones; ex presidente de Qualcomm [1]' },
      { nombre: 'Samir Armaly', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Dos comisiones; ex presidente de propiedad intelectual de Adeia [1]' },
      { nombre: 'Joan H. Gillman', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Preside una comisión [1]' },
      { nombre: 'John A. Kritzmacher', cargo: 'Consejero', tipo: 'Independiente', desde: '2009', comisiones: 'Preside la comisión de auditoría (experto financiero) [1]' },
      { nombre: 'John D. Markley, Jr.', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Preside una comisión [1]' },
      { nombre: 'Jean F. Rankin', cargo: 'Consejera', tipo: 'Independiente', desde: '2010', comisiones: 'Preside una comisión [1]' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.1, voto_remuneracion_contra_pct: 3.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.85, fijo: 0.75, variable_corto: 1.69, variable_largo: 5.33, ratio_salario_medio: 40 },
    remuneracion: 'El consejero delegado cobró 7,85 M USD en 2025: 0,75 M de fijo, 1,69 M de variable anual y 5,33 M en acciones y opciones (4,0 M en acciones y 1,33 M en opciones con objetivos) [1]. El variable anual depende sobre todo de los ingresos del año y de objetivos estratégicos; el de largo plazo de 2025 se mide con el EBITDA «pro forma» medio de tres años, después de que los accionistas criticaran el sistema anterior (los cuatro mejores trimestres seguidos) [1]. No mide ROIC ni rentabilidad para el accionista, así que premia firmar licencias y atrasados. Hay cláusula de recuperación por reformulación de cuentas [1]. Voto consultivo favorable del 96,1 % en 2025 y del 98,1 % en 2026 (en contra 3,3 % y 1,5 %) [3, 2]. Ratio de 40 veces el salario mediano (196.550 USD) [1].',
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 15.9, tipo: 'Gestora (13G)', variacion: '13G/A de abril de 2025' },
      { nombre: 'T. Rowe Price Associates', pct: 8.6, tipo: 'Gestora (13G)', variacion: '13G/A de febrero de 2026' },
      { nombre: 'Consejo y directivos (12 personas)', pct: 3.5, tipo: 'Directivos', variacion: 'Incluye 0,51 M de opciones del consejero delegado; ventas de 27,2 M USD en 12 meses' },
    ],
    insiders,
    control_y_defensas: 'Sin accionista de control: el primero es BlackRock (15,9 %) y el consejo y la dirección tienen el 3,5 % [1]. Una acción, un voto; consejo de ocho miembros elegidos cada año por mayoría (siete independientes), presidente independiente separado del consejero delegado [1]. La junta de 2026 aprobó la exoneración de responsabilidad de los directivos que permite la ley de Pensilvania (93 % a favor de los votos emitidos) [2]. En septiembre de 2025 se exigió a los directivos aceptar arbitraje individual para cobrar la indemnización por despido o cambio de control [7]. No constan operaciones vinculadas relevantes [1].',
    alertas: [
      'Ventas continuas de todos los directivos y de seis consejeros con planes 10b5-1: 27,2 M USD en 12 meses (consejero delegado 9,5 M, financiero 6,8 M), sin ninguna compra [4].',
      'Salida de la directora de licencias en 2025 con 1,48 M USD de indemnización [1].',
      'Demanda antimonopolio de Disney en Delaware con declaración de interés del Departamento de Justicia (octubre de 2025) [6].',
    ],
    confianza: 'Alta',
  },
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de IDCC, SPY y XLK (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IDCC/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de IDCC y datos de los comparables (20-oct-2026, cierre del 19-oct)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/IDCC/analysis' },
  { id: 3, titulo: 'Curva diaria de tipos del Tesoro de EE. UU. (bono a 10 años del 19-oct-2026: 5,15 %)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Damodaran, Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'MarketBeat: noticias de IDCC (dividendo, ventas de directivos, Disney, fechas de resultados)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://www.marketbeat.com/stocks/NASDAQ/IDCC/news/' },
  { id: 6, titulo: 'InterDigital fija el 29-oct-2026 para los resultados del 3T26; Argus baja su objetivo a 366 USD', editor: 'ad-hoc-news (resumen de comunicados)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.ad-hoc-news.de/boerse/news/nebenwerte/argus-lowers-target-to-usd-366-00-for-interdigital-stock/70349120' },
  { id: 7, titulo: 'Trefis: «6-Day Sell-Off Sends InterDigital Stock Down -26%» y «InterDigital Stock Down 31%» (mayo de 2026)', editor: 'Trefis', tipo: 'Prensa', fecha: '2026-05-23', url: 'https://www.trefis.com/stock/idcc/articles/600305/interdigital-stock-down-31time-to-buy/2026-05-23' },
  { id: 8, titulo: 'Seeking Alpha: titulares y noticias de IDCC (Amazon 11-jun-2026, guía del 2T26, dividendo)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-09-18', url: 'https://seekingalpha.com/api/sa/combined/IDCC.xml' },
  { id: 9, titulo: 'Form 10-Q del 2T26 y notas de resultados (guía, convertible, warrants, acciones no GAAP)', editor: 'InterDigital, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000140549526000066/idcc-20260630.htm` },
  { id: 10, titulo: 'Qualcomm, Nokia, Dolby, Adeia, Rambus y Universal Display: datos de mercado y consenso (Yahoo quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/QCOM/key-statistics' },
];
const c = Y.IDCC;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
const corte = new Date('2026-10-20');
const ntm = (x) => {
  const t0 = x.trend.find((z) => z.periodo === '0y'), t1 = x.trend.find((z) => z.periodo === '+1y');
  const m = Math.max(0, (new Date(t0.fin) - corte) / (30.44 * 864e5));
  return { ventas: (m / 12) * t0.ventas + (1 - m / 12) * t1.ventas, m };
};
const compT = ['QCOM', 'NOK', 'DLB', 'ADEA', 'RMBS', 'OLED'];
const nombres = { QCOM: 'Qualcomm', NOK: 'Nokia', DLB: 'Dolby Laboratories', ADEA: 'Adeia', RMBS: 'Rambus', OLED: 'Universal Display' };
const paises = { QCOM: 'US', NOK: 'FI', DLB: 'US', ADEA: 'US', RMBS: 'US', OLED: 'US' };
const comps = compT.map((k) => {
  const y = Y[k]; const n = ntm(y);
  // Nokia publica en EUR: Yahoo da ventas y EBITDA en EUR y capitalización en USD; convertimos con el BCE (1,1225).
  const fx = k === 'NOK' ? 1.1225 : 1;
  const ventasLtm = y.ventas * fx, ebitda = y.ebitda * fx;
  return {
    nombre: nombres[k], ticker: k, pais: paises[k], capitalizacion: Math.round(y.cap / 1e6), ev_ventas: r2(y.ev_ventas),
    ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(y.per_adelantado),
    crecimiento_pct: r1((n.ventas * fx / ventasLtm - 1) * 100), margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1(((y.deuda - y.caja) * fx) / ebitda), fcf_yield_pct: r1((y.fcf * fx) / y.cap * 100),
  };
});
const D = {
  _estado: 'Completa. Transacciones: hueco (no hay múltiplos publicados de compras de licenciantes comparables).',
  identificacion: {
    nombre: 'InterDigital, Inc.', nombre_corto: 'InterDigital', ticker: 'IDCC', isin: 'US45867G1013', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software (licencias de propiedad intelectual)', sede: 'Wilmington, Delaware', fundacion: '1972', empleados: 460, web: 'www.interdigital.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 30.6, capitalizacion_publicada: Math.round(c.cap / 1e6), free_float_pct: 96.5,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Guía 2026 (30-jul-2026): ingresos de 775-845 M USD (antes 675-775), EBITDA ajustado de 469-529 M, BPA GAAP de 7,91-9,67 USD y no GAAP de 10,85-12,81, con 30,6 M de acciones no GAAP; incluye acuerdos y laudos que aún no ha firmado («camino múltiple») [9]. 3T26, solo contratos firmados: ingresos de 154-158 M, EBITDA ajustado de 86-92 M y BPA no GAAP de 1,94-2,13 [9]. Objetivos para 2030 (día del inversor, reiterados): ARR de más de 1.000 M, crecimiento anual de más del 10 % y margen EBITDA ajustado de más del 60 % [9].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 2.9, fuente: `Yahoo Finance (${t['0y'].n} analistas; BPA no GAAP) [2]` },
      { periodo: '2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 3.0, fuente: `Yahoo Finance (${t['+1y'].n} analistas; BPA no GAAP; rango ${t['+1y'].bpa_min}-${t['+1y'].bpa_max}) [2]` },
    ],
    recomendaciones: { n_analistas: 4, comprar: 4, mantener: 0, vender: 0, po_medio: r2(c.po_medio), po_min: 366, po_max: c.po_max },
    revisiones: `Las estimaciones de BPA no GAAP de 2026 subieron de 9,62 USD hace 90 días a 11,56 tras el 2T26 (Amazon), y las de 2027 están planas (11,24 → 11,27) [2]. El 4T26 se recortó de 3,60 a 2,55 USD en 90 días [2]. Solo hay 3-4 analistas (Roth, William Blair, Jefferies y Argus); Argus bajó el 14-oct su objetivo a 366 USD [6]. Yahoo da un objetivo medio de 463 USD (3 analistas, 425-488) que no incluye el de Argus; el mínimo de 366 es el de Argus. Una sola fuente con estimaciones completas: lo contrastamos con la guía de la empresa.`,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 7.5,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bol.tipo_rentabilidad, rentabilidades: bol.rentabilidades, anual: bol.anual,
    beta: B.bolsa.beta?.ajustada_mensual_5a ?? 1.33, volatilidad_pct: bol.volatilidad_pct, max_drawdown_pct: bol.max_drawdown_pct, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción multiplicó por seis su precio entre finales de 2022 (49,48 USD) y finales de 2025 (318,38): +124 % en 2023, +81 % en 2024 y +66 % en 2025, frente al +26 %, +25 % y +18 % del S&P 500 [1], al ritmo de las grandes firmas (Apple, Samsung, OPPO, vivo, Honor) y de la subida del ARR. En 2026 va +2,2 % frente al +13,3 % del S&P y el +29,6 % de la tecnología: marcó máximo de 412,60 USD el 30-oct-2025, cayó un 30 % en mayo tras el 1T26 (gastos y guía débil del 2T) y rebotó con Amazon y el 2T26 [1, 7, 8]. Beta mensual de 5 años de 1,49 (1,33 ajustada) frente a 0,98 semanal de 2 años: la acción se mueve por noticias propias más que por el mercado [1]. Posición corta del 13,3 % del capital libre [2].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -0.2, var_3m_pct: 22.0, var_6m_pct: -12.6, var_12m_pct: -12.2, dist_max_52s_pct: -18.7, dist_min_52s_pct: 28.6, dist_max_historico_pct: -18.7, tendencia: 'alcista', volatilidad_60d_pct: 44, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'abr-may 2026', var_pct: -30.6, causa: 'Resultados del 1T26 (30-abr): batió su guía, pero mantuvo la anual, dio un 2T de 139-143 M y los gastos subieron un 57 % (cuota cedida de LG y litigios): −15,9 % ese día y seis sesiones seguidas de caídas (−26 %) hasta el mínimo de 249,14 USD del 29-may [7, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-ago 2026', var_pct: 33.8, causa: 'Acuerdo con Amazon (11-jun, +12 % ese día) y resultados del 2T26 (30-jul: 260 M frente a una guía de 139-143 M, guía anual +85 M; +16 % en la semana) [8, 5].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct-2025 a mar-2026', var_pct: -18.0, causa: 'Días de −5 % o más: 31-oct-2025 (−8,7 %, tras el 3T25 y una guía del 4T de solo contratos firmados), 17-dic-2025 (−6,6 %, mismo mes en que Samsung impugnó el laudo), 6-ene-2026 (−8,0 %), 10-feb-2026 (−6,8 %, tras una guía 2026 de 675-775 M, por debajo de 2025) y 20-mar-2026 (−7,6 %, mes de la sentencia de interpretación de patentes en el caso de Disney en California). Para el 6-ene y el 20-mar no hemos encontrado una causa concreta [1, 9].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 el 29-oct antes de la apertura; guía del trimestre (solo contratos firmados) de 154-158 M [6, 9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-14', tipo: 'recomendación', hecho: 'Argus baja su objetivo a 366 USD; el resto de analistas (Roth, William Blair, Jefferies) mantiene comprar con objetivos de 425-488 USD [6, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-06', tipo: 'directivos', hecho: 'Ventas mensuales del director de tecnología (1.500 acciones a 334 USD) dentro de un plan 10b5-1; en 12 meses los directivos vendieron 27,2 M USD y nadie compró [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-09', tipo: 'resultados', hecho: 'Dividendo trimestral sube de 0,70 a 0,75 USD (fecha de registro 14-oct, pago 28-oct) [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-02', tipo: 'demanda o regulador', hecho: 'Tercer mandato del Tribunal Unificado de Patentes contra Disney; en septiembre pidió 118 M USD en su caso [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-30', tipo: 'demanda o regulador', hecho: 'Samsung mantiene su impugnación ante la CCI del laudo de 1.050 M; la empresa presentó objeciones de jurisdicción en julio. Sin fecha de decisión [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-30', tipo: 'demanda o regulador', hecho: 'Arbitraje con Lenovo: vista en el 4T26, laudo previsiblemente en 2027; ajuste de ingresos al alza o a la baja [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-11', tipo: 'fusión u oferta', hecho: 'Acuerdo con Amazon: licencia de servicios y dispositivos con precio por arbitraje en 18-24 meses; se retiran todas las demandas [8, 9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-27', tipo: 'demanda o regulador', hecho: 'Tesla gana en el Reino Unido el recurso sobre si los consorcios (Avanci) deben licenciar en FRAND; el caso sigue [5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2027-09-01', tipo: 'ampliación o convertible', hecho: 'Warrants de 6,0 M de acciones a 105,43 USD con entrega neta entre septiembre de 2027 y abril de 2028 (≈ 4 M de acciones a 322 USD); convertible de 300 M que vence en 2027 [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 18,7 % por debajo del máximo de octubre de 2025 y un 28,6 % por encima del mínimo de mayo de 2026, con tendencia alcista (+1,6 % sobre la media de 200 sesiones) y volatilidad del 44 % [1]. Los dos movimientos fuertes tienen causa en resultados y acuerdos de la propia empresa. No hay colocaciones ni ampliaciones anunciadas; la dilución de los warrants (2027-2028) y el vencimiento de la convertible son conocidos y están en las cifras. Los hechos pendientes con efecto posible de más de un 5 % (impugnación de Samsung, laudos de Lenovo y Amazon, Disney) no tienen fecha cercana: veredicto «no cambia». Resultados del 3T26 el 29-oct: no retrasan (regla 11).',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2020).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el BPA GAAP del mismo año la acción cotizó a 42x en 2020 y 41x en 2021 (beneficios bajos), a 14-16x en 2022-2024 (beneficios inflados por atrasados) y a 27x en 2025 [1]. Hoy cotiza a 37,7x el BPA GAAP de los últimos 12 meses y a 28,6x el BPA no GAAP de consenso de 2027 [2]: por encima de su historia reciente y de los comparables (mediana de 17x), porque el mercado descuenta que el ARR llegue a 1.000 M en 2030. Los múltiplos de un licenciante son engañosos año a año: un acuerdo con atrasados mueve el beneficio un 50 %.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Licenciantes de tecnología y empresas cuyo beneficio sale sobre todo de regalías: Qualcomm (QTL es el 60 % de su resultado de segmentos), Nokia (Technologies es la mayor parte de su beneficio operativo), Dolby, Adeia, Rambus y Universal Display. Fuera: Ericsson (Yahoo no da sus datos en una divisa coherente), Arm (74x, crecimiento del 23-36 % por regalías de centros de datos: distorsiona la mediana) y CEVA (pérdidas). Ninguno es puro como InterDigital salvo Adeia. PER adelantado de Yahoo (BPA ajustado del consenso de cada uno) y crecimiento de ventas de los próximos 12 meses ponderado por meses.',
    empresas: comps,
    comentario: 'La mediana de los comparables cotiza a 17,0x el BPA ajustado adelantado, y InterDigital a 28,6x el no GAAP de 2027 [2, 10]. La prima de casi 70 % no la explica el crecimiento esperado (consenso de ventas 2027 −5 % frente a +3-20 % de los demás) ni el margen (54 % LTM frente al 60 % de Adeia y el 72 % de QTL), sino la expectativa de nuevos programas (streaming) y de atrasados que el consenso no puede modelar. El EV/EBITDA de 17,9x LTM está en línea con Nokia (18,9x) y por encima de Qualcomm (15,8x) y Adeia (9,2x). Usaríamos el PER, en base comparable: el de los comparables es ajustado (sin pagos en acciones), así que en nuestra base GAAP la mediana sería algo más alta.',
    confianza: 'Media',
  },
  transacciones: null,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $IDCC (30 mensajes de abril a octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://api.stocktwits.com/api/2/streams/symbol/IDCC.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos de análisis de IDCC (jul-sep 2026: «Still Not In The Buy Zone», «Strong Growth, But The Premium Leaves Little Room For Error»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-18', url: 'https://seekingalpha.com/api/sa/combined/IDCC.xml' },
  { id: 3, titulo: 'MarketBeat y Yahoo Finance: titulares de opinión (agosto-octubre de 2026: «28% Undervalued», «Fairly Valued», «Ticking Portfolio Bombs»)', editor: 'MarketBeat / Yahoo Finance', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://www.marketbeat.com/stocks/NASDAQ/IDCC/news/' },
  { id: 4, titulo: 'Trefis: «InterDigital Stock Down 31%, Time to Buy?» (mayo de 2026)', editor: 'Trefis', tipo: 'Foros y redes', fecha: '2026-05-23', url: 'https://www.trefis.com/stock/idcc/articles/600305/interdigital-stock-down-31time-to-buy/2026-05-23' },
];
const E = {
  _estado: 'Completa (sin Reddit: da 403).',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mayoría alcista tras Amazon («Disney next») y el 2T26; en mayo, dudas de particulares sobre si la caída se debía a los atrasados del año anterior y compras «hacia 270» [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'Los autores reconocen el negocio pero discuten el precio: «todavía no en zona de compra», «la prima deja poco margen de error», frente a «un motor de licencias más predecible» [2].' },
      { plataforma: 'MarketBeat / Yahoo (opinión)', fecha: '2026-10', n_comentarios: 8, tono: 'Dividido', resumen: 'Titulares de «infravalorada un 28 %» y de «valorada con justicia», y uno de «bombas de relojería» entre tecnológicas caras [3].' },
      { plataforma: 'Trefis', fecha: '2026-05', n_comentarios: 2, tono: 'Neutro', resumen: 'Tras la caída del 31 % se pregunta si es momento de comprar y la atribuye a gastos y guía [4].' },
    ],
    temas: [
      { tema: 'Streaming como nuevo motor (Amazon, Disney)', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto pero sin precio: Amazon se contabiliza con una estimación prudente (≈ 60 M de ARR) y el laudo tarda 18-24 meses; Disney litiga. El objetivo de 300 M en 2030 exige 4-5 plataformas más [1, 2].' },
      { tema: 'Valoración exigente', postura: 'Dividida', peso: 'Alto', contraste: 'El informe coincide: 34x nuestro BPA de los próximos 12 meses y valor intrínseco muy por debajo del precio [2].' },
      { tema: 'Caídas por los ingresos atrasados', postura: 'Dividida', peso: 'Medio', contraste: 'Los particulares lo entienden a medias: el beneficio de 2024-2025 lleva 460 y 277 M de atrasados que no se repiten igual [1].' },
      { tema: 'Ventas de directivos', postura: 'Bajista', peso: 'Bajo', contraste: '27,2 M USD en 12 meses, todos con planes 10b5-1; sin compras [3].' },
    ],
    lectura: 'El sentimiento de los particulares es positivo tras Amazon y el 2T26, y el de los autores de análisis está dividido por el precio. No hay euforia ni capitulación: la acción está a 18,7 % de su máximo. Lo útil es que nadie en los foros discute la concentración ni la impugnación del laudo de Samsung, dos riesgos que el informe pesa más que el mercado.',
    confianza: 'Media',
  },
};
guarda('E', E);

// Fuentes y huecos de cada nota
for (const [L, f, h] of [['A', fA, []], ['B', fB, [{ seccion: 'sector', campo: 'serie', tipo: 'Complemento', intentos: '1) Informes anuales de Qualcomm, Nokia y Dolby: dan cada uno su cifra, no una serie del mercado; 2) búsqueda de estudios de mercado de licencias de patentes esenciales (IPlytics, LexisNexis): de pago; 3) suma propia año a año: faltan Ericsson y Huawei y los años antiguos de Nokia sin comprobar', decision: 'Omitido' }]], ['C', fC, []], ['D', fD, [{ seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) 10-K de InterDigital: Technicolor (143 M) y Deep Render sin EBITDA publicado; 2) Xperi-TiVo (2020) y compras de catálogos de patentes: sin múltiplo sobre beneficios comparable; 3) prensa: solo importes', decision: 'Omitido' }]], ['E', fE, []]]) {
  const o = lee(`${L}.json`); o.fuentes = f; o.huecos = h; guarda(L, o);
}
console.log('Notas A-E escritas');
