// Supuestos del DCF, escenarios, pesos y BPA propio de Tyler Technologies (corte 2026-10-14). USD, ejercicio natural.
// DCF orgánico, sin compras futuras. La amortización incluye la de intangibles comprados (NIC, 2021), que se va agotando.
const g = [9.6, 9.0, 9.0, 8.5, 8.0, 7.0, 6.0, 5.0];
const m = [22.2, 23.5, 25.0, 26.3, 27.5, 28.5, 29.3, 30.0];
const am = [5.8, 5.3, 4.8, 4.2, 3.6, 3.0, 2.4, 2.0];
const cx = [1.0, 1.4, 1.6, 1.8, 1.9, 2.0, 2.0, 2.0];
const anios = g.map((v, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: v, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: -13, tasa_impositiva_pct: 23, fijo: i === 0,
}));

const casos = [
  { escenario: 'Bajista', probabilidad_pct: 30, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 20, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// BPA propio GAAP «limpio» (con pagos en acciones y amortización de lo comprado; sin plusvalías puntuales), impuesto normalizado del 23 %.
const VENTAS_2025 = 2332.3;
const intereses = { 2026: -20, 2027: -10, 2028: -10 }; // negativo = ingreso financiero neto (caja > deuda al 0,5 %)
const acciones = { 2026: 41.6, 2027: 41.0, 2028: 41.0 };
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
  bajista2028: bpa(2028, -3, -3), alcista2028: bpa(2028, 1.5, 2),
};

// Historia del PER adelantado: cierre de cada año ÷ BPA normalizado del año siguiente (BAI × 0,77 / acciones diluidas).
const precio = 346.90;
const hist = {
  2017: 177.05 / 3.00, 2018: 185.82 / 3.07, 2019: 300.02 / 3.25,
  2022: 322.41 / 3.56, 2023: 418.12 / 5.45, 2024: 576.64 / 6.86, 2025: 453.95 / bpas.b2026.bpa,
};
const r1 = (x) => +x.toFixed(1);
const cinco = [hist[2022], hist[2023], hist[2024], hist[2025]].sort((a, b) => a - b);
const mediana = (a) => (a.length % 2 ? a[(a.length - 1) / 2] : (a[a.length / 2 - 1] + a[a.length / 2]) / 2);
const largo = Object.values(hist);
const per_historico = {
  base: 'adelantado',
  actual: r1(precio / bpas.b2027.bpa),
  mediana_5a: r1(mediana(cinco)), minimo_5a: r1(Math.min(...cinco)), media_larga: r1(largo.reduce((s, x) => s + x, 0) / largo.length),
  v2: { mediana_5a: 100.2, minimo_5a: 66.2, media_larga: 96.8, excluidos: 'Historia al cierre (cierre ÷ BPA normalizado del mismo año): 2018 61,9x; 2019 97,7x; 2020 134,3x; 2022 94,5x; 2023 117,4x; 2024 105,8x; 2025 66,2x. Excluido 2021 (185,5x: BPA hundido por la compra de NIC, con sus costes y la amortización de lo comprado, frente a un precio en máximos).' },
};

export default {
  anios,
  wacc: { tasa_libre_pct: 5.21, beta: 0.90, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 23, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 18 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos,
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 4.5, precio_pct: 3.5, otros_pct: 1.6 },
    { periodo: '2027e', volumen_pct: 5.0, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: '2028e', volumen_pct: 5.0, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: '2029e', volumen_pct: 5.0, precio_pct: 3.5, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 4.5, precio_pct: 3.5, otros_pct: 0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 45000 },
  bpas, hist, per_historico,
};
