// Escribe las notas A-E de Lockheed Martin (LMT, corte 2026-10-15) desde los documentos de notas/docs (EDGAR),
// el XBRL de la SEC (cuentas-xbrl.json), bolsa.json (Yahoo), form4.json y páginas web leídas el 15-oct-2026.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/lockheed-martin-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const xbrl = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const f4 = JSON.parse(fs.readFileSync(path.join(dir, 'form4.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/936468/';
const r1 = (x) => Math.round(x * 10) / 10;
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cuentas, notas, segmentos, deuda, pensiones, riesgos)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000162828026004195/lmt-20251231.htm' },
  { id: 2, titulo: 'Nota de resultados del 4T y del ejercicio 2025 (Exhibit 99.1; guía 2026)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000162828026003970/ex991q42025.htm' },
  { id: 3, titulo: 'Nota de resultados del 2T 2026 (Exhibit 99.1; guía 2026 revisada, balance y cartera)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049277/ex991q22026.htm' },
  { id: 4, titulo: 'Form 10-Q del 2T 2026 (programas con pérdidas, ULA, presupuesto, Ultra Maritime)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049411/lmt-20260628.htm' },
  { id: 5, titulo: 'Nota de resultados del 1T 2026 (acuerdos marco de munición)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-04-23', url: E + '000162828026026683/ex991q12026.htm' },
  { id: 6, titulo: 'Nota de resultados del 3T 2025', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2025-10-21', url: E + '000162828025045582/ex991q32025.htm' },
  { id: 7, titulo: 'Nota de resultados del 2T 2025 (pérdidas de 1.600 M en programas)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2025-07-22', url: E + '000162828025035502/ex991q22025.htm' },
  { id: 8, titulo: 'Nota de resultados del 1T 2025', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2025-04-22', url: E + '000093646825000031/ex991q12025.htm' },
  { id: 9, titulo: 'Nota de resultados del 4T y del ejercicio 2024 (pérdidas de programas clasificados; guía 2025)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2025-01-28', url: E + '000093646825000006/ex991q42024.htm' },
  { id: 10, titulo: 'Nota de resultados del 4T y del ejercicio 2023 (guía 2024)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2024-01-23', url: E + '000093646824000006/ex991q42023.htm' },
  { id: 11, titulo: 'Nota de resultados del 4T y del ejercicio 2022 (guía 2023)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2023-01-24', url: E + '000093646823000004/ex991q42022.htm' },
  { id: 12, titulo: 'Nota de resultados del 4T y del ejercicio 2021 (guía 2022)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2022-01-25', url: E + '000093646822000006/ex991q42021.htm' },
  { id: 13, titulo: 'Nota de resultados del 4T y del ejercicio 2020 (guía 2021)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2021-01-26', url: E + '000093646821000009/ex991q42020.htm' },
  { id: 14, titulo: 'XBRL de la SEC (companyfacts, CIK 936468): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000936468.json' },
  { id: 15, titulo: 'Términos de la emisión de bonos de julio de 2025 (FWP): ratings esperados', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2025-07-23', url: E + '000119312525163467/d889513dfwp.htm' },
  { id: 16, titulo: 'Form 8-K: nueva línea de crédito a 364 días y prórroga de la línea a cinco años', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-08-28', url: E + '000119312526371750/d177255d8k.htm' },
];

// Cuenta del XBRL [14], comprobada con las notas de resultados. La amortización del XBRL (1.687 M en 2025) incluye la de intangibles
// comprados (254 M; nota de segmentos del 10-K [1]). No recurrentes dentro del EBIT: pérdidas anticipadas («reach-forward») de programas
// (1.965 M en 2024; 1.615 M en 2025) y deterioros de activos (87 y 66 M) [1]. Los cargos de liquidación de pensiones (1.700 M en 2021,
// 1.500 M en 2022 y 479 M en 2025) van en el resultado no operativo: no tocan el EBITDA.
const NR = { '2024': 1965 + 87, '2025': 1615 + 66 };
const DPA = { '2018': 8.2, '2019': 9.0, '2020': 9.8, '2021': 10.6, '2022': 11.4, '2023': 12.15, '2024': 12.75, '2025': 13.35 };
const cuenta = xbrl.financieros.cuenta.filter((c) => ANIOS.includes(c.periodo)).map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: null,
  ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0,
  beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[c.periodo] ?? null,
  bpa: c.bpa, dpa: DPA[c.periodo], dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
}));

const balance = xbrl.balance.historico.filter((b) => ANIOS.includes(b.periodo)).map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores,
  activos_contrato: b.activos_contrato, pasivos_contrato: b.pasivos_contrato, caja: b.caja, deuda_financiera: b.deuda_financiera,
  arrendamientos: 0, // US GAAP: arrendamientos operativos (1.071 M en 2025) ya dentro del EBITDA; no hay financieros relevantes [1]
  patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios ?? 0, reservas: b.reservas,
}));

