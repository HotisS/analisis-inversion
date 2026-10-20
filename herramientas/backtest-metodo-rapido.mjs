// Backtest del método value rápido (protocolo: verticales/empresa/backtest/metodo-rapido-preregistro-2026-10-20.md).
// Decisión 1 día hábil después de publicar las cuentas, precio de ese día, rentabilidad total a 12 m frente al índice.
//   node herramientas/backtest-metodo-rapido.mjs <carpeta de datos>   (datos de bajar.mjs: universo.json, sec/, yh/)
// Escribe verticales/empresa/backtest/metodo-rapido-resultados-2026-10-20.md y un .json con las observaciones (sin datos de cartera).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, n, mediana, media, f1, cargarEmpresas, atipicos, historia, v2, crecimientoIngenuo, calc } from './backtest-comun.mjs';

const DIR = process.argv[2];
const leer = (f) => { try { return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8')) : null; } catch { return null; } };
const DIA = 86400000, iso = (ms) => new Date(ms).toISOString().slice(0, 10);

// ---------- Precios de Yahoo ----------
const cachePx = {};
function serie(sim) {
  if (sim in cachePx) return cachePx[sim];
  const j = leer(join(DIR, 'yh', `${sim.replace(/[^\w.^-]/g, '_')}.json`))?.chart?.result?.[0];
  if (!j?.timestamp) return (cachePx[sim] = null);
  const q = j.indicators.quote[0], adj = j.indicators.adjclose?.[0]?.adjclose || q.close, t = [], c = [], a = [];
  for (let i = 0; i < j.timestamp.length; i++) if (q.close[i] > 0 && adj[i] > 0) { t.push(j.timestamp[i] * 1000); c.push(q.close[i]); a.push(adj[i]); }
  const divs = Object.values(j.events?.dividends || {}).map((d) => ({ t: d.date * 1000, v: d.amount }));
  const splits = Object.values(j.events?.splits || {}).map((s) => ({ t: s.date * 1000, r: s.numerator / s.denominator })).filter((s) => s.r > 0);
  return (cachePx[sim] = { t, c, a, divs, splits, divisa: j.meta?.currency });
}
const idxEn = (s, ms) => { let lo = 0, hi = s.t.length - 1, r = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (s.t[m] <= ms) { r = m; lo = m + 1; } else hi = m - 1; } return r; }; // último día ≤ ms
const idxDesde = (s, ms) => { const i = idxEn(s, ms - 1); return i + 1 < s.t.length ? i + 1 : -1; }; // primer día ≥ ms
// Día hábil siguiente a la fecha F (estrictamente después) y rentabilidad total a 12 m.
function decision(s, msF) {
  const i = idxDesde(s, msF + DIA); if (i < 0) return null;
  const j = idxDesde(s, s.t[i] + 365 * DIA); if (j < 0 || s.t[j] - s.t[i] > 380 * DIA) return { i, fecha: s.t[i], precio: s.c[i], ret: null };
  return { i, fecha: s.t[i], precio: s.c[i], ret: s.a[j] / s.a[i] - 1, fin: s.t[j] };
}
const retIndice = (sim, ms0, ms1) => { const s = serie(sim); if (!s) return null; const i = idxDesde(s, ms0), j = idxDesde(s, ms1); return i < 0 || j < 0 ? null : s.a[j] / s.a[i] - 1; };
const dpaUltimo = (s, ms) => s.divs.filter((d) => d.t <= ms && d.t > ms - 365 * DIA).reduce((x, d) => x + d.v, 0);

// ---------- Reglas (copia de backtest-comun con variantes) ----------
const v3t = (actual, h, tope = 1.1) => {
  let base = actual * Math.sqrt(h.mediana_5a / actual);
  base = Math.min(Math.max(base, actual / tope), actual * tope);
  return { bajista: Math.min(h.minimo_5a, base * 0.8), base, alcista: Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * 1.35)) };
};
function selectorT(o, k, tope) {
  const actual = o.actual;
  if (o.hAl.mediana_5a / actual >= 1.8) return calc(o, v2(actual, o.hCl), k);
  if (o.hAl.n <= 3) { const a = calc(o, v3t(actual, o.hAl, tope), k), b = calc(o, v2(actual, o.hCl), k); return a.retPond <= b.retPond ? a : b; }
  return calc(o, v3t(actual, o.hAl, tope), k);
}
const pasa = (c, u) => c.retPond >= u[0] && c.retBase >= u[1];
const MANT = [10, 5];
function numeros(o, { tope = 1.1, umbral = [15, 12] } = {}) {
  const k = { bpa2: o.bpa2 }, k9 = { bpa2: o.bpa2 * 0.9 };
  const s = selectorT(o, k, tope), w = calc(o, v2(o.actual, o.hCl), k), s9 = selectorT(o, k9, tope), w9 = calc(o, v2(o.actual, o.hCl), k9);
  const A = pasa(s, umbral) && pasa(w, umbral) && pasa(s9, umbral) && pasa(w9, umbral);
  const B = !A && pasa(s, umbral) && pasa(w, MANT) && pasa(s9, MANT) && pasa(w9, MANT);
  return { A, B, M: !A && !B && pasa(s, MANT), pond: s.retPond, base: s.retBase };
}

