// Cifras de Equinor (corte 2026-10-15). Cuentas en millones de USD (NIIF), del XBRL de los 20-F en la SEC
// (companyfacts, taxonomía ifrs-full; ver diario) y de los informes trimestrales del 4T25 y el 2T26.
// Precio en NOK (Oslo) convertido a USD con el tipo cruzado del BCE del 15-oct-2026 (1,1208 USD/EUR y 10,6520 NOK/EUR).

export const TC = Math.round((1.1208 / 10.652) * 1e6) / 1e6; // USD por NOK = 0,105220
export const PRECIO_NOK = 429.3;
export const PRECIO = Math.round(PRECIO_NOK * TC * 100) / 100; // 45,17 USD

// Cuenta por naturaleza (Equinor presenta compras, gastos operativos, comerciales, amortizaciones y exploración).
// ingresos = «Revenues» (sin participadas ni otros ingresos). coste_ventas = compras netas de variación de existencias.
// EBITDA = resultado operativo + amortizaciones y deterioros − participadas (incluye «otros ingresos», plusvalías por venta
// de activos, que van en no_recurrentes con signo negativo para que el motor las saque). resultado_financiero = partidas
// financieras netas + participadas (se valoran en el puente). amortizaciones = amortizaciones y deterioros netos.
// DPA = dividendo reconocido en el año (XBRL: cuarto trimestre del año anterior + tres primeros del año).
const filas = [
  // periodo, revenues, otros ingresos, participadas, compras, SG&A, DDA+deterioros, NOI, fin. netas, impuestos, minoritarios, BN, intereses, BPA dil, DPA, DPA extra, acciones dil.
  ['2020', 45765, 12, 53, 20986, 706, 15235, -3423, -836, 1237, 14, -5510, 1135, -1.69, 0.56, 0, 3277],
  ['2021', 88744, 1921, 259, 35160, 780, 11719, 33663, -2080, 23007, 14, 8563, 1083, 2.63, 0.63, 0, 3254],
  ['2022', 149004, 1182, 620, 53806, 986, 6391, 78811, -207, 49861, -3, 28746, 1008, 9.03, 2.40, 1.50, 3183],
  ['2023', 106848, 327, -1, 48175, 1218, 10634, 35770, 2114, 25980, 19, 11885, 989, 3.93, 3.60, 2.40, 3024],
  ['2024', 102502, 1223, 49, 50040, 1255, 9835, 30927, 58, 22157, 23, 8806, 918, 3.11, 2.80, 1.40, 2827],
  ['2025', 105828, 616, 18, 55164, 1207, 12318, 25352, -265, 20030, 15, 5043, 1037, 1.94, 1.48, 0, 2601],
];
export const cuenta = filas.map(([periodo, ing, oi, part, comp, sga, dda, noi, fin, imp, mino, bn, intr, bpa, dpa, extra, acc]) => {
  const ebitda = noi + dda - part;
  return {
    periodo, ingresos: ing, coste_ventas: comp, gastos_generales: null, ebitda, amortizaciones: dda, ebit: noi - part,
    resultado_financiero: fin + part, bai: noi + fin, impuestos: imp, minoritarios: mino, beneficio_neto: bn, gastos_financieros: intr,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: -oi, bpa, dpa, dpa_extraordinario: extra, acciones_diluidas: acc,
  };
});

// LTM a jun-26 = 2025 + 1S26 − 1S25 (informe del 2T26).
const a25 = { ing: 105828, oi: 616, part: 18, noi: 25352, dda: 12318, bn: 5043, bpa: 1.94 };
const s26 = { ing: 62339, oi: 572, part: 109, noi: 21776, dda: 5239, bn: 7954, bpa: 3.22 };
const s25 = { ing: 54514, oi: 530, part: 22, noi: 14595, dda: 5731, bn: 3939, bpa: 1.47 };
const L = (k) => a25[k] + s26[k] - s25[k];
export const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: L('ing'), ebitda: L('noi') + L('dda') - L('part'), ebit: L('noi') - L('part'),
  beneficio_neto: L('bn'), bpa: Math.round(L('bpa') * 100) / 100, dpa: 1.52, dpa_extraordinario: 0,
  fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -L('oi'),
};

