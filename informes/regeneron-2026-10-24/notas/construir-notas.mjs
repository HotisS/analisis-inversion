// Escribe las notas A-E de Regeneron (REGN, corte 2026-10-24, precio de cierre del 23-oct-2026) a partir de los documentos
// de notas/docs (EDGAR: 10-K 2025, 10-Q 2T26, notas de resultados, 8-K, proxy 2026), del XBRL de la SEC (cuentas-xbrl.json),
// de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 24-oct-2026) y de form4.txt. Cada nota cita solo con [n] de su lista.
// Ejecutar: node informes/regeneron-2026-10-24/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/872589';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, notas, patentes (Dupixent 2031), clientes, empleados, litigios (Departamento de Justicia), deuda y auditor', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000087258926000008/regn-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, flujos del semestre, acciones a 23-jul-2026, acuerdos con el Gobierno de EE. UU. (precio de nación más favorecida), litigio con Sanofi', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000025/regn-20260630.htm` },
  { id: 3, titulo: 'Regeneron Reports Second Quarter 2026 Financial and Operating Results', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000023/exhibit991q22026.htm` },
  { id: 4, titulo: 'Regeneron Reports First Quarter 2026 Financial and Operating Results', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-29', url: `${ED}/000087258926000014/exhibit991q12026.htm` },
  { id: 5, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2025 Financial and Operating Results', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-30', url: `${ED}/000087258926000004/exhibit991q42025.htm` },
  { id: 6, titulo: 'Regeneron Reports Third Quarter 2025 Financial and Operating Results', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-28', url: `${ED}/000087258925000026/exhibit991q32025.htm` },
  { id: 7, titulo: 'XBRL company facts de Regeneron (cuenta, balance y flujos 2016-2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-24', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000872589.json' },
  { id: 8, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2023 Financial and Operating Results (cifras de 2023 y 2022)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-02-02', url: `${ED}/000180422024000006/exhibit991q42023.htm` },
  { id: 9, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2021 Financial and Operating Results (cifras de 2021 y 2020)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-02-04', url: `${ED}/000180422022000004/exhibit991q42021.htm` },
  { id: 10, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2019 Financial and Operating Results (BPA ajustado de 2019 y 2018)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2020-02-06', url: `${ED}/000153217620000005/exhibit991q42019.htm` },
  { id: 11, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2017 Financial and Operating Results (BPA ajustado de 2017 y 2016)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2018-02-08', url: `${ED}/000153217618000010/exhibit991q42017.htm` },
  { id: 12, titulo: 'Form 8-K: sexta enmienda del acuerdo de anticuerpos con Sanofi (1.000 M USD por adelantado y hasta 7.000 M en hitos; fin del litigio) y cargo de I+D adquirida del 3T26 (≈ 22 M)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-06', url: `${ED}/000110465926113895/tm2627077d1_8k.htm` },
  { id: 13, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2024 Financial and Operating Results (guía de 2025)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-04', url: `${ED}/000180422025000007/exhibit991q42024.htm` },
  { id: 14, titulo: 'Form 8-K: presentación en J.P. Morgan, cargo de I+D adquirida del 4T25 y aportación de 60 M a Good Days', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-12', url: `${ED}/000110465926002691/tm262861d1_8k.htm` },
];

const anios = ['2021', '2022', '2023', '2024', '2025'];
// Caja = «cash and marketable securities» del balance de las notas de resultados (efectivo + valores negociables a corto y
// largo plazo, incluidas acciones cotizadas) [5, 8, 9]. Deuda = bonos de 2030 (1,75 %) y 2050 (2,80 %) [1, 7].
// Arrendamientos = solo el financiero (720 M, financiación del arrendamiento del campus de Tarrytown) [1, 5]; los operativos
// quedan fuera (US GAAP). Coste de ventas = coste de los productos vendidos + coste de fabricación para socios (COCM),
// que la empresa factura y recupera dentro de los ingresos [5, 8, 9].
const CAJA = { 2021: 12532.7, 2022: 14334.1, 2023: 16241.3, 2024: 17912.6, 2025: 18865.8 };
const ARREND = { 2021: 719.7, 2022: 720.0, 2023: 720.0, 2024: 720.0, 2025: 720.0 };
const COSTE = { 2021: 2437, 2022: 1560, 2023: 1816, 2024: 1970.5, 2025: 2100.7 };
const DPA = { 2021: 0, 2022: 0, 2023: 0, 2024: 0, 2025: 3.52 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, coste_ventas: COSTE[c.periodo], participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, dpa: DPA[c.periodo], dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, caja: CAJA[b.periodo], arrendamientos: ARREND[b.periodo], fondo_comercio: 0, minoritarios: 0, activos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, dividendos: f.dividendos ?? 0, recompras: f.recompras ?? 0, desinversiones: f.desinversiones ?? 0, adquisiciones: f.adquisiciones ?? 0 };
  delete o.fin; return o;
});

// Trimestres [3-6]: EBITDA = resultado operativo + amortización del año repartida por igual (estimación propia: 120,7 M por
// trimestre en 2024, 135,9 en 2025 y 123,5 en 2026, de 482,9, 543,7 y 246,9 M del semestre [1, 2]). BPA ajustado (no GAAP) diluido.
const trim = (p, ing, g, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(oi + da), margen_ebitda_pct: r2((oi + da) / ing * 100), bpa, vs_consenso: vs });

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados de 2017-2026. Caja = efectivo y valores negociables (la empresa los presenta juntos). Deuda = bonos de 2030 y 2050; arrendamiento financiero de 720 M aparte. Dividendo desde 2025.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 15534.7, ebitda: 4371.7, ebit: 3843.1, beneficio_neto: 4328.7, bpa: 40.41, dpa: 3.64, dpa_extraordinario: 0, fcf: 3760.4, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 176.1 },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 16.071,7 M USD en 2021 a 14.342,9 M en 2025: 2021 está inflado por el anticuerpo contra la COVID (REGEN-COV), que desapareció en 2022, y desde entonces el grupo crece poco porque EYLEA en EE. UU. cae (de 6.265 M en 2022 a 4.385 M en 2025 con EYLEA HD incluido) mientras sube la parte de Regeneron en los beneficios de Dupixent (colaboración con Sanofi: de 2.856 M a 5.884 M) [5, 8]. En 2026 el crecimiento vuelve: +19,0 % en el 1T y +16,7 % en el 2T, con Dupixent +38 %, EYLEA HD +52 % y Libtayo +30 % [3, 4]. El margen operativo bajó del 32,9 % de 2022 al 24,9 % de 2025 por la I+D (de 3.593 M a 5.850 M) y la caída de EYLEA; en el 1S26 fue del 24,5 %, con 176,1 M de costes por la parada temporal de la fábrica de Limerick y 228,9 M de I+D adquirida [2, 3].',
    ajustes: 'La empresa publica un BPA ajustado (no GAAP) que quita los pagos en acciones (993,7 M en 2025), la amortización de intangibles (131,7 M en el coste de ventas), los costes de litigios y de compras, el bono de revisión prioritaria (155 M en 2025) y, sobre todo, las ganancias y pérdidas de valor de su cartera de acciones y bonos (−946,1 M en 2025: una ganancia que el ajustado quita) [5]. El ajustado fue de 44,31 USD en 2025 frente a 41,48 del GAAP [5]. No recurrente dentro del EBITDA de los últimos doce meses: 176,1 M de la parada de Limerick (161,3 M en coste de ventas y 14,8 M en COCM, 1S26) [3]. La I+D adquirida (124,1 M en 2025, 228,9 M en el 1S26) no se ajusta: es recurrente en esta empresa [3, 5].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 3720.7, null, 1179.5, 120.7, 12.46, null),
      trim('4T24', 3789.2, null, 990.2, 120.7, 12.07, null),
      trim('1T25', 3028.7, null, 591.7, 135.9, 8.22, null),
      trim('2T25', 3675.6, null, 1079.5, 135.9, 12.89, null),
      trim('3T25', 3754.3, 0.9, 1026.8, 135.9, 11.83, null),
      trim('4T25', 3884.3, 2.5, 879.9, 135.9, 11.44, null),
      trim('1T26', 3605.4, 19.0, 642.9, 123.5, 9.47, null),
      trim('2T26', 4290.7, 16.7, 1293.5, 123.5, 14.29, 'Superior'),
    ],
    ultima_presentacion: 'En el 2T26 (30-jul-2026) la dirección destacó el segundo trimestre seguido de crecimiento de dos cifras en ventas y BPA ajustado (+17 % y +11 %) y que la deuda de desarrollo con Sanofi quedó pagada a 30 de junio: desde el 3T26 ya no se descuenta de su parte en los beneficios de Dupixent, lo que según el director financiero «impulsará un salto significativo» de los beneficios de la colaboración [3]. Subió la guía de margen bruto (78-79 % frente a 77-78 %) y bajó la de capex (1.030-1.100 M frente a 1.100-1.200 M) [3]. Explicó que la caída del margen bruto de producto (78 % frente a 83 %) se debe a la parada temporal de la producción a granel en Limerick, ya normalizada [3]. En el 1T26 (29-abr) el mensaje fue el mismo sobre EYLEA HD y Dupixent, con el fracaso de fianlimab en melanoma pendiente (se conoció el 18-may) [4]. La guía es solo de gastos: la empresa no da objetivos de ventas ni de beneficio [3].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2030', importe: 1250 }, { anio: '2050', importe: 750 }],
    liquidez: 'Caja y valores negociables de 17.822,9 M USD a 30-jun-2026 y línea de crédito no dispuesta de 750 M hasta diciembre de 2027 [1, 3]. Después del balance: 1.000 M a cobrar de Sanofi por la sexta enmienda (octubre de 2026) [12].',
    rating: 'Grado de inversión; el 10-K no publica la calificación y no se ha comprobado en la agencia [1].',
    coste_deuda_pct: 2.2, vida_media_anios: 9.9,
    otros_pasivos: 'Deuda financiera de 1.986,6 M a 30-jun-2026: 1.250 M de bonos al 1,75 % con vencimiento en septiembre de 2030 y 750 M al 2,80 % en 2050 (intereses de 44,4 M al año) [1]. Arrendamiento financiero de 720 M (financiación del campus de Tarrytown, con las mismas obligaciones que la línea de crédito) [1]. Litigios: demanda civil del Departamento de Justicia (Massachusetts, junio de 2020) por el apoyo a fundaciones que ayudan a pagar los copagos de EYLEA, con una segunda petición de sentencia parcial del fiscal en octubre de 2025, y otro procedimiento sobre comisiones de tarjetas en la declaración del precio medio de venta; sin provisión cuantificada en el 10-K [1]. La empresa cumple los covenants [1].',
    comentario: 'El balance es de caja neta: 18.865,8 M USD de caja y valores negociables frente a 1.985,9 M de bonos a fin de 2025 [5]. La caja ha subido poco desde 2023 (16.241,3 M) pese al flujo libre de 4.000-4.500 M al año porque la empresa recompra acciones: 2.235 M en 2023, 2.603 M en 2024, 3.439 M en 2025 y 2.017 M en el 1S26, más 532-1.029 M al año de acciones retenidas para impuestos de los empleados [1, 2, 5]. El circulante comercial es alto (clientes 5.741,1 M y existencias 3.200,8 M en 2025): los clientes incluyen lo que debe Sanofi por la parte de Regeneron en los beneficios de Dupixent [1, 5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión es buena: flujo operativo de 4.978,9 M USD en 2025 (111 % del beneficio neto, que incluye 946,1 M de ganancias no realizadas de la cartera) y flujo libre de 4.080,5 M [5]. En el 1S26, 1.891,9 M de flujo operativo y 1.421,1 M libres (menos que un año antes por el circulante: clientes +824 M con el aumento de los beneficios de Dupixent) [3]. El capex sube (898,4 M en 2025, 6,3 % de las ventas; guía de 1.030-1.100 M en 2026) por la nueva fábrica de Saratoga Springs y el compromiso de invertir en EE. UU. de los acuerdos con el Gobierno [2, 3]. La empresa no separa mantenimiento de crecimiento; estimación propia: el mantenimiento es del orden de la amortización de inmovilizado (364,8 M en 2025) [1]. Aparte, pagos por intangibles de 315,3 M en 2025 (licencias), fuera del capex [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP', anios_auditor: 37, opinion: 'Favorable (cuentas de 2025 y control interno) [1].',
    comentario: 'Las cuentas son limpias pero tienen dos zonas de juicio. La primera son los ingresos de colaboración: Regeneron no vende Dupixent; Sanofi lo vende y le paga la mitad del beneficio, que Regeneron registra con los datos que le da Sanofi; por eso demandó a Sanofi para auditar esa información, y el pleito se retiró con la sexta enmienda de octubre de 2026 [2, 12]. La segunda es la cartera de inversiones: las ganancias y pérdidas de valor pasan por la cuenta (−946,1 M de ganancias en 2025, +266,4 M de pérdidas en 2023) y mueven el BPA GAAP; el ajustado las quita [1, 5]. Los pagos en acciones son altos (993,7 M, el 22 % del beneficio neto de 2025) y la dilución se compensa con recompras [1]. El tipo impositivo es bajo (13,9 % en 2025) por los beneficios en Irlanda y el crédito de I+D [5].',
    senales: [
      { senal: 'Pagos en acciones altos', nivel: 'Media', comentario: '993,7 M en 2025 (6,9 % de las ventas) y un plan de acciones de 10 años para el consejero delegado y el director científico aprobado el 24-sep-2026 (hasta 2,7 y 2,9 M de acciones) [1, 12].' },
      { senal: 'Ganancias de la cartera en el BPA GAAP', nivel: 'Media', comentario: '946,1 M de ganancias en 2025 (8,7 USD por acción); por eso usamos el BPA ajustado [5].' },
      { senal: 'Ingresos de colaboración con datos del socio', nivel: 'Baja', comentario: 'La parte de los beneficios de Dupixent se calcula con datos de Sanofi; el litigio por el acceso a esa información terminó en octubre de 2026 [2, 12].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'EYLEA HD y EYLEA (EE. UU.)', descripcion: 'Aflibercept para enfermedades de la retina; ventas propias en EE. UU.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 6265, resultado: null }, { periodo: '2023', ingresos: 5886, resultado: null }, { periodo: '2024', ingresos: 5968, resultado: null }, { periodo: '2025', ingresos: 4385, resultado: null }] },
      { nombre: 'Colaboración con Sanofi', descripcion: 'Mitad del beneficio mundial de Dupixent y Kevzara, más el reembolso de la fabricación.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 2856, resultado: null }, { periodo: '2023', ingresos: 3800, resultado: null }, { periodo: '2024', ingresos: 4531, resultado: null }, { periodo: '2025', ingresos: 5884, resultado: null }] },
      { nombre: 'Colaboración con Bayer', descripcion: 'Parte del beneficio de EYLEA y EYLEA 8 mg fuera de EE. UU., más fabricación.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 1431, resultado: null }, { periodo: '2023', ingresos: 1487, resultado: null }, { periodo: '2024', ingresos: 1499, resultado: null }, { periodo: '2025', ingresos: 1422, resultado: null }] },
      { nombre: 'Otros productos propios', descripcion: 'Libtayo (mundial), Praluent y Evkeeza (EE. UU.), Inmazeb, Lynozyfic y otros.', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 629, resultado: null }, { periodo: '2023', ingresos: 1192, resultado: null }, { periodo: '2024', ingresos: 1661, resultado: null }, { periodo: '2025', ingresos: 1924, resultado: null }] },
      { nombre: 'Otras colaboraciones y otros ingresos', descripcion: 'Regalías de Praluent fuera de EE. UU. y otros acuerdos (en 2022 aún había ingresos de la COVID con Roche).', tipo_resultado: null, historico: [{ periodo: '2022', ingresos: 992, resultado: null }, { periodo: '2023', ingresos: 752, resultado: null }, { periodo: '2024', ingresos: 543, resultado: null }, { periodo: '2025', ingresos: 728, resultado: null }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Ventas mundiales de Dupixent (M USD, las registra Sanofi)', valor_anterior: '14.148,0 (2024)', valor_actual: '17.806,7 (2025)', variacion: '+26 %', comentario: '1S26: 10.878,3 M (+36 %); 2T26: 5.998,2 M (+38 %) [3, 5].' },
      { kpi: 'Ventas de EYLEA HD en EE. UU. (M USD)', valor_anterior: '1.201 (2024)', valor_actual: '1.637 (2025)', variacion: '+36 %', comentario: '2T26: 596 M (+52 %); ya vende más que EYLEA de 2 mg (412 M, −45 %) [3, 5].' },
      { kpi: 'Ventas de EYLEA de 2 mg en EE. UU. (M USD)', valor_anterior: '4.767 (2024)', valor_actual: '2.748 (2025)', variacion: '−42 %', comentario: 'Biosimilares (Pavblu de Amgen desde octubre de 2024) y paso a EYLEA HD [5].' },
      { kpi: 'Ventas mundiales de Libtayo (M USD)', valor_anterior: '1.217 (2024)', valor_actual: '1.453 (2025)', variacion: '+19 %', comentario: '2T26: 489 M (+30 %) [3, 5].' },
      { kpi: 'Parte de Regeneron en los beneficios de la colaboración con Sanofi (M USD)', valor_anterior: '3.923,5 (2024)', valor_actual: '5.241,6 (2025)', variacion: '+34 %', comentario: '2T26: 2.032,6 M (+59 %); sin descuento de la deuda de desarrollo desde el 3T26 [3, 5].' },
      { kpi: 'Concentración de clientes de producto', valor_anterior: '—', valor_actual: '77 % (2025)', variacion: '—', comentario: 'Dos distribuidores de EE. UU. suman el 77 % de las ventas brutas de producto [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'crecimiento_pct (3T24-2T25) y vs_consenso (3T24-1T26)', tipo: 'Complemento', intentos: '1) Notas de resultados de la empresa (no dan consenso; la comparación es con el año anterior en las que hemos descargado); 2) Yahoo Finance (solo el último trimestre); 3) titulares de Seeking Alpha (solo el 2T26)', decision: 'Omitido' },
    { seccion: 'negocio', campo: 'geografias', tipo: 'Complemento', intentos: '1) 10-K 2025 (no da ingresos por país: la mayor parte llega por colaboraciones mundiales); 2) notas de resultados (solo EE. UU. y resto del mundo por producto); 3) XBRL (sin desglose geográfico de ingresos totales)', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Anti-VEGF Therapeutics Market Size (16.900 M USD en 2024, 18.200 M en 2025, 28.600 M en 2034; Regeneron más del 56,5 % en 2024)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2025', url: 'https://gminsights.com/industry-analysis/anti-vegf-therapeutics-market' },
  { id: 2, titulo: 'Atopic Dermatitis Drugs Market (13.200 M USD en 2025, 34.400 M en 2035, TCAC 10,1 %)', editor: 'Global Market Insights', tipo: 'Sectorial', fecha: '2026', url: 'https://www.gminsights.com/industry-analysis/atopic-dermatitis-drugs-market' },
  { id: 3, titulo: 'Atopic Dermatitis Treatment Market (19.470 M USD en 2025, 40.140 M en 2034, TCAC 8,37 %)', editor: 'Straits Research', tipo: 'Sectorial', fecha: '2026', url: 'https://straitsresearch.com/report/atopic-dermatitis-treatment-market' },
  { id: 4, titulo: 'Form 10-K 2025: competencia de Dupixent, EYLEA y Libtayo; biosimilares; patentes; regulación (IRA, Medicare)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000087258926000008/regn-20251231.htm` },
  { id: 5, titulo: 'Form 10-Q del 2T26: acuerdos con el Gobierno de EE. UU. (precio de nación más favorecida en Medicaid, TrumpRx, sin aranceles hasta enero de 2029), negociación de Medicare', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000025/regn-20260630.htm` },
  { id: 6, titulo: 'Biocon launches aflibercept biosimilar in the United States (Yesafili, 3-ago-2026; Pavblu de Amgen desde octubre de 2024)', editor: 'Goodwin Procter', tipo: 'Prensa', fecha: '2026-08-21', url: 'https://www.goodwinlaw.com/en/insights/blogs/2026/08/biocon-launches-aflibercept-biosimilar-in-the-united-states' },
  { id: 7, titulo: 'Regeneron Reports Second Quarter 2026 Financial and Operating Results (cartera: cemdisiran, Otarmeni, fianlimab, Lynozyfic, factor XI)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000023/exhibit991q22026.htm` },
  { id: 8, titulo: 'Regeneron Stock Tumbles 12% After Experimental Cancer Drug Misses Key Trial Goal (fianlimab, 18-may-2026)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-05-19', url: 'https://www.tikr.com/blog/regeneron-nasdaq-regn-stock-tumbles-12-after-experimental-cancer-drug-misses-key-trial-goal' },
  { id: 9, titulo: 'Form 8-K: sexta enmienda del acuerdo con Sanofi (cuatro anticuerpos de acción prolongada: IL-13, IL-4, IL-4Rα e IL-4×IL-13)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-06', url: `${ED}/000110465926113895/tm2627077d1_8k.htm` },
  { id: 10, titulo: 'Datos de Amgen, AbbVie, Eli Lilly, Merck, Novartis, Roche y Sanofi (ingresos y margen operativo de los últimos doce meses)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-24', url: 'https://finance.yahoo.com/quote/AMGN/financials' },
  { id: 11, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2025 Financial and Operating Results (ventas por producto)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-30', url: `${ED}/000087258926000004/exhibit991q42025.htm` },
];
// Serie del mercado de referencia: anti-VEGF (GMI [1]: 16.900 M en 2024, 18.200 M en 2025, TCAC 5,2 %) + dermatitis atópica
// (GMI [2]: 13.200 M en 2025, TCAC 10,1 %; 2024 = 2025 ÷ 1,101). Es un perímetro parcial: Dupixent vende también en asma, EPOC,
// urticaria y esofagitis, así que la cuota se mide a mano en la sostenibilidad (mercado_final null).
const vegf = { 2024: 16900, 2025: 18200 }, ad = { 2024: 11989, 2025: 13200 };
for (let a = 2026; a <= 2030; a++) { vegf[a] = vegf[a - 1] * 1.052; ad[a] = ad[a - 1] * 1.101; }
const serie = [2024, 2025, 2026, 2027, 2028, 2029, 2030].map((a) => ({ anio: a <= 2025 ? String(a) : `${a}e`, tamano: Math.round(vegf[a] + ad[a]) }));
const yc = (t) => ({ ingresos: Math.round(Y[t].ventas / 1e6), margen: r1(Y[t].margen_op * 100) });
const B_ = {
  _estado: 'Completa con fuentes de mercado de pago resumidas en su página pública (GMI, Straits) y las cifras de los competidores de Yahoo. La cuota en inmunología de tipo 2 no tiene una fuente buena: se mide con las ventas de Dupixent.',
  historia: {
    resumen: 'Regeneron la fundaron en 1988 en Tarrytown (Nueva York) Leonard Schleifer y, un año después, el científico George Yancopoulos, que siguen al frente 38 años después [4]. Salió a bolsa en 1991. Su ventaja es una plataforma propia para hacer anticuerpos humanos (VelocImmune) y una cultura de ciencia: casi todos sus fármacos nacen en sus laboratorios [4]. EYLEA (2011) la convirtió en una gran empresa; Dupixent (2017, con Sanofi) la llevó a ser la que es hoy; en 2020-2021 su anticuerpo contra la COVID llegó a 5.800 M de ventas y desapareció en 2022 [4, 11]. Desde 2024 vive el paso de EYLEA a EYLEA HD con biosimilares en el mercado y prepara la década siguiente con unos 50 candidatos en ensayos [7].',
    hitos: [
      { anio: '1988', hito: 'Fundación por Leonard Schleifer en Tarrytown (Nueva York) [4].' },
      { anio: '1991', hito: 'Salida a bolsa en el Nasdaq; las acciones de clase A (10 votos) no se han vuelto a emitir [4].' },
      { anio: '2007', hito: 'Acuerdo de anticuerpos con Sanofi, origen de Dupixent, Praluent y Kevzara [4].' },
      { anio: '2011', hito: 'Aprobación de EYLEA para la degeneración macular; se vende con Bayer fuera de EE. UU. [4].' },
      { anio: '2017', hito: 'Aprobación de Dupixent para la dermatitis atópica [4].' },
      { anio: '2020-2021', hito: 'REGEN-COV contra la COVID: ingresos de 16.071,7 M en 2021 [11].' },
      { anio: '2023', hito: 'Aprobación de EYLEA HD (8 mg) [4].' },
      { anio: '2024', hito: 'Llega el primer biosimilar de EYLEA a EE. UU. (Pavblu, de Amgen) [6].' },
      { anio: '2025', hito: 'Primer dividendo trimestral (0,88 USD) [11].' },
      { anio: '2026', hito: 'Deuda de desarrollo con Sanofi pagada (junio); sexta enmienda con Sanofi por 1.000 M por adelantado (octubre) [7, 9].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Regeneron descubre, desarrolla y fabrica anticuerpos y otros fármacos biológicos. Vende directamente en EE. UU. EYLEA HD y EYLEA (retina), Libtayo (cáncer de piel y pulmón, también fuera de EE. UU.), Praluent (colesterol), Evkeeza, Lynozyfic (mieloma) y otros; los clientes son distribuidores especializados, y dos de ellos suman el 77 % de las ventas brutas [4]. Fuera de EE. UU., Bayer vende EYLEA y le paga parte del beneficio. Con Sanofi comparte al 50 % el beneficio mundial de Dupixent (dermatitis atópica, asma, EPOC, urticaria, esofagitis eosinofílica y otras) y Kevzara [4]. Tiene 15.410 empleados, la mayoría en EE. UU. e Irlanda, donde están sus fábricas [4].',
    como_gana_dinero: 'Casi la mitad de los ingresos de 2025 (5.884 M de 14.343 M) es la colaboración con Sanofi: Regeneron no registra las ventas de Dupixent, sino su parte del beneficio, sin gastos comerciales propios fuera de EE. UU. [11]. Ese ingreso tiene un margen muy alto y crece con Dupixent (+26 % en 2025). El resto son ventas propias con margen bruto del 82-85 % (EYLEA, Libtayo) y la parte del beneficio de Bayer [11]. El gasto que manda es la I+D: 5.850 M en 2025, el 41 % de los ingresos, porque la empresa reinvierte en su cartera casi todo lo que no reparte [11]. El apalancamiento operativo es alto: cada dólar más de beneficio de Dupixent llega casi entero al resultado. No hay estacionalidad relevante, salvo descuentos de principio de año en EE. UU. [4].',
    clientes: 'Los clientes directos son distribuidores de EE. UU. (dos de ellos, el 77 % de las ventas brutas de producto en 2025) y, a través de ellos, retinólogos, oncólogos y hospitales [4]. El pagador final es Medicare (EYLEA es un fármaco de la parte B, pagado por precio medio de venta) y los seguros privados [4]. El poder de precios es limitado y va a menos: el precio neto de EYLEA y EYLEA HD baja (2T26: «menor precio neto de venta») por los biosimilares y el bevacizumab reformulado, y los acuerdos de abril de 2026 con el Gobierno obligan a precios de nación más favorecida en Medicaid y en los fármacos nuevos [5, 7]. Dupixent, en cambio, gana volumen con indicaciones nuevas (EPOC, urticaria crónica) sin descuentos visibles [7].',
  },
  sector: {
    definicion: 'El mercado relevante son los fármacos biológicos para dos áreas: las enfermedades de la retina tratadas con anti-VEGF (EYLEA, EYLEA HD, Vabysmo de Roche, biosimilares), que aportan EYLEA y la colaboración con Bayer, y la inflamación de tipo 2 (dermatitis atópica, asma, EPOC, urticaria), donde está Dupixent [4]. Usamos dos medidas de tamaño: el mercado mundial de anti-VEGF de Global Market Insights (18.200 M USD en 2025) [1] y el de fármacos para la dermatitis atópica (13.200 M según GMI y 19.470 M según Straits Research) [2, 3]. La serie suma anti-VEGF y dermatitis atópica de GMI; es un perímetro parcial, porque Dupixent vende también en asma, EPOC y otras enfermedades (17.807 M en 2025 frente a un mercado de dermatitis de 13.200-19.470 M) [11].',
    tamano: '≈ 31.400 M USD en 2025: 18.200 M de anti-VEGF [1] + 13.200 M de dermatitis atópica [2]',
    unidad_serie: 'millones de USD',
    serie,
    tcac_historico_pct: null, tcac_previsto_pct: 7.4, cr5_pct: 90.9, estructura: 'Concentrada',
    drivers: [
      { driver: 'Nuevas indicaciones de Dupixent', efecto: '+', horizonte: 'Estructural', evidencia: 'EPOC (2024), urticaria crónica (2025, niños de 2-11 años en 2026): Dupixent +36 % en el 1S26 [7].' },
      { driver: 'Biosimilares de aflibercept', efecto: '−', horizonte: 'Estructural', evidencia: 'Pavblu desde octubre de 2024, Yesafili desde agosto de 2026 y más en 2026-2027; EYLEA de 2 mg −42 % en 2025 [6, 11].' },
      { driver: 'Dosis más espaciadas en retina (EYLEA HD, Vabysmo)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'EYLEA HD cada 20 semanas aprobado en abril de 2026; menos inyecciones por paciente y año [7].' },
      { driver: 'Precios en EE. UU. (Medicare, nación más favorecida)', efecto: '−', horizonte: 'Estructural', evidencia: 'Negociación de Medicare de la parte B desde 2028; acuerdos de abril de 2026 con precios internacionales en Medicaid [5].' },
      { driver: 'Envejecimiento y diabetes', efecto: '+', horizonte: 'Estructural', evidencia: 'Más degeneración macular y edema diabético: el mercado anti-VEGF crece un 5,2 % al año hasta 2034 [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'En retina, Roche (Vabysmo) y biosimilares baratos; en inmunología, Lilly (Ebglyss), AbbVie (Rinvoq) y nuevos anticuerpos de acción prolongada [4, 6].' },
      { fuerza: 'Poder de los clientes', intensidad: 4, justificacion: 'Medicare y los grandes seguros fijan el precio; dos distribuidores suman el 77 % de las ventas brutas [4, 5].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Fabricación propia en EE. UU. e Irlanda; algunas materias primas de un solo proveedor [4].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Un biológico nuevo exige más de una década y miles de millones en ensayos; las patentes de Dupixent llegan a 2031 [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Biosimilares de EYLEA, bevacizumab sin indicación (barato) y orales para la inflamación (JAK) [4, 6].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La demanda de fármacos no sigue el ciclo económico: en 2008-2009 y 2020 las ventas de las biofarmacéuticas apenas cayeron; lo que mueve el sector son las patentes y los precios. Hoy el ciclo de la industria lo marcan la política de precios de EE. UU. (Medicare, nación más favorecida, aranceles) y la ola de biosimilares de los grandes anticuerpos de 2025-2032 [4, 5]. Para Regeneron, EYLEA está en la fase de declive del ciclo de vida y Dupixent en plena madurez creciente hasta 2031 [4].' },
    regulacion: 'La ley de reducción de la inflación (IRA) permite a Medicare negociar precios: los primeros de la parte B, donde está EYLEA, rigen desde 2028 [5]. En abril de 2026 Regeneron firmó con el Gobierno precios de nación más favorecida en Medicaid para sus productos propios y en los lanzamientos futuros, la venta directa de Praluent en TrumpRx y Otarmeni gratis; a cambio, no pagará los aranceles de la sección 232 hasta enero de 2029 si mantiene la inversión en EE. UU. [5]. La ley BIOSECURE (2025) limita a proveedores chinos [5].',
    tendencias: 'Dos tendencias marcan la década. En retina, el paso a dosis cada vez más espaciadas (EYLEA HD cada 20 semanas, Vabysmo) y los biosimilares de aflibercept; Regeneron gana con EYLEA HD (+52 % en el 2T26) pero pierde más con EYLEA de 2 mg [7]. En inmunología, los anticuerpos de acción prolongada (dosis cada tres o seis meses) que podrían sustituir a Dupixent tras 2031: Regeneron y Sanofi responden con cuatro moléculas nuevas de ese tipo en la sexta enmienda [9]. La IA acorta el descubrimiento de dianas; Regeneron tiene uno de los mayores bancos genéticos (Regeneron Genetics Center) [4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 56.5, posicion: '1.º mundial en anti-VEGF de retina (más del 56,5 % en 2024, con Bayer) [1]; Dupixent es el primer biológico de la inflamación de tipo 2 (17.807 M USD en 2025, más que todo el mercado de dermatitis atópica de GMI) [2, 11]; Libtayo es un competidor menor de Keytruda en inmunoterapia del cáncer.',
    competidores: [
      { nombre: 'Roche (Vabysmo, Lucentis)', pais: 'Suiza', ticker: 'ROG.SW', ingresos: null, cuota_pct: null, margen_ebit_pct: r1(Y.RHHBY.margen_op * 100), comentario: 'Vabysmo (faricimab) es el principal rival de EYLEA HD en degeneración macular y edema diabético [1].' },
      { nombre: 'Amgen (Pavblu, Tezspire)', pais: 'EE. UU.', ticker: 'AMGN', ingresos: yc('AMGN').ingresos, cuota_pct: null, margen_ebit_pct: yc('AMGN').margen, comentario: 'Pavblu, el primer biosimilar de EYLEA (oct-2024); Tezspire compite con Dupixent en asma [6, 10].' },
      { nombre: 'Eli Lilly (Ebglyss)', pais: 'EE. UU.', ticker: 'LLY', ingresos: yc('LLY').ingresos, cuota_pct: null, margen_ebit_pct: yc('LLY').margen, comentario: 'Ebglyss (lebrikizumab, anti-IL-13) en dermatitis atópica, con dosis mensual [10].' },
      { nombre: 'AbbVie (Rinvoq)', pais: 'EE. UU.', ticker: 'ABBV', ingresos: yc('ABBV').ingresos, cuota_pct: null, margen_ebit_pct: yc('ABBV').margen, comentario: 'Rinvoq (oral, JAK) en dermatitis atópica [10].' },
      { nombre: 'Merck & Co. (Keytruda)', pais: 'EE. UU.', ticker: 'MRK', ingresos: yc('MRK').ingresos, cuota_pct: null, margen_ebit_pct: yc('MRK').margen, comentario: 'Keytruda domina la inmunoterapia en la que compite Libtayo; margen de los últimos doce meses deprimido por cargos de I+D adquirida [10].' },
      { nombre: 'Novartis (Beovu, Lucentis)', pais: 'Suiza', ticker: 'NVS', ingresos: yc('NVS').ingresos, cuota_pct: null, margen_ebit_pct: yc('NVS').margen, comentario: 'Tercer jugador en anti-VEGF; con Roche y Regeneron suma el 90,9 % del mercado en 2024 [1].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a un fabricante de fármacos.' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los pacientes estables con Dupixent o EYLEA HD rara vez cambian; pero los biosimilares de EYLEA de 2 mg ganan cuota rápido (−42 % en 2025) [11].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Patente de composición de Dupixent hasta marzo de 2031 (formulación hasta octubre de 2031) y plataforma VelocImmune con 16 fármacos aprobados [4].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Fabricación propia de biológicos a gran escala en EE. UU. e Irlanda [4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'I+D de 5.850 M al año y unos 50 candidatos en ensayos, difícil de igualar fuera de las grandes farmacéuticas [7, 11].' },
      ],
    },
    amenazas: 'Lo que puede erosionar el foso tiene fecha: los biosimilares de Dupixent a partir de 2031 (probabilidad alta, es el 50 % del beneficio del grupo), la llegada de anticuerpos de acción prolongada de otros (amlitelimab de Sanofi, que no es parte del acuerdo, y otros anti-OX40, anti-TSLP) y la extensión de los biosimilares de aflibercept a EYLEA HD (Alvotech ya presentó un biosimilar de 8 mg en Europa en octubre de 2026) [4, 6]. La política de precios de EE. UU. reduce el valor de cada fármaco nuevo [5].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'S&P Global (Dow Jones Best-in-Class World Index)', calificacion: 'Incluida por séptimo año seguido', fecha: '2026-07' }],
    materialidad: 'Los asuntos que mueven las cifras son el acceso y el precio de los fármacos (la mitad del negocio en EE. UU. depende de Medicare y de las ayudas al copago; los acuerdos de abril de 2026 fijan precios internacionales en Medicaid) [5, 7], la ética comercial (demanda del Departamento de Justicia por las donaciones a fundaciones de copago) [4] y la calidad de fabricación (la parada temporal de Limerick costó 176 M en el 1S26) [7].',
    controversias: 'Demanda civil del Departamento de Justicia de junio de 2020 por presuntos pagos indirectos a pacientes de EYLEA a través de fundaciones (Ley contra sobornos y Ley de reclamaciones falsas), aún pendiente; el Primer Circuito confirmó en febrero de 2025 el criterio de causalidad del juzgado [4]. Litigio con Sanofi por el acceso a la información de Dupixent, retirado en octubre de 2026 [9].',
    confianza: 'Media',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) GMI (solo 2024-2025 y previsión); 2) Straits Research (solo 2025-2034); 3) asociaciones sectoriales (sin serie histórica gratuita)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos de Roche y cuotas de los competidores', tipo: 'Complemento', intentos: '1) Yahoo (Roche en francos suizos, no comparable); 2) GMI (solo cuota conjunta de los tres primeros); 3) informes anuales (fuera del presupuesto)', decision: 'Omitido' },
  ],
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy Statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas, clases de acciones, ratio salarial', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-24', url: 'https://www.sec.gov/Archives/edgar/data/872589/000130817926000340/regn-20260424.htm' },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 12-jun-2026 (consejeros, auditor, remuneración)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-17', url: `${ED}/000110465926075127/tm2618117d1_8k.htm` },
  { id: 3, titulo: 'Form 4 de directivos y consejeros de Regeneron (24-oct-2025 a 24-oct-2026; 45 presentaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-24', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000872589&type=4&dateb=&owner=include&count=40' },
  { id: 4, titulo: 'Form 8-K y anexo 99.1: plan de acciones por objetivos a 10 años para el consejero delegado y el director científico (24-sep-2026)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-30', url: `${ED}/000110465926112340/tm2626090d1_ex99-1.htm` },
  { id: 5, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2024 Financial and Operating Results (guía de 2025)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-04', url: `${ED}/000180422025000007/exhibit991q42024.htm` },
  { id: 6, titulo: 'Regeneron Reports Fourth Quarter and Full Year 2025 Financial and Operating Results (gastos reales de 2025)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-30', url: `${ED}/000087258926000004/exhibit991q42025.htm` },
  { id: 7, titulo: 'Regeneron Reports Second Quarter 2026 Financial and Operating Results (guía de 2026 actualizada)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000023/exhibit991q22026.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta de 2026 y del plan de acciones de septiembre, Form 4 de 12 meses. La guía es solo de gastos: el historial compara gastos guiados con reales.',
  directivos: {
    equipo: [
      { nombre: 'Leonard S. Schleifer', cargo: 'Copresidente del consejo, presidente y consejero delegado', desde: '1988', participacion_pct: 2.8, trayectoria: 'Neurólogo; fundó la empresa en 1988 y la ha dirigido 38 años, de cero a 14.343 M USD de ventas en 2025 y 16 fármacos aprobados, con un rendimiento para el accionista de más del 3.500 % desde 1991 [1, 4]. Tiene el 95 % de las acciones de clase A [1].' },
      { nombre: 'George D. Yancopoulos', cargo: 'Copresidente del consejo, presidente y director científico', desde: '1989', participacion_pct: 1.6, trayectoria: 'Científico fundador; inventor de las plataformas que dieron EYLEA, Dupixent y Libtayo [1].' },
      { nombre: 'Christopher Fenimore', cargo: 'Vicepresidente ejecutivo de finanzas y director financiero', desde: '2024', participacion_pct: 0.09, trayectoria: 'Lleva las finanzas desde 2024 tras años en la empresa; con él llegaron el dividendo (2025) y la subida de las recompras [1].' },
      { nombre: 'Andrew J. Murphy', cargo: 'Codirector científico', desde: null, participacion_pct: 0.24, trayectoria: 'Investigador de la empresa desde los años noventa; codirige la ciencia con Yancopoulos [1, 3].' },
      { nombre: 'Christine A. Poon', cargo: 'Consejera independiente coordinadora', desde: '2010', participacion_pct: 0.04, trayectoria: 'Exvicepresidenta de Johnson & Johnson; preside la comisión de remuneración y diseñó el plan de acciones de 2026 [1, 4].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'I+D ajustada 5.000-5.200 M USD', real: '5.149,8 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Gastos generales y de venta ajustados 2.550-2.700 M', real: '2.311,3 M (por debajo)', cumplida: 'Sí' },
      { anio: '2025', guia: 'Margen bruto GAAP de producto 84-85 %', real: '82 %', cumplida: 'No' },
      { anio: '2025', guia: 'Capex 850-975 M', real: '898,4 M', cumplida: 'Sí' },
      { anio: '2025', guia: 'Tipo impositivo GAAP 9-11 %', real: '13,9 %', cumplida: 'No' },
      { anio: '2026', guia: 'Margen bruto GAAP de producto 77-78 % (enero) → 78-79 % (julio); capex 1.100-1.200 M → 1.030-1.100 M', real: '1S26: margen del 77 %; capex de 470,8 M', cumplida: 'Parcial' },
    ],
    comentario: 'El equipo es el más estable del sector: los dos fundadores siguen al frente desde 1988-1989 y han creado la empresa desde cero [1]. La guía es solo de gastos y se cumple en lo que controla la dirección (I+D, gastos generales, capex), no en el margen bruto ni en el tipo impositivo [5, 6, 7]. El riesgo es de sucesión: Schleifer tiene 73 años y Yancopoulos 66, no hay sucesor nombrado y el plan de acciones de septiembre de 2026 los ata diez años más (hasta 2036) [1, 4].',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Leonard S. Schleifer', cargo: 'Copresidente; presidente y consejero delegado', tipo: 'Ejecutivo', desde: '1988', comisiones: 'Tecnología' },
      { nombre: 'George D. Yancopoulos', cargo: 'Copresidente; presidente y director científico', tipo: 'Ejecutivo', desde: '2001', comisiones: 'Tecnología' },
      { nombre: 'Christine A. Poon', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2010', comisiones: 'Remuneración (presidenta); Gobierno y Cumplimiento' },
      { nombre: 'George L. Sing', cargo: 'Consejero', tipo: 'Independiente', desde: '1988', comisiones: 'Auditoría (presidente); Remuneración' },
      { nombre: 'Arthur F. Ryan', cargo: 'Consejero', tipo: 'Independiente', desde: '2003', comisiones: 'Auditoría; Gobierno y Cumplimiento (presidente)' },
      { nombre: 'Joseph L. Goldstein', cargo: 'Consejero', tipo: 'Independiente', desde: '1991', comisiones: 'Gobierno y Cumplimiento; Tecnología' },
      { nombre: 'Michael S. Brown', cargo: 'Consejero', tipo: 'Independiente', desde: '1991', comisiones: 'Gobierno y Cumplimiento; Tecnología (presidente)' },
      { nombre: 'Bonnie L. Bassler', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Gobierno y Cumplimiento; Tecnología' },
      { nombre: 'Huda Y. Zoghbi', cargo: 'Consejera', tipo: 'Independiente', desde: '2016', comisiones: 'Remuneración; Tecnología' },
      { nombre: 'N. Anthony Coles', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Auditoría; Remuneración' },
      { nombre: 'Craig B. Thompson', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Gobierno y Cumplimiento; Tecnología' },
      { nombre: 'Kathryn Guarini', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría' },
      { nombre: 'David P. Schenkein', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración; Tecnología' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 93.0, voto_remuneracion_contra_pct: 6.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 7.28, fijo: 1.98, variable_corto: 3.68, variable_largo: 0, ratio_salario_medio: 42 },
    remuneracion: 'El consejero delegado cobró 7,28 M USD en 2025: 1,98 M de fijo, 3,68 M de variable anual en efectivo y 1,62 M de otros conceptos; no recibió acciones en 2024 ni en 2025, porque cubría la gran concesión de 2020 [1]. El 24-sep-2026 el consejo le concedió, igual que al director científico, un plan único a diez años (2026-2035) 100 % por objetivos: unidades de acciones por cada solicitud y aprobación de un fármaco nuevo (10.000 y 15.000 por cada una) y por las ventas de los productos nuevos de 2032-2035 (250.000 a partir de 10.000 M USD y hasta 1,8 M de unidades con 30.000 M), con un máximo de 2,7 M de acciones para el consejero delegado y 2,9 M para el director científico, que no pueden vender hasta 2036 [4]. A 805 USD, el máximo de los dos vale unos 4.500 M USD (estimación propia). Premia la cartera y las ventas nuevas, no el ROIC ni el flujo libre; el voto de remuneración de 2026 fue del 93 % a favor [2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 8.6, tipo: 'Institucional', variacion: 'Declarado a 14-abr-2026' },
      { nombre: 'BlackRock', pct: 8.4, tipo: 'Institucional', variacion: 'Declarado a 14-abr-2026' },
      { nombre: 'Capital World Investors', pct: 5.0, tipo: 'Institucional', variacion: 'Declarado a 14-abr-2026' },
      { nombre: 'Leonard S. Schleifer (95 % de la clase A, ≈ 15 % de los votos con ella)', pct: 2.8, tipo: 'Fundador y consejero delegado', variacion: 'Sin ventas en 12 meses [3]' },
      { nombre: 'George D. Yancopoulos', pct: 1.6, tipo: 'Fundador y director científico', variacion: 'Sin ventas en 12 meses [3]' },
    ],
    insiders: [
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Christine A. Poon (consejera)', operacion: 'Venta', acciones: null, importe: 4.25 },
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Andrew J. Murphy (codirector científico)', operacion: 'Venta', acciones: null, importe: 3.20 },
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Marion McCourt (vicepresidenta comercial)', operacion: 'Venta', acciones: null, importe: 2.00 },
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Huda Y. Zoghbi (consejera)', operacion: 'Venta', acciones: null, importe: 1.92 },
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Jason Pitofsky (controller)', operacion: 'Venta', acciones: null, importe: 1.87 },
      { fecha: '2025-10-24 a 2026-10-24', persona: 'Bonnie L. Bassler (consejera)', operacion: 'Venta', acciones: null, importe: 1.77 },
    ],
    control_y_defensas: 'Doble clase: las acciones de clase A (1,82 M, el 95 % de Schleifer) votan diez veces y suman ≈ 15 % de los votos, frente al 95 % de la salida a bolsa; no se emiten nuevas desde 1991 [1]. No hay accionista de control: con la clase A y sus acciones ordinarias, Schleifer no decide la junta. El consejo se está desclasificando (elección anual de todos en 2028), hay voto por mayoría y el 25 % de los votos puede convocar una junta extraordinaria [1]. El consejo es largo en el cargo: cuatro consejeros llevan desde 1988-2003 y en 2026 tres recibieron más de un 20 % de votos en contra (Goldstein 29,9 %, Poon 23,2 %, Thompson 20,7 %) [2].',
    alertas: [
      'Plan de acciones por objetivos a diez años para los dos fundadores (hasta 5,6 M de acciones entre los dos, ≈ 5 % del capital) [4].',
      'Consejeros con más de 20 años en el cargo y votos en contra del 21-30 % en la junta de 2026 (Goldstein, Poon, Thompson) [2].',
      'Consejero delegado y presidente a la vez, con 73 años y sin sucesor nombrado [1].',
      'Doble clase de acciones (≈ 15 % de los votos en la clase A) [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const u = Y.REGN;
const comps = ['VRTX', 'AMGN', 'GILD', 'BIIB', 'INCY', 'UTHR', 'NBIX', 'SNY', 'ABBV', 'MRK'];
const nombres = { VRTX: 'Vertex', AMGN: 'Amgen', GILD: 'Gilead', BIIB: 'Biogen', INCY: 'Incyte', UTHR: 'United Therapeutics', NBIX: 'Neurocrine', SNY: 'Sanofi', ABBV: 'AbbVie', MRK: 'Merck & Co.' };
const pais = { SNY: 'FR' };
const empresas = comps.map((t) => {
  const d = Y[t]; const y1 = d.trend.find((x) => x.periodo === '+1y');
  return {
    nombre: nombres[t], ticker: t, pais: pais[t] ?? 'US', capitalizacion: Math.round(d.cap / 1e6),
    ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(d.per_adelantado),
    crecimiento_pct: y1?.crec_ventas != null ? r1(y1.crec_ventas * 100) : null, margen_ebitda_pct: r1(d.ebitda / d.ventas * 100),
    roic_pct: null, dn_ebitda: r2((d.ev - d.cap) / d.ebitda), fcf_yield_pct: d.fcf ? r1(d.fcf / d.cap * 100) : null,
  };
});
const pers_ = empresas.map((e) => e.per_ntm).sort((a, b) => a - b);
const perMed = r1((pers_[4] + pers_[5]) / 2);
const fD = [
  { id: 1, titulo: 'Históricos diarios de REGN, SPY y XBI (precio, rango, rentabilidades, beta, volatilidad, cierres de ejercicio)', editor: 'Yahoo Finance (herramientas/bolsa.mjs)', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/REGN/history' },
  { id: 2, titulo: 'Consenso de Regeneron y de los comparables (estimaciones, recomendaciones, objetivos, capitalización, valor empresa, EBITDA)', editor: 'Yahoo Finance (quoteSummary)', tipo: 'Datos de mercado', fecha: '2026-10-24', url: 'https://finance.yahoo.com/quote/REGN/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,00 % el 23-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve&field_tdr_date_value=2026&page&_format=csv' },
  { id: 4, titulo: 'Implied Equity Risk Premium by month (ERP T12m with sustainable payout, octubre de 2026: 4,20 %)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 2T26 (1.817.146 acciones de clase A y 101.137.842 ordinarias a 23-jul-2026)', editor: 'Regeneron Pharmaceuticals, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000087258926000025/regn-20260630.htm` },
  { id: 6, titulo: 'Regeneron to Report Third Quarter 2026 Financial and Operating Results on October 30, 2026', editor: 'Regeneron Pharmaceuticals (Finviz)', tipo: 'Primaria', fecha: '2026-10', url: 'https://finviz.com/news/395385/regeneron-to-report-third-quarter-2026-financial-and-operating-results-and-host-conference-call-and-webcast-on-october-30-2026' },
  { id: 7, titulo: 'Form 8-K de Neurocrine: cierre de la compra de Soleno Therapeutics (2.900 M USD)', editor: 'Neurocrine Biosciences (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: 'https://www.sec.gov/Archives/edgar/data/914475/000119312526228013/d94926d8k.htm' },
  { id: 8, titulo: 'Johnson & Johnson closes landmark Intra-Cellular Therapies acquisition (14.600 M USD)', editor: 'Johnson & Johnson', tipo: 'Primaria', fecha: '2025-04-02', url: 'https://www.jnj.com/media-center/press-releases/johnson-johnson-closes-landmark-intra-cellular-therapies-acquisition-to-solidify-neuroscience-leadership' },
  { id: 9, titulo: 'Jazz Pharmaceuticals to acquire GW Pharmaceuticals (7.200 M USD)', editor: 'Jazz Pharmaceuticals', tipo: 'Primaria', fecha: '2021-02-03', url: 'https://investor.jazzpharma.com/news-releases' },
  { id: 10, titulo: 'Company facts XBRL de Intra-Cellular Therapies (ingresos 2024: 680,9 M USD) y de GW Pharmaceuticals (2020: 527,2 M USD)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001567514.json' },
  { id: 11, titulo: 'Seeking Alpha, titulares de REGN (UBS sube a Comprar el 14-oct-2026; rebaja de un autor el 4-oct; caída tras datos de cáncer de ovario el 1-oct; aprobación en FOP el 19-ago)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-22', url: 'https://seekingalpha.com/api/sa/combined/REGN.xml' },
  { id: 12, titulo: 'REGN Soars 21.9% in a Month: Buy, Sell or Hold the Stock? (resultados del 2T26 y EYLEA HD; consenso de BPA de 2026 de 53,11 USD)', editor: 'Zacks', tipo: 'Prensa', fecha: '2026-08-11', url: 'https://www.zacks.com/stock/news/2972803/regn-soars-219-in-a-month-buy-sell-or-hold-the-stock' },
  { id: 13, titulo: 'Can Regeneron Sustain Growth Momentum In Q3? (resultados el 30-oct-2026)', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-09-25', url: 'https://www.rttnews.com/3694032/can-regeneron-sustain-growth-momentum-in-q3.aspx' },
  { id: 14, titulo: 'Regeneron Stock Tumbles 12% After Experimental Cancer Drug Misses Key Trial Goal', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-05-19', url: 'https://www.tikr.com/blog/regeneron-nasdaq-regn-stock-tumbles-12-after-experimental-cancer-drug-misses-key-trial-goal' },
];
const rec = u.reco;
const y0 = u.trend.find((x) => x.periodo === '0y'), yy1 = u.trend.find((x) => x.periodo === '+1y');
const D = {
  _estado: `Completa. Precio de cierre del 23-oct-2026 (805,02 USD; la sesión del lunes 26-oct no ha abierto). Comparables con Yahoo (misma fuente y fecha); mediana del PER de los próximos 12 meses ${perMed}.`,
  identificacion: {
    nombre: 'Regeneron Pharmaceuticals, Inc.', nombre_corto: 'Regeneron', ticker: 'REGN', isin: 'US75886F1075', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Biotecnología', sede: 'Tarrytown (Nueva York)', fundacion: '1988', empleados: 15410, web: 'www.regeneron.com',
    precio: 805.02, fecha_precio: '2026-10-23', acciones: 108.0, capitalizacion_publicada: Math.round(u.cap / 1e6), free_float_pct: 95.8,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-30',
  },
  consenso: {
    guidance: 'La empresa solo guía gastos. Guía de 2026 (actualizada el 30-jul-2026): I+D GAAP 6.500-6.635 M USD, gastos generales y de venta GAAP 2.830-2.960 M, margen bruto GAAP de producto 78-79 %, coste de fabricación para socios 985-1.035 M, capex 1.030-1.100 M y tipo impositivo GAAP del 13-14 % [5]. No incluye operaciones corporativas no cerradas (la sexta enmienda con Sanofi es de octubre) [5]. Próximos resultados: 30-oct-2026, antes de la apertura [6].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(y0.ventas / 1e6), ebitda: null, ebit: null, bpa: r2(y0.bpa), dpa: 3.76, fuente: `Yahoo Finance, ${y0.n} analistas, 24-oct-2026; BPA ajustado [2]` },
      { periodo: '2027e', ingresos: Math.round(yy1.ventas / 1e6), ebitda: null, ebit: null, bpa: r2(yy1.bpa), dpa: null, fuente: `Yahoo Finance, ${yy1.n} analistas, 24-oct-2026; BPA ajustado [2]` },
    ],
    recomendaciones: { n_analistas: rec.strongBuy + rec.buy + rec.hold + rec.sell + rec.strongSell, comprar: rec.strongBuy + rec.buy, mantener: rec.hold, vender: rec.sell + rec.strongSell, po_medio: r2(u.po_medio), po_min: u.po_min, po_max: u.po_max },
    revisiones: `El BPA ajustado de 2026 del consenso subió de ${r2(y0.bpa_hace90)} a ${r2(y0.bpa)} USD en 90 días y el de 2027 de ${r2(yy1.bpa_hace90)} a ${r2(yy1.bpa)} [2]: los resultados del 2T26 (EYLEA HD y Dupixent por encima de lo esperado) y el fin de la deuda de desarrollo con Sanofi. El de 2026 puede incluir parte de los 1.000 M de Sanofi del 4T26 (el BPA del 4T va de 14,35 a 25,95 USD entre analistas) [2]. El de 2027 solo lo dan ${yy1.n} analistas. En agosto el consenso de Zacks para 2026 era de 53,11 USD [12]. UBS subió a Comprar el 14-oct con objetivo de 978 USD [11].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    beta: 0.62,
    posicion_corta_pct: r1(u.corto_pct * 100),
    comentario: 'La acción ha rendido un 7,3 % anual en cinco años frente al 12,4 % del S&P 500 y un 0,7 % anual en tres años, con una caída máxima del 59,7 % de agosto de 2024 a junio de 2025 por los biosimilares de EYLEA y el fracaso de itepekimab en uno de sus dos ensayos de EPOC [1]. En el último año ha rendido un 40,6 % (S&P 500 +14,4 %) por tres hechos: la vuelta al crecimiento en 2026, el salto de los resultados del 2T26 (+27,9 % en el mes hasta el 21-ago) y el pago de la deuda con Sanofi; en medio, −9,8 % el 18-may por fianlimab [1, 12, 14]. La beta mensual a cinco años (0,13) es poco fiable; usamos la semanal de cinco años (0,62) como referencia [1].',
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: B.cierres_ejercicio.find((x) => x.anio === a).precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: a === '2021' })),
    comentario: 'Regeneron cotiza barata frente a su beneficio desde hace años: entre 14 y 19 veces el BPA ajustado del año siguiente al cierre de 2021-2025, con 6,5 veces al cierre de 2020 (el beneficio de 2021 lo infló la COVID) [1, 2]. Hoy, a 805,02 USD, cotiza a unas 13 veces el BPA de los próximos doce meses del consenso, en la parte baja de su historia [2]. Lo que ha cambiado es el riesgo: EYLEA tiene biosimilares y Dupixent, que es la mitad del beneficio, pierde la patente en 2031, así que el mercado paga menos por cada dólar de beneficio. 2021 se marca como excluido en la serie al cierre por el beneficio de la COVID.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Biofarmacéuticas grandes y rentables de EE. UU. y Europa, con pocos productos que pesan mucho y riesgo de patentes: Vertex, Amgen, Gilead, Biogen, Incyte, United Therapeutics, Neurocrine, Sanofi (socio de Dupixent), AbbVie y Merck. No usamos Eli Lilly (prima por la obesidad) ni Alnylam (crece al 26 % con poco beneficio). Todos con datos de Yahoo del 24-oct-2026 (cierre del 23-oct) y el PER sobre el BPA de los próximos doce meses del consenso (ajustado) [2]. El EBITDA de los próximos doce meses no está gratis en la misma base: solo EV/EBITDA de los últimos doce meses.',
    empresas,
    comentario: `Regeneron cotiza a ${r1(u.per_adelantado)} veces el BPA ajustado de los próximos doce meses del consenso, por debajo de la mediana de los comparables (${perMed} veces) y solo por encima de Neurocrine y Sanofi [2]. Su margen EBITDA (30 % de los últimos doce meses) es menor que el de Amgen, AbbVie o Vertex porque gasta el 41 % de las ventas en I+D, y su crecimiento esperado de 2027 (+5,6 % en Yahoo, con una base de 2026 que incluye el pago de Sanofi) está en la media [2]. El descuento se explica por EYLEA y por la patente de Dupixent de 2031; con 17.800 M de caja (21 % de la capitalización) el PER sin caja es aún menor. Usamos el PER como múltiplo principal.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-05', objetivo: 'Soleno Therapeutics (VYKAT XR)', comprador: 'Neurocrine Biosciences', ev: 2324, ev_ventas: 12.2, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Enfermedad rara con un producto en lanzamiento; 12,2 veces las ventas de 2025 [7].' },
      { fecha: '2025-04', objetivo: 'Intra-Cellular Therapies (CAPLYTA)', comprador: 'Johnson & Johnson', ev: 14600, ev_ventas: 21.4, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Producto en crecimiento con patentes largas; sobre ventas de 2024 de 680,9 M [8, 10].' },
      { fecha: '2021-05', objetivo: 'GW Pharmaceuticals (EPIDIOLEX)', comprador: 'Jazz Pharmaceuticals', ev: 7200, ev_ventas: 13.7, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Un producto para enfermedad rara; sobre ventas de 2020 de 527,2 M [9, 10].' },
    ],
    comentario: 'Las compras de biofarmacéuticas con un producto en crecimiento se pagan a 12-21 veces las ventas [7-10], frente a unas 4,8 veces que cotiza Regeneron (valor empresa ≈ 75.100 M sobre 15.535 M de ventas de los últimos doce meses [2]). No son comparables: son empresas pequeñas con un solo producto y patentes largas. Una oferta por Regeneron es muy improbable: vale más de 80.000 M, los fundadores controlan el 15 % de los votos con la clase A y nunca han querido vender. Por eso las transacciones no pesan en el valor.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones 2028e y EBITDA', tipo: 'Complemento', intentos: '1) Yahoo Finance (solo 2026 y 2027, sin EBITDA); 2) MarketScreener (no abre sin JavaScript); 3) Zacks y RTTNews (solo BPA del año)', decision: 'Omitido' },
    { seccion: 'comparables', campo: 'ev_ebitda_ntm y roic_pct', tipo: 'Complemento', intentos: '1) Yahoo Finance (no da EBITDA de los próximos doce meses ni ROIC); 2) Stock Analysis (sin EBITDA de los próximos doce meses gratis); 3) cuentas de cada comparable (fuera del presupuesto de tiempo)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $REGN (30 mensajes, 16 a 24-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-24', url: 'https://api.stocktwits.com/api/2/streams/symbol/REGN.json' },
  { id: 2, titulo: 'Seeking Alpha: análisis de autores sobre REGN («Is The Market Undervaluing Its Growth Potential», «The Easy Money Has Been Made», «Why I Still See Upside After The Rally»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-22', url: 'https://seekingalpha.com/api/sa/combined/REGN.xml' },
  { id: 3, titulo: 'Seeking Alpha: titulares de REGN (UBS a Comprar, Sanofi, cáncer de ovario, FOP, precios de nación más favorecida)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/symbol/REGN/news' },
];
const E = {
  _estado: 'Completa con lo que abre: Stocktwits (API) y Seeking Alpha (RSS de análisis y noticias). Reddit y los foros de Seeking Alpha no abren.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($REGN)', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes alcistas, muchos de poco contenido; se repiten la subida de UBS a Comprar, la decisión de la FDA sobre cemdisiran en noviembre y la idea de Regeneron como valor refugio dentro de la biotecnología [1].' },
      { plataforma: 'Seeking Alpha (análisis)', fecha: '2026-10', n_comentarios: 3, tono: 'Dividido', resumen: 'Un autor ve el mercado infravalorando el crecimiento (22-oct); otro rebaja la recomendación porque «el dinero fácil ya se ha hecho» tras la subida (4-oct) [2].' },
      { plataforma: 'Seeking Alpha (noticias)', fecha: '2026-10', n_comentarios: 12, tono: 'Positivo', resumen: 'Titulares favorables (Sanofi, UBS, FOP) con una caída por datos tempranos en cáncer de ovario el 1-oct y el ruido de los precios de nación más favorecida [3].' },
    ],
    temas: [
      { tema: 'Dupixent y el acuerdo ampliado con Sanofi', postura: 'Alcista', peso: 'Alto', contraste: 'Correcto: Dupixent crece al 36-38 % y la deuda de desarrollo está pagada; el riesgo de 2031 se menciona poco.' },
      { tema: 'EYLEA HD frente a biosimilares', postura: 'Dividida', peso: 'Medio', contraste: 'EYLEA HD sube un 52 %, pero la franquicia de EYLEA en EE. UU. cae un 12 % en el 2T26 y llegan más biosimilares.' },
      { tema: 'Catalizadores de cartera (cemdisiran en noviembre, Otarmeni, obesidad)', postura: 'Alcista', peso: 'Medio', contraste: 'Cemdisiran tiene fecha de la FDA en noviembre de 2026; los demás aportan poco a las ventas de 2027-2028.' },
      { tema: 'Valoración tras la subida', postura: 'Dividida', peso: 'Medio', contraste: 'La acción ha subido un 40 % en un año, pero sigue a unas 13 veces el beneficio del consenso, por debajo de su historia.' },
    ],
    lectura: 'El sentimiento de los particulares es positivo y mejora desde los resultados del 2T26, en línea con los analistas (19 de 28 recomiendan comprar). No es euforia: la acción está un 5,5 % por debajo de su máximo de septiembre y un 33 % por debajo del máximo de cinco años. Lo que los foros apenas mencionan es la patente de Dupixent de 2031 y la extensión de los biosimilares a EYLEA HD, que este informe pone en el bajista. Ninguna cifra del informe sale de aquí.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables', perMed, empresas.map((e) => e.ticker + ' ' + e.per_ntm).join(', '));
