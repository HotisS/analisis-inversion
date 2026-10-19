// Modelo propio de Harbour Energy (corte 2026-10-19): ingresos, EBITDA, BPA ajustado y supuestos del DCF a partir de
// producción × precio, por escenario de precios (Brent y gas europeo TTF/NBP). Lo usa propio.mjs; se puede ejecutar suelto
// para ver la tabla: node informes/harbour-energy-2026-10-19/notas/modelo.mjs
//
// Calibración (fuentes en propio.mjs):
//  - 2025 real: 474 kboepd, ingresos y otros ingresos 10.261 M, EBITDAX 7.118 M, beneficio ajustado 603 M (BPA 0,31 USD).
//  - 1S26 real: 509 kboepd, 6.408 M, EBITDAX 4.363 M, beneficio ajustado 562 M (BPA 0,28 USD), Brent 92 USD, gas 14,7 USD/mscf,
//    pérdidas de coberturas 270 M; tipo efectivo ajustado 77 %.
//  - Guía: 490-500 kboepd en 2026, 475-500 kboepd en 2027-2030, opex c.14,5 USD/bep, capex total 2,0-2,3 bn al año
//    en 2027-2030 (con desmantelamiento), DD&A 16,4-16,8 USD/bep.
//  - Coberturas a 30-jun-2026 (petróleo 16,9 Mbbl en 2027 a 60-83 USD; gas 17,8 Mbep en 2027 a 8,9-15,8 USD/mscf).
//  - Curvas a 19-oct-2026: Brent ene-27 104,9, dic-27 87,0, dic-28 78,3, dic-29 71,5 USD (NYMEX vía Yahoo);
//    TTF cal-27 ≈ 71 EUR/MWh, cal-28 ≈ 45 EUR/MWh (ICE Endex vía TradingView) → 23,5 y 15,0 USD/mscf a 1,12 USD/EUR.
const MSCF_BOE = 5.8; // mscf por barril equivalente
const ANIOS = [2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035];
// Producción (kboepd) y reparto: líquidos, gas europeo, otro gas (Argentina, norte de África, México).
const PROD = { 2026: 495, 2027: 495, 2028: 490, 2029: 485, 2030: 475, 2031: 460, 2032: 445, 2033: 430, 2034: 415, 2035: 400 };
const LIQ = { 2026: 0.42, 2027: 0.43, 2028: 0.44, 2029: 0.45, 2030: 0.46 }; // después, 0,46
const EUG = { 2026: 0.38, 2027: 0.37, 2028: 0.36, 2029: 0.35, 2030: 0.34 }; // después, 0,34
// Escenarios de precios. 2026: 1S real (Brent 92, gas 14,7) + 2S con lo cotizado jul-oct y la curva.
const ESC = {
  Base: { brent: { 2026: 94.5, 2027: 95, 2028: 78, 2029: 72, 2030: 70 }, gas: { 2026: 18.4, 2027: 23.5, 2028: 15.0, 2029: 11.5, 2030: 10.5 },
    coberturas: { 2026: -1250, 2027: -1415, 2028: -200, 2029: 0 } },
  // Bajista: se reabre Ormuz y el mercado vuelve a los precios de antes de la guerra (dic-2025: Brent 61, TTF 28 EUR/MWh).
  Bajista: { brent: { 2026: 94.5, 2027: 70, 2028: 60, 2029: 60, 2030: 60 }, gas: { 2026: 18.4, 2027: 12.0, 2028: 9.5, 2029: 9.0, 2030: 9.0 },
    coberturas: { 2026: -1250, 2027: -150, 2028: 30, 2029: 0 } },
  // Alcista: la crisis de suministro dura hasta 2028 (Brent 90, TTF ≈ 63 EUR/MWh) y se normaliza más arriba.
  Alcista: { brent: { 2026: 94.5, 2027: 105, 2028: 90, 2029: 80, 2030: 78 }, gas: { 2026: 18.4, 2027: 30.0, 2028: 21.0, 2029: 14.0, 2030: 12.5 },
    coberturas: { 2026: -1250, 2027: -2100, 2028: -470, 2029: 0 } },
};
const INFL = 0.02;
const OPEX = { 2026: 14.5, 2027: 14.5, 2028: 15.0 }; // USD/bep; después +2 % al año
const DDA = { 2026: 16.5, 2027: 16.5, 2028: 16.5, 2029: 16.2, 2030: 15.8, 2031: 15.4, 2032: 15.0, 2033: 14.6, 2034: 14.3, 2035: 14.0 };
// Capex sin desmantelamiento (M USD): guía 2026 2,2-2,4 bn y 2027-30 2,0-2,3 bn con ≈ 0,35-0,45 bn de desmantelamiento.
const CAPEX = { 2026: 1900, 2027: 1800, 2028: 1800, 2029: 1800, 2030: 1800 };
// Tipo efectivo ajustado sobre el BAI (EPL hasta el 31-mar-2030) y sobre el EBIT en el DCF.
const TIPO_BAI = { 2026: 0.78, 2027: 0.77, 2028: 0.76, 2029: 0.76, 2030: 0.70 }; // después 0,65
const TIPO_EBIT = { 2026: 74, 2027: 73, 2028: 72, 2029: 72, 2030: 66 }; // después 62
const FINANZAS = { 2026: -700, 2027: -650, 2028: -600, 2029: -580, 2030: -560 }; // intereses, actualización del desmantelamiento, comisiones, menos ingresos financieros
const HIBRIDOS = 100; // cupón de los bonos subordinados (2.044 M en patrimonio)
const ACC = { 2026: 1800, 2027: 1754, 2028: 1754 }; // acciones económicas (con voto + 1,13 × sin voto), sin recompras no anunciadas