// ---------- Observaciones ----------
function obsDe(emp, t, extra, gTope = 0.25) {
  let g = crecimientoIngenuo(emp.bpa, emp.anios.filter((y) => y <= t), t);
  if (g === null || !(emp.bpa[t] > 0)) return null;
  g = Math.min(g, gTope);
  const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
  if (!hC || !hA) return null;
  const bpa1 = emp.bpa[t] * (1 + g), bpa2 = bpa1 * (1 + g), actual = extra.precio / bpa1;
  if (!(actual > 0) || actual > 150) return null;
  const excl = atipicos(emp, t);
  const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
  return { ticker: emp.ticker, t, g, bpa1, bpa2, actual, hC, hA, hCl, hAl, ...extra };
}

// Conjunto US: SEC con la cifra y la fecha del primer 10-K; BPA ajustado por los splits posteriores a esa fecha.
function factsAnuales(j, unidad, duracion) {
  const arr = j?.units?.[unidad]; if (!Array.isArray(arr)) return {};
  const por = {};
  for (const f of arr) {
    if (!/^10-K/.test(f.form) || f.fp !== 'FY') continue;
    if (duracion && f.start) { const d = (Date.parse(f.end) - Date.parse(f.start)) / DIA; if (d < 340 || d > 390) continue; }
    if (!duracion && f.start) continue;
    if (!por[f.end] || f.filed < por[f.end].filed) por[f.end] = { val: f.val, filed: f.filed };
  }
  return por;
}
function empresasUS(variantes) {
  const U = leer(join(DIR, 'universo.json')) || [], obs = [];
  for (const u of U) {
    const sim = u.tk.replace('.', '-'), s = serie(sim); if (!s) continue;
    const c = (x) => leer(join(DIR, 'sec', `${u.cik}_${x}.json`));
    let eps = factsAnuales(c('EarningsPerShareDiluted'), 'USD/shares', true);
    if (Object.keys(eps).length < 4) eps = factsAnuales(c('EarningsPerShareBasic'), 'USD/shares', true);
    const oi = factsAnuales(c('OperatingIncomeLoss'), 'USD', true), eq = factsAnuales(c('StockholdersEquity'), 'USD', false);
    const ltd1 = factsAnuales(c('LongTermDebtNoncurrent'), 'USD', false), ltd2 = factsAnuales(c('LongTermDebt'), 'USD', false), cash = factsAnuales(c('CashAndCashEquivalentsAtCarryingValue'), 'USD', false);
    const fines = Object.keys(eps).sort(); if (fines.length < 4) continue;
    const ajSplit = (filed) => s.splits.filter((x) => x.t > Date.parse(filed)).reduce((p, x) => p * x.r, 1);
    // año = año del cierre (cierres de enero cuentan como el año anterior)
    const anio = (e) => { const d = new Date(e); return d.getUTCMonth() === 0 ? d.getUTCFullYear() - 1 : d.getUTCFullYear(); };
    const filas = fines.map((e) => ({ e, y: anio(e), filed: eps[e].filed, bpa: eps[e].val / ajSplit(eps[e].filed),
      roic: (() => { const o = oi[e]?.val, q = eq[e]?.val; if (o == null || q == null) return null; const d = (ltd1[e] ?? ltd2[e])?.val ?? 0, k = cash[e]?.val ?? 0, ic = q + d - k; return ic > 0 ? (100 * o * 0.79) / ic : null; })() }));
    const porY = {}; for (const f of filas) if (!porY[f.y] || f.e > porY[f.y].e) porY[f.y] = f;
    for (const f of Object.values(porY)) {
      if (f.y < 2012 || f.y > 2024) continue;
      const msF = Date.parse(f.filed), conocidas = Object.values(porY).filter((x) => x.y <= f.y && Date.parse(x.filed) <= msF);
      const emp = { ticker: u.tk, anios: [], bpa: {}, precio: {} };
      for (const x of conocidas) { const i = idxEn(s, Date.parse(x.e)); if (i < 0) continue; emp.anios.push(x.y); emp.bpa[x.y] = x.bpa; emp.precio[x.y] = s.c[i]; }
      emp.anios.sort((a, b) => a - b); if (emp.anios.length < 4 || !emp.anios.includes(f.y)) continue;
      const d = decision(s, msF); if (!d || d.ret == null) continue;
      const ri = retIndice('SPY', d.fecha, d.fin);
      const r3 = [f.y, f.y - 1, f.y - 2].map((y) => conocidas.find((x) => x.y === y)?.roic ?? null);
      const calidad = r3[0] == null ? 'desconocida' : r3.every((r) => r != null && r - 8 >= 5) ? 'completa' : (r3[0] - 8 >= 5 || r3.every((r) => r != null && r - 8 >= 4.5)) ? 'aflojada' : 'falla';
      const extra = { conjunto: 'US', sector: u.sector, fecha: iso(d.fecha), anioDec: new Date(d.fecha).getUTCFullYear(), precio: d.precio, dpa: dpaUltimo(s, d.fecha), ret: d.ret, retIdx: ri, calidad, roic: r3[0] };
      for (const [nom, gT] of Object.entries(variantes.g)) { const o = obsDe(emp, f.y, extra, gT); if (o) obs.push({ ...o, varG: nom }); }
    }
  }
  return obs;
}

