// Modelo de retribución regulada de Enagás → porcentajes del DCF del motor (estimación propia).
// El motor solo admite crecimiento de ingresos, margen EBITDA, amortización y capex en % de ventas; aquí se
// construyen esos porcentajes desde la retribución regulada, en millones de EUR y SIN participadas.
//
// Hechos de partida (citas en propio):
// - 2025 real: ingresos 976,8 (incluyen 125,9 de obras de sellado de Castor, neutras en EBITDA); EBITDA sin
//   participadas 520,3 (651,9 − 131,6) [A].
// - Guía 2026: EBITDA ≈ 620 con participadas antes de PPA (≈ 172: 86,3 en el 1S26 × 2) → ≈ 448 sin ellas; inversión
//   ≈ 225, de ella ≈ 50 en hidrógeno (fuera del caso base) [A, D].
// - CNMC (Circulares 4 y 5/2026): retribución del sector transporte + regasificación 883 M (2026) → 961 (2027)
//   → 940 (2032), con TRF 6,46 % desde el 1-oct-2026; Enagás tiene ≈ 73,5 % de esa retribución [B].
// - Almacenamiento, GTS y resto regulado: residuo de 2026 (≈ 221, con ≈ 45 de obras de Castor), indexado al 2 %
//   (real decreto de almacenamiento alineado con las circulares, en tramitación) [A, B].
// - Otros ingresos no regulados (buque Alisios, Axent): ≈ 48 en 2026, +3 %/año [A].
// - Opex recurrente: ≈ 425 en 2026 (ingresos − EBITDA − obras de Castor), +1,5 %/año (plan de eficiencia: TCAC
//   ≈ +1,5 % en 2024-2026) [A].
// - Amortización ≈ 280 en 2026, −2,5 %/año (activos que llegan al final de su vida regulatoria); capex de gas y
//   negocios adyacentes ≈ 175 en 2026 y 150 desde 2027, que sube hasta igualar la amortización en 2035
//   (estado estacionario) [A].
const CUOTA = 0.735;
const sectorTR = { 2026: 883, 2027: 961, 2028: 956.8, 2029: 952.6, 2030: 948.4, 2031: 944.2, 2032: 940 };
// 2033-2035: siguiente periodo regulatorio sin metodología; −1,5 % en 2033 (revisión) y −0,5 % después.
sectorTR[2033] = sectorTR[2032] * 0.985; sectorTR[2034] = sectorTR[2033] * 0.995; sectorTR[2035] = sectorTR[2034] * 0.995;

const base = { ingresos: 976.8, ebitda: 520.3 };
const filas = [];
let resto = 176, otros = 48, opex = 425, amort = 280, capex = 175, previo = base.ingresos;
for (let y = 2026; y <= 2035; y++) {
  if (y > 2026) { resto *= 1.02; otros *= 1.03; opex *= 1.015; amort *= 0.975; }
  const castor = y === 2026 ? 45 : 0; // obras de sellado: ingreso = gasto
  const tr = CUOTA * sectorTR[y];
  const ingresos = tr + resto + otros + castor;
  const ebitda = y === 2026 ? 448 : ingresos - opex;
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
