// Supuestos numéricos (L'Oréal, corte 2026-10-23, tras las ventas del 3T26). Base: 2025 real con fuentes primarias [A]:
// ventas 44.052 M, EBITDA 10.544 M (resultado operativo 8.892 M + amortización 1.652 M; definición de la empresa).
// 2026e: 9M +7,7 % publicado (+6,9 % comparable, +2,0 perímetro, −1,2 divisa) y 3T +11,9 %; un 4T al ritmo del 3T deja el año en ≈+8 % [A, D].
// Capex = inversión (3,4 % de las ventas en 2025) + altas de derechos de uso (≈1,2 %). Circulante comercial 7,5 % en 2025 [A].
const crec = [8.0, 6.5, 6.5, 5.5, 5.0, 5.0, 4.5, 4.0, 3.5, 3.0];
const margen = [24.3, 24.5, 24.7, 24.9, 25.0, 25.1, 25.2, 25.3, 25.3, 25.3];
const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`,
  crecimiento_pct: g,
  margen_ebitda_pct: margen[i],
  amortizacion_pct_ventas: 3.8,
  capex_pct_ventas: 4.6,
  nwc_pct_ventas: 7.5,
  tasa_impositiva_pct: 25.0,
  fijo: i === 0,
}));

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA de 2026e-2028e para el objetivo a 12 meses (base del BPA sin partidas no recurrentes): resultado operativo + resultado financiero
// (intereses de ≈12.700 M de deuda neta menos los dividendos de Sanofi, ≈370 M: −50 M en 2026e y 0 después), impuesto del 25 %,
// minoritarios −15 M, 533,9 M de acciones diluidas [A, D]. Galderma (20 %, puesta en equivalencia) no se suma: prudencia.
const V25 = 44052, ACC = 533.9, FIN = [-50, 0, 0], MINOR = -15;
const red = (x, d) => Math.round(x * 10 ** d) / 10 ** d;
export function bpa(caso) {
  let v = V25;
  return anios.slice(0, 3).map((f, i) => {
    const dg = i === 0 ? 0 : (caso?.ajuste_crecimiento_pp ?? 0);
    const dm = i === 0 ? 0 : (caso?.ajuste_margen_pp ?? 0);
    v *= 1 + (f.crecimiento_pct + dg) / 100;
    const ebit = v * (f.margen_ebitda_pct + dm - f.amortizacion_pct_ventas) / 100;
    const neto = (ebit + FIN[i]) * (1 - f.tasa_impositiva_pct / 100) + MINOR;
    return { periodo: f.periodo, ventas: red(v, 0), ebit: red(ebit, 0), neto: red(neto, 0), bpa: red(neto / ACC, 2) };
  });
}

export default {
  anios,
  // Bund a 10 años del 22-oct-2026 (3,44 %) [D]; beta 0,87 [D].
  wacc: { tasa_libre_pct: 3.44, beta: 0.87, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.2, tasa_impositiva_pct: 25.0, peso_deuda_pct: 7 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 5, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.5, precio_pct: 3.5, otros_pct: 1.0 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0.5 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2035e', tamano: 466000 },
  casos,
  pesos: { dcf: 55, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 30 },
};
if (process.argv[1]?.endsWith('supuestos.mjs')) for (const c of casos) { console.log(c.escenario); console.table(bpa(c)); }
