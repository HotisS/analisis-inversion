// Supuestos del DCF, escenarios y pesos de Orion (corte 2026-10-20). Ejercicio natural; millones de EUR.
// La proyección se construye en dos partes que se suman (estimación propia, explicada en textos.mjs):
//  1) Nubeqa registrada por Orion (regalías escalonadas + pastillas vendidas a Bayer): 609,8 M en 2025 [A2], 381,8 en el
//     1S26 (+64,9 %) con el tramo más alto de regalías ya alcanzado en el 2T26 [A3]. Sube hasta ≈ 1.180 M en 2028 (Orion
//     estima que puede superar 1.000 M «hacia el final de la década» [B6, B7]), se frena desde 2029 por el precio negociado
//     de Medicare (IRA) y cae al vencer la patente del compuesto: EE. UU. 2033, Europa y Japón 2035, China y Brasil 2030 [B3].
//     Contribución al EBITDA: 75 % de esas ventas (regalías casi sin coste; pastillas con margen de fabricación; resta la
//     regalía que Orion paga a Endo).
//  2) El resto (genéricos, marcas, Easyhaler, veterinaria, Fermion, hitos pequeños): 1.096,8 M en 2025 (1.890 − 609,8 Nubeqa
//     − 183,4 hitos) creciendo un 3,5 % al año (1S26: +3,3 %). Margen EBITDA tras TODO el I+D: 5,5 % en 2026 (calibrado con
//     la guía de resultado de explotación de 650-750 M y el BPA de consenso de 4,06), que sube un punto al año hasta el 18 %
//     en 2037 porque el I+D (210 M en 2025, ≈ 19 % de las ventas del resto) no puede mantenerse cuando las regalías caigan:
//     antes de Nubeqa (2019-2021) el margen EBITDA del grupo era del 28-31 % con un I+D del ≈ 11 % de las ventas [A9-A11].
// Hitos: 0 en la proyección base (guía de 2026 «sin hitos relevantes» [A3]); los de opevesostat (hasta 625 M USD de registro)
// solo en el alcista.
export const NUBEQA = [960, 1100, 1180, 1150, 1130, 1110, 1080, 900, 650, 380, 180, 90];
export const RESTO0 = 1096.8, G_RESTO = 3.5;
export const M_RESTO = [5.5, 6.0, 7.0, 8.0, 9.0, 10.0, 11.0, 12.5, 14.0, 15.5, 17.0, 18.0];
export const CONTRIB_NUBEQA = 75;
const DA_ABS = [62, 67, 72, 77, 82, 86, 90, 93, 96, 98, 100, 100];
const CAPEX_ABS = [115, 115, 115, 110, 110, 105, 105, 100, 100, 100, 100, 104];
const VENTAS_2025 = 1890.0;
const r2 = (x) => Math.round(x * 100) / 100;
export const filas = NUBEQA.map((nb, i) => {
  const resto = RESTO0 * (1 + G_RESTO / 100) ** (i + 1);
  const ventas = nb + resto;
  const ebitda = nb * CONTRIB_NUBEQA / 100 + resto * M_RESTO[i] / 100;
  return { periodo: `${2026 + i}e`, nubeqa: nb, resto: Math.round(resto * 10) / 10, ventas, ebitda, da: DA_ABS[i], capex: CAPEX_ABS[i] };
});
// Escenarios con perfil año a año (estimación propia), construidos con las mismas piezas:
//  Bajista: la IRA y la competencia de la clase (enzalutamida genérica) recortan Nubeqa desde 2027 (−5 % en 2027, −10 % en
//   2028 y −20 a −40 % después frente al base); el resto crece un 2 % y gana 2 puntos menos de margen.
//  Alcista: Nubeqa un 10 % por encima del base (más indicaciones; ARASTEP y DASL-HiCaP positivos) y opevesostat aprobado:
//   hito de registro de 100 M en 2029 y regalías desde 2030 (60 → 430 M en 2037, ≈ 15 % de unas ventas de MSD de ≈ 2.900 M
//   [B14]) con un 95 % de margen.
const FN_BAJ = [1, 0.95, 0.90, 0.80, 0.78, 0.76, 0.74, 0.70, 0.66, 0.62, 0.60, 0.60];
const OPEV = [0, 0, 0, 100, 60, 140, 220, 300, 360, 400, 420, 430];
const serie = (fn, gResto, dmResto, extra) => NUBEQA.map((nb0, i) => {
  const nb = nb0 * fn(i), resto = RESTO0 * (1 + gResto / 100) ** (i + 1), ex = extra(i);
  const ventas = nb + resto + ex;
  return { ventas, ebitda: nb * CONTRIB_NUBEQA / 100 + resto * (M_RESTO[i] + dmResto) / 100 + ex * 0.95, da: DA_ABS[i] };
});
export const BAJISTA = serie((i) => FN_BAJ[i], 2.0, -2.0, () => 0);
export const ALCISTA = serie((i) => (i === 0 ? 1 : 1.1), G_RESTO, 0, (i) => OPEV[i]);
const perfil = (sc) => sc.map((f, i) => {
  if (i === 0) return null;
  const g = (f.ventas / sc[i - 1].ventas - 1) * 100, gb = (filas[i].ventas / filas[i - 1].ventas - 1) * 100;
  return { periodo: filas[i].periodo, crecimiento_pp: r2(g - gb), margen_pp: r2(f.ebitda / f.ventas * 100 - filas[i].ebitda / filas[i].ventas * 100) };
}).filter(Boolean);
const anios = filas.map((f, i) => ({
  periodo: f.periodo,
  crecimiento_pct: r2((f.ventas / (i ? filas[i - 1].ventas : VENTAS_2025) - 1) * 100),
  margen_ebitda_pct: r2(f.ebitda / f.ventas * 100),
  amortizacion_pct_ventas: r2(f.da / f.ventas * 100),
  capex_pct_ventas: r2(f.capex / f.ventas * 100),
  nwc_pct_ventas: 35.0, tasa_impositiva_pct: 20.5, fijo: i === 0,
}));
// Puente de ingresos de los cinco primeros años: «volumen» = Nubeqa (volumen y tramos de regalía) + volumen del resto (3 %);
// «precio» = precio del resto (0,5 %); «otros» = hitos (−183,4 M en 2026 frente a 2025).
const puente_ingresos = filas.slice(0, 5).map((f, i) => {
  const ant = i ? filas[i - 1] : { nubeqa: 609.8, resto: RESTO0, ventas: VENTAS_2025 };
  const base = ant.ventas;
  const vol = ((f.nubeqa - ant.nubeqa) + ant.resto * 0.03) / base * 100;
  const pre = ant.resto * 0.005 / base * 100;
  const otros = i === 0 ? -183.4 / base * 100 : 0;
  return { periodo: f.periodo, volumen_pct: r2(vol), precio_pct: r2(pre), otros_pct: r2(otros) };
});
export default {
  anios,
  wacc: { tasa_libre_pct: 3.45, beta: 0.80, prima_mercado_pct: 5.5, prima_adicional_pct: 0, coste_deuda_pct: 3.5, tasa_impositiva_pct: 20.5, peso_deuda_pct: 1 },
  terminal: { metodo: 'gordon', crecimiento_pct: 2.0, multiplo_salida: 10.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: 1.5, multiplo_salida: null, perfil: perfil(BAJISTA) },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: perfil(ALCISTA) },
  ],
  pesos: { dcf: 50, comparables: 10, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos,
  mercado_final: null,
};
