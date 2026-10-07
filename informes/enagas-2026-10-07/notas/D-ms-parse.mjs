// Extrae tablas anuales y semestrales de las páginas de MarketScreener descargadas (texto).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'docs');
const num = s => { s = s.trim(); if (s === '-' || s === '') return null; const v = parseFloat(s.replace(/,/g, '').replace(/[x%]$/, '')); return isNaN(v) ? undefined : v; };

function bloques(lines) {
  // devuelve lista de {periodos, filas:{label:[valores]}}
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (!/Fiscal Period:/.test(lines[i])) continue;
    const per = []; let j = i + 1;
    while (j < lines.length && /^(\d{4}( Q\d| S\d)?|FY\d{4}|\d{4} S\d)$/.test(lines[j])) { per.push(lines[j]); j++; }
    if (!per.length) continue;
    const filas = {};
    while (j < lines.length && !/Fiscal Period:/.test(lines[j]) && !/^(Projected|Forecast|Valuation ratios|Ratings)/.test(lines[j])) {
      const lab = lines[j];
      if (/[A-Za-z]/.test(lab) && !/^\d/.test(lab)) {
        let k = j + 1; const vals = [];
        if (lines[k] === '1' || lines[k] === '2') k++;
        while (k < lines.length && vals.length < per.length) { const v = num(lines[k]); if (v === undefined) break; vals.push(v); k++; }
        if (vals.length === per.length && !(lab in filas)) filas[lab] = vals;
        j = vals.length === per.length ? k : j + 1;
      } else j++;
    }
    out.push({ periodos: per, filas });
  }
  return out;
}
export function leer(nombre) {
  const t = fs.readFileSync(path.join(dir, nombre + '.txt'), 'utf8').split(/\r?\n/).map(s => s.trim()).filter(Boolean);
  const precio = (() => { const i = t.findIndex(l => /^\d[\d,.]*\s+(EUR|GBX|GBP|USD)$/.test(l)); return i >= 0 ? t[i] : null; })();
  return { precio, bloques: bloques(t) };
}
if (process.argv[2]) {
  const r = leer(process.argv[2]);
  console.log('precio', r.precio);
  for (const b of r.bloques) { console.log(b.periodos.join(' ')); for (const [k, v] of Object.entries(b.filas)) console.log('  ', k, JSON.stringify(v)); }
}
