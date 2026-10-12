// Lector mínimo de .xlsx: vuelca cada hoja como filas separadas por " | ".
// Uso: node A_xlsx.mjs archivo.xlsx
import { readFileSync } from 'node:fs';
import { inflateRawSync } from 'node:zlib';

const buf = readFileSync(process.argv[2]);
// Directorio central
let eocd = buf.lastIndexOf(Buffer.from([0x50, 0x4b, 0x05, 0x06]));
const n = buf.readUInt16LE(eocd + 10);
let off = buf.readUInt32LE(eocd + 16);
const files = {};
for (let i = 0; i < n; i++) {
  const comp = buf.readUInt16LE(off + 10);
  const csize = buf.readUInt32LE(off + 20);
  const nl = buf.readUInt16LE(off + 28), el = buf.readUInt16LE(off + 30), cl = buf.readUInt16LE(off + 32);
  const lho = buf.readUInt32LE(off + 42);
  const name = buf.slice(off + 46, off + 46 + nl).toString();
  const lnl = buf.readUInt16LE(lho + 26), lel = buf.readUInt16LE(lho + 28);
  const data = buf.slice(lho + 30 + lnl + lel, lho + 30 + lnl + lel + csize);
  files[name] = comp === 8 ? inflateRawSync(data).toString('utf8') : data.toString('utf8');
  off += 46 + nl + el + cl;
}
const dec = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, '&');
const shared = [];
if (files['xl/sharedStrings.xml']) {
  for (const m of files['xl/sharedStrings.xml'].matchAll(/<si>([\s\S]*?)<\/si>/g)) {
    shared.push(dec([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join('')));
  }
}
const wb = files['xl/workbook.xml'] || '';
const names = [...wb.matchAll(/<sheet [^>]*name="([^"]*)"/g)].map((m) => m[1]);
const sheets = Object.keys(files).filter((k) => /^xl\/worksheets\/sheet\d+\.xml$/.test(k)).sort((a, b) => parseInt(a.match(/\d+/)[0]) - parseInt(b.match(/\d+/)[0]));
sheets.forEach((s, i) => {
  console.log(`##### Hoja ${names[i] || s}`);
  for (const r of files[s].matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)) {
    const cells = [];
    for (const c of r[1].matchAll(/<c ([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
      const attrs = c[1], inner = c[2] || '';
      const t = (attrs.match(/t="([^"]*)"/) || [])[1];
      const ref = (attrs.match(/r="([^"]*)"/) || [])[1];
      let v = (inner.match(/<v>([\s\S]*?)<\/v>/) || [])[1];
      if (t === 's' && v !== undefined) v = shared[+v];
      else if (t === 'inlineStr') v = dec([...inner.matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((x) => x[1]).join(''));
      else if (v !== undefined && /^-?[\d.E+-]+$/.test(v)) v = String(Math.round(+v * 1000) / 1000);
      if (v !== undefined && v !== '') cells.push(`${ref}=${v}`);
    }
    if (cells.length) console.log(cells.join(' | '));
  }
});
