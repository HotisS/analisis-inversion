// Escribe las notas A-E de Modine (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json), del pro forma
// del artículo 11 (8-K/A de 7-oct-2026), de las notas de prensa de resultados, de los 10-K FY2026 y FY2024, del proxy de
// 2026, de bolsa.mjs, de Yahoo y Stock Analysis y de los foros. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/modine-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const NOTAS = {};
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/67347';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Unaudited Pro Forma Consolidated Financial Information (8-K/A, anexo 99.1): cuenta FY2024-FY2026 y 1T FY2027 sin Performance Technologies; balance pro forma a 30-jun-2026', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-07', url: `${E8}/000110465926114220/mod-ex99d1.htm` },
  { id: 2, titulo: 'Form 10-K FY2026 (ejercicio cerrado el 31-mar-2026): cuentas auditadas, segmentos, amortizaciones y capex por segmento, terminación del plan de pensiones, adquisiciones', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-27', url: `${E8}/000110465926066795/mod-20260331x10k.htm` },
  { id: 3, titulo: 'Modine Reports First Quarter Fiscal 2027 Results (8-K, anexo 99.1)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000110465926088230/mod-20260729xex99d1.htm` },
  { id: 4, titulo: 'Segment operating results recast for segment realignment (8-K, anexo 99.1): Data Centers y Commercial HVAC por trimestre de FY2026', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-24', url: `${E8}/000110465926086644/mod-20260724xex99d1.htm` },
  { id: 5, titulo: 'Form 10-K FY2024: segmentos FY2022-FY2024 (Climate Solutions), amortizaciones y capex por segmento, debilidad material de control interno', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2024-05-22', url: `${E8}/000114036124027133/ef20026276_10k.htm` },
  { id: 6, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos FY2017-FY2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000067347.json' },
  { id: 7, titulo: 'Modine Reports Fourth Quarter and Fiscal 2026 Results (8-K, anexo 99.1)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-26', url: `${E8}/000110465926066291/mod-20260526xex99d1.htm` },
  { id: 8, titulo: 'Form 10-Q del 1T FY2027 (30-jun-2026)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-30', url: `${E8}/000110465926088569/mod-20260630x10q.htm` },
];

// Cuenta del perímetro que queda (sin Performance Technologies). FY2024-FY2026: pro forma del artículo 11 [1].
// FY2022-FY2023: estimación propia con el segmento Climate Solutions y Corporate del 10-K FY2024 [5].
const cuenta = [
  { periodo: 'FY2022', ingresos: 910.1, coste_ventas: 743.8, gastos_generales: 124.5, ebitda: 66.7, amortizaciones: 24.9, ebit: 41.8, resultado_financiero: -15.6, bai: 26.2, impuestos: 6.3, minoritarios: 0, beneficio_neto: 19.9, gastos_financieros: 15.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.38, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 52.5 },
  { periodo: 'FY2023', ingresos: 1011.5, coste_ventas: 787.9, gastos_generales: 138.8, ebitda: 107.5, amortizaciones: 22.7, ebit: 84.8, resultado_financiero: -20.7, bai: 64.1, impuestos: 15.4, minoritarios: 0, beneficio_neto: 48.7, gastos_financieros: 20.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.92, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 52.8 },
  { periodo: 'FY2024', ingresos: 1162.2, coste_ventas: 863.2, gastos_generales: 164.3, ebitda: 162.1, amortizaciones: 27.4, ebit: 134.7, resultado_financiero: -31.6, bai: 103.1, impuestos: 22.7, minoritarios: 0, beneficio_neto: 80.4, gastos_financieros: 23.9, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -4.0, bpa: 1.51, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 53.4 },
  { periodo: 'FY2025', ingresos: 1440.6, coste_ventas: 1036.0, gastos_generales: 240.0, ebitda: 213.6, amortizaciones: 49.0, ebit: 164.6, resultado_financiero: -31.5, bai: 133.1, impuestos: 34.0, minoritarios: 0, beneficio_neto: 99.1, gastos_financieros: 26.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 1.84, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 53.9 },
  { periodo: 'FY2026', ingresos: 2055.4, coste_ventas: 1534.8, gastos_generales: 289.9, ebitda: 279.6, amortizaciones: 48.9, ebit: 230.7, resultado_financiero: -144.8, bai: 85.9, impuestos: 31.9, minoritarios: 0, beneficio_neto: 54.0, gastos_financieros: 20.3, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 8.0, bpa: 1.0, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 53.8 },
];

const bX = Object.fromEntries(X.balance.historico.map((b) => [b.periodo, b]));
const fX = Object.fromEntries(X.flujos.historico.map((f) => [f.periodo, f]));
const balCons = (p) => {
  const b = bX[p];
  return { periodo: p, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
};
const balance = ['FY2022', 'FY2023', 'FY2024', 'FY2025'].map(balCons);
// FY2026: balance pro forma sin Performance Technologies a 30-jun-2026 [1] (el único balance del perímetro que queda).
balance.push({ periodo: 'FY2026', activo_total: 2100.4, activo_corriente: 1053.0, pasivo_corriente: 570.8, pasivo_total: 1182.9, fondo_comercio: 290.2, intangibles: 190.2, inmovilizado_material: 353.5, existencias: 438.9, clientes: 432.6, proveedores: 386.9, activos_contrato: null, pasivos_contrato: null, caja: 54.1, deuda_financiera: 319.4, arrendamientos: 0, patrimonio_neto: 917.5, minoritarios: 0, reservas: 668.0 });

const flujos = ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].map((p) => {
  const f = fX[p];
  return { periodo: p, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: 0, recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});

const A = {
  _estado: 'Completo. Cuenta del perímetro que queda tras la escisión (pro forma de la empresa FY2024-FY2026; FY2022-FY2023 estimados con el segmento). Balance y flujos FY2022-FY2025 consolidados (con Performance Technologies); balance FY2026 = pro forma a 30-jun-2026.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 2254.4, ebitda: 284.6, ebit: 232.7, beneficio_neto: 78.0, bpa: 1.44, dpa: 0, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 8.0 },
    cambios_perimetro: [
      { periodo: 'FY2022', descripcion: 'Balance y flujos consolidados con Performance Technologies (escindida el 1-oct-2026); la cuenta es la del perímetro que queda, estimada con el segmento Climate Solutions y Corporate [5].' },
      { periodo: 'FY2023', descripcion: 'Igual que FY2022: balance y flujos con Performance Technologies, cuenta estimada sin ella [5].' },
      { periodo: 'FY2024', descripcion: 'Cuenta pro forma sin Performance Technologies [1]; balance y flujos consolidados con ella. Compra de Scott Springfield (184 M, 1-mar-2024): entra en balance, no en la cuenta [2].' },
      { periodo: 'FY2025', descripcion: 'Cuenta pro forma sin Performance Technologies [1]; balance y flujos consolidados con ella [6].' },
      { periodo: 'FY2026', descripcion: 'Cuenta pro forma sin Performance Technologies [1]; balance pro forma a 30-jun-2026 sin ella y tras amortizar 198,6 M de deuda con el cobro de la escisión [1]; flujos consolidados con ella [6]. Compras de L.B. White (111 M), Climate by Design (64 M) y AbsolutAire (11 M) [2].' },
    ],
    comentario: 'El perímetro que queda (centros de datos y climatización comercial) ha pasado de 910 M de ventas en FY2022 a 2.055 M en FY2026 [5, 1]: un 22,6 % anual. El motor son los centros de datos: 138 M en FY2022, 294 M en FY2024, 644 M en FY2025 y 1.112 M en FY2026 [5, 2]; Heat Transfer Solutions y HVAC Technologies crecen sobre todo por compras (Scott Springfield, L.B. White, Climate by Design: 119 M de ventas añadidas en FY2026 [2]). El margen EBIT pasa del 4,6 % al 11,2 % con el 80/20 y la mezcla, pero el 1T FY2027 lo baja al 8,6 % (51,2 M sobre 596,3 M [1]): el margen bruto de centros de datos cae del 29,8 % al 20,2 % por los costes de ampliar capacidad y la falta de componentes [3]. Los costes centrales (88,4 M en FY2026 [2]) se quedan enteros en esta empresa, que ahora es la mitad de grande.',
    ajustes: 'Cifras publicadas (pro forma de la propia empresa) salvo FY2022-FY2023, que son estimación propia: ventas externas y beneficio operativo del segmento Climate Solutions más Corporate del 10-K FY2024 [5], los intereses del grupo, un tipo impositivo del 24 % y las acciones diluidas del grupo. No recurrentes: plusvalía de 4,0 M en FY2024; deterioro de 4,1 M y pérdida en venta de activos de 3,9 M en FY2026 (dentro del EBIT) [1]; cargo no monetario de 116,1 M por terminar el plan de pensiones de EE. UU. en FY2026, debajo del EBIT [1, 2], que hunde el BPA de FY2026 a 1,00 USD (2,60 sin él, estimación propia con un 26 % de impuesto). El LTM a jun-26 es estimación propia: FY2026 pro forma + 1T FY2027 pro forma − 1T FY2026 de los segmentos reexpresados [4] menos sus costes centrales.',
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '1T26', ingresos: 397.3, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '2T26', ingresos: 457.9, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '3T26', ingresos: 550.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '4T26', ingresos: 676.1, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: null, vs_consenso: null },
      { periodo: '1T27', ingresos: 596.3, crecimiento_pct: 50.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.09, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Trimestres del ejercicio fiscal (abril-marzo): «1T27» es abril-junio de 2026. Ventas de 1T26 a 4T26 = Data Centers + Commercial HVAC reexpresados [4] (sin eliminaciones); 1T27 pro forma [1]. En el 1T FY2027 (29-jul-2026) el grupo vendió 874,1 M (+28 %) con centros de datos +90 % (348,6 M) y climatización comercial +22 % (261,6 M, 19,7 M de compras), pero el margen bruto de centros de datos bajó 9,6 puntos, al 20,2 %, por los costes de la ampliación de capacidad y la falta de componentes que la empresa ya había avisado en mayo [3, 2]. El BPA ajustado (1,53 USD) batió al consenso en 0,26 USD, con ayuda de una ventaja fiscal por las acciones entregadas, y las ventas quedaron 4,6 M por debajo [D9]. La dirección mantuvo la guía de FY2027 con Performance Technologies dentro (ventas +20-35 %, EBITDA ajustado 650-680 M) y prometió una guía nueva sin ella tras el cierre [3]. El flujo libre fue de −5,0 M por el capex de capacidad (46,4 M) y la deuda neta subió 70 M por recompras ligadas al plan de remuneración [3]. Lo que más preguntaron los analistas, según los resúmenes publicados: cuándo vuelve el margen de centros de datos y cuánto de la caída es temporal; la dirección habló de mejoras secuenciales desde el 2T [D9].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: null,
    liquidez: 'Caja de 54,1 M y deuda de 319,4 M en el balance pro forma a 30-jun-2026, tras amortizar 198,6 M de la línea de crédito con el cobro de la escisión (156,0 M de distribución y 42,6 M de ajuste de circulante) [1]. Quedan unos 31 M de costes de la operación por pagar [1].',
    rating: 'Sin rating público localizado en los documentos leídos.',
    coste_deuda_pct: 6.0,
    vida_media_anios: null,
    otros_pasivos: 'El plan principal de pensiones de EE. UU. se terminó en FY2026 con un cargo no monetario de 116,1 M [2]: el déficit de pensiones deja de ser una partida relevante del puente. Otros pasivos a largo plazo de 311,3 M en el pro forma [1] (arrendamientos operativos, que en US GAAP no van a la deuda, impuestos y otras provisiones). Quedan 31 M de costes de la operación con Gentherm por pagar [1] (en el puente como otros ajustes) y un ajuste de circulante con Gentherm pendiente de cierre [1]. Garantías y litigios: nota 20 del 10-K, sin importes relevantes [2].',
    comentario: 'La deuda neta pro forma es de 265 M, 0,9 veces el EBITDA de FY2026 sin Performance Technologies. El circulante comercial es alto (clientes 432,6 M + existencias 438,9 M − proveedores 386,9 M ≈ 485 M sin el acreedor por la operación, un 22 % de las ventas LTM): la ampliación de centros de datos llena el almacén (existencias del grupo de 506 M a 609 M en un trimestre [3]). Los balances FY2022-FY2025 son consolidados con Performance Technologies, por eso sus ratios no comparan con la cuenta.',
    confianza: 'Media',
  },
  flujos: {
    historico: flujos,
    comentario: 'Flujos consolidados con Performance Technologies (no hay flujos pro forma) [6]. El flujo operativo pasó de 11,5 M en FY2022 a 249 M en FY2026, y el capex de 40 M a 143 M, de los que 113,4 M fueron de Climate Solutions, sobre todo capacidad para centros de datos [2]. Capex de mantenimiento estimado (propio): cerca de las amortizaciones del perímetro (≈49 M en FY2026), el resto es crecimiento. En el 1T FY2027 el flujo libre fue negativo (−5,0 M) por un capex de 46,4 M [3]. Las compras de FY2024 (186 M) y FY2026 (182 M) son de climatización comercial [2].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: null, opinion: 'Favorable (FY2026). En FY2024 el auditor dio opinión adversa sobre el control interno por una debilidad material en los controles generales de TI de sistemas europeos, sin errores en las cuentas [5].',
    comentario: null,
    senales: [
      { senal: 'Debilidad material de control interno en FY2024 (controles de TI en Europa)', nivel: 'Media', comentario: 'Opinión adversa del auditor sobre el control interno en el 10-K FY2024, sin errores en las cuentas [5]; no consta en el 10-K FY2026 [2].' },
      { senal: 'Historia reconstruida (escisión)', nivel: 'Media', comentario: 'La cuenta FY2024-FY2026 es pro forma no auditada [1]; FY2022-FY2023 es estimación propia [5].' },
      { senal: 'Cargo de pensiones de 116,1 M y costes de la operación', nivel: 'Baja', comentario: 'No monetarios o no recurrentes, fuera del EBITDA ajustado de la empresa [2, 3].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Data Centers', descripcion: 'Refrigeración de centros de datos (enfriadoras, unidades de aire, CDU de refrigeración líquida, controles).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 294.2, resultado: null }, { periodo: 'FY2025', ingresos: 644.2, resultado: null }, { periodo: 'FY2026', ingresos: 1108.2, resultado: 194.5 }] },
      { nombre: 'Commercial HVAC', descripcion: 'Baterías e intercambiadores (Heat Transfer Solutions) y equipos de climatización comercial y calefacción (HVAC Technologies).', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 813.9, resultado: null }, { periodo: 'FY2025', ingresos: 796.4, resultado: null }, { periodo: 'FY2026', ingresos: 973.8, resultado: 126.6 }] },
      { nombre: 'Corporativo, otros y eliminaciones', descripcion: 'Costes centrales, eliminaciones y negocios que quedan fuera de los segmentos en el pro forma.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 54.1, resultado: null }, { periodo: 'FY2025', ingresos: 0.0, resultado: null }, { periodo: 'FY2026', ingresos: -26.6, resultado: -90.4 }] },
    ],
    geografias: null, geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas de centros de datos (M USD)', valor_anterior: '644 (FY2025)', valor_actual: '1.112 (FY2026)', variacion: '+73 %', comentario: 'Por producto, 10-K FY2026 [2]; +90 % en el 1T FY2027 [3].' },
      { kpi: 'Margen bruto de centros de datos', valor_anterior: '29,8 % (1T FY2026)', valor_actual: '20,2 % (1T FY2027)', variacion: '−9,6 puntos', comentario: 'Costes de capacidad y falta de componentes [3, 4].' },
      { kpi: 'Diez primeros clientes / ventas del grupo', valor_anterior: 'n.d.', valor_actual: '49 % (FY2026)', variacion: null, comentario: 'Los cinco primeros son de centros de datos, vehículo comercial y maquinaria [2].' },
      { kpi: 'Capex del perímetro (M USD)', valor_anterior: '53,8 (FY2025)', valor_actual: '114,9 (FY2026)', variacion: '×2,1', comentario: 'Climate Solutions + Corporate [2].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
};
NOTAS.A = A;

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: negocio, competencia, clientes, plantas, mercados finales', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-27', url: `${E8}/000110465926066795/mod-20260331x10k.htm` },
  { id: 2, titulo: 'Gentherm and Modine\'s Performance Technologies Business to Combine (8-K, anexo 99.1): objetivos de centros de datos (50-70 % anual dos años)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-29', url: `${E8}/000110465926008087/mod-20260129xex99d1.htm` },
  { id: 3, titulo: 'Global Data Center Cooling Market Landscape 2025-2030 (16,32 mil M USD en 2024; 40,72 mil M en 2030)', editor: 'Arizton', tipo: 'Sectorial', fecha: '2025', url: 'https://www.arizton.com/market-reports/data-center-cooling-market-report' },
  { id: 4, titulo: 'Data Center Cooling: global market (19,8 mil M USD en 2024; 50,9 mil M en 2030)', editor: 'ResearchAndMarkets / Business Wire', tipo: 'Sectorial', fecha: '2025-11-06', url: 'https://www.businesswire.com/news/home/20251106101911/en' },
  { id: 5, titulo: 'Datos de mercado de comparables (Vertiv, Trane, Johnson Controls, Carrier, Lennox, AAON, nVent, SPX, Eaton): ventas y márgenes de los últimos 12 meses', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/VRT/' },
  { id: 6, titulo: 'Eaton Signs Agreement to Acquire Boyd Thermal (9.500 M USD; 22,5 veces el EBITDA ajustado estimado de 2026)', editor: 'Eaton / Business Wire', tipo: 'Primaria', fecha: '2025-11-03', url: 'https://www.businesswire.com/news/home/20251103856036/en/' },
  { id: 7, titulo: 'Schneider Electric prend une participation de 75 % dans Motivair pour 850 millions', editor: 'Option Finance', tipo: 'Prensa', fecha: '2024-10-17', url: 'https://www.optionfinance.fr/info-financiere-en-continu/d/2024-10-17-schneider-electric-prend-une-participation-de-75-dans-motivair-pour-850-millions-deuros.html' },
];
const B = {
  _estado: 'Completo con huecos: cuotas de mercado sin fuente pública; ficha sectorial de transferencia de calor del repo como contexto.',
  historia: {
    resumen: 'Modine nace en 1916 en Racine (Wisconsin) como fabricante de radiadores y durante un siglo fue sobre todo proveedor de refrigeración para vehículos [B1]. En 2016 compró el negocio de intercambiadores de Luvata (≈364 M de pago neto) [A6]. Neil Brinker llega como consejero delegado en diciembre de 2020 y aplica el 80/20: simplifica, vende negocios de automoción y vuelca la inversión en centros de datos y climatización comercial [B1]. Las ventas de centros de datos pasan de 138 M en FY2022 a 1.112 M en FY2026 [A5, A2]. El 1-oct-2026 escinde Performance Technologies (vehículos y maquinaria) y la fusiona con Gentherm; la empresa que queda pasará a llamarse Modexus Solutions si lo aprueba la junta [D7].',
    hitos: [
      { anio: '1916', hito: 'Fundación en Racine (Wisconsin) [B1].' },
      { anio: '2016', hito: 'Compra del negocio de intercambiadores de Luvata (≈364 M) [A6].' },
      { anio: '2020', hito: 'Neil Brinker, consejero delegado (diciembre) [B1].' },
      { anio: '2023', hito: 'Venta de tres negocios de automoción en Alemania (54 M de ventas) [A2].' },
      { anio: '2024', hito: 'Compra de Scott Springfield, unidades de tratamiento de aire (184 M) [A2].' },
      { anio: '2025', hito: 'Compras de L.B. White (111 M), Climate by Design (64 M) y AbsolutAire (11 M) [A2].' },
      { anio: '2026', hito: 'Acuerdo con Gentherm (29-ene) y escisión de Performance Technologies (1-oct); 156 M en caja para la empresa [B2, D7].' },
      { anio: '2026', hito: 'Anuncio del cambio de nombre a Modexus Solutions (10-sep), pendiente de junta extraordinaria [D8].' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado que pesa en el beneficio es la refrigeración de centros de datos: enfriadoras, unidades de aire de precisión, sistemas de agua fría y unidades de distribución de refrigerante para la refrigeración líquida, en todo el mundo [B3, B4]. Las dos fuentes miden casi el mismo perímetro y difieren un 20 % en el tamaño; se usa la media. La otra mitad del negocio (baterías, intercambiadores y equipos de climatización comercial) es un mercado maduro de crecimiento medio de un dígito, sin cifra pública fiable.',
    tamano: '≈16.300-19.800 M USD en 2024 y 40.700-50.900 M en 2030 (16,5-17 % anual) [B3, B4]',
    unidad_serie: 'millones de USD (media de las dos fuentes)',
    serie: [{ anio: '2024', tamano: 18060 }, { anio: '2030e', tamano: 45810 }],
    tcac_historico_pct: null, tcac_previsto_pct: 16.8, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Inversión de los hiperescaladores en IA', efecto: '+', horizonte: 'Cíclico', evidencia: 'Las ventas de centros de datos de Modine crecieron un 73 % en FY2026 y un 90 % en el 1T FY2027 [A2, A3].' },
      { driver: 'Densidad por bastidor y refrigeración líquida', efecto: '+', horizonte: 'Estructural', evidencia: 'Eaton pagó 22,5 veces el EBITDA por Boyd Thermal, 1.500 M de sus 1.700 M de ventas en refrigeración líquida [B6].' },
      { driver: 'Eficiencia energética y refrigerantes de bajo potencial de calentamiento', efecto: '+', horizonte: 'Estructural', evidencia: 'Modine vende la reducción de agua y energía con controles inteligentes [B1].' },
      { driver: 'Construcción no residencial y escuelas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La empresa espera el mercado escolar plano en FY2027 [B1].' },
      { driver: 'Aranceles y componentes', efecto: '−', horizonte: 'Cíclico', evidencia: 'Falta de componentes desde el 4T FY2026 que retrasa la producción [B1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Vertiv, Schneider, Trane, Johnson Controls, Carrier y Eaton compiten en el mismo cliente y compran capacidad (Boyd, Motivair) [B6, B7].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Pocos hiperescaladores compran la mayoría; los diez primeros clientes son el 49 % de las ventas del grupo [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Compresores y componentes escasos han frenado la producción desde el 4T FY2026 [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'La escala y la cualificación con el cliente frenan, pero los grandes de climatización entran comprando.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La refrigeración líquida directa al chip y por inmersión cambia la mezcla de equipos; Modine vende CDU, pero el valor se desplaza.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Los centros de datos están en plena expansión por la IA, con crecimientos del 50-90 % en Modine [A3, B2]. En 2008-09 y 2020 la empresa vendía sobre todo a vehículos y cayó con ellos; 2022 fue de subida por precios. El mercado de centros de datos no ha vivido una contracción de la inversión en IA: un frenazo del capex de los hiperescaladores es el riesgo de ciclo. Las caídas de junio-julio y septiembre de 2026 en las acciones de infraestructura de IA lo descuentan en parte [D9].' },
    regulacion: 'Normas de refrigerantes de bajo potencial de calentamiento en EE. UU. (AIM Act) y en Europa (gases fluorados), que obligan a renovar equipos de climatización; aranceles de EE. UU. sobre acero, aluminio y componentes, que la empresa intenta repercutir [B1].',
    tendencias: 'La densidad de los bastidores de IA empuja a la refrigeración líquida; los grandes compran especialistas (Eaton-Boyd, Schneider-Motivair) [B6, B7]. Modine gana mientras el cuello de botella sea la capacidad y pierde poder si la refrigeración se estandariza o la diseña el propio hiperescalador.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.5,
    posicion: 'Proveedor mediano de refrigeración de centros de datos (≈5,5 % del mercado mundial con 1.112 M de ventas en FY2026 sobre ≈20.000 M en 2025, estimación propia con [B3, B4]); en climatización comercial, nicho de baterías, calefacción industrial y unidades de aire en Norteamérica y Europa.',
    competidores: [
      { nombre: 'Vertiv', pais: 'EE. UU.', ticker: 'VRT', ingresos: 11480, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en infraestructura térmica y eléctrica de centros de datos; margen EBITDA 23,3 % [B5].' },
      { nombre: 'Trane Technologies', pais: 'Irlanda', ticker: 'TT', ingresos: 22210, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enfriadoras para centros de datos y climatización comercial; margen EBITDA 19,4 % [B5].' },
      { nombre: 'Johnson Controls', pais: 'Irlanda', ticker: 'JCI', ingresos: 24995, cuota_pct: null, margen_ebit_pct: null, comentario: 'York y Silent-Aire; margen EBITDA 17,3 % [B5].' },
      { nombre: 'Schneider Electric (Motivair)', pais: 'Francia', ticker: 'SU', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compró el 75 % de Motivair (refrigeración líquida) por 850 M [B7].' },
      { nombre: 'Eaton (Boyd Thermal)', pais: 'Irlanda', ticker: 'ETN', ingresos: 30026, cuota_pct: null, margen_ebit_pct: null, comentario: 'Compra Boyd Thermal por 9.500 M [B6].' },
      { nombre: 'Carrier', pais: 'EE. UU.', ticker: 'CARR', ingresos: 22108, cuota_pct: null, margen_ebit_pct: null, comentario: 'Enfriadoras y climatización comercial; margen EBITDA 14,0 % [B5].' },
      { nombre: 'AAON (BasX)', pais: 'EE. UU.', ticker: 'AAON', ingresos: 1932, cuota_pct: null, margen_ebit_pct: null, comentario: 'Climatización comercial y equipos a medida para centros de datos; margen EBITDA 15,5 % [B5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a fabricación de equipos.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Diseños cualificados con cada hiperescalador; pero el cliente reparte pedidos entre varios proveedores [B1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Airedale y Modine en climatización; la marca Modine pasa a Gentherm y la empresa la usa con licencia [D7].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'El 80/20 subió el margen EBIT del perímetro del 4,6 % al 11,2 % en cuatro años [A1, A5], aún por debajo de Vertiv o Trane [B5].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Plantas nuevas en EE. UU. y Reino Unido; la capacidad es hoy la ventaja y el cuello de botella [B1].' },
      ],
    },
    amenazas: 'Los grandes (Vertiv, Schneider, Trane, Eaton con Boyd) tienen más escala, servicio y relación con el cliente; la concentración de clientes deja el precio en manos de los hiperescaladores [B1]. Probabilidad media de que el margen de centros de datos no vuelva al 25-30 % de FY2025 si la capacidad del sector se pone al día.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la eficiencia energética y el consumo de agua de los equipos que vende (la tesis comercial de sus enfriadoras y controles) y los refrigerantes de bajo potencial de calentamiento [B1]. La terminación del plan de pensiones de EE. UU. en FY2026 eliminó un pasivo social a cambio de un cargo de 116 M [A2].',
    controversias: 'No se han encontrado sanciones ni litigios relevantes en los documentos leídos (10-K FY2026, nota 20) [B1].',
    confianza: 'Baja',
  },
  fuentes: fB,
};
NOTAS.B = B;

// ---------------------------------------------------------------- C. Gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, participaciones', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-10', url: `${E8}/000110465926082630/mod-20260820xdef14a.htm` },
  { id: 2, titulo: 'Form 8-K (Item 5.07): resultados de la junta del 20-ago-2026', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-21', url: `${E8}/000110465926099432/mod-20260820x8k.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (15-oct-2025 a 15-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000067347&type=4' },
  { id: 4, titulo: 'Form 10-K FY2026: directivos (Item 1)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-27', url: `${E8}/000110465926066795/mod-20260331x10k.htm` },
];
const C = {
  _estado: 'Completo con huecos: votos de remuneración de 2024-2025 no leídos; historial de guía de años anteriores parcial.',
  directivos: {
    equipo: [
      { nombre: 'Neil D. Brinker', cargo: 'Presidente y consejero delegado', desde: '2020', participacion_pct: 0.87, trayectoria: 'Antes, consejero delegado de operaciones de Advanced Energy Industries [C4]. Con él, el 80/20, la salida de automoción y el salto de centros de datos de 138 M a 1.112 M de ventas [A5, A2].' },
      { nombre: 'Michael B. Lucareli', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2014', participacion_pct: 0.2, trayectoria: 'Lleva más de una década en la empresa [C1].' },
      { nombre: 'Eric S. McGinnis', cargo: 'Presidente de Commercial HVAC', desde: '2026', participacion_pct: 0.05, trayectoria: 'Dirigía Climate Solutions [C1].' },
      { nombre: 'Arthur Laszlo Jr.', cargo: 'Presidente de Data Centers', desde: '2026', participacion_pct: null, trayectoria: 'Al frente del nuevo segmento de centros de datos [C3].' },
      { nombre: 'Marsha C. Williams', cargo: 'Presidenta no ejecutiva del consejo', desde: '1999', participacion_pct: 0.21, trayectoria: 'Ex directora financiera de Orbitz Worldwide; exenta del límite de edad para seguir durante la operación [C1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Climate Solutions cerca de 2.000 M de ventas (ene-26) [A2]', real: '2.062 M [A2]', cumplida: 'Sí' },
      { anio: 'FY2028', guia: 'Centros de datos: 2.000 M de ventas (objetivo anterior); en ene-26, superarlo con un 50-70 % anual dos años [B2]', real: 'En curso: 1.112 M en FY2026, +90 % en el 1T FY2027 [A3]', cumplida: 'Parcial' },
      { anio: 'FY2027', guia: 'Ventas +20-35 % y EBITDA ajustado 650-680 M con Performance Technologies (mantenida el 29-jul-26) [A3]', real: 'Pendiente; 1T con margen de centros de datos 9,6 puntos más bajo [A3]', cumplida: 'Parcial' },
    ],
    comentario: 'El equipo que transformó la empresa sigue (Brinker y Lucareli), con un consejo estable. Resta la venta continuada de acciones: 40,4 M USD en 12 meses sin una sola compra, incluidos el consejero delegado (5,1 M, con plan 10b5-1), el director financiero (4,3 M) y el presidente de climatización comercial (11,2 M) [C3]. La credibilidad de la guía se pondrá a prueba con el margen de centros de datos en el 2T FY2027.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Marsha C. Williams', cargo: 'Presidenta', tipo: 'Independiente', desde: '1999', comisiones: 'Presidencia' },
      { nombre: 'Neil D. Brinker', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2020', comisiones: null },
      { nombre: 'Eric D. Ashleman', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Mark Bendza', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Suresh V. Garimella', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Katherine C. Harper', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Alan S. Lowe', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'David J. Wilson', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'William A. Wulfsohn', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Christine Y. Yan', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 96.3, voto_remuneracion_contra_pct: 3.3, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 10.16, fijo: 1.19, variable_corto: 2.79, variable_largo: 6.12, ratio_salario_medio: 256 },
    remuneracion: 'El variable anual (MIP) de FY2026 depende del margen y del crecimiento del EBITDA ajustado; el largo plazo, del rendimiento medio del flujo de caja sobre el capital invertido y del crecimiento de las ventas [C1]. Premia crecer con margen y con retorno de caja, no el crecimiento a cualquier precio. El consejero delegado cobró 10,16 M en FY2026 (12,71 M en FY2025), 256 veces el empleado mediano [C1]. El voto consultivo de 2026 salió con un 96,3 % a favor sobre los votos emitidos (3,3 % en contra) [C2].',
    accionistas: [
      { nombre: 'BlackRock', pct: 7.24, tipo: 'Institucional', variacion: '13G de abril de 2025' },
      { nombre: 'Vanguard', pct: 5.2, tipo: 'Institucional', variacion: '13G de abril de 2026' },
      { nombre: 'Consejeros y directivos', pct: 1.92, tipo: 'Directivos', variacion: 'Ventas netas de 40,4 M USD en 12 meses [C3]' },
    ],
    insiders: [
      { fecha: '2026-06-22', persona: 'Brian J. Agen (recursos humanos)', operacion: 'Venta', acciones: null, importe: 12.08 },
      { fecha: '2026-06-22', persona: 'Eric S. McGinnis (Commercial HVAC)', operacion: 'Venta', acciones: null, importe: 11.16 },
      { fecha: '2026-06-22', persona: 'Neil D. Brinker (consejero delegado, plan 10b5-1)', operacion: 'Venta', acciones: null, importe: 5.12 },
      { fecha: '2026-06-22', persona: 'Eric D. Ashleman (consejero)', operacion: 'Venta', acciones: null, importe: 4.33 },
      { fecha: '2026-06-22', persona: 'Michael B. Lucareli (director financiero)', operacion: 'Venta', acciones: null, importe: 4.29 },
      { fecha: '2026-06-22', persona: 'Marsha C. Williams (presidenta)', operacion: 'Venta', acciones: null, importe: 2.82 },
    ],
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestores indexados (7,2 % y 5,2 %) [C1]. Consejo escalonado (mandatos de tres años: los elegidos en 2026 lo son hasta 2029 [C2]), una defensa frente a ofertas hostiles. Una acción, un voto.',
    alertas: ['Ventas de directivos y consejeros de 40,4 M USD en 12 meses sin compras [C3] (fechas de la tabla: agregadas por persona; las operaciones se repartieron entre finales de 2025 y junio de 2026).', 'Debilidad material de control interno en FY2024, ya corregida [A5].', 'La presidenta sigue por encima de la edad de jubilación del consejo por exención expresa [C1].'],
    confianza: 'Media',
  },
  fuentes: fC,
};
NOTAS.C = C;

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de MOD, SPY y XLI (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/MOD/history' },
  { id: 2, titulo: 'MOD: estimaciones de consenso (BPA y ventas FY2027-FY2028, revisiones a 7 y 90 días), precio objetivo y recomendaciones; comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MOD/analysis' },
  { id: 3, titulo: 'Modine Manufacturing (MOD) Stock Forecast & Price Target', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-05', url: 'https://stockanalysis.com/stocks/mod/forecast/' },
  { id: 4, titulo: '10-Year Treasury Constant Maturity Rate (DGS10)', editor: 'FRED, Banco de la Reserva Federal de San Luis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx)', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Movimiento del precio a 1-12 meses (herramientas/movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MOD/history' },
  { id: 7, titulo: 'Modine Completes Spin-off and Combination of its Performance Technologies Business with Gentherm (8-K, anexo 99.1)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-01', url: `${E8}/000110465926112870/tm2626618d1_ex99-1.htm` },
  { id: 8, titulo: 'Modine to Become Modexus Solutions (8-K, anexo 99.1)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-10', url: `${E8}/000110465926106727/tm2625001d1_ex99-1.htm` },
  { id: 9, titulo: 'Noticias y análisis de MOD (titulares: resultados del 1T, informe sobre Google como cliente de 4.000 M, caída de las acciones de infraestructura de IA)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://seekingalpha.com/symbol/MOD' },
  { id: 10, titulo: 'Gentherm and Modine Announce Additional Information (record date, ajuste de la ecuación de canje)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-17', url: `${E8}/000110465926108614/tm2625565d1_ex99-1.htm` },
  { id: 11, titulo: 'Modine Manufacturing Slides as Investors Digest Insider Sales and AI Infrastructure Weakness (objetivos de analistas mayo-junio 2026)', editor: 'Quiver Quantitative', tipo: 'Prensa', fecha: '2026-06-26', url: 'https://www.quiverquant.com/news/Modine+Manufacturing+Slides+as+Investors+Digest+Insider+Sales+and+AI+Infrastructure+Weakness' },
  { id: 12, titulo: 'Proxy de la junta extraordinaria del 13-nov-2026 (cambio de nombre a Modexus Solutions)', editor: 'Modine / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-13', url: `${E8}/000110465926115309/mod-20261113xdef14a.htm` },
];
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo.json'), 'utf8'));
const D = {
  _estado: 'Completo. Comparables de Yahoo del 15-oct-2026 (precio intradía); consenso de Yahoo y Stock Analysis (mezcla de perímetros, ver revisiones).',
  identificacion: {
    nombre: 'Modine Manufacturing Company', nombre_corto: 'Modine', ticker: 'MOD', isin: 'US6078281002', mercado: 'NYSE', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Productos de construcción / equipos de climatización', sede: 'Racine (Wisconsin)', fundacion: '1916', empleados: null, web: 'https://www.modine.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 54.0, capitalizacion_publicada: null, free_float_pct: 98.0,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 271 M USD/día (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    guidance: 'Guía de FY2027 con Performance Technologies dentro todo el año (mantenida el 29-jul-2026): ventas +20-35 % y EBITDA ajustado de 650-680 M, con intereses de 24-27 M, impuestos de 130-140 M y amortizaciones de 87-92 M [A3]. La empresa dará una guía nueva sin Performance Technologies tras el cierre de la operación (1-oct-2026) [A3, D7]. Objetivo de centros de datos: crecer un 50-70 % anual en FY2027 y FY2028 y superar con holgura los 2.000 M de ventas en FY2028 [B2].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 3428, ebitda: null, ebit: null, bpa: 6.51, dpa: 0, fuente: 'Yahoo Finance, 3 analistas (mezcla: incluye Performance Technologies en el 1S) [2]' },
      { periodo: 'FY2028e', ingresos: 4139, ebitda: null, ebit: null, bpa: 10.16, dpa: 0, fuente: 'Yahoo Finance, 3 analistas (sin Performance Technologies) [2]' },
    ],
    recomendaciones: { n_analistas: 9, comprar: 9, mantener: 0, vender: 0, po_medio: 302.13, po_min: 260, po_max: 355 },
    revisiones: 'Recortes: el BPA de FY2027 bajó de 7,80 a 6,51 USD en 90 días y el de FY2028 de 11,33 a 10,16 USD [2], por el margen de centros de datos del 1T y, en parte, por pasar a la base sin Performance Technologies. Los objetivos (media 302 USD, 260-355) son en su mayoría de mayo-junio, con la acción a 250-320 USD [11, 3], y no se han ajustado a los 15 USD por acción que se llevaron los accionistas en acciones de Gentherm. Solo tres analistas tienen estimaciones completas en la fuente gratuita: se usa una sola fuente para el BPA y se contrasta el objetivo con Stock Analysis [3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: 5.9,
    comentario: null,
    contexto: null,
  },
  multiplos_historicos: {
    serie: [
      { anio: 'FY2022', precio_cierre: 9.01, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2023', precio_cierre: 23.05, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: 'FY2024', precio_cierre: 95.19, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2025', precio_cierre: 76.75, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: 'FY2026', precio_cierre: 216.71, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  comparables: {
    criterio: null,
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-01', objetivo: 'Modine Performance Technologies', comprador: 'Gentherm (fusión inversa)', ev: 1000, ev_ventas: 0.89, ev_ebitda: 8.1, prima_pct: null, excluir: true, comentario: 'Negocio escindido de la propia Modine (vehículos y maquinaria): no es comparable con centros de datos; 6,8 veces con sinergias [B2].' },
      { fecha: '2025-11', objetivo: 'Boyd Thermal', comprador: 'Eaton', ev: 9500, ev_ventas: 5.59, ev_ebitda: 22.5, prima_pct: null, excluir: false, comentario: 'Refrigeración líquida para centros de datos (1.500 M de 1.700 M de ventas de 2026); múltiplo sobre EBITDA ajustado estimado de 2026 [B6].' },
      { fecha: '2024-10', objetivo: 'Motivair (75 %)', comprador: 'Schneider Electric', ev: 1133, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '850 M por el 75 %; «un múltiplo medio de un dígito de las ventas previstas de 2025» [B7].' },
      { fecha: '2024-03', objetivo: 'Scott Springfield Manufacturing', comprador: 'Modine', ev: 184, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Unidades de tratamiento de aire (Canadá) [A2].' },
      { fecha: '2025-05', objetivo: 'L.B. White', comprador: 'Modine', ev: 111, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Calefacción especial (agricultura y construcción) [A2].' },
      { fecha: '2025-07', objetivo: 'Climate by Design International', comprador: 'Modine', ev: 64, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Deshumidificación por desecante y unidades de proceso [A2].' },
    ],
    comentario: null,
    confianza: 'Baja',
  },
  fuentes: fD,
};
NOTAS.D = D;

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $MOD (13-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/MOD' },
  { id: 2, titulo: 'Seeking Alpha: artículos de autores sobre Modine (jul-sep 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-02', url: 'https://seekingalpha.com/symbol/MOD/analysis' },
  { id: 3, titulo: 'Stocktwits, mensajes de $THRM de accionistas de Modine tras la escisión', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://stocktwits.com/symbol/THRM' },
];
const E = {
  _estado: 'Completo con poca profundidad: Reddit da 403; Stocktwits y titulares de autores de Seeking Alpha.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($MOD)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Tras dos días de caídas, unos compran «para la vuelta» (objetivos de 200-300 USD, «el nuevo Micron») y otros miran soportes en 150 y 120 USD; quejas de «manipulación» [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 6, tono: 'Positivo', resumen: 'Títulos de julio-septiembre: «la caída es un regalo», «un desplome que merece comprarse: riesgos temporales de suministro, margen y ejecución», frente a «una apuesta de alto riesgo a medio plazo» [2].' },
      { plataforma: 'Stocktwits ($THRM)', fecha: '2026-10', n_comentarios: 5, tono: 'Neutro', resumen: 'Accionistas que recibieron acciones de Gentherm comentan que aguantan mejor que Modine [3].' },
    ],
    temas: [
      { tema: 'Margen de centros de datos', postura: 'Dividida', peso: 'Alto', contraste: 'Los datos dan la razón a la duda: margen bruto del 20,2 % frente al 29,8 % un año antes [A3]; la empresa promete mejoras secuenciales.' },
      { tema: 'Burbuja o ciclo de inversión en IA', postura: 'Dividida', peso: 'Alto', contraste: 'Las ventas de centros de datos crecen un 90 % [A3], pero el precio ya ha caído un 51 % desde máximos [D6]: el mercado duda de la duración.' },
      { tema: 'Mecánica de la escisión', postura: 'Bajista', peso: 'Medio', contraste: 'Parte de la caída de septiembre-octubre son los ≈15 USD por acción en acciones de Gentherm que se llevaron los accionistas [D7], no una pérdida.' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
};
NOTAS.E = E;

// Citas con letra ([A2], [B1, D7]) o propias ([3]) -> números de la lista de cada nota (añade las fuentes ajenas).
const LISTAS = { A: fA, B: fB, C: fC, D: fD, E: fE };
for (const [L, nota] of Object.entries(NOTAS)) {
  const lista = nota.fuentes;
  const mapa = new Map();
  const idDe = (ref) => {
    const m = ref.trim().match(/^([A-E])?(\d+)$/);
    if (!m) return ref;
    const letra = m[1] ?? L, n = Number(m[2]);
    if (letra === L) return String(n);
    const clave = letra + n;
    if (!mapa.has(clave)) {
      const f = LISTAS[letra].find((x) => x.id === n);
      if (!f) throw new Error(`Fuente ${clave} no existe (nota ${L})`);
      const ya = lista.find((x) => x.url === f.url && x.titulo === f.titulo);
      if (ya) mapa.set(clave, ya.id); else { const id = lista.length + 1; lista.push({ ...f, id }); mapa.set(clave, id); }
    }
    return String(mapa.get(clave));
  };
  const recorre = (v, top = false) => {
    if (typeof v === 'string') return v.replace(/\[([A-E]?\d+(?:\s*[,-]\s*[A-E]?\d+)*)\]/g, (_, dentro) => '[' + dentro.split(',').map((r) => r.includes('-') ? r.split('-').map(idDe).join('-') : idDe(r)).join(', ') + ']');
    if (Array.isArray(v)) return v.map((x) => recorre(x));
    if (v && typeof v === 'object') { for (const k of Object.keys(v)) if (!(top && k === 'fuentes')) v[k] = recorre(v[k]); return v; }
    return v;
  };
  recorre(nota, true);
  guarda(L, nota);
}
console.log('Notas A-E escritas.');
