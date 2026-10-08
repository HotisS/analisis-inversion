import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const dir = path.dirname(fileURLToPath(import.meta.url));
const salida = path.join(dir, 'A.json');
const prev = JSON.parse(fs.readFileSync(salida, 'utf8'));

const anios = ['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'];
const S = {
  ing: [4888,5307,5825,6260,6675,7776,8080,8544,9256,9467],
  cv: [1666,1775,1911,1992,2057,2303,2454,2561,2719,2666],
  sga: [1364,1334,1484,1638,1726,2001,2009,2151,2318,2378],
  bai: [1228,1525,1690,1801,1996,2488,2656,2936,3133,3360],
  int: [166,175,206,223,231,224,221,239,225,222],
  otros: [2,-6,83,57,-17,-48,-40,159,19,36],
  da: [240,242,308,412,441,448,465,491,497,487],
  imp: [409,663,266,301,360,454,545,596,637,687],
  min: [-2,-2,-4,0,-2,-3,-3,-4,10,0],
  bn: [821,864,1428,1500,1638,2037,2114,2344,2486,2673],
  bpa: [1.65,1.75,2.93,3.11,3.42,4.27,4.49,5.07,5.47,6.02],
  dpa: [0.39,0.441,0.542,0.692,0.85,1.075,1.35,1.557,1.796,2.03],
  acc: [498.2,493.2,486.9,481.8,478.6,476.7,470.4,462.3,454.8,443.8],
};
const cuenta = anios.map((p, i) => {
  const ebit = S.bai[i] + S.int[i] - S.otros[i];
  return {
    periodo: p, ingresos: S.ing[i], coste_ventas: S.cv[i], gastos_generales: S.sga[i],
    ebitda: ebit + S.da[i], amortizaciones: S.da[i], ebit,
    resultado_financiero: S.otros[i] - S.int[i], bai: S.bai[i], impuestos: S.imp[i],
    minoritarios: S.min[i], beneficio_neto: S.bn[i], gastos_financieros: S.int[i],
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: S.bpa[i], dpa: S.dpa[i], dpa_extraordinario: 0, acciones_diluidas: S.acc[i],
  };
});
for (const c of cuenta) {
  const chk = c.bai - c.impuestos - c.minoritarios - c.beneficio_neto;
  if (Math.abs(chk) > 3) console.log('Descuadre BN', c.periodo, chk);
}

// LTM jun-26 = FY25 publicado - 1S25 reexpresado + 1S26 (10-Q 2T26)
const ebit1S25 = 1685 + 107 - 13, ebit1S26 = 1624 + 123 - 25;
const ltmEbit = 3546 - ebit1S25 + ebit1S26;
const ltmDa = 487 - 243 + 238;
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30',
  ingresos: 9467 - 4672 + 4730, ebitda: ltmEbit + ltmDa, ebit: ltmEbit,
  beneficio_neto: 2673 - 1328 + 1292, bpa: Math.round((6.02 - 2.97 + 3.08) * 100) / 100,
  dpa: Math.round((2.03 - 1.00 + 1.06) * 100) / 100, dpa_extraordinario: 0,
  fcf: (2904 - 1120 + 1056) - (621 - 324 + 227),
};

const financieros = {
  cuenta, ltm,
  cambios_perimetro: [
    { periodo: '2018', descripcion: 'Abaxis (diagnóstico en clínica), consolidada desde el 31-jul-18 por 1.962 M de contraprestación: cinco meses en la cuenta y entera en el balance [7].' },
    { periodo: '2024', descripcion: 'Venta a Phibro de los aditivos medicados (MFA), algunos hidrosolubles y activos asociados, cerrada el 31-oct-24 por 299 M netos: restó unos 3 puntos al crecimiento de 2025 [1].' },
    { periodo: '2025', descripcion: 'Bonos convertibles de 2.000 M emitidos el 18-dic-25: la caja y la deuda suben al cierre y la recompra financiada con ellos se completó en el 1T26 [1, 2].' },
  ],
  comentario: 'Zoetis duplicó sus ventas en nueve años, de 4.888 M en 2016 a 9.467 M en 2025, y el beneficio neto se multiplicó por 3,3 (de 821 M a 2.673 M) porque el margen bruto subió del 65,9 % al 71,8 % y los gastos comerciales y de administración bajaron del 27,9 % al 25,1 % de las ventas [1, 8]. El salto de 2021 (+16,5 %) vino de la pandemia de mascotas y de los anticuerpos monoclonales; desde 2023 el crecimiento se frena: +8,3 % en 2024 y +2,3 % en 2025, este último lastrado por unos 3 puntos de la venta de los aditivos medicados (MFA) y 1 punto de divisa; el orgánico operativo de 2025 fue del 6 % [1, 11]. En 2026 la empresa ya no crece: el orgánico operativo fue 0 % en el 1T26 y −1 % en el 2T26, y la guía anual es de −3 % a −1 % [9, 10]. **Años no comparables**: 2018 (Abaxis desde agosto), 2024-2025 (salida del MFA) y 2017, con un cargo fiscal de unos 229 M por la reforma fiscal de EE. UU. que llevó el tipo al 43 % [7].',
  ajustes: 'Las cifras son las publicadas en US GAAP. El EBIT se calcula como beneficio antes de impuestos más gastos por intereses menos «otros (ingresos)/gastos netos», que recogen ingresos financieros (93 M en 2025), diferencias de cambio y plusvalías o minusvalías de ventas (101 M de plusvalía por la participación en el seguro de mascotas en 2023; 25 M de pérdida por el MFA en 2024) [1, 5]. Las reestructuraciones (51 M en 2025) y la amortización de intangibles adquiridos quedan dentro del EBIT. El BPA ajustado de la empresa excluye amortización de compras, costes de operaciones y «partidas significativas» (cierres de plantas, el programa de ERP, despidos): 6,41 USD frente a 6,02 GAAP en 2025 (0,39 de diferencia) y 5,92 frente a 5,47 en 2024 (0,45) [11, 15]. Para 2026 la guía es de 5,55-5,65 USD GAAP y 6,15-6,25 ajustado [9]. Desde el 1-ene-26 las filiales internacionales cierran a 31 de diciembre en lugar de a 30 de noviembre (cambio de criterio aplicado de forma retroactiva): 2025 se publicó con el desfase de un mes, y el 1S25 reexpresado es 4.672 M frente a 4.680 M publicados [2]. El LTM a junio de 2026 combina el ejercicio 2025 publicado con los semestres reexpresados.',
  confianza: 'Alta',
};

