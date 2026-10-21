// Escribe las notas A-E de Lam Research (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json),
// las notas de prensa de resultados (8-K 99.1), el 10-K FY2026, el proxy de 2026, bolsa.mjs, form4.mjs,
// Stock Analysis, la nota D del informe de VAT (comparables del 6-oct) y foros. Cada nota cita con su propia lista.
// Ejecutar: node informes/lam-research-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/707549';
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const ANIOS = ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'];
// Desdoblamiento 10x del 2-oct-2024: los años FY2022 y anteriores del XBRL vienen sin reexpresar.
const SPLIT = { FY2019: 10, FY2020: 10, FY2021: 10, FY2022: 10 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 28-jun-2026): cuentas auditadas, ingresos por región y por tipo, clientes > 10 %, deuda, recompras, empleados', editor: 'Lam Research Corporation / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-07', url: `${E8}/000070754926000037/lrcx-20260628.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos FY2017-FY2026', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000707549.json' },
  { id: 3, titulo: 'Lam Research Corporation Reports Financial Results for the Quarter Ended June 28, 2026 (8-K, anexo 99.1)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000070754926000033/lrcx_exhibitx991xq4x2026.htm` },
  { id: 4, titulo: 'Lam Research Corporation Reports Financial Results for the Quarter Ended March 29, 2026 (8-K, anexo 99.1)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-22', url: `${E8}/000070754926000020/lrcx_exhibitx991xq3x2026.htm` },
  { id: 5, titulo: 'Lam Research Corporation Reports Financial Results for the Quarter Ended December 28, 2025 (8-K, anexo 99.1)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-28', url: `${E8}/000070754926000006/lrcx_exhibitx991xq2x2026.htm` },
  { id: 6, titulo: 'Lam Research Corporation Reports Financial Results for the Quarter Ended September 28, 2025 (8-K, anexo 99.1)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-22', url: `${E8}/000070754925000082/lrcx_exhibitx991xq1x2026.htm` },
  { id: 7, titulo: 'Lam Research Q4 Earnings Call Highlights (WFE 2026 en la parte baja de 150.000 M USD, mezcla de sistemas por segmento, marco de margen a largo plazo)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.marketbeat.com/instant-alerts/lam-research-q4-earnings-call-highlights-2026-07-29/' },
];

const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));

const cuenta = ANIOS.map((y) => {
  const c = cx[y]; const s = SPLIT[y] || 1;
  return {
    periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda,
    amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos,
    minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros,
    participadas_en_ebitda: null, no_recurrentes_en_ebitda: null,
    bpa: r2(c.bpa / s), dpa: r2(c.dpa / s), dpa_extraordinario: 0, acciones_diluidas: r1(c.acciones_diluidas * s),
  };
});
const deudaFY26 = 3730.5 + 4.1; // largo plazo + porción corriente (incluye arrendamientos financieros), 10-K FY2026 [1]
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return {
    periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
    fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias,
    clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: b.pasivos_contrato, caja: b.caja,
    deuda_financiera: y === 'FY2026' ? r1(deudaFY26) : b.deuda_financiera, arrendamientos: b.arrendamientos ?? 0,
    patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
  };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones, intereses_en_financiacion: 0 };
});

