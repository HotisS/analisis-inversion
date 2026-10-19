// Notas A-E de Anker Innovations Technology Co., Ltd. (300866.SZ, corte 2026-10-19). China sin XBRL público: cuentas
// de los informes anuales CAS de CNINFO (2021-2025), del semestral 1S26 y de los trimestrales, más el folleto de la
// salida a Hong Kong (jun-2026) y los resultados semestrales NIIF publicados en HKEX (ago-2026). Las cifras de los
// estados (cuenta, balance y flujos) están en cuentas-cas-anual.json y cuentas-cas-periodos.json (transcripción en
// millones de la base F10 de Eastmoney, comprobada contra las cifras clave y los estados de los informes de CNINFO).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/anker-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = lee('bolsa.json');
const CA = lee('cuentas-cas-anual.json');
const CP = lee('cuentas-cas-periodos.json');
const comps = lee('comparables-yahoo.json');
const CN = 'http://static.cninfo.com.cn/finalpage';
const HK = 'https://www1.hkexnews.hk/listedco/listconews/sehk';
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, CAS: estados consolidados, notas, ventas por línea, región y canal, I+D, plantilla)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225090973.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024: estados de 2024, ampliación gratuita 3x10, dividendos)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2025-04-29', url: `${CN}/2025-04-29/1223379891.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023: estados de 2023, nueva segmentación por línea)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2024-04-25', url: `${CN}/2024-04-25/1219800919.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022: estados de 2022, pago del edificio de oficinas)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2023-04-19', url: `${CN}/2023-04-19/1216460035.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021: estados de 2021)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2022-04-12', url: `${CN}/2022-04-12/1212886831.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026: balance a 30-jun-2026, cuenta y flujos del 1S26, devolución de aranceles IEEPA, otros activos corrientes, accionistas)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225533054.PDF` },
  { id: 7, titulo: '2026年一季度报告 (informe del 1T26)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-30', url: `${CN}/2026-04-30/1225260221.PDF` },
  { id: 8, titulo: '2025年三季度报告 (informe del 3T25)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2025-10-30', url: `${CN}/2025-10-30/1224768089.PDF` },
  { id: 9, titulo: 'Interim Results Announcement for the six months ended June 30, 2026 (NIIF: coste de ventas compensado en parte por la devolución de aranceles IEEPA de años anteriores)', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-08-30', url: `${HK}/2026/0830/2026083000385.pdf` },
  { id: 10, titulo: 'Prospectus (Global Offering) de las acciones H: ventas por Amazon 2023-2025, aranceles pagados en 2025 (143,0 M USD), retiradas de baterías, pleitos y provisiones, canales', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 11, titulo: '2026年半年度利润分配方案 / 权益分派实施公告 (dividendo a cuenta de 0,80 CNY por acción, 470 M, pagado en septiembre de 2026)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-09-23', url: `${CN}/2026-09-23/1225579080.PDF` },
  { id: 12, titulo: '2025年年度权益分派实施公告 (dividendo final de 2025: 1,70 CNY por acción)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-05-20', url: `${CN}/2026-05-20/1225316090.PDF` },
  { id: 13, titulo: 'Estados financieros F10 de 300866 (cuenta, balance y flujos 2019-2026 en la base de Eastmoney; transcripción comprobada contra los informes)', editor: 'Eastmoney', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SZ300866' },
  { id: 14, titulo: 'Soochow Securities (东吴证券): punto de vista del 1S26 (devolución de aranceles ≈ 100 M USD; previsiones 2026-2028)', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609021828907754_1.pdf' },
  { id: 15, titulo: 'Sinolink Securities (国金证券): «26Q2业绩超预期» (margen bruto del 2T26 sin la devolución ≈ 47 %; devoluciones de impuestos +≈ 700 M en caja)', editor: 'Sinolink Securities', tipo: 'Analistas', fecha: '2026-08-31', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608311828813452_1.pdf' },
  { id: 16, titulo: '关于H股超额配股权部分行使的公告 (sobreasignación parcial: 3.443.300 acciones H y 337,86 M HKD netos adicionales)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-07-27', url: `${CN}/2026-07-27/1225442252.PDF` },
  { id: 17, titulo: '关于H股挂牌并上市交易的公告 (46.632.800 acciones H a 99,32 HKD; 4.523 M HKD netos; cotiza desde el 2-jul-2026)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-07-02', url: `${CN}/2026-07-02/1225406962.PDF` },
  { id: 18, titulo: '可转换公司债券2026年第三季度转股情况公告 (bono convertible 123257: 1.104,62 M pendientes a 30-sep-2026, precio de conversión 105,96 CNY)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-10-09', url: `${CN}/2026-10-09/1225599278.PDF` },
];

// EBIT = resultado de explotación + gastos financieros netos (incluidas diferencias de cambio) − ingresos de
// inversiones (asociadas, productos financieros) − cambios de valor razonable + resultado no operativo.
// Subvenciones (其他收益) y deterioros (sobre todo de existencias) dentro del EBIT.
const per = ['2021', '2022', '2023', '2024', '2025'];
// BPA y DPA de 2021-2022 divididos entre 1,3 por la ampliación gratuita de 3 por 10 de 2024 (2023 ya viene reexpresado).
const ajusteBonus = { 2021: 1.3, 2022: 1.3, 2023: 1, 2024: 1, 2025: 1 };
const dpa = { 2021: 0.80 / 1.3, 2022: 1.20 / 1.3, 2023: 2.00 / 1.3, 2024: 2.10, 2025: 2.40 };
const da = (c) => (c.dep || 0) + (c.rou_dep || 0) + (c.amort_int || 0) + (c.amort_lp || 0);
const ebitDe = (c) => c.op + c.finan - c.inversion - c.vr + ((c.no_op_ing || 0) - (c.no_op_gas || 0));
const cuenta = per.map((p) => {
  const c = CA[`${p}-12-31`];
  const ebit = ebitDe(c);
  const bpa = c.bpad / ajusteBonus[p];
  return {
    periodo: p, ingresos: c.ingresos, coste_ventas: r2(c.coste + c.tasas), gastos_generales: r2(c.ventas + c.admin + c.idi),
    ebitda: r2(ebit + da(c)), amortizaciones: r2(da(c)), ebit: r2(ebit), resultado_financiero: r2(c.bai - ebit), bai: c.bai,
    impuestos: c.imp, minoritarios: c.minor, beneficio_neto: c.atrib, gastos_financieros: c.intereses,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: r2(bpa), dpa: r2(dpa[p]), dpa_extraordinario: 0, acciones_diluidas: r1(c.atrib / bpa),
  };
});
const balanceH = per.map((p) => {
  const c = CA[`${p}-12-31`];
  return {
    periodo: p, activo_total: c.at, activo_corriente: c.ac, pasivo_corriente: c.pc, pasivo_total: c.pt,
    fondo_comercio: c.gw || 0, intangibles: c.intang, inmovilizado_material: r2(c.ppe + (c.cip || 0)), existencias: c.existencias,
    clientes: r2(c.clientes + (c.efectos || 0)), proveedores: r2(c.proveedores + c.ef_pag), activos_contrato: null, pasivos_contrato: null,
    caja: r2(c.caja + (c.tfa || 0)), deuda_financiera: r2((c.cp || 0) + (c.lp || 0) + (c.cp_nc || 0) + (c.bonos || 0)), arrendamientos: c.lease || 0,
    patrimonio_neto: c.pn, minoritarios: c.minoritarios_bal, reservas: c.reservas_nd,
  };
});
// Intereses pagados: CAS los clasifica en financiación junto con los dividendos (分配股利、利润或偿付利息支付的现金);
// se separan con el gasto por intereses de la cuenta. Arrendamientos: el principal va en «otros pagos de financiación»
// junto con otras partidas; se aproxima con la amortización de los derechos de uso.
const flujosH = per.map((p) => {
  const c = CA[`${p}-12-31`];
  return {
    periodo: p, flujo_operativo: c.cfo, capex: c.capex, pagos_arrendamientos: r2(c.rou_dep || 0), adquisiciones: 0, desinversiones: c.desinv || 0,
    dividendos: r2(c.div_int - c.intereses), recompras: 0, emision_acciones: c.emision || 0, intereses_en_financiacion: c.intereses,
  };
});
const segHist = (v) => ['2022', '2023', '2024', '2025'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null }));

// LTM jun-26 = 2025 + 1S26 − 1S25
const h126 = CP['2026-06-30'], h125 = CP['2025-06-30'];
const c25 = CA['2025-12-31'];
const ltmIng = c25.ingresos + h126.ingresos - h125.ingresos;
const ltmEbit = ebitDe(c25) + ebitDe(h126) - ebitDe(h125);
const ltmDa = da(c25) + da(h126) - da(h125);
const ltmNeto = c25.atrib + h126.atrib - h125.atrib;
const ltmFcf = (c25.cfo + h126.cfo - h125.cfo) - (c25.capex + h126.capex - h125.capex);
const DEVOLUCION_IEEPA = 700; // M CNY, estimación de Sinolink (≈ 700 M) y Soochow (≈ 100 M USD) [A14, A15]

// Trimestres (acumulados del año → trimestre)
const q = (fin, ini) => ({ ing: CP[fin].ingresos - (ini ? CP[ini].ingresos : 0), bpa: CP[fin].bpad - (ini ? CP[ini].bpad : 0) });
const trims = [
  ['3T24', q('2024-09-30', '2024-06-30'), null],
  ['4T24', q('2024-12-31', '2024-09-30'), null],
  ['1T25', q('2025-03-31'), q('2024-03-31')],
  ['2T25', q('2025-06-30', '2025-03-31'), q('2024-06-30', '2024-03-31')],
  ['3T25', q('2025-09-30', '2025-06-30'), q('2024-09-30', '2024-06-30')],
  ['4T25', q('2025-12-31', '2025-09-30'), q('2024-12-31', '2024-09-30')],
  ['1T26', q('2026-03-31'), q('2025-03-31')],
  ['2T26', q('2026-06-30', '2026-03-31'), q('2025-06-30', '2025-03-31')],
];
const vsCons = { '3T25': 'Inferior', '2T26': 'Superior' };

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r1(ltmIng), ebitda: r1(ltmEbit + ltmDa), ebit: r1(ltmEbit), beneficio_neto: r1(ltmNeto), bpa: r2(4.7174 + 3.127 - 2.1771), dpa: 2.50, dpa_extraordinario: 0, fcf: r1(ltmFcf), participadas_en_ebitda: null, no_recurrentes_en_ebitda: -DEVOLUCION_IEEPA },
    cambios_perimetro: [],
    comentario: 'Las ventas pasaron de 12.574 M CNY en 2021 a 30.514 M en 2025 (+24,8 % anual) y el beneficio atribuido de 982 M a 2.545 M (+26,9 %), todo orgánico [A1, A5]. El margen EBITDA (sin rendimientos de la tesorería, valor razonable ni diferencias de cambio) bajó del 7,2 % de 2021-2022 a un 9-10 % estable en 2023-2025: el margen bruto subió del 35,7 % al 45,1 %, pero los gastos de venta (22,4 %) y la I+D (9,5 %) se comieron casi toda la mejora [A1]. El 1S26 dio ventas de 16.605 M (+29,1 %) y un beneficio atribuido de 1.702 M (+45,9 %), pero con dos ayudas que no se repiten: la devolución de parte de los aranceles IEEPA pagados en 2025, que la empresa restó del coste de ventas sin dar la cifra (≈ 700 M según Sinolink y ≈ 100 M USD según Soochow), y 271 M de ganancias de valor razonable [A6, A9, A14, A15]. Sin la devolución, el margen bruto del 2T26 sería ≈ 47 % (55,1 % publicado) y el beneficio del semestre habría crecido poco: la I+D subió al 11,3 % de las ventas, el deterioro de existencias a 444 M y el tipo impositivo al 15,9 % por el Pilar Dos [A6, A14, A15]. Esa devolución va como no recurrente con signo negativo (ingreso) en el LTM.',
    ajustes: 'Cifras reportadas en normas chinas (CAS); la empresa publica también en NIIF en Hong Kong desde 2026 con diferencias de clasificación (margen bruto del 1S26 del 47,2 % en NIIF frente al 49,8 % en CAS) [A6, A9]. El EBIT y el EBITDA de este informe excluyen los gastos financieros netos (diferencias de cambio incluidas), los ingresos de inversiones (asociadas, productos bancarios) y los cambios de valor razonable de las participaciones cotizadas y fondos: van al resultado financiero. Las subvenciones (其他收益, 55 M en 2025) y los deterioros de existencias (365 M en 2025, 444 M en el 1S26) se quedan en el EBIT porque se repiten cada año en un fabricante de electrónica de consumo [A1, A6]. La devolución de aranceles IEEPA del 1S26 (≈ 700 M, estimación de los analistas: la empresa no la cuantifica) se trata como no recurrente en el LTM [A14, A15]. BPA y dividendos de 2021-2022 divididos entre 1,3 por la ampliación gratuita de 3 por 10 de 2024 [A2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trims.map(([p, a, b]) => ({ periodo: p, ingresos: r1(a.ing), crecimiento_pct: b ? r1((a.ing / b.ing - 1) * 100) : null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(a.bpa), vs_consenso: vsCons[p] ?? null })),
    ultima_presentacion: 'Anker no publica transcripciones; lo que dijo la dirección sale del semestral y de las notas de los analistas que asistieron a la presentación del 1S26 (finales de agosto) [A6, A14, A15]. Explicó el salto del margen bruto del 2T26 (55,1 %, +9,1 puntos) por la mezcla (almacenamiento y audio con IA) y por la devolución de parte de los aranceles IEEPA de años anteriores, sin dar la cifra [A6, A9]. Los analistas preguntaron por la I+D (11,8 % de las ventas en el 2T26, +2,5 puntos), por las pérdidas de cambio y por el tipo impositivo (16,0 %, +9,6 puntos, por el Pilar Dos) [A14]. La dirección insistió en el almacenamiento doméstico y de balcón (acuerdo de 3 GWh con el distribuidor australiano OSW en julio) y en los productos de audio con chip propio [A14]. Frente a la presentación del 1T26 (abril), cuando el discurso era de margen bruto récord por producto, el foco pasó a la sostenibilidad del margen sin la devolución: Sinolink lo estima en ≈ 47 % [A15]. Soochow avisó de una posible pérdida de valor razonable en el 3T [A14].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026-2027', importe: 964.2 }, { anio: '2028+', importe: 714.2 }, { anio: '2031 (convertible)', importe: 1104.6 }],
    liquidez: 'A 30-jun-2026: tesorería de 3.804 M, renta fija y fondos a valor razonable de 1.455 M, certificados de depósito de 1.214 M (en otros activos corrientes) y participaciones cotizadas de 826 M, frente a 1.678 M de deuda bancaria, 1.109 M del bono convertible y 280 M de arrendamientos [A6]. Después del cierre entraron ≈ 4.137 M CNY netos de la salida a Hong Kong (4.861 M HKD con la sobreasignación) y salieron 470 M de dividendo a cuenta en septiembre [A11, A16, A17].',
    rating: 'AA+ (rating local de China Chengxin para el bono convertible y el emisor; sin rating internacional)',
    coste_deuda_pct: 2.5,
    vida_media_anios: 2.0,
    otros_pasivos: 'Sin pensiones de prestación definida ni covenants relevantes publicados. Provisión por pleitos de 198,5 M a diciembre de 2025 (privacidad de las cámaras eufy en Illinois, patentes de Fundamental Innovation con un veredicto de 13,6 M USD en marzo de 2025; Powermat, cerrado con acuerdo) [A10]. Pasivos por devoluciones de ventas de 317 M a junio de 2026 [A9]. El bono convertible «安克转债» (1.104,6 M, vence el 15-jun-2031) tiene un precio de conversión de 105,96 CNY, por debajo de la cotización: se trata como convertido (10,4 M de acciones más) y no como deuda [A18]. Efectos comerciales a pagar de 651 M [A6].',
    comentario: 'El balance es de caja neta: unos 4.700 M a junio de 2026 sin contar el convertible y ≈ 8.400 M tras la caja de la salida a Hong Kong [A6, A16, A17]. El problema son las existencias: 6.734 M a junio de 2026 frente a 3.234 M a finales de 2024 (+108 %, con ventas +39 % en el mismo periodo), por el acopio ante los aranceles de EE. UU. y el almacenamiento doméstico; el deterioro de existencias subió a 365 M en 2025 y a 444 M en el 1S26 [A1, A6]. El circulante comercial (existencias y clientes menos proveedores y efectos) pasó del 9,4 % de las ventas en 2024 al 14,9 % en 2025 y al 16,8 % en el LTM de junio [A1, A6]. El fondo de comercio es cero.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión en caja es irregular: el flujo operativo fue del 145 % del beneficio en 2023 y del 130 % en 2024, pero solo del 19 % en 2025 (481 M) porque las existencias crecieron en 1.764 M y los anticipos y proveedores no lo compensaron [A1, A2]. En el 1S26 volvió a positivo (722,5 M frente a −1.132 M en el 1S25) con la ayuda de la devolución de aranceles [A9]. El capex es bajo (1-2 % de las ventas: 365 M en 2025), salvo 2022, cuando se pagó el edificio de oficinas nuevo (1.144 M), en uso desde 2025 [A1, A4]. Anker no fabrica: subcontrata la producción y su inversión es I+D, que va a gastos. Reparte en torno a la mitad del beneficio (2,40 CNY por acción de 2025, el 51 %) y no recompra [A1, A12]. Estimación propia: el mantenimiento ronda la amortización (0,6-0,8 % de las ventas).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG Huazhen (毕马威华振会计师事务所)',
    anios_auditor: 6,
    opinion: 'Favorable (sin salvedades) en 2021-2025',
    comentario: 'Auditor de las cuatro grandes desde 2020, con rotación de socios (dos años y un año los actuales) y 3,4 M de honorarios en 2025 [A1]. La I+D se lleva a gastos entera (2.893 M en 2025, el 9,5 % de las ventas) [A1]. El riesgo contable está en las existencias (deterioro de 365 M en 2025 y 444 M en el 1S26, que la empresa no detalla por causa: retiradas de baterías, obsolescencia o acopio ante aranceles) y en las devoluciones de ventas (317 M de pasivo) [A1, A9]. La devolución de aranceles de 2026 se restó del coste de ventas sin cuantificarla y entra en el beneficio «sin no recurrentes» (扣非) del 1S26, lo que hace parecer recurrente una ayuda única [A6, A14]. Los cambios de valor razonable de participaciones cotizadas (271 M en el 1S26) mueven el beneficio publicado, pero la empresa los marca como no recurrentes [A6]. Tipo efectivo del 10,4 % en 2025 y del 15,9 % en el 1S26 por el Pilar Dos [A1, A6].',
    senales: [
      { senal: 'Existencias que crecen más que las ventas', nivel: 'Alta', comentario: 'Existencias +108 % entre dic-2024 y jun-2026 con ventas +39 %; deterioro de 444 M en el 1S26 [A6].' },
      { senal: 'Ayuda única dentro del margen bruto sin cuantificar', nivel: 'Media', comentario: 'Devolución de aranceles IEEPA restada del coste de ventas del 1S26; los analistas la estiman en ≈ 700 M [A6, A14, A15].' },
      { senal: 'Conversión de caja de 2025', nivel: 'Media', comentario: 'Flujo operativo del 19 % del beneficio en 2025 (481 M) [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo en efectivo dos veces al año: 0,70 CNY a cuenta y 1,70 CNY final de 2025 (2,40 CNY, el 51 % del beneficio), y 0,80 CNY a cuenta del 1S26 (470 M, el 28 % del beneficio del semestre), pagado en septiembre de 2026 [A1, A11, A12]. No recompra acciones. En 2025 emitió un bono convertible de 1.105 M y en julio de 2026 salió a bolsa en Hong Kong con 50,1 M de acciones H nuevas a 99,32 HKD (≈ 4.137 M CNY netos), una ampliación del 9,3 % que no necesitaba para su caja: la destina a I+D, marca y capacidad fuera de China [A10, A16, A17]. Reparte acciones restringidas al equipo cada año (1,7 M de acciones en agosto de 2026) [A6].',
    adquisiciones: [],
    comentario: 'Asignación aceptable pero diluyente: el crecimiento es orgánico, sin compras, con un ROIC alto, y la mitad del beneficio vuelve al accionista en dividendos [A1]. En contra: dos emisiones en un año con 4.700 M de caja neta (convertible en 2025 y acciones H en 2026), que diluyen un 11 % entre las H y el convertible, y unas existencias que absorbieron casi toda la caja de 2025 [A6, A17, A18]. Las inversiones en participaciones (826 M cotizadas y 666 M no cotizadas) son una cartera de capital riesgo propia sin estrategia publicada [A6].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Carga y almacenamiento (充电储能类)', descripcion: 'Baterías portátiles, cargadores, cables y bases de carga (Anker), almacenamiento doméstico y de balcón, estaciones portátiles (Anker SOLIX)', tipo_resultado: null, historico: segHist([6876.3, 8603.6, 12667.0, 15401.8]) },
      { nombre: 'Smart Innovation (智能创新类)', descripcion: 'Hogar inteligente eufy: cámaras de seguridad, robots aspiradores, cortacésped, sacaleches; impresoras UV eufyMake', tipo_resultado: null, historico: segHist([3825.1, 4541.3, 6336.5, 8271.3]) },
      { nombre: 'Audio y vídeo (智能影音类)', descripcion: 'Auriculares y altavoces Soundcore, proyectores Nebula, grabadoras con IA', tipo_resultado: null, historico: segHist([3388.3, 4285.3, 5692.4, 6833.5]) },
      { nombre: 'Otros', descripcion: 'Accesorios sin línea asignada', tipo_resultado: null, historico: segHist([160.9, 77.1, 14.2, 7.9]) },
    ],
    geografias: [
      { nombre: 'Norteamérica', peso_pct: 46.31 },
      { nombre: 'Europa', peso_pct: 26.71 },
      { nombre: 'China', peso_pct: 3.38 },
      { nombre: 'Resto (Japón, Oriente Medio, Australia, otros)', peso_pct: 23.59 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso de Amazon en las ventas', valor_anterior: '54,3 % (2024)', valor_actual: '52,3 % (2025)', variacion: '−2,0 pp', comentario: '57,1 % en 2023; 46,4 % en el 1S26 (7.699 M, +19,8 %) [A10, A6]' },
      { kpi: 'Web propia (M CNY)', valor_anterior: '2.545 (2024)', valor_actual: '3.135 (2025)', variacion: '+23 %', comentario: '10,3 % de las ventas; 1.837 M en el 1S26 (+39,2 %) [A1, A6]' },
      { kpi: 'Margen bruto del grupo (CAS)', valor_anterior: '43,7 % (2024)', valor_actual: '45,1 % (2025)', variacion: '+1,4 pp', comentario: '49,8 % en el 1S26 con la devolución de aranceles; ≈ 47 % sin ella en el 2T26 según Sinolink [A1, A6, A15]' },
      { kpi: 'Gasto en I+D (M CNY)', valor_anterior: '2.108 (2024)', valor_actual: '2.893 (2025)', variacion: '+37,2 %', comentario: '9,5 % de las ventas; 11,3 % en el 1S26. 3.549 personas de I+D, el 56,3 % de la plantilla [A1, A6]' },
      { kpi: 'Existencias (M CNY)', valor_anterior: '3.234 (dic-2024)', valor_actual: '4.997 (dic-2025)', variacion: '+54,5 %', comentario: '6.734 M a 30-jun-2026 [A1, A6]' },
      { kpi: 'Aranceles pagados por exportar a EE. UU.', valor_anterior: '< 1,5 % de las ventas (2023-2024)', valor_actual: '3,4 % (2025, 143,0 M USD)', variacion: '+≈ 2 pp', comentario: 'Arancel máximo aplicado hoy del 50 %; vende en EE. UU. con derechos pagados por la empresa [A10]' },
    ],
    clientes: 'Anker vende sobre todo al consumidor final por plataformas: Amazon fue el 52,3 % de las ventas de 2025 (15.955 M), con un contrato estándar de vendedor que Amazon puede rescindir con 30 días de aviso [A10]. Otras plataformas (Walmart, TikTok Shop, Rakuten, JD) el 7,7 %, la web propia el 10,3 % y la venta física (Walmart, Best Buy, Costco, Target, MediaMarkt y distribuidores) el 29,8 % [A1, A10]. Los cinco primeros clientes directos suman el 8,6 % y el primero el 1,9 %: Amazon es un canal, no un cliente [A1]. Poder de precios demostrado: el margen bruto subió 9 puntos en cuatro años y aguantó los aranceles de 2025 (−0,5 puntos en carga y almacenamiento), pero Anker paga los aranceles en EE. UU. (venta con derechos pagados) [A1, A10].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS (sin amortización trimestral); 2) semestral CAS y NIIF (amortización solo semestral); 3) derivarlo prorrateando: descartado por las diferencias de cambio y el valor razonable trimestrales', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'importe exacto de la devolución de aranceles IEEPA', tipo: 'Complemento', intentos: '1) Semestral CAS (solo dice que se restó del coste de ventas); 2) resultados NIIF de HKEX (lo mismo, sin cifra); 3) notas de analistas (estimaciones de ≈ 100 M USD y ≈ 700 M CNY)', decision: 'Estimado: 700 M, con la cifra de los analistas' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Prospectus de las acciones H, «Industry Overview» (Frost & Sullivan): tamaño de los nueve mercados en los que opera Anker en 2025 y TCAC 2025-2030; cuotas en carga móvil, almacenamiento portátil y de balcón, auriculares', editor: 'Anker Innovations / Frost & Sullivan (HKEXnews)', tipo: 'Sectorial', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 2, titulo: '2025年年度报告: historia, productos, marcas, plantilla', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225090973.PDF` },
  { id: 3, titulo: 'Fichas de Yahoo Finance de Ugreen, Ecovacs, Roborock, Xiaomi, Edifier, Logitech, Garmin, SharkNinja (ventas y margen del último ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Prospectus de las acciones H, «Regulatory Overview» y «Risk Factors»: aranceles IEEPA anulados por el Tribunal Supremo de EE. UU. (20-feb-2026), arancel de la sección 122, exclusiones de la sección 301 hasta el 10-nov-2026', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 5, titulo: 'Prospectus de las acciones H, «Business»: retiradas voluntarias de baterías de junio y octubre de 2025 (< 2,9 millones de unidades) y pleitos', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 6, titulo: '2025年度环境、社会及治理（ESG）报告 (resumen en el informe anual 2025: emisiones, cadena de suministro)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225090973.PDF` },
  { id: 7, titulo: 'Kaiyuan Securities (开源证券): nota del 1S26 (almacenamiento de balcón en Europa, distribuidor australiano)', editor: 'Kaiyuan Securities', tipo: 'Analistas', fecha: '2026-09-01', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609011828867218_1.pdf' },
];
const compV = Object.fromEntries(comps.empresas.map((e) => [e.ticker, e]));
const ventasDe = (t) => compV[t]?._ventas_ltm_m ?? null;
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Anker nació en 2011 cuando Yang Meng (阳萌), ingeniero de Google en EE. UU., volvió a China y empezó a vender en Amazon baterías de repuesto para portátiles; la sociedad operativa (海翼) se fundó en Changsha y se transformó en sociedad anónima en 2016 [B2]. Con Zhao Dongping (ex-Google China) y Zhang Shanfeng construyó una marca de carga que hoy es la primera del mundo en carga móvil (4,8 % del mercado en 2025) [B1, B2]. Salió a bolsa en el ChiNext de Shenzhen en agosto de 2020 y en Hong Kong en julio de 2026 [B2, B1]. Pasó de un producto a tres líneas (carga y almacenamiento, hogar inteligente eufy, audio Soundcore) y de Amazon a todos los canales [B2].',
    hitos: [
      { anio: '2011', hito: 'Yang Meng deja Google y funda Anker; primeras ventas en Amazon [B2]' },
      { anio: '2016', hito: 'Transformación en sociedad anónima (Anker Innovations) [B2]' },
      { anio: '2020', hito: 'Salida a bolsa en el ChiNext de Shenzhen (300866) [B2]' },
      { anio: '2023', hito: 'Lanzamiento de Anker SOLIX: almacenamiento doméstico y de balcón [B2]' },
      { anio: '2025', hito: 'Ventas de 30.514 M (+23,5 %); retiradas voluntarias de < 2,9 millones de baterías portátiles por fugas térmicas de las celdas de un proveedor [B2, B5]' },
      { anio: '2026', hito: 'Salida a bolsa en Hong Kong (00668) el 2-jul a 99,32 HKD [B1]' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Electrónica de consumo de categorías medianas y pequeñas («aguas poco profundas»): los nueve mercados mundiales en los que vende Anker según Frost & Sullivan (cargadores y accesorios, baterías portátiles, almacenamiento de consumo, limpieza inteligente, seguridad doméstica, altavoces, proyectores, auriculares inalámbricos e impresoras 3D de consumo) [B1]. Se usa la suma de esos nueve y no el total de dispositivos inteligentes (9,3 billones de CNY), que incluye teléfonos, ordenadores y televisores donde Anker no compite.',
    tamano: '1.375.900 M CNY en 2025 (los nueve mercados de Anker), dentro de 2.739.100 M de mercados medianos y pequeños de dispositivos inteligentes [B1]',
    unidad_serie: 'miles de millones de CNY (los nueve mercados de Anker, Frost & Sullivan)',
    serie: [
      { anio: '2025', tamano: 1376 }, { anio: '2026e', tamano: 1549 }, { anio: '2027e', tamano: 1745 }, { anio: '2028e', tamano: 1965 }, { anio: '2029e', tamano: 2213 }, { anio: '2030e', tamano: 2496 },
    ],
    tcac_historico_pct: 12.1,
    tcac_previsto_pct: 12.6,
    cr5_pct: 15.2,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Almacenamiento de consumo (balcón, doméstico, portátil)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado de 229.000 M CNY en 2025 con una TCAC prevista del 19,6 % hasta 2030 [B1]' },
      { driver: 'Aranceles de EE. UU. sobre productos chinos', efecto: '−', horizonte: 'Cíclico', evidencia: 'Aranceles del 3,4 % de las ventas de Anker en 2025 (< 1,5 % antes); IEEPA anulado el 20-feb-2026, sección 122 y 301 siguen [B4]' },
      { driver: 'Más dispositivos por persona y carga rápida (USB-C, GaN)', efecto: '+', horizonte: 'Estructural', evidencia: 'Carga móvil +12,1 % anual en 2020-2025 y +9,7 % previsto [B1]' },
      { driver: 'IA en el dispositivo (audio, cámaras, robots)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Anker lanza auriculares con chip propio y grabadoras con IA; los gigantes (Apple, Xiaomi, Samsung) integran más funciones [B2, B7]' },
      { driver: 'Normas de seguridad de baterías', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Nueva norma china de baterías portátiles (2026) y retiradas en la industria: suben las barreras y los costes [B5]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Miles de marcas chinas en Amazon (Baseus, Ugreen, EcoFlow, Jackery), los cinco primeros de carga móvil solo suman el 15,2 % [B1]' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'El consumidor compara precios en Amazon con un clic; Amazon controla la visibilidad y cobra comisiones y logística [B1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación subcontratada en muchos talleres; dependencia de celdas de batería (el fallo de un proveedor causó la retirada de 2025) [B5]' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'Barreras bajas para vender en Amazon; las altas son la marca, las certificaciones y la escala [B1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Cargadores y baterías integrados por los fabricantes de móviles (Apple, Samsung) y carga inalámbrica [B1]' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Gasto discrecional en electrónica que crece al 10-12 % anual en las categorías de Anker, sin una caída fuerte en 2020-2025 [B1]. El ciclo propio es el de producto: un éxito (cargadores GaN, almacenamiento de balcón) dura dos o tres años. El riesgo cíclico está en una recesión en EE. UU. y Europa (73 % de las ventas) y en las existencias del canal [B2].' },
    regulacion: 'Lo que más pesa son los aranceles de EE. UU.: el Tribunal Supremo anuló el 20-feb-2026 los aranceles IEEPA (recíproco y «fentanilo»), y el Gobierno empezó a devolverlos; en su lugar entró un arancel global del 10 % de la sección 122 por 150 días (hasta el 24-jul-2026), y siguen los de la sección 301 con exclusiones que vencen el 10-nov-2026 [B4]. Anker vende en EE. UU. con los derechos pagados, así que el arancel es coste suyo [B4]. En seguridad de producto, la CPSC en EE. UU., la UE (reglamento de baterías de 2023) y China (nueva norma nacional de baterías portátiles de 2026) endurecen las exigencias; Anker fue la primera marca en certificar la norma china [B5, B2].',
    tendencias: 'Tres cambios: el almacenamiento de consumo (balcón en Europa, doméstico en Australia), que crece al 19,6 % y ya tira de la línea de carga; la IA en el dispositivo (auriculares con chip propio, grabadoras), donde Anker invierte el 11 % de las ventas en I+D; y la venta fuera de Amazon (web propia +39 % y otras plataformas +96 % en el 1S26) [B1, B2, B7]. Gana con las dos primeras si su I+D se traduce en productos; pierde si los fabricantes de teléfonos integran la función.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.2,
    posicion: '1.ª del mundo en carga móvil (4,8 %, por delante de Apple con el 4,6 %), 3.ª en almacenamiento portátil (10,2 %), 1.ª en almacenamiento de balcón (14,6 %) y 6.ª en auriculares inalámbricos (1,7 %) según Frost & Sullivan; ≈ 2,2 % de los nueve mercados en los que vende (30.514 M sobre 1.375.900 M en 2025, estimación propia) [B1]',
    competidores: [
      { nombre: 'Ugreen Group', pais: 'China', ticker: '301606.SZ', ingresos: ventasDe('301606.SZ'), cuota_pct: 1.5, margen_ebit_pct: null, comentario: 'Rival directo en cargadores y accesorios, 5.º en carga móvil; más peso en China [B1, B3]' },
      { nombre: 'Xiaomi', pais: 'China', ticker: '1810.HK', ingresos: ventasDe('1810.HK'), cuota_pct: null, margen_ebit_pct: null, comentario: 'Ecosistema propio con baterías, robots y auriculares baratos [B3]' },
      { nombre: 'Ecovacs Robotics', pais: 'China', ticker: '603486.SS', ingresos: ventasDe('603486.SS'), cuota_pct: null, margen_ebit_pct: null, comentario: 'Robots aspiradores y cortacésped, rival de eufy [B3]' },
      { nombre: 'Roborock', pais: 'China', ticker: '688169.SS', ingresos: ventasDe('688169.SS'), cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en robots aspiradores de gama alta [B3]' },
      { nombre: 'Logitech', pais: 'Suiza', ticker: 'LOGI', ingresos: ventasDe('LOGI'), cuota_pct: null, margen_ebit_pct: null, comentario: 'Periféricos y audio; referencia de marca de accesorios con márgenes altos [B3]' },
      { nombre: 'SharkNinja', pais: 'EE. UU.', ticker: 'SN', ingresos: ventasDe('SN'), cuota_pct: null, margen_ebit_pct: null, comentario: 'Pequeño electrodoméstico y limpieza; marca y distribución física en EE. UU. [B3]' },
      { nombre: 'EcoFlow y Jackery (no cotizan)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rivales en almacenamiento portátil y de balcón; los cinco primeros suman el 66 % [B1]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: producto físico sin plataforma [B2]' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos: el consumidor cambia de cargador o auricular sin coste; algo mayores en almacenamiento y cámaras con aplicación [B2]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca n.º 1 de carga en Amazon, margen bruto del 45 % frente al 35-40 % de los rivales chinos; I+D del 9,5-11 % de las ventas [B1, B2]' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala en compras y logística; pero fabricación subcontratada y sin activos propios [B2]' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercados fragmentados (los cinco primeros de carga móvil, 15,2 %) [B1]' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, la política comercial de EE. UU.: Norteamérica es el 46 % de las ventas y Anker paga los aranceles; si las exclusiones de la sección 301 vencen el 10-nov-2026 o llega un arancel nuevo, el margen bruto puede perder 2-4 puntos como en 2025 [B4]. Probabilidad media. La segunda, Amazon: la mitad de las ventas depende de un contrato estándar que se rescinde con 30 días de aviso y de un algoritmo que cambia; Amazon también vende marcas propias [B1]. Probabilidad baja de ruptura, alta de presión en comisiones. La tercera, la competencia china en almacenamiento (EcoFlow, Jackery, Bluetti) y en carga (Ugreen, Baseus), que imita rápido [B1].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'MSCI ESG', calificacion: 'Sin dato publicado verificable', fecha: '2026' }],
    materialidad: 'Lo más material es la seguridad del producto: baterías de litio que pueden incendiarse. En junio y octubre de 2025 retiró voluntariamente menos de 2,9 millones de baterías portátiles (modelos A1257, A1680, A1681, A1689, A1642, A1647, A1652 y A1263) por fugas térmicas en celdas de un proveedor, rompió con ese proveedor y estima una pérdida no superior al 1 % de las ventas de 2025 [B5]. Le siguen la cadena de suministro subcontratada en China y el Sudeste Asiático (condiciones laborales) y la privacidad de las cámaras eufy (demanda colectiva en Illinois desde 2022) [B5, B6].',
    controversias: 'Retiradas de baterías de 2025 (≈ 2,9 millones de unidades, pérdida esperada ≤ 1 % de las ventas) [B5]. Demanda colectiva por la privacidad de las cámaras eufy (Sloan, Illinois, en fase de prueba, más de 5 M USD reclamados) y pleitos de patentes (Fundamental Innovation: 13,6 M USD de veredicto en marzo de 2025; Powermat: cerrado con acuerdo); provisión de 198,5 M a diciembre de 2025 [B5]. Sin sanciones de reguladores publicadas en el folleto.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Anker Innovations (安克创新), con sede en Changsha (Hunan) y oficinas en Shenzhen, diseña y vende electrónica de consumo con marcas propias: cargadores, baterías portátiles y almacenamiento doméstico (Anker y Anker SOLIX), cámaras de seguridad, robots aspiradores y cortacésped, sacaleches e impresoras UV (eufy y eufyMake), auriculares y altavoces (Soundcore) y proyectores (Nebula) [B2]. No fabrica: subcontrata la producción y se queda con el diseño, la I+D, la marca y la venta [B2]. Vende en más de 140 países, el 97 % fuera de China, sobre todo por Amazon, su web y grandes cadenas [B2]. 6.304 empleados, el 56 % en I+D [B2].',
    como_gana_dinero: 'Vende productos a precio de marca (margen bruto del 45 %) sobre todo a través de Amazon, que se queda con comisión, logística y publicidad: por eso los gastos de venta son el 22 % de las ventas [B2]. Nada es recurrente: cada año tiene que acertar con productos nuevos; la I+D (9,5-11 % de las ventas) es la inversión que decide el crecimiento. El margen depende de la mezcla (almacenamiento y audio con IA dan más), de los aranceles de EE. UU. que paga Anker y del dólar (vende en dólares y euros y compra en dólares y yuanes) [B2, B4]. Estacionalidad: el 4T trae el 30 % de las ventas (Black Friday, Navidad) y el Prime Day mueve ventas entre el 2T y el 3T.',
    confianza: 'Alta',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Fichas de Yahoo (solo margen EBITDA, en los comparables de la nota D); 2) informes anuales de los rivales (definiciones distintas); 3) los rivales privados (EcoFlow, Jackery, Baseus) no publican', decision: 'Omitido: el margen EBITDA de los cotizados va en los comparables' },
    { seccion: 'esg', campo: 'calificación ESG de una agencia', tipo: 'Complemento', intentos: '1) Informe ESG 2025 (no cita la calificación de MSCI o Sustainalytics); 2) web de MSCI ESG Ratings (requiere sesión); 3) prensa (sin cifra verificable)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告: consejo, directivos, remuneraciones, accionistas, auditor', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225090973.PDF` },
  { id: 2, titulo: '2025年年度股东会决议公告 (votaciones de la junta de 2025, mayo de 2026)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-05-12', url: `${CN}/2026-05-12/1225302130.PDF` },
  { id: 3, titulo: '关于控股股东、实际控制人持股比例被动稀释触及1%整数倍的提示性公告 (Yang Meng y He Li: del 43,27 % al 42,89 %)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-08-06', url: `${CN}/2026-08-06/1225462252.PDF` },
  { id: 4, titulo: '2026年半年度报告: accionistas a 30-jun-2026', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225533054.PDF` },
  { id: 5, titulo: 'Búsqueda de anuncios de ventas de accionistas y directivos (减持) en CNINFO, oct-2025 a oct-2026: ninguno', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.cninfo.com.cn/new/disclosure/stock?stockCode=300866&orgId=gfbj0839473' },
  { id: 6, titulo: 'Prospectus de las acciones H: consejo, directivos y su trayectoria; operaciones vinculadas', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 7, titulo: '2026年第三次临时股东会决议公告 (junta extraordinaria de septiembre de 2026)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-09-17', url: `${CN}/2026-09-17/1225570658.PDF` },
  { id: 8, titulo: '关于收购控股子公司少数股东股权暨关联交易的公告 (compra de minoritarios de una filial, operación vinculada)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2025-10-30', url: `${CN}/2025-10-30/1224768084.PDF` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Yang Meng (阳萌)', cargo: 'Presidente (fundador)', desde: '2011', participacion_pct: 39.47, trayectoria: 'Ingeniero de Google en EE. UU. (2006-2011); fundó Anker en 2011 y la preside desde 2016. Con He Li controla el 42,89 % tras la salida a Hong Kong. Cobró 76.400 CNY en 2025: su incentivo es su participación [C1, C3].' },
      { nombre: 'Zhao Dongping (赵东平)', cargo: 'Consejero y director general', desde: '2012', participacion_pct: 10.74, trayectoria: 'Dell China y director de ventas en línea de Google China; presidente de la sociedad operativa desde 2012 y director general desde 2016. Bajo su mando las ventas pasaron de 9.353 M (2020) a 30.514 M (2025) [C1].' },
      { nombre: 'Zhu Fanghao (祝芳浩)', cargo: 'Consejero; presidente de Smart Innovation (eufy)', desde: '2016', participacion_pct: 0.27, trayectoria: 'Fue presidente de Coolpad Internet y de 360 Mobile; dirige eufy, que pasó de 3.825 M en 2022 a 8.271 M en 2025 [C1].' },
      { nombre: 'Xiong Kang (熊康)', cargo: 'Consejero; director de la división de carga', desde: '2022', participacion_pct: 0.07, trayectoria: 'Vicepresidente de Huawei para Europa occidental; desde 2022 dirige carga y almacenamiento (15.402 M de ventas en 2025) [C1].' },
      { nombre: 'Yang Fan (杨帆)', cargo: 'Director financiero', desde: '2021', participacion_pct: 0.01, trayectoria: 'Auditor y consultor de fusiones en PwC; director financiero desde febrero de 2021 [C1].' },
    ],
    historial_guidance: [],
    comentario: 'Equipo fundador estable desde 2011-2012, con experiencia de Google, Huawei y Dell, y sin cambios en los puestos ejecutivos clave en 24 meses: solo relevos por fin de mandato (secretario del consejo en 2025, un independiente) [C1]. Los fundadores cobran un sueldo simbólico (≈ 76.000 CNY) y no han vendido ni una acción en 12 meses; la dilución del control (del 47 % al 42,9 % con He Li) es pasiva, por la salida a Hong Kong y el convertible [C3, C5]. La empresa no publica objetivos de ventas ni de beneficio, así que no hay historial que comprobar [C1]. Riesgo de persona clave: Yang Meng marca la estrategia de producto.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Yang Meng', cargo: 'Presidente', tipo: 'Ejecutivo', desde: '2016', comisiones: 'Estrategia' },
      { nombre: 'Zhao Dongping', cargo: 'Consejero y director general', tipo: 'Ejecutivo', desde: '2016', comisiones: null },
      { nombre: 'Zhang Shanfeng', cargo: 'Consejero (representante de los trabajadores; cofundador)', tipo: 'Ejecutivo', desde: '2016', comisiones: null },
      { nombre: 'Zhu Fanghao', cargo: 'Consejero (presidente de eufy)', tipo: 'Ejecutivo', desde: '2021', comisiones: null },
      { nombre: 'Xiong Kang', cargo: 'Consejero (director de carga)', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Lian Meng', cargo: 'Consejero (socio de capital riesgo, 天津宸辉)', tipo: 'Dominical', desde: '2017', comisiones: null },
      { nombre: 'Li Congliang', cargo: 'Consejero independiente (ex-McKinsey, General Atlantic, Hillhouse)', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Yi Xuan', cargo: 'Consejera independiente (profesora de contabilidad, Universidad Central del Sur)', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Han Xi', cargo: 'Consejero independiente (vicepresidente de asuntos públicos de Alibaba)', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.99, voto_remuneracion_contra_pct: 0.0015, voto_remuneracion_contra_libre_pct: 0.004, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 0.0758, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'El director general (Zhao Dongping) cobró 75.800 CNY en 2025 y el presidente 76.400: los fundadores no tienen sueldo de mercado [C1]. Los consejeros que dirigen negocio sí: Xiong Kang 3,28 M y Zhu Fanghao 2,44 M; el conjunto del consejo y la alta dirección, 7,95 M [C1]. El variable depende de una evaluación interna de resultados sin indicadores publicados; el largo plazo son acciones restringidas (planes de 2022-2025) con objetivos de crecimiento de ventas o beneficio, no de ROIC [C1]. La junta de 2025 aprobó la política de remuneración con el 99,99 % y un 0,0015 % en contra [C2].',
    accionistas: [
      { nombre: 'Yang Meng (presidente, fundador)', pct: 39.47, tipo: 'Fundador, accionista de control', variacion: '43,39 % de las A antes de la salida a Hong Kong; sin ventas' },
      { nombre: 'Zhao Dongping (director general)', pct: 10.74, tipo: 'Cofundador', variacion: 'Sin ventas' },
      { nombre: 'Hong Kong Securities Clearing (Stock Connect)', pct: 8.11, tipo: 'Nominatario de inversores extranjeros', variacion: '47,8 M acciones A a jun-2026 (8,92 % de las A)' },
      { nombre: 'Wu Wenlong (antiguo director técnico)', pct: 3.77, tipo: 'Particular', variacion: 'Estable' },
      { nombre: 'He Li (concertada con Yang Meng)', pct: 3.31, tipo: 'Accionista de control (en concierto)', variacion: 'Sin cambios' },
      { nombre: 'Fondo de la seguridad social 114 y Gates Foundation', pct: 3.40, tipo: 'Institucionales', variacion: '2,76 % y 0,99 % de las A a jun-2026' },
    ],
    insiders: [],
    control_y_defensas: 'Yang Meng y He Li controlan el 42,89 % del capital total tras la salida a Hong Kong, y con Zhao Dongping los fundadores superan el 53 % [C3, C1]. Una acción, un voto; las H y las A votan juntas. Sin uso de fondos por el accionista de control. Operaciones vinculadas pequeñas: la compra de los minoritarios de una filial en octubre de 2025 [C8]. Las votaciones de la junta de 2025 con más votos en contra fueron los avales a filiales (90,6 % a favor; 58,5 % entre los minoritarios) y la inversión de la tesorería en productos financieros (94,0 %) [C2].',
    alertas: [
      'Accionista de control con el 42,9 % y presidente ejecutivo; sin consejero coordinador [C1, C3].',
      'Solo tres independientes en un consejo de nueve, con seis ejecutivos o dominicales [C1].',
      'Votación débil de los minoritarios en los avales a filiales (58,5 % a favor) [C2].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'historial_guidance', tipo: 'Complemento', intentos: '1) Informes anuales 2021-2025 (no publican objetivos anuales de ventas ni beneficio); 2) folleto de Hong Kong (sin previsiones); 3) presentaciones de resultados (sin cifras de objetivo)', decision: 'Omitido: la empresa no da objetivos' },
    { seccion: 'gobierno', campo: 'desglose fijo/variable de la remuneración y voto a la cúpula', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo total); 2) acta de la junta de 2025 (sin elección de consejeros: el mandato vence en 2028); 3) folleto de Hong Kong (total por persona)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 300866.SZ, 510300.SS (CSI 300) y 159732.SZ (ETF de electrónica de consumo), hasta el 16-oct-2026 (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/300866.SZ/history' },
  { id: 2, titulo: 'Cotización de 300866 (cierre del 19-oct-2026: 110,40 CNY, dato de las 15:35 de Pekín) y de 00668 (105,90 HKD, cierre del 16-oct)', editor: 'Sina Finance (hq.sinajs.cn)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://hq.sinajs.cn/list=sz300866,hk00668' },
  { id: 3, titulo: 'Listado de informes de analistas de 300866 con BPA previsto 2026-2028 (oct-2025 a sep-2026)', editor: 'Eastmoney (东方财富研报中心)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://data.eastmoney.com/report/stock.jshtml?code=300866' },
  { id: 4, titulo: 'Soochow Securities: punto de vista del 1S26 (ventas, EBIT y EBITDA 2026-2028e)', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609021828907754_1.pdf' },
  { id: 5, titulo: 'Guosen, Kaiyuan y Sinolink: notas del 1S26 (ventas, EBIT, EBITDA y BPA 2026-2028e)', editor: 'Guosen / Kaiyuan / Sinolink', tipo: 'Analistas', fecha: '2026-09-02', url: 'https://pdf.dfcfw.com/pdf/H3_AP202609021828906670_1.pdf' },
  { id: 6, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 19-oct-2026: 10 años 1,6497 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'Fichas y estimaciones (earningsTrend) de Anker y los comparables, 19-oct-2026 (9 analistas, objetivo medio 150,79 CNY)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/300866.SZ/analysis' },
  { id: 9, titulo: 'List of SZSE Securities / China Connect Securities (eligible for both buy and sell), actualizado el 16-oct-2026: 300866, n.º 1750', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SZSE_Securities.xls' },
  { id: 10, titulo: 'Stock Connect FAQ: la negociación de acciones del ChiNext por el Northbound se limita a inversores profesionales institucionales', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-07-06', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Getting-Started/Information-Booklet-and-FAQ/FAQ/FAQ_En.pdf' },
  { id: 11, titulo: 'H股公告-董事会会议召开日期 (consejo del 29-oct-2026 para aprobar los resultados del 3T26)', editor: 'Anker Innovations (CNINFO / HKEX)', tipo: 'Primaria', fecha: '2026-10-19', url: `${CN}/2026-10-19/1225610056.PDF` },
  { id: 12, titulo: '2025年年度报告 (resultados de 2025, publicados el 9-abr-2026)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-04-10', url: `${CN}/2026-04-10/1225090973.PDF` },
  { id: 13, titulo: '关于H股挂牌并上市交易的公告 (estreno de las H el 2-jul-2026 a 99,32 HKD)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-07-02', url: `${CN}/2026-07-02/1225406962.PDF` },
  { id: 14, titulo: '10月8日全球大跌：AI行情还有没有下一段？ (venta de hardware de IA tras un informe de Morgan Stanley; ChiNext −3,15 % el 8-oct)', editor: '网易 (163.com) / 躺平指数', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://www.163.com/dy/article/L8PRFIKP0552UNKW.html' },
  { id: 15, titulo: '2025年三季度报告 (3T25, publicado el 29-oct-2025)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2025-10-30', url: `${CN}/2025-10-30/1224768089.PDF` },
  { id: 16, titulo: '2026年半年度报告 (balance a 30-jun-2026 para el puente; acciones)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-08-31', url: `${CN}/2026-08-31/1225533054.PDF` },
  { id: 17, titulo: 'H股月报表 (acciones a 30-sep-2026: 539.356.046 A y 50.076.100 H)', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-10-07', url: `${HK}/2026/1007/2026100700758.pdf` },
  { id: 18, titulo: 'Bono convertible 123257: conversión del 3T26 (1.104,62 M pendientes; precio de conversión 105,96 CNY)', editor: 'Anker Innovations (CNINFO)', tipo: 'Primaria', fecha: '2026-10-09', url: `${CN}/2026-10-09/1225599278.PDF` },
  { id: 19, titulo: 'Prospectus de las acciones H: aranceles de EE. UU., Amazon, retiradas de baterías, inversores ancla (23.271.700 acciones H con bloqueo de seis meses desde la salida)', editor: 'Anker Innovations (HKEXnews)', tipo: 'Primaria', fecha: '2026-06-23', url: `${HK}/2026/0623/2026062300037.pdf` },
  { id: 20, titulo: 'Históricos diarios de 00668 (cierre, volumen e importe negociado) desde el 2-jul-2026 y cambio HKD/CNY del 19-oct-2026 (0,8511)', editor: 'Tencent Finance (gtimg) / Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://web.ifzq.gtimg.cn/appstock/app/hkfqkline/get?param=hk00668,day,,,320,qfq' },
];
const bo = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const fuera = new Set(['300866.SZ', '0668.HK', 'SONO', 'ARLO']);
const compsD = comps.empresas.filter((e) => !fuera.has(e.ticker)).map((e) => ({
  nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null,
  per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct,
}));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Anker Innovations Technology Co., Ltd.', nombre_corto: 'Anker', ticker: '300866', isin: null, mercado: 'ChiNext de Shenzhen (acciones A); H en Hong Kong (00668)', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Consumo discrecional', industria: 'Electrónica de consumo', sede: 'Changsha (Hunan)', fundacion: '2011', empleados: 6304, web: 'www.anker.com',
    precio: 110.40, fecha_precio: '2026-10-19', acciones: 599.9, capitalizacion_publicada: 65073, free_float_pct: 45.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M CNY/día (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Anker no publica objetivos de ventas ni de beneficio [D12]. En el semestral solo habla de seguir invirtiendo en I+D, ampliar el almacenamiento doméstico y de balcón, y diversificar canales y regiones para reducir la dependencia de un mercado [D16]. El consejo aprueba el 3T26 el 29-oct-2026 [D11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 39562, ebitda: 4765, ebit: 4245, bpa: 6.24, dpa: null, fuente: 'Media de las notas de Soochow, Guosen, Kaiyuan y Sinolink (ventas, EBIT, EBITDA) y de seis casas (BPA), ago-sep 2026 [D3, D4, D5]' },
      { periodo: '2027e', ingresos: 48326, ebitda: 5724, ebit: 4986, bpa: 7.43, dpa: null, fuente: 'Íd. [D3, D4, D5]' },
      { periodo: '2028e', ingresos: 57322, ebitda: 6778, ebit: 5991, bpa: 8.90, dpa: null, fuente: 'Íd. [D3, D4, D5]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: 9, mantener: 0, vender: 0, po_medio: 150.79, po_min: null, po_max: null },
    revisiones: 'Estables: el BPA de 2026e de las seis casas que publicaron tras el 1S26 va de 5,56 (Soochow) a 7,02 (Sinolink), con media de 6,24, frente a 5,6-6,2 en abril; el de 2027e, de 7,05 a 7,66 (media 7,43) [D3]. Yahoo (9 analistas) da 6,10 para 2026e y 7,29 para 2027e, frente a 5,79 y 7,01 hace 90 días [D8]. Todas las notas son de compra o sobreponderar; el objetivo medio de Yahoo es 150,79 CNY [D8]. Ojo: el BPA de 2026e de los analistas incluye la devolución de aranceles (≈ 700 M) y las ganancias de valor razonable del 1S26 [D4, D5].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual.filter((a) => +a.anio >= 2021),
    beta: bo.beta, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Anker salió a bolsa en agosto de 2020 en plena euforia del ChiNext y perdió un 60 % hasta abril de 2022 aunque el beneficio siguió creciendo [D1]. Desde entonces se ha recuperado con el beneficio: +52 % en 2023, +49 % en 2024 y +20 % en 2025 [D1]. En 2026 va −2,8 % (CSI 300 −8,6 %), con un recorrido amplio: mínimo de 91,21 CNY en marzo, máximo de 139,17 el 3-sep tras el semestral, y −20,6 % desde entonces [D1]. A tres años rinde un 17,3 % anual frente al 8,0 % del índice [D1]. Beta de cinco años de 0,99 y volatilidad del 45 %. Vía H (00668, Hong Kong): es la única que puede comprar un particular desde IBKR (el ChiNext por Stock Connect es solo para institucionales) [D10]. Cerró el 16-oct a 105,90 HKD (≈ 90,1 CNY al cambio de hoy, 0,8511), un 17 % por debajo de la A el mismo día; desde la salida la H ha cotizado entre un 3 % y un 29 % por debajo de la A (mediana ≈ 19 %), el descuento habitual entre acciones A y H, con una liquidez unas 40 veces menor (≈ 13 M HKD al día en 20 sesiones frente a ≈ 466 M CNY de la A) [D2, D20]. Como el objetivo a 12 meses sale de la historia de múltiplos de la A, aplicarlo a la H solo vale si el descuento se cierra; con el descuento constante, la H rinde lo mismo que la A. Además, el 2-ene-2027 termina el bloqueo de los inversores ancla de la salida (23,27 M acciones H, el 46 % de las H), una fecha que puede pesar sobre la H [D19].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -15.0, var_3m_pct: 1.1, var_6m_pct: 4.1, var_12m_pct: -15.6, dist_max_52s_pct: -20.6, dist_min_52s_pct: 17.2, dist_max_historico_pct: -26.5, tendencia: 'lateral', volatilidad_60d_pct: 43.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-2025', var_pct: -8.3, causa: '30-oct-2025: el 3T25 decepcionó en beneficio (pérdidas de cambio y gastos financieros) [D15]', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr-2026', var_pct: 29.6, causa: 'Del mínimo de 91,21 (9-mar) a 125,44 al cierre de abril: +12,9 % el 20-mar con el mercado y +11,4 % el 10-abr con los resultados de 2025 (margen bruto del 4T25 récord) [D1, D12]', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: 16.0, causa: 'Subidas del 11 y 13-may (+8 % y +7,9 %) sin anuncio de la empresa, con la anulación de los aranceles IEEPA y la expectativa de devolución [D1, D19]', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-jul-2026', var_pct: -16.9, causa: 'Antes y durante la salida a Hong Kong: las H debutaron el 2-jul por debajo del precio de salida (−6,8 % la A ese día) y la ampliación diluyó un 9 % [D13]', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct-2026', var_pct: -20.6, causa: 'Del máximo de 139,17 (3-sep, tras el semestral) a 108,91: venta de hardware y electrónica tras el festivo de octubre, con −8,0 % el 8-oct (ChiNext −3,15 %) sin noticia de la empresa; dudas sobre el margen sin la devolución de aranceles [D14, D1]', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-29', tipo: 'resultados', hecho: 'El consejo aprueba el 3T26 el 29-oct-2026; Soochow avisa de una posible pérdida de valor razonable en el trimestre [D11, D4]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-10', tipo: 'demanda o regulador', hecho: 'Vencen las exclusiones de la sección 301 para productos chinos y la tregua comercial EE. UU.-China de noviembre de 2025 [D19]', veredicto: 'no cambia', condicion: 'Un arancel nuevo de más del 10 % sobre la electrónica china llevaría el escenario bajista a central' },
        { fecha: '2026-07-02', tipo: 'ampliación o convertible', hecho: 'Salida a Hong Kong: 50,1 M acciones H a 99,32 HKD (≈ 4.137 M CNY netos); la H cotiza hoy a 105,90 HKD (≈ 90,1 CNY), un 18 % por debajo de la A [D13, D2]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-09', tipo: 'ampliación o convertible', hecho: 'El convertible (1.104,6 M, precio de conversión 105,96 CNY) está por debajo de la cotización: puede convertirse en 10,4 M de acciones, ya contadas en las diluidas [D18]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-23', tipo: 'demanda o regulador', hecho: 'Retiradas de 2025 cerradas (< 2,9 millones de baterías) y provisión por pleitos de 198,5 M; sin sanciones publicadas [D19]', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-29',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 20,6 % desde el máximo del 3-sep tiene dos causas con fecha y ninguna es de la empresa: la venta de hardware y electrónica tras el festivo de octubre (−8,0 % el 8-oct, con el ChiNext −3,15 %) y las dudas sobre el margen sin la devolución de aranceles, que el caso base ya excluye [D14, D4]. No hay colocaciones, ventas de directivos, sanciones ni litigios nuevos; la dilución de Hong Kong y del convertible está contada en las acciones. El 3T26 (consejo del 29-oct) puede mover el precio, pero los resultados cercanos no retrasan una decisión (regla 11). La H cotiza un 18 % por debajo de la A: para un inversor extranjero es la vía natural [D2, D10].',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el precio de cierre de cada año y el BPA real del año siguiente (ajustado por la ampliación de 3 por 10), Anker cotizó a 36,4 veces en 2021, 15,0 en 2022, 17,2 en 2023 y 20,7 en 2024; con nuestro BPA de 2026e, a 19,1 al cierre de 2025 [D1]. 2020 (67,9 veces, año de la salida a bolsa) queda fuera. A 110,40 CNY cotiza a 18,7 veces nuestro BPA de 2027e y a 14,9 veces el del consenso: cerca de su mediana adelantada (19,1). El tipo chino a 10 años en el 1,65 % sostiene múltiplos altos, pero la acción H cotiza un 18 % más barata [D6, D2].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Marcas de electrónica de consumo y pequeño electrodoméstico que venden por plataformas y tiendas: cuatro chinas que compiten en las mismas categorías (Ugreen en carga, Ecovacs y Roborock en robots, Edifier en audio), Xiaomi (ecosistema), y cuatro occidentales de accesorios y hogar (Logitech, Garmin, SharkNinja). Fuera Sonos y Arlo: márgenes EBITDA del 1-2 % y ROIC negativo o casi nulo que dan EV/EBITDA sin sentido (15,6 y 51,6 veces). Cifras de Yahoo al 19-oct-2026 en millones de CNY al cambio del día; EV/EBITDA NTM sin dato gratuito [D8].',
    empresas: compsD,
    comentario: 'Anker cotiza a 1,9 veces ventas y 16 veces el EBITDA LTM de Yahoo (que incluye el valor razonable y la devolución de aranceles), con un PER NTM de 15,6 veces el consenso [D8]. Los chinos de su tamaño cotizan a 11-17 veces el BPA NTM (Ecovacs y Roborock, más baratos, con guerra de precios en robots; Ugreen y Edifier en línea); los occidentales de marca (Garmin, SharkNinja) a 25-26 veces con márgenes del 17-28 % [D8]. Anker está en la mediana de los chinos con un ROIC del 20 % según Yahoo y un margen EBITDA del 10 %, la mitad de los occidentales: la prima de las marcas occidentales no le corresponde mientras dependa de Amazon y pague aranceles en EE. UU.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo', tipo: 'Complemento', intentos: '1) Compras en electrónica de consumo 2020-2026 (Logitech, Garmin: pequeñas, sin EBITDA del perímetro); 2) compras chinas de marcas de Amazon (Aukey, Mpow: sin cifras publicadas); 3) prensa: múltiplos no comprobables', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bolsa de Shenzhen (solo saldo de préstamo de valores); 2) Eastmoney (saldo de financiación ≈ 315 M, no cortos); 3) HKEX (cortos de las H, no de las A)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Guba de Eastmoney, foro de 300866 (安克创新吧): unos 160 mensajes del 8 al 19-oct-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,300866.html' },
  { id: 2, titulo: 'Guba de Eastmoney, foro de 300866: hilos con debate sobre márgenes, existencias y pleitos (sep-oct 2026)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,300866_2.html' },
  { id: 3, titulo: 'Estimaciones y objetivos de los analistas (Yahoo, 9 analistas: compra fuerte)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/300866.SZ/analysis' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba de Eastmoney (foro de 300866)', fecha: '2026-10', n_comentarios: 160, tono: 'Negativo', resumen: 'Particulares que compraron por encima de 120 CNY tras el semestral; hablan de «doble techo», de cortos en el margen y de que el 2T26 fue inflado por la devolución de aranceles. Algunos esperan el 3T26 para comprar más barato [E1].' },
      { plataforma: 'Guba de Eastmoney (hilos de debate)', fecha: '2026-09/10', n_comentarios: 40, tono: 'Dividido', resumen: 'Debate sobre las existencias de 6.700 M, los pleitos de patentes en EE. UU., una nueva sociedad de semiconductores (13-oct) y si Ugreen le quita cuota; los alcistas citan el almacenamiento de balcón y el consenso de compra [E2].' },
    ],
    temas: [
      { tema: 'Margen inflado por la devolución de aranceles', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en parte: la empresa restó la devolución del coste de ventas del 1S26; sin ella el margen bruto del 2T26 sería ≈ 47 %, aún +1-2 puntos sobre el 2T25 según Sinolink (semestral e informe de Sinolink).' },
      { tema: 'Existencias altas', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto: 6.734 M a junio (+35 % desde diciembre) y 444 M de deterioro en el semestre.' },
      { tema: 'Almacenamiento de balcón y doméstico', postura: 'Alcista', peso: 'Medio', contraste: 'La línea de carga y almacenamiento creció un 31 % en el 1S26; Frost & Sullivan prevé +19,6 % anual para el almacenamiento de consumo.' },
      { tema: 'Valoración tras la caída', postura: 'Dividida', peso: 'Bajo', contraste: 'A 110,40 CNY cotiza a 18,7 veces nuestro BPA de 2027e, cerca de su mediana adelantada; la sección de valoración lo comprueba.' },
    ],
    lectura: 'El minorista chino está decepcionado tras comprar en el máximo de septiembre y lee el 2T26 como inflado por la devolución de aranceles, mientras los nueve analistas siguen en compra con un objetivo medio de 150,79 CNY [E1, E3]. Esa distancia es habitual tras un rebote fuerte y no es una señal por sí sola. Los foros aciertan en lo esencial (la ayuda de los aranceles no se repite y las existencias son altas) y el informe ya lo recoge; no aportan un riesgo nuevo.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'plataformas internacionales', tipo: 'Complemento', intentos: '1) Seeking Alpha (sin cobertura de 300866 ni de 00668); 2) Reddit y Stocktwits (sin hilos sobre la acción; los de r/anker son de producto); 3) Xueqiu (requiere sesión)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
console.log('LTM', { ing: r1(ltmIng), ebit: r1(ltmEbit), da: r1(ltmDa), neto: r1(ltmNeto), fcf: r1(ltmFcf) });
console.log(cuenta.map((c) => [c.periodo, c.ebitda, c.ebit, c.bpa, c.dpa, c.acciones_diluidas, r1(c.ebitda / c.ingresos * 100)]));