// Balance
const B = {
  at: [7649,8586,10777,11545,13609,13900,14925,14286,14237,15467],
  ac: [3390,4217,4399,4748,6611,6930,7506,6343,5986,6768],
  pc: [1117,1094,1223,1806,2170,1797,3167,1889,3412,2235],
  pt: [6150,6800,8592,8837,9836,9356,10522,9295,9467,12136],
  gw: [1481,1510,2519,2592,2694,2682,2746,2759,2724,2767],
  int: [1228,1269,2046,1890,1710,1474,1380,1338,1127,998],
  ppe: [1381,1435,1658,1940,2202,2422,2753,3204,3391,3681],
  ex: [1502,1427,1391,1410,1628,1923,2345,2564,2306,2430],
  cl: [913,998,1036,1086,1013,1133,1215,1304,1316,1590],
  pr: [265,261,313,301,457,436,405,411,433,487],
  caja: [727,1564,1602,1934,3604,3485,3581,2041,1987,2312],
  deuda: [4468,4953,6443,6447,7195,6592,7902,6564,6570,9042],
  arr: [0,0,0,0,0,0,0,9,8,7],
  pn: [1487,1770,2185,2708,3769,4543,4405,4997,4770,3331],
  min: [12,16,0,0,4,1,-2,-6,0,0],
  res: [1477,2109,3270,4427,5659,7186,8668,10295,11968,13744],
};
const historico = anios.map((p, i) => ({
  periodo: p, activo_total: B.at[i], activo_corriente: B.ac[i], pasivo_corriente: B.pc[i], pasivo_total: B.pt[i],
  fondo_comercio: B.gw[i], intangibles: B.int[i], inmovilizado_material: B.ppe[i], existencias: B.ex[i],
  clientes: B.cl[i], proveedores: B.pr[i], activos_contrato: null, pasivos_contrato: null, caja: B.caja[i],
  deuda_financiera: B.deuda[i], arrendamientos: B.arr[i], patrimonio_neto: B.pn[i], minoritarios: B.min[i], reservas: B.res[i],
}));
for (const h of historico) {
  const chk = h.activo_total - h.pasivo_total - h.patrimonio_neto - h.minoritarios;
  if (Math.abs(chk) > 2) console.log('Descuadre balance', h.periodo, chk);
}
// vida media desde 30-jun-26
const bonos = [[750,2027.70],[500,2028.64],[850,2028.63],[2000,2029.45],[750,2030.37],[750,2032.88],[1000,2035.63],[1150,2043.08],[500,2047.70],[400,2048.64],[500,2050.37]];
const tot = bonos.reduce((a, b) => a + b[0], 0);
const vida = bonos.reduce((a, b) => a + b[0] * (b[1] - 2026.5), 0) / tot;
console.log('principal', tot, 'vida', vida.toFixed(1));

