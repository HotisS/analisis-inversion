// Objetivo a 12 meses de EIC (v3 con historia adelantada; v2 de control). BPA propios de la proyección del DCF (supuestos.mjs):
// EBIT − resultado financiero de −10 M SAR (murabahas, arrendamientos e indemnizaciones, menos intereses de la caja) − impuestos del 6 %,
// entre 1.121,8 M acciones (sin recompras anunciadas). Cálculo en eic-bpa.mjs (scratchpad); detalle en revision-12m-2026-10-26.md.
// MISMA BASE: la historia usa el BPA publicado (contable) y los casos de 2028e no llevan partidas extraordinarias; el BPA de 2026e de la
// historia es el contable estimado (0,68: 0,655 recurrente + 26,1 M del reembolso de la multa, ya cobrado en el 3T26).
import fs from 'node:fs';
const bolsa = JSON.parse(fs.readFileSync(new URL('./bolsa.json', import.meta.url), 'utf8'));
export const precio = bolsa.identificacion.precio;
export const bpa2026 = 0.68, bpa2027 = 0.681;
export const bpa = { Bajista: 0.45, Base: 0.69, Alcista: 0.83 };
// Historia adelantada: cierre de cada año ÷ BPA real del año siguiente (2025: ÷ nuestro BPA contable de 2026e).
const hist = [['2021', 1.10, 94.2 / 1112.5], ['2022', 0.94, 201.0 / 1112.5], ['2023', 2.84, 401.7 / 1119.9], ['2024', 7.24, 629.9 / 1121.8], ['2025', 11.20, bpa2026]];
export const perAdel = hist.map(([a, p, b]) => [a, Math.round((p / b) * 100) / 100]);
const v = perAdel.map((x) => x[1]).sort((x, y) => x - y);
export const mediana = v[2], minimo = v[0], media = Math.round((v.reduce((s, x) => s + x, 0) / v.length) * 100) / 100;
export const actual = Math.round((precio / bpa2027) * 100) / 100;
// v2 (al cierre: cierre ÷ BPA del mismo año).
const cierre = [['2021', 1.10, 48.8 / 1112.5], ['2022', 0.94, 94.2 / 1112.5], ['2023', 2.84, 201.0 / 1112.5], ['2024', 7.24, 401.7 / 1119.9], ['2025', 11.20, 629.9 / 1121.8]];
export const perCierre = cierre.map(([a, p, b]) => [a, Math.round((p / b) * 100) / 100]);
const w = perCierre.map((x) => x[1]).sort((x, y) => x - y);
export const v2 = { mediana: w[2], minimo: w[0], media: Math.round((w.reduce((s, x) => s + x, 0) / w.length) * 100) / 100 };
