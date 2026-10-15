// Escribe las notas A-E de Sweco AB (SWEC B, corte 2026-10-15) desde los documentos de notas/docs (informes de la empresa en
// Cision/MFN y swecogroup.com), el XBRL ESEF (cuentas-xbrl.json), bolsa.json (Yahoo) y páginas web leídas el 15-oct-2026.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/sweco-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const xbrl = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const r1 = (x) => Math.round(x * 10) / 10;
const C = 'https://mb.cision.com/Main/1356/';
const W = 'https://www.swecogroup.com/wp-content/uploads/sites/2/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report 2025 (cuentas consolidadas, notas 2, 3, 6, 9, 11, 12, 14, 22, 26 y 27, cinco años, gobierno y remuneración)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-03-26', url: C + '4326321/4005820.pdf' },
  { id: 2, titulo: 'Interim Report January–June 2026 (cuenta, balance y flujos a 30-jun-2026, áreas de negocio, revisión trimestral, APM)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: C + '4375560/4197625.pdf' },
  { id: 3, titulo: 'Interim Report January–March 2026', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-04-28', url: C + '4340778/4061158.pdf' },
  { id: 4, titulo: 'Year-end Report 2025 (4T25)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-02-11', url: W + '2026/02/3927887.pdf' },
  { id: 5, titulo: 'Interim Report January–September 2025 (3T25)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2025-10-29', url: W + '2025/10/3750040.pdf' },
  { id: 6, titulo: 'Interim Report January–September 2024 (3T24)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2024-10-29', url: W + '2024/10/3082717-1.pdf' },
  { id: 7, titulo: 'Annual and Sustainability Report 2021 (resumen de cinco años 2017-2021, cuenta 2020-2021)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2022-03-23', url: W + '2022/03/1552192.pdf' },
  { id: 8, titulo: 'Informes anuales ESEF 2021-2024 en xBRL-JSON (cuenta, balance y flujos 2020-2024)', editor: 'XBRL International (filings.xbrl.org), LEI 549300Q4Y55VICYV6U90', tipo: 'Primaria', fecha: '2025-03-28', url: 'https://filings.xbrl.org/549300Q4Y55VICYV6U90/2024-12-31/ESEF/SE/0/swec-2024-12-31-0-sv.json' },
  { id: 9, titulo: 'Presentación de resultados del 2T26', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: W + '2026/07/Sweco_Q2_Presentation.pdf' },
  { id: 10, titulo: 'Change in number of shares and votes in Sweco AB (31-mar-2026)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-03-31', url: C + '4328734/4016007.pdf' },
];

// Cuenta: XBRL 2020-2024 [8] comprobado con el resumen de cinco años [1, 7]; 2025 del informe anual [1].
// Formato por naturaleza: coste_ventas = otros gastos externos netos de otros ingresos (= ventas − personal − EBITDA).
// amortizaciones = toda la del estado de flujos (inmovilizado, derechos de uso y amortización de intangibles de compras).
const DA = { '2020': 1071, '2021': 1114, '2022': 1116, '2023': 1354, '2024': 1431, '2025': 1480 };
const PERS = { '2020': 13859, '2021': 14477, '2022': 16087, '2023': 18943, '2024': 20232, '2025': 20840 };
const INT = { '2021': 62, '2022': 70, '2023': 217, '2024': 249, '2025': 195 };
const NR = { '2020': 290, '2021': 56 }; // partidas que afectan a la comparabilidad (reestructuración 2020-21), EBITA excl. IAC [7]
const DPA = { '2020': 2.20, '2021': 2.45, '2022': 2.70, '2023': 2.95, '2024': 3.30, '2025': 3.70 };
const BPA = { '2020': 3.58, '2021': 4.17, '2022': 4.60, '2023': 4.64, '2024': 5.75, '2025': 6.16 };
const x25 = { periodo: '2025', ingresos: 31586, ebit: 3203, resultado_financiero: -218, bai: 2985, impuestos: 759, minoritarios: 0, beneficio_neto: 2226 };
const base = [...xbrl.financieros.cuenta.filter((c) => +c.periodo >= 2020), x25];
const cuenta = base.map((c) => {
  const p = c.periodo, ebitda = c.ebit + DA[p];
  return {
    periodo: p, ingresos: c.ingresos, coste_ventas: c.ingresos - PERS[p] - ebitda, gastos_generales: null, ebitda, amortizaciones: DA[p], ebit: c.ebit,
    resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios ?? 0, beneficio_neto: p === '2022' ? 1651 : c.beneficio_neto,
    gastos_financieros: INT[p] ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[p] ?? null,
    bpa: BPA[p], dpa: DPA[p], dpa_extraordinario: 0, acciones_diluidas: r1(c.beneficio_neto / BPA[p]),
  };
});

// Balance: XBRL 2020-2024 [8]; 2025 del informe anual [1]. activos_contrato = obra en curso neta de facturación; pasivos_contrato = facturación anticipada.
const balance = xbrl.balance.historico.filter((b) => +b.periodo >= 2020).map((b) => ({ ...b }));
balance.forEach((b) => { delete b.fin; for (const k of Object.keys(b)) if (k.startsWith('_')) delete b[k]; });
balance.push({ periodo: '2025', activo_total: 29888, activo_corriente: 13187, pasivo_corriente: 12052, pasivo_total: 17465, fondo_comercio: 11159, intangibles: 989, inmovilizado_material: 884, existencias: 6, clientes: 4628, proveedores: 902, activos_contrato: 5766, pasivos_contrato: 3990, caja: 1478, deuda_financiera: 2864, arrendamientos: 3707, patrimonio_neto: 12417, minoritarios: 5, reservas: 9188 });

const flujos = xbrl.flujos.historico.filter((f) => +f.periodo >= 2020).map((f) => ({ periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos, adquisiciones: f.adquisiciones, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 }));
flujos.push({ periodo: '2025', flujo_operativo: 4011, capex: 424, pagos_arrendamientos: 878, adquisiciones: 1075, desinversiones: 9, dividendos: 1187, recompras: 0, emision_acciones: 0, intereses_en_financiacion: 0 });

const segH = (p, i, r) => ({ periodo: p, ingresos: i, resultado: r });
const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 32587, ebitda: 4831, ebit: 3272, beneficio_neto: 2279, bpa: 6.30, dpa: 3.70, dpa_extraordinario: 0, fcf: 2508, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2025', descripcion: 'Trece compras con 2.084 M de ventas anuales (Projektengagemang desde mediados de julio, Fimpec desde diciembre, assar desde octubre) y venta de la filial checa y de Vastgoedmanagement: la cuenta de 2025 recoge 708 M de ventas compradas y el balance de cierre las incluye enteras [1].' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 6779, crecimiento_pct: 5.6, crecimiento_organico_pct: 4, ebitda: null, margen_ebitda_pct: null, bpa: 1.05, vs_consenso: null },
      { periodo: '4T24', ingresos: 8100, crecimiento_pct: null, crecimiento_organico_pct: 4, ebitda: null, margen_ebitda_pct: null, bpa: 1.66, vs_consenso: null },
      { periodo: '1T25', ingresos: 8066, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.78, vs_consenso: null },
      { periodo: '2T25', ingresos: 7834, crecimiento_pct: -3.0, crecimiento_organico_pct: 2, ebitda: null, margen_ebitda_pct: null, bpa: 1.37, vs_consenso: null },
      { periodo: '3T25', ingresos: 7138, crecimiento_pct: 5.3, crecimiento_organico_pct: 4, ebitda: null, margen_ebitda_pct: null, bpa: 1.18, vs_consenso: null },
      { periodo: '4T25', ingresos: 8548, crecimiento_pct: 5.5, crecimiento_organico_pct: 5, ebitda: null, margen_ebitda_pct: null, bpa: 1.84, vs_consenso: null },
      { periodo: '1T26', ingresos: 8334, crecimiento_pct: 3.3, crecimiento_organico_pct: 3, ebitda: null, margen_ebitda_pct: null, bpa: 1.63, vs_consenso: null },
      { periodo: '2T26', ingresos: 8567, crecimiento_pct: 9.4, crecimiento_organico_pct: 3, ebitda: null, margen_ebitda_pct: null, bpa: 1.66, vs_consenso: null },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 1335 }, { anio: '2027-2030', importe: 1528 }, { anio: '2031+', importe: 1 }],
    liquidez: 'Caja de 663 M y líneas de crédito no dispuestas de 4.371 M a 30-jun-2026 (más una línea de 1.000 M a 18 meses firmada el 25-may-2026) [2]; programa de pagarés de 2.000 M (1.319 M dispuestos a dic-2025) [1].',
    rating: 'Sin rating público (financiación bancaria y pagarés suecos) [1]',
    coste_deuda_pct: 4.0, vida_media_anios: 1.5,
    confianza: 'Alta',
  },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'Ernst & Young AB (socio: Jonas Svensson)', anios_auditor: 2, opinion: 'Favorable', confianza: 'Alta' },
  capital: {
    adquisiciones: [
      { anio: '2026', objetivo: 'Sitowise Sverige (≈250 expertos, 296 M de ventas en 2025, con pérdidas); cerrada el 31-jul-2026', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Precio no publicado por Sweco; el vendedor dio un valor empresa de ≈3 M EUR más un pago variable de hasta 2 M EUR [2].' },
      { anio: '2026', objetivo: 'Platom (Finlandia, nuclear, 30 expertos), CONIX RDBM (Bélgica, 50) y STEIN Ingenieure (Alemania, agua, 60)', importe: 222, ev_ebitda: null, financiacion: 'Caja (pagos por compras del 1S26)', resultado: 'Pequeñas; ≈200 M de ventas anuales entre las tres [2].' },
      { anio: '2025', objetivo: 'Trece compras: Projektengagemang (770 M de ventas, 634 expertos), Fimpec (548 M), assar architects (232 M), Volantis (219 M) y nueve menores', importe: 1246, ev_ebitda: null, financiacion: 'Caja y deuda bancaria', resultado: '2.084 M de ventas anuales por 1.246 M (0,6 veces ventas); con un año entero habrían aportado −25 M de EBITA y −126 M de EBIT: compras de recuperación, sobre todo Projektengagemang [1].' },
      { anio: '2024', objetivo: 'Econsultancy (Países Bajos), Bureau Valstar-Simonis y Frilling+Rolfs (Alemania)', importe: 213, ev_ebitda: null, financiacion: 'Caja', resultado: '338 M de ventas anuales; 39 M de EBITA con un año entero [1].' },
      { anio: '2023', objetivo: 'Compras del año (salida de caja de 1.686 M por adquisiciones) [8]', importe: 1686, ev_ebitda: null, financiacion: 'Deuda (DN/EBITDA 1,1 veces al cierre)', resultado: 'Deuda devuelta en 2024; sin deterioros del fondo de comercio [1, 8].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      { nombre: 'Sweco Suecia', descripcion: 'Consultoría de arquitectura e ingeniería en Suecia', tipo_resultado: 'EBIT', historico: [segH('2024', 8929, 983), segH('2025', 9358, 942)] },
      { nombre: 'Sweco Bélgica', descripcion: 'Bélgica y Luxemburgo', tipo_resultado: 'EBIT', historico: [segH('2024', 3995, 500), segH('2025', 4016, 553)] },
      { nombre: 'Sweco Finlandia', descripcion: 'Finlandia y Estonia', tipo_resultado: 'EBIT', historico: [segH('2024', 3604, 370), segH('2025', 3632, 365)] },
      { nombre: 'Sweco Noruega', descripcion: 'Noruega', tipo_resultado: 'EBIT', historico: [segH('2024', 3515, 271), segH('2025', 3558, 297)] },
      { nombre: 'Sweco Países Bajos', descripcion: 'Países Bajos', tipo_resultado: 'EBIT', historico: [segH('2024', 3238, 296), segH('2025', 3528, 324)] },
      { nombre: 'Sweco Dinamarca', descripcion: 'Dinamarca', tipo_resultado: 'EBIT', historico: [segH('2024', 3449, 455), segH('2025', 3340, 484)] },
      { nombre: 'Sweco Alemania y Europa Central', descripcion: 'Alemania, Lituania y Polonia', tipo_resultado: 'EBIT', historico: [segH('2024', 2813, 268), segH('2025', 2995, 393)] },
      { nombre: 'Sweco Reino Unido y otros', descripcion: 'Reino Unido e Irlanda (1.548 M de ventas y 107 M de EBITA en 2025) más funciones comunes y eliminaciones', tipo_resultado: 'EBIT', historico: [segH('2024', 1133, -68), segH('2025', 1160, -26)] },
    ],
    geografias: [
      { nombre: 'Suecia', peso_pct: 29.1 }, { nombre: 'Noruega', peso_pct: 11.5 }, { nombre: 'Países Bajos', peso_pct: 11.3 }, { nombre: 'Bélgica', peso_pct: 11.2 },
      { nombre: 'Finlandia', peso_pct: 10.8 }, { nombre: 'Dinamarca', peso_pct: 10.1 }, { nombre: 'Alemania', peso_pct: 7.6 }, { nombre: 'Otros (Reino Unido 4,2 %, Polonia, Luxemburgo…)', peso_pct: 8.4 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Tasa de facturación (billing ratio)', valor_anterior: '73,9 % (2024)', valor_actual: '74,8 % (12 meses a jun-26); 75,9 % en el 2T26', variacion: '+0,9 p.p.', comentario: 'Horas facturables sobre horas de presencia; cada punto vale ≈1,3 % de las ventas [1, 2].' },
      { kpi: 'Empleados a tiempo completo', valor_anterior: '20.823 (2024)', valor_actual: '21.842 (2T26)', variacion: '+4,9 %', comentario: 'Casi todo por compras; la plantilla orgánica está plana [1, 2].' },
      { kpi: 'Crecimiento orgánico ajustado por calendario', valor_anterior: '5 % (2024)', valor_actual: '4 % (2025); 3 % (1S26)', variacion: '−1 a −2 p.p.', comentario: 'Sale de tarifas medias y tasa de facturación, no de más horas [1, 2].' },
      { kpi: 'Margen EBITA', valor_anterior: '10,0 % (2024)', valor_actual: '10,5 % (2025 y 12 meses a jun-26)', variacion: '+0,5 p.p.', comentario: 'Objetivo del grupo: 12 % [1, 2].' },
      { kpi: 'Cartera (obligaciones pendientes)', valor_anterior: '27.200 M (dic-24)', valor_actual: '28.800 M (dic-25)', variacion: '+5,9 %', comentario: 'El 57 % se factura en 12 meses (66 % un año antes): cartera más larga [1].' },
      { kpi: 'Compras', valor_anterior: '3 compras, 338 M de ventas (2024)', valor_actual: '13 compras, 2.084 M de ventas (2025)', variacion: '×6', comentario: '1.513 expertos comprados en 2025 [1].' },
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'negocio', campo: 'segmentos 2021-2023 con la segmentación actual', tipo: 'Complemento', intentos: '1) nota 3 del informe anual 2025 (solo 2024-2025); 2) XBRL ESEF 2023-2024 (sin desglose por área); 3) revisión trimestral del 2T26 (solo desde 2T24)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'EBITDA trimestral con NIIF 16 y consenso previo a cada trimestre', tipo: 'Complemento', intentos: '1) informes trimestrales (dan EBITA y EBITDA sin NIIF 16); 2) MarketScreener (sin histórico de consenso por trimestre); 3) prensa sueca (Placera, Di) sin cifras de consenso abiertas', decision: 'Omitido' },
  ],
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report 2025: estrategia, mercado, segmentos de servicio y de cliente, riesgos', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-03-26', url: C + '4326321/4005820.pdf' },
  { id: 2, titulo: 'EFCA Barometer Spring 2022 (facturación por empleado en la consultoría de ingeniería europea: 109.717 EUR)', editor: 'European Federation of Engineering Consultancy Associations', tipo: 'Sectorial', fecha: '2022-05', url: 'https://www.frinet.dk/media/0bakzrr4/efca_barometer_spring_2022-1.pdf' },
  { id: 3, titulo: 'EFCA Sector Review 2022, nota de prensa (≈1 millón de empleados en el sector en Europa)', editor: 'EFCA', tipo: 'Sectorial', fecha: '2023-01-26', url: 'http://www.acei.ie/wp-content/themes/iBUILDiT/uploads/EFCA_Sector_Review_2022_Press_Release.pdf' },
  { id: 4, titulo: 'EFCA Barometer Spring 2024 (escasez de personal y costes laborales, principales retos)', editor: 'EFCA', tipo: 'Sectorial', fecha: '2024-05', url: 'https://www.frinet.dk/media/ngvdrjjv/efca_barometer_spring_2024.pdf' },
  { id: 5, titulo: 'Interim Report January–June 2026: demanda por segmento', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: C + '4375560/4197625.pdf' },
  { id: 6, titulo: 'Cotizaciones y cuentas de WSP, Stantec, AECOM, Jacobs, Tetra Tech, Arcadis, AFRY, Norconsult, Multiconsult y Rejlers (ventas y EBIT de 12 meses)', editor: 'Yahoo Finance (quoteSummary y estados financieros)', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 7, titulo: 'WSP: caída de la acción por el temor a la IA (≈40 % desde el máximo de otoño de 2025)', editor: 'Stockwatch', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://www.stockwatch.com/News/Item/Z-C!WSP-3834496/C/WSP' },
  { id: 8, titulo: 'Annual and Sustainability Report 2021 (historia y cinco años)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2022-03-23', url: W + '2022/03/1552192.pdf' },
  { id: 9, titulo: 'Åsa Bergman resigns as President and CEO of Sweco AB', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-10-02', url: C + '4403819/4299284.pdf' },
];
const B = {
  _estado: 'completo',
  sector: {
    tamano: '≈110.000 M EUR (≈1,23 billones de SEK) de facturación anual en Europa, estimación propia: ≈1 millón de empleados [3] × 109.717 EUR por empleado [2]',
    unidad_serie: 'millones de SEK', serie: null,
    tcac_historico_pct: null, tcac_previsto_pct: 3.0, cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Inversión pública en transporte, energía, agua y defensa', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda «buena» en infraestructura, agua, medio ambiente, energía y defensa en todos los trimestres de 2025-26; el sector público es el 39 % de las ventas (37 % en 2024) [1, 5].' },
      { driver: 'Ciclo inmobiliario residencial y comercial nórdico', efecto: '−', horizonte: 'Cíclico', evidencia: 'Demanda «débil» en residencial y comercial en 2023-26; vivienda, inmobiliario y construcción son el 17 % de las ventas y edificios el 38 % [1, 5].' },
      { driver: 'Transición energética y electrificación (redes, nuclear, hidrógeno, centros de datos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Compras de Fimpec (energía, 548 M) y Platom (nuclear) y contratos con Statkraft, Kraftringen y Å Energi [1, 5].' },
      { driver: 'IA generativa en diseño y documentación', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Más del 70 % de la plantilla usa SwecoGPT; el mercado castiga al sector (WSP −40 % desde el máximo) por temor a menos horas facturables [1, 7].' },
      { driver: 'Escasez de ingenieros y subida de salarios', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Primer reto del sector según EFCA; sostiene las tarifas pero sube el coste [4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Miles de firmas locales y cinco o seis grupos paneuropeos; precios por concurso en el sector público, pero los márgenes EBITA del 8-12 % son estables [1, 6].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'El 39 % es sector público con licitaciones y marcos plurianuales; el mayor cliente (Trafikverket) es el 4,2 % de las ventas y los diez primeros el 13 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'El proveedor es el ingeniero: personal = 66 % de las ventas y escasez estructural de perfiles [1, 4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Entrar a pequeña escala es fácil, pero los marcos públicos exigen referencias, seguros y capacidad multidisciplinar [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La IA puede hacer parte del trabajo de documentación y cálculo con menos horas; la responsabilidad legal del diseño sigue siendo del consultor colegiado [1, 7].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo' },
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.6,
    posicion: '1.ª consultora de arquitectura e ingeniería de Europa por ventas (≈2,6 % del mercado europeo estimado); primera o segunda en Suecia, Finlandia, Noruega, Dinamarca y Bélgica [1].',
    competidores: [
      { nombre: 'WSP Global', pais: 'Canadá', ticker: 'WSP.TO', ingresos: 135870, cuota_pct: null, margen_ebit_pct: 8.4, comentario: 'Mayor del mundo; compras grandes (POWER, Golder, Wood E&I); Norteamérica, Reino Unido y Nórdicos [6].' },
      { nombre: 'Jacobs Solutions', pais: 'EE. UU.', ticker: 'J', ingresos: 141897, cuota_pct: null, margen_ebit_pct: 4.7, comentario: 'Gestión de programas e infraestructuras en EE. UU. y Reino Unido; ventas con subcontratas [6].' },
      { nombre: 'AECOM', pais: 'EE. UU.', ticker: 'ACM', ingresos: 153615, cuota_pct: null, margen_ebit_pct: 4.7, comentario: 'Diseño y gestión de obra; ventas brutas con pasajes de coste [6].' },
      { nombre: 'Stantec', pais: 'Canadá', ticker: 'STN.TO', ingresos: 60072, cuota_pct: null, margen_ebit_pct: 9.3, comentario: 'Agua, edificios e infraestructura; muy parecido a Sweco en modelo [6].' },
      { nombre: 'Arcadis', pais: 'Países Bajos', ticker: 'ARCAD.AS', ingresos: 54854, cuota_pct: null, margen_ebit_pct: 7.5, comentario: 'Competidor directo en Países Bajos, Bélgica, Alemania y Reino Unido [6].' },
      { nombre: 'Tetra Tech', pais: 'EE. UU.', ticker: 'TTEK', ingresos: 50589, cuota_pct: null, margen_ebit_pct: 12.5, comentario: 'Agua y medio ambiente, alto margen; RPS en Reino Unido y Europa [6].' },
      { nombre: 'AFRY', pais: 'Suecia', ticker: 'AFRY.ST', ingresos: 25171, cuota_pct: null, margen_ebit_pct: 5.5, comentario: 'Rival directo en Suecia y Finlandia, más industria y energía; margen la mitad que Sweco [6].' },
      { nombre: 'Norconsult', pais: 'Noruega', ticker: 'NORCO.OL', ingresos: 12934, cuota_pct: null, margen_ebit_pct: 7.3, comentario: 'Rival en Noruega y Suecia (compró Sweco Rail? no: compró Rambøll Norge? no); propiedad de empleados hasta 2024 [6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Conocimiento compartido entre 23.000 expertos y 1.700 equipos locales; no hay red de usuarios [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Marcos plurianuales y conocimiento del activo del cliente (Trafikverket, Rijkswaterstaat, Statkraft), pero cada proyecto se vuelve a licitar [1, 5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Marca y referencias para licitar grandes proyectos públicos; sin patentes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Tasa de facturación del 74-76 % y margen EBITA del 10,5 % frente al 5-9 % de AFRY, Arcadis o Norconsult: escala local y modelo descentralizado [1, 6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Primera o segunda en cinco mercados nórdicos y Bélgica; mercados locales donde dos o tres grupos se reparten los grandes contratos [1].' },
      ],
    },
    confianza: 'Media',
  },
  historia: {
    hitos: [
      { anio: '1998', hito: 'Sweco AB cotiza en Nasdaq Stockholm desde el 21 de septiembre [1].' },
      { anio: '2005-2025', hito: 'Cerca de 170 compras en veinte años; crecimiento de las ventas del 11,8 % anual compuesto [1].' },
      { anio: '2018', hito: 'Åsa Bergman, en la casa desde 1991, primera ejecutiva [1].' },
      { anio: '2020', hito: 'Desdoblamiento de la acción en el cuarto trimestre y 290 M de partidas no comparables (reestructuración) [8].' },
      { anio: '2022', hito: 'La acción cae un 41 % al subir los tipos y frenarse la construcción residencial nórdica; el negocio sigue creciendo (+11 % de ventas) [1, 8].' },
      { anio: '2023', hito: 'Año de compras (1.686 M de salida de caja); deuda neta/EBITDA sube a 1,1 veces y el margen EBITA baja al 8,9 % [1].' },
      { anio: '2025', hito: 'Trece compras (2.084 M de ventas), entre ellas la cotizada sueca Projektengagemang y la finlandesa Fimpec; nuevo director financiero [1].' },
      { anio: '2026', hito: 'Åsa Bergman anuncia su salida el 2-oct; seguirá hasta que llegue su sucesor [9].' },
    ],
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  negocio: {},
  huecos: [
    { seccion: 'sector', campo: 'serie del tamaño del mercado europeo de consultoría de ingeniería', tipo: 'Complemento', intentos: '1) EFCA Sector Review 2022 (enlace caído); 2) barómetros EFCA (solo muestras parciales por país); 3) Eurostat NACE M71 (incluye ensayos técnicos; no abierto)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'esg', campo: 'calificaciones ESG publicadas', tipo: 'Complemento', intentos: '1) informe de sostenibilidad del informe anual 2025 (sin calificaciones de terceros); 2) MSCI ESG ratings (requiere navegador); 3) Sustainalytics (de pago)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
// Norconsult: corrige comentario sin datos verificados
B.competencia.competidores[7].comentario = 'Rival directo en Noruega y Suecia; salió a bolsa en 2024 y sigue controlada por sus empleados [6].';

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report 2025: gobierno corporativo, consejo, comité de dirección, nota 5 (remuneración) y accionistas', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-03-26', url: C + '4326321/4005820.pdf' },
  { id: 2, titulo: 'Åsa Bergman resigns as President and CEO of Sweco AB', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-10-02', url: C + '4403819/4299284.pdf' },
  { id: 3, titulo: 'Resolutions at Sweco AB’s Annual General Meeting 2026', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-04-22', url: C + '4338368/4052940.pdf' },
  { id: 4, titulo: 'Interim Report January–June 2026 (acciones, autocartera, firmantes)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-07-17', url: C + '4375560/4197625.pdf' },
  { id: 5, titulo: 'Annual and Sustainability Report 2021 (objetivos financieros anteriores)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2022-03-23', url: W + '2022/03/1552192.pdf' },
];
const cons = (nombre, cargo, tipo, desde, comisiones) => ({ nombre, cargo, tipo, desde, comisiones });
const Cn = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Åsa Bergman', cargo: 'Presidenta y primera ejecutiva (dimisionaria desde el 2-oct-2026)', desde: '2018', participacion_pct: 0.07, trayectoria: 'En Sweco desde 1991, ingeniera civil (KTH); dirigió Sweco Sverige. Con ella las ventas pasaron de 18.735 M (2018) a 31.586 M (2025) y el margen EBITA del 8,7 % al 10,5 %, sin llegar al objetivo del 12 % [1, 5].' },
      { nombre: 'Jan Allde', cargo: 'Director financiero', desde: '2025', participacion_pct: null, trayectoria: 'Llegó el 1-ago-2025 desde puestos de finanzas, compras e IT en ABB y Alfa Laval [1].' },
      { nombre: 'Johan Nordström', cargo: 'Presidente del consejo', desde: '2012', participacion_pct: 13.0, trayectoria: 'Arquitecto (KTH), primer ejecutivo de Skirner (sociedad de la familia Nordström) y presidente de Investment AB Latour; 1,8 M de acciones directas y 45,2 M a través de Skirner [1].' },
      { nombre: 'Eugene Grüter', cargo: 'Presidente de Sweco Países Bajos', desde: '2016', participacion_pct: 0.01, trayectoria: 'Al frente del área que más ha mejorado el margen en 2026 (8,4 % en el 2T26 frente a 6,9 %) [1, 4].' },
      { nombre: 'Erwin Malcorps', cargo: 'Presidente de Sweco Bélgica', desde: '2019', participacion_pct: 0.0, trayectoria: 'Viene de Grontmij; Bélgica es el área de mayor margen (13,8 % en 2025) [1].' },
    ],
    historial_guidance: [
      { anio: '2023', guia: 'Objetivo de margen EBITA ≥ 12 %; deuda neta/EBITDA < 2 veces; dividendo ≥ 50 % del beneficio', real: 'Margen 8,9 %; DN/EBITDA 1,1; reparto 64 %', cumplida: 'Parcial' },
      { anio: '2024', guia: 'Mismos objetivos (Sweco no da previsiones anuales)', real: 'Margen 10,0 %; DN/EBITDA 0,4; reparto 57 %', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Mismos objetivos', real: 'Margen 10,5 %; DN/EBITDA 0,4; reparto 60 %', cumplida: 'Parcial' },
    ],
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      cons('Johan Nordström', 'Presidente; preside la comisión de remuneración', 'Dominical', '2012', 'Remuneración (presidente)'),
      cons('Åsa Bergman', 'Consejera y primera ejecutiva', 'Ejecutivo', '2018', '—'),
      cons('Johan Hjertonsson', 'Consejero (primer ejecutivo de Latour)', 'Dominical', '2015', 'Remuneración'),
      cons('Johan Wall', 'Consejero (consejero de Skirner)', 'Dominical', '2022', 'Auditoría'),
      cons('Alf Göransson', 'Consejero', 'Independiente', '2018', 'Auditoría (presidente)'),
      cons('Susanne Pahlén Åklundh', 'Consejera', 'Independiente', '2022', 'Remuneración'),
      cons('Katrien Beuls', 'Consejera', 'Independiente', '2025', 'Remuneración'),
      cons('Constanze Hufenbecher', 'Consejera', 'Independiente', '2025', 'Auditoría'),
      cons('Anna Leonsson, Görgen Edenhagen y Maria Ekh', 'Representantes de los empleados', 'Otro externo', '2005', '—'),
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 25.31, fijo: 11.61, variable_corto: 6.27, variable_largo: 1.37, ratio_salario_medio: 26 },
    accionistas: [
      { nombre: 'Familia Nordström (Skirner AB)', pct: 13.9, tipo: 'Familia de control (33,9 % de los votos; acciones A)', variacion: 'Estable' },
      { nombre: 'Investment AB Latour', pct: 26.9, tipo: 'Sociedad de inversión (21,0 % de los votos); presidida por Johan Nordström', variacion: 'Estable' },
      { nombre: 'Fundación J. Gust. Richert', pct: 1.7, tipo: 'Fundación (9,3 % de los votos; acciones A)', variacion: 'Estable' },
      { nombre: 'Swedbank Robur Fonder', pct: 5.7, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'SEB Fonder', pct: 4.8, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Handelsbanken Fonder', pct: 3.9, tipo: 'Fondos', variacion: 'n.d.' },
      { nombre: 'Första AP-fonden', pct: 2.4, tipo: 'Fondo de pensiones público', variacion: 'n.d.' },
      { nombre: 'Autocartera', pct: 0.55, tipo: 'Acciones B propias (2.010.703 a 30-jun-2026)', variacion: 'Baja por entregas a empleados' },
    ],
    insiders: [],
    alertas: [
      'Dimisión de la primera ejecutiva (2-oct-2026) sin sucesor nombrado; seguirá hasta que llegue [2].',
      'Desviación de la política de remuneración en 2025: bonus individual de dos meses de sueldo a la primera ejecutiva y al director financiero por la mejora de la tasa de facturación [1].',
      'El presidente lo es también de Latour (26,9 % del capital): dos accionistas de referencia con 54,9 % de los votos alineados en un mismo presidente [1].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'porcentajes de voto de la junta sobre remuneración', tipo: 'Complemento', intentos: '1) nota de acuerdos de la junta de 22-abr-2026 (sin recuento); 2) informe anual 2025 (sin actas); 3) acta de la junta en la web (no localizada)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses (registro de Finansinspektionen)', tipo: 'Complemento', intentos: '1) registro de insiders de FI (requiere navegador con búsqueda); 2) MFN (sin avisos de operaciones de directivos); 3) MarketScreener (sin tabla abierta)', decision: 'Omitido' },
  ],
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SWEC-B.ST, ^OMXSPI y EXH4.DE (precio, rango, volumen, beta, cierres de año)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/SWEC-B.ST/history' },
  { id: 2, titulo: 'Sweco AB: estimaciones 2026-2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://uk.marketscreener.com/quote/stock/SWECO-AB-6491806/finances/' },
  { id: 3, titulo: 'Sweco AB: consenso (6 analistas, objetivo medio, máximo y mínimo, cambios de recomendación)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://uk.marketscreener.com/quote/stock/SWECO-AB-6491806/consensus/' },
  { id: 4, titulo: 'Comparables: capitalización, valor empresa, PER adelantado, EBITDA, ROIC y FCF de 10 cotizadas', editor: 'Yahoo Finance (quoteSummary y estados financieros), pasado a SEK con su tipo de cambio', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/' },
  { id: 5, titulo: 'Tipos de cambio de referencia del 14-oct-2026 (EUR/SEK 11,1580; EUR/USD 1,1195; EUR/GBP 0,84385)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 6, titulo: 'Bono del Estado sueco a 10 años (SEGVB10YC): 3,201 % el 14-oct-2026', editor: 'Sveriges Riksbank (API SWEA)', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://api.riksbank.se/swea/v1/Observations/SEGVB10YC/2026-10-01/2026-10-15' },
  { id: 7, titulo: 'WSP to acquire POWER Engineers (1.780 M USD; 15,2 veces el EBITDA ajustado sin NIIF 16 de 2024)', editor: 'NS Energy (nota de WSP)', tipo: 'Prensa', fecha: '2024-08-13', url: 'https://www.nsenergybusiness.com/news/wsp-to-acquire-power-engineers-setting-milestone-for-accelerated-growth' },
  { id: 8, titulo: 'Recommended cash acquisition of RPS Group by Tetra Tech (≈636 M GBP; 16,0 veces el EBITDA ajustado sin NIIF 16)', editor: 'Tetra Tech (8-K, Exhibit 99.1)', tipo: 'Primaria', fecha: '2022-09-26', url: 'https://www.sec.gov/Archives/edgar/data/831641/000110465922102772/tm2226569d1_ex99-1.htm' },
  { id: 9, titulo: 'Inside information: Sitowise signs an agreement to sell its Swedish subsidiary (valor empresa ≈3,0 M EUR)', editor: 'Sitowise Group (MFN)', tipo: 'Primaria', fecha: '2026-06-09', url: 'https://www.mfn.se/cis/a/sitowise-group/inside-information-sitowise-signs-an-agreement-to-sell-its-swedish-subsidiary-2d88570f' },
  { id: 10, titulo: 'Annual Report 2025, nota 11 (compras de 2025: 1.246 M por 2.084 M de ventas) y resumen de cinco años', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2026-03-26', url: C + '4326321/4005820.pdf' },
  { id: 11, titulo: 'Billigare Sweco lockar – första köprådet på fyra år (Handelsbanken: EV/EBITA adelantado de ≈20 a ≈14 veces)', editor: 'Aktiespararna', tipo: 'Prensa', fecha: '2026-09-23', url: 'https://www.aktiespararna.se/nyheter/storbanken-attraktiv-uppsida-for-forsta-gangen-pa-lange-kop' },
  { id: 12, titulo: 'Annual and Sustainability Report 2021 (BPA y cierres de 2017-2021, reexpresados por el desdoblamiento)', editor: 'Sweco AB (publ)', tipo: 'Primaria', fecha: '2022-03-23', url: W + '2022/03/1552192.pdf' },
];
const cmp = JSON.parse(fs.readFileSync(path.join(dir, 'tmp', 'comps.json'), 'utf8')).out;
const sinSweco = cmp.filter((c) => !['SWEC-B.ST', 'FUR.AS'].includes(c.ticker));
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Sweco AB (publ)', nombre_corto: 'Sweco', ticker: 'SWEC B', isin: 'SE0000489098', mercado: 'Nasdaq Stockholm (Large Cap)', indice_referencia: 'OMX Stockholm All-Share (OMXSPI)',
    pais: 'Suecia', pais_iso: 'SE', sector: 'Industria', industria: 'Servicios profesionales (ingeniería y arquitectura)', sede: 'Estocolmo', fundacion: '1997', empleados: 21842, web: 'www.swecogroup.com',
    precio: bolsa.identificacion.precio, fecha_precio: bolsa.identificacion.fecha_precio, acciones: 362.4, capitalizacion_publicada: 47286, free_float_pct: 57.0,
    max_52s: bolsa.identificacion.max_52s, min_52s: bolsa.identificacion.min_52s, volumen_medio_diario: `≈ ${String(bolsa.volumen_3m.importe_dia_millones).replace('.', ',')} M SEK/día (3 meses, acción B)`, proximos_resultados: '2026-10-29',
  },
  consenso: {
    estimaciones: [
      { periodo: '2026e', ingresos: 34025, ebitda: 5208, ebit: 3553, bpa: 6.99, dpa: 3.95, fuente: 'MarketScreener [2]' },
      { periodo: '2027e', ingresos: 36214, ebitda: 5306, ebit: 3969, bpa: 7.94, dpa: 4.34, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 38012, ebitda: 5556, ebit: 4270, bpa: 8.59, dpa: 4.70, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 4, mantener: 1, vender: 0, po_medio: 170.5, po_min: 133.0, po_max: 200.0 },
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: { ...bolsa.bolsa, posicion_corta_pct: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: [['2020', 151.0, true], ['2021', 170.2, true], ['2022', 99.85, false], ['2023', 135.1, false], ['2024', 164.7, false], ['2025', 150.9, false]].map(([anio, p, ex]) => ({ anio, precio_cierre: p, ev_ebitda_ntm: null, per_ntm: null, excluir: ex })),
    confianza: 'Alta',
  },
  comparables: {
    empresas: sinSweco.map((c) => ({ nombre: c.nombre, ticker: c.ticker, pais: c.pais, capitalizacion: c.capitalizacion, ev_ventas: c.ev_ventas, ev_ebitda_ltm: c.ev_ebitda_ltm, ev_ebitda_ntm: null, per_ntm: c.per_ntm, crecimiento_pct: null, margen_ebitda_pct: c.margen_ebitda_pct, roic_pct: c.roic_pct, dn_ebitda: c.dn_ebitda, fcf_yield_pct: c.fcf_yield_pct })),
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2024-08', objetivo: 'POWER Engineers (EE. UU., redes eléctricas, ≈4.000 empleados)', comprador: 'WSP Global', ev: 17740, ev_ventas: null, ev_ebitda: 15.2, prima_pct: null, excluir: false, comentario: '1.780 M USD; 15,2 veces el EBITDA ajustado de 2024 sin NIIF 16 (12,5 con sinergias) [7]. Pasado a SEK al cambio de hoy [5].' },
      { fecha: '2022-09', objetivo: 'RPS Group (Reino Unido, consultoría ambiental e ingeniería)', comprador: 'Tetra Tech', ev: 8410, ev_ventas: null, ev_ebitda: 16.0, prima_pct: 7.8, excluir: false, comentario: '≈636 M GBP por el capital; 16,0 veces el EBITDA ajustado de 12 meses sin NIIF 16 (10,7 con sinergias); prima del 7,8 % sobre la oferta rival de WSP, no sobre la cotización [8].' },
      { fecha: '2025-12', objetivo: 'Trece compras de Sweco en 2025 (Projektengagemang, Fimpec, assar, Volantis…)', comprador: 'Sweco', ev: 1246, ev_ventas: 0.60, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '1.246 M por 2.084 M de ventas anuales; con EBITA conjunto negativo (−25 M con un año entero): compras de recuperación [10].' },
      { fecha: '2026-06', objetivo: 'Sitowise Sverige (≈265 empleados, 26,3 M EUR de ventas, con pérdidas)', comprador: 'Sweco', ev: 33, ev_ventas: 0.11, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Valor empresa de ≈3,0 M EUR más un pago variable de hasta 2,0 M EUR [9]; venta forzada de un negocio con pérdidas: no representativa.' },
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de EBITDA de compras europeas cotizadas (Projektengagemang, Golder, Wood E&I, IBI)', tipo: 'Complemento', intentos: '1) notas de las compradoras (Sweco no publica el múltiplo de Projektengagemang); 2) búsqueda web de Golder, Wood e IBI (sin múltiplo citable); 3) prensa sectorial (cifras sin fuente original)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'crecimiento previsto y EV/EBITDA de 12 meses de cada comparable', tipo: 'Complemento', intentos: '1) Stock Analysis (bloqueado por Cloudflare); 2) Yahoo (no da estimaciones de ventas en la ficha); 3) MarketScreener (una página por empresa, sin tiempo para diez)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Finansinspektionen, registro de posiciones cortas (requiere navegador); 2) Yahoo (sin dato para Estocolmo); 3) prensa sueca (sin cifra reciente)', decision: 'Omitido' },
  ],
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Foro de Inderes: búsqueda de mensajes sobre Sweco desde jul-2026 (carteras, Latour, Sitowise, tranvía de Turku)', editor: 'Inderes Forum', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://forum.inderes.com/search?q=sweco%20after%3A2026-07-01' },
  { id: 2, titulo: 'WSP Global: opiniones de gestores y comentaristas (jul-oct 2026) sobre la IA y el sector', editor: 'Stockchase', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://stockchase.com/WSP-T/opinions/269289' },
  { id: 3, titulo: 'Teknikkonsulten har rasat 25 procent i år – analytikerna ser nu reapris (sin comentarios de lectores visibles)', editor: 'Börskollen', tipo: 'Foros y redes', fecha: '2026-04-09', url: 'https://www.borskollen.se/nyheter/27/teknikkonsulten-har-rasat-25-procent-i-ar-analytikerna-ser-nu-reapris' },
  { id: 4, titulo: 'Billigare Sweco lockar – första köprådet på fyra år', editor: 'Aktiespararna', tipo: 'Foros y redes', fecha: '2026-09-23', url: 'https://www.aktiespararna.se/nyheter/storbanken-attraktiv-uppsida-for-forsta-gangen-pa-lange-kop' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Inderes Forum (Finlandia)', fecha: '2026-09', n_comentarios: 4, tono: 'Positivo', resumen: 'Pocos mensajes: un inversor la añade a su cartera en julio, otro la ve barata dentro de la cartera de Latour (EV/EBIT ≈14 veces) y otro comenta la venta de Sitowise Sverige a Sweco como señal de que los pequeños se rinden [1].' },
      { plataforma: 'Stockchase (opiniones sobre WSP, el comparable más seguido)', fecha: '2026-10', n_comentarios: 15, tono: 'Dividido', resumen: 'Nueve de quince opiniones son de compra, pero el debate gira en la IA: unos creen que sobra trabajo de bajo nivel y bajarán las horas facturables; otros que la responsabilidad del diseño sigue siendo humana [2].' },
      { plataforma: 'Börskollen (prensa de inversores particulares)', fecha: '2026-04', n_comentarios: 0, tono: 'Dividido', resumen: 'La caída del 25 % se atribuye al miedo a la IA y a la guerra de Irán; los analistas citados lo ven como precio de saldo [3].' },
      { plataforma: 'Aktiespararna (asociación de pequeños accionistas)', fecha: '2026-09', n_comentarios: 0, tono: 'Positivo', resumen: 'Destaca el primer consejo de compra de Handelsbanken en cuatro años por valoración, con la advertencia de que la IA empujará hacia precios por valor y no por hora [4].' },
    ],
    temas: [
      { tema: 'La IA reducirá las horas facturables', postura: 'Bajista', peso: 'Alto', contraste: 'Las horas no caen todavía: tasa de facturación del 75,9 % en el 2T26 y orgánico del 3 %, pero el volumen orgánico está plano y el crecimiento sale de tarifas [2, 4].' },
      { tema: 'Precio de saldo frente a su historia', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto frente a 2022-2025 (PER adelantado de 21-27 veces), no frente a 2017-2018 (17 veces) [3, 4].' },
      { tema: 'Compras baratas en un mercado deprimido', postura: 'Alcista', peso: 'Bajo', contraste: 'Las compras de 2025 restan EBITA al principio; la tesis necesita que Projektengagemang y Sitowise lleguen al margen del grupo [1].' },
    ],
    confianza: 'Baja',
  },
  huecos: [],
  fuentes: fE,
};

guarda('A', A); guarda('B', B); guarda('C', Cn); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas.');
