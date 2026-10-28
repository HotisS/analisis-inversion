// Backtest de la calidad ampliada (protocolo: verticales/empresa/backtest/calidad-ampliada-preregistro-2026-10-28.md).
// 10 pruebas de calidad con cifras de los 10-K conocidas el día de la decisión (1 día hábil después del 10-K); rentabilidad total a 12 m frente al índice.
//   node herramientas/backtest-calidad-ampliada.mjs <carpeta de datos>   (datos de bajar-datos-backtest.mjs: universo-todo.json, sec/, yh/)
// Escribe verticales/empresa/backtest/calidad-ampliada-resultados-2026-10-28.md y <carpeta>/obs-calidad.json.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, mediana, media, f1, atipicos, historia, v2, crecimientoIngenuo, calc } from './backtest-comun.mjs';

const DIR = process.argv[2];
const leer = (f) => { try { return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null; } catch { return null; } };
const DIA = 86400000, iso = (ms) => new Date(ms).toISOString().slice(0, 10);
const WACC = 8;

// ---------- Precios (igual que backtest-metodo-rapido.mjs) ----------
const cachePx = {};
function serie(sim) {
  if (sim in cachePx) return cachePx[sim];
  const j = leer(join(DIR, 'yh', `${sim.replace(/[^\w.^-]/g, '_')}.json`))?.chart?.result?.[0];
  if (!j?.timestamp) return (cachePx[sim] = null);
  const q = j.indicators.quote[0], adj = j.indicators.adjclose?.[0]?.adjclose || q.close, t = [], c = [], a = [];
  for (let i = 0; i < j.timestamp.length; i++) if (q.close[i] > 0 && adj[i] > 0) { t.push(j.timestamp[i] * 1000); c.push(q.close[i]); a.push(adj[i]); }
  const divs = Object.values(j.events?.dividends || {}).map((d) => ({ t: d.date * 1000, v: d.amount }));
  const splits = Object.values(j.events?.splits || {}).map((s) => ({ t: s.date * 1000, r: s.numerator / s.denominator })).filter((s) => s.r > 0);
  return (cachePx[sim] = { t, c, a, divs, splits });
}
const idxEn = (s, ms) => { let lo = 0, hi = s.t.length - 1, r = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (s.t[m] <= ms) { r = m; lo = m + 1; } else hi = m - 1; } return r; };
const idxDesde = (s, ms) => { const i = idxEn(s, ms - 1); return i + 1 < s.t.length ? i + 1 : -1; };
function decision(s, msF) {
  const i = idxDesde(s, msF + DIA); if (i < 0) return null;
  const j = idxDesde(s, s.t[i] + 365 * DIA); if (j < 0 || s.t[j] - s.t[i] > 380 * DIA) return null;
  return { i, fecha: s.t[i], precio: s.c[i], ret: s.a[j] / s.a[i] - 1, fin: s.t[j] };
}
const retIndice = (sim, ms0, ms1) => { const s = serie(sim); if (!s) return null; const i = idxDesde(s, ms0), j = idxDesde(s, ms1); return i < 0 || j < 0 ? null : s.a[j] / s.a[i] - 1; };
const dpaUltimo = (s, ms) => s.divs.filter((d) => d.t <= ms && d.t > ms - 365 * DIA).reduce((x, d) => x + d.v, 0);

