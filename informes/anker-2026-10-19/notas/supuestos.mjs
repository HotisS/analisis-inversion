// Supuestos del DCF, escenarios y pesos de Anker Innovations (corte 2026-10-19). CNY, ejercicio natural, base CAS 2025.
// 2026e medio cerrado: 1S26 publicado (ventas 16.605 M, +29,1 %); el consejo aprueba el 3T26 el 29-oct. Ventas 2026e ≈ 38.750 M (+27 %).
// Margen EBITDA (sin tesorería, valor razonable ni cambio) del 10,1 % en 2023, 9,0 % en 2024 y 2025, y 8,9 % en el LTM sin la
// devolución de aranceles IEEPA (≈ 700 M, no recurrente: no se proyecta). Sube medio punto por año hasta el 10 % por la mezcla
// (almacenamiento, audio con IA) y el apalancamiento de la I+D, con aranceles de EE. UU. como los de hoy.
// Capex 1,2 % de las ventas en 2025 (sin fábricas); circulante comercial 14,9 % de las ventas en 2025 y 16,8 % en el LTM.
const a = (periodo, g, m, am, cx, tx, nwc, fijo = false) => ({ periodo, crecimiento_pct: g, margen_ebitda_pct: m, amortizacion_pct_ventas: am, capex_pct_ventas: cx, nwc_pct_ventas: nwc, tasa_impositiva_pct: tx, fijo });
export default {
  anios: [
    a('2026e', 27.0, 9.0, 0.75, 1.2, 16.0, 15.0, true),
    a('2027e', 20.0, 9.5, 0.8, 1.2, 16.0, 15.0),
    a('2028e', 15.0, 10.0, 0.8, 1.2, 16.0, 15.0),
    a('2029e', 11.0, 10.0, 0.8, 1.1, 16.0, 15.0),
    a('2030e', 8.0, 10.0, 0.8, 1.0, 16.0, 15.0),
    a('2031e', 6.0, 10.0, 0.8, 1.0, 16.0, 15.0),
  ],
  wacc: { tasa_libre_pct: 1.6497, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 2.5, tasa_impositiva_pct: 16.0, peso_deuda_pct: 3 },
  terminal: { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 10 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -6.0, ajuste_margen_pp: -2.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 5.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 25.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2027e', volumen_pct: 18.0, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2028e', volumen_pct: 13.5, precio_pct: 1.5, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 10.0, precio_pct: 1.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 7.5, precio_pct: 0.5, otros_pct: 0 },
  ],
  // Mercado final 2031e: los nueve mercados de Anker según Frost & Sullivan (1.375.900 M CNY en 2025 y ≈ 2.496.000 M en 2030
  // con las TCAC de cada mercado [B1]); 2031e con +10 % (por debajo del 12,6 % anual de 2025-2030). La cuota de hoy (2,2 %) se mide igual.
  mercado_final: { periodo: '2031e', tamano: 2746000 },
};
