// BPA propio de 2027e y 2028e por escenario, desde los supuestos del DCF (estimación propia).
// Cuadre con 2025 real: 44.076 × 35,30 % − 5.803 = 9.755 de EBIT; − 1.658 financiero = 8.097; − 1.671 impuestos − 505 minoritarios
// = 5.921 M de operaciones continuadas (el atribuido publicado, 6.285 M, suma 364 M de México, actividad interrumpida y ya vendida;
// el ajustado fue 6.231 M). ÷ 6.747 M de acciones = 0,88 € frente a 0,925 € publicado: la fórmula es algo conservadora.
// Resultado financiero: −1.658 M en 2025 con ≈50.000 M de deuda neta; la deuda sube a ≈58.000-60.000 M con el plan (4,0-4,3 % neto):
// −1.950 M en 2027e y −2.100 M en 2028e (−2.200 M en el bajista). Minoritarios ≈550 M. Impuestos 22 %.
// Acciones: 6.673 M (estatutos de 24-jul-2026); el dividendo flexible emite acciones que Iberdrola amortiza con autocartera:
// sin dilución neta y sin recompras no anunciadas.
import S from './supuestos.mjs';
const base = 44076, acciones = 6673, minoritarios = 550;
const casos = { Bajista: S.casos[0], Base: S.casos[1], Alcista: S.casos[2] };
const fin = { Bajista: { '2027e': -2000, '2028e': -2200 }, Base: { '2027e': -1950, '2028e': -2100 }, Alcista: { '2027e': -1950, '2028e': -2100 } };
export const tabla = {};
for (const [n, c] of Object.entries(casos)) {
  let v = base; tabla[n] = {};
  for (const a of S.anios.slice(0, 3)) {
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp;
    v = v * (1 + g / 100);
    if (a.periodo === '2026e') continue;
    const ebitda = v * m / 100, am = v * a.amortizacion_pct_ventas / 100, ebit = ebitda - am;
    const bai = ebit + fin[n][a.periodo], imp = bai * 0.22, bn = bai - imp - minoritarios;
    tabla[n][a.periodo] = { ventas: Math.round(v), margen: m, ebitda: Math.round(ebitda), amort: Math.round(am), ebit: Math.round(ebit), fin: fin[n][a.periodo], bai: Math.round(bai), imp: Math.round(imp), bn: Math.round(bn), bpa: +(bn / acciones).toFixed(3) };
  }
}
if (process.argv[1]?.endsWith('bpa.mjs')) console.log(JSON.stringify(tabla, null, 1));
