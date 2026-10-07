import { readFileSync } from 'node:fs';
const toks = f => readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const num = s => { if (s == null || s === '-' ) return null; const m = s.replace(/,/g, '').replace(/x$|%$/, ''); const v = parseFloat(m); return isNaN(v) ? null : v; };
export function tabla(f, start = 0) {
  const t = toks(f);
  let i = t.findIndex((s, k) => k >= start && /^Fiscal Period:/.test(s));
  if (i < 0) return null;
  const mes = t[i].replace('Fiscal Period:', '').trim();
  const anios = []; let k = i + 1; while (/^\d{4}$/.test(t[k])) anios.push(t[k++]);
  const filas = {}; const n = anios.length;
  for (let j = k; j < t.length && j < k + 600; j++) {
    const lab = t[j];
    if (/^\d{4}( Q\d| S\d)?$/.test(lab) || /^Fiscal Period/.test(lab)) break;
    if (/^[A-Za-z]/.test(lab) && !(lab in filas)) {
      let q = j + 1; if (/^\d$/.test(t[q]) && (t[q+1] === '-' || /^-?[\d.,]+[x%]?$/.test(t[q+1]))) q++;
      const vals = t.slice(q, q + n);
      if (vals.every(v => v === '-' || /^-?[\d.,]+[x%]?$/.test(v))) filas[lab] = vals.map(num);
    }
  }
  const unidad = (t.find(s => /^\d[A-Z]{3} in /.test(s)) || '').slice(1);
  const precio = t[t.findIndex(s => s === '1st Jan Change') + 1];
  return { mes, anios, filas, unidad, precio, fin: k };
}
const [, , f, ...labs] = process.argv;
if (f) { const r = tabla(f); console.log(r.mes, '|', r.precio, '|', r.unidad); console.log('años', r.anios.join(' ')); for (const l of Object.keys(r.filas)) if (!labs.length || labs.some(x => l.startsWith(x))) console.log(l.padEnd(30), r.filas[l].join(' ')); }
