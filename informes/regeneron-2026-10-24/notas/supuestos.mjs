// Supuestos del DCF, escenarios y pesos de Regeneron (corte 2026-10-24). Ejercicio natural; millones de USD.
// 2026e: 1S26 real 7.410 (+17,8 %) + 2S ≈ 9.680: Dupixent sigue ≈ +30 % y, desde el 3T, la parte de Sanofi ya no descuenta
// la deuda de desarrollo (pagada a 30-jun-2026), EYLEA HD sube y EYLEA cae → 17.100 (+19,2 %, fijo). Sin el cobro inicial
// de 1.000 M de la sexta enmienda con Sanofi (oct-2026), que va al puente.
// 2027e-2030e: Dupixent crece cada vez menos (EPOC, urticaria, niños; competencia de los nuevos orales e inyectables
// de dermatitis), EYLEA cae con los biosimilares (Yesafili desde agosto de 2026), Libtayo, Lynozyfic, el fármaco de la FOP
// y las aprobaciones de 2026-2027 suman. 2031e-2032e: las patentes de Dupixent vencen en marzo y octubre de 2031 (biosimilares
// en EE. UU. y Europa) y bajan los ingresos; 2033e vuelve a crecer con la cartera.
const g = [19.2, 8.5, 7.0, 5.5, 4.0, 0.0, -3.0, 2.0];
// Margen EBITDA (resultado operativo GAAP + amortización, con los pagos en acciones como gasto): 28,1 % LTM, 24,9 % de
// resultado operativo en 2025. Sube con la parte de Dupixent sin la deuda de desarrollo (casi todo margen) y la guía de
// I+D estable; baja de nuevo cuando Dupixent pierde la patente.
const m = [32.0, 34.0, 35.0, 35.5, 35.5, 34.5, 33.0, 33.0];
const am = [3.0, 3.3, 3.6, 3.8, 4.0, 4.0, 4.0, 4.0];
// Capex: 6,3 % en 2025 y guía de 1.030-1.100 M en 2026 (Saratoga Springs y el compromiso de invertir en EE. UU.); baja al 4,5 %.
const cx = [6.2, 7.0, 6.5, 6.0, 5.0, 4.5, 4.5, 4.5];
// Tipo: 13,9 % en 2025 (Irlanda y crédito de I+D); 15 % y 16 % desde 2030 por el mínimo global.
const tax = [15, 15, 15, 15, 16, 16, 16, 16];
const anios = g.map((x, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  // Circulante alto (54 % de las ventas): cuentas a cobrar de Sanofi y Bayer y existencias de biológicos.
  nwc_pct_ventas: 54.0, tasa_impositiva_pct: tax[i], fijo: i === 0,
}));
export default {
  anios,
  wacc: { tasa_libre_pct: 5.00, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 15.0, peso_deuda_pct: 3.2 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -4.0, ajuste_margen_pp: -3.0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 3.0, ajuste_margen_pp: 1.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2026e', volumen_pct: 15.2, precio_pct: -1.0, otros_pct: 5.0 },
    { periodo: '2027e', volumen_pct: 9.5, precio_pct: -1.0, otros_pct: 0.0 },
    { periodo: '2028e', volumen_pct: 8.0, precio_pct: -1.0, otros_pct: 0.0 },
    { periodo: '2029e', volumen_pct: 6.5, precio_pct: -1.0, otros_pct: 0.0 },
    { periodo: '2030e', volumen_pct: 5.0, precio_pct: -1.0, otros_pct: 0.0 },
  ],
  // Sin tamaño de mercado final: Regeneron vende en muchos mercados (retina, inmunología de tipo 2, cáncer, colesterol,
  // enfermedades raras) y no hay una cifra del mismo perímetro que sus ingresos. La prueba de cuota se hace a mano en el texto.
  mercado_final: null,
};
