// Objetivo a 12 meses de Edarat (v3 con historia adelantada; v2 de control; selector por historia corta). BPA propios de la
// proyección del DCF (supuestos.mjs): ventas × margen EBITDA − amortización + resultado financiero − zakat e impuestos del 8,5 %,
// entre 7,545 M acciones (sin recompras: la de 15.000 acciones aprobada en sep-2026 es para el plan de empleados).
// Resultado financiero: −0,8 M en 2026e, −4 M en 2027e y −3 M en 2028e por la financiación del pedido de GPU (crédito del
// proveedor y bancos, ≈ 8-9 %), menos los intereses de la caja. La amortización es de capex ya comprometido (GPU): en el bajista
// se mantiene en importe, no en % de las ventas. Detalle en revision-12m-2026-10-19.md.
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_2025 = 192.36, ACC = 7.545;
const FIN = { '2026e': -0.8, '2027e': -4.0, '2028e': -3.0, '2029e': -2.0, '2030e': -1.0, '2031e': 0, '2032e': 0 };
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
// Amortización del base en importe (capex comprometido).
const amBase = {};
{ let v = VENTAS_2025; for (const y of S.anios) { v *= 1 + y.crecimiento_pct / 100; amBase[y.periodo] = v * y.amortizacion_pct_ventas / 100; } }
function proy(dg = 0, dm = 0, amFija = false) {
  let v = VENTAS_2025; const out = {};
  for (const y of S.anios) {
    v *= 1 + (y.crecimiento_pct + (y.fijo ? 0 : dg)) / 100;
    const m = y.margen_ebitda_pct + (y.fijo ? 0 : dm);
    const am = amFija ? amBase[y.periodo] : v * y.amortizacion_pct_ventas / 100;
    const ebit = v * m / 100 - am;
    const bn = (ebit + FIN[y.periodo]) * (1 - y.tasa_impositiva_pct / 100);
    out[y.periodo] = { ventas: r1(v), ebitda: r1(v * m / 100), amortizacion: r1(am), ebit: r1(ebit), beneficio: r1(bn), bpa: r2(bn / ACC) };
  }
  return out;
}
export const P = { Bajista: proy(-6, -5, true), Base: proy(0, 0), Alcista: proy(6, 3) };
export const bpa2026 = P.Base['2026e'].bpa, bpa2027 = P.Base['2027e'].bpa;
export const bpa = { Bajista: P.Bajista['2028e'].bpa, Base: P.Base['2028e'].bpa, Alcista: P.Alcista['2028e'].bpa };
// Historia adelantada: cierre de cada año (ajustado por las acciones gratuitas) ÷ BPA real del año siguiente (2025: ÷ nuestro 2026e).
// 2022 se excluye: el cierre del 29-dic-2022 llegó tres sesiones después de la salida directa a Nomu (26-dic), sin descubrimiento
// de precio (8,7x); con él la mediana sería 23,8x y el mínimo 8,7x (ver la revisión).
const hist = [['2023', 62.83, 3.27], ['2024', 229.27, 4.82], ['2025', 159.6, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
export const per2022 = r2(20.03 / 2.30);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[1], minimo = v[0], media = r2(v.reduce((s, x) => s + x, 0) / v.length);
export const actual = r2(precio / bpa2027);
// v2 (al cierre: cierre ÷ BPA del mismo año), también sin 2022 (20,03 ÷ 1,67 = 12,0x).
const cierre = [['2023', 62.83, 2.30], ['2024', 229.27, 3.27], ['2025', 159.6, 4.82]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: w[1], minimo: w[0], media: r2(w.reduce((s, x) => s + x, 0) / w.length) };

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, perAdel, per2022, mediana, minimo, media, actual, perCierre, v2 }, null, 1));
}
