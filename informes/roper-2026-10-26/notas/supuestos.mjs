// Supuestos del DCF, escenarios, pesos y BPA propio de Roper Technologies (corte 2026-10-26, tras el 3T26). USD, ejercicio natural.
// DCF orgánico: sin compras futuras (ni su gasto ni sus ventas). La amortización es sobre todo de intangibles comprados
// (858 M en 2025, vidas de ~17-19 años): con la cartera actual se va agotando y converge al capex al final.
const g = [8.7, 6.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.25, 3.0];
const m = [39.0, 39.1, 39.2, 39.3, 39.4, 39.5, 39.5, 39.5, 39.5, 39.5];
const am = [10.8, 9.7, 9.1, 8.5, 7.8, 6.9, 5.8, 4.5, 3.0, 1.5];
const cx = [1.3, 1.3, 1.3, 1.3, 1.3, 1.3, 1.4, 1.4, 1.5, 1.5];
const anios = g.map((v, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: v, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -11.5, tasa_impositiva_pct: 21, fijo: i === 0,
}));

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio (GAAP «limpio»: con la amortización de intangibles, sin la participación en Indicor)
const VENTAS_2025 = 7902.5;
const intereses = { 2026: 417, 2027: 410, 2028: 400 };
const acciones = { 2026: 101.0, 2027: 99.5, 2028: 99.5 };
function bpa(anio, dg = 0, dm = 0) {
  let v = VENTAS_2025;
  for (let i = 0; i < anios.length; i++) {
    const a = anios[i]; const y = 2026 + i;
    v *= 1 + (a.crecimiento_pct + (a.fijo ? 0 : dg)) / 100;
    if (y === anio) {
      const ebitda = v * (a.margen_ebitda_pct + (a.fijo ? 0 : dm)) / 100;
      const ebit = ebitda - v * a.amortizacion_pct_ventas / 100;
      const bn = (ebit - intereses[y]) * (1 - a.tasa_impositiva_pct / 100);
      return { ventas: +v.toFixed(0), ebitda: +ebitda.toFixed(0), ebit: +ebit.toFixed(0), beneficio: +bn.toFixed(0), bpa: +(bn / acciones[y]).toFixed(2) };
    }
  }
}
const bpas = {
  b2026: bpa(2026), b2027: bpa(2027), b2028: bpa(2028),
  bajista2028: bpa(2028, -3, -2), alcista2028: bpa(2028, 1.5, 1),
};

// Historia del PER adelantado: cierre de cada año ÷ BPA limpio del año siguiente (mismo criterio que el BPA propio).
const precio = 438.14;
const hist = {
  2017: 259.0 / 9.05, 2019: 354.23 / 8.98, 2020: 431.09 / 10.82,
  2022: 432.09 / 11.59, 2023: 545.17 / 12.88, 2024: 519.85 / 14.04, 2025: 445.13 / bpas.b2026.bpa,
};
const r1 = (x) => +x.toFixed(1);
const cinco = [hist[2022], hist[2023], hist[2024], hist[2025]].sort((a, b) => a - b);
const mediana = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
const largo = Object.values(hist);
const per_historico = {
  base: 'adelantado',
  actual: r1(precio / bpas.b2027.bpa),
  mediana_5a: r1(mediana(cinco)), minimo_5a: r1(Math.min(...cinco)), media_larga: r1(largo.reduce((s, x) => s + x, 0) / largo.length),
  v2: { mediana_5a: 44.0, minimo_5a: 31.7, media_larga: 40.9, excluidos: 'Historia al cierre (precio de cierre ÷ BPA del mismo año): 2018 29,5x; 2020 48,0x; 2021 45,5x (BPA total publicado entonces); 2022 44,0x; 2023 47,0x; 2024 40,4x; 2025 31,7x (BPA limpio de operaciones continuadas desde 2022). Excluidos 2016-2017 (reforma fiscal de 2017) y 2019 (plusvalía de la venta de Imaging).' },
};

export default {
  anios,
  wacc: { tasa_libre_pct: 5.0, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 4.6, tasa_impositiva_pct: 21, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 16 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 2.7 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 3.0, precio_pct: 3.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 2.75, precio_pct: 2.75, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  bpas, hist, per_historico,
};
