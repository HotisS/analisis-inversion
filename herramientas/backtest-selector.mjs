// Backtest del selector de método (preregistro: verticales/empresa/backtest/selector-preregistro-2026-10-14.md).
// Mismos datos y misma construcción que motor/backtest-multiplos.mjs (cierres y BPA reales de los informes, horizonte
// un año, objetivo = múltiplo × BPA de t+2), con cuatro estrategias: siempre v3 ×1,1, siempre v2, solo robustas y el
// selector. Sin red, sin dependencias, solo lectura.
//
//   node herramientas/backtest-selector.mjs [--bpa-ingenuo] [--salida ruta.md]
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const BPA_INGENUO = argv.includes('--bpa-ingenuo');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const pct = (arr, p) => { const a = arr.filter(Number.isFinite).sort((x, y) => x - y); if (!a.length) return null; const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
const mediana = (a) => pct(a, 0.5);
const media = (a) => { const b = a.filter(Number.isFinite); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
const f1 = (x, d = 1) => (x === null || !Number.isFinite(x) ? 'n.d.' : x.toFixed(d).replace('.', ','));

// ── Datos (igual que backtest-multiplos) ──
function cargarEmpresas() {
  const dir = join(raiz, 'informes'), porTicker = {};
  for (const carpeta of readdirSync(dir)) {
    const p = join(dir, carpeta);
    if (!statSync(p).isDirectory()) continue;
    const archivos = readdirSync(p).filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (n(a.match(/v(\d+)/)?.[1]) ?? 1) - (n(b.match(/v(\d+)/)?.[1]) ?? 1));
    if (!archivos.length) continue;
    let d; try { d = JSON.parse(readFileSync(join(p, archivos.at(-1)), 'utf8')); } catch { continue; }
    const bpa = {}, dpa = {}, precio = {};
    for (const c of d.financieros?.cuenta || []) { const y = +String(c.periodo).replace(/\D/g, ''); if (y && n(c.bpa) !== null) { bpa[y] = n(c.bpa); dpa[y] = n(c.dpa) ?? 0; } }
    for (const s of d.multiplos_historicos?.serie || []) { const y = +String(s.anio).replace(/\D/g, ''); if (y && n(s.precio_cierre) && !s.excluir) precio[y] = n(s.precio_cierre); }
    const anios = Object.keys(precio).map(Number).filter((y) => bpa[y] !== undefined).sort((a, b) => a - b);
    if (anios.length < 3) continue;
    const ticker = (d.identificacion?.ticker || carpeta).toUpperCase().replace(/[^A-Z0-9.]/g, '');
    const emp = { ticker, carpeta, anios, bpa, dpa, precio };
    if (!porTicker[ticker] || porTicker[ticker].anios.length < anios.length) porTicker[ticker] = emp;
  }
  return Object.values(porTicker).sort((a, b) => a.ticker.localeCompare(b.ticker));
}

// Regla 1 del selector: años con BPA atípico (pico o valle aislado, ×1,5), conocidos en t (y+1 ≤ t).
function atipicos(emp, t) {
  const s = new Set();
  for (const y of emp.anios) {
    const a = emp.bpa[y - 1], b = emp.bpa[y], c = emp.bpa[y + 1];
    if (!(a > 0 && b > 0 && c > 0) || y + 1 > t) continue;
    if ((b / a > 1.5 && b / c > 1.5) || (b / a < 1 / 1.5 && b / c < 1 / 1.5)) s.add(y);
  }
  return s;
}
// Historia en t; excl = años de BPA que no se usan.
function historia(emp, t, base, excl = new Set()) {
  const per = [];
  for (const y of emp.anios) {
    if (base === 'cierre') { if (y <= t && emp.bpa[y] > 0 && !excl.has(y)) per.push({ y, per: emp.precio[y] / emp.bpa[y] }); }
    else if (y <= t - 1 && emp.bpa[y + 1] > 0 && !excl.has(y + 1)) per.push({ y, per: emp.precio[y] / emp.bpa[y + 1] });
  }
  const limpio = per.filter((x) => x.per > 0 && x.per < 150);
  const u5 = limpio.slice(-5).map((x) => x.per), u8 = limpio.slice(-8).map((x) => x.per);
  if (u5.length < 3) return null;
  return { mediana_5a: mediana(u5), minimo_5a: Math.min(...u5), media_larga: media(u8), n: u5.length };
}
const v2 = (actual, h) => { const base = Math.min(actual, h.mediana_5a); return { bajista: h.minimo_5a < base ? h.minimo_5a : base * 0.85, base, alcista: Math.min(Math.max(h.media_larga, base), base * 1.3) }; };
const v3 = (actual, h) => {
  let base = actual * Math.sqrt(h.mediana_5a / actual);
  base = Math.min(Math.max(base, actual / 1.1), actual * 1.1);
  return { bajista: Math.min(h.minimo_5a, base * 0.8), base, alcista: Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * 1.35)) };
};

