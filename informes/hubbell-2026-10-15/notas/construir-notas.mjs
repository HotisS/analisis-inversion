// Escribe las notas A-E de Hubbell (corte 2026-10-15) a partir del XBRL de la SEC (cuentas-xbrl.json y companyfacts),
// las notas de prensa de resultados (8-K 99.1), el 10-K 2025 y 2023, el 10-Q del 2T26, el proxy 2026, form4.mjs, bolsa.mjs,
// movimiento.mjs, Stock Analysis, Seeking Alpha y Stocktwits. Cada nota cita con [n] de su propia lista.
// Ejecutar: node informes/hubbell-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/48898';
const ANIOS = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas auditadas; nota 20 de segmentos y geografía; cartera de pedidos; clientes; empleados; pensiones; deuda)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-12', url: `${E8}/000162828026007500/hubb-20251231.htm` },
  { id: 2, titulo: 'Hechos XBRL (companyfacts): cuenta, balance y flujos 2016-2025 y trimestres; resultado de operaciones continuadas 2019-2022', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000048898.json' },
  { id: 3, titulo: 'Hubbell Reports Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-28', url: `${E8}/000162828026049934/exhibit991_07282026.htm` },
  { id: 4, titulo: 'Form 10-Q del 2T26 (balance a 30-jun-2026, compra de NSI, deuda, recompras, acciones en circulación)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-29', url: `${E8}/000162828026050405/hubb-20260630.htm` },
  { id: 5, titulo: 'Hubbell Reports First Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${E8}/000162828026028600/exhibit991_04302026.htm` },
  { id: 6, titulo: 'Hubbell Reports Fourth Quarter and Full Year 2025 Results (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-03', url: `${E8}/000162828026004800/exhibit991_02032026.htm` },
  { id: 7, titulo: 'Hubbell Reports Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2025-10-28', url: `${E8}/000162828025046573/exhibit991_10282025.htm` },
  { id: 8, titulo: 'Form 10-K 2023 (segmentos 2021-2023, venta del alumbrado comercial e industrial en 2022)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-08', url: `${E8}/000162828024003792/hubb-20231231.htm` },
  { id: 9, titulo: 'Hubbell to Acquire NSI Industries (8-K, anexo 99.1: 3.000 M USD, ≈15,5x el EBITDA de 2026e, ventas de ≈570 M)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000119312526204099/d133302dex991.htm` },
];
// 2019-2022: beneficio y BPA de operaciones continuadas (el alumbrado comercial e industrial se vendió en feb-2022 y va en discontinuadas);
// las ventas, el EBIT y el BAI del XBRL ya están reexpresados sin él. Amortizaciones: las de la nota de segmentos.
const contNet = { 2019: 361.5, 2020: 330.0, 2021: 365.0, 2022: 511.3 };
const contBpa = { 2019: 6.59, 2020: 6.04, 2021: 6.66, 2022: 9.43 };
const ocfCont = { 2019: 516.8, 2020: 602.9, 2021: 513.7, 2022: 636.2 };
const divid = { 2019: 186.6, 2020: 201.4, 2021: 216.9, 2022: 229.6, 2023: 245.5, 2024: 267.3, 2025: 286.6 };
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  const bn = contNet[y] ?? c.beneficio_neto;
  return { periodo: y, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: bn, gastos_financieros: { 2019: 69.4, 2020: 60.3 }[y] ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: contBpa[y] ?? c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas };
});
const historico = ANIOS.map((y) => {
  const b = { ...bx[y], ...(y === '2023' ? { pasivo_total: 4191.8 } : {}) };
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: b.fondo_comercio, intangibles: b.intangibles, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: b.activos_contrato ?? null, pasivos_contrato: b.pasivos_contrato ?? null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: b.reservas };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: ocfCont[y] ?? f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: Math.max(0, f.adquisiciones), desinversiones: f.desinversiones ?? 0, dividendos: divid[y], recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});
const seg = (nombre, descripcion, d) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: Object.entries(d).map(([periodo, [ingresos, resultado]]) => ({ periodo, ingresos, resultado })) });

