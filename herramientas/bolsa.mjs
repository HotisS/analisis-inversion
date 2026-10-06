// Datos de bolsa de una acción frente a su índice y su sector, con los históricos diarios gratuitos
// de Yahoo Finance (cierre y cierre ajustado por dividendos). Sin dependencias.
//
//   node herramientas/bolsa.mjs --accion ITX.MC --indice ^IBEX --sector EXH1.DE --corte 2026-10-05 \
//        [--cierre-mes 1] [--dir informes/x/notas/docs] [--salida informes/x/notas/bolsa.json]
//
// Devuelve (y guarda en --salida) lo que piden `bolsa`, parte de `identificacion` (precio, rango de 52
// semanas, volumen) y `multiplos_historicos.serie[].precio_cierre` (cierre de cada ejercicio). Los
// índices de precio (^IBEX, ^GSPC) no llevan dividendos: si alguna serie no los tiene, las
// rentabilidades se dan de precio para todas (no se mezclan) y `tipo_rentabilidad` lo dice.

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const a = {};
const argv = process.argv.slice(2);
for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
if (!a.accion || !a.corte) { console.error('Uso: node herramientas/bolsa.mjs --accion SIMBOLO --indice SIMBOLO [--sector SIMBOLO] --corte AAAA-MM-DD [--cierre-mes 12] [--dir carpeta] [--salida bolsa.json]'); process.exit(1); }
const CORTE = a.corte, MES = +(a['cierre-mes'] || 12);

