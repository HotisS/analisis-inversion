// D: lleva los comparables del 6-oct-2026 (informe anterior) al cierre del 22-oct-2026 con la variación de precio (Yahoo).
import { readFileSync, writeFileSync } from 'node:fs';
const prev = JSON.parse(readFileSync('previo/datos-anterior.json', 'utf8')).comparables.empresas;
const px = JSON.parse(readFileSync('D_comps_precios.json', 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10, r2 = (x) => Math.round(x * 100) / 100;
const out = prev.map((e) => {
  const p = px[e.ticker]; const loc = p.last / p.p0[1]; const eur = loc * p.fx_var;
  const ev0 = e.capitalizacion / (1 - e.dn_ebitda / e.ev_ebitda_ltm); const k = (ev0 + e.capitalizacion * (loc - 1)) / ev0;
  return { ...e, capitalizacion: Math.round(e.capitalizacion * eur), ev_ventas: r2(e.ev_ventas * k), ev_ebitda_ltm: r1(e.ev_ebitda_ltm * k), ev_ebitda_ntm: r1(e.ev_ebitda_ntm * k), per_ntm: r1(e.per_ntm * loc), fcf_yield_pct: r2(e.fcf_yield_pct / loc), _var_precio_pct: r1((loc - 1) * 100) };
});
writeFileSync('D_comps.json', JSON.stringify(out, null, 1));
const med = (a) => { a = [...a].sort((x, y) => x - y); const n = a.length; return n % 2 ? a[(n - 1) / 2] : (a[n / 2 - 1] + a[n / 2]) / 2; };
console.log(out.map((e) => `${e.ticker} ${e._var_precio_pct}% cap ${e.capitalizacion} ltm ${e.ev_ebitda_ltm} ntm ${e.ev_ebitda_ntm} per ${e.per_ntm}`).join('\n'));
console.log('medianas ntm', med(out.map((e) => e.ev_ebitda_ntm)), 'per', med(out.map((e) => e.per_ntm)));
