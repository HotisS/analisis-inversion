// Compone notas/A.json: números de numeros.json (build.mjs) + hechos con su fuente.
import { readFileSync, writeFileSync } from 'node:fs';
const N = JSON.parse(readFileSync('A_scripts/numeros.json', 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/1035267/';
const fuentes = [
  [1, 'Form 10-K ejercicio 2025', 'Intuitive Surgical (SEC)', '2026-02-03', E + '000103526726000010/isrg-20251231.htm'],
  [2, 'Form 10-K ejercicio 2024', 'Intuitive Surgical (SEC)', '2025-01-31', E + '000103526725000017/isrg-20241231.htm'],
  [3, 'Form 10-K ejercicio 2023', 'Intuitive Surgical (SEC)', '2024-01-31', E + '000103526724000021/isrg-20231231.htm'],
  [4, 'Form 10-K ejercicio 2022', 'Intuitive Surgical (SEC)', '2023-02-10', E + '000103526723000019/isrg-20221231.htm'],
  [5, 'Form 10-K ejercicio 2020', 'Intuitive Surgical (SEC)', '2021-02-10', E + '000103526721000028/isrg-20201231.htm'],
  [6, 'Form 10-K ejercicio 2018', 'Intuitive Surgical (SEC)', '2019-02-04', E + '000103526719000012/isrg-20181231x10k.htm'],
  [7, 'Form 10-Q 2T26 (abril-junio 2026)', 'Intuitive Surgical (SEC)', '2026-07-21', E + '000103526726000058/isrg-20260630.htm'],
  [8, 'Form 10-Q 1T26', 'Intuitive Surgical (SEC)', '2026-04-22', E + '000103526726000032/isrg-20260331.htm'],
  [9, 'Form 10-Q 3T25', 'Intuitive Surgical (SEC)', '2025-10-22', E + '000103526725000209/isrg-20250930.htm'],
  [10, 'Form 10-Q 2T25', 'Intuitive Surgical (SEC)', '2025-07-23', E + '000103526725000192/isrg-20250630.htm'],
  [11, 'Form 10-Q 1T25', 'Intuitive Surgical (SEC)', '2025-04-23', E + '000103526725000109/isrg-20250331.htm'],
  [12, 'Form 10-Q 3T24', 'Intuitive Surgical (SEC)', '2024-10-18', E + '000103526724000247/isrg-20240930.htm'],
  [13, 'Form 10-Q 2T24', 'Intuitive Surgical (SEC)', '2024-07-19', E + '000103526724000207/isrg-20240630.htm'],
  [14, 'Nota de prensa de resultados 3T24 (8-K, ex. 99.1)', 'Intuitive Surgical', '2024-10-17', E + '000103526724000244/q324ex-991earningsrelease.htm'],
  [15, 'Nota de prensa de resultados 4T24 (8-K, ex. 99.1)', 'Intuitive Surgical', '2025-01-21', E + '000103526725000008/q424ex-991earningsrelease.htm'],
  [16, 'Nota de prensa de resultados 1T25 (8-K, ex. 99.1)', 'Intuitive Surgical', '2025-04-22', E + '000103526725000106/q125ex-991earningsrelease.htm'],
  [17, 'Nota de prensa de resultados 2T25 (8-K, ex. 99.1)', 'Intuitive Surgical', '2025-07-22', E + '000103526725000183/q225ex-991earningsrelease.htm'],
  [18, 'Nota de prensa de resultados 3T25 (8-K, ex. 99.1)', 'Intuitive Surgical', '2025-10-21', E + '000103526725000206/q325ex-991earningsrelease.htm'],
  [19, 'Nota de prensa de resultados 4T25 (8-K, ex. 99.1)', 'Intuitive Surgical', '2026-01-22', E + '000103526726000006/q425ex-991earningsrelease.htm'],
  [20, 'Nota de prensa de resultados 1T26 (8-K, ex. 99.1)', 'Intuitive Surgical', '2026-04-21', E + '000103526726000029/q126ex-991earningsrelease.htm'],
  [21, 'Nota de prensa de resultados 2T26 (8-K, ex. 99.1)', 'Intuitive Surgical', '2026-07-16', E + '000103526726000047/q226ex-991earningsrelease.htm'],
  [22, 'Anuncio de la compra de los distribuidores de Italia, España y Portugal (8-K, ex. 99.2)', 'Intuitive Surgical', '2025-01-21', E + '000103526725000008/q424ex-992acquisitionpress.htm'],
  [23, 'Cierre de la compra del negocio da Vinci/Ion de ab medica, Abex y Excelencia Robótica (8-K, ex. 99.1)', 'Intuitive Surgical', '2026-03-02', E + '000103526726000012/q126ex-991acquisitionpress.htm'],
  [24, 'XBRL Company Facts CIK 0001035267 (series de los 10-K y 10-Q)', 'SEC EDGAR', '2026-10-06', 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001035267.json'],
  [25, 'Transcripción de la conferencia de resultados 1T26', 'Stock Analysis', '2026-04-21', 'https://stockanalysis.com/stocks/isrg/transcripts/544923-q1-2026/'],
  [26, 'Transcripción de la conferencia de resultados 2T26', 'Webull', '2026-07-16', 'https://www.webull.com/news/15239187065545728'],
  [27, 'Intuitive Surgical Q1 2026 Earnings Call Transcript (cabecera: BPA frente a previsiones)', 'Insider Monkey', '2026-04-21', 'https://www.insidermonkey.com/blog/intuitive-surgical-inc-nasdaqisrg-q1-2026-earnings-call-transcript-1743827/'],
].map(([id, titulo, editor, fecha, url]) => ({ id, titulo, editor, tipo: id <= 24 ? 'Primaria' : (id === 27 ? 'Prensa' : 'Datos de mercado'), fecha, url }));

const A = {};
const Y = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const ia = [1395.8, 1636.9, 1962.0, 2408.2, 2455.7, 3100.5, 3517.9, 4276.6, 5079.0, 6018.9];
const si = [800.0, 928.4, 1127.1, 1346.1, 1178.9, 1693.4, 1680.1, 1679.7, 1966.0, 2473.7];
const se = [510.7, 572.9, 635.1, 724.2, 723.8, 916.2, 1024.2, 1167.8, 1307.1, 1572.1];
const seg = (nombre, descripcion, v) => ({ nombre, descripcion, tipo_resultado: null, historico: Y.map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) });

// ---------------- negocio (solo la parte de datos) ----------------
A.negocio = {
  descripcion: null, como_gana_dinero: null,
  segmentos: [
    seg('Instrumentos y accesorios', 'Instrumental de vida limitada o de un solo uso (EndoWrist, grapadoras SureForm, selladores, catéteres Ion): entre 900 y 3.700 USD por procedimiento da Vinci [1].', ia),
    seg('Sistemas', 'Venta y arrendamiento (financiero u operativo, de cuota fija o por uso) de sistemas da Vinci multipuerto y SP e Ion; un da Vinci cuesta entre 0,7 y 3,1 M USD [1].', si),
    seg('Servicio', 'Contratos de mantenimiento: 95.000-225.000 USD al año por da Vinci y 55.000-70.000 USD por Ion [1].', se)],
  geografias: [{ nombre: 'Estados Unidos', peso_pct: 67.7 }, { nombre: 'Fuera de EE. UU.', peso_pct: 32.3 }],
  geografias_criterio: 'destino',
  clientes: null,
  kpis: [
    { kpi: 'Procedimientos da Vinci (miles)', valor_anterior: '2.683 (2024)', valor_actual: '3.153 (2025)', variacion: '+18 %', comentario: 'EE. UU. 2.012 (+15 %), fuera 1.141 (+23 %) [1]. +16 % en 1T26 y +15 % en 2T26; guía 2026: +13,5-15,5 % [20, 21].' },
    { kpi: 'Procedimientos Ion (miles)', valor_anterior: '95,5 (2024)', valor_actual: '144,1 (2025)', variacion: '+51 %', comentario: '+39 % en 1T26 y +36 % en 2T26 [20, 21].' },
    { kpi: 'Base instalada da Vinci (sistemas)', valor_anterior: '9.902 (dic-24)', valor_actual: '11.106 (dic-25)', variacion: '+12 %', comentario: 'EE. UU. 6.364, Europa 2.168, Asia 1.993, resto 581 [1]; 11.710 a jun-26 (+12 %) [21].' },
    { kpi: 'Colocaciones da Vinci (sistemas)', valor_anterior: '1.526 (2024)', valor_actual: '1.721 (2025)', variacion: '+13 %', comentario: '870 da Vinci 5 en 2025 frente a 362; 437 con entrega de un sistema usado (150 en 2024) [1]. 1S26: 899 frente a 762 [20, 21].' },
    { kpi: '% de colocaciones da Vinci en arrendamiento operativo', valor_anterior: '51 % (2024)', valor_actual: '51 % (2025)', variacion: '0 p.p.', comentario: '872 de 1.721 en 2025, de ellas 496 por uso [1]; 54 % en 2T26 (254 de 468) [21].' },
    { kpi: 'Ingresos de I&A por procedimiento da Vinci (USD)', valor_anterior: '≈1.800 (2T25)', valor_actual: '≈1.830 (2T26)', variacion: '+2 %', comentario: 'Dato verbal de la conferencia [26]; en 1T26, ≈1.880 frente a ≈1.780 [25].' },
    { kpi: 'Utilización da Vinci (procedimientos por sistema y año)', valor_anterior: '+2 % (2024)', valor_actual: '+3 % (2025)', variacion: '+1 p.p.', comentario: 'La empresa publica la variación anual, no el nivel [1, 2]; +3 % en 2T26 según la conferencia [26].' },
    { kpi: 'Ingresos recurrentes (% de ingresos)', valor_anterior: '84 % (2024)', valor_actual: '84 % (2025)', variacion: '0 p.p.', comentario: 'I&A + servicio + arrendamiento operativo: 8.465 M USD en 2025 [1].' }],
  confianza: 'Alta',
  extra: {
    geografia: 'Ingresos 2025: EE. UU. 6.815,8 M (I&A 4.203,4; sistemas 1.581,8; servicio 1.030,6) y fuera 3.248,9 M (I&A 1.815,5; sistemas 891,9; servicio 541,5), por ubicación del cliente [1]. 2024: 5.589,4 y 2.762,7 M [1]. Ingresos en divisa ≈24 % del total; el tipo de cambio sumó 31 M a los ingresos fuera de EE. UU. en 2025 [1].',
    colocaciones_por_region_2025: 'EE. UU. 987, Europa 342, Asia 269, resto 123 (2024: 800, 309, 321 y 96) [1].',
    ion: 'Base instalada Ion: 995 a dic-25 (+24 %) y 1.096 a jun-26 (+21 %); colocaciones 195 en 2025 frente a 271 en 2024. La empresa estima que en EE. UU. Ion se acerca a la mitad de las biopsias de pulmón [1, 21].',
    sp: 'Base instalada SP: 377 a dic-25 [1]; 445 a jun-26, 38 colocaciones en 2T26 y procedimientos SP +61 % [26].',
    asp: 'ASP da Vinci (ventas, sin arrendamientos operativos): 1,60 M USD en 2025 frente a 1,50 M [1]; 1,59 M en 2T26 frente a 1,50 M [7].',
    arrendamiento_operativo: 'Ingresos por arrendamiento operativo: 874 M USD en 2025 (531 M variables, por uso) frente a 654 M (338 M) en 2024; recompras por clientes de sistemas arrendados 130 M frente a 109 M [1]. 2T26: 262 M (169 M variables) frente a 214 M [7].',
    base_arrendada: 'Base instalada da Vinci en arrendamiento operativo: 3.425 a jun-26 (1.903 por uso) frente a 2.987 [7]. Cobros mínimos futuros no cancelables de arrendamientos operativos: 1.100,9 M USD a dic-25 [1].',
    procedimientos_historicos: 'Procedimientos da Vinci: 753.000 (2016), 877.000 (2017), 1.037.000 (2018), 1.229.000 (2019), 1.243.000 (2020, covid), 1.594.000 (2021), 1.875.000 (2022), 2.286.000 (2023) [6, 5, 4, 3].',
    base_instalada_historica: '4.986 (2018), 5.582 (2019), 5.989 (2020), 6.730 (2021), 7.544 (2022), 8.606 (2023) [6, 5, 4, 3].',
    colocaciones_historicas: '1.264 (2022), 1.370 (2023), 1.526 (2024), 1.721 (2025) [4, 3, 1]; % en arrendamiento operativo: 39 % (2022), 48 % (2023), 51 % (2024) y 51 % (2025) [2, 1].',
    trimestral_kpi: 'Colocaciones da Vinci por trimestre: 379 (3T24), 493, 367, 395, 427, 532, 431, 468 (2T26); da Vinci 5: 110, 174, 147, 180, 240, 303, 232, 246; base instalada 9.539 (sep-24) a 11.710 (jun-26); crecimiento de procedimientos da Vinci ≈18 %, 18 %, 17 %, 17 %, 19 %, 17 %, 16 % y 15 % [14-21].',
    bariatrica: 'Procedimientos bariátricos da Vinci en EE. UU.: caída de un dígito alto en 2025 [1]; ≈-10 % en 1T26 [25].',
    china: 'Desde 2022 varias provincias limitan lo que se cobra por cirugía robótica; la cuota de 2023 permite 559 robots nuevos en China [1]. En 2T26 la dirección habla de menos concursos, más competencia local y cree que la robótica entrará en la compra centralizada [26].',
    obligaciones_pendientes: 'Obligaciones de desempeño pendientes: 3.000 M USD a dic-25, sobre todo servicio [1].'
  }
};

// ---------------- financieros ----------------
A.financieros = {
  cuenta: N.financieros.cuenta, ltm: N.financieros.ltm,
  cambios_perimetro: [
    { periodo: '2026', descripcion: 'Negocio de distribución da Vinci/Ion de ab medica, Abex y Excelencia Robótica (Italia, España, Portugal, Malta y San Marino), consolidado desde el 1-mar-26 por 533,1 M USD en caja; fondo de comercio +218 M. Sin pro forma por no ser significativo [7].' },
    { periodo: '2019', descripcion: 'Distribuidor de China (Chindex, a través de la empresa conjunta con Fosun) desde el 5-ene-19 y negocio de endoscopios de Schölly desde el 31-ago-19; ingresos no significativos [5].' }],
  comentario: null,
  ajustes: 'Cifras reportadas US GAAP. La empresa publica un no GAAP que excluye la remuneración en acciones (788 M USD en 2025; 677 M en 2024), el plan de incentivos de la empresa conjunta china, la amortización de intangibles (13 M), litigios (14 M), las inversiones estratégicas y ajustes fiscales, sobre todo el beneficio fiscal del ejercicio de acciones (246 M en 2025). BPA no GAAP 8,93 USD frente a 7,87 GAAP en 2025 (7,34 frente a 6,42 en 2024); resultado operativo no GAAP 3.760 M frente a 2.946 M [19]. El EBITDA de esta serie es GAAP: la remuneración en acciones es gasto. En 2T26, 35,9 M de devolución de aranceles IEEPA rebajaron el coste de ventas (28 M netos, 0,08 USD por acción), también dentro del no GAAP [21, 7].',
  confianza: 'Alta',
  extra: {
    base_ebitda: 'EBITDA = resultado operativo + «depreciation and loss on disposal of PP&E» + amortización de intangibles, del estado de flujos [1-6]. El 10-K 2025 agrupa en «amortization of intangible and other assets» también las comisiones capitalizadas (38,0 M en 2025) y otros activos: 62,4 M en 2025, 54,4 M en 2024, 53,2 M en 2023 [1]; esa parte no se suma.',
    ebitda_ajustado: 'EBITDA + remuneración en acciones: 2025 3.573 + 788 = 4.362 M USD (43,3 % de ventas); 2024 2.811 + 677 = 3.488 M (41,8 %) [1]. Guía de remuneración en acciones 2026: 880-900 M (julio) [26], 890-920 M (abril) [25].',
    remuneracion_acciones: 'Remuneración en acciones del estado de flujos: 178 (2016), 209, 261, 336, 395, 449, 513, 593, 677 y 788 M USD (2025) [24]: 27,6 % del beneficio neto y 7,8 % de las ventas en 2025.',
    bpa_split: 'Split 3x1 en octubre de 2021: BPA y acciones de 2016-2018 son los del 10-K 2018 (6,26, 5,77 y 9,49 USD; 117,9, 116,3 y 118,8 M acciones) divididos o multiplicados por 3 [6]. 2016-2017 reexpresados por ASC 606 en el 10-K 2018 (ingresos 2016 originales: 2.704,4 M) [24].',
    impuestos: 'Tipo efectivo: 25,1 % (2016), 39,3 % (2017; cargo de 317,8 M por la reforma fiscal de EE. UU. [6]), 12,1 %, 8,0 %, 11,6 %, 8,6 %, 16,3 %, 7,2 % (2023; beneficios fiscales suizos de 92,3 M y 67,1 M por revaluar activos diferidos [3]), 12,6 % y 13,1 % (2025). El beneficio fiscal del ejercicio de acciones restó 7,4 p.p. al tipo en 2025 y 8,4 p.p. en 2024 [1]. Guía no GAAP 2026: 22-23 % [25, 26].',
    fundacion: 'Aportación a la Intuitive Foundation dentro de los gastos: 70 M en 4T25, 45 M en 4T24 y 40 M en 4T23 [19, 15].',
    margenes_brutos: 'Margen bruto GAAP 66,0 % en 2025 frente a 67,5 % en 2024 (aranceles, depreciación de la nueva capacidad, coste del da Vinci 5) [1]; no GAAP 67,6 % y 69,1 % [19, 15]; 1S26: 66,9 % GAAP y 68,9 % no GAAP [21].',
    aranceles: 'Aranceles en coste de ventas: 48,8 M en 1S26 (20,8 M en 2T26), además de 35,9 M de devolución IEEPA en 2T26 [7]. El 10 % general de la sección 122 rige desde el 24-feb-26 [7].',
    guia_2026: 'Enero: procedimientos da Vinci +13-15 %, margen bruto no GAAP 67-68 % (aranceles 1,2 % de ventas), gastos operativos no GAAP +11-15 % [19]. Abril: 13,5-15,5 %, 67,5-68,5 %, +11-14 % [20]. Julio: 13,5-15,5 % (más cerca del punto medio), 68-69 % (aranceles 1,0 %), +11-13 % [21]. Otros ingresos 315-335 M; tipo no GAAP 22-23 % [25, 26].',
    ltm: 'LTM jun-26 = 2025 + 1S26 - 1S25: ingresos 11.034 M, EBIT 3.451 M, depreciación 696 M, amortización de intangibles 38 M, beneficio neto 3.139 M, BPA 8,72 USD; flujo operativo 3.706 M y capex 484 M [1, 7, 10].',
    margen_operativo: 'Margen operativo GAAP: 35,1 % (2016), 33,9 %, 32,2 %, 30,7 %, 24,1 % (2020), 31,9 %, 25,3 %, 24,8 %, 28,1 % y 29,3 % (2025); 1S26 32,3 % [24, 21].'
  }
};

// ---------------- trimestres ----------------
const q = [
  ['3T24', 2038.1, 1743.7, 577.3, 112.7, 3.5, 1.56, 1.84],
  ['4T24', 2413.5, 1928.3, 734.9, 121.6, 3.1, 1.88, 2.21],
  ['1T25', 2253.4, 1890.6, 578.1, 137.5, 3.4, 1.92, 1.81],
  ['2T25', 2440.0, 2009.9, 743.4, 152.1, 3.2, 1.81, 2.19],
  ['3T25', 2505.1, 2038.1, 759.7, 156.7, 3.3, 1.95, 2.40],
  ['4T25', 2866.2, 2413.5, 864.3, 168.4, 3.3, 2.21, 2.53],
  ['1T26', 2770.8, 2253.4, 855.3, 178.9, 7.1, 2.28, 2.50],
  ['2T26', 2892.3, 2440.0, 971.9, 192.3, 24.0, 2.29, 2.80]];
const r1 = (x) => Math.round(x * 10) / 10;
A.trimestres = {
  items: q.map(([p, ing, ant, ebit, dep, am, bpa]) => ({ periodo: p, ingresos: ing, crecimiento_pct: r1((ing / ant - 1) * 100), crecimiento_organico_pct: null, ebitda: r1(ebit + dep + am), margen_ebitda_pct: r1((ebit + dep + am) / ing * 100), bpa, vs_consenso: p === '1T26' ? 'Superior' : null })),
  ultima_presentacion: null,
  confianza: 'Alta',
  extra: {
    fuentes_de_cada_trimestre: 'Ingresos, resultado operativo, amortización de intangibles y BPA diluido GAAP: notas de prensa [14-21]; depreciación trimestral por diferencia de los acumulados de los 10-Q y 10-K [13, 12, 11, 10, 9, 1, 8, 7]. EBITDA = EBIT + depreciación y bajas + amortización de intangibles; suma de 3T25-2T26 = 4.185 M, igual al LTM.',
    ingresos_por_linea: 'I&A / sistemas / servicio (M USD): 3T24 1.264,2/445,0/328,9; 4T24 1.411,5/654,6/347,4; 1T25 1.367,7/522,7/363,0; 2T25 1.474,1/574,7/391,2; 3T25 1.518,8/590,4/395,9; 4T25 1.658,3/785,9/422,0; 1T26 1.686,4/650,7/433,7; 2T26 1.734,9/685,0/472,4 [14-21].',
    bpa_no_gaap: 'BPA no GAAP: 1,84 (3T24), 2,21, 1,81, 2,19, 2,40, 2,53, 2,50 y 2,80 USD (2T26) [14-21]. 3T25 y 4T25 incluyen 0,12 y 0,11 USD de beneficios fiscales [18, 19]; 2T26 incluye 0,08 USD de devolución de aranceles [21].',
    remuneracion_acciones_trimestral: '172,9 (3T24), 177,0, 185,2, 196,2, 203,5, 203,2, 209,5 y 209,9 M USD (2T26) [14-21].',
    consenso: '1T26: BPA no GAAP 2,50 USD frente a 2,12 previsto [27]. Para el resto de trimestres no se ha contrastado el consenso previo.',
    caja_trimestral: 'Caja + inversiones: 8.310 M (sep-24), 8.830 (dic-24), 9.100 (mar-25), 9.530 (jun-25), 8.430 (sep-25), 9.030 (dic-25), 7.980 (mar-26), 8.630 (jun-26) [14-21].',
    recompras_trimestrales: '3T25: 4,0 M acciones por 1.920 M USD; 4T25: 0,46 M por 200 M; 1T26: 2,3 M por 1.127,5 M; 2T26: 0,9 M por 379,0 M a 438,68 USD de media [9, 1, 8, 7].',
    conferencia_1T26: [
      'Procedimientos da Vinci 847.000 (+16 %); EE. UU. +14 % con +31 % de cirugías fuera de horario; fuera de EE. UU. +19 %, ya el 38 % del volumen [25].',
      'I&A por procedimiento ≈1.880 USD frente a ≈1.780 por la mezcla de SP y da Vinci 5; utilización en EE. UU. +4 %; el da Vinci 5 se usa ≈11 % más que el Xi [25].',
      'Arrendamiento: 56 % de las colocaciones frente a 54 %; 119 entregas de sistemas usados frente a 67; base de da Vinci 5 de casi 1.500 sistemas [25].',
      'SP: 34 colocaciones (19 un año antes), procedimientos +68 %; Ion: 43.000 procedimientos (+39 %) [25].',
      'Bariátrica ≈-10 %; China: pocos concursos, competencia local y presión de precios, sin claridad hasta 2027; Japón: reembolso para siete procedimientos nuevos desde junio de 2026 [25].',
      'Guía subida: procedimientos 13,5-15,5 %; margen bruto 67,5-68,5 % con 100 p.b. de aranceles y más coste de fletes y memoria; gastos operativos +11-14 % (1T26: +10 %, con ≈230 empleados de la compra de los distribuidores); otros ingresos 315-335 M por menos caja tras las recompras [25].',
      'Preguntas: Travis Steed (BofA) sobre hoja de ruta digital e IA; Larry Biegelsen (Wells Fargo) sobre apendicectomía y Japón (la mayor indicación nueva es la hernia inguinal bilateral, ≈1.500 USD de reembolso); Robbie Marcus (JPMorgan) sobre utilización y Xi reacondicionados (la utilización en EE. UU. dependerá del ritmo de sustitución por da Vinci 5); Rick Wise (Stifel) sobre I&A fuera de EE. UU. y telecirugía; David Roman (Goldman) sobre SP [25].'],
    conferencia_2T26: [
      'Procedimientos totales +16 %: da Vinci +15 % (EE. UU. +12 %, fuera +20 %; Europa y Asia +20 %, resto +22 %), Ion +36 % hasta 48.000; utilización da Vinci +3 % e Ion +11 % [26].',
      'I&A por procedimiento ≈1.830 USD frente a ≈1.800; arrendamiento 54 % de las colocaciones; 144 entregas de sistemas usados frente a 83; 246 da Vinci 5 de 468 colocaciones, 114 con doble consola; base de da Vinci 5 algo más de 1.700 [26].',
      'Colocaciones en EE. UU. +24 %, aunque la mitad son sustituciones que no amplían la base; ≈70 % de los sistemas en EE. UU. se adquieren en arrendamiento [26].',
      'Efecto moderado y negativo en EE. UU. por la reforma de la ACA/Medicaid; bariátrica cae un dígito alto (GLP-1); China difícil, con la robótica previsiblemente dentro de la compra centralizada [26].',
      'Margen bruto no GAAP 70,0 % en el trimestre, con la devolución de aranceles; guía de margen 68-69 % y de gastos operativos +11-13 %; remuneración en acciones 880-900 M; otros ingresos 315-335 M; recompras de 379,0 M a 438,68 USD de media [26, 21, 7].',
      'Instrumentos de más usos en una parte del EndoWrist para bajar el coste por caso; la dirección no cuantificó su efecto en el I&A por procedimiento (pregunta de Michael Pollack, Wolfe) [26].',
      'Preguntas: Travis Steed (BofA) sobre ACA frente a madurez del mercado; Robbie Marcus (JPMorgan) sobre capital hospitalario; Rick Wise (Stifel) sobre las más de 100 mejoras del da Vinci 5; Larry Biegelsen (Wells Fargo) sobre la compra centralizada en China; Ryan Zimmerman (BTIG) sobre colocaciones frente a procedimientos; Matt Taylor (Jefferies) sobre la oferta de Xi reacondicionados («XIR» en la transcripción); Vik Chopra (BMO) sobre Japón; Vijay Kumar (Evercore) sobre exposición a Medicaid (no dio cifra) [26]. La transcripción de Webull es automática: nombres y siglas con erratas.'],
    proxima_publicacion: 'No se ha confirmado la fecha de resultados del 3T26: la web de inversores no respondió.'
  }
};

// ---------------- balance ----------------
A.balance = {
  historico: N.balance.historico,
  vencimientos: [],
  liquidez: 'Caja e inversiones de 9.034 M USD a dic-25 (efectivo 3.368, corto plazo 2.567, largo plazo 3.099) y 8.626 M a jun-26 (2.760, 2.456 y 3.409); sin deuda financiera ni líneas de crédito en el 10-K [1, 7].',
  rating: 'Sin deuda emitida; el 10-K no menciona calificación crediticia [1].',
  coste_deuda_pct: null, vida_media_anios: null,
  otros_pasivos: 'Arrendamientos operativos como arrendatario: 170,9 M USD a dic-25 (6,0 años de vida media, 4,6 %) [1]. Compromisos de compra de 2.530 M, 2.370 M a un año, un tercio de instalaciones [1]. Sin deuda ni operaciones fuera de balance relevantes [1]. Litigios: responsabilidad por producto autoasegurada, sin estimar la pérdida adicional posible; demandas antimonopolio por la reparación de EndoWrist (SIS, recurrida tras ganar Intuitive en 2025; acción colectiva de Larkin certificada en marzo de 2025, sin fecha de juicio; Restore, desestimada y recurrida) sin estimación de pérdida [1]. Beneficios fiscales no reconocidos 286,1 M [1]. Pagos aplazados de compras: ninguno relevante desde 2023 [3, 1].',
  comentario: null,
  confianza: 'Alta',
  extra: {
    caja_desglose: 'Efectivo / inversiones a corto / a largo plazo (M USD): 2016 1.036,6/1.518,0/2.283,3; 2017 648,2/1.312,4/1.885,9; 2018 857,9/2.205,2/1.771,3; 2019 1.167,6/2.054,1/2.623,5; 2020 1.622,6/3.488,8/1.757,7; 2021 1.290,9/2.913,1/4.415,5; 2022 1.581,2/2.536,7/2.623,6; 2023 2.750,1/2.473,1/2.120,0; 2024 2.027,4/1.985,9/4.819,1; 2025 3.368,0/2.566,9/3.099,2 [24, 1]. Jun-26: 2.760,4/2.455,8/3.409,3 [7].',
    caja_en_campo_caja: 'El campo caja suma efectivo + inversiones a corto + a largo plazo (renta fija de alta calidad disponible para la venta) [1].',
    arrendamientos: 'Pasivo por arrendamiento operativo: 76,4 (2019) a 170,9 M (2025) [24]. Antes de 2019 (ASC 842) no estaba en balance: null en 2016-2018.',
    sistemas_arrendados_en_inmovilizado: 'El inmovilizado incluye los sistemas cedidos en arrendamiento operativo: 2.096,6 M brutos y 1.371,4 M netos a dic-25 (1.004,6 M netos a dic-24) [1]. Pasan de existencias a inmovilizado sin salida de caja de inversión: 808,9 M en 2025, 614,9 M en 2024 y 422,4 M en 2023 [1].',
    inmovilizado_detalle: 'Edificios 2.833,9 M y obra en curso 638,1 M a dic-25 (1.486,3 y 1.631,6 a dic-24) [1].',
    arrendamiento_financiero_clientes: 'Inversión neta en arrendamientos financieros a clientes: 300,2 M a dic-25 (376,9 M a dic-24) [1].',
    existencias: 'Existencias 1.840,0 M a dic-25 (materias primas 561,1; en curso 287,9; terminados 991,0) y 2.028,7 M a jun-26 [1, 7].',
    activos_por_impuesto_diferido: 'Activos por impuesto diferido 1.018,6 M a dic-25 y 652,4 M a jun-26; el estado de flujos del 1S26 recoge 370,3 M de impuesto diferido [1, 7].',
    junio_2026: 'Activo total 20.876,6 M, pasivo 2.578,9 M, patrimonio de la dominante 18.168,4 M, minoritarios 129,3 M, fondo de comercio 580,6 M, clientes 1.673,2 M, proveedores 277,2 M [7].',
    patrimonio_2016: '2016 tal como se publicó en el 10-K 2016 y 2017 (no reexpresado por ASC 606) [24].'
  }
};

// ---------------- flujos ----------------
A.flujos = {
  historico: N.flujos.historico,
  comentario: null,
  confianza: 'Alta',
  extra: {
    definiciones: 'Capex = compra de inmovilizado (hasta 2020 incluye propiedad intelectual). Adquisiciones = compra de negocios neta de caja (desde 2021 incluye propiedad intelectual y otras inversiones) + pagos aplazados de compras clasificados en financiación (0,3 M en 2018, 22,6 en 2019, 85,0 en 2020, 21,9 en 2021, 4,5 en 2022, 2,9 en 2023, 0,5 en 2024). Emisión de acciones = cobros por planes de empleados [1, 3-6].',
    retenciones_fiscales: 'Impuestos pagados por la liquidación neta de acciones de empleados (recompra implícita, en financiación): 24,0 (2016), 56,6, 120,0, 159,1, 175,2, 211,6, 194,2, 164,7, 270,0 y 419,1 M (2025); 365,4 M en 1S26 [24, 7].',
    dividendos_minoritarios: 'La empresa conjunta china pagó 8,0 M de dividendos a minoritarios en 2024; la matriz nunca ha pagado dividendos [1].',
    capex_sistemas_arrendados: 'Los sistemas cedidos en arrendamiento operativo se fabrican en existencias (flujo operativo) y se traspasan al inmovilizado sin pasar por el capex: 808,9 M en 2025 [1]. El capex cayó de 1.111 M en 2024 a 540 M en 2025 al terminar las obras [1].',
    primer_semestre_2026: '1S26: flujo operativo 1.972,9 M (1.297,0 en 1S25), capex 215,9 M, compra de negocios 528,2 M, venta de activos 46,0 M, recompras 1.443,5 M (más 63,5 M pendientes de pago), cobros por planes 187,4 M [7].',
    impuestos_pagados: 'Impuestos pagados: 537,9 M en 2025, 466,5 M en 2024 y 447,8 M en 2023 [1].',
    arrendamientos_operativos: 'Pagos por arrendamientos operativos como arrendatario (dentro del flujo operativo, US GAAP): 40,6 M en 2025 [1]. Sin arrendamientos financieros: pagos_arrendamientos = 0.'
  }
};

// ---------------- calidad ----------------
A.calidad = {
  auditor: 'PricewaterhouseCoopers LLP (San José, California)',
  anios_auditor: 12,
  opinion: 'Favorable, también sobre el control interno (COSO 2013) [1].',
  comentario: null,
  senales: [
    { senal: 'Remuneración en acciones elevada y creciente', nivel: 'Media', comentario: '788 M USD en 2025: 27,6 % del beneficio neto, 7,8 % de las ventas y 26 % del flujo operativo; más 419 M de retenciones fiscales pagadas en caja [1]. Las acciones diluidas pasaron de 365,8 M (2021) a 362,7 M (2025) pese a 5.319 M de recompras en 2022-2025 [24].' },
    { senal: 'Tipo fiscal rebajado por el ejercicio de acciones y partidas suizas', nivel: 'Media', comentario: 'Beneficio fiscal de 246 M en 2025 (7,4 p.p.) y 223 M en 2024 (8,4 p.p.) [1]; 2023 al 7,2 % por beneficios suizos [3]. La guía no GAAP es del 22-23 % [26].' },
    { senal: 'Existencias que crecen más que las ventas', nivel: 'Baja', comentario: '+23,7 % en 2025 frente a +20,5 % de ingresos; 2.028,7 M a jun-26. Parte son sistemas destinados a arrendamiento operativo (808,9 M traspasados al inmovilizado en 2025) [1, 7].' },
    { senal: 'Capex que no recoge los sistemas cedidos en arrendamiento', nivel: 'Media', comentario: 'Los sistemas en arrendamiento operativo (1.371 M netos a dic-25) entran por existencias en el flujo operativo y se traspasan sin salida de capex; el 51-56 % de las colocaciones van por esta vía [1, 25].' },
    { senal: 'Juicio en el reparto del precio de los sistemas', nivel: 'Baja', comentario: 'Asunto clave de auditoría: estimación del precio independiente de cada elemento en las ventas de sistemas (2.473,7 M de ingresos de sistemas en 2025) [1].' },
    { senal: 'Capitalización de costes', nivel: 'Baja', comentario: 'Comisiones de venta capitalizadas (38,0 M amortizados en 2025) y software capitalizado (299,3 M brutos) [1]. No capitaliza I+D.' },
    { senal: 'Cambio de presentación de las amortizaciones', nivel: 'Baja', comentario: 'Desde 2026 el estado de flujos agrupa «amortization of intangible and other assets» (62,4 M en 2025 frente a 13,2 M solo de intangibles), lo que cambia la cifra de D&A según la fuente [1, 8].' },
    { senal: 'Litigios antimonopolio por la reparación de instrumentos', nivel: 'Media', comentario: 'Acción colectiva certificada en marzo de 2025 (sin fecha de juicio) y recursos de SIS y Restore; la empresa no estima la pérdida posible [1].' }],
  confianza: 'Alta',
  extra: {
    auditor_desde: 'PwC es auditor desde 2014; informe firmado el 3-feb-26 [1].',
    asunto_clave: 'Único asunto clave de auditoría 2025: precio independiente de venta en los contratos de sistemas [1].',
    sin_deterioros: 'Sin deterioro del fondo de comercio [1].',
    activo_diferido: 'Activos por impuesto diferido de 1.018,6 M a dic-25 que bajan a 652,4 M a jun-26 [1, 7].'
  }
};

// ---------------- capital ----------------
A.capital = {
  politica: 'Intuitive nunca ha pagado dividendos y quiere retener el beneficio para el negocio y, cuando convenga, recomprar acciones [1]. El programa de recompra existe desde marzo de 2009 y no caduca: 17.400 M USD autorizados en total; en abril de 2026 el consejo amplió el disponible a 5.000 M (incluido el remanente) y a jun-26 quedaban ≈4.700 M [7]. Recompras: 2.300,9 M en 2025 (4,8 M acciones a 477,84 USD), 1.506,5 M en 1S26 (3,2 M a 475,67 USD) [1, 7]. ASR: 2.274 M en 2017 (Goldman) y 2.000 M en 2022 (Goldman y Citibank) [6, 4]. Sin deuda: la inversión se paga con el flujo operativo [1].',
  adquisiciones: [
    { anio: '2026', objetivo: 'Negocio da Vinci/Ion de ab medica, Abex y Excelencia Robótica (Italia, España, Portugal, Malta, San Marino; >470 sistemas instalados y ≈250 empleados)', importe: 533.1, ev_ebitda: null, financiacion: 'Caja', resultado: 'Cerrada el 1-mar-26; fondo de comercio 218,0 M e intangibles 219,4 M (relaciones con clientes 195,5 M a 6,6 años); amortización de intangibles de 24 M en 2T26. Anunciada en ene-25 con un pago inicial de ≈319 M EUR [7, 1, 22, 23].' },
    { anio: '2025', objetivo: 'Empresa de robótica e IA para evaluar tejido en biopsias (sin nombre en el 10-K)', importe: 13.9, ev_ebitda: null, financiacion: 'Caja', resultado: 'Importe no significativo; fondo de comercio +22,3 M en 2025. La cifra es la línea de compras del estado de flujos [1].' },
    { anio: '2020', objetivo: 'Orpheus Medical (Israel; conectividad y vídeo quirúrgico)', importe: 37.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la plataforma digital; sin deterioros [5, 1].' },
    { anio: '2019', objetivo: 'Negocio de fabricación de endoscopios de Schölly Fiberoptic (Alemania)', importe: 101.4, ev_ebitda: null, financiacion: 'Caja (34,4 M inicial y 67,0 M aplazados)', resultado: 'Integración casi terminada a comienzos de 2021; fondo de comercio 58,9 M; Alemania fabrica hoy la mayoría de los endoscopios [5, 21].' },
    { anio: '2019', objetivo: 'Distribución de Chindex en China (por la empresa conjunta con Fosun)', importe: 66.0, ev_ebitda: null, financiacion: 'Caja (1,3 M inicial y 64,7 M contingentes)', resultado: 'Pagos contingentes de 53,7 M en 2020; el mercado chino sufre topes de precio y compra centralizada [5, 1, 26].' },
    { anio: '2018', objetivo: 'Distribuidores de India (Vattikuti, 38,1 M) y Taiwán (Unison, 35,4 M) y activos de InTouch Technologies (38,7 M)', importe: 112.2, ev_ebitda: null, financiacion: 'Caja', resultado: 'Paso a venta directa en India y Taiwán; India destaca hoy por crecimiento de procedimientos [6, 1].' }],
  comentario: null,
  confianza: 'Alta',
  extra: {
    recompras_historicas: 'Recompras (estado de flujos): 42,5 (2016), 2.274,0 (2017), 0 (2018), 269,5, 134,3, 0 (2021), 2.607,4 (2022), 416,3, 0 (2024), 2.295,3 M (2025) [24]; 11,2 M acciones en 2022, 8,5 M de ellas por ASR [4]. Total 2016-2025: 8.039 M.',
    acciones_en_circulacion: 'Acciones en circulación: 353,1 M (2020), 357,7, 350,0, 352,3, 356,6, 355,1 (2025) y 353,9 M a jun-26 [24, 7].',
    impuesto_recompras: 'Impuesto del 1 % sobre recompras netas: 5,6 M devengados por 2025 [1].',
    fondos_venture: 'Intuitive Ventures: fondo I de 100 M (70 M invertidos) y fondo II de 150 M (30 M invertidos) a dic-25 [1].',
    empresa_conjunta: 'Empresa conjunta con Fosun Pharma en China (catéteres y venta directa da Vinci); minoritarios 117,7 M a dic-25 [1].'
  }
};

A.fuentes = fuentes;
A.huecos = [
  { seccion: 'trimestres', campo: 'crecimiento_organico_pct', tipo: 'Complemento', intentos: '1) Notas de prensa 3T24-2T26: solo crecimiento reportado; 2) 10-Q 2T26: efecto divisa solo sobre ingresos fuera de EE. UU. y la compra de distribuidores declarada no significativa, sin cifra; 3) derivarlo exigiría los ingresos de la adquirida, que no se publican', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'vs_consenso (salvo 1T26)', tipo: 'Complemento', intentos: '1) Notas de prensa: no citan consenso; 2) transcripciones de Stock Analysis y Webull: no dan la previsión previa; 3) Insider Monkey solo da la previsión del 1T26', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'transcripción oficial de las conferencias 1T26 y 2T26', tipo: 'Complemento', intentos: '1) isrg.intuitive.com / investor.intuitivesurgical.com (node/23031, 23231): sin respuesta en 60-120 s; 2) isrg.gcs-web.com/node/23036/pdf: sin respuesta; 3) transcripciones de terceros (Stock Analysis 1T26, Webull 2T26) leídas con WebFetch', decision: 'Calculado y marcado como estimación' },
  { seccion: 'balance', campo: 'arrendamientos 2016-2018', tipo: 'Complemento', intentos: '1) XBRL: OperatingLeaseLiability empieza en 2019; 2) 10-K 2018: arrendamientos fuera de balance antes de ASC 842; 3) no procede calcularlo', decision: 'Omitido' },
  { seccion: 'negocio', campo: 'kpis: nivel de utilización (procedimientos por sistema)', tipo: 'Complemento', intentos: '1) 10-K 2025: solo variación (+3 %); 2) conferencias: solo variación; 3) procedimientos/base media daría ≈300 por sistema, pero la empresa no lo publica así', decision: 'Omitido' }
];
writeFileSync('A.json', JSON.stringify(A, null, 1));
console.log('A.json escrito', Object.keys(A).join(','));
