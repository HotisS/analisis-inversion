// Objetivo a 12 meses de East Pipes (v3, historia adelantada; v2 de control). BPA propios de la proyección del DCF (supuestos.mjs,
// con los desplazamientos de cada escenario): ventas × margen EBITDA − amortización + resultado financiero de +30 M SAR (intereses de
// ≈ 900 M de caja al ≈ 4,5 % menos ≈ 10 M de costes de cartas de crédito, arrendamientos e indemnizaciones) − zakat e impuesto del 8 %,
// entre 31,5 M acciones (sin recompras). Ejercicio objetivo: FY2029e (abr-2028 a mar-2029), el primero que cierra más de 18 meses
// después del corte (21-abr-2028). Cuadre con FY2026: EBIT 614,9 + 5,9 financiero − 47,6 impuestos = 573,2 M (publicado 573,3).
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const N = 31.5, FIN = 30, BASE_VENTAS = 2297.7;
const caso = (esc) => S.casos.find((c) => c.escenario === esc);
function proyecta(esc) {
  const c = caso(esc); let v = BASE_VENTAS; const out = {};
  for (const y of S.anios) {
    const p = (c.perfil || []).find((x) => x.periodo === y.periodo);
    const g = y.crecimiento_pct + (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp);
    const m = y.margen_ebitda_pct + (p ? p.margen_pp : c.ajuste_margen_pp);
    v = v * (1 + g / 100);
    const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
    const fin = y.periodo === 'FY2027e' ? 20 : FIN;
    out[y.periodo] = { ventas: Math.round(v), margen: m, bn: Math.round((ebit + fin) * (1 - y.tasa_impositiva_pct / 100) * 10) / 10 };
    out[y.periodo].bpa = Math.round((out[y.periodo].bn / N) * 100) / 100;
  }
  return out;
}
export const P = { Bajista: proyecta('Bajista'), Base: proyecta('Base'), Alcista: proyecta('Alcista') };
export const bpa = { Bajista: P.Bajista.FY2029e.bpa, Base: P.Base.FY2029e.bpa, Alcista: P.Alcista.FY2029e.bpa };
export const bpa2027 = P.Base.FY2027e.bpa, bpa2028 = P.Base.FY2028e.bpa;
// Historia adelantada: cierre de cada ejercicio (31-mar) ÷ BPA real del ejercicio siguiente (FY2026: ÷ nuestro BPA de FY2027e).
const hist = [['FY2022', 51.93, 3.17], ['FY2023', 51.0, 8.49], ['FY2024', 128.0, 12.13], ['FY2025', 149.8, 18.2], ['FY2026', 160.0, bpa2027]];
export const perAdel = hist.map(([a, p, b]) => [a, Math.round((p / b) * 100) / 100]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[2], minimo = v[0], media = Math.round((v.reduce((s, x) => s + x, 0) / v.length) * 100) / 100;
export const actual = Math.round((precio / bpa2028) * 100) / 100;
// v2 (al cierre: cierre ÷ BPA del mismo ejercicio); FY2022 fuera por pérdidas.
const cierre = [['FY2023', 51.0, 3.17], ['FY2024', 128.0, 8.49], ['FY2025', 149.8, 12.13], ['FY2026', 160.0, 18.2]];
export const perCierre = cierre.map(([a, p, b]) => [a, Math.round((p / b) * 100) / 100]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: Math.round(((w[1] + w[2]) / 2) * 100) / 100, minimo: w[0], media: Math.round((w.reduce((s, x) => s + x, 0) / w.length) * 100) / 100 };
if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) console.log(JSON.stringify({ precio, P, bpa, bpa2027, bpa2028, perAdel, mediana, minimo, media, actual, perCierre, v2 }, null, 1));
