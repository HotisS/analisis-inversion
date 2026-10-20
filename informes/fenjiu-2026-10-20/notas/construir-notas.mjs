// Notas A-E de Shanxi Xinghuacun Fen Wine Factory Co., Ltd. (山西杏花村汾酒厂股份有限公司, SSE 600809, «Shanxi Fenjiu»).
// Corte 2026-10-20 (martes; Shanghái cerró a las 15:00 de Pekín, 07:00 UTC). Cifras en millones de CNY salvo que se diga otra cosa.
// Las series de cuentas salen de los estados CAS publicados en los informes de CNINFO/SSE; para no transcribir a mano, se leen de la
// copia estructurada de Eastmoney F10 (notas/docs/eastmoney-*.json), cotejada con los informes anuales 2021-2025 y el semestral 2026.
// Ejecutar: node informes/fenjiu-2026-10-20/notas/construir-notas.mjs
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
    for (const r of lee(`docs/${f}`).data) out[r.REPORT_DATE.slice(0, 10)] = r;
  }
  return out;
}
const L = filas('lrb'), Z = filas('zcfzb'), X = filas('xjllb');
const fin = (a) => `${a}-12-31`;
const ebitDe = (l) => M(l.OPERATE_PROFIT) - M(l.INVEST_INCOME) - M(l.FAIRVALUE_CHANGE_INCOME) + M(l.FINANCE_EXPENSE) + M(l.NONBUSINESS_INCOME) - M(l.NONBUSINESS_EXPENSE);
const daDe = (x) => M(x.FA_IR_DEPR) + M(x.IA_AMORTIZE) + M(x.LPE_AMORTIZE) + M(x.USERIGHT_ASSET_AMORTIZE);
export const DPA = { 2021: 1.8, 2022: 3.32, 2023: 4.37, 2024: 6.06, 2025: 6.56 };
// Tesorería fuera de «货币资金»: depósitos estructurados (交易性金融资产), depósitos a plazo (其他流动资产) y certificados de depósito
// a más de un año (大额存单, en «otros activos no corrientes» o «a menos de un año») [A1-A5].
const TESO = { 2021: 6030.53, 2022: 1059.15 + 6017.09 + 1500.49, 2023: 50.24 + 17251.65 + 1545.49, 2024: 20940.26 + 1590.53, 2025: 19400.42 };
const ANIOS = [2021, 2022, 2023, 2024, 2025];
const cuenta = ANIOS.map((a) => {
  const l = L[fin(a)], x = X[fin(a)];
  const ebit = ebitDe(l), am = daDe(x);
  return {
    periodo: String(a), ingresos: r2(M(l.TOTAL_OPERATE_INCOME)), coste_ventas: r2(M(l.OPERATE_COST) + M(l.OPERATE_TAX_ADD)),
    gastos_generales: r2(M(l.SALE_EXPENSE) + M(l.MANAGE_EXPENSE) + M(l.RESEARCH_EXPENSE)), ebitda: r2(ebit + am), amortizaciones: r2(am), ebit: r2(ebit),
    resultado_financiero: r2(-M(l.FINANCE_EXPENSE) + M(l.INVEST_INCOME) + M(l.FAIRVALUE_CHANGE_INCOME)), bai: r2(M(l.TOTAL_PROFIT)), impuestos: r2(M(l.INCOME_TAX)),
    minoritarios: r2(M(l.MINORITY_INTEREST)), beneficio_neto: r2(M(l.PARENT_NETPROFIT)), gastos_financieros: r2(M(l.FE_INTEREST_EXPENSE)),
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: l.DILUTED_EPS, dpa: DPA[a], dpa_extraordinario: 0,
    acciones_diluidas: r2(M(l.PARENT_NETPROFIT) / l.BASIC_EPS),
  };
});
const balance = ANIOS.map((a) => {
  const z = Z[fin(a)];
  return {
    periodo: String(a), activo_total: r2(M(z.TOTAL_ASSETS)), activo_corriente: r2(M(z.TOTAL_CURRENT_ASSETS)), pasivo_corriente: r2(M(z.TOTAL_CURRENT_LIAB)),
    pasivo_total: r2(M(z.TOTAL_LIABILITIES)), fondo_comercio: r2(M(z.GOODWILL)), intangibles: r2(M(z.INTANGIBLE_ASSET)),
    inmovilizado_material: r2(M(z.FIXED_ASSET) + M(z.CIP) + M(z.USERIGHT_ASSET)), existencias: r2(M(z.INVENTORY)),
    clientes: r2(M(z.NOTE_ACCOUNTS_RECE) + M(z.FINANCE_RECE)), proveedores: r2(M(z.NOTE_ACCOUNTS_PAYABLE)), activos_contrato: null,
    pasivos_contrato: r2(M(z.CONTRACT_LIAB) + M(z.ADVANCE_RECEIVABLES)), caja: r2(M(z.MONETARYFUNDS) + TESO[a]), deuda_financiera: 0,
    arrendamientos: r2(M(z.LEASE_LIAB) + M(z.NONCURRENT_LIAB_1YEAR)), patrimonio_neto: r2(M(z.TOTAL_PARENT_EQUITY)), minoritarios: r2(M(z.MINORITY_EQUITY)),
    reservas: r2(M(z.UNASSIGN_RPOFIT) + M(z.SURPLUS_RESERVE)),
  };
});
const flujos = ANIOS.map((a) => {
  const x = X[fin(a)];
  return {
    periodo: String(a), flujo_operativo: r2(M(x.NETCASH_OPERATE)), capex: r2(M(x.CONSTRUCT_LONG_ASSET)), pagos_arrendamientos: r2(M(x.PAY_OTHER_FINANCE)),
    adquisiciones: 0, desinversiones: r2(M(x.DISPOSAL_LONG_ASSET)), dividendos: r2(M(x.ASSIGN_DIVIDEND_PORFIT)), recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0,
  };
});
// Trimestres (de los acumulados publicados)
const acum = (k) => [k, L[k]];
const tri = [];
const cortes = ['2024-03-31', '2024-06-30', '2024-09-30', '2024-12-31', '2025-03-31', '2025-06-30', '2025-09-30', '2025-12-31', '2026-03-31', '2026-06-30'];
const etiqueta = { '03-31': '1T', '06-30': '2T', '09-30': '3T', '12-31': '4T' };
const solo = {};
for (const k of cortes) {
  const l = L[k]; const prev = k.endsWith('03-31') ? null : L[cortes[cortes.indexOf(k) - 1]];
  const v = (c) => M(l[c]) - (prev ? M(prev[c]) : 0);
  const ebit = ebitDe(l) - (prev ? ebitDe(prev) : 0);
  solo[k] = { ventas: v('TOTAL_OPERATE_INCOME'), neto: v('PARENT_NETPROFIT'), ebit };
}
for (const k of cortes.slice(2)) {
  const s = solo[k]; const ant = solo[`${Number(k.slice(0, 4)) - 1}${k.slice(4)}`];
  tri.push({ periodo: `${etiqueta[k.slice(5)]}${k.slice(2, 4)}`, ingresos: r2(s.ventas), crecimiento_pct: ant ? r1((s.ventas / ant.ventas - 1) * 100) : null, crecimiento_organico_pct: null,
    ebitda: null, margen_ebitda_pct: null, bpa: r2(s.neto / 1219.96), vs_consenso: null });
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
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, normas chinas CAS): estados consolidados 2025 y 2024, ventas por producto, región y canal, volumen, existencias de base, distribuidores, depósitos a plazo y dividendos', editor: 'Shanxi Xinghuacun Fen Wine Factory (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156714.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024, CAS): estados 2024 y 2023, cambio de auditor, dividendo a cuenta de 2024', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-30', url: `${CN}/2025-04-30/1223414537.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023, CAS): estados 2023 y 2022, depósitos a plazo y certificados de depósito', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-26', url: `${CN}/2024-04-26/1219833278.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022, CAS): estados 2022 y 2021', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2023-04-28', url: `${CN}/2023-04-28/1216642516.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021, CAS): estados 2021, depósitos estructurados y dividendo de 2021', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2022-04-28', url: `${CN}/2022-04-28/1213168989.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026, CAS): balance a 30-jun-2026, cuenta y flujos del 1S26, existencias, depósitos y dividendo por pagar', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225535289.PDF` },
  { id: 7, titulo: '2026年半年度经营数据公告 (datos operativos del 1S26: ventas por producto, canal y región; distribuidores)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225534145.PDF` },
  { id: 8, titulo: '2026年第一季度报告 y 2026年第一季度经营数据公告 (1T26)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225254545.PDF` },
  { id: 9, titulo: '2025年第三季度报告 y 2025年前三季度经营数据公告 (9M25)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-10-31', url: `${CN}/2025-10-31/1224771965.PDF` },
  { id: 10, titulo: '2025年半年度报告 (informe semestral 2025, CAS): cuenta y flujos del 1S25', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-08-29', url: `${CN}/2025-08-29/1224606161.PDF` },
  { id: 11, titulo: 'Estados financieros estructurados de 600809 (利润表, 资产负债表, 现金流量表) 2018-1S26: copia de los CAS usada para no transcribir a mano', editor: 'Eastmoney F10', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SH600809' },
  { id: 12, titulo: '关于2025年度利润分配预案的公告 (dividendo de 2025: 6,56 CNY por acción, 8.003 M, el 65,35 % del beneficio)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156722.PDF` },
  { id: 13, titulo: '2025年年度权益分派实施公告 (pago del dividendo de 2025 el 31-jul-2026, sobre 1.219.964.222 acciones)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-27', url: `${CN}/2026-07-27/1225442097.PDF` },
  { id: 14, titulo: 'Notas de resultados del 1S26 de Soochow (东吴), Sinolink (国金), Guosen (国信) y Kaiyuan (开源): 2T26 por producto, región y canal, cobros y anticipos', editor: 'Soochow, Sinolink, Guosen y Kaiyuan Securities (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://data.eastmoney.com/report/stock.jshtml?code=600809' },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r2(LTM.ventas), ebitda: r2(LTM.ebit + LTM.da), ebit: r2(LTM.ebit), beneficio_neto: r2(LTM.neto), bpa: r2(LTM.neto / 1219.96), dpa: 6.56, dpa_extraordinario: 1.76, fcf: r2(fcfLtm), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Fenjiu duplicó las ventas entre 2021 (19.971 M CNY) y 2025 (38.718 M) sin compras de empresas: todo orgánico, con la expansión fuera de Shanxi (de 11.738 M a 25.202 M) [1, 5]. El crecimiento se frenó del 31,3 % de 2022 al 7,5 % de 2025 y en 2025 fue de volumen, no de precio: se vendieron 269.104 kl (+22,0 %) a un ingreso medio de 143 CNY por litro frente a 163 en 2024 (−11,8 %), por el peso del Bofen (玻汾) barato [1]. El margen EBIT subió del 32,9 % (2021) al 45,0 % (2024) y bajó al 42,2 % en 2025: margen bruto del 74,9 % (−1,35 puntos) y más impuesto especial y publicidad [1, 2]. En el 1S26 las ventas cayeron un 12,2 % (21.044 M) y el beneficio un 24,3 % (6.439 M); el 2T26 fue peor: ventas −17,7 % y beneficio −43,1 %, con el gasto comercial subiendo un 51 % [6, 14].',
    ajustes: 'Cifras publicadas (CAS), sin ajustes. En «coste de ventas» se suma al coste de producción el impuesto especial y los recargos (税金及附加: 6.916 M en 2025, el 17,9 % de las ventas), que en el baijiu es un coste del producto [1]. Para el EBIT se sacan del resultado de explotación los rendimientos de la tesorería (intereses, depósitos estructurados y certificados de depósito: 310 M en 2025, 499 M en 2023), que pasan al resultado financiero; las subvenciones (14 M) y los deterioros (casi nulos) se quedan en el EBIT [1]. El beneficio sin extraordinarios (扣非) es casi igual al publicado (12.253 M frente a 12.246 M en 2025) [1]. El dividendo de 2025 (6,56 CNY) es el 65,35 % del beneficio [12]; en el LTM se marca como extraordinaria la parte (1,76 CNY) que excede el 65 % de nuestro BPA de 2026e (7,39): estimación propia para no contar en la rentabilidad a 12 meses un dividendo que no se repetirá con el beneficio más bajo.',
    confianza: 'Alta',
  },
  trimestres: {
    items: tri,
    ultima_presentacion: 'La empresa no publica la transcripción de sus conferencias; la del 1S26 (septiembre de 2026, plataforma de SSE) y la de 2025 se siguen por las notas de los brókeres [14]. El mensaje cambió entre abril y septiembre: en abril la dirección hablaba de «青花 crece, Bofen estable» y de cobros sanos (el 1T26 cayó un 9,7 % en ventas, pero el beneficio de Shanxi se mantuvo: +0,06 %) [8, 14]. En septiembre reconoció un «descenso activo» para quitar presión al canal: en el 2T26 bajó las exigencias de pago a los distribuidores (cobros −17,1 %, anticipos −1.250 M en el trimestre), recortó el Bofen y el Laobaifen y subió el gasto de publicidad y en el consumidor final (+51 %) [14]. Los analistas preguntaron por las existencias en el canal y por el precio de reventa del 青花20 (Qinghua 20); la dirección no dio cifras de ninguno de los dos [14]. Tampoco dio objetivo para el año: el plan de 2026 es «la estabilidad por encima de todo» [1].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Efectivo 9.721 M + depósitos a plazo 25.670 M a 30-jun-2026 (35.391 M; 2.569 M pignorados por pagarés comerciales) sin deuda bancaria; el dividendo de 2025 (8.003 M) estaba por pagar y se pagó el 31-jul-2026 [6, 13].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'El pasivo que importa no es deuda: los anticipos de distribuidores (合同负债) suman 7.007 M a fin de 2025 y 6.658 M a jun-26 (8.672 M a fin de 2024), un 18 % de las ventas; los distribuidores pagan antes de recibir el vino y la caja de la empresa los incluye [1, 6]. Se tratan como circulante (se compensan con entregas, no se devuelven en caja), pero son el indicador adelantado del canal: bajaron 1.250 M en el 2T26 porque la empresa relajó las exigencias de pago [14]. El dividendo de 2025 (8.009 M por pagar a 30-jun) se pagó el 31-jul [6, 13]. Los pagarés comerciales (2.078 M) están cubiertos con depósitos pignorados [6]. Sin pensiones, litigios ni garantías relevantes [1].',
    comentario: 'El balance es de caja neta y de existencias: tesorería de 29.167 M a fin de 2025 (35.391 M a jun-26, antes del dividendo) frente a ninguna deuda bancaria, y existencias de 14.392 M (14.784 M a jun-26), de las que 7.727 M son vino base y semielaborado que envejece, más 114.942 kl de producto terminado [1, 6]. El circulante comercial con los anticipos (existencias + clientes − proveedores − anticipos) fue del 13,5 % de las ventas en 2025 frente al 12,1 % de 2021: las existencias crecieron algo menos que las ventas (+76 % frente a +94 %), pero los anticipos de distribuidores no crecieron (7.376 → 7.007 M) y pasaron del 37 % al 18 % de las ventas [1, 5]. Las existencias son un activo y no un problema de calidad (el baijiu no caduca y el vino base gana valor), pero atan caja: el plan 2030 de capacidad (9.102 M) lleva el almacenamiento de base a 134.400 t [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es alta pero irregular porque depende de los anticipos de los distribuidores y de los pagarés: flujo operativo de 10.310 M en 2022 (1,27 veces el beneficio), 7.225 M en 2023 (0,69 veces, por menos anticipos y más existencias), 12.172 M en 2024 (0,99) y 9.014 M en 2025 (0,74) [1, 2, 3]. El capex es bajo (1.194 M en 2025, el 3,1 % de las ventas; 486-826 M en 2022-2024), concentrado en el plan 2030 de capacidad de base y almacenamiento (9.102 M en total) y la base de Fenqing; no se separa mantenimiento y crecimiento, y estimamos el mantenimiento cerca de la amortización (≈ 620 M, 1,6 % de las ventas): estimación propia [1]. Casi toda la caja libre se reparte: dividendos de 7.393 M en 2025 (el 89 % del flujo libre) y 8.003 M en julio de 2026 [1, 13]. Los pagos de «otras actividades de financiación» (369 M en 2025) son arrendamientos [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Tianheng CPA (天衡会计师事务所)', anios_auditor: 2, opinion: 'Favorable (sin salvedades) en 2025, también la auditoría del control interno',
    comentario: 'Tianheng audita desde 2024; antes, Dahua CPA (大华), cambio por rotación del concurso de auditor y no por desacuerdo [2]. No hay pagos en acciones, ni capitalización de I+D (174 M a gastos), ni fondo de comercio [1]. El reconocimiento de ingresos es al entregar al distribuidor: el riesgo de un sector como el baijiu es «llenar el canal» (sell-in por encima de lo que se bebe), que no se ve en los indicadores contables; las señales indirectas son el volumen +22 % con precio medio −11,8 % en 2025 y los anticipos a la baja [1]. Con las cuentas, el Beneish y el Altman salen limpios (sin deuda, sin cuentas por cobrar: 0,1 M); lo que hay que vigilar no está en el balance de Fenjiu sino en el de sus 3.487 distribuidores de Fenjiu [7]. Las operaciones con el grupo de control (558 M de compras en 2025, 433 M de envases a Wanyida) están autorizadas por la junta y son el 1,4 % de las ventas [1].',
    senales: [
      { senal: 'Volumen +22 % con precio medio −11,8 % en 2025 y anticipos −19 %', nivel: 'Media', comentario: 'Crecimiento por mezcla barata (Bofen) y posible carga del canal antes del ajuste de 2026 [1].' },
      { senal: 'Anticipos de distribuidores −1.250 M en el 2T26 y cobros −17 %', nivel: 'Media', comentario: 'La empresa relajó las exigencias de pago para aliviar al canal: menos ventas futuras «aseguradas» [6, 14].' },
      { senal: 'Compras al grupo de control (envases, patrocinio del club de baloncesto)', nivel: 'Baja', comentario: '558 M en 2025 (382 M en 2024), dentro del tope aprobado de 2.199 M [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Plan de dividendos 2025-2027: cada año al menos el 65 % del beneficio atribuido, con posibilidad de dividendo a cuenta [1]. El de 2025 fue de 6,56 CNY por acción (8.003 M, 65,35 % del beneficio), pagado el 31-jul-2026 [12, 13]; el de 2024, 6,06 CNY entre a cuenta (2,46) y final (3,60) [2]. No hay recompras ni ampliaciones; la caja sobrante se queda en depósitos a plazo [1].',
    adquisiciones: [],
    comentario: 'La asignación de capital es sencilla y razonable: crecimiento orgánico, capex modesto y concentrado en capacidad de vino base (el activo que limita el crecimiento en baijiu de gama alta), y reparto creciente del beneficio (del 33 % de 2021 al 65 % de 2025) [1, 5]. La pega es la caja ociosa: 29.000-35.000 M en depósitos al 1,5-2 % sin recompras, con un accionista estatal que prefiere el dividendo [1, 6]. El ROIC incremental es alto mientras el negocio crecía; con ventas a la baja en 2026, el capital nuevo (existencias y capacidad) rinde menos [6].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Fenjiu (汾酒)', descripcion: 'Marca principal de baijiu de aroma ligero (清香型): Qinghua (青花 20, 25, 30, 40) en la gama alta, Panamá (巴拿马) y Laobaifen (老白汾) en la media y Bofen (玻汾, botella de vidrio) en la popular.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 34758.4, resultado: null }, { periodo: '2025', ingresos: 37441.36, resultado: null }] },
      { nombre: 'Otras bebidas (竹叶青, 杏花村)', descripcion: 'Zhuyeqing (licor de hierbas) y la marca Xinghuacun; reclasificadas en 2025 (antes «otros licores» incluía parte de la gama media).', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: 1116.86, resultado: null }, { periodo: '2025', ingresos: 1151.37, resultado: null }] },
      { nombre: 'Otros ingresos', descripcion: 'Ingresos fuera del negocio principal y conciliación con el total.', tipo_resultado: null, historico: [{ periodo: '2024', ingresos: r2(36010.99 - 34758.4 - 1116.86), resultado: null }, { periodo: '2025', ingresos: r2(38718.26 - 37441.36 - 1151.37), resultado: null }] },
    ],
    geografias: [
      { nombre: 'Provincia de Shanxi (省内)', peso_pct: 34.7 },
      { nombre: 'Resto de China (省外)', peso_pct: 65.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Volumen vendido (kl)', valor_anterior: '220.603 (2024)', valor_actual: '269.104 (2025)', variacion: '+22,0 %', comentario: 'Crecimiento de volumen con Bofen y venta directa [1].' },
      { kpi: 'Ingreso medio por litro (CNY)', valor_anterior: '162,6 (2024)', valor_actual: '143,4 (2025)', variacion: '−11,8 %', comentario: 'Mezcla hacia la gama popular; estimación propia con ventas y litros del informe [1].' },
      { kpi: 'Ventas fuera de Shanxi', valor_anterior: '22.374 M (2024)', valor_actual: '25.202 M (2025); 12.997 M en el 1S26', variacion: '+12,6 %; −14,2 % en el 1S26', comentario: 'El motor de la década se frena: −11,5 % en el 2T26 [1, 7, 14].' },
      { kpi: 'Ventas en Shanxi', valor_anterior: '13.500 M (2024)', valor_actual: '13.391 M (2025); 7.938 M en el 1S26', variacion: '−0,8 %; −9,1 % en el 1S26', comentario: '−30,1 % en el 2T26, por la retirada de existencias del canal [7, 14].' },
      { kpi: 'Distribuidores de Fenjiu', valor_anterior: '3.486 (fin de 2025)', valor_actual: '3.487 (jun-26)', variacion: 'estable', comentario: '262 altas y 261 bajas en el semestre; en otras marcas, −286 netos [1, 7].' },
      { kpi: 'Anticipos de distribuidores', valor_anterior: '8.672 M (fin de 2024)', valor_actual: '7.007 M (fin de 2025); 6.658 M (jun-26)', variacion: '−19,2 %', comentario: 'Indicador adelantado de pedidos [1, 6].' },
      { kpi: 'Venta directa y en línea (peso)', valor_anterior: '6,5 % (2024)', valor_actual: '6,5 % (2025); 6,6 % en el 1S26', variacion: '≈', comentario: '+25,8 % en el 2T26 frente a −21,3 % de los distribuidores [1, 7, 14].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda y vs_consenso', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS: no publican la amortización trimestral; 2) informes semestrales: solo semestre; 3) notas de brókeres: sin consenso previo por trimestre publicado', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Informe anual 2025, nota de préstamos: sin deuda bancaria; 2) semestral 2026: sin préstamos; 3) arrendamientos: 12 M a corto', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2023 en la segmentación vigente', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo reexpresa 2024; 2) informes 2022-2024: otra segmentación («otros licores» de 7.107-9.342 M); 3) semestral 2025: reexpresado solo el 1S25', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const comps = lee('comparables-yahoo.json').empresas;
const cp = Object.fromEntries(comps.map((e) => [e.ticker, e]));
const fB = [
  { id: 1, titulo: '2024年年度报告 (informe anual 2024): sector según NBS y Asociación China de Bebidas Alcohólicas: 414,5 × 10⁴ kl, ventas de 796.384 M CNY y beneficio de 250.865 M de las empresas de baijiu por encima del umbral estadístico', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-30', url: `${CN}/2025-04-30/1223414537.PDF` },
  { id: 2, titulo: '2025年年度报告 (informe anual 2025): producción de baijiu de 2025 (354,9 × 10⁴ kl, NBS), tendencias del sector, plan 2026 y riesgos', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156714.PDF` },
  { id: 3, titulo: 'Informes anuales 2021, 2022 y 2023: ventas del sector (603.348, 662.645 y 756.300 M CNY), producción y beneficio según NBS', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2024-04-26', url: `${CN}/2024-04-26/1219833278.PDF` },
  { id: 4, titulo: '党政机关厉行节约反对浪费条例 (reglamento revisado de austeridad del Partido y la Administración: «工作餐不上酒», sin alcohol en las comidas de trabajo oficiales)', editor: 'Comité Central del PCCh y Consejo de Estado (vía The Paper)', tipo: 'Primaria', fecha: '2025-05-18', url: 'https://www.thepaper.cn/newsDetail_forward_30840782' },
  { id: 5, titulo: '统计局: 2025年1-12月白酒产量354.9万千升, −12,1 % (producción de 2025 y siete años de caída)', editor: 'Eastmoney (prensa económica, cita al NBS)', tipo: 'Prensa', fecha: '2026-03-31', url: 'https://caifuhao.eastmoney.com/news/20260331065728093727720' },
  { id: 6, titulo: 'Kweichow Moutai, Wuliangye, Luzhou Laojiao, Yanghe, Gujing, Jinshiyuan, Yingjia, Shede, Diageo y Pernod Ricard: cuentas y últimos 12 meses (ficha de Yahoo Finance)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: 'Fenjiu now has old stock dating back to 2023 (existencias viejas de Bofen en supermercados; ventas de bajo grado y de licores de frutas al alza)', editor: '36Kr', tipo: 'Prensa', fecha: '2026-09', url: 'https://eu.36kr.com/en/p/3947903995739528' },
  { id: 8, titulo: 'Yanghe’s baijiu sales fell 31.36% in the first half (volumen de Yanghe −31 % en el 1S26)', editor: 'Vinetur', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://www.vinetur.com/en/20260828106246/yanghes-baijiu-sales-fell-3136-in-the-first-half.html' },
  { id: 9, titulo: '汾酒发布2026年半年报：稳前行蓄力，以长期主义穿越行业周期 (estrategia «复兴纲领» 2022-2030 y ajuste de 2026)', editor: 'Xinhua Finance (cnfin.com)', tipo: 'Prensa', fecha: '2026-08-30', url: 'https://www.cnfin.com/sl-lb/detail/20260830/4462416_1.html' },
  { id: 10, titulo: '财报观察室丨“稳健压倒一切”，汾酒一季报锁“稳”求“远” (1T26: Qinghua 20 +20-30 % según distribuidores; plan de mercados «bastión»)', editor: 'Beijing News (新京报)', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://www.bjnews.com.cn/detail/1777522050169428.html' },
  { id: 11, titulo: 'Notas de resultados del 1S26 de Soochow, Sinolink, Guosen y Kaiyuan', editor: 'Brókeres chinos (vía Eastmoney)', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://data.eastmoney.com/report/stock.jshtml?code=600809' },
  { id: 12, titulo: 'Informe de Soochow «全国化2.0深度扎根» (feb-2026): historia, cuota de aroma ligero, estructura de productos y precios', editor: 'Soochow Securities (东吴证券)', tipo: 'Analistas', fecha: '2026-02-09', url: 'https://pdf.dfcfw.com/pdf/H3_AP202602091819837563_1.pdf' },
];
const vtas = (t) => cp[t]?._ventas_ltm_m ?? null;
const mEbit = (t) => null;
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Fenjiu elabora y vende baijiu, el aguardiente de sorgo chino, de aroma ligero (清香型), con la marca Fenjiu (汾酒) y unos 6.000 años de tradición en Xinghuacun, Shanxi [2]. La gama va del Bofen (玻汾, unos 50-60 CNY la botella) al Qinghua 30 y 40 (más de 800 CNY): el Qinghua (青花) es la gama alta y el motor del margen, y el Bofen el volumen [12]. Vende el 93,5 % a través de 3.487 distribuidores de Fenjiu y 887 de otras marcas, que revenden a tiendas, restaurantes y empresas; el 6,5 % restante es venta directa, a grupos y en línea [2]. Produce en Fenyang (Shanxi): capacidad de 265.000 kl de producto terminado y un plan (2030) de 51.000 t de vino base al año y 134.400 t de almacenamiento [2]. El 65 % de las ventas ya es de fuera de Shanxi [2].',
    como_gana_dinero: 'Margen bruto del 75 % (75,7 % en Fenjiu, 51,6 % en otras marcas) porque el coste es sorgo, trabajo y tiempo: el 61 % del coste de ventas es materia prima y el 29 % personal [2]. Del precio sale además un impuesto especial y recargos del 18 % de las ventas y un gasto comercial del 10-11 % (21 % en el 2T26) [2, 11]. El beneficio depende de tres palancas: la mezcla (cada punto de Qinghua sobre Bofen sube el margen), el precio de reventa en el canal (si cae por debajo del precio al distribuidor, el canal deja de pedir) y el apalancamiento operativo (el gasto de publicidad y personal es casi fijo: con ventas −17,7 % en el 2T26, el beneficio cayó un 43 %) [2, 11]. Estacionalidad fuerte: el 1T (Año Nuevo chino) es el 40-45 % de las ventas y el 4T el 15 % [2].',
    clientes: 'Concentración baja: los cinco primeros clientes fueron el 12,0 % de las ventas en 2025, ninguno vinculado [2]. El cliente es el distribuidor, que paga por adelantado (anticipos de 7.007 M a fin de 2025) y tiene exclusiva por zona [2]. El poder de precios es real en la gama alta y débil hoy: el Qinghua 20 se revende en el canal por debajo de su precio de lista desde 2024 y la empresa subió el precio medio entre 2019 y 2023, pero en 2025 el ingreso por litro cayó un 11,8 % por la mezcla [2, 7, 11]. En 2026 la empresa prioriza «estabilizar el precio» a vender más [9].',
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el baijiu en China, medido como ventas de las empresas por encima del umbral estadístico (NBS y la Asociación China de Bebidas Alcohólicas): 796.384 M CNY en 2024 [1]. Es la medida oficial y la misma que cita Fenjiu; incluye todos los aromas y precios. No hay cifra pública de 2025 en valor; la producción cayó un 12,1 % a 354,9 × 10⁴ kl [2, 5]. El mercado del aroma ligero (清香) es una parte (menos del 20 %, según brókeres), y la gama alta (más de 300 CNY) donde compite el Qinghua, otra; usamos el total para la prueba de cuota y lo decimos [12].',
    tamano: '≈ 796.384 M CNY en 2024 (ventas de las empresas de baijiu por encima del umbral; 414,5 × 10⁴ kl) [1]; producción de 2025: 354,9 × 10⁴ kl (−12,1 %) [2, 5]',
    unidad_serie: 'millones de CNY (ventas de las empresas de baijiu por encima del umbral estadístico)',
    serie: [{ anio: '2021', tamano: 603348 }, { anio: '2022', tamano: 662645 }, { anio: '2023', tamano: 756300 }, { anio: '2024', tamano: 796384 }],
    tcac_historico_pct: 9.7,
    tcac_previsto_pct: -1.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Consumo oficial y de empresa (banquetes, regalos)', efecto: '−', horizonte: 'Estructural', evidencia: 'Reglamento de austeridad revisado en mayo de 2025: sin alcohol en las comidas de trabajo oficiales [4]; la producción de 2025 cayó un 12,1 % [5].' },
      { driver: 'Deflación y crisis inmobiliaria', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los precios de reventa y el ingreso por litro bajan: −11,8 % en Fenjiu en 2025 [2]; Yanghe −31 % en volumen en el 1S26 [8].' },
      { driver: 'Jóvenes que beben menos baijiu', efecto: '−', horizonte: 'Estructural', evidencia: 'Crecen el bajo grado, los licores de frutas y las bebidas de 50 ml; existencias viejas de Bofen en supermercados [7].' },
      { driver: 'Concentración en las marcas líderes («efecto Mateo»)', efecto: '+', horizonte: 'Estructural', evidencia: 'Producción −12 % en 2025 y ventas de Fenjiu +7,5 %: las grandes ganan cuota [2, 5].' },
      { driver: 'Existencias del canal', efecto: '−', horizonte: 'Cíclico', evidencia: 'Las cinco grandes retiraron existencias en 2026: Fenjiu −30 % en Shanxi en el 2T26 [11].' },
      { driver: 'Expansión nacional del aroma ligero', efecto: '+', horizonte: 'Estructural', evidencia: 'Fuera de Shanxi, de 11.738 M (2021) a 25.202 M (2025) [2, 3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Mercado que encoge (producción −12 % en 2025) con Moutai, Wuliangye y Luzhou Laojiao bajando precios en la gama de 300-800 CNY donde está el Qinghua [5, 11].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Miles de distribuidores, pero en 2026 la empresa tuvo que relajar cobros y anticipos para que no abandonaran [11].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'Sorgo de bases propias contratadas y envases con muchos proveedores; materia prima el 61 % de un coste que es el 25 % de las ventas [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Una marca de baijiu de gama alta necesita décadas de historia y vino base envejecido; no hay entradas relevantes en 20 años [12].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Vino, cerveza premium, whisky y bebidas de bajo grado ganan con los jóvenes [7].' },
    ],
    ciclo: { posicion: 'Contracción', comentario: 'El sector está en su tercer año de ajuste: la producción cae desde 2017 y en 2025 un 12,1 %, los precios de reventa de la gama alta bajan desde 2024 y en 2026 las grandes marcas venden menos que en 2025 (Fenjiu −12,2 % en el 1S, Yanghe −31 % en volumen) [5, 8, 2]. El anterior ajuste (2013-2015, tras la prohibición de los banquetes oficiales de 2012) duró unos tres años: las ventas de Fenjiu cayeron de 6.250 M en 2012 a 4.300 M en 2014 y volvieron a máximos en 2017 [12]. En 2020 y 2022 el sector aguantó por precio. Indicadores: producción mensual del NBS, precio de reventa del Qinghua 20 y anticipos de distribuidores.' },
    regulacion: 'Tres normas pesan: el reglamento revisado de austeridad de mayo de 2025 (sin alcohol en comidas de trabajo oficiales y sin «banquetes» con dinero público), que tocó el consumo de empresas públicas y funcionarios, cerca de un tercio del consumo de gama alta según brókeres [4, 11]; el impuesto especial (20 % ad valorem más 0,5 CNY por 500 ml, sobre el precio de fábrica), con el riesgo recurrente de que se cobre en la venta al por menor y lo pague el canal [2]; y la norma nacional de etiquetado de baijiu (GB/T) que separa el baijiu «puro» del de mezcla. No hay cambios fiscales aprobados a la fecha de corte.',
    tendencias: 'Cuatro tendencias: (1) menos consumo oficial y de empresa, más consumo privado y de regalo a precios más bajos, que favorece a las marcas con escalera de precios amplia como Fenjiu [4, 9]; (2) jóvenes que beben menos y prefieren bajo grado y formatos pequeños: Fenjiu lanzó en 2026 el «陈皮汾酒», el «侏罗纪汾酒» y botellas de 50 ml [11]; (3) venta directa y en línea frente al distribuidor (+25,8 % en el 2T26 en Fenjiu) [11]; y (4) concentración: las marcas nacionales ganan a las provinciales pequeñas [2]. Fenjiu gana con (1) y (4) y se defiende en (2); pierde margen con (3) si es a costa de precio.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 4.5,
    posicion: '4.º grupo de baijiu de China por ventas en 2025 (38.718 M, tras Moutai, Wuliangye y por delante de Luzhou Laojiao y Yanghe), 4,5 % de las ventas del sector en 2024; líder del aroma ligero (清香) [1, 2, 6].',
    competidores: [
      { nombre: 'Kweichow Moutai', pais: 'CN', ticker: '600519.SS', ingresos: vtas('600519.SS'), cuota_pct: r1(vtas('600519.SS') / 7963.84), margen_ebit_pct: null, comentario: 'Aroma de salsa (酱香), gama más alta; precio de reventa del Feitian en recuperación en 2026 [6, 7].' },
      { nombre: 'Wuliangye Yibin', pais: 'CN', ticker: '000858.SZ', ingresos: vtas('000858.SZ'), cuota_pct: r1(vtas('000858.SZ') / 7963.84), margen_ebit_pct: null, comentario: 'Aroma fuerte (浓香); Puwu (普五) a unos 900 CNY compite por arriba con el Qinghua 30 [6].' },
      { nombre: 'Luzhou Laojiao', pais: 'CN', ticker: '000568.SZ', ingresos: vtas('000568.SZ'), cuota_pct: r1(vtas('000568.SZ') / 7963.84), margen_ebit_pct: null, comentario: 'Guojiao 1573; ventas −12 % previstas para 2026, el ajuste más parecido al de Fenjiu [6].' },
      { nombre: 'Jiangsu Yanghe', pais: 'CN', ticker: '002304.SZ', ingresos: vtas('002304.SZ'), cuota_pct: r1(vtas('002304.SZ') / 7963.84), margen_ebit_pct: null, comentario: 'Gama media (Haizhilan, Mengzhilan); volumen −31 % en el 1S26: el caso de lo que sale mal en un ajuste [6, 8].' },
      { nombre: 'Anhui Gujing', pais: 'CN', ticker: '000596.SZ', ingresos: vtas('000596.SZ'), cuota_pct: r1(vtas('000596.SZ') / 7963.84), margen_ebit_pct: null, comentario: 'Gama media y alta; competidor regional en Anhui y Henan [6].' },
      { nombre: 'Jiangsu King’s Luck (Jinshiyuan)', pais: 'CN', ticker: '603369.SS', ingresos: vtas('603369.SS'), cuota_pct: r1(vtas('603369.SS') / 7963.84), margen_ebit_pct: null, comentario: 'Regional de Jiangsu, gama de 100-300 CNY donde compite el Laobaifen [6].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'El baijiu es un regalo y una bebida social: la marca reconocida vale más cuanto más se ve, pero no hay red en sentido estricto [12].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El consumidor cambia de marca sin coste; el distribuidor exclusivo tiene algo de coste (anticipos, depósitos) [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Marca de más de 1.500 años, una de las «cuatro grandes famosas»; margen bruto del 75 % y EBIT del 42 % en 2025, que solo superan Moutai y Luzhou Laojiao [2, 6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'El aroma ligero se elabora en ciclos de 28 días en tinajas de barro, frente a los 9-12 meses del aroma de salsa: menos capital por litro [12].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Vino base envejecido (227.286 kl de semielaborado) y red de 3.487 distribuidores de Fenjiu que no se replican en una década [2].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) que la caída del consumo de empresa y de regalo sea permanente y no cíclica (probabilidad media-alta): el Qinghua 20 y 30 compiten en la franja que más ha perdido con el reglamento de austeridad [4]; (2) guerra de precios de las grandes en 300-800 CNY: si Wuliangye y Luzhou bajan su precio de reventa, el Qinghua pierde su ventaja de precio (media) [6, 11]; y (3) los jóvenes: el baijiu pierde consumidores con cada generación (alta a 10 años, lenta) [7]. El foso de marca no desaparece, pero su rendimiento (margen EBIT) puede bajar de 42 % a 35 % durante años.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Fenjiu es la destilería de Xinghuacun (Fenyang, Shanxi), cuna del aroma ligero; la fábrica moderna nace en 1949 como empresa estatal y en 1993 sale a bolsa en Shanghái la sociedad Fenjiu, la primera del baijiu [12]. Tras décadas como marca regional, el gobierno de Shanxi la eligió en 2017 para su reforma de empresas estatales: contrato de objetivos a la dirección, entrada de China Resources (华润创业) con el 11,45 % en 2018 y plan de expansión nacional [12]. Las ventas pasaron de 6.000 M en 2017 a 38.718 M en 2025 y la acción multiplicó su valor por 15 hasta 2021 [2, 12]. Desde 2022 el plan «复兴纲领» marca la segunda fase (2025-2030): consolidar, no acelerar [9].',
    hitos: [
      { anio: '1949', hito: 'Nace la fábrica estatal de Xinghuacun.' },
      { anio: '1994', hito: 'Salida a bolsa en Shanghái (600809), primera empresa de baijiu cotizada.' },
      { anio: '2012-2015', hito: 'Prohibición de banquetes oficiales: ventas de 6.250 M a 4.300 M.' },
      { anio: '2017', hito: 'Reforma de Shanxi: contrato de objetivos y plan de expansión nacional.' },
      { anio: '2018', hito: 'Entrada de China Resources (华创鑫睿) con el 11,45 %.' },
      { anio: '2021', hito: 'Ampliación liberada de 4 × 10; máximos en bolsa.' },
      { anio: '2023', hito: 'Ventas de 31.928 M; Fenjiu supera a Luzhou Laojiao.' },
      { anio: '2025', hito: 'Reglamento de austeridad (mayo); ventas de 38.718 M, beneficio plano; China Resources baja al 9,17 %.' },
      { anio: '2026', hito: '«Descenso activo»: ventas del 1S −12,2 % y beneficio −24,3 %.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el agua y el grano (el baijiu consume sorgo y mucha agua por litro), la energía de destilación y la seguridad alimentaria; Fenjiu publica informe ESG desde 2023 con datos de agua, energía y residuos y está aumentando el uso de electricidad verde [2]. El asunto social de fondo es el propio alcohol: el consumo de alcohol es un riesgo de salud reconocido y la regulación de publicidad y austeridad oficial es un riesgo de ventas, no solo de reputación [4].',
    controversias: 'Sin sanciones de reguladores en los últimos tres años en los informes anuales [2]. Circulan en foros acusaciones de «vino falso» (假酒) que se refieren a falsificaciones de terceros, no a la empresa [2].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe ESG 2025: no cita calificaciones externas; 2) búsqueda de MSCI y Sustainalytics para 600809: sin página pública; 3) prensa: Wind ESG sin cifra abierta', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informes de Fenjiu: sin cuota del sector; 2) Asociación China de Bebidas Alcohólicas: sin cifra de 2025 en abierto; 3) suma de ventas de las cinco cotizadas grandes entre el total de 2024: ≈ 46 %, pero mezcla perímetros (estimación no usada)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'margen_ebit_pct de los competidores', tipo: 'Complemento', intentos: '1) Yahoo: margen EBITDA en comparables; 2) informes anuales de cada competidor: no leídos uno a uno por tiempo; 3) brókeres: sin tabla homogénea', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025): consejo, directivos, remuneración, accionistas, operaciones vinculadas y auditor', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156714.PDF` },
  { id: 2, titulo: '2026年半年度报告: accionistas a 30-jun-2026', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225535289.PDF` },
  { id: 3, titulo: '2025年度股东会决议公告 (votaciones de la junta del 16-jun-2026)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-06-17', url: `${CN}/2026-06-17/1225374611.PDF` },
  { id: 4, titulo: '关于股东通过大宗交易方式转让股份计划的公告 (plan de venta de hasta 16.200.599 acciones de 华创鑫睿 por la salida del fondo socio)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-09-22', url: `${CN}/2025-09-22/1224672902.PDF` },
  { id: 5, titulo: '股东减持股份结果公告 (华创鑫睿 vendió 16.200.599 acciones del 21-oct al 1-dic-2025; queda con el 9,17 %)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-12-04', url: `${CN}/2025-12-04/1224847290.PDF` },
  { id: 6, titulo: '关于控股股东与实际控制人之间产权层级减少的提示性公告 (el 90 % del grupo pasa al SASAC de Shanxi)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-12-03', url: `${CN}/2025-12-03/1224843831.PDF` },
  { id: 7, titulo: '关于公司高级管理人员离任暨聘任总会计师的公告 (salida del director financiero Wang Huai, 27-jul-2026)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-29', url: `${CN}/2026-07-29/1225444318.PDF` },
  { id: 8, titulo: '关于董事会秘书离任暨聘任董事会秘书的公告 (salida del secretario del consejo, 27-jul-2026)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-07-29', url: `${CN}/2026-07-29/1225444330.PDF` },
  { id: 9, titulo: '关于公司董事离任的公告 (salida del consejero de China Resources, 13-abr-2026)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-15', url: `${CN}/2026-04-15/1225100295.PDF` },
  { id: 10, titulo: 'Informes anuales 2021-2024: objetivos de ventas del año (+25 % en 2022; +20 % en 2023 y 2024)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-04-30', url: `${CN}/2025-04-30/1223414537.PDF` },
  { id: 11, titulo: '2026年度“提质增效重回报”行动方案 y 关于2025-2027年度股东分红回报规划的公告', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156784.PDF` },
  { id: 12, titulo: '关于2026年度日常关联交易计划的公告 (operaciones con el grupo de control)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-04-23', url: `${CN}/2026-04-23/1225156723.PDF` },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Yuan Qingmao (袁清茂)', cargo: 'Presidente (y secretario del Partido) de Fenjiu y del grupo', desde: '2022', participacion_pct: 0, trayectoria: 'Funcionario y gestor de empresas públicas de Shanxi (vicesecretario de Transporte, presidente de Shanxi Transportation Holding y de Shanxi Road & Bridge); llegó al grupo en dic-2021. Con él las ventas pasaron de 19.971 M (2021) a 38.718 M (2025) [1].' },
      { nombre: 'Wu Yuefei (武跃飞)', cargo: 'Vicepresidente; director general del grupo Fenjiu', desde: '2025', participacion_pct: 0, trayectoria: 'Exvicealcalde ejecutivo de Shuozhou; director general del grupo desde dic-2024. La sociedad cotizada no tiene director general propio publicado en el informe anual [1].' },
      { nombre: 'Zhang Yongyong (张永踊)', cargo: 'Vicedirector general; director del centro de marketing', desde: '2024', participacion_pct: 0, trayectoria: 'Carrera comercial en Fenjiu (Zhuyeqing, empresa de ventas); el directivo mejor pagado (1,74 M CNY en 2025) y responsable de la expansión nacional [1].' },
      { nombre: 'Liu Weihua (刘卫华)', cargo: 'Vicepresidente', desde: '2015', participacion_pct: 0, trayectoria: 'Exdirector de la empresa de ventas de Fenjiu; en el consejo desde 2015, el más veterano [1].' },
      { nombre: 'Li Peijie (李沛洁)', cargo: 'Vicedirector general', desde: '2024', participacion_pct: 0, trayectoria: 'Directivo de la casa (auditoría, desarrollo, Baoquanyong) [1].' },
      { nombre: 'Nuevo director financiero (总会计师)', cargo: 'Director financiero', desde: '2026', participacion_pct: 0, trayectoria: 'Sustituye en julio de 2026 a Wang Huai, que pasa a otro destino del Partido [7].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'Ventas +25 % «aproximadamente»', real: '+31,3 %', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ventas +20 % «aproximadamente»', real: '+21,8 %', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas +20 % «aproximadamente»', real: '+12,8 %', cumplida: 'No' },
      { anio: '2025', guia: 'Sin cifra («crecimiento estable»)', real: '+7,5 %', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Sin cifra («la estabilidad por encima de todo»)', real: '1S −12,2 %', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección la nombra el gobierno de Shanxi y rota como funcionarios: el presidente viene de Transporte, el director general del grupo de una alcaldía, y en julio de 2026 se fueron a la vez el director financiero y el secretario del consejo [1, 7, 8]. La credibilidad de la guía se rompió en 2024 (+12,8 % frente al +20 % prometido) y desde entonces no da cifras [10]. Lo positivo: el equipo comercial es de la casa y estable, y el giro de 2026 (vender menos para no hundir el precio) es lo que el canal pedía [9]. No hay plan de sucesión ni incentivos en acciones; la remuneración es baja y fijada por el SASAC [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Yuan Qingmao', cargo: 'Presidente', tipo: 'Dominical', desde: '2022', comisiones: 'Estrategia (presidente)' },
      { nombre: 'Wu Yuefei', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2025', comisiones: 'Estrategia' },
      { nombre: 'Li Zhenhuan', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2022', comisiones: '—' },
      { nombre: 'Liu Weihua', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2015', comisiones: '—' },
      { nombre: 'Ma Wenjie', cargo: 'Consejero (China Resources)', tipo: 'Dominical', desde: '2025', comisiones: 'Auditoría' },
      { nombre: 'Zhang Shoufu', cargo: 'Consejero de los trabajadores', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Zhou Peiyu', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Retribuciones' },
      { nombre: 'Li Linchun', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos' },
      { nombre: 'Fan Yanping', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'He Zhen', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 98.68, voto_remuneracion_contra_pct: 1.31, voto_remuneracion_contra_libre_pct: 5.5, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 1.74, fijo: null, variable_corto: null, variable_largo: 0, ratio_salario_medio: 6 },
    remuneracion: 'El presidente, los vicepresidentes y el consejero de China Resources no cobran de la sociedad cotizada (lo hacen del grupo o de su accionista); el directivo mejor pagado fue Zhang Yongyong con 1,74 M CNY antes de impuestos en 2025 y la alta dirección sumó 7,25 M [1]. La remuneración la fija el SASAC de Shanxi por un contrato de objetivos (ventas, beneficio y otros indicadores), sin acciones ni opciones y sin métricas de rentabilidad sobre capital ni de cotización [1]. La junta de 2026 aprobó el esquema de remuneración de consejeros con un 98,7 % a favor y un 1,3 % en contra (un 5,5 % en contra sin contar al grupo de control) [3]. Ratio sobre el salario medio: unas 6 veces (estimación propia: 1,74 M frente a 3.964 M de pagos al personal ÷ 14.026 empleados) [1].',
    accionistas: [
      { nombre: 'Shanxi Xinghuacun Fenjiu Group (SASAC de Shanxi)', pct: 56.65, tipo: 'Control (estatal)', variacion: 'Sin cambios; desde dic-2025 el 90 % del grupo lo tiene directamente el SASAC de Shanxi [1, 6].' },
      { nombre: 'Huachuang Xinrui (Hong Kong), de China Resources', pct: 9.17, tipo: 'Accionista industrial', variacion: 'Vendió 16,2 M acciones (1,33 %) en bloque del 21-oct al 1-dic-2025 por la liquidación de su fondo socio; dice no tener más planes de venta [4, 5].' },
      { nombre: 'Fondo índice de baijiu de China Merchants', pct: 3.12, tipo: 'Fondo índice', variacion: '+3,1 M acciones en 2025 [1].' },
      { nombre: 'Hong Kong Securities Clearing (Stock Connect)', pct: 1.82, tipo: 'Inversores extranjeros', variacion: '1,97 % a fin de 2025 y 1,82 % a jun-26; 2,75 % a fin de 2024 [1, 2].' },
      { nombre: 'E Fund Blue Chip', pct: 1.42, tipo: 'Fondo', variacion: '+2,5 M acciones en 2025 [1].' },
      { nombre: 'Shanxi Xinghuacun International Trade (grupo)', pct: 0.68, tipo: 'Grupo de control', variacion: 'Sin cambios [1].' },
    ],
    insiders: [
      { fecha: '2025-12-31', persona: 'Zhang Shoufu (consejero de los trabajadores; ventas a lo largo de 2025)', operacion: 'Venta', acciones: 7800, importe: null },
    ],
    control_y_defensas: 'El grupo Fenjiu, del SASAC de Shanxi, controla el 57,3 % con su filial de comercio; China Resources es el segundo accionista (9,17 %) y propone un consejero [1, 5]. Una acción, un voto y sin blindajes, pero las decisiones las toma de hecho el gobierno provincial: nombra al presidente y a la dirección, fija la remuneración y aprueba el plan («复兴纲领») [1]. Operaciones vinculadas con el grupo de 558 M en 2025 (envases, patrocinio del club de baloncesto de Shanxi, alojamiento) [1, 12]. El riesgo para el minoritario no es expropiación (el grupo vive del dividendo), sino que la provincia priorice empleo, impuestos o estabilidad sobre rentabilidad [1].',
    alertas: [
      'Control estatal de Shanxi: dirección nombrada por la provincia y rotación de cargos (director financiero y secretario del consejo, julio de 2026) [1, 7, 8].',
      'Sin director general propio en la sociedad cotizada; el del grupo es vicepresidente [1].',
      'Venta en bloque de China Resources (1,33 %) en oct-dic de 2025 por la liquidación de su fondo socio [5].',
      'Compras al grupo de 558 M en 2025 (+46 %) [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo.fijo y variable', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo el total antes de impuestos; 2) informe de remuneraciones: no se publica aparte en China; 3) junta de 2026: solo el esquema', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'importe de las ventas del consejero', tipo: 'Complemento', intentos: '1) Informe anual 2025: solo acciones (−7.800); 2) SSE, registro de cambios de participación de directivos: sin precio en el resumen; 3) prensa: sin dato', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const bolsa = lee('bolsa.json');
const mov = lee('movimiento.json')['600809.SS'];
const bB = bolsa.bolsa;
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const fD = [
  { id: 1, titulo: 'Históricos diarios de 600809.SS, 510300.SS (ETF del CSI 300) y 512690.SS (ETF de licores)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/600809.SS/history' },
  { id: 2, titulo: 'Cotización de sh600809 al cierre del 20-oct-2026 (117,36 CNY, dato de las 15:34:59 de Pekín)', editor: 'Sina Finance (hq.sinajs.cn)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://hq.sinajs.cn/list=sh600809' },
  { id: 3, titulo: 'Shanxi Fenjiu (600809.SS): estimaciones de BPA y ventas 2026e-2027e (earningsTrend, 7 analistas), objetivo medio de 14 analistas', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/600809.SS/analysis' },
  { id: 4, titulo: 'Lista de informes de analistas de 600809 con previsiones de BPA 2026e-2028e (30 informes, oct-2025 a sep-2026)', editor: 'Eastmoney (东方财富研报中心)', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://data.eastmoney.com/report/stock.jshtml?code=600809' },
  { id: 5, titulo: 'Notas del 1S26: Soochow (BPA 8,18/9,00/10,10), Sinolink (6,92/7,47/8,44), Guosen (8,22/8,60/9,67) y Kaiyuan (7,61/8,47/9,09)', editor: 'Soochow, Sinolink, Guosen, Kaiyuan', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608311828791076_1.pdf' },
  { id: 6, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 10 años a 19-oct-2026: 1,6497 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Ficha de comparables (capitalización, valor empresa, ventas, EBITDA, PER adelantado, flujo libre) de diez empresas de bebidas alcohólicas', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com' },
  { id: 9, titulo: '2026年半年度报告 (balance a 30-jun-2026 para el puente: efectivo, depósitos a plazo, dividendo por pagar, arrendamientos)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225535289.PDF` },
  { id: 10, titulo: 'Calendario de publicación de resultados (预约披露): 3T26 el 29-oct-2026', editor: 'Eastmoney (datos de SSE)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://data.eastmoney.com/bbsj/yysj.html' },
  { id: 11, titulo: 'List of SSE Securities / China Connect Securities (eligible for both buy and sell), actualizada el 20-oct-2026: n.º 725, 600809, 90809', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SSE_Securities.xls' },
  { id: 12, titulo: 'Hong Kong - China Stock Connect (cuota diaria, ChiNext y STAR solo para inversores profesionales institucionales, comisión del 0,08 %, lotes de 100)', editor: 'Interactive Brokers (base de conocimiento)', tipo: 'Primaria', fecha: '2026-10', url: 'https://ibkb.interactivebrokers.com/article/2267' },
  { id: 13, titulo: 'Movimiento del precio (movimiento.mjs y movimiento-precio.mjs) de 600809.SS', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/600809.SS' },
  { id: 14, titulo: '持股5%以上股东权益变动触及5%刻度的提示性公告 y 股东减持股份结果公告 (ventas en bloque de China Resources, oct-dic 2025)', editor: 'Shanxi Fenjiu (CNINFO/SSE)', tipo: 'Primaria', fecha: '2025-12-04', url: `${CN}/2025-12-04/1224847290.PDF` },
  { id: 15, titulo: 'Diageo: adquisiciones y desinversiones (Shui Jing Fang, 2013: control por 1.000 M USD aprox.; venta de la participación en Guinness Nigeria, 2025)', editor: 'Diageo (notas de prensa)', tipo: 'Primaria', fecha: '2013-07-01', url: 'https://www.diageo.com/en/news-and-media' },
  { id: 16, titulo: '2018年 华润创业 entra en Fenjiu: compra del 11,45 % al grupo por 5.159 M CNY (≈ 50,2 CNY por acción)', editor: 'Shanxi Fenjiu (anuncio de cambio de accionistas, vía CNINFO)', tipo: 'Primaria', fecha: '2018-06-06', url: 'http://www.cninfo.com.cn/new/disclosure/stock?stockCode=600809' },
];
const compD = comps.filter((e) => e.ticker !== '600809.SS').map((e) => {
  const o = { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null,
    per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
  if (e.ticker === '600519.SS') { // Yahoo no dio capitalización: 1.252,27 M acciones (informe semestral 2026 de Moutai) × 1.331,88
    o.capitalizacion = Math.round(1331.88 * 1252.27); const ev = o.capitalizacion + e._dn_m;
    o.ev_ventas = r2(ev / e._ventas_ltm_m); o.ev_ebitda_ltm = r1(ev / e._ebitda_ltm_m); o.dn_ebitda = r2(e._dn_m / e._ebitda_ltm_m); o.fcf_yield_pct = null;
  }
  if (e.ticker === 'DGE.L') { // precio en peniques y cuentas en USD: PER NTM = 17,73 GBP × (8,8866/6,6782) USD/GBP ÷ BPA NTM (0,69 × 1,669 + 0,31 × 1,768)
    const w = (new Date('2027-06-30') - new Date('2026-10-20')) / (365 * 864e5);
    o.per_ntm = r1((17.73 * 8.8866 / 6.6782) / (w * e._eps0y + (1 - w) * e._eps1y));
  }
  return o;
});
export const COMPS = compD;
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Shanxi Xinghuacun Fen Wine Factory Co., Ltd. (山西杏花村汾酒厂股份有限公司)', nombre_corto: 'Fenjiu', ticker: '600809', isin: 'CNE000000DH5',
    mercado: 'Bolsa de Shanghái, mercado principal (A, CNY); comprable por Stock Connect Northbound', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Consumo básico', industria: 'Destiladores y vinateros', sede: 'Fenyang (Shanxi)', fundacion: '1949', empleados: 14026, web: 'https://www.fenjiu.com.cn',
    precio: 117.36, fecha_precio: '2026-10-20', acciones: 1219.96, capitalizacion_publicada: null, free_float_pct: 33.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones)} M CNY/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Fenjiu no da guía cuantificada desde 2025. El plan de 2026 (informe anual del 23-abr-2026) es «la estabilidad por encima de todo»: estabilizar el precio, sanear el canal y construir mercados «bastión» de más de 2.000 M; no hay objetivo de ventas ni de beneficio [9]. El compromiso cuantificado es el reparto: al menos el 65 % del beneficio en 2025-2027 [9]. En agosto de 2026 la empresa reiteró la estrategia de «bajar el ritmo» sin cifras [5].',
    estimaciones: [
      { periodo: '2026e', ingresos: 33601, ebitda: null, ebit: null, bpa: 7.82, dpa: null, fuente: 'Media de seis brókeres tras el 1S26 (Soochow, Sinolink, Guosen, Kaiyuan, Huaxin, Guoyuan) [4, 5]; Yahoo, 7 analistas: 8,04 CNY y 34.155 M [3]' },
      { periodo: '2027e', ingresos: 35344, ebitda: null, ebit: null, bpa: 8.47, dpa: null, fuente: 'Media de seis brókeres [4, 5]; Yahoo: 8,62 CNY [3]' },
      { periodo: '2028e', ingresos: 38146, ebitda: null, ebit: null, bpa: 9.44, dpa: null, fuente: 'Media de seis brókeres [4, 5]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 153.53, po_min: null, po_max: null },
    revisiones: 'Recortes fuertes y continuos: la media de BPA de 2026e pasó de unos 10,5 CNY en noviembre de 2025 a 9,9-10,2 en abril de 2026 y a 7,8 tras el 1S26 (−25 % en un año); la de 2027e, de 11,5 a 8,5 [4]. En Yahoo, el BPA de 2026e bajó de 9,80 a 8,04 en 90 días (−18 %) [3]. Los ingresos de 2026e esperados van de −11 % (Soochow) a −16 % (Kaiyuan) [5]. Todos los brókeres mantienen «comprar» o «sobreponderar» salvo uno («mantener»), con el argumento del dividendo y del suelo del ciclo [4].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bB.tipo_rentabilidad,
    rentabilidades: bB.rentabilidades,
    anual: bB.anual,
    beta: 1.0, volatilidad_pct: bB.volatilidad_pct, max_drawdown_pct: bB.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Fenjiu perdió un 35,6 % en un año con dividendos frente al −6,7 % del CSI 300 y el −29,1 % del ETF de licores, y un 66,7 % desde el máximo de diciembre de 2021 [1]. La caída tiene tres tramos: el reglamento de austeridad (mayo de 2025), los resultados de 2025 con beneficio plano y sin guía (abril de 2026) y el 1S26 (−12 % en ventas, −24 % en beneficio) con el mínimo de 103,64 CNY el 10-jul-2026 [1, 9]. Después rebotó un 13 % con el sector, que se usa como refugio cuando caen las tecnológicas [1]. La beta mensual de 5 años es 1,0 pero la semanal de 2 años 0,39: en el ajuste la acción va más con su sector que con el índice [1].',
    contexto: {
      movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: (mov.avisos || []).map((a) => `${a.codigo} ${a.texto}`) },
      movimientos_fuertes: [
        { periodo: 'dic-2025', var_pct: -11.6, causa: 'Fin de la venta en bloque de China Resources (1,33 %, 21-oct a 1-dic) y datos de producción del sector a la baja; sin noticia propia de resultados [13, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-2026', var_pct: -11.2, causa: 'Rotación de cara a los resultados de 2025: el mercado anticipaba beneficio plano y ningún objetivo para 2026 (se confirmó el 23-abr) [13, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -10.5, causa: 'Resultados de 2025 y 1T26 (ventas −9,7 %, beneficio −19 %) y recortes de BPA de los brókeres [4, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-2026', var_pct: -14.8, causa: 'Caída del sector por los datos de venta del 618 y del precio de reventa de la gama alta; mínimo de 103,64 CNY el 10-jul [1, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 16.3, causa: 'Rebote del sector desde mínimos de varios años con compras de fondos índice; el −6,4 % del 31-jul es el descuento del dividendo de 6,56 CNY, no una caída [1, 13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2025-12-04', tipo: 'accionista de referencia', hecho: 'China Resources (华创鑫睿) terminó de vender en bloque 16,2 M acciones (1,33 %) por la liquidación de su fondo socio y queda con el 9,17 %; declara que no tiene más planes de venta [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-03', tipo: 'accionista de referencia', hecho: 'El 90 % del grupo de control pasa directamente al SASAC de Shanxi; no cambia el control [C6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-27', tipo: 'directivos', hecho: 'Salen a la vez el director financiero (a un cargo del Partido) y el secretario del consejo; se nombran sustitutos [C7, C8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-30', tipo: 'resultados', hecho: '1S26: ventas −12,2 % y beneficio −24,3 %; 2T −17,7 % y −43,1 %. Los brókeres recortan el BPA de 2026e de ≈ 10 a ≈ 7,8 CNY y mantienen «comprar» [4, 5].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'Resultados del 3T26 (calendario de SSE) [10].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 41,6 % por debajo del máximo de 52 semanas y un 11,7 % por encima del mínimo, en tendencia bajista (14,5 % bajo la media de 200 sesiones) [13]. Las caídas fuertes tienen causa conocida y son del negocio y del sector (resultados, recortes, el reglamento de austeridad), que el informe ya recoge en su caso base; el rebote de julio es de sector. No hay hecho pendiente que pueda mover el precio más de un 5 % en contra: China Resources ya vendió y dice no tener más planes, no hay ampliaciones ni ofertas, y los resultados del 3T26 del 29-oct no aplazan una decisión (regla 11) [10, 14]. Veredicto: no cambia.',
    },
    confianza: 'Media',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Media',
  },
  comparables: { empresas: compD, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2018-06', objetivo: 'Shanxi Fenjiu (11,45 %)', comprador: 'China Resources (华创鑫睿)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '5.159 M CNY por el 11,45 % (≈ 50,2 CNY por acción antigua); compra de una participación minoritaria al grupo de control [16].' },
      { fecha: '2025-10', objetivo: 'Shanxi Fenjiu (1,33 %)', comprador: 'Inversores en bloque', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Venta en bloque de China Resources a precio de mercado (descuento de bloque habitual) [14].' },
    ],
    comentario: 'No hay transacciones de control comparables con múltiplos publicados: las destilerías chinas grandes son estatales o de control provincial y no se venden; las operaciones son ventas de participaciones minoritarias (China Resources en Fenjiu en 2018) o de destilerías pequeñas sin cifras [16]. Fuera de China, los múltiplos de licores premium (15-20 veces el EBITDA en 2017-2021) no son trasladables. Fenjiu no puede ser objeto de una oferta: el SASAC de Shanxi controla el 57 % y la marca es un activo estratégico de la provincia.',
    confianza: 'Baja',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 0, arrendamientos: 11.61, caja: 35391.09, minoritarios: 533.72, pensiones: 0, asociadas: 128.87, otros_ajustes: 8008.77 },
    referencia_mercado: { mercado: 'Prima implícita del S&P 500 (Damodaran), la principal, para mercados desarrollados; el riesgo de China va en la prima adicional', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [7]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) SSE, préstamo de valores: sin posición corta publicada por valor; 2) Eastmoney, margen: solo saldo de financiación (1.189 M, préstamo de valores casi nulo); 3) prensa: sin dato', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de operaciones de control', tipo: 'Complemento', intentos: '1) Anuncios de CNINFO del sector: sin compras de control de destilerías grandes con cifras; 2) Diageo-Shui Jing Fang (2013): sin EBITDA publicado; 3) prensa: múltiplos no verificables', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones por tipo y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) Yahoo: solo media («buy») y objetivo medio; 2) Eastmoney: las notas chinas no siempre dan objetivo; 3) MarketScreener: sin acceso sin suscripción', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Eastmoney (东方财富股吧) de 600809: unas 150 entradas del 13 al 20-oct-2026 (tres páginas)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://guba.eastmoney.com/list,600809.html' },
  { id: 2, titulo: 'Hilos largos del mismo foro: «白酒不是周期，是结构性崩塌» (14-oct, 3.061 lecturas, 48 respuestas) y «为什么现在选择建仓泸州老窖？» (15-oct)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://guba.eastmoney.com/list,600809_2.html' },
  { id: 3, titulo: 'Comentarios en prensa sobre existencias viejas de baijiu en supermercados (36Kr)', editor: '36Kr', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://eu.36kr.com/en/p/3947903995739528' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Eastmoney Guba (600809)', fecha: '2026-10', n_comentarios: 150, tono: 'Negativo', resumen: 'Frustración de pequeños accionistas atrapados que hacen compraventa intradía («cada subida se devuelve en un día», «vendo a 118 y recompro a 115») y lo usan como valor refugio cuando caen las tecnológicas; casi nadie habla del negocio [1].' },
      { plataforma: 'Eastmoney Guba, hilos de análisis', fecha: '2026-10', n_comentarios: 60, tono: 'Dividido', resumen: 'Debate entre «el baijiu no es un ciclo, es un hundimiento estructural» y «suelo del ciclo con dividendo del 5 %»; algunos fijan un valor de 70 CNY y otros de 150 [2].' },
      { plataforma: 'Comentarios a la prensa de consumo (36Kr)', fecha: '2026-09', n_comentarios: 20, tono: 'Negativo', resumen: 'Botellas de Bofen de 2023 sin vender en supermercados; los jóvenes cambian a bebidas de bajo grado [3].' },
    ],
    temas: [
      { tema: 'Hundimiento estructural del baijiu (jóvenes, austeridad oficial)', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos lo apoyan en volumen (producción −12 % en 2025) pero no en las marcas grandes: Fenjiu creció un 7,5 % en 2025 y cae un 12 % en 2026 [B5, A1].' },
      { tema: 'Valor refugio y dividendo', postura: 'Alcista', peso: 'Medio', contraste: 'Dividendo de 6,56 CNY (5,6 % al precio de hoy) que con nuestro BPA bajará a ≈ 4,8 (4,1 %) [A12].' },
      { tema: 'Existencias en el canal y precio de reventa', postura: 'Bajista', peso: 'Medio', contraste: 'La empresa no da cifras; los anticipos bajaron un 19 % en 2025 y 1.250 M en el 2T26 [A1, A14].' },
      { tema: 'Resultados del 3T (29-oct)', postura: 'Dividida', peso: 'Medio', contraste: 'Base exigente: el 3T25 tuvo 8.960 M de ventas; los brókeres esperan otra caída de dos cifras [A1, D5].' },
    ],
    lectura: 'El particular chino está cansado y especula a corto plazo; no hay euforia ni capitulación con volumen. La conversación se centra en si el baijiu es un ciclo o un declive, que es la pregunta del informe: nuestros escenarios dan peso a las dos lecturas. No anticipa nada que no esté en el informe y va en contra del consenso de analistas, que sigue en «comprar». Si los resultados del 3T confirman otra caída de dos cifras, el tono puede pasar a capitulación, que suele coincidir con suelos de precio en el sector (2014-2015).',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. LTM:', JSON.stringify(Object.fromEntries(Object.entries(LTM).map(([k, v]) => [k, r2(v)]))));
for (const c of cuenta) console.log(c.periodo, c.ingresos, 'EBITDA', c.ebitda, (c.ebitda / c.ingresos * 100).toFixed(1) + '%', 'EBIT', c.ebit, 'BN', c.beneficio_neto, 'BPA', c.bpa);
for (const b of balance) console.log(b.periodo, 'caja', b.caja, 'exist', b.existencias, 'cli', b.clientes, 'prov', b.proveedores, 'antic', b.pasivos_contrato);
for (const t of tri) console.log(t.periodo, t.ingresos, t.crecimiento_pct, t.bpa);
