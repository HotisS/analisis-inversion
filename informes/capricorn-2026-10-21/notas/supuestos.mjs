// Supuestos del DCF, escenarios y pesos de Capricorn Metals (corte 2026-10-21). Ejercicio a 30 de junio; millones de AUD.
// Ingresos = onzas vendidas × precio del oro en AUD (sin coberturas: se cerraron todas en junio de 2025 [A16]).
// Oro del caso base: 5.900 AUD/oz PLANO (cierre del 21-oct: 4.142 USD × 1/0,7028 ≈ 5.894 AUD) [B2].
// FY2027: 1T real (31.218 oz producidas, oro medio del trimestre ≈ 6.300 AUD) [A11] + 3T a 5.900 → ≈ 6.000 AUD de media.
// Producción (koz), base: Karlawinda (KGP) ampliada a 6,5 Mt/año (≈ 150 koz/año durante más de 10 años) [A12] más Mt Gibson
// (MGGP) con 6 meses de retraso sobre el calendario de la empresa (obras desde el 2T FY27, primer oro en el 3T FY28): la
// aspiración «Range 500» da 145/220/330/380/410 koz en FY27-FY31 [A15]; nosotros 142/195/320/375/400 y después la caída de
// KGP (ley de reservas de 0,6 g/t) con MGGP en su media de vida (190 koz, 260 en los años 3-6) [A13, A14].
const OZ = { base: [142, 195, 320, 375, 400, 400, 370, 340, 340, 330] };
// Bajista: Mt Gibson llega 6 meses más tarde que en el base (FY28 160, FY29 280 koz) y el oro baja a 5.000 AUD (≈ 3.500 USD).
OZ.bajista = [142, 160, 280, ...OZ.base.slice(3)];
// Alcista: calendario de la empresa (Range 500) y oro a 6.700 AUD (≈ 4.700 USD, la media de enero-agosto de 2026).
OZ.alcista = [145, 220, 330, 380, 410, ...OZ.base.slice(5)];
const Q1 = { oz: 31.2, precio: 6300 }; // 1T FY27 ya vendido (aprox.: producción del trimestre al oro medio del trimestre)
const precioFY27 = (p, oz) => (Q1.oz * Q1.precio + (oz - Q1.oz) * p) / oz;
const ruta = (oz, p) => oz.map((o, i) => (o * (i === 0 ? precioFY27(p, o) : p)) / 1000);
const ING26 = 769.346;
const crec = (r) => r.map((x, i) => ((x / (i === 0 ? ING26 : r[i - 1])) - 1) * 100);
const r1 = (x) => Math.round(x * 10) / 10;
export const RUTAS = { base: ruta(OZ.base, 5900), bajista: ruta(OZ.bajista, 5000), alcista: ruta(OZ.alcista, 6700) };
const gB = crec(RUTAS.base).map(r1), gBa = crec(RUTAS.bajista).map(r1), gAl = crec(RUTAS.alcista).map(r1);
// Margen EBITDA: coste por onza (incluye regalías del 2,5 % del Estado y privadas, exploración que va a gastos y estructura)
// de ≈ 2.320 AUD en FY26 (769,3 − 484,0 sobre 123.096 oz) [A2]. FY27 sube con la guía de AISC (1.900-2.100 frente a 1.629:
// más movimiento de estéril con la ampliación) → ≈ 2.550 AUD → 57 %. FY28 con el arranque de MGGP (AISC del año 1 de 2.127)
// → 56 %. Desde FY29 MGGP en régimen (AISC de 1.700-1.820 en los años 3-5) → 61-63 %; baja un punto al año desde FY33
// con la ley de KGP y la inflación minera [A10, A14].
const m = [57.0, 56.0, 61.0, 62.5, 63.0, 62.5, 61.5, 60.5, 59.5, 58.5];
// Amortización: 29,6 M en FY26 (3,8 % de las ventas, mina con poca inversión acumulada); sube con la ampliación (≈ 100 M
// invertidos en KEP) y MGGP (580 M de vida, 3,67 Moz) → 5 % en FY27 y 6-6,5 % desde FY28.
const am = [5.0, 6.0, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5];
// Inversión: FY27 = 1T real (42,7 M) + inversión inicial de MGGP (345 M + 129 M de minería previa, ≈ 45 % en FY27) + KGP
// (mantenimiento y desarrollo ≈ 70 M) + exploración capitalizada (≈ 40 M) ≈ 330 M → 39 % de las ventas. FY28 el resto de MGGP
// (≈ 260 M) + KGP y exploración (≈ 120 M) ≈ 380 M → 33 %. Desde FY29 mantenimiento de las dos minas (≈ 59 M de MGGP tras el
// arranque repartidos, recrecimientos de presas de relaves, flota) y exploración: 8-10 % [A14, A10].
const cx = [39.0, 33.0, 10.0, 8.0, 8.0, 8.0, 8.0, 8.0, 8.0, 7.0];
const anios = gB.map((x, i) => ({
  periodo: `${2027 + i}e`, crecimiento_pct: x, margen_ebitda_pct: m[i], amortizacion_pct_ventas: am[i], capex_pct_ventas: cx[i],
  nwc_pct_ventas: 2.0, tasa_impositiva_pct: 30.0, fijo: false,
}));
const DM_BAJ = -7.5, DM_ALC = 5.0;
const perfil = (g, dm) => g.map((x, i) => ({ periodo: `${2027 + i}e`, crecimiento_pp: r1(x - gB[i]), margen_pp: dm })).filter((p) => Math.abs(p.crecimiento_pp) >= 0.05);
export default {
  anios,
  // Coste del capital: 5,31 % (bono australiano a 10 años, RBA F2, 14-oct-2026) [D6] + 1,30 × 5,5 % + 1,0 % de prima por mina
  // única con un proyecto en construcción = 13,5 %. Sin deuda financiera (devuelta el 27-jun-2025) [A17].
  wacc: { tasa_libre_pct: 5.31, beta: 1.30, prima_mercado_pct: 5.5, prima_adicional_pct: 1.0, coste_deuda_pct: 7.0, tasa_impositiva_pct: 30.0, peso_deuda_pct: 0 },
  // Terminal con crecimiento NEGATIVO: las minas se agotan. −3 % anual tras FY2036 recoge lo que queda de las reservas
  // (5,24 Moz del grupo, ≈ 3,2 Moz producidas en FY27-FY36) y de los recursos (8,66 Moz) con producción menguante [A13].
  terminal: { metodo: 'gordon', crecimiento_pct: -3.0, multiplo_salida: 5.0 },
  etapa2: { usar: false, anios: 10, margen_final_pct: null },
  casos: [
    { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: DM_BAJ, ajuste_wacc_pp: 0.5, crecimiento_terminal_pct: -4.0, multiplo_salida: null,
      perfil: perfil(gBa, DM_BAJ) },
    { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null, perfil: [] },
    { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 0, ajuste_margen_pp: DM_ALC, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null,
      perfil: perfil(gAl, DM_ALC) },
  ],
  pesos: { dcf: 45, comparables: 15, transacciones: 0, suma_partes: 0, escenarios: 40 },
  puente_ingresos: [
    { periodo: '2027e', volumen_pct: r1((142 / 123.096 - 1) * 100), precio_pct: r1((precioFY27(5900, 142) / 6241 - 1) * 100), otros_pct: 0 },
    { periodo: '2028e', volumen_pct: r1((195 / 142 - 1) * 100), precio_pct: r1((5900 / precioFY27(5900, 142) - 1) * 100), otros_pct: 0 },
    { periodo: '2029e', volumen_pct: r1((320 / 195 - 1) * 100), precio_pct: 0, otros_pct: 0 },
    { periodo: '2030e', volumen_pct: r1((375 / 320 - 1) * 100), precio_pct: 0, otros_pct: 0 },
    { periodo: '2031e', volumen_pct: r1((400 / 375 - 1) * 100), precio_pct: 0, otros_pct: 0 },
  ],
  // Mercado: valor de la producción minera mundial de oro (3.672 t de 2025 [B1]) al oro del caso base (5.900 AUD/oz).
  mercado_final: { periodo: '2036e', tamano: Math.round(3672 * 32150.7466 * 5900 / 1e6) },
};
export const PRODUCCION = OZ;
