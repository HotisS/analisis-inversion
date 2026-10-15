// Backtest de la rentabilidad esperada a 3 años (protocolo: verticales/empresa/backtest/tres-anios-preregistro-2026-10-15.md).
// Mismos datos y misma construcción que backtest-selector.mjs (cierres y BPA reales de los informes). A 12 meses decide la
// regla vigente (v3 ×1,1 con selector); a 3 años, mediana adelantada de 5 años × BPA de t+4, anualizada con dividendos.
// Sin red, sin dependencias, solo lectura.
//
//   node herramientas/backtest-3a.mjs [--bpa-real] [--salida ruta.md]
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const BPA_REAL = argv.includes('--bpa-real');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const pct = (arr, p) => { const a = arr.filter(Number.isFinite).sort((x, y) => x - y); if (!a.length) return null; const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
const mediana = (a) => pct(a, 0.5);
const media = (a) => { const b = a.filter(Number.isFinite); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
const f1 = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : x.toFixed(d).replace('.', ','));

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
    const emp = { ticker, carpeta, nombre: d.identificacion?.nombre_corto || d.identificacion?.nombre || carpeta, anios, bpa, dpa, precio };
    if (!porTicker[ticker] || porTicker[ticker].anios.length < anios.length) porTicker[ticker] = emp;
  }
  return Object.values(porTicker).sort((a, b) => a.ticker.localeCompare(b.ticker));
}
function atipicos(emp, t) {
  const s = new Set();
  for (const y of emp.anios) {
    const a = emp.bpa[y - 1], b = emp.bpa[y], c = emp.bpa[y + 1];
    if (!(a > 0 && b > 0 && c > 0) || y + 1 > t) continue;
    if ((b / a > 1.5 && b / c > 1.5) || (b / a < 1 / 1.5 && b / c < 1 / 1.5)) s.add(y);
  }
  return s;
}
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
const calc = (o, m) => {
  const p = (x) => x * o.bpa2, ret = (x) => (x + o.dpa1) / o.precio - 1;
  const pond = (p(m.bajista) + 2 * p(m.base) + p(m.alcista)) / 4;
  return { pond, base: p(m.base), retPond: ret(pond), retBase: ret(p(m.base)), compra: ret(pond) >= 0.15 && ret(p(m.base)) >= 0.12 };
};
function selector(o) {
  const hA = o.hAl, hC = o.hCl;
  if (hA.mediana_5a / o.actual >= 1.8) return { ...calc(o, v2(o.actual, hC)), regla: 'desrateada → v2' };
  if (hA.n <= 3) { const a = calc(o, v3(o.actual, hA)), b = calc(o, v2(o.actual, hC)); return { ...(a.retPond <= b.retPond ? a : b), regla: 'historia corta' }; }
  return { ...calc(o, v3(o.actual, hA)), regla: 'v3' };
}

