import { readFileSync, writeFileSync, existsSync } from 'node:fs';
const s = JSON.parse(readFileSync('docs/A_submissions.json','utf8')); const r = s.filings.recent;
const UA = { 'User-Agent': 'analisis-inversion (uso personal, investigacion) h.solescoda@gmail.com'.replace(/ h\.sol.*$/,'') };
const desde = '2025-10-06', hasta = '2026-10-06';
const sleep = ms => new Promise(x => setTimeout(x, ms));
for (let i=0;i<r.form.length;i++){
  if(!['4','4/A'].includes(r.form[i])) continue;
  if(r.filingDate[i]<desde||r.filingDate[i]>hasta) continue;
  const acc=r.accessionNumber[i]; const f=`docs/C_form4/${acc}.xml`;
  if(existsSync(f)) continue;
  const doc=r.primaryDocument[i].replace(/^xsl[^/]+\//,'');
  const url=`https://www.sec.gov/Archives/edgar/data/1035267/${acc.replace(/-/g,'')}/${doc}`;
  const res=await fetch(url,{headers:UA}); if(!res.ok){console.log('ERR',res.status,url); continue;}
  writeFileSync(f, await res.text()); await sleep(150);
}
console.log('ok');