// Balance al cierre (XBRL de los 20-F; 2024 y 2025 reexpresados por la empresa en el 4T25).
// caja = efectivo + inversiones financieras corrientes (Equinor las cuenta en su deuda neta).
// deuda_financiera = deuda financiera no corriente + corriente (sin arrendamientos).
const b = [
  // periodo, activo, act corr, pas corr, pasivo, intangibles, inmovilizado, existencias, clientes, proveedores, caja, inv fin corr, deuda LP, deuda CP, arrend, PN, minoritarios, reservas
  ['2020', 124809, 30824, 19502, 90917, 8149, 68508, 3084, 8232, 10510, 6757, 11865, 29118, 4591, 4405, 33873, 19, null],
  ['2021', 147120, 61826, 39005, 108096, 6452, 62075, 3395, 17927, 14310, 13987, 21246, 27404, 5273, 3562, 39010, 14, null],
  ['2022', 158021, 77152, 43539, 104032, 5158, 56498, 5205, 22452, 13352, 9451, 29876, 24141, 4359, 3668, 53988, 1, null],
  ['2023', 143580, 60990, 35719, 95080, 5709, 58822, 3814, 13204, 11870, 8070, 29224, 22230, 5996, 3570, 48490, 10, null],
  ['2024', 131141, 45967, 35023, 88761, 5654, 55560, 4031, 13590, 11110, 5903, 15335, 19361, 7223, 3510, 42342, 38, 52407],
  ['2025', 131727, 38034, 30601, 91230, 5950, 61241, 3330, 10819, 9700, 5036, 14297, 23763, 4047, 3412, 40424, 74, 48028],
];
export const balance = b.map(([periodo, at, ac, pc, pt, intang, inm, exist, cli, prov, efe, invf, dlp, dcp, arr, pn, mino, res]) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: null, intangibles: intang,
  inmovilizado_material: inm, existencias: exist, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null,
  caja: efe + invf, deuda_financiera: dlp + dcp, arrendamientos: arr, patrimonio_neto: pn, minoritarios: mino, reservas: res,
}));

// Flujos (XBRL de los 20-F; 2023-2025 con la reexpresión de las garantías de derivados del 1T25).
// capex = «capital expenditures and investments» del estado de flujos. adquisiciones = combinaciones de negocios
// + compras de participaciones financieras relevantes (Ørsted: 2.500 M en 2024 y 900 M en 2025, en «inversiones financieras»).
const f = [
  ['2020', 10386, 8476, 1277, 0, 505, 2330, 1059],
  ['2021', 28816, 8040, 1238, 111, 1864, 1797, 321],
  ['2022', 35136, 8758, 1366, 0, 966, 5380, 3315],
  ['2023', 29257, 10575, 1422, 1195, 272, 10906, 5589],
  ['2024', 19465, 12177, 1491, 4210, 1470, 8578, 6013],
  ['2025', 19971, 13994, 1459, 926, 2456, 4791, 5916],
];
export const flujos = f.map(([periodo, fo, capex, arr, adq, desinv, div, rec]) => ({
  periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: desinv,
  dividendos: div, recompras: rec, emision_acciones: 0, intereses_en_financiacion: 0,
}));

// Trimestres: ingresos («Revenues»), EBITDA = resultado operativo + amortizaciones − participadas, BPA diluido NIIF.
const T = [
  ['1T25', 29384, 26535 + 0, 8874, 2309, 13, 0.97, null],
  ['2T25', 25130, null, 5721, 3422, 9, 0.50, null],
  ['3T25', 26017, null, 5270, 3297, -16, -0.08, null],
  ['4T25', 25296, 26535, 5487, 3290, 12, 0.52, null],
  ['1T26', 27816, 29384, 8784, 2520, -21, 1.24, null],
  ['2T26', 34523, 25130, 12993, 2719, 130, 1.99, 'En línea'],
];
export const trimestres = T.map(([periodo, ing, ingAnt, noi, dda, part, bpa, vs], i) => {
  const ebitda = noi + dda - part;
  const crec = i >= 3 && ingAnt ? Math.round((ing / ingAnt - 1) * 1000) / 10 : null;
  return { periodo, ingresos: ing, crecimiento_pct: crec, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: Math.round((ebitda / ing) * 1000) / 10, bpa, vs_consenso: vs };
});

