// Construye notas/A.json (subagente A, cuentas) a partir de los datos comprobados en los 20-F y los 6-K.
// Unidades: millones de RMB; BPA y DPA en RMB por ADS (1 ADS = 8 ordinarias); acciones en millones de ADS.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
const aqui = dirname(fileURLToPath(import.meta.url));

const E = 'https://www.sec.gov/Archives/edgar/data/1577552/';
const fuentes = [
  { id: 1, titulo: 'Alibaba Group, Form 20-F del ejercicio cerrado el 31-mar-2026 (estados financieros auditados y notas)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-20', url: E + '000119312526231755/baba-20260331.htm' },
  { id: 2, titulo: 'Alibaba Group Announces March Quarter 2026 and Fiscal Year 2026 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-13', url: E + '000110465926060224/tm2614494d1_ex99-1.htm' },
  { id: 3, titulo: 'Alibaba Group Announces June Quarter 2026 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-20', url: E + '000110465926099220/tm2623667d1_ex99-1.htm' },
  { id: 4, titulo: 'Alibaba Group Announces December Quarter 2025 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-19', url: E + '000110465926032060/tm269353d1_ex99-1.htm' },
  { id: 5, titulo: 'Alibaba Group Announces September Quarter 2025 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-25', url: E + '000110465925115949/tm2532163d1_ex99-1.htm' },
  { id: 6, titulo: 'Alibaba Group Announces June Quarter 2025 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-29', url: E + '000110465925085638/tm2524743d1_ex99-1.htm' },
  { id: 7, titulo: 'Alibaba Group Announces March Quarter 2025 and Fiscal Year 2025 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2025-05-15', url: E + '000110465925049400/tm2515233d1_ex99-1.htm' },
  { id: 8, titulo: 'Alibaba Group Announces March Quarter 2024 and Fiscal Year 2024 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2024-05-14', url: E + '000110465924061145/tm2414429d1_ex99-1.htm' },
  { id: 9, titulo: 'Alibaba Group Announces March Quarter and Full Fiscal Year 2023 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2023-05-18', url: E + '000110465923062243/tm2316208d1_ex99-1.htm' },
  { id: 10, titulo: 'Alibaba Group Announces March Quarter and Full Fiscal Year 2022 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2022-05-26', url: E + '000110465922065269/tm2217018d1_ex99-1.htm' },
  { id: 11, titulo: 'Alibaba Group Announces March Quarter and Full Fiscal Year 2021 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2021-05-13', url: E + '000110465921065916/tm2116252d1_ex99-1.htm' },
  { id: 12, titulo: 'Alibaba Group Announces March Quarter and Full Fiscal Year 2020 Results (6-K, ex. 99.1)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2020-05-22', url: E + '000110465920065398/a20-20766_1ex99d1.htm' },
  { id: 13, titulo: 'Alibaba Group, Form 20-F del ejercicio cerrado el 31-mar-2023', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2023-07-21', url: E + '000095017023033752/baba-20230331.htm' },
  { id: 14, titulo: 'Alibaba Group, Form 20-F del ejercicio cerrado el 31-mar-2020', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2020-07-09', url: E + '000110465920082409/baba-20200331x20f.htm' },
  { id: 15, titulo: 'June Quarter 2026 Results Conference Call, transcripción', editor: 'Alibaba Group (web de inversores)', tipo: 'Primaria', fecha: '2026-08-20', url: 'https://data.alibabagroup.com/ecms-files/1567773279/9a0e4864-83fe-4a69-aa1e-e5c14f5b2e73/EN%20Jun%202026%20Q%20-%20Alibaba%20Earnings%20Call.pdf' },
  { id: 16, titulo: 'March Quarter 2026 and Full Fiscal Year 2026 Results Conference Call, transcripción', editor: 'Alibaba Group (web de inversores)', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://data.alibabagroup.com/ecms-files/1508695866/9e0f30c9-651f-41f9-a269-90db4b7d0dd7/EN%20Mar%202026%20Q%20-%20Alibaba%20Earnings%20Call.pdf' },
  { id: 17, titulo: 'Hechos XBRL de los 20-F (companyfacts, CIK 1577552)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-27', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001577552.json' },
  { id: 18, titulo: '6-K de 24-ago-2026: colocación de nuevas acciones en Hong Kong por 80.000 M HKD (anuncio y precio)', editor: 'Alibaba Group / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-24', url: E + '000119312526361715/project_turing_launch__p.htm' },
];

// ---------- Cuenta de resultados (FY2019-FY2026) ----------
// ebit = income from operations; amortizaciones = depreciación del inmovilizado (nota del 20-F) + «amortization and impairment of intangible assets» (línea de la cuenta).
const anos = ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const C = {
  ingresos: [376844, 509711, 717289, 853062, 868687, 941168, 996347, 1023670],
  coste_ventas: [206929, 282367, 421205, 539450, 549695, 586323, 598285, 616136],
  gastos_generales: [64669, 78870, 136743, 151721, 145679, 157126, 188260, 278105],
  depreciacion: [14818, 20325, 25550, 25470, 24654, 23344, 24515, 34963],
  amort_intang: [10727, 13388, 12427, 11647, 13504, 21592, 6336, 5079],
  ebit: [57084, 91430, 89678, 69638, 100351, 113350, 140905, 50150],
  bai: [96221, 166645, 165578, 59550, 89185, 101596, 155455, 129387],
  impuestos: [16553, 20562, 29278, 26815, 15549, 22529, 35445, 30045],
  minoritarios: [-7652, -9083, -7294, -15170, -7210, -8677, -4133, -1465],
  beneficio_neto: [87600, 149263, 150308, 61959, 72509, 79741, 129470, 105904],
  gastos_financieros: [5190, 5180, 4476, 4909, 5918, 7947, 9596, 9793],
  // Deterioro del fondo de comercio + multa antimonopolio (FY2021, dentro de G&A) + «others» de la conciliación del EBITA (FY2025-26).
  no_recurrentes: [0, 576, 18228, 25141, 2714, 10521, 11854, 10007],
  bpa: [33.38, 55.93, 54.70, 22.74, 27.46, 31.24, 53.59, 44.00],
  acciones_ord: [20988, 21346, 21982, 21787, 21114, 20359, 19318, 19235],
  dpa_usd: [0, 0, 0, 0, 1.00, 1.66, 2.00, 1.05],
  dpa_extra_usd: [0, 0, 0, 0, 0, 0.66, 0.95, 0],
  usdcny: [null, 7.0808, 6.5518, 6.3393, 6.8676, 7.2203, 7.2567, 6.8980],
};
const r2 = (x) => Math.round(x * 100) / 100;
const r1 = (x) => Math.round(x * 10) / 10;
const cuenta = anos.map((p, i) => {
  const am = C.depreciacion[i] + C.amort_intang[i];
  return {
    periodo: p, ingresos: C.ingresos[i], coste_ventas: C.coste_ventas[i], gastos_generales: C.gastos_generales[i],
    ebitda: C.ebit[i] + am, amortizaciones: am, ebit: C.ebit[i], resultado_financiero: C.bai[i] - C.ebit[i], bai: C.bai[i],
    impuestos: C.impuestos[i], minoritarios: C.minoritarios[i], beneficio_neto: C.beneficio_neto[i], gastos_financieros: C.gastos_financieros[i],
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: C.no_recurrentes[i] || null,
    bpa: C.bpa[i],
    dpa: C.dpa_usd[i] ? r2(C.dpa_usd[i] * C.usdcny[i]) : 0,
    dpa_extraordinario: C.dpa_extra_usd[i] ? r2(C.dpa_extra_usd[i] * C.usdcny[i]) : 0,
    acciones_diluidas: r1(C.acciones_ord[i] / 8),
  };
});

// LTM jun-26 = FY2026 − 1T FY2026 + 1T FY2027 [2, 3, 6]
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30',
  ingresos: 1023670 - 247652 + 268953,
  // EBITDA FY2026 (base del cuadro) − (EBIT 34.988 + depreciación 6.891 + amortización 807) + (EBIT 15.161 + depreciación 11.814 + amortización 665)
  ebitda: 90192 - (34988 + 6891 + 807) + (15161 + 11814 + 665),
  ebit: 50150 - 34988 + 15161,
  beneficio_neto: 105904 - 43116 + 10537,
  bpa: r2(44.00 - 17.98 + 3.71),
  dpa: 7.24, dpa_extraordinario: 0,
  fcf: -46609 - (-18815) + (-44670),
  participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: 10007 - (-145) + 8541,
};

const financieros = {
  cuenta, ltm,
  cambios_perimetro: [
    { periodo: 'FY2021', descripcion: 'Sun Art consolidada desde octubre de 2020 tras comprar participación adicional por 3.600 M USD (24.100 M RMB) [13]: entra en ingresos, coste y balance a mitad de ejercicio.' },
    { periodo: 'FY2026', descripcion: 'Venta de Sun Art (73,66 %, 9.698 M HKD) e Intime (7.400 M RMB), cerradas en FY2025: sin ellas los ingresos de FY2026 crecen un 11 % frente al 3 % publicado [1, 2].' },
  ],
  comentario: 'Los ingresos pasan de 376.844 M RMB en FY2019 a 1.023.670 M en FY2026, pero el crecimiento se frena desde FY2022 (+2 % en FY2023, +3 % en FY2026) por la desaceleración del comercio en China y, en FY2026, por la salida de Sun Art e Intime: en perímetro comparable FY2026 crece un 11 % [2]. El margen operativo publicado cae del 14,1 % de FY2025 al 4,9 % de FY2026 porque los gastos comerciales suben de 144.021 a 245.023 M RMB con la entrada en el comercio rápido (Taobao Instant Commerce), la captación de usuarios de la app Qwen y la inversión en tecnología [1, 2]. El EBITA ajustado de la empresa baja un 56 %, a 76.416 M RMB; el de China E-commerce un 44 % (193.223 → 107.509 M) mientras la nube sube un 35 % (10.556 → 14.265 M) y AIDC casi alcanza el equilibrio (−15.137 → −2.051 M) [2]. El 1T FY2027 (jun-26) sigue igual: ingresos +9 %, EBITA ajustado −30 % por la pérdida de 13.861 M de AI Labs and Applications [3]. Años no comparables: FY2021 (multa antimonopolio de 18.228 M y consolidación de Sun Art) y FY2022 (deterioro de fondo de comercio de 25.141 M) [10, 11]. La partida de amortización de intangibles de FY2024 (21.592 M) incluye un deterioro de 12.089 M [8, 17].',
  ajustes: 'Las cifras del cuadro son las publicadas en US GAAP. El beneficio neto es el atribuido a los accionistas ordinarios (tras la acreción de capital intermedio), el que usa la empresa para el BPA; el BPA y el DPA van por ADS (8 ordinarias) y las acciones en millones de ADS. El EBITDA es el EBIT publicado más la depreciación del inmovilizado y la amortización y deterioro de intangibles; no coincide con el «adjusted EBITDA» de la empresa (113.483 M en FY2026), que además suma pagos en acciones (11.180 M), deterioros del fondo de comercio y otros (10.007 M) y deterioros de inmovilizado [2]. En no recurrentes van los deterioros del fondo de comercio de cada año, la multa antimonopolio de FY2021 (18.228 M) y los «others» de la conciliación (provisiones puntuales) en FY2025-26 [1, 2, 11]. El BPA no GAAP de la empresa excluye además las plusvalías y minusvalías de inversiones, que en FY2026 suman 74.416 M a favor: por eso el BPA GAAP (44,00 RMB) supera al no GAAP (26,80 RMB) [2]. El LTM a jun-26 lleva 8.541 M de deterioros y provisiones (incluida la multa de la Comisión Europea por la DSA, 550 M EUR) [3]. El BPA de cada ejercicio es el publicado en los comunicados anuales [2, 7-12] y el de los trimestres, en los trimestrales [2-7]; el EBITDA trimestral del cuadro de trimestres es el «adjusted EBITDA» de la empresa, no el de la cuenta anual.',
  confianza: 'Alta',
};

// ---------- Trimestres ----------
// ebitda = adjusted EBITDA de la empresa; bpa = BPA diluido GAAP por ADS.
const T = [
  ['2T25', 236503, null, 47327, 18.17, 15.06, 5],
  ['3T25', 280154, null, 62054, 20.39, 21.39, 4],
  ['4T25', 236454, 7, 41783, 5.17, 12.52, 7],
  ['1T26', 247652, 2, 45735, 17.98, 14.75, 6],
  ['2T26', 247795, 5, 17256, 8.75, 4.36, 5],
  ['3T26', 284843, 2, 34057, 5.93, 7.09, 4],
  ['4T26', 243380, 3, 16435, 10.36, 0.62, 2],
  ['1T27', 268953, 9, 39143, 3.71, 8.52, 3],
];
const trimestres = {
  items: T.map(([periodo, ingresos, crec, ebitda, bpa]) => ({ periodo, ingresos, crecimiento_pct: crec, crecimiento_organico_pct: periodo === '4T26' ? 11 : null, ebitda, margen_ebitda_pct: r1(ebitda / ingresos * 100), bpa, vs_consenso: null })),
  ultima_presentacion: 'En la conferencia del 4T FY2026 (13-may-26) la dirección presentó la nube como en «punto de inflexión» y fijó objetivos de ingresos recurrentes anualizados (ARR) de servicios de modelos y aplicaciones de 10.000 M RMB en el trimestre de junio y 30.000 M a final de 2026 [16]. Las preguntas se centraron en el retorno de la inversión: el CFO admitió que el flujo libre negativo viene de la IA, dijo que la inversión seguirá «igual de decidida» dos años más y se apoyó en una caja neta de unos 38.000 M USD [16]. A Morgan Stanley, el CEO le dijo que el capital necesario en cinco años «superará con mucho» el presupuesto de 380.000 M RMB a tres años, en parte vía arrendamientos y cocostrucción [16].\n\nEn la del 1T FY2027 (20-ago-26) el discurso pasó de la inversión al retorno: nube +45 % con margen EBITA del 11,6 %, ARR de productos de IA de 49.500 M RMB, MaaS por encima de 16.000 M en agosto y objetivo de 100.000 M USD de ingresos externos de nube en 2030 con margen superior al 20 % [15]. Citi preguntó por el capex de 67.678 M del trimestre: el CEO pidió no multiplicarlo por cuatro, lo atribuyó a ciclos de entrega, CPU y subida de precios de componentes, y dio un periodo de recuperación de tres años por servidor sin desglosar el capex ni actualizar la cifra de 380.000 M [15]. Sobre China E-commerce (CMR −7 %, +1 % comparable) la dirección habló de «retos macroeconómicos» y no dio guía; el comercio rápido alcanzaría beneficio en FY2029 [3, 15].',
  confianza: 'Alta',
};

// ---------- Balance (FY2019-FY2026) ----------
const B = {
  activo_total: [965076, 1312985, 1690218, 1695553, 1753044, 1764829, 1804227, 1909570],
  activo_corriente: [270273, 462923, 643360, 638535, 697966, 752864, 674049, 610769],
  pasivo_corriente: [207669, 241872, 377358, 383784, 385351, 421507, 435346, 476398],
  pasivo_total: [349674, 433334, 606584, 613360, 630123, 652230, 714121, 783300],
  fondo_comercio: [264935, 276782, 292771, 269581, 268091, 259679, 255501, 247378],
  intangibles: [68276, 60947, 70833, 59231, 46913, 26950, 20911, 16983],
  inmovilizado_material: [92030, 103387, 147412, 171806, 176031, 185161, 203348, 282699],
  existencias: [8534, 14859, null, 30087, 28547, null, 18887, 18909],
  clientes: [13771, 19786, 27076, 32813, 32134, 30686, 31172, 36020],
  proveedores: [117711, 161536, 261140, 271460, 275950, 297883, 332537, 359893],
  // caja = efectivo + inversiones a corto plazo (sin efectivo restringido ni inversiones de tesorería a largo)
  efectivo: [189976, 330503, 321262, 189898, 193086, 248125, 145487, 131530],
  invcp: [3262, 28478, 152376, 256514, 326492, 262955, 228826, 155310],
  // deuda = préstamos bancarios c/p y l/p + bonos senior c/p y l/p + convertibles + canjeables
  deuda: [7356 + 15110 + 35427 + 76407, 5154 + 0 + 39660 + 80616, 3606 + 9831 + 38335 + 97381, 8841 + 0 + 38244 + 94259, 7466 + 4800 + 52023 + 97065, 12749 + 16252 + 55686 + 86089, 22562 + 0 + 49909 + 122398 + 35834, 28224 + 0 + 47450 + 117485 + 55861 + 10976],
  patrimonio_neto: [492257, 755401, 937470, 948479, 989657, 986544, 1009858, 1060886],
  minoritarios: [116326, 115147, 137491, 124059, 123406, 115327, 68535, 57539],
  reservas: [257886, 406287, 554924, 563557, 599028, 597897, 645478, 708382],
};
const balance = {
  historico: anos.map((p, i) => ({
    periodo: p, activo_total: B.activo_total[i], activo_corriente: B.activo_corriente[i], pasivo_corriente: B.pasivo_corriente[i], pasivo_total: B.pasivo_total[i],
    fondo_comercio: B.fondo_comercio[i], intangibles: B.intangibles[i], inmovilizado_material: B.inmovilizado_material[i], existencias: B.existencias[i],
    clientes: B.clientes[i], proveedores: B.proveedores[i], activos_contrato: null, pasivos_contrato: null,
    caja: B.efectivo[i] + B.invcp[i], deuda_financiera: B.deuda[i], arrendamientos: 0,
    patrimonio_neto: B.patrimonio_neto[i], minoritarios: B.minoritarios[i], reservas: B.reservas[i],
  })),
  vencimientos: [
    { anio: 'FY2027', importe: 28224 },
    { anio: 'FY2028', importe: 1453 + 17617 },
    { anio: 'FY2029', importe: 4849 + 8400 },
    { anio: 'FY2030', importe: 5420 + 5000 },
    { anio: 'FY2031', importe: 26951 + 17271 },
    { anio: 'FY2032+', importe: 8777 + 69922 + 55861 + 10976 },
  ],
  liquidez: 'Efectivo e inversiones a corto plazo de 286.840 M RMB a 31-mar-2026; «efectivo y otras inversiones líquidas» sin restricciones (incluye inversiones de tesorería a largo) de 520.824 M RMB a 31-mar-2026 y 474.505 M RMB a 30-jun-2026 [2, 3]. Línea revolving de 3.330 M USD sin disponer y otra de 3.170 M USD con unos 2.600 M USD sin usar, ambas hasta septiembre de 2028 [1]. Colocación de nuevas acciones en Hong Kong por 80.000 M HKD en agosto de 2026 [18].',
  rating: null,
  coste_deuda_pct: r1(9793 / ((230703 + 259996) / 2) * 100),
  vida_media_anios: null,
  otros_pasivos: 'Sin arrendamientos financieros significativos: los operativos (21.726 M RMB de pasivo en FY2026) ya están en el EBITDA y no van a la deuda [1, 17]. Los bonos senior (118.210 M de principal) llevan cláusulas sobre garantías, fusiones y venta de activos, y la empresa las cumple; los préstamos bancarios a largo están garantizados en parte con inmuebles y derechos de uso de suelo (19.975 M) [1]. Los convertibles de 2024 (5.000 M USD, 2031, opción de venta en junio de 2029) y de 2025 (3.200 M USD, 2032, opción en septiembre de 2030) y los canjeables en acciones de Alibaba Health (12.000 M HKD, 2032, opción en julio de 2030) pueden diluir o pedir caja antes de su vencimiento [1]. Garantiza un préstamo de 6.500 M HKD de Cingleot (centro logístico del aeropuerto de Hong Kong; 5.500 M dispuestos) [1]. Compromisos de inversión contratados de 54.136 M RMB [1]. Capital intermedio (mezzanine) de 7.845 M [2]. Restricción a la distribución de activos netos de las filiales chinas de 344.580 M RMB [1]. Provisión de la multa de 550 M EUR de la Comisión Europea (DSA) en el 1T FY2027 [3].',
  comentario: 'La deuda financiera bruta sube de 141.344 M RMB en FY2022 a 259.996 M en FY2026 (convertibles de 2024 y 2025, canjeables de 2025), mientras el efectivo y las inversiones a corto bajan de 519.578 M (FY2023) a 286.840 M: la caja neta de ese perímetro se reduce a 26.844 M. Con las inversiones de tesorería a largo que la empresa cuenta como líquidas, la caja neta es de unos 38.000 M USD a marzo y 30.700 M USD a junio de 2026, según el CFO [15, 16]. La deuda es barata (bonos del 2,1 % al 5,6 %, convertibles al 0-0,5 %) y larga: el 56 % vence después de FY2031 [1]. El circulante pasa de 312.615 M de exceso de activo corriente en FY2023 a 134.371 M en FY2026 por el consumo de caja del capex y el comercio rápido; los pasivos acumulados y proveedores suben a 359.893 M [1].',
  confianza: 'Alta',
};

// ---------- Flujos (FY2019-FY2026) ----------
const F = {
  flujo_operativo: [150975, 180607, 231786, 142759, 199752, 182593, 163509, 76213],
  capex: [3146 + 32336 + 14161, 7888 + 24662 + 12836, 41450 + 1735, 53309 + 15, 34330 + 22, 32087 + 842, 85972 + 0, 126063 + 874],
  adquisiciones: [35434, 14536, 19137, 4087, 1204, 2204, -353, 1212],
  desinversiones: [-10, -107, -126, -11, -5, 699, -5077, 11421],
  dividendos: [0, 0, 0, 0, 0, 17946, 29077, 33732],
  recompras: [10872, 0, 773, 61225, 74746, 88745, 86662, 7638],
  emision_acciones: [354, 91506, 175, 109, 11, 843, 10, 1042],
};
const flujos = {
  historico: anos.map((p, i) => ({
    periodo: p, flujo_operativo: F.flujo_operativo[i], capex: F.capex[i], pagos_arrendamientos: 0, adquisiciones: F.adquisiciones[i],
    desinversiones: F.desinversiones[i], dividendos: F.dividendos[i], recompras: F.recompras[i], emision_acciones: F.emision_acciones[i], intereses_en_financiacion: 0,
  })),
  comentario: 'El flujo operativo cae de 231.786 M RMB en FY2021 a 76.213 M en FY2026 (−53 % solo en el último año) por las pérdidas del comercio rápido y la captación de usuarios de Qwen, y el capex (suelo, inmovilizado e intangibles) se multiplica por cuatro desde FY2024, de 32.929 a 126.937 M, por la infraestructura de IA [1, 2]. El flujo libre de la propia empresa pasa de +73.870 M en FY2025 a −46.609 M en FY2026 y −44.670 M solo en el 1T FY2027, con un capex trimestral de 67.678 M [2, 3]. La empresa no separa capex de mantenimiento y de crecimiento; estimación propia: la depreciación de FY2026 (34.963 M) es la referencia del mantenimiento, y el resto (unos 92.000 M) es expansión de la nube [1]. Años no comparables: hasta FY2020 el capex incluye los derechos de contenido audiovisual (12.836 M en FY2020), que desde FY2021 pasan al flujo operativo [13, 14]. La empresa paga los intereses dentro del flujo operativo (9.384 M en FY2026) y no tiene arrendamientos financieros significativos [1, 17]. Las compras de minoritarios (16.768 M en FY2026, 21.949 M en FY2025) van en financiación y no están en adquisiciones [1].',
  confianza: 'Alta',
};

// ---------- Calidad ----------
const calidad = {
  auditor: 'PricewaterhouseCoopers Zhong Tian LLP (PwC ZT, Shanghái)',
  anios_auditor: 4,
  opinion: 'Favorable, también sobre el control interno (COSO 2013) a 31-mar-2026',
  comentario: 'PwC Zhong Tian audita desde FY2023 («since 2023»); antes lo hacía otra firma de la red PwC, que el 20-F llama «then independent registered public accounting firm» [1]. La opinión de FY2026 es limpia, sin salvedades, y declara eficaz el control interno; la cuestión clave de auditoría es el deterioro del fondo de comercio de dos unidades de «All others» [1]. El resultado contable depende mucho de partidas no operativas: en FY2026 los «intereses y rendimientos de inversiones» suman 87.512 M RMB (74.416 M de plusvalías y revalorizaciones de participadas), frente a un EBIT de 50.150 M, y por eso el beneficio GAAP supera al no GAAP [2]. Los pagos en acciones bajan de 50.120 M en FY2021 a 11.180 M en FY2026 (1,1 % de las ventas) [1, 17]. Hay deterioros del fondo de comercio casi todos los años (25.141 M en FY2022, 10.521 M en FY2024, 6.171 M en FY2025, 9.515 M en FY2026 y 4.458 M en el 1T FY2027) [1, 3, 8, 10]. Desde el 4T FY2026 parte de las subvenciones a comerciantes se registra como menos ingreso y no como gasto comercial: el CMR crece un 1 % publicado frente al 8 % comparable [2]. Los indicadores Altman, Piotroski y Beneish del motor se leen con cuidado: el balance lleva 657.000 M de participaciones e inversiones que no generan EBIT.',
  senales: [
    { senal: 'Beneficio GAAP inflado por revalorizaciones de inversiones', nivel: 'Alta', comentario: 'En FY2026, 74.416 M RMB de plusvalías de participadas (venta de Trendyol GO y valor razonable) frente a un EBIT de 50.150 M; el BPA GAAP (44,00) supera al no GAAP (26,80) [2].' },
    { senal: 'Deterioros recurrentes del fondo de comercio', nivel: 'Media', comentario: 'Cinco ejercicios seguidos con deterioro, todos en negocios de «All others» y comercio físico (Sun Art, Intime) [1, 3, 10].' },
    { senal: 'Cambio de presentación de las subvenciones a comerciantes', nivel: 'Media', comentario: 'Desde el 4T FY2026 (ene-mar 2026) van como menos ingreso del CMR; resta crecimiento de ingresos y mejora el margen sobre ventas frente a años anteriores [2, 3].' },
    { senal: 'Segmentos cambiados dos veces en dos años', nivel: 'Media', comentario: 'Reorganización en el 1T FY2026 y de nuevo en el 1T FY2027; solo se reexpresa el trimestre comparable, lo que impide series largas por negocio [2, 3, 7].' },
    { senal: 'Auditor de un país con supervisión limitada del PCAOB', nivel: 'Baja', comentario: 'El PCAOB inspecciona China desde diciembre de 2022, pero el 20-F avisa de que podría volver a no hacerlo; PwC ZT fue sancionada en China en 2024 por otro cliente [1].' },
  ],
  confianza: 'Alta',
};

const rentabilidad = {
  comentario: 'El ROIC del motor se apoya en un capital invertido grande y en buena parte improductivo: de 1,91 billones de RMB de activo en FY2026, 657.000 M son inversiones financieras y participadas por el método de la participación (Ant Group, Moonshot y otras) y 247.378 M fondo de comercio, que no generan EBIT [1]. El EBIT cae de 140.905 M en FY2025 a 50.150 M en FY2026 por el comercio rápido y la IA, mientras el inmovilizado sube de 203.348 a 282.699 M: el ROIC incremental del último año es negativo [1]. La rentabilidad depende del margen, no de la rotación: el EBITA ajustado de China E-commerce baja un 44 % con ingresos del segmento +9 % [2]. La dirección defiende el retorno de la nube con servidores que recuperan la inversión en tres años y un objetivo de margen superior al 20 % [15]; el margen EBITA de la nube fue del 9,0 % en FY2026 y del 11,6 % en el 1T FY2027 [2, 3, 15].',
  confianza: 'Media',
};

const capital = {
  politica: 'Dividendo anual ordinario de 1,05 USD por ADS para FY2026 (unos 2.500 M USD), sin extraordinario, frente a 2,00 USD en FY2025 (1,05 ordinario + 0,95 extraordinario) y 1,66 USD en FY2024 [1, 2]. El programa de recompra se amplió en febrero de 2024 en 25.000 M USD hasta marzo de 2027; en FY2026 solo se recompraron 73 millones de ordinarias por 1.000 M USD, frente a 86.662 M RMB en FY2025, y 162 M USD en el 1T FY2027 [1, 15]. La dirección dice que reparte el capital entre IA y nube, recompras y dividendos y que «ajustará las prioridades» [15]. En agosto de 2026 colocó nuevas acciones en Hong Kong por 80.000 M HKD [18], tras emitir convertibles en 2024 y 2025 y canjeables en 2025 [1].',
  adquisiciones: [
    { anio: '2019', objetivo: 'Kaola (comercio de importación), 100 % comprado a NetEase', importe: Math.round(1874 * 7.0808), ev_ebitda: null, financiacion: 'Caja y 14,3 millones de ordinarias nuevas (316 M USD)', resultado: 'Sin datos de resultado separados en los documentos leídos [14].' },
    { anio: '2020', objetivo: 'Sun Art Retail (hipermercados), hasta el 67 % y después el 74 % con la oferta obligatoria', importe: 24100 + 4100, ev_ebitda: null, financiacion: 'Caja (3.600 M USD + 4.900 M HKD)', resultado: 'Vendida en FY2025 por 9.698 M HKD por el 73,66 %, con pérdida en la venta y deterioros previos del fondo de comercio [1, 13].' },
    { anio: '2023', objetivo: 'Moonshot AI (modelos de lenguaje), 36 % en acciones preferentes', importe: 5900, ev_ebitda: null, financiacion: 'Caja', resultado: 'Valorada por el método alternativo; sus modelos se ofrecen en la nube de Alibaba [1, 15].' },
    { anio: '2024', objetivo: 'Intime (grandes almacenes), venta del 99 %', importe: -7400, ev_ebitda: null, financiacion: 'Desinversión (cobro en caja)', resultado: 'Pérdida en la venta registrada en FY2025 [1, 2].' },
    { anio: '2025', objetivo: 'Trendyol GO (reparto local en Turquía), venta del 85 %', importe: -5000, ev_ebitda: null, financiacion: 'Desinversión (unos 700 M USD en caja)', resultado: 'Plusvalía dentro de los rendimientos de inversiones de FY2026 [1].' },
  ],
  comentario: 'Entre FY2022 y FY2025 la empresa devolvió al accionista unos 358.000 M RMB en recompras y dividendos (311.378 M en recompras), y las acciones diluidas bajaron de 2.748 millones de ADS en FY2021 a 2.415 millones en FY2025 [1, 7, 13]. En FY2026 cambió de rumbo: recompras de solo 7.638 M, capex de 126.937 M y emisión de convertibles, canjeables y, en agosto de 2026, 80.000 M HKD en acciones nuevas [1, 18]. Las compras de distribución física (Sun Art, Intime) acabaron vendidas con pérdidas y deterioros [1]. El historial reciente de inversión fuera del núcleo es pobre; la apuesta de la nube aún no tiene años de retorno que juzgar.',
  confianza: 'Media',
};

// ---------- Negocio (datos; los textos los escribe el integrador si hace falta) ----------
const negocio = {
  descripcion: null, como_gana_dinero: null,
  segmentos: [
    { nombre: 'Alibaba China E-commerce Group', descripcion: 'Taobao, Tmall, comercio rápido (Taobao Instant Commerce, Ele.me), Fliggy y mayorista 1688.', tipo_resultado: 'EBITA ajustado', historico: [{ periodo: 'FY2025', ingresos: 508380, resultado: 193223 }, { periodo: 'FY2026', ingresos: 554217, resultado: 107509 }] },
    { nombre: 'Alibaba International Digital Commerce (AIDC)', descripcion: 'AliExpress, Trendyol, Lazada, Daraz y Alibaba.com.', tipo_resultado: 'EBITA ajustado', historico: [{ periodo: 'FY2025', ingresos: 132300, resultado: -15137 }, { periodo: 'FY2026', ingresos: 144170, resultado: -2051 }] },
    { nombre: 'Cloud Intelligence Group', descripcion: 'Alibaba Cloud: computación, almacenamiento, IA y modelos como servicio.', tipo_resultado: 'EBITA ajustado', historico: [{ periodo: 'FY2025', ingresos: 118028, resultado: 10556 }, { periodo: 'FY2026', ingresos: 158132, resultado: 14265 }] },
    { nombre: 'Todos los demás', descripcion: 'Freshippo, Cainiao, Alibaba Health, Hujing (medios), Amap, Qwen consumo, Lingxi Games, DingTalk; Sun Art e Intime hasta su venta.', tipo_resultado: 'EBITA ajustado', historico: [{ periodo: 'FY2025', ingresos: 338347, resultado: -9499 }, { periodo: 'FY2026', ingresos: 254367, resultado: -35737 }] },
    { nombre: 'Eliminaciones y no asignado', descripcion: 'Ventas entre segmentos y costes corporativos.', tipo_resultado: 'EBITA ajustado', historico: [{ periodo: 'FY2025', ingresos: 1924 - 102632, resultado: -4337 - 1741 }, { periodo: 'FY2026', ingresos: 2340 - 89556, resultado: 76416 - (107509 - 2051 + 14265 - 35737) }] },
  ],
  segmentos_nueva_estructura_1T: {
    nota: 'Desde el 1T FY2027 (jun-26) la empresa informa con cuatro segmentos; solo reexpresa el 1T FY2026 [3].',
    filas: [
      { segmento: 'Alibaba E-commerce Group', ingresos_1T26: 198812, ingresos_1T27: 205862, ebita_1T26: 39988, ebita_1T27: 39749, detalle_1T27: 'China E-commerce 110.900 (CMR 82.547, −7 %); China Quick Commerce 53.295 (+45 %); International E-commerce 27.761 (−1 %); Global Wholesale 13.906 (+7 %)' },
      { segmento: 'AI Cloud and Compute Services', ingresos_1T26: 33418, ingresos_1T27: 48437, ebita_1T26: 2419, ebita_1T27: 5628 },
      { segmento: 'AI Labs and Applications', ingresos_1T26: 2882, ingresos_1T27: 3338, ebita_1T26: -3224, ebita_1T27: -13861 },
      { segmento: 'All others', ingresos_1T26: 28629, ingresos_1T27: 28803, ebita_1T26: 687, ebita_1T27: -3343 },
      { segmento: 'No asignado y eliminaciones', ingresos_1T26: 519 - 16608, ingresos_1T27: 783 - 18270, ebita_1T26: -419 - 607, ebita_1T27: -163 - 681 },
    ],
  },
  geografias: [{ nombre: 'China (estimación propia: segmentos salvo AIDC)', peso_pct: 85.9 }, { nombre: 'Internacional (AIDC)', peso_pct: 14.1 }],
  geografias_criterio: 'origen',
  clientes: null,
  kpis: [
    { kpi: 'Ingresos de la nube (Cloud Intelligence / AI Cloud and Compute)', valor_anterior: '118.028 M RMB en FY2025 (+11 %)', valor_actual: '158.132 M RMB en FY2026 (+34 %); 48.437 M en el 1T FY2027 (+45 %)', variacion: '+34 % anual; +45 % en el último trimestre', comentario: 'Ingresos de clientes externos +45 % en el 1T FY2027, máximo de 22 trimestres [2, 3, 15].' },
    { kpi: 'Ingresos de productos de IA en la nube', valor_anterior: '8.971 M RMB en el 4T FY2026', valor_actual: '12.376 M RMB en el 1T FY2027', variacion: 'Crecimiento de tres cifras por duodécimo trimestre', comentario: 'El 35 % de los ingresos externos de la nube; ARR de MaaS por encima de 16.000 M RMB en agosto de 2026 [2, 3, 15].' },
    { kpi: 'Margen EBITA ajustado de la nube', valor_anterior: '8,9 % en FY2025', valor_actual: '9,0 % en FY2026; 11,6 % en el 1T FY2027', variacion: '+2,6 puntos en el último trimestre', comentario: 'Objetivo de la dirección: más del 20 % [2, 3, 15].' },
    { kpi: 'Ingresos del comercio rápido', valor_anterior: '53.588 M RMB en FY2025', valor_actual: '78.520 M RMB en FY2026 (+47 %); 53.295 M en el 1T FY2027 con la nueva definición (+45 %)', variacion: '+47 %', comentario: 'En pérdidas; la dirección espera beneficio en FY2029 [2, 3, 15].' },
    { kpi: 'Ingresos por gestión de clientes (CMR)', valor_anterior: '326.769 M RMB en FY2025', valor_actual: '343.867 M RMB en FY2026 (+5 %; +7 % comparable)', variacion: '−7 % en el 1T FY2027 (+1 % comparable)', comentario: 'Las subvenciones a comerciantes restan ingreso desde el 4T FY2026 [2, 3].' },
    { kpi: 'Miembros 88VIP', valor_anterior: 'Más de 50 millones (mar-25)', valor_actual: 'Unos 64 millones (jun-26)', variacion: 'Crecimiento de dos cifras', comentario: 'El grupo de clientes que más gasta [3, 7].' },
    { kpi: 'Capex', valor_anterior: '85.972 M RMB en FY2025', valor_actual: '126.937 M RMB en FY2026; 67.678 M en el 1T FY2027 (+75 %)', variacion: '+48 % anual', comentario: 'Más de 190.000 M invertidos del plan de 380.000 M a tres años, que la dirección dice que se quedará corto [1, 3, 15, 16].' },
  ],
  confianza: 'Media',
};

// ---------- BPA no GAAP (para la historia del PER y los escenarios) ----------
const bpa_no_gaap = {
  nota: 'BPA diluido por ADS en RMB publicado por la empresa (1 ADS = 8 ordinarias). El no GAAP excluye pagos en acciones, amortización y deterioro de intangibles, deterioros del fondo de comercio y de inversiones, plusvalías y minusvalías de inversiones y otras partidas, con su efecto fiscal. Ojo: FY2026 es el primer año en que el no GAAP queda muy por debajo del GAAP por las plusvalías de inversiones.',
  serie: [
    { periodo: 'FY2019', no_gaap: 38.40, gaap: 33.38, fuente: 12 },
    { periodo: 'FY2020', no_gaap: 52.98, gaap: 55.93, fuente: 12 },
    { periodo: 'FY2021', no_gaap: 65.15, gaap: 54.70, fuente: 11 },
    { periodo: 'FY2022', no_gaap: 52.69, gaap: 22.74, fuente: 10 },
    { periodo: 'FY2023', no_gaap: 54.56, gaap: 27.46, fuente: 9 },
    { periodo: 'FY2024', no_gaap: 62.23, gaap: 31.24, fuente: 8 },
    { periodo: 'FY2025', no_gaap: 65.41, gaap: 53.59, fuente: 7 },
    { periodo: 'FY2026', no_gaap: 26.80, gaap: 44.00, fuente: 2 },
    { periodo: '1T FY2026 (jun-25)', no_gaap: 14.75, gaap: 17.98, fuente: 6 },
    { periodo: '1T FY2027 (jun-26)', no_gaap: 8.52, gaap: 3.71, fuente: 3 },
    { periodo: 'LTM jun-26 (suma de trimestres, estimación propia)', no_gaap: r2(26.80 - 14.75 + 8.52), gaap: r2(44.00 - 17.98 + 3.71), fuente: null },
  ],
  trimestral_no_gaap: { '2T25': 15.06, '3T25': 21.39, '4T25': 12.52, '1T26': 14.75, '2T26': 4.36, '3T26': 7.09, '4T26': 0.62, '1T27': 8.52 },
  tipos_cambio_cierre_usdcny: { FY2020: 7.0808, FY2021: 6.5518, FY2022: 6.3393, FY2023: 6.8676, FY2024: 7.2203, FY2025: 7.2567, FY2026: 6.8980, '30-jun-2026': 6.7851 },
};

const huecos = [
  { seccion: 'trimestres', campo: 'vs_consenso', tipo: 'Complemento', intentos: '1) Comunicados de resultados de la empresa (no dan consenso); 2) transcripciones de las conferencias del 4T FY2026 y 1T FY2027 (no lo mencionan); 3) sin fuente primaria de consenso previo por trimestre en el tiempo disponible (lo cubre el subagente de consenso)', decision: 'Omitido' },
  { seccion: 'trimestres', campo: 'crecimiento_pct de 2T25 y 3T25', tipo: 'Complemento', intentos: '1) Comunicados del 2T y 3T FY2026 (solo dan el trimestre comparable, no su crecimiento); 2) XBRL anual (no trae trimestres); 3) no se descargaron los comunicados de FY2025 trimestrales', decision: 'Omitido' },
  { seccion: 'balance', campo: 'existencias FY2021 y FY2024', tipo: 'Complemento', intentos: '1) XBRL companyfacts (no etiqueta InventoryNet); 2) notas de «prepayments, receivables and other assets» de los 20-F de FY2020, FY2023 y FY2026 (dan FY2019-20, FY2022-23 y FY2025-26); 3) no se descargaron los 20-F de FY2022 y FY2025', decision: 'Omitido' },
  { seccion: 'balance', campo: 'rating y vida media de la deuda', tipo: 'Complemento', intentos: '1) 20-F FY2026, notas 21-24 (no dan rating ni vida media); 2) comunicados de resultados; 3) cálculo a partir del calendario: el 54 % vence después de FY2031, pero sin vida media ponderada exacta', decision: 'Omitido (el rating lo cubre otro subagente)' },
  { seccion: 'negocio', campo: 'segmentos con cinco ejercicios', tipo: 'Núcleo', intentos: '1) 20-F FY2026 y comunicado de FY2026 (estructura de FY2026 con FY2025 reexpresado); 2) comunicado de FY2025 (estructura anterior: Taobao y Tmall, Cainiao, Local Services, DME); 3) comunicado del 1T FY2027 (estructura nueva de cuatro segmentos, solo 1T FY2026 reexpresado)', decision: 'Solo FY2025-FY2026 en la estructura del 20-F; el 1T con la nueva estructura aparte' },
  { seccion: 'negocio', campo: 'geografías', tipo: 'Complemento', intentos: '1) 20-F FY2026 (no desglosa ingresos por país); 2) nota de segmentos (solo por negocio); 3) estimación con el peso de AIDC en los ingresos de los segmentos antes de eliminaciones', decision: 'Calculado y marcado como estimación' },
];

const salida = {
  _estado: 'Completo (cuentas FY2019-FY2026, LTM jun-26, 8 trimestres, balance, flujos, calidad, capital, datos de negocio). Textos de negocio.descripcion/como_gana_dinero/clientes para el integrador.',
  _notas_coordinador: 'BPA, DPA y acciones por ADS (8 ordinarias) en RMB; precio en USD por ADS. DPA de cada ejercicio = USD declarados × tipo de cierre del ejercicio (H.10 que usa la empresa). La caja del balance es efectivo + inversiones a corto (286.840 M en FY2026); la empresa cuenta además inversiones de tesorería a largo como líquidas (520.824 M en total a mar-26, 474.505 M a jun-26): decidir en el puente. Sin arrendamientos financieros: arrendamientos = 0. Participadas (Ant Group 33 % y otras) por debajo del BAI, fuera del EBITDA. Las series empiezan en FY2019: FY2017-18 del XBRL tienen BPA pre-split y faltaba la deuda a largo.',
  _bpa_no_gaap: bpa_no_gaap,
  negocio, financieros, trimestres, balance, flujos, calidad, rentabilidad, capital,
  fuentes,
  huecos,
};
writeFileSync(join(aqui, 'A.json'), JSON.stringify(salida, null, 2) + '\n', 'utf8');
console.log('A.json escrito', cuenta.map((c) => `${c.periodo}: EBITDA ${c.ebitda}, BPA ${c.bpa}, DPA ${c.dpa}, ADS ${c.acciones_diluidas}`).join('\n'));
console.log('LTM', JSON.stringify(ltm));
console.log('Deuda', B.deuda.join(', '), '| coste', balance.coste_deuda_pct);
