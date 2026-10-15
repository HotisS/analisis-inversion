// Comparables de EMCOR desde Yahoo Finance (herramientas/yahoo.mjs), cierre más reciente. Ejecutar con NODE_USE_ENV_PROXY=1.
// Escribe notas/comparables-yahoo.json. EV = capitalización + deuda total − caja (último ejercicio de Yahoo).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json } from '../../../herramientas/yahoo.mjs';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lista = ['EME', 'FIX', 'PWR', 'MTZ', 'IESC', 'APG', 'PRIM', 'LMB', 'STRL', 'MYRG', 'DY'];
const salida = [];
for (const s of lista) {
  try {
    const f = await ficha(s, { diasCache: 0 });
    const anios = Object.keys(f.anual).sort();
    const u = f.anual[anios.at(-1)] || {};
    const m = (x) => (x == null ? null : x / 1e6);
    const cap = m(f.capitalizacion);
    const deuda = m(u.TotalDebt) ?? 0, caja = m(u.CashAndCashEquivalents) ?? 0;
    const ev = cap + deuda - caja;
    const ventas = m(f.ultimos12.TotalRevenue ?? u.TotalRevenue), ebitda = m(f.ultimos12.EBITDA ?? u.EBITDA), ebit = m(f.ultimos12.EBIT ?? u.EBIT);
    const fcf = m(f.ultimos12.FreeCashFlow ?? u.FreeCashFlow);
    const tasa = u.TaxRateForCalcs ?? 0.25;
    const roic = u.InvestedCapital ? (m(u.EBIT) * (1 - tasa)) / m(u.InvestedCapital) * 100 : null;
    let tendencia = null;
    try {
      const t = await json(`https://query2.finance.yahoo.com/v10/finance/quoteSummary/${s}?modules=earningsTrend`);
      tendencia = (t?.quoteSummary?.result?.[0]?.earningsTrend?.trend || []).map((x) => ({ periodo: x.period, fin: x.endDate, bpa: x.earningsEstimate?.avg?.raw, n: x.earningsEstimate?.numberOfAnalysts?.raw, ventas: x.revenueEstimate?.avg?.raw ? x.revenueEstimate.avg.raw / 1e6 : null, crec_ventas: x.revenueEstimate?.growth?.raw }));
    } catch {}
    salida.push({ ticker: s, nombre: f.nombre, pais: f.pais, precio: f.precio, capitalizacion: Math.round(cap), ev: Math.round(ev), ventas_ltm: ventas, ebitda_ltm: ebitda, ebit_ltm: ebit,
      ev_ventas: +(ev / ventas).toFixed(2), ev_ebitda_ltm: +(ev / ebitda).toFixed(1), per_ntm: f.per_adelantado ? +f.per_adelantado.toFixed(1) : null,
      margen_ebitda_pct: +(ebitda / ventas * 100).toFixed(1), roic_pct: roic == null ? null : +roic.toFixed(1), dn_ebitda: +((deuda - caja) / ebitda).toFixed(2),
      fcf_yield_pct: fcf == null ? null : +(fcf / cap * 100).toFixed(1), objetivo_medio: f.objetivo_medio, n_analistas: f.n_analistas, recomendacion: f.recomendacion, tendencia });
    console.log(s, 'ok');
  } catch (e) { console.log(s, 'fallo', e.message); }
}
fs.writeFileSync(path.join(dir, 'comparables-yahoo.json'), JSON.stringify({ fecha: new Date().toISOString(), empresas: salida }, null, 1));
