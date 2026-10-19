// Escribe las notas A-E de Suzhou TFC Optical Communication (300394.SZ, corte 2026-10-19) a partir de los documentos de
// notas/docs (CNINFO y HKEXnews), de los estados F10 de Eastmoney (notas/em/*.json, la serie estructurada de los informes
// publicados, comprobada contra el anual 2025 y el semestral 2026), de bolsa.json, de yahoo-datos.json y de la consulta
// de Guba. Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/suzhou-tfc-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r4 = (x) => (x == null ? null : Math.round(x * 10000) / 10000);
const M = (x) => (x == null ? 0 : x / 1e6);
const porFecha = (f) => Object.fromEntries(lee(f).result.data.map((x) => [x.REPORT_DATE.slice(0, 10), x]));
const I = porFecha('em/GINCOME.json');
const BL = porFecha('em/GBALANCE.json');
const CF = porFecha('em/GCASHFLOW.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const CN = 'http://static.cninfo.com.cn/finalpage';

// Ampliaciones liberadas (转增): 10x8 (25-jun-2021), 10x4 (30-may-2024), 10x4 (9-jun-2025), 10x4 (12-jun-2026) [A9].
// Factor para pasar BPA, DPA y acciones de cada ejercicio a la base de hoy (1.090,8 M de acciones).
const FACTOR = { 2018: 1.8 * 1.4 ** 3, 2019: 1.8 * 1.4 ** 3, 2020: 1.8 * 1.4 ** 3, 2021: 1.4 ** 3, 2022: 1.4 ** 3, 2023: 1.4 ** 3, 2024: 1.4 ** 2, 2025: 1.4 };
// DPA por ejercicio en la base original (efectivo por acción de entonces) [A9]: 2025 = 0,5 a cuenta + 0,7 final; 2024 = 0,5 + 0,5.
const DPA_ORIG = { 2018: 0.36, 2019: 0.40, 2020: 0.60, 2021: 0.40, 2022: 0.50, 2023: 1.00, 2024: 1.00, 2025: 1.20 };
// Acciones de cierre en la base original (capital social, M) [A4]
const ACC_ORIG = { 2018: 198.90, 2019: 198.57, 2020: 198.57, 2021: 391.55, 2022: 393.98, 2023: 394.89, 2024: 553.97, 2025: 777.42 };
// En 2023, 2024 y 2025 el BPA reexpresado por la propia empresa en el siguiente informe ya está en la base de 777 M o de 554 M;
// pasamos todo a la base de hoy con el beneficio atribuido ÷ acciones medias equivalentes (acciones de cierre × factor).
const anios = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = anios.map((a) => {
  const x = I[`${a}-12-31`], c = CF[`${a}-12-31`];
  const resfin = -M(x.FINANCE_EXPENSE) + M(x.INVEST_INCOME) + M(x.FAIRVALUE_CHANGE_INCOME);
  const bai = M(x.TOTAL_PROFIT);
  const ebit = bai - resfin;
  const amort = M(c.FA_IR_DEPR) + M(c.IA_AMORTIZE) + M(c.LPE_AMORTIZE) + M(c.USERIGHT_ASSET_AMORTIZE);
  const neto = M(x.PARENT_NETPROFIT);
  const minor = a === '2023' ? 0 : M(x.NETPROFIT) - neto; // 2023: el F10 da −388,5 por error; beneficio total = atribuido [A1]
  const acc = ACC_ORIG[a] * FACTOR[a];
  return {
    periodo: a, ingresos: r1(M(x.TOTAL_OPERATE_INCOME)), coste_ventas: r1(M(x.OPERATE_COST)),
    gastos_generales: r1(M(x.SALE_EXPENSE) + M(x.MANAGE_EXPENSE) + M(x.RESEARCH_EXPENSE) + M(x.OPERATE_TAX_ADD)),
    ebitda: r1(ebit + amort), amortizaciones: r1(amort), ebit: r1(ebit), resultado_financiero: r1(resfin), bai: r1(bai),
    impuestos: r1(M(x.INCOME_TAX)), minoritarios: r1(minor), beneficio_neto: r1(neto), gastos_financieros: r2(M(x.FE_INTEREST_EXPENSE)),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: r4(neto / acc), dpa: r4(DPA_ORIG[a] / FACTOR[a]), dpa_extraordinario: 0, acciones_diluidas: r1(acc),
  };
});

const balance = anios.map((a) => {
  const x = BL[`${a}-12-31`];
  return {
    periodo: a, activo_total: r1(M(x.TOTAL_ASSETS)), activo_corriente: r1(M(x.TOTAL_CURRENT_ASSETS)), pasivo_corriente: r1(M(x.TOTAL_CURRENT_LIAB)),
    pasivo_total: r1(M(x.TOTAL_LIABILITIES)), fondo_comercio: r1(M(x.GOODWILL)), intangibles: r1(M(x.INTANGIBLE_ASSET)),
    inmovilizado_material: r1(M(x.FIXED_ASSET) + M(x.CIP)), existencias: r1(M(x.INVENTORY)),
    clientes: r1(M(x.ACCOUNTS_RECE) + M(x.NOTE_RECE) + M(x.FINANCE_RECE)), proveedores: r1(M(x.ACCOUNTS_PAYABLE) + M(x.NOTE_PAYABLE)),
    activos_contrato: null, pasivos_contrato: r1(M(x.CONTRACT_LIAB)) || null,
    // Caja = efectivo + depósitos estructurados y productos de tesorería a corto (交易性金融资产; en 2018-2019 en «otros activos corrientes») [A1, A4]
    caja: r1(M(x.MONETARYFUNDS) + M(x.TRADE_FINASSET_NOTFVTPL) + (M(x.OTHER_CURRENT_ASSET) > 200 ? M(x.OTHER_CURRENT_ASSET) : 0)),
    deuda_financiera: r1(M(x.SHORT_LOAN) + M(x.LONG_LOAN)), arrendamientos: r1(M(x.LEASE_LIAB)),
    patrimonio_neto: r1(M(x.TOTAL_PARENT_EQUITY)), minoritarios: r1(M(x.MINORITY_EQUITY)), reservas: r1(M(x.UNASSIGN_RPOFIT) + M(x.SURPLUS_RESERVE)),
  };
});

const flujos = anios.map((a) => {
  const c = CF[`${a}-12-31`];
  return {
    periodo: a, flujo_operativo: r1(M(c.NETCASH_OPERATE)), capex: r1(M(c.CONSTRUCT_LONG_ASSET)), pagos_arrendamientos: a >= '2021' ? 2 : 0,
    adquisiciones: a === '2024' ? r1(M(c.PAY_OTHER_FINANCE)) : 0, desinversiones: r1(M(c.DISPOSAL_LONG_ASSET)),
    dividendos: r1(M(c.ASSIGN_DIVIDEND_PORFIT)), recompras: 0, emision_acciones: r1(M(c.ACCEPT_INVEST_CASH)), intereses_en_financiacion: 0,
  };
});

// Trimestres (de los acumulados) [A4, A2, A3]
const acum = ['2024-06-30', '2024-09-30', '2024-12-31', '2025-03-31', '2025-06-30', '2025-09-30', '2025-12-31', '2026-03-31', '2026-06-30'];
const nombreT = { '03-31': '1T', '06-30': '2T', '09-30': '3T', '12-31': '4T' };
const q = {};
for (let k = 1; k < acum.length; k++) {
  const f = acum[k], prev = acum[k - 1];
  const x = I[f];
  const base = f.slice(5) === '03-31' ? null : I[prev];
  const v = (c) => M(x[c]) - (base ? M(base[c]) : 0);
  q[f] = { ingresos: v('TOTAL_OPERATE_INCOME'), neto: v('PARENT_NETPROFIT'), op: v('OPERATE_PROFIT'), fin: v('FINANCE_EXPENSE'), inv: v('INVEST_INCOME'), bai: v('TOTAL_PROFIT') };
}
q['2024-03-31'] = { ingresos: M(I['2024-03-31'].TOTAL_OPERATE_INCOME), neto: M(I['2024-03-31'].PARENT_NETPROFIT) };
q['2024-06-30'] = { ingresos: M(I['2024-06-30'].TOTAL_OPERATE_INCOME) - M(I['2024-03-31'].TOTAL_OPERATE_INCOME), neto: M(I['2024-06-30'].PARENT_NETPROFIT) - M(I['2024-03-31'].PARENT_NETPROFIT) };
const items = acum.slice(1).map((f) => {
  const fAnt = `${+f.slice(0, 4) - 1}${f.slice(4)}`;
  const t = q[f], tAnt = q[fAnt] || (f.slice(0, 4) === '2025' ? null : null);
  const ingAnt = q[fAnt]?.ingresos ?? (f === '2024-06-30' ? null : null);
  return {
    periodo: `${nombreT[f.slice(5)]}${f.slice(2, 4)}`, ingresos: r1(t.ingresos),
    crecimiento_pct: ingAnt ? r1((t.ingresos / ingAnt - 1) * 100) : null, crecimiento_organico_pct: null,
    ebitda: null, margen_ebitda_pct: null, bpa: r2(t.neto / 1088.4), vs_consenso: null,
  };
});
// Crecimientos interanuales de 2024 con los trimestres de 2023 [A4]
const q23 = { '2T': M(I['2023-06-30'].TOTAL_OPERATE_INCOME) - M(I['2023-03-31'].TOTAL_OPERATE_INCOME), '3T': M(I['2023-09-30'].TOTAL_OPERATE_INCOME) - M(I['2023-06-30'].TOTAL_OPERATE_INCOME), '4T': M(I['2023-12-31'].TOTAL_OPERATE_INCOME) - M(I['2023-09-30'].TOTAL_OPERATE_INCOME) };
for (const it of items) if (it.periodo.endsWith('24') && it.crecimiento_pct == null) it.crecimiento_pct = r1((it.ingresos / q23[it.periodo.slice(0, 2)] - 1) * 100);
const t = items.filter((x) => ['3T24', '4T24', '1T25', '2T25', '3T25', '4T25', '1T26', '2T26'].includes(x.periodo));

// LTM a 30-jun-2026 = 2S25 + 1S26 [A2, A4]
const s = (c, f) => M(I[f][c]);
const ltmIng = s('TOTAL_OPERATE_INCOME', '2025-12-31') - s('TOTAL_OPERATE_INCOME', '2025-06-30') + s('TOTAL_OPERATE_INCOME', '2026-06-30');
const ltmNeto = s('PARENT_NETPROFIT', '2025-12-31') - s('PARENT_NETPROFIT', '2025-06-30') + s('PARENT_NETPROFIT', '2026-06-30');
const ltmBai = s('TOTAL_PROFIT', '2025-12-31') - s('TOTAL_PROFIT', '2025-06-30') + s('TOTAL_PROFIT', '2026-06-30');
const ltmRes = (-s('FINANCE_EXPENSE', '2025-12-31') + s('INVEST_INCOME', '2025-12-31') + s('FAIRVALUE_CHANGE_INCOME', '2025-12-31'))
  - (-s('FINANCE_EXPENSE', '2025-06-30') + s('INVEST_INCOME', '2025-06-30') + (s('FAIRVALUE_CHANGE_INCOME', '2025-06-30') || 0))
  + (-s('FINANCE_EXPENSE', '2026-06-30') + s('INVEST_INCOME', '2026-06-30') + (s('FAIRVALUE_CHANGE_INCOME', '2026-06-30') || 0));
const ltmEbit = ltmBai - ltmRes;
const amortLtm = (M(CF['2025-12-31'].FA_IR_DEPR) - M(CF['2025-06-30'].FA_IR_DEPR) + M(CF['2026-06-30'].FA_IR_DEPR)) + 12; // + intangibles y largo plazo ≈ 12 M
const fcfLtm = M(CF['2025-12-31'].NETCASH_OPERATE) - M(CF['2025-06-30'].NETCASH_OPERATE) + M(CF['2026-06-30'].NETCASH_OPERATE)
  - (M(CF['2025-12-31'].CONSTRUCT_LONG_ASSET) - M(CF['2025-06-30'].CONSTRUCT_LONG_ASSET) + M(CF['2026-06-30'].CONSTRUCT_LONG_ASSET));
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r1(ltmIng), ebitda: r1(ltmEbit + amortLtm), ebit: r1(ltmEbit),
  beneficio_neto: r1(ltmNeto), bpa: r2(ltmNeto / 1088.4), dpa: r2(0.7 / 1.4 + 0.5), dpa_extraordinario: 0, fcf: r1(fcfLtm),
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
};

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025 年年度报告 (informe anual 2025: estados, notas, ingresos por producto y región, clientes, I+D, auditor, remuneraciones)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-04-08', url: `${CN}/2026-04-08/1225082705.PDF` },
  { id: 2, titulo: '2026 年半年度报告 (informe semestral 1S26: estados, ingresos por producto, escasez de materiales, pérdidas de cambio, accionistas)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-08-19', url: `${CN}/2026-08-19/1225480328.PDF` },
  { id: 3, titulo: '2026 年一季度报告 (informe del 1T26)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-04-21', url: `${CN}/2026-04-21/1225128020.PDF` },
  { id: 4, titulo: 'Estados financieros F10 de 300394 (cuenta, balance y flujos 2016-1S26 tal como se publicaron; comprobados con los informes de 2025 y 1S26)', editor: 'Eastmoney (东方财富) F10', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SZ300394' },
  { id: 5, titulo: '2026 年半年度业绩预告 (avance del 1S26: beneficio +25-45 %, escasez de algún material, pérdidas de cambio)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-07-18', url: `${CN}/2026-07-18/1225431394.pdf` },
  { id: 6, titulo: '2025 年度业绩预告 (avance de 2025: beneficio 1.881-2.150 M CNY)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-01-21', url: `${CN}/2026-01-21/1224943288.PDF` },
  { id: 7, titulo: 'Application Proof de la salida a bolsa de acciones H (secciones de negocio, clientes A-E, industria de Frost & Sullivan, información financiera 2023-2025)', editor: 'Suzhou TFC Optical Communication (HKEXnews)', tipo: 'Primaria', fecha: '2026-04-10', url: 'https://www1.hkexnews.hk/app/sehk/2026/108432/documents/sehk26041000707.pdf' },
  { id: 8, titulo: 'Composición de los ingresos por producto y región 2019-1S26 (主营构成)', editor: 'Eastmoney (东方财富) F10', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/BusinessAnalysis/Index?code=SZ300394' },
  { id: 9, titulo: '2025 年年度权益分派实施公告 (reparto de 2025: 4 acciones nuevas por cada 10 y 7 CNY por cada 10; ex-cupón 12-jun-2026) e historial de repartos 2017-2026', editor: 'Suzhou TFC Optical Communication (CNINFO) y Eastmoney F10', tipo: 'Primaria', fecha: '2026-06-05', url: `${CN}/2026-06-05/1225355962.PDF` },
  { id: 10, titulo: '关于拟变更会计师事务所的公告 (cambio de auditor: de Gongzheng Tianye, 16 años, a EY Hua Ming para 2026)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-08-13', url: `${CN}/2026-08-13/1225470838.PDF` },
  { id: 11, titulo: '2026 年限制性股票激励计划 (plan de acciones restringidas 2026: objetivos de beneficio 2027-2029) y anuncio de concesión del 8-oct-2026', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-10-08', url: `${CN}/2026-10-08/1225597867.PDF` },
];

const seg = (nombre, desc, h) => ({ nombre, descripcion: desc, tipo_resultado: null, historico: h.map(([p, v]) => ({ periodo: p, ingresos: v, resultado: null })) });
const A = {
  _estado: 'Completa. Sin XBRL en China: serie estructurada del F10 de Eastmoney comprobada contra el anual 2025 (ingresos 5.163,4; beneficio atribuido 2.017,3; caja 2.996,7) y el semestral 2026 (ingresos 2.827,9; beneficio 1.204,3). EBIT = beneficio antes de impuestos − resultado financiero (−gastos financieros netos con diferencias de cambio + resultado de inversiones + valor razonable); las subvenciones (otros ingresos, 51,2 M en 2025) quedan en el EBIT. BPA y DPA pasados a la base de hoy (1.090,8 M de acciones) con los factores de las ampliaciones liberadas de 2021, 2024, 2025 y 2026.',
  financieros: {
    cuenta, ltm, cambios_perimetro: [],
    comentario: 'Las ventas pasan de 442,9 M CNY en 2018 a 5.163,4 M en 2025 (+58,8 % en 2025, +67,7 % en 2024) y el beneficio atribuido de 135,5 a 2.017,3 M; todo es crecimiento orgánico: la única compra es pequeña (Beijiguang, 2020, fondo de comercio de 29,7 M) [A1, A4]. El salto empieza en 2023 con los motores ópticos para módulos de 800G de los centros de datos de IA: los componentes activos (motores ópticos) pasan de 217,8 M en 2022 a 2.997,9 M en 2025 y los pasivos de 959,9 a 2.084,4 M [A8, A1]. El margen bruto de 2025 baja 3,3 puntos (53,96 %) por la mezcla hacia activos (46,6 % de margen bruto frente a 63,7 % de los pasivos). En el 1S26 las ventas solo crecen un 15,2 % (2.827,9 M): los activos caen un 19,6 % por la falta de algún material (chips láser) y los pasivos crecen un 77,4 % con un margen bruto del 71,9 %; el margen bruto total sube a 60,9 % y el beneficio crece un 33,9 % [A2, A5]. Las pérdidas de cambio (47,5 M en 2025; 85,8 M en el 1S26) van al resultado financiero.',
    ajustes: 'Cifras publicadas (normas contables chinas, CAS), sin ajustes. Partidas no recurrentes según la empresa: 40,8 M en 2025 (beneficio sin no recurrentes 1.976,5 M) y 18,0 M en el 1S26 (1.186,3 M), sobre todo subvenciones y rendimiento de la tesorería; no se ajustan porque se repiten cada año y son menos del 2 % del beneficio [A1, A2]. Las subvenciones incluidas en «otros ingresos» (51,2 M en 2025, 30,6 M en el 1S26) se quedan en el EBIT. El pago en acciones (planes de 2023 y 2026) es gasto en la cuenta. En 2023 el F10 da por error unos minoritarios de −388,5 M: el anual da beneficio total = atribuido (729,9 M) y se pone 0.',
    confianza: 'Alta',
  },
  trimestres: {
    items: t,
    ultima_presentacion: 'La empresa no publica transcripciones; lo que dice la dirección sale del semestral, de los avances y de las reuniones con inversores que recoge la prensa. En el avance del 1S26 (18-jul) y en el semestral (19-ago) la dirección atribuye el crecimiento a la demanda de IA y explica que «la falta de algún material» frenó la subida de producción de los componentes activos (los motores ópticos de 1,6T), y que las pérdidas de cambio subieron los gastos financieros [A5, A2]. El semestral añade que la planta de Tailandia sube producción en pasivos y activos, que la segunda fase de Jiangxi entró en uso y que la nueva sede y la «superfábrica» de Suzhou entrarán en uso desde 2027 [A2]. En julio el secretario del consejo dijo que la cartera de pedidos es «muy abundante» y que la oferta de chips mejoraría desde el 3T-4T [D8]. Lo que no se ha cuantificado: cuánto de la caída de los activos es material y cuánto cambio de producto del cliente A (Fabrinet, para Nvidia), ni el calendario de los motores para CPO.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja 2.905,8 M CNY + depósitos estructurados y productos de tesorería 272,2 M a 30-jun-2026; sin deuda bancaria; líneas de crédito bancarias solicitadas en agosto de 2026 [A2].',
    rating: 'Sin rating',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Sin deuda financiera desde 2022 (préstamos de 1-7 M en 2020-2021) y arrendamientos de 2-6 M [A1, A4]. Pasivos de contrato (anticipos de clientes) de 112,1 M a 30-jun-2026 (160,6 M al cierre de 2025) [A2]. Subvenciones diferidas de 23,5 M. Sin garantías a terceros ni litigios relevantes declarados [A1]. Compromisos: la nueva sede y la superfábrica de Suzhou (en construcción, entrada en uso desde 2027) y la ampliación de Tailandia, que suben el capex al 10,9 % de las ventas en el 1S26 (308,3 M) [A2]. Coberturas de divisa aprobadas en abril de 2026 para las ventas en USD [A1].',
    comentario: 'El circulante sube con el crecimiento: existencias de 457,2 M a 928,8 M en seis meses (acopio de materiales escasos y producto en curso) y clientes de 1.124 a 1.454 M, compensado en parte por proveedores y efectos a pagar (de 495 a 982 M) [A2]. La caja neta (≈ 3.180 M con la tesorería a corto) no ha bajado pese a pagar 545 M de dividendo en el 1S26, y el 17-sep pagó otros 545 M [A9]. Balance sin riesgo financiero; el riesgo está en el circulante si un cliente frena.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La caja de explotación acompaña al beneficio: 1.868 M en 2025 (93 % del beneficio atribuido) y 1.001 M en el 1S26 (83 %) [A4]. El capex sube de 112 M en 2022 a 418 M en 2025 y 308 M en el 1S26 (Tailandia, Jiangxi fase 2, sede y superfábrica de Suzhou): es sobre todo de crecimiento; el de mantenimiento se estima en lo que se amortiza (≈ 170-200 M al año, estimación propia). El reparto es alto: 667 M de dividendos en 2025 (33 % del beneficio, con la política de 2026-2028 de repartir en efectivo ≥ 30 % del beneficio distribuible) [A1]. En 2024 hay 235,5 M de «otros pagos de financiación», que se tratan como compra de minoritarios (los minoritarios del balance bajan de 170,7 a 6,4 M) [A4]. La emisión de 2021 (789,7 M) es la ampliación privada para Jiangxi.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Gongzheng Tianye (公证天业) para 2025; EY Hua Ming (安永华明) propuesto para 2026', anios_auditor: 16, opinion: 'Favorable (2025)',
    comentario: 'Cuentas sencillas: sin deuda, sin compras relevantes y sin capitalización de I+D (266,6 M de I+D a gastos en 2025) [A1]. Tres cosas que mirar. (1) Concentración: el primer cliente (Fabrinet, según la descripción del folleto H: empresa de empaquetado óptico de las islas Caimán que cotiza en la NYSE) da el 63,9 % de las ventas y los cinco primeros el 90,6 % [A7]: el cobro es bueno (cobros reales del 99 % de lo vendido en Asia) [A1]. (2) Cambio de auditor en agosto de 2026 tras 16 años, a una de las cuatro grandes, explicado por la salida a bolsa en Hong Kong y la complejidad fuera de China [A10]: no es una alarma, pero el primer ejercicio auditado por EY es 2026. (3) El margen bruto del 1S26 (60,9 %) es el más alto de su historia por la mezcla (pasivos 71,9 %); no es repetible si vuelven los activos. Sobre los indicadores del motor: con caja neta y beneficio creciente, el Altman Z sale muy alto y el Beneish M lo mueve el crecimiento de clientes y existencias, que acompaña a las ventas.',
    senales: [
      { senal: 'Concentración extrema de clientes (63,9 % el primero; 90,6 % los cinco primeros)', nivel: 'Alta', comentario: 'Riesgo de negocio más que contable; cobros al día [A7, A1].' },
      { senal: 'Cambio de auditor tras 16 años (a EY Hua Ming)', nivel: 'Baja', comentario: 'Motivado por la salida a Hong Kong; sin desacuerdos declarados [A10].' },
      { senal: 'Existencias que se doblan en seis meses (457 → 929 M)', nivel: 'Media', comentario: 'Acopio de material escaso y producto en curso; vigilar provisiones (deterioro de existencias de 32,4 M en 2025) [A2, A4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo en efectivo dos veces al año: 1,20 CNY por acción de entonces por 2025 (0,86 en la base de hoy) y 0,50 a cuenta de 2026 (545,4 M, pagado el 17-sep) [A9]. Plan de rentabilidad al accionista 2026-2028: reparto en efectivo de al menos el 30 % del beneficio distribuible de cada año si no hay grandes inversiones [A1]. Ampliaciones liberadas cada año (10x4 en 2024, 2025 y 2026), que no cambian el valor. El 15-oct-2026 el accionista de control propuso recomprar entre 100 y 150 M CNY para amortizar (≈ 0,06 % del capital) [D8]. Prioridades: capacidad (Tailandia, Jiangxi, superfábrica de Suzhou), I+D (CPO, silicio fotónico, niobato de litio) y la salida a Hong Kong.',
    adquisiciones: [
      { anio: '2020', objetivo: 'Beijiguang (北极光电, Shenzhen): componentes ópticos', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; fondo de comercio de 29,7 M sin deterioro hasta 2026 [A1].' },
      { anio: '2026', objetivo: 'SuperX Optical Communications (Singapur), 35 % de una sociedad conjunta con SuperX AI', importe: 2.7, ev_ebitda: null, financiacion: 'Caja (0,7 M SGD)', resultado: 'Constituida en junio de 2026; comercializadora de equipos ópticos [A1].' },
    ],
    comentario: 'La dirección asigna el capital con disciplina: crece casi sin comprar empresas, sin deuda y con dividendos del 30-50 % del beneficio. El ROIC lo mueve el margen, no el apalancamiento. Dos dudas: la salida a bolsa en Hong Kong (hasta el 10 % del capital tras la emisión más un 15 % de sobreasignación) diluye un 11-13 % a los accionistas actuales cuando la empresa no necesita la caja (≈ 3.180 M de caja neta) [D7]; y la superfábrica de Suzhou dobla el capex justo en el pico del ciclo.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      seg('Componentes pasivos', 'Microópticas, FAU (agrupaciones de fibra), conectores y soluciones pasivas de multiplexado para módulos ópticos de centros de datos y telecomunicaciones [A1].', [['2021', 920.1], ['2022', 959.9], ['2023', 1183.3], ['2024', 1576.3], ['2025', 2084.4]]),
      seg('Componentes activos (motores ópticos)', 'Motores ópticos multicanal de alta velocidad (800G y 1,6T) y empaquetado de óptica activa, sobre todo para el cliente A [A1, A7].', [['2021', 85.0], ['2022', 217.8], ['2023', 745.9], ['2024', 1655.3], ['2025', 2997.9]]),
      seg('Otros', 'Otros ingresos (materiales, servicios) [A1].', [['2021', 27.3], ['2022', 18.7], ['2023', 9.4], ['2024', 20.1], ['2025', 81.1]]),
    ],
    geografias: [{ nombre: 'Exterior (sobre todo Asia: Tailandia)', peso_pct: 74.35 }, { nombre: 'China', peso_pct: 25.65 }],
    geografias_criterio: 'origen',
    clientes: 'Concentración extrema y creciente: el primer cliente da el 54,0 % de las ventas en 2023, el 62,2 % en 2024 y el 63,9 % en 2025 (3.268,8 M CNY), y los cinco primeros el 82,2 %, 87,5 % y 90,6 % [A7]. El folleto H describe al cliente A como una empresa de empaquetado óptico y fabricación óptica de precisión de las islas Caimán que cotiza en la NYSE (la descripción coincide con Fabrinet, que fabrica transceptores para Nvidia); el B es una empresa de semiconductores sin fábrica de EE. UU. del Nasdaq; el C fabrica láseres y optoelectrónica en la NYSE; el D y el E son fabricantes de módulos de Shenzhen [A7]. Relación con el A desde 2018. Del exterior, 3.766,8 M se venden en Asia sin China y solo 66,2 M en Norteamérica [A1]. Poder de precios: margen bruto de los pasivos del 63,7 % en 2025 y del 71,9 % en el 1S26 [A1, A2], pero los activos (46-47 %) dependen de un cliente que fija el volumen.',
    kpis: [
      { kpi: 'Unidades vendidas (millones)', valor_anterior: '208,8 (2024)', valor_actual: '254,2 (2025)', variacion: '+21,8 %', comentario: 'Producción 473,8 M de unidades (+42,6 %) [A1].' },
      { kpi: 'Margen bruto', valor_anterior: '57,2 % (2024)', valor_actual: '60,9 % (1S26)', variacion: '+3,7 pp', comentario: '53,96 % en 2025 por la mezcla hacia activos [A1, A2].' },
      { kpi: 'Primer cliente (% de ventas)', valor_anterior: '62,2 % (2024)', valor_actual: '63,9 % (2025)', variacion: '+1,7 pp', comentario: 'Los cinco primeros, 90,6 % [A7].' },
      { kpi: 'I+D (% de ventas)', valor_anterior: '5,2 % (2025)', valor_actual: '6,9 % (1S26)', variacion: '+1,7 pp', comentario: '194,9 M en el 1S26, +55 % [A2].' },
      { kpi: 'Plantilla de I+D', valor_anterior: '549 (2024)', valor_actual: '774 (2025)', variacion: '+41,0 %', comentario: 'Plantilla total 5.127 [A1].' },
    ],
  },
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del anual 2025: sin préstamos; 2) semestral 2026: sin préstamos; 3) F10: deuda bancaria 0', decision: 'Omitido (no hay deuda)' },
    { seccion: 'trimestres', campo: 'ebitda trimestral y comparación con el consenso', tipo: 'Complemento', intentos: '1) Informes trimestrales (no dan amortización trimestral); 2) F10 de Eastmoney (solo acumulados semestrales); 3) prensa (sin consenso trimestral publicado)', decision: 'Omitido' },
  ],
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Application Proof H: «Industry Overview» (informe de Frost & Sullivan encargado por la empresa: inversión en IA, mercado de interconexión óptica y de componentes ópticos, cuotas 2025)', editor: 'Suzhou TFC Optical Communication (HKEXnews) / Frost & Sullivan', tipo: 'Sectorial', fecha: '2026-04-10', url: 'https://www1.hkexnews.hk/app/sehk/2026/108432/documents/sehk26041000707.pdf' },
  { id: 2, titulo: '2025 年年度报告: negocio, competencia, capacidad y riesgos', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-04-08', url: `${CN}/2026-04-08/1225082705.PDF` },
  { id: 3, titulo: 'Datos de Innolight, Eoptolink, Fabrinet, Coherent, Lumentum, Accelink, T&S y Yuanjie (ventas, EBITDA, consenso)', editor: 'Yahoo Finance quoteSummary', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/300308.SZ' },
  { id: 4, titulo: '短期调整不改光通信高景气底色 (Guosheng y GF Securities: demanda de 800G y 1,6T en 2026-2027 y escasez hasta 2028; TFC: pedidos «muy abundantes»)', editor: '10jqka (同花顺财经)', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://stock.10jqka.com.cn/20260728/c678498990.shtml' },
  { id: 5, titulo: 'Rumor de restricción de la FCC a los módulos ópticos chinos y desmentido de Innolight («la FCC no ha emitido documentos restrictivos»)', editor: '10jqka (同花顺财经)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://stock.10jqka.com.cn/20260805/c678681238.shtml' },
  { id: 6, titulo: '2026 年半年度报告: escasez de materiales, Tailandia, CPO y silicio fotónico', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-08-19', url: `${CN}/2026-08-19/1225480328.PDF` },
];
const yv = (tk) => Y[tk];
const usd = 6.6695;
const comp = (nombre, tk, pais, cuota, nota) => {
  const y = yv(tk); const fx = y.divisa === 'USD' ? usd : 1;
  return { nombre, pais, ticker: tk, ingresos: r1(y.ventas / 1e6 * fx), cuota_pct: cuota, margen_ebit_pct: null, comentario: nota };
};
const B_ = {
  _estado: 'Completa. Tamaño y cuotas de Frost & Sullivan (folleto H, encargado por la empresa: tiende a ser optimista); segunda referencia con la inversión en IA del mismo informe y el consenso de los fabricantes de módulos. Márgenes EBIT de competidores: no se cotejaron con sus cuentas (hueco).',
  sector: {
    definicion: 'Mercado relevante: componentes ópticos (pasivos y activos) que se venden a los fabricantes de transceptores y módulos ópticos para centros de datos y telecomunicaciones, en todo el mundo. Frost & Sullivan lo mide por ventas externas de componentes: 6.054 M USD en 2025, con TFC primera (11,7 %) [B1]. Es una parte del mercado de interconexión óptica (22,7 bn USD en 2025, 71 % centros de datos) [B1]. Se usa el de componentes porque es el que corresponde a lo que vende TFC; el de interconexión sirve de contraste. Las cifras de Frost & Sullivan son de un informe encargado por la empresa para su salida a bolsa: se toman como techo, no como centro.',
    tamano: '≈ 6.054 M USD (≈ 40.400 M CNY) en 2025; 22,9 bn USD previstos en 2030 (+30,5 % anual) según Frost & Sullivan [B1]',
    unidad_serie: 'millones de USD (componentes ópticos para interconexión, Frost & Sullivan)',
    serie: [{ anio: '2021', tamano: 3440 }, { anio: '2025', tamano: 6054 }, { anio: '2030e', tamano: 22900 }],
    tcac_historico_pct: 15.4, tcac_previsto_pct: 30.5, cr5_pct: 25.4, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión en infraestructura de IA (centros de datos)', efecto: '+', horizonte: 'Cíclico', evidencia: 'De 146,6 bn USD en 2023 a 440 bn en 2025 y 913,7 bn previstos en 2030 (+22,2 % anual) [B1].' },
      { driver: 'Paso de 800G a 1,6T y 3,2T', efecto: '+', horizonte: 'Estructural', evidencia: 'Más canales por módulo = más componentes por unidad; el mercado de componentes de alta velocidad pasa de 2,0 bn USD en 2025 a 19,6 bn en 2030 según F&S [B1].' },
      { driver: 'Óptica coempaquetada (CPO) y silicio fotónico', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Mercado de CPO de 28,6 bn USD en 2030 según F&S [B1]; cambia quién empaqueta (el fabricante del conmutador o del chip) y puede reducir el contenido de componentes discretos.' },
      { driver: 'Escasez de chips láser (EML) y otros materiales', efecto: '−', horizonte: 'Cíclico', evidencia: 'Frenó los componentes activos de TFC en el 1S26 (−19,6 %) [B6]; GF Securities espera escasez hasta 2028 [B4].' },
      { driver: 'Política comercial EE. UU.-China', efecto: '−', horizonte: 'Estructural', evidencia: 'Rumor de restricción de la FCC en agosto de 2026, desmentido [B5]; TFC produce en Tailandia para no depender de China [B2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Mercado fragmentado (los cinco primeros 25,4 %) pero en alta velocidad pocos proveedores cumplen los requisitos de los grandes clientes [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'El primer cliente es el 63,9 % de las ventas de TFC y los cinco primeros el 90,6 %; Innolight y Eoptolink hacen parte de los componentes ellos mismos [B2, B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Chips láser (EML, CW) escasos y en pocas manos (Lumentum, Coherent, Broadcom, Mitsubishi, Yuanjie): frenaron el 1S26 [B6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras de calificación y de precisión; pero el mercado crece tanto que atrae capacidad china nueva (T&S, Shijia, Yuanjie) [B1, B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Cobre (AEC, DAC) en distancias cortas y CPO o silicio fotónico, que integran funciones que hoy son componentes [B1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La inversión en IA crece todavía (Frost & Sullivan: 440 bn USD en 2025, 535 en 2026e) y los módulos de 800G y 1,6T van con escasez [B1, B4]. Indicadores: capex de los grandes de la nube, pedidos de Nvidia y consenso de Innolight y Eoptolink (ventas 2027e ×2 sobre 2026e) [B3]. El sector es cíclico: en 2022 la acción de TFC cayó un 30 % y sus ventas solo crecieron un 16 % al frenar la inversión en telecomunicaciones; en 2019-2020 dependía de las redes 5G chinas [B2].' },
    regulacion: 'Controles de exportación de EE. UU. sobre chips de IA a China (no afectan a lo que TFC vende fuera, pero sí a la demanda china), aranceles de EE. UU. a productos chinos (TFC vende solo 66 M a Norteamérica y produce en Tailandia) [B2] y el rumor de agosto de 2026 de una restricción de la FCC a módulos ópticos chinos, desmentido por Innolight [B5]. China controla desde 2023 la exportación de galio y germanio, materiales de los chips láser. La salida a bolsa en Hong Kong necesita el registro de la CSRC [B2].',
    tendencias: 'Tres cambios: (1) velocidad (800G a 1,6T en 2026-2027 y 3,2T después), que sube el contenido de componentes y favorece a TFC; (2) CPO y silicio fotónico, donde TFC dice tener productos (ELS, motores para CPO) pero el empaquetado pasa a fabricantes de chips y conmutadores; (3) relocalización fuera de China (Tailandia), que TFC ya hizo [B1, B6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 11.7,
    posicion: '1.º mundial en componentes ópticos para interconexión (11,7 % en 2025) y primero en FAU, según Frost & Sullivan [B1].',
    competidores: [
      comp('Innolight (Zhongji Innolight)', '300308.SZ', 'CN', null, 'Primer fabricante de módulos; cliente (D o E) y a la vez competidor en componentes propios [B3].'),
      comp('Eoptolink', '300502.SZ', 'CN', null, 'Fabricante de módulos; cliente y competidor parcial [B3].'),
      comp('Coherent', 'COHR', 'US', null, 'Láseres y componentes; cliente C y proveedor [B3, B2].'),
      comp('Lumentum', 'LITE', 'US', null, 'Chips láser y componentes activos; compite en motores y en CPO [B3].'),
      comp('Accelink', '002281.SZ', 'CN', null, 'Componentes y módulos ópticos (China Information Communication Technologies) [B3].'),
      comp('T&S Communications', '300570.SZ', 'CN', null, 'Conectores y componentes pasivos (MPO, FA) [B3].'),
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Calificación larga con cada cliente y diseño a medida en cada generación; relación con el cliente A desde 2018 [B2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Plataformas propias de diseño y empaquetado; I+D del 5-7 % de las ventas [B2, B6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen bruto de los pasivos del 63,7-71,9 % y ROIC muy por encima de los fabricantes de módulos [B2, B6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primera en componentes con el 11,7 %, 2,3 veces la segunda [B1].' },
      ],
    },
    amenazas: 'La amenaza principal es el poder del cliente: el A (63,9 %) puede repartir los motores ópticos entre más proveedores o hacerlos él mismo, y los fabricantes de módulos chinos integran componentes. La segunda es tecnológica: con CPO y silicio fotónico el empaquetado lo hacen los fabricantes de chips y conmutadores (Nvidia, Broadcom, TSMC), y TFC tiene que ganar el contrato de nuevo. Probabilidad media en 3-5 años [B1, B3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'TFC (Suzhou TFC Optical Communication, «天孚通信») diseña y fabrica componentes ópticos para los módulos que conectan los servidores y conmutadores de los centros de datos: componentes pasivos (microópticas, FAU o agrupaciones de fibra, conectores, filtros) y motores ópticos activos multicanal de 800G y 1,6T, además de empaquetado por encargo [B2]. Vende a fabricantes de módulos y de equipos (Fabrinet para Nvidia, Innolight, Eoptolink, Coherent) [B2]. Fabrica en Jiangxi (Gao’an) y Tailandia (Chonburi), con I+D en Suzhou, Shenzhen y Japón y sede doble en Suzhou y Singapur [B6].',
    como_gana_dinero: 'Cobra por pieza a clientes industriales con pedidos por generación de producto. El margen bruto es alto en pasivos (63,7 % en 2025; 71,9 % en el 1S26) y medio en activos (46-47 %), así que la mezcla mueve el margen total [B2, B6]. Hay apalancamiento operativo: los gastos generales y de I+D son el 9 % de las ventas. Nada es recurrente por contrato: el volumen lo marca el ciclo de inversión de la nube y el cliente A; cada generación (400G, 800G, 1,6T) se vuelve a ganar. Sin estacionalidad clara; sí escalones con los lanzamientos de Nvidia.',
  },
  huecos: [
    { seccion: 'competencia', campo: 'margen_ebit_pct de los competidores y cuota de cada uno', tipo: 'Complemento', intentos: '1) Folleto H (anonimiza a los competidores A-D); 2) Yahoo (EBITDA, no EBIT, en bases distintas); 3) informes anuales de Innolight y Eoptolink (venden módulos, no componentes: la cuota no es comparable)', decision: 'Omitido' },
  ],
  fuentes: fB,
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025 年年度报告: consejo, directivos, remuneraciones, participaciones, control', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-04-08', url: `${CN}/2026-04-08/1225082705.PDF` },
  { id: 2, titulo: '2026 年半年度报告: diez primeros accionistas a 30-jun-2026', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-08-19', url: `${CN}/2026-08-19/1225480328.PDF` },
  { id: 3, titulo: '股东询价转让结果报告书 (venta del accionista de control por subasta: 3,011 M de acciones a 140 CNY)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2025-11-25', url: `${CN}/2025-11-25/1224825008.PDF` },
  { id: 4, titulo: 'Plan y cierre de las ventas de directivos (Wang Zhihong, Chen Kairong, Wu Wentai)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-01-29', url: `${CN}/2026-01-29/1224956716.PDF` },
  { id: 5, titulo: '关于收到控股股东提议回购公司股份的提示性公告 (propuesta de recompra del accionista de control)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225607301.PDF` },
  { id: 6, titulo: 'Acuerdos del consejo sobre la emisión de acciones H (hasta el 10 % del capital tras la emisión y 15 % de sobreasignación)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-03-17', url: `${CN}/2026-03-17/1225011864.PDF` },
  { id: 7, titulo: 'Avances de resultados de 2025 y del 1S26', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-07-18', url: `${CN}/2026-07-18/1225431394.pdf` },
  { id: 8, titulo: 'Plan de acciones restringidas 2026 (objetivos de beneficio 2027-2029; 2,28 M de acciones a 119,5 CNY)', editor: 'Suzhou TFC Optical Communication (CNINFO)', tipo: 'Primaria', fecha: '2026-08-13', url: `${CN}/2026-08-13/1225470829.PDF` },
];
const C = {
  _estado: 'Completa. Anual 2025 (consejo, remuneración, participaciones), semestral 2026 (accionistas), anuncios de ventas de 12 meses. Sin voto consultivo de remuneración en China (la junta aprueba el plan de remuneración del año): votos en `null`.',
  directivos: {
    equipo: [
      { nombre: 'Zou Zhinong (邹支农)', cargo: 'Presidente y director técnico; cofundador', desde: '2005', participacion_pct: null, trayectoria: 'Fundó en 2005 la empresa con Zhu Guodong; presidente y director general hasta 2018 y presidente desde entonces. Con Ou Yang, controla Tianfu Renhe (37,47 %) [C1, C2].' },
      { nombre: 'Ou Yang (欧洋)', cargo: 'Consejera y directora general', desde: '2018', participacion_pct: null, trayectoria: 'En la empresa desde 2005; directora general desde enero de 2018, periodo en el que las ventas pasaron de 338 M a 5.163 M CNY. Es la otra controladora (pareja de control con Zou Zhinong) [C1].' },
      { nombre: 'Wang Zhihong (王志弘)', cargo: 'Consejero y subdirector general', desde: '2011', participacion_pct: 0.11, trayectoria: 'Ingeniero de fabricación en Taiwán; dirige la parte de fabricación de precisión. Vendió 394.800 acciones a 218,97 CNY en enero de 2026 [C1, C4].' },
      { nombre: 'Wu Wentai (吴文太)', cargo: 'Director financiero', desde: '2020', participacion_pct: 0.01, trayectoria: 'Procede de Positec (宝时得) y ENN; director financiero desde octubre de 2020 [C1].' },
      { nombre: 'Chen Kairong (陈凯荣)', cargo: 'Subdirector general y secretario del consejo', desde: '2017', participacion_pct: 0.02, trayectoria: 'Relación con inversores y mercado de capitales; lleva la salida a Hong Kong [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Avance de enero de 2026: beneficio atribuido de 1.881-2.150 M CNY', real: '2.017,3 M', cumplida: 'Sí' },
      { anio: '1S26', guia: 'Avance de julio de 2026: beneficio de 1.124-1.304 M CNY', real: '1.204,3 M', cumplida: 'Sí' },
      { anio: '2027-2029', guia: 'Objetivos del plan de acciones de 2026: beneficio sin no recurrentes +150 % en 2027, +400 % en 2028 y +700 % en 2029 sobre 2025 (umbrales +120 %, +320 %, +560 %)', real: 'Pendiente', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo fundador estable: presidente y directora general son los controladores desde 2005 y no hay cambios en la cúpula en 24 meses. La empresa no da guía anual; sus avances de resultados han acertado (2025 y 1S26 dentro del rango) [C7]. La señal más fuerte es el plan de acciones de 2026: exige un beneficio de 4.941 M en 2027 y 9.882 M en 2028 para cobrarlo entero (frente a 1.976 M en 2025) [C8]; dice lo que la dirección cree posible, pero el plan es pequeño (0,21 % del capital) y el umbral mínimo de 2028 (+320 %) sigue siendo cuatro veces 2025. Sucesión: sin plan publicado.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Zou Zhinong', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2005', comisiones: 'Estrategia' },
      { nombre: 'Ou Yang', cargo: 'Consejera, directora general', tipo: 'Ejecutivo', desde: '2011', comisiones: '—' },
      { nombre: 'Wang Zhihong', cargo: 'Consejero, subdirector general', tipo: 'Ejecutivo', desde: '2011', comisiones: '—' },
      { nombre: 'Zhu Songgen', cargo: 'Consejero representante de los trabajadores', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Geng Huimin', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Lu Lin', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración' },
      { nombre: 'Du Linlin', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 2.56, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: 26 },
    remuneracion: 'Remuneración baja para el tamaño: la directora general cobró 2,56 M CNY en 2025 y el presidente 2,27 M; el total de consejeros y directivos fue de 11,07 M [C1]. Al menos el 50 % es variable según el resultado anual, con una parte diferida hasta después de la auditoría [C1]. El largo plazo son las acciones restringidas (2023 y 2026), ligadas al beneficio sin no recurrentes: premian crecer, no el capital empleado; los controladores no participan en el plan. Ratio frente al coste medio por empleado ≈ 26 veces (estimación propia: 509,8 M de pagos al personal ÷ 5.127 empleados). Sin cláusula de recuperación publicada.',
    accionistas: [
      { nombre: 'Suzhou Tianfu Renhe Investment (controlada por Zou Zhinong y Ou Yang)', pct: 37.47, tipo: 'Control', variacion: 'Vendió 3,011 M de acciones (0,39 %) a 140 CNY en noviembre de 2025 por subasta privada; propuso la recompra del 15-oct-2026 [C2, C3, C5]' },
      { nombre: 'Zhu Guodong (cofundador)', pct: 6.97, tipo: 'Persona física (extranjera)', variacion: 'Sin cambios salvo la ampliación liberada [C2]' },
      { nombre: 'HKSCC (inversores de Stock Connect)', pct: 3.39, tipo: 'Institucional', variacion: 'Sube con la ampliación liberada [C2]' },
      { nombre: 'Fondo cotizado Guotai CSI de equipos de comunicaciones', pct: 1.13, tipo: 'Fondo', variacion: 'Compras en el 1S26 [C2]' },
    ],
    insiders: [
      { fecha: '2025-11-21', persona: 'Tianfu Renhe (accionista de control)', operacion: 'Venta', acciones: 3011000, importe: 421.54 },
      { fecha: '2026-01-28', persona: 'Wang Zhihong (consejero)', operacion: 'Venta', acciones: 394800, importe: 86.45 },
      { fecha: '2026-01-09', persona: 'Chen Kairong y Wu Wentai (directivos)', operacion: 'Venta', acciones: 80000, importe: null },
    ],
    control_y_defensas: 'La pareja fundadora (Zou Zhinong y Ou Yang) controla el 37,47 % a través de Tianfu Renhe y ocupa la presidencia y la dirección general; el cofundador Zhu Guodong tiene el 6,97 % [C1, C2]. Una acción, un voto; sin blindajes. El consejo tiene 7 miembros, 3 independientes (la comisión de auditoría la preside una independiente). Tras la emisión de acciones H (hasta el 10 % del capital) el control bajaría a ≈ 33 % [C6]. Sin operaciones vinculadas relevantes ni préstamos al accionista (informe especial de 2025) [C1].',
    alertas: [
      'El accionista de control vendió en noviembre de 2025 (421,5 M CNY a 140 CNY por acción, ≈ 100 CNY en la base de hoy) solo el 35 % de lo previsto (8,5 M de acciones) [C3].',
      'Ventas de directivos en enero de 2026 (consejero Wang Zhihong, 394.800 acciones a 218,97 CNY, ≈ 156 en la base de hoy), declaradas para pagar impuestos del plan de acciones [C4].',
      'Cambio de auditor en agosto de 2026 tras 16 años (a EY Hua Ming) [C1].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto de la remuneración y desglose fijo/variable del primer ejecutivo', tipo: 'Complemento', intentos: '1) Anual 2025 (solo total por persona); 2) actas de las juntas de 2025 y 2026 (aprueban el plan, sin porcentajes por punto en el resumen); 3) informe de sostenibilidad 2025', decision: 'Omitido' },
  ],
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 300394.SZ, 510300.SS (CSI 300) y 515050.SS (ETF de comunicaciones 5G)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/300394.SZ/history' },
  { id: 2, titulo: 'Cotización de 300394 al cierre del 19-oct-2026 (203,30 CNY; 1.090,8 M de acciones)', editor: 'Tencent Finance (qt.gtimg.cn) y Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://qt.gtimg.cn/q=sz300394' },
  { id: 3, titulo: 'Previsiones de beneficio de 300394 (盈利预测): media de seis meses, 15 casas con fecha, recomendaciones', editor: 'Eastmoney (东方财富) F10', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/ProfitForecast/Index?code=SZ300394' },
  { id: 4, titulo: 'Consenso, objetivos y múltiplos de TFC y de sus comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/300394.SZ/analysis' },
  { id: 5, titulo: 'Curva de deuda pública china (中债国债收益率曲线): 10 años 1,6497 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 6, titulo: 'Implied ERP by month (T12m with sustainable payout): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Anuncio de la solicitud de acciones H y acuerdos del consejo (tamaño de la emisión) y estado en HKEXnews (solicitud activa, 1.ª presentación del 10-abr-2026)', editor: 'Suzhou TFC Optical Communication (CNINFO) y HKEXnews', tipo: 'Primaria', fecha: '2026-10-19', url: `${CN}/2026-04-10/1225094554.PDF` },
  { id: 8, titulo: '光器件龙头天孚通信控股股东提议回购 (propuesta de recompra de 100-150 M CNY, 15-oct-2026)', editor: '21jingji (21财经)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://m.21jingji.com/article/20261015/herald/845c57cde2f68da23eb27b31719b3d74.html' },
  { id: 9, titulo: 'Caída de julio de 2026 tras el avance del 1S26 (−13,42 % el 17-jul; escasez de chips EML de 200G)', editor: 'Sina Finance (新浪财经)', tipo: 'Prensa', fecha: '2026-07-17', url: 'https://finance.sina.com.cn/stock/aiassist/ggsp/2026-07-17/doc-iniiaxpf8236993.shtml' },
  { id: 10, titulo: 'Lista de valores de SZSE elegibles en Stock Connect (compra y venta), actualizada el 16-oct-2026, y FAQ de Stock Connect (ChiNext solo para inversores profesionales institucionales; versión del 6-jul-2026)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SZSE_Securities.xls' },
  { id: 11, titulo: 'Fecha prevista del informe del 3T26 (29-oct-2026) en el calendario de la bolsa', editor: 'Eastmoney (calendario de SZSE)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://data.eastmoney.com/bbsj/yysj/' },
  { id: 12, titulo: 'Caída del sector el 4-ago-2026 por el rumor de la FCC y desmentido de Innolight', editor: '10jqka (同花顺财经)', tipo: 'Prensa', fecha: '2026-08-05', url: 'https://stock.10jqka.com.cn/20260805/c678681238.shtml' },
  { id: 13, titulo: 'Reajuste del sector a finales de julio de 2026; TFC: pedidos «muy abundantes», oferta de chips mejor desde el 3T-4T', editor: '10jqka (同花顺财经)', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://stock.10jqka.com.cn/20260728/c678498990.shtml' },
];
// Comparables (Yahoo, 19-oct-2026). Ejercicio de diciembre: NTM = 2,4/12 de 2026e + 9,6/12 de 2027e; de junio (FN, COHR,
// LITE): 8,4/12 del FY2027e + 3,6/12 del FY2028e. Capitalización en millones de CNY (USD a 6,6695).
const compar = [];
const def = [['Innolight', '300308.SZ', 'CN', 12], ['Eoptolink', '300502.SZ', 'CN', 12], ['Fabrinet', 'FN', 'US', 6], ['Coherent', 'COHR', 'US', 6], ['Lumentum', 'LITE', 'US', 6], ['Accelink', '002281.SZ', 'CN', 12], ['T&S Communications', '300570.SZ', 'CN', 12], ['Yuanjie Semiconductor', '688498.SS', 'CN', 12]];
for (const [nombre, tk, pais, cierre] of def) {
  const y = Y[tk]; const fx = y.divisa === 'USD' ? usd : 1;
  const tr = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const w0 = cierre === 12 ? 2.4 / 12 : 8.4 / 12;
  const eps = w0 * tr['0y'].bpa + (1 - w0) * tr['+1y'].bpa;
  const ventasNtm = w0 * tr['0y'].ventas + (1 - w0) * tr['+1y'].ventas;
  compar.push({
    nombre, ticker: tk, pais, capitalizacion: Math.round(y.cap / 1e6 * fx), ev_ventas: r2(y.ev / y.ventas),
    ev_ebitda_ltm: r1(y.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(y.precio / eps),
    crecimiento_pct: r1((ventasNtm / y.ventas - 1) * 100), margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null,
    dn_ebitda: r2((y.ev - y.cap) / y.ebitda), fcf_yield_pct: null,
  });
}
const pers = compar.map((x) => x.per_ntm).sort((a, b) => a - b);
const perMed = r1((pers[3] + pers[4]) / 2);
const ycons = Y['300394.SZ'];
const D = {
  _estado: `Completa. Precio: cierre del 19-oct-2026 (203,30 CNY; Shenzhen cierra a las 15:00 de Pekín, 07:00 UTC) de Tencent y Yahoo; el histórico diario de Yahoo aún no tenía la barra del día y bolsa.json usa el 16-oct (212,80). Consenso de Eastmoney (21 casas en seis meses), en beneficio; BPA = beneficio ÷ 1.090,8 M de acciones (las casas mezclan bases antes y después de la ampliación de junio). Yahoo da para TFC un BPA en la base antigua (777 M de acciones): no se usa. Mediana del PER NTM de los comparables: ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Suzhou TFC Optical Communication Co., Ltd. (苏州天孚光通信股份有限公司)', nombre_corto: 'TFC Optical', ticker: '300394', isin: 'CNE100001ZN0',
    mercado: 'Shenzhen Stock Exchange (ChiNext)', indice_referencia: 'CSI 300', pais: 'China', pais_iso: 'CN', sector: 'Tecnologías de la información', industria: 'Equipos de comunicaciones (componentes ópticos)',
    sede: 'Suzhou (Jiangsu), China', fundacion: '2005', empleados: 5127, web: 'www.tfcsz.com',
    precio: 203.3, fecha_precio: '2026-10-19', acciones: 1090.8, capitalizacion_publicada: 221765, free_float_pct: 55.0,
    max_52s: 375.0, min_52s: 100.81, volumen_medio_diario: '≈ 10.560 M CNY/día (3 meses) [D1]', proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Sin guía anual. Referencias de la empresa: avances de resultados semestrales y anuales (el del 1S26 dio +25-45 % y salió +33,9 %), y los objetivos del plan de acciones de 2026: beneficio sin no recurrentes de 2027 +150 % sobre 2025 (≈ 4.941 M) con umbral de +120 % (≈ 4.348 M); 2028 +400 % (≈ 9.882 M) con umbral de +320 %; 2029 +700 % con umbral de +560 % [A11]. En julio la dirección dijo que los pedidos son «muy abundantes» y que la oferta de chips mejoraría desde el 3T-4T de 2026 [D13].',
    estimaciones: [
      { periodo: '2026e', ingresos: 8664, ebitda: null, ebit: null, bpa: 3.25, dpa: null, fuente: 'Eastmoney, media de 21 casas en seis meses: beneficio 3.543 M CNY ÷ 1.090,8 M de acciones [D3]' },
      { periodo: '2027e', ingresos: 14140, ebitda: null, ebit: null, bpa: 5.29, dpa: null, fuente: 'Eastmoney: beneficio 5.770 M [D3]' },
      { periodo: '2028e', ingresos: 20827, ebitda: null, ebit: null, bpa: 7.9, dpa: null, fuente: 'Eastmoney: beneficio 8.622 M [D3]' },
    ],
    recomendaciones: { n_analistas: 31, comprar: 26, mantener: 5, vender: 0, po_medio: r2(ycons.po_medio), po_min: r2(ycons.po_min), po_max: r2(ycons.po_max) },
    revisiones: 'En los últimos tres meses las casas publicaron tras el semestral (19-ago) beneficios de 2026e entre 3.033 (Huachuang) y 3.813 M (Kaiyuan) y de 2027e entre 4.182 (Industrial, julio) y 6.267 M (Guosheng) [D3]. Las 31 recomendaciones de un año son 26 «comprar» y 5 «sobreponderar»; ninguna de venta [D3]. En Yahoo el BPA de 2027e (en la base antigua) pasó de 7,03 hace 90 días a 8,40 hoy (+19 %) [D4]: el consenso sube pese al semestral flojo, apoyado en la escasez y en el 1,6T. Las rebajas tras el avance de julio fueron en 2026e (de ≈ 3,5 bn a ≈ 3,3 bn en algunas casas), no en 2027-2028.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    // El ETF sectorial (515050.SS) tiene cierres sin ajustar por un desdoblamiento en Yahoo: su rentabilidad no sirve y se quita.
    rentabilidades: B.bolsa.rentabilidades.map((x) => ({ ...x, sector_pct: null })),
    posicion_corta_pct: null,
    comentario: 'La acción ha subido un 263 % en 2023, un 40 % en 2024 y más de un 200 % en 2025, con la demanda de motores de 800G y 1,6T [D1]. En 2026 marcó un máximo de 375 CNY el 3-jun (base de hoy) y cayó un 54 % hasta el 30-jul: avance del 1S26 por debajo de lo esperado (−13,4 % el 17-jul), caída del sector el 28-jul y rumor de la FCC el 4-ago [D9, D12, D13]. Rebotó un 65 % en agosto tras el semestral y desde septiembre baja otra vez (−17,5 % en un mes al 16-oct y −4,5 % el 19-oct, a 203,30). Volatilidad anual del 87 % y beta semanal de 2 años de 3,4: es un valor de momento ligado a Nvidia. La columna del sector se deja vacía: el ETF de comunicaciones 5G de China (515050) tiene en Yahoo cierres sin ajustar por un desdoblamiento y su rentabilidad saldría mal.',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2018 && +x.anio <= 2025).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precios de cierre en la base de hoy (Yahoo ajusta las cuatro ampliaciones liberadas) [D1]. El PER al cierre fue de 30-50 veces casi siempre (2018: 34x; 2021: 47x; 2025: 78x con el BPA de entonces); el de 2022 (25x al cierre, 14x adelantado) es el mínimo, con la caída de las telecomunicaciones. Hoy cotiza a 95 veces el beneficio de los últimos 12 meses y a 62 veces el consenso de 2026e: la prima frente a su historia la explica el crecimiento esperado de 2027-2028 (+63 % y +49 % de beneficio en el consenso).',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Componentes y módulos ópticos para centros de datos que cotizan: fabricantes de módulos chinos (Innolight, Eoptolink, Accelink), el ensamblador del cliente A (Fabrinet), fabricantes de láseres y componentes de EE. UU. (Coherent, Lumentum) y componentes chinos más pequeños (T&S, Yuanjie). Fuera: Shijia Photons (sin consenso) y Applied Optoelectronics (EBITDA negativo). Ninguno es puro en componentes pasivos: TFC tiene más margen que todos.',
    empresas: compar,
    comentario: `TFC cotiza a ≈ 42 veces el BPA de los próximos 12 meses del consenso (≈ 4,88 CNY), frente a una mediana de ${String(perMed).replace('.', ',')} veces de los comparables. Los fabricantes de módulos chinos (Innolight 11 veces, Eoptolink 10) cotizan muy por debajo con crecimientos mayores: el mercado paga a TFC su margen (EBITDA ≈ 48-54 %) y que vende a todos, pero su crecimiento del 1S26 (+15 %) es el más bajo del grupo. La regresión múltiplo-crecimiento sale sin poder explicativo por los extremos (Yuanjie 81 veces, módulos 10). El múltiplo razonable es el de los proveedores de componentes de EE. UU. (Coherent 22, Lumentum 33).`,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Folleto H (no recoge operaciones del sector); 2) notas de Lumentum (NeoPhotonics, Cloud Light) y Coherent (II-VI) sin múltiplo de EBITDA homogéneo a mano; 3) prensa (múltiplos sobre ventas sin conciliar)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SZSE (financiación y préstamo de valores, no posición corta neta); 2) Eastmoney (saldo de préstamo de valores sin porcentaje); 3) Yahoo (sin dato para acciones A)', decision: 'Omitido' },
  ],
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de 天孚通信 en Guba (Eastmoney): primera página de mensajes del 14 al 20-oct-2026', editor: 'Eastmoney Guba (股吧)', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,300394.html' },
  { id: 2, titulo: 'Hilos con más lectura del foro: «高盛重磅发声 “易中天”集体大涨» (7-sep), «缺货看不到尽头» (9-oct), recompras (18-oct)', editor: 'Eastmoney Guba (股吧)', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://guba.eastmoney.com/list,300394.html' },
  { id: 3, titulo: 'Comentario del semestral: «光器件里的卖铲人» (margen del 61 %, crecimiento del 15 %, valoración «por las nubes»)', editor: 'Sina (新浪) / autor independiente', tipo: 'Foros y redes', fecha: '2026-08-20', url: 'https://www.sina.cn/news/detail/5349632579210449.html' },
  { id: 4, titulo: '«六成营收来自单一客户，天孚通信业绩创新高但挑战不少»', editor: 'Sina Finance (财经头条)', tipo: 'Foros y redes', fecha: '2026-08', url: 'https://cj.sina.com.cn/articles/view/1733360754/6750fc7202001f9c2' },
];
const E = {
  _estado: 'Completa. Guba abre con curl (mensajes del 14-20 de octubre y los hilos más leídos); Reddit y Stocktwits no tienen debate sobre la acción A; Xueqiu pide sesión.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba (Eastmoney), foro de 300394', fecha: '2026-10', n_comentarios: 70, tono: 'Negativo', resumen: 'Cansancio tras cinco semanas de caídas («周线连续跌五周»), pérdidas de quien compró a 270, debate sobre si cerrará el hueco de 187 y si bajará a 155; algunos esperan un 3T fuerte el 29-oct y el efecto de la recompra [E1].' },
      { plataforma: 'Guba, hilos más leídos (septiembre-octubre)', fecha: '2026-10', n_comentarios: 25, tono: 'Positivo', resumen: 'Informe alcista de Goldman Sachs sobre «易中天» (Eoptolink, Innolight, TFC) el 7-sep y la escasez «sin final a la vista» del 9-oct; la oleada de recompras de las tecnológicas de Shenzhen [E2].' },
      { plataforma: 'Sina (comentarios del semestral)', fecha: '2026-08', n_comentarios: 10, tono: 'Dividido', resumen: 'Admiran el margen bruto del 61 % y critican el crecimiento del 15 % y que el 2T fuera plano frente al 2T25; «valoración por las nubes» [E3].' },
      { plataforma: 'Sina Finance (artículo y comentarios)', fecha: '2026-08', n_comentarios: 10, tono: 'Negativo', resumen: 'La dependencia de un cliente (60 % de las ventas) como el gran riesgo [E4].' },
    ],
    temas: [
      { tema: 'Escasez de chips y retraso de los motores de 1,6T', postura: 'Dividida', peso: 'Alto', contraste: 'Cierto: los activos cayeron un 19,6 % en el 1S26 [A2]; el 3T26 (29-oct) dirá si la oferta mejoró como prometió la empresa.' },
      { tema: '«易中天»: comparar TFC con Innolight y Eoptolink', postura: 'Dividida', peso: 'Alto', contraste: 'Los módulos cotizan a ≈ 10-11 veces el BPA de 12 meses y TFC a ≈ 42: la gente se pregunta por qué; la respuesta es el margen y el riesgo de cliente, no el crecimiento.' },
      { tema: 'Dependencia de un cliente (Nvidia vía Fabrinet)', postura: 'Bajista', peso: 'Medio', contraste: 'Correcto: 63,9 % el primero y 90,6 % los cinco [A7].' },
      { tema: 'Recompra y apoyo a la cotización', postura: 'Alcista', peso: 'Medio', contraste: 'La recompra propuesta (100-150 M CNY) es el 0,06 % del capital: simbólica [D8].' },
    ],
    lectura: 'El particular chino está cansado tras la caída del 46 % desde junio y discute niveles técnicos; los analistas siguen todos en «comprar». No hay euforia ni capitulación: el sentimiento sigue al sector y a Nvidia. Lo útil es que el foro recoge los dos riesgos del informe (escasez y concentración en un cliente) y espera el 3T26 como prueba. No aporta cifras ni cambia la valoración.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};

guarda('A', A); guarda('B', B_); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas. PER mediana comparables:', perMed, compar.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
console.log('Cuenta:', cuenta.map((c) => `${c.periodo} ing ${c.ingresos} ebit ${c.ebit} ebitda ${c.ebitda} bpa ${c.bpa} dpa ${c.dpa}`).join('\n'));
console.log('LTM', ltm); console.log('Trimestres', t);
