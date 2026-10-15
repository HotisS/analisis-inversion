// Cifras de TotalEnergies (corte 2026-10-15). Cuentas en millones de USD (NIIF), del XBRL ESEF del regulador
// (notas/cuentas-xbrl.json y los hechos tot: de cada informe anual) y del 6-K del 2T26. Precio en EUR convertido a USD
// con el tipo del BCE del 15-oct-2026 (1,1208 USD/EUR).
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));
const X = JSON.parse(readFileSync(join(aqui, 'cuentas-xbrl.json'), 'utf8'));

export const TC = 1.1208; // USD por EUR, BCE 15-oct-2026
export const PRECIO_EUR = 80.21;
export const PRECIO = Math.round(PRECIO_EUR * TC * 100) / 100; // 89.90 USD

// Cuenta por naturaleza. Ingresos = ventas sin impuestos especiales (tot:RevenueFromContractsWithCustomersExcludingExciseTax).
// coste_ventas = compras netas de variación de existencias. EBITDA = ingresos − compras − otros gastos de explotación −
// exploración + otros ingresos − otros gastos (no_recurrentes = otros gastos − otros ingresos, que el motor devuelve).
// Amortizaciones = amortizaciones y deterioros del inmovilizado material y derechos mineros.
// resultado_financiero = −coste de la deuda neta + otros ingresos financieros − otros gastos financieros + resultado de
// participadas (puesta en equivalencia); las participadas se valoran aparte en el puente.
const filas = [
  // periodo, ingresos, compras, otros gastos expl., exploracion, otros ingresos, otros gastos, DDA, coste deuda neta, otros ing fin, otros gastos fin, participadas, impuestos, minoritarios, BN, intereses, BPA, DPA USD, DPA extra USD, acciones diluidas
  ['2020', 119704, 77486, 25538, 731, 2237, 1506, 22264, 2110, 914, 690, 452, 318, -94, -7242, 2147, -2.90, 3.01, 0, 2596],
  ['2021', 184634, 118622, 26894, 740, 1312, 2317, 13556, 1525, 762, 539, 3438, 9587, 334, 16032, 1904, 5.92, 3.12, 0, 2657],
  ['2022', 263310, 169448, 29789, 1299, 2849, 7344, 12221, 1243, 896, 533, -1892, 22242, 518, 20526, 2386, 7.85, 4.01, 1.05, 2577],
  ['2023', 218945, 143041, 30419, 573, 3677, 2396, 12762, 1019, 1285, 731, 1845, 13301, 126, 21384, 2820, 8.67, 3.25, 0, 2430],
  ['2024', 195610, 127664, 29860, 999, 2112, 1281, 12025, 1230, 1403, 835, 1575, 10775, 273, 15758, 3016, 6.69, 3.48, 0, 2315],
  ['2025', 182344, 116740, 30914, 419, 2375, 1927, 13312, 2067, 1437, 881, 2553, 9092, 230, 13127, 3182, 5.78, 3.84, 0, 2214],
];
export const cuenta = filas.map(([periodo, ing, comp, opex, expl, oi, og, dda, cdn, ofi, ofg, part, imp, mino, bn, intr, bpa, dpa, extra, acc]) => {
  const ebitda = ing - comp - opex - expl + oi - og;
  const ebit = ebitda - dda;
  const rf = -cdn + ofi - ofg + part;
  return {
    periodo, ingresos: ing, coste_ventas: comp, gastos_generales: null, ebitda, amortizaciones: dda, ebit,
    resultado_financiero: rf, bai: ebit + rf, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: intr,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: og - oi, bpa, dpa, dpa_extraordinario: extra, acciones_diluidas: acc,
  };
});

// LTM a jun-26 = 2025 + 1S26 − 1S25 (6-K del 2T26).
const s26 = { ing: 106613, comp: 65655, opex: 16713, expl: 228, oi: 801, og: 1504, dda: 6281, bn: 11248, bpa: 5.06 };
const s25 = { ing: 92575, comp: 60013, opex: 15398, expl: 178, oi: 791, og: 578, dda: 6256, bn: 6538, bpa: 2.85 };
const a25 = { ing: 182344, comp: 116740, opex: 30914, expl: 419, oi: 2375, og: 1927, dda: 13312, bn: 13127, bpa: 5.78 };
const L = (k) => a25[k] + s26[k] - s25[k];
const ltmEbitda = L('ing') - L('comp') - L('opex') - L('expl') + L('oi') - L('og');
export const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: L('ing'), ebitda: ltmEbitda, ebit: ltmEbitda - L('dda'),
  beneficio_neto: L('bn'), bpa: Math.round(L('bpa') * 100) / 100, dpa: 3.84, dpa_extraordinario: 0,
  fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: L('og') - L('oi'),
};

const intang = { 2020: 33528, 2021: 32484, 2022: 31931, 2023: 33083, 2024: 34238, 2025: 37345 };
const reservas = { 2020: 107078, 2021: 117849, 2022: 123951, 2023: 126857, 2024: 135496, 2025: 125860 };
export const balance = X.balance.historico.map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente,
  pasivo_total: b.pasivo_total, fondo_comercio: null, intangibles: intang[b.periodo], inmovilizado_material: b.inmovilizado_material,
  existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null,
  caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto,
  minoritarios: b.minoritarios, reservas: reservas[b.periodo],
}));

const capex = { 2020: 10764, 2021: 12343, 2022: 15690, 2023: 17722, 2024: 14909, 2025: 16953 };
const desinv = { 2020: null, 2021: null, 2022: null, 2023: 3789 + 3561, 2024: 727 + 2167, 2025: 1713 + 855 };
export const flujos = X.flujos.historico.map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: capex[f.periodo], pagos_arrendamientos: null,
  adquisiciones: f.adquisiciones, desinversiones: desinv[f.periodo] ?? f.desinversiones, dividendos: f.dividendos,
  recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0,
}));

