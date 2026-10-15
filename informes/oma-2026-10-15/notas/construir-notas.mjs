// Escribe las notas A-E de OMA (Grupo Aeroportuario del Centro Norte), corte 2026-10-15, MXN, ejercicio natural.
// Hechas por el analista sin subagentes. Cada nota cita con [n] de su propia lista de fuentes.
// Ingresos = aeronáuticos + no aeronáuticos (SIN los ingresos de construcción de CINIIF 12, que tienen margen cero y se compensan con el coste de construcción).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const SEC = 'https://www.sec.gov/Archives/edgar/data/1378239/';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 20-F 2025 (cuentas consolidadas 2023-2025 auditadas por Deloitte, notas, Plan Maestro 2026-2030, tarifas máximas)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000110465926051987/omab-20251231x20f.htm' },
  { id: 2, titulo: 'Form 20-F 2022 (cuentas 2020-2022)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2023-04-28', url: SEC + '000155837023007311/omab-20221231x20f.htm' },
  { id: 3, titulo: 'Form 20-F 2019 (cuentas 2017-2019)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2020-04-30', url: SEC + '000155837020004773/omab-20191231x20f.htm' },
  { id: 4, titulo: 'OMA Announces Second Quarter 2026 Operating and Financial Results (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: SEC + '000199937126016264/oma-6k_072726.htm' },
  { id: 5, titulo: 'OMA Announces Fourth Quarter 2025 Operating and Financial Results (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: SEC + '000199937126003985/oma-6k_022426.htm' },
  { id: 6, titulo: 'Hechos XBRL de los 20-F (companyfacts, CIK 1378239)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001378239.json' },
  { id: 7, titulo: 'Resultados trimestrales OMA 2T26 (múltiplos y cifras UDM)', editor: 'Grupo Financiero Ve por Más (B×+)', tipo: 'Analistas', fecha: '2026-07-28', url: 'https://estrategia.vepormas.com/wp-content/uploads/2026/07/Trimestral-OMA-2T26-2.pdf' },
  { id: 8, titulo: 'Grupo Aeroportuario del Centro Norte Q2 2026 Earnings Call Transcript', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.marketbeat.com/earnings/reports/2026-7-27-grupo-aeroportuario-del-centro-norte-sab-de-cv-stock/' },
  { id: 9, titulo: 'OMA reports a 4.8% decrease in September 2026 passenger traffic (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-10-07', url: SEC + '000199937126022397/omab-6k_100726.htm' },
  { id: 10, titulo: 'OMA reports a 4.0% increase in August 2026 passenger traffic (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-09-04', url: SEC + '000199937126019999/oma-6k_090726.htm' },
  { id: 11, titulo: 'OMA reports a 3.9% increase in July 2026 passenger traffic (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: SEC + '000199937126017108/oma-6k_080626.htm' },
  { id: 12, titulo: 'OMA completes issuance of debt, Ps.3.0 billion (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-07-20', url: SEC + '000199937126015433/oma-6k_072026.htm' },
  { id: 13, titulo: "OMA's Annual Meeting approved Ps.4,900 million dividend payment (6-K)", editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-04-24', url: SEC + '000199937126009053/oma-6k_042426.htm' },
  { id: 14, titulo: 'OMA announces external auditor change (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-10-09', url: SEC + '000199937126022578/omab-6k_101326.htm' },
];

const c = (periodo, ingresos, coste_ventas, gastos_generales, amortizaciones, ebit, resultado_financiero, impuestos, minoritarios, beneficio_neto, gastos_financieros, bpa, dpa, dpa_extraordinario, acciones_diluidas) => ({
  periodo, ingresos, coste_ventas, gastos_generales, ebitda: +(ebit + amortizaciones).toFixed(1), amortizaciones, ebit, resultado_financiero,
  bai: +(ebit + resultado_financiero).toFixed(1), impuestos, minoritarios, beneficio_neto, gastos_financieros,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario, acciones_diluidas,
});
// coste_ventas = coste de servicios + provisión de mantenimiento mayor + derecho de concesión + asistencia técnica (sin coste de construcción)
const cuenta = [
  c('2018', 6765.5, 1718.3, 563.2, 351.7, 4132.5, -146.9, 1121.4, 12.4, 2851.8, 325.6, 7.25, 4.10, 0, 393.45),
  c('2019', 7572.3, 1760.2, 542.7, 415.3, 4855.3, -255.7, 1372.2, 7.6, 3219.8, 376.0, 8.20, 0.82, 0, 392.74),
  c('2020', 4113.6, 1438.9, 518.1, 435.3, 1721.5, -229.1, 395.0, 3.5, 1094.4, 421.0, 2.80, 5.13, 0, 390.31),
  c('2021', 6931.1, 1748.3, 586.5, 487.2, 4110.4, -274.6, 972.0, 6.4, 2857.4, 517.0, 7.35, 17.10, 11.20, 388.63),
  c('2022', 9285.3, 2002.1, 667.6, 551.2, 6064.5, -771.7, 1376.0, 16.3, 3901.0, 934.0, 10.10, 9.61, 3.72, 386.17),
  c('2023', 11559.1, 2190.0, 661.4, 641.3, 8066.9, -1007.0, 2039.4, 8.6, 5011.8, 1269.4, 12.98, 10.89, 0, 386.17),
  c('2024', 12212.8, 2605.8, 776.4, 757.0, 8083.2, -1014.0, 2133.0, 7.4, 4928.8, 1328.9, 12.76, 11.54, 0, 386.17),
  c('2025', 13651.0, 2963.1, 871.3, 877.6, 8941.0, -1309.0, 2266.7, 23.6, 5341.7, 1475.4, 13.83, 12.56, 0, 386.17),
];

const b = (periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, intangibles, inmovilizado_material, clientes, proveedores, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas) => ({
  periodo, activo_total, activo_corriente, pasivo_corriente, pasivo_total, fondo_comercio: 0, intangibles, inmovilizado_material, existencias: 0, clientes, proveedores,
  activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera, arrendamientos, patrimonio_neto, minoritarios, reservas,
});
const historicoBalance = [
  b('2018', 15590.5, 3959.6, 1224.7, 7078.6, 8566.7, 2670.3, 696.6, 204.0, 2958.9, 4584.6, 12.9, 8347.2, 164.7, 6534.8),
  b('2019', 17277.0, 4810.9, 1235.3, 7389.5, 9267.1, 2647.1, 757.8, 196.8, 3429.9, 4543.6, 148.5, 9715.1, 172.4, 8121.9),
  b('2020', 18191.6, 4730.8, 4225.6, 7365.3, 10229.7, 2700.5, 833.6, 204.0, 2958.8, 4510.4, 194.8, 10650.3, 175.9, 8824.7),
  b('2021', 22889.1, 7776.4, 4902.4, 11650.9, 11680.7, 2724.3, 1085.7, 213.2, 5987.2, 7696.6, 224.7, 11056.0, 182.3, 9702.1),
  b('2022', 23070.0, 5593.5, 5259.0, 14515.4, 13940.4, 2566.1, 1266.1, 326.3, 3336.4, 10184.3, 208.2, 8369.2, 185.4, 6528.7),
  b('2023', 25237.6, 4907.9, 2473.9, 15399.1, 16421.3, 2852.7, 1298.4, 385.5, 2576.3, 10676.7, 198.8, 9670.5, 168.0, 7828.4),
  b('2024', 27233.1, 4292.5, 3267.3, 16688.8, 18715.8, 3112.5, 1846.0, 610.4, 1656.4, 11281.9, 179.0, 10384.8, 159.5, 8550.2),
  b('2025', 30937.5, 6261.9, 4729.1, 19510.8, 20352.3, 3041.7, 2010.5, 789.2, 3098.1, 13428.4, 158.6, 11260.2, 166.4, 9437.4),
];

const f = (periodo, flujo_operativo, capex, pagos_arrendamientos, desinversiones, dividendos, recompras, intereses_en_financiacion) => ({
  periodo, flujo_operativo, capex, pagos_arrendamientos, adquisiciones: 0, desinversiones, dividendos, recompras, emision_acciones: 0, intereses_en_financiacion,
});
// capex = compra de inmovilizado + mejoras en activos concesionados (las dos líneas de inversión del estado de flujos)
const historicoFlujos = [
  f('2018', 3709.3, 1283.0, 8.6, 0.2, 1605.7, 0, 323.1),
  f('2019', 3716.5, 1143.5, 50.2, 1.2, 1598.7, 0, 327.3),
  f('2020', 1303.5, 1441.6, 57.3, 5.4, 320.9, 0, 321.0),
  f('2021', 4446.8, 1925.9, 54.6, 1.5, 1979.8, 474.9, 364.0),
  f('2022', 4985.3, 2905.5, 53.2, 0.0, 6615.8, 0, 732.0),
  f('2023', 6334.7, 3063.6, 58.8, 0.5, 3738.1, 0, 1092.9),
  f('2024', 6196.7, 2726.8, 63.0, 0.3, 4220.7, 0, 1100.4),
  f('2025', 7445.9, 2702.6, 70.5, 0.3, 4468.7, 0, 1208.1),
];

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 13966.8, ebitda: 9921.6, ebit: 9003.8, beneficio_neto: 5421.2, bpa: 14.04, dpa: 12.56, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: null, ajustes: null, confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 3299.2, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2394.5, margen_ebitda_pct: 72.6, bpa: 3.07, vs_consenso: null },
      { periodo: '1T25', ingresos: 3166.0, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2318.8, margen_ebitda_pct: 73.2, bpa: 3.32, vs_consenso: null },
      { periodo: '2T25', ingresos: 3437.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2513.5, margen_ebitda_pct: 73.1, bpa: 3.46, vs_consenso: 'Inferior' },
      { periodo: '3T25', ingresos: 3546.8, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 2625.4, margen_ebitda_pct: 74.0, bpa: 3.90, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 3500.7, crecimiento_pct: 6.1, crecimiento_organico_pct: null, ebitda: 2360.9, margen_ebitda_pct: 67.4, bpa: 3.15, vs_consenso: null },
      { periodo: '1T26', ingresos: 3297.2, crecimiento_pct: 4.1, crecimiento_organico_pct: null, ebitda: 2312.3, margen_ebitda_pct: 70.1, bpa: 3.19, vs_consenso: null },
      { periodo: '2T26', ingresos: 3622.1, crecimiento_pct: 5.4, crecimiento_organico_pct: null, ebitda: 2623.1, margen_ebitda_pct: 72.4, bpa: 3.80, vs_consenso: 'Inferior' },
    ],
    ultima_presentacion: null,
    confianza: 'Media',
  },
  balance: {
    historico: historicoBalance,
    vencimientos: null,
    liquidez: 'Caja de 2.577 M MXN al 30-jun-26; el 16-jul-26 emitió 3.000 M en certificados bursátiles a tres años y con ellos amortizó 1.700 M de deuda bancaria a corto y 640 M del OMA 23L [4, 12].',
    rating: 'Sin dato verificado en los documentos leídos (emisor de certificados bursátiles en el mercado local)',
    coste_deuda_pct: 9.9, vida_media_anios: null,
    otros_pasivos: null, comentario: null, confianza: 'Alta',
  },
  flujos: { historico: historicoFlujos, comentario: null, confianza: 'Alta' },
  calidad: {
    auditor: 'Galaz, Yamazaki, Ruiz Urquiza (Deloitte) hasta 2025; Mancera (EY) desde el ejercicio 2026', anios_auditor: null,
    opinion: 'Favorable (sin salvedades) en las cuentas de 2025 [1]', comentario: null,
    senales: [],
    confianza: 'Media',
  },
  capital: {
    politica: null,
    adquisiciones: [],
    comentario: null, confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Aeronáuticos', descripcion: 'Tarifa de uso de aeropuerto (TUA) por pasajero, aterrizaje, plataforma y seguridad; regulados por tarifa máxima por unidad de carga', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 5277.7, resultado: null }, { periodo: '2022', ingresos: 7055.5, resultado: null }, { periodo: '2023', ingresos: 8931.7, resultado: null }, { periodo: '2024', ingresos: 9136.9, resultado: null }, { periodo: '2025', ingresos: 10190.7, resultado: null }] },
      { nombre: 'No aeronáuticos', descripcion: 'Comerciales (aparcamiento, restaurantes, tiendas, salas VIP, publicidad) y diversificación (OMA Carga, hoteles NH Collection T2 y Hilton Garden Inn, parque industrial OMA-VYNMSA)', tipo_resultado: null, historico: [
        { periodo: '2021', ingresos: 1653.4, resultado: null }, { periodo: '2022', ingresos: 2229.8, resultado: null }, { periodo: '2023', ingresos: 2627.4, resultado: null }, { periodo: '2024', ingresos: 3075.9, resultado: null }, { periodo: '2025', ingresos: 3460.3, resultado: null }] },
    ],
    geografias: [{ nombre: 'México', peso_pct: 100 }], geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Pasajeros terminales (millones)', valor_anterior: '26,5 (2024)', valor_actual: '28,8 (2025)', variacion: '+8,7 %', comentario: '1S26: 13,96 M (+2,4 %); julio +3,9 %, agosto +4,0 %, septiembre −4,8 % [4, 9, 10, 11]' },
      { kpi: 'Monterrey (millones de pasajeros)', valor_anterior: '13,6 (2024)', valor_actual: '15,6 (2025)', variacion: '+14,7 %', comentario: '54 % del tráfico del grupo; 1S26 +2,6 % [1, 4]' },
      { kpi: 'Ingreso aeronáutico por unidad de carga (MXN)', valor_anterior: '327,8 (2024)', valor_actual: '338,7 (2025)', variacion: '+3,3 %', comentario: 'Limitado por la tarifa máxima; cumplimiento previsto del 93-95 % en 2026 tras la nueva tarifa [1, 8]' },
      { kpi: 'Ingreso no aeronáutico por pasajero (MXN)', valor_anterior: '116,0 (2024)', valor_actual: '120,4 (2025)', variacion: '+3,8 %', comentario: 'Comercial por pasajero 66,4 MXN en el 2T26 (+6,3 %) [1, 4]' },
      { kpi: 'Margen EBITDA ajustado (sin construcción, con la provisión de mantenimiento sumada)', valor_anterior: '74,3 % (2024)', valor_actual: '74,5 % (2025)', variacion: '+0,2 pp', comentario: '1S26: 74,3 % [4, 5]' },
      { kpi: 'Ocupación del espacio comercial', valor_anterior: null, valor_actual: '96,4 % (jun-26)', variacion: null, comentario: '[4]' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del 20-F 2025 (texto de cada emisión, sin tabla anual legible); 2) informe del 2T26 (tablas en imagen sin calendario); 3) prensa de la emisión de julio de 2026 (solo el plazo de la nueva)', decision: 'Omitido' },
    { seccion: 'trimestres', campo: 'crecimiento_pct de 4T24 a 3T25', tipo: 'Complemento', intentos: '1) Informes trimestrales de 2024 no descargados; 2) 20-F (solo anual); 3) derivarlo de los acumulados (no hay 9M24)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 20-F 2025: regulación, tarifas máximas 2021-2030, Plan Maestro 2026-2030, concesiones, aerolíneas clientes y competencia', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000110465926051987/omab-20251231x20f.htm' },
  { id: 2, titulo: 'Se derrumban acciones de grupos aeroportuarios mexicanos tras medida tarifaria del gobierno federal', editor: 'Aviacionline', tipo: 'Prensa', fecha: '2023-10-05', url: 'https://www.aviacionline.com/se-derrumban-acciones-de-grupos-aeroportuarios-mexicanos-tras-medida-tarifaria-del-gobierno-federal' },
  { id: 3, titulo: 'Grupos aeroportuarios ASUR y GAP borran casi 5,000 mdp en valor por nueva regulación de tarifas (derecho de concesión del 5 % al 9 %)', editor: 'El CEO', tipo: 'Prensa', fecha: '2023-10-19', url: 'https://elceo.com/mercados/los-grupos-aeroportuarios-asur-y-gap-borran-casi-5000-mdp-en-valor-por-nueva-regulacion-de-tarifas/' },
  { id: 4, titulo: 'OMA, controladora del aeropuerto de Acapulco y Monterrey, va a la BMV por hasta 3,000 millones (tráfico de abril, presiones de costes del PMD 2026-2030)', editor: 'El Cronista México', tipo: 'Prensa', fecha: '2026-06-02', url: 'https://www.cronista.com/mexico/finanzas-economia/oma-controladora-del-aeropuerto-de-acapulco-y-monterrey-va-a-la-bmv-por-hasta-3000-millones/' },
  { id: 5, titulo: 'Fichas de mercado de Yahoo Finance (capitalización, EBITDA LTM, deuda neta, PER adelantado) de ASUR, GAP, Aena, ADP, Fraport, Flughafen Zürich, CAAP y Auckland', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 6, titulo: 'OMA Announces Second Quarter 2026 Operating and Financial Results (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: SEC + '000199937126016264/oma-6k_072726.htm' },
];
const B = {
  _estado: 'completa',
  negocio: {
    descripcion: 'OMA tiene la concesión de 13 aeropuertos internacionales del centro y norte de México (Monterrey, Acapulco, Mazatlán, Zihuatanejo, Ciudad Juárez, Chihuahua, Culiacán, Durango, Reynosa, San Luis Potosí, Tampico, Torreón y Zacatecas) hasta 2048, prorrogable hasta 50 años más [1]. En 2025 atendió 28,8 millones de pasajeros, 24,5 millones nacionales y 4,3 millones internacionales; Monterrey, tercera área metropolitana del país y su principal centro industrial, aporta 15,6 millones (54 %) [1]. Cobra a aerolíneas y pasajeros servicios aeronáuticos regulados (75 % de los ingresos sin construcción) y explota negocios comerciales y de diversificación: aparcamientos, restauración, tiendas, salas VIP, la carga (OMA Carga), dos hoteles (NH Collection en la T2 del aeropuerto de Ciudad de México y Hilton Garden Inn en Monterrey) y un parque industrial con VYNMSA [1, 6].',
    como_gana_dinero: null,
    clientes: 'Concentración alta: en 2025 Viva Aerobus generó el 41,4 % de los ingresos aeronáuticos, Volaris el 21,5 % y Grupo Aeroméxico el 18,6 %; las de bajo coste llevaron el 73,7 % del tráfico comercial [1]. Viva y Volaris anunciaron el 18-dic-2025 su fusión en un grupo con marcas y certificados separados, pendiente de autorizaciones [1]: el nuevo grupo tendría alrededor del 63 % de los ingresos aeronáuticos de OMA. Ningún contrato obliga a las aerolíneas a mantener vuelos [1]. El poder de precios no es libre: la tarifa máxima por unidad de carga la fija la autoridad cada cinco años con un flujo descontado que remunera el Plan Maestro; para 2026-2030 Monterrey sube de 337,39 a 360,63 pesos constantes (+6,9 %), y después baja un 0,8 % real al año por eficiencia [1]. Los ingresos comerciales son contratos de regalía con mínimo garantizado [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado relevante: servicios aeroportuarios en México, prestados por concesionarios en régimen de monopolio local regulado por precio máximo (ASUR en el sureste, GAP en el Pacífico, OMA en el centro-norte, el Aeropuerto de la Ciudad de México y los aeropuertos del Estado y de empresas militares) [1]. Cada aeropuerto es el único de su ciudad: la competencia es por la capacidad que asignan las aerolíneas entre destinos y, en el centro del país, frente al AIFA y Toluca. El tamaño se mide en pasajeros; no hay una cifra oficial de ingresos del sector y la cuota se da en tráfico.',
    tamano: 'OMA atendió 28,8 M de pasajeros en 2025 [1]; las estadísticas de la AFAC y la prensa dan entre 120 y 190 M de pasajeros al año en los aeropuertos del país según el criterio (transportados en vuelos regulares o atendidos en terminal), por lo que no se usa una cifra única',
    unidad_serie: null, serie: [],
    tcac_historico_pct: 4.4, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Concentrada',
    drivers: [
      { driver: 'Tráfico nacional de bajo coste (Viva y Volaris)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Las de bajo coste llevan el 73,7 % del tráfico comercial de OMA; su fusión y los motores Pratt & Whitney GTF limitan la capacidad: asientos −0,3 % en el 2T26 [1, 6]' },
      { driver: 'Nearshoring y economía de Monterrey', efecto: '+', horizonte: 'Estructural', evidencia: 'Monterrey pasó de 13,6 a 15,6 M de pasajeros en 2025 (+14,7 %) y abrió rutas a París, Madrid y Nueva York en 2026 [1, 6]' },
      { driver: 'Tarifa máxima regulada', efecto: '+', horizonte: 'Estructural', evidencia: 'Tarifas 2026-2030 entre un 4 % y un 7 % por encima de las de 2025 en pesos constantes, con −0,8 % real anual de eficiencia [1]' },
      { driver: 'Precio del combustible de aviación', efecto: '−', horizonte: 'Cíclico', evidencia: 'La subida del queroseno en el 1S26 llevó a las aerolíneas a recortar capacidad; la empresa espera tráfico plano o de un dígito bajo en 2026 [6]' },
      { driver: 'Tipo de cambio peso-dólar', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La TUA internacional se cobra en dólares: cayó un 8,7 % en el 2T26 por la apreciación del peso [6]' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Monopolio local en cada ciudad; solo compite por la asignación de capacidad de las aerolíneas y, en algunas rutas, con el AIFA y Toluca [1]' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Viva y Volaris suman el 62,9 % de los ingresos aeronáuticos y se fusionan; pueden mover aviones entre aeropuertos [1]' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Constructoras y servicios contratados en competencia; la asistencia técnica la presta VINCI (SETA) por contrato [1]' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Concesiones federales hasta 2048; un aeropuerto nuevo en la misma ciudad exige una decisión del Gobierno [1]' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Autobús de larga distancia en trayectos cortos; el tren de pasajeros solo en proyecto [1]' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: null },
    regulacion: 'Ley de Aeropuertos y títulos de concesión de 1998: tarifa máxima por unidad de carga (un pasajero o 100 kg de carga) fijada cada cinco años con el Plan Maestro de Desarrollo; el 18-dic-2025 se aprobaron el Plan 2026-2030 (16.634 M de inversión comprometida) y las tarifas hasta 2030 [1]. En octubre de 2023 la AFAC cambió sin aviso las bases de regulación y el Gobierno subió el derecho de concesión del 5 % al 9 % de los ingresos brutos (en vigor desde 2024); las acciones de OMA cayeron un 26 % en un día [2, 3]. El exceso pagado en 2024-2025 se incorporó al valor de referencia de las tarifas 2026-2030 [1]. Entre 2023 y 2024 el Gobierno dio aeropuertos a empresas militares [1].',
    tendencias: null,
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 15.0,
    posicion: 'Tercer grupo aeroportuario privado de México por pasajeros (28,8 M en 2025) tras GAP y ASUR; monopolio regulado en sus 13 ciudades; cuota de alrededor del 15 % de los pasajeros del país (estimación propia con la cifra de la AFAC y la Secretaría de Turismo)',
    competidores: [
      { nombre: 'Grupo Aeroportuario del Pacífico (GAP)', pais: 'México', ticker: 'GAPB.MX', ingresos: 42131, cuota_pct: null, margen_ebit_pct: null, comentario: 'Guadalajara, Tijuana, Los Cabos, Puerto Vallarta y dos aeropuertos en Jamaica; ingresos con construcción [5]' },
      { nombre: 'Grupo Aeroportuario del Sureste (ASUR)', pais: 'México', ticker: 'ASURB.MX', ingresos: 38112, cuota_pct: null, margen_ebit_pct: null, comentario: 'Cancún y otros 8 en México, San Juan (Puerto Rico) y Colombia; más turístico e internacional [5]' },
      { nombre: 'Aeropuerto Internacional de la Ciudad de México (AICM)', pais: 'México', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Estatal; destino principal de las rutas de OMA [1]' },
      { nombre: 'Aeropuerto Internacional Felipe Ángeles (AIFA)', pais: 'México', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Estatal-militar; recibe parte del tráfico que antes iba al AICM [1]' },
      { nombre: 'Aena', pais: 'España', ticker: 'AENA.MC', ingresos: 136809, cuota_pct: null, margen_ebit_pct: null, comentario: 'Referencia internacional de operador regulado; dueña de parte de GAP vía AMP [5]' },
    ],
    foso: { veredicto: 'Amplio', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Más rutas en Monterrey atraen más aerolíneas (24 rutas nuevas en el 2T26), pero no es un centro de conexiones [6]' },
      { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Una aerolínea puede mover aviones entre ciudades, pero no puede servir Monterrey desde otro aeropuerto [1]' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: 'Concesión federal exclusiva de 13 aeropuertos hasta 2048, prorrogable [1]' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA ajustado del 74,5 % en 2025, de los más altos del mundo entre cotizadas [1, 5]' },
      { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Cada ciudad solo sostiene un aeropuerto; la red de 13 comparte compras y gestión [1]' },
    ] },
    amenazas: null,
    confianza: 'Media',
  },
  historia: {
    resumen: 'El Gobierno federal dividió en 1998 los principales aeropuertos del país en cuatro grupos y dio a OMA las concesiones de 13 del centro-norte por 50 años [1]. En 2000 vendió el 15 % (acciones serie BB, con derechos de gestión) a SETA, sociedad formada por ICA, Aéroports de Paris y Vinci, que firmó el contrato de asistencia técnica [1]. En noviembre de 2006 el Gobierno colocó en bolsa el 48 % del capital en Nueva York y México [1]. ICA salió y Fintech Holdings se hizo con SETA; en diciembre de 2022 VINCI Airports compró a Fintech el 29,99 % del capital por 1.170 M USD y tomó el control de la gestión [1]. En octubre de 2023 el Gobierno cambió las reglas de tarifas y subió el derecho de concesión al 9 % [2, 3].',
    hitos: [
      { anio: '1998', hito: 'Concesiones de 13 aeropuertos por 50 años (hasta 2048) [1]' },
      { anio: '2000', hito: 'SETA compra el 15 % (serie BB) y firma la asistencia técnica [1]' },
      { anio: '2006', hito: 'Salida a bolsa en la BMV y el Nasdaq (48 % del capital) [1]' },
      { anio: '2020', hito: 'COVID: 11,1 M de pasajeros frente a 23,2 M en 2019 [1]' },
      { anio: '2022', hito: 'VINCI Airports compra el 29,99 % por 1.170 M USD [1]' },
      { anio: '2023', hito: 'Cambio de las bases tarifarias y derecho de concesión del 5 % al 9 %: −26 % en bolsa en un día [2, 3]' },
      { anio: '2025', hito: 'Récord de 28,8 M de pasajeros; aprobado el Plan Maestro 2026-2030 y las tarifas hasta 2030 [1]' },
    ],
    confianza: 'Alta',
  },
  esg: {
    calificaciones: [],
    materialidad: null,
    controversias: null,
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'serie', tipo: 'Complemento', intentos: '1) 20-F (solo el tráfico propio); 2) búsqueda de la estadística anual de la AFAC (solo 2024: 119,5 M en vuelos regulares); 3) Secretaría de Turismo (enero-septiembre de 2025, otro criterio)', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad 2025 (nota de prensa, sin calificaciones); 2) 20-F; 3) búsqueda no hecha por presupuesto', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025: Item 6 (consejo, directivos, remuneración) e Item 7 (accionistas, SETA, partes vinculadas)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: SEC + '000110465926051987/omab-20251231x20f.htm' },
  { id: 2, titulo: 'OMA Announces Change in Investor Relation Officer (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-09-28', url: SEC + '000199937126021487/omab-6k_092926.htm' },
  { id: 3, titulo: 'OMA announces external auditor change (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-10-09', url: SEC + '000199937126022578/omab-6k_101326.htm' },
  { id: 4, titulo: "OMA's Annual Meeting approved Ps.4,900 million dividend payment (6-K)", editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-04-24', url: SEC + '000199937126009053/oma-6k_042426.htm' },
  { id: 5, titulo: 'Schedule 13G de BlackRock sobre OMA (10,2 % de la serie B)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-01-08', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001378239&type=SC+13G' },
  { id: 7, titulo: 'Grupo Aeroportuario del Centro Norte Q2 2026 Earnings Call Transcript', editor: 'MarketBeat', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.marketbeat.com/earnings/reports/2026-7-27-grupo-aeroportuario-del-centro-norte-sab-de-cv-stock/' },
  { id: 6, titulo: 'OMA responds to Mexican Stock Exchange request regarding trading volume (6-K)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-09-18', url: SEC + '000199937126020900/oma-6k_091826.htm' },
];
const C = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Ricardo Dueñas Espriu', cargo: 'Director general', desde: '2018', participacion_pct: null, trayectoria: 'Antes director financiero del Grupo Aeroportuario de la Ciudad de México y asesor de infraestructuras de la SCT [1]. Con él el tráfico pasó de 21,6 M (2018) a 28,8 M (2025) y el margen EBITDA ajustado al 74,5 % [1].' },
      { nombre: 'Ruffo Pérez Pliego del Castillo', cargo: 'Director financiero', desde: '2018', participacion_pct: null, trayectoria: 'Más de 25 años en finanzas corporativas; antes director financiero y general de Latin American Airports Holdings [1].' },
      { nombre: 'Nicolas Notebaert', cargo: 'Presidente del consejo', desde: '2022', participacion_pct: null, trayectoria: 'Miembro del comité ejecutivo de VINCI y consejero delegado de VINCI Concessions, presidente de VINCI Airports [1].' },
      { nombre: 'Raful Zacarías Ezzat', cargo: 'Director de operaciones', desde: '2025', participacion_pct: null, trayectoria: 'Más de 20 años en OMA; administró los aeropuertos de Monterrey y Ciudad Juárez [1].' },
      { nombre: 'Pierre Grosmaire', cargo: 'Director comercial', desde: '2025', participacion_pct: null, trayectoria: 'Antes director comercial de Lyon Airports (VINCI) y director global de desarrollo aeronáutico de VINCI Airports [1].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Tráfico plano o de un dígito bajo; inversión de 3.500-4.000 M; cumplimiento de la tarifa máxima del 93-95 % [7]', real: 'Enero-septiembre: +2,4 % en el 1S, +3,9 % julio, +4,0 % agosto, −4,8 % septiembre', cumplida: 'Parcial' },
    ],
    comentario: null,
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Nicolas Notebaert', cargo: 'Presidente', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Rémi Maumon de Longevialle', cargo: 'Consejero', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Olivier Mathieu', cargo: 'Consejero', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Emmanuelle Huon', cargo: 'Consejera', tipo: 'Dominical', desde: '2022', comisiones: null },
      { nombre: 'Alvaro Leite', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Jérôme Havard', cargo: 'Consejero', tipo: 'Dominical', desde: '2025', comisiones: null },
      { nombre: 'Katia Eschenbach', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría / Prácticas societarias' },
      { nombre: 'Martín Werner Wainfeld', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría / Prácticas societarias' },
      { nombre: 'Luis Solórzano Aizpuru', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Auditoría / Prácticas societarias' },
      { nombre: 'Federico Patiño Márquez', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría / Prácticas societarias' },
      { nombre: 'Regina García-Cuéllar', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría / Prácticas societarias' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'El 20-F solo da la remuneración agregada: 33,9 M MXN en 2025 para 24 directivos (incluidos los administradores de aeropuerto); no hay plan de opciones ni indemnizaciones por encima de la ley laboral, y existe política de recuperación (clawback) exigida por el Nasdaq [1]. Los consejeros de VINCI no cobran de OMA según el 20-F; no se publica el detalle por persona ni las métricas del variable.',
    accionistas: [
      { nombre: 'VINCI Airports (SETA y CONCESSOC)', pct: 29.99, tipo: 'Control (serie BB 12,9 % + serie B)', variacion: 'Estable desde dic-2022' },
      { nombre: 'BlackRock', pct: 9.0, tipo: 'Institucional (10,2 % de la serie B)', variacion: '13G de enero de 2026' },
      { nombre: 'Autocartera', pct: 1.0, tipo: 'Autocartera (3,94 M de acciones)', variacion: 'Recompra autorizada de hasta 1.500 M sin uso en septiembre de 2026' },
    ],
    insiders: [],
    control_y_defensas: 'VINCI controla de hecho con el 29,99 %: la serie BB (12,9 %, solo de SETA) le da tres consejeros, el derecho a proponer al director general y a nombrar al financiero, al de operaciones y al comercial, y vetos mientras tenga al menos el 7,65 % en serie BB y siga el contrato de asistencia técnica [1]. Ese contrato le paga una comisión (261 M MXN en 2025, ligada al EBITDA) y es la principal operación vinculada [1]. Seis de los once consejeros son de VINCI; el presidente es el jefe de concesiones de VINCI [1]. Los estatutos limitan la tenencia y fijan que quien tenga el 10 % de la serie B nombra un consejero [1].',
    alertas: [
      'Cambio de auditor de Deloitte a EY para el ejercicio 2026, presentado como mejora de gobierno (9-oct-2026) [3].',
      'Relevo del responsable de relación con inversores, que pasa a otro puesto de VINCI (30-sep-2026) [2].',
      'Comisión de asistencia técnica a VINCI de 261 M MXN en 2025 (+10,9 %) [1].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'voto_remuneracion_pct', tipo: 'Complemento', intentos: '1) 6-K de la junta de abril de 2026 (sin porcentajes); 2) 20-F (sin actas); 3) web de la BMV no consultada', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'insiders', tipo: 'Complemento', intentos: '1) Form 3 de marzo de 2026 (alta de consejeros, sin operaciones); 2) 6-K de volumen de septiembre (la empresa no sabe de operaciones de consejeros); 3) sin Form 4 para un emisor extranjero', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (OMAB.MX, ^MXX, ASURB.MX) hasta el 14-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/OMAB.MX/history' },
  { id: 2, titulo: 'Grupo Aeroportuario del Centro Norte (OMA B): finances, consenso de 15 analistas', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.marketscreener.com/quote/stock/GRUPO-AEROPORTUARIO-DEL-C-6499152/finances/' },
  { id: 3, titulo: 'Fichas de Yahoo Finance de los comparables (capitalización, deuda neta, EBITDA LTM, PER adelantado)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/' },
  { id: 4, titulo: 'Long-Term Government Bond Yields: 10-year for Mexico (IRLTLT01MXM156N), agosto de 2026', editor: 'OECD vía FRED', tipo: 'Datos de mercado', fecha: '2026-09', url: 'https://fred.stlouisfed.org/series/IRLTLT01MXM156N' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026', editor: 'A. Damodaran, NYU Stern', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Form 20-F 2022 (compra del 29,99 % por VINCI por 1.170 M USD)', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2023-04-28', url: SEC + '000155837023007311/omab-20221231x20f.htm' },
  { id: 7, titulo: 'Tipos de cambio de referencia del euro, 14-oct-2026 (EUR/MXN 20,56; EUR/USD 1,1195)', editor: 'Banco Central Europeo', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 8, titulo: 'Resultados trimestrales OMA 2T26 (B×+): beta a 3 años frente al MEXBOL 1,295 y múltiplos UDM', editor: 'Grupo Financiero Ve por Más', tipo: 'Analistas', fecha: '2026-07-28', url: 'https://estrategia.vepormas.com/wp-content/uploads/2026/07/Trimestral-OMA-2T26-2.pdf' },
  { id: 9, titulo: 'OMA Announces Second Quarter 2026 Operating and Financial Results (6-K): balance al 30-jun-26', editor: 'Grupo Aeroportuario del Centro Norte (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: SEC + '000199937126016264/oma-6k_072726.htm' },
  { id: 10, titulo: 'USD/MXN, cierre del 7-dic-2022 (19,754)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2022-12-07', url: 'https://finance.yahoo.com/quote/MXN=X/history' },
];
const comps = JSON.parse(fs.readFileSync(path.join(dir, 'tmp', 'comps.json'), 'utf8')).out;
const empresas = comps.filter((x) => !['OMAB.MX', 'DG.PA', 'FRA.DE'].includes(x.ticker)).map(({ _info, ...x }) => ({ ...x, nombre: x.nombre }));
// Fraport: la deuda neta de Yahoo sale negativa (dato erróneo) → solo su PER
const fra = comps.find((x) => x.ticker === 'FRA.DE');
empresas.push({ nombre: fra.nombre, ticker: fra.ticker, pais: fra.pais, capitalizacion: fra.capitalizacion, ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: fra.per_ntm, crecimiento_pct: null, margen_ebitda_pct: fra.margen_ebitda_pct, roic_pct: null, dn_ebitda: null, fcf_yield_pct: null });
const D = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Grupo Aeroportuario del Centro Norte, S.A.B. de C.V. (OMA)', nombre_corto: 'OMA', ticker: 'OMAB', isin: 'MX01OM000018', mercado: 'Bolsa Mexicana de Valores (OMA B); ADS en el Nasdaq (OMAB, 8 acciones B por ADS)', indice_referencia: 'S&P/BMV IPC',
    pais: 'México', pais_iso: 'MX', sector: 'Industria', industria: 'Infraestructuras de transporte (aeropuertos)', sede: 'Monterrey y Ciudad de México', fundacion: '1998', empleados: 1200, web: 'www.oma.aero',
    precio: 204.78, fecha_precio: '2026-10-14', acciones: 386.17, capitalizacion_publicada: null, free_float_pct: 70.0,
    max_52s: 289.74, min_52s: 199.75, volumen_medio_diario: '≈ 180 M MXN/día en la BMV (3 meses) [1]', proximos_resultados: '2026-10-26',
  },
  consenso: {
    guidance: null,
    estimaciones: [
      { periodo: '2026e', ingresos: null, ebitda: 10631, ebit: 9919, bpa: 16.02, dpa: 12.53, fuente: 'MarketScreener, 15 analistas; EBITDA ajustado de 11.081 M menos 450 M de provisión de mantenimiento (estimación propia) [2]' },
      { periodo: '2027e', ingresos: null, ebitda: 12258, ebit: 11413, bpa: 18.76, dpa: 14.54, fuente: 'MarketScreener; EBITDA ajustado de 12.738 M menos 480 M de provisión (estimación propia) [2]' },
      { periodo: '2028e', ingresos: null, ebitda: 13730, ebit: 12857, bpa: 21.47, dpa: 17.26, fuente: 'MarketScreener; EBITDA ajustado de 14.250 M menos 520 M de provisión (estimación propia) [2]' },
    ],
    recomendaciones: { n_analistas: 15, comprar: null, mantener: null, vender: null, po_medio: 259.60, po_min: null, po_max: null },
    revisiones: null,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Baja',
  },
  bolsa: {
    tipo_rentabilidad: 'de precio (sin dividendos)',
    rentabilidades: [
      { periodo: 'En el año', accion_pct: -16.2, indice_pct: 3.9, sector_pct: -27.1 },
      { periodo: '1 año', accion_pct: -14.3, indice_pct: 8.4, sector_pct: -25.2 },
      { periodo: '3 años (anual.)', accion_pct: 10.8, indice_pct: 10.6, sector_pct: 2.9 },
      { periodo: '5 años (anual.)', accion_pct: 9.7, indice_pct: 4.8, sector_pct: 0.9 },
      { periodo: '10 años (anual.)', accion_pct: 6.1, indice_pct: 3.4, sector_pct: 3.8 },
    ],
    anual: [
      { anio: '2018', accion_pct: -7.9, indice_pct: -15.6 }, { anio: '2019', accion_pct: 50.7, indice_pct: 4.6 }, { anio: '2020', accion_pct: -9.0, indice_pct: 1.2 },
      { anio: '2021', accion_pct: 7.1, indice_pct: 20.9 }, { anio: '2022', accion_pct: 9.0, indice_pct: -9.0 }, { anio: '2023', accion_pct: 19.9, indice_pct: 18.4 },
      { anio: '2024', accion_pct: 0.1, indice_pct: -13.7 }, { anio: '2025', accion_pct: 36.0, indice_pct: 29.9 },
    ],
    beta: 1.1, volatilidad_pct: 29.6, max_drawdown_pct: -38.8, posicion_corta_pct: null,
    comentario: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: [
      { anio: '2018', precio_cierre: 93.65, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2019', precio_cierre: 141.14, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2020', precio_cierre: 128.39, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2021', precio_cierre: 137.51, ev_ebitda_ntm: null, per_ntm: null, excluir: true },
      { anio: '2022', precio_cierre: 149.82, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2023', precio_cierre: 179.59, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2024', precio_cierre: 179.76, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
      { anio: '2025', precio_cierre: 244.42, ev_ebitda_ntm: null, per_ntm: null, excluir: false },
    ],
    comentario: null, confianza: 'Media',
  },
  comparables: {
    criterio: null,
    empresas,
    comentario: null, confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-12', objetivo: 'OMA (29,99 %, con la serie BB y el contrato de asistencia técnica)', comprador: 'VINCI Airports (a Fintech)', ev: 82933, ev_ventas: 8.93, ev_ebitda: 12.5, prima_pct: null, excluir: false, comentario: '1.170 M USD por 115,8 M de acciones a 19,754 MXN/USD = 199,6 MXN por acción; valor empresa con la deuda neta de dic-2022 (5.856 M) sobre el EBITDA de 2022 (6.616 M) y los ingresos sin construcción (9.285 M); incluye prima de control [6, 10]' },
    ],
    comentario: null, confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones (5-10 con múltiplo)', tipo: 'Complemento', intentos: '1) 20-F de OMA (solo la compra de VINCI); 2) repositorio (Aena y Ferrovial: operaciones sin múltiplo publicado); 3) búsqueda de compras de aeropuertos con múltiplo (Gatwick, ANA, Heathrow): cifras de prensa sin la nota oficial', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'recomendaciones (desglose)', tipo: 'Complemento', intentos: '1) MarketScreener (solo media «Outperform»); 2) Investing (instantáneas contradictorias); 3) MarketBeat (datos del ADS de 2025)', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo del símbolo OMAB (API pública), enero-octubre de 2026', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://api.stocktwits.com/api/2/streams/symbol/OMAB.json' },
  { id: 2, titulo: 'Seeking Alpha, artículos y noticias de OMAB (RSS): «Expanding The Portfolio Coverage Into Mexican Airports» (9-oct-2026), «A World Cup Host, And Broader Bullish Outlook» (20-jun-2026), «I\'m Not Worried About Oil Prices» (13-mar-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-09', url: 'https://seekingalpha.com/symbol/OMAB' },
  { id: 3, titulo: 'OMA, controladora del aeropuerto de Acapulco y Monterrey, va a la BMV (opiniones de Valmex y Kapital sobre tráfico y costes)', editor: 'El Cronista México', tipo: 'Prensa', fecha: '2026-06-02', url: 'https://www.cronista.com/mexico/finanzas-economia/oma-controladora-del-aeropuerto-de-acapulco-y-monterrey-va-a-la-bmv-por-hasta-3000-millones/' },
  { id: 4, titulo: 'Resultados trimestrales OMA 2T26: «reporte mixto», implicación neutral', editor: 'Grupo Financiero Ve por Más', tipo: 'Analistas', fecha: '2026-07-28', url: 'https://estrategia.vepormas.com/wp-content/uploads/2026/07/Trimestral-OMA-2T26-2.pdf' },
];
const E = {
  _estado: 'completa',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits (OMAB)', fecha: '2026-07', n_comentarios: 30, tono: 'Dividido', resumen: 'Poco debate y mucho mensaje automático de opciones; tras los resultados de febrero se habló de «liquidación» de los tres grupos mexicanos y en abril de compras en la base del gráfico [1].' },
      { plataforma: 'Seeking Alpha (artículos de autores)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: 'Los autores siguen alcistas: el Mundial en Monterrey, márgenes récord y que el petróleo no rompe la tesis; el 9-oct se publicó una tesis de entrada en los aeropuertos mexicanos tras la caída [2].' },
      { plataforma: 'Prensa económica mexicana (opiniones de casas de bolsa)', fecha: '2026-06', n_comentarios: 4, tono: 'Negativo', resumen: 'Valmex y Kapital señalan la caída del tráfico de abril, la contracción de Monterrey y las presiones de costes del Plan Maestro 2026-2030 [3].' },
      { plataforma: 'Notas de casas de bolsa (B×+)', fecha: '2026-07', n_comentarios: 1, tono: 'Neutro', resumen: 'Resultados del 2T26 «mixtos», por debajo del consenso en EBITDA y beneficio por costes; implicación neutral [4].' },
    ],
    temas: [
      { tema: 'Tráfico y capacidad de Viva y Volaris (combustible, motores, fusión)', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos lo confirman: asientos −0,3 % en el 2T26 y septiembre −4,8 %; Viva (50 % del tráfico) cayó un 2 % en el 2T26 [1, 3].' },
      { tema: 'Valoración tras la caída del 29 % desde febrero', postura: 'Alcista', peso: 'Medio', contraste: 'El PER de los últimos 12 meses es de 14,6 veces, por debajo de su historia, pero con el beneficio creciendo un 3 % en el 1S26 [2].' },
      { tema: 'Mundial 2026 en Monterrey', postura: 'Alcista', peso: 'Bajo', contraste: 'No se vio en las cifras: el tráfico del 2T26 creció un 0,4 % y Monterrey cayó un 1,6 % [2].' },
      { tema: 'Costes del Plan Maestro y provisión de mantenimiento', postura: 'Bajista', peso: 'Medio', contraste: 'La provisión de mantenimiento se duplicó en el 1S26 (208 M frente a 104 M) [3, 4].' },
    ],
    lectura: null,
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};

guarda('A', A); guarda('B', B); guarda('C', C); guarda('D', D); guarda('E', E);
console.log('Notas A-E escritas;', empresas.length, 'comparables');
