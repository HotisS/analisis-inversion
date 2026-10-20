// Notas A-E de China Resources Sanjiu Medical & Pharmaceutical Co., Ltd. (华润三九医药股份有限公司, SZSE 000999, «CR Sanjiu»).
// Corte 2026-10-20 (martes; Shenzhen cerró a las 15:00 de Pekín, 07:00 UTC). Cifras en millones de CNY salvo que se diga otra cosa.
// Las series de cuentas salen de los estados CAS publicados en los informes de CNINFO; para no transcribir a mano se leen de la copia
// estructurada de Eastmoney F10 (notas/docs/eastmoney-*.json), cotejada con los informes anuales 2021-2025 y el semestral 2026
// (ingresos y beneficio de 2023-2025 idénticos al céntimo en el anual 2025 [A1]).
// Ejecutar: node informes/cr-sanjiu-2026-10-20/notas/construir-notas.mjs
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

// ---------------------------------------------------------------- estados (Eastmoney F10, copia de los CAS)
function filas(tabla) {
  const out = {};
  for (const f of fs.readdirSync(path.join(dir, 'docs')).filter((x) => x.startsWith(`eastmoney-${tabla}-`))) {
    for (const r of lee(`docs/${f}`).result.data) out[r.REPORT_DATE.slice(0, 10)] = r;
  }
  return out;
}
const L = filas('lrb'), Z = filas('zcfzb'), X = filas('xjllb');
const fin = (a) => `${a}-12-31`;
// EBIT: resultado de explotación sin rendimientos financieros (inversiones, valor razonable) y sin gasto financiero neto; con lo no operativo.
// Las subvenciones (其他收益) y los deterioros se quedan en el EBIT. La participación en asociadas (投资收益 de asociadas) sale al financiero.
const ebitDe = (l) => M(l.OPERATE_PROFIT) - M(l.INVEST_INCOME) - M(l.FAIRVALUE_CHANGE_INCOME) + M(l.FINANCE_EXPENSE) + M(l.NONBUSINESS_INCOME) - M(l.NONBUSINESS_EXPENSE);
const daDe = (x) => M(x.FA_IR_DEPR) + M(x.IA_AMORTIZE) + M(x.LPE_AMORTIZE) + M(x.USERIGHT_ASSET_AMORTIZE);
// Ampliaciones liberadas: 3 por 10 en junio de 2024 y 3 por 10 en junio de 2025 (factor 1,69 sobre las acciones de 2023 y antes) [A1, A2, A11].
// BPA y DPA en la base de hoy (1.664,22 M de acciones): BPA publicado ÷ factor (el anual 2024 ya reexpresa 2023 por la primera; el 2025, 2024 por la segunda).
const FACTOR_BPA = { 2021: 1.69, 2022: 1.69, 2023: 1.3, 2024: 1, 2025: 1 };
// DPA por ejercicio en la base de hoy [A11]: 2021 0,8528; 2022 1,00; 2023 1,50 (÷1,69); 2024 1,00 a cuenta (÷1,3) + 0,32 final (÷1,3); 2025 0,45 + 0,59.
export const DPA = { 2021: 0.5046, 2022: 0.5917, 2023: 0.8876, 2024: 1.0154, 2025: 1.04 };
const ANIOS = [2021, 2022, 2023, 2024, 2025];
const cuenta = ANIOS.map((a) => {
  const l = L[fin(a)], x = X[fin(a)];
  const ebit = ebitDe(l), am = daDe(x);
  const bpa = l.DILUTED_EPS / FACTOR_BPA[a];
  return {
    periodo: String(a), ingresos: r2(M(l.TOTAL_OPERATE_INCOME)), coste_ventas: r2(M(l.OPERATE_COST) + M(l.OPERATE_TAX_ADD)),
    gastos_generales: r2(M(l.SALE_EXPENSE) + M(l.MANAGE_EXPENSE) + M(l.RESEARCH_EXPENSE)), ebitda: r2(ebit + am), amortizaciones: r2(am), ebit: r2(ebit),
    resultado_financiero: r2(-M(l.FINANCE_EXPENSE) + M(l.INVEST_INCOME) + M(l.FAIRVALUE_CHANGE_INCOME)), bai: r2(M(l.TOTAL_PROFIT)), impuestos: r2(M(l.INCOME_TAX)),
    minoritarios: r2(M(l.MINORITY_INTEREST)), beneficio_neto: r2(M(l.PARENT_NETPROFIT)), gastos_financieros: r2(M(l.FE_INTEREST_EXPENSE)),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(bpa), dpa: DPA[a], dpa_extraordinario: 0,
    acciones_diluidas: r2(M(l.PARENT_NETPROFIT) / bpa),
  };
});
// Caja = efectivo (货币资金) + productos de tesorería a valor razonable (交易性金融资产: depósitos estructurados y productos bancarios) [A1, A6].
const balance = ANIOS.map((a) => {
  const z = Z[fin(a)];
  return {
    periodo: String(a), activo_total: r2(M(z.TOTAL_ASSETS)), activo_corriente: r2(M(z.TOTAL_CURRENT_ASSETS)), pasivo_corriente: r2(M(z.TOTAL_CURRENT_LIAB)),
    pasivo_total: r2(M(z.TOTAL_LIABILITIES)), fondo_comercio: r2(M(z.GOODWILL)), intangibles: r2(M(z.INTANGIBLE_ASSET) + M(z.DEVELOP_EXPENSE)),
    inmovilizado_material: r2(M(z.FIXED_ASSET) + M(z.CIP) + M(z.USERIGHT_ASSET)), existencias: r2(M(z.INVENTORY)),
    clientes: r2(M(z.NOTE_ACCOUNTS_RECE) + M(z.FINANCE_RECE)), proveedores: r2(M(z.NOTE_ACCOUNTS_PAYABLE)), activos_contrato: null,
    pasivos_contrato: r2(M(z.CONTRACT_LIAB) + M(z.ADVANCE_RECEIVABLES)), caja: r2(M(z.MONETARYFUNDS) + M(z.TRADE_FINASSET_NOTFVTPL)),
    deuda_financiera: r2(M(z.SHORT_LOAN) + M(z.LONG_LOAN) + M(z.NONCURRENT_LIAB_1YEAR) * 0.6),
    arrendamientos: r2(M(z.LEASE_LIAB) + M(z.NONCURRENT_LIAB_1YEAR) * 0.4), patrimonio_neto: r2(M(z.TOTAL_PARENT_EQUITY)), minoritarios: r2(M(z.MINORITY_EQUITY)),
    reservas: r2(M(z.UNASSIGN_RPOFIT) + M(z.SURPLUS_RESERVE)),
  };
});
const flujos = ANIOS.map((a) => {
  const x = X[fin(a)];
  return {
    periodo: String(a), flujo_operativo: r2(M(x.NETCASH_OPERATE)), capex: r2(M(x.CONSTRUCT_LONG_ASSET)), pagos_arrendamientos: r2(M(x.PAY_OTHER_FINANCE)),
    adquisiciones: r2(M(x.OBTAIN_SUBSIDIARY_OTHER)), desinversiones: r2(M(x.DISPOSAL_LONG_ASSET) + M(x.DISPOSAL_SUBSIDIARY_OTHER)), dividendos: r2(M(x.ASSIGN_DIVIDEND_PORFIT)),
    recompras: 0, emision_acciones: r2(M(x.ACCEPT_INVEST_CASH)), intereses_en_financiacion: 0,
  };
});
// Trimestres (de los acumulados publicados)
const cortes = ['2023-12-31', '2024-03-31', '2024-06-30', '2024-09-30', '2024-12-31', '2025-03-31', '2025-06-30', '2025-09-30', '2025-12-31', '2026-03-31', '2026-06-30', '2023-09-30', '2023-06-30', '2023-03-31'];
const etiqueta = { '03-31': '1T', '06-30': '2T', '09-30': '3T', '12-31': '4T' };
const solo = {};
const prevDe = (k) => { if (k.endsWith('03-31')) return null; const y = k.slice(0, 4); return { '06-30': `${y}-03-31`, '09-30': `${y}-06-30`, '12-31': `${y}-09-30` }[k.slice(5)]; };
for (const k of cortes) {
  const l = L[k]; const p = prevDe(k); const pv = p ? L[p] : null; const xx = X[k]; const xp = p ? X[p] : null;
  const v = (c) => M(l[c]) - (pv ? M(pv[c]) : 0);
  const ebit = ebitDe(l) - (pv ? ebitDe(pv) : 0);
  const da = xx && (k.endsWith('06-30') || k.endsWith('12-31')) ? null : null; // D&A solo semestral
  solo[k] = { ventas: v('TOTAL_OPERATE_INCOME'), neto: v('PARENT_NETPROFIT'), ebit, da };
}
const tri = [];
for (const k of ['2024-09-30', '2024-12-31', '2025-03-31', '2025-06-30', '2025-09-30', '2025-12-31', '2026-03-31', '2026-06-30']) {
  const s = solo[k]; const ant = solo[`${Number(k.slice(0, 4)) - 1}${k.slice(4)}`];
  tri.push({ periodo: `${etiqueta[k.slice(5)]}${k.slice(2, 4)}`, ingresos: r2(s.ventas), crecimiento_pct: ant ? r1((s.ventas / ant.ventas - 1) * 100) : null, crecimiento_organico_pct: null,
    ebitda: null, margen_ebitda_pct: null, bpa: r2(s.neto / 1664.22), vs_consenso: null });
}
export const SOLO = solo;
// LTM a jun-26
const ltmV = (c) => M(L['2025-12-31'][c]) - M(L['2025-06-30'][c]) + M(L['2026-06-30'][c]);
const ebitLtm = ebitDe(L['2025-12-31']) - ebitDe(L['2025-06-30']) + ebitDe(L['2026-06-30']);
const daLtm = daDe(X['2025-12-31']) - daDe(X['2025-06-30']) + daDe(X['2026-06-30']);
const xL = (c) => M(X['2025-12-31'][c]) - M(X['2025-06-30'][c]) + M(X['2026-06-30'][c]);
const fcfLtm = xL('NETCASH_OPERATE') - xL('CONSTRUCT_LONG_ASSET') - xL('PAY_OTHER_FINANCE');
export const LTM = { ventas: ltmV('TOTAL_OPERATE_INCOME'), ebit: ebitLtm, da: daLtm, neto: ltmV('PARENT_NETPROFIT'), fcf: fcfLtm };

