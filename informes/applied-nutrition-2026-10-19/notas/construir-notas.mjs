// Escribe las notas A-E de Applied Nutrition plc (APN, LSE Main Market; corte 2026-10-19).
// Ejercicio cerrado a 31 de julio; «FY2025» = agosto de 2024 a julio de 2025 (etiqueta «fin»). Cifras en millones de GBP.
// Fuentes primarias: informe anual FY25 y nota de resultados FY25, resultados semestrales H1 FY26 y H1 FY25, información
// financiera histórica del folleto de salida a bolsa (FY22-FY24), cuentas de Applied Nutrition Limited de FY21 en Companies House
// (FRS 102, escaneadas: leídas como imagen), avisos de resultados (9-dic-2025, 17-feb-2026, 1-jun-2026, 26-ago-2026) y RNS de
// colocaciones, operaciones de directivos y participaciones (Investegate). XBRL ESEF (cuentas.mjs) solo trae FY24 y FY25: sirve de
// contraste. El FY26 (cerrado el 31-jul-2026) NO está publicado: las cuentas salen el 16-nov-2026.
// Ejecutar: node informes/applied-nutrition-2026-10-19/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const mov = JSON.parse(fs.readFileSync(path.join(dir, 'movimiento.json'), 'utf8'))['APN.L'];
const compsRaw = JSON.parse(fs.readFileSync(path.join(dir, 'comparables-yahoo-raw.json'), 'utf8'));
const W = 'https://www.appliednutritionplc.com/wp-content/uploads';
const INV = 'https://www.investegate.co.uk/announcement/rns/applied-nutrition-plc--apn';
const GBPUSD = 1.3338; // Yahoo GBPUSD=X, 19-oct-2026
const EURGBP = 0.8417; // Yahoo EURGBP=X, 19-oct-2026