const v = (o, a, def) => (o[a] ?? def);
export function anio(esc, a) {
  const e = ESC[esc];
  const k = a - 2030;
  const brent = a <= 2030 ? e.brent[a] : e.brent[2030] * (1 + INFL) ** k;
  const gas = a <= 2030 ? e.gas[a] : e.gas[2030] * (1 + INFL) ** k;
  const otroGas = 3.7 * (1 + INFL) ** Math.max(0, a - 2026);
  const kb = PROD[a] * 365 / 1000; // Mbep
  const liq = kb * v(LIQ, a, 0.46), eu = kb * v(EUG, a, 0.34), og = kb - liq - eu;
  const ingresos = liq * brent * 0.92 + eu * MSCF_BOE * gas + og * MSCF_BOE * otroGas + 100 * (1 + INFL) ** Math.max(0, a - 2026) + (e.coberturas[a] ?? 0);
  const opexBep = a <= 2028 ? OPEX[a] : OPEX[2028] * (1 + INFL) ** (a - 2028);
  const ga = 450 * (1 + INFL) ** Math.max(0, a - 2026);
  const costes = kb * opexBep + 0.065 * ingresos + ga + 150; // 6,5 %: regalías, sobre/infra-extracción y otros (cuadra el 1S26: 0,29 frente a 0,28 real)
  const ebitda = ingresos - costes;
  const amort = kb * DDA[a] + 150;
  const ebit = ebitda - amort;
  const bai = ebit + v(FINANZAS, a, -540);
  const tipo = v(TIPO_BAI, a, 0.65);
  const neto = bai * (1 - tipo) - HIBRIDOS;
  const acc = v(ACC, a, 1754);
  const capex = a <= 2030 ? CAPEX[a] : CAPEX[2030] * (1 + INFL) ** (a - 2030) * PROD[a] / 475;
  return { anio: a, brent, gas, kb, ingresos, ebitda, margen: (ebitda / ingresos) * 100, amort, ebit, bai, neto, bpa: neto / acc, capex, tipo_ebit: v(TIPO_EBIT, a, 62) };
}
export const serie = (esc) => ANIOS.map((a) => anio(esc, a));
export const REAL_2025 = { ingresos: 10261 };

if (import.meta.url === `file://${process.argv[1]}`) {
  for (const esc of Object.keys(ESC)) {
    console.log(`\n${esc}`);
    let ant = REAL_2025.ingresos;
    for (const f of serie(esc)) {
      console.log(`${f.anio} Brent ${f.brent.toFixed(0)} gas ${f.gas.toFixed(1)} | ventas ${f.ingresos.toFixed(0)} (${(((f.ingresos / ant) - 1) * 100).toFixed(1)} %) EBITDA ${f.ebitda.toFixed(0)} (${f.margen.toFixed(1)} %) amort ${f.amort.toFixed(0)} (${(f.amort / f.ingresos * 100).toFixed(1)} %) EBIT ${f.ebit.toFixed(0)} BAI ${f.bai.toFixed(0)} neto ${f.neto.toFixed(0)} BPA ${f.bpa.toFixed(3)} capex ${f.capex.toFixed(0)} (${(f.capex / f.ingresos * 100).toFixed(1)} %)`);
      ant = f.ingresos;
    }
  }
}
