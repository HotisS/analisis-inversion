// Nota D: lleva los comparables del 14-oct al cierre del 21-oct (precio local) y la capitalización con el tipo del BCE del 21-oct.
import { readFileSync, writeFileSync } from 'node:fs';
const ruta = new URL('./D.json', import.meta.url);
const D = JSON.parse(readFileSync(ruta, 'utf8'));
const px = { AMAT: [446.63, 408.94, 1], ASM: [824.8, 760, 1.1234 / 1.1208], MKSI: [234.5, 216.1, 1], VACN: [635, 606, (1.1234 / 0.9256) / (1.1208 / 0.9305)], IFCN: [190, 174.6, (1.1234 / 0.9256) / (1.1208 / 0.9305)] };
const r = (x, d = 1) => (x == null ? null : Math.round(x * 10 ** d) / 10 ** d);
D.comparables.empresas = D.comparables.empresas.map((e) => {
  if (e.ticker === 'KLAC') {
    // Stock Analysis, statistics y forecast a 21-oct-2026 (cierre 163,43 USD); NTM EBITDA no publicado gratis.
    return { nombre: 'KLA', ticker: 'KLAC', pais: 'US', capitalizacion: 213210, ev_ventas: 15.77, ev_ebitda_ltm: 35.4, ev_ebitda_ntm: null, per_ntm: 30.0, crecimiento_pct: 33.6, margen_ebitda_pct: 44.6, roic_pct: 66.8, dn_ebitda: 0.21, fcf_yield_pct: 1.8 };
  }
  const p = px[e.ticker];
  if (!p) return e;
  const v = p[1] / p[0];
  return { ...e, capitalizacion: Math.round(e.capitalizacion * v * p[2]), ev_ventas: r(e.ev_ventas * v, 2), ev_ebitda_ltm: r(e.ev_ebitda_ltm * v), ev_ebitda_ntm: r(e.ev_ebitda_ntm * v), per_ntm: r(e.per_ntm * v), fcf_yield_pct: r(e.fcf_yield_pct / v) };
});
writeFileSync(ruta, JSON.stringify(D, null, 2));
const per = D.comparables.empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
console.log(D.comparables.empresas.map((e) => `${e.ticker} ${e.capitalizacion} PER ${e.per_ntm} EV/EBITDA ${e.ev_ebitda_ltm}/${e.ev_ebitda_ntm}`).join('\n'));
console.log('mediana PER NTM', per.length % 2 ? per[(per.length - 1) / 2] : (per[per.length / 2 - 1] + per[per.length / 2]) / 2);
