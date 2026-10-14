// Cuentas anuales desde los datos XBRL que publican los reguladores (E2 de las mejoras del 14-oct-2026): rellena
// `financieros.cuenta`, `balance.historico` y `flujos.historico` (los campos que el XBRL cubre) en millones de la
// divisa de las cuentas, con la fuente de cada ejercicio, para que el analista COMPRUEBE cifras en vez de buscarlas.
// Sin dependencias.
//
//   node herramientas/cuentas.mjs --sec AAPL            Estados Unidos (y extranjeras con 20-F/40-F): SEC companyfacts,
//                                                       10 años, US GAAP o NIIF. Ticker o CIK.
//   node herramientas/cuentas.mjs --esef "Bureau Veritas" UE y Reino Unido: repositorio ESEF de XBRL International
//                                                       (filings.xbrl.org), cuentas anuales desde 2020 (NIIF). Nombre o LEI.
//   … [--dir informes/<carpeta>/notas] [--anios 10] [--mapa ruta.json] [--salida ruta.json]
//
// Deja `<dir>/cuentas-xbrl.json` (por defecto el directorio actual) con las tres series, `mapa` (el concepto XBRL que
// ha dado cada campo), `faltan` (campos sin concepto: hay que buscarlos en el informe anual) y `documentos`.
// `--mapa` añade o sustituye conceptos por campo para una empresa concreta ({"ingresos": ["bvi:RevenueNet"]}); se guarda
// junto al informe y se reutiliza en cada iteración.
//
// Signos como en el prompt de empresa: costes, impuestos, amortizaciones y pagos en positivo; `resultado_financiero`
// con signo (negativo = coste neto); `beneficio_neto` atribuido a la dominante; `minoritarios` = resultado de los
// minoritarios. Lo que el XBRL no distingue (deuda sin arrendamientos, capex de intangibles, no recurrentes) hay que
// mirarlo en las cuentas: el campo queda en `faltan` o lleva aviso.
//
// En la nube de Claude, Node necesita NODE_USE_ENV_PROXY=1 para salir a internet (curl no).

import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const a = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true;
if (!a.sec && !a.esef) { console.error('Uso: node herramientas/cuentas.mjs (--sec TICKER|CIK | --esef "Nombre"|LEI) [--dir carpeta] [--anios 10] [--mapa ruta.json] [--salida ruta.json]'); process.exit(1); }
const ANIOS = +(a.anios || 10);
// La SEC rechaza (403) los User-Agent con paréntesis o punto y coma; este formato corto pasa. Nunca datos personales.
const UA = process.env.SEC_UA || 'analisis-inversion/1.0';
const CACHE = join(process.env.TEMP || tmpdir(), 'analisis-inversion', 'cuentas');
mkdirSync(CACHE, { recursive: true });
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const M = (v) => (v === null || v === undefined ? null : Math.round((v / 1e6) * 10) / 10);
const r2 = (v, d = 2) => (v === null || v === undefined ? null : Math.round(v * 10 ** d) / 10 ** d);
const dia = (iso) => (iso ? String(iso).slice(0, 10) : null);
const menosUnDia = (iso) => { const d = new Date(dia(iso) + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); };
const dias = (ini, fin) => Math.round((Date.parse(fin) - Date.parse(ini)) / 86400000);

async function bajar(url, { json = true, dias: caducidad = 7, cabeceras = {} } = {}) {
  const f = join(CACHE, url.replace(/[^\w.-]+/g, '_').slice(-180));
  if (existsSync(f) && (Date.now() - statSync(f).mtimeMs) / 86400000 < caducidad) return json ? JSON.parse(readFileSync(f, 'utf8')) : readFileSync(f, 'utf8');
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Encoding': 'gzip, deflate', ...cabeceras }, signal: AbortSignal.timeout(240000) });
      if ((r.status === 429 || r.status >= 500) && i < 4) { await espera(3000 * (i + 1)); continue; }
      if (!r.ok) throw new Error(`HTTP ${r.status} en ${url}`);
      const t = await r.text();
      writeFileSync(f, t);
      return json ? JSON.parse(t) : t;
    } catch (e) { if (i >= 4 || /HTTP \d/.test(e.message)) throw e; await espera(2000 * (i + 1)); }
  }
}

