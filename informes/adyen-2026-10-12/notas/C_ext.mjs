import fs from 'fs';
const h = fs.readFileSync(process.argv[2], 'utf8');
const re = /https:\/\/brand\.adyen\.com\/api\/asset\/([A-Za-z0-9_-]+)[^"\\]*/g;
let m; const seen = new Set();
while ((m = re.exec(h))) {
  if (seen.has(m[0])) continue; seen.add(m[0]);
  let j = ''; try { j = Buffer.from(m[1], 'base64').toString(); } catch {}
  const id = (j.match(/"id":(\d+)/) || [])[1];
  const ts = (j.match(/"timestamp":(\d+)/) || [])[1];
  const ctx = h.slice(Math.max(0, m.index - 300), m.index).replace(/\s+/g, ' ').replace(/[{}"]/g, '');
  console.log(id, ts ? new Date(ts * 1000).toISOString().slice(0, 10) : '', '|', ctx.slice(-170));
  console.log('    ', m[0]);
}
