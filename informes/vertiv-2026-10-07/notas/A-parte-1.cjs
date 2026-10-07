const E = "https://www.sec.gov/Archives/edgar/data/1674101/";
const fuentes = [
  { id: 1, titulo: "Vertiv Holdings Co, Form 10-K ejercicio 2025", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-02-13", url: E + "000167410126000008/vrt-20251231.htm" },
  { id: 2, titulo: "Vertiv Holdings Co, Form 10-K ejercicio 2022", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2023-02-27", url: E + "000162828023005248/vrt-20221231.htm" },
  { id: 3, titulo: "Vertiv Holdings Co, Form 10-K/A ejercicio 2020 (reexpresión por warrants)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2021-04-30", url: E + "000162828021008318/vrt-20201231.htm" },
  { id: 4, titulo: "Vertiv Holdings Co, Form 10-Q 2T26", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-07-29", url: E + "000162828026050609/vrt-20260630.htm" },
  { id: 5, titulo: "Nota de resultados 2T26 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-07-29", url: E + "000162828026050323/q22026exhibit991vrt07292026.htm" },
  { id: 6, titulo: "Nota de resultados 1T26 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-04-22", url: E + "000162828026026379/q12026exhibit991vrt04222026.htm" },
  { id: 7, titulo: "Nota de resultados 4T25 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-02-11", url: E + "000167410126000006/exhibit991vrt02112026.htm" },
  { id: 8, titulo: "Nota de resultados 3T25 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-10-22", url: E + "000167410125000020/q32025exhibit991vrt10222025.htm" },
  { id: 9, titulo: "Nota de resultados 2T25 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-07-30", url: E + "000167410125000006/q22025exhibit991vrt7302025.htm" },
  { id: 10, titulo: "Nota de resultados 1T25 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-04-23", url: E + "000162828025018915/q12025exhibit991vrt042325.htm" },
  { id: 11, titulo: "Nota de resultados 4T24 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-02-12", url: E + "000162828025005006/exhibit991vrt02122025.htm" },
  { id: 12, titulo: "Nota de resultados 3T24 (8-K, Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2024-10-23", url: E + "000162828024043343/q32024exhibit991vrt102324.htm" },
  { id: 13, titulo: "8-K 3-mar-2026: bonos senior no garantizados de 2.100 M USD, nueva línea revolving de 2.500 M USD y amortización del préstamo a plazo", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-03-03", url: E + "000119312526088484/d105148d8k.htm" },
  { id: 14, titulo: "8-K 2-sep-2026 y nota de prensa: acuerdo para comprar UtilityInnovation Group (UIG)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-09-02", url: E + "000119312526379306/d472406dex991.htm" },
  { id: 15, titulo: "Nota de prensa: acuerdo para comprar King Environmental Services (KES)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2026-09-24", url: E + "000162828026063311/exhibit991vrt-q320269242026.htm" },
  { id: 16, titulo: "SEC XBRL companyfacts, Vertiv Holdings Co (CIK 1674101)", editor: "SEC", tipo: "Primaria", fecha: "2026-10-07", url: "https://data.sec.gov/api/xbrl/companyfacts/CIK0001674101.json" },
  { id: 17, titulo: "Nota de prensa: acuerdo para comprar E&I Engineering y Powerbar Gulf (8-K Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2021-09-08", url: E + "000119312521267213/d213876dex991.htm" },
  { id: 18, titulo: "Nota de prensa: acuerdo para comprar PurgeRite (8-K Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-11-03", url: E + "000119312525261623/d10924dex991.htm" },
  { id: 19, titulo: "Nota de prensa: acuerdo para comprar Great Lakes Data Racks & Cabinets (8-K Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2025-07-17", url: E + "000162828025035130/exhibit991vrt-pressrelease.htm" },
  { id: 20, titulo: "Nota de prensa: programa de recompra de 3.000 M USD (8-K Ex. 99.1)", editor: "Vertiv / SEC EDGAR", tipo: "Primaria", fecha: "2023-11-29", url: E + "000095014223002855/eh230424978_ex9901.htm" }
];

const cuenta = [
  { periodo: "2020", ingresos: 4370.6, coste_ventas: 2896.9, gastos_generales: 1008.4, ebitda: 416.6, amortizaciones: 203.1, ebit: 213.5, resultado_financiero: -468.1, bai: -254.6, impuestos: 72.7, minoritarios: 0, beneficio_neto: -327.3, gastos_financieros: 150.4, participadas_en_ebitda: null, bpa: -1.07, dpa: 0.01, dpa_extraordinario: 0, acciones_diluidas: 307.1 },
  { periodo: "2021", ingresos: 4998.1, coste_ventas: 3475.4, gastos_generales: 1109.0, ebitda: 486.9, amortizaciones: 227.0, ebit: 259.9, resultado_financiero: -93.7, bai: 166.2, impuestos: 46.6, minoritarios: 0, beneficio_neto: 119.6, gastos_financieros: 90.6, participadas_en_ebitda: null, bpa: 0.33, dpa: 0.01, dpa_extraordinario: 0, acciones_diluidas: 360.1 },
  { periodo: "2022", ingresos: 5691.5, coste_ventas: 4075.4, gastos_generales: 1178.3, ebitda: 525.8, amortizaciones: 302.4, ebit: 223.4, resultado_financiero: -56.4, bai: 167.0, impuestos: 90.4, minoritarios: 0, beneficio_neto: 76.6, gastos_financieros: 147.3, participadas_en_ebitda: null, bpa: -0.04, dpa: 0.01, dpa_extraordinario: 0, acciones_diluidas: 378.2 },
  { periodo: "2023", ingresos: 6863.2, coste_ventas: 4462.7, gastos_generales: 1312.3, ebitda: 1143.2, amortizaciones: 271.0, ebit: 872.2, resultado_financiero: -338.5, bai: 533.7, impuestos: 73.5, minoritarios: 0, beneficio_neto: 460.2, gastos_financieros: 180.1, participadas_en_ebitda: null, bpa: 1.19, dpa: 0.025, dpa_extraordinario: 0, acciones_diluidas: 386.2 },
  { periodo: "2024", ingresos: 8011.8, coste_ventas: 5077.6, gastos_generales: 1374.0, ebitda: 1644.4, amortizaciones: 277.0, ebit: 1367.4, resultado_financiero: -602.0, bai: 765.4, impuestos: 269.6, minoritarios: 0, beneficio_neto: 495.8, gastos_financieros: 150.4, participadas_en_ebitda: null, bpa: 1.28, dpa: 0.1125, dpa_extraordinario: 0, acciones_diluidas: 386.3 },
  { periodo: "2025", ingresos: 10229.9, coste_ventas: 6514.7, gastos_generales: 1617.8, ebitda: 2138.3, amortizaciones: 308.6, ebit: 1829.7, resultado_financiero: -87.8, bai: 1741.9, impuestos: 409.1, minoritarios: 0, beneficio_neto: 1332.8, gastos_financieros: 86.1, participadas_en_ebitda: null, bpa: 3.41, dpa: 0.175, dpa_extraordinario: 0, acciones_diluidas: 390.7 }
];

const financieros = {
  cuenta,
  ltm: { periodo: "LTM jun-26", fecha_fin: "2026-06-30", ingresos: 11479.6, ebitda: 2561.8, ebit: 2174.6, beneficio_neto: 1732.0, bpa: 3.42, dpa: 0.225, dpa_extraordinario: 0, fcf: 2924.0 },
  cambios_perimetro: [
    { periodo: "2021", descripcion: "E&I Engineering y Powerbar Gulf, consolidadas desde el 1-nov-21 (1.770 M USD netos de caja; unos 460 M USD de ventas en 2021e): dos meses en la cuenta de 2021 y entera en el balance." },
    { periodo: "2025", descripcion: "PurgeRite, consolidada desde el 4-dic-25 (1.138 M USD netos de caja), y Great Lakes desde el 20-ago-25 (203,5 M USD): el balance de 2025 las incluye enteras y la cuenta solo semanas o meses." }
  ],
  comentario: "Las ventas pasan de 4.371 M USD en 2020 a 10.230 M USD en 2025 (TCAC del 18,5 %), con aceleración desde 2023 por la demanda de centros de datos para IA [1, 2]. El crecimiento orgánico fue del 17,5 % en 2024 y del 26,3 % en 2025 [7, 11]; lo comprado pesa poco salvo en 2021-2022 (E&I) y en 2026 (PurgeRite, Great Lakes y tres compras pequeñas: 5 de los 24 puntos de crecimiento del 2T26) [5]. El margen EBIT reportado sube del 4,9 % en 2020 y el 3,9 % en 2022 al 17,9 % en 2025 y el 19,5 % en el 2T26 [1, 5]. 2022 fue el año malo: inflación de materiales y fletes con pedidos a precio cerrado dejaron el margen bruto en el 28,4 %; desde entonces precio, productividad y volumen lo llevan al 36,3 % en 2025 [1, 2]. 2025 y 2026 absorben aranceles con contramedidas (cambio de origen, precio) y aun así el margen operativo ajustado sube 410 pb interanuales en el 2T26, hasta el 22,6 % [5]. El resultado neto de 2020-2024 no es comparable por el valor razonable de los warrants (-143,7 M USD en 2020, -61,9 M en 2021, +90,9 M en 2022, -157,9 M en 2023 y -449,2 M en 2024), por la pérdida de 174 M USD por cancelación de deuda en 2020 y por la ganancia de 59,2 M del acuerdo de crédito fiscal (TRA) en 2021 [1, 2].",
  ajustes: "Vertiv publica beneficio operativo ajustado y BPA diluido ajustado que excluyen la amortización de intangibles (181,3 M USD en 2023, 184,2 M en 2024, 200,4 M en 2025 y 151,3 M en el 1S26: un 2,0-2,6 % de las ventas), los costes de reestructuración de programas globales (49,5 M en 2025), la variación del valor razonable de contraprestaciones contingentes (4,9 M en 2025 y 62,0 M en el 1S26, todo de PurgeRite), los costes de fusiones y adquisiciones, el valor razonable de los warrants hasta 2024 y partidas fiscales no recurrentes (-115 M en 2023, +39,5 M en el 1S25) [5, 7, 11]. La amortización se suma al BPA ajustado **sin efecto fiscal**. Resultado: BPA ajustado de 1,77 USD en 2023, 2,85 en 2024 y 4,20 en 2025 frente a 1,19, 1,28 y 3,41 reportados; beneficio operativo ajustado de 1.053,5, 1.551,6 y 2.089,7 M USD frente a 872,2, 1.367,4 y 1.829,7 M [7, 11]. La guía de 2026 es de 6,65-6,75 USD ajustado frente a 5,82-5,92 USD GAAP; la diferencia es sobre todo amortización (306,8 M USD, 0,78 USD por acción) [5]. El EBITDA de esta serie es EBIT reportado más depreciación y amortización del estado de flujos (incluida la de software) y lleva dentro el gasto de alquiler operativo (83,7 M USD en 2025), porque Vertiv aplica US GAAP (ASC 842) [1]. gastos_financieros es el gasto por intereses neto que publica Vertiv (no da el bruto); los intereses pagados fueron 176,7, 155,5 y 126,7 M USD en 2023-2025 [1]. El DPA es el pagado en el año: 0,01 USD anual hasta 2022 y trimestrales de 0,025 USD desde dic-23, 0,0375 desde dic-24 y 0,0625 desde dic-25 [1].",
  confianza: "Alta"
};

const T = (periodo, ingresos, c, co, ebitda, m, bpa) => ({ periodo, ingresos, crecimiento_pct: c, crecimiento_organico_pct: co, ebitda, margen_ebitda_pct: m, bpa, vs_consenso: null });
const trimestres = {
  items: [
    T("3T24", 2073.5, 19.0, 19.2, 440.5, 21.2, 0.46), T("4T24", 2346.4, 25.8, 27.1, 528.2, 22.5, 0.38),
    T("1T25", 2036.0, 24.2, 25.3, 362.3, 17.8, 0.42), T("2T25", 2638.1, 35.1, 34.0, 515.7, 19.5, 0.83),
    T("3T25", 2675.8, 29.0, 28.4, 592.1, 22.1, 1.02), T("4T25", 2880.0, 22.7, 19.3, 668.2, 23.2, 1.14),
    T("1T26", 2649.5, 30.1, 22.6, 547.8, 20.7, 0.99), T("2T26", 3274.3, 24.1, 17.8, 753.7, 23.0, 1.27)
  ],
  ultima_presentacion: null,
  confianza: "Alta"
};

const campos = ["activo_total", "activo_corriente", "pasivo_corriente", "pasivo_total", "fondo_comercio", "intangibles", "inmovilizado_material", "existencias", "clientes", "proveedores", "pasivos_contrato", "caja", "deuda_financiera", "arrendamientos", "patrimonio_neto", "reservas"];
const B = (periodo, a) => { const o = { periodo }; campos.forEach((x, i) => (o[x] = a[i])); o.activos_contrato = null; o.minoritarios = 0; return o; };
const balance = {
  historico: [
    B("2020", [5073.8, 2518.8, 1741.6, 4561.7, 607.2, 1302.5, 427.6, 446.6, 1354.4, 730.5, 199.6, 534.6, 2152.5, 149.6, 512.1, -1331.2]),
    B("2021", [6939.6, 2698.6, 1854.8, 5521.9, 1330.1, 2138.2, 489.3, 616.3, 1536.4, 858.5, 238.9, 439.1, 2972.3, 155.7, 1417.7, -1215.4]),
    B("2022", [7095.7, 3158.7, 1897.9, 5653.8, 1284.7, 1816.1, 489.4, 822.0, 1888.8, 984.0, 358.7, 260.6, 3190.9, 175.6, 1441.9, -1142.6]),
    B("2023", [7998.5, 4001.5, 2305.4, 5983.6, 1330.3, 1672.9, 560.1, 884.3, 2118.1, 986.4, 638.9, 780.4, 2940.9, 183.9, 2014.9, -691.9]),
    B("2024", [9132.5, 5101.8, 3097.0, 6698.2, 1321.1, 1487.1, 625.1, 1244.4, 2362.7, 1316.4, 1063.3, 1227.6, 2928.2, 212.4, 2434.3, -238.3]),
    B("2025", [12212.4, 6819.5, 4407.0, 8271.1, 2033.7, 1894.8, 921.8, 1456.5, 3109.0, 1756.4, 1814.7, 1827.9, 2913.0, 314.5, 3941.3, 1027.9])
  ],
  vencimientos: [
    { anio: "2026", importe: 0 }, { anio: "2027-2036 (pagarés menores)", importe: 17.2 }, { anio: "2028", importe: 850.0 },
    { anio: "2036", importe: 600.0 }, { anio: "2046", importe: 500.0 }, { anio: "2056+", importe: 1000.0 }
  ],
  liquidez: "A 30-jun-26: caja 2.810,6 M USD + inversiones a corto 300,0 M + línea revolving no dispuesta 2.483,6 M (2.500 M menos 16,4 M de avales); Vertiv habla de 5.600 M USD de liquidez y de caja neta [4, 5]. Deuda bruta nominal 2.967,2 M USD (2.939,8 M contables) frente a 3.110,6 M de caja e inversiones a corto: caja neta de unos 143 M USD con la deuda nominal (171 M con la contable) sin arrendamientos, y deuda neta de unos 255 M con los 398,4 M de pasivos por arrendamiento operativo (82,0 M corrientes + 316,4 M a largo) [4, 5]. En el calendario, la deuda es la de jun-26 (tras la refinanciación); el de dic-25 era 20,9 M anuales de 2026 a 2030 más 850 M en 2028 y el resto del préstamo en 2032 [1, 4].",
  rating: "Moody's Baa3 y S&P BBB- (primer grado de inversión, febrero de 2026) [6]; perspectiva no localizada en los documentos leídos.",
  coste_deuda_pct: 5.1,
  vida_media_anios: 17.8,
  otros_pasivos: "El préstamo a plazo de 2.076 M USD (SOFR + 1,75 %, vencimiento 2032) y la línea ABL de 800 M se cancelaron el 3-mar-26 con 2.100 M USD de bonos senior no garantizados (600 M al 4,850 % a 2036, 500 M al 5,650 % a 2046, 500 M al 5,800 % a 2056 y 500 M al 5,950 % a 2066) más caja; hubo una pérdida por cancelación de 6,2 M USD y una ganancia de 22,9 M al liquidar las coberturas de tipos [4, 5, 13]. Siguen los 850 M USD de bonos senior garantizados al 4,125 % con vencimiento en nov-28 [4]. La nueva línea revolving de 2.500 M USD (5 años, ampliable en 1.000 M) tiene un único covenant financiero, deuda neta / EBITDA ≤ 4,0x (4,5x tras una compra relevante), que se cumple con holgura [4]. Pagos aplazados de compras: 206,1 M USD de earn-out de PurgeRite en balance a jun-26 (máximo 250 M) y hasta 35 M de otra compra del 2T26 [4]; UIG añadirá hasta 1.150 M USD más [14]. Ingresos diferidos (anticipos) de 3.633,7 M USD corrientes y 122,6 M a largo a jun-26 [4]. El TRA con el antiguo dueño se liquidó con 100 M USD en 2022 [2]. Litigios: demanda colectiva de valores de 2022 (periodo feb-21 a feb-22), con las reclamaciones de la Securities Act desestimadas en ene-24 y el resto pendiente; la SEC cerró su investigación sin recomendar acciones el 30-dic-25 [1]. Aduanas de México: 10,1 M USD pagados en 2024 [1].",
  comentario: "La deuda bruta se queda en 2.900-3.200 M USD desde 2021 mientras el EBITDA pasa de 487 M a 2.138 M USD en 2025: el apalancamiento cae por crecimiento y caja, no por amortización. Vertiv declaraba 1,4x de deuda neta sobre EBITDA ajustado en el 3T24, ~1,0x en el 4T24, ~0,2x en el 1T26 y caja neta en el 2T26 [5, 6, 11, 12]. El circulante es la palanca: los anticipos de clientes (ingresos diferidos) pasan de 200 M USD en 2020 a 1.815 M en 2025 y 3.634 M en jun-26, y financian el salto de existencias (de 1.457 M a 2.523 M USD en seis meses) y de clientes [1, 4, 5]. Con la refinanciación de mar-26 desaparecen las garantías reales y las restricciones típicas de deuda de capital riesgo, y el plazo medio se alarga a unos 18 años (estimación propia: nominales ponderados por plazo a jun-26) [4, 13]. El cupón medio es del 5,1 % (estimación propia: cupones ponderados por nominal) [4]. La compra de UIG (unos 1.450 M USD en caja al cierre, previsto en el 4T26) se comerá buena parte de la caja neta [14].",
  confianza: "Alta"
};

const flujos = {
  historico: [
    { periodo: "2020", flujo_operativo: 208.9, capex: 52.7, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 7.0, dividendos: 3.3, recompras: 0, emision_acciones: 1647.4, intereses_en_financiacion: 0 },
    { periodo: "2021", flujo_operativo: 210.9, capex: 84.6, pagos_arrendamientos: 0, adquisiciones: 1163.7, desinversiones: 31.5, dividendos: 3.8, recompras: 0, emision_acciones: 111.6, intereses_en_financiacion: 0 },
    { periodo: "2022", flujo_operativo: -152.8, capex: 111.0, pagos_arrendamientos: 0, adquisiciones: 5.0, desinversiones: 3.9, dividendos: 3.8, recompras: 0, emision_acciones: 3.1, intereses_en_financiacion: 0 },
    { periodo: "2023", flujo_operativo: 900.5, capex: 134.6, pagos_arrendamientos: 0, adquisiciones: 28.8, desinversiones: 24.3, dividendos: 9.5, recompras: 0, emision_acciones: 27.4, intereses_en_financiacion: 0 },
    { periodo: "2024", flujo_operativo: 1319.3, capex: 184.1, pagos_arrendamientos: 0, adquisiciones: 17.6, desinversiones: 0, dividendos: 42.2, recompras: 599.9, emision_acciones: 33.0, intereses_en_financiacion: 0 },
    { periodo: "2025", flujo_operativo: 2113.8, capex: 226.4, pagos_arrendamientos: 0, adquisiciones: 1184.8, desinversiones: 0, dividendos: 66.6, recompras: 0, emision_acciones: 26.4, intereses_en_financiacion: 0 }
  ],
  comentario: "La conversión depende del circulante. 2022 fue negativo (-152,8 M USD de flujo operativo) porque existencias y clientes consumieron 449 M en plena crisis de suministro; ese año se pagaron además 100 M USD del TRA en financiación [2]. Desde 2023 los anticipos de clientes le dan la vuelta: el flujo libre ajustado (operativo menos capex y software) fue de 766, 1.135 y 1.887 M USD en 2023-2025, el 166 %, 229 % y 142 % del beneficio neto [1]. El 1S26 suma 1.578 M USD, con 1.823 M de aumento de ingresos diferidos [5]. El capex (incluye software capitalizado) pasa del 1,2 % de las ventas en 2020 al 2,2 % en 2025 y el 4,9 % en el 1S26 (288,5 M USD); la guía de 2026 es de un 4,0 % de las ventas, el máximo del rango, para ampliar capacidad [1, 5]. Desde 2021 Vertiv ha más que duplicado su capacidad de cuadros eléctricos, busbar y potencia integrada, abrió en 2024 una planta térmica con laboratorio en Pune (India) y una nave de 215.000 pies cuadrados en Pelzer (Carolina del Sur) [1]. Vertiv no separa mantenimiento y crecimiento; la depreciación (97,1 M USD en 2025) da una referencia del de mantenimiento (estimación propia). Bajo US GAAP los arrendamientos operativos se pagan dentro del flujo operativo (83,4 M USD en 2025, 66,4 M en 2024, 62,7 M en 2023, 57,9 M en 2022, 55,6 M en 2021 y 53,3 M en 2020), por eso pagos_arrendamientos es 0 y el EBITDA ya descuenta ese gasto [1, 16]. En 2020, emisión neta = 1.832,5 M USD de la recapitalización con la SPAC + 156,5 M de warrants - 341,6 M pagados al accionista Platinum Equity; las desinversiones incluyen ventas de inmovilizado y de negocios [2].",
  confianza: "Alta"
};

module.exports = { financieros, trimestres, balance, flujos, fuentes };