// ---------- Mapas campo → conceptos (el primero con dato gana; {suma:[…]} y {resta:[a,b]} combinan) ----------
const MAPA_USGAAP = {
  cuenta: {
    ingresos: ['Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'SalesRevenueNet', 'RevenueFromContractWithCustomerIncludingAssessedTax', 'RevenuesNetOfInterestExpense'],
    coste_ventas: ['CostOfRevenue', 'CostOfGoodsAndServicesSold', 'CostOfGoodsSold', 'CostOfServices'],
    gastos_generales: ['SellingGeneralAndAdministrativeExpense', { suma: ['SellingAndMarketingExpense', 'GeneralAndAdministrativeExpense'] }],
    ebit: ['OperatingIncomeLoss'],
    amortizaciones: ['DepreciationDepletionAndAmortization', 'DepreciationAndAmortization', 'DepreciationAmortizationAndAccretionNet', { suma: ['Depreciation', 'AmortizationOfIntangibleAssets'] }],
    bai: ['IncomeLossFromContinuingOperationsBeforeIncomeTaxesExtraordinaryItemsNoncontrollingInterest', 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesMinorityInterestAndIncomeLossFromEquityMethodInvestments', 'IncomeLossFromContinuingOperationsBeforeIncomeTaxesDomestic'],
    impuestos: ['IncomeTaxExpenseBenefit'],
    minoritarios: ['NetIncomeLossAttributableToNoncontrollingInterest'],
    beneficio_neto: ['NetIncomeLoss', 'NetIncomeLossAvailableToCommonStockholdersBasic'],
    gastos_financieros: ['InterestExpense', 'InterestExpenseNonoperating', 'InterestExpenseDebt', 'InterestAndDebtExpense'],
    bpa: ['EarningsPerShareDiluted'],
    dpa: ['CommonStockDividendsPerShareDeclared', 'CommonStockDividendsPerShareCashPaid'],
    acciones_diluidas: ['WeightedAverageNumberOfDilutedSharesOutstanding'],
  },
  balance: {
    activo_total: ['Assets'], activo_corriente: ['AssetsCurrent'], pasivo_corriente: ['LiabilitiesCurrent'],
    pasivo_total: ['Liabilities', { resta: ['Assets', 'StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest'] }, { resta: ['Assets', 'StockholdersEquity'] }],
    fondo_comercio: ['Goodwill'], intangibles: ['IntangibleAssetsNetExcludingGoodwill', 'FiniteLivedIntangibleAssetsNet'],
    inmovilizado_material: ['PropertyPlantAndEquipmentNet', 'PropertyPlantAndEquipmentAndFinanceLeaseRightOfUseAssetAfterAccumulatedDepreciationAndAmortization'],
    existencias: ['InventoryNet'], clientes: ['AccountsReceivableNetCurrent', 'ReceivablesNetCurrent'], proveedores: ['AccountsPayableCurrent', 'AccountsPayableAndAccruedLiabilitiesCurrent'],
    activos_contrato: ['ContractWithCustomerAssetNetCurrent'], pasivos_contrato: ['ContractWithCustomerLiabilityCurrent'],
    caja: ['CashAndCashEquivalentsAtCarryingValue', 'CashCashEquivalentsRestrictedCashAndRestrictedCashEquivalents', 'Cash'],
    deuda_financiera: [{ suma: ['LongTermDebtNoncurrent', 'LongTermDebtCurrent', 'ShortTermBorrowings', 'CommercialPaper'] }, 'LongTermDebt', 'DebtLongtermAndShorttermCombinedAmount', { suma: ['LongTermDebtAndCapitalLeaseObligations', 'LongTermDebtAndCapitalLeaseObligationsCurrent'] }],
    arrendamientos: [{ suma: ['OperatingLeaseLiability', 'FinanceLeaseLiability'] }, { suma: ['OperatingLeaseLiabilityNoncurrent', 'OperatingLeaseLiabilityCurrent', 'FinanceLeaseLiabilityNoncurrent', 'FinanceLeaseLiabilityCurrent'] }],
    patrimonio_neto: ['StockholdersEquity'], minoritarios: ['MinorityInterest'], reservas: ['RetainedEarningsAccumulatedDeficit'],
  },
  flujos: {
    flujo_operativo: ['NetCashProvidedByUsedInOperatingActivities', 'NetCashProvidedByUsedInOperatingActivitiesContinuingOperations'],
    capex: [{ suma: ['PaymentsToAcquirePropertyPlantAndEquipment', 'PaymentsToAcquireIntangibleAssets'] }, 'PaymentsToAcquireProductiveAssets', 'PaymentsForCapitalImprovements'],
    pagos_arrendamientos: ['FinanceLeasePrincipalPayments', 'RepaymentsOfLongTermCapitalLeaseObligations'],
    adquisiciones: ['PaymentsToAcquireBusinessesNetOfCashAcquired', 'PaymentsToAcquireBusinessesAndInterestInAffiliates'],
    desinversiones: [{ suma: ['ProceedsFromSaleOfPropertyPlantAndEquipment', 'ProceedsFromDivestitureOfBusinesses'] }, 'ProceedsFromDivestitureOfBusinessesNetOfCashDivested'],
    dividendos: ['PaymentsOfDividends', 'PaymentsOfDividendsCommonStock', 'PaymentsOfOrdinaryDividends'],
    recompras: ['PaymentsForRepurchaseOfCommonStock'],
    emision_acciones: ['ProceedsFromIssuanceOfCommonStock', 'ProceedsFromStockOptionsExercised', 'ProceedsFromIssuanceOrSaleOfEquity'],
    intereses_en_financiacion: [], // en US GAAP los intereses pagados van en explotación: 0
  },
};
const MAPA_IFRS = {
  cuenta: {
    ingresos: ['Revenue', 'RevenueFromContractsWithCustomers', 'RevenueFromSaleOfGoods'],
    coste_ventas: ['CostOfSales', 'CostOfMerchandiseSold'],
    gastos_generales: ['SellingGeneralAndAdministrativeExpense', { suma: ['SellingExpense', 'GeneralAndAdministrativeExpense'] }, { suma: ['DistributionCosts', 'AdministrativeExpense'] }],
    ebit: ['ProfitLossFromOperatingActivities'],
    amortizaciones: ['DepreciationAndAmortisationExpense', 'AdjustmentsForDepreciationAndAmortisationExpense', { suma: ['DepreciationExpense', 'AmortisationExpense'] }, { suma: ['AdjustmentsForDepreciationExpense', 'AdjustmentsForAmortisationExpense'] }],
    resultado_financiero: ['FinanceIncomeCost'],
    bai: ['ProfitLossBeforeTax'],
    impuestos: ['IncomeTaxExpenseContinuingOperations'],
    minoritarios: ['ProfitLossAttributableToNoncontrollingInterests'],
    beneficio_neto: ['ProfitLossAttributableToOwnersOfParent'],
    gastos_financieros: ['FinanceCosts', 'InterestExpense', 'InterestExpenseOnBorrowings'],
    bpa: ['DilutedEarningsLossPerShare', 'DilutedEarningsLossPerShareFromContinuingOperations'],
    dpa: ['DividendsRecognisedAsDistributionsToOwnersPerShare', 'DividendsPaidOrdinarySharesPerShare', 'DividendsProposedOrDeclaredBeforeFinancialStatementsAuthorisedForIssueButNotRecognisedAsDistributionToOwnersPerShare'],
    acciones_diluidas: ['WeightedAverageNumberOfDilutedSharesOutstanding', 'AdjustedWeightedAverageShares'],
  },
  balance: {
    activo_total: ['Assets'], activo_corriente: ['CurrentAssets', 'CurrentAssetsOtherThanAssetsOrDisposalGroupsClassifiedAsHeldForSaleOrAsHeldForDistributionToOwners'],
    pasivo_corriente: ['CurrentLiabilities', 'CurrentLiabilitiesOtherThanLiabilitiesIncludedInDisposalGroupsClassifiedAsHeldForSale'],
    pasivo_total: ['Liabilities', { resta: ['Assets', 'Equity'] }],
    fondo_comercio: ['Goodwill'], intangibles: ['IntangibleAssetsOtherThanGoodwill'], inmovilizado_material: ['PropertyPlantAndEquipment'],
    existencias: ['Inventories'], clientes: ['TradeAndOtherCurrentReceivables', 'CurrentTradeReceivables', 'TradeAndOtherReceivables'],
    proveedores: ['TradeAndOtherCurrentPayables', 'TradeAndOtherCurrentPayablesToTradeSuppliers', 'TradeAndOtherPayables'],
    activos_contrato: ['CurrentContractAssets', 'ContractAssets'], pasivos_contrato: ['CurrentContractLiabilities', 'ContractLiabilities'],
    caja: ['CashAndCashEquivalents'],
    deuda_financiera: ['Borrowings', { suma: ['LongtermBorrowings', 'CurrentBorrowingsAndCurrentPortionOfNoncurrentBorrowings'] }, { suma: ['LongtermBorrowings', 'ShorttermBorrowings'] }, { suma: ['NoncurrentPortionOfNoncurrentBorrowings', 'CurrentPortionOfNoncurrentBorrowings', 'ShorttermBorrowings'] }],
    arrendamientos: ['LeaseLiabilities', { suma: ['NoncurrentLeaseLiabilities', 'CurrentLeaseLiabilities'] }],
    patrimonio_neto: ['EquityAttributableToOwnersOfParent'], minoritarios: ['NoncontrollingInterests'], reservas: ['RetainedEarnings'],
  },
  flujos: {
    flujo_operativo: ['CashFlowsFromUsedInOperatingActivities'],
    capex: [{ suma: ['PurchaseOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities', 'PurchaseOfIntangibleAssetsClassifiedAsInvestingActivities'] }, 'PurchaseOfPropertyPlantAndEquipmentIntangibleAssetsOtherThanGoodwillInvestmentPropertyAndOtherNoncurrentAssets'],
    pagos_arrendamientos: ['PaymentsOfLeaseLiabilitiesClassifiedAsFinancingActivities', 'RepaymentsOfLeaseLiabilitiesClassifiedAsFinancingActivities'],
    adquisiciones: ['CashFlowsUsedInObtainingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities'],
    desinversiones: [{ suma: ['ProceedsFromSalesOfPropertyPlantAndEquipmentClassifiedAsInvestingActivities', 'CashFlowsFromLosingControlOfSubsidiariesOrOtherBusinessesClassifiedAsInvestingActivities'] }],
    dividendos: ['DividendsPaidClassifiedAsFinancingActivities', 'DividendsPaidToEquityHoldersOfParentClassifiedAsFinancingActivities', 'DividendsPaid'],
    recompras: ['PaymentsToAcquireOrRedeemEntitysShares', 'PaymentsForTreasuryShares'],
    emision_acciones: ['ProceedsFromIssuingShares', 'ProceedsFromIssueOfOrdinaryShares'],
    intereses_en_financiacion: ['InterestPaidClassifiedAsFinancingActivities'],
  },
};
const DERIVADOS = {
  cuenta: (f) => {
    if (f.ebitda == null && f.ebit != null && f.amortizaciones != null) f.ebitda = r2(f.ebit + f.amortizaciones, 1);
    if (f.resultado_financiero == null && f.bai != null && f.ebit != null) f.resultado_financiero = r2(f.bai - f.ebit, 1);
    if (f.beneficio_neto != null && f.minoritarios == null) f.minoritarios = 0;
  },
  balance: () => {}, flujos: (f) => { if (f.intereses_en_financiacion == null) f.intereses_en_financiacion = 0; },
};
const CAMPOS = {
  cuenta: ['ingresos', 'coste_ventas', 'gastos_generales', 'ebitda', 'amortizaciones', 'ebit', 'resultado_financiero', 'bai', 'impuestos', 'minoritarios', 'beneficio_neto', 'gastos_financieros', 'participadas_en_ebitda', 'no_recurrentes_en_ebitda', 'bpa', 'dpa', 'dpa_extraordinario', 'acciones_diluidas'],
  balance: ['activo_total', 'activo_corriente', 'pasivo_corriente', 'pasivo_total', 'fondo_comercio', 'intangibles', 'inmovilizado_material', 'existencias', 'clientes', 'proveedores', 'activos_contrato', 'pasivos_contrato', 'caja', 'deuda_financiera', 'arrendamientos', 'patrimonio_neto', 'minoritarios', 'reservas'],
  flujos: ['flujo_operativo', 'capex', 'pagos_arrendamientos', 'adquisiciones', 'desinversiones', 'dividendos', 'recompras', 'emision_acciones', 'intereses_en_financiacion'],
};
const POR_ACCION = new Set(['bpa', 'dpa', 'dpa_extraordinario']);
const EN_ACCIONES = new Set(['acciones_diluidas']);
const DURACION = new Set(['cuenta', 'flujos']); // cuenta y flujos son de periodo; balance, de instante

// ---------- Hechos normalizados: { concepto, periodo: 'AAAA' (ejercicio), fin, inicio|null, valor, unidad, archivado, forma } ----------
// SEC companyfacts → hechos
function hechosSec(cf) {
  const tax = cf.facts['us-gaap'] ? 'us-gaap' : cf.facts['ifrs-full'] ? 'ifrs-full' : null;
  if (!tax) throw new Error('companyfacts sin us-gaap ni ifrs-full');
  const hechos = [];
  for (const [concepto, c] of Object.entries(cf.facts[tax])) {
    for (const [unidad, lista] of Object.entries(c.units)) {
      for (const h of lista) {
        if (!/^(10-K|20-F|40-F)/.test(h.form || '')) continue;
        const anual = h.start ? dias(h.start, h.end) >= 350 && dias(h.start, h.end) <= 380 : true;
        if (!anual) continue;
        hechos.push({ concepto, inicio: h.start || null, fin: h.end, valor: h.val, unidad, archivado: h.filed, forma: h.form, marco: h.frame || null });
      }
    }
  }
  return { tax, hechos, divisa: null };
}
// xBRL-JSON (ESEF) → hechos. Solo hechos sin dimensiones (los totales consolidados). Fechas ISO con T00:00:00: el
// instante «2026-01-01T00:00:00» es el cierre del 31-dic-2025.
function hechosEsef(j, archivado) {
  const hechos = [];
  const base = new Set(['concept', 'entity', 'period', 'unit', 'language']);
  for (const f of Object.values(j.facts || {})) {
    const d = f.dimensions || {};
    if (!Object.keys(d).every((k) => base.has(k))) continue;
    const concepto = String(d.concept || '');
    if (!concepto.startsWith('ifrs-full:') && !concepto.includes(':')) continue;
    const v = f.value === null || f.value === undefined || f.value === '' || Number.isNaN(+f.value) ? null : +f.value;
    if (v === null || typeof f.value === 'string' && /[a-z]/i.test(f.value) && Number.isNaN(+f.value)) continue;
    const p = String(d.period || '');
    let inicio = null, fin = null;
    if (p.includes('/')) { const [i, e] = p.split('/'); inicio = dia(i); fin = menosUnDia(e); } else fin = menosUnDia(p);
    if (inicio && (dias(inicio, fin) < 349 || dias(inicio, fin) > 380)) continue;
    hechos.push({ concepto: concepto.replace(/^ifrs-full:/, ''), concepto_completo: concepto, inicio, fin, valor: v, unidad: String(d.unit || ''), archivado, forma: 'ESEF', decimales: f.decimals ?? null });
  }
  return hechos;
}

// Valor de un campo para un ejercicio (fin = fecha de cierre): el primer concepto del mapa con dato; combina sumas y restas.
function valorDe(hechos, fin, alternativas, unidadPedida) {
  const indice = new Map();
  for (const h of hechos) {
    if (h.fin !== fin) continue;
    if (unidadPedida === 'dinero' && !/^(iso4217:)?[A-Z]{3}$/.test(h.unidad)) continue;
    if (unidadPedida === 'por_accion' && !/\/(xbrli:)?shares$/.test(h.unidad)) continue;
    if (unidadPedida === 'acciones' && !/^(xbrli:)?shares$/.test(h.unidad)) continue;
    const k = h.concepto;
    const prev = indice.get(k);
    if (!prev || (h.archivado || '') > (prev.archivado || '') || ((h.archivado || '') === (prev.archivado || '') && h.marco && !prev.marco)) indice.set(k, h);
  }
  const uno = (c) => (indice.has(c) ? indice.get(c) : null);
  for (const alt of alternativas) {
    if (typeof alt === 'string') { const h = uno(alt); if (h) return { valor: h.valor, origen: alt, unidad: h.unidad }; continue; }
    if (alt.suma) { const hs = alt.suma.map(uno); if (hs[0] || hs.some(Boolean)) { const v = hs.reduce((s, h) => s + (h ? h.valor : 0), 0); return { valor: v, origen: `${alt.suma.filter((c, i) => hs[i]).join(' + ')}`, unidad: hs.find(Boolean).unidad }; } }
    if (alt.resta) { const [x, y] = alt.resta.map(uno); if (x && y) return { valor: x.valor - y.valor, origen: `${alt.resta[0]} − ${alt.resta[1]}`, unidad: x.unidad }; }
  }
  return null;
}

function construirSeries(hechos, mapa, mapaExtra = {}) {
  // Ejercicios: fechas de cierre con ingresos o activo total; nos quedamos con los últimos ANIOS.
  const cierres = [...new Set(hechos.filter((h) => h.inicio && /^(iso4217:)?[A-Z]{3}$/.test(h.unidad)).map((h) => h.fin))].sort();
  const fines = cierres.slice(-ANIOS);
  const salida = { cuenta: [], balance: [], flujos: [] }, usado = {}, faltan = {};
  const divisas = new Map();
  for (const bloque of ['cuenta', 'balance', 'flujos']) {
    for (const fin of fines) {
      const fila = { periodo: fin.slice(0, 4), fin };
      for (const campo of CAMPOS[bloque]) {
        const alts = [...(mapaExtra[campo] || []), ...(mapa[bloque][campo] || [])];
        const tipo = POR_ACCION.has(campo) ? 'por_accion' : EN_ACCIONES.has(campo) ? 'acciones' : 'dinero';
        const v = alts.length ? valorDe(hechos, fin, alts, tipo) : null;
        if (v) {
          fila[campo] = tipo === 'por_accion' ? r2(v.valor, 2) : M(v.valor);
          usado[`${bloque}.${campo}`] ??= v.origen;
          if (tipo === 'dinero') divisas.set(v.unidad.replace(/^iso4217:/, ''), (divisas.get(v.unidad.replace(/^iso4217:/, '')) || 0) + 1);
        } else fila[campo] = null;
      }
      DERIVADOS[bloque](fila);
      salida[bloque].push(fila);
    }
    for (const campo of CAMPOS[bloque]) if (salida[bloque].every((f) => f[campo] === null)) (faltan[bloque] ??= []).push(campo);
  }
  const divisa = [...divisas.entries()].sort((x, y) => y[1] - x[1])[0]?.[0] || null;
  return { series: salida, usado, faltan, divisa, fines };
}

// ---------- Fuentes ----------
async function desdeSec(idOTicker) {
  let cik = /^\d+$/.test(idOTicker) ? +idOTicker : null;
  let nombre = null;
  if (!cik) {
    // www.sec.gov a veces devuelve 403 («Request Rate Threshold Exceeded») desde IP compartidas; el buscador de
    // entidades de EDGAR (efts.sec.gov) es la alternativa. Si fallan los dos, se pasa el CIK (está en cualquier página de EDGAR).
    try {
      const t = await bajar('https://www.sec.gov/files/company_tickers.json', { dias: 7 });
      const e = Object.values(t).find((x) => x.ticker.toUpperCase() === idOTicker.toUpperCase());
      if (e) { cik = e.cik_str; nombre = e.title; }
    } catch (e) { console.error(`  company_tickers.json no disponible (${e.message.slice(0, 60)}); se prueba el buscador de EDGAR`); }
    if (!cik) {
      const b = await bajar(`https://efts.sec.gov/LATEST/search-index?keysTyped=${encodeURIComponent(idOTicker)}`, { dias: 7 });
      const hit = (b.hits?.hits || []).find((h) => String(h._source?.tickers || '').toUpperCase().split(/[,\s]+/).includes(idOTicker.toUpperCase()));
      if (!hit) throw new Error(`Ticker ${idOTicker} no encontrado en EDGAR; pasa el CIK: --sec 320193`);
      cik = +hit._id; nombre = String(hit._source.entity || '').replace(/\s*\(.*\)$/, '');
    }
  }
  const cik10 = String(cik).padStart(10, '0');
  const cf = await bajar(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik10}.json`, { dias: 1 });
  const { tax, hechos } = hechosSec(cf);
  const formas = [...new Set(hechos.map((h) => h.forma))];
  return { fuente: `SEC EDGAR, API companyfacts (XBRL de los ${formas.join('/')})`, entidad: cf.entityName || nombre, identificador: `CIK ${cik10}`, normas: tax === 'us-gaap' ? 'US GAAP' : 'NIIF', mapa: tax === 'us-gaap' ? MAPA_USGAAP : MAPA_IFRS, hechos,
    documentos: [{ titulo: `${cf.entityName || nombre}: hechos XBRL (companyfacts)`, url: `https://data.sec.gov/api/xbrl/companyfacts/CIK${cik10}.json` }, { titulo: 'Archivos presentados (EDGAR)', url: `https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=${cik10}&type=10-K&dateb=&owner=include&count=40` }] };
}
async function desdeEsef(nombreOLei) {
  const API = 'https://filings.xbrl.org';
  let lei = /^[A-Z0-9]{20}$/.test(nombreOLei) ? nombreOLei : null, nombre = null;
  if (!lei) {
    const filtro = encodeURIComponent(JSON.stringify([{ name: 'name', op: 'ilike', val: `%${nombreOLei}%` }]));
    const e = await bajar(`${API}/api/entities?filter=${filtro}&page%5Bsize%5D=10`, { dias: 30 });
    if (!e.data?.length) throw new Error(`Ninguna entidad ESEF con nombre «${nombreOLei}»; prueba con otra forma del nombre o el LEI`);
    if (e.data.length > 1) console.error(`Varias entidades: ${e.data.map((x) => `${x.attributes.name} (${x.attributes.identifier})`).join('; ')}. Se usa la primera; pasa el LEI para elegir otra.`);
    lei = e.data[0].attributes.identifier; nombre = e.data[0].attributes.name;
  } else {
    try { nombre = (await bajar(`${API}/api/entities/${lei}`, { dias: 30 })).data?.attributes?.name || null; } catch { /* el nombre es opcional */ }
  }
  const lista = await bajar(`${API}/api/entities/${lei}/filings?page%5Bsize%5D=50`, { dias: 1 });
  const archivos = (lista.data || []).map((f) => f.attributes).filter((f) => f.json_url && f.period_end).sort((x, y) => x.period_end.localeCompare(y.period_end));
  if (!archivos.length) throw new Error(`Sin informes ESEF con xBRL-JSON para ${lei}`);
  // Cada informe anual trae dos ejercicios: con la mitad de informes más uno basta. El más reciente de cada cierre manda.
  const porCierre = new Map();
  for (const f of archivos) porCierre.set(f.period_end, f);
  const elegidos = [...porCierre.values()].slice(-Math.ceil(ANIOS / 2 + 1));
  let hechos = [];
  const documentos = [];
  for (const f of elegidos) {
    console.error(`  bajando ESEF ${f.period_end} (${f.country}) …`);
    const j = await bajar(`${API}${f.json_url}`, { dias: 365 });
    hechos = hechos.concat(hechosEsef(j, f.date_added || f.period_end));
    documentos.push({ titulo: `${nombre || lei}: informe anual ${f.period_end.slice(0, 4)} (ESEF, ${f.country})`, url: `${API}${f.report_url || f.json_url}`, xbrl_json: `${API}${f.json_url}`, errores_validacion: f.error_count ?? null });
  }
  return { fuente: 'Repositorio ESEF de XBRL International (filings.xbrl.org), informes anuales en xBRL-JSON', entidad: nombre || lei, identificador: `LEI ${lei}`, normas: 'NIIF', mapa: MAPA_IFRS, hechos, documentos };
}

const origen = a.sec ? await desdeSec(String(a.sec)) : await desdeEsef(String(a.esef));
const mapaExtra = a.mapa ? JSON.parse(readFileSync(a.mapa, 'utf8')) : {};
const { series, usado, faltan, divisa, fines } = construirSeries(origen.hechos, origen.mapa, mapaExtra);
const avisos = [];
if (origen.normas === 'US GAAP') avisos.push('US GAAP: los intereses pagados van en explotación (intereses_en_financiacion = 0); `deuda_financiera` sale de los conceptos de deuda a largo y corto y puede incluir arrendamientos financieros: compruébalo en la nota de deuda.');
avisos.push('BPA, DPA y acciones de cada ejercicio son los publicados ENTONCES: un split posterior (Apple 4:1 en 2020) no está reexpresado en los años viejos; ajústalos para que toda la serie esté en acciones de hoy.');
avisos.push('`participadas_en_ebitda`, `no_recurrentes_en_ebitda` y `dpa_extraordinario` no están en el XBRL: míralos en el informe anual. `ebitda` = EBIT + amortizaciones del XBRL (sin ajustes de la empresa).');
if (series.cuenta.some((f) => f.ingresos === null)) avisos.push('Algún ejercicio sin ingresos en el XBRL: la empresa usa un concepto propio (extensión); añádelo con --mapa.');
const resultado = {
  fuente: origen.fuente, entidad: origen.entidad, identificador: origen.identificador, normas: origen.normas, divisa, unidades: 'millones (BPA y DPA en unidades; acciones en millones)',
  generado: new Date().toISOString().slice(0, 10), ejercicios: fines, financieros: { cuenta: series.cuenta }, balance: { historico: series.balance }, flujos: { historico: series.flujos },
  mapa: usado, faltan, avisos, documentos: origen.documentos,
};
const dir = a.dir || '.';
mkdirSync(dir, { recursive: true });
const salida = a.salida || join(dir, 'cuentas-xbrl.json');
writeFileSync(salida, JSON.stringify(resultado, null, 2) + '\n');

// Resumen por pantalla
const f0 = (v) => (v === null || v === undefined ? 'n.d.' : typeof v === 'number' ? v.toLocaleString('es-ES', { maximumFractionDigits: v < 100 ? 2 : 0 }) : v);
console.log(`${origen.entidad} (${origen.identificador}, ${origen.normas}, ${divisa} millones) · ${fines.length} ejercicios: ${fines[0]} … ${fines.at(-1)} → ${salida}`);
for (const [bloque, filas] of [['Cuenta', series.cuenta], ['Balance', series.balance], ['Flujos', series.flujos]]) {
  const campos = Object.keys(filas[0]).filter((k) => k !== 'periodo' && k !== 'fin' && filas.some((f) => f[k] !== null));
  console.log(`\n${bloque}: ${['campo', ...filas.map((f) => f.periodo)].join(' | ')}`);
  for (const c of campos) console.log(`  ${c.padEnd(26)} ${filas.map((f) => f0(f[c]).padStart(9)).join(' ')}`);
}
const sinDato = Object.entries(faltan).flatMap(([b, cs]) => cs.map((c) => `${b}.${c}`));
if (sinDato.length) console.log(`\nSin concepto en el XBRL (buscar en las cuentas): ${sinDato.join(', ')}`);
for (const av of avisos) console.log(`AVISO: ${av}`);
