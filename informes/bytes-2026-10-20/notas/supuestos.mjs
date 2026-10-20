// Supuestos del DCF, escenarios y pesos de Bytes Technology Group (corte 2026-10-20). Ejercicio a 28/29 de febrero,
// etiquetado por el año en que termina (FY2027 = mar-26 a feb-27, con el primer semestre publicado). Millones de GBP.
// Ingresos = ventas NIIF (software neto, hardware y servicios propios brutos). Margen EBITDA sobre esas ventas.
const g = [13.0, 10.0, 8.0, 7.0, 6.0, 5.0, 4.0, 3.0];
// FY2027: resultado operativo +4 % (guía +1-5 %) = 65,2 M + D&A 3,9 M = 69,1 M sobre 249,3 M de ventas = 27,7 %.
const m = [27.7, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5, 27.5];
// D&A: 1,4 % en el FY2026 (3,1 M) y 1,5 % en el HY27; sube con la amortización del software propio y de los intangibles de CyberOne.
const am = [1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6, 1.6];
// Capex: 2,7 % en el FY2026 por el software activado (terminado); 0,5 % en el HY27. Converge a la amortización.
const cx = [1.0, 1.3, 1.4, 1.5, 1.5, 1.6, 1.6, 1.6];
// Circulante comercial (clientes + activos de contrato − proveedores − pasivos de contrato) / ventas: −35,6 % en el FY2026.
// Se supone que se hace algo menos negativo (más servicios brutos, menos EA facturados por Microsoft).
const nwc = [-34, -33, -32, -31, -30, -30, -30, -30];
const anios = g.map((x, i) => ({
  periodo: `FY${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: nwc[i], tasa_impositiva_pct: 25.5, fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.31, beta: 1.0, prima_mercado_pct: 5.0, prima_adicional_pct: 0.5, coste_deuda_pct: 6.5, tasa_impositiva_pct: 25.0, peso_deuda_pct: 0 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.5, multiplo_salida: 13.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -3.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 2.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 1.5, ajuste_margen_pp: 1.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 50, comparables: 20, transacciones: 0, suma_partes: 0, escenarios: 30 },
  puente_ingresos: [
    { periodo: 'FY2027e', volumen_pct: 10.0, precio_pct: 3.0, otros_pct: 0.0 },
    { periodo: 'FY2028e', volumen_pct: 4.5, precio_pct: 2.0, otros_pct: 3.5 },
    { periodo: 'FY2029e', volumen_pct: 5.5, precio_pct: 2.5, otros_pct: 0.0 },
    { periodo: 'FY2030e', volumen_pct: 4.5, precio_pct: 2.5, otros_pct: 0.0 },
  ],
};
