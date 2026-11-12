// Supuestos numéricos del analista (DCF, escenarios, pesos). The Marzetti Company, corte 2026-11-12.
// Ejercicio a 30 de junio, etiqueta «fin»: FY2027e = jul-26 a jun-27 (1T27 publicado: ventas −2,4 %, margen EBITDA 12,9 %).
// FY2027e: guía de ventas «un dígito medio» con Bachan's; tomamos +3,0 % (Bachan's ≈ +4 % inorgánico, base −1 %).
// Margen: FY2026 16,0 % sin no recurrentes; FY2027e 15,3 % (1T27 12,9 %, recorte de la mejora del margen bruto a 25-75 pb, SG&A +10-15 %).
// Amortización con los 9,6 M anuales de intangibles de Bachan's y la capacidad de Atlanta; capex guiado ≈ 90 M en FY2027e.
const crec = [3.0, 3.5, 3.0, 2.8, 2.6, 2.5, 2.5, 2.5];
const margen = [15.3, 16.3, 16.6, 16.8, 16.8, 16.8, 16.8, 16.8];
const amort = [4.3, 4.3, 4.2, 4.1, 4.0, 3.9, 3.8, 3.8];
const capex = [4.5, 4.0, 3.9, 3.8, 3.8, 3.8, 3.8, 3.8];
const nwc = [8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0];
const tasa = [23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0, 23.0];
export const anios = crec.map((c, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: c, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: capex[i], nwc_pct_ventas: nwc[i], tasa_impositiva_pct: tasa[i], fijo: false,
}));
export const wacc = { tasa_libre_pct: 4.98, beta: 0.60, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 5.0, tasa_impositiva_pct: 23.0, peso_deuda_pct: 6.0 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 10.0 };
export const etapa2 = { usar: false, anios: 5, margen_final_pct: null };
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -1.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null, perfil: [] },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.0, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 2.75, multiplo_salida: null, perfil: [] },
];
export const pesos = { dcf: 40, comparables: 20, transacciones: 10, suma_partes: 0, escenarios: 30 };
