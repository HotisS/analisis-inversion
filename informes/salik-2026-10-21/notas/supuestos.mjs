// Supuestos del DCF de Salik (corte 2026-10-21). Ver la justificación en textos.mjs.
const g = [-2.5, 7.0, 5.5, 5.0, 4.5, 4.0, 3.5, 3.5, 3.0, 3.0];
const m = [68.0, 68.5, 68.8, 68.8, 68.8, 68.8, 68.8, 68.8, 68.8, 68.8];
// Amortización: la del derecho de concesión es lineal hasta 2071 (≈ 140 M al año) y pesa cada vez menos sobre ventas.
const am = [4.8, 4.5, 4.3, 4.1, 3.9, 3.8, 3.7, 3.6, 3.5, 3.5];
// Capex: hoy casi nulo (2,9 M en 2025); se sube hasta igualar la amortización en 2035 como reserva para pagar puertas nuevas
// a la RTA (las dos de 2024 costaron 2.734 M): sin puertas nuevas el crecimiento depende solo del tráfico.
const cx = [0.1, 0.2, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.3, 3.5];
const anios = g.map((x, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i], nwc_pct_ventas: -7.0, tasa_impositiva_pct: 9.0, fijo: i === 0 }));
export default {
  anios,
  // Tasa libre: Treasury a 10 años 5,15 % (19-oct) [D4] + diferencial soberano de Abu Dabi 0,42 % [D5] = 5,57 % (el AED está ligado al USD).
  // Beta 0,70: la mensual frente al ETF de Emiratos es 0,57 y la ajustada 0,71 [D1]. Prima adicional 1,0: país 0,64 [D5] + 0,36 por
  // depender de una sola concesión y de un solo Gobierno. Coste de la deuda 5,1 % (EIBOR + 0,82 %; 205,6 M sobre 4.000 M en 2025).
  // Peso de la deuda: deuda neta con el dividendo pendiente (5.038,6 + 704,0) sobre deuda + capitalización (38.400) ≈ 13 %.
  wacc: { tasa_libre_pct: 5.57, beta: 0.70, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 5.1, tasa_impositiva_pct: 9.0, peso_deuda_pct: 13 },
  // g 2,75 %: inflación del dólar ≈ 2,5 % + crecimiento real modesto, menos un ajuste porque la concesión termina en 2071 y los activos
  // vuelven a la RTA sin pago (una perpetuidad sobrestima ≈ 5 % el valor terminal con un WACC del 9,7 %).
  terminal: { metodo: 'gordon', crecimiento_pct: 2.75, multiplo_salida: 17.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 0.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 25 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: -4.5, precio_pct: 0.5, otros_pct: 1.5 },
    { periodo: '2027e', volumen_pct: 6.0, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 4.5, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 3.5, precio_pct: 0.0, otros_pct: 1.0 },
  ],
  mercado_final: { periodo: '2030e', tamano: 3740 },
};
