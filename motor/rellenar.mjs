#!/usr/bin/env node
// rellenar.mjs — rellena una plantilla .docx con un datos.json y dibuja los gráficos.
//
// Sin dependencias: solo Node (>= 18). Funciona igual en local que en el entorno
// de ejecución de Claude.
//
//   node rellenar.mjs --plantilla plantilla.docx --datos datos.json --salida informe.docx
//                     [--graficos graficos.json]
//
// Los gráficos son gráficos nativos de Word (editables, con su hoja de Excel
// incrustada). Su definición viaja dentro de la propia plantilla (variable de
// documento «graficos»); --graficos la sustituye por un archivo externo.
//
// Sintaxis de la plantilla:
//   {{ruta.al.campo}}          valor (admite filtros: {{x|pct}}, {{x|1}}, {{x|x}}, {{x|fecha}})
//   {{texto:ruta}}             párrafo propio → uno o varios párrafos (\n\n separa; **negrita**)
//   {{lista:ruta}}             párrafo con viñeta propio → una viñeta por elemento
//   {{grafico:id}}             párrafo propio → gráfico nativo definido en «graficos»
//   {{ruta[].campo}}           en una fila de tabla → la fila se repite por cada elemento
//   {{#}}                      en una fila repetida → número de fila (1, 2, 3…)

import { readFileSync, writeFileSync } from 'node:fs';
import { inflateRawSync, deflateRawSync } from 'node:zlib';
import { pathToFileURL } from 'node:url';

// ───────────────────────────── ZIP ─────────────────────────────

const TABLA_CRC = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = TABLA_CRC[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

export function leerZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) {
    if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error('El archivo no es un .docx (ZIP) válido');
  const total = buf.readUInt16LE(eocd + 10);
  let p = buf.readUInt32LE(eocd + 16);
  const entradas = new Map();
  for (let k = 0; k < total; k++) {
    if (buf.readUInt32LE(p) !== 0x02014b50) throw new Error('Directorio central del ZIP corrupto');
    const metodo = buf.readUInt16LE(p + 10);
    const tamComprimido = buf.readUInt32LE(p + 20);
    const lNombre = buf.readUInt16LE(p + 28), lExtra = buf.readUInt16LE(p + 30), lComent = buf.readUInt16LE(p + 32);
    const offLocal = buf.readUInt32LE(p + 42);
    const nombre = buf.toString('utf8', p + 46, p + 46 + lNombre);
    p += 46 + lNombre + lExtra + lComent;
    if (nombre.endsWith('/')) continue;
    const inicio = offLocal + 30 + buf.readUInt16LE(offLocal + 26) + buf.readUInt16LE(offLocal + 28);
    const datos = buf.subarray(inicio, inicio + tamComprimido);
    if (metodo === 0) entradas.set(nombre, Buffer.from(datos));
    else if (metodo === 8) entradas.set(nombre, inflateRawSync(datos));
    else throw new Error(`Compresión ZIP no soportada (${metodo}) en ${nombre}`);
  }
  return entradas;
}

export function escribirZip(entradas) {
  const nombres = [...entradas.keys()].sort((a, b) =>
    a === '[Content_Types].xml' ? -1 : b === '[Content_Types].xml' ? 1 : 0);
  const trozos = [], central = [];
  let offset = 0;
  for (const nombre of nombres) {
    let datos = entradas.get(nombre);
    if (typeof datos === 'string') datos = Buffer.from(datos, 'utf8');
    const comp = deflateRawSync(datos);
    const crc = crc32(datos);
    const bNombre = Buffer.from(nombre, 'utf8');
    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0); local.writeUInt16LE(20, 4); local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(8, 8); local.writeUInt16LE(0, 10); local.writeUInt16LE(0x21, 12);
    local.writeUInt32LE(crc, 14); local.writeUInt32LE(comp.length, 18); local.writeUInt32LE(datos.length, 22);
    local.writeUInt16LE(bNombre.length, 26); local.writeUInt16LE(0, 28);
    trozos.push(local, bNombre, comp);
    const cen = Buffer.alloc(46);
    cen.writeUInt32LE(0x02014b50, 0); cen.writeUInt16LE(20, 4); cen.writeUInt16LE(20, 6); cen.writeUInt16LE(0x0800, 8);
    cen.writeUInt16LE(8, 10); cen.writeUInt16LE(0, 12); cen.writeUInt16LE(0x21, 14);
    cen.writeUInt32LE(crc, 16); cen.writeUInt32LE(comp.length, 20); cen.writeUInt32LE(datos.length, 24);
    cen.writeUInt16LE(bNombre.length, 28); cen.writeUInt32LE(offset, 42);
    central.push(cen, bNombre);
    offset += 30 + bNombre.length + comp.length;
  }
  const dir = Buffer.concat(central);
  const fin = Buffer.alloc(22);
  fin.writeUInt32LE(0x06054b50, 0); fin.writeUInt16LE(nombres.length, 8); fin.writeUInt16LE(nombres.length, 10);
  fin.writeUInt32LE(dir.length, 12); fin.writeUInt32LE(offset, 16);
  return Buffer.concat([...trozos, dir, fin]);
}

// ─────────────────────── Datos y formato ───────────────────────

export function obtener(obj, ruta) {
  if (!ruta) return obj;
  let v = obj;
  for (const parte of ruta.replace(/\[(\d+)\]/g, '.$1').split('.')) {
    if (v === null) return null; // sección o lista puesta a null a propósito
    if (v === undefined) return undefined;
    v = v[parte];
  }
  return v;
}

const vacio = (v) => v === null || v === undefined || v === '' || (Array.isArray(v) && v.length === 0);

// Vacío «en profundidad»: todas sus hojas vacías (sin contar «confianza», que siempre se rellena).
export function vacioProfundo(v) {
  if (vacio(v)) return true;
  if (Array.isArray(v)) return v.every(vacioProfundo);
  if (typeof v === 'object') return Object.entries(v).every(([k, x]) => k === 'confianza' || vacioProfundo(x));
  return false;
}

