// Construcción común de los backtests con cierres de ejercicio (la misma que backtest-selector.mjs): empresas, historia del PER,
// reglas v2 y v3, observaciones (empresa × cierre t con precio t+1), selector. Solo lectura, sin red.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
export const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);
export const pct = (arr, p) => { const a = arr.filter(Number.isFinite).sort((x, y) => x - y); if (!a.length) return null; const i = (a.length - 1) * p, lo = Math.floor(i), hi = Math.ceil(i); return a[lo] + (a[hi] - a[lo]) * (i - lo); };
export const mediana = (a) => pct(a, 0.5);
export const media = (a) => { const b = a.filter(Number.isFinite); return b.length ? b.reduce((s, x) => s + x, 0) / b.length : null; };
export const f1 = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? 'n.d.' : x.toFixed(d).replace('.', ','));

export function cargarEmpresas() {
  const dir = join(raiz, 'informes'), porTicker = {};
  for (const carpeta of readdirSync(dir)) {
    const p = join(dir, carpeta);
    if (!statSync(p).isDirectory()) continue;
    const archivos = readdirSync(p).filter((a) => /^datos(-v\d+)?\.json$/.test(a)).sort((a, b) => (n(a.match(/v(\d+)/)?.[1]) ?? 1) - (n(b.match(/v(\d+)/)?.[1]) ?? 1));
    if (!archivos.length) continue;
    let d; try { d = JSON.parse(readFileSync(join(p, archivos.at(-1)), 'utf8')); } catch { continue; }
    const bpa = {}, dpa = {}, precio = {}, bn = {}, acc = {};
    for (const c of d.financieros?.cuenta || []) { const y = +String(c.periodo).replace(/\D/g, ''); if (y && n(c.bpa) !== null) { bpa[y] = n(c.bpa); dpa[y] = n(c.dpa) ?? 0; if (n(c.beneficio_neto) !== null) bn[y] = n(c.beneficio_neto); if (n(c.acciones_diluidas) !== null) acc[y] = n(c.acciones_diluidas); } }
    for (const s of d.multiplos_historicos?.serie || []) { const y = +String(s.anio).replace(/\D/g, ''); if (y && n(s.precio_cierre) && !s.excluir) precio[y] = n(s.precio_cierre); }
    const anios = Object.keys(precio).map(Number).filter((y) => bpa[y] !== undefined).sort((a, b) => a - b);
    if (anios.length < 3) continue;
    const ticker = (d.identificacion?.ticker || carpeta).toUpperCase().replace(/[^A-Z0-9.]/g, '');
    const emp = { ticker, carpeta, anios, bpa, dpa, precio, bn, acc, nombre: d.identificacion?.nombre_corto || d.identificacion?.nombre || carpeta };
    if (!porTicker[ticker] || porTicker[ticker].anios.length < anios.length) porTicker[ticker] = emp;
  }
  return Object.values(porTicker).sort((a, b) => a.ticker.localeCompare(b.ticker));
}
export function atipicos(emp, t) {
  const s = new Set();
  for (const y of emp.anios) {
    const a = emp.bpa[y - 1], b = emp.bpa[y], c = emp.bpa[y + 1];
    if (!(a > 0 && b > 0 && c > 0) || y + 1 > t) continue;
    if ((b / a > 1.5 && b / c > 1.5) || (b / a < 1 / 1.5 && b / c < 1 / 1.5)) s.add(y);
  }
  return s;
}
export function historia(emp, t, base, excl = new Set()) {
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
// v2 con tope opcional sobre el PER de hoy (S1/S2 del protocolo de conservadurismo); tope = 1 es la v2 vigente.
export const v2 = (actual, h, tope = 1) => { const base = Math.min(actual * tope, h.mediana_5a); return { bajista: h.minimo_5a < base ? h.minimo_5a : base * 0.85, base, alcista: Math.min(Math.max(h.media_larga, base), base * 1.3) }; };
export const v3 = (actual, h) => {
  let base = actual * Math.sqrt(h.mediana_5a / actual);
  base = Math.min(Math.max(base, actual / 1.1), actual * 1.1);
  return { bajista: Math.min(h.minimo_5a, base * 0.8), base, alcista: Math.max(base, Math.min(Math.max(h.media_larga, h.mediana_5a), base * 1.35)) };
};
// Crecimiento ingenuo: mediana de los crecimientos anuales conocidos en t, acotada a −10 %/+25 %.
export function crecimientoIngenuo(serie, anios, t) {
  const g = []; for (const y of anios) if (y <= t && serie[y - 1] > 0 && serie[y] > 0) g.push(serie[y] / serie[y - 1] - 1);
  if (g.length < 2) return null;
  return Math.max(-0.1, Math.min(0.25, mediana(g)));
}
// Observaciones: empresa × cierre t con precio t+1; BPA real (t+1, t+2) o ingenuo. `requiereReal` exige BPA real de t+2 aunque sea ingenuo.
export function construirObs(empresas, { ingenuo = false, requiereReal = true } = {}) {
  const mitad = Object.fromEntries(empresas.map((e, i) => [e.ticker, i % 2 === 0 ? 'diseño' : 'validación']));
  const obs = [];
  for (const emp of empresas) for (const t of emp.anios) {
    const y1 = t + 1, y2 = t + 2;
    if (!emp.precio[y1] || !(emp.precio[t] > 0)) continue;
    if ((requiereReal || !ingenuo) && !(emp.bpa[y1] > 0 && emp.bpa[y2] > 0)) continue;
    let bpa1 = emp.bpa[y1], bpa2 = emp.bpa[y2], g = null;
    if (ingenuo) {
      g = crecimientoIngenuo(emp.bpa, emp.anios, t);
      if (g === null || !(emp.bpa[t] > 0)) continue;
      bpa1 = emp.bpa[t] * (1 + g); bpa2 = bpa1 * (1 + g);
    }
    const hC = historia(emp, t, 'cierre'), hA = historia(emp, t, 'adelantado');
    if (!hC || !hA) continue;
    const actual = emp.precio[t] / bpa1;
    if (!(actual > 0) || actual > 150) continue;
    const excl = atipicos(emp, t);
    const hCl = excl.size ? historia(emp, t, 'cierre', excl) || hC : hC, hAl = excl.size ? historia(emp, t, 'adelantado', excl) || hA : hA;
    obs.push({ emp, ticker: emp.ticker, carpeta: emp.carpeta, nombre: emp.nombre, mitad: mitad[emp.ticker], t, precio: emp.precio[t], precioReal: emp.precio[y1], dpa: emp.dpa[y1] || 0, bpa1, bpa2, bpaReal2: emp.bpa[y2] ?? null, g, actual,
      hC, hA, hCl, hAl, atipico: excl.size > 0 && (hCl !== hC || hAl !== hA), retReal: (emp.precio[y1] + (emp.dpa[y1] || 0)) / emp.precio[t] - 1 });
  }
  return obs;
}
// Objetivo ponderado y base (precio) y rentabilidades (%) de un múltiplo m sobre una observación (BPA2 y precio de la observación).
export const calc = (o, m, { bpa2 = o.bpa2, precio = o.precio } = {}) => {
  const p = (x) => x * bpa2, ret = (x) => 100 * ((x + o.dpa) / precio - 1);
  const pond = (p(m.bajista) + 2 * p(m.base) + p(m.alcista)) / 4;
  return { pond, base: p(m.base), retPond: ret(pond), retBase: ret(p(m.base)) };
};
export const pasaCompra = (c, colchon = 0) => c.retPond >= 15 + colchon && c.retBase >= 12 + colchon;
export const pasaMantener = (c) => c.retPond >= 10 && c.retBase >= 5;
export const ratioDesrateada = (o, actual = o.actual) => o.hAl.mediana_5a / actual;
// Selector vigente: devuelve el cálculo y la regla; `opts` permite cambiar el precio/BPA (para medir inestabilidad y variantes).
export function selector(o, { actual = o.actual, bpa2 = o.bpa2, precio = o.precio, topeV2 = 1 } = {}) {
  const hA = o.hAl, hC = o.hCl, k = { bpa2, precio };
  if (hA.mediana_5a / actual >= 1.8) return { ...calc(o, v2(actual, hC, topeV2), k), regla: 'desrateada → v2' };
  if (hA.n <= 3) { const a = calc(o, v3(actual, hA), k), b = calc(o, v2(actual, hC, topeV2), k); return { ...(a.retPond <= b.retPond ? a : b), regla: 'historia corta → la más baja' }; }
  return { ...calc(o, v3(actual, hA), k), regla: 'v3' };
}
export const robusta = (o, opts = {}) => { const a = calc(o, v3(opts.actual ?? o.actual, o.hA), opts), b = calc(o, v2(opts.actual ?? o.actual, o.hC), opts); return pasaCompra(a) && pasaCompra(b); };
export function resumen(sel, clave = 'retReal') {
  const r = sel.map((o) => o[clave]).filter(Number.isFinite);
  return { n: r.length, med: r.length ? 100 * mediana(r) : null, acierto: r.length ? 100 * r.filter((x) => x >= 0.15).length / r.length : null, perd: r.length ? 100 * r.filter((x) => x < -0.1).length / r.length : null };
}
