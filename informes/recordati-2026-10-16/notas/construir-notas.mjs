// Escribe las notas A-E de Recordati S.p.A. (REC, Euronext Milan; corte 2026-10-16) a partir de los documentos de notas/docs.
// Sin subagentes: las cinco notas las escribe el orquestador. Cada nota cita con [n] de su propia lista.
// Ejecutar: node informes/recordati-2026-10-16/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const B = 'https://dg0hkcpvy5xbq.cloudfront.net/wp-content/uploads';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Integrated Consolidated Financial Statements 2025 (cuentas NIIF 2025 y 2024, notas, segmentos, deuda)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-03-19', url: `${B}/2026/04/01132611/Recordati-Group-Integrated-Consolidated-Financial-Statements-2025.pdf` },
  { id: 2, titulo: 'Integrated Consolidated Financial Statements 2024 (cuentas NIIF 2024 y 2023)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-03-18', url: `${B}/2025/03/28100338/Integrated-Consolidated-Financial-Statements-2024.pdf` },
  { id: 3, titulo: 'Consolidated Financial Statements 2022 (cuentas NIIF 2022 y 2021)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2023-03-16', url: `${B}/2022/12/27103611/consolidated-financial-statement-2022.pdf` },
  { id: 4, titulo: 'Recordati: solid momentum of the group continues first half 2026 (nota de resultados del 1S26 con cuentas resumidas)', editor: 'Recordati S.p.A. (vía BioSpace)', tipo: 'Primaria', fecha: '2026-07-28', url: 'https://www.biospace.com/press-releases/recordati-solid-momentum-of-the-group-continues-first-half-2026-net-revenue-6-6-ebitda-8-8-adjusted-net-income-6-7' },
  { id: 5, titulo: 'Interim Report First Half 2026 (posición financiera neta, autocartera, arrendamientos)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-28', url: `${B}/2026/07/01124804/ENG_Recordati-Group-Interim-report-First-Half-2026_WEB.pdf` },
  { id: 6, titulo: 'Press release: Q1 2026 results', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-05-12', url: `${B}/2026/05/12171324/Press-Release_Q1-2026-Results-FINAL.pdf` },
  { id: 7, titulo: 'Press release: preliminary FY 2025 results and 2026 targets', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-02-17', url: `${B}/2026/02/17165247/Press-Release_FY-2025-Results-FINAL.pdf` },
  { id: 8, titulo: 'Press releases: 9M 2025, H1 2025 y Q1 2025 results (cuentas trimestrales)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-11-11', url: `${B}/2025/11/11184339/Press-Release_9M-2025-Results-FINAL.pdf` },
  { id: 9, titulo: 'H1 2026 results conference call transcript (29-jul-2026)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${B}/2026/07/01115612/Recordati-H1-2026-Results-Transcript.pdf` },
  { id: 10, titulo: 'Q1 2026 results conference call transcript (13-may-2026)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-05-13', url: `${B}/2026/05/14112834/Recordati-Q1-2026-Transcript.pdf` },
  { id: 11, titulo: 'Press release: 2025-2027 three-year plan (objetivos 2027)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-04-28', url: `${B}/2025/04/28174155/Press-Release-2025-2027-3Y-Plan.pdf` },
  { id: 12, titulo: 'Press release: FY 2024 preliminary results (Q1-Q4 2024 por diferencia)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-02-13', url: `${B}/2025/02/13110440/Press-Release_FY-2024-preliminary-results.pdf` },
  { id: 13, titulo: 'H1 2026 results presentation', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${B}/2026/07/29112630/Recordati-H1-2026-results-presentation.pdf` },
];

// Cuenta por función (NIIF). EBITDA = EBIT publicado + amortizaciones y deterioros; los no recurrentes y el «inventory uplift» (NIIF 3)
// van en no_recurrentes_en_ebitda, así el motor llega al EBITDA de la empresa (991,1 M en 2025).
const c = (periodo, ingresos, cv, gg, amort, ebit, rf, bai, imp, bn, gf, nr, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: gg, ebitda: Math.round((ebit + amort) * 10) / 10, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp,
  minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('2021', 1580.1, 427.7, 480.9, 97.6, 490.2, -26.8, 463.3, 77.4, 386.0, 16.7, 14.4, 1.846, 1.10, 209.1),
  c('2022', 1853.3, 566.7, 572.2, 136.7, 437.3, -35.9, 401.4, 89.1, 312.3, 31.3, 98.7, 1.494, 1.15, 209.1),
  c('2023', 2082.3, 659.7, 601.1, 143.0, 558.0, -67.0, 491.0, 101.8, 389.2, 72.5, 68.6, 1.861, 1.20, 209.1),
  c('2024', 2341.6, 741.3, 654.4, 181.4, 638.9, -91.7, 547.2, 130.7, 416.5, 79.0, 45.6, 1.992, 1.27, 209.1),
  c('2025', 2618.4, 830.7, 727.0, 216.2, 670.8, -89.5, 581.3, 137.7, 443.6, 96.4, 104.1, 2.121, 1.34, 209.2),
];

const h = (periodo, at, ac, pc, pt, fc, int, inm, ex, cl, pr, caja, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int, inmovilizado_material: inm,
  existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res,
});
const balanceHist = [
  h('2021', 2816.2, 850.1, 626.4, 1434.6, 553.2, 1138.8, 131.1, 228.7, 307.8, 177.9, 244.6, 969.1, 23.2, 1381.6, 1276.0),
  h('2022', 3998.8, 1186.1, 923.7, 2452.6, 780.1, 1758.2, 159.2, 424.1, 361.9, 224.7, 284.7, 1685.6, 30.8, 1546.2, 1524.1),
  h('2023', 4208.1, 1202.2, 1003.1, 2521.7, 778.4, 1938.2, 178.7, 404.8, 445.2, 264.0, 221.8, 1771.0, 37.9, 1686.4, 1636.5),
  h('2024', 5134.5, 1491.4, 929.1, 3257.6, 797.1, 2513.2, 206.7, 506.4, 516.7, 296.7, 322.4, 2435.6, 48.8, 1876.8, 1818.0),
  h('2025', 5252.3, 1677.9, 1052.7, 3332.5, 795.7, 2393.4, 222.3, 539.8, 570.2, 345.2, 428.8, 2418.3, 49.2, 1919.8, 2009.0),
];

const fl = (periodo, fo, capex, arr, adq, des, div, rec, em) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: rec, emision_acciones: em, intereses_en_financiacion: 0 });
const flujosHist = [
  fl('2021', 491.7, 87.4, 9.2, 0.3, 0.2, 216.7, 101.8, 42.5),
  fl('2022', 461.7, 96.3, 10.2, 673.3, 2.5, 230.6, 52.3, 13.6),
  fl('2023', 485.3, 383.3, 10.2, 0, 3.6, 246.0, 22.7, 30.1),
  fl('2024', 569.9, 69.4, 11.6, 781.7, 6.2, 253.7, 119.0, 92.7),
  fl('2025', 596.9, 85.1, 11.3, 2.7, 6.9, 267.6, 157.1, 44.6),
];

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBITDA', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'completa',
  negocio: {
    segmentos: [
      seg('Specialty & Primary Care', 'Medicamentos de marca con receta y sin receta en Europa, Rusia, Turquía y norte de África (urología, cardiovascular, gastrointestinal, tos y resfriado) más la química farmacéutica; EBITDA del segmento según la empresa (excluye no recurrentes) [1, 2, 3].', [['2021', 1196.2, 422.0], ['2022', 1257.5, 417.7], ['2023', 1367.6, 467.3], ['2024', 1507.7, 524.4], ['2025', 1536.9, 526.5]]),
      seg('Rare Diseases', 'Medicamentos huérfanos de endocrinología (Isturisa, Signifor), hemato-oncología (Enjaymo, Qarziba, Sylvant) y metabolismo (Carbaglu, Panhematin), con red propia mundial y peso creciente de EE. UU. [1, 2, 3].', [['2021', 383.9, 180.3], ['2022', 595.8, 255.0], ['2023', 714.7, 302.4], ['2024', 833.9, 341.3], ['2025', 1081.4, 464.6]]),
    ],
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 19.9 }, { nombre: 'Italia', peso_pct: 12.6 }, { nombre: 'España', peso_pct: 8.6 },
      { nombre: 'Rusia, Ucrania y otros CEI', peso_pct: 7.0 }, { nombre: 'Francia', peso_pct: 6.9 }, { nombre: 'Alemania', peso_pct: 6.7 },
      { nombre: 'Turquía', peso_pct: 4.8 }, { nombre: 'Otros', peso_pct: 33.5 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas de Isturisa (M EUR)', valor_anterior: '113,2 (1S25)', valor_actual: '178,8 (1S26)', variacion: '+58,0 %', comentario: 'Nueva indicación en EE. UU. para todo el síndrome de Cushing (abril de 2025); unos 1.400 pacientes activos netos en EE. UU. a cierre de 2025 [4, 7].' },
      { kpi: 'Ventas de Enjaymo (M EUR)', valor_anterior: '69,4 (1S25)', valor_actual: '91,0 (1S26)', variacion: '+31,1 %', comentario: 'Comprado a Sanofi en noviembre de 2024; 146,3 M en 2025 [4, 7].' },
      { kpi: 'Crecimiento comparable a cambio constante del grupo', valor_anterior: '+8,3 % (2025)', valor_actual: '+9,1 % (1S26)', variacion: '+0,8 pp', comentario: 'Sin Vazkepa, Cardicor ni Inrebic; efecto divisa de −2,6 % en el 1S26 [4, 7].' },
      { kpi: 'Margen EBITDA (empresa)', valor_anterior: '37,8 % (2025)', valor_actual: '38,3 % (1S26)', variacion: '+0,5 pp', comentario: 'Guía 2026 de ≈ 36,5 % por la inversión comercial en EE. UU. en el segundo semestre [4, 9].' },
      { kpi: 'Deuda neta / EBITDA', valor_anterior: '2,1x (dic-25)', valor_actual: '<1,9x (jun-26)', variacion: '−0,2x', comentario: 'Deuda neta de 1.917,1 M EUR con arrendamientos y derivados de cobertura [4, 5].' },
      { kpi: 'Empleados a fin de año', valor_anterior: '4.583 (2024)', valor_actual: '4.693 (2025)', variacion: '+2,4 %', comentario: 'Ventas por empleado de 573,5 miles de EUR [1].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2705.3, ebitda: 979.0, ebit: 759.0, beneficio_neto: 497.2, bpa: 2.38, dpa: 1.34, dpa_extraordinario: 0, fcf: 512, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 56.0 },
    cambios_perimetro: [
      { periodo: '2022', descripcion: 'EUSA Pharma, consolidada desde marzo de 2022 (673 M EUR netos de caja): entra en balance y en 9,5 meses de la cuenta.' },
      { periodo: '2024', descripcion: 'Derechos mundiales de Enjaymo comprados a Sanofi el 29-nov-2024 (781,7 M EUR con existencias): entran en el balance de 2024 y solo un mes en la cuenta.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 557.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 212.7, margen_ebitda_pct: 38.2, bpa: 0.54, vs_consenso: null },
      { periodo: '4T24', ingresos: 598.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 200.1, margen_ebitda_pct: 33.4, bpa: 0.37, vs_consenso: null },
      { periodo: '1T25', ingresos: 680.0, crecimiento_pct: 11.9, crecimiento_organico_pct: 7.2, ebitda: 270.2, margen_ebitda_pct: 39.7, bpa: 0.60, vs_consenso: null },
      { periodo: '2T25', ingresos: 643.9, crecimiento_pct: 11.4, crecimiento_organico_pct: null, ebitda: 226.2, margen_ebitda_pct: 35.1, bpa: 0.44, vs_consenso: null },
      { periodo: '3T25', ingresos: 632.3, crecimiento_pct: 13.4, crecimiento_organico_pct: null, ebitda: 247.6, margen_ebitda_pct: 39.2, bpa: 0.53, vs_consenso: null },
      { periodo: '4T25', ingresos: 662.2, crecimiento_pct: 10.6, crecimiento_organico_pct: null, ebitda: 247.1, margen_ebitda_pct: 37.3, bpa: 0.56, vs_consenso: null },
      { periodo: '1T26', ingresos: 713.4, crecimiento_pct: 4.9, crecimiento_organico_pct: null, ebitda: 283.6, margen_ebitda_pct: 39.7, bpa: 0.73, vs_consenso: null },
      { periodo: '2T26', ingresos: 697.4, crecimiento_pct: 8.3, crecimiento_organico_pct: null, ebitda: 256.6, margen_ebitda_pct: 36.8, bpa: 0.56, vs_consenso: null },
    ],
    ultima_presentacion: 'En la conferencia del 1S26 (29-jul-2026) la dirección repitió el mensaje del 1T: Rare Diseases sostiene el crecimiento (+22,0 % comparable a cambio constante, Isturisa +58 %, Enjaymo +31 %) y Specialty & Primary Care aguanta plano (+0,6 %) pese a la pérdida de la licencia de Cardicor, el fin de algunos concursos de bajo margen en Alemania y una mala campaña de tos y resfriado [9]. El cambio de discurso frente al 1T está en Isturisa: en mayo admitieron una conversión lenta de pacientes inscritos a tratamiento en EE. UU. (bajas por el fin de ayudas del seguro público) y en julio dijeron que las conversiones subieron más de un 20 % sobre el 1T, aunque «es una métrica que tiene que seguir mejorando» [9, 10]. Los analistas preguntaron sobre todo por el margen de Specialty & Primary Care, la reversión del beneficio puntual de Eligard en Turquía (competidor sin existencias) y el tamaño de zilganersen fuera de EE. UU.; la dirección se negó a dar cifras de zilganersen y no aceptó preguntas sobre la OPA de CVC y GBL, remitiendo al folleto [9]. Confirmó la guía de 2026 (ventas 2.730-2.800 M EUR, EBITDA 995-1.030 M, margen ≈ 36,5 %) y los objetivos de 2027 [4, 9].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [
      { anio: '2026', importe: 313.3 }, { anio: '2027', importe: 624.0 }, { anio: '2028', importe: 431.8 },
      { anio: '2029', importe: 442.9 }, { anio: '2030', importe: 379.4 }, { anio: '2031+', importe: 252.2 },
    ],
    liquidez: 'Caja de 391,4 M EUR a 30-jun-2026 (428,8 M a dic-25) y programa de bonos privados con PGIM de hasta 220 M USD, de los que se han emitido 125 M EUR a 10 años [1, 4].',
    rating: 'Sin rating de crédito público (deuda bancaria y colocaciones privadas) [1].',
    coste_deuda_pct: 3.8,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujosHist, confianza: 'Alta' },
  calidad: { auditor: 'EY S.p.A.', anios_auditor: 6, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    politica: 'Dividendo de alrededor del 60 % del beneficio neto ajustado… en la práctica el DPA ha crecido cada año: 1,10 EUR (2021), 1,15, 1,20, 1,27 y 1,34 EUR (2025), con un dividendo a cuenta en noviembre y el complementario en mayo [1, 2, 3]. Recompras para cubrir los planes de opciones y acciones (157 M EUR en 2025). Prioridad declarada para la caja: compras y licencias en enfermedades raras y especialidades sin superar unas 3 veces el EBITDA de deuda neta [1, 11]. Desde el anuncio de la OPA, el folleto exige que no haya dividendos ni recompras hasta el pago de la oferta (condición de medidas defensivas) [P].',
    adquisiciones: [
      { anio: '2019', objetivo: 'Signifor, Signifor LAR e Isturisa (Novartis)', importe: null, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Base de la franquicia de endocrinología: 394,1 M EUR de ventas en 2025 e Isturisa creciendo +58 % en el 1S26 [1, 4].' },
      { anio: '2022', objetivo: 'EUSA Pharma (Qarziba, Sylvant, Fotivda, Caphosol)', importe: 673.3, ev_ebitda: null, financiacion: 'Deuda bancaria', resultado: 'Aportó 136,0 M EUR de ventas en 2022; deterioro de Caphosol de 3,3 M en 2025; Qarziba y Sylvant crecen un 6-7 % en el 1S26 [1, 3, 4].' },
      { anio: '2024', objetivo: 'Derechos mundiales de Enjaymo (Sanofi)', importe: 781.7, ev_ebitda: null, financiacion: 'Préstamos nuevos de 1.092 M EUR en 2024', resultado: '146,3 M EUR de ventas en 2025 (+26,7 % pro forma) y 91,0 M en el 1S26 (+31,1 %); amortización de 35 M al año [1, 4].' },
      { anio: '2025', objetivo: 'Licencias de Vazkepa (Amarin, 59 países) e Inrebic en Japón (BMS)', importe: 33.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Vazkepa: 14,0 M EUR en el 1S26, objetivo de más de 40 M en 2027 y EBITDA positivo desde 2026 [1, 4].' },
      { anio: '2026', objetivo: 'Licencias de mRNA-3927 (Moderna) y zilganersen (Ionis, fuera de EE. UU.)', importe: 46.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'En desarrollo; 50 M USD iniciales más hasta 110 M USD por hitos a Moderna; lectura de datos de mRNA-3927 a finales de 2026 [4, 7].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de cada trimestre', tipo: 'Complemento', intentos: '1) notas de resultados (sin consenso previo); 2) MarketScreener (solo consenso anual vigente); 3) prensa italiana (Websim y Milano Finanza sin cifras de consenso trimestral comparables)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida media de la deuda', tipo: 'Complemento', intentos: '1) nota 21 del informe anual 2025 (solo calendario y tipo medio del 3,80 %); 2) relación semestral 2026; 3) folleto de la OPA (deuda de la sociedad oferente, no del emisor)', decision: 'Omitido' },
  ],
};
A.capital.politica = A.capital.politica.replace('del beneficio neto ajustado… en la práctica', 'del beneficio neto ajustado; en la práctica').replace(' [P].', ' [14].');
fA.push({ id: 14, titulo: 'Offer Document: voluntary totalitarian tender offer by Respighi BidCo S.p.A. on Recordati shares (condiciones, A.1)', editor: 'Respighi BidCo S.p.A. / CONSOB', tipo: 'Primaria', fecha: '2026-07-20', url: `${B}/2026/07/20200006/1.-Offer-Document_ENG.pdf` });
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Integrated Consolidated Financial Statements 2025 (descripción del negocio, historia, productos, sostenibilidad)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-03-19', url: `${B}/2026/04/01132611/Recordati-Group-Integrated-Consolidated-Financial-Statements-2025.pdf` },
  { id: 2, titulo: 'Evaluate releases 2025 Orphan Drug Report: orphan drug sales will continue to rise', editor: 'Manufacturing Chemist', tipo: 'Sectorial', fecha: '2025', url: 'https://manufacturingchemist.com/evaluate-orphan-drug-report-2025' },
  { id: 3, titulo: 'Orphan drugs to make up one fifth of global Rx drug sales by 2030', editor: 'The Pharma Letter', tipo: 'Sectorial', fecha: '2025', url: 'https://www.thepharmaletter.com/orphan-drugs-to-make-up-one-fifth-of-global-rx-drug-sales-by-2030' },
  { id: 4, titulo: 'Global Markets for Orphan Drugs (233.900 M USD en 2023, 415.200 M en 2028)', editor: 'BCC Research', tipo: 'Sectorial', fecha: '2024', url: 'https://www.bccresearch.com/market-research/pharmaceuticals/orphan-drugs-market-report.html' },
  { id: 5, titulo: 'Ipsen: Financial Data Forecasts Estimates (ventas y EBIT 2025)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/IPSEN-5137/finances/' },
  { id: 6, titulo: 'UCB: Financial Data Forecasts Estimates (ventas y EBIT 2025)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://www.marketscreener.com/quote/stock/UCB-5963/finances/' },
  { id: 7, titulo: 'H1 2026 results conference call transcript', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${B}/2026/07/01115612/Recordati-H1-2026-Results-Transcript.pdf` },
  { id: 8, titulo: 'Press release: preliminary FY 2025 results (canal, Isturisa, AIFA, China)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-02-17', url: `${B}/2026/02/17165247/Press-Release_FY-2025-Results-FINAL.pdf` },
  { id: 9, titulo: 'Recordati: solid momentum of the group continues first half 2026', editor: 'Recordati S.p.A. (vía BioSpace)', tipo: 'Primaria', fecha: '2026-07-28', url: 'https://www.biospace.com/press-releases/recordati-solid-momentum-of-the-group-continues-first-half-2026-net-revenue-6-6-ebitda-8-8-adjusted-net-income-6-7' },
  { id: 10, titulo: 'Annual Report 2025, Key Results (peso de los segmentos)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-04', url: 'https://annualreport.recordati.com/key-results/' },
];
const B_ = {
  _estado: 'completa',
  historia: {
    resumen: 'Recordati nace en 1926, cuando Giovanni Recordati convierte la farmacia familiar de Correggio en el «Laboratorio Farmacologico Reggiano»; en 1952 traslada la producción a Milán y en 1963 abre la planta química de Campoverde di Aprilia [1]. Cotiza en la Bolsa de Milán desde 1984 [1]. Su transformación tiene dos ejes: la internacionalización de las especialidades de marca por compras de redes comerciales en Europa, Rusia y Turquía, y la entrada en enfermedades raras con Orphan Europe (2007), la cartera de Lundbeck en EE. UU. (2012), Signifor e Isturisa de Novartis (2019), EUSA Pharma (2022) y Enjaymo de Sanofi (2024) [1]. En diciembre de 2018 la familia vendió el 51,8 % al consorcio de CVC (Rossini), que en 2026 lanzó con GBL una OPA para excluirla de bolsa [1, P].',
    hitos: [
      { anio: '1926', hito: 'Fundación como Laboratorio Farmacologico Reggiano en Correggio [1].' },
      { anio: '1984', hito: 'Salida a la Bolsa de Milán [1].' },
      { anio: '2007', hito: 'Compra de Orphan Europe: entrada en enfermedades metabólicas raras [1].' },
      { anio: '2012', hito: 'Compra de una cartera de medicamentos huérfanos de Lundbeck en EE. UU. [1].' },
      { anio: '2018', hito: 'La familia Recordati vende el 51,8 % (FIMEI) al consorcio de CVC (Rossini) [1].' },
      { anio: '2019', hito: 'Compra de Signifor, Signifor LAR e Isturisa a Novartis: nace la franquicia de endocrinología [1].' },
      { anio: '2021', hito: 'Rob Koremans, primer ejecutivo [1].' },
      { anio: '2022', hito: 'Compra de EUSA Pharma (hemato-oncología rara) [1].' },
      { anio: '2024', hito: 'Compra de los derechos mundiales de Enjaymo a Sanofi [1].' },
      { anio: '2025', hito: 'La FDA amplía Isturisa a todo el síndrome de Cushing endógeno (15-abr-2025) [8].' },
      { anio: '2026', hito: 'OPA de Respighi BidCo (CVC y GBL) a 51,29 EUR, subida a 53,00 EUR el 6 de octubre [P].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Recordati es una farmacéutica internacional con dos negocios. Specialty & Primary Care (58,7 % de las ventas de 2025 [10]) vende medicamentos de marca maduros y licenciados (Zanidip/lercanidipina, Eligard, Urorec, Seloken, Livazo, Vazkepa, Procto-Glyvenol) a médicos especialistas y farmacias de Europa, Rusia y CEI, Turquía y norte de África, con red comercial propia en unos 30 países y socios en el resto [1]. Rare Diseases (41,3 %) vende medicamentos huérfanos en endocrinología (Isturisa para el síndrome de Cushing, Signifor), hemato-oncología (Enjaymo, Qarziba, Sylvant) y metabolismo (Carbaglu), con filiales en Europa, EE. UU., Japón, Latinoamérica y Australia [1]. Tiene diez plantas (siete farmacéuticas y dos de principios activos), más de 150 fabricantes por contrato y unos 4.700 empleados [1].',
    como_gana_dinero: 'El modelo es comprar o licenciar medicamentos ya aprobados o en fase final y exprimirlos con una red comercial muy especializada: Recordati apenas descubre fármacos (I+D sin amortizaciones del 6,3 % de las ventas en 2025 [1]). En Specialty & Primary Care el margen EBITDA del segmento es del 34,3 % [1]: marcas maduras con precio estable, poca inversión y erosión lenta por genéricos que la empresa compensa con licencias nuevas (Vazkepa en 2025). En Rare Diseases el margen es del 43,0 % [1]: pocos pacientes, precios altos, médicos prescriptores concentrados y crecimiento por volumen (diagnóstico y nuevas indicaciones, como Isturisa en EE. UU.). Casi todos los ingresos son recurrentes (tratamientos crónicos); la estacionalidad es baja salvo tos y resfriado. El apalancamiento operativo viene de la mezcla: cada euro de Rare Diseases deja más que uno de primaria.',
    clientes: 'Ningún cliente supera el 10 % de las ventas [1]. Los clientes directos son mayoristas, farmacias hospitalarias y especializadas y, en EE. UU., distribuidores especializados; quien decide es el médico especialista y quien paga, el sistema público o la aseguradora. El poder de precios es dispar: en Europa los precios los fijan las agencias y bajan con los genéricos (Zanidip −6,4 % en 2025 por genéricos en España; acuerdo de 12,8 M EUR con la AIFA por el «payback» de Urorec [1, 8]); en Turquía la empresa sube precios por encima de la devaluación (+34,3 % en moneda local en el 1S26 [7]). En enfermedades raras el precio se sostiene y el crecimiento es de volumen: Isturisa +58 % en el 1S26 por pacientes nuevos en EE. UU. [9].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es doble. Para Rare Diseases, los medicamentos huérfanos con receta en el mundo, que Evaluate estima en una quinta parte de las ventas mundiales de medicamentos con receta en 2030 (≈ 320.000 M USD) [2, 3] y BCC Research en 233.900 M USD en 2023 [4]. Para Specialty & Primary Care, las especialidades de marca maduras en Europa y CEI, sin tamaño publicado fiable con el mismo perímetro. Usamos el de huérfanos porque es el que crece y el que pesa en el beneficio incremental; las dos fuentes difieren en perímetro (BCC incluye más biológicos), así que tomamos la de BCC para la serie y Evaluate para el contraste.',
    tamano: '≈ 233.900 M USD en 2023 (BCC Research) [4]; ≈ 320.000 M USD en 2030 según Evaluate (un quinto de 1,6 billones) [2, 3].',
    unidad_serie: 'millones de USD (BCC Research; 2028e previsión)',
    serie: [ { anio: '2023', tamano: 233900 }, { anio: '2028e', tamano: 415200 } ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 12.2,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Diagnóstico y nuevas indicaciones de medicamentos huérfanos', efecto: '+', horizonte: 'Estructural', evidencia: 'Huérfanos con un TCAC previsto superior al 10 % en 2025-2030 frente al 7,5 % del resto [2]; Isturisa +58 % en el 1S26 tras ampliar la indicación en EE. UU. [9].' },
      { driver: 'Incentivos regulatorios a los huérfanos (exclusividad de 7 años en EE. UU. y 10 en la UE)', efecto: '+', horizonte: 'Estructural', evidencia: 'La Orphan Drug Act de 1983 da exclusividad de mercado, créditos fiscales y ayudas [1].' },
      { driver: 'Genéricos y precios regulados en Europa', efecto: '−', horizonte: 'Estructural', evidencia: 'Zanidip −6,4 % en 2025 por genéricos en España; payback de la AIFA en Italia [1, 8].' },
      { driver: 'Política de precios de EE. UU. (nación más favorecida, aranceles)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los objetivos de 2027 excluyen expresamente el efecto de aranceles y de la nación más favorecida; EE. UU. es el 19,9 % de las ventas [1, 9].' },
      { driver: 'Divisas de mercados emergentes (lira turca, rublo, dólar)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Efecto divisa de −64,2 M EUR (−2,7 %) en 2025 y −34,5 M (−2,6 %) en el 1S26 [8, 9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'En huérfanos, pocos competidores por indicación; en primaria, competencia de genéricos y de otras marcas maduras [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Pagadores públicos que fijan precios y aplican paybacks (AIFA) y aseguradoras de EE. UU. que retrasan las conversiones de Isturisa [7, 8].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Dependencia de licenciantes (Novartis, Sanofi, Amarin, GSK) y de más de 150 fabricantes por contrato; pérdida de la licencia de Cardicor en 2026 [1, 9].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras de exclusividad huérfana, aprobación regulatoria y red médica especializada [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Nuevos fármacos en Cushing, en anemia hemolítica por crioaglutininas y en cáncer de próstata (competidores de Eligard) [7].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda de medicamentos es poco cíclica: en 2020 las ventas de Recordati cayeron solo un 7,6 % por los confinamientos y se recuperaron en 2021 [3 de la nota A no citada aquí]; en 2022 la inflación de costes se compensó con precio en Turquía y con la compra de EUSA. Lo que mueve el ciclo del sector hoy son los múltiplos: el oferente habla de un «deterioro progresivo de las valoraciones de la farmacia europea de especialidades» [P].' },
    regulacion: 'En la UE, la reforma de la legislación farmacéutica reduce la protección regulatoria de los medicamentos nuevos y modula la exclusividad huérfana; en Italia el «payback» obliga a devolver parte del gasto público que supera el techo (acuerdo de 12,8 M EUR por Urorec en 2025) [1, 8]. En EE. UU., la ley de reducción de la inflación (IRA) excluye en parte a los huérfanos de una sola indicación y la administración presiona con la nación más favorecida y aranceles, que los objetivos de 2027 de Recordati excluyen [1, 9]. En China se denegó el reembolso de Isturisa y la filial de enfermedades raras se liquida [1].',
    tendencias: 'Tres tendencias favorecen a Recordati: más diagnóstico de enfermedades raras, licencias de biotecnológicas que no tienen red comercial fuera de EE. UU. (Ionis, Moderna en 2026 [9]) y el traslado de las grandes farmacéuticas fuera de productos pequeños (Enjaymo, de Sanofi). En contra: genéricos en primaria, nuevos competidores en cáncer de próstata y la presión sobre los precios en EE. UU.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Especialista mediano: 1.081 M EUR en enfermedades raras en 2025 [1], muy por debajo de Alexion (AstraZeneca), Sobi o Ipsen, pero líder en sus nichos (Isturisa es el único inhibidor de la síntesis de cortisol oral aprobado para todo el síndrome de Cushing en EE. UU. [8]; Enjaymo el único tratamiento dirigido para la enfermedad por crioaglutininas [1]).',
    competidores: [
      { nombre: 'Ipsen', pais: 'Francia', ticker: 'IPN', ingresos: 3929, cuota_pct: null, margen_ebit_pct: 32.9, comentario: 'Especialidades y raras (oncología, neurociencia, enfermedades raras); margen operativo core [5].' },
      { nombre: 'UCB', pais: 'Bélgica', ticker: 'UCB', ingresos: 7741, cuota_pct: null, margen_ebit_pct: 26.0, comentario: 'Inmunología y neurología con huérfanos (Zilbrysq, Rystiggo); EBIT de MarketScreener [6].' },
      { nombre: 'Sobi (Swedish Orphan Biovitrum)', pais: 'Suecia', ticker: 'SOBI', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Hematología e inmunología raras; compite en hemato-oncología.' },
      { nombre: 'Chiesi', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; enfermedades raras (Chiesi Global Rare Diseases) y respiratorio.' },
      { nombre: 'Crinetics (Palsonify) y Corcept (Korlym)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidores en endocrinología (acromegalia y Cushing) frente a Signifor e Isturisa.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de medicamentos.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Pacientes crónicos estabilizados en tratamiento (Isturisa, Carbaglu, Enjaymo) rara vez cambian [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Exclusividades huérfanas y licencias por producto con fecha de caducidad; en primaria, marcas sin patente que erosionan los genéricos [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen EBITDA del 37,8 % frente al 33 % de margen operativo core de Ipsen [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red comercial en unos 150 países que convierte licencias pequeñas en rentables; Vazkepa EBITDA positivo el primer año [1].' },
      ],
    },
    amenazas: 'Lo que erosiona el foso es la caducidad de cada producto: genéricos de lercanidipina, dutasterida y metoprolol en primaria (ya en marcha), pérdida de licencias (Cardicor en 2026) y competidores nuevos en Cushing y en cáncer de próstata. Probabilidad alta de erosión producto a producto; la defensa es comprar licencias nuevas a buen precio, que con deuda de 1,9 veces el EBITDA y un dueño de capital riesgo depende de la disciplina en el precio.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI ESG Research', calificacion: 'A', fecha: '2026-03' },
      { agencia: 'ISS ESG', calificacion: 'B− (Prime)', fecha: '2026-01' },
      { agencia: 'EcoVadis', calificacion: 'Oro', fecha: '2026-03' },
    ],
    materialidad: 'Los asuntos ESG que tocan las cifras son tres: acceso y precio de los medicamentos (paybacks en Italia, reembolso denegado en China que llevó a liquidar la filial, presión de precios en EE. UU.) [1, 8]; calidad y suministro (más de 150 fabricantes por contrato; un desabastecimiento de un competidor dio a Eligard un beneficio puntual en Turquía [7]); y gobierno con accionista de control, que en 2026 decide una OPA con los independientes en contra del primer precio. Las emisiones (alcances 1 y 2 de 38.740 t CO2e en 2024, objetivo −20 % en 2030) no mueven el valor [1].',
    controversias: 'Acuerdo de 12,8 M EUR con la AIFA en 2025 por el payback de Urorec de ejercicios anteriores [8]; liquidación voluntaria de la filial china de enfermedades raras tras denegarse el reembolso de Isturisa [1]. Sin sanciones relevantes de reguladores en los tres últimos años en los documentos revisados.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de especialidades maduras en Europa y CR5', tipo: 'Complemento', intentos: '1) informe anual 2025 (sin cifra de mercado); 2) IQVIA citado por la empresa (solo crecimiento del mercado relevante); 3) EFPIA y Evaluate (perímetro distinto)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota de mercado', tipo: 'Núcleo', intentos: '1) informe anual 2025 (cuotas por producto no publicadas); 2) presentaciones de resultados (solo índice de evolución 105 de la cartera promocionada); 3) Evaluate y BCC (mercado mundial de huérfanos: cuota del 0,4 %, sin significado)', decision: 'Omitido' },
  ],
};
// citas internas que no existen en B: se corrigen
B_.sector.ciclo.comentario = 'La demanda de medicamentos es poco cíclica: el grupo creció en 2020 y 2022 pese a la pandemia y a la inflación de costes, y en 2022 compensó con precio en Turquía y con la compra de EUSA [1]. Lo que mueve hoy el ciclo del sector son los múltiplos: el oferente justifica su precio por el «deterioro progresivo de las valoraciones de la farmacia europea de especialidades» [11].';
B_.historia.resumen = B_.historia.resumen.replace('[1, P]', '[1, 11]');
B_.historia.hitos[10].hito = 'OPA de Respighi BidCo (CVC y GBL) a 51,29 EUR, subida a 53,00 EUR el 6 de octubre [11].';
fB.push({ id: 11, titulo: 'Press release pursuant to Articles 36 and 43: increase in the consideration of the Offer to Euro 53.00 per share; extension of the acceptance period until 23 October 2026', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-06', url: `${B}/2026/10/06063408/Comunicato-ex-art.-36-e-43_ENG.pdf` });
guarda('B', B_);

// ---------------------------------------------------------------- C. Directivos y gobierno
const fC = [
  { id: 1, titulo: 'Corporate Governance Report and Ownership Structure 2025', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-03-19', url: `${B}/2026/04/01141113/Corporate-Governance-Report-EN-2025.pdf` },
  { id: 2, titulo: 'Report on the Remuneration Policy and the Remuneration Paid 2026', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-03-19', url: `${B}/2026/03/27162003/Recordati_Rem-Report-2026-ENG.pdf` },
  { id: 3, titulo: 'Integrated Consolidated Financial Statements 2025 (consejo, comisiones, auditor)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-03-19', url: `${B}/2026/04/01132611/Recordati-Group-Integrated-Consolidated-Financial-Statements-2025.pdf` },
  { id: 4, titulo: 'Approval of the Issuer’s Statement (art. 103 TUF): el consejo da por justo 51,29 EUR por 6 votos a 4; los cuatro independientes lo juzgan inadecuado', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-15', url: `${B}/2026/07/15232436/press-release-15-july-2026-1.pdf` },
  { id: 5, titulo: 'The Board of Directors unanimously welcomes the increase of the consideration of the voluntary public tender offer', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-10-07', url: `${B}/2026/10/07205832/3.-Recordati-Press-Release-7-October-2026.pdf` },
  { id: 6, titulo: 'Internal dealing 2026: Koremans (29-jul y 7-sep), Andrea Recordati y Arisca (30-jul y 10-sep), La Corte (20/21-ago y 9-oct)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://recordati.com/governance-internal-dealing/' },
  { id: 7, titulo: 'Press release: signing of a sale and purchase agreement concerning approximately 0.66% of the share capital (participaciones de los que actúan de concierto)', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-15', url: `${B}/2026/10/16055908/Comunicato-Acquisti_SPA_-Acquisti-fuori-OPA_ENG.pdf` },
  { id: 8, titulo: 'Press release: preliminary FY 2025 results (objetivos 2026 y cumplimiento de 2025)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-02-17', url: `${B}/2026/02/17165247/Press-Release_FY-2025-Results-FINAL.pdf` },
  { id: 9, titulo: 'Press release: FY 2024 preliminary results and 2025 targets', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-02-13', url: `${B}/2025/02/13110440/Press-Release_FY-2024-preliminary-results.pdf` },
  { id: 10, titulo: 'Offer Document (inversores del consorcio y reinversión de Andrea Recordati)', editor: 'Respighi BidCo S.p.A. / CONSOB', tipo: 'Primaria', fecha: '2026-07-20', url: `${B}/2026/07/20200006/1.-Offer-Document_ENG.pdf` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Robert Koremans', cargo: 'Consejero delegado', desde: '2021', participacion_pct: null, trayectoria: 'Primer ejecutivo desde diciembre de 2021, antes en la dirección de una gran farmacéutica de genéricos y especialidades. Con él las ventas pasaron de 1.580 M EUR (2021) a 2.618 M (2025) y el EBITDA de 602 a 991 M, cumpliendo la guía de 2025 [3, 8]. Acudió a la OPA con 78.426 acciones el 7-sep-2026 [6].' },
      { nombre: 'Andrea Recordati', cargo: 'Presidente', desde: '1998', participacion_pct: null, trayectoria: 'Nieto del fundador, consejero desde 1998 y presidente. Vendió el control a CVC en 2018 y es coinversor del consorcio oferente de 2026 [1, 10]. Ejerció 200.000 opciones a 30,73 EUR el 30-jul-2026 y su sociedad Arisca acudió a la OPA con 122.903 acciones [6].' },
      { nombre: 'Mike McClellan', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero del grupo tras la salida de Luigi La Corte el 22-dic-2025 [3].' },
      { nombre: 'Scott Pescatore', cargo: 'Responsable de Rare Diseases', desde: null, participacion_pct: null, trayectoria: 'Dirige la unidad que crece un 22 % comparable en el 1S26; responsable del lanzamiento de Isturisa en EE. UU. [9 de la nota A].' },
      { nombre: 'Alberto Martinez', cargo: 'Responsable de Specialty & Primary Care', desde: null, participacion_pct: null, trayectoria: 'Dirige el negocio de primaria, con margen del 34 % y la reorganización comercial de Italia y España [3].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Ventas 2.600-2.670 M EUR; EBITDA 970-1.000 M; beneficio neto ajustado 640-670 M [9]', real: 'Ventas 2.618,4 M; EBITDA 991,1 M; beneficio ajustado 651,1 M [8]', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas 2.730-2.800 M EUR; EBITDA 995-1.030 M (≈ 36,5 %); beneficio ajustado 655-685 M [8]', real: 'Confirmada en julio con el 1S26: ventas 1.410,8 M (+6,6 %) y EBITDA 540,2 M (38,3 %) [8]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y creíble en la ejecución: cumplió la guía de 2025 con un efecto divisa en contra de 64 M EUR y la reconfirma en 2026 [8]. El único cambio de la cúpula financiera es el del director financiero en diciembre de 2025. La credibilidad hacia el minoritario es otra cuestión: el primer ejecutivo y el presidente votaron a favor del primer precio de la OPA (51,29 EUR) y el presidente se sienta en los dos lados como coinversor del consorcio [4, 10]. Sin plan de sucesión publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Andrea Recordati', cargo: 'Presidente', tipo: 'Otro externo', desde: '1998', comisiones: '—' },
      { nombre: 'Robert Koremans', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Luigi La Corte', cargo: 'Consejero', tipo: 'Otro externo', desde: '2022', comisiones: '— (ex director financiero hasta dic-25)' },
      { nombre: 'Giampiero Mazza', cargo: 'Consejero', tipo: 'Dominical', desde: '2018', comisiones: '—' },
      { nombre: 'Cathrin Petty', cargo: 'Consejera', tipo: 'Dominical', desde: '2018', comisiones: '—' },
      { nombre: 'Kim Stratton', cargo: 'Consejera', tipo: 'Otro externo', desde: '2021', comisiones: '—' },
      { nombre: 'Diva Moriani', cargo: 'Consejera coordinadora independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Control, riesgos y sostenibilidad (presidenta); Retribuciones y nombramientos' },
      { nombre: 'Joanna Le Couilliard', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Retribuciones y nombramientos (presidenta)' },
      { nombre: 'Piergiorgio Peluso', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Control, riesgos y sostenibilidad' },
      { nombre: 'Stephen Sands', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Control, riesgos y sostenibilidad; Retribuciones y nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.1, voto_remuneracion_contra_pct: 8.8, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 3.08, fijo: 1.06, variable_corto: 0.92, variable_largo: 1.10, ratio_salario_medio: 45 },
    remuneracion: 'El primer ejecutivo cobró en 2025 703.000 EUR fijos, 300.000 EUR por pacto de no competencia, 921.000 EUR de variable anual y 53.000 EUR en especie (1,98 M EUR en total), más 1,10 M EUR de valor razonable de planes en acciones; 44,9 veces la remuneración media del grupo [2]. El variable a largo plazo es el plan de acciones por resultados 2023-2025 (y el nuevo 2026-2028), con métricas de EBITDA, beneficio por acción y rentabilidad total para el accionista; la OPA aceleró el plan en el 2T26 (coste no recurrente) [2, 9 de la nota A]. Hay cláusulas de recuperación. La política de 2025 recibió un 8,8 % de votos en contra [2]. Lo que no gusta: el pacto de no competencia cobra cada año como si fuera fijo.',
    accionistas: [
      { nombre: 'Rossini S.à r.l. (consorcio de CVC)', pct: 46.82, tipo: 'Control (de concierto con el oferente; acciones ya entregadas a la OPA)', variacion: 'Vendió un 5 % en febrero de 2025 a 55,70 EUR [1]' },
      { nombre: 'CVC Capital Partners IX (directo, tras la compra del 15-oct)', pct: 4.16, tipo: 'De concierto con el oferente, más un swap de rendimiento total sobre otro 4,90 %', variacion: 'Compras en bolsa en octubre de 2026 a 53,00 EUR como máximo [7]' },
      { nombre: 'Black Mountain S.à r.l. (GBL)', pct: 3.25, tipo: 'De concierto con el oferente', variacion: 'Compras en 2026 [7]' },
      { nombre: 'FMR LLC (Fidelity)', pct: 4.92, tipo: 'Institucional', variacion: '5,02 % a cierre de 2025; 4,923 % comunicado el 5-feb-2026 [1]' },
      { nombre: 'Autocartera', pct: 2.06, tipo: 'Autocartera', variacion: '4.312.045 acciones a 30-jun-2026 [3]' },
    ],
    insiders: [
      { fecha: '2026-07-29', persona: 'Robert Koremans (consejero delegado)', operacion: 'Venta', acciones: 7745, importe: 0.40 },
      { fecha: '2026-07-30', persona: 'Andrea Recordati (presidente), ejercicio de opciones a 30,73 EUR', operacion: 'Compra', acciones: 200000, importe: 6.15 },
      { fecha: '2026-08-20', persona: 'Luigi La Corte (consejero, ex director financiero)', operacion: 'Venta', acciones: 30000, importe: 1.58 },
      { fecha: '2026-08-21', persona: 'Luigi La Corte (consejero, ex director financiero)', operacion: 'Venta', acciones: 23525, importe: 1.24 },
      { fecha: '2026-09-07', persona: 'Robert Koremans (consejero delegado): acude a la OPA a 51,29 EUR', operacion: 'Venta', acciones: 78426, importe: 4.02 },
      { fecha: '2026-09-10', persona: 'Arisca S.r.l. (Andrea Recordati): acude a la OPA a 51,29 EUR', operacion: 'Venta', acciones: 122903, importe: 6.30 },
      { fecha: '2026-10-09', persona: 'Luigi La Corte: acude a la OPA a 53,00 EUR', operacion: 'Venta', acciones: 37851, importe: 2.01 },
    ],
    control_y_defensas: 'Recordati está controlada por Rossini (consorcio de CVC) con el 46,82 %, bajo su «dirección y coordinación» [1]. En 2026 el propio controlador lanzó con GBL una OPA para excluirla de bolsa, con el presidente Andrea Recordati como coinversor [10]. El consejo dio por justo el primer precio (51,29 EUR) por 6 votos a 4: votaron a favor los consejeros ligados al controlador, el presidente y el primer ejecutivo, y en contra los cuatro independientes con la opinión de Rothschild [4]; tras la subida a 53,00 EUR el consejo la acogió por unanimidad [5]. Una acción, un voto, sin blindajes estatutarios; la defensa del minoritario depende de la umbral del 66,67 % (renunciable por el oferente) y, si se fusiona para excluirla, del derecho de separación [10].',
    alertas: [
      'OPA del accionista de control con el presidente como coinversor: conflicto de interés en el consejo, que aprobó el primer precio con el voto en contra de los cuatro independientes [4, 10].',
      'Directivos y consejeros acudiendo a la OPA y vendiendo en 2026 (primer ejecutivo, presidente, ex director financiero) [6].',
      'Cambio de director financiero en diciembre de 2025 [3].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la remuneración en la junta de 2026', tipo: 'Complemento', intentos: '1) informe de remuneraciones 2026 (solo voto de 2025); 2) web de la junta 2026 (acta no descargada); 3) prensa (sin cifras)', decision: 'Omitido; se usa la junta de 2025' },
    { seccion: 'directivos', campo: 'participación de cada directivo', tipo: 'Complemento', intentos: '1) informe de remuneraciones 2026 (tabla de participaciones sin totales legibles); 2) comunicaciones de internal dealing (operaciones, no saldos); 3) folleto de la OPA (reinversión del presidente sin porcentaje en Recordati)', decision: 'Omitido' },
  ],
};
C.directivos.equipo[3].trayectoria = 'Dirige la unidad que crece un 22 % comparable en el 1S26 y responde en las conferencias por el lanzamiento de Isturisa en EE. UU. [11].';
C.gobierno.remuneracion = C.gobierno.remuneracion.replace('[2, 9 de la nota A]', '[2, 11]');
fC.push({ id: 11, titulo: 'H1 2026 results conference call transcript', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${B}/2026/07/01115612/Recordati-H1-2026-Results-Transcript.pdf` });
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (REC.MI, EXSA.DE, EXV4.DE) hasta el 14-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/REC.MI/history' },
  { id: 2, titulo: 'Recordati: Financial Data Forecasts Estimates (consenso 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/RECORDATI-159075/finances/' },
  { id: 3, titulo: 'Recordati: Consensus (8 analistas, objetivo medio 60,10 EUR)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://www.marketscreener.com/quote/stock/RECORDATI-159075/consensus/' },
  { id: 4, titulo: 'Comparables farmacéuticos europeos a 7-oct-2026 (Stock Analysis y MarketScreener: Galderma, UCB, Ipsen, Faes, Almirall, Rovi), recogidos en el informe de Almirall', editor: 'Stock Analysis / MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-07', url: 'https://stockanalysis.com/quote/epa/IPN/statistics/' },
  { id: 5, titulo: 'Cotizaciones de cierre del 7 y del 14-oct-2026 de GALD.SW, UCB.BR, IPN.PA, FAE.MC, ALM.MC y ROVI.MC (puesta al día de los comparables)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/IPN.PA/history' },
  { id: 6, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS R10XX): 3,45 % el 15-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Interim Report First Half 2026 (deuda, caja, autocartera a 30-jun-2026)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-07-28', url: `${B}/2026/07/01124804/ENG_Recordati-Group-Interim-report-First-Half-2026_WEB.pdf` },
  { id: 9, titulo: 'Press release (arts. 36 y 43): subida del precio de la OPA a 53,00 EUR y prórroga hasta el 23-oct-2026', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-06', url: `${B}/2026/10/06063408/Comunicato-ex-art.-36-e-43_ENG.pdf` },
  { id: 10, titulo: 'Offer Document de Respighi BidCo (valoraciones de Lazard, Rothschild y de los asesores del oferente; condiciones)', editor: 'Respighi BidCo S.p.A. / CONSOB', tipo: 'Primaria', fecha: '2026-07-20', url: `${B}/2026/07/20200006/1.-Offer-Document_ENG.pdf` },
  { id: 11, titulo: 'Integrated Consolidated Financial Statements 2022 y 2024 (compras de EUSA Pharma y Enjaymo)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2025-03-18', url: `${B}/2025/03/28100338/Integrated-Consolidated-Financial-Statements-2024.pdf` },
  { id: 12, titulo: 'Press release: preliminary FY 2025 results (Enjaymo +26,7 % pro forma)', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-02-17', url: `${B}/2026/02/17165247/Press-Release_FY-2025-Results-FINAL.pdf` },
  { id: 13, titulo: 'Recordati, Cvc rilancia il prezzo a 53 euro dopo le contestazioni e proroga l’opa al 23 ottobre (Equita: comprar, objetivo 69 EUR)', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.milanofinanza.it/news/recordati-cvc-rilancia-il-prezzo-a-53-euro-dopo-le-contestazioni-e-proroga-l-opa-al-23-ottobre-202610060806567956' },
  { id: 14, titulo: 'OPA Recordati: prezzo a 53 euro, adesioni e scadenza (adhesiones al 12-oct según Borsa Italiana)', editor: 'Rankia Italia', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://rankia.it/opa-recordati/' },
  { id: 15, titulo: 'Press release (art. 41): compras de CVC del 15-oct-2026 a 52,98-53,00 EUR', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-15', url: `${B}/2026/10/15200232/Comunicato-Acquisti-ex-art.-41_c.-2_lett.-c_ENG-6.pdf` },
  { id: 16, titulo: 'Press release: compra por CVC de un 0,66 % fuera de la OPA a 53,00 EUR', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-15', url: `${B}/2026/10/16055908/Comunicato-Acquisti_SPA_-Acquisti-fuori-OPA_ENG.pdf` },
  { id: 17, titulo: 'Financial calendar: consejo de los nueve meses el 10-nov-2026 y conferencia el 11-nov-2026', editor: 'Recordati S.p.A.', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://recordati.com/investor-events/' },
  { id: 18, titulo: 'Press release (art. 36): obtención de las autorizaciones de competencia, FDI y FSR', editor: 'Respighi BidCo S.p.A. (vía Recordati)', tipo: 'Primaria', fecha: '2026-10-07', url: `${B}/2026/10/07205048/1.-Comunicato-ex-art.-36_ENG.pdf` },
  { id: 19, titulo: 'Recordati, consorzio CVC-GBL lancia OPA per delisting a 51,29 euro per azione', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-05-22', url: 'https://www.teleborsa.it/AMP/News/2026/05/22/recordati-consorzio-cvc-gbl-lancia-opa-per-delisting-a-51-29-euro-per-azione-11.html' },
  { id: 20, titulo: 'Recordati, Intermonte boccia l’opa low cost', editor: 'Milano Finanza', tipo: 'Prensa', fecha: '2026-05-26', url: 'https://www.milanofinanza.it/news/recordati-intermonte-boccia-l-opa-low-cost-2705411' },
];
const r = bolsa.bolsa;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Recordati Industria Chimica e Farmaceutica S.p.A.', nombre_corto: 'Recordati', ticker: 'REC', isin: 'IT0003828271', mercado: 'Euronext Milan (Borsa Italiana)', indice_referencia: 'FTSE MIB / STOXX Europe 600',
    pais: 'Italia', pais_iso: 'IT', sector: 'Salud', industria: 'Productos farmacéuticos', sede: 'Milán', fundacion: '1926', empleados: 4693, web: 'https://recordati.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 209.0, capitalizacion_publicada: null, free_float_pct: 45.6,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses)`, proximos_resultados: '2026-11-10',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 2792, ebitda: 1017, ebit: 842.6, bpa: 2.467, dpa: 1.524, fuente: 'MarketScreener, 8 analistas [2]' },
      { periodo: '2027e', ingresos: 3028, ebitda: 1146, ebit: 953.4, bpa: 3.024, dpa: 1.682, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 3224, ebitda: 1240, ebit: 1050, bpa: 3.538, dpa: 1.795, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: null, mantener: null, vender: null, po_medio: 60.10, po_min: 51.30, po_max: 71.00 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: r.tipo_rentabilidad,
    rentabilidades: r.rentabilidades,
    anual: r.anual.filter((x) => x.anio >= '2017'),
    beta: r.beta, volatilidad_pct: r.volatilidad_pct, max_drawdown_pct: r.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: bolsa.cierres_ejercicio.filter((x) => x.anio >= '2021').map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Galderma', ticker: 'GALD', pais: 'CH', capitalizacion: 42518, ev_ventas: null, ev_ebitda_ltm: 34.7, ev_ebitda_ntm: 24.2, per_ntm: 38.9, crecimiento_pct: 19.3, margen_ebitda_pct: 24.7, roic_pct: 10.28, dn_ebitda: 1.27, fcf_yield_pct: 2.2 },
      { nombre: 'UCB', ticker: 'UCB', pais: 'BE', capitalizacion: 38191, ev_ventas: null, ev_ebitda_ltm: 14.4, ev_ebitda_ntm: 11.7, per_ntm: 17.2, crecimiento_pct: 11.4, margen_ebitda_pct: 34.7, roic_pct: 15.03, dn_ebitda: 0.99, fcf_yield_pct: 4.0 },
      { nombre: 'Ipsen', ticker: 'IPN', pais: 'FR', capitalizacion: 11798, ev_ventas: null, ev_ebitda_ltm: 6.5, ev_ebitda_ntm: 5.9, per_ntm: 11.7, crecimiento_pct: 7.5, margen_ebitda_pct: 38.8, roic_pct: 23.16, dn_ebitda: -0.61, fcf_yield_pct: 10.6 },
      { nombre: 'Faes Farma', ticker: 'FAE', pais: 'ES', capitalizacion: 1550, ev_ventas: null, ev_ebitda_ltm: 13.8, ev_ebitda_ntm: 11.0, per_ntm: 14.7, crecimiento_pct: 12.6, margen_ebitda_pct: 20.1, roic_pct: 8.57, dn_ebitda: 2.31, fcf_yield_pct: 4.1 },
      { nombre: 'Almirall', ticker: 'ALM', pais: 'ES', capitalizacion: 2177, ev_ventas: null, ev_ebitda_ltm: 8.7, ev_ebitda_ntm: 7.3, per_ntm: 20.1, crecimiento_pct: 6.5, margen_ebitda_pct: 21.9, roic_pct: 3.0, dn_ebitda: -0.2, fcf_yield_pct: 3.4 },
      { nombre: 'Rovi', ticker: 'ROVI', pais: 'ES', capitalizacion: 3022, ev_ventas: null, ev_ebitda_ltm: 14.6, ev_ebitda_ntm: 12.4, per_ntm: 18.1, crecimiento_pct: 11.1, margen_ebitda_pct: 27.3, roic_pct: 16.95, dn_ebitda: -0.1, fcf_yield_pct: 6.0 },
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-10', objetivo: 'Recordati (OPA de exclusión, precio final 53,00 EUR)', comprador: 'Respighi BidCo (CVC Fund IX, GBL y coinversores)', ev: 12793, ev_ventas: 4.73, ev_ebitda: 12.4, prima_pct: 16.6, excluir: false, comentario: 'Estimación propia: 53,00 EUR × 204,8 M acciones en circulación + deuda neta de 1.917 M y 21 M de pensiones a 30-jun-26, sobre ventas y EBITDA de los últimos 12 meses (2.705 y 1.035 M). Prima del 16,6 % sobre el precio no alterado del 25-mar-2026 [9, 8].' },
      { fecha: '2024-11', objetivo: 'Derechos mundiales de Enjaymo (sutimlimab)', comprador: 'Recordati', ev: 781.7, ev_ventas: 6.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '825 M USD iniciales más hitos de hasta 250 M USD; 781,7 M EUR pagados con existencias. Ventas 2024 pro forma de ≈ 115 M EUR (estimación propia: 146,3 M de 2025 ÷ 1,267) [11, 12].' },
      { fecha: '2022-03', objetivo: 'EUSA Pharma (Qarziba, Sylvant, Fotivda, Caphosol)', comprador: 'Recordati', ev: 673.3, ev_ventas: 4.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago neto de caja de 673,3 M EUR; ventas anualizadas de ≈ 170 M (estimación propia: 136,0 M en 9,5 meses de 2022) [11].' },
    ],
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 2260.7, arrendamientos: 49.2, caja: 391.4, minoritarios: 0, pensiones: 16.0, asociadas: 0, otros_ajustes: -1.4 },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'reparto de recomendaciones (comprar, mantener, vender)', tipo: 'Complemento', intentos: '1) MarketScreener (solo «Outperform» medio, sin recuento); 2) Investing (página no accesible sin JavaScript); 3) prensa italiana (recomendaciones sueltas: Equita comprar 69 EUR, Intermonte no acudir)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) CONSOB, posiciones cortas netas (sin publicación ≥ 0,5 % localizada); 2) Stock Analysis (no da cortos de Milán); 3) prensa (sin datos)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de EV/EBITDA de compras de terceros en enfermedades raras', tipo: 'Complemento', intentos: '1) notas de las compras de Chiesi-Amryt y Alfasigma-Intercept (sin EBITDA publicado); 2) folleto de la OPA (operaciones comparables de los asesores, sin desglose por operación); 3) prensa (múltiplos de ventas sin fuente primaria)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'OPA Recordati: prezzo a 53 euro, adesioni e scadenza', editor: 'Rankia Italia', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://rankia.it/opa-recordati/' },
  { id: 2, titulo: 'Recordati, CVC rilancia l’Opa a 53 euro per azione. Cosa fare?', editor: 'Altroconsumo', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://www.altroconsumo.it/investi/investire/azioni/news/recordati-opa-cvc-rilancio' },
  { id: 3, titulo: 'Recordati, Cvc rilancia il prezzo a 53 euro dopo le contestazioni (Palliser pide 60 EUR)', editor: 'Milano Finanza', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.milanofinanza.it/news/recordati-cvc-rilancia-il-prezzo-a-53-euro-dopo-le-contestazioni-e-proroga-l-opa-al-23-ottobre-202610060806567956' },
  { id: 4, titulo: 'Recordati - La continua execution rafforza il valore standalone di lungo termine', editor: 'Websim', tipo: 'Foros y redes', fecha: '2026-07-29', url: 'https://www.websim.it/azioni/blue-chip/recordati-la-continua-execution-rafforza-il-valore-standalone-di-lungo-termine-20260729073312/' },
  { id: 5, titulo: 'Recordati - OPA Respighi: prezzo inadeguato per gli Amministratori Indipendenti', editor: 'Websim', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://www.websim.it/azioni/blue-chip/recordati-opa-respighi-prezzo-inadeguato-per-gli-amministratori-indipendenti/' },
  { id: 6, titulo: 'OPA su Recordati: CVC e GBL alzano a 53 euro e prorogano i tempi', editor: 'SoldiOnline', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.soldionline.it/notizie/azioni-italia/opa-su-recordati-cvc-e-gbl-alzano-a-53-euro-e-prorogano-i-tempi' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Rankia Italia (artículo y comentarios)', fecha: '2026-10', n_comentarios: 5, tono: 'Neutro', resumen: 'Explica la OPA y las adhesiones; la discusión es si conviene acudir a 53 EUR o arriesgarse a quedar en minoría; recuerda que el 50,39 % de adhesiones incluye el 46,82 % de Rossini [1].' },
      { plataforma: 'Altroconsumo (guía para el ahorrador)', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'Plantea al particular la elección entre acudir y quedarse; el tono es de resignación ante un precio «definitivo» [2].' },
      { plataforma: 'Milano Finanza (prensa con debate de minoritarios)', fecha: '2026-10', n_comentarios: 0, tono: 'Negativo', resumen: 'Recoge la carta del fondo activista Palliser (precio justo de al menos 60 EUR) y la presión de minoritarios que forzó la subida [3].' },
      { plataforma: 'Websim (comentario de bróker e independientes)', fecha: '2026-07', n_comentarios: 0, tono: 'Positivo', resumen: 'Tras el 1S26, «la ejecución continua refuerza el valor independiente a largo plazo»; los independientes juzgaron inadecuado el precio inicial [4, 5].' },
      { plataforma: 'SoldiOnline', fecha: '2026-10', n_comentarios: 0, tono: 'Neutro', resumen: 'Calendario de la OPA tras la prórroga: fin el 23-oct, pago el 2-nov, reapertura del 3 al 9-nov [6].' },
    ],
    temas: [
      { tema: 'Precio de la OPA demasiado bajo', postura: 'Bajista', peso: 'Alto', contraste: 'Los rangos DCF de los expertos de los independientes (Rothschild 52,01-61,25 EUR) y del consejo (Lazard 51,44-61,41 EUR) quedan por encima o alrededor de 53 EUR; nuestro valor intrínseco también. Tienen razón en que el precio no paga el control con holgura (prima del 16,6 %).' },
      { tema: 'Acudir o quedarse en minoría tras la exclusión', postura: 'Dividida', peso: 'Alto', contraste: 'Si el oferente supera el 66,67 % puede fusionar y excluir la acción; quedarse da derecho de separación pero sin liquidez. Lo recoge la sección de riesgos.' },
      { tema: 'Calidad del negocio (Isturisa, Enjaymo)', postura: 'Alcista', peso: 'Medio', contraste: 'Coincide con los datos: Rare Diseases +22 % comparable en el 1S26.' },
    ],
    lectura: 'El debate no es sobre el negocio, que casi todos ven bien, sino sobre la OPA: si 53 EUR es justo y si conviene acudir. El sentimiento contradice al consenso de analistas en el objetivo (60,10 EUR de media) solo en apariencia: los particulares saben que, con una OPA «definitiva» y el control asegurado, el precio de mercado ya no lo fija el valor intrínseco. No anticipa un riesgo que el informe no tenga. Sin acceso a foros de particulares con mensajes (FinanzaOnline da 403), la confianza es baja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros de particulares', tipo: 'Complemento', intentos: '1) FinanzaOnline (403); 2) Reddit y Stocktwits (bloqueados o sin símbolo de Milán); 3) Investing.com Italia (requiere JavaScript)', decision: 'Prensa con debate y comentarios de Rankia en su lugar' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas.');
