// Supuestos del DCF, escenarios, pesos y BPA propio de AMETEK (corte 2026-10-14). USD, ejercicio natural.
// DCF orgánico salvo Indicor Instrumentation (cerrada el 26-ago-2026, 5.000 M pagados después del balance de junio:
// van en otros_ajustes del puente y sus ventas en 2026e-2027e). Sin compras futuras (ni su gasto ni sus ventas).
// Amortización: depreciación ≈1,8 % de las ventas + intangibles comprados (277 M en 2025 + ≈115 M/año de Indicor,
// estimación propia con la proporción de FARO: 23,2 M al año sobre 1.024 M de precio), que se agotan hacia el capex.
const g = [14.7, 14.5, 6.0, 5.5, 5.0, 4.5, 4.0, 3.75, 3.5, 3.25];
const m = [31.6, 32.0, 32.4, 32.6, 32.8, 32.8, 32.8, 32.8, 32.8, 32.8];
const am = [5.6, 5.9, 5.6, 5.3, 4.9, 4.4, 3.8, 3.2, 2.6, 2.2];
const cx = [1.8, 1.8, 1.9, 1.9, 2.0, 2.0, 2.0, 2.1, 2.1, 2.2];
const anios = g.map((v, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: v, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 16.5, tasa_impositiva_pct: 18.5, fijo: i === 0,
}));

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio (GAAP, con la amortización de intangibles): ventas × margen − amortización − financieros − impuestos, ÷ acciones.
// Financieros: 2026 = 51 M del 1S (con 10 M del puente) + ≈40 M de la deuda previa en el 2S + ≈85 M de Indicor (5.000 M al 5 %, 4 meses) + 15 M de otros gastos;
// 2027 ≈ 300 M (deuda media ≈6.200 M al 4,8 %, amortizándose con la caja libre) + 10; 2028 ≈ 225 M (≈4.800 M) + 10. Sin recompras.
const VENTAS_2025 = 7401.1;
const financieros = { 2026: 191, 2027: 310, 2028: 235 };
const acciones = { 2026: 229.9, 2027: 230.5, 2028: 231.0 };
function bpa(anio, dg = 0, dm = 0) {
  let v = VENTAS_2025;
  for (let i = 0; i < anios.length; i++) {
    const a = anios[i]; const y = 2026 + i;
    v *= 1 + (a.crecimiento_pct + (a.fijo ? 0 : dg)) / 100;
    if (y === anio) {
      const ebitda = v * (a.margen_ebitda_pct + (a.fijo ? 0 : dm)) / 100;
      const ebit = ebitda - v * a.amortizacion_pct_ventas / 100;
      const bn = (ebit - financieros[y]) * (1 - a.tasa_impositiva_pct / 100);
      return { ventas: +v.toFixed(0), ebitda: +ebitda.toFixed(0), ebit: +ebit.toFixed(0), beneficio: +bn.toFixed(0), bpa: +(bn / acciones[y]).toFixed(2) };
    }
  }
}
const bpas = {
  b2026: bpa(2026), b2027: bpa(2027), b2028: bpa(2028),
  bajista2028: bpa(2028, -3, -2), alcista2028: bpa(2028, 1.5, 1),
};

// Historia del PER adelantado: cierre de cada año ÷ BPA GAAP real del año siguiente (mismo criterio que el BPA propio).
// 2016 fuera: el BPA de 2017 lleva el efecto de la reforma fiscal (tipo del 14,5 %).
const precio = 246.77;
const hist = {
  2017: 72.47 / 3.34, 2018: 67.70 / 3.75, 2019: 99.74 / 3.77, 2020: 120.94 / 4.25,
  2021: 147.04 / 5.01, 2022: 139.72 / 5.67, 2023: 164.89 / 5.93, 2024: 180.26 / 6.40, 2025: 205.31 / bpas.b2026.bpa,
};
const r1 = (x) => +x.toFixed(1);
const cinco = [hist[2021], hist[2022], hist[2023], hist[2024], hist[2025]].sort((a, b) => a - b);
const mediana = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
const largo = [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025].map((y) => hist[y]);
const per_historico = {
  base: 'adelantado',
  actual: r1(precio / bpas.b2027.bpa),
  mediana_5a: r1(mediana(cinco)), minimo_5a: r1(Math.min(...cinco)), media_larga: r1(largo.reduce((s, x) => s + x, 0) / largo.length),
  v2: { mediana_5a: 30.4, minimo_5a: 27.9, media_larga: 29.1, excluidos: 'Historia al cierre (precio de cierre ÷ BPA GAAP del mismo año): 2018 20,3x; 2019 26,6x; 2020 32,1x; 2021 34,6x; 2022 27,9x; 2023 29,1x; 2024 30,4x; 2025 32,1x. Media larga 2018-2025; sin exclusiones.' },
};

export default {
  anios,
  wacc: { tasa_libre_pct: 5.19, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.0, tasa_impositiva_pct: 21, peso_deuda_pct: 11 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 3.0, otros_pct: 7.2 },
    { periodo: '2027e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 9.0 },
    { periodo: '2028e', volumen_pct: 3.5, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 3.0, precio_pct: 2.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 2.5, precio_pct: 2.5, otros_pct: 0 },
  ],
  mercado_final: null,
  bpas, hist, per_historico,
};