// Conjunto «nuestras»: datos de informes/ (cierres anuales), decisión = 31-dic + 3 meses + 1 día hábil.
const INDICE = (sim) => { const m = sim.match(/\.([A-Z]+)$/)?.[1]; if (!m) return 'SPY';
  return { L: 'ISF.L', T: '^N225', HK: '^HSI', KS: '^KS11', KQ: '^KS11', TW: '^TWII', TWO: '^TWII', SS: '000300.SS', SZ: '000300.SS', SR: '^TASI.SR', AX: '^AXJO', TO: '^GSPTSE' }[m]
    || (['DE', 'PA', 'MC', 'AS', 'MI', 'BR', 'SW', 'CO', 'ST', 'HE', 'OL', 'LS', 'IR', 'VI', 'F'].includes(m) ? 'EXSA.DE' : 'URTH'); };
function empresasNuestras(variantes) {
  const mapa = leer(join(raiz, 'verticales/empresa/simbolos.json'))?.empresas || {}, porCarpeta = {};
  for (const x of Object.values(mapa)) if (x.carpeta && x.yahoo) porCarpeta[x.carpeta] = x.yahoo;
  const obs = [];
  for (const emp of cargarEmpresas()) {
    const sim = porCarpeta[emp.carpeta]; if (!sim) continue; const s = serie(sim); if (!s) continue;
    for (const t of emp.anios) {
      if (t > 2024) continue;
      const iFin = idxEn(s, Date.UTC(t, 11, 31)); if (iFin < 0 || s.t[iFin] < Date.UTC(t, 11, 20)) continue;
      const escala = emp.precio[t] / s.c[iFin];
      const d = decision(s, Date.UTC(t + 1, 2, 31)); if (!d || d.ret == null) continue;
      const empT = { ...emp, anios: emp.anios.filter((y) => y <= t) };
      const extra = { conjunto: 'nuestras', fecha: iso(d.fecha), anioDec: new Date(d.fecha).getUTCFullYear(), precio: d.precio * escala, dpa: emp.dpa[t] || 0, ret: d.ret, retIdx: retIndice(INDICE(sim), d.fecha, d.fin), calidad: 'sin dato' };
      for (const [nom, gT] of Object.entries(variantes.g)) { const o = obsDe(empT, t, extra, gT); if (o) obs.push({ ...o, varG: nom }); }
    }
  }
  return obs;
}

