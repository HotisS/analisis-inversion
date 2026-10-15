// Escribe las notas A-E de KLA (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json y companyfacts),
// el 10-K del FY2026, las notas de resultados (8-K 99.1), el proxy de 2026, bolsa.mjs, form4.mjs, MarketScreener,
// Stock Analysis y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
// Ejercicio a junio (FY2026 = jul-2025 a jun-2026). Split 10:1 el 11-jun-2026: los años FY2019-FY2023 del XBRL vienen
// en acciones de antes del split y se pasan a acciones de hoy (BPA y DPA ÷ 10, acciones × 10).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E = 'https://www.sec.gov/Archives/edgar/data/319201';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ANIOS = ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
const PRESPLIT = new Set(['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023']);

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2026 (cerrado el 30-jun-2026): cuentas auditadas, segmentos, regiones, clientes > 10 %, cartera de pedidos, deuda, factoring', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000031920126000027/klac-20260630.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos FY2017-FY2026, I+D, deterioros, pasivos de contrato, valores negociables, pagos en acciones', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000319201.json' },
  { id: 3, titulo: 'KLA Corporation Reports Fiscal 2026 Fourth Quarter and Full Year Results (8-K, anexo 99.1)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-28', url: `${E}/000031920126000024/exhibit991earningsrelease7.htm` },
  { id: 4, titulo: 'KLA Corporation Reports Fiscal 2026 Third Quarter Results (8-K, anexo 99.1)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-29', url: `${E}/000031920126000014/exhibit991earningsrelease3.htm` },
  { id: 5, titulo: 'Form 8-K: split de 10 por 1 efectivo el 11-jun-2026 (Item 5.03)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-06-12', url: `${E}/000119312526269375/d144278d8k.htm` },
  { id: 6, titulo: 'KLA (KLAC) Q4 2026 Earnings Call Transcript y nota «KLA forecasts $4B September-quarter revenue as it lifts 2026 wafer equipment view to low $150B range»', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://seekingalpha.com/symbol/KLAC/earnings/transcripts' },
  { id: 7, titulo: 'Form 8-K: dividendo trimestral de 0,23 USD por acción (post-split)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000119312526338242/d165938dex991.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// Del companyfacts [A2]: I+D, deterioros de fondo de comercio e intangibles, intereses y otros ingresos financieros.
const ID = { FY2019: 711.0, FY2020: 863.9, FY2021: 928.5, FY2022: 1105.3, FY2023: 1296.7, FY2024: 1279.0, FY2025: 1360.3, FY2026: 1532.1 };
const DET = { FY2019: 0, FY2020: 256.6, FY2021: 0, FY2022: 6.0, FY2023: 9.9, FY2024: 289.5, FY2025: 239.1, FY2026: 0 };
// Pasivos de contrato totales (ingresos diferidos de sistemas y de servicio, corto + largo) y activos de contrato
const PCON = { FY2019: 587.8, FY2020: 666.1, FY2021: 667.7, FY2022: 1007.3, FY2023: 1245.0, FY2024: 1782.2, FY2025: 1713.7, FY2026: 1775.1 };
// Valores negociables disponibles para la venta (corto y largo plazo) que se suman a la caja
const VAL = { FY2019: 723.4, FY2020: 746.1, FY2021: 1059.9, FY2022: 1123.1, FY2023: 713.2, FY2024: 2501.3, FY2025: 2391.8, FY2026: 3205.8 };
const RET = { FY2019: 37.5, FY2020: 46.3, FY2021: 56.4, FY2022: 84.4, FY2023: 94.8, FY2024: 143.0, FY2025: 132.7, FY2026: 205.0 };

const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const ebit = r1(c.ingresos - c.coste_ventas - c.gastos_generales - ID[y] - DET[y]);
  const k = PRESPLIT.has(y) ? 10 : 1;
  return {
    periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales,
    ebitda: r1(ebit + c.amortizaciones + DET[y]), amortizaciones: c.amortizaciones, ebit,
    resultado_financiero: r1(c.bai - ebit), bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios ?? 0,
    beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros, participadas_en_ebitda: null,
    no_recurrentes_en_ebitda: null, bpa: r2(c.bpa / k), dpa: r2(c.dpa / k), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * k),
  };
});
// Los deterioros (FY2020 Orbotech/PCB, FY2024-FY2025 PCB) van por debajo del EBITDA: el EBITDA es EBIT + amortizaciones + deterioros.
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: b.activos_contrato ?? null, pasivos_contrato: PCON[y], caja: r1(b.caja + VAL[y]), deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: r1(f.recompras + RET[y]), emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});
// Trimestres: ingresos y beneficio neto del XBRL [A2] y de las notas [A3, A4]; BPA del 3T26, 4T26 y 4T25 publicado (post-split),
// el resto = beneficio neto ÷ acciones diluidas medias del ejercicio (estimación propia).
const T = [
  ['1T25', 2841.5, 18.5, 945.9, 0.70], ['2T25', 3076.9, 23.7, 824.5, 0.61], ['3T25', 3063.0, 29.8, 1088.4, 0.82], ['4T25', 3174.8, 23.6, 1202.8, 0.91],
  ['1T26', 3209.7, 13.0, 1121.0, 0.85], ['2T26', 3297.1, 7.2, 1145.7, 0.87], ['3T26', 3415.1, 11.5, 1201.0, 0.91], ['4T26', 3657.6, 15.2, 1363.1, 1.04],
];
const trimestres = { items: T.map(([periodo, ingresos, crec, , bpa]) => ({ periodo, ingresos, crecimiento_pct: crec, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa, vs_consenso: periodo === '4T26' || periodo === '3T26' ? 'Superior' : null })), confianza: 'Alta' };
const segH = (a, b, c) => [{ periodo: 'FY2024', ingresos: a[0], resultado: a[1] }, { periodo: 'FY2025', ingresos: b[0], resultado: b[1] }, { periodo: 'FY2026', ingresos: c[0], resultado: c[1] }];
const negocio = {
  segmentos: [
    { nombre: 'Control de procesos de semiconductores', descripcion: 'Inspección de obleas y retículas, metrología, software de rendimiento y servicio de la base instalada.', tipo_resultado: 'EBIT', historico: segH([8733.6, 3767.6], [10947.4, 5002.7], [12244.7, 5482.8]) },
    { nombre: 'Procesos de semiconductores especiales', descripcion: 'Equipos de deposición y grabado al vacío (SPTS) para MEMS, radiofrecuencia y potencia.', tipo_resultado: 'EBIT', historico: segH([528.7, 90.8], [587.1, 99.0], [584.1, 64.6]) },
    { nombre: 'Inspección de PCB y componentes', descripcion: 'Inspección, prueba e imagen directa para placas de circuito impreso, encapsulado avanzado y pantallas (Orbotech).', tipo_resultado: 'EBIT', historico: segH([552.5, -470.3], [621.7, -281.2], [750.4, 108.0]) },
  ],
  geografias: [
    { nombre: 'China', peso_pct: 29.8 }, { nombre: 'Taiwán', peso_pct: 26.8 }, { nombre: 'Corea', peso_pct: 13.5 }, { nombre: 'Norteamérica', peso_pct: 13.0 },
    { nombre: 'Japón', peso_pct: 6.7 }, { nombre: 'Europa e Israel', peso_pct: 5.4 }, { nombre: 'Resto de Asia', peso_pct: 4.8 },
  ],
  geografias_criterio: 'destino',
  kpis: [
    { kpi: 'Cartera de pedidos', valor_anterior: '7.860 M USD (jun-25)', valor_actual: '12.570 M USD (jun-26)', variacion: '+60 %', comentario: 'Pedidos por la construcción de infraestructura de IA [1].' },
    { kpi: 'Ingresos de servicios', valor_anterior: '2.683 M USD', valor_actual: '3.126 M USD (23 % del total)', variacion: '+16,5 %', comentario: 'Base instalada que crece y se cobra con contratos [1, 3].' },
    { kpi: 'Inspección de obleas', valor_anterior: '6.199 M USD (51 %)', valor_actual: '6.631 M USD (49 %)', variacion: '+7,0 %', comentario: 'Mayor categoría de producto [1].' },
    { kpi: 'Patterning (retículas y metrología)', valor_anterior: '2.196 M USD (18 %)', valor_actual: '2.707 M USD (20 %)', variacion: '+23,2 %', comentario: 'Metrología de capas y retículas para EUV [1].' },
    { kpi: 'Margen bruto GAAP', valor_anterior: '60,9 %', valor_actual: '61,3 %', variacion: '+0,4 pp', comentario: 'Guía 1T27: 61,6 % ± 1 pp [3].' },
    { kpi: 'Peso de China en ventas', valor_anterior: '33,3 %', valor_actual: '29,8 %', variacion: '−3,5 pp', comentario: 'Plano en dólares por las restricciones a la exportación [1].' },
  ],
  confianza: 'Alta',
};
guarda('A', {
  _estado: 'completa',
  financieros: { cuenta, ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 13579.5, ebitda: cuenta.at(-1).ebitda, ebit: cuenta.at(-1).ebit, beneficio_neto: 4830.8, bpa: 3.66, dpa: 0.8, dpa_extraordinario: 0, fcf: 3767.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null }, cambios_perimetro: [], confianza: 'Alta' },
  trimestres, balance: { historico, vencimientos: [{ anio: '2029', importe: 750 }, { anio: '2030-2035', importe: 2200 }, { anio: '2036+', importe: 3000 }], liquidez: 'Caja 1.650 M + valores negociables 3.206 M = 4.856 M USD a 30-jun-2026, más una línea de crédito revolving sin disponer [1].', rating: 'Fitch A; Moody\'s y S&P en grado de inversión (tabla del 10-K) [1]', coste_deuda_pct: 4.8, vida_media_anios: null, confianza: 'Media' },
  flujos: { historico: flujos, confianza: 'Alta' },
  negocio,
  calidad: { auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 49, opinion: 'Favorable (cuentas y control interno a 30-jun-2026)', confianza: 'Alta' },
  fuentes: fA, huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) XBRL companyfacts: la amortización trimestral solo está en algunos trimestres; 2) notas de resultados 8-K: solo dan la amortización del trimestre del 4T; 3) derivarlo con amortización anual ÷ 4: descartado por impreciso', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vencimientos exactos por bono', tipo: 'Complemento', intentos: '1) 10-K FY2026 nota 7: tabla en texto no extraíble limpio; 2) companyfacts: solo el total; 3) 10-K: «vencimientos de 2029 a 2063», 5.950 M de principal', decision: 'Calculado y marcado como estimación' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026: Item 1 (negocio, competencia, clientes), Item 1A (riesgos de exportación a China)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000031920126000027/klac-20260630.htm` },
  { id: 2, titulo: 'Global Semiconductor Equipment Sales Forecast to Reach a Record $229 Billion in 2028', editor: 'SEMI', tipo: 'Sectorial', fecha: '2026-07', url: 'https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-sales-forecast-to-reach-a-record-229-billion-dollars-in-2028-semi-reports' },
  { id: 3, titulo: 'Semiconductor Process Control Equipment Market Size (12.600 M USD en 2025; 8,1 % anual a 2035)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/semiconductor-process-control-equipment-market' },
  { id: 4, titulo: 'KLAC equity report (cuota de ≈60 % en control de procesos)', editor: 'Henry Fund, University of Iowa', tipo: 'Analistas', fecha: '2026-04', url: 'https://henryfund.tippie.uiowa.edu/sites/henryfund.tippie.uiowa.edu/files/2026-04/KLAC-S26.pdf' },
  { id: 5, titulo: 'Form 8-K: día del inversor del 12-mar-2026, dividendo de 2,30 USD (pre-split) y recompra de 7.000 M', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-12', url: `${E}/000119312526102999/d105235d8k.htm` },
  { id: 6, titulo: 'Applied Materials (AMAT) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/amat/statistics/' },
  { id: 7, titulo: 'Lam Research (LRCX) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lrcx/statistics/' },
  { id: 8, titulo: 'Onto Innovation (ONTO) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/onto/statistics/' },
  { id: 9, titulo: 'Nova Ltd. (NVMI) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/nvmi/statistics/' },
  { id: 10, titulo: 'Is KLA the Biggest Process Control Winner From AI Spending? (cuota del 58 % en 2025 según el día del inversor; objetivos 2030)', editor: 'Nasdaq / Zacks', tipo: 'Prensa', fecha: '2026', url: 'https://www.nasdaq.com/articles/kla-biggest-process-control-winner-ai-spending' },
];
guarda('B', {
  _estado: 'completa',
  sector: {
    tamano: '≈ 21.000 M USD de control de procesos en el ejercicio 2026 (estimación propia: ventas del segmento de KLA ÷ cuota del 58 %), dentro de un WFE de ≈ 150.000 M USD en 2026 [2, 10]',
    unidad_serie: 'millones de USD (WFE mundial, SEMI y guía de KLA)',
    serie: [{ anio: '2024', tamano: 104000 }, { anio: '2025', tamano: 116900 }, { anio: '2026e', tamano: 150000 }, { anio: '2027e', tamano: 175000 }, { anio: '2028e', tamano: 200000 }],
    tcac_historico_pct: 11.0, tcac_previsto_pct: 12.0, cr5_pct: 90, estructura: 'Concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 58, posicion: '1.º mundial en control de procesos de semiconductores (58 % en 2025, +3,6 pp desde 2021); en grabado y deposición especial (SPTS) y en inspección de PCB es un actor de nicho [10, 1].',
    competidores: [
      { nombre: 'Applied Materials', pais: 'EE. UU.', ticker: 'AMAT', ingresos: 30840, cuota_pct: 12, margen_ebit_pct: null, comentario: 'Líder de WFE; compite en inspección por haz de electrones (eBeam) y metrología [1, 6].' },
      { nombre: 'Hitachi High-Tech', pais: 'Japón', ticker: null, ingresos: null, cuota_pct: 10, margen_ebit_pct: null, comentario: 'Metrología CD-SEM; filial de Hitachi, sin cuentas separadas comparables [1].' },
      { nombre: 'ASML (HMI)', pais: 'Países Bajos', ticker: 'ASML', ingresos: 40290, cuota_pct: 5, margen_ebit_pct: null, comentario: 'Inspección eBeam y metrología de superposición integrada con la litografía [1].' },
      { nombre: 'Onto Innovation', pais: 'EE. UU.', ticker: 'ONTO', ingresos: 1120, cuota_pct: 5, margen_ebit_pct: null, comentario: 'Metrología e inspección para encapsulado avanzado; EBITDA ≈ 28 % de las ventas [8].' },
      { nombre: 'Nova', pais: 'Israel', ticker: 'NVMI', ingresos: 938, cuota_pct: 4, margen_ebit_pct: null, comentario: 'Metrología óptica y química integrada; EBITDA ≈ 32 % de las ventas [9].' },
      { nombre: 'Lasertec', pais: 'Japón', ticker: '6920', ingresos: null, cuota_pct: 3, margen_ebit_pct: null, comentario: 'Inspección de máscaras EUV (actínica), donde compite con KLA [1].' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [{ seccion: 'competencia', campo: 'margen EBIT de los competidores y cuotas exactas', tipo: 'Complemento', intentos: '1) 10-K de KLA: nombra competidores sin cuotas; 2) Stock Analysis: da EBITDA y ventas, no EBIT de forma homogénea; 3) cuotas de Gartner/TechInsights: de pago', decision: 'Omitido (cuotas de los rivales: estimación propia del orden de magnitud)' }],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, remuneración, ratio de remuneración, accionistas significativos', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-22', url: `${E}/000119312526397898/d83268ddef14a.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 5-nov-2025 (Item 5.07)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2025-11-07', url: `${E}/000119312525272448/d30340d8k.htm` },
  { id: 3, titulo: 'Form 4 de KLA presentados entre el 15-oct-2025 y el 15-oct-2026 (57 presentaciones, 102 operaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000319201&type=4' },
  { id: 4, titulo: 'Form 10-K FY2026 (Item 10, directivos; nota de deuda y calificaciones)', editor: 'KLA Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-06', url: `${E}/000031920126000027/klac-20260630.htm` },
];
const cons = (nombre, cargo, tipo, comisiones) => ({ nombre, cargo, tipo, desde: null, comisiones });
guarda('C', {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Richard P. Wallace', cargo: 'Presidente ejecutivo (President) y consejero delegado', desde: '2006', participacion_pct: 0.05, trayectoria: 'En KLA desde 1988; consejero delegado desde 2006. Con él las ventas pasaron de 2.000 a 13.580 M USD y la cuota en control de procesos subió hasta el 58 % [1, 4].' },
      { nombre: 'Bren D. Higgins', cargo: 'Director financiero (EVP & CFO)', desde: '2013', participacion_pct: 0.01, trayectoria: 'En KLA desde 1999; director financiero desde 2013. Ha llevado la política de devolver ≈ 85 % del flujo libre en dividendos y recompras [1, 4].' },
      { nombre: 'Robert Calderoni', cargo: 'Presidente del consejo (no ejecutivo, independiente)', desde: null, participacion_pct: null, trayectoria: 'Más de 30 años de ejecutivo en tecnología (ex consejero delegado de Ariba y de Citrix) [1].' },
      { nombre: 'Ahmad A. Khan', cargo: 'President, Semiconductor Products & Customers', desde: null, participacion_pct: null, trayectoria: 'Responsable de los productos de semiconductores y de la relación con los grandes clientes [1, 3].' },
      { nombre: 'Brian Lorig', cargo: 'EVP, KLA Global Services', desde: null, participacion_pct: null, trayectoria: 'Dirige servicios, 23 % de las ventas del FY2026 [1, 3].' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Robert Calderoni', 'Presidente', 'Independiente', 'Nombramientos y Gobierno'),
      cons('Richard P. Wallace', 'Consejero delegado', 'Ejecutivo', '—'),
      cons('Jason Conley', 'Consejero', 'Independiente', 'Auditoría'),
      cons('Tracy Embree', 'Consejera', 'Independiente', 'Remuneración y Talento'),
      cons('Jeneanne Hanley', 'Consejera', 'Independiente', 'Nombramientos y Gobierno'),
      cons('Kevin Kennedy', 'Consejero', 'Independiente', 'Auditoría'),
      cons('Michael McMullen', 'Consejero', 'Independiente', 'Remuneración y Talento (presidente)'),
      cons('Victor Peng', 'Consejero', 'Independiente', 'Nombramientos y Gobierno'),
      cons('Jamie Samath', 'Consejero', 'Independiente', 'Auditoría'),
      cons('Susan Taylor', 'Consejera', 'Independiente', 'Auditoría'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.4, voto_remuneracion_contra_pct: 7.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2026', total: 29.95, fijo: 1.28, variable_corto: 5.13, variable_largo: null, ratio_salario_medio: 300 },
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 8.8, tipo: 'Institucional (13G)', variacion: 'Sin cambios declarados desde el 13G de enero de 2024' },
      { nombre: 'Vanguard Capital Management', pct: 7.5, tipo: 'Institucional (13G)', variacion: '13G de abril de 2026' },
      { nombre: 'Consejeros y directivos (15 personas)', pct: 0.1, tipo: 'Consejo y dirección', variacion: 'Ventas netas de 112 M USD en 12 meses, casi todas con planes 10b5-1' },
    ],
    insiders: [
      { fecha: '2026-10-15', persona: 'Richard P. Wallace (consejero delegado), 12 meses', operacion: 'Venta', acciones: null, importe: 60.88 },
      { fecha: '2026-10-15', persona: 'Bren D. Higgins (director financiero), 12 meses', operacion: 'Venta', acciones: null, importe: 16.76 },
      { fecha: '2026-10-15', persona: 'Brian Lorig (EVP Servicios), 12 meses', operacion: 'Venta', acciones: null, importe: 12.40 },
      { fecha: '2026-10-15', persona: 'Mary Beth Wilkinson (EVP, Legal), 12 meses', operacion: 'Venta', acciones: null, importe: 12.28 },
      { fecha: '2026-10-15', persona: 'Ahmad A. Khan (President Semi), 12 meses', operacion: 'Venta', acciones: null, importe: 6.60 },
      { fecha: '2026-10-15', persona: 'Jeneanne Hanley (consejera), 12 meses', operacion: 'Venta', acciones: null, importe: 1.03 },
    ],
    alertas: ['Ventas de directivos de 112 M USD en 12 meses (110,7 M con planes 10b5-1 programados) y ninguna compra en mercado [3].', 'Exposición regulatoria a las restricciones de exportación de EE. UU. a China (29,8 % de las ventas) [4].'],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [{ seccion: 'gobierno', campo: 'consejo.desde (año de nombramiento) y variable a largo plazo del consejero delegado', tipo: 'Complemento', intentos: '1) proxy 2026: tabla de consejeros en formato gráfico no extraíble; 2) 8-K de votos: solo nombres; 3) tabla resumen de remuneración: no se separó limpia del texto', decision: 'Omitido (variable a largo plazo ≈ total − fijo − bonus, unos 23 M USD, estimación no impresa)' }],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de KLAC, SPY y SOXX (precio, rango, betas, rentabilidades, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/KLAC/history' },
  { id: 2, titulo: 'KLA Corporation: finances y consenso (30 analistas, objetivo medio 232,77 USD)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://uk.marketscreener.com/quote/stock/KLA-CORPORATION-102616480/finances/' },
  { id: 3, titulo: 'KLA (KLAC) Stock Forecast & Price Targets', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/klac/forecast/' },
  { id: 4, titulo: 'KLA (KLAC) Statistics (capitalización, posición corta, próxima publicación 28-oct)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/klac/statistics/' },
  { id: 5, titulo: 'Applied Materials (AMAT) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/amat/statistics/' },
  { id: 6, titulo: 'Lam Research (LRCX) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lrcx/statistics/' },
  { id: 7, titulo: 'ASML Holding (ASML) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/asml/statistics/' },
  { id: 8, titulo: 'Onto Innovation (ONTO) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/onto/statistics/' },
  { id: 9, titulo: 'Nova Ltd. (NVMI) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/nvmi/statistics/' },
  { id: 10, titulo: 'Teradyne (TER) Statistics', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/ter/statistics/' },
  { id: 11, titulo: '10-Year Treasury Constant Maturity Rate (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 12, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 13, titulo: 'KLA Corporation Stock Fell 12% in a Day to $236. Here\'s What July 28 Earnings Have to Prove', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07-03', url: 'https://www.tikr.com/blog/kla-corporation-stock-fell-12-in-a-day-to-236-heres-what-july-28-earnings-have-to-prove' },
  { id: 14, titulo: 'KLA falls despite Q4 beat as analysts point to high expectations', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://seekingalpha.com/symbol/KLAC/news' },
  { id: 15, titulo: 'KLA Corporation (KLAC): cotización, objetivo medio 233,77 USD (19 Comprar) y caída del 30-ene-2026 por plazos de entrega', editor: 'Investing.com', tipo: 'Analistas', fecha: '2026-10-02', url: 'https://za.investing.com/equities/kla-tencor-corp' },
  { id: 16, titulo: 'Movimiento del precio de KLAC (1-12 meses, máximos y mínimos, media de 200, avisos P1-P5)', editor: 'Yahoo Finance (herramientas/movimiento.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/KLAC/chart' },
  { id: 17, titulo: 'Bipartisan chip export bills face delay in reaching US Senate floor for vote: report', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://seekingalpha.com/symbol/KLAC/news' },
  { id: 18, titulo: 'KLAC Shares Tumble Despite Q4 Beat Amid Underwhelming Guidance', editor: 'Sentisense', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://app.sentisense.ai/stories/klac-shares-tumble-despite-q4-beat-amid-underwhelming-guidance-07292026' },
];
const comp = (nombre, ticker, pais, cap, ev, rev, ebitda, per, roic, cash, fcfy) => ({ nombre, ticker, pais, capitalizacion: cap, ev_ventas: r2(ev / rev), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: null, per_ntm: per, crecimiento_pct: null, margen_ebitda_pct: r1((ebitda / rev) * 100), roic_pct: roic, dn_ebitda: r2(-cash / ebitda), fcf_yield_pct: fcfy });
const B = BOLSA.bolsa;
guarda('D', {
  _estado: 'completa',
  identificacion: {
    nombre: 'KLA Corporation', nombre_corto: 'KLA', ticker: 'KLAC', isin: 'US4824801009', mercado: 'Nasdaq Global Select (USD)', indice_referencia: 'S&P 500 / Nasdaq-100',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Equipos y productos de semiconductores', sede: 'Milpitas (California)', fundacion: '1975', empleados: 17000, web: 'https://www.kla.com',
    precio: 178.81, fecha_precio: '2026-10-14', acciones: 1312, capitalizacion_publicada: 225610, free_float_pct: 99.9,
    max_52s: 307.37, min_52s: 107.2, volumen_medio_diario: '≈ 1.921 M USD/día (3 meses)', proximos_resultados: '2026-10-28',
  },
  consenso: {
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 18142, ebitda: 8764, ebit: 8436, bpa: 5.38, dpa: 0.96, fuente: 'MarketScreener (30 analistas) [2]' },
      { periodo: 'FY2028e', ingresos: 21575, ebitda: 10615, ebit: 10163, bpa: 6.69, dpa: 1.09, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 24970, ebitda: 12268, ebit: 11770, bpa: 7.99, dpa: 1.21, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 30, comprar: 18, mantener: 10, vender: 2, po_medio: 232.77, po_min: 175, po_max: 325 },
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.3,
    confianza: 'Media',
  },
  bolsa: { tipo_rentabilidad: B.tipo_rentabilidad, rentabilidades: B.rentabilidades, anual: B.anual, beta: B.beta, volatilidad_pct: B.volatilidad_pct, max_drawdown_pct: B.max_drawdown_pct, posicion_corta_pct: 1.86, confianza: 'Alta' },
  multiplos_historicos: { serie: [['FY2019', 11.82], ['FY2020', 19.45], ['FY2021', 32.42], ['FY2022', 31.91], ['FY2023', 48.5], ['FY2024', 82.45], ['FY2025', 89.57], ['FY2026', 301.71]].map(([anio, p]) => ({ anio, precio_cierre: p, ev_ebitda_ntm: null, per_ntm: null, excluir: false })), confianza: 'Alta' },
  comparables: {
    empresas: [
      comp('Applied Materials', 'AMAT', 'US', 340620, 338730, 30840, 10160, 25.36, 35.64, 1890, 1.66),
      comp('Lam Research', 'LRCX', 'US', 340530, 339070, 23230, 8640, 30.28, 70.07, 1460, 1.36),
      comp('ASML', 'ASML', 'NL', 648210, 641980, 40290, 15380, 26.87, 65.98, 6380, 1.72),
      comp('Onto Innovation', 'ONTO', 'US', 11020, 10610, 1120, 309, 21.71, 12.61, 410, 2.13),
      comp('Nova', 'NVMI', 'IL', 10260, 9350, 937.5, 296.3, 25.93, 19.75, 903, 1.84),
      comp('Teradyne', 'TER', 'US', 52440, 52020, 4460, 1500, 34.42, 38.24, 417, 1.51),
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones precedentes con múltiplo', tipo: 'Complemento', intentos: '1) 10-K FY2026: KLA no ha hecho compras relevantes desde Orbotech (2019) y no da múltiplos; 2) búsqueda de compras en equipos de semiconductores 2019-2026 (Orbotech, Kokusai-AMAT cancelada, Nova-Sentronics): sin EBITDA publicado del objetivo; 3) prensa: múltiplos de prensa no conciliables', decision: 'Omitido (sección a null; peso 0)' },
    { seccion: 'comparables', campo: 'crecimiento esperado y EV/EBITDA NTM de los comparables', tipo: 'Complemento', intentos: '1) Stock Analysis statistics: solo LTM; 2) Stock Analysis forecast: FY2028 de pago; 3) MarketScreener: un comparable por consulta, no a la misma fecha', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $KLAC (6-15 oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/KLAC.json' },
  { id: 2, titulo: 'Seeking Alpha, artículos y noticias de KLAC (jul-oct 2026: «Fundamentals Are Strong, But The Stock Needs More», «Limited Margin Of Safety», «After A Punishing July, KLA Stock Is Now A Buy»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/KLAC.xml' },
];
guarda('E', {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($KLAC)', fecha: '2026-10', n_comentarios: 25, tono: 'Dividido', resumen: 'Mezcla de compradores «en la corrección» y de quejas por la caída del sector tras la jornada de Applied Materials y los titulares sobre China [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 8, tono: 'Dividido', resumen: 'Los artículos de septiembre coinciden en que el negocio es fuerte pero discuten el margen de seguridad; agosto trajo mejoras de recomendación tras la caída de julio [2].' },
    ],
    temas: [
      { tema: 'Valoración frente al crecimiento de 2027', postura: 'Dividida', peso: 'Alto', contraste: 'El precio cotiza a ≈ 33x el BPA de consenso del FY2027: ya descuenta el año fuerte; el informe coincide en que el margen de seguridad es escaso.' },
      { tema: 'China y controles de exportación', postura: 'Bajista', peso: 'Medio', contraste: 'China es el 29,8 % de las ventas y se quedó plana en el FY2026; hay leyes de exportación pendientes en el Senado sin fecha.' },
      { tema: 'Ciclo de inversión en IA y memoria', postura: 'Alcista', peso: 'Alto', contraste: 'Cartera de pedidos de 12.570 M (+60 %) y guía de 4.000 M en el 1T27 apoyan el año; el riesgo es 2028.' },
    ],
    lectura: 'Los particulares están divididos entre comprar la caída (−42 % desde el máximo de junio) y el miedo a haber visto el pico del ciclo de la IA; los autores de Seeking Alpha coinciden con este informe en que el negocio es excelente y el margen de seguridad escaso [E1, E2]. El sentimiento no es extremo ni contradice a los analistas (Comprar mayoritario): no cambia la decisión, que depende de la guía del 28-oct.'.replace(/\[E/g, '['),
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y foros con debate extenso', tipo: 'Complemento', intentos: '1) Reddit: 403 desde la nube; 2) Stocktwits web: 403 (sí la API); 3) RSS de Seeking Alpha: titulares sin comentarios', decision: 'Omitido' }],
});
console.log('Notas A-E escritas');
