// Supuestos numéricos (Moncler, corte 2026-10-21, tras las ventas de los nueve meses). Base: 2025 del ESEF (3.132,1 M EUR de ventas,
// EBITDA con NIIF 16 de 1.250,1 M) [A1, A24]. 2026e fijo: 9M de 1.895,4 M (+3 % a tipos corrientes) [A22] y un 4T (≈1.292 M en 2025)
// que cae un 1 % a tipos corrientes, como el 3T (−1,6 %) con la divisa en contra: ≈3.180 M (+1,5 %).
const crec = [1.5, 4.0, 5.5, 5.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0];
// Margen EBITDA: 39,9 % en 2025 y 40,1 % en los últimos 12 meses [A]; 2026e baja con ventas planas y ≈10 M de costes del nuevo gobierno [C];
// vuelve al 40 % en 2028e con el apalancamiento operativo y se queda ahí (el EBIT del 29-30 % de 2022-2025).
const margen = [39.5, 39.5, 40.0, 40.3, 40.5, 40.5, 40.5, 40.5, 40.5, 40.5];
// Capex = inversión neta (6,9 % en 2025; guía de ≈6 % en 2026 [C]) + altas de derechos de uso de tiendas (≈6-7 %): con NIIF 16 el EBITDA
// no lleva alquileres (pagos de 240,9 M en 2025 [A]), así que el capex del DCF paga las tiendas arrendadas.
const capex = [13.0, 13.0, 13.0, 12.5, 12.5, 12.0, 12.0, 12.0, 12.0, 12.0];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 10.8,
  capex_pct_ventas: capex[i],
  nwc_pct_ventas: 10.0,
  tasa_impositiva_pct: 29,
  fijo: i === 0,
}));

// Bund a 10 años del 21-oct (3,47 %) [D12]; beta de la acción frente al índice de 1,1 [D6]; deuda = arrendamientos (≈9 % del valor).
export const wacc = { tasa_libre_pct: 3.47, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 29, peso_deuda_pct: 9 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: null };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 0.5, precio_pct: 3.5, otros_pct: -2.5 },
  { periodo: '2027e', volumen_pct: 1.0, precio_pct: 3.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 2.5, precio_pct: 3.0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.0, precio_pct: 3.0, otros_pct: 0 },
];
// Lujo personal (Bain y Altagamma): 358.000 M EUR en 2025 [B5]; al 3,5 % anual hasta 2035 (estimación propia; Bain da 525.000-640.000 M).
export const mercado_final = { periodo: '2035e', tamano: 505000 };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3, ajuste_margen_pp: -3, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null,
    perfil: [{ periodo: '2027e', crecimiento_pp: -5, margen_pp: -3 }, { periodo: '2028e', crecimiento_pp: -3, margen_pp: -3 }] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.5, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];
export const pesos = { dcf: 40, comparables: 30, transacciones: 0, suma_partes: 0, escenarios: 30 };

// BPA por caso (objetivo a 12 meses): ventas × (margen EBITDA − amortización) − 30 M de coste financiero neto (intereses de
// arrendamientos de 40,6 M menos los de la caja [A]), impuesto del 29 % (29,4 % en 2025 [B]) y 271,6 M de acciones [D4].
// Calibración: 2025 da (913,4 − 26,2) × 0,706 ÷ 271,5 = 2,31, el publicado [A1].
const VENTAS_2025 = 3132.1, ACCIONES = 271.6, FIN = -30;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = VENTAS_2025;
  return anios.slice(0, 3).map((f, i) => {
    const per = caso?.perfil?.find((p) => p.periodo === f.periodo);
    const dg = i === 0 ? 0 : (per ? per.crecimiento_pp : (caso?.ajuste_crecimiento_pp ?? 0));
    const dm = i === 0 ? 0 : (per ? per.margen_pp : (caso?.ajuste_margen_pp ?? 0));
    v = v * (1 + (f.crecimiento_pct + dg) / 100);
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + FIN) * (1 - 0.29);
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACCIONES, 2) };
  });
}

export default { anios, wacc, terminal, etapa2, puente_ingresos, mercado_final, casos, pesos };

if (process.argv[1] && process.argv[1].endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
