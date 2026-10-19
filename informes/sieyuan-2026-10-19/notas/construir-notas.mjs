// Notas A-E de Sieyuan Electric Co., Ltd. (002028.SZ, corte 2026-10-19). China sin XBRL público: cuentas de los
// informes anuales CAS de CNINFO (2021-2025), del semestral 1S26 y de los trimestrales. Las cifras de los estados
// (cuenta, balance y flujos) están en cuentas-cas-anual.json y cuentas-cas-periodos.json (transcripción en millones de
// la base F10 de Eastmoney, comprobada partida a partida contra las páginas de los estados del informe anual 2025,
// que vienen como imagen, y contra las cifras clave de los informes de 2021-2025 y del 1S26).
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/sieyuan-2026-10-19/notas/construir-notas.mjs
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
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: '2025年年度报告 (informe anual 2025, CAS: estados consolidados, notas, ventas por línea y región, pedidos, objetivos 2026, trimestres)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-04-18', url: `${CN}/2026-04-18/1225117829.PDF` },
  { id: 2, titulo: '2024年年度报告 (informe anual 2024: pedidos, trimestres 2024, deterioro del fondo de comercio de 烯晶碳能)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2025-04-19', url: `${CN}/2025-04-19/1223145398.PDF` },
  { id: 3, titulo: '2023年年度报告 (informe anual 2023: estados de 2023 y 2022, compra de 烯晶碳能, ventas por producto)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2024-04-20', url: `${CN}/2024-04-20/1219702367.PDF` },
  { id: 4, titulo: '2022年年度报告 (informe anual 2022: ventas por producto 2021-2022, pedidos, objetivos)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2023-04-15', url: `${CN}/2023-04-15/1216417256.PDF` },
  { id: 5, titulo: '2021年年度报告 (informe anual 2021: estados de 2021, pedidos y objetivos)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2022-04-16', url: `${CN}/2022-04-16/1212942957.PDF` },
  { id: 6, titulo: '2026年半年度报告 (informe semestral 2026: balance a 30-jun-2026, cuenta y flujos del 1S26, ventas por línea y región, accionistas)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-08-15', url: `${CN}/2026-08-15/1225473691.PDF` },
  { id: 7, titulo: '2026年一季度报告 (informe del 1T26)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-04-25', url: `${CN}/2026-04-25/1225177123.PDF` },
  { id: 8, titulo: '2025年半年度报告 y 2025年三季度报告 (1S25 y 9M25)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2025-10-18', url: `${CN}/2025-10-18/1224719649.PDF` },
  { id: 9, titulo: '2026年半年度业绩快报 (avance del 1S26: pérdidas de cambio y paso de Sieyuan Toshiba al 70 %)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-07-11', url: `${CN}/2026-07-11/1225420017.PDF` },
  { id: 10, titulo: '关于控股子公司常州思源东芝变压器有限公司完成股权变更登记的公告 (Toshiba ejerce su opción: Sieyuan pasa del 90 % al 70 % de Sieyuan Toshiba por 100 CNY)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-07-10', url: `${CN}/2026-07-10/1225416830.PDF` },
  { id: 11, titulo: '2025年度权益分派实施公告 (dividendo de 0,70 CNY, 547,7 M, registro el 7-jul-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-07-01', url: `${CN}/2026-07-01/1225399910.PDF` },
  { id: 12, titulo: '关于2023年股票期权激励计划第三个行权期行权条件成就的公告 (6.198.750 opciones a 43,80 CNY)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-08-05', url: `${CN}/2026-08-05/1225458421.PDF` },
  { id: 13, titulo: 'Estados financieros F10 de 002028 (cuenta, balance y flujos 2021-2026 en la base de Eastmoney; transcripción comprobada contra los informes)', editor: 'Eastmoney', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://emweb.securities.eastmoney.com/PC_HSF10/NewFinanceAnalysis/Index?code=SZ002028' },
  { id: 14, titulo: 'Soochow Securities (东吴证券): «2026年中报点评：高毛利主业韧性凸显，国际化+AIDC双轮驱动»', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-08-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608171828066150_1.pdf' },
  { id: 15, titulo: 'Sinolink Securities (国金证券): «利润受汇兑损失及变压器子公司股份减少影响，看好下半年高质量订单加速兑现»', editor: 'Sinolink Securities', tipo: 'Analistas', fecha: '2026-07-12', url: 'https://pdf.dfcfw.com/pdf/H3_AP202607121826911344_1.pdf' },
  { id: 16, titulo: '关于回购期届满暨股份回购实施结果的公告 (recompra de 300-500 M aprobada en 2025: 0 acciones compradas)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-06-16', url: `${CN}/2026-06-16/1225371122.PDF` },
];

// EBIT = resultado de explotación + gastos financieros netos (incluidas diferencias de cambio) − ingresos de
// inversiones − cambios de valor razonable + resultado no operativo. Subvenciones (其他收益) y deterioros dentro.
const per = ['2021', '2022', '2023', '2024', '2025'];
const dpa = { 2021: 0.20, 2022: 0.30, 2023: 0.40, 2024: 0.50, 2025: 0.70 };
const da = (c) => c.dep + c.rou_dep + c.amort_int + c.amort_lp;
const ebitDe = (c) => c.op + c.finan - c.inversion - c.vr + (c.no_op_ing - c.no_op_gas);
const cuenta = per.map((p) => {
  const c = CA[`${p}-12-31`];
  const ebit = ebitDe(c);
  return {
    periodo: p, ingresos: c.ingresos, coste_ventas: r2(c.coste + c.tasas), gastos_generales: r2(c.ventas + c.admin + c.idi),
    ebitda: r2(ebit + da(c)), amortizaciones: r2(da(c)), ebit: r2(ebit), resultado_financiero: r2(c.bai - ebit), bai: c.bai,
    impuestos: c.imp, minoritarios: c.minor, beneficio_neto: c.atrib, gastos_financieros: c.intereses,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: p === '2024' ? 107.5 : null,
    bpa: c.bpad, dpa: dpa[p], dpa_extraordinario: 0, acciones_diluidas: r1(c.atrib / c.bpad),
  };
});
const balanceH = per.map((p) => {
  const c = CA[`${p}-12-31`];
  return {
    periodo: p, activo_total: c.at, activo_corriente: c.ac, pasivo_corriente: c.pc, pasivo_total: c.pt,
    fondo_comercio: c.gw, intangibles: c.intang, inmovilizado_material: r2(c.ppe + c.cip), existencias: c.existencias,
    clientes: r2(c.clientes + c.efectos), proveedores: r2(c.proveedores + c.ef_pag), activos_contrato: c.act_contrato, pasivos_contrato: c.pas_contrato,
    caja: r2(c.caja + c.tfa + (c.deuda_inv || 0)), deuda_financiera: r2(c.cp + (c.lp || 0) + (c.cp_nc || 0)), arrendamientos: c.lease,
    patrimonio_neto: c.pn, minoritarios: c.minoritarios_bal, reservas: c.reservas_nd,
  };
});
// Compras de minoritarios y pagos de arrendamiento (nota 59 de 2025 y 2024; los años anteriores, la partida «otros pagos de financiación»)
const arr = { 2021: 9.3, 2022: 13.0, 2023: 15.0, 2024: 15.3, 2025: 20.0 };
const flujosH = per.map((p) => {
  const c = CA[`${p}-12-31`];
  return {
    periodo: p, flujo_operativo: c.cfo, capex: c.capex, pagos_arrendamientos: arr[p], adquisiciones: c.adq || 0, desinversiones: c.desinv,
    dividendos: c.div_int, recompras: 0, emision_acciones: c.emision, intereses_en_financiacion: 0,
  };
});
const segHist = (a, b) => [{ periodo: '2024', ingresos: a, resultado: null }, { periodo: '2025', ingresos: b, resultado: null }];
const h126 = CP['2026-06-30'], h125 = CP['2025-06-30'];
const ebitH1 = ebitDe(h126), ebitH1p = ebitDe(h125);
// LTM jun-26 = 2025 + 1S26 − 1S25
const c25 = CA['2025-12-31'];
const ltmIng = c25.ingresos + h126.ingresos - h125.ingresos;
const ltmEbit = ebitDe(c25) + ebitH1 - ebitH1p;
const ltmDa = da(c25) + da(h126) - da(h125);
const ltmNeto = c25.atrib + h126.atrib - h125.atrib;
const ltmFcf = (c25.cfo + h126.cfo - h125.cfo) - (c25.capex + h126.capex - h125.capex);

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: r1(ltmIng), ebitda: r1(ltmEbit + ltmDa), ebit: r1(ltmEbit), beneficio_neto: r1(ltmNeto), bpa: r2(4.01 + 1.85 - 1.66), dpa: 0.70, dpa_extraordinario: 0, fcf: r1(ltmFcf), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2023', descripcion: '烯晶碳能 (supercondensadores, Wuxi), consolidada desde el 1-mar-2023 al pasar del 10 % al 51,2 % (617,98 M CNY en caja): fondo de comercio de 597 M' }],
    comentario: 'Las ventas pasaron de 8.695 M CNY en 2021 a 21.539 M en 2025 (+25,4 % anual) y el beneficio atribuido de 1.198 M a 3.150 M [A1, A5]. El crecimiento es orgánico salvo 烯晶碳能 (2023, 77 M de ventas en su primer año) [A3]. El margen EBITDA (con las diferencias de cambio y los rendimientos de la tesorería fuera) subió del 14,2 % de 2022 al 18,3 % de 2025 (17,3 % en 2021): el margen bruto de aparamenta (36,9 %) y transformadores (36,4 %) sostiene el grupo mientras EPC (11,8 %) y almacenamiento (11,7 %) lo diluyen [A1]. El 1S26 mantiene el margen EBITDA (19,4 % frente al 19,1 % del 1S25), pero el beneficio atribuido solo crece un 13,2 % frente al 27,1 % de las ventas: 125 M más de pérdidas de cambio y la salida del 20 % de Sieyuan Toshiba hacia los minoritarios desde julio de 2026 [A6, A9, A10, A14]. 2022 es el año flojo: la cuenta sufre 38 M de pérdidas de valor razonable y 105 M de deterioro de créditos.',
    ajustes: 'Cifras reportadas en normas chinas (CAS). El EBIT y el EBITDA de este informe excluyen los gastos financieros netos (que en 2026 incluyen las diferencias de cambio), los ingresos de inversiones y los cambios de valor razonable de la tesorería: van al resultado financiero. Las subvenciones públicas (其他收益, 283 M en 2025, de ellas 184 M no recurrentes según la empresa) se quedan en el EBIT porque se repiten cada año (devolución del IVA del software y ayudas a la I+D) [A1]. El único no recurrente relevante dentro del EBITDA es el deterioro del fondo de comercio de 烯晶碳能 de 107,5 M en 2024, que se devuelve al EBITDA de ese año [A2]. Los no recurrentes declarados por la empresa sumaron 199 M en 2025 (6,3 % del beneficio) [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 4241.0, crecimiento_pct: 29.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.78, vs_consenso: null },
      { periodo: '4T24', ingresos: 5050.8, crecimiento_pct: 30.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.72, vs_consenso: null },
      { periodo: '1T25', ingresos: 3226.6, crecimiento_pct: 21.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.57, vs_consenso: null },
      { periodo: '2T25', ingresos: 5270.3, crecimiento_pct: 50.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: null },
      { periodo: '3T25', ingresos: 5330.1, crecimiento_pct: 25.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.15, vs_consenso: null },
      { periodo: '4T25', ingresos: 7712.1, crecimiento_pct: 52.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.23, vs_consenso: null },
      { periodo: '1T26', ingresos: 4568.7, crecimiento_pct: 41.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.70, vs_consenso: 'En línea' },
      { periodo: '2T26', ingresos: 6226.6, crecimiento_pct: 18.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.17, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: 'Sieyuan no publica transcripciones; el contenido de las dos últimas presentaciones sale de las notas de los analistas que asistieron. Tras el 1S26 (avance del 10-jul y semestral del 14-ago), la dirección atribuyó la desaceleración del beneficio del 2T26 (+8 %) a las pérdidas de cambio (125 M más que en el 1S25, por las cuentas a cobrar en dólares) y a la salida del 20 % de Sieyuan Toshiba, y defendió que el 2S26 traerá entregas de pedidos de exportación de mayor margen [A9, A15]. Los pasivos por contrato (anticipos) subieron a 3.829 M, un 22 % más que en marzo, y las existencias a 5.999 M (+19 %), señal de pedidos en curso [A6, A14]. Los analistas preguntaron por la caída de las ventas de electrónica de potencia (−25 %) y por el peso de EPC y almacenamiento, de margen bajo, que subió 8,8 puntos hasta el 23,2 % de las ventas; Soochow rebajó su beneficio de 2026-2028 un 3-6 % por esa mezcla [A14]. Frente a la presentación del 1T26 (abril), cuando el discurso era de «crecimiento de alta calidad» con la exportación al 86 %, el tono pasó a «perturbaciones a corto plazo». La dirección no ha cuantificado el efecto de la orden de EE. UU. del 26-ago sobre los equipos de alta tensión chinos ni ha dado fecha nueva para la salida a bolsa en Hong Kong.',
    confianza: 'Media',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 657.3 }, { anio: '2027', importe: 50.0 }, { anio: '2028+', importe: 89.7 }],
    liquidez: 'A 30-jun-2026: tesorería de 3.677 M, activos financieros a valor razonable (depósitos estructurados y productos bancarios) de 4.209 M y certificados de depósito de 304 M: 8.190 M frente a 797 M de deuda bancaria y 58 M de arrendamientos [A6]. Después del cierre se pagaron 547,7 M de dividendo (julio) [A11].',
    rating: 'Sin rating',
    coste_deuda_pct: 2.4,
    vida_media_anios: 0.8,
    otros_pasivos: 'Sin pensiones de prestación definida. Provisiones de 66 M (garantías de producto) y garantías bancarias de cumplimiento (保函) por los proyectos, habituales en el sector [A1]. Efectos comerciales a pagar de 2.653 M y a cobrar de 838 M a 30-jun-2026: el circulante se apoya en papel comercial bancario, sin factoring sin recurso declarado relevante [A6]. Pasivos por contrato (anticipos de clientes) de 3.829 M que se compensan con entregas: van al circulante, no a la deuda. Sieyuan Toshiba: Toshiba ejerció en julio de 2026 la opción del contrato de 2018 y compró el 20 % por 100 CNY; no queda otra opción de venta de minoritarios declarada [A10].',
    comentario: 'El balance es de caja neta: unos 7.300 M a junio de 2026 frente a 1.465 M de deuda y arrendamientos en 2021 [A6, A5]. El circulante comercial (existencias, clientes y efectos, menos proveedores y efectos, más activos y menos pasivos por contrato) pasó de 2.347 M en 2024 a 3.775 M en 2025 (del 15,2 % al 17,5 % de las ventas): las cuentas a cobrar crecieron un 42 % con unas ventas +39 %, por la exportación y EPC, que cobran más tarde [A1]. El deterioro de créditos subió a 209 M en 2025 (122 M en 2024). En el 1S26 las existencias (+47 % desde diciembre) y los anticipos (+29 %) crecen a la vez, típico de un fabricante bajo pedido antes de entregar.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'La conversión en caja es irregular: el flujo operativo fue de 383 M en 2021 (32 % del beneficio) y de 2.234 M en 2025 (71 %), por el circulante que exige la exportación y EPC [A1, A5]. El primer semestre siempre es negativo o pequeño (−713 M en el 1S25, +227 M en el 1S26) y el cuarto trimestre trae la mitad de la caja del año [A1, A6]. El capex fue de 820 M en 2025 (3,8 % de las ventas) y de 458 M en el 1S26 (4,2 %): fábricas de transformadores y GIS en Nantong y Rugao, 600 M para aparamenta y 480 M para transformadores aprobados en junio de 2026, y no menos de 400 M para supercondensadores (julio) [A6, A14]. Estimación propia: el mantenimiento ronda la amortización (≈ 1,5 % de las ventas) y el resto es crecimiento. La empresa no recompra (la recompra de 2025 quedó en cero) y reparte en torno al 20 % del beneficio [A16, A11].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Shanghai Certified Public Accountants (上会会计师事务所)',
    anios_auditor: 25,
    opinion: 'Favorable (sin salvedades) en 2021-2025',
    comentario: 'El auditor lleva 25 años seguidos, demasiados para la práctica internacional aunque la rotación de socios (dos años los actuales) cumple la norma china [A1]. No hay cambios de criterio relevantes. La I+D se lleva a gastos casi entera (1.300 M en 2025, 6,0 % de las ventas) [A1]. Los pagos en acciones (opciones de 2023 a 43,80 CNY) son pequeños frente al beneficio. El reconocimiento de ingresos es por entrega o aceptación del cliente y por avance en EPC; el riesgo está en los activos por contrato (1.662 M) y las cuentas a cobrar (8.793 M a junio de 2026), que crecen al ritmo de la exportación [A6]. Las subvenciones (283 M) y la tesorería (79 M de ingresos) suman el 8 % del beneficio antes de impuestos de 2025. El tipo efectivo es bajo (12,4 %) por el régimen de alta tecnología (15 %) y la deducción adicional de la I+D [A1].',
    senales: [
      { senal: 'Cuentas a cobrar que crecen más que las ventas', nivel: 'Media', comentario: 'Clientes y efectos +42 % en 2025 con ventas +39 %; deterioro de créditos de 209 M (1,0 % de las ventas) [A1].' },
      { senal: 'Auditor con 25 años de continuidad', nivel: 'Baja', comentario: 'Firma local de tamaño medio; opinión limpia y sin incidencias publicadas [A1].' },
      { senal: 'Diferencia entre avance y semestral del 1S26', nivel: 'Baja', comentario: 'El avance del 10-jul daba 1.487 M de beneficio atribuido y el semestral 1.464 M (−1,6 %) [A9, A6].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo en efectivo una vez al año: 0,20 CNY por acción de 2021, 0,30 de 2022, 0,40 de 2023, 0,50 de 2024 y 0,70 de 2025 (547,7 M, el 17 % del beneficio), pagado en julio de 2026 [A1, A11]. La recompra de 300-500 M aprobada en mayo de 2025 (precio máximo 109,45 CNY) terminó el 12-jun-2026 sin comprar una acción: primero por una inversión relevante en estudio y después porque la cotización superó el máximo [A16]. Prioridad declarada: capacidad (aparamenta, transformadores, supercondensadores), red comercial internacional y la salida a bolsa en Hong Kong para financiar la expansión exterior [A1, A6].',
    adquisiciones: [
      { anio: '2023', objetivo: '烯晶碳能电子科技无锡有限公司 (supercondensadores): del 10 % al 51,2 %', importe: 618.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Fondo de comercio de 597 M; deterioro de 107,5 M en 2024 al no cumplir el plan. En 2025 el negocio de almacenamiento y componentes creció un 121 % y se abre al mercado de centros de datos [A3, A2, A1]' },
      { anio: '2018', objetivo: 'Changzhou Toshiba Shuden Transformer (90 %, hoy Sieyuan Toshiba)', importe: 0.0, ev_ebitda: null, financiacion: 'Precio simbólico (400 CNY) con opción de Toshiba de recomprar hasta el 30 %', resultado: 'Base del negocio de transformadores (4.633 M de ventas en 2025); Toshiba ejerció la opción en julio de 2026 y Sieyuan bajó al 70 % por 100 CNY [A10, A1]' },
    ],
    comentario: 'Asignación prudente: sin deuda, crecimiento orgánico con capex del 3-4 % de las ventas y una sola compra apreciable en diez años, que salió regular (deterioro del 18 % del fondo de comercio al año siguiente) [A2]. El reparto es bajo (17-20 %) para una empresa con 7.300 M de caja neta; la recompra aprobada en 2025 no se ejecutó [A16]. La salida a bolsa en Hong Kong (solicitud del 11-feb-2026, caducada sin renovar) habría diluido a los accionistas sin necesidad de caja [C9].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Aparamenta (开关类)', descripcion: 'GIS y GIL hasta 1.000 kV, interruptores SF6 y de vacío, celdas de media tensión', tipo_resultado: null, historico: segHist(6910.3, 8935.2) },
      { nombre: 'Transformadores (变压器类)', descripcion: 'Transformadores de potencia hasta 750 kV, reactancias, transformadores de medida y pasatapas', tipo_resultado: null, historico: segHist(3348.4, 4633.4) },
      { nombre: 'Protección y automatización', descripcion: 'Relés de protección, control de subestaciones, monitorización en línea', tipo_resultado: null, historico: segHist(2444.0, 2542.2) },
      { nombre: 'Electrónica de potencia', descripcion: 'SVG, filtros activos, condensadores síncronos estáticos, compensación de reactiva', tipo_resultado: null, historico: segHist(1020.4, 1525.4) },
      { nombre: 'EPC', descripcion: 'Subestaciones llave en mano, sobre todo en el exterior', tipo_resultado: null, historico: segHist(1010.1, 2332.3) },
      { nombre: 'Almacenamiento y componentes', descripcion: 'Almacenamiento en baterías para plantas, supercondensadores y electrónica del automóvil', tipo_resultado: null, historico: segHist(694.4, 1531.2) },
      { nombre: 'Otros (arrendamiento)', descripcion: 'Alquiler de inmuebles', tipo_resultado: null, historico: segHist(30.5, 39.3) },
    ],
    geografias: [
      { nombre: 'Exterior', peso_pct: 26.9 },
      { nombre: 'China este', peso_pct: 22.5 },
      { nombre: 'China norte', peso_pct: 14.0 },
      { nombre: 'China noroeste', peso_pct: 12.0 },
      { nombre: 'China centro', peso_pct: 7.7 },
      { nombre: 'China suroeste', peso_pct: 6.6 },
      { nombre: 'China sur', peso_pct: 6.5 },
      { nombre: 'China noreste', peso_pct: 3.8 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos nuevos (M CNY, sin IVA)', valor_anterior: '21.457 (2024)', valor_actual: '28.891 (2025)', variacion: '+34,6 %', comentario: 'Objetivo de 2026: 37.500 M (+30 %); 2023: 16.513 M; 2022: 12.122 M [A1, A2, A3]' },
      { kpi: 'Ventas en el exterior (M CNY)', valor_anterior: '3.122 (2024)', valor_actual: '5.803 (2025)', variacion: '+85,8 %', comentario: 'En el 1S26, 3.183 M (+11,2 %), el 29,5 % de las ventas [A1, A6]' },
      { kpi: 'Margen bruto del grupo', valor_anterior: '31,2 % (2024)', valor_actual: '30,8 % (2025)', variacion: '−0,4 pp', comentario: '30,5 % en el 1S26 (−1,3 pp) por la mezcla de EPC y almacenamiento [A1, A14]' },
      { kpi: 'Pasivos por contrato (anticipos, M CNY)', valor_anterior: '2.370 (2024)', valor_actual: '2.977 (2025)', variacion: '+25,6 %', comentario: '3.829 M a 30-jun-2026, máximo histórico [A6]' },
      { kpi: 'Gasto en I+D (M CNY)', valor_anterior: '1.110 (2024)', valor_actual: '1.300 (2025)', variacion: '+17,2 %', comentario: '4.781 personas de I+D, el 43 % de la plantilla de 11.007 [A1]' },
      { kpi: 'Margen bruto de aparamenta', valor_anterior: '38,8 % (2024)', valor_actual: '36,9 % (2025)', variacion: '−1,9 pp', comentario: '39,1 % en el 1S26 [A1, A6]' },
    ],
    clientes: 'Clientes muy repartidos: los cinco primeros sumaron el 9,5 % de las ventas de 2025 y el mayor, el 2,4 % [A1]. En China vende a State Grid y China Southern Grid por licitaciones centralizadas, y a generadoras, ferrocarril, petroquímica y metalurgia; en 2025 entró como proveedor principal de protección de 220 kV de Southern Grid [A1]. Fuera vende a eléctricas de más de 100 países, con entradas recientes en Alemania, Portugal, Suecia, Finlandia e Irlanda [A1]. Fabrica bajo pedido (MTO/ETO) con anticipos del 10-30 %: los pasivos por contrato equivalen a unos dos meses de ventas [A6]. Poder de precios demostrado: el margen bruto de transformadores subió 4,1 puntos en 2025 y el de aparamenta 3,7 puntos en el 1S26 con el cobre caro [A1, A6]; el de la exportación bajó 1,8 puntos en 2025 y 2,3 en el 1S26 [A1, A6].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Informes trimestrales CAS (sin amortización trimestral); 2) semestral (amortización solo semestral); 3) derivarlo prorrateando la amortización: descartado por las diferencias de cambio trimestrales', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2023 en la segmentación vigente', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo 2024 reexpresado); 2) informe anual 2024 (solo por industria); 3) informes 2022-2023 (segmentación antigua: aparamenta, bobinados, reactiva, equipos inteligentes, EPC, otros)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: '2025年年度报告: sector (IEA: inversión mundial en redes > 400.000 M USD en 2025 y ≈ 650.000 M en 2035; plan de equipos eléctricos 2025-2026), productos e historia', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-04-18', url: `${CN}/2026-04-18/1225117829.PDF` },
  { id: 2, titulo: '《中国供电发展报告2026》: inversión en la red de 2025 de 639.500 M CNY (noticia de Science and Technology Daily)', editor: 'Administración Nacional de Energía / 科技日报', tipo: 'Sectorial', fecha: '2026-07-02', url: 'https://www.stdaily.com/web/gdxw/2026-07/02/content_541260.html' },
  { id: 3, titulo: 'Executive order bans foreign-produced transformers, inverters and circuit breakers for U.S. power grid (EO 14420)', editor: 'pv magazine', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.pv-magazine.com/2026/08/27/executive-order-bans-foreign-produced-transformers-inverters-and-circuit-breakers-for-u-s-power-grid/' },
  { id: 4, titulo: 'Executive Order Declares National Emergency to Secure U.S. Bulk-Power System', editor: 'Holland & Knight', tipo: 'Prensa', fecha: '2026-09-01', url: 'https://www.hklaw.com/en/insights/publications/2026/09/executive-order-declares-national-emergency-to-secure-us' },
  { id: 5, titulo: '思源电气递表港交所 中信证券担任独家保荐人 (Frost & Sullivan: 3,5 % del mercado chino de equipos de transmisión y distribución en 2024)', editor: '同花顺 (10jqka)', tipo: 'Prensa', fecha: '2026-02-12', url: 'https://stock.10jqka.com.cn/20260212/c674747732.shtml' },
  { id: 6, titulo: 'Fichas de Yahoo Finance de XJ Electric, Pinggao, China XD, TBEA, NARI, Jinpan, Huaming, Hyosung Heavy, HD Hyundai Electric, LS Electric y Siemens Energy (ventas y EBIT del último ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: '2025年可持续发展报告 (informe de sostenibilidad 2025: emisiones, CDP B, seguridad, SF6)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-04-18', url: `${CN}/2026-04-18/1225117841.PDF` },
  { id: 8, titulo: '思源电气暴跌背后 (UBS rebaja el sector; inversión de State Grid en 7M26 +≈ 1 %)', editor: '凤凰网财经 (ifeng)', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://finance.ifeng.com/c/8wfqgRdljhO' },
  { id: 9, titulo: '2023年年度报告 (compra de 烯晶碳能; historia)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2024-04-20', url: `${CN}/2024-04-20/1219702367.PDF` },
  { id: 10, titulo: 'Zhonghang Securities (中航证券): informe de inicio «输变电设备全能选手，海外开拓和新品类扩张稳步推进»', editor: 'AVIC Securities', tipo: 'Analistas', fecha: '2026-06-10', url: 'https://pdf.dfcfw.com/pdf/H3_AP202606101823409528_1.pdf' },
];
const compEbit = { // ventas y margen EBIT del último ejercicio (Yahoo), ventas en M CNY al cambio de hoy
  'XJ Electric': [14992, 10.0], 'Pinggao Electric': [12517, 11.4], 'China XD Electric': [23813, 7.2], 'TBEA': [97318, 9.8],
  'NARI Technology': [66229, 14.9], 'Hyosung Heavy Industries': [Math.round(5968512 * 0.005013), 11.5], 'HD Hyundai Electric': [Math.round(4079498 * 0.005013), 23.9], 'Siemens Energy': [Math.round(39077 * 7.4767), 6.4],
};
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Sieyuan nació en 1993 en Shanghái, fundada por Dong Zengping, Chen Bangdong y otros socios para fabricar equipos de monitorización de alta tensión; sale a bolsa en Shenzhen en 2004 (002028) [B1]. Pasó de un producto a seis líneas: aparamenta (GIS hasta 1.000 kV), transformadores, protección y automatización, electrónica de potencia, almacenamiento y EPC [B1]. Las compras fueron pocas y baratas: Changzhou Toshiba Shuden (transformadores) en 2018 por un precio simbólico, y 烯晶碳能 (supercondensadores) en 2023 [B9]. Los dos fundadores siguen al mando (16,8 % y 12,3 %). Desde 2023 la exportación lleva el crecimiento (del 17 % al 27 % de las ventas en 2025), y en 2026 pidió salir a bolsa en Hong Kong [B1, B5].',
    hitos: [
      { anio: '1993', hito: 'Fundación en Shanghái por Dong Zengping y Chen Bangdong [B1]' },
      { anio: '2004', hito: 'Salida a bolsa en Shenzhen (002028) [B1]' },
      { anio: '2018', hito: 'Compra del 90 % de Changzhou Toshiba Shuden Transformer: entrada en transformadores de potencia [B1]' },
      { anio: '2021', hito: 'Pedidos de 10.369 M y ventas de 8.695 M; la acción sube un 147 % [B1]' },
      { anio: '2023', hito: 'Compra del control de 烯晶碳能 (supercondensadores) por 618 M [B9]' },
      { anio: '2025', hito: 'Ventas de 21.539 M (+39 %), exportación +86 %, pedidos de 28.891 M [B1]' },
      { anio: '2026', hito: 'Solicitud de salida a bolsa en Hong Kong (11-feb), caducada sin renovar; Toshiba recompra el 20 % de Sieyuan Toshiba (julio) [B5]' },
    ],
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Equipos de transmisión y distribución de alta y media tensión (aparamenta GIS, transformadores, protección, compensación) y almacenamiento para las redes, en China y en el mundo. El mercado relevante es la inversión mundial en redes eléctricas (IEA), de la que los equipos son la mayor parte; para China se usa la inversión en la red de la Administración Nacional de Energía. Se usa la cifra de la IEA porque Sieyuan ya vende el 27-30 % fuera y compite por licitaciones en más de 100 países [B1, B2].',
    tamano: '≈ 400.000 M USD de inversión mundial en redes en 2025 (≈ 2.668.000 M CNY), de ellos 639.500 M CNY en China [B1, B2]',
    unidad_serie: 'miles de millones de USD (inversión mundial en redes, IEA)',
    serie: [
      { anio: '2025', tamano: 400 }, { anio: '2028e', tamano: 463 }, { anio: '2031e', tamano: 536 }, { anio: '2035e', tamano: 650 },
    ],
    tcac_historico_pct: 5.1,
    tcac_previsto_pct: 5.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Inversión en la red china', efecto: '+/−', horizonte: 'Cíclico', evidencia: '639.500 M CNY en 2025 (+5,1 %); la de State Grid apenas creció un 1 % en 7M26 frente al 38 % anterior [B2, B8]' },
      { driver: 'Escasez mundial de transformadores y equipos de alta tensión', efecto: '+', horizonte: 'Estructural', evidencia: 'La IEA estima un déficit de inversión en redes de 600.000 M USD frente a la generación [B1]' },
      { driver: 'Centros de datos y electrificación', efecto: '+', horizonte: 'Estructural', evidencia: 'Inversión mundial en centros de datos de 580.000 M USD en 2025 [B1]' },
      { driver: 'Proteccionismo en EE. UU. y la UE', efecto: '−', horizonte: 'Estructural', evidencia: 'Orden ejecutiva 14420 (26-ago-2026): el DOE puede prohibir equipos de 69 kV o más de 24 países; reglas antes del 24-dic-2026 [B3, B4]' },
      { driver: 'Precio del cobre y del acero eléctrico', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los transformadores llevan mucho cobre; el margen bruto de transformadores aun así subió 4,1 pp en 2025 [B1]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Licitaciones centralizadas de State Grid con precio como criterio; rivales estatales (XD, Pinggao, XJ) con márgenes EBIT del 7-11 % frente al 17 % de Sieyuan [B6]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Dos redes estatales compran casi toda la alta tensión china; fuera, eléctricas con homologaciones largas [B1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Cobre, acero y componentes de muchos proveedores: los cinco primeros, el 8,3 % de las compras [B1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologación de años para 220-1.000 kV y referencias de servicio; pocos fabricantes de GIS de 1.000 kV en el mundo [B1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto del transformador ni de la aparamenta; el cambio es tecnológico (sin SF6, corriente continua) [B7]' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La inversión de la red china creció del ≈ 5 % anual a doble dígito en 2023-2024 y se frena: +5,1 % en 2025 y ≈ +1 % la de State Grid en 7M26 [B2, B8]. Fuera, el ciclo sigue al alza (déficit de inversión, centros de datos), pero EE. UU. cierra la puerta a los equipos chinos de alta tensión [B1, B3]. En 2008-09 y 2020 la red china fue contracíclica (estímulo) y las ventas de Sieyuan no cayeron; en 2022 crecieron un 21 % [B1]. El riesgo del ciclo es de precio en las licitaciones, no de volumen.' },
    regulacion: 'En China, el plan de equipos eléctricos 2025-2026 (MIIT, SAMR y NEA, septiembre de 2025) fija un crecimiento del 6 % anual para los equipos tradicionales y empuja las líneas de ultra alta tensión y el almacenamiento [B1]. En EE. UU., la orden ejecutiva 14420 del 26-ago-2026 declara una emergencia nacional sobre los equipos extranjeros del sistema de alta tensión (transformadores, interruptores, inversores y almacenamiento de 69 kV o más) y da al DOE 120 días (hasta el 24-dic-2026) para publicar las reglas de exclusión [B3, B4]. La UE estudia restricciones similares en inversores y equipos de red. El SF6 (gas de efecto invernadero) se restringe en la UE desde 2026 en media tensión, lo que obliga a nuevos diseños [B7].',
    tendencias: 'Tres cambios: corriente continua y equipos de red formadora (SVG y almacenamiento grid-forming), donde Sieyuan ganó pasatapas de ±800 kV y proyectos en Hunan; aparamenta sin SF6, en la que ya vende interruptores con aire comprimido; y la demanda de los centros de datos, a la que llega con supercondensadores y transformadores [B1, B7]. Gana con todas porque invierte el 6 % de las ventas en I+D. Pierde con el proteccionismo: los fabricantes coreanos (HD Hyundai, Hyosung) y europeos ocupan el hueco en EE. UU. [B3, B6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.81,
    posicion: '3.ª empresa privada del mercado chino de equipos de transmisión y distribución, con el 3,5 % en 2024 según Frost & Sullivan [B5]; ≈ 0,8 % de la inversión mundial en redes (estimación propia: 21.539 M CNY de ventas sobre ≈ 2,67 billones de CNY de 2025) [B1]',
    competidores: [
      { nombre: 'China XD Electric', pais: 'China', ticker: '601179.SS', ingresos: compEbit['China XD Electric'][0], cuota_pct: null, margen_ebit_pct: compEbit['China XD Electric'][1], comentario: 'Estatal (China Electrical Equipment Group); GIS y transformadores de UHV; compite en precio en State Grid [B6]' },
      { nombre: 'Pinggao Electric', pais: 'China', ticker: '600312.SS', ingresos: compEbit['Pinggao Electric'][0], cuota_pct: null, margen_ebit_pct: compEbit['Pinggao Electric'][1], comentario: 'Filial de State Grid; líder en GIS de 1.000 kV en China [B6]' },
      { nombre: 'XJ Electric', pais: 'China', ticker: '000400.SZ', ingresos: compEbit['XJ Electric'][0], cuota_pct: null, margen_ebit_pct: compEbit['XJ Electric'][1], comentario: 'Filial de State Grid; protección, convertidores de corriente continua [B6]' },
      { nombre: 'NARI Technology', pais: 'China', ticker: '600406.SS', ingresos: compEbit['NARI Technology'][0], cuota_pct: null, margen_ebit_pct: compEbit['NARI Technology'][1], comentario: 'Filial de State Grid; automatización y protección, rival en secundario [B6]' },
      { nombre: 'TBEA', pais: 'China', ticker: '600089.SS', ingresos: compEbit['TBEA'][0], cuota_pct: null, margen_ebit_pct: compEbit['TBEA'][1], comentario: 'Mayor fabricante chino de transformadores, con polisilicio y carbón dentro [B6]' },
      { nombre: 'HD Hyundai Electric', pais: 'Corea del Sur', ticker: '267260.KS', ingresos: compEbit['HD Hyundai Electric'][0], cuota_pct: null, margen_ebit_pct: compEbit['HD Hyundai Electric'][1], comentario: 'Transformadores para EE. UU. y Oriente Medio; gana con la exclusión de los chinos [B6]' },
      { nombre: 'Hyosung Heavy Industries', pais: 'Corea del Sur', ticker: '298040.KS', ingresos: compEbit['Hyosung Heavy Industries'][0], cuota_pct: null, margen_ebit_pct: compEbit['Hyosung Heavy Industries'][1], comentario: 'Transformadores y GIS con fábrica en Memphis (EE. UU.) [B6]' },
      { nombre: 'Siemens Energy', pais: 'Alemania', ticker: 'ENR.DE', ingresos: compEbit['Siemens Energy'][0], cuota_pct: null, margen_ebit_pct: compEbit['Siemens Energy'][1], comentario: 'Grid Technologies es líder mundial; el margen del grupo incluye eólica marina con pérdidas [B6]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: venta de equipos por licitación [B1]' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologación y referencias de servicio de varios años en alta tensión; el secundario (protección) se integra en el control de la red [B1]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: '1.033 patentes (376 de invención) y homologaciones en más de 100 países; 4.781 ingenieros [B1]' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBIT del 16,9 % en 2025 frente al 7-15 % de los rivales chinos estatales con la misma escala y precios de licitación [B6]' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Seis líneas de producto que comparten cliente y servicio, pero con el 3,5 % del mercado chino no fija precios [B5]' },
      ],
    },
    amenazas: 'Tres amenazas. La primera, la exclusión de los equipos chinos de alta tensión en EE. UU. (orden 14420, reglas antes del 24-dic-2026) y, si se extiende, en la UE: el exterior es el 29,5 % de las ventas del 1S26 y la parte de mayor crecimiento [B3, B4]. Probabilidad alta en EE. UU., media en Europa. La segunda, la nueva capacidad de transformadores en Europa, EE. UU. y Corea, que convierte a los chinos en proveedores marginales cuando la escasez termine (tesis de UBS, septiembre de 2026) [B8]. La tercera, el frenazo de la inversión de State Grid (+1 % en 7M26), que endurece los precios de licitación en China [B8].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'CDP (cambio climático)', calificacion: 'B', fecha: '2026-04' }],
    materialidad: 'Lo más material: el SF6 (gas con un potencial de calentamiento de miles de veces el CO₂) en la aparamenta de alta tensión; Sieyuan ya vende interruptores con mezcla de SF6 y nitrógeno al 30/70 y otros con aire seco [B7]. Las emisiones propias son pequeñas: 73.500 t de CO₂e en 2025, el 94 % de electricidad comprada [B7]. Seguridad laboral: sin accidentes mortales; 368 días perdidos por lesiones en 2025 [B7]. El negocio es en sí un habilitador de la transición: redes, almacenamiento y compensación para renovables [B1].',
    controversias: 'No se encuentran sanciones ni litigios relevantes en 2023-2026: el informe anual declara una situación de integridad buena de la empresa y del accionista de control, y el informe de sostenibilidad no recoge incidentes graves [B1, B7]. El riesgo reputacional viene de la geopolítica (orden ejecutiva de EE. UU.), no de conductas propias [B3].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Sieyuan Electric (思源电气), con sede en Shanghái, diseña y fabrica equipos para las redes eléctricas: aparamenta aislada en gas (GIS y GIL hasta 1.000 kV) e interruptores, transformadores de potencia hasta 750 kV y reactancias, transformadores de medida y pasatapas, protección y control de subestaciones, compensación de reactiva y filtros (SVG, condensadores síncronos estáticos), almacenamiento en baterías para plantas y supercondensadores, y construye subestaciones llave en mano (EPC) [B1]. Vende a State Grid y China Southern Grid, a generadoras, ferrocarril e industria, y a eléctricas de más de 100 países, con filiales en más de 20 (Brasil, Egipto, Zambia, España, Suiza) [B1]. Fabrica en Shanghái, Nantong, Changzhou, Wuxi y Rugao, con I+D también en Suiza; 11.007 empleados [B1].',
    como_gana_dinero: 'Vende equipos por pedido: gana la licitación, cobra un anticipo del 10-30 %, fabrica y entrega en 6-18 meses, y cobra el resto con la aceptación y una retención de garantía [B1]. Nada es recurrente por contrato, pero los pedidos (28.891 M en 2025) dan visibilidad de un año [B1]. El beneficio sale de la aparamenta y los transformadores (63 % de las ventas, margen bruto del 36-37 %); EPC y almacenamiento (18 %) aportan volumen con márgenes del 12 % [B1]. El margen depende del precio de licitación, del cobre y del acero, y de la mezcla; hay apalancamiento operativo porque la I+D y la estructura (13,6 % de las ventas) crecen menos que las ventas [B1]. Estacionalidad fuerte: el cuarto trimestre trae el 36 % de las ventas y la mitad de la caja.',
    confianza: 'Alta',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Informe anual y folleto de Hong Kong (no publica el CR5; el folleto ya no está en HKEX); 2) noticia de la solicitud con datos de Frost & Sullivan (solo la cuota de Sieyuan); 3) informes de analistas (Zhonghang, Soochow): cuotas por producto en licitaciones de State Grid, no del mercado', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota de cada competidor', tipo: 'Complemento', intentos: '1) Informes anuales de los rivales (sin cuota); 2) Frost & Sullivan vía prensa (solo Sieyuan); 3) licitaciones de State Grid por producto (no comparables con el mercado total)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: '2025年年度报告: consejo, directivos, remuneraciones, accionistas, auditor, compromisos', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-04-18', url: `${CN}/2026-04-18/1225117829.PDF` },
  { id: 2, titulo: '关于董事会完成换届选举及聘任高级管理人员等相关事宜的公告 (9.º consejo, 26-jun-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-06-27', url: `${CN}/2026-06-27/1225393424.PDF` },
  { id: 3, titulo: '2025年度股东会决议公告 (votaciones de la junta del 26-jun-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-06-27', url: `${CN}/2026-06-27/1225393420.PDF` },
  { id: 4, titulo: '关于高级管理人员减持计划期限届满暨实施情况的公告 (venta de 20.000 acciones a 200,5 CNY por Zhang Liangdong)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-09-05', url: `${CN}/2026-09-05/1225548098.PDF` },
  { id: 5, titulo: '关于董事兼高级管理人员减持计划期限届满暨实施情况的公告 (Yang Zhihua no vendió)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-10-16', url: `${CN}/2026-10-16/1225606407.PDF` },
  { id: 6, titulo: '2026年半年度报告: accionistas a 30-jun-2026', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-08-15', url: `${CN}/2026-08-15/1225473691.PDF` },
  { id: 7, titulo: '2021-2024年年度报告: objetivos anuales de pedidos y ventas y su cumplimiento', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2025-04-19', url: `${CN}/2025-04-19/1223145398.PDF` },
  { id: 8, titulo: '关于公司首次公开发行境外上市外资股(H股)并在香港联合交易所有限公司主板上市方案的公告', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2025-12-16', url: `${CN}/2025-12-16/1224878252.PDF` },
  { id: 9, titulo: '关于向香港联合交易所有限公司递交H股发行上市的申请并刊发申请资料的公告 (solicitud del 11-feb-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-02-12', url: `${CN}/2026-02-12/1224977532.PDF` },
  { id: 10, titulo: 'Listado de solicitudes de salida a bolsa activas (Main Board), actualizado el 15-oct-2026: Sieyuan no figura', editor: 'HKEXnews', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www1.hkexnews.hk/ncms/json/eds/appactive_app_sehk_e.json' },
  { id: 11, titulo: '高级管理人员股份减持计划的预披露公告 y 董事兼高级管理人员股份减持计划的预披露公告 (avisos de venta de mayo y junio de 2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-06-25', url: `${CN}/2026-06-25/1225385724.PDF` },
  { id: 12, titulo: '2022年年度报告 y 2021年年度报告: objetivos y resultados de 2021-2023', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2023-04-15', url: `${CN}/2023-04-15/1216417256.PDF` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Dong Zengping (董增平)', cargo: 'Presidente y consejero delegado', desde: '2004', participacion_pct: 16.80, trayectoria: 'Cofundador en 1993; en la empresa desde entonces. Bajo su mando las ventas pasaron de 8.695 M (2021) a 21.539 M (2025) y la exportación del 16 % al 27 % [C1].' },
      { nombre: 'Chen Bangdong (陈邦栋)', cargo: 'Vicepresidente', desde: '2007', participacion_pct: 12.32, trayectoria: 'Cofundador en 1993; fue presidente y director general; hoy vicepresidente sin cargo ejecutivo de primer nivel [C1, C2].' },
      { nombre: 'Yang Zhihua (杨帜华)', cargo: 'Consejero y director general adjunto', desde: '2021', participacion_pct: 0.07, trayectoria: 'En el grupo desde 2000 (ventas); dirige filiales de aparamenta. Anunció la venta de 130.000 acciones en junio de 2026 y no vendió [C2, C5].' },
      { nombre: 'Yang Zherong (杨哲嵘)', cargo: 'Director financiero y secretario del consejo', desde: '2020', participacion_pct: 0.02, trayectoria: 'Director financiero desde octubre de 2020; firma las cuentas y lleva la relación con inversores [C1].' },
      { nombre: 'Zhang Liangdong (章良栋)', cargo: 'Director general adjunto, ventas internacionales', desde: '2023', participacion_pct: 0.02, trayectoria: 'En Sieyuan desde 2012 en el negocio exterior; con él la exportación pasó de 2.158 M (2023) a 5.803 M (2025). Vendió 20.000 acciones a 200,5 CNY el 22-jun-2026 [C1, C4].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Pedidos 10.000 M; ventas 8.500 M', real: 'Pedidos 10.369 M; ventas 8.695 M', cumplida: 'Sí' },
      { anio: '2022', guia: 'Pedidos 11.900 M; ventas 10.000 M', real: 'Pedidos 12.122 M; ventas 10.537 M', cumplida: 'Sí' },
      { anio: '2023', guia: 'Pedidos 15.800 M; ventas 12.600 M', real: 'Pedidos 16.513 M; ventas 12.460 M', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Pedidos 20.600 M; ventas 15.000 M', real: 'Pedidos 21.457 M; ventas 15.458 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Pedidos 26.800 M; ventas 18.500 M', real: 'Pedidos 28.891 M; ventas 21.539 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Pedidos 37.500 M (+30 %); ventas 27.000 M (+25 %)', real: '1S26: ventas 10.795 M (+27 %); pedidos no publicados', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y creíble: los dos fundadores dirigen desde 1993, la cúpula se renovó en junio de 2026 sin cambios en los puestos ejecutivos y la empresa cumplió o superó sus objetivos de pedidos en 2021-2025 (ventas, cuatro de cinco) [C2, C7, C12]. Los objetivos son de pedidos y ventas, no de beneficio: la dirección no promete márgenes. No hay plan de sucesión público: el presidente es también consejero delegado y tiene 56 años [C1]. Los directivos han vendido poco y a precios altos (20.000 acciones a 200,5 CNY); en la caída de agosto-octubre no hubo compras de directivos [C4, C5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Dong Zengping', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2004', comisiones: 'Estrategia' },
      { nombre: 'Chen Bangdong', cargo: 'Vicepresidente', tipo: 'Dominical', desde: '2007', comisiones: 'Estrategia' },
      { nombre: 'Yang Zhihua', cargo: 'Consejero, director general adjunto', tipo: 'Ejecutivo', desde: '2021', comisiones: null },
      { nombre: 'Qin Zhengyu', cargo: 'Consejero (director financiero de Shanghai Zijiang)', tipo: 'Otro externo', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Qiu Yufeng', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2023', comisiones: 'Nombramientos y retribuciones' },
      { nombre: 'Ai Qian', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Chen Shiyun', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría (presidenta, previsiblemente: la ley exige un independiente experto contable)' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.63, voto_remuneracion_contra_pct: 0.01, voto_remuneracion_contra_libre_pct: 0.02, voto_cupula_pct: 90.09,
    remuneracion_ceo: { anio: '2025', total: 5.80, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: null },
    remuneracion: 'El presidente y consejero delegado cobró 5,80 M CNY en 2025; el conjunto del consejo y la alta dirección, 21,3 M [C1]. El variable se fija con un «contrato de resultados» anual (PPC) por KPI que la empresa no detalla, sin diferimiento ni cláusula de recuperación [C1]. El incentivo a largo plazo son opciones (plan de 2023, 445 beneficiarios, precio de ejercicio de 43,80 CNY) con objetivos de crecimiento de ventas o beneficio, no de ROIC ni de rentabilidad para el accionista [C1]. En China la remuneración de los directivos no se vota; la junta del 26-jun-2026 aprobó la retribución de los consejeros con el 96,6 % a favor y un 0,01 % en contra [C3].',
    accionistas: [
      { nombre: 'Dong Zengping (presidente y consejero delegado)', pct: 16.80, tipo: 'Fundador, accionista de control', variacion: 'Sin cambios en 2024-2026' },
      { nombre: 'Chen Bangdong (vicepresidente)', pct: 12.32, tipo: 'Fundador', variacion: 'Sin cambios' },
      { nombre: 'Hong Kong Securities Clearing (inversores de Stock Connect)', pct: 19.86, tipo: 'Nominatario de inversores extranjeros', variacion: '21,99 % a dic-2025 → 19,86 % a jun-2026 (−16,6 M acciones)' },
      { nombre: 'Yang Xiaoqiang', pct: 3.25, tipo: 'Particular (exconsejero)', variacion: 'Estable' },
      { nombre: 'Fondos índice CSI 300 (Huatai-PineBridge, E Fund, ChinaAMC)', pct: 2.98, tipo: 'Fondos', variacion: 'Estable' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Autocartera', variacion: 'La recompra de 2025 no compró acciones' },
    ],
    insiders: [
      { fecha: '2026-06-22', persona: 'Zhang Liangdong (director general adjunto)', operacion: 'Venta', acciones: 20000, importe: 4.01 },
    ],
    control_y_defensas: 'Los dos fundadores suman el 29,1 % y el presidente es el accionista de control declarado; no hay pacto parasocial publicado entre ellos [C1]. Una acción, un voto; sin clases. Las operaciones vinculadas son pequeñas y no hay uso de fondos por el accionista [C1]. La salida a bolsa en Hong Kong (plan de diciembre de 2025, solicitud del 11-feb-2026) habría añadido una clase H; la solicitud no figura entre las activas de HKEX en octubre de 2026 (caduca a los seis meses) y la empresa no ha anunciado una nueva [C8, C9, C10]. El 19,9 % en manos de inversores de Stock Connect es el mayor bloque libre y el más volátil: vendió 16,6 M acciones en el 1S26 [C6].',
    alertas: [
      'Presidente y consejero delegado a la vez y accionista de control; sin consejero coordinador [C1].',
      'Auditor local con 25 años seguidos [C1].',
      'Ventas de directivos en junio de 2026 a 200,5 CNY (pequeñas: 20.000 acciones) [C4].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'desglose fijo/variable de la remuneración', tipo: 'Complemento', intentos: '1) Informe anual 2025 (solo total); 2) material de la junta 2025 (solo dietas de los consejeros); 3) folleto de Hong Kong (retirado de HKEX)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de 002028.SZ, 510300.SS (CSI 300) y 159326.SZ (ETF de equipos de red), hasta el 19-oct-2026 (herramientas/bolsa.mjs y movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/002028.SZ/history' },
  { id: 2, titulo: 'Sieyuan Electric: finances (estimaciones 2026-2028) y consensus (12 analistas, objetivo medio 209,54 CNY)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/SIEYUAN-ELECTRIC-CO-LTD-6498002/consensus/' },
  { id: 3, titulo: 'Listado de informes de analistas de 002028 con BPA previsto (abril-agosto de 2026)', editor: 'Eastmoney (东方财富研报中心)', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://data.eastmoney.com/report/stock.jshtml?code=002028' },
  { id: 4, titulo: 'Soochow Securities: punto de vista del 1S26 (beneficio 2026-2028e 4.069/5.558/7.601 M; objetivo 213 CNY)', editor: 'Soochow Securities', tipo: 'Analistas', fecha: '2026-08-17', url: 'https://pdf.dfcfw.com/pdf/H3_AP202608171828066150_1.pdf' },
  { id: 5, titulo: 'Curva de la deuda pública china (中债国债收益率曲线), 19-oct-2026: 10 años 1,6497 %', editor: 'ChinaBond (中央国债登记结算)', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://yield.chinabond.com.cn/' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Fichas y estimaciones (earningsTrend) de los comparables, 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 8, titulo: 'List of SZSE Securities / China Connect Securities (eligible for both buy and sell), actualizado el 16-oct-2026: 002028 Sieyuan Electric, n.º 393', editor: 'HKEX', tipo: 'Primaria', fecha: '2026-10-16', url: 'https://www.hkex.com.hk/-/media/HKEX-Market/Mutual-Market/Stock-Connect/Eligible-Stocks/View-All-Eligible-Securities_xls/SZSE_Securities.xls' },
  { id: 9, titulo: 'Calendario de publicación (预约披露): informe del 3T26 previsto el 24-oct-2026', editor: 'CNINFO', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.cninfo.com.cn/new/information/getPrbookInfo' },
  { id: 10, titulo: '思源电气暴跌背后: rebaja de UBS (21-sep-2026, de compra a neutral, objetivo 142 CNY), orden 14420 y caída del 22-sep', editor: '凤凰网财经 (ifeng)', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://finance.ifeng.com/c/8wfqgRdljhO' },
  { id: 11, titulo: '中国基金报: los equipos de transmisión caen en bloque; Sieyuan en límite a la baja (27-ago-2026)', editor: 'Eastmoney / China Fund News', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://finance.eastmoney.com/a/202608273856134687.html' },
  { id: 12, titulo: 'Lista de operaciones de la bolsa de Shenzhen (龙虎榜) del 27-ago-2026: desviación de −11,72 %', editor: 'Eastmoney', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://finance.eastmoney.com/a/202608273856377737.html' },
  { id: 13, titulo: '关于公司股价异常波动的公告 (subida del 20,62 % en dos sesiones, 16 y 19-ene-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-01-20', url: `${CN}/2026-01-20/1224940381.PDF` },
  { id: 14, titulo: '2025年度业绩快报 (avance de resultados de 2025, 16-ene-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-01-16', url: `${CN}/2026-01-16/1224935414.PDF` },
  { id: 15, titulo: '2026年半年度业绩快报 (avance del 1S26, 10-jul-2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-07-11', url: `${CN}/2026-07-11/1225420017.PDF` },
  { id: 16, titulo: '2026年半年度报告 (balance a 30-jun-2026 para el puente; acciones 782,57 M)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-08-15', url: `${CN}/2026-08-15/1225473691.PDF` },
  { id: 17, titulo: 'Sinolink Securities (国金证券): nota del avance del 1S26', editor: 'Sinolink Securities', tipo: 'Analistas', fecha: '2026-07-12', url: 'https://pdf.dfcfw.com/pdf/H3_AP202607121826911344_1.pdf' },
  { id: 18, titulo: 'Executive order bans foreign-produced transformers, inverters and circuit breakers for U.S. power grid', editor: 'pv magazine', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.pv-magazine.com/2026/08/27/executive-order-bans-foreign-produced-transformers-inverters-and-circuit-breakers-for-u-s-power-grid/' },
  { id: 19, titulo: '2025年度权益分派实施公告 (dividendo de 547,7 M pagado en julio de 2026)', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-07-01', url: `${CN}/2026-07-01/1225399910.PDF` },
  { id: 20, titulo: '2023年股票期权激励计划: 6.198.750 opciones a 43,80 CNY en el tercer periodo', editor: 'Sieyuan Electric (CNINFO)', tipo: 'Primaria', fecha: '2026-08-05', url: `${CN}/2026-08-05/1225458421.PDF` },
];
const bo = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const compsD = comps.empresas.filter((e) => !/control/.test(e.nombre) && e.ticker !== 'GEV').map((e) => ({
  nombre: e.ticker === '688676.SS' ? 'Jinpan Technology' : e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null,
  per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct,
}));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Sieyuan Electric Co., Ltd. (思源电气股份有限公司)', nombre_corto: 'Sieyuan', ticker: '002028', isin: 'CNE000001KQ8', mercado: 'Bolsa de Shenzhen (acciones A; comprable desde fuera vía Shenzhen-Hong Kong Stock Connect)', indice_referencia: 'CSI 300',
    pais: 'China', pais_iso: 'CN', sector: 'Industria', industria: 'Equipos eléctricos', sede: 'Shanghái', fundacion: '1993', empleados: 11007, web: 'www.sieyuan.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 786.6, capitalizacion_publicada: 97900, free_float_pct: 70.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s,
    volumen_medio_diario: `≈ ${Math.round(bolsa.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M CNY/día (3 meses)`, proximos_resultados: '2026-10-24',
  },
  consenso: {
    guidance: 'Objetivos de 2026 publicados con las cuentas de 2025 (17-abr-2026): pedidos de 37.500 M CNY sin IVA (+30 %) y ventas de 27.000 M (+25 %), sin objetivo de beneficio [A1, D16]. No los ha cambiado en el semestral del 14-ago: las ventas del 1S26 (10.795 M, +27 %) van en línea con el objetivo, el 40 % del año, como en 2025 (39 %) [D16]. No hay plan a medio plazo publicado; el plan de la salida a bolsa en Hong Kong hablaba de financiar la capacidad exterior.',
    estimaciones: [
      { periodo: '2026e', ingresos: 28209, ebitda: 5135, ebit: 4807, bpa: 5.18, dpa: 0.94, fuente: 'MarketScreener (12 analistas), 19-oct-2026 [D2]' },
      { periodo: '2027e', ingresos: 36420, ebitda: 6862, ebit: 6478, bpa: 7.03, dpa: 1.26, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 46216, ebitda: 8747, ebit: 8322, bpa: 9.01, dpa: 1.60, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 12, comprar: 11, mantener: 1, vender: 0, po_medio: 209.54, po_min: 142.0, po_max: 266.0 },
    revisiones: 'Las estimaciones bajan desde abril: el BPA de 2026e de Soochow pasó de 5,89 (19-abr) a 5,37 (14-jul) y 5,20 (17-ago); el de Sinolink, de 5,90 a 5,29; el de 2027e, de 8,16-8,25 a 7,10-7,66 [D3, D4]. Motivos: pérdidas de cambio, la mezcla de EPC y almacenamiento de margen bajo y la salida del 20 % de Sieyuan Toshiba [D4, D17]. El 21-sep UBS rebajó a neutral con objetivo de 142 CNY y recortó el beneficio del sector en 2026-2028 entre un 3 % y un 66 % [D10]. Recomendaciones por tipo: estimación propia a partir de las notas de Eastmoney (todas compra o sobreponderar salvo UBS) [D3]. Solo MarketScreener da el consenso completo; Yahoo (5 analistas) da 5,11 para 2026e y 6,77 para 2027e [D7].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual.filter((a) => +a.anio >= 2017),
    beta: bo.beta, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'Sieyuan multiplicó su precio por cinco en cinco años (+26,9 % anual con dividendos frente al −1,3 % del CSI 300) gracias a un beneficio que creció un 27 % anual [D1]. 2025 fue el año fuerte (+114 %): exportación +86 % y beneficio +54 % [D1]. En 2026 va −18,7 % (CSI 300 −8,5 %): tras tocar 239,12 CNY el 6-mar, perdió casi la mitad por la desaceleración del beneficio del 2T26, la orden ejecutiva de EE. UU. del 26-ago y la rebaja de UBS del 21-sep [D1, D10]. El ETF de equipos de red (159326.SZ) está plano en el año: la caída es sobre todo de Sieyuan y de los exportadores [D1]. La beta de 5 años (0,69) subestima el riesgo de hoy: la semanal de 2 años es 1,09 [D1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -7.5, var_3m_pct: -22.8, var_6m_pct: -40.5, var_12m_pct: 19.7, dist_max_52s_pct: -46.4, dist_min_52s_pct: 21.7, dist_max_historico_pct: -46.4, tendencia: 'bajista', volatilidad_60d_pct: 54.0, avisos: ['P5 Un 30 % por debajo de la media de 200 sesiones (tendencia bajista)'] },
      movimientos_fuertes: [
        { periodo: 'ene-2026', var_pct: 28.3, causa: 'Avance de resultados de 2025 (16-ene): beneficio +54 %; dos límites al alza (16 y 19-ene, +20,62 % acumulado) y aviso de volatilidad anormal sin hechos ocultos [D13, D14]', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-2026', var_pct: -15.0, causa: 'Del máximo de 216 CNY (1-jun) a 173 CNY (30-jun): recogida de beneficios en el sector tras la junta, ventas anunciadas de directivos (aviso del 24-jun) y temor a una salida a bolsa en Hong Kong con descuento [D1, D10]', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -10.9, causa: 'Avance del 1S26 (10-jul): beneficio solo +15 % por pérdidas de cambio y la salida del 20 % de Sieyuan Toshiba [D15, D17]', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-2026', var_pct: -21.8, causa: 'Del 183,15 (17-ago, tras el semestral) a 143,18 (28-ago): límite a la baja el 27-ago, día siguiente a la orden ejecutiva 14420 de EE. UU. que permite excluir transformadores e interruptores chinos de 69 kV o más; todo el sector cayó (Jinpan y Mingyang −7 %) [D11, D12, D18]', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-2026', var_pct: -15.9, causa: 'Rebaja de UBS a neutral (21-sep, objetivo 142 CNY: nueva capacidad occidental, riesgo de la UE e inversión de State Grid +1 % en 7M26); −7,55 % el 22-sep con salida de 3.090 M de fondos institucionales [D10]', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-24', tipo: 'resultados', hecho: 'Informe del 3T26 previsto el 24-oct-2026 [D9]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-12-24', tipo: 'demanda o regulador', hecho: 'El DOE de EE. UU. debe publicar antes del 24-dic-2026 las reglas de la orden 14420 (exclusión de equipos de alta tensión de 24 países) [D18]', veredicto: 'no cambia', condicion: 'El caso base ya supone EE. UU. cerrado; se revisaría si la UE adopta una medida similar' },
        { fecha: '2026-09-21', tipo: 'recomendación', hecho: 'UBS rebaja de compra a neutral con objetivo de 142 CNY [D10]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-12', tipo: 'ampliación o convertible', hecho: 'La solicitud de salida a bolsa en Hong Kong (11-feb-2026) caducó sin renovar; la junta de diciembre de 2025 aprobó el plan y podría volver a presentarse (dilución de una ampliación H) [C9, C10]', veredicto: 'no cambia', condicion: 'Una nueva solicitud con descuento sobre la A abriría un retraso hasta fijar el precio' },
        { fecha: '2026-10-15', tipo: 'directivos', hecho: 'Ventas de directivos: 20.000 acciones a 200,5 CNY el 22-jun (Zhang Liangdong); Yang Zhihua no ejecutó su plan de 130.000 (vence el 15-oct) [C4, C5]', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-10', tipo: 'fusión u oferta', hecho: 'Toshiba ejerce la opción de 2018 y sube al 30 % de Sieyuan Toshiba por 100 CNY: el beneficio atribuido pierde el 20 % del de esa filial [D15]', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-24',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La caída del 48 % desde el máximo intradía de 239,12 CNY (6-mar) hasta 125,10 tiene tres causas con fecha: un beneficio del 2T26 que solo creció un 8 % (cambio y Toshiba), la orden ejecutiva de EE. UU. del 26-ago y la rebaja de UBS del 21-sep, con el inversor de Stock Connect vendiendo [D1, D10, D15, D18]. Todas están ya en el caso base (exportación más lenta, margen estable, 70 % de Sieyuan Toshiba). No hay colocaciones, ampliaciones con fecha ni litigios pendientes; la salida a bolsa en Hong Kong está parada. El 3T26 (24-oct) puede mover el precio, pero los resultados cercanos no retrasan una decisión (regla 11).',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierre[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2021' })),
    comentario: 'Con el precio de cierre de cada año y el beneficio de los doce meses anteriores, Sieyuan cotizó en 2022-2024 entre 24 y 28 veces y en 2021 a 31 veces (año de burbuja del sector, excluido) [D1]. A 125,10 CNY cotiza a unas 23 veces el beneficio LTM y a unas 25 veces nuestro beneficio de 2026e: por debajo de su historia y del cierre de 2025 (39 veces). El cambio estructural es doble: el crecimiento exterior que justificó la prima de 2025 está en duda por la orden de EE. UU., y el tipo chino a 10 años está en el 1,65 %, que sostiene múltiplos altos [D5, D18].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes de equipos de alta tensión y de redes: cuatro estatales chinos que compiten con Sieyuan en las licitaciones de State Grid (XD, Pinggao, XJ, NARI), dos privados chinos (Jinpan, Huaming), TBEA, tres coreanos que ganan cuota en EE. UU. (HD Hyundai Electric, Hyosung Heavy, LS Electric) y Siemens Energy. Fuera GE Vernova: su EBITDA de los últimos doce meses (7 %) y un BPA estimado que baja de 2026 a 2027 por partidas extraordinarias distorsionan los múltiplos. Hitachi no entra: Hitachi Energy es una parte del conglomerado. Todas las cifras de Yahoo al 19-oct-2026, en millones de CNY al cambio del día; EV/EBITDA NTM sin dato gratuito [D7].',
    empresas: compsD,
    comentario: 'Sieyuan cotiza a 3,9 veces ventas y 21,6 veces el EBITDA LTM, con el mejor margen EBITDA de los chinos generalistas (18 % frente al 10-17 %) y un ROIC del 20 % [D7]. Los estatales chinos cotizan a 15-30 veces el BPA NTM con crecimientos del 18-24 %; los coreanos, a 16-34 veces con crecimientos del 24-35 % y acceso a EE. UU. [D7]. La prima de Sieyuan en EV/EBITDA frente a los chinos se justifica por margen y ROIC; frente a los coreanos no, porque ellos tienen la puerta de EE. UU. abierta. El PER es el múltiplo útil (la caja neta distorsiona el EV de las estatales).',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo', tipo: 'Complemento', intentos: '1) Operaciones del sector en 2019-2026 (Hitachi-ABB Power Grids, compra del 19,9 % restante en 2022): el comunicado no da EBITDA del perímetro; 2) compras chinas (烯晶碳能 por Sieyuan, 2023): sin EBITDA publicado; 3) prensa: múltiplos con sinergias o de una parte, no comprobables en la nota oficial', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bolsa de Shenzhen (solo saldo de préstamo de valores, no posición corta); 2) Eastmoney (saldo de financiación 953 M, no cortos); 3) HKEX Stock Connect (sin ventas en corto en A)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Guba de Eastmoney, foro de 002028 (思源电气吧): unos 300 mensajes del 13 al 19-oct-2026', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://guba.eastmoney.com/list,002028.html' },
  { id: 2, titulo: 'Guba de Eastmoney: hilos de análisis del sector con debate (盈利能力最强的10家公司, 电力设备的周期, 美电力禁令预期边际缓和)', editor: 'Eastmoney Guba', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://guba.eastmoney.com/list,002028.html' },
  { id: 3, titulo: 'Comentarios de lectores y artículo de opinión en Fenghuang Finance sobre la caída del 22-sep', editor: '凤凰网财经 (ifeng)', tipo: 'Foros y redes', fecha: '2026-09-23', url: 'https://finance.ifeng.com/c/8wfqgRdljhO' },
  { id: 4, titulo: 'Sohu Finance: nota de mercado del 12-oct-2026 (−20,4 % en el año) con comentarios', editor: 'Sohu', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://sohu.com/a/1086603710_122014422' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Guba de Eastmoney (foro de 002028)', fecha: '2026-10', n_comentarios: 300, tono: 'Negativo', resumen: 'Particulares atrapados a 140-220 CNY que hablan de recuperar lo perdido; culpan al inversor extranjero de Stock Connect («el gran bajista del norte») de la caída y celebran el rebote del 19-oct (+6 %) como «rebote técnico» [E1].' },
      { plataforma: 'Guba de Eastmoney (hilos sectoriales)', fecha: '2026-10', n_comentarios: 60, tono: 'Dividido', resumen: 'Debate sobre si el ciclo de los equipos de red ha llegado a su punto alto y sobre un posible alivio de la prohibición de EE. UU.; algunos esperan buenos resultados del 3T26 porque los directivos no vendieron [E2].' },
      { plataforma: 'Fenghuang Finance (artículo y lectores)', fecha: '2026-09', n_comentarios: 40, tono: 'Negativo', resumen: 'La rebaja de UBS se lee como el final de la tesis de exportación; los minoristas compraron casi 6.000 M en dos días mientras salían los institucionales [E3].' },
      { plataforma: 'Sohu Finance', fecha: '2026-10', n_comentarios: 15, tono: 'Negativo', resumen: 'Resumen de la caída del año (−20 %) y de los últimos 60 días (−19 %), con lectores pesimistas sobre el 4T [E4].' },
    ],
    temas: [
      { tema: 'Venta del inversor extranjero (Stock Connect)', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en parte: Hong Kong Securities Clearing bajó del 21,99 % al 19,86 % en el 1S26; no hay dato oficial del 3T todavía [C6].' },
      { tema: 'Prohibición de equipos chinos en EE. UU.', postura: 'Dividida', peso: 'Alto', contraste: 'La orden 14420 es real y las reglas llegan antes del 24-dic; EE. UU. no figura entre los mercados que Sieyuan cita como destino principal, lo que limita el efecto directo [B3].' },
      { tema: 'Resultados del 3T26 (24-oct)', postura: 'Dividida', peso: 'Medio', contraste: 'Los anticipos (3.829 M) y las existencias en máximos apuntan a un 2S26 de entregas; el riesgo es el margen y el cambio [A6].' },
      { tema: 'Valoración tras la caída', postura: 'Alcista', peso: 'Bajo', contraste: 'A 125 CNY cotiza a unas 25 veces el beneficio de 2026e, por debajo de su historia; el análisis lo comprueba en la sección de valoración.' },
    ],
    lectura: 'El sentimiento de los particulares es de capitulación: muchos compraron por encima de 150 CNY y hablan de vender en cualquier rebote, mientras los analistas siguen casi todos en compra con un objetivo medio de 209,54 CNY [E1, D2]. Esa distancia entre minoristas atrapados y analistas que tardan en recortar es típica del final de una caída, pero no es una señal: la causa (la orden de EE. UU. y la rebaja de UBS) es fundamental. Los foros no aportan un riesgo que el informe no tenga; confirman que el vendedor marginal es el extranjero de Stock Connect.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'plataformas internacionales', tipo: 'Complemento', intentos: '1) Seeking Alpha (sin cobertura de 002028); 2) Reddit y Stocktwits (403 o sin hilos); 3) Xueqiu (requiere sesión)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
