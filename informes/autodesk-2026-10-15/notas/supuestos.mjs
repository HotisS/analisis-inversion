// Supuestos del DCF, escenarios y pesos de Autodesk (corte 2026-10-15). Ejercicio a enero, etiqueta «fin» (FY2027 = feb-26 a ene-27). USD.
// EBITDA = GAAP sin reestructuración ni costes de adquisición: lleva los pagos en acciones como gasto (≈ margen non-GAAP − pagos en acciones + depreciación).
// Capex = inmovilizado e intangibles comprados (≈1 % de ventas) + aumento de los costes de obtención de contratos activados (comisiones de revendedores
// del nuevo modelo de transacción, 913 M en ene-26, ≈12,7 % de las ventas), que no pasan por el EBITDA ni por el circulante del motor.
// Circulante = clientes − proveedores − ingresos diferidos (−51 % de las ventas en FY2026; baja en valor absoluto con la facturación anual).
const a = (periodo, g, m, am, cx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: 20, fijo });
export default {
  anios: [
    a('FY2027e', 15.5, 30.6, 3.2, 2.3, -46, true),
    a('FY2028e', 10.5, 31.8, 3.4, 2.3, -45),
    a('FY2029e', 10.0, 33.0, 3.2, 2.3, -45),
    a('FY2030e', 9.5, 33.8, 3.0, 2.3, -44),
    a('FY2031e', 9.0, 34.4, 2.8, 2.3, -43),
    a('FY2032e', 8.0, 34.8, 2.6, 2.2, -42),
    a('FY2033e', 7.0, 35.0, 2.4, 2.2, -41),
    a('FY2034e', 6.0, 35.0, 2.2, 2.2, -40),
    a('FY2035e', 5.0, 35.0, 2.1, 2.2, -40),
    a('FY2036e', 4.0, 35.0, 2.0, 2.2, -40),
  ],
  wacc: { tasa_libre_pct: 5.19, beta: 1.15, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 5.4, tasa_impositiva_pct: 21, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 3.0, multiplo_salida: 17 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.5, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 6.0, precio_pct: 5.0, otros_pct: 4.5 },
    { periodo: 'FY2028e', volumen_pct: 5.0, precio_pct: 4.0, otros_pct: 1.5 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 4.0, otros_pct: 0.5 },
    { periodo: 'FY2030e', volumen_pct: 5.5, precio_pct: 3.5, otros_pct: 0.5 },
    { periodo: 'FY2031e', volumen_pct: 5.5, precio_pct: 3.5, otros_pct: 0 },
  ],
  mercado_final: null,
};
