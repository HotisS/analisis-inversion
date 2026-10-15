// Escribe las notas A-E de FactSet (corte 2026-10-15) con los documentos de notas/docs (EDGAR), el XBRL de la SEC
// (cuentas-xbrl.json), bolsa.json (Yahoo), form4.json, la ficha sectorial del 14-oct y búsquedas web del 15-oct.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const raiz = path.resolve(dir, '..', '..', '..');
const lee = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee(path.join(dir, 'cuentas-xbrl.json'));
const B = lee(path.join(dir, 'bolsa.json'));
const SEC = (acc, doc) => `https://www.sec.gov/Archives/edgar/data/1013237/${acc}/${doc}`;

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'FactSet Reports Results for Fourth Quarter and Fiscal 2026 (8-K, ex. 99.1): cuenta, balance, flujos, conciliación ajustada, ASV y guía FY2027', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-09-30', url: SEC('000162828026063888', 'fdsq42026earningsrelease.htm') },
  { id: 2, titulo: 'Annual Report on Form 10-K, fiscal 2025 (segmentos, deuda, adquisiciones, control interno, clientes)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-10-30', url: SEC('000162828025045769', 'fds-20250831.htm') },
  { id: 3, titulo: 'Annual Report on Form 10-K, fiscal 2023 (segmentos 2021-2023, compra de CUSIP Global Services)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2023-10-27', url: SEC('000101323723000128', 'fds-20230831.htm') },
  { id: 4, titulo: 'XBRL de los 10-K (companyfacts, CIK 1013237): cuenta, balance y flujos FY2018-FY2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001013237.json' },
  { id: 5, titulo: 'Resultados del 3T FY2026 (8-K, ex. 99.1)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-07-01', url: SEC('000162828026046338', 'fdsq32026earningsrelease.htm') },
  { id: 6, titulo: 'Resultados del 2T FY2026 (8-K, ex. 99.1)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-03-26', url: SEC('000162828026022203', 'fdsq22026earningsrelease.htm') },
  { id: 7, titulo: 'Resultados del 1T FY2026 (8-K, ex. 99.1)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-12-18', url: SEC('000162828025057794', 'fdsq12026earningsrelease.htm') },
  { id: 8, titulo: 'Resultados del 4T y FY2025 (8-K, ex. 99.1)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-09-18', url: SEC('000101323725000084', 'fdsq42025earningsrelease.htm') },
  { id: 9, titulo: 'Resultados del 1T, 2T y 3T FY2025 (8-K, ex. 99.1)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-06-23', url: SEC('000101323725000064', 'fdsq32025earningsrelease.htm') },
  { id: 10, titulo: 'Resultados anuales FY2017-FY2024 (8-K, conciliaciones del BPA ajustado y amortización de intangibles por acción)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2024-09-19', url: SEC('000101323724000119', 'fdsq42024earningsrelease.htm') },
  { id: 11, titulo: 'FactSet (FDS) Q4 2026 Earnings Call Transcript', editor: 'The Motley Fool vía Mitrade', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.mitrade.com/insights/news/live-news/article-8-2131351-20261001' },
  { id: 12, titulo: '8-K: enmienda del crédito sindicado (préstamo de 375 M a 2029, revolving de 1.500 M a 2031)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-08-28', url: SEC('000095015726000966', 'form8-k.htm') },
];
const fy = (p) => `FY${p}`;
const reales = (lista) => lista.filter((r) => r.fin && r.fin.endsWith('-31') && r.ingresos !== null || (r.fin && r.fin.endsWith('-31') && r.activo_total !== undefined && r.activo_total !== null) || (r.fin && r.fin.endsWith('-31') && r.flujo_operativo !== undefined && r.flujo_operativo !== null));
const DPA = { 2018: 2.32, 2019: 2.64, 2020: 2.93, 2021: 3.13, 2022: 3.35, 2023: 3.65, 2024: 3.98, 2025: 4.22, 2026: 4.46 };
const NR = { 2025: 22.1, 2026: 79.2 };
const cuenta = reales(X.financieros.cuenta).map((r) => {
  const { fin, ...resto } = r;
  return { ...resto, periodo: fy(r.periodo), dpa: DPA[r.periodo] ?? null, dpa_extraordinario: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[r.periodo] ?? null };
});
cuenta.push({ periodo: 'FY2026', ingresos: 2476.3, coste_ventas: 1223.1, gastos_generales: 553.2, ebitda: 880.8, amortizaciones: 180.8, ebit: 700.0, resultado_financiero: -50.2, bai: 649.7, impuestos: 116.2, minoritarios: 0, beneficio_neto: 533.5, gastos_financieros: 54.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 79.2, bpa: 14.57, dpa: 4.46, dpa_extraordinario: 0, acciones_diluidas: 36.6 });
const balance = reales(X.balance.historico).map((r) => { const { fin, ...resto } = r; return { ...resto, periodo: fy(r.periodo), arrendamientos: 0, existencias: 0, activos_contrato: null, minoritarios: 0 }; });
balance.push({ periodo: 'FY2026', activo_total: 4142.8, activo_corriente: 654.7, pasivo_corriente: 1092.3, pasivo_total: 2141.0, fondo_comercio: 1283.0, intangibles: 1849.5, inmovilizado_material: 79.2, existencias: 0, clientes: 301.4, proveedores: 136.1, activos_contrato: null, pasivos_contrato: 184.3, caja: 265.3, deuda_financiera: 1370.0, arrendamientos: 0, patrimonio_neto: 2001.9, minoritarios: 0, reservas: 2694 });
const flujos = reales(X.flujos.historico).map((r) => { const { fin, ...resto } = r; return { ...resto, periodo: fy(r.periodo), pagos_arrendamientos: 0, desinversiones: r.desinversiones ?? 0, emision_acciones: r.periodo === '2025' ? 81.7 : 0 }; });
flujos.push({ periodo: 'FY2026', flujo_operativo: 822.2, capex: 114.7, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: 164.2, recompras: 644.0, emision_acciones: 33.3, intereses_en_financiacion: 0 });

