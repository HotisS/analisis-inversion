// Escribe las notas A-E de Cencora (corte 2026-10-15) a partir de los documentos de notas/docs (EDGAR, presentaciones),
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json y de los datos de Yahoo (comparables-yahoo.json, fichas-competidores.json).
// Cada nota cita solo con [n] de su propia lista de fuentes. Ejecutar: node notas/construir-notas.mjs
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
const CY = lee('comparables-yahoo.json');
const FC = lee('fichas-competidores.json');
const ED = 'https://www.sec.gov/Archives/edgar/data/1140859';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2025 (cerrado el 30-sep-2025): cuentas, segmentos, clientes, deuda, litigios', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: `${ED}/000114085925000131/cor-20250930.htm` },
  { id: 2, titulo: 'Cencora Reports Fiscal 2025 Fourth Quarter and Full Year Results (conciliación GAAP-ajustado, guía FY2026 y a largo plazo)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-05', url: `${ED}/000114085925000128/exhibit991-q42025.htm` },
  { id: 3, titulo: 'Información por segmentos revisada (EE. UU., Internacional y Otros) de FY2024 y FY2025, anexo 99.2', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-05', url: `${ED}/000114085925000128/exhibit992.htm` },
  { id: 4, titulo: 'Cencora Reports Fiscal 2026 First Quarter Results', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000114085926000004/exhibit991-q12026.htm` },
  { id: 5, titulo: 'Cencora Reports Fiscal 2026 Second Quarter Results (guía de ingresos rebajada al 4-6 %)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000114085926000018/exhibit991-q22026.htm` },
  { id: 6, titulo: 'Cencora Reports Fiscal 2026 Third Quarter Results (9M FY2026, guía de BPA ajustado 17,75-17,95 USD)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000114085926000032/exhibit991-q32026.htm` },
  { id: 7, titulo: 'Form 10-Q del 3T FY2026 (30-jun-2026): balance, deuda, OneOncology, MWI en venta, pasivo de opioides', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000114085926000034/cor-20260630.htm` },
  { id: 8, titulo: 'Cencora Reports Fiscal 2024 Fourth Quarter and Full Year Results (BPA ajustado 13,76 USD)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-11-06', url: `${ED}/000114085924000148/exhibit991-q42024.htm` },
  { id: 9, titulo: 'Cencora Reports Fiscal 2023 Fourth Quarter and Full Year Results (BPA ajustado 11,99 USD)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-11-02', url: `${ED}/000114085923000147/exhibit991-q42023.htm` },
  { id: 10, titulo: 'AmerisourceBergen Reports Fiscal 2022 Fourth Quarter and Full Year Results (BPA ajustado 11,03 USD)', editor: 'AmerisourceBergen (SEC, 8-K)', tipo: 'Primaria', fecha: '2022-11-03', url: `${ED}/000114085922000064/exhibit991-q42022.htm` },
  { id: 11, titulo: 'AmerisourceBergen Reports Fiscal 2021 Fourth Quarter and Full Year Results (BPA ajustado 9,26 USD)', editor: 'AmerisourceBergen (SEC, 8-K)', tipo: 'Primaria', fecha: '2021-11-04', url: `${ED}/000114085921000054/exhibit991-q42021.htm` },
  { id: 12, titulo: 'AmerisourceBergen Reports Fiscal 2020 Fourth Quarter and Full Year Results (cargo de opioides; BPA ajustado 7,90 USD)', editor: 'AmerisourceBergen (SEC, 8-K)', tipo: 'Primaria', fecha: '2020-11-05', url: `${ED}/000114085920000046/exhibit991-q42020.htm` },
  { id: 13, titulo: 'AmerisourceBergen Reports Fiscal 2019 Fourth Quarter and Full Year Results (BPA ajustado 7,09 USD; FY2018 6,49 USD)', editor: 'AmerisourceBergen (SEC, 8-K)', tipo: 'Primaria', fecha: '2019-11-07', url: `${ED}/000114085919000036/exhibit991-q42019.htm` },
  { id: 14, titulo: 'XBRL company facts (deuda a corto plazo, intereses pagados) de Cencora', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001140859.json' },
  { id: 15, titulo: 'Presentación de resultados del 3T FY2026', editor: 'Cencora, Inc.', tipo: 'Primaria', fecha: '2026-08-05', url: 'https://s203.q4cdn.com/785768684/files/doc_financials/2026/q3/Q3-FY26-Earnings-Presentation-vF.pdf' },
  { id: 16, titulo: 'Cencora Closes $3.0 Billion Senior Notes Offering (financiación de OneOncology)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-13', url: `${ED}/000110465926015272/tm265391d5_ex99-1.htm` },
  { id: 17, titulo: 'Covetrus and MWI Animal Health to Merge (valor empresa de MWI 3.500 M USD; 1.250 M en caja, 800 M en preferentes y 34,3 %)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: `${ED}/000110465926016785/tm266695d1_ex99-1.htm` },
  { id: 18, titulo: 'Cencora Sees Specialty Strategy Fueling Growth Into Fiscal 2027 (conferencia de Morgan Stanley, sep-2026)', editor: 'The Markets Daily', tipo: 'Prensa', fecha: '2026-09-16', url: 'https://www.themarketsdaily.com/?p=9942776' },
];

// Resultado operativo ajustado (segmentos) y amortización de intangibles comprados por ejercicio [13, 12, 11, 10, 9, 8, 2].
const ADJ_OI = { 2019: 2051.3, 2020: 2204.4, 2021: 2648.2, 2022: 3163.4, 2023: 3289.1, 2024: 3648.3, 2025: 4223.0 };
const AMORT_INT = { 2019: 159.8, 2020: 110.5, 2021: 176.2, 2022: 304.6, 2023: 551.0, 2024: 660.3, 2025: 553.0 };
const DEUDA_CP = { 2019: 139, 2020: 501, 2021: 300, 2022: 1070, 2023: 641, 2024: 576.3, 2025: 117.8 };
const GF = { 2019: 167, 2020: 151, 2021: 171, 2022: 220, 2023: 228.9, 2024: 248.7, 2025: 419.8 };
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => ({
  ...c, periodo: 'FY' + c.periodo, fin: undefined,
  gastos_financieros: GF[c.periodo], participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: r1(ADJ_OI[c.periodo] - c.ebit - AMORT_INT[c.periodo]),
  dpa_extraordinario: 0,
}));
cuenta.forEach((c) => delete c.fin);
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, periodo: 'FY' + b.periodo, deuda_financiera: r1(b.deuda_financiera + DEUDA_CP[b.periodo]), arrendamientos: 0, minoritarios: b.minoritarios ?? 0 };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, periodo: 'FY' + f.periodo, pagos_arrendamientos: 0, desinversiones: f.desinversiones ?? 0, emision_acciones: f.emision_acciones ?? 0 };
  delete o.fin; return o;
});
// LTM a 30-jun-2026 = FY2025 + 9M FY2026 − 9M FY2025 [1, 6].
const ltm = {
  periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 332771.4, ebitda: 4079.8, ebit: 3041.8, beneficio_neto: 2624.8, bpa: 13.47, dpa: 2.35, dpa_extraordinario: 0, fcf: 4060.1,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: 1060.5,
};
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2025 y las notas de resultados; deuda con la parte a corto (XBRL solo daba la de largo); no recurrentes = resultado operativo ajustado − resultado operativo GAAP − amortización de intangibles comprados.',
  financieros: {
    cuenta, ltm,
    cambios_perimetro: [
      { periodo: 'FY2021', descripcion: 'Alliance Healthcare (compra a Walgreens Boots Alliance por ≈ 6.500 M USD), consolidada desde el 2-jun-2021: cuatro meses en la cuenta, entera en el balance.' },
      { periodo: 'FY2025', descripcion: 'Retina Consultants of America (85 %, 4.042 M USD en caja), consolidada desde el 2-ene-2025: nueve meses en la cuenta.' },
    ],
    comentario: 'Los ingresos pasaron de 179.589 M USD en FY2019 a 321.333 M en FY2025 (TCAC del 10,2 %) [1, 13], con dos saltos inorgánicos: Alliance Healthcare (jun-2021) y Retina Consultants of America (ene-2025) [1]. El margen bruto es mínimo (3,57 % GAAP en FY2025) porque el grueso de las ventas son medicamentos de marca que se revenden con un diferencial pequeño; el beneficio sale del volumen y de los genéricos, la especialidad y los servicios [1]. El resultado operativo ajustado subió de 2.051 M (1,14 % de las ventas) a 4.223 M (1,31 %) [13, 2]: el margen gana 17 puntos básicos en seis años por mezcla (especialidad, RCA) y apalancamiento operativo, frenado por los análogos de GLP-1, que suman ventas casi sin margen (+7.700 M USD y +26,9 % en FY2025 en EE. UU.) [1]. En 9M FY2026 los ingresos crecen un 4,8 % y el resultado ajustado un 11,4 %, con OneOncology consolidada desde el 2-feb-2026 [6]. FY2020 no es comparable: cargo de 6.600 M USD por el acuerdo de opioides (pérdida neta de 3.409 M) [12].',
    ajustes: 'La empresa publica un BPA ajustado que excluye la amortización de intangibles comprados (553 M USD en FY2025), los cargos y abonos de litigios y opioides, los costes de compras e integración (291 M), la reestructuración (229 M), los deterioros del fondo de comercio de PharmaLex (724 M en FY2025 y 418 M en FY2024), el crédito o cargo LIFO, las ganancias de demandas antimonopolio contra laboratorios (236 M), el efecto de la hiperinflación turca y partidas fiscales [2]. En FY2025 el BPA GAAP fue de 7,96 USD y el ajustado de 16,00 USD [2]. En 9M FY2026 el GAAP (15,21) supera al ajustado (13,31) por una plusvalía de 1.087 M al revalorizar la participación previa en OneOncology y un crédito LIFO de 382 M [6]. La reestructuración y la integración se repiten todos los años (≈ 230 M de reestructuración en FY2023-FY2025) [1]: no son extraordinarias.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '4T24', ingresos: 79050.1, crecimiento_pct: 14.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.34, vs_consenso: null },
      { periodo: '1T25', ingresos: 81487.1, crecimiento_pct: 12.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.73, vs_consenso: null },
      { periodo: '2T25', ingresos: 75453.7, crecimiento_pct: 10.3, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.42, vs_consenso: null },
      { periodo: '3T25', ingresos: 80663.5, crecimiento_pct: 8.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.00, vs_consenso: null },
      { periodo: '4T25', ingresos: 83728.6, crecimiento_pct: 5.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 3.84, vs_consenso: null },
      { periodo: '1T26', ingresos: 85932.0, crecimiento_pct: 5.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.08, vs_consenso: null },
      { periodo: '2T26', ingresos: 78355.9, crecimiento_pct: 3.8, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.75, vs_consenso: 'En línea' },
      { periodo: '3T26', ingresos: 84754.8, crecimiento_pct: 5.1, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 4.48, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Trimestres del ejercicio fiscal (el 1T26 es oct-dic 2025); BPA ajustado de la empresa [2, 4, 5, 6]. En el 2T26 (6-may-2026) la dirección rebajó la guía de ingresos de FY2026 del 7-9 % al 4-6 % por la bajada de precios de algunos medicamentos de marca, la pérdida de un cliente de oncología y otro de alimentación y el paso más rápido de lo previsto de un gran cliente de venta por correo a otros productos; a la vez subió la de BPA ajustado a 17,65-17,90 USD [5]. La acción cayó un 17,4 % ese día. En el 3T26 (5-ago) el resultado operativo ajustado creció un 17,0 % y el BPA un 12,0 %, con 1.000 M USD de recompras en el trimestre, y la guía de BPA subió a 17,75-17,95 USD [6]. En las conferencias de septiembre la nueva directora financiera dijo que la guía de FY2027 llegará con los resultados de noviembre, que FY2027 sumará cuatro meses más de OneOncology y que parte del volumen de Walgreens que no estaba en el contrato principal pasó a otros mayoristas el 1-jul-2026, con efecto en los tres primeros trimestres de FY2027 [18]. La dirección no ha cuantificado ni ese volumen ni el efecto de la venta de MWI sobre el BPA de FY2027 [15, 18].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: 'FY2027', importe: 1736 }, { anio: 'FY2028', importe: 567 }, { anio: 'FY2029', importe: 2094 }, { anio: 'FY2030', importe: 994 },
      { anio: 'FY2031', importe: 995 }, { anio: 'FY2032+', importe: 5337 },
    ],
    liquidez: 'Caja de 2.815 M USD a 30-jun-2026; línea sindicada ampliada a 7.000 M en julio de 2026 (vence en 2031), titulización de cuentas a cobrar de 1.000 M, programa de pagarés de 4.500 M respaldado por la línea y líneas no comprometidas de 500 + 500 M [7].',
    rating: 'Moody\'s Baa1 (bonos de 2026; S&P y Fitch sin comprobar en fuente primaria)',
    coste_deuda_pct: 4.3,
    vida_media_anios: 8.5,
    otros_pasivos: 'El pasivo por el acuerdo de opioides con los distribuidores (y Alabama) era de 4.200 M USD a 30-jun-2026, a pagar en 13 años (396 M en los próximos doce meses) [7]; es deuda asimilada. Siguen abiertos el caso de Baltimore (veredicto contra la empresa recurrido), la demanda civil del Departamento de Justicia por la Ley de Sustancias Controladas (dic-2022) y casos de tribus y de entidades no públicas, sin provisión [7]. Las compras de RCA y OneOncology dejan pagos contingentes: unidades de capital retenidas por los médicos (694 M y 752 M al cierre de cada compra, revalorizadas después: +153 M en 9M FY2026) y hasta 500 M de pagos por objetivos de RCA en FY2027-FY2028 (412,6 M estimados) [7]. Los arrendamientos son operativos (1.670 M de pasivo a sep-2025) y en US GAAP ya están en el EBITDA [1]. MWI Animal Health está en venta: 3.836 M de activos y 870 M de pasivos clasificados como mantenidos para la venta; la FTC pidió más información en mayo de 2026 [7].',
    comentario: 'El circulante comercial es negativo y crece en valor absoluto: existencias + clientes − proveedores = −9.002 M USD en FY2025 (−2,8 % de las ventas) [1]; los proveedores (54.720 M) financian las existencias y los cobros. La deuda bruta subió de 4.388 M en FY2024 a 11.723 M en jun-2026 por RCA (bonos de 1.800 M y préstamos de 1.500 M) y OneOncology (bonos de 3.000 M y préstamos de 1.500 M) [7, 16]. El patrimonio neto contable es pequeño (3.051 M a jun-2026) por 11.446 M de autocartera recomprada y el cargo de opioides de FY2020 [7]: la rentabilidad sobre fondos propios no dice nada.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo depende del calendario de cobros y pagos: 3.911 M USD en FY2023, 3.485 M en FY2024 y 3.875 M en FY2025, frente a un beneficio ajustado de 3.123 M en FY2025 [1, 2]. La empresa mide un flujo libre ajustado (sin pagos de litigios) de ≈ 3.000 M en FY2025 y guía otros 3.000 M en FY2026, con 900 M de inversión [6]. En 9M FY2026 el flujo operativo fue de 1.688 M (742 M en 9M FY2025) [6]: el circulante consume caja en los primeros trimestres y la devuelve en el cuarto. Casi toda la inversión es de mantenimiento y sistemas (centros de distribución, ERP); estimación propia: ≈ 0,15 % de las ventas de mantenimiento. El gasto en compras domina los usos de la caja: 5.563 M en FY2021, 4.096 M en FY2025 y 4.974 M en 9M FY2026 [1, 6].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 41, opinion: 'Favorable (sin salvedades) en FY2025, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias pero el BPA publicado es ruidoso: en FY2025 el ajustado (16,00 USD) duplica el GAAP (7,96) [2]. Lo que separa uno de otro es en parte real y repetido (reestructuración, integración, amortización de lo comprado) y en parte extraordinario (deterioros de PharmaLex de 418 y 724 M USD en dos años: la compra de 2022 no ha salido bien) [2, 8]. La revalorización de los pagos contingentes de RCA y OneOncology (153 M en 9M FY2026) se excluye del ajustado aunque es un coste de las compras [6]. El crédito LIFO de 382 M en 9M FY2026 refleja bajadas de precio de marcas y también se excluye [6]. EY audita desde 1985 (41 años), mucho más que la media. Los indicadores del motor deben leerse con cautela: el patrimonio contable mínimo deforma el Altman Z, y la plusvalía de OneOncology infla el beneficio LTM.',
    senales: [
      { senal: 'Diferencia grande entre BPA GAAP y ajustado', nivel: 'Media', comentario: 'En FY2025 el ajustado excluye 1.042 M USD de gastos operativos netos y 553 M de amortización de intangibles; la reestructuración (229 M) se repite cada año [2].' },
      { senal: 'Deterioros de fondo de comercio de PharmaLex', nivel: 'Media', comentario: '418 M USD en FY2024 y 724 M en FY2025 sobre una compra de ≈ 1.280 M EUR de 2022: error de asignación de capital reconocido [2, 8].' },
      { senal: 'Auditor con 41 años de permanencia', nivel: 'Baja', comentario: 'EY desde 1985 [1]; la ley de EE. UU. no obliga a rotar la firma, solo al socio.' },
      { senal: 'Pagos contingentes de compras fuera del ajustado', nivel: 'Baja', comentario: 'Las revalorizaciones de las unidades de capital de RCA y OneOncology (153 M USD en 9M FY2026) no cuentan en el BPA ajustado [6].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Prioridades declaradas: invertir en el crecimiento, compras en oncología y retina, recompras oportunistas, dividendo que crece con el beneficio y balance sólido [18]. El dividendo trimestral pasó de 0,55 a 0,60 USD en FY2026 [6]. En el 3T26 recompró 1.000 M USD de acciones, lo que preveía hacer hasta final de 2026 [6]. La guía a largo plazo (nov-2025) es de un crecimiento del resultado operativo ajustado del 6-9 % anual y del BPA ajustado del 9-13 %, del que 3-4 puntos vienen del despliegue de capital [2].',
    adquisiciones: [
      { anio: 'FY2021', objetivo: 'Alliance Healthcare (mayoría de la distribución de Walgreens Boots Alliance en Europa)', importe: 6500, ev_ebitda: null, financiacion: '6.275 M en caja (deuda) y 2 M de acciones', resultado: 'Integrada; el segmento internacional gana un 2,07 % de margen operativo ajustado en FY2025 frente al 1,15 % de EE. UU. [3].' },
      { anio: 'FY2022', objetivo: 'PharmaLex (servicios regulatorios para laboratorios)', importe: 1400, ev_ebitda: null, financiacion: 'Caja y deuda', resultado: 'Deterioros de 418 M USD (FY2024) y 724 M (FY2025); parte de sus negocios pasó a «Otros» para su posible venta [2, 7].' },
      { anio: 'FY2025', objetivo: 'Retina Consultants of America (85 %)', importe: 5675, ev_ebitda: null, financiacion: 'Bonos de 1.800 M y préstamos de 1.500 M; 1.087 M de pagos contingentes', resultado: 'Por encima de lo previsto según la dirección (3T26); préstamo de 1.500 M devuelto en julio de 2026 [7, 18].' },
      { anio: 'FY2026', objetivo: 'OneOncology (mayoría restante)', importe: 7387, ev_ebitda: null, financiacion: '4.649 M en caja (bonos de 3.000 M y préstamos de 1.500 M); valor razonable de la participación previa 1.934 M; 752 M contingentes', resultado: 'Consolidada desde el 2-feb-2026; aportó 820 M de ingresos hasta junio; 3.874 M de fondo de comercio y 3.062 M de intangibles [7].' },
      { anio: 'FY2026', objetivo: 'Venta de MWI Animal Health a Covetrus (fusión)', importe: 3500, ev_ebitda: null, financiacion: 'Cobro de 1.250 M en caja, 800 M en preferentes y 34,3 % de la nueva sociedad', resultado: 'Pendiente: la FTC pidió más información el 20-may-2026 [7, 17].' },
    ],
    comentario: 'La dirección asigna capital con dos caras. En el negocio principal, el rendimiento es muy alto: el resultado operativo ajustado sube un 106 % entre FY2019 y FY2025 con poca inversión fija y circulante negativo [1, 13]. Las compras grandes han sido de dos tipos: las que refuerzan la distribución o la especialidad (Alliance, RCA, OneOncology), razonables, y las de diversificación (PharmaLex, consultoría), que acabaron en deterioros y en venta [2, 7]. En 18 meses ha gastado ≈ 9.500 M USD en caja en compras de consultas médicas (RCA y OneOncology) y la deuda bruta pasó de 4.388 M a 11.723 M [7]. Las recompras reducen las acciones diluidas de 212 M en FY2019 a 195 M en FY2025 [1].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'EE. UU. (U.S. Healthcare Solutions)', descripcion: 'Distribución de medicamentos y especialidad en EE. UU., RCA y OneOncology.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 259634.9, resultado: 2652.5 }, { periodo: 'FY2025', ingresos: 284963.8, resultado: 3283.4 }] },
      { nombre: 'Internacional', descripcion: 'Alliance Healthcare (Europa), Innomar (Canadá), World Courier y parte de PharmaLex.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 26736.3, resultado: 656.7 }, { periodo: 'FY2025', ingresos: 28329.4, resultado: 587.8 }] },
      { nombre: 'Otros', descripcion: 'MWI Animal Health (en venta), Profarma (Brasil), consultoría de EE. UU. (vendida en abril de 2026) y resto de PharmaLex.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: 7739.3, resultado: 339.1 }, { periodo: 'FY2025', ingresos: 8157.8, resultado: 351.7 }] },
      { nombre: 'Eliminaciones', descripcion: 'Ventas entre segmentos.', tipo_resultado: 'EBIT', historico: [{ periodo: 'FY2024', ingresos: -151.9, resultado: 0 }, { periodo: 'FY2025', ingresos: -118.3, resultado: 0 }] },
    ],
    geografias: [{ nombre: 'EE. UU. (segmento)', peso_pct: 88.7 }, { nombre: 'Internacional (Europa, Canadá y logística)', peso_pct: 8.8 }, { nombre: 'Otros (MWI, Profarma, consultoría)', peso_pct: 2.5 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Crecimiento de ingresos del segmento de EE. UU.', valor_anterior: '13,0 % (FY2024)', valor_actual: '9,7 % (FY2025); 4,3 % en 9M FY2026', variacion: 'Desacelera', comentario: 'Bajadas de precio de marcas, pérdida de clientes y cambio de mezcla del gran cliente de venta por correo [1, 6].' },
      { kpi: 'Ventas de GLP-1 en EE. UU.', valor_anterior: '≈ 28.600 M USD (FY2024, estimación desde el aumento)', valor_actual: '+7.700 M USD y +26,9 % (FY2025)', variacion: '+26,9 %', comentario: 'Mucho volumen y margen bruto bajo [1].' },
      { kpi: 'Margen operativo ajustado del grupo', valor_anterior: '1,24 % (FY2024)', valor_actual: '1,31 % (FY2025); 1,43 % en 9M FY2026', variacion: '+7 pb', comentario: 'Especialidad y RCA/OneOncology [2, 6].' },
      { kpi: 'BPA ajustado', valor_anterior: '13,76 USD (FY2024)', valor_actual: '16,00 USD (FY2025); guía FY2026 17,75-17,95', variacion: '+16,3 %', comentario: '[2, 6]' },
      { kpi: 'Peso de Walgreens y Boots en los ingresos', valor_anterior: 'n.d.', valor_actual: '≈ 25 % (FY2025)', variacion: 'n.d.', comentario: 'Y 38 % de las cuentas a cobrar; Evernorth (Express Scripts), 13 % [1].' },
      { kpi: 'Flujo libre ajustado', valor_anterior: '3.000 M USD (FY2025)', valor_actual: '≈ 3.000 M USD (guía FY2026)', variacion: '0 %', comentario: '[6]' },
    ],
    clientes: 'La concentración es la mayor debilidad: los diez primeros clientes (con organismos públicos y centrales de compra) suman ≈ 66 % de los ingresos; Walgreens y Boots, ≈ 25 % y el 38 % de las cuentas a cobrar; Evernorth (Express Scripts), ≈ 13 % [1]. Los dos contratos principales vencen en 2029. El poder de precios es pequeño y se ve en el margen bruto: los grandes clientes negocian el diferencial, y la empresa gana con la mezcla (especialidad, genéricos comprados a través de la plataforma de Walgreens) más que con subidas de tarifa [1]. Las ventas a los dos mayores clientes subieron 6.200 M USD en FY2025, sobre todo por GLP-1 [1].',
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'EBITDA trimestral', tipo: 'Complemento', intentos: '1) notas de resultados trimestrales (dan resultado operativo ajustado, no EBITDA); 2) 10-Q (depreciación solo acumulada); 3) cálculo con la depreciación de 9M: impreciso por trimestre', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector, competencia, historia, ESG
const fB = [
  { id: 1, titulo: 'Form 10-K FY2025: negocio, competencia, crecimiento del mercado según IQVIA (8,4 % anual 2024-2029), clientes', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: `${ED}/000114085925000131/cor-20250930.htm` },
  { id: 2, titulo: 'McKesson Reports Fiscal 2026 Fourth Quarter and Full Year Results (North American Pharmaceutical: 336.652 M USD)', editor: 'McKesson Corporation', tipo: 'Primaria', fecha: '2026-05', url: 'https://s24.q4cdn.com/128197368/files/doc_financials/2026/q4/MCK-Q4-FY26-Earnings-Release_FINAL.pdf' },
  { id: 3, titulo: 'Form 10-K FY2026 (Pharmaceutical and Specialty Solutions: 234.833 M USD)', editor: 'Cardinal Health (SEC)', tipo: 'Primaria', fecha: '2026-08', url: 'https://www.sec.gov/Archives/edgar/data/721371/000072137126000038/cah-20260630.htm' },
  { id: 4, titulo: 'Cuentas anuales de los competidores (ventas, EBIT) en Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MCK/financials/' },
  { id: 5, titulo: 'AmerisourceBergen to acquire Alliance Healthcare; U.S. distribution agreement with Walgreens extended to 2029', editor: 'Business Wire', tipo: 'Primaria', fecha: '2021-01-06', url: 'https://www.businesswire.com/news/home/20210106005378/en' },
  { id: 6, titulo: 'Form 10-K FY2024: prórroga del contrato con Evernorth (Express Scripts) hasta septiembre de 2029', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-11-21', url: `${ED}/000114085924000177/cor-20240930.htm` },
  { id: 7, titulo: 'Distribución farmacéutica: ficha sectorial corta', editor: 'Repositorio de análisis (sectores/distribucion-farmaceutica-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/distribucion-farmaceutica-2026-10-15.md' },
  { id: 8, titulo: 'Cencora’s $10B+ physician acquisition spree: a breakdown', editor: 'Becker’s ASC Review', tipo: 'Prensa', fecha: '2026', url: 'https://www.beckersasc.com/asc-transactions-and-valuation-issues/cencoras-10b-physician-acquisition-spree-a-breakdown/' },
  { id: 9, titulo: 'Cencora Reports Fiscal 2026 Second Quarter Results (GLP-1, bajadas de precio de marcas)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-06', url: `${ED}/000114085926000018/exhibit991-q22026.htm` },
  { id: 10, titulo: 'Cencora stock drops 17 percent after Q2 earnings miss', editor: 'ad-hoc-news.de', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://www.ad-hoc-news.de/boerse/news/ueberblick/cencora-stock-us15135b1017-drops-17-percent-after-q2-earnings-miss/69312613' },
  { id: 11, titulo: 'Form 10-Q del 3T FY2026: litigios de opioides, DEA y Departamento de Justicia', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000114085926000034/cor-20260630.htm` },
];
const fx = CY.fx;
const fcUsd = (t, k) => { const f = FC[t]; const d = { USD: 1, JPY: fx.JPY, CHF: fx.CHF, NZD: 0.58, CNY: 0.14 }[f.divisa_cuentas] ?? 1; return Math.round(f[k] * d); };
const Bn = {
  _estado: 'Completa. Tamaño de mercado: ventas de distribución farmacéutica de EE. UU. de los tres grandes (proxy del mercado mayorista), de sus cuentas; crecimiento previsto de IQVIA citado en el 10-K.',
  sector: {
    definicion: 'Mercado relevante: la distribución mayorista de medicamentos con receta en EE. UU. (de marca, genéricos y especialidad) a farmacias, hospitales, consultas y gestores de farmacia, que da el 89 % de las ventas de Cencora [1]. Se mide por las ventas de los segmentos farmacéuticos de EE. UU. de los tres grandes (McKesson, Cencora y Cardinal), que mueven más del 90 % del volumen [2, 3, 1]: ≈ 866.000 M USD en los últimos ejercicios publicados (estimación propia; ejercicios a marzo, junio y septiembre). Europa (Alliance Healthcare) y Canadá son mercados aparte, regulados por país, y pesan menos del 9 % [1]. Detalle en la ficha sectorial [7].',
    tamano: '≈ 866.000 M USD de ventas de distribución farmacéutica en EE. UU. de los tres grandes (último ejercicio de cada uno) [2, 3, 1]',
    unidad_serie: 'millones de USD (ventas de los segmentos de EE. UU. de los tres grandes; estimación propia)',
    serie: [
      { anio: '2024', tamano: 769000 }, { anio: '2025', tamano: 856000 }, { anio: '2026e', tamano: 905000 }, { anio: '2027e', tamano: 950000 }, { anio: '2028e', tamano: 1000000 },
    ],
    tcac_historico_pct: 10.0, tcac_previsto_pct: 6.0, cr5_pct: 95.0, estructura: 'Concentrada',
    drivers: [
      { driver: 'Volumen de recetas y envejecimiento', efecto: '+', horizonte: 'Estructural', evidencia: 'La población de 65 años o más llegará a ≈ 71 millones en 2029 [1].' },
      { driver: 'GLP-1 (diabetes y obesidad)', efecto: '+/−', horizonte: 'Estructural', evidencia: '+7.700 M USD de ventas en FY2025 en Cencora (+26,9 %), con margen bruto muy inferior a la media [1, 9].' },
      { driver: 'Especialidad (oncología, retina, biosimilares)', efecto: '+', horizonte: 'Estructural', evidencia: 'Los tres grandes han gastado más de 14.000 M USD en comprar consultas de oncología, retina, urología y digestivo [8].' },
      { driver: 'Precios de los medicamentos de marca (IRA, nación más favorecida)', efecto: '−', horizonte: 'Estructural', evidencia: 'Las bajadas de precio de marcas restaron ≈ 2.000 M USD de ventas a Cencora en el 2T26 [10, 9].' },
      { driver: 'Genéricos y biosimilares', efecto: '+', horizonte: 'Cíclico', evidencia: 'La conversión a genéricos baja las ventas pero sube el margen del distribuidor; los biosimilares de la parte B son favorables [1].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Oligopolio estable de tres que compiten por contratos de grandes cuentas: márgenes operativos del 1,0-1,2 % en EE. UU. [2, 3, 1].' },
      { fuerza: 'Poder de los clientes', intensidad: 5, justificacion: 'Walgreens y Boots, 25 % de las ventas de Cencora; Evernorth, 13 %; los diez primeros, 66 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Ningún laboratorio supera el 10 % de las compras [1]; la comisión por servicio está pactada.' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala, licencias por estado y de la DEA, y la red de almacenes; Amazon y los gestores de farmacia no han entrado en la distribución mayorista general [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'La venta directa del laboratorio al paciente (TrumpRx, plataformas propias) y la integración de los gestores de farmacia afectan a nichos; el grueso sigue pasando por el mayorista [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'La demanda de medicamentos no depende del ciclo: las ventas de Cencora crecieron en 2009, 2020 y 2022-2023 [1]. Lo que se mueve es la inflación de precios de marca y genéricos (crédito o cargo LIFO) y el volumen de GLP-1. Hoy el volumen crece, pero la bajada de precios de algunas marcas frenó las ventas en 2026 [9].' },
    regulacion: 'La Ley de Reducción de la Inflación fija precios negociados en Medicare para los primeros diez fármacos desde enero de 2026 y para quince más desde 2027, lo que reduce las ventas facturadas por el distribuidor. La política de «nación más favorecida» y los acuerdos directos de precios con laboratorios presionan los precios de lista. Los aranceles a los medicamentos importados encarecen el coste, que el distribuidor traslada. El acuerdo de opioides de 2022 obliga a un sistema de control común de pedidos sospechosos [11].',
    tendencias: 'La especialidad crece más que la distribución general: los tres grandes compran consultas de oncología, retina, urología y digestivo para asegurarse el volumen de fármacos de alto precio y vender servicios [8]. Cencora gana con ello (RCA y OneOncology). La automatización de almacenes y la previsión de demanda con IA bajan el coste por unidad. Los biosimilares de la parte B y los GLP-1 suben el volumen; la venta directa del laboratorio al paciente es una amenaza aún pequeña [1].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 34.0,
    posicion: '2.º distribuidor farmacéutico de EE. UU. (≈ 34 % del volumen de los tres grandes; estimación propia), detrás de McKesson (≈ 39 %) y delante de Cardinal (≈ 27 %) [2, 3, 1]; 2.º-3.º mayorista en Reino Unido y otros países europeos con Alliance Healthcare.',
    competidores: [
      { nombre: 'McKesson', pais: 'EE. UU.', ticker: 'MCK', ingresos: fcUsd('MCK', 'ventas'), cuota_pct: 39.0, margen_ebit_pct: r2(FC.MCK.margen_ebit), comentario: 'Líder; más diversificado (oncología con US Oncology Network y Florida Cancer Specialists, software de recetas) [2, 4].' },
      { nombre: 'Cardinal Health', pais: 'EE. UU.', ticker: 'CAH', ingresos: fcUsd('CAH', 'ventas'), cuota_pct: 27.0, margen_ebit_pct: r2(FC.CAH.margen_ebit), comentario: 'Tercero; también productos médicos; compra consultas de digestivo y urología [3, 4].' },
      { nombre: 'Henry Schein', pais: 'EE. UU.', ticker: 'HSIC', ingresos: fcUsd('HSIC', 'ventas'), cuota_pct: null, margen_ebit_pct: r2(FC.HSIC.margen_ebit), comentario: 'Distribución a dentistas y médicos; no compite en la mayorista farmacéutica general [4].' },
      { nombre: 'Medipal Holdings', pais: 'Japón', ticker: '7459.T', ingresos: fcUsd('7459.T', 'ventas'), cuota_pct: null, margen_ebit_pct: r2(FC['7459.T'].margen_ebit), comentario: 'Mayor mayorista de Japón; mercado regulado aparte [4].' },
      { nombre: 'Alfresa Holdings', pais: 'Japón', ticker: '2784.T', ingresos: fcUsd('2784.T', 'ventas'), cuota_pct: null, margen_ebit_pct: r2(FC['2784.T'].margen_ebit), comentario: 'Mayorista japonés [4].' },
      { nombre: 'Galenica', pais: 'Suiza', ticker: 'GALE.SW', ingresos: fcUsd('GALE.SW', 'ventas'), cuota_pct: null, margen_ebit_pct: r2(FC['GALE.SW'].margen_ebit), comentario: 'Farmacias y mayorista (Alloga, Galexis) en Suiza [4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La plataforma de compras de genéricos con Walgreens (WBAD) da algo de escala en la compra, no un efecto de red [1].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Contratos de 5-10 años con integración logística y de sistemas; aun así, Walgreens movió parte del volumen fuera del contrato principal en julio de 2026 [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 2, evidencia: 'Licencias estatales y de la DEA en cada almacén; Good Neighbor Pharmacy, primera en satisfacción de J. D. Power por 14.ª vez [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Margen operativo ajustado del 1,15 % en EE. UU. sobre 285.000 M USD: un entrante no podría igualar el coste por unidad sin el volumen [1].' },
        { fuente: 'Escala eficiente', puntuacion: 5, evidencia: 'Tres empresas con más del 90 % del mercado y márgenes que no atraen entrantes; ninguna ha perdido la posición en dos décadas [2, 3, 1].' },
      ],
    },
    amenazas: 'El oligopolio aguanta, pero el margen depende de pocos clientes: Walgreens (propiedad de Sycamore desde agosto de 2025) y Express Scripts renuevan en 2029 [1, 5, 6], y cada renovación suele ceder diferencial. La venta directa de laboratorios y los precios negociados de Medicare bajan las ventas facturadas. Probabilidad de erosión seria en cinco años: baja; de recortes de margen en la renovación de 2029: media.',
    confianza: 'Media',
  },
  historia: {
    resumen: 'Cencora nace en 2001 de la fusión de AmeriSource Health y Bergen Brunswig como AmerisourceBergen [1]. En 2013 firma una alianza con Walgreens y Alliance Boots que la convierte en su distribuidor en EE. UU. y le da acceso a su plataforma de compras de genéricos; Walgreens llegó a tener ≈ 30 % del capital y salió por debajo del 5 % en 2025 [1, 5]. Compra MWI Animal Health en 2015 y Alliance Healthcare en 2021 (≈ 6.500 M USD) [5]. En 2021-2022 cierra con los otros dos grandes el acuerdo nacional de opioides [11]. En 2023 cambia de nombre a Cencora. Robert Mauch sucede a Steven Collis como consejero delegado en octubre de 2024. Desde 2025 compra consultas médicas especializadas (RCA, OneOncology) y vende lo no farmacéutico (MWI, consultoría) [8].',
    hitos: [
      { anio: '2001', hito: 'Fusión de AmeriSource Health y Bergen Brunswig: AmerisourceBergen.' },
      { anio: '2013', hito: 'Alianza a 10 años con Walgreens y Alliance Boots; plataforma común de compras de genéricos.' },
      { anio: '2015', hito: 'Compra de MWI Animal Health.' },
      { anio: '2020', hito: 'Cargo de 6.600 M USD por el acuerdo de opioides.' },
      { anio: '2021', hito: 'Compra de Alliance Healthcare a Walgreens (≈ 6.500 M USD) y prórroga del contrato con Walgreens hasta 2029.' },
      { anio: '2022', hito: 'Entra en vigor el acuerdo nacional de opioides de los distribuidores; compra de PharmaLex.' },
      { anio: '2023', hito: 'Cambio de nombre a Cencora.' },
      { anio: '2024', hito: 'Robert Mauch, consejero delegado; Evernorth prorroga hasta 2029.' },
      { anio: '2025', hito: 'Compra del 85 % de Retina Consultants of America; Sycamore compra Walgreens.' },
      { anio: '2026', hito: 'Compra de OneOncology; acuerdo para fusionar MWI con Covetrus; rebaja de la guía de ingresos en mayo.' },
    ],
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la distribución de sustancias controladas: el acuerdo de opioides cuesta 4.200 M USD pendientes de pago en 13 años y obliga a un sistema común de vigilancia de pedidos [11]. Sigue abierto el caso del Departamento de Justicia por la Ley de Sustancias Controladas, con posibles sanciones por cada pedido sospechoso no comunicado [11]. La seguridad de los datos de pacientes es el segundo asunto (acuerdo de 40 M USD por una filtración).',
    controversias: 'Opioides: veredicto de responsabilidad en Baltimore (nov-2024), recurrido; demanda civil del Departamento de Justicia (dic-2022) pendiente [11]. Filtración de datos de 2024 resuelta con un acuerdo de 40 M USD.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Cencora compra medicamentos a los laboratorios y los distribuye a farmacias de cadena e independientes, hospitales, consultas médicas y gestores de farmacia en EE. UU. (89 % de las ventas), y en Europa y Canadá con Alliance Healthcare e Innomar [1]. Tiene una red de centros de distribución con licencia de la DEA, la franquicia de farmacias independientes Good Neighbor Pharmacy y servicios para laboratorios (logística de ensayos clínicos con World Courier, acceso al mercado, servicios de datos) [1]. Desde 2025 es dueña de consultas de retina (RCA) y desde 2026 de una plataforma de oncología (OneOncology), lo que le asegura el volumen de fármacos de especialidad que esas consultas administran [8].',
    como_gana_dinero: 'Cobra un diferencial pequeño sobre un volumen enorme: 3,57 % de margen bruto y 1,31 % de margen operativo ajustado en FY2025 [1]. Los ingresos son casi todos recurrentes (contratos de varios años). El beneficio depende de la mezcla: los genéricos y la especialidad dejan más margen que las marcas y los GLP-1; los laboratorios pagan comisiones por servicio pactadas sobre el precio de lista, por lo que la inflación de precios ayuda y las bajadas restan [1, 9]. El apalancamiento operativo es alto: los costes crecen menos que el volumen. El circulante es negativo (proveedores > existencias + clientes), así que crecer genera caja. Estacionalidad: el 2T (enero-marzo) concentra el beneficio por las subidas de precios de enero y el ajuste LIFO [9].',
    confianza: 'Alta',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) informe de sostenibilidad de la empresa (no da notas externas); 2) MSCI ESG y Sustainalytics (páginas con JavaScript, sin texto legible); 3) búsqueda de prensa sin cifra fiable', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, retribución, accionistas', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-22', url: `${ED}/000162828026003061/cor-20260122.htm` },
  { id: 2, titulo: '8-K, punto 5.07: resultados de la junta de 2026 (voto consultivo de retribución: 156,9 M a favor, 11,4 M en contra)', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-03-06', url: `${ED}/000114085926000014/abc-20260305.htm` },
  { id: 3, titulo: 'Form 4 de consejeros y directivos (oct-2025 a oct-2026)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001140859&type=4' },
  { id: 4, titulo: 'Cencora elects Robert E. Sanchez to its Board of Directors', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-09-25', url: `${ED}/000110465926110624/tm2626030d1_ex99-1.htm` },
  { id: 5, titulo: 'Cencora Reports Fiscal 2026 Third Quarter Results (nombramientos de Eva Boratto y Samantha Hammock)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000114085926000032/exhibit991-q32026.htm` },
  { id: 6, titulo: 'Cencora Reports Fiscal 2025 Fourth Quarter and Full Year Results (guía FY2026 inicial y a largo plazo)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-05', url: `${ED}/000114085925000128/exhibit991-q42025.htm` },
  { id: 7, titulo: 'Cencora Reports Fiscal 2024 Fourth Quarter and Full Year Results', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-11-06', url: `${ED}/000114085924000148/exhibit991-q42024.htm` },
  { id: 8, titulo: 'Cencora CFO Cleary to retire in June 2026; reaffirms FY26 EPS outlook', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-03-17', url: 'https://seekingalpha.com/symbol/COR/news' },
  { id: 9, titulo: 'Cencora Reports Fiscal 2023 Fourth Quarter and Full Year Results (guía FY2024)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-11-02', url: `${ED}/000114085923000147/exhibit991-q42023.htm` },
];
const F4 = lee('form4.json');
const insiders = F4.operaciones.filter((o) => o.codigo === 'P' || o.codigo === 'S').map((o) => ({ fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: Math.round(o.acciones), importe: r2(o.importe / 1e6) }));
const C = {
  _estado: 'Completa con el proxy de enero de 2026, el 8-K de la junta y los Form 4.',
  directivos: {
    equipo: [
      { nombre: 'Robert P. Mauch', cargo: 'Presidente y consejero delegado', desde: '2024', participacion_pct: 0.05, trayectoria: 'En la empresa desde 2007; dirigió la distribución de EE. UU. Como consejero delegado ha cerrado RCA y OneOncology y decidido vender MWI; ha cumplido o superado la guía de BPA en FY2025 y en FY2026 hasta el 3T [1, 6, 5].' },
      { nombre: 'Eva Boratto', cargo: 'Directora financiera', desde: '2026', participacion_pct: 0.0, trayectoria: 'Antes directora financiera de CVS Health; sustituye a James Cleary, que se jubiló en junio de 2026 [5, 8].' },
      { nombre: 'D. Mark Durcan', cargo: 'Presidente del consejo (independiente)', desde: '2015', participacion_pct: 0.01, trayectoria: 'Ex consejero delegado de Micron; consejero coordinador en 2023-2025 y presidente desde el 1-oct-2025. Compró 8.000 acciones (2,16 M USD) en mayo y junio de 2026 tras la caída [1, 3].' },
      { nombre: 'Elizabeth S. Campbell', cargo: 'Vicepresidenta ejecutiva y directora jurídica', desde: '2022', participacion_pct: 0.01, trayectoria: 'Responsable de los litigios de opioides; vendió 4,8 M USD en acciones en 12 meses [1, 3].' },
      { nombre: 'Silvana Battaglia', cargo: 'Vicepresidenta ejecutiva (personas y estrategia)', desde: '2021', participacion_pct: 0.0, trayectoria: '[1]' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'BPA ajustado 17,45-17,75 USD (nov-2025); ingresos +5-7 %', real: 'Guía subida a 17,75-17,95 USD; ingresos rebajados al 4-6 % (pendiente: 4-nov-2026)', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: 'BPA ajustado 15,85-16,15 USD (nov-2024)', real: '16,00 USD', cumplida: 'Sí' },
      { anio: 'FY2024', guia: 'BPA ajustado 13,30-13,60 USD (nov-2023)', real: '13,76 USD', cumplida: 'Sí' },
      { anio: 'Largo plazo', guia: 'Resultado operativo ajustado +6-9 % y BPA ajustado +9-13 % anual (nov-2025)', real: 'FY2025: +15,8 % y +16,3 %', cumplida: 'Sí' },
    ],
    comentario: 'Equipo con credibilidad: ha cumplido o superado la guía de BPA ajustado cada año desde FY2023 [6, 7, 9]. La sucesión de Collis por Mauch (anunciada con un año de antelación) fue ordenada. Hay rotación reciente en finanzas (Boratto sustituye a Cleary en junio de 2026) y en recursos humanos [5, 8]. La guía de ingresos de FY2026 sí falló: se rebajó dos puntos en mayo, aunque el BPA se mantuvo [5].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'D. Mark Durcan', cargo: 'Presidente', tipo: 'Independiente', desde: '2015', comisiones: 'Gobierno' },
      { nombre: 'Robert P. Mauch', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'Frank K. Clyburn', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: 'Retribución' },
      { nombre: 'Ellen G. Cooper', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Lon R. Greenberg', cargo: 'Consejero', tipo: 'Independiente', desde: '2013', comisiones: 'Auditoría' },
      { nombre: 'Lorence H. Kim', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Finanzas' },
      { nombre: 'Redonda G. Miller', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Gobierno; comisión especial de litigios' },
      { nombre: 'Dennis M. Nally', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Presidente de Auditoría' },
      { nombre: 'Lori J. Ryerkerk', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: '—' },
      { nombre: 'Lauren M. Tyler', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Retribución; comisión especial de litigios' },
      { nombre: 'Robert E. Sanchez', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: '—' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 93.0, voto_remuneracion_contra_pct: 6.8, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 18.26, fijo: 1.35, variable_corto: 4.28, variable_largo: 12.0, ratio_salario_medio: 198 },
    remuneracion: 'El variable anual de FY2025 se mide con el resultado operativo ajustado (40 %), el BPA ajustado (25 %) y el flujo libre ajustado (25 %); pagó el 185,3 % del objetivo [1]. El variable a largo plazo (acciones por objetivos a tres años) se mide con el crecimiento anual del BPA ajustado (75 %) y el ROIC ajustado medio (25 %), con un modificador de ±15 % por la rentabilidad total frente a los competidores [1]. Todo en cifras ajustadas: premia comprar con deuda si el BPA ajustado sube, aunque la amortización y los costes de integración se excluyan. La retribución total del consejero delegado se duplicó en su primer año completo (18,3 M USD frente a 9,3 M) [1]. El voto en contra fue del 6,8 % en 2026 [2].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11.6, tipo: 'Institucional (13G)', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 8.4, tipo: 'Institucional (13G)', variacion: 'Estable' },
      { nombre: 'Walgreens Boots Alliance', pct: null, tipo: 'Antiguo socio estratégico', variacion: 'Bajó del 5 % en junio de 2025; ya no es accionista significativo' },
      { nombre: 'Consejeros y directivos (15 personas)', pct: 0.4, tipo: 'Internos', variacion: 'Ventas netas de 14,4 M USD en 12 meses' },
      { nombre: 'Autocartera', pct: 36.0, tipo: 'Autocartera (107,5 M de acciones de 298,3 M emitidas)', variacion: '+4,0 M de acciones en 9M FY2026' },
    ],
    insiders,
    control_y_defensas: 'Sin accionista de control desde que Walgreens bajó del 5 % en 2025 [1]. Una sola clase de acciones, consejo elegido cada año, mayoría para elegir consejeros y derecho de los accionistas con el 25 % a convocar una junta extraordinaria [1]. Los estatutos fijan Delaware como foro exclusivo para demandas derivadas. No hay operaciones vinculadas relevantes desde que Walgreens dejó de ser accionista significativo, aunque el contrato de distribución sigue [1].',
    alertas: [
      'Ventas de directivos: 16,7 M USD en 12 meses (8,9 M del consejero delegado), frente a 2,3 M de compras de dos consejeros tras la caída de mayo [3].',
      'Rotación en la dirección financiera: Cleary se jubila en junio de 2026 y entra Boratto [5, 8].',
      'Demanda derivada por la supervisión de opioides resuelta con un acuerdo aprobado en noviembre de 2025 [1].',
    ],
    confianza: 'Alta',
  },
  fuentes: fC,
  huecos: [],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de COR, SPY y XLV (precio, rango, volumen, betas, cierres de ejercicio)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/COR/history/' },
  { id: 2, titulo: 'Consenso de analistas de COR (earningsTrend, financialData, recommendationTrend, calendarEvents)', editor: 'Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/COR/analysis/' },
  { id: 3, titulo: 'Cencora (COR) Stock Forecast & Price Target: BPA FY2026 de 17,88 USD; objetivo medio 370,17 USD', editor: 'Stock Analysis', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://stockanalysis.com/stocks/cor/forecast/' },
  { id: 4, titulo: 'Comparables (MCK, CAH, HSIC, 7459.T, 2784.T, 9987.T, GALE.SW, EBO.AX, 1099.HK): precio, capitalización, valor empresa, EBITDA y estimaciones', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/MCK/' },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates: 10 años al 5,19 % el 14-oct-2026', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Form 10-Q del 3T FY2026: 190.826.409 acciones en circulación a 30-jun-2026; deuda y caja', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000114085926000034/cor-20260630.htm` },
  { id: 8, titulo: 'Covetrus and MWI Animal Health to Merge (valor empresa de MWI 3.500 M USD)', editor: 'Cencora, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-18', url: `${ED}/000110465926016785/tm266695d1_ex99-1.htm` },
  { id: 9, titulo: 'Cencora’s $10B+ physician acquisition spree: a breakdown (RCA, OneOncology, EyeSouth)', editor: 'Becker’s ASC Review', tipo: 'Prensa', fecha: '2026', url: 'https://www.beckersasc.com/asc-transactions-and-valuation-issues/cencoras-10b-physician-acquisition-spree-a-breakdown/' },
  { id: 10, titulo: 'Form 10-K FY2025 de Cencora: ventas de MWI (Animal Health, 5.695 M USD)', editor: 'Cencora, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-25', url: `${ED}/000114085925000131/cor-20250930.htm` },
  { id: 11, titulo: 'Tipo de cambio EUR/USD del 14-oct-2026 (1,1221 USD por EUR)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-14', url: 'https://finance.yahoo.com/quote/EURUSD=X/' },
  { id: 12, titulo: 'McKesson’s Fiscal 2027 Guidance «Encouraging», Cencora Selloff Overdone, Morgan Stanley Says', editor: 'MT Newswires (Placera)', tipo: 'Prensa', fecha: '2026-05-08', url: 'https://www.placera.se/telegram/mckesson-s-fiscal-2027-guidance-encouraging-cencora-selloff-overdone-morgan-stanley-says-20260508' },
];
const nombres = { MCK: ['McKesson', 'US'], CAH: ['Cardinal Health', 'US'], HSIC: ['Henry Schein', 'US'], '7459.T': ['Medipal Holdings', 'JP'], '2784.T': ['Alfresa Holdings', 'JP'], '9987.T': ['Suzuken', 'JP'], 'GALE.SW': ['Galenica', 'CH'], 'EBO.AX': ['EBOS Group', 'AU'] };
const roicYahoo = (t) => { const v = FC[t]?.roic; return v != null && v < 60 ? r1(v) : null; };
const comps = CY.empresas.filter((c) => nombres[c.ticker]).map((c) => ({
  nombre: nombres[c.ticker][0], ticker: c.ticker, pais: nombres[c.ticker][1], capitalizacion: Math.round(c.capitalizacion_usd_m),
  ev_ventas: r2(c.ev_ventas), ev_ebitda_ltm: r1(c.ev_ebitda_ltm), ev_ebitda_ntm: r1(c.ev_ebitda_ntm), per_ntm: r1(c.per_ntm),
  crecimiento_pct: r1(c.crecimiento_pct), margen_ebitda_pct: r2(c.margen_ebitda_pct), roic_pct: roicYahoo(c.ticker), dn_ebitda: r2(c.dn_ebitda), fcf_yield_pct: c.fcf_yield_pct ? r1(c.fcf_yield_pct) : null,
}));
const cor = CY.empresas.find((c) => c.ticker === 'COR');
const cierres = Object.fromEntries(B.cierres_ejercicio.map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'Completa. Comparables con un solo proveedor (Yahoo) para LTM y NTM; EBITDA NTM = ventas NTM del consenso × margen EBITDA LTM. PER NTM en la base de BPA del consenso (ajustado en EE. UU.).',
  identificacion: {
    nombre: 'Cencora, Inc.', nombre_corto: 'Cencora', ticker: 'COR', isin: 'US03073E1055', mercado: 'New York Stock Exchange', indice_referencia: 'S&P 500 (SPY)',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Distribuidores de productos sanitarios', sede: 'Conshohocken (Pensilvania)', fundacion: '2001', empleados: 51000, web: 'https://www.cencora.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 192.0, capitalizacion_publicada: Math.round(cor.capitalizacion_usd_m), free_float_pct: 99.6,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-11-04',
  },
  consenso: {
    guidance: 'Guía de FY2026 (ejercicio cerrado el 30-sep-2026, se publica el 4-nov-2026), actualizada el 5-ago-2026: ingresos +4-6 % (antes +5-7 % en noviembre de 2025 y +7-9 % antes de mayo), resultado operativo ajustado +13-14 %, BPA ajustado 17,75-17,95 USD, intereses netos ≈ 490 M, tipo impositivo ajustado ≈ 20 %, 194 M de acciones diluidas, flujo libre ajustado ≈ 3.000 M e inversión ≈ 900 M [7]. A largo plazo: resultado operativo ajustado +6-9 % y BPA ajustado +9-13 % anual [7]. La guía de FY2027 llegará en noviembre; FY2027 sumará cuatro meses más de OneOncology y perderá el volumen de Walgreens que salió el 1-jul-2026 y, previsiblemente, MWI a mitad de año [12].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: Math.round(cor.tendencia[0].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(cor.tendencia[0].eps), dpa: 2.40, fuente: `Yahoo Finance, ${cor.tendencia[0].n_eps} analistas (BPA ajustado) [2]; Stock Analysis 17,88 [3]` },
      { periodo: 'FY2027e', ingresos: Math.round(cor.tendencia[1].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(cor.tendencia[1].eps), dpa: null, fuente: `Yahoo Finance, ${cor.tendencia[1].n_eps} analistas (BPA ajustado) [2]` },
    ],
    recomendaciones: { n_analistas: 14, comprar: 11, mantener: 3, vender: 0, po_medio: r2(cor.objetivo_medio), po_min: cor.objetivo_min, po_max: cor.objetivo_max },
    revisiones: `El BPA ajustado de FY2026 del consenso pasó de ${r2(cor.tendencia[0].eps_hace90)} USD hace 90 días a ${r2(cor.tendencia[0].eps)} (+${r1((cor.tendencia[0].eps / cor.tendencia[0].eps_hace90 - 1) * 100)} %) por la subida de la guía del 5-ago; el de FY2027, de ${r2(cor.tendencia[1].eps_hace90)} a ${r2(cor.tendencia[1].eps)}, casi sin cambio [2]. Los ingresos se recortaron tras la rebaja de la guía de mayo (crecimiento previsto del 4,4 % en FY2027) [2]. El objetivo medio es de ${r2(cor.objetivo_medio)} USD (12 analistas en Yahoo; 14 en Stock Analysis: 10 comprar y 4 mantener) [2, 3]. Solo hay estimaciones gratuitas completas de una fuente; se contrastan el objetivo y las recomendaciones con Stock Analysis.`,
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 0.07,
    confianza: 'Media',
  },
  bolsa: { ...B.bolsa, posicion_corta_pct: null, comentario: 'Cencora rentó un 24,4 % anual en cinco años frente al 13,0 % del S&P 500 y el 8,1 % del sector salud (XLV) [1]: el BPA ajustado creció un 15 % anual y el PER subió. En 2026 se ha quedado atrás (+0,1 % en el año frente al +13,7 % del índice) por la caída del 17,4 % del 6-may-2026 tras rebajar la guía de ingresos y la del 5,9 % del 12-ago por el volumen de Walgreens que pasó a otros mayoristas [1]. Desde el mínimo de 244,82 USD del 6-may ha subido un 37 % con la subida de la guía de BPA y las recompras. La beta es baja (0,60 mensual a 5 años; 0,73 ajustada) y la volatilidad de un año (32,4 %) está inflada por esas dos sesiones [1].', confianza: 'Alta' },
  multiplos_historicos: {
    serie: ['FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((a) => ({ anio: a, precio_cierre: cierres[a], ev_ebitda_ntm: null, per_ntm: null, excluir: a === 'FY2020' })),
    comentario: null,
    confianza: 'Media',
  },
  comparables: {
    criterio: 'McKesson y Cardinal son los únicos comparables directos (mismo mercado, mismos clientes). Se añaden distribuidores de salud con modelo de diferencial pequeño sobre gran volumen: Henry Schein (dental y médico), tres mayoristas japoneses (Medipal, Alfresa, Suzuken), Galenica (Suiza) y EBOS (Australia y Nueva Zelanda). Se excluye Sinopharm (1099.HK): empresa pública china con PER de 6,2x por riesgo de gobierno y cobro, que no describe el mercado de Cencora. Owens & Minor y Patterson no tienen cotización o datos utilizables.',
    empresas: comps,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-02', objetivo: 'MWI Animal Health (fusión con Covetrus)', comprador: 'Covetrus (Clayton, Dubilier & Rice y TPG)', ev: 3500, ev_ventas: r2(3500 / 5694.5), ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor empresa publicado [8]; ventas FY2025 de Animal Health [10].' },
      { fecha: '2026-02', objetivo: 'OneOncology (mayoría restante)', comprador: 'Cencora', ev: 7387, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor razonable total de la contraprestación por el 100 % [7]; sin EBITDA publicado.' },
      { fecha: '2025-01', objetivo: 'Retina Consultants of America (85 %)', comprador: 'Cencora', ev: 5675, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Contraprestación total con contingentes [7].' },
      { fecha: '2026-03', objetivo: 'Negocio de retina de EyeSouth Partners', comprador: 'Cencora (RCA)', ev: 1100, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Anunciada; sin múltiplo publicado [9].' },
    ],
    comentario: 'Las operaciones recientes del sector son compras de consultas médicas especializadas por los propios distribuidores (RCA, OneOncology, EyeSouth; Cardinal con GI Alliance y Solaris; McKesson con Florida Cancer Specialists), sin múltiplos publicados [9]. La única con ventas publicadas, MWI, se valora en 0,61 veces las ventas, muy por encima de las 0,23 veces de Cencora, porque la distribución veterinaria tiene más margen. Cencora, con 64.000 M USD de capitalización, no es objetivo plausible de compra: el sector está en un oligopolio de tres y una fusión entre ellos no pasaría la competencia.',
    confianza: 'Baja',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA de las operaciones', tipo: 'Complemento', intentos: '1) 8-K y 10-Q de Cencora (dan precio, no EBITDA); 2) notas de McKesson y Cardinal sobre sus compras de consultas (sin EBITDA); 3) prensa sectorial (Becker\'s, PE Hub: solo precios)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) FINRA (sin acceso directo); 2) Yahoo quoteSummary (no lo da en este módulo); 3) prensa', decision: 'Omitido' },
    { seccion: 'consenso', campo: 'BPA de consenso de FY2028', tipo: 'Complemento', intentos: '1) Yahoo earningsTrend (solo dos ejercicios); 2) Stock Analysis (de pago); 3) MarketScreener (no abre)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Seeking Alpha: titulares y artículos de COR (RSS), jul-oct 2026', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/api/sa/combined/COR.xml' },
  { id: 2, titulo: 'Stocktwits: mensajes de $COR (últimos 30)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://api.stocktwits.com/api/2/streams/symbol/COR.json' },
  { id: 3, titulo: 'AI Disruption May Benefit Cencora More Than Hims & Hers', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://seekingalpha.com/article/4954095-ai-disruption-may-benefit-cencora-more-than-hims-and-hers' },
  { id: 4, titulo: 'Cencora Earnings Review: The Selloff Was Overdone In My View', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-05-07', url: 'https://seekingalpha.com/article/4900480-cencora-earnings-review-the-selloff-was-overdone-in-my-view' },
  { id: 5, titulo: 'Cencora’s Pharmaceutical Distribution Margins Still Pretending Pricing Power Exists', editor: 'Barchart', tipo: 'Foros y redes', fecha: '2026', url: 'https://www.barchart.com/story/news/3647885/cencora-s-pharmaceutical-distribution-margins-still-pretending-pricing-power-exists' },
  { id: 6, titulo: 'Cencora: Specialty Infrastructure Is Rewriting The Distributor Model', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-22', url: 'https://seekingalpha.com/article/4924309-cencora-specialty-infrastructure-is-rewriting-the-distributor-model' },
];
const E = {
  _estado: 'Completa con lo que abre (Reddit da 403): RSS de Seeking Alpha, API de Stocktwits y titulares de artículos de opinión.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Seeking Alpha (artículos de opinión)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Los autores ven la caída de mayo como exagerada y la especialidad (RCA, OneOncology) como el cambio del modelo; uno de octubre defiende que la IA beneficia más a Cencora que a las farmacias en línea [1, 3, 4, 6].' },
      { plataforma: 'Seeking Alpha (noticias y comentarios)', fecha: '2026-08', n_comentarios: 15, tono: 'Dividido', resumen: 'La salida de parte del volumen de Walgreens (12-ago) y la investigación de la FTC sobre MWI generaron dudas; las subidas de objetivo de los analistas las compensaron [1].' },
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Neutro', resumen: 'Poco debate de fondo: mensajes alcistas sueltos, el acuerdo de 40 M USD por la filtración de datos y especulación sobre una compra de Outlook Therapeutics que nadie ha confirmado [2].' },
      { plataforma: 'Barchart (opinión)', fecha: '2026-09', n_comentarios: 5, tono: 'Negativo', resumen: 'Sostiene que los márgenes de la distribución no tienen poder de precios y que el mercado paga demasiado por un negocio de diferencial [5].' },
    ],
    temas: [
      { tema: 'La especialidad (oncología y retina) cambia el modelo', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto en parte: el segmento de EE. UU. sube su margen operativo del 1,02 % al 1,15 % entre FY2024 y FY2025 con RCA, pero esas compras han costado ≈ 9.500 M USD de caja y deuda.' },
      { tema: 'Dependencia de Walgreens tras su compra por Sycamore', postura: 'Bajista', peso: 'Alto', contraste: 'Justificado: 25 % de las ventas y contrato hasta 2029; la salida de volumen de julio confirma que el cliente negocia.' },
      { tema: 'Venta exagerada en mayo', postura: 'Alcista', peso: 'Medio', contraste: 'Los datos les dieron la razón: el BPA siguió subiendo y la acción recuperó un 37 % desde el mínimo; hoy cotiza a 17 veces el BPA del próximo ejercicio, encima de su historia.' },
      { tema: 'La IA y las farmacias en línea', postura: 'Alcista', peso: 'Bajo', contraste: 'Razonable: la IA no sustituye la logística física con licencia; el riesgo es indirecto (desintermediación por venta directa).' },
    ],
    lectura: 'El sentimiento es positivo y mejora desde el mínimo de mayo, en línea con los analistas (11 de 14 en comprar). No hay euforia ni capitulación: el debate se centra en Walgreens y en el precio de las compras de consultas, que ya están en el informe. Lo que el foro no discute es la valoración: la acción cotiza por encima de su PER histórico, y ese es el argumento de este informe para no comprar.',
    confianza: 'Media',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
