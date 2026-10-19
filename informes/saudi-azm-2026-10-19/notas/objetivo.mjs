// Objetivo a 12 meses de Saudi Azm (v3 con historia adelantada; v2 de control). Ejercicio a 30 de junio: el del objetivo es FY2028e.
// BPA propios de la proyección del DCF (supuestos.mjs): ventas × margen EBITDA − amortización + resultado financiero − zakat del 6,5 %,
// entre 58 M acciones en circulación (60 M menos la autocartera del plan de empleados; la recompra de hasta 3,6 M que vota la junta del
// 5-nov-2026 se compensa con las entregas a empleados). Resultado financiero (asociadas, rendimiento de fondos y sukuk, otros ingresos,
// menos intereses): +5,3 M en FY2026; baja a +4 M en FY2027e y +2,5 M después porque la recompra (≈ 106 M) se come la mitad de la caja.
// Minoritarios ≈ 0. Detalle en revision-12m-2026-10-19.md.
import fs from 'node:fs';
import S from './supuestos.mjs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
const VENTAS_BASE = 307.36, ACC = 58;
const FIN = { 'FY2027e': 4, 'FY2028e': 2.5, 'FY2029e': 2.5, 'FY2030e': 2.5, 'FY2031e': 2.5, 'FY2032e': 2.5 };
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
function proy(dg = 0, dm = 0) {
  let v = VENTAS_BASE; const out = {};
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
export const P = { Bajista: proy(-8, -3), Base: proy(0, 0), Alcista: proy(5, 1.5) };
export const bpa2027 = P.Base['FY2027e'].bpa, bpa2028 = P.Base['FY2028e'].bpa;
export const bpa = { Bajista: P.Bajista['FY2028e'].bpa, Base: P.Base['FY2028e'].bpa, Alcista: P.Alcista['FY2028e'].bpa };
// BPA de los próximos 12 meses (19-oct-2026 a 19-oct-2027): 8,4/12 de FY2027e + 3,6/12 de FY2028e (misma base que la historia adelantada).
export const bpaNtm = r2(8.4 / 12 * bpa2027 + 3.6 / 12 * bpa2028);
// Historia adelantada: cierre de cada ejercicio (30-jun; FY2023, 22-jun) ÷ BPA real del ejercicio siguiente (FY2026: ÷ nuestro FY2027e).
// FY2022: cotizaba en Nomu (mercado paralelo) desde mar-2022, con poca liquidez; se mantiene (no hay motivo objetivo para excluirlo).
const hist = [['FY2022', 8.0, 0.39], ['FY2023', 11.5, 0.47], ['FY2024', 17.5, 0.62], ['FY2025', 32.0, 0.85], ['FY2026', 21.42, bpa2027]];
export const perAdel = hist.map(([a, p, b]) => [a, r2(p / b), p, b]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[2], minimo = v[0], media = r2(v.reduce((s, x) => s + x, 0) / v.length);
export const actual = r2(precio / bpaNtm);
// v2 (al cierre: cierre ÷ BPA del mismo ejercicio; FY2022 0,32 tras el desdoblamiento).
const cierre = [['FY2022', 8.0, 0.32], ['FY2023', 11.5, 0.39], ['FY2024', 17.5, 0.47], ['FY2025', 32.0, 0.62], ['FY2026', 21.42, 0.85]];
export const perCierre = cierre.map(([a, p, b]) => [a, r2(p / b)]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: w[2], minimo: w[0], media: r2(w.reduce((s, x) => s + x, 0) / w.length) };
// Mediana del PER adelantado de los comparables (D.json).
const D = JSON.parse(fs.readFileSync(new URL('./D.json', import.meta.url), 'utf8'));
const pc = D.comparables.empresas.map((e) => e.per_ntm).filter((x) => x > 0).sort((x, y) => x - y);
export const compPer = r2(pc.length % 2 ? pc[(pc.length - 1) / 2] : (pc[pc.length / 2 - 1] + pc[pc.length / 2]) / 2);

if (process.argv[1] && process.argv[1].endsWith('objetivo.mjs')) {
  console.log(JSON.stringify({ precio, P, bpaNtm, perAdel, mediana, minimo, media, actual, perCierre, v2, compPer }, null, 1));
}