// ================================================================ A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2025 (ejercicio a 31-jul-2025): estados consolidados, notas, informe de remuneraciones, participaciones significativas y partes vinculadas', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-07', url: `${W}/2025/11/web_APN_AR25.pdf` },
  { id: 2, titulo: 'Final Results FY25 (RNS): cuenta, balance, flujos y notas de FY25 y FY24; revisión del director financiero', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/APN-Full-Year-Results-2025-RNS.pdf` },
  { id: 3, titulo: 'Interim results for the six months ended 31 January 2026 (RNS): estados intermedios no auditados, ventas por zona, circulante y capex previsto', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-03-23', url: `${W}/2026/03/APN-HY26-Results-final.pdf` },
  { id: 4, titulo: 'Prospectus, Section B: Historical Financial Information (FY22, FY23 y FY24, NIIF adoptadas en el Reino Unido, informe de BDO)', editor: 'Applied Nutrition plc / BDO LLP', tipo: 'Primaria', fecha: '2024-10-14', url: `${W}/2024/10/Historical-Financial-Information-Prospectus.pdf` },
  { id: 5, titulo: 'Applied Nutrition Limited (09131749): Full accounts made up to 31 July 2021 (FRS 102, auditadas por Haines Watts)', editor: 'Companies House', tipo: 'Primaria', fecha: '2021-12-23', url: 'https://find-and-update.company-information.service.gov.uk/company/09131749/filing-history' },
  { id: 6, titulo: 'FY26 Trading Update and FY27 Outlook (RNS 1371S): ventas FY26 ≈ 160 M GBP, EBITDA ajustado ≈ 43,3 M, caja neta 15,9 M; guía FY27', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-08-26', url: 'https://www.appliednutritionplc.com/fy26-trading-update-and-fy27-outlook/' },
  { id: 7, titulo: 'Interim results for the six months ended 31 January 2025 (RNS)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-04-07', url: `${W}/2025/04/APN-Interim-Results-RNS-H1-FY25.pdf` },
  { id: 8, titulo: 'HY26 Investor Presentation', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-03-23', url: `${W}/2026/03/APN-HY26-Investor-Presentation-final.pdf` },
  { id: 9, titulo: 'FY25 Investor Presentation', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/APN-FY25-Investor-Presentation-1.pdf` },
  { id: 10, titulo: 'Group Trading Ahead of Expectations, Acquisition of US Manufacturing Facility, and New North American Collaboration (RNS)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-06-01', url: `${INV}/trading-update-acquisition-and-collaboration/9593422` },
  { id: 11, titulo: 'Trading Update (RNS): FY26 ≈ 10 % por encima del consenso', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-12-09', url: `${INV}/trading-update/9283662` },
  { id: 12, titulo: 'H1 FY26 Trading Update (RNS): ventas del semestre 74,5 M; guía FY26 ≈ 140 M', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-02-17', url: `${INV}/h1-fy26-trading-update-/9433492` },
  { id: 13, titulo: 'Registro ESEF/XBRL de FY24 y FY25 (filings.xbrl.org, herramientas/cuentas.mjs): contraste de cuenta, balance y flujos', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2025-11-07', url: 'https://filings.xbrl.org/' },
];

// Cuenta: FY21 (FRS 102, sin NIIF 16) [5]; FY22-FY24 del folleto [4]; FY25 [1, 2]. BPA sobre 250 M de acciones (división y
// acciones liberadas de oct-2024: el folleto y las cuentas reexpresan el BPA a 250 M) [2, 4].
const cuenta = [
  { periodo: 'FY2021', ingresos: 21.81, coste_ventas: 10.28, gastos_generales: 4.47, ebitda: 7.30, amortizaciones: 0.23, ebit: 7.07, resultado_financiero: -0.03, bai: 7.04, impuestos: 1.20, minoritarios: 0, beneficio_neto: 5.84, gastos_financieros: 0.03, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.0234, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 250.0 },
  { periodo: 'FY2022', ingresos: 35.03, coste_ventas: 20.95, gastos_generales: 4.13, ebitda: 10.42, amortizaciones: 0.47, ebit: 9.95, resultado_financiero: -0.07, bai: 9.88, impuestos: 1.67, minoritarios: 0, beneficio_neto: 8.21, gastos_financieros: 0.07, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.0328, dpa: 0.024, dpa_extraordinario: 0.024, acciones_diluidas: 250.0 },
  { periodo: 'FY2023', ingresos: 60.78, coste_ventas: 33.64, gastos_generales: 9.24, ebitda: 18.54, amortizaciones: 0.63, ebit: 17.91, resultado_financiero: 0.02, bai: 17.93, impuestos: 4.11, minoritarios: 0, beneficio_neto: 13.82, gastos_financieros: 0.05, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 0.0553, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 250.0 },
  { periodo: 'FY2024', ingresos: 86.15, coste_ventas: 44.86, gastos_generales: 18.91, ebitda: 24.65, amortizaciones: 0.91, ebit: 23.74, resultado_financiero: 0.65, bai: 24.38, impuestos: 5.73, minoritarios: 0, beneficio_neto: 18.65, gastos_financieros: 0.09, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.35, bpa: 0.0746, dpa: 0, dpa_extraordinario: 0, acciones_diluidas: 250.0 },
  { periodo: 'FY2025', ingresos: 107.10, coste_ventas: 57.80, gastos_generales: 22.90, ebitda: 29.20, amortizaciones: 1.10, ebit: 28.10, resultado_financiero: 0.40, bai: 28.50, impuestos: 7.40, minoritarios: 0, beneficio_neto: 21.10, gastos_financieros: 0.10, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1.70, bpa: 0.084, dpa: 0.0588, dpa_extraordinario: 0.0588, acciones_diluidas: 250.0 },
];
// Balance al cierre [1, 2, 4, 5]. Inmovilizado material con los derechos de uso (NIIF 16 desde FY22). FY21: deuda = préstamo
// bancario 0,98 + cuenta corriente con consejeros 1,84; proveedores = acreedores a corto sin esas dos partidas (incluye impuestos).
const balanceHist = [
  { periodo: 'FY2021', activo_total: 19.43, activo_corriente: 18.73, pasivo_corriente: 6.02, pasivo_total: 6.93, fondo_comercio: 0, intangibles: 0, inmovilizado_material: 0.70, existencias: 4.80, clientes: 5.78, proveedores: 3.98, activos_contrato: null, pasivos_contrato: null, caja: 8.15, deuda_financiera: 2.82, arrendamientos: 0, patrimonio_neto: 12.50, minoritarios: 0, reservas: 12.50 },
  { periodo: 'FY2022', activo_total: 22.11, activo_corriente: 20.16, pasivo_corriente: 5.85, pasivo_total: 7.24, fondo_comercio: 0, intangibles: 0.00, inmovilizado_material: 1.95, existencias: 8.70, clientes: 6.06, proveedores: 5.73, activos_contrato: null, pasivos_contrato: null, caja: 5.40, deuda_financiera: 0, arrendamientos: 1.12, patrimonio_neto: 14.87, minoritarios: 0, reservas: 14.87 },
  { periodo: 'FY2023', activo_total: 40.62, activo_corriente: 37.21, pasivo_corriente: 9.54, pasivo_total: 11.87, fondo_comercio: 0, intangibles: 0.04, inmovilizado_material: 3.37, existencias: 12.98, clientes: 11.50, proveedores: 9.28, activos_contrato: null, pasivos_contrato: null, caja: 12.74, deuda_financiera: 0, arrendamientos: 2.06, patrimonio_neto: 28.75, minoritarios: 0, reservas: 28.69 },
  { periodo: 'FY2024', activo_total: 59.65, activo_corriente: 55.54, pasivo_corriente: 9.90, pasivo_total: 11.63, fondo_comercio: 0, intangibles: 0.04, inmovilizado_material: 3.48, existencias: 19.48, clientes: 17.33, proveedores: 9.58, activos_contrato: null, pasivos_contrato: null, caja: 18.72, deuda_financiera: 0, arrendamientos: 1.80, patrimonio_neto: 48.02, minoritarios: 0, reservas: 47.78 },
  { periodo: 'FY2025', activo_total: 75.00, activo_corriente: 68.70, pasivo_corriente: 17.70, pasivo_total: 20.70, fondo_comercio: 0, intangibles: 0.10, inmovilizado_material: 5.00, existencias: 22.80, clientes: 27.40, proveedores: 17.10, activos_contrato: null, pasivos_contrato: null, caja: 18.50, deuda_financiera: 0, arrendamientos: 3.00, patrimonio_neto: 54.30, minoritarios: 0, reservas: 53.80 },
];
const flujosHist = [
  { periodo: 'FY2021', flujo_operativo: 2.79, capex: 0.54, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0.01, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 },
  { periodo: 'FY2022', flujo_operativo: 6.49, capex: 0.29, pagos_arrendamientos: 0.11, adquisiciones: 0, desinversiones: 0.03, dividendos: 6.00, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.06 },
  { periodo: 'FY2023', flujo_operativo: 8.52, capex: 1.00, pagos_arrendamientos: 0.17, adquisiciones: 0, desinversiones: 0.02, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.04 },
  { periodo: 'FY2024', flujo_operativo: 6.70, capex: 1.06, pagos_arrendamientos: 0.26, adquisiciones: 0, desinversiones: 0.04, dividendos: 0, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.08 },
  { periodo: 'FY2025', flujo_operativo: 15.60, capex: 1.00, pagos_arrendamientos: 0.30, adquisiciones: 0, desinversiones: 0, dividendos: 14.70, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0.10 },
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ene-26', fecha_fin: '2026-01-31', ingresos: 134.0, ebitda: 38.7, ebit: 37.3, beneficio_neto: 27.6, bpa: 0.1104, dpa: 0, dpa_extraordinario: 0, fcf: 15.1, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Crecimiento orgánico muy alto y sin compras hasta junio de 2026: las ventas pasaron de 21,8 M GBP en FY21 a 107,1 M en FY25 (TCAC del 49 %) [1, 4, 5], con un FY25 de +24,2 % (Reino Unido +44 %, Europa +46 %, Internacional +3 % por la salida de un distribuidor de Oriente Medio y 5,5 M de pedidos adelantados a FY24) [2, 7]. El margen bruto bajó de 47,9 % a 46,0 % en FY25 por la proteína de suero (whey), un 30 % más cara de media, y la mezcla [2]; el margen EBITDA publicado pasó de 29,8 % (FY22) a 30,5 % (FY23), 28,6 % (FY24) y 27,3 % (FY25), y el ajustado se quedó en el 29 % [2, 4]. El semestre a enero de 2026 vendió 74,5 M (+56,5 %) con margen EBITDA del 28,9 % [3]; el avance de agosto da para FY26 unas ventas de ≈ 160 M (+50 %) y un EBITDA ajustado de ≈ 43,3 M (27,1 %), aún sin auditar [6]. FY21 está en FRS 102 (sin NIIF 16: los alquileres van en gastos) y no es del todo comparable con FY22-FY25.',
    ajustes: 'La empresa publica un EBITDA y un beneficio «ajustados» que excluyen los costes de la salida a bolsa (1,2 M en FY24 y 1,7 M en FY25; 1,8 M en el primer semestre de FY25) y un pago en acciones de planes previos a la salida (0,2 M en FY24) [2, 4]. No se repiten: en el primer semestre de FY26 no hubo partidas ajustadas [3]. Aquí se usa la cifra publicada, y esos costes de la salida a bolsa se marcan como no recurrentes para que el EBITDA de los múltiplos sea el recurrente. El BPA ajustado de FY25 fue de 9,1 peniques frente a 8,4 publicado [2]. Los dividendos de FY22 (6,0 M) y FY25 (14,7 M, pagado en octubre de 2024 antes de la salida a bolsa) fueron repartos de sociedad privada: van como extraordinarios; la empresa no prevé dividendos antes de FY27 [3].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S FY24', ingresos: 45.4, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 16.4, margen_ebitda_pct: 36.1, bpa: 0.049, vs_consenso: null },
      { periodo: '2S FY24', ingresos: 40.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 9.6, margen_ebitda_pct: 23.5, bpa: 0.026, vs_consenso: null },
      { periodo: '1S FY25', ingresos: 47.6, crecimiento_pct: 4.8, crecimiento_organico_pct: 4.8, ebitda: 13.8, margen_ebitda_pct: 29.0, bpa: 0.035, vs_consenso: 'En línea' },
      { periodo: '2S FY25', ingresos: 59.5, crecimiento_pct: 45.8, crecimiento_organico_pct: 45.8, ebitda: 17.1, margen_ebitda_pct: 28.7, bpa: 0.049, vs_consenso: 'Superior' },
      { periodo: '1S FY26', ingresos: 74.5, crecimiento_pct: 56.5, crecimiento_organico_pct: 56.5, ebitda: 21.5, margen_ebitda_pct: 28.9, bpa: 0.062, vs_consenso: 'Superior' },
      { periodo: '2S FY26 (avance, sin auditar)', ingresos: 85.5, crecimiento_pct: 43.7, crecimiento_organico_pct: null, ebitda: 21.8, margen_ebitda_pct: 25.5, bpa: null, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Semestres (la empresa no publica trimestres). En la presentación del 23-mar-2026 [3, 8] la dirección explicó el +56,5 % del semestre por más espacio en lineal en los clientes de siempre (droguerías, supermercados y tiendas de descuento del Reino Unido), Latinoamérica (+110 %), el relanzamiento de Critical Whey (+128 %) y el mayor número de lanzamientos de su historia; avisó de que el año sería más concentrado en el primer semestre porque los minoristas cargaron existencias antes de enero, y de menos volumen a Oriente Medio por el corte de rutas. El mensaje cambió respecto a noviembre de 2025 [2, 9]: entonces el foco era recuperar Internacional tras la salida de un distribuidor; en marzo, la capacidad (fábrica fase 3 y nuevo almacén y sede, capacidad de ≈ 300 M de ventas) y las compras. Lo que preguntó el mercado y quedó sin cifra: la conversión de caja (51 % en el semestre frente al 84 % un año antes, por clientes y existencias) y cuánto del primer semestre era carga de existencias de los clientes. El 1-jun-2026 subió la guía a 148 M y compró Nutrablend en EE. UU. por 16 M USD [10]; el 26-ago dio 160 M y una guía de FY27 de 205 M de ventas con un EBITDA de 49 M, avisando de un margen algo menor por EE. UU. y el suero [6].',
    confianza: 'Media',
  },
  balance: {
    historico: balanceHist,
    vencimientos: [],
    liquidez: 'Caja neta (sin NIIF 16) de 26,4 M GBP a 31-ene-2026 y de 15,9 M a 31-jul-2026 (sin auditar), después de pagar 16 M USD (≈ 12 M GBP) por Nutrablend y la ampliación de la fábrica [3, 6]. Línea de crédito revolving de 10 M GBP con Royal Bank of Scotland, sin disponer [3].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda financiera desde FY22: los únicos pasivos financieros son los arrendamientos NIIF 16 (3,1 M a 31-ene-2026: 0,9 M a corto y 2,2 M a largo) [3]. Provisiones de 0,3 M por desmantelamiento [2]. No hay pensiones de prestación definida (solo aportación definida) [1]. Rappels por volumen a clientes reconocidos dentro de «proveedores y otras cuentas a pagar» [2]. No constan factoring, confirming ni pagos aplazados de compras; la compra de Nutrablend se pagó al contado con pasivos asumidos de menos de 0,1 M USD [10]. Garantías y litigios: ninguno relevante declarado [1].',
    comentario: 'El circulante es la gran partida: existencias 22,8 M y clientes 27,4 M frente a proveedores de 17,1 M en julio de 2025 (circulante comercial de 33,1 M, el 31 % de las ventas) [2]; en enero de 2026 ya eran 32,9 M de existencias y 33,4 M de clientes, y la empresa lo explica por la carga de existencias de enero y por clientes que aún no habían vencido (109 días de circulante, igual que un año antes) [3]. Crecer al 50 % con un circulante de 100-110 días consume la caja: la caja neta bajó de 26,4 M (enero) a 15,9 M (julio) pese a un EBITDA del segundo semestre de unos 21,8 M, después de 12 M de Nutrablend y la inversión en capacidad [6]. El balance es de caja neta, sin deuda bancaria desde FY22 [4].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosHist,
    comentario: 'La conversión de beneficio en caja es irregular porque el circulante crece con las ventas: el flujo operativo fue de 6,7 M en FY24 (impuestos pagados de 9,7 M por el cambio a pagos a cuenta) y de 15,6 M en FY25, frente a un EBITDA de 24,6 y 29,2 M [2, 4]. El capex es pequeño (1,0 M al año, el 1 % de las ventas) porque la fábrica de Knowsley es alquilada y se amplió en FY25; para FY26-FY27 la empresa anuncia 2,0-2,5 M de líneas automáticas y 3,5-4,0 M de acondicionar el nuevo almacén y sede, más los 16 M USD de Nutrablend (nave en propiedad valorada en ≈ 7 M USD, maquinaria ≈ 4 M USD y existencias ≈ 5 M USD) [3, 10]. Estimación propia: el capex de mantenimiento es ≈ 0,5 % de las ventas; el resto es capacidad. El flujo libre de FY25 (16,5 M según la empresa, 72 % del beneficio ajustado) se fue entero en el dividendo previo a la salida a bolsa (14,7 M) [2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'BDO LLP',
    anios_auditor: 3,
    opinion: 'Favorable (sin salvedades) en FY25 y en la información histórica del folleto [1, 4]',
    comentario: 'Cuentas sencillas: un solo segmento, ventas reconocidas en el momento de la entrega, sin capitalización de I+D ni intereses, sin fondo de comercio hasta la compra de Nutrablend (junio de 2026), sin deuda y con remuneración en acciones casi nula (0,1 M en el semestre) [1, 3]. Los rappels por volumen se estiman al cierre y se restan de las ventas: es la principal estimación de la cuenta [2]. Los ajustes de la empresa se limitan a los costes de la salida a bolsa [2]. BDO audita desde FY22, cuando la empresa pasó a NIIF; antes auditaba Haines Watts con FRS 102 [4, 5]. La primera auditoría de un grupo cotizado en crecimiento rápido pide vigilar dos partidas: clientes (27,4 M, 93 días de ventas en julio de 2025) y existencias (con caducidad de 24 meses de las materias primas) [1, 2]. Lectura de los indicadores del motor: el Altman Z sale muy alto por la caja y el patrimonio frente a un pasivo pequeño; el Piotroski F alto por márgenes y caja; el Beneish M hay que leerlo con cuidado porque los días de cobro suben con el crecimiento y con la mezcla de grandes superficies, no por una política de ventas agresiva visible en las notas.',
    senales: [
      { senal: 'Clientes que crecen más que las ventas', nivel: 'Media', comentario: 'Clientes de 17,3 M a 27,4 M (+58 %) con ventas +24 % en FY25; 33,4 M en enero de 2026. La empresa lo atribuye a la concentración de ventas al final del periodo; sin provisiones relevantes de insolvencias declaradas [1, 3].' },
      { senal: 'Conversión de caja del semestre baja', nivel: 'Media', comentario: 'Flujo libre del 51 % del beneficio ajustado en el primer semestre de FY26, frente al 84 % un año antes [3].' },
      { senal: 'FY26 sin auditar', nivel: 'Baja', comentario: 'Las cifras de FY26 son de un avance; las cuentas auditadas salen el 16-nov-2026 [6].' },
    ],
    confianza: 'Media',
  },
  capital: {
    politica: 'Sin dividendo desde la salida a bolsa: la empresa no prevé declarar ninguno antes de FY27 y reserva la caja para capacidad, eficiencia y compras [3]. Sin recompras. Prioridades declaradas: (1) capacidad de producción y logística (fábrica fase 3, almacén global y sede nueva; capacidad de ≈ 300 M de ventas), (2) compras que abran mercados con barreras comerciales (la fábrica de Nutrablend en Buffalo para EE. UU.), (3) acuerdos de licencia sin capital (Morrisons, Mondelēz) [3, 10].',
    adquisiciones: [
      { anio: '2026', objetivo: 'Nutrablend Group (negocio y la mayoría de los activos, Buffalo, Nueva York): nave en propiedad, 5 líneas de envasado de polvo, marcas Basic Supplements y GR8 Lifestyle, ≈ 100 empleados', importe: 12.0, ev_ebitda: null, financiacion: 'Caja propia (16 M USD)', resultado: 'Demasiado pronto: la empresa espera al menos 30 M USD de ventas en FY27 con margen EBITDA de un dígito alto (65 % maquila para terceros) y que mejore el beneficio por acción en FY27 [10].' },
    ],
    comentario: 'Hasta 2026 el capital se asignó con muy poco: 4,9 M de capex en cinco años para multiplicar las ventas por cinco [1, 2, 4, 5], gracias a una fábrica alquilada y a vender a través de distribuidores y minoristas sin red propia. El ROIC incremental es altísimo y no hay dilución (250 M de acciones desde la salida a bolsa, que fue toda de acciones existentes) [4]. Los dividendos previos a la salida a bolsa (20,7 M) fueron para los accionistas fundadores y JD Sports. Desde 2026 empieza otra etapa con más inversión: Nutrablend (12 M), nuevo almacén y sede (3,5-4 M) y fábrica fase 3 (2-2,5 M) [3, 10]. La compra de Nutrablend es pequeña (1,6 % de la capitalización) y razonable por la nave en propiedad (≈ 7 M USD), pero baja el margen del grupo: es la primera prueba de que la dirección sabe comprar.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Proteína', descripcion: 'Proteína en polvo (Critical Whey, Clear Whey), barritas y bebidas', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 12.78, resultado: null }, { periodo: 'FY2023', ingresos: 21.53, resultado: null }, { periodo: 'FY2024', ingresos: 26.12, resultado: null }, { periodo: 'FY2025', ingresos: 32.0, resultado: null }] },
      { nombre: 'Pre-entreno', descripcion: 'ABE (All Black Everything) en polvo, latas y cápsulas', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 7.70, resultado: null }, { periodo: 'FY2023', ingresos: 11.86, resultado: null }, { periodo: 'FY2024', ingresos: 19.59, resultado: null }, { periodo: 'FY2025', ingresos: 18.6, resultado: null }] },
      { nombre: 'Para llevar (grab-and-go)', descripcion: 'Bebidas listas (BodyFuel, agua con proteína, latas ABE), snacks', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 2.90, resultado: null }, { periodo: 'FY2023', ingresos: 11.21, resultado: null }, { periodo: 'FY2024', ingresos: 12.81, resultado: null }, { periodo: 'FY2025', ingresos: 18.7, resultado: null }] },
      { nombre: 'Salud y bienestar', descripcion: 'Vitaminas, colágeno, creatina, gama 40+', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 2.74, resultado: null }, { periodo: 'FY2023', ingresos: 5.15, resultado: null }, { periodo: 'FY2024', ingresos: 9.67, resultado: null }, { periodo: 'FY2025', ingresos: 18.2, resultado: null }] },
      { nombre: 'Control de peso', descripcion: 'Quemadores y sustitutivos', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 5.05, resultado: null }, { periodo: 'FY2023', ingresos: 5.74, resultado: null }, { periodo: 'FY2024', ingresos: 7.37, resultado: null }, { periodo: 'FY2025', ingresos: 5.8, resultado: null }] },
      { nombre: 'Intra-entreno', descripcion: 'Aminoácidos (BCAA), electrolitos (Endurance)', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 2.60, resultado: null }, { periodo: 'FY2023', ingresos: 4.86, resultado: null }, { periodo: 'FY2024', ingresos: 10.42, resultado: null }, { periodo: 'FY2025', ingresos: 13.2, resultado: null }] },
      { nombre: 'Otros (materias primas, marca blanca y rappels)', descripcion: 'Venta de materias primas y envases de marca blanca menos rappels no asignados', tipo_resultado: null, historico: [{ periodo: 'FY2022', ingresos: 1.27, resultado: null }, { periodo: 'FY2023', ingresos: 0.44, resultado: null }, { periodo: 'FY2024', ingresos: 0.17, resultado: null }, { periodo: 'FY2025', ingresos: 0.6, resultado: null }] },
    ],
    geografias: [
      { nombre: 'Reino Unido', peso_pct: 45.2 },
      { nombre: 'Europa', peso_pct: 14.6 },
      { nombre: 'Resto del mundo (Oriente Medio, Latinoamérica, Asia, EE. UU.)', peso_pct: 40.2 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ventas Reino Unido (M GBP)', valor_anterior: '33,6 (FY24)', valor_actual: '48,4 (FY25); 31,5 en 1S FY26', variacion: '+44 %; +45,8 % en 1S FY26', comentario: 'Más espacio en supermercados, descuento y droguerías [2, 3]' },
      { kpi: 'Ventas Europa (M GBP)', valor_anterior: '10,7 (FY24)', valor_actual: '15,6 (FY25); 8,8 en 1S FY26', variacion: '+45,8 %; +37,5 %', comentario: 'España y Alemania; distribuidores país a país [2, 3]' },
      { kpi: 'Ventas Internacional (M GBP)', valor_anterior: '41,9 (FY24)', valor_actual: '43,1 (FY25); 34,2 en 1S FY26', variacion: '+2,9 %; +74,5 %', comentario: 'Oriente Medio y Latinoamérica (+110 % en 1S FY26) [2, 3]' },
      { kpi: 'Margen bruto', valor_anterior: '47,9 % (FY24)', valor_actual: '46,0 % (FY25); 46,7 % en 1S FY26', variacion: '−190 pb; −10 pb', comentario: 'Suero un 30 % más caro en FY25 [2, 3]' },
      { kpi: 'Peso de productos con base de suero en ventas', valor_anterior: '20,2 % (1S FY25)', valor_actual: '20,5 % (1S FY26)', variacion: '+0,3 pp', comentario: 'Sube en FY27 por Critical Whey [3, 6]' },
      { kpi: 'Días de circulante', valor_anterior: '109 (ene-25)', valor_actual: '109 (ene-26)', variacion: '0', comentario: 'Circulante de 44,4 M a ene-26 [3]' },
      { kpi: 'Países con venta', valor_anterior: '> 60', valor_actual: '> 85', variacion: '', comentario: 'Notas a editores de los RNS [6]' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del informe anual FY25 (no hay deuda financiera); 2) estados intermedios a ene-26 (solo arrendamientos); 3) avance de agosto de 2026 (caja neta sin deuda)', decision: 'Omitido: no hay deuda financiera que vencer' },
    { seccion: 'trimestres', campo: 'BPA y desglose del 2S FY26', tipo: 'Complemento', intentos: '1) Avance de resultados de 26-ago-2026 (solo ventas y EBITDA ajustado); 2) web de inversores (cuentas FY26 el 16-nov-2026); 3) consenso de MarketScreener (BPA del año, no del semestre)', decision: 'Omitido hasta las cuentas de FY26' },
  ],
};
guarda('A', A);