// ── Observaciones: con 12 m (precio t+1, BPA t+2) y 3 años (precio t+3, BPA t+4) a la vez ──
const empresas = cargarEmpresas();
const mitad = Object.fromEntries(empresas.map((e, i) => [e.ticker, i % 2 === 0 ? 'diseño' : 'validación']));
const obs = [];
for (const emp of empresas) for (const t of emp.anios) {
  const [y1, y2, y3, y4] = [t + 1, t + 2, t + 3, t + 4];
  if (!(emp.precio[t] > 0) || !emp.precio[y1] || !(emp.bpa[y2] > 0) || !emp.precio[y3] || !(emp.bpa[y4] > 0)) continue;
  let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2], bpa4 = emp.bpa[y4];
  if (!BPA_REAL) {
    const g = []; for (const y of emp.anios) if (y <= t && emp.bpa[y - 1] > 0 && emp.bpa[y] > 0) g.push(emp.bpa[y] / emp.bpa[y - 1] - 1);
    if (g.length < 2 || !(emp.bpa[t] > 0)) continue;
    const gm = Math.max(-0.1, Math.min(0.25, mediana(g)));
    bpa1 = emp.bpa[t] * (1 + gm); bpa2 = bpa1 * (1 + gm); bpa4 = emp.bpa[t] * (1 + gm) ** 4;
  }
  const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
  if (!hC || !hA) continue;
  const actual = emp.precio[t] / bpa1;
  if (!(actual > 0) || actual > 150) continue;
  const excl = atipicos(emp, t);
  const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
  const div3 = (emp.dpa[y1] || 0) + (emp.dpa[y2] || 0) + (emp.dpa[y3] || 0);
  const o = { ticker: emp.ticker, nombre: emp.nombre, mitad: mitad[emp.ticker], t, precio: emp.precio[t], dpa1: emp.dpa[y1] || 0, bpa2, bpa4, actual, hC, hA, hCl, hAl,
    ret12: (emp.precio[y1] + (emp.dpa[y1] || 0)) / emp.precio[t] - 1,
    ret3: ((emp.precio[y3] + div3) / emp.precio[t]) ** (1 / 3) - 1,
    precio3: emp.precio[y3] };
  // Cifra a 3 años: mediana adelantada de 5 años (vuelta entera) × BPA t+4; control: el menor entre actual y mediana.
  const divAnual = (y) => (emp.dpa[y] || 0); // dividendos conocidos: se supone el último conocido (t) los tres años
  const dividendos3 = BPA_REAL ? div3 : 3 * divAnual(t);
  const r3 = (mult) => ((mult * bpa4) / emp.precio[t]) ** (1 / 3) - 1 + dividendos3 / emp.precio[t] / 3;
  o.obj3 = hAl.mediana_5a * bpa4; o.r3 = r3(hAl.mediana_5a); o.r3control = r3(Math.min(actual, hAl.mediana_5a));
  const s = selector(o); o.pond12 = s.retPond; o.base12 = s.retBase; o.compra12 = s.compra; o.regla = s.regla;
  obs.push(o);
}

const ESTRATEGIAS = {
  'A. Solo 12 m (vigente)': (o) => o.compra12,
  'B. 12 m o radar (3 a ≥ 15 % y base 12 m ≥ 0)': (o) => o.compra12 || (o.base12 >= 0 && o.r3 >= 0.15),
  '  · solo las añadidas por el radar': (o) => !o.compra12 && o.base12 >= 0 && o.r3 >= 0.15,
  'C. Solo 3 años (≥ 15 % anual)': (o) => o.r3 >= 0.15,
  'D. 12 m y 3 años (≥ 10 % anual)': (o) => o.compra12 && o.r3 >= 0.1,
  '  · B con el múltiplo de control': (o) => o.compra12 || (o.base12 >= 0 && o.r3control >= 0.15),
};
function medir(conj) {
  return Object.entries(ESTRATEGIAS).map(([nombre, fn]) => {
    const c = conj.filter(fn), nc = conj.filter((o) => !fn(o));
    const m = (arr, k) => 100 * mediana(arr.map((o) => o[k]));
    return { nombre, compras: c.length, ret12: m(c, 'ret12'), ret3: m(c, 'ret3'), ret3nc: m(nc, 'ret3'), ret12nc: m(nc, 'ret12'),
      acierto: c.length ? 100 * c.filter((o) => o.ret3 >= 0.1).length / c.length : null, perdidas: c.length ? 100 * c.filter((o) => o.ret3 < 0).length / c.length : null };
  });
}
const tabla = (titulo, conj) => `### ${titulo} (${conj.length} cierres; mediana real de todos: ${f1(100 * mediana(conj.map((o) => o.ret12)))} % a 12 m, ${f1(100 * mediana(conj.map((o) => o.ret3)))} % anual a 3 a)\n\n| Estrategia | Compras | Real 12 m | Real 3 a (anual) | Resto 3 a (anual) | Compras ≥ 10 % anual a 3 a | Compras en pérdida a 3 a |\n|---|--:|--:|--:|--:|--:|--:|\n` +
  medir(conj).map((r) => `| ${r.nombre} | ${r.compras} | ${f1(r.ret12)} % | ${f1(r.ret3)} % | ${f1(r.ret3nc)} % | ${f1(r.acierto, 0)} % | ${f1(r.perdidas, 0)} % |`).join('\n') + '\n';