// ── Observaciones ──
const empresas = cargarEmpresas();
const mitad = Object.fromEntries(empresas.map((e, i) => [e.ticker, i % 2 === 0 ? 'diseño' : 'validación']));
const obs = [];
for (const emp of empresas) for (const t of emp.anios) {
  const y1 = t + 1, y2 = t + 2;
  if (!emp.precio[y1] || !(emp.bpa[y1] > 0) || !(emp.bpa[y2] > 0) || !(emp.precio[t] > 0)) continue;
  let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2];
  if (BPA_INGENUO) {
    const g = []; for (const y of emp.anios) if (y <= t && emp.bpa[y - 1] > 0 && emp.bpa[y] > 0) g.push(emp.bpa[y] / emp.bpa[y - 1] - 1);
    if (g.length < 2 || !(emp.bpa[t] > 0)) continue;
    const gm = Math.max(-0.1, Math.min(0.25, mediana(g)));
    bpa1 = emp.bpa[t] * (1 + gm); bpa2 = bpa1 * (1 + gm);
  }
  const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
  if (!hC || !hA) continue;
  const actual = emp.precio[t] / bpa1;
  if (!(actual > 0) || actual > 150) continue;
  const excl = atipicos(emp, t);
  const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
  obs.push({ ticker: emp.ticker, mitad: mitad[emp.ticker], t, horizonte: y1, precio: emp.precio[t], precioReal: emp.precio[y1], dpa: emp.dpa[y1] || 0, bpa2, actual,
    hC, hA, hCl, hAl, atipico: excl.size > 0 && (hCl !== hC || hAl !== hA), retReal: (emp.precio[y1] + (emp.dpa[y1] || 0)) / emp.precio[t] - 1 });
}

const calc = (o, m) => {
  const p = (x) => x * o.bpa2, ret = (x) => (x + o.dpa) / o.precio - 1;
  const pond = (p(m.bajista) + 2 * p(m.base) + p(m.alcista)) / 4;
  return { pond, base: p(m.base), retPond: ret(pond), retBase: ret(p(m.base)), compra: ret(pond) >= 0.15 && ret(p(m.base)) >= 0.12 };
};
// Selector: devuelve el cálculo y qué regla mandó.
function selector(o) {
  const hA = o.hAl, hC = o.hCl, pre = o.atipico ? 'atípico → ' : '';
  if (hA.mediana_5a / o.actual >= 1.8) return { ...calc(o, v2(o.actual, hC)), regla: pre + 'desrateada → v2' };
  if (hA.n <= 3) { const a = calc(o, v3(o.actual, hA)), b = calc(o, v2(o.actual, hC)); return { ...(a.retPond <= b.retPond ? a : b), regla: pre + 'historia corta → la más baja' }; }
  return { ...calc(o, v3(o.actual, hA)), regla: pre + 'v3' };
}
const ESTRATEGIAS = {
  'Siempre v3 ×1,1': (o) => calc(o, v3(o.actual, o.hA)),
  'Siempre v2': (o) => calc(o, v2(o.actual, o.hC)),
  'Solo robustas': (o) => { const a = calc(o, v3(o.actual, o.hA)), b = calc(o, v2(o.actual, o.hC)); const m = a.retPond <= b.retPond ? a : b; return { ...m, base: Math.min(a.base, b.base), compra: a.compra && b.compra }; },
  Selector: selector,
};
function medir(conj) {
  return Object.entries(ESTRATEGIAS).map(([nombre, fn]) => {
    const fil = conj.map((o) => ({ o, r: fn(o) }));
    const err = fil.map(({ o, r }) => r.pond / o.precioReal - 1), errB = fil.map(({ o, r }) => r.base / o.precioReal - 1);
    const c = fil.filter(({ r }) => r.compra).map(({ o }) => o.retReal), nc = fil.filter(({ r }) => !r.compra).map(({ o }) => o.retReal);
    return { nombre, n: fil.length, sesgo: 100 * mediana(err), error: 100 * mediana(err.map(Math.abs)), sesgoB: 100 * mediana(errB), errorB: 100 * mediana(errB.map(Math.abs)),
      compras: c.length, retC: 100 * mediana(c), retNC: 100 * mediana(nc), acierto: c.length ? 100 * c.filter((x) => x >= 0.15).length / c.length : null, perdidas: c.length ? 100 * c.filter((x) => x < -0.1).length / c.length : null };
  });
}
const tabla = (titulo, conj) => `### ${titulo} (${conj.length} cierres)\n\n| Estrategia | Sesgo pond. | Error pond. | Sesgo base | Error base | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|\n` +
  medir(conj).map((r) => `| ${r.nombre} | ${f1(r.sesgo)} % | ${f1(r.error)} % | ${f1(r.sesgoB)} % | ${f1(r.errorB)} % | ${r.compras} | ${f1(r.retC)} % | ${f1(r.retNC)} % | ${f1(r.acierto, 0)} % | ${f1(r.perdidas, 0)} % |`).join('\n') + '\n';

