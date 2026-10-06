// Lee las páginas /finances/ de MarketScreener guardadas en docs/D_ms_fin_<x>.txt y extrae las tablas ANUALES
// (cuenta, deuda neta, flujos, ratios, por acción). Uso: node D_ms_parse.mjs hm fr ... -> imprime y guarda docs/D_ms_fin_<x>.json
import { readFileSync, writeFileSync } from 'node:fs';
const num = s => { s = s.trim().replace(/,/g, '').replace(/x$/, ''); if (s === '-') return null; const pc = s.endsWith('%'); const v = parseFloat(pc ? s.slice(0, -1) : s); return isNaN(v) ? undefined : v; };
export function parse(txt) {
  const L = txt.split('\n').map(s => s.trim()).filter(s => s && s !== '|' && !/^\|( \|)*$/.test(s));
  const out = { tablas: [], unidad: null, nota: [] };
  const mU = txt.match(/1([A-Z]{3}) in (Million|Billion|Thousand)/); if (mU) out.unidad = mU[1] + ' ' + mU[2];
  for (let i = 0; i < L.length; i++) {
    if (!L[i].startsWith('Fiscal Period:')) continue;
    const per = []; let j = i + 1;
    while (j < L.length && /^\d{4}( (Q\d|S\d))?$/.test(L[j])) per.push(L[j++]);
    if (!per.length || per.some(p => / /.test(p))) continue; // solo tablas anuales
    const filas = {};
    while (j < L.length && !L[j].startsWith('Announcement Date') && !L[j].startsWith('Fiscal Period')) {
      const lab = L[j]; j++;
      if (num(lab) !== undefined) continue;
      if (L[j] === '1') j++;
      const vals = [];
      while (vals.length < per.length && j < L.length && num(L[j]) !== undefined) vals.push(num(L[j++]));
      if (vals.length === per.length) filas[lab] = vals;
    }
    let ann = null; if (L[j] && L[j].startsWith('Announcement Date')) ann = L.slice(j + 1, j + 1 + per.length);
    out.tablas.push({ fiscal: L[i], per, filas, anuncio: ann });
  }
  return out;
}
if (process.argv[1].endsWith('D_ms_parse.mjs')) for (const x of process.argv.slice(2)) {
  const t = readFileSync(new URL(`./docs/D_ms_fin_${x}.txt`, import.meta.url), 'utf8');
  const p = parse(t); writeFileSync(new URL(`./docs/D_ms_fin_${x}.json`, import.meta.url), JSON.stringify(p, null, 1));
  console.log('=====', x, p.unidad, p.tablas[0]?.fiscal);
  for (const tb of p.tablas) { console.log(tb.per.join(' '), '| anuncio', (tb.anuncio || []).join(' ')); for (const [k, v] of Object.entries(tb.filas)) if (!/^Change|Margin|^ROA|^ROE|^CAPEX \/|^FCF \/|^EBT Margin|Net margin|Book Value|Cash flow per/.test(k)) console.log('  ', k.padEnd(28), v.join(' ')); }
}