const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, normas chinas CAS): estados consolidados 2025 y 2024, ventas por producto y región (con el criterio nuevo y el anterior), fondo de comercio, compra de Tasly, minoritarios por filial, I+D, dividendos', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-03-21', url: `${CN}/2026-03-21/1225023101.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024, CAS): estados 2024 y 2023, segmentos CHC, receta y medicina tradicional (KPC), cambios en la dirección', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-13', url: `${CN}/2025-03-13/1222778310.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023, CAS): estados 2023 y 2022, compra del 28 % de KPC (2.902 M CNY)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2024-03-23', url: `${CN}/2024-03-23/1219390439.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022, CAS): estados 2022 y 2021', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2023-03-29', url: `${CN}/2023-03-29/1216247003.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021, CAS): estados 2021', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2022-03-26', url: `${CN}/2022-03-26/1212687881.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026, CAS): balance a 30-jun-2026, cuenta y flujos del 1S26, ventas por producto, Tasly y KPC, deuda por tipo', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-08-22', url: `${CN}/2026-08-22/1225492182.PDF` },
  { id: 7, titulo: '2025年半年度报告 (informe semestral 2025, CAS): cuenta y flujos del 1S25', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-08-16', url: `${CN}/2025-08-16/1224498660.PDF` },
  { id: 8, titulo: '2026年一季度报告 (1T26)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-04-25', url: `${CN}/2026-04-25/1225178865.PDF` },
  { id: 9, titulo: '2025年三季度报告 (9M25)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-10-25', url: `${CN}/2025-10-25/1224733660.PDF` },
  { id: 10, titulo: 'Estados financieros estructurados de 000999 (利润表, 资产负债表, 现金流量表) 1996-1S26: copia de los CAS usada para no transcribir a mano', editor: 'Eastmoney F10', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SZ000999' },
  { id: 11, titulo: 'Historial de repartos de 000999 (dividendos y ampliaciones liberadas de 3 por 10 en 2024 y 2025)', editor: 'Eastmoney (datos de los anuncios de reparto)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://data.eastmoney.com/yjfp/detail/000999.html' },
  { id: 12, titulo: '2026年半年度权益分派实施公告 (dividendo a cuenta del 1S26: 0,415 CNY por acción, 690,65 M, fecha ex 16-oct-2026)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-10-09', url: `${CN}/2026-10-09/1225598051.PDF` },
  { id: 13, titulo: '关于2025年度计提各项资产减值准备的公告 (deterioros de 2025: 338 M dotados, 184 M revertidos)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-03-21', url: `${CN}/2026-03-21/1225023112.PDF` },
  { id: 14, titulo: '重大资产购买报告书（草案）（修订稿） (compra del 28 % de Tasly: 14,85 CNY por acción, 6.211,8 M; ventas y beneficio de Tasly 2023-2024; cuentas pro forma)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-18', url: `${CN}/2025-03-18/1222822415.PDF` },
  { id: 15, titulo: 'Nota de resultados del 1S26: «内生稳健，期待并购成效释放» (2T26, CHC y receta por separado, previsiones 2026-2028)', editor: 'Sinolink Securities (国金证券), vía Eastmoney', tipo: 'Analistas', fecha: '2026-08-24', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608241828349107_1.pdf' },
  { id: 16, titulo: 'Nota de resultados del 1S26: «上半年利润承压» (supuestos por negocio y previsiones 2026-2028)', editor: 'Southwest Securities (西南证券), vía Eastmoney', tipo: 'Analistas', fecha: '2026-08-22', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609011828846588_1.pdf' },
  { id: 17, titulo: '2026年半年度业绩快报 (avance de resultados del 1S26)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-07-15', url: `${CN}/2026-07-15/1225424829.PDF` },
  { id: 18, titulo: 'Nota de resultados de 2025: «业绩表现韧性十足» (CHC con el criterio anterior, KPC y Tasly en 2025)', editor: 'Sinolink Securities (国金证券), vía Eastmoney', tipo: 'Analistas', fecha: '2026-03-22', url: 'https://pdf.dfcfw.com/pdf/H3_AP202603221820687960_1.pdf' },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r2(LTM.ventas), ebitda: r2(LTM.ebit + LTM.da), ebit: r2(LTM.ebit), beneficio_neto: r2(LTM.neto), bpa: r2(LTM.neto / 1664.22), dpa: 1.0, dpa_extraordinario: 0, fcf: r2(fcfLtm), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2023', descripcion: 'KPC (昆药集团), 28 % comprado por 2.902 M CNY, consolidado desde enero de 2023: entra en cuenta y balance (ventas de medicina tradicional de 4.087 M en 2023) [A3].' },
      { periodo: '2025', descripcion: 'Tasly (天士力), 28 % comprado por 5.990 M CNY de coste de combinación, consolidado desde el 27-mar-2025: nueve meses en la cuenta (5.616 M de ventas) y el balance entero a diciembre; fondo de comercio de 1.939 M [A1, A14].' },
    ],
    comentario: 'Las ventas pasaron de 15.544 M CNY en 2021 a 31.603 M en 2025, pero casi todo el crecimiento es comprado: KPC entró en 2023 (+4.087 M) y Tasly en 2025 (5.616 M en nueve meses) [A1, A3]. Sin compras, el negocio de siempre creció poco: el CHC (sin receta) con el criterio anterior pasó de 9.276 M (2021) a 12.482 M (2024) y cayó un 6,75 % en 2025, a 11.639 M; KPC cayó un 33,7 % (3.458 M) [A1, A2, A5]. El margen EBITDA se ha mantenido entre el 18 % y el 20 %: margen bruto del 54 % en 2025 (+2,1 puntos por la mezcla de Tasly) que se come la publicidad y la red comercial (gasto comercial del 28,8 % de las ventas) y una I+D que sube del 3,6 % al 4,0 % de las ventas [A1]. El beneficio atribuido solo creció un 1,6 % en 2025 (3.421 M) porque el 72 % del beneficio de Tasly y KPC es de los minoritarios (745 M frente a 410 M) y la compra se pagó con deuda [A1]. En el 1S26 las ventas subieron un 1,4 % con Tasly todo el semestre (el 2T26, ya comparable, cayó un 13,5 %) y el beneficio bajó un 8,0 % por las pérdidas de KPC (≈ 370 M) [A6, A15].',
    ajustes: 'Cifras publicadas (CAS). En el coste de ventas se suman los impuestos y recargos (税金及附加: 382 M en 2025) [A1]. El EBIT excluye el resultado de las inversiones financieras y de las asociadas (投资收益 −3 M y valor razonable +262 M en 2025, que pasan al financiero) e incluye las subvenciones (其他收益, 338 M en 2025, recurrentes cada año entre 217 y 338 M) y los deterioros de cuentas a cobrar, existencias y desarrollo (154 M netos en 2025; 217 M en el 1S26) [A1, A6, A13]. El beneficio sin extraordinarios (扣非) es un 8 % menor que el publicado (3.134 M frente a 3.421 M en 2025; 1.597 M frente a 1.671 M en el 1S26): la diferencia son subvenciones y plusvalías de productos financieros [A1, A6]. BPA y DPA de 2021-2023 divididos entre 1,69 y 1,3 por las ampliaciones liberadas de 3 por 10 de 2024 y 2025 [A11]. I+D capitalizada: 469 M en 2025 (el 27 % de la inversión en I+D, 16 % en 2024) [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: tri,
    ultima_presentacion: 'La empresa no publica la transcripción de sus conferencias (la del 1S26 fue en la plataforma de inversores de SZSE a finales de agosto); se siguen por las notas de los brókeres [A15, A16]. En marzo de 2026, con las cuentas de 2025, el mensaje era de «resiliencia»: el CHC con el criterio anterior cayó un 6,75 % pero menos que en el 1S25 gracias a la gripe del 4T25 (ventas del 4T25 +22,1 %), 45 productos de más de 100 M y Tasly «estable» (ventas −3,1 %, beneficio +15,6 %) [A18]. En agosto el discurso cambió a «presión»: el CHC con el criterio nuevo cayó un 23,3 % en el 1S26 por la menor incidencia respiratoria y por el ajuste de canal de KPC, que perdió ≈ 370 M; la receta subió un 42,1 % por Tasly [A6, A15]. Los brókeres preguntan por el suelo de KPC y por el fondo de comercio; la dirección no da guía numérica: en el anual solo promete crecer «por encima del sector» con un beneficio «que acompañe» a las ventas [A1, A16].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Efectivo 3.203 M + productos de tesorería 4.033 M a 30-jun-2026 (7.236 M) frente a deuda bancaria de 4.290 M (corto 1.233 M, largo 2.848 M, parte corriente del largo 208 M) [A6]. El dividendo a cuenta del 1S26 (690,65 M) se pagó el 16-oct-2026 [A12].',
    rating: 'Sin rating (no tiene bonos; una filial registró en septiembre de 2026 un programa de pagarés y bonos en el mercado interbancario)',
    coste_deuda_pct: 2.6,
    vida_media_anios: null,
    otros_pasivos: 'Sin pensiones de prestación definida relevantes (1.510 jubilados a cargo, gasto menor) [A1]. Los pasivos que importan: el préstamo de compra de Tasly (préstamo sindicado de largo plazo, signado en marzo de 2025) dentro de la deuda bancaria, avales a filiales de KPC y Tasly aprobados para 2026, y la cesión de cuentas a cobrar sin recurso a la factoría del grupo China Resources (operación vinculada aprobada en agosto de 2026) [A1, A6]. Los anticipos de clientes (合同负债) son pequeños: 1.007 M a jun-26 (1.783 M a fin de 2025), de mayoristas antes de la temporada de gripe [A6]. Fondo de comercio de 7.063 M (1.939 M de Tasly y 1.129 M de KPC, que pierde dinero en 2026): es el pasivo contingente más relevante, como deterioro [A1].',
    comentario: 'El balance pasó de caja neta (5.550 M en 2024 con los productos de tesorería) a deuda neta pequeña tras pagar Tasly en efectivo (5.251 M netos de la caja adquirida en 2025): deuda bancaria de ≈ 6.160 M a fin de 2025 y 4.290 M a jun-26, frente a 7.236 M de caja y tesorería [A1, A6]. El circulante comercial es alto: existencias de 6.115 M y cuentas y efectos a cobrar de 9.748 M frente a proveedores de 3.153 M a jun-26, un 42 % de las ventas anualizadas (35 % en 2021) [A6]. Parte se debe a Tasly y KPC, que venden a hospitales y cobran tarde, y parte al CHC, que vende a mayoristas antes de la temporada de gripe. Los minoritarios del balance ya son 16.303 M (el 42 % de los fondos propios del grupo) [A6].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es buena: flujo operativo de 5.513 M en 2025 (1,32 veces el beneficio consolidado, 4.166 M) y entre 0,90 y 1,32 veces en 2021-2025 [A1-A5]. El capex fue bajo (1.271 M en 2025, el 4,0 % de las ventas; 790-952 M en 2021-2024), pero la empresa prevé ≈ 2.800 M en 2026 con KPC y Tasly (fábricas y modernización), y en el 1S26 solo invirtió 519 M [A1, A6]. No separa mantenimiento y crecimiento; estimamos el mantenimiento cerca de la amortización del inmovilizado material y los derechos de uso (≈ 1.080 M en 2025, el 3,4 % de las ventas): estimación propia [A1]. Usos de la caja de 2021-2025: 8.670 M en compras (KPC y Tasly, con deuda), 7.252 M de dividendos a sus accionistas y 744 M a minoritarios [A1-A5]. El flujo operativo del 1S26 bajó un 15,3 % (2.423 M) por más circulante [A6].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Huazhen (毕马威华振)',
    anios_auditor: 3,
    opinion: 'Favorable (sin salvedades); cuestión clave de auditoría: el deterioro del fondo de comercio (7.557 M brutos, 495 M ya deteriorados)',
    comentario: 'Cuentas CAS auditadas por KPMG Huazhen desde 2023 (antes Ernst & Young Hua Ming), con opinión limpia y el fondo de comercio como cuestión clave [A1]. Tres puntos a vigilar. Primero, el fondo de comercio y los intangibles: 7.063 M de fondo de comercio y 8.100 M de intangibles y desarrollo frente a 22.172 M de fondos propios atribuidos; 1.129 M son de KPC, que pierde ≈ 370 M en el 1S26, y 1.411 M de Shengfuo (昆明圣火), y no se deterioró nada en 2025 [A1, A6]. Segundo, la I+D capitalizada sube: 469 M en 2025 (27 % del total) y un saldo de desarrollo de 2.164 M, sobre todo de Tasly, con 37 M deteriorados en 2025 [A1, A13]. Tercero, el beneficio sin extraordinarios es un 8 % menor que el publicado (subvenciones y plusvalías de tesorería) [A1]. No hay pagos en acciones relevantes (el plan de 2021 terminó). Los indicadores del motor deben leerse con los dos cambios de perímetro (2023 y 2025): los saltos del activo y de las cuentas a cobrar no son contables sino de compras.',
    senales: [
      { senal: 'Fondo de comercio de KPC (1.129 M) con KPC en pérdidas', nivel: 'Alta', comentario: 'KPC pierde ≈ 370 M en el 1S26 con ventas −51 %; un deterioro de su fondo de comercio y de sus marcas es probable en el cierre de 2026 si no se recupera [A6, A15].' },
      { senal: 'Capitalización de I+D creciente', nivel: 'Media', comentario: '27 % de la I+D capitalizada en 2025 frente al 16 % de 2024; saldo de desarrollo de 2.164 M [A1].' },
      { senal: 'Subvenciones y plusvalías financieras en el beneficio', nivel: 'Baja', comentario: 'El 扣非 es 287 M menor que el publicado en 2025 (−8 %) [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo de alrededor del 50 % del beneficio atribuido en dos pagos (a cuenta en octubre y final en mayo-junio): 1.731 M en 2025 (50,6 %), 0,45 + 0,59 CNY por acción; a cuenta del 1S26 0,415 CNY (690,65 M, el 41,3 % del beneficio del semestre) [A1, A12]. Sin recompras (la autocartera del plan de 2021 se amortizó). Plan de «calidad y rentabilidad» (质量回报双提升) con compromiso genérico de dividendos estables. La prioridad declarada para la caja es integrar Tasly y KPC y comprar productos y empresas en CHC y medicina china [A1].',
    adquisiciones: [
      { anio: '2025', objetivo: 'Tasly (天士力), 28 % y control (cardiovascular y medicina china moderna: Dantonic/复方丹参滴丸)', importe: 6212, ev_ebitda: null, financiacion: 'Caja y préstamo bancario de compra', resultado: 'Ventas de Tasly −3,1 % en 2025 y −2,0 % en el 1S26, pero beneficio +15,6 % y +15,2 %; el BPA pro forma de 2024 subía un 7,9 % (2,63 → 2,84), y el de 2025 solo un 1,6 % por KPC y la deuda. Sin deterioros [A1, A14, A18].' },
      { anio: '2023', objetivo: 'KPC (昆药集团), 28 % y control (Xuesaitong, medicina tradicional de Yunnan)', importe: 2902, ev_ebitda: null, financiacion: 'Caja', resultado: 'Malo hasta hoy: ventas de medicina tradicional de 5.213 M en 2024 a 3.458 M en 2025 (−33,7 %) y pérdidas en 2026 (≈ −370 M en el 1S26); fondo de comercio de 1.129 M sin deteriorar [A1, A6].' },
      { anio: '2021', objetivo: 'Aonuo (澳诺, calcio y vitaminas infantiles) y otras marcas de CHC', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Marca integrada en 999 (fondo de comercio de 926 M sin deterioro); «澳诺钙» segunda marca de minerales [A5].' },
    ],
    comentario: 'Asignación de capital mediocre en lo reciente. Entre 2021 y 2025 se gastaron 8.670 M en compras y 7.252 M en dividendos, con un flujo operativo acumulado de 19.000 M [A1-A5]. Las dos compras grandes dan control con solo el 28 % del capital: el grupo consolida el 100 % de las ventas pero se queda el 28 % del beneficio, y el 72 % va a minoritarios (745 M en 2025). El precio de Tasly (≈ 23 veces su beneficio de 2024) exige que la integración suba el beneficio de Tasly un 50 % para rendir el WACC sobre lo pagado; KPC, comprada a ≈ 27 veces, ha caído a pérdidas [A3, A14]. Dilución nula: las ampliaciones de 2024 y 2025 son liberadas, no cambian el valor.',
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'CHC (sin receta y salud de consumo)', descripcion: '999 Ganmaoling, Sanjiu Weitai, Piyanping, Aonuo; desde 2025 incluye el CHC de KPC (777) [A1].', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 17707.66, resultado: null }, { periodo: '2025', ingresos: 15110.57, resultado: null } ] },
      { nombre: 'Medicamentos con receta (incluye Tasly y la medicina tradicional de KPC)', descripcion: 'Inyectables de medicina china (Shenfu), granulados de fórmulas tradicionales, Dantonic de Tasly, cardiovasculares [A1].', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 6005.70, resultado: null }, { periodo: '2025', ingresos: 12094.04, resultado: null } ] },
      { nombre: 'Distribución y farmacias', descripcion: 'Mayorista y farmacias de KPC y de Tasly [A1].', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 3372.54, resultado: null }, { periodo: '2025', ingresos: 3897.40, resultado: null } ] },
      { nombre: 'Envases e impresión y otros', descripcion: 'Imprenta de envases de Shenzhen (九星印刷) [A1].', tipo_resultado: null, historico: [
        { periodo: '2024', ingresos: 530.71, resultado: null }, { periodo: '2025', ingresos: 500.57, resultado: null } ] },
    ],
    geografias: [
      { nombre: 'Oeste de China', peso_pct: 28.93 }, { nombre: 'Este de China', peso_pct: 27.44 }, { nombre: 'Sur de China', peso_pct: 22.85 },
      { nombre: 'Norte de China', peso_pct: 19.64 }, { nombre: 'Exterior', peso_pct: 1.14 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas CHC (criterio anterior, sin KPC)', valor_anterior: '12.482 M (2024)', valor_actual: '11.639 M (2025)', variacion: '−6,8 %', comentario: 'Caída por menos gripe en el 1S25 y canal de farmacias débil; recuperación en el 4T25 [A1, A18].' },
      { kpi: 'Ventas CHC (criterio nuevo)', valor_anterior: '7.994 M (1S25)', valor_actual: '6.132 M (1S26)', variacion: '−23,3 %', comentario: 'Incluye el CHC de KPC en ajuste de canal y la menor incidencia respiratoria [A6, A15].' },
      { kpi: 'Ventas de receta', valor_anterior: '4.838 M (1S25)', valor_actual: '6.876 M (1S26)', variacion: '+42,1 %', comentario: 'Tasly todo el semestre frente a un trimestre [A6].' },
      { kpi: 'Margen bruto', valor_anterior: '51,9 % (2024)', valor_actual: '54,0 % (2025); 56,8 % (1S26)', variacion: '+2,1 / +4,9 p.', comentario: 'Mezcla de Tasly (margen bruto del 70,6 %) [A1, A6].' },
      { kpi: 'Inversión en I+D', valor_anterior: '953 M (2024)', valor_actual: '1.734 M (2025); 731 M (1S26)', variacion: '+81,9 %', comentario: '55 proyectos de medicamentos nuevos o mejorados, 7 en registro [A1, A6].' },
      { kpi: 'Productos con ventas de más de 100 M CNY', valor_anterior: 'n. d.', valor_actual: '45 (2025)', variacion: null, comentario: 'Cartera ancha de marcas de farmacia [A18].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'resultado por segmento', tipo: 'Complemento', intentos: '1) Informe anual 2025, nota de segmentos (la empresa da ventas, coste y margen bruto por producto, no resultado de explotación); 2) informe semestral 2026; 3) notas de Sinolink y Southwest (solo margen bruto)', decision: 'Omitido (se da el margen bruto en el texto)' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de préstamos del semestral 2026 (solo corto, largo y parte corriente); 2) anuncio del préstamo de compra de Tasly (sin calendario); 3) informe anual 2025', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B: sector y competencia