// Calidad de la cifra a 3 años como predicción: sesgo y error del precio predicho a t+3 (sin dividendos).
const prediccion = (conj) => {
  const e = conj.map((o) => o.obj3 / o.precio3 - 1), ec = conj.map((o) => Math.min(o.actual, o.hAl.mediana_5a) * o.bpa4 / o.precio3 - 1);
  const e12 = conj.map((o) => ((o.pond12 + 1) * o.precio - o.dpa1) / ((o.ret12 + 1) * o.precio - o.dpa1) - 1);
  return `| Cifra | Sesgo (mediana de predicho ÷ real − 1) | Error (mediana del error absoluto) |\n|---|--:|--:|\n| 3 años, vuelta entera a la mediana | ${f1(100 * mediana(e))} % | ${f1(100 * mediana(e.map(Math.abs)))} % |\n| 3 años, múltiplo de control (menor de actual y mediana) | ${f1(100 * mediana(ec))} % | ${f1(100 * mediana(ec.map(Math.abs)))} % |\n| 12 m, regla vigente (para comparar) | ${f1(100 * mediana(e12))} % | ${f1(100 * mediana(e12.map(Math.abs)))} % |\n`;
};
// Las añadidas por el radar, una a una.
const lista = (conj) => {
  const a = conj.filter((o) => !o.compra12 && o.base12 >= 0 && o.r3 >= 0.15).sort((x, y) => y.ret3 - x.ret3);
  return `| Empresa | Cierre | 12 m esperada (pond./base) | 3 a esperada (anual) | Real 12 m | Real 3 a (anual) |\n|---|--:|--:|--:|--:|--:|\n` + a.map((o) => `| ${o.nombre} | ${o.t} | ${f1(100 * o.pond12)} / ${f1(100 * o.base12)} % | ${f1(100 * o.r3)} % | ${f1(100 * o.ret12)} % | ${f1(100 * o.ret3)} % |`).join('\n') + '\n';
};

const val = obs.filter((o) => o.mitad === 'validación'), dis = obs.filter((o) => o.mitad === 'diseño'), antes = obs.filter((o) => o.t <= 2020), despues = obs.filter((o) => o.t >= 2021);
const md = [
  `# Backtest de la rentabilidad esperada a 3 años · ${new Date().toISOString().slice(0, 10)}${BPA_REAL ? ' · BPA real' : ' · BPA ingenuo'}\n`,
  `Generado con \`node herramientas/backtest-3a.mjs${BPA_REAL ? ' --bpa-real' : ''}\`. Protocolo y criterio fijados antes en \`tres-anios-preregistro-2026-10-15.md\`. ${new Set(obs.map((o) => o.ticker)).size} empresas, ${obs.length} cierres con 12 meses y 3 años a la vez (cierres t de ${Math.min(...obs.map((o) => o.t))} a ${Math.max(...obs.map((o) => o.t))}; ${dis.length} de diseño y ${val.length} de validación por empresas alternas). BPA futuro ${BPA_REAL ? 'real (previsión perfecta: el error es solo del múltiplo)' : 'ingenuo (crecimiento mediano de la historia conocida, entre −10 % y +25 %)'}. A 12 meses decide la regla vigente (v3 ×1,1 con selector); a 3 años, mediana adelantada de 5 años × BPA de t+4, anualizada con dividendos. «Real 3 a» = rentabilidad anual real de t a t+3 con dividendos.\n`,
  tabla('Todos', obs), tabla('Validación', val), tabla('Diseño', dis), tabla('Cierres hasta 2020', antes), tabla('Cierres desde 2021', despues),
  '### La cifra a 3 años como predicción del precio a t+3 (todos)\n\n' + prediccion(obs),
  '### Las que añade el radar (todos los cierres)\n\n' + lista(obs),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
