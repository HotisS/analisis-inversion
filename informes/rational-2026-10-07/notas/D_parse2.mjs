import { readFileSync } from 'node:fs';
const toks = f => readFileSync(f, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
const num = s => { if (s == null || s === '-') return null; const v = parseFloat(s.replace(/,/g, '').replace(/x$|%$/, '')); return isNaN(v) ? null : v; };
const isv = v => v === '-' || /^-?[\d.,]+[x%]?$/.test(v);
export function todo(f) {
  const t = toks(f); const filas = {}; let anios = null, mes = null;
  t.forEach((s, i) => {
    if (!/Fiscal Period:/.test(s)) return;
    const a = []; let k = i + 1; while (/^\d{4}$/.test(t[k])) a.push(t[k++]);
    if (!a.length) return; if (!anios) { anios = a; mes = s.replace(/.*Fiscal Period:/, '').trim(); }
    for (let j = k; j < t.length && j < k + 400; j++) {
      const lab = t[j]; if (/Fiscal Period/.test(lab) || /^\d{4} Q\d$/.test(lab)) break;
      if (/^[A-Za-z]/.test(lab) && !(lab in filas)) {
        let q = j + 1; if (/^\d$/.test(t[q]) && isv(t[q + 1] ?? '')) q++;
        const vals = t.slice(q, q + a.length);
        if (vals.length === a.length && vals.every(isv)) filas[lab] = Object.fromEntries(a.map((y, n) => [y, num(vals[n])]));
      }
    }
  });
  const precio = t[t.findIndex(s => s === '1st Jan Change') + 1];
  const unidad = (t.find(s => /^\d[A-Z]{3} in /.test(s)) || '').slice(1);
  return { mes, anios, filas, precio, unidad };
}
if (process.argv[2]) { const r = todo(process.argv[2]); console.log(r.mes, r.precio, r.unidad, r.anios?.join(' ')); for (const [l, v] of Object.entries(r.filas)) console.log(l.padEnd(28), Object.values(v).join(' ')); }