const Y = lee('comparables-yahoo.json');
const fB = [
  { id: 1, titulo: '2025年年度报告: situación del sector (米内网: mercado de medicamentos 12.601.000 M en 9M25, −1,0 %; farmacias y B2C 3.061.000 M, +5,5 %; hospitales 8.290.000 M, −2,5 %), riesgos de compras centralizadas y de precios', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-03-21', url: `${CN}/2026-03-21/1225023101.PDF` },
  { id: 2, titulo: '2026年半年度报告: sector (IQVIA rebaja el crecimiento del mercado chino al 1,7 % anual en 2026-2030; mercado −1,3 % en el 1T26), CHC, receta, Tasly y KPC', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-08-22', url: `${CN}/2026-08-22/1225492182.PDF` },
  { id: 3, titulo: '2024年年度报告: farmacia minorista (中康CMH: 501.900 M CNY en 2024, +0,8 %; online 64.500 M, +4,6 %), hospitales', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-13', url: `${CN}/2025-03-13/1222778310.PDF` },
  { id: 4, titulo: '«“国民感冒药”感冒灵不能随便吃了» (NMPA, anuncio n.º 66 de 2026: nuevo prospecto de Ganmaoling; ventas de 999 Ganmaoling en farmacias urbanas > 2.000 M en 2025, 米内网)', editor: 'Jiemian (界面新闻)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.jiemian.com/article/14844540.html' },
  { id: 5, titulo: '«华润三九营收...» (CHC presionado por farmacias y control del gasto sanitario; KPC con ventas del 1T26 −48 % y pérdidas)', editor: 'Securities Star (证券之星)', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://stock.stockstar.com/SS2026072200022973.shtml' },
  { id: 6, titulo: 'Fichas de Yahoo Finance (ventas, EBIT, beneficio 2025) de Yunnan Baiyao, Pien Tze Huang, Tong Ren Tang, Baiyunshan, Jiangzhong, Yiling, Dong-E-E-Jiao, Tasly y KPC', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/000538.SZ/financials' },
  { id: 7, titulo: '重大资产购买报告书（修订稿）: negocio de Tasly (Dantonic, cardiovascular, medicina china moderna; ventas 8.674 M en 2023 y 8.498 M en 2024)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-18', url: `${CN}/2025-03-18/1222822415.PDF` },
  { id: 8, titulo: 'Nota de Orient Securities sobre el 1S26 (CHC −23,3 % «sobre todo por el ajuste de KPC»; objetivo 37,20 CNY)', editor: 'Orient Securities (东方证券), vía Gelonghui', tipo: 'Analistas', fecha: '2026-08-24', url: 'https://m.gelonghui.com/news/5305913' },
  { id: 9, titulo: '2026年半年报 (蓝鲸新闻): KPC pierde ≈ 370 M en el 1S26; receta +42,1 %', editor: 'Lanjing (蓝鲸财经)', tipo: 'Prensa', fecha: '2026-08-21', url: 'https://www.lanjinger.com/d/1787320763170450820' },
];
const comp = (t) => Y.empresas.find((e) => e.ticker === t) || {};
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'CR Sanjiu es el primer fabricante chino de medicamentos sin receta por ventas (líder del ranking de OTC durante años) y, desde 2025, un grupo de medicina china con tres cotizadas: la propia Sanjiu, KPC (28 %) y Tasly (28 %) [A1, B2]. Vende tres cosas: marcas de farmacia (CHC: 999 Ganmaoling para el resfriado, número uno de los antigripales de medicina china doce años seguidos, con más de 2.000 M de ventas en farmacias urbanas en 2025; Sanjiu Weitai para el estómago; Piyanping para la piel; Aonuo, calcio infantil), medicamentos con receta (inyectables y granulados de medicina china, Dantonic de Tasly para el corazón, Xuesaitong de KPC) y distribución mayorista y farmacias en Yunnan y Tianjin [B2, B4, B7]. Tiene unas 30.300 personas, fábricas en Shenzhen, Nanchang, Kunming y Tianjin, y casi todo lo vende en China (exterior 1,1 %) [A1].',
    como_gana_dinero: 'El CHC gana con marca y distribución: margen bruto del 61,7 % en 2025, a cambio de un gasto comercial y de publicidad del 28,8 % de las ventas del grupo [A1]. Vende a mayoristas que surten a cadenas de farmacias; las ventas dependen de la temporada de gripe (el 1T y el 4T son los fuertes: 4T25 +22 % por la ola de gripe) y del tráfico en farmacias, que cae desde 2024 [A1, A18]. La receta gana con productos protegidos o exclusivos de medicina china (Dantonic, Shenfu) que se venden a hospitales; aquí el precio lo deciden la lista de reembolso y las compras centralizadas (集采), que bajan precios a cambio de volumen [B1]. El grupo cobra el 100 % de las ventas de Tasly y KPC pero solo se queda el 28 % de su beneficio. Apalancamiento operativo moderado: un tercio de los costes son de marketing ajustable.',
    clientes: 'Clientes muy repartidos: grandes mayoristas (Sinopharm, Shanghai Pharma, China Resources Pharmaceutical Commerce, que es del mismo grupo) y cadenas de farmacias; los cinco primeros clientes no suelen pasar del 15 % de las ventas [A1]. Las ventas a sociedades del grupo China Resources son operaciones vinculadas con límite anual aprobado por la junta [A1]. Poder de precios: en CHC la marca permite precios de venta al público superiores a los genéricos (en farmacia, Ganmaoling no se paga con la tarjeta del seguro médico en muchas ciudades), pero la revisión de precios de los medicamentos en línea de 2025 y la caída del tráfico en farmacias lo limitan [A1, B5]. En receta el poder de precios es bajo: las compras centralizadas de medicina china (tercer lote de Hubei y lotes de piezas de medicina tradicional de Shandong) se aplican en 2025-2026 [A1].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de medicamentos de China en todos los canales (hospitales, farmacias y online), donde CR Sanjiu vende CHC sobre todo en farmacias y receta en hospitales [B1, B2]. Usamos la cifra de 米内网 (Menet) del total del mercado y, como contraste, la de 中康CMH para farmacias (501.900 M CNY en 2024) [B3]. Menet: 12.601.000 M CNY en 9M25 (−1,0 %), del que farmacias y B2C son 3.061.000 M (+5,5 %) y hospitales 8.290.000 M (−2,5 %) [B1]. Anualizado, el mercado es de ≈ 1,68 billones (estimación propia: 9M25 ÷ 0,75).',
    tamano: '≈ 1.680.000 M CNY en 2025 (estimación propia anualizando los 9M25 de Menet [B1]); farmacias ≈ 502.000 M en 2024 (中康CMH [B3])',
    unidad_serie: 'millones de CNY (estimación propia: 2025 anualizado; 2026e −1,3 %; después 1,7 % anual de IQVIA)',
    serie: [ { anio: '2025', tamano: 1680000 }, { anio: '2026e', tamano: 1658000 }, { anio: '2027e', tamano: 1686000 }, { anio: '2028e', tamano: 1715000 }, { anio: '2029e', tamano: 1744000 }, { anio: '2030e', tamano: 1774000 } ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 1.7,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Compras centralizadas (集采) y control del gasto del seguro médico', efecto: '−', horizonte: 'Estructural', evidencia: 'Hospitales −2,5 % en 9M25 por compras centralizadas y genéricos a precio por volumen; lotes de medicina china de Hubei y Shandong en vigor en 2025-2026 [B1].' },
      { driver: 'Envejecimiento y enfermedades crónicas', efecto: '+', horizonte: 'Estructural', evidencia: '22,0 % de la población con 60 años o más en 2024 [A1].' },
      { driver: 'Incidencia de gripe y enfermedades respiratorias', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Ventas del 4T25 +22,1 % con la ola de gripe; CHC −23,3 % en el 1S26 con menos incidencia [A15, A18].' },
      { driver: 'Tráfico en farmacias y paso a la venta online', efecto: '+/−', horizonte: 'Estructural', evidencia: 'B2C +29,1 % y O2O +29,6 % en 9M25 frente a farmacias físicas casi planas [B1].' },
      { driver: 'Apoyo a la medicina china y a la innovación', efecto: '+', horizonte: 'Estructural', evidencia: 'Plan de la industria de medicina china 2026-2030 (febrero de 2026); fórmulas clásicas con registro simplificado [A1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Miles de fabricantes de medicina china; en antigripales compiten Baiyunshan, Yiling (Lianhua Qingwen) y genéricos regionales [B4, B6].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'El seguro médico estatal fija precios en hospitales con compras centralizadas; en farmacia, cadenas cada vez más grandes [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Hierbas medicinales con precios volátiles pero proveedores fragmentados; Sanjiu tiene bases propias de cultivo [A1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Registro de medicamentos lento y marcas de décadas; una marca nueva de OTC necesita años de publicidad [A1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Genéricos químicos baratos (paracetamol) y productos de las compras centralizadas que llegan a los centros de salud de barrio [B1].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'El mercado chino de medicamentos cae por primera vez en años (−1,0 % en 9M25, −1,3 % en el 1T26) por el control del gasto y los precios, y IQVIA rebaja su crecimiento al 1,7 % anual hasta 2030 [B1, B2]. Las marcas de farmacia aguantan mejor que los hospitales, pero el tráfico en farmacias físicas cae. En 2020 la COVID hundió los antigripales de marca (beneficio de Sanjiu −24 %) y en 2022-2023 los disparó; en 2025 el ciclo de la gripe volvió a mover el 4T [A1, A18].' },
    regulacion: 'Tres frentes. Compras centralizadas de medicina china y genéricos (lotes interprovinciales de Hubei y Shandong aplicados en 2025-2026) y revisión de precios de los medicamentos en plataformas (2025) [A1, B1]. Lucha contra la corrupción en la promoción médica (guía de la SAMR de enero de 2025) [A1]. Y el nuevo prospecto obligatorio de Ganmaoling (NMPA, anuncio n.º 66 de 20-jul-2026): advierte de no conducir ni beber y prohíbe su uso con insuficiencia grave de hígado o riñón; la empresa debía registrarlo antes del 15-oct-2026 y tiene 9 meses para cambiar el producto ya vendido [B4]. No prohíbe la venta, pero puede restar demanda en la temporada 2026-2027.',
    tendencias: 'Las ventas se mueven a internet (B2C y O2O crecen ≈ 30 % al año) y a los centros de salud de barrio con los medicamentos de las compras centralizadas [B1]. Sanjiu gana en lo primero (marca conocida, presencia en plataformas) y pierde en lo segundo si sus productos de receta entran en las compras con rebajas de precio. Los grupos estatales concentran el sector comprando cotizadas (Tasly, KPC). La innovación (medicamentos nuevos de medicina china, un GLP-1 en registro con un socio) es todavía pequeña en ventas [A6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 1.9,
    posicion: 'Primer fabricante de OTC de China; ≈ 1,9 % del mercado total de medicamentos (estimación propia: 31.603 M ÷ ≈ 1.680.000 M) [A1, B1]; 999 Ganmaoling es el primer antigripal de medicina china en farmacias desde hace doce años [B4]',
    competidores: [
      { nombre: 'Yunnan Baiyao', pais: 'China', ticker: '000538.SZ', ingresos: 41187, cuota_pct: null, margen_ebit_pct: 14.7, comentario: 'Marca de farmacia y cuidado personal (pasta de dientes), más distribución; rival en CHC [B6].' },
      { nombre: 'Guangzhou Baiyunshan', pais: 'China', ticker: '600332.SS', ingresos: 77656, cuota_pct: null, margen_ebit_pct: 5.3, comentario: 'Antigripales (incluido su propio Ganmaoling) y gran distribución; margen bajo por la distribución [B4, B6].' },
      { nombre: 'Beijing Tong Ren Tang', pais: 'China', ticker: '600085.SS', ingresos: 17256, cuota_pct: null, margen_ebit_pct: 12.5, comentario: 'Marca centenaria de medicina china, farmacias propias [B6].' },
      { nombre: 'Shijiazhuang Yiling', pais: 'China', ticker: '002603.SZ', ingresos: 7831, cuota_pct: null, margen_ebit_pct: 20.3, comentario: 'Lianhua Qingwen (antigripal de medicina china) y cardiovasculares; rival directo en gripe [B6].' },
      { nombre: 'Jiangzhong Pharmaceutical', pais: 'China', ticker: '600750.SS', ingresos: 4220, cuota_pct: null, margen_ebit_pct: 28.8, comentario: 'OTC digestivo (健胃消食片), del grupo China Resources [B6].' },
      { nombre: 'Zhangzhou Pien Tze Huang', pais: 'China', ticker: '600436.SS', ingresos: 9001, cuota_pct: null, margen_ebit_pct: 28.5, comentario: 'Producto de lujo de medicina china con precio al alza [B6].' },
      { nombre: 'Dong-E-E-Jiao', pais: 'China', ticker: '000423.SZ', ingresos: 6700, cuota_pct: null, margen_ebit_pct: 30.8, comentario: 'Gelatina de burro, marca de salud de consumo, del grupo China Resources [B6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de medicamentos.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Un consumidor cambia de antigripal sin coste; en hospitales los productos exclusivos dan algo de permanencia [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: '999 Ganmaoling número uno de su categoría doce años, 45 productos de más de 100 M, margen bruto del CHC del 61,7 %; registros de medicamentos exclusivos de Tasly [A1, B4].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Bases propias de hierbas y escala en compras; margen EBIT del 14,7 % en 2025, por debajo de Jiangzhong o Dong-E-E-Jiao (28-31 %) [A1, B6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Red comercial que llega a cientos de miles de farmacias, difícil de replicar; gasto comercial de 9.089 M al año [A1].' },
      ],
    },
    amenazas: 'Las amenazas son de política más que de rivales: compras centralizadas que extienden rebajas de precio a la medicina china de receta (Tasly y KPC, probabilidad alta), control del precio de los medicamentos en farmacia y online (media), nuevo prospecto de Ganmaoling que advierte de no conducir (media, efecto en la temporada 2026-27) y menos tráfico en farmacias [A1, B4, B5]. Rivales como Yiling y Baiyunshan compiten en la ola de gripe con precio y publicidad. La marca no se erosiona rápido, pero el margen EBIT del grupo (14,7 %) está muy por debajo de las marcas puras (28-31 %) por la receta y la distribución [B6].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Nació en 1985 como la fábrica Nanfang del Ejército en Shenzhen, creadora de Sanjiu Weitai y 999 Ganmaoling; Sanjiu Medical & Pharmaceutical se constituyó en 1999 y salió a bolsa en Shenzhen en 2000 [A1]. Tras la crisis de deuda del grupo Sanjiu, China Resources tomó el control en 2008. Desde entonces creció comprando marcas de CHC (Guilin Tianhe, Shunfeng, Aonuo, Zhongyi) y, con el plan de 2021-2025 de «duplicar ventas», dos cotizadas de medicina china: KPC en 2023 y Tasly en 2025 [A1, A3, B7].',
    hitos: [
      { anio: '1985', hito: 'Fábrica Nanfang (南方制药厂) en Shenzhen: Sanjiu Weitai y 999 Ganmaoling.' },
      { anio: '2000', hito: 'Salida a bolsa en Shenzhen (000999).' },
      { anio: '2008', hito: 'China Resources toma el control tras la reestructuración del grupo Sanjiu.' },
      { anio: '2018-2021', hito: 'Compra de marcas de CHC: Zhongyi (众益) y Aonuo (澳诺) [A5].' },
      { anio: '2023', hito: 'Control de KPC (昆药集团) con el 28 % por 2.902 M CNY [A3].' },
      { anio: '2024-2025', hito: 'Ampliaciones liberadas de 3 por 10 en junio de 2024 y junio de 2025 [A11].' },
      { anio: '2025', hito: 'Control de Tasly (天士力) con el 28 % por 6.212 M CNY (27-mar-2025) [A14].' },
      { anio: '2026', hito: 'KPC entra en pérdidas; nuevo prospecto obligatorio de Ganmaoling (NMPA, julio) [A6, B4].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la calidad y la seguridad de los medicamentos (el nuevo prospecto de Ganmaoling nace de la vigilancia de reacciones adversas) y el cumplimiento en la promoción médica, que el regulador persigue desde 2023 [A1, B4]. En medio ambiente, la empresa declara emisiones dentro de límites y sin sanciones en el 1S26, con plantas solares en varias fábricas [A6]. Informe de sostenibilidad y ESG de 2025 publicado con el anual [A1].',
    controversias: 'No encontramos sanciones relevantes a CR Sanjiu en tres años en los informes anuales y anuncios de CNINFO. La controversia de 2026 es el nuevo prospecto de Ganmaoling (NMPA, 20-jul-2026), que la prensa presentó como «no se puede tomar a la ligera» [B4].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informes anuales 2024-2025 (solo cuotas de producto); 2) informes de Menet y 中康 citados por la empresa (sin cuota conjunta); 3) prensa sectorial', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe ESG 2025 de la empresa; 2) página de MSCI ESG Ratings (no abre sin JavaScript); 3) búsqueda de Sustainalytics', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C: equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告: consejo, directivos, remuneración, accionistas, auditor', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-03-21', url: `${CN}/2026-03-21/1225023101.PDF` },
  { id: 2, titulo: '2026年半年度报告: diez primeros accionistas a 30-jun-2026 (China Resources Pharmaceutical Holdings 63,22 %; HKSCC 1,81 %)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-08-22', url: `${CN}/2026-08-22/1225492182.PDF` },
  { id: 3, titulo: '关于董事、高级管理人员离任的公告 (dimisión por jubilación de la consejera y vicepresidenta Zhou Hui, 147.593 acciones)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-07-15', url: `${CN}/2026-07-15/1225424830.PDF` },
  { id: 4, titulo: '董事会2026年第九次会议决议公告 (el accionista de control propone a Xing Jian, director financiero, como consejero)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-09-02', url: `${CN}/2026-09-02/1225541165.PDF` },
  { id: 5, titulo: '关于变更董事的公告 (Cui Xingpin dimite; Huang Xianfeng consejero por los empleados)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-12-27', url: `${CN}/2025-12-27/1224901483.PDF` },
  { id: 6, titulo: '关于2026年度董事、高级管理人员薪酬方案的公告 (variable ≥ 60 % de la retribución anual, con diferimiento)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-06-09', url: `${CN}/2026-06-09/1225357642.PDF` },
  { id: 7, titulo: '2026年度日常关联交易预计金额的公告 (límites de operaciones con el grupo China Resources)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-12-10', url: `${CN}/2025-12-10/1224861970.PDF` },
  { id: 8, titulo: '关于子公司与华润商业保理开展应收账款保理业务暨关联交易的公告 (factoring con la sociedad del grupo)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-08-22', url: `${CN}/2026-08-22/1225492186.PDF` },
  { id: 9, titulo: '2024年年度报告: cambios en la dirección (Wu Wenduo presidente ejecutivo desde el 6-sep-2024)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-13', url: `${CN}/2025-03-13/1222778310.PDF` },
  { id: 10, titulo: '2025年年度股东会决议公告 (resultados de las votaciones de la junta de abril de 2026)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-04-17', url: `${CN}/2026-04-17/1225111465.PDF` },
  { id: 11, titulo: '2026年第二次临时股东会决议公告 (septiembre de 2026)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2026-09-11', url: `${CN}/2026-09-11/1225558080.PDF` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Qiu Huawei (邱华伟)', cargo: 'Presidente del consejo y secretario del Partido', desde: '2021', participacion_pct: 0, trayectoria: 'Toda la carrera en Sanjiu: presidente de la comercializadora, vicepresidente sénior y presidente ejecutivo antes de presidir el consejo; antes, presidente de KPC. Bajo su mandato las ventas se duplicaron con compras y el BPA creció un 66 % de 2021 a 2025 [C1].' },
      { nombre: 'Wu Wenduo (吴文多)', cargo: 'Consejero y presidente ejecutivo (总裁)', desde: '2024', participacion_pct: 0, trayectoria: 'Directivo de China Resources Double-Crane y Jiangzhong; presidente de KPC y director general de Jiangzhong antes de llegar en septiembre de 2024 [C1, C9]. En su etapa las ventas de KPC se desplomaron y Tasly se integró.' },
      { nombre: 'Xing Jian (邢健)', cargo: 'Director financiero y secretario del consejo; consejero desde sep-2026', desde: '2025', participacion_pct: 0, trayectoria: 'Director financiero de Jiangzhong y de China Resources Network; propuesto como consejero por el accionista de control en septiembre de 2026 [C1, C4].' },
      { nombre: 'Mai Yi (麦毅)', cargo: 'Vicepresidente (producción y calidad)', desde: null, participacion_pct: 0, trayectoria: 'Carrera en Sanjiu desde la etapa de Shenzhen Sanjiu: I+D y compras [C1].' },
      { nombre: 'Wang Liang (王亮)', cargo: 'Vicepresidente', desde: null, participacion_pct: 0, trayectoria: 'Vicepresidente con funciones comerciales [C1].' },
    ],
    historial_guidance: [
      { anio: '2021-2025', guia: 'Plan «十四五»: duplicar las ventas (de 13.637 M en 2020)', real: '31.603 M en 2025 (×2,3), con KPC y Tasly', cumplida: 'Sí' },
      { anio: '2025', guia: 'Ventas por encima del crecimiento del sector y beneficio acorde', real: 'Ventas +14,4 % (con Tasly); beneficio +1,6 %', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Ventas por encima del sector y beneficio que acompañe', real: '1S26: ventas +1,4 %, beneficio −8,0 %', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo de carrera del grupo estatal China Resources, que rota directivos entre sus farmacéuticas (Double-Crane, Jiangzhong, KPC, Sanjiu) [C1]. Credibilidad media: cumplió el plan de duplicar ventas, pero con compras que diluyen el beneficio por acción frente a lo prometido (pro forma 2,84 CNY en 2024 frente a 2,06 reales en 2025) [A14]. La dirección no da guía numérica anual. Ningún directivo tiene acciones relevantes (la vicepresidenta Zhou Hui tenía 147.593) y el variable depende de la evaluación del grupo estatal. Cambio de CEO en septiembre de 2024 y salida por jubilación de la vicepresidenta jurídica en julio de 2026 [C3, C9].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Qiu Huawei', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Estrategia (presidente)' },
      { nombre: 'Bai Xiaosong', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: 'Estrategia' },
      { nombre: 'Yu Shutian', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Liang Zhuqiang', cargo: 'Consejero', tipo: 'Dominical', desde: '2024', comisiones: null },
      { nombre: 'Wu Wenduo', cargo: 'Consejero y presidente ejecutivo', tipo: 'Ejecutivo', desde: '2024', comisiones: 'Estrategia' },
      { nombre: 'Huang Xianfeng', cargo: 'Consejero por los empleados', tipo: 'Ejecutivo', desde: '2025', comisiones: null },
      { nombre: 'Xing Jian', cargo: 'Consejero y director financiero', tipo: 'Ejecutivo', desde: '2026', comisiones: 'Estrategia' },
      { nombre: 'He Zhendan', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Nombramientos, retribuciones' },
      { nombre: 'Li Mengjuan', cargo: 'Consejera independiente', tipo: 'Independiente', desde: null, comisiones: 'Auditoría' },
      { nombre: 'Sun Jian', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Wang Yi', cargo: 'Consejero independiente', tipo: 'Independiente', desde: null, comisiones: 'Retribuciones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.86, voto_remuneracion_contra_pct: 0.10, voto_remuneracion_contra_libre_pct: 3.07, voto_cupula_pct: null, // junta de 2025 (abril de 2026), punto 4; en contra de los minoritarios (中小股东) 3,07 % [C10]
    remuneracion_ceo: { anio: '2025', total: 1.67, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'Retribución baja para el tamaño, al estilo de las estatales: el presidente ejecutivo Wu Wenduo cobró 1,67 M CNY en 2025 y el presidente del consejo 3,15 M; el total de consejeros y directivos fue de 16,46 M [C1]. La política de 2026 fija un variable anual de al menos el 60 % del salario anual, con una parte diferida y cláusulas de recuperación, pero las métricas son la evaluación anual del grupo estatal, no el ROIC ni el retorno al accionista [C6]. No hay plan de acciones vigente (el de 2021 terminó en 2025). Los independientes cobran 0,18 M al año.',
    accionistas: [
      { nombre: 'China Resources Pharmaceutical Holdings (华润医药控股; grupo China Resources, SASAC)', pct: 63.22, tipo: 'Control estatal', variacion: 'Sin cambios' },
      { nombre: 'HKSCC (inversores de Hong Kong por Stock Connect)', pct: 1.81, tipo: 'Institucional', variacion: '−2,76 M acciones en el 1S26' },
      { nombre: 'Liu Shaoluan (persona física)', pct: 0.82, tipo: 'Particular', variacion: 'Entra en el 1S26 (13,57 M acciones)' },
      { nombre: 'E Fund CSI 300 Health Care ETF', pct: 0.65, tipo: 'Fondo índice', variacion: '+1,93 M acciones' },
    ],
    insiders: [],
    control_y_defensas: 'China Resources Pharmaceutical Holdings controla el 63,22 % y propone a casi todo el consejo; el grupo China Resources depende del SASAC central [C2, C4]. Una acción, un voto, sin blindajes. Hay muchas operaciones vinculadas: ventas a la distribuidora del grupo, depósitos en el banco del grupo (Guangdong China Resources Bank), compras de energía, factoring con la sociedad de factoring del grupo (agosto de 2026), todas con límite anual aprobado por los minoritarios [C7, C8]. Las dos compras grandes (KPC y Tasly) se hicieron a terceros, no al grupo. El riesgo para el minoritario es que el grupo use a Sanjiu como plataforma de compras de medicina china a precios de mercado más que el expolio directo.',
    alertas: [
      'Operaciones vinculadas recurrentes con el grupo China Resources (ventas, banco, factoring) [C7, C8].',
      'Rotación en la cúpula: CEO nuevo en septiembre de 2024 y dos consejeros sustituidos en diciembre de 2025 y julio de 2026 [C3, C5, C9].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Anuncios de CNINFO de 12 meses (sin compras ni ventas de directivos); 2) informe semestral 2026 (variación de acciones de directivos: ninguna); 3) base de Eastmoney de operaciones de directivos', decision: 'Omitido (no hubo operaciones; no hemos podido confirmar en el registro de SZSE)' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D: mercado y valoración
const bol = lee('bolsa.json');
const fD = [
  { id: 1, titulo: 'Históricos diarios de 000999.SZ, 510300.SS (CSI 300) y 512010.SS (CSI 300 salud) con `herramientas/bolsa.mjs`: precio, rango, volatilidad, betas y cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/000999.SZ/history' },
  { id: 2, titulo: 'Cotización en tiempo real de 000999 (cierre del 20-oct-2026: 25,81 CNY, 15:35:45 de Pekín)', editor: 'Sina Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://hq.sinajs.cn/list=sz000999' },
  { id: 3, titulo: 'Consenso de Yahoo Finance (earningsTrend y objetivo medio de 10 analistas: 35,15 CNY) y fichas de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/000999.SZ/analysis' },
  { id: 4, titulo: 'Lista de informes de analistas de 000999 de los últimos 12 meses (seis notas: Sinolink, Southwest, China Post Securities)', editor: 'Eastmoney', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://data.eastmoney.com/report/stock.jshtml?code=000999' },
  { id: 5, titulo: 'Nota de resultados del 1S26 (previsiones 2026-2028: ventas 33.474 / 35.105 / 36.378 M; BPA 1,92 / 2,31 / 2,44; EBITDA/ventas 17,9-20,3 %)', editor: 'Southwest Securities (西南证券)', tipo: 'Analistas', fecha: '2026-08-22', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609011828846588_1.pdf' },
  { id: 6, titulo: 'Nota de resultados del 1S26 (BPA 2,06 / 2,31 / 2,58; recorte del beneficio de 2026e desde 37,85 a 34,36 億)', editor: 'Sinolink Securities (国金证券)', tipo: 'Analistas', fecha: '2026-08-24', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608241828349107_1.pdf' },
  { id: 7, titulo: 'Curva de bonos del Estado chino (中债国债收益率曲线), 10 años: 1,6497 % el 19-oct-2026', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/cbweb-mn/yield_main' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'List of SZSE Securities / China Connect Securities (comprables y vendibles): 000999, CCASS 70999, actualizada el 20-oct-2026', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SZSE_Securities.xls' },
  { id: 10, titulo: 'Stock Connect en IBKR (acceso de particulares a acciones A de Shanghái y Shenzhen)', editor: 'Interactive Brokers (base de conocimiento)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://ibkb.interactivebrokers.com/article/2267' },
  { id: 11, titulo: 'Nota de Orient Securities del 1S26 (BPA 2,26 / 2,48 / 2,76; 15 veces 2027e; objetivo 37,20 CNY)', editor: 'Orient Securities (东方证券), vía Gelonghui', tipo: 'Analistas', fecha: '2026-08-24', url: 'https://m.gelonghui.com/news/5305913' },
  { id: 12, titulo: '重大资产购买报告书（修订稿）: precio de Tasly (14,85 CNY por acción, 6.211,8 M por el 28 %), beneficio de Tasly 2024 (955,6 M)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2025-03-18', url: `${CN}/2025-03-18/1222822415.PDF` },
  { id: 13, titulo: '2023年年度报告: compra del 28 % de KPC por 2.902 M (nota de combinaciones de negocios)', editor: 'China Resources Sanjiu (CNINFO/SZSE)', tipo: 'Primaria', fecha: '2024-03-23', url: `${CN}/2024-03-23/1219390439.PDF` },
];
const comparables = ['000538.SZ', '600436.SS', '600085.SS', '600332.SS', '600750.SS', '002603.SZ', '000423.SZ', '600129.SS', '600557.SS'].map((t) => {
  const e = comp(t);
  return { nombre: e.nombre, ticker: t, pais: 'CN', capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null,
    per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
});
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'China Resources Sanjiu Medical & Pharmaceutical Co., Ltd. (华润三九医药股份有限公司)', nombre_corto: 'CR Sanjiu', ticker: '000999', isin: 'CNE0000011K8',
    mercado: 'Bolsa de Shenzhen, mercado principal (acciones A en CNY; en el Stock Connect hacia el norte)', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Salud', industria: 'Farmacéuticas (medicina china y OTC)', sede: 'Shenzhen (Guangdong)', fundacion: '1985', empleados: 30304,
    web: 'https://www.999.com.cn', precio: 25.81, fecha_precio: '2026-10-20', acciones: 1664.22, capitalizacion_publicada: 42953, free_float_pct: 36.8,
    max_52s: bol.identificacion.max_52s, min_52s: bol.identificacion.min_52s, volumen_medio_diario: '≈ 279 M CNY/día (3 meses)', proximos_resultados: '2026-10-24',
  },
  consenso: {
    guidance: 'Sin guía numérica. En el anual 2025 la empresa prevé para 2026 ventas que crezcan «por encima de la media del sector» y un beneficio «acorde», con 6.900 M de circulante y unos 2.800 M de capex (con KPC y Tasly), supuesto que las compras centralizadas se apliquen «según lo previsto» [A1]. No la ha cambiado en el 1S26.',
    estimaciones: [
      { periodo: '2026e', ingresos: 33474.06, ebitda: 6005.3, ebit: null, bpa: 1.92, dpa: null, fuente: 'Southwest Securities, 22-ago-2026 [D5]' },
      { periodo: '2027e', ingresos: 35104.68, ebitda: 6898.1, ebit: null, bpa: 2.31, dpa: null, fuente: 'Southwest Securities, 22-ago-2026 [D5]' },
      { periodo: '2028e', ingresos: 36377.81, ebitda: 7366.5, ebit: null, bpa: 2.44, dpa: null, fuente: 'Southwest Securities, 22-ago-2026 [D5]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: null, mantener: null, vender: null, po_medio: 35.15, po_min: null, po_max: 37.2 },
    revisiones: 'Tras el 1S26 los brókeres recortaron: Sinolink bajó el beneficio de 2026e de 3.785 M a 3.436 M (BPA 2,06) y el de 2027e de 4.279 M a 3.840 M (2,31); Southwest queda en 1,92 / 2,31 / 2,44; Orient en 2,26 / 2,48 / 2,76 [D5, D6, D11]. La media de Yahoo (2,21 y 2,43) es más alta porque mezcla estimaciones anteriores; hace 90 días era 2,25 y 2,44 [D3]. Tendencia de 3 meses: recortes. Solo Southwest publica EBITDA (margen del 17,9 % en 2026e), por eso usamos su fila completa y contrastamos el BPA con los otros dos.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bol.bolsa, beta: 0.64, volatilidad_pct: bol.bolsa.volatilidad_pct, max_drawdown_pct: bol.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'En cinco años la acción ha rentado un 12,8 % anual con dividendos frente al −1,3 % del CSI 300, porque las ampliaciones de perímetro y la ola de gripe de 2022-2023 la subieron un 40 % al año en 2021 y 2022 [D1]. Desde el máximo de finales de 2024 (34,11 CNY ajustados) ha caído un 24 %: −14,6 % en 2025 con el CSI 300 a +20,8 %, por la caída del CHC, la deuda de Tasly y las pérdidas de KPC [D1, A6]. En 2026 va algo mejor que el índice (−5,5 % frente a −8,9 %) y rebota un 8 % en el último mes con la rotación a valores defensivos de dividendo. La beta mensual frente al CSI 300 sale negativa (−0,16) y la semanal de 5 años ajustada es 0,64: es una acción defensiva que se mueve por su propio ciclo [D1].' },
  multiplos_historicos: {
    serie: [2021, 2022, 2023, 2024, 2025].map((a) => ({ anio: String(a), precio_cierre: bol.cierres_ejercicio.find((c) => c.anio === String(a)).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Nueve farmacéuticas chinas de medicina tradicional y marcas de farmacia cotizadas en Shanghái y Shenzhen, en CNY y con el mismo calendario de consenso (Yahoo, misma fecha) [D3]. Fuera Tasly y KPC, que son filiales de Sanjiu (se citan aparte), y las multinacionales de OTC (Haleon, Kenvue), que cotizan en otro mercado con otros tipos de interés.',
    empresas: comparables,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-03', objetivo: 'Tasly (天士力), 28 % con control', comprador: 'CR Sanjiu', ev: 22185, ev_ventas: 2.61, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '14,85 CNY por acción × 1.494 M acciones (valor del 100 % del capital; Tasly casi sin deuda neta); 23,2 veces el beneficio de 2024 (955,6 M) y 2,61 veces las ventas (8.498 M) [D12].' },
      { fecha: '2022-12', objetivo: 'KPC (昆药集团), 28 % con control', comprador: 'CR Sanjiu (a Huali Group)', ev: 10364, ev_ventas: 1.25, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '2.902 M por el 28 % (valor del 100 % del capital 10.364 M); ventas de KPC de ≈ 8.282 M en 2022 [D13, B5].' },
    ],
    comentario: 'Las dos compras de control del sector que conocemos con cifras son las de la propia Sanjiu: Tasly a 23 veces su beneficio y 2,6 veces las ventas, y KPC a 1,25 veces las ventas [D12, D13]. Pagaron una prima sobre su cotización por el control con el 28 %. Sanjiu no puede ser objeto de una oferta: el grupo estatal tiene el 63 % y la usa como plataforma de compras.',
    confianza: 'Baja',
  },
  valoracion: { referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx [D8]' } },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (≥ 3 con múltiplo)', tipo: 'Complemento', intentos: '1) Informe de compra de Tasly (su tabla de comparables es de cotizadas, no de transacciones) [D12]; 2) anuarios de compras del sector (Yunnan Baiyao, Jiangzhong) en prensa; 3) compras de marcas de CHC de Sanjiu (precio sin beneficio publicado)', decision: 'Omitido: solo dos con múltiplo' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SZSE (préstamo de valores, sin dato de posición corta neta); 2) Eastmoney (solo saldo de financiación: 844 M); 3) Yahoo', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E: sentimiento
const fE = [
  { id: 1, titulo: 'Foro de 000999 en Guba (股吧), dos primeras páginas (≈ 100 mensajes del 13 al 20 de octubre de 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://guba.eastmoney.com/list,000999.html' },
  { id: 2, titulo: 'Foro de 000999 en Guba, página 2', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://guba.eastmoney.com/list,000999_2.html' },
  { id: 3, titulo: '«“国民感冒药”感冒灵不能随便吃了» y comentarios', editor: 'Jiemian (界面新闻)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.jiemian.com/article/14844540.html' },
  { id: 4, titulo: 'Securities Star: «CHC presionado» (artículo y lectura de la prensa económica)', editor: 'Securities Star (证券之星)', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://stock.stockstar.com/SS2026072200022973.shtml' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Guba (Eastmoney), foro de 000999', fecha: '2026-10', n_comentarios: 100, tono: 'Dividido', resumen: 'Mucho análisis técnico (la media de 250 sesiones, el hueco del 27 de abril) y alivio de quienes compraron a 28-30 CNY; unos venden en el rebote y otros esperan «50 CNY» [E1, E2].' },
      { plataforma: 'Guba, hilos sobre KPC y el grupo', fecha: '2026-10', n_comentarios: 20, tono: 'Negativo', resumen: '«El hijo arrastra al padre»: KPC como lastre; dudas sobre si comprar KPC a 8,2 CNY [E1].' },
      { plataforma: 'Guba, hilos de dividendo y rotación defensiva', fecha: '2026-10', n_comentarios: 15, tono: 'Positivo', resumen: 'El dividendo cobrado el 16-oct y la caída del bono chino atraen a quien busca rentas; «buena acción para el particular a largo plazo» [E1].' },
      { plataforma: 'Prensa económica (Jiemian, Securities Star) y comentarios', fecha: '2026-07', n_comentarios: 10, tono: 'Negativo', resumen: 'Nuevo prospecto de Ganmaoling («no se puede tomar a la ligera») y CHC en caída [E3, E4].' },
    ],
    temas: [
      { tema: 'KPC como lastre', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón: KPC pierde ≈ 370 M en el 1S26 y su fondo de comercio (1.129 M) está en riesgo [A6].' },
      { tema: 'Dividendo y refugio defensivo', postura: 'Alcista', peso: 'Medio', contraste: 'Rentabilidad por dividendo ≈ 4 % (1,04 CNY en 2025) con el bono a 10 años al 1,65 % [A1, D7].' },
      { tema: 'Gripe y Ganmaoling', postura: 'Dividida', peso: 'Medio', contraste: 'El 4T depende de la ola de gripe; el nuevo prospecto añade riesgo a la temporada 2026-27 [B4].' },
      { tema: 'Precios y compras centralizadas', postura: 'Bajista', peso: 'Bajo', contraste: 'Un lector señala que Ganmaoling no entra en el seguro médico ni en las compras en farmacia: el riesgo de precio está en la receta (Tasly, KPC), no en el CHC [E1, A1].' },
    ],
    lectura: 'El sentimiento del particular es tibio y técnico: no hay euforia ni capitulación, y la acción vuelve a la media de 250 sesiones tras dos años de caída [E1]. Lo que más preocupa (KPC) es lo mismo que señala el informe; lo que gusta (dividendo frente al bono al 1,65 %) es real. No contradice a los analistas, que siguen en «comprar» con objetivos de 35-37 CNY. No aporta información nueva sobre las cifras.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.', { ltm: LTM, tri: tri.map((t) => [t.periodo, t.ingresos, t.crecimiento_pct, t.bpa]) });
console.log(cuenta.map((c) => [c.periodo, c.ingresos, c.ebitda, c.ebit, c.beneficio_neto, c.bpa, c.acciones_diluidas]));
console.log(balance.map((b) => [b.periodo, b.caja, b.deuda_financiera, b.arrendamientos]));
