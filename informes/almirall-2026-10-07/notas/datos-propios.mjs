// Hechos que recojo yo (los subagentes se cortaron por el límite de uso). Citas [P n] = fuentes de propio.
// Comparables: capitalización y valor empresa de Stock Analysis (7-oct-2026); ventas, EBITDA y beneficio de
// MarketScreener (mismo proveedor para LTM y NTM). LTM ≈ media de 2025 y 2026e (ventana jul-25/jun-26);
// NTM = 23 % de 2026e + 77 % de 2027e (quedan 2,8 meses de 2026). Divisas al cambio del BCE del 6-oct-2026.
const r1 = (x) => Math.round(x * 10) / 10;
const r2 = (x) => Math.round(x * 100) / 100;
const W26 = 0.23, W27 = 0.77;
const USD = 1.1269, CHF = 0.9359;

// [nombre, ticker, pais, mcap_eur, ev_local, a_eur, ventas25, ventas26, ventas27, ebitda25, ebitda26, ebitda27, bn26, bn27, roic, dn_local, fcf_yield]
const P = [
  // Galderma: SA en CHF (cap. 37.650, VE 39.160, DN 1.520); MarketScreener en USD → paso el VE a USD para el múltiplo.
  ['Galderma', 'GALD', 'CH', 37650 / CHF, (39160 / CHF) * USD, null, 5207, 6415, 7491, 1211, 1664, 2177, 898.5, 1332, 10.28, (1520 / CHF) * USD, 2.32],
  ['UCB', 'UCB', 'BE', 38530, 41350, null, 7741, 8659, 9607, 2636, 3053, 3621, 1928, 2297, 15.03, 2820, 4.01],
  ['Ipsen', 'IPN', 'FR', 11750, 10740, null, 3929, 4588, 4685, 1383, 1925, 1794, 1011, 1001, 23.16, -1010, 10.64],
  ['Recordati', 'REC', 'IT', 10870, 12790, null, 2618, 2792, 3028, 991.1, 1017, 1146, 570.2, 684.1, 15.35, 1920, 5.52],
  ['Faes Farma', 'FAE', 'ES', 1490, 1800, null, 610.5, 733.2, 793.0, 118.3, 152.4, 175.6, 87.37, 111.0, 8.57, 312.5, 4.23],
  ['Rovi', 'ROVI', 'ES', 3020, 3020, null, 743.5, 774.1, 892.4, 216.2, 197.6, 257.3, 146.2, 172.9, 16.95, -20.4, 6.03],
];
// Para Galderma el PER usa la capitalización en USD frente al beneficio en USD.
export const comparables = P.map(([nombre, ticker, pais, mcap, ev, _x, v25, v26, v27, e25, e26, e27, n26, n27, roic, dn, fcfy]) => {
  const vLtm = (v25 + v26) / 2, vNtm = W26 * v26 + W27 * v27;
  const eLtm = (e25 + e26) / 2, eNtm = W26 * e26 + W27 * e27;
  const nNtm = W26 * n26 + W27 * n27;
  const capLocal = nombre === 'Galderma' ? mcap * USD : mcap;
  return {
    nombre, ticker, pais, capitalizacion: Math.round(mcap),
    ev_ventas: r2(ev / vLtm), ev_ebitda_ltm: r1(ev / eLtm), ev_ebitda_ntm: r1(ev / eNtm), per_ntm: r1(capLocal / nNtm),
    crecimiento_pct: r1((Math.pow(vNtm / vLtm, 12 / 15) - 1) * 100), // ventana de ~15 meses entre los centros de LTM y NTM, anualizada
    margen_ebitda_pct: r1((eLtm / vLtm) * 100), roic_pct: roic, dn_ebitda: r2(dn / eLtm), fcf_yield_pct: fcfy,
  };
});

if (process.argv[1] && process.argv[1].endsWith('datos-propios.mjs')) console.table(comparables);
