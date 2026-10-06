import { readFileSync } from 'node:fs';
const s = JSON.parse(readFileSync('docs/A_submissions.json','utf8'));
const r = s.filings.recent;
console.log(s.name, r.form.length, 'files; oldest', r.filingDate[r.form.length-1], 'extra files', JSON.stringify(s.filings.files));
const forms = process.argv.slice(2);
for (let i=0;i<r.form.length;i++){ if(forms.includes(r.form[i])) console.log(r.filingDate[i], r.form[i], r.accessionNumber[i], r.primaryDocument[i], r.items?.[i]||'', r.reportDate[i]); }
