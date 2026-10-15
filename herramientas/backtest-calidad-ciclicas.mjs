// Backtest del filtro de calidad con ROIC sin fondo de comercio y de las cíclicas (años de fondo de ciclo fuera de la
// historia del PER). Protocolo: verticales/empresa/backtest/calidad-ciclicas-preregistro-2026-10-15.md. Mismos datos y
// construcción que backtest-selector.mjs, más el ROIC del motor y el fondo de comercio por año. Sin red, solo lectura.
//
//   node herramientas/backtest-calidad-ciclicas.mjs [--bpa-real] [--salida ruta.md]
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
const anio = (s) => +String(s).replace(/\D/g, '');

function cargarEmpresas() {
  const dir = join(raiz, 'informes'), porTicker = {};
  for (const carpeta of readdirSync(dir)) {
    const p = join(dir, carpeta);
    if (!statSync(p).isDirectory()) continue;
    const archivos = readdirSync(p).filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (n(a.match(/v(\d+)/)?.[1]) ?? 1) - (n(b.match(/v(\d+)/)?.[1]) ?? 1));
    if (!archivos.length) continue;
    let d; try { d = JSON.parse(readFileSync(join(p, archivos.at(-1)), 'utf8')); } catch { continue; }
    const bpa = {}, dpa = {}, precio = {}, nopat = {}, ci = {}, gw = {};
    for (const c of d.financieros?.cuenta || []) { const y = anio(c.periodo); if (y && n(c.bpa) !== null) { bpa[y] = n(c.bpa); dpa[y] = n(c.dpa) ?? 0; } }
    for (const s of d.multiplos_historicos?.serie || []) { const y = anio(s.anio); if (y && n(s.precio_cierre) && !s.excluir) precio[y] = n(s.precio_cierre); }
    for (const r of d.calc?.rentabilidad || []) { const y = anio(r.periodo); if (y && n(r.nopat) !== null && n(r.capital_invertido) !== null) { nopat[y] = n(r.nopat); ci[y] = n(r.capital_invertido); } }
    for (const b of d.balance?.historico || []) { const y = anio(b.periodo); if (y && n(b.fondo_comercio) !== null) gw[y] = n(b.fondo_comercio); }
    const wacc = n((d.calc?.roic_frente_wacc || []).at(-1)?.wacc_pct);
    const anios = Object.keys(precio).map(Number).filter((y) => bpa[y] !== undefined).sort((a, b) => a - b);
    if (anios.length < 3 || wacc === null) continue;
    const ticker = (d.identificacion?.ticker || carpeta).toUpperCase().replace(/[^A-Z0-9.]/g, '');
    const emp = { ticker, carpeta, nombre: d.identificacion?.nombre_corto || d.identificacion?.nombre || carpeta, anios, bpa, dpa, precio, nopat, ci, gw, wacc };
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
// Años de fondo de ciclo conocidos en t: BPA(y) < 0,7 × mediana del BPA conocido en t.
function fondosDeCiclo(emp, t) {
  const ys = Object.keys(emp.bpa).map(Number).filter((y) => y <= t && emp.bpa[y] > 0);
  const med = mediana(ys.map((y) => emp.bpa[y]));
  return new Set(ys.filter((y) => emp.bpa[y] < 0.7 * med));
}
function esCiclica(emp, t) {
  const ys = Object.keys(emp.bpa).map(Number).filter((y) => y <= t && emp.bpa[y] > 0).sort((a, b) => a - b);
  if (ys.length < 4) return false;
  const v = ys.map((y) => emp.bpa[y]);
  if (Math.max(...v) / Math.min(...v) >= 1.5) return true;
  return ys.some((y, i) => i > 0 && emp.bpa[y] / emp.bpa[ys[i - 1]] < 0.75);
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
  const p = (x) => x * o.bpa2, ret = (x) => (x + o.dpa) / o.precio - 1;
  const pond = (p(m.bajista) + 2 * p(m.base) + p(m.alcista)) / 4;
  return { pond, base: p(m.base), retPond: ret(pond), retBase: ret(p(m.base)), compra: ret(pond) >= 0.15 && ret(p(m.base)) >= 0.12 };
};
function selector(o, hA, hC) {
  if (hA.mediana_5a / o.actual >= 1.8) return { ...calc(o, v2(o.actual, hC)), regla: 'desrateada → v2' };
  if (hA.n <= 3) { const a = calc(o, v3(o.actual, hA)), b = calc(o, v2(o.actual, hC)); return { ...(a.retPond <= b.retPond ? a : b), regla: 'historia corta' }; }
  return { ...calc(o, v3(o.actual, hA)), regla: 'v3' };
}

const empresas = cargarEmpresas();
const mitad = Object.fromEntries(empresas.map((e, i) => [e.ticker, i % 2 === 0 ? 'diseño' : 'validación']));
const obs = [];
for (const emp of empresas) for (const t of emp.anios) {
  const y1 = t + 1, y2 = t + 2;
  if (!(emp.precio[t] > 0) || !emp.precio[y1] || !(emp.bpa[y2] > 0)) continue;
  let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2];
  if (!BPA_REAL) {
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
  const o = { ticker: emp.ticker, nombre: emp.nombre, mitad: mitad[emp.ticker], t, precio: emp.precio[t], dpa: emp.dpa[y1] || 0, bpa2, actual, retReal: (emp.precio[y1] + (emp.dpa[y1] || 0)) / emp.precio[t] - 1,
    ret3: emp.precio[t + 3] ? ((emp.precio[t + 3] + (emp.dpa[y1] || 0) + (emp.dpa[y2] || 0) + (emp.dpa[t + 3] || 0)) / emp.precio[t]) ** (1 / 3) - 1 : null };
  // Regla vigente a 12 meses.
  const s = selector(o, hAl, hCl); o.pond = s.pond; o.retPond = s.retPond; o.compra = s.compra; o.regla = s.regla;
  // Calidad en t: ROIC publicado y sin fondo de comercio (capital medio de t y t−1), con el WACC del informe.
  if (emp.nopat[t] !== undefined && emp.gw[t] !== undefined) {
    const gwMed = emp.gw[t - 1] !== undefined ? (emp.gw[t] + emp.gw[t - 1]) / 2 : emp.gw[t];
    o.roicPub = emp.ci[t] > 0 ? (emp.nopat[t] / emp.ci[t]) * 100 : null;
    const ciEx = emp.ci[t] - gwMed;
    o.roicEx = ciEx > 0 ? (emp.nopat[t] / ciEx) * 100 : o.roicPub;
    o.calPub = o.roicPub !== null && o.roicPub - emp.wacc >= 5;
    o.calEx = o.roicEx !== null && o.roicEx - emp.wacc >= 5;
    const ys = Object.keys(emp.gw).map(Number).filter((y) => y <= t).sort((a, b) => a - b);
    const subidas = ys.filter((y, i) => i > 0 && emp.gw[ys[i - 1]] > 0 && emp.gw[y] / emp.gw[ys[i - 1]] > 1.05).length;
    o.serie = ys.length >= 4 ? subidas >= 3 : null; // null = sin historia → como publicado
    o.conCalidad = true;
  }
  // Cíclicas: años de fondo de ciclo fuera de la historia del PER (además de los atípicos).
  o.ciclica = esCiclica(emp, t);
  const fondos = fondosDeCiclo(emp, t);
  const exclC = new Set([...excl, ...fondos]);
  const hAc = fondos.size ? historia(emp, t, 'adelantado', exclC) : null, hCc = fondos.size ? historia(emp, t, 'cierre', exclC) : null;
  const sc = hAc && hCc ? selector(o, hAc, hCc) : s;
  o.pondC = sc.pond; o.retPondC = sc.retPond; o.compraC = sc.compra; o.fondos = fondos.size;
  obs.push(o);
}

// ── Prueba 1: calidad ──
const Q = {
  'Q0. Publicado (vigente)': (o) => o.compra && o.calPub,
  'Q1. Sin fondo de comercio siempre': (o) => o.compra && o.calEx,
  '  · añadidas por Q1 (todas)': (o) => o.compra && o.calEx && !o.calPub,
  '  · añadidas, compradores en serie': (o) => o.compra && o.calEx && !o.calPub && o.serie === true,
  '  · añadidas, compra única o sin historia': (o) => o.compra && o.calEx && !o.calPub && o.serie !== true,
  'Q2. Sin fondo de comercio solo en compra única': (o) => o.compra && (o.calPub || (o.calEx && o.serie === false)),
  '  · añadidas por Q2': (o) => o.compra && !o.calPub && o.calEx && o.serie === false,
  'Comprar a 12 m sin filtro de calidad': (o) => o.compra,
};
const medirQ = (conj) => Object.entries(Q).map(([nombre, fn]) => {
  const c = conj.filter(fn).map((o) => o.retReal), c3 = conj.filter(fn).map((o) => o.ret3).filter((x) => x !== null);
  return { nombre, compras: c.length, ret: 100 * mediana(c), ret3: c3.length ? 100 * mediana(c3) : null, n3: c3.length, acierto: c.length ? 100 * c.filter((x) => x >= 0.15).length / c.length : null, perdidas: c.length ? 100 * c.filter((x) => x < -0.1).length / c.length : null };
});
const tablaQ = (titulo, conj) => `### ${titulo} (${conj.length} cierres con ROIC y fondo de comercio)\n\n| Estrategia | Compras | Rent. real 12 m | ≥ 15 % | < −10 % | Rent. real 3 a (anual; n) |\n|---|--:|--:|--:|--:|--:|\n` +
  medirQ(conj).map((r) => `| ${r.nombre} | ${r.compras} | ${f1(r.ret)} % | ${f1(r.acierto, 0)} % | ${f1(r.perdidas, 0)} % | ${f1(r.ret3)} % (${r.n3}) |`).join('\n') + '\n';
const contexto = (conj) => {
  const fila = (nombre, fn) => { const a = conj.filter(fn).map((o) => o.retReal); return `| ${nombre} | ${a.length} | ${f1(100 * mediana(a))} % | ${f1(a.length ? 100 * a.filter((x) => x < -0.1).length / a.length : null, 0)} % |`; };
  return `| Todos los cierres según el filtro | Cierres | Rent. real 12 m | < −10 % |\n|---|--:|--:|--:|\n${[fila('Pasa calidad publicada', (o) => o.calPub), fila('No pasa calidad publicada', (o) => !o.calPub), fila('Pasa calidad sin fondo de comercio', (o) => o.calEx), fila('No pasa calidad sin fondo de comercio', (o) => !o.calEx), fila('Pasa sin f. de comercio y no publicada', (o) => o.calEx && !o.calPub), fila('  · de ellas, compradores en serie', (o) => o.calEx && !o.calPub && o.serie === true), fila('  · de ellas, compra única', (o) => o.calEx && !o.calPub && o.serie === false)].join('\n')}\n`;
};
const listaQ = (conj) => `| Empresa | Cierre | ROIC publicado | ROIC sin f. de comercio | WACC | En serie | Rent. real 12 m |\n|---|--:|--:|--:|--:|---|--:|\n` +
  conj.filter((o) => o.compra && o.calEx && !o.calPub).sort((a, b) => b.retReal - a.retReal).map((o) => `| ${o.nombre} | ${o.t} | ${f1(o.roicPub)} % | ${f1(o.roicEx)} % | ${f1(empresas.find((e) => e.ticker === o.ticker).wacc)} % | ${o.serie === null ? 'sin historia' : o.serie ? 'sí' : 'no'} | ${f1(100 * o.retReal)} % |`).join('\n') + '\n';

// ── Prueba 2: cíclicas ──
const C = {
  'Vigente (selector)': (o) => ({ pond: o.pond, retPond: o.retPond, compra: o.compra }),
  'Sin años de fondo de ciclo, solo cíclicas': (o) => (o.ciclica ? { pond: o.pondC, retPond: o.retPondC, compra: o.compraC } : { pond: o.pond, retPond: o.retPond, compra: o.compra }),
  'Sin años de fondo de ciclo, todas': (o) => ({ pond: o.pondC, retPond: o.retPondC, compra: o.compraC }),
};
const medirC = (conj) => Object.entries(C).map(([nombre, fn]) => {
  const fil = conj.map((o) => ({ o, r: fn(o) }));
  const err = fil.map(({ o, r }) => r.pond / ((o.retReal + 1) * o.precio - o.dpa) - 1);
  const c = fil.filter(({ r }) => r.compra).map(({ o }) => o.retReal), nc = fil.filter(({ r }) => !r.compra).map(({ o }) => o.retReal);
  return { nombre, n: fil.length, sesgo: 100 * mediana(err), error: 100 * mediana(err.map(Math.abs)), compras: c.length, retC: 100 * mediana(c), retNC: 100 * mediana(nc), acierto: c.length ? 100 * c.filter((x) => x >= 0.15).length / c.length : null, perdidas: c.length ? 100 * c.filter((x) => x < -0.1).length / c.length : null };
});
const tablaC = (titulo, conj) => `### ${titulo} (${conj.length} cierres; ${conj.filter((o) => o.fondos).length} con algún año de fondo de ciclo)\n\n| Estrategia | Sesgo pond. | Error pond. | Comprar | Rent. real Comprar | Rent. real resto | Comprar ≥ 15 % | Comprar < −10 % |\n|---|--:|--:|--:|--:|--:|--:|--:|\n` +
  medirC(conj).map((r) => `| ${r.nombre} | ${f1(r.sesgo)} % | ${f1(r.error)} % | ${r.compras} | ${f1(r.retC)} % | ${f1(r.retNC)} % | ${f1(r.acierto, 0)} % | ${f1(r.perdidas, 0)} % |`).join('\n') + '\n';

const conCal = obs.filter((o) => o.conCalidad), val = (c) => c.filter((o) => o.mitad === 'validación'), dis = (c) => c.filter((o) => o.mitad === 'diseño');
const cic = obs.filter((o) => o.ciclica), noCic = obs.filter((o) => !o.ciclica);
const md = [
  `# Backtest del ROIC sin fondo de comercio y de las cíclicas · ${new Date().toISOString().slice(0, 10)}${BPA_REAL ? ' · BPA real' : ' · BPA ingenuo'}\n`,
  `Generado con \`node herramientas/backtest-calidad-ciclicas.mjs${BPA_REAL ? ' --bpa-real' : ''}\`. Protocolo y criterios fijados antes en \`calidad-ciclicas-preregistro-2026-10-15.md\`. ${empresas.length} empresas, ${obs.length} cierres (${conCal.length} con ROIC y fondo de comercio en t; ${cic.length} de cíclicas). BPA futuro ${BPA_REAL ? 'real (previsión perfecta)' : 'ingenuo (crecimiento mediano conocido, entre −10 % y +25 %)'}. A 12 meses decide la regla vigente (v3 ×1,1 con selector). Pesos 25/50/25.\n`,
  '## Prueba 1: el filtro de calidad con el ROIC sin fondo de comercio\n', tablaQ('Todos', conCal), tablaQ('Validación', val(conCal)), tablaQ('Diseño', dis(conCal)),
  '### Contexto: ¿predice algo cada medida de calidad? (todos los cierres)\n\n' + contexto(conCal),
  '### Las compras que añade el ROIC sin fondo de comercio (todos los cierres)\n\n' + listaQ(conCal),
  '## Prueba 2: cíclicas, años de fondo de ciclo fuera de la historia del PER\n', tablaC('Solo cíclicas', cic), tablaC('Solo cíclicas, validación', val(cic)), tablaC('Solo cíclicas, diseño', dis(cic)), tablaC('No cíclicas', noCic), tablaC('Todos', obs),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
