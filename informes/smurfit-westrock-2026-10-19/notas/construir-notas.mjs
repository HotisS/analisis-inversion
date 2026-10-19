// Notas A-E de Smurfit Westrock plc (NYSE: SW; ISIN IE00028FXN24). Corte 2026-10-19 (lunes, antes de la apertura de Nueva York:
// último cierre, 16-oct-2026). Cifras en millones de USD (US GAAP) salvo que se diga otra cosa. Fusión Smurfit Kappa + WestRock cerrada
// el 5-jul-2024: Smurfit Kappa es el adquirente contable, así que 2021-2023 son Smurfit Kappa sola (US GAAP, USD, folleto 424B3 de 2024)
// y 2024 lleva WestRock solo desde el 5-jul. Fuentes: EDGAR (10-K 2024 y 2025, 10-Q 1T26 y 2T26, 8-K de resultados, DEF 14A 2026),
// Yahoo Finance, MarketScreener, Stock Analysis, Tesoro de EE. UU., prensa sectorial.
// Ejecutar: node informes/smurfit-westrock-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/2005951';
const bolsa = lee('bolsa.json');
const comps = lee('comparables-yahoo.json');
const mov = lee('movimiento.json').SW;

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: estados consolidados 2025-2023, segmentos, deuda (nota 15), venta de cuentas a cobrar (nota 14), deterioros y cierres (nota 5), contingencias', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-27', url: `${E8}/000162828026012555/smur-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2024: estados 2024-2022, conciliación del EBITDA ajustado y del BPA ajustado 2022-2024, combinación con WestRock (nota 2)', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-03-07', url: `${E8}/000200595125000005/smur-20241231.htm` },
  { id: 3, titulo: 'Folleto de la combinación (424B3): estados de Smurfit Kappa en US GAAP y USD 2021-2023 (cuenta, flujos, balance 2022-2023)', editor: 'Smurfit WestRock Ltd (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-04-26', url: `${E8}/000110465924052947/tm243828-17_424b3.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26: balance a 30-jun-2026, deuda por emisiones, acciones (524.522.908 a 24-jul-2026), BPA diluido', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000162828026051195/smur-20260630.htm` },
  { id: 5, titulo: 'Form 10-Q del 1T26', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-05-01', url: `${E8}/000162828026029089/smur-20260331.htm` },
  { id: 6, titulo: 'Nota de resultados del 2T26 (8-K, anexo 99.1): cuenta, segmentos, balance, flujos y conciliación del EBITDA ajustado; guía del 3T y de 2026', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000110465926087794/tm2621489d1_ex99-1.htm` },
  { id: 7, titulo: 'Presentación de resultados del 2T26 (anexo 99.2): guía 2026 (amortización ~2.600 M, intereses ~700 M, impuesto ~29 %, inversión 2.400-2.500 M), puentes del EBITDA y volúmenes', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000110465926087794/tm2621489d1_ex99-2.htm` },
  { id: 8, titulo: 'Nota de resultados del 1T26 (8-K, anexo 99.1)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-04-30', url: `${E8}/000110465926052046/tm2613071d1_ex99-1.htm` },
  { id: 9, titulo: 'Nota de resultados del 4T25 y de 2025 (8-K, anexo 99.1): sinergias de más de 400 M, ~600.000 t cerradas, −3.000 empleos, guía 2026 de 5.000-5.300 M', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-02-11', url: `${E8}/000110465926012986/tm265780d1_ex99-1.htm` },
  { id: 10, titulo: 'Medium-Term Investor Update (8-K, anexo 99.2): objetivos 2026-2030 (EBITDA ajustado ~7.000 M en 2030, +300 pb de margen, ~14.000 M de caja libre discrecional, dividendos ~5.000 M, recompras desde 2027)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-02-11', url: `${E8}/000110465926012986/tm265780d1_ex99-2.htm` },
  { id: 11, titulo: 'Nota de resultados del 3T25 (recorte de la guía 2025 a 4.900-5.100 M)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2025-10-29', url: `${E8}/000110465925103425/tm2529644d1_ex99-1.htm` },
  { id: 12, titulo: 'Nota de resultados del 2T25 (guía 2025 de 5.000-5.200 M)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2025-07-30', url: `${E8}/000110465925071932/tm2521995d1_ex99-1.htm` },
  { id: 13, titulo: 'Nota de resultados del 4T24 y 2024 (EBITDA ajustado combinado de 4.706 M)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2025-02-12', url: `${E8}/000110465925011789/tm256218d1_ex99-1.htm` },
  { id: 14, titulo: 'Nota de resultados del 3T24', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2024-10-30', url: `${E8}/000110465924112399/tm2427058d1_ex99-1.htm` },
  { id: 15, titulo: 'Anuncio de cierres: molino de cartón reciclado de St. Paul (Minnesota), producción de Forney (Texas) y dos plantas en Alemania (más de 500.000 t)', editor: 'Smurfit Westrock plc (8-K)', tipo: 'Primaria', fecha: '2025-04-30', url: `${E8}/000110465925042628/tm2513671d1_ex99-1.htm` },
  { id: 16, titulo: 'Hechos XBRL de Smurfit Westrock (companyfacts): cuenta trimestral 2024-2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0002005951.json' },
  { id: 17, titulo: 'Transcripción de la conferencia del 2T26 (precios de +100 USD/t en EE. UU., +80 EUR/t en cartón reciclado europeo, flete +300 M, ratings)', editor: 'Webull / Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.webull.com/news/15364343857030144' },
];

// Cuenta: 2021 del folleto [3]; 2022-2023 del 10-K 2024 y del folleto [2, 3]; 2024-2025 del 10-K 2025 [1]. US GAAP, USD.
// no_recurrentes_en_ebitda = deterioros + reestructuración + costes de la combinación + amortización del mayor valor de las existencias
// + «otros ajustes» de la conciliación (EBITDA ajustado − pagos en acciones − EBITDA publicado).
const cuenta = [
  { periodo: '2021', ingresos: 11933, coste_ventas: 9255, gastos_generales: 1421, ebitda: 1811, amortizaciones: 554, ebit: 1257, resultado_financiero: -179, bai: 1078, impuestos: 276, minoritarios: 0, beneficio_neto: 802, gastos_financieros: 165, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 3.08, dpa: 1.41, dpa_extraordinario: 0, acciones_diluidas: 260.4 },
  { periodo: '2022', ingresos: 13509, coste_ventas: 10237, gastos_generales: 1529, ebitda: 2122, amortizaciones: 564, ebit: 1558, resultado_financiero: -132, bai: 1426, impuestos: 391, minoritarios: 1, beneficio_neto: 1034, gastos_financieros: 148, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 200, bpa: 3.96, dpa: 1.35, dpa_extraordinario: 0, acciones_diluidas: 261 },
  { periodo: '2023', ingresos: 12093, coste_ventas: 9039, gastos_generales: 1599, ebitda: 1952, amortizaciones: 580, ebit: 1372, resultado_financiero: -234, bai: 1138, impuestos: 312, minoritarios: 1, beneficio_neto: 825, gastos_financieros: 170, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 110, bpa: 3.17, dpa: 1.5, dpa_extraordinario: 0, acciones_diluidas: 260 },
  { periodo: '2024', ingresos: 21109, coste_ventas: 16914, gastos_generales: 2737, ebitda: 2471, amortizaciones: 1464, ebit: 1007, resultado_financiero: -447, bai: 560, impuestos: 241, minoritarios: 0, beneficio_neto: 319, gastos_financieros: 525, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 709, bpa: 0.82, dpa: 1.89, dpa_extraordinario: 0, acciones_diluidas: 389 },
  { periodo: '2025', ingresos: 31179, coste_ventas: 25136, gastos_generales: 3819, ebitda: 4269, amortizaciones: 2550, ebit: 1719, resultado_financiero: -760, bai: 959, impuestos: 260, minoritarios: 0, beneficio_neto: 699, gastos_financieros: 840, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 531, bpa: 1.33, dpa: 1.72, dpa_extraordinario: 0, acciones_diluidas: 526 },
];
// Balance: 2022-2023 del folleto [3] (Smurfit Kappa), 2024-2025 del 10-K 2025 [1]. US GAAP: los arrendamientos operativos NO van en la
// deuda (su gasto ya está en el EBITDA); los financieros sí están dentro de deuda_financiera (548 M a dic-25). arrendamientos = 0.
const balance = [
  { periodo: '2022', activo_total: 13342, activo_corriente: 4822, pasivo_corriente: 3253, pasivo_total: 7999, fondo_comercio: 2722, intangibles: 231, inmovilizado_material: 5002, existencias: 1354, clientes: 2036, proveedores: 1930, activos_contrato: null, pasivos_contrato: null, caja: 841, deuda_financiera: 3664, arrendamientos: 0, patrimonio_neto: 5328, minoritarios: 15, reservas: 3087 },
  { periodo: '2023', activo_total: 14051, activo_corriente: 4570, pasivo_corriente: 3006, pasivo_total: 7877, fondo_comercio: 2842, intangibles: 218, inmovilizado_material: 5791, existencias: 1203, clientes: 1806, proveedores: 1728, activos_contrato: null, pasivos_contrato: null, caja: 1000, deuda_financiera: 3747, arrendamientos: 0, patrimonio_neto: 6158, minoritarios: 16, reservas: 3521 },
  { periodo: '2024', activo_total: 43759, activo_corriente: 10055, pasivo_corriente: 7333, pasivo_total: 26372, fondo_comercio: 6822, intangibles: 1117, inmovilizado_material: 22675, existencias: 3550, clientes: 4117, proveedores: 3290, activos_contrato: null, pasivos_contrato: null, caja: 855, deuda_financiera: 13595, arrendamientos: 0, patrimonio_neto: 17360, minoritarios: 27, reservas: 2950 },
  { periodo: '2025', activo_total: 45157, activo_corriente: 10439, pasivo_corriente: 7064, pasivo_total: 26803, fondo_comercio: 7218, intangibles: 1059, inmovilizado_material: 23232, existencias: 3693, clientes: 4268, proveedores: 3597, activos_contrato: null, pasivos_contrato: null, caja: 892, deuda_financiera: 13773, arrendamientos: 0, patrimonio_neto: 18327, minoritarios: 27, reservas: 2655 },
];
const flujos = [
  { periodo: '2021', flujo_operativo: 1082, capex: 715, pagos_arrendamientos: 3, adquisiciones: 480, desinversiones: 58, dividendos: 365, recompras: 28, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2022', flujo_operativo: 1433, capex: 930, pagos_arrendamientos: 3, adquisiciones: 93, desinversiones: 13, dividendos: 350, recompras: 74, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 1559, capex: 929, pagos_arrendamientos: 3, adquisiciones: 29, desinversiones: 17, dividendos: 391, recompras: 30, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1483, capex: 1466, pagos_arrendamientos: 22, adquisiciones: 719, desinversiones: 61, dividendos: 650, recompras: 27, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 3392, capex: 2192, pagos_arrendamientos: 43, adquisiciones: 6, desinversiones: 12, dividendos: 900, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
];
// Segmentos (ventas agregadas antes de eliminaciones y EBITDA ajustado del segmento) [1, 2]; 2022-2023 = Smurfit Kappa reexpresada a la
// segmentación de 2024 [2]. «Eliminaciones y corporativo»: ventas entre segmentos (negativas) y costes centrales no asignados.
const segmentos = [
  { nombre: 'Norteamérica', descripcion: 'EE. UU., Canadá y México: cartón para cajas, cajas de cartón ondulado, cartoncillo (SBS, CUK, CRB), estuches y celulosa; casi todo de WestRock', tipo_resultado: 'EBITDA', historico: [
    { periodo: '2022', ingresos: 1720, resultado: 281 }, { periodo: '2023', ingresos: 1624, resultado: 281 }, { periodo: '2024', ingresos: 10092, resultado: 1610 }, { periodo: '2025', ingresos: 18577, resultado: 2998 }] },
  { nombre: 'Europa, MEA y APAC', descripcion: 'El negocio histórico de Smurfit Kappa: cartón para cajas virgen y reciclado, cajas, bolsa-en-caja, papel kraft y sacos', tipo_resultado: 'EBITDA', historico: [
    { periodo: '2022', ingresos: 10451, resultado: 1920 }, { periodo: '2023', ingresos: 9193, resultado: 1684 }, { periodo: '2024', ingresos: 9577, resultado: 1529 }, { periodo: '2025', ingresos: 10893, resultado: 1618 }] },
  { nombre: 'Latinoamérica', descripcion: 'Brasil, Colombia, Argentina, Chile, Perú, Ecuador y Centroamérica: cajas, papel, cartoncillo y bosques propios', tipo_resultado: 'EBITDA', historico: [
    { periodo: '2022', ingresos: 1397, resultado: 280 }, { periodo: '2023', ingresos: 1344, resultado: 274 }, { periodo: '2024', ingresos: 1711, resultado: 378 }, { periodo: '2025', ingresos: 2113, resultado: 485 }] },
  { nombre: 'Eliminaciones y corporativo', descripcion: 'Ventas entre segmentos y costes centrales no asignados', tipo_resultado: 'EBITDA', historico: [
    { periodo: '2022', ingresos: -59, resultado: -91 }, { periodo: '2023', ingresos: -68, resultado: -111 }, { periodo: '2024', ingresos: -271, resultado: -131 }, { periodo: '2025', ingresos: -404, resultado: -162 }] },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM jun-26 = 2025 − 1S25 + 1S26 [1, 6]. EBITDA publicado = EBIT 1.477 + amortizaciones 2.740; no recurrentes 358 (deterioros y
    // reestructuración 263, combinación 64, otros 31). FCF = flujo operativo 3.297 − capex 2.282 − arrendamientos financieros 47.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 31326, ebitda: 4217, ebit: 1477, beneficio_neto: 497, bpa: 0.94, dpa: 1.809, dpa_extraordinario: 0, fcf: 968, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 358 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'WestRock, consolidada desde el 5-jul-2024: entra entera en el balance de 2024 y solo medio año en la cuenta (2021-2023 son Smurfit Kappa sola, el adquirente contable)' },
    ],
    comentario: 'Las cifras publicadas mezclan perímetros: 2021-2023 son Smurfit Kappa sola (11.933-13.509 M USD de ventas), 2024 suma medio año de WestRock (21.109 M) y 2025 es el primer año completo (31.179 M) [1-3]. En base comparable el crecimiento es casi nulo: las ventas pro forma pasaron de 32.511 M en 2023 a 30.919 M en 2024 (−4,9 %) y a 31.179 M en 2025 (+0,8 %) [1]; sin la compra, 2025 subió 225 M por precio y mezcla (+487 M) y divisa (+452 M) contra un volumen que restó 716 M [1]. El EBITDA ajustado de la empresa fue de 4.706 M combinados en 2024 y 4.939 M en 2025 (+5,0 %), con un margen del 15,8 % [1, 13]. El margen EBIT publicado cayó del 11,5 % de 2022 al 5,5 % de 2025 por tres causas: más amortización (8,2 % de las ventas, por el mayor valor de los activos de WestRock), un negocio norteamericano con márgenes menores (16,1 % frente a 14,9 % en Europa sobre ventas agregadas) y 531 M de gastos no recurrentes en 2025 (deterioros y cierres por 385 M y costes de integración por 120 M) [1]. Los años 2022-2023 y 2024-2025 no son comparables en márgenes ni en rotación.',
    ajustes: 'Usamos las cifras publicadas (US GAAP) y llevamos a no_recurrentes_en_ebitda lo que la propia empresa excluye de su EBITDA ajustado salvo los pagos en acciones: 200 M en 2022 (deterioro de Rusia 159 M y de Perú 12 M, reestructuración 29 M), 110 M en 2023 (costes de la combinación 78 M y otros 32 M), 709 M en 2024 (combinación 395 M, mayor valor de las existencias de WestRock 224 M, deterioros y reestructuración 56 M, otros 34 M) y 531 M en 2025 [1, 2]. No todo es extraordinario: los cierres de capacidad se repiten cada año desde la fusión (St. Paul y Forney en 2025, un molino británico y 8 plantas en 2026), así que tratamos una parte como coste recurrente en el DCF [6, 15]. El EBITDA ajustado de la empresa suma además los pagos en acciones (139 M en 2025; 206 M en 2024), por eso supera al nuestro [1]. El BPA ajustado básico fue de 4,69 USD en 2022, 3,63 en 2023, 2,34 en 2024 y 2,05 en 2025, frente a 3,96, 3,17, 0,82 y 1,33 publicados (diluidos) [1, 2, 9]. El 1T26 llevó además una amortización acelerada por cierres de máquinas (0,14 USD por acción) [6].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 7671, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1265, margen_ebitda_pct: 16.5, bpa: -0.3, vs_consenso: null },
      { periodo: '4T24', ingresos: 7539, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1166, margen_ebitda_pct: 15.5, bpa: 0.28, vs_consenso: null },
      { periodo: '1T25', ingresos: 7656, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1252, margen_ebitda_pct: 16.4, bpa: 0.73, vs_consenso: null },
      { periodo: '2T25', ingresos: 7940, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1213, margen_ebitda_pct: 15.3, bpa: -0.05, vs_consenso: null },
      { periodo: '3T25', ingresos: 8003, crecimiento_pct: 4.3, crecimiento_organico_pct: null, ebitda: 1302, margen_ebitda_pct: 16.3, bpa: 0.47, vs_consenso: null },
      { periodo: '4T25', ingresos: 7580, crecimiento_pct: 0.5, crecimiento_organico_pct: null, ebitda: 1172, margen_ebitda_pct: 15.5, bpa: 0.19, vs_consenso: null },
      { periodo: '1T26', ingresos: 7712, crecimiento_pct: 0.7, crecimiento_organico_pct: null, ebitda: 1076, margen_ebitda_pct: 14.0, bpa: 0.12, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 8031, crecimiento_pct: 1.1, crecimiento_organico_pct: null, ebitda: 1140, margen_ebitda_pct: 14.2, bpa: 0.17, vs_consenso: 'En línea' },
    ],
    ultima_presentacion: 'El EBITDA de la tabla es el ajustado de la empresa (suma pagos en acciones y no recurrentes); el crecimiento de 3T24-2T25 no se da porque compara con trimestres sin WestRock [6, 9, 16]. En el 1T26 (30-abr) la dirección reafirmó 5.000-5.300 M de EBITDA ajustado para 2026 y anunció +50 USD/t en cajas en EE. UU.; el BPA ajustado (0,33 USD) quedó 0,07 por debajo del consenso [8]. En el 2T26 (29-jul) el EBITDA de 1.140 M cayó en el rango guiado (1.100-1.200 M), pero la guía anual bajó a 4.900-5.100 M por el flete (unos 300 M más caro que en 2025, frente a 50 M estimados en abril) y la energía (220-250 M) [6, 7, 17]. El discurso cambió de «entorno mejor» a «segundo semestre mejor y un 2027 muy bueno»: la dirección presentó la subida de 100 USD/t del cartón para cajas en Norteamérica (desde septiembre) y la de 80 EUR/t del cartón reciclado europeo como base de 2027, sin incluirlas en 2026 [17]. Los analistas preguntaron sobre todo por la realización de los precios, el volumen de cajas en Norteamérica (−4,8 % en el 2T) y si los precios altos atraerán capacidad nueva [7, 17]. La dirección evitó tres respuestas: el reparto regional del flete, la causa de la debilidad del volumen en junio y el plazo para volver a márgenes del 18 % en Europa [17].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 312 }, { anio: '2027', importe: 583 }, { anio: '2028', importe: 1101 }, { anio: '2029', importe: 2312 }, { anio: '2030', importe: 1150 }, { anio: '2031+', importe: 7861 }],
    liquidez: 'Caja de 677 M a 30-jun-2026 más 4.500 M de crédito sindicado sin disponer (vence en junio de 2031 tras la segunda prórroga) y líneas de titulización; 5.452 M de liquidez a dic-25 [1, 4]',
    rating: "Moody's Baa2 (perspectiva positiva), S&P BBB (estable), Fitch BBB+ (estable), según la dirección en la conferencia del 2T26 [17]",
    coste_deuda_pct: 5.3,
    vida_media_anios: null,
    otros_pasivos: 'Sin covenants financieros en el crédito sindicado [1]. Venta de cuentas a cobrar sin recurso (Rabobank, 700 M, y SMBC, 100 M): 659 M vendidos y dados de baja a dic-25, que no aparecen como deuda; su coste (38 M) va en otros gastos [1]. Además, programas de cobro anticipado de clientes (6 % de las cuentas a cobrar) y de financiación de proveedores [1]. Pensiones: pasivo de 672 M a jun-26 frente a un activo de pensiones de 677 M (neto casi nulo) [4]. Litigio fiscal en Brasil heredado de WestRock (790 M BRL, 144 M USD), sin provisión: la empresa dice no tener responsabilidad y ganó en primera instancia la parte 2003-2008 en febrero de 2025 [1]. Compromiso posterior al balance: compra del negocio de cartón ondulado de CMPC en Chile por 420 M, con cierre previsto en el 1S27 [D12].',
    comentario: 'La deuda bruta pasó de 3.747 M en 2023 a 13.595 M en 2024 al asumir la de WestRock (8.725 M) y emitir 2.750 M en bonos verdes para la parte en efectivo [1, 2]. A jun-26 la deuda es de 14.164 M (con 543 M de arrendamientos financieros y 601 M de pagarés) y la caja de 677 M: deuda neta de 13.487 M, unas 2,9 veces el EBITDA ajustado de los últimos 12 meses (4.690 M), lejos del objetivo de menos de 2,0 veces [4, 6, 10]. Si se suman los 659 M de cuentas a cobrar vendidas, la deuda neta económica es de 14.146 M. El circulante comercial (existencias + clientes − proveedores) es del 14,0 % de las ventas en 2025, por encima del 12,5 % de Smurfit Kappa en 2023, porque WestRock trabajaba con más existencias [1, 3]. El calendario es cómodo: solo 895 M vencen en 2026-2027 [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo saltó de 1.483 M en 2024 a 3.392 M en 2025 con el primer año entero de WestRock, y la inversión de 1.466 M a 2.192 M (7,0 % de las ventas) [1]. El FCF de 2025 (1.157 M tras arrendamientos) cubrió el dividendo (900 M) pero no dejó caja para reducir deuda: la deuda neta apenas se movió [1]. En el 1S26 el flujo operativo cayó a 969 M (1.064 M un año antes) por el aumento de las cuentas a cobrar (−666 M), y el FCF del semestre fue negativo (−147 M tras 1.089 M de inversión); el dividendo del semestre (474 M) se financió con pagarés (+446 M) [6]. La guía de inversión es de 2.400-2.500 M en 2026 y 2.400-2.800 M al año hasta 2030, de la que unos 4.000 M en cinco años son de crecimiento (unos 800 M al año) [7, 10]. Estimación propia: la inversión de mantenimiento es de unos 1.600-1.700 M al año, por debajo de la amortización contable (2.600 M), que está inflada por el mayor valor asignado a los activos de WestRock.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG (Dublín)',
    anios_auditor: null,
    opinion: 'Favorable',
    comentario: 'KPMG audita las cuentas de 2025 sin salvedades y también audita el control interno (primer año obligatorio de la sección 404 para la empresa) [1]. Los riesgos contables son de juicio, no de manipulación: la asignación del precio de WestRock (13.461 M) creó 4.000 M de fondo de comercio y revalorizó el inmovilizado, lo que eleva la amortización y deprime el BPA publicado [1, 2]; los deterioros y cierres se repiten cada año desde la fusión (56 M en 2024, 385 M en 2025, 173 M en el 1S26), así que el EBITDA ajustado sobrestima algo el beneficio recurrente [1, 6]; la venta de cuentas a cobrar (659 M) y los programas de financiación de proveedores mejoran el flujo operativo sin figurar como deuda [1]. Los pagos en acciones (139 M en 2025, el 20 % del beneficio neto) se suman al EBITDA ajustado [1]. Lectura de los indicadores del motor: el Altman Z y el Beneish M de 2024 no son interpretables por el cambio de perímetro (el balance triplica sin que la cuenta lo haga); el Piotroski de 2025 refleja la mejora del flujo de caja frente a 2024.',
    senales: [
      { senal: 'Gastos «no recurrentes» que se repiten', nivel: 'Media', comentario: 'Deterioros, cierres e integración en cada año desde 2024: 709 M, 531 M y 197 M en el 1S26 [1, 6]. Parte es coste estructural del ajuste de capacidad.' },
      { senal: 'Venta de cuentas a cobrar y financiación de proveedores', nivel: 'Media', comentario: '659 M de cuentas a cobrar vendidas fuera del balance a dic-25; las tratamos como deuda en el puente [1].' },
      { senal: 'Diferencia entre EBITDA ajustado y publicado', nivel: 'Baja', comentario: '4.939 M frente a 4.269 M en 2025: la empresa excluye también los pagos en acciones (139 M) [1].' },
      { senal: 'Litigio fiscal en Brasil sin provisión', nivel: 'Baja', comentario: '144 M USD en disputa, ganado en primera instancia en 2025 y recurrido por Hacienda [1].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,4523 USD por acción desde febrero de 2026 (+5 %; 1,81 USD al año, unos 950 M) con una política «progresiva» [9]. El plan a medio plazo (febrero de 2026) promete dividendos de unos 5.000 M en 2026-2030 y capacidad para recompras desde 2027, con una deuda neta objetivo de menos de 2,0 veces el EBITDA y una inversión de 2.400-2.800 M al año [10]. Las compras serán complementos regionales: en septiembre de 2026 acordó la del negocio chileno de CMPC por 420 M, a menos de 6 veces el EBITDA con sinergias [D12]. No hay recompras en curso [4].',
    adquisiciones: [
      { anio: '2024', objetivo: 'WestRock (EE. UU.): combinación por acciones más 5 USD por acción en efectivo', importe: 13461, ev_ebitda: null, financiacion: '258,2 M de acciones nuevas (12.098 M) y 1.291 M en efectivo con bonos verdes; asume 8.725 M de deuda neta de la caja de WestRock', resultado: 'Sinergias de más de 400 M en 2025 (objetivo cumplido) [A9]; el EBITDA combinado subió solo un 5 % en 2025 y la acción cotiza un 24 % por debajo del cierre de 2024; ROIC del grupo por debajo del coste de capital.' },
      { anio: '2022', objetivo: 'Cuatro compras pequeñas (Argentina, Reino Unido, Brasil, España)', importe: 107, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas sin deterioros [A2].' },
      { anio: '2021', objetivo: 'Verzuolo (Italia) y otras compras de Smurfit Kappa', importe: 480, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pago neto de 480 M en el año; sin deterioros posteriores [A3].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  negocio: {
    segmentos,
    geografias: [
      { nombre: 'EE. UU.', peso_pct: 46.4 }, { nombre: 'Otros de Europa, MEA y APAC', peso_pct: 23.0 }, { nombre: 'Otros de América', peso_pct: 10.8 },
      { nombre: 'México', peso_pct: 8.1 }, { nombre: 'Alemania', peso_pct: 6.0 }, { nombre: 'Francia', peso_pct: 5.0 }, { nombre: 'Irlanda', peso_pct: 0.7 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'EBITDA ajustado (combinado)', valor_anterior: '4.706 M (2024 combinado)', valor_actual: '4.939 M (2025); 4.690 M LTM jun-26', variacion: '+5,0 %', comentario: 'Guía 2026: 4.900-5.100 M (era 5.000-5.300 M) [6, 9, 13].' },
      { kpi: 'Ventas pro forma', valor_anterior: '30.919 M (2024)', valor_actual: '31.179 M (2025)', variacion: '+0,8 %', comentario: 'Precio y divisa compensan un volumen menor [1].' },
      { kpi: 'Sinergias de la combinación', valor_anterior: 'objetivo de 400 M', valor_actual: 'más de 400 M a fin de 2025', variacion: 'cumplido', comentario: 'Objetivo anunciado en 2023 [9].' },
      { kpi: 'Capacidad cerrada', valor_anterior: '—', valor_actual: '~600.000 t en 2025; un molino británico de más de 200.000 t y 8 plantas en 2026', variacion: '—', comentario: 'St. Paul, Forney, dos plantas alemanas [9, 15, 17].' },
      { kpi: 'Volumen de cajas (2T26, por días hábiles)', valor_anterior: '—', valor_actual: 'Norteamérica −4,8 %; Europa +1,5 %; Latinoamérica +1,0 %', variacion: '—', comentario: 'Norteamérica sigue perdiendo volumen por la salida de clientes poco rentables [7].' },
      { kpi: 'Plantas de cajas con pérdidas en Norteamérica', valor_anterior: '~80', valor_actual: '~20', variacion: '−75 %', comentario: 'La dirección espera arreglar unas 10 de las 20 restantes [17].' },
      { kpi: 'Plantilla', valor_anterior: '~100.000', valor_actual: '~97.000 (dic-25); −3.000 en 2025', variacion: '−3 %', comentario: '[1, 9]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'historico 2021', tipo: 'Complemento', intentos: '1) Folleto 424B3: solo balances de Smurfit Kappa en US GAAP a 2022 y 2023; 2) 10-K 2024 y 2025: balances de 2023-2025; 3) informe anual 2021 de Smurfit Kappa: en NIIF y EUR, no comparable', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) Nota 15 del 10-K 2025: solo vencimientos; 2) 10-Q del 2T26: tabla por emisión sin vida media; 3) cálculo con el calendario: el tramo 2031+ (7.861 M) no se desglosa por año', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) 10-K 2025: nombra a KPMG sin año de inicio; 2) DEF 14A 2026: ratificación sin antigüedad; 3) folleto de 2024: KPMG ya auditaba Smurfit Kappa, sin fecha de inicio', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'dpa 2021', tipo: 'Complemento', intentos: '1) Folleto 424B3: dividendos pagados (365 M) sin DPA en USD; 2) 10-K 2024: DPA solo desde 2022; 3) cálculo: 365 M ÷ 259 M de acciones = 1,41 USD', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Corrugated Board Packaging Market: tamaño 2026 y previsión 2031', editor: 'Mordor Intelligence', tipo: 'Sectorial', fecha: '2026', url: 'https://www.mordorintelligence.com/industry-reports/corrugated-board-packaging-market' },
  { id: 2, titulo: 'Medium-Term Investor Update: crecimiento de mercado de Numera 2026-2030 (1,6 % Norteamérica, 1,7 % Europa, 2,0 % Latinoamérica)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-02-11', url: `${E8}/000110465926012986/tm265780d1_ex99-2.htm` },
  { id: 3, titulo: 'Form 10-K 2025, Item 1 (negocio, huella industrial, competencia, regulación) e Item 1A (riesgos)', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-02-27', url: `${E8}/000162828026012555/smur-20251231.htm` },
  { id: 4, titulo: 'Fichas de Yahoo Finance de los competidores (ventas, EBIT y EBITDA de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/PKG/' },
  { id: 5, titulo: 'PCA agrees deal to acquire Greif Containerboard for $1.8 bln in third major containerboard M&A deal', editor: 'Fastmarkets', tipo: 'Prensa', fecha: '2025-07-01', url: 'https://www.fastmarkets.com/insights/pca-acquire-greif-containerboard/' },
  { id: 6, titulo: 'Transcripción de la conferencia del 2T26 (precios, oferta y demanda, capacidad)', editor: 'Webull / Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.webull.com/news/15364343857030144' },
  { id: 7, titulo: 'Presentación de resultados del 2T26 («las condiciones de oferta más ajustadas en años»)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000110465926087794/tm2621489d1_ex99-2.htm` },
  { id: 8, titulo: 'Folleto de la combinación (424B3): historia de Smurfit Kappa y WestRock', editor: 'Smurfit WestRock Ltd (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-04-26', url: `${E8}/000110465924052947/tm243828-17_424b3.htm` },
  { id: 9, titulo: 'International Paper DEFM14A (compra de DS Smith): valor de empresa de DS Smith (~7.800 M GBP) y rango de múltiplos de operaciones del sector (6,2-13,1 veces)', editor: 'International Paper (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-09-03', url: 'https://www.sec.gov/Archives/edgar/data/51434/000119312524217561/d820554ddefm14a.htm' },
];
const compe = comps.empresas.filter((e) => !['SW', 'GEF', 'BILL.ST', 'SON'].includes(e.ticker));
const B = {
  _estado: 'completa',
  sector: {
    definicion: 'El mercado relevante es el embalaje de cartón ondulado y los papeles para fabricarlo (cartón para cajas virgen y reciclado), con el cartoncillo para estuches como mercado vecino. Es un negocio regional: la caja viaja poco (radio de 200-300 km), así que la competencia se da en Norteamérica, Europa y Latinoamérica por separado. Usamos el tamaño mundial de Mordor Intelligence (205.740 M USD en 2026) como perímetro de la cuota [1] y, para el crecimiento de volumen, las previsiones de Numera que usa la propia empresa en su plan (1,6-2,0 % al año) [2]. Las dos cuentan historias compatibles: un mercado que crece algo más que el PIB real en volumen y en torno al 3,5-4 % en valor.',
    tamano: '≈ 205.740 M USD en 2026 (mundo, cartón ondulado) [1]',
    unidad_serie: 'millones de USD',
    serie: [
      { anio: '2026', tamano: 205740 }, { anio: '2027e', tamano: 213415 }, { anio: '2028e', tamano: 221376 }, { anio: '2029e', tamano: 229634 }, { anio: '2030e', tamano: 238200 }, { anio: '2031e', tamano: 247100 },
    ],
    tcac_historico_pct: null,
    tcac_previsto_pct: 3.7,
    cr5_pct: null,
    estructura: 'Fragmentada en el mundo; concentrada por región',
    drivers: [
      { driver: 'Comercio electrónico y sustitución del plástico', efecto: '+', horizonte: 'Estructural', evidencia: 'Mordor prevé +3,7 % anual en valor 2026-2031 [1]; la UE obliga a reducir envases de plástico de un solo uso (reglamento PPWR) [3].' },
      { driver: 'Consumo de bienes no duraderos y producción industrial', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Volumen de cajas en Norteamérica −4,8 % en el 2T26 y en Europa +1,5 % [7].' },
      { driver: 'Precio del cartón para cajas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Subidas en EE. UU. de 70 USD/t (marzo), 50 USD/t (junio) y 100 USD/t (septiembre de 2026); el plan de la empresa supone precios planos [2, 6].' },
      { driver: 'Coste de la fibra recuperada, la energía y el flete', efecto: '−', horizonte: 'Cíclico', evidencia: 'Flete +300 M y energía +220 M en 2026 frente a 2025 [7].' },
      { driver: 'Cierres de capacidad', efecto: '+', horizonte: 'Estructural', evidencia: 'Smurfit Westrock cerró ~600.000 t en 2025 y más de 200.000 t en el Reino Unido en 2026; la empresa habla de «las condiciones de oferta más ajustadas en años» [7].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco grupos (International Paper, Smurfit Westrock, PCA, Mondi y Stora Enso) dominan Norteamérica y Europa, pero los márgenes EBIT van del −11 % al 11 % y la sobrecapacidad obliga a parar máquinas [4, 7].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Ningún cliente supera el 10 % de las ventas [3], pero los grandes de consumo y distribución negocian contratos indexados al precio del papel con retraso de 1-6 meses [6].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Fibra recuperada, madera, energía y flete son materias primas con precio de mercado: el flete subió 300 M en un año [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Un molino nuevo cuesta más de 1.000 M USD y tarda años; la integración molino-planta de cajas es la barrera [3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'El plástico pierde por regulación; la caja reutilizable y la reducción de gramaje son las amenazas reales [3].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Tras dos años de volúmenes débiles (2023-2025) y paradas económicas, en 2026 los precios del cartón para cajas suben en EE. UU. y Europa y la empresa habla de molinos vendidos, aunque el volumen de cajas en Norteamérica sigue cayendo [6, 7]. En 2008-09 el sector perdió un 10-15 % de volumen y recuperó en dos años; en 2020 el comercio electrónico compensó la caída industrial; en 2022 los precios marcaron máximos y en 2023 cayeron con el desalmacenamiento de los clientes (ventas de Smurfit Kappa −10,5 %) [8].' },
    regulacion: 'En la UE, el Reglamento de envases y residuos de envases (PPWR, en vigor desde 2025 y aplicable desde agosto de 2026) fija contenidos reciclados y objetivos de reutilización que favorecen al papel frente al plástico, pero abre la puerta a envases reutilizables en comercio electrónico y bebidas [3]. El régimen europeo de comercio de emisiones encarece la energía de los molinos [3]. En EE. UU., los aranceles de 2025-2026 afectan a los flujos de bienes de consumo y a la exportación de cartón [3]. Riesgo fiscal propio: que el IRS trate a la empresa como sociedad estadounidense (sección 7874) [3].',
    tendencias: 'Tres tendencias: el paso del plástico al papel (favorable), la reducción de gramaje que exige el cliente (desfavorable para el volumen en toneladas) y la integración vertical de los compradores de cartón (International Paper con DS Smith, PCA con el negocio de Greif) que concentra el mercado [5, 9]. Smurfit Westrock gana con la escala europea y latinoamericana y con un modelo de «agnosticismo de sustrato» en estuches, pero en Norteamérica aún pierde volumen al salir de clientes con margen bajo [6, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15.2,
    posicion: '1.º o 2.º del mundo en embalaje de papel por ventas (31.179 M USD en 2025, por delante de International Paper con 24.203 M) [3, 4]; n.º 1 en cartón ondulado en Europa y Latinoamérica y n.º 2 en Norteamérica tras International Paper [3]. Cuota calculada sobre el mercado mundial de Mordor (estimación propia: 31.326 M ÷ 205.740 M).',
    competidores: compe.map((e) => ({
      nombre: e.nombre, pais: e.pais, ticker: e.ticker, ingresos: e._ventas_ltm, cuota_pct: Math.round((e._ventas_ltm / 205740) * 1000) / 10,
      margen_ebit_pct: Math.round((e._ebit_ltm / e._ventas_ltm) * 1000) / 10,
      comentario: {
        IP: 'N.º 1 en Norteamérica; compró DS Smith en enero de 2025. EBIT negativo en 12 meses por deterioros y cierres [4, 9].',
        PKG: 'El más rentable de EE. UU.: cartón para cajas y cajas integrados; compró el negocio de Greif en 2025 [4, 5].',
        GPK: 'Cartoncillo y estuches; compite con el negocio de consumo de Norteamérica [4].',
        'MNDI.L': 'Europa y Sudáfrica: papel kraft, cajas y bolsas; EBIT negativo por deterioros [4].',
        'STERV.HE': 'Europa: cartón para envases y cajas; vende parte de sus bosques [4].',
        'KLBN11.SA': 'N.º 1 de Brasil: cartón y cajas con bosque propio; margen del 18 % [4].',
      }[e.ticker] ?? null,
    })),
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de embalaje.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Diseño de cajas, ingeniería y servicio próximo; pero los clientes licitan y la caja es casi un producto básico [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Innovación en diseño (más de 200 clientes en su evento de abril de 2026) sin precio superior demostrado [6].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Molinos integrados con fibra propia y bosques en Latinoamérica (308.000 acres) [3]; margen EBITDA de Latinoamérica del 22-23 % [A6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '57 molinos y 450 plantas en 40 países; la caja no viaja, así que la densidad regional protege frente a entrantes [3].' },
      ],
    },
    amenazas: 'El foso es de escala y densidad regional, no de precio: el ROIC del grupo (≈5 %) no supera su coste de capital ni antes de la fusión con márgenes de Smurfit Kappa (≈11 % en 2022) [A1-A3]. Lo erosionarían una oleada de capacidad nueva en Norteamérica si los precios altos de 2026 se mantienen (probabilidad media; la pregunta de Jefferies en el 2T26 apunta ahí) [6], la reducción de gramaje y los envases reutilizables del PPWR (probabilidad baja-media a cinco años) y la competencia de PCA, que gana cuota con márgenes muy superiores (EBIT del 10,9 % frente al 5,0 %) [4].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Smurfit Westrock nace el 5-jul-2024 de la combinación de Smurfit Kappa (Dublín) y WestRock (Atlanta). Smurfit Kappa venía de Jefferson Smurfit, fundada en Dublín en 1934 por la familia Smurfit, que se fusionó en 2005 con Kappa Packaging, salió a bolsa en 2007 y se convirtió en el líder europeo de cajas de cartón con un brazo latinoamericano [B8]. WestRock venía de la fusión de MeadWestvaco y RockTenn en 2015 y de la compra de KapStone en 2018 [B8]. La operación se pagó con una acción nueva más 5 USD por cada acción de WestRock; los accionistas de Smurfit Kappa quedaron con el 50,3 % y Tony Smurfit, hijo del antiguo presidente, dirige el grupo [A2]. Cotiza en Nueva York y dejó Londres el 22-jun-2026 [D10].',
    hitos: [
      { anio: '1934', hito: 'Jefferson Smurfit funda en Dublín la empresa familiar de cajas [B8].' },
      { anio: '2005', hito: 'Fusión de Jefferson Smurfit con Kappa Packaging: nace Smurfit Kappa [B8].' },
      { anio: '2007', hito: 'Salida a bolsa de Smurfit Kappa en Londres y Dublín [B8].' },
      { anio: '2015', hito: 'MeadWestvaco y RockTenn se fusionan y forman WestRock; Tony Smurfit, primer ejecutivo de Smurfit Kappa [B8].' },
      { anio: '2018', hito: 'WestRock compra KapStone; Smurfit Kappa rechaza la oferta de International Paper [B8].' },
      { anio: '2022', hito: 'Smurfit Kappa sale de Rusia (deterioro de 159 M) [A2].' },
      { anio: '2024', hito: 'Combinación con WestRock (5 de julio); cotización principal en Nueva York [A2].' },
      { anio: '2025', hito: 'Sinergias de más de 400 M; cierre de unas 600.000 t de capacidad [A9].' },
      { anio: '2026', hito: 'Plan a medio plazo (EBITDA de ~7.000 M en 2030); salida de la bolsa de Londres (22-jun); compra del negocio chileno de CMPC por 420 M [A10, D10, D12].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Tres asuntos mueven las cifras. El coste de la energía y del CO₂ en los molinos: la energía subirá unos 220 M en 2026 y Europa está sometida al comercio de emisiones [A7, B3]. La financiación verde: la mayor parte de los bonos (bonos verdes de 2030 a 2054) está ligada a proyectos de descarbonización, lo que abarata el coste [A4]. Y la seguridad laboral en 450 plantas y 57 molinos con 97.000 empleados [A1]. El paso del plástico al papel por regulación (PPWR) es la oportunidad comercial [B3].',
    controversias: 'Inspección del regulador del estado de Washington en un molino en julio de 2026 (titular de Seeking Alpha; sin sanción conocida) [D11]. Multa de la autoridad italiana de la competencia de 2019 (124 M EUR) pagada en 2021, con un reembolso parcial de 18 M en 2024 [A2, A3]. Sin otras sanciones relevantes encontradas en los 10-K.',
    confianza: 'Baja',
  },
  negocio: {
    descripcion: 'Smurfit Westrock fabrica papel y embalaje de papel: cartón para cajas (virgen y reciclado), cajas de cartón ondulado, cartoncillo y estuches, bolsa-en-caja, sacos y papel kraft. Opera 57 molinos, 450 plantas de transformación y 70 centros de fibra recuperada en 40 países, con 97.000 empleados [B3, A1]. El 61 % de las ventas está en Norteamérica (cajas, cartoncillo SBS y CUK, estuches, celulosa), el 34 % en Europa, Oriente Medio, África y Asia-Pacífico y el 7 % en Latinoamérica (ventas agregadas de 2025) [A1]. Vende a fabricantes de alimentación, bebidas, productos de consumo, comercio electrónico e industria; ningún cliente supera el 10 % [B3]. El modelo es integrado: los molinos abastecen sobre todo a sus propias plantas de cajas y el excedente se vende a terceros [B3].',
    como_gana_dinero: 'Gana con el diferencial entre el precio del cartón y las cajas y el coste de la fibra (madera o papel recuperado), la energía, el flete y la mano de obra. Casi nada es contractual a largo plazo: los precios de las cajas siguen a los del papel con 1-6 meses de retraso [B6]. Es un negocio de costes fijos altos (molinos que deben funcionar llenos): una parada económica o un punto de volumen mueve mucho el margen, y por eso la empresa cierra capacidad ineficiente [A9]. En 2025 el precio y la mezcla sumaron 487 M a las ventas y el volumen restó 716 M [A1]. El margen EBITDA ajustado va del 22 % de Latinoamérica al 14-15 % de Norteamérica y Europa [A6]. La estacionalidad es baja; el segundo semestre suele ser algo más fuerte.',
    clientes: 'Base muy repartida: ningún cliente supera el 10 % de las ventas y la empresa evita la concentración por mercado [B3]. Los contratos son de 1-3 años con fórmulas de precio indexadas a los índices del papel (en EE. UU., las publicaciones de Fastmarkets RISI), con un retraso de 1-6 meses en trasladar costes [B6]. El poder de precios es cíclico, no estructural: en 2025 el precio sumó un 1,6 % a las ventas mientras el volumen restaba un 2,3 % [A1], y en el 2T26 el precio aún restaba 60 M frente al año anterior antes de que llegaran las subidas de 2026 [A7]. En Norteamérica la empresa está saliendo de clientes poco rentables: ha reducido de 80 a 20 las plantas de cajas con pérdidas, a costa de volumen [B6].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y tcac_historico_pct', tipo: 'Complemento', intentos: '1) Mordor Intelligence: solo «fragmentado» y previsión 2026-2031; 2) 10-K 2025, competencia: sin cuotas; 3) Grand View, IMARC y Fortune Business Insights: páginas sin cifras o no disponibles', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K 2025: sin calificaciones; 2) DEF 14A 2026: menciona evaluación de sostenibilidad sin notas; 3) búsqueda de MSCI y Sustainalytics: sin página abierta con la nota', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, independencia, remuneración 2025, participaciones significativas', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2026-03-11', url: `${E8}/000110465926026094/sw-20260501xdef14a.htm` },
  { id: 2, titulo: 'Resultado de la junta general del 1-may-2026 (8-K, Item 5.07)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-05-01', url: `${E8}/000110465926053535/tm2613273d1_8k.htm` },
  { id: 3, titulo: 'Resultado de la junta general de 2025 (8-K, Item 5.07)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2025-05-02', url: `${E8}/000110465925043849/tm2513844d1_8k.htm` },
  { id: 4, titulo: 'Form 4 de consejeros y directivos (19-oct-2025 a 19-oct-2026): 114 presentaciones, ventas en mercado de 3,36 M USD', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0002005951&type=4' },
  { id: 5, titulo: 'Notas de resultados 2024-2026 (guías anuales de EBITDA ajustado y su cumplimiento)', editor: 'Smurfit Westrock plc', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000110465926087794/tm2621489d1_ex99-1.htm` },
  { id: 6, titulo: 'Schedule 13G/A de Capital Research y otros (lista de presentaciones de EDGAR)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-12', url: 'https://data.sec.gov/submissions/CIK0002005951.json' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Anthony (Tony) Smurfit', cargo: 'Presidente ejecutivo del grupo (President & Group CEO)', desde: '2024', participacion_pct: 0.31, trayectoria: 'Consejero de Smurfit Kappa y predecesoras desde 1989 y primer ejecutivo de Smurfit Kappa en 2015-2024 [1]. Bajo su mando Smurfit Kappa mantuvo márgenes EBITDA del 16-18 % y rechazó la oferta de International Paper de 2018; en Smurfit Westrock ha cumplido las sinergias (más de 400 M) pero ha recortado la guía dos años seguidos [5].' },
      { nombre: 'Ken Bowles', cargo: 'Director financiero (EVP & Group CFO)', desde: '2016', participacion_pct: 0.03, trayectoria: 'En el grupo desde 1994; director financiero de Smurfit Kappa desde 2016 y de Smurfit Westrock desde 2024 [1].' },
      { nombre: 'Irial Finan', cargo: 'Presidente independiente del consejo', desde: '2024', participacion_pct: 0.01, trayectoria: 'Presidente de Smurfit Kappa en 2019-2024; antes, vicepresidente ejecutivo de Coca-Cola y presidente de su grupo embotellador (2004-2017) [1].' },
      { nombre: 'Laurent Sellier', cargo: 'Presidente y primer ejecutivo de Norteamérica', desde: '2024', participacion_pct: 0.02, trayectoria: 'Directivo de Smurfit Kappa en Europa y Latinoamérica; dirige la región que más pesa y peor rinde (margen del 14,8 % en el 2T26) [1, A6].' },
      { nombre: 'Saverio Mayer', cargo: 'Primer ejecutivo de Europa, MEA y APAC', desde: '2024', participacion_pct: 0.04, trayectoria: 'Directivo de Smurfit Kappa en Europa; región con mejor comportamiento relativo según la empresa [1, A6].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'EBITDA ajustado combinado de ~4.700 M (tras la fusión)', real: '4.706 M combinados', cumplida: 'Sí' },
      { anio: '2025', guia: '5.000-5.200 M (jul-25); recortada a 4.900-5.100 M (oct-25)', real: '4.939 M', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Sinergias de 400 M a fin de 2025', real: 'Más de 400 M', cumplida: 'Sí' },
      { anio: '2026', guia: '5.000-5.300 M (feb-26, reafirmada en abril); recortada a 4.900-5.100 M (jul-26)', real: '2.216 M en el 1S26; 3T guiado en ~1.300 M', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y heredado casi entero de Smurfit Kappa: el primer ejecutivo, el director financiero, el presidente y los jefes regionales llevan más de una década en el grupo [1]. La credibilidad sufre por dos recortes de guía seguidos (octubre de 2025 y julio de 2026), atribuidos a la demanda y al flete; las sinergias sí se cumplieron [5]. Tony Smurfit tiene 62 años y no hay sucesor público; el consejo dice hacer planificación de la sucesión [1]. La remuneración del primer ejecutivo (16,4 M USD en 2025) es alta para el sector [1].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Irial Finan', cargo: 'Presidente', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos (presidente), Ejecutiva (presidente)' },
      { nombre: 'Anthony Smurfit', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: 'Ejecutiva' },
      { nombre: 'Ken Bowles', cargo: 'Consejero, director financiero', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Kaisa Hietala', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2024', comisiones: 'Sostenibilidad (presidenta), Nombramientos' },
      { nombre: 'Colleen F. Arnold', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Sostenibilidad' },
      { nombre: 'Timothy J. Bernlohr', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones (presidente), Finanzas, Ejecutiva' },
      { nombre: 'Carole L. Brown', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidenta entrante), Sostenibilidad' },
      { nombre: 'Carol Fairweather', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Finanzas (presidenta), Auditoría, Ejecutiva' },
      { nombre: 'Mary Lynn Ferguson-McHugh', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Finanzas' },
      { nombre: 'Suzan F. Harrison', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Nombramientos' },
      { nombre: 'Jørgen Buhl Rasmussen', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Finanzas' },
      { nombre: 'Alan D. Wilson', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.82, voto_remuneracion_contra_pct: 6.18, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.43, fijo: 1.78, variable_corto: 3.0, variable_largo: 11.65, ratio_salario_medio: 271 },
    remuneracion: 'El variable anual de 2025 (objetivo del 175 % del salario; pagó 3,0 M USD, por encima del objetivo) se mide en un 80 % con métricas financieras (EBITDA ajustado, caja libre y sinergias) y en un 20 % con seguridad y objetivos estratégicos [1]. El variable a largo plazo son PSU a tres años ligadas al TSR relativo (40 %), al BPA ajustado acumulado (30 %) y al ROCE medio (30 %), más RSU que se consolidan por tercios solo por permanencia [1]. El ROCE es una buena métrica para un negocio de capital intensivo, pero el BPA ajustado excluye los cierres recurrentes. La retribución total del primer ejecutivo bajó de 21,3 M en 2024 (año de la fusión) a 16,4 M en 2025, 271 veces el empleado medio; la «retribución realmente pagada» fue negativa (−0,7 M) por la caída de la acción [1]. Voto consultivo: 95,32 % a favor en 2025 y 93,82 % en 2026 [2, 3].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.73, tipo: 'Institucional', variacion: '13G/A a 30-sep-2025 [1]' },
      { nombre: 'BlackRock', pct: 7.93, tipo: 'Institucional', variacion: '13G a 30-sep-2024 [1]' },
      { nombre: 'Capital Research Global Investors', pct: 6.89, tipo: 'Institucional', variacion: '13G/A a 31-dic-2025; nuevo 13G/A en agosto de 2026 [1, 6]' },
      { nombre: 'Consejeros y directivos (18 personas)', pct: 0.46, tipo: 'Insiders', variacion: '2,40 M de acciones a 25-feb-2026; Tony Smurfit 1,60 M [1]' },
      { nombre: 'Autocartera', pct: 0.13, tipo: 'Autocartera', variacion: '706.129 acciones a 30-jun-2026 [A4]' },
    ],
    insiders: [
      { fecha: '2026-02-18', persona: 'Laurent Sellier (Norteamérica)', operacion: 'Venta', acciones: 15562, importe: 0.78 },
      { fecha: '2026-02-19', persona: 'Ken Bowles (director financiero)', operacion: 'Venta', acciones: 10000, importe: 0.51 },
      { fecha: '2026-02-19', persona: 'Anthony Smurfit (primer ejecutivo)', operacion: 'Venta', acciones: 40000, importe: 2.06 },
    ],
    control_y_defensas: 'No hay accionista de control: los tres primeros son gestoras indexadas o institucionales (26,5 % entre las tres) y la familia Smurfit tiene menos del 0,5 % [1]. Una acción, un voto; consejo de 12 con 10 independientes, presidente independiente separado del primer ejecutivo y consejera coordinadora [1]. Todos los consejeros se eligen cada año [1]. Como sociedad irlandesa, el consejo necesita autorización de la junta para emitir acciones sin derecho de suscripción preferente: en 2026 obtuvo solo un 83,8 % a favor, el voto más bajo de la junta [2]. No hay operaciones vinculadas relevantes; la política exige aprobación de la comisión de auditoría por encima de 120.000 USD [1].',
    alertas: [
      'Dos recortes de la guía anual en nueve meses (oct-25 y jul-26) [5].',
      'Ventas de acciones de los tres primeros directivos en febrero de 2026 (3,36 M USD, sin plan 10b5-1), tras la consolidación de acciones del plan; ninguna compra en mercado en 12 meses [4].',
      'Retribución del primer ejecutivo de 16,4 M USD, 271 veces el empleado medio, con TSR negativo desde la fusión [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SW, SPY y XLB (precio, rango, volumen, rentabilidades, beta, cierres de ejercicio) con herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/SW/history/' },
  { id: 2, titulo: 'Smurfit Westrock: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, DPA)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/SMURFIT-WESTROCK-PLC-40311477/finances/' },
  { id: 3, titulo: 'Smurfit Westrock: consenso (17 analistas, objetivo medio 56,47 USD, máximo 69, mínimo 46; RBC baja a 55 el 16-oct, Jefferies sube a 62 el 13-oct)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/SMURFIT-WESTROCK-PLC-40311477/consensus/' },
  { id: 4, titulo: 'SW forecast: 17 analistas (12 compra fuerte, 5 compra), objetivos y estimaciones de S&P Global', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://stockanalysis.com/stocks/sw/forecast/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026: 10 años al 5,09 % el 16-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): prima implícita del S&P 500 de octubre de 2026, 4,20 %', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Fichas y consenso de Yahoo Finance de los comparables (IP, PKG, GPK, SON, GEF, MNDI.L, STERV.HE, KLBN11.SA, BILL.ST)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/IP/' },
  { id: 8, titulo: 'Movimiento del precio (herramientas/movimiento.mjs y movimiento-precio.mjs): 1-12 meses, máximos, medias, caídas de −5 %', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/SW/' },
  { id: 9, titulo: 'Packaging Corporation of America Announces Agreement to Purchase Greif Containerboard Business (8-K, anexo 99.1): 1.800 M USD, 8,5 veces el EBITDA de 12 meses (212 M)', editor: 'Packaging Corporation of America (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-07-01', url: 'https://www.sec.gov/Archives/edgar/data/75677/000119312525153436/d864746dex991.htm' },
  { id: 10, titulo: 'Smurfit Westrock Announces Intention to Delist from the LSE (y completion el 22-jun-2026)', editor: 'Business Wire / Smurfit Westrock', tipo: 'Primaria', fecha: '2026-05-20', url: 'https://www.businesswire.com/news/home/20260520081627/en/Smurfit-Westrock-Announces-Intention-to-Delist-from-the-LSE/' },
  { id: 11, titulo: 'Noticias de SW (RSS): compra en Chile, inspección en Washington, guía del 2T26, salida de Londres', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-27', url: 'https://seekingalpha.com/symbol/SW/news' },
  { id: 12, titulo: 'Smurfit Westrock to acquire CMPC Chile containerboard business (420 M USD, menos de 6 veces el EBITDA con sinergias; cierre previsto en el 1S27)', editor: 'Packaging Gateway', tipo: 'Prensa', fecha: '2026-09-24', url: 'https://www.packaging-gateway.com/news/smurfit-westrock-acquire-cmpc-chile/' },
  { id: 13, titulo: 'Mondi to acquire Western Europe Packaging Assets of Schumacher Packaging (valor de empresa 634 M EUR; EBITDA ajustado 2023 de 66 M)', editor: 'Mondi plc', tipo: 'Primaria', fecha: '2024-10-09', url: 'https://www.mondigroup.com/news-and-insight/2024/mondi-to-acquire-western-europe-packaging-assets-of-schumacher-packaging/' },
  { id: 14, titulo: 'International Paper DEFM14A: valor de empresa de DS Smith (~7.800 M GBP) en la oferta', editor: 'International Paper (SEC EDGAR)', tipo: 'Primaria', fecha: '2024-09-03', url: 'https://www.sec.gov/Archives/edgar/data/51434/000119312524217561/d820554ddefm14a.htm' },
  { id: 15, titulo: 'Smurfit Westrock fell 8% this week (semana del 21-may-2026: recortes de objetivos y salida de Londres)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-05-21', url: 'https://www.tikr.com/blog/smurfit-westrock-fell-8-this-week-heres-what-investors-can-expect-in-2026' },
  { id: 16, titulo: 'Form 10-K 2024, nota 2: contraprestación por WestRock (13.461 M) y deuda y caja asumidas', editor: 'Smurfit Westrock plc (SEC EDGAR)', tipo: 'Primaria', fecha: '2025-03-07', url: `${E8}/000200595125000005/smur-20241231.htm` },
];
const bo = bolsa.bolsa;
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const compD = comps.empresas.filter((e) => e.ticker !== 'SW').map((e) => {
  const x = { nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: null, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct };
  if (e.ticker === 'IP') { x.ev_ebitda_ltm = null; x.dn_ebitda = null; x.margen_ebitda_pct = null; } // EBITDA de 12 meses roto por deterioros (82 M)
  if (e.ticker === 'GEF') x.crecimiento_pct = null; // venta del negocio de cartón a PCA: el NTM sobre LTM mezcla perímetros
  return x;
});
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Smurfit Westrock plc', nombre_corto: 'Smurfit Westrock', ticker: 'SW', isin: 'IE00028FXN24', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Irlanda', pais_iso: 'IE', sector: 'Materiales', industria: 'Envases y embalajes de papel', sede: 'Dublín (Irlanda); Norteamérica en Atlanta', fundacion: '1934', empleados: 97000, web: 'https://www.smurfitwestrock.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 526.5, capitalizacion_publicada: 21589, free_float_pct: 99.5,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Para 2026, EBITDA ajustado de 4.900-5.100 M USD (recortado el 29-jul desde 5.000-5.300 M) y unos 1.300 M en el 3T; inversión de 2.400-2.500 M, amortización de ~2.600 M, intereses en caja de ~700 M y tipo impositivo de ~29 % [A6, A7]. Plan a medio plazo (11-feb-2026): EBITDA ajustado de ~7.000 M en 2030 (+7 % anual en 2026-2030), +300 pb de margen, ~14.000 M de caja libre discrecional acumulada (sin 4.000 M de inversión de crecimiento), dividendos de ~5.000 M, recompras desde 2027 y deuda neta de menos de 2,0 veces el EBITDA; supone mercado al 1,6-2,0 % y precios del papel planos en Norteamérica [A10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 32144, ebitda: 4932, ebit: 2128, bpa: 1.72, dpa: 1.83, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 34361, ebitda: 6007, ebit: 3284, bpa: 3.53, dpa: 1.9, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 35037, ebitda: 6291, ebit: 3540, bpa: 4.08, dpa: 1.98, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 17, comprar: 17, mantener: 0, vender: 0, po_medio: 56.47, po_min: 46, po_max: 69 },
    revisiones: 'Los 17 analistas recomiendan comprar (12 «compra fuerte» y 5 «compra») y lo hacían también hace tres meses [4]. El BPA ajustado de 2026 de S&P Global es de 2,05 USD (−1,6 % sobre 2025) y el de 2027 de 3,53 USD (+72 %) [4]; MarketScreener da 1,72 USD para 2026 con una base distinta (más cerca del publicado) y la misma cifra de 2027 [2]. Tras el recorte de la guía de julio, varios bancos bajaron objetivos (RBC a 55 USD el 16-oct) y otros los subieron por las subidas de precio del papel (Jefferies a 62 USD el 13-oct) [3]. Solo una fuente gratuita da estimaciones completas a tres años (MarketScreener); el objetivo y las recomendaciones se contrastan con Stock Analysis.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.45,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bo.tipo_rentabilidad,
    rentabilidades: bo.rentabilidades,
    anual: bo.anual.filter((a) => Number(a.anio) >= 2017),
    beta: bo.beta, volatilidad_pct: bo.volatilidad_pct, max_drawdown_pct: bo.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La serie de Yahoo antes de julio de 2024 es la de Smurfit Kappa en USD. En diez años la acción rindió un 10,2 % anual con dividendos, frente al 15,4 % del S&P 500 y el 10,2 % del sector de materiales (XLB) [1]. El último año fue malo en términos relativos: +2,4 % frente a +16,1 % del índice, con una caída del 12,2 % el 29-oct-2025 por el recorte de la guía de 2025 y otra del 5,0 % el 29-jul-2026 por el de 2026 [1, 8]. 2025 terminó con −26,2 % (el índice +17,7 %) [1]. La beta mensual de cinco años es de 0,91 (semanal de dos años 0,80) y la volatilidad anual del 43,9 %, alta para un fabricante de embalaje por las sacudidas de los resultados [1]. La acción se mueve con International Paper: las dos cayeron en mayo y subieron un 24-25 % en el mes hasta el 18-jun-2026 por las subidas del cartón [8].',
    contexto: {
      movimiento: { fecha: mov.fecha, var_1m_pct: mov.var_1m_pct, var_3m_pct: mov.var_3m_pct, var_6m_pct: mov.var_6m_pct, var_12m_pct: mov.var_12m_pct, dist_max_52s_pct: mov.dist_max_52s_pct, dist_min_52s_pct: mov.dist_min_52s_pct, dist_max_historico_pct: mov.dist_max_historico_pct, tendencia: mov.tendencia, volatilidad_60d_pct: mov.volatilidad_60d_pct, avisos: mov.avisos },
      movimientos_fuertes: [
        { periodo: '29-oct-2025', var_pct: -12.2, causa: 'Recorte de la guía de EBITDA de 2025 a 4.900-5.100 M y más paradas en el 4T [A11]; recortes de objetivos de Wells Fargo y Truist [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-mar 2026', var_pct: -5.9, causa: 'Días de −5,0 % (23-feb) y −5,9 % (12-mar) tras el plan a medio plazo y con el sector a la baja; sin hecho propio publicado [8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mes hasta el 19-may-2026', var_pct: -16.6, causa: 'BPA del 1T26 por debajo del consenso (30-abr), recortes de objetivos (Morgan Stanley a 57 USD, RBC a 53) y anuncio de la salida de Londres (20-may); International Paper cayó un 20,4 % en el mismo mes [8, 10, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mes hasta el 18-jun-2026', var_pct: 24.1, causa: 'Rebote del sector por las subidas del cartón para cajas (50 USD/t en junio en EE. UU., 60 EUR/t en Europa); IP +25,3 % [8, A17].', veredicto: 'no cambia', condicion: null },
        { periodo: '8-jul y 29-jul-2026', var_pct: -6.5, causa: '−6,5 % el 8-jul (sector) y −5,0 % el 29-jul por el recorte de la guía de 2026 a 4.900-5.100 M por el flete [A6, 8].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-16', tipo: 'recomendación', hecho: 'RBC baja el objetivo a 55 USD (desde 60); Jefferies lo sube a 62 (13-oct). Los 17 analistas siguen en comprar [3, 4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-23', tipo: 'fusión u oferta', hecho: 'Compra del negocio de cartón ondulado de CMPC en Chile por 420 M USD (menos de 6 veces el EBITDA con sinergias), pagada con caja; cierre en el 1S27 si lo aprueba la FNE chilena [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'resultados', hecho: 'Guía de 2026 recortada a 4.900-5.100 M; subida de 100 USD/t del cartón para cajas en Norteamérica desde septiembre, no incluida en la guía [A6, A17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-06', tipo: 'demanda o regulador', hecho: 'Inspección del regulador del estado de Washington en un molino; sin sanción conocida [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-22', tipo: 'accionista de referencia', hecho: 'Exclusión de la bolsa de Londres completada: cotiza solo en Nueva York; posibles ventas de fondos británicos ya pasadas [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-19', tipo: 'directivos', hecho: 'Ventas de Tony Smurfit (40.000 acciones, 2,06 M USD), Ken Bowles (0,51 M) y Laurent Sellier (0,78 M) tras consolidar acciones del plan; el primer ejecutivo conserva 1,6 M de acciones [C4, C1].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26 (fecha estimada por el calendario de 2025, 29-oct; la empresa aún no la ha confirmado): guía de ~1.300 M de EBITDA ajustado [A6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-28',
      veredicto: 'no cambia',
      condicion: null,
      comentario: `La acción cotiza a ${String(mov.precio).replace('.', ',')} USD, un 20,6 % bajo el máximo de 52 semanas y un 5,2 % bajo la media de 200 sesiones, en tendencia lateral, con una caída del 9,5 % en el último mes sin noticia propia (RBC recortó el objetivo el 16-oct) [3, 8]. Los movimientos fuertes de 12 meses tienen causa conocida: dos recortes de guía y el ciclo de precios del cartón que mueve igual a International Paper [8]. No hay colocaciones, ampliaciones ni ofertas pendientes; la compra chilena es pequeña (2 % de la capitalización) y se paga con caja [12]. Los resultados del 3T26 (hacia el 28-oct) no aplazan la decisión (regla 11). Veredicto: no cambia.`,
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: cierres['2021'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: cierres['2022'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: cierres['2023'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: cierres['2024'], ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2025', precio_cierre: cierres['2025'], ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Fabricantes cotizados de papel para embalaje y cajas de Norteamérica, Europa y Latinoamérica, las tres regiones de la empresa: International Paper y PCA (cartón y cajas en EE. UU.), Graphic Packaging (cartoncillo y estuches, como el negocio de consumo), Sonoco y Greif (embalaje industrial), Mondi, Stora Enso y Billerud (Europa) y Klabin (Brasil). Todas con datos de Yahoo a la misma fecha (cierre del 16-oct), convertidas a USD. No se incluyen DS Smith ni WestRock (ya integradas) ni Oji o Nine Dragons (Asia, mercados distintos).',
    empresas: compD,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-07', objetivo: 'WestRock (EE. UU.)', comprador: 'Smurfit Kappa (Smurfit Westrock)', ev: 21583, ev_ventas: 1.06, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contraprestación 13.461 M + deuda asumida 8.725 M − caja 603 M [16]; ventas de WestRock en 2023 de ~20.400 M (pro forma 32.511 − 12.093 de Smurfit Kappa) [A1]. Estimación propia del múltiplo de ventas.' },
      { fecha: '2025-01', objetivo: 'DS Smith (Reino Unido)', comprador: 'International Paper', ev: 9863, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de empresa de ~7.800 M GBP en la oferta (×1,2645 USD/GBP) [14]; pago en acciones de IP. BofA situó el múltiplo de mercado de DS Smith en 7,5 veces el EBITDA ajustado de 2024 [14].' },
      { fecha: '2025-07', objetivo: 'Negocio de cartón para cajas de Greif (EE. UU.)', comprador: 'Packaging Corporation of America', ev: 1800, ev_ventas: 1.5, ev_ebitda: 8.5, prima_pct: null, excluir: false, comentario: '1.800 M en efectivo; 8,5 veces el EBITDA de 12 meses (212 M) y 6,6 veces con 60 M de sinergias; ventas de ~1.200 M [9].' },
      { fecha: '2024-10', objetivo: 'Activos de Schumacher Packaging en Europa occidental', comprador: 'Mondi', ev: 694, ev_ventas: null, ev_ebitda: 9.6, prima_pct: null, excluir: false, comentario: 'Valor de empresa de 634 M EUR (×1,095) sobre 66 M EUR de EBITDA ajustado de 2023: 9,6 veces; 7,2 veces con 22 M de sinergias (cálculo propio) [13].' },
      { fecha: '2026-09', objetivo: 'Negocio de cartón ondulado de CMPC en Chile', comprador: 'Smurfit Westrock', ev: 420, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Menos de 6 veces el EBITDA ajustado con sinergias según la compradora; un molino de 250.000 t y tres plantas [12].' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Yahoo (ficha): sin dato de cortos en la herramienta; 2) Stock Analysis: sin cifra en la página de previsiones; 3) FINRA: dato quincenal no descargado', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/EBITDA de WestRock y DS Smith', tipo: 'Complemento', intentos: '1) 10-K 2024 de Smurfit Westrock: contraprestación sin EBITDA de WestRock; 2) DEFM14A de International Paper: solo rango 6,2-13,1 veces de las operaciones del sector; 3) prensa: múltiplos con sinergias o mezclados', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'proximos_resultados', tipo: 'Complemento', intentos: '1) EDGAR: sin 8-K de convocatoria del 3T26; 2) Business Wire: el aviso de 2025 fue el 8-oct para el 29-oct; 3) búsqueda en prensa: sin fecha', decision: 'Calculado y marcado como estimación' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $SW (unos 30 mensajes de abr-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://api.stocktwits.com/api/2/streams/symbol/SW.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos de opinión de abr-sep 2026 (titulares y tesis del canal de SW)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-24', url: 'https://seekingalpha.com/api/sa/combined/SW.xml' },
  { id: 3, titulo: 'TIKR: Smurfit Westrock fell 8% this week (lectura de mayo de 2026)', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-05-21', url: 'https://www.tikr.com/blog/smurfit-westrock-fell-8-this-week-heres-what-investors-can-expect-in-2026' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($SW)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes de corto plazo: opciones de compra a enero de 2027, el sector «subiendo» con las subidas de precio del cartón de PCA e IP, Morgan Stanley nombrando a SW su favorita del sector tras el 2T26; poca discusión de fondo [1].' },
      { plataforma: 'Seeking Alpha (artículos de opinión)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'Cuatro piezas alcistas («el recorte de guía oculta un 2027 más fuerte», «inflexión de demanda y poder de precios», «mi favorita a largo plazo», «atractiva aunque se endeuda con otra compra») y una bajista («sobrevalorada por encima de 40 USD») [2].' },
      { plataforma: 'TIKR (blog con comentarios)', fecha: '2026-05', n_comentarios: 1, tono: 'Negativo', resumen: 'La caída de mayo se atribuye a que los márgenes no se recuperan aunque la demanda mejore y a que la salida de Londres no es un catalizador [3].' },
    ],
    temas: [
      { tema: 'Las subidas del cartón harán de 2027 un año muy bueno', postura: 'Alcista', peso: 'Alto', contraste: 'Las subidas existen (100 USD/t en EE. UU. desde septiembre) pero el consenso ya pone un EBITDA de 6.007 M en 2027 (+22 %); nuestro caso base es más prudente [A17, D2].' },
      { tema: 'Recortes de guía y credibilidad de la dirección', postura: 'Bajista', peso: 'Medio', contraste: 'Dos recortes en nueve meses; el 2T26 cumplió el rango trimestral [C5].' },
      { tema: 'Deuda y nuevas compras', postura: 'Dividida', peso: 'Medio', contraste: 'Deuda neta de 2,9 veces el EBITDA ajustado; la compra chilena (420 M) es pequeña y se paga con caja [A4, D12].' },
      { tema: 'Valoración: barata por EV/EBITDA o cara por beneficio', postura: 'Dividida', peso: 'Medio', contraste: 'EV/EBITDA de ~7-8 veces, en línea con el sector, pero PER publicado alto por la amortización y los cierres [D7].' },
    ],
    lectura: 'Poco debate de particulares para una empresa de 21.000 M: el tono se reparte entre quienes esperan un 2027 fuerte por los precios del papel y quienes ven una empresa endeudada que recorta la guía. Coincide con los analistas (17 de 17 en comprar) en el optimismo sobre 2027, y no hay euforia ni capitulación. Lo que el informe añade es la distancia entre ese optimismo y el rendimiento del capital: el sentimiento no habla del ROIC por debajo del coste de capital. No cambia la decisión.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas.');
