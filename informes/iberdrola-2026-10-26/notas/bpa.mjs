// BPA propio por escenario (estimación propia), en la MISMA base que el BPA publicado de la historia (A.json, cuenta):
// beneficio atribuido NIIF de operaciones continuadas MENOS los cupones de los híbridos (≈230-240 M al año), sin los
// «capital allowances» británicos (que la empresa solo suma en su beneficio ajustado) y sin la plusvalía de México (953 M
// en 2026, no recurrente; también los años históricos tienen partidas no recurrentes de ambos signos).
// Cuadre con 2025: 44.076 × 36,2 % − 6.201 = 9.755 de EBIT; − 1.658 financiero = 8.097; − 1.671 impuestos − 505 minoritarios
// = 5.921 M de operaciones continuadas (el atribuido publicado, 6.285 M, suma México, actividad interrumpida); − 230 de
// cupones = 5.691 ÷ 6.734 M de acciones = 0,845 € frente a 0,899 € publicado: la fórmula sale un 6 % conservadora (México).
// 2026e con 9M26 real: resultado financiero −1.687 M en 9M (−2.300 M en el año), puesta en equivalencia ≈90 M, impuestos
// 18,5 %, minoritarios 140 M en 9M (≈190 M); 2027-2028: deuda neta de ≈63.000 y ≈68.000 M (consenso [D1]) al ≈4,1 %:
// −2.600 y −2.850 M (−2.700 y −3.000 en el bajista); impuestos 20 %; minoritarios 220-230 M (entra el 20 % de Caruna).
// Acciones: 6.563 M (emitidas menos autocartera estimada); el dividendo flexible se compensa con amortizaciones.
import S from './supuestos.mjs';
const base = 44076, acciones = 6563, cupones = 240, eq = 90;
const casos = { Bajista: S.casos[0], Base: S.casos[1], Alcista: S.casos[2] };
const fin = { Bajista: { '2026e': -2300, '2027e': -2700, '2028e': -3000 }, Base: { '2026e': -2300, '2027e': -2600, '2028e': -2850 }, Alcista: { '2026e': -2300, '2027e': -2600, '2028e': -2850 } };
const imp = { '2026e': 18.5, '2027e': 20, '2028e': 20 };
const mino = { '2026e': 190, '2027e': 220, '2028e': 230 };
export const tabla = {};
for (const [n, c] of Object.entries(casos)) {
  let v = base; tabla[n] = {};
  for (const a of S.anios.slice(0, 3)) {
    const g = a.fijo ? a.crecimiento_pct : a.crecimiento_pct + c.ajuste_crecimiento_pp;
    const m = a.fijo ? a.margen_ebitda_pct : a.margen_ebitda_pct + c.ajuste_margen_pp;
    v = v * (1 + g / 100);
    const ebitda = v * m / 100, am = v * a.amortizacion_pct_ventas / 100, ebit = ebitda - am;
    const bai = ebit + fin[n][a.periodo] + eq, t = bai * imp[a.periodo] / 100, bn = bai - t - mino[a.periodo];
    const bpa = (bn - cupones) / acciones;
    tabla[n][a.periodo] = { ventas: Math.round(v), margen: m, ebitda: Math.round(ebitda), amort: Math.round(am), ebit: Math.round(ebit), fin: fin[n][a.periodo], bai: Math.round(bai), imp: Math.round(t), bn: Math.round(bn), bpa: +bpa.toFixed(3) };
  }
}
if (process.argv[1]?.endsWith('bpa.mjs')) console.log(JSON.stringify(tabla, null, 1));