async function serie(simbolo) {
  // Con range=max Yahoo baja a datos semanales o mensuales: se pide por fechas, con 11 años.
  const p2 = Math.floor(new Date(CORTE + "T23:59:59Z").getTime() / 1000) + 86400, p1 = p2 - Math.round(11 * 365.25 * 86400);
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?period1=${p1}&period2=${p2}&interval=1d&events=div`;
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
  if (!r.ok) throw new Error(`${simbolo}: HTTP ${r.status}`);
  const j = await r.json();
  const x = j.chart?.result?.[0];
  if (!x?.timestamp) throw new Error(`${simbolo}: sin datos`);
  if (a.dir) { mkdirSync(a.dir, { recursive: true }); writeFileSync(`${a.dir}/yahoo_${simbolo.replace(/[^\w.-]/g, '_')}.json`, JSON.stringify(j)); }
  const q = x.indicators.quote[0], adj = x.indicators.adjclose?.[0]?.adjclose || q.close;
  const filas = x.timestamp.map((t, i) => ({ d: new Date((t + x.meta.gmtoffset) * 1000).toISOString().slice(0, 10), c: q.close[i], a: adj[i], h: q.high[i], l: q.low[i], v: q.volume[i] }))
    .filter((f) => f.c != null && f.d <= CORTE);
  const dividendos = Object.values(x.events?.dividends || {}).length;
  return { simbolo, divisa: x.meta.currency, filas, con_dividendos: dividendos > 0 && filas.some((f) => Math.abs(f.a / f.c - 1) > 1e-4) };
}

const r2 = (x, d = 2) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const en = (s, fecha) => { let o = null; for (const f of s.filas) { if (f.d <= fecha) o = f; else break; } return o; };
const menos = (fecha, anios) => { const d = new Date(fecha + 'T00:00:00Z'); d.setUTCFullYear(d.getUTCFullYear() - anios); return d.toISOString().slice(0, 10); };

const simbolos = { accion: a.accion, indice: a.indice, sector: a.sector };
const S = {};
for (const [k, s] of Object.entries(simbolos)) if (s) S[k] = await serie(s);
const acc = S.accion, ult = acc.filas.at(-1);
// Los índices de Yahoo (^IBEX, ^GSPC…) son de precio; acciones y ETF llevan el cierre ajustado por dividendos.
const total = Object.values(S).every((s) => !s.simbolo.startsWith("^"));
const campo = total ? 'a' : 'c';
const rent = (s, desde, anual) => {
  const i = en(s, desde), f = s.filas.at(-1);
  if (!i || i.d < s.filas[0].d || s.filas[0].d > desde) return null;
  const r = f[campo] / i[campo] - 1;
  return r2((anual ? (1 + r) ** (1 / anual) - 1 : r) * 100, 1);
};
const periodos = [['En el año', `${CORTE.slice(0, 4) - 1}-12-31`, 0], ['1 año', menos(CORTE, 1), 0], ['3 años (anual.)', menos(CORTE, 3), 3], ['5 años (anual.)', menos(CORTE, 5), 5], ['10 años (anual.)', menos(CORTE, 10), 10]];
const rentabilidades = periodos.map(([periodo, desde, an]) => ({
  periodo, accion_pct: rent(acc, desde, an), indice_pct: S.indice ? rent(S.indice, desde, an) : null, sector_pct: S.sector ? rent(S.sector, desde, an) : null,
})).filter((x) => x.accion_pct !== null);

const anioCorte = +CORTE.slice(0, 4);
const anual = [];
for (let y = anioCorte - 10; y < anioCorte; y++) {
  const r = (s) => { const i = en(s, `${y - 1}-12-31`), f = en(s, `${y}-12-31`); return i && f && i.d.slice(0, 4) == y - 1 ? r2((f[campo] / i[campo] - 1) * 100, 1) : null; };
  const fila = { anio: String(y), accion_pct: r(acc), indice_pct: S.indice ? r(S.indice) : null };
  if (fila.accion_pct !== null) anual.push(fila);
}

// Beta de 5 años con rentabilidades mensuales (cierre ajustado) frente al índice
function beta(s, idx, anios = 5) {
  const mens = (x) => { const m = {}; for (const f of x.filas) m[f.d.slice(0, 7)] = f; return m; };
  const ms = mens(s), mi = mens(idx), desde = menos(CORTE, anios).slice(0, 7);
  const meses = Object.keys(ms).filter((k) => k >= desde && mi[k]).sort();
  const xs = [], ys = [];
  for (let i = 1; i < meses.length; i++) { ys.push(ms[meses[i]].a / ms[meses[i - 1]].a - 1); xs.push(mi[meses[i]].a / mi[meses[i - 1]].a - 1); }
  if (xs.length < 24) return null;
  const mx = xs.reduce((p, x) => p + x, 0) / xs.length, my = ys.reduce((p, y) => p + y, 0) / ys.length;
  let cov = 0, vx = 0; for (let i = 0; i < xs.length; i++) { cov += (xs[i] - mx) * (ys[i] - my); vx += (xs[i] - mx) ** 2; }
  return { beta: r2(cov / vx), meses: xs.length };
}
const ano = acc.filas.filter((f) => f.d > menos(CORTE, 1));
const logs = ano.slice(1).map((f, i) => Math.log(f.c / ano[i].c));
const mL = logs.reduce((p, x) => p + x, 0) / logs.length;
const volatilidad = r2(Math.sqrt(logs.reduce((p, x) => p + (x - mL) ** 2, 0) / (logs.length - 1)) * Math.sqrt(252) * 100, 1);
let pico = null, caida = 0, tramo = null;
for (const f of acc.filas.filter((x) => x.d > menos(CORTE, 5))) { if (!pico || f.a > pico.a) pico = f; const dd = f.a / pico.a - 1; if (dd < caida) { caida = dd; tramo = `${pico.d} → ${f.d}`; } }
const hace3m = (() => { const d = new Date(CORTE + 'T00:00:00Z'); d.setUTCMonth(d.getUTCMonth() - 3); return d.toISOString().slice(0, 10); })();
const tres = acc.filas.filter((f) => f.d > hace3m);
const volumen = tres.length ? { acciones_dia: Math.round(tres.reduce((p, f) => p + f.v, 0) / tres.length), importe_dia_millones: r2(tres.reduce((p, f) => p + f.v * f.c, 0) / tres.length / 1e6, 1), sesiones: tres.length } : null;

// Cierre de cada ejercicio (último día hábil del mes de cierre), para los múltiplos históricos
const cierres = [];
for (let y = anioCorte - 10; y <= anioCorte; y++) {
  const fin = new Date(Date.UTC(y, MES, 0)).toISOString().slice(0, 10);
  if (fin > CORTE) continue;
  const f = en(acc, fin);
  if (f && f.d.slice(0, 7) === fin.slice(0, 7)) cierres.push({ anio: MES === 12 ? String(y) : `FY${MES <= 6 ? y - 1 : y}`, fecha: f.d, precio_cierre: r2(f.c) });
}

const salida = {
  fuente: `Yahoo Finance, históricos diarios (${Object.values(simbolos).filter(Boolean).join(', ')}), hasta ${ult.d}`,
  divisa_accion: acc.divisa,
  tipo_rentabilidad: total ? 'total (con dividendos)' : 'de precio (sin dividendos)',
  nota_tipo: total ? 'Todas las series llevan dividendos reinvertidos (cierre ajustado).' : `Alguna serie no lleva dividendos (${Object.values(S).filter((s) => s.simbolo.startsWith('^')).map((s) => s.simbolo).join(', ')}): todo de precio para no mezclar.`,
  identificacion: { precio: r2(ult.c), fecha_precio: ult.d, max_52s: r2(Math.max(...ano.map((f) => f.h ?? f.c))), min_52s: r2(Math.min(...ano.map((f) => f.l ?? f.c))) },
  volumen_3m: volumen,
  bolsa: { tipo_rentabilidad: total ? 'total (con dividendos)' : 'de precio (sin dividendos)', rentabilidades, anual, beta: S.indice ? beta(acc, S.indice)?.beta ?? null : null, volatilidad_pct: volatilidad, max_drawdown_pct: r2(caida * 100, 1), tramo_drawdown: tramo },
  beta_detalle: S.indice ? beta(acc, S.indice) : null,
  cierres_ejercicio: cierres,
};
if (a.salida) { mkdirSync(dirname(a.salida), { recursive: true }); writeFileSync(a.salida, JSON.stringify(salida, null, 2)); }
console.log(JSON.stringify(salida, null, 2));
