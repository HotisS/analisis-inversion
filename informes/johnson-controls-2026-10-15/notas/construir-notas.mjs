// Escribe las notas A-E de Johnson Controls (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json y companyfacts),
// las notas de prensa de resultados (8-K 99.1) del 4T24 al 3T26, el proxy de 2026, Form 4, bolsa.mjs, Yahoo Finance,
// Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
// Ejercicio fiscal a 30 de septiembre: «2025» = FY2025 (oct-2024 a sep-2025), etiqueta «fin».
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/833444';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cerrado el 30-sep-2025): negocio, segmentos, deuda, litigios (AFFF, amianto)', editor: 'Johnson Controls International plc / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-14', url: `${E8}/000083344425000097/jci-20250930.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025; resultado de operaciones continuadas y reestructuración', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000833444.json' },
  { id: 3, titulo: 'Johnson Controls Reports Strong Q3 Results; Raises FY26 Guidance (8-K, anexo 99.1): cuenta, balance a 30-jun-2026, flujos de 9 meses, segmentos y guía', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000083344426000083/q3ex991xq3fy26earningsrele.htm` },
  { id: 4, titulo: 'Johnson Controls Reports Strong Q2 Results; Raises FY26 Guidance (8-K, anexo 99.1)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-06', url: `${E8}/000083344426000047/q2ex991xq2fy26earningsrele.htm` },
  { id: 5, titulo: 'Johnson Controls Reports Strong Q1 Results; Raises FY26 Guidance (8-K, anexo 99.1)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-04', url: `${E8}/000083344426000014/q1ex991xq1fy26earningsrele.htm` },
  { id: 6, titulo: 'Johnson Controls Reports Q4 and FY25 Results; Initiates FY26 Guidance (8-K, anexo 99.1): ejercicio 2025 y 2024 de operaciones continuadas, BPA ajustado, recompra acelerada de 5.000 M', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-05', url: `${E8}/000083344425000084/q4exh991xq4fy25earningsrel.htm` },
  { id: 7, titulo: 'Resultados del 4T y del ejercicio 2024 (8-K, anexo 99.1): ejercicio 2023 de operaciones continuadas (cargos financieros netos 258 M)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2024-11-06', url: `${E8}/000083344424000060/q4exh991xq4fy24earningsrel.htm` },
  { id: 8, titulo: 'Johnson Controls (JCI) Q3 2026 Earnings Call Transcript (centros de datos ≈ «high teens» de las ventas de 2026, un tercio en 3-5 años; cartera de CDU de ≈1.000 M)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.webull.com/news/15364304602866688' },
];
const cuenta = [
  { periodo: '2022', ingresos: 20637, coste_ventas: 13547, gastos_generales: 5078, ebitda: 2054, amortizaciones: 717, ebit: 1337, resultado_financiero: -225, bai: 1112, impuestos: -182, minoritarios: 15, beneficio_neto: 1279, gastos_financieros: 225, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.83, dpa: 1.39, dpa_extraordinario: 0, acciones_diluidas: 700 },
  { periodo: '2023', ingresos: 22331, coste_ventas: 14527, gastos_generales: 5387, ebitda: 2116, amortizaciones: 745, ebit: 1371, resultado_financiero: -258, bai: 1113, impuestos: -468, minoritarios: 19, beneficio_neto: 1562, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.27, dpa: 1.45, dpa_extraordinario: 0, acciones_diluidas: 687 },
  { periodo: '2024', ingresos: 22952, coste_ventas: 14875, gastos_generales: 5661, ebitda: 2680, amortizaciones: 816, ebit: 1864, resultado_financiero: -342, bai: 1522, impuestos: 111, minoritarios: 4, beneficio_neto: 1407, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 383, bpa: 2.08, dpa: 1.48, dpa_extraordinario: 0, acciones_diluidas: 676 },
  { periodo: '2025', ingresos: 23596, coste_ventas: 15004, gastos_generales: 5764, ebitda: 3153, amortizaciones: 865, ebit: 2288, resultado_financiero: -319, bai: 1969, impuestos: 245, minoritarios: 3, beneficio_neto: 1721, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.63, dpa: 1.51, dpa_extraordinario: 0, acciones_diluidas: 654 },
];
const historico = [
  { periodo: '2022', activo_total: 42158, activo_corriente: 11685, pasivo_corriente: 11239, pasivo_total: 24756, fondo_comercio: 16175, intangibles: 5155, inmovilizado_material: 2271, existencias: 2665, clientes: 5727, proveedores: 4368, activos_contrato: null, pasivos_contrato: 1804, caja: 2029, deuda_financiera: 8095, arrendamientos: 0, patrimonio_neto: 16268, minoritarios: 1134, reservas: 1151 },
  { periodo: '2023', activo_total: 42242, activo_corriente: 10737, pasivo_corriente: 11084, pasivo_total: 24548, fondo_comercio: 16772, intangibles: 4772, inmovilizado_material: 2374, existencias: 1872, clientes: 5494, proveedores: 3498, activos_contrato: null, pasivos_contrato: 1923, caja: 828, deuda_financiera: 8179, arrendamientos: 0, patrimonio_neto: 16545, minoritarios: 1149, reservas: 1384 },
  { periodo: '2024', activo_total: 42695, activo_corriente: 11179, pasivo_corriente: 11955, pasivo_total: 25334, fondo_comercio: 16725, intangibles: 4130, inmovilizado_material: 2403, existencias: 1774, clientes: 6051, proveedores: 3389, activos_contrato: null, pasivos_contrato: 2160, caja: 606, deuda_financiera: 9493, arrendamientos: 0, patrimonio_neto: 16098, minoritarios: 1263, reservas: 848 },
  { periodo: '2025', activo_total: 37939, activo_corriente: 10162, pasivo_corriente: 10941, pasivo_total: 24985, fondo_comercio: 16633, intangibles: 3613, inmovilizado_material: 2193, existencias: 1820, clientes: 6269, proveedores: 3614, activos_contrato: null, pasivos_contrato: 2470, caja: 379, deuda_financiera: 9880, arrendamientos: 0, patrimonio_neto: 12927, minoritarios: 27, reservas: 0 },
];
const flujos = [
  { periodo: '2022', flujo_operativo: 1237, capex: 487, pagos_arrendamientos: 0, adquisiciones: 269, desinversiones: 127, dividendos: 916, recompras: 1441, emision_acciones: 17, intereses_en_financiacion: 0 },
  { periodo: '2023', flujo_operativo: 1856, capex: 446, pagos_arrendamientos: 0, adquisiciones: 726, desinversiones: 30, dividendos: 980, recompras: 625, emision_acciones: 42, intereses_en_financiacion: 0 },
  { periodo: '2024', flujo_operativo: 1568, capex: 494, pagos_arrendamientos: 0, adquisiciones: 3, desinversiones: 1, dividendos: 1000, recompras: 1246, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 2554, capex: 434, pagos_arrendamientos: 0, adquisiciones: 10, desinversiones: 37, dividendos: 976, recompras: 5991, emision_acciones: 0, intereses_en_financiacion: 0 },
];
const A = {
  _estado: 'Completo. Ejercicios 2022-2025 de operaciones continuadas (sin el negocio residencial y comercial ligero vendido a Bosch en julio de 2025), del XBRL de la SEC comprobado con las notas de resultados; LTM a junio de 2026 con el 3T26.',
  negocio: {
    segmentos: [
      { nombre: 'Américas', descripcion: 'Climatización aplicada (enfriadoras York, unidades de tratamiento de aire, Silent-Aire para centros de datos), controles, incendios y seguridad, y servicio en Norteamérica y Latinoamérica', tipo_resultado: 'EBIT del segmento', historico: [{ periodo: '2024', ingresos: 15606, resultado: null }, { periodo: '2025', ingresos: 15831, resultado: null }, { periodo: 'LTM jun-26', ingresos: 16793, resultado: null }] },
      { nombre: 'EMEA', descripcion: 'Europa, Oriente Medio y África: climatización, controles, incendios y seguridad, y servicio', tipo_resultado: 'EBIT del segmento', historico: [{ periodo: '2024', ingresos: 4620, resultado: null }, { periodo: '2025', ingresos: 4968, resultado: null }, { periodo: 'LTM jun-26', ingresos: 5144, resultado: null }] },
      { nombre: 'Asia-Pacífico', descripcion: 'Climatización aplicada, controles y servicio en Asia (China, Australia, Japón, India, Sudeste asiático)', tipo_resultado: 'EBIT del segmento', historico: [{ periodo: '2024', ingresos: 2726, resultado: null }, { periodo: '2025', ingresos: 2797, resultado: null }, { periodo: 'LTM jun-26', ingresos: 3058, resultado: null }] },
    ],
    geografias: [{ nombre: 'Américas', peso_pct: 67.2 }, { nombre: 'EMEA', peso_pct: 20.6 }, { nombre: 'Asia-Pacífico', peso_pct: 12.2 }],
    geografias_criterio: 'segmento (LTM jun-26)',
    kpis: [
      { kpi: 'Pedidos orgánicos (sistemas y servicios)', valor_anterior: '+39 % (1T26)', valor_actual: '+27 % (3T26)', variacion: 'Américas +37 %', comentario: 'Centros de datos y otros edificios críticos; desde el 1T26 los pedidos incluyen equipos sueltos de proyectos largos [3, 5].' },
      { kpi: 'Cartera de pedidos', valor_anterior: '14.900 M USD (sep-25)', valor_actual: '21.000 M USD (jun-26)', variacion: '+32 % orgánico interanual', comentario: 'Récord; Américas 15.900 M (+40 %) [3, 6].' },
      { kpi: 'Margen EBITA ajustado de los segmentos', valor_anterior: '17,6 % (3T25)', valor_actual: '19,8 % (3T26)', variacion: '+220 pb', comentario: 'Américas 21,1 % (+260 pb) por apalancamiento operativo [3].' },
      { kpi: 'Centros de datos (% de ventas)', valor_anterior: '≈ un 10-12 % (2025, prensa)', valor_actual: '«high teens» (guía 2026)', variacion: 'Objetivo: un tercio en 3-5 años', comentario: 'Dicho por la dirección en la conferencia del 3T26 [8].' },
      { kpi: 'Conversión de caja libre ajustada', valor_anterior: '108 % (9M25)', valor_actual: '98 % (9M26)', variacion: '−10 puntos', comentario: 'Guía de ≈100 % para 2026 [3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 24995, ebitda: 3766, ebit: 2991, beneficio_neto: 2180, bpa: 3.55, dpa: 1.57, dpa_extraordinario: 0, fcf: 3167, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -244 },
    cambios_perimetro: [
      { fecha: '2025-07-31', tipo: 'Venta', descripcion: 'Venta del negocio residencial y comercial ligero (incluida la sociedad conjunta con Hitachi) a Bosch por ≈8.100 M USD; reexpresado como operaciones interrumpidas en todos los ejercicios presentados [6, 1].', ingresos_anuales: null },
      { fecha: '2024-2026', tipo: 'Venta', descripcion: 'Ventas de Air Distribution Technologies (2024), ADT México, ADTi y negocios residenciales de seguridad (en curso) [3, 6].', ingresos_anuales: null },
      { fecha: '2026-05-13', tipo: 'Compra', descripcion: 'Compra de Alloy Enterprises (refrigeración líquida directa al chip); 291 M USD en compras en el 3T26 [3].', ingresos_anuales: null },
    ],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 6248, crecimiento_pct: 6.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.11, vs_consenso: null },
      { periodo: '1T25', ingresos: 5426, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.64, vs_consenso: null },
      { periodo: '2T25', ingresos: 5676, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.82, vs_consenso: null },
      { periodo: '3T25', ingresos: 6052, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.05, vs_consenso: null },
      { periodo: '4T25', ingresos: 6442, crecimiento_pct: 3.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.26, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 5797, crecimiento_pct: 6.8, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: 0.89, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 6142, crecimiento_pct: 8.2, crecimiento_organico_pct: 6, ebitda: null, margen_ebitda_pct: null, bpa: 1.19, vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 6614, crecimiento_pct: 9.3, crecimiento_organico_pct: 10, ebitda: 1150, margen_ebitda_pct: 17.4, bpa: 1.42, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico,
    vencimientos: [],
    liquidez: 'Caja de 641 M USD a 30-jun-2026; deuda bruta de 9.475 M (865 M de papel comercial y deuda a corto, 311 M de vencimientos corrientes y 8.299 M a largo, con bonos en USD y EUR hasta 2064); deuda neta de 1,9 veces el EBITDA ajustado según la empresa, por debajo de su objetivo [3, 8].',
    rating: null,
    coste_deuda_pct: null, vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 30-sep-2025)', confianza: 'Media' },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'ejercicios 2016-2021 en el perímetro actual', tipo: 'Complemento', intentos: '1) XBRL: 2016-2021 publicados con el residencial, Power Solutions y otras divisiones; 2) 10-K 2025 solo reexpresa 2023-2025; 3) notas de resultados de 2022-2024 sin reexpresar', decision: 'Se usan 2022-2025 (perímetro de operaciones continuadas); 2022 con gastos por intereses en lugar de cargos financieros netos' },
    { seccion: 'trimestres', campo: 'EBITDA trimestral y crecimiento de 1T25-3T25', tipo: 'Complemento', intentos: '1) Notas de resultados (dan EBIT y EBITA, no amortización trimestral salvo en flujos); 2) 10-Q no descargados; 3) prensa', decision: 'Omitido salvo el 3T26' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: negocio, productos (York, Metasys, Tyco, Silent-Aire), competencia y estacionalidad', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-14', url: `${E8}/000083344425000097/jci-20250930.htm` },
  { id: 2, titulo: 'HVAC System Market worth $407.77 billion by 2030 (≈299.000 M USD en 2025, +6,4 % anual)', editor: 'MarketsandMarkets (vía Webull)', tipo: 'Sectorial', fecha: '2025', url: 'https://www.webull.com/news/13414319103181824' },
  { id: 3, titulo: 'HVAC market to reach USD 382.66 billion by 2030 (Grand View Research)', editor: 'Refindustry', tipo: 'Sectorial', fecha: '2025', url: 'https://refindustry.com/news/market-research/hvac-market-to-reach-usd-382-66-billion-by-2030/' },
  { id: 4, titulo: 'Ficha sectorial de climatización y control de edificios y comparables de Yahoo Finance del 14-oct-2026 (sectores/climatizacion-hvac-2026-10-14)', editor: 'Repositorio (Yahoo Finance)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/JCI/' },
  { id: 5, titulo: 'Is Nvidia disrupting HVAC? Johnson Controls, Trane shares dip amid cooling shift', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-01-06', url: 'https://www.investing.com/news/stock-market-news/is-nvidia-disrupting-hvac-johnson-controls-trane--shares-dip-amid-cooling-shift-4432573' },
  { id: 6, titulo: 'Johnson Controls completes acquisition of Alloy Enterprises', editor: 'Johnson Controls', tipo: 'Primaria', fecha: '2026-05-13', url: 'https://www.johnsoncontrols.com/media-center/news/press-releases/2026/05/13/johnson-controls-completes-acquisition-of-alloy-enterprises' },
  { id: 7, titulo: 'Johnson Controls (JCI) Q3 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.webull.com/news/15364304602866688' },
  { id: 8, titulo: 'Johnson Controls Reports Strong Q3 Results; Raises FY26 Guidance (8-K, anexo 99.1)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000083344426000083/q3ex991xq3fy26earningsrele.htm` },
  { id: 9, titulo: 'Johnson Controls Reports Q4 and FY25 Results (venta del residencial a Bosch)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-05', url: `${E8}/000083344425000084/q4exh991xq4fy25earningsrel.htm` },
];
const B = {
  _estado: 'Completo. Tamaño de mercado de climatización con dos fuentes (MarketsandMarkets y Grand View); competidores y márgenes de Yahoo Finance del 14-oct-2026 (ficha sectorial).',
  historia: {
    hitos: [
      { anio: '1885', hito: 'Warren Johnson funda Johnson Electric Service en Milwaukee tras patentar el termostato eléctrico [1].' },
      { anio: '2016', hito: 'Fusión con Tyco International (incendios y seguridad); la sede pasa a Cork (Irlanda) [1].' },
      { anio: '2019', hito: 'Vende Power Solutions (baterías) a Brookfield por 13.200 M USD y recompra acciones [1].' },
      { anio: '2021', hito: 'Compra Silent-Aire (unidades de aire a medida para centros de datos) [1].' },
      { anio: '2025', hito: 'Joakim Weidemanis (ex-Danaher) es consejero delegado desde marzo; vende el negocio residencial a Bosch (julio) y lanza una recompra acelerada de 5.000 M USD [9].' },
      { anio: '2026', hito: 'Compra Alloy Enterprises (refrigeración líquida); cartera récord de 21.000 M USD y guía subida tres veces [6, 8].' },
    ],
    confianza: 'Media',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈299.000 M USD en 2025 (climatización, equipos y servicio, mundial) [2]; Grand View Research da ≈259.000 M [3]',
    unidad_serie: 'miles de millones de USD (MarketsandMarkets; 2026-2030 previsión)',
    serie: [{ anio: '2025', tamano: 299 }, { anio: '2026e', tamano: 318 }, { anio: '2027e', tamano: 338 }, { anio: '2028e', tamano: 360 }, { anio: '2029e', tamano: 383 }, { anio: '2030e', tamano: 408 }],
    tcac_historico_pct: null, tcac_previsto_pct: 6.4,
    cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    competidores: [
      { nombre: 'Trane Technologies', pais: 'Irlanda/EE. UU.', ticker: 'TT', ingresos: 21322, cuota_pct: 7.1, margen_ebit_pct: null, comentario: 'Líder en enfriadoras comerciales de Norteamérica; compró Stellar Energy y LiquidStack para centros de datos; margen EBITDA 19,5 %, ROIC 24 % [4].' },
      { nombre: 'Carrier Global', pais: 'EE. UU.', ticker: 'CARR', ingresos: 22059, cuota_pct: null, margen_ebit_pct: null, comentario: 'Más residencial y Europa (Viessmann); margen EBITDA 13,9 %, ROIC 6 % [4].' },
      { nombre: 'Daikin Industries', pais: 'Japón', ticker: '6367', ingresos: 31599, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor fabricante mundial de climatización; fuerte en residencial y aplicada (McQuay); margen EBITDA 14,3 % [4].' },
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 11471, cuota_pct: null, margen_ebit_pct: null, comentario: 'Especialista en potencia y frío de centros de datos; rival directo en unidades de distribución de refrigerante (CDU) [4].' },
      { nombre: 'Siemens (Smart Infrastructure)', pais: 'Alemania', ticker: 'SIE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en control de edificios, incendios y seguridad [4].' },
      { nombre: 'Honeywell (Building Automation)', pais: 'EE. UU.', ticker: 'HON', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en control de edificios y seguridad [1].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota de mercado de Johnson Controls', tipo: 'Complemento', intentos: '1) 10-K (no la publica); 2) MarketsandMarkets y Grand View (sin cuotas públicas); 3) ficha sectorial (solo Trane)', decision: 'Omitido: su perímetro (climatización + controles + incendios y seguridad) no casa con un solo mercado publicado' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) proxy 2026 (no las cita); 2) MSCI y Sustainalytics (de pago); 3) informe de sostenibilidad (no leído por tiempo)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de 2025, accionistas de más del 5 %', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-16', url: 'https://www.sec.gov/Archives/edgar/data/833444/000110465926004565/tm2524665-5_def14a.htm' },
  { id: 2, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000833444&type=4' },
  { id: 3, titulo: 'Form 8-K del 13-may-2026: programa de opciones «Value Growth Incentive» 2026-2030', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-13', url: `${E8}/000083344426000058/jci-20260511.htm` },
  { id: 4, titulo: 'Form 8-K del 4-may-2026 (salida de Lei Schlitz) y del 30-sep-2026 (salida de Julie Brandt)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-30', url: `${E8}/000083344426000098/jci-20260925.htm` },
  { id: 5, titulo: 'Form 8-K del 3-jun-2026: nombramiento de Irene Esteves como consejera', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-03', url: `${E8}/000083344426000064/a8-k2026x06x03ex991.htm` },
  { id: 6, titulo: 'Notas de resultados del 4T25 al 3T26 con la guía anual (8-K, anexo 99.1)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000083344426000083/q3ex991xq3fy26earningsrele.htm` },
  { id: 7, titulo: 'Resultados del 4T de 2020, 2021, 2022 y 2024 (BPA ajustado anual y guías)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2024-11-06', url: `${E8}/000083344424000060/q4exh991xq4fy24earningsrel.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'Completo. Proxy de 2026, 8-K de 2026 y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Joakim Weidemanis', cargo: 'Consejero delegado', desde: '2025', participacion_pct: null, trayectoria: 'Consejero delegado desde marzo de 2025; antes 25 años en Danaher (vicepresidente ejecutivo de diagnóstico, Leica). Implanta un «sistema de negocio» propio al estilo del Danaher Business System; con él la guía de 2026 ha subido de 4,55 a 5,05 USD de BPA ajustado [1, 6].' },
      { nombre: 'Marc Vandiepenbeeck', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2025', participacion_pct: null, trayectoria: 'En la empresa desde 2001 (Tyco); director financiero desde 2025 [1].' },
      { nombre: 'Chris Scalia', cargo: 'Director de personas', desde: '2025', participacion_pct: null, trayectoria: 'Beneficiario del programa de opciones de 2026 (5,3 M USD de valor objetivo) [3].' },
      { nombre: 'Todd Grabowski', cargo: 'Presidente de Américas', desde: '2025', participacion_pct: null, trayectoria: 'Dirige el segmento que hace dos tercios de las ventas [2].' },
    ],
    historial_guidance: [
      { anio: '2021', guia: 'BPA ajustado 2,58-2,64 USD (aprox., guía inicial) [7]', real: 'BPA ajustado 2,65 [7]', cumplida: 'Sí' },
      { anio: '2022', guia: 'BPA ajustado ≈3,22-3,28 (guía inicial, prensa)', real: 'BPA ajustado 3,00 [7]', cumplida: 'No' },
      { anio: '2024', guia: 'BPA ajustado 3,60-3,75 (guía de enero) [7]', real: 'BPA ajustado 3,71 [7]', cumplida: 'Sí' },
      { anio: '2025', guia: 'BPA ajustado de operaciones continuadas 3,40-3,50 [7]', real: 'BPA ajustado 3,76 [6]', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado ≈4,55 (nov-25), subida a ≈4,85 (may-26) y ≈5,05 (jul-26) [6]', real: 'En curso: 3,50 en 9 meses', cumplida: 'Parcial' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Mark Vergnano', 'Presidente no ejecutivo del consejo', 'Independiente', '2016', 'Ejecutiva'),
      cons('Joakim Weidemanis', 'Consejero delegado', 'Ejecutivo', '2025', null),
      cons('Timothy M. Archer', 'Consejero', 'Independiente', '2024', 'Remuneración'),
      cons('Jean Blackwell', 'Consejera', 'Independiente', '2018', 'Gobierno (presidenta)'),
      cons('Pierre Cohade', 'Consejero', 'Independiente', '2018', null),
      cons('W. Roy Dunbar', 'Consejero', 'Independiente', '2017', null),
      cons('Gretchen R. Haggerty', 'Consejera', 'Independiente', '2018', 'Auditoría (presidenta)'),
      cons('Ayesha Khanna', 'Consejera', 'Independiente', '2023', null),
      cons('Seetarama (Swamy) Kotagiri', 'Consejero', 'Independiente', '2024', null),
      cons('Jürgen Tinggren', 'Consejero', 'Independiente', '2014', null),
      cons('John D. Young', 'Consejero', 'Independiente', '2017', 'Remuneración (presidente)'),
      cons('Irene Esteves', 'Consejera', 'Independiente', '2026', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 4,
    voto_remuneracion_pct: 92, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 19.96, fijo: null, variable_corto: null, variable_largo: 16.60, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.2, tipo: 'Institucional', variacion: 'Notificación de abril de 2025' },
      { nombre: 'Dodge & Cox', pct: 10.0, tipo: 'Institucional', variacion: 'Notificación de noviembre de 2025' },
      { nombre: 'BlackRock, Inc.', pct: 7.1, tipo: 'Institucional', variacion: 'Notificación de noviembre de 2025' },
    ],
    insiders: [
      { fecha: '2026-08-04', persona: 'Lei Schlitz (presidenta de productos y soluciones, de salida)', operacion: 'Venta', acciones: 23417, importe: 3.58 },
      { fecha: '2026-05-08', persona: 'Lei Schlitz', operacion: 'Venta', acciones: 87909, importe: 12.39 },
      { fecha: '2025-12-10', persona: 'John Donofrio (director jurídico)', operacion: 'Venta', acciones: 21595, importe: 2.51 },
      { fecha: '2026-02-05', persona: 'Mark Vergnano (presidente del consejo)', operacion: 'Compra', acciones: 7665, importe: 1.01 },
      { fecha: '2026-02-06', persona: 'Todd Grabowski (presidente de Américas)', operacion: 'Venta', acciones: 5000, importe: 0.67 },
      { fecha: '2026-08-19', persona: 'Pierre Cohade (consejero)', operacion: 'Venta', acciones: 3300, importe: 0.49 },
    ],
    alertas: [
      'Cúpula renovada en 18 meses: nuevo consejero delegado (marzo de 2025), nuevo director financiero y salida de los presidentes de productos y soluciones (Lei Schlitz) y de operaciones comerciales y de campo (Julie Brandt) por el cambio de modelo operativo [4].',
      'Programa de opciones «Value Growth Incentive» (mayo de 2026): opciones que solo valen si las ventas y la capitalización suben mucho en 2026-2030; incentiva crecer y subir el precio, con riesgo de compras caras para llegar al objetivo de ventas [3].',
      'Ventas de directivos por 26,2 M USD en 12 meses, sin plan 10b5-1 declarado (21,0 M de la directiva que sale); una sola compra, del presidente del consejo (1,0 M en febrero) [2].',
      'Litigios de espumas contra incendios (AFFF, filial Tyco Fire Products): acuerdo de 750 M USD con los sistemas públicos de agua en 2024; quedan demandas de lesiones personales [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'ratio de remuneración con el empleado mediano y desglose fijo/variable', tipo: 'Complemento', intentos: '1) proxy 2026, tabla resumen (formato de imagen sin texto extraíble); 2) sección CEO Pay Ratio (texto sin la cifra en la extracción); 3) Pay versus Performance (solo total)', decision: 'Se da el total y el variable a largo plazo' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de JCI, ^GSPC y XLI (herramientas/bolsa.mjs y movimiento.mjs), hasta el 15-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/JCI/history/' },
  { id: 2, titulo: 'Consenso de BPA y ventas 2026-2027, recomendaciones, precio objetivo y cambios de recomendación (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/JCI/analysis/' },
  { id: 3, titulo: 'JCI stock forecast y estadísticas (acciones 605,74 M, posición corta 1,5 %, objetivo medio 168,5 USD)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/jci/forecast/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'DGS10: bono del Tesoro de EE. UU. a 10 años, 13-oct-2026 (5,21 %)', editor: 'FRED, Banco de la Reserva Federal de St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Comparables de climatización y control de edificios (capitalización, EV/EBITDA, PER adelantado, márgenes, ROIC) del 14-oct-2026', editor: 'Yahoo Finance (sectores/climatizacion-hvac-2026-10-14-comparables.json)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal (9.500 M USD, 22,5 veces el EBITDA ajustado 2026e)', editor: 'Eaton / Business Wire', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/Eaton-Signs-Agreement-to-Acquire-Boyd-Thermal-Expanding-Solutions-for-Data-Center-Customers-to-Include-Critical-Liquid-Cooling-Technology' },
  { id: 8, titulo: 'Carrier Global, Form 10-K 2024 (contraprestación de Viessmann Climate Solutions: 14.200 M USD)', editor: 'Carrier Global / SEC EDGAR', tipo: 'Primaria', fecha: '2025-02', url: 'https://www.sec.gov/Archives/edgar/data/1783180/000178318025000008/Financial_Report.xlsx' },
  { id: 9, titulo: 'Is Carrier Corporation Making a Huge Mistake? (EBITDA 2023 de Viessmann ≈770 M USD)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2023-05-01', url: 'https://www.fool.com/investing/2023/05/01/is-carrier-corporation-making-a-huge-mistake' },
  { id: 10, titulo: 'Johnson Controls Announces Fourth Quarter 2026 Earnings Conference Call Webcast (27-oct-2026)', editor: 'Johnson Controls', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://www.johnsoncontrols.com/media-center/news/press-releases/2026/10/01/johnson-controls-announces-fourth-quarter-2026-earnings-conference-call-webcast' },
  { id: 11, titulo: 'Is Nvidia disrupting HVAC? Johnson Controls, Trane shares dip amid cooling shift', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-01-06', url: 'https://www.investing.com/news/stock-market-news/is-nvidia-disrupting-hvac-johnson-controls-trane--shares-dip-amid-cooling-shift-4432573' },
  { id: 12, titulo: 'HVAC stocks slide as rising Treasury yields hit AI infrastructure trade; Trane upgraded, Lennox and Carrier downgraded at Goldman Sachs', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/JCI' },
  { id: 13, titulo: 'Cotización intradía del 15-oct-2026 de JCI, TT, VRT, CARR y LII (movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/JCI/' },
  { id: 14, titulo: 'Resultados del 3T26 (8-K, anexo 99.1)', editor: 'Johnson Controls / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000083344426000083/q3ex991xq3fy26earningsrele.htm` },
  { id: 15, titulo: 'Stocktwits $JCI: Goldman añade JCI a su lista de convicción de EE. UU. (1-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-01', url: 'https://api.stocktwits.com/api/2/streams/symbol/JCI.json' },
];
const comps = [
  ['Trane Technologies', 'TT', 'IE', 102884, 4.76, 24.4, 26.5, 19.5, 24.2, 0.66, 3.4],
  ['Carrier Global', 'CARR', 'US', 44244, 2.47, 17.7, 16.2, 13.9, 6.1, 3.34, 4.4],
  ['Lennox International', 'LII', 'US', 11936, 2.49, 11.3, 13.3, 22.0, 34.0, 1.1, 6.2],
  ['Daikin Industries', '6367', 'JP', 37873, 1.23, 8.6, null, 14.3, 7.6, 0.22, 4.3],
  ['Vertiv', 'VRT', 'US', 84978, 7.51, 33.7, 24.0, 22.2, 24.2, 0.46, 3.4],
  ['Schneider Electric', 'SU', 'FR', 165936, 3.86, 18.5, 21.4, 20.9, 12.9, 1.51, 3.9],
  ['Siemens', 'SIE', 'DE', 234571, 3.07, 14.8, 21.2, 20.7, 8.9, 2.28, 5.6],
].map(([nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct]) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct: null, margen_ebitda_pct, roic_pct, dn_ebitda, fcf_yield_pct }));
const cierres = Object.fromEntries(BOLSA.cierres_ejercicio.map((c) => [c.anio.replace('FY', ''), c.precio_cierre]));
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (la sesión del 15-oct no había cerrado). Comparables de Yahoo del 14-oct (PER adelantado de consenso, ajustado, como el BPA ajustado de JCI).',
  identificacion: {
    nombre: 'Johnson Controls International plc', nombre_corto: 'Johnson Controls', ticker: 'JCI', isin: 'IE00BY7QL619', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Irlanda (sede); negocio principal en EE. UU.', pais_iso: 'IE', sector: 'Industria', industria: 'Productos de construcción (climatización, control de edificios, incendios y seguridad)', sede: 'Cork (Irlanda)', fundacion: '1885', empleados: 86876, web: 'https://www.johnsoncontrols.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 605.74, capitalizacion_publicada: 92340, free_float_pct: 99.5,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía del ejercicio 2026 (29-jul-2026, tercera subida): crecimiento orgánico ≈8 %, apalancamiento operativo del 45-50 %, BPA ajustado ≈5,05 USD y conversión de caja libre ajustada ≈100 %; para el 4T26, crecimiento orgánico del 9-10 % y BPA ajustado ≈1,55 [14]. Marco a medio plazo (Gemba Day, 1-jun-2026): crecimiento de un dígito alto, apalancamiento operativo de más del 30 % y BPA ajustado creciendo a dos dígitos. La guía de 2027 llegará con los resultados del 27-oct [10].',
    estimaciones: [
      { periodo: '2026e', ingresos: 25572, ebitda: null, ebit: null, bpa: 5.07, dpa: 1.60, fuente: 'Yahoo Finance, 22 analistas (BPA ajustado) [2]' },
      { periodo: '2027e', ingresos: 27669, ebitda: null, ebit: null, bpa: 6.11, dpa: null, fuente: 'Yahoo Finance, 22 analistas (BPA ajustado) [2]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: 12, mantener: 8, vender: 2, po_medio: 167.75, po_min: 129, po_max: 193 },
    revisiones: 'En 90 días el BPA de consenso de 2026 sube de 4,90 a 5,07 USD (+3,6 %) y el de 2027 de 5,76 a 6,11 (+6,0 %), detrás de las subidas de guía [2]. Los objetivos suben en octubre: Mizuho de 150 a 165 (Neutral, 15-oct), Citi de 157 a 170 (Neutral, 12-oct), Bank of America de 152 a 175 (Comprar, 8-oct), Wells Fargo inicia en Sobreponderar con 186 (25-sep); Goldman la añade a su lista de convicción (1-oct) [2, 15].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 2.0,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    beta: 1.28, volatilidad_pct: 30.6, max_drawdown_pct: -42.3, posicion_corta_pct: 1.5,
    comentario: 'La acción ha triplicado su precio desde el mínimo de 2023 (de 53 a 152 USD) y en tres años rinde un 43,5 % anual frente al 21,3 % del S&P 500 [1]. Lo explican tres cosas: la venta del residencial a Bosch y la recompra de 5.000 M (≈7 % menos de acciones), la llegada de Weidemanis con su sistema de gestión y la demanda de enfriadoras y unidades de aire para centros de datos, que ha llevado la cartera a 21.000 M [14]. En 2026 sube un 27 % con tres subidas de guía, con caídas de un día del 5-6 % cada vez que el mercado duda del frío de los centros de datos [1, 11].',
    contexto: {
      movimiento: { fecha: '2026-10-15', var_1m_pct: 2.6, var_3m_pct: 2.6, var_6m_pct: 4.8, var_12m_pct: 33.7, dist_max_52s_pct: -9.2, dist_min_52s_pct: 32.8, dist_max_historico_pct: -9.2, tendencia: 'alcista', volatilidad_60d_pct: 31, avisos: [] },
      movimientos_fuertes: [
        { periodo: '6-ene-2026', var_pct: -6.2, causa: 'Nvidia dijo en el CES que sus chips Vera Rubin se refrigerarían con agua templada sin enfriadoras; JCI, con los centros de datos en torno a un 10-12 % de las ventas, fue la más castigada del sector [11].', veredicto: 'no cambia', condicion: null },
        { periodo: '10-jun-2026', var_pct: -5.7, causa: 'Caída de un día sin noticia de la empresa encontrada, en una semana de rotación fuera de los valores de infraestructura de IA [1, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: '14-sep-2026', var_pct: -5.7, causa: 'Venta de los valores de infraestructura de IA por la subida del bono a 10 años; Trane cayó el mismo día; sin noticia propia. Es la mayor caída de un mes de los últimos seis (−10,0 % hasta el 15-sep) [1, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: 13.6, causa: 'Rebote de un mes hasta el 13-oct con subidas de objetivo de los analistas (Wells Fargo, Bank of America, Citi) y la entrada en la lista de convicción de Goldman [2, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: '15-oct-2026 (intradía)', var_pct: -5.4, causa: 'Caída de los valores de frío para centros de datos (Trane −4,9 %, Vertiv también a la baja) con el S&P 500 casi plano: movimiento del sector, sin noticia propia encontrada [13].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'Mizuho sube el objetivo de 150 a 165 USD (Neutral); Bernstein mantiene Comprar con 190 [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-01', tipo: 'recomendación', hecho: 'Goldman Sachs añade JCI a su lista de convicción de EE. UU.; Wells Fargo inicia en Sobreponderar con 186 USD (25-sep) [2, 15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'directivos', hecho: 'Sale Julie Brandt, presidenta de operaciones comerciales y de campo (8-K); en mayo salió Lei Schlitz, presidenta de productos, que vendió 21,0 M USD de acciones en 12 meses. Cambio de modelo operativo, no salida del consejero delegado ni del director financiero (Form 4 y 8-K de la SEC).', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'resultados', hecho: '3T26: ventas +9 % (+10 % orgánico), BPA ajustado 1,42 USD, pedidos +27 %, cartera 21.000 M (+32 %), guía de 2026 subida a ≈5,05 USD [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-29', tipo: 'fusión u oferta', hecho: 'Revisión estratégica en curso de negocios del grupo (venta de los negocios residenciales de seguridad) sin fecha; la dirección no da plazo [14].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-27', tipo: 'resultados', hecho: 'Resultados del 4T26 y guía de 2027 el 27-oct-2026 (consenso del trimestre: BPA ajustado 1,56 USD, ventas 7.000 M) [10, 2].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-27',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción sigue en tendencia alcista (3,6 % sobre la media de 200 sesiones con el precio de hoy) y un 9 % por debajo del máximo de 52 semanas. Sus caídas fuertes de 2026 vienen del sector (Nvidia y el frío de los centros de datos, tipos a largo, rotación fuera de la IA) y no de la empresa, que sube guía y bate pedidos. No hay colocaciones, ampliaciones, ofertas ni decisiones con fecha pendientes; las ventas de directivos son de una directiva que se marcha. Los resultados del 27-oct no retrasan la decisión (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2022', '2023', '2024', '2025'].map((y) => ({ anio: y, precio_cierre: cierres[y], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Media',
  },
  comparables: { empresas: comps, confianza: 'Media' },
  transacciones: {
    operaciones: [
      { fecha: '2025-11', objetivo: 'Boyd Thermal (refrigeración líquida)', comprador: 'Eaton', ev: 9500, ev_ventas: null, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: 'Múltiplo sobre EBITDA ajustado 2026e [7].' },
      { fecha: '2024-01', objetivo: 'Viessmann Climate Solutions', comprador: 'Carrier Global', ev: 14200, ev_ventas: null, ev_ebitda: 18.4, prima_pct: null, excluir: false, comentario: 'Contraprestación de 14.200 M del 10-K de Carrier sobre un EBITDA 2023 de ≈770 M (prensa); estimación propia [8, 9].' },
      { fecha: '2024-07', objetivo: 'Residencial y comercial ligero de Johnson Controls (con la sociedad conjunta con Hitachi)', comprador: 'Bosch', ev: 8100, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Venta de la propia empresa; múltiplo no publicado en los documentos leídos.' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones de 2028e y EBITDA de consenso', tipo: 'Complemento', intentos: '1) Yahoo Finance: solo 2026-2027; 2) Stock Analysis: 2028 de pago; 3) MarketScreener: no consultado por tiempo', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'EV/EBITDA NTM y crecimiento esperado de los comparables', tipo: 'Complemento', intentos: '1) Yahoo (solo LTM y PER adelantado); 2) ficha sectorial del 14-oct (igual); 3) informes del repositorio de Trane y Daikin (otra base)', decision: 'Omitido; se usa sobre todo el PER' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Johnson Controls: titulares y artículos de autores (RSS, mayo-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/JCI.xml' },
  { id: 2, titulo: 'Stream $JCI (30 mensajes, 29-jul a 14-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/JCI.json' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores) y Stocktwits.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 5, tono: 'Dividido', resumen: 'De «fuerte crecimiento por centros de datos, pero dudas técnicas» (rebaja de julio) y «la IA y la cartera sostienen un Mantener» (agosto) a «ser dueño de las partes difíciles del frío está dando fruto» (13-oct) [1].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-10', n_comentarios: 6, tono: 'Dividido', resumen: 'Titulares de caídas del sector por tipos y dudas sobre los centros de datos (29-jul, 18-ago) frente a las subidas de guía y de objetivos [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes alcistas de impulso: máximos de 52 semanas, lista de convicción de Goldman, «sigo con JCI» tras el 3T; casi ningún bajista [2].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
