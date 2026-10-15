// Lector mínimo de .xlsx (sin dependencias): devuelve las filas de la primera hoja (o de la que se pida) como listas de
// textos y números. Para las listas de componentes de índices que publican las gestoras en Excel.
//
//   import { leerXlsx } from './xlsx-leer.mjs';  const filas = leerXlsx(buffer, { hoja: 1 });
import { inflateRawSync } from 'node:zlib';

function entradas(b) {
  const fin = b.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
  if (fin < 0) throw new Error('No es un .xlsx (zip) válido');
  const n = b.readUInt16LE(fin + 10);
  let p = b.readUInt32LE(fin + 16);
  const out = new Map();
  for (let i = 0; i < n; i++) {
    const metodo = b.readUInt16LE(p + 10), comp = b.readUInt32LE(p + 20), ln = b.readUInt16LE(p + 28), le = b.readUInt16LE(p + 30), lc = b.readUInt16LE(p + 32), off = b.readUInt32LE(p + 42);
    const nombre = b.toString('utf8', p + 46, p + 46 + ln);
    const l = b.readUInt16LE(off + 26), e = b.readUInt16LE(off + 28), ini = off + 30 + l + e, raw = b.subarray(ini, ini + comp);
    // Sin prefijos de espacio de nombres (<x:row>, <x:c>…), que usan algunas gestoras.
    out.set(nombre, () => (metodo === 8 ? inflateRawSync(raw) : raw).toString('utf8').replace(/<(\/?)[a-z]+:(?=[a-zA-Z])/g, '<$1'));
    p += 46 + ln + le + lc;
  }
  return out;
}
const desc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&');
const col = (ref) => { let c = 0; for (const ch of ref.replace(/\d+/g, '')) c = c * 26 + ch.charCodeAt(0) - 64; return c - 1; };

export function leerXlsx(buffer, { hoja = 1 } = {}) {
  const z = entradas(Buffer.from(buffer));
  const ss = z.get('xl/sharedStrings.xml') ? [...z.get('xl/sharedStrings.xml')().matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => desc([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join(''))) : [];
  // Algunas gestoras nombran las hojas de otra forma (sheet.xml, Sheet1.xml…): si no está sheetN.xml, la N-ésima que haya.
  const hojas = [...z.keys()].filter((k) => /^xl\/worksheets\/[^/]+\.xml$/i.test(k)).sort();
  const ruta = z.get(`xl/worksheets/sheet${hoja}.xml`) ? `xl/worksheets/sheet${hoja}.xml` : hojas[hoja - 1];
  if (!ruta) throw new Error(`El .xlsx no tiene la hoja ${hoja}`);
  const filas = [];
  for (const [, cuerpo] of z.get(ruta)().matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const fila = [];
    for (const m of cuerpo.matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const at = m[1], ref = at.match(/r="([A-Z]+\d+)"/)?.[1], t = at.match(/t="(\w+)"/)?.[1], dentro = m[2] || '';
      const v = dentro.match(/<v>([\s\S]*?)<\/v>/)?.[1];
      let valor = null;
      if (t === 's') valor = ss[+v] ?? null;
      else if (t === 'inlineStr') valor = desc([...dentro.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join(''));
      else if (t === 'str') valor = v !== undefined ? desc(v) : null;
      else if (v !== undefined) valor = Number.isFinite(+v) ? +v : desc(v);
      fila[ref ? col(ref) : fila.length] = valor;
    }
    filas.push(Array.from(fila, (x) => x ?? null));
  }
  return filas;
}