// Supuestos del DCF. Año base 2025: ingresos 105.828 M; EBITDA sin otros ingresos 37.036 M (35,0 %).
const crec = [25, -3, -9, -3, 1.5, 1.5, 1, 1, 0.5, 0.5];
const margen = [43.5, 44.0, 40.5, 38.5, 38.0, 37.5, 37.0, 37.0, 37.0, 37.0];
const amort = [8.3, 8.8, 9.6, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0, 10.0];
const cap = [9.8, 10.1, 10.7, 10.5, 10.4, 10.3, 10.2, 10.1, 10.0, 10.0];
const tasa = [66, 68, 70, 70, 70, 70, 70, 70, 70, 70];
export const anios = crec.map((g, i) => ({
  periodo: `${2026 + i}e`, crecimiento_pct: g, margen_ebitda_pct: margen[i], amortizacion_pct_ventas: amort[i],
  capex_pct_ventas: cap[i], nwc_pct_ventas: 4.0, tasa_impositiva_pct: tasa[i], fijo: i === 0,
}));
export const wacc = { tasa_libre_pct: 5.21, beta: 0.85, prima_mercado_pct: 5.5, prima_adicional_pct: 0.5, coste_deuda_pct: 4.5, tasa_impositiva_pct: 22, peso_deuda_pct: 15 };
export const terminal = { metodo: 'gordon', crecimiento_pct: 1.0, multiplo_salida: 3.0 };
export const puente_ingresos = [
  { periodo: '2026e', volumen_pct: 3.0, precio_pct: 22.0, otros_pct: 0 },
  { periodo: '2027e', volumen_pct: 2.0, precio_pct: -5.0, otros_pct: 0 },
  { periodo: '2028e', volumen_pct: 2.0, precio_pct: -11.0, otros_pct: 0 },
  { periodo: '2029e', volumen_pct: 1.5, precio_pct: -4.5, otros_pct: 0 },
  { periodo: '2030e', volumen_pct: 1.0, precio_pct: 0.5, otros_pct: 0 },
];
export const casos = [
  { escenario: 'Bajista', probabilidad_pct: 25, ajuste_crecimiento_pp: -2.5, ajuste_margen_pp: -4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: 0.5, multiplo_salida: null },
  { escenario: 'Base', probabilidad_pct: 50, ajuste_crecimiento_pp: 0, ajuste_margen_pp: 0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
  { escenario: 'Alcista', probabilidad_pct: 25, ajuste_crecimiento_pp: 2.0, ajuste_margen_pp: 4.0, ajuste_wacc_pp: 0, crecimiento_terminal_pct: null, multiplo_salida: null },
];

// Comparables (Stock Analysis, 15-oct-2026; millones de USD; Aker BP convertido de NOK con 0,10522; TotalEnergies con las
// cifras de su informe del mismo día, informes/totalenergies-2026-10-15).
const comp = (nombre, ticker, pais, capm, evm, ev_ventas, ev_ebitda, per, ebitda, ventas, roic, fcfy) => ({
  nombre, ticker, pais, capitalizacion: capm, ev_ventas, ev_ebitda_ltm: ev_ebitda, ev_ebitda_ntm: null, per_ntm: per,
  crecimiento_pct: null, margen_ebitda_pct: Math.round((ebitda / ventas) * 1000) / 10, roic_pct: roic,
  dn_ebitda: Math.round(((evm - capm) / ebitda) * 100) / 100, fcf_yield_pct: fcfy,
});
export const comparables = [
  comp('Aker BP', 'AKRBP', 'NO', 24324, 31555, 2.57, 2.95, 13.22, 10615, 12392, 8.75, 6.27),
  comp('TotalEnergies', 'TTE', 'FR', 200477, 218022, 1.11, 5.3, 8.1, 41302, 196382, 8.4, 5.2),
  comp('Shell', 'SHEL', 'GB', 295100, 337410, 1.13, 5.84, 9.10, 57610, 296600, 11.4, 10.73),
  comp('BP', 'BP', 'GB', 124520, 177510, 0.83, 4.54, 7.57, 39200, 215470, 8.4, 12.93),
  comp('Eni', 'ENI', 'IT', 83670, 113510, 1.10, 7.49, 9.35, 15120, 102740, 5.9, 4.91),
  comp('ExxonMobil', 'XOM', 'US', 718680, 750460, 2.08, 11.07, 13.36, 67940, 361060, 10.0, 4.24),
  comp('Chevron', 'CVX', 'US', 431510, 460060, 2.22, 9.16, 12.18, 50660, 209380, 8.2, 6.2),
];

// Precio de cierre de cada ejercicio (Yahoo, NOK) convertido a USD con el tipo cruzado del BCE de ese día.
const cierres = { 2020: [144.95, 8.5881], 2021: [235.9, 8.7968], 2022: [351.8, 9.8573], 2023: [322.15, 10.1724], 2024: [265.4, 11.3419], 2025: [237.0, 10.0587] };
export const precioCierreUSD = (a) => Math.round((cierres[a][0] / cierres[a][1]) * 100) / 100;
export const serie_multiplos = Object.keys(cierres).map((anio) => ({ anio, precio_cierre: precioCierreUSD(anio), ev_ebitda_ntm: null, per_ntm: null, excluir: anio === '2021' }));

// BPA propios (USD, NIIF). 2026e y 2027e para el PER adelantado; 2028e por escenario (ver revision-12m).
export const BPA = { e2026: 6.60, e2027: 6.13, bajista2028: 2.89, base2028: 4.61, alcista2028: 6.19 };
const pa = (anio, bpaSig) => Math.round((precioCierreUSD(anio) / bpaSig) * 100) / 100;
export const perHist = {
  2020: pa(2020, 2.63), 2021: pa(2021, 9.03), 2022: pa(2022, 3.93), 2023: pa(2023, 3.11), 2024: pa(2024, 1.94), 2025: pa(2025, BPA.e2026),
};
