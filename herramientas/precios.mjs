// Un precio, una fecha, para todas (P4 de las mejoras del 14-oct-2026): el último cierre de todas las empresas
// analizadas (y de lo que hay en cartera sin informe, como el oro) en un solo archivo, con los históricos diarios
// gratuitos de Yahoo Finance. Sin dependencias.
//
//   node herramientas/precios.mjs                 → actualiza verticales/empresa/precios.json (todas las del mapa)
//   node herramientas/precios.mjs BVI MC ADBE     → solo esas (clave del mapa o carpeta de informes/)
//   node herramientas/precios.mjs --construir     → (re)construye el mapa de símbolos verticales/empresa/simbolos.json
//                                                   desde informes/ (bolsa.json si existe; si no, ticker + mercado) y
//                                                   comprueba cada símbolo contra Yahoo (divisa y precio del informe)
//   node herramientas/precios.mjs --comprobar     → compara el último cierre con el precio de cada informe y avisa
//
// Después: node herramientas/apuntar-12m.mjs --precios [--todos | <carpeta> …]  (recalcula la rentabilidad a 12 meses
// al mismo cierre) y node herramientas/seguimiento.mjs.
//
// El precio queda en la divisa de cotización (la del broker: GBp = peniques); apuntar-12m lo pasa a la divisa de
// las cuentas con `meta.tipo_cambio` del informe. Si la sesión está en curso, el «cierre» es el de la sesión
// anterior y el precio en curso se guarda aparte (`en_curso`), para no mezclar cierres con precios a medias.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const raiz = fileURLToPath(new URL('..', import.meta.url));
const RUTA_MAPA = `${raiz}verticales/empresa/simbolos.json`;
const RUTA_PRECIOS = `${raiz}verticales/empresa/precios.json`;
const UA = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' };
const espera = (ms) => new Promise((r) => setTimeout(r, ms));
const r2 = (x, d = 4) => (x === null || x === undefined || !Number.isFinite(x) ? null : Math.round(x * 10 ** d) / 10 ** d);
const n = (v) => (v === null || v === undefined || v === '' || Number.isNaN(+v) ? null : +v);