const balance = {
  historico,
  vencimientos: [
    { anio: '2026', importe: 0 }, { anio: '2027', importe: 750 }, { anio: '2028', importe: 1350 },
    { anio: '2029', importe: 2000 }, { anio: '2030', importe: 750 }, { anio: '2031', importe: 0 },
    { anio: '2032', importe: 750 }, { anio: '2033+', importe: 3550 },
  ],
  liquidez: 'A 30-jun-26: caja 1.476 M más 200 M en depósitos a plazo, una línea de crédito sindicada de 1.250 M sin disponer (vence en agosto de 2030, ampliable a 1.750 M), un programa de papel comercial de 1.000 M sin saldo vivo y 46 M en otras líneas bancarias [2].',
  rating: "Moody's A3 (estable, última acción enero de 2025); S&P BBB+ (estable, abril de 2025) [2]",
  coste_deuda_pct: Math.round(222 / ((6570 + 9042) / 2) * 1000) / 10,
  vida_media_anios: Math.round(vida * 10) / 10,
  otros_pasivos: 'Los arrendamientos son casi todos operativos (US GAAP): pasivo de 249 M a cierre de 2025 (52 M a corto y 196 M a largo), tipo medio del 3,9 % y 6,9 años de plazo; no se suman a la deuda porque su gasto ya está en el EBITDA. Los financieros son 7 M [1]. La línea de crédito exige deuda neta/EBITDA de 3,5 veces como máximo (4,0 tras una compra relevante) y se cumple con holgura [2]. Pensiones: déficit de 42 M en los planes propios [1]. Impuestos inciertos a largo plazo: 276 M en «otros impuestos a pagar» [1]. El 27-may-26 se presentó una demanda colectiva de accionistas en Nueva York (compradores entre el 14-ene-25 y el 6-may-26), seguida de demandas derivadas en junio; no hay provisión ni estimación [2]. Pasivos contingentes por la compra de PetMedix (hasta 100 M por hitos) y el litigio ambiental de Ulianópolis (Brasil), sin cuantificar [2, 5]. Los convertibles de 2029 (2.000 M al 0,25 %, conversión a 148,20 USD) se liquidan en efectivo hasta el nominal, con una opción de compra con techo (capped call) que cubre 13,5 M de acciones hasta 211,72 USD [2].',
  comentario: 'El circulante ha crecido más que las ventas: las existencias pasaron de 1.410 M en 2019 a 2.430 M en 2025, y en 2025 los clientes subieron 274 M, con unas ventas del 4T25 internacional adelantadas por el cambio de cierre [1]. La deuda bruta se mantuvo cerca de 6.500-7.900 M entre 2018 y 2024 y saltó a 9.042 M en 2025 por los bonos de agosto (1.850 M, que refinanciaron 1.350 M de vencimientos) y los convertibles de diciembre (2.000 M), destinados íntegramente a recompras [1, 2]. La deuda neta pasó de 4.583 M a 6.730 M y el patrimonio cayó a 3.331 M porque la autocartera acumulada es de 10.685 M. A junio de 2026, tras otros 1.190 M de recompras, la deuda neta es de unos 7.370 M (9.048 M de deuda menos 1.676 M de caja y depósitos), cerca de 1,9 veces el EBITDA de los últimos doce meses [2].',
  confianza: 'Alta',
};

// Flujos
const F = {
  fo: [713,1346,1790,1795,2126,2213,1912,2353,2953,2904],
  capex: [216,224,338,460,453,477,586,732,655,621],
  arr: [0,0,0,0,0,0,0,0,1,2],
  adq: [88,82,1998,195,113,14,312,155,8,24],
  des: [0,0,0,0,0,0,0,96,293,0],
  div: [188,206,243,314,380,474,611,692,786,889],
  rec: [300,500,698,626,250,778,1632,1092,1866,3246],
  em: [36,24,19,7,20,0,0,27,0,0],
};
const flujos = {
  historico: anios.map((p, i) => ({
    periodo: p, flujo_operativo: F.fo[i], capex: F.capex[i], pagos_arrendamientos: F.arr[i], adquisiciones: F.adq[i],
    desinversiones: F.des[i], dividendos: F.div[i], recompras: F.rec[i], emision_acciones: F.em[i], intereses_en_financiacion: 0,
  })),
  comentario: 'El flujo operativo cubre bien el beneficio: 2.904 M en 2025 frente a 2.673 M de beneficio neto, y 2.953 M en 2024 [1]. La conversión fue débil en 2022 (1.912 M, con 2.114 M de beneficio) porque las existencias del balance subieron 422 M [6]. El capex se triplicó de 216 M en 2016 a un máximo de 732 M en 2023 (8,6 % de las ventas) por la ampliación de plantas de anticuerpos monoclonales y de Irlanda y China, y baja desde entonces: 621 M en 2025 y 227 M en el 1S26 [1, 2]. La empresa no separa mantenimiento y crecimiento; como estimación propia, la amortización del inmovilizado material (unos 330 M en 2025: 487 M de amortización total menos 157 M de intangibles) aproxima el capex de mantenimiento, lo que deja unos 290 M de capex de crecimiento. Las recompras (incluidas las retenciones fiscales de planes de acciones) suman 10.988 M en diez años y en 2025 (3.246 M) superaron el flujo libre porque se financiaron con deuda; además se pagaron 187 M por la opción con techo de los convertibles, que no figura como recompra [1].',
  confianza: 'Alta',
};

const out = { ...prev, financieros, balance, flujos };
fs.writeFileSync(salida, JSON.stringify(out, null, 2));
console.log('guardado', Object.keys(out).filter(k => out[k]).join(','));
