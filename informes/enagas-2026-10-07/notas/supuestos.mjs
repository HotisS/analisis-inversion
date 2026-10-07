// Supuestos del DCF de Enagás (corte 2026-10-07). EBITDA SIN participadas (van en el puente a valor contable).
// Traducción de la retribución regulada a los porcentajes que admite el motor: ver notas/regulado.mjs.
import { proyeccion } from './regulado.mjs';

export const anios = proyeccion.map((p) => ({
  periodo: p.periodo,
  crecimiento_pct: p.crecimiento_pct,
  margen_ebitda_pct: p.margen_ebitda_pct,
  amortizacion_pct_ventas: p.amortizacion_pct_ventas,
  capex_pct_ventas: p.capex_pct_ventas,
  nwc_pct_ventas: -12.0,
  tasa_impositiva_pct: 25.0,
  fijo: p.periodo === '2026e',
}));

// Beta: la de mercado (0,35 frente al IBEX, 5 años) es baja por la poca correlación con un índice bancario;
// usamos la beta sin apalancar de la CNMC (0,45, Circular 5/2026) reapalancada a la estructura de Enagás
// a valor de mercado: D/E = (2.305 + 604) / 4.222 = 0,69 → 0,45 × (1 + 0,75 × 0,69) = 0,68.
export const wacc = {
  tasa_libre_pct: 4.14, beta: 0.68, prima_mercado_pct: 5.02, prima_adicional_pct: 0.0,
  coste_deuda_pct: 3.8, tasa_impositiva_pct: 25.0, peso_deuda_pct: 41.0,
};

export const terminal = { metodo: 'gordon', crecimiento_pct: 0.5, multiplo_salida: 10.0 };

export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -1.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 0.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0.7, ajuste_margen_pp: 1.5, ajuste_wacc_pp: -0.6, crecimiento_terminal_pct: 1.0, multiplo_salida: null, perfil: [] },
];

export const pesos = { dcf: 50, comparables: 25, transacciones: 0, suma_partes: 0, escenarios: 25 };