// ---------- Grupos y medidas ----------
function grupo(o, opts) {
  const x = numeros(o, opts);
  if (o.conjunto === 'nuestras' || opts.sinCalidad) return x.A ? 'Números A' : x.B ? 'Números B' : x.M ? 'Mantener' : 'Vender';
  if (x.A && o.calidad === 'completa') return 'A';
  if (x.B && o.calidad === 'completa') return 'B1';
  if (x.A && o.calidad === 'aflojada') return 'B2';
  if (x.B && o.calidad === 'aflojada') return 'C';
  if (x.A || x.B) return 'Compra sin calidad';
  return x.M ? 'Mantener' : 'Vender';
}
function medir(sel) {
  const r = sel.map((o) => o.ret), ex = sel.filter((o) => o.retIdx != null).map((o) => o.ret - o.retIdx);
  return { n: sel.length, media: 100 * media(r), med: 100 * mediana(r), exMed: 100 * mediana(ex), exMedia: 100 * media(ex), bate: (100 * ex.filter((x) => x > 0).length) / (ex.length || 1),
    gana15: (100 * r.filter((x) => x >= 0.15).length) / (r.length || 1), pierde10: (100 * r.filter((x) => x < -0.1).length) / (r.length || 1) };
}
const fila = (nom, m) => `| ${nom} | ${m.n} | ${f1(m.media)} % | ${f1(m.med)} % | ${f1(m.exMedia)} % | ${f1(m.exMed)} % | ${f1(m.bate, 0)} % | ${f1(m.gana15, 0)} % | ${f1(m.pierde10, 0)} % |`;
const CAB = '| Grupo | n | Media | Mediana | Exceso medio | Exceso mediano | Bate al índice | ≥ +15 % | < −10 % |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|';
function tabla(obs, opts, orden) {
  const g = {}; for (const o of obs) (g[grupo(o, opts)] ||= []).push(o);
  const filas = orden.filter((k) => g[k]).map((k) => fila(k, medir(g[k])));
  return [CAB, ...filas, fila('Todas', medir(obs))].join('\n');
}

