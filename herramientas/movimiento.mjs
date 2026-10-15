// Movimiento del precio antes de decidir (regla 13 de METODO-VIGENTE.md §4, 15-oct-2026): variación a 1, 3, 6 y 12 meses,
// distancia a máximos y mínimos de 52 semanas y de 5 años, tendencia (medias de 50 y 200 sesiones), volatilidad y los
// mayores movimientos de un mes en los últimos 6 meses. Da avisos (P1-P5), no señales: la causa y el veredicto los pone
// el análisis (`bolsa.contexto` en value, `contexto_mercado` en growth).
//
//   NODE_USE_ENV_PROXY=1 node herramientas/movimiento.mjs <carpeta|símbolo…>   carpeta de informes/ (símbolo de simbolos.json) o símbolo Yahoo
//   … --growth <carpeta…>        carpetas de informes-growth/ (simbolo_yahoo o ticker + bolsa)
//   … --todas [--escribir]       todas las de simbolos.json; con --escribir guarda verticales/empresa/movimiento.json (lo lee robustez.mjs)
//   … --json                     salida JSON
import { readFileSync, writeFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { simboloDe, leerMapa } from './precios.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const CACHE = join(process.env.TEMP || tmpdir(), 'analisis-inversion', 'movimiento');
mkdirSync(CACHE, { recursive: true });
export const RUTA_MOVIMIENTO = join(raiz, 'verticales', 'empresa', 'movimiento.json');
const r1 = (x, d = 1) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const f = (x, d = 1) => (x === null || x === undefined ? 'n.d.' : (+x).toLocaleString('es-ES', { minimumFractionDigits: d, maximumFractionDigits: d }));

async function serie(simbolo, { anios = 5, diasCache = 1 } = {}) {
  const fc = join(CACHE, `${simbolo.replace(/[^\w.-]+/g, '_')}-${anios}a.json`);
  if (existsSync(fc) && (Date.now() - statSync(fc).mtimeMs) / 864e5 < diasCache) return JSON.parse(readFileSync(fc, 'utf8'));
  const p2 = Math.floor(Date.now() / 1000), p1 = p2 - anios * 366 * 86400;
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?period1=${p1}&period2=${p2}&interval=1d`;
  let j = null;
  for (let i = 0; i < 4; i++) {
    try { const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }); if (res.ok) { j = await res.json(); break; } if (res.status === 404) break; } catch { /* reintento */ }
    await new Promise((ok) => setTimeout(ok, 1500 * (i + 1)));
  }
  const x = j?.chart?.result?.[0];
  if (!x?.timestamp?.length) return { simbolo, error: j?.chart?.error?.description || 'sin datos' };
  const c = x.indicators?.quote?.[0]?.close || [], t = x.timestamp;
  const puntos = t.map((ts, i) => [new Date(ts * 1000).toISOString().slice(0, 10), c[i]]).filter((p) => Number.isFinite(p[1]) && p[1] > 0);
  const out = { simbolo, divisa: x.meta?.currency || null, puntos };
  writeFileSync(fc, JSON.stringify(out));
  return out;
}

// Métricas en la fecha `hasta` (AAAA-MM-DD; por defecto el último cierre) a partir de la serie diaria.
export function metricas(serieDiaria, hasta = null) {
  const pts = hasta ? serieDiaria.filter((p) => p[0] <= hasta) : serieDiaria;
  const n = pts.length;
  if (n < 30) return null;
  const c = pts.map((p) => p[1]), precio = c[n - 1], fecha = pts[n - 1][0];
  const hace = (d) => (n - 1 - d >= 0 ? c[n - 1 - d] : null);
  const v = (d) => (hace(d) ? (precio / hace(d) - 1) * 100 : null);
  const u = (d) => c.slice(-d);
  const media = (d) => (n >= d ? u(d).reduce((s, x) => s + x, 0) / d : null);
  const max52 = Math.max(...u(252)), min52 = Math.min(...u(252)), maxTodo = Math.max(...c);
  const m50 = media(50), m200 = media(200);
  const rend = u(61).slice(1).map((x, i) => Math.log(x / u(61)[i]));
  const vol = rend.length >= 20 ? Math.sqrt(rend.reduce((s, x) => s + x * x, 0) / rend.length - (rend.reduce((s, x) => s + x, 0) / rend.length) ** 2) * Math.sqrt(252) * 100 : null;
  // Mayor subida y mayor caída en ventanas de 21 sesiones dentro de los últimos 6 meses.
  let sub = null, caida = null;
  for (let i = Math.max(21, n - 126); i < n; i++) {
    const x = (c[i] / c[i - 21] - 1) * 100;
    if (!sub || x > sub.var_pct) sub = { fecha: pts[i][0], var_pct: r1(x) };
    if (!caida || x < caida.var_pct) caida = { fecha: pts[i][0], var_pct: r1(x) };
  }
  const tendencia = m50 && m200 ? (precio > m200 && m50 > m200 ? 'alcista' : precio < m200 && m50 < m200 ? 'bajista' : 'lateral') : null;
  const m = {
    precio: r1(precio, 4), fecha, var_1m_pct: r1(v(21)), var_3m_pct: r1(v(63)), var_6m_pct: r1(v(126)), var_12m_pct: r1(v(252)),
    max_52s: r1(max52, 4), min_52s: r1(min52, 4), dist_max_52s_pct: r1((precio / max52 - 1) * 100), dist_min_52s_pct: r1((precio / min52 - 1) * 100),
    max_historico: r1(maxTodo, 4), dist_max_historico_pct: r1((precio / maxTodo - 1) * 100), anios_serie: r1(n / 252),
    media_50: r1(m50, 4), media_200: r1(m200, 4), dist_media_200_pct: m200 ? r1((precio / m200 - 1) * 100) : null, tendencia, volatilidad_60d_pct: r1(vol),
    mayor_subida_1m_6m: sub, mayor_caida_1m_6m: caida,
  };
  m.avisos = avisos(m);
  return m;
}
// Avisos (no señales): umbrales fijados el 15-oct-2026; el backtest `backtest-movimiento.mjs` dice si alguno merece ser regla.
export function avisos(m) {
  const a = [];
  if (m.var_1m_pct !== null && m.var_1m_pct >= 25) a.push({ codigo: 'P1', texto: `Subida fuerte: +${f(m.var_1m_pct, 0)} % en un mes.` });
  else if (m.var_3m_pct !== null && m.var_3m_pct >= 40) a.push({ codigo: 'P1', texto: `Subida fuerte: +${f(m.var_3m_pct, 0)} % en tres meses.` });
  if (m.dist_max_52s_pct !== null && m.dist_max_52s_pct >= -5 && (m.var_3m_pct ?? 0) >= 20) a.push({ codigo: 'P2', texto: `A ${f(-m.dist_max_52s_pct, 0)} % del máximo de 52 semanas tras subir un ${f(m.var_3m_pct, 0)} % en tres meses.` });
  if (m.var_1m_pct !== null && m.var_1m_pct <= -20) a.push({ codigo: 'P3', texto: `Caída fuerte: ${f(m.var_1m_pct, 0)} % en un mes: hay que saber por qué.` });
  else if (m.var_3m_pct !== null && m.var_3m_pct <= -30) a.push({ codigo: 'P3', texto: `Caída fuerte: ${f(m.var_3m_pct, 0)} % en tres meses: hay que saber por qué.` });
  if (m.dist_min_52s_pct !== null && m.dist_min_52s_pct <= 3) a.push({ codigo: 'P4', texto: `En mínimos de 52 semanas (${f(m.dist_min_52s_pct, 0)} % sobre el mínimo).` });
  if (m.dist_media_200_pct !== null && m.dist_media_200_pct <= -15) a.push({ codigo: 'P5', texto: `Un ${f(-m.dist_media_200_pct, 0)} % por debajo de la media de 200 sesiones (tendencia ${m.tendencia}).` });
  return a;
}
export async function movimiento(simbolo, opciones = {}) {
  const s = await serie(simbolo, opciones);
  if (s.error) return { simbolo, error: s.error };
  const m = metricas(s.puntos, opciones.hasta || null);
  return m ? { simbolo, divisa: s.divisa, ...m } : { simbolo, error: 'serie demasiado corta' };
}
export { serie };
export function leerMovimiento() { return existsSync(RUTA_MOVIMIENTO) ? JSON.parse(readFileSync(RUTA_MOVIMIENTO, 'utf8')) : null; }

export function linea(m) {
  if (m.error) return `${m.simbolo}: ${m.error}`;
  return `${m.simbolo} ${f(m.precio, 2)} ${m.divisa || ''} (${m.fecha}) · 1 m ${f(m.var_1m_pct)} % · 3 m ${f(m.var_3m_pct)} % · 6 m ${f(m.var_6m_pct)} % · 12 m ${f(m.var_12m_pct)} % · máx. 52 s ${f(m.dist_max_52s_pct)} % · mín. 52 s +${f(m.dist_min_52s_pct)} % · máx. ${f(m.anios_serie, 0)} a ${f(m.dist_max_historico_pct)} % · media 200 ${f(m.dist_media_200_pct)} % (${m.tendencia}) · vol. ${f(m.volatilidad_60d_pct, 0)} % · mayor caída 1 m ${f(m.mayor_caida_1m_6m?.var_pct)} % (${m.mayor_caida_1m_6m?.fecha}) · mayor subida ${f(m.mayor_subida_1m_6m?.var_pct)} % (${m.mayor_subida_1m_6m?.fecha})${m.avisos.length ? '\n  ' + m.avisos.map((a) => `[${a.codigo}] ${a.texto}`).join(' ') : ''}`;
}

const esPrincipal = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1];
if (esPrincipal) {
  const argv = process.argv.slice(2);
  const flag = (k) => argv.includes(k);
  const args = argv.filter((a) => !a.startsWith('--'));
  const mapa = leerMapa();
  const porCarpeta = Object.fromEntries(Object.entries(mapa.empresas || {}).map(([k, v]) => [v.carpeta, { clave: k, ...v }]));
  let lista = [];
  if (flag('--todas')) lista = Object.entries(mapa.empresas || {}).map(([clave, v]) => ({ clave, simbolo: v.yahoo, carpeta: v.carpeta, nombre: v.nombre }));
  else for (const a of args) {
    const c = a.replace(/^informes(-growth)?\//, '').replace(/\/$/, '');
    if (flag('--growth')) {
      const p = join(raiz, 'informes-growth', c, 'datos.json');
      const d = existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null;
      lista.push(d ? { clave: d.ticker, simbolo: d.simbolo_yahoo || simboloDe({ ticker: d.ticker, mercado: d.bolsa }), carpeta: c, nombre: d.empresa } : { clave: a, simbolo: a });
    } else if (porCarpeta[c]) lista.push({ clave: porCarpeta[c].clave, simbolo: porCarpeta[c].yahoo, carpeta: c, nombre: porCarpeta[c].nombre });
    else lista.push({ clave: a, simbolo: a });
  }
  const salida = {};
  let i = 0;
  const cola = [...lista];
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (cola.length) {
      const e = cola.shift();
      const m = await movimiento(e.simbolo);
      salida[e.clave] = { carpeta: e.carpeta || null, nombre: e.nombre || null, ...m };
      i++;
      if (!flag('--json') && !flag('--todas')) console.log(`${e.nombre || e.clave}: ${linea(m)}`);
    }
  }));
  if (flag('--json')) console.log(JSON.stringify(salida, null, 1));
  else if (flag('--todas')) {
    const con = Object.values(salida).filter((m) => !m.error);
    console.log(`${con.length} de ${lista.length} con serie. Avisos:`);
    for (const m of con.filter((m) => m.avisos?.length)) console.log(`  ${m.nombre || m.simbolo}: ${m.avisos.map((a) => `[${a.codigo}] ${a.texto}`).join(' ')}`);
    for (const m of Object.values(salida).filter((m) => m.error)) console.log(`  sin serie: ${m.nombre || m.simbolo} (${m.error})`);
  }
  if (flag('--escribir')) { writeFileSync(RUTA_MOVIMIENTO, JSON.stringify({ fuente: 'Yahoo Finance (cierres diarios)', actualizado: new Date().toISOString(), umbrales: 'P1 +25 % en 1 m o +40 % en 3 m; P2 a ≤ 5 % del máximo de 52 s tras +20 % en 3 m; P3 −20 % en 1 m o −30 % en 3 m; P4 a ≤ 3 % del mínimo de 52 s; P5 ≥ 15 % bajo la media de 200', movimientos: salida }, null, 1)); console.log(`→ ${RUTA_MOVIMIENTO}`); }
}
