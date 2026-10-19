// Notas A-E de KION GROUP AG (Xetra KGX, Yahoo KGX.DE). Corte 2026-10-19 (lunes; sesión sin cerrar: último cierre, 16-oct, 34,09 EUR).
// Cifras en millones de EUR, NIIF-UE, ejercicio a 31 de diciembre. filings.xbrl.org no tiene emisores alemanes (cuentas.mjs --esef falló
// con el LEI 5299005KY91C4C6U9H17): las cuentas salen de los Excel oficiales «All tables» de los informes anuales 2022-2025 y semestral
// 1S26 de KION, comprobados contra los PDF del informe anual 2025 y 2024.
// Definición de EBITDA de este informe: EBIT publicado + amortización y deterioros SIN la depreciación de la flota de alquiler y de
// arrendamiento operativo (que KION sí suma en su EBITDA). Ver financieros.ajustes.
// Ejecutar: node informes/kion-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const bolsa = lee('bolsa.json');
const comps = lee('comparables-yahoo.json');
const r1 = (x) => Math.round(x * 10) / 10;
const RK = 'https://reports.kiongroup.com';
const KW = 'https://www.kiongroup.com/KION-Website-Main/Investor-Relations/Reports-Presentations';

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (informe anual con cuentas consolidadas NIIF-UE, notas, informe de gestión, gobierno corporativo y opinión de KPMG)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${RK}/2025/ar/_assets/downloads/2025-Q4_Annual-Report_KION_Group.pdf` },
  { id: 2, titulo: 'Annual Report 2025, «All tables» (Excel con todas las tablas del informe anual: cuenta, balance, flujos, segmentos, arrendamientos, deuda)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${RK}/2025/ar/` },
  { id: 3, titulo: 'Annual Report 2024 (PDF) y «All tables» (Excel)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-02-27', url: `${RK}/2024/ar/_assets/downloads/2024-Q4_Annual-Report_KION_Group.pdf` },
  { id: 4, titulo: 'Annual Report 2023, «All tables» (Excel): ejercicios 2023 y 2022', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2024-02-29', url: `${RK}/2023/ar/` },
  { id: 5, titulo: 'Annual Report 2022, «All tables» (Excel): ejercicios 2022 y 2021', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2023-03-02', url: `${RK}/2022/ar/` },
  { id: 6, titulo: 'Interim Report Q2 2026 (informe semestral 1S26, cuentas resumidas NIIF, segmentos, deuda, partes vinculadas y previsión)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/2026-Q2_Interim-report_KION.pdf` },
  { id: 7, titulo: 'Quarterly Statement Q1 2026', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-04-29', url: `${RK}/2026/ir/1/_assets/downloads/2026-Q1_Quarterly-Statement_KION.pdf` },
  { id: 8, titulo: 'Quarterly Statement Q3 2025 y «All tables» 9M25', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-10-30', url: `${RK}/2025/ir/3/_assets/downloads/2025-Q3_Quarterly-Statement_KION_Group.pdf` },
  { id: 9, titulo: 'Interim Report Q2 2025 (1S25)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-07-31', url: `${RK}/2025/ir/2/_assets/downloads/2025-Q2_Interim-Report_KION_Group.pdf` },
  { id: 10, titulo: 'FY2025 Leasing Deep Dive (presentación del negocio de alquiler y arrendamiento: flota, financiación, derechos de cobro, efecto en EBITDA y FCF)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${KW}/2025-Reports-Presentations/FY-2025/FY2025-Leasing-Deep-Dive_KION_Group.pdf` },
  { id: 11, titulo: 'Q2 2026 Update Call (presentación de resultados del 2T26)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/20260730_KION-Group-Update-Call-Q2-2026.pdf` },
  { id: 12, titulo: 'Nota de prensa de resultados del 2T26 (previsión de 2026 rebajada en el techo; compra del 70 % de Smart Innovation)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/3007_KION-GROUP-AG_Press-Release_Q2-2026.pdf` },
  { id: 13, titulo: 'EQS-Ad hoc: «KION adjusts outlook for fiscal year 2026 and defers expected timing of mid-term targets beyond 2027» (cifras provisionales del 3T26)', editor: 'KION GROUP AG (EQS)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.tradingview.com/news/eqs:707544e05094b:0-kion-group-ag-kion-adjusts-outlook-for-fiscal-year-2026-and-defers-expected-timing-of-mid-term-targets-beyond-2027/' },
  { id: 14, titulo: 'Interim Report Q2 2026, «All tables» (Excel: trimestres, EBITDA ajustado por segmento, no recurrentes, FCF)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/` },
];

// Cuenta (EBITDA del informe = EBIT + amortización sin flota). No recurrentes en el EBITDA: diferencia entre el EBITDA ajustado de KION y su EBITDA publicado (PPA ≈ 0 en EBITDA) [A1-A5].
const C = [
  ['2021', 10294.3, 7770.7, 1585.2, 415.2, 794.8, 1210.0, -38.7, -35.1, 759.7, 191.7, -0.3, 568.3, 4.34, 1.50, 84.1],
  ['2022', 11135.6, 9011.5, 1774.6, 469.7, 168.3, 638.0, 16.9, -30.2, 138.0, 32.2, 7.8, 98.0, 0.75, 0.19, 117.4],
  ['2023', 11433.7, 8652.5, 1904.2, 485.5, 660.6, 1146.1, 32.6, -200.8, 459.8, 145.4, 8.6, 305.8, 2.33, 0.70, 252.8],
  ['2024', 11503.2, 8409.7, 2041.4, 546.3, 777.8, 1324.1, 28.0, -188.0, 589.8, 220.5, 8.9, 360.3, 2.75, 0.82, 315.7],
  ['2025', 11297.2, 8347.0, 2196.2, 588.5, 500.9, 1089.4, 166.9, -147.4, 353.5, 113.0, 10.4, 230.1, 1.75, 0.62, 297.2],
];
const cuenta = C.map(([periodo, ingresos, coste_ventas, gastos_generales, amortizaciones, ebit, ebitda, nr, rf, bai, imp, mino, neto, bpa, dpa, gf]) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda, amortizaciones, ebit, resultado_financiero: rf, bai, impuestos: imp, minoritarios: mino,
  beneficio_neto: neto, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: 131.1,
}));

const B = [
  ['2021', 15850.9, 4697.9, 5105.3, 10682.0, 3544.8, 2165.9, 3381.8, 1632.1, 1339.2, 1443.7, 519.1, 854.8, 483.0, 1050.5, 2319.3, 5177.2, -8.3, 1699.2],
  ['2022', 16599.4, 5186.7, 4950.8, 10991.6, 3619.4, 2162.1, 3555.0, 1804.6, 1667.3, 1124.3, 528.8, 826.1, 318.1, 1988.6, 2453.4, 5608.7, -0.9, 1600.5],
  ['2023', 17388.4, 5223.3, 4972.8, 11615.7, 3558.0, 2106.9, 3942.6, 1817.1, 1755.8, 1194.0, 403.3, 773.3, 311.8, 1522.4, 2797.4, 5766.8, 5.9, 1867.3],
  ['2024', 18805.4, 5569.0, 5510.2, 12598.3, 3648.2, 2166.7, 4422.8, 1748.6, 1695.6, 1160.4, 278.1, 778.6, 787.0, 1700.3, 3179.0, 6189.4, 17.7, 2135.7],
  ['2025', 18294.9, 5080.8, 5106.8, 12171.9, 3450.9, 2022.4, 4542.5, 1631.7, 1528.3, 1255.4, 259.1, 655.3, 474.9, 1058.9, 3266.8, 6097.9, 25.1, 2268.9],
];
const balHist = B.map(([periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores, activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas]) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio, intangibles, inmovilizado_material, existencias, clientes, proveedores,
  activos_contrato, pasivos_contrato, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas,
}));

const F = [
  ['2021', 881.7, 333.8, 132.9, 17.0, 0, 53.7, 39.1],
  ['2022', -345.9, 382.7, 135.6, 4.9, 0, 196.7, 44.2],
  ['2023', 1144.0, 442.8, 135.8, 2.8, 0, 24.9, 82.1],
  ['2024', 1170.6, 462.9, 147.3, 36.7, 10.3, 91.8, 85.6],
  ['2025', 1131.8, 395.7, 187.6, 34.6, 0, 107.5, 77.6],
];
const flujos = F.map(([periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, intereses_en_financiacion]) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones, desinversiones, dividendos, recompras: 0, emision_acciones: 0, intereses_en_financiacion,
}));

const trimestres = [
  ['4T24', 3067.9, null, 358.6, 0.85, null],
  ['1T25', 2788.1, -2.5, 111.6, -0.36, null],
  ['2T25', 2708.2, -5.9, 300.4, 0.72, null],
  ['3T25', 2704.0, 0.2, 330.3, 0.87, null],
  ['4T25', 3096.8, 0.9, 347.2, 0.53, null],
  ['1T26', 2771.4, -0.6, 320.0, 0.69, null],
  ['2T26', 2915.9, 7.7, 352.2, 0.86, null],
  ['3T26 (avance)', 2835, 4.8, null, null, 'Inferior'],
].map(([periodo, ingresos, crecimiento_pct, ebitda, bpa, vs]) => ({
  periodo, ingresos, crecimiento_pct, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: ebitda ? r1((ebitda / ingresos) * 100) : null, bpa, vs_consenso: vs,
}));

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 11488.2, ebitda: 1349.7, ebit: 740.3, beneficio_neto: 385.5, bpa: 2.94, dpa: 0.62, dpa_extraordinario: 0, fcf: 318, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -29.7 },
    cambios_perimetro: [],
    comentario: 'KION vende unos 11.300-11.500 M EUR al año desde 2022 y no crece: +2,5 % anual de 2021 a 2025 (10.294 → 11.297 M), con un 2025 que cayó un 1,8 % [A1, A5]. El EBIT ajustado de KION pasó de 842 M (8,2 %) en 2021 a 292 M en 2022 (inflación de costes con pedidos a precio cerrado y la crisis de las cadenas de suministro en Dematic), se recuperó a 917 M (8,0 %) en 2024 y bajó a 789 M (7,0 %) en 2025 [A1, A3]. El EBIT publicado de 2025 (500,9 M) lleva 201,1 M de no recurrentes (sobre todo 168,8 M del programa de eficiencia aprobado el 4-feb-2025: unos 2.000 puestos y la reorganización de la red europea) y 86,6 M de amortización de la asignación del precio de compra de Linde y Dematic [A1]. En el EBITDA de este informe los no recurrentes son 166,9 M en 2025, 28,0 M en 2024 y 32,6 M en 2023; en 2021 hubo un ingreso neto (−38,7 M) [A1-A5]. Los gastos financieros incluyen los intereses de los arrendamientos de compra y de alquiler; el resultado financiero empeoró de −35 M en 2021 a −201 M en 2023 por la subida de tipos sobre la financiación de la flota y mejoró a −147 M en 2025 [A1]. El beneficio atribuido fue de 230 M (1,75 EUR por acción) en 2025 y de 386 M en los últimos 12 meses a junio de 2026 [A1, A6].',
    ajustes: 'Cifras publicadas (NIIF-UE) con un ajuste de definición: el EBITDA de KION suma la depreciación de su flota de alquiler a corto plazo y de las carretillas cedidas en arrendamiento operativo (611,2 M en 2025, el 5,4 % de las ventas), que es un coste recurrente de un negocio de alquiler [A1, A10]. Aquí el EBITDA es el EBIT publicado más la amortización y los deterioros del resto del inmovilizado, intangibles y derechos de uso (588,5 M en 2025): 1.089,4 M frente a 1.700,6 M del EBITDA publicado por KION. Coherente con eso, los pasivos que financian la flota (alquiler a corto y arrendamiento, netos de los derechos de cobro a clientes) van como deuda en los arrendamientos del balance y en el puente de valoración [A10]. El LTM a junio de 2026 se calcula como 2025 + 1S26 − 1S25 [A6, A9]. El FCF del LTM (≈ 318 M) es el FCF de KION con su definición nueva (569,8 M; desde 2026 incluye la deuda financiera usada para el negocio de arrendamiento) menos el principal (175,7 M) y los intereses (31,1 M) de los arrendamientos de compra y los intereses netos de la financiación (≈ 44,6 M) [A6, A14]. Acciones: 131,1 M en todos los años, sin dilución [A1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trimestres,
    ultima_presentacion: 'En la presentación del 2T26 (30-jul-2026) Rob Smith y Christian Harm destacaron el crecimiento del 7,7 % de las ventas y el margen de EBIT ajustado del 7,7 %, la mejor cifra desde 2024, con el ahorro del programa de eficiencia (unos 150 M anuales, casi todo en 2026) y una cartera récord de 5.070 M [A6, A11]. Al mismo tiempo bajaron el techo de la previsión de 2026 (EBIT ajustado de 850-1.040 a 880-980 M; ventas 11.525-12.025 M) por los pedidos de carretillas más flojos en el 2T con la guerra de Irán y los precios de la energía; la acción cayó un 7,4 % [A11, A12]. Las preguntas se repitieron sobre el margen de ITS (9,0 % en el 1S26 frente al objetivo de dos cifras), la competencia de los fabricantes chinos en Europa, el precio de las carretillas nuevas y la conversión de la cartera de IAS en margen [A11]. La dirección no dio cifras de pedidos de julio. El 2-oct-2026 avisó en la conferencia previa al cierre de que el 3T sería flojo y el 14-oct publicó un anuncio ad hoc: ventas del 3T de unos 2.835 M (+4,8 %) y EBIT ajustado de unos 203 M (consenso de Vara: 211 M), previsión de 2026 rebajada a 11.450-11.750 M de ventas y 815-875 M de EBIT ajustado, y el objetivo de margen de dos cifras aplazado a después de 2027 [A13]. El 3T26 completo se publica el 29-oct.',
    confianza: 'Alta',
  },
  balance: {
    historico: balHist,
    vencimientos: [
      { anio: '2026', importe: 155.0 }, { anio: '2027', importe: 27.5 }, { anio: '2028', importe: 337.8 },
      { anio: '2029', importe: 496.8 }, { anio: '2030', importe: 41.5 }, { anio: '2031+', importe: 500.0 },
    ],
    liquidez: 'Caja de 391 M a 30-jun-2026 y una línea de crédito sindicada de 1.385,7 M sin disponer hasta octubre de 2028 [A6]. En marzo de 2026 emitió un bono de 500 M al 4,125 % con vencimiento en 2031, que usó sobre todo para refinanciar el negocio de arrendamiento [A6].',
    rating: 'Fitch BBB (estable, confirmado en abril de 2026); S&P BB+ (estable, rebajado un escalón en junio de 2025) [A6, A1]',
    coste_deuda_pct: 4.25,
    vida_media_anios: 3.5,
    otros_pasivos: 'Lo grande no es la deuda financiera (1.635 M a junio de 2026) sino la financiación de la flota: 4.540 M de pasivos del negocio de arrendamiento (titulizaciones de 1.456 M y 557 M, ventas con arrendamiento posterior y préstamos), casados con 3.269 M de derechos de cobro de arrendamientos financieros a clientes, más 775 M de pasivos de alquiler a corto y 775 M de arrendamientos de compra (NIIF 16) [A6, A10]. Las pensiones netas son 482 M (527,5 M a cierre de 2025, sobre todo en Alemania y Reino Unido) [A1, A6]. Hay provisiones por el programa de eficiencia pendientes de pago en 2026 [A1].',
    comentario: 'Con la definición de este informe la deuda neta es de unos 4.065 M a junio de 2026 (1.635 de deuda financiera + 2.821 de arrendamientos netos − 391 de caja), unas 3,0 veces el EBITDA de los últimos 12 meses (1.350 M) [A6]. Con la definición de KION (deuda financiera neta de 1.244 M frente a un EBITDA ajustado de 1.922 M) son 0,6 veces; la diferencia es la financiación de la flota, que se paga con las cuotas de los clientes [A6, A10]. El circulante es alto: existencias de 1.782 M y clientes de unos 1.600 M a junio de 2026, con 655 M de anticipos de clientes en IAS [A6]. El patrimonio (6.098 M) es más que la capitalización bursátil (≈ 4.470 M), y el fondo de comercio (3.451 M, el 57 % del patrimonio) es sobre todo de Dematic (1.948 M) [A1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 1.132 M en 2025 y de 1.140-1.170 M en 2023-2024, tras un 2022 negativo (−346 M) por el aumento de existencias y de la flota [A1, A4, A5]. El flujo operativo de KION incluye la inversión en la flota de alquiler a corto (que KION trata como operativa) y el capex de la tabla es solo inmovilizado material e intangible (396 M en 2025) [A1]. El FCF publicado por KION fue de 710 M en 2025, 702 M en 2024 y 715 M en 2023, pero no descuenta los arrendamientos de compra (188 M de principal en 2025) ni los intereses de la financiación (78 M), que en esta tabla van en pagos de arrendamientos e intereses de la financiación [A1]. Con eso queda un FCF de unos 445 M en 2025 (3,9 % de las ventas), ≈ 10 % de la capitalización. Desde 2026 KION incluye en su FCF la deuda que capta para financiar arrendamientos, así que su FCF de 2026 no es comparable con el de años anteriores [A6, A14]. No hay recompras; los dividendos fueron de 108 M en 2025 (0,82 EUR de 2024) [A1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG AG Wirtschaftsprüfungsgesellschaft (socia firmante: Kathrin Rienecker)',
    anios_auditor: 3,
    opinion: 'Favorable sin salvedades en 2025. Asuntos clave de auditoría: test de deterioro del fondo de comercio y reconocimiento de ingresos de proyectos a largo plazo (Dematic) [A1].',
    comentario: 'KPMG audita desde 2023 (antes Deloitte) [A1]. Las cuentas son complejas por tres cosas: la financiación de la flota (KION vende carretillas a entidades financieras que las arriendan a los clientes, o las arrienda ella misma; parte se contabiliza como venta y parte como arrendamiento), los proyectos de Dematic reconocidos por grado de avance (activos por contrato de 259 M) y los ajustes del EBIT (no recurrentes y amortización de la asignación del precio de compra), que en 2025 sumaron 288 M [A1, A10]. Los ajustes no son una costumbre: fueron 28 M en 2024 y se concentran en la reestructuración de 2025. KION cambió en 2026 la definición de su FCF y en 2026 reclasificó algunos gastos entre venta y administración [A6].',
    senales: [
      { senal: 'Fondo de comercio de Dematic (1.948 M) con la capitalización por debajo del patrimonio', nivel: 'Alta', comentario: 'El test de 2025 usa un WACC después de impuestos del 9,9 % para SCS y supone que el margen llega al objetivo de más del 10 % del plan; ese objetivo está aplazado a después de 2027 desde el 14-oct-2026. Un deterioro no afecta a la caja pero sí al beneficio y a los covenants del rating [A1, A13].' },
      { senal: 'Cambio de la definición de FCF en 2026', nivel: 'Media', comentario: 'El FCF de KION incluye desde 2026 la deuda captada para el negocio de arrendamiento: sube el FCF publicado sin más caja libre real [A6, A14].' },
      { senal: 'No recurrentes de 201 M en 2025', nivel: 'Baja', comentario: 'Programa de eficiencia de 168,8 M aprobado el 4-feb-2025, con unos 150 M de ahorro anual; la mayor parte del pago en caja cae en 2026 [A1].' },
      { senal: 'Compras y ventas con el accionista de control (Weichai)', nivel: 'Baja', comentario: 'Ventas a asociadas y otras partes vinculadas (incluye Weichai) de 77,6 M y compras de 46,4 M en el 1S26; informe de dependencia anual revisado por el auditor [A6, A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparte entre el 25 % y el 40 % del beneficio atribuido: 0,62 EUR por acción de 2025 (35 %, 81,3 M) y 0,82 EUR de 2024 (30 %) [A1]. No recompra acciones. Prioridades: inversión en producto y automatización, reducir la deuda y mantener el grado de inversión de Fitch [A1].',
    adquisiciones: [
      { anio: '2016', objetivo: 'Dematic (automatización de almacenes, EE. UU.)', importe: 2930, ev_ebitda: null, financiacion: 'Deuda puente y ampliación de capital (Weichai suscribió su parte)', resultado: 'Hoy es el segmento IAS: 3.071 M de ventas en 2025, pero con un margen de EBIT ajustado del 6,0 % y pérdidas en 2022 por proyectos a precio cerrado; su fondo de comercio (1.948 M) es el riesgo de deterioro del grupo [A1].' },
      { anio: '2026', objetivo: 'Smart Innovation NV (70 %; filial de I+D de Colruyt, carretillas autónomas de palés)', importe: null, financiacion: 'Caja', resultado: 'Compra pequeña de tecnología para carga y descarga autónoma de camiones; importe no publicado [A12].' },
    ],
    comentario: 'La asignación de capital es mediocre. La compra de Dematic en 2016 (unos 2.900 M EUR, 1,8 veces las ventas) dio a KION el liderazgo en automatización, pero diez años después el segmento gana un 6 % de margen y en 2022 perdió dinero [A1]. La ampliación de capital de 2020 y el recorte del dividendo de 2022 (0,19 EUR) fueron para defender el balance en la crisis [A5]. Desde 2023 la caja va a reducir deuda: la deuda financiera bajó de 1.989 M en 2022 a 1.059 M en 2025 [A1, A4]. El ROIC no cubre el coste de capital desde 2021 y la empresa no recompra acciones aunque cotiza por debajo de su patrimonio.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Industrial Trucks & Services (ITS)', descripcion: 'Carretillas elevadoras y de almacén (Linde MH, STILL, Baoli, Fenwick en Francia), con su servicio, recambios, alquiler, carretillas usadas y financiación a clientes.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 6514.0, resultado: 536.0 }, { periodo: '2022', ingresos: 7356.1, resultado: 420.5 }, { periodo: '2023', ingresos: 8479.6, resultado: 848.5 },
        { periodo: '2024', ingresos: 8608.8, resultado: 917.5 }, { periodo: '2025', ingresos: 8272.5, resultado: 721.8 }] },
      { nombre: 'Intelligent Automation Solutions (IAS, antes SCS)', descripcion: 'Dematic: diseño, montaje y servicio de sistemas automatizados de almacén (transportadores, clasificadores, almacenes automáticos, lanzaderas, robots y software). Renombrado IAS el 1-ene-2026 con el mismo perímetro.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: 3796.2, resultado: 409.5 }, { periodo: '2022', ingresos: 3806.9, resultado: -45.6 }, { periodo: '2023', ingresos: 2997.0, resultado: 44.3 },
        { periodo: '2024', ingresos: 2943.2, resultado: 112.9 }, { periodo: '2025', ingresos: 3071.4, resultado: 183.2 }] },
      { nombre: 'Servicios corporativos y consolidación', descripcion: 'Holding, servicios centrales y eliminaciones entre segmentos.', tipo_resultado: 'EBIT', historico: [
        { periodo: '2021', ingresos: -15.9, resultado: -103.6 }, { periodo: '2022', ingresos: -27.4, resultado: -82.5 }, { periodo: '2023', ingresos: -42.8, resultado: -102.4 },
        { periodo: '2024', ingresos: -48.8, resultado: -113.3 }, { periodo: '2025', ingresos: -46.8, resultado: -116.4 }] },
    ],
    geografias: [
      { nombre: 'Europa occidental', peso_pct: 58.7 }, { nombre: 'Norteamérica', peso_pct: 19.3 }, { nombre: 'Europa del Este', peso_pct: 6.9 },
      { nombre: 'China', peso_pct: 5.5 }, { nombre: 'Asia-Pacífico sin China', peso_pct: 5.4 }, { nombre: 'Centro y Sudamérica', peso_pct: 2.7 },
      { nombre: 'Oriente Medio y África', peso_pct: 1.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos del grupo (M EUR)', valor_anterior: '10.320,9 (2024)', valor_actual: '11.705,5 (2025)', variacion: '+13,4 %', comentario: 'Sobre todo IAS (grandes proyectos en Norteamérica); ITS +4,8 % en unidades en el 1S26 [A1, A6].' },
      { kpi: 'Cartera de pedidos (M EUR)', valor_anterior: '4.635,1 (2024)', valor_actual: '5.069,6 (jun-26)', variacion: '+9,4 %', comentario: 'IAS 2.953,5 M y ITS 2.136,5 M a junio de 2026 [A6].' },
      { kpi: 'Carretillas pedidas en ITS (miles)', valor_anterior: '≈ 250 (2024)', valor_actual: '266 (2025)', variacion: '≈ +6 %', comentario: 'El 93 % son eléctricas; el mercado mundial pide un 78 % eléctricas [A1].' },
      { kpi: 'Ingresos de servicio (M EUR)', valor_anterior: '5.299,9 (2024)', valor_actual: '5.448,7 (2025)', variacion: '+2,8 %', comentario: 'ITS 4.200,1 M y SCS 1.248,6 M: el 48 % de las ventas, con más margen que el equipo nuevo [A1].' },
      { kpi: 'Margen de EBIT ajustado de KION', valor_anterior: '8,0 % (2024)', valor_actual: '7,0 % (2025)', variacion: '−1,0 pp', comentario: '1S26: ITS 9,0 % e IAS 6,5 % [A1, A6].' },
      { kpi: 'ROCE (definición de KION)', valor_anterior: '8,7 % (2024)', valor_actual: '7,7 % (2025)', variacion: '−1,0 pp', comentario: 'Previsión de 2026 rebajada a 7,8-8,4 % el 14-oct-2026 [A1, A13].' },
      { kpi: 'Plantilla (equivalentes a tiempo completo)', valor_anterior: '42.719 (2024)', valor_actual: '42.403 (jun-26)', variacion: '−0,7 %', comentario: 'El programa de eficiencia recorta puestos en Europa; crece en IAS [A1, A6].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'cuentas XBRL del regulador', tipo: 'Complemento', intentos: '1) cuentas.mjs --esef "KION GROUP": sin informes con xBRL-JSON para el LEI 5299005KY91C4C6U9H17; 2) filings.xbrl.org por nombre: KION no está (no hay emisores alemanes); 3) Unternehmensregister: sin API sin registro', decision: 'Sustituido por los Excel «All tables» oficiales de KION, comprobados contra los PDF de los informes anuales' },
    { seccion: 'trimestres', campo: 'vs_consenso de 4T24-2T26 y crecimiento orgánico', tipo: 'Complemento', intentos: '1) Notas de prensa de KION: no citan consenso; 2) MarketScreener: sin histórico de sorpresas gratis; 3) prensa: solo el 3T26 (consenso de Vara citado por KION)', decision: 'Omitido salvo el 3T26' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Top 20 lift truck suppliers 2025 (ingresos de 2024 de los fabricantes de carretillas; más de 58.000 M USD el grupo)', editor: 'Modern Materials Handling (Peerless Media)', tipo: 'Sectorial', fecha: '2025-08', url: 'https://www.mmh.com/article/modern_special_report_2025_top_20_lift_truck_suppliers_2025/Lift_Trucks' },
  { id: 2, titulo: 'Interact Analysis bumps up its warehouse automation market forecast (ingresos 2024 +1 %, pedidos 2025 +7 %, 2026 +6 %)', editor: 'Modern Materials Handling', tipo: 'Sectorial', fecha: '2026-01-13', url: 'https://www.mmh.com/article/interact_analysis_bumps_up_its_warehouse_automation_market_forecast' },
  { id: 3, titulo: 'Annual Report 2025: mercados, estrategia, posición competitiva, riesgos, sostenibilidad', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${RK}/2025/ar/_assets/downloads/2025-Q4_Annual-Report_KION_Group.pdf` },
  { id: 4, titulo: 'KION Group Corporate Presentation (julio de 2026)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07', url: 'https://www.kiongroup.com/KION-Website-Main/About-us/KION-at-a-glance/Corporate-Presentation/KION-Group-Corporate-Presentation.pdf' },
  { id: 5, titulo: 'FY2025 Leasing Deep Dive', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${KW}/2025-Reports-Presentations/FY-2025/FY2025-Leasing-Deep-Dive_KION_Group.pdf` },
  { id: 6, titulo: 'Dematic acquired by KION Group (2.100 M USD más deuda; 3.250 M USD de valor de empresa)', editor: 'Supply Chain Management Review', tipo: 'Prensa', fecha: '2016-06', url: 'https://www.scmr.com/article/dematic_acquired_by_kion_group/intralogistics' },
  { id: 7, titulo: 'Interim Report Q2 2026: entorno de mercado (guerra de Irán, energía, aranceles), pedidos de carretillas por región', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/2026-Q2_Interim-report_KION.pdf` },
  { id: 8, titulo: 'Annual Report 2024: historia del grupo y mercados', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-02-27', url: `${RK}/2024/ar/_assets/downloads/2024-Q4_Annual-Report_KION_Group.pdf` },
];
const Bn = {
  _estado: 'completa',
  negocio: {
    descripcion: 'KION GROUP AG (Fráncfort) es el segundo fabricante de carretillas elevadoras del mundo por ingresos, detrás de Toyota Industries, y el primero en Europa, con las marcas Linde Material Handling, STILL, Fenwick y Baoli (marca barata, fabricada en China) [B3]. Es también el mayor proveedor mundial de automatización de almacenes con Dematic, comprada en 2016 [B2, B3]. En 2025 vendió 11.297 M EUR: el 73 % en carretillas y su servicio (ITS) y el 27 % en sistemas de almacén (IAS) [A1]. El 59 % de las ventas se hace en Europa occidental, el 19 % en Norteamérica y el 5,5 % en China [A1]. Hay más de 2 millones de sus carretillas en uso y alrededor de la mitad de las nuevas se venden con arrendamiento [B5]. Tiene 42.400 empleados y fábricas en Alemania (Aschaffenburg, Hamburgo), Francia, Italia, República Checa, China y EE. UU. [B3]. Weichai Power, fabricante chino de motores, tiene el 46,5 % [B3].',
    como_gana_dinero: 'ITS vende carretillas nuevas (contrapesadas eléctricas y diésel, de almacén y apiladoras) con un margen bruto bajo, y gana sobre todo con el servicio: mantenimiento, recambios, alquiler a corto, carretillas usadas y contratos de arrendamiento a 4-5 años, que dan ingresos recurrentes durante la vida de la máquina (8-10 años) [B3, B5]. El servicio es el 48 % de las ventas del grupo [A1]. IAS (Dematic) cobra proyectos de almacén automatizado de 10-200 M por grado de avance, con un margen bajo en el montaje y más alto en el servicio y el software posteriores [B3]. El EBIT ajustado de 2025 fue de 722 M en ITS (8,7 %) y 183 M en IAS (6,0 %); los servicios centrales cuestan unos 116 M [A1].',
    clientes: 'Muy atomizados: fabricantes, distribución, logística, comercio electrónico, alimentación y química. En ITS vende a decenas de miles de empresas a través de su red propia y de concesionarios; en IAS los clientes son grandes distribuidores y operadores logísticos (comercio electrónico, alimentación, moda), con proyectos grandes y más concentrados [B3]. KION no publica ningún cliente por encima del 10 % de las ventas [A1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Intralogística: carretillas elevadoras y de almacén (contrapesadas, retráctiles, transpaletas, apiladoras), con su servicio, alquiler y financiación; y automatización de almacenes (sistemas de transporte, clasificación, almacenamiento automático, robots móviles y software).',
    tamano: 'Más de 58.000 M USD de ingresos de los 18-20 mayores fabricantes de carretillas en 2024 (58.300 M en 2023), incluido su servicio [B1]. La automatización de almacenes es un mercado aparte, de unos 40.000-50.000 M USD según Interact Analysis, que facturó un 1 % más en 2024 y espera pedidos un 7 % mayores en 2025 y un 6 % en 2026 [B2].',
    unidad_serie: 'miles de millones de USD (ingresos de los mayores fabricantes de carretillas, MMH)',
    serie: [{ anio: '2023', tamano: 58.3 }, { anio: '2024', tamano: 58.0 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 4.0,
    cr5_pct: 73,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Inversión industrial y logística en Europa', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El 66 % de las ventas de KION es Europa; los pedidos de carretillas cayeron en el 2T26 con la guerra de Irán y los precios de la energía [A1, B7].' },
      { driver: 'Electrificación', efecto: '+', horizonte: 'Estructural', evidencia: 'El 78 % de los pedidos mundiales de carretillas en 9M25 fueron eléctricas y el 93 % de los de KION; las de litio tienen más precio y servicio [A1, B3].' },
      { driver: 'Automatización y falta de mano de obra en almacenes', efecto: '+', horizonte: 'Estructural', evidencia: 'Pedidos de automatización +7 % en 2025 y +6 % previsto en 2026 [B2]; la cartera de IAS llegó a 2.954 M en junio de 2026 [A6].' },
      { driver: 'Fabricantes chinos (Heli, Hangcha) en Europa', efecto: '−', horizonte: 'Estructural', evidencia: 'Heli y Hangcha venden más unidades que KION (340.000 y 280.000 frente a 263.000) con márgenes del 9-15 % y precios más bajos; presionan el precio del segmento bajo en Europa [B1, B3].' },
      { driver: 'Tipos de interés', efecto: '−', horizonte: 'Cíclico', evidencia: 'Encarecen la financiación de la flota y retrasan proyectos de almacén; el resultado financiero de KION pasó de −35 M en 2021 a −201 M en 2023 [A1].' },
      { driver: 'Comercio electrónico', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Tras el exceso de inversión de 2021-2022 los pedidos de IAS cayeron; vuelven desde 2024 con grandes distribuidores en Norteamérica [A1, B2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Toyota, Jungheinrich, Crown y Mitsubishi Logisnext en carretillas, más los chinos Heli y Hangcha con precios más bajos; en automatización, Daifuku, Vanderlande (Toyota), SSI Schäfer, Knapp, Honeywell Intelligrated y Symbotic [B1, B2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes atomizados en ITS, pero muy grandes y exigentes en IAS (pliegos con precio cerrado) [B3].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Acero, baterías de litio (proveedores chinos), componentes electrónicos; riesgo de precio y de suministro como en 2022, no de poder estructural [A1].' },
      { fuerza: 'Amenaza de nuevos entrantes', intensidad: 2, justificacion: 'La red de servicio y de concesionarios tarda décadas en construirse; los entrantes nuevos son en robots móviles autónomos y software [B3].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Los robots móviles autónomos y los almacenes automáticos sustituyen carretillas manuales; KION los vende también (Linde y STILL automatizadas, Dematic) [B3, B4].' },
    ],
    ciclo: { posicion: 'Fondo del ciclo en Europa', comentario: 'Los pedidos de carretillas cayeron en 2023-2024 en Europa, se recuperaron en 2025 (+6 % en unidades para KION) y volvieron a flojear en el 2T-3T26 con la guerra de Irán [A1, B7]. La automatización sale de su fondo de 2023 con pedidos al alza [B2].' },
    regulacion: 'Normas de seguridad de máquinas de la UE (Reglamento de máquinas 2023/1230, aplicable en 2027), emisiones de motores diésel (Stage V) que favorecen a las eléctricas, y los aranceles y la política comercial de la UE frente a China. Los aranceles de EE. UU. sobre acero y productos europeos afectan a las ventas en Norteamérica [A1, B3].',
    tendencias: 'Tres tendencias: (1) electrificación con baterías de litio y, poco a poco, hidrógeno; (2) automatización de la carretilla (carretillas autónomas, como la compra de Smart Innovation en 2026) y del almacén entero con software de IA para planificar; (3) la llegada de los fabricantes chinos a Europa con carretillas eléctricas baratas, que presiona el precio del segmento bajo, donde compite Baoli [A12, B3, B4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15,
    posicion: 'N.º 2 mundial en carretillas por ingresos (≈ 15 % de los ingresos de los mayores fabricantes, tras Toyota Industries con ≈ 31 %), n.º 1 en Europa y n.º 3 en China; n.º 1 mundial en automatización de almacenes con Dematic [B1, B2, B3].',
    competidores: [
      { nombre: 'Toyota Industries (incluye Raymond, BT, Vanderlande y Bastian)', pais: 'JP', ticker: null, ingresos: 16274, cuota_pct: 31, margen_ebit_pct: null, comentario: 'N.º 1: 18.260 M USD en carretillas y logística en 2024 y 288.262 unidades; excluida de bolsa por Toyota en marzo de 2026 [B1].' },
      { nombre: 'Jungheinrich', pais: 'DE', ticker: 'JUN3.DE', ingresos: 5502, cuota_pct: 9.6, margen_ebit_pct: 4.3, comentario: 'Rival directo en Europa (almacén y eléctricas); también lanzó un aviso en abril de 2026 [B1, D5].' },
      { nombre: 'Crown Equipment (privada)', pais: 'US', ticker: null, ingresos: 4714, cuota_pct: 9.1, margen_ebit_pct: null, comentario: '5.290 M USD en 2024; fuerte en Norteamérica [B1].' },
      { nombre: 'Mitsubishi Logisnext', pais: 'JP', ticker: null, ingresos: 3923, cuota_pct: 7.6, margen_ebit_pct: null, comentario: '4.400 M USD; marcas Cat, UniCarriers, Rocla [B1].' },
      { nombre: 'Hyster-Yale', pais: 'US', ticker: 'HY', ingresos: 3360, cuota_pct: 7.4, margen_ebit_pct: -0.3, comentario: '4.300 M USD en 2024; en pérdidas en 2025 [B1, D5].' },
      { nombre: 'Anhui Heli', pais: 'CN', ticker: '600761.SS', ingresos: 2649, cuota_pct: 4.3, margen_ebit_pct: 9.0, comentario: 'N.º 1 en unidades (340.218 en 2024), exporta a Europa con precios bajos [B1, D5].' },
      { nombre: 'Hangcha Group', pais: 'CN', ticker: '603298.SS', ingresos: 2371, cuota_pct: 3.9, margen_ebit_pct: 14.9, comentario: '280.012 unidades en 2024, el más rentable de los grandes [B1, D5].' },
      { nombre: 'Daifuku', pais: 'JP', ticker: '6383.T', ingresos: 3723, cuota_pct: null, margen_ebit_pct: 16.6, comentario: 'Rival de Dematic en automatización (almacenes, aeropuertos, salas limpias) con mucho más margen [B2, D5].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La base instalada de más de 2 millones de carretillas alimenta el servicio y el mercado de usadas, pero no hay efecto de red entre clientes [B5].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Los contratos de arrendamiento y servicio a 4-5 años y la integración del software de almacén de Dematic atan al cliente; el servicio es el 48 % de las ventas y crece todos los años [A1, B5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Linde y STILL son marcas de referencia en Europa (con prima de precio sobre los chinos) y Dematic lo es en automatización [B3].' },
        { fuente: 'Ventaja en costes', puntuacion: 1, evidencia: 'No la tiene: Heli y Hangcha fabrican más barato y ganan más margen (9-15 % frente al 7 % de KION) [D5].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'La red de servicio propia y de concesionarios en Europa, con más de 2 millones de carretillas en uso, es difícil de copiar y da densidad de rutas [B3, B5].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) los fabricantes chinos (Heli, Hangcha y la propia Baoli de KION compiten en el segmento bajo) entran en Europa con carretillas eléctricas un 20-30 % más baratas, y pueden erosionar el precio de Linde y STILL; (2) en automatización, Symbotic, Ocado, AutoStore y Geek+ venden sistemas de robots más baratos de instalar que los proyectos a medida de Dematic; (3) la caída de pedidos en Europa por la energía y la guerra se alarga [B2, B3, B7].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'KION nació en 2006 cuando Linde AG vendió su división de carretillas (Linde MH, STILL y OM) a KKR y Goldman Sachs. En 2012 Weichai Power entró con el 25 % (y el 70 % de Linde Hydraulics) para salvar un balance muy endeudado; KION salió a bolsa en Fráncfort en junio de 2013. En 2016 compró Dematic por 3.250 M USD, con lo que se convirtió en el líder mundial de automatización de almacenes. Weichai fue subiendo su participación y hoy tiene el 46,5 %. En 2022 los costes de materiales y de energía con contratos a precio cerrado hundieron el beneficio (EBIT ajustado de 292 M) y la acción cayó un 71 %. Rob Smith llegó como consejero delegado en 2022 y, tras dos años de recuperación, en 2025 lanzó un programa de eficiencia de unos 150 M de ahorro anual. En octubre de 2026 aplazó a después de 2027 su objetivo de margen de dos cifras.',
    hitos: [
      { anio: '2006', hito: 'Linde vende su negocio de carretillas a KKR y Goldman Sachs: nace KION.' },
      { anio: '2012', hito: 'Weichai Power compra el 25 % y el 70 % de Linde Hydraulics.' },
      { anio: '2013', hito: 'Salida a bolsa en Fráncfort.' },
      { anio: '2016', hito: 'Compra de Dematic (3.250 M USD de valor de empresa) y ampliación de capital.' },
      { anio: '2020', hito: 'Ampliación de capital en plena pandemia: 131,1 M de acciones desde entonces.' },
      { anio: '2022', hito: 'Crisis de márgenes por costes y proyectos a precio cerrado; Rob Smith, nuevo consejero delegado.' },
      { anio: '2025', hito: 'Programa de eficiencia (≈ 150 M de ahorro anual); alianza con Nvidia y Accenture (desde finales de 2024) para almacenes con IA y gemelos digitales.' },
      { anio: '2026', hito: 'SCS pasa a llamarse IAS; compra del 70 % de Smart Innovation; rebaja de la previsión el 14-oct.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'EcoVadis', calificacion: 'Platino (86/100, el 1 % mejor)', fecha: '2025-12' }],
    materialidad: 'Lo material es el uso de sus productos (el alcance 3 es de 14.694 kt de CO₂e, casi todo por la energía que consumen las carretillas vendidas), la seguridad en el trabajo de los usuarios de carretillas y la cadena de suministro de baterías [A1]. La electrificación (93 % de los pedidos de ITS) reduce las emisiones de uso [A1].',
    controversias: 'Sin controversias graves. El voto sobre el informe de remuneraciones de 2024 en la junta de 2025 tuvo solo un 73,9 % a favor, por los pagos a exconsejeros [C3]. El control por un grupo chino (Weichai) es un punto de atención para algunos inversores y gobiernos europeos [A1].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño de 5 años y tcac histórico', tipo: 'Complemento', intentos: '1) MMH Top 20 2024 y 2025: solo los dos últimos años comparables; 2) WITS/FEM (estadística de pedidos mundiales): datos de pago; 3) informes de KION: dan crecimiento en unidades, no tamaño en valor', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: declaración de gobierno corporativo, consejos, comisiones, independencia, accionistas y partes vinculadas', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-02-26', url: `${RK}/2025/ar/_assets/downloads/2025-Q4_Annual-Report_KION_Group.pdf` },
  { id: 2, titulo: 'Vergütungsbericht 2025 (informe de remuneraciones de 2025)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-04', url: 'https://www.kiongroup.com/KION-Website-Main/Investor-Relations/Shareholders-Meeting/2026/2025-Q4_Verg%C3%BCtungsbericht_KION-Group.pdf' },
  { id: 3, titulo: 'Junta de 2025: informe de remuneraciones de 2024 aprobado con el 73,89 %; sistema de remuneración aprobado en 2024 con el 95,69 %', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-05-27', url: 'https://www.kiongroup.com/en/Investor-Relations/Annual-General-Meeting/' },
  { id: 4, titulo: 'Interim Report Q2 2026 (consejos, partes vinculadas, hechos del semestre)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/2026-Q2_Interim-report_KION.pdf` },
  { id: 5, titulo: 'BlackRock notifica derechos de voto en KION: 3,66 % en total (3,03 % directo) a 6-ago-2026', editor: 'Goldesel (notificación de derechos de voto)', tipo: 'Prensa', fecha: '2026-08', url: 'https://goldesel.de/aktien/news/blackrock-meldet-schwellenberuhrung-bei-kion-group-stimmrechte-insgesamt-366-6-august' },
  { id: 6, titulo: 'Operaciones de directivos (art. 19 MAR) de KION en 2025-2026: compras de Michael Larsson y Valeria Gargiulo', editor: 'EQS / Google News', tipo: 'Prensa', fecha: '2026-03', url: 'https://news.google.com/rss/search?q=KION+GROUP+%22Directors%27+Dealings%22+2026&hl=de&gl=DE&ceid=DE:de' },
  { id: 7, titulo: 'Annual Reports 2022-2024: previsiones anuales y su cumplimiento', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2025-02-27', url: `${RK}/2024/ar/_assets/downloads/2024-Q4_Annual-Report_KION_Group.pdf` },
  { id: 8, titulo: 'EQS-Ad hoc del 14-oct-2026: nueva previsión de 2026 y aplazamiento de los objetivos a medio plazo', editor: 'KION GROUP AG (EQS)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.tradingview.com/news/eqs:707544e05094b:0-kion-group-ag-kion-adjusts-outlook-for-fiscal-year-2026-and-defers-expected-timing-of-mid-term-targets-beyond-2027/' },
  { id: 9, titulo: 'KION: Kion mit positivem ersten Halbjahr 2026 (nota EQS; previsión de julio)', editor: 'Börse Online / dpa-AFX', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.boerse-online.de/dpa-afx/eqs-news-kion-mit-positivem-ersten-halbjahr-2026-deutsch-541403.html' },
];
const Cn = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Rob Smith', cargo: 'Consejero delegado (CEO)', desde: '2022', participacion_pct: null, trayectoria: 'Nacido en 1965, alemán y estadounidense. Consejero delegado desde el 1-ene-2022, con mandato hasta el 31-dic-2029 [C1].' },
      { nombre: 'Christian Harm', cargo: 'Director financiero (CFO)', desde: '2023', participacion_pct: null, trayectoria: 'Nacido en 1968, austríaco. En el consejo de dirección desde el 6-jul-2023, con el mandato prorrogado hasta el 5-jul-2029 [C1].' },
      { nombre: 'Andreas Krinninger', cargo: 'Director de ITS EMEA', desde: '2021', participacion_pct: null, trayectoria: 'Nacido en 1967, austríaco. En el consejo de dirección desde el 1-ene-2021; dirige ITS en Europa, Oriente Medio y África (Linde, STILL, Fenwick) [C1].' },
      { nombre: 'Michael Larsson', cargo: 'Director de IAS (Dematic) e ITS Americas', desde: '2024', participacion_pct: null, trayectoria: 'Nacido en 1965, sueco y estadounidense. En el consejo de dirección desde el 1-ene-2024, con mandato hasta el 31-dic-2026. Compró acciones en septiembre y diciembre de 2025 por 0,72 M EUR [C1].' },
      { nombre: 'Ching Pong Quek', cargo: 'Director de tecnología (CTO) y de ITS APAC', desde: '2013', participacion_pct: null, trayectoria: 'Nacido en 1967, malasio. En el consejo de dirección desde el 11-ene-2013; dirige la tecnología, las compras y la automatización móvil, y el negocio en Asia [C1].' },
      { nombre: 'Valeria Gargiulo', cargo: 'Directora de personas y sostenibilidad (CPSO) y de relaciones laborales', desde: '2023', participacion_pct: null, trayectoria: 'Nacida en 1972, argentina e italiana. Directora de personas y sostenibilidad desde el 1-may-2023, con mandato hasta el 30-abr-2030; compró acciones en marzo de 2026 [C1, C6].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'EBIT ajustado de 1.010-1.150 M (retirada en abril de 2022)', real: '292 M', cumplida: 'No' },
      { anio: '2023', guia: 'EBIT ajustado de al menos 550 M, subida a al menos 780 M', real: '791 M', cumplida: 'Sí' },
      { anio: '2024', guia: 'EBIT ajustado de 790-940 M', real: '917 M; FCF 702 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBIT ajustado de 720-870 M (afinada a 760-820 M); FCF de 400-550 M', real: '789 M; FCF 710 M', cumplida: 'Sí' },
      { anio: '2026', guia: 'Ventas 11.400-12.300 M y EBIT ajustado de 850-1.040 M (julio: 11.525-12.025 / 880-980 M; 14-oct: 11.450-11.750 / 815-875 M)', real: 'Pendiente; rebajada dos veces', cumplida: 'No' },
      { anio: 'Medio plazo', guia: 'Margen de EBIT ajustado de dos cifras en 2027 (plan «Playing to Win»)', real: 'Aplazado a después de 2027 el 14-oct-2026', cumplida: 'No' },
    ],
    comentario: 'El equipo actual (Smith desde 2022) cumplió la previsión de 2023-2025 y recuperó el margen tras el desastre de 2022, sobre todo en caja (FCF de 700 M frente a una guía de 400-550 M en 2025) [C7]. Pero 2026 rompe la racha: la previsión se rebajó en julio y otra vez el 14-oct, y el objetivo de margen de dos cifras se aplaza [C8]. El consejo de dirección no tiene acciones relevantes: las compras de Larsson y Gargiulo suman unos 0,9 M EUR [C6]. La remuneración variable a largo plazo depende del ROCE (50 %) y del rendimiento relativo frente al MDAX (30 %), lo que la alinea con el accionista [C2].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Mohsen Sohi', cargo: 'Presidente del consejo de supervisión', tipo: 'Independiente', desde: '2025', comisiones: 'Ejecutiva y nombramientos (presidente)' },
      { nombre: 'Özcan Pancarci', cargo: 'Vicepresidente (representante de los trabajadores)', tipo: 'Otro externo', desde: null, comisiones: 'Ejecutiva' },
      { nombre: 'Peter Kameritsch', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Auditoría (presidente)' },
      { nombre: 'Sherry A. Aaholm', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Birgit A. Behrendt', cargo: 'Consejera', tipo: 'Independiente', desde: '2015', comisiones: 'Nombramientos' },
      { nombre: 'Alexander Dibelius', cargo: 'Consejero', tipo: 'Independiente', desde: '2007', comisiones: 'Ejecutiva' },
      { nombre: 'Kui Jiang', cargo: 'Consejero (Weichai)', tipo: 'Dominical', desde: null, comisiones: 'Auditoría, ejecutiva' },
      { nombre: 'Shaojun Sun', cargo: 'Consejero (Weichai)', tipo: 'Dominical', desde: null, comisiones: '—' },
      { nombre: 'Xiaomei Zhang', cargo: 'Consejera (Weichai)', tipo: 'Dominical', desde: '2025', comisiones: '—' },
    ],
    presidente_ceo_separados: true,
    presidente_ejecutivo: false,
    consejero_coordinador: false,
    una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false,
    variable_ligado_rentabilidad: true,
    auditoria_independiente: true,
    insiders_sin_operaciones: false,
    accionista_control: true,
    presidente_vinculado_control: false,
    cambios_cupula_24m: 1,
    voto_remuneracion_pct: 73.89,
    voto_remuneracion_contra_pct: null,
    voto_remuneracion_contra_libre_pct: null,
    voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 5.248, fijo: 1.423, variable_corto: 1.225, variable_largo: 2.6, ratio_salario_medio: 63 },
    remuneracion: 'El consejero delegado cobró 5,25 M EUR en 2025: 1,4 M de fijo, 1,2 M de variable anual (ventas, margen de EBIT ajustado, FCF con el 30 % y objetivos ESG) y 2,6 M de variable a largo plazo (ROCE 50 %, rentabilidad relativa frente al MDAX 30 % y ESG) [C2]. Son unas 63 veces el coste medio por empleado (≈ 83 mil EUR). El sistema se aprobó con el 95,7 % en 2024, pero el informe de 2024 solo tuvo el 73,9 % en la junta de 2025 por los pagos a exconsejeros [C3]. No se encontró el resultado de la votación del informe de 2025 en la junta del 28-may-2026.',
    accionistas: [
      { nombre: 'Weichai Power (Luxembourg) Holding (Weichai Power Co., Shandong)', pct: 46.5, tipo: 'Control (industrial, China)', variacion: 'Estable desde 2020; consolida KION en sus cuentas [C1].' },
      { nombre: 'BlackRock', pct: 3.66, tipo: 'Institucional', variacion: 'Entre el 3 % y el 4 % en 2026 (3,03 % directo a 6-ago-2026) [C5].' },
      { nombre: 'Capital flotante', pct: 53.5, tipo: 'Mercado', variacion: 'MDAX [C1].' },
    ],
    insiders: [
      { fecha: '2025-09-26', persona: 'Michael Larsson (consejo de dirección)', operacion: 'Compra', acciones: 5918, importe: 0.332 },
      { fecha: '2025-12-17', persona: 'Michael Larsson (consejo de dirección)', operacion: 'Compra', acciones: 5920, importe: 0.3875 },
      { fecha: '2026-03-25', persona: 'Valeria Gargiulo (consejo de dirección)', operacion: 'Compra', acciones: 3146, importe: 0.144 },
    ],
    control_y_defensas: 'Weichai tiene el 46,5 % y, con la asistencia habitual a la junta (60-70 % del capital), controla de hecho las votaciones; consolida KION y KION publica cada año un informe de dependencia [C1]. Tiene tres de los ocho puestos de los accionistas en el consejo de supervisión; cinco son independientes de Weichai y uno de ellos lo preside [C1]. Con la codeterminación alemana, la mitad del consejo (8 de 16) son trabajadores. No hay acciones de voto múltiple ni blindajes. Una oferta de compra de Weichai por el resto es posible pero no se ha planteado; las autoridades alemanas y de la UE revisarían el control chino de un proveedor de logística crítica [C1].',
    alertas: [
      'Accionista de control chino (46,5 %) con representación en la comisión de auditoría; riesgo de tensiones geopolíticas entre la UE y China [C1].',
      'Voto bajo (73,9 %) al informe de remuneraciones de 2024 [C3].',
      'Dos consejeros considerados independientes llevan 11 y 19 años en el consejo (Behrendt y Dibelius) [C1].',
      'Previsión de 2026 rebajada dos veces y objetivo a medio plazo aplazado [C8].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta de 2026 (informe de remuneraciones de 2025 y aprobación de la gestión)', tipo: 'Complemento', intentos: '1) kiongroup.com, Abstimmungsergebnisse 2026: «Site not found»; 2) página de la junta de 2026: sin el PDF; 3) prensa: solo cifras sueltas sin documento', decision: 'Se usa el voto de 2025 (73,89 %) y la cúpula queda sin dato' },
    { seccion: 'directivos', campo: 'participacion_pct del consejo de dirección', tipo: 'Complemento', intentos: '1) Informe anual 2025: no da tenencias individuales (todas por debajo del 1 %); 2) informe de remuneraciones: sin tenencias; 3) operaciones de directivos: solo compras sueltas', decision: 'Omitido' },
  ],
};
guarda('C', Cn);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de KGX.DE, EXS1.DE (DAX) y EXH4.DE (Stoxx Europe 600 bienes y servicios industriales) hasta el 16-oct-2026; intradía del 19-oct', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/KGX.DE/history' },
  { id: 2, titulo: 'KION GROUP AG: estimaciones 2026-2028 y consenso (15 analistas, objetivo medio 51,40 EUR, 37-63)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/KION-GROUP-AG-13495387/consensus/' },
  { id: 3, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A): 3,45 % el 16-oct-2026', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://api.statistiken.bundesbank.de/rest/download/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lang=en' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Comparables: cotización, valor de empresa, ventas, EBITDA, BPA esperado y balance de 11 fabricantes de intralogística (en EUR)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/JUN3.DE/' },
  { id: 6, titulo: 'KION GROUP AG: revisiones de consenso y cambios de objetivo de los brókeres (DZ, MPCM, Deutsche Bank, Metzler, Citi, JPMorgan)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://ca.marketscreener.com/quote/stock/KION-GROUP-AG-13495387/consensus-revisions/' },
  { id: 7, titulo: 'Columbus McKinnon to combine with Kito Crosby (2.700 M USD, ≈ 8 veces el EBITDA ajustado con sinergias)', editor: 'Columbus McKinnon (Nasdaq)', tipo: 'Primaria', fecha: '2025-02-10', url: 'https://www.nasdaq.com/press-release/columbus-mckinnon-combine-kito-crosby-delivering-compelling-value-creation-2025-02-10' },
  { id: 8, titulo: 'Dematic acquired by KION Group', editor: 'Supply Chain Management Review', tipo: 'Prensa', fecha: '2016-06', url: 'https://www.scmr.com/article/dematic_acquired_by_kion_group/intralogistics' },
  { id: 9, titulo: 'Toyota’s tender offer for Toyota Industries ends in success', editor: 'Adnkronos', tipo: 'Prensa', fecha: '2026-03-24', url: 'https://english.adnkronos.com/2026/03/24/toyotas-tender-offer-for-toyota-industries-ends-in-success-2/' },
  { id: 10, titulo: 'Calendario financiero de KION: resultados del 3T26 el 29-oct-2026', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-10', url: 'https://www.kiongroup.com/en/Investor-Relations/Financial-Calendar/' },
  { id: 11, titulo: 'EQS-Ad hoc del 14-oct-2026 (previsión 2026 y cifras provisionales del 3T26)', editor: 'KION GROUP AG (EQS)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.tradingview.com/news/eqs:707544e05094b:0-kion-group-ag-kion-adjusts-outlook-for-fiscal-year-2026-and-defers-expected-timing-of-mid-term-targets-beyond-2027/' },
  { id: 12, titulo: 'Kion senkt Ziele: Aktien legt nach Absturz zu', editor: 'Vermögenszentrum (AWP/dpa-AFX)', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://www.vermoegenszentrum.ch/boersen-und-maerkte/news/kion-senkt-ziele-aktien-legt-nach-absturz-zu' },
  { id: 13, titulo: 'Kion-Aktie: Chartmarken fallen', editor: 'Börse Express', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.boerse-express.com/news/articles/kion-aktie-chartmarken-fallen-890352' },
  { id: 14, titulo: 'Interim Report Q2 2026 (deuda, arrendamientos, caja, pensiones y minoritarios a 30-jun-2026)', editor: 'KION GROUP AG', tipo: 'Primaria', fecha: '2026-07-30', url: `${KW}/2026-Reports-Presentations/Q2-2026/2026-Q2_Interim-report_KION.pdf` },
];
const id = bolsa.identificacion;
const empresas = comps.empresas.filter((e) => !/control/.test(e.nombre) && e.capitalizacion).map((e) => ({
  nombre: e.nombre, ticker: e.ticker, pais: e.pais, capitalizacion: e.capitalizacion, ev_ventas: e.ev_ventas, ev_ebitda_ltm: e.ev_ebitda_ltm, ev_ebitda_ntm: e.ev_ebitda_ntm ?? null,
  per_ntm: e.per_ntm, crecimiento_pct: e.crecimiento_pct, margen_ebitda_pct: e.margen_ebitda_pct, roic_pct: e.roic_pct, dn_ebitda: e.dn_ebitda, fcf_yield_pct: e.fcf_yield_pct,
}));
const Dn = {
  _estado: 'completa',
  identificacion: {
    nombre: 'KION GROUP AG', nombre_corto: 'KION', ticker: 'KGX', isin: 'DE000KGX8881', mercado: 'Xetra / Bolsa de Fráncfort (Prime Standard), EUR; ADR KIGRY sin patrocinio en EE. UU.',
    indice_referencia: 'MDAX', pais: 'Alemania', pais_iso: 'DE', sector: 'Industria', industria: 'Maquinaria de manutención e intralogística', sede: 'Fráncfort del Meno', fundacion: '2006',
    empleados: 42403, web: 'https://www.kiongroup.com', precio: id.precio, fecha_precio: id.fecha_precio, acciones: 131.1, capitalizacion_publicada: null, free_float_pct: 53.5,
    max_52s: id.max_52s, min_52s: id.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace(".", ",")} M EUR/día en Xetra (3 meses)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    guidance: 'Previsión de 2026 del 14-oct-2026: ventas de 11.450-11.750 M, EBIT ajustado de 815-875 M (ITS 690-740 M), FCF de 400-500 M (con la definición nueva) y ROCE del 7,8-8,4 % [D11]. Antes (30-jul): 11.525-12.025 M, 880-980 M, 420-540 M y 8,4-9,4 %. El objetivo de margen de EBIT ajustado de dos cifras, antes para 2027, se aplaza a después de 2027 [D11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 11672, ebitda: 1933, ebit: 895.5, bpa: 2.92, dpa: 0.966, fuente: 'MarketScreener, 15 analistas [D2]' },
      { periodo: '2027e', ingresos: 12188, ebitda: 2107, ebit: 1050, bpa: 3.616, dpa: 1.22, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 12800, ebitda: 2222, ebit: 1110, bpa: 4.27, dpa: 1.434, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: null, mantener: null, vender: null, po_medio: 51.4, po_min: 37, po_max: 63 },
    revisiones: 'Las estimaciones y los objetivos bajan desde julio: DZ Bank recortó a 47 EUR, MPCM de 58 a 54, Deutsche Bank de 60 a 52 y Metzler también tras el aviso de octubre; Citi subió a Comprar el 8-sep (objetivo 62) y JPMorgan mantiene 60 [D6]. El consenso de BPA de 2026e (2,92) todavía no recoge del todo la previsión del 14-oct (EBIT ajustado de 815-875 M frente a 895 M del consenso) [D2, D11].',
    base_ebitda: 'ajustado',
    ajuste_ebitda_pct_ventas: 5.4,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: bolsa.bolsa.tipo_rentabilidad,
    rentabilidades: bolsa.bolsa.rentabilidades,
    anual: bolsa.bolsa.anual,
    beta: 1.88,
    volatilidad_pct: bolsa.bolsa.volatilidad_pct,
    max_drawdown_pct: bolsa.bolsa.max_drawdown_pct,
    posicion_corta_pct: null,
    comentario: 'KION es una acción muy cíclica: beta de 1,9 frente al DAX (semanal, 5 años; 2,1 mensual) y una volatilidad del 44 % [D1]. Subió un 118 % en 2025 y cae un 49 % en 2026, hasta 34,09 EUR el 16-oct, a un 1 % de su mínimo de 52 semanas (31,88 EUR, 14-oct) y un 52 % por debajo del máximo de enero (70,45 EUR) [D1]. En diez años rinde un −3,6 % anual con dividendos frente al +8,5 % del DAX: la caída del 81 % de 2021-2022 aún no se ha recuperado [D1]. El índice de referencia es el DAX (EXS1) y el sector, el Stoxx Europe 600 de bienes y servicios industriales (EXH4).',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2021', precio_cierre: 96.48, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2022', precio_cierre: 26.77, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2023', precio_cierre: 38.67, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 31.86, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 68.25, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    confianza: 'Media',
  },
  comparables: { empresas, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2016-06', objetivo: 'Dematic (automatización de almacenes)', comprador: 'KION Group', ev: 2930, ev_ventas: 1.81, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.250 M USD de valor de empresa sobre 1.800 M USD de ventas de 2015; KION habló de 17-19 veces el EBIT [D8].' },
      { fecha: '2025-02', objetivo: 'Kito Crosby (polipastos y elevación)', comprador: 'Columbus McKinnon', ev: 2407, ev_ventas: 2.45, ev_ebitda: 8.0, prima_pct: null, excluir: false, comentario: '2.700 M USD; ≈ 8 veces el EBITDA ajustado de 12 meses con sinergias, 1.100 M USD de ventas [D7].' },
      { fecha: '2026-03', objetivo: 'Toyota Industries (exclusión de bolsa)', comprador: 'Toyota Motor y grupo', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'OPA a 20.600 JPY por acción con éxito el 24-mar-2026; incluye participaciones cruzadas del grupo Toyota y motores, sin múltiplo comparable [D9].' },
    ],
    confianza: 'Baja',
  },
  valoracion: {
    puente: { fecha: '2026-06-30', deuda_financiera: 1635.1, arrendamientos: 2821.3, caja: 391.0, minoritarios: 30.3, pensiones: 337.2, asociadas: 143.1, otros_ajustes: 0 },
    referencia_mercado: { mercado: 'S&P 500 (prima implícita de Damodaran), la principal para mercados desarrollados', prima_implicita_pct: 4.2, fecha: '2026-10', fuente: 'Damodaran, ERPbymonth.xlsx, octubre de 2026 [D4]' },
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Bundesanzeiger, posiciones cortas netas: solo las de más del 0,5 % por gestora, sin total; 2) Yahoo: sin dato para KGX.DE; 3) prensa: sin cifra reciente', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones por tipo', tipo: 'Complemento', intentos: '1) MarketScreener: solo la media «Comprar»; 2) Yahoo: 11 analistas sin desglose; 3) prensa: cambios sueltos', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'EV/EBITDA de Dematic y de Smart Innovation', tipo: 'Complemento', intentos: '1) Informe anual 2016 y nota de la compra: solo EV/EBIT; 2) nota del 2T26: sin importe de Smart Innovation; 3) prensa: sin cifras', decision: 'Omitido' },
  ],
};
guarda('D', Dn);

// ================================================================ E. Sentimiento
const En = {
  _estado: 'completa',
  sentimiento: null,
  fuentes: [],
  huecos: [
    { seccion: 'sentimiento', campo: 'todo', tipo: 'Complemento', intentos: '1) wallstreet-online.de, foro de KION: necesita JavaScript, sin texto; 2) finanzen.net y ariva.de: foros vacíos en la descarga; boerse.de y Simply Wall St: 403; 3) Stocktwits (KIGRY): 404; parqet: 403; Seeking Alpha solo da titulares sin debate', decision: 'Omitido: la sección no se imprime' },
  ],
};
guarda('E', En);
console.log('A-E guardadas');
