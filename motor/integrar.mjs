// Integra las notas de los subagentes (notas/A.json … D.json) y el trabajo del analista
// (notas/propio.json o notas/propio.mjs) en un solo datos.json, con una lista de fuentes única.
//
//   node motor/integrar.mjs --dir informes/<carpeta>
//
// - Cada nota tiene secciones del prompt (financieros, gobierno…), su lista `fuentes` (numerada desde 1)
//   y `huecos`. Sus citas [n] son locales a la nota.
// - propio tiene las secciones que escribe el analista (resumen, dcf, escenarios, valoracion, textos que
//   completan las de las notas…), sus fuentes propias y `huecos`. Sus citas llevan prefijo: [A3] es la
//   fuente 3 de A.json, [P1] la 1 de propio; varias, [A3, D2].
// - Las secciones se combinan en orden A, B, C, D, propio: un valor `null` no borra uno anterior, los
//   objetos se combinan campo a campo y en las listas manda la última no vacía.
// - Las fuentes repetidas (misma URL o, sin URL, mismo título) se funden. `meta.huecos` junta los de todos.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const ORDEN = ['meta', 'identificacion', 'resumen', 'historia', 'negocio', 'sector', 'competencia', 'financieros', 'trimestres', 'balance', 'flujos', 'calidad', 'rentabilidad', 'capital', 'directivos', 'gobierno', 'consenso', 'bolsa', 'multiplos_historicos', 'comparables', 'transacciones', 'dcf', 'escenarios', 'suma_partes', 'valoracion', 'catalizadores', 'riesgos', 'esg', 'preguntas', 'fuentes'];
const BASE = ['A', 'B', 'C', 'D']; // las cuatro de siempre; las extra (E, F…) se leen si existen

const esObjeto = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);
// `choques` (opcional) recoge las listas no vacías que una nota sustituye entera a otra: en Kongsberg y Tomra
// la nota de sector borró los segmentos de la de cuentas sin que nadie lo viera.
function combinar(a, b, ruta = '', choques = null) {
  if (b === null || b === undefined) return a;
  if (esObjeto(a) && esObjeto(b)) {
    const o = { ...a };
    for (const [k, v] of Object.entries(b)) o[k] = combinar(a[k], v, ruta ? `${ruta}.${k}` : k, choques);
    return o;
  }
  if (Array.isArray(b) && b.length === 0 && Array.isArray(a) && a.length) return a;
  if (choques && Array.isArray(a) && a.length && Array.isArray(b) && b.length && JSON.stringify(a) !== JSON.stringify(b)) choques.push(ruta);
  return b;
}

const expandir = (txt) => txt.split(/\s*[,;]\s*/).flatMap((p) => {
  const r = p.split(/\s*[–-]\s*/);
  if (r.length === 2 && /^\d+$/.test(r[0]) && /^\d+$/.test(r[1]) && +r[1] >= +r[0] && +r[1] - +r[0] < 50) return Array.from({ length: +r[1] - +r[0] + 1 }, (_, i) => String(+r[0] + i));
  return [p];
});
function recorrer(v, f) {
  if (typeof v === 'string') return f(v);
  if (Array.isArray(v)) return v.map((x) => recorrer(x, f));
  if (esObjeto(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'fuentes' ? x : recorrer(x, f)]));
  return v;
}

