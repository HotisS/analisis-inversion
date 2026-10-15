// Escribe las notas A-E de ABB (corte 2026-10-15) a partir del XBRL de la SEC (20-F 2014-2023, cuentas-xbrl.json),
// la información financiera del 4T25 (cuentas 2024-2025 de las actividades continuadas, sin Robotics), las notas de
// resultados del 4T25 y del 2T26, el informe de remuneración 2025, la presentación del día del inversor 2025, bolsa.mjs,
// Yahoo Finance, MarketScreener y foros. Cada nota cita solo con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const viejos = ['2019', '2020', '2021', '2022', '2023'];
const xc = (p) => X.financieros.cuenta.find((r) => r.periodo === p);
const xb = (p) => X.balance.historico.find((r) => r.periodo === p);
const xf = (p) => X.flujos.historico.find((r) => r.periodo === p);
const sinFin = ({ fin, ...r }) => r;

// DPA en CHF convertido a USD con el cambio de cierre de cada ejercicio (FRED DEXSZUS) [A6]
const DPA = { 2019: 0.83, 2020: 0.91, 2021: 0.90, 2022: 0.91, 2023: 1.04, 2024: 0.99, 2025: 1.19 };

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Q2 2026 results (nota de resultados del 2T26 y del primer semestre; ad hoc art. 53 SIX)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-07-16', url: 'https://resources.news.e.abb.com/attachments/published/137496/en-US/9123465FF532/ABB_Q2_2026_Press_release_English.pdf' },
  { id: 2, titulo: 'Q4 2025 results (nota de resultados del 4T25 y del ejercicio 2025)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://library.e.abb.com/public/17c5f84dedb946478c22ba1e00f5673e/ABB-Q4-2025-press-release-English.pdf' },
  { id: 3, titulo: 'Q4 2025 Financial Information (cuenta, balance, flujos y segmentos 2025 y 2024, actividades continuadas)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://library.e.abb.com/public/efa424a5e55545ef99275bfafc6ff638/ABB-Q4-2025-financial-information.pdf' },
  { id: 4, titulo: 'Hechos XBRL de los formularios 20-F (cuenta, balance y flujos 2014-2023)', editor: 'SEC EDGAR (ABB Ltd, CIK 1091587)', tipo: 'Primaria', fecha: '2024-03-01', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001091587.json' },
  { id: 5, titulo: 'ABB Capital Markets Day 2025 (nota de prensa: objetivos financieros)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2025-11-18', url: 'https://attachment.news.eu.nasdaq.com/a189a7be64ea0331e134c3e15759c3d36' },
  { id: 7, titulo: 'Q1 2026 results (nota de resultados del 1T26)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-04-22', url: 'https://library.e.abb.com/public/dd7e26e13f7a4a4783979a725ef8ff7e/ABB-Q1-2026-press-release-English.pdf' },
  { id: 6, titulo: 'Tipo de cambio CHF por USD (DEXSZUS), cierres de ejercicio', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-09', url: 'https://fred.stlouisfed.org/series/DEXSZUS' },
];
const cuentaVieja = viejos.map((p) => ({ ...sinFin(xc(p)), gastos_financieros: null, dpa: DPA[p], dpa_extraordinario: 0 }));
const cuenta = [
  ...cuentaVieja,
  { periodo: '2024', ingresos: 30583, coste_ventas: 18582, gastos_generales: 5980, ebitda: 5496, amortizaciones: 761, ebit: 4735, resultado_financiero: 188, bai: 4923, impuestos: 1197, minoritarios: 17, beneficio_neto: 3709, gastos_financieros: 74, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.01, dpa: DPA[2024], dpa_extraordinario: 0, acciones_diluidas: 1851 },
  { periodo: '2025', ingresos: 33220, coste_ventas: 19580, gastos_generales: 6593, ebitda: 6860, amortizaciones: 813, ebit: 6047, resultado_financiero: 172, bai: 6219, impuestos: 1570, minoritarios: 88, beneficio_neto: 4561, gastos_financieros: 86, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: 2.50, dpa: DPA[2025], dpa_extraordinario: 0, acciones_diluidas: 1831 },
];
const balVieja = viejos.map((p) => { const b = sinFin(xb(p)); return { ...b, arrendamientos: 0 }; });
const balance = [
  ...balVieja,
  { periodo: '2024', activo_total: 40288, activo_corriente: 20759, pasivo_corriente: 14654, pasivo_total: 25297, fondo_comercio: 8801, intangibles: 999, inmovilizado_material: 3986, existencias: 5420, clientes: 6843, proveedores: 4681, activos_contrato: 889, pasivos_contrato: 2704, caja: 5660, deuda_financiera: 6940, arrendamientos: 0, patrimonio_neto: 14419, minoritarios: 572, reservas: 20648 },
  { periodo: '2025', activo_total: 44885, activo_corriente: 25578, pasivo_corriente: 16421, pasivo_total: 28239, fondo_comercio: 9637, intangibles: 1119, inmovilizado_material: 4692, existencias: 5862, clientes: 7535, proveedores: 5210, activos_contrato: 1090, pasivos_contrato: 3221, caja: 6621, deuda_financiera: 8304, arrendamientos: 0, patrimonio_neto: 16087, minoritarios: 559, reservas: 22606 },
];
const flujosViejos = viejos.map((p) => { const f = sinFin(xf(p)); return { ...f, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, emision_acciones: f.emision_acciones ?? 0 }; });
const flujos = [
  ...flujosViejos,
  { periodo: '2024', flujo_operativo: 4442, capex: 799, pagos_arrendamientos: 0, adquisiciones: 617, desinversiones: 0, dividendos: 1872, recompras: 1247, emision_acciones: 451, intereses_en_financiacion: 0 },
  { periodo: '2025', flujo_operativo: 5250, capex: 1001, pagos_arrendamientos: 0, adquisiciones: 752, desinversiones: 59, dividendos: 2021, recompras: 1499, emision_acciones: 99, intereses_en_financiacion: 0 },
];
const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 35752, ebitda: 7327, ebit: 6472, beneficio_neto: 5036, bpa: 2.77, dpa: 1.19, dpa_extraordinario: 0, fcf: 5200, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -277 },
    cambios_perimetro: [
      { periodo: '2024', descripcion: 'Robotics pasa a actividades interrumpidas (venta a SoftBank firmada el 8-oct-2025): 2024 y 2025 son actividades continuadas reexpresadas; 2019-2023 son el grupo publicado entonces, con Robotics (≈2.300 M de ventas) [A3, A4]' },
      { periodo: '2021', descripcion: 'Venta del negocio de transmisión mecánica (Dodge) y salida de la participación restante en Hitachi Energy; Turbocharging (Accelleron) se escinde en 2022 [A4]' },
    ],
    confianza: 'Media',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 7996, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1288, margen_ebitda_pct: 16.1, bpa: 0.54, vs_consenso: null },
      { periodo: '1T25', ingresos: 7382, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1660, margen_ebitda_pct: 22.5, bpa: 0.60, vs_consenso: null },
      { periodo: '2T25', ingresos: 8295, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1668, margen_ebitda_pct: 20.1, bpa: 0.63, vs_consenso: null },
      { periodo: '3T25', ingresos: 8491, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 1806, margen_ebitda_pct: 21.3, bpa: 0.66, vs_consenso: null },
      { periodo: '4T25', ingresos: 9052, crecimiento_pct: 13.2, crecimiento_organico_pct: 9.0, ebitda: 1726, margen_ebitda_pct: 19.1, bpa: 0.70, vs_consenso: null },
      { periodo: '1T26', ingresos: 8734, crecimiento_pct: 18.3, crecimiento_organico_pct: 11.0, ebitda: 1990, margen_ebitda_pct: 22.8, bpa: 0.73, vs_consenso: null },
      { periodo: '2T26', ingresos: 9475, crecimiento_pct: 14.2, crecimiento_organico_pct: 12.0, ebitda: 1805, margen_ebitda_pct: 19.1, bpa: 0.68, vs_consenso: 'Inferior' },
    ],
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja 3.867 M + valores negociables e inversiones a corto 1.990 M a 30-jun-2026 (5.857 M); deuda bruta 8.177 M (1.610 M a corto); deuda neta 2.320 M, 0,3 veces el EBITDA [A1]. Pendiente de cobro: ≈4.800 M netos por la venta de Robotics (segundo semestre de 2026); comprometido: ≈5.500 M por Rotork (primer semestre de 2027) [A1].',
    rating: null,
    coste_deuda_pct: 1.1,
    vida_media_anios: null,
    confianza: 'Media',
  },
  flujos: { historico: flujos, confianza: 'Media' },
  negocio: {
    segmentos: [
      { nombre: 'Electrification', descripcion: 'Distribución eléctrica de baja y media tensión, protección, cuadros, instalación, centros de datos', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 15448, resultado: 3520 }, { periodo: '2025', ingresos: 17357, resultado: 4081 }] },
      { nombre: 'Motion', descripcion: 'Motores, variadores, tracción ferroviaria, condensadores síncronos', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 7787, resultado: 1518 }, { periodo: '2025', ingresos: 8247, resultado: 1600 }] },
      { nombre: 'Automation', descripcion: 'Sistemas de control (DCS), electrificación y automatización de procesos, marina, puertos, máquinas (B&R)', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: 7692, resultado: 1080 }, { periodo: '2025', ingresos: 8084, resultado: 1132 }] },
      { nombre: 'Corporativo, E-mobility y eliminaciones', descripcion: 'Costes centrales, costes varados de Robotics, E-mobility y eliminaciones entre áreas', tipo_resultado: 'EBIT', historico: [{ periodo: '2024', ingresos: -344, resultado: null }, { periodo: '2025', ingresos: -468, resultado: -499 }] },
    ],
    geografias: [
      { nombre: 'Estados Unidos', peso_pct: 29.1 }, { nombre: 'Resto de América', peso_pct: 8.3 }, { nombre: 'Europa', peso_pct: 34.3 },
      { nombre: 'China', peso_pct: 11.0 }, { nombre: 'Resto de Asia, Oriente Medio y África', peso_pct: 17.3 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Pedidos (M USD)', valor_anterior: '31.482 (2024)', valor_actual: '36.765 (2025); 23.340 en el 1S26 (+31 %)', variacion: '+17 %', comentario: 'Récord; centros de datos, puertos, redes [A2, A1]' },
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '25.282 (dic-25)', valor_actual: '30.007 (jun-26)', variacion: '+27 % interanual', comentario: 'Relación pedidos/ventas 1,28 en el 1S26 [A1]' },
      { kpi: 'Margen EBITA operativo', valor_anterior: '18,2 % (2024)', valor_actual: '19,0 % (2025); 21,8 % en el 1S26', variacion: '+0,8 pp', comentario: 'Objetivo 18-22 % a lo largo del ciclo [A2, A5]' },
      { kpi: 'Crecimiento comparable de ventas', valor_anterior: '+7 % (2025)', valor_actual: '+11 % (1T26) y +12 % (2T26)', variacion: '+5 pp', comentario: 'Guía 2026 elevada dos veces: 6-9 % (ene), un dígito alto a dos cifras bajas (abr), dos cifras bajas (jul) [A2, A7, A1]' },
      { kpi: 'ROCE', valor_anterior: '23,8 % (2024)', valor_actual: '28,4 % (jun-26)', variacion: '+4,6 pp', comentario: 'Objetivo >20 % [A1, A5]' },
      { kpi: 'Circulante comercial medio / ventas', valor_anterior: '14,3 % (2024)', valor_actual: '11,9 % (jun-26)', variacion: '−2,4 pp', comentario: 'Anticipos de clientes por la cartera [A1]' },
    ],
    confianza: 'Media',
  },
  capital: {
    adquisiciones: [
      { anio: '2026', objetivo: 'Rotork plc (actuadores eléctricos y control de flujo; oferta recomendada, pendiente)', importe: 5500, ev_ebitda: null, financiacion: 'Caja de la venta de Robotics', resultado: 'Pendiente de cierre (1S27); acreción del BPA prevista en el segundo año [A1]' },
      { anio: '2025', objetivo: 'Gamesa Electric (electrónica de potencia, España)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Resta 70 pb al margen de Motion en el 2T26 [A1]' },
      { anio: '2025', objetivo: 'Negocio de accesorios de cableado de Siemens en China', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrado en Electrification [A3]' },
      { anio: '2023', objetivo: 'Real Asset Management y otras pequeñas; pagos totales por compras 617 M (2024) y 752 M (2025)', importe: 752, ev_ebitda: null, financiacion: 'Caja', resultado: 'Compras pequeñas de 1-2 % de ventas al año, en línea con el objetivo [A3, A5]' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Información financiera del 4T25 (no trae calendario); 2) nota del 2T26 (solo corto y largo plazo); 3) informe financiero 2025 (descarga bloqueada, 403)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'proveedores 2019-2023', tipo: 'Complemento', intentos: '1) XBRL de la SEC (sin el concepto separado); 2) 20-F (no descargado por tiempo); 3) informes financieros antiguos', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'ABB Capital Markets Day 2025 – Electrification (presentación)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2025-11-18', url: 'https://global.abb/content/dam/abb/global/group/investors/documents/ir-events/2025/cmd-2025/ABB_CMD_2025_Electrification_Presentation%20.pdf' },
  { id: 2, titulo: 'ABB Capital Markets Day 2025 (nota de prensa)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2025-11-18', url: 'https://attachment.news.eu.nasdaq.com/a189a7be64ea0331e134c3e15759c3d36' },
  { id: 4, titulo: 'Fichas de Schneider, Siemens, Eaton, Legrand, Hubbell, Rockwell, Emerson y Vertiv (ventas, márgenes y múltiplos de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Q2 2026 results', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-07-16', url: 'https://resources.news.e.abb.com/attachments/published/137496/en-US/9123465FF532/ABB_Q2_2026_Press_release_English.pdf' },
];
const comp = (nombre, pais, ticker, ingresos, margen, comentario) => ({ nombre, pais, ticker, ingresos, cuota_pct: null, margen_ebit_pct: margen, comentario });
const B = {
  _estado: 'completo',
  competencia: {
    competidores: [
      comp('Schneider Electric', 'Francia', 'SU', 47138, 18.2, 'Líder en distribución eléctrica y gestión de energía; principal rival en centros de datos y edificios [B4]'),
      comp('Siemens (Smart Infrastructure y Digital Industries)', 'Alemania', 'SIE', 90945, 14.9, 'Rival en media tensión, edificios y automatización de fábricas; grupo más diversificado [B4]'),
      comp('Eaton', 'EE. UU.', 'ETN', 30026, 16.6, 'Fuerte en EE. UU. y en energía para centros de datos [B4]'),
      comp('Legrand', 'Francia', 'LR', 11332, 19.0, 'Baja tensión e instalación en edificios y centros de datos [B4]'),
      comp('Hubbell', 'EE. UU.', 'HUBB', 6224, 21.7, 'Componentes de red eléctrica y eléctricos en EE. UU. [B4]'),
      comp('Rockwell Automation', 'EE. UU.', 'ROK', 8973, 21.0, 'Automatización discreta y variadores; rival de Motion y de B&R [B4]'),
      comp('Emerson', 'EE. UU.', 'EMR', 18636, 26.9, 'Sistemas de control de procesos y válvulas; rival directo de Automation [B4]'),
      comp('Vertiv', 'EE. UU.', 'VRT', 11480, 20.4, 'Energía y refrigeración para centros de datos [B4]'),
    ],
    confianza: 'Media',
  },
  sector: {
    tamano: 'Sin cifra pública fiable del mercado conjunto; ABB estima que sus mercados de Electrification crecerán más de 10 % a medio plazo en centros de datos y 5-10 % en redes y renovables [B1]',
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie y cuota de mercado', tipo: 'Núcleo', intentos: '1) Presentación de Electrification del día del inversor 2025 (crecimientos por segmento sin tamaño en dinero legible); 2) AIE World Energy Investment 2025 (403; las notas de prensa que lo resumen no abren); 3) informes de mercado de equipos eléctricos (de pago)', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'ABB Compensation Report 2025', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-02-26', url: 'https://library.e.abb.com/public/4ac396b75319497daec092bb1b1c3720/ABB%20Compensation%20Report%202025.pdf' },
  { id: 2, titulo: 'Major shareholders (participaciones significativas notificadas a la SIX)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-07-15', url: 'https://global.abb/group/en/investors/investor-and-shareholder-resources/major-shareholders' },
  { id: 3, titulo: 'Q4 2025 results (hechos relevantes: venta de Robotics, cambio de director financiero, día del inversor)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://library.e.abb.com/public/17c5f84dedb946478c22ba1e00f5673e/ABB-Q4-2025-press-release-English.pdf' },
  { id: 4, titulo: 'ABB shareholders approve all proposals at 2026 Annual General Meeting', editor: 'ABB Ltd (vía Webdisclosure)', tipo: 'Primaria', fecha: '2026-03-19', url: 'https://www.webdisclosure.com/press-release/abb-ltd-etr-abb-ltd-abb-shareholders-approve-all-proposals-at-2026-annual-general-meeting-DX1arsHdIHO' },
  { id: 5, titulo: 'Q2 2026 results (hechos relevantes del trimestre y guía)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-07-16', url: 'https://resources.news.e.abb.com/attachments/published/137496/en-US/9123465FF532/ABB_Q2_2026_Press_release_English.pdf' },
  { id: 6, titulo: 'ABB Capital Markets Day 2025 (objetivos financieros)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2025-11-18', url: 'https://attachment.news.eu.nasdaq.com/a189a7be64ea0331e134c3e15759c3d36' },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Morten Wierod', cargo: 'Consejero delegado', desde: '2024', participacion_pct: null, trayectoria: 'En ABB desde 1998; dirigió Motion de 2019 a 2024. Como consejero delegado ha llevado el margen EBITA operativo del 18,2 % de 2024 al 19,0 % de 2025 y al 21,8 % del 1S26, y decidió vender Robotics y comprar Rotork [C3, C5].' },
      { nombre: 'Christian Nilsson', cargo: 'Director financiero', desde: '2026', participacion_pct: null, trayectoria: 'En ABB desde 2017 como director financiero de Electrification; sustituye a Timo Ihamuotila desde el 1-feb-2026 [C3].' },
      { nombre: 'Peter Voser', cargo: 'Presidente del consejo', desde: '2015', participacion_pct: null, trayectoria: 'Ex consejero delegado de Shell; presidente desde 2015 y consejero delegado interino en 2019-2020 [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento comparable de un dígito medio-alto y mejora del margen EBITA operativo', real: '+7 % comparable y margen 19,0 % (+0,8 pp)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Inicial (ene-26): +6-9 % comparable; elevada en julio a dos cifras bajas-medias', real: '+12 % comparable en el 1S26; margen 21,8 %', cumplida: 'Parcial' },
      { anio: '2023-2025', guia: 'Objetivo de margen 16-19 % del día del inversor 2023', real: 'Superado (19,0 % en 2025); elevado a 18-22 % en nov-25', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      cons('Peter Voser', 'Presidente', 'Independiente', '2015', 'Gobierno y Nombramientos (presidente)'),
      cons('David Constable', 'Consejero', 'Independiente', null, 'Remuneración'),
      cons('Frederico Fleury Curado', 'Consejero', 'Independiente', null, 'Remuneración (presidente)'),
      cons('Johan Forssell', 'Consejero', 'Dominical', null, 'Gobierno y Nombramientos (consejero delegado de Investor AB)'),
      cons('Denise C. Johnson', 'Consejera', 'Independiente', null, 'Finanzas, Auditoría y Cumplimiento'),
      cons('Jennifer Xin-Zhe Li', 'Consejera', 'Independiente', null, 'Remuneración'),
      cons('Geraldine Matchett', 'Consejera', 'Independiente', null, 'Gobierno y Nombramientos'),
      cons('David Meline', 'Consejero', 'Independiente', null, 'Finanzas, Auditoría y Cumplimiento (presidente)'),
      cons('Claudia Nemat', 'Consejera', 'Independiente', null, 'Finanzas, Auditoría y Cumplimiento'),
      cons('Mats Rahmström', 'Consejero', 'Independiente', null, 'Finanzas, Auditoría y Cumplimiento'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.31, fijo: 2.84, variable_corto: 2.20, variable_largo: 2.27, ratio_salario_medio: null },
    accionistas: [
      { nombre: 'Investor AB (familia Wallenberg)', pct: 14.6, tipo: 'Estable de referencia', variacion: '265,4 M de acciones a 30-jun-2026; 10,0 % en 2015 (sube por las amortizaciones de autocartera de ABB)' },
      { nombre: 'UBS Fund Management (Switzerland)', pct: 5.0, tipo: 'Gestora', variacion: 'Notificación de sep-2024' },
      { nombre: 'BlackRock', pct: 4.2, tipo: 'Gestora', variacion: 'Notificación de jun-2023' },
      { nombre: 'Autocartera', pct: 0.4, tipo: 'Autocartera', variacion: '7,6 M de acciones a 29-abr-2026; recompra de hasta 2.000 M USD en curso' },
    ],
    insiders: [],
    alertas: [
      'Rotación en la cúpula: nuevo consejero delegado (ago-2024) y nuevo director financiero (feb-2026), ambos de la casa [C3].',
      'Provisiones de unos 100 M USD por reclamaciones heredadas y saneamientos en el 2T26, y un proyecto heredado de ≈100 M en un negocio no estratégico con litigio en curso [C5].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) Nota de resultados de la junta 2026 (solo «aprobadas todas»); 2) informe de remuneración 2025 (no trae el voto de 2025); 3) búsqueda de las actas con porcentajes', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) SIX: las operaciones de directivos se publican anónimas (solo cargo e importe); 2) informe de remuneración (tenencias al cierre, no operaciones); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ABBN.SW, ^SSMI y EXH4.DE (precio, cierres de ejercicio, betas, volatilidad)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ABBN.SW/history' },
  { id: 2, titulo: 'ABB Ltd: estimaciones anuales 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, DPA)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ABB-LTD-9365000/finances/' },
  { id: 3, titulo: 'ABB Ltd: consenso (27 analistas, objetivo medio, máximo y mínimo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ABB-LTD-9365000/consensus/' },
  { id: 4, titulo: 'Prima de riesgo implícita del S&P 500 (ERPbymonth.xlsx, oct-2026: 4,20 %)', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Rendimiento del bono del Tesoro a 10 años (DGS10): 5,21 % el 13-oct-2026', editor: 'FRED, Federal Reserve Bank of St. Louis', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 6, titulo: 'Tipos de cambio de referencia del euro (USD 1,1208 y CHF 0,9305 el 15-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 7, titulo: 'Múltiplos, capitalización y estimaciones de BPA de los comparables (quoteSummary, earningsTrend)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 8, titulo: 'ABB falls as Rotork deal overshadows raised outlook, strong Q2', editor: 'Investing.com (Reuters)', tipo: 'Prensa', fecha: '2026-07-16', url: 'https://uk.investing.com/news/earnings/abb-q2-operating-profit-beats-forecasts-to-buy-rotork-for-55-bln-4773001' },
  { id: 9, titulo: 'Q4 2025 results: hechos relevantes (venta de Robotics a SoftBank por un valor de empresa de 5.375 M USD)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-01-29', url: 'https://library.e.abb.com/public/17c5f84dedb946478c22ba1e00f5673e/ABB-Q4-2025-press-release-English.pdf' },
  { id: 11, titulo: 'Financial calendar (3T26 el 20-oct-2026; 4T26 el 28-ene-2027)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://global.abb/group/en/investors/financial-calendar' },
  { id: 12, titulo: 'ABBN.SW: cotización y variaciones (movimiento a 1-12 meses, máximos y mínimos de 52 semanas, media de 200 sesiones)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ABBN.SW' },
  { id: 10, titulo: 'Q2 2026 results (oferta por Rotork a 503 peniques, ≈5.500 M USD; calendario financiero: 3T26 el 20-oct-2026)', editor: 'ABB Ltd', tipo: 'Primaria', fecha: '2026-07-16', url: 'https://resources.news.e.abb.com/attachments/published/137496/en-US/9123465FF532/ABB_Q2_2026_Press_release_English.pdf' },
];
const B0 = BOLSA.bolsa;
const cie = Object.fromEntries(BOLSA.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const CHFUSD = { 2019: 0.9677, 2020: 0.8832, 2021: 0.9146, 2022: 0.9241, 2023: 0.8405, 2024: 0.9066, 2025: 0.7907 };
const ce = (nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, per_ntm, crecimiento_pct, margen_ebitda_pct, dn_ebitda, fcf_yield_pct) => ({ nombre, ticker, pais, capitalizacion, ev_ventas, ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm, crecimiento_pct, margen_ebitda_pct, roic_pct: null, dn_ebitda, fcf_yield_pct });
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'ABB Ltd', nombre_corto: 'ABB', ticker: 'ABBN', isin: 'CH0012221716', mercado: 'SIX Swiss Exchange (también Nasdaq Estocolmo)', indice_referencia: 'SMI',
    pais: 'Suiza', pais_iso: 'CH', sector: 'Industria', industria: 'Equipos eléctricos y automatización', sede: 'Zúrich (Suiza)', fundacion: '1988', empleados: 114800, web: 'https://global.abb',
    precio: Math.round(76.2 * 1.20451 * 100) / 100, fecha_precio: '2026-10-15', acciones: 1818, capitalizacion_publicada: 166372, free_float_pct: 85,
    max_52s: Math.round(89.14 * 1.20451 * 100) / 100, min_52s: Math.round(53.78 * 1.20451 * 100) / 100, volumen_medio_diario: '≈ 170 M CHF/día (3 meses)', proximos_resultados: '2026-10-20',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 38142, ebitda: 8209, ebit: 7269, bpa: 3.85, dpa: 1.19, fuente: 'MarketScreener (incluye la plusvalía de la venta de Robotics) [D2]' },
      { periodo: '2027e', ingresos: 42590, ebitda: 9348, ebit: 8500, bpa: 3.55, dpa: 1.28, fuente: 'MarketScreener [D2]' },
      { periodo: '2028e', ingresos: 46266, ebitda: 10431, ebit: 9497, bpa: 4.00, dpa: 1.38, fuente: 'MarketScreener [D2]' },
    ],
    recomendaciones: { n_analistas: 27, comprar: null, mantener: null, vender: null, po_medio: 101.03, po_min: 80.84, po_max: 116.55 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: B0.tipo_rentabilidad, rentabilidades: B0.rentabilidades, anual: B0.anual,
    beta: B0.beta, volatilidad_pct: B0.volatilidad_pct, max_drawdown_pct: B0.max_drawdown_pct, posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: Math.round((cie[a] / CHFUSD[a]) * 100) / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2019', '2020', '2021'].includes(a) })),
    confianza: 'Media',
  },
  comparables: {
    empresas: [
      ce('Schneider Electric', 'SU', 'FR', 162946, 3.93, 19.4, 21.6, 10.7, 20.3, 1.9, 3.7),
      ce('Siemens', 'SIE', 'DE', 232282, 3.19, 20.7, 20.6, 8.6, 15.4, 3.1, 3.1),
      ce('Eaton', 'ETN', 'US', 155080, 5.98, 27.0, 25.4, 12.0, 22.1, 3.1, 2.0),
      ce('Legrand', 'LR', 'FR', 39292, 4.08, 18.6, 19.9, 11.6, 21.9, 2.6, 2.9),
      ce('Hubbell', 'HUBB', 'US', 24394, 4.85, 19.9, 20.5, 10.3, 24.4, 3.4, 2.0),
      ce('Rockwell Automation', 'ROK', 'US', 46742, 5.59, 24.0, 28.2, 5.8, 23.3, 1.5, 2.8),
      ce('Emerson', 'EMR', 'US', 89321, 5.45, 16.8, 22.0, 5.6, 32.5, 1.9, 4.1),
      ce('Vertiv', 'VRT', 'US', 80089, 7.49, 32.1, 24.0, 30.5, 23.3, 0.1, 3.4),
    ],
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-07', objetivo: 'Rotork plc (actuadores, Reino Unido)', comprador: 'ABB', ev: 5500, ev_ventas: null, ev_ebitda: 20.0, prima_pct: 60, excluir: false, comentario: '503 peniques en efectivo; ≈20 veces el EBITDA según Bernstein y ≈60 % sobre la media de tres meses [D8, D10]' },
      { fecha: '2025-10', objetivo: 'ABB Robotics', comprador: 'SoftBank Group', ev: 5375, ev_ventas: 2.31, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de empresa 5.375 M sobre 2.331 M de ventas de 2025 (actividades interrumpidas) [D9]' },
    ],
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones con múltiplo', tipo: 'Complemento', intentos: '1) Notas de ABB (Rotork, Robotics); 2) prensa sobre compras de Eaton (Boyd Thermal) y Schneider (Motivair) sin múltiplo verificado; 3) agregadores de fusiones (de pago)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Suiza no publica registro de cortos; 2) FINMA; 3) agregadores', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'ABB: Updating After Rotork And July 2026, The Company Is Still Too Expensive', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-29', url: 'https://seekingalpha.com/api/sa/combined/ABBNY.xml' },
  { id: 2, titulo: 'ABB Acquires Rotork – Why The Market Seems Less Than Thrilled', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-16', url: 'https://seekingalpha.com/api/sa/combined/ABBNY.xml' },
  { id: 3, titulo: 'ABB Is No Longer Just An Industrial Company / ABB Racing Ahead As Electrification Markets Stay Red Hot', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-06-28', url: 'https://seekingalpha.com/api/sa/combined/ABBNY.xml' },
  { id: 4, titulo: 'Mensajes sobre ABBNY', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/ABBNY.json' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-09', n_comentarios: 1, tono: 'Negativo', resumen: 'Tras Rotork y el recorte de julio, sigue viendo la acción demasiado cara para lo que crece [E1].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-07', n_comentarios: 1, tono: 'Dividido', resumen: 'Buenos resultados del 2T, pero el mercado castiga el precio pagado por Rotork [E2].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-06', n_comentarios: 2, tono: 'Positivo', resumen: 'ABB ya no es un industrial cíclico: la electrificación y los centros de datos sostienen la valoración [E3].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 20, tono: 'Dividido', resumen: 'Dudas sobre qué queda tras vender Robotics y sobre cuánto dura el ciclo de centros de datos [E4].' },
    ],
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