// ---------- Reglas de números (copia de backtest-metodo-rapido.mjs) ----------
const v3t = (actual, h, tope = 1.1) => {
  let base = actual * Math.sqrt(h.mediana_5a / actual);
  base = Math.min(Math.max(base, actual / tope), actual * tope);
  return { bajista: Math.min(h.minimo_5a, base * 0.8), base, alcista: Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * 1.35)) };
};
function selectorT(o, k) {
  if (o.hAl.mediana_5a / o.actual >= 1.8) return calc(o, v2(o.actual, o.hCl), k);
  if (o.hAl.n <= 3) { const a = calc(o, v3t(o.actual, o.hAl), k), b = calc(o, v2(o.actual, o.hCl), k); return a.retPond <= b.retPond ? a : b; }
  return calc(o, v3t(o.actual, o.hAl), k);
}
const pasa = (c, u) => c.retPond >= u[0] && c.retBase >= u[1];
function numeros(o) {
  const U = [15, 12], M = [10, 5], k = { bpa2: o.bpa2 }, k9 = { bpa2: o.bpa2 * 0.9 };
  const s = selectorT(o, k), w = calc(o, v2(o.actual, o.hCl), k), s9 = selectorT(o, k9), w9 = calc(o, v2(o.actual, o.hCl), k9);
  const A = pasa(s, U) && pasa(w, U) && pasa(s9, U) && pasa(w9, U);
  const B = !A && pasa(s, U) && pasa(w, M) && pasa(s9, M) && pasa(w9, M);
  return A ? 'A' : B ? 'B' : pasa(s, M) ? 'M' : 'V';
}
function obsNumeros(emp, t, precio, dpa) {
  let g = crecimientoIngenuo(emp.bpa, emp.anios.filter((y) => y <= t), t);
  if (g === null || !(emp.bpa[t] > 0)) return null;
  const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado'); if (!hC || !hA) return null;
  const bpa1 = emp.bpa[t] * (1 + g), bpa2 = bpa1 * (1 + g), actual = precio / bpa1;
  if (!(actual > 0) || actual > 150) return null;
  const excl = atipicos(emp, t);
  const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
  return numeros({ bpa2, actual, precio, dpa, hCl, hAl });
}

// ---------- Cifras anuales de los 10-K (primera presentación de cada cierre) ----------
function anuales(sec, conceptos, duracion) {
  const por = {};
  for (const k of conceptos) {
    const arr = sec.c[k]?.f; if (!arr) continue;
    const este = {};
    for (const [start, end, val, filed, fp] of arr) {
      if (fp !== 'FY') continue;
      if (duracion) { if (!start) continue; const d = (Date.parse(end) - Date.parse(start)) / DIA; if (d < 340 || d > 390) continue; } else if (start) continue;
      if (!este[end] || filed < este[end].filed) este[end] = { val, filed };
    }
    for (const [e, v] of Object.entries(este)) if (!por[e]) por[e] = v; // el primer concepto de la lista manda
  }
  return por;
}
const anio = (e) => { const d = new Date(e); return d.getUTCMonth() === 0 ? d.getUTCFullYear() - 1 : d.getUTCFullYear(); };
const div = (a, b) => (a == null || b == null || !Number.isFinite(a) || !Number.isFinite(b) || b === 0 ? null : a / b);