guarda('A', {
  _estado: 'completo',
  negocio: {
    segmentos: [
      seg('Utility Solutions', 'Componentes para redes de transmisión, subestaciones y distribución (conectores, herrajes, aisladores, arquetas, celdas, paneles de control de subestaciones de Systems Control, conexiones de DMC Power) y automatización de red (contadores y AMI de Aclara, sensores).', { 2021: [2334.4, 284.1], 2022: [2871.1, 438.2], 2023: [3261.7, 698.4], 2024: [3600.7, 731.8], 2025: [3672.3, 789.9] }),
      seg('Electrical Solutions', 'Material eléctrico «detrás del contador»: aparamenta de cableado, conectores y puesta a tierra (Burndy), cajas y canalizaciones (Raco), equipos para atmósferas peligrosas y, desde junio de 2026, NSI (racores Bridgeport, conectores Polaris, temporizadores Tork).', { 2021: [1859.7, 248.2], 2022: [2076.8, 270.9], 2023: [2111.2, 329.0], 2024: [2027.8, 361.3], 2025: [2172.3, 418.9] }),
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 92.6 }, { nombre: 'Internacional (Canadá, Reino Unido, Brasil y otros)', peso_pct: 7.4 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de pedidos firme (M USD)', valor_anterior: '1.898 (dic-24)', valor_actual: '2.159 (dic-25)', variacion: '+13,8 %', comentario: 'Casi toda se sirve en el año siguiente; en Utility unos 20 M son contratos plurianuales de contadores y sensores [1].' },
      { kpi: 'Crecimiento orgánico del grupo', valor_anterior: '+3,3 % (2025)', valor_actual: '+10,2 % (2T26)', variacion: '+6,9 pp', comentario: 'Guía 2026: orgánico +9-11 % [3, 6].' },
      { kpi: 'Grid Infrastructure: crecimiento de ventas', valor_anterior: '+9 % (3T25)', valor_actual: '+12 % (2T26)', variacion: 'n.a.', comentario: 'T&D, subestaciones y transmisión; 1T26 +18 % [3, 5, 7].' },
      { kpi: 'Grid Automation: crecimiento de ventas', valor_anterior: '−18 % (3T25)', valor_actual: '+1 % (2T26)', variacion: 'n.a.', comentario: 'Contadores (Aclara): la parte débil desde 2024 [3, 7].' },
      { kpi: 'Electrical Solutions: crecimiento orgánico', valor_anterior: '+7,2 % (2025)', valor_actual: '+18,3 % (2T26)', variacion: '+11 pp', comentario: 'Centros de datos e industria ligera [3, 6].' },
      { kpi: 'Margen operativo ajustado del grupo', valor_anterior: '24,4 % (2T25)', valor_actual: '23,9 % (2T26)', variacion: '−50 pb', comentario: 'Inflación, aranceles y costes de reestructuración; Electrical −130 pb [3].' },
    ],
    clientes: 'Clientes: distribuidores mayoristas de material eléctrico, eléctricas, fabricantes, instaladores, telecos y minoristas. **Los diez primeros clientes son ≈42 % de las ventas** (sobre todo distribuidores), sin dependencia de uno solo [1]. El 92,6 % de las ventas se factura desde EE. UU. [1]. Poder de precios demostrado: en 2022-2023 el margen operativo pasó del 12,7 % al 19,1 % con subidas de precio por encima de la inflación de cobre, acero y aluminio, y en 2025-2026 la empresa compensa aranceles e inflación «con precio y productividad» manteniendo el margen ajustado en el 22-24 % [1, 3, 8]. La cartera de pedidos (2.159 M a dic-25, +13,8 %) da visibilidad de unos seis meses [1].',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 6223.6, ebitda: 1493.2, ebit: 1254.5, beneficio_neto: 901.9, bpa: 16.89, dpa: 5.68, dpa_extraordinario: 0, fcf: 901.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2025', descripcion: 'DMC Power, comprada el 1-oct-2025 por ≈827 M netos de caja: entra en el balance de 2025 y solo un trimestre en la cuenta.' },
      { periodo: '2023', descripcion: 'Systems Control (≈1.100 M) y Balestro, compradas en el 4T23: entran en el balance de 2023 y casi nada en la cuenta.' },
    ],
    comentario: 'Ventas de 3.947 M (2019, reexpresadas sin el alumbrado comercial vendido en 2022) a 5.845 M en 2025: crecimiento anual compuesto del 6,8 %, con compras (Systems Control, DMC Power, Ventev, Nicor) y un ciclo de precios en 2022-2023 [1, 2, 8]. El margen operativo subió de 12,7 % (2021) a 20,7 % (2025): precio por encima de la inflación de materiales en 2022-2023, venta de negocios de poco margen (alumbrado residencial en 2024) y mezcla hacia transmisión y subestaciones [1, 8]. En 2024 el orgánico fue 0 % y en 2025 +3,3 %, con Grid Automation (contadores) cayendo; desde el 4T25 se acelera (+8,9 %, +8,2 %, +10,2 %) por transmisión, subestaciones y centros de datos [3, 5, 6]. 2026 lleva la compra de NSI (3.000 M, cerrada el 9-jun) y DMC Power: la empresa espera ventas +16-18 % con orgánico +9-11 % [3].',
    ajustes: 'Hubbell publica un BPA «ajustado» que excluye la amortización de intangibles de compras (≈1,45 USD por acción en 2025 y ≈2,50 en 2026) y los costes de transacción e integración (≈0,50 en 2026) [3, 6]. Este informe usa **cifras GAAP** en todo: BPA 2025 de 16,54 frente a 18,21 ajustado. 2019-2022: beneficio y BPA de operaciones continuadas (sin el alumbrado comercial e industrial, vendido en feb-2022, que va en discontinuadas) [2, 8]. Los años 2016-2018 se dejan fuera porque no están reexpresados. El 2023 sigue la reexpresión del 10-K 2025 (EBIT 1.027 frente a 1.039 publicado entonces) [1, 8].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 1442.6, crecimiento_pct: null, crecimiento_organico_pct: -1.0, ebitda: 362.0, margen_ebitda_pct: 25.1, bpa: 4.18, vs_consenso: null },
      { periodo: '4T24', ingresos: 1334.3, crecimiento_pct: null, crecimiento_organico_pct: -3.0, ebitda: 298.9, margen_ebitda_pct: 22.4, bpa: 3.66, vs_consenso: null },
      { periodo: '1T25', ingresos: 1365.2, crecimiento_pct: -2.4, crecimiento_organico_pct: -0.6, ebitda: 277.3, margen_ebitda_pct: 20.3, bpa: 3.03, vs_consenso: null },
      { periodo: '2T25', ingresos: 1484.3, crecimiento_pct: 2.2, crecimiento_organico_pct: 2.0, ebitda: 384.6, margen_ebitda_pct: 25.9, bpa: 4.56, vs_consenso: null },
      { periodo: '3T25', ingresos: 1502.4, crecimiento_pct: 4.1, crecimiento_organico_pct: 3.2, ebitda: 380.0, margen_ebitda_pct: 25.3, bpa: 4.77, vs_consenso: null },
      { periodo: '4T25', ingresos: 1492.7, crecimiento_pct: 11.9, crecimiento_organico_pct: 8.9, ebitda: 373.0, margen_ebitda_pct: 25.0, bpa: 4.19, vs_consenso: null },
      { periodo: '1T26', ingresos: 1516.7, crecimiento_pct: 11.1, crecimiento_organico_pct: 8.2, ebitda: 324.0, margen_ebitda_pct: 21.4, bpa: 3.41, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 1711.8, crecimiento_pct: 15.3, crecimiento_organico_pct: 10.2, ebitda: 416.2, margen_ebitda_pct: 24.3, bpa: 4.52, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En el 2T26 (28-jul) la dirección habló de «megatendencias de modernización de la red, crecimiento de la carga e inversión en centros de datos» y subió la guía 2026: ventas +16-18 % (orgánico +9-11 %, antes +6-9 %), BPA GAAP 17,25-17,55 (antes 17,45-18,00, por la amortización y los costes de NSI) y ajustado 20,25-20,55 (antes 19,30-19,85) [3, 5]. Ventas +15 %, orgánico +10 %; Electrical Solutions orgánico +18 % y Utility +6 % (Grid Infrastructure +12 %, Grid Automation +1 %) [3]. Lo que preocupó: el margen operativo ajustado bajó 50 pb (Electrical −130 pb) por inflación, materias primas, aranceles y reestructuración, y la acción cayó tras los resultados pese a batir [3]. En el 1T26 (30-abr) el BPA ajustado de 3,93 batió, pero el punto medio de la guía quedó algo por debajo del consenso y la acción cayó un 6,9 % ese día [5]. La dirección no ha cuantificado cuánto pesan hoy los centros de datos en las ventas ni la rentabilidad esperada de NSI (pagada a 15,5x EBITDA) más allá de «acrecitiva al BPA ajustado» [3, 9].',
  },
  balance: {
    historico,
    vencimientos: [{ anio: '2026', importe: 568.7 }, { anio: '2027', importe: 300 }, { anio: '2028', importe: 1050 }, { anio: '2029', importe: 900 }, { anio: '2031', importe: 800 }, { anio: '2033+', importe: 1800 }],
    liquidez: 'Caja e inversiones 498,4 M a 30-jun-2026 (caja 378,6 + inversiones a corto 16,1 + inversiones a largo 103,7, parte de ellas ligadas a planes de compensación diferida) y una línea de crédito comprometida de 1.000 M sin disponer a dic-25, ampliable a 1.500 M, que respalda el papel comercial [1, 3, 4].',
    rating: 'Grado de inversión (la empresa no detalla la nota en el 10-K; hueco registrado)',
    coste_deuda_pct: 4.5,
    vida_media_anios: 4.8,
    otros_pasivos: 'Covenant único: deuda total / capitalización ≤ 65 % (58 % a 30-jun-2026 según la definición de la empresa, con holgura de 7 puntos tras la compra de NSI) [3, 4]. Pensiones: déficit de 99,5 M en las de prestación definida y 12,8 M en otras prestaciones a dic-25 (112,3 M antes de impuestos, ≈87,6 M netos) [1]. Arrendamientos operativos de 161,9 M (US GAAP: dentro del EBITDA, fuera de la deuda) [2]. Garantías de producto con provisión inmaterial; sin factoring declarado [1].',
    comentario: 'La compra de NSI (3.008 M netos de caja) se pagó entera con deuda: la deuda bruta pasó de 2.325 M (dic-25) a 5.373 M (jun-26) y la deuda neta a 4.874 M, unas 3,1 veces el EBITDA de los últimos 12 meses sin NSI completa [3, 4]. Es el endeudamiento más alto de la década (1,2x en 2025). El circulante comercial ronda el 23 % de las ventas, estable [1].',
  },
  flujos: {
    historico: flujos,
    comentario: 'Conversión alta y estable: flujo operativo de 1.030 M en 2025 frente a 887 M de beneficio (116 %), con capex de 155 M (2,7 % de ventas); FCF de 875 M [1, 2]. En 2023-2025 el FCF acumulado (≈2.460 M) pagó dividendos (≈800 M) y recompras (≈295 M), y las compras (≈2.170 M: Systems Control, DMC Power) se financiaron en parte con deuda [2]. 2019-2022: flujo de operaciones continuadas [2]. La empresa espera un FCF del ≈90 % del beneficio ajustado en 2026 [3]. Capex de mantenimiento: estimación propia del 1,5-2 % de ventas (la amortización del inmovilizado material, 92,8 M en 2025, es el 1,6 %); el resto es capacidad para transmisión y subestaciones [1, 2].',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: null, opinion: 'Favorable (cuentas y control interno a dic-25)',
    comentario: 'Cuentas sin salvedades de PwC y control interno eficaz [1]. Las cifras GAAP llevan la amortización de intangibles de compras (103,6 M en 2025 y ≈170 M previstos en 2026), que el BPA ajustado excluye: la diferencia entre el BPA ajustado y el GAAP pasa del 10 % en 2025 al 17 % en 2026 [3, 6]. Pagos en acciones moderados: 33 M en 2025 (0,6 % de ventas) [2]. Fondo de comercio e intangibles: 7.544 M a jun-26, 1,9 veces el patrimonio, por NSI, DMC Power y Systems Control; un deterioro sería contable, pero señalaría que se pagó de más [4]. Reexpresión menor de 2023 (EBIT −11 M) en el 10-K 2025 [1, 8].',
    senales: [
      { senal: 'Fondo de comercio e intangibles = 1,9 veces el patrimonio tras NSI', nivel: 'Media', comentario: 'Riesgo de deterioro si NSI o DMC no cumplen; ninguno hasta hoy [4].' },
      { senal: 'BPA ajustado excluye amortización y costes de compras recurrentes', nivel: 'Media', comentario: 'Hubbell compra todos los años; el informe usa GAAP [3].' },
      { senal: 'Reexpresión de 2023', nivel: 'Baja', comentario: 'EBIT 1.039 → 1.027 M; sin explicación relevante en la nota de resultados [1, 8].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso 3T24-4T25', tipo: 'Complemento', intentos: '1) Notas de prensa (no dan consenso); 2) Seeking Alpha RSS solo da titulares de 2026; 3) búsqueda de prensa sin cifras de consenso previas fiables', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 (descripción de segmentos, marcas, competencia, materias primas)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-12', url: `${E8}/000162828026007500/hubb-20251231.htm` },
  { id: 2, titulo: 'Investor-owned utilities to spend $1.1T in grid boost as power demand spirals (EEI: 178.000 M USD en 2024, ≈208.000 M en 2025, >1,1 billones 2025-2029)', editor: 'POWER Magazine', tipo: 'Prensa', fecha: '2025-10', url: 'https://www.powermag.com/investor-owned-utilities-to-spend-1-1t-in-grid-boost-as-power-demand-spirals/' },
  { id: 3, titulo: 'Industry Capital Expenditures (proyecciones de inversión de las eléctricas de EE. UU.; más de la mitad en transmisión y distribución)', editor: 'Edison Electric Institute', tipo: 'Sectorial', fecha: '2025-10', url: 'https://eei.org/-/media/Project/EEI/Documents/Issues-and-Policy/Finance-And-Tax/Industry-Capital-Expenditures.pdf' },
  { id: 4, titulo: 'Investor-owned utilities spending more than ever (EEI)', editor: 'Utility Dive', tipo: 'Prensa', fecha: '2025', url: 'https://www.utilitydive.com/news/investor-owned-utilities-spending-more-than-ever-eei/802315/' },
  { id: 5, titulo: 'Hubbell Reports Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-28', url: `${E8}/000162828026049934/exhibit991_07282026.htm` },
  { id: 6, titulo: 'Competidores de Eaton y ABB (ventas y márgenes de Schneider, ABB Electrification, Eaton, Legrand, nVent) en las notas B de los informes del repositorio', editor: 'Empresas / Yahoo Finance (vía informes eaton-2026-10-15 y abb-2026-10-15)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'informes/eaton-2026-10-15/notas/B.json' },
  { id: 7, titulo: 'Hubbell to Acquire NSI Industries (8-K, anexo 99.1)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000119312526204099/d133302dex991.htm` },
  { id: 8, titulo: 'Form 10-K 2023 (venta del alumbrado comercial e industrial a GE Current en 2022; compras de 2023)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2024-02-08', url: `${E8}/000162828024003792/hubb-20231231.htm` },
];
guarda('B', {
  _estado: 'completo',
  historia: {
    resumen: 'Harvey Hubbell fundó la empresa en Bridgeport (Connecticut) en 1888 y patentó el enchufe desmontable en 1912 [1]. Durante un siglo fue un fabricante de aparamenta y material eléctrico; desde los noventa compró negocios de red eléctrica (Chance, Anderson, Fargo, Ohio Brass) hasta que la parte de «utility» pasó a ser la mayor [1]. En 2018 compró Aclara (contadores inteligentes, ≈1.100 M) y en 2022 vendió el alumbrado comercial e industrial, en 2024 el residencial [8, 1]. Gerben Bakker, en la casa desde 1988, es consejero delegado desde 2020 y presidente desde 2021; ha concentrado la cartera en red eléctrica y en componentes «críticos» con compras como Systems Control (2023), DMC Power (2025) y NSI (2026) [1, 7].',
    hitos: [
      { anio: '1888', hito: 'Fundación en Bridgeport (Connecticut) por Harvey Hubbell [1].' },
      { anio: '1912', hito: 'Patente del enchufe y la clavija desmontables, base del negocio de aparamenta [1].' },
      { anio: '1994', hito: 'Compra de A.B. Chance: entrada fuerte en herrajes y anclajes para líneas eléctricas [1].' },
      { anio: '2018', hito: 'Compra de Aclara (contadores e infraestructura de medición, ≈1.100 M) [1].' },
      { anio: '2020', hito: 'Gerben Bakker, consejero delegado; presidente desde 2021 [1].' },
      { anio: '2022', hito: 'Venta del alumbrado comercial e industrial (discontinuado) [8].' },
      { anio: '2023', hito: 'Compra de Systems Control (paneles de control de subestaciones, ≈1.100 M) [1].' },
      { anio: '2024', hito: 'Venta del alumbrado residencial (131 M) [1].' },
      { anio: '2025', hito: 'Compra de DMC Power (conexiones a compresión para subestaciones y transmisión, ≈827 M) [1].' },
      { anio: '2026', hito: 'Compra de NSI Industries (3.000 M, 15,5x EBITDA), la mayor de su historia [7].' },
    ],
  },
  negocio: {
    descripcion: 'Hubbell diseña y fabrica componentes eléctricos para la red y para edificios e industria, casi todo en EE. UU. **Utility Solutions** (63 % de las ventas de 2025) vende a eléctricas y a sus distribuidores herrajes, conectores, aisladores, protecciones, arquetas, celdas, paneles de control de subestaciones y equipos de medición (contadores Aclara) para transmisión, subestaciones y distribución [1]. **Electrical Solutions** (37 %) vende «detrás del contador» aparamenta de cableado, conectores y puesta a tierra, cajas, canalizaciones y equipos para zonas peligrosas, usados por instaladores en industria, edificios no residenciales y centros de datos [1]. Fabrica con más de 3.250 patentes activas y unas 18.000 personas, el 61 % en EE. UU. [1]. Vende sobre todo a través de distribuidores mayoristas [1].',
    como_gana_dinero: 'Son productos pequeños, críticos y baratos frente al coste del proyecto en el que van (un conector o un aislador en una línea de alta tensión), lo que da poder de precios: el cliente valora la fiabilidad, las homologaciones de cada eléctrica y la disponibilidad, no el precio unitario [1]. La mayor parte de las ventas es reposición y mantenimiento de una red envejecida (recurrente de hecho, aunque no contractual) y la otra parte es inversión nueva en transmisión, subestaciones y conexión de centros de datos [1, 5]. El margen depende del precio frente al coste de cobre, acero, aluminio y aranceles, de la mezcla (transmisión y subestaciones dejan más que contadores) y del volumen: con un 20,7 % de margen operativo, cada punto de ventas añade más que proporcionalmente [1]. Estacionalidad suave: el primer trimestre es el más flojo [5].',
  },
  sector: {
    definicion: 'Mercado relevante: la inversión de las eléctricas de EE. UU. en transmisión y distribución (de la que Hubbell vende componentes, un porcentaje pequeño de cada proyecto) más el material eléctrico de baja tensión para edificios, industria y centros de datos en Norteamérica. No hay una cifra pública del mercado de componentes; usamos como indicador la inversión total de las eléctricas privadas de EE. UU. (Edison Electric Institute), de la que más de la mitad es transmisión y distribución [2, 3]. Es un indicador de la demanda, no el tamaño del mercado de Hubbell, por eso la cuota se mide a mano.',
    tamano: 'Inversión de las eléctricas privadas de EE. UU.: ≈178.000 M USD en 2024 y ≈208.000 M en 2025; más de 1,1 billones previstos en 2025-2029 [2, 3]',
    unidad_serie: 'millones de USD (inversión de las eléctricas privadas de EE. UU.)',
    serie: [{ anio: '2024', tamano: 178000 }, { anio: '2025', tamano: 208000 }],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Crecimiento de la carga (centros de datos, electrificación, reindustrialización)', efecto: '+', horizonte: 'Estructural', evidencia: 'Inversión de las eléctricas de 178.000 M (2024) a ≈208.000 M (2025) y >1,1 billones en 2025-2029 [2, 3]; Electrical Solutions orgánico +18 % en el 2T26 [5].' },
      { driver: 'Red envejecida y endurecimiento frente a incendios y tormentas', efecto: '+', horizonte: 'Estructural', evidencia: 'Más de la mitad de la inversión de las eléctricas va a transmisión y distribución [3]; Grid Infrastructure +12-18 % en 2026 [5].' },
      { driver: 'Coste de materias primas y aranceles', efecto: '−', horizonte: 'Cíclico', evidencia: 'Margen ajustado −50 pb en el 2T26 por inflación, materiales y aranceles [5].' },
      { driver: 'Ciclo de contadores y automatización de red', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Grid Automation −18 % en el 3T25 y +1 % en el 2T26 [5].' },
      { driver: 'Tipos de interés y regulación tarifaria de las eléctricas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La inversión de las eléctricas depende de que el regulador la reconozca en tarifa [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Competidores grandes (Eaton, ABB, Schneider) y especialistas (Preformed Line Products, MacLean Power); en cada familia de producto hay 2-4 proveedores homologados [1, 6].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Los diez primeros clientes son el 42 % de las ventas (distribuidores), pero las eléctricas compran por homologación y fiabilidad [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Materias primas cotizadas (cobre, acero, aluminio) sin un proveedor dominante [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Homologaciones de cada eléctrica, catálogo de miles de referencias y red de distribución [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'Componentes físicos de la red sin sustituto; solo cambia la tecnología en contadores y sensores [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La inversión de las eléctricas está en máximos (≈208.000 M en 2025, +17 %) [2] y el orgánico de Hubbell se aceleró del 0 % de 2024 al 10 % del 2T26 [5]. En 2008-09 y 2020 las ventas de componentes de red aguantaron mejor que el material para la construcción; en 2024 el ajuste de inventarios de los distribuidores y la caída de contadores dejaron el orgánico en cero [1].' },
    regulacion: 'Las eléctricas invierten según planes que aprueban las comisiones estatales y la FERC, que reconocen la inversión en la base de activos regulada; la orden 1920 de la FERC (2024) obliga a planificar la transmisión a largo plazo [3]. Los aranceles de 2025-2026 sobre acero, aluminio e importaciones encarecen materiales; la empresa los traslada a precio con retraso [5].',
    tendencias: 'La demanda eléctrica de EE. UU. vuelve a crecer tras dos décadas plana (centros de datos, electrificación, fábricas), lo que exige más transmisión, subestaciones y conexiones: es el centro de la tesis de Hubbell [2, 5]. En contadores la tecnología cambia más deprisa y la competencia es más dura [5]. Las compras de DMC Power y NSI llevan a Hubbell a más transmisión y centros de datos [7].',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Uno de los dos o tres primeros fabricantes de herrajes, conectores y aisladores para la red de EE. UU. (con Preformed Line Products y MacLean Power), y proveedor relevante de material eléctrico de baja tensión; no publica cuota [1].',
    competidores: [
      { nombre: 'Eaton', pais: 'EE. UU./Irlanda', ticker: 'ETN', ingresos: 30026, cuota_pct: null, margen_ebit_pct: 16.6, comentario: 'Mucho más grande; fuerte en distribución eléctrica y centros de datos [6].' },
      { nombre: 'Schneider Electric', pais: 'Francia', ticker: 'SU', ingresos: 47138, cuota_pct: null, margen_ebit_pct: 18.2, comentario: 'Distribución eléctrica y gestión de energía; más peso fuera de EE. UU. [6].' },
      { nombre: 'ABB (Electrification)', pais: 'Suiza', ticker: 'ABBN', ingresos: 17357, cuota_pct: null, margen_ebit_pct: 23.5, comentario: 'Media y baja tensión, conectores (Thomas & Betts en EE. UU.) [6].' },
      { nombre: 'Legrand', pais: 'Francia', ticker: 'LR', ingresos: 11332, cuota_pct: null, margen_ebit_pct: 19.0, comentario: 'Aparamenta e infraestructura de centros de datos [6].' },
      { nombre: 'nVent Electric', pais: 'Irlanda', ticker: 'NVT', ingresos: 3893, cuota_pct: null, margen_ebit_pct: 15.8, comentario: 'Armarios, conexiones y puesta a tierra (Erico); rival directo de Burndy [6].' },
      { nombre: 'MacLean Power Systems', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; rival en herrajes y aisladores de distribución [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de componentes [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Homologaciones por eléctrica y especificación en los proyectos; el cliente no cambia un conector de alta tensión por ahorrar unos euros [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marcas como Chance, Anderson, Burndy, Hubbell; 3.250 patentes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Escala de fabricación en EE. UU., sin ventaja clara frente a Eaton o ABB [1, 6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercados de nicho con pocos proveedores homologados; margen operativo del 20,7 % frente al 16-19 % de Eaton, Schneider y Legrand [1, 6].' },
      ],
    },
    amenazas: 'Las grandes (Eaton, ABB, Schneider) pueden apretar precio en las familias donde coinciden, sobre todo si el ciclo de inversión de las eléctricas se frena. En contadores (Aclara) la tecnología y la competencia (Itron, Landis+Gyr) ya han erosionado ventas. Si los centros de datos frenan su inversión, Electrical Solutions perdería el impulso del 2026 [5, 6].',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es el ahorro y la fiabilidad de la red: los productos de Hubbell permiten conectar renovables y nueva carga; seguridad laboral en 18.000 empleados de fábrica; consumo de metales (cobre, acero, aluminio) [1].',
    controversias: 'Sin sanciones ni litigios materiales en los últimos tres años según el 10-K 2025 (contingencias legales «no materiales») [1].',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado de componentes de red y CR5', tipo: 'Complemento', intentos: '1) 10-K (no lo da); 2) EEI y prensa sectorial (solo la inversión total de las eléctricas); 3) informes de mercado de pago', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct', tipo: 'Complemento', intentos: '1) 10-K: «no puede especificar con precisión» la cuota; 2) presentaciones a inversores; 3) prensa', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad; 2) MSCI y Sustainalytics (de pago); 3) prensa', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, retribución, ratio de retribución, accionistas, voto de 2025', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000130817926000121/hubb014454-def14a.htm` },
  { id: 2, titulo: 'Form 10-K 2025 (directivos)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-12', url: `${E8}/000162828026007500/hubb-20251231.htm` },
  { id: 3, titulo: 'Form 4 de HUBB presentados entre el 15-oct-2025 y el 15-oct-2026 (herramientas/form4.mjs)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000048898&type=4' },
  { id: 4, titulo: 'Notas de prensa de resultados con la guía anual (4T22-2T26)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-28', url: `${E8}/000162828026049934/exhibit991_07282026.htm` },
  { id: 5, titulo: 'Hubbell Reports Fourth Quarter and Full Year 2025 Results (resultado de 2025 frente a la guía)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-02-03', url: `${E8}/000162828026004800/exhibit991_02032026.htm` },
];
const consejero = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
guarda('C', {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Gerben W. Bakker', cargo: 'Presidente y consejero delegado', desde: '2020', participacion_pct: 0.12, trayectoria: 'En Hubbell desde 1988; dirigió Power Systems (2014-2019). Como consejero delegado ha llevado el margen operativo del 12,7 % de 2021 al 20,7 % de 2025 y el BPA continuado de 6,66 a 16,54 [1, 2].' },
      { nombre: 'Joseph A. Capozzoli', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'Director financiero desde enero de 2026; antes, finanzas de Electrical Solutions y transformación del negocio en la propia Hubbell [2].' },
      { nombre: 'Gregory A. Gumbs', cargo: 'Presidente de Utility Solutions', desde: '2023', participacion_pct: null, trayectoria: 'Antes consejero delegado de Bosch Rexroth (2020-2023) y directivo de Eaton (2015-2020) [2].' },
      { nombre: 'Mark E. Mikes', cargo: 'Presidente de Electrical Solutions', desde: '2023', participacion_pct: null, trayectoria: 'En Hubbell desde 1989; dirigió Hubbell Power Systems [2].' },
      { nombre: 'Anthony J. Guzzi', cargo: 'Consejero independiente coordinador', desde: '2006', participacion_pct: null, trayectoria: 'Presidente y consejero delegado de EMCOR Group, gran instalador eléctrico de EE. UU. [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'BPA ajustado 18,10-18,30 (oct-25); ventas +3-4 %', real: 'BPA ajustado 18,21; ventas +3,8 %', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado 19,15-19,85 (feb-26), subida a 20,25-20,55 (jul-26, con NSI)', real: 'En curso: 1S26 BPA ajustado 9,45 (+14 %)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y de la casa: Bakker lleva 38 años en Hubbell y los presidentes de segmento, desde 2023 [2]. El único cambio reciente es el director financiero (enero de 2026), relevo interno [2]. Cumplió la guía de 2025 y la ha subido dos veces en 2026 [4, 5]. El presidente es también consejero delegado; lo compensa un consejero coordinador independiente [1].',
  },
  gobierno: {
    consejo: [
      consejero('Gerben W. Bakker', 'Presidente y consejero delegado', 'Ejecutivo', '2020', 'Ejecutiva (presidente)'),
      consejero('Anthony J. Guzzi', 'Consejero coordinador', 'Independiente', '2006', 'Retribuciones, Ejecutiva, Finanzas, Nombramientos y Gobierno'),
      consejero('John F. Malloy', 'Consejero', 'Independiente', '2011', 'Auditoría, Ejecutiva, Finanzas (presidente)'),
      consejero('Edward H. Baine', 'Consejero', 'Independiente', '2025', 'Retribuciones, Finanzas'),
      consejero('Rhett A. Hernandez', 'Consejero', 'Independiente', '2021', 'Auditoría, Finanzas'),
      consejero('Jennifer M. Pollino', 'Consejera', 'Independiente', '2020', 'Retribuciones, Nombramientos y Gobierno'),
      consejero('Carlos M. Cardoso', 'Consejero', 'Independiente', '2013', 'Retribuciones (presidente), Ejecutiva, Nombramientos y Gobierno'),
      consejero('Neal J. Keating', 'Consejero', 'Independiente', '2010', 'Retribuciones, Ejecutiva, Nombramientos y Gobierno (presidente)'),
      consejero('Garrick J. Rochow', 'Consejero', 'Independiente', '2024', 'Auditoría, Finanzas'),
      consejero('Debra L. Dial', 'Consejera', 'Independiente', '2023', 'Auditoría, Finanzas'),
      consejero('Bonnie C. Lind', 'Consejera', 'Independiente', '2019', 'Auditoría (presidenta), Ejecutiva, Nombramientos y Gobierno'),
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 90.0, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 10.35, fijo: 1.15, variable_corto: 1.33, variable_largo: 7.36, ratio_salario_medio: 161 },
    remuneracion: 'Retribución total del consejero delegado en 2025: 10,35 M USD (salario 1,15 M, bonus 1,33 M, acciones y SAR 7,36 M) [1]. El bonus anual es un 80 % financiero (BPA ajustado, flujo de caja libre) y un 20 % estratégico; el incentivo a largo plazo es un 75 % por resultados: acciones por resultados a tres años con tres métricas de igual peso (crecimiento de ventas relativo, margen operativo ajustado y rentabilidad total relativa para el accionista) y derechos de revalorización [1]. El voto consultivo de 2025 tuvo ≈90 % a favor [1]. Ratio con el empleado mediano: 161 veces [1]. Crítica: ninguna métrica mide el rendimiento del capital (ROIC) y el BPA ajustado excluye la amortización de las compras, lo que premia comprar.',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.6, tipo: 'Institucional pasivo', variacion: 'Dato del 13G/A a dic-23 [1]' },
      { nombre: 'BlackRock', pct: 7.6, tipo: 'Institucional pasivo', variacion: 'Dato del 13G/A a mar-25 [1]' },
    ],
    insiders: [
      { fecha: '2026-02-06', persona: 'Gerben W. Bakker (presidente y consejero delegado)', operacion: 'Venta', acciones: 25233, importe: 12.59 },
      { fecha: '2026-02-17', persona: 'Mark E. Mikes (Electrical Solutions)', operacion: 'Venta', acciones: 2601, importe: 1.36 },
      { fecha: '2026-02-09', persona: 'Katherine A. Lane (secretaria general)', operacion: 'Venta', acciones: 4610, importe: 2.33 },
      { fecha: '2025-11-05', persona: 'Mark E. Mikes (Electrical Solutions)', operacion: 'Venta', acciones: 2470, importe: 1.15 },
      { fecha: '2025-11-17', persona: 'John F. Malloy (consejero)', operacion: 'Compra', acciones: 435, importe: 0.19 },
    ],
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestoras pasivas (Vanguard 12,6 %, BlackRock 7,6 %) [1]. Una sola clase de acciones, un voto por acción, consejeros elegidos cada año por mayoría [1]. Sin operaciones vinculadas relevantes declaradas [1]. Presidente ejecutivo con consejero coordinador independiente (Guzzi, desde 2006: casi 20 años en el consejo, lo que resta independencia práctica) [1].',
    alertas: ['Ventas de directivos por 20,4 M USD en 12 meses, sin plan 10b5-1; la mayor, del consejero delegado (12,6 M el 6-feb-2026 a ≈499 USD), sobre todo tras ejercer derechos de revalorización [3].', 'Cambio de director financiero en enero de 2026 (relevo interno) [2].'],
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_contra_pct', tipo: 'Complemento', intentos: '1) Proxy 2026 (solo «≈90 % a favor»); 2) 8-K 5.07 de mayo-2025 y mayo-2026 (no leído el detalle); 3) prensa', decision: 'Omitido' },
  ],
});

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de HUBB, SPY y XLI (precio, rentabilidades, betas, volatilidad, cierres anuales) hasta el 14-oct-2026', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/HUBB/history' },
  { id: 2, titulo: 'Hubbell (HUBB) Stock Forecast: 14 analistas, «Buy», objetivo medio 560,58 USD (mín. 502, máx. 630); ventas 2026e 6.870 M y 2027e 7.570 M; BPA ajustado 20,50 y 22,96', editor: 'Stock Analysis (S&P Global)', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hubb/forecast/' },
  { id: 3, titulo: 'Hubbell (HUBB) statistics: acciones 52,83 M, posición corta 4,83 %, ROIC 13,6 %, próximos resultados 27-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/hubb/statistics/' },
  { id: 4, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10): 5,21 % el 13-oct-2026', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables (Schneider, ABB, nVent, Trane, Johnson Controls, Vertiv): múltiplos de MarketScreener y ROIC de Stock Analysis llevados al cierre del 14-oct, en la nota D del informe de Eaton del repositorio; Eaton con su consenso de MarketScreener', editor: 'MarketScreener / Stock Analysis (vía informe eaton-2026-10-15)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'informes/eaton-2026-10-15/notas/D.json' },
  { id: 7, titulo: 'Transacciones del sector (Boyd Thermal, Fibrebond, Avail EPG, Trachte, PurgeRite, UtilityInnovation) recogidas en el informe de Eaton del repositorio', editor: 'Empresas / prensa (vía informe eaton-2026-10-15)', tipo: 'Primaria', fecha: '2026-10-15', url: 'informes/eaton-2026-10-15/notas/D.json' },
  { id: 8, titulo: 'Hubbell to Acquire NSI Industries (3.000 M USD, ≈15,5x el EBITDA de 2026e, ventas de ≈570 M)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-05-04', url: `${E8}/000119312526204099/d133302dex991.htm` },
  { id: 9, titulo: 'Noticias de HUBB en Seeking Alpha (RSS): resultados 1T26 y 2T26, compra de NSI, emisión de 1.900 M en bonos, conferencias de septiembre', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://seekingalpha.com/api/sa/combined/HUBB.xml' },
  { id: 10, titulo: 'Stock Track: Hubbell Plunges 7.02% in Pre-market Despite Q1 Beat as Guidance Disappoints', editor: 'Tiger Brokers', tipo: 'Prensa', fecha: '2026-04-30', url: 'https://www.itiger.com/news/1141953025' },
  { id: 11, titulo: 'Why Hubbell Incorporated’s (HUBB) Stock Is Down (15-oct-2026: −2,5 % en la sesión; 2 subidas de recomendación y ninguna bajada en el último mes)', editor: 'AAII', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.aaii.com/investingideas/article/541523-why-hubbell-incorporated8217s-hubb-stock-is-down-513' },
  { id: 12, titulo: 'Movimiento del precio de HUBB (herramientas/movimiento.mjs, sesión del 15-oct-2026 en curso)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/HUBB/history' },
  { id: 13, titulo: 'Eaton: noticias del sector (14-sep-2026: «AI slowdown fears hammer data-center power and construction stocks»)', editor: 'Seeking Alpha (vía informe eaton-2026-10-15)', tipo: 'Prensa', fecha: '2026-09-14', url: 'https://seekingalpha.com/api/sa/combined/ETN.xml' },
  { id: 14, titulo: 'Hubbell Reports Second Quarter 2026 Results (guía 2026, deuda, acciones)', editor: 'Hubbell Incorporated / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-28', url: `${E8}/000162828026049934/exhibit991_07282026.htm` },
];
const b = BOLSA.bolsa;
const cierres = Object.fromEntries(BOLSA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const EATON_D = JSON.parse(fs.readFileSync(path.join(dir, '../../eaton-2026-10-15/notas/D.json'), 'utf8'));
const comps = EATON_D.comparables.empresas.filter((e) => e.ticker !== 'HUBB' && e.ticker !== 'VRT');
// Eaton: PER de los próximos 12 meses con su consenso de MarketScreener (BPA 2026e 11,25 y 2027e 14,74; 2,5 meses de 2026 y 9,5 de 2027)
const etnPer = Math.round((408.85 / ((11.25 * 2.5 + 14.74 * 9.5) / 12)) * 10) / 10;
comps.push({ nombre: 'Eaton', ticker: 'ETN', pais: 'IE', capitalizacion: 159250, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: etnPer, crecimiento_pct: 12.0, margen_ebitda_pct: null, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null });
guarda('D', {
  _estado: 'completo',
  identificacion: {
    nombre: 'Hubbell Incorporated', nombre_corto: 'Hubbell', ticker: 'HUBB', isin: 'US4435106079', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Componentes y equipos eléctricos', sede: 'Shelton (Connecticut)', fundacion: '1888', empleados: 18000, web: 'https://www.hubbell.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 53.03, capitalizacion_publicada: 24440, free_float_pct: 99.5,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: '≈ 246 M USD/día (3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía 2026 (28-jul-2026, con NSI): ventas +16-18 %, orgánico +9-11 %, BPA GAAP 17,25-17,55 y ajustado 20,25-20,55 (excluye ≈2,50 de amortización de intangibles y ≈0,50 de costes de transacción), tipo fiscal ajustado del 22-22,5 %, conversión de caja del ≈90 % del beneficio ajustado [14]. Es la segunda subida del año del ajustado (19,15-19,85 en febrero) [14]. No hay plan a medio plazo con cifras públicas leído para este informe.',
    estimaciones: [
      { periodo: '2026e', ingresos: 6870, ebitda: null, ebit: null, bpa: 20.50, dpa: 5.68, fuente: 'Stock Analysis (S&P Global; BPA ajustado sin amortización de compras), 15-oct-2026 [2]; DPA: 4 × 1,42 declarado' },
      { periodo: '2027e', ingresos: 7570, ebitda: null, ebit: null, bpa: 22.96, dpa: null, fuente: 'Stock Analysis (S&P Global; BPA ajustado), 15-oct-2026 [2]' },
    ],
    recomendaciones: { n_analistas: 14, comprar: null, mantener: null, vender: null, po_medio: 560.58, po_min: 502, po_max: 630 },
    revisiones: 'El BPA ajustado de 2026 sube por las dos revisiones de la guía (de 19,15-19,85 a 20,25-20,55) y por NSI (+0,20) [9, 14]. En el último mes hubo 2 subidas de recomendación y ninguna bajada [11]. Solo una fuente gratuita con estimaciones completas (Stock Analysis); el objetivo medio de 560,58 USD se contrasta con el ≈554 USD que citaba MarketBeat en julio [2, 9].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  },
  bolsa: { ...b, posicion_corta_pct: 4.83 },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: cierres[y], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: null,
  },
  comparables: {
    criterio: 'Fabricantes de material y equipos eléctricos cotizados con exposición a red, edificios y centros de datos: Schneider, ABB, Eaton, nVent, Trane y Johnson Controls (Vertiv, fuera: es un especialista en centros de datos y su EBITDA de los últimos y próximos 12 meses no cuadra entre proveedores). Ninguno es un comparable puro: los especialistas en componentes de red (Preformed Line Products, MacLean Power) son muy pequeños o privados. Cifras de la nota D del informe de Eaton del mismo día, llevadas al cierre del 14-oct [6]. Los PER son en su mayoría ajustados (sin amortización de compras) y el de Hubbell en este informe es GAAP: por eso pesan poco.',
    empresas: comps,
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'NSI Industries (racores, conectores, temporizadores)', comprador: 'Hubbell', ev: 3000, ev_ventas: 5.26, ev_ebitda: 15.5, prima_pct: null, excluir: false, comentario: '3.000 M sobre ventas previstas de ≈570 M en 2026 y ≈15,5x el EBITDA de 2026e [8].' },
      ...EATON_D.transacciones.operaciones.filter((o) => !o.excluir && o.ev_ebitda != null),
    ],
  },
  fuentes: fD,
  huecos: [],
});

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $HUBB (30 mensajes, mayo-octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://api.stocktwits.com/api/2/streams/symbol/HUBB.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares de análisis de HUBB (feb-sep 2026: «A Premium Compounder…», «High Valuation And Margin Concerns…», «Shares Look Fully Valued», «The Grid’s Small Components Can Deliver Large Returns»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-11', url: 'https://seekingalpha.com/api/sa/combined/HUBB.xml' },
  { id: 3, titulo: 'Why Hubbell Incorporated’s (HUBB) Stock Is Down (nota de valoración «Ultra Expensive»)', editor: 'AAII', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://www.aaii.com/investingideas/article/541523-why-hubbell-incorporated8217s-hubb-stock-is-down-513' },
];
guarda('E', {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($HUBB)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Dominan los mensajes alcistas sobre la red eléctrica como «cuello de botella» de la IA; en mayo-junio, desconcierto por la caída de ~100 USD en un mes y operaciones con opciones [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-09', n_comentarios: 12, tono: 'Dividido', resumen: 'Mitad «compounder premium del superciclo de la red», mitad «valoración alta y márgenes bajo presión»; nadie discute la calidad del negocio [2].' },
      { plataforma: 'AAII (comentario de valoración)', fecha: '2026-10', n_comentarios: 1, tono: 'Negativo', resumen: 'Califica la valoración de «Ultra Expensive» [3].' },
    ],
    temas: [
      { tema: 'La red eléctrica como beneficiaria de la IA y los centros de datos', postura: 'Alcista', peso: 'Alto', contraste: 'Lo apoyan los datos: Electrical Solutions orgánico +18 % y Grid Infrastructure +12 % en el 2T26 [2].' },
      { tema: 'Valoración exigente', postura: 'Bajista', peso: 'Alto', contraste: 'Coincide con nuestro DCF: el valor intrínseco queda por debajo del precio.' },
      { tema: 'Márgenes y compra de NSI', postura: 'Dividida', peso: 'Medio', contraste: 'El margen ajustado bajó 50 pb en el 2T26 y NSI se pagó a 15,5x EBITDA con deuda [2].' },
    ],
    lectura: 'El inversor particular está más entusiasmado que el análisis: lee Hubbell como «acción de IA», mientras los autores con más trabajo detrás coinciden en que el negocio es bueno pero el precio ya lo descuenta. No hay euforia ni capitulación; el sentimiento no cambia la decisión.',
  },
  fuentes: fE,
  huecos: [],
});
console.log('Notas A-E escritas');
