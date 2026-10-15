// Escribe las notas A-E de MSA Safety (MSA, corte 2026-10-15) a partir de los documentos de EDGAR descargados en notas/docs,
// del XBRL de la SEC (cuentas-xbrl.json y companyfacts), de bolsa.json (Yahoo) y de comparables-yahoo.json. Sin subagentes.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const BO = lee('bolsa.json');
const r1 = (v) => (v == null ? null : Math.round(v * 10) / 10);
const r2 = (v) => (v == null ? null : Math.round(v * 100) / 100);
const EDGAR = 'https://www.sec.gov/Archives/edgar/data/66570';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas anuales auditadas, segmentos, contingencias, desinversión de MSA LLC)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000006657026000005/msa-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q 2T26 (balance a 30-jun-2026, deuda, PFAS, hecho posterior: Autronica)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000006657026000027/msa-20260630.htm` },
  { id: 3, titulo: 'MSA Safety Announces Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${EDGAR}/000006657026000025/ex991-earningspressrelease.htm` },
  { id: 4, titulo: 'MSA Safety Announces First Quarter 2026 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-04', url: `${EDGAR}/000006657026000010/ex991-earningspressrelease.htm` },
  { id: 5, titulo: 'MSA Safety Announces Fourth Quarter and Full-Year 2025 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-11', url: `${EDGAR}/000006657026000002/ex991-q42025earningspr.htm` },
  { id: 6, titulo: 'MSA Safety Announces Third Quarter 2025 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-28', url: `${EDGAR}/000006657025000039/ex991-earningspressrelease.htm` },
  { id: 7, titulo: 'MSA Safety Announces Second Quarter 2025 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-04', url: `${EDGAR}/000006657025000027/ex991-earningspressrelease.htm` },
  { id: 8, titulo: 'MSA Safety Announces First Quarter 2025 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2025-04-29', url: `${EDGAR}/000006657025000013/ex991-earningspressrelease.htm` },
  { id: 9, titulo: 'XBRL companyfacts de MSA Safety (CIK 66570): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000066570.json' },
  { id: 10, titulo: 'MSA Safety to Acquire Autronica Fire and Security (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000114036126019007/ny20072200x1_ex99-1.htm` },
  { id: 11, titulo: 'MSA Safety Completes Acquisition of Autronica Fire and Security (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-09', url: `${EDGAR}/000006657026000019/exhibit991-autronicaacquis.htm` },
  { id: 12, titulo: 'MSA Safety Announces Share Repurchase Program (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${EDGAR}/000006657026000007/exhibit991-sharerepurchase.htm` },
  { id: 13, titulo: 'MSA Safety (MSA) Q2 2026 Earnings Call Transcript', editor: 'Webull (transcripción de terceros)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.webull.com/news/15364816049169408' },
];

// No recurrentes dentro del EBIT (gasto en positivo): responsabilidad por productos de trauma acumulativo (minería del carbón,
// sílice, amianto) hasta 2022 y pérdida por la desinversión de MSA LLC en 2023 [1, 9]; 2024: litigio de producto (5,0 M) [1].
const noRec = { 2017: 219.0, 2019: 28.4, 2020: 39.0, 2021: 185.3, 2022: 20.6, 2023: 129.2, 2024: 5.0 };
const pn = { 2022: 923.7, 2023: 966.8, 2024: 1143.3, 2025: 1367.0 };
const recompras = { 2016: 1.9, 2017: 17.5, 2018: 4.8, 2019: 12.6, 2020: 29.1, 2021: 6.2, 2022: 34.4, 2023: 4.0, 2024: 37.3, 2025: 90.0 };
const cuenta = X.financieros.cuenta.map((c) => {
  const o = { ...c, minoritarios: c.minoritarios ?? 0, no_recurrentes_en_ebitda: noRec[c.periodo] ?? null, participadas_en_ebitda: null, dpa_extraordinario: 0 };
  delete o.fin;
  return o;
});
const balance = X.balance.historico.map((b) => {
  const o = { ...b };
  delete o.fin;
  o.patrimonio_neto = b.patrimonio_neto ?? pn[b.periodo] ?? null;
  o.minoritarios = b.minoritarios ?? 0;
  o.arrendamientos = 0; // US GAAP: arrendamientos operativos (≈59 M) ya dentro del EBITDA; no van a la deuda
  o.activos_contrato = null; o.pasivos_contrato = null;
  return o;
});
const flujos = X.flujos.historico.map((f) => {
  const o = { ...f };
  delete o.fin;
  o.adquisiciones = f.adquisiciones ?? 0;
  o.desinversiones = f.desinversiones ?? 0;
  o.recompras = recompras[f.periodo] ?? 0;
  o.pagos_arrendamientos = 0;
  o.intereses_en_financiacion = 0;
  return o;
});

const seg = (nombre, descripcion, filas) => ({ nombre, descripcion, tipo_resultado: 'EBIT', historico: filas.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });
const A = {
  _estado: 'Completa. Cuenta, balance y flujos del XBRL de la SEC comprobados con el 10-K 2025, el 10-Q 2T26 y seis notas de resultados trimestrales.',
  negocio: {
    segmentos: [
      seg('Americas', 'EE. UU., Canadá y Latinoamérica: plantas en EE. UU., México y Brasil; venta sobre todo a través de distribuidores. Resultado operativo ajustado del segmento.', [['2023', 1235.6, 359.6], ['2024', 1246.6, 380.1], ['2025', 1261.8, 364.8]]),
      seg('International', 'Europa, Oriente Medio, África y Asia-Pacífico: plantas en Alemania, Francia, Reino Unido, Irlanda, Marruecos y China; venta directa e indirecta. Incluye M&C (2025) y, desde julio de 2026, Autronica.', [['2023', 552.1, 89.7], ['2024', 561.5, 84.6], ['2025', 613.0, 93.3]]),
      seg('Corporativo y partidas no asignadas', 'Gastos centrales, diferencias de cambio, amortización de intangibles comprados, reestructuración, costes de transacción y, en 2023, la pérdida por la desinversión de MSA LLC. Sin ventas.', [['2023', 0, -218.0], ['2024', 0, -75.5], ['2025', 0, -86.2]]),
    ],
    geografias: [
      { nombre: 'EE. UU. (por origen)', peso_pct: 50.3 },
      { nombre: 'Resto del mundo (por origen)', peso_pct: 49.7 },
    ],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas de detección (fija y portátil)', valor_anterior: '642,8 M (2024)', valor_actual: '763,4 M (2025)', variacion: '+18,8 % (M&C incluida)', comentario: '41 % de las ventas; crecimiento orgánico de dos cifras en Americas en 2025 [1].' },
      { kpi: 'Ventas de bomberos (SCBA, cascos, trajes)', valor_anterior: '712,7 M (2024)', valor_actual: '647,5 M (2025)', variacion: '−9,1 %', comentario: 'Retraso de los pedidos financiados con las subvenciones AFG de 2025 y cierre del Gobierno federal [1].' },
      { kpi: 'Ventas de EPI industrial y otros', valor_anterior: '452,7 M (2024)', valor_actual: '463,9 M (2025)', variacion: '+2,5 %', comentario: 'Cascos V-Gard, anticaídas y cascos balísticos; +16 % orgánico en el 2T26 [1, 3].' },
      { kpi: 'Crecimiento orgánico de ventas', valor_anterior: '+0,7 % (2025)', valor_actual: '+3 % (1S26)', variacion: '+2,3 puntos', comentario: 'Guía 2026: un dígito medio orgánico más una aportación de compras de un dígito medio [3, 5].' },
      { kpi: 'Margen EBITDA ajustado', valor_anterior: '25,2 % (2025)', valor_actual: '26,1 % (1S26)', variacion: '+0,9 puntos', comentario: 'Incluye ≈4 M de devolución de aranceles en el 2T26 (80-100 pb de margen bruto) [3, 13].' },
      { kpi: 'Conversión de beneficio en flujo libre', valor_anterior: '106 % (2025)', valor_actual: '94 % (1S26)', variacion: '−12 puntos', comentario: 'Objetivo de la dirección: 90-100 % [3, 12].' },
      { kpi: 'Deuda neta / EBITDA ajustado', valor_anterior: '0,9x (dic-25)', valor_actual: '0,8x (jun-26); ≈1,8x pro forma con Autronica', variacion: '+1,0x tras la compra', comentario: 'Objetivo de 1,5-2,5x; por encima solo para «la operación adecuada» [3, 13].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1946.3, ebitda: 488.1, ebit: 413.2, beneficio_neto: 314.0, bpa: 8.04, dpa: 2.14, dpa_extraordinario: 0, fcf: 254.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: -4.0 },
    cambios_perimetro: [
      { periodo: '2021', descripcion: 'Bacharach (detección de refrigerantes), comprada en enero de 2021 por 337 M [1].' },
      { periodo: '2025', descripcion: 'M&C TechGroup (análisis de gases, Alemania), consolidada desde el 6-may-2025 por 189 M: 40,9 M de ventas en 2025 [1].' },
    ],
    comentario: 'Las ventas pasaron de 1.150 M en 2016 a 1.875 M en 2025 (5,6 % anual), con compras relevantes en 2017 (Globe, trajes de bomberos, 216 M), 2021 (Bacharach, 392 M en total) y 2025 (M&C, 189 M) [1, 9]. El orgánico fue débil en 2024-2025 (+0,7 % en 2025) por el retraso de las subvenciones AFG a los bomberos de EE. UU. y la comparación con grandes pedidos de detección en Latinoamérica [1]. El margen EBIT publicado está distorsionado hasta 2023 por la responsabilidad por productos de trauma acumulativo (219 M en 2017, 185 M en 2021) y por la pérdida de 129 M de la desinversión de MSA LLC en 2023; sin ellos, el margen EBIT pasó del 16,6 % en 2019 al 19,8 % en 2025 por precio, mezcla (detección) y el sistema de gestión MBS, a pesar de los aranceles y de la amortización de M&C [1]. En el 1S26 el margen bruto subió al 48,5 % (46,2 %) con precio, productividad y unos 4 M de devolución de aranceles en el 2T26 [2, 13].',
    ajustes: 'Usamos cifras publicadas (US GAAP). La empresa da un BPA ajustado que suma la amortización de intangibles comprados (12,6 M en 2025), las diferencias de cambio (15,8 M), la reestructuración (3,9 M) y los costes de transacción (10,5 M): 7,93 USD en 2025 frente a 7,09 publicados [5]. Solo tratamos como no recurrentes, dentro del EBIT, la responsabilidad por productos heredada (hasta 2022), la pérdida por la desinversión de MSA LLC (129,2 M en 2023, más 70,4 M de impuestos por la baja de activos fiscales) y el litigio de 2024 (5,0 M) [1, 9]. La reestructuración, las diferencias de cambio y los costes de compras se repiten casi todos los años y se quedan en el BPA. En el LTM restamos la devolución de aranceles del 2T26 (≈4 M) [13].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 432.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 111.6, margen_ebitda_pct: 25.8, bpa: 1.69, vs_consenso: null },
      { periodo: '4T24', ingresos: 499.7, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 135.0, margen_ebitda_pct: 27.0, bpa: 2.22, vs_consenso: null },
      { periodo: '1T25', ingresos: 421.3, crecimiento_pct: 1.9, crecimiento_organico_pct: 4.0, ebitda: 101.5, margen_ebitda_pct: 24.1, bpa: 1.51, vs_consenso: null },
      { periodo: '2T25', ingresos: 474.1, crecimiento_pct: 2.5, crecimiento_organico_pct: 0.0, ebitda: 116.5, margen_ebitda_pct: 24.6, bpa: 1.59, vs_consenso: null },
      { periodo: '3T25', ingresos: 468.4, crecimiento_pct: 8.3, crecimiento_organico_pct: 3.0, ebitda: 118.9, margen_ebitda_pct: 25.4, bpa: 1.77, vs_consenso: 'Superior' },
      { periodo: '4T25', ingresos: 510.9, crecimiento_pct: 2.2, crecimiento_organico_pct: -3.0, ebitda: 136.0, margen_ebitda_pct: 26.6, bpa: 2.21, vs_consenso: 'Superior' },
      { periodo: '1T26', ingresos: 463.6, crecimiento_pct: 10.0, crecimiento_organico_pct: 3.0, ebitda: 115.9, margen_ebitda_pct: 25.0, bpa: 1.83, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 503.3, crecimiento_pct: 6.2, crecimiento_organico_pct: 3.0, ebitda: 136.4, margen_ebitda_pct: 27.1, bpa: 2.23, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'EBITDA ajustado de la empresa; BPA publicado (diluido). Frente al consenso previo de BPA ajustado de Estimize/Seeking Alpha: 1,94 frente a 1,87 en el 3T25, 2,38 frente a 2,27 en el 4T25, 1,99 frente a 1,83 en el 1T26 y 2,40 frente a 2,14 en el 2T26. En el 2T26 (31-jul) la dirección mantuvo el orgánico de un dígito medio para 2026 y elevó el total a «dos cifras bajas» con Autronica, con un margen bruto ajustado del 47,5-48,5 % y gastos financieros de 40-43 M (más que antes) [3, 13]. Bomberos cayó un 2 % orgánico porque los pedidos de las subvenciones AFG de 2025 llegaron más tarde de lo previsto y el Departamento de Seguridad Nacional estuvo cerrado hasta finales de mayo; los pedidos se aceleraron en junio y julio y el consejero delegado espera la renovación por la nueva norma NFPA en 2027 [13]. Detección fija cayó por la guerra en Oriente Medio (más de 1,5 puntos de crecimiento en el semestre). Frente al 1T26, el discurso pasó de «arranque sólido» a «disciplina» y compras. Los analistas preguntaron por el calendario de AFG, el peso de los cascos balísticos, el coste de la electrónica y Oriente Medio; la dirección no cuantificó ni el efecto del coste de la electrónica ni el peso de defensa, ni dio cifras de Autronica para 2026 [13].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: '2026', importe: 8.1 }, { anio: '2027', importe: 33.1 }, { anio: '2028', importe: 33.1 }, { anio: '2029', importe: 8.1 }, { anio: '2030', importe: 318.0 }, { anio: '2031+', importe: 200.0 },
    ],
    liquidez: 'Caja de 200,1 M y 986 M no dispuestos de la línea de crédito de 1.300 M (vence en 2030) a 30-jun-2026; tras pagar Autronica (555 M, 9-jul), liquidez de ≈600 M [2, 13].',
    rating: 'Sin rating público (deuda bancaria y colocaciones privadas con PGIM y NYL).',
    coste_deuda_pct: 5.6,
    vida_media_anios: 4.5,
    otros_pasivos: 'Covenants: deuda neta/EBITDA ≤ 3,5x (4,0x en el año de una compra) y cobertura de cargas fijas ≥ 1,5x; con ≈1,8x pro forma hay holgura [2, 3]. Pensiones: activo neto de 291,2 M (plan de EE. UU. con superávit) frente a 140,5 M de obligaciones de pensiones y otros beneficios: superávit neto de ≈150 M que no sumamos al puente [3]. La responsabilidad por productos de trauma acumulativo (neumoconiosis del carbón, silicosis, amianto) salió del balance el 5-ene-2023 con MSA LLC, que se vendió a una empresa conjunta de R&Q y Obra Capital aportando 341,2 M de caja; el comprador y MSA LLC indemnizan a MSA sin límite [1]. Globe (trajes de bomberos) tiene 1.222 demandas con 21.372 reclamaciones por PFAS a 27-jul-2026, sin provisión: los costes de defensa van a resultados [2]. Arrendamientos operativos de ≈59 M (US GAAP: fuera de la deuda).',
    comentario: 'La deuda bruta pasó de 391 M en 2016 a 581 M en 2025 y 600 M en junio de 2026, siempre con apalancamiento bajo (0,8-1,2 veces el EBITDA ajustado) [2, 3]. El salto de 2021 fue la compra de Bacharach; el de 2023, el préstamo de 250 M para aportar caja a MSA LLC al venderla [1]. Tras Autronica (pagada con caja y la línea de crédito), la deuda neta sube a ≈955 M y el apalancamiento a ≈1,8x. El circulante comercial es alto (28,7 % de las ventas en 2025: 343 M de existencias y 307 M de clientes frente a 111 M de proveedores) porque fabrica equipos certificados con muchos componentes y vende a distribuidores [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo de explotación fue de 364 M en 2025 y 296 M en 2024, con un capex de 68 y 54 M (3,6 % y 3,0 % de las ventas, incluido software capitalizado de 15 M) [1]. 2022-2023 fueron anómalos: en 2022 se pagaron reclamaciones de trauma acumulativo y se acumularon existencias por la escasez de componentes, y en 2023 el flujo de explotación (93 M) recoge pagos de responsabilidad y la reorganización previa a la venta de MSA LLC; además, la aportación de 341,2 M a MSA LLC (enero de 2023) fue una salida de caja que liquidó el pasivo heredado [1, 9]. La conversión de beneficio en flujo libre fue del 106 % en 2025 y del 94 % en el 1S26, dentro del objetivo del 90-100 % [3, 12]. Estimación propia: el capex de mantenimiento ronda la amortización del inmovilizado material y del software (≈45-50 M); el resto es capacidad y automatización.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP',
    anios_auditor: 12,
    opinion: 'Favorable',
    comentario: 'Auditor desde 2014 [1]. Capitaliza software (14,9 M en 2025, 13,0 M en 2024) y lo amortiza en el coste de ventas (12,0 M), una cifra pequeña frente al EBIT [1]. La remuneración en acciones es moderada. La partida que más distorsionó las cuentas fue la responsabilidad por productos heredada: 219 M en 2017 y 185 M en 2021, y una pérdida de 199,6 M después de impuestos al vender MSA LLC en 2023; desde entonces el BPA publicado es limpio salvo diferencias de cambio y costes de compras [1, 9]. El plan de pensiones de EE. UU. con superávit da ingresos financieros (14,0 M de ingresos netos en 2025) que están fuera del EBIT pero dentro del BPA [1]. Los indicadores del motor (Altman, Piotroski, Beneish) se leen con el perímetro de 2021 y 2025 marcado y con 2023 distorsionado por la baja de activos y pasivos de MSA LLC.',
    senales: [
      { senal: 'Pasivo heredado transferido a un tercero', nivel: 'Media', comentario: 'MSA LLC y sus 395 M de provisión de trauma acumulativo pasaron a una empresa conjunta de R&Q y Obra en 2023; si el comprador no pudiera pagar, los demandantes podrían intentar reclamar a MSA (transmisión fraudulenta). Hay opinión de solvencia independiente [1].' },
      { senal: 'Demandas por PFAS en trajes de bomberos (Globe)', nivel: 'Media', comentario: '1.222 demandas y 21.372 reclamaciones sin provisión; en fase inicial [2].' },
      { senal: 'Devolución de aranceles en el margen', nivel: 'Baja', comentario: '≈4 M en el 2T26 dentro del coste de ventas; la empresa no la quita de su BPA ajustado [13].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades: crecimiento orgánico, compras y devolución al accionista [5]. Dividendo subido 56 años seguidos (0,54 USD al trimestre desde mayo de 2026, +1,9 %) [3]. Programa de recompra de 500 M aprobado el 20-feb-2026 sin fecha de fin, que sustituye al de 200 M de 2024; en el 1S26 recompró 76 M [2, 12]. Objetivo de apalancamiento de 1,5-2,5 veces el EBITDA ajustado, con margen para pasar de 2,5x en una gran compra [13].',
    adquisiciones: [
      { anio: '2017', objetivo: 'Globe Manufacturing (trajes de bomberos, EE. UU.)', importe: 215, ev_ebitda: null, financiacion: 'Deuda', resultado: 'Cumplió en ventas, pero trajo las demandas por PFAS (21.372 reclamaciones en 2026) [2].' },
      { anio: '2021', objetivo: 'Bacharach (detección de refrigerantes, EE. UU.)', importe: 337, ev_ebitda: null, financiacion: 'Línea de crédito', resultado: 'Base del crecimiento de detección fija en climatización y refrigeración; sin deterioros [1].' },
      { anio: '2025', objetivo: 'M&C TechGroup (análisis de gases, Alemania)', importe: 189, ev_ebitda: null, financiacion: 'Línea de crédito (137 M) y caja', resultado: '40,9 M de ventas en 2025; integrado en orgánico desde mayo de 2026 [1, 13].' },
      { anio: '2026', objetivo: 'Autronica Fire and Security (detección de incendio y gas, Noruega)', importe: 555, ev_ebitda: 17.3, financiacion: 'Caja y línea de crédito', resultado: 'Cerrada el 9-jul-2026; 160 M de ventas en 2025 con margen EBITDA ajustado del ≈20 %; acrecitiva al BPA ajustado el primer año completo según la empresa [10, 11].' },
    ],
    confianza: 'Alta',
  },
  fuentes: fA,
  huecos: [],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, productos, competencia, regulación', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000006657026000005/msa-20251231.htm` },
  { id: 2, titulo: 'Gas Detector Market Size (2025: 4.100 M USD; TCAC 5,2 % 2026-2035)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/gas-detector-market' },
  { id: 3, titulo: 'Gas Detection Equipment Market (2025: 3.110 M USD; TCAC 5,3 % hasta 2034)', editor: 'Market Data Forecast', tipo: 'Sectorial', fecha: '2026', url: 'https://www.marketdataforecast.com/market-reports/gas-detection-equipment-market' },
  { id: 4, titulo: 'Supplied Air Respirators (SCBA) Market (2025: 1.650 M USD; TCAC 6,0 % hasta 2033)', editor: 'Verified Market Research', tipo: 'Sectorial', fecha: '2026', url: 'https://www.verifiedmarketresearch.com/product/supplied-air-respirators-scba-market/' },
  { id: 5, titulo: 'MSA Safety to Acquire Autronica Fire and Security (mercado de sistemas de incendio y gas de más de 3.000 M USD)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000114036126019007/ny20072200x1_ex99-1.htm` },
  { id: 6, titulo: 'The Washington Update – March 6 (presupuesto de DHS 2026, AFG y FEMA GO)', editor: 'International Association of Fire Chiefs', tipo: 'Sectorial', fecha: '2026-03-09', url: 'https://www.iafc.org/blogs/blog/iafc/2026/03/09/the-washington-update-march-6' },
  { id: 7, titulo: 'FEMA: convocatoria de Assistance to Firefighters Grants por 291,6 M USD (19-may a 22-jun-2026)', editor: 'FEMA (GovDelivery)', tipo: 'Primaria', fecha: '2026-05-19', url: 'https://content.govdelivery.com/accounts/USDHSFEMA/bulletins/41755bc' },
  { id: 8, titulo: 'Yahoo Finance quoteSummary: datos financieros de Dräger, Halma, Avon, Ansell, Teledyne y Fortive', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com' },
  { id: 9, titulo: 'MSA Safety (MSA) Q2 2026 Earnings Call Transcript', editor: 'Webull (transcripción de terceros)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.webull.com/news/15364816049169408' },
];
const B = {
  _estado: 'Completa con fuentes sectoriales de pago (solo resúmenes públicos) y el 10-K.',
  historia: {
    resumen: 'MSA nació en 1914 en Pittsburgh como Mine Safety Appliances, para proteger a los mineros del carbón. Durante un siglo fue el proveedor de referencia de la minería y del ejército de EE. UU. (máscaras de gas) y se diversificó hacia bomberos, detección de gases y cascos industriales. En 2014 cambió de nombre a MSA Safety y en 2017-2021 compró Globe (trajes de bomberos) y Bacharach (detección de refrigerantes). La herencia minera dejó un pasivo por neumoconiosis y silicosis que costó más de 400 M entre 2017 y 2022 y del que se deshizo en 2023 vendiendo la filial MSA LLC con 341 M de caja. Desde 2024 la dirige Steve Blanco, que ha acelerado las compras en detección (M&C en 2025, Autronica en 2026) [1, 5].',
    hitos: [
      { anio: '1914', hito: 'Fundación en Pittsburgh como Mine Safety Appliances, proveedor de seguridad para la minería del carbón.' },
      { anio: '2014', hito: 'Cambio de nombre a MSA Safety y reorganización como holding (la filial operativa histórica pasa a MSA LLC).' },
      { anio: '2017', hito: 'Compra de Globe (trajes de bomberos) por 215 M y cargo de 219 M por responsabilidad de productos heredada.' },
      { anio: '2021', hito: 'Compra de Bacharach (detección de refrigerantes) por 337 M y cargo de 185 M por trauma acumulativo.' },
      { anio: '2023', hito: 'Venta de MSA LLC y de su pasivo por neumoconiosis a una empresa conjunta de R&Q y Obra, con una aportación de 341 M.' },
      { anio: '2024', hito: 'Steve Blanco sucede a Nish Vartanian como consejero delegado (mayo).' },
      { anio: '2025', hito: 'Compra de M&C TechGroup (análisis de gases, Alemania) por 189 M.' },
      { anio: '2026', hito: 'Compra de Autronica (detección de incendio y gas, Noruega) por 555 M y programa de recompra de 500 M.' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'MSA diseña, fabrica y vende equipos de seguridad sofisticados en tres familias: detección (41 % de las ventas de 2025: detectores fijos de gas y llama para plantas de energía, química, agua y climatización, y detectores portátiles ALTAIR para trabajadores), bomberos (34 %: equipos de respiración autónoma o SCBA G1 en EE. UU. y M1 fuera, cascos Cairns y Gallet, y trajes Globe y Bristol) y EPI industrial (25 %: cascos V-Gard, anticaídas y cascos balísticos) [1]. Vende en América (67 %) sobre todo a través de distribuidores (Grainger, Fastenal y especialistas de bomberos), y fuera de forma directa e indirecta [1]. Fabrica en EE. UU., México, Brasil, Alemania, Francia, Reino Unido, Irlanda, Marruecos y China, con unos 5.300 empleados [1, 5]. Con MSA+ conecta equipos y software para cobrar servicio recurrente [1].',
    como_gana_dinero: 'Gana en la combinación de una norma obligatoria y un producto certificado: los SCBA deben cumplir la NFPA 1981/1970 en EE. UU. y se renuevan por ciclos de 10-15 años o con cada cambio de norma, y los detectores fijos llevan recambios de sensores, calibración y servicio durante décadas [1]. Una parte relevante de detección fija es recurrente (recambios y servicio) [1]. El margen depende del precio (subidas de 2025 y 2026), la mezcla (detección y SCBA ganan más que cascos y trajes) y el coste de la electrónica, que es dos tercios del coste de ventas en materiales [1]. Margen bruto del 46,5 % en 2025 y 48,5 % en el 1S26 [1, 9]. Bomberos depende del presupuesto municipal y de las subvenciones federales AFG, que se adjudican con retraso y crean años irregulares [1, 6].',
    clientes: 'Ningún cliente supera el 10 % de las ventas [1]. En América la mayoría pasa por distribuidores; los clientes finales son cuerpos de bomberos, energía, servicios públicos, construcción y fabricación industrial. Los contratos de bomberos se ganan en concursos con homologación previa y suelen ir ligados a la flota de SCBA durante una década; un cuerpo que cambia de fabricante tiene que formar a toda la plantilla y cambiar botellas y máscaras, lo que crea costes de cambio altos [1]. Poder de precios demostrado: el margen bruto subió del 44,0 % de 2022 al 46,5 % de 2025 y al 48,5 % del 1S26 con «acciones de precio estratégicas» en 2025 y 2026, por encima de la inflación de materiales y de los aranceles [1, 9].',
  },
  sector: {
    definicion: 'El mercado relevante es el de equipos de seguridad sofisticados sujetos a certificación: detección de gas y llama (fija y portátil), equipos de respiración autónoma (SCBA) y, desde 2026, sistemas de detección de incendio y gas; dejamos fuera el EPI básico (guantes, ropa, gafas), que es un mercado de bajo valor. Ámbito mundial. Usamos para detección la estimación de Global Market Insights (4.100 M USD en 2025) y la contrastamos con la de Market Data Forecast (3.110 M); para SCBA, la de Verified Market Research (1.650 M), y para sistemas de incendio y gas, la cifra de la propia MSA (más de 3.000 M) [2-5]. El total es de unos 8.800 M USD. Estimación propia con fuentes de pago de las que solo se ven los resúmenes.',
    tamano: '≈ 8.750 M USD en 2025 (detección de gas 4.100 M [2], SCBA 1.650 M [4] y sistemas de incendio y gas ≈3.000 M [5]; estimación propia)',
    unidad_serie: 'millones de USD (detección de gas + SCBA + sistemas de incendio y gas)',
    serie: [
      { anio: '2023', tamano: 7950 }, { anio: '2024', tamano: 8340 }, { anio: '2025', tamano: 8750 }, { anio: '2026e', tamano: 9200 }, { anio: '2027e', tamano: 9680 }, { anio: '2028e', tamano: 10180 }, { anio: '2030e', tamano: 11260 },
    ],
    tcac_historico_pct: 4.9,
    tcac_previsto_pct: 5.2,
    cr5_pct: null,
    estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Normas de seguridad más exigentes y más vigiladas', efecto: '+', horizonte: 'Estructural', evidencia: 'El uso de los equipos lo exigen normas de la administración y de la industria, aplicadas cada vez más en todo el mundo [1].' },
      { driver: 'Ciclo de renovación de SCBA por la norma NFPA', efecto: '+', horizonte: 'Cíclico', evidencia: 'La dirección espera el punto de inflexión de la renovación en 2027 [9].' },
      { driver: 'Subvenciones federales a bomberos (AFG)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Convocatoria de 291,6 M en mayo-junio de 2026 tras meses de cierre del DHS; los pedidos de 2025 se retrasaron [6, 7].' },
      { driver: 'Refrigerantes A2L y detección de fugas en climatización', efecto: '+', horizonte: 'Estructural', evidencia: 'Detección creció a dos cifras en Americas en 2025 con los monitores Bacharach y Chillgard [1].' },
      { driver: 'Inversión en energía, química e infraestructura crítica', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'La guerra en Oriente Medio restó más de 1,5 puntos al crecimiento del 1S26 en detección fija [9].' },
      { driver: 'Gasto en defensa en Europa', efecto: '+', horizonte: 'Cíclico', evidencia: 'Cascos balísticos impulsaron un +27 % orgánico de EPI industrial en International en el 2T26 [9].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Pocos rivales con gama completa (Dräger, Honeywell, 3M/Scott, Teledyne, Halma/Crowcon); compiten por homologación y servicio más que por precio. Margen EBITDA de MSA del 25 % frente al 9 % de Dräger [1, 8].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes fragmentados (ninguno > 10 %); los cuerpos de bomberos compran por concurso pero quedan atados a la plataforma de SCBA [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Electrónica, botellas de aire y tejidos técnicos de pocos fabricantes; los materiales son dos tercios del coste de ventas [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Certificaciones NFPA, ATEX y SIL, responsabilidad por producto y canal de distribución especializado [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 1, justificacion: 'No hay sustituto para un SCBA o un detector certificado; la tecnología cambia el producto (conexión, sensores) pero no la necesidad [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'Lo sabemos por el crecimiento orgánico (+0,7 % en 2025, +3 % en el 1S26), la relación pedidos/facturación cercana a uno y los retrasos de AFG [1, 9]. Las ventas de MSA bajaron un 3,8 % en 2020 (1.348 M frente a 1.402 M) y volvieron a crecer en 2021; en 2009 cayeron por la industria y la minería, y en 2022 subieron un 9 % pese a la escasez de componentes [1]. Es un sector defensivo: bomberos y normas mantienen la demanda aunque la industria caiga.' },
    regulacion: 'En EE. UU., la NFPA ha refundido sus normas de equipos de bomberos (la 1981 de SCBA en la NFPA 1970), lo que abre un ciclo de renovación que la dirección sitúa en 2027 [9]. Las subvenciones AFG dependen del presupuesto anual del DHS: en 2026 el cierre retrasó la plataforma FEMA GO y la convocatoria [6, 7]. Los PFAS en los tejidos de los trajes de bomberos están bajo presión legal y regulatoria en varios estados [1]. En Europa, ATEX y la normativa de gases fluorados exigen detección de fugas de refrigerantes. Los aranceles de EE. UU. de 2025 encarecieron componentes; en 2026 se han devuelto parte de los aranceles IEEPA [9].',
    tendencias: 'La conexión de los equipos (detectores portátiles con conexión permanente, SCBA con telemetría, software MSA+ y FireGrid) convierte una venta única en servicio recurrente: MSA gana porque tiene la base instalada [1]. Los refrigerantes inflamables (A2L) multiplican la detección en climatización. La consolidación es activa (M&C y Autronica por MSA; Teledyne y Halma compran detección): MSA quiere entrar antes en el diseño de los proyectos con sistemas completos de incendio y gas [5]. Entran fabricantes asiáticos en detección portátil barata, de momento sin certificaciones de alto nivel.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 18.6,
    posicion: 'Líder en EE. UU. en SCBA y cascos de bomberos, y entre los tres primeros del mundo en detección de gas (≈19 % del mercado de detección de gas según la cifra de 4.100 M; estimación propia: 763 M de ventas de detección en 2025 entre 4.100 M) [1, 2].',
    competidores: [
      { nombre: 'Drägerwerk (seguridad)', pais: 'Alemania', ticker: 'DRW3.DE', ingresos: 4012, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival global en SCBA y detección; la mitad de su negocio es médico. Ingresos del grupo convertidos a USD [8].' },
      { nombre: 'Honeywell (Industrial Automation, seguridad)', pais: 'EE. UU.', ticker: 'HON', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Detección de gas (BW, RAE) y EPI dentro de un conglomerado; vendió parte del EPI en 2025.' },
      { nombre: '3M (Scott Safety)', pais: 'EE. UU.', ticker: 'MMM', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Principal rival en SCBA en EE. UU. (Scott) y en detección portátil.' },
      { nombre: 'Teledyne (Gas & Flame Detection)', pais: 'EE. UU.', ticker: 'TDY', ingresos: 6374, cuota_pct: null, margen_ebit_pct: null, comentario: 'Detección fija de gas y llama (Detcon, Oldham, Simtronics) dentro de instrumentación [8].' },
      { nombre: 'Halma (Crowcon y protección contra incendios)', pais: 'Reino Unido', ticker: 'HLMA.L', ingresos: 3423, cuota_pct: null, margen_ebit_pct: null, comentario: 'Detección portátil (Crowcon) y sistemas de incendio; comprador en serie [8].' },
      { nombre: 'Avon Technologies', pais: 'Reino Unido', ticker: 'AVON.L', ingresos: 326, cuota_pct: null, margen_ebit_pct: null, comentario: 'Respiración para bomberos y ejército, cascos balísticos (Team Wendy) [8].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'MSA+ y FireGrid conectan equipos, pero el valor no crece con el número de usuarios de forma relevante [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Un cuerpo de bomberos con SCBA G1 cambia de fabricante solo al renovar la flota (10-15 años), con nueva formación y repuestos [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marcas V-Gard, ALTAIR, Cairns y G1, certificaciones NFPA, ATEX y SIL; 112 años de historia en seguridad [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación integrada de SCBA, máscaras, cascos y placas, pero sin escala superior a Honeywell o 3M [1].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nichos pequeños (SCBA ≈1.650 M) donde no caben muchos fabricantes certificados [4].' },
      ],
    },
    amenazas: 'Que 3M/Scott o Dräger ganen grandes concursos de SCBA en la renovación de 2027-2029 con precio (probabilidad media; cada punto de cuota en SCBA de EE. UU. son ≈10 M de ventas). Que la detección portátil se banalice con fabricantes asiáticos y sensores baratos (media-baja). Que las demandas por PFAS en trajes dañen la marca en bomberos (baja-media). Que una compra grande (Autronica) se integre mal y diluya el margen (media) [1, 9].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la responsabilidad por producto: el pasivo heredado de la minería costó más de 600 M entre cargos y la aportación a MSA LLC (2017-2023), y ahora las demandas por PFAS en trajes de bomberos de Globe (21.372 reclamaciones) [1]. El segundo asunto es la seguridad de sus propios productos (retiradas, fallos de SCBA en incendios): un fallo grave afectaría a la marca en un mercado de concursos públicos. Los PFAS también son una oportunidad: trajes sin PFAS y nuevas normas obligan a renovar equipos.',
    controversias: 'Demandas por PFAS contra Globe desde 2024 (1.288 a feb-2026 y 1.222 a jul-2026), sin resolución [1]. Venta de MSA LLC en 2023 criticada por abogados de demandantes como forma de aislar el pasivo de la neumoconiosis; no consta litigio de transmisión fraudulenta en las cuentas [1]. Sin sanciones relevantes en tres años.',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de MSA (no localizado en EDGAR); 2) búsqueda de MSCI y Sustainalytics para MSA Safety; 3) proxy 2026', decision: 'Omitido' },
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K (mercado «muy fragmentado» sin cuotas); 2) resúmenes de Global Market Insights y Verified Market Research; 3) presentación de Autronica', decision: 'Omitido' },
  ],
};
guarda('B', B);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-26', url: 'https://www.sec.gov/Archives/edgar/data/66570/000119312526125902/d39378ddef14a.htm' },
  { id: 2, titulo: 'Form 4 de MSA Safety (oct-2025 a oct-2026), resumen con herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000066570&type=4' },
  { id: 3, titulo: 'Octavio Marquez Elected to MSA Safety Board of Directors (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-21', url: `${EDGAR}/000006657026000022/ex991-marquezdirectorelect.htm` },
  { id: 4, titulo: 'Robert Bruggeworth elected Chairman of MSA Safety Inc.', editor: 'Qorvo (nota de prensa)', tipo: 'Prensa', fecha: '2026-05', url: 'https://qorvo.com/newsroom/news/2026/robert-bruggeworth-elected-chairman-of-msa-safety-inc' },
  { id: 5, titulo: 'Form 10-K 2025 y notas de resultados 2025-2026 (guía anual)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000006657026000005/msa-20251231.htm` },
  { id: 6, titulo: 'MSA Safety Announces Second Quarter 2026 Results (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${EDGAR}/000006657026000025/ex991-earningspressrelease.htm` },
];
const C = {
  _estado: 'Completa con el proxy 2026, los 8-K y los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Steven C. Blanco', cargo: 'Presidente ejecutivo (President) y consejero delegado', desde: '2024', participacion_pct: 0.05, trayectoria: 'Consejero delegado desde mayo de 2024 (antes dirigió el negocio de la empresa). Con él, el margen EBITDA ajustado subió del 25,2 % de 2025 al 26,1 % del 1S26 y lanzó la estrategia «Accelerate» con M&C y Autronica [1, 6].' },
      { nombre: 'Julie A. Beck', cargo: 'Directora financiera', desde: '2025', participacion_pct: 0.0, trayectoria: 'Directora financiera desde el 18-ago-2025. Compró 448 acciones a 158,69 USD en junio de 2026 [1, 2].' },
      { nombre: 'Robert A. Bruggeworth', cargo: 'Presidente no ejecutivo del consejo', desde: '2007', participacion_pct: 0.1, trayectoria: 'Consejero desde 2007 y consejero independiente coordinador hasta mayo de 2026, cuando sustituyó a Nish Vartanian como presidente; ex consejero delegado de Qorvo [1, 3, 4].' },
      { nombre: 'Nishan J. Vartanian', cargo: 'Consejero (ex presidente y consejero delegado)', desde: '2017', participacion_pct: 0.4, trayectoria: 'Consejero delegado de 2018 a 2024: vendió MSA LLC y su pasivo en 2023 y compró Bacharach. Vendió 20.000 acciones (3,9 M) en agosto de 2026 [1, 2].' },
      { nombre: 'Jonathan D. Buck', cargo: 'Director de contabilidad', desde: '2024', participacion_pct: 0.0, trayectoria: 'Responsable contable; vendió acciones por 0,37 M en 12 meses [2].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Crecimiento orgánico de un dígito bajo', real: '+0,7 % orgánico (en el rango, en su parte baja)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Un dígito medio orgánico; total de dos cifras bajas con compras (julio)', real: '+3 % orgánico en el 1S26 (en curso)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo de la casa: el consejero delegado llegó en 2019 y la directora financiera en 2025, en una sucesión ordenada (Vartanian pasó a presidente y en mayo de 2026 cedió la presidencia a un independiente) [1, 4]. La guía es prudente y de un solo dato (crecimiento orgánico); en 2025 la cumplió en la parte baja, con los retrasos de AFG, y para 2026 la mantiene pese a un 1S26 del +3 % [5, 6]. No encontramos las guías de 2021-2024 con fuente primaria. La nueva dirección es más compradora (744 M en dos compras en 14 meses), lo que exige vigilar el rendimiento del capital; el ROIC incremental de las compras aún no se puede medir.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Robert A. Bruggeworth', cargo: 'Presidente no ejecutivo', tipo: 'Independiente', desde: '2007', comisiones: 'Presidencia del consejo' },
      { nombre: 'Steven C. Blanco', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Nishan J. Vartanian', cargo: 'Consejero (ex consejero delegado)', tipo: 'Otro externo', desde: '2017', comisiones: '—' },
      { nombre: 'William M. Lambert', cargo: 'Consejero (ex consejero delegado hasta 2018)', tipo: 'Independiente', desde: '2007', comisiones: 'Varias' },
      { nombre: 'Diane M. Pearse', cargo: 'Consejera', tipo: 'Independiente', desde: '2004', comisiones: 'Auditoría' },
      { nombre: 'Sandra L. Phillips', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: 'Gobierno corporativo (presidenta)' },
      { nombre: 'Luca Savi', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Remuneración' },
      { nombre: 'Gregory B. Jordan', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Gobierno corporativo' },
      { nombre: 'William R. Sperry', cargo: 'Consejero', tipo: 'Independiente', desde: '2019', comisiones: 'Auditoría' },
      { nombre: 'Octavio Marquez', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Por asignar' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 97.2, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 6.43, fijo: 0.94, variable_corto: 0.77, variable_largo: 4.12, ratio_salario_medio: 88 },
    remuneracion: 'El variable anual depende de objetivos financieros de la empresa; el variable a largo plazo (el 80 % en acciones por objetivos para el consejero delegado) se mide a tres años con el margen EBITDA ajustado (50 %) y el crecimiento de ventas (50 %), corregido por la rentabilidad total para el accionista frente a un grupo de comparables (entre 0,8 y 1,2) [1]. No hay ROIC: premia crecer y el margen, no el rendimiento del capital, algo a vigilar con una dirección compradora. El grant de 2023 pagó el 180 % del objetivo con una rentabilidad relativa en el percentil 36 [1]. Hay recuperación obligatoria (clawback) [1]. Remuneración del consejero delegado de 6,43 M en 2025, 88 veces la del empleado mediano; 97,2 % a favor en la junta de 2025 [1].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 9.7, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 8.1, tipo: 'Institucional', variacion: 'Estable' },
      { nombre: 'John T. Ryan III (familia fundadora)', pct: 5.2, tipo: 'Familia', variacion: 'Estable' },
    ],
    insiders: [
      { fecha: '2026-08-07', persona: 'Nishan J. Vartanian (consejero)', operacion: 'Venta', acciones: 20000, importe: 3.88 },
      { fecha: '2026-08-04', persona: 'Jonathan D. Buck (director de contabilidad)', operacion: 'Venta', acciones: 469, importe: 0.09 },
      { fecha: '2026-06-11', persona: 'Julie A. Beck (directora financiera)', operacion: 'Compra', acciones: 448, importe: 0.07 },
      { fecha: '2026-02-17', persona: 'Jonathan D. Buck (director de contabilidad)', operacion: 'Venta', acciones: 1100, importe: 0.22 },
      { fecha: '2025-11-25', persona: 'Jonathan D. Buck (director de contabilidad)', operacion: 'Venta', acciones: 333, importe: 0.05 },
    ],
    control_y_defensas: 'Sin accionista de control: los mayores son Vanguard (9,7 %) y BlackRock (8,1 %); la familia Ryan, fundadora, conserva el 5,2 % [1]. Hay una pequeña clase de acciones preferentes acumulativas al 4,5 % sin peso en el voto. El consejo está escalonado (cada consejero se elige para tres años), una defensa clásica de las empresas de Pensilvania, y la ley de ese estado incluye protecciones contra tomas de control [1]. No hay operaciones vinculadas relevantes. Desde mayo de 2026 la presidencia es de un independiente y desaparece la figura de consejero coordinador [1, 4].',
    alertas: [
      'Consejo escalonado (mandatos de tres años) y ley antiopas de Pensilvania.',
      'Variable a largo plazo sin ROIC (margen y crecimiento de ventas) con una dirección que compra empresas.',
      'Ventas del ex consejero delegado (3,9 M en agosto de 2026) y ninguna compra relevante de directivos en 12 meses [2].',
    ],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (MSA, SPY, XLI) con herramientas/bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/MSA/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de MSA (7 analistas de BPA, objetivo 209,14) y datos de comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MSA/analysis' },
  { id: 3, titulo: 'Market Yield on U.S. Treasury Securities at 10-Year Constant Maturity (DGS10): 5,21 % el 13-oct-2026', editor: 'Federal Reserve Bank of St. Louis (FRED)', tipo: 'Datos de mercado', fecha: '2026-10-13', url: 'https://fred.stlouisfed.org/series/DGS10' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'MSA Safety to Acquire Autronica Fire and Security (8-K, anexo 99.1)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-05', url: `${EDGAR}/000114036126019007/ny20072200x1_ex99-1.htm` },
  { id: 6, titulo: 'Form 10-K 2025 (M&C, Bacharach, MSA LLC)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-12', url: `${EDGAR}/000006657026000005/msa-20251231.htm` },
  { id: 7, titulo: 'Form 10-Q 2T26 (acciones en circulación a 30-jun-2026: 38,60 M; deuda; Autronica)', editor: 'MSA Safety Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${EDGAR}/000006657026000027/msa-20260630.htm` },
  { id: 8, titulo: 'MSA Safety Q2 2026 Earnings Call Transcript (guía de 2026)', editor: 'Webull (transcripción de terceros)', tipo: 'Prensa', fecha: '2026-07-31', url: 'https://www.webull.com/news/15364816049169408' },
  { id: 9, titulo: 'MSA Safety: informe de Sure Dividend (5-ago-2026)', editor: 'Sure Dividend', tipo: 'Analistas', fecha: '2026-08-05', url: 'https://www.suredividend.com/wp-content/uploads/2026/08/MSA-2026-08-05.pdf' },
];
const ann = 45.67 * 0.6932; // precio de Ansell en USD
const D = {
  _estado: 'Completa. Precio, betas y cierres de bolsa.mjs; consenso y comparables de Yahoo (un solo proveedor).',
  identificacion: {
    nombre: 'MSA Safety Incorporated', nombre_corto: 'MSA Safety', ticker: 'MSA', isin: 'US5534981064', mercado: 'NYSE', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industrials', industria: 'Commercial Services & Supplies (Office Services & Supplies, GICS)', sede: 'Cranberry Township (Pensilvania)', fundacion: '1914', empleados: 5300, web: 'www.msasafety.com',
    precio: BO.identificacion.precio, fecha_precio: BO.identificacion.fecha_precio, acciones: 38.68, capitalizacion_publicada: 7004.7, free_float_pct: 94.0,
    max_52s: BO.identificacion.max_52s, min_52s: BO.identificacion.min_52s, volumen_medio_diario: '≈ 47,9 M USD/día (3 meses)', proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de 2026 (31-jul-2026): crecimiento orgánico de un dígito medio, aportación de compras de un dígito medio y divisa de +1-2 puntos, es decir, ventas totales de dos cifras bajas; margen bruto ajustado del 47,5-48,5 %, gastos financieros de 40-43 M; tipo impositivo e ingresos por pensiones sin cambios [8]. La guía orgánica es la misma desde febrero de 2026; la total subió con Autronica. No hay plan a medio plazo publicado con cifras.',
    estimaciones: [
      { periodo: '2026e', ingresos: 2084.4, ebitda: null, ebit: null, bpa: 9.07, dpa: 2.14, fuente: 'Yahoo Finance (7 analistas; BPA ajustado de la empresa)' },
      { periodo: '2027e', ingresos: 2273.5, ebitda: null, ebit: null, bpa: 9.93, dpa: null, fuente: 'Yahoo Finance (7 analistas; BPA ajustado de la empresa)' },
    ],
    recomendaciones: { n_analistas: 7, comprar: 2, mantener: 5, vender: 0, po_medio: 209.14, po_min: 190, po_max: 223 },
    revisiones: 'El BPA ajustado de 2026 pasó de 8,88 USD hace 90 días a 9,07 (+2,2 %) y el de 2027 de 9,70 a 9,93 (+2,4 %), tras batir el consenso en el 2T26 (2,40 frente a 2,14) y por la incorporación de Autronica; en los últimos 30 días bajaron un 1 % [2]. Solo hay una fuente gratuita con estimaciones completas (Yahoo, 7 analistas); el objetivo y las recomendaciones se contrastan con Sure Dividend, que en agosto daba un valor razonable de 193 USD y Mantener [9]. El BPA del consenso es el ajustado de la empresa (sin amortización de intangibles comprados, diferencias de cambio, reestructuración ni costes de compras), unos 0,8 USD por encima del publicado en 2025 [2].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 1.6,
    confianza: 'Media',
  },
  bolsa: { ...BO.bolsa, posicion_corta_pct: null, comentario: null, confianza: 'Alta' },
  multiplos_historicos: {
    serie: BO.cierres_ejercicio.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2017', '2021', '2023'].includes(c.anio) })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Seis cotizadas de seguridad y detección certificada: Dräger (SCBA y detección; la mitad es médica), Halma (detección y protección contra incendios), Avon Technologies (respiración y cascos), Ansell (EPI), Teledyne (detección de gas y llama dentro de instrumentación) y Fortive (instrumentación, antes dueña de Industrial Scientific). Fuera Honeywell (escisiones en curso que distorsionan las cifras), 3M (litigios y conglomerado) y Lakeland (pérdidas). Datos de Yahoo a 15-oct-2026, en USD; los PER son del BPA ajustado del consenso de cada empresa.',
    empresas: [
      { nombre: 'Drägerwerk', ticker: 'DRW3.DE', pais: 'DE', capitalizacion: 2147, ev_ventas: 0.67, ev_ebitda_ltm: 7.6, ev_ebitda_ntm: 7.3, per_ntm: 11.6, crecimiento_pct: 4.7, margen_ebitda_pct: 8.7, roic_pct: null, dn_ebitda: 0.6, fcf_yield_pct: 6.0 },
      { nombre: 'Halma', ticker: 'HLMA.L', pais: 'GB', capitalizacion: 17450, ev_ventas: 5.4, ev_ebitda_ltm: 22.3, ev_ebitda_ntm: 18.4, per_ntm: 23.0, crecimiento_pct: 21.3, margen_ebitda_pct: 24.1, roic_pct: null, dn_ebitda: 1.2, fcf_yield_pct: null },
      { nombre: 'Avon Technologies', ticker: 'AVON.L', pais: 'GB', capitalizacion: 941, ev_ventas: 2.4, ev_ebitda_ltm: 20.7, ev_ebitda_ntm: 18.1, per_ntm: 21.2, crecimiento_pct: 14.0, margen_ebitda_pct: 11.5, roic_pct: null, dn_ebitda: 2.0, fcf_yield_pct: 1.0 },
      { nombre: 'Ansell', ticker: 'ANN.AX', pais: 'AU', capitalizacion: 4455, ev_ventas: 2.2, ev_ebitda_ltm: 12.8, ev_ebitda_ntm: 12.2, per_ntm: r1(ann / 1.678), crecimiento_pct: 5.5, margen_ebitda_pct: 17.4, roic_pct: null, dn_ebitda: 1.4, fcf_yield_pct: 3.2 },
      { nombre: 'Teledyne', ticker: 'TDY', pais: 'US', capitalizacion: 28226, ev_ventas: 4.7, ev_ebitda_ltm: 18.8, ev_ebitda_ntm: 17.5, per_ntm: 23.1, crecimiento_pct: 7.5, margen_ebitda_pct: 25.0, roic_pct: null, dn_ebitda: 1.1, fcf_yield_pct: 3.2 },
      { nombre: 'Fortive', ticker: 'FTV', pais: 'US', capitalizacion: 17288, ev_ventas: 4.8, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: 15.9, per_ntm: 17.9, crecimiento_pct: 4.3, margen_ebitda_pct: 28.6, roic_pct: null, dn_ebitda: 2.6, fcf_yield_pct: 5.4 },
    ],
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Autronica Fire and Security (Noruega)', comprador: 'MSA Safety', ev: 555, ev_ventas: 3.47, ev_ebitda: 17.3, prima_pct: null, excluir: false, comentario: '160 M de ventas en 2025 con margen EBITDA ajustado del ≈20 % [5].' },
      { fecha: '2025-05', objetivo: 'M&C TechGroup (Alemania)', comprador: 'MSA Safety', ev: 189, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Sin múltiplo publicado; aportó 40,9 M de ventas en ocho meses de 2025 [6].' },
      { fecha: '2021-01', objetivo: 'Bacharach (EE. UU.)', comprador: 'MSA Safety', ev: 337, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Detección de refrigerantes; múltiplo no publicado [6].' },
    ],
    comentario: 'Solo hay una operación con múltiplo publicado: Autronica, a 17,3 veces el EBITDA ajustado y 3,5 veces las ventas, por encima de los 14,4 veces el EBITDA de los últimos 12 meses a los que cotiza MSA [5]. Las compras de detección se pagan caras porque son negocios con recambios y servicio. MSA no es objetivo probable: sin accionista de control, pero con consejo escalonado y ley de Pensilvania, y con un valor de 8.000 M que solo encaja en Honeywell, 3M o un fondo grande. Las transacciones no pesan en la valoración.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA y EBIT del consenso; BPA de 2028', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo BPA y ventas, dos ejercicios); 2) MarketScreener (no carga sin JavaScript); 3) Stock Analysis (solo ventas y BPA)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos de M&C, Bacharach y operaciones de terceros', tipo: 'Complemento', intentos: '1) 10-K 2025 y 2021 (sin EBITDA de las compradas); 2) notas de prensa de las compras; 3) prensa sectorial', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary; 2) FINRA (sin acceso directo); 3) Stock Analysis', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits $MSA (API pública de mensajes)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/MSA.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de MSA (RSS, jun-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/MSA' },
  { id: 3, titulo: 'MSA Safety: Industrial PPE Up, Fire Service And Detection Mixed', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-09-03', url: 'https://seekingalpha.com/symbol/MSA' },
  { id: 4, titulo: 'MSA Safety: A Recipe For Growth', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-06-15', url: 'https://seekingalpha.com/article/4915113-msa-safety-a-recipe-for-growth' },
  { id: 5, titulo: 'The 2026 Dividend Kings: A Complete List and Analysis (actualizado 07-oct-2026)', editor: 'Dividend Power', tipo: 'Foros y redes', fecha: '2026-10-07', url: 'https://www.dividendpower.org/dividend-kings-list/' },
];
const E = {
  _estado: 'Completa con lo que abre (Stocktwits y Seeking Alpha); Reddit no abre. Empresa poco comentada.',
  sentimiento: {
    tono: 'Neutro', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($MSA)', fecha: '2026-10', n_comentarios: 25, tono: 'Neutro', resumen: 'Poco debate: resúmenes automáticos de resultados, señales de opciones y listas de «reyes del dividendo»; tras el 2T26 algún comentario sobre una cotización «muy controlada» [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-09', n_comentarios: 6, tono: 'Dividido', resumen: 'Un artículo de junio la ve como «receta de crecimiento» por detección y compras; otro de septiembre destaca el EPI industrial y ve bomberos y detección «mixtos» [3, 4].' },
      { plataforma: 'Seeking Alpha (noticias y comentarios de resultados)', fecha: '2026-08', n_comentarios: 8, tono: 'Positivo', resumen: 'Los titulares subrayan que batió el BPA en 26 céntimos en el 2T26 y la subida de la guía total con Autronica [2].' },
      { plataforma: 'Blogs de dividendos (Dividend Power)', fecha: '2026-10', n_comentarios: 5, tono: 'Positivo', resumen: 'Aparece en las listas de «reyes del dividendo» por sus 56 años de subidas; se valora la seguridad del dividendo más que el crecimiento [5].' },
    ],
    temas: [
      { tema: 'Dividendo creciente y calidad defensiva', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: 56 años de subidas, pero la rentabilidad es solo del 1,2 % y la última subida fue del 1,9 %.' },
      { tema: 'Compras (Autronica) y crecimiento en detección', postura: 'Dividida', peso: 'Medio', contraste: 'Autronica se pagó a 17,3 veces el EBITDA y sube la deuda neta a ≈1,8x; el informe la incluye con su coste.' },
      { tema: 'Retraso de los pedidos de bomberos (AFG)', postura: 'Bajista', peso: 'Medio', contraste: 'Cierto en 2025-2026 (bomberos −9 % en 2025); la dirección espera la renovación por la norma NFPA en 2027.' },
      { tema: 'Bate el consenso pero la acción no sube', postura: 'Dividida', peso: 'Bajo', contraste: 'Rentabilidad anual de 5,1 % a cinco años frente al 13,0 % del S&P 500: el mercado pagaba un PER alto que se ha ido comprimiendo.' },
    ],
    lectura: null,
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