// Por regla del selector: dónde cambia algo y si ese cambio acierta.
function porRegla(conj) {
  const g = {};
  for (const o of conj) { const s = selector(o); (g[s.regla] ||= []).push({ o, s, v3: ESTRATEGIAS['Siempre v3 ×1,1'](o) }); }
  let md = '| Regla que manda | Cierres | Error pond. selector | Error pond. v3 | Comprar selector (real mediana; < −10 %) | Comprar v3 (real mediana; < −10 %) |\n|---|--:|--:|--:|--:|--:|\n';
  for (const [k, fil] of Object.entries(g).sort()) {
    const e = (key) => 100 * mediana(fil.map((x) => Math.abs(x[key].pond / x.o.precioReal - 1)));
    const cs = (key) => { const c = fil.filter((x) => x[key].compra).map((x) => x.o.retReal); return c.length ? `${c.length} (${f1(100 * mediana(c))} %; ${f1(100 * c.filter((r) => r < -0.1).length / c.length, 0)} %)` : '0'; };
    md += `| ${k} | ${fil.length} | ${f1(e('s'))} % | ${f1(e('v3'))} % | ${cs('s')} | ${cs('v3')} |\n`;
  }
  return md;
}

const val = obs.filter((o) => o.mitad === 'validación'), dis = obs.filter((o) => o.mitad === 'diseño'), prueba = obs.filter((o) => o.horizonte >= 2022);
const md = [
  `# Backtest del selector de método · ${new Date().toISOString().slice(0, 10)}${BPA_INGENUO ? ' · BPA ingenuo' : ''}\n`,
  `Generado con \`node herramientas/backtest-selector.mjs${BPA_INGENUO ? ' --bpa-ingenuo' : ''}\`. Reglas y criterio fijados antes en \`selector-preregistro-2026-10-14.md\`. ${empresas.length} empresas, ${obs.length} cierres (${dis.length} de diseño y ${val.length} de validación, por empresas alternas; ${prueba.length} con horizonte 2022-2025). Pesos 25/50/25. BPA futuro ${BPA_INGENUO ? 'ingenuo (crecimiento mediano anterior)' : 'real (el error es solo del múltiplo)'}. Cierres con BPA atípico en la historia: ${obs.filter((o) => o.atipico).length}.\n`,
  tabla('Validación (decide)', val), tabla('Diseño', dis), tabla('Corte temporal: horizonte 2022-2025', prueba), tabla('Todos', obs),
  '### Qué regla del selector mandó y cómo le fue (validación)\n\n' + porRegla(val),
  '### Lo mismo, todos los cierres\n\n' + porRegla(obs),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
