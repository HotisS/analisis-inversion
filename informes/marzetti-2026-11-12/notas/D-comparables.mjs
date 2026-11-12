// D: comparables a 11-nov-2026 desde Stock Analysis (S&P Global). NTM = ponderación de ejercicios por meses.
import fs from 'node:fs';
const x = JSON.parse(fs.readFileSync(new URL('./D-sa-extracto.json', import.meta.url), 'utf8'));
const num = (s) => { if (s == null) return null; s = String(s).replace(/[$,%]/g, ''); const m = s.match(/(-?[\d.]+)([BMK]?)/); if (!m) return null; return +m[1] * (m[2] === 'B' ? 1000 : m[2] === 'K' ? 0.001 : 1); };
const par = (s) => (s || '').split(' from ').map(num); // [este, anterior]
// w = peso del ejercicio "this year" de SA en los próximos 12 meses (desde 12-nov-2026); null = el "this year" ya cerró: NTM = next year
const w = { mzti: 7.6 / 12, mkc: 0.6 / 12, hrl: null, sjm: 5.6 / 12, cag: 6.6 / 12, gis: 6.6 / 12, khc: 1.6 / 12, cpb: 8.6 / 12, bgs: 1.6 / 12, post: null, smpl: 9.6 / 12, jjsf: null };
const nombres = { mzti: 'Marzetti', mkc: 'McCormick', hrl: 'Hormel Foods', sjm: 'J.M. Smucker', cag: 'Conagra Brands', gis: 'General Mills', khc: 'Kraft Heinz', cpb: "Campbell's", bgs: 'B&G Foods', post: 'Post Holdings', smpl: 'Simply Good Foods', jjsf: 'J&J Snack Foods' };
const filas = [];
for (const [k, r] of Object.entries(x)) {
  const [eps1] = par(r.eps_this); const [eps2] = par(r.eps_next);
  const [rev1] = par(r.rev_this); const [rev2] = par(r.rev_next);
  const ww = w[k];
  const epsN = ww == null ? eps2 : ww * eps1 + (1 - ww) * eps2;
  const revN = ww == null ? rev2 : ww * rev1 + (1 - ww) * rev2;
  const precio = num(r.precio), cap = num(r['Market Cap']), ev = num(r['Enterprise Value']);
  const revL = num(r.Revenue), ebitda = num(r.EBITDA), netcash = num(r['Net Cash']), fcf = num(r['Free Cash Flow']);
  filas.push({
    k, nombre: nombres[k], ticker: k.toUpperCase(), precio, capitalizacion: Math.round(cap), ev: Math.round(ev),
    ev_ventas: +(ev / revL).toFixed(2), ev_ebitda_ltm: +(ev / ebitda).toFixed(1),
    per_ntm: +(precio / epsN).toFixed(1), bpa_ntm: +epsN.toFixed(2), ventas_ntm: Math.round(revN), ventas_ltm: Math.round(revL),
    crecimiento_pct: +((revN / revL - 1) * 100).toFixed(1), margen_ebitda_pct: num(r['EBITDA Margin']), roic_pct: num(r['Return on Invested Capital (ROIC)']),
    dn_ebitda: +(-netcash / ebitda).toFixed(1), fcf_yield_pct: +(fcf / cap * 100).toFixed(1), consenso_actualizado: (r.updated || '').split(' Price')[0],
  });
}
console.table(filas.map(({ k, nombre, ...f }) => ({ k, ...f })));
fs.writeFileSync(new URL('./D-comparables.json', import.meta.url), JSON.stringify(filas, null, 1));
