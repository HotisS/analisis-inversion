// Lee los Form 4 de docs/C_form4 y agrega las ventas (código S) por persona.
import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
const g = (x, t) => { const m = x.match(new RegExp(`<${t}>\\s*(?:<value>)?([^<]*)`)); return m ? m[1].trim() : null; };
const rows = [];
for (const f of readdirSync('docs/C_form4')) {
  const x = readFileSync('docs/C_form4/' + f, 'utf8');
  const name = g(x, 'rptOwnerName'), title = (g(x, 'officerTitle') || '').replace(/&amp;/g, '&'), dir = g(x, 'isDirector'), a105 = g(x, 'aff10b5One');
  const remarks = g(x, 'remarks') || '';
  const nd = (x.split('<nonDerivativeTable>')[1] || '').split('</nonDerivativeTable>')[0];
  for (const t of nd.split(/<nonDerivative(?:Transaction|Holding)>/).slice(1)) {
    if (!/transactionCode/.test(t)) continue;
    rows.push({ acc: f.replace('.xml', ''), name, title, remarks, dir, a105, date: g(t, 'transactionDate'), code: g(t, 'transactionCode'), sh: +g(t, 'transactionShares'), px: +g(t, 'transactionPricePerShare') || 0, ad: g(t, 'transactionAcquiredDisposedCode'), after: +g(t, 'sharesOwnedFollowingTransaction'), own: g(t, 'directOrIndirectOwnership') });
  }
}
rows.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
writeFileSync('C_scripts/form4_rows.json', JSON.stringify(rows, null, 1));
const codes = {}; rows.forEach(r => (codes[r.code] = (codes[r.code] || 0) + 1)); console.log(codes);
const per = {};
for (const r of rows.filter(r => r.code === 'S' || r.code === 'P')) {
  const k = r.name + ' | ' + r.code;
  per[k] = per[k] || { n: 0, sh: 0, usd: 0, first: r.date, last: r.date, a105: new Set(), title: r.title, dates: new Set(), after: 0 };
  const p = per[k]; p.n++; p.sh += r.sh; p.usd += r.sh * r.px; p.last = r.date; p.a105.add(r.a105); p.dates.add(r.date); p.after = r.after;
}
const out = [];
for (const [k, p] of Object.entries(per)) {
  out.push({ k, title: p.title, n: p.n, sh: p.sh, musd: +(p.usd / 1e6).toFixed(2), avg: +(p.usd / p.sh).toFixed(2), first: p.first, last: p.last, a105: [...p.a105].join(','), dias: [...p.dates].join(' ') });
}
out.sort((a, b) => b.musd - a.musd);
for (const o of out) console.log(JSON.stringify(o));
console.log('TOTAL M$', out.reduce((a, o) => a + o.musd, 0).toFixed(2), 'acciones', out.reduce((a, o) => a + o.sh, 0));
const otros = rows.filter(r => !['S', 'M', 'F'].includes(r.code));
console.log('Otros códigos:', JSON.stringify(otros));
