// Supuestos numéricos del analista (Rexel SA, corte 2026-10-26; iteración tras las ventas del 3T26). Cuentas consolidadas NIIF-UE en millones de EUR; ejercicio natural.
// Último ejercicio real 2025: ventas 19.414,6; EBITDA de la empresa (antes de otros ingresos y gastos) 1.552,6 = 8,0 % [A1].
// 2026e fijo (tres trimestres publicados y guía elevada por segunda vez el 22-oct: ventas a días constantes c. +7 %, margen EBITA
// corriente ajustado ≥ 6,4 %) [A15]. Publicado 9M26 +6,2 %; 4T con perímetro +2,0 %, divisa +2,1 % y calendario +1,0 % (anexo 2) → año ≈ +7,5 %.
// Margen EBITDA de la empresa = EBITA corriente (≈ 6,45 % ajustado + efecto cobre no recurrente positivo) + amortización de
// inmovilizado (≈ 2,0 %) ≈ 8,5 % (8,0 % en 2025; el consenso pre-3T daba 8,3 % con un EBITA ajustado del 6,34 %) [A1, A17].
// 2027e incluye GCG (≈ 1.100 M USD de ventas ≈ 983 M EUR al tipo del 23-oct, ≈ 4,7 puntos; margen EBITA c. 11 %; cierre previsto a
// final de 2026) [A7], el arrastre de Revere, TC 360 y DEE (≈ +0,8 puntos) y un 4,5 % orgánico → 10,0 %.
// Capex = inversión en inmovilizado (≈ 0,75 % de las ventas) + altas de derechos de uso (≈ 1,3-1,4 %: los arrendamientos van en
// el puente como deuda). La amortización incluye la de derechos de uso y la de intangibles de compras (PPA).
const crec = [7.5, 10.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [8.5, 8.8, 8.9, 9.0, 9.0, 9.0, 9.0];
const amort = [2.25, 2.35, 2.35, 2.3, 2.3, 2.25, 2.25];
const capex = [2.1, 2.15, 2.2, 2.2, 2.2, 2.25, 2.25];
const tasa = [28.5, 27.0, 27.0, 27.0, 27.0, 27.0, 27.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 15.0,
  tasa_impositiva_pct: tasa[i],
  fijo: i === 0,
}));

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -0.8, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.75, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.4, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA publicado (la misma base que la historia del PER: 1,96 / 3,04 / 2,57 / 1,13 / 1,99 en 2021-2025 [A1-A3]).
// BPA = (ventas × margen − amortización − otros gastos recurrentes de reestructuración (≈ 50 M al año; 56 M en 2025)
//        − resultado financiero) × (1 − impuesto) − minoritarios, ÷ acciones.
// Cuadre 2025: 1.552,6 − 434,8 − 56,2 − 214,2 = 847,4; × (1 − 30,2 %) − 2,5 = 588,9 ÷ 295,5 = 1,99 [A1].
// Resultado financiero: 2026e −225 (OCEANE al 1 % desde mayo y ≈ 400 M de compras del 1S26 con deuda); 2027e-2028e −260 y −255
// (≈ 800 M de deuda nueva para GCG al ≈ 4,5 %; el consenso pre-3T con GCG daba −267 y −259) [A17].
// Acciones: 2026e media ≈ 299,5 M (14,39 M nuevas desde el 1-oct); desde 2027e 308,9 M (308,45 M en circulación más ≈ 0,45 M de
// acciones gratuitas) [A9]; la OCEANE convierte
// a 50,30 EUR (fuera de dinero) y no hay recompras anunciadas.
const VENTAS_2025 = 19414.6;
const fin = [225, 260, 255];
const acc = [299.5, 308.9, 308.9];
export function bpa(escenario, n) {
  const c = casos.find((x) => x.escenario === escenario);
  let v = VENTAS_2025; let r = null;
  for (let i = 0; i < n; i++) {
    const a = anios[i];
    const dg = a.fijo ? 0 : c.ajuste_crecimiento_pp; const dm = a.fijo ? 0 : c.ajuste_margen_pp;
    v *= 1 + (a.crecimiento_pct + dg) / 100;
    const ebitda = v * (a.margen_ebitda_pct + dm) / 100;
    const bai = ebitda - v * a.amortizacion_pct_ventas / 100 - 50 - fin[i];
    const neto = bai * (1 - a.tasa_impositiva_pct / 100) - 3;
    r = { periodo: a.periodo, ventas: v, ebitda, bai, neto, bpa: neto / acc[i] };
  }
  return r;
}

export default {
  anios,
  // Beta: ajustada mensual de 5 años 1,27 [D11] desapalancada con la deuda media del periodo (D/E ≈ 0,45 con arrendamientos) → 0,95, y
  // reapalancada con la de hoy (deuda neta ajustada con GCG 5.953 M sobre 10.065 M de capitalización, D/E 0,59) → 1,37.
  wacc: { tasa_libre_pct: 3.39, beta: 1.37, prima_mercado_pct: 5.5, prima_adicional_pct: 0.3, coste_deuda_pct: 4.5, tasa_impositiva_pct: 27, peso_deuda_pct: 37 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.25, multiplo_salida: 9.0 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.2, precio_pct: 3.7, otros_pct: 0.6 },
    { periodo: '2027e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 5.5 },
    { periodo: '2028e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  // Mercado direccionable de la empresa (≈ 320.000 M en 2025 [B1]) creciendo un 4 % al año hasta 2032.
  mercado_final: { periodo: '2032e', tamano: 405000 },
  casos,
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
