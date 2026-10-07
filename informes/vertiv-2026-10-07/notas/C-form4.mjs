// Subagente C: descarga y resume los Form 4 de Vertiv de los últimos 12 meses (EDGAR, XML crudo).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const s = JSON.parse(fs.readFileSync(path.join(dir, 'docs', 'submissions.json'), 'utf8'));
const r = s.filings.recent;
const UA = { 'User-Agent': 'analisis-inversion (uso personal, investigacion)' };
const desde = process.argv[2] || '2025-10-07';
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
const tag = (x, t) => { const m = x.match(new RegExp(`<${t}>\\s*(?:<value>)?\\s*([^<]*)`)); return m ? m[1].trim() : null; };
const out = [];
for (let i = 0; i < r.form.length; i++) {
  if (!(r.form[i] === '4' || r.form[i] === '4/A') || r.filingDate[i] < desde) continue;
  const acc = r.accessionNumber[i].replace(/-/g, '');
  const doc = r.primaryDocument[i].split('/').pop();
  const url = `https://www.sec.gov/Archives/edgar/data/1674101/${acc}/${doc}`;
  await sleep(150);
  const res = await fetch(url, { headers: UA });
  if (!res.ok) { out.push({ url, error: res.status }); continue; }
  const x = await res.text();
  const nombre = tag(x, 'rptOwnerName');
  const cargo = tag(x, 'officerTitle') || (/<isDirector>\s*(1|true)/.test(x) ? 'Director' : '');
  const plan = /10b5-1/i.test(x) || /<aff10b5One>\s*(1|true)/.test(x);
  const trs = x.split('<nonDerivativeTransaction>').slice(1);
  for (const t of trs) {
    out.push({
      presentado: r.filingDate[i], form: r.form[i], url, nombre, cargo, plan10b51: plan,
      fecha: tag(t, 'transactionDate'), codigo: tag(t, 'transactionCode'),
      acciones: Number(tag(t, 'transactionShares')), precio: Number(tag(t, 'transactionPricePerShare')) || null,
      ad: tag(t, 'transactionAcquiredDisposedCode'), tras: Number(tag(t, 'sharesOwnedFollowingTransaction')),
    });
  }
  const der = x.split('<derivativeTransaction>').slice(1);
  for (const t of der) {
    out.push({
      presentado: r.filingDate[i], form: r.form[i], url, nombre, cargo, derivado: tag(t, 'securityTitle'),
      fecha: tag(t, 'transactionDate'), codigo: tag(t, 'transactionCode'),
      acciones: Number(tag(t, 'transactionShares')), precio: Number(tag(t, 'transactionPricePerShare')) || null,
      ad: tag(t, 'transactionAcquiredDisposedCode'),
    });
  }
}
fs.writeFileSync(path.join(dir, 'C-form4.json'), JSON.stringify(out, null, 1));
console.log('operaciones:', out.length);
