// BPA propio de 2027e y 2028e por escenario, desde los supuestos del DCF (estimación propia).
// Cuadre con 2025 real: 21.424 × 26,87 % − 2.425 = 3.331 de EBIT; − 416 financiero = 2.915; − 681 impuestos − 36 minoritarios
// = 2.198 M; ÷ 1.047 M de acciones = 2,10 € (el publicado).
// Resultado financiero: deuda neta de 10.305 M (jun-26) que sube a ≈11.500 M con la recompra y la inversión, al 3,3-3,5 %,
// más ≈70 M de actualización financiera de provisiones: −430 M en 2027e y −450 M en 2028e (−480 M en el bajista).
// Acciones: ≈1.006 M hoy (estimación) − ≈17 M de la recompra ya anunciada (resto del quinto tramo y sexto tramo, 750 M a ≈43 €)
// = 990 M; sin recompras no anunciadas.
import S from './supuestos.mjs';
const base = 21424, acciones = 990, minoritarios = 40;
const casos = { Bajista: S.casos[0], Base: S.casos[1], Alcista: S.casos[2] };
const fin = { Bajista: { '2027e': -470, '2028e': -480 }, Base: { '2027e': -430, '2028e': -450 }, Alcista: { '2027e': -420, '2028e': -430 } };
export const tabla = {};
for (const [n, c] of Object.entries(casos)) {
  let v = base; tabla[n] = {};
  for (const a of S.anios.slice(0, 3)) {
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp;
    v = v * (1 + g / 100);
    if (a.periodo === '2026e') continue;
    const ebitda = v * m / 100, am = v * a.amortizacion_pct_ventas / 100, ebit = ebitda - am;
    const bai = ebit + fin[n][a.periodo], imp = bai * 0.25, bn = bai - imp - minoritarios;
    tabla[n][a.periodo] = { ventas: Math.round(v), margen: m, ebitda: Math.round(ebitda), amort: Math.round(am), ebit: Math.round(ebit), fin: fin[n][a.periodo], bai: Math.round(bai), imp: Math.round(imp), bn: Math.round(bn), bpa: +(bn / acciones).toFixed(2) };
  }
}
if (process.argv[1]?.endsWith('bpa.mjs')) console.log(JSON.stringify(tabla, null, 1));