const A = {
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26 (FY2026)', fecha_fin: '2026-06-28', ingresos: 23232.7, ebitda: 8641.3, ebit: 8199.8, beneficio_neto: 7265.4, bpa: 5.76, dpa: 1.04, dpa_extraordinario: 0, fcf: r1(5857.7 - 966.4), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1T FY25', ingresos: 4168.0, crecimiento_pct: 19.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.86, vs_consenso: null },
      { periodo: '2T FY25', ingresos: 4376.0, crecimiento_pct: 16.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.92, vs_consenso: null },
      { periodo: '3T FY25', ingresos: 4720.2, crecimiento_pct: 24.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.03, vs_consenso: null },
      { periodo: '4T FY25', ingresos: 5171.4, crecimiento_pct: 33.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.35, vs_consenso: null },
      { periodo: '1T FY26', ingresos: 5324.2, crecimiento_pct: 27.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.24, vs_consenso: null },
      { periodo: '2T FY26', ingresos: 5344.8, crecimiento_pct: 22.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.26, vs_consenso: null },
      { periodo: '3T FY26', ingresos: 5841.5, crecimiento_pct: 23.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.45, vs_consenso: null },
      { periodo: '4T FY26', ingresos: 6722.2, crecimiento_pct: 30.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.81, vs_consenso: 'Superior' },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico,
    vencimientos: [
      { anio: 'FY2027', importe: 0 }, { anio: 'FY2028', importe: 0 }, { anio: 'FY2029', importe: 1000 }, { anio: 'FY2030', importe: 750 }, { anio: 'FY2031', importe: 0 }, { anio: 'FY2032+', importe: 2000 },
    ],
    liquidez: 'Caja 5.579 M USD a 28-jun-2026 [1] + línea de crédito no dispuesta de 2.000 M USD (vence en enero de 2030, ampliable a 2.750 M) que respalda un programa de pagarés de hasta 2.000 M USD sin saldo vivo [1].',
    rating: null,
    coste_deuda_pct: 3.4,
    vida_media_anios: 16.2,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  negocio: {
    segmentos: [
      { nombre: 'Sistemas (equipos nuevos de vanguardia)', descripcion: 'Grabado, deposición y limpieza para fábricas de vanguardia [1].', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 8921.7, resultado: null }, { periodo: 'FY2025', ingresos: 11491.3, resultado: null }, { periodo: 'FY2026', ingresos: 14885.5, resultado: null }] },
      { nombre: 'Soporte al cliente (CSBG) y otros', descripcion: 'Servicio, repuestos, mejoras y equipos de nodos maduros (Reliant) sobre la base instalada [1].', tipo_resultado: null, historico: [
        { periodo: 'FY2024', ingresos: 5983.7, resultado: null }, { periodo: 'FY2025', ingresos: 6944.3, resultado: null }, { periodo: 'FY2026', ingresos: 8347.2, resultado: null }] },
    ],
    geografias: [
      { nombre: 'China', peso_pct: 33.8 }, { nombre: 'Taiwán', peso_pct: 22.5 }, { nombre: 'Corea', peso_pct: 19.4 }, { nombre: 'Japón', peso_pct: 9.3 },
      { nombre: 'Estados Unidos', peso_pct: 6.6 }, { nombre: 'Sudeste asiático', peso_pct: 5.4 }, { nombre: 'Europa', peso_pct: 3.0 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Peso de China en ventas', valor_anterior: '34 % (FY2025)', valor_actual: '34 % (FY2026); 26 % en el 4T FY26', variacion: '0 pp en el año; −17 pp frente al 43 % del 1T FY26', comentario: 'Baja por el freno del gasto en nodos maduros chinos [1, 3, 6].' },
      { kpi: 'Ventas de sistemas', valor_anterior: '11.491 M USD', valor_actual: '14.886 M USD', variacion: '+29,5 %', comentario: 'Empujadas por el gasto de fundición [1].' },
      { kpi: 'Ventas de soporte al cliente (CSBG)', valor_anterior: '6.944 M USD', valor_actual: '8.347 M USD', variacion: '+20,2 %', comentario: 'Repuestos y equipos de nodos maduros; 36 % de las ventas [1].' },
      { kpi: 'Ingresos diferidos', valor_anterior: '2.220 M USD (mar-26)', valor_actual: '2.430 M USD (jun-26)', variacion: '+9,5 %', comentario: 'Más 490 M USD de envíos a Japón pendientes de aceptación [3].' },
      { kpi: 'Mezcla de sistemas 4T FY26', valor_anterior: 'Fundición 54 %, DRAM 27 %, NAND 12 % (3T)', valor_actual: 'Fundición 44 %, DRAM 23 %, NAND 23 %, lógica 10 %', variacion: 'NAND × 2 en el trimestre', comentario: 'Conversiones a 256 capas o más [7].' },
      { kpi: 'Margen bruto (GAAP)', valor_anterior: '49,8 % (3T FY26)', valor_actual: '51,7 % (4T FY26); guía 52,0 % (1T FY27)', variacion: '+190 pb', comentario: 'Precio, escala y mezcla [3, 7].' },
    ],
    confianza: 'Alta',
  },
  calidad: { auditor: 'KPMG LLP', anios_auditor: 1, opinion: 'Favorable (cuentas y control interno, 7-ago-2026)', confianza: 'Alta' },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda trimestral', tipo: 'Complemento', intentos: '1) notas de prensa 8-K de cada trimestre: dan resultado operativo pero no amortización trimestral; 2) estados de flujos de los 10-Q: solo acumulados del año, no descargados; 3) derivar con la amortización anual / 4: descartado por ser una estimación que el motor trataría como dato', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos FY2019-FY2023', tipo: 'Complemento', intentos: '1) 10-K FY2026: solo FY2024-FY2026 de sistemas y soporte; 2) XBRL companyfacts: el desglose antiguo usa otra definición; 3) 10-K anteriores: no reexpresados con la definición vigente', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026 (competencia, mercados de deposición, grabado y limpieza; China; controles de exportación)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-07', url: `${E8}/000070754926000037/lrcx-20260628.htm` },
  { id: 2, titulo: 'Global Semiconductor Equipment Sales Forecast to Reach a Record $229 Billion in 2028 (serie de WFE en el informe de ASML del repo, 14-oct-2026)', editor: 'SEMI', tipo: 'Sectorial', fecha: '2026-07', url: 'https://www.semi.org/en/semi-press-release/global-semiconductor-equipment-sales-forecast-to-reach-a-record-229-billion-dollars-in-2028-semi-reports' },
  { id: 3, titulo: 'Lam Research Q4 Earnings Call Highlights (WFE 2026, DRAM y fundición en 2027, marco de márgenes)', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.marketbeat.com/instant-alerts/lam-research-q4-earnings-call-highlights-2026-07-29/' },
  { id: 4, titulo: 'Finances y Statistics de Applied Materials, ASM International, VAT, Inficon, MKS (nota D del informe de VAT, cierres del 6-oct-2026)', editor: 'MarketScreener / Stock Analysis (vía informe VAT del repo)', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/stocks/amat/statistics/' },
  { id: 5, titulo: 'Lam Research (LRCX) narrative shifting: objetivos de Mizuho y Morgan Stanley, pausa de ventas a Hua Hong, petición de Micron sobre China', editor: 'Simply Wall St / Yahoo Finance', tipo: 'Prensa', fecha: '2026-05-30', url: 'https://finance.yahoo.com/markets/stocks/articles/lam-research-lrcx-narrative-shifting-190322591.html' },
  { id: 6, titulo: 'ASML Q3 2026 press release (ventas 11.700 M EUR, guía 2026 de 44.000-45.000 M EUR)', editor: 'ASML / SEC EDGAR (6-K)', tipo: 'Primaria', fecha: '2026-10-14', url: 'https://www.sec.gov/Archives/edgar/data/0000937966/000162828026065813/pressreleasefinancialresul.htm' },
];
const B = {
  sector: {
    tamano: '≈ 116.900 M USD de WFE en 2025 (SEMI) [2]; Lam espera la parte baja de 150.000 M USD en 2026 [3]',
    unidad_serie: 'millones de USD (equipos de fabricación de obleas, WFE)',
    serie: [{ anio: '2025', tamano: 116900 }, { anio: '2026e', tamano: 143900 }, { anio: '2027e', tamano: 175300 }, { anio: '2028e', tamano: 200000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 19.6, cr5_pct: 75, estructura: 'Concentrada',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 17, posicion: 'Líder mundial en grabado y n.º 2 en deposición; ≈ 17 % del WFE total (estimación propia: ventas FY2026 entre el WFE medio de 2025-2026)',
    competidores: [
      { nombre: 'Applied Materials', pais: 'EE. UU.', ticker: 'AMAT', ingresos: 28400, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor fabricante de equipos; compite en deposición, grabado y limpieza; margen EBITDA 31,7 % [4].' },
      { nombre: 'Tokyo Electron', pais: 'Japón', ticker: '8035', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival principal en grabado dieléctrico, deposición y limpieza [1].' },
      { nombre: 'KLA', pais: 'EE. UU.', ticker: 'KLAC', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Inspección y metrología; compite por el mismo presupuesto de WFE, no por producto [4].' },
      { nombre: 'ASM International', pais: 'Países Bajos', ticker: 'ASM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Deposición por capas atómicas (ALD) y epitaxia; margen EBITDA 37,5 % [4].' },
      { nombre: 'Naura y AMEC', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Fabricantes chinos de grabado y deposición apoyados por el Estado que ganan cuota en China [1, 5].' },
    ],
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tcac_historico_pct y cuota en grabado', tipo: 'Complemento', intentos: '1) 10-K FY2026: sin cifras de mercado ni cuota; 2) SEMI: la web da 403 (lección del repo) y la serie histórica es de pago; 3) informes de ASML y VAT del repo: solo 2025-2028', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos y margen EBIT de Tokyo Electron, KLA, ASM', tipo: 'Complemento', intentos: '1) nota D de VAT del repo: solo margen EBITDA; 2) Yahoo: cifras parciales de KLA; 3) informe de ASML del repo: cifras de TEL incoherentes entre fuentes', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, participaciones, auditor, say on pay', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-09-24', url: `${E8}/000070754926000047/lrcx-20260924.htm` },
  { id: 2, titulo: 'Form 4 de directivos y consejeros (15-oct-2025 a 15-oct-2026), resumen de herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000707549&type=4' },
  { id: 3, titulo: '8-K del 27-ago-2026: retirada de los consejeros Sohail Ahmed y Michael Cannon (efectiva el 2-nov-2026)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-08-27', url: `${E8}/000070754926000043/lrcx-20260824.htm` },
  { id: 4, titulo: 'Notas de prensa de resultados FY2026 (guía trimestral y cifras reales)', editor: 'Lam Research / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000070754926000033/lrcx_exhibitx991xq4x2026.htm` },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  directivos: {
    equipo: [
      { nombre: 'Timothy M. Archer', cargo: 'Presidente y consejero delegado', desde: '2018', participacion_pct: 0.12, trayectoria: 'En Lam desde 2012 (director de operaciones); antes 18 años en Novellus. Con él las ventas han pasado de 9.654 M USD (FY2019) a 23.233 M USD (FY2026) [1, 4].' },
      { nombre: 'Douglas R. Bettinger', cargo: 'Vicepresidente ejecutivo y director financiero', desde: '2013', participacion_pct: 0.08, trayectoria: 'Antes director financiero de Avago y de 24/7 Real Media; 13 años en el cargo [1].' },
      { nombre: 'Seshasayee (Sesha) Varadarajan', cargo: 'Vicepresidente sénior, productos globales', desde: '2018', participacion_pct: 0.02, trayectoria: 'Responsable de los grupos de deposición y grabado [1].' },
      { nombre: 'Vahid Vahedi', cargo: 'Vicepresidente sénior y director de tecnología', desde: '2023', participacion_pct: 0.03, trayectoria: 'Antes responsable del negocio de grabado [1].' },
      { nombre: 'Neil J. Fernandes', cargo: 'Vicepresidente sénior, operaciones de clientes', desde: '2023', participacion_pct: 0.0, trayectoria: 'Dirige la relación comercial y el servicio global [1].' },
    ],
    historial_guidance: [
      { anio: '2T FY26 (dic-25)', guia: 'Ventas 5.200 ± 300 M USD; BPA 1,15 ± 0,10', real: '5.345 M USD; BPA 1,26', cumplida: 'Sí' },
      { anio: '3T FY26 (mar-26)', guia: 'Ventas 5.700 ± 300 M USD; BPA 1,35 ± 0,10', real: '5.841 M USD; BPA 1,45', cumplida: 'Sí' },
      { anio: '4T FY26 (jun-26)', guia: 'Ventas 6.600 ± 400 M USD; BPA 1,65 ± 0,15', real: '6.722 M USD; BPA 1,81', cumplida: 'Sí' },
      { anio: '1T FY27 (sep-26)', guia: 'Ventas 8.100 ± 400 M USD; margen operativo 39,5 ± 1 %; BPA 2,15 ± 0,15', real: 'Se publica el 21-oct-2026', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Abhijit Y. Talwalkar', 'Presidente del consejo', 'Independiente', '2011', 'Remuneración; Innovación y tecnología; Nombramientos'),
      cons('Timothy M. Archer', 'Consejero delegado', 'Ejecutivo', '2018', '—'),
      cons('Eric K. Brandt', 'Consejero', 'Independiente', '2010', 'Auditoría'),
      cons('Ita M. Brennan', 'Consejera', 'Independiente', '2024', 'Auditoría'),
      cons('Anirudh Devgan', 'Consejero', 'Independiente', '2026', 'Innovación y tecnología'),
      cons('John M. Dineen', 'Consejero', 'Independiente', '2023', 'Remuneración'),
      cons('Mark Fields', 'Consejero', 'Independiente', '2024', 'Nombramientos'),
      cons('Ho Kyu Kang', 'Consejero', 'Independiente', '2023', 'Innovación y tecnología'),
      cons('Bethany J. Mayer', 'Consejera', 'Independiente', '2019', 'Auditoría'),
      cons('Jyoti K. Mehra', 'Consejera', 'Independiente', '2021', 'Remuneración'),
      cons('Sohail U. Ahmed', 'Consejero (sale el 2-nov-2026)', 'Independiente', '2019', 'Innovación y tecnología'),
      cons('Michael R. Cannon', 'Consejero (sale el 2-nov-2026)', 'Independiente', '2011', 'Nombramientos'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 40.35, fijo: 1.32, variable_corto: 5.44, variable_largo: 33.54, ratio_salario_medio: 500 },
    accionistas: [
      { nombre: 'BlackRock, Inc.', pct: 9.41, tipo: 'Institucional (13G de enero de 2024)', variacion: 'Sin 13G nuevo desde 2024' },
      { nombre: 'Vanguard Capital Management', pct: 7.48, tipo: 'Institucional (13G de abril de 2026)', variacion: 'Nuevo 13G tras la división de Vanguard' },
      { nombre: 'Consejeros y directivos (18 personas)', pct: 0.31, tipo: 'Internos', variacion: 'Ventas netas de 170 M USD en 12 meses [2]' },
    ],
    insiders: [
      { fecha: '2025-12', persona: 'Timothy M. Archer (CEO)', operacion: 'Venta', acciones: 163300, importe: 26.76 },
      { fecha: '2026-03', persona: 'Douglas R. Bettinger (CFO)', operacion: 'Venta', acciones: 90386, importe: 20.50 },
      { fecha: '2026-06', persona: 'Eric K. Brandt (consejero)', operacion: 'Venta', acciones: 109000, importe: 39.13 },
      { fecha: '2026-07', persona: 'Timothy M. Archer (CEO)', operacion: 'Venta', acciones: 30000, importe: 11.70 },
      { fecha: '2026-07', persona: 'Abhijit Y. Talwalkar (presidente)', operacion: 'Venta', acciones: 18282, importe: 6.12 },
      { fecha: '2026-08', persona: 'Timothy M. Archer (CEO)', operacion: 'Venta', acciones: 30000, importe: 9.00 },
      { fecha: '2026-09', persona: 'Timothy M. Archer (CEO)', operacion: 'Venta', acciones: 30000, importe: 9.58 },
      { fecha: '2026-09', persona: 'Seshasayee Varadarajan (SVP)', operacion: 'Venta', acciones: 59750, importe: 17.41 },
    ],
    alertas: [
      'Cambio de auditor: KPMG sustituye a Ernst & Young desde septiembre de 2025; FY2026 es su primer ejercicio [1].',
      'Ventas de directivos de 170 M USD en 12 meses sin ninguna compra; el 76 % con planes 10b5-1 [2].',
      'Dos consejeros veteranos (Cannon, 16 años; Ahmed, 7) dejan el consejo el 2-nov-2026, que baja de 12 a 10 [3].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto en contra de la remuneración', tipo: 'Complemento', intentos: '1) proxy 2026: solo dice «más del 90 % a favor de 2021 a 2025»; 2) 8-K de resultados de la junta de 2025: no descargado; 3) prensa: sin cifra', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const P6 = { AMAT: 530.27, KLAC: 197.46, ASM: 947.40, MKSI: 281.41, IFCN: 198.40, VACN: 698.20 };
const P14 = { AMAT: 446.63, KLAC: 178.81, ASM: 824.80, MKSI: 234.50, IFCN: 190.00, VACN: 635.00 };
const CHF_USD = 0.8305; // 1 USD = 0,8305 CHF (BCE, 6-oct-2026; tipo de la nota D de VAT)
const comp = (nombre, ticker, pais, k, capCHF, ev_v, ev_ltm, ev_ntm, per, crec, mg, roic, dn, fcfy) => {
  const f = P14[k] / P6[k];
  return { nombre, ticker, pais, capitalizacion: Math.round((capCHF / CHF_USD) * f), ev_ventas: r2(ev_v * f), ev_ebitda_ltm: r1(ev_ltm * f), ev_ebitda_ntm: ev_ntm == null ? null : r1(ev_ntm * f), per_ntm: r1(per * f), crecimiento_pct: crec, margen_ebitda_pct: mg, roic_pct: roic, dn_ebitda: dn, fcf_yield_pct: fcfy == null ? null : r1(fcfy / f) };
};
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (LRCX, SPY, SOXX y comparables) vía herramientas/bolsa.mjs y movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/LRCX/history/' },
  { id: 2, titulo: 'LRCX Stock Forecast: consenso de 35 analistas, precio objetivo y estimaciones FY2027-FY2028 (S&P Global)', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/lrcx/forecast/' },
  { id: 3, titulo: 'Finances y Statistics de los comparables (nota D del informe de VAT, cierres del 6-oct-2026, en CHF)', editor: 'MarketScreener / Stock Analysis (vía informe VAT del repo)', tipo: 'Datos de mercado', fecha: '2026-10-06', url: 'https://stockanalysis.com/stocks/mksi/statistics/' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10), 13-oct-2026: 5,21 %', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro, 15-oct-2026 (USD 1,1208; CHF 0,9305)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Semiconductor Equipment Stocks Slide as Investors Take Profits on a Huge Year (13-oct-2026)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://247wallst.com/investing/2026/10/13/semiconductor-equipment-stocks-slide-as-investors-take-profits-on-a-huge-year-applied-materials-sinks-7-lam-research-and-kla-drop-4/' },
  { id: 8, titulo: 'Lam Research Stock Fell 10% in a Day (2-jul-2026: informe de Meta sobre exceso de capacidad de IA)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.tikr.com/blog/lam-research-stock-fell-10-in-a-day-heres-where-the-stock-could-go-in-2026' },
  { id: 9, titulo: 'Chip Equipment Stocks Slide as AI Pacing Call Reaches Fab Spending (14-sep-2026)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://247wallst.com/investing/2026/09/14/chip-equipment-stocks-slide-as-ai-pacing-call-reaches-fab-spending-applied-materials-and-lam-research-fall-6-asml-sinks-5/' },
  { id: 10, titulo: 'Applied Materials Falls 4%, Lam Research and Teradyne Sink 5% (19-ago-2026)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-08-19', url: 'https://247wallst.com/investing/2026/08/19/applied-materials-falls-4-lam-research-and-teradyne-sink-5-whats-prompting-the-selloff-in-chip-equipment-stocks/' },
  { id: 11, titulo: 'Seeking Alpha, noticias de LRCX (RSS): dividendo +26,9 % a 0,33 USD, conferencia del 21-oct, Morgan Stanley espera guía de más de 9.000 M USD, proyectos de ley de exportación de chips', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://seekingalpha.com/api/sa/combined/LRCX.xml' },
  { id: 12, titulo: 'Lam Research Corporation Announces September Quarter Financial Conference Call (21-oct-2026)', editor: 'Lam Research (vía Finviz)', tipo: 'Primaria', fecha: '2026-09-30', url: 'https://finviz.com/news/397284/lam-research-corporation-announces-september-quarter-financial-conference-call' },
  { id: 13, titulo: 'Lam Research (LRCX) narrative shifting: Mizuho 380 USD, Morgan Stanley sobreponderar 331 USD, rebaja de Erste', editor: 'Simply Wall St / Yahoo Finance', tipo: 'Prensa', fecha: '2026-05-30', url: 'https://finance.yahoo.com/markets/stocks/articles/lam-research-lrcx-narrative-shifting-190322591.html' },
];
const D = {
  identificacion: {
    nombre: 'Lam Research Corporation', nombre_corto: 'Lam Research', ticker: 'LRCX', isin: 'US5128073062', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Semiconductores y equipos de semiconductores',
    sede: 'Fremont, California', fundacion: '1980', empleados: 23300, web: 'https://www.lamresearch.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 1255.0, capitalizacion_publicada: null, free_float_pct: 99.7,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s,
    volumen_medio_diario: `≈ ${Math.round(BOLSA.volumen_3m.importe_dia_millones).toLocaleString('es-ES')} M USD/día (3 meses)`, proximos_resultados: '2026-10-21',
  },
  consenso: {
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 34920, ebitda: null, ebit: null, bpa: 9.48, dpa: null, fuente: 'Stock Analysis (S&P Global), 30 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 41570, ebitda: null, ebit: null, bpa: 11.77, dpa: null, fuente: 'Stock Analysis (S&P Global) [2]' },
    ],
    recomendaciones: { n_analistas: 35, comprar: 29, mantener: 6, vender: 0, po_medio: 375.81, po_min: 290, po_max: 500 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...BOLSA.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: BOLSA.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: [
      comp('Applied Materials', 'AMAT', 'US', 'AMAT', 349495, 14.76, 46.5, 25.1, 29.3, 27.5, 31.7, 35.64, -0.22, 1.4),
      comp('KLA', 'KLAC', 'US', 'KLAC', 187695, null, 32.65, null, 31.85, null, null, null, null, null),
      comp('ASM International', 'ASM', 'NL', 'ASM', 43431, 14.3, 38.2, 22.5, 31.9, 31.1, 37.5, 24.8, -0.86, 1.8),
      comp('MKS Inc.', 'MKSI', 'US', 'MKSI', 15803, 5.74, 23.3, 13.0, 21.4, 25.7, 24.6, 9.83, 3.65, 2.6),
      comp('VAT Group', 'VACN', 'CH', 'VACN', 20944, 20.66, 69.7, 33.9, 45.8, 51.9, 29.7, 26.1, 0.9, 1.1),
      comp('Inficon', 'IFCN', 'CH', 'IFCN', 4850, 8.55, 45.6, 25.9, 35.8, 18.3, 18.7, 28.78, -0.64, 1.2),
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) 10-K FY2026: Lam no ha hecho compras relevantes (fondo de comercio estable en 1.630 M USD); 2) informes de ASML y VAT del repo: sin tabla de transacciones del sector; 3) las grandes operaciones del sector (Lam-KLA 2016, Applied-Kokusai 2021) se cancelaron por los reguladores y no dan múltiplo pagado', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'EBITDA y tercer año del consenso', tipo: 'Complemento', intentos: '1) MarketScreener: las URL de Lam devuelven otra empresa; 2) Stock Analysis: el FY2029 y el EBITDA son de pago; 3) Yahoo: solo dos ejercicios', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA: no consultado por tiempo; 2) Stock Analysis statistics: no leído; 3) prensa: sin cifra', decision: 'Omitido' },
    { seccion: 'identificacion', campo: 'capitalizacion_publicada', tipo: 'Complemento', intentos: '1) Stock Analysis: no leída la página de estadísticas; 2) Yahoo: no publicada en el histórico; 3) se calcula con precio × acciones diluidas de la guía (1.255 M)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $LRCX (10 a 15-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/LRCX.json' },
  { id: 2, titulo: 'Seeking Alpha, análisis de LRCX de septiembre-octubre de 2026 (titulares: «Strong FY 2027 Setup», «Valuation Demands More», «Chinese Exposure Is Falling, But So Might The Share Price», «Buy The Summer Pullback»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://seekingalpha.com/api/sa/combined/LRCX.xml' },
  { id: 3, titulo: 'Simply Wall St, narrativa de la comunidad: «China exposure and export limits will compress semiconductor margins»', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09', url: 'https://simplywall.st/community/narratives/us/semiconductors/nasdaq-lrcx/lam-research/3e9kcv57-china-exposure-and-export-limits-will-compress-semiconductor-margins-pr4i' },
  { id: 4, titulo: 'Lam Research Transformed $1,000 Into $37,462 Over Ten Years Despite Three 40% Crashes', editor: '24/7 Wall St.', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://247wallst.com/investing/2026/10/09/lam-research-transformed-1000-into-37462-over-ten-years-despite-three-40-crashes/' },
];
const E = {
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($LRCX)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Particulares que compran la caída tras ocho sesiones a la baja («miedo máximo») y esperan unos resultados como los de ASML y TSMC; algunos avisan de que los tipos altos frenan los pedidos de equipos [1].' },
      { plataforma: 'Seeking Alpha (artículos y comentarios)', fecha: '2026-10', n_comentarios: 40, tono: 'Dividido', resumen: 'La mayoría ve un FY2027 fuerte y compra la corrección; una minoría dice que la valoración ya lo descuenta y que China puede pesar en el precio [2].' },
      { plataforma: 'Simply Wall St (narrativas)', fecha: '2026-09', n_comentarios: 10, tono: 'Negativo', resumen: 'Narrativa bajista: la exposición a China y los límites de exportación comprimirán los márgenes [3].' },
      { plataforma: '24/7 Wall St. (comentarios y artículo)', fecha: '2026-10', n_comentarios: 10, tono: 'Neutro', resumen: 'Recuerda tres caídas de más del 40 % en diez años: la acción es muy cíclica aunque haya multiplicado por 37 [4].' },
    ],
    temas: [
      { tema: 'Compra de la caída antes de resultados', postura: 'Alcista', peso: 'Alto', contraste: 'La guía del 1T FY27 (8.100 M USD) supone +52 % interanual; el precio ya ha corregido un 35 % desde el máximo, pero el PER adelantado sigue por encima de su mediana [1].' },
      { tema: 'Valoración exigente y pico del ciclo de IA', postura: 'Dividida', peso: 'Alto', contraste: 'El DCF inverso confirma que el precio pide crecimientos de varios años por encima de lo que ha hecho el WFE [2].' },
      { tema: 'China y controles de exportación', postura: 'Bajista', peso: 'Medio', contraste: 'China baja del 43 % al 26 % de las ventas en un año; el riesgo es real pero ya se está diluyendo [2, 3].' },
      { tema: 'Tipos de interés y pedidos de equipos', postura: 'Bajista', peso: 'Bajo', contraste: 'Con el bono a 10 años en el 5,2 % el coste de capital de los clientes sube; los fabricantes de memoria son los más sensibles [1].' },
    ],
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