// Trimestres: ingresos sin impuestos especiales (el reparto del impuesto entre 1T y 2T es proporcional a las ventas:
// estimación), EBITDA ajustado de la empresa (incluye participadas), BPA diluido NIIF.
export const trimestres = [
  { periodo: '1T25', ingresos: 47600, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 10504, margen_ebitda_pct: null, bpa: 1.68, vs_consenso: null },
  { periodo: '2T25', ingresos: 44975, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 9690, margen_ebitda_pct: null, bpa: 1.17, vs_consenso: null },
  { periodo: '3T25', ingresos: 43844, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 10295, margen_ebitda_pct: null, bpa: 1.64, vs_consenso: null },
  { periodo: '4T25', ingresos: 45925, crecimiento_pct: -2.5, crecimiento_organico_pct: null, ebitda: 10066, margen_ebitda_pct: null, bpa: 1.30, vs_consenso: null },
  { periodo: '1T26', ingresos: 49563, crecimiento_pct: 4.1, crecimiento_organico_pct: null, ebitda: 12552, margen_ebitda_pct: null, bpa: 2.64, vs_consenso: null },
  { periodo: '2T26', ingresos: 57050, crecimiento_pct: 26.8, crecimiento_organico_pct: null, ebitda: 13179, margen_ebitda_pct: null, bpa: 2.41, vs_consenso: null },
].map((t) => ({ ...t, margen_ebitda_pct: Math.round((t.ebitda / t.ingresos) * 1000) / 10 }));

// Supuestos del DCF. Año base 2025 (182.344 M; EBITDA sin otros ingresos y gastos 34.271 M, 18,8 %).
const crec = [24, -8, -8, 2.5, 2.5, 2, 2, 1.5, 1.5, 1.5];
const margen = [24.0, 21.0, 20.0, 19.5, 19.0, 18.5, 18.5, 18.5, 18.5, 18.5];
const amort = [6.4, 6.9, 7.2, 7.3, 7.4, 7.5, 7.5, 7.5, 7.5, 7.5];
const cap = [8.5, 8.6, 8.6, 8.5, 8.3, 8.1, 7.9, 7.8, 7.7, 7.7];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: cap[i], nwc_pct_ventas: -1.5, tasa_impositiva_pct: 42, fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.21, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 5.0, tasa_impositiva_pct: 25, peso_deuda_pct: 15 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.5, multiplo_salida: 4.5 };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 1.0, precio_pct: 23.0, otros_pct: 0 },
  { periodo: '2027e', volumen_pct: 3.0, precio_pct: -11.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 3.0, precio_pct: -11.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 2.5, precio_pct: 0, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 2.0, precio_pct: 0.5, otros_pct: 0 },
];
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.0, ajuste_margen_pp: -2.5, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 1.0, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 2.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// Comparables (Stock Analysis, 15-oct-2026 en sesión; millones de USD).
const comp = (nombre, ticker, pais, capm, evm, ev_ventas, ev_ebitda, per, ebitda, ventas, roic, fcfy) => ({
  nombre, ticker, pais, capitalizacion: capm, ev_ventas, ev_ebitda_ltm: ev_ebitda, ev_ebitda_ntm: null, per_ntm: per,
  crecimiento_pct: null, margen_ebitda_pct: Math.round((ebitda / ventas) * 1000) / 10, roic_pct: roic,
  dn_ebitda: Math.round(((evm - capm) / ebitda) * 100) / 100, fcf_yield_pct: fcfy,
});
export const comparables = [
  comp('ExxonMobil', 'XOM', 'US', 718680, 750460, 2.08, 11.07, 13.36, 67940, 361060, 10.0, 4.24),
  comp('Chevron', 'CVX', 'US', 431510, 460060, 2.22, 9.16, 12.18, 50660, 209380, 8.2, 6.2),
  comp('Shell', 'SHEL', 'GB', 295100, 337410, 1.13, 5.84, 9.10, 57610, 296600, 11.4, 10.73),
  comp('BP', 'BP', 'GB', 124520, 177510, 0.83, 4.54, 7.57, 39200, 215470, 8.4, 12.93),
  comp('Eni', 'ENI', 'IT', 83670, 113510, 1.10, 7.49, 9.35, 15120, 102740, 5.9, 4.91),
  comp('Equinor', 'EQNR', 'NO', 106790, 115880, 1.02, 2.77, 8.58, 41870, 113650, 16.5, 8.97),
];

// Precio de cierre de cada ejercicio (Yahoo, EUR) convertido a USD con el tipo del BCE del último día hábil.
const cierres = { 2020: [35.30, 1.2271], 2021: [44.63, 1.1326], 2022: [58.65, 1.0666], 2023: [61.60, 1.105], 2024: [53.37, 1.0389], 2025: [55.59, 1.175] };
export const serie_multiplos = Object.entries(cierres).map(([anio, [p, t]]) => ({ anio, precio_cierre: Math.round(p * t * 100) / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: false }));

// BPA propios (USD, NIIF sin partidas especiales; ver revision-12m). 2026e y 2027e para el PER adelantado.
export const BPA = { e2026: 11.18, e2027: 8.44, bajista2028: 5.61, base2028: 7.14, alcista2028: 8.54 };
const pa = (anio, bpaSig) => Math.round((cierres[anio][0] * cierres[anio][1] / bpaSig) * 100) / 100;
export const perHist = {
  2020: pa(2020, 5.92), 2021: pa(2021, 7.85), 2022: pa(2022, 8.67), 2023: pa(2023, 6.69), 2024: pa(2024, 5.78), 2025: pa(2025, BPA.e2026),
};
