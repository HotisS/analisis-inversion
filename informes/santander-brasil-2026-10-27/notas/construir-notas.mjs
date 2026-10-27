// Escribe las notas A-E de Santander Brasil (unit SANB11 en B3, corte 2026-10-27, precio de cierre del 26-oct-2026) a partir
// de: datos abiertos de la CVM (DFP 2021-2025 e ITR 2026, NIIF consolidadas), Informe de Resultados del 2T26 y presentaciones
// del 1T25-1T26 (BR GAAP gerencial), 20-F 2025 y 6-K/425 en la SEC (oferta de canje de la matriz), bolsa.json,
// yahoo-datos.json y prensa. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/santander-brasil-2026-10-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1471055';
const MZ = 'https://api.mziq.com/mzfilemanager/v2/d/a2595886-9fbb-4339-8a38-71d6ce7c7d36';
const U = 3744; // units equivalentes: 7.488 M de acciones en circulación (2T26) ÷ 2 (1 unit = 1 ON + 1 PN)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Informe de Resultados do 2º trimestre de 2026 (BRGAAP): resultado gerencial, ROAE, PDD, morosidad, capital, balance, reconciliación contable-gerencial', editor: 'Banco Santander (Brasil) S.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${MZ}/5395e890-a68c-8c25-7c30-399ec6928c53?origin=2` },
  { id: 2, titulo: 'Apresentação de resultados 1T26 (BRGAAP)', editor: 'Banco Santander (Brasil) S.A.', tipo: 'Primaria', fecha: '2026-04-29', url: `${MZ}/227b8257-7fe0-6666-8706-75a5b5ccbb7b?origin=2` },
  { id: 3, titulo: 'Datos abiertos de la CVM: DFP 2021, 2023 y 2025 e ITR 2026 de BCO SANTANDER (BRASIL) S.A. (CD_CVM 020532), estados consolidados NIIF', editor: 'Comissão de Valores Mobiliários (dados.cvm.gov.br)', tipo: 'Primaria', fecha: '2026-10-25', url: 'https://dados.cvm.gov.br/dataset/cia_aberta-doc-dfp' },
  { id: 4, titulo: 'Form 20-F 2025: accionistas (Item 7), dividendos y JCP (Item 8), consejo y dirección (Item 6), auditor, oferta de canje de 2014', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000129281426000592/bsbrform20f_2025.htm` },
  { id: 5, titulo: 'Santander (SANB11) lucra R$ 4,1 bi no 4º trimestre, alta anual de 6 % (ROAE 17,6 %, receita total 21.086 M)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://www.infomoney.com.br/mercados/santander-sanb11-resultados-quarto-trimestre-2025/' },
  { id: 6, titulo: 'Santander Brasil reporta lucro recorrente de R$ 4,08 bilhões no 4T25 (15,6 mil M en 2025, +12,6 %)', editor: 'Finance News', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://financenews.com.br/2026/02/santander-brasil-sanb11-reporta-lucro-recorrente-de-r-408-bilhoes-no-4t25/' },
  { id: 7, titulo: 'Santander Brasil se recupera e lucra R$ 13,87 bilhões em 2024 (+50,2 % sobre 2023)', editor: 'Jornal de Brasília', tipo: 'Prensa', fecha: '2025-02-05', url: 'https://jornaldebrasilia.com.br/noticias/economia/santander-brasil-se-recupera-e-lucra-de-r-1387-bilhoes-em-2024/' },
  { id: 8, titulo: 'Santander (SANB11) lucra R$ 1,69 bi no 4º trimestre de 2022 (12,9 mil M en 2022, −21 %; ROE 16,3 %)', editor: 'InfoMoney', tipo: 'Prensa', fecha: '2023-02-02', url: 'https://www.infomoney.com.br/mercados/santander-sanb11-lucra-r-169-bi-no-4o-trimestre-de-2022-queda-de-46-e-bem-abaixo-do-consenso-de-mercado/' },
  { id: 9, titulo: 'Santander Brasil fecha 2021 com lucro de R$ 16,347 bilhões (ROAE 21,2 %)', editor: 'Jornal do Comércio', tipo: 'Prensa', fecha: '2022-02-02', url: 'https://www.jornaldocomercio.com/_conteudo/economia/2022/02/amp/831617-santander-brasil-fecha-2021-com-lucro-de-r-16-347-bilhoes-alta-de-7-ante-2020.html' },
  { id: 10, titulo: 'Apresentação de resultados 3T25 y 2T25 (BRGAAP)', editor: 'Banco Santander (Brasil) S.A.', tipo: 'Primaria', fecha: '2025-10-29', url: `${MZ}/e1e31906-eec6-2833-1688-123f3df14a21?origin=1` },
  { id: 11, titulo: 'Acta del consejo del 9-oct-2026 y aviso a los accionistas: JCP de 1.500 M (0,401 BRL por unit; registro 20-oct, pago 9-nov); composición de la unit', editor: 'Banco Santander (Brasil) S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-09', url: `${ED}/000129281426004890/bsbr20261009_6k.htm` },
];

// Cuenta NIIF (CVM) 2021-2025 adaptada al motor: «ingresos» = resultado antes de impuestos − participadas + gastos de personal,
// otros gastos administrativos y amortización = ingresos operativos netos de pérdidas por deterioro de activos financieros
// (margen bruto de intermediación + comisiones netas + resultados de activos y pasivos financieros + cambio − pérdidas por
// deterioro − provisiones − otros); «gastos_generales» = personal + administrativos + amortización; ebit = ebitda.
const filas = [
  // periodo, BAI, participadas, personal, otros admin, amort. tangible, amort. intangible, impuestos, minoritarios, beneficio atribuido, dpa por unit
  ['2021', 24750, 144, 9026, 8291, 1851, 583, 9191, 31, 15528, null],
  ['2022', 19575, 199, 9897, 8343, 1860, 725, 5235, 52, 14287, null],
  ['2023', 11922, 239, 10814, 8749, 1842, 899, 2423, 49, 9449, r2(6200 / U)],
  ['2024', 19190, 313, 11598, 8819, 1586, 1145, 5776, 48, 13366, r2(6000 / U)],
  ['2025', 16729, 458, 11699, 9239, 1087, 1539, 3764, 199, 12766, r2(7620 / U)],
];
const cuenta = filas.map(([p, bai, part, pers, adm, at, ai, imp, min, bn, dpa]) => {
  const gg = pers + adm + at + ai;
  const ebit = bai - part;
  return { periodo: p, ingresos: ebit + gg, coste_ventas: null, gastos_generales: gg, ebitda: ebit, amortizaciones: 0, ebit, resultado_financiero: part, bai, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(bn / U), dpa, dpa_extraordinario: dpa == null ? null : 0, acciones_diluidas: U };
});
// Balance NIIF (CVM): activo total, pasivo exigible (activo − patrimonio consolidado), patrimonio atribuido, minoritarios, intangible
// (incluye el fondo de comercio de Banco Real). Caja y deuda a 0 a propósito (banco: la caja es encaje y liquidez regulatoria).
const filasBal = [
  ['2021', 931208, 825234, 105640, 334, 30787],
  ['2022', 985451, 874771, 110183, 497, 31603],
  ['2023', 1115653, 1000797, 114453, 403, 32376],
  ['2024', 1238797, 1118970, 119492, 335, 32827],
  ['2025', 1270029, 1143476, 125174, 1380, 33227],
];
const balance = filasBal.map(([p, at, pt, pn, mi, intg]) => ({ periodo: p, activo_total: at, activo_corriente: null, pasivo_corriente: null, pasivo_total: pt, fondo_comercio: 0, intangibles: intg, inmovilizado_material: null, existencias: 0, clientes: 0, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: pn, minoritarios: mi, reservas: null }));
const DIVS = { 2021: null, 2022: null, 2023: 6200, 2024: 6000, 2025: 7620 }; // declarados (JCP y dividendos) [4]
const flujos = cuenta.map((c) => ({ periodo: c.periodo, flujo_operativo: c.beneficio_neto, capex: 0, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: DIVS[c.periodo], recompras: null, emision_acciones: 0, intereses_en_financiacion: 0 }));

// Trimestres (BR GAAP gerencial): receita total y resultado gerencial recurrente [1, 2, 5, 10]
const tq = [['1T25', 21058, null, 3861], ['2T25', 20600, 19933, 3659], ['3T25', 20760, 20561, 4009], ['4T25', 21086, 21495, 4086], ['1T26', 21248, 21058, 3788], ['2T26', 20675, 20600, 3014]];
const trim = tq.map(([p, ing, ingA, bn]) => ({ periodo: p, ingresos: ing, crecimiento_pct: ingA ? r1(100 * (ing / ingA - 1)) : null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(bn / U), vs_consenso: p === '2T26' ? 'Inferior' : p === '1T26' ? 'Inferior' : p === '4T25' ? 'En línea' : null }));

const A = {
  _estado: 'Completa. Serie anual NIIF de los datos abiertos de la CVM (DFP 2021-2025) adaptada al formato del motor; resultados recientes, ROAE, capital y riesgo en BR GAAP gerencial (Informe de Resultados del 2T26). Sin 3T26: se publica el 28-oct, un día después del corte.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM dic-25 (NIIF)', fecha_fin: '2025-12-31', ingresos: cuenta[4].ingresos, ebitda: cuenta[4].ebit, ebit: cuenta[4].ebit, beneficio_neto: 12766, bpa: r2(12766 / U), dpa: r2(7620 / U), dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'En NIIF (CVM) el beneficio atribuido fue de 15.528 M BRL en 2021, 14.287 M en 2022, 9.449 M en 2023, 13.366 M en 2024 y 12.766 M en 2025: cuatro años sin crecer [3]. Los ingresos operativos netos de pérdidas por deterioro bajaron de 44.357 M a 39.835 M, porque las pérdidas por deterioro de activos financieros subieron de 17.113 M a 29.540 M (+73 %) mientras el margen bruto de intermediación pasaba de 51.318 M a 57.634 M [3]. Los gastos de personal, administrativos y amortización crecieron un 4,5 % anual (19.751 M → 23.564 M) [3]. En la base gerencial que sigue el mercado (BR GAAP), el resultado recurrente fue de 16.347 M en 2021, ≈ 12.900 M en 2022, ≈ 9.240 M en 2023, 13.872 M en 2024 y 15.615 M en 2025, con ROAE del 21,2 %, 16,3 %, ≈ 12 %, ≈ 17 % y ≈ 17,3 % [5-9]. **2026 se ha torcido**: 3.788 M en el 1T26 y 3.014 M en el 2T26 (−17,6 % interanual, ROAE del 12,5 %), por un resultado de PDD de 7.654 M (+20,6 % en el trimestre: pymes, agro, segmento masivo, casos de mayorista y el cambio de la regla de baja a fallidos) y una eficiencia que empeora al 39,3 % [1].',
    ajustes: 'Dos bases. Las cuentas oficiales (CVM, 20-F) son NIIF; el banco gestiona y el mercado sigue el resultado gerencial recurrente en BR GAAP, que (i) reclasifica la cobertura cambiaria de las inversiones en el exterior desde impuestos al margen, (ii) mueve recuperaciones y descuentos entre margen y PDD, (iii) devuelve la amortización del fondo de comercio (56 M en el 2T26) y (iv) quita extraordinarios: en el 2T26, 291 M de provisión laboral no recurrente (contable 2.667 M, gerencial 2.723 M, recurrente 3.014 M) [1]. El patrimonio NIIF (125.174 M a dic-2025) es ≈ 27.000 M mayor que el BR GAAP (98.210 M a jun-2026) sobre todo por el fondo de comercio de la compra de Banco Real (2008), que en NIIF sigue en el intangible (33.227 M) [1, 3]. El BPA y el ROE de la regla a 12 meses y del modelo bancario son gerenciales recurrentes, por unit (1 ON + 1 PN; 3.744 M de units equivalentes) [1, 11].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trim,
    ultima_presentacion: 'En el 2T26 (29-jul-2026, primer resultado presentado ya con Gilson Finkelsztain como consejero delegado) el resultado recurrente fue de 3.014 M BRL (−20,4 % en el trimestre y −17,6 % en el año) y el ROAE del 12,5 %, muy por debajo de lo esperado; la unit cayó un 7,4 % ese día [1]. Causas: PDD de 7.654 M (+20,6 %; coste del crédito a 12 meses del 3,81 %) por pymes, agro y segmento masivo, refuerzos de provisión en casos de mayorista y el cambio de criterio de baja a fallidos; margen con clientes −3,2 % por la retirada del segmento masivo (diferencial del 10,03 %, −0,39 puntos); comisiones −1,9 %; eficiencia del 39,3 % [1]. La cartera ampliada crece un 5,8 % interanual (715.000 M) con financiación al consumo +15,3 % y pymes +11,5 %, y cae en consignado (−14,7 %) y crédito personal (−8,6 %) [1]. En el 1T26 (29-abr) el resultado ya había quedado por debajo del consenso (3.788 M, ROAE del 16,0 %) [2]. El 30-jul, un día después, la matriz anunció la oferta de canje por los minoritarios, y el debate de los analistas pasó del ROE a la oferta [D].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Captación de clientes de 688.514 M en jun-2026 (+6,9 % interanual), 51 % de particulares; cartera de crédito sobre captación de clientes neta de encajes (C/B) del 83,3 % [1].',
    rating: 'Grado especulativo, limitado por el techo soberano de Brasil (no se ha leído la nota vigente de las agencias)',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Capital en jun-2026: CET1 del 11,2 % (11,6 % un año antes), Tier 1 del 12,2 % y Basilea del 15,3 %, con un mínimo regulatorio de CET1 con colchones del 8,0 % y Tier 1 del 9,5 % [1, 4]. Activos ponderados por riesgo de 773.911 M (+7,5 %), de los que 92.832 M de riesgo operacional (+26,9 %) [1]. Cobertura de la cartera en fase 3 del 65,0 % (67,1 % un año antes); cartera renegociada de 47.800 M (+6,7 %) con cobertura del 43,3 % [1]. Provisiones para procesos judiciales y administrativos de ≈ 10.300 M y provisión laboral extraordinaria de 291 M en el 2T26 [1, 3]. Activos fiscales diferidos de 68.148 M en NIIF (53 % del patrimonio), que dependen de beneficios futuros [3].',
    comentario: 'Para un banco el motor no tiene sentido en deuda neta, circulante ni capital invertido: caja y deuda a 0, y el «capital invertido» queda igual al patrimonio NIIF. El activo NIIF pasó de 931.208 M (2021) a 1.270.029 M (2025), +8,1 % anual, y el patrimonio atribuido de 105.640 M a 125.174 M, +4,3 % anual: el banco crece más en balance que en capital y el CET1 ha bajado al 11,2 % [1, 3]. El patrimonio NIIF incluye ≈ 27.000 M de fondo de comercio e intangibles de compras que no existen en BR GAAP: por eso el ROE NIIF del motor (≈ 10 %) es mucho menor que el gerencial (12,5-17,6 %) [1, 3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El estado de flujos de un banco no mide la caja del accionista: el flujo de explotación NIIF fue de 6.807 M en 2021, 6.847 M en 2022, 36.627 M en 2023, −21.131 M en 2024 y 4.992 M en 2025, porque mezcla depósitos, cartera y repos [3]. Se usa el beneficio atribuido como «flujo operativo» y capex 0; el flujo para el accionista es el beneficio menos la retención que pide el capital para crecer (modelo bancario). JCP y dividendos declarados: 6.200 M (2023), 6.000 M (2024) y 7.620 M (2025, 60 % del beneficio NIIF y 49 % del recurrente); en 2026, 2.000 M (enero), 2.000 M (abril) y 1.500 M (9-oct) [4, 11].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Auditores Independentes Ltda.', anios_auditor: null, opinion: 'Favorable (cuentas NIIF 2023-2025)',
    comentario: 'PwC audita las cuentas NIIF de 2023-2025 sin salvedades [4]. Altman Z, Piotroski F y Beneish M no se interpretan en un banco. Lo que importa es la cartera: morosidad a más de 90 días del 3,3 % (2,6 % un año antes, en parte por el cambio de criterio de baja), de 15-90 días del 3,3 %, formación de morosidad del 1,00 % trimestral, bajas a fallidos de 7.009 M en el 2T26 y cobertura de la fase 3 del 65,0 % (−2,1 puntos) [1]. Tres señales: (1) el coste del crédito sube con la cartera creciendo despacio (3,81 % a 12 meses); (2) la cartera renegociada crece (+6,7 %) con menos cobertura (43,3 %); (3) el tipo efectivo NIIF muy bajo (22,5 % en 2025) y un crédito fiscal de 584 M en el 2T26 gerencial: parte del beneficio depende del JCP deducible y de la cobertura cambiaria [1, 3].',
    senales: [
      { senal: 'Morosidad a más de 90 días del 3,3 % (+0,7 puntos en un año) y PDD +20,6 % en el 2T26', nivel: 'Alta', comentario: 'Pymes, agro, segmento masivo y casos de mayorista; parte es el cambio de la regla de baja [1].' },
      { senal: 'Cobertura de la fase 3 a la baja (65,0 %, −2,6 puntos en el trimestre)', nivel: 'Media', comentario: 'Menos colchón con la morosidad al alza [1].' },
      { senal: 'Crédito fiscal de 584 M en el 2T26 gerencial', nivel: 'Media', comentario: 'Sostiene el resultado con un BAI que cae un 44,6 %; depende del JCP [1].' },
      { senal: 'Activos fiscales diferidos de 68.148 M (53 % del patrimonio NIIF)', nivel: 'Baja', comentario: 'Habitual en la banca brasileña [3].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Pessoa física (particulares)', descripcion: 'Tarjetas, vivienda, consignado, crédito personal, rural y títulos privados de particulares.', tipo_resultado: null, historico: [{ periodo: '2T25', ingresos: 263651, resultado: null }, { periodo: '1T26', ingresos: 265261, resultado: null }, { periodo: '2T26', ingresos: 263424, resultado: null }] },
      { nombre: 'Financiamento ao consumo (financiera)', descripcion: 'Vehículos (20 % de cuota en vehículos de particulares) y bienes de consumo.', tipo_resultado: null, historico: [{ periodo: '2T25', ingresos: 87403, resultado: null }, { periodo: '1T26', ingresos: 95442, resultado: null }, { periodo: '2T26', ingresos: 100766, resultado: null }] },
      { nombre: 'Pequenas e médias empresas', descripcion: 'Capital circulante, anticipo de cobros, adquirencia (Getnet, escindida en 2021) y servicios.', tipo_resultado: null, historico: [{ periodo: '2T25', ingresos: 86056, resultado: null }, { periodo: '1T26', ingresos: 93704, resultado: null }, { periodo: '2T26', ingresos: 95957, resultado: null }] },
      { nombre: 'Grandes empresas', descripcion: 'Comercio exterior, títulos privados, avales y fianzas, banca de inversión.', tipo_resultado: null, historico: [{ periodo: '2T25', ingresos: 238413, resultado: null }, { periodo: '1T26', ingresos: 251176, resultado: null }, { periodo: '2T26', ingresos: 254623, resultado: null }] },
    ],
    geografias: [{ nombre: 'Brasil', peso_pct: 100 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de crédito ampliada (miles de millones BRL)', valor_anterior: '675,5 (jun-25)', valor_actual: '714,8 (jun-26)', variacion: '+5,8 %', comentario: 'Sin efecto cambiario, +6,3 % [1].' },
      { kpi: 'ROAE recurrente', valor_anterior: '16,4 % (2T25)', valor_actual: '12,5 % (2T26)', variacion: '−3,8 p.p.', comentario: '16,0 % en el 1T26 [1].' },
      { kpi: 'Morosidad > 90 días', valor_anterior: '2,6 % (jun-25)', valor_actual: '3,3 % (jun-26)', variacion: '+0,7 p.p.', comentario: 'Particulares 5,3 %; pymes 5,3 % [1].' },
      { kpi: 'Coste del crédito (12 meses)', valor_anterior: '3,90 % (2T25)', valor_actual: '3,81 % (2T26)', variacion: '−0,1 p.p.', comentario: '+0,1 puntos en el trimestre [1].' },
      { kpi: 'Diferencial de la cartera (spread)', valor_anterior: '10,55 % (2T25)', valor_actual: '10,03 % (2T26)', variacion: '−0,53 p.p.', comentario: 'Menos segmento masivo [1].' },
      { kpi: 'Índice de eficiencia', valor_anterior: '36,8 % (2T25)', valor_actual: '39,3 % (2T26)', variacion: '+2,4 p.p.', comentario: 'Gastos +2,6 %, ingresos +0,4 % [1].' },
      { kpi: 'CET1', valor_anterior: '11,6 % (jun-25)', valor_actual: '11,2 % (jun-26)', variacion: '−0,4 p.p.', comentario: 'Basilea 15,3 % [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'resultado gerencial recurrente de 2022 y 2023 de fuente primaria', tipo: 'Complemento', intentos: '1) informes de resultados del 4T22 y 4T23 en la web de RI (enlaces mziq no localizados); 2) 20-F 2023 (solo NIIF); 3) prensa: 12,9 mil M en 2022 (InfoMoney) y 2023 derivado del +50,2 % de 2024 (Jornal de Brasília)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'flujos', campo: 'dividendos de 2021 y 2022 y recompras', tipo: 'Complemento', intentos: '1) 20-F 2025 (solo 2023-2025); 2) DFC de la CVM (método directo sin detalle en 2023 y 2025); 3) prensa (no buscada por tiempo)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Sistema Gerenciador de Séries Temporais, serie 20539: saldo de las operaciones de crédito del sistema financiero', editor: 'Banco Central do Brasil', tipo: 'Sectorial', fecha: '2026-10-27', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.20539/dados?formato=json' },
  { id: 2, titulo: 'Informe de Resultados do 2º trimestre de 2026 (BRGAAP)', editor: 'Banco Santander (Brasil) S.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${MZ}/5395e890-a68c-8c25-7c30-399ec6928c53?origin=2` },
  { id: 3, titulo: 'Form 20-F 2025: historia, regulación (CMN, BCB, capital, JCP), competencia', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000129281426000592/bsbrform20f_2025.htm` },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los bancos comparables (capitalización, ROE, P/VC, PER adelantado), 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/SANB11.SA/' },
  { id: 5, titulo: 'Expectativas de mercado (Focus): IPCA y Selic 2026-2030, 23-oct-2026', editor: 'Banco Central do Brasil', tipo: 'Sectorial', fecha: '2026-10-23', url: 'https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais' },
  { id: 6, titulo: 'Gilson Finkelsztain será o novo CEO do Santander (sustituye a Mario Leão)', editor: 'NeoFeed', tipo: 'Prensa', fecha: '2026-03-20', url: 'https://neofeed.com.br/negocios/gilson-finkelsztain-sera-o-novo-ceo-do-santander/en/' },
];
const credito = { 2019: 3475816, 2020: 4021333, 2021: 4682852, 2022: 5366069, 2023: 5805157, 2024: 6464602, 2025: 7137252 };
const IT = Y['ITUB4.SA'], BBDC = Y['BBDC4.SA'], BBAS = Y['BBAS3.SA'], BTG = Y['BPAC11.SA'], NU = Y.NU, INTR = Y.INTR;
const Bn = {
  _estado: 'Completa con huecos de cuota. Mercado = crédito del sistema financiero brasileño (BCB, misma serie que en Itaú); competidores con datos de mercado de Yahoo.',
  historia: {
    resumen: 'Banco Santander, S.A. entró en Brasil en 1982 y creció por compras: Banco Geral do Comércio y Noroeste (1997), Meridional (1998), Banespa (2000, privatización) y, en 2008, Banco Real (parte del reparto de ABN AMRO), cuyo fondo de comercio sigue en el balance NIIF [3]. Salió a bolsa en octubre de 2009 (units en B3 y ADR en la NYSE, a 23,50 BRL por unit) [3]. En 2014 la matriz hizo una oferta de canje por acciones propias y pasó del 75 % al 88,3 %; las units salieron del Nivel 2 de B3 al segmento básico [3]. En 2021 escindió Getnet (adquirencia) [3]. Sergio Rial (2016-2021) llevó el ROE al 21 %; Mario Leão (2022-jul-2026) gestionó la caída de 2022-2023 y la vuelta al 17 %; desde el 2S26 el consejero delegado es Gilson Finkelsztain, que venía de presidir B3 [3, 6]. El 30-jul-2026 la matriz anunció una segunda oferta de canje por el ≈ 10 % restante.',
    hitos: [
      { anio: '1982', hito: 'Banco Santander abre en Brasil [3].' },
      { anio: '2000', hito: 'Compra de Banespa en la privatización [3].' },
      { anio: '2008', hito: 'Integración de Banco Real (ABN AMRO): origen del fondo de comercio NIIF [3].' },
      { anio: '2009', hito: 'Salida a bolsa en B3 y NYSE (units y ADR) [3].' },
      { anio: '2014', hito: 'Primera oferta de canje de la matriz: del 75 % al 88,3 % del capital; salida del Nivel 2 [3].' },
      { anio: '2021', hito: 'Escisión de Getnet; ROAE récord del 21,2 % [3].' },
      { anio: '2023', hito: 'Resultado recurrente de ≈ 9.240 M (mínimo del ciclo) por la morosidad de particulares y Americanas.' },
      { anio: '2026', hito: 'Gilson Finkelsztain, consejero delegado; ROAE del 12,5 % en el 2T26; oferta de canje de la matriz (30-jul) [2, 6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Tercer banco privado de Brasil por activos (1,29 billones BRL a jun-2026) y filial de Banco Santander, S.A. (89,53 %) [2, 3]. Cartera ampliada de 714.769 M: particulares 263.424 M (tarjetas 65.198 M, vivienda 77.214 M, consignado 56.131 M), financiación al consumo 100.766 M (sobre todo vehículos, con el 20 % de cuota), pymes 95.957 M y grandes empresas 254.623 M (con avales y títulos privados) [2]. 76,2 M de clientes (34,4 M activos), 47.327 empleados (−6.591 en un año), 858 oficinas y 731 puntos de atención [2].',
    como_gana_dinero: 'De una receita total de 20.675 M en el 2T26, el 74 % es margen financiero (15.341 M: 16.058 M con clientes, con un diferencial del 10,03 % sobre 627.000 M de volumen medio, y −718 M con el mercado) y el 26 % comisiones (5.334 M: tarjetas 1.638 M, seguros 1.063 M, cuentas 825 M) [2]. De ahí salen el coste del crédito (7.654 M, el 37 % de la receita total), los gastos (6.578 M; eficiencia del 39,3 %), impuestos sobre ingresos (1.453 M) y otros gastos operativos (2.534 M, con 1.199 M de contingencias) [2]. Es pasivo-sensible: el margen con el mercado sufre con la Selic alta, y el coste del crédito también sube con ella [2].',
    clientes: 'Base dispersa: los 100 mayores deudores son el 17,5 % de la exposición y el mayor, el 0,8 % [2]. Poder de precio limitado: el diferencial baja (10,55 % → 10,03 % en un año) al salir del segmento masivo, y el ROE (12,5 %) queda por debajo de Itaú (≈ 24 %) y de BTG (≈ 26 %); compite con Itaú, Bradesco, Banco do Brasil, Caixa y los digitales (Nubank, Inter) [2, 4].',
  },
  sector: {
    definicion: 'El mercado relevante es el crédito del sistema financiero de Brasil (saldo total de las operaciones de crédito, recursos libres y dirigidos), donde Santander Brasil genera todo su resultado [1, 2]. Misma serie del BCB que en el informe de Itaú. La cuota no se calcula con el mismo perímetro: la cartera ampliada del banco incluye avales y títulos privados.',
    tamano: '≈ 7,40 billones BRL de crédito en ago-2026 (7,14 billones a dic-2025) [1]',
    unidad_serie: 'miles de millones de BRL', serie: Object.entries(credito).map(([a, v]) => ({ anio: a, tamano: Math.round(v / 1000) })),
    tcac_historico_pct: r1(100 * ((credito[2025] / credito[2020]) ** (1 / 5) - 1)), tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tipo de interés (Selic)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Selic del 13,75 %; el Focus del 23-oct la veía en 13,25 % a fin de 2026 y 11,75 % en 2027, antes del giro del mercado tras las elecciones; para un banco pasivo-sensible como Santander, tipos altos más tiempo restan margen con el mercado [2, 5].' },
      { driver: 'Política fiscal y prima de riesgo', efecto: '−', horizonte: 'Cíclico', evidencia: 'El bono a 10 años subió del 12,98 % al 15,44 % el 26-oct tras la reelección de Lula [5].' },
      { driver: 'Endeudamiento de las familias', efecto: '−', horizonte: 'Cíclico', evidencia: 'Morosidad a más de 90 días de particulares del 5,3 % en Santander (+1,1 puntos en un año) [2].' },
      { driver: 'Crecimiento del crédito', efecto: '+', horizonte: 'Estructural', evidencia: 'El crédito del sistema crece un 12,2 % anual desde 2020; Santander, un 5,8 % en el último año [1, 2].' },
      { driver: 'Digitalización e IA', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Plataforma global Gravity e IA en procesos; −6.591 empleados y −178 oficinas en un año; Nubank e Inter compiten en particulares [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cinco grandes más Nubank, BTG e Inter; Santander gana menos que Itaú (ROE 12,5 % frente al 24 %) y pierde diferencial en particulares [2, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Pix, open finance y portabilidad bajan los costes de cambio; la renegociación crece [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Captación de clientes de 688.514 M, 51 % de particulares, con coste ligado al CDI [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Bancos digitales con licencia (Nubank, ROE del 32 %) y fintech de pagos [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Mercado de capitales para grandes empresas; crédito de fintech para particulares.' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'Para Santander el ciclo de crédito ya se ha girado: morosidad a más de 90 días del 3,3 % (+0,7 puntos), PDD +11,5 % interanual y ROAE del 12,5 % con la Selic al 13,75 % [2]. En 2022-2023, con la misma Selic, el ROE bajó del 21 % al ≈ 12 % (Americanas, particulares) y tardó dos años en volver al 17 % [A].' },
    regulacion: 'Banco Central y Consejo Monetario Nacional fijan capital (Basilea III; CET1 mínimo con colchones del 8,0 %), encajes y la contabilidad de pérdidas esperadas (Resolución 4.966, desde 2025), que cambió la regla de baja a fallidos [2, 3]. Abiertos con efecto en cifras: la deducibilidad del JCP, los topes al rotativo de tarjetas y la posible subida de impuestos a la banca tras las elecciones de 2026 [3]. La oferta de canje de la matriz está sujeta a la CVM (Resolución 215/2024, laudo de valoración) y a la SEC (Form F-4) [D].',
    tendencias: 'Tres cambios: (1) Pix y open finance bajan tarifas (comisiones de cuentas −12,2 % en un año); (2) la IA y la plataforma global del grupo bajan costes (gastos +2,6 % frente a una inflación del 4-5 %); (3) los digitales ganan el segmento masivo, del que Santander se está retirando (consignado −14,7 %, crédito personal −8,6 %) para centrarse en alta renta, pymes y vehículos [2]. Gana con (2); pierde volumen y margen con (1) y (3).',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null, posicion: '3.er banco privado de Brasil por activos tras Itaú y Bradesco (5.º del sistema con Banco do Brasil y Caixa); 1.º en financiación de vehículos a particulares (20 % de cuota) [2, 3].',
    competidores: [
      { nombre: 'Itaú Unibanco', pais: 'Brasil', ticker: 'ITUB4', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Líder privado; ROE ${r1(100 * IT.roe)} %, P/VC ${r2(IT.pvc)}x [4].` },
      { nombre: 'Bradesco', pais: 'Brasil', ticker: 'BBDC4', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `En reestructuración; ROE ${r1(100 * BBDC.roe)} %, P/VC ${r2(BBDC.pvc)}x [4].` },
      { nombre: 'Banco do Brasil', pais: 'Brasil', ticker: 'BBAS3', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Público, líder en agro; ROE ${r1(100 * BBAS.roe)} %, P/VC ${r2(BBAS.pvc)}x [4].` },
      { nombre: 'BTG Pactual', pais: 'Brasil', ticker: 'BPAC11', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Banca de inversión y patrimonios; ROE ${r1(100 * BTG.roe)} %, P/VC ${r2(BTG.pvc)}x [4].` },
      { nombre: 'Nubank (Nu Holdings)', pais: 'Brasil/Islas Caimán', ticker: 'NU', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Banco digital; ROE ${r1(100 * NU.roe)} %, P/VC ${r2(NU.pvc)}x [4].` },
      { nombre: 'Banco Inter', pais: 'Brasil', ticker: 'INTR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Digital; ROE ${r1(100 * INTR.roe)} %, P/VC ${r2(INTR.pvc)}x [4].` },
      { nombre: 'Caixa Econômica Federal', pais: 'Brasil', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Pública, no cotiza; líder en vivienda.' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Sin adquirencia propia desde la escisión de Getnet (2021); el Pix reduce la ventaja de las redes [3].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Nómina y crédito vinculados, pero el diferencial baja y las comisiones de cuentas caen un 12,2 % [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca global y licencia bancaria; acceso a la plataforma tecnológica del grupo [2, 3].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Eficiencia del 39,3 %, peor que Itaú (37,4 %) y al alza [2].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cartera de 715.000 M y 20 % de cuota en vehículos; ROE por debajo del Ke desde 2022 [2].' },
      ],
    },
    amenazas: 'Lo que más erosiona: los digitales en particulares (alta, ya visible en el diferencial), un ciclo de crédito largo con la Selic alta tras las elecciones (alta) y la subida de impuestos a la banca (media). Ninguna es exclusiva de Santander, pero con un ROE del 12,5 % tiene menos margen que Itaú para absorberlas.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el riesgo de crédito con criterios climáticos (agro, con morosidad al alza) y la conducta comercial con particulares de renta baja, de los que el banco se está retirando [2, 3]. No se ha encontrado una cifra que mueva la valoración.',
    controversias: 'Contingencias laborales y civiles provisionadas (1.199 M de provisiones para contingencias en el 2T26 y 291 M de provisión laboral extraordinaria) [2]. Sin sanciones relevantes localizadas en los últimos tres años en las fuentes leídas.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota de mercado e ingresos y margen de los competidores', tipo: 'Complemento', intentos: '1) serie del BCB (no separa por banco); 2) informe del 2T26 (cartera ampliada, perímetro distinto); 3) informes de los rivales (el margen EBIT no aplica a un banco)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 20-F 2025 (no las da); 2) web de RI (no leída por tiempo); 3) prensa (sin datos)', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025: Item 6 (consejo, dirección, remuneración), Item 7 (accionistas: 89,53 % de Banco Santander, S.A.), Item 9 (oferta de canje de 2014)', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000129281426000592/bsbrform20f_2025.htm` },
  { id: 2, titulo: 'Santander announces its intention to launch an exchange offer to acquire the outstanding shares of Santander Brazil (Form 425)', editor: 'Banco Santander, S.A. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000095010326011482/dp250946_425.htm` },
  { id: 3, titulo: 'Preguntas y respuestas sobre las ofertas de canje (ajuste del ratio por JCP, minoritarios que no acudan, calendario 1S27) (Form 425)', editor: 'Banco Santander, S.A. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000095010326012441/dp251846_425.htm` },
  { id: 4, titulo: 'Fato relevante: registro de las ofertas en la CVM, B3 y SEC (F-4) y laudo de UBS BB (Form 425)', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-09-21', url: `${ED}/000095010326014284/dp253665_425.htm` },
  { id: 5, titulo: 'Gilson Finkelsztain será o novo CEO do Santander', editor: 'NeoFeed', tipo: 'Prensa', fecha: '2026-03-20', url: 'https://neofeed.com.br/negocios/gilson-finkelsztain-sera-o-novo-ceo-do-santander/en/' },
  { id: 6, titulo: 'Actas del consejo del 25-sep-2026 (dimisión de Cristina San José) y del 9-oct-2026 (JCP; composición del consejo)', editor: 'Banco Santander (Brasil) S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-09', url: `${ED}/000129281426004890/bsbr20261009_6k.htm` },
  { id: 7, titulo: '«Deixo um banco melhor», diz Mario Leão em último balanço como CEO (previsión de resultado 2026)', editor: 'Bloomberg Línea', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://www.bloomberglinea.com.br/negocios/deixo-um-banco-melhor-diz-mario-leao-em-ultimo-balanco-como-ceo-do-santander-brasil/' },
  { id: 8, titulo: 'Aviso a los accionistas del 31-ago-2026 sobre la oferta (cierre esperado en el 1S27) (Form 425)', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-08-31', url: `${ED}/000095010326013270/dp252667_425.htm` },
];
const C = {
  _estado: 'Completa con huecos de votos, remuneración individual y operaciones de directivos (emisor extranjero).',
  directivos: {
    equipo: [
      { nombre: 'Gilson Finkelsztain', cargo: 'Consejero delegado (CEO)', desde: '2026', participacion_pct: null, trayectoria: 'Presidente de B3 de 2017 a 2026; ya trabajó en Santander Brasil en 2011-2013. Anunciado el 19-mar-2026 para sustituir a Mario Leão (que se fue por decisión propia); al mando desde el 2S26 y consejero desde octubre [5, 6, 7].' },
      { nombre: 'Carlos Ignacio Muñiz González-Blanch', cargo: 'Vicepresidente ejecutivo, director financiero y de relación con inversores', desde: '2026', participacion_pct: null, trayectoria: 'Sustituyó a Gustavo Alejo Viviani a finales de abril de 2026; firma los hechos relevantes de la oferta de canje [1, 4].' },
      { nombre: 'Deborah Stern Vieitas', cargo: 'Presidenta independiente del consejo', desde: null, participacion_pct: null, trayectoria: 'Presidenta independiente; preside las reuniones del consejo de 2026 [1, 6].' },
      { nombre: 'Javier Maldonado Trinchant', cargo: 'Vicepresidente del consejo', desde: null, participacion_pct: null, trayectoria: 'Representa a la matriz en el consejo [1, 6].' },
      { nombre: 'Mario Roberto Opice Leão', cargo: 'Consejero delegado saliente (2022-2026)', desde: '2022', participacion_pct: null, trayectoria: 'En el banco desde 2015; con él el resultado recurrente pasó de ≈ 9.240 M (2023) a 15.615 M (2025), y el ROAE del ≈ 12 % al 17,3 % [1, 7].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Sin guía numérica; Mario Leão dijo en abril que el resultado de 2026 superaría el de 2025 [7]', real: '1S26 de 6.802 M frente a 7.520 M en el 1S25 (−9,5 %)', cumplida: 'No' },
      { anio: '2025', guia: 'Sin guía numérica; objetivo declarado de volver a un ROE por encima del coste del capital', real: 'ROAE ≈ 17,3 % y resultado de 15.615 M (+12,6 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Cambio completo de cúpula en 2026: consejero delegado (Finkelsztain por Leão) y director financiero (Muñiz por Viviani), y el 2T26, el primer resultado del nuevo equipo, decepcionó [1, 5, 7]. El banco no publica guía numérica; la promesa de superar en 2026 el resultado de 2025 ya no se cumple al ritmo del 1S26. La dirección la nombra y la supervisa la matriz.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Deborah Stern Vieitas', cargo: 'Presidenta', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Javier Maldonado Trinchant', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Antonio Carlos Quintella', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Cristiana Almeida Pipponzi', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Deborah Patricia Wright', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Pedro Augusto de Melo', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Daniel Barriuso Rojo', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Oscar Rodríguez Herrero', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Ede Ilson Viani', cargo: 'Consejero (vicepresidente ejecutivo)', tipo: 'Ejecutivo', desde: null, comisiones: null },
      { nombre: 'Gilson Finkelsztain', cargo: 'Consejero (consejero delegado)', tipo: 'Ejecutivo', desde: '2026', comisiones: null },
      { nombre: 'Márcio de Andrade Schettini', cargo: 'Consejero', tipo: 'Otro externo', desde: '2026', comisiones: null },
      { nombre: 'Vanessa de Souza Lobato Barbosa', cargo: 'Consejera', tipo: 'Otro externo', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'La junta fija la remuneración global de consejo y dirección; el variable de los directivos se difiere (al menos el 40 % tres años), con incentivo a largo plazo en acciones y cláusulas de «malus» y «clawback» de hasta el 100 % [1]. El 20-F no da el desglose individual del consejero delegado. Parte del incentivo a largo plazo se liga a métricas del grupo, lo que alinea a la dirección con la matriz más que con los minoritarios [1].',
    accionistas: [
      { nombre: 'Banco Santander, S.A. (directo y por Sterrebeeck B.V. 47,25 % y Grupo Empresarial Santander S.L. 42,25 %)', pct: 89.53, tipo: 'Control', variacion: 'Estable desde 2014 (88,3 % tras la oferta de canje de ese año); oferta de canje por el resto anunciada el 30-jul-2026 [1, 2]' },
      { nombre: 'Autocartera', pct: 0.36, tipo: 'Autocartera', variacion: '27,3 M de acciones a 31-ene-2026 [1]' },
      { nombre: 'Flotante (units SANB11, ordinarias, preferentes y ADR BSBR)', pct: 10.1, tipo: 'Institucional y particulares', variacion: 'Objeto de la oferta de canje [2]' },
    ],
    insiders: [],
    control_y_defensas: 'Banco Santander, S.A. tiene el 89,53 % del capital (≈ 90 % de las ordinarias y de las preferentes) y nombra al consejo y a la dirección [1]. Las units cotizan en el segmento básico de B3 desde la oferta de 2014, sin las protecciones del Nivel 2 [1]. **Riesgos para el minoritario**: (1) la oferta de canje en curso (0,4056 acciones de la matriz por unit, ajustable por JCP) no exige aceptación mínima y no busca la exclusión, pero la matriz advierte que, si acude mucha gente, la unit perderá liquidez y peso en los índices, y que el ADR podría salir de la NYSE y del registro de la SEC [2, 3]: es una presión a aceptar; (2) el ratio se fijó con una prima del 15 % sobre un precio que estaba en mínimos de 52 semanas tras el mal 2T26, y la matriz recuerda que «no hay prima de control» porque ya controla [3]; (3) operaciones con el grupo (plataformas tecnológicas globales, servicios, financiación) que el 20-F reconoce que podrían no ser en condiciones de mercado [1]; (4) el payout (49 % del recurrente en 2025) lo decide de hecho la matriz. A favor: el consejo tiene presidenta y cinco consejeros independientes y la oferta es de canje, no en efectivo, así que el minoritario que acude sigue expuesto a Brasil a través del grupo [1, 3].',
    alertas: ['Oferta de canje de la matriz en curso, sin aceptación mínima y con aviso explícito de menor liquidez y posible salida de la NYSE para quien no acuda [2, 3].', 'Cambio de consejero delegado y de director financiero en 2026 [1, 5].', 'Units en el segmento básico de B3 (sin Nivel 2) desde 2014 [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración y remuneración individual del consejero delegado', tipo: 'Complemento', intentos: '1) 20-F 2025 (solo totales y criterios); 2) actas de la junta en 6-K (sin porcentajes en lo leído); 3) Formulário de Referência (no leído por tiempo)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses', tipo: 'Complemento', intentos: '1) Forms 3/4 en EDGAR (hay presentaciones de ago-oct 2026, no leídas una a una); 2) informes mensuales de la CVM (no leídos); 3) prensa (sin noticias de compras o ventas relevantes)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (SANB11.SA, BOVA11.SA, ITUB4.SA, SAN.MC, BSBR) hasta el 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/SANB11.SA/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary (precio, consenso, objetivos, P/VC, ROE) de SANB11.SA, BSBR y comparables, 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/SANB11.SA/analysis/' },
  { id: 3, titulo: 'Brazil 10-Year Bond Yield (15,435 % el 26-oct-2026; 12,98 % el 23-oct)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://tradingeconomics.com/brazil/government-bond-yield' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Ações de bancos despencam após reeleição de Lula (BTG −37 %, BB −31 %, Bradesco −25 %, Itaú −16 %) y peso de Brasil en el grupo Santander', editor: 'Times Brasil (CNBC)', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://timesbrasil.com.br/empresas-e-negocios/santander-brasil-mantem-posto-e-tem-segundo-maior-resultado-do-grupo-no-mundo/' },
  { id: 6, titulo: 'Santander announces its intention to launch an exchange offer (0,4056 acciones SAN por unit, prima del 15 %) (Form 425)', editor: 'Banco Santander, S.A. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000095010326011482/dp250946_425.htm` },
  { id: 7, titulo: 'Preguntas y respuestas sobre las ofertas de canje (ajuste por JCP y dividendos, 31,21 BRL por unit con SAN a 12,912 €) (Form 425)', editor: 'Banco Santander, S.A. (SEC)', tipo: 'Primaria', fecha: '2026-08-14', url: `${ED}/000095010326012441/dp251846_425.htm` },
  { id: 8, titulo: 'Fato relevante: registro de las ofertas y laudo de UBS BB (Form 425)', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-09-21', url: `${ED}/000095010326014284/dp253665_425.htm` },
  { id: 9, titulo: 'Temporada de balanços do 3T26: Santander publica el 28-oct antes de la apertura; conferencia el 29-oct a las 10:00', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.seudinheiro.com/2026/economia/temporada-de-balancos-do-3t26-bate-a-porta-veja-as-datas-das-divulgacoes-e-das-teleconferencias-davs/' },
  { id: 10, titulo: 'Santander (SANB11): lucro tomba 17,6 % e vai a R$ 3 bilhões no 2T26 e frustra expectativas; ROE cai para 12,5 %', editor: 'Money Times', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.moneytimes.com.br/santander-sanb11-lucro-tomba-176-vai-a-r-3-bilhoes-no-2t26-e-frustra-expectativas-roe-cai-para-125/' },
  { id: 11, titulo: 'UBS BB passa a tesoura no preço-alvo de Santander (SANB11) e desiste da recomendação de olho em OPA (de compra a neutral, objetivo −10 BRL)', editor: 'Seu Dinheiro / TradeMap', tipo: 'Prensa', fecha: '2026-08-24', url: 'https://trademap.com.br/noticias/news-8222133' },
  { id: 12, titulo: 'Informe de Resultados 2T26 (acciones, valor contable por unit, JCP)', editor: 'Banco Santander (Brasil) S.A.', tipo: 'Primaria', fecha: '2026-07-29', url: `${MZ}/5395e890-a68c-8c25-7c30-399ec6928c53?origin=2` },
  { id: 13, titulo: 'Expectativas de mercado (Focus) del 23-oct-2026; PTAX del 26-oct (USD 5,5007; EUR 6,1487)', editor: 'Banco Central do Brasil', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' },
  { id: 14, titulo: 'Santander (SANB11) dispara 13 % e queima parte do prêmio com OPA', editor: 'Money Times', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.moneytimes.com.br/santander-sanb11-dispara-13-e-queima-parte-de-premio-com-opa/' },
  { id: 15, titulo: 'OPA bilionária do Santander (SANB11): as obrigações, os riscos e as frustrações com a oferta', editor: 'Money Times', tipo: 'Prensa', fecha: '2026-08', url: 'https://www.moneytimes.com.br/opa-bilionaria-do-santander-sanb11-as-obrigacoes-os-riscos-e-as-frustracoes-com-oferta/' },
  { id: 16, titulo: 'Form 20-F 2025 (dividendos por acción, oferta de canje de 2014)', editor: 'Banco Santander (Brasil) S.A. (SEC)', tipo: 'Primaria', fecha: '2026-02-27', url: `${ED}/000129281426000592/bsbrform20f_2025.htm` },
];
const sb = Y['SANB11.SA'], adr = Y.BSBR;
const comp = (nombre, t, pais, conv = 1) => {
  const q = Y[t];
  return { nombre, ticker: t, pais, capitalizacion: Math.round(q.cap / 1e6 * conv), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: r1(q.per_adelantado), crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: r1(100 * q.roe), dn_ebitda: null, fcf_yield_pct: null };
};
const TC = 5.4064;
const empresasComp = [comp('Itaú Unibanco', 'ITUB4.SA', 'BR'), comp('Bradesco', 'BBDC4.SA', 'BR'), comp('Banco do Brasil', 'BBAS3.SA', 'BR'), comp('BTG Pactual', 'BPAC11.SA', 'BR'), comp('Nu Holdings', 'NU', 'BR', TC), comp('Banco Inter', 'INTR', 'BR', TC)];
const cierres = B.cierres_ejercicio;
const mov = { fecha: '2026-10-26', var_1m_pct: -10.7, var_3m_pct: -0.2, var_6m_pct: -11.3, var_12m_pct: -6.8, dist_max_52s_pct: -30.5, dist_min_52s_pct: 4.4, dist_max_historico_pct: -30.5, tendencia: 'bajista', volatilidad_60d_pct: 34, avisos: ['P5 Más de un 15 % por debajo de la media de 200 sesiones no (−12 %); cerca del mínimo de 52 semanas (+4,4 %)'] };
const D = {
  _estado: 'Completa. Precio = unit SANB11 en B3 al cierre del 26-oct-2026 (26,30 BRL); consenso de Yahoo (5-6 analistas de BPA, 9 de objetivo); comparables bancarios con PER, P/VC y ROE; oferta de canje de la matriz como transacción.',
  identificacion: {
    nombre: 'Banco Santander (Brasil) S.A.', nombre_corto: 'Santander Brasil', ticker: 'SANB11', isin: 'BRSANBCDAM13', mercado: 'B3 (unit SANB11 = 1 ON + 1 PN); también ADR BSBR en la NYSE (1 ADR = 1 unit)', indice_referencia: 'Ibovespa',
    pais: 'Brasil', pais_iso: 'BR', sector: 'Financials', industria: 'Banks', sede: 'São Paulo', fundacion: '1982', empleados: 47327, web: 'https://www.santander.com.br/ri/',
    precio: 26.30, fecha_precio: '2026-10-26', acciones: U, capitalizacion_publicada: Math.round(26.30 * U), free_float_pct: 10.1,
    max_52s: 37.83, min_52s: 25.18, volumen_medio_diario: '≈ 164 M BRL/día en SANB11 (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Santander Brasil no publica guía numérica. En abril de 2026 el consejero delegado saliente dijo que el resultado de 2026 superaría el de 2025 (15.615 M) [10]; con 6.802 M en el 1S26 haría falta un 2S26 de 8.800 M, muy por encima del ritmo actual. Resultados del 3T26 el 28-oct antes de la apertura [9].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(sb.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(sb.trend[2].bpa), dpa: null, fuente: `Yahoo Finance, ${sb.trend[2].n} analistas, 26-oct-2026; BPA por unit [2]` },
      { periodo: '2027e', ingresos: Math.round(sb.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(sb.trend[3].bpa), dpa: null, fuente: `Yahoo Finance, ${sb.trend[3].n} analistas, 26-oct-2026 [2]` },
    ],
    recomendaciones: { n_analistas: 11, comprar: 1, mantener: 10, vender: 0, po_medio: r2(sb.po_medio), po_min: sb.po_min, po_max: sb.po_max },
    revisiones: `El BPA de 2026 del consenso baja de ${r2(sb.trend[2].bpa_hace90)} BRL por unit hace 90 días a ${r2(sb.trend[2].bpa)} (−14 %) y el de 2027 de ${r2(sb.trend[3].bpa_hace90)} a ${r2(sb.trend[3].bpa)} (−12 %): los recortes vienen del 2T26 [2, 10]. Tras el anuncio de la oferta, UBS BB bajó a neutral y recortó su objetivo en 10 BRL: con la oferta, el precio queda atado a la acción de la matriz [11]. Recomendaciones: 1 comprar y 10 mantener; objetivo medio de ${r2(sb.po_medio)} BRL (${sb.n_analistas} analistas, ${sb.po_min}-${sb.po_max}). En el ADR, objetivo medio de ${r2(adr.po_medio)} USD [2]. Las cifras de Yahoo son anteriores a la reacción de los analistas a las elecciones del 25-oct.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'Con dividendos, la unit ha ganado un 1,3 % anual a 5 años frente al 14,5 % del Ibovespa (BOVA11) y al 22,1 % de Itaú [1]: el mercado ha castigado el ROE de Santander Brasil, que no cubre su coste del capital desde 2022. 2025 fue bueno (+53,2 %) por la vuelta del ROE al 17 %; 2026 va en −17,0 % con el 1T26 y el 2T26 por debajo de lo esperado (mínimo de 25,18 BRL el 30-jul, el día después del 2T26) [1, 10]. El 31-jul, tras el anuncio de la oferta de canje, la unit subió un 13 % [14]. Desde entonces cotiza pegada al valor de canje (0,40 acciones de SAN por el tipo de cambio). Las rentabilidades del índice no incluyen el 26-oct (Yahoo no tenía aún la barra de BOVA11): la comparación del último año está sesgada a favor del índice en ≈ 14 puntos.',
    contexto: {
      movimiento: mov,
      movimientos_fuertes: [
        { periodo: '26-oct-2026', var_pct: -4.5, causa: 'Reelección de Lula (25-oct): el Ibovespa cae un 13,9 % y los bancos entre un 13 % y un 31 % en B3, pero SANB11 solo un 4,5 %: su precio sigue al valor de canje, y la depreciación del real frente al euro (≈ 7-9 %) subió en reales lo que vale la contraprestación en acciones de SAN, que cayó un 3,1 % en Madrid [1, 5].', veredicto: 'no cambia', condicion: null },
        { periodo: '31-jul-2026', var_pct: 13.0, causa: 'Anuncio de la oferta de canje de Banco Santander, S.A. (0,4056 acciones SAN por unit, prima del 15 %) [6, 14].', veredicto: 'retrasa', condicion: 'Hasta que se conozcan el folleto definitivo (F-4 efectivo), la fecha de la subasta y la junta de Banco Santander que apruebe la ampliación.' },
        { periodo: '29-jul-2026', var_pct: -7.4, causa: 'Resultado del 2T26: 3.014 M (−17,6 %), ROAE del 12,5 %, PDD +20,6 % [10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026 (−16,1 % en un mes al 15-may)', var_pct: -16.1, causa: '1T26 por debajo de lo esperado (3.788 M, ROAE del 16,0 %) y caída de los bancos brasileños [1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-09-21', tipo: 'fusión u oferta', hecho: 'Registro de las ofertas de canje en la CVM, B3 y SEC (F-4, aún no efectivo) y publicación del laudo de UBS BB [8].', veredicto: 'retrasa', condicion: 'Hasta que la oferta tenga fecha de subasta y se conozca el ratio final.' },
        { fecha: '2026-08-14', tipo: 'fusión u oferta', hecho: 'La matriz detalla el ajuste del ratio por JCP y dividendos, avisa de menor liquidez para quien no acuda y espera cerrar en el 1S27 [7].', veredicto: 'retrasa', condicion: 'Igual que el anterior.' },
        { fecha: '2026-08-24', tipo: 'recomendación', hecho: 'UBS BB baja a neutral y recorta el objetivo en 10 BRL por la oferta [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-09', tipo: 'resultados', hecho: 'JCP de 1.500 M (0,401 BRL por unit), registro el 20-oct, pago el 9-nov; reduce el ratio de canje a ≈ 0,4000 [D12, 7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-19', tipo: 'directivos', hecho: 'Mario Leão deja de ser consejero delegado; le sustituye Gilson Finkelsztain (B3) desde el 2S26 [C5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 antes de la apertura de B3; conferencia el 29-oct [9].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'retrasa',
      condicion: 'Hasta que la oferta de canje tenga fecha y ratio final (F-4 efectivo, junta de Banco Santander), y hasta conocer el marco fiscal del nuevo mandato. No cambia la conclusión de hoy, que ya es «no comprar» por calidad y por valor intrínseco.',
      comentario: 'Lo que mueve la unit desde el 30-jul no es el banco sino la oferta: cotiza a ≈ 2-4 % por debajo del valor de canje (0,4000 × SAN × EUR/BRL) [6, 7]. La victoria de Lula del 25-oct sube el coste del capital en reales (bono del 12,98 % al 15,44 %), retrasa la bajada de la Selic (mala noticia para un banco pasivo-sensible con la morosidad al alza) y sube el riesgo de impuestos a la banca; pero el precio de SANB11 casi no lo recoge porque la contraprestación son acciones de la matriz en euros [3, 13]. Hecho pendiente con fecha que mueve el precio más de un 5 %: el cierre (o no) de la oferta en el 1S27. Resultados del 3T26 mañana (28-oct): no aplazan (regla 11).',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: cierres.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: r2(c.precio_cierre), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierre de la unit SANB11 en BRL (Yahoo) [1]. El PER del motor usa el BPA NIIF; la historia que decide la regla a 12 meses es la del PER adelantado con el BPA recurrente gerencial por unit (precio ÷ BPA del año siguiente): 9,9x (2020), 8,7x (2021), 11,4x (2022), 8,7x (2023), 5,7x (2024) y 9,3x (2025, sobre nuestro 2026e). Hoy cotiza a ≈ 6,7x el BPA de 2027e y a 1,02 veces el valor contable BR GAAP, en la parte baja de su historia, pero con el precio atado a la oferta de canje.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Bancos cotizados de Brasil con datos de Yahoo del 26-oct-2026: Itaú, Bradesco, Banco do Brasil, BTG Pactual, Nubank e Inter [2]. Se excluye Itaúsa (holding de Itaú) y los andinos para no repetir a Itaú y por tener otra tasa libre. Para bancos solo tienen sentido el PER, el P/VC y el ROE: EV/EBITDA, margen EBITDA, DN/EBITDA y FCF quedan vacíos; el campo «ROIC» lleva el ROE. Las capitalizaciones de los ADR se convierten a BRL a 5,4064.',
    empresas: empresasComp,
    comentario: `Santander Brasil cotiza a ${r1(sb.per_adelantado)}x el BPA adelantado de Yahoo y a 1,02x el valor contable BR GAAP (0,77x el NIIF de Yahoo), con un ROE recurrente del 12,5-16 % [2]. Está en la zona de los bancos de ROE medio (Bradesco ${r1(BBDC.per_adelantado)}x y ${r2(BBDC.pvc)}x VC con ROE del ${r1(100 * BBDC.roe)} %; Banco do Brasil ${r1(BBAS.per_adelantado)}x y ${r2(BBAS.pvc)}x), lejos de Itaú (${r1(IT.per_adelantado)}x, ${r2(IT.pvc)}x VC, ROE ${r1(100 * IT.roe)} %) y de BTG y Nubank, que cotizan con prima por ROE y crecimiento. La mediana del PER de los seis es de 7,0x. Frente a sus pares no está caro ni barato para su ROE; frente a su coste del capital (ROE < Ke), cualquier P/VC por encima de ≈ 0,7x es exigente, y el que fija hoy el precio es el canje.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'Santander Brasil (≈ 10 % de minoritarios)', comprador: 'Banco Santander, S.A. (canje por acciones propias)', ev: 11170, ev_ventas: null, ev_ebitda: null, prima_pct: 15.0, excluir: false, comentario: '0,4056 acciones SAN por unit = 29,04 BRL al anunciarla (1,13x el VC BR GAAP de jun-2026); hasta 1.908 M € [6, 7].' },
      { fecha: '2014-04', objetivo: 'Santander Brasil (≈ 25 % de minoritarios)', comprador: 'Banco Santander, S.A. (canje por acciones propias)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Cerrada el 30-oct-2014; la matriz pasó al 88,3 % y las units salieron del Nivel 2 de B3 [16].' },
    ],
    comentario: 'Las dos únicas operaciones relevantes son de la propia matriz y son canjes, no compras en efectivo: no tienen prima de control y su «precio» depende de la acción de Banco Santander. La de 2026 da ≈ 26,9-27,4 BRL por unit al cierre del 26-oct (ratio ajustado ≈ 0,4000), un 2-4 % por encima del precio. No se pondera en el valor intrínseco (peso 0): es la referencia del precio a 6-9 meses, no del valor del banco.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Yahoo (no la da para SANB11); 2) B3 (préstamo de acciones, no leído); 3) prensa', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'rango de valor del laudo de UBS BB', tipo: 'Complemento', intentos: '1) fato relevante del 21-sep (remite al IPE de la CVM); 2) web de RI (laudo no localizado en las búsquedas); 3) prensa (Renova, Money Times: sin la cifra)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Money Times: «OPA bilionária do Santander (SANB11): as obrigações, os riscos e as frustrações com a oferta» y comentarios', editor: 'Money Times', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://www.moneytimes.com.br/opa-bilionaria-do-santander-sanb11-as-obrigacoes-os-riscos-e-as-frustracoes-com-oferta/' },
  { id: 2, titulo: 'Renova Invest: «Santander Brasil (SANB11): OPA de permuta é protocolada na CVM e na SEC» (lectura para el inversor)', editor: 'Renova Invest', tipo: 'Foros y redes', fecha: '2026-09-21', url: 'https://renovainvest.com.br/blog/opa-de-permuta-santander-brasil/' },
  { id: 3, titulo: 'Money Times: «Santander (SANB11) dispara 13 % e queima parte do prêmio com OPA»', editor: 'Money Times', tipo: 'Foros y redes', fecha: '2026-07-31', url: 'https://www.moneytimes.com.br/santander-sanb11-dispara-13-e-queima-parte-de-premio-com-opa/' },
];
const E = {
  _estado: 'Parcial: debate de inversores en prensa con comentarios y blogs de asesores; sin acceso a foros (Reddit, Stocktwits) en el tiempo del análisis.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Money Times (nota y comentarios sobre los riesgos de la oferta)', fecha: '2026-08', n_comentarios: null, tono: 'Negativo', resumen: 'El debate gira en torno a si la prima del 15 % es justa tras un 2T26 malo que dejó la unit en mínimos, y al riesgo de quedarse con una unit sin liquidez si no se acude [1].' },
      { plataforma: 'Renova Invest (blog de asesoría)', fecha: '2026-09', n_comentarios: null, tono: 'Neutro', resumen: 'Explica la permuta por BDR de la matriz y la presenta como decisión de cartera (cambiar riesgo Brasil por riesgo grupo) más que de precio [2].' },
      { plataforma: 'Money Times (reacción al anuncio)', fecha: '2026-07', n_comentarios: null, tono: 'Dividido', resumen: 'La unit sube un 13 % y «quema» parte de la prima: los minoritarios dudan entre vender en bolsa o esperar al canje [3].' },
    ],
    temas: [
      { tema: 'Prima de la oferta «baja» (OPA a precio de mínimos)', postura: 'Bajista', peso: 'Alto', contraste: 'Tiene base: el ratio se fijó sobre 25,25 BRL, mínimo de 52 semanas tras el 2T26; pero el valor intrínseco del método (17,8 BRL) está muy por debajo y el canje vale ≈ 27 BRL: la oferta paga más de lo que vale el banco con este Ke.' },
      { tema: 'Riesgo de quedarse fuera (liquidez, salida de la NYSE)', postura: 'Bajista', peso: 'Medio', contraste: 'Lo dice la propia matriz en sus preguntas y respuestas [C3].' },
      { tema: 'Canje por BDR de la matriz como diversificación', postura: 'Dividida', peso: 'Medio', contraste: 'Brasil pesa ≈ 15 % del beneficio ordinario del grupo: el canje reduce mucho la exposición al riesgo brasileño.' },
    ],
    lectura: 'El sentimiento particular no contradice al análisis: nadie defiende el banco por su ROE; la discusión es si aceptar o no el canje. Si la prima parece baja es porque el ROE del 12,5 % la justifica poco. No aporta ningún riesgo que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'foros de inversores (Reddit, Stocktwits, ADVFN Brasil)', tipo: 'Complemento', intentos: '1) API de Stocktwits (no probada por tiempo); 2) Reddit (403 habitual); 3) prensa con comentarios (usada)', decision: 'Omitido' }],
};
guarda('E', E);
console.log('Notas A-E escritas');
