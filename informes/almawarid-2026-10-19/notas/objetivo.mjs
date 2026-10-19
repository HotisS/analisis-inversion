// Objetivo a 12 meses de Almawarid (v3 con historia adelantada; v2 de control; selector por historia corta: tres años desde la
// salida a bolsa de jun-2023). BPA propios de la proyección del DCF (supuestos.mjs): ventas × margen EBITDA − amortización +
// resultado financiero − zakat del 7 %, entre 20 M acciones (tras la ampliación gratuita 4:3 de feb-2026; sin recompras).
// Resultado financiero: intereses de las indemnizaciones por cese y de los arrendamientos (−8,8 M en 2025, −4,8 M en el 1S26),
// que crecen con la plantilla: −10 M en 2026e, −11 M en 2027e y −12 M en 2028e. Detalle en revision-12m-2026-10-19.md.
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_2025 = 2610.99, ACC = 20;
const FIN = { '2026e': -10, '2027e': -11, '2028e': -12, '2029e': -13, '2030e': -14, '2031e': -15, '2032e': -16 };
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
function proy(dg = 0, dm = 0) {
  let v = VENTAS_2025; const out = {};
  for (const y of S.anios) {
    v *= 1 + (y.crecimiento_pct + (y.fijo ? 0 : dg)) / 100;
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
    const am = v * y.amortizacion_pct_ventas / 100;
    const ebit = v * m / 100 - am;
    const bn = (ebit + FIN[y.periodo]) * (1 - y.tasa_impositiva_pct / 100);
    out[y.periodo] = { ventas: r1(v), ebitda: r1(v * m / 100), amortizacion: r1(am), ebit: r1(ebit), beneficio: r1(bn), bpa: r2(bn / ACC) };
  }
  return out;
}
export const P = { Bajista: proy(-5, -1.5), Base: proy(0, 0), Alcista: proy(3, 0.7) };
export const bpa2026 = P.Base['2026e'].bpa, bpa2027 = P.Base['2027e'].bpa;
export const bpa = { Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };
// Historia adelantada: cierre de cada año (ajustado por la ampliación gratuita 4:3) ÷ BPA real del año siguiente reexpresado a 20 M
// acciones (2025: ÷ nuestro 2026e). Salida a bolsa el 19-jun-2023: 2023 es el primer cierre [D5, D13].
const hist = [['2023', 93.6, 4.77], ['2024', 79.05, 6.92], ['2025', 97.57, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[1], minimo = v[0], media = r2(v.reduce((s, x) => s + x, 0) / v.length);
export const actual = r2(precio / bpa2027);
// v2 (al cierre: cierre ÷ BPA del mismo año).
const cierre = [['2023', 93.6, 4.44], ['2024', 79.05, 4.77], ['2025', 97.57, 6.92]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: w[1], minimo: w[0], media: r2(w.reduce((s, x) => s + x, 0) / w.length) };
// Mediana del PER adelantado de los comparables (D.json).
const D = JSON.parse(fs.readFileSync(new URL('./D.json', import.meta.url), 'utf8'));
const pc = D.comparables.empresas.map((e) => e.per_ntm).filter((x) => x > 0).sort((x, y) => x - y);
export const compPer = r2(pc.length % 2 ? pc[(pc.length - 1) / 2] : (pc[pc.length / 2 - 1] + pc[pc.length / 2]) / 2);

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, perAdel, mediana, minimo, media, actual, perCierre, v2, compPer }, null, 1));
}
