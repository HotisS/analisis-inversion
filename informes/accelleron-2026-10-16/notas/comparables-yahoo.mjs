// Comparables de Accelleron desde Yahoo Finance (cuentas de los últimos 12 meses, deuda neta del último ejercicio,
// PER adelantado y crecimiento esperado de ingresos del año próximo), todo pasado a USD con el cambio de Yahoo del día.
// Ejecutar: NODE_USE_ENV_PROXY=1 node informes/accelleron-2026-10-16/notas/comparables-yahoo.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json, aUsd, divisaPrincipal } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const LISTA = [
  ['Wärtsilä', 'WRT1V.HE', 'FI'], ['Burckhardt Compression', 'BCHN.SW', 'CH'], ['Garrett Motion', 'GTX', 'US'],
  ['Cummins', 'CMI', 'US'], ['Caterpillar', 'CAT', 'US'], ['Rolls-Royce', 'RR.L', 'GB'], ['IHI', '7013.T', 'JP'],
  ['Alfa Laval', 'ALFA.ST', 'SE'], ['Atlas Copco', 'ATCO-A.ST', 'SE'], ['Sulzer', 'SUN.SW', 'CH'], ['Accelleron (control)', 'ACLN.SW', 'CH'],
];
const r1 = (x) => (Number.isFinite(x) ? Math.round(x * 10) / 10 : null);
const r2 = (x) => (Number.isFinite(x) ? Math.round(x * 100) / 100 : null);
const salida = [];
for (const [nombre, simbolo, pais] of LISTA) {
  try {
    const f = await ficha(simbolo, { diasCache: 0 });
    const et = await json(`https://query1.finance.yahoo.com/v10/finance/quoteSummary/${encodeURIComponent(simbolo)}?modules=earningsTrend`).catch(() => null);
    const trend = et?.quoteSummary?.result?.[0]?.earningsTrend?.trend || [];
    const t1 = trend.find((t) => t.period === '+1y');
    const t0 = trend.find((t) => t.period === '0y');
    const fxPrecio = await aUsd(f.divisa); // precio y capitalización
    const fxCuentas = await aUsd(divisaPrincipal(f.divisa_cuentas));
    const cap = (f.capitalizacion * (await aUsd(divisaPrincipal(f.divisa)))) / 1e6;
    const anios = Object.keys(f.anual).sort();
    const ult = f.anual[anios.at(-1)] || {};
    const u = f.ultimos12 || {};
    const dn = Number.isFinite(ult.NetDebt) ? ult.NetDebt : (ult.TotalDebt ?? 0) - (ult.CashAndCashEquivalents ?? 0);
    const dnUsd = (dn * fxCuentas) / 1e6;
    const ev = cap + dnUsd;
    const ventas = (u.TotalRevenue * fxCuentas) / 1e6;
    const ebitda = (u.EBITDA * fxCuentas) / 1e6;
    const ebit = (u.EBIT * fxCuentas) / 1e6;
    const tasa = Number.isFinite(ult.TaxRateForCalcs) ? ult.TaxRateForCalcs : 0.22;
    const roic = Number.isFinite(ult.InvestedCapital) && ult.InvestedCapital > 0 ? (ult.EBIT * (1 - tasa)) / ult.InvestedCapital * 100 : null;
    const epsNext = t1?.earningsEstimate?.avg?.raw;
    const per = Number.isFinite(epsNext) && epsNext > 0 ? f.precio / epsNext : f.per_adelantado;
    salida.push({
      nombre, ticker: simbolo, pais, capitalizacion: Math.round(cap), ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: null,
      per_ntm: r1(per), crecimiento_pct: r1((t1?.revenueEstimate?.growth?.raw ?? null) * 100), margen_ebitda_pct: r1((ebitda / ventas) * 100),
      roic_pct: r1(roic), dn_ebitda: r2(dnUsd / ebitda), fcf_yield_pct: r1(((u.FreeCashFlow * fxCuentas) / 1e6 / cap) * 100),
      _control: { divisa: f.divisa, divisa_cuentas: f.divisa_cuentas, precio: f.precio, eps_next: epsNext, eps_0y: t0?.earningsEstimate?.avg?.raw, per_yahoo: f.per_adelantado, ventas_ltm_usd: Math.round(ventas), ebit_ltm_usd: Math.round(ebit), ultimo_anual: anios.at(-1), crec_0y: t0?.revenueEstimate?.growth?.raw },
    });
    console.log(nombre, JSON.stringify(salida.at(-1)));
  } catch (e) { console.error(nombre, e.message); }
}
fs.writeFileSync(path.join(dir, 'comparables-yahoo.json'), JSON.stringify({ fecha: new Date().toISOString().slice(0, 10), fuente: 'Yahoo Finance (quoteSummary, fundamentals-timeseries, earningsTrend), USD', empresas: salida }, null, 1));
