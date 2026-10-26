// Comparables de Tomra: los ocho del informe del 8-oct (MarketScreener, precios del 7-oct) llevados al cierre del 23-oct
// con la variación de precio de cada acción (Yahoo) y del tipo de cambio de su divisa frente al EUR (BCE).
// Las estimaciones (EBITDA y BPA) no se tocan: solo cambia el precio. EV nuevo = EV viejo + Δcapitalización
// (DN = EV × DN/EBITDA ÷ EV/EBITDA LTM). Además lee la ficha de Yahoo de Tomra (objetivo medio y analistas).
// Uso: NODE_USE_ENV_PROXY=1 node informes/tomra-2026-10-26/notas/comparables-precio.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { ficha, json } from '../../../herramientas/yahoo.mjs';
const DIR = dirname(fileURLToPath(import.meta.url));
const D = JSON.parse(readFileSync(join(DIR, 'D.json'), 'utf8'));
const YH = { 'Envipco Holding': ['ENVIP.OL', 'NOK'], 'JBT Marel': ['JBTM', 'USD'], Krones: ['KRN.DE', 'EUR'], 'Mettler-Toledo': ['MTD', 'USD'], Cognex: ['CGNX', 'USD'], Halma: ['HLMA.L', 'GBP'], 'Alfa Laval': ['ALFA.ST', 'SEK'], Kardex: ['KARN.SW', 'CHF'] };
// BCE: unidades por EUR el 7-oct y el 23-oct-2026.
const BCE = { '2026-10-07': { NOK: 10.712, SEK: 11.224, CHF: 0.9309, USD: 1.1177, GBP: 0.84645, EUR: 1 }, '2026-10-23': {} };
for (const c of ['NOK', 'SEK', 'CHF', 'USD', 'GBP']) {
  const t = await fetch(`https://data-api.ecb.europa.eu/service/data/EXR/D.${c}.EUR.SP00.A?startPeriod=2026-10-23&endPeriod=2026-10-23&format=csvdata`).then((r) => r.text());
  BCE['2026-10-23'][c] = +t.trim().split('\n').at(-1).split(',')[7];
}
BCE['2026-10-23'].EUR = 1;
async function cierre(sim, dia) {
  const p1 = Math.floor(Date.parse(dia + 'T00:00:00Z') / 1000), p2 = p1 + 86400;
  const r = await json(`https://query1.finance.yahoo.com/v8/finance/chart/${sim}?period1=${p1}&period2=${p2}&interval=1d`);
  const q = r?.chart?.result?.[0];
  return q?.indicators?.quote?.[0]?.close?.filter((x) => x != null).at(-1) ?? null;
}
const r1 = (x, n = 1) => Math.round(x * 10 ** n) / 10 ** n;
const out = [];
for (const e of D.comparables.empresas) {
  const [sim, div] = YH[e.nombre];
  const p0 = await cierre(sim, '2026-10-07'), p1 = await cierre(sim, '2026-10-23');
  const fx = BCE['2026-10-07'][div] / BCE['2026-10-23'][div];
  const k = (p1 / p0) * fx; // variación de la capitalización en EUR
  const dnEv = e.ev_ebitda_ltm ? e.dn_ebitda / e.ev_ebitda_ltm : (e.ev_ebitda_ntm ? 0 : 0);
  const ev0 = e.capitalizacion / (1 - dnEv), ev1 = ev0 + e.capitalizacion * (k - 1), m = ev1 / ev0;
  out.push({ ...e, capitalizacion: Math.round(e.capitalizacion * k), ev_ventas: r1(e.ev_ventas * m, 2), ev_ebitda_ltm: e.ev_ebitda_ltm == null ? null : r1(e.ev_ebitda_ltm * m), ev_ebitda_ntm: e.ev_ebitda_ntm == null ? null : r1(e.ev_ebitda_ntm * m), per_ntm: e.per_ntm == null ? null : r1(e.per_ntm * k / fx), fcf_yield_pct: e.fcf_yield_pct == null ? null : r1(e.fcf_yield_pct / k), _sim: sim, _p0: p0, _p1: p1, _var_precio_pct: r1((p1 / p0 - 1) * 100), _var_eur_pct: r1((k - 1) * 100) });
}
const t = await ficha('TOM.OL', { diasCache: 0 }).catch((e) => ({ error: e.message }));
const res = { fecha: '2026-10-23', bce: BCE, empresas: out, tomra_yahoo: { precio: t.precio, objetivo_medio: t.objetivo_medio, objetivo_max: t.objetivo_max, objetivo_min: t.objetivo_min, n_analistas: t.n_analistas, recomendacion: t.recomendacion, per_adelantado: t.per_adelantado, beta: t.beta, error: t.error } };
writeFileSync(join(DIR, 'comparables-precio.json'), JSON.stringify(res, null, 2));
console.table(out.map((e) => ({ n: e.nombre, p0: e._p0, p1: e._p1, var: e._var_precio_pct, eur: e._var_eur_pct, cap: e.capitalizacion, evn: e.ev_ebitda_ntm, per: e.per_ntm })));
console.log(res.tomra_yahoo, res.bce['2026-10-23']);
