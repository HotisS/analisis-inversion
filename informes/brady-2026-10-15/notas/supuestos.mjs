// Supuestos del DCF, escenarios, pesos y objetivo a 12 meses de Brady (corte 2026-10-15). USD, ejercicio a 31-jul («FY2027e» = ago-26 a jul-27), US GAAP.
// FY2027e incluye PSS desde el 3-ago-2026 (≈1.150 M de ventas, guía) y el orgánico de identificación (IDS) de ≈5 %: ventas ≈2.895 M (+74,2 %).
// Se marca «fijo» aunque no haya trimestres publicados: el salto es de perímetro (compra cerrada y guiada) y moverlo con los escenarios
// o con el DCF inverso no tiene sentido (el 74 % no es crecimiento orgánico). Los escenarios mueven FY2028e en adelante.
// Margen EBITDA (US GAAP, después de la remuneración en acciones): FY2026 normalizado 21,1 % (350,2 M sin 41,8 M de costes de PSS y del CEO).
// FY2027e: IDS ≈21,5 % (≈375 M) + IPS ≈11,8 % (≈136 M) = ≈511 M sin costes de integración (17,6 %); con ≈35 M de integración, 16,4 %.
// Después: sinergias de 25 M en tres años [guía] y mezcla: 17,9 % → 19,0 %.
// Amortización total = inmovilizado (≈45 M, guía) + intangibles comprados (20,9 M en FY2026 + PSS, ≈40 M estimados sin asignación del precio).
// Capex: ≈40 M en FY2027 (guía, 1,4 %) subiendo al 2,5 % (= amortización al final).
// Circulante comercial: 22,7 % de las ventas en FY2026 (existencias 225 + clientes 261 − proveedores 109 = 377 M). El de PSS se pagó con
// el precio de compra (está en el puente), así que el porcentaje se fija en 13,7 % (≈397 M / 2.895 M) para que FY2027e solo recoja el aumento
// orgánico; después se mantiene: infravalora algo el circulante del crecimiento futuro (≈7 puntos × el aumento de ventas, ≈9 M al año).
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 13.7, tasa_impositiva_pct: 21.5, fijo });

// BPA ajustado (sin amortización de intangibles comprados ni costes no recurrentes; definición de la empresa) de nuestra proyección.
// ventas × margen EBITDA sin no recurrentes − amortización del inmovilizado (1,6 %) − intereses netos + otros ingresos, × (1 − 21,5 %) ÷ acciones.
// Cuadre FY2026: 350,2 − 24,0 (amortización del inmovilizado) − 9,7 + 5,6 = 322,1 M (antes de impuestos ajustado publicado 322,1);
// × (1 − 21,6 %) = 252,6 M ÷ 47,75 M = 5,29 USD (publicado 5,29).
const V26 = 1661.6, V27 = V26 * 1.742;
const bpa = (ventas, margen, intereses, acciones, tasa = 21.5) => Math.round(((ventas * margen / 100 - ventas * 0.016 - intereses + 5) * (1 - tasa / 100) / acciones) * 100) / 100;
const bpa27 = bpa(V27, 17.55, 78, 47.6, 21);
const V28 = { Bajista: V27 * 1.013, Base: V27 * 1.043, Alcista: V27 * 1.058 };
const bpa28 = { Bajista: bpa(V28.Bajista, 15.9, 68, 47.5), Base: bpa(V28.Base, 17.9, 65, 47.5), Alcista: bpa(V28.Alcista, 18.9, 62, 47.5) };

// Historia del PER en la misma base (BPA ajustado: publicado + amortización de intangibles × (1 − 24 %) ÷ acciones + no recurrentes).
// FY2025 (4,60) y FY2026 (5,29) son los publicados por la empresa; FY2019-FY2024, estimación propia con el XBRL (cuadra con FY2025).
const bpaAj = { FY2019: 2.54, FY2020: 2.18, FY2021: 2.57, FY2022: 3.12, FY2023: 3.68, FY2024: 4.22, FY2025: 4.60, FY2026: 5.29, FY2027: bpa27 };
const cierres = { FY2018: 38.25, FY2019: 51.73, FY2020: 45.97, FY2021: 54.68, FY2022: 47.85, FY2023: 51.58, FY2024: 71.61, FY2025: 70.57, FY2026: 94.27 };
const sig = (y) => `FY${Number(y.slice(2)) + 1}`;
const adel = Object.fromEntries(Object.keys(cierres).filter((y) => bpaAj[sig(y)]).map((y) => [y, cierres[y] / bpaAj[sig(y)]]));
const cier = Object.fromEntries(Object.keys(cierres).filter((y) => bpaAj[y]).map((y) => [y, cierres[y] / bpaAj[y]]));
const med = (v) => { const s = [...v].sort((x, y) => x - y); const m = s.length >> 1; return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2; };
const r1 = (v) => Math.round(v * 10) / 10;
const ult5 = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const largo = ['FY2019', 'FY2020', 'FY2021', ...ult5];
const precio = 83.65;

export default {
  anios: [
    a('FY2027e', 74.2, 16.4, 3.6, 1.4, true),
    a('FY2028e', 4.3, 17.9, 3.5, 1.7),
    a('FY2029e', 4.5, 18.4, 3.3, 1.9),
    a('FY2030e', 4.0, 18.8, 3.0, 2.1),
    a('FY2031e', 3.5, 19.0, 2.7, 2.3),
    a('FY2032e', 3.0, 19.0, 2.5, 2.5),
  ],
  wacc: { tasa_libre_pct: 5.19, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.6, tasa_impositiva_pct: 21.5, peso_deuda_pct: 25 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 11 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 69.2 },
    { periodo: 'FY2028e', volumen_pct: 2.3, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 2.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2031e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: { periodo: 'FY2031e', tamano: 16700 },
  // objetivo 12 m
  V27, V28, bpa27, bpa28, adel, cier,
  per_historico: {
    base: 'adelantado',
    actual: r1(precio / bpa27),
    mediana_5a: r1(med(ult5.map((y) => adel[y]))),
    minimo_5a: r1(Math.min(...ult5.map((y) => adel[y]))),
    media_larga: r1(largo.map((y) => adel[y]).reduce((s, x) => s + x, 0) / largo.length),
    v2: {
      mediana_5a: r1(med(ult5.map((y) => cier[y]))),
      minimo_5a: r1(Math.min(...ult5.map((y) => cier[y]))),
      media_larga: r1(largo.map((y) => cier[y]).reduce((s, x) => s + x, 0) / largo.length),
      excluidos: 'Historia al cierre (precio de cierre del ejercicio ÷ BPA ajustado del mismo ejercicio), FY2019-FY2026; sin FY2017-FY2018 (BPA de FY2018 deformado por la reforma fiscal de EE. UU.).',
    },
  },
};
