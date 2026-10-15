// Escribe las notas A-E de Vistra (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json), las notas de prensa
// de resultados (8-K 99.1), el 10-K 2025, el 10-Q del 2T26, el proxy de 2026, el 8-K de la junta, los Form 4, bolsa.mjs,
// Yahoo Finance y prensa. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1692819';
const ANIOS = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas, segmentos, vencimientos de deuda, pensiones, empleados)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-27', url: `${E8}/000169281926000006/vistra-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2017-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001692819.json' },
  { id: 3, titulo: 'Vistra Reports Fourth Quarter and Full-Year 2025 Results (8-K, anexo 99.1; conciliaciones del EBITDA ajustado 2023-2025)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000119312526073364/d21122dex991.htm` },
  { id: 4, titulo: 'Vistra Reports Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-07', url: `${E8}/000169281926000017/vistra-20260630xearningsre.htm` },
  { id: 5, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, deuda, Moss Landing)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: `${E8}/000169281926000019/vistra-20260630.htm` },
  { id: 6, titulo: 'Vistra Reports First Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-07', url: `${E8}/000169281926000011/vistra-20260331xearningsre.htm` },
  { id: 7, titulo: 'Vistra Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-06', url: `${E8}/000119312525268033/d33941dex991.htm` },
  { id: 8, titulo: 'Vistra Reports Second Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2025-08-07', url: `${E8}/000119312525174942/d929557dex991.htm` },
  { id: 9, titulo: 'Vistra Reports 2022 Results (8-K, anexo 99.1; conciliaciones 2021-2022)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2023-03-01', url: `${E8}/000119312523055104/d472125dex991.htm` },
  { id: 10, titulo: 'Vistra Reports 2020 Results (8-K, anexo 99.1; conciliaciones 2019-2020)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2021-02-26', url: `${E8}/000119312521058302/d121629dex991.htm` },
  { id: 11, titulo: 'Yahoo Finance: historial de BPA trimestral frente a la estimación (earningsHistory)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/VST/analysis' },
];
// Conciliaciones del EBITDA ajustado consolidado (con Asset Closure) de las notas de prensa [3, 9, 10]:
// intereses (con la valoración de las permutas), amortizaciones con el combustible nuclear, EBITDA ajustado.
const INT = { 2019: 797, 2020: 630, 2021: 384, 2022: 368, 2023: 740, 2024: 900, 2025: 1179 };
const DA = { 2019: 1713, 2020: 1812, 2021: 1831, 2022: 1682, 2023: 1593, 2024: 2230, 2025: 2473 };
const AJ = { 2019: 3325, 2020: 3685, 2021: 1908, 2022: 2994, 2023: 4101, 2024: 5539, 2025: 5838 };
const COMB = { 2023: 7557, 2024: 7285, 2025: 9101 };
const DPA = { 2019: 0.50, 2020: 0.54, 2021: 0.60, 2022: 0.68, 2023: 0.8165, 2024: 0.8775, 2025: 0.9035 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const ebit = c.bai + INT[y];
  const ebitda = ebit + DA[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: COMB[y] ?? null, gastos_generales: c.gastos_generales, ebitda, amortizaciones: DA[y], ebit, resultado_financiero: -INT[y], bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: INT[y], participadas_en_ebitda: null, no_recurrentes_en_ebitda: AJ[y] - ebitda, bpa: c.bpa, dpa: DPA[y], dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const EXIST = { 2025: 1016 };
// 2025: deuda del balance completa (corto 1.800 + financiación de clientes 1.225 + vencimientos 1.201 + largo 15.842); el XBRL dejaba fuera dos partidas [1].
const DEUDA = { 2025: 20068 };
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: EXIST[y] ?? b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: DEUDA[y] ?? b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const ADQ = { 2019: 374, 2024: 3065, 2025: 1900 };
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: ADQ[y] ?? 0, desinversiones: 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: 0, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2019-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las conciliaciones del EBITDA ajustado de las notas de resultados; LTM a junio de 2026 con el 10-Q del 2T26.',
  negocio: {
    segmentos: [
      { nombre: 'Retail (comercialización)', descripcion: 'Venta de electricidad y gas a unos 5 millones de clientes (TXU Energy, Ambit, Energy Harbor, Dynegy…), 2,6 millones en Texas', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 12797, resultado: 1463 }, { periodo: '2025', ingresos: 14340, resultado: 1622 }] },
      { nombre: 'Texas (generación ERCOT)', descripcion: 'Comanche Peak (nuclear, 2,4 GW), ciclos combinados y centrales de carbón y lignito en ERCOT', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 5394, resultado: 2032 }, { periodo: '2025', ingresos: 5353, resultado: 1834 }] },
      { nombre: 'East (generación PJM, NY, NE)', descripcion: 'Nucleares de Energy Harbor (Beaver Valley, Perry, Davis-Besse), gas y carbón en PJM, ISO-NE y NYISO', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 5661, resultado: 2017 }, { periodo: '2025', ingresos: 6174, resultado: 2282 }] },
      { nombre: 'West (CAISO)', descripcion: 'Moss Landing (gas) y baterías en California', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 839, resultado: 225 }, { periodo: '2025', ingresos: 325, resultado: 244 }] },
      { nombre: 'Asset Closure', descripcion: 'Centrales cerradas o en cierre (gastos de desmantelamiento y restauración)', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: 39, resultado: -104 }, { periodo: '2025', ingresos: 74, resultado: -74 }] },
      { nombre: 'Eliminaciones y corporativo', descripcion: 'Ventas internas de la generación a la comercializadora y gastos centrales', tipo_resultado: 'EBITDA', historico: [{ periodo: '2024', ingresos: -7506, resultado: -94 }, { periodo: '2025', ingresos: -8528, resultado: -70 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 100 }],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'EBITDA ajustado de operaciones continuas (M USD)', valor_anterior: '5.643 (2024)', valor_actual: '5.912 (2025)', variacion: '+4,8 %', comentario: 'Supera en ≈112 M el punto medio de la guía original [3]' },
      { kpi: 'Flujo libre ajustado antes de crecimiento (M USD)', valor_anterior: 'n.d.', valor_actual: '3.592 (2025)', variacion: null, comentario: 'Supera en ≈292 M el punto medio de la guía [3]' },
      { kpi: 'EBITDA ajustado 1S (M USD)', valor_anterior: '2.589 (1S25)', valor_actual: '3.261 (1S26)', variacion: '+26,0 %', comentario: 'Precios realizados y de capacidad más altos y las centrales de Lotus [4]' },
      { kpi: 'Cobertura de la producción', valor_anterior: '84 % 2027 y 58 % 2028 (feb-26)', valor_actual: '94 % 2027 y 72 % 2028 (ago-26)', variacion: null, comentario: '≈100 % de 2026 cubierto [3, 4]' },
      { kpi: 'Acciones en circulación (M)', valor_anterior: '≈480 (nov-21)', valor_actual: '≈336 (ago-26)', variacion: '−30 %', comentario: '≈6.500 M USD de recompras desde nov-21 [4]' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 19212, ebitda: 6511, ebit: 3851, beneficio_neto: 2219, bpa: 5.54, dpa: 0.918, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Energy Harbor (nucleares Beaver Valley, Perry y Davis-Besse y comercializadora), consolidada desde el 1-mar-2024: diez meses en la cuenta' },
      { periodo: '2025', descripcion: 'Lotus (2,6 GW de gas), consolidada desde el 22-oct-2025: entra en el balance con solo dos meses en la cuenta' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 6288, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1438, margen_ebitda_pct: 22.9, bpa: null, vs_consenso: null },
      { periodo: '4T24', ingresos: 4037, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1983, margen_ebitda_pct: 49.1, bpa: null, vs_consenso: null },
      { periodo: '1T25', ingresos: 3933, crecimiento_pct: 28.8, crecimiento_organico_pct: null, ebitda: 1240, margen_ebitda_pct: 31.5, bpa: null, vs_consenso: null },
      { periodo: '2T25', ingresos: 4250, crecimiento_pct: 10.5, crecimiento_organico_pct: null, ebitda: 1349, margen_ebitda_pct: 31.7, bpa: null, vs_consenso: null },
      { periodo: '3T25', ingresos: 4971, crecimiento_pct: -20.9, crecimiento_organico_pct: null, ebitda: 1581, margen_ebitda_pct: 31.8, bpa: 1.75, vs_consenso: 'Inferior' },
      { periodo: '4T25', ingresos: 4584, crecimiento_pct: 13.6, crecimiento_organico_pct: null, ebitda: 1742, margen_ebitda_pct: 38.0, bpa: 0.54, vs_consenso: 'Inferior' },
      { periodo: '1T26', ingresos: 5640, crecimiento_pct: 43.4, crecimiento_organico_pct: null, ebitda: 1494, margen_ebitda_pct: 26.5, bpa: 2.87, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 4017, crecimiento_pct: -5.5, crecimiento_organico_pct: null, ebitda: 1767, margen_ebitda_pct: 44.0, bpa: 0.76, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 1201 }, { anio: '2027', importe: 3435 }, { anio: '2028', importe: 786 }, { anio: '2029', importe: 2362 }, { anio: '2030', importe: 2853 }, { anio: '2031+', importe: 6559 }],
    liquidez: 'Caja 435 M + 4.408 M disponibles en la línea de crédito corporativa + 1.452 M en la línea ligada a materias primas = ≈6.295 M a 30-jun-2026 [4]',
    rating: 'Grado de inversión en la deuda garantizada de Vistra Operations (S&P y Fitch BBB−, Moody\'s Baa3, según la propia empresa)',
    coste_deuda_pct: 6.1,
    vida_media_anios: null,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Deloitte & Touche LLP', anios_auditor: 24, opinion: 'Favorable', confianza: 'Alta' },
  _ltm_nota: 'LTM jun-26 = 2025 + 1S26 − 1S25. Ingresos 17.738 + 9.657 − 8.183 = 19.212. EBITDA ajustado consolidado = 5.838 + 3.219 − 2.548 = 6.509 (≈6.511 con redondeos de las conciliaciones). Beneficio atribuido 944 + 1.334 − 59 = 2.219.',
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'Crecimiento interanual y BPA de 3T24-2T25', tipo: 'Complemento', intentos: '1) notas de resultados de 2025 (solo dan el trimestre comparable, no el de 2023); 2) XBRL trimestral de la SEC (no descargado por tiempo); 3) Yahoo (solo 4 trimestres de BPA)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: mercados (ERCOT, PJM, ISO-NE, NYISO, MISO, CAISO), flota de ≈44.000 MW, competencia', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-27', url: `${E8}/000169281926000006/vistra-20251231.htm` },
  { id: 2, titulo: 'Electric Power Annual, tabla 2.3: ingresos por venta de electricidad al cliente final, 2014-2024', editor: 'U.S. Energy Information Administration', tipo: 'Sectorial', fecha: '2025-10', url: 'https://www.eia.gov/electricity/annual/html/epa_02_03.html' },
  { id: 3, titulo: 'Electric Power Annual, tabla 2.2: ventas de electricidad al cliente final (MWh), 2014-2024', editor: 'U.S. Energy Information Administration', tipo: 'Sectorial', fecha: '2025-10', url: 'https://www.eia.gov/electricity/annual/html/epa_02_02.html' },
  { id: 4, titulo: 'Vistra Adds to its Industry-Leading Generation Portfolio with Acquisition of Cogentrix (8-K, anexo 99.1)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-05', url: `${E8}/000119312526002589/d62722dex991.htm` },
  { id: 5, titulo: '8-K: contratos de 20 años con Meta por 2.609 MW nucleares en PJM', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-09', url: `${E8}/000119312526008508/d20785d8k.htm` },
  { id: 6, titulo: '8-K: resultado de la subasta de capacidad de PJM 2028/2029 (10.924 MW a 325 USD/MW-día)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-14', url: `${E8}/000114036126028454/ef20077988_8k.htm` },
  { id: 7, titulo: 'Vistra to acquire 2.6-GW gas fleet for $1.9B', editor: 'POWER Magazine', tipo: 'Prensa', fecha: '2025-05-15', url: 'https://www.powermag.com/vistra-to-acquire-2-6-gw-gas-fleet-for-1-9b-citing-surging-u-s-power-demand' },
  { id: 8, titulo: 'NRG Energy to acquire premier power portfolio from LS Power (12.000 M USD, 7,5x EBITDA 2026)', editor: 'Inspectioneering', tipo: 'Prensa', fecha: '2025-05-13', url: 'https://inspectioneering.com/news/2025-05-13/11571/nrg-energy-to-acquire-premier-power-portfolio-from-ls-power-transforming-genera' },
  { id: 9, titulo: 'Energy Department announces $4.2 billion investment to boost nuclear power', editor: 'U.S. Department of Energy', tipo: 'Primaria', fecha: '2026-10-05', url: 'https://www.energy.gov/articles/energy-department-announces-42-billion-investment-boost-nuclear-power-and-help-lower' },
  { id: 10, titulo: 'Yahoo Finance: datos de mercado y consenso de comparables (quoteSummary, 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 11, titulo: 'Vistra Reports Fourth Quarter and Full-Year 2025 Results (AWS en Comanche Peak, Lotus, Cogentrix)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000119312526073364/d21122dex991.htm` },
  { id: 12, titulo: 'Time to buy the dip on Vistra stock? (plan de la Casa Blanca y los gobernadores para PJM, 16-ene-2026)', editor: 'Nasdaq / The Motley Fool', tipo: 'Prensa', fecha: '2026-01-17', url: 'https://www.nasdaq.com/articles/time-buy-dip-vistra-stock' },
];
const B = {
  _estado: 'Completo con las fuentes citadas; cuotas por mercado mayorista no publicadas (hueco).',
  sector: {
    definicion: 'El mercado relevante es la electricidad vendida al cliente final en Estados Unidos [2], porque Vistra integra generación mayorista en los mercados liberalizados (ERCOT, PJM, ISO-NE, NYISO, MISO, CAISO) con una comercializadora que vende al hogar y a la empresa [1]. Se usa el ingreso total de la EIA (514.396 M USD en 2024) como techo del perímetro; el mercado liberalizado donde compite de verdad es una parte (Texas y el noreste), sin estadística oficial única. Segunda fuente: el volumen vendido de la EIA (3.975 TWh en 2024, +4,3 % desde 2019) [3].',
    tamano: '≈ 514.400 M USD de ventas de electricidad al cliente final en 2024 [2]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2019', tamano: 401738 }, { anio: '2020', tamano: 393639 }, { anio: '2021', tamano: 422323 }, { anio: '2022', tamano: 485249 }, { anio: '2023', tamano: 491370 }, { anio: '2024', tamano: 514396 }],
    tcac_historico_pct: 5.1,
    tcac_previsto_pct: 5.0,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Demanda de centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Contratos de 20 años con AWS (1.200 MW en Comanche Peak) y Meta (2.609 MW en PJM) [5, 11]' },
      { driver: 'Precio de la capacidad en PJM', efecto: '+', horizonte: 'Cíclico', evidencia: 'Subasta 2028/29 al techo de 325 USD/MW-día para 10.924 MW de Vistra [6]' },
      { driver: 'Intervención política en precios (topes en PJM, ERCOT)', efecto: '−', horizonte: 'Estructural', evidencia: 'Plan de la Casa Blanca y 13 gobernadores de ene-26: topes en las subastas y subasta especial para centros de datos [12]' },
      { driver: 'Baterías y solar en ERCOT', efecto: '−', horizonte: 'Estructural', evidencia: 'Precios a plazo de ERCOT más bajos desde oct-25; la dirección admite un 2026 «blando» en Texas [1]' },
      { driver: 'Precio del gas natural', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'El gas marca el precio marginal: sube el margen de la nuclear y encarece el combustible de los ciclos [1]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocas grandes independientes (Constellation, Vistra, NRG, Talen) y muchas centrales de fondos; la electricidad es un producto homogéneo [1]' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Los hiperescaladores pagan prima por energía firme y sin carbono a 20 años [5, 11]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Turbinas de gas con listas de espera de varios años; combustible nuclear con pocos proveedores [1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Una central nueva de gas cuesta bastante más que los ≈730-743 USD/kW pagados por Cogentrix y Lotus [4, 7]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Solar más baterías y autoconsumo en los centros de datos; nuclear modular a más de 5 años [1]' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de electricidad de EE. UU. vuelve a crecer tras quince años plana (3.975 TWh en 2024 frente a 3.811 en 2019) [3] y los precios de capacidad de PJM están en el techo de la banda [6]. El sector independiente sufrió en 2021 (tormenta Uri: pérdidas de unos 2.000 M en Vistra) y en 2022 por las coberturas [1]; en 2020 la demanda cayó un 2,5 % [3].' },
    regulacion: 'ERCOT es un mercado solo de energía, con precios de escasez; PJM paga capacidad con subastas anuales, ahora con banda de precios (techo de ≈325-329 USD/MW-día) que los gobernadores quieren alargar a 2028/29 y 2029/30 [6, 12]. La FERC rechazó en noviembre de 2024 ampliar la conexión directa de Talen con Amazon y en octubre de 2026 la mayor parte del plan de PJM para recortar a los centros de datos [12]. El crédito fiscal a la producción nuclear (45U, hasta 2032) pone un suelo a los ingresos de las nucleares [1].',
    tendencias: 'La tendencia que mueve el sector es la demanda de los centros de datos, que firman contratos de 20 años de energía nuclear y de gas con prima. Vistra gana con ella (AWS, Meta, Helix con NVIDIA y KKR) [4, 5, 11]. En contra, las baterías aplanan los picos de precio en ERCOT, y la presión política para que los centros de datos paguen la red y no suban la factura del hogar limita los precios de capacidad [12].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.4,
    posicion: '2.ª independiente de EE. UU. por capacidad (≈44 GW, ≈50 GW con Cogentrix) tras Constellation; mayor comercializadora de Texas (≈2,6 M de clientes)',
    competidores: [
      { nombre: 'Constellation Energy', pais: 'EE. UU.', ticker: 'CEG', ingresos: 25533, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor flota nuclear (≈22 GW) más Calpine desde ene-26; contrato con Microsoft (Crane) y Meta [10]' },
      { nombre: 'NRG Energy', pais: 'EE. UU.', ticker: 'NRG', ingresos: 30713, cuota_pct: null, margen_ebit_pct: null, comentario: 'Comercializadora dominante (Reliant) más 13 GW de LS Power: modelo integrado como Vistra, sin nuclear [8, 10]' },
      { nombre: 'Talen Energy', pais: 'EE. UU.', ticker: 'TLN', ingresos: 2581, cuota_pct: null, margen_ebit_pct: null, comentario: 'Susquehanna (nuclear) con contrato con Amazon; compró 2,9 GW de gas en 2025 [10]' },
      { nombre: 'NextEra Energy', pais: 'EE. UU.', ticker: 'NEE', ingresos: 28700, cuota_pct: null, margen_ebit_pct: null, comentario: 'Regulada (FPL) más el mayor promotor renovable; compite por los contratos con centros de datos [10]' },
      { nombre: 'Calpine (en Constellation)', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor flota de gas independiente; comprada por Constellation (cierre ene-26) [10]' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se amplía',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: la electricidad es un producto homogéneo.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Contratos de 20 años con AWS y Meta; en la comercializadora el cliente cambia con facilidad [5, 11]' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias nucleares (cuatro plantas, renovación a 20 años más) y emplazamientos con conexión a la red: no se replican [5, 9]' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Nuclear con coste marginal bajo y crédito 45U; compra de gas existente a ≈730-743 USD/kW frente a centrales nuevas [4, 7]' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Integración generación-comercialización: la comercializadora cubre de forma natural la producción en Texas [1]' },
      ],
    },
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-01', objetivo: 'Cogentrix Energy (5,5 GW de gas en PJM, ISO-NE y ERCOT)', comprador: 'Vistra', ev: 4000, ev_ventas: null, ev_ebitda: 7.25, prima_pct: null, excluir: false, comentario: 'Precio neto de beneficios fiscales; 7,25x el EBITDA ajustado esperado de 2027; ≈730 USD/kW [4]' },
      { fecha: '2025-05', objetivo: 'Lotus Infrastructure (2,6 GW de gas)', comprador: 'Vistra', ev: 1900, ev_ventas: null, ev_ebitda: 7.0, prima_pct: null, excluir: false, comentario: '≈743 USD/kW; ≈7x el EBITDA ajustado de 2026 sin sinergias [7]' },
      { fecha: '2025-05', objetivo: 'Cartera de LS Power (13 GW de gas) y CPower', comprador: 'NRG Energy', ev: 12000, ev_ventas: null, ev_ebitda: 7.5, prima_pct: null, excluir: false, comentario: '7,5x el EBITDA de 2026; incluye la plataforma de demanda gestionable CPower [8]' },
      { fecha: '2023-03', objetivo: 'Energy Harbor (4 GW nucleares y comercializadora)', comprador: 'Vistra', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '3.000 M en caja más el 15 % de Vistra Vision; múltiplo no publicado [1]' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'Concentración CR5 de la generación independiente', tipo: 'Complemento', intentos: '1) 10-K 2025 de Vistra (no da cuotas); 2) EIA (capacidad por propietario no publicada en tabla resumen); 3) informes de mercado de pago', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'Margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) Yahoo (EBITDA GAAP con coberturas: no comparable); 2) 10-K de CEG y NRG (no leídos por tiempo); 3) EBITDA ajustado de prensa (otra base)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración 2025, accionistas', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-18', url: 'https://www.sec.gov/Archives/edgar/data/1692819/000162828026019029/vistra-20260318.htm' },
  { id: 2, titulo: '8-K del 4-may-2026: resultados de la junta de 29-abr-2026', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000114036126018872/ef20072328_8k.htm` },
  { id: 3, titulo: 'Form 4 de Vistra presentados entre 15-oct-2025 y 15-oct-2026 (52 presentaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001692819&type=4' },
  { id: 4, titulo: 'Vistra Reports Fourth Quarter and Full-Year 2025 Results (guía 2025 superada)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-26', url: `${E8}/000119312526073364/d21122dex991.htm` },
  { id: 5, titulo: 'Vistra Reports 2022 Results (guía 2022 superada; guía 2023 de 3.700 M)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2023-03-01', url: `${E8}/000119312523055104/d472125dex991.htm` },
  { id: 6, titulo: 'Vistra Reports Second Quarter 2026 Results (guía 2026 reafirmada)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-07', url: `${E8}/000169281926000017/vistra-20260630xearningsre.htm` },
  { id: 7, titulo: 'Vistra stock fell 6% in three months; its CEO just bought the dip', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09-04', url: 'https://www.tikr.com/blog/vistra-stock-fell-6-in-three-months-its-ceo-just-bought-the-dip-heres-what-hes-betting-on' },
];
const consejo = [
  ['Scott B. Helm', 'Presidente no ejecutivo', 'Independiente', '2017', '—'],
  ['James A. Burke', 'Consejero delegado', 'Ejecutivo', '2022', '—'],
  ['Hilary E. Ackermann', 'Consejera', 'Independiente', '2018', 'Sostenibilidad y Riesgos (presidenta)'],
  ['Arcilia C. Acosta', 'Consejera', 'Independiente', '2020', 'Dos comisiones'],
  ['Gavin R. Baiera', 'Consejero', 'Independiente', '2016', 'Responsabilidad Social y Retribuciones; otra'],
  ['Paul M. Barbas', 'Consejero', 'Independiente', '2018', 'Tres comisiones'],
  ['Lisa Crutchfield', 'Consejera', 'Independiente', '2020', 'Responsabilidad Social y Retribuciones (presidenta)'],
  ['Julie A. Lagacy', 'Consejera', 'Independiente', '2023', 'Nombramientos y Gobierno (presidenta)'],
  ['John W. (Bill) Pitesa', 'Consejero', 'Independiente', '2024', 'Generación y Seguridad (presidente); Retribuciones'],
  ['John R. (J. R.) Sult', 'Consejero', 'Independiente', '2018', 'Auditoría (presidente)'],
  ['Robert C. Walters', 'Consejero', 'Independiente', '2024', 'Dos comisiones'],
].map(([nombre, cargo, tipo, desde, comisiones]) => ({ nombre, cargo, tipo, desde, comisiones }));
const C = {
  _estado: 'Completo con proxy 2026, 8-K de la junta y Form 4.',
  directivos: {
    equipo: [
      { nombre: 'James A. (Jim) Burke', cargo: 'Presidente ejecutivo de operaciones y consejero delegado', desde: '2022', participacion_pct: null, trayectoria: 'En Vistra y su antecesora TXU desde 2004; director de operaciones y financiero antes de ser consejero delegado en 2022. Con él: compra de Energy Harbor, Lotus y Cogentrix y contratos con AWS y Meta; EBITDA ajustado de 3.115 M (2022) a 5.912 M (2025) [1, 4, 5].' },
      { nombre: 'Kristopher E. Moldovan', cargo: 'Director financiero', desde: '2022', participacion_pct: null, trayectoria: 'Tesorero y después director financiero; lleva el plan de recompras (≈6.500 M desde nov-21) y el grado de inversión [1, 6].' },
      { nombre: 'Scott A. Hudson', cargo: 'Presidente de Vistra Retail', desde: '2019', participacion_pct: null, trayectoria: 'Dirige TXU Energy y las demás comercializadoras; EBITDA de la comercialización de 1.463 M (2024) a 1.622 M (2025) [1, 4].' },
      { nombre: 'Stacey Doré', cargo: 'Directora de estrategia y sostenibilidad', desde: '2021', participacion_pct: null, trayectoria: 'Lleva la relación con reguladores y gobiernos, clave en PJM y ERCOT [1].' },
      { nombre: 'Scott B. Helm', cargo: 'Presidente del consejo', desde: '2017', participacion_pct: null, trayectoria: 'Consejero independiente desde la salida de la quiebra de Energy Future Holdings; presidente no ejecutivo [1].' },
    ],
    historial_guidance: [
      { anio: '2022', guia: 'EBITDA ajustado de operaciones continuas, punto medio ≈3.060 M', real: '3.115 M (+55 M sobre el punto medio)', cumplida: 'Sí' },
      { anio: '2023', guia: 'EBITDA ajustado, punto medio 3.700 M', real: '4.093 M de operaciones continuas', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBITDA ajustado, punto medio ≈5.800 M', real: '5.912 M (+112 M)', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA ajustado 6.800-7.600 M, reafirmada en agosto', real: '3.261 M en el 1S (+26 %)', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo,
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.8, voto_remuneracion_contra_pct: 3.1, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 15.99, fijo: 1.39, variable_corto: 2.97, variable_largo: 11.43, ratio_salario_medio: 117 },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.6, tipo: 'Institucional', variacion: '13G/A con datos de dic-23' },
      { nombre: 'BlackRock', pct: 8.4, tipo: 'Institucional', variacion: '13G/A con datos de sep-24' },
      { nombre: 'Qatar Investment Authority (Seismic Holding)', pct: 5.5, tipo: 'Fondo soberano', variacion: 'Sin cambios declarados' },
      { nombre: 'FMR (Fidelity)', pct: 5.1, tipo: 'Institucional', variacion: 'n.d.' },
      { nombre: 'Quantum Capital Group (por Cogentrix)', pct: 1.5, tipo: 'Capital privado', variacion: 'Recibirá 5 M de acciones al cierre de Cogentrix' },
    ],
    insiders: [
      { fecha: '2025-10-15', persona: 'James A. Burke (consejero delegado), plan 10b5-1', operacion: 'Venta', acciones: null, importe: 64.02 },
      { fecha: '2026-08-15', persona: 'James A. Burke (consejero delegado), compra a ≈135 USD', operacion: 'Compra', acciones: null, importe: 1.17 },
      { fecha: '2025-10-15', persona: 'Scott A. Hudson (Vistra Retail)', operacion: 'Venta', acciones: null, importe: 19.76 },
      { fecha: '2025-10-15', persona: 'Carrie Lee Kirby (directora de administración)', operacion: 'Venta', acciones: null, importe: 10.18 },
      { fecha: '2025-10-15', persona: 'Kristopher E. Moldovan (director financiero)', operacion: 'Venta', acciones: null, importe: 6.32 },
      { fecha: '2025-10-15', persona: 'Scott B. Helm (presidente), plan 10b5-1', operacion: 'Venta', acciones: null, importe: 4.0 },
    ],
    alertas: [
      'Ventas de directivos y consejeros por 112,6 M USD en 12 meses (73,3 M con planes 10b5-1), frente a compras de 1,2 M del consejero delegado en agosto de 2026 [3, 7].',
      'Incidente de Moss Landing (incendio de baterías, ene-25): acuerdo con la EPA y coste estimado de remediación de 175 M, 65 M más en el 2T26 [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'directivos', campo: 'Participación de cada directivo en el capital', tipo: 'Complemento', intentos: '1) proxy 2026, tabla de propiedad (cifras por persona sin porcentaje relevante: < 1 %); 2) Form 4 (saldo tras la operación, no leído uno a uno); 3) Yahoo (solo el agregado: 0,77 % en manos de directivos)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance: históricos diarios de VST, SPY y XLU hasta el 14-oct-2026 (precio, rentabilidades, betas, volatilidad, cierres de cada ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/VST/history' },
  { id: 2, titulo: 'Yahoo Finance: consenso de VST (earningsTrend, recomendaciones, precio objetivo, cambios de recomendación)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/VST/analysis' },
  { id: 3, titulo: 'FRED DGS10: bono del Tesoro a 10 años (5,21 % el 13-oct-2026)', editor: 'Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Yahoo Finance: datos de mercado y consenso de los comparables (quoteSummary, 14-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 6, titulo: 'Vistra stock fell 6% in a day after a 20% run. Here’s what its November 6 report needs to show', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-10-09', url: 'https://www.tikr.com/blog/vistra-stock-fell-6-in-a-day-after-a-20-run-heres-what-its-november-6-report-needs-to-show' },
  { id: 7, titulo: 'Vistra stock is down 27% this year but analysts haven’t budged their targets', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-08-17', url: 'https://www.tikr.com/blog/vistra-stock-is-down-27-this-year-but-analysts-havent-budged-their-targets' },
  { id: 8, titulo: 'Vistra (NYSE:VST) shares down 12.6% — what’s next', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-03-20', url: 'https://www.marketbeat.com/instant-alerts/vistra-nysevst-shares-down-126-whats-next-2026-03-20/' },
  { id: 9, titulo: 'Time to buy the dip on Vistra stock? (plan de la Casa Blanca para PJM, 16-ene-2026)', editor: 'Nasdaq / The Motley Fool', tipo: 'Prensa', fecha: '2026-01-17', url: 'https://www.nasdaq.com/articles/time-buy-dip-vistra-stock' },
  { id: 10, titulo: 'Vistra stock is down 31% over the last year. Is it time to buy the dip? (ERCOT, Batch Zero)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-09-26', url: 'https://www.tikr.com/blog/vistra-stock-is-down-31-over-the-last-year-is-it-time-to-buy-the-dip' },
  { id: 11, titulo: 'DOE intends to loan Vistra $4.2B for nuclear fleet improvements', editor: 'Utility Dive', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.utilitydive.com/news/doe-intends-to-loan-vistra-42b-for-nuclear-fleet-improvements/832236/' },
  { id: 12, titulo: 'Seeking Alpha: titulares de VST (FERC rechaza el plan de recortes de PJM, 12-oct-2026; bonos subordinados de 1.500 M)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/VST/news' },
  { id: 13, titulo: '8-K del 24-sep-2026: emisión de 1.500 M USD en bonos subordinados al 7,0 % y 7,25 % con vencimiento 2057', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-24', url: `${E8}/000114036126037577/ef20082680_8k.htm` },
  { id: 14, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026: deuda, acciones preferentes, obligación de recompra a Nuveen)', editor: 'Vistra Corp. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-10', url: `${E8}/000169281926000019/vistra-20260630.htm` },
];
const r = BOLSA.bolsa;
const D = {
  _estado: 'Completo. Precio del cierre del 14-oct-2026 (la sesión del 15-oct no había cerrado al hacer el análisis).',
  identificacion: {
    nombre: 'Vistra Corp.', nombre_corto: 'Vistra', ticker: 'VST', isin: 'US92840M1027', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Utilities', industria: 'Independent Power and Renewable Electricity Producers', sede: 'Irving (Texas)', fundacion: '2016', empleados: 6390, web: 'https://www.vistracorp.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 341.0, capitalizacion_publicada: 50919, free_float_pct: 99.2,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 790 M USD/día (3 meses)', proximos_resultados: '2026-11-06',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 22485, ebitda: null, ebit: null, bpa: 9.58, dpa: 0.92, fuente: 'Yahoo Finance, 9 analistas de BPA [2]' },
      { periodo: '2027e', ingresos: 24137, ebitda: null, ebit: null, bpa: 10.36, dpa: null, fuente: 'Yahoo Finance, 10 analistas de BPA [2]' },
    ],
    recomendaciones: { n_analistas: 21, comprar: 20, mantener: 0, vender: 1, po_medio: 210.25, po_min: 106, po_max: 305 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: r.tipo_rentabilidad, rentabilidades: r.rentabilidades, anual: r.anual,
    beta: BOLSA.betas.mensual_5a, volatilidad_pct: r.volatilidad_pct, max_drawdown_pct: r.max_drawdown_pct, posicion_corta_pct: 3.6,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: c.anio === '2021' || c.anio === '2022' })),
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      { nombre: 'Constellation Energy', ticker: 'CEG', pais: 'US', capitalizacion: 97279, ev_ventas: 3.95, ev_ebitda_ltm: 15.5, ev_ebitda_ntm: null, per_ntm: 21.4, crecimiento_pct: 18.4, margen_ebitda_pct: 25.4, roic_pct: null, dn_ebitda: 3.0, fcf_yield_pct: -6.8 },
      { nombre: 'NRG Energy', ticker: 'NRG', pais: 'US', capitalizacion: 21288, ev_ventas: 1.36, ev_ebitda_ltm: 13.9, ev_ebitda_ntm: null, per_ntm: 9.4, crecimiento_pct: 10.5, margen_ebitda_pct: 9.8, roic_pct: null, dn_ebitda: 7.2, fcf_yield_pct: 3.6 },
      { nombre: 'Talen Energy', ticker: 'TLN', pais: 'US', capitalizacion: 16254, ev_ventas: 7.09, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 12.3, crecimiento_pct: 36.0, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: 7.8 },
      { nombre: 'NextEra Energy', ticker: 'NEE', pais: 'US', capitalizacion: 164876, ev_ventas: 9.82, ev_ebitda_ltm: 19.3, ev_ebitda_ntm: null, per_ntm: 18.2, crecimiento_pct: 17.9, margen_ebitda_pct: 50.8, roic_pct: null, dn_ebitda: 7.4, fcf_yield_pct: -10.8 },
      { nombre: 'PSEG', ticker: 'PEG', pais: 'US', capitalizacion: 35104, ev_ventas: 4.76, ev_ebitda_ltm: 13.4, ev_ebitda_ntm: null, per_ntm: 15.3, crecimiento_pct: 4.4, margen_ebitda_pct: 35.6, roic_pct: null, dn_ebitda: 5.5, fcf_yield_pct: 0.3 },
      { nombre: 'Dominion Energy', ticker: 'D', pais: 'US', capitalizacion: 55322, ev_ventas: 6.32, ev_ebitda_ltm: 13.7, ev_ebitda_ntm: null, per_ntm: 16.7, crecimiento_pct: 5.7, margen_ebitda_pct: 46.0, roic_pct: null, dn_ebitda: 6.4, fcf_yield_pct: -16.6 },
      { nombre: 'Southern Company', ticker: 'SO', pais: 'US', capitalizacion: 102969, ev_ventas: 5.95, ev_ebitda_ltm: 12.6, ev_ebitda_ntm: null, per_ntm: 18.4, crecimiento_pct: 7.3, margen_ebitda_pct: 47.2, roic_pct: null, dn_ebitda: 5.2, fcf_yield_pct: -3.8 },
      { nombre: 'American Electric Power', ticker: 'AEP', pais: 'US', capitalizacion: 67897, ev_ventas: 5.39, ev_ebitda_ltm: 13.6, ev_ebitda_ntm: null, per_ntm: 18.6, crecimiento_pct: 9.1, margen_ebitda_pct: 39.6, roic_pct: null, dn_ebitda: 5.9, fcf_yield_pct: -8.8 },
      { nombre: 'Duke Energy', ticker: 'DUK', pais: 'US', capitalizacion: 93365, ev_ventas: 5.73, ev_ebitda_ltm: 11.3, ev_ebitda_ntm: null, per_ntm: 16.9, crecimiento_pct: 6.6, margen_ebitda_pct: 50.7, roic_pct: null, dn_ebitda: 5.5, fcf_yield_pct: -4.8 },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA ajustado del consenso 2026-2027', tipo: 'Complemento', intentos: '1) Yahoo (no da EBITDA estimado); 2) MarketScreener (no consultado por tiempo); 3) guía de la empresa (6.800-7.600 M en 2026; 7.400-7.800 M de «oportunidad» en 2027), usada en su lugar', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA de los próximos 12 meses y ROIC de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (sin EBITDA estimado); 2) Stock Analysis (bloquea desde la nube); 3) cuentas de cada comparable (EBITDA GAAP con coberturas, no comparable)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $VST (30 últimos, 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/VST' },
  { id: 2, titulo: 'Seeking Alpha: artículos de análisis de VST de jun-oct 2026 (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/VST/analysis' },
  { id: 3, titulo: 'The crowd is dumping Vistra; why I would buy the stock while it is down', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-04-18', url: 'https://www.fool.com/investing/2026/04/18/crowd-dumping-vistra-why-buy-stock-down/' },
  { id: 4, titulo: 'TIKR: Vistra stock is down 31% over the last year. Is it time to buy the dip?', editor: 'TIKR', tipo: 'Foros y redes', fecha: '2026-09-26', url: 'https://www.tikr.com/blog/vistra-stock-is-down-31-over-the-last-year-is-it-time-to-buy-the-dip' },
];
const E = {
  _estado: 'Completo (sentimiento leído el 15-oct-2026).',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($VST)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Casi todo alcista y de corto plazo: «demasiado barata», «comprar la caída», objetivos de 160-165 USD; algún mensaje nota que el hueco se cerró sin reacción [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Mayoría de compra (Cogentrix y Meta compensan un ERCOT más flojo, subida de guía esperada) frente a «Hold» por el 2T mixto y un artículo que prefiere a Constellation a corto plazo [2].' },
      { plataforma: 'The Motley Fool', fecha: '2026-04', n_comentarios: 1, tono: 'Positivo', resumen: 'La caída por la intervención en PJM sería una oportunidad porque los contratos con centros de datos siguen llegando [3].' },
      { plataforma: 'TIKR (blog)', fecha: '2026-09', n_comentarios: 1, tono: 'Neutro', resumen: 'Pide prudencia por los precios de ERCOT y la pausa del Batch Zero; recuerda la compra del consejero delegado a ≈135 USD [4].' },
    ],
    temas: [
      { tema: 'Valoración barata (PER adelantado ≈14-15x)', postura: 'Alcista', peso: 'Alto', contraste: 'El PER de 14,6x usa el BPA ajustado del consenso; con nuestro BPA (sin coberturas no realizadas y con las amortizaciones del combustible nuclear) el PER de 2027e es más alto.' },
      { tema: 'Intervención política en PJM y ERCOT', postura: 'Bajista', peso: 'Alto', contraste: 'Riesgo real: los topes en PJM y la pausa de ERCOT ya movieron el precio un 7-13 % en un día; el informe lo recoge como riesgo principal.' },
      { tema: 'Contratos con hiperescaladores (AWS, Meta, Helix)', postura: 'Alcista', peso: 'Medio', contraste: 'Los contratos son reales (8-K) y dan ingresos fijos a 20 años, pero las subidas de potencia nuclear llegan en 2031-2034.' },
      { tema: 'Ventas de directivos', postura: 'Dividida', peso: 'Bajo', contraste: 'Ventas de 112,6 M en 12 meses frente a una compra de 1,2 M del consejero delegado; casi dos tercios con planes 10b5-1.' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('A-E escritas');
