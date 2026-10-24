// A: extrae valores trimestrales (3 meses) y anuales de companyfacts de UEC
import fs from 'fs';
const f = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const conceptos = (process.argv[3] || '').split(',');
const ug = { ...f.facts['us-gaap'], ...(f.facts['uec'] || {}) };
if (process.argv[4] === 'buscar') {
  for (const ns of Object.keys(f.facts)) for (const k of Object.keys(f.facts[ns])) if (new RegExp(conceptos[0], 'i').test(k)) console.log(ns, k);
  process.exit(0);
}
for (const c of conceptos) {
  const x = ug[c]; if (!x) { console.log(c, 'NO'); continue; }
  const unidades = Object.keys(x.units);
  for (const u of unidades) {
    const vistos = new Map();
    for (const v of x.units[u]) {
      if (!v.end || v.end < '2024-08-01') continue;
      const dias = v.start ? (new Date(v.end) - new Date(v.start)) / 864e5 : 0;
      const tipo = !v.start ? 'inst' : dias < 100 ? '3m' : dias < 200 ? '6m' : dias < 290 ? '9m' : '12m';
      const k = v.end + ' ' + tipo;
      if (!vistos.has(k)) vistos.set(k, v.val);
    }
    console.log('##', c, u);
    for (const [k, val] of [...vistos].sort()) console.log('  ', k, u === 'USD' ? (val / 1e6).toFixed(2) : val);
  }
}