function filasEmpresa(sec, s) {
  const D = (c) => anuales(sec, c, true), I = (c) => anuales(sec, c, false);
  let eps = D(['EarningsPerShareDiluted']); if (Object.keys(eps).length < 4) eps = D(['EarningsPerShareBasic']);
  const x = {
    oi: D(['OperatingIncomeLoss']), eq: I(['StockholdersEquity']), eqT: I(['StockholdersEquityIncludingPortionAttributableToNoncontrollingInterest', 'StockholdersEquity']),
    ltd1: I(['LongTermDebtNoncurrent']), ltd2: I(['LongTermDebt']), ltdc: I(['LongTermDebtCurrent', 'DebtCurrent']), stb: I(['ShortTermBorrowings']),
    cash: I(['CashAndCashEquivalentsAtCarryingValue']), ni: D(['NetIncomeLoss', 'ProfitLoss']), cfo: D(['NetCashProvidedByUsedInOperatingActivities']),
    capex: D(['PaymentsToAcquirePropertyPlantAndEquipment']), rev: D(['Revenues', 'RevenueFromContractWithCustomerExcludingAssessedTax', 'SalesRevenueNet', 'RevenueFromContractWithCustomerIncludingAssessedTax']),
    gp: D(['GrossProfit']), cor: D(['CostOfRevenue', 'CostOfGoodsAndServicesSold']), at: I(['Assets']), ac: I(['AssetsCurrent']), pc: I(['LiabilitiesCurrent']), pt: I(['Liabilities']),
    re: I(['RetainedEarningsAccumulatedDeficit']), int: D(['InterestExpense', 'InterestExpenseNonoperating', 'InterestExpenseDebt']),
    acc: D(['WeightedAverageNumberOfDilutedSharesOutstanding', 'WeightedAverageNumberOfSharesOutstandingBasic']), da: D(['DepreciationDepletionAndAmortization', 'DepreciationAndAmortization', 'DepreciationAmortizationAndAccretionNet']),
  };
  const ajSplit = (filed) => s.splits.filter((z) => z.t > Date.parse(filed)).reduce((p, z) => p * z.r, 1);
  const filas = Object.keys(eps).sort().map((e) => {
    const v = (k) => x[k][e]?.val ?? null, f = { e, y: anio(e), filed: eps[e].filed, bpa: eps[e].val / ajSplit(eps[e].filed) };
    f.ebit = v('oi'); f.ni = v('ni'); f.cfo = v('cfo'); f.capex = v('capex'); f.rev = v('rev'); f.at = v('at'); f.ac = v('ac'); f.pc = v('pc'); f.re = v('re'); f.int = v('int'); f.da = v('da'); f.cash = v('cash') ?? 0;
    f.gp = v('gp') ?? (f.rev != null && v('cor') != null ? f.rev - v('cor') : null);
    f.pt = v('pt') ?? (f.at != null && v('eqT') != null ? f.at - v('eqT') : null);
    f.acc = v('acc') != null ? v('acc') * ajSplit(x.acc[e].filed) : null;
    const ltd = v('ltd1') ?? v('ltd2'); f.ltd = ltd;
    f.deuda = v('ltd1') != null ? v('ltd1') + (v('ltdc') ?? 0) + (v('stb') ?? 0) : (v('ltd2') ?? 0) + (v('stb') ?? 0) + (v('ltd2') == null ? (v('ltdc') ?? 0) : 0);
    // ROIC como el estudio del 20-oct (EBIT × 0,79 ÷ (patrimonio + deuda a largo − caja))
    const q = v('eq'); f.roic = f.ebit == null || q == null ? null : (() => { const ic = q + (ltd ?? 0) - f.cash; return ic > 0 ? (100 * f.ebit * 0.79) / ic : null; })();
    return f;
  });
  const porY = {}; for (const f of filas) if (!porY[f.y] || f.e > porY[f.y].e) porY[f.y] = f;
  return porY;
}

