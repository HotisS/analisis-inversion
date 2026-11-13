// Escribe las notas A-E de Rai Way S.p.A. (RWAY, corte 2026-11-13; rehecho desde el del 15-oct con 9M26, votos, remuneración, bolsa y consenso nuevos) a partir de los documentos de notas/docs
// (informes anuales 2022, 2024 y 2025, relación semestral y nota de resultados del 1S26, notas de FY2025, 9M25, 1T26 y 1S25,
// presentaciones de FY2025, 1S26 y plan 2024-27, nota sobre EI Towers, calendario 2026, resultado de la junta 2026),
// de bolsa.json y de páginas web leídas el 15-oct-2026. Sin XBRL: Rai Way no está en filings.xbrl.org (LEI 815600303CCB3CFD2264).
// Cada nota cita con [n] de su propia lista. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const bolsa = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const USD_EUR = 1.1081; // USD por EUR, BCE 12-nov-2026
const GBP_EUR = 0.83595; // GBP por EUR, BCE 12-nov-2026
const RW = 'https://www.raiway.it/it/documents/documenti-investitori';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Relazione Finanziaria Annuale 2025 (bilancio d’esercizio e relazione sulla gestione)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-07', url: `${RW}/bilanci-e-relazioni/2025/bilancio-e-relazione-sulla-gestione-al-31-dicembre-2025` },
  { id: 2, titulo: 'Comunicato: Rai Way approva il progetto di bilancio al 31 dicembre 2025 (cuentas resumidas FY24-FY25 y 4T)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-03-23', url: `${RW}/avvisi-e-comunicati/comunicati/2026/approvazione-del-progetto-di-bilancio-al-31-dicembre-2025` },
  { id: 3, titulo: 'Comunicato: Rai Way approva i risultati del primo semestre 2026 (cuentas 2T y 1S26, guía revisada)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RW}/avvisi-e-comunicati/comunicati/approvazione-della-relazione-semestrale-al-30-giugno-2026` },
  { id: 4, titulo: 'Relazione Finanziaria Annuale 2024 (cuentas NIIF 2024 y 2023)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2025-04-04', url: `${RW}/bilanci-e-relazioni/2024/bilancio-e-relazione-sulla-gestione-al-31-dicembre-2024` },
  { id: 5, titulo: 'Bilancio e Relazione sulla Gestione al 31 dicembre 2022 (cuentas NIIF 2022 y 2021)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2023-04-04', url: `${RW}/bilanci-e-relazioni/2022/bilancio-e-relazione-sulla-gestione-al-31-dicembre-2022` },
  { id: 6, titulo: 'Relazione Finanziaria Semestrale al 30 giugno 2026 (notas de deuda, posición financiera neta)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RW}/bilanci-e-relazioni/2026/relazione-finanziaria-semestrale-al-30-giugno-2026` },
  { id: 7, titulo: '1H 2026 Results Presentation (ingresos por cliente, capex, puente de deuda, guía)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RW}/presentazioni-ed-eventi/2026/1h2026/presentazione-risultati-1h2026` },
  { id: 8, titulo: 'Comunicati 1T26 (13-may-2026), 9M25 (13-nov-2025) y 1S25 (30-jul-2025): cuentas trimestrales', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-05-13', url: `${RW}/avvisi-e-comunicati/comunicati/2026/approvazione-del-resoconto-intermedio-di-gestione-al-31-marzo-2026` },
  { id: 9, titulo: '2025FY Results Presentation (capex, solar, centro de datos de Pomezia, ESG)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-03-23', url: `${RW}/presentazioni-ed-eventi/2026/fy/presentazione-risultati-2025fy` },
  { id: 10, titulo: '2023FY results and 2024-2027 Industrial Plan (objetivos financieros, historia del dividendo)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2024-03-26', url: `${RW}/presentazioni-ed-eventi/2024/2023/presentazione-piano-industriale-2024-27-e-risultati-2023fy.pdf` },
  { id: 11, titulo: 'Comunicato: Esiti dell’Assemblea degli Azionisti 2026 (dividendo de 0,33 EUR, autocartera de 3.495.579 acciones)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://www.raiway.it/it/documents/assemblee/assemblea-ordinaria-2026/comunicati/esiti-assemblea-degli-azionisti-2026.pdf' },
  { id: 12, titulo: 'Comunicato: Rai Way approva i risultati dei primi nove mesi 2026 (cuenta 3T y 9M, balance a 30-sep, flujos, guía confirmada)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-11', url: `${RW}/avvisi-e-comunicati/comunicati/2026/approvazione-del-resoconto-intermedio-di-gestione-al-30-settembre-2026` },
  { id: 13, titulo: '9M 2026 Results Presentation (ingresos por cliente y segmento, puente de EBITDA, energía, puente de deuda, guía 2026)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-11', url: `${RW}/presentazioni-ed-eventi/2026/9m-2026/presentazione-risultati-9m2026` },
];

// cuenta por naturaleza: coste_ventas = consumos de materiales; amortizaciones = amortizaciones y deterioros + provisiones (el EBITDA de la empresa las excluye)
const c = (periodo, ingresos, cv, amort, ebit, rf, bai, imp, bn, gf, nr, bpa, dpa, acc) => ({
  periodo, ingresos, coste_ventas: cv, gastos_generales: null, ebitda: Math.round((ebit + amort) * 10) / 10, amortizaciones: amort, ebit, resultado_financiero: rf, bai, impuestos: imp,
  minoritarios: 0, beneficio_neto: bn, gastos_financieros: gf, participadas_en_ebitda: null, no_recurrentes_en_ebitda: nr, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc,
});
const cuenta = [
  c('2021', 229.9, 1.5, 51.5, 91.1, -1.2, 89.9, 24.5, 65.4, 2.1, null, 0.2436, 0.2436, 268.37),
  c('2022', 245.4, 1.5, 47.2, 103.8, -2.1, 101.8, 28.1, 73.7, 2.1, null, 0.2746, 0.2745, 268.37),
  c('2023', 271.9, 1.3, 49.0, 126.0, -4.5, 121.5, 34.8, 86.7, 5.9, 5.3, 0.3231, 0.3222, 268.37),
  c('2024', 276.1, 1.3, 53.3, 131.9, -6.6, 125.4, 35.4, 89.9, 7.3, 0.3, 0.3348, 0.334, 268.5),
  c('2025', 282.8, 1.4, 57.2, 130.2, -5.8, 124.4, 35.7, 88.6, 6.2, 4.4, 0.33, 0.33, 268.5),
];
const bal = (periodo, at, ac, pc, pt, intg, inm, ex, cli, prov, caja, deuda, arr, pn, res) => ({
  periodo, activo_total: at, activo_corriente: ac, pasivo_corriente: pc, pasivo_total: pt, fondo_comercio: 0, intangibles: intg, inmovilizado_material: inm,
  existencias: ex, clientes: cli, proveedores: prov, activos_contrato: null, pasivos_contrato: null, caja, deuda_financiera: deuda, arrendamientos: arr, patrimonio_neto: pn, minoritarios: 0, reservas: res,
});
const balance = [
  bal('2021', 388.0, 90.4, 102.2, 222.1, 17.2, 244.5, 0.8, 67.8, 51.7, 17.8, 69.2, 36.5, 165.9, 64.4),
  bal('2022', 442.6, 106.2, 218.4, 266.4, 19.5, 280.8, 0.8, 66.2, 60.5, 36.7, 101.5, 40.1, 176.2, 73.7),
  bal('2023', 470.3, 111.3, 136.6, 281.6, 24.7, 297.4, 0.8, 74.8, 65.0, 34.4, 101.5, 37.8, 188.7, 86.7),
  bal('2024', 462.0, 91.3, 122.8, 269.6, 27.0, 306.0, 0.8, 75.1, 53.5, 13.5, 107.5, 33.6, 192.5, 90.3),
  bal('2025', 464.8, 86.6, 230.3, 272.8, 33.7, 304.0, 0.5, 74.0, 49.9, 9.3, 118.7, 27.1, 192.0, 89.3),
];
const flu = (periodo, fo, capex, arr, adq, des, div, int) => ({ periodo, flujo_operativo: fo, capex, pagos_arrendamientos: arr, adquisiciones: adq, desinversiones: des, dividendos: div, recompras: 0, emision_acciones: 0, intereses_en_financiacion: int });
const flujos = [
  flu('2021', 117.4, 84.0, 8.4, 1.0, 0.0, 64.0, 0.8),
  flu('2022', 137.0, 75.6, 9.0, 0, 0.0, 65.2, 1.1),
  flu('2023', 146.9, 57.4, 13.4, 0, 0.0, 73.8, 2.6),
  flu('2024', 132.3, 50.1, 16.6, 0, 0.0, 86.5, 4.7),
  flu('2025', 145.7, 51.4, 16.2, 0, 1.5, 89.7, 3.9),
];
const bpaT = (bn) => Math.round((bn / 268.5) * 10000) / 10000;

const A = {
  _estado: 'completo',
  negocio: {
    segmentos: [
      { nombre: 'Distribución de medios', descripcion: 'Red de difusión de televisión digital terrestre (TDT) y radio (FM y DAB+) para RAI, transmisión y servicios de red, red de distribución de contenidos (CDN) y difusión para emisoras terceras.', tipo_resultado: null, historico: [ { periodo: '2023', ingresos: 240.9, resultado: null }, { periodo: '2024', ingresos: 244.1, resultado: null }, { periodo: '2025', ingresos: 249.5, resultado: null } ] },
      { nombre: 'Infraestructuras digitales y otros', descripcion: 'Alquiler de espacio en torres a operadores móviles, de acceso inalámbrico fijo y radios privadas, conectividad sobre la fibra propia y centros de datos edge.', tipo_resultado: null, historico: [ { periodo: '2023', ingresos: 31.0, resultado: null }, { periodo: '2024', ingresos: 32.0, resultado: null }, { periodo: '2025', ingresos: 33.3, resultado: null } ] },
    ],
    geografias: [ { nombre: 'Italia', peso_pct: 100 } ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Ingresos de RAI (contrato de servicio y servicios nuevos)', valor_anterior: '232,3 M EUR (2024)', valor_actual: '237,4 M EUR (2025)', variacion: '+2,2 %', comentario: 'El 84,0 % de los ingresos de 2025; crecen por la indexación a la inflación y la extensión de la red DAB+ [1].' },
      { kpi: 'Ingresos de terceros', valor_anterior: '43,8 M EUR (2024)', valor_actual: '45,4 M EUR (2025); 35,5 M en 9M26 (+6,9 %)', variacion: '+3,7 %', comentario: 'Torres para operadores móviles y radios, CDN, centros de datos y conectividad; el alquiler de torres crece un 4,3 % en 9M26 [1, 13].' },
      { kpi: 'Cobertura de la red DAB+ de RAI (población)', valor_anterior: '56 % (inicio del plan)', valor_actual: '≈ 70 % (dic-2025)', variacion: '+14 pp', comentario: 'Principal inversión de desarrollo del negocio tradicional; cada extensión se factura a RAI como servicio nuevo [2].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '67,2 % (2024)', valor_actual: '67,8 % (2025); 67,7 % (9M26, 69,2 % en 9M25)', variacion: '+0,6 pp', comentario: 'Costes casi fijos frente a ingresos indexados; en 9M26 la tarifa eléctrica media subió a ≈ 228 EUR/MWh (≈ 204 en 2025) y restó 1,1 M [2, 13].' },
      { kpi: 'Generación de caja recurrente (definición de la empresa)', valor_anterior: '≈ 118 M EUR (2024)', valor_actual: '≈ 118 M EUR (2025); > 100 M en 9M26 (≈ 94 M en 9M25)', variacion: 'al alza', comentario: 'EBITDA ajustado − arrendamientos − intereses − impuestos − capex de mantenimiento recurrente [2, 12].' },
      { kpi: 'Capex de desarrollo', valor_anterior: '≈ 31 M EUR (2024)', valor_actual: '28,7 M EUR (2025); 18,4 M en 9M26 (11,2 M en 9M25)', variacion: '−7 %', comentario: 'DAB+, CDN, centros de datos edge y parques solares; el mantenimiento baja a 7,7 M en 9M26 (14,1 M en 9M25); el plan 2024-27 preveía 246 M acumulados [2, 10, 13].' },
    ],
    confianza: 'Alta',
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 287.7, ebitda: 186.6, ebit: 124.3, beneficio_neto: 84.3, bpa: 0.314, dpa: 0.33, dpa_extraordinario: 0, fcf: 93.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 5.5 },
    cambios_perimetro: [],
    comentario: 'Los ingresos core pasaron de 229,9 M EUR en 2021 a 282,8 M en 2025 (+5,3 % anual), todo orgánico: el salto de 2022-2023 (+6,7 % y +10,8 %) vino de la indexación del contrato de RAI a la inflación italiana de 2022 y de la reorganización de frecuencias (refarming) de la TDT; desde 2024 el crecimiento es del 1,5-2,5 % (indexación más DAB+ y terceros) [1, 4, 5]. El EBITDA publicado subió de 142,6 M a 187,4 M y el margen del 62,0 % al 66,3 % por el apalancamiento operativo: personal estable (≈ 600 personas) y energía como principal coste variable [1]. El EBIT dejó de crecer en 2025 (130,2 M, −1,3 %) y cae un 5,7 % en 9M26 (97,5 M) porque la amortización sube con la inversión de desarrollo (46,4 M en 9M26, +13 %; 57,2 M en 2025 frente a 49,0 M en 2023) [2, 12]. El beneficio neto fue de 88,6 M en 2025 (−1,4 %), de 66,3 M en 9M26 (−6,1 %) y de 84,3 M en los doce meses a septiembre de 2026 [12].',
    ajustes: 'Usamos cifras publicadas. La empresa da un EBITDA «ajustado» que excluye los no recurrentes: 5,3 M en 2023 (salidas voluntarias y la salida del anterior consejero delegado), 0,3 M en 2024, 4,4 M en 2025 (indemnización de ocupación del contrato inmobiliario con RAI pendiente de renovar, salidas voluntarias y asesores para operaciones extraordinarias) 1,9 M en el 1S26 y 2,9 M en 9M26 (contrato de arrendamiento con RAI registrado como gasto hasta su renovación, salidas voluntarias y costes de operaciones corporativas) [1, 3, 4, 13]. Los registramos en no_recurrentes_en_ebitda, aunque una parte (salidas voluntarias) se repite casi cada año. Otros ingresos incluyen plusvalías por venta de inmuebles (1,5 M en el 1S25) y créditos fiscales [1]. El EBITDA del informe incluye provisiones y deterioros financieros en la línea de amortizaciones para que EBITDA − amortizaciones = EBIT publicado.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 69.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 43.4, margen_ebitda_pct: 62.4, bpa: bpaT(19.4), vs_consenso: null },
      { periodo: '1T25', ingresos: 70.0, crecimiento_pct: 1.6, crecimiento_organico_pct: 1.6, ebitda: 46.9, margen_ebitda_pct: 67.0, bpa: bpaT(22.6), vs_consenso: null },
      { periodo: '2T25', ingresos: 70.3, crecimiento_pct: 2.3, crecimiento_organico_pct: 2.3, ebitda: 49.4, margen_ebitda_pct: 70.3, bpa: bpaT(24.7), vs_consenso: null },
      { periodo: '3T25', ingresos: 70.9, crecimiento_pct: 2.9, crecimiento_organico_pct: 2.9, ebitda: 49.8, margen_ebitda_pct: 70.2, bpa: bpaT(23.4), vs_consenso: null },
      { periodo: '4T25', ingresos: 71.6, crecimiento_pct: 2.9, crecimiento_organico_pct: 2.9, ebitda: 45.7, margen_ebitda_pct: 63.8, bpa: bpaT(18.0), vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 71.9, crecimiento_pct: 2.7, crecimiento_organico_pct: 2.7, ebitda: 47.3, margen_ebitda_pct: 65.8, bpa: bpaT(21.6), vs_consenso: 'En línea' },
      { periodo: '2T26', ingresos: 72.0, crecimiento_pct: 2.4, crecimiento_organico_pct: 2.4, ebitda: 49.4, margen_ebitda_pct: 68.6, bpa: bpaT(22.5), vs_consenso: 'Superior' },
      { periodo: '3T26', ingresos: 72.2, crecimiento_pct: 1.8, crecimiento_organico_pct: 1.8, ebitda: 49.6, margen_ebitda_pct: 68.7, bpa: bpaT(22.2), vs_consenso: null },
    ],
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [ { anio: '2026-2027 (corriente)', importe: 40.9 }, { anio: '2028', importe: 106.9 } ],
    liquidez: 'Caja (con activos financieros corrientes) de 2,5 M EUR a 30-sep-2026; deuda bruta de 137,7 M: 106,9 M no corriente (préstamo sindicado de Mediobanca, BPER, UniCredit y CDP, vencimiento prorrogado al 21-abr-2028 y reclasificado a largo plazo) y 30,8 M corriente (línea revolving de 42 M) [6, 12, 13].',
    rating: 'Sin rating',
    coste_deuda_pct: 4.0,
    vida_media_anios: 1.3,
    otros_pasivos: 'Pasivos por arrendamiento de 26,7 M EUR (terrenos y espacios de los emplazamientos, fibra en derecho de uso) incluidos en la deuda neta publicada [3, 6]. Beneficios a empleados (TFR) de 8,0 M y provisiones de 18,8 M (no corrientes 16,2 M, sobre todo desmantelamiento de emplazamientos y litigios) [3]. Sin garantías ni deuda fuera de balance relevante; el préstamo sindicado vence en abril de 2028, dos meses antes del primer vencimiento del contrato de servicio con RAI (30-jun-2028) [1, 6].',
    comentario: 'La deuda neta con arrendamientos pasó de 105 M EUR a fines de 2023 a 136,5 M en 2025, 167,9 M en junio de 2026 (tras pagar 88,6 M de dividendo en mayo) y 160,9 M en septiembre: 0,84 veces el EBITDA ajustado [3, 12, 13]. El aumento no es operativo: la empresa reparte el 100 % del beneficio y financia con deuda la inversión de desarrollo (28,7 M en 2025). El circulante comercial se mantiene en torno al 8-9 % de los ingresos, con RAI como deudor de la mayor parte de los 74 M de clientes [1]. La refinanciación de abril de 2028 es la próxima cita; el apalancamiento deja margen para la inversión del plan, no para un centro de datos hiperescala propio sin socio.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo subió de 117,4 M EUR en 2021 a 145,7 M en 2025; tras capex (51,4 M), arrendamientos (16,2 M) e intereses (3,9 M) quedan 74 M de caja libre, el 84 % del beneficio neto [1, 2]. El capex se dividió en 2025 en 23,4 M de mantenimiento (por encima del nivel recurrente del ≈ 6 % de los ingresos por obras extraordinarias en torres y la renovación cíclica de la red IP) y 28,7 M de desarrollo (DAB+, CDN, centros de datos edge) [2]. En 2021-2022 el capex fue de 75-84 M por el refarming de la TDT, que RAI pagó con tarifas nuevas. La caja libre no cubre el dividendo (89,7 M en 2025): la diferencia, ≈ 15 M al año, se financia con deuda mientras dure la inversión de desarrollo.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'EY S.p.A. (encargo 2023-2031)',
    anios_auditor: 3,
    opinion: 'Favorable, sin salvedades [1]',
    comentario: 'Contabilidad sencilla de una empresa de infraestructuras: ingresos por contrato con RAI reconocidos de forma lineal, sin fondo de comercio y con la amortización de las torres y equipos como principal estimación [1]. Hay tres puntos a vigilar. Uno: el EBITDA «ajustado» excluye cada año algún coste de salidas voluntarias (5,3 M en 2023, parte de 4,4 M en 2025), que es casi recurrente. Dos: en 2025 un contrato de arrendamiento con RAI vencido se registró como gasto operativo (indemnización de ocupación) en vez de amortización, y la empresa lo saca del EBITDA ajustado [1, 3]. Tres: la empresa capitaliza costes de personal en los proyectos (6,3 M en 2024) [4]. Ninguno cambia la lectura. Los indicadores del motor (Altman, Piotroski y Beneish) se comentan en la síntesis.',
    senales: [
      { senal: 'Dependencia de la sociedad dominante como cliente', nivel: 'Media', comentario: 'El 84 % de los ingresos y la mayor parte de los créditos comerciales son de RAI, que además controla el 64,97 % del capital [1].' },
      { senal: 'No recurrentes que se repiten', nivel: 'Baja', comentario: 'Salidas voluntarias en 2023, 2025 y 2026; se tratan como no recurrentes en el EBITDA ajustado [1, 3].' },
      { senal: 'Personal capitalizado', nivel: 'Baja', comentario: '6,3 M EUR en 2024 frente a 4,9 M en 2023, ligado a la inversión de desarrollo [4].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Reparto de en torno al 100 % del beneficio neto (99,7 % en 2023; 0,33 EUR por acción con cargo a 2025, 88,6 M) y unos 350 M de dividendos acumulados en 2024-2027 según el plan [2, 10]. Autorización de la junta para recomprar hasta el 10 % del capital durante 18 meses, sin uso desde 2020 (autocartera del 1,29 %) [2, 11]. El plan 2024-27 prevé 246 M de capex de desarrollo acumulado (138 M en diversificación: hiperescala ≈ 77 M, edge ≈ 40 M, CDN ≈ 21 M; DAB+ y solar en el resto) y deuda neta de hasta 1,4 veces el EBITDA en 2027 [10].',
    adquisiciones: [
      { anio: '2021', objetivo: 'Rama de actividad (ramo d’azienda) adquirida', importe: 1.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Irrelevante en tamaño [5].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'negocio', campo: 'resultado por segmento', tipo: 'Complemento', intentos: '1) nota de segmentos del informe anual 2025 (solo ingresos); 2) presentación de FY2025 (EBITDA total); 3) presentación del 1S26 (puente de EBITDA sin reparto por segmento)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'segmentos 2021-2022', tipo: 'Complemento', intentos: '1) informe anual 2022 (sin esta segmentación); 2) plan 2024-27 (solo 2023); 3) informe anual 2024 (2023-2024)', decision: 'Omitido' },
    { seccion: 'financieros', campo: 'no recurrentes de 2021 y 2022', tipo: 'Complemento', intentos: '1) informe anual 2022 (cuenta NIIF sin desglose); 2) plan 2024-27 (EBITDA ajustado en gráfico, ≈ igual al publicado); 3) comunicados de 2022-2023 no descargados', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Ficha sectorial corta: torres de emisión y difusión en Italia', editor: 'Este repositorio (sectores/torres-emision-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/torres-emision-2026-10-15.md' },
  { id: 2, titulo: '2023FY results and 2024-2027 Industrial Plan: análisis de mercado (audiencia de TV, radio, torres de telecomunicaciones, centros de datos)', editor: 'Rai Way S.p.A. (fuentes: Ampere, PQ Media, TowerXchange, Berenberg, S&P)', tipo: 'Primaria', fecha: '2024-03-26', url: `${RW}/presentazioni-ed-eventi/2024/2023/presentazione-piano-industriale-2024-27-e-risultati-2023fy.pdf` },
  { id: 3, titulo: 'Relazione Finanziaria Annuale 2025: riesgos (contrato de servicio, concesión de RAI, frecuencias), mercado y actividad comercial', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-07', url: `${RW}/bilanci-e-relazioni/2025/bilancio-e-relazione-sulla-gestione-al-31-dicembre-2025` },
  { id: 4, titulo: '1H 2026 Results Presentation: demanda de centros de datos edge (Altman Solon, jul-2025) y crecimiento externo', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RW}/presentazioni-ed-eventi/2026/1h2026/presentazione-risultati-1h2026` },
  { id: 5, titulo: 'Rai Way: commento ai risultati 2025 di EI Towers (ingresos 266,9 M, EBITDA ajustado 155,9 M, deuda neta 618,6 M)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-05-18', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-commento-ai-risultati-2025-di-ei-towers/' },
  { id: 6, titulo: 'INWIT, Cellnex, American Tower, SBA, Crown Castle y Helios Towers: estadísticas (márgenes, ROIC, deuda)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/bit/INW/statistics/' },
  { id: 7, titulo: 'Comunicato: Il CdA prende atto della comunicazione di RAI sulla scadenza del MoU con F2i y MFE (fusión con EI Towers)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-02', url: `${RW}/avvisi-e-comunicati/comunicati/2026/2026-07-02-rai-way-comunicato-stampa-per-pubblicazione.pdf` },
  { id: 9, titulo: 'Prezzi al consumo, dati provvisori ottobre 2026 (NIC +5,4 %)', editor: 'Istat', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dati-provvisori-ottobre-2026/' },
  { id: 10, titulo: '9M 2026 Results Presentation (tarifas eléctricas y guía)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-11', url: `${RW}/presentazioni-ed-eventi/2026/9m-2026/presentazione-risultati-9m2026` },
  { id: 8, titulo: '2025FY Results Presentation: proyecto solar (≈ 40 MW, 32 M de capex, ≈ 4 M de EBITDA) y centro de datos hiperescala de Pomezia (35,2 MW)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-03-23', url: `${RW}/presentazioni-ed-eventi/2026/fy/presentazione-risultati-2025fy` },
];
const B = {
  _estado: 'completo',
  historia: {
    resumen: 'Rai Way nació en 2000 como sociedad de la red de transmisión de RAI, a la que RAI aportó torres, equipos y personal, y salió a bolsa en noviembre de 2014 a 2,95 EUR por acción con RAI conservando el 65 % [1, 3]. En 2015 EI Towers (entonces de Mediaset) lanzó una OPA que dependía de que RAI vendiera, y fracasó. Desde 2014 ha repartido casi toda su capitalización de salida en dividendos [8]. El refarming de frecuencias de la TDT (2020-2022) y la red DAB+ de RAI financiaron una década de crecimiento contractual. Un decreto de 2022 permitió a RAI bajar al 30 %, y en diciembre de 2024 RAI, F2i y MFE firmaron un memorando para fusionarla con EI Towers, que expiró el 1-jul-2026 sin acuerdo [7]. El plan 2024-27 apuesta por diversificar hacia centros de datos, CDN y energía solar.',
    hitos: [
      { anio: '2000', hito: 'Constitución de Rai Way como sociedad de la red de difusión de RAI.' },
      { anio: '2014', hito: 'Salida a bolsa (19-nov) a 2,95 EUR; RAI mantiene el 65 %.' },
      { anio: '2015', hito: 'OPA de EI Towers, que fracasa sin la adhesión de RAI.' },
      { anio: '2020', hito: 'Recompra de acciones propias por 20 M EUR; refarming de la TDT (liberación de la banda de 700 MHz para el 5G).' },
      { anio: '2022', hito: 'DPCM que permite a RAI bajar hasta el 30 % del capital.' },
      { anio: '2024', hito: 'Plan 2024-27 (diversificación: centros de datos, CDN, solar) y memorando no vinculante RAI-F2i-MFE para la fusión con EI Towers (19-dic).' },
      { anio: '2026', hito: 'Expira el memorando sin acuerdo (1-jul); nuevo presidente (Enrico Mordillo) y licencia del centro de datos hiperescala de Pomezia.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Rai Way es el operador de la red de difusión de radio y televisión de RAI, el servicio público italiano: más de 2.300 emplazamientos, una red de radioenlaces, sistemas por satélite, unos 6.000 km de fibra propia, una CDN propia, una red de centros de datos edge y tres centros de control, con unos 600 empleados [3]. Vende tres cosas. A RAI, la difusión de sus múltiplex de TDT y de sus redes de radio (FM y DAB+), con mantenimiento y nivel de servicio garantizado, bajo un contrato de servicio a largo plazo. A operadores móviles, de acceso fijo inalámbrico y emisoras privadas, espacio en sus torres. Y a empresas y emisoras, servicios nuevos: distribución de contenidos por internet (CDN), conectividad y alojamiento en centros de datos regionales [3, 4].',
    como_gana_dinero: 'El 84 % de los ingresos son de RAI y casi todos son fijos: un canon anual por la red, indexado a la inflación italiana, más tarifas por servicios nuevos (cada ampliación de la red DAB+ suma ingresos) [3]. Los costes son casi fijos: personal (≈ 50 M EUR) y energía (el principal coste variable: cada 10 EUR/MWh de precio mayorista mueven ≈ 0,7 M el EBITDA) [4]. Por eso el margen EBITDA ronda el 67 % y cada punto de inflación indexada se convierte casi entero en beneficio. El negocio de terceros (torres para operadores móviles, ≈ 45 M) crece con contratos plurianuales. La diversificación (CDN, centros de datos, solar) aún aporta menos de 1 M de EBITDA neto y absorbe ≈ 2,5 M de costes al semestre [4].',
    clientes: 'Concentración extrema: RAI aporta el 84,0 % de los ingresos de 2025 (237,4 M EUR) [3]. El contrato de servicio vence el 30-jun-2028 y se renueva tácitamente por siete años, hasta 2035, salvo denuncia; RAI puede rescindirlo sin causa, con penalización hasta junio de 2028 y sin ella después, y también si pierde la concesión (que vence en abril de 2027) o las frecuencias (2032) [3]. El resto son operadores móviles con contratos plurianuales de torres, emisoras de radio y TV locales y clientes de CDN. El poder de precios está demostrado con RAI: la indexación a la inflación trasladó la inflación de 2022-2023 a los ingresos (+10,8 % en 2023) [1].',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Mercado relevante: infraestructuras de difusión de radio y televisión en Italia (torres, transmisores y servicios de red para emisoras), con dos operadores nacionales, Rai Way (red de RAI) y EI Towers (red de Mediaset y de otras emisoras), más un segmento de torres de telecomunicaciones que comparten con INWIT, Cellnex y las torres propias de los operadores [1, 2]. Usamos como tamaño la suma de ingresos de los dos operadores de difusión (≈ 550 M EUR en 2025), porque no hay estadística oficial del mercado mayorista de difusión.',
    tamano: '≈ 550 M EUR en 2025 (Rai Way 282,8 M + EI Towers 266,9 M) [1, 5]',
    unidad_serie: 'millones de EUR (ingresos de Rai Way y EI Towers)',
    serie: [ { anio: '2024', tamano: 551 }, { anio: '2025', tamano: 550 } ],
    tcac_historico_pct: 1.0,
    tcac_previsto_pct: 1.0,
    cr5_pct: 95,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Indexación de los contratos a la inflación', efecto: '+', horizonte: 'Cíclico', evidencia: 'Ingresos de RAI +10,8 % en 2023 tras la inflación de 2022; +0,9 % en 2024 con la inflación baja [1]. El IPC italiano de octubre de 2026 subió un 5,4 % (energía +31 %) [9].' },
      { driver: 'Extensión de la radio digital DAB+', efecto: '+', horizonte: 'Estructural', evidencia: 'Cobertura de RAI del 56 % al 70 % de la población entre 2024 y 2025 [1].' },
      { driver: 'Paso de la TV lineal a la distribución por internet', efecto: '−', horizonte: 'Estructural', evidencia: 'Audiencia de TV de −1 % anual 2018-2023 según Ampere/PQ Media; la TDT sigue siendo la plataforma con más audiencia en Italia [2].' },
      { driver: 'Demanda de centros de datos regionales de baja latencia', efecto: '+', horizonte: 'Estructural', evidencia: 'Demanda empresarial de ≈ 240 MW en 2024 a ≈ 450 MW en 2035 en Italia (Altman Solon) [4].' },
      { driver: 'Precio de la electricidad', efecto: '+/−', horizonte: 'Cíclico', evidencia: '±0,7 M EUR de EBITDA por cada 10 EUR/MWh; tarifa media de 2025 ≈ 204 EUR/MWh, de 9M26 ≈ 228 y futuros del 4T26 ≈ 250 [4, 10].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 1, justificacion: 'Dos redes nacionales de difusión, cada una ligada a su gran cliente (RAI y Mediaset); no compiten por esos contratos.' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'RAI es a la vez el 84 % de los ingresos y el accionista de control; renegocia en 2028.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Energía (precio de mercado) y fabricantes de transmisores; los terrenos de los emplazamientos son en parte propios.' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Replicar 2.300 emplazamientos con licencias es inviable; la entrada real es la sustitución tecnológica.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Streaming por banda ancha y 5G broadcast pueden sustituir a la TDT a largo plazo; las frecuencias de RAI vencen en 2032.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El negocio no es cíclico: en 2020 los ingresos crecieron y en 2022-2023 la indexación protegió de la inflación (+10,8 % de ingresos en 2023) [1]. El ciclo que importa es el de la tecnología de difusión: la TDT está en su fase madura, con la radio DAB+ todavía en expansión, y el próximo cambio relevante es el vencimiento de las frecuencias de RAI en 2032 [3].' },
    regulacion: 'La concesión de servicio público de RAI vence el 30-abr-2027 y el contrato de servicio RAI-Ministerio cubre 2023-2028 [3]. El DPCM de 2022 (modificado en mayo de 2024) permite a RAI bajar al 30 % de Rai Way; el Estado mantiene poderes especiales (golden power) sobre la red [3]. Las frecuencias de TDT de RAI vencen en 2032. La política europea de la banda UHF (por debajo de 700 MHz reservada a la difusión hasta 2030) es la que decide el horizonte de la TDT.',
    tendencias: 'El consumo de vídeo se desplaza hacia el streaming y la TV conectada, que se distribuye por CDN y no por torres: Rai Way intenta capturarlo con su propia CDN (cliente RAI y emisoras locales) [3]. La radio pasa a DAB+, que exige redes nuevas. Los centros de datos regionales de baja latencia son la apuesta de diversificación, con interés inicial ligado a la inferencia de IA [4]. Gana si la diversificación rinde; pierde si la TDT se apaga antes de 2035.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 51,
    posicion: '1.º de 2 operadores nacionales de difusión en Italia por ingresos (≈ 51 % frente a EI Towers); en torres de telecomunicaciones es un actor menor frente a INWIT y Cellnex.',
    competidores: [
      { nombre: 'EI Towers', pais: 'Italia', ticker: null, ingresos: 266.9, cuota_pct: 49, margen_ebit_pct: null, comentario: 'Red de difusión de Mediaset y emisoras privadas; 60 % F2i y 40 % MFE; EBITDA ajustado de 155,9 M (58,4 %) y deuda neta de 618,6 M en 2025 [5].' },
      { nombre: 'INWIT', pais: 'Italia', ticker: 'INW', ingresos: 1072, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor torrera de telecomunicaciones italiana (TIM y Vodafone); margen EBITDA del 71 % [6].' },
      { nombre: 'Cellnex Telecom', pais: 'España', ticker: 'CLNX', ingresos: 4230, cuota_pct: null, margen_ebit_pct: null, comentario: 'Torres de telecomunicaciones en Europa, con red en Italia; también difusión en España [6].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'No hay efecto de red: el valor es la cobertura física de la red.' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'RAI no puede cambiar de red sin construir otra o pasar a la de su competidor directo (Mediaset); contrato hasta 2028 renovable a 2035 [3].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Emplazamientos con licencias y servidumbres difíciles de replicar; condición de operador único de la red pública [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Margen EBITDA del 67,8 % frente al 58,4 % de EI Towers [1, 5].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mercado que solo sostiene dos redes nacionales [1].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable. La renegociación del contrato con RAI en 2028: RAI tiene presión de ingresos (el canon se bajó a 70 EUR en 2024 y volvió a 90) y es a la vez cliente y accionista [3]. La sustitución de la TDT por la distribución por internet a partir de 2032-2035, cuando vencen las frecuencias y la renovación tácita del contrato. Y una fusión con EI Towers en términos que favorezcan a RAI y no al minoritario. El foso es estrecho porque depende de un contrato, no de la libre elección de muchos clientes.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [
      { agencia: 'MSCI', calificacion: 'A', fecha: '2025-12' },
      { agencia: 'CDP (clima)', calificacion: 'A-', fecha: '2025-12' },
      { agencia: 'Sustainalytics', calificacion: '12 (riesgo bajo)', fecha: '2025-12' },
      { agencia: 'S&P Global CSA', calificacion: '46/100', fecha: '2024-12' },
    ],
    materialidad: 'El asunto ESG con efecto en las cifras es la energía: Rai Way consumió unos 62.000 MWh de electricidad renovable comprada en 2025 y la energía es su mayor coste variable [3]. El proyecto solar (≈ 40 MW en ocho emplazamientos propios, 32 M de inversión, ≈ 4 M de EBITDA en régimen) reduce esa exposición [8]. En 2025 alcanzó la neutralidad de carbono en alcance 1 y 2 con créditos de carbono y presentó objetivos SBTi [8]. El segundo asunto es el servicio público: la red garantiza la cobertura del servicio público de RAI, con obligaciones de nivel de servicio [3].',
    controversias: 'Sin sanciones ni litigios relevantes en los últimos tres años en el informe anual 2025 [3]. La única controversia es de gobierno: la injerencia política en los nombramientos de RAI, que retrasó en 2024-2025 las decisiones sobre la fusión con EI Towers.',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño oficial del mercado de difusión (estadística de AGCOM)', tipo: 'Complemento', intentos: '1) informe anual de Rai Way 2025 (sin tamaño de mercado); 2) plan 2024-27 (audiencia, radio y torres, no difusión mayorista); 3) prensa sectorial (solo ingresos de las dos empresas)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'competencia', campo: 'margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) resultados de EI Towers (solo EBITDA ajustado en Websim); 2) Stock Analysis (margen EBITDA de INWIT y Cellnex); 3) informes anuales no descargados', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Comunicato: Esiti dell’Assemblea degli Azionisti 2026 (consejo 2026-2028, listas, independencia, retribución)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://www.raiway.it/it/documents/assemblee/assemblea-ordinaria-2026/comunicati/esiti-assemblea-degli-azionisti-2026.pdf' },
  { id: 2, titulo: 'Relazione Finanziaria Annuale 2025: órganos sociales, accionariado, dirección y coordinación de RAI', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-07', url: `${RW}/bilanci-e-relazioni/2025/bilancio-e-relazione-sulla-gestione-al-31-dicembre-2025` },
  { id: 3, titulo: 'Rai Way, Cecatto confermato al vertice: Mordillo nuovo presidente', editor: 'CorCom (Corriere Comunicazioni)', tipo: 'Prensa', fecha: '2026-04-29', url: 'https://www.corrierecomunicazioni.it/digital-economy/rai-way-cecatto-confermato-al-vertice-mordillo-nuovo-presidente/' },
  { id: 4, titulo: '2023FY results and 2024-2027 Industrial Plan (objetivos 2027 y guía 2024)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2024-03-26', url: `${RW}/presentazioni-ed-eventi/2024/2023/presentazione-piano-industriale-2024-27-e-risultati-2023fy.pdf` },
  { id: 5, titulo: 'Comunicato FY2025 y comunicato 1S26 (guía 2025, 2026 y su revisión)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-07-30', url: `${RW}/avvisi-e-comunicati/comunicati/approvazione-della-relazione-semestrale-al-30-giugno-2026` },
  { id: 6, titulo: 'Rai Way - Il Piano della Rai: urgenza di chiudere operazione RWAY-EIT o collocare quota RWAY', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2025-11-03', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-piano-rai-urgenza-di-chiudere-operazione-rway--eit-o-collocare-quota-rway-20251103071515/' },
  { id: 7, titulo: 'Rendiconto sintetico delle votazioni, Assemblea ordinaria del 28-apr-2026', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-28', url: 'https://www.raiway.it/it/documents/assemblee/assemblea-ordinaria-2026/documenti/rendiconto-sintetico-votazioni-per-pubblicazione.pdf' },
  { id: 8, titulo: 'Report on the Remuneration Policy and remuneration paid (2026)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-04-07', url: 'https://www.raiway.it/en/documents/remunerazione/report-on-the-remuneration-policy-and-remuneration-paid-2026.pdf' },
  { id: 9, titulo: 'Internal Dealing: comunicaciones publicadas (la última, feb-2025)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-13', url: 'https://www.raiway.it/it/corporate-governance/internal-dealing' },
  { id: 10, titulo: 'Rai Way - Rai punta al pareggio, resta aperta la cessione della quota (la deuda prevista de RAI a fin de 2026 incluye la venta del 15 %)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-10-01', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-rai-punta-al-pareggio/' },
  { id: 11, titulo: 'Rai Way - Riforma RAI in stallo, possibile rinvio del rinnovo del CdA', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-11-03', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-riforma-rai-in-stallo-possibile-rinvio-del-rinnovo-del-cda/' },
  { id: 12, titulo: 'Comunicato y presentación de 9M26 (guía 2026 confirmada; prioridades: crecimiento externo, cristalizar la diversificación, optimizar la estructura financiera)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-11', url: `${RW}/presentazioni-ed-eventi/2026/9m-2026/presentazione-risultati-9m2026` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Roberto Cecatto', cargo: 'Consejero delegado y director general', desde: '2023', participacion_pct: null, trayectoria: 'Ingeniero, directivo de RAI con carrera en tecnología y producción; consejero delegado desde 2023 y confirmado en abril de 2026 para 2026-2028 [1, 3]. Ha cumplido o mejorado la guía de EBITDA de 2024, 2025 y 2026 [5].' },
      { nombre: 'Adalberto Pellegrino', cargo: 'Director financiero y responsable de la información contable', desde: null, participacion_pct: null, trayectoria: 'Firma como dirigente preposto los comunicados de 2025-2026 [5].' },
      { nombre: 'Enrico Mordillo', cargo: 'Presidente (no ejecutivo)', desde: '2026', participacion_pct: null, trayectoria: 'Director de tecnología (CTO) de RAI; propuesto por RAI y nombrado en la junta del 28-abr-2026 en sustitución de Giuseppe Pasciucco [1, 3].' },
      { nombre: 'Giancarlo Benucci', cargo: 'Director de desarrollo corporativo', desde: null, participacion_pct: null, trayectoria: 'Lleva la diversificación (centros de datos, CDN) y las operaciones corporativas; ponente en la presentación del 1S26 [5].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'EBITDA ajustado al alza pese a costes de infraestructura nueva y sin crédito fiscal de energía [4]', real: '185,6 M EUR (+2,9 %)', cumplida: 'Sí' },
      { anio: '2025', guia: 'EBITDA ajustado estable o algo mejor', real: '191,8 M EUR (+3,3 %), «por encima de lo esperado a principios de año» [5]', cumplida: 'Sí' },
      { anio: '2026', guia: 'EBITDA ajustado estable (marzo); al alza en julio (≈ +4 M sin el precio de la energía); confirmada el 11-nov: ≈ +4 M a energía constante y «en línea con 2025» con la energía real [5, 12]', real: '146,3 M en 9M26 (+0,2 %)', cumplida: 'Parcial' },
      { anio: '2027 (plan)', guia: 'Ingresos core de 316 M y EBITDA ajustado de 207 M en 2027; dividendos de ≈ 350 M en 2024-2027 [4]', real: 'Ritmo de 2026: ≈ 290 M de ingresos y ≈ 193 M de EBITDA ajustado; los proyectos de diversificación van con retraso', cumplida: 'No' },
    ],
    comentario: 'Equipo técnico y estable, que cumple la guía anual de EBITDA y controla los costes, pero que no controla las decisiones que más pesan: la fusión con EI Towers, la venta de una parte del capital y el precio del contrato las decide RAI [2, 6]. El plan 2024-27 no se cumplirá en la parte de diversificación (el centro de datos hiperescala aún busca clientes y el solar se retrasa a 2028 por las licencias). La renovación del consejo en abril de 2026 confirmó al consejero delegado por tres años, lo que da continuidad.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Enrico Mordillo', cargo: 'Presidente', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Roberto Cecatto', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
      { nombre: 'Monica Caccavelli', cargo: 'Consejera', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Romano Ciccone', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración y nombramientos (2023-2025)' },
      { nombre: 'Barbara Morgante', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración y nombramientos (2023-2025)' },
      { nombre: 'Gian Luca Petrillo', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Control y riesgos (2023-2025)' },
      { nombre: 'Greta Tellarini', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Maria Cristina Vismara', cargo: 'Consejera', tipo: 'Independiente', desde: '2026', comisiones: null },
      { nombre: 'Salvatore Sardo', cargo: 'Consejero (lista de minoría de gestoras)', tipo: 'Independiente', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: true, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 85.7, voto_remuneracion_contra_pct: 14.2, voto_remuneracion_contra_libre_pct: 65.3, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 0.52, fijo: 0.36, variable_corto: 0.15, variable_largo: 0, ratio_salario_medio: 10 },
    remuneracion: 'El consejero delegado y director general cobró 0,52 M EUR en 2025: 0,36 M fijos (0,26 M como director general y 0,10 M como consejero y consejero delegado) y 0,15 M de variable anual, unas 10 veces el salario medio de la plantilla (52.502 EUR) [8]. El variable anual pesa el EBITDA ajustado (50 % de los objetivos cuantitativos, corregido por el precio de la energía), los ingresos de terceros (10 %) y la diversificación (15 %); el plan de acciones 2024-2026 mide el TSR relativo frente a 13 utilities e infraestructuras italianas (65 %), el beneficio neto ajustado acumulado (15 %) y la sostenibilidad, con cláusula de recuperación [8]. La política de 2026 obtuvo el 85,7 % a favor y el 14,2 % en contra; como RAI (64,97 %) vota a favor, el voto en contra del capital libre presente fue de ≈ 65 % (32,1 M de 49,1 M de acciones) [7]: los minoritarios la rechazaron. La segunda sección (pagos de 2025) pasó con el 99,85 % [7].',
    accionistas: [
      { nombre: 'RAI - Radiotelevisione Italiana S.p.A.', pct: 64.97, tipo: 'Control (Ministerio de Economía a través de RAI)', variacion: 'Sin cambios; el DPCM permite bajar al 30 %' },
      { nombre: 'Autocartera', pct: 1.29, tipo: 'Autocartera', variacion: '3.495.579 acciones' },
      { nombre: 'Gestoras de la lista de minoría (conjunto)', pct: 2.2, tipo: 'Institucional', variacion: 'Presentaron lista en 2026' },
      { nombre: 'Capital flotante', pct: 33.74, tipo: 'Flotante', variacion: '' },
    ],
    insiders: [],
    control_y_defensas: 'RAI controla el 64,97 % y ejerce dirección y coordinación (artículos 2497 y siguientes del Código Civil): nombra ocho de nueve consejeros, al presidente y al consejero delegado, y es el cliente del 84 % de los ingresos [1, 2]. Es la mayor operación vinculada posible: el contrato de servicio, el arrendamiento de inmuebles de RAI (vencido en 2025 y en renovación) y los servicios que RAI presta a Rai Way pasan por el procedimiento de operaciones vinculadas. El Estado conserva poderes especiales sobre la red y un decreto fija un mínimo del 30 % para RAI [2, 6]. La minoría tiene un consejero independiente por voto de lista. No hay clases de acciones ni blindajes estatutarios.',
    alertas: [
      'RAI es a la vez accionista de control y cliente del 84 % de los ingresos: el precio del contrato de 2028 lo negocia con una filial que controla.',
      'Riesgo de colocación (overhang): RAI estudió vender un 10-15 % (bloqueado por el Ministerio en 2024) y, sin la fusión, sigue con la opción abierta [6, 10].',
      'Cambio de presidente en abril de 2026 (Pasciucco por Mordillo, CTO de RAI) [1].',
      'La política de remuneración de 2026 la rechazó ≈ 65 % del capital libre presente en la junta (14,2 % en contra del total) [7].',
      'RAI no ha decidido sobre la venta del 15 % excedente: su previsión de deuda de fin de 2026 la incluye (≈ 170-185 M EUR a precios de mercado) y la reforma de RAI está bloqueada [10, 11].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
      ],
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de RWAY.MI, FTSEMIB.MI y EXV2.DE (hasta el 11-nov-2026; cierres de cada ejercicio, betas, volatilidad)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-11-11', url: 'https://finance.yahoo.com/quote/RWAY.MI/history' },
  { id: 2, titulo: 'Rai Way S.p.A.: previsiones anuales 2026-2028 (ingresos, EBITDA, EBIT, BPA, dividendo) a 15-oct-2026 (página de MarketScreener bloqueada el 13-nov)', editor: 'MarketScreener', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://in.marketscreener.com/quote/stock/RAI-WAY-S-P-A-18578978/finances/' },
  { id: 3, titulo: 'RWAY.MI quoteSummary: precio 4,215 EUR (cierre del 12-nov), consenso (6 analistas: 3 comprar, 3 mantener; objetivo medio 6,00, mediana 6,15, mínimo 4,60, máximo 7,20), estimaciones de ingresos y BPA 2026-2027 y su tendencia a 30 y 90 días', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/RWAY.MI/analysis' },
  { id: 4, titulo: 'Tipos de cambio de referencia del euro, 12-nov-2026 (USD 1,1081; GBP 0,83595)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-11-12', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
  { id: 5, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS R10XX): 3,36 % el 12-nov-2026', editor: 'Deutsche Bundesbank', tipo: 'Primaria', fecha: '2026-11-12', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 6, titulo: 'Tipos a largo plazo (convergencia) de Italia y Alemania, oct-2026: 4,68 % y 3,416 % (sep: 4,362 % y 3,473 %)', editor: 'Banco Central Europeo (serie IRS)', tipo: 'Primaria', fecha: '2026-10', url: 'https://data-api.ecb.europa.eu/service/data/IRS/M.IT.L.L40.CI.0000.EUR.N.Z' },
  { id: 7, titulo: 'Implied ERP by month (ERPbymonth.xlsx), noviembre de 2026: 4,41 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-11', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 8, titulo: 'quoteSummary de INWIT, Cellnex, American Tower, SBA, Crown Castle y Helios Towers (cierre del 12-nov-2026: capitalización, valor empresa, EV/ventas, EV/EBITDA, BPA e ingresos estimados, deuda y caja)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-11-13', url: 'https://finance.yahoo.com/quote/INW.MI/key-statistics' },
  { id: 9, titulo: 'Estadísticas de INWIT, Cellnex, American Tower, SBA, Crown Castle y Helios Towers (ROIC y rentabilidad por FCF)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://stockanalysis.com/quote/bit/INW/statistics/' },
  { id: 10, titulo: 'Rai Way - Inflazione al 5,4%, possibile impatto positivo sulle stime (indexación del contrato con RAI al FOI; ≥ 4 % de ingresos 2027 sobre sus estimaciones)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-11-02', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-inflazione-al-5-4-impatto-positivo-sulle-stime/' },
  { id: 11, titulo: 'Rai Way - Rai punta al pareggio, resta aperta la cessione della quota (15 % ≈ 185 M EUR; posible colocación acelerada con descuento)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-10-01', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-rai-punta-al-pareggio/' },
  { id: 12, titulo: 'Rai Way - Riforma RAI in stallo, possibile rinvio del rinnovo del CdA (15 % ≈ 170 M EUR)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-11-03', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-riforma-rai-in-stallo-possibile-rinvio-del-rinnovo-del-cda/' },
  { id: 13, titulo: 'Rai Way - Sul tavolo l’opzione di vendere il 10% di Rai Way (≈ 130 M EUR; demanda débil, descuento elevado)', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-07-06', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-rai-sul-tavolo-opzione-di-vendere-il-10-di-rai-way-20260706071726/' },
  { id: 14, titulo: 'Rai Way - Per l’ad di EI Towers la fusione resta «valida» (reapertura improbable a corto plazo)', editor: 'Websim', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-per-l-ad-di-ei-towers-la-fusione-resta-valida/' },
  { id: 15, titulo: 'Prezzi al consumo, dati provvisori ottobre 2026 (NIC +5,4 % interanual; inflación adquirida 2026 +3,4 %)', editor: 'Istat', tipo: 'Primaria', fecha: '2026-10-30', url: 'https://www.istat.it/comunicato-stampa/prezzi-al-consumo-dati-provvisori-ottobre-2026/' },
  { id: 16, titulo: 'Piazza Affari: perdite consistenti per Rai Way (−5,1 % en sesión el 30-oct, sin causa publicada)', editor: 'Teleborsa', tipo: 'Prensa', fecha: '2026-10-30', url: 'https://www.teleborsa.it/News/2026/10/30/piazza-affari-perdite-consistenti-per-rai-way-87_TLB-1LINER.html' },
  { id: 17, titulo: 'Comunicato y presentación de resultados de 9M26 (11-nov-2026, tras el cierre)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-11-11', url: `${RW}/presentazioni-ed-eventi/2026/9m-2026/presentazione-risultati-9m2026` },
  { id: 18, titulo: 'Calendario finanziario 2026 (resultados anuales de 2026 en marzo de 2027)', editor: 'Rai Way S.p.A.', tipo: 'Primaria', fecha: '2026-01-21', url: `${RW}/avvisi-e-comunicati/comunicati/2026/calendario-finanziario-2026` },
];
const b = bolsa.bolsa;
const cierres = Object.fromEntries(bolsa.cierres_ejercicio.map((x) => [x.anio, x.precio_cierre]));
const u = (usd) => Math.round(usd / USD_EUR); const gb = (gbp) => Math.round(gbp / GBP_EUR);
// Crecimiento: previsión de ingresos a 3 años de Stock Analysis (no hay la de 12 meses gratis para todos); EV/EBITDA NTM sin dato del mismo proveedor.
const comps = [
  { nombre: 'INWIT', ticker: 'INW', pais: 'IT', capitalizacion: 6678, ev_ventas: 11.41, ev_ebitda_ltm: 16.1, ev_ebitda_ntm: null, per_ntm: 20.9, crecimiento_pct: 2.7, margen_ebitda_pct: 70.8, roic_pct: 5.5, dn_ebitda: 7.0, fcf_yield_pct: 7.8 },
  { nombre: 'Cellnex Telecom', ticker: 'CLNX', pais: 'ES', capitalizacion: 17436, ev_ventas: 9.06, ev_ebitda_ltm: 14.8, ev_ebitda_ntm: null, per_ntm: null, crecimiento_pct: 3.5, margen_ebitda_pct: 61.4, roic_pct: 1.9, dn_ebitda: 8.0, fcf_yield_pct: 5.0 },
  { nombre: 'American Tower', ticker: 'AMT', pais: 'US', capitalizacion: u(88018), ev_ventas: 12.51, ev_ebitda_ltm: 19.5, ev_ebitda_ntm: null, per_ntm: 27.1, crecimiento_pct: 3.4, margen_ebitda_pct: 64.3, roic_pct: 8.0, dn_ebitda: 6.1, fcf_yield_pct: 4.7 },
  { nombre: 'SBA Communications', ticker: 'SBAC', pais: 'US', capitalizacion: u(19483), ev_ventas: 12.07, ev_ebitda_ltm: 18.9, ev_ebitda_ntm: null, per_ntm: 23.6, crecimiento_pct: 1.9, margen_ebitda_pct: 63.9, roic_pct: 9.2, dn_ebitda: 8.1, fcf_yield_pct: 5.5 },
  { nombre: 'Crown Castle', ticker: 'CCI', pais: 'US', capitalizacion: u(38161), ev_ventas: 14.92, ev_ebitda_ltm: 23.0, ev_ebitda_ntm: null, per_ntm: 30.6, crecimiento_pct: 1.6, margen_ebitda_pct: 64.8, roic_pct: 5.2, dn_ebitda: 8.6, fcf_yield_pct: 7.1 },
  { nombre: 'Helios Towers', ticker: 'HTWS', pais: 'GB', capitalizacion: gb(2388), ev_ventas: 4.79, ev_ebitda_ltm: 9.2, ev_ebitda_ntm: null, per_ntm: 19.9, crecimiento_pct: 10.6, margen_ebitda_pct: 51.9, roic_pct: 5.4, dn_ebitda: 3.9, fcf_yield_pct: 2.2 },
];
const D = {
  _estado: 'completo',
  identificacion: {
    nombre: 'Rai Way S.p.A.', nombre_corto: 'Rai Way', ticker: 'RWAY', isin: 'IT0005054967', mercado: 'Euronext Milan (Borsa Italiana)', indice_referencia: 'FTSE Italia Mid Cap',
    pais: 'Italia', pais_iso: 'IT', sector: 'Servicios de comunicación', industria: 'Infraestructuras de difusión y torres', sede: 'Roma (Italia)', fundacion: '2000', empleados: 602, web: 'www.raiway.it',
    precio: 4.215, fecha_precio: '2026-11-12', acciones: 268.5, capitalizacion_publicada: 1132, free_float_pct: 33.7,
    max_52s: bolsa.identificacion.max_52s, min_52s: 4.04,
    volumen_medio_diario: '≈ 1,4 M EUR/día (3 meses; ≈ 0,31 M de acciones)', proximos_resultados: 'mar-2027',
  },
  consenso: {
    guidance: 'Guía 2026 confirmada el 11-nov-2026: EBITDA ajustado ≈ 4 M EUR por encima del de 2025 (191,8 M) a precio de la energía constante y «sustancialmente en línea» con 2025 con la energía real (tarifa de ≈ 228 EUR/MWh en 9M26 frente a ≈ 204 en 2025, futuros del PUN del 4T a ≈ 250); capex de mantenimiento por debajo del de 2025 y de desarrollo por encima (solar, DAB+, CDN) [17]. El plan 2024-27 (marzo de 2024) apuntaba a 316 M de ingresos y 207 M de EBITDA ajustado en 2027, que el consenso no recoge (304 M de ingresos) [2, 3]. Sensibilidad: ±0,7 M de EBITDA por cada 10 EUR/MWh [10]. Próximos resultados: anuales de 2026, en marzo de 2027 (fecha exacta pendiente del calendario de 2027) [18].',
    estimaciones: [
      { periodo: '2026e', ingresos: 289.5, ebitda: 192.8, ebit: 131.3, bpa: 0.314, dpa: 0.3265, fuente: 'Yahoo (ingresos y BPA, 13-nov; 1 analista en el BPA tras 9M26) y MarketScreener (EBITDA, EBIT y DPA, 15-oct) [3, 2]' },
      { periodo: '2027e', ingresos: 304.0, ebitda: 201.5, ebit: 136.9, bpa: 0.3396, dpa: 0.3396, fuente: 'Yahoo (ingresos y BPA, 5 analistas, 13-nov) y MarketScreener (EBITDA, EBIT y DPA, 15-oct) [3, 2]' },
      { periodo: '2028e', ingresos: 314, ebitda: 209.8, ebit: 144.1, bpa: 0.3553, dpa: 0.3534, fuente: 'MarketScreener, 15-oct [2]' },
    ],
    recomendaciones: { n_analistas: 6, comprar: 3, mantener: 3, vender: 0, po_medio: 6.0, po_min: 4.6, po_max: 7.2 },
    revisiones: 'Las estimaciones bajan: el BPA de 2026 pasó de 0,329 EUR hace 90 días a 0,335 hace 30 y a 0,314 tras los resultados (−4,5 % en tres meses), y el de 2027 de 0,343 a 0,340 (−1 %) [3]. Los motivos son el precio de la electricidad del 4T y la amortización más alta. En sentido contrario, la inflación italiana de octubre (+5,4 %, Istat) eleva la indexación de 2027: Intermonte calcula al menos un 4 % más de ingresos de 2027 que en su modelo, que partía de un 1 % de inflación [10, 15]. El objetivo medio baja de 6,18 EUR (15-oct) a 6,00 y el mínimo de 5,20 a 4,60 [2, 3]. MarketScreener no abre el 13-nov (403): EBITDA, EBIT y DPA del consenso son los del 15-oct.',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.0,
    confianza: 'Media',
  },
  bolsa: {
    tipo_rentabilidad: b.tipo_rentabilidad, rentabilidades: b.rentabilidades, anual: b.anual,
    beta: bolsa.betas.mensual_5a, volatilidad_pct: b.volatilidad_pct, max_drawdown_pct: b.max_drawdown_pct, posicion_corta_pct: null,
    comentario: 'La acción pierde un 25,1 % en un año (con dividendos) frente al +15,8 % del FTSE MIB y marcó mínimo de 52 semanas el 30-oct (4,04 EUR en sesión, −5,1 % intradía sin noticia) tras tocar 6,25 el 2-mar-2026 [1, 16]. La caída tiene tres tramos: la expiración del memorando con EI Towers (1-jul, −5,1 % ese día), el pago del dividendo de 0,33 (mayo) y las rebajas de recomendación del verano; desde octubre se mueve en un canal de 4,10-4,30 EUR. Tras los resultados de 9M26 (publicados el 11-nov después del cierre) subió un 2,9 % el 12-nov, a 4,215 EUR, con 0,94 M de acciones, el triple de lo normal [1, 3]. En diez años la acción ha rendido un 7,3 % anual, por debajo del índice, con una beta de 0,28 frente al FTSE MIB: se comporta como un bono indexado [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Al cierre de cada año la acción cotizó entre 15 y 19 veces el beneficio del año siguiente (mediana de 16,7 veces en 2021-2025) y hoy lo hace a unas 12 veces el de 2027: un descuento del 25-30 % frente a su historia [1]. Parte del descuento es estructural: los tipos a 10 años en euros pasaron del 0 % de 2021 al 3,4 % de hoy y la acción es un sustituto de bono [5]. La otra parte es de la operación fallida: la prima de fusión que el precio llevaba en 2025 (con dividendo extraordinario esperado de ≈ 1 EUR por acción) ha desaparecido.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Torreras cotizadas con contratos a largo plazo indexados y márgenes EBITDA del 50-70 %: INWIT y Cellnex (Europa, con red en Italia), American Tower, SBA y Crown Castle (EE. UU.) y Helios Towers (África). No hay comparables puros de difusión cotizados: EI Towers, TDF y Arqiva son privadas. Todas crecen algo más y tienen mucha más deuda (3,7-8,3 veces el EBITDA frente a 0,9 de Rai Way) y contratos con varios clientes; por eso el múltiplo sirve de techo, no de referencia directa. Precios, valor empresa, EV/ventas, EV/EBITDA de los últimos 12 meses, BPA e ingresos estimados de Yahoo al cierre del 12-nov (PER = precio ÷ BPA de 2027; crecimiento = ingresos de 2027 sobre 2026; en las torreras el EBITDA de Yahoo es el de después de arrendamientos); ROIC y rentabilidad por FCF de Stock Analysis a 15-oct.',
    empresas: comps,
    comentario: 'Rai Way cotiza a ≈ 7 veces el EBITDA de los últimos doce meses y 12-13 veces el beneficio de 2027, frente a 9-23 veces el EBITDA y 20-31 veces el beneficio de las torreras. La diferencia se explica por tres cosas: el crecimiento esperado es menor (1-3 % frente a 3-5 %), la concentración en un cliente que es también el accionista de control, y la percepción de que la TDT es un activo que se extingue mientras las torres de telecomunicaciones tienen 5G y densificación por delante. Aun así, el descuento es extremo para una empresa con un ROIC del 28 % y deuda de 0,84 veces el EBITDA. El múltiplo de los comparables pesa poco (10 %) y solo como contraste.',
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo publicado', tipo: 'Complemento', intentos: '1) OPA de 2i Towers (F2i y Mediaset) sobre EI Towers en 2018: precio de 57 EUR y 1.610 M de equity, sin EV/EBITDA en las fuentes leídas; 2) búsqueda de múltiplos de Vantage Towers, Telxius y TDF (sin documento oficial en el tiempo disponible); 3) prensa italiana (solo precio y prima)', decision: 'Omitido' },
        { seccion: 'consenso', campo: 'EBITDA, EBIT y DPA del consenso posteriores a 9M26', tipo: 'Complemento', intentos: '1) MarketScreener (403 el 13-nov; la caché de WebFetch sirve páginas de 2024 y agosto de 2026); 2) Stock Analysis (estimaciones de mayo, el resto de pago); 3) Yahoo (solo ingresos y BPA)', decision: 'Calculado y marcado como estimación' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Consob (posiciones cortas netas: sin posiciones públicas ≥ 0,5 % localizadas); 2) búsqueda web; 3) prensa', decision: 'Omitido' },
  ],
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Rai Way - Inflazione al 5,4%, possibile impatto positivo sulle stime', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-11-02', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-inflazione-al-5-4-impatto-positivo-sulle-stime/' },
  { id: 2, titulo: 'Rai Way, l’inflazione diventa un’opportunità (idea de trading; avance abierto)', editor: 'Websim (Gianluca Stasi)', tipo: 'Prensa', fecha: '2026-11-02', url: 'https://www.websim.it/azioni/analisi-tecnica/idee-di-trading/cpdi-technogym-i-conti-spingono-il-titolo-kepler-alza-il-target-price/' },
  { id: 3, titulo: 'Nuovo ingresso Long su Rai Way («titolo debole da diversi trimestri», soporte de diez años)', editor: 'Websim (Gianluca Stasi)', tipo: 'Prensa', fecha: '2026-10-30', url: 'https://www.websim.it/azioni/analisi-tecnica/tecnica-migliori-titoli/nuovo-ingresso-long-su-rai-way/' },
  { id: 4, titulo: 'Hilos de Rai Way en el foro de FinanzaOnline (páginas recientes bloqueadas con 403 el 13-nov)', editor: 'FinanzaOnline', tipo: 'Foros y redes', fecha: '2026-11', url: 'https://forum.finanzaonline.com/threads/rai-way-sembra-tenuta-alta-ma-ce-tanto-potenziale.1982266/' },
  { id: 5, titulo: 'Rai Way - Rai punta al pareggio, resta aperta la cessione della quota', editor: 'Websim (Intermonte)', tipo: 'Analistas', fecha: '2026-10-01', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-rai-punta-al-pareggio/' },
  { id: 6, titulo: 'Rai Way - Per l’ad di EI Towers la fusione resta «valida»', editor: 'Websim', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.websim.it/azioni/small-mid-cap/notizie/rai-way-per-l-ad-di-ei-towers-la-fusione-resta-valida/' },
];
const E = {
  _estado: 'parcial',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Websim (Intermonte), notas de octubre-noviembre', fecha: '2026-11', n_comentarios: 3, tono: 'Dividido', resumen: 'La inflación de octubre se lee como una oportunidad (≥ 4 % más de ingresos en 2027 por la indexación), pero la venta del 15 % por RAI sigue abierta y la califican de «potencialmente negativa» [1, 5].' },
      { plataforma: 'Websim, análisis técnico e ideas de trading', fecha: '2026-11', n_comentarios: 2, tono: 'Positivo', resumen: 'Abren una estrategia alcista en el soporte de diez años tras «varios trimestres de debilidad» y titulan «la inflación se convierte en oportunidad» [2, 3].' },
      { plataforma: 'Websim, declaraciones del consejero delegado de EI Towers', fecha: '2026-10', n_comentarios: 1, tono: 'Neutro', resumen: 'La fusión sigue siendo «válida» en lo industrial pero no se reabrirá a corto plazo: la especulación corporativa queda aparcada [6].' },
      { plataforma: 'Foro de FinanzaOnline (hilos de Rai Way)', fecha: '2026-11', n_comentarios: 0, tono: 'Dividido', resumen: 'Los hilos existen (dividendo, fusión, cuota de RAI), pero las páginas recientes no abren (403): no leemos opiniones de particulares de los últimos tres meses [4].' },
    ],
    temas: [
      { tema: 'Inflación italiana y indexación del contrato con RAI', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en el signo: casi todos los ingresos se indexan a la inflación del año anterior; el IPC de octubre fue +5,4 % y la inflación adquirida de 2026 es del 3,4 % (Istat) [1]. La energía resta una parte (0,7 M por cada 10 EUR/MWh).' },
      { tema: 'Venta del 15 % por RAI (overhang)', postura: 'Bajista', peso: 'Alto', contraste: 'Plausible pero sin fecha: la previsión de deuda de RAI para 2026 la incluye y una colocación acelerada llevaría descuento; la reforma de RAI está bloqueada [5].' },
      { tema: 'Dividendo del 7-8 %', postura: 'Alcista', peso: 'Alto', contraste: '0,33 EUR sobre 4,215 = 7,8 %; cubierto por el beneficio y, en los doce meses a septiembre, casi por la caja libre (93,8 M frente a 88,6 M de dividendo).' },
      { tema: 'Fin de la fusión con EI Towers', postura: 'Bajista', peso: 'Medio', contraste: 'Ya en el precio desde julio; el consejero delegado de Rai Way habla ahora de «crecimiento externo» y anota costes de operaciones corporativas en 9M26 [6].' },
    ],
    lectura: 'Sin foros de particulares legibles, el sentimiento sale de brókeres y prensa especializada. Ha pasado de negativo a dividido desde octubre: la inflación italiana (+5,4 % en octubre) devuelve el argumento del ingreso indexado, y el análisis técnico ve un suelo en el soporte de diez años, mientras que el riesgo de colocación de RAI y la energía siguen pesando. No hay euforia: la acción está en mínimos de un año y un objetivo medio del consenso un 42 % por encima. Para la decisión aporta lo mismo que los datos: el factor que puede mover el precio a corto plazo es la decisión de RAI sobre su 15 %, no los resultados.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [ { seccion: 'sentimiento', campo: 'foros con debate directo de los últimos tres meses', tipo: 'Complemento', intentos: '1) FinanzaOnline (hilos localizados; páginas 403 con WebFetch y curl); 2) Investing Italia (comentarios, 403) y Reddit/Stocktwits (sin debate); 3) Websim (ideas de trading y notas, avances abiertos)', decision: 'Calculado y marcado como estimación' } ],
};

for (const [l, o] of Object.entries({ A, B, C, D, E })) guarda(l, o);
console.log('Notas A-E escritas en', dir);
