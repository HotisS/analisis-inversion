// Construye informes/on-2026-10-06/datos.json a partir de las notas de los subagentes (A-D)
// y de propio.mjs (supuestos, textos y resumen). Renumera las fuentes en una sola lista sin
// duplicados (por URL) y traduce las citas:
//   - en A.json, B.json, C.json, D.json: [n] locales → número global;
//   - en propio.mjs: [A3], [B5, D2], [P1] (P = fuentes propias de propio.mjs) → número global.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const DIR = new URL('./', import.meta.url);
const SALIDA = new URL('../datos.json', import.meta.url);
const leer = (f) => (existsSync(new URL(f, DIR)) ? JSON.parse(readFileSync(new URL(f, DIR), 'utf8')) : null);
const notas = { A: leer('A.json'), B: leer('B.json'), C: leer('C.json'), D: leer('D.json') };
const P = (await import('./propio.mjs')).propio;
notas.P = { fuentes: P.fuentes || [] };

// 1. Lista global de fuentes
const global = [];
const porClave = new Map();
const mapa = {}; // mapa[letra][idLocal] = idGlobal
const norm = (u) => String(u || '').trim().replace(/[#?].*$/, '').replace(/\/$/, '').toLowerCase();
for (const L of ['A', 'B', 'C', 'D', 'P']) {
  mapa[L] = {};
  for (const f of notas[L]?.fuentes || []) {
    const clave = norm(f.url) && !/^https?:\/\/(www\.)?sec\.gov\/?$/.test(norm(f.url)) ? norm(f.url) + '|' + (f.titulo || '').slice(0, 0) : 't|' + f.titulo;
    let g = porClave.get(clave);
    if (!g) {
      g = { id: global.length + 1, titulo: f.titulo, editor: f.editor, tipo: f.tipo, fecha: f.fecha, url: f.url };
      global.push(g); porClave.set(clave, g);
    }
    mapa[L][String(f.id)] = g.id;
  }
}

// 2. Traducción de citas
const expandir = (txt) => txt.split(/\s*[,;]\s*/).flatMap((p) => {
  const r = p.split(/\s*[–-]\s*/);
  if (r.length === 2 && /^\d+$/.test(r[0]) && /^\d+$/.test(r[1])) { const o = []; for (let i = +r[0]; i <= +r[1]; i++) o.push(String(i)); return o; }
  return [p];
});
const sinMapa = new Set();
function citasLocales(v, L) {
  if (typeof v === 'string') return v.replace(/\[(\d+(?:\s*[,;–-]\s*\d+)*)\]/g, (m, g) => {
    const ids = [...new Set(expandir(g).map((x) => { const r = mapa[L][x]; if (!r) sinMapa.add(`${L}${x}`); return r; }).filter(Boolean))].sort((a, b) => a - b);
    return ids.length ? `[${ids.join(', ')}]` : '';
  });
  if (Array.isArray(v)) return v.map((x) => citasLocales(x, L));
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'fuentes' ? x : citasLocales(x, L)]));
  return v;
}
function citasPrefijo(v) {
  if (typeof v === 'string') return v.replace(/\[((?:[ABCDP]\d+)(?:\s*,\s*[ABCDP]\d+)*)\]/g, (m, g) => {
    const ids = [...new Set(g.split(/\s*,\s*/).map((x) => { const r = mapa[x[0]][x.slice(1)]; if (!r) sinMapa.add(x); return r; }).filter(Boolean))].sort((a, b) => a - b);
    return ids.length ? `[${ids.join(', ')}]` : '';
  });
  if (Array.isArray(v)) return v.map(citasPrefijo);
  if (v && typeof v === 'object') return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, k === 'fuentes' ? x : citasPrefijo(x)]));
  return v;
}

// 3. Secciones de cada nota (con citas ya globales)
const N = {};
for (const L of ['A', 'B', 'C', 'D']) N[L] = notas[L] ? citasLocales(notas[L], L) : {};

// 4. Ensamblado: propio.mjs decide qué toma de cada nota (función que recibe N)
const datos = citasPrefijo(P.ensamblar(N));
datos.fuentes = global;
const ORDEN = ['meta', 'identificacion', 'resumen', 'historia', 'negocio', 'sector', 'competencia', 'financieros', 'trimestres', 'balance', 'flujos', 'calidad', 'rentabilidad', 'capital', 'directivos', 'gobierno', 'consenso', 'bolsa', 'multiplos_historicos', 'comparables', 'transacciones', 'dcf', 'escenarios', 'suma_partes', 'valoracion', 'catalizadores', 'riesgos', 'esg', 'preguntas', 'fuentes'];
const out = Object.fromEntries(ORDEN.map((k) => [k, datos[k] === undefined ? null : datos[k]]));
const extra = Object.keys(datos).filter((k) => !ORDEN.includes(k) && k !== 'calc');
if (extra.length) console.warn('Claves sobrantes (no se escriben):', extra.join(', '));
// conservar calc anterior si existe (el motor lo reescribe)
writeFileSync(SALIDA, JSON.stringify(out, null, 2));
console.log(`datos.json: ${global.length} fuentes; citas sin mapa: ${[...sinMapa].join(', ') || 'ninguna'}`);
