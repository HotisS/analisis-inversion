// Supuestos numéricos del analista (TeamViewer SE, TMV, corte 2026-10-20). Millones de EUR, NIIF-UE.
// EBITDA del DCF = EBITDA NIIF con los pagos en acciones como coste y sin los no recurrentes de la compra de 1E (2025: 306,4 + 7,5 =
// 313,9 M, 42,0 % [A1]). Es unos 2 puntos menos que el EBITDA ajustado de la empresa (43,6 % en 2025), que excluye además los pagos en acciones.
// Amortización del DCF y del BPA = SIN la amortización de los intangibles de las compras (PPA: 29,4 M en 2025 [A1]), que no desgrava
// (compra de acciones: genera pasivo por impuesto diferido) y no es caja; la amortización restante (≈ 24 M, 3,3 % de las ventas en 2025)
// incluye la de los derechos de uso. Capex = inversión en inmovilizado (5,8 M) + altas de arrendamientos (≈ pagos de principal, 12,6 M) [A1].
const crec = [1.1, 3.0, 3.5, 3.5, 3.0, 2.5, 2.0, 2.0, 1.8, 1.5];
const margen = [40.5, 41.0, 41.5, 41.5, 41.5, 41.5, 41.5, 41.5, 41.5, 41.5];
const amort = [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0];
const capex = [2.6, 2.6, 2.7, 2.7, 2.8, 2.8, 2.9, 2.9, 3.0, 3.0];
const nwc = [-47, -46, -46, -46, -46, -46, -46, -46, -46, -46];
const tasa = [30, 30, 29.5, 29, 28.5, 28, 28, 28, 28, 28];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: nwc[i],
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

const S = {
  anios,
  // Bund 10 años 3,45 % (Bundesbank, 20-oct-2026) [D4]; beta mensual de 5 años frente al DAX 1,20 (semanal ajustada 0,93) [D1]: se usa la
  // más alta por el apalancamiento y el riesgo de IA; prima adicional 1,0 por el riesgo de sustitución por IA de las sesiones de soporte y
  // la pérdida de clientes pequeños; Kd 4,75 % (intereses de 2026 ≈ 4,6 % de la deuda media más comisiones [A2]); deuda 35 % (deuda neta
  // 832,8 M frente a 1.110 M de capitalización hoy, 43 %; objetivo de la empresa: bajar el apalancamiento a ≈ 2,3x a fin de 2026).
  wacc: { tasa_libre_pct: 3.45, beta: 1.2, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 4.75, tasa_impositiva_pct: 30, peso_deuda_pct: 35 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 8.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  // Volumen = número de clientes de pago (611.900 a jun-26, −7 % interanual [A2]); precio = ARR medio por cliente (sube por la mezcla:
  // salen cuentas pequeñas y crecen Enterprise y TeamViewer ONE); otros 2026e = divisa (−2,4 puntos, guía [A2]) + paso de NIIF 2025 a
  // perímetro completo de 1E (+1,0).
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -5.0, precio_pct: 7.5, otros_pct: -1.4 },
    { periodo: '2027e', volumen_pct: -2.0, precio_pct: 5.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: -1.0, precio_pct: 4.5, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: -0.5, precio_pct: 4.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 0.0, precio_pct: 3.0, otros_pct: 0.0 },
  ],
  // Cuota: no hay una cuota fiable publicada (tamaños de mercado de consultoras con definiciones dispares): prueba de cuota a mano.
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -5.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: -0.5, multiplo_salida: null,
      perfil: [{ periodo: '2027e', crecimiento_pp: -6.0, margen_pp: -4.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 30 },
  // BPA propio («ajustado con pagos en acciones»): resultado financiero recurrente = intereses netos y pérdida de asociadas, sin diferencias
  // de cambio (2025: −41,2 M; 1S26: −21,7 M [A1, A2]), bajando con la amortización de deuda (FCFE ≈ 200 M al año, sin recompras anunciadas);
  // 158,4 M de acciones diluidas (157,8 M en circulación + 0,6 M de dilución) [A2].
  bpa: { fin_recurrente: { '2026e': -42, '2027e': -34, '2028e': -26 }, minoritarios: 0, acciones: 158.4 },
};
export default S;

const VENTAS_2025 = 746.8;
export function bpa(caso = 'Base', hasta = 3) {
  const c = S.casos.find((x) => x.escenario === caso);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < hasta; i++) {
    const a = S.anios[i];
    const k = a.fijo ? 0 : 1;
    const p = (c.perfil || []).find((x) => x.periodo === a.periodo);
    const dg = k * (p ? p.crecimiento_pp : c.ajuste_crecimiento_pp);
    const dm = k * (p ? p.margen_pp : c.ajuste_margen_pp);
    v = v * (1 + (a.crecimiento_pct + dg) / 100);
    const ebitda = v * (a.margen_ebitda_pct + dm) / 100;
    const am = v * a.amortizacion_pct_ventas / 100;
    const ebit = ebitda - am;
    const bai = ebit + S.bpa.fin_recurrente[a.periodo];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - S.bpa.minoritarios;
    r = { periodo: a.periodo, ventas: v, ebitda, ebit, bai, neto, acciones: S.bpa.acciones, bpa: neto / S.bpa.acciones };
  }
  return r;
}
