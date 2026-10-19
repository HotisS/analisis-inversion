// Objetivo a 12 meses de Elm (v3 con historia adelantada; v2 de control). BPA propios de la proyección del DCF (supuestos.mjs):
// ventas × margen EBITDA − amortización (3,2 % de las ventas) + resultado financiero neto de +40 M SAR (intereses de 3.906 M de caja
// y murabahas menos el préstamo de SNB, los arrendamientos y el coste de las indemnizaciones) − zakat e impuestos del 6 %,
// entre 78,0 M acciones diluidas (autocartera del plan de empleados; sin recompras). Detalle en revision-12m-2026-10-19.md.
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_2025 = 9464.88, FIN = 40, ACC = 78.0;
const r2 = (x) => Math.round(x * 100) / 100;
// Proyección por escenario: ajustes de crecimiento y margen a partir de 2027e (2026e fijo), como el motor.
function proy(dg = 0, dm = 0) {
  let v = VENTAS_2025; const out = {};
  for (const y of S.anios) {
    v *= 1 + (y.crecimiento_pct + (y.fijo ? 0 : dg)) / 100;
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
    const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
    const bn = (ebit + FIN) * (1 - y.tasa_impositiva_pct / 100);
    out[y.periodo] = { ventas: Math.round(v), ebitda: Math.round(v * m / 100), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: r2(bn / ACC) };
  }
  return out;
}
export const P = { Bajista: proy(-4, -3), Base: proy(0, 0), Alcista: proy(3, 1.5) };
export const bpa2026 = P.Base['2026e'].bpa, bpa2027 = P.Base['2027e'].bpa;
export const bpa = { Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };
// Historia adelantada: cierre de cada año ÷ BPA diluido real del año siguiente (2025: ÷ nuestro BPA de 2026e). Cotiza desde feb-2022.
const hist = [['2022', 332, 16.95], ['2023', 815, 23.44], ['2024', 1115, 26.80], ['2025', 748, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = r2((v[1] + v[2]) / 2), minimo = v[0], media = r2(v.reduce((s, x) => s + x, 0) / v.length);
export const actual = r2(precio / bpa2027);
// v2 (al cierre: cierre ÷ BPA del mismo año).
const cierre = [['2022', 332, 11.63], ['2023', 815, 16.95], ['2024', 1115, 23.44], ['2025', 748, 26.80]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: r2((w[1] + w[2]) / 2), minimo: w[0], media: r2(w.reduce((s, x) => s + x, 0) / w.length) };

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, perAdel, mediana, minimo, media, actual, perCierre, v2 }, null, 1));
}
