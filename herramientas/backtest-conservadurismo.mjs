// Backtest de los tres sesgos conservadores (preregistro: verticales/empresa/backtest/conservadurismo-preregistro-2026-10-15.md).
//   node herramientas/backtest-conservadurismo.mjs [--bpa-real] [--salida ruta.md]
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { raiz, cargarEmpresas, construirObs, calc, v2, v3, selector, pasaCompra, ratioDesrateada, resumen, f1, mediana, crecimientoIngenuo } from './backtest-comun.mjs';

const argv = process.argv.slice(2);
const INGENUO = !argv.includes('--bpa-real');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const empresas = cargarEmpresas();
const obs = construirObs(empresas, { ingenuo: INGENUO, requiereReal: true });
const err = (c, o) => c.pond / o.precioReal - 1;
function medir(conj, fn) {
  const fil = conj.map((o) => ({ o, c: fn(o) })).filter((x) => x.c);
  const e = fil.map(({ o, c }) => err(c, o)), compras = fil.filter(({ c }) => pasaCompra(c));
  const r = resumen(compras.map(({ o }) => o));
  return { n: fil.length, sesgo: 100 * mediana(e), error: 100 * mediana(e.map(Math.abs)), compras: r.n, med: r.med, acierto: r.acierto, perd: r.perd };
}
const fila = (k, m) => `| ${k} | ${m.n} | ${f1(m.sesgo)} % | ${f1(m.error)} % | ${m.compras} | ${f1(m.med)} % | ${f1(m.acierto, 0)} % | ${f1(m.perd, 0)} % |`;
const CAB = '| Variante | Cierres | Sesgo pond. | Error pond. | Compras | Rent. real mediana | ≥ 15 % | < −10 % |\n|---|--:|--:|--:|--:|--:|--:|--:|\n';

