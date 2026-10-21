// Notas A-E de Yutong Bus Co., Ltd. (宇通客车股份有限公司, SSE 600066, «Yutong»). Corte 2026-10-21 (miércoles; Shanghái cerró a las
// 15:00 de Pekín, 07:00 UTC). Cifras en millones de CNY salvo que se diga otra cosa. Normas chinas (CAS), ejercicio natural.
// Las series de cuentas salen de los estados CAS publicados en CNINFO; para no transcribir a mano se leen de la copia estructurada de
// Eastmoney F10 (notas/docs/em-G*.json), cotejada con los informes anuales 2021-2025, el semestral 2026 y el 3T26 (ventas, beneficio,
// caja y BPA idénticos al céntimo en el anual 2025 y en el 3T26 [A1, A7]).
// Ejecutar: node informes/yutong-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const CN = 'http://static.cninfo.com.cn/finalpage';
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const M = (x) => (x == null ? 0 : x / 1e6);
export const ACCIONES = 2213.94; // 2.213.939.223 acciones a 30-sep-2026, sin autocartera [A7]

// ---------------------------------------------------------------- estados (Eastmoney F10, copia de los CAS)
const tabla = (t) => Object.fromEntries(lee(`docs/em-${t}.json`).result.data.map((r) => [r.REPORT_DATE.slice(0, 10), r]));
const L = tabla('GINCOME'), Z = tabla('GBALANCE'), X = tabla('GCASHFLOW');
const fin = (a) => `${a}-12-31`;
// EBIT: resultado de explotación sin rendimientos de la tesorería (投资收益 y 公允价值变动, que van al financiero) y sin el gasto
// financiero neto (财务费用: intereses de depósitos y diferencias de cambio); con lo no operativo (营业外). Las subvenciones (其他收益), los
// deterioros y las reversiones de provisiones de cobro y las plusvalías por venta de activos (资产处置收益) se quedan en el EBIT.
const ebitDe = (l) => M(l.OPERATE_PROFIT) - M(l.INVEST_INCOME) - M(l.FAIRVALUE_CHANGE_INCOME) + M(l.FINANCE_EXPENSE) + M(l.NONBUSINESS_INCOME) - M(l.NONBUSINESS_EXPENSE);
const daDe = (x) => M(x.FA_IR_DEPR) + M(x.IA_AMORTIZE) + M(x.LPE_AMORTIZE) + M(x.USERIGHT_ASSET_AMORTIZE);
// DPA por ejercicio (devengo) [A13, A15]: 2019 1,00; 2020 0,50; 2021 0,50; 2022 1,00; 2023 1,50; 2024 0,50 a cuenta + 1,00 final; 2025 0,50 a cuenta + 2,00 final.
export const DPA = { 2019: 1.0, 2020: 0.5, 2021: 0.5, 2022: 1.0, 2023: 1.5, 2024: 1.5, 2025: 2.5 };
const ANIOS = [2019, 2020, 2021, 2022, 2023, 2024, 2025];
// Plusvalía por venta de inmovilizado de 2025 (183 M en 资产处置收益; 210 M con otras partidas en la nota de no recurrentes [A1]): fuera del EBITDA.
const NOREC = { 2025: -182.6 };
const cuenta = ANIOS.map((a) => {
  const l = L[fin(a)], x = X[fin(a)];
  const ebit = ebitDe(l), am = daDe(x);
  const bpa = l.DILUTED_EPS;
  return {
    periodo: String(a), ingresos: r2(M(l.TOTAL_OPERATE_INCOME)), coste_ventas: r2(M(l.OPERATE_COST) + M(l.OPERATE_TAX_ADD)),
    gastos_generales: r2(M(l.SALE_EXPENSE) + M(l.MANAGE_EXPENSE) + M(l.RESEARCH_EXPENSE)), ebitda: r2(ebit + am), amortizaciones: r2(am), ebit: r2(ebit),
    resultado_financiero: r2(-M(l.FINANCE_EXPENSE) + M(l.INVEST_INCOME) + M(l.FAIRVALUE_CHANGE_INCOME)), bai: r2(M(l.TOTAL_PROFIT)), impuestos: r2(M(l.INCOME_TAX)),
    minoritarios: r2(M(l.MINORITY_INTEREST)), beneficio_neto: r2(M(l.PARENT_NETPROFIT)), gastos_financieros: r2(Math.max(M(l.FE_INTEREST_EXPENSE), 0)),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[a] ?? null, bpa: r2(bpa), dpa: DPA[a], dpa_extraordinario: 0,
    acciones_diluidas: r2(M(l.PARENT_NETPROFIT) / bpa),
  };
});
// Caja = efectivo (货币资金) + productos de tesorería (交易性金融资产) + certificados de depósito y depósitos a plazo (债权投资, 一年内到期的
// 非流动资产 y el 97 % de 其他非流动资产, que son depósitos a plazo y sus intereses [A6]).
const cajaDe = (z) => M(z.MONETARYFUNDS) + M(z.TRADE_FINASSET_NOTFVTPL) + M(z.CREDITOR_INVEST) + M(z.NONCURRENT_ASSET_1YEAR) + 0.97 * M(z.OTHER_NONCURRENT_ASSET);
const balDe = (z, periodo) => ({
  periodo, activo_total: r2(M(z.TOTAL_ASSETS)), activo_corriente: r2(M(z.TOTAL_CURRENT_ASSETS)), pasivo_corriente: r2(M(z.TOTAL_CURRENT_LIAB)),
  pasivo_total: r2(M(z.TOTAL_LIABILITIES)), fondo_comercio: r2(M(z.GOODWILL)), intangibles: r2(M(z.INTANGIBLE_ASSET) + M(z.DEVELOP_EXPENSE)),
  inmovilizado_material: r2(M(z.FIXED_ASSET) + M(z.CIP) + M(z.USERIGHT_ASSET) + M(z.INVEST_REALESTATE)), existencias: r2(M(z.INVENTORY)),
  clientes: r2(M(z.NOTE_ACCOUNTS_RECE) + M(z.FINANCE_RECE) + M(z.LONG_RECE)), proveedores: r2(M(z.NOTE_ACCOUNTS_PAYABLE)),
  activos_contrato: r2(M(z.CONTRACT_ASSET)), pasivos_contrato: r2(M(z.CONTRACT_LIAB) + M(z.ADVANCE_RECEIVABLES)), caja: r2(cajaDe(z)),
  deuda_financiera: r2(M(z.SHORT_LOAN) + M(z.LONG_LOAN)),
  arrendamientos: r2(M(z.LEASE_LIAB) + M(z.NONCURRENT_LIAB_1YEAR)), patrimonio_neto: r2(M(z.TOTAL_PARENT_EQUITY)), minoritarios: r2(M(z.MINORITY_EQUITY)),
  reservas: r2(M(z.UNASSIGN_RPOFIT) + M(z.SURPLUS_RESERVE)),
});
const balance = ANIOS.map((a) => balDe(Z[fin(a)], String(a)));
export const BAL_SEP26 = balDe(Z['2026-09-30'], '3T26');
export const Zsep = Z['2026-09-30'];
const flujos = ANIOS.map((a) => {
  const x = X[fin(a)];
  // 2022: 311,4 M de «otros pagos de financiación» son la devolución por la cancelación del plan de acciones restringidas (股权激励终止退款) [A4]: recompra.
  const otros = M(x.PAY_OTHER_FINANCE);
  const recompra = a === 2022 ? 311.39 : 0;
  return {
    periodo: String(a), flujo_operativo: r2(M(x.NETCASH_OPERATE)), capex: r2(M(x.CONSTRUCT_LONG_ASSET)), pagos_arrendamientos: r2(otros - recompra),
    adquisiciones: r2(M(x.OBTAIN_SUBSIDIARY_OTHER)), desinversiones: r2(M(x.DISPOSAL_LONG_ASSET) + M(x.DISPOSAL_SUBSIDIARY_OTHER)), dividendos: r2(M(x.ASSIGN_DIVIDEND_PORFIT)),
    recompras: recompra, emision_acciones: r2(M(x.ACCEPT_INVEST_CASH)), intereses_en_financiacion: 0,
  };
});
// Trimestres (de los acumulados publicados)
const etiqueta = { '03-31': '1T', '06-30': '2T', '09-30': '3T', '12-31': '4T' };
const prevDe = (k) => { if (k.endsWith('03-31')) return null; const y = k.slice(0, 4); return { '06-30': `${y}-03-31`, '09-30': `${y}-06-30`, '12-31': `${y}-09-30` }[k.slice(5)]; };
const solo = {};
for (const k of Object.keys(L).filter((k) => k >= '2023-01-01')) {
  const l = L[k]; const p = prevDe(k); const pv = p ? L[p] : null;
  const v = (c) => M(l[c]) - (pv ? M(pv[c]) : 0);
  solo[k] = { ventas: v('TOTAL_OPERATE_INCOME'), neto: v('PARENT_NETPROFIT'), ebit: ebitDe(l) - (pv ? ebitDe(pv) : 0), bruto: v('TOTAL_OPERATE_INCOME') - v('OPERATE_COST') };
}
const tri = [];
for (const k of ['2024-12-31', '2025-03-31', '2025-06-30', '2025-09-30', '2025-12-31', '2026-03-31', '2026-06-30', '2026-09-30']) {
  const s = solo[k]; const ant = solo[`${Number(k.slice(0, 4)) - 1}${k.slice(4)}`];
  tri.push({ periodo: `${etiqueta[k.slice(5)]}${k.slice(2, 4)}`, ingresos: r2(s.ventas), crecimiento_pct: ant ? r1((s.ventas / ant.ventas - 1) * 100) : null, crecimiento_organico_pct: null,
    ebitda: null, margen_ebitda_pct: null, bpa: r2(s.neto / ACCIONES), vs_consenso: null });
}
export const SOLO = solo;
// LTM a sep-26 (2025 + 9M26 − 9M25). La amortización trimestral no se publica: la del LTM = 2025 + 1S26 − 1S25 (estimación).
const ltmV = (c) => M(L['2025-12-31'][c]) - M(L['2025-09-30'][c]) + M(L['2026-09-30'][c]);
const ebitLtm = ebitDe(L['2025-12-31']) - ebitDe(L['2025-09-30']) + ebitDe(L['2026-09-30']);
const daLtm = daDe(X['2025-12-31']) - daDe(X['2025-06-30']) + daDe(X['2026-06-30']);
const xL = (c) => M(X['2025-12-31'][c]) - M(X['2025-09-30'][c]) + M(X['2026-09-30'][c]);
const fcfLtm = xL('NETCASH_OPERATE') - xL('CONSTRUCT_LONG_ASSET') - 40;
const disLtm = ltmV('ASSET_DISPOSAL_INCOME');
export const LTM = { ventas: ltmV('TOTAL_OPERATE_INCOME'), ebit: ebitLtm, da: daLtm, neto: ltmV('PARENT_NETPROFIT'), fcf: fcfLtm, ocf: xL('NETCASH_OPERATE') };

