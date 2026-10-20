// Objetivo a 12 meses de solutions by stc (v3 con historia adelantada; v2 de control). BPA propios de la proyección del DCF:
// ventas × margen EBITDA − amortización (2,9 %) + resultado financiero de −10 M SAR (intereses de la caja y las murabahas menos la deuda
// y los arrendamientos) − zakat e impuestos del 8,5 % − minoritarios (≈ 0,1 % de las ventas), entre 240 M acciones (tras la gratuita 1×1
// del 6-oct-2026; los BPA históricos publicados se dividen entre dos). Detalle en revision-12m-2026-10-20.md.
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_2025 = 12730.2, FIN = -10, MIN = 0.001, ACC = 240;
const r2 = (x) => Math.round(x * 100) / 100;
function proy(dg = 0, dm = 0) {
  let v = VENTAS_2025; const out = {};
  for (const y of S.anios) {
    v *= 1 + (y.crecimiento_pct + (y.fijo ? 0 : dg)) / 100;
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
    const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
    const bn = (ebit + FIN) * (1 - y.tasa_impositiva_pct / 100) - v * MIN;
    out[y.periodo] = { ventas: Math.round(v), ebitda: Math.round(v * m / 100), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: r2(bn / ACC) };
  }
  return out;
}
export const P = { Bajista: proy(-3, -2), Base: proy(0, 0), Alcista: proy(2, 1) };
export const bpa2026 = P.Base['2026e'].bpa, bpa2027 = P.Base['2027e'].bpa;
export const bpa = { Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };
// Historia adelantada: cierre de cada año (Yahoo, ajustado por la gratuita) ÷ BPA real del año siguiente (base de 240 M acciones);
// 2025: ÷ nuestro BPA de 2026e. Cotiza desde el 9-dic-2021.
const hist = [['2021', 94.1, 4.39], ['2022', 121.4, 4.97], ['2023', 174.9, 6.66], ['2024', 135, 6.26], ['2025', 112.55, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[2], minimo = v[0], media = r2(v.reduce((s, x) => s + x, 0) / v.length);
export const actual = r2(precio / bpa2027);
const cierre = [['2021', 94.1, 3.47], ['2022', 121.4, 4.39], ['2023', 174.9, 4.97], ['2024', 135, 6.66], ['2025', 112.55, 6.26]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: w[2], minimo: w[0], media: r2(w.reduce((s, x) => s + x, 0) / w.length) };

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, perAdel, mediana, minimo, media, actual, perCierre, v2 }, null, 1));
}
