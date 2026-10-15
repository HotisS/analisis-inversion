// Escribe las notas A-E de Check Point (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json, companyfacts),
// el 20-F 2025, los 6-K de resultados (3T25 a 2T26), el proxy de la junta de 2026, bolsa.mjs, form4.mjs,
// MarketScreener, Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1015922';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const ANIOS = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025 (cuentas auditadas; notas de ingresos por categoría y geografía, ingresos diferidos, impuestos, bonos convertibles, compras)', editor: 'Check Point Software Technologies Ltd. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000117891326001932/zk2634942.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025, amortización de intangibles, pagos en acciones, valores negociables', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001015922.json' },
  { id: 3, titulo: 'Check Point Software Reports 2026 Second Quarter Financial Results (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000117891326003696/zk2635799.htm` },
  { id: 4, titulo: 'Check Point Software Reports 2026 First Quarter Financial Results (6-K; nombramiento del nuevo director comercial)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${E8}/000117891326002310/a2635159.htm` },
  { id: 5, titulo: 'Check Point Software Reports Fourth Quarter and 2025 Full Year Results (6-K; efecto fiscal de 1,90 USD por acción, bonos convertibles, Lakera)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-12', url: `${E8}/000117891326000437/zk2634351.htm` },
  { id: 6, titulo: 'Check Point Software Reports 2025 Third Quarter Financial Results (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-28', url: `${E8}/000117891325003565/2533887.htm` },
  { id: 7, titulo: 'Form 20-F 2023 (ingresos por categoría 2022-2023)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2024-04-02', url: `${E8}/000117891324001196/zk2431186.htm` },
  { id: 8, titulo: 'Form 20-F 2021 (ingresos por categoría 2020-2021)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2022-04-14', url: `${E8}/000119312522105648/d238426d20f.htm` },
  { id: 9, titulo: 'Check Point (CHKP) Q2 2026 Earnings Call Transcript (guía del 3T, ARR de tecnologías emergentes +40 %, 300 comerciales nuevos)', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364638754350080' },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Amortización de intangibles comprados (XBRL AmortizationOfIntangibleAssets): el XBRL de cuentas.mjs solo trae la depreciación
const amortInt = { 2018: 4.4, 2019: 7.3, 2020: 8.2, 2021: 10.1, 2022: 13.5, 2023: 24.3, 2024: 59.6, 2025: 68.1 };
// Valores negociables (AFS corriente + no corriente, XBRL); 2024 y 2025: total publicado con los depósitos a corto (2.783,8 y 4.341,7)
const afs = { 2018: 1442.7 + 2287.3, 2019: 1300.1 + 2368.8, 2020: 1217.5 + 2311.9, 2021: 929.3 + 2089.7, 2022: 1010.5 + 1865.6, 2023: 939.8 + 1429.7 };
const cajaTotal = { 2024: 2783.8, 2025: 4341.7 };
// Ingresos diferidos corrientes y no corrientes (XBRL)
const diferidos = { 2018: 980.2 + 357.8, 2019: 1011.9 + 374.8, 2020: 1108.6 + 373.3, 2021: 1257.4 + 449.7, 2022: 1363.4 + 514.4, 2023: 1413.8 + 493.9, 2024: 1471.3 + 529.0, 2025: 1530.1 + 650.3 };
const opciones = { 2018: 353.6, 2019: 95.3, 2020: 216.8, 2021: 194.0, 2022: 141.2, 2023: 133.7, 2024: 258.6, 2025: 393.2 };
const retenciones = { 2018: 4.7, 2019: 6.0, 2020: 5.4, 2021: 6.9, 2022: 9.3, 2023: 11.0, 2024: 18.6, 2025: 20.9 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const am = r1(c.amortizaciones + amortInt[y]);
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: r1(c.ebit + am), amortizaciones: am, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: y === '2025' ? 0.1 : 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: 0, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: r1(diferidos[y]), caja: r1(cajaTotal[y] ?? b.caja + afs[y]), deuda_financiera: y === '2025' ? 1972.1 : 0, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: 0, dividendos: 0, recompras: r1(f.recompras + retenciones[y]), emision_acciones: opciones[y], intereses_en_financiacion: 0 };
});
const seg = (nombre, descripcion, serie) => ({ nombre, descripcion, tipo_resultado: null, historico: Object.entries(serie).map(([periodo, ingresos]) => ({ periodo, ingresos, resultado: null })) });
const A = {
  _estado: 'Completo. Cuentas 2018-2025 del XBRL de la SEC comprobadas con el 20-F 2025 y las notas de resultados; amortización de intangibles comprados sumada a la depreciación; LTM a junio de 2026 con el 6-K del 2T26.',
  negocio: {
    segmentos: [
      seg('Productos y licencias', 'Cortafuegos físicos (Quantum) y licencias perpetuas', { 2020: 513.6, 2021: 513.9, 2022: 554.9, 2023: 497.4, 2024: 507.9, 2025: 548.2 }),
      seg('Suscripciones de seguridad', 'Servicios de prevención de amenazas, Harmony (correo, puesto, SASE), CloudGuard, gestión de exposición e IA', { 2020: 671.1, 2021: 755.2, 2022: 858.0, 2023: 981.2, 2024: 1104.2, 2025: 1219.0 }),
      seg('Actualizaciones, mantenimiento y servicios', 'Soporte y actualizaciones de la base instalada', { 2020: 880.2, 2021: 897.7, 2022: 917.0, 2023: 936.1, 2024: 952.9, 2025: 958.2 }),
    ],
    geografias: [{ nombre: 'Europa, Oriente Medio y África', peso_pct: 43.1 }, { nombre: 'América (sobre todo EE. UU.)', peso_pct: 41.9 }, { nombre: 'Asia-Pacífico', peso_pct: 12.3 }, { nombre: 'Israel', peso_pct: 2.7 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ingresos por suscripciones de seguridad (2T)', valor_anterior: '297,9 M USD (2T25)', valor_actual: '332,6 M USD (2T26)', variacion: '+12 %', comentario: 'El 49 % de los ingresos del trimestre; +11 % en el 1T26 [3, 4].' },
      { kpi: 'Ingresos por productos y licencias (2T)', valor_anterior: '131,9 M USD', valor_actual: '113,4 M USD', variacion: '−14 %', comentario: 'Caída de la demanda de cortafuegos físicos y desorden comercial tras los cambios de enero [3, 9].' },
      { kpi: 'Obligaciones de desempeño pendientes (RPO)', valor_anterior: '≈2.430 M USD (jun-25)', valor_actual: '2.600 M USD (jun-26)', variacion: '+7 %', comentario: 'La parte corriente, 1.600 M (+4 %) [3, 9].' },
      { kpi: 'Facturación calculada (2T)', valor_anterior: '≈639 M USD', valor_actual: '639 M USD', variacion: '≈0 %', comentario: 'Un contrato grande pasó a facturación trimestral (−2 puntos) [9]. En 2025, 2.906 M (+9 %) [5].' },
      { kpi: 'ARR de tecnologías emergentes (correo, CTEM, IA)', valor_anterior: 'n.d.', valor_actual: '+40 % interanual', variacion: '>+40 %', comentario: 'Su facturación calculada +35 % [9]; la empresa no da el importe.' },
      { kpi: 'Pagos en acciones (% de ingresos)', valor_anterior: '5,8 % (2024)', valor_actual: '7,5 % (2025); 8,6 % (1S26)', variacion: '+1,7 puntos', comentario: '205,6 M USD en 2025 y 115,7 M en el 1S26 [2, 3].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2764.4, ebitda: 884.2, ebit: 802.2, beneficio_neto: 1048.6, bpa: 9.75, dpa: 0, dpa_extraordinario: 0, fcf: 1099.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 635.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 237.1, margen_ebitda_pct: 37.3, bpa: 1.83, vs_consenso: null },
      { periodo: '4T24', ingresos: 703.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 279.8, margen_ebitda_pct: 39.8, bpa: 2.30, vs_consenso: null },
      { periodo: '1T25', ingresos: 637.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 219.9, margen_ebitda_pct: 34.5, bpa: 1.72, vs_consenso: null },
      { periodo: '2T25', ingresos: 665.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 228.9, margen_ebitda_pct: 34.4, bpa: 1.84, vs_consenso: null },
      { periodo: '3T25', ingresos: 677.5, crecimiento_pct: 6.7, crecimiento_organico_pct: null, ebitda: 224.5, margen_ebitda_pct: 33.1, bpa: 3.28, vs_consenso: null },
      { periodo: '4T25', ingresos: 744.9, crecimiento_pct: 5.9, crecimiento_organico_pct: null, ebitda: 250.7, margen_ebitda_pct: 33.7, bpa: 2.81, vs_consenso: null },
      { periodo: '1T26', ingresos: 668.4, crecimiento_pct: 4.8, crecimiento_organico_pct: null, ebitda: 204.6, margen_ebitda_pct: 30.6, bpa: 1.81, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 673.6, crecimiento_pct: 1.3, crecimiento_organico_pct: null, ebitda: 204.4, margen_ebitda_pct: 30.3, bpa: 1.87, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2030', importe: 2000 }],
    liquidez: 'Caja y equivalentes 596,3 M USD + valores negociables y depósitos a corto 1.683,2 M y a largo 1.923,9 M = 4.203,4 M USD a 30-jun-2026 [3]; deuda: 2.000 M de bonos convertibles al 0 % con vencimiento en 2030 (precio de conversión ≈243,65 USD; opción de compra con techo de 334,43 USD) [1].',
    rating: 'Sin rating',
    coste_deuda_pct: 0, vida_media_anios: 4.2,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Kost Forer Gabbay & Kasierer (EY)', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a 31-dic-2025)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento interanual de 3T24 a 2T25', tipo: 'Complemento', intentos: '1) 6-K del 3T25 al 2T26 (solo dan el trimestre del año anterior); 2) 6-K de 2024 no descargados por tiempo; 3) XBRL (los 6-K no llevan XBRL)', decision: 'Omitido' },
    { seccion: 'calidad', campo: 'años con el mismo auditor', tipo: 'Complemento', intentos: '1) 20-F 2025 (informe del auditor sin año de inicio); 2) proxy 2026 (ratificación anual); 3) búsqueda web sin dato primario', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 20-F 2025: Item 4 (negocio, cuatro pilares, competencia, campus de Tel Aviv, compras de Veriti, Lakera, Cyata y Cyclops)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000117891326001932/zk2634942.htm` },
  { id: 2, titulo: 'Network Security Market worth $119.70 billion by 2030 (84.500 M USD en 2025, +7,2 % anual)', editor: 'MarketsandMarkets (vía Webull)', tipo: 'Sectorial', fecha: '2025-12', url: 'https://www.webull.com/news/13974887571629056' },
  { id: 3, titulo: 'Firewall market forecast: +8 % anual hasta 2029 y más de 20.000 M USD en 2030', editor: "Dell'Oro Group (vía cnhinews)", tipo: 'Sectorial', fecha: '2025-01', url: 'https://www.cnhinews.com/news/article_a60731b4-a38b-55b0-90a0-30be19e7f74b.html' },
  { id: 4, titulo: 'Estadísticas de Fortinet, Palo Alto, CrowdStrike, Tenable, Rapid7 y Okta (cierre del 14-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ftnt/statistics/' },
  { id: 5, titulo: 'Check Point slides after reporting security vulnerability affecting remote access VPN', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://seekingalpha.com/api/sa/combined/CHKP.xml' },
  { id: 6, titulo: 'Form 6-K: vulnerabilidad del VPN de acceso remoto (accesos no autorizados a entornos de clientes)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-08', url: `${E8}/000117891326003128/zk2635514.htm` },
  { id: 7, titulo: 'Informe value de Qualys (gestión de vulnerabilidades, 15-oct-2026)', editor: 'Repositorio (informes/qualys-2026-10-15)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'https://github.com/' },
  { id: 8, titulo: 'Ficha sectorial de software (mapa del riesgo de IA)', editor: 'Repositorio (sectores/software-2026-10-14)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'https://github.com/' },
  { id: 9, titulo: 'Check Point (CHKP) Q2 2026 Earnings Call Transcript', editor: 'The Motley Fool (vía Webull)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364638754350080' },
  { id: 10, titulo: 'SEC charges four companies with misleading cyber disclosures (Unisys, Avaya, Check Point y Mimecast; Check Point 995.000 USD)', editor: 'U.S. Securities and Exchange Commission', tipo: 'Primaria', fecha: '2024-10-22', url: 'https://www.sec.gov/newsroom/press-releases/2024-174' },
];
const B = {
  _estado: 'Completo. Tamaño de mercado con dos fuentes (MarketsandMarkets para seguridad de red; Dell\'Oro para cortafuegos); competidores con Stock Analysis a 14-oct.',
  historia: {
    hitos: [
      { anio: '1993', hito: 'Gil Shwed, Marius Nacht y Shlomo Kramer fundan Check Point en Israel; FireWall-1 populariza la inspección con estado [1].' },
      { anio: '1996', hito: 'Salida a bolsa en el Nasdaq (CHKP) [1].' },
      { anio: '2015', hito: 'Primeros años de recompra continua de ≈1.000 M USD anuales; desde el inicio del programa ha recomprado ≈230 M de acciones por ≈17.400 M USD [1].' },
      { anio: '2021-2024', hito: 'Compras de Avanan (correo), Spectral, Perimeter 81 (SASE, 503 M USD en 2023), Atmosec y Cyberint (2024) para salir del cortafuegos [1].' },
      { anio: '2024', hito: 'Diciembre: Nadav Zafrir (fundador de Team8 y del Mando Ciberespacial israelí) sustituye a Gil Shwed como consejero delegado; Shwed pasa a presidente ejecutivo [1].' },
      { anio: '2025', hito: 'Compra Veriti (junio) y Lakera (octubre, ≈190 M USD); emite 2.000 M USD en convertibles al 0 % y gana con Israel Canada el concurso de un solar junto a su sede para un campus que terminará en 2032 [1].' },
      { anio: '2026', hito: 'Cambios comerciales en enero que hunden la venta de cortafuegos (−14 % en el 2T); rebaja de la guía de ingresos el 30-abr (−19,6 % en bolsa); vulnerabilidad del VPN en junio; compra Cyata, Cyclops y Rotate [1, 5, 6].' },
    ],
    confianza: 'Alta',
  },
  negocio: { confianza: 'Alta' },
  sector: {
    tamano: '≈84.500 M USD en 2025 (seguridad de red, mundial) [2]; dentro, el cortafuegos crece ≈8 % anual y superará 20.000 M en 2030 [3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 84500 }, { anio: '2026e', tamano: 90580 }, { anio: '2027e', tamano: 97110 }, { anio: '2028e', tamano: 104100 }, { anio: '2029e', tamano: 111600 }, { anio: '2030e', tamano: 119700 }],
    tcac_historico_pct: null, tcac_previsto_pct: 7.2,
    cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 3.2,
    competidores: [
      { nombre: 'Palo Alto Networks', pais: 'EE. UU.', ticker: 'PANW', ingresos: 11480, cuota_pct: null, margen_ebit_pct: 7.1, comentario: 'Líder en cortafuegos de nueva generación, SASE (Prisma) y operaciones (Cortex); consolida plataformas comprando [4].' },
      { nombre: 'Fortinet', pais: 'EE. UU.', ticker: 'FTNT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en unidades de cortafuegos con chips propios (coste bajo); el rival directo en la renovación de equipos de 2025-2027 [4].' },
      { nombre: 'Cisco (seguridad)', pais: 'EE. UU.', ticker: 'CSCO', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cortafuegos y Splunk; compite por el presupuesto de red de las grandes empresas.' },
      { nombre: 'Zscaler', pais: 'EE. UU.', ticker: 'ZS', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Seguridad desde la nube (SSE) que sustituye parte del cortafuegos perimetral.' },
      { nombre: 'CrowdStrike', pais: 'EE. UU.', ticker: 'CRWD', ingresos: 5400, cuota_pct: null, margen_ebit_pct: -2.5, comentario: 'Puesto de trabajo, identidad y gestión de exposición; compite con Harmony [4].' },
      { nombre: 'Microsoft (Defender)', pais: 'EE. UU.', ticker: 'MSFT', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Seguridad del correo y del puesto incluida en las licencias E5: presión de precio sobre Harmony Email.' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'CR5 y cuotas de seguridad de red', tipo: 'Complemento', intentos: "1) MarketsandMarkets (nota pública sin cuotas); 2) Dell'Oro e IDC (de pago); 3) prensa (sin cifra fiable)", decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) 20-F (sin calificaciones); 2) MSCI ESG Ratings (requiere JavaScript); 3) Sustainalytics (sin acceso)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025: Item 6 (consejo, comisiones, remuneración de 2025, participaciones) e Item 16G', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000117891326001932/zk2634942.htm` },
  { id: 2, titulo: 'Proxy statement de la junta del 2-sep-2026 (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-22', url: `${E8}/000117891326003557/zk2635717.htm` },
  { id: 3, titulo: 'Resultados de la junta de 2026: aprobadas las cinco propuestas, 79,52 % del capital presente (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-02', url: `${E8}/000117891326004398/exhibit_99-1.htm` },
  { id: 4, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001015922&type=4' },
  { id: 5, titulo: 'Ampliación de 2.000 M USD del programa de recompra (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-11', url: `${E8}/000117891326002519/exhibit_99-1.htm` },
  { id: 6, titulo: 'Nombramiento de Yoram Tietz como consejero (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-14', url: `${E8}/000117891326004498/zk2636110.htm` },
  { id: 7, titulo: 'Cybersecurity firm Check Point first-quarter profit beats estimates, cuts 2026 revenue outlook (guía 2.770-2.850 M USD desde 2.830-2.950 M; BPA ajustado 10,05-10,85)', editor: 'Reuters (vía Yahoo Finance)', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://finance.yahoo.com/markets/stocks/articles/cybersecurity-firm-check-point-software-140729881.html' },
  { id: 8, titulo: 'Check Point Software Reports 2026 First Quarter Financial Results (cambio de director comercial)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${E8}/000117891326002310/a2635159.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const ventas = [
  { fecha: '2026-08-04', persona: 'Sherif Seddik (director comercial)', operacion: 'Venta', acciones: 10272, importe: 1.27 },
  { fecha: '2026-08-03', persona: 'Roei Golan (director financiero)', operacion: 'Venta', acciones: 9860, importe: 1.22 },
  { fecha: '2026-08-03', persona: 'Nataly Kremer (directora de producto)', operacion: 'Venta', acciones: 665, importe: 0.08 },
  { fecha: '2026-06-11', persona: 'Tal Shavit Shenhav (consejera)', operacion: 'Venta', acciones: 25000, importe: 3.08 },
  { fecha: '2026-06-11', persona: 'Jerry Ungerman (consejero)', operacion: 'Venta', acciones: 25000, importe: 3.06 },
  { fecha: '2026-06-02', persona: 'Yoav Chelouche (consejero coordinador)', operacion: 'Venta', acciones: 25000, importe: 3.51 },
];
const C = {
  _estado: 'Completo. 20-F 2025 (Item 6), proxy y resultados de la junta de 2026 y Form 4 de 12 meses (Check Point presenta Form 4 desde 2026).',
  directivos: {
    equipo: [
      { nombre: 'Nadav Zafrir', cargo: 'Consejero delegado', desde: '2024', participacion_pct: 0.04, trayectoria: 'Fundador de Team8 (capital riesgo en ciberseguridad) y del Mando Ciberespacial del ejército israelí; consejero delegado desde diciembre de 2024. En su primer año completo los ingresos crecieron un 6 % y en 2026 la reorganización comercial ha llevado a rebajar la guía [1, 7].' },
      { nombre: 'Gil Shwed', cargo: 'Fundador y presidente ejecutivo', desde: '1993', participacion_pct: 23.86, trayectoria: 'Fundador; consejero delegado de 1993 a 2024. Construyó un negocio con un 40 % de margen operativo ajustado y devolvió ≈17.400 M USD en recompras [1, 5].' },
      { nombre: 'Roei Golan', cargo: 'Director financiero', desde: '2024', participacion_pct: 0.01, trayectoria: 'En Check Point desde hace más de una década (finanzas y relación con inversores); director financiero desde 2024 [1].' },
      { nombre: 'Nataly Kremer', cargo: 'Directora de producto e I+D', desde: '2023', participacion_pct: 0.0, trayectoria: 'Lleva producto e investigación; el lanzamiento del cortafuegos de red para IA y el plano de defensa de IA de 2026 son su hoja de ruta [1].' },
      { nombre: 'Sherif Seddik', cargo: 'Director comercial', desde: '2026', participacion_pct: null, trayectoria: 'Presidente de ventas internacionales desde 2023; sustituye a Itai Greenberg el 1-may-2026 tras el mal 1T [8].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Ingresos 2.830-2.950 M USD y BPA ajustado 10,05-10,85 (febrero); rebaja a 2.770-2.850 M el 30-abr [7]', real: 'En curso: 1S26 1.342 M (+3,0 %); BPA ajustado 5,05', cumplida: 'No' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Gil Shwed', 'Presidente ejecutivo', 'Ejecutivo', '1993', null),
      cons('Nadav Zafrir', 'Consejero delegado', 'Ejecutivo', '2024', null),
      cons('Yoav Chelouche', 'Consejero coordinador independiente', 'Independiente', '2006', 'Auditoría, Remuneración, Nombramientos'),
      cons('Dafna Gruber', 'Consejera externa (ley israelí)', 'Independiente', '2021', 'Auditoría, Remuneración, Nombramientos'),
      cons('Tzipi Ozer-Armon', 'Consejera', 'Independiente', '2022', 'Auditoría, Remuneración, Nombramientos'),
      cons('Ray Rothrock', 'Consejero externo (ley israelí)', 'Independiente', '1995', 'Auditoría, Remuneración, Nombramientos'),
      cons('Tal Shavit Shenhav', 'Consejera', 'Independiente', '2000', 'Nombramientos'),
      cons('Jill Smith', 'Consejera', 'Independiente', '2022', 'Nombramientos'),
      cons('Jerry Ungerman', 'Consejero', 'Otro externo', '2005', null),
      cons('Yoram Tietz', 'Consejero', 'Independiente', '2026', null),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.53, fijo: 0.56, variable_corto: 0.43, variable_largo: 6.54, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Gil Shwed (fundador y presidente ejecutivo)', pct: 23.86, tipo: 'Fundador', variacion: 'Estable; sin ventas en 12 meses [4]' },
      { nombre: 'Massachusetts Financial Services (MFS)', pct: 7.61, tipo: 'Institucional', variacion: '13G/A de enero de 2026' },
      { nombre: 'Consejeros y directivos (12 personas)', pct: 25.43, tipo: 'Dirección', variacion: 'Ventas de 12,2 M USD en 12 meses, ninguna compra [4]' },
    ],
    insiders: ventas,
    alertas: [
      'Ventas de consejeros y directivos por 12,2 M USD en 12 meses, sin plan 10b5-1 declarado y ninguna compra; tres consejeros vendieron 25.000 acciones cada uno en junio, a 123-140 USD [4].',
      'Rotación comercial: el director comercial (Itai Greenberg) dejó el cargo el 1-may-2026 tras el 1T, en mitad de la reorganización de ventas [8].',
      'Vulnerabilidad del VPN de acceso remoto (junio de 2026) con accesos no autorizados a entornos de clientes: riesgo de reputación y de reclamaciones.',
      'Remuneración: el variable a largo plazo del consejero delegado son acciones restringidas y acciones por objetivos sin métricas de rentabilidad (ROIC o TSR) publicadas en el 20-F [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'porcentaje de votos en contra de la remuneración (2024-2026)', tipo: 'Complemento', intentos: '1) 6-K de la junta de 2026 (solo «aprobadas las cinco propuestas»); 2) 20-F (sin resultados de votaciones); 3) búsqueda en prensa israelí (sin cifra)', decision: 'Omitido' },
    { seccion: 'directivos', campo: 'guía anual de 2021-2025 frente a lo logrado', tipo: 'Complemento', intentos: '1) 6-K de resultados de febrero 2021-2025 (no descargados por tiempo); 2) 20-F (no recoge la guía); 3) prensa (cifras sin fuente primaria abierta)', decision: 'Omitido: solo 2026' },
    { seccion: 'gobierno', campo: 'ratio de remuneración del consejero delegado sobre el empleado medio', tipo: 'Complemento', intentos: '1) 20-F (no lo publica: emisor extranjero); 2) proxy 2026 (no lo publica); 3) cálculo con el coste de personal (no publicado por separado)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CHKP, SPY y CIBR (herramientas/bolsa.mjs), hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/CHKP/history' },
  { id: 2, titulo: 'Check Point Software Technologies Ltd.: Financial data, forecasts, estimates (consenso 2026-2028; EBITDA y EBIT ajustados, BPA GAAP; 38 analistas, objetivo medio 145,83 USD)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/CHECK-POINT-SOFTWARE-TECH-4858/finances/' },
  { id: 3, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Estadísticas de Tenable, Rapid7, CrowdStrike, Palo Alto, Fortinet y Okta (cierre del 14-oct-2026)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://stockanalysis.com/stocks/ftnt/statistics/' },
  { id: 6, titulo: 'Informe value de Qualys: múltiplos al cierre del 14-oct-2026', editor: 'Repositorio (informes/qualys-2026-10-15)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://github.com/' },
  { id: 7, titulo: 'Thoma Bravo to buy cybersecurity firm Darktrace for $5.3 billion', editor: 'Security Boulevard', tipo: 'Prensa', fecha: '2024-04-26', url: 'https://securityboulevard.com/2024/04/thoma-bravo-to-buy-cybersecurity-firm-darktrace-for-5-3-billion' },
  { id: 8, titulo: 'SailPoint, Tufin go private in run of cybersecurity acquisitions by PE firms (SailPoint a 16,0 veces ventas LTM)', editor: 'S&P Global Market Intelligence (451 Research)', tipo: 'Analistas', fecha: '2022-04', url: 'https://www.spglobal.com/market-intelligence/en/news-insights/articles/2022/4/sailpoint-tufin-go-private-in-run-of-cybersecurity-acquisitions-by-pe-firms-69703930' },
  { id: 9, titulo: 'Thoma Bravo acquires Proofpoint for approximately $12.3 billion', editor: 'PrivSource', tipo: 'Prensa', fecha: '2021-04', url: 'https://www.privsource.com/acquisitions/deal/thoma-bravo-acquires-proofpoint-for-approximately-12-3-billion-D8SWX5' },
  { id: 10, titulo: 'Check Point Software to announce 2026 third quarter financial results on November 2, 2026', editor: 'Finviz (nota de la empresa)', tipo: 'Primaria', fecha: '2026-10-01', url: 'https://finviz.com/news/397802/check-point-software-to-announce-2026-third-quarter-financial-results-on-november-2-2026' },
  { id: 11, titulo: 'Resultados de la junta de 2026: 81,2 M de acciones votadas = 79,52 % del capital en circulación (6-K)', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-02', url: `${E8}/000117891326004398/exhibit_99-1.htm` },
  { id: 12, titulo: 'Form 20-F 2025: términos de los convertibles al 0 % de 2030 (4,1042 acciones por 1.000 USD) y opción de compra con techo', editor: 'Check Point / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-31', url: `${E8}/000117891326001932/zk2634942.htm` },
];
const D = {
  _estado: 'Completo. Precio de bolsa.mjs: cierre del 14-oct (el del 15-oct no había cerrado). Comparables de Stock Analysis al cierre del 14-oct (PER adelantado casi todo en base ajustada).',
  identificacion: {
    nombre: 'Check Point Software Technologies Ltd.', nombre_corto: 'Check Point', ticker: 'CHKP', isin: 'IL0010824113', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500 / Nasdaq-100',
    pais: 'Israel', pais_iso: 'IL', sector: 'Tecnologías de la información', industria: 'Software de sistemas (ciberseguridad)', sede: 'Tel Aviv (Israel)', fundacion: '1993', empleados: 6825, web: 'https://www.checkpoint.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 102.6, capitalizacion_publicada: 13690, free_float_pct: 74.6,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M USD/día (3 meses)`, proximos_resultados: '2026-11-02',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 2802, ebitda: 1141, ebit: 1089, bpa: 7.72, dpa: 0, fuente: 'MarketScreener (38 analistas; EBITDA y EBIT ajustados, sin pagos en acciones ni amortización de compras; BPA GAAP) [2]' },
      { periodo: '2027e', ingresos: 2965, ebitda: 1193, ebit: 1149, bpa: 8.51, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 3123, ebitda: 1264, ebit: 1207, bpa: 9.91, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 38, comprar: null, mantener: null, vender: null, po_medio: 145.83, po_min: null, po_max: null },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 8.3,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      { nombre: 'Fortinet', ticker: 'FTNT', pais: 'US', capitalizacion: 135040, ev_ventas: 17.5, ev_ebitda_ltm: 50.7, ev_ebitda_ntm: null, per_ntm: 52.4, crecimiento_pct: null, margen_ebitda_pct: 34.5, roic_pct: 57.9, dn_ebitda: -1.35, fcf_yield_pct: 2.3 },
      { nombre: 'Palo Alto Networks', ticker: 'PANW', pais: 'US', capitalizacion: 306780, ev_ventas: 26.7, ev_ebitda_ltm: 196.3, ev_ebitda_ntm: null, per_ntm: 89.5, crecimiento_pct: null, margen_ebitda_pct: 13.6, roic_pct: 1.7, dn_ebitda: -0.3, fcf_yield_pct: 1.3 },
      { nombre: 'CrowdStrike', ticker: 'CRWD', pais: 'US', capitalizacion: 255800, ev_ventas: 46.6, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: 176.5, crecimiento_pct: null, margen_ebitda_pct: 2.0, roic_pct: -14.1, dn_ebitda: null, fcf_yield_pct: 0.6 },
      { nombre: 'Qualys', ticker: 'QLYS', pais: 'US', capitalizacion: 6580, ev_ventas: 8.36, ev_ebitda_ltm: 23.1, ev_ebitda_ntm: 21.6, per_ntm: 29.9, crecimiento_pct: 11.4, margen_ebitda_pct: 36.1, roic_pct: null, dn_ebitda: -2.8, fcf_yield_pct: 4.8 },
      { nombre: 'Tenable Holdings', ticker: 'TENB', pais: 'US', capitalizacion: 4200, ev_ventas: 4.14, ev_ebitda_ltm: 80.5, ev_ebitda_ntm: null, per_ntm: 18.6, crecimiento_pct: null, margen_ebitda_pct: 5.2, roic_pct: 5.8, dn_ebitda: 2.3, fcf_yield_pct: 6.3 },
      { nombre: 'Rapid7', ticker: 'RPD', pais: 'US', capitalizacion: 834, ev_ventas: 1.28, ev_ebitda_ltm: 18.8, ev_ebitda_ntm: null, per_ntm: 6.7, crecimiento_pct: null, margen_ebitda_pct: 6.8, roic_pct: 2.6, dn_ebitda: 4.5, fcf_yield_pct: 17.4 },
      { nombre: 'Okta', ticker: 'OKTA', pais: 'US', capitalizacion: 37050, ev_ventas: 11.3, ev_ebitda_ltm: 108.4, ev_ebitda_ntm: null, per_ntm: 52.0, crecimiento_pct: null, margen_ebitda_pct: 10.5, roic_pct: 4.6, dn_ebitda: -7.0, fcf_yield_pct: 2.6 },
    ],
    confianza: 'Baja',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-03', objetivo: 'Wiz', comprador: 'Alphabet (Google)', ev: 32000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Seguridad de la nube sin beneficios creciendo más del 50 %: interés estratégico, no múltiplo comparable.' },
      { fecha: '2024-04', objetivo: 'Darktrace', comprador: 'Thoma Bravo', ev: 5300, ev_ventas: null, ev_ebitda: null, prima_pct: 44, excluir: false, comentario: '7,75 USD por acción; prima del 44 % sobre la media de tres meses [7].' },
      { fecha: '2022-04', objetivo: 'SailPoint', comprador: 'Thoma Bravo', ev: 6900, ev_ventas: 16.0, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '16,0 veces las ventas LTM según 451 Research [8].' },
      { fecha: '2021-04', objetivo: 'Proofpoint', comprador: 'Thoma Bravo', ev: 12300, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '176 USD por acción en efectivo [9].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA de las operaciones', tipo: 'Complemento', intentos: '1) Notas de prensa (solo valor y precio por acción); 2) 451 Research (solo SailPoint); 3) bases de operaciones de pago', decision: 'Omitido; peso de transacciones 0' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones y objetivos mínimo y máximo', tipo: 'Complemento', intentos: '1) MarketScreener (solo media de 145,83 USD y 38 analistas); 2) Google Finance (10 comprar y 21 mantener, foto de junio); 3) Investing.com (requiere JavaScript)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Stock Analysis (no abre por curl); 2) Nasdaq short interest (requiere JavaScript); 3) foros (cifra sin fuente)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Check Point Software: noticias y análisis (titulares abril-octubre de 2026, RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-17', url: 'https://seekingalpha.com/api/sa/combined/CHKP.xml' },
  { id: 2, titulo: 'Stream $CHKP (30 mensajes, 24-jun a 13-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/CHKP.json' },
  { id: 3, titulo: 'Check Point Software: Subscription Growth Improved And Valuation Is Now Cheap (Rating Upgrade); Low Valuation Meets Structural Challenges; AI Could Change The Growth Equation', editor: 'Seeking Alpha (artículos de autores)', tipo: 'Foros y redes', fecha: '2026-09-09', url: 'https://seekingalpha.com/api/sa/combined/CHKP.xml' },
];
const E = {
  _estado: 'Completo. Reddit da 403; se leen Seeking Alpha (titulares y artículos de autores) y Stocktwits.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 5, tono: 'Dividido', resumen: 'De «barata pero con problemas estructurales» (julio) a «la suscripción mejora y la valoración es barata» (subida de recomendación en agosto) y «la IA podría cambiar la ecuación de crecimiento» (septiembre) [3].' },
      { plataforma: 'Seeking Alpha (noticias de analistas)', fecha: '2026-07', n_comentarios: 8, tono: 'Dividido', resumen: 'BofA (mayo) y Raymond James (julio) rebajan porque el cortafuegos sigue bajo presión y «el negocio no mejora»; Guggenheim sube a Comprar por valoración (objetivo 188 USD) [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Particulares que compran a 13 veces beneficios y con recompras frente a otros que la ven «tecnología heredada» que pierde frente a Palo Alto y Fortinet; se pregunta por qué cae un 25 % con el sector al alza [2].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas');
