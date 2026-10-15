// Escribe las notas A-E de Galp Energia (corte 2026-10-15) a partir del XBRL ESEF (cuentas-xbrl.json, 2020-2024),
// las cuentas consolidadas de 2025, los informes trimestrales (4T22, 4T24, 1T26, 1S26), el avance del 3T26,
// bolsa.mjs, MarketScreener y prensa. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const G = 'https://www.galp.com/corp/Portals/0/Recursos';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Consolidated and Individual Financial Statements 2025 (cuenta, balance, flujos, segmentos, notas)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Investidores/IMR2025/ConsolidatedandIndividualFinancialStatements.pdf` },
  { id: 2, titulo: 'Integrated Management Report 2025 (resultados RCA por segmento, conciliación IFRS-RCA, gobierno, accionistas)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Investidores/IMR2025/IntegratedManagementReport.pdf` },
  { id: 3, titulo: 'Interim Management Report and Accounts, First Half 2026 (2T26 y 1S26, guía 2026 revisada, balance a 30-jun-2026)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-07-27', url: `${G}/Inv%202Q26/2Q26%20Report.pdf` },
  { id: 4, titulo: 'Interim Management Report, First Quarter 2026', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-04-27', url: `${G}/Inv%201Q26/1Q26%20Report.pdf` },
  { id: 5, titulo: '4th Quarter and Full Year 2024 Results (cuentas 2023-2024, RCA e IFRS)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2025-02-17', url: `${G}/Inv_4Q24/Galp_4Q24.pdf` },
  { id: 6, titulo: '4th Quarter and Full Year 2022 Results (cuentas 2021-2022, RCA e IFRS)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2023-02-13', url: `${G}/Investidores/4Q_Results_2022/Galp_4Q22.pdf` },
  { id: 7, titulo: '3Q26 Trading Update (producción 131 kboepd, margen de refino 33,8 USD/bep, Brent 97 USD; resultados el 26-oct)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-10-12', url: `${G}/Inv_3Q26/Trading%20Update_3Q26.pdf` },
  { id: 8, titulo: 'Informes ESEF 2020-2024 de Galp Energia (XBRL, LEI 2138003319Y7NM75FG53)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2025-04-30', url: 'https://filings.xbrl.org/api/filings?filter[entity.identifier]=2138003319Y7NM75FG53' },
  { id: 9, titulo: '4Q25 Results Presentation and Transcript (guía 2026, producción 111 kboepd en 2025, Namibia, Moeve)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Inv_4Q25/Galp%204Q25%20Results%20Presentation%20and%20Transcript.pdf` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));

// Cuenta IFRS (por naturaleza). EBITDA = el IFRS publicado; no_recurrentes_en_ebitda = RCA − IFRS (efecto inventario y partidas especiales),
// para que el EBITDA del motor sea el RCA (el que usan la empresa y el consenso). Resultado financiero = BAI − EBIT (incluye asociadas y el valor razonable de derivados).
const C = {
  2021: { ing: 15618 + 499, cv: 11752, ebitda: 2698, rca: 2322, ebit: 1670, bai: 843, imp: 652 + 41, min: 146, bn: 4, bpa: 0.00, dpa: 0.50, acc: 829.25 },
  2022: { ing: 26485 + 355, cv: 20920, ebitda: 3885, rca: 3849, ebit: 2381, bai: 3246, imp: 1434 + 53 + 34, min: 251, bn: 1475, bpa: 1.81, dpa: 0.52, acc: 815.0 },
  2023: { ing: 20455 + 314, cv: 14580, ebitda: 3710, rca: 3558, ebit: 2618, bai: 2586, imp: 997 + 44 + 94, min: 209, bn: 1242, bpa: 1.56, dpa: 0.54, acc: 796.0 },
  2024: { ing: 20830 + 481, cv: 15539, ebitda: 3507, rca: 3297, ebit: 2551, bai: 2340, imp: 1050 + 65 - 1, min: 186, bn: 1040, bpa: 1.36, dpa: 0.62, acc: 765.0 },
  2025: { ing: 18978 + 529, cv: 14293, ebitda: 2815, rca: 3039, ebit: 2136, bai: 2033, imp: 685 + 69, min: 160, bn: 1120, bpa: 1.51, dpa: 0.64, acc: 742.0 },
};
// Ajuste de 2023: el BAI incluye 94 M de otros impuestos no desglosados en el resumen; cuadrado contra el neto publicado (1.451 antes de minoritarios).
C[2023].imp = C[2023].bai - 1451;
const ANIOS = ['2021', '2022', '2023', '2024', '2025'];
const gastosFin = { 2021: 49 + 76, 2022: 70 + 85, 2023: 56 + 102, 2024: 60 + 80, 2025: 56 + 79 };
const cuenta = ANIOS.map((y) => {
  const c = C[y];
  return {
    periodo: y, ingresos: c.ing, coste_ventas: c.cv, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.ebitda - c.ebit, ebit: c.ebit,
    resultado_financiero: c.bai - c.ebit, bai: c.bai, impuestos: c.imp, minoritarios: c.min, beneficio_neto: c.bn, gastos_financieros: gastosFin[y],
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: c.rca - c.ebitda, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acc,
  };
});
const ltm = { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 19507 - 9833 + 11833, ebitda: 2815 - 1545 + 2329, ebit: 2136 - 1181 + 1941, beneficio_neto: 1120 - 677 + 651, bpa: r2((1120 - 677 + 651) / 730), dpa: 0.64, dpa_extraordinario: 0, fcf: 1224 - 594 + 591, participadas_en_ebitda: null, no_recurrentes_en_ebitda: (3039 - 1509 + 2216) - (2815 - 1545 + 2329) };

const b25 = { periodo: '2025', activo_total: 15329, activo_corriente: 6241, pasivo_corriente: 3711, pasivo_total: 10150, fondo_comercio: 44, intangibles: 571, inmovilizado_material: 6291, existencias: 1103, clientes: 1316, proveedores: 860, activos_contrato: null, pasivos_contrato: null, caja: 2350, deuda_financiera: 3682, arrendamientos: 1217, patrimonio_neto: 4419, minoritarios: 761, reservas: 3016 };
const historico = [...['2021', '2022', '2023', '2024'].map((y) => { const b = bx[y]; const { fin, ...resto } = b; return resto; }), b25];

// Flujos: 2024-2025 del estado de flujos IFRS; 2021-2023 flujo operativo IFRS (XBRL) y capex neto del flujo de caja de gestión.
const flujos = [
  { periodo: '2021', flujo_operativo: fx['2021'].flujo_operativo, capex: 525, pagos_arrendamientos: 115, adquisiciones: 0, desinversiones: 0, dividendos: fx['2021'].dividendos, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 61 + 76 },
  { periodo: '2022', flujo_operativo: fx['2022'].flujo_operativo, capex: 1266, pagos_arrendamientos: 132, adquisiciones: 0, desinversiones: 0, dividendos: fx['2022'].dividendos, recompras: 150, emision_acciones: 0, intereses_en_financiacion: 39 + 85 },
  { periodo: '2023', flujo_operativo: fx['2023'].flujo_operativo, capex: 1068, pagos_arrendamientos: 157, adquisiciones: 0, desinversiones: 209, dividendos: 422, recompras: 500, emision_acciones: 0, intereses_en_financiacion: 57 + 102 },
  { periodo: '2024', flujo_operativo: 2527, capex: 1377, pagos_arrendamientos: 197, adquisiciones: 56, desinversiones: 409, dividendos: 419, recompras: 351, emision_acciones: 0, intereses_en_financiacion: 98 + 135 },
  { periodo: '2025', flujo_operativo: 1403, capex: 1050, pagos_arrendamientos: 172, adquisiciones: 54, desinversiones: 1028, dividendos: 480, recompras: 250, emision_acciones: 0, intereses_en_financiacion: 25 + 89 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Mozambique Área 4 (Coral Sul) clasificada como mantenida para la venta en 2024 y vendida a ADNOC en 2025: sale de la cuenta RCA y del balance (1.794 M de activos para la venta a dic-24) [1, 5].' },
    ],
    comentario: 'Los ingresos dependen sobre todo del precio del crudo y de los productos: cayeron de 26.840 M en 2022 a 19.507 M en 2025 con el Brent de 99 a 69 USD, y el EBITDA RCA bajó de 3.849 M a 3.039 M (margen del 14,3 % al 15,6 %, porque el coste de las materias primas cae con el precio) [1, 2, 6]. En 2025 la producción subió a 111 kboepd con el arranque de Bacalhau, que compensó en parte un Brent 11 USD más bajo; el upstream bajó de 2.078 M a 1.682 M y el industrial y midstream subió de 876 M a 952 M por el trading de gas y GNL [2, 9]. En 2026 la guerra de Irán cambia la escala: 2.216 M de EBITDA RCA en el primer semestre (+47 %), guía de unos 4.000 M (antes >2.600 M) y un 3T con margen de refino de 33,8 USD/bep y Brent de 97 USD [3, 7]. No hay crecimiento orgánico de volumen fuera del upstream: el refino procesa ~85-90 Mbep al año.',
    ajustes: 'La empresa y el consenso miden el resultado a coste de reposición ajustado (RCA): quitan el efecto inventario (la diferencia entre el coste medio del inventario y el precio de reposición) y las partidas especiales (valor razonable de derivados sin liquidar, plusvalías y deterioros, efecto del tipo de cambio en impuestos diferidos de Brasil). En la cuenta, el EBITDA es el IFRS publicado y la diferencia con el RCA va en «no recurrentes» (2025: +224 M; 2024: −210 M); el beneficio neto y el BPA son los IFRS. El RCA neto fue 457, 881, 1.002, 961 y 1.154 M de 2021 a 2025 [1, 2, 5, 6], y es la base del BPA de la proyección y de la historia del PER. Los derivados movieron el resultado financiero IFRS en −832 M en 2021 y +806 M en 2022.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 5610, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 820, margen_ebitda_pct: r1(820 / 5610 * 100), bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 4906, crecimiento_pct: r1((4906 / 5219 - 1) * 100), crecimiento_organico_pct: null, ebitda: 688, margen_ebitda_pct: r1(688 / 4906 * 100), bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 9833 - 5026, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 669, margen_ebitda_pct: r1(669 / 4807 * 100), bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 5026, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 840, margen_ebitda_pct: r1(840 / 5026 * 100), bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 3039 - 669 - 840 - 619, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 619, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T26', ingresos: 5035, crecimiento_pct: r1((5035 / 4807 - 1) * 100), crecimiento_organico_pct: null, ebitda: 943, margen_ebitda_pct: r1(943 / 5035 * 100), bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 6797, crecimiento_pct: r1((6797 / 5026 - 1) * 100), crecimiento_organico_pct: null, ebitda: 1272, margen_ebitda_pct: r1(1272 / 6797 * 100), bpa: null, vs_consenso: null },
    ],
    ultima_presentacion: 'En marzo, con el Brent a 60 USD de hipótesis, la dirección limitó la guía a 2026 (EBITDA >2.600 M, flujo operativo >2.000 M, producción 125-130 kboepd) por la negociación con Moeve, y presentó la entrada de TotalEnergies en Mopane como el paso que da a Galp «un perfil de crecimiento de producción mucho más tangible» [9]. En julio el mensaje fue de captura de un entorno volátil: EBITDA RCA de 1.272 M en el 2T, guía subida a unos 4.000 M (Brent 80 USD, margen de refino 13 USD/bep), dividendo de 0,70 EUR (+10 %) con 0,35 EUR a cuenta en agosto, y la firma con Moeve aplazada al segundo semestre «dado el tamaño de la operación» [3]. La guía del segundo semestre supone un Brent de 70 USD y un margen de 10 USD/bep, por debajo de lo que dio el 3T (97 USD y 33,8 USD/bep) [3, 7]. La dirección no ha dado cifras de recursos de Mopane ni el calendario de la decisión de inversión, y no ha explicado cómo se repartirían deuda y dividendos en la sociedad conjunta con Moeve.',
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: null,
    liquidez: 'Caja 1.987 M y líneas no dispuestas 2.235 M (75 % comprometidas a más de un año) a 30-jun-2026; deuda bruta 3.366 M (bonos 1.376 M, préstamos 1.990 M); coste medio de la financiación 2,94 % [3].',
    rating: null,
    coste_deuda_pct: 2.94,
    vida_media_anios: null,
    otros_pasivos: 'Provisiones de 1.461 M a 30-jun-2026, sobre todo de abandono de campos en Brasil, que se pagarán a partir de la década de 2040 y no se incluyen en la deuda neta [3]. Pensiones y otros beneficios 222 M. Garantías de la matriz por 8.078 M ligadas a contratos comerciales de filiales (GNL, trading) [3]. Instrumentos financieros derivados pasivos de 665 M (169 M no corrientes y 496 M corrientes) a junio, por las coberturas de margen de refino y de materias primas: su valor razonable restó 358 M al resultado del primer semestre [3]. Los minoritarios (933 M en libros) son sobre todo el 30 % de Sinopec en Petrogal Brasil: su valor económico es muy superior al contable [3].',
    comentario: 'La deuda neta es baja para el sector: 1.379 M a 30-jun-2026 (0,40 veces el EBITDA RCA de 12 meses), más 1.232 M de arrendamientos (buques FPSO y de GNL, estaciones) [3]. Ha estado entre 1.200 y 1.555 M desde 2022 pese a pagar 4.4 bn en dividendos y recompras en cuatro años, porque las ventas de Angola (2024) y Mozambique (2025) aportaron 1.433 M [1, 5]. El circulante subió 581 M en 2025 y 294 M en el primer semestre de 2026 por el precio de las materias primas: con un Brent alto Galp inmoviliza caja en inventario y clientes, y la libera cuando baja.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo de gestión (OCF ajustado) fue de 2.179 M en 2025 y 1.789 M en el primer semestre de 2026, con una guía de unos 3.000 M para el año [2, 3]. La inversión orgánica ronda 1.000 M anuales: Bacalhau y pozos de relleno en Tupi en Brasil, la unidad de biocombustibles avanzados (HVO/SAF) y el electrolizador de 100 MW en Sines, y solar y baterías [2, 3]. En 2026 se suman 318 M por 351 MW eólicos en España. El capex de mantenimiento es estimación propia: unos 600-700 M (la amortización RCA fue 664 M en 2025). El flujo libre de 2025 (1.224 M) incluye 1.024 M de ventas de activos; sin ellas habría sido de unos 200 M por la subida del circulante (581 M) [2].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'Ernst & Young Audit & Associados, SROC, S.A.', anios_auditor: null, opinion: 'Favorable (cuentas 2025)',
    comentario: 'Las cifras IFRS son ruidosas por diseño: el coste medio del inventario y el valor razonable de los derivados de cobertura mueven el beneficio cientos de millones de un trimestre a otro (−383 M de partidas especiales en el 1T26 y +141 M en el 2T26) [3]. Por eso el análisis usa el RCA, que la empresa concilia segmento a segmento [1, 3]. En 2026 Galp cambió el criterio con que valora el crudo propio en tránsito en el RCA (a precio de mercado en vez de coste) sin reexpresar 2025: sube el RCA de 2026 frente al de 2025 [3]. La tasa impositiva es muy alta (44 % del RCA en 2025 y 45 % en el primer semestre) por la participación especial (SPT) de Brasil, la contribución extraordinaria (CESE) en Portugal y el impuesto provisional a la exportación de crudo de Brasil [2, 3].',
    senales: [
      { senal: 'Cambio de criterio en el crudo en tránsito (RCA 2026 frente a 2025 sin reexpresar)', nivel: 'Media', comentario: 'Infla la comparación interanual del upstream en 2026; el efecto no se cuantifica [3].' },
      { senal: 'Derivados de cobertura con valor razonable de −358 M en el resultado del 1S26', nivel: 'Media', comentario: 'Coberturas del margen de refino y del gas que limitan la captura del pico: −89 M en el EBITDA del semestre [3].' },
      { senal: 'Flujo libre de 2025 apoyado en ventas de activos (1.024 M)', nivel: 'Baja', comentario: 'Mozambique y estaciones en África; sin ellas el flujo libre fue de unos 200 M por el circulante [2].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Upstream (Brasil, Namibia)', descripcion: 'Producción de crudo y gas en el presal de Brasil (Tupi, Iracema, Berbigão-Sururu, Bacalhau) con Petrobras y Equinor; exploración en Namibia.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 3562, resultado: 2078 }, { periodo: '2025', ingresos: 2639, resultado: 1682 }] },
      { nombre: 'Industrial y midstream', descripcion: 'Refinería de Sines, logística y trading de crudo, productos, gas, GNL, CO2 y electricidad.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 9320, resultado: 876 }, { periodo: '2025', ingresos: 7446, resultado: 952 }] },
      { nombre: 'Comercial', descripcion: 'Venta a clientes de combustibles, gas, electricidad, movilidad eléctrica y tiendas en la Península y África.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 10152, resultado: 306 }, { periodo: '2025', ingresos: 10312, resultado: 384 }] },
      { nombre: 'Renovables', descripcion: 'Solar, eólica y baterías en la Península (2,7 GW a sep-26).', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 92, resultado: 47 }, { periodo: '2025', ingresos: 90, resultado: 50 }] },
      { nombre: 'Otros y eliminaciones', descripcion: 'Holding, reaseguro y servicios compartidos, menos las ventas entre segmentos.', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 258 - 2073, resultado: -11 }, { periodo: '2025', ingresos: 236 - 1217, resultado: -29 }] },
    ],
    geografias: null, geografias_criterio: null,
    kpis: [
      { kpi: 'Producción (kboepd)', valor_anterior: '109 (2024)', valor_actual: '111 (2025); 131 (3T26)', variacion: '+2 %; +14 % interanual en el 3T26', comentario: 'Bacalhau en subida desde finales de 2025 [2, 7].' },
      { kpi: 'Margen de refino de Galp (USD/bep)', valor_anterior: '7,4 (2024)', valor_actual: '7,1 (2025); 33,8 (3T26)', variacion: 'n.s.', comentario: 'Destilados medios tras el cierre de Ormuz [2, 7].' },
      { kpi: 'Materias primas procesadas (Mbep)', valor_anterior: '86 (2024)', valor_actual: '41,6 (1S26)', variacion: '−3 % en el 1S26', comentario: 'Temporal en enero-febrero [3].' },
      { kpi: 'Gas y GNL vendidos y negociados (TWh)', valor_anterior: '50 (2024)', valor_actual: '64 (2025)', variacion: '+27 %', comentario: 'Contrato con Venture Global [2].' },
      { kpi: 'Capacidad renovable (GW)', valor_anterior: '1,7 (3T25)', valor_actual: '2,7 (3T26)', variacion: '+64 %', comentario: 'Compra de 351 MW eólicos [7].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Galp reparte un tercio del flujo de gestión (OCF) en dividendos y recompras [9]. Dividendo de 0,64 EUR por 2025 (+4 %) y propuesta de 0,70 EUR por 2026 (+10 %), con 0,35 EUR a cuenta pagados en agosto de 2026 [2, 3]. Recompras de 250 M en 2025 (16,47 M de acciones a 15,18 EUR, amortizadas en marzo de 2026) y otro programa de 250 M en curso hasta el 27-nov-2026 (11,69 M de acciones a 19,30 EUR hasta junio) [3].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Cartera eólica de 351 MW en España', importe: 318, ev_ebitda: null, financiacion: 'Caja (más 79 M de deuda consolidada)', resultado: 'Consolidada desde junio de 2026 [3].' },
      { anio: '2025', objetivo: 'Venta: Mozambique Área 4 (Coral Sul) a ADNOC', importe: null, ev_ebitda: null, financiacion: 'Desinversión', resultado: 'Cobro en 2025; parte de los 1.024 M de desinversiones [2].' },
      { anio: '2025', objetivo: 'Permuta: 40 % de PEL 83 (Mopane) a TotalEnergies por 10 % de PEL 56 (Venus) y 9,39 % de PEL 91, con acarreo del 50 % de la inversión de Galp', importe: null, ev_ebitda: null, financiacion: 'Sin pago en caja', resultado: 'La acción cayó un 14,7 % el día del anuncio (9-dic-2025).' },
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) gráfico de vencimientos del informe del 1S26 (imagen sin texto); 2) nota 14 de las cuentas de 2025; 3) presentación de resultados', decision: 'Omitido' },
    { seccion: 'balance', campo: 'rating', tipo: 'Complemento', intentos: '1) informe anual 2025; 2) informe del 1S26; 3) no buscado en prensa por presupuesto', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) nota de segmentos de 2025 (por actividad, no por país); 2) informe de gestión 2025; 3) informe del 1S26', decision: 'Omitido' },
  ],
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Integrated Management Report 2025 (estrategia, mercados, Sines, Brasil, Namibia)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Investidores/IMR2025/IntegratedManagementReport.pdf` },
  { id: 2, titulo: 'Interim Management Report First Half 2026 (indicadores de mercado: Brent, diferenciales, mercado ibérico de productos)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-07-27', url: `${G}/Inv%202Q26/2Q26%20Report.pdf` },
  { id: 3, titulo: 'Middle East fuel shock delivers record refining margins for Galp (Reuters)', editor: 'Baird Maritime', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://www.bairdmaritime.com/offshore/refining-processing/middle-east-fuel-shock-delivers-record-refining-margins-for-galp' },
  { id: 4, titulo: 'TotalEnergies, Galp to launch exploration, appraisal campaign for development of Namibia discovery', editor: 'Engineering News', tipo: 'Prensa', fecha: '2025-12-09', url: 'https://www.engineeringnews.co.za/article/totalenergies-galp-to-launch-exploration-appraisal-campaign-for-development-of-namibia-discovery-2025-12-09' },
  { id: 5, titulo: 'Moeve and Galp negotiating to combine downstream activities', editor: 'Hydrocarbon Processing', tipo: 'Prensa', fecha: '2026-01-08', url: 'https://hydrocarbonprocessing.com/news/2026/01/moeve-and-galp-negotiating-to-combine-downstream-activities-to-form-leading-european-energy-and-mobility-platforms/' },
  { id: 6, titulo: 'Moeve sees Galp downstream merger deal in second half of 2026', editor: 'Ship & Bunker', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://shipandbunker.com/news/emea/815117-moeve-sees-galp-downstream-merger-deal-in-second-half-of-2026' },
  { id: 7, titulo: 'Futuros del Brent (BZ=F, BZZ26, BZZ27, BZZ28), cierres del 14 y 15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BZ=F' },
  { id: 8, titulo: '3Q26 Trading Update', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-10-12', url: `${G}/Inv_3Q26/Trading%20Update_3Q26.pdf` },
  { id: 9, titulo: 'Galp Energia, SGPS: previsiones de MarketScreener (EBITDA, BPA, dividendo 2026-2028)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/GALP-ENERGIA-SGPS-S-A-35373/finances/' },
  { id: 10, titulo: 'Repsol, OMV, Eni, TotalEnergies y Equinor: datos financieros 2025 de MarketScreener', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/REPSOL-S-A-75044/finances/' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Galp es la petrolera integrada portuguesa. Produce crudo en el presal de Brasil (131 kboepd en el 3T26, un 90 % petróleo), donde es socia de Petrobras y opera con Sinopec como minoritario del 30 % en Petrogal Brasil [1, 8]. Refina en Sines (unos 226.000 barriles al día, el 85-90 % del combustible de Portugal) y comercia crudo, productos, gas natural y GNL desde contratos en Nigeria, Argelia y Estados Unidos [1, 3]. Vende a clientes finales en Portugal, España y África (combustibles en estaciones de servicio, gas, electricidad y puntos de recarga) y tiene 2,7 GW de solar, eólica y baterías en la Península [8]. En Namibia descubrió Mopane (PEL 83), donde desde 2026 TotalEnergies es operador con el 40 % [4].',
    como_gana_dinero: 'El beneficio sale en un 55 % del upstream (1.682 M de 3.039 M de EBITDA RCA en 2025), que vende el barril a precio del Brent con un coste de producción de 3,2 USD/bep y una amortización de unos 10 USD/bep: cada 5 USD/bbl de Brent son unos 90 M de EBITDA por semestre [1, 2]. El refino gana el diferencial entre productos y crudo (margen de refino de Galp: 7,1 USD/bep en 2025, 33,8 en el 3T26), con costes fijos de unos 300 M al año: cada 5 USD/bep son unos 120 M por semestre después de coberturas [1, 2, 8]. El trading de gas y GNL aporta unos 500 M de EBITDA estables; el comercial, 384 M con un tercio de tiendas y servicios [1]. No hay ingresos recurrentes por contrato: casi todo el resultado depende de precios internacionales.',
    clientes: 'Sin concentración relevante: el crudo se vende en cargamentos a refinerías internacionales, el refino abastece al mercado ibérico (32 Mt de productos al semestre) y el comercial atiende a miles de empresas y hogares [2]. El poder de precios es nulo en upstream y refino (precio internacional) y limitado en el comercial, que compite con Repsol, Moeve y BP en la Península.',
  },
  sector: {
    definicion: 'Petroleras integradas europeas de tamaño medio: producción de crudo, refino y venta de combustibles. El valor de Galp depende de dos precios internacionales, el Brent y el margen de refino del Atlántico, más que del tamaño de un mercado. Como referencia de volumen se usa el mercado ibérico de productos petrolíferos (unos 64 Mt al año según APETRO y CORES, recogidos por Galp), donde vende Sines [2].',
    tamano: '≈ 64 Mt de productos petrolíferos al año en la Península (32,0 Mt en el 1S26) [2]',
    unidad_serie: null, serie: null, tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Precio del Brent', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Brent de 69 USD en el 3T25, 97 USD en el 3T26 y 106 USD el 15-oct; los futuros de dic-27 cotizan a 85,6 USD y los de dic-28 a 77,6 USD [7, 8].' },
      { driver: 'Margen de refino (destilados medios)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Diferencial del gasóleo en el noroeste de Europa de 373,5 USD/t en el 2T26 frente a 137,5 USD/t un año antes [2].' },
      { driver: 'Producción del presal (Bacalhau)', efecto: '+', horizonte: 'Estructural', evidencia: 'De 109 kboepd en 2024 a 131 kboepd en el 3T26 [1, 8].' },
      { driver: 'Transición energética en Europa', efecto: '−', horizonte: 'Estructural', evidencia: 'Galp invierte en HVO/SAF y 100 MW de electrolizador en Sines para sustituir parte del refino fósil [1].' },
      { driver: 'Fletes y logística (Ormuz)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Fletes récord de petroleros en las últimas semanas, que restan margen [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Commodities a precio internacional; en el comercial ibérico compiten Repsol, Moeve y BP.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Precio fijado por el mercado; sin poder individual de los clientes.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'La OPEP+ y la geopolítica fijan el coste del crudo para el refino.' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Refinerías y presal exigen miles de millones y permisos.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Coche eléctrico y biocombustibles en la Península a largo plazo.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pico de ciclo inducido por un choque de oferta: el Brent pasó de 69 USD a 97 USD de media trimestral y el margen de refino de Galp se multiplicó por 3,6 en un año [8]. La curva de futuros descuenta normalización: 106 USD al contado, 85,6 USD para dic-27 y 77,6 USD para dic-28 [7]. En 2020 el sector perdió dinero (Galp, −42 M de RCA); en 2022, con la invasión de Ucrania, el margen de refino llegó a 15 USD/bep y volvió a 7 USD/bep en dos años [1].' },
    regulacion: 'Portugal mantiene la contribución extraordinaria sobre el sector energético (CESE); Brasil cobra la participación especial (SPT) en los campos grandes y en 2026 aplicó un impuesto provisional a la exportación de crudo [2]. La UE exige cuotas crecientes de combustibles renovables en transporte y aviación (ReFuelEU, SAF), que Galp atenderá con la unidad de HVO/SAF de Sines [1]. La fusión con Moeve necesita autorización de competencia en España y Portugal [5].',
    tendencias: 'El refino europeo cierra capacidad y depende de importar destilados; la guerra de Irán lo ha convertido en un cuello de botella con márgenes récord [3]. A largo plazo, la electrificación del transporte en la Península reduce la demanda de gasolina y gasóleo. Galp gana con el presal (crudo de bajo coste y bajas emisiones por barril) y con Namibia si Mopane llega a desarrollarse, y pierde con el declive estructural del refino; de ahí la negociación para meter Sines en una sociedad conjunta con Moeve controlada por Mubadala y Carlyle [5, 6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Única refinería de Portugal (85-90 % del combustible del país) y productor mediano en el presal de Brasil (131 kboepd, frente a más de 2.000 kboepd de Petrobras) [3, 8].',
    competidores: [
      { nombre: 'Repsol', pais: 'España', ticker: 'REP', ingresos: 57218, cuota_pct: null, margen_ebit_pct: null, comentario: 'Refino y comercial ibérico; producción en EE. UU., Noruega y Latinoamérica [10].' },
      { nombre: 'Moeve (antes Cepsa)', pais: 'España', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Refinerías de San Roque y La Rábida; socio previsto en la fusión del refino y el comercial [5].' },
      { nombre: 'OMV', pais: 'Austria', ticker: 'OMV', ingresos: 25118, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrada centroeuropea con química (Borouge) [10].' },
      { nombre: 'Eni', pais: 'Italia', ticker: 'ENI', ingresos: 82151, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrada con exploración y GNL [10].' },
      { nombre: 'TotalEnergies', pais: 'Francia', ticker: 'TTE', ingresos: Math.round(182344 / 1.12), cuota_pct: null, margen_ebit_pct: null, comentario: 'Operador en Mopane desde 2026 [4, 10].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Bajos en combustibles; algo en contratos B2B de gas y electricidad.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias en el presal (Tupi, Bacalhau) con coste de producción de 3,2 USD/bep [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Barriles del presal en la parte baja de la curva de costes; Sines es de las refinerías complejas de la costa atlántica.' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Única refinería de Portugal: el mercado no admite otra.' },
      ],
    },
    amenazas: 'La principal es el declive de los campos maduros de Tupi sin Namibia: sin Mopane en producción a principios de la década de 2030, la producción vuelve a caer tras el pico de Bacalhau. En refino, el riesgo es la normalización del margen tras la guerra y el aumento de capacidad en Oriente Medio y Asia. La operación con Moeve puede diluir el control de Sines (Galp con algo más del 20 % de la sociedad industrial) [6].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Galp nace en 1999 de la integración de Petrogal, la petrolera estatal portuguesa, con el gas natural del país. Sale a bolsa en 2006. Su giro lo marca el presal de Brasil: socia de Petrobras en el bloque BM-S-11 (Tupi), descubierto en 2006, que la convirtió en productora. En 2012 Sinopec compró el 30 % de Petrogal Brasil. Amorim Energia es el accionista de referencia desde 2006. Entre 2023 y 2025 vendió Angola y Mozambique, y en 2024 anunció el descubrimiento de Mopane en Namibia. En 2025 el consejero delegado Filipe Silva dimitió y la empresa pasó a dos consejeros delegados [1].',
    hitos: [
      { anio: '1999', hito: 'Constitución de Galp Energia (Petrogal y gas natural).' },
      { anio: '2006', hito: 'Salida a bolsa en Lisboa; descubrimiento de Tupi en el presal.' },
      { anio: '2012', hito: 'Sinopec entra con el 30 % de Petrogal Brasil.' },
      { anio: '2024', hito: 'Descubrimiento de Mopane (Namibia); venta de Angola.' },
      { anio: '2025', hito: 'Arranque de Bacalhau; venta de Mozambique a ADNOC; permuta de Mopane con TotalEnergies [4].' },
      { anio: '2026', hito: 'Negociación con Moeve para unir refino y comercial; guía subida por la guerra de Irán [5].' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: null,
    materialidad: 'Las emisiones del refino (Sines) y su coste de CO2 pesan en el margen; Galp invierte en HVO/SAF y 100 MW de hidrógeno verde en Sines para reducirlas [1]. La seguridad de las operaciones offshore y del refino es material (indicador de eventos de proceso de nivel 1 en el informe) [1]. Solo el 0,6 % de las ventas de 2025 se alinea con la taxonomía europea [1].',
    controversias: 'En enero de 2025 dimitió el consejero delegado tras una investigación interna por una relación personal no comunicada; la empresa pasó a dos consejeros delegados. No se han encontrado sanciones relevantes en los últimos tres años en las fuentes leídas.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie, TCAC y CR5', tipo: 'Complemento', intentos: '1) informe de gestión 2025 (sin serie de mercado); 2) indicadores de mercado del 1S26 (solo semestral); 3) APETRO y CORES no consultados por presupuesto', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe de gestión 2025; 2) web de sostenibilidad de Galp; 3) no buscado en MSCI y Sustainalytics por presupuesto', decision: 'Omitido' },
  ],
  fuentes: fB,
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Integrated Management Report 2025, Our corporate governance (consejo, comisión ejecutiva, remuneración, junta)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Investidores/IMR2025/IntegratedManagementReport.pdf` },
  { id: 2, titulo: 'Shareholding structure (Amorim Energia 35,76 %, Parpública 8,03 % de los derechos de voto)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2024-04-30', url: 'https://galp.com/corp/en/investors/information-to-shareholders/shareholding-structure' },
  { id: 3, titulo: 'Amorim Group pressures State to sell share in Galp', editor: 'Essential Business', tipo: 'Prensa', fecha: '2024-11-27', url: 'https://www.essential-business.pt/2024/11/27/amorim-group-pressures-state-to-sell-share-in-galp/' },
  { id: 4, titulo: 'Interim Management Report First Half 2026 (acciones propias, mensaje de los co-CEO)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-07-27', url: `${G}/Inv%202Q26/2Q26%20Report.pdf` },
  { id: 5, titulo: '4Q25 Results Presentation and Transcript (guía 2026 y cumplimiento de 2025)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Inv_4Q25/Galp%204Q25%20Results%20Presentation%20and%20Transcript.pdf` },
];
const C_ = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Maria João Carioca', cargo: 'Consejera delegada (co-CEO) y directora financiera', desde: '2025', participacion_pct: null, trayectoria: 'Co-CEO desde enero de 2025 tras la salida de Filipe Silva; dirige estrategia, cartera y fusiones (Moeve, Mopane), finanzas y riesgos [1].' },
      { nombre: 'João Marques da Silva', cargo: 'Consejero delegado (co-CEO) y responsable comercial', desde: '2025', participacion_pct: null, trayectoria: 'Co-CEO desde enero de 2025; dirige el negocio comercial, movilidad y comunicación. El comercial subió su EBITDA un 25 % en 2025 [1].' },
      { nombre: 'Paula Amorim', cargo: 'Presidenta del consejo (no ejecutiva)', desde: '2016', participacion_pct: null, trayectoria: 'Representa a la familia Amorim, accionista de control a través de Amorim Energia [1, 2].' },
      { nombre: 'Nuno Holbech Bastos', cargo: 'Consejero ejecutivo, upstream', desde: '2025', participacion_pct: null, trayectoria: 'Responsable de Brasil y Namibia; cooptado en 2025 y ratificado en la junta de mayo de 2025 [1].' },
      { nombre: 'Ronald Doesburg', cargo: 'Consejero ejecutivo, industrial', desde: null, participacion_pct: null, trayectoria: 'Responsable de refino, biocombustibles e hidrógeno en Sines [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Producción y EBITDA según la guía de inicio de año', real: 'Producción de 111 kboepd; «un año de cumplimiento por encima de la guía» según la empresa', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA RCA >2.600 M y producción 125-130 kboepd (marzo, Brent 60 USD)', real: 'Guía subida en julio a unos 4.000 M y unos 130 kboepd; 2.216 M en el 1S', cumplida: 'Sí' },
    ],
    comentario: 'El equipo es nuevo en la cúpula: los dos consejeros delegados llevan desde enero de 2025, tras la dimisión de Filipe Silva [1]. En su primer año y medio han cerrado la permuta de Mopane con TotalEnergies, vendido Mozambique, comprado eólica en España y abierto la negociación con Moeve, y han cumplido la guía [4, 5]. El reparto de la dirección entre dos personas no tiene precedente en las grandes petroleras europeas; no hay plan de sucesión público.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Paula Amorim', cargo: 'Presidenta', tipo: 'Dominical', desde: '2016', comisiones: null },
      { nombre: 'Maria João Carioca', cargo: 'Co-CEO', tipo: 'Ejecutivo', desde: '2022', comisiones: 'Comisión ejecutiva' },
      { nombre: 'João Marques da Silva', cargo: 'Co-CEO', tipo: 'Ejecutivo', desde: '2025', comisiones: 'Comisión ejecutiva' },
      { nombre: 'Nuno Holbech Bastos', cargo: 'Consejero ejecutivo', tipo: 'Ejecutivo', desde: '2025', comisiones: 'Comisión ejecutiva' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 2,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'El variable anual (hasta el 100 % del fijo) pesa un 65 % en métricas cuantitativas: flujo de gestión (OCF) 65 %, objetivos estratégicos 10 %, seguridad 10 % y emisiones propias 15 %. El variable trienal (hasta el 60 % del fijo) mide OCF (55 %), rentabilidad total para el accionista frente a TotalEnergies, Repsol, OMV, Eni y los índices PSI20 y SXEGR (25 %) y ROACE (20 %); hay además un incentivo a largo plazo en acciones por TSR y CFFO frente a pares [1]. Premia caja y rentabilidad del capital, no crecimiento a cualquier precio. El consejo tiene 19 miembros: 13 no ejecutivos, 6 de ellos independientes (46,2 % de los no ejecutivos) [1].',
    accionistas: [
      { nombre: 'Amorim Energia (familia Amorim y Sonangol a través de Esperaza)', pct: 35.76, tipo: 'Control', variacion: 'Sobre 829 M de acciones (abr-24); con las amortizaciones de 2024-2026 su porcentaje sube a cerca del 40 % si no ha vendido [2, 3]' },
      { nombre: 'Parpública (Estado portugués)', pct: 8.03, tipo: 'Estado', variacion: 'Acciones no cotizadas; Amorim pidió en 2024 que el Estado vendiera [2, 3]' },
      { nombre: 'Autocartera', pct: 1.9, tipo: 'Autocartera', variacion: '14,02 M de acciones a 30-jun-2026, para amortizar [4]' },
    ],
    insiders: [],
    control_y_defensas: 'Amorim Energia controla de hecho la junta (35,76 % de los votos en 2024, más con las amortizaciones) y propone a la presidenta, Paula Amorim [1, 2]. Sonangol participa en Amorim Energia a través de Esperaza Holding (45 %). El Estado portugués conserva el 8 % mediante acciones no cotizadas. Todas las acciones tienen los mismos derechos de voto y económicos [1]. La negociación con Moeve dejaría la refinería en una sociedad controlada por Mubadala y Carlyle, con Galp por encima del 20 %.',
    alertas: ['Dimisión del consejero delegado en enero de 2025 tras una investigación interna (relación personal no comunicada); sustituido por dos consejeros delegados.'],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, votos de remuneración y remuneración del primer ejecutivo', tipo: 'Núcleo', intentos: '1) informe de gestión 2025, parte I (el consejo va en imagen); 2) parte II, informe de gobierno, no descargado; 3) web de inversores (sin actas en texto)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) web de Galp, comunicaciones de directivos; 2) CMVM, no consultada; 3) prensa sin operaciones relevantes', decision: 'Omitido' },
  ],
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios GALP.LS, EXSA.DE y EXH1.DE (precio, rentabilidades, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/GALP.LS/history' },
  { id: 2, titulo: 'Galp Energia: previsiones 2026-2028 (ventas, EBITDA, BPA, dividendo, deuda neta)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/GALP-ENERGIA-SGPS-S-A-35373/finances/' },
  { id: 3, titulo: 'Galp Energia: consenso de analistas (18, Outperform, objetivo medio 23,83 EUR, rango 18,40-28,00)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/GALP-ENERGIA-SGPS-S-A-35373/consensus/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 15-oct-2026: 3,42 %)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A?format=csv&lastNObservations=5&lang=en' },
  { id: 6, titulo: 'TotalEnergies: previsiones 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/TOTALENERGIES-SE-4717/finances/' },
  { id: 7, titulo: 'Repsol: previsiones 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/REPSOL-S-A-75044/finances/' },
  { id: 8, titulo: 'Equinor: previsiones 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/EQUINOR-ASA-1413290/finances/' },
  { id: 9, titulo: 'Eni: previsiones 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ENI-S-P-A-12391/finances/' },
  { id: 10, titulo: 'OMV: previsiones 2025-2027', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/OMV-AG-6492022/finances/' },
  { id: 11, titulo: 'Brent al contado y futuros (BZ=F, BZZ26, BZH27, BZZ27, BZZ28) y EUR/USD, cierres del 14-15 oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BZ=F' },
  { id: 12, titulo: 'TotalEnergies to partner with Galp Energia on Mopane discovery in Namibia (caída de la acción del 11,8 %)', editor: 'MarketScreener (Dow Jones)', tipo: 'Prensa', fecha: '2025-12-09', url: 'https://uk.marketscreener.com/news/totalenergies-to-partner-with-galp-energia-on-mopane-discovery-in-namibia-ce7d51d2de80f625' },
  { id: 13, titulo: '4Q22 y 4Q24 Results (RCA net income 2021-2024) y Integrated Management Report 2025 (RCA 2025, cierres de 2024 y 2025)', editor: 'Galp Energia, SGPS', tipo: 'Primaria', fecha: '2026-03-02', url: `${G}/Inv_4Q24/Galp_4Q24.pdf` },
  { id: 14, titulo: 'Galp teve prejuízos de 42 milhões em 2020 (RCA 2019: 560 M)', editor: 'Diário de Notícias', tipo: 'Prensa', fecha: '2021-02-22', url: 'https://www.dn.pt/arquivo/diario-de-noticias/galp-teve-prejuizos-de-42-milhoes-em-2020-13377213.html' },
  { id: 15, titulo: 'Galp targets Moeve deal signing by end of July', editor: 'ECO News', tipo: 'Prensa', fecha: '2026-04-27', url: 'https://econews.pt/2026/04/27/galp-targets-moeve-deal-signing-by-end-of-july/' },
  { id: 16, titulo: 'Middle East fuel shock delivers record refining margins for Galp (Reuters)', editor: 'Baird Maritime', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://www.bairdmaritime.com/offshore/refining-processing/middle-east-fuel-shock-delivers-record-refining-margins-for-galp' },
];
// Comparables: capitalización = precio × acciones implícitas (beneficio ÷ BPA de MarketScreener); NTM = 2,5/12 de 2026e + 9,5/12 de 2027e.
const FX = 1.12; // USD por EUR, 15-oct-2026 [D11]
const w26 = 2.5 / 12, w27 = 9.5 / 12;
const comp = (nombre, ticker, pais, precioEUR, ni26, eps26, eps27, e25, e26, e27, s25, dn25, fcf26, fcf27, usd) => {
  const k = usd ? 1 / FX : 1;
  const acc = ni26 / eps26; // millones
  const cap = precioEUR * acc;
  const ev = cap + dn25 * k;
  const epsNtm = (w26 * eps26 + w27 * eps27) * k;
  const ebNtm = (w26 * e26 + w27 * e27) * k;
  return { nombre, ticker, pais, capitalizacion: Math.round(cap), ev_ventas: r2(ev / (s25 * k)), ev_ebitda_ltm: r1(ev / (e25 * k)), ev_ebitda_ntm: r1(ev / ebNtm), per_ntm: r1(precioEUR / epsNtm), crecimiento_pct: null, margen_ebitda_pct: r1(e25 / s25 * 100), roic_pct: null, dn_ebitda: r1(dn25 / e25), fcf_yield_pct: r1((w26 * fcf26 + w27 * fcf27) * k / cap * 100) };
};
const empresas = [
  comp('TotalEnergies', 'TTE', 'FR', 80.21, 25946, 12.07, 10.90, 40555, 52897, 48418, 182344, 20215, 21248, 19371, true),
  comp('Repsol', 'REP', 'ES', 29.64, 5392, 4.808, 4.004, 7678, 11712, 9084, 57218, 5877, 4981, 3639, false),
  comp('Equinor', 'EQNR', 'NO', 45.25 / FX, 14202, 5.75, 4.309, 37670, 55665, 45863, 106462, 11888, 13940, 8807, true),
  comp('Eni', 'ENI', 'IT', 25.74, 8432, 3.005, 2.588, 15693, 20451, 19155, 82151, 15086, 9295, 8499, false),
  comp('OMV', 'OMV', 'AT', 73.10, 3523, 9.996, 8.378, 7115, 8577, 8104, 25118, 3633, 1963, 2364, false),
];
// Equinor: el precio está en USD (NYSE): se pasa a EUR y el BPA también (usd=true convierte el BPA; el precio ya va en EUR).
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Galp Energia, SGPS, S.A.', nombre_corto: 'Galp', ticker: 'GALP', isin: 'PTGAL0AM0009', mercado: 'Euronext Lisboa', indice_referencia: 'PSI', pais: 'Portugal', pais_iso: 'PT',
    sector: 'Energía', industria: 'Petróleo, gas y combustibles (integradas)', sede: 'Lisboa', fundacion: '1999', empleados: 7095, web: 'www.galp.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 722.0, capitalizacion_publicada: null, free_float_pct: 54,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${String(BOLSA.volumen_3m.importe_dia_millones).replace('.', ',')} M EUR/día (3 meses, Euronext Lisboa)`, proximos_resultados: '2026-10-26',
  },
  consenso: {
    guidance: 'Guía 2026 revisada el 27-jul-2026: EBITDA RCA de unos 4.000 M (upstream >2.300 M, industrial y midstream >1.100 M, comercial >350 M, renovables unos 80 M), flujo operativo de unos 3.000 M, inversión orgánica de unos 1.000 M y producción de unos 130 kboepd, con Brent de 80 USD de media anual (70 USD en el segundo semestre) y margen de refino de 13 USD/bep (10 USD en el segundo semestre) [A3]. La guía de marzo era >2.600 M con Brent a 60 USD [A9]. No hay plan a medio plazo publicado: la empresa lo aplaza hasta cerrar la operación con Moeve.',
    estimaciones: [
      { periodo: '2026e', ingresos: 27393, ebitda: 4735, ebit: 3941, bpa: 2.30, dpa: 0.68, fuente: 'MarketScreener, 18 analistas [2]' },
      { periodo: '2027e', ingresos: 25023, ebitda: 4176, ebit: 3282, bpa: 2.067, dpa: 0.716, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 22592, ebitda: 3662, ebit: 2781, bpa: 1.789, dpa: 0.749, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 23.83, po_min: 18.40, po_max: 28.00 },
    revisiones: 'El objetivo medio de los analistas ha subido de 20,2 EUR a finales de 2025 (44 % comprar, 43 % mantener, 13 % vender) a 23,83 EUR [A2, 3]. Movimientos recientes: Goldman Sachs subió el objetivo y mantiene Comprar (11-sep), Berenberg mantiene Mantener (21-sep), AlphaValue/Baader bajó a Vender aunque subió el objetivo (19-ago), JB Capital subió a Comprar (8-jul), Morgan Stanley subió a Sobreponderar con objetivo más bajo (3-jul) [3]. El BPA de 2026 del consenso (2,30 EUR) supera en un 70 % el de 2025 (1,51 EUR IFRS; 1,56 EUR RCA), y el de 2028 (1,79 EUR) ya descuenta normalización. Solo hay una fuente gratuita con estimaciones completas; el objetivo de cierre de 2025 sale del informe anual de Galp.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    beta: BOLSA.betas.semanal_5a, volatilidad_pct: BOLSA.bolsa.volatilidad_pct, max_drawdown_pct: BOLSA.bolsa.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción sube un 60 % en 2026 y un 46,7 % en un año con dividendos, frente al 10,8 % y el 15,7 % del Stoxx Europe 600 y el 44,5 % y el 54,2 % del índice europeo de petróleo y gas [1]. El motor es el Brent, que pasó de 61 USD a 106 USD en un año con el ataque de EE. UU. e Israel a Irán a finales de febrero y el cierre de hecho de Ormuz [11, 16]. La beta frente al Stoxx 600 sale negativa en datos mensuales (−0,07) y de 0,40 en semanales: en 2026 la petrolera ha subido cuando caía el mercado, porque el choque petrolero es a la vez su beneficio y el riesgo del resto [1]. La peor jornada del año fue el 9-dic-2025 (−14,7 %), con la permuta de Mopane sin pago en caja [12].',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ['2021', '2022', '2023', '2024', '2025'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2021' })),
    comentario: 'Galp ha cotizado entre 8 y 11 veces el beneficio RCA del año siguiente desde 2021 (8,1x al cierre de 2021, 10,3x en 2022, 10,9x en 2023 y 10,3x en 2024) [1, 13]. Hoy cotiza a unas 10,7 veces nuestro BPA de 2027 y 12,4 veces el de 2028: el mercado paga un múltiplo normal sobre un beneficio que todavía incluye la prima de guerra en 2027. Se excluye 2021 de la comparación con el PER de los últimos doce meses porque el beneficio IFRS fue de 4 M (derivados).',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Integradas europeas con producción y refino que el mercado compara con Galp: TotalEnergies (socio en Namibia), Repsol (competidor peninsular), Eni, OMV y Equinor (más gas y Noruega). Cifras de MarketScreener, mismo proveedor y misma fecha para todas; capitalización = precio del 15-oct × acciones implícitas (beneficio ÷ BPA); dólares a 1,12 USD/EUR. No se incluyen Shell ni BP (sin página de previsiones accesible en el tiempo del análisis) ni Petrobras (empresa estatal con descuento por riesgo político). El BPA del consenso es el ajustado de cada empresa, comparable con el RCA de Galp.',
    empresas,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) informes de Galp (Mozambique y Mopane sin múltiplo publicado); 2) prensa de la permuta con TotalEnergies (sin pago en caja); 3) operaciones del sector en Europa (Repsol upstream, Moeve) sin EV/EBITDA publicado en las fuentes leídas', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) CMVM, no consultada; 2) Stock Analysis no cubre Lisboa; 3) prensa', decision: 'Omitido' },
  ],
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const E = {
  _estado: 'completa',
  sentimiento: null,
  huecos: [
    { seccion: 'sentimiento', campo: 'sección entera', tipo: 'Complemento', intentos: '1) búsqueda de foros portugueses (sin hilos de los últimos tres meses); 2) API de Stocktwits para GLPEF (0 mensajes); 3) RSS de Seeking Alpha GLPEF (solo noticias y un artículo de opinión de marzo de 2026, «Take Profits While You Can»)', decision: 'Omitido' },
  ],
  fuentes: [],
};

guarda('A', A); guarda('B', B); guarda('C', C_); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
for (const e of empresas) console.log(e.nombre, 'cap', e.capitalizacion, 'PER', e.per_ntm, 'EV/EBITDA ntm', e.ev_ebitda_ntm);
