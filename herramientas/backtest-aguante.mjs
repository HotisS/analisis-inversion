// Backtest del aguante de la compra (preregistro: verticales/empresa/backtest/aguante-preregistro-2026-10-15.md).
// ¿Una compra de t da «No mantener» en t+1 con lo conocido entonces? Misma construcción que backtest-colchon.mjs.
//
//   node herramientas/backtest-aguante.mjs [--bpa-ingenuo] [--salida ruta.md]
import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const argv = process.argv.slice(2);
const BPA_INGENUO = argv.includes('--bpa-ingenuo');
const SALIDA = argv.includes('--salida') ? argv[argv.indexOf('--salida') + 1] : null;
const COLCHONES = [0, 2, 3, 5, 8];
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
const pct = (arr, p) => { const a = arr.filter(Number.isFinite).sort((x, y) => x - y); if (!a.length) return null; const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
const mediana = (a) => pct(a, 0.5);
const media = (a) => { const b = a.filter(Number.isFinite); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
const f1 = (x, d = 1) => (x === null || !Number.isFinite(x) ? 'n.d.' : x.toFixed(d).replace('.', ','));

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

const empresas = cargarEmpresas();
const mitad = Object.fromEntries(empresas.map((e, i) => [e.ticker, i % 2 === 0 ? 'diseño' : 'validación']));
// Lo que la regla ve en el cierre t (precio t, historia hasta t, BPA ingenuo desde t). Devuelve null si falta algo.
function enCierre(emp, t) {
  const y1 = t + 1, y2 = t + 2;
  if (!(emp.precio[t] > 0)) return null;
  if (!BPA_INGENUO && !(emp.bpa[y1] > 0 && emp.bpa[y2] > 0)) return null;
  let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2];
  if (BPA_INGENUO) {
    const g = []; for (const y of emp.anios) if (y <= t && emp.bpa[y - 1] > 0 && emp.bpa[y] > 0) g.push(emp.bpa[y] / emp.bpa[y - 1] - 1);
    if (g.length < 2 || !(emp.bpa[t] > 0)) return null;
    const gm = Math.max(-0.1, Math.min(0.25, mediana(g)));
    bpa1 = emp.bpa[t] * (1 + gm); bpa2 = bpa1 * (1 + gm);
  }
  const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
  if (!hC || !hA) return null;
  const actual = emp.precio[t] / bpa1;
  if (!(actual > 0) || actual > 150) return null;
  const excl = atipicos(emp, t);
  const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
  return { ticker: emp.ticker, mitad: mitad[emp.ticker], t, precio: emp.precio[t], dpa: emp.dpa[y1] || 0, bpa2, actual, hC, hA, hCl, hAl };
}
const obs = [];
for (const emp of empresas) for (const t of emp.anios) {
  const o = enCierre(emp, t), o1 = enCierre(emp, t + 1);
  if (!o || !o1 || !emp.precio[t + 1]) continue;
  obs.push({ ...o, precioReal: emp.precio[t + 1], retReal: (emp.precio[t + 1] + (emp.dpa[t + 1] || 0)) / emp.precio[t] - 1, despues: o1 });
}

// Rentabilidades ponderada y base (en %) de cada método para un cierre.
const rents = (o, m) => { const p = (x) => x * o.bpa2, ret = (x) => 100 * ((x + o.dpa) / o.precio - 1); const pond = (p(m.bajista) + 2 * p(m.base) + p(m.alcista)) / 4; return { pond: ret(pond), base: ret(p(m.base)) }; };
function selectorRents(o) {
  const hA = o.hAl, hC = o.hCl;
  if (hA.mediana_5a / o.actual >= 1.8) return rents(o, v2(o.actual, hC));
  if (hA.n <= 3) { const a = rents(o, v3(o.actual, hA)), b = rents(o, v2(o.actual, hC)); return a.pond <= b.pond ? a : b; }
  return rents(o, v3(o.actual, hA));
}
const pasa = (r, c) => r.pond >= 15 + c && r.base >= 12 + c;
const robustaRents = (o) => { const a = rents(o, v3(o.actual, o.hA)), b = rents(o, v2(o.actual, o.hC)); return { pond: Math.min(a.pond, b.pond), base: Math.min(a.base, b.base) }; };
const robusta = (o, c) => pasa(robustaRents(o), c);
// Vuelco: en t+1 la regla (selector) dice «No mantener» (ponderada < 10 o base < 5).
const vuelco = (o) => { const r = selectorRents(o.despues); return r.pond < 10 || r.base < 5; };
const subio = (o) => o.precioReal >= 1.1 * o.precio;
function medir(sel) {
  const r = sel.map((o) => o.retReal), vm = sel.filter((o) => vuelco(o) && !subio(o)), vs = sel.filter((o) => vuelco(o) && subio(o));
  const p = (k) => (sel.length ? 100 * k / sel.length : null);
  return { n: sel.length, malo: p(vm.length), conSubida: p(vs.length), med: r.length ? 100 * mediana(r) : null, perd: p(r.filter((x) => x < -0.1).length), retMalo: vm.length ? 100 * mediana(vm.map((o) => o.retReal)) : null };
}
const fila = (nombre, m, base) => `| ${nombre} | ${m.n}${base ? ` (${f1(100 * m.n / base.n, 0)} %)` : ''} | ${f1(m.malo, 0)} % | ${f1(m.conSubida, 0)} % | ${f1(m.med)} % | ${f1(m.perd, 0)} % | ${f1(m.retMalo)} % |`;
const CAB = `| Estrategia | Compras (% de c = 0) | Vuelco malo a 12 m | Vuelco con subida | Rent. real mediana | < −10 % | Rent. real de los vuelcos malos |\n|---|--:|--:|--:|--:|--:|--:|\n`;
function tabla(titulo, conj) {
  const m0 = medir(conj.filter((o) => robusta(o, 0)));
  let md = `### ${titulo} (${conj.length} cierres con regla en t y en t+1)\n\n` + CAB;
  md += fila('Selector solo (Comprar vigente, sin exigir v2)', medir(conj.filter((o) => pasa(selectorRents(o), 0))), null) + '\n';
  for (const c of COLCHONES) md += fila(`Robusta, colchón c = ${c}`, medir(conj.filter((o) => robusta(o, c))), c ? m0 : null) + '\n';
  md += `\nPor **margen de la compra robusta** (ponderada robusta − 15):\n\n` + CAB.replace('Estrategia', 'Margen').replace(' (% de c = 0)', '');
  const tramos = [['0-3 puntos', 0, 3], ['3-8', 3, 8], ['8-15', 8, 15], ['≥ 15', 15, Infinity]];
  for (const [nombre, a, b] of tramos) md += fila(nombre, medir(conj.filter((o) => { const r = robustaRents(o); const mg = r.pond - 15; return r.base >= 12 && mg >= a && mg < b; })), null) + '\n';
  md += `\nCriterio (vuelco malo baja ≥ 5 puntos conservando ≥ 60 % de las compras): ` + COLCHONES.slice(1).map((c) => { const m = medir(conj.filter((o) => robusta(o, c))); return `c = ${c}: ${m0.malo - m.malo >= 5 ? '✓' : '✗'} (${f1(m0.malo - m.malo, 0)} puntos, ${f1(100 * m.n / m0.n, 0) } % de las compras)`; }).join('; ') + '.\n';
  return md;
}
const val = obs.filter((o) => o.mitad === 'validación'), dis = obs.filter((o) => o.mitad === 'diseño');
const md = [
  `# Backtest del aguante de la compra · ${new Date().toISOString().slice(0, 10)}${BPA_INGENUO ? ' · BPA ingenuo' : ' · BPA real'}\n`,
  `Generado con \`node herramientas/backtest-aguante.mjs${BPA_INGENUO ? ' --bpa-ingenuo' : ''}\`. Protocolo fijado antes en \`aguante-preregistro-2026-10-15.md\`. ${empresas.length} empresas, ${obs.length} cierres con la regla calculable en t y en t+1 (${dis.length} de diseño y ${val.length} de validación). Vuelco = en t+1 la regla dice «No mantener»; malo si el precio no subió un 10 %. Horizonte 12 meses (techo de lo que pasa a 3 meses).\n`,
  tabla(BPA_INGENUO ? 'Todos los cierres (decide)' : 'Todos los cierres (techo, BPA real)', obs), tabla('Validación (signo)', val), tabla('Diseño', dis),
].join('\n');
if (SALIDA) writeFileSync(join(raiz, SALIDA), md);
console.log(md);
