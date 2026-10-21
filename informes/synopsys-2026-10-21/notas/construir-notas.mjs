// Escribe las notas A-E de Synopsys (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL de la SEC
// (cuentas-xbrl.json y companyfacts), de bolsa.json (Yahoo, cierre del 20-oct-2026), de yahoo-datos.json (quoteSummary del
// 21-oct-2026, 16:39 UTC), de form4.json y de la prensa citada. Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/synopsys-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const n2 = (x) => String(x).replace('.', ',');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/883241';
const U = {
  k10: `${ED}/000088324125000028/snps-20251031.htm`,
  q1: `${ED}/000088324126000014/snps-20260131.htm`,
  q2: `${ED}/000088324126000018/snps-20260430.htm`,
  q3: `${ED}/000088324126000025/snps-20260731.htm`,
  r3T26: `${ED}/000119312526368620/d157153dex991.htm`,
  r2T26: `${ED}/000119312526241911/d126227dex991.htm`,
  r1T26: `${ED}/000119312526071601/d921168dex991.htm`,
  r4T25: `${ED}/000119312525314200/d29055dex991.htm`,
  r3T25: `${ED}/000119312525199178/d56931dex991.htm`,
  r4T24: `${ED}/000119312524270723/d868165dex991.htm`,
  r4T23: `${ED}/000119312523285209/d613884dex991.htm`,
  r4T22: `${ED}/000119312522295428/d425134dex991.htm`,
  r4T21: `${ED}/000119312521345415/d123849dex991.htm`,
  r4T20: `${ED}/000119312520308415/d72016dex991.htm`,
  r4T19: `${ED}/000119312519306224/d822869dex991.htm`,
  r4T18: `${ED}/000119312518343886/d668237dex991.htm`,
  proxy: `${ED}/000088324126000007/snps-20260219.htm`,
  k8asr: `${ED}/000119312526413359/d830308dex991.htm`,
  k8asr1: `${ED}/000119312526084396/d113900dex991.htm`,
  k8nvda: `${ED}/000119312525303209/d36680dex991.htm`,
  k8elliott: `${ED}/000119312526241920/d96543dex991.htm`,
  k8restr: `${ED}/000119312525276232/d48382d8k.htm`,
  k8restrA: `${ED}/000119312526368858/d135796d8ka.htm`,
  k8cro: `${ED}/000119312525263692/d89167d8k.htm`,
  k8junta: `${ED}/000119312526164085/d467081d8k.htm`,
  k8gc: `${ED}/000119312526345878/d148701d8k.htm`,
  k8shimer: `${ED}/000119312526059438/d78071dex991.htm`,
  cf: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000883241.json',
  inv: 'https://www.stocktitan.net/news/SNPS/synopsys-details-growth-strategy-and-long-term-financial-model-at-xslp4ekpao8i.html',
};

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2025 (cerrado el 31-oct-2025): cuentas, Ansys, segmentos, geografía, deuda, riesgos', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-22', url: U.k10 },
  { id: 2, titulo: 'Form 10-Q del 3T FY2026 (31-jul-2026): balance, deuda, venta de Processor IP a GlobalFoundries, cartera, geografía', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-26', url: U.q3 },
  { id: 3, titulo: 'Synopsys Posts Financial Results for Third Quarter Fiscal Year 2026 (conciliación GAAP-no GAAP, guía FY2026)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-26', url: U.r3T26 },
  { id: 4, titulo: 'Synopsys Posts Financial Results for Fourth Quarter and Fiscal Year 2025 (BPA no GAAP 12,91 USD; guía FY2026)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-12-10', url: U.r4T25 },
  { id: 5, titulo: 'Notas de resultados del 4T FY2018 a FY2024 (BPA no GAAP anual y guías iniciales)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2024-12-04', url: U.r4T24 },
  { id: 6, titulo: 'Notas de resultados del 1T25, 2T25, 3T25, 1T26 y 2T26 (trimestres, segmentos)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-27', url: U.r2T26 },
  { id: 7, titulo: 'XBRL company facts de Synopsys (cifras reexpresadas sin Software Integrity, remuneración en acciones, amortizaciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: U.cf },
  { id: 8, titulo: 'Synopsys Investor Day 2026: guía de FY2027 y modelo financiero a largo plazo (FY2026-FY2030)', editor: 'Synopsys, Inc. (nota de prensa vía Stock Titan)', tipo: 'Primaria', fecha: '2026-09-30', url: U.inv },
  { id: 9, titulo: 'Form 8-K: plan de reestructuración de noviembre de 2025 (≈ 10 % de la plantilla) y 8-K/A de agosto de 2026 (coste elevado a 425-500 M USD)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-26', url: U.k8restrA },
  { id: 10, titulo: 'Form 8-K: recompra acelerada de 1.000 M USD con JPMorgan (5-oct-2026) y de 250 M USD (2-mar-2026)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-05', url: U.k8asr },
  { id: 11, titulo: 'Form 8-K: colocación privada de 2.000 M USD a NVIDIA a 414,79 USD por acción y alianza estratégica', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-01', url: U.k8nvda },
];

// No recurrentes dentro del EBIT GAAP (gasto, en positivo): reestructuración y costes de la compra de Ansys a nivel operativo [1, 4, 5].
const NOREC = { 2021: 33.4, 2022: 11.2, 2023: 66.9, 2024: 138.7, 2025: 254.8 };
// Correcciones al XBRL de la herramienta [7]: FY2022 reexpresado sin Software Integrity (SIG, discontinuada desde FY2024);
// beneficio y BPA de operaciones continuadas en FY2022-FY2025 (el total de FY2024 lleva la plusvalía de la venta de SIG).
const FIX = {
  2022: { ingresos: 4615.7, gastos_generales: 956.3, beneficio_neto: 970.2, bpa: 6.20 },
  2023: { beneficio_neto: 1227.0, bpa: 7.91 },
  2024: { beneficio_neto: 1441.7, bpa: 9.25 },
  2025: { beneficio_neto: 1336.1, bpa: 8.07 },
};
const anios = ['2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo.replace('FY', ''))).map((c) => {
  const a = c.periodo.replace('FY', '');
  const o = { ...c, ...(FIX[a] ?? {}), periodo: 'FY' + a, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[a], dpa: 0, dpa_extraordinario: 0 };
  o.ebitda = r1(o.ebit + o.amortizaciones);
  delete o.fin; return o;
});
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo.replace('FY', ''))).map((b) => {
  const a = b.periodo.replace('FY', '');
  const o = { ...b, periodo: 'FY' + a, arrendamientos: 0, activos_contrato: null };
  delete o.fin; return o;
});
// Flujos: capex = solo inmovilizado (el XBRL de la herramienta suma compras de negocios en «PaymentsToAcquireIntangibleAssets»).
const CAPEX = { 2021: 93.8, 2022: 136.6, 2023: 189.6, 2024: 139.5, 2025: 169.5 };
const ADQ = { 2021: 296.0, 2022: 422.4, 2023: 297.7, 2024: 156.9, 2025: 16681.3 };
const DESINV = { 2021: 0, 2022: 0, 2023: 0, 2024: 1462.9, 2025: 820.9 };
const EMIS = { 2021: 210.7, 2022: 238.0, 2023: 253.0, 2024: 232.2, 2025: 228.4 };
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo.replace('FY', ''))).map((f) => {
  const a = f.periodo.replace('FY', '');
  const o = { ...f, periodo: 'FY' + a, capex: CAPEX[a], adquisiciones: ADQ[a], desinversiones: DESINV[a], dividendos: 0, emision_acciones: EMIS[a], pagos_arrendamientos: 0 };
  delete o.fin; return o;
});