// ---------- Las 10 pruebas (true / false / null = n.d.) ----------
function pruebas(c, sector, mcap) {
  const u = c.at(-1), u1 = c.at(-2), u3 = c.length >= 4 ? c.at(-4) : null, fin = /Financ|Real Estate/.test(sector || '');
  const r = {};
  const roics = c.slice(-5).map((f) => f.roic).filter((z) => z != null);
  r.P1 = roics.length >= 4 ? roics.every((z) => z >= WACC) : null;
  const c3 = c.slice(-3), sNi = c3.every((f) => f.ni != null) ? c3.reduce((a, f) => a + f.ni, 0) : null, sF = c3.every((f) => f.cfo != null) ? c3.reduce((a, f) => a + f.cfo - (f.capex ?? 0), 0) : null;
  r.P2 = c3.length === 3 && sNi != null && sF != null ? (sNi > 0 ? sF / sNi >= 0.8 : false) : null;
  r.P3 = u.ni != null && u.cfo != null && u.at ? (u.ni - u.cfo) / u.at <= 0.05 : null;
  if (fin) { r.P4 = null; r.P5 = null; } else {
    const dn = u.deuda - u.cash, ebitda = u.ebit != null ? u.ebit + (u.da ?? 0) : null;
    r.P4 = dn <= 0 ? true : ebitda == null ? null : ebitda <= 0 ? false : dn / ebitda <= 3;
    r.P5 = u.int != null && u.int > 0 ? (u.ebit != null ? u.ebit / u.int >= 5 : null) : (u.deuda <= 0 ? true : u.ebit != null && u.ebit > 0 && (u.deuda - u.cash) <= 0 ? true : null);
  }
  const mg = c.slice(-5).map((f) => div(f.ebit, f.rev)).filter((z) => z != null);
  r.P6 = mg.length >= 4 ? 100 * (Math.max(...mg) - Math.min(...mg)) <= 10 : null;
  r.P7 = u3 && u.acc && u3.acc ? Math.pow(u.acc / u3.acc, 1 / 3) - 1 <= 0.02 : null;
  if (u1) {
    const roa = (f) => div(f.ni, f.at), lev = (f) => div(f.ltd ?? 0, f.at), cr = (f) => div(f.ac, f.pc), gm = (f) => div(f.gp, f.rev), tu = (f) => div(f.rev, f.at);
    const cmp = (a, b, fn) => (a == null || b == null ? null : fn(a, b));
    const k = [u.ni == null ? null : u.ni > 0, u.cfo == null ? null : u.cfo > 0, cmp(roa(u), roa(u1), (a, b) => a > b), u.cfo == null || u.ni == null ? null : u.cfo > u.ni,
      cmp(lev(u), lev(u1), (a, b) => a <= b), cmp(cr(u), cr(u1), (a, b) => a > b), cmp(u.acc, u1.acc, (a, b) => a <= b * 1.005), cmp(gm(u), gm(u1), (a, b) => a > b), cmp(tu(u), tu(u1), (a, b) => a > b)];
    const con = k.filter((z) => z !== null); r.F = con.length >= 7 ? (9 * con.filter(Boolean).length) / con.length : null;
    r.P8 = r.F == null ? null : r.F >= 6;
  } else r.P8 = null;
  if (fin || !u.at || u.pt == null || !mcap) r.P9 = null;
  else { const z = 1.2 * div((u.ac ?? NaN) - (u.pc ?? NaN), u.at) + 1.4 * div(u.re ?? 0, u.at) + 3.3 * div(u.ebit, u.at) + 0.6 * div(mcap, u.pt) + 1.0 * div(u.rev, u.at); r.Z = Number.isFinite(z) ? z : null; r.P9 = r.Z == null ? null : r.Z > 1.81; }
  r.P10 = u3 && u.rev != null && u3.rev != null ? u.rev >= u3.rev : null;
  const claves = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'], con = claves.filter((k) => r[k] !== null);
  r.nota = con.length >= 6 ? con.filter((k) => r[k]).length / con.length : null;
  r.crecVentas3 = u3 && u.rev > 0 && u3.rev > 0 ? Math.pow(u.rev / u3.rev, 1 / 3) - 1 : null;
  return r;
}