const flujos = xbrl.flujos.historico.filter((f) => ANIOS.includes(f.periodo)).map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: 0,
  dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0,
}));

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    // LTM = 3T25 + 4T25 + 1T26 + 2T26 [3, 5, 6, 2]. Amortización LTM = 1.687 − 796 (1S25) + 798 (1S26). FCF LTM = 6.908 − 805 + 2.626.
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-28', ingresos: 77014, ebitda: 9153 + 1689, ebit: 9153, beneficio_neto: 6287, bpa: 27.13, dpa: 13.65, dpa_extraordinario: 0, fcf: 8729, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Las ventas pasan de 53.762 M USD en 2018 a 75.048 M en 2025 (+5,0 % anual), casi todo orgánico: no hay compras relevantes desde Sikorsky (2015) [1]. El crecimiento de 2026 se apoya en el F-35 y en la munición: en el 2T26 las ventas suben un 11 % (MFC +19 % por PAC-3 y THAAD) [3]. El margen operativo consolidado cayó del 14,3 % de 2019 al 9,9 % de 2024 y al 10,3 % de 2025 por las pérdidas anticipadas en programas a precio fijo: 1.965 M en 2024 (dos programas clasificados en Aeronáutica y MFC) y 1.615 M en 2025 (programa clasificado de Aeronáutica, helicópteros canadienses CMHP y turcos TUHP) [9, 7]. Sin ellas el margen operativo habría sido del 12,8 % y del 12,5 %. El EBIT incluye el ajuste FAS/CAS de pensiones (1.518 M en 2025, 1.685 M previstos en 2026): el Gobierno reembolsa en precio el coste de pensiones según las normas CAS, y ese reembolso supera el coste contable del servicio [2, 3].',
    ajustes: 'El BPA publicado mezcla tres tipos de partidas. Cargos de liquidación de pensiones, no operativos y sin caja: 4,72 USD por acción en 2021, 5,57 en 2022 y 1,63 en 2025 [12, 11, 2]. Pérdidas de programas: 6,16 USD en 2024 y 5,83 USD en 2025 (con 169 M de otros cargos) [9, 7]. Y ganancias del fondo de capital riesgo (0,72 USD en 2021) [12]. El BPA normalizado (sin liquidaciones de pensiones ni las grandes pérdidas de 2024-2025) sería 27,48 en 2021, 27,23 en 2022, 27,55 en 2023, 28,47 en 2024 y 28,95 en 2025 (estimación propia: publicado + efecto por acción de cada nota). Ojo: las pérdidas de programas no son del todo extraordinarias. Ajustes desfavorables de 100-300 M aparecen casi cada año (F-16, C-130, Heavy Lift y Seahawk: 395 M en el 1S26) [4], y por eso no se normalizan.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 17104, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.80, vs_consenso: null },
      { periodo: '4T24', ingresos: 18622, crecimiento_pct: -1.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 2.22, vs_consenso: 'Inferior' },
      { periodo: '1T25', ingresos: 17963, crecimiento_pct: 4.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 7.28, vs_consenso: null },
      { periodo: '2T25', ingresos: 18155, crecimiento_pct: 0.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.46, vs_consenso: 'Inferior' },
      { periodo: '3T25', ingresos: 18609, crecimiento_pct: 8.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.95, vs_consenso: null },
      { periodo: '4T25', ingresos: 20321, crecimiento_pct: 9.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 5.80, vs_consenso: null },
      { periodo: '1T26', ingresos: 18021, crecimiento_pct: 0.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 6.44, vs_consenso: 'Inferior' },
      { periodo: '2T26', ingresos: 20063, crecimiento_pct: 10.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 7.94, vs_consenso: null },
    ],
    ultima_presentacion: 'En el 1T26 (23-abr) la dirección mantuvo la guía pese a ventas planas, un flujo libre de −291 M y unos 240 M de beneficio perdido en Aeronáutica (ajustes desfavorables de 125 M en el F-16 y de 95 M en el C-130). Puso el acento en los acuerdos marco de siete años con el Departamento de Guerra para triplicar o cuadruplicar la producción de PAC-3, THAAD y PrSM [5, 4]. En el 2T26 (23-jul) el discurso pasó de la defensa a la ofensiva. Las ventas subieron un 11 %, el flujo libre fue de 2.917 M, entraron pedidos por 65.000 M (con el contrato plurianual de THAAD de 35.000 M) y la cartera llegó a un récord de 230.416 M. La guía subió a 79.750-81.750 M de ventas, 29,95-30,65 USD de BPA y 7.000-7.200 M de flujo libre [3]. También se anunció la compra de Ultra Maritime por 3.450 M [4]. Lo que no se ha contestado con cifras: si los programas clasificados necesitan más provisiones (1.800 M acumulados en Aeronáutica y 1.500 M en MFC, con 427 M y 1.100 M aún provisionados) [4], y cuándo volverán las recompras, paradas desde el 1T26 [4].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja de 3.791 M a 28-jun-2026, más una línea de crédito a cinco años de 3.000 M (prorrogada en agosto de 2026) y otra a 364 días firmada el 24-ago-2026 [3, 16]. Las dos respaldan el papel comercial. No había papel comercial en circulación a 28-jun-2026 [3].',
    rating: "Moody's A2, S&P A−, Fitch A (calificaciones de la emisión de julio de 2025) [15]",
    coste_deuda_pct: 5.2,
    vida_media_anios: null,
    otros_pasivos: 'Pasivo de pensiones devengado de 3.931 M a 28-jun-2026 (3.915 M a cierre de 2025) [3]. La cobertura CAS del Gobierno financia una parte en precio (1.735 M de coste CAS previstos en 2026) [3], y la empresa aportó 860 M en 2025 para cubrir la obligación de 2026 [2]. Hay 1.900 M de pérdidas de programas provisionadas que saldrán en caja: 427 M del clasificado de Aeronáutica, 1.100 M del de MFC y 365 M del CMHP canadiense [4]. Además existe un aval de hasta 500 M a la deuda de ULA, con un valor razonable de 64 M, y Lockheed y Boeing prevén más apoyo financiero a ULA [4]. Sigue abierta una demanda colectiva de accionistas por la información del periodo ene-2024 a jul-2025 [4]. No hay covenants financieros de mantenimiento en la línea nueva [16].',
    comentario: 'La deuda financiera pasó de 12.169 M en 2020 a 21.700 M en 2025: se emitió deuda para pagar recompras (25.000 M entre 2021 y 2025) [14]. Los fondos propios cayeron a 6.721 M, con unas pérdidas actuariales acumuladas de 7.542 M en otro resultado global [3]. El circulante comercial lo financian sobre todo los anticipos: 13.001 M de activos por contrato frente a 11.440 M de pasivos por contrato en 2025 [14]. En el 1S26 los activos por contrato subieron 3.037 M por el arranque de la munición, y lo compensaron proveedores (+1.409 M) y anticipos (+711 M) [3]. La deuda neta financiera a 28-jun-2026 es de 16.747 M (20.538 − 3.791), 1,5 veces el EBITDA LTM [3].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión del beneficio en caja es alta: el flujo libre de 2021-2025 suma 33.900 M frente a un beneficio neto de 29.320 M (116 %), porque la amortización supera ligeramente al capex y los cargos de pensiones y de programas no salen en caja el año en que se apuntan [14]. Hay años anómalos: 2018 (3.138 M de flujo operativo tras 5.000 M de aportación voluntaria a pensiones) y 2024 (990 M aportados) [1, 9]. El capex sube de 1.649 M en 2025 a 2.000-2.400 M en 2026, el 2,7 % de las ventas: es la inversión en capacidad de munición, crecimiento con contratos marco detrás [3]. El capex de mantenimiento ronda la amortización del inmovilizado (unos 1.200 M en los segmentos) [1] (estimación propia). Las recompras pasaron de 7.900 M en 2022 a 3.000 M en 2025 y a cero en el 1S26 [3, 14].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 32, opinion: 'Favorable (sin salvedades) [1]',
    comentario: 'La contabilidad por grado de avance de contratos largos es la fuente principal de juicio. El margen depende de las estimaciones del coste a terminación, y los ajustes netos favorables del beneficio («profit booking rate adjustments») mueven cientos de millones al año. Una pérdida anticipada se reconoce entera el trimestre en que se ve: de ahí los saltos de 2024 y 2025 [1, 4]. El reembolso CAS de pensiones sube el EBIT en 1.500-1.700 M al año, pero es caja real que paga el Gobierno [3]. Los pagos en acciones son pequeños (304 M en 2025, el 6 % del beneficio) [1]. El 10-K no muestra cambios de criterio contable relevantes en 2025 [1]. El motor da el Altman Z, el Piotroski F y el Beneish M: con fondos propios mínimos por las recompras, el Altman Z sale bajo sin indicar riesgo de quiebra (rating A−/A2). El Beneish debe leerse con cuidado en un contratista con activos por contrato que crecen.',
    senales: [
      { senal: 'Pérdidas recurrentes en programas a precio fijo de desarrollo', nivel: 'Alta', comentario: '1.965 M en 2024 y 1.615 M en 2025. En los clasificados quedan 1.527 M provisionados, y la empresa avisa de que podría haber más pérdidas «materiales» [4].' },
      { senal: 'Costes precontractuales en existencias', nivel: 'Media', comentario: 'La empresa y sus socios siguen invirtiendo por adelantado en el programa clasificado de Aeronáutica, y su recuperación depende de que el cliente financie las fases siguientes [4].' },
      { senal: 'Aval y apoyo a ULA', nivel: 'Media', comentario: 'Hay un aval de hasta 500 M, ULA tiene problemas con el Vulcan y la empresa avisa de posibles deterioros [4].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota 10 de deuda del 10-K 2025 (descargado; sin tabla de vencimientos legible en el texto extraído); 2) 10-Q del 2T26; 3) folleto de la emisión de 2025 (solo esa emisión)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) Notas de resultados trimestrales (no publican la amortización trimestral); 2) 10-Q (solo la acumulada del semestre); 3) derivarla restando acumulados (no hay 3T y 4T por separado)', decision: 'Omitido' },
  ],
};
// Segmentos [2, 10, 12]: ventas y beneficio operativo de segmento 2021-2025 (2022 y 2023 de la nota del 4T23).
const seg = (nombre, descripcion, h) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
A.negocio = {
  segmentos: [
    seg('Aeronáutica', 'F-35 (67 % del segmento), F-16, C-130, F-22 y programas clasificados (Skunk Works).', [['2021', 26748, 2799], ['2022', 26987, 2867], ['2023', 27474, 2825], ['2024', 28618, 2523], ['2025', 30257, 2086]]),
    seg('Misiles y control de tiro (MFC)', 'PAC-3, THAAD, GMLRS, PrSM, JASSM/LRASM, Hellfire/JAGM, sensores Sniper e IRST.', [['2021', 11693, 1648], ['2022', 11317, 1637], ['2023', 11253, 1541], ['2024', 12682, 413], ['2025', 14450, 1989]]),
    seg('Sistemas rotatorios y de misión (RMS)', 'Helicópteros Sikorsky (Black Hawk, CH-53K, Seahawk), Aegis, radares, mando y control, guerra submarina.', [['2021', 16789, 1798], ['2022', 16148, 1906], ['2023', 16239, 1865], ['2024', 17264, 1921], ['2025', 17312, 1323]]),
    seg('Espacio', 'Misiles balísticos de la Armada (FBM), interceptor NGI, satélites (GPS, alerta de misiles), Orion; 50 % de ULA.', [['2021', 11814, 1134], ['2022', 11532, 1057], ['2023', 12605, 1158], ['2024', 12479, 1226], ['2025', 13029, 1345]]),
  ],
  geografias: [{ nombre: 'Gobierno de EE. UU. (63 % Departamento de Guerra)', peso_pct: 72 }, { nombre: 'Clientes internacionales (FMS y venta directa)', peso_pct: 28 }],
  geografias_criterio: 'destino',
  kpis: [
    { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '193.622 (dic-25)', valor_actual: '230.416 (jun-26)', variacion: '+19 %', comentario: 'MFC pasa de 46.650 a 87.882 M con el contrato plurianual de THAAD [3].' },
    { kpi: 'Entregas de F-35 (semestre)', valor_anterior: '97 (1S25)', valor_actual: '51 (1S26)', variacion: '−47 %', comentario: 'Calendario de entregas del Lote 18-19; cartera de 317 aviones [3, 4].' },
    { kpi: 'Flujo libre (M USD)', valor_anterior: '6.908 (2025)', valor_actual: '7.000-7.200 (guía 2026)', variacion: '+3 %', comentario: 'Con un capex de 2.000-2.400 M [3].' },
    { kpi: 'Margen de segmento', valor_anterior: '9,0 % (2025)', valor_actual: '10,5 % (1S26)', variacion: '+1,5 pp', comentario: 'Sin las pérdidas del 2T25 [3].' },
    { kpi: 'Recompras (M USD)', valor_anterior: '3.000 (2025)', valor_actual: '0 (1S26)', variacion: '−100 %', comentario: 'Paradas tras la orden ejecutiva de enero de 2026 [4].' },
  ],
};

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG, negocio descriptivo
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (negocio, competencia, clientes, F-35, riesgos)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000162828026004195/lmt-20251231.htm' },
  { id: 2, titulo: 'Form 10-Q del 2T 2026 (presupuesto FY2026 y FY2027, Golden Dome, Ultra Maritime, ULA)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049411/lmt-20260628.htm' },
  { id: 3, titulo: 'SIPRI: el gasto militar mundial de 2025 (nota de prensa)', editor: 'SIPRI', tipo: 'Sectorial', fecha: '2026-04-27', url: 'https://www.sipri.org/media/press-release/2026/world-military-expenditure' },
  { id: 4, titulo: 'Northrop Grumman (NOC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/noc/statistics/' },
  { id: 5, titulo: 'General Dynamics (GD): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gd/statistics/' },
  { id: 6, titulo: 'RTX: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rtx/statistics/' },
  { id: 7, titulo: 'L3Harris (LHX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/lhx/statistics/' },
  { id: 8, titulo: 'Nota de resultados del 2T 2026', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049277/ex991q22026.htm' },
  { id: 9, titulo: 'Nota de resultados del 1T 2026 (acuerdos marco de munición)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-04-23', url: E + '000162828026026683/ex991q12026.htm' },
  { id: 10, titulo: 'Lockheed Martin Has Fallen Nearly 25% From Its 2026 High (F-35 en la petición FY2027)', editor: 'TIKR', tipo: 'Analistas', fecha: '2026-05-07', url: 'https://www.tikr.com/blog/lockheed-martin-has-fallen-nearly-25-from-its-2026-high-is-it-finally-time-to-buy' },
  { id: 11, titulo: 'Orden ejecutiva «Prioritizing the Warfighter in Defense Contracting»', editor: 'Fortune', tipo: 'Prensa', fecha: '2026-01-13', url: 'https://fortune.com/2026/01/13/trump-executive-order-defense-contractors-rtx-general-dynamics-lockheed-martin-boeing-northrop-grumman-l3-harris/' },
  { id: 12, titulo: 'Seeking Alpha: titulares de noticias de LMT (sep-oct 2026): contrato de buscadores del PAC-3 con Boeing, piezas del F-35, dividendo', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/LMT.xml' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Lockheed Martin nace en 1995 de la fusión de Lockheed Corporation y Martin Marietta [1]. En los años siguientes absorbe buena parte de la industria estadounidense de defensa: los F-16 de General Dynamics, Loral y los programas que hoy forman Misiles y Espacio. En 2001 gana el concurso del F-35, el mayor programa de armamento de la historia, que hoy es el 27 % de sus ventas [1]. En 2015 compra Sikorsky. En 2016 separa sus servicios de TI, que se fusionan con Leidos, y queda como fabricante de plataformas y sistemas. Jim Taiclet, consejero desde 2018, es primer ejecutivo desde junio de 2020 y presidente desde marzo de 2021 [1]. En 2022 renunció a comprar Aerojet Rocketdyne por la oposición de la FTC. En 2026 acuerda comprar Ultra Maritime por 3.450 M USD [2].',
    hitos: [
      { anio: '1995', hito: 'Fusión de Lockheed y Martin Marietta [1].' },
      { anio: '2001', hito: 'Adjudicación del programa Joint Strike Fighter (F-35).' },
      { anio: '2015', hito: 'Compra de Sikorsky (helicópteros), hoy dentro de RMS.' },
      { anio: '2016', hito: 'Separación de los servicios de TI y fusión con Leidos.' },
      { anio: '2020', hito: 'Jim Taiclet, primer ejecutivo; acuerdo para comprar Aerojet Rocketdyne, abandonado en 2022 [1].' },
      { anio: '2024', hito: 'Pérdidas de 1.965 M en programas clasificados [1].' },
      { anio: '2025', hito: 'Otros 1.615 M de pérdidas en programas; récord de cartera de 194.000 M [1].' },
      { anio: '2026', hito: 'Acuerdos marco de siete años para munición (PAC-3, THAAD, PrSM); cartera de 230.000 M; compra de Ultra Maritime [9, 8, 2].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Lockheed Martin es el mayor contratista de defensa del mundo por ventas: 75.048 M USD en 2025 y unos 123.000 empleados, el 93 % en EE. UU. [1]. Tiene cuatro segmentos. Aeronáutica (40 % de las ventas) hace el F-35, el F-16, el C-130J y los programas clasificados de Skunk Works. Misiles y control de tiro (19 %) fabrica los interceptores PAC-3 y THAAD, los cohetes GMLRS, el PrSM, el JASSM y el LRASM. Sistemas rotatorios y de misión (23 %) reúne los helicópteros Sikorsky, el sistema Aegis y los radares y sistemas navales. Espacio (17 %) cubre los misiles Trident, el interceptor NGI, los satélites GPS y de alerta, Orion y el 50 % de ULA [1]. El 72 % de las ventas va al Gobierno de EE. UU. y el 28 % a clientes internacionales, sobre todo por FMS [1].',
    como_gana_dinero: 'Cobra por contratos largos: el 40 % de las ventas de 2025 eran contratos de coste más margen, de margen pequeño (6-9 %) pero sin riesgo de coste. El resto son contratos a precio fijo o con incentivo, más rentables si se ejecutan bien y con pérdidas si el coste se dispara [1]. El margen de segmento normal ronda el 11 %, más alto en misiles (13-15 %) y más bajo en Aeronáutica y Espacio (9-11 %) [8]. A ese margen se suma el reembolso CAS de pensiones (1.685 M en 2026) [8]. Los ingresos son casi enteros recurrentes en la práctica: la cartera de 230.416 M equivale a tres años de ventas [8]. El F-35 aporta producción por lotes y un sostenimiento creciente para una flota de más de 1.300 aviones entregados [2]. No hay estacionalidad relevante, salvo el cierre del ejercicio fiscal federal en septiembre.',
    clientes: 'La concentración es máxima: el Gobierno de EE. UU. compra el 72 % (el Departamento de Guerra, el 63 %), y además canaliza buena parte del 28 % internacional por FMS [1]. Los contratos los paga el Congreso cada año, y el Gobierno puede rescindirlos por conveniencia [1]. El poder de precio es limitado: los precios se negocian con auditorías de coste (DCAA), y las rentabilidades de los contratos están acotadas. La ventaja está en no tener alternativa en plataformas como el F-35, el PAC-3, el THAAD o el Trident. Diecisiete países han elegido el PAC-3 [1]. Los acuerdos marco de 2026 dan volumen a siete años a cambio de que la empresa invierta en capacidad [9]. El cliente aprieta ahora con contratos de desarrollo a precio fijo y con la orden ejecutiva de enero de 2026, que limita dividendos y recompras de los contratistas que incumplen plazos [11].',
  },
  sector: {
    definicion: 'El mercado relevante es la compra de armamento e I+D militar del Departamento de Guerra de EE. UU. y de sus aliados (FMS), no el gasto militar total, que incluye personal, operaciones y mantenimiento. Para el tamaño se usan dos fuentes. SIPRI da el gasto militar total: 2.887.000 M USD en el mundo en 2025, de ellos 954.000 M en EE. UU. [3]. El presupuesto de defensa nacional de EE. UU. del año fiscal 2026 tiene 839.200 M de crédito discrecional, más 150.000 M obligatorios de la ley fiscal de 2025 [2]. La petición del año fiscal 2027 es de 1,5 billones, con 760.000 M en compras y modernización [2]. La serie usa el gasto mundial de SIPRI.',
    tamano: '≈ 2.887.000 M USD de gasto militar mundial en 2025, +2,9 % real; EE. UU. 954.000 M [3]; compra de armamento y modernización pedida para el año fiscal 2027 de EE. UU.: 760.000 M [2].',
    unidad_serie: 'millones de USD (gasto militar mundial, SIPRI)',
    serie: [{ anio: '2024', tamano: 2718000 }, { anio: '2025', tamano: 2887000 }],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Presupuesto de defensa de EE. UU.', efecto: '+', horizonte: 'Cíclico', evidencia: 'La petición del FY2027 (1,5 billones) incluye 760.000 M de compras, Golden Dome y 85 F-35 frente a los 47 de 2026; los 350.000 M de reconciliación no están aprobados [2, 10].' },
      { driver: 'Reposición de munición y defensa antimisiles', efecto: '+', horizonte: 'Estructural', evidencia: 'Acuerdos marco para triplicar o cuadruplicar PAC-3, THAAD y PrSM; contrato THAAD de 35.000 M [9, 8].' },
      { driver: 'Gasto europeo y aliado (OTAN 3,5 % + 1,5 % del PIB)', efecto: '+', horizonte: 'Estructural', evidencia: 'Europa gastó 864.000 M en 2025, un 14 % más [3]; el 28 % de las ventas de Lockheed es internacional [1].' },
      { driver: 'Reforma de compras: precio fijo, OTA y nuevos contratistas', efecto: '−', horizonte: 'Estructural', evidencia: 'El Departamento de Guerra usa cada vez más vías rápidas (OTA) que exigen participación de contratistas no tradicionales [1].' },
      { driver: 'Política sobre la remuneración al accionista', efecto: '−', horizonte: 'Cíclico', evidencia: 'La orden ejecutiva de enero de 2026 prohíbe dividendos y recompras a contratistas que incumplen hasta que presenten un plan [11]; Lockheed no recompra desde el 1T26 [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Pocos contratistas principales (Lockheed, RTX, Northrop, General Dynamics, Boeing) con programas que duran décadas; la competencia es por concursos nuevos [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Comprador casi único (72 % Gobierno de EE. UU.) que audita costes, fija márgenes y puede rescindir por conveniencia [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Cuellos de botella en motores de cohete, buscadores y tierras raras; Lockheed contrata a Boeing unos 14.700 M para triplicar la producción de buscadores del PAC-3 [12].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Barreras enormes en plataformas tripuladas y misiles balísticos, pero bajas en drones, software y munición barata, donde entran Anduril, Palantir y otros [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Los drones y misiles baratos sustituyen en parte a plataformas caras en misiones de ataque y de saturación; no en defensa antimisil de alta gama ni en cazas de quinta generación.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto mundial lleva una década al alza y subió un 2,9 % real en 2025 [3]. En EE. UU. el ciclo va por presupuestos: tras la congelación de 2013-2015 llegó la subida de 2017-2019, y la de 2026-2027 se apoya en la reconciliación. La cartera récord (230.416 M) y los acuerdos marco de munición dicen que el ciclo de pedidos sigue al alza [8]. En 2008-09 y 2020 las ventas de defensa no cayeron. El riesgo de ciclo es político, no económico: la petición de 1,5 billones del FY2027 depende de 350.000 M de reconciliación que el Congreso no ha aprobado [2].' },
    regulacion: 'Las compras se rigen por la FAR y la DFARS, en revisión tras las órdenes ejecutivas de 2025 para acelerar las compras y la Estrategia de Transformación de Adquisiciones, con más contratos plurianuales y vías rápidas (OTA) [1]. Las normas CAS de costes permiten recuperar en precio el coste de las pensiones [8]. Las ventas al exterior necesitan licencias de exportación (ITAR) y la aprobación del Congreso. La orden ejecutiva de enero de 2026 limita dividendos, recompras y la remuneración ligada al BPA en los contratistas que incumplen [11]. El año fiscal 2027 empezó con una prórroga presupuestaria.',
    tendencias: 'La tecnología va hacia sistemas autónomos, drones y munición barata en grandes cantidades, software de mando y control con IA y defensa antimisil en capas (Golden Dome). Lockheed gana en defensa antimisil (PAC-3, THAAD, Aegis, NGI, sensores) y en el interceptor espacial de Golden Dome. Pierde peso donde entran competidores nuevos con modelo de producto (Anduril en drones y munición barata, Palantir en software de mando). Respuesta propia: el sistema antidrones Sanctum, desarrollado en 45 días [8], y la inversión en la capacidad de munición.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º contratista de defensa del mundo por ventas (75.048 M USD en 2025) [1]; único fabricante del F-35, del PAC-3 y del THAAD.',
    competidores: [
      { nombre: 'RTX', pais: 'EE. UU.', ticker: 'RTX', ingresos: 93500, cuota_pct: null, margen_ebit_pct: 12.3, comentario: 'Motores Pratt & Whitney (también del F-35), Patriot, SM-3/SM-6; mitad civil. Últimos 12 meses [6].' },
      { nombre: 'General Dynamics', pais: 'EE. UU.', ticker: 'GD', ingresos: 54860, cuota_pct: null, margen_ebit_pct: 10.4, comentario: 'Submarinos, carros de combate, munición de artillería, TI y Gulfstream [5].' },
      { nombre: 'Northrop Grumman', pais: 'EE. UU.', ticker: 'NOC', ingresos: 42890, cuota_pct: null, margen_ebit_pct: 13.4, comentario: 'B-21, Sentinel (ICBM), motores de cohete sólido, espacio; competidor directo en Golden Dome [4].' },
      { nombre: 'L3Harris', pais: 'EE. UU.', ticker: 'LHX', ingresos: 22930, cuota_pct: null, margen_ebit_pct: 12.9, comentario: 'Electrónica, comunicaciones, sensores espaciales y Aerojet Rocketdyne (motores de misiles) [7].' },
      { nombre: 'Boeing Defense, Space & Security', pais: 'EE. UU.', ticker: 'BA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'F-15EX, F-47 (NGAD), proveedor de buscadores del PAC-3 [12]; socio en ULA [2].' },
      { nombre: 'Anduril Industries', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'No cotiza. Drones, munición merodeadora y CCA con modelo de producto propio; compite en contratos OTA y en la munición barata.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'La flota de F-35 con 20 países usuarios crea una red de interoperabilidad, sostenimiento y formación: cada país que se suma refuerza el estándar [1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Plataformas que vuelan 40-50 años con sostenimiento propio; 1.344 F-35 entregados y 317 en cartera [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Tecnología clasificada, autorizaciones de seguridad y certificación de sistemas probados en combate (PAC-3, THAAD, Aegis) [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'La escala no se traduce en margen: el margen de segmento (9-11 %) está por debajo del de NOC o RTX [4, 6]; los contratos limitan el beneficio.' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Mercados con sitio para uno o dos fabricantes (interceptores de alta gama, cazas de quinta generación, misiles balísticos de la Armada) [1].' },
      ],
    },
    amenazas: 'Hay tres amenazas. La primera, que el cliente traslade el riesgo de desarrollo con contratos a precio fijo: las pérdidas de 2024-2025 salen de ahí, y la probabilidad de nuevas pérdidas es media [1]. La segunda, la entrada de contratistas con modelo de producto (Anduril, Palantir) y de drones baratos en las misiones de ataque y de saturación, que puede desviar presupuesto de plataformas caras: probabilidad media a cinco años. La tercera, que el F-35 pierda pedidos frente a la sexta generación (F-47 de Boeing) o a drones colaborativos: la petición del FY2027 incluye 85 aviones frente a los 47 comprados en 2026 [10], pero la cifra depende cada año del Congreso.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el cumplimiento (exportaciones, ética en los contratos públicos y seguridad de la información clasificada) y la seguridad del producto, no las emisiones. Las ventas a países sancionados o en conflicto dependen de licencias: los helicópteros turcos sufrieron las sanciones de 2020 [1]. Para muchos fondos con criterios ESG la industria de armamento es una exclusión, lo que limita la base de accionistas. La plantilla es muy cualificada (72.000 ingenieros y técnicos) y la capacidad de contratarla es un límite del crecimiento [1].',
    controversias: 'En julio de 2025 se presentó una demanda colectiva de accionistas por la información sobre los programas con pérdidas (periodo ene-2024 a jul-2025); sigue en curso [2]. En septiembre-octubre de 2026 la prensa informó del desvío a Hong Kong de piezas del F-35 por un error logístico de un transportista. Las autoridades de compras auditan habitualmente los sistemas de la empresa [1].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad (no descargado por tiempo); 2) proxy 2026 (sin calificaciones externas); 3) búsqueda web (no lanzada, se priorizó la valoración)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) 10-K (no da cuota); 2) SIPRI (gasto total, perímetro distinto); 3) cálculo con el presupuesto de compras (mezcla FMS y cuentas de varios años)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-03-26', url: E + '000093646826000004/lmt-20260326.htm' },
  { id: 2, titulo: 'Form 8-K, resultados de la junta del 12-may-2026', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-05-13', url: E + '000093646826000011/lmt-20260512.htm' },
  { id: 3, titulo: 'Form 10-K 2025 (directivos)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000162828026004195/lmt-20251231.htm' },
  { id: 4, titulo: 'Formularios 4 (operaciones de consejeros y directivos, 15-oct-2025 a 15-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000936468&type=4' },
  { id: 5, titulo: 'Notas de resultados del 4T de 2020 a 2025 (guías y resultados)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-01-29', url: E + '000162828026003970/ex991q42025.htm' },
  { id: 6, titulo: 'Nota de resultados del 2T 2026 (guía 2026 revisada)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049277/ex991q22026.htm' },
  { id: 7, titulo: 'Orden ejecutiva sobre dividendos, recompras y remuneración de contratistas', editor: 'Fortune', tipo: 'Prensa', fecha: '2026-01-13', url: 'https://fortune.com/2026/01/13/trump-executive-order-defense-contractors-rtx-general-dynamics-lockheed-martin-boeing-northrop-grumman-l3-harris/' },
  { id: 8, titulo: 'Lockheed Martin (LMT): estadísticas (participación institucional, posición corta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/lmt/statistics/' },
  { id: 9, titulo: 'Lockheed Martin has fallen nearly 25 % from its 2026 high (relevo en Aeronáutica)', editor: 'TIKR', tipo: 'Analistas', fecha: '2026-05-07', url: 'https://www.tikr.com/blog/lockheed-martin-has-fallen-nearly-25-from-its-2026-high-is-it-finally-time-to-buy' },
];
const vende = {};
for (const o of f4.operaciones.filter((o) => o.codigo === 'S')) {
  const k = o.fecha + '|' + o.persona;
  vende[k] = vende[k] || { fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: 'Venta', acciones: 0, importe: 0 };
  vende[k].acciones += o.acciones; vende[k].importe += o.importe / 1e6;
}
const insiders = Object.values(vende).map((v) => ({ ...v, importe: v.importe > 0 ? Math.round(v.importe * 100) / 100 : null })).sort((a, b) => a.fecha.localeCompare(b.fecha));
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'James D. Taiclet', cargo: 'Presidente y primer ejecutivo', desde: '2020', participacion_pct: null, trayectoria: 'Consejero de Lockheed desde 2018, primer ejecutivo desde junio de 2020 y presidente desde marzo de 2021; antes dirigió American Tower [3, 1]. Con él, la cartera pasó de 150.000 M a cierre de 2022 a 230.000 M en junio de 2026, pero llegaron 3.600 M de pérdidas en programas en 2024-2025 [5, 6].' },
      { nombre: 'Evan T. Scott', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Director financiero desde abril de 2025, en sustitución de Jesus Malave; antes, director financiero de MFC y tesorero [1, 3].' },
      { nombre: 'Frank A. St. John', cargo: 'Director de operaciones', desde: '2020', participacion_pct: null, trayectoria: 'Director de operaciones desde junio de 2020; antes dirigió RMS [3]. Responsable de la ejecución de los programas que tuvieron pérdidas.' },
      { nombre: 'Timothy S. Cahill', cargo: 'Presidente de Misiles y control de tiro', desde: '2024', participacion_pct: null, trayectoria: 'Dirige el segmento que más crece (+14 % en 2025) y que absorbe los acuerdos marco de munición [1, 5].' },
      { nombre: 'Orlando Sanchez Jr.', cargo: 'Presidente de Aeronáutica', desde: '2026', participacion_pct: null, trayectoria: 'Sustituye desde el 1-jun-2026 a Gregory Ulmer, que se jubila tras las pérdidas del programa clasificado y los retrasos del F-16 y del C-130 [9].' },
      { nombre: 'Robert M. Lightfoot Jr.', cargo: 'Presidente de Espacio', desde: '2022', participacion_pct: null, trayectoria: 'Dirige Espacio desde enero de 2022; antes fue vicepresidente de operaciones y de estrategia del segmento [3].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'Ventas 67.100-68.500 M; BPA 26,00-26,30 [5]', real: 'Ventas 67.044 M; BPA 22,76 (27,48 sin la liquidación de pensiones)', cumplida: 'Parcial' },
      { anio: '2022', guia: 'Ventas ≈ 66.000 M; BPA ≈ 26,70 [5]', real: 'Ventas 65.984 M; BPA 21,66 (27,23 sin cargos no operativos)', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Ventas 65.000-66.000 M; BPA 26,60-26,90 [5]', real: 'Ventas 67.571 M; BPA 27,55', cumplida: 'Sí' },
      { anio: '2024', guia: 'Ventas 68.500-70.000 M; BPA 25,65-26,35 [5]', real: 'Ventas 71.043 M; BPA 22,31 (pérdidas clasificadas de 6,16 por acción)', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Ventas 73.750-74.750 M; BPA 27,00-27,30 [5]', real: 'Ventas 75.048 M; BPA 21,49 (5,83 de pérdidas y 1,63 de pensiones)', cumplida: 'No' },
      { anio: '2026', guia: 'Ventas 77.500-80.000 M; BPA 29,35-30,25; subida en julio a 79.750-81.750 M y 29,95-30,65 [6]', real: 'En curso: 1S26 ventas 38.084 M, BPA 14,38', cumplida: 'Parcial' },
    ],
    comentario: 'La dirección cumple en ventas y en caja (las ventas superaron la guía en 2023, 2024 y 2025) y falla en beneficio por las pérdidas de programas. En 2024 y 2025 el BPA publicado quedó un 15-20 % por debajo de la guía [5]. El equipo es estable en la cúpula: Taiclet desde 2020 y St. John desde 2020. En cambio han rotado el director financiero (abril de 2025) y el presidente de Aeronáutica (junio de 2026), justo los puestos ligados a las pérdidas [1]. El consejo defiende un presidente que sea a la vez primer ejecutivo, con un consejero coordinador. No hay un plan de sucesión público para un primer ejecutivo de 65 años.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'James D. Taiclet', cargo: 'Presidente y primer ejecutivo', tipo: 'Ejecutivo', desde: '2018', comisiones: 'Ninguna' },
      { nombre: 'Thomas J. Falk', cargo: 'Consejero coordinador independiente', tipo: 'Independiente', desde: '2010', comisiones: 'Nombramientos y gobierno (presidente)' },
      { nombre: 'John C. Aquilino', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Negocio clasificado y seguridad' },
      { nombre: 'David B. Burritt', cargo: 'Consejero', tipo: 'Independiente', desde: '2008', comisiones: 'Auditoría; Desarrollo directivo y remuneración' },
      { nombre: 'John M. Donovan', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Negocio clasificado; Desarrollo directivo y remuneración (presidente)' },
      { nombre: 'Vicki A. Hollub', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría; Desarrollo directivo y remuneración' },
      { nombre: 'Debra L. Reed-Klages', cargo: 'Consejera', tipo: 'Independiente', desde: '2019', comisiones: 'Desarrollo directivo y remuneración; Nombramientos y gobierno' },
      { nombre: 'Heather A. Wilson', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Negocio clasificado y seguridad' },
      { nombre: 'Patricia E. Yarrington', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría (presidenta); Negocio clasificado' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.1, voto_remuneracion_contra_pct: 8.1, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 23.45, fijo: 1.75, variable_corto: 5.5, variable_largo: 13.67, ratio_salario_medio: 180 },
    remuneracion: 'El primer ejecutivo cobró 23,45 M USD en 2025: 1,75 M de fijo, 13,67 M en acciones y 5,50 M de incentivos en efectivo. Su remuneración es 180 veces la del empleado mediano (130.614 USD) [1]. El variable anual pesa un 70 % en lo financiero (ventas, beneficio de segmento y un 40 % de flujo libre) y un 30 % en lo estratégico y operativo [1]. El largo plazo mide la rentabilidad total relativa para el accionista (50 %), el ROIC (25 %) y el flujo libre (25 %), con el componente relativo limitado al 100 % si la rentabilidad absoluta es negativa [1]. La remuneración se aprobó con un 90,1 % a favor en 2026 [2]. La orden ejecutiva de enero de 2026 podría obligar a ligar el variable a la entrega a tiempo y no al BPA o al flujo libre [7].',
    accionistas: [
      { nombre: 'State Street Corporation', pct: 14.9, tipo: 'Gestora (incluye el plan de ahorro de empleados)', variacion: 'Según el 13G/A de enero de 2024 [1]' },
      { nombre: 'The Vanguard Group', pct: 8.9, tipo: 'Gestora indexada', variacion: 'Según el 13G/A de febrero de 2024 [1]' },
      { nombre: 'BlackRock', pct: 7.4, tipo: 'Gestora', variacion: 'Según el 13G/A de enero de 2024 [1]' },
    ],
    insiders,
    control_y_defensas: 'No hay accionista de control: los tres mayores son gestoras (31 % entre las tres) y la participación institucional es del 76 % [1, 8]. Hay una sola clase de acciones y el consejo se elige cada año con mayoría simple. La junta de 2026 rechazó otra vez separar presidente y primer ejecutivo [2]. La sociedad es de Maryland; los estatutos no tienen blindajes relevantes según el proxy [1]. La limitación singular viene del cliente: la orden ejecutiva de enero de 2026 permite al Gobierno impedir dividendos y recompras a los contratistas que considere incumplidores [7].',
    alertas: [
      'Ventas de directivos en 12 meses sin compras: 3,8 M USD del director de operaciones (oct-2025) y ventas pequeñas de presidentes de segmento y de un consejero [4].',
      'Rotación del director financiero (abril de 2025) y del presidente de Aeronáutica (junio de 2026) tras las pérdidas de programas [1].',
      'Demanda colectiva de accionistas por la información sobre los programas con pérdidas (2025), en curso [3].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};

// ---------------------------------------------------------------- D. Mercado, consenso, comparables, transacciones
const fD = [
  { id: 1, titulo: 'Lockheed Martin: estimaciones y datos financieros (2024-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://uk.marketscreener.com/quote/stock/LOCKHEED-MARTIN-CORPORATI-13406/finances/' },
  { id: 2, titulo: 'Lockheed Martin: consenso de analistas y precios objetivo', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://uk.marketscreener.com/quote/stock/LOCKHEED-MARTIN-CORPORATI-13406/consensus/' },
  { id: 3, titulo: 'Históricos diarios de LMT, SPY e ITA (cierre del 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/LMT/history' },
  { id: 4, titulo: 'Lockheed Martin (LMT): estadísticas (acciones, valor empresa, posición corta)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/lmt/statistics/' },
  { id: 5, titulo: 'Northrop Grumman (NOC): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/noc/statistics/' },
  { id: 6, titulo: 'RTX: estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/rtx/statistics/' },
  { id: 7, titulo: 'General Dynamics (GD): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/gd/statistics/' },
  { id: 8, titulo: 'L3Harris (LHX): estadísticas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/lhx/statistics/' },
  { id: 9, titulo: 'Comparables europeos de defensa a 13-oct-2026 (BAE, Rheinmetall, Leonardo; MarketScreener y Stock Analysis), ficha sectorial del repositorio', editor: 'sectores/defensa-2026-10-15-comparables.json', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/' },
  { id: 10, titulo: 'Tipo de cambio de referencia del BCE (USD por EUR, 14-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 11, titulo: 'Bono del Tesoro de EE. UU. a 10 años (DGS10)', editor: 'FRED, Banco de la Reserva Federal de St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 12, titulo: 'Betas por sector, EE. UU. (enero de 2026): Aerospace/Defense', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-01-05', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/betas.xls' },
  { id: 13, titulo: 'Prima de riesgo implícita del S&P 500 por mes (ERPbymonth.xlsx)', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 14, titulo: 'Ball anuncia la venta de su negocio aeroespacial a BAE por 5.600 M USD (8-K, Ex. 99)', editor: 'Ball Corporation', tipo: 'Primaria', fecha: '2023-08-17', url: 'https://www.sec.gov/Archives/edgar/data/9389/000000938923000028/ball-20230817xex99.htm' },
  { id: 15, titulo: 'Aerojet Rocketdyne: comunicación a accionistas sobre la compra por L3Harris (DEFA14A)', editor: 'Aerojet Rocketdyne', tipo: 'Primaria', fecha: '2022-12-18', url: 'https://www.sec.gov/Archives/edgar/data/40888/000119312522308466/d415225ddefa14a.htm' },
  { id: 16, titulo: 'Parker Hannifin: anuncio de la oferta por Meggitt plc (8-K Ex. 2.1)', editor: 'Parker Hannifin', tipo: 'Primaria', fecha: '2021-08-02', url: 'https://www.sec.gov/Archives/edgar/data/76334/000119312521233544/d211612dex21.htm' },
  { id: 17, titulo: 'Hensoldt: presentación a analistas de la compra de ESG', editor: 'Hensoldt AG', tipo: 'Primaria', fecha: '2023-12-01', url: 'https://investors.hensoldt.net/media/document/c62ffd6f-0980-4f75-b730-461d0bf50b6e/assets/HENSOLDT_AG_Analyst_Call_ESG.pdf' },
  { id: 18, titulo: 'Kaman será comprada por Arcline Investment Management (8-K, Ex. 99.1)', editor: 'Kaman Corporation', tipo: 'Primaria', fecha: '2024-01-19', url: 'https://www.sec.gov/Archives/edgar/data/54381/000114036124002840/ny20019137x1_ex99-1.htm' },
  { id: 19, titulo: 'Form 10-Q del 2T 2026 (acuerdo de compra de Ultra Maritime por 3.450 M USD)', editor: 'Lockheed Martin Corporation', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049411/lmt-20260628.htm' },
  { id: 20, titulo: 'Nota de resultados del 2T 2026 (guía 2026)', editor: 'Lockheed Martin', tipo: 'Primaria', fecha: '2026-07-23', url: E + '000162828026049277/ex991q22026.htm' },
];
const b = bolsa.bolsa;
const cierre = Object.fromEntries(bolsa.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const EUR = 1.1195; // USD por EUR, BCE 14-oct-2026 [10]
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Lockheed Martin Corporation', nombre_corto: 'Lockheed Martin', ticker: 'LMT', isin: 'US5398301094', mercado: 'NYSE', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Aeroespacial y defensa', sede: 'Bethesda (Maryland)', fundacion: '1995', empleados: 123000, web: 'www.lockheedmartin.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 231.1, capitalizacion_publicada: 120530, free_float_pct: 99.8,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${bolsa.volumen_3m.importe_dia_millones} M USD/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Guía de 2026, subida el 23-jul-2026: ventas de 79.750-81.750 M USD (+6-9 %), beneficio de segmento de 8.500-8.700 M, ajuste FAS/CAS de pensiones de ≈ 1.365 M, BPA de 29,95-30,65 USD, flujo operativo de 9.200-9.400 M, capex de 2.000-2.400 M y flujo libre de 7.000-7.200 M [20]. No incluye la compra de Ultra Maritime ni efectos de órdenes ejecutivas [20]. No hay un plan a medio plazo publicado con cifras; la empresa habla de triplicar o cuadruplicar la producción de PAC-3, THAAD y PrSM en siete años [19].',
    estimaciones: [
      { periodo: '2026e', ingresos: 80987, ebitda: 11344, ebit: 9709, bpa: 30.43, dpa: 14.01, fuente: 'MarketScreener [1]' },
      { periodo: '2027e', ingresos: 85602, ebitda: 11997, ebit: 10273, bpa: 32.73, dpa: 14.61, fuente: 'MarketScreener [1]' },
      { periodo: '2028e', ingresos: 90473, ebitda: 12638, ebit: 10775, bpa: 35.19, dpa: 15.28, fuente: 'MarketScreener [1]' },
    ],
    recomendaciones: { n_analistas: 23, comprar: null, mantener: null, vender: null, po_medio: 621.24, po_min: 486.0, po_max: 756.0 },
    revisiones: 'Solo hay una fuente gratuita con estimaciones completas (MarketScreener, 23 analistas, consenso «sobreponderar») [1, 2]. El BPA de 2026 del consenso (30,43) cuadra con el punto medio de la guía (30,30) [20]. Tras el 1T26 los analistas recortaron objetivos por los retrasos del F-16 y del C-130. En octubre de 2026 hay posturas encontradas: Vertical Research sube la recomendación a comprar y Bernstein recorta el objetivo. El consenso de 2027-2028 parece suponer que vuelven las recompras: su BPA crece un 7,5 % al año con el beneficio neto al 7 % [1]. No hay serie pública de revisiones a 3 y 12 meses.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad,
    rentabilidades: b.rentabilidades,
    anual: b.anual.filter((x) => x.anio >= '2018'),
    beta: 0.11, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: 1.39,
    comentario: 'A 10 años la acción rinde un 11,3 % anual con dividendos, frente al 15,5 % del S&P 500 y el 13,6 % del ETF aeroespacial ITA [3]. Ha ido por detrás del índice en 2020-2021 (pandemia y presupuestos planos), 2023-2025 (pérdidas de programas, recorte del F-35 en el FY2026) y en lo que va de 2026 (+9,9 % frente a +13,7 %) [3]. Su mejor año relativo fue 2022 (+40,5 % con la guerra de Ucrania). En 2026 marcó un máximo de 692 USD el 2-mar, con la petición de 1,5 billones y el conflicto con Irán, y cayó a 522 USD. La caída vino del 1T26 por debajo de lo esperado, de la parada de las recompras por la orden ejecutiva y de la duda sobre los 350.000 M de reconciliación [3, 19]. La beta mensual a 5 años frente al SPY es de solo 0,11 (semanal 0,33): la acción se mueve con la política de defensa, no con el mercado [3].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: cierre[y], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'El PER al cierre de cada año sobre el BPA publicado oscila mucho por los cargos de pensiones y de programas: 22,5 veces en 2022 y en 2025, 21,8 en 2024, 16,5 en 2023 [3]. Con el BPA normalizado de cada año (sin liquidaciones de pensiones ni las grandes pérdidas de 2024-2025), la historia es estable: entre 12,9 y 17,9 veces de 2018 a 2025, con mediana de 16,7 veces en 2021-2025. Hoy cotiza a 17,2 veces el BPA del consenso de 2026 y a 16,6 veces nuestro BPA de 2027: en la parte alta de su rango histórico, pero por debajo de sus comparables de EE. UU. (GD 19,1x; NOC 17,0x; RTX 25,2x) [1, 5, 6, 7].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Contratistas principales de defensa de EE. UU. (Northrop Grumman, General Dynamics, L3Harris y RTX, este con la mitad del negocio civil) y los tres grandes europeos con perfil parecido (BAE, Rheinmetall, Leonardo). Todos venden sobre todo a gobiernos, con contratos largos y carteras de varios años. Quedan fuera Saab (33x) y Hensoldt (39x), por crecimientos y múltiplos de otro régimen, y Boeing, por las pérdidas del negocio civil. Los europeos se pasan a USD con el BCE del 14-oct (1,1195) [9, 10]. El EV/EBITDA de los próximos 12 meses de los estadounidenses no está en la fuente gratuita: va en blanco, y su crecimiento es la previsión de ventas a tres años de Stock Analysis.',
    empresas: [
      { nombre: 'Northrop Grumman', ticker: 'NOC', pais: 'US', capitalizacion: 70420, ev_ventas: 1.98, ev_ebitda_ltm: 11.7, ev_ebitda_ntm: null, per_ntm: 17.0, crecimiento_pct: 5.9, margen_ebitda_pct: 16.9, roic_pct: 15.0, dn_ebitda: 2.0, fcf_yield_pct: 5.2 },
      { nombre: 'General Dynamics', ticker: 'GD', pais: 'US', capitalizacion: 90410, ev_ventas: 1.74, ev_ebitda_ltm: 14.4, ev_ebitda_ntm: null, per_ntm: 19.1, crecimiento_pct: 5.3, margen_ebitda_pct: 12.1, roic_pct: 14.6, dn_ebitda: 0.8, fcf_yield_pct: 7.1 },
      { nombre: 'RTX', ticker: 'RTX', pais: 'US', capitalizacion: 251320, ev_ventas: 3.01, ev_ebitda_ltm: 17.7, ev_ebitda_ntm: null, per_ntm: 25.2, crecimiento_pct: 7.7, margen_ebitda_pct: 17.0, roic_pct: 9.4, dn_ebitda: 1.9, fcf_yield_pct: 4.5 },
      { nombre: 'L3Harris', ticker: 'LHX', pais: 'US', capitalizacion: 44230, ev_ventas: 2.34, ev_ebitda_ltm: 13.0, ev_ebitda_ntm: null, per_ntm: 18.8, crecimiento_pct: 6.4, margen_ebitda_pct: 18.1, roic_pct: 8.1, dn_ebitda: 2.1, fcf_yield_pct: 6.4 },
      { nombre: 'BAE Systems', ticker: 'BA.', pais: 'GB', capitalizacion: Math.round(64618 * EUR), ev_ventas: 2.04, ev_ebitda_ltm: 14.3, ev_ebitda_ntm: 11.8, per_ntm: 21.6, crecimiento_pct: 16.1, margen_ebitda_pct: 12.8, roic_pct: 13.7, dn_ebitda: 1.3, fcf_yield_pct: 8.6 },
      { nombre: 'Rheinmetall', ticker: 'RHM', pais: 'DE', capitalizacion: Math.round(45759 * EUR), ev_ventas: 4.32, ev_ebitda_ltm: 20.3, ev_ebitda_ntm: 12.0, per_ntm: 20.5, crecimiento_pct: 39.9, margen_ebitda_pct: 20.2, roic_pct: 18.7, dn_ebitda: 1.2, fcf_yield_pct: 0.9 },
      { nombre: 'Leonardo', ticker: 'LDO', pais: 'IT', capitalizacion: Math.round(27762 * EUR), ev_ventas: 1.57, ev_ebitda_ltm: 12.4, ev_ebitda_ntm: 10.0, per_ntm: 17.0, crecimiento_pct: 13.6, margen_ebitda_pct: 11.3, roic_pct: 10.0, dn_ebitda: 1.5, fcf_yield_pct: 4.0 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'Ultra Maritime (guerra antisubmarina, EE. UU./Reino Unido)', comprador: 'Lockheed Martin', ev: 3450, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Precio de 3.450 M USD; cierre previsto en el 4T26; múltiplo no publicado [19].' },
      { fecha: '2023-08', objetivo: 'Ball Aerospace (sistemas espaciales y de defensa, EE. UU.)', comprador: 'BAE Systems', ev: 5600, ev_ventas: null, ev_ebitda: 19.6, prima_pct: null, excluir: false, comentario: '19,6 veces el EBITDA comparable de los últimos 12 meses según el vendedor [14].' },
      { fecha: '2022-12', objetivo: 'Aerojet Rocketdyne (motores de misiles, EE. UU.)', comprador: 'L3Harris', ev: 4700, ev_ventas: null, ev_ebitda: 16.5, prima_pct: 37, excluir: false, comentario: '16,5 veces el EBITDA ajustado; prima del 37 %. Lockheed había intentado comprarla en 2020 y renunció en 2022 por la FTC [15].' },
      { fecha: '2021-08', objetivo: 'Meggitt (componentes aeroespaciales y de defensa, Reino Unido)', comprador: 'Parker Hannifin', ev: Math.round(8416 * EUR), ev_ventas: null, ev_ebitda: 16.3, prima_pct: 70.5, excluir: false, comentario: 'EV de 7.100 M GBP; 16,3 veces el EBITDA de 2019; prima del 70,5 % (EV en USD con el tipo de la fecha de corte) [16].' },
      { fecha: '2023-12', objetivo: 'ESG Elektroniksystem- und Logistik (electrónica de defensa, Alemania)', comprador: 'Hensoldt', ev: Math.round(730 * EUR), ev_ventas: 2.21, ev_ebitda: 14.0, prima_pct: null, excluir: false, comentario: 'Unas 14 veces el EBITDA de 2024e antes de sinergias [17].' },
      { fecha: '2024-01', objetivo: 'Kaman (componentes aeroespaciales y de defensa, EE. UU.)', comprador: 'Arcline Investment Management', ev: 1800, ev_ventas: null, ev_ebitda: null, prima_pct: 105, excluir: false, comentario: 'Prima del 105 %; múltiplo de EBITDA no publicado [18].' },
    ],
    comentario: 'Las compras de empresas de electrónica y propulsión de defensa se pagan a 14-20 veces el EBITDA, muy por encima de las 12-14 veces a las que cotizan los grandes contratistas [14-17]. Es el precio de la escasez de activos con tecnología crítica, no un valor de control aplicable a Lockheed. Una compra de Lockheed es inviable por tamaño (137.000 M de valor empresa) y por regulación, y la FTC ya le bloqueó la integración vertical con Aerojet [15]. Por eso las transacciones no pesan en el valor objetivo.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'recomendaciones (reparto comprar/mantener/vender)', tipo: 'Complemento', intentos: '1) MarketScreener consenso (solo media y extremos); 2) Stock Analysis (no consultado el reparto); 3) prensa (solo cambios sueltos)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y artículos de LMT (sep-oct 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/LMT.xml' },
  { id: 2, titulo: 'Stocktwits: mensajes sobre $LMT (14-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/LMT.json' },
  { id: 3, titulo: 'Lockheed Martin: Strong Buy, But Not For The Obvious Reasons', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://seekingalpha.com/article/4953016-lockheed-martin-strong-buy-not-for-obvious-reasons' },
  { id: 4, titulo: 'Lockheed Martin has fallen nearly 25 % from its 2026 high. Is it finally time to buy?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-05-07', url: 'https://www.tikr.com/blog/lockheed-martin-has-fallen-nearly-25-from-its-2026-high-is-it-finally-time-to-buy' },
];
const Ex = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos y noticias)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Cuatro artículos de opinión de octubre son alcistas: cartera récord, misiles y recuperación del margen. Las noticias del mes mezclan contratos y la subida del dividendo con el desvío de piezas del F-35 a Hong Kong [1].' },
      { plataforma: 'Seeking Alpha («Strong Buy, But Not For The Obvious Reasons»)', fecha: '2026-10', n_comentarios: 9, tono: 'Positivo', resumen: 'Sostiene que el precio no refleja ni el beneficio de 2024 ni el de 2025, y que la caída desde 600 USD en agosto es de sentimiento. Reconoce que el flujo libre crece poco sin Ultra [3].' },
      { plataforma: 'Stocktwits ($LMT)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes cortos y alcistas tras la ampliación de Texas (6.000 empleos) y la subida del 3 % del 14-oct; dudas sobre el presupuesto y el recorte de objetivo de Bernstein [2].' },
      { plataforma: 'TIKR (blog con debate de inversores)', fecha: '2026-05', n_comentarios: 10, tono: 'Dividido', resumen: 'Tras la caída del 25 % desde el máximo, plantea si es momento de comprar: ve valor a 16,9 veces el beneficio, pero señala los problemas de Aeronáutica [4].' },
    ],
    temas: [
      { tema: 'Munición y defensa antimisil como motor', postura: 'Alcista', peso: 'Alto', contraste: 'Los datos lo respaldan: MFC crece un 19 % en el 2T26 y su cartera pasa de 46.650 a 87.882 M [1]. Pero el margen de MFC (14 %) no compensa por sí solo el resto.' },
      { tema: 'Presupuesto de 1,5 billones y reconciliación', postura: 'Dividida', peso: 'Alto', contraste: 'Con razón: la base de 1,15 billones parece asegurada, pero los 350.000 M de reconciliación no, y el año fiscal empezó con una prórroga [1].' },
      { tema: 'Recompras paradas y dividendo', postura: 'Dividida', peso: 'Medio', contraste: 'La empresa subió el dividendo un 4,3 % (3,60 USD por trimestre) pero no recompra desde el 1T26; el informe supone que no recompra.' },
      { tema: 'Ejecución en Aeronáutica (F-35, F-16, C-130, clasificado)', postura: 'Bajista', peso: 'Medio', contraste: 'Riesgo real: 395 M de ajustes desfavorables en el 1S26 y 427 M aún provisionados en el clasificado.' },
    ],
    lectura: 'El inversor particular está más optimista que hace tres meses: compra la caída desde 600 USD con el argumento de la munición y del presupuesto. Los artículos de opinión son casi todos alcistas. No hay euforia ni capitulación. El sentimiento coincide con el consenso de analistas (sobreponderar, objetivo de 621 USD) y es más optimista que nuestro BPA, que no supone recompras. El riesgo que los foros infravaloran es el de nuevas pérdidas en programas a precio fijo, el que más ha movido la acción en 2024-2025.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', Ex);
console.log('Notas A-E escritas. Insiders:', insiders.length, 'Cuenta:', cuenta.length, 'Balance:', balance.length);
