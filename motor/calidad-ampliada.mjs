// Calidad ampliada (28-oct-2026): las 10 pruebas del backtest `verticales/empresa/backtest/calidad-ampliada-*-2026-10-28.md`.
// INFORMATIVAS: ninguna pasó el criterio fijado para decidir (ni filtro de compra ni parte de la nota). No cambian señal,
// nivel ni acción robusta; se enseñan en el informe (sección 9), en robustez.mjs (`calidad_pruebas`) y en el escáner.
// Mismas definiciones que herramientas/backtest-calidad-ampliada.mjs, con las cifras del informe (y su WACC en vez del 8 %).
const n = (v) => (v === null || v === undefined || v === '' || !Number.isFinite(+v) ? null : +v);
const esEstimado = (p) => /\d{2}\s*e\b/i.test(String(p ?? ''));
const div = (a, b) => (a === null || b === null || b === 0 ? null : a / b);
const fmt = (x, d = 1) => (x === null || !Number.isFinite(x) ? 'n.d.' : x.toFixed(d).replace('.', ','));

export const PRUEBAS_CALIDAD = {
  P1: 'ROIC estable: nunca por debajo del WACC en los últimos 5 años',
  P2: 'Conversión en caja: flujo libre de 3 años ≥ 0,8 × beneficio',
  P3: 'Devengos: beneficio − flujo operativo ≤ 5 % del activo',
  P4: 'Deuda neta / EBITDA ≤ 3',
  P5: 'Cobertura de intereses: EBIT ≥ 5 × gasto financiero',
  P6: 'Margen EBIT estable: rango de 5 años ≤ 10 puntos',
  P7: 'Sin dilución: acciones diluidas ≤ +2 % anual en 3 años',
  P8: 'Piotroski F ≥ 6',
  P9: 'Altman Z > 1,81 (fuera de la zona de riesgo)',
  P10: 'Ventas que no encogen en 3 años',
};