// ---------- Observaciones ----------
const U = leer(join(DIR, 'universo-todo.json')) || [];
const obs = [];
for (const u of U) {
  const sim = u.tk.replace('.', '-'), s = serie(sim), sec = leer(join(DIR, 'sec', `${u.cik}.json`)); if (!s || !sec?.c) continue;
  const porY = filasEmpresa(sec, s), idx = u.indice === '600' ? 'IJR' : 'SPY';
  for (const f of Object.values(porY)) {
    if (f.y < 2012 || f.y > 2024) continue;
    const msF = Date.parse(f.filed), conocidas = Object.values(porY).filter((z) => z.y <= f.y && Date.parse(z.filed) <= msF).sort((a, b) => a.y - b.y);
    if (conocidas.length < 4 || conocidas.at(-1).y !== f.y) continue;
    const d = decision(s, msF); if (!d) continue;
    const ri = retIndice(idx, d.fecha, d.fin); if (ri == null) continue;
    const r3 = [f.y, f.y - 1, f.y - 2].map((y) => conocidas.find((z) => z.y === y)?.roic ?? null);
    const calidad = r3[0] == null ? 'desconocida' : r3.every((z) => z != null && z - WACC >= 5) ? 'completa' : (r3[0] - WACC >= 5 || r3.every((z) => z != null && z - WACC >= 4.5)) ? 'aflojada' : 'falla';
    const emp = { anios: [], bpa: {}, precio: {} };
    for (const z of conocidas) { const i = idxEn(s, Date.parse(z.e)); if (i < 0) continue; emp.anios.push(z.y); emp.bpa[z.y] = z.bpa; emp.precio[z.y] = s.c[i]; }
    const num = emp.anios.length >= 4 ? obsNumeros(emp, f.y, d.precio, dpaUltimo(s, d.fecha)) : null;
    const mcap = f.acc ? f.acc * d.precio : null; // acciones en base de hoy × precio en base de hoy
    const grupo = !num ? 'sin números' : num === 'A' && calidad === 'completa' ? 'A' : num === 'B' && calidad === 'completa' ? 'B1' : num === 'A' && calidad === 'aflojada' ? 'B2' : num === 'B' && calidad === 'aflojada' ? 'C' : num === 'A' || num === 'B' ? 'Compra sin calidad' : num === 'M' ? 'Mantener' : 'Vender';
    obs.push({ ticker: u.tk, indice: u.indice, sector: u.sector, fecha: iso(d.fecha), anioDec: new Date(d.fecha).getUTCFullYear(), ret: d.ret, ex: d.ret - ri, calidad, num, grupo, ...pruebas(conocidas, u.sector, mcap) });
  }
}

// ---------- Medidas ----------
const P = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7', 'P8', 'P9', 'P10'];
const NOMBRE = { P1: 'ROIC estable (nunca < WACC en 5 años)', P2: 'Conversión en caja ≥ 0,8', P3: 'Devengos ≤ 5 % del activo', P4: 'Deuda neta / EBITDA ≤ 3', P5: 'Cobertura de intereses ≥ 5', P6: 'Margen EBIT estable (rango ≤ 10 pp)', P7: 'Sin dilución (≤ 2 % anual)', P8: 'Piotroski ≥ 6', P9: 'Altman Z > 1,81', P10: 'Ventas no encogen en 3 años' };
const medir = (sel) => { const e = sel.map((o) => o.ex), r = sel.map((o) => o.ret); return { n: sel.length, exMed: sel.length ? 100 * mediana(e) : null, exMedia: sel.length ? 100 * media(e) : null, bate: sel.length ? (100 * e.filter((z) => z > 0).length) / sel.length : null, pierde10: sel.length ? (100 * r.filter((z) => z < -0.1).length) / sel.length : null }; };
const cel = (m) => (m.n ? `${f1(m.exMed)} % · ${f1(m.pierde10, 0)} % · ${m.n}` : 'n.d.');
const grande = obs.filter((o) => o.indice !== '600'), peq = obs.filter((o) => o.indice === '600');
const tickers = [...new Set(grande.map((o) => o.ticker))].sort(), mitad = Object.fromEntries(tickers.map((t, i) => [t, i % 2 ? 'validación' : 'diseño']));
const CORTES = { 'Todas (500+400)': (o) => o.indice !== '600', 'Validación empresas': (o) => o.indice !== '600' && mitad[o.ticker] === 'validación', '2012-2018': (o) => o.indice !== '600' && o.anioDec <= 2018, '2019-2025': (o) => o.indice !== '600' && o.anioDec >= 2019, 'S&P 600 (fuera)': (o) => o.indice === '600' };
const compra = (o) => o.grupo === 'A' || o.grupo === 'B1';
const out = [], W = (x) => out.push(x);
W('# Calidad ampliada · resultados (2026-10-28)\n');
W('Estudio. **No cambia el método vigente.** Protocolo fijado antes: `calidad-ampliada-preregistro-2026-10-28.md` (commit 37462e0). Script: `herramientas/backtest-calidad-ampliada.mjs`.');
W(`Decisión 1 día hábil después del 10-K; rentabilidad total a 12 meses; exceso frente al SPY (S&P 500/400) o al IJR (S&P 600). Celdas: **exceso mediano · % que pierde > 10 % · n**.\n`);
W(`Observaciones: ${grande.length} del S&P 500/400 (${tickers.length} empresas) y ${peq.length} del S&P 600 (${new Set(peq.map((o) => o.ticker)).size} empresas). Compras con la calidad de hoy (A + B1): ${grande.filter(compra).length} y ${peq.filter(compra).length}.\n`);
W('Cobertura de cada prueba (% de observaciones con dato, 500/400): ' + P.map((k) => `${k} ${f1((100 * grande.filter((o) => o[k] !== null).length) / grande.length, 0)} %`).join(' · ') + '\n');

