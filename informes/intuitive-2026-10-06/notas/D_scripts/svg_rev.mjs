// Lee las curvas de revisiones de MarketScreener (SVG de Highcharts) y da el valor en fechas dadas.
// Uso: node svg_rev.mjs archivo.xml
import { readFileSync } from 'node:fs';
const x = readFileSync(process.argv[2], 'utf8');
// Rejilla: líneas horizontales (y global -> valor) y verticales (x global -> fecha)
const grid = [...x.matchAll(/class="highcharts-grid-line" d="M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+)"/g)].map((m) => m.slice(1).map(Number));
const vert = grid.filter((g) => g[0] === g[2]).map((g) => g[0]);
const horz = grid.filter((g) => g[1] === g[3]).map((g) => g[1]);
// Etiquetas del eje Y (x=675) en orden de y descendente
const ylab = [...x.matchAll(/<text x="675"[^>]*y="([\d.]+)"[^>]*>([^<]*)<\/text>/g)].map((m) => [+m[1], m[2]]);
const allText = [...x.matchAll(/<text[^>]*>(.*?)<\/text>/gs)].map((m) => m[1].replace(/<[^>]+>/g, ''));
const nums = allText.filter((t) => /^-?[\d.,]+[kM]?$/.test(t.trim()));
const dates = allText.filter((t) => /^[A-Z][a-z]{2} \d{4}$/.test(t.trim()));
const series = allText.filter((t) => /^(EPS|Sales|Revenue|EBIT|Net sales|Turnover)/i.test(t.trim()));
console.log('vert', vert, 'horz', horz, 'nums', nums, 'dates', dates, 'series', series);
// translate del grupo de series
const tr = [...x.matchAll(/class="highcharts-series-group"[^>]*|class="highcharts-series highcharts-series-\d+[^"]*"[^>]*transform="translate\(([\d.]+),([\d.]+)\)/g)].filter((m) => m[1]).map((m) => [+m[1], +m[2]]);
console.log('translate', tr.slice(0, 3));
const [tx, ty] = tr[0] || [10, 25];
const paths = [...x.matchAll(/<path fill="none" d="(M [^"]+)"/g)].map((m) => m[1]);
const uniq = [...new Set(paths)].filter((d) => d.split('L').length > 20);
// Escalas
const hs = [...horz].sort((a, b) => b - a); // de abajo a arriba
const vals = nums.map((n) => +n.replace(/,/g, ''));
const y2v = (yg) => { const y0 = hs[0], y1 = hs[hs.length - 1]; const v0 = vals[0], v1 = vals[vals.length - 1]; return v0 + (y0 - yg) * (v1 - v0) / (y0 - y1); };
const vs = [...vert].sort((a, b) => a - b);
const d0 = new Date(dates[0] + ' 1 UTC'), d1 = new Date(dates[dates.length - 1] + ' 1 UTC');
const x2d = (xg) => new Date(d0.getTime() + (xg - vs[0]) * (d1 - d0) / (vs[vs.length - 1] - vs[0]));
const objetivo = (process.argv[3] || '2025-10-06,2026-01-06,2026-04-06,2026-07-06,2026-07-15,2026-07-20,2026-10-06').split(',');
uniq.forEach((d, k) => {
  const pts = [...d.matchAll(/([\d.]+) ([\d.]+)/g)].map((m) => [+m[1] + tx, +m[2] + ty]);
  const out = { serie: series[k] || k, primero: [x2d(pts[0][0]).toISOString().slice(0, 10), y2v(pts[0][1]).toFixed(3)], ultimo: [x2d(pts.at(-1)[0]).toISOString().slice(0, 10), y2v(pts.at(-1)[1]).toFixed(3)] };
  for (const f of objetivo) { const t = new Date(f + 'T00:00:00Z'); let best = null; for (const p of pts) if (x2d(p[0]) <= t) best = p; out[f] = best ? y2v(best[1]).toFixed(3) : null; }
  console.log(JSON.stringify(out));
});
