// D: movimiento del precio al cierre del 21-oct-2026 con el CSV de Euronext (Yahoo aún no tiene ese cierre).
import { readFileSync } from 'node:fs';
const csv = readFileSync(new URL('./docs/D_euronext_RMS.csv', import.meta.url), 'utf8').split(/\r?\n/).slice(4).filter(Boolean);
const pts = csv.map((l) => { const c = l.split(';'); const [d, m, a] = c[0].split('/'); return [`${a}-${m}-${d}`, +c[5]]; }).sort((x, y) => (x[0] < y[0] ? -1 : 1));
const corte = '2026-10-21';
const p = pts.filter((q) => q[0] <= corte);
const ult = p[p.length - 1];
const haceN = (dias) => { const f = new Date(ult[0]); f.setDate(f.getDate() - dias); const s = f.toISOString().slice(0, 10); return p.filter((q) => q[0] <= s).pop(); };
const v = (a) => +((ult[1] / a[1] - 1) * 100).toFixed(1);
const u52 = p.filter((q) => q[0] > '2025-10-21');
const mx = Math.max(...u52.map((q) => q[1])), mn = Math.min(...u52.map((q) => q[1]));
const med = (n) => p.slice(-n).reduce((s, q) => s + q[1], 0) / n;
const r = p.slice(-61).map((q, i, a) => (i ? Math.log(q[1] / a[i - 1][1]) : null)).slice(1);
const mu = r.reduce((s, x) => s + x, 0) / r.length;
const vol = Math.sqrt(r.reduce((s, x) => s + (x - mu) ** 2, 0) / (r.length - 1) * 252) * 100;
console.log({ ult, v1m: v(haceN(30)), v3m: v(haceN(91)), v6m: v(haceN(182)), v12m: v(haceN(365)), max52: mx, min52: mn, dmax: +((ult[1] / mx - 1) * 100).toFixed(1), dmin: +((ult[1] / mn - 1) * 100).toFixed(1), m50: med(50).toFixed(1), m200: med(200).toFixed(1), dm200: +((ult[1] / med(200) - 1) * 100).toFixed(1), vol60: vol.toFixed(1) });
// meses móviles de 6 meses: mayor subida y caída en ~21 sesiones
const u6 = p.filter((q) => q[0] > '2026-04-21');
let best = [0], worst = [0];
for (let i = 21; i < u6.length; i++) { const x = u6[i][1] / u6[i - 21][1] - 1; if (x > best[0]) best = [x, u6[i - 21][0], u6[i][0]]; if (x < worst[0]) worst = [x, u6[i - 21][0], u6[i][0]]; }
console.log('mayor subida 1m', best, 'mayor caida 1m', worst);
console.log('días ≤ -5 %:', p.filter((q, i) => i && q[0] > '2026-04-21' && q[1] / p[i - 1][1] - 1 <= -0.05).map((q) => q[0]));