const res = {};
W('## 1. Universo entero: pasa frente a falla\n');
W(`| Prueba | ${Object.keys(CORTES).map((c) => `${c} pasa | ${c} falla`).join(' | ')} |\n|---|${Object.keys(CORTES).map(() => '--:|--:').join('|')}|`);
for (const k of P) {
  const celdas = Object.entries(CORTES).map(([c, fc]) => { const sel = obs.filter(fc), a = medir(sel.filter((o) => o[k] === true)), b = medir(sel.filter((o) => o[k] === false)); (res[k] ||= {})[c] = { pasa: a, falla: b }; return `${cel(a)} | ${cel(b)}`; });
  W(`| ${k} ${NOMBRE[k]} | ${celdas.join(' | ')} |`);
}
W('\n## 2. Dentro de las compras con la calidad de hoy (A + B1): pasa frente a falla\n');
W(`| Prueba | ${Object.keys(CORTES).map((c) => `${c} pasa | ${c} falla`).join(' | ')} |\n|---|${Object.keys(CORTES).map(() => '--:|--:').join('|')}|`);
const res2 = {};
for (const k of P) {
  const celdas = Object.entries(CORTES).map(([c, fc]) => { const sel = obs.filter((o) => fc(o) && compra(o)), a = medir(sel.filter((o) => o[k] === true)), b = medir(sel.filter((o) => o[k] === false)); (res2[k] ||= {})[c] = { pasa: a, falla: b }; return `${cel(a)} | ${cel(b)}`; });
  W(`| ${k} | ${celdas.join(' | ')} |`);
}
W('\n## 3. Filtro sobre A + B1: (A + B1 que no falla la prueba) frente a (A + B1)\n');
W(`| Variante | ${Object.keys(CORTES).join(' | ')} |\n|---|${Object.keys(CORTES).map(() => '--:').join('|')}|`);
const res3 = {}, base3 = {};
W(`| A + B1 (hoy) | ${Object.entries(CORTES).map(([c, fc]) => { const m = medir(obs.filter((o) => fc(o) && compra(o))); base3[c] = m; return cel(m); }).join(' | ')} |`);
for (const k of P) W(`| + ${k} | ${Object.entries(CORTES).map(([c, fc]) => { const m = medir(obs.filter((o) => fc(o) && compra(o) && o[k] !== false)); (res3[k] ||= {})[c] = m; return cel(m); }).join(' | ')} |`);