// ---------- Ejecución ----------
const variantes = { g: { vigente: 0.25, g15: 0.15 } };
const todas = [...empresasUS(variantes), ...empresasNuestras(variantes)];
const base = todas.filter((o) => o.varG === 'vigente');
const US = base.filter((o) => o.conjunto === 'US'), NU = base.filter((o) => o.conjunto === 'nuestras');
const tickersUS = [...new Set(US.map((o) => o.ticker))].sort(), mitad = Object.fromEntries(tickersUS.map((t, i) => [t, i % 2 ? 'validación' : 'diseño']));
const ORD = ['A', 'B1', 'B2', 'C', 'Compra sin calidad', 'Mantener', 'Vender'], ORDN = ['Números A', 'Números B', 'Mantener', 'Vender'];
const out = [];
const P = (s) => out.push(s);
P('# Backtest del método value rápido · resultados (2026-10-20)\n');
P('Estudio. **No cambia el método vigente.** Protocolo fijado antes: `metodo-rapido-preregistro-2026-10-20.md`. Script: `herramientas/backtest-metodo-rapido.mjs`.');
P(`Decisión 1 día hábil después de publicar las cuentas; rentabilidad total a 12 meses; índice SPY (EE. UU.) o el del mercado. BPA ingenuo (decide).\n`);
P(`**Conjunto US**: ${tickersUS.length} empresas del S&P 500/400 de hoy, ${US.length} decisiones (${Math.min(...US.map((o) => o.anioDec))}-${Math.max(...US.map((o) => o.anioDec))}). **Nuestras**: ${new Set(NU.map((o) => o.ticker)).size} empresas, ${NU.length} decisiones.\n`);
P('## 1. US, todas las decisiones\n'); P(tabla(US, {}, ORD));
P('\n## 2. US, validación por empresas (mitad de validación)\n'); P(tabla(US.filter((o) => mitad[o.ticker] === 'validación'), {}, ORD));
P('\n## 3. US, por tiempo\n'); P('**Ajuste 2012-2018**\n'); P(tabla(US.filter((o) => o.anioDec <= 2018), {}, ORD)); P('\n**Validación 2019-2025**\n'); P(tabla(US.filter((o) => o.anioDec >= 2019), {}, ORD));
P('\n## 4. US sin calidad (solo números)\n'); P(tabla(US, { sinCalidad: true }, ORDN));
P('\n## 5. Nuestras (sin calidad con fecha)\n'); P(tabla(NU, {}, ORDN));
// Por año: exceso mediano de compras (números A) frente a todas
P('\n## 6. Año a año (US): exceso mediano frente al SPY\n');
P('| Año de decisión | Números A (n) | Números A | Números B | Mantener | Vender | Todas |\n|---|--:|--:|--:|--:|--:|--:|');
for (const a of [...new Set(US.map((o) => o.anioDec))].sort()) {
  const sel = US.filter((o) => o.anioDec === a), gr = (k) => sel.filter((o) => grupo(o, { sinCalidad: true }) === k);
  P(`| ${a} | ${gr('Números A').length} | ${f1(medir(gr('Números A')).exMed)} % | ${f1(medir(gr('Números B')).exMed)} % | ${f1(medir(gr('Mantener')).exMed)} % | ${f1(medir(gr('Vender')).exMed)} % | ${f1(medir(sel).exMed)} % |`);
}
// Mejoras
const comprasA = (obs, opts) => obs.filter((o) => numeros(o, opts).A);
const cortes = { 'todas': () => true, 'validación (empresas)': (o) => mitad[o.ticker] === 'validación', 'diseño (empresas)': (o) => mitad[o.ticker] === 'diseño', '2012-2018': (o) => o.anioDec <= 2018, '2019-2025': (o) => o.anioDec >= 2019 };
const varsUS = (vG) => todas.filter((o) => o.conjunto === 'US' && o.varG === vG);
function top20(obs) { const out = []; const porA = {}; for (const o of obs) (porA[o.anioDec] ||= []).push(o);
  for (const l of Object.values(porA)) { const s = l.map((o) => ({ o, p: numeros(o).pond })).sort((a, b) => b.p - a.p); out.push(...s.slice(0, Math.ceil(s.length * 0.2)).map((x) => x.o)); } return out; }
