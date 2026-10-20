// Escribe las notas A-E de Swisscom (corte 2026-10-20) a partir de los documentos de notas/docs (informes anuales 2021-2025,
// informes trimestrales 2025-2026, consenso que publica la empresa), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary
// del 20-oct-2026, 08:49 UTC) y de movimiento.txt. Cada nota cita solo con [n] de su propia lista de fuentes.
// BASE DE LAS CUENTAS: EBITDAaL (EBITDA después del gasto de arrendamientos), la métrica de la empresa, de su guía y del
// consenso. ebitda = EBITDAaL; ebit = EBIT NIIF − intereses de arrendamientos; resultado_financiero = resultado financiero NIIF
// + intereses de arrendamientos + resultado de participadas; arrendamientos fuera de la deuda; pagos de arrendamientos restados
// del flujo libre. El BAI, los impuestos y el beneficio neto son los publicados.
// Ejecutar: node informes/swisscom-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const SC = 'https://www.swisscom.ch/content/dam/assets/about/investoren/berichte/documents';
const IA = (a) => `https://reports.swisscom.ch/download/${a}/en/swisscom_geschaeftsbericht_gesamt_${a}_en.pdf`;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas NIIF, segmentos, deuda, fondo de comercio, Vodafone Italia, remuneración)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-02-12', url: IA(2025) },
  { id: 2, titulo: 'Annual Report 2024 (compra de Vodafone Italia al cierre de 2024, cuentas de 2024)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2025-02-13', url: IA(2024) },
  { id: 3, titulo: 'Annual Reports 2021, 2022 y 2023 (cuentas, objetivos y su cumplimiento)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2024-02-08', url: IA(2023) },
  { id: 4, titulo: 'Interim Report Q2 2026 (1S26: cuenta, balance a 30-jun-2026, deuda, segmentos, trimestres)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: `${SC}/2026/2026-q2-interim-report.pdf` },
  { id: 5, titulo: 'Interim Report Q1 2026 y Interim Reports Q1-Q3 2025 (trimestres)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-05-07', url: `${SC}/2026/2026-q1-interim-report.pdf` },
  { id: 6, titulo: '2025 FY Group P&L and FCF restated (cambio de política de arrendamientos y reclasificación de costes directos)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-04', url: `${SC}/2026/2025-fy-group-p-l-and-fcf-restated.pdf` },
  { id: 7, titulo: 'Q2 2026 results presentation (guía 2026 confirmada, sinergias, deuda neta/EBITDA)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: `${SC}/2026/2026-q2-presentation.pdf` },
  { id: 8, titulo: 'FY 2025 results analyst presentation (guía 2026, dividendo de 27 CHF, objetivos de sinergias)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-02-12', url: `${SC}/2026/swisscom-fy-2025-results-analyst-presentation.pdf` },
  { id: 9, titulo: 'Acquisition of Vodafone Italia — analyst presentation (precio, múltiplos, sinergias)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2024-03-15', url: 'https://www.corrierecomunicazioni.it/wp-content/uploads/2024/03/swisscom-acquisition-vodafone-italia-analyst-presentation.pdf' },
  { id: 10, titulo: 'Swisscom: nota de resultados del 1S26 («Swisscom confirms its outlook»)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.swisscom.ch/en/about/news/2026/08/06-report-q2-2026.html' },
  { id: 11, titulo: 'Q2 2026 Facts & Figures (KPI operativos por segmento)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: `${SC}/2026/2026-q2-facts-and-figures-per-march.pdf` },
];

// Cuenta en base EBITDAaL [1, 2, 3, 6]. ebit = EBIT NIIF − intereses de arrendamientos (2021 2.066−44; 2022 2.040−44;
// 2023 2.205−44; 2024 reexpresado 1.953−50; 2025 1.925−105). resultado_financiero = BAI publicado − ebit.
const C_ = [
  // periodo, ingresos, costes directos, EBITDAaL, EBIT_aL, BAI, impuestos, minoritarios, beneficio atribuido, intereses deuda financiera, BPA, DPA
  ['2021', 11183, 2779, 4177, 2022, 2152, 319, 1, 1832, 63, 35.37, 22],
  ['2022', 11051, 2626, 4120, 1996, 1963, 360, 1, 1602, 62, 30.93, 22],
  ['2023', 11072, 2906, 4334, 2161, 2075, 364, 0, 1711, 75, 33.03, 22],
  ['2024', 11017, 2594, 4064, 1903, 1861, 320, -1, 1542, 150, 29.77, 22],
  ['2025', 15048, 3964, 4984, 1820, 1567, 297, -1, 1271, 244, 24.54, 26],
];
const cuenta = C_.map(([p, ing, cv, eb, ebit, bai, imp, min, bn, gf, bpa, dpa]) => ({
  periodo: p, ingresos: ing, coste_ventas: cv, gastos_generales: null, ebitda: eb, amortizaciones: eb - ebit, ebit, resultado_financiero: bai - ebit,
  bai, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
  bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: 51.80,
}));
const BAL = [
  // periodo, activo, act. corriente, pas. corriente, pasivo total, fondo de comercio, intangibles, inmovilizado, existencias, clientes, proveedores, caja, deuda financiera, patrimonio atribuido, minoritarios, reservas
  ['2021', 24801, 4023, 4341, 13988, 5157, 1714, 10771, 114, 2315, 1600, 494, 6445, 10811, 2, 12485],
  ['2022', 24620, 3848, 4306, 13449, 5172, 1741, 10811, 162, 2255, 1674, 185, 6002, 11168, 3, 12942],
  ['2023', 24750, 3718, 4345, 13128, 5172, 1737, 11059, 161, 2143, 1611, 198, 5665, 11619, 3, 13529],
  ['2024', 37845, 6411, 7600, 25691, 6596, 6049, 13454, 270, 2886, 2647, 1589, 14160, 12154, 0, 14070],
  ['2025', 36023, 5128, 6748, 23785, 6575, 5682, 13663, 189, 2494, 2386, 856, 12989, 12239, -1, 14216],
];
const balance = BAL.map(([p, at, ac, pc, pt, fc, int, inm, ex, cl, pr, caja, df, pn, min, res]) => ({
  periodo: p, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: fc, intangibles: int, inmovilizado_material: inm,
  existencias: ex, clientes: cl, proveedores: pr, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: df, arrendamientos: 0, patrimonio_neto: pn, minoritarios: min, reservas: res,
}));
const FL = [
  ['2021', 4044, 2270, 259, 45, 150, 1141], ['2022', 3876, 2289, 240, 69, 0, 1141], ['2023', 4029, 2272, 270, 65, 2, 1141],
  ['2024', 4387, 2288, 677, 7374, 2, 1140], ['2025', 6012, 3008, 1558, 34, 2, 1140],
];
const flujos = FL.map(([p, fo, cx, arr, adq, des, div]) => ({ periodo: p, flujo_operativo: fo, capex: cx, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 }));
const trim = (p, ing, g, gorg, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: gorg, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas NIIF de los informes anuales 2021-2025 (2024 reexpresado en el de 2025) y del informe del 1S26, en base EBITDAaL (la de la empresa, su guía y el consenso). Swisscom no presenta en ESEF ni en la SEC: herramientas/cuentas.mjs no sirve (Suiza); las cifras se han tomado a mano de los PDF y cuadran (BAI y beneficio publicados).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 14823, ebitda: 5067, ebit: 1881, beneficio_neto: 1314, bpa: 25.38, dpa: 26, dpa_extraordinario: 0, fcf: 1671, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'Primer año con Vodafone Italia (comprada el 31-dic-2024 por 7.921 M EUR; consolidada en balance al cierre de 2024 y en la cuenta desde el 1-ene-2025) [1, 2]. Ventas pro forma de 2024: 15.358 M CHF y EBITDAaL de 5.044 M: en perímetro constante 2025 bajó un 2,0 % en ventas y un 1,2 % en EBITDAaL [1].' },
      { periodo: '2024', descripcion: 'Balance con Vodafone Italia al 31-dic-2024 (deuda neta +9.300 M CHF, de ellos 1.800 M EUR de arrendamientos); cuenta sin ella [2]. Reexpresado en 2025 por el cambio de política de arrendamientos [6].' },
    ],
    comentario: 'Hasta 2024 Swisscom era un negocio suizo maduro con Fastweb en Italia: ventas planas en ≈ 11.000-11.200 M CHF y EBITDAaL de 4.064-4.334 M (36-39 %) [1, 3]. La compra de Vodafone Italia (cerrada el 31-dic-2024) sube las ventas a 15.048 M en 2025 (+37 %) y el EBITDAaL a 4.984 M, pero baja el margen al 33,1 % (Italia gana un 23 % de margen frente al 43 % de Suiza) y el BPA a 24,54 CHF por la amortización de los activos comprados, los intereses de la deuda nueva (244 M frente a 75 M en 2023) y 126 M de costes de integración y otros ajustes [1]. En perímetro constante 2025 bajó un 2,0 % en ventas y un 1,2 % en EBITDAaL [1]. En el 1S26 las ventas caen un 3,0 % (−2,0 % a tipo de cambio constante) por la presión de precios en Suiza y la pérdida del operador virtual de PosteMobile en Italia, pero el EBITDAaL sube un 3,4 % (+3,7 % ajustado a tipo constante) por las sinergias (166 M EUR en el semestre) [4, 10]. Ningún año tiene deterioros ni plusvalías relevantes; el ajustado de la empresa en 2025 (5.110 M) solo añade 126 M de integración y otros conceptos que se repiten mientras dure la integración (hasta 2027-2028), por eso no se devuelven al EBITDAaL.',
    ajustes: 'Base EBITDAaL (EBITDA después del gasto de arrendamientos: resta la amortización de los derechos de uso y los intereses de los arrendamientos), la que publica la empresa, guía y sigue el consenso [1, 7]. Para que todo cuadre: ebit = EBIT NIIF − intereses de arrendamientos; amortizaciones = EBITDAaL − ese EBIT (solo inmovilizado e intangibles); resultado financiero = el NIIF sin los intereses de arrendamientos y con el resultado de participadas; los arrendamientos (3.729 M a 31-dic-2025; 3.480 M a 30-jun-2026) se tratan como gasto de explotación y NO se suman a la deuda del puente, y sus pagos (1.558 M en 2025) se restan del flujo libre. Es el mismo tratamiento que el de las empresas en US GAAP con arrendamientos operativos. El BAI, el impuesto y el beneficio son los publicados. 2024 es el reexpresado en el informe de 2025: el cambio de política de arrendamientos (2025) subió la amortización de derechos de uso de 261 a 671 M y el flujo operativo de 3.977 a 4.387 M, sin cambiar el EBITDAaL [6]. Costes directos (formato por naturaleza): los de la última presentación de cada año, con la reclasificación de 2023 [1, 2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('1T25', 3759, null, null, 1277, 7.09, null),
      trim('2T25', 3687, null, null, 1197, 5.00, null),
      trim('3T25', 3730, null, null, 1302, 7.00, null),
      trim('4T25', 3873, null, null, 1208, 5.44, null),
      trim('1T26', 3606, r1((3606 / 3759 - 1) * 100), null, 1288, 6.41, null),
      trim('2T26', 3615, r1((3615 / 3687 - 1) * 100), null, 1269, 6.50, 'Superior'),
    ],
    ultima_presentacion: 'Seis trimestres en el perímetro actual (los de 2024 no llevan Vodafone Italia y no son comparables) [4, 5, 1]. 1S26 (6-ago-2026): ventas de 7.221 M CHF (−3,0 %; −2,0 % a tipo constante), EBITDAaL de 2.557 M (+3,4 %; +3,7 % ajustado a tipo constante), beneficio de 668 M y BPA de 12,92 CHF (12,08 un año antes), flujo libre de 717 M [4, 10]. Suiza: ventas de 3.870 M (−0,7 %) y EBITDAaL de 1.700 M; Italia: 3.474 M EUR (−3,3 %) y EBITDAaL de 913 M EUR (+11,8 % ajustado) [4]. El 2T26 batió el consenso que publica la empresa (ventas 3.615 frente a 3.588; EBITDAaL 1.269 frente a 1.218; beneficio ≈ 337 M frente a 301) [4]. Guía 2026 confirmada: ventas de 14.700-14.900 M, EBITDAaL de 5.000-5.100 M, inversión de 3.000-3.100 M, flujo de caja operativo libre (EBITDAaL − inversión) ≈ 2.000 M y dividendo de 27 CHF [7, 10]. Transcripción de la conferencia: no disponible (ver huecos).',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 1431 }, { anio: '2027', importe: 1844 }, { anio: '2028-2030', importe: 3463 }, { anio: '2031+', importe: 8247 }],
    liquidez: 'Caja de 215 M CHF y 351 M de otros activos financieros a 30-jun-2026; dos líneas de crédito comprometidas de 1.700 M (hasta 2029) y 1.200 M (hasta 2028), sin disponer [4, 1]. En 2026 emitió 125 M CHF al 0,915 % y dos bonos de 500 M EUR (3,125 % a tres años y 3,625 % a nueve) [4].',
    rating: 'A− (S&P, estable) y A2 (Moody\'s, estable; confirmado en junio de 2026) [1, 4]',
    coste_deuda_pct: 1.85,
    vida_media_anios: 5.5,
    otros_pasivos: 'Arrendamientos de 3.480 M CHF a 30-jun-2026 (fuera de la deuda por la base EBITDAaL; con ellos la deuda neta es de 15.935 M) [4]. Provisiones de 1.566 M (1.067 de desmantelamiento y 202 de litigios) [4]. Pensiones: déficit contable de 54 M con un grado de cobertura del 121 % [4, 1]. Pago aplazado de la compra de Vodafone Italia (hasta 125 M EUR, 21 M ya pagados) [1]. La Comisión de la Competencia (COMCO) tiene abiertos varios procedimientos; el Tribunal Administrativo Federal anuló en octubre de 2026 la multa de 18,4 M por la fibra; los pasivos contingentes no están provisionados [1].',
    comentario: 'La compra de Vodafone Italia multiplicó la deuda financiera por 2,5: de 5.665 M CHF en 2023 a 14.160 M en 2024 y 13.021 M a 30-jun-2026 [3, 2, 4]. Deuda neta con arrendamientos / EBITDA: 2,4 veces al cierre de 2025, guía de ≈ 2,3 al cierre de 2026; el Consejo Federal fija un tope de 2,4 veces en sus objetivos estratégicos para 2026-2029 [1, 7]. Sin arrendamientos (la base de este informe), la deuda neta financiera es de ≈ 12.450 M, ≈ 2,5 veces el EBITDAaL. El coste es muy bajo (1,85 % de media, 94-95 % a tipo fijo) porque la mitad es en francos; la nueva en euros cuesta un 3,1-3,6 % [4]. Fondo de comercio de 6.575 M (el 54 % del patrimonio): 4.345 M de Suiza y 1.893 M de Italia (471 de Fastweb y 1.422 de Vodafone Italia) [1]. El patrimonio sube poco porque el dividendo (1.140 M) se lleva casi todo el beneficio.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo pasa de ≈ 4.000 M CHF a 6.012 M en 2025 con Vodafone Italia, pero la inversión (3.008 M) y los pagos de arrendamientos (1.558 M) se lo llevan casi todo: el flujo libre (operativo − inversión − arrendamientos) fue de 1.446 M en 2025 y de 1.671 M en los 12 meses a junio de 2026, frente a 1.433 M de la definición de la empresa en 2025 [1, 4]. El dividendo (1.140 M; 1.399 M con 27 CHF) se come casi todo el flujo libre: payout del 89 % del beneficio de 2025 y ≈ 80 % del flujo libre [1]. Los intereses pagados van en el flujo operativo. Sin recompras ni ampliaciones: 51,80 M de acciones desde 2009 [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers AG', anios_auditor: 7, opinion: 'Favorable (sin salvedades) en 2025 [1]',
    comentario: 'Cuentas limpias y conservadoras: sin deterioros desde los de Italia y «Otros» de hace años (1.188 M acumulados), sin plusvalías relevantes y con un ajustado que solo difiere del publicado en 126 M en 2025 [1]. Dos cosas que vigilar: el cambio de política de arrendamientos de 2025 (reexpresión de 2024, sin efecto en el EBITDAaL) [6] y el fondo de comercio de Vodafone Italia (1.422 M), probado con un WACC después de impuestos del 5,51 % y un crecimiento del 2 % en Italia: un mercado italiano que no crece ni en precios podría forzar un deterioro [1]. La prueba de Suiza usa un WACC del 3,89 % y crecimiento cero [1].',
    senales: [
      { senal: 'Reexpresión por cambio de política de arrendamientos', nivel: 'Baja', comentario: 'En 2025 la amortización de derechos de uso de 2024 pasó de 261 a 671 M y el flujo operativo de 3.977 a 4.387 M; el EBITDAaL y el beneficio no cambian [6].' },
      { senal: 'Fondo de comercio de Italia frente a su prueba de deterioro', nivel: 'Media', comentario: '1.893 M en Italia con crecimiento a perpetuidad del 2 %; Fastweb ya tuvo deterioros [1].' },
      { senal: 'Costes de integración recurrentes fuera del ajustado', nivel: 'Baja', comentario: '102 M de integración en 2025 y más en 2026-2027; el informe los deja dentro del EBITDAaL [1].' },
      { senal: 'Asignación del precio de compra (PPA) de Vodafone Italia', nivel: 'Baja', comentario: 'Intangibles de 6.049 M en 2024 (1.737 M en 2023): su amortización baja el BPA sin salir caja [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo estable o creciente: 22 CHF por acción de 2017 a 2024, 26 CHF por 2025 y 27 CHF propuestos por 2026 si se cumplen los objetivos [1, 8]. Sin recompras. Deuda neta / EBITDA con arrendamientos ≤ 2,4 veces (tope del Consejo Federal, accionista con el 51 %) y rating en el rango A [1]. Los objetivos estratégicos del Consejo Federal para 2026-2029 descartan nuevas compras grandes en el extranjero y piden centrarse en la infraestructura suiza [1].',
    adquisiciones: [
      { anio: '2024', objetivo: 'Vodafone Italia (100 %)', importe: 7454, ev_ebitda: 7.8, financiacion: 'Deuda (bonos en CHF y EUR) y caja', resultado: 'Fusionada con Fastweb el 1-ene-2026; sinergias de más de 300 M EUR en 2026 (166 M en el 1S26) y ≈ 600 M anuales en 2029; 5,1 veces el EBITDAaL con sinergias [9, 7].' },
    ],
    comentario: 'La asignación de capital es de empresa pública prudente: la mayor parte del flujo libre va al dividendo, y la inversión (≈ 20 % de las ventas) mantiene redes de fibra (58 % de los hogares suizos con FTTH) y 5G líderes [1, 11]. La única gran apuesta de la década es Vodafone Italia: se pagó barato (7,8 veces el EBITDAaL antes de sinergias, frente a una media de 10,6 en compras europeas parecidas) y las sinergias van por delante del plan, pero el mercado italiano sigue bajando en precio y el ROIC del grupo cae del ≈ 9 % al ≈ 6 % [9, 7]. El Consejo Federal ya ha cerrado la puerta a más compras grandes fuera.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Suiza (Swisscom Switzerland)', descripcion: 'Telefonía móvil y fija, banda ancha, televisión, soluciones de TI y nube para empresas, y venta mayorista de red en Suiza.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 8233, resultado: 3221 }, { periodo: '2022', ingresos: 8209, resultado: 3265 }, { periodo: '2023', ingresos: 8147, resultado: 3484 }, { periodo: '2024', ingresos: 7976, resultado: 3329 }, { periodo: '2025', ingresos: 7868, resultado: 3362 }] },
      { nombre: 'Italia (Fastweb + Vodafone)', descripcion: 'Móvil y fijo para particulares, empresas y administración en Italia, y servicios mayoristas (operadores virtuales); Vodafone Italia desde 2025.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 2583, resultado: 834 }, { periodo: '2022', ingresos: 2493, resultado: 800 }, { periodo: '2023', ingresos: 2561, resultado: 722 }, { periodo: '2024', ingresos: 2672, resultado: 623 }, { periodo: '2025', ingresos: 6831, resultado: 1580 }] },
      { nombre: 'Otros y eliminaciones', descripcion: 'Infraestructura de emisión y otras filiales, menos eliminaciones entre segmentos.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2021', ingresos: 367, resultado: 122 }, { periodo: '2022', ingresos: 349, resultado: 55 }, { periodo: '2023', ingresos: 364, resultado: 128 }, { periodo: '2024', ingresos: 369, resultado: 112 }, { periodo: '2025', ingresos: 349, resultado: 42 }] },
    ],
    geografias: [{ nombre: 'Suiza', peso_pct: 54.5 }, { nombre: 'Italia', peso_pct: 45.4 }, { nombre: 'Otros', peso_pct: 0.1 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'EBITDAaL del grupo (M CHF)', valor_anterior: '2.474 (1S25)', valor_actual: '2.557 (1S26)', variacion: '+3,4 %', comentario: '+3,7 % ajustado a tipo constante; guía 2026 de 5.000-5.100 M [4].' },
      { kpi: 'Sinergias de Vodafone Italia (M EUR)', valor_anterior: '—', valor_actual: '166 (1S26)', variacion: '—', comentario: 'Más de 300 M en 2026 y ≈ 600 M anuales en 2029 [7].' },
      { kpi: 'Banda ancha en Suiza (miles)', valor_anterior: '≈ 1.948', valor_actual: '1.907', variacion: '−2,1 %', comentario: 'Pierde clientes frente a Sunrise, Salt y las marcas baratas [11].' },
      { kpi: 'Contratos móviles en Suiza (miles)', valor_anterior: '≈ 4.418', valor_actual: '4.418', variacion: '0 %', comentario: 'Estable con la segunda marca (wingo) [11].' },
      { kpi: 'Líneas mayoristas móviles en Italia (millones)', valor_anterior: '≈ 7,3', valor_actual: '5,856', variacion: '−20 %', comentario: 'Pérdida de PosteMobile como operador virtual [11].' },
      { kpi: 'Cobertura FTTH en Suiza', valor_anterior: '≈ 51 %', valor_actual: '58 %', variacion: '+7 pp', comentario: 'Objetivo ≈ 60 % a final de 2026 y 75-80 % en 2030 [1, 11].' },
    ],
    clientes: 'Millones de clientes particulares y empresas en Suiza e Italia: ninguno pesa más de un 10 % de las ventas [1]. En Suiza tiene el 51 % de los contratos móviles, el 46 % de la banda ancha y el 41 % de la televisión de pago [1]; en Italia, Fastweb + Vodafone es el primer operador móvil (25,2 % de las tarjetas «humanas») y el segundo en banda ancha fija (28,7 %) [B]. Poder de precios: alto en Suiza (subidas de tarifas aceptadas, red mejor valorada), bajo en Italia (Iliad y los operadores virtuales fijan el precio).',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'transcripción de la conferencia del 1S26', tipo: 'Complemento', intentos: '1) Seeking Alpha (403 sin sesión); 2) búsqueda web de la transcripción; 3) web de relación con inversores de Swisscom (solo presentación y vídeo)', decision: 'Omitido; se usan la presentación y la nota de resultados' },
  ],
  fuentes: fA,
};
// La referencia [B] en clientes es a la nota B; se reescribe a una fuente propia de A para que la cita quede dentro de la nota.
A.negocio.clientes = A.negocio.clientes.replace('[B]', '[12]');
fA.push({ id: 12, titulo: 'Osservatorio sulle comunicazioni n. 2/2026 (cuotas de móvil y banda ancha fija en Italia a 31-mar-2026)', editor: 'AGCOM', tipo: 'Primaria', fecha: '2026-07', url: 'https://www.agcom.it/osservatorio-sulle-comunicazioni' });
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025 de Swisscom (mercados suizo e italiano, cuotas, regulación, competencia)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-02-12', url: IA(2025) },
  { id: 2, titulo: 'Osservatorio sulle comunicazioni n. 2/2026 y Relazione annuale 2026 (cuotas a 31-mar-2026; ingresos del sector en 2025)', editor: 'AGCOM (regulador italiano)', tipo: 'Primaria', fecha: '2026-07', url: 'https://www.agcom.it/osservatorio-sulle-comunicazioni' },
  { id: 3, titulo: 'Fichas de competidores (ventas, márgenes, deuda) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com' },
  { id: 4, titulo: 'Objetivos estratégicos del Consejo Federal para Swisscom 2026-2029 (tope de deuda de 2,4 veces, sin compras grandes en el extranjero)', editor: 'Consejo Federal suizo / SRF', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://www.srf.ch/news/wirtschaft/strategische-ziele-swisscom' },
  { id: 5, titulo: 'Acuerdo con el Supervisor de Precios: tope de 24 CHF/mes para el alquiler de fibra oscura (ALO) prorrogado dos años', editor: 'Swisscom AG / Preisüberwacher', tipo: 'Primaria', fecha: '2026-10-09', url: 'https://www.swisscom.ch/en/about/news.html' },
  { id: 6, titulo: 'AGCM abre investigación a fondo del acuerdo de torres y red compartida TIM–Fastweb+Vodafone', editor: 'AGCM (autoridad de competencia italiana) / prensa', tipo: 'Primaria', fecha: '2026-05-14', url: 'https://www.agcm.it' },
  { id: 7, titulo: 'Interim Report Q2 2026 (segmentos, KPI, INWIT, PosteMobile, torres)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: `${SC}/2026/2026-q2-interim-report.pdf` },
  { id: 8, titulo: 'Annual Report 2025 de Sunrise Communications (ventas y margen en Suiza)', editor: 'Sunrise Communications AG / Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SUNN.SW' },
];
const B_ = {
  _estado: 'Completa con limitaciones: no hay ficha sectorial de telecomunicaciones en sectores/ y el encargo no permite crearla; perímetro y tamaños de los informes de Swisscom y de AGCOM.',
  sector: {
    definicion: 'Mercado relevante: los servicios de telecomunicaciones (móvil, banda ancha fija, televisión, mayorista) de Suiza e Italia, que dan ≈ 85 % de las ventas de Swisscom; el resto son servicios de TI y nube para empresas suizas (2.005 M CHF en 2025) [1]. Suiza: ≈ 11.000 M CHF de ventas de telecomunicaciones, mercado maduro de tres redes (Swisscom, Sunrise, Salt) con precios altos y caída lenta [1]. Italia: 29.500 M EUR de comunicaciones electrónicas en 2025 (fijo 18.500, móvil algo menos de 11.000, −0,6 %), cuatro redes móviles (Fastweb+Vodafone, WindTre, TIM, Iliad) y fuerte competencia de precio [2]. El mercado de TI suizo (≈ 25.000 M CHF) es de otro tipo y Swisscom solo tiene una parte pequeña [1].',
    tamano: '≈ 38.300 M CHF (telecomunicaciones de Suiza ≈ 11.000 M CHF + comunicaciones electrónicas de Italia 29.500 M EUR) en 2025 [1, 2]',
    unidad_serie: 'millones de CHF (Suiza + Italia, 2025; un solo año comparable)',
    serie: [{ anio: '2025', tamano: 38300 }],
    tcac_historico_pct: null, tcac_previsto_pct: 0, cr5_pct: 93, estructura: 'Oligopolio (tres redes en Suiza; cuatro en Italia con operadores virtuales)',
    drivers: [
      { driver: 'Precio de las tarifas', efecto: '−', horizonte: 'Estructural', evidencia: 'En Suiza las marcas baratas y las ofertas convergentes de Sunrise y Salt bajan el ingreso por cliente; en Italia Iliad y los virtuales mantienen precios entre los más bajos de Europa [1, 2].' },
      { driver: 'Datos y fibra', efecto: '+', horizonte: 'Estructural', evidencia: 'El tráfico crece y la fibra (58 % de cobertura FTTH en Suiza) permite vender velocidades más altas [7].' },
      { driver: 'Consolidación', efecto: '+', horizonte: 'Estructural', evidencia: 'Fastweb + Vodafone (2025) y el acuerdo de torres y red con TIM reducen costes; la AGCM lo investiga [6].' },
      { driver: 'TI, nube, ciberseguridad e IA para empresas', efecto: '+', horizonte: 'Estructural', evidencia: 'Ventas de TI de 2.005 M CHF en 2025; plataforma de IA soberana suiza [1].' },
      { driver: 'Tipos de interés', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Con el bono suizo a 10 años al 0,59 % la acción es «bono con dividendo» [D].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Moderada en Suiza (tres redes) y alta en Italia (cuatro redes y virtuales; precios a la baja) [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Particulares sin poder individual, pero portabilidad fácil y marcas baratas [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricantes de red (Ericsson, Nokia), de móviles (Apple) y de contenidos; en Italia, INWIT en torres [7].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Espectro, licencias y redes: barreras altas; entrar como virtual es fácil pero de bajo margen [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Servicios por internet (mensajería, vídeo) sustituyen voz y TV, no la conectividad [1].' },
    ],
    ciclo: { posicion: 'Madurez', comentario: 'La demanda de conectividad no depende del ciclo económico; los precios bajan poco a poco en Suiza y más deprisa en Italia. Las empresas recortan TI en las recesiones (la parte de servicios a empresas es la más cíclica) [1].' },
    regulacion: 'Suiza: la Confederación debe tener la mayoría de Swisscom por ley (Ley de Empresas de Telecomunicaciones) y fija objetivos estratégicos cada cuatro años (2026-2029: deuda ≤ 2,4 veces, sin compras grandes en el extranjero) [4]. Swisscom tiene la licencia de servicio universal hasta 2031 [1]. El Supervisor de Precios y la COMCO vigilan precios y acceso: el 9-oct-2026 Swisscom prorrogó dos años el tope de 24 CHF/mes para la fibra oscura [5]; la COMCO tiene varios procedimientos abiertos [1]. Italia: AGCOM regula el acceso y AGCM investiga a fondo el acuerdo de torres y red con TIM (decisión prevista hacia abril de 2027) [6].',
    tendencias: 'Convergencia fijo-móvil, fibra hasta el hogar, 5G autónomo, separación y venta de torres, consolidación en Italia (Fastweb + Vodafone, acuerdo con TIM), IA aplicada a la atención al cliente y a la operación de la red, y servicios de IA y nube «soberanos» para empresas y administración [1, 7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 51, posicion: '1.º en Suiza (51 % de los contratos móviles, 46 % de la banda ancha, 41 % de la televisión) y 1.º en móvil en Italia (25,2 % de las tarjetas) y 2.º en banda ancha fija (28,7 %) [1, 2]',
    competidores: [
      { nombre: 'Sunrise', pais: 'Suiza', ticker: 'SUNN', ingresos: Math.round(Y['SUNN.SW'].ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Segundo operador suizo (móvil + cable), escindido de Liberty Global en 2024; muy endeudado [3, 8].' },
      { nombre: 'Salt (privada, NJJ)', pais: 'Suiza', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Tercer operador móvil suizo, de Xavier Niel; agresivo en precio [1].' },
      { nombre: 'TIM', pais: 'Italia', ticker: 'TIT', ingresos: Math.round(Y['TIT.MI'].ventas / 1e6), cuota_pct: 22.3, margen_ebit_pct: null, comentario: 'Antiguo monopolio; 32,6 % de la banda ancha fija; socio del acuerdo de torres y red [2, 6].' },
      { nombre: 'WindTre (CK Hutchison)', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: 23.6, margen_ebit_pct: null, comentario: 'Segundo en móvil [2].' },
      { nombre: 'Iliad Italia', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: 16.1, margen_ebit_pct: null, comentario: 'Entró en 2018 con precios bajos y sigue ganando cuota [2].' },
      { nombre: 'PosteMobile', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: 5.6, margen_ebit_pct: null, comentario: 'Operador virtual que dejó la red de Fastweb+Vodafone (−20 % de líneas mayoristas) [2, 7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red física no crea efectos de red de usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Paquetes convergentes y contratos de empresas; la portabilidad es fácil [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Espectro, licencia de servicio universal y la marca mejor valorada de Suiza [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Mayor red de fibra y escala en Suiza: margen EBITDAaL del 43 % [1].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un mercado de 9 millones de habitantes no admite más de tres redes [1].' },
      ],
    },
    amenazas: 'En Suiza, la erosión lenta del precio y de las líneas fijas (−2,1 % de banda ancha al año) frente a Sunrise, Salt y las marcas baratas, y la regulación de precios de acceso a la fibra [1, 5]. En Italia, la guerra de precios (Iliad, virtuales), la pérdida de clientes mayoristas (PosteMobile) y el riesgo de que la AGCM imponga condiciones al acuerdo con TIM [2, 6]. A largo plazo, los satélites de órbita baja como sustituto parcial en zonas rurales.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Swisscom es el primer operador de telecomunicaciones de Suiza (móvil, fibra, televisión, servicios de TI y nube para empresas) y, desde 2025, con Fastweb + Vodafone, el primer operador móvil de Italia; 23.266 empleados a tiempo completo [1]. La Confederación Suiza tiene el 51 % por ley. En 2025 vendió 15.048 M CHF: 52 % Suiza y 45 % Italia [1].',
    como_gana_dinero: 'Cobra cuotas mensuales por conectividad (móvil, banda ancha, televisión) a particulares y empresas, vende servicios de TI, nube y ciberseguridad a empresas suizas, y alquila su red a otros operadores (mayorista) [1]. De 15.048 M de ventas en 2025: servicios de telecomunicaciones 9.881 M, TI 2.005, mayorista 1.194, venta de equipos 1.272 y otros 696 [1]. En Suiza gana un 43 % de margen EBITDAaL (red propia y precios altos) y en Italia un 23 % [1]. La inversión en red se lleva ≈ 20 % de las ventas.',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie histórica del tamaño del mercado (Suiza + Italia)', tipo: 'Complemento', intentos: '1) informes anuales de Swisscom 2021-2025 (solo tamaños aproximados); 2) AGCOM (Italia, solo 2025 en la misma base); 3) BAKOM/OFCOM (estadística suiza con dos años de retraso)', decision: 'Omitido: un solo año' },
  ],
  fuentes: fB,
};
B_.sector.drivers[4].evidencia = 'Con el bono de la Confederación a 10 años al 0,59 % (30-sep-2026), un dividendo del 4 % hace de Swisscom un sustituto de renta fija: sube cuando bajan los tipos [1].';
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: gobierno corporativo, consejo, dirección, informe de remuneración, accionistas', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-02-12', url: IA(2025) },
  { id: 2, titulo: 'Resultados de las votaciones de la junta general del 25-mar-2026', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-03-25', url: 'https://www.swisscom.ch/content/dam/assets/about/governance/general-versammlung/documents/swisscom-resultate-2026.pdf' },
  { id: 3, titulo: 'Annual Reports 2021-2024: objetivos financieros y su cumplimiento', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2025-02-13', url: IA(2024) },
  { id: 4, titulo: 'Interim Report Q2 2026: cambios en la dirección (Wierzbitzki, Stettler, Lehner, Wettstein)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: `${SC}/2026/2026-q2-interim-report.pdf` },
  { id: 5, titulo: 'Objetivos estratégicos del Consejo Federal 2026-2029', editor: 'Consejo Federal suizo / SRF', tipo: 'Primaria', fecha: '2025-11-19', url: 'https://www.srf.ch/news/wirtschaft/strategische-ziele-swisscom' },
  { id: 6, titulo: 'Notificaciones de operaciones de directivos (SIX Exchange Regulation, anónimas)', editor: 'SIX Exchange Regulation', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.ser-ag.com/en/resources/notifications-market-participants/management-transactions.html' },
];
const C = {
  _estado: 'Completa. Informe anual 2025 (gobierno y remuneración) y votos de la junta de 2026. En Suiza las operaciones de directivos se publican sin nombre: no hay lista nominal de compras y ventas.',
  directivos: {
    equipo: [
      { nombre: 'Christoph Aeschlimann', cargo: 'Consejero delegado del grupo', desde: '2022', participacion_pct: 0.005, trayectoria: 'En la dirección desde 2019 (responsable de TI, red e infraestructura); consejero delegado desde junio de 2022. Ha cerrado la compra de Vodafone Italia y su fusión con Fastweb [1].' },
      { nombre: 'Eugen Stermetz', cargo: 'Director financiero', desde: '2021', participacion_pct: null, trayectoria: 'Director financiero desde marzo de 2021; antes en Swisscom y Fastweb [1].' },
      { nombre: 'Walter Renna', cargo: 'Consejero delegado de Fastweb + Vodafone (Italia)', desde: '2024', participacion_pct: null, trayectoria: 'Dirige Fastweb desde 2024 y la integración con Vodafone Italia [1].' },
      { nombre: 'Isa Müller-Wegner', cargo: 'Directora de estrategia', desde: '2022', participacion_pct: null, trayectoria: 'Estrategia y desarrollo corporativo [1].' },
      { nombre: 'Klementina Pejic', cargo: 'Directora de personas', desde: '2022', participacion_pct: null, trayectoria: 'Recursos humanos del grupo [1].' },
      { nombre: 'Dirk Wierzbitzki', cargo: 'Consejero delegado de Swisscom Suiza (desde el 1-ene-2027)', desde: '2027', participacion_pct: null, trayectoria: 'Nombrado en 2026 para separar la dirección del negocio suizo de la del grupo [4].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Ventas ≈ 11.100 M CHF; EBITDA ≈ 4.300 M; inversión ≈ 2.300 M', real: '11.183; 4.478; 2.286', cumplida: 'Sí' },
      { anio: '2022', guia: 'Ventas ≈ 11.100 M (rebajada desde 11.100-11.200 por el franco); EBITDA ≈ 4.400 M', real: '11.112; 4.406', cumplida: 'Sí' },
      { anio: '2023', guia: 'Ventas ≈ 11.100 M (rebajada por el franco); EBITDA 4.600-4.700 M', real: '11.072; 4.622', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Ventas ≈ 11.000 M; EBITDA 4.300-4.400 M (antes 4.500-4.600, rebajada por la integración)', real: '11.036; 4.355', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Ventas 15.000-15.200 M; EBITDAaL ≈ 5.000 M; inversión 3.100-3.200 M; flujo operativo libre 1.800-1.900 M', real: '15.048; 4.984; 3.064; 1.920', cumplida: 'Sí' },
    ],
    comentario: 'Equipo predecible: cumple casi siempre una guía prudente, y las dos rebajas (ventas de 2022-2023 por el franco, EBITDA de 2024 por los costes de integración) tienen causa externa o contable [1, 3]. Aeschlimann (en el cargo desde 2022) hizo la mayor compra de la historia de la empresa; las sinergias van por delante del plan (166 M EUR en el 1S26 frente a más de 300 M en el año) [4]. Cambios de dirección: desde enero de 2027 el negocio suizo tendrá consejero delegado y director financiero propios (Wierzbitzki y Stettler), y el responsable de empresas (Urs Lehner) se fue en septiembre de 2026 [4].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Michael Rechsteiner', cargo: 'Presidente (desde 2021)', tipo: 'Independiente', desde: '2019', comisiones: 'Presidencia' },
      { nombre: 'Frank Esser', cargo: 'Vicepresidente (no se presentó en 2026)', tipo: 'Independiente', desde: '2014', comisiones: 'Estrategia e Inversiones (presidente)' },
      { nombre: 'Roland Abt', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Monique Bourquin', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración (presidenta)' },
      { nombre: 'Laura Cioli', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Guus Dekkers', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: '—' },
      { nombre: 'Anna Mossberg', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: '—' },
      { nombre: 'Sandra Lathion-Zweifel', cargo: 'Consejera (representante de los empleados)', tipo: 'Otro externo', desde: '2019', comisiones: '—' },
      { nombre: 'Daniel Münger', cargo: 'Consejero (representante de los empleados)', tipo: 'Otro externo', desde: '2024', comisiones: '—' },
      { nombre: 'Fritz Zurbrügg', cargo: 'Consejero (representante de la Confederación)', tipo: 'Dominical', desde: '2023', comisiones: '—' },
      { nombre: 'Philippe Deecke', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.44, voto_remuneracion_contra_pct: 3.32, voto_remuneracion_contra_libre_pct: 10.2, voto_cupula_pct: 99.26,
    remuneracion_ceo: { anio: '2025', total: 2.232, fijo: 0.915, variable_corto: 0.786, variable_largo: 0.210, ratio_salario_medio: null },
    remuneracion: 'El consejero delegado cobró 2,23 M CHF en 2025: 0,92 M de fijo, 0,79 M de variable anual (0,36 en efectivo y 0,43 en acciones bloqueadas) y 0,21 M en acciones restringidas, más pensión [1]. Muy por debajo de sus pares europeos: el Consejo Federal limita la remuneración de las empresas públicas. El variable se liga a ventas, EBITDAaL y flujo operativo libre, no a ROIC ni a rentabilidad para el accionista [1]. La dirección cobró 7,15 M en total. En la junta de 2026 el informe de remuneración tuvo un 96,44 % a favor y un 3,32 % en contra; sin el voto de la Confederación, ≈ 10 % en contra [2].',
    accionistas: [
      { nombre: 'Confederación Suiza', pct: 50.95, tipo: 'Estado (mayoría exigida por ley)', variacion: 'Sin cambios' },
      { nombre: 'UBS Fund Management', pct: 3.46, tipo: 'Institucional', variacion: 'Notificación de 2024' },
      { nombre: 'BlackRock', pct: 3.44, tipo: 'Institucional', variacion: 'Notificación de 2017' },
      { nombre: 'Consejeros y directivos', pct: 0.01, tipo: 'Internos', variacion: 'El consejero delegado tiene 2.506 acciones y 367 restringidas' },
    ],
    insiders: [],
    control_y_defensas: 'La Confederación tiene el 50,95 % y por ley debe conservar la mayoría: Swisscom no se puede comprar [1, 5]. Límite estatutario de voto del 5 % para el resto de accionistas, por lo que no rige una acción un voto [1]. El Consejo Federal fija objetivos estratégicos cada cuatro años (2026-2029: deuda ≤ 2,4 veces el EBITDA, foco en la infraestructura suiza, sin compras grandes fuera) y designa un consejero [5]. Consejo mayoritariamente independiente con dos representantes de los empleados; presidente no ejecutivo [1].',
    alertas: [
      'Accionista de control público (50,95 %) con objetivos políticos: limita compras, deuda y remuneración, y garantiza el servicio universal [1, 5].',
      'Variable de la dirección sin ROIC ni rentabilidad para el accionista: premia el EBITDAaL y el flujo, no el rendimiento del capital invertido en Italia [1].',
      'Operaciones de directivos anónimas en Suiza (SIX): sin compras ni ventas nominales que leer [6].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'operaciones nominales de directivos', tipo: 'Complemento', intentos: '1) SIX Exchange Regulation (anónimas por ley); 2) informe anual 2025 (solo tenencias al cierre); 3) búsqueda web', decision: 'Omitido: en Suiza no se publican con nombre' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SCMN.SW, SPI (índice) y STOXX Europe 600 Telecom (EXV2): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/SCMN.SW/history' },
  { id: 2, titulo: 'Consenso de Swisscom y comparables (BPA, ventas, objetivos, recomendaciones; precio a las 08:49 UTC del 20-oct): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SCMN.SW/analysis' },
  { id: 3, titulo: 'Analyst Consensus Q3 2026 (15 analistas, 8-oct-2026) y Q2 2026 (13 analistas, 8-jul-2026)', editor: 'Swisscom AG (recopilado de los analistas)', tipo: 'Analistas', fecha: '2026-10-08', url: 'https://www.swisscom.ch/content/dam/assets/about/investoren/documents/swisscom-q3-2026-results-analyst-consensus.pdf' },
  { id: 4, titulo: 'Tipos de interés al contado de la Confederación (10 años: 0,586 % el 30-sep-2026)', editor: 'Banco Nacional Suizo (data.snb.ch, cubo rendeiduebd)', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://data.snb.ch/api/cube/rendeiduebd/data/csv/en?fromDate=2026-01-01' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Tipos de cambio de referencia del BCE del 19-oct-2026 (CHF 0,9261; NOK 10,5555; SEK 11,104; GBP 0,84205 por euro)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Revisión ordinaria de índices de SIX: Swisscom sale del SMI y entra en el SMIM (efectiva el 21-sep-2026)', editor: 'SIX Group', tipo: 'Primaria', fecha: '2026-07-08', url: 'https://www.six-group.com/dam/download/media/bfi/2607-index-adjustments.pdf' },
  { id: 8, titulo: 'Swisscom: nota de resultados del 1S26 y guía confirmada', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-08-06', url: 'https://www.swisscom.ch/en/about/news/2026/08/06-report-q2-2026.html' },
  { id: 9, titulo: 'Movimiento del precio de SCMN.SW (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SCMN.SW/history' },
  { id: 10, titulo: 'Swisscom: acciones a la baja y recomendaciones (Morgan Stanley vende; ZKB «infraponderar»; UBS neutral con 735 CHF)', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.cash.ch/news/top-news/aktie-auf-sechs-monate-tief-smi-dividendenperle-am-donnerstag-im-anlegerfokus-946284' },
  { id: 11, titulo: 'Acquisition of Vodafone Italia — analyst presentation (múltiplos de compras europeas comparables)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2024-03-15', url: 'https://www.corrierecomunicazioni.it/wp-content/uploads/2024/03/swisscom-acquisition-vodafone-italia-analyst-presentation.pdf' },
  { id: 12, titulo: 'Annual Report 2025 (dividendo, fecha ex 27-mar-2026, objetivos del Consejo Federal)', editor: 'Swisscom AG', tipo: 'Primaria', fecha: '2026-02-12', url: IA(2025) },
  { id: 13, titulo: 'Tribunal Administrativo Federal anula la multa de 18,4 M CHF de la COMCO por la fibra; acuerdo con el Supervisor de Precios (fibra oscura)', editor: 'Swisscom AG / prensa suiza', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.swisscom.ch/en/about/news.html' },
  { id: 14, titulo: 'AGCM: investigación a fondo del acuerdo de torres y red TIM–Fastweb+Vodafone', editor: 'AGCM / prensa italiana', tipo: 'Primaria', fecha: '2026-05-14', url: 'https://www.agcm.it' },
];
const s = Y['SCMN.SW'];
const ts = Object.fromEntries(s.trend.map((x) => [x.periodo, x]));
// Tipos de cambio a CHF (BCE, 19-oct-2026) [6].
const EURCHF = 0.9261;
const FX = { CHF: 1, EUR: EURCHF, NOK: EURCHF / 10.5555, SEK: EURCHF / 11.104, GBp: EURCHF / 0.84205 / 100, GBP: EURCHF / 0.84205 };
const PAIS = { 'SUNN.SW': 'CH', 'DTE.DE': 'DE', 'ORA.PA': 'FR', 'KPN.AS': 'NL', 'TEL.OL': 'NO', 'TELIA.ST': 'SE', 'PROX.BR': 'BE', 'ELISA.HE': 'FI', 'TEL2-B.ST': 'SE', 'TIT.MI': 'IT', 'TEF.MC': 'ES', 'VOD.L': 'GB' };
const NOMBRE = { 'SUNN.SW': 'Sunrise', 'DTE.DE': 'Deutsche Telekom', 'ORA.PA': 'Orange', 'KPN.AS': 'KPN', 'TEL.OL': 'Telenor', 'TELIA.ST': 'Telia', 'PROX.BR': 'Proximus', 'ELISA.HE': 'Elisa', 'TEL2-B.ST': 'Tele2', 'TIT.MI': 'Telecom Italia (TIM)', 'TEF.MC': 'Telefónica', 'VOD.L': 'Vodafone' };
const comps = Object.keys(PAIS).map((k) => {
  const y = Y[k]; const t = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  // BPA de los próximos 12 meses: ejercicio a diciembre → 0,2 × 2026 + 0,8 × 2027; Vodafone (marzo) → 5,3/12 × FY3/27 + 6,7/12 × FY3/28.
  const w0 = k === 'VOD.L' ? 5.3 / 12 : 0.2;
  const bpaNtm = w0 * t['0y'].bpa + (1 - w0) * t['+1y'].bpa;
  // Precio en la divisa del BPA (Vodafone cotiza en peniques y da el BPA en euros).
  const precio = k === 'VOD.L' ? y.precio / 100 / 0.84205 : y.precio;
  const per = bpaNtm > 0 && t['0y'].bpa > 0 ? r1(precio / bpaNtm) : null; // Sunrise: pérdida en 2026, fuera
  const capCHF = y.cap * (k === 'VOD.L' ? FX.GBP : FX[y.divisa]) / 1e6;
  return { nombre: NOMBRE[k], ticker: k.split('.')[0], pais: PAIS[k], capitalizacion: Math.round(capCHF), ev_ventas: y.ev && y.ventas ? r2(y.ev / (y.ventas * (k === 'VOD.L' ? 1 / 0.84205 * 1 : 1)) ) : null,
    ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: per, crecimiento_pct: t['+1y'].crec_ventas != null ? r1(t['+1y'].crec_ventas * 100) : null,
    margen_ebitda_pct: y.margen_ebitda ? r1(y.margen_ebitda * 100) : null, roic_pct: null,
    dn_ebitda: y.deuda != null && y.ebitda ? r1((y.deuda - (y.caja ?? 0)) / y.ebitda) : null, fcf_yield_pct: y.fcf && y.cap ? r1(y.fcf / y.cap * 100) : null };
});
// Vodafone: Yahoo da capitalización y EV en GBP y ventas en EUR; el EV/ventas se recalcula en la misma divisa.
{ const v = comps.find((x) => x.ticker === 'VOD'); const y = Y['VOD.L']; v.ev_ventas = r2((y.ev / 0.84205) / y.ventas); }
const perList = comps.map((x) => x.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const perMed = perList.length % 2 ? perList[(perList.length - 1) / 2] : r1((perList[perList.length / 2 - 1] + perList[perList.length / 2]) / 2);
const hora = new Date(s.hora * 1000).toISOString().slice(11, 16);
const bol = B.bolsa;
const D = {
  _estado: `Completa. Precio de cierre del 19-oct-2026 (672,00 CHF); la sesión del 20-oct estaba abierta (672,00 CHF a las ${hora} UTC en Yahoo; 671,50 en movimiento.mjs). Mediana del PER NTM de los comparables (sin Sunrise, en pérdidas): ${perMed}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Swisscom AG', nombre_corto: 'Swisscom', ticker: 'SCMN', isin: 'CH0008742519', mercado: 'SIX Swiss Exchange', indice_referencia: 'SMIM (SMI hasta el 18-sep-2026); SPI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Servicios de comunicación', industria: 'Servicios de telecomunicaciones integrados', sede: 'Ittigen (Berna)', fundacion: '1998', empleados: 23266, web: 'https://www.swisscom.ch',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 51.80, capitalizacion_publicada: Math.round(s.cap / 1e6), free_float_pct: 49.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M CHF/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'Guía de 2026 (12-feb-2026, confirmada el 6-ago): ventas de 14.700-14.900 M CHF, EBITDAaL de 5.000-5.100 M, inversión de 3.000-3.100 M, flujo operativo libre ≈ 2.000 M, deuda neta / EBITDA ≈ 2,3 veces (≈ +0,3 si se firma el acuerdo de torres con TIM) y dividendo de 27 CHF; Suiza EBITDAaL ≈ 3.300 M; Italia 1.800-1.900 M EUR; sinergias de más de 300 M EUR en 2026 y ≈ 600 M anuales en 2029 [8, 12].',
    estimaciones: [
      { periodo: '2026e', ingresos: 14714, ebitda: 5079, ebit: 2028, bpa: r2(1380 / 51.80), dpa: 26.9, fuente: 'Consenso recopilado por Swisscom, 15 analistas, 8-oct-2026 (EBITDA = EBITDAaL; EBIT NIIF) [3]' },
      { periodo: '2027e', ingresos: 14640, ebitda: 5092, ebit: 2105, bpa: r2(1474 / 51.80), dpa: 28.1, fuente: 'Ídem [3]' },
      { periodo: '2028e', ingresos: 14644, ebitda: 5223, ebit: 2270, bpa: r2(1616 / 51.80), dpa: 29.0, fuente: 'Ídem [3]' },
      { periodo: '2029e', ingresos: 14678, ebitda: 5306, ebit: 2369, bpa: r2(1698 / 51.80), dpa: 29.8, fuente: 'Ídem [3]' },
    ],
    recomendaciones: { n_analistas: s.reco.strongBuy + s.reco.buy + s.reco.hold + s.reco.sell + s.reco.strongSell, comprar: s.reco.strongBuy + s.reco.buy, mantener: s.reco.hold, vender: s.reco.sell + s.reco.strongSell, po_medio: r2(s.po_medio), po_min: s.po_min, po_max: s.po_max },
    revisiones: `El consenso de la empresa sube poco: EBITDAaL de 2026 de 5.042 M (8-jul) a 5.079 M (8-oct) tras el 1S26, y beneficio de 2026 de 1.396 a 1.380 M; 2028 se mantiene (1.632 → 1.616 M) [3]. En Yahoo el BPA de 2026 está en ${n2(r2(ts['0y'].bpa))} CHF (${n2(r2(ts['0y'].bpa_hace90))} hace 90 días) y el de 2027 en ${n2(r2(ts['+1y'].bpa))} (${n2(r2(ts['+1y'].bpa_hace90))}); el de 2027 de Yahoo (11 analistas) está un 10 % por encima del de la empresa (28,46), que se toma como referencia por ser más completo y reciente [2, 3]. Ningún analista recomienda comprar: 7 mantener y 10 vender en Yahoo, objetivo medio de ${n2(r2(s.po_medio))} CHF (460-735), un 14 % bajo el precio [2]. Bloomberg (7-oct): 0 % comprar, 48 % mantener, 52 % vender [3]. Rebajas recientes: Morgan Stanley (infraponderar, 30-sep), Kepler (reducir, 29-sep), Oddo (peor que el mercado, 28-sep), AlphaValue (reducir, 1-oct), New Street (vender, 3-sep); UBS pasó de comprar a neutral con objetivo de 735 [3, 10].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Alta',
  },
  bolsa: {
    ...bol,
    posicion_corta_pct: null,
    comentario: 'Rentabilidad total del +21,3 % en lo que va de 2026 frente al +11,3 % del SPI y el +10,7 % de las telecos europeas, y del +17,8 % en 12 meses; a 3 años, +12,2 % anual frente al +15,8 % del índice [1]. La subida de enero-febrero (+25 %) vino con los resultados de 2025 y la subida del dividendo de 22 a 26 CHF; después la acción se ha movido en 610-727 CHF [1, 12]. Beta muy baja (0,46 mensual a 5 años; 0,29 semanal) y volatilidad del 18 %: se comporta como un bono con dividendo [1]. Sin registro público de posiciones cortas en Suiza.',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: 2.2, var_3m_pct: 7.4, var_6m_pct: 2.4, var_12m_pct: 14.0, dist_max_52s_pct: -7.6, dist_min_52s_pct: 22.3, dist_max_historico_pct: -7.6, tendencia: 'lateral', volatilidad_60d_pct: 22.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'ene-feb 2026', var_pct: 25.4, causa: 'Rotación a valores defensivos y de dividendo y resultados de 2025 (12-feb): guía de 2026 en línea, dividendo de 26 CHF (desde 22) y 27 propuestos para 2026; máximo de varios años de 674 CHF el 11-feb [12, 10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-abr 2026', var_pct: -10.5, causa: 'Fecha ex del dividendo de 26 CHF (27-mar, −3,9 % ese día) y recogida de beneficios con rebajas de analistas (Morgan Stanley: valoración y riesgos de Italia); mínimo de seis meses de 628 CHF [12, 10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun 2026', var_pct: -6.7, causa: 'Bajada sin hecho de la empresa (mayor caída de un mes −8,0 % hasta el 18-jun); el sector y la revisión de índices de SIX (anuncio del 8-jul de la salida del SMI) pesaron después; causa concreta no encontrada en tres búsquedas (notas de la empresa, cash.ch, titulares de Seeking Alpha) [9, 7].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep 2026', var_pct: -3.4, causa: 'Salida del SMI efectiva el 21-sep: ventas de los fondos indexados el 18-sep (−3,4 % ese día) y −2,7 % el 28-sep con rebajas de Oddo, Kepler y Morgan Stanley [7, 3].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: 5.9, causa: 'Recuperación tras la salida del índice; anulación de la multa de la COMCO por la fibra y acuerdo con el Supervisor de Precios [13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-14', tipo: 'demanda o regulador', hecho: 'El Tribunal Administrativo Federal anula la multa de 18,4 M CHF de la COMCO por la construcción de la fibra; otros procedimientos de la COMCO siguen abiertos [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-09', tipo: 'demanda o regulador', hecho: 'Acuerdo con el Supervisor de Precios: tope de 24 CHF/mes de la fibra oscura prorrogado dos años [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'recomendación', hecho: 'Consenso de 15 analistas: beneficio de 1.380 M en 2026 y 1.616 M en 2028; rebajas de Morgan Stanley, Kepler, Oddo y AlphaValue a finales de septiembre; 0 % comprar en Bloomberg [3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-21', tipo: 'rumor', hecho: 'Sale del SMI y entra en el SMIM (revisión de SIX); los fondos indexados ya vendieron el 18-sep [7].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'resultados', hecho: '1S26: EBITDAaL +3,4 %, BPA 12,92 CHF; guía confirmada; sinergias de 166 M EUR [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-14', tipo: 'demanda o regulador', hecho: 'La AGCM abre investigación a fondo del acuerdo de torres y red con TIM; decisión prevista hacia abril de 2027 [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-03-25', tipo: 'accionista de referencia', hecho: 'Junta: dividendo de 26 CHF aprobado; la Confederación mantiene el 50,95 % [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-11-19', tipo: 'accionista de referencia', hecho: 'Objetivos estratégicos del Consejo Federal 2026-2029: deuda ≤ 2,4 veces, sin compras grandes en el extranjero [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 3T26 el 5-nov-2026 (consenso de EBITDAaL del trimestre: 1.291 M) [3].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está lateral: +2,2 % en un mes y un 7,6 % bajo el máximo de 52 semanas (727 CHF, 10-mar), sin avisos P de la herramienta [9]. Los movimientos fuertes tienen causa conocida: la subida de enero-febrero (dividendo y rotación defensiva), la fecha ex del dividendo, las rebajas de analistas por valoración y la salida del SMI, ya ejecutada el 18-sep [7, 10]. No hay colocación de la Confederación (no puede bajar del 50 %), ampliación ni oferta posibles; la decisión de la AGCM (hacia abril de 2027) y los procedimientos de la COMCO no tienen fecha cercana. Los resultados del 5-nov no aplazan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2021).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año (Yahoo [1]). En base adelantada (precio de cierre ÷ BPA del año siguiente), Swisscom cotizó a 13,5-17,6 veces de 2016 a 2023 y a 20,6 veces a final de 2024, porque el BPA de 2025 cayó a 24,54 CHF por la amortización de los activos de Vodafone Italia, los intereses de la deuda nueva y la integración, y el precio no bajó; a final de 2025, ≈ 22 veces el BPA de 2026e. Hoy ≈ 24-25 veces nuestro BPA de los próximos 12 meses: el mercado paga por el dividendo y los tipos suizos casi nulos, no por crecimiento.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Operadores integrados europeos cotizados con datos completos en Yahoo [2]: Sunrise (el rival suizo), TIM (rival en Italia), Deutsche Telekom, Orange, Telefónica, Vodafone, KPN, Proximus, Telenor, Telia, Tele2 y Elisa. Se excluye INWIT (torres, otro negocio). Sunrise no entra en la mediana del PER (pérdida en 2026). El EV/EBITDA de Yahoo es en base NIIF 16 (EBITDA antes de arrendamientos) y no se puede comparar con el EBITDAaL de este informe: no se usa (ni el de los últimos ni el de los próximos 12 meses); el consenso de EBITDA de la empresa sí es EBITDAaL, la misma base que las cuentas. Capitalización en millones de CHF al tipo del BCE del 19-oct [6].',
    empresas: comps,
    comentario: `Swisscom cotiza a ≈ 24 veces el BPA de los próximos 12 meses del consenso de la empresa (672 ÷ 28,1) frente a una mediana de ${n2(perMed)} veces de las telecos europeas [2, 3]. La prima tiene parte de razón: el bono suizo a 10 años rinde un 0,59 % frente al 2,6-3 % del alemán, el riesgo de Swisscom es de calificación A y la Confederación garantiza la estabilidad [4]. Pero es muy grande: incluso los nórdicos de más calidad (Telia, Tele2, Elisa) cotizan a 14-18 veces. Su EV/EBITDA de Yahoo (11,8 en base NIIF 16) también está entre los más altos del grupo [2]. Múltiplo de referencia de los comparables: ${n2(perMed)} veces, que el motor usa como suelo del alcista; pesa poco porque los tipos suizos no son los europeos.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-03', objetivo: 'Vodafone Italia', comprador: 'Swisscom', ev: 7454, ev_ventas: null, ev_ebitda: 7.8, prima_pct: null, excluir: false, comentario: '8.000 M EUR de valor empresa; 7,8 veces el EBITDAaL antes de sinergias y 5,1 con ellas [11].' },
      { fecha: '2020-11', objetivo: 'Sunrise', comprador: 'Liberty Global (UPC)', ev: null, ev_ventas: null, ev_ebitda: 10.4, prima_pct: null, excluir: false, comentario: 'EV/EBITDAaL antes de sinergias [11].' },
      { fecha: '2018-05', objetivo: 'Negocios de Liberty Global en Alemania y Europa del Este', comprador: 'Vodafone', ev: null, ev_ventas: null, ev_ebitda: 11.7, prima_pct: null, excluir: false, comentario: '[11]' },
      { fecha: '2018-01', objetivo: 'Com Hem', comprador: 'Tele2', ev: null, ev_ventas: null, ev_ebitda: 12.6, prima_pct: null, excluir: false, comentario: '[11]' },
      { fecha: '2015-12', objetivo: 'BASE', comprador: 'Telenet', ev: null, ev_ventas: null, ev_ebitda: 7.7, prima_pct: null, excluir: false, comentario: '[11]' },
      { fecha: '2015-01', objetivo: 'EE', comprador: 'BT', ev: null, ev_ventas: null, ev_ebitda: 7.9, prima_pct: null, excluir: false, comentario: '[11]' },
      { fecha: '2014-09', objetivo: 'Jazztel', comprador: 'Orange', ev: null, ev_ventas: null, ev_ebitda: 13.4, prima_pct: null, excluir: false, comentario: '[11]' },
      { fecha: '2014-03', objetivo: 'Ono', comprador: 'Vodafone', ev: null, ev_ventas: null, ev_ebitda: 10.6, prima_pct: null, excluir: false, comentario: '[11]' },
    ],
    comentario: 'Compras de operadores convergentes en Europa a 7,7-13,4 veces el EBITDAaL antes de sinergias (media de 10,6) [11]. No sirven para valorar Swisscom: la Confederación debe tener la mayoría por ley y no puede haber una oferta de control. Sirven para ver que Vodafone Italia se compró barata (7,8 veces).',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'bolsa', campo: 'causa concreta de la caída de junio de 2026', tipo: 'Complemento', intentos: '1) notas de la empresa de junio de 2026 (ninguna); 2) cash.ch; 3) titulares de Seeking Alpha (RSS)', decision: 'Se explica como movimiento de mercado y sector, sin causa concreta' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) SIX (no hay registro público); 2) FINMA; 3) búsqueda web', decision: 'Omitido: en Suiza no hay registro público de cortos' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y artículos sobre Swisscom (SCMWY), nov-2025 a ago-2026 («Valuation Disconnect Means That I\'d Stay Away», 25-may-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/SCMWY.xml' },
  { id: 2, titulo: 'cash.ch: «Swisscom und die Kurshausse — wieviel Steigerung geht noch?» y «Aktie auf Sechs-Monate-Tief: SMI-Dividendenperle im Anlegerfokus»', editor: 'cash.ch', tipo: 'Prensa', fecha: '2026-04', url: 'https://www.cash.ch/news/top-news/swisscom-und-die-kurshausse-wieviel-steigerung-geht-noch-912820' },
  { id: 3, titulo: 'Swisscom en getquin (comunidad de inversores particulares)', editor: 'getquin', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://app.getquin.com/de/aktie/CH0008742519/swisscom' },
  { id: 4, titulo: 'theScreener en cash.ch (valoración «ligeramente infravalorada», revisiones de beneficio a la baja desde el 7-jul-2026)', editor: 'cash.ch / theScreener', tipo: 'Analistas', fecha: '2026-08-04', url: 'https://www.cash.ch/aktien/swisscom-n-874251/eux/chf' },
];
const E = {
  _estado: 'Parcial. Titulares de Seeking Alpha, prensa suiza (cash.ch) y comunidades de particulares; sin flujo en Stocktwits (no hay símbolo con actividad) y Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-08', n_comentarios: 3, tono: 'Negativo', resumen: 'Poca cobertura; el último artículo de opinión (25-may-2026) recomienda mantenerse fuera por la desconexión entre valoración y crecimiento; antes, uno más positivo sobre las sinergias de Vodafone Italia [1].' },
      { plataforma: 'cash.ch (prensa y comentarios de lectores)', fecha: '2026-04', n_comentarios: 6, tono: 'Dividido', resumen: 'Los particulares suizos la ven como «perla del dividendo» y refugio; la prensa recoge las rebajas por valoración (Morgan Stanley, ZKB) y la duda sobre cuánto más puede subir tras el +25 % de enero-febrero [2].' },
      { plataforma: 'getquin', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Inversores de dividendos que la mantienen a largo plazo; poco debate sobre Italia [3].' },
    ],
    temas: [
      { tema: 'Dividendo seguro y creciente (26 → 27 CHF)', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto pero ajustado: el dividendo se lleva ≈ 80-90 % del flujo libre y del beneficio; subirlo más exige que Italia mejore [A].' },
      { tema: 'Valoración cara frente a las telecos europeas', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos lo apoyan: ≈ 24 veces el BPA frente a ≈ 13 de la mediana europea; la prima solo la justifican los tipos suizos [D].' },
      { tema: 'Italia: sinergias frente a guerra de precios', postura: 'Dividida', peso: 'Medio', contraste: 'Las sinergias van por delante del plan (166 M EUR en el 1S26), pero las ventas italianas caen un 3,3 % [A].' },
      { tema: 'Salida del SMI', postura: 'Bajista', peso: 'Bajo', contraste: 'Ventas de fondos indexados ya ejecutadas el 18-sep; efecto pasado [D].' },
    ],
    lectura: 'Los particulares suizos siguen viendo a Swisscom como un bono con dividendo y no la venden; los analistas, casi todos en mantener o vender, hablan solo de valoración. Ni euforia ni capitulación: no hay una oportunidad de sentimiento que aprovechar. Lo que el sentimiento no recoge y el informe sí: que el ROIC del grupo cayó al ≈ 6 % con Italia. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'foros con volumen (Stocktwits, Reddit)', tipo: 'Complemento', intentos: '1) Stocktwits (sin símbolo SCMWY con actividad); 2) Reddit (no abre sin sesión); 3) búsqueda web de foros suizos (cash.ch, getquin)', decision: 'Se usan cash.ch, getquin y Seeking Alpha' },
  ],
  fuentes: fE,
};
// Citas a otras notas: se sustituyen por fuentes propias de E.
E.sentimiento.temas[0].contraste = E.sentimiento.temas[0].contraste.replace('[A]', '[2]');
E.sentimiento.temas[1].contraste = E.sentimiento.temas[1].contraste.replace('[D]', '[4]');
E.sentimiento.temas[2].contraste = E.sentimiento.temas[2].contraste.replace('[A]', '[1]');
E.sentimiento.temas[3].contraste = E.sentimiento.temas[3].contraste.replace('[D]', '[2]');
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm} (${x.capitalizacion})`).join(', '));