W('\n## 4. Nota de pruebas (% de pruebas con dato que pasa), por tercios\n');
const tercios = (sel) => { const v = sel.filter((o) => o.nota != null).map((o) => o.nota).sort((a, b) => a - b); return [v[Math.floor(v.length / 3)], v[Math.floor((2 * v.length) / 3)]]; };
const [t1, t2] = tercios(grande);
W(`Cortes de los tercios (500/400): ${f1(100 * t1, 0)} % y ${f1(100 * t2, 0)} %.\n`);
W(`| Conjunto | ${Object.keys(CORTES).join(' | ')} |\n|---|${Object.keys(CORTES).map(() => '--:').join('|')}|`);
for (const [nom, fn] of [['Universo · tercio bajo', (o) => o.nota != null && o.nota < t1], ['Universo · tercio medio', (o) => o.nota != null && o.nota >= t1 && o.nota < t2], ['Universo · tercio alto', (o) => o.nota != null && o.nota >= t2],
  ['A + B1 · tercio bajo', (o) => compra(o) && o.nota != null && o.nota < t1], ['A + B1 · tercios medio y alto', (o) => compra(o) && o.nota != null && o.nota >= t1], ['A + B1 · tercio alto', (o) => compra(o) && o.nota != null && o.nota >= t2]])
  W(`| ${nom} | ${Object.values(CORTES).map((fc) => cel(medir(obs.filter((o) => fc(o) && fn(o))))).join(' | ')} |`);

W('\n## 5. Growth (ventas ≥ +20 % anual en 3 años, con o sin beneficio): pasa frente a falla\n');
const gr = (o) => o.crecVentas3 != null && o.crecVentas3 >= 0.2;
W(`| Prueba | 500/400 pasa | 500/400 falla | 2019-2025 pasa | 2019-2025 falla | S&P 600 pasa | S&P 600 falla |\n|---|--:|--:|--:|--:|--:|--:|`);
for (const k of ['P2', 'P4', 'P5', 'P7', 'P9', 'P3', 'P8']) {
  const c = [CORTES['Todas (500+400)'], CORTES['2019-2025'], CORTES['S&P 600 (fuera)']].map((fc) => { const sel = obs.filter((o) => fc(o) && gr(o)); return `${cel(medir(sel.filter((o) => o[k] === true)))} | ${cel(medir(sel.filter((o) => o[k] === false)))}`; });
  W(`| ${k} ${NOMBRE[k]} | ${c.join(' | ')} |`);
}

// ---------- Veredicto con el criterio fijado ----------
W('\n## 6. Veredicto con el criterio fijado\n');
const VAL = ['Validación empresas', '2019-2025', 'S&P 600 (fuera)'], veredicto = {};
for (const k of P) {
  const duro = VAL.every((c) => res3[k][c].n >= 30 && res3[k][c].exMed > base3[c].exMed && res3[k][c].pierde10 <= base3[c].pierde10 + 3 && res3[k][c].n >= base3[c].n / 2);
  const comp = VAL.every((c) => res[k][c].pasa.n >= 30 && res[k][c].falla.n >= 30 && res[k][c].pasa.exMed > res[k][c].falla.exMed)
    && (res2[k]['Todas (500+400)'].falla.n < 10 || res2[k]['Todas (500+400)'].pasa.exMed >= res2[k]['Todas (500+400)'].falla.exMed);
  veredicto[k] = duro ? 'filtro duro' : comp ? 'componente de la nota' : 'informativa';
  W(`- **${k} ${NOMBRE[k]}: ${veredicto[k]}.** Filtro sobre A + B1: ${VAL.map((c) => `${c} ${f1(res3[k][c].exMed)} frente a ${f1(base3[c].exMed)} (n ${res3[k][c].n}/${base3[c].n})`).join('; ')}. Universo pasa − falla: ${VAL.map((c) => `${c} ${f1(res[k][c].pasa.exMed - res[k][c].falla.exMed)} pt`).join('; ')}.`);
}
writeFileSync(join(raiz, 'verticales/empresa/backtest/calidad-ampliada-resultados-2026-10-28.md'), out.join('\n') + '\n');
writeFileSync(join(DIR, 'obs-calidad.json'), JSON.stringify(obs));
writeFileSync(join(DIR, 'veredicto.json'), JSON.stringify({ veredicto, res, res2, res3, base3 }));
console.log(out.join('\n'));
