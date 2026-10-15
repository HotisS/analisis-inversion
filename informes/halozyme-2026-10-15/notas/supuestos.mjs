// Supuestos del DCF, escenarios y pesos de Halozyme (corte 2026-10-15). Ejercicio natural, USD, US GAAP.
// EBITDA contable: después de pagos en acciones y de los costes del pleito con Merck (≈30 M al año); sin I+D en curso adquirida.
// Capex = inmovilizado (≈0,5 % de ventas) + compras de tecnología de reposición desde 2028 (ENHANZE pierde patentes en 2027-2029:
// Halozyme ha comprado Antares, Elektrofi y Surf Bio por ≈2.000 M en cuatro años para tener regalías después).
// Circulante: clientes (regalías que se cobran 45-60 días después del trimestre) + existencias de rHuPH20 − proveedores ≈ 32-42 % de ventas.
const a = (periodo, g, m, am, cx, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: 32, tasa_impositiva_pct: 19, fijo });
export default {
  anios: [
    a('2026e', 34.0, 65.0, 7.3, 0.6, true),
    a('2027e', 12.0, 67.0, 6.6, 2.0),
    a('2028e', 10.0, 67.0, 6.0, 3.0),
    a('2029e', 3.0, 65.0, 5.6, 4.0),
    a('2030e', 4.0, 65.0, 5.0, 4.0),
    a('2031e', 3.0, 64.0, 4.6, 4.0),
    a('2032e', 2.0, 63.0, 4.3, 4.0),
    a('2033e', -3.0, 62.0, 4.0, 4.0),
  ],
  wacc: { tasa_libre_pct: 5.21, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.5, tasa_impositiva_pct: 19, peso_deuda_pct: 18 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 31.0, precio_pct: 1.0, otros_pct: 2.0 },
    { periodo: '2027e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: 1.0, otros_pct: 1.0 },
    { periodo: '2029e', volumen_pct: 7.0, precio_pct: -5.0, otros_pct: 1.0 },
    { periodo: '2030e', volumen_pct: 4.0, precio_pct: 0.0, otros_pct: 0.0 },
  ],
  mercado_final: { periodo: '2033e', tamano: 385000 },
};