// ── Sesgo 1: desrateadas ──
function sesgo1(titulo, conj) {
  const des = conj.filter((o) => ratioDesrateada(o) >= 1.8);
  const V = { 'S0 vigente (v2)': (o) => calc(o, v2(o.actual, o.hCl)), 'S1 v2 con tope ×1,1': (o) => calc(o, v2(o.actual, o.hCl, 1.1)), 'S2 v2 con tope ×1,2': (o) => calc(o, v2(o.actual, o.hCl, 1.2)), 'S3 v3 ×1,1 sin selector': (o) => calc(o, v3(o.actual, o.hAl)) };
  let md = `#### ${titulo}: ${des.length} cierres desrateados\n\n` + CAB;
  const m = {}; for (const [k, fn] of Object.entries(V)) { m[k] = medir(des, fn); md += fila(k, m[k]) + '\n'; }
  const ok = (k) => m[k].error <= m['S0 vigente (v2)'].error + 0.5 && (m[k].med ?? -Infinity) >= (m['S0 vigente (v2)'].med ?? -Infinity) && (m[k].perd ?? 0) <= (m['S0 vigente (v2)'].perd ?? 0) + 3;
  md += `\nCriterio (error ≤ vigente + 0,5; mediana de compras no menor; < −10 % no más de +3): S1 ${ok('S1 v2 con tope ×1,1') ? '✓' : '✗'}, S2 ${ok('S2 v2 con tope ×1,2') ? '✓' : '✗'}.\n`;
  return { md, ok1: ok('S1 v2 con tope ×1,1'), ok2: ok('S2 v2 con tope ×1,2') };
}
// ── Sesgo 2: selector continuo e inestabilidad ──
const mezcla = (o, opts = {}) => {
  const actual = opts.actual ?? o.actual, precio = opts.precio ?? o.precio;
  const w = Math.max(0, Math.min(1, (ratioDesrateada(o, actual) - 1.5) / 0.6));
  const a = calc(o, v3(actual, o.hAl), { precio }), b = calc(o, v2(actual, o.hCl), { precio });
  if (o.hAl.n <= 3) return a.retPond <= b.retPond ? a : b;
  const mix = (k) => (1 - w) * a[k] + w * b[k];
  return { pond: mix('pond'), base: mix('base'), retPond: mix('retPond'), retBase: mix('retBase'), w };
};
const inestable = (conj, fn) => { let n = 0; for (const o of conj) { const c0 = pasaCompra(fn(o)); for (const k of [0.95, 1.05]) if (pasaCompra(fn(o, { actual: o.actual * k, precio: o.precio * k })) !== c0) { n++; break; } } return 100 * n / conj.length; };
function sesgo2(titulo, conj) {
  const V = { 'Selector vigente (escalón en 1,8)': (o, opts) => selector(o, opts), 'S4 mezcla continua 1,5-2,1': (o, opts) => mezcla(o, opts) };
  let md = `#### ${titulo}: ${conj.length} cierres\n\n` + CAB.replace('< −10 % |', '< −10 % | Inestable (±5 % de precio) |').replace('--:|\n', '--:|--:|\n');
  const m = {}; for (const [k, fn] of Object.entries(V)) { m[k] = medir(conj, fn); m[k].inest = inestable(conj, fn); md += fila(k, m[k]) + ` ${f1(m[k].inest, 0)} % |\n`; }
  const a = m['Selector vigente (escalón en 1,8)'], b = m['S4 mezcla continua 1,5-2,1'];
  const ok = b.error <= a.error + 0.3 && (b.med ?? -Infinity) >= (a.med ?? -Infinity) && (b.perd ?? 0) <= (a.perd ?? 0) && b.inest < a.inest;
  md += `\nCriterio (error ≤ vigente + 0,3; mediana no menor; < −10 % no mayor; menos inestable): S4 ${ok ? '✓' : '✗'}.\n`;
  return { md, ok };
}
// ── Sesgo 3: recompras ──
function recomprador(emp, t) {
  const ys = emp.anios.filter((y) => y <= t && emp.acc[y] && emp.acc[y - 1]).slice(-4);
  if (ys.length < 4) return null;
  const bajadas = ys.filter((y) => emp.acc[y] / emp.acc[y - 1] - 1 <= -0.01).length;
  const s = mediana(ys.map((y) => emp.acc[y - 1] / emp.acc[y] - 1));
  return { serie: bajadas >= 3, reduccion: s };
}
function sesgo3(titulo, conj) {
  const rec = conj.map((o) => ({ o, r: recomprador(o.emp, o.t), gbn: crecimientoIngenuo(o.emp.bn, o.emp.anios, o.t) })).filter((x) => x.r?.serie && x.gbn !== null && x.o.bpaReal2 && x.o.emp.bpa[x.o.t] > 0);
  const V = { 'B0 como el analista (beneficio, acciones fijas)': (x) => 1 + x.gbn, 'B1 recompra entera': (x) => (1 + x.gbn) * (1 + x.r.reduccion), 'B2 recompra a la mitad': (x) => (1 + x.gbn) * (1 + x.r.reduccion / 2), 'B3 vigente del backtest (BPA)': (x) => 1 + x.o.g };
  let md = `#### ${titulo}: ${rec.length} cierres de recompradores en serie (reducción mediana de acciones ${f1(100 * mediana(rec.map((x) => x.r.reduccion)))} % al año)\n\n| Variante | Error del BPA t+2 (mediana abs.) | Sesgo del BPA | Compras | Rent. real mediana | ≥ 15 % | < −10 % |\n|---|--:|--:|--:|--:|--:|--:|\n`;
  const m = {};
  for (const [k, fn] of Object.entries(V)) {
    const filas = rec.map((x) => { const g = fn(x); const bpa1 = x.o.emp.bpa[x.o.t] * g, bpa2 = bpa1 * g; const c = selector(x.o, { actual: x.o.precio / bpa1, bpa2 }); return { o: x.o, e: bpa2 / x.o.bpaReal2 - 1, c }; });
    const compras = filas.filter((f) => pasaCompra(f.c)).map((f) => f.o), r = resumen(compras);
    m[k] = { error: 100 * mediana(filas.map((f) => Math.abs(f.e))), sesgo: 100 * mediana(filas.map((f) => f.e)), ...r };
    md += `| ${k} | ${f1(m[k].error)} % | ${f1(m[k].sesgo)} % | ${m[k].n} | ${f1(m[k].med)} % | ${f1(m[k].acierto, 0)} % | ${f1(m[k].perd, 0)} % |\n`;
  }
  const b0 = m['B0 como el analista (beneficio, acciones fijas)'];
  const ok = (k) => m[k].error <= b0.error - 1 && (m[k].med ?? -Infinity) >= (b0.med ?? -Infinity) && (m[k].perd ?? 0) <= (b0.perd ?? 0);
  md += `\nCriterio (error del BPA ≥ 1 punto menor que B0; mediana de compras no menor; < −10 % no mayor): B2 ${ok('B2 recompra a la mitad') ? '✓' : '✗'}, B1 ${ok('B1 recompra entera') ? '✓' : '✗'}.\n`;
  return { md, ok1: ok('B1 recompra entera'), ok2: ok('B2 recompra a la mitad') };
}
const val = obs.filter((o) => o.mitad === 'validación'), dis = obs.filter((o) => o.mitad === 'diseño');
const partes = [`# Backtest de los tres sesgos conservadores · ${new Date().toISOString().slice(0, 10)} · BPA ${INGENUO ? 'ingenuo' : 'real'}\n`,
  `Generado con \`node herramientas/backtest-conservadurismo.mjs${INGENUO ? '' : ' --bpa-real'}\`. Protocolo: \`conservadurismo-preregistro-2026-10-15.md\`. ${empresas.length} empresas, ${obs.length} cierres (${dis.length} diseño, ${val.length} validación).\n`];
for (const [titulo, fn] of [['Sesgo 1: la v2 en desrateadas', sesgo1], ['Sesgo 2: el escalón del selector', sesgo2], ['Sesgo 3: recompras no anunciadas', sesgo3]]) {
  partes.push(`### ${titulo}\n`);
  for (const [k, conj] of [['Todos (decide)', obs], ['Validación (signo)', val], ['Diseño', dis]]) partes.push(fn(k, conj).md);
}
const md = partes.join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