export async function integrar(dir) {
  const notas = join(dir, 'notas');
  // Algunos subagentes guardan con marca BOM (PowerShell): se quita antes de leer.
  const leer = (f) => (existsSync(join(notas, f)) ? JSON.parse(readFileSync(join(notas, f), 'utf8').replace(/^﻿/, '')) : null);
  const LETRAS = [...new Set([...BASE, ...(existsSync(notas) ? readdirSync(notas) : []).map((f) => (f.match(/^([A-OQ-Z])\.json$/) || [])[1]).filter(Boolean)])].sort();
  const N = Object.fromEntries(LETRAS.map((L) => [L, leer(`${L}.json`)]));
  let P = leer('propio.json');
  if (!P && existsSync(join(notas, 'propio.mjs'))) {
    const m = await import(pathToFileURL(resolve(notas, 'propio.mjs')).href + `?t=${Date.now()}`);
    P = m.default ?? m.propio;
  }
  P = P || {};

  // 1. Lista única de fuentes
  const global = [], porClave = new Map(), mapa = {}, avisos = new Set();
  const norm = (u) => String(u || '').trim().replace(/#.*$/, '').replace(/\/$/, '').toLowerCase();
  for (const L of [...LETRAS, 'P']) {
    mapa[L] = {};
    const src = L === 'P' ? P : N[L];
    for (const f of src?.fuentes || []) {
      // Misma URL = mismo documento, salvo que los títulos no se parezcan (páginas genéricas como la portada
      // de inversores, citadas por cosas distintas): entonces van por separado.
      const palabras = (t) => new Set(String(t || '').toLowerCase().split(/\W+/).filter((x) => x.length > 3));
      const parecidos = (a, b) => { const A = palabras(a), B = palabras(b); if (!A.size || !B.size) return true; let c = 0; for (const x of A) if (B.has(x)) c++; return c / Math.min(A.size, B.size) >= 0.5; };
      let clave = norm(f.url) ? 'u|' + norm(f.url) : 't|' + String(f.titulo || '').toLowerCase();
      // Solo se separan las URL genéricas (portada de inversores, raíz de un dominio); un documento
      // concreto (10-K, PDF, nota) es el mismo aunque dos subagentes lo titulen distinto.
      const generica = (() => { try { const u = new URL(f.url); return u.pathname.split('/').filter(Boolean).length <= 1 && !/\.(pdf|html?|xml|xlsx?|json)$/i.test(u.pathname) && !u.search; } catch { return false; } })();
      if (generica && porClave.has(clave) && !parecidos(porClave.get(clave).titulo, f.titulo)) { clave += '|' + String(f.titulo || '').toLowerCase(); avisos.add(`Misma URL con títulos distintos (se dejan separadas): ${f.url}`); }
      let g = porClave.get(clave);
      if (!g) { g = { id: global.length + 1, titulo: f.titulo ?? null, editor: f.editor ?? null, tipo: f.tipo ?? null, fecha: f.fecha ?? null, url: f.url ?? null }; global.push(g); porClave.set(clave, g); }
      mapa[L][String(f.id)] = g.id;
    }
  }

  // 2. Citas a numeración global
  const sinMapa = new Set();
  const unir = (ids) => { const u = [...new Set(ids.filter(Boolean))].sort((a, b) => a - b); return u.length ? `[${u.join(', ')}]` : ''; };
  const locales = (L) => (s) => s.replace(/\[(\d+(?:\s*[,;–-]\s*\d+)*)\]/g, (_, g) => unir(expandir(g).map((x) => mapa[L][x] ?? (sinMapa.add(`${L}${x}`), null))));
  const prefijo = (s) => s.replace(/\[([A-Z]\d+(?:\s*[,;–-]\s*[A-Z]?\d+)*)\]/g, (_, g) => {
    let letra = null;
    return unir(g.split(/\s*[,;]\s*/).flatMap((p) => {
      const r = p.split(/\s*[–-]\s*/);
      const ids = r.length === 2 ? (() => { const L = r[0][0], i = +r[0].slice(1), j = +r[1].replace(/^[A-Z]/, ''); return Array.from({ length: Math.max(0, j - i + 1) }, (_, k) => L + (i + k)); })() : [p];
      return ids.map((x) => { if (/^[A-Z]/.test(x)) letra = x[0]; else x = letra + x; return mapa[x[0]]?.[x.slice(1)] ?? (sinMapa.add(x), null); });
    }));
  });

  // 3. Combinación de secciones
  let datos = {};
  const huecos = [];
  for (const L of LETRAS) {
    if (!N[L]) continue;
    const nota = recorrer(N[L], locales(L));
    huecos.push(...(nota.huecos || []), ...(nota.meta?.huecos || []));
    const choques = [];
    for (const k of ORDEN) if (k !== 'fuentes' && nota[k] !== undefined) datos[k] = combinar(datos[k], nota[k], k, choques);
    for (const r of choques) avisos.add(`La nota ${L} sustituye entera la lista «${r}» que traía otra nota: fusiónalas en propio si las dos tenían datos.`);
  }
  const propio = recorrer(P, prefijo);
  const huecosPropios = [...(propio.huecos || []), ...(propio.meta?.huecos || [])].map((h) => ({ ...h, _propio: true }));
  huecos.push(...huecosPropios);
  for (const k of ORDEN) if (k !== 'fuentes' && propio[k] !== undefined) datos[k] = combinar(datos[k], propio[k]);
  // Parches puntuales desde propio: [{ "ruta": "trimestres.items[3].vs_consenso", "valor": "Superior" }]
  for (const p of propio._parches || []) {
    const partes = String(p.ruta).match(/[^.[\]]+/g) || [];
    let o = datos;
    for (let i = 0; i < partes.length - 1; i++) { const k = /^\d+$/.test(partes[i]) ? +partes[i] : partes[i]; if (o[k] === undefined || o[k] === null) o[k] = /^\d+$/.test(partes[i + 1]) ? [] : {}; o = o[k]; }
    o[/^\d+$/.test(partes.at(-1)) ? +partes.at(-1) : partes.at(-1)] = p.valor;
  }
  // Huecos que ya no lo son: los que propio declara resueltos y los de un campo que acabó con valor.
  const obtener = (o, ruta) => (String(ruta).match(/[^.[\]]+/g) || []).reduce((x, k) => (x === null || x === undefined ? x : x[k]), o);
  const lleno = (v) => v !== null && v !== undefined && v !== '' && !(Array.isArray(v) && !v.length);
  const resueltos = (propio.huecos_resueltos || []).map((h) => `${h.seccion}|${h.campo}`.toLowerCase());
  const huecosVivos = huecos.filter((h) => {
    if (!h._propio && resueltos.includes(`${h.seccion}|${h.campo}`.toLowerCase())) return false;
    if (/^[\w.[\]]+$/.test(h.campo || '') && datos[h.seccion] && lleno(obtener(datos[h.seccion], h.campo))) { avisos.add(`Hueco retirado porque el campo tiene valor: ${h.seccion}.${h.campo}`); return false; }
    return true;
  });
  datos.meta = { ...(datos.meta || {}), huecos: huecosVivos.map(({ _propio, ...h }) => h) };
  // Notas de trabajo: `notas_integrador` no pasa a datos.json, y se avisa si alguna se coló en un texto.
  const limpiar = (o) => { if (Array.isArray(o)) o.forEach(limpiar); else if (esObjeto(o)) { delete o.notas_integrador; Object.values(o).forEach(limpiar); } };
  limpiar(datos);
  const revisarTextos = (o, ruta) => {
    if (typeof o === 'string') { if (/\b(el|al|del) integrador\b|\bpendiente de (decidir|revisar)\b|\bsubagentes?\b|\bborrador\b/i.test(o) || /\b(TODO|FIXME|TBD)\b|`|\bcalc\.[a-z]/.test(o)) avisos.add(`Nota de trabajo en un campo que se imprime: ${ruta}: «${o.slice(0, 80)}…»`); }
    else if (Array.isArray(o)) o.forEach((x, i) => revisarTextos(x, `${ruta}[${i}]`));
    else if (esObjeto(o)) for (const [k, v] of Object.entries(o)) if (k !== 'fuentes') revisarTextos(v, ruta ? `${ruta}.${k}` : k);
  };
  revisarTextos(datos, '');
  // Claves que no están en el esquema (el ejemplo): se pierden en la plantilla sin aviso.
  try {
    const ej = JSON.parse(readFileSync(new URL('../verticales/empresa/ejemplo.json', import.meta.url), 'utf8'));
    const rutas = new Set();
    const anotar = (o, r) => { if (Array.isArray(o)) o.forEach((x) => anotar(x, r + '[]')); else if (esObjeto(o)) for (const [k, v] of Object.entries(o)) { rutas.add(r + '.' + k); anotar(v, r + '.' + k); } };
    anotar(ej, '');
    const ajenas = new Set();
    const mirar = (o, r) => { if (Array.isArray(o)) o.forEach((x) => mirar(x, r + '[]')); else if (esObjeto(o)) for (const [k, v] of Object.entries(o)) { const rk = r + '.' + k; if (!rutas.has(rk) && !/^\.(meta|fuentes|calc)/.test(rk)) ajenas.add(rk.slice(1)); else mirar(v, rk); } };
    mirar(datos, '');
    if (ajenas.size) avisos.add(`Claves fuera del esquema (no se imprimen): ${[...ajenas].slice(0, 15).join(', ')}${ajenas.size > 15 ? '…' : ''}`);
  } catch { /* sin ejemplo, sin comprobación */ }
  datos.fuentes = global;
  const salida = Object.fromEntries(ORDEN.map((k) => [k, datos[k] === undefined ? null : datos[k]]));
  const vacias = ORDEN.filter((k) => salida[k] === null);
  const faltan = BASE.filter((L) => !N[L]);
  writeFileSync(join(dir, 'datos.json'), JSON.stringify(salida, null, 2));
  return { fuentes: global.length, sinMapa: [...sinMapa], vacias, faltan, huecos: datos.meta.huecos.length, avisos: [...avisos] };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const i = process.argv.indexOf('--dir');
  if (i < 0) { console.error('Uso: node motor/integrar.mjs --dir informes/<carpeta>'); process.exit(1); }
  const r = await integrar(process.argv[i + 1]);
  console.log(`datos.json escrito: ${r.fuentes} fuentes, ${r.huecos} huecos.`);
  if (r.faltan.length) console.log(`Notas que faltan: ${r.faltan.join(', ')} (complétalas o escribe esas secciones en propio).`);
  if (r.vacias.length) console.log(`Secciones sin datos: ${r.vacias.join(', ')}`);
  for (const x of r.avisos) console.log(x);
  console.log(r.sinMapa.length ? `Citas sin fuente: ${r.sinMapa.join(', ')}` : 'Todas las citas tienen fuente.');
}