const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, CAS): estados 2025 y 2024, ventas por región y volumen, cuentas por cobrar por antigüedad, garantías de recompra, no recurrentes, dividendos', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050742.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024, CAS): estados 2024 y 2023, ventas por región y volumen', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-01', url: `${CN}/2025-04-01/1222974533.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023, CAS): estados 2023 y 2022', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-02', url: `${CN}/2024-04-02/1219492560.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022, CAS): estados 2022 y 2021, cancelación del plan de acciones restringidas (311 M devueltos)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2023-03-28', url: `${CN}/2023-03-28/1216236735.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021, CAS): estados 2021 y 2020', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2022-03-29', url: `${CN}/2022-03-29/1212711340.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026, CAS): balance a 30-jun-2026, depósitos a plazo en otros activos no corrientes, mercado del 1S26', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-11', url: `${CN}/2026-08-11/1225466147.PDF` },
  { id: 7, titulo: '2026年第三季度报告 (3T26): cuenta, balance a 30-sep-2026, flujos de 9M26, no recurrentes, accionistas', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225604484.PDF` },
  { id: 8, titulo: '2026年第一季度报告 (1T26)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-28', url: `${CN}/2026-04-28/1225206556.PDF` },
  { id: 9, titulo: '2025年第三季度报告 (9M25)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-10-29', url: `${CN}/2025-10-29/1224752503.PDF` },
  { id: 10, titulo: 'Estados financieros estructurados de 600066 (利润表, 资产负债表, 现金流量表) 2012-3T26: copia de los CAS usada para no transcribir a mano', editor: 'Eastmoney F10', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SH600066' },
  { id: 11, titulo: '2026年9月份产销数据快报 (producción y ventas de septiembre y 9M26 por tamaño)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-09', url: `${CN}/2026-10-09/1225596202.PDF` },
  { id: 12, titulo: '2025年12月份产销数据快报 (ventas de 2025: 49.518 autobuses)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-01-06', url: `${CN}/2026-01-06/1224918143.PDF` },
  { id: 13, titulo: '关于2025年度利润分配方案及2026年中期分红授权的公告 (2,00 CNY por acción; 99,65 % del beneficio de 2025 con el a cuenta)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050780.PDF` },
  { id: 14, titulo: '2025年年度权益分派实施公告 (pago del dividendo final de 2025, fecha ex 15-may-2026)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-05-09', url: `${CN}/2026-05-09/1225284530.PDF` },
  { id: 15, titulo: 'Historial de repartos de 600066 (dividendos por ejercicio 2008-2025)', editor: 'Eastmoney (datos de los anuncios de reparto)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://data.eastmoney.com/yjfp/detail/600066.html' },
  { id: 16, titulo: '2026年6月份产销数据快报 y 8月份产销数据快报 (ventas mensuales de 2026)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-03', url: `${CN}/2026-09-03/1225543456.PDF` },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: r2(LTM.ventas), ebitda: r2(LTM.ebit + LTM.da), ebit: r2(LTM.ebit), beneficio_neto: r2(LTM.neto), bpa: r2(LTM.neto / ACCIONES),
      dpa: 2.0, dpa_extraordinario: 0, fcf: r2(LTM.fcf), participadas_en_ebitda: null, no_recurrentes_en_ebitda: r2(-disLtm) },
    cambios_perimetro: [],
    comentario: 'Yutong vende hoy menos autobuses que en 2019 y gana casi tres veces más. Las ventas cayeron de 30.492 M (2019) a 21.705-23.233 M en 2020-2022 con la pandemia y el fin de las subvenciones nacionales al autobús eléctrico, y volvieron a 41.426 M en 2025 (+11,3 %) con 49.518 unidades (+5,5 %) [A1, A5]. El margen lo ha hecho la exportación: en 2025 el 58 % de las ventas de autobús (21.108 M) fue fuera de China con un margen bruto del 29,6 %, frente al 19,1 % de las ventas nacionales (15.402 M, −12,4 %) [A1]. El EBIT pasó del 1,1 % de 2020-2021 al 14,3 % de 2025 y al 14,8 % en 9M26. En 9M26 las ventas caen un 2,1 % (volumen −7,8 %; septiembre −12,6 %) y el beneficio atribuido un 3,3 %, pero el beneficio sin no recurrentes sube un 18,5 % (3.099 M): la caída viene de la tesorería (pérdidas de valor razonable de −145 M frente a +257 M) [A7, A11]. Gastos comerciales a la baja (2,8 % de las ventas en el 3T26) e I+D al 4,4-5,2 % [A1, A7].',
    ajustes: 'Usamos las cifras publicadas. Los rendimientos de la tesorería (intereses de depósitos, productos bancarios, valor razonable y ventas de participaciones financieras) van al resultado financiero, no al EBIT; las subvenciones públicas (其他收益: 312 M en 2025, 230 M en 9M26) y las reversiones de provisiones de cobro (+132 M en 2025, +251 M en 9M26, por el cobro de deudas viejas de empresas de transporte municipales) se quedan en el EBIT porque se repiten todos los años [A1, A7]. Los no recurrentes oficiales sumaron 974 M en 2025 (17,5 % del beneficio), 648 M en 2024 y 403 M en 2023, sobre todo valor razonable y ventas de participaciones (693 M en 2025) y subvenciones no ligadas a la actividad (218 M); en 9M26 solo 85 M [A1, A7]. Solo sacamos del EBITDA la plusvalía por venta de inmovilizado de 2025 (183 M).',
    confianza: 'Alta',
  },
  trimestres: {
    items: tri,
    ultima_presentacion: null,
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: `Caja y tesorería de ≈ ${Math.round(cajaDe(Zsep))} M a 30-sep-2026 (efectivo 7.653 M, productos bancarios 5.174 M, depósitos a plazo y certificados ≈ 1.590 M) sin deuda bancaria salvo 128 M a corto; además 1.358 M en fondos y 939 M en participaciones financieras [A7, A6].`,
    rating: 'Sin rating (no emite bonos)', coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Tres pasivos que no parecen deuda. (1) **Provisiones de garantía** (预计负债): 5.543 M a sep-26, desde 1.913 M en 2021, por la garantía de las baterías y del producto exportado; crecen más que las ventas y son caja que se gastará en reparaciones si el negocio se encoge [A1, A7]. (2) **Garantías de recompra**: Yutong responde ante bancos y arrendadoras por los autobuses vendidos a plazos: 6.234 M a fin de 2025, de ellos 4.400 M con la financiera del grupo (Zhengzhou Anchi), cuyas pérdidas asume por compromiso el accionista de control; el 14,4 % de los autobuses de 2025 se vendió a plazos [A1]. (3) **Arbitraje** de su antiguo distribuidor en Israel (China Motor), que reclama 269 M EUR (≈ 2.200 M CNY) ante la CCI en Suiza; sin vista celebrada y sin provisión publicada [C9]. Sin pensiones de prestación definida.',
    comentario: 'El balance es una caja con fábrica. Desde 2021 la tesorería sube de ≈ 7.200 M a ≈ 14.400 M aunque se reparte casi todo el beneficio, porque el circulante se ha vuelto negativo: los cobros pendientes bajan de 5.692 M (2021) a 2.532 M (sep-26) al cobrar el atraso de las ciudades y vender más fuera, las existencias de 6.106 M a 3.928 M, y las provisiones de garantía crecen [A1, A7]. El año 2025 rompe la serie (cobros de 5.503 M y proveedores de 3.477 M frente a 6.992 M, por menos pagos con efectos): el flujo operativo cayó a 3.197 M y se recuperó en 9M26 (8.004 M) [A1, A7]. Las cuentas por cobrar brutas de 7.231 M a fin de 2025 llevan 1.851 M de provisión (25,6 %), con 1.381 M de más de cinco años; las subvenciones nacionales pendientes ya están cobradas (0 en contratos, frente a 4.000 M en 2021) [A1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: `El flujo de caja convierte bien el beneficio a lo largo del ciclo, pero salta de un año a otro con el circulante: 716 M en 2021, 4.717 M en 2023, 7.211 M en 2024, 3.197 M en 2025 y 8.004 M en 9M26 [A1, A7]. En 2021-2025 el flujo operativo sumó 19.095 M frente a un beneficio de 12.860 M. La inversión es baja: 567-976 M al año (1,8 % de las ventas en 2025) frente a unas amortizaciones de 720 M; casi todo es mantenimiento de tres fábricas en Zhengzhou con una ocupación del 50-81 % [A1]. Casi todo el flujo libre vuelve al accionista: dividendos de 1.113 M (2021) a 4.437 M (2024) y 4.465 M en 9M26 (el final de 2025 de 2,00 CNY), y la tesorería sobrante se coloca en productos bancarios (inversión y desinversión brutas de 20.000-26.000 M al año).`,
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Da Hua CPA (大华) en 2025; BDO China Shu Lun Pan (立信) desde 2026', anios_auditor: 14, opinion: 'Favorable (sin salvedades); cuestión clave: reconocimiento de ingresos',
    comentario: null,
    senales: [
      { senal: 'Cambio de auditor en 2026 tras 14 años', nivel: 'Baja', comentario: 'Da Hua (14 años) sale por la regla de rotación de las empresas cotizadas; la empresa dice que Da Hua no tiene objeciones [C8, A1].' },
      { senal: 'Beneficio apoyado en reversiones de provisiones de cobro', nivel: 'Media', comentario: 'Reversiones de +132 M en 2025 y +251 M en 9M26 (5-8 % del beneficio) al cobrar deudas viejas de empresas de transporte municipales; no se repetirán cuando se acabe el atraso [A1, A7].' },
      { senal: 'Provisiones de garantía al alza', nivel: 'Media', comentario: 'De 1.913 M (2021) a 5.543 M (sep-26), del 8 % al 13 % de las ventas: o la exportación eléctrica pide más garantía, o se dota con prudencia; si se revierte, sube el beneficio sin caja [A1, A7].' },
      { senal: 'Garantías de recompra de autobuses vendidos a plazos', nivel: 'Media', comentario: '6.234 M fuera de balance a fin de 2025, el 40 % del patrimonio; 4.400 M con la financiera del grupo, que cubre las pérdidas [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparte casi todo: 99,65 % del beneficio de 2025 (2,50 CNY por acción, 5.535 M), 80 % en 2024 y 182 % en 2023; en tres años, 12.177 M, el 318 % del beneficio medio anual [A13]. La junta de 2026 autorizó un dividendo a cuenta de 2026 que no se ha anunciado con el semestral ni con el 3T26 [A6, A7]. Sin recompras (la última, la cancelación del plan de acciones restringidas de 2022). Prioridades declaradas: I+D (≈ 1.800 M al año), mejora de fábricas (en 2026, 390 M en curso y 646 M nuevos) y ensamblaje local fuera de China [A1].',
    adquisiciones: [],
    comentario: null,
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Autobuses en China', descripcion: 'Ventas nacionales de autobuses, piezas y servicio (公交、客运、旅游、团体、校车)', tipo_resultado: null,
        historico: [['2021', 16491.78], ['2022', 13935.06], ['2023', 13696.81], ['2024', 17578.65], ['2025', 15402.28]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'Autobuses fuera de China', descripcion: 'Exportación y ensamblaje local (Europa, Oriente Medio, Latinoamérica, Asia, África)', tipo_resultado: null,
        historico: [['2021', 4487.52], ['2022', 5595.08], ['2023', 10405.61], ['2024', 15200.28], ['2025', 21107.91]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'Otros ingresos', descripcion: 'Otros ingresos de explotación (materiales, alquileres, servicios) netos de las diferencias entre el desglose por región y la cuenta', tipo_resultado: null,
        historico: [['2021', 23233 - 16491.78 - 4487.52], ['2022', 21799 - 13935.06 - 5595.08], ['2023', 27042 - 13696.81 - 10405.61], ['2024', 37218 - 17578.65 - 15200.28], ['2025', 41426 - 15402.28 - 21107.91]]
          .map(([p, i]) => ({ periodo: p, ingresos: r2(cuenta.find((c) => c.periodo === p).ingresos - (p === '2021' ? 16491.78 + 4487.52 : p === '2022' ? 13935.06 + 5595.08 : p === '2023' ? 13696.81 + 10405.61 : p === '2024' ? 17578.65 + 15200.28 : 15402.28 + 21107.91)), resultado: null })) },
    ],
    geografias: [{ nombre: 'China', peso_pct: 42.2 }, { nombre: 'Fuera de China', peso_pct: 57.8 }],
    geografias_criterio: 'destino',
    clientes: 'Clientes muy repartidos: los cinco primeros fueron el 15,1 % de las ventas de 2025 (el 4,0 % a empresas vinculadas) [A1]. En China vende sobre todo a empresas públicas de autobús urbano (que dependen de subvenciones municipales y pagan tarde: 1.381 M de cobros de más de cinco años) y a empresas de transporte de viajeros y turismo; fuera, a operadores públicos y privados por concurso (Ruter en Noruega, Movia en Dinamarca, Qatar, Chile, México) [A1, B11]. El 85,6 % de las unidades se pagó al contado y el 14,4 % a plazos con garantía de recompra [A1]. **Poder de precios**: el ingreso por autobús exportado (1,23 M CNY en 2025) es 2,6 veces el nacional (0,48 M), y el margen bruto exterior ha subido de 28,5 % (2024) a 29,6 % (2025); el margen bruto total del 3T26 (26,7 %) es el más alto de la serie, con menos volumen [A1, D6].',
    kpis: [
      { kpi: 'Autobuses vendidos', valor_anterior: '46.918 (2024)', valor_actual: '49.518 (2025); 30.929 en 9M26', variacion: '+5,5 %; 9M26 −7,8 %', comentario: 'Septiembre de 2026, −12,6 % [A1, A11]' },
      { kpi: 'Autobuses exportados', valor_anterior: '14.000 (2024)', valor_actual: '17.149 (2025)', variacion: '+22,5 %', comentario: '9M26 ≈ 10.778 (+0,3 %), cuota del 17,4 % de la exportación china, segunda [A1, B9]' },
      { kpi: 'Autobuses vendidos en China', valor_anterior: '32.918 (2024)', valor_actual: '32.369 (2025)', variacion: '−1,7 %', comentario: '9M26 ≈ 20.150 (≈ −12 %) [A1, A11, B9]' },
      { kpi: 'Autobuses eléctricos y de nuevas energías', valor_anterior: '14.931 (2024)', valor_actual: '18.356 (2025)', variacion: '+22,9 %', comentario: '37 % del volumen [A1]' },
      { kpi: 'Margen bruto exterior / nacional', valor_anterior: '28,5 % / 19,4 % (2024)', valor_actual: '29,6 % / 19,1 % (2025)', variacion: '+1,2 / −0,3 puntos', comentario: '[A1, A2]' },
      { kpi: 'Cuota en autobuses grandes y medianos (China + exportación)', valor_anterior: '≈ 35 % (2024)', valor_actual: '32,5 % (2025)', variacion: '−2,5 puntos', comentario: '40.907 de 125.969; en 9M26, 28,7 % de los de más de 6 m [A1, B9]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Informe anual 2025, nota de deuda (sin préstamos); 2) semestral 2026 (solo 128 M a corto en el 3T26); 3) no aplica: sin deuda financiera', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) 3T26 (sin amortizaciones trimestrales); 2) 1T26 y 9M25 (igual); 3) derivarlo con la amortización semestral (no fiable por trimestre)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B: sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: '2025年年度报告: situación del sector, mercado de autobuses grandes y medianos 2025 (125.969, de ellos 58.140 exportados), previsión 2026, políticas', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050742.PDF` },
  { id: 2, titulo: '2024年年度报告: mercado de 2024 (115.471) y 2023', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-01', url: `${CN}/2025-04-01/1222974533.PDF` },
  { id: 3, titulo: '2023年年度报告: mercado de 2023 (87.926) y 2022 (84.202)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-02', url: `${CN}/2024-04-02/1219492560.PDF` },
  { id: 4, titulo: '2021年年度报告: mercado de 2021 (87.525) y 2020 (96.345)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2022-03-29', url: `${CN}/2022-03-29/1212711340.PDF` },
  { id: 5, titulo: '2026年半年度报告: mercado del 1S26 (exportación de autobuses grandes y medianos +18,45 %; China a la baja por el impuesto de compra de las eléctricas)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-11', url: `${CN}/2026-08-11/1225466147.PDF` },
  { id: 6, titulo: 'Informe a fondo de Yutong: ciclo del sector 2009-2025, «以旧换新» y electrificación mundial (IEA, Fortune Business Insights)', editor: 'Dongguan Securities (东莞证券)', tipo: 'Analistas', fecha: '2026-01-28', url: 'https://pdf.dfcfw.com/pdf/H3_AP202601291818545157_1.pdf' },
  { id: 7, titulo: 'Nota del 3T26: Yutong primera en matriculaciones de autobús eléctrico en Europa en el 1S26 (1.636), centro de servicio propio en Noruega', editor: 'Hualong Securities (华龙证券)', tipo: 'Analistas', fecha: '2026-10-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610171830643300_1.pdf' },
  { id: 8, titulo: 'Nota del 3T26: mercado de 9M26 (más de 6 m: 87.076, −2,18 %; cuota de Yutong 28,7 %; exportación 3,5 m+: 62.054, +11,6 %; Yutong 10.778, 17,4 %)', editor: 'Southwest Securities (西南证券)', tipo: 'Analistas', fecha: '2026-10-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610171830643263_1.pdf' },
  { id: 9, titulo: 'Ventas, EBIT y margen de 2025 de King Long, Zhongtong, Ankai, Foton, BYD, Daimler Truck, NFI, Volvo y CAF (estados anuales)', editor: 'Yahoo Finance (estados de las empresas)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/600686.SS/financials' },
  { id: 10, titulo: 'Yutong rejects remote control claims over electric buses in Norway (pruebas de Ruter, datos en Fráncfort)', editor: 'electrive', tipo: 'Prensa', fecha: '2025-11-06', url: 'https://www.electrive.com/2025/11/06/yutong-rejects-remote-control-claims-over-electric-buses-in-norway' },
  { id: 11, titulo: 'Denmark: Movia investigations on connected buses (262 Yutong en su flota)', editor: 'Sustainable Bus', tipo: 'Prensa', fecha: '2025-11', url: 'https://www.sustainable-bus.com/news/denmark-movia-investigations-connected-buses/' },
  { id: 12, titulo: '2025年度可持续发展报告 (informe de sostenibilidad 2025)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050714.PDF` },
  { id: 13, titulo: 'U.K. probes Yutong electric buses for remote shut down capabilities', editor: 'The Bamboo Works', tipo: 'Prensa', fecha: '2025-11', url: 'https://thebambooworks.com/u-k-probes-yutong-electric-buses-for-remote-shut-down-capabilities/' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Yutong fabrica autobuses de 5 a 18 metros: urbanos, de carretera y turismo, de empresa, escolares, de aeropuerto y minibuses autónomos, con más de 100 series, diésel, eléctricos de batería (el 37 % de las unidades de 2025), híbridos y de hidrógeno [A1]. Tiene tres fábricas en Zhengzhou (Henan) con 65.000 unidades de capacidad (ocupación del 50-81 % en 2025) y ensamblaje en kit en una decena de países [A1, B9]. Vende en China con red propia en todas las provincias y fuera de China en más de 60 países, con más de 400 talleres autorizados y 40 almacenes de piezas propios (Qatar, México, Francia, Noruega) [A1, A6]. Ha exportado más de 138.000 autobuses, 13.000 eléctricos [A6].',
    como_gana_dinero: 'Gana con cada autobús y con la mezcla. Un autobús exportado se vendió en 2025 a 1,23 M CNY de media con un margen bruto del 29,6 %; uno nacional a 0,48 M con un 19,1 % [A1]. Por eso, con un 2,1 % menos de ventas, el beneficio sin no recurrentes de 9M26 sube un 18,5 %: pesan más Europa y los modelos de gama alta [A7, D6]. El 72 % del coste es material (baterías, chasis, motores; Shenlan, del grupo, le vende baterías por 1.085 M) [A1, C6]. Apalancamiento operativo alto: con la ocupación del 50-80 %, cada autobús de más se queda casi entero en el margen; en 2020-2022, con 30.000-42.000 unidades y la exportación pequeña, el margen EBIT fue del 1-2 %. La demanda china es de reposición y depende de las subvenciones municipales y del plan «以旧换新» (cambio de autobuses de 8 años o más); el cuarto trimestre es siempre el más fuerte [A1].',
  },
  sector: {
    definicion: 'Autobuses grandes y medianos (más de 7 metros) vendidos por los fabricantes chinos, en China y en exportación, que es el mercado que la propia Yutong usa para su cuota (datos de 中客网/中国客车统计信息网) [B1]. No incluye a los fabricantes europeos en Europa: la cuota mundial no se publica. Contrastamos con la Asociación China de Fabricantes de Automóviles (137.200 autobuses grandes y medianos en 2025, +8,8 %) y con la serie de exportación del sector [B6].',
    tamano: '125.969 autobuses en 2025 (67.829 en China y 58.140 exportados) [B1]',
    unidad_serie: 'unidades (autobuses de más de 7 m de fabricantes chinos)',
    serie: [{ anio: '2020', tamano: 96345 }, { anio: '2021', tamano: 87525 }, { anio: '2022', tamano: 84202 }, { anio: '2023', tamano: 87926 }, { anio: '2024', tamano: 115471 }, { anio: '2025', tamano: 125969 }, { anio: '2026e', tamano: 122000 }],
    tcac_historico_pct: 5.5, tcac_previsto_pct: 1.5, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Reposición en China con el plan «以旧换新»', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Autobuses urbanos en China +15,1 % en 2025 y +4,8 % los de Yutong; el plan se mantiene en 2026 con la misma ayuda, pero la ola de eléctricos comprada en 2015-2018 con subvención ya se está sustituyendo: el mercado nacional bajó en 2025 (−4,5 %) y en el 1S26 [B1, B5].' },
      { driver: 'Exportación y electrificación fuera de China', efecto: '+', horizonte: 'Estructural', evidencia: 'Exportación de autobuses grandes y medianos +30,7 % en 2025 (58.140) y +18,5 % en el 1S26; en Europa las matriculaciones de autobús eléctrico +49 % en el 1S26 [B1, B5, B7].' },
      { driver: 'Turismo y transporte de viajeros en China', efecto: '−', horizonte: 'Cíclico', evidencia: 'Autocares nacionales −13,0 % en 2025 tras la recuperación de 2023-2024; en 2026 los frena el impuesto de compra de las eléctricas [B1, B5].' },
      { driver: 'Política comercial y seguridad en Europa', efecto: '−', horizonte: 'Estructural', evidencia: 'Pruebas de Ruter (Noruega) y Movia (Dinamarca) sobre el acceso remoto a los autobuses de Yutong; investigación del Reino Unido; Ruter endurecerá sus requisitos de compra [B10, B11, B13].' },
      { driver: 'Demografía y escuela', efecto: '−', horizonte: 'Estructural', evidencia: 'Autobuses escolares en China −3,3 % en 2025 por la natalidad [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Más de diez fabricantes chinos (King Long y su grupo, Zhongtong, BYD, Foton, Ankai, Golden Dragon) con márgenes EBIT del −1,5 % al 5,6 % frente al 14,3 % de Yutong; en exportación Yutong es segunda con el 17,4 % [B8, B9].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Compradores públicos por concurso; en China pagan tarde (cobros de más de cinco años de 1.381 M) [A1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Baterías concentradas (CATL y Shenlan, del grupo); el material es el 72 % del coste [A1, C6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala, homologación, red de servicio y referencias en concursos; las nuevas marcas de eléctricos no han pasado del 2-3 % [A1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Metro y tren de alta velocidad en China quitan viajeros de carretera; el autocar de línea cae [B1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'En China la reposición subvencionada ya ha pasado su punto alto: el mercado nacional bajó un 4,5 % en 2025 y vuelve a caer en 2026, y las ventas nacionales de Yutong caen ≈ 12 % en 9M26 [B1, B5, B8]. La exportación sigue creciendo pero Yutong pierde cuota en ella (+0,3 % frente a +11,6 % del sector en 9M26) [B8]. El sector cayó de 96.345 unidades (2020) a 84.202 (2022) con la pandemia y el fin de la subvención, y el beneficio de Yutong pasó de 1.942 M (2019) a 516-759 M en 2020-2022 [B4, A1]. En 2008-09 China mantuvo el volumen con la inversión pública.' },
    regulacion: 'En China, el plan «以旧换新» (desde 2024) subvenciona el cambio de autobuses urbanos de 8 años o más y sus baterías; sigue en 2026 con la misma ayuda y no hay decisión para 2027 [B1, B6]. Desde 2026 el impuesto de compra de los vehículos eléctricos deja de estar exento del todo, lo que frena los autocares [B5]. Las subvenciones nacionales al autobús eléctrico terminaron en 2022 y ya están cobradas [A1]. En la UE los derechos compensatorios de 2024 a los eléctricos chinos se aplican a turismos, no a autobuses; el riesgo viene de las compras públicas (requisitos de ciberseguridad tras las pruebas de Ruter y Movia) y de la ley de subvenciones extranjeras [B10, B11]. La UE exige el 90 % de autobuses urbanos nuevos sin emisiones en 2030 [B7].',
    tendencias: 'Electrificación: los autobuses eléctricos fueron el 37 % de las unidades de Yutong en 2025 y la penetración fuera de China es baja (≈ 11 % según Guosen), lo que favorece al fabricante con más experiencia en baterías [A1, D5]. Conducción asistida y autónoma (minibuses sin conductor, «车路云»), y servicio y piezas como negocio (Yutong abrió un centro propio en Noruega en septiembre de 2026) [B7]. Yutong gana con la electrificación y la exportación; pierde con el fin del ciclo nacional y si Europa cierra sus concursos a fabricantes chinos.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 32.5, posicion: '1.º en autobuses grandes y medianos de fabricantes chinos (32,5 % en 2025; 28,7 % en los de más de 6 m en 9M26); 2.º en exportación (17,4 % en 9M26); 1.º en matriculaciones de autobús eléctrico en Europa en el 1S26 [A1, B8, B7]',
    competidores: [
      { nombre: 'Xiamen King Long Motor (King Long, Golden Dragon, Higer)', pais: 'China', ticker: '600686.SS', ingresos: 24547, cuota_pct: null, margen_ebit_pct: 2.8, comentario: 'Segundo grupo chino y primero en exportación de autobuses; tres marcas, márgenes bajos [B9].' },
      { nombre: 'Zhongtong Bus', pais: 'China', ticker: '000957.SZ', ingresos: 7329, cuota_pct: null, margen_ebit_pct: 5.6, comentario: 'Fuerte en autocares y exportación; el margen ha subido con ella [B9].' },
      { nombre: 'BYD (autobuses)', pais: 'China', ticker: '002594.SZ', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival directo en autobús eléctrico (fábricas en Hungría, Francia y EE. UU.); no publica sus autobuses por separado (grupo: 803.965 M y 5,3 %) [B9].' },
      { nombre: 'Anhui Ankai Automobile', pais: 'China', ticker: '000868.SZ', ingresos: 3428, cuota_pct: null, margen_ebit_pct: -1.5, comentario: 'Del grupo JAC; pierde dinero [B9].' },
      { nombre: 'Daimler Truck (Daimler Buses: Mercedes-Benz, Setra)', pais: 'Alemania', ticker: 'DTG.DE', ingresos: null, cuota_pct: null, margen_ebit_pct: 6.9, comentario: 'Líder en Europa en autocares; grupo con 45.530 M EUR de ventas y margen EBIT del 6,9 % en 2025 (los autobuses son ≈ 10 % del grupo) [B9].' },
      { nombre: 'CAF (Solaris)', pais: 'España/Polonia', ticker: 'CAF.MC', ingresos: null, cuota_pct: null, margen_ebit_pct: 5.5, comentario: 'Solaris, líder europeo en autobús eléctrico urbano antes de Yutong; grupo CAF 4.487 M EUR y 5,5 % [B9].' },
      { nombre: 'NFI Group (New Flyer)', pais: 'Canadá', ticker: 'NFI.TO', ingresos: 24142, cuota_pct: null, margen_ebit_pct: 0.5, comentario: 'Líder en Norteamérica, mercado cerrado a Yutong por «Buy America»; 3.615 M USD y 0,5 % [B9].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de servicio (400 talleres, 40 almacenes de piezas fuera de China) da cierta ventaja en concursos, pero no un efecto de red [A6].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los operadores repiten proveedor por formación, piezas y plataformas de gestión de flota, pero cada concurso es nuevo [A1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de referencia en China y primera en eléctricos en Europa (1.636 matriculaciones en el 1S26); I+D de 1.808 M (4,4 % de las ventas), la mayor del sector [A1, B7].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen EBIT del 14,3 % en 2025 frente al 2,8-5,6 % de King Long y Zhongtong y el 6,9 % de Daimler Truck; baterías y cadena de suministro chinas [B9].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Un tercio del mercado chino de autobuses grandes y medianos durante más de diez años; 49.518 unidades en 2025, el doble que el siguiente [A1].' },
      ],
    },
    amenazas: 'Tres amenazas. (1) Europa: si los concursos públicos exigen origen europeo o fijan requisitos de ciberseguridad que excluyan a los fabricantes chinos (tras las pruebas de Ruter y Movia y la investigación británica), Yutong pierde su mercado de más margen; probabilidad media a cinco años [B10, B11, B13]. (2) Los rivales chinos (King Long, Zhongtong, BYD) ganan cuota en exportación: Yutong ha pasado a segunda con el 17,4 % y su exportación no crece en 9M26 mientras el sector sube un 11,6 %; probabilidad alta [B8]. (3) El fin de la reposición subvencionada en China recorta el volumen nacional y aumenta la guerra de precios; probabilidad media-alta.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Yutong nace en 1963 como taller de reparación de autobuses en Zhengzhou y sale a bolsa en Shanghái en 1997, la primera fabricante de autobuses cotizada de China [B12]. En 2001 la dirección, encabezada por Tang Yuxiang (presidente desde entonces), compró el control a la ciudad a través de Shanghai Wanshang; hoy controla el grupo a través de sociedades de los empleados [C1]. Fue la primera de China en ventas desde 2005, apostó pronto por el autobús eléctrico (en 2015-2016 vendió más de 20.000 al año con subvención) y entró en Europa en 2012 (Reino Unido y Francia) [B12]. Tras la caída de 2020-2022 se ha transformado en exportadora: el 58 % de las ventas de 2025 fue fuera de China [A1].',
    hitos: [
      { anio: '1963', hito: 'Fundación como taller de reparación de autobuses en Zhengzhou [B12].' },
      { anio: '1997', hito: 'Salida a la bolsa de Shanghái [B12].' },
      { anio: '2001', hito: 'La dirección compra el control a la ciudad de Zhengzhou; Tang Yuxiang, presidente [C1].' },
      { anio: '2012', hito: 'Primeros autobuses en Europa (Francia y Reino Unido) [B12].' },
      { anio: '2016', hito: 'Máximo de ventas con la subvención nacional al autobús eléctrico [B6].' },
      { anio: '2020-2022', hito: 'Pandemia y fin de la subvención: el beneficio baja a 516-759 M [A1].' },
      { anio: '2023', hito: 'La exportación se duplica (10.165 unidades) y llega al 38 % de las ventas [A2].' },
      { anio: '2025', hito: 'Récord de beneficio (5.554 M) y de reparto (99,65 %); exportación del 58 % [A1].' },
      { anio: '2026', hito: 'Primera marca de autobús eléctrico en Europa en el 1S26; cambio de auditor; ventas nacionales a la baja [B7, C8].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el producto: el 37 % de las unidades de 2025 fueron autobuses de nuevas energías (18.356) y Yutong ha exportado más de 13.000 eléctricos, lo que la pone del lado de la descarbonización del transporte público [A1, A6]. El segundo asunto es la **seguridad de datos de los autobuses conectados**: las pruebas de Ruter en Noruega y de Movia en Dinamarca (noviembre de 2025) mostraron que el fabricante puede acceder a la batería y a la gestión de energía para actualizaciones; Yutong dice que los datos de la UE están en un centro de AWS en Fráncfort y que no puede controlar dirección, frenos ni aceleración [B10, B11]. El tercero, la seguridad de las baterías (provisiones de garantía de 5.543 M) [A7].',
    controversias: 'Sin sanciones ni multas relevantes en tres años en los informes anuales [A1]. Controversia de ciberseguridad en Noruega, Dinamarca y el Reino Unido desde noviembre de 2025, sin incidentes registrados [B10, B11, B13]. Arbitraje de 269 M EUR de su antiguo distribuidor en Israel (2025) [C9].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (sin calificaciones externas citadas); 2) MSCI ESG y Sustainalytics (no abren sin registro); 3) prensa china (Wind ESG, sin fuente abierta)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo la cuota propia); 2) notas de brókeres (solo cuotas de Yutong); 3) 中国客车统计信息网 (de pago)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C: equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告: consejo, directivos y sueldos, accionista de control (Tang Yuxiang vía Tongtai), compromisos del grupo, operaciones vinculadas', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050742.PDF` },
  { id: 2, titulo: '2025年年度股东会决议公告 (acta de la junta del 27-abr-2026: votos por punto y de los accionistas de menos del 5 %)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-28', url: `${CN}/2026-04-28/1225206542.PDF` },
  { id: 3, titulo: '关于董事变动的公告 (dimisión del consejero Wang Xuemin, 28-ago-2026, y propuesta de sustituto)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-01', url: `${CN}/2026-09-01/1225535761.PDF` },
  { id: 4, titulo: '2026年第一次临时股东会决议公告 (junta extraordinaria del 17-sep-2026)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-18', url: `${CN}/2026-09-18/1225569995.PDF` },
  { id: 5, titulo: '2026年第三季度报告: diez primeros accionistas a 30-sep-2026', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225604484.PDF` },
  { id: 6, titulo: '关于2026年日常关联交易预计的公告 (vinculadas 2025: 2.354 M; compras de baterías a Shenlan 1.085 M)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050722.PDF` },
  { id: 7, titulo: '关于2026年对外担保预计的公告 (garantías y responsabilidad de recompra: 6.234 M)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050704.PDF` },
  { id: 8, titulo: '关于聘任会计师事务所的公告 (cambio de Da Hua a BDO China Shu Lun Pan para 2026)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-03-31', url: `${CN}/2026-03-31/1225050751.PDF` },
  { id: 9, titulo: '关于子公司涉及仲裁的公告 (China Motor reclama 269 M EUR a Hong Kong Yutong ante la CCI)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-10-29', url: `${CN}/2025-10-29/1224752501.PDF` },
  { id: 10, titulo: 'Informes anuales 2021-2024: plan anual de ventas de la dirección y resultado', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-01', url: `${CN}/2025-04-01/1222974533.PDF` },
  { id: 11, titulo: '关于投资私募基金的公告 (inversión en un fondo privado, sep-2026)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-09-15', url: `${CN}/2026-09-15/1225563724.PDF` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Tang Yuxiang (汤玉祥)', cargo: 'Presidente del consejo y del grupo Yutong; accionista de control', desde: '2001', participacion_pct: 0.07, trayectoria: '72 años; dirige Yutong desde los noventa y llevó la compra del control por la dirección en 2001; con él Yutong pasó de fábrica regional a primera de China y a exportadora. Controla el grupo (37,70 % + 3,95 %) con el 52 % de la sociedad gestora de los vehículos de los empleados [C1, C5]. Cobró 1,65 M CNY en 2025.' },
      { nombre: 'Li Panpan (李盼盼)', cargo: 'Consejero, director general y director financiero', desde: '2024', participacion_pct: 0.0, trayectoria: '41 años; ingeniero de producto y calidad de la casa, director general desde marzo de 2024 y además director financiero desde diciembre de 2024; vicepresidente del grupo. Bajo su mando, beneficio de 4.116 M (2024) y 5.554 M (2025) [C1].' },
      { nombre: 'Wang Wentao (王文韬)', cargo: 'Consejero y subdirector general (ventas)', desde: '2023', participacion_pct: 0.0, trayectoria: '42 años; antes director de marketing y de ventas nacionales [C1].' },
      { nombre: 'Dong Xiaokun (董晓坤)', cargo: 'Consejero (2026: fuera del consejo); ingeniero jefe', desde: '2024', participacion_pct: 0.0, trayectoria: '58 años; jefe técnico, dejó la subdirección general en jul-2025 [C1].' },
      { nombre: 'Yu Li (于莉)', cargo: 'Secretaria del consejo', desde: '2012', participacion_pct: 0.04, trayectoria: '51 años; 877.500 acciones [C1].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Ventas de 24.777 M', real: '23.233 M', cumplida: 'No' },
      { anio: '2022', guia: 'Ventas de 25.617 M', real: '21.799 M', cumplida: 'No' },
      { anio: '2023', guia: 'Ventas de 24.613 M', real: '27.042 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas de 32.900 M', real: '37.218 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas de 42.133 M', real: '41.426 M (−1,7 %)', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Volumen y ventas al alza (sin cifra)', real: '9M26: volumen −7,8 %, ventas −2,1 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo de la casa, muy estable y joven por debajo del presidente: el director general (41 años) es además director financiero, algo poco habitual que concentra poder en una persona [C1]. La dirección cumple su plan de ventas en los años buenos y lo pierde en los malos (2021-2022), y en 2026 va camino de no cumplir la subida prometida [C10, A7]. El riesgo de equipo es la sucesión de Tang Yuxiang (72 años), que preside desde 2001 y controla el grupo: no hay plan de sucesión publicado [C1].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Tang Yuxiang', cargo: 'Presidente', tipo: 'Dominical', desde: '2001', comisiones: 'Estrategia y ESG (presidente)' },
      { nombre: 'Li Panpan', cargo: 'Consejero ejecutivo, director general', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Estrategia' },
      { nombre: 'Wang Wentao', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Estrategia' },
      { nombre: 'Consejero propuesto en sustitución de Wang Xuemin (junta del 17-sep-2026)', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Pan Keqin (潘克勤)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Gong Jianwei (龚建伟)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Estrategia y ESG; nombramientos' },
      { nombre: 'Li Yufeng (李玉峰)', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Retribuciones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 99.63, voto_remuneracion_contra_pct: 0.03, voto_remuneracion_contra_libre_pct: 0.03, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.73, fijo: null, variable_corto: null, variable_largo: 0, ratio_salario_medio: null },
    remuneracion: 'Sueldos bajos para el tamaño: el director general cobró 1,73 M CNY antes de impuestos en 2025 y el presidente 1,65 M; los nueve consejeros y directivos, 9,65 M en total [C1]. El variable es anual y depende del cumplimiento del plan y de la evaluación del consejo; no hay plan de acciones desde que se canceló el de 2022 (311 M devueltos) [C1, A4]. Los accionistas de menos del 5 % aprobaron la remuneración con el 99,63 % (0,03 % en contra; el grupo no votó por ser parte vinculada) [C2]. Los directivos se alinean por otra vía: participan en el capital del grupo a través de las sociedades de empleados (通泰人合) [C1].',
    accionistas: [
      { nombre: 'Zhengzhou Yutong Group (郑州宇通集团)', pct: 37.70, tipo: 'Control (dirección y empleados, vía Tongtai)', variacion: 'Sin cambios' },
      { nombre: 'Hong Kong Securities Clearing (Stock Connect)', pct: 11.03, tipo: 'Inversores extranjeros por Stock Connect', variacion: 'Baja desde el 11,35 % de fin de 2025' },
      { nombre: 'Mengshi Bus (猛狮客车), filial del grupo', pct: 3.95, tipo: 'Control', variacion: 'Sin cambios' },
      { nombre: 'China Pacific Life (CPIC)', pct: 2.10, tipo: 'Aseguradora', variacion: '—' },
      { nombre: 'China Life', pct: 2.07, tipo: 'Aseguradora', variacion: '—' },
      { nombre: 'China Highway Vehicle Machinery (estatal)', pct: 1.85, tipo: 'Estatal', variacion: 'Sin cambios' },
      { nombre: 'Fondo Nacional de Seguridad Social (101)', pct: 0.86, tipo: 'Estatal', variacion: 'Nuevo entre los diez primeros en el 3T26' },
    ],
    insiders: [],
    control_y_defensas: 'Control de la dirección: el grupo Yutong (37,70 % directo y 3,95 % por Mengshi) lo controla Tang Yuxiang con el 52 % de la sociedad gestora de los vehículos de los empleados (Tongtai), que manda en el grupo sin derecho a beneficios [C1]. Una acción, un voto, sin blindajes. Operaciones vinculadas relevantes: 2.354 M en 2025 (compras de baterías a Shenlan, 1.085 M; servicios del grupo) y la financiera del grupo (Anchi) con 4.400 M de garantías de recompra, cuyas pérdidas asume el grupo [C6, C7]. La junta aprobó las garantías de 2026 con un 20,6 % en contra de los accionistas de menos del 5 % y la colocación de tesorería en productos financieros con un 14,4 % en contra [C2].',
    alertas: [
      'Garantías de recompra y financiera del grupo: 20,6 % de los minoritarios votó en contra de las garantías de 2026 [C2, C7].',
      'Arbitraje de 269 M EUR (≈ 2.200 M CNY) de China Motor ante la CCI, sin fecha de vista [C9].',
      'Cambio de auditor en 2026 tras 14 años (rotación obligatoria; sin desacuerdo declarado) [C8].',
      'Director general que es también director financiero desde diciembre de 2024 [C1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders (operaciones de 12 meses)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (sin cambios en las acciones de consejeros: 2.410.863 al inicio y al final); 2) anuncios de CNINFO de 12 meses (sin anuncios de compra o venta de directivos); 3) 3T26 (accionistas sin cambios)', decision: 'Comprobado: sin operaciones' },
    { seccion: 'gobierno', campo: 'remuneracion_ceo (fijo, variable)', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo el total antes de impuestos); 2) acta de la junta de 2026 (sin desglose); 3) propuesta de sueldos de 2026 (criterios sin cifras)', decision: 'Omitido el desglose' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D: mercado y valoración
const bol = lee('bolsa.json');
const cy = lee('comparables-yahoo.json');
const comp = (t) => cy.empresas.find((e) => e.ticker === t);
// Fuera: BYD (los autobuses son una parte mínima de un fabricante de turismos), Iveco (bajo oferta de Tata Motors: el precio no es de
// mercado) y Ashok Leyland (sin capitalización en la ficha).
const comparables = ['600686.SS', '000957.SZ', '600166.SS', '3808.HK', '000338.SZ', 'DTG.DE', 'VOLV-B.ST', '8TRA.DE', 'NFI.TO'].map((t) => {
  const e = comp(t);
  return { nombre: e.nombre, ticker: t, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null,
    per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
});
const fD = [
  { id: 1, titulo: 'Históricos diarios de 600066.SS, 510300.SS (CSI 300) y 516110.SS (ETF del sector del automóvil): rentabilidades, beta, volatilidad, cierres de ejercicio (`herramientas/bolsa.mjs`)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/600066.SS/history' },
  { id: 2, titulo: 'Cotización de sh600066 al cierre del 21-oct-2026 (27,90 CNY a las 15:34:59 de Pekín; cierre anterior 28,68)', editor: 'Sina Finance (hq.sinajs.cn)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.sina.com.cn/realstock/company/sh600066/nc.shtml' },
  { id: 3, titulo: 'Fichas y consenso de Yahoo (earningsTrend, objetivo medio de 8 analistas: 38,10 CNY) de Yutong y de los comparables (`notas/comparables-yahoo.mjs`)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/600066.SS/analysis' },
  { id: 4, titulo: 'Lista de informes de analistas de 600066 con BPA previstos (Guosen, Hualong, Southwest, Soochow, Dongguan, Minsheng)', editor: 'Eastmoney (研报中心)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://data.eastmoney.com/report/stock.jshtml?code=600066' },
  { id: 5, titulo: '宇通客车-盈利能力持续攀升，三季度扣非利润同比增长22% (previsiones 2026-2028; penetración eléctrica fuera de China ≈ 11 %)', editor: 'Guosen Securities (国信证券)', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610201830704774_1.pdf' },
  { id: 6, titulo: '宇通客车 2026 年三季报点评 (margen bruto del 3T26 26,73 %; exportación del 3T26 ≈ 4.000, −15,3 %; previsiones 2026-2028)', editor: 'Soochow Securities (东吴证券)', tipo: 'Analistas', fecha: '2026-10-16', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610161830577526_1.pdf' },
  { id: 7, titulo: 'Curva de bonos del Estado chino (中债国债收益率曲线), 10 años: 1,6354 % el 20-oct-2026', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://yield.chinabond.com.cn/cbweb-mn/yield_main' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'List of SSE Securities / China Connect Securities (comprables y vendibles): 600066, CCASS 90066 (actualizada el 20-oct-2026 para la sesión siguiente)', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SSE_Securities.xls' },
  { id: 10, titulo: 'Hong Kong - China Stock Connect (clientes con permiso China Connect; ChiNext y STAR solo para profesionales institucionales; comisión 0,08 %; cuota diaria; IBHK no ofrece el servicio)', editor: 'Interactive Brokers (base de conocimiento)', tipo: 'Primaria', fecha: '2026-10', url: 'https://ibkb.interactivebrokers.com/article/2267' },
  { id: 11, titulo: '2026年第三季度报告 (balance a 30-sep-2026 para el puente)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225604484.PDF` },
  { id: 12, titulo: 'Cotizaciones mensuales sin ajustar de 600066 (cierres de diciembre 2017-2025)', editor: 'Eastmoney (push2his)', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://quote.eastmoney.com/sh600066.html' },
  { id: 13, titulo: '宇通客车（600066）2026 年三季报点评 (previsiones 2026-2028)', editor: 'Southwest Securities (西南证券)', tipo: 'Analistas', fecha: '2026-10-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610171830643263_1.pdf' },
  { id: 14, titulo: '宇通客车三季报点评 (previsiones 2026-2028)', editor: 'Hualong Securities (华龙证券)', tipo: 'Analistas', fecha: '2026-10-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202610171830643300_1.pdf' },
  { id: 15, titulo: 'Calendario: conferencia de resultados del 3T26 el 23-oct-2026 (关于召开2026年第三季度业绩说明会的公告)', editor: 'Yutong Bus (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-10-15', url: `${CN}/2026-10-15/1225604490.PDF` },
];
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Yutong Bus Co., Ltd. (宇通客车股份有限公司)', nombre_corto: 'Yutong', ticker: '600066', isin: 'CNE000000PY4',
    mercado: 'Bolsa de Shanghái, mercado principal (acciones A en CNY; en el Stock Connect hacia el norte)', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Industria', industria: 'Maquinaria (camiones y autobuses)', sede: 'Zhengzhou (Henan)', fundacion: '1963', empleados: 19577,
    web: 'https://www.yutong.com', precio: 27.9, fecha_precio: '2026-10-21', acciones: ACCIONES, capitalizacion_publicada: 61769, free_float_pct: 57.0,
    max_52s: 38.5, min_52s: 24.66, volumen_medio_diario: '≈ 602 M CNY/día (3 meses)', proximos_resultados: '2027-03-31',
  },
  consenso: {
    guidance: 'Sin guía numérica. En el anual 2025 la dirección prevé para 2026 «volumen e ingresos al alza» y 390 M de inversiones en curso y 646 M nuevas [A1]. Tras 9M26 (volumen −7,8 %, ventas −2,1 %) no la ha cambiado; la conferencia de resultados del 3T26 es el 23-oct-2026 [D15]. Desde 2021 publicaba una cifra de ventas (42.133 M para 2025, cumplida al 98 %) [C10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 45509, ebitda: null, ebit: null, bpa: 2.74, dpa: null, fuente: 'Media de Guosen, Soochow, Southwest y Hualong tras el 3T26 [D5, D6, D13, D14]' },
      { periodo: '2027e', ingresos: 50378, ebitda: null, ebit: null, bpa: 3.08, dpa: null, fuente: 'Ídem [D5, D6, D13, D14]' },
      { periodo: '2028e', ingresos: 55025, ebitda: null, ebit: null, bpa: 3.44, dpa: null, fuente: 'Ídem [D5, D6, D13, D14]' },
    ],
    recomendaciones: { n_analistas: 8, comprar: 8, mantener: 0, vender: 0, po_medio: 38.1, po_min: null, po_max: null },
    revisiones: 'Los cuatro brókeres que publicaron tras el 3T26 mantuvieron sus previsiones (BPA 2026e de 2,71-2,80; 2027e de 2,98-3,18) aunque 9M26 deja el beneficio un 3,3 % por debajo del año anterior: para llegar a 2,74 CNY el 4T26 tendría que ganar 2.880 M, un 27 % más que el 4T25 [D4, A7]. Yahoo, con estimaciones más recientes, da 2,46 y 2,79 CNY (hace 90 días, 2,40 y 2,70) [D3]. La tendencia de 3 meses es estable o al alza en Yahoo y sin cambios en los brókeres chinos. Ninguno publica EBITDA: usamos BPA y ventas. Las ocho recomendaciones de Yahoo son de compra (objetivo medio 38,10 CNY) [D3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bol.bolsa, beta: 0.63, volatilidad_pct: bol.bolsa.volatilidad_pct, max_drawdown_pct: bol.bolsa.max_drawdown_pct, posicion_corta_pct: null, comentario: null },
  multiplos_historicos: {
    serie: ANIOS.map((a) => ({ anio: String(a), precio_cierre: bol.cierres_ejercicio.find((c) => c.anio === String(a)).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: a === 2020 || a === 2021 })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Nueve fabricantes de vehículos comerciales: tres chinos de autobuses y camiones (King Long, Zhongtong, Foton), dos chinos de camiones y motores (Sinotruk, Weichai) y cuatro occidentales de camiones y autobuses (Daimler Truck, Volvo, Traton, NFI), todos con datos de Yahoo a la misma fecha y en CNY [D3]. Fuera BYD (sus autobuses son una parte mínima de un fabricante de turismos), Iveco (bajo oferta de compra de Tata Motors) y Ashok Leyland (ficha incompleta). No hay ningún otro fabricante de autobuses puro con márgenes como los de Yutong.',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  valoracion: { referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran; el riesgo de China va en la prima adicional)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' } },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'sección entera', tipo: 'Complemento', intentos: '1) Compras del sector con cifras oficiales (CAF-Solaris 2018, Tata-Iveco 2025): sin EBITDA del perímetro vendido publicado de forma comparable; 2) prensa sectorial (Sustainable Bus, Reuters): importes sin múltiplos verificables; 3) operaciones chinas (King Long, Zhongtong): sin compras de control en 5-7 años', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SSE (préstamo de valores, sin posición corta neta); 2) Eastmoney (solo saldo de financiación: 203 M el 20-oct); 3) Yahoo', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'ebitda y ebit del consenso', tipo: 'Complemento', intentos: '1) Notas de Guosen, Soochow, Southwest y Hualong (solo ventas y beneficio; Guosen da margen EBIT); 2) Yahoo (solo BPA y ventas); 3) MarketScreener (sin cobertura de acciones A)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E: sentimiento
const fE = [
  { id: 1, titulo: 'Foro de 600066 en Guba (股吧), tres primeras páginas (≈ 150 mensajes del 14 al 21 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://guba.eastmoney.com/list,600066.html' },
  { id: 2, titulo: '«宇通客车少卖2600辆，毛利却多6个亿，海外销量撑起利润基本盘» y comentarios', editor: 'Eastmoney Guba (artículo de portada)', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://guba.eastmoney.com/list,600066.html' },
  { id: 3, titulo: '«【财报侦探档案】宇通客车：国内市场承压，增长押注海外出海» y «宇通客车前三季度：车卖得少了，为何赚得更多了？»', editor: 'Eastmoney Guba (artículos y debate)', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://guba.eastmoney.com/list,600066,f_2.html' },
  { id: 4, titulo: 'Foro de 600066 en Guba, página 3 (preguntas a la empresa sobre dividendo y sucesión)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://guba.eastmoney.com/list,600066,f_3.html' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Guba, hilos del día (21-oct)', fecha: '2026-10', n_comentarios: 40, tono: 'Negativo', resumen: 'Tras caer un 4 % en dos sesiones, dominan los mensajes de corto plazo: «esperar a 26», «25 comprar, 29 vender», «no se sostiene en la media de 5 días» [E1].' },
      { plataforma: 'Guba, debate de los resultados del 3T26', fecha: '2026-10', n_comentarios: 50, tono: 'Positivo', resumen: 'El tema es «vende menos y gana más»: el beneficio sin no recurrentes (+22 % en el 3T26) y la exportación compensan la caída nacional; varios defienden que la caída del beneficio publicado es solo de la tesorería [E2, E3].' },
      { plataforma: 'Guba, hilos de dividendo', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Atrae la rentabilidad por dividendo («7,37 %»), pero otros señalan que este año no hay dividendo a cuenta y preguntan si se mantendrá el reparto [E1, E4].' },
      { plataforma: 'Guba, preguntas a la empresa', fecha: '2026-10', n_comentarios: 15, tono: 'Neutro', resumen: 'Preguntas sobre la sucesión de Tang Yuxiang («¿qué pasa si se jubila?») y sobre la previsión de 2026 tras el −7 % de volumen [E4].' },
    ],
    temas: [
      { tema: 'Exportación y margen («vende menos, gana más»)', postura: 'Alcista', peso: 'Alto', contraste: 'Tienen razón en el margen (bruto del 26,7 % en el 3T26) pero no en el volumen de exportación: el de Yutong cae un 16,8 % en el 3T26 y en 9M26 crece un 0,3 % con el sector al +11,6 % [A7, B8].' },
      { tema: 'Dividendo alto', postura: 'Alcista', peso: 'Alto', contraste: 'El 2,50 CNY de 2025 es un 9,0 % del precio de hoy, pero salió del 99,65 % de un beneficio con 974 M de no recurrentes; con un BPA de 2026 de ≈ 2,4 CNY el dividendo esperable es menor [A13, A1].' },
      { tema: 'Caída del mercado nacional', postura: 'Bajista', peso: 'Medio', contraste: 'Es real: ventas nacionales ≈ −12 % en 9M26, autocares frenados por el impuesto de compra [A11, B5].' },
      { tema: 'Sucesión del presidente', postura: 'Dividida', peso: 'Bajo', contraste: 'Tang Yuxiang tiene 72 años y no hay plan publicado; el director general tiene 41 [C1].' },
    ],
    lectura: 'El particular chino ve a Yutong como un valor de dividendo que «siempre vuelve» y la opera en un rango de 25-29 CNY [E1]. No hay euforia ni capitulación. El foro exagera la rentabilidad por dividendo (calcula con los 2,50 CNY de 2025, que incluían beneficio no recurrente) y no ve que la exportación de Yutong ha dejado de crecer mientras la del sector sube; los analistas tampoco lo recogen en sus previsiones. Aporta un aviso: el dividendo es lo que sostiene el precio, y un recorte en marzo de 2027 lo pondría a prueba.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.', { ltm: LTM, tri: tri.map((t) => [t.periodo, t.ingresos, t.crecimiento_pct, t.bpa]), caja_sep: cajaDe(Zsep) });
console.log(cuenta.map((c) => [c.periodo, c.ingresos, c.ebitda, c.ebit, c.beneficio_neto, c.bpa, c.acciones_diluidas]));
console.log(balance.map((b) => [b.periodo, b.caja, b.deuda_financiera, b.arrendamientos]));
