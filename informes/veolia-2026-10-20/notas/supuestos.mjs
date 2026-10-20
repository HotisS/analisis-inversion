// Supuestos del DCF y de los escenarios de Veolia (corte 2026-10-20). Perímetro: grupo actual con Clean Earth (cerrada a
// principios de junio de 2026) y Enviropacific (fin de marzo de 2026); sin desinversiones del plan (> 2.000 M hasta
// mediados de 2028), que se tratan como neutras en valor, y sin compras nuevas.
const g = [3.0, 4.0, 3.5, 3.3, 3.0, 2.8, 2.6, 2.5, 2.3, 2.2];
const m = [16.3, 16.6, 16.8, 16.9, 17.0, 17.0, 17.0, 17.0, 17.0, 17.0];
export default {
  anios: g.map((x, i) => ({ periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: 7.7, capex_pct_ventas: 10.3, nwc_pct_ventas: -9.0, tasa_impositiva_pct: i === 0 ? 25.8 : 26.0, fijo: i === 0 })),
  wacc: { tasa_libre_pct: 3.49, beta: 1.0, prima_mercado_pct: 5.5, prima_adicional_pct: 0.6, coste_deuda_pct: 4.3, tasa_impositiva_pct: 25.8, peso_deuda_pct: 51 },
  terminal: { metodo: 'media', crecimiento_pct: 2.0, multiplo_salida: 8 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 1.0, precio_pct: 1.5, otros_pct: 0.5 },
    { periodo: '2027e', volumen_pct: 1.5, precio_pct: 1.5, otros_pct: 1.0 },
    { periodo: '2028e', volumen_pct: 1.5, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2029e', volumen_pct: 1.3, precio_pct: 2.0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: 1.0, precio_pct: 2.0, otros_pct: 0 },
  ],
  mercado_final: null,
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -1.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: 7, perfil: [] },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 0.5, ajuste_wacc_pp: -0.25, crecimiento_terminal_pct: null, multiplo_salida: 9, perfil: [] },
  ],
  pesos: { dcf: 60, comparables: 0, transacciones: 0, suma_partes: 0, escenarios: 40 },
};
