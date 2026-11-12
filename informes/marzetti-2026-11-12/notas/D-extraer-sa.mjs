// D: extrae campos de las páginas de Stock Analysis descargadas (statistics + forecast)
import fs from 'node:fs';
const dir = new URL('./docs/', import.meta.url);
const tick = ['mzti', 'mkc', 'hrl', 'sjm', 'cag', 'gis', 'khc', 'cpb', 'bgs', 'post', 'smpl', 'jjsf'];
const campo = (t, et) => { const m = t.match(new RegExp('\\n\\s*' + et.replace(/[()/]/g, '\\$&') + '\\s*\\|\\s*([^\\n]+)')); return m ? m[1].trim() : null; };
const out = {};
for (const k of tick) {
  const s = fs.readFileSync(new URL(k === 'mzti' ? 'D-sa-stats.txt' : `D-sa-stats-${k}.txt`, dir), 'utf8');
  const f = fs.readFileSync(new URL(k === 'mzti' ? 'D-sa-forecast.txt' : `D-sa-fc-${k}.txt`, dir), 'utf8');
  const precio = (s.match(/USD\s*\n[^\n]*\n\s*([\d.,]+)\s*\n/) || [])[1];
  const close = (s.match(/At close: ([^\n]+)/) || [])[1];
  const r = { precio, close };
  for (const et of ['Market Cap', 'Enterprise Value', 'Shares Outstanding', 'PE Ratio', 'Forward PE', 'EV / Sales', 'EV / EBITDA', 'Debt / EBITDA', 'Return on Invested Capital (ROIC)', 'EBITDA Margin', 'FCF Yield', 'Revenue', 'EBITDA', 'Cash & Cash Equivalents', 'Total Debt', 'Net Cash', 'Free Cash Flow', 'Earnings Per Share (EPS)', 'Short % of Shares Out']) r[et] = campo(s, et);
  r.ev_texto = (s.match(/enterprise value is ([^.]+\.\d+ \w+|[^.]+)\./) || [])[1];
  // forecast
  r.fy_row = (f.match(/Period Ending \| ([^\n]+)/) || [])[1];
  r.rev_row = (f.match(/\nRevenue\n\s*\| ([^\n]+)/) || [])[1];
  r.eps_row = (f.match(/\nEPS\n\s*\| ([^\n]+)/) || [])[1];
  r.eps_this = (f.match(/EPS This Year\n\s*([^\n]+)/) || [])[1];
  r.eps_next = (f.match(/EPS Next Year\n\s*([^\n]+)/) || [])[1];
  r.rev_this = (f.match(/Revenue This Year\n\s*([^\n]+)/) || [])[1];
  r.rev_next = (f.match(/Revenue Next Year\n\s*([^\n]+)/) || [])[1];
  r.base = /non-GAAP adjusted/.test(f) ? 'ajustado' : 'GAAP?';
  r.updated = (f.match(/Last updated: ([^\n.]+)/) || [])[1];
  r.pt = (f.match(/average price target of \$([\d.,]+)/) || [])[1];
  out[k] = r;
}
fs.writeFileSync(new URL('./D-sa-extracto.json', import.meta.url), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