// d = datos.json del informe; calc = d.calc (o el resultado del motor). Devuelve { pruebas, pasa, con_dato, fallan, texto }.
export function calidadAmpliada(d, calc = d?.calc) {
  const por = (arr) => (Array.isArray(arr) ? arr : []).filter((x) => x && !esEstimado(x.periodo));
  const cu = por(d?.financieros?.cuenta), ba = por(d?.balance?.historico), fl = por(d?.flujos?.historico);
  const de = (arr, p) => arr.find((x) => String(x.periodo) === String(p)) || {};
  const u = cu.at(-1) || {}, u3 = cu.length >= 4 ? cu.at(-4) : null, bu = de(ba, u.periodo), fu = de(fl, u.periodo);
  const fin = /financ|banc|segur|asegur|inmobil|real estate|bank|insur/i.test(`${d?.identificacion?.sector ?? ''} ${d?.identificacion?.industria ?? ''}`);
  const r = {};
  const put = (k, ok, valor) => { r[k] = { clave: k, prueba: PRUEBAS_CALIDAD[k], resultado: ok === null ? 'n.d.' : ok ? 'Sí' : 'No', valor }; };

  const rw = (calc?.roic_frente_wacc || []).filter((x) => n(x.roic_pct) !== null && n(x.wacc_pct) !== null && !esEstimado(x.periodo)).slice(-5);
  put('P1', rw.length >= 4 ? rw.every((x) => n(x.roic_pct) >= n(x.wacc_pct)) : null, rw.length ? `ROIC mínimo ${fmt(Math.min(...rw.map((x) => n(x.roic_pct))))} % frente a WACC ${fmt(n(rw.at(-1).wacc_pct))} %` : 'n.d.');

  const c3 = cu.slice(-3), f3 = c3.map((c) => de(fl, c.periodo));
  const sBn = c3.length === 3 && c3.every((c) => n(c.beneficio_neto) !== null) ? c3.reduce((s, c) => s + n(c.beneficio_neto), 0) : null;
  const sFl = f3.length === 3 && f3.every((f) => n(f.flujo_operativo) !== null) ? f3.reduce((s, f) => s + n(f.flujo_operativo) - Math.abs(n(f.capex) ?? 0), 0) : null;
  put('P2', sBn === null || sFl === null ? null : sBn > 0 ? sFl / sBn >= 0.8 : false, sBn === null || sFl === null ? 'n.d.' : sBn > 0 ? `${fmt(sFl / sBn, 2)}x` : 'beneficio acumulado ≤ 0');

  const acr = div(n(u.beneficio_neto) !== null && n(fu.flujo_operativo) !== null ? n(u.beneficio_neto) - n(fu.flujo_operativo) : null, n(bu.activo_total));
  put('P3', acr === null ? null : acr <= 0.05, acr === null ? 'n.d.' : `${fmt(100 * acr)} % del activo`);

  if (fin) { put('P4', null, 'no aplica a financieras'); put('P5', null, 'no aplica a financieras'); }
  else {
    const deuda = n(bu.deuda_financiera), caja = n(bu.caja) ?? 0, ebitda = n(u.ebitda) ?? (n(u.ebit) !== null ? n(u.ebit) + Math.abs(n(u.amortizaciones) ?? 0) : null);
    const dn = deuda === null ? null : deuda - caja;
    put('P4', dn === null ? null : dn <= 0 ? true : ebitda === null ? null : ebitda <= 0 ? false : dn / ebitda <= 3, dn === null ? 'n.d.' : dn <= 0 ? 'caja neta' : ebitda > 0 ? `${fmt(dn / ebitda)}x` : 'EBITDA ≤ 0');
    const gf = n(u.gastos_financieros) !== null ? Math.abs(n(u.gastos_financieros)) : null, ebit = n(u.ebit);
    put('P5', gf !== null && gf > 0 ? (ebit === null ? null : ebit / gf >= 5) : dn !== null && dn <= 0 ? true : null, gf > 0 && ebit !== null ? `${fmt(ebit / gf)}x` : dn !== null && dn <= 0 ? 'sin deuda neta' : 'n.d.');
  }
  const mg = cu.slice(-5).map((c) => div(n(c.ebit), n(c.ingresos))).filter((x) => x !== null);
  put('P6', mg.length >= 4 ? 100 * (Math.max(...mg) - Math.min(...mg)) <= 10 : null, mg.length ? `rango ${fmt(100 * (Math.max(...mg) - Math.min(...mg)))} puntos` : 'n.d.');
  const acc = u3 && n(u.acciones_diluidas) > 0 && n(u3.acciones_diluidas) > 0 ? Math.pow(n(u.acciones_diluidas) / n(u3.acciones_diluidas), 1 / 3) - 1 : null;
  put('P7', acc === null ? null : acc <= 0.02, acc === null ? 'n.d.' : `${fmt(100 * acc)} % anual`);
  const F = n(calc?.calidad?.piotroski_f);
  put('P8', F === null ? null : F >= 6, F === null ? 'n.d.' : `${F} / 9`);
  const Z = n(calc?.calidad?.altman_z);
  put('P9', fin || Z === null ? null : Z > 1.81, fin ? 'no aplica a financieras' : Z === null ? 'n.d.' : fmt(Z, 2));
  const v0 = u3 ? n(u3.ingresos) : null, v1 = n(u.ingresos);
  put('P10', v0 === null || v1 === null ? null : v1 >= v0, v0 && v1 !== null ? `${fmt(100 * (v1 / v0 - 1))} % en 3 años` : 'n.d.');

  const pruebas = Object.values(r), con = pruebas.filter((p) => p.resultado !== 'n.d.'), fallan = con.filter((p) => p.resultado === 'No');
  const pasa = con.length - fallan.length;
  return { pruebas, pasa, con_dato: con.length, fallan: fallan.map((p) => p.clave),
    texto: `${pasa} de ${con.length}${fallan.length ? ` (falla ${fallan.map((p) => `${p.clave} ${p.prueba.split(':')[0].toLowerCase()}`).join('; ')})` : ''}` };
}

// Comprobación de riesgo en compras (usuario, 28-oct-2026 11:15: «sí, introdúcelo como check»): deuda neta / EBITDA > 3 (P4)
// o dilución > 2 % anual (P7). AVISA, no bloquea ni cambia el nivel: en el backtest eran las dos con más caídas de más del
// 25 % dentro de las compras A + B1 (18,8 % frente a 8,3 % con 11 casos; 14,1 % frente a 8,6 % con 32), muy pocos para decidir.
export function avisoRiesgo(q) {
  const f = q.pruebas.filter((x) => ['P4', 'P7'].includes(x.clave) && x.resultado === 'No');
  if (!f.length) return null;
  return `Aviso de riesgo (comprobación de compra, no bloquea): ${f.map((x) => (x.clave === 'P4' ? `deuda neta / EBITDA ${x.valor} (> 3)` : `dilución ${x.valor} (> 2 %)`)).join(' y ')}. En el backtest, las compras con esto tuvieron más caídas fuertes; mirar en el informe si la deuda o las acciones nuevas están justificadas antes de comprar.`;
}