const MEJ = {
  'Vigente (números A, 15/12, ×1,1)': (o) => comprasA(o, {}),
  '1a. Umbral 20/15': (o) => comprasA(o, { umbral: [20, 15] }),
  '1b. Umbral 10/8': (o) => comprasA(o, { umbral: [10, 8] }),
  '2a. Tope ×1,0': (o) => comprasA(o, { tope: 1.0 }),
  '2b. Tope ×1,2': (o) => comprasA(o, { tope: 1.2 }),
  '3. g máx. +15 %': null,
  '4. Números A + calidad completa': (o) => comprasA(o, {}).filter((x) => x.calidad === 'completa'),
  '5. El 20 % con más ponderada cada año': (o) => top20(o),
};
P('\n## 7. Mejoras (US): exceso mediano frente al SPY · % < −10 % · n\n');
P(`| Variante | ${Object.keys(cortes).join(' | ')} |\n|---|${Object.keys(cortes).map(() => '--:').join('|')}|`);
const res = {};
for (const [nom, fn] of Object.entries(MEJ)) {
  const celdas = Object.entries(cortes).map(([c, f]) => {
    const sel = nom.startsWith('3.') ? comprasA(varsUS('g15').filter(f), {}) : fn(varsUS('vigente').filter(f));
    const m = medir(sel); (res[nom] ||= {})[c] = m; return `${f1(m.exMed)} % · ${f1(m.pierde10, 0)} % · ${m.n}`;
  });
  P(`| ${nom} | ${celdas.join(' | ')} |`);
}
const V = res['Vigente (números A, 15/12, ×1,1)'];
P('\n**Veredicto con el criterio fijado** (mejora el exceso mediano en validación por empresas Y en 2019-2025, sin subir las pérdidas > 10 % más de 3 puntos):\n');
for (const [nom, r] of Object.entries(res)) { if (nom.startsWith('Vigente')) continue;
  const ok = ['validación (empresas)', '2019-2025'].every((c) => r[c].exMed > V[c].exMed && r[c].pierde10 <= V[c].pierde10 + 3);
  P(`- ${nom}: ${ok ? '**pasa**' : 'no pasa'} (validación empresas ${f1(r['validación (empresas)'].exMed)} frente a ${f1(V['validación (empresas)'].exMed)}; 2019-2025 ${f1(r['2019-2025'].exMed)} frente a ${f1(V['2019-2025'].exMed)})`); }
const gV = US.filter((o) => grupo(o, { sinCalidad: true }) === 'Vender'), gM = US.filter((o) => grupo(o, { sinCalidad: true }) === 'Mantener');
P(`- 6. ¿Vender sirve? Exceso mediano Vender ${f1(medir(gV).exMed)} % frente a Mantener ${f1(medir(gM).exMed)} % (validación empresas: ${f1(medir(gV.filter((o) => mitad[o.ticker] === 'validación')).exMed)} frente a ${f1(medir(gM.filter((o) => mitad[o.ticker] === 'validación')).exMed)}; 2019-2025: ${f1(medir(gV.filter((o) => o.anioDec >= 2019)).exMed)} frente a ${f1(medir(gM.filter((o) => o.anioDec >= 2019)).exMed)}).`);
// Por sector (US, números A)
P('\n## 8. Números A por sector (US)\n'); P('| Sector | n | Exceso mediano | < −10 % |\n|---|--:|--:|--:|');
const porS = {}; for (const o of comprasA(US, {})) (porS[o.sector] ||= []).push(o);
for (const [s, l] of Object.entries(porS).sort((a, b) => b[1].length - a[1].length)) { const m = medir(l); P(`| ${s} | ${m.n} | ${f1(m.exMed)} % | ${f1(m.pierde10, 0)} % |`); }
writeFileSync(join(raiz, 'verticales/empresa/backtest/metodo-rapido-resultados-2026-10-20.md'), out.join('\n') + '\n');
writeFileSync(join(DIR, 'obs.json'), JSON.stringify(base.map((o) => ({ ticker: o.ticker, conjunto: o.conjunto, fecha: o.fecha, sector: o.sector, actual: o.actual, g: o.g, ret: o.ret, retIdx: o.retIdx, calidad: o.calidad, roic: o.roic, grupo: grupo(o, {}), num: grupo(o, { sinCalidad: true }), pond: numeros(o).pond }))));
console.log(out.join('\n'));