// ================================================================ B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Prospectus (oct-2024): Industry overview (Euromonitor International Consumer Health Passport 2024): mercado de nutrición deportiva, salud y bienestar por región y categoría; competidores', editor: 'Applied Nutrition plc / Euromonitor', tipo: 'Sectorial', fecha: '2024-10-14', url: `${W}/2024/10/Prospectus.pdf` },
  { id: 2, titulo: 'Annual Report and Accounts 2025: estrategia, modelo de negocio, mercado, riesgos, historia', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-07', url: `${W}/2025/11/web_APN_AR25.pdf` },
  { id: 3, titulo: 'Interim results H1 FY26: mercado (Euromonitor 2024: 279.000 M GBP en 2028, TCAC 8,1 %), McKinsey Future of Wellness 2025, GLP-1, riesgos', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-03-23', url: `${W}/2026/03/APN-HY26-Results-final.pdf` },
  { id: 4, titulo: 'Trading update, compra de Nutrablend y licencia de Mondelēz (Sour Patch Kids, Swedish Fish) en Walmart y GNC', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-06-01', url: `${INV}/trading-update-acquisition-and-collaboration/9593422` },
  { id: 5, titulo: 'Yahoo Finance, fichas de Glanbia, BellRing Brands, Simply Good Foods, THG, Herbalife, Celsius y Monster (ventas, margen operativo y EBITDA de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 6, titulo: 'Science in Sport: Recommended Cash Acquisition by Einstein Bidco (bd-capital) — ventas FY24 51,9 M GBP, EBITDA ajustado 4,2 M', editor: 'Science in Sport plc (RNS)', tipo: 'Primaria', fecha: '2025-04-17', url: 'https://www.investegate.co.uk/announcement/rns/science-in-sport--sis/recommended-cash-acquisition-/8837474' },
  { id: 7, titulo: 'Licensing agreement with Morrisons for food range (RNS)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-12-19', url: `${INV}/licensing-agreement-with-morrisons-for-food-range/9307876` },
  { id: 8, titulo: 'Final Results FY25 (RNS): ventas por categoría y zona, margen bruto, suero', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/APN-Full-Year-Results-2025-RNS.pdf` },
  { id: 9, titulo: 'FY26 Trading Update and FY27 Outlook: margen FY27 menor por EE. UU. y suero', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-08-26', url: 'https://www.appliednutritionplc.com/fy26-trading-update-and-fy27-outlook/' },
  { id: 10, titulo: 'Celsius Holdings to Acquire Alani Nu (nota de prensa, anexo 99.1 del 8-K)', editor: 'Celsius Holdings (SEC)', tipo: 'Primaria', fecha: '2025-02-20', url: 'https://www.sec.gov/Archives/edgar/data/1341766/000134176625000018/a991pressreleasedatedfebru.htm' },
];
const B = {
  _estado: 'completa',
  historia: {
    resumen: 'Thomas Ryder, culturista y dueño de una tienda de suplementos en Liverpool, compró la marca Applied Nutrition y fundó la sociedad en julio de 2014 [2]. Pasó de distribuir a fabricar en 2016 y en 2020 trasladó la sede y la fábrica a Knowsley (Liverpool). En 2021 JD Sports Fashion compró el 32 % y entró como director de operaciones Steven Granite. Con una salida a bolsa a 140 peniques (capitalización de 350 M GBP) en octubre de 2024, solo de acciones existentes, los fundadores y JD Sports vendieron el 45 % [1]. Entró en el FTSE 250 en diciembre de 2025, JD Sports vendió el resto en abril de 2026 y en junio compró una fábrica en EE. UU. (Nutrablend) [3, 4].',
    hitos: [
      { anio: '2014', hito: 'Fundación por Thomas Ryder (sociedad 09131749) [2]' },
      { anio: '2016', hito: 'Empieza a fabricar sus propios productos [2]' },
      { anio: '2019', hito: 'Expansión internacional a Asia-Pacífico [2]' },
      { anio: '2020', hito: 'Nueva sede y fábrica en Knowsley (44.000 pies cuadrados) [2]' },
      { anio: '2021', hito: 'JD Sports Fashion compra el 32 %; llegan el director de operaciones y el financiero [2]' },
      { anio: '2022', hito: 'Entrada en EE. UU. y segundo almacén en el Reino Unido; gama Endurance [2]' },
      { anio: '2023', hito: 'Colaboración con Swizzels y entrada en Walmart (EE. UU.) [2]' },
      { anio: '2024', hito: 'Salida a bolsa en Londres a 140 peniques (29-oct); entrada en supermercados del Reino Unido [1, 2]' },
      { anio: '2025', hito: 'Licencia con Morrisons para comida con proteína; entrada en el FTSE 250 (diciembre) [7, 3]' },
      { anio: '2026', hito: 'Compra de Nutrablend (Buffalo, EE. UU.) y licencia de Mondelēz para EE. UU. y Canadá [4]' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Applied Nutrition diseña, fabrica y vende suplementos de nutrición deportiva y bienestar con cuatro gamas bajo la misma marca: Applied Nutrition (proteína, creatina, vitaminas), ABE (pre-entreno), BodyFuel (bebidas de hidratación) y Endurance (deportes de resistencia), más de 120 productos, y desde 2026 las marcas de EE. UU. Basic Supplements y GR8 [2, 4]. Fabrica la mayor parte en su planta de Knowsley (Liverpool) y desde junio de 2026 en Buffalo (Nueva York). Vende sobre todo a empresas (B2B): supermercados y tiendas de descuento del Reino Unido (Tesco, Asda, Morrisons, B&M), droguerías y tiendas de salud (Holland & Barrett), cadenas de deporte y gimnasios, y distribuidores exclusivos en más de 85 países; una parte pequeña va directa al consumidor (web, Amazon, aplicación) [2, 3]. En FY25 ningún cliente superó el 10 % de las ventas [2].',
    como_gana_dinero: 'Margen bruto del 46-48 % (FY24-FY26) con margen EBITDA del 27-30 % [8, 3]: fabrica casi todo y vende a distribuidores que pagan la comercialización local, así que gasta en marketing mucho menos que una marca que vende directamente. El coste es sobre todo materia prima (suero de leche, creatina, aromas, envases) y mano de obra directa; el suero es el insumo volátil (un 30 % más caro de media en FY25) y pesa en torno al 20 % de las ventas [8, 3]. El poder de precios es de categoría: «todas las marcas suben a la vez» [3]. La recurrencia viene de la reposición de consumibles, sin contratos largos. Estacionalidad: el pico de enero («propósitos de año nuevo») concentra pedidos en el primer semestre. Apalancamiento operativo moderado: los gastos generales son el 18-19 % de las ventas [3].',
    clientes: 'Modelo B2B con muchos clientes: en FY25 ningún cliente pasó del 10 % de las ventas y los mayores tienen trato directo con el primer ejecutivo [2]. La concentración sí aparece por distribuidor en mercados internacionales: la salida de un distribuidor de Oriente Medio dejó Internacional en +3 % en FY25 y 5,5 M de pedidos adelantados a FY24 distorsionaron el semestre [8]. No hay contratos largos; la licencia con Morrisons es exclusiva a tres años y la de Mondelēz cubre EE. UU. y Canadá [7, 4]. Poder de precios: la empresa repercutió la subida del suero sin perder margen bruto en el 1S FY26 (46,7 % frente a 46,8 %) [3], pero avisa de un margen EBITDA algo menor en FY27 por más ventas de suero y de EE. UU. [9].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'El mercado relevante es la nutrición deportiva (proteína en polvo, productos sin proteína como pre-entreno y creatina, barritas y bebidas proteicas) dentro del mercado más amplio de nutrición deportiva, salud y bienestar que define Euromonitor (incluye vitaminas, control de peso y bebidas energéticas) [1]. Euromonitor da 23.000 M GBP de nutrición deportiva mundial en 2023 (16.000 M en 2019) y 35.000 M en 2028, y 189.000 M GBP del mercado amplio en 2023 (279.000 M en 2028) [1, 3]. Se usa la nutrición deportiva mundial (23.000 M en 2023) como perímetro de la cuota; el mercado amplio es el techo. La segunda fuente independiente son las cifras de ventas y márgenes de los competidores cotizados [5].',
    tamano: '≈ 23.000 M GBP de nutrición deportiva mundial en 2023; 35.000 M en 2028e (Euromonitor) [1]',
    unidad_serie: 'millones de GBP (nutrición deportiva mundial, Euromonitor)',
    serie: [ { anio: '2019', tamano: 16000 }, { anio: '2020', tamano: 15200 }, { anio: '2021', tamano: 16900 }, { anio: '2022', tamano: 19900 }, { anio: '2023', tamano: 23000 }, { anio: '2028e', tamano: 35000 } ],
    tcac_historico_pct: 9.9,
    tcac_previsto_pct: 8.9,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Salud y ejercicio como hábito diario', efecto: '+', horizonte: 'Estructural', evidencia: 'El 84 % de los consumidores de EE. UU. y el 79 % del Reino Unido ven el bienestar como prioridad (McKinsey 2025) [3]' },
      { driver: 'Paso del canal especializado al supermercado', efecto: '+', horizonte: 'Estructural', evidencia: 'Pre-entreno ABE en Tesco; Critical Whey en supermercados desde el 1S FY26 [3]' },
      { driver: 'Precio del suero de leche', efecto: '−', horizonte: 'Cíclico', evidencia: 'Suero un 30 % más caro de media en FY25; «niveles históricamente altos» [8]' },
      { driver: 'Tratamientos GLP-1', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Refuerzan la demanda de proteína para conservar músculo; gama «GLP-1 friendly» con Morrisons [3, 7]' },
      { driver: 'Crecimiento del comercio electrónico y marcas directas', efecto: '−', horizonte: 'Estructural', evidencia: 'En el Reino Unido el 69,6 % de la nutrición deportiva se vende por internet (Euromonitor) [1]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Las diez primeras tienen solo ≈ 36 % del mercado mundial; lanzamientos continuos y promociones; Myprotein (THG) compite en precio por internet [1]' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes supermercados y distribuidores exclusivos negocian lineal y rappels; ninguno pasa del 10 % de las ventas [2]' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'El suero es una materia prima cotizada (+30 % en FY25); el resto de insumos tiene poca volatilidad [8]' },
      { fuerza: 'Amenaza de entrada', intensidad: 4, justificacion: 'Fabricantes de maquila permiten lanzar marcas con poco capital; las marcas de influencers entran rápido [1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Alimentos altos en proteína y bebidas funcionales; la empresa los licencia (Morrisons) en vez de sufrirlos [7]' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Según Euromonitor la nutrición deportiva creció un 9,9 % anual en 2019-2023 y se espera un 8,9 % en 2023-2028 [1]; en 2020 bajó por el cierre de gimnasios y en 2022 aguantó la inflación con subidas de precio. Los indicadores: crecimiento de las ventas de los cotizados (Glanbia y BellRing frenaron en 2025-2026, Celsius y Monster siguieron creciendo [5]) y el precio del suero. Es un consumo discrecional barato: resistente en recesión, sensible a modas.' },
    regulacion: 'Suplementos y alimentos para deportistas: en el Reino Unido, la normativa de complementos alimenticios y las declaraciones nutricionales y de propiedades saludables de la FSA (post-Brexit); en la UE, el Reglamento 1924/2006 y los registros país a país; en EE. UU., la DSHEA de la FDA. Para vender en Oriente Medio cada producto se registra en el país, lo que ralentizó Internacional en FY25 [8]. Riesgo regulatorio del Reino Unido: restricciones a la publicidad de alimentos con mucho azúcar (HFSS) y posibles límites a la cafeína de los pre-entrenos para menores [2].',
    tendencias: 'Tres tendencias favorecen a Applied Nutrition: el paso de la proteína al supermercado (formatos pequeños, bebidas y comida con proteína), la creatina y la salud de más de 40 años, y las colaboraciones con marcas de golosinas (Swizzels, Slush Puppie, Sour Patch Kids) que atraen a consumidores nuevos [3, 4]. En contra: la presión de las marcas propias de los supermercados y de Myprotein en precio, y el cambio del suero. La empresa gana con la integración vertical (lanza productos en semanas) y pierde si el consumidor migra a la compra directa por internet, donde es más débil [1, 3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 0.6,
    posicion: 'Marca de nutrición deportiva británica de crecimiento rápido; ≈ 0,6 % del mercado mundial de nutrición deportiva (160 M GBP de ventas en FY26 frente a ≈ 27.000 M de mercado estimado para 2026 a partir de Euromonitor) y una de las marcas que más crecen en el canal físico del Reino Unido [1, 2, 9]. Líderes mundiales: Glanbia (Optimum Nutrition), Mondelēz (Grenade, Clif) y Nutrabolt (C4) [1].',
    competidores: [
      { nombre: 'Glanbia (Optimum Nutrition, Isopure)', pais: 'IE', ticker: 'GL9.IR', ingresos: 3450, cuota_pct: null, margen_ebit_pct: 10.0, comentario: 'Líder mundial en proteína en polvo; marca premium, venta por internet y especialistas; margen del grupo (incluye ingredientes) [1, 5]' },
      { nombre: 'BellRing Brands (Premier Protein, Dymatize)', pais: 'US', ticker: 'BRBR', ingresos: 1766, cuota_pct: null, margen_ebit_pct: 11.5, comentario: 'Batidos listos para beber en EE. UU.; crecimiento frenado y acción hundida en 2025-2026 [5]' },
      { nombre: 'The Simply Good Foods Company (Quest, Atkins, OWYN)', pais: 'US', ticker: 'SMPL', ingresos: 1044, cuota_pct: null, margen_ebit_pct: 12.8, comentario: 'Barritas y batidos proteicos en EE. UU.; ventas a la baja en FY27e [5]' },
      { nombre: 'THG (Myprotein)', pais: 'GB', ticker: 'THG.L', ingresos: 1763, cuota_pct: null, margen_ebit_pct: -0.6, comentario: 'Rival directo en el Reino Unido por internet, con precios bajos; grupo con pérdidas (nutrición y belleza) [1, 5]' },
      { nombre: 'Celsius Holdings (Celsius, Alani Nu)', pais: 'US', ticker: 'CELH', ingresos: 2284, cuota_pct: null, margen_ebit_pct: 19.1, comentario: 'Bebidas energéticas «de bienestar»; compra de Alani Nu en 2025 [5, 10]' },
      { nombre: 'Science in Sport (SiS, PhD)', pais: 'GB', ticker: null, ingresos: 51.9, cuota_pct: null, margen_ebit_pct: null, comentario: 'Competidor británico directo; ventas −17,5 % en 2024 y EBITDA ajustado de solo 4,2 M; excluida de bolsa por bd-capital en 2025 [6]' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica: producto de consumo sin red.' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El consumidor cambia de marca sin coste; el minorista, con algo de fricción por lineal y rappels [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca reconocida en el canal físico del Reino Unido y colaboraciones exclusivas (Swizzels, Slush Puppie, Mondelēz, Morrisons); acreditaciones de pureza (Informed Sport) [2, 4, 7].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Fabricación propia y modelo B2B: margen EBITDA del 27-30 % frente al 12-16 % de Glanbia, BellRing y Simply Good Foods [5, 8].' },
        { fuente: 'Escala eficiente', puntuacion: 1, evidencia: 'Mercado fragmentado (diez primeras ≈ 36 %): la escala no impide la entrada [1].' },
      ],
    },
    amenazas: 'Tres cosas pueden erosionar la ventaja. (1) Los supermercados británicos meten sus marcas propias en la categoría ahora que es masiva (probabilidad media). (2) Una crisis de calidad o de contenido real de proteína, que en el sector ha tumbado marcas (probabilidad baja, impacto alto) [3]. (3) Que el modelo de distribuidor exclusivo pierda frente a la venta directa por internet en Europa y EE. UU., donde Myprotein y Optimum Nutrition dominan (probabilidad media) [1]. El margen alto atrae competencia: si la categoría madura en el Reino Unido, el crecimiento dependerá de mercados donde la marca es menos conocida.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven las cifras: (1) seguridad y calidad del producto (sustancias prohibidas en deporte, contenido declarado de proteína): la empresa tiene acreditaciones de laboratorio independiente y un fallo dañaría la marca y las ventas a deportistas de élite [2, 3]; (2) materias primas de origen lácteo (suero) y su huella de carbono, cada vez más vigilada por los supermercados [2]; (3) seguridad laboral en una planta de envasado con muchas horas extra en los picos [3]. Publica el informe SECR (emisiones de alcance 1 y 2) en el informe anual [2].',
    controversias: 'No se encontraron sanciones, retiradas de producto ni litigios relevantes en los tres últimos años en el informe anual, los RNS ni la prensa revisada [2, 3]. El riesgo de producto figura como el primero de la lista de riesgos principales [3].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual FY25 (no cita calificaciones); 2) MSCI ESG Ratings y Sustainalytics (sin ficha pública de APN); 3) web de inversores (sin informe ESG separado)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) Folleto (solo «diez primeras ≈ 36 %»); 2) informe anual FY25 (sin cuota); 3) presentación FY25 (sin cuota)', decision: 'Omitido; se cita el 36 % de las diez primeras en Porter' },
  ],
};
guarda('B', B);

// ================================================================ C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025: consejo, comisiones, informe de remuneraciones (cifras auditadas), participaciones de los consejeros y significativas', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-07', url: `${W}/2025/11/web_APN_AR25.pdf` },
  { id: 2, titulo: 'Result of AGM (8-ene-2026): votaciones de todas las propuestas', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-01-08', url: `${INV}/result-of-agm/9342063` },
  { id: 3, titulo: 'Results of Secondary Placing: JD Sports Fashion vende 22.750.000 acciones a 2,15 GBP', editor: 'Peel Hunt (RNS)', tipo: 'Primaria', fecha: '2026-04-16', url: `${INV}/results-of-secondary-placing-in-applied-nutrition/9522512` },
  { id: 4, titulo: 'Result of secondary placing: Thomas Ryder y Steven Granite venden 7.000.000 acciones a 275 peniques; bloqueo de 180 días', editor: 'Panmure Liberum (RNS)', tipo: 'Primaria', fecha: '2026-09-11', url: `${INV}/result-of-secondary-placing-in-applied-nutrition-/9766676` },
  { id: 5, titulo: 'Director/PDMR Dealing: Ryder Holdings Ltd (4.500.000) y Steven Granite (2.500.000) a 2,75 GBP', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-09-11', url: `${INV}/director-pdmr-shareholding/9768376` },
  { id: 6, titulo: 'Director/PDMR Dealing: Joe Pollard vende 550.000 acciones a 2,76-2,78 GBP (3 y 4-jun-2026)', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-06-04', url: `${INV}/director-pdmr-shareholding/9602305` },
  { id: 7, titulo: 'Director/PDMR Dealing: Marnie Millard compra 13.257 acciones a 2,249 GBP', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-04-13', url: `${INV}/director-pdmr-shareholding/9517748` },
  { id: 8, titulo: 'Interim results H1 FY26: cambios en las comisiones (Millard a Auditoría, Cowgill a Remuneraciones)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-03-23', url: `${W}/2026/03/APN-HY26-Results-final.pdf` },
  { id: 9, titulo: 'Holding(s) in Company: UBS Group AG (5,21 % el 8-oct-2026; 0 % el 12-oct-2026)', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/holding-s-in-company/9820842` },
  { id: 10, titulo: 'Final Results FY25 y avances de resultados (guías de FY25 y FY26 frente a lo logrado)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2025-11-10', url: `${W}/2025/11/APN-Full-Year-Results-2025-RNS.pdf` },
  { id: 11, titulo: 'Announcement of Pricing and Offer Size (salida a bolsa a 140 peniques)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2024-10-24', url: `${W}/2024/10/Announcement-of-Pricing-and-Offer-Size.pdf` },
  { id: 12, titulo: 'FY26 Trading Update and FY27 Outlook', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-08-26', url: 'https://www.appliednutritionplc.com/fy26-trading-update-and-fy27-outlook/' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Thomas Ryder', cargo: 'Fundador y primer ejecutivo (CEO)', desde: '2014', participacion_pct: 32.46, trayectoria: 'Empezó con una tienda de suplementos en Liverpool y compró la marca; ha llevado las ventas de 11,2 M GBP (FY20) a ≈ 160 M (FY26) con margen EBITDA cercano al 30 % [1, 12]. Renunció a su bonus de FY25 [1].' },
      { nombre: 'Steven Granite', cargo: 'Director de operaciones (COO)', desde: '2021', participacion_pct: 4.80, trayectoria: 'Contable de gestión; fue director financiero, consejero delegado y presidente ejecutivo de Abbey Logistics Group (capital privado) hasta su venta a Sitra en 2023 [1].' },
      { nombre: 'Joe Pollard', cargo: 'Director financiero (CFO)', desde: '2021', participacion_pct: 0.26, trayectoria: 'Censor jurado de cuentas (Deloitte) y director de finanzas corporativas en Grant Thornton; asesoró la entrada de JD Sports en 2021 y llevó la salida a bolsa de 2024 [1]. Vendió 550.000 acciones en junio de 2026 [6].' },
      { nombre: 'Andy Bell', cargo: 'Presidente no ejecutivo', desde: '2024', participacion_pct: 2.37, trayectoria: 'Cofundador y primer ejecutivo de AJ Bell (1995-2022), que llevó al FTSE 250 [1].' },
      { nombre: 'Aaron Heidebreicht', cargo: 'Consejero delegado de EE. UU.', desde: '2024', participacion_pct: null, trayectoria: 'Fichado en 2024 para el negocio de EE. UU., que en 2026 suma la fábrica de Buffalo [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2025', guia: 'Ventas ≈ 100 M GBP y margen EBITDA ≈ 29 % (salida a bolsa, oct-2024)', real: 'Ventas 107,1 M; margen EBITDA ajustado 29 %', cumplida: 'Sí' },
      { anio: 'FY2026', guia: 'Consenso de 122,3 M de ventas antes del 9-dic-2025; la empresa subió a «+10 %» (dic), ≈ 140 M (feb) y ≈ 148 M (jun)', real: '≈ 160 M de ventas y 43,3 M de EBITDA ajustado (avance sin auditar, 26-ago-2026)', cumplida: 'Sí' },
      { anio: 'FY2027', guia: 'Ventas ≈ 205 M y EBITDA ajustado ≈ 49 M (26-ago-2026), con Nutrablend', real: 'En curso', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo fundador con una historia de guías superadas desde la salida a bolsa: cinco subidas de previsiones en doce meses [10, 12]. El riesgo es de persona clave: Thomas Ryder concentra las relaciones con los grandes clientes y la innovación, y la propia empresa lo cita entre sus riesgos principales [1]. El equipo financiero y de operaciones es de 2021 y viene de capital privado y asesoría; la dirección de EE. UU. es nueva y ahora tiene una fábrica. No hay plan de sucesión publicado. En 2026 los tres consejeros ejecutivos vendieron acciones: el CFO casi la mitad de las suyas sin motivo declarado (junio) y el CEO y el COO el 5 % y el 17 % de las suyas para «diversificar» (septiembre) [4, 5, 6].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Andy Bell', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos (presidente), Remuneraciones' },
      { nombre: 'Thomas Ryder', cargo: 'Primer ejecutivo', tipo: 'Ejecutivo', desde: '2014', comisiones: 'Divulgación' },
      { nombre: 'Steven Granite', cargo: 'Director de operaciones', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Joe Pollard', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2021', comisiones: 'Divulgación' },
      { nombre: 'Marnie Millard', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2024', comisiones: 'Nombramientos, Remuneraciones (presidenta), Auditoría y Riesgos (desde mar-2026)' },
      { nombre: 'Tony Buffin', cargo: 'Consejero independiente', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría y Riesgos (presidente), Nombramientos, Divulgación' },
      { nombre: 'Peter Cowgill', cargo: 'Consejero no ejecutivo', tipo: 'Otro externo', desde: '2025', comisiones: 'Nombramientos, Auditoría y Riesgos, Remuneraciones (desde mar-2026)' },
      { nombre: 'Deepti Velury Bakhshi', cargo: 'Consejera independiente', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos, Remuneraciones' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 99.1, voto_remuneracion_contra_pct: 0.9, voto_remuneracion_contra_libre_pct: 2.3, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 0.18, fijo: 0.18, variable_corto: 0, variable_largo: 0, ratio_salario_medio: 5 },
    remuneracion: 'Remuneración modesta para un FTSE 250: el CEO cobró 178.309 GBP en FY25 (salario de 166.667) y renunció al bonus, igual que el COO; el CFO cobró 334.348 GBP con un bonus de 108.506 ligado al EBITDA ajustado [1]. La política aprobada en enero de 2026 (99,1 % a favor) da un único plan de incentivos de hasta el 200 % del salario (100 % en FY26), con un tercio en efectivo y el resto en acciones diferidas a dos años más dos de retención, con malus y cláusula de recuperación; las métricas de FY26 son el EBITDA ajustado (70 %) y las ventas (30 %): premian crecer, no la rentabilidad del capital ni la caja [1, 2]. Ratio CEO/empleado medio de 5 a 1 [1]. Los ejecutivos se alinean por su participación (Ryder, 32 %), no por el variable.',
    accionistas: [
      { nombre: 'Thomas Ryder (Ryder Holdings)', pct: 32.46, tipo: 'Fundador y CEO', variacion: 'Vendió 4,5 M de acciones a 275 p el 11-sep-2026 (del 34,26 %); bloqueo de 180 días [4, 5]' },
      { nombre: 'Pentwater Capital Management', pct: 5.0, tipo: 'Fondo (instrumentos financieros)', variacion: 'Notificado el 31-mar-2025; sin cambios notificados después [1]' },
      { nombre: 'Steven Granite', pct: 4.80, tipo: 'Consejero ejecutivo (COO)', variacion: 'Vendió 2,5 M el 11-sep-2026 (del 5,80 %) [4, 5]' },
      { nombre: 'Andy Bell', pct: 2.37, tipo: 'Presidente', variacion: 'Sin cambios desde la salida a bolsa [1]' },
      { nombre: 'Peter Cowgill', pct: 2.0, tipo: 'Consejero (ex presidente de JD Sports)', variacion: 'Sin cambios desde 2025 [1]' },
      { nombre: 'JD Sports Fashion', pct: 0, tipo: 'Antiguo accionista industrial', variacion: 'Vendió todo (22,75 M, 9,1 %) a 2,15 GBP el 16-abr-2026 [3]' },
      { nombre: 'Autocartera', pct: 0, tipo: 'Autocartera', variacion: 'Sin autocartera [1]' },
    ],
    insiders: [
      { fecha: '2026-04-13', persona: 'Marnie Millard (consejera)', operacion: 'Compra', acciones: 13257, importe: 0.03 },
      { fecha: '2026-06-04', persona: 'Joe Pollard (CFO)', operacion: 'Venta', acciones: 550000, importe: 1.52 },
      { fecha: '2026-09-11', persona: 'Thomas Ryder (CEO, vía Ryder Holdings)', operacion: 'Venta', acciones: 4500000, importe: 12.38 },
      { fecha: '2026-09-11', persona: 'Steven Granite (COO)', operacion: 'Venta', acciones: 2500000, importe: 6.88 },
    ],
    control_y_defensas: 'Thomas Ryder, fundador y CEO, tiene el 32,46 % tras vender en septiembre; con el COO y el presidente, los consejeros suman ≈ 42 % [1, 4]. No hay acuerdo de relación formal publicado ni pacto de accionistas tras la salida de JD Sports [3]. Una acción, un voto; sin blindajes estatutarios [1]. Con un 32 % y una junta con un 81 % de asistencia, el fundador decide de hecho cualquier votación ordinaria y bloquea las especiales: se trata como accionista de control. Peter Cowgill, ex presidente ejecutivo de JD Sports e inversor personal antes de la salida a bolsa, figura como independiente en el informe anual; aquí se le trata como «otro externo» por su relación con el antiguo accionista industrial. Las ventas a JD Sports Gyms (0,3 M en FY25) dejaron de ser vinculadas tras la salida a bolsa [1].',
    alertas: [
      'Ventas de los tres consejeros ejecutivos en 2026: CFO 550.000 acciones (≈ 46 % de las suyas, sin motivo declarado, 3-4 de junio, 276-278 p); CEO y COO 7 M de acciones a 275 p el 11-sep-2026 («primera venta desde la salida a bolsa», para diversificar), con bloqueo de 180 días [4, 5, 6].',
      'Salida completa de JD Sports Fashion (9,1 %) en una colocación acelerada a 215 p el 16-abr-2026 [3].',
      'Comisión de auditoría formada en FY25 por solo dos miembros; reforzada en marzo de 2026 [8].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ================================================================ D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de APN.L, ^FTMC y GL9.IR (herramientas/bolsa.mjs y movimiento.mjs): precio, rango, volumen, beta, volatilidad, cierres de ejercicio', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/APN.L/history' },
  { id: 2, titulo: 'MarketScreener: estimaciones FY26-FY28 (ventas, EBITDA, EBIT, beneficio neto, BPA, caja neta) de Applied Nutrition', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/APPLIED-NUTRITION-PLC-177502293/finances/' },
  { id: 3, titulo: 'MarketScreener: consenso de analistas (7 analistas, comprar; objetivo medio 3,536 GBP, máximo 3,95, mínimo 2,80)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-19', url: 'https://www.marketscreener.com/quote/stock/APPLIED-NUTRITION-PLC-177502293/consensus/' },
  { id: 4, titulo: 'FY26 Trading Update and FY27 Outlook: consenso calculado por la empresa (FY26 148,4 M / 42,0 M; FY27 186,2 M / 47,7 M) y guía FY27', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2026-08-26', url: 'https://www.appliednutritionplc.com/fy26-trading-update-and-fy27-outlook/' },
  { id: 5, titulo: 'Deutsche Bank raises Applied Nutrition target on £160m revenue forecast (335 → 350 p, comprar)', editor: 'Proactive Investors', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.proactiveinvestors.co.uk/companies/news/1097717/deutsche-bank-raises-applied-nutrition-target-on-160m-revenue-forecast-1097717.html' },
  { id: 6, titulo: 'Yahoo Finance quoteSummary de los comparables (precio, capitalización, valor empresa, EBITDA, márgenes, deuda, caja, flujo libre, estimaciones de BPA y ventas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'Long-Term Government Bond Yields: 10-year for United Kingdom (IRLTLT01GBM156N), septiembre de 2026: 5,24 %', editor: 'OECD vía FRED (St. Louis Fed)', tipo: 'Datos de mercado', fecha: '2026-09-01', url: 'https://fred.stlouisfed.org/series/IRLTLT01GBM156N' },
  { id: 8, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 9, titulo: 'Science in Sport: Recommended Cash Acquisition (EV 97,8 M GBP, 23,1 veces el EBITDA ajustado de 2024, prima del 23,6 %)', editor: 'Science in Sport plc (RNS)', tipo: 'Primaria', fecha: '2025-04-17', url: 'https://www.investegate.co.uk/announcement/rns/science-in-sport--sis/recommended-cash-acquisition-/8837474' },
  { id: 10, titulo: 'Celsius Holdings to Acquire Alani Nu (1.650 M USD netos; < 3 veces ventas de 595 M; ≈ 12 veces el EBITDA con sinergias de 137 M)', editor: 'Celsius Holdings (SEC, 8-K anexo 99.1)', tipo: 'Primaria', fecha: '2025-02-20', url: 'https://www.sec.gov/Archives/edgar/data/1341766/000134176625000018/a991pressreleasedatedfebru.htm' },
  { id: 11, titulo: 'The Simply Good Foods Company to Acquire Only What You Need (OWYN): 280 M USD, 2,3 veces ventas y 13,3 veces el EBITDA ajustado con sinergias', editor: 'Simply Good Foods (nota de prensa)', tipo: 'Primaria', fecha: '2024-04-29', url: 'https://www.nasdaq.com/press-release/the-simply-good-foods-company-to-acquire-only-what-you-need-owyn-2024-04-29' },
  { id: 12, titulo: 'Trading update y compra de Nutrablend por 16 M USD (1-jun-2026)', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-06-01', url: `${INV}/trading-update-acquisition-and-collaboration/9593422` },
  { id: 13, titulo: 'FCA: Short positions daily update (posiciones cortas netas ≥ 0,5 %): Mirabella Financial Services, 0,62 % en Applied Nutrition', editor: 'Financial Conduct Authority', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.fca.org.uk/publication/data/short-positions-daily-update.xlsx' },
  { id: 14, titulo: 'Notice of Results & Presentations: resultados FY26 el 16-nov-2026', editor: 'Applied Nutrition plc (RNS)', tipo: 'Primaria', fecha: '2026-10-07', url: `${INV}/notice-of-results-presentations/9816847` },
  { id: 15, titulo: 'Yahoo Finance: tipos de cambio GBPUSD=X (1,3338) y EURGBP=X (0,8417), 19-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/GBPUSD=X' },
  { id: 16, titulo: 'Announcement of Pricing and Offer Size: salida a bolsa a 140 p (capitalización de 350 M GBP)', editor: 'Applied Nutrition plc', tipo: 'Primaria', fecha: '2024-10-24', url: `${W}/2024/10/Announcement-of-Pricing-and-Offer-Size.pdf` },
];
const r1 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null || !isFinite(x) ? null : Math.round(x * 100) / 100);
const corte = new Date('2026-10-19');
const fx = (c) => (c === 'USD' ? 1 / GBPUSD : c === 'EUR' ? EURGBP : c === 'GBp' ? 0.01 : 1);
const nombres = { 'GL9.IR': ['Glanbia', 'IE'], BRBR: ['BellRing Brands', 'US'], SMPL: ['Simply Good Foods', 'US'], HLF: ['Herbalife', 'US'], USNA: ['USANA Health Sciences', 'US'], CELH: ['Celsius Holdings', 'US'], MNST: ['Monster Beverage', 'US'], NATR: ["Nature's Sunshine", 'US'], 'THG.L': ['THG (Myprotein)', 'GB'] };
const comparables = compsRaw.filter((c) => nombres[c.s]).map((c) => {
  const e0 = c.trend['0y']; const e1 = c.trend['+1y'];
  const fin0 = e0?.end ? new Date(e0.end) : null;
  const w0 = fin0 ? Math.min(1, Math.max(0, (fin0 - corte) / (365.25 * 864e5))) : 0;
  const epsN = e0?.eps != null && e1?.eps != null ? w0 * e0.eps + (1 - w0) * e1.eps : null;
  const revN = e0?.rev && e1?.rev ? w0 * e0.rev + (1 - w0) * e1.rev : null;
  const mcapGBP = c.s.endsWith('.L') ? c.mcap / 1e6 : (c.mcap * fx(c.cur)) / 1e6; // Yahoo da la capitalización de Londres en GBP
  return {
    nombre: nombres[c.s][0], ticker: c.s, pais: nombres[c.s][1],
    capitalizacion: Math.round(mcapGBP),
    ev_ventas: r2(c.ev / c.rev), ev_ebitda_ltm: c.ebitda > 0 ? r1(c.ev / c.ebitda) : null, ev_ebitda_ntm: null,
    per_ntm: epsN && epsN > 0 ? r1(c.precio / epsN) : null,
    crecimiento_pct: revN && c.rev ? r1((revN / c.rev - 1) * 100) : null,
    margen_ebitda_pct: c.ebitda && c.rev ? r1((c.ebitda / c.rev) * 100) : null,
    roic_pct: null,
    dn_ebitda: c.ebitda > 0 ? r2((c.debt - c.cash) / c.ebitda) : null,
    fcf_yield_pct: c.fcf != null ? r1((c.fcf / c.mcap) * 100) : null,
  };
});
const pers = comparables.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
export const medianaPerComps = pers.length % 2 ? pers[(pers.length - 1) / 2] : (pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2;
const cl = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre / 100]));
const PRECIO = bolsa.identificacion.precio / 100; // 291,5 p = 2,915 GBP (cierre del 16-oct-2026)
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Applied Nutrition plc', nombre_corto: 'Applied Nutrition', ticker: 'APN', isin: 'GB00BPVDXX64', mercado: 'London Stock Exchange (Main Market, segmento de empresas comerciales)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Consumer Staples', industria: 'Personal Care Products (nutrición deportiva)', sede: 'Knowsley, Liverpool (2 Acornfield Road)', fundacion: '2014', empleados: 207, web: 'https://www.appliednutritionplc.com',
    precio: PRECIO, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 250.0, capitalizacion_publicada: 729, free_float_pct: 58.0,
    max_52s: bolsa.identificacion.max_52s / 100, min_52s: bolsa.identificacion.min_52s / 100, volumen_medio_diario: '≈ 2,3 M GBP/día (3 meses; 761.197 acciones)', proximos_resultados: '2026-11-16',
  },
  consenso: {
    guidance: 'Guía del 26-ago-2026 [4]: FY27 (agosto 2026-julio 2027) con ventas de ≈ 205 M GBP (+28 %) y EBITDA ajustado de ≈ 49 M (+13 %), por encima del consenso que calculaba la empresa (186,2 M y 47,7 M), con Nutrablend incluido (al menos 30 M USD de ventas con margen EBITDA de un dígito alto [12]). Avisa de un margen EBITDA algo menor que el 27 % de FY26 por más ventas en EE. UU., el suero más caro y más peso de los productos de suero. FY26 cerrado (sin auditar): ventas de ≈ 160 M (+50 %), EBITDA ajustado de ≈ 43,3 M y caja neta de 15,9 M. Sin objetivos a medio plazo publicados; la capacidad de producción prevista es de ≈ 300 M de ventas en el Reino Unido y ≈ 300 M USD en EE. UU.',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 160.4, ebitda: 43.24, ebit: 41.68, bpa: 0.1258, dpa: 0, fuente: 'MarketScreener, 19-oct-2026 [2]' },
      { periodo: 'FY2027e', ingresos: 204.8, ebitda: 49.03, ebit: 46.27, bpa: 0.1392, dpa: 0, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2028e', ingresos: 225.6, ebitda: 53.71, ebit: 50.65, bpa: 0.1532, dpa: 0, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 7, comprar: null, mantener: null, vender: null, po_medio: 3.536, po_min: 2.80, po_max: 3.95 },
    revisiones: 'Subidas continuas: el consenso de ventas de FY26 que calculaba la propia empresa pasó de 122,3 M (diciembre de 2025) a 133,5 M (febrero), 140,3 M (junio) y 148,4 M (agosto) [4], y el real fue ≈ 160 M. El de FY27 pasó de 186,2 M (agosto) a 204,8 M tras la guía, y el BPA de FY27 está en 13,9 peniques [2]. Deutsche Bank subió su objetivo de 306 a 335 p en junio y a 350 p en agosto (comprar) [5]. Solo hay una fuente gratuita con estimaciones completas (MarketScreener); el contraste con la empresa (consenso propio de ventas y EBITDA) y con Deutsche Bank cuadra.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bolsa.bolsa,
    posicion_corta_pct: 0.62,
    comentario: 'La acción salió a bolsa a 140 p en octubre de 2024 [16], bajó a 117 p en marzo de 2025 (resultados de un primer semestre plano por los pedidos adelantados de Oriente Medio a FY24) y desde entonces ha subido por cinco mejoras de previsiones seguidas, la entrada en el FTSE 250 (diciembre de 2025) y la compra de Nutrablend, hasta un máximo de 350,5 p el 11-ago-2026 [1]. En un año gana un 62,5 % frente al 12,6 % del FTSE 250 y el 39,1 % de Glanbia (precio, sin dividendos). Desde el máximo ha caído un 17 %: guía de FY27 con margen menor (26-ago), colocación del CEO y el COO a 275 p (11-sep) y ventas del CFO en junio. Con solo dos años cotizados, la beta mensual (1,08, 24 meses) y la semanal (0,58) difieren mucho. Posición corta pública: 0,62 % (FCA) [13].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [ { anio: 'FY2025', precio_cierre: cl.FY2025, ev_ebitda_ntm: 7.2, per_ntm: 10.5, excluir: false }, { anio: 'FY2026', precio_cierre: cl.FY2026, ev_ebitda_ntm: 16.2, per_ntm: 23.5, excluir: false } ],
    comentario: 'Cotiza desde el 29-oct-2024: solo hay dos cierres de ejercicio (131 p en julio de 2025 y 323,5 p en julio de 2026) y el de 2026 corresponde a un ejercicio aún sin cuentas publicadas [1]. Con menos de tres ejercicios cotizados la comparación con su historia no es fiable. Múltiplos del año siguiente con el beneficio y el EBITDA que luego se dieron o que estimamos: julio de 2025, valor empresa de ≈ 312 M (1,31 GBP × 250 M de acciones menos 15,5 M de caja neta) ÷ EBITDA de FY2026 (43,3 M) = 7,2 veces y PER de 10,5 veces (BPA de FY2026e de 0,125); julio de 2026, ≈ 796 M ÷ EBITDA de FY2027e (49 M) = 16,2 veces y PER de 23,5 veces (BPA de FY2027e de 0,137, estimación propia) [1, 4]. El múltiplo se ha más que duplicado en un año: el PER del beneficio del año siguiente pasó de ≈ 10 veces (julio de 2025, con un beneficio de FY26 que nadie esperaba tan alto) a ≈ 23 veces (julio de 2026).',
    confianza: 'Baja',
  },
  comparables: {
    criterio: 'Marcas cotizadas de nutrición deportiva y suplementos (Glanbia-Optimum Nutrition, BellRing, Simply Good Foods, THG-Myprotein), de suplementos con venta directa (Herbalife, USANA, Nature\'s Sunshine) y de bebidas funcionales de alto crecimiento que compiten por el mismo lineal y consumidor (Celsius, Monster). No hay ningún comparable puro británico cotizado desde la exclusión de Science in Sport (2025). Los de venta directa son más baratos por un modelo en declive; Celsius y Monster dan el extremo caro de las marcas que crecen. THG queda con PER n.d. por pérdidas.',
    empresas: comparables,
    comentario: 'La mediana del PER de los próximos 12 meses de los comparables es de ≈ 10 veces, muy por debajo de las ≈ 21 veces de Applied Nutrition con mi beneficio de FY27. La diferencia tiene dos causas: las grandes estadounidenses de proteína (BellRing, Simply Good Foods) y las de venta directa (Herbalife, USANA) están en mínimos por ventas planas o a la baja, mientras que Applied Nutrition crece un 28-50 % anual con un ROIC muy alto. Las de crecimiento comparable (Celsius 17 veces, Monster 36 veces) cotizan más caras. Glanbia, la más parecida por producto, está a 12 veces con un crecimiento de un dígito. La mediana sirve de suelo, no de referencia central, para una marca que aún crece a doble dígito [6].',
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-04', objetivo: 'Science in Sport (SiS, PhD)', comprador: 'bd-capital (Einstein Bidco)', ev: 97.8, ev_ventas: 1.88, ev_ebitda: 23.1, prima_pct: 23.6, excluir: false, comentario: 'Competidor británico en reestructuración: 23,1 veces un EBITDA ajustado deprimido (4,2 M sobre 51,9 M de ventas) [9]' },
      { fecha: '2025-02', objetivo: 'Alani Nu (bebidas energéticas y suplementos)', comprador: 'Celsius Holdings', ev: 1237, ev_ventas: 2.77, ev_ebitda: 12.0, prima_pct: null, excluir: false, comentario: '1.650 M USD netos de ventajas fiscales; el múltiplo de 12 veces es sobre un EBITDA de 2024 con sinergias (137 M USD); convertido a 1,3338 USD/GBP [10, 15]' },
      { fecha: '2024-04', objetivo: 'OWYN (batidos proteicos de origen vegetal)', comprador: 'Simply Good Foods', ev: 210, ev_ventas: 2.3, ev_ebitda: 13.3, prima_pct: null, excluir: false, comentario: '280 M USD; 13,3 veces el EBITDA ajustado estimado con sinergias [11, 15]' },
      { fecha: '2026-06', objetivo: 'Nutrablend Group (negocio y activos)', comprador: 'Applied Nutrition', ev: 12.0, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: '16 M USD por nave, maquinaria, existencias y dos marcas; sin cifras de ventas ni EBITDA del vendedor [12]' },
    ],
    comentario: 'Las compras de marcas de nutrición deportiva en crecimiento se pagaron a 2,3-2,8 veces las ventas y a 12-13 veces el EBITDA con sinergias (Alani Nu, OWYN) [10, 11]; SiS, en reestructuración, a 1,9 veces las ventas [9]. Applied Nutrition cotiza ya por encima: unas 4,4 veces sus ventas de FY26 y 16-17 veces su EBITDA. Con un fundador del 32 % que acaba de vender una parte para diversificar y ningún accionista industrial desde la salida de JD Sports, una oferta no es el escenario central; si llegara, un comprador como Glanbia, Mondelēz o un fondo pagaría por la marca en el canal físico británico y la fábrica, pero a los múltiplos de las transacciones el precio actual ya incluye una prima.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'multiplos_historicos', campo: 'serie de 5 años', tipo: 'Complemento', intentos: '1) Yahoo (cotiza desde el 29-oct-2024: un solo cierre de ejercicio con cuentas publicadas); 2) folleto de salida a bolsa (sin precio antes de 2024); 3) MarketScreener (sin múltiplos históricos útiles)', decision: 'Omitido: menos de tres ejercicios cotizados' },
    { seccion: 'consenso', campo: 'reparto de recomendaciones', tipo: 'Complemento', intentos: '1) MarketScreener (solo la media «comprar» y 7 analistas; el reparto va en una imagen); 2) web de inversores (consenso sin recomendaciones); 3) prensa (Deutsche Bank y Cavendish, comprar)', decision: 'Omitido el reparto' },
  ],
};
guarda('D', D);

// ================================================================ E. Sentimiento
const fE = [
  { id: 1, titulo: 'I can\'t wait to buy this excellent FTSE 250 stock for my ISA in April', editor: 'The Motley Fool UK (The Twelfth Magpie)', tipo: 'Foros y redes', fecha: '2026-04-11', url: 'https://www.fool.co.uk/2026/04/11/i-cant-wait-to-buy-this-excellent-ftse-250-stock-for-my-isa-in-april/' },
  { id: 2, titulo: '£1,000 buys 398 shares in this red hot UK stock that\'s smashing Raspberry Pi', editor: 'The Twelfth Magpie (antes Motley Fool UK)', tipo: 'Foros y redes', fecha: '2026-02-24', url: 'https://www.twelfthmagpie.com/2026/02/24/1000-buys-398-shares-in-this-red-hot-uk-stock-thats-smashing-raspberry-pi/' },
  { id: 3, titulo: 'Simply Wall St, narrativa comunitaria de APN («FY26 Revenue Outlook Will Support A More Balanced Risk Profile»), actualizada el 9-sep-2026', editor: 'Simply Wall St', tipo: 'Foros y redes', fecha: '2026-09-09', url: 'https://simplywall.st/community/narratives/gb/household/lse-apn/applied-nutrition-shares/1dt946ob-update-for-applied-nutrition/updates/2-analysts-have-raised-their-price-target-for-applied-nutritio' },
  { id: 4, titulo: 'Applied Nutrition shares drop as investors cash in on rampant growth (titular y entradilla en buscador)', editor: 'The Grocer', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://www.thegrocer.co.uk/news/applied-nutrition-shares-drop-as-investors-cash-in-on-rampant-growth/722967.article' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Positivo',
    tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'The Motley Fool UK / The Twelfth Magpie (artículos para particulares)', fecha: '2026-04', n_comentarios: 2, tono: 'Positivo', resumen: 'Dos piezas de febrero y abril la presentan como valor de crecimiento «que nadie mira», con rentabilidad sobre el capital cercana al 50 % y una tendencia de bienestar duradera; ven la valoración razonable [1, 2].' },
      { plataforma: 'Simply Wall St (narrativa comunitaria)', fecha: '2026-09', n_comentarios: 0, tono: 'Positivo', resumen: 'Sin comentarios de usuarios; la narrativa automática sube el valor razonable con los objetivos de los analistas [3].' },
      { plataforma: 'Prensa sectorial (The Grocer)', fecha: '2026-08', n_comentarios: 1, tono: 'Dividido', resumen: 'Tras la guía de FY27 los inversores «hacen caja»; un analista habla de valoración «bastante llena» (titular; el artículo da 405) [4].' },
    ],
    temas: [
      { tema: 'Crecimiento y sorpresas al alza', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: cinco subidas de previsiones en doce meses y ventas de FY26 un 31 % por encima del consenso de diciembre (nota A).' },
      { tema: 'Valoración llena y toma de beneficios', postura: 'Dividida', peso: 'Medio', contraste: 'El informe coincide: a 21 veces el BPA de FY27 y con un margen que baja, el precio ya descuenta mucho del crecimiento (sección de valoración).' },
      { tema: 'Ventas de directivos', postura: 'Bajista', peso: 'Medio', contraste: 'Hecho comprobado en los RNS: CFO en junio y CEO y COO en septiembre, a 275-278 p (nota C).' },
    ],
    lectura: 'Los foros británicos donde se debate el valor (LSE Chat, ADVFN, Stockopedia) devuelven 403 desde este entorno, Reddit también, y Stocktwits no tiene el símbolo; lo leído son artículos para particulares, una narrativa automática y prensa sectorial. El tono fue entusiasta en la primera mitad de 2026 y se ha enfriado desde agosto con la guía de margen y las ventas de directivos. No aporta nada que el análisis no recoja: el riesgo que señala (valoración llena) es el mismo que sale de los números. Confianza baja por la falta de foros reales.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [
    { seccion: 'sentimiento', campo: 'foros con debate de particulares', tipo: 'Complemento', intentos: '1) LSE Chat (lse.co.uk ShareChat: 403) y ADVFN share chat (403); 2) Reddit (403) y Stocktwits (símbolo no encontrado); 3) Stockopedia (403) y interactive investor (404)', decision: 'Sección con artículos de opinión y confianza baja' },
  ],
};
guarda('E', E);
console.log('Notas A-E escritas;', comparables.length, 'comparables; mediana PER NTM', medianaPerComps, comparables.map((c) => `${c.nombre} ${c.per_ntm}`).join(', '));
