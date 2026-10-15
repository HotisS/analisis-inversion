// Prueba de conservadurismo (15-oct-2026): la regla vigente (motor/objetivo12m.mjs) con cada supuesto cambiado de uno en uno.
// En un informe NUEVO el PER actual se recalcula con el precio y el BPA 2027e; con el objetivo fijo (robustez), no.
// Uso: node informes/wolters-kluwer-2026-10-15/notas/conservadurismo.mjs
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { calcularObjetivo12m } from '../../../motor/objetivo12m.mjs';
const d = JSON.parse(readFileSync(fileURLToPath(new URL('../datos.json', import.meta.url)), 'utf8'));
const o0 = d.valoracion.objetivo_12m, precio0 = 78.06, dpa = 2.58, vi = 117.15;
const B = { bajista: 4.48, base: 5.87, alcista: 6.44, base27: 5.50 };
function caso({ precio = precio0, f = 1, f27 = null, prob = [35, 45, 20], mediana = 27.83, bpa28 = null } = {}) {
  const b27 = B.base27 * (f27 ?? f);
  const actual = precio / b27;
  const o = structuredClone(o0);
  const b = bpa28 || { Bajista: B.bajista * f, Base: B.base * f, Alcista: B.alcista * f };
  for (const c of o.casos) c.beneficio_por_accion = +b[c.escenario].toFixed(2);
  o.per_historico.actual = +actual.toFixed(2); o.per_historico.mediana_5a = mediana; o.per_historico.v2.actual = +actual.toFixed(2);
  const r = calcularObjetivo12m(o, { precio, dpa: dpa * precio / precio0, prob, valorIntrinseco: vi });
  const s = r.selector;
  return { pers: actual.toFixed(1), elige: s?.regla, v2: `${s.v2.rentabilidad_ponderada_pct}/${s.v2 && r.selector.v2 ? (r.version === 'v2' ? r.rentabilidad_base_pct : '') : ''}`, v2p: s.v2.rentabilidad_ponderada_pct, v3p: s.v3_sin_selector.rentabilidad_ponderada_pct, v3b: s.v3_sin_selector.rentabilidad_base_pct, vig: r.rentabilidad_ponderada_pct };
}
const filas = {
  'Informe tal cual (78,06)': caso(),
  'Pesos 25/50/25': caso({ prob: [25, 50, 25] }),
  'Pesos 30/50/20': caso({ prob: [30, 50, 20] }),
  'BPA de los tres casos +8 % (2027e y 2028e, ~consenso 2028e)': caso({ f: 1.08 }),
  'BPA 2028e base = consenso 6,34 (2027e igual)': caso({ bpa28: { Bajista: 4.48, Base: 6.34, Alcista: 6.95 } }),
  'BPA 2028e +16 % sobre 2027e': caso({ bpa28: { Bajista: 4.48 * 1.087, Base: 6.38, Alcista: 7.0 } }),
  'Precio 71,98 (informe nuevo a ese precio)': caso({ precio: 71.98 }),
  'Precio 86,00 (cambia el selector)': caso({ precio: 86.0 }),
  'BPA 2028e consenso + pesos 25/50/25': caso({ bpa28: { Bajista: 4.48, Base: 6.34, Alcista: 6.95 }, prob: [25, 50, 25] }),
  'BPA del consenso 2027e 5,69 y 2028e 6,34 (35/45/20)': caso({ f27: 5.69 / 5.50, bpa28: { Bajista: 4.48 * 6.34 / 5.87, Base: 6.34, Alcista: 6.44 * 6.34 / 5.87 } }),
  'BPA del consenso 2027e y 2028e + pesos 25/50/25': caso({ f27: 5.69 / 5.50, bpa28: { Bajista: 4.48 * 6.34 / 5.87, Base: 6.34, Alcista: 6.44 * 6.34 / 5.87 }, prob: [25, 50, 25] }),
  'Mediana adelantada 25,4x (selector a v3)': caso({ mediana: 25.4 }),
  'Mediana adelantada sin normalizar (25,8x)': caso({ mediana: 25.8 }),
};
console.log('Supuesto | PER hoy | decide | v2 pond | v3 pond | v3 base | vigente');
for (const [k, v] of Object.entries(filas)) console.log(`${k} | ${v.pers} | ${v.elige} | ${v.v2p} | ${v.v3p} | ${v.v3b} | ${v.vig}`);
