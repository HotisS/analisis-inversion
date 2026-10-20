// Objetivo a 12 meses de Parkin (v3 con historia adelantada; v2 de control). BPA propios de la proyección del DCF:
// ventas × margen EBITDA − amortización − resultado financiero recurrente (−42 M: intereses del préstamo de 1.100 M al 5,1 % y de los
// arrendamientos, menos ≈ 15 M de intereses de la caja) − impuesto del 9 %, entre 2.999 M acciones (sin recompras: la política es
// repartir el 100 % del beneficio o del flujo libre). Cuadre con 2025: 1.308,3 × 59,8 % − 51,5 − 43,7 = 687,4 → × 0,91 = 625,5 (0,2086).
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_2025 = 1308.3, FIN = -42, ACC = 2999;
const r2 = (x) => Math.round(x * 100) / 100;
const r4 = (x) => Math.round(x * 10000) / 10000;
function proy(dg = 0, dm = 0) {
  let v = VENTAS_2025; const out = {};
  for (const y of S.anios) {
    v *= 1 + (y.crecimiento_pct + (y.fijo ? 0 : dg)) / 100;
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
    const ebit = v * (m - y.amortizacion_pct_ventas) / 100;
    const bn = (ebit + FIN) * (1 - y.tasa_impositiva_pct / 100);
    out[y.periodo] = { ventas: Math.round(v), ebitda: Math.round(v * m / 100), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: r4(bn / ACC) };
  }
  return out;
}
export const P = { Bajista: proy(-3, -3), Base: proy(0, 0), Alcista: proy(2, 1) };
export const bpa2026 = P.Base['2026e'].bpa, bpa2027 = P.Base['2027e'].bpa;
export const bpa = { Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };
// Historia adelantada: cotiza desde el 21-mar-2024. Cierre de 2024 (4,87) ÷ BPA real de 2025 (0,2087); cierre de 2025 (5,69) ÷ nuestro
// BPA de 2026e. Solo dos años: el selector toma la más baja de v3 y v2.
const hist = [['2024', 4.87, 0.2087], ['2025', 5.69, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = r2((v[0] + v[1]) / 2), minimo = v[0], media = mediana;
export const actual = r2(precio / bpa2027);
const cierre = [['2024', 4.87, 0.141], ['2025', 5.69, 0.2087]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: r2((w[0] + w[1]) / 2), minimo: w[0], media: r2((w[0] + w[1]) / 2) };

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, perAdel, mediana, minimo, media, actual, perCierre, v2 }, null, 1));
}
