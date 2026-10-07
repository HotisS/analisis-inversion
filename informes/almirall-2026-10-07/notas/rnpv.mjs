// Valoración rNPV de la cartera de I+D de Almirall (corte 2026-10-07). Script propio: el motor aún no tiene rNPV.
//   node informes/almirall-2026-10-07/notas/rnpv.mjs   → escribe notas/rnpv.json y lo imprime.
//
// Método (por activo):
//   1. Curva de ventas: lanzamiento en `lanzamiento`, subida lineal hasta `pico` (millones EUR) en `anios_subida`
//      años, meseta hasta la pérdida de exclusividad (`loe`), y caída del 50 % anual desde entonces.
//   2. Contribución = ventas × `margen_contrib_pct` (margen tras coste de ventas, regalías al licenciante y gastos
//      comerciales propios del producto; estimación propia, distinta según sea molécula propia o licenciada).
//   3. Probabilidad de éxito acumulada hasta la aprobación según la fase actual (BIO/Informa/QLS 2021), aplicada a
//      todos los flujos posteriores al lanzamiento. Los costes de desarrollo NO se restan: Almirall los paga dentro de
//      su gasto de I+D (11-12 % de las ventas), que ya está en el margen EBITDA del DCF; restarlos aquí los contaría dos
//      veces. Por eso este rNPV es «bruto de I+D» y se suma al valor empresa del DCF en la suma de partes.
//   4. Descuento al WACC del DCF a mitad de año desde la fecha de corte; horizonte hasta 2045, sin valor terminal.
//   5. Impuestos al tipo normalizado del DCF.
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const aqui = dirname(fileURLToPath(import.meta.url));
const cfgPath = join(aqui, 'rnpv-supuestos.json');
const cfg = JSON.parse(readFileSync(cfgPath, 'utf8'));
const { wacc_pct, impuesto_pct, anio_base, fin, prob_por_fase } = cfg;
const r = wacc_pct / 100;
const t0 = anio_base + (cfg.fraccion_anio_transcurrida ?? 0.77); // 7-oct ≈ 0,77 del año

const filas = [];
let total = 0, totalSinRiesgo = 0;
for (const a of cfg.activos) {
  const pos = a.prob_pct ?? prob_por_fase[a.fase];
  const p = pos / 100;
  let vpn = 0, vpnSin = 0;
  const serie = [];
  for (let y = a.lanzamiento; y <= fin; y++) {
    const k = y - a.lanzamiento;
    let ventas;
    if (y < a.loe) ventas = a.pico * Math.min(1, (k + 1) / a.anios_subida);
    else ventas = a.pico * Math.pow(0.5, y - a.loe + 1);
    const contrib = ventas * a.margen_contrib_pct / 100 * (1 - impuesto_pct / 100);
    const tiempo = y + 0.5 - t0;
    const df = Math.pow(1 + r, -Math.max(tiempo, 0));
    vpnSin += contrib * df;
    vpn += contrib * df * p;
    serie.push({ anio: y, ventas: Math.round(ventas * 10) / 10 });
  }
  total += vpn; totalSinRiesgo += vpnSin;
  filas.push({ activo: a.activo, indicacion: a.indicacion, fase: a.fase, prob_pct: pos, lanzamiento: a.lanzamiento, pico: a.pico,
    margen_contrib_pct: a.margen_contrib_pct, vpn_sin_riesgo: Math.round(vpnSin), rnpv: Math.round(vpn), fuente: a.fuente ?? null });
}
const out = { wacc_pct, impuesto_pct, prob_por_fase, filas, rnpv_total: Math.round(total), vpn_sin_riesgo_total: Math.round(totalSinRiesgo) };
writeFileSync(join(aqui, 'rnpv.json'), JSON.stringify(out, null, 2));
console.table(filas.map(({ fuente, ...f }) => f));
console.log('rNPV total (M EUR):', out.rnpv_total, '| sin ajustar por riesgo:', out.vpn_sin_riesgo_total);
