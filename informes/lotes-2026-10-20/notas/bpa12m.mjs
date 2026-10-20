// BPA propio por escenario (2026e-2028e) desde la proyección del DCF y los desplazamientos de los escenarios.
// BPA = (ventas × margen EBITDA − amortización + resultado financiero) × (1 − impuestos) × 0,995 (minoritarios) ÷ 112,43 M acciones
// (112,53 M emitidas menos 0,10 M de autocartera; el BPA diluido publicado usa ≈ 112,3 M).
// Resultado financiero: 2026e = 790 M del 1S26 (intereses, plusvalía de 531 M en acciones de TSMC, diferencias de cambio) [A6]
// + ≈ 300 M de intereses en el 2S26; 2027e-2028e solo intereses de la caja (≈ 2 % sobre 25.000-35.000 M), sin diferencias de cambio.
// Cuadre con 2025 real: (12.954,5 − 2.610,1 − 153,5) × (1 − 0,22) × 0,99 = 7.869 → 70,0 por 112,4 M (publicado 70,06 diluido).
import S from './supuestos.mjs';
const ACC = 112.43, VENTAS_2025 = 33783.4, FIN = { '2026e': 1090, '2027e': 600, '2028e': 700 };
export function bpas(caso) {
  let v = VENTAS_2025; const out = {};
  for (const a of S.anios.slice(0, 3)) {
    const p = (caso.perfil ?? []).find((x) => x.periodo === a.periodo);
    const dg = a.fijo ? 0 : (p ? p.crecimiento_pp : caso.ajuste_crecimiento_pp);
    const dm = a.fijo ? 0 : (p ? p.margen_pp : caso.ajuste_margen_pp);
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const ebit = v * (a.margen_ebitda_pct + dm) / 100 - v * a.amortizacion_pct_ventas / 100;
    const t = a.periodo === '2026e' ? 21.5 : a.tasa_impositiva_pct;
    const bn = (ebit + FIN[a.periodo]) * (1 - t / 100) * 0.995;
    out[a.periodo] = { ventas: Math.round(v), ebit: Math.round(ebit), beneficio: Math.round(bn), bpa: +(bn / ACC).toFixed(2) };
  }
  return out;
}
if (process.argv[1]?.endsWith('bpa12m.mjs')) for (const c of S.casos) console.log(c.escenario, JSON.stringify(bpas(c)));
