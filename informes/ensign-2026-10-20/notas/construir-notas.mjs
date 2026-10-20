// Escribe las notas A-E de The Ensign Group (ENSG), corte 2026-10-20, a partir de los documentos de notas/docs (EDGAR y
// prensa), del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json (Yahoo, cierre del 19-oct-2026), de yahoo-datos.json y
// comp-anual.json (Yahoo quoteSummary del 20-oct-2026, 12:25 UTC, con la sesión aún cerrada) y de form4.json.
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node informes/ensign-2026-10-20/notas/construir-notas.mjs
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
const CA = lee('comp-anual.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1125376';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, segmentos (nota 7), pagadores, arrendamientos, deuda, seguros propios, litigios, empleados', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000112537626000007/ensg-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26 (30-jun-2026): balance, flujos semestrales, compras, recompras, CID del DOJ, OHCA, OBBB', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000034/ensg-20260630.htm` },
  { id: 3, titulo: 'The Ensign Group Reports Second Quarter 2026 Results (guía 2026 elevada a 7,75-7,85 USD; conciliaciones; Standard Bearer)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000036/q22026pressrelease.htm` },
  { id: 4, titulo: 'The Ensign Group Reports First Quarter 2026 Results', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000112537626000023/q12026pressrelease.htm` },
  { id: 5, titulo: 'The Ensign Group Reports Fourth Quarter and Fiscal Year 2025 Results (BPA ajustado 6,57 USD; guía 2026 inicial)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000112537626000008/q42025pressrelease.htm` },
  { id: 6, titulo: 'Notas de resultados del 2T25 y 3T25 (trimestres de 2024 y 2025, subidas de guía 2025)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-03', url: `${ED}/000112537625000171/q32025pressrelease.htm` },
  { id: 7, titulo: 'Form 10-K 2023: litigio de directores médicos (acuerdo de 48 M USD) y conciliación no GAAP de 2022-2023', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-01', url: `${ED}/000112537624000018/ensg-20231231.htm` },
  { id: 8, titulo: 'Form 10-K 2022: segmentos reexpresados de 2020-2022 y flujos de 2020-2022', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2023-02-02', url: `${ED}/000112537623000018/ensg-20221231.htm` },
  { id: 9, titulo: 'Form 10-K 2020: deuda de 2019-2020 y escisión de Pennant (1-oct-2019)', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2021-02-03', url: `${ED}/000112537621000020/ensg-20201231.htm` },
  { id: 10, titulo: 'XBRL company facts de The Ensign Group (series de cuenta, balance y flujos 2016-2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001125376.json' },
];

const anios = ['2020', '2021', '2022', '2023', '2024', '2025'];
// Deuda de 2020: el XBRL solo trae el corto plazo; 10-K 2020: 2,96 + 112,54 M [9].
const DEUDA = { 2020: 115.5 };
// No recurrentes dentro del EBITDA (litigio de directores médicos, 2023: 60,8 M) [7].
const NOREC = { 2023: 60.8 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const o = { ...c, coste_ventas: r1(c.ingresos - c.gastos_generales - c.ebitda), no_recurrentes_en_ebitda: NOREC[c.periodo] ?? null, participadas_en_ebitda: null, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, deuda_financiera: DEUDA[b.periodo] ?? b.deuda_financiera, arrendamientos: 0, existencias: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
// Flujos: capex (inmovilizado) y compras (negocios + activos, sobre todo inmuebles) de los 10-K [1, 8, 9].
const FL = {
  2020: { capex: 50.3, adquisiciones: 25.0, desinversiones: 1.2 },
  2021: { capex: 69.6, adquisiciones: 104.2, desinversiones: 8.8 },
  2022: { capex: 87.5, adquisiciones: 101.1, desinversiones: 10.0 },
  2023: { capex: 106.2, adquisiciones: 69.0, desinversiones: 2.3 },
  2024: { capex: 158.2, adquisiciones: 156.5, desinversiones: 6.2 },
  2025: { capex: 193.6, adquisiciones: 323.3, desinversiones: 14.2 },
};
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, ...FL[f.periodo], pagos_arrendamientos: 0, intereses_en_financiacion: 0 };
  delete o.fin; return o;
});

const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const seg = (nombre, descripcion, tipo, h) => ({ nombre, descripcion, tipo_resultado: tipo, historico: h.map(([periodo, ingresos, resultado]) => ({ periodo, ingresos, resultado })) });

const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC (2020-2025) comprobadas con los 10-K. Serie desde 2020: hasta 2019 la cuenta mezcla Pennant (escindida el 1-oct-2019). Coste de ventas = ingresos − G&A − EBITDA (incluye el alquiler de los centros, «rent-cost of services», 239 M en 2025). Arrendamientos operativos fuera de la deuda (US GAAP: el alquiler ya está en el EBITDA).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 5486.7, ebitda: 581.8, ebit: 467.3, beneficio_neto: 378.7, bpa: 6.38, dpa: 0.26, dpa_extraordinario: 0, fcf: 419.0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos pasaron de 2.402,6 M USD en 2020 a 5.057,8 M en 2025 (TCAC del 16 %, según la propia empresa) y a 5.486,7 M en los doce meses a junio de 2026 [1, 3]. Más o menos la mitad del crecimiento es comprado: en 2025 los centros adquiridos desde 2024 sumaron 489,2 M de los 797,4 M de aumento, y el resto vino de ocupación (+2,1 puntos, al 82,2 %), más pacientes de alta complejidad («skilled mix» del 49,4 % de los ingresos de enfermería) y tarifas [1]. En el 2T26 los centros «iguales» (comprados antes de 2023) crecieron un 6,6 % y el total un 17,3 % [3]. El margen EBITDA (EBIT + amortizaciones) fue del 11,6 % en 2020, 12,0 % en 2021 y 11,9 % en 2022; cayó al 8,8 % en 2023 por el litigio de 60,8 M (10,4 % sin él) y se ha recuperado al 10,5 % en 2025 y al 10,9 % en el 1S26 [1, 3, 7]. Los centros recién comprados tienen menos ocupación (76,6 % en el 2T26) y diluyen el margen hasta que maduran [3].',
    ajustes: 'Cifras GAAP. La empresa publica un BPA «ajustado» que excluye la remuneración en acciones (48,3 M en 2025, 30,1 M en el 1S26), los costes de implantación de sistemas, los costes de compras, la amortización de la «base de pacientes» comprada y los litigios fuera del curso normal [3, 5]. La diferencia es grande y recurrente: 6,57 USD ajustado frente a 5,84 GAAP en 2025 y 3,77 frente a 3,35 en el 1S26 [3, 5]. Como la remuneración en acciones es un coste real que se repite, el informe trabaja en GAAP; solo se trata como no recurrente el litigio de directores médicos de 2023 (60,8 M dentro del EBITDA; acuerdo de 48 M en enero de 2024) [7]. En 2020-2023 los ingresos incluyen ayudas estatales ligadas a la COVID (75,2 M en 2021, 81,8 M en 2022, 64,8 M en 2023) [7].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('3T24', 1081.8, null, 114.4, 1.34, null),
      trim('4T24', 1132.3, null, 122.9, 1.36, null),
      trim('1T25', 1173.0, 16.1, 125.8, 1.37, null),
      trim('2T25', 1227.8, 18.5, 134.9, 1.44, null),
      trim('3T25', 1296.4, 19.8, 129.0, 1.42, null),
      trim('4T25', 1360.6, 20.2, 153.5, 1.61, null),
      trim('1T26', 1389.2, 18.4, 152.7, 1.67, null),
      trim('2T26', 1440.5, 17.3, 162.3, 1.68, 'Superior'),
    ],
    ultima_presentacion: 'En el 2T26 (27-jul-2026) la dirección subió por tercera vez la guía de 2026: BPA ajustado de 7,75-7,85 USD (antes 7,48-7,62; la inicial de febrero era 7,41-7,61) e ingresos de 5.870-5.920 M [3, 4, 5]. El BPA ajustado de 1,92 USD batió en 0,07 la previsión media y los ingresos quedaron en línea (titulares de Seeking Alpha). El mensaje cambió respecto al 1T: además de ocupación (84,1 % en los centros iguales, +2,7 %) y mezcla de pacientes, el consejero delegado dedicó el comunicado a la calidad clínica (calificaciones de CMS un 23 % mejores que la media de sus estados, ningún centro en la lista de «Special Focus Facilities», rotación de directores un 46 % menor) y a la plantilla, en clara respuesta a los informes bajistas de junio, sin nombrarlos [3]. El responsable de inversiones advirtió que los 20 centros comprados en Texas tienen ocupación baja y «retos clínicos y operativos importantes» [3]. La empresa no ha respondido públicamente punto por punto a Hunterbrook y Muddy Waters; a UBS le dijo que los datos de plantilla del «Payroll Based Journal» de CMS están incompletos y que solo 6 de sus 396 centros tenían el administrador en transición (Orange County Business Journal).',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 4.2 }, { anio: '2027', importe: 3.9 }, { anio: '2028', importe: 3.8 }, { anio: '2029', importe: 3.9 }, { anio: '2030', importe: 4.0 }, { anio: '2031+', importe: 124.5 }],
    liquidez: 'Caja 262,3 M USD a 30-jun-2026 y 591,6 M disponibles en la línea de crédito; la línea se amplió a 800 M con vencimiento en agosto de 2031 (8-K del 20-ago-2026) [3, 2].',
    rating: 'Sin rating',
    coste_deuda_pct: 5.6,
    vida_media_anios: null,
    otros_pasivos: 'La deuda financiera son préstamos hipotecarios a largo plazo asegurados por HUD sobre inmuebles propios (139,7 M a 30-jun-2026; 124,5 M vencen después de 2030) [2, 1]. Los arrendamientos operativos de 253 centros suman 2.110,6 M de pasivo (121,1 corto + 1.989,5 largo) y 242 M de pagos en 2025; en US GAAP el alquiler ya resta en el EBITDA y no se suman a la deuda [2, 1]. Seguros propios (filial cautiva): provisiones de autoseguro de 295,8 M frente a 268,6 M de inversiones y depósitos de la filial (210,1 + 58,5) [2]. Litigios: acuerdo de 12 M por demandas laborales en California (provisionado), CID del Departamento de Justicia de enero de 2024 sobre facturación a Medicare y Medicaid de Texas desde 2016 (sin provisión ni estimación) y la revisión de la oficina de costes sanitarios de California (OHCA), recurrida en los tribunales [2].',
    comentario: 'El balance es de caja neta si no se cuentan los arrendamientos: 262,3 M de caja frente a 139,7 M de deuda hipotecaria a junio de 2026 [2]. La caja bajó desde 503,9 M en diciembre porque las compras del semestre (376,0 M, casi todo inmuebles de 20 centros en Texas) y las recompras (40 M) superaron al flujo operativo (272,1 M) [2]. El circulante comercial (clientes − proveedores) ronda el 10,5 % de las ventas y los días de cobro han estado estables en ~45 días [1]. El apalancamiento real está en los alquileres: 2.110,6 M de pasivo por arrendamiento, unas 3,6 veces el EBITDA, con contratos de muy largo plazo con REIT (CareTrust, Omega, Sabra) y con Pennant [1, 2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 564,3 M en 2025 (347,2 en 2024 y 376,7 en 2023), una conversión de 1,6 veces el beneficio neto, ayudada por la remuneración en acciones (48,3 M) y por el aumento de salarios y provisiones de autoseguro devengadas (82,8 y 35,3 M) [1]. La inversión en inmovilizado (193,6 M en 2025, el 3,8 % de las ventas) mezcla mantenimiento y reformas de centros comprados; la empresa no separa el de mantenimiento (estimación propia: ~1,5-2 % de las ventas, cerca de la amortización). Las compras son la inversión de crecimiento: 323,3 M en 2025 y 376,0 M solo en el 1S26, sobre todo inmuebles que pasan a Standard Bearer [1, 2]. Con compras, el flujo libre de 2025 fue de 47,4 M; sin ellas, 370,7 M [1]. Dividendos pequeños (14,4 M) y recompras de 20 M en 2025 y 40 M en el 1S26 [1, 2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: null, opinion: 'Favorable',
    comentario: 'Cuentas en US GAAP con opinión favorable de Deloitte [1]. Tres puntos piden atención. Primero, la remuneración en acciones es alta y creciente (48,3 M en 2025, 1 % de las ventas; 202,6 M pendientes de reconocer a junio de 2026) y la empresa la excluye de su BPA ajustado [2, 5]. Segundo, los ingresos se reconocen por estancias con tarifas pactadas más consideración variable (ajustes de Medicare y Medicaid), y las cuentas a cobrar crecieron con las ventas (637 M, 12,6 % de las ventas) [1]. Tercero, las acusaciones de junio de 2026 (Hunterbrook y Muddy Waters) no son contables, pero tocan la base de los ingresos: si un centro no tiene administrador con licencia, Medicare y Medicaid pueden reclamar lo cobrado; la empresa no ha provisionado nada ni ha anunciado una investigación interna [2]. El Beneish y el Piotroski del motor salen sin alertas en 2024-2025; el Altman Z es alto porque el pasivo por arrendamiento no entra como deuda.',
    senales: [
      { senal: 'Remuneración en acciones excluida del BPA ajustado', nivel: 'Media', comentario: '48,3 M en 2025 (0,73 USD de diferencia entre BPA ajustado y GAAP) [5].' },
      { senal: 'CID del Departamento de Justicia sin resolver (Medicare y Medicaid de Texas desde 2016)', nivel: 'Media', comentario: 'Recibida en enero de 2024; sin provisión ni estimación [2]. En 2024 pagó 48 M por otro caso de la Ley de Reclamaciones Falsas [7].' },
      { senal: 'Acusaciones de vendedores en corto sobre plantilla y licencias de administradores', nivel: 'Alta', comentario: 'Sin acción de ningún regulador cuatro meses después; demanda colectiva de accionistas presentada en octubre [2].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    segmentos: [
      seg('Servicios de enfermería (Skilled Services)', 'Residencias de cuidados especializados y rehabilitación (357 centros de enfermería a finales de 2025).', 'EBIT', [['2020', 2288.2, 327.8], ['2021', 2523.2, 373.6], ['2022', 2906.2, 408.7], ['2023', 3578.9, 464.9], ['2024', 4076.8, 518.5], ['2025', 4837.8, 616.4]]),
      seg('Standard Bearer (inmobiliaria)', 'REIT cautiva: 152 inmuebles a final de 2025 (177 a junio de 2026), alquilados a centros propios (85 % de la renta) y a terceros.', 'EBIT', [['2020', 54.1, 27.3], ['2021', 58.1, 31.9], ['2022', 72.9, 27.9], ['2023', 82.5, 29.1], ['2024', 95.1, 29.3], ['2025', 126.9, 37.6]]),
      seg('Otros (vida asistida, auxiliares y servicios centrales)', 'Residencias de mayores, rayos X móvil, transporte, farmacia y el Service Center (sus costes van aquí).', 'EBIT', [['2020', 112.7, -134.8], ['2021', 102.7, -147.9], ['2022', 122.6, -150.8], ['2023', 155.8, -221.3], ['2024', 192.9, -159.4], ['2025', 232.8, -197.3]]),
      seg('Eliminaciones', 'Renta y servicios entre filiales.', 'EBIT', [['2020', -52.4, 0], ['2021', -56.6, 0], ['2022', -76.3, 0], ['2023', -87.8, 0], ['2024', -104.3, 0], ['2025', -139.7, 0]]),
    ],
    geografias: [{ nombre: 'Estados Unidos (17 estados; Arizona, California y Texas son la mayoría)', peso_pct: 100 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Operaciones acumuladas (centros)', valor_anterior: '327 (2024)', valor_actual: '373 (2025); 398 (jun-26)', variacion: '+46 en 2025', comentario: '245 en 2021 [1, 3].' },
      { kpi: 'Ocupación (camas operativas, total)', valor_anterior: '80,5 %', valor_actual: '82,2 %', variacion: '+1,7 puntos', comentario: '82,9 % en el 2T26; 84,1 % en los centros iguales [1, 3].' },
      { kpi: 'Mezcla de pacientes de alta complejidad (% de ingresos de enfermería)', valor_anterior: '48,6 %', valor_actual: '49,4 %', variacion: '+0,8 puntos', comentario: '50,0 % en el 2T26 [1, 3].' },
      { kpi: 'Tarifa diaria media de Medicare (USD)', valor_anterior: '767,72', valor_actual: '800,94', variacion: '+4,3 %', comentario: '822,24 en el 2T26 [1, 3].' },
      { kpi: 'Tarifa diaria media de Medicaid (USD)', valor_anterior: '294,78', valor_actual: '308,27', variacion: '+4,6 %', comentario: '313,78 en el 2T26 [1, 3].' },
      { kpi: 'Inmuebles propios', valor_anterior: '158 (dic-25)', valor_actual: '183 (jun-26)', variacion: '+25', comentario: '144 explotados por filiales de Ensign [3].' },
    ],
    clientes: 'El «cliente» es el pagador público o privado de cada estancia. En el 2T26 Medicaid supuso el 39,6 % de los ingresos de servicios, Medicare el 23,7 % y Medicaid de cuidados especializados el 5,6 %: el 68,9 % depende de programas públicos; seguros privados de Medicare Advantage y otros («managed care») el 18,5 % y privados y otros el 12,6 % [3]. Por días, Medicaid es el 58,6 % de las estancias de enfermería [3]. No hay contratos de duración: las tarifas de Medicare las fija CMS cada año (+3,2 % para el año fiscal 2026 y +2,4 % para 2027) y las de Medicaid cada estado [2]. El poder de precio es limitado y regulado; la empresa lo compensa con mezcla (más pacientes de Medicare y seguros, con tarifas de 609-822 USD/día frente a 314 USD de Medicaid) [3].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'calidad', campo: 'anios_auditor', tipo: 'Complemento', intentos: '1) proxy 2026 (propuesta de ratificación de Deloitte, sin año de inicio); 2) 10-K 2025, informe del auditor (no extraído en el texto); 3) búsqueda «Deloitte auditor since» en el proxy', decision: 'Omitido' },
    { seccion: 'balance', campo: 'vida_media_anios', tipo: 'Complemento', intentos: '1) 10-K 2025, nota de deuda (calendario, sin vida media); 2) 10-Q 2T26; 3) cálculo a partir de vencimientos (la mayor parte, préstamos HUD a ~30 años sin fecha exacta)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: industria, competencia, regulación (Medicare, Medicaid, plantilla), estrategia de compras', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000112537626000007/ensg-20251231.htm` },
  { id: 2, titulo: 'National Health Expenditures 2024 Highlights (residencias y comunidades de jubilación: 219.900 M USD, +7,3 %)', editor: 'Centers for Medicare & Medicaid Services', tipo: 'Sectorial', fecha: '2025-12', url: 'https://www.cms.gov/files/document/highlights.pdf' },
  { id: 3, titulo: 'Nursing Home Spending Expected to Jump to $385.9B by 2033 (proyección del actuario de CMS)', editor: 'Skilled Nursing News', tipo: 'Prensa', fecha: '2025-06', url: 'https://skillednursingnews.com/2025/06/nursing-home-spending-expected-to-jump-to-385-9b-by-2033/' },
  { id: 4, titulo: 'Fiscal Year 2027 Skilled Nursing Facility Prospective Payment System Final Rule (CMS-1843-F): +2,4 %', editor: 'Centers for Medicare & Medicaid Services', tipo: 'Primaria', fecha: '2026-07-29', url: 'https://www.cms.gov/newsroom/fact-sheets/fiscal-year-2027-skilled-nursing-facility-prospective-payment-system-final-rule-cms-1843-f' },
  { id: 5, titulo: 'CMS repeals minimum staffing requirements for skilled nursing and long-term care facilities', editor: 'American Hospital Association News', tipo: 'Prensa', fecha: '2025-12-02', url: 'https://www.aha.org/news/headline/2025-12-02-cms-repeals-minimum-staffing-requirements-skilled-nursing-long-term-care-facilities' },
  { id: 6, titulo: 'Form 10-Q del 2T26: One Big Beautiful Bill (impuestos a proveedores, pagos dirigidos por los estados, redeterminaciones), regla de impuestos sanitarios de febrero de 2026', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000034/ensg-20260630.htm` },
  { id: 7, titulo: 'Datos de mercado de los comparables (cotización, capitalización, EBITDA, ventas, consenso)', editor: 'Yahoo Finance quoteSummary', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/PACS/' },
  { id: 8, titulo: 'The Ensign Group Reports Second Quarter 2026 Results (calidad clínica, ocupación, compras en Texas)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000036/q22026pressrelease.htm` },
  { id: 9, titulo: 'Ensign Group stock tumbles after short seller report (Hunterbrook)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-06-08', url: 'https://www.investing.com/news/stock-market-news/ensign-group-stock-tumbles-after-short-seller-report-93CH-4731022' },
  { id: 10, titulo: 'Ensign Group shares drop after short seller alleges compliance issues (Muddy Waters)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.investing.com/news/stock-market-news/ensign-group-shares-drop-after-short-seller-alleges-compliance-issues-93CH-4738095' },
];
const yb = (t) => CA[t];
const B_ = {
  _estado: 'Completa con limitaciones: no hay CR5 publicado del sector; márgenes EBIT de los competidores no comparables entre sí (unos alquilan y otros son propietarios), se dan márgenes EBITDA de Yahoo en el comentario.',
  negocio: {
    descripcion: 'Ensign es el mayor operador cotizado de residencias de cuidados especializados («skilled nursing facilities», SNF) de EE. UU. por número de centros: 398 operaciones en 17 estados a julio de 2026, 32 de ellas con vida asistida en el mismo campus [8]. Atiende sobre todo a dos tipos de paciente: el de corta estancia que sale del hospital y necesita rehabilitación o cuidados de enfermería (pagado por Medicare o por seguros privados de Medicare Advantage) y el residente de larga estancia con dependencia, pagado mayoritariamente por Medicaid [1]. Cada centro es una filial con su propio director y su plantilla; un «Service Center» central da contabilidad, nóminas, sistemas y compras, y una filial cautiva asegura la responsabilidad profesional [1]. Desde 2022 los inmuebles propios están en Standard Bearer, una REIT cautiva que alquila a los centros de Ensign y a terceros (177 inmuebles a junio de 2026) [8]. La empresa crece comprando centros con malos resultados y mejorándolos: 102 operaciones nuevas desde 2024 [8].',
    como_gana_dinero: 'Cobra por día de estancia: en el 2T26 la tarifa media de enfermería fue de 435 USD/día, 822 USD con Medicare, 609 con seguros privados y 314 con Medicaid [8]. El margen depende de tres cosas: la ocupación (82,9 % en el 2T26), la mezcla de pacientes de alta complejidad (50 % de los ingresos de enfermería) y el coste de personal, que es alrededor del 60 % de todos los gastos [8, 1]. El alquiler de los centros arrendados es el segundo coste fijo (239 M en 2025, el 4,7 % de las ventas) [1]. Hay apalancamiento operativo: con la plantilla mínima cubierta, cada punto de ocupación adicional deja mucho margen. Por eso un centro comprado con el 70 % de ocupación tarda dos o tres años en llegar al margen de los maduros. Ingresos casi sin estacionalidad (algo más en invierno por las gripes) [1].',
  },
  sector: {
    definicion: 'Mercado de residencias de cuidados especializados y de larga estancia en EE. UU.: gasto nacional en «nursing care facilities and continuing care retirement communities» de las cuentas sanitarias de CMS, que incluye todos los pagadores [2]. Es más amplio que lo que Ensign vende (incluye comunidades de jubilación), pero es la única serie oficial y homogénea; la proyección del actuario de CMS (Skilled Nursing News) se usa para los años futuros, con la advertencia de que partía de una cifra de 2024 más alta (228.800 M) que la definitiva (219.900 M) [2, 3].',
    tamano: '219.900 M USD en 2024 (+7,3 %) [2]',
    unidad_serie: 'millones de USD (2025e en adelante: estimación propia con las tasas del actuario de CMS)',
    serie: [{ anio: '2022', tamano: 192900 }, { anio: '2023', tamano: 204900 }, { anio: '2024', tamano: 219900 }, { anio: '2025e', tamano: 237500 }, { anio: '2026e', tamano: 252200 }, { anio: '2027e', tamano: 267900 }],
    tcac_historico_pct: 6.8, tcac_previsto_pct: 6.0,
    cr5_pct: null, estructura: 'Fragmentada',
    drivers: [
      { driver: 'Envejecimiento (mayores de 80 años)', efecto: '+', horizonte: 'Estructural', evidencia: 'El actuario de CMS proyecta un crecimiento del gasto del 6,2 % anual en 2026-2027 y del 5,6 % en 2028-2033 [3].' },
      { driver: 'Tarifas de Medicare', efecto: '+', horizonte: 'Cíclico', evidencia: '+3,2 % en el año fiscal 2026 y +2,4 % en 2027 (cesta de mercado 3,3 % − productividad 0,9) [6, 4].' },
      { driver: 'Financiación de Medicaid por los estados (OBBB)', efecto: '−', horizonte: 'Estructural', evidencia: 'Congela nuevos impuestos a proveedores (las residencias quedan exentas), limita los pagos dirigidos un 10 % al año desde 2028 y obliga a revisar la elegibilidad cada seis meses desde 2027 [6].' },
      { driver: 'Coste y disponibilidad de personal de enfermería', efecto: '−', horizonte: 'Cíclico', evidencia: 'El personal es ~60 % de los gastos de Ensign; muchos estados tienen ratios mínimos propios [1].' },
      { driver: 'Desplazamiento hacia cuidados en casa y Medicare Advantage', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Los seguros privados pagan menos por día que Medicare tradicional (609 frente a 822 USD en Ensign) y acortan estancias [8].' },
      { driver: 'Oferta: cierres de centros y poca construcción', efecto: '+', horizonte: 'Estructural', evidencia: 'El número de residencias ha bajado ligeramente en los últimos años, según la empresa [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Miles de operadores locales y regionales; se compite por derivaciones de hospitales y por calidad (estrellas de CMS) más que por precio, porque la tarifa la fija el pagador [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Medicare, Medicaid y Medicare Advantage pagan el 87 % de los ingresos y fijan las tarifas [8].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'Personal de enfermería escaso y caro (~60 % de los gastos) y propietarios REIT con contratos de alquiler a largo plazo con subidas anuales [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Licencias estatales y certificados de necesidad en muchos estados limitan las camas nuevas; entrar es comprar centros existentes [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Cuidados en casa, hospitales de rehabilitación y vida asistida para los menos dependientes; la OBBB facilita a los estados financiar cuidados en casa [6].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La ocupación de Ensign sigue subiendo (80,5 % en 2024, 82,2 % en 2025, 82,9 % en el 2T26) tras el hundimiento de la COVID, y el gasto nacional creció un 8,7 % en 2023 y un 7,3 % en 2024 [1, 2, 8]. El sector es poco cíclico frente a la economía (2008-09 apenas le afectó), pero sí frente a la política: en 2020 la COVID vació residencias y solo las ayudas federales sostuvieron márgenes; en 2022-2023 la falta de personal disparó los costes de agencias. El riesgo del ciclo hoy es fiscal: los recortes federales a Medicaid desde 2027-2028 [6].' },
    regulacion: 'Medicare paga por el sistema PDPM con una subida del 2,4 % desde el 1-oct-2026; CMS pidió información sobre el aumento de la complejidad declarada («case-mix creep»), que podría traer recortes en la regla de 2028 [4]. La norma federal de plantilla mínima de 2024 (3,48 horas por residente y día y enfermera titulada 24/7) quedó suspendida hasta 2034 por la OBBB y CMS la derogó el 2-dic-2025; sigue vigente la enfermera 8 horas diarias y las ratios de cada estado [5, 6]. La OBBB (4-jul-2025) recorta la financiación de Medicaid de forma gradual desde 2027-2028 [6].',
    tendencias: 'Tres tendencias. Medicare Advantage gana peso y paga menos por día (en Ensign el 18,5 % de los ingresos) [8]. Los datos públicos de plantilla y calidad de CMS (Care Compare, Payroll Based Journal) son cada vez más usados por reguladores, demandantes y vendedores en corto, como se vio en junio de 2026 [9, 10]. Y la consolidación: operadores en quiebra o vendedores (Genesis) y REIT que buscan inquilinos nuevos dan a Ensign un flujo de compras que la empresa describe como el mejor de su historia [8]. La IA y la automatización afectan sobre todo al papeleo (documentación clínica, facturación) y no al cuidado directo.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.3,
    posicion: 'Primer operador cotizado de residencias de EE. UU. por centros (398) y segundo por ingresos tras PACS Group (5.551 M frente a 5.487 M en los últimos 12 meses); ≈ 2,3 % del gasto nacional en residencias de 2024 (5.058 M de 219.900 M, estimación propia) [7, 2].',
    competidores: [
      { nombre: 'PACS Group', pais: 'EE. UU.', ticker: 'PACS', ingresos: Math.round(yb('PACS').ventas_ltm / 1e6), cuota_pct: 2.5, margen_ebit_pct: null, comentario: 'Mismo modelo de compra y mejora, más joven y más endeudado; margen EBITDA LTM del 8,6 % (Yahoo) [7].' },
      { nombre: 'Genesis HealthCare', pais: 'EE. UU.', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Antiguo líder; no cotiza y entró en concurso de acreedores en 2025 (Skilled Nursing News).' },
      { nombre: 'National HealthCare', pais: 'EE. UU.', ticker: 'NHC', ingresos: Math.round(yb('NHC').ventas_ltm / 1e6), cuota_pct: 0.7, margen_ebit_pct: null, comentario: 'Operador del sureste, propietario de sus inmuebles; margen EBITDA LTM del 12,2 % (Yahoo) [7].' },
      { nombre: 'Brookdale Senior Living', pais: 'EE. UU.', ticker: 'BKD', ingresos: Math.round(yb('BKD').ventas_ltm / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Vida asistida (no enfermería especializada); pérdidas en 2022-2025 y deuda alta [7].' },
      { nombre: 'Encompass Health', pais: 'EE. UU.', ticker: 'EHC', ingresos: Math.round(yb('EHC').ventas_ltm / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Hospitales de rehabilitación: compite por el mismo paciente que sale del hospital; margen EBITDA del 23,6 % con inmuebles propios [7].' },
      { nombre: 'The Pennant Group', pais: 'EE. UU.', ticker: 'PNTG', ingresos: Math.round(yb('PNTG').ventas_ltm / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Escindida de Ensign en 2019: cuidados en casa, hospicio y vida asistida [7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Los «clusters» locales comparten prácticas y derivaciones de hospitales, pero no hay efecto de red propiamente dicho [1].' },
        { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'El paciente o el hospital eligen centro en cada ingreso.' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Licencias estatales y certificados de necesidad protegen las camas existentes; la reputación clínica (calificaciones de CMS un 23 % mejores que la media de sus estados, más del 80 % con 4 o 5 estrellas en calidad) atrae derivaciones [8].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Modelo descentralizado y escala en compras, sistemas y seguros; el EBIT del segmento de enfermería es el 12,7 % de sus ventas en 2025 frente a un margen EBITDA del 8,6 % de PACS [1, 7].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Mercados locales con oferta limitada, pero sin barreras para que otro operador compre al lado.' },
      ],
    },
    amenazas: 'La principal amenaza no es un competidor sino el pagador: si los estados recortan Medicaid (el 39,6 % de los ingresos más el 5,6 % de Medicaid de cuidados especializados) o si CMS corrige el «case-mix creep» del PDPM, el margen baja para todo el sector [4, 6, 8]. La segunda es reputacional y regulatoria: las acusaciones de Hunterbrook (plantilla un 26,8 % por debajo de lo recomendado por CMS en 2024) y de Muddy Waters (licencias de administradores «alquiladas» en el ~20 % de los centros visitados) atacan justo la ventaja de calidad [9, 10]. La tercera, el precio de las compras: con más compradores (PACS, fondos) los centros con potencial de mejora se encarecen.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es lo social: calidad del cuidado, seguridad del residente y condiciones de una plantilla de ~56.000 empleados, el 55 % en puestos de baja cualificación (auxiliares, cocina, limpieza) con un salario mediano de 47.604 USD [1]. Las métricas que usa la empresa son las de CMS (estrellas de calidad, inspecciones, rehospitalización un 15 % mejor que la media nacional, rotación de administradores un 46 % menor) [8]. Las acusaciones de junio de 2026 sobre horas de enfermería por residente son la controversia ESG clave [9, 10].',
    controversias: 'Junio de 2026: informes de Hunterbrook (8-jun: plantilla insuficiente, 18.000 días por debajo de los mínimos legales en cuatro estados en 2020-2025 y 339 M pagados a filiales en 2024) y de Muddy Waters (11-jun: licencias de administradores alquiladas en 12 de 57 centros visitados; sanciones teóricas de hasta 7.000 M) [9, 10]. 2024: acuerdo de 48 M por el caso de directores médicos (sin admitir culpa). 2025: acuerdo de 12 M por demandas laborales en California [1].',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Ensign nació en 1999 en California, fundada por Roy Christensen y su hijo Christopher con la idea de comprar residencias con problemas y darles autonomía local [1]. Salió a bolsa en el Nasdaq en 2007. En 2014 escindió sus inmuebles en CareTrust REIT, y en octubre de 2019 su negocio de cuidados en casa, hospicio y vida asistida en The Pennant Group [1]. En 2019 Barry Port sustituyó a Christopher Christensen como consejero delegado, y en septiembre de 2025 asumió también la presidencia cuando Christensen se retiró [1]. Desde 2022 los inmuebles propios están en Standard Bearer, una REIT cautiva. Ha pasado de 245 operaciones en 2021 a 398 en 2026 [1, 8].',
    hitos: [
      { anio: '1999', hito: 'Fundación en California por la familia Christensen.' },
      { anio: '2007', hito: 'Salida a bolsa en el Nasdaq.' },
      { anio: '2014', hito: 'Escisión de los inmuebles en CareTrust REIT.' },
      { anio: '2019', hito: 'Escisión de The Pennant Group (cuidados en casa, hospicio, vida asistida); Barry Port, consejero delegado.' },
      { anio: '2022', hito: 'Standard Bearer Healthcare REIT agrupa los inmuebles propios.' },
      { anio: '2024', hito: 'Acuerdo de 48 M USD por el caso de directores médicos; CID del Departamento de Justicia sobre facturación en Texas.' },
      { anio: '2025', hito: '46 operaciones nuevas; Christopher Christensen se retira y Port preside el consejo.' },
      { anio: '2026', hito: 'Informes de Hunterbrook y Muddy Waters (junio); 20 centros comprados en Texas; línea de crédito de 800 M.' },
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo «altamente fragmentado»); 2) cuentas nacionales de CMS (sin cuotas); 3) cálculo con los ingresos de los cotizados (falta Genesis y los privados grandes)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'competidores.margen_ebit_pct', tipo: 'Complemento', intentos: '1) Yahoo (EBIT anual no disponible); 2) 10-K de los competidores no descargados por tiempo; 3) margen EBITDA LTM de Yahoo dado en el comentario', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) 10-K y proxy (sin calificaciones); 2) web de inversores (informe de sostenibilidad sin calificaciones externas); 3) búsqueda de MSCI y Sustainalytics (de pago)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas, partes vinculadas', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: `${ED}/000112537626000014/ensg-20260401.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (voto consultivo de remuneración)', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${ED}/000112537626000026/ensg-20260513.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (20-oct-2025 a 20-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001125376&type=4' },
  { id: 4, titulo: 'Form 8-K: retirada de Christopher Christensen y Barry Port presidente (20-jun-2025)', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-06-20', url: `${ED}/000112537625000115/form8-kjune2025.htm` },
  { id: 5, titulo: 'Form 8-K: condiciones de salida de Christopher Christensen (bono de 2,07 M USD)', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-08-26', url: `${ED}/000112537625000158/ensg-20250821.htm` },
  { id: 6, titulo: 'Ensign Announces Increased Stock Repurchase Authorization (100 M USD)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-06-15', url: `${ED}/000112537626000031/june2026pressrelease.htm` },
  { id: 7, titulo: 'Form 8-K: estatutos modificados (20-ago-2026)', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-25', url: `${ED}/000112537626000040/ensg-20260820.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T26: litigios, CID del DOJ, OHCA', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000034/ensg-20260630.htm` },
  { id: 9, titulo: 'Notas de resultados del 2T25, 3T25, 4T25, 1T26 y 2T26 (guías de BPA)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000036/q22026pressrelease.htm` },
  { id: 10, titulo: 'Ensign Class Action Lawsuit: Perusek v. The Ensign Group, Inc., No. 8:26-cv-02963 (C.D. Cal.)', editor: 'Bleichmar Fonti & Auld LLP', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.bfalaw.com/cases/ensign-class-action-lawsuit' },
  { id: 11, titulo: 'Ensign Group Faces Short Sellers Scrutiny (respuesta de la empresa a UBS)', editor: 'Orange County Business Journal', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://www.ocbj.com/oc-homepage/ensign-group-faces-short-sellers-scrutiny/' },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta, Form 4 (form4.json: 0 compras y 13,6 M USD de ventas, todas con plan 10b5-1).',
  directivos: {
    equipo: [
      { nombre: 'Barry R. Port', cargo: 'Consejero delegado y presidente', desde: '2019', participacion_pct: 0.49, trayectoria: 'En Ensign desde 2006; presidente de Keystone (Texas) y director de operaciones de Ensign Services 2012-2019; consejero delegado desde mayo de 2019 y presidente desde septiembre de 2025. Con él los ingresos se han duplicado y el BPA GAAP ha crecido un 14 % anual entre 2020 y 2025 [4, 9].' },
      { nombre: 'Suzanne D. Snapper', cargo: 'Directora financiera y vicepresidenta ejecutiva', desde: '2009', participacion_pct: 0.72, trayectoria: 'En Ensign desde abril de 2007, directora financiera desde agosto de 2009 y consejera desde 2022; llevó las escisiones de CareTrust (2014) y Pennant (2019) y la creación de Standard Bearer (2022) [1].' },
      { nombre: 'Chad A. Keetch', cargo: 'Director de inversiones y vicepresidente ejecutivo', desde: null, participacion_pct: 0.28, trayectoria: 'Responsable de las compras y de Standard Bearer; 102 operaciones nuevas desde 2024 [1, 9].' },
      { nombre: 'Spencer W. Burton', cargo: 'Presidente y director de operaciones de Ensign Services', desde: null, participacion_pct: 0.27, trayectoria: 'Dirige el día a día de los centros desde la escisión de Pennant [1].' },
      { nombre: 'Marivic Uychiat Pison', cargo: 'Vicepresidenta ejecutiva de servicios clínicos y consejera', desde: '2016', participacion_pct: 0.04, trayectoria: 'Enfermera, 22 años en la empresa; consejera desde septiembre de 2025 [4].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'BPA ajustado 6,22-6,38 USD (julio de 2025), elevada a 6,34-6,46 y a 6,48-6,54 (noviembre)', real: '6,57 USD', cumplida: 'Sí' },
      { anio: '2026', guia: 'BPA ajustado 7,41-7,61 USD (febrero), elevada a 7,48-7,62 (abril) y a 7,75-7,85 (julio); ingresos 5.870-5.920 M', real: '3,77 USD en el 1S26 (en curso)', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo estable y formado dentro de la casa: el consejero delegado lleva en Ensign desde 2006 y la directora financiera desde 2007 [1, 4]. La guía se cumple y se eleva casi cada trimestre (2025 cerró en 6,57 frente a una última guía de 6,48-6,54) [9]. La sucesión del fundador fue ordenada (2019 consejero delegado, 2025 presidencia) [4]. El punto débil es la credibilidad pública tras junio de 2026: la dirección respondió con una recompra y mensajes de calidad, no con una refutación detallada, y la demanda colectiva nombra al consejero delegado y a la directora financiera [6, 10, 11].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Barry R. Port', cargo: 'Presidente y consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: 'Calidad y cumplimiento' },
      { nombre: 'Suzanne D. Snapper', cargo: 'Consejera, directora financiera', tipo: 'Ejecutivo', desde: '2022', comisiones: 'Calidad y cumplimiento' },
      { nombre: 'Marivic Uychiat Pison', cargo: 'Consejera, vicepresidenta de servicios clínicos', tipo: 'Ejecutivo', desde: '2025', comisiones: 'Calidad y cumplimiento' },
      { nombre: 'Barry M. Smith', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2014', comisiones: 'Retribuciones; Nombramientos (presidente)' },
      { nombre: 'Swati B. Abbott', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría; Retribuciones (presidenta); Nombramientos' },
      { nombre: 'Daren J. Shaw', cargo: 'Consejero', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría (presidente); Retribuciones' },
      { nombre: 'Ann S. Blouin', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Calidad y cumplimiento (presidenta); Nombramientos' },
      { nombre: 'John O. Agwunobi', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Auditoría; Calidad y cumplimiento' },
      { nombre: 'Mark V. Parkinson', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Calidad y cumplimiento; Nombramientos' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 94.5, voto_remuneracion_contra_pct: 5.4, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 13.80, fijo: 0.55, variable_corto: 10.32, variable_largo: 2.91, ratio_salario_medio: 290 },
    remuneracion: 'La remuneración de la cúpula es casi toda variable y anual: el consejero delegado cobró 13,8 M USD en 2025, de ellos 0,55 M de fijo, 10,3 M de incentivo anual en efectivo y 2,9 M en acciones [1]. El incentivo sale de un fondo de directivos (41,9 M en 2025) calculado con una fórmula sobre el beneficio antes de impuestos ajustado, que el comité reparte mirando también criterios clínicos (inspecciones, reingresos, rotación de enfermería, estrellas de CMS) y de gobierno; en 2025 se restaron del cálculo la remuneración en acciones y el litigio laboral de 12 M; por encima de 5 M de fondo, el 25 % se paga en acciones con un año de permanencia [1]. No hay métricas de rentabilidad del capital (ROIC) ni de rentabilidad para el accionista a varios años: premia crecer el beneficio, también comprando centros. Ratio con el empleado mediano: 290 a 1 [1]. El voto consultivo de 2026 fue favorable (48,6 M a favor, 2,8 M en contra) [2]. Al fundador que se retiró se le pagó un bono de 2,07 M y se le aceleraron opciones [5].',
    accionistas: [
      { nombre: 'BlackRock', pct: 12.2, tipo: 'Institucional', variacion: 'Dato del 13G/A de octubre de 2024 [1].' },
      { nombre: 'Baillie Gifford', pct: 7.8, tipo: 'Institucional', variacion: '13G de febrero de 2026 [1].' },
      { nombre: 'Wasatch Advisors', pct: 4.9, tipo: 'Institucional', variacion: 'Bajó del 5 % (13G/A de febrero de 2026) [1].' },
      { nombre: 'Christopher R. Christensen (cofundador)', pct: 2.0, tipo: 'Fundador', variacion: 'Fuera del consejo desde septiembre de 2025 [1].' },
      { nombre: 'Consejeros y directivos (12 personas)', pct: 4.0, tipo: 'Directivos', variacion: 'Incluye opciones ejercitables [1].' },
    ],
    insiders: [
      { fecha: '2025-11', persona: 'Barry R. Port (consejero delegado)', operacion: 'Venta', acciones: 28315, importe: 5.12 },
      { fecha: '2025-11', persona: 'Spencer W. Burton (director de operaciones)', operacion: 'Venta', acciones: 11798, importe: 2.11 },
      { fecha: '2025-12', persona: 'Beverly B. Wittekind (directora jurídica)', operacion: 'Venta', acciones: 10400, importe: 1.83 },
      { fecha: '2026-02', persona: 'Suzanne D. Snapper (directora financiera)', operacion: 'Venta', acciones: 12831, importe: 2.50 },
      { fecha: '2025-11 a 2026-06', persona: 'Barry M. Smith (consejero; 700 acciones al mes)', operacion: 'Venta', acciones: 5600, importe: 1.03 },
    ],
    control_y_defensas: 'No hay accionista de control: el mayor es BlackRock (12,2 %) y la familia fundadora tiene ~2 % [1]. Una acción, un voto y mayoría para elegir consejeros, pero el consejo está escalonado en tres clases (cada consejero se elige cada tres años), lo que frena un cambio de control hostil [1]. En agosto de 2026 el consejo reformó los estatutos para endurecer los requisitos de las propuestas y candidaturas de accionistas (plazo de 90-120 días) [7]. Hay familiares de directivos en puestos de la empresa (hermano del fundador, cuñados del director de operaciones y del de inversiones), declarados como partes vinculadas de importe menor [1].',
    alertas: [
      'Demanda colectiva de accionistas Perusek v. The Ensign Group (C.D. Cal., 8:26-cv-02963), periodo 10-feb-2022 a 18-jun-2026, contra la empresa, el consejero delegado y la directora financiera; plazo para el demandante principal: 7-dic-2026 [10].',
      'CID del Departamento de Justicia (enero de 2024) sobre facturación a Medicare y Medicaid de Texas desde 2016, sin resolver [8].',
      'Informes de Hunterbrook y Muddy Waters (junio de 2026) sobre plantilla y licencias de administradores; la empresa negó en privado (a UBS) y no ha publicado una refutación [11].',
      'Presidente y consejero delegado en la misma persona desde septiembre de 2025, con consejo escalonado [1, 4].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ENSG, SPY y XLV (precio, rentabilidades, beta, volatilidad, cierres anuales)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/ENSG/history/' },
  { id: 2, titulo: 'Consenso, recomendaciones y precios objetivo de Ensign y comparables (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/ENSG/analysis/' },
  { id: 3, titulo: 'ENSG stock forecast: 5 analistas, objetivo medio 220 USD, acciones recientes de los analistas', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-05', url: 'https://stockanalysis.com/stocks/ensg/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Form 10-Q del 2T26: balance a 30-jun-2026 (puente), acciones, recompras', editor: 'The Ensign Group, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000034/ensg-20260630.htm` },
  { id: 7, titulo: 'The Ensign Group Reports Second Quarter 2026 Results (guía 2026, acciones diluidas 59,5 M)', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-27', url: `${ED}/000112537626000036/q22026pressrelease.htm` },
  { id: 8, titulo: 'Ensign Group stock tumbles after short seller report (Hunterbrook, 8-jun-2026)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-06-08', url: 'https://www.investing.com/news/stock-market-news/ensign-group-stock-tumbles-after-short-seller-report-93CH-4731022' },
  { id: 9, titulo: 'Ensign Group shares drop after short seller alleges compliance issues (Muddy Waters, 11-jun-2026)', editor: 'Investing.com', tipo: 'Prensa', fecha: '2026-06-11', url: 'https://www.investing.com/news/stock-market-news/ensign-group-shares-drop-after-short-seller-alleges-compliance-issues-93CH-4738095' },
  { id: 10, titulo: 'Ensign Class Action Lawsuit (Perusek v. The Ensign Group): caídas del 8, 11 y 18 de junio', editor: 'Bleichmar Fonti & Auld LLP', tipo: 'Prensa', fecha: '2026-10', url: 'https://www.bfalaw.com/cases/ensign-class-action-lawsuit' },
  { id: 11, titulo: 'Ensign Announces Increased Stock Repurchase Authorization', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-06-15', url: `${ED}/000112537626000031/june2026pressrelease.htm` },
  { id: 12, titulo: 'The Ensign Group Reports Fiscal Year and Fourth Quarter 2025 Results; Issues 2026 Guidance', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000112537626000008/q42025pressrelease.htm` },
  { id: 13, titulo: 'The Ensign Group Reports First Quarter 2026 Results; Raises 2026 Guidance', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000112537626000023/q12026pressrelease.htm` },
  { id: 14, titulo: 'The Ensign Group Reports Third Quarter 2025 Results; Raises Annual Guidance', editor: 'The Ensign Group, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-03', url: `${ED}/000112537625000171/q32025pressrelease.htm` },
  { id: 15, titulo: 'Ensign Group Faces Short Sellers Scrutiny (respuesta de la empresa a UBS)', editor: 'Orange County Business Journal', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://www.ocbj.com/oc-homepage/ensign-group-faces-short-sellers-scrutiny/' },
  { id: 16, titulo: 'Form 4 de consejeros y directivos de The Ensign Group (20-oct-2025 a 20-oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001125376&type=4' },
];
const e = Y.ENSG;
const NTM = (t) => { const tr = Object.fromEntries(Y[t].trend.map((x) => [x.periodo, x])); return { bpa: 0.2 * tr['0y'].bpa + 0.8 * tr['+1y'].bpa, ventas: 0.2 * tr['0y'].ventas + 0.8 * tr['+1y'].ventas }; };
const comp = (t, nombre, extra = {}) => {
  const y = Y[t], c = CA[t]; const n = y.trend?.[0]?.bpa ? NTM(t) : null;
  return {
    nombre, ticker: t, pais: 'US', capitalizacion: Math.round(y.cap / 1e6), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null,
    per_ntm: n ? r1(y.precio / n.bpa) : null, crecimiento_pct: n ? r1((n.ventas / c.ventas_ltm - 1) * 100) : null,
    margen_ebitda_pct: r1(c.ebitda / c.ventas_ltm * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: c.fcf ? r1(c.fcf / y.cap * 100) : null, ...extra,
  };
};
const comps = [comp('PACS', 'PACS Group'), comp('EHC', 'Encompass Health'), comp('PNTG', 'The Pennant Group'), comp('ADUS', 'Addus HomeCare'), comp('OPCH', 'Option Care Health'), comp('NHC', 'National HealthCare')];
const perv = comps.map((x) => x.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const perMed = perv.length % 2 ? perv[(perv.length - 1) / 2] : r1((perv[perv.length / 2 - 1] + perv[perv.length / 2]) / 2);
const ntmE = NTM('ENSG');
const D = {
  _estado: `Completa. Precio = cierre del 19-oct-2026 (173,05 USD); la sesión del 20-oct abre a las 13:30 UTC. Comparables solo con PER (los EV de Yahoo de los operadores suman los arrendamientos operativos y no casan con un EBITDA después de alquileres). Mediana del PER NTM (base ajustada del consenso): ${perMed}. PER NTM de Ensign en la misma base: ${r1(e.precio / ntmE.bpa)}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'The Ensign Group, Inc.', nombre_corto: 'Ensign', ticker: 'ENSG', isin: 'US29358P1012', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Centros y servicios sanitarios', sede: 'San Juan Capistrano (California)', fundacion: '1999', empleados: 56000, web: 'https://www.ensigngroup.net',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 59.5, capitalizacion_publicada: Math.round(e.cap / 1e6), free_float_pct: 96.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: 'Guía de 2026 (27-jul-2026): BPA ajustado de 7,75-7,85 USD (+18,7 % en el punto medio) e ingresos de 5.870-5.920 M, con 59,5 M de acciones diluidas y un 25 % de impuesto; excluye remuneración en acciones, costes de sistemas y de compras, e incluye solo las compras que cierren hasta el 3T [7]. Es la tercera subida del año (inicial: 7,41-7,61). No hay plan a medio plazo publicado.',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(e.trend.find((t) => t.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(e.trend.find((t) => t.periodo === '0y').bpa), dpa: 0.26, fuente: 'Yahoo Finance, 5 analistas (BPA ajustado) [2]' },
      { periodo: '2027e', ingresos: Math.round(e.trend.find((t) => t.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(e.trend.find((t) => t.periodo === '+1y').bpa), dpa: 0.27, fuente: 'Yahoo Finance, 5 analistas (BPA ajustado) [2]' },
    ],
    recomendaciones: { n_analistas: 5, comprar: 4, mantener: 1, vender: 0, po_medio: e.po_medio, po_min: e.po_min, po_max: e.po_max },
    revisiones: `Las estimaciones suben: el BPA de 2026 pasó de 7,56 USD hace 90 días a 7,81 y el de 2027 de 8,33 a 8,59, tras la subida de guía del 2T [2]. En 3 meses los objetivos se mantienen en 207-230 USD (RBC de 222 a 228 en julio; Oppenheimer 210 en septiembre; Truist mantener en octubre) [3]. Son estimaciones ajustadas (sin remuneración en acciones): la diferencia con el GAAP ronda los 0,85-0,90 USD por acción en 2026. Solo hay una fuente con estimaciones completas (Yahoo); Stock Analysis confirma el objetivo medio (220 USD) y el BPA de 2026 (7,81) [2, 3].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...(({ tramo_drawdown, ...r }) => r)(B.bolsa),
    posicion_corta_pct: r1(e.corto_pct * 100),
    comentario: 'Ensign ha sido una de las mejores acciones del sector sanitario a largo plazo: +25,5 % anual en 10 años y +18,8 % en 5, frente a +15,4 % y +12,7 % del S&P 500 [1]. En los últimos 12 meses va un −4,8 % frente al +16,6 % del índice: marcó máximos en 218 USD el 2-mar-2026, cayó hasta 141,58 el 11-jun tras los informes de Hunterbrook y Muddy Waters (−31,8 % desde máximos) y recuperó un 15 % tras los resultados del 2T26 [1, 8, 9]. La beta es baja (0,66 mensual a 5 años; 0,11 semanal a 2 años) y la volatilidad del 27,7 % [1].',
    contexto: {
      movimiento: { fecha: '2026-10-19', var_1m_pct: -0.5, var_3m_pct: 1.3, var_6m_pct: -12.4, var_12m_pct: -3.6, dist_max_52s_pct: -19.8, dist_min_52s_pct: 17.6, dist_max_historico_pct: -19.8, tendencia: 'bajista', volatilidad_60d_pct: 20.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'oct-2025', var_pct: 10.8, causa: 'Subida de 21 sesiones hasta el 22-oct-2025 (184,79 USD), antes de los resultados del 3T25 (3-nov, guía elevada); no hay un hecho propio que la explique en el día [1, 14].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-2026', var_pct: 26.9, causa: 'Resultados de 2025 y guía de 2026 (4-feb): +13,8 % el 5-feb y máximo histórico de 218 USD el 2-mar [1, 12].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: -14.9, causa: 'Caída gradual del 2-mar al 11-may (de 216 a 169 USD), sin ningún día de −5 %; los resultados del 1T (30-abr) subieron la guía. Sin hecho propio identificado: corrección del múltiplo tras la subida de febrero [1, 13].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-2026', var_pct: -16.4, causa: 'Informes bajistas: Hunterbrook (8-jun, plantilla insuficiente y pagos a filiales; −8,2 % en el día) y Muddy Waters (11-jun, licencias de administradores «alquiladas»; −3,0 %); mínimo de 141,58 USD [1, 8, 9]. La empresa amplió la recompra a 100 M y compró 40 M en el trimestre [11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: 15.0, causa: 'Resultados del 2T26 (27-jul): ocupación y tarifas al alza y tercera subida de la guía de 2026 (BPA ajustado 7,75-7,85 USD) [1, 7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-06-08', tipo: 'rumor', hecho: 'Hunterbrook publica que muchos centros de Ensign tienen menos plantilla de la que declaran y que pagó 339 M USD a filiales; posición corta declarada [8].', veredicto: 'no cambia', condicion: 'Si un regulador (CMS, DOJ, un estado) abre un expediente nuevo sobre esos hechos, se rehace el informe.' },
        { fecha: '2026-06-11', tipo: 'rumor', hecho: 'Muddy Waters, corto: licencias de administradores «alquiladas» en 12 de 57 centros revisados; habla de sanciones teóricas de 7.000 M USD y de un EBIT de 2027 un 35 % menor [9]. La empresa dice a UBS que solo 6 de 396 centros tenían el administrador en transición; ningún regulador ha actuado [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-15', tipo: 'ampliación o convertible', hecho: 'Recompra ampliada a 100 M USD; 257.000 acciones compradas por 40 M en el 2T26 (≈ 156 USD) [6, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-08', tipo: 'demanda o regulador', hecho: 'Demanda colectiva Perusek v. The Ensign Group (C.D. Cal.) por las caídas de junio; plazo para el demandante principal el 7-dic-2026. Es la consecuencia habitual de los informes bajistas; sin fecha de decisión que mueva el precio [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2024-01', tipo: 'demanda o regulador', hecho: 'Requerimiento civil (CID) del Departamento de Justicia sobre la facturación a Medicare y Medicaid de centros de Texas desde 2016, sin resolver y sin fecha [6].', veredicto: 'no cambia', condicion: 'Si el DOJ presenta demanda o pide una cifra, se recalcula.' },
        { fecha: '2025-10/2026-10', tipo: 'directivos', hecho: 'Ventas de directivos por 13,6 M USD en 12 meses, todas con planes 10b5-1 (Port 5,1 M); ninguna compra [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07/2026-10', tipo: 'recomendación', hecho: '5 analistas, 4 comprar y 1 mantener; objetivos de 207-230 USD sin recortes en 3 meses (RBC sube a 228 en julio) [2, 3].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-02', tipo: 'resultados', hecho: 'Resultados del 3T26 previstos hacia el 2-nov (fecha estimada, sin confirmar por la empresa) [2].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-02',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 20 % por debajo del máximo de marzo y en tendencia bajista suave (−4,7 % bajo la media de 200). La caída de junio tiene una causa conocida, los informes de Hunterbrook y Muddy Waters, que este análisis recoge en riesgos y en el escenario bajista; los resultados del 2T26 la recuperaron en parte. No hay un hecho pendiente con fecha (colocación, ampliación, decisión regulatoria o judicial) que pueda mover el precio más de un 5 %: la demanda colectiva solo tiene plazos procesales y el CID del DOJ no tiene fecha. Los directivos venden con planes programados, sin compras. Veredicto: no cambia (y la acción no es compra por valoración, no por este bloque).',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => +x.anio >= 2020).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'PER GAAP de los últimos doce meses al cierre de cada año: 23,8 veces en 2020, 24,5 en 2021, 24,0 en 2022, 30,7 en 2023 (beneficio hundido por el litigio), 25,9 en 2024 y 29,8 en 2025 [1]. Hoy, 27,1 veces el BPA GAAP de los últimos 12 meses (6,38 USD) y 20,2 el ajustado del consenso de 2027 [2]. La caída desde marzo devolvió el múltiplo a la parte baja de su rango de cinco años: el mercado descuenta el riesgo regulatorio y legal de junio, no un peor negocio.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Operadores cotizados de EE. UU. de cuidados posagudos y de larga estancia que cobran de Medicare, Medicaid y seguros: PACS (el más parecido), National HealthCare, Encompass (rehabilitación hospitalaria), Pennant (cuidados en casa y vida asistida, escindida de Ensign), Addus (cuidados personales pagados por Medicaid) y Option Care (infusión en casa). Fuera: las REIT (CareTrust, Omega, Sabra), porque su BPA y su margen son de propietario; Brookdale, con pérdidas; y Select Medical, sin datos completos en la fuente.',
    empresas: comps,
    comentario: `Ensign cotiza a ${r1(e.precio / ntmE.bpa)} veces el BPA ajustado de los próximos 12 meses, por encima de la mediana de sus comparables (${perMed}) y por debajo solo de Pennant (26,2) [2]. La prima se apoya en el crecimiento (ventas NTM +${r1((ntmE.ventas / e.ventas - 1) * 100)} % frente a +7-15 % del grupo) y en su historial de 20 años; PACS, con un crecimiento parecido, cotiza a 17 veces, con más deuda y menos historia [2]. Los múltiplos EV/EBITDA no se usan: el EBITDA de los operadores ya resta el alquiler y el valor empresa de la fuente suma los arrendamientos operativos, con perímetros muy distintos (Encompass es propietaria, PACS alquila casi todo). Usaría el PER.`,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) 10-K 2025 y 10-Q del 2T26 (las compras de Ensign no publican precio por centro ni múltiplo); 2) búsqueda de operaciones de residencias con múltiplo publicado (las grandes, como Genesis, son concursos sin múltiplo); 3) operaciones de cuidados en casa (UnitedHealth-Amedisys, Optum-LHC) no comparables con un operador de residencias', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'estimaciones.ebitda', tipo: 'Complemento', intentos: '1) Yahoo (solo ventas y BPA); 2) Stock Analysis (2027 de pago); 3) MarketScreener no consultado por tiempo', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $ENSG (8-jun a 17-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-17', url: 'https://stocktwits.com/symbol/ENSG' },
  { id: 2, titulo: 'Seeking Alpha, artículos y titulares de ENSG (RSS)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/ENSG' },
  { id: 3, titulo: 'Ensign Group Faces Short Sellers Scrutiny', editor: 'Orange County Business Journal', tipo: 'Prensa', fecha: '2026-06-22', url: 'https://www.ocbj.com/oc-homepage/ensign-group-faces-short-sellers-scrutiny/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes) y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($ENSG)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'En junio, pánico y burlas («RIP», «Rekt») y algún defensor («los cortos de Hunterbrook suelen rebotar», «las acusaciones son conocidas»); desde octubre dominan los avisos de bufetes sobre la demanda colectiva [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 12, tono: 'Neutro', resumen: 'Dos artículos recientes neutrales: «sana, pero no para comprar» (19-oct) y «quema de caja y riesgos regulatorios la dejan en mantener» (4-ago) [2].' },
      { plataforma: 'Prensa local (Orange County Business Journal)', fecha: '2026-06', n_comentarios: 5, tono: 'Negativo', resumen: 'Recoge las acusaciones y la respuesta de la empresa a UBS; la empresa declinó comentar [3].' },
    ],
    temas: [
      { tema: 'Los informes bajistas: plantilla insuficiente y licencias de administradores', postura: 'Dividida', peso: 'Alto', contraste: 'Nada probado ni ningún regulador ha actuado en cuatro meses, pero la empresa no ha refutado en público y hay una CID del DOJ abierta desde 2024: el riesgo es real y va en el bajista.' },
      { tema: 'Demanda colectiva de accionistas', postura: 'Bajista', peso: 'Medio', contraste: 'Fase inicial (plazo de demandante principal el 7-dic-2026); el coste típico es un acuerdo cubierto en parte por seguros.' },
      { tema: 'Crecimiento por compras y subidas de guía', postura: 'Alcista', peso: 'Medio', contraste: 'Los datos lo apoyan: tres subidas de guía en 2026 y ocupación al alza.' },
      { tema: 'Valoración frente a la quema de caja de las compras', postura: 'Bajista', peso: 'Bajo', contraste: 'Cierto en el flujo libre después de compras (47 M en 2025); el informe lo trata como inversión de crecimiento en el DCF.' },
    ],
    lectura: 'El sentimiento de los particulares pasó del pánico de junio a la indiferencia: hoy pesan más los avisos de bufetes que el debate. Los artículos de Seeking Alpha son neutrales y coinciden con la tesis del informe (negocio bueno, precio que no deja margen). No hay euforia ni capitulación que aprovechar; el sentimiento no contradice a los analistas (4 de 5 comprar), que no han rebajado tras los informes bajistas [1, 2].',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm} g${x.crecimiento_pct}`).join(', '), 'ENSG NTM', r1(e.precio / ntmE.bpa));
