// Escribe las notas A-E de ADP (corte 2026-10-15) a partir del XBRL de la SEC (tmp/facts.json, companyfacts),
// los documentos de EDGAR descargados en notas/docs, bolsa.json, form4.json, MarketScreener/Stock Analysis
// y los informes de Paychex (12-oct) y Paycom (15-oct) del repo (comparables y transacciones).
// Cada nota cita con [n] de su propia lista de fuentes. Ejecutar: node informes/adp-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = lee('bolsa.json');
const F4 = lee('form4.json');
const FACTS = lee('tmp/facts.json').facts['us-gaap'];
const SEC = 'https://www.sec.gov/Archives/edgar/data/8670';
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);

// ---- Serie anual del XBRL (10-K, ejercicios a 30 de junio)
function serie(concepto) {
  const f = FACTS[concepto]; if (!f) return {};
  const out = {};
  for (const x of Object.values(f.units)[0]) {
    if (!x.form?.startsWith('10-K')) continue;
    if (!/-06-(28|29|30)$/.test(x.end)) continue;
    if (x.start) { const d = (new Date(x.end) - new Date(x.start)) / 864e5; if (d < 350 || d > 380) continue; }
    const fy = x.end.slice(0, 4);
    if (!out[fy] || x.filed > out[fy].filed) out[fy] = { v: x.val, filed: x.filed };
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, Math.abs(v.v) > 1000 ? v.v / 1e6 : v.v]));
}
const S = Object.fromEntries([
  'Revenues', 'CostOfGoodsAndServicesSold', 'SellingGeneralAndAdministrativeExpense', 'InterestExpense', 'InvestmentIncomeInterest',
  'IncomeLossFromContinuingOperationsBeforeIncomeTaxesDomestic', 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesForeign',
  'IncomeTaxExpenseBenefit', 'NetIncomeLoss', 'EarningsPerShareDiluted', 'WeightedAverageNumberOfDilutedSharesOutstanding',
  'CommonStockDividendsPerShareDeclared', 'DepreciationDepletionAndAmortization', 'NetCashProvidedByUsedInOperatingActivities',
  'PaymentsToAcquireOtherPropertyPlantAndEquipment', 'PaymentsToAcquireIntangibleAssets', 'PaymentsToAcquireBusinessesNetOfCashAcquired',
  'PaymentsForRepurchaseOfCommonStock', 'PaymentsOfDividends', 'ProceedsFromSaleOfPropertyPlantAndEquipment', 'CapitalizedContractCostNet',
  'IncreaseDecreaseInContractWithCustomerAsset', 'CapitalizedContractCostAmortization',
  'Assets', 'AssetsCurrent', 'LiabilitiesCurrent', 'Liabilities', 'Goodwill', 'IntangibleAssetsNetExcludingGoodwill', 'PropertyPlantAndEquipmentNet',
  'AccountsReceivableNetCurrent', 'AccountsPayableCurrent', 'CashAndCashEquivalentsAtCarryingValue', 'DebtCurrent', 'LongTermDebtNoncurrent',
  'StockholdersEquity', 'RetainedEarningsAccumulatedDeficit',
].map((c) => [c, serie(c)]));
const ANIOS = ['2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];
const P = (y) => `FY${y}`;
// Gastos no recurrentes dentro del EBITDA (positivo = gasto), de las conciliaciones de ADP [4]: FY2026 programa de alineación (91,1),
// acuerdo legal (18,0), reversión de optimización (−4,5); FY2025 optimización (19,4) y reversión de reserva legal (−0,4).
const NOREC = { 2025: 16.4, 2026: 96.2 };

const cuenta = ANIOS.map((y) => {
  const bai = r1(S.IncomeLossFromContinuingOperationsBeforeIncomeTaxesDomestic[y] + S.IncomeLossFromContinuingOperationsBeforeIncomeTaxesForeign[y]);
  const fin = r1(S.InvestmentIncomeInterest[y] - S.InterestExpense[y]);
  const ebit = r1(bai - fin);
  const am = r1(S.DepreciationDepletionAndAmortization[y]);
  return {
    periodo: P(y), ingresos: r1(S.Revenues[y]), coste_ventas: r1(S.CostOfGoodsAndServicesSold[y]), gastos_generales: r1(S.SellingGeneralAndAdministrativeExpense[y]),
    ebitda: r1(ebit + am), amortizaciones: am, ebit, resultado_financiero: fin, bai, impuestos: r1(S.IncomeTaxExpenseBenefit[y]), minoritarios: 0,
    beneficio_neto: r1(S.NetIncomeLoss[y]), gastos_financieros: r1(S.InterestExpense[y]), participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[y] ?? null,
    bpa: S.EarningsPerShareDiluted[y], dpa: S.CommonStockDividendsPerShareDeclared[y], dpa_extraordinario: 0, acciones_diluidas: r1(S.WeightedAverageNumberOfDilutedSharesOutstanding[y]),
  };
});

const balance = ANIOS.map((y) => ({
  periodo: P(y), activo_total: r1(S.Assets[y]), activo_corriente: r1(S.AssetsCurrent[y]), pasivo_corriente: r1(S.LiabilitiesCurrent[y]), pasivo_total: r1(S.Liabilities[y]),
  fondo_comercio: r1(S.Goodwill[y]), intangibles: r1(S.IntangibleAssetsNetExcludingGoodwill[y]), inmovilizado_material: r1(S.PropertyPlantAndEquipmentNet[y]),
  existencias: 0, clientes: r1(S.AccountsReceivableNetCurrent[y]), proveedores: r1(S.AccountsPayableCurrent[y]), activos_contrato: null, pasivos_contrato: null,
  caja: r1(S.CashAndCashEquivalentsAtCarryingValue[y]), deuda_financiera: r1((S.LongTermDebtNoncurrent[y] ?? 0) + (S.DebtCurrent[y] ?? 0)), arrendamientos: 0,
  patrimonio_neto: r1(S.StockholdersEquity[y]), minoritarios: 0, reservas: r1(S.RetainedEarningsAccumulatedDeficit[y]),
}));

// Capex = inmovilizado + software e intangibles + aumento neto de los costes de contrato activados (comisiones e implantación; lección de software).
const ccNeto = (y) => {
  if (S.IncreaseDecreaseInContractWithCustomerAsset[y] != null) return S.IncreaseDecreaseInContractWithCustomerAsset[y] - S.CapitalizedContractCostAmortization[y];
  const prev = String(Number(y) - 1);
  if (S.CapitalizedContractCostNet[y] != null && S.CapitalizedContractCostNet[prev] != null) return Math.max(0, S.CapitalizedContractCostNet[y] - S.CapitalizedContractCostNet[prev]);
  return 0;
};
const flujos = ANIOS.map((y) => ({
  periodo: P(y), flujo_operativo: r1(S.NetCashProvidedByUsedInOperatingActivities[y]),
  capex: r1(S.PaymentsToAcquireOtherPropertyPlantAndEquipment[y] + S.PaymentsToAcquireIntangibleAssets[y] + ccNeto(y)),
  pagos_arrendamientos: 0, adquisiciones: r1(S.PaymentsToAcquireBusinessesNetOfCashAcquired[y] ?? 0), desinversiones: r1(S.ProceedsFromSaleOfPropertyPlantAndEquipment[y] ?? 0),
  dividendos: r1(S.PaymentsOfDividends[y]), recompras: r1(S.PaymentsForRepurchaseOfCommonStock[y]), emision_acciones: 0, intereses_en_financiacion: 0,
}));

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 30 de junio de 2026', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000000867026000030/adp-20260630.htm` },
  { id: 2, titulo: 'ADP: series XBRL de los 10-K y 10-Q (companyfacts)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000008670.json' },
  { id: 3, titulo: 'ADP Reports Fourth Quarter and Fiscal 2026 Results; Provides Fiscal 2027 Outlook (anexo 99 del 8-K)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000000867026000025/q4fy26exhibit99.htm` },
  { id: 4, titulo: 'ADP Reports Third Quarter Fiscal 2026 Results (anexo 99 del 8-K)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-29', url: `${SEC}/000000867026000016/q3fy26exhibit99.htm` },
  { id: 5, titulo: 'ADP Reports Second Quarter Fiscal 2026 Results (anexo 99 del 8-K)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-01-28', url: `${SEC}/000000867026000006/q2fy26exhibit99.htm` },
  { id: 6, titulo: 'ADP Reports First Quarter Fiscal 2026 Results (anexo 99 del 8-K)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-29', url: `${SEC}/000000867025000042/q1fy26exhibit99.htm` },
  { id: 7, titulo: 'ADP Fourth Quarter Fiscal 2026 Earnings Call (transcripción editada de LSEG)', editor: 'Automatic Data Processing, Inc.', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://s205.q4cdn.com/887941133/files/doc_financials/2026/q4/ADP-Transcript-4QFY26.pdf' },
  { id: 8, titulo: '8-K: crédito sindicado de 364 días (5.700 M USD) y crédito a cinco años (3.500 M USD)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-06-26', url: `${SEC}/000095014226001884/eh260799361_8k.htm` },
  { id: 9, titulo: '8-K: emisión de bonos sénior al 5,00 % con vencimiento en 2036', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-07', url: `${SEC}/000119312526212131/d932558d8k.htm` },
];

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26 (FY2026)', fecha_fin: '2026-06-30', ingresos: 21947.4, ebitda: cuenta[9].ebitda, ebit: cuenta[9].ebit, beneficio_neto: 4413.5, bpa: 10.94, dpa: 6.64, dpa_extraordinario: 0, fcf: 4776.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 96.2 },
    cambios_perimetro: [],
    comentario: 'ADP creció de 12.372,0 M USD de ingresos en FY2017 a 21.947,4 M en FY2026 (ejercicio a 30 de junio), un 6,6 % anual, y su BPA diluido de 3,97 a 10,94 USD, un 11,9 % anual, porque al crecimiento se suman el margen y la recompra de acciones (de 450,3 a 403,3 millones diluidas) [1, 2]. Casi todo es orgánico: en FY2026 el crecimiento fue del 7 % publicado y del 6 % orgánico a tipo de cambio constante; la compra de WorkForce Software (octubre de 2024) aportó un punto en FY2025 [3]. Tres motores: (1) **Employer Services** (14.831,4 M, +7 %), con nuevas ventas de 2.200 M (+6 %), retención del 92,1 % y una subida de precio de algo más de 1,3 puntos [3, 7]; (2) el **PEO** (7.128,1 M, +7 %), del que 4.607,3 M son primas de salud repercutidas sin margen [3]; (3) los **intereses de los fondos de clientes**, 1.354,8 M (+14 %), con un saldo medio de 40.400 M y una rentabilidad del 3,4 % [3]. El margen antes de impuestos subió del 25,8 % al 26,1 % y el EBIT ajustado de la empresa del 26,0 % al 26,8 % [3].',
    ajustes: 'Usamos las cifras GAAP. El EBIT de este informe es el beneficio antes de impuestos más los gastos por intereses menos los ingresos por intereses de la caja corporativa: así la financiación a corto de la estrategia de fondos de clientes (318,3 M de gasto en FY2026) y la renta de las inversiones corporativas a plazo (278,1 M) quedan en el resultado financiero, no en el EBIT; el EBIT ajustado de ADP (5.874,6 M) las deja dentro y por eso es 40 M menor que el nuestro sin partidas únicas [3]. Partidas que no se repiten, dentro del EBITDA: en FY2026, 91,1 M del programa de alineación de la organización (89,1 M de indemnizaciones), 18,0 M netos de un acuerdo legal y −4,5 M de reversión de la optimización de plantilla de FY2024-2025; en FY2025, 19,4 M de optimización y −0,4 M de reversión de una reserva legal [3]. Fuera del EBITDA quedan las ganancias de ADP Ventures (8,4 M) y de venta de activos. El BPA ajustado de ADP (11,12 USD en FY2026) no excluye los pagos en acciones ni la amortización de intangibles comprados: es casi GAAP y lo usamos como BPA normalizado [3]. FY2018 lleva el efecto de la reforma fiscal (tipo del 17,4 %) [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T25', ingresos: 4832.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(1232.5 + 138.6), margen_ebitda_pct: r1((1232.5 + 138.6) / 4832.7 * 100), bpa: 2.34, vs_consenso: null },
      { periodo: '2T25', ingresos: 5048.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(1272.0 + 151.1), margen_ebitda_pct: r1((1272.0 + 151.1) / 5048.4 * 100), bpa: 2.35, vs_consenso: null },
      { periodo: '3T25', ingresos: 5553.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: r1(1629.7 + 147.0), margen_ebitda_pct: r1((1629.7 + 147.0) / 5553.0 * 100), bpa: 3.06, vs_consenso: null },
      { periodo: '4T25', ingresos: 5126.8, crecimiento_pct: 8.0, crecimiento_organico_pct: 6.0, ebitda: r1(1212.9 + 145.7), margen_ebitda_pct: r1((1212.9 + 145.7) / 5126.8 * 100), bpa: 2.23, vs_consenso: null },
      { periodo: '1T26', ingresos: 5175.2, crecimiento_pct: r1((5175.2 / 4832.7 - 1) * 100), crecimiento_organico_pct: 6.0, ebitda: r1(1318.3 + 146.7), margen_ebitda_pct: r1((1318.3 + 146.7) / 5175.2 * 100), bpa: 2.49, vs_consenso: null },
      { periodo: '2T26', ingresos: 5359.3, crecimiento_pct: r1((5359.3 / 5048.4 - 1) * 100), crecimiento_organico_pct: 5.0, ebitda: r1(1392.8 + 145.6), margen_ebitda_pct: r1((1392.8 + 145.6) / 5359.3 * 100), bpa: 2.62, vs_consenso: null },
      { periodo: '3T26', ingresos: 5939.2, crecimiento_pct: r1((5939.2 / 5553.0 - 1) * 100), crecimiento_organico_pct: 6.0, ebitda: r1(1791.5 + 146.4), margen_ebitda_pct: r1((1791.5 + 146.4) / 5939.2 * 100), bpa: 3.38, vs_consenso: 'Superior' },
      { periodo: '4T26', ingresos: 5473.8, crecimiento_pct: r1((5473.8 / 5126.8 - 1) * 100), crecimiento_organico_pct: 6.0, ebitda: r1(1372.0 + 147.2), margen_ebitda_pct: r1((1372.0 + 147.2) / 5473.8 * 100), bpa: 2.45, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Trimestres del ejercicio fiscal de ADP (1T26 = julio-septiembre de 2025). EBITDA de la tabla: EBIT ajustado de la empresa más amortizaciones del estado de flujos; BPA diluido GAAP [3-6]. El 4T26 (29-jul-2026) cerró el año en la parte alta de la guía: ingresos +7 %, EBIT ajustado +13 % con 140 pb más de margen y BPA ajustado de 2,64 USD (+17 %) [3]. La guía de FY2027 es de un +5-6 % de ingresos, 70-90 pb más de margen EBIT ajustado y un BPA ajustado +9-11 %, con unos intereses de fondos de clientes de 1.540-1.560 M (rentabilidad del 3,7 %, porque el mercado descuenta subidas de 25-50 pb de la Fed) [3, 7]. El mensaje de la consejera delegada cambió de tono: en vez de defenderse del miedo a la IA, la presentó como la razón por la que el cliente necesita a ADP, con agentes de ADP Assist disponibles para casi todos sus 1,1 millones de clientes desde enero de 2026 [7]. Los analistas preguntaron por Lyric (clientes vivos +94 %), por el precio (más de 130 pb de crecimiento por precio, frente a los 100 pb del día del inversor de 2025) y por cómo cobrará la IA; la respuesta a esto último fue vaga: «a través de las nuevas ventas, la retención y el precio» [7]. Nadie obtuvo una cifra de ingresos por IA ni de plantilla propia.',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2027', importe: 1.0 }, { anio: '2028', importe: 1000 }, { anio: '2029', importe: 0 }, { anio: '2030', importe: 1000 }, { anio: '2031', importe: 0 }, { anio: '2032+', importe: 3000.8 }],
    liquidez: 'Caja corporativa de 4.230,1 M USD a 30-jun-2026; créditos comprometidos no dispuestos de 11.700 M (364 días por 5.700 M hasta junio de 2027 y dos a cinco años por 2.500 M y 3.500 M hasta junio de 2030) y 7.500 M comprometidos en repos para la financiación a corto de los fondos de clientes [1, 8].',
    rating: 'Grado de inversión «fuerte» a largo plazo y papel comercial de máxima calidad, según el 10-K (sin nota concreta en el documento)',
    coste_deuda_pct: 3.6,
    vida_media_anios: 5.9,
    otros_pasivos: 'Los fondos de clientes (43.957,8 M USD a 30-jun-2026) y sus obligaciones (44.415,5 M) inflan el activo y el pasivo corrientes; la diferencia de 457,7 M son sobre todo minusvalías latentes de la cartera de renta fija (459,2 M antes de impuestos), que se recuperan al vencer los títulos: quedan fuera de la caja y de la deuda del puente [1, 3]. La financiación a corto de la estrategia de fondos (papel comercial y repos: 0 y 139,3 M al cierre; 7.800 M de saldo medio en FY2026) se casa con inversiones corporativas de igual importe y no se cuenta como deuda [1, 3]. Los arrendamientos operativos (306,7 M a largo plazo) no van a la deuda porque su gasto está en el EBITDA (US GAAP) [1]. El PEO asume riesgos de seguro de accidentes de trabajo (ADP Indemnity) y de desempleo estatal: 718,4 M de coste en FY2026 [3]. Demanda colectiva laboral de sus propios agentes de atención (septiembre de 2026, fase de demanda) [E2].',
    comentario: 'La deuda financiera son cinco bonos de 1.000 M cada uno (1,70 % a 2028, 1,25 % a 2030, 4,75 % a 2032, 4,45 % a 2034 y 5,00 % a 2036, este emitido en mayo de 2026 para financiar recompras) [1, 9]. Con 4.230,1 M de caja corporativa, la deuda neta es de 735 M, unas 0,1 veces el EBITDA [1]. El circulante comercial es estable: clientes de 3.521,1 M (16 % de las ventas, incluye cuentas del PEO) frente a proveedores de 162,5 M; los pasivos devengados (4.257,9 M de gastos y nóminas devengados) y los ingresos diferidos (653,4 M) lo compensan en buena parte [1]. El patrimonio neto es pequeño (6.031,2 M) porque ADP ha recomprado 240,9 millones de acciones a un coste de 23.165,9 M: por eso el ROE (73 %) no sirve para medir la rentabilidad del negocio [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasó de 2.125,9 M USD en FY2017 a 5.441,2 M en FY2026 y cubre con holgura el capex, que incluye el software desarrollado (468,5 M en FY2026), el inmovilizado (196,6 M) y el aumento neto de los costes de contrato activados (comisiones e implantación: 1.307,9 M activados frente a 1.200,5 M amortizados, 107,4 M netos) [1, 3]. El flujo libre de FY2026 fue de 4.776,1 M (sin el aumento neto de comisiones activadas), un 108 % del beneficio neto [3]. El capex es casi todo de mantenimiento y desarrollo de producto (estimación propia: 3,0-3,5 % de las ventas); las compras son pequeñas salvo WorkForce Software (1.160,6 M netos en FY2025) [1]. Uso de la caja en FY2026: 2.626,3 M de dividendos y 2.083,3 M de recompras (8,6 millones de acciones), más de lo que generó, con 985,7 M de bonos nuevos [3, 7]. Los años con flujo raro (FY2022 y FY2024) se deben a los impuestos y al calendario de las nóminas de fin de ejercicio.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 58, opinion: 'Favorable',
    comentario: 'Deloitte audita a ADP desde 1968, con opinión favorable sobre las cuentas y el control interno de FY2026 [1]. Tres asuntos contables: (1) **costes de contrato activados** (3.244,1 M de balance): comisiones e implantación que se amortizan en 3-8 años según la retención histórica; su aumento neto (107,4 M en FY2026) es gasto en caja que no pasa por la cuenta, y lo sumamos al capex [1, 3]; (2) **software desarrollado**: 468,5 M activados en FY2026 frente a 384,8 M de amortización de intangibles; la nueva plataforma se amortiza en diez años, un plazo largo [1]; (3) **pagos en acciones** de 242,6 M (1,1 % de las ventas), que van en la cuenta como coste, también en el BPA ajustado de ADP [3]. El tipo efectivo es estable (22-23 %) desde FY2019 [2]. Indicadores del motor: el Altman Z y el Piotroski salen distorsionados por los fondos de clientes, que multiplican por diez el activo corriente; el Beneish no da alarma.',
    senales: [
      { senal: 'Activación de costes de contrato y de software', nivel: 'Baja', comentario: 'Unos 3,5 % de las ventas al año entre software e intangibles y comisiones; estable frente a la historia y consistente con la retención [1, 2].' },
      { senal: 'Minusvalías latentes de 459,2 M en la cartera de fondos de clientes', nivel: 'Baja', comentario: 'Bonos de alta calidad comprados con tipos bajos; se recuperan al vencimiento, salvo que hubiera que venderlos para atender pagos (no ha ocurrido) [1].' },
      { senal: 'Programa de alineación de 91,1 M en el 4T26', nivel: 'Baja', comentario: 'Indemnizaciones; ADP suele hacer recortes de plantilla cada 2-3 años (FY2024-2025 y FY2026), así que no es del todo excepcional [3].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 1,70 USD desde noviembre de 2025 (6,80 USD anualizados, 2,4 % al precio de hoy), con más de 50 años seguidos de subidas y la subida anual en noviembre [3]. Autorización de recompra de 6.000 M USD; la dirección prevé seguir en FY2027 al ritmo elevado de los últimos trimestres con el dinero de los bonos de mayo de 2026 y la caja sobrante [7]. Compras pequeñas y complementarias (WorkForce Software, 1.173,1 M en 2024). Mantener el rating alto es una prioridad declarada, porque financia la estrategia de los fondos de clientes con papel comercial [1].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'WorkForce Software (gestión del tiempo global)', importe: 1173.1, ev_ebitda: null, financiacion: 'Caja', resultado: 'Restó unos 20 pb de margen a Employer Services durante el primer año; las ventas de tiempo global subieron en FY2026 [7].' },
      { anio: 'FY2018', objetivo: 'WorkMarket, Global Cash Card y The Marcus Buckingham Company', importe: 612.4, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas; sin deterioros del fondo de comercio desde entonces [1, 2].' },
      { anio: 'FY2019', objetivo: 'Celergo (nómina global)', importe: 125.5, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la nómina global [2].' },
    ],
    comentario: 'ADP devuelve al accionista más de lo que gana: entre FY2017 y FY2026 pagó unos 18.000 M USD en dividendos y unos 14.000 M en recompras, y el número de acciones bajó de 450,3 a 403,3 millones (−1,2 % al año) [2]. Lo hace sin comprometer el balance (deuda neta de 0,1 veces el EBITDA) y sin compras grandes: el fondo de comercio (3.284,4 M) es pequeño frente a un beneficio de 4.413,5 M, y no ha habido deterioros [1]. La recompra se aceleró justo cuando la acción cayó por el miedo a la IA (2.083,3 M en FY2026 frente a 1.280,5 M), lo que juzgamos una buena asignación: compró a 190-260 USD [3, 7]. El punto débil es el crecimiento comprado: WorkForce Software se pagó caro (más de 1.100 M sin cifras publicadas) y ADP ya no crece por encima del 5-6 % orgánico.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Employer Services', descripcion: 'Nóminas, RR. HH., tiempo, beneficios, cumplimiento, jubilación y seguros, de pymes a multinacionales; incluye los intereses de los fondos de clientes', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 12980.8, resultado: 4555.5 }, { periodo: 'FY2025', ingresos: 13883.1, resultado: 5008.5 }, { periodo: 'FY2026', ingresos: 14831.4, resultado: 5436.8 }] },
      { nombre: 'PEO Services (ADP TotalSource)', descripcion: 'Coempleo: ADP es empleador legal de los trabajadores del cliente y ofrece seguros de salud y de accidentes', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 6233.6, resultado: 921.5 }, { periodo: 'FY2025', ingresos: 6690.4, resultado: 950.5 }, { periodo: 'FY2026', ingresos: 7128.1, resultado: 936.1 }] },
      { nombre: 'Otros y eliminaciones', descripcion: 'Gastos corporativos no asignados, intereses corporativos y eliminaciones', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: -11.8, resultado: -604.7 }, { periodo: 'FY2025', ingresos: -12.6, resultado: -648.9 }, { periodo: 'FY2026', ingresos: -12.1, resultado: -642.6 }] },
    ],
    geografias: [{ nombre: 'EE. UU.', peso_pct: 87.8 }, { nombre: 'Europa, Oriente Medio y África', peso_pct: 7.9 }, { nombre: 'Canadá', peso_pct: 2.4 }, { nombre: 'Otros', peso_pct: 1.9 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Retención de ingresos de clientes (Employer Services)', valor_anterior: '92,1 % (FY2025)', valor_actual: '92,1 % (FY2026)', variacion: '0 pb', comentario: 'Cerca del récord; la guía de FY2027 prevé −10 a −30 pb [3].' },
      { kpi: 'Empleados por cliente en EE. UU. («pays per control»)', valor_anterior: '+1 % (FY2025)', valor_actual: '+1 % (FY2026)', variacion: 'Estable', comentario: 'Guía FY2027: 0 a +1 % [3].' },
      { kpi: 'Nuevas ventas de Employer Services', valor_anterior: '≈2.100 M USD', valor_actual: '2.200 M USD (FY2026)', variacion: '+6 %', comentario: 'Guía FY2027: +4-7 % [3].' },
      { kpi: 'Saldo medio de fondos de clientes', valor_anterior: '37.600 M USD (FY2025)', valor_actual: '40.400 M USD (FY2026)', variacion: '+7 %', comentario: 'Rentabilidad del 3,2 % al 3,4 %; guía del 3,7 % en FY2027 [3].' },
      { kpi: 'Empleados medios en el PEO', valor_anterior: '748.000 (FY2025)', valor_actual: '762.000 (FY2026)', variacion: '+2 %', comentario: 'Guía FY2027: ≈+2 % [3].' },
      { kpi: 'Clientes', valor_anterior: '≈1,1 millones', valor_actual: 'Más de 1,1 millones (FY2026)', variacion: null, comentario: 'Ningún cliente pesa más del 2 % [1].' },
    ],
  },
  fuentes: fA,
  huecos: [{ seccion: 'trimestres', campo: 'items.crecimiento_pct (1T25-3T25)', tipo: 'Complemento', intentos: '1) notas de resultados de FY2026 (solo comparan con FY2025); 2) companyfacts de la SEC (sin ingresos trimestrales en el concepto Revenues); 3) notas de FY2025 no descargadas por tiempo', decision: 'Omitido' }],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio cerrado el 30 de junio de 2026', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000000867026000030/adp-20260630.htm` },
  { id: 2, titulo: 'ADP Reports Fourth Quarter and Fiscal 2026 Results; Provides Fiscal 2027 Outlook (anexo 99 del 8-K)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000000867026000025/q4fy26exhibit99.htm` },
  { id: 3, titulo: 'ADP Fourth Quarter Fiscal 2026 Earnings Call (transcripción)', editor: 'Automatic Data Processing, Inc.', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://s205.q4cdn.com/887941133/files/doc_financials/2026/q4/ADP-Transcript-4QFY26.pdf' },
  { id: 4, titulo: 'Paychex, Inc. Form 10-K del ejercicio cerrado el 31 de mayo de 2026', editor: 'Paychex, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-17', url: 'https://www.sec.gov/Archives/edgar/data/723531/000119312526307785/payx-20260531.htm' },
  { id: 5, titulo: 'Paychex, presentación a inversores de la compra de Paycor (8-K, anexo 99.2)', editor: 'Paychex, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-07', url: 'https://www.sec.gov/Archives/edgar/data/723531/000095010325000267/dp223210_ex9902.htm' },
  { id: 6, titulo: 'Total Revenue for Payroll Services, Employer Firms (REVEF541214TAXABL)', editor: 'U.S. Census Bureau vía FRED', tipo: 'Sectorial', fecha: '2024-01-31', url: 'https://fred.stlouisfed.org/series/REVEF541214TAXABL' },
  { id: 7, titulo: 'All Employees, Total Private (USPRIV)', editor: 'U.S. Bureau of Labor Statistics vía FRED', tipo: 'Sectorial', fecha: '2026-10', url: 'https://fred.stlouisfed.org/series/USPRIV' },
  { id: 8, titulo: 'Paycom Software, Form 10-K de 2025 y 10-Q del 2T26 (datos del informe value del repo, 15-oct-2026)', editor: 'Paycom Software, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.sec.gov/Archives/edgar/data/1590955/000119312526338010/payc-20260630.htm' },
  { id: 9, titulo: 'Paylocity Holding, datos XBRL del Form 10-K de FY2026 (junio)', editor: 'SEC EDGAR (companyfacts)', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001591698.json' },
  { id: 10, titulo: 'Workday, datos XBRL del Form 10-K de FY2026 (enero de 2026)', editor: 'SEC EDGAR (companyfacts)', tipo: 'Primaria', fecha: '2026-03-06', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001327811.json' },
  { id: 11, titulo: 'TriNet Group, Form 10-K de 2025', editor: 'TriNet (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-12', url: 'https://www.sec.gov/Archives/edgar/data/937098/000093709826000010/tnet-20251231.htm' },
  { id: 12, titulo: 'Dayforce Enters into US$12.3 Billion Definitive Agreement with Thoma Bravo (anexo 99.1 del 8-K)', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-21', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000119312525184632/d949165dex991.htm' },
  { id: 13, titulo: 'Paycom lays off 500 employees, will replace jobs with AI', editor: 'KGOU', tipo: 'Prensa', fecha: '2025-10-01', url: 'https://www.kgou.org/business-and-economy/2025-10-01/paycom-lays-off-500-employees-will-replace-jobs-with-ai' },
];

const B = {
  historia: {
    resumen: 'ADP nació en 1949 en Nueva Jersey como Automatic Payrolls, un servicio de nóminas hechas a mano para pequeñas empresas; adoptó máquinas de tarjetas perforadas y, en los años sesenta, ordenadores, y salió a bolsa en 1961 [1]. En siete décadas pasó de procesar nóminas a vender todo el ciclo de gestión de personal: RR. HH., tiempo, beneficios, jubilación, seguros y el coempleo (PEO, ADP TotalSource) [1]. Dos decisiones la definen: la escisión de su negocio de servicios a intermediarios financieros (Broadridge, 2007) y de concesionarios de automóviles (CDK, 2014), que la dejaron como empresa pura de HCM, y la defensa frente al fondo activista Pershing Square en 2017, que exigía recortar costes y acelerar la nube [1]. Desde 2023 la dirige Maria Black, en la casa desde 1996, con la nueva plataforma global Lyric y la IA (ADP Assist) como apuestas [1, 3].',
    hitos: [
      { anio: '1949', hito: 'Fundación como Automatic Payrolls en Nueva Jersey [1].' },
      { anio: '1961', hito: 'Salida a bolsa [1].' },
      { anio: '2007', hito: 'Escisión de Broadridge (servicios a intermediarios financieros) [1].' },
      { anio: '2014', hito: 'Escisión de CDK Global (software para concesionarios) [1].' },
      { anio: '2017', hito: 'Pershing Square pierde la batalla por tres puestos en el consejo [1].' },
      { anio: '2023', hito: 'Maria Black, consejera delegada; Carlos Rodríguez deja la presidencia ejecutiva [1].' },
      { anio: '2024', hito: 'Compra de WorkForce Software por 1.173,1 M USD [1].' },
      { anio: '2026', hito: 'Agentes de IA de ADP Assist para casi todos los clientes; bonos de 1.000 M al 5 % para recomprar acciones [1, 3].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'ADP es el mayor proveedor de nóminas y gestión de personal (HCM) del mundo: más de 1,1 millones de clientes en más de 140 países y unos 67.000 empleados [1, 2]. Vende tres cosas: (1) **programas en la nube** (RUN para pequeñas empresas; Workforce Now, usado por más de 90.000 empresas medianas y grandes de Norteamérica; Vantage y Lyric para grandes empresas y multinacionales) [1]; (2) **servicios de externalización** de nóminas, impuestos, beneficios, cumplimiento y RR. HH. (ADP COS para grandes empresas), y jubilación y seguros vendidos a la misma base [1]; (3) **coempleo (PEO)**, en el que ADP es empleador legal de 775.000 trabajadores de sus clientes y les da acceso a seguros de salud de gran empresa [2]. Vende con una red comercial propia muy grande y por canales (asesores fiscales, bancos, socios) [1].',
    como_gana_dinero: 'Cobra cuotas por empleado y por proceso de nómina, módulos y servicios; en el PEO, un porcentaje de la masa salarial más las primas de seguros, de las que 4.607,3 M USD se repercuten sin margen [2]. Es casi todo recurrente: la retención de ingresos de Employer Services es del 92,1 % y la relación media con el cliente dura unos 13 años (6 en el PEO) [1, 2]. El tercer pilar es el **flotante**: ADP cobra la nómina y los impuestos antes de pagarlos y guarda un saldo medio de 40.400 M, que le rindió 1.354,8 M en FY2026 (el 6,2 % de las ventas, casi sin coste) [2]. El margen depende de la plantilla de servicio y comercial (el gasto comercial de Employer Services fue de 2.365,7 M, el 16 % de sus ventas), de los tipos de interés y del empleo de los clientes: cobra más cuando crece la plantilla de sus clientes [1, 2].',
    clientes: 'No hay concentración: ningún cliente o grupo pesa más del 2 % de los ingresos [1]. Los contratos son por presupuesto o acuerdos de servicio, algunos de 2-7 años, pero la mayoría renovables; la retención de ingresos de Employer Services se mantuvo en el 92,1 % en FY2026, cerca del récord, y la del PEO mejoró pese a la subida del coste sanitario [2, 3]. **Poder de precios demostrado**: el precio aportó algo más de 1,3 puntos al crecimiento de Employer Services en FY2026, por encima del punto previsto en el día del inversor de 2025, con la retención estable; la dirección habla de «precio basado en valor» [3]. Los clientes grandes tardan de seis a nueve meses (más de dos años en multinacionales) en implantar el sistema, lo que eleva el coste de cambio [1].',
  },
  sector: {
    definicion: 'El mercado relevante es la externalización de nóminas, el software de gestión de personal (HCM) y los servicios de RR. HH. y coempleo (PEO), sobre todo en EE. UU. (88 % de las ventas de ADP) [1, 2]. No hay una cifra oficial del mercado entero: el Census Bureau publica los ingresos de las empresas de servicios de nóminas de EE. UU. (NAICS 541214), que solo miden el núcleo de nóminas externalizadas y terminan en 2022 [6]; Paychex estima su mercado direccionable en pymes en más de 100.000 M USD, contando PEO, jubilación y seguros [5]. Se usa la serie del Census para la tendencia y las cuentas de los cotizados para la competencia; la cuota de ADP en el mercado amplio no se puede medir con una fuente.',
    tamano: '27.589 M USD de ingresos de las empresas de servicios de nóminas de EE. UU. en 2022 (Census, solo el núcleo de nóminas) [6]; más de 100.000 M USD de mercado direccionable de pymes según Paychex (enero de 2025) [5].',
    unidad_serie: 'millones de USD (ingresos de las empresas de servicios de nóminas de EE. UU., NAICS 541214, Census)',
    serie: [{ anio: '2017', tamano: 21946 }, { anio: '2018', tamano: 21794 }, { anio: '2019', tamano: 23929 }, { anio: '2020', tamano: 24637 }, { anio: '2021', tamano: 26729 }, { anio: '2022', tamano: 27589 }],
    tcac_historico_pct: 4.7, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Empleo privado de EE. UU.', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El empleo privado creció un 0,5 % en el año a septiembre de 2026 (135,7 millones) [7]; los empleados por cliente de ADP, un 1 % en FY2026, con guía de 0-1 % [2].' },
      { driver: 'Tipos de interés a corto y medio plazo', efecto: '+/−', horizonte: 'Cíclico', evidencia: '1.354,8 M USD de intereses de fondos en FY2026; 25 pb en toda la curva mueven unos 21 M de beneficio antes de impuestos en 12 meses (10 M si solo se mueven los cortos) [1].' },
      { driver: 'Complejidad normativa laboral y fiscal', efecto: '+', horizonte: 'Estructural', evidencia: 'ACA, impuestos federales, estatales y locales, leyes de privacidad y ahora de IA: empujan a externalizar y favorecen al que tiene escala de cumplimiento [1].' },
      { driver: 'Paso a la nube y a plataformas globales', efecto: '+', horizonte: 'Estructural', evidencia: 'Clientes vivos de Lyric +94 % y cartera de oportunidades +50 % en FY2026 [3].' },
      { driver: 'IA y automatización del trabajo administrativo', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Reduce el coste de servicio de ADP y abre módulos nuevos, pero puede reducir plantillas de oficina (cobro por empleado) y abaratar la entrada de rivales; Paycom despidió a ~500 personas en 2025 atribuyéndolo a la IA [3, 13].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Mercado «muy competitivo» con ADP, Paychex-Paycor, Paycom, Paylocity, Workday, UKG, Dayforce (privada), Rippling y Gusto, pero márgenes antes de impuestos del 26-39 % en los grandes (ADP 26,1 %, Paychex 38,6 %) [1, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Más de 1,1 millones de clientes y ninguno por encima del 2 %; cambiar de nómina es arriesgado y lento (6-9 meses en grandes empresas) [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El coste principal es la plantilla propia; en el PEO, las aseguradoras de salud trasladan su inflación (4.607,3 M repercutidos) [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Rippling, Deel y Gusto entran con capital riesgo y producto moderno en pymes y medianas; la custodia de 40.000 M de fondos y el cumplimiento en 140 países exigen escala [1, 2].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'ERP con módulo de HCM (Workday, SAP, Oracle), nómina integrada en programas contables (Intuit) y, a futuro, agentes de IA que hagan tareas de RR. HH. [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El empleo privado de EE. UU. crece poco (+0,5 % en el año a septiembre de 2026) [7] y los empleados por cliente de ADP suben un 1 % [2]. En 2008-10 los ingresos de servicios de nóminas del Census cayeron un 14 % [6] y ADP perdió ingresos en FY2010; en 2020 el empleo privado cayó un 6 % y los ingresos de ADP crecieron un 3,4 % en FY2020 (14.589,8 M) y otro 2,8 % en FY2021, con el PEO y el precio compensando [6, 7]. En 2022-2023 la subida de tipos disparó los intereses de los fondos (de unos 500 M a 1.354,8 M en FY2026) [2]. Hoy el mercado descuenta subidas de 25-50 pb de la Fed en FY2027 [3].' },
    regulacion: 'ADP está sujeta a leyes de privacidad (estatales en EE. UU., RGPD con normas corporativas vinculantes en Europa), a la Fair Credit Reporting Act en sus verificaciones de antecedentes, a la regulación bancaria de ADP Trust Bank y del dinero de clientes, y a licencias estatales y certificación de Hacienda para el PEO [1]. La Affordable Care Act y los cambios fiscales (créditos por contratación) afectan a sus servicios de cumplimiento [1]. La regulación de la IA (Ley de IA de la UE desde agosto de 2026, normas estatales en EE. UU. sobre IA en contratación) obliga a gobernar los modelos que usan datos de personal: el 10-K la incluye en sus riesgos de cumplimiento [1, 3].',
    tendencias: 'Tres tendencias: (1) **IA**: ADP la usa en ventas, servicio y desarrollo (todos sus programadores con herramientas de IA) y vende agentes (ADP Assist) dentro de su producto; su argumento es que la IA cambia tareas y no elimina empleos «a escala», y que los datos de nóminas de millones de trabajadores le dan ventaja [3]; el riesgo es que reduzca plantillas de oficina y abarate el software [13]; (2) **plataformas globales** para multinacionales (Lyric, nómina global), donde ADP gana cuota frente a Workday y SAP [3]; (3) **competidores con capital riesgo** en pymes (Rippling, Gusto, Deel), con producto moderno y precios agresivos [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Líder mundial de nóminas y HCM: con 21.947,4 M USD de ingresos en FY2026 triplica a Paychex (6.512 M) y supera a Workday (9.552 M) [2, 4, 10]. Paga a uno de cada seis trabajadores del sector privado de EE. UU. según su propio informe de empleo (no verificado aquí con fuente) y es el segundo PEO por empleados tras Insperity en EE. UU. (estimación de NAPEO no consultada). Más de 90.000 empresas medianas y grandes usan Workforce Now en Norteamérica, más que cualquier otro programa de su categoría [1].',
    competidores: [
      { nombre: 'Paychex (con Paycor)', pais: 'EE. UU.', ticker: 'PAYX', ingresos: 6512.0, cuota_pct: null, margen_ebit_pct: 38.6, comentario: 'Segundo en pymes; compró Paycor (medianas) por ~4.100 M en 2025; crecimiento orgánico de ~5 % [4].' },
      { nombre: 'Workday', pais: 'EE. UU.', ticker: 'WDAY', ingresos: 9552, cuota_pct: null, margen_ebit_pct: 7.5, comentario: 'HCM y finanzas para grandes empresas; rival de Vantage y Lyric [10].' },
      { nombre: 'Paycom Software', pais: 'EE. UU.', ticker: 'PAYC', ingresos: 2051.7, cuota_pct: null, margen_ebit_pct: 27.6, comentario: 'Empresas medianas; una sola base de datos y automatización (Beti, IWant); crecimiento del 7-8 % en 2026 [8].' },
      { nombre: 'Paylocity', pais: 'EE. UU.', ticker: 'PCTY', ingresos: 1771.3, cuota_pct: null, margen_ebit_pct: 21.8, comentario: 'Empresas medianas; ingresos +11,0 % en FY2026 [9].' },
      { nombre: 'TriNet', pais: 'EE. UU.', ticker: 'TNET', ingresos: 5010, cuota_pct: null, margen_ebit_pct: 4.3, comentario: 'PEO puro; empleados medios −5 % en 2025 [11].' },
      { nombre: 'Rippling', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada con capital riesgo; RR. HH., TI y gastos en una plataforma; ataca pymes y medianas.' },
      { nombre: 'Dayforce', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comprada por Thoma Bravo por 12.300 M USD (cerrada en febrero de 2026); medianas y grandes [12].' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Débiles: el mercado de aplicaciones (ADP Marketplace) y los datos agregados de millones de nóminas mejoran el producto, pero un cliente no gana por que haya otros [1, 3].' },
      { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Retención del 92,1 % y relación media de 13 años; implantaciones de 6-9 meses (más de dos años en multinacionales); un error de nómina es muy visible para la plantilla [1, 2].' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca de confianza para el dinero de los empleados; ADP Trust Bank y licencias de PEO; normas corporativas vinculantes del RGPD que «la mayoría de competidores no puede ofrecer» [1].' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Escala de servicio y cumplimiento repartida entre 1,1 millones de clientes; margen de Employer Services del 36,7 % [2].' },
      { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Saldo medio de fondos de 40.400 M que rinde 1.354,8 M sin coste; red comercial y de socios que ningún rival iguala; nóminas en 140 países [2].' },
    ] },
    amenazas: 'Cuatro amenazas: (1) **IA**, de dos formas: menos empleados de oficina en los clientes (ADP cobra por empleado) y agentes de IA que hagan tareas de RR. HH. que hoy hace el servicio de ADP; probabilidad media a cinco años, con efecto gradual [3, 13]; (2) **competidores con capital riesgo** (Rippling, Gusto, Deel) en pymes, donde la retención es más baja; probabilidad media [1]; (3) **bajada de tipos**: los intereses de los fondos son el 6,2 % de las ventas y casi todo margen; el escalonamiento de la cartera lo amortigua (21 M por 25 pb al año) [1, 2]; (4) **coste sanitario** en el PEO, que ya restó 110 pb de margen en FY2026 [2]. Ninguna cambia el foso a corto plazo: la retención está en máximos.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Para ADP pesan tres asuntos: (1) **seguridad y privacidad de datos** de decenas de millones de trabajadores (salarios, cuentas bancarias, números de la Seguridad Social): un fallo grande dañaría la confianza, que es su producto [1]; (2) **IA responsable**: usa datos de personal para entrenar y aplicar modelos y debe cumplir la Ley de IA de la UE y las normas estatales sobre IA en contratación [1, 3]; (3) **capital humano**: 67.000 empleados, muchos de servicio, en plena automatización con IA y con recortes de plantilla en FY2024-2026 (91,1 M de indemnizaciones en el 4T26) [1, 2].',
    controversias: 'Sin sanciones relevantes de reguladores publicadas en los últimos tres años; un acuerdo legal con un cargo neto de 18,0 M USD en FY2026 [2]. En septiembre de 2026 se presentó una demanda colectiva laboral de sus agentes de atención por tiempo de conexión no pagado (fase de demanda), según la prensa jurídica.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) 10-K de ADP (no da cuota ni mercado direccionable); 2) Census NAICS 541214 (solo nóminas, hasta 2022; ADP factura más que todo ese núcleo porque incluye PEO, software y fuera de EE. UU.); 3) TAM de Paychex (solo pymes)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) proxy de 2026; 2) MSCI y Sustainalytics (requieren registro); 3) web de ADP (informe de sostenibilidad sin calificaciones de terceros en el texto)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Definitive Proxy Statement (DEF 14A) de la junta de 2026', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-09-24', url: 'https://www.sec.gov/Archives/edgar/data/8670/000130817926000409/adp015474-def14a.htm' },
  { id: 2, titulo: '8-K: resultados de la junta de 12-nov-2025 (Item 5.07)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-11-17', url: `${SEC}/000095014225003006/eh250705655_8k.htm` },
  { id: 3, titulo: 'Form 10-K de FY2026: directivos (Item 10)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000000867026000030/adp-20260630.htm` },
  { id: 4, titulo: 'Form 4 de consejeros y directivos de ADP presentados entre el 15-oct-2025 y el 15-oct-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000008670&type=4' },
  { id: 5, titulo: 'ADP Reports Fourth Quarter and Fiscal 2026 Results (guía de FY2027 y resultados de FY2026)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000000867026000025/q4fy26exhibit99.htm` },
  { id: 6, titulo: 'ADP Reports First Quarter Fiscal 2026 Results (guía de FY2026)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-10-29', url: `${SEC}/000000867025000042/q1fy26exhibit99.htm` },
  { id: 7, titulo: 'ADP Reports Third Quarter Fiscal 2026 Results (guía elevada)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-04-29', url: `${SEC}/000000867026000016/q3fy26exhibit99.htm` },
];
const vendidos = F4.personas ?? [];
const insiders = (F4.operaciones ?? []).filter((o) => ['P', 'S'].includes(o.codigo));
const agrupa = {};
for (const o of insiders) { const k = `${o.fecha}|${o.persona}|${o.codigo}`; agrupa[k] ??= { fecha: o.fecha, persona: o.persona, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: 0, importe: 0 }; agrupa[k].acciones += o.acciones; agrupa[k].importe += o.importe / 1e6; }
const cargos = { 'Black Maria': 'Maria Black (consejera delegada)', 'DeSilva Joseph': 'Joseph DeSilva (vicepresidente ejecutivo, Norteamérica)', 'Kwon David': 'David Kwon (director jurídico)', "D'Ambrosio Christopher": "Chris D'Ambrosio (director de estrategia)", 'SWAN ROBERT HOLMES': 'Robert H. Swan (consejero)', 'Foskett David': 'David Foskett (presidente de ventas globales)', 'Michaud Brian L.': 'Brian Michaud (vicepresidente ejecutivo)' };
const insidersTabla = Object.values(agrupa).sort((a, b) => b.importe - a.importe).slice(0, 12).map((x) => ({ ...x, persona: cargos[x.persona] ?? x.persona, importe: r2(x.importe) })).sort((a, b) => b.fecha.localeCompare(a.fecha));

const C = {
  directivos: {
    equipo: [
      { nombre: 'Maria Black', cargo: 'Presidenta y consejera delegada', desde: '2023', participacion_pct: 0.03, trayectoria: 'En ADP desde 1996; presidenta de ADP en 2022 y de ventas y marketing mundiales en 2020-2021 [3]. Con ella los ingresos crecieron del 18.012,2 M de FY2023 a 21.947,4 M de FY2026 y el BPA de 8,21 a 10,94 USD; lanzó Lyric y los agentes de IA [3, 5]. Tiene 102.151 acciones y vendió 8,6 M USD en 12 meses con un plan 10b5-1 [1, 4].' },
      { nombre: 'Peter Hadley', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.00, trayectoria: 'En ADP desde 2002; tesorero de 2022 a 2025 y presidente de Asia-Pacífico de 2017 a 2022. Sustituyó a Don McGuire en julio de 2025 [3].' },
      { nombre: 'Thomas J. Lynch', cargo: 'Presidente no ejecutivo del consejo', desde: '2018', participacion_pct: 0.00, trayectoria: 'Ex presidente y consejero delegado de TE Connectivity; preside el consejo de ADP desde la salida de Carlos Rodríguez [1].' },
      { nombre: 'Joseph DeSilva', cargo: 'Vicepresidente ejecutivo, Norteamérica, y director de operaciones', desde: '2025', participacion_pct: 0.01, trayectoria: 'En ADP desde 2003; presidente de ventas globales de 2022 a 2024 [3].' },
      { nombre: 'Sreeni Kutam', cargo: 'Presidente de producto e innovación global', desde: '2023', participacion_pct: 0.02, trayectoria: 'En ADP desde 2014; responsable de Lyric y de ADP Assist; antes director de personas [3].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Inicial (jul-2025): ingresos +5-6 %, margen EBIT ajustado +50-70 pb, BPA ajustado +8-10 %; elevada en enero y abril', real: 'Ingresos +7 %, margen +80 pb, BPA ajustado +11 % (11,12 USD)', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ingresos +5-6 %, margen EBIT ajustado +70-90 pb, BPA ajustado +9-11 % (jul-2026)', real: 'En curso; 1T27 el 28-oct-2026', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de la casa: la consejera delegada, el director financiero y casi toda la cúpula llevan más de diez años en ADP [3]. La guía de FY2026 empezó prudente y se elevó dos veces hasta cumplirse en la parte alta, como es costumbre en ADP [5-7]. El relevo de 2023 (Rodríguez → Black) y el del director financiero de 2025 fueron ordenados y anunciados con antelación [3]. Hay plan de sucesión formal supervisado por la comisión de retribuciones y desarrollo directivo [1]. El punto a vigilar es la credibilidad en IA: la dirección afirma que la IA no reduce empleo «a escala», pero no da cifras de ingresos por IA [5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Thomas J. Lynch', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2018', comisiones: null },
      { nombre: 'Maria Black', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Peter Bisson', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Preside una comisión' },
      { nombre: 'Linnie M. Haynesworth', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'Francine S. Katsoudas', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: null },
      { nombre: 'Nazzic S. Keene', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría (pasa a desarrollo corporativo y tecnología tras la junta)' },
      { nombre: 'Karen S. Lynch', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Scott F. Powers', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Preside una comisión' },
      { nombre: 'Carlos A. Rodriguez', cargo: 'Consejero (ex consejero delegado 2011-2022)', tipo: 'Otro externo', desde: '2011', comisiones: null },
      { nombre: 'Robert H. Swan', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Sandra S. Wijnberg', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Preside una comisión' },
      { nombre: 'David W. Kenny', cargo: 'Candidato a consejero (junta de 11-nov-2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Nancy McKinstry', cargo: 'Candidata a consejera (junta de 11-nov-2026)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.3, voto_remuneracion_contra_pct: 8.2, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 25.45, fijo: 1.27, variable_corto: 2.93, variable_largo: 20.67, ratio_salario_medio: 363 },
    remuneracion: 'La consejera delegada cobró 25,45 M USD en FY2026 (14,79 M de acciones en FY2025): 1,27 M de sueldo, 2,93 M de bonus (115,5 % del objetivo) y 20,67 M en acciones [1]. El bonus anual se mide con objetivos cuantitativos predeterminados (ingresos, beneficio y otros); las acciones de desempeño (PSU) pagan según el crecimiento del beneficio neto ajustado (67 %) y de los ingresos sin primas repercutidas (33 %), con un modificador por rentabilidad total para el accionista relativa; en FY2026 pagaron el 125,5 % [1]. No hay métrica de ROIC ni de flujo libre, pero el beneficio ajustado ya recoge el coste del capital vía recompras. Ratio de 363 veces el salario mediano (70.118 USD) [1]. Cláusula de recuperación (clawback) estricta [1]. El voto consultivo de 2025 tuvo un 91,3 % a favor y un 8,2 % en contra [2].',
    accionistas: [
      { nombre: 'BlackRock', pct: 8.1, tipo: 'Institucional', variacion: '13G/A de enero de 2024 [1]' },
      { nombre: 'Vanguard', pct: 7.51, tipo: 'Institucional', variacion: 'Según el proxy de 2026 [1]' },
      { nombre: 'State Street', pct: 5.1, tipo: 'Institucional', variacion: 'Según el proxy de 2026 [1]' },
      { nombre: 'Consejeros y directivos (26 personas)', pct: 0.15, tipo: 'Directivos', variacion: '599.811 acciones [1]' },
      { nombre: 'Autocartera', pct: 37.7, tipo: 'Autocartera', variacion: '240,9 millones de acciones sobre 638,7 emitidas a 30-jun-2026 (233,4 un año antes) [5]' },
    ],
    insiders: insidersTabla,
    control_y_defensas: 'No hay accionista de control: los tres mayores son gestoras indexadas (BlackRock 8,1 %, Vanguard 7,5 %, State Street 5,1 %) y los consejeros y directivos tienen un 0,15 % [1]. Una sola clase de acciones, presidente no ejecutivo independiente separado de la consejera delegada, elección anual de todos los consejeros por mayoría y renovación del consejo (dos candidatos nuevos en 2026 y un consejero que sale) [1]. En 2017 el consejo resistió a Pershing Square, que no logró ningún puesto; el 10-K mantiene el riesgo de activistas entre sus factores [3]. No hay operaciones vinculadas relevantes publicadas [1].',
    alertas: [
      'Ventas de la consejera delegada por 8,6 M USD en 12 meses (con plan 10b5-1), sin compras de directivos; solo un consejero (Swan) compró 0,75 M a 206 USD en mayo de 2026 [4].',
      'Carlos Rodríguez, ex consejero delegado hasta 2022, sigue en el consejo [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'gobierno', campo: 'consejo.comisiones', tipo: 'Complemento', intentos: '1) proxy de 2026 (la tabla de comisiones es gráfica y no se extrae como texto); 2) web de gobierno corporativo de ADP (no consultada por tiempo); 3) 8-K de nombramientos', decision: 'Omitido' }],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ADP, SPY e IGV', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/ADP/history/' },
  { id: 2, titulo: 'Automatic Data Processing, Inc.: previsiones financieras', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/AUTOMATIC-DATA-PROCESSING-11713/finances/' },
  { id: 3, titulo: 'Automatic Data Processing, Inc.: consenso de analistas', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/AUTOMATIC-DATA-PROCESSING-11713/consensus/' },
  { id: 4, titulo: 'ADP Stock Forecast & Price Target', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-05', url: 'https://stockanalysis.com/stocks/adp/forecast/' },
  { id: 5, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10)', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Form 10-K de FY2026 (acciones en circulación a 31-jul-2026 y balance)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-08-05', url: `${SEC}/000000867026000030/adp-20260630.htm` },
  { id: 8, titulo: 'ADP Reports Fourth Quarter and Fiscal 2026 Results; Provides Fiscal 2027 Outlook', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-29', url: `${SEC}/000000867026000025/q4fy26exhibit99.htm` },
  { id: 9, titulo: 'Informes value de Paychex (12-oct-2026) y Paycom (15-oct-2026): comparables y transacciones de HCM y nóminas', editor: 'Repositorio analisis-inversion (informes/paychex-2026-10-12, informes/paycom-2026-10-15)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://github.com/' },
  { id: 10, titulo: 'Cotizaciones de cierre del 9 y 14-oct-2026 de PCTY, WDAY, INTU, TNET, PAYX y PAYC', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 11, titulo: 'ADP to Announce First Quarter Fiscal 2027 Financial Results on October 28, 2026', editor: 'Automatic Data Processing, Inc.', tipo: 'Primaria', fecha: '2026-09-28', url: 'https://s205.q4cdn.com/887941133/files/doc_news/ADP-to-Announce-First-Quarter-Fiscal-2027-Financial-Results-on-October-28-2026-2026.pdf' },
  { id: 12, titulo: 'Paychex to Acquire Paycor (anexo 99.1 del 8-K)', editor: 'Paychex, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-07', url: 'https://www.sec.gov/Archives/edgar/data/723531/000095010325000267/dp223210_ex9901.htm' },
  { id: 13, titulo: 'Dayforce Enters into US$12.3 Billion Definitive Agreement with Thoma Bravo (anexo 99.1 del 8-K)', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-08-21', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000119312525184632/d949165dex991.htm' },
  { id: 14, titulo: 'Dayforce, Inc.: proxy definitivo de la fusión (DEFM14A), con la opinión de Evercore', editor: 'Dayforce, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-09-29', url: 'https://www.sec.gov/Archives/edgar/data/1725057/000114036125036413/ny20054883x2_defm14a.htm' },
  { id: 15, titulo: 'Ultimate Software to Be Acquired by Investor Group Led by Hellman & Friedman (anexo 99.1 del 8-K)', editor: 'Ultimate Software Group (SEC EDGAR)', tipo: 'Primaria', fecha: '2019-02-04', url: 'https://www.sec.gov/Archives/edgar/data/1016125/000089968119000030/p19-0028_ex991.htm' },
  { id: 16, titulo: 'Form 10-Q del trimestre cerrado el 31-dic-2024 (compra de WorkForce Software)', editor: 'Automatic Data Processing, Inc. (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-01-29', url: 'https://www.sec.gov/Archives/edgar/data/8670/000000867025000007/adp-20241231.htm' },
];

// Comparables: los del informe de Paycom (cierre del 14-oct, llevados desde los de Paychex del 9-oct), sin ADP, con Paycom de su propio informe.
const PC = JSON.parse(fs.readFileSync(path.join(dir, '..', '..', 'paycom-2026-10-15', 'notas', 'D.json'), 'utf8'));
const comps = PC.comparables.empresas.filter((e) => e.ticker !== 'ADP');
comps.push({ nombre: 'Paycom Software', ticker: 'PAYC', pais: 'US', capitalizacion: 10779, ev_ventas: 5.36, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: 11.3, per_ntm: 20.1, crecimiento_pct: 7.1, margen_ebitda_pct: 39.4, roic_pct: 32.8, dn_ebitda: 0.8, fcf_yield_pct: 5.3 });
const amPct = 585.9 / 21947.4; // EBITDA del consenso = EBIT de MarketScreener + amortización al % de FY2026 (estimación propia)

const D = {
  identificacion: {
    nombre: 'Automatic Data Processing, Inc.', nombre_corto: 'ADP', ticker: 'ADP', isin: 'US0530151036', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Servicios profesionales: proceso de nóminas, RR. HH. y coempleo (HCM)', sede: 'Roseland (Nueva Jersey)', fundacion: '1949', empleados: 67000, web: 'https://www.adp.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 398.2, capitalizacion_publicada: null, free_float_pct: 99.8,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 591 M USD/día (3 meses) [1]', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía de FY2027 (29-jul-2026): ingresos +5-6 %, margen EBIT ajustado +70-90 pb (desde el 26,8 %), tipo ajustado del ~23 %, BPA diluido +11-13 % y ajustado +9-11 % (12,12-12,34 USD) [8]. Employer Services: ingresos +5-6 %, nuevas ventas +4-7 %, retención −10 a −30 pb y empleados por cliente en EE. UU. 0 a +1 %. PEO: ingresos +5-7 % (+3-5 % sin repercusiones) y empleados ≈+2 %. Intereses de fondos de clientes de 1.540-1.560 M con saldos +3-4 % y rentabilidad del ~3,7 % [8]. No hay plan a medio plazo publicado más allá del marco del día del inversor de 2025 (precio ≈1 punto de crecimiento) [8].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 23227, ebitda: Math.round(6396 + amPct * 23227), ebit: 6396, bpa: 12.24, dpa: 7.15, fuente: 'MarketScreener, 18 analistas; EBITDA = EBIT + amortización al 2,67 % de las ventas (estimación propia) [2]' },
      { periodo: 'FY2028e', ingresos: 24560, ebitda: Math.round(6891 + amPct * 24560), ebit: 6891, bpa: 13.39, dpa: 7.66, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 25947, ebitda: Math.round(7364 + amPct * 25947), ebit: 7364, bpa: 14.48, dpa: 8.13, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 4, mantener: 12, vender: 2, po_medio: 286.4, po_min: 225, po_max: 322 },
    revisiones: 'Consenso de MarketScreener (18 analistas) y Stock Analysis (18): BPA de FY2027 de 12,24 y 12,26 USD y de FY2028 de 13,39 y 13,40 USD, los dos ajustados (en ADP el ajustado solo quita partidas únicas) [2, 4]. Recomendaciones estables en tres meses: 4 compras fuertes, 12 mantener, 1 vender y 1 venta fuerte [4]. Los últimos movimientos son de mantener: TD Cowen (283 USD, 5-oct), Wells Fargo (303 USD), UBS (290 USD) y DBS, que bajó de 290 a 255 USD el 21-sep [4]. El objetivo medio (286,40 USD) está solo un 2,2 % por encima del precio [3]. El EBIT de MarketScreener es el EBIT ajustado de ADP (5.875 M en FY2026), con los intereses de la estrategia de fondos dentro [2, 8].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    comentario: 'ADP rindió un 14,8 % anual en diez años, en línea con el S&P 500 (15,5 %), pero se quedó atrás en los últimos tres (6,8 % frente a 22,7 %) [1]. La acción marcó máximos en junio de 2025 (más de 320 USD) y cayó un 40,8 % hasta el 10-abr-2026 (188,16 USD) por tres motivos: el miedo a que la IA reduzca el empleo de oficina y abarate el software (la caída general del software del 3-feb-2026 le restó un 5 %), la desaceleración de los empleados por cliente y la idea de que los intereses de los fondos tocaban techo [1]. Desde abril ha subido casi un 50 %: los resultados del 3T26 y del 4T26 superaron lo previsto, la guía se elevó dos veces y la recompra se aceleró [1, 8]. En el año, +11,4 % frente al +13,7 % del S&P 500 y al +1,9 % del ETF de software IGV [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => Number(c.anio.slice(2)) >= 2017).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'ADP ha cotizado de forma muy estable: entre 24 y 29 veces el beneficio del año siguiente en cada cierre de ejercicio de FY2019 a FY2025, con una mediana de cinco años de 24,2 veces (historia adelantada) [1, 2]. El cierre de FY2026 (223,95 USD, junio de 2026) fue el mínimo de la década, 18,4 veces nuestro BPA de FY2027, por el miedo a la IA. Hoy, a 280,32 USD, cotiza a 23,0 veces: ha recuperado casi todo el descuento. La prima frente a otros negocios de servicios se explica por la calidad (retención del 92 %, ROIC muy alto, más de 50 años de dividendo creciente) y por el flotante; lo que ha cambiado es la percepción de su crecimiento a largo plazo con la IA, no los tipos.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Seis cotizadas de EE. UU. de nóminas, HCM y PEO: Paychex (el rival más parecido: nóminas de pymes con fondos de clientes y PEO), Paycom y Paylocity (software de nóminas y HCM para medianas), Workday (HCM para grandes empresas, rival de Lyric), Intuit (nómina de microempresas en QuickBooks) y TriNet (PEO). Son los del informe de Paycom del 15-oct (cierre del 14-oct), y Paycom con las cifras de su propio informe [9, 10]. Insperity queda fuera (margen EBITDA del 1 % y PER distorsionado). Dayforce dejó de cotizar en 2026 y va en transacciones [13].',
    empresas: comps,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Dayforce', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: 6.32, ev_ebitda: 19.8, prima_pct: 32.0, excluir: false, comentario: 'EBITDA ajustado de la guía de 2025 (sin pagos en acciones); cerrada en febrero de 2026 [13, 14].' },
      { fecha: '2025-01', objetivo: 'Paycor HCM', comprador: 'Paychex', ev: 4100, ev_ventas: 6.31, ev_ebitda: null, prima_pct: 19.0, excluir: false, comentario: 'Sobre los «más de 650 M» de ingresos recurrentes de Paycor [12].' },
      { fecha: '2024-10', objetivo: 'WorkForce Software', comprador: 'ADP', ev: 1173, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin ingresos publicados [16].' },
      { fecha: '2019-02', objetivo: 'Ultimate Software', comprador: 'Consorcio de Hellman & Friedman', ev: 11000, ev_ventas: 10.0, ev_ebitda: null, prima_pct: 32.0, excluir: false, comentario: 'EV/ventas sobre «más de 1.100 M» de ingresos de 2018 [15].' },
    ],
    comentario: 'Las compras de HCM de 2025 se pagaron a unas 6,3 veces las ventas, con primas del 19-32 %; la opinión de Evercore para Dayforce da una mediana de 19,1 veces el EBITDA ajustado de las transacciones del sector desde 2019 [12-14]. ADP vale hoy unas 5,1 veces sus ventas y 17 veces su EBITDA de los últimos 12 meses: cerca de esos precios de control, aunque con un tamaño (más de 110.000 M de capitalización) que hace casi imposible una opa. Las transacciones sirven de referencia de valor, no de catalizador.',
    confianza: 'Media',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 4965.1, arrendamientos: 0, caja: 4230.1, minoritarios: 0, pensiones: 0, asociadas: 0, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran)', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERP (T12m with sustainable payout) [6]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA (datos quincenales, no accesibles sin registro); 2) Stock Analysis (estadísticas, de pago); 3) MarketScreener', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $ADP (29 últimos, jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://stocktwits.com/symbol/ADP' },
  { id: 2, titulo: 'Stocktwits: mensajes sobre la demanda laboral Moore v. ADP (oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://stocktwits.com/symbol/ADP' },
  { id: 3, titulo: 'Seeking Alpha: análisis y noticias de ADP (feed, jun-sep 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-18', url: 'https://seekingalpha.com/symbol/ADP' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($ADP)', fecha: '2026-10', n_comentarios: 29, tono: 'Positivo', resumen: 'Mensajes de dividendo («Dividend King») y de análisis técnico celebran el rebote de más del 30 % en un mes tras el 4T26; un mensaje bajista lo llama «HCM heredado» sin argumento; varios avisan de que los resultados del 1T27 son el 28-oct [1].' },
      { plataforma: 'Stocktwits (demanda laboral)', fecha: '2026-10', n_comentarios: 4, tono: 'Neutro', resumen: 'Despachos de abogados difunden la demanda colectiva Moore v. ADP (15-sep-2026) de agentes de atención por 20-42 minutos diarios sin pagar; es de empleados propios, no de clientes [2].' },
      { plataforma: 'Seeking Alpha (autores)', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: 'De «la venta la ha hecho barata» y «el mejor momento en años» (mayo-junio) a «el rebote tras resultados cerró el descuento, aún compra» (julio), «los márgenes son demasiado altos, paso» (julio) y una rebaja: «los vientos de cola ya están en el precio» (septiembre) [3].' },
    ],
    temas: [
      { tema: 'La IA como amenaza al empleo de oficina y al software', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos aún no lo muestran: empleados por cliente +1 % y retención del 92,1 %; el riesgo es a 3-5 años y gradual, y la dirección no da cifras de ingresos por IA [3].' },
      { tema: 'Valoración tras el rebote', postura: 'Dividida', peso: 'Alto', contraste: 'A 280 USD cotiza a 23 veces nuestro BPA de FY2027, por debajo de su mediana de cinco años (24,2 veces) pero ya lejos del mínimo de junio (18,4 veces) [3].' },
      { tema: 'Dividendo y recompras', postura: 'Alcista', peso: 'Medio', contraste: 'Correcto: 4.700 M devueltos en FY2026 y más de 50 años de subidas; la subida de noviembre es casi segura [1].' },
      { tema: 'Margen alto y tipos de interés', postura: 'Bajista', peso: 'Bajo', contraste: 'Parcialmente cierto: 1.354,8 M de intereses de fondos son casi todo margen; pero el mercado descuenta subidas de la Fed y la cartera escalonada amortigua las bajadas [3].' },
    ],
    lectura: 'El sentimiento ha pasado del pesimismo de la primavera (la acción en mínimos de la década frente a su beneficio) a un optimismo prudente: los particulares celebran el rebote y el dividendo, y los autores de Seeking Alpha discuten si el descuento ya se ha cerrado [1, 3]. Coincide con los analistas, que en su mayoría recomiendan mantener con un objetivo medio cerca del precio. No hay euforia ni capitulación. El foro no aporta riesgos nuevos, salvo la demanda laboral de sus agentes (menor); el de la IA lo discute en abstracto, sin datos de empleo.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. EBIT FY2026:', cuenta[9].ebit, 'EBITDA:', cuenta[9].ebitda, 'Capex FY2026:', flujos[9].capex, 'Comparables:', comps.map((c) => `${c.ticker} ${c.per_ntm}`).join(', '));
