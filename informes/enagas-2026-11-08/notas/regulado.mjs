// Modelo de retribución regulada de Enagás → porcentajes del DCF del motor (estimación propia).
// Iteración del 8-nov-2026: rebasado con los 9M26 (nota a la CNMV del 20-oct-2026) [A17].
// El motor solo admite crecimiento de ingresos, margen EBITDA, amortización y capex en % de ventas; aquí se
// construyen esos porcentajes desde la retribución regulada, en millones de EUR y SIN participadas.
//
// Hechos de partida (citas en propio):
// - 2025 real: ingresos 976,8 (incluyen 125,9 de obras de sellado de Castor); EBITDA sin participadas 520,3 [A].
// - 9M26: ingresos 696,7 (regulados 663,0, de ellos Castor 108,7 con gastos de 103,2; otros 33,7); EBITDA de la
//   empresa 491,5 con 145,8 de participadas antes de PPA → 345,7 sin ellas (388,2 en 9M25) [A17].
// - 2026e: ingresos ≈ 916 = retribución de transporte y regasificación 649 (73,5 % × 883) + almacenamiento, GTS y
//   resto regulado ≈ 107 (residuo: regulado sin Castor de 9M26, 554,3, más un 4T ≈ 8 % por debajo del 4T25, 221) +
//   otros ≈ 46 + Castor ≈ 114 (obras terminadas en el 3T26). EBITDA sin participadas ≈ 455 = 9M26 345,7 + 4T ≈ 110
//   (4T25: 132,1; el marco 2021-2026 resta ≈ 15 % y la retribución del Copex se reconoce en el 4T). Con las
//   participadas (≈ 199 antes de PPA, con Teréga), la empresa llegaría a ≈ 655 M frente a su guía de ≈ 620 M.
// - Opex sin Castor ≈ 353 en 2026 (ingresos sin Castor − EBITDA sin el margen de Castor, ≈ 6), +1,5 %/año (plan de
//   eficiencia) [A]. El informe del 7-oct suponía 45 M de Castor y 176 M de resto regulado: el EBITDA de 2026 y de
//   2027 casi no cambia (448 → 455 y 504 → 505), porque el resto regulado y el opex bajan a la vez.
// - CNMC (Circulares 4 y 5/2026): retribución del sector transporte + regasificación 883 M (2026) → 961 (2027)
//   → 940 (2032), con TRF 6,46 % desde el 1-oct-2026; Enagás tiene ≈ 73,5 % de esa retribución [B].
// - Amortización ≈ 280 en 2026, −2,5 %/año; capex de gas y negocios adyacentes ≈ 175 en 2026 y 150 desde 2027,
//   que sube hasta igualar la amortización en 2035 (estado estacionario) [A].
const CUOTA = 0.735;
const sectorTR = { 2026: 883, 2027: 961, 2028: 956.8, 2029: 952.6, 2030: 948.4, 2031: 944.2, 2032: 940 };
// 2033-2035: siguiente periodo regulatorio sin metodología; −1,5 % en 2033 (revisión) y −0,5 % después.
sectorTR[2033] = sectorTR[2032] * 0.985; sectorTR[2034] = sectorTR[2033] * 0.995; sectorTR[2035] = sectorTR[2034] * 0.995;

const base = { ingresos: 976.8, ebitda: 520.3 };
const filas = [];
let resto = 107, otros = 46, opex = 353, amort = 280, capex = 175, previo = base.ingresos;
for (let y = 2026; y <= 2035; y++) {
  if (y > 2026) { resto *= 1.02; otros *= 1.03; opex *= 1.015; amort *= 0.975; }
  const castor = y === 2026 ? 114 : 0; // obras de sellado: ingreso ≈ gasto (margen ≈ 6 en 2026)
  const tr = CUOTA * sectorTR[y];
  const ingresos = tr + resto + otros + castor;
  const ebitda = y === 2026 ? 455 : ingresos - castor - opex;
  if (y >= 2027) capex = y <= 2032 ? 150 : 150 + ((amort - 150) * (y - 2032)) / 3;
  filas.push({
    periodo: `${y}e`, ingresos: +ingresos.toFixed(1), ebitda: +ebitda.toFixed(1), amortizacion: +amort.toFixed(1), capex: +capex.toFixed(1),
    crecimiento_pct: +(((ingresos / previo) - 1) * 100).toFixed(1),
    margen_ebitda_pct: +((ebitda / ingresos) * 100).toFixed(1),
    amortizacion_pct_ventas: +((amort / ingresos) * 100).toFixed(1),
    capex_pct_ventas: +((Math.max(capex, y === 2035 ? amort : 0) / ingresos) * 100).toFixed(1),
  });
  previo = ingresos;
}
export const proyeccion = filas;

if (process.argv[1] && process.argv[1].endsWith('regulado.mjs')) console.table(filas);