// ---------- Yahoo ----------
export async function ultimoCierre(simbolo, intentos = 4) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(simbolo)}?range=10d&interval=1d`;
  let j = null;
  for (let i = 0; ; i++) {
    try {
      const r = await fetch(url, { headers: UA, signal: AbortSignal.timeout(30000) });
      if (r.status === 404) return { simbolo, error: 'símbolo desconocido en Yahoo' };
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      j = await r.json(); break;
    } catch (e) { if (i >= intentos) return { simbolo, error: e.message }; await espera(1500 * (i + 1)); }
  }
  const x = j.chart?.result?.[0];
  if (!x?.timestamp?.length) return { simbolo, error: j.chart?.error?.description || 'sin datos' };
  const q = x.indicators.quote[0], m = x.meta;
  const fecha = (t) => new Date((t + (m.gmtoffset || 0)) * 1000).toISOString().slice(0, 10);
  const tp = m.currentTradingPeriod?.regular;
  const enCurso = tp && Date.now() / 1000 >= tp.start && Date.now() / 1000 < tp.end ? fecha(tp.start) : null;
  const filas = x.timestamp.map((t, i) => ({ fecha: fecha(t), cierre: q.close[i] })).filter((f) => f.cierre != null);
  // Yahoo a veces deja la vela del día en blanco (Europa, 23-oct-2026) aunque `meta` traiga el último precio: se usa ese.
  if (m.regularMarketPrice != null && m.regularMarketTime) {
    const fm = fecha(m.regularMarketTime);
    if (!filas.length || fm > filas.at(-1).fecha) filas.push({ fecha: fm, cierre: m.regularMarketPrice });
  }
  const cerradas = filas.filter((f) => f.fecha !== enCurso);
  const ult = cerradas.at(-1);
  if (!ult) return { simbolo, error: 'sin cierres' };
  const curso = enCurso ? filas.find((f) => f.fecha === enCurso) : null;
  return {
    simbolo, nombre: m.longName || m.shortName || null, divisa: m.currency, bolsa: m.exchangeName || m.fullExchangeName || null,
    precio: r2(ult.cierre), fecha: ult.fecha, anterior: cerradas.at(-2) ? { precio: r2(cerradas.at(-2).cierre), fecha: cerradas.at(-2).fecha } : null,
    en_curso: curso ? { precio: r2(curso.cierre), fecha: curso.fecha } : null,
  };
}

// ---------- Mapa de símbolos ----------
// Sufijo de Yahoo según el mercado del informe (texto libre de `identificacion.mercado`), si el ticker no lo trae.
const SUFIJOS = [
  [/madrid|bme|bolsas españolas|bolsas de madrid|mercado continuo|sibe/i, '.MC'], [/par[ií]s/i, '.PA'], [/xetra|fr[áa]ncfort|frankfurt/i, '.DE'],
  [/[áa]msterdam/i, '.AS'], [/london|londres|lse/i, '.L'], [/stockholm|estocolmo/i, '.ST'], [/copenhag/i, '.CO'], [/six|swiss|suiza/i, '.SW'],
  [/tokio|tokyo|tse/i, '.T'], [/oslo/i, '.OL'], [/helsinki/i, '.HE'], [/mil[aá]n|borsa italiana/i, '.MI'], [/asx|australian/i, '.AX'],
  [/toronto|tsx/i, '.TO'], [/bruselas|brussels/i, '.BR'], [/lisboa|lisbon/i, '.LS'], [/viena|vienna/i, '.VI'], [/z[úu]rich/i, '.SW'], [/hong kong|hkex/i, '.HK'], [/taiw[áa]n|twse/i, '.TW'], [/nyse|nasdaq(?!\s+(?:stockholm|estocolmo|copenhag|helsinki|iceland|islandia|first north|nordic|b[aá]ltic))|new york|nueva york/i, ''], // «Nasdaq Stockholm/Copenhagen» no son EE. UU.
];
const limpiarTicker = (t) => {
  let s = String(t || '').trim();
  s = s.replace(/\(.*?\)/g, ' ').split(/[;,]/)[0].trim(); // «RTO (LSE); RTO (NYSE…)», «ROP (antes ROG)»
  const partes = s.split(/\s+/);
  if (partes.length === 2 && /^[A-Z]$/.test(partes[1])) return `${partes[0]}-${partes[1]}`; // «ASSA B» → ASSA-B
  return partes[0];
};
export function simboloDe(id = {}) {
  const t = limpiarTicker(id.ticker);
  if (!t) return null;
  if (t.includes('.')) return t;
  const m = String(id.mercado || '');
  // Manda la bolsa que se nombra primero («London Stock Exchange (también Euronext Ámsterdam)» → .L).
  const hallados = SUFIJOS.map(([re, suf]) => ({ i: m.search(re), suf })).filter((h) => h.i >= 0).sort((a, b) => a.i - b.i);
  return hallados.length ? `${t}${hallados[0].suf}` : t;
}
// El último datos por NÚMERO de versión (datos-v3 antes que datos.json; con orden alfabético el «-» iba antes que el «.» y
// se leía el informe más viejo: fallo visto por el hilo de robustez el 14-oct-2026).
const ultimoDatos = (dir) => {
  const fs = readdirSync(dir).filter((f) => /^datos(-v\d+)?\.json$/.test(f)).sort((a, b) => (+(a.match(/v(\d+)/)?.[1] ?? 1)) - (+(b.match(/v(\d+)/)?.[1] ?? 1)));
  return fs.length ? JSON.parse(readFileSync(`${dir}/${fs.at(-1)}`, 'utf8')) : null;
};
const carpetas = () => readdirSync(`${raiz}informes`, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
const clave = (d) => String(d.identificacion?.ticker || '').trim().toUpperCase().replace(/\s+/g, '-'); // la misma clave que objetivo12m-revisados.json

export function leerMapa() { return existsSync(RUTA_MAPA) ? JSON.parse(readFileSync(RUTA_MAPA, 'utf8')) : { empresas: {}, extra: {} }; }
export function leerPrecios() { return existsSync(RUTA_PRECIOS) ? JSON.parse(readFileSync(RUTA_PRECIOS, 'utf8')) : null; }

// Divisa de cotización del informe (peniques si el informe lo dice) y precio del informe pasado a esa divisa.
const cotizacion = (d) => {
  const div = d.meta?.divisa_cotizacion || d.meta?.divisa, tc = n(d.meta?.tipo_cambio) || 1, p = n(d.identificacion?.precio);
  return { divisa: div, precio: p === null ? null : p / tc, fecha: d.identificacion?.fecha_precio || null, tipo_cambio: tc };
};
// Yahoo cotiza Londres en peniques (GBp); si el informe trabaja en libras, se divide por 100 (y al revés).
export const factorDivisa = (deYahoo, delInforme) => {
  const a = String(deYahoo || ''), b = String(delInforme || '');
  if (a === b || !a || !b) return 1;
  if (a === 'GBp' && b.toUpperCase() === 'GBP' && b !== 'GBp') return 0.01;
  if (a === 'GBP' && b === 'GBp') return 100;
  if (a.toUpperCase() === b.toUpperCase()) return 1;
  return null; // divisas distintas: símbolo equivocado
};

async function construir(comprobar = true) {
  const mapa = leerMapa();
  mapa.empresas ??= {}; mapa.extra ??= {};
  const vistos = new Map();
  for (const c of carpetas()) {
    const d = ultimoDatos(`${raiz}informes/${c}`);
    if (!d?.identificacion?.ticker) continue;
    const k = clave(d);
    // La carpeta más reciente de cada empresa manda (pepsico-10-08 y 10-09, uber-10-08 y 10-10).
    vistos.set(k, { carpeta: c, d });
  }
  for (const [k, { carpeta, d }] of vistos) {
    const previo = mapa.empresas[k];
    let simbolo = previo?.yahoo || null;
    if (!simbolo) {
      const b = `${raiz}informes/${carpeta}/notas/bolsa.json`;
      if (existsSync(b)) { try { simbolo = JSON.parse(readFileSync(b, 'utf8')).fuente?.match(/\(([^),]+)/)?.[1]?.trim() || null; } catch { /* nada */ } }
    }
    if (!simbolo) simbolo = simboloDe(d.identificacion);
    mapa.empresas[k] = { ...(previo || {}), yahoo: simbolo, carpeta, nombre: d.identificacion.nombre_corto || d.identificacion.nombre, divisa_cotizacion: d.meta?.divisa_cotizacion || d.meta?.divisa };
  }
  if (!Object.keys(mapa.extra).length) mapa.extra = { IGLN: { yahoo: 'IGLN.L', nombre: 'iShares Physical Gold (cartera)', divisa_cotizacion: 'USD' } };
  if (comprobar) {
    for (const [k, e] of Object.entries(mapa.empresas)) {
      const d = ultimoDatos(`${raiz}informes/${e.carpeta}`), cot = cotizacion(d);
      const y = await ultimoCierre(e.yahoo);
      if (y.error) { e.comprobado = `ERROR: ${y.error}`; console.error(`${k} (${e.yahoo}): ${y.error}`); continue; }
      const f = factorDivisa(y.divisa, cot.divisa);
      const dif = f !== null && cot.precio ? (y.precio * f) / cot.precio - 1 : null;
      e.comprobado = f === null ? `DIVISA: Yahoo ${y.divisa}, informe ${cot.divisa}` : dif !== null && Math.abs(dif) > 0.35 ? `PRECIO: Yahoo ${y.precio} ${y.divisa} (${y.fecha}) frente a ${r2(cot.precio, 2)} ${cot.divisa} del informe (${cot.fecha}): ${r2(dif * 100, 0)} %` : `ok ${y.fecha}`;
      e.yahoo_nombre = y.nombre;
      if (!e.comprobado.startsWith('ok')) console.error(`${k} (${e.yahoo}): ${e.comprobado}`);
      await espera(250);
    }
  }
  mapa.actualizado = new Date().toISOString().slice(0, 10);
  mapa.nota = 'Clave = ticker del informe (la misma de objetivo12m-revisados.json). `yahoo` se puede corregir a mano; `--construir` respeta lo escrito. `extra`: lo que está en cartera sin informe.';
  writeFileSync(RUTA_MAPA, JSON.stringify(mapa, null, 2) + '\n');
  const malos = Object.entries(mapa.empresas).filter(([, e]) => e.comprobado && !e.comprobado.startsWith('ok'));
  console.log(`Mapa: ${Object.keys(mapa.empresas).length} empresas + ${Object.keys(mapa.extra).length} extra → ${RUTA_MAPA}${comprobar ? ` (${malos.length} por revisar)` : ''}`);
}

async function actualizar(pedidas = [], comprobar = false) {
  const mapa = leerMapa();
  if (!Object.keys(mapa.empresas || {}).length) throw new Error('No hay mapa de símbolos: node herramientas/precios.mjs --construir');
  const todas = { ...mapa.empresas, ...mapa.extra };
  const porCarpeta = Object.fromEntries(Object.entries(mapa.empresas).map(([k, e]) => [e.carpeta, k]));
  const claves = pedidas.length ? pedidas.map((p) => (todas[p.toUpperCase()] ? p.toUpperCase() : porCarpeta[p] || porCarpeta[p.replace(/\/$/, '').replace(/^informes\//, '')] || null)) : Object.keys(todas);
  const faltan = pedidas.filter((p, i) => !claves[i]);
  if (faltan.length) throw new Error(`No están en el mapa: ${faltan.join(', ')} (clave o carpeta; --construir las añade)`);
  const previo = leerPrecios() || { precios: {} };
  const salida = { fuente: 'Yahoo Finance, último cierre diario', actualizado: new Date().toISOString().replace(/\.\d+Z$/, 'Z'), precios: previo.precios || {} };
  let errores = 0, avisos = 0;
  for (const k of claves) {
    const e = todas[k];
    const y = await ultimoCierre(e.yahoo);
    if (y.error) { errores++; console.error(`${k} (${e.yahoo}): ${y.error}`); salida.precios[k] = { ...(salida.precios[k] || {}), simbolo: e.yahoo, error: y.error }; continue; }
    const fila = { simbolo: e.yahoo, nombre: e.nombre, carpeta: e.carpeta || null, precio: y.precio, fecha: y.fecha, divisa: y.divisa, anterior: y.anterior, en_curso: y.en_curso };
    if (comprobar && e.carpeta) {
      const d = ultimoDatos(`${raiz}informes/${e.carpeta}`), cot = cotizacion(d), f = factorDivisa(y.divisa, cot.divisa);
      fila.informe = { precio: r2(cot.precio, 4), divisa: cot.divisa, fecha: cot.fecha, variacion_pct: f !== null && cot.precio ? r2(((y.precio * f) / cot.precio - 1) * 100, 1) : null };
      if (f === null) { avisos++; console.error(`${k}: divisa de Yahoo ${y.divisa} ≠ informe ${cot.divisa}`); }
      else if (fila.informe.variacion_pct !== null && Math.abs(fila.informe.variacion_pct) > 35) { avisos++; console.error(`${k}: ${fila.informe.variacion_pct} % frente al precio del informe (${cot.fecha}): ¿símbolo, split o divisa?`); }
    }
    // Yahoo a veces devuelve una serie atrasada (Hong Kong, 20-oct-2026): nunca se cambia un cierre por otro más viejo.
    const ant = salida.precios[k];
    if (ant?.fecha && fila.fecha < ant.fecha && !ant.error) { avisos++; console.error(`${k}: Yahoo da el cierre del ${fila.fecha}, más viejo que el guardado (${ant.fecha}); se queda el guardado`); continue; }
    salida.precios[k] = fila;
    console.log(`${k.padEnd(10)} ${String(fila.precio).padStart(10)} ${fila.divisa.padEnd(4)} ${fila.fecha}${fila.en_curso ? ` (sesión en curso: ${fila.en_curso.precio})` : ''}${fila.informe?.variacion_pct !== undefined && fila.informe?.variacion_pct !== null ? `  informe ${fila.informe.fecha}: ${fila.informe.variacion_pct > 0 ? '+' : ''}${fila.informe.variacion_pct} %` : ''}`);
    await espera(200);
  }
  writeFileSync(RUTA_PRECIOS, JSON.stringify(salida, null, 2) + '\n');
  const fechas = [...new Set(Object.values(salida.precios).filter((p) => p.fecha).map((p) => p.fecha))].sort();
  console.log(`${Object.keys(salida.precios).length} precios → ${RUTA_PRECIOS}; cierres del ${fechas[0]} al ${fechas.at(-1)}${errores ? `; ${errores} errores` : ''}${avisos ? `; ${avisos} avisos` : ''}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2);
  if (args.includes('--construir')) await construir(!args.includes('--sin-comprobar'));
  else await actualizar(args.filter((a) => !a.startsWith('--')), args.includes('--comprobar'));
}