const seg = (nombre, desc, datos) => ({ nombre, descripcion: desc, tipo_resultado: 'EBIT', historico: datos.map(([p, i, r]) => ({ periodo: p, ingresos: i, resultado: r })) });
const A = {
  _estado: 'completa',
  negocio: {
    segmentos: [
      seg('Américas', 'EE. UU., Canadá y Latinoamérica; incluye CUSIP Global Services desde mar-2022', [['FY2021', 1008.0, 218.2], ['FY2022', 1173.9, 159.1], ['FY2023', 1335.5, 239.4], ['FY2024', 1419.9, 261.8], ['FY2025', 1506.1, 306.0]]),
      seg('EMEA', 'Europa, Oriente Medio y África', [['FY2021', 427.7, 159.7], ['FY2022', 484.3, 196.2], ['FY2023', 539.8, 243.0], ['FY2024', 563.1, 283.0], ['FY2025', 580.3, 274.0]]),
      seg('Asia-Pacífico', 'Asia y Oceanía; además, los centros de servicio de India y Filipinas', [['FY2021', 155.7, 96.2], ['FY2022', 185.7, 120.1], ['FY2023', 210.2, 146.7], ['FY2024', 220.0, 156.5], ['FY2025', 235.4, 168.3]]),
    ],
    geografias: [{ nombre: 'Américas', peso_pct: 65.3 }, { nombre: 'EMEA', peso_pct: 24.4 }, { nombre: 'Asia-Pacífico', peso_pct: 10.3 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'ASV orgánico (M USD)', valor_anterior: '2.400,0 (ago-25, base comparable)', valor_actual: '2.568,2 (ago-26)', variacion: '+7,0 %', comentario: 'El mayor aumento anual de su historia (+168,2 M); FY2025 creció un 5,7 % [1, 8].' },
      { kpi: 'Retención de ASV', valor_anterior: '> 95 %', valor_actual: '> 95 %', variacion: 'Estable', comentario: 'Por clientes, 91 % en FY2025 [2]; renovaciones del 4T un 30 % más largas «manteniendo el precio» [1, 11].' },
      { kpi: 'Clientes / usuarios', valor_anterior: '8.996 / 237.324 (ago-25)', valor_actual: '> 9.200 / > 260.000 (ago-26)', variacion: '+2 % / +10 %', comentario: 'Cifras de 2026 redondeadas por la empresa [1, 2].' },
      { kpi: 'ASV de soluciones de IA', valor_anterior: 'n. s.', valor_actual: '> 10 % del ASV nuevo del 4T', variacion: 'Más del doble que en FY2025', comentario: '650 clientes con MCP en contrato o prueba [11].' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '36,3 %', valor_actual: '34,5 %', variacion: '−180 pb', comentario: 'Incentivos ligados al ASV y tecnología; guía FY2027 34,75-35,25 % [1].' },
      { kpi: 'Plantilla', valor_anterior: '12.800 (ago-25)', valor_actual: 'Baja en FY2026 (primera en años)', variacion: 'n. d.', comentario: 'Recorte de ≈ 10 % de la plantilla de tecnología en el 3T y más ajustes en octubre [11].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ago-26 (FY2026)', fecha_fin: '2026-08-31', ingresos: 2476.3, ebitda: 880.8, ebit: 700.0, beneficio_neto: 533.5, bpa: 14.57, dpa: 4.46, dpa_extraordinario: 0, fcf: 707.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 79.2 },
    cambios_perimetro: [
      { periodo: 'FY2022', descripcion: 'CUSIP Global Services, comprada el 1-mar-2022 por 1.932 M en efectivo: medio año en la cuenta y entera en el balance.' },
      { periodo: 'FY2025', descripcion: 'Irwin (nov-2024, 120 M) y LiquidityBook (feb-2025, 243 M): ≈ 10 M de ingresos comprados en FY2026.' },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      ['1T25', 568.7, 4.9, 4.7, 229.9, 3.89, null], ['2T25', 570.7, 4.5, 4.0, 224.6, 3.76, null], ['3T25', 585.5, 5.9, 4.4, 235.9, 3.87, null], ['4T25', 596.9, 6.2, 4.5, 244.6, 4.03, null],
      ['1T26', 607.6, 6.9, 6.0, 248.8, 4.06, null], ['2T26', 611.0, 7.1, 6.8, 233.2, 3.59, null], ['3T26', 622.9, 6.4, 7.0, 220.2, 3.50, null], ['4T26', 634.7, 6.3, 7.1, 209.2, 3.41, 'Superior'],
    ].map(([periodo, ingresos, c, o, e, bpa, vs]) => ({ periodo, ingresos, crecimiento_pct: c, crecimiento_organico_pct: o, ebitda: e, margen_ebitda_pct: Math.round((e / ingresos) * 1000) / 10, bpa, vs_consenso: vs })),
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2027', importe: 500 }, { anio: 'FY2029', importe: 375 }, { anio: 'FY2032', importe: 500 }],
    liquidez: 'Caja e inversiones 265 M (31-ago-26) + revolving de 1.500 M sin disponer hasta ago-2031 [1, 11, 12].',
    rating: 'Grado de inversión; Moody\'s lo reafirmó con perspectiva estable en 2026 (nota exacta no verificada en documento primario) [11]',
    coste_deuda_pct: 4.0,
    vida_media_anios: 3.0,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young LLP', anios_auditor: 13, opinion: 'Favorable en las cuentas; desfavorable (adversa) sobre el control interno en FY2024 y FY2025 por una debilidad material en los controles generales de TI de ingresos, cuentas a cobrar e ingresos diferidos [2]', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: 'FY2022', objetivo: 'CUSIP Global Services (S&P Global)', importe: 1932, ev_ebitda: null, financiacion: 'Deuda: bonos de 1.000 M (2,9 % 2027 y 3,45 % 2032) y préstamos', resultado: 'Monopolio de identificadores CUSIP con licencia renovable de la ABA; 215 M de fondo de comercio y ≈ 1.700 M de intangibles; sin deterioros; ROIC del grupo de 25 % a 18 % por el capital añadido [2, 3].' },
      { anio: 'FY2025', objetivo: 'LiquidityBook (gestión de órdenes en la nube)', importe: 243, ev_ebitda: null, financiacion: 'Caja y revolving', resultado: 'Integrada en la oferta de mesa de operaciones; sin deterioro [2].' },
      { anio: 'FY2025', objetivo: 'Irwin (plataforma de relación con inversores)', importe: 120, ev_ebitda: null, financiacion: 'Caja', resultado: 'Añadió clientes corporativos (≈ +779 clientes en FY2025) [2].' },
      { anio: 'FY2027', objetivo: 'BCC Group (distribución de datos en tiempo real, Fráncfort)', importe: null, ev_ebitda: null, financiacion: 'n. d.', resultado: 'Anunciada en sep-2026, precio no publicado [11].' },
    ],
    politica: 'Dividendo trimestral de 1,16 USD (27.º año seguido de subida) y recompras: 644 M en FY2026, más del doble que en FY2025, con 356 M aún autorizados a 31-ago-26. Prioridades declaradas: inversión orgánica, compras que encajen y devolución del exceso [1, 11].',
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'ingresos y resultado por segmento de FY2026', tipo: 'Complemento', intentos: '1) Nota de resultados del 4T26 (solo ingresos del trimestre por región); 2) 10-K FY2026 (aún no presentado a 15-oct); 3) EDGAR XBRL (último año, FY2025)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial: infraestructura de mercados y datos financieros (Burton-Taylor, SEC, comparables)', editor: 'Repositorio (sectores/bolsas-datos-financieros-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://tpicap.com/burtontaylor/reports/03/2026/financial-market-dataanalysis-global-share-segment-sizing-2026' },
  { id: 2, titulo: 'Annual Report on Form 10-K, fiscal 2025 (competencia, empleados, clientes, riesgos)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-10-30', url: SEC('000162828025045769', 'fds-20250831.htm') },
  { id: 3, titulo: 'Market data spend reaches record 37.3bn (2022)', editor: 'Markets Media', tipo: 'Sectorial', fecha: '2023-04', url: 'https://www.marketsmedia.com/market-data-spend-reaches-record-37-3bn' },
  { id: 4, titulo: 'FactSet: As Uncertainty Increases, We Are Decreasing Our FVE and Downgrading Our Moat Rating to None', editor: 'Morningstar', tipo: 'Analistas', fecha: '2026', url: 'https://www.morningstar.com/stocks/factset-uncertainty-increases-we-are-decreasing-our-fve-downgrading-our-moat-rating-none' },
  { id: 5, titulo: 'Financial data providers trade lower as OpenAI launches ChatGPT for financial services', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-10', url: 'https://seekingalpha.com/symbol/FDS/news' },
  { id: 6, titulo: 'FactSet (FDS) Q4 2026 Earnings Call Transcript', editor: 'The Motley Fool vía Mitrade', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.mitrade.com/insights/news/live-news/article-8-2131351-20261001' },
  { id: 7, titulo: 'Informe value de LSEG (competidor: LSEG Data & Analytics/Workspace)', editor: 'Repositorio (informes/lseg-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.lseg.com/en/investor-relations' },
  { id: 8, titulo: 'Informe value de MSCI (competidor en analítica de carteras)', editor: 'Repositorio (informes/msci-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://ir.msci.com/' },
  { id: 9, titulo: 'FactSet Stock Downgraded to Sell, Price Target Reduced on Terminal Risks (Redburn, 18-jun-2026)', editor: 'SentiSense', tipo: 'Prensa', fecha: '2026-06-18', url: 'https://app.sentisense.ai/stories/factset-stock-downgraded-to-sell-price-target-reduced-on-terminal-risks-06182026' },
  { id: 10, titulo: 'Annual Report on Form 10-K, fiscal 2023 (historia, CUSIP)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2023-10-27', url: SEC('000101323723000128', 'fds-20230831.htm') },
];
const B_ = {
  _estado: 'completa',
  historia: {
    resumen: 'FactSet nació en 1978 en Nueva York como proveedor de datos de empresas para los bancos de inversión y salió a bolsa en 1996. Durante tres décadas creció de forma orgánica con un terminal para analistas y gestoras, y a partir de 2010 compró analítica de carteras (Portware, BISAM, Cobalt) para estar en todo el ciclo de inversión. La mayor compra de su historia fue CUSIP Global Services (2022, 1.932 M), el emisor exclusivo de los identificadores CUSIP. Phil Snow dirigió la empresa de 2015 a 2025; en septiembre de 2025 llegó Sanoke Viswanathan, de JPMorgan, con el encargo de acelerar la IA. En 2026 cambió también el director financiero [2, 10].',
    hitos: [
      { anio: '1978', hito: 'Fundación en Nueva York por Howard Wille y Charles Snyder.' },
      { anio: '1996', hito: 'Salida a bolsa (NYSE; desde 2017 también en el Nasdaq).' },
      { anio: '2015', hito: 'Compra de Portware (ejecución de órdenes) y BISAM (rendimiento y riesgo); Phil Snow, consejero delegado.' },
      { anio: '2022', hito: 'Compra de CUSIP Global Services a S&P Global por 1.932 M, financiada con deuda [10].' },
      { anio: '2024-25', hito: 'Irwin (relación con inversores) y LiquidityBook (órdenes en la nube) [2].' },
      { anio: '2025', hito: 'Sanoke Viswanathan sustituye a Phil Snow como consejero delegado (septiembre) [2].' },
      { anio: '2026', hito: 'Caída a 185 USD en febrero por el miedo a la IA; Redburn la baja a Vender en junio; nuevo director financiero (abril) y director de IA (marzo) [9].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el gasto mundial en datos y análisis de mercados financieros (terminales, datos de referencia y de precios, analítica de carteras y riesgo) que mide Burton-Taylor. Se usa esta cifra y no la del sector entero de infraestructura de mercados (≈ 100.000 M USD con bolsas, índices y calificaciones), porque FactSet solo vende datos, analítica y flujos de trabajo [1].',
    tamano: '≈ 49.200 M USD en 2025, +6,5 % (Burton-Taylor, citado en la ficha sectorial) [1]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2019', tamano: 32000 }, { anio: '2022', tamano: 37300 }, { anio: '2023', tamano: 42000 }, { anio: '2025', tamano: 49200 }, { anio: '2030e', tamano: 70000 }],
    tcac_historico_pct: 7.4, tcac_previsto_pct: 7.0, cr5_pct: 75, estructura: 'Concentrada',
    drivers: [
      { driver: 'Precio de las suscripciones', efecto: '+', horizonte: 'Estructural', evidencia: 'Subidas anuales del 3-6 % en datos y terminales en el sector [1]; FactSet renovó en el 4T26 contratos un 30 % más largos «manteniendo el precio» [6].' },
      { driver: 'Datos para IA (API, MCP, nube)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Nuevo canal de consumo: 650 clientes de FactSet con MCP; a la vez permite a laboratorios de IA empaquetar datos [6, 5].' },
      { driver: 'Presupuestos de las gestoras activas', efecto: '−', horizonte: 'Estructural', evidencia: 'El paso a la gestión pasiva reduce puestos de analista: riesgo declarado por FactSet [2].' },
      { driver: 'Volumen de mercados privados, patrimonio y operaciones', efecto: '+', horizonte: 'Cíclico', evidencia: 'ASV de banca de inversión y capital riesgo +9 % y de patrimonio +9 % en el 4T26 [6].' },
      { driver: 'Consolidación de proveedores', efecto: '+/−', horizonte: 'Estructural', evidencia: 'S&P-IHS Markit, LSEG-Refinitiv, ICE-Black Knight: escala para competir en datos [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Bloomberg y LSEG Workspace ≈ 50 % del gasto en datos de mercado; S&P Capital IQ tercero; FactSet es el cuarto con ≈ 5 % [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Las grandes gestoras negocian acuerdos de empresa; ningún cliente supera el 3,5 % de los ingresos [2].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Parte del contenido viene de terceros (bolsas, S&P, MSCI) con licencias que pueden encarecerse [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Los laboratorios de IA (OpenAI para servicios financieros, sep-2026) entran por la capa de interfaz, no por los datos [5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Asistentes de IA que leen documentos y datos públicos sustituyen parte del trabajo del analista en el terminal; Morningstar retiró el foso de FactSet por esa incertidumbre [4].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Las suscripciones apenas notan el ciclo: FactSet creció en ingresos 47 años seguidos, también en 2008-09 y en 2020 [2]. Lo cíclico es el ASV de la banca de inversión (18 % del total), que se frenó en 2023 con la caída de operaciones y se ha recuperado en 2026 (+9 %). En 2022 el sector se desrateó por los tipos; en 2026 por la IA, no por el ciclo [6, 1].' },
    regulacion: 'Pocas normas tocan los ingresos de FactSet: la presión de la FCA y de la UE sobre el precio de los datos de mercado (estudio de 2024, cinta consolidada en 2025-26) afecta sobre todo a las bolsas y a LSEG [1]. CUSIP Global Services opera con licencia renovable de la American Bankers Association y está demandada en una acción colectiva por sus tarifas (Dinosaur Financial Group contra S&P Global y otros) [2]. La Ley de IA de la UE y DORA (ene-2025) añaden costes de cumplimiento [1].',
    tendencias: 'La IA generativa cambia cómo se consumen los datos: de puestos de terminal a llamadas por API y por MCP desde los asistentes. FactSet gana si sus datos limpios y su lógica de cálculo se vuelven la «fuente de verdad» dentro de esos asistentes (650 clientes con MCP, llamadas por API ×7 en un trimestre) y pierde si el valor se va a la interfaz que controlan OpenAI, Anthropic o Microsoft y el dato se compra por volumen a menor precio [6, 5]. La competencia de Bloomberg y LSEG, que también lanzan MCP, hace que la ventaja sea temporal [6].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.2,
    posicion: '4.º proveedor mundial de datos y análisis de mercados financieros (≈ 5 % de 49.200 M USD), detrás de Bloomberg, LSEG Data & Analytics y S&P Market Intelligence; fuerte en gestoras (82 % del ASV) [1, 2]',
    competidores: [
      { nombre: 'Bloomberg L.P.', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en terminales; privada, sin cuentas [2].' },
      { nombre: 'LSEG Data & Analytics (Workspace)', pais: 'Reino Unido', ticker: 'LSEG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Antigua Refinitiv; ASV ≈ +6 %; competidor directo en terminal y datos en tiempo real [7, 1].' },
      { nombre: 'S&P Global (Market Intelligence)', pais: 'EE. UU.', ticker: 'SPGI', ingresos: 11659, cuota_pct: null, margen_ebit_pct: 42.2, comentario: 'Capital IQ Pro; ingresos y margen del grupo de 2025 [7].' },
      { nombre: 'MSCI', pais: 'EE. UU.', ticker: 'MSCI', ingresos: 2383, cuota_pct: null, margen_ebit_pct: 54.7, comentario: 'Analítica de carteras y riesgo frente a la parte de FactSet de gestión de carteras [8].' },
      { nombre: 'Morningstar', pais: 'EE. UU.', ticker: 'MORN', ingresos: 2570, cuota_pct: null, margen_ebit_pct: null, comentario: 'Datos de fondos y patrimonio (Direct, PitchBook) [8].' },
      { nombre: 'BlackRock Aladdin', pais: 'EE. UU.', ticker: 'BLK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Plataforma de gestión de carteras que compite en la parte de flujo de trabajo [2].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Sin red entre usuarios comparable a la mensajería de Bloomberg.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Retención de ASV > 95 % durante años; los modelos y carteras de los clientes viven en su formato y su lógica de cálculo [2, 6].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencia exclusiva de los CUSIP (monopolio de identificadores en EE. UU.) y bases de datos propias de estimaciones y transcripciones [2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: '≈ 68 % de la plantilla en India y Filipinas; margen operativo ajustado 34,5 % frente al 40 % o más de S&P y MSCI [2, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercado con tres grandes por encima; ≈ 5 % de cuota [1].' },
      ],
    },
    amenazas: 'La amenaza principal es que la IA reduzca el valor del terminal: si los analistas trabajan desde un asistente (ChatGPT para servicios financieros, Claude, Copilot) que compra datos a varios proveedores, FactSet pasa de vender puestos con margen alto a vender datos por volumen, con menos poder de precio. Probabilidad media a cinco años; hoy no se ve en las cifras (ASV +7 %, retención > 95 %), pero Morningstar retiró el foso y Redburn la bajó a Vender por «riesgo terminal» [4, 9, 5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras son la seguridad de los datos (ciberataques y continuidad) y el capital humano: el 68 % de los 12.800 empleados está en India y Filipinas, con costes salariales que suben con la inflación local y una reforma laboral en India que costó 2,9 M en FY2026 [2].',
    controversias: 'Debilidad material en los controles de TI sobre los ingresos (FY2024-FY2025, sin errores detectados) y acción colectiva sobre las tarifas de los CUSIP; sin sanciones relevantes en tres años [2].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) 10-K y proxy (no las publican); 2) búsqueda web MSCI/Sustainalytics; 3) web de sostenibilidad de FactSet (no consultada a tiempo)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen de Bloomberg y LSEG D&A', tipo: 'Complemento', intentos: '1) Bloomberg es privada; 2) LSEG publica la división sin EBIT comparable en el informe del repo; 3) Burton-Taylor (de pago)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2025 (DEF 14A): consejo, remuneración, accionistas', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-10-27', url: SEC('000162828025046442', 'fds-20251027.htm') },
  { id: 2, titulo: '8-K: resultados de la junta del 18-dic-2025', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-12-22', url: SEC('000162828025058577', 'fds-20251218.htm') },
  { id: 3, titulo: '8-K: salida de Helen Shan y nombramiento de Joshua Warren como director financiero', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-04-08', url: SEC('000095010326005447', 'dp244995_8k.htm') },
  { id: 4, titulo: '8-K: Kate Stepp, directora de IA; Bob Stolte, director de tecnología', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-03-04', url: SEC('000162828026014385', 'fds-20260302.htm') },
  { id: 5, titulo: '8-K: nombramiento de Marcel Prins como consejero', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-09-25', url: SEC('000162828026063495', 'fds-20260923.htm') },
  { id: 6, titulo: 'Form 4 presentados entre el 14-oct-2025 y el 14-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001013237&type=4' },
  { id: 7, titulo: 'Resultados anuales FY2023-FY2026 (guías y resultados)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-09-30', url: SEC('000162828026063888', 'fdsq42026earningsrelease.htm') },
  { id: 8, titulo: 'Annual Report on Form 10-K, fiscal 2025 (directivos)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-10-30', url: SEC('000162828025045769', 'fds-20250831.htm') },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Sanoke Viswanathan', cargo: 'Consejero delegado', desde: '2025', participacion_pct: 0.0, trayectoria: 'Venía de JPMorgan (dirigió la banca de consumo internacional y antes la estrategia de la banca de inversión). Su primer año: ASV orgánico de +5,7 % a +7,0 %, recorte de plantilla de tecnología y margen ajustado −180 pb por incentivos [8, 7].' },
      { nombre: 'Joshua Warren', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.0, trayectoria: 'Nombrado el 8-abr-2026 tras la salida de Helen Shan; sin historial propio de guía todavía [3].' },
      { nombre: 'Malcolm Frank', cargo: 'Presidente del consejo (independiente)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Cofundador de CXO Partners y exdirectivo de Cognizant; presidente desde el 17-sep-2025 en sustitución de Robin Abrams [1].' },
      { nombre: 'Goran Skoko', cargo: 'Director comercial (CRO)', desde: '2010', participacion_pct: 0.0, trayectoria: 'Lleva EMEA y Asia-Pacífico; compró 500 acciones en el último año [1, 6].' },
      { nombre: 'Kate Stepp', cargo: 'Directora de IA', desde: '2026', participacion_pct: 0.0, trayectoria: 'Antes directora de tecnología; dirige los productos de IA y MCP [4].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'BPA ajustado 17,25-17,75; ingresos 2.450-2.470 M (revisada al alza en el 2T)', real: 'BPA ajustado 18,01; ingresos 2.476 M', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'BPA ajustado 16,80-17,40; margen ajustado 36-37 %', real: 'BPA ajustado 16,98; margen 36,3 %', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'BPA ajustado 15,65-16,15; ASV +6-8 %', real: 'BPA ajustado 16,45; ASV orgánico + servicios ≈ +5 %', cumplida: 'Parcial' },
      { anio: 'FY2023', guia: 'BPA ajustado 14,50-14,90; ASV + servicios +8,1-9,7 %', real: 'BPA ajustado 14,55; ASV ≈ +8 %', cumplida: 'Parcial' },
      { anio: 'FY2022', guia: 'BPA ajustado 12,00-12,30 (inicial)', real: 'BPA ajustado 13,43 (con CUSIP)', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Malcolm Frank', cargo: 'Presidente', tipo: 'Independiente', desde: '2016', comisiones: 'Presidencia' },
      { nombre: 'Sanoke Viswanathan', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Robin A. Abrams', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Nombramientos' },
      { nombre: 'Siew Kai Choy', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
      { nombre: 'Barak Eilam', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Tecnología' },
      { nombre: 'Laurie G. Hylton', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'Lee Shavel', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría' },
      { nombre: 'Laurie Siegel', cargo: 'Consejera', tipo: 'Independiente', desde: '2014', comisiones: 'Remuneración' },
      { nombre: 'Maria Teresa Tejada', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Remuneración' },
      { nombre: 'Elisha Wiesel', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos' },
      { nombre: 'Marcel Prins', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'n. d.' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 95.5, voto_remuneracion_contra_pct: 4.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 9.46, fijo: 0.78, variable_corto: 1.17, variable_largo: 7.50, ratio_salario_medio: 536 },
    remuneracion: 'El variable anual depende en un 80 % de la empresa (dos tercios crecimiento del ASV, un tercio margen operativo ajustado, con un 10 % ligado al ASV de IA generativa) y en un 20 % de objetivos individuales. El largo plazo es mitad opciones a cinco años y mitad PSU a tres años medidas por el beneficio operativo ajustado y los ingresos acumulados: premia crecer, no el ROIC ni el flujo de caja. Hay política de recuperación (clawback). El nuevo consejero delegado recibió premios de compensación por lo que dejó en JPMorgan (19,5 M de coste en FY2026, excluidos del BPA ajustado). Voto consultivo de 2025: 95,5 % a favor [1, 2, 7].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.2, tipo: 'Institucional (índices)', variacion: '13G/A de feb-2024' },
      { nombre: 'BlackRock', pct: 9.3, tipo: 'Institucional (índices)', variacion: '13G de ene-2024' },
      { nombre: 'BAMCO (Baron Capital)', pct: 6.6, tipo: 'Gestora activa', variacion: '13G/A de nov-2024' },
      { nombre: 'Morgan Stanley', pct: 5.8, tipo: 'Institucional', variacion: '13G de ago-2025' },
      { nombre: 'State Street', pct: 5.2, tipo: 'Institucional (índices)', variacion: '13G de oct-2024' },
    ],
    insiders: [
      { fecha: '2025-2026', persona: 'Laurie Siegel (consejera)', operacion: 'Venta', acciones: 2572, importe: 0.76 },
      { fecha: '2025-2026', persona: 'Malcolm Frank (presidente)', operacion: 'Venta', acciones: 2572, importe: 0.76 },
      { fecha: '2025-2026', persona: 'Goran Skoko (director comercial)', operacion: 'Compra', acciones: 500, importe: 0.13 },
    ],
    control_y_defensas: 'Capital disperso: los cinco primeros son gestoras con un 39 % entre todas y ningún accionista de control. Una acción, un voto; consejo elegido cada año por mayoría; en la junta de 2025 se rebajó de mayoría reforzada a simple la mayoría para cambiar la norma de actuación por escrito. Los estatutos se enmendaron el 24-sep-2026 para afinar el aviso previo de propuestas de accionistas. Cambio de control: los bonos se recompran al 101 % [1, 2, 7].',
    alertas: [
      'Debilidad material en los controles generales de TI de ingresos (FY2024 y FY2025), con remediación prevista en FY2026 [8].',
      'Rotación de la cúpula: consejero delegado nuevo (sep-2025), director financiero nuevo (abr-2026) y presidente nuevo (sep-2025) [1, 3].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const S = lee(path.join(raiz, 'sectores', 'bolsas-datos-financieros-2026-10-14-comparables.json'));
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (FDS, SPY, XLF) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/FDS/history' },
  { id: 2, titulo: 'FDS forecast: consenso de 18 analistas (S&P Global), objetivos y estimaciones FY2027-FY2028', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://stockanalysis.com/stocks/fds/forecast/' },
  { id: 3, titulo: 'Comparables de la ficha sectorial (MarketScreener y Stock Analysis, cierres del 13/14-oct)', editor: 'Repositorio (sectores/bolsas-datos-financieros-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/' },
  { id: 4, titulo: 'Transacciones del sector (informes de LSEG y MSCI del 14-oct, con sus fuentes primarias)', editor: 'Repositorio', tipo: 'Analistas', fecha: '2026-10-14', url: 'https://www.sec.gov/' },
  { id: 5, titulo: 'FactSet Reports Results for Fourth Quarter and Fiscal 2026 (balance a 31-ago-26, guía FY2027)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2026-09-30', url: SEC('000162828026063888', 'fdsq42026earningsrelease.htm') },
  { id: 6, titulo: 'FRED DGS10: bono del Tesoro de EE. UU. a 10 años (5,21 % el 13-oct-2026)', editor: 'Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'FactSet downgraded to Sell from Neutral at Redburn Atlantic (objetivo 215 USD desde 291)', editor: 'TipRanks / The Fly', tipo: 'Prensa', fecha: '2026-06-18', url: 'https://www.tipranks.com/news/the-fly/factset-downgraded-to-sell-from-neutral-at-redburn-atlantic' },
  { id: 9, titulo: 'Annual Report on Form 10-K, fiscal 2023 (compra de CUSIP Global Services)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2023-10-27', url: SEC('000101323723000128', 'fds-20230831.htm') },
  { id: 10, titulo: 'Resultados anuales FY2017-FY2025 (BPA ajustado y amortización de intangibles por acción para la historia del PER)', editor: 'FactSet Research Systems', tipo: 'Primaria', fecha: '2025-09-18', url: SEC('000101323725000084', 'fdsq42025earningsrelease.htm') },
];
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'FactSet Research Systems Inc.', nombre_corto: 'FactSet', ticker: 'FDS', isin: 'US3030751057', mercado: 'NYSE (también Nasdaq)', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Financials', industria: 'Financial Exchanges & Data', sede: 'Norwalk (Connecticut)', fundacion: '1978', empleados: 12800, web: 'https://www.factset.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 35.43, capitalizacion_publicada: null, free_float_pct: 99.5,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-12-17',
  },
  consenso: {
    guidance: 'Guía FY2027 (30-sep-2026): ASV orgánico +5,0-6,5 %, ingresos 2.600-2.625 M (+5-6 % publicado, ≈ 1 punto más en comparable por la salida de ESG Signals, divisa y extraordinarios), margen operativo 31-32 % (ajustado 34,75-35,25 %) y BPA de 17,00-17,50 USD (ajustado 19,25-19,65). La dirección dice que el margen de FY2026 es un suelo y que el tipo impositivo (≈ 19 %) y la refinanciación de los bonos de 2027 restan 0,30-0,40 USD por acción. Día del inversor: 10-nov-2026 [5].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 2620, ebitda: null, ebit: null, bpa: 19.62, dpa: null, fuente: 'Stock Analysis (S&P Global), 16 analistas; BPA ajustado [2]' },
      { periodo: 'FY2028e', ingresos: 2780, ebitda: null, ebit: null, bpa: 21.70, dpa: null, fuente: 'Stock Analysis (S&P Global); BPA ajustado [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: null, mantener: null, vender: null, po_medio: 280, po_min: 212, po_max: 340 },
    revisiones: 'El consenso de BPA ajustado de FY2027 (19,62) queda en la parte alta de la guía (19,25-19,65). Los objetivos bajaron en el primer semestre de 2026 con el miedo a la IA (Redburn de 291 a 215 USD en junio, a Vender) y han subido algo tras la aceleración del ASV del 3T y el 4T; la mediana de objetivos (288,5) está en el precio de hoy. Solo hay una fuente con estimaciones completas gratis: no se han podido cruzar [2, 8].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: (({ tramo_drawdown, ...b }) => ({ ...b, posicion_corta_pct: null, confianza: "Alta" }))(B.bolsa),
  multiplos_historicos: {
    serie: ['FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    criterio: `Once cotizadas de datos e infraestructura de mercados de la ficha sectorial del 14-oct (${S.empresas.length} menos FactSet): las de datos y analítica (S&P Global, Thomson Reuters, Verisk, MSCI, Moody's) son las más parecidas; las bolsas (CME, ICE, Nasdaq, Deutsche Börse, LSEG, Tradeweb) se mantienen porque LSEG es el competidor directo y el sector se valora en bloque. Sin Bloomberg (privada) ni Morningstar (sin estimaciones del mismo proveedor). Cifras de MarketScreener y Stock Analysis llevadas al cierre del 13/14-oct; el BPA de casi todas es ajustado [3].`,
    empresas: S.empresas.filter((e) => e.ticker !== 'FDS').map(({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct })),
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'MarketAxess Holdings', comprador: 'Intercontinental Exchange', ev: 5580, ev_ventas: 6.41, ev_ebitda: 13.0, prima_pct: 33, excluir: false, comentario: 'Pendiente, en efectivo; ventas de 870 M y EBITDA de 430 M de 12 meses a jun-26 [4].' },
      { fecha: '2025-10', objetivo: 'With Intelligence', comprador: 'S&P Global', ev: 1800, ev_ventas: 13.8, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Datos de mercados privados; múltiplo sobre ≈ 130 M de ingresos previstos [4].' },
      { fecha: '2023-06', objetivo: 'Adenza', comprador: 'Nasdaq', ev: 10500, ev_ventas: 17.8, ev_ebitda: 30.7, prima_pct: null, excluir: false, comentario: 'Software de riesgo; múltiplos sobre la previsión de 2023 [4].' },
      { fecha: '2022-03', objetivo: 'CUSIP Global Services', comprador: 'FactSet', ev: 1932, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Venta obligada a S&P Global por la fusión con IHS Markit; FactSet no publicó ingresos ni EBITDA de CGS [9].' },
      { fecha: '2020-11', objetivo: 'IHS Markit', comprador: 'S&P Global', ev: 44000, ev_ventas: 10.26, ev_ebitda: 24.0, prima_pct: null, excluir: false, comentario: 'Fusión en acciones; EBITDA ajustado de 1.837 M [4].' },
      { fecha: '2019-08', objetivo: 'Refinitiv', comprador: 'London Stock Exchange Group', ev: 27000, ev_ventas: 4.35, ev_ebitda: 13.1, prima_pct: null, excluir: false, comentario: 'En acciones; ingresos de 6.204 M y EBITDA ajustado de 2.054 M de 2018: es el competidor directo de FactSet [4].' },
    ],
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA de consenso y reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (página de finanzas tras registro); 2) Stock Analysis (FY2028+ de pago, sin EBITDA); 3) Investing (no consultado: búsquedas agotadas)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) FINRA/Nasdaq short interest; 2) Stock Analysis; 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: análisis y noticias de FDS (RSS), jul-oct 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://seekingalpha.com/api/sa/combined/FDS.xml' },
  { id: 2, titulo: 'Seeking Alpha: comentarios de lectores de FDS', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://seekingalpha.com/symbol/FDS/comments' },
  { id: 3, titulo: 'Down 30% in 2026: should you buy the AI dip in FactSet stock?', editor: 'Barchart', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://www.barchart.com/story/news/425737/down-30-in-2026-should-you-buy-the-ai-dip-in-factset-stock' },
  { id: 4, titulo: 'FactSet (FDS): valoración tras la guía y los márgenes', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://simplywall.st/stocks/us/diversified-financials/nyse-fds/factset-research-systems/news/factset-fds-exploring-valuation-after-2026-guidance-and-marg' },
  { id: 5, titulo: 'Why AI Disruption Risk Is Mispriced Across Financial Data Stocks', editor: 'StockWireX', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://stockwirex.com/analysis/ai-disruption-financial-data-stocks-mispriced/' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'Tras el 4T, dos subidas de recomendación («la historia mejora») y un artículo que lo resume en «todo depende de adaptarse a la IA»; en julio, títulos de «aún infravalorada» y «precio de disrupción, no de solución» [1].' },
      { plataforma: 'Seeking Alpha (comentarios de lectores)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Los alcistas la ven «compra clara» si no decrece cada año; los bajistas temen que ChatGPT para finanzas y Claude conviertan el terminal en una mercancía [2].' },
      { plataforma: 'Barchart (artículo y comentarios)', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: 'Pregunta si comprar «la caída por IA»: competencia de suscripciones con IA y presupuestos ajustados en gestoras frente a retención alta [3].' },
      { plataforma: 'Simply Wall St (comunidad)', fecha: '2026-10', n_comentarios: 8, tono: 'Neutro', resumen: 'Destaca que los clientes con IA crecen más deprisa y discute el valor tras la guía de márgenes [4].' },
      { plataforma: 'StockWireX (análisis con comentarios)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Sostiene que el riesgo de la IA está mal valorado en todo el sector de datos financieros [5].' },
    ],
    temas: [
      { tema: 'La IA se come el terminal', postura: 'Dividida', peso: 'Alto', contraste: 'Las cifras aún no lo muestran: ASV orgánico de +4,5 % a +7,0 % en un año y retención > 95 %; el riesgo es de plazo largo y lo recoge el bajista [1, 2].' },
      { tema: 'Valoración en mínimos de diez años', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: unas 16 veces nuestro BPA de FY2027 frente a una mediana de 27 en cinco años; pero la historia es de otro régimen de tipos y de percepción [3].' },
      { tema: 'Márgenes a la baja por incentivos e inversión', postura: 'Bajista', peso: 'Medio', contraste: 'El margen ajustado cayó 180 pb en FY2026; la guía FY2027 lo sube 25-75 pb [4].' },
      { tema: 'Recompras agresivas', postura: 'Alcista', peso: 'Medio', contraste: '644 M en FY2026 (−7 % de acciones) a un precio medio de ≈ 250 USD en el 4T [1].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'Reddit y Stocktwits', tipo: 'Complemento', intentos: '1) API de Stocktwits (respuesta sin mensajes); 2) búsqueda de hilos de Reddit (sin resultados); 3) foros alternativos vía búsqueda (solo artículos con comentarios)', decision: 'Omitido' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas');