function agrupar(entero) {
  return entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function numero(n, dec) {
  const signo = n < 0 ? '-' : '';
  const [e, d] = Math.abs(n).toFixed(dec).split('.');
  return signo + agrupar(e) + (d ? ',' + d : '');
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

export function formatear(v, filtro) {
  if (vacio(v)) return filtro === 'opc' ? '' : 'n.d.'; // «opc»: complemento opcional, sin dato no imprime nada
  if (filtro === 'opc') filtro = undefined;
  if (typeof v === 'boolean') return v ? 'Sí' : 'No';
  if (Array.isArray(v)) return v.map((x) => formatear(x, filtro)).join(', ');
  if (typeof v === 'object') return JSON.stringify(v);
  if (filtro === 'fecha') {
    const m = String(v).match(/^(\d{4})-(\d{2})(?:-(\d{2}))?/);
    if (!m) return String(v);
    return (m[3] ? `${+m[3]} ` : '') + `${MESES[+m[2] - 1]} ${m[1]}`;
  }
  // Sin filtro, el texto va tal cual (un «2021» o un «+0,05» no se reformatean).
  if (filtro === 'texto' || (typeof v === 'string' && filtro === undefined)) return String(v);
  const n = typeof v === 'number' ? v : Number(String(v).replace(',', '.'));
  if (typeof v === 'string' && (v.trim() === '' || Number.isNaN(n))) return v; // texto libre: tal cual
  if (filtro === undefined) {
    const dec = Number.isInteger(n) || Math.abs(n) >= 100 ? 0 : 1;
    return numero(n, dec);
  }
  const f = filtro.match(/^(pct|x|\+pct|)(\d)?$/);
  if (!f) return numero(n, 1);
  const [, tipo, d] = f;
  const dec = d !== undefined ? +d : tipo ? 1 : 0;
  if (tipo === 'pct') return numero(n, dec) + ' %';
  if (tipo === '+pct') return (n > 0 ? '+' : '') + numero(n, dec) + ' %';
  if (tipo === 'x') return numero(n, dec) + 'x';
  return numero(n, dec);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const desesc = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');

// ─────────────────────── WordprocessingML ───────────────────────

const RE_PARRAFO = /<w:p\b[^>]*>[\s\S]*?<\/w:p>|<w:p\b[^>]*\/>/g;
const RE_T = /<w:t(?:\s[^>]*)?>([^<]*)<\/w:t>/g;

function textoPlano(xml) {
  let t = '';
  for (const m of xml.matchAll(RE_T)) t += desesc(m[1]);
  return t;
}

// Si Word ha partido un {{marcador}} entre varias «runs», las une (conserva el formato de la primera).
function unirMarcadoresPartidos(doc) {
  return doc.replace(RE_PARRAFO, (p) => {
    const total = textoPlano(p);
    const marcadores = (total.match(/\{\{[^}]*\}\}/g) || []).length;
    if (!marcadores) return p;
    let enteros = 0;
    for (const m of p.matchAll(RE_T)) enteros += (desesc(m[1]).match(/\{\{[^}]*\}\}/g) || []).length;
    if (enteros === marcadores) return p;
    const pPr = (p.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || [''])[0];
    const apertura = p.match(/^<w:p\b[^>]*>/)[0];
    return `${apertura}${pPr}<w:r>${rPrPrimeraRun(p)}<w:t xml:space="preserve">${esc(total)}</w:t></w:r></w:p>`;
  });
}

function rPrPrimeraRun(p) {
  const sinPPr = p.replace(/<w:pPr>[\s\S]*?<\/w:pPr>/, '');
  const m = sinPPr.match(/<w:r(?:\s[^>]*)?>\s*(<w:rPr>[\s\S]*?<\/w:rPr>)?/);
  return (m && m[1]) || '';
}

function conNegrita(rPr) {
  if (!rPr) return '<w:rPr><w:b/></w:rPr>';
  if (/<w:b\/>|<w:b /.test(rPr)) return rPr;
  const m = rPr.match(/^<w:rPr>((?:<w:rStyle[^>]*\/>)?(?:<w:rFonts[^>]*\/>)?)/);
  return `<w:rPr>${m[1]}<w:b/>` + rPr.slice(m[0].length);
}

// <w:i/> va después de <w:b/> y <w:bCs/> (el orden de rPr lo fija el esquema).
function conCursiva(rPr) {
  if (!rPr) return '<w:rPr><w:i/></w:rPr>';
  if (/<w:i\/>|<w:i /.test(rPr)) return rPr;
  const m = rPr.match(/^<w:rPr>((?:<w:rStyle[^>]*\/>)?(?:<w:rFonts[^>]*\/>)?(?:<w:b\/>|<w:b [^>]*\/>)?(?:<w:bCs\/>|<w:bCs [^>]*\/>)?)/);
  return `<w:rPr>${m[1]}<w:i/>` + rPr.slice(m[0].length);
}

// Texto con **negrita**, *cursiva* y saltos de línea simples → runs. La cursiva exige que el asterisco
// no vaya pegado a letras o números por fuera (así «2*3» o «nota*» no se tocan).
function runs(texto, rPr) {
  const salida = [];
  texto.split(/(\*\*[^*]+\*\*|(?<![\p{L}\p{N}*])\*[^*\s](?:[^*]*?[^*\s])?\*(?![\p{L}\p{N}*]))/u).forEach((trozo) => {
    if (!trozo) return;
    const negrita = /^\*\*[^*]+\*\*$/.test(trozo), cursiva = !negrita && /^\*[^*]+\*$/.test(trozo);
    const limpio = negrita ? trozo.slice(2, -2) : cursiva ? trozo.slice(1, -1) : trozo;
    const props = negrita ? conNegrita(rPr) : cursiva ? conCursiva(rPr) : rPr;
    limpio.split('\n').forEach((linea, i) => {
      salida.push(`<w:r>${props}${i ? '<w:br/>' : ''}<w:t xml:space="preserve">${esc(linea)}</w:t></w:r>`);
    });
  });
  return salida.join('');
}

function parrafo(pOriginal, contenido) {
  const apertura = pOriginal.match(/^<w:p\b[^>]*>/)[0];
  const pPr = (pOriginal.match(/<w:pPr>[\s\S]*?<\/w:pPr>/) || [''])[0];
  return `${apertura}${pPr}${contenido}</w:p>`;
}

// ───────────────────────────── Motor ─────────────────────────────

export function rellenar(plantillaBuf, datos, opciones = {}) {
  const avisos = [];
  const zip = leerZip(plantillaBuf);
  const graficos = opciones.graficos || leerGraficosIncrustados(zip) || {};
  // Cobertura: de cada cosa que el informe enseña (un valor, un texto, una lista, una tabla),
  // cuántas tienen dato y cuántas salen como «n.d.» / «Sin datos». Se agrupa por sección.
  const porSeccion = {};
  const contar = (ruta, v) => {
    const sec = ruta.split(/[.[]/)[0];
    if (sec.startsWith('_') || sec === 'meta' || sec === 'fuentes') return;
    const c = (porSeccion[sec] ||= { total: 0, llenos: 0 });
    c.total++;
    if (!vacio(v)) c.llenos++;
  };
  const valor = (ruta, filtro, ctx = datos) => {
    const v = obtener(ctx, ruta);
    if (v === undefined) avisos.push(`Campo inexistente en datos: ${ruta}`);
    if (ctx === datos) contar(ruta, v);
    return formatear(v, filtro);
  };
  // Los {{_meta.…}} se dejan para el final, cuando ya se conoce la cobertura.
  const sustituirEscalares = (xml, ctx = datos) =>
    xml.replace(/\{\{\s*([^{}|:#\s]+?)\s*(?:\|\s*([^{}\s]+)\s*)?\}\}/g, (m, ruta, filtro) => (ruta.startsWith('_meta') ? m : esc(valor(ruta, filtro, ctx))));

  // Lo que se quita por falta de datos cuenta como hueco en la cobertura.
  const contarHuecos = (xml) => {
    for (const m of textoPlano(xml).matchAll(/\{\{\s*(?:texto:|lista:)?\s*([\w.[\]]+?)(?:\[\][\w.]*)?\s*(?:\|[^{}]*)?\}\}/g)) contar(m[1], null);
  };

  let doc = unirMarcadoresPartidos(zip.get('word/document.xml').toString('utf8'));

  // 0) Secciones condicionales: {{si:rutas|Título|Núcleo o Complemento}} … {{fin:rutas}}.
  //    Si todas las rutas están vacías, se quita el bloque entero y se anota en datos._omitidos.
  //    Se resuelven de fuera adentro: si se quita una sección, sus apartados se van con ella.
  const omitidos = [];
  const RE_MARCA = /^\{\{(si|fin):([^}|]+)(?:\|([^}|]*))?(?:\|([^}|]*))?\}\}$/;
  for (;;) {
    const marcas = [];
    for (const m of doc.matchAll(RE_PARRAFO)) {
      const k = textoPlano(m[0]).trim().match(RE_MARCA);
      if (k) marcas.push({ tipo: k[1], rutas: k[2].trim(), titulo: k[3], clase: k[4], ini: m.index, fin: m.index + m[0].length });
    }
    if (!marcas.length) break;
    const pila = [];
    let par = null;
    for (const mk of marcas) {
      if (mk.tipo === 'si') { pila.push(mk); continue; }
      const a = pila.pop();
      if (!a || a.rutas !== mk.rutas) throw new Error(`Marcadores si/fin descuadrados en la plantilla: ${mk.rutas}`);
      if (!pila.length) { par = [a, mk]; break; }
    }
    if (!par) throw new Error('Marcador {{si:…}} sin su {{fin:…}} en la plantilla');
    const [a, b] = par;
    const sinDatos = a.rutas.split(',').map((r) => r.trim()).every((r) => vacioProfundo(obtener(datos, r)));
    if (sinDatos) {
      contarHuecos(doc.slice(a.fin, b.ini));
      if (a.titulo) omitidos.push({ seccion: a.titulo, tipo: a.clase || 'Complemento' });
      doc = doc.slice(0, a.ini) + doc.slice(b.fin);
    } else {
      doc = doc.slice(0, a.ini) + doc.slice(a.fin, b.ini) + doc.slice(b.fin);
    }
  }
  datos = { ...datos, _omitidos: omitidos };

  // 0 bis) Pares etiqueta-valor condicionales: una celda con {{?rutas}} se vacía, junto con la
  //    celda siguiente (su valor), si todas las rutas están vacías. Las filas que quedan vacías se quitan.
  doc = doc.replace(/<w:tr\b[\s\S]*?<\/w:tr>/g, (fila) => {
    if (!fila.includes('{{?')) return fila;
    const celdas = [...fila.matchAll(/<w:tc\b[\s\S]*?<\/w:tc>/g)].map((m) => m[0]);
    const quitar = new Set();
    celdas.forEach((c, i) => {
      const m = textoPlano(c).match(/\{\{\?([^}]*)\}\}/);
      if (!m) return;
      const rutas = m[1].split(',').map((s) => s.trim()).filter(Boolean);
      if (rutas.length && rutas.every((r) => vacio(obtener(datos, r)))) {
        quitar.add(i); quitar.add(i + 1);
        rutas.forEach((r) => contar(r, null));
      }
    });
    if (quitar.size >= celdas.length) return '';
    let k = 0;
    return fila.replace(/<w:tc\b[\s\S]*?<\/w:tc>/g, (c) => {
      const x = c.replace(/\{\{\?[^}]*\}\}/g, '');
      return quitar.has(k++) ? x.replace(/<w:shd\b[^>]*\/>/g, '').replace(/<w:p\b[\s\S]*<\/w:p>/, '<w:p/>') : x;
    });
  });

  // 1) Filas de tabla repetidas. Una tabla sin filas se quita entera.
  const VACIA = '@@TABLA_VACIA@@';
  doc = doc.replace(/<w:tr\b[\s\S]*?<\/w:tr>/g, (fila) => {
    const m = textoPlano(fila).match(/\{\{\s*([\w.]+)\[\]/);
    if (!m) return fila;
    const ruta = m[1];
    const lista = obtener(datos, ruta);
    if (lista === undefined) avisos.push(`Campo inexistente en datos: ${ruta}`);
    contar(ruta, lista);
    const reFila = new RegExp(`\\{\\{\\s*${ruta.replace(/\./g, '\\.')}\\[\\]\\.?([\\w.]*)\\s*(?:\\|\\s*([^{}\\s]+)\\s*)?\\}\\}`, 'g');
    if (!Array.isArray(lista) || lista.length === 0) {
      if (!/^(_|meta\.)/.test(ruta)) avisos.push(`Tabla sin filas (se omite): ${ruta}`);
      return VACIA;
    }
    return lista.map((item, i) => {
      const r = fila
        .replace(/\{\{#\}\}/g, String(i + 1))
        .replace(reFila, (_, campo, filtro) => { const v = campo ? obtener(item, campo) : item; return vacio(v) ? '–' : esc(formatear(v, filtro)); });
      return sustituirEscalares(r);
    }).join('');
  });
  doc = doc.replace(/<w:tbl\b[\s\S]*?<\/w:tbl>/g, (t) => (t.includes(VACIA) || !/<w:tr\b/.test(t) ? '' : mantenerJunta(quitarColumnasVacias(t))));

  // 2) Párrafos de bloque: texto, lista, gráfico. Sin datos, desaparecen.
  const partes = { graficos: [], siguienteId: 1 };
  doc = doc.replace(RE_PARRAFO, (p) => {
    const t = textoPlano(p).trim();
    let m;
    if ((m = t.match(/^\{\{texto:\s*([\w.[\]]+)\s*\}\}$/))) {
      const v = obtener(datos, m[1]);
      if (v === undefined) avisos.push(`Campo inexistente en datos: ${m[1]}`);
      contar(m[1], v);
      if (vacio(v)) return '';
      const texto = Array.isArray(v) ? v.join('\n\n') : String(v);
      const rPr = rPrPrimeraRun(p);
      return texto.split(/\n\s*\n/).map((par) => parrafo(p, runs(par.trim(), rPr))).join('');
    }
    if ((m = t.match(/^\{\{lista:\s*([\w.[\]]+)\s*\}\}$/))) {
      const v = obtener(datos, m[1]);
      if (v === undefined) avisos.push(`Campo inexistente en datos: ${m[1]}`);
      contar(m[1], v);
      if (vacio(v)) return '';
      const items = (Array.isArray(v) ? v : [v]).map((x) =>
        typeof x === 'object' && x !== null ? Object.values(x).filter((y) => !vacio(y)).join(' — ') : String(x));
      const rPr = rPrPrimeraRun(p);
      return items.map((it) => parrafo(p, runs(it, rPr))).join('');
    }
    if ((m = t.match(/^\{\{grafico:\s*([\w-]+)\s*\}\}$/))) {
      const def = graficos[m[1]];
      if (!def) { avisos.push(`Gráfico sin definición: ${m[1]}`); return parrafo(p, ''); }
      const g = construirGrafico(def, datos, partes.graficos.length + 1, avisos, m[1]);
      if (!g) return '';
      partes.graficos.push(g);
      return parrafo(p, dibujoEnLinea(g, 1000 + partes.graficos.length));
    }
    return p;
  });

  // 2 bis) Un párrafo del cuerpo (fuera de tablas) cuyos valores están todos vacíos se quita entero.
  const tablas = [];
  doc = doc.replace(/<w:tbl\b[\s\S]*?<\/w:tbl>/g, (t) => `@@TBL${tablas.push(t) - 1}@@`);
  doc = doc.replace(RE_PARRAFO, (p) => {
    const rutas = [...textoPlano(p).matchAll(/\{\{\s*([^{}|:#?\s]+?)\s*(?:\|[^{}]*)?\}\}/g)].map((m) => m[1]).filter((r) => !r.startsWith('_meta'));
    if (!rutas.length || !rutas.every((r) => vacio(obtener(datos, r)))) return p;
    rutas.forEach((r) => contar(r, null));
    return '';
  });
  doc = doc.replace(/@@TBL(\d+)@@/g, (_, i) => tablas[+i]);

  // 3) Valores sueltos (cuerpo, cabeceras y pies).
  doc = sustituirEscalares(doc);
  const piezas = [...zip.keys()].filter((n) => /^word\/(header|footer)\d*\.xml$/.test(n));
  for (const n of piezas) zip.set(n, sustituirEscalares(zip.get(n).toString('utf8')));

  // 4) Cobertura y demás {{_meta.…}}.
  let total = 0, llenos = 0;
  for (const c of Object.values(porSeccion)) { total += c.total; llenos += c.llenos; }
  const pct = (a, b) => (b ? Math.round((1000 * a) / b) / 10 : 0);
  const meta = {
    ...(datos._meta || {}),
    cobertura: pct(llenos, total),
    secciones_flojas: Object.entries(porSeccion).filter(([, c]) => pct(c.llenos, c.total) < 60).map(([k]) => k).join(', ') || 'ninguna',
    detalle: Object.fromEntries(Object.entries(porSeccion).map(([k, c]) => [k, pct(c.llenos, c.total)])),
    generado: new Date().toISOString().slice(0, 10),
    omitidos: omitidos.map((o) => o.seccion).join('; '),
    aviso_nucleo: omitidos.some((o) => /n[úu]cleo/i.test(o.tipo))
      ? `Aviso: este informe no incluye ${omitidos.filter((o) => /n[úu]cleo/i.test(o.tipo)).map((o) => `«${o.seccion}»`).join(', ')}, porque no se encontró información verificable tras tres búsquedas. Ver el anexo «Información no disponible».`
      : '',
  };
  // El aviso solo aparece si falta alguna sección central.
  if (!meta.aviso_nucleo) doc = doc.replace(RE_PARRAFO, (p) => (textoPlano(p).includes('{{_meta.aviso_nucleo}}') ? '' : p));
  const ponerMeta = (xml) => xml.replace(/\{\{\s*_meta\.([\w.]+)\s*(?:\|\s*([^{}\s]+)\s*)?\}\}/g, (_, r, f) => esc(formatear(obtener(meta, r), f)));
  doc = ponerMeta(doc);
  zip.set('word/document.xml', doc);
  for (const n of piezas) zip.set(n, ponerMeta(zip.get(n).toString('utf8')));

  // 5) Partes de los gráficos.
  if (partes.graficos.length) {
    let rels = zip.get('word/_rels/document.xml.rels').toString('utf8');
    let tipos = zip.get('[Content_Types].xml').toString('utf8');
    if (!/Extension="xlsx"/.test(tipos)) {
      tipos = tipos.replace('</Types>', '<Default Extension="xlsx" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/></Types>');
    }
    for (const g of partes.graficos) {
      zip.set(`word/charts/chart${g.n}.xml`, g.xml);
      zip.set(`word/charts/_rels/chart${g.n}.xml.rels`,
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/package" Target="../embeddings/Hoja_grafico${g.n}.xlsx"/></Relationships>`);
      zip.set(`word/embeddings/Hoja_grafico${g.n}.xlsx`, g.xlsx);
      rels = rels.replace('</Relationships>', `<Relationship Id="${g.rid}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="charts/chart${g.n}.xml"/></Relationships>`);
      tipos = tipos.replace('</Types>', `<Override PartName="/word/charts/chart${g.n}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/></Types>`);
    }
    zip.set('word/_rels/document.xml.rels', rels);
    zip.set('[Content_Types].xml', tipos);
  }

  const restantes = [...new Set((doc.match(/\{\{[^}]*\}\}/g) || []))];
  if (restantes.length) avisos.push(`Marcadores sin resolver: ${restantes.join(', ')}`);
  return { buffer: escribirZip(zip), avisos: [...new Set(avisos)], cobertura: meta, graficos: partes.graficos.length };
}

// En una tabla de datos (con fila de cabecera), una columna en la que todas las celdas son «–» se quita
// y su ancho pasa a la columna más ancha.
function quitarColumnasVacias(tabla) {
  const filas = [...tabla.matchAll(/<w:tr\b[\s\S]*?<\/w:tr>/g)].map((m) => m[0]);
  if (filas.length < 2 || !/<w:tblHeader\/>/.test(filas[0])) return tabla;
  const celdas = filas.map((f) => [...f.matchAll(/<w:tc\b[\s\S]*?<\/w:tc>/g)].map((m) => m[0]));
  const nCol = celdas[0].length;
  if (celdas.some((c) => c.length !== nCol)) return tabla;
  const vacias = [];
  for (let j = 1; j < nCol; j++) if (celdas.slice(1).every((c) => textoPlano(c[j]).trim() === '–')) vacias.push(j);
  if (!vacias.length) return tabla;
  const anchoDe = (tc) => +((tc.match(/<w:tcW w:w="(\d+)"/) || [])[1] || 0);
  const quitado = vacias.reduce((s, j) => s + anchoDe(celdas[0][j]), 0);
  const restantes = [...Array(nCol).keys()].filter((j) => !vacias.includes(j));
  const destino = restantes.reduce((a, j) => (anchoDe(celdas[0][j]) > anchoDe(celdas[0][a]) ? j : a), restantes[0]);
  const ensanchar = (tc) => tc.replace(/<w:tcW w:w="(\d+)"/, (_, w) => `<w:tcW w:w="${+w + quitado}"`);
  let nueva = tabla;
  for (const f of filas) {
    let k = 0;
    const nf = f.replace(/<w:tc\b[\s\S]*?<\/w:tc>/g, (tc) => { const j = k++; return vacias.includes(j) ? '' : j === destino ? ensanchar(tc) : tc; });
    nueva = nueva.replace(f, () => nf);
  }
  let g = 0;
  const grid = [...nueva.matchAll(/<w:gridCol w:w="(\d+)"\/>/g)].map((m) => +m[1]);
  const extra = vacias.reduce((s, v) => s + (grid[v] || 0), 0);
  return nueva.replace(/<w:gridCol w:w="(\d+)"\/>/g, (m, w) => { const j = g++; return vacias.includes(j) ? '' : j === destino ? `<w:gridCol w:w="${+w + extra}"/>` : m; });
}

// Que una tabla de datos no empiece al pie de una página y siga en la otra: las tablas cortas
// (hasta 15 filas) van enteras; en las largas, la cabecera va al menos con las dos primeras filas.
// Se marca «mantener con el siguiente» en los párrafos de esas filas (en su sitio dentro de w:pPr).
function mantenerJunta(tabla) {
  const filas = [...tabla.matchAll(/<w:tr\b[\s\S]*?<\/w:tr>/g)].map((m) => m[0]);
  if (filas.length < 2 || !/<w:tblHeader\/>/.test(filas[0])) return tabla;
  const hasta = filas.length <= 15 ? filas.length - 1 : 3;
  const conKeepNext = (fila) => fila.replace(/<w:p\b([^>]*?)(\/?)>([\s\S]*?)(?=<\/w:p>|$)/g, (todo, attrs, cerrada, resto) => {
    if (cerrada) return todo;
    if (/^<w:pPr>/.test(resto)) {
      if (/^<w:pPr>(?:<w:pStyle\b[^>]*\/>)?<w:keepNext\/>/.test(resto)) return todo;
      return `<w:p${attrs}>` + resto.replace(/^<w:pPr>(<w:pStyle\b[^>]*\/>)?/, (_, st) => `<w:pPr>${st || ''}<w:keepNext/>`);
    }
    return `<w:p${attrs}><w:pPr><w:keepNext/></w:pPr>${resto}`;
  });
  let nueva = tabla;
  for (let i = 0; i < hasta; i++) nueva = nueva.replace(filas[i], () => conKeepNext(filas[i]));
  return nueva;
}

function leerGraficosIncrustados(zip) {
  const ajustes = zip.get('word/settings.xml');
  if (!ajustes) return null;
  const m = ajustes.toString('utf8').match(/<w:docVar w:name="graficos" w:val="([^"]*)"\/>/);
  return m ? JSON.parse(Buffer.from(m[1], 'base64').toString('utf8')) : null;
}

export function incrustarGraficos(plantillaBuf, graficos) {
  const zip = leerZip(plantillaBuf);
  let ajustes = zip.get('word/settings.xml').toString('utf8').replace(/<w:docVars>[\s\S]*?<\/w:docVars>/, '');
  const docVars = `<w:docVars><w:docVar w:name="graficos" w:val="${Buffer.from(JSON.stringify(graficos)).toString('base64')}"/></w:docVars>`;
  // docVars va casi al final de w:settings, antes de rsids/mathPr/themeFontLang/clrSchemeMapping…
  const ancla = ajustes.match(/<w:(rsids|m:mathPr|attachedSchema|themeFontLang|clrSchemeMapping|doNotIncludeSubdocsInStats|doNotAutoCompressPictures|forceUpgrade|captions|readModeInkLockDown|smartTagType|decimalSymbol|listSeparator)\b/);
  ajustes = ancla ? ajustes.replace(ancla[0], docVars + ancla[0]) : ajustes.replace('</w:settings>', docVars + '</w:settings>');
  zip.set('word/settings.xml', ajustes);
  return escribirZip(zip);
}


// ───────────────────────────── Gráficos ─────────────────────────────
//
// Definición (graficos.json):
// {
//   "id": {
//     "tipo": "columnas" | "columnas_apiladas" | "barras" | "barras_apiladas" | "lineas" | "donut" | "tarta" | "dispersion" | "radar",
//     "titulo": "Ingresos ({{meta.divisa}} M)",       // admite {{marcadores}}
//     "datos": "financieros.historico",               // ruta a una lista de objetos
//     "categoria": "periodo",                          // campo para el eje de categorías
//     "series": [{ "campo": "ingresos", "nombre": "Ingresos" }],
//     "formato": "#,##0",                              // formato numérico (Excel)
//     "etiquetas": true,                               // valores sobre las marcas
//     "min": 0, "max": 5,                              // escala fija (opcional)
//     "alto_cm": 7.5, "ancho_cm": 16,
//     // dispersión: "x": {campo,nombre}, "y": {campo,nombre}, "etiqueta": "nombre", "destacar_primero": true
//     // rango (barras flotantes): "categoria", "campo_min", "campo_max", "gris" (campo que marca las filas de referencia)
//     // pivot: { "lista", "nombre", "historico", "periodo", "valor" } → una serie por elemento de la lista
//   }
// }

// Paleta categórica validada (orden fijo; nunca se recicla).
const PALETA = ['2A78D6', 'EB6834', '1BAF7A', 'EDA100', 'E87BA4', '008300', '4A3AA7', 'E34948'];
const GRIS = 'A3A29C', TINTA = '1F2A3C', TINTA_2 = '52514E', REJILLA = 'E4E3DF';
const EMU_CM = 360000;
const xmlTexto = (s) => esc(s);

function construirGrafico(def, datos, n, avisos, id) {
  // El formato numérico también admite un {{marcador}} (p. ej. sin decimales si los valores pasan de 100).
  if (typeof def.formato === 'string' && def.formato.includes('{{')) {
    def = { ...def, formato: def.formato.replace(/\{\{\s*([^{}|\s]+)\s*\}\}/g, (_, r) => { const v = obtener(datos, r); return vacio(v) ? 'General' : String(v); }) };
  }
  const titulo = def.titulo ? def.titulo.replace(/\{\{\s*([^{}|\s]+)\s*(?:\|\s*([^{}\s]+))?\s*\}\}/g, (_, r, f) => formatear(obtener(datos, r), f)) : '';
  const num = (v) => (vacio(v) || Number.isNaN(Number(v)) ? null : Number(v));

  // «pivot»: una serie por elemento de una lista, con sus valores en una sublista por periodo
  // (p. ej. ingresos de cada segmento año a año → columnas apiladas).
  if (def.pivot) {
    const pv = def.pivot;
    const items = obtener(datos, pv.lista);
    if (!Array.isArray(items) || !items.length) { avisos.push(`Gráfico ${id}: no hay lista en «${pv.lista}»`); return null; }
    const cats = [...new Set(items.flatMap((it) => (obtener(it, pv.historico) || []).map((h) => String(obtener(h, pv.periodo)))))]
      .sort((a, b) => (parseInt(a.match(/\d{4}/)?.[0] ?? a, 10) || 0) - (parseInt(b.match(/\d{4}/)?.[0] ?? b, 10) || 0));
    const series = items.map((it) => ({
      nombre: String(obtener(it, pv.nombre) ?? ''),
      valores: cats.map((c) => num(obtener((obtener(it, pv.historico) || []).find((h) => String(obtener(h, pv.periodo)) === c) || {}, pv.valor))),
    })).filter((s) => s.valores.some((v) => v !== null));
    if (!cats.length || !series.length) { avisos.push(`Gráfico ${id}: sin valores numéricos`); return null; }
    if (series.length > PALETA.length) avisos.push(`Gráfico ${id}: ${series.length} series; agrupa las pequeñas en «Otros» (máximo ${PALETA.length})`);
    const hoja = [['', ...series.map((s) => s.nombre)], ...cats.map((c, i) => [c, ...series.map((s) => s.valores[i])])];
    return empaquetar(def, n, xmlCategorias(def, titulo, cats, series), hoja, titulo);
  }

  let filas = obtener(datos, def.datos);
  if (!Array.isArray(filas)) { avisos.push(`Gráfico ${id}: no hay lista en «${def.datos}»`); return null; }
  if (def.filtrar) filas = filas.filter((f) => !vacio(obtener(f, def.filtrar)));
  if (def.max_filas) filas = filas.slice(0, def.max_filas);

  let xml, hoja;
  if (def.tipo === 'rango') {
    // Barras flotantes (p. ej. la síntesis de valoración): una serie invisible hasta el mínimo
    // y otra con la longitud del rango. Las filas marcadas en «gris» son referencias, no métodos.
    const filasOk = filas.filter((f) => num(obtener(f, def.campo_min)) !== null && num(obtener(f, def.campo_max)) !== null);
    if (!filasOk.length) { avisos.push(`Gráfico ${id}: sin rangos completos`); return null; }
    const cats = filasOk.map((f) => String(obtener(f, def.categoria) ?? ''));
    const mins = filasOk.map((f) => num(obtener(f, def.campo_min)));
    const largos = filasOk.map((f, i) => num(obtener(f, def.campo_max)) - mins[i]);
    const grises = filasOk.map((f, i) => (def.gris && obtener(f, def.gris) ? i : -1)).filter((i) => i >= 0);
    const lo = Math.min(...mins), hi = Math.max(...filasOk.map((f) => num(obtener(f, def.campo_max))));
    const paso = 10 ** Math.floor(Math.log10(Math.max(hi - lo, 1e-9) / 2));
    const defR = { ...def, tipo: 'barras_apiladas', max: undefined, min: Math.max(0, Math.floor((lo - (hi - lo) * 0.1) / paso) * paso), etiquetas: false };
    const series = [{ nombre: 'Desde', valores: mins, invisible: true }, { nombre: def.nombre_serie || 'Rango', valores: largos, grises }];
    hoja = [['', 'Mínimo', 'Máximo'], ...cats.map((c, i) => [c, mins[i], mins[i] + largos[i]])];
    xml = xmlCategorias(defR, titulo, cats, series, { sinLeyenda: true });
    return empaquetar(def, n, xml, hoja, titulo);
  }
  if (def.tipo === 'dispersion') {
    const puntos = filas.map((f) => ({ nombre: String(obtener(f, def.etiqueta) ?? ''), x: num(obtener(f, def.x.campo)), y: num(obtener(f, def.y.campo)) }))
      .filter((p) => p.x !== null && p.y !== null);
    if (puntos.length < 2) { avisos.push(`Gráfico ${id}: menos de dos puntos completos`); return null; }
    hoja = [['Nombre', def.x.nombre, def.y.nombre], ...puntos.map((p) => [p.nombre, p.x, p.y])];
    xml = xmlDispersion(def, titulo, puntos);
  } else {
    const cats = filas.map((f) => String(obtener(f, def.categoria) ?? ''));
    const series = def.series.map((s) => ({ ...s, valores: filas.map((f) => num(obtener(f, s.campo))) }))
      .filter((s) => s.valores.some((v) => v !== null));
    if (!cats.length || !series.length) { avisos.push(`Gráfico ${id}: sin valores numéricos`); return null; }
    if ((def.tipo === 'donut' || def.tipo === 'tarta')) {
      const suma = series[0].valores.reduce((a, b) => a + (b || 0), 0);
      if (def.suma100 !== false && (suma < 95 || suma > 105)) avisos.push(`Gráfico ${id}: los pesos suman ${numero(suma, 1)} (esperado ~100)`);
    }
    hoja = [['', ...series.map((s) => s.nombre)], ...cats.map((c, i) => [c, ...series.map((s) => s.valores[i])])];
    xml = xmlCategorias(def, titulo, cats, series);
  }
  return empaquetar(def, n, xml, hoja, titulo);
}

function empaquetar(def, n, xml, hoja, titulo) {
  return {
    n, rid: `rIdGrafico${n}`, xml, xlsx: libroExcel(hoja),
    cx: Math.round((def.ancho_cm || 16) * EMU_CM), cy: Math.round((def.alto_cm || 7.5) * EMU_CM), titulo,
  };
}

function dibujoEnLinea(g, idDoc) {
  return `<w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing"><wp:extent cx="${g.cx}" cy="${g.cy}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${idDoc}" name="Gráfico ${g.n}" descr="${xmlTexto(g.titulo)}"/><wp:cNvGraphicFramePr/><a:graphic xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/chart"><c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" r:id="${g.rid}"/></a:graphicData></a:graphic></wp:inline></w:drawing></w:r>`;
}

const relleno = (hex) => `<a:solidFill><a:srgbClr val="${hex}"/></a:solidFill>`;
const linea = (hex, w = 9525) => `<a:ln w="${w}">${hex ? relleno(hex) : '<a:noFill/>'}</a:ln>`;
const txPr = (sz = 900, color = TINTA_2, extra = '') =>
  `<c:txPr><a:bodyPr${extra}/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${sz}">${relleno(color)}</a:defRPr></a:pPr><a:endParaRPr lang="es-ES"/></a:p></c:txPr>`;
const col = (i) => String.fromCharCode(65 + i);
const ref = (c, f1, f2) => `Hoja1!$${c}$${f1}` + (f2 && f2 !== f1 ? `:$${c}$${f2}` : '');

function tituloXml(titulo) {
  if (!titulo) return '<c:autoTitleDeleted val="1"/>';
  return `<c:title><c:tx><c:rich><a:bodyPr/><a:lstStyle/><a:p><a:pPr algn="l"><a:defRPr sz="1050" b="1">${relleno(TINTA)}</a:defRPr></a:pPr><a:r><a:rPr lang="es-ES" sz="1050" b="1">${relleno(TINTA)}</a:rPr><a:t>${xmlTexto(titulo)}</a:t></a:r></a:p></c:rich></c:tx><c:overlay val="0"/></c:title><c:autoTitleDeleted val="0"/>`;
}

function strCache(valores, f) {
  return `<c:strRef><c:f>${f}</c:f><c:strCache><c:ptCount val="${valores.length}"/>${valores.map((v, i) => `<c:pt idx="${i}"><c:v>${xmlTexto(v)}</c:v></c:pt>`).join('')}</c:strCache></c:strRef>`;
}
function numCache(valores, f, formato = 'General') {
  return `<c:numRef><c:f>${f}</c:f><c:numCache><c:formatCode>${xmlTexto(formato)}</c:formatCode><c:ptCount val="${valores.length}"/>${valores.map((v, i) => (v === null ? '' : `<c:pt idx="${i}"><c:v>${v}</c:v></c:pt>`)).join('')}</c:numCache></c:numRef>`;
}

function etiquetasXml(def, pos) {
  if (!def.etiquetas) return '';
  return `<c:dLbls><c:numFmt formatCode="${xmlTexto(def.formato || 'General')}" sourceLinked="0"/><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>${txPr(800, TINTA_2)}${pos ? `<c:dLblPos val="${pos}"/>` : ''}<c:showLegendKey val="0"/><c:showVal val="1"/><c:showCatName val="0"/><c:showSerName val="0"/><c:showPercent val="0"/><c:showBubbleSize val="0"/></c:dLbls>`;
}

function ejes(def, horizontal, { catBorrado = false } = {}) {
  const posCat = horizontal ? 'l' : 'b', posVal = horizontal ? 'b' : 'l';
  const escala = (orient) => `<c:scaling><c:orientation val="${orient}"/>${def.max !== undefined ? `<c:max val="${def.max}"/>` : ''}${def.min !== undefined ? `<c:min val="${def.min}"/>` : ''}</c:scaling>`;
  return `<c:catAx><c:axId val="10"/><c:scaling><c:orientation val="${horizontal ? 'maxMin' : 'minMax'}"/></c:scaling><c:delete val="${catBorrado ? 1 : 0}"/><c:axPos val="${posCat}"/><c:numFmt formatCode="General" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/><c:spPr>${linea(GRIS)}</c:spPr>${txPr(850)}<c:crossAx val="20"/><c:crosses val="autoZero"/><c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/><c:noMultiLvlLbl val="0"/></c:catAx>` +
    `<c:valAx><c:axId val="20"/>${escala('minMax')}<c:delete val="0"/><c:axPos val="${posVal}"/><c:majorGridlines><c:spPr>${linea(REJILLA, 6350)}</c:spPr></c:majorGridlines><c:numFmt formatCode="${xmlTexto(def.formato || 'General')}" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:spPr><a:ln><a:noFill/></a:ln></c:spPr>${txPr(850)}<c:crossAx val="10"/><c:crosses val="${horizontal ? 'max' : 'autoZero'}"/><c:crossBetween val="between"/></c:valAx>`;
}

function leyenda(mostrar, pos = 'b') {
  return mostrar ? `<c:legend><c:legendPos val="${pos}"/><c:overlay val="0"/>${txPr(850)}</c:legend>` : '';
}

function envolver(def, titulo, plotArea, conLeyenda, posLeyenda) {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><c:chartSpace xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><c:date1904 val="0"/><c:lang val="es-ES"/><c:roundedCorners val="0"/><c:chart>${tituloXml(titulo)}<c:plotArea><c:layout/>${plotArea}</c:plotArea>${leyenda(conLeyenda, posLeyenda)}<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>${txPr(900)}<c:externalData r:id="rId1"><c:autoUpdate val="0"/></c:externalData></c:chartSpace>`;
}

function xmlCategorias(def, titulo, cats, series, opciones = {}) {
  const ult = cats.length + 1;
  const comun = (s, i) => `<c:idx val="${i}"/><c:order val="${i}"/><c:tx>${strCache([s.nombre], ref(col(i + 1), 1))}</c:tx>`;
  const catYval = (s, i) => `<c:cat>${strCache(cats, ref('A', 2, ult))}</c:cat><c:val>${numCache(s.valores, ref(col(i + 1), 2, ult), def.formato)}</c:val>`;
  const color = (s, i) => s.color || PALETA[i % PALETA.length];

  switch (def.tipo) {
    case 'columnas': case 'columnas_apiladas': case 'barras': case 'barras_apiladas': {
      const horizontal = def.tipo.startsWith('barras');
      const apilado = def.tipo.endsWith('apiladas');
      const unaSerie = series.length === 1;
      const gris = (k) => `<c:dPt><c:idx val="${k}"/><c:invertIfNegative val="0"/><c:bubble3D val="0"/><c:spPr>${relleno('C9C8C2')}</c:spPr></c:dPt>`;
      const visibles = series.filter((s) => !s.invisible);
      const sers = series.map((s, i) => {
        // Serie invisible: el «hueco» de las barras flotantes.
        if (s.invisible) return `<c:ser>${comun(s, i)}<c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr><c:invertIfNegative val="0"/>${catYval(s, i)}</c:ser>`;
        // Con una sola serie, «resaltar» pinta de gris todas las barras menos las indicadas;
        // «grises» pinta de gris las indicadas.
        const dpts = s.grises ? s.grises.map(gris).join('')
          : unaSerie && def.resaltar !== undefined
            ? cats.map((c, k) => (([].concat(def.resaltar)).includes(k) || ([].concat(def.resaltar)).includes(c) ? '' : gris(k))).join('')
            : '';
        const c = s.invisible === undefined && visibles.length === 1 ? PALETA[0] : color(s, i - (series.length - visibles.length));
        return `<c:ser>${comun(s, i)}<c:spPr>${relleno(c)}${linea(apilado && visibles.length > 1 ? 'FFFFFF' : null, apilado ? 12700 : 9525)}</c:spPr><c:invertIfNegative val="0"/>${dpts}${etiquetasXml(def, apilado ? 'ctr' : 'outEnd')}${catYval(s, i)}</c:ser>`;
      }).join('');
      const area = `<c:barChart><c:barDir val="${horizontal ? 'bar' : 'col'}"/><c:grouping val="${apilado ? 'stacked' : 'clustered'}"/><c:varyColors val="0"/>${sers}<c:gapWidth val="${apilado ? 60 : 70}"/>${apilado ? '<c:overlap val="100"/>' : '<c:overlap val="-10"/>'}<c:axId val="10"/><c:axId val="20"/></c:barChart>${ejes(def, horizontal)}`;
      return envolver(def, titulo, area, !opciones.sinLeyenda && visibles.length > 1);
    }
    case 'lineas': {
      const sers = series.map((s, i) => `<c:ser>${comun(s, i)}<c:spPr><a:ln w="25400" cap="rnd">${relleno(color(s, i))}<a:round/></a:ln></c:spPr><c:marker><c:symbol val="circle"/><c:size val="6"/><c:spPr>${relleno(color(s, i))}${linea('FFFFFF', 9525)}</c:spPr></c:marker>${etiquetasXml(def, 't')}${catYval(s, i)}<c:smooth val="0"/></c:ser>`).join('');
      const area = `<c:lineChart><c:grouping val="standard"/><c:varyColors val="0"/>${sers}<c:marker val="1"/><c:axId val="10"/><c:axId val="20"/></c:lineChart>${ejes(def, false)}`;
      return envolver(def, titulo, area, series.length > 1);
    }
    case 'donut': case 'tarta': {
      const s = series[0];
      // Más de 8 porciones: se pliegan en «Otros» antes de llegar aquí (ver prompt); si no, se repite gris.
      const dpts = cats.map((_, k) => `<c:dPt><c:idx val="${k}"/><c:bubble3D val="0"/><c:spPr>${relleno(k < PALETA.length ? PALETA[k] : GRIS)}${linea('FFFFFF', 19050)}</c:spPr></c:dPt>`).join('');
      const lbls = `<c:dLbls><c:numFmt formatCode="${xmlTexto(def.formato || '0.0"%"')}" sourceLinked="0"/><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>${txPr(800, TINTA)}${def.tipo === 'tarta' ? '<c:dLblPos val="outEnd"/>' : ''}<c:showLegendKey val="0"/><c:showVal val="1"/><c:showCatName val="0"/><c:showSerName val="0"/><c:showPercent val="0"/><c:showBubbleSize val="0"/><c:showLeaderLines val="1"/></c:dLbls>`;
      const ser = `<c:ser>${comun(s, 0)}${dpts}${lbls}${catYval(s, 0)}</c:ser>`;
      const area = def.tipo === 'donut'
        ? `<c:doughnutChart><c:varyColors val="1"/>${ser}<c:firstSliceAng val="0"/><c:holeSize val="55"/></c:doughnutChart>`
        : `<c:pieChart><c:varyColors val="1"/>${ser}<c:firstSliceAng val="0"/></c:pieChart>`;
      return envolver(def, titulo, area, true, 'r');
    }
    case 'radar': {
      const sers = series.map((s, i) => `<c:ser>${comun(s, i)}<c:spPr><a:ln w="25400">${relleno(color(s, i))}</a:ln></c:spPr><c:marker><c:symbol val="circle"/><c:size val="6"/><c:spPr>${relleno(color(s, i))}</c:spPr></c:marker>${etiquetasXml(def)}${catYval(s, i)}</c:ser>`).join('');
      const area = `<c:radarChart><c:radarStyle val="marker"/><c:varyColors val="0"/>${sers}<c:axId val="10"/><c:axId val="20"/></c:radarChart>` +
        `<c:catAx><c:axId val="10"/><c:scaling><c:orientation val="minMax"/></c:scaling><c:delete val="0"/><c:axPos val="b"/><c:majorGridlines><c:spPr>${linea(REJILLA, 6350)}</c:spPr></c:majorGridlines><c:numFmt formatCode="General" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:spPr>${linea(REJILLA, 6350)}</c:spPr>${txPr(850, TINTA)}<c:crossAx val="20"/><c:crosses val="autoZero"/><c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/><c:noMultiLvlLbl val="0"/></c:catAx>` +
        `<c:valAx><c:axId val="20"/><c:scaling><c:orientation val="minMax"/>${def.max !== undefined ? `<c:max val="${def.max}"/>` : ''}${def.min !== undefined ? `<c:min val="${def.min}"/>` : ''}</c:scaling><c:delete val="0"/><c:axPos val="l"/><c:majorGridlines><c:spPr>${linea(REJILLA, 6350)}</c:spPr></c:majorGridlines><c:numFmt formatCode="0" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="nextTo"/><c:spPr><a:ln><a:noFill/></a:ln></c:spPr>${txPr(750)}<c:crossAx val="10"/><c:crosses val="autoZero"/><c:crossBetween val="between"/><c:majorUnit val="1"/></c:valAx>`;
      return envolver(def, titulo, area, series.length > 1);
    }
    default:
      throw new Error(`Tipo de gráfico desconocido: ${def.tipo}`);
  }
}

function xmlDispersion(def, titulo, puntos) {
  // Una serie por punto: así cada punto lleva su nombre como etiqueta. El primero (la empresa
  // analizada) va en azul; el resto, en gris. Sin leyenda: las etiquetas identifican.
  const sers = puntos.map((p, i) => {
    const c = def.destacar_primero !== false && i === 0 ? PALETA[0] : '8A8984';
    const fila = i + 2;
    return `<c:ser><c:idx val="${i}"/><c:order val="${i}"/><c:tx>${strCache([p.nombre], ref('A', fila))}</c:tx><c:spPr><a:ln w="19050"><a:noFill/></a:ln></c:spPr><c:marker><c:symbol val="circle"/><c:size val="${i === 0 && def.destacar_primero !== false ? 10 : 8}"/><c:spPr>${relleno(c)}${linea('FFFFFF', 9525)}</c:spPr></c:marker><c:dLbls><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr>${txPr(800, i === 0 ? TINTA : TINTA_2)}<c:dLblPos val="r"/><c:showLegendKey val="0"/><c:showVal val="0"/><c:showCatName val="0"/><c:showSerName val="1"/><c:showPercent val="0"/><c:showBubbleSize val="0"/></c:dLbls><c:xVal>${numCache([p.x], ref('B', fila), def.x.formato || 'General')}</c:xVal><c:yVal>${numCache([p.y], ref('C', fila), def.y.formato || 'General')}</c:yVal><c:smooth val="0"/></c:ser>`;
  }).join('');
  const limites = (vals) => {
    const min = Math.min(...vals), max = Math.max(...vals), rango = max - min || Math.abs(max) || 1;
    // Si los datos no rozan el cero, el eje no empieza en cero: se deja un 20 % de margen.
    if (min <= 0 || min < 0.35 * max) return '';
    const paso = 10 ** Math.floor(Math.log10(rango / 2));
    return `<c:min val="${Math.floor((min - rango * 0.2) / paso) * paso}"/>`;
  };
  // En el eje X se añade aire a la derecha para que quepan las etiquetas de los puntos.
  const xs = puntos.map((p) => p.x), rx = Math.max(...xs) - Math.min(...xs) || 1, px = 10 ** Math.floor(Math.log10(rx / 2));
  const maxX = `<c:max val="${Math.ceil((Math.max(...xs) + rx * 0.25) / px) * px}"/>`;
  const bordes = { 10: maxX + limites(xs), 20: limites(puntos.map((p) => p.y)) };
  const eje = (id, cruce, pos, d) => `<c:valAx><c:axId val="${id}"/><c:scaling><c:orientation val="minMax"/>${bordes[id]}</c:scaling><c:delete val="0"/><c:axPos val="${pos}"/>${pos === 'l' ? `<c:majorGridlines><c:spPr>${linea(REJILLA, 6350)}</c:spPr></c:majorGridlines>` : ''}<c:title><c:tx><c:rich><a:bodyPr${pos === 'l' ? ' rot="-5400000" vert="horz"' : ''}/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="850" b="0">${relleno(TINTA_2)}</a:defRPr></a:pPr><a:r><a:rPr lang="es-ES" sz="850" b="0">${relleno(TINTA_2)}</a:rPr><a:t>${xmlTexto(d.nombre)}</a:t></a:r></a:p></c:rich></c:tx><c:overlay val="0"/></c:title><c:numFmt formatCode="${xmlTexto(d.formato || 'General')}" sourceLinked="0"/><c:majorTickMark val="none"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/><c:spPr>${pos === 'b' ? linea(GRIS) : '<a:ln><a:noFill/></a:ln>'}</c:spPr>${txPr(850)}<c:crossAx val="${cruce}"/><c:crosses val="autoZero"/><c:crossBetween val="midCat"/></c:valAx>`;
  const area = `<c:scatterChart><c:scatterStyle val="lineMarker"/><c:varyColors val="0"/>${sers}<c:axId val="10"/><c:axId val="20"/></c:scatterChart>${eje(10, 20, 'b', def.x)}${eje(20, 10, 'l', def.y)}`;
  return envolver(def, titulo, area, false);
}

// Libro de Excel mínimo con los datos del gráfico (para «Editar datos» en Word).
function libroExcel(filas) {
  const celda = (v, c, f) => {
    const r = `${col(c)}${f}`;
    if (v === null || v === undefined || v === '') return '';
    return typeof v === 'number' ? `<c r="${r}"><v>${v}</v></c>` : `<c r="${r}" t="inlineStr"><is><t>${xmlTexto(v)}</t></is></c>`;
  };
  const hoja = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetData>${filas.map((fila, i) => `<row r="${i + 1}">${fila.map((v, c) => celda(v, c, i + 1)).join('')}</row>`).join('')}</sheetData></worksheet>`;
  return escribirZip(new Map([
    ['[Content_Types].xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>'],
    ['_rels/.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'],
    ['xl/workbook.xml', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="Hoja1" sheetId="1" r:id="rId1"/></sheets></workbook>'],
    ['xl/_rels/workbook.xml.rels', '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/></Relationships>'],
    ['xl/worksheets/sheet1.xml', hoja],
  ]));
}

// ───────────────────────────── CLI ─────────────────────────────

function args(argv) {
  const a = {};
  for (let i = 0; i < argv.length; i++) if (argv[i].startsWith('--')) a[argv[i].slice(2)] = argv[i + 1];
  return a;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const a = args(process.argv.slice(2));
  if (!a.plantilla || !a.datos || !a.salida) {
    console.error('Uso: node rellenar.mjs --plantilla plantilla.docx --datos datos.json --salida informe.docx [--graficos graficos.json]');
    process.exit(1);
  }
  const datos = JSON.parse(readFileSync(a.datos, 'utf8'));
  const graficos = a.graficos ? JSON.parse(readFileSync(a.graficos, 'utf8')) : undefined;
  const r = rellenar(readFileSync(a.plantilla), datos, { graficos });
  writeFileSync(a.salida, r.buffer);
  console.log(`Informe: ${a.salida}`);
  console.log(`Gráficos dibujados: ${r.graficos}`);
  console.log(`Cobertura de campos: ${r.cobertura.cobertura} %  ·  secciones por debajo del 60 %: ${r.cobertura.secciones_flojas}`);
  if (r.avisos.length) {
    console.log(`\nAvisos (${r.avisos.length}):`);
    r.avisos.forEach((x) => console.log(`  - ${x}`));
  } else console.log('Sin avisos.');
}