// Trimestres: EBITDA ajustado = resultado operativo ajustado de los segmentos (no GAAP) + depreciación (≈ 40 M por trimestre en
// FY2025 y ≈ 50 M en FY2026: D&A menos amortización de intangibles comprados; estimación propia) [3, 4, 6].
const trim = (p, ing, g, ebitda, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda, margen_ebitda_pct: r2(ebitda / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2025, los 10-Q de FY2026 y las notas de resultados. Correcciones a mano: FY2022 reexpresado sin Software Integrity (ingresos 4.615,7, no 5.081,5); beneficio y BPA de operaciones continuadas (FY2024: 1.441,7 y 9,25, no 2.263,4 y 14,51 con la plusvalía de SIG); capex solo de inmovilizado (FY2025: 169,5, no 16.850,7, que suma la compra de Ansys). FY2021 es el publicado entonces (con SIG). Arrendamientos operativos fuera (US GAAP). Ingresos diferidos en pasivos_contrato (circulante).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jul-26', fecha_fin: '2026-07-31', ingresos: 9416.8, ebitda: 2613.5, ebit: 802.4, beneficio_neto: 1076.6, bpa: 5.66, dpa: 0, dpa_extraordinario: 0, fcf: 2747.6, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 334.5 },
    cambios_perimetro: [
      { periodo: 'FY2025', descripcion: 'Ansys consolidada desde el 17-jul-2025 (3,5 meses: 667,7 M USD de ingresos en el 4T25); entra entera en el balance (fondo de comercio de 26.899 M e intangibles de 12.680 M) y solo en parte en la cuenta [1, 4].' },
      { periodo: 'FY2024', descripcion: 'Software Integrity (SIG) vendida el 30-sep-2024 por ≈ 2.100 M USD y presentada como operación discontinuada; FY2022-FY2023 reexpresados sin ella [7, 5].' },
      { periodo: 'FY2022', descripcion: 'Primer año reexpresado sin SIG (4.615,7 M de ingresos frente a 5.081,5 publicados entonces); FY2021 sigue con SIG (≈ 400-450 M de ingresos): el crecimiento de FY2022 sale bajo [7].' },
    ],
    comentario: 'Los ingresos de operaciones continuadas pasaron de 4.615,7 M USD en FY2022 a 7.054,2 M en FY2025 (TCAC del 15,2 %) y a 9.416,8 M en los 12 meses a julio de 2026, ya con Ansys [1, 2, 7]. Sin Ansys (755 M, el 10,7 % de las ventas de FY2025), los ingresos crecieron solo un 2,8 %: el diseño de chips (Design Automation, 5.302 M con Ansys; ≈ +8 % sin ella; margen ajustado del 42 %) subió con el hardware de verificación, pero la propiedad intelectual (Design IP) cayó un 8 % (1.752 M frente a 1.906) y su margen ajustado se hundió del 38 % al 24 % por las restricciones de exportación a China del 3T FY2025, la menor demanda de un gran cliente de fundición (Intel) y «decisiones de hoja de ruta y recursos que no dieron el resultado previsto» [1, 4]. En FY2026 la IP sigue débil (−6 % en el 2T26, 474 M en el 3T26 frente a 428 un año antes) y Synopsys vendió Processor IP (ARC) a GlobalFoundries el 1-jun-2026 [2, 3, 6]. El EBIT GAAP de FY2025 (914,9 M, 13 %) está deprimido por la amortización de intangibles de Ansys (504 M), los costes de la compra (255 M) y la remuneración en acciones (893 M) [1].',
    ajustes: 'El BPA no GAAP excluye la amortización de intangibles comprados, la remuneración en acciones, los costes de compras y de reestructuración, plusvalías y minusvalías de ventas de negocios y sus efectos fiscales [3, 4]. En FY2025 el BPA GAAP de operaciones continuadas fue de 8,07 USD y el no GAAP de 12,91: la diferencia (4,84 USD) es sobre todo remuneración en acciones (893 M, ≈ 5,4 USD antes de impuestos) y amortización de intangibles (504 M, ≈ 3,0 USD), compensadas en parte por la plusvalía de la venta de la división de óptica (OSG) a Keysight (≈ 508 M en otros ingresos) [1, 4]. En los nueve meses de FY2026: GAAP 3,27 USD frente a no GAAP 11,02, con 1.210 M de amortización de intangibles, 713 M de remuneración en acciones, 236 M de reestructuración y una plusvalía de 425 M por Processor IP [2, 3]. La guía de FY2026 lo resume: margen operativo GAAP ≈ 10,4 % frente a no GAAP ≈ 41,5 % [3]. Nuestro DCF trata la remuneración en acciones como coste (≈ 9,8 % de las ventas en FY2026); el BPA no GAAP se usa solo en la regla a 12 meses porque es la base en la que cotiza la acción.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('4T24', 1636, null, 603.2 + 40, 3.40, 'Superior'),
      trim('1T25', 1455, null, 531.2 + 40, 3.03, 'Superior'),
      trim('2T25', 1604, null, 609.3 + 40, 3.67, 'Superior'),
      trim('3T25', 1740, null, 669.8 + 40, 3.39, 'Inferior'),
      trim('4T25', 2255, 37.8, 822.6 + 50, 2.90, 'Superior'),
      trim('1T26', 2409, 65.6, 1013.7 + 50, 3.77, 'Superior'),
      trim('2T26', 2276, 41.9, 899.7 + 50, 3.35, 'Superior'),
      trim('3T26', 2477, 42.3, 1030.4 + 50, 3.91, 'Superior'),
    ],
    ultima_presentacion: 'Trimestres fiscales (el 3T26 es may-jul 2026); el crecimiento interanual de FY2026 lleva Ansys, que no estaba un año antes. EBITDA ajustado = resultado operativo ajustado de los segmentos + depreciación (estimación propia) y BPA no GAAP de la empresa [3, 6]. En el 3T26 (26-ago-2026) los ingresos fueron de 2.476,8 M USD y el BPA no GAAP de 3,91, por encima de la guía y del consenso; Design Automation 2.003 M y Design IP 474 M (+11 % interanual tras tres trimestres de caídas) [3]. La empresa subió la guía de FY2026: ingresos de 9.690-9.740 M (Ansys ≈ 2.980 M), margen operativo no GAAP ≈ 41,5 %, BPA no GAAP de 15,04-15,10 USD (GAAP 3,53-3,84 con la plusvalía de Processor IP), flujo operativo ≈ 2.800 M y libre ≈ 2.600 M; 4T26: ingresos de 2.530-2.580 M y BPA no GAAP de 4,10-4,16 [3]. En el día del inversor (30-sep-2026) dio la guía de FY2027: ingresos de 11.100-11.200 M (+15 %), margen no GAAP ≈ 44 %, BPA no GAAP de 19,04-19,12 USD (GAAP 8,16-8,61), flujo libre ≈ 3.100 M e inversión ≈ 500 M; y para FY2026-FY2030, ingresos +15 % anual, margen no GAAP del 50 % en FY2030 y BPA y flujo libre creciendo «a mitad de los veinte» [8]. La cartera de pedidos era de 10.900 M USD a 31-jul-2026 (49 % a 12 meses) [2].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [
      { anio: 'FY2027 (abr-2027)', importe: 1000 }, { anio: 'FY2028', importe: 1000 }, { anio: 'FY2030', importe: 2000 }, { anio: 'FY2032', importe: 1500 }, { anio: 'FY2035', importe: 2400 }, { anio: 'FY2055', importe: 2100 },
    ],
    liquidez: 'Caja de 3.607,7 M USD a 31-jul-2026 (3.606,3 de caja y equivalentes y 1,4 de inversiones a corto) y una línea de crédito revolvente de 850 M no dispuesta hasta diciembre de 2027 [2]. El préstamo a plazo de la compra de Ansys está devuelto entero (3.463,7 M amortizados en nueve meses) [2]. Después del balance, 1.000 M de caja salieron en octubre para la recompra acelerada con JPMorgan [10].',
    rating: 'Grado de inversión (calificaciones de S&P y Moody\'s sin comprobar en fuente primaria)',
    coste_deuda_pct: 5.1,
    vida_media_anios: 9.9,
    otros_pasivos: 'Bonos sénior de 10.000 M USD emitidos en marzo de 2025 para Ansys: 1.000 M al 4,55 % (2027), 1.000 M al 4,65 % (2028), 2.000 M al 4,85 % (2030), 1.500 M al 5,00 % (2032), 2.400 M al 5,15 % (2035) y 2.100 M al 5,70 % (2055), más 99,5 M de coberturas de tipos diferidas y 10,9 M de otros [2]. Ingresos diferidos de 2.715 M (2.331 a corto y 384 a largo) [2]. Pasivos por arrendamiento operativo ≈ 800 M (fuera del puente por US GAAP) [1]. Plan de reestructuración de noviembre de 2025 (≈ 10 % de la plantilla) con un coste total elevado a 425-500 M USD en agosto de 2026 [9].',
    comentario: 'La compra de Ansys (34.900 M USD: 17.600 M en caja y 17.100 M en 29,955 M de acciones) cambió el balance: el fondo de comercio pasó de 3.449 M en FY2024 a 26.899 M en FY2025 y los intangibles de 195 a 12.680 M; juntos son el 82 % del activo [1]. La deuda financiera, nula en FY2024, llegó a 13.485 M en FY2025 (bonos y préstamo a plazo) y bajó a 10.037 M a 31-jul-2026 tras devolver el préstamo con caja, la venta de Processor IP y los 2.000 M de NVIDIA [2, 11]. Deuda neta de 6.430 M, ≈ 1,6 veces el EBITDA no GAAP de los últimos 12 meses (≈ 3.900 M) y ≈ 2,5 veces el EBITDA GAAP [2, 3]. El circulante comercial es negativo por los ingresos diferidos (los clientes pagan las licencias por adelantado).',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 1.493-1.739 M USD en FY2021-FY2023, bajó a 1.407 M en FY2024 por los impuestos de la venta de SIG y fue de 1.519 M en FY2025 con los costes de la compra de Ansys [1]. En los nueve meses de FY2026 sumó 2.299 M, con 156 M de inversión [2]; la guía es de ≈ 2.800 M de flujo operativo y ≈ 2.600 M de flujo libre en FY2026 y ≈ 3.100 M de libre en FY2027 (con ≈ 500 M de inversión) [3, 8]. La inversión en inmovilizado es baja (1,9-3,6 % de las ventas). La caja se ha ido a Ansys (16.681 M netos en FY2025), a devolver deuda (3.464 M en 2026) y a recompras (753-1.161 M al año en FY2021-FY2023, ninguna en FY2024-FY2025, 300 M en 2026 hasta julio y 1.000 M en octubre) [1, 2, 10]. Sin dividendo. Los pagos de impuestos por las acciones entregadas a empleados (305 M en FY2025) son el coste en caja de la remuneración en acciones [1].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'KPMG LLP', anios_auditor: 34, opinion: 'Favorable (sin salvedades) en FY2025, también sobre el control interno [1]',
    comentario: 'Cuentas limpias y auditadas por KPMG desde 1992, pero la cifra que sigue el mercado (BPA no GAAP) excluye costes que se repiten: la remuneración en acciones (893 M USD en FY2025, el 12,7 % de las ventas; ≈ 950 M guiados en FY2026) y la reestructuración (380-410 M en FY2026, tras otras en FY2021-FY2023) [1, 3]. Además, FY2025 y FY2026 llevan plusvalías de ventas de negocios (OSG ≈ 508 M y Processor IP 425 M) que inflan el BPA GAAP de esos años [1, 2]. El fondo de comercio (26.835 M) y los intangibles (11.459 M) son el 80 % del activo: un deterioro de Ansys o de la IP restaría patrimonio sin salida de caja. Los indicadores del motor (Altman, Beneish) se leen con cuidado en el año de la compra.',
    senales: [
      { senal: 'BPA no GAAP frente a GAAP', nivel: 'Alta', comentario: 'FY2025: 12,91 USD frente a 8,07; 9M FY2026: 11,02 frente a 3,27. Guía FY2027: 19,04-19,12 no GAAP frente a 8,16-8,61 GAAP [3, 4, 8].' },
      { senal: 'Remuneración en acciones fuera del ajustado', nivel: 'Media', comentario: '893 M USD en FY2025 (12,7 % de las ventas) y ≈ 950-980 M en FY2026-FY2027; nuestro DCF la resta [1, 8].' },
      { senal: 'Reestructuraciones repetidas', nivel: 'Media', comentario: 'Plan de noviembre de 2025 de 425-500 M (antes 300-350); cargos también en FY2021-FY2023 [9, 7].' },
      { senal: 'Fondo de comercio de Ansys', nivel: 'Media', comentario: '≈ 23.000 M USD de fondo de comercio nuevo; prueba de deterioro anual sin pérdidas hasta ahora [1, 2].' },
      { senal: 'Plusvalías en otros ingresos', nivel: 'Baja', comentario: 'OSG (≈ 508 M en FY2025) y Processor IP (425 M en el 3T26) suben el BPA GAAP, no el no GAAP [1, 2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Tras la compra de Ansys, prioridades: devolver deuda (préstamo a plazo devuelto en 2026), invertir en IA y simulación y devolver hasta el 50 % del flujo libre con recompras; sin dividendo [8, 2]. Recompras aceleradas de 250 M USD (marzo de 2026) y de 1.000 M (octubre de 2026, liquidación hasta enero de 2027) [10]. En diciembre de 2025 NVIDIA compró 2.000 M USD en acciones nuevas a 414,79 USD (≈ 4,8 M de acciones) dentro de una alianza tecnológica [11].',
    adquisiciones: [
      { anio: 'FY2025', objetivo: 'Ansys (simulación y análisis multifísico)', importe: 34900, ev_ebitda: null, financiacion: '17.600 M en caja (bonos de 10.000 M y préstamo a plazo) y 17.100 M en acciones (29,955 M)', resultado: '≈ 2.980 M USD de ingresos guiados en FY2026; condiciones de competencia: venta de OSG y de PowerArtist [1, 3].' },
      { anio: 'FY2024', objetivo: 'Venta de Software Integrity (SIG) a Clearlake y Francisco Partners', importe: 2100, ev_ebitda: null, financiacion: 'Venta (caja)', resultado: 'Operación discontinuada; plusvalía en FY2024 [1].' },
      { anio: 'FY2025', objetivo: 'Venta de Optical Solutions Group a Keysight', importe: null, ev_ebitda: null, financiacion: 'Venta (caja)', resultado: 'Remedio de competencia por Ansys; plusvalía ≈ 508 M USD en otros ingresos [1].' },
      { anio: 'FY2026', objetivo: 'Venta de Processor IP Solutions (ARC) a GlobalFoundries', importe: 443.3, ev_ebitda: null, financiacion: 'Venta (caja)', resultado: 'Plusvalía de 425,4 M USD; ≈ 40 M menos de ingresos en FY2026 [2].' },
    ],
    comentario: 'Synopsys ha pasado de un negocio de diseño de chips sin deuda que recompraba ≈ 1.000 M USD al año a un grupo de diseño y simulación con 10.000 M de deuda: la compra de Ansys (≈ 15 veces sus ventas) es la mayor de la historia del sector y su rentabilidad depende de las sinergias de ingresos que la dirección promete en el día del inversor (simulación de sistemas con IA) [8, 1]. Las acciones diluidas subieron de ≈ 156 M en FY2024 a ≈ 192 M en 2026 (+23 %) por Ansys y NVIDIA [2, 11]. A la vez ha vendido lo que no era núcleo (SIG, OSG, Processor IP) [1, 2]. El ROIC con el fondo de comercio de Ansys cae muy por debajo del de antes de la compra: la prueba está en los próximos años.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Design Automation (EDA y, desde julio de 2025, simulación y análisis de Ansys)', descripcion: 'Software de diseño y verificación de chips, hardware de emulación y prototipado (ZeBu, HAPS) y software de simulación multifísica (Ansys).', tipo_resultado: 'EBIT ajustado', historico: [{ periodo: 'FY2023', ingresos: 3775.3, resultado: 1413.9 }, { periodo: 'FY2024', ingresos: 4221.1, resultado: 1631.9 }, { periodo: 'FY2025', ingresos: 5302.3, resultado: 2213.5 }] },
      { nombre: 'Design IP', descripcion: 'Bloques de propiedad intelectual de semiconductores (interfaces como USB, PCIe, DDR, UCIe; bibliotecas; seguridad) que los clientes integran en sus chips.', tipo_resultado: 'EBIT ajustado', historico: [{ periodo: 'FY2023', ingresos: 1542.7, resultado: 514.1 }, { periodo: 'FY2024', ingresos: 1906.3, resultado: 730.2 }, { periodo: 'FY2025', ingresos: 1751.8, resultado: 419.3 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 43.6 }, { nombre: 'Europa', peso_pct: 17.0 }, { nombre: 'Corea del Sur', peso_pct: 11.7 }, { nombre: 'China', peso_pct: 9.9 }, { nombre: 'Resto de Asia y otros', peso_pct: 17.8 }],
    geografias_criterio: 'cliente (nueve meses de FY2026)',
    kpis: [
      { kpi: 'BPA no GAAP (USD)', valor_anterior: '13,20', valor_actual: '12,91', variacion: '−2 %', comentario: 'FY2025 frente a FY2024, con la dilución de Ansys; guía FY2026 15,04-15,10 [4, 3].' },
      { kpi: 'Ingresos de Design IP (M USD)', valor_anterior: '1.906', valor_actual: '1.752', variacion: '−8 %', comentario: 'Margen ajustado del 38 % al 24 %; China, Intel y errores de hoja de ruta [1].' },
      { kpi: 'Ingresos de Ansys (M USD)', valor_anterior: '668 (3,5 meses de FY2025)', valor_actual: '≈ 2.980 (guía FY2026)', variacion: 'n. a.', comentario: 'Consolidada desde el 17-jul-2025 [4, 3].' },
      { kpi: 'Cartera de pedidos (M USD)', valor_anterior: '11.400', valor_actual: '10.900', variacion: '−4 %', comentario: 'Fin de FY2025 frente a 31-jul-2026; 49 % a 12 meses [1, 2].' },
      { kpi: 'Margen operativo no GAAP', valor_anterior: '≈ 37 % (FY2025)', valor_actual: '≈ 41,5 % (guía FY2026)', variacion: '+4,5 pp', comentario: 'Objetivo ≈ 44 % en FY2027 y 50 % en FY2030 [3, 8].' },
      { kpi: 'Ventas a China (% del total)', valor_anterior: '16,1 % (FY2024)', valor_actual: '9,9 % (9M FY2026)', variacion: '−6,2 pp', comentario: 'Restricciones de exportación de mayo-julio de 2025 y competencia local [1, 2].' },
    ],
    clientes: 'Clientes: fabricantes y diseñadores de chips (Intel, Samsung, TSMC, NVIDIA, AMD, Qualcomm, Apple), hiperescaladores que diseñan sus propios chips (AWS, Google, Microsoft) y, con Ansys, la industria (automóvil, aeroespacial, energía). Un cliente fue el 12,6 % de las ventas en FY2024 y el 13,5 % en FY2023 (por la descripción de la fundición, Intel); en FY2025 ninguno pasó del 10 % [1]. Licencias plurianuales (normalmente tres años) que se reconocen a lo largo del contrato; el hardware y parte de la IP se reconocen al entregar. Poder de precios alto en diseño de chips: duopolio con Cadence y costes de cambio muy altos [1].',
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Electronic System Design Industry Posts $5.7 Billion in Revenue in Q2 2026, ESD Alliance Reports (+12,2 %)', editor: 'SEMI / ESD Alliance', tipo: 'Sectorial', fecha: '2026-10', url: 'https://www.semi.org/en/semi-press-release/electronic-system-design-industry-posts-%245.7-billion-in-revenue-in-q2-2026-esd-alliance-reports' },
  { id: 2, titulo: 'ESD Alliance Reports Electronic System Design Industry Posts $5.7 Billion in Revenue in Q1 2026 (+12,7 %)', editor: 'SEMI / ESD Alliance', tipo: 'Sectorial', fecha: '2026-07', url: 'https://www.semi.org/en/semi-press-release/esd-alliance-reports-electronic-system-design-industry-posts-5.7-billion-dollars-in-revenue-in-q1-2026' },
  { id: 3, titulo: 'ESD Alliance Reports Electronic System Design Industry Posts $5.5 Billion in Revenue in Q4 2025', editor: 'SEMI / ESD Alliance', tipo: 'Sectorial', fecha: '2026-04', url: 'https://www.semi.org/en/semi-press-release/esd-alliance-reports-electronic-system-design-industry-posts-5.5-billion-dollars-in-revenue-in-q4-2025' },
  { id: 4, titulo: 'Form 10-K FY2025 de Synopsys: negocio, competencia, restricciones de exportación, riesgos de IA', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-22', url: U.k10 },
  { id: 5, titulo: 'Cadence Design Systems: análisis value del 14-oct-2026 (mercado, cuotas, Porter, foso)', editor: 'Repositorio de análisis (informes/cadence-2026-10-14)', tipo: 'Analistas', fecha: '2026-10-14', url: 'informes/cadence-2026-10-14/' },
  { id: 6, titulo: 'Fichas de competidores (ventas, EBITDA, crecimiento previsto) de Yahoo Finance', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com' },
  { id: 7, titulo: 'Siemens completes acquisition of Altair Engineering (≈ 10.000 M USD)', editor: 'Siemens AG (nota de prensa)', tipo: 'Primaria', fecha: '2025-03-26', url: 'https://news.siemens.com/es-es/siemens-altair/' },
  { id: 8, titulo: 'Cadence stock fell 9% in a day on a Chinese AI chip demo (miedo a que la IA abarate el diseño)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.tikr.com/blog/cadence-stock-fell-9-in-a-day-on-a-chinese-ai-chip-demo-heres-where-the-stock-could-go-in-2026' },
  { id: 9, titulo: 'Synopsys Investor Day 2026 (IA agéntica, AWS, OpenAI, objetivos FY2030)', editor: 'Synopsys, Inc. (nota de prensa vía Stock Titan)', tipo: 'Primaria', fecha: '2026-09-30', url: U.inv },
  { id: 10, titulo: 'Form 10-Q del 3T FY2026 (ingresos por grupo de productos y geografía)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-26', url: U.q3 },
];
const ycr = (t) => r1(Y[t].trend.find((x) => x.periodo === '+1y').crec_ventas * 100);
const B_ = {
  _estado: 'Completa. Mercado: serie de la ESD Alliance (SEMI), la única que suma ingresos declarados; LTM a junio de 2026 y previsión propia. Cuota, Porter y foso contrastados con el informe de Cadence del 14-oct-2026.',
  sector: {
    definicion: 'Mercado relevante: el diseño de sistemas electrónicos tal como lo mide la ESD Alliance de SEMI, que suma los ingresos declarados por las empresas en herramientas de diseño de chips (EDA: diseño, verificación, fabricación), propiedad intelectual de semiconductores, ingeniería asistida (CAE, donde entra la simulación de Ansys), diseño de placas y servicios [1, 2, 3]. Es el perímetro donde compiten Synopsys, Cadence y Siemens EDA, y cubre ≈ 99 % de las ventas de Synopsys. La simulación mecánica general de Ansys (estructuras, fluidos) entra solo en parte en la categoría CAE; ahí compite también con Dassault (SIMULIA), Siemens-Altair, Autodesk y Hexagon-Cadence.',
    tamano: '≈ 22.490 M USD en los 12 meses a junio de 2026 (suma propia de los cuatro últimos trimestres de la ESD Alliance) [1, 2, 3]',
    unidad_serie: 'millones de USD (ESD Alliance; 2026e-2028e previsión propia al 9 % anual)',
    serie: [{ anio: '2025', tamano: 21220 }, { anio: '2026e', tamano: 23500 }, { anio: '2027e', tamano: 25600 }, { anio: '2028e', tamano: 27900 }],
    tcac_historico_pct: 10, tcac_previsto_pct: 9, cr5_pct: 80, estructura: 'Concentrada',
    drivers: [
      { driver: 'Chips para IA y centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Más transistores, encapsulado 3D y chiplets multiplican el trabajo de diseño y verificación; el mercado creció un 12,7 % y un 12,2 % en el 1T y 2T de 2026 [1, 2].' },
      { driver: 'Hiperescaladores que diseñan su propio chip', efecto: '+', horizonte: 'Estructural', evidencia: 'AWS firmó con Synopsys un acuerdo de IP de más de 1.000 M USD (día del inversor) [9].' },
      { driver: 'Simulación de sistemas (gemelo digital)', efecto: '+', horizonte: 'Estructural', evidencia: 'Synopsys compró Ansys (34.900 M), Siemens a Altair (≈ 10.000 M) y Cadence a BETA CAE y Hexagon D&E [4, 7, 5].' },
      { driver: 'IA que automatiza el diseño', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Los incumbentes venden agentes de IA (Synopsys.ai, AgentEngineer), pero una demostración china de diseño con IA de código abierto tumbó a Cadence un 9 % en un día [8, 9].' },
      { driver: 'Controles de exportación a China', efecto: '−', horizonte: 'Cíclico', evidencia: 'En mayo-julio de 2025 EE. UU. exigió licencias para vender EDA a China; las ventas de Synopsys en China bajaron un 22 % sin Ansys en FY2025 [4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 2, justificacion: 'Duopolio de hecho con Cadence en el flujo completo de diseño, más Siemens EDA en verificación física; compiten en funcionalidad, no en precio [5].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes grandes y concentrados (fundiciones, NVIDIA, hiperescaladores) que negocian contratos plurianuales; un cliente llegó al 13,5 % de las ventas [4].' },
      { fuerza: 'Poder de los proveedores', intensidad: 1, justificacion: 'El insumo es talento de ingeniería; no hay proveedores críticos [5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Décadas de I+D y certificación con las fundiciones para cada nodo; los rivales chinos (Empyrean) entran por su mercado protegido [4, 5].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'La IA generativa puede abaratar partes del flujo y los grandes clientes pueden hacer su propia IP; hoy los incumbentes la integran y cobran por ella [8, 9].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El EDA es poco cíclico: licencias de tres años que se renuevan y presupuestos de I+D que no se recortan en las caídas de los semiconductores (el mercado creció en 2020 y 2022-2023 mientras los chips corregían) [5]. Lo cíclico es el hardware de emulación, la IP (ligada a nuevos diseños y a clientes concretos, como mostró la caída de 2025) y la parte de China. Hoy el mercado crece al 12 % con la inversión en chips de IA [1, 2].' },
    regulacion: 'Lo que más pesa son los controles de exportación de EE. UU. a China: en mayo de 2025 el Departamento de Comercio (BIS) exigió licencias para vender software de diseño a clientes chinos y las levantó en julio; la incertidumbre interrumpió nuevos diseños y Synopsys vio caer su IP y sus ventas en China [4]. Las autoridades de competencia exigieron vender OSG y PowerArtist para aprobar Ansys, y China la aprobó con condiciones [4]. No hay regulación de precios. Riesgo abierto: nuevas restricciones o represalias chinas (investigaciones antimonopolio, preferencia por EDA local).',
    tendencias: 'Tres tendencias: los chips para IA (chiplets, encapsulado 3D, fotónica) aumentan el trabajo de diseño y de simulación física; los proveedores incorporan agentes de IA que hacen tareas de ingenieros y pueden cambiar cómo se cobra (por uso, por resultado) [9]; y el diseño electrónico converge con la simulación de sistemas (térmica, mecánica, electromagnética), por eso Synopsys compró Ansys y Cadence y Siemens compraron simulación [4, 7]. El riesgo nuevo es que la IA abarate el diseño hasta el punto de reducir licencias o permitir alternativas de código abierto [8].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 42, posicion: '1.º proveedor mundial de diseño de sistemas electrónicos: ≈ 42 % del mercado de la ESD Alliance en los 12 meses a junio de 2026 (estimación propia: 9.417 M sobre ≈ 22.490 M; Cadence ≈ 25 %) y líder en IP de interfaz [1, 2, 5]',
    competidores: [
      { nombre: 'Cadence Design Systems', pais: 'EE. UU.', ticker: 'CDNS', ingresos: Math.round(Y.CDNS.ventas / 1e6), cuota_pct: 25, margen_ebit_pct: 29, comentario: `Segundo del duopolio; crece ≈ ${ycr('CDNS')} % en 2027 según el consenso; compró BETA CAE y Hexagon D&E para competir en simulación [5, 6].` },
      { nombre: 'Siemens EDA (Siemens AG)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Antigua Mentor Graphics (comprada en 2016 por 4.500 M USD); fuerte en verificación física y placas; con Altair (2025) suma simulación. No publica cifras separadas [7].' },
      { nombre: 'Dassault Systèmes (SIMULIA)', pais: 'Francia', ticker: 'DSY', ingresos: Math.round(Y['DSY.PA'].ventas / 1e6 * 1.1234), cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival de Ansys en simulación estructural y de fluidos; crece ≈ 6 % [6].' },
      { nombre: 'Arm Holdings', pais: 'Reino Unido', ticker: 'ARM', ingresos: Math.round(Y.ARM.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en IP de procesadores (Synopsys vendió la suya, ARC, en 2026); no compite en interfaces [6].' },
      { nombre: 'Empresas chinas de EDA (Empyrean, Primarius y otras)', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Ganan cuota en su mercado con apoyo público y por los controles de exportación [4].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 3, evidencia: 'Las fundiciones certifican cada nodo con las herramientas de Synopsys y Cadence; los ingenieros se forman en ellas [4].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'Flujos de diseño de años, equipos formados y contratos de tres años; cartera de 10.900 M USD [10, 4].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Décadas de I+D (≈ 35 % de las ventas en FY2025) y el mayor catálogo de IP de interfaz certificada [4].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'No compite en precio; la escala reparte la I+D [4].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Un mercado de ≈ 22.500 M repartido entre tres; un cuarto no tendría escala [1, 5].' },
      ],
    },
    amenazas: 'Cuatro amenazas. La IA: puede aumentar el uso de las herramientas (más diseños, más simulación) o abaratar el trabajo hasta reducir licencias y abrir la puerta a alternativas de código abierto; el mercado ya lo teme (caídas del 8-9 % en un día en 2026) [8]. China: sustitución por EDA local en un mercado que fue el 16 % de las ventas en FY2024 y hoy es el 10 % [4, 10]. La IP: los grandes clientes pueden hacerse su propia IP y Synopsys perdió terreno en 2025 por errores propios [4]. Y Cadence y Siemens han comprado simulación para no dejar a Synopsys-Ansys el paquete integrado. Probabilidad de erosión del foso del EDA en cinco años: baja; de presión en la IP y en China: media.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Synopsys vende el software con el que se diseñan y verifican los chips (EDA), los bloques de propiedad intelectual que los fabricantes integran en ellos (IP) y, desde julio de 2025 con Ansys, software de simulación física para productos de todo tipo (coches, aviones, móviles) [4]. En los nueve meses de FY2026, el EDA fue el 49,5 % de las ventas, Ansys el 31,4 %, la IP el 18,6 % y otros el 0,5 % [10]. Tiene ≈ 28.000 empleados y sede en Sunnyvale (California) [4].',
    como_gana_dinero: 'Cobra licencias de software por tiempo (normalmente tres años, renovables) que se reconocen a lo largo del contrato, vende hardware de emulación y prototipado, y cobra la IP por licencia y regalías [4]. El margen operativo no GAAP es alto (≈ 41,5 % guiado en FY2026, 44 % en FY2027) porque el coste es sobre todo I+D e ingeniería, que se reparte entre miles de clientes [9]. El margen GAAP es mucho menor (≈ 10 % en FY2026) por la amortización de intangibles de Ansys, la remuneración en acciones (≈ 10 % de las ventas) y la reestructuración. El circulante es negativo: los clientes pagan por adelantado.',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie histórica del mercado anterior a 2025 y CR5 exacto', tipo: 'Complemento', intentos: '1) notas de la ESD Alliance (solo trimestres sueltos en abierto); 2) prensa sectorial (eeNews, CIMdata); 3) informes de consultoras (de pago)', decision: 'TCAC histórico ≈ 10 % y CR5 ≈ 80 % como estimación propia con las cuotas de Synopsys, Cadence y Siemens' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración de FY2025, accionistas', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-19', url: U.proxy },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 16-abr-2026 (votos)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-20', url: U.k8junta },
  { id: 3, titulo: 'Form 8-K: acuerdo de cooperación con Elliott Investment Management; Jesse Cohn entra en el consejo', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-27', url: U.k8elliott },
  { id: 4, titulo: 'Form 4 de directivos y consejeros de Synopsys (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000883241&type=4' },
  { id: 5, titulo: 'Notas de resultados del 4T FY2019-FY2025 (guías iniciales y BPA no GAAP real)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-12-10', url: U.r4T25 },
  { id: 6, titulo: 'Form 8-K: salida del director comercial (Rick Mahoney)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-04', url: U.k8cro },
  { id: 7, titulo: 'Form 8-K: salida de la directora jurídica (Janet Lee) antes del 31-dic-2026', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-12', url: U.k8gc },
  { id: 8, titulo: 'Synopsys nombra consejero a Peter Shimer (ex-Deloitte) y anuncia cambios en el consejo', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-19', url: U.k8shimer },
  { id: 9, titulo: 'Form 10-K FY2025 (directivos, auditor)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-22', url: U.k10 },
  { id: 10, titulo: 'Synopsys Q3 FY2026 results (guía subida) y Investor Day 2026 (guía FY2027)', editor: 'Synopsys, Inc. (SEC, 8-K; nota de prensa)', tipo: 'Primaria', fecha: '2026-09-30', url: U.inv },
];
const F4 = lee('form4.json');
const ventas = F4.operaciones.filter((o) => o.codigo === 'S').sort((a, b) => b.importe - a.importe).slice(0, 7);
const cargoEs = { 'EXECUTIVE CHAIR': 'presidente ejecutivo', 'PRESIDENT AND CEO': 'consejero delegado', 'Deputy CFO & CAO': 'director financiero adjunto', CFO: 'directora financiera', 'GC & Corporate Secretary': 'directora jurídica' };
const nombreP = { 'DE GEUS AART': 'Aart de Geus', 'Ghazi Sassine': 'Sassine Ghazi', 'Kankanwadi Sudhindra': 'Sudhindra Kankanwadi', 'Glaser Shelagh': 'Shelagh Glaser', 'LEE JANET': 'Janet Lee' };
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta del 16-abr-2026, de Elliott y de cambios de directivos, y Form 4 de 12 meses. La remuneración es la de FY2025 (la de FY2026 sale en el proxy de febrero de 2027).',
  directivos: {
    equipo: [
      { nombre: 'Sassine Ghazi', cargo: 'Presidente y consejero delegado', desde: '2024', participacion_pct: null, trayectoria: 'En Synopsys desde 1998; director de operaciones y consejero delegado desde enero de 2024. Cerró la compra de Ansys y la venta de SIG, y lleva la estrategia de IA (Synopsys.ai, AgentEngineer) [1, 9].' },
      { nombre: 'Aart J. de Geus', cargo: 'Presidente ejecutivo del consejo (cofundador)', desde: '1986', participacion_pct: null, trayectoria: 'Cofundador y consejero delegado de 1994 a 2023; preside el consejo como ejecutivo [1].' },
      { nombre: 'Shelagh Glaser', cargo: 'Directora financiera', desde: '2023', participacion_pct: null, trayectoria: 'Antes en Intel; lleva la financiación de Ansys y la reducción de deuda [1].' },
      { nombre: 'Sudhindra Kankanwadi', cargo: 'Director financiero adjunto y de contabilidad', desde: '2023', participacion_pct: null, trayectoria: 'Responsable de contabilidad e informes [1].' },
      { nombre: 'Michael Ellow', cargo: 'Director comercial', desde: '2025', participacion_pct: null, trayectoria: 'Sustituye a Rick Mahoney, que salió en noviembre de 2025 [6, 4].' },
    ],
    historial_guidance: [
      { anio: 'FY2020', guia: 'BPA no GAAP 5,18-5,25 USD', real: '5,55', cumplida: 'Sí' },
      { anio: 'FY2021', guia: '6,23-6,30 USD', real: '6,84', cumplida: 'Sí' },
      { anio: 'FY2022', guia: '7,73-7,80 USD', real: '8,90', cumplida: 'Sí' },
      { anio: 'FY2023', guia: '10,28-10,35 USD', real: '11,19', cumplida: 'Sí' },
      { anio: 'FY2024', guia: '13,33-13,41 USD (con SIG)', real: '13,20 (sin SIG, discontinuada)', cumplida: 'Parcial' },
      { anio: 'FY2025', guia: '14,88-14,96 USD (antes de Ansys)', real: '12,91 (con Ansys; guía rebajada a 12,76-12,80 en septiembre)', cumplida: 'No' },
      { anio: 'FY2026', guia: '14,32-14,40 USD (subida a 15,04-15,10 en agosto)', real: 'Pendiente (diciembre de 2026)', cumplida: 'Parcial' },
    ],
    comentario: 'Hasta FY2023 Synopsys batió todos los años su guía inicial de BPA no GAAP por un 5-15 % [5]. FY2025 rompió la racha: la IP falló (China, Intel y errores propios de hoja de ruta) y la acción cayó un 36 % el 10-sep-2025; el director comercial salió dos meses después y la empresa anunció un recorte del 10 % de la plantilla [5, 6]. En FY2026 ha vuelto a subir la guía dos veces [10]. Ghazi lleva menos de tres años como consejero delegado y su gran apuesta (Ansys, 34.900 M USD) aún no se ha probado. Elliott entró en el capital en 2026 y firmó un acuerdo de cooperación con un consejero (Jesse Cohn) [3]. La directora jurídica sale antes de fin de 2026 [7].',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Aart J. de Geus', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '1986', comisiones: '—' },
      { nombre: 'Sassine Ghazi', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2024', comisiones: '—' },
      { nombre: 'John G. Schwarz', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2007', comisiones: null },
      { nombre: 'Janice D. Chaffin', cargo: 'Consejera', tipo: 'Independiente', desde: '2014', comisiones: null },
      { nombre: 'Bruce R. Chizen', cargo: 'Consejero', tipo: 'Independiente', desde: '2001', comisiones: null },
      { nombre: 'Mercedes Johnson', cargo: 'Consejera', tipo: 'Independiente', desde: '2017', comisiones: null },
      { nombre: 'Robert G. Painter', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Jeannine P. Sargent', cargo: 'Consejera', tipo: 'Independiente', desde: '2020', comisiones: null },
      { nombre: 'Peter A. Shimer', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Auditoría' },
      { nombre: 'Ravi K. Vijayaraghavan', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: null },
      { nombre: 'Jesse Cohn (Elliott)', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 91.4, voto_remuneracion_contra_pct: 8.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 19.61, fijo: 0.88, variable_corto: 1.19, variable_largo: 17.52, ratio_salario_medio: 210 },
    remuneracion: 'El consejero delegado cobró 19,61 M USD en FY2025: 0,88 M de fijo, 1,19 M de variable anual y 17,52 M en acciones (13,02) y opciones (4,50) [1]. El variable anual se liga al 50 % a los ingresos y al 50 % al margen operativo no GAAP; las acciones por objetivos, al crecimiento de los ingresos a tres años con un modificador por la rentabilidad relativa para el accionista [1]. No hay ninguna métrica de rentabilidad del capital (ROIC) ni de BPA GAAP: con 34.900 M USD invertidos en Ansys es el punto débil. Ratio frente al empleado mediano (93.538 USD): 210 veces [1]. En la junta del 16-abr-2026 el voto consultivo sobre la remuneración tuvo un 91,4 % a favor y un 8,5 % en contra [2].',
    accionistas: [
      { nombre: 'Vanguard', pct: 7.1, tipo: 'Institucional', variacion: 'Proxy 2026 (13G)' },
      { nombre: 'BlackRock', pct: 6.2, tipo: 'Institucional', variacion: 'Proxy 2026 (13G)' },
      { nombre: 'NVIDIA', pct: 2.5, tipo: 'Estratégico', variacion: '≈ 4,8 M de acciones suscritas en diciembre de 2025 (2.000 M USD) [10]' },
      { nombre: 'Elliott Investment Management', pct: null, tipo: 'Activista', variacion: 'Participación no publicada; límite del 4,9 % por el acuerdo de cooperación [3]' },
    ],
    insiders: ventas.map((o) => ({ fecha: o.fecha, persona: `${nombreP[o.persona] ?? o.persona} (${cargoEs[o.cargo] ?? o.cargo})`, operacion: 'Venta', acciones: Math.round(o.acciones), importe: r2(o.importe / 1e6) })),
    control_y_defensas: 'Sin accionista de control: los mayores son Vanguard (7,1 %) y BlackRock (6,2 %); NVIDIA tiene ≈ 2,5 % y Elliott una participación por debajo del 4,9 % [1, 3]. Una acción, un voto; consejo elegido cada año por mayoría y sin píldora venenosa [1]. El cofundador preside como ejecutivo, con un consejero independiente coordinador (Schwarz, en el consejo desde 2007) [1]. Consejeros con mucha antigüedad (Chizen desde 2001, Schwarz desde 2007) junto a cuatro incorporaciones de 2023-2026, una de ellas de Elliott [1, 3, 8].',
    alertas: [
      `Ventas de directivos por ${n2(r1(F4.total_ventas / 1e6))} M USD en 12 meses, el ${Math.round(F4.ventas_con_plan_10b5_1 / F4.total_ventas * 100)} % con planes 10b5-1 y ninguna compra; el consejero delegado vendió 6,8 M el 15-oct-2026 [4].`,
      'Entrada de Elliott (activista) y acuerdo de cooperación con un consejero desde el 1-jun-2026 [3].',
      'Salidas del director comercial (noviembre de 2025) y de la directora jurídica (antes del 31-dic-2026); reestructuración del 10 % de la plantilla [6, 7].',
    ],
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'comisiones de cada consejero y participación de los directivos', tipo: 'Complemento', intentos: '1) proxy 2026 (texto extraído sin tablas de comisiones legibles); 2) 8-K de la junta; 3) web de gobierno corporativo (no abre)', decision: 'Comisiones solo donde la fuente lo dice; participación de directivos sin dato' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de SNPS, SPY y SOXX (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SNPS/history' },
  { id: 2, titulo: 'Consenso de SNPS y comparables (BPA y ventas estimados, objetivos, recomendaciones; precio de la sesión del 21-oct a las 16:39 UTC): quoteSummary', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/SNPS/analysis' },
  { id: 3, titulo: 'Synopsys Investor Day 2026: guía de FY2027 y objetivos a 2030', editor: 'Synopsys, Inc. (nota de prensa vía Stock Titan)', tipo: 'Primaria', fecha: '2026-09-30', url: U.inv },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Synopsys Posts Financial Results for Third Quarter Fiscal Year 2026 (guía FY2026)', editor: 'Synopsys, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-26', url: U.r3T26 },
  { id: 7, titulo: 'Movimiento del precio de SNPS (1-12 meses, máximos, media de 200, avisos P1-P5): herramienta movimiento.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/SNPS/history' },
  { id: 8, titulo: 'Form 4 de directivos (form4.mjs): ventas de 61,5 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000883241&type=4' },
  { id: 9, titulo: 'Synopsys stock analysis: Elliott, Ansys and an $11.3 billion backlog; Synopsys has lost 34% in a year (caída del 10-sep-2025)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026', url: 'https://www.tikr.com/blog/synopsys-has-lost-34-in-a-year-is-the-selloff-a-buying-opportunity' },
  { id: 10, titulo: 'Synopsys stock slips again after Tuesday\'s rout as AI disruption fears hit software (3-feb-2026)', editor: 'TS2 Tech', tipo: 'Prensa', fecha: '2026-02-04', url: 'https://ts2.tech/en/synopsys-stock-slips-again-after-tuesdays-rout-as-ai-disruption-fears-hit-software/' },
  { id: 11, titulo: 'Elliott Management is betting billions on Synopsys (participación desvelada el 23-mar-2026)', editor: 'Barchart', tipo: 'Prensa', fecha: '2026-03', url: 'https://www.barchart.com/story/news/986051/elliott-management-is-betting-billions-on-synopsys-should-you-buy-snps-stock-too?.tsrc=rss' },
  { id: 12, titulo: 'Market movers SNPS 24-abr-2026 (+9,6 %)', editor: 'TradingKey', tipo: 'Prensa', fecha: '2026-04-24', url: 'https://www.tradingkey.com/news/market-movers/261822505-market-movers-snps-20260424' },
  { id: 13, titulo: 'Synopsys stock fell 21% in three months: one earnings call line explains why (2T26, IP)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.tikr.com/blog/synopsys-stock-fell-21-in-three-months-one-earnings-call-line-explains-why' },
  { id: 14, titulo: 'Synopsys delivers beat and raise; shares rise (27-ago-2026)', editor: 'Yahoo Finance', tipo: 'Prensa', fecha: '2026-08-27', url: 'https://finance.yahoo.com/markets/stocks/articles/synopsys-delivers-beat-raise-shares-145500237.html' },
  { id: 15, titulo: 'Why Synopsys stock surged: $1 billion Amazon deal, OpenAI, Investor Day (1-oct-2026)', editor: 'TIKR / The Daily Guardian', tipo: 'Prensa', fecha: '2026-10-01', url: 'https://www.tikr.com/zh/blog/why-synopsys-stocks-13-jump-followed-a-1-billion-amazon-deal' },
  { id: 16, titulo: 'Analistas: BofA eleva el objetivo a 600 USD; KeyBanc tras el día del inversor; Morgan Stanley sube el objetivo (20-oct)', editor: 'ad-hoc-news / Yahoo Finance', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.ad-hoc-news.de/boerse/news/corporate-news/bofa-raises-target-for-synopsys-stock-to-usd-600-00/70327481' },
  { id: 17, titulo: 'Form 8-K: recompra acelerada de 1.000 M USD (5-oct-2026)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-10-05', url: U.k8asr },
  { id: 18, titulo: 'Form 8-K: acuerdo de cooperación con Elliott (26-may-2026)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-27', url: U.k8elliott },
  { id: 19, titulo: 'Form 8-K: salida del director comercial y guía reafirmada (4-nov-2025)', editor: 'Synopsys, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-11-04', url: U.k8cro },
  { id: 20, titulo: 'Titulares de Seeking Alpha sobre SNPS (RSS, ago-oct 2026)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/SNPS.xml' },
  { id: 21, titulo: 'Agentic AI is coming to chip design; Kimi K3 y el temor a la IA en el EDA (jul-2026)', editor: 'Barchart', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.barchart.com/story/news/3533098/agentic-ai-is-coming-to-chip-design-here-is-why-synopsys-stock-could-be-the-biggest-beneficiary' },
  { id: 22, titulo: 'Synopsys shares fall as China export curbs dampen outlook (mayo de 2025, restricciones del BIS)', editor: 'Techleap', tipo: 'Prensa', fecha: '2025-05', url: 'https://finder.techleap.nl/news/feed/synopsys-shares-fall-5-as-china-export-curbs-dampen-q2-revenue-outlook' },
  { id: 23, titulo: 'Tipos de cambio de referencia del BCE (1,1234 USD por EUR, 21-oct-2026)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml' },
];
const s = Y.SNPS;
const t = Object.fromEntries(s.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
const EUR = 1.1234;
const COMPS = [['CDNS', 'Cadence Design Systems', 'US'], ['ADSK', 'Autodesk', 'US'], ['PTC', 'PTC', 'US'], ['DSY.PA', 'Dassault Systèmes', 'FR'], ['BSY', 'Bentley Systems', 'US'], ['NEM.DE', 'Nemetschek', 'DE'], ['ARM', 'Arm Holdings', 'GB'], ['RMBS', 'Rambus', 'US']];
const comps = COMPS.map(([tk, nombre, pais]) => {
  const y = Y[tk]; const fx = y.divisa === 'EUR' ? EUR : 1;
  const sig = y.trend.find((x) => x.periodo === '+1y');
  return {
    nombre, ticker: tk.replace('.PA', '').replace('.DE', ''), pais, capitalizacion: Math.round(y.cap * fx / 1e6), ev_ventas: r2(y.ev / y.ventas), ev_ebitda_ltm: r1(y.ev / y.ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.precio / sig.bpa), crecimiento_pct: r1(sig.crec_ventas * 100), margen_ebitda_pct: r1(y.ebitda / y.ventas * 100), roic_pct: null, dn_ebitda: r1((y.ev - y.cap) / y.ebitda), fcf_yield_pct: null,
  };
});
const perMed = (() => { const v = comps.map((x) => x.per_ntm).sort((a, b) => a - b); const n = v.length; return n % 2 ? v[(n - 1) / 2] : r1((v[n / 2 - 1] + v[n / 2]) / 2); })();
const hora = new Date(s.hora * 1000).toISOString().slice(11, 16);
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (447,62 USD); la sesión del 21-oct estaba abierta (${n2(s.precio)} USD a las ${hora} UTC). Mediana del PER del próximo ejercicio de los comparables: ${n2(perMed)}.`,
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Synopsys, Inc.', nombre_corto: 'Synopsys', ticker: 'SNPS', isin: 'US8716071076', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500 y Nasdaq-100',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnología', industria: 'Software de diseño electrónico (EDA) y simulación', sede: 'Sunnyvale (California)', fundacion: '1986', empleados: 28000, web: 'https://www.synopsys.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 189.9, capitalizacion_publicada: Math.round(s.cap / 1e6), free_float_pct: 97.0,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: null,
  },
  consenso: {
    guidance: 'Guía de FY2026 (a 31-oct-2026), subida el 26-ago-2026: ingresos de 9.690-9.740 M USD, margen operativo no GAAP ≈ 41,5 %, BPA no GAAP de 15,04-15,10 USD, flujo libre ≈ 2.600 M; 4T26 con BPA no GAAP de 4,10-4,16 [6]. Guía de FY2027 (día del inversor, 30-sep-2026): ingresos de 11.100-11.200 M (+15 %), margen no GAAP ≈ 44 %, BPA no GAAP de 19,04-19,12 USD (GAAP 8,16-8,61), remuneración en acciones de 960-980 M, intereses de −465 a −455 M, tipo del 18 %, 190-192 M de acciones, flujo libre ≈ 3.100 M e inversión ≈ 500 M [3]. A largo plazo (FY2026-FY2030): ingresos +15 % anual, margen no GAAP del 50 % en FY2030, BPA y flujo libre «a mitad de los veinte» por ciento anual y hasta el 50 % del flujo libre en recompras [3].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['0y'].n} analistas (BPA no GAAP) [2]` },
      { periodo: 'FY2027e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['+1y'].n} analistas (BPA no GAAP) [2]` },
    ],
    recomendaciones: { n_analistas: s.reco.strongBuy + s.reco.buy + s.reco.hold + s.reco.sell + s.reco.strongSell, comprar: s.reco.strongBuy + s.reco.buy, mantener: s.reco.hold, vender: s.reco.sell + s.reco.strongSell, po_medio: r2(s.po_medio), po_min: s.po_min, po_max: s.po_max },
    revisiones: `El BPA no GAAP de FY2026 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} hoy y el de FY2027 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}, tras la subida de guía del 26-ago y la guía de FY2027 del día del inversor (19,04-19,12) [2, 3, 6]. Los objetivos suben: Morgan Stanley, Wells Fargo, BNP Paribas y HSBC mejoraron la recomendación en septiembre; Deutsche Bank subió 50 USD el objetivo el 1-oct; BofA lo lleva a 600 USD y Morgan Stanley lo subió el 20-oct [16]. Yahoo: ${s.n_analistas} objetivos con media ${n2(r2(s.po_medio))} USD (${s.po_min}-${s.po_max}) y 24 de 25 recomendaciones de compra [2]. Sin consenso gratuito fiable de FY2028 (una sola fuente con dos estimaciones).`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA no GAAP y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(s.corto_pct * 100),
    comentario: 'La acción ha ido mucho peor que el índice en los últimos tres años: rentabilidad total del −1,3 % en 12 meses y del −1,4 % anual en tres años, frente al +15,8 % y +23,7 % del S&P 500 y el +71 % y +49 % del índice de semiconductores (SOXX) [1]. A diez años sigue siendo excelente (+22,4 % anual frente al +15,5 % del índice) [1]. El múltiplo se ha comprimido: de ≈ 40 veces el BPA no GAAP del año siguiente en octubre de 2024 a ≈ 24 hoy, por la caída de la IP en 2025, la dilución de Ansys y el miedo a que la IA abarate el diseño [1, 2]. Beta de 1,20 (mensual a cinco años; 1,13 ajustada; 1,49 semanal a dos años) y volatilidad del 44 % en el último año, con una caída máxima del 43 % entre julio de 2025 y septiembre de 2026 [1].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 11.1, var_3m_pct: 21.7, var_6m_pct: -4.7, var_12m_pct: 0.3, dist_max_52s_pct: -14.9, dist_min_52s_pct: 23.7, dist_max_historico_pct: -29.5, tendencia: 'lateral', volatilidad_60d_pct: 51.0, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'sep 2025', var_pct: -35.8, causa: 'Resultados del 3T FY2025 (9-sep-2025, caída del 10-sep): la IP cayó por las restricciones de exportación a China, la menor demanda de un gran cliente de fundición (Intel) y errores propios de hoja de ruta; guía rebajada [9, 22].', veredicto: 'no cambia', condicion: null },
        { periodo: 'nov 2025', var_pct: -6.6, causa: 'Salida del director comercial (4-nov-2025) con la guía reafirmada [19].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb 2026', var_pct: -8.5, causa: 'Venta generalizada de software el 3-feb-2026 por el miedo a la IA (herramientas de IA generativa que sustituyen software), sin noticia de la empresa [10].', veredicto: 'no cambia', condicion: null },
        { periodo: 'mar-may 2026', var_pct: 31.6, causa: 'Entrada de Elliott (23-mar), noticias de colaboración con TSMC (+9,6 % el 24-abr) y subida de los semiconductores; máximo de 52 semanas de 539,48 USD el 26-may [11, 12, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jul 2026', var_pct: -19.5, causa: 'Resultados del 2T26 (27-may: IP −6 %, −8,6 % el 28-may) y, en julio, nuevo temor a la IA: un laboratorio chino (Moonshot, Kimi K3) dijo haber diseñado un chip con IA y herramientas de código abierto (−7,9 % el 17-jul) [13, 21].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago 2026', var_pct: 13.4, causa: 'Resultados del 3T26 por encima de lo esperado y guía de FY2026 subida (26-ago; +13,4 % el 27-ago) [14, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep 2026', var_pct: -16.0, causa: 'Caída hasta el mínimo de 52 semanas (362,55 USD el 15-sep) con dos días de −5 % (1 y 4-sep) sin nota de la empresa: venta de directivos con planes 10b5-1 (de Geus, 28-ago a 1-sep) y debilidad del software; causa concreta no encontrada en tres búsquedas [8, 20].', veredicto: 'no cambia', condicion: null },
        { periodo: 'sep-oct 2026', var_pct: 23.7, causa: 'Día del inversor (30-sep): guía de FY2027 por encima del consenso, acuerdo de IP de más de 1.000 M USD con AWS y colaboración con OpenAI; +12,8 % el 1-oct; mejoras de recomendación [3, 15, 16].', veredicto: 'no cambia', condicion: null },
        { periodo: 'oct 2026', var_pct: -10.9, causa: 'Del 12 al 20-oct, de 502,51 a 447,62 USD sin noticia de la empresa: recogida de beneficios tras el día del inversor, temores a la IA en el software y venta del consejero delegado con plan 10b5-1 (15-oct); causa concreta no encontrada [8, 20].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-05', tipo: 'deuda o capital', hecho: 'Recompra acelerada de 1.000 M USD con JPMorgan (entrega inicial ≈ 1,7 M de acciones; liquidación hasta enero de 2027) [17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-30', tipo: 'resultados', hecho: 'Día del inversor: guía de FY2027 (BPA no GAAP 19,04-19,12 USD) y objetivos a 2030 (margen no GAAP del 50 %); acuerdo de IP con AWS de más de 1.000 M y colaboración con OpenAI [3, 15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-26', tipo: 'resultados', hecho: '3T26 por encima de la guía; guía de FY2026 subida a 15,04-15,10 USD; coste de la reestructuración elevado a 425-500 M [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-12', tipo: 'directivos', hecho: 'La directora jurídica (Janet Lee) dejará la empresa antes del 31-dic-2026 [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-17', tipo: 'otro', hecho: 'Temor a que la IA automatice el diseño de chips (Kimi K3 de Moonshot); Mizuho y otros analistas defienden que la IA no sustituye al EDA [21].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-01', tipo: 'deuda o capital', hecho: 'Venta de Processor IP (ARC) a GlobalFoundries por 443 M USD [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-26', tipo: 'deuda o capital', hecho: 'Acuerdo de cooperación con Elliott: Jesse Cohn entra en el consejo el 1-jun; Elliott no pasará del 4,9 % [18].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-05-27', tipo: 'resultados', hecho: '2T26: IP −6 % interanual; guía de FY2026 mantenida [13].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-12-01', tipo: 'deuda o capital', hecho: 'NVIDIA invierte 2.000 M USD en acciones nuevas a 414,79 USD y firma una alianza en diseño acelerado [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2025-11-09', tipo: 'otro', hecho: 'Plan de reestructuración: ≈ 10 % de la plantilla [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-12', tipo: 'resultados', hecho: 'Resultados del 4T y del ejercicio FY2026 en diciembre (fecha sin anunciar; en 2025 fue el 10-dic); guía 4T: BPA no GAAP 4,10-4,16 USD [6].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: null,
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción está un 14,9 % por debajo de su máximo de 52 semanas y un 29,5 % por debajo del de cinco años, tras subir un 21,7 % en tres meses desde el mínimo de septiembre; no salta ningún aviso P de la herramienta [7]. Los movimientos grandes tienen causa en hechos de la empresa (resultados del 3T25 con la caída de la IP, del 2T26 y del 3T26, día del inversor) o en el miedo del mercado a la IA en el software (febrero y julio de 2026), que el informe valora en los riesgos. Dos tramos no tienen causa concreta (principios de septiembre y la caída del 12 al 20-oct, −10,9 %), sin hechos nuevos que cambien la tesis. No hay colocaciones, juicios ni decisiones regulatorias con fecha que puedan mover el precio más de un 5 % en contra; los resultados del 4T (diciembre) no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada ejercicio (31 de octubre) de Yahoo [1]. El PER con el BPA GAAP no sirve: las plusvalías de SIG (FY2024) y OSG (FY2025) y la amortización de Ansys lo deforman. En base no GAAP adelantada (precio al cierre ÷ BPA no GAAP del ejercicio siguiente, la base de la regla a 12 meses), el múltiplo fue de 37,4 veces en octubre de 2021, 26,1 en 2022, 35,6 en 2023, 39,8 en 2024 y 30,1 en 2025, y es ≈ 23,6 hoy: el más bajo desde 2019 [1, 2].',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Cadence (el otro gran proveedor de EDA, el único comparable de verdad), cinco empresas de software de diseño y simulación de ingeniería (Autodesk, PTC, Dassault, Bentley y Nemetschek: rivales o equivalentes de Ansys) y dos de propiedad intelectual de semiconductores (Arm y Rambus) [2]. PER = precio ÷ BPA ajustado del próximo ejercicio de cada empresa según el consenso de Yahoo; EV/EBITDA con el EBITDA de los últimos 12 meses de Yahoo (no siempre ajustado). Keysight se descarta (equipos de medida). Los de la zona euro, a 1,1234 USD por EUR [23].',
    empresas: comps,
    comentario: `Synopsys cotiza a ≈ ${n2(r1(447.62 / 19.09))} veces el BPA no GAAP de FY2027 (guía 19,04-19,12), muy por debajo de Cadence (${n2(comps[0].per_ntm)}x), con un crecimiento parecido (+15 % guiado en FY2027 frente a +${n2(comps[0].crecimiento_pct)} % del consenso de Cadence) [2, 3]. Frente al software de ingeniería (Autodesk ${n2(comps[1].per_ntm)}x, PTC ${n2(comps[2].per_ntm)}x, Dassault ${n2(comps[3].per_ntm)}x) cotiza en línea, con más crecimiento y más margen. Arm (${n2(comps[6].per_ntm)}x) es un extremo que no sirve de referencia. La mediana de los ocho (${n2(perMed)}x) es la referencia del motor en el alcista. El descuento frente a Cadence refleja la deuda de Ansys, la IP débil y la menor visibilidad de las sinergias.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-07', objetivo: 'Ansys (simulación)', comprador: 'Synopsys', ev: 34900, ev_ventas: 15.4, ev_ebitda: null, prima_pct: 29, excluir: false, comentario: 'Precio de 34.900 M USD sobre ≈ 2.270 M de ventas de 2023; prima ≈ 29 % sobre el precio previo al anuncio (enero de 2024).' },
      { fecha: '2025-03', objetivo: 'Altair Engineering (simulación)', comprador: 'Siemens', ev: 10000, ev_ventas: 15.0, ev_ebitda: null, prima_pct: 19, excluir: false, comentario: 'EV ≈ 10.000 M USD; ventas ≈ 665 M USD (≈ 600 M EUR) [7 de B].' },
      { fecha: '2017-03', objetivo: 'Mentor Graphics (EDA)', comprador: 'Siemens', ev: 4500, ev_ventas: 3.8, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Hace nueve años, con múltiplos de otra época; solo como referencia.' },
      { fecha: '2024-09', objetivo: 'Software Integrity (seguridad de aplicaciones)', comprador: 'Clearlake y Francisco Partners', ev: 2100, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: true, comentario: 'Venta de Synopsys; otro negocio (seguridad de software).' },
    ],
    comentario: 'Las compras grandes de simulación se han hecho a ≈ 15 veces las ventas (Ansys, Altair): el sector se paga muy caro por la escasez de activos y las sinergias con el diseño electrónico. A ese múltiplo de ventas Synopsys valdría mucho más que hoy, pero con ≈ 87.000 M USD de capitalización no es objetivo realista de una compra (y no hay comprador que pase competencia): el valor de control no es relevante.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'BPA y EBITDA de FY2028e del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo FY2026 y FY2027); 2) MarketScreener (devolvió otra empresa); 3) Tickflow (error 429) y therighttrader (dos estimaciones)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'causa de la caída de principios de septiembre y del 12 al 20-oct-2026', tipo: 'Complemento', intentos: '1) 8-K de la empresa (ninguno con hechos de negocio en esas fechas); 2) titulares de Seeking Alpha (RSS); 3) búsqueda de prensa (TS2, Barchart, Yahoo)', decision: 'Se explica como temor a la IA, recogida de beneficios y ventas de directivos, sin causa concreta' },
    { seccion: 'identificacion', campo: 'fecha de los resultados del 4T FY2026', tipo: 'Complemento', intentos: '1) web de relación con inversores; 2) 8-K; 3) calendarios de resultados', decision: 'Sin fecha anunciada: diciembre de 2026' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $SNPS (5-21 de octubre de 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/SNPS.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares sobre SNPS (ago-oct 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/SNPS.xml' },
  { id: 3, titulo: 'Synopsys is hot again, but a pattern has emerged (24/7 Wall St.)', editor: '24/7 Wall St.', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://247wallst.com/investing/2026/10/06/synopsys-is-hot-again-but-a-pattern-has-emerged/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes del 5 al 21-oct-2026), titulares de Seeking Alpha y prensa financiera; Reddit no abre.',
  sentimiento: {
    tono: 'Mixto', tendencia: 'Mejorando',
    revisadas: [
      { plataforma: 'Stocktwits ($SNPS)', fecha: '2026-10', n_comentarios: 30, tono: 'Mixto', resumen: 'Mayoría de mensajes neutros: comentan la caída desde 500 USD tras el día del inversor, la venta del consejero delegado del 15-oct (con plan 10b5-1) y los niveles técnicos; algunos alcistas por el acuerdo con AWS y la guía de FY2027 [1].' },
      { plataforma: 'Seeking Alpha (titulares)', fecha: '2026-10', n_comentarios: 8, tono: 'Positivo', resumen: 'Artículos alcistas tras el día del inversor (guía de FY2027, IA agéntica, margen del 50 % en 2030) y noticias de mejoras de recomendación [2].' },
      { plataforma: 'Prensa financiera (24/7 Wall St., TIKR)', fecha: '2026-10', n_comentarios: 4, tono: 'Mixto', resumen: 'Reconocen la recuperación pero avisan de un patrón: subidas fuertes tras eventos que se deshacen en semanas por el miedo a la IA y la IP [3].' },
    ],
    temas: [
      { tema: 'IA agéntica como motor (Synopsys.ai, OpenAI, AWS)', postura: 'Alcista', peso: 'Alto', contraste: 'La guía de FY2027 (+15 %) lo apoya; las cifras de ingresos por IA no se publican por separado [2].' },
      { tema: 'La IA puede abaratar el diseño y sustituir licencias', postura: 'Bajista', peso: 'Alto', contraste: 'Es el riesgo central del sector; hoy no se ve en las cifras (EDA +12 % en 2026), pero comprime el múltiplo [1, 3].' },
      { tema: 'Ventas de directivos', postura: 'Bajista', peso: 'Medio', contraste: 'Casi todas con planes 10b5-1 y ejercicios de opciones antiguas; importantes (61,5 M USD) y sin compras [1].' },
      { tema: 'IP y China', postura: 'Dividida', peso: 'Medio', contraste: 'La IP vuelve a crecer en el 3T26 (+11 %) tras un año malo; China pesa ya menos del 10 % [2].' },
    ],
    lectura: 'El sentimiento es mixto y mejorando: los analistas son casi unánimes en comprar (24 de 25) y la prensa especializada celebró el día del inversor, pero los particulares desconfían tras dos años sin subir y caídas bruscas por cada noticia de IA [1, 2, 3]. No hay euforia: la acción está un 30 % por debajo de su máximo de cinco años. El ruido en contra (ventas de directivos, miedo a la IA) ya está en los riesgos del informe. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', perMed, comps.map((x) => `${x.ticker} ${x.per_ntm}`).join(', '));
