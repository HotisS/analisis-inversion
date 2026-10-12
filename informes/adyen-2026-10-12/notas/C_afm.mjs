import fs from 'fs';
const txt = fs.readFileSync(process.argv[2], 'latin1');
const emisor = (process.argv[3] || 'Adyen N.V.').toLowerCase();
const filas = txt.split(/\r?\n/).map(l => l.replace(/^"|"$/g, '').split('";"'));
const res = new Map();
for (const f of filas) {
  if (!f[1] || f[1].toLowerCase() !== emisor) continue;
  const clave = f[2] + ' | ' + f[0].slice(0, 10) + ' | ' + f[14];
  if (!res.has(clave)) res.set(clave, `tot=${f[15]} dirR=${f[16]} dirP=${f[17]} indR=${f[18]} indP=${f[19]}`);
}
const porPersona = new Map();
for (const [k, v] of [...res].sort((a, b) => b[0].split(' | ')[1].localeCompare(a[0].split(' | ')[1]))) {
  const p = k.split(' | ')[0];
  const n = (porPersona.get(p) || 0);
  if (n < 4) console.log(k, '=>', v);
  porPersona.set(p, n + 1);
}
