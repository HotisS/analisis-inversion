// Escribe las notas A-E de Orange SA (ORA.PA, Euronext París; corte 2026-10-20). Ejercicio natural; NIIF-UE; millones de EUR.
// Fuentes primarias: XBRL ESEF 2019-2024 (filings.xbrl.org, LEI 969500MCOONR8990S771), URD 2025 en ESEF (BDIF de la AMF, D.26-0217),
// comunicado y cuentas del 1S26 (assets.orange.com), comunicados de MFN (resultados, plan «Trust the future», MasOrange, SFR, bonos,
// acciones, junta), declaraciones de umbral y de directivos de la AMF, Euronext, Bundesbank y BCE. Mercado: Yahoo y MarketScreener.
// Ejecutar: node informes/orange-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const MFN = 'https://mfn.se/one/a/orange/';
const U = {
  urd25: 'https://bdif.amf-france.org/back/api/v1/documents/2026/D.26-0217/F9503F68D99BF2F554A17FE15AC544B33A2F365EDCDD4A0B77849912A01392EF.pdf',
  h1cp: 'https://assets.orange.com/medias/domain12751/media101937/581256-exeyl73ayg-75.pdf',
  h1rap: 'https://assets.orange.com/pm_12751_581_581454-sf9x36xibb.pdf',
  h1cue: 'https://assets.orange.com/pm_12751_581_581337-qpq291941i.pdf',
  fy25: MFN + 'orange-success-of-lead-the-future-2023-2025-strategic-plan-2025-objectives-fully-achieved-8ef8d061',
  fy25pdf: 'https://ml-eu.globenewswire.com/Resource/Download/2eefbc6a-1688-4d2d-bb58-10f3b069ee2d',
  ttf: MFN + 'orange-orange-unveils-trust-the-future-a-new-strategic-chapter-built-on-trust-to-unlock-growth-01b50f44',
  q1: MFN + 'orange-orange-achieved-very-solid-first-quarter-growth-with-revenues-3-5-and-ebitdaal-6-6-36efcf6a',
  q3_25: MFN + 'orange-solid-third-quarter-results-leading-to-an-increase-in-annual-ebitdaal-growth-guidance-642eceba',
  ag26: MFN + 'orange-ssemblee-generale-mixte-dorange-du-19-mai-2026-resultats-des-votes-et-nomination-de-frederic-sanchez-en-qualite-de-president-non-executif-du-conseil-dadministration-cc4f47b1',
  acc: MFN + 'total-number-of-shares-and-voting-rights-at-september-30-2026-21a3059e',
  bonos: MFN + 'orange-orange-successfully-completes-a-bond-issuance-in-4-tranches-for-a-total-amount-of-4-1-billion-euros-b2db212e',
  recompra: MFN + 'orange-orange-announces-that-it-has-purchased-treasury-shares-within-the-framework-of-its-share-buyback-program-7048d76f',
  sfr: MFN + 'communique-orange-orange-signs-a-joint-agreement-to-acquire-sfr-a-decisive-step-that-will-reinforce-its-leadership-in-france-56920c0c',
  lorca: MFN + 'orange-orange-announces-the-signing-of-a-binding-agreement-with-lorca-to-acquire-their-50-stake-in-masorange-7e3e2db3',
  amf1231: 'https://bdif.amf-france.org/back/api/v1/documents/2026/226C1231/87F0AA931925DEE168C827BE5BF9D18E8C38C20E6B647E92C8E8B93A377D631D.pdf',
  amf0893: 'https://bdif.amf-france.org/back/api/v1/documents/2026/226C0893/21F7D5276D4AEB3F1B48FFE6E2883D933BF6FFAAA67B6B7E6B99D8D230FE402E.pdf',
  esef: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=969500MCOONR8990S771',
  bdif: 'https://bdif.amf-france.org/back/api/v1/informations?Jetons=RS00001914',
  euronext: 'https://live.euronext.com/en/product/equities/FR0000133308-XPAR',
  yahoo: 'https://finance.yahoo.com/quote/ORA.PA/',
  ms: 'https://www.marketscreener.com/quote/stock/ORANGE-4649/finances/',
};

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Document d’enregistrement universel 2025 (URD, versión ESEF): estados consolidados 2025 y 2024, segmentos, deuda, híbridos, provisiones, conciliación del resultado ajustado', editor: 'Orange SA / AMF (BDIF D.26-0217)', tipo: 'Primaria', fecha: '2026-03-25', url: U.urd25 },
  { id: 2, titulo: 'Comptes consolidés résumés au 30 juin 2026 (cuenta, balance, flujos y notas; toma de control de MasOrange)', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-07-28', url: U.h1cue },
  { id: 3, titulo: 'Rapport financier semestriel 2026 (análisis de la actividad por segmento, deuda neta, liquidez)', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-07-28', url: U.h1rap },
  { id: 4, titulo: 'Communiqué résultats du 1er semestre 2026 (T2 y 6M 2026; guía 2026 revisada al alza)', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-07-28', url: U.h1cp },
  { id: 5, titulo: 'Informes anuales ESEF 2019-2024 en XBRL (cuenta, balance y flujos; 2022-2023 reexpresados sin España)', editor: 'XBRL International (filings.xbrl.org) / Orange SA', tipo: 'Primaria', fecha: '2025-03-27', url: U.esef },
  { id: 6, titulo: 'Full-year 2025 results (4T25 y 12M 2025; conciliación del resultado neto ajustado)', editor: 'Orange SA (MFN / GlobeNewswire)', tipo: 'Primaria', fecha: '2026-02-19', url: U.fy25pdf },
  { id: 7, titulo: 'Orange unveils «Trust the future» (plan 2026-2028: EBITDAaL, eCAPEX, cash-flow orgánico, dividendo y BPA ajustado)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-02-19', url: U.ttf },
  { id: 8, titulo: 'First quarter 2026 results (ventas +3,5 %, EBITDAaL +6,6 %, efecto excepcional mayorista en Francia)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-04-23', url: U.q1 },
  { id: 9, titulo: 'Third quarter 2025 results', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2025-10-23', url: U.q3_25 },
  { id: 10, titulo: 'Orange successfully completes a bond issuance in 4 tranches for 4.1 billion euros', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-09', url: U.bonos },
  { id: 11, titulo: 'Binding agreement with Lorca to acquire their 50 % stake in MasOrange (4.250 M EUR)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2025-11', url: U.lorca },
  { id: 12, titulo: 'Orange signs a joint agreement to acquire SFR', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-06', url: U.sfr },
];

// Cuenta por naturaleza. ebit = resultado de explotación publicado (incluye puestas en equivalencia). amortizaciones = inmovilizado +
// derechos de uso + activos financiados. no_recurrentes_en_ebitda = cargas específicas de personnel (GEPP 2025) + reestructuración +
// litigios + costes de compras + deterioros − plusvalías por ventas de activos (en positivo si es gasto).
const cuenta = [
  { periodo: '2021', ingresos: 42522, coste_ventas: null, gastos_generales: null, ebitda: 11160, amortizaciones: 8639, ebit: 2521, resultado_financiero: -782, bai: 1739, impuestos: 962, minoritarios: 545, beneficio_neto: 233, gastos_financieros: 829, participadas_en_ebitda: 3, no_recurrentes_en_ebitda: 1634, bpa: 0.00, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: 2660 },
  { periodo: '2022', ingresos: 39127, coste_ventas: null, gastos_generales: null, ebitda: 12161, amortizaciones: 7372, ebit: 4789, resultado_financiero: -904, bai: 3885, impuestos: 1313, minoritarios: 471, beneficio_neto: 2146, gastos_financieros: 775, participadas_en_ebitda: -2, no_recurrentes_en_ebitda: 701, bpa: 0.73, dpa: 0.70, dpa_extraordinario: 0, acciones_diluidas: 2660 },
  { periodo: '2023', ingresos: 39678, coste_ventas: null, gastos_generales: null, ebitda: 12478, amortizaciones: 7747, ebit: 4731, resultado_financiero: -1168, bai: 3563, impuestos: 875, minoritarios: 451, beneficio_neto: 2440, gastos_financieros: null, participadas_en_ebitda: -29, no_recurrentes_en_ebitda: 366, bpa: 0.85, dpa: 0.72, dpa_extraordinario: 0, acciones_diluidas: 2658 },
  { periodo: '2024', ingresos: 40260, coste_ventas: null, gastos_generales: null, ebitda: 13007, amortizaciones: 7891, ebit: 5116, resultado_financiero: -1066, bai: 4050, impuestos: 1355, minoritarios: 552, beneficio_neto: 2350, gastos_financieros: 1043, participadas_en_ebitda: -348, no_recurrentes_en_ebitda: 475, bpa: 0.82, dpa: 0.75, dpa_extraordinario: 0, acciones_diluidas: 2658 },
  { periodo: '2025', ingresos: 40396, coste_ventas: null, gastos_generales: null, ebitda: 11971, amortizaciones: 8549, ebit: 3422, resultado_financiero: -1254, bai: 2168, impuestos: 1070, minoritarios: 601, beneficio_neto: 538, gastos_financieros: 1087, participadas_en_ebitda: -202, no_recurrentes_en_ebitda: 2162, bpa: 0.14, dpa: 0.75, dpa_extraordinario: 0, acciones_diluidas: 2658 },
];

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 41491, ebitda: 16504, ebit: 7511, beneficio_neto: 4142, bpa: 1.56, dpa: 0.75, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: -317, no_recurrentes_en_ebitda: -2024 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'Las cuentas de 2022 y 2023 están reexpresadas sin Orange España, que pasó a «actividad interrumpida» al pactar la fusión con MásMóvil; 2021 todavía la incluye (ventas de 42.522 M) [5].' },
      { periodo: '2024', descripcion: 'Desde el 26-mar-2024 MasOrange (50 %) se consolida por puesta en equivalencia; Orange cobró ≈ 4.400 M por la pérdida de control [1, 5].' },
      { periodo: '2026', descripcion: 'Compra del 50 % de Lorca en MasOrange por 4.250 M: MasOrange se integra al 100 % desde el 8-jun-2026, con una plusvalía de revalorización de ≈ 2.400 M en el 1S26 [2, 11]. Compra de Scorefit por 1.300 M el 1-jul-2026, después del balance de junio [3].' },
    ],
    comentario: 'Las ventas son casi planas desde 2022 en el perímetro sin España: 39.127 M en 2022, 40.260 M en 2024 y 40.396 M en 2025 (+0,9 % comparable) [1, 5]. Francia cae (−2,1 % en 2025 por el mayorista y el fin del cobre) y África y Oriente Medio crece a doble dígito (+12,2 %) [6]. El indicador de gestión de Orange es el EBITDAaL (después de arrendamientos y sin partidas específicas): 12.470 M en 2025 (+3,8 % comparable), un 30,9 % de las ventas [6]. El EBITDA del motor (EBIT + amortizaciones, con los arrendamientos fuera) sale de 14.335 M en 2025 (35,5 %) al devolver 2.162 M de partidas no recurrentes y quitar las puestas en equivalencia (−202 M, sobre todo MasOrange). 2025 tiene el gran gasto del acuerdo GEPP (prejubilaciones en Francia, 1.540 M de cargas de personal específicas) y 332 M de deterioro del fondo de comercio: por eso el BPA publicado cae a 0,14 €, frente a un BPA ajustado de 0,86 € [1, 6]. En el 1S26 el resultado de explotación sube a 4.774 M por la plusvalía de ≈ 2.400 M de MasOrange y el BPA ajustado crece un 10,9 % (0,34 €) [4].',
    ajustes: 'Cifras NIIF publicadas. participadas_en_ebitda = resultado de las puestas en equivalencia, que Orange mete en el resultado de explotación (MasOrange entre mar-2024 y may-2026) [1, 5]. no_recurrentes_en_ebitda (en positivo si es gasto): 2021 deterioro del fondo de comercio de 3.702 M (España y Rumanía) + 108 M de otros deterioros + 331 M de reestructuración − 2.507 M de plusvalía (venta del 50 % de Orange Concessions); 2022 deterioro de 817 M + 117 M de reestructuración − 233 M de plusvalías; 2023 456 M de reestructuración − 90 M de plusvalías; 2024 134 M de reestructuración + 279 M de minusvalías + 62 M de deterioros; 2025 1.540 M de cargas de personal del GEPP + 382 M de reestructuración + 25 M de litigios y costes de compras − 183 M de revisión de cartera + 398 M de deterioros [1, 5, 6]. LTM jun-26: el 1S26 resta la plusvalía de 2.559 M y el 1S25 el GEPP. El BPA de 2021 es 0,00 € (233 M de beneficio menos los cupones de los híbridos). Acciones ≈ 2.658-2.660 M en todos los años (sin ampliaciones). El resultado neto ajustado de Orange también excluye la amortización de compras (PPA, 91 M en 2025) y los cupones de los híbridos se restan del BPA [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 9917, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2480, margen_ebitda_pct: 25.0, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 9939, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3195, margen_ebitda_pct: 32.1, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 9993, crecimiento_pct: 0.0, crecimiento_organico_pct: 0.8, ebitda: 3437, margen_ebitda_pct: 34.4, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: 10550, crecimiento_pct: 1.2, crecimiento_organico_pct: 2.2, ebitda: 3358, margen_ebitda_pct: 31.8, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 10095, crecimiento_pct: 1.8, crecimiento_organico_pct: 3.5, ebitda: 2601, margen_ebitda_pct: 25.8, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 10853, crecimiento_pct: 9.2, crecimiento_organico_pct: 3.5, ebitda: 3527, margen_ebitda_pct: 32.5, bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: 'EBITDA de la tabla = EBITDAaL de Orange (después de arrendamientos); Orange publica el BPA solo por semestre. 1T25 y 2T25 salen por diferencia (1S25: ventas 19.853 M y EBITDAaL 5.675 M) [2, 4, 9]. En el 2T26 (28-jul) las ventas crecieron un 3,5 % comparable (+9,2 % con MasOrange desde el 8-jun) y el EBITDAaL un 3,9 % (+10,4 %) [4]. En el 1S26: Francia ventas +1,2 % y EBITDAaL +2,4 % con ≈ 100 M de ventas y 75 M de EBITDAaL excepcionales del 1T (cofinanciación de fibra); África y Oriente Medio +13,9 % y +16,1 %; Europa +4,1 % y +6,1 %; Orange Business −3,1 % [4]. Orange subió la guía de 2026: EBITDAaL por encima del +4 % (antes ≈ +3 %), eCAPEX ≈ 15 % de las ventas, cash-flow orgánico ≈ 4.300 M y deuda neta / EBITDAaL de ≈ 2 veces a medio plazo [4]. BPA ajustado del 1S26: 0,34 € (+10,9 %). Resultados del 3T26 el 27-oct-2026.',
    confianza: 'Alta',
  },
  balance: {
    historico: [
      { periodo: '2021', activo_total: 108071, activo_corriente: 25834, pasivo_corriente: 27276, pasivo_total: 72710, fondo_comercio: 24192, intangibles: 14940, inmovilizado_material: 30484, existencias: 952, clientes: 6029, proveedores: 6738, activos_contrato: 1460, pasivos_contrato: 2512, caja: 8621, deuda_financiera: 35343, arrendamientos: 8065, patrimonio_neto: 32341, minoritarios: 3020, reservas: null },
      { periodo: '2022', activo_total: 109650, activo_corriente: 26803, pasivo_corriente: 29223, pasivo_total: 74694, fondo_comercio: 23113, intangibles: 14946, inmovilizado_material: 31640, existencias: 1048, clientes: 6305, proveedores: 7067, activos_contrato: 1570, pasivos_contrato: 2579, caja: 6004, deuda_financiera: 36632, arrendamientos: 8410, patrimonio_neto: 31784, minoritarios: 3172, reservas: null },
      { periodo: '2023', activo_total: 110052, activo_corriente: 25241, pasivo_corriente: 30526, pasivo_total: 74954, fondo_comercio: 23775, intangibles: 15098, inmovilizado_material: 33193, existencias: 1152, clientes: 6013, proveedores: 7042, activos_contrato: null, pasivos_contrato: 2717, caja: 5618, deuda_financiera: 35986, arrendamientos: 8568, patrimonio_neto: 31825, minoritarios: 3274, reservas: null },
      { periodo: '2024', activo_total: 103874, activo_corriente: 25695, pasivo_corriente: 27908, pasivo_total: 68712, fondo_comercio: 21100, intangibles: 12456, inmovilizado_material: 30421, existencias: 791, clientes: 5838, proveedores: 6448, activos_contrato: 1630, pasivos_contrato: 2426, caja: 8766, deuda_financiera: 35014, arrendamientos: 7366, patrimonio_neto: 31773, minoritarios: 3388, reservas: -676 },
      { periodo: '2025', activo_total: 107415, activo_corriente: 28898, pasivo_corriente: 25938, pasivo_total: 74261, fondo_comercio: 20758, intangibles: 12510, inmovilizado_material: 31903, existencias: 743, clientes: 5165, proveedores: 6375, activos_contrato: 1723, pasivos_contrato: 2485, caja: 12167, deuda_financiera: 37995, arrendamientos: 7522, patrimonio_neto: 29739, minoritarios: 3416, reservas: -2261 },
    ],
    vencimientos: [
      { anio: '2026', importe: 3030 }, { anio: '2027', importe: 2701 }, { anio: '2028', importe: 2811 },
      { anio: '2029', importe: 2962 }, { anio: '2030', importe: 3127 }, { anio: '2031+', importe: 20878 },
    ],
    liquidez: 'Caja de 9.305 M y activos financieros corrientes de 2.178 M a 30-jun-2026, más líneas de crédito sin disponer [2, 3]. En septiembre de 2026 Orange colocó 4.100 M de bonos en cuatro tramos con cupones del 3,625 % al 4,5 % para refinanciar la deuda de MasOrange [10]. La compra de Scorefit (1.300 M, 1-jul) se pagó con un préstamo de CaixaBank y BNP [3].',
    rating: 'S&P BBB+ (estable), Moody’s Baa1 (estable), Fitch BBB+ (estable) [1, 3]. Moody’s tiene a Francia en Aa3 con perspectiva negativa y la revisa el 23-oct-2026: la nota de Orange está tres escalones por debajo del Estado, así que una rebaja de Francia no arrastra a Orange de forma automática.',
    coste_deuda_pct: 3.4,
    vida_media_anios: null,
    otros_pasivos: 'Híbridos (títulos subordinados perpetuos) de 4.993 M a 30-jun-2026, contabilizados como patrimonio (cupones de ≈ 170-190 M al año): en el puente van como deuda [1, 2]. Arrendamientos de 8.859 M (7.206 a largo y 1.653 a corto) [2]. Beneficios a empleados a largo plazo de 2.856 M (sobre todo el GEPP y el «temps partiel seniors» en Francia) y provisión de desmantelamiento de 2.659 M, la mayor parte para retirar la red de cobre francesa [2]. Pagos aplazados por licencias y por inmovilizado (≈ 3.400 M a fin de 2025) [1]. Los minoritarios (Sonatel, Orange Côte d’Ivoire, Jordania, Bélgica, Polonia, Rumanía) se llevan ≈ 600-650 M al año [1].',
    comentario: 'Deuda financiera neta (definición de Orange, sin arrendamientos) de 22.526 M a fin de 2025 y 35.683 M a 30-jun-2026: subió 13.157 M por la integración de MasOrange (su deuda y el pago de 4.250 M a Lorca); deuda neta / EBITDAaL de 2,40 veces (1,8 a fin de 2025) [1, 4]. Con arrendamientos e híbridos la deuda neta ajustada es de ≈ 49.500 M. El objetivo es volver a ≈ 2 veces a medio plazo [4]. Activo total de 126.396 M a junio (107.415 M a fin de 2025), con 28.954 M de fondo de comercio y 19.453 M de intangibles tras MasOrange [2]. El capital circulante es negativo (proveedores de 9.055 M frente a clientes de 5.791 M y existencias de 956 M a junio) [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: [
      { periodo: '2021', flujo_operativo: 11236, capex: 8749, pagos_arrendamientos: 1625, adquisiciones: 211, desinversiones: 891, dividendos: 2127, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2022', flujo_operativo: 11235, capex: 8777, pagos_arrendamientos: 1519, adquisiciones: 58, desinversiones: 12, dividendos: 1861, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2023', flujo_operativo: 12054, capex: 7829, pagos_arrendamientos: 1657, adquisiciones: 1416, desinversiones: 34, dividendos: 1862, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
      { periodo: '2024', flujo_operativo: 10195, capex: 6973, pagos_arrendamientos: 1499, adquisiciones: 35, desinversiones: 4661, dividendos: 1915, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 175 },
      { periodo: '2025', flujo_operativo: 10780, capex: 7962, pagos_arrendamientos: 1496, adquisiciones: 82, desinversiones: 533, dividendos: 1994, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 169 },
    ],
    comentario: 'Orange clasifica los intereses pagados en explotación: el flujo operativo ya va después de intereses e impuestos [1, 5]. Los cupones de los híbridos (169 M en 2025 y 175 M en 2024) van en financiación y se ponen en intereses_en_financiacion para que el FCF salga después de ellos. Capex = compras de inmovilizado e intangibles más licencias (2025: 7.322 + 640; 2024: 6.710 + 263); en 2021-2023 es la cifra total del estado de flujos (2021-2022 con España) [1, 5]. El eCAPEX de gestión (sin licencias) fue de 6.208 M en 2025 (15,4 % de las ventas) y el plan lo baja al ≈ 14 % en 2028 [6, 7]. El cash-flow orgánico de Orange (EBITDAaL − eCAPEX − impuestos − intereses ± circulante) fue de 3.653 M en 2025 y la guía es de ≈ 4.300 M en 2026 y ≈ 5.200 M en 2028 [4, 7]. Las desinversiones de 2024 son la caja de la pérdida de control de España (4.391 M) más ventas de activos. Dividendos a los accionistas de Orange; a minoritarios, 433 M más en 2025 [1]. Sin recompras para amortizar (solo para planes de empleados).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG SA (desde 2015) y Deloitte & Associés',
    anios_auditor: 11,
    opinion: 'Favorable, sin salvedades (2025) [1]',
    comentario: 'Tres asuntos de juicio. Primero, las partidas «específicas»: Orange las excluye del EBITDAaL y del resultado ajustado y en 2025 fueron enormes (GEPP de 1.540 M, reestructuración de 382 M, deterioros de 398 M) [1, 6]; en 2021-2025 suman ≈ 5.300 M netos de plusvalías, unos 1.000 M al año: no son del todo extraordinarias (Orange reestructura casi todos los años) y en el DCF dejamos un 0,3 % de las ventas como coste recurrente. Segundo, la plusvalía de ≈ 2.400 M por revalorizar el 50 % de MasOrange al tomar el control infla el resultado del 1S26 y el BPA publicado de 2026 [2]. Tercero, la provisión de desmantelamiento del cobre subió de 767 M a 2.564 M en 2025: el cierre de la red de cobre francesa hasta 2030 es una salida de caja real que va en el puente [1].',
    senales: [
      { senal: 'Partidas «específicas» recurrentes (≈ 1.000 M al año en 2021-2025)', nivel: 'Media', comentario: 'Reestructuración casi todos los años; el GEPP de 2025 es un plan de prejubilaciones de varios años [1].' },
      { senal: 'Plusvalía de revalorización de MasOrange en el 1S26 (≈ 2.400 M)', nivel: 'Baja', comentario: 'No es caja; el BPA ajustado la excluye [2, 4].' },
      { senal: 'Híbridos de 4.993 M como patrimonio', nivel: 'Baja', comentario: 'Se tratan como deuda en el puente [2].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo mínimo creciente: 0,79 € por 2026 (a cuenta de 0,30 € el 3-dic-2026, fecha ex el 1-dic) y mínimo de 0,85 € por 2028 [4, 7]. Prioridades del plan «Trust the future»: bajar la deuda neta a ≈ 2 veces el EBITDAaL tras MasOrange, consolidar mercados (España, Francia con SFR) y mantener la nota BBB+ [7]. Solo recompras pequeñas para cubrir los planes de acciones de empleados (4,5 M de acciones a 15,28 € del 16 al 22-sep-2026) [12].',
    adquisiciones: [
      { anio: '2026', objetivo: 'MasOrange (50 % de Lorca)', importe: 4250, multiplo: '≈ 7,3x EBITDAaL (valor de empresa del 100 % ≈ 16.700 M, estimación propia)', resultado: 'Integrada desde el 8-jun-2026; plusvalía de revalorización de ≈ 2.400 M [2, 11].' },
      { anio: '2026', objetivo: 'Scorefit', importe: 1300, multiplo: null, resultado: 'Cerrada el 1-jul-2026, financiada con préstamo bancario [3].' },
      { anio: '2026-2027', objetivo: 'SFR (≈ 27 % del reparto con Bouygues e Iliad)', importe: 5600, multiplo: '≈ 9,3x EBITDAaL de la parte de Orange', resultado: 'Protocolo conjunto; firma esperada en el 2S26 y cierre en el 2S27 si lo aprueba la Autoridad de la Competencia [12].' },
    ],
    comentario: 'Orange devolvió la caja sobre todo en dividendos (≈ 1.900-2.000 M al año) y no ha ampliado capital [1]. Desde 2024 ha cambiado de estrategia: consolidar mercados de cuatro operadores. La fusión de España (MasOrange) y la compra del 50 % restante subieron la deuda neta en 13.000 M; SFR añadiría ≈ 5.600 M más en 2027 [11, 12]. Los precios pagados (7-9 veces el EBITDAaL) son los de mercado para operadores europeos; el riesgo es de ejecución y de deuda, no de precio.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Francia', descripcion: 'Móvil, fibra y convergencia para particulares y pymes; mayorista (fibra a otros operadores, cobre en extinción).', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: 17473, resultado: 6429 }] },
      { nombre: 'África y Oriente Medio', descripcion: '18 países (Costa de Marfil, Senegal, Egipto, Marruecos, Jordania...): móvil, datos, Orange Money.', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: 8427, resultado: 3306 }] },
      { nombre: 'Europa', descripcion: 'Polonia, Bélgica y Luxemburgo, Rumanía, Eslovaquia y Moldavia.', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: 7263, resultado: 2028 }] },
      { nombre: 'Orange Business', descripcion: 'Redes y servicios de TI para empresas y administraciones (mayoritariamente francesas); Orange Cyberdefense.', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: 7325, resultado: 577 }] },
      { nombre: 'TOTEM', descripcion: 'Torres de telecomunicaciones en Francia y España (antes de MasOrange).', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: 728, resultado: 369 }] },
      { nombre: 'Operadores internacionales, servicios compartidos y eliminaciones', descripcion: 'Mayorista internacional, sede y eliminaciones entre segmentos.', tipo_resultado: 'EBITDAaL', historico: [{ periodo: '2025', ingresos: -820, resultado: -239 }] },
    ],
    geografias: [
      { nombre: 'Francia (segmento Francia con TOTEM y eliminaciones; Orange Business, mayoritariamente francés, va aparte)', peso_pct: 43.0 },
      { nombre: 'África y Oriente Medio', peso_pct: 20.9 },
      { nombre: 'Europa (sin España)', peso_pct: 18.0 },
      { nombre: 'Orange Business (empresas, sobre todo Francia)', peso_pct: 18.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Clientes convergentes en Francia y ARPO convergente', valor_anterior: '78,6 € (3T25)', valor_actual: 'ARPO +1 % aprox. (2026)', variacion: 'sube', comentario: 'Orange tiene el mejor churn y NPS del mercado francés [6, 9].' },
      { kpi: 'Hogares conectables con fibra (Europa)', valor_anterior: '—', valor_actual: '59,9 M (1T26)', variacion: '—', comentario: 'Líder europeo en fibra [8].' },
      { kpi: 'Usuarios de Orange Money', valor_anterior: '40 M', valor_actual: '47 M (2025, +18 %)', variacion: 'sube', comentario: 'Motor de crecimiento en África [1].' },
      { kpi: 'eCAPEX / ventas', valor_anterior: '15,4 % (2025)', valor_actual: '15,2 % (1S26)', variacion: 'baja', comentario: 'Objetivo ≈ 14 % en 2028 [4, 7].' },
      { kpi: 'Deuda neta / EBITDAaL', valor_anterior: '1,8x (dic-25)', valor_actual: '2,40x (jun-26)', variacion: 'sube', comentario: 'Por MasOrange; objetivo ≈ 2x a medio plazo [4].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'BPA trimestral y consenso previo de cada trimestre', tipo: 'Complemento', intentos: '1) Comunicados trimestrales (Orange solo da ventas, EBITDAaL y eCAPEX); 2) MarketScreener (sin historial trimestral accesible); 3) prensa (sin cifras de consenso)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'Segmentos 2021-2024 en el perímetro actual', tipo: 'Complemento', intentos: '1) URD 2025 (solo 2025 y 2024 reexpresado, no extraído); 2) ESEF 2024 (segmentos con dimensiones, no extraídos); 3) comunicados (cambio de segmentos en 2026)', decision: 'Solo 2025' },
    { seccion: 'flujos', campo: 'Licencias de 2021-2023 por separado', tipo: 'Complemento', intentos: '1) ESEF 2022 y 2023; 2) URD 2025; 3) comunicados', decision: 'Capex total del estado de flujos' },
  ],
};

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'URD 2025: historia, estrategia, mercados, regulación, riesgos y declaración de sostenibilidad', editor: 'Orange SA / AMF', tipo: 'Primaria', fecha: '2026-03-25', url: U.urd25 },
  { id: 2, titulo: 'Arcep: observatorio de los mercados de comunicaciones electrónicas en Francia, año 2025 (minorista 37.500 M, −1,6 %; mayorista 8.500 M; inversión 10.300 M)', editor: 'Arcep', tipo: 'Primaria', fecha: '2026-06', url: 'https://www.arcep.fr/cartes-et-donnees/nos-publications-chiffrees/observatoire-des-marches-des-communications-electroniques-en-france.html' },
  { id: 3, titulo: 'Orange unveils «Trust the future»', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-02-19', url: U.ttf },
  { id: 4, titulo: 'Orange signs a joint agreement to acquire SFR (con Bouygues Telecom e Iliad)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-06', url: U.sfr },
  { id: 5, titulo: 'Fichas de Yahoo Finance de Deutsche Telekom, Telefónica, Vodafone, KPN, Proximus, Swisscom, Telenor, Telia, BT y Bouygues', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/DTE.DE/' },
  { id: 6, titulo: 'Communiqué résultats du 1er semestre 2026', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-07-28', url: U.h1cp },
  { id: 7, titulo: 'Prensa sectorial: Starlink compra espectro (≈ 8.000 M USD) para ser operador móvil a finales de 2027; agente de compras «Muse» de Meta y comparadores con IA; alianza satelital de Orange, DT, Vodafone y Telefónica (19-oct)', editor: 'Les Echos / Reuters / Boursorama', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.boursorama.com/cours/actualites/1rPORA/' },
  { id: 8, titulo: 'Calificaciones ESG (MSCI, Sustainalytics, ISS, EcoVadis) citadas en el URD 2025', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-03-25', url: U.urd25 },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Orange es el antiguo monopolio telefónico francés: nace del Ministerio de Correos, Telégrafos y Teléfonos, se llama France Télécom desde 1991, es sociedad anónima desde 1996 y sale a bolsa en 1997 [1]. El Estado bajó su parte de forma escalonada del 100 % al ≈ 23 % del capital a fin de 2025 (29 % de los votos por los derechos dobles) [1]. En 2000 compró Orange (Reino Unido) y en 2013 tomó ese nombre para todo el grupo [1]. Desde 2023 la estrategia es concentrarse en las redes de Europa y África y consolidar mercados: fusión en España con MásMóvil (2024), compra del 100 % de MasOrange (2026) y reparto de SFR en Francia (pendiente) [1, 3, 4].',
    hitos: [
      { anio: '1991', hito: 'France Télécom se separa de la administración de Correos [1].' },
      { anio: '1997', hito: 'Salida a bolsa en París y Nueva York [1].' },
      { anio: '2000', hito: 'Compra de Orange plc a Vodafone [1].' },
      { anio: '2013', hito: 'El grupo adopta la marca Orange [1].' },
      { anio: '2021', hito: 'Creación de TOTEM (torres) y venta del 50 % de Orange Concessions [1].' },
      { anio: '2024', hito: 'Fusión de Orange España y MásMóvil en MasOrange (50 %); salida de la Bolsa de Nueva York [1].' },
      { anio: '2026', hito: 'Plan «Trust the future»; compra del 100 % de MasOrange; protocolo para repartirse SFR con Bouygues e Iliad [3, 4].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Orange es el primer operador de telecomunicaciones de Francia y uno de los mayores de Europa y África: 300 millones de clientes en 26 países, 123.500 empleados y 40.396 M de ventas en 2025 [1]. Vende móvil, fibra y paquetes convergentes a particulares, redes y servicios de TI a empresas (Orange Business, con Orange Cyberdefense) y alquila su red a otros operadores [1]. Con la integración de MasOrange (España, ≈ 7.600 M de ventas) las ventas de 2026 rondarán los 45.800 M [6].',
    como_gana_dinero: 'Ingresos por suscripción mensual (móvil, fibra, televisión) y por servicios a empresas; el negocio es de costes fijos altos (redes, espectro) y margen EBITDAaL del ≈ 31 % [1]. La mitad del EBITDAaL sale de Francia (52 %) y una cuarta parte de África y Oriente Medio (26 %), que crece a doble dígito con datos móviles y Orange Money [1]. La inversión (eCAPEX) se come la mitad del EBITDAaL; el dinero que queda paga intereses, impuestos y un dividendo de ≈ 2.000 M [1].',
    clientes: 'Sin concentración: 300 M de clientes; en Francia, el mayor cliente es el propio sector público (administración, hospitales, colectividades) a través de Orange Business [1]. Poder de precios moderado: en Francia los precios del móvil son de los más bajos de Europa por la entrada de Free (2012), y la subida de 2025-2026 viene de la convergencia y de la fibra [2].',
  },
  sector: {
    definicion: 'Mercado relevante: los servicios de telecomunicaciones minoristas en Francia, donde Orange obtiene el 43 % de las ventas y el 52 % del EBITDAaL [1]. Lo mide la Arcep (ingresos de los operadores con los clientes finales, sin mayorista) [2]. Es una aproximación: no recoge África, Europa ni España, ni los servicios de TI de Orange Business.',
    tamano: '37.500 M EUR de ingresos minoristas en Francia en 2025 (−1,6 %), más 8.500 M de mayorista [2]; Orange Francia minorista ≈ 11.250 M (≈ 30 %, estimación propia).',
    unidad_serie: 'miles de millones de EUR de ingresos minoristas de telecomunicaciones en Francia (Arcep)',
    serie: [{ anio: '2021', tamano: 36.1 }, { anio: '2022', tamano: 36.8 }, { anio: '2023', tamano: 37.5 }, { anio: '2024', tamano: 38.1 }, { anio: '2025', tamano: 37.5 }],
    tcac_historico_pct: 1.0,
    tcac_previsto_pct: 0.5,
    cr5_pct: 98,
    estructura: 'Oligopolio',
    drivers: [
      { driver: 'Consolidación de cuatro a tres operadores (SFR repartida)', efecto: '+', horizonte: 'Estructural', evidencia: 'Protocolo con Bouygues e Iliad; cierre posible en el 2S27 [4].' },
      { driver: 'Fin del cobre y migración a fibra', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Orange pierde ≈ 800 M de ingresos mayoristas del cobre hasta 2030, pero ahorra costes de red [3].' },
      { driver: 'Consumo y confianza de los hogares franceses', efecto: '−', horizonte: 'Cíclico', evidencia: 'Mercado minorista −1,6 % en 2025 [2]; incertidumbre política desde el verano de 2026.' },
      { driver: 'Crecimiento de datos y dinero móvil en África', efecto: '+', horizonte: 'Estructural', evidencia: 'África y Oriente Medio +12,2 % en 2025 y +13,9 % en el 1S26 [1, 6].' },
      { driver: 'Nuevos entrantes por satélite (Starlink directo al móvil)', efecto: '−', horizonte: 'Estructural', evidencia: 'Starlink compró espectro para ser operador móvil a finales de 2027 [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cuatro operadores en Francia (Orange, SFR, Bouygues, Free) con precios bajos; si se reparte SFR, baja a tres [2, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Portabilidad fácil; churn del móvil del 12 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Pocos fabricantes de equipos (Nokia, Ericsson), sin Huawei en el núcleo de la red [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Espectro y redes caras; el satélite es la amenaza nueva [7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Servicios por internet (WhatsApp) ya sustituyeron voz y SMS [1].' },
    ],
    ciclo: { posicion: 'Madurez', comentario: 'Telecomunicaciones maduras: ventas planas en Francia y Europa, crecimiento en África [1, 2]. El ciclo económico pesa poco en el volumen pero sí en el precio y en el segmento de empresas (Orange Business −3,1 % en el 1S26) [6].' },
    regulacion: 'Orange es operador con poder significativo en el mercado mayorista francés: la Arcep regula los precios de acceso al cobre y a la fibra y el calendario de cierre del cobre (hasta 2030) [1, 2]. El Estado es accionista (≈ 20 % del capital tras la venta de Bpifrance de julio) y cliente, y Orange presta el servicio universal y las redes de emergencia [1]. En Europa, la Ley de Redes Digitales y las reglas de fusiones de la Comisión deciden la consolidación [1].',
    tendencias: 'Tres tendencias: consolidación de mercados nacionales (España en 2024, Francia con SFR, Italia), reparto de infraestructuras (torres, fibra) y entrada de la IA tanto como ahorro de costes (redes y atención al cliente) como amenaza en la venta (agentes de compra que comparan tarifas) [1, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 30,
    posicion: '1.º operador de Francia por ingresos y clientes de fibra y móvil (≈ 30 % del mercado minorista, estimación propia) [1, 2]; 1.º o 2.º en la mayoría de sus países africanos [1].',
    competidores: [
      { nombre: 'SFR (Altice France)', pais: 'FR', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo operador; en venta por partes a Orange, Bouygues e Iliad [4].' },
      { nombre: 'Bouygues Telecom (Bouygues)', pais: 'FR', ticker: 'EN', ingresos: 56329, cuota_pct: null, margen_ebit_pct: 4.8, comentario: 'Ventas y margen operativo de todo el grupo Bouygues (construcción incluida) [5].' },
      { nombre: 'Free (Iliad)', pais: 'FR', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'El de precios más bajos; no cotiza [1].' },
      { nombre: 'Deutsche Telekom', pais: 'DE', ticker: 'DTE', ingresos: 123226, cuota_pct: null, margen_ebit_pct: 23.5, comentario: 'Mayor operador europeo (con T-Mobile US) [5].' },
      { nombre: 'Telefónica', pais: 'ES', ticker: 'TEF', ingresos: 36239, cuota_pct: null, margen_ebit_pct: 9.9, comentario: 'Rival de MasOrange en España [5].' },
      { nombre: 'Vodafone', pais: 'GB', ticker: 'VOD', ingresos: 48051, cuota_pct: null, margen_ebit_pct: 7.8, comentario: 'Rival en España (Zegona) y en África (Vodacom) [5].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco relevante en telecomunicaciones salvo Orange Money en África [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los paquetes convergentes reducen el churn [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias de espectro y marca más valorada del sector en Francia [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Mayor red de fibra de Europa (59,9 M de hogares conectables) [6].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercados con 3-4 operadores y barreras de entrada altas (redes y espectro) [2].' },
      ],
    },
    amenazas: 'Guerra de precios en Francia si el reparto de SFR se retrasa o se bloquea (probabilidad media); entrada de Starlink en móvil (baja a 2027, media a 2030); comparadores y agentes de IA que aceleren el cambio de operador (media); y competencia agresiva de Digi en España (alta) [4, 7].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI', calificacion: 'BBB', fecha: '2025' },
      { agencia: 'Sustainalytics', calificacion: 'Riesgo bajo', fecha: '2025' },
      { agencia: 'ISS ESG', calificacion: 'Prime (B)', fecha: '2025' },
      { agencia: 'EcoVadis', calificacion: 'Platino', fecha: '2025' },
    ],
    materialidad: 'Energía y clima (redes y centros de datos), protección de datos y ciberseguridad, inclusión digital y condiciones de trabajo de 123.500 empleados (planes de prejubilación en Francia) [1, 8].',
    controversias: 'La crisis de suicidios de 2008-2009 en France Télécom acabó con la condena penal de la empresa y de sus antiguos directivos por acoso moral institucional (sentencia firme en 2025) [1]. Multas de competencia y de la CNIL de menor cuantía [1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Serie oficial de la Arcep de 2021-2024 en el mismo formato', tipo: 'Complemento', intentos: '1) Web de la Arcep (403 al descargar); 2) URD 2025 (solo cita el mercado); 3) prensa (cifras de 2025)', decision: 'Serie 2021-2024 estimada hacia atrás con las variaciones publicadas; marcada como aproximación' },
    { seccion: 'competencia', campo: 'Cifras de SFR y Free', tipo: 'Complemento', intentos: '1) Altice France (cuentas de bonistas, no descargadas); 2) Iliad (informe de bonistas); 3) prensa', decision: 'Omitido' },
  ],
};

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'URD 2025: gobierno corporativo, consejo, retribución de los mandatarios, accionariado y derechos de voto', editor: 'Orange SA / AMF', tipo: 'Primaria', fecha: '2026-03-25', url: U.urd25 },
  { id: 2, titulo: 'Assemblée générale mixte du 19 mai 2026: résultats des votes et nomination de Frédéric Sanchez', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-05-19', url: U.ag26 },
  { id: 3, titulo: 'Déclaration de franchissement de seuil 226C1231 (Bpifrance / État, colocación del 31-jul-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-08', url: U.amf1231 },
  { id: 4, titulo: 'Déclaration de franchissement de seuil 226C0893 (BlackRock, 19-jun-2026)', editor: 'AMF', tipo: 'Primaria', fecha: '2026-06', url: U.amf0893 },
  { id: 5, titulo: 'Déclarations des dirigeants (operaciones de directivos de Orange, mayo-octubre de 2026)', editor: 'AMF (BDIF)', tipo: 'Primaria', fecha: '2026-10-05', url: U.bdif },
  { id: 6, titulo: 'Total number of shares and voting rights at September 30, 2026', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-10', url: U.acc },
  { id: 7, titulo: 'Comunicados de resultados 2023-2025 (objetivos anuales y del plan «Lead the future»)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-02-19', url: U.fy25 },
  { id: 8, titulo: 'Prensa: salida del responsable de IA de Orange (Steve Jarrett) a Anthropic', editor: 'Prensa especializada', tipo: 'Prensa', fecha: '2026-06', url: 'https://www.boursorama.com/cours/actualites/1rPORA/' },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Christel Heydemann', cargo: 'Consejera delegada', desde: '2022', participacion_pct: 0.003, trayectoria: 'Ingeniera; antes presidenta de Schneider Electric Europa y directiva de Alcatel-Lucent. Consejera delegada desde abril de 2022; llevó el plan «Lead the future» (cumplido) y la consolidación en España. Compró 68.460 acciones a 17,675 € el 20-may-2026 y 14.300 a 13,728 € el 29-sep-2026 [1, 5].' },
      { nombre: 'Laurent Martinez', cargo: 'Director financiero', desde: '2023', participacion_pct: null, trayectoria: 'En el grupo desde hace más de 20 años (finanzas de Orange France y de Orange Business) [1].' },
      { nombre: 'Frédéric Sanchez', cargo: 'Presidente no ejecutivo del consejo', desde: '2026', participacion_pct: null, trayectoria: 'Consejero independiente; presidente desde el 19-may-2026 en sustitución de Jacques Aschenbroich [2].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'EBITDAaL estable o ligeramente al alza; cash-flow orgánico ≥ 3.300 M', real: 'EBITDAaL +2,6 %; cash-flow orgánico 3.600 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'EBITDAaL ligeramente al alza; cash-flow orgánico > 3.300 M', real: 'Cumplidos [7]', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBITDAaL ≈ +3 % (subida en oct-2025); cash-flow orgánico ≥ 3.600 M', real: 'EBITDAaL +3,8 %; cash-flow orgánico 3.653 M [7]', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDAaL ≈ +3 % (feb-2026); > +4 % (jul-2026); cash-flow orgánico ≈ 4.300 M', real: 'Pendiente; 1S26 EBITDAaL +5,0 % [7]', cumplida: 'Parcial' },
    ],
    comentario: 'Heydemann cumplió los objetivos de 2023-2025 del plan «Lead the future» y subió la guía de 2026 en julio [7]. Los directivos compraron acciones a ≈ 13,6-13,9 € entre el 29-sep y el 1-oct, después de la caída; la única venta es de 400 acciones del representante de Bpifrance en el consejo [5]. La salida del responsable de IA a Anthropic en junio de 2026 es un cambio menor fuera del comité ejecutivo [8].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Frédéric Sanchez', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2017', comisiones: 'Gobierno y RSE' },
      { nombre: 'Christel Heydemann', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2022', comisiones: null },
      { nombre: 'Jacques Aschenbroich', cargo: 'Consejero (presidente hasta mayo de 2026)', tipo: 'Independiente', desde: '2022', comisiones: null },
      { nombre: 'Alexandre Bompard', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Estrategia' },
      { nombre: 'Anne-Gabrielle Heilbronner', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría' },
      { nombre: 'Bpifrance Participations (Thierry Sommelet)', cargo: 'Consejero', tipo: 'Dominical', desde: '2015', comisiones: 'Estrategia' },
      { nombre: 'Céline Fornaro', cargo: 'Consejera a propuesta del Estado', tipo: 'Dominical', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Anne Lange', cargo: 'Consejera a propuesta del Estado', tipo: 'Dominical', desde: '2017', comisiones: null },
      { nombre: 'Representantes del personal y de los accionistas empleados (3)', cargo: 'Consejeros', tipo: 'Otro externo', desde: '—', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.16, fijo: 0.90, variable_corto: 1.11, variable_largo: 0.76, ratio_salario_medio: 48 },
    remuneracion: 'Retribución de la consejera delegada en 2025: fijo de 0,90 M, variable anual de 1,11 M, aportación de jubilación (artículo 82) de 0,18 M y acciones de rendimiento valoradas en 0,76 M: 3,16 M en total, ≈ 48 veces el coste medio por empleado [1]. El variable depende del EBITDAaL, del cash-flow orgánico, de la satisfacción de los clientes y de criterios ESG; el plan de largo plazo, del cash-flow orgánico, del rendimiento total frente al sector y del clima [1]. La junta del 19-may-2026 aprobó todas las resoluciones [2].',
    accionistas: [
      { nombre: 'Estado francés (directo) y Bpifrance Participations, de concierto', pct: 20.4, tipo: 'Estado', variacion: 'Del 22,95 % al ≈ 20,4 % tras vender Bpifrance 66,5 M de acciones (≈ 2,5 %) a 16,57 € el 31-jul-2026; ≈ 27 % de los votos [1, 3].' },
      { nombre: 'Grupo Caisse des Dépôts (CDC, sin Bpifrance)', pct: 9.27, tipo: 'Inversor público', variacion: 'Estable [1].' },
      { nombre: 'Empleados (plan de ahorro del grupo)', pct: 8.15, tipo: 'Empleados', variacion: '13,28 % de los votos [1].' },
      { nombre: 'BlackRock', pct: 5.98, tipo: 'Institucional', variacion: 'Cruce al alza del 5 % (19-jun-2026) [4].' },
      { nombre: 'Capital flotante', pct: 62, tipo: 'Institucional y minorista', variacion: 'Estimación (restando Estado, Bpifrance y autocartera) [6].' },
    ],
    insiders: [
      { fecha: '2026-05-20', persona: 'Christel Heydemann', operacion: 'Compra', acciones: 68460, importe: 1.21 },
      { fecha: '2026-08-07', persona: 'Thierry Sommelet (representante de Bpifrance)', operacion: 'Venta', acciones: 400, importe: 0.01 },
      { fecha: '2026-09-29', persona: 'Christel Heydemann', operacion: 'Compra', acciones: 14300, importe: 0.20 },
      { fecha: '2026-09-29', persona: 'Miembros del comité ejecutivo (varios)', operacion: 'Compra', acciones: null, importe: null },
    ],
    control_y_defensas: 'Sin accionista de control, pero el Estado (con Bpifrance) es el primer accionista con ≈ 20 % del capital y ≈ 27 % de los votos gracias a los derechos de voto dobles de la ley Florange [1, 3]. El Estado propone dos consejeras y Bpifrance tiene un puesto [1]. Orange presta servicios de defensa y seguridad nacional: el Estado vigila cualquier cambio de control (decreto de inversiones extranjeras) [1]. Bpifrance vendió el 2,5 % el 31-jul-2026 con un bloqueo de 90 días desde la liquidación del 4-ago, que vence ≈ el 2-nov-2026; le queda el 7,06 % [3].',
    alertas: [
      'Derechos de voto dobles: el Estado y Bpifrance votan con ≈ 27 % con ≈ 20 % del capital [1].',
      'Bloqueo de la venta de Bpifrance que vence ≈ el 2-nov-2026: posible nueva colocación del Estado [3].',
      'Operaciones vinculadas con el Estado (cliente, regulador y accionista) [1].',
    ],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'Porcentaje de voto de la retribución en la junta de 2026', tipo: 'Complemento', intentos: '1) Comunicado de la junta (solo dice que se aprobaron todas); 2) URD 2025 (junta de 2025, no extraída); 3) web de Orange (antibot)', decision: 'Omitido' },
  ],
};

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Euronext París, histórico diario de ORA (FR0000133308-XPAR): cierre del 19-oct-2026 a 14,20 € (subasta de cierre de las 17:35 CEST)', editor: 'Euronext', tipo: 'Datos de mercado', fecha: '2026-10-19', url: U.euronext },
  { id: 2, titulo: 'Yahoo Finance, históricos diarios de ORA.PA, EXSA.DE (STOXX 600) y EXV2.DE (telecomunicaciones europeas) (bolsa.mjs) y movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: U.yahoo },
  { id: 3, titulo: 'Orange: estimaciones de consenso 2026-2028 (16 analistas) y objetivo medio', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: U.ms },
  { id: 4, titulo: 'Fichas quoteSummary de nueve comparables europeos (earningsTrend, financialData, keyStatistics)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/DTE.DE/key-statistics/' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (curva de Svensson, BBSIS): 3,49 % el 19-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Damodaran Online (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Tipos de cambio de referencia del BCE (19-oct-2026) y rendimientos a largo plazo de Francia y Alemania (series IRS mensuales)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.ecb.europa.eu/data/datasets/IRS' },
  { id: 8, titulo: 'OAT a 10 años 4,85 %, Bund 3,43 %, diferencial de 142 pb el 19-oct-2026 (máximo de 146,9 pb el 2-oct)', editor: 'ideal-investisseur.fr', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.ideal-investisseur.fr/' },
  { id: 9, titulo: 'Communiqué résultats du 1er semestre 2026 (deuda neta y guía) y número de acciones a 30-sep-2026', editor: 'Orange SA', tipo: 'Primaria', fecha: '2026-10', url: U.acc },
  { id: 10, titulo: 'Orange unveils «Trust the future» (objetivos 2028)', editor: 'Orange SA (MFN)', tipo: 'Primaria', fecha: '2026-02-19', url: U.ttf },
  { id: 11, titulo: 'Prensa de mercado sobre Orange (Morgan Stanley 18-sep, UBS 12-ago, Berenberg 19-oct, BofA 15-oct, Deutsche Bank 4-oct)', editor: 'Boursorama / Zonebourse / Investing.com', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.boursorama.com/cours/actualites/1rPORA/' },
];
const empresas = [
  { nombre: 'Deutsche Telekom', ticker: 'DTE', pais: 'DE', capitalizacion: 122722, ev_ventas: 2.38, ev_ebitda_ltm: 6.9, ev_ebitda_ntm: null, per_ntm: 10.4, crecimiento_pct: 3.5, margen_ebitda_pct: 34.6, roic_pct: null, dn_ebitda: 3.3, fcf_yield_pct: 14.2 },
  { nombre: 'Telefónica', ticker: 'TEF', pais: 'ES', capitalizacion: 18962, ev_ventas: 1.62, ev_ebitda_ltm: 8.6, ev_ebitda_ntm: null, per_ntm: 8.8, crecimiento_pct: -6.2, margen_ebitda_pct: 18.8, roic_pct: null, dn_ebitda: 5.3, fcf_yield_pct: 20.6 },
  { nombre: 'Vodafone', ticker: 'VOD', pais: 'GB', capitalizacion: 32644, ev_ventas: 1.77, ev_ebitda_ltm: 8.0, ev_ebitda_ntm: null, per_ntm: 10.7, crecimiento_pct: 12.9, margen_ebitda_pct: 22.1, roic_pct: null, dn_ebitda: 4.5, fcf_yield_pct: 18.8 },
  { nombre: 'KPN', ticker: 'KPN', pais: 'NL', capitalizacion: 15462, ev_ventas: 3.80, ev_ebitda_ltm: 9.2, ev_ebitda_ntm: null, per_ntm: 15.5, crecimiento_pct: 2.9, margen_ebitda_pct: 41.2, roic_pct: null, dn_ebitda: 2.9, fcf_yield_pct: 5.1 },
  { nombre: 'Proximus', ticker: 'PROX', pais: 'BE', capitalizacion: 1845, ev_ventas: 1.17, ev_ebitda_ltm: 5.5, ev_ebitda_ntm: null, per_ntm: 6.1, crecimiento_pct: 0.3, margen_ebitda_pct: 21.3, roic_pct: null, dn_ebitda: 3.9, fcf_yield_pct: 17.8 },
  { nombre: 'Swisscom', ticker: 'SCMN', pais: 'CH', capitalizacion: 37589, ev_ventas: 3.44, ev_ebitda_ltm: 11.8, ev_ebitda_ntm: null, per_ntm: 21.9, crecimiento_pct: -1.0, margen_ebitda_pct: 29.1, roic_pct: null, dn_ebitda: 3.8, fcf_yield_pct: 7.9 },
  { nombre: 'Telenor', ticker: 'TEL', pais: 'NO', capitalizacion: 16146, ev_ventas: 3.09, ev_ebitda_ltm: 9.1, ev_ebitda_ntm: null, per_ntm: 13.3, crecimiento_pct: -2.7, margen_ebitda_pct: 33.9, roic_pct: null, dn_ebitda: 2.2, fcf_yield_pct: 5.5 },
  { nombre: 'Telia', ticker: 'TELIA', pais: 'SE', capitalizacion: 16381, ev_ventas: 3.22, ev_ebitda_ltm: 9.9, ev_ebitda_ntm: null, per_ntm: 17.5, crecimiento_pct: 4.1, margen_ebitda_pct: 32.5, roic_pct: null, dn_ebitda: 3.0, fcf_yield_pct: 11.6 },
  { nombre: 'BT Group', ticker: 'BT.A', pais: 'GB', capitalizacion: 24246, ev_ventas: 2.09, ev_ebitda_ltm: 6.3, ev_ebitda_ntm: null, per_ntm: 11.2, crecimiento_pct: -6.0, margen_ebitda_pct: 33.2, roic_pct: null, dn_ebitda: 3.2, fcf_yield_pct: 5.9 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Orange SA', nombre_corto: 'Orange', ticker: 'ORA', isin: 'FR0000133308', mercado: 'Euronext París', indice_referencia: 'CAC 40',
    pais: 'Francia', pais_iso: 'FR', sector: 'Communication Services', industria: 'Integrated Telecommunication Services', sede: 'Issy-les-Moulineaux, Francia', fundacion: '1991', empleados: 123500, web: 'https://www.orange.com',
    precio: 14.20, fecha_precio: '2026-10-19', acciones: 2652.8, capitalizacion_publicada: 37670, free_float_pct: 62,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses; ${(bolsa.volumen_3m.acciones_dia / 1e6).toFixed(1).replace('.', ',')} M de acciones)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de 2026 (28-jul-2026): crecimiento del EBITDAaL por encima del +4 % en base comparable (antes ≈ +3 %), eCAPEX ≈ 15 % de las ventas, cash-flow orgánico ≈ 4.300 M y deuda neta / EBITDAaL de ≈ 2 veces a medio plazo; dividendo de 0,79 € por 2026 [9]. Plan «Trust the future» (19-feb-2026) para 2028: EBITDAaL con crecimiento anual de ≈ 3 % en 2025-2028, eCAPEX ≈ 14 % de las ventas, cash-flow orgánico ≈ 5.200 M, BPA ajustado con crecimiento anual de ≈ 10 % (≈ 1,15 € en 2028 desde 0,86 €) y dividendo mínimo de 0,85 € [10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 45354, ebitda: 14982, ebit: null, bpa: 1.521, dpa: 0.787, fuente: 'MarketScreener, 16 analistas (BPA publicado, con la plusvalía de MasOrange) [3]' },
      { periodo: '2027e', ingresos: 49234, ebitda: 16096, ebit: null, bpa: 1.163, dpa: 0.820, fuente: 'MarketScreener [3]; Yahoo da 1,152 [2]' },
      { periodo: '2028e', ingresos: 50073, ebitda: 16650, ebit: null, bpa: 1.285, dpa: 0.851, fuente: 'MarketScreener [3]' },
    ],
    recomendaciones: { n_analistas: 16, comprar: 10, mantener: 5, vender: 1, po_medio: 18.99, po_min: 15.0, po_max: 22.6 },
    revisiones: 'El EBITDA del consenso es el EBITDAaL de Orange (después de arrendamientos), no el del motor [3]. Los objetivos van de 15,0 € (Morgan Stanley, infraponderar desde el 18-sep) a 22,6 €; media de 18,99 € (+34 %) [3, 11]. En octubre Berenberg (+40 % de recorrido), BofA (posible subida de la guía) y Deutsche Bank recomiendan comprar; UBS la eligió favorita del sector el 12-ago [11]. La mezcla de BPA publicado (con plusvalías y PPA) y ajustado hace que el consenso de BPA no sea comparable año a año.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: -4.4,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, beta: 0.52, posicion_corta_pct: null, comentario: 'La acción cerró a 14,20 € el 19-oct-2026 en Euronext París, un 24,5 % por debajo del máximo de 52 semanas (18,81 € el 20-may-2026) y un 5 % por encima del mínimo (13,49 € el 10-dic-2025) [1, 2]. En 2025 subió un 56 % y en mayo de 2026 tocó máximos de cinco años; desde el 31-jul ha caído un 14,3 %, frente al −1,5 % del STOXX 600, el −1,2 % del sector europeo y el −7,5 % del CAC 40 [2]. A cinco años gana un 15,8 % anual con dividendos, por encima del índice y del sector [2]. La beta frente al STOXX 600 es muy baja (0,29 semanal; 0,52 ajustada): usamos 0,80 en el WACC (ver DCF).', tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 9.41, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 9.28, ev_ebitda_ntm: null, per_ntm: 10.3, excluir: false },
      { anio: '2023', precio_cierre: 10.30, ev_ebitda_ntm: null, per_ntm: 10.8, excluir: false },
      { anio: '2024', precio_cierre: 9.63, ev_ebitda_ntm: null, per_ntm: 11.2, excluir: false },
      { anio: '2025', precio_cierre: 14.20, ev_ebitda_ntm: null, per_ntm: 15.7, excluir: false },
    ],
    comentario: 'Cierres de diciembre de Yahoo [2]. PER adelantado = cierre ÷ BPA ajustado real del ejercicio siguiente (2023: 0,90 €, estimación propia porque Orange empezó a publicar el ajustado con el plan de 2023; 2024: 0,95 €; 2025: 0,86 €; 2026: nuestro 2026e). Excluido 2021 (no hay BPA ajustado de 2022 en el mismo perímetro). Durante 2022-2024 Orange cotizó a 10-11 veces el beneficio siguiente; la subida de 2025 lo llevó a ≈ 15-16 veces.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Operadores integrados europeos de mercados maduros: Deutsche Telekom, Telefónica, Vodafone, KPN, Proximus, Swisscom, Telenor, Telia y BT. Cifras de Yahoo a 19-oct-2026; capitalización en EUR con el cambio del BCE del 19-oct (USD 1,1225; GBP 0,84205; CHF 0,9261; NOK 10,5555; SEK 11,1040) [4, 7]. PER de los próximos 12 meses = 0,2 × BPA 2026e + 0,8 × BPA 2027e (Vodafone y BT, ejercicio a marzo, ponderados). Ninguno tiene la exposición de Orange a África.',
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', comprador: 'Orange', objetivo: 'MasOrange (50 % de Lorca)', ev: 16700, ev_ebitda: 7.3, ev_ventas: 2.2, comentario: 'Fondos propios del 100 % de 8.500 M; valor de empresa y múltiplo estimados con la deuda de MasOrange (3,6 veces) [A11].' },
      { fecha: '2026-06', comprador: 'Orange, Bouygues e Iliad', objetivo: 'SFR', ev: 20350, ev_ebitda: 9.3, ev_ventas: null, comentario: 'Parte de Orange ≈ 5.600 M por ≈ 600 M de EBITDAaL [A12].' },
      { fecha: '2024', comprador: 'Swisscom', objetivo: 'Vodafone Italia', ev: 8000, ev_ebitda: 7.6, ev_ventas: null, comentario: 'Consolidación en Italia.' },
    ],
    comentario: 'Las operaciones recientes de consolidación en Europa se hacen a 7-9 veces el EBITDAaL. A 14,20 € Orange cotiza a ≈ 6,3 veces nuestro EBITDAaL de 2027e con su deuda e híbridos: por debajo de lo que paga por los activos que compra.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'BPA ajustado del consenso (definición de Orange)', tipo: 'Complemento', intentos: '1) MarketScreener (BPA publicado); 2) Yahoo (sin definición); 3) web de Orange (consenso en página bloqueada por antibot)', decision: 'Se usa el publicado y se explica la diferencia' },
  ],
};

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Forum Orange (ORA) de Boursorama, ≈ 40 hilos de septiembre-octubre de 2026', editor: 'Boursorama', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://www.boursorama.com/bourse/forum/1rPORA/' },
  { id: 2, titulo: 'Forum Orange de ABC Bourse', editor: 'ABC Bourse', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.abcbourse.com/forums/' },
  { id: 3, titulo: 'Saxo Banque / Les Echos: «Orange: la peur de Muse» (≈ 11 veces el beneficio de 2026, objetivo de 17 €)', editor: 'Les Echos / Saxo', tipo: 'Prensa', fecha: '2026-10-08', url: 'https://www.lesechos.fr/' },
  { id: 4, titulo: 'Investing.com France: «Orange −10 % en 3 séances»', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://fr.investing.com/equities/france-telecom' },
  { id: 5, titulo: 'CFE-CGC Orange: «Le dividende monte, le cours baisse»', editor: 'CFE-CGC Orange (sindicato)', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://www.cfecgc-orange.org/' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeorando',
    revisadas: [
      { plataforma: 'Boursorama (foro de ORA)', fecha: '2026-10', n_comentarios: 40, tono: 'Dividido', resumen: 'Debates sobre Starlink, los resultados del 27-oct, las notas de Berenberg y BofA, el dividendo a cuenta y el miedo a un crac por la IA; en septiembre muchos esperaban comprar hacia 15,5 € [1].' },
      { plataforma: 'ABC Bourse', fecha: '2026-10', n_comentarios: 5, tono: 'Neutral', resumen: 'Pocos mensajes; el dividendo como soporte [2].' },
      { plataforma: 'Prensa financiera francesa (Les Echos/Saxo, Investing.com)', fecha: '2026-09/10', n_comentarios: 4, tono: 'Negativo', resumen: 'El temor a la guerra de precios por los agentes de compra con IA (Muse de Meta) y la política francesa pesan; la ven barata a ≈ 11 veces [3, 4].' },
      { plataforma: 'CFE-CGC Orange (sindicato de cuadros)', fecha: '2026-10', n_comentarios: 1, tono: 'Negativo', resumen: '«El dividendo sube y la acción baja»: queja por el valor de los planes de los empleados [5].' },
    ],
    temas: [
      { tema: 'Riesgo político y fiscal en Francia', postura: 'Bajista', peso: 'Alto', contraste: 'Real en impuestos (recargo sobre el beneficio de las grandes empresas) y en confianza; el coste de la deuda de Orange depende más de su nota BBB+ que del diferencial de la OAT.' },
      { tema: 'IA y comparadores de tarifas (Muse)', postura: 'Bajista', peso: 'Medio', contraste: 'El churn en Francia es el más bajo del sector; el riesgo es más de precio que de volumen.' },
      { tema: 'Dividendo y consolidación (SFR)', postura: 'Alcista', peso: 'Alto', contraste: 'Dividendo de 0,79 € (5,6 %) y reparto de SFR que dejaría tres operadores en Francia.' },
    ],
    lectura: 'Sentimiento dividido y empeorando desde agosto: los analistas siguen positivos (objetivo medio de 18,99 €) pero foros y prensa francesa mezclan el riesgo país con el miedo a la IA y a Starlink. No hay capitulación: la acción está un 5 % por encima del mínimo de 52 semanas. El foro no aporta riesgos nuevos frente a los del informe.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y X (Twitter) en francés', tipo: 'Complemento', intentos: '1) Reddit r/vosfinances (sin hilos recientes); 2) X (sin acceso); 3) Stocktwits (ORAN sin actividad desde la salida de Nueva York)', decision: 'Omitido' },
  ],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('A-E escritas;', empresas.length, 'comparables');
