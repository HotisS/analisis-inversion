// Supuestos del DCF, escenarios y pesos de Burckhardt Compression (corte 2026-10-15). CHF, Swiss GAAP FER.
// Ejercicio de abril a marzo con la etiqueta de la empresa («FY2025» = abr-25 a mar-26: etiqueta «inicio»).
// Sin NIIF 16: los alquileres están en el EBITDA y no hay pasivos por arrendamiento (como en US GAAP).
// Circulante = existencias + clientes − proveedores − anticipos de clientes (pasivos_contrato): 17,4 % en FY2025 (mínimo tras cobrar ~100 M),
// 23,4 % en FY2024 y 33,1 % en FY2023; con menos pedidos bajan los anticipos y el circulante sube: 21 % en la proyección.
const a = (periodo, g, m, cx = 2.4, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: 2.2, capex_pct_ventas: cx, nwc_pct_ventas: 21, tasa_impositiva_pct: 22, fijo });
export default {
  anios: [
    { ...a('FY2026e', -9.0, 14.0, 2.8), nwc_pct_ventas: 19 },
    { ...a('FY2027e', 2.0, 15.0, 2.6), nwc_pct_ventas: 20 },
    a('FY2028e', 5.0, 15.5),
    a('FY2029e', 5.0, 16.0),
    a('FY2030e', 4.0, 16.0),
    a('FY2031e', 3.0, 16.0),
    a('FY2032e', 2.0, 16.0),
  ],
  wacc: { tasa_libre_pct: 0.54, beta: 0.95, prima_mercado_pct: 5.5, prima_adicional_pct: 1.5, coste_deuda_pct: 1.8, tasa_impositiva_pct: 22, peso_deuda_pct: 9 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [{ periodo: 'FY2027e', crecimiento_pp: -8.0, margen_pp: -3.0 }] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 40, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: 'FY2026e', volumen_pct: -13.5, precio_pct: 2.0, otros_pct: 2.5 },
    { periodo: 'FY2027e', volumen_pct: -0.5, precio_pct: 2.0, otros_pct: 0.5 },
    { periodo: 'FY2028e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2029e', volumen_pct: 3.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: 'FY2030e', volumen_pct: 2.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
};
