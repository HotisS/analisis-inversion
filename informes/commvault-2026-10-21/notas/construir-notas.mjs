// Escribe las notas A-E de Commvault Systems (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL
// de la SEC (cuentas-xbrl.json), de bolsa.json (cierre del 20-oct-2026), de yahoo-datos.json (Yahoo, 21-oct-2026 14:43 UTC,
// sesión abierta), de form4.json y de lo leído en la web (citado). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/commvault-2026-10-21/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1169561';
const anios = ['2019', '2020', '2021', '2022', '2023', '2024', '2025', '2026'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio FY2026 (cerrado el 31-mar-2026): cuentas, ingresos por tipo y región, convertibles, recompras, reestructuración, remuneración en acciones, impuestos', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-11', url: `${ED}/000116956126000017/cvlt-20260331.htm` },
  { id: 2, titulo: 'Commvault Announces First Quarter Fiscal 2027 Financial Results (cuentas del 1T, conciliación no GAAP, ARR, guía FY2027)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000116956126000020/q1fy27pressrelease.htm` },
  { id: 3, titulo: 'Commvault Announces Fourth Quarter Fiscal 2026 Financial Results (cifras anuales FY2026, conciliación no GAAP, guía FY2027 con definiciones nuevas)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-28', url: `${ED}/000116956126000013/q4fy26pressrelease.htm` },
  { id: 4, titulo: 'Notas de resultados del 1T, 2T y 3T FY2026 (29-jul-2025, 28-oct-2025, 27-ene-2026)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-27', url: `${ED}/000116956126000003/q3fy26pressrelease.htm` },
  { id: 5, titulo: 'Form 10-Q del 1T FY2027 (30-jun-2026): convertibles, línea de crédito, demandas colectivas, recompras, KPI', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${ED}/000116956126000024/cvlt-20260630.htm` },
  { id: 6, titulo: 'XBRL company facts de Commvault (remuneración en acciones, reestructuración, amortización de intangibles, deterioro de la sede en FY2023, ingresos diferidos, comisiones activadas)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001169561.json' },
  { id: 7, titulo: 'Form 8-K: emisión de 900 M USD de bonos convertibles al 0 % con vencimiento en 2030 y compra de opciones con techo (capped calls)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-09-05', url: `${ED}/000116956125000075/cvlt-20250902.htm` },
  { id: 8, titulo: 'Titulares de Seeking Alpha sobre CVLT (resultados frente al consenso de cada trimestre, conferencias)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/CVLT.xml' },
  { id: 9, titulo: 'Why Commvault Stock Crashed Today (1T FY2027: guía prudente, ingresos por suscripción algo menores en el 2T)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.fool.com/investing/2026/07/28/why-commvault-stock-crashed-today/' },
];

// Cuenta del XBRL [6], comprobada con el 10-K FY2026 [1]. No recurrentes dentro del EBITDA (gasto en positivo): deterioro de la
// antigua sede en FY2023 (53,5 M), deterioro de 2,9 M y ajuste de contraprestación contingente de 2,1 M en FY2025, contingente
// (−0,5), ajuste de la venta con arrendamiento posterior de la sede (0,5) y deterioro de un arrendamiento (1,4) en FY2026,
// contingente (−3,8) en FY2020. La reestructuración NO se trata como no recurrente: hay cargos todos los años (14,8-32,2 M).
const NOREC = { 2019: null, 2020: -3.8, 2021: null, 2022: null, 2023: 53.5, 2024: null, 2025: 5.0, 2026: 1.4 };
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo.replace('FY', ''))).map((c) => {
  const a = c.periodo.replace('FY', '');
  const o = { ...c, periodo: 'FY' + a, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NOREC[a], dpa: 0, dpa_extraordinario: 0 };
  delete o.fin; return o;
});
// Ingresos diferidos totales (corriente + no corriente) como pasivos de contrato [6]; deuda = convertibles a coste amortizado.
const DIFNC = { 2019: 99.3, 2020: 92.7, 2021: 119.2, 2022: 150.2, 2023: 174.4, 2024: 168.5, 2025: 223.3, 2026: 293.7 };
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo.replace('FY', ''))).map((b) => {
  const a = b.periodo.replace('FY', '');
  const o = { ...b, periodo: 'FY' + a, arrendamientos: 0, existencias: 0, activos_contrato: null, pasivos_contrato: r1(b.pasivos_contrato + DIFNC[a]), deuda_financiera: a === '2026' ? 880.9 : 0, minoritarios: 0 };
  delete o.fin; return o;
});
// Capex = inmovilizado + aumento neto de las comisiones activadas (no pasan por el EBITDA ni por el circulante) [1, 6].
const COMIS = { 2019: 0.5, 2020: -2.2, 2021: 7.0, 2022: 14.6, 2023: 6.6, 2024: 3.2, 2025: 16.5, 2026: 24.6 };
const EMIS = { 2024: 13.4, 2025: 17.5, 2026: 14.5 };
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo.replace('FY', ''))).map((f) => {
  const a = f.periodo.replace('FY', '');
  const o = { ...f, periodo: 'FY' + a, capex: r1(f.capex + Math.max(0, COMIS[a])), pagos_arrendamientos: 0, dividendos: 0, emision_acciones: EMIS[a] ?? 0, desinversiones: f.desinversiones ?? 0, intereses_en_financiacion: 0 };
  delete o.fin; return o;
});
const trim = (p, ing, g, ebit, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(ebit + da), margen_ebitda_pct: r2((ebit + da) / ing * 100), bpa, vs_consenso: vs });
const A = {
  _estado: 'Completa. Cuentas del XBRL de la SEC comprobadas con el 10-K FY2026 (ingresos 1.183,7 M USD, EBIT 74,0, beneficio 70,7, BPA diluido 1,58). Ejercicio a 31 de marzo, etiquetado por el año en que termina (FY2026 = abr-25 a mar-26). Capex con el aumento neto de comisiones activadas; pasivos de contrato = ingresos diferidos totales; deuda = convertibles 2030 a coste amortizado; arrendamientos operativos fuera (US GAAP).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1215.8, ebitda: 84.7, ebit: 74.6, beneficio_neto: 68.3, bpa: 1.56, dpa: 0, dpa_extraordinario: 0, fcf: 258.5, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 7.9 },
    cambios_perimetro: [
      { periodo: 'FY2026', descripcion: 'Satori Cyber (seguridad de datos e IA, Israel), 28,1 M USD en caja, consolidada desde el 28-ago-2025; venta de la sede de Tinton Falls con arrendamiento posterior (34,8 M) [1].' },
      { periodo: 'FY2025', descripcion: 'Clumio (copia de datos en AWS) y Appranix (recuperación de aplicaciones en la nube): 65,3 M USD en caja más 4,9 M en acciones [1].' },
    ],
    comentario: 'Los ingresos pasaron de 711,0 M USD en FY2019 a 1.183,7 M en FY2026 (TCAC del 7,5 %), con dos etapas: estancamiento en FY2019-FY2021 (670-724 M) mientras pasaba de licencia perpetua a suscripción, y aceleración en FY2024-FY2026 (+7,0 %, +18,6 % y +18,9 %) [1, 6]. Lo que crece es la suscripción: 768,3 M en FY2026 (+30 %), de ellos 435,3 M de licencia a plazo y 333,0 M de SaaS (+52 %); el soporte de licencias perpetuas cae (118,3 M, −15 %) [1]. La aceleración de FY2025-FY2026 tiene una parte contable: la licencia a plazo se reconoce casi entera al firmar, así que los contratos más largos adelantan ingresos [1]. El margen operativo GAAP se ha quedado en el 6,3 % en FY2026 (7,4 % en FY2025) porque la remuneración en acciones (123,4 M, el 10,4 % de las ventas) y la reestructuración (32,2 M) se comen la mejora; el no GAAP de la empresa, que excluye las dos, es del 20,1 % [3]. En el 1T FY2027 los ingresos crecieron un 11 % (314,1 M) y el margen operativo GAAP fue del 8,2 % [2].',
    ajustes: 'Usamos las cifras publicadas. La empresa da un EBIT y un BPA no GAAP que excluyen la remuneración en acciones y sus cotizaciones (≈ 127 M USD en FY2026), la reestructuración (32,2 M), la amortización de intangibles comprados (4,7 M), los ajustes de contraprestación contingente, la venta con arrendamiento posterior de la sede y, desde el 1T FY2027, 6,5 M de «costes no recurrentes de la iniciativa estratégica de precios» [3, 2]. BPA de FY2026: 1,58 USD GAAP frente a 4,35 no GAAP (194,3 M ÷ 44,7 M de acciones) [3]. La reestructuración se repite todos los años (14,8 M en FY2019, 21,3, 23,5, 6,2, 15,5, 4,5, 10,0 y 32,2 M en FY2026), así que no la tratamos como no recurrente; sí lo son el deterioro de 53,5 M de la antigua sede en FY2023 y los ajustes pequeños de FY2020, FY2025 y FY2026 [6]. El LTM a junio de 2026 lleva 1,4 M de esos ajustes y los 6,5 M de la iniciativa de precios.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      trim('2T25', 233.3, 16, 14.968, 2.013, 0.35, null),
      trim('3T25', 262.6, 21, 13.615, 2.730, 0.24, null),
      trim('4T25', 275.0, 23, 26.727, 2.401, 0.69, null),
      trim('1T26', 282.0, 26, 25.091, 2.607, 0.52, 'Superior'),
      trim('2T26', 276.2, 18, 12.491, 2.572, 0.33, 'Superior'),
      trim('3T26', 313.8, 19, 19.770, 2.606, 0.40, 'Superior'),
      trim('4T26', 311.7, 13, 16.638, 2.563, 0.34, 'Superior'),
      trim('1T27', 314.1, 11, 25.719, 2.319, 0.50, 'Superior'),
    ],
    ultima_presentacion: 'Trimestres fiscales (el 1T27 es abr-jun 2026); EBITDA = EBIT GAAP + amortizaciones y BPA GAAP diluido [2, 3, 4]. «Superior» se refiere al BPA no GAAP frente al consenso: 1,17 USD frente a 0,98 en el 3T26, 1,28 frente a 1,09 en el 4T26 y 1,42 frente a 1,16 en el 1T27 [8]. Aun así, la acción cayó un 16,3 % tras el 2T26, un 31,1 % tras el 3T26 (el ARR neto nuevo, 39 M USD, quedó por debajo de los ≈ 45 M que la dirección había apuntado para el segundo semestre, por el paso a SaaS, de contratos más cortos y baratos) y un 19,7 % tras el 1T27 [8, 9]. En abril de 2026 (4T26) la empresa cambió las métricas: ahora guía ingresos por suscripción (incluye el soporte de licencias a plazo) y ARR de suscripción, y dejó de publicar el ARR total [3]. Guía de FY2027 (28-jul-2026): ingresos por suscripción de 1.119-1.129 M USD (subida desde 1.115-1.125), ARR de suscripción de 1.200-1.210 M, margen EBIT no GAAP ≈ 21 % (desde 20,5 %), flujo libre de 250-260 M, recompras ≈ 60 % del flujo libre y ≈ 42 M de acciones; para el 2T, suscripción de 264-268 M, por debajo de los 267 M del 1T [2]. La caída del 28-jul vino de esa guía del 2T y de que la licencia a plazo solo creció un 1 % (110,4 M); la dirección habló de contratos algo más cortos mientras los clientes revisan sus planes de almacenamiento y de un efecto divisa [9, 2]. No hemos podido leer la transcripción completa (Seeking Alpha y Quartr exigen registro): las preguntas de los analistas y lo que la dirección evitó quedan sin documentar.',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: 'FY2031 (15-sep-2030)', importe: 900 }],
    liquidez: 'Caja de 929,8 M USD a 30-jun-2026 y línea de crédito garantizada de 300 M con JPMorgan hasta abril de 2030, sin disponer (covenants de apalancamiento y cobertura de intereses, cumplidos) [5].',
    rating: 'Sin rating público',
    coste_deuda_pct: 0.0,
    vida_media_anios: 3.9,
    otros_pasivos: 'Bonos convertibles de 900 M USD al 0 % con vencimiento el 15-sep-2030, emitidos el 5-sep-2025: precio de conversión de 236,88 USD por acción (4,2215 acciones por cada 1.000 USD); la empresa paga en caja hasta el nominal y elige caja o acciones para el exceso; las opciones con techo (99,6 M de coste) cubren la dilución hasta 357,56 USD [7, 1]. De lo emitido, 117,7 M fueron a recomprar acciones el mismo día [1]. Ingresos diferidos de 764,9 M a 30-jun-2026 (473,7 a corto y 291,2 a largo): cobros por adelantado que son circulante, no deuda [2]. Arrendamientos operativos de 35,7 M (fuera del puente en US GAAP) [2]. Demandas colectivas presentadas en mayo y junio de 2026 en Nueva Jersey por la información sobre el ARR (Secciones 10(b) y 20(a)); sin cuantía y sin provisión [5]. Pasivos fiscales inciertos de 17,6 M [1].',
    comentario: 'El balance cambió en FY2026: la caja pasó de 302 M USD a 900 M con la emisión de los convertibles (900 M) y, a la vez, la empresa recompró 446,1 M de acciones, así que el patrimonio cayó de 325 M a 7,5 M [1]. Caja neta de los convertibles: ≈ 30 M a junio de 2026 [2]. El circulante comercial es muy negativo porque los clientes pagan por adelantado: clientes (271,6 M) menos ingresos diferidos (764,9 M) = −493 M en junio de 2026, ≈ −37 % de las ventas; crecer libera caja (136,4 M de aumento de ingresos diferidos en FY2026) [2, 1]. Las cuentas a cobrar crecen más que las ventas (+31 % en FY2026 hasta 330,5 M) por la facturación de contratos de licencia a plazo al final del trimestre [1].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El flujo operativo fue de 244,7 M USD en FY2026 y el flujo libre de la empresa de 237,2 M (20,0 % de las ventas), frente a un beneficio de 70,7 M [1, 3]. La diferencia la explican la remuneración en acciones (123,4 M, gasto sin caja: se paga con dilución, compensada con recompras) y el aumento de ingresos diferidos (136,4 M), en parte contrarrestado por más cuentas a cobrar (74,0 M) y comisiones activadas (73,7 M pagadas frente a 47,7 M amortizadas) [1]. Por eso el capex del informe suma al inmovilizado (7,5 M) el aumento neto de comisiones activadas (24,6 M en FY2026) [1, 6]. El flujo libre «del dueño», restando la remuneración en acciones, fue de ≈ 114 M en FY2026. En el 1T FY2027 el flujo libre fue de 51,1 M (+71 %) [2]. La caja se ha ido a recompras: 1.250 M en FY2022-FY2026, de ellas 446,1 M en FY2026 (4,17 M de acciones) [1, 6].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: null, opinion: 'Favorable (sin salvedades) en FY2026, también sobre el control interno [1]',
    comentario: 'Las cuentas son limpias, pero el beneficio publicado dice poco por tres razones. Primera, la remuneración en acciones: 123,4 M USD en FY2026 (10,4 % de las ventas; 172,4 M aún por reconocer a 2,1 años), que la empresa saca de su BPA no GAAP (4,35 USD frente a 1,58 GAAP) [1, 3]. Es un coste real: las recompras de 446 M de FY2026 sirvieron en buena parte para compensar la dilución. Segunda, el reconocimiento de ingresos: la licencia a plazo se registra casi entera al firmar, de modo que la duración de los contratos mueve los ingresos de cada trimestre (el 1T27 lo notó) [2, 9]. Tercera, los impuestos: FY2024 llevó una liberación de provisión de activos fiscales de ≈ 105 M (tipo efectivo del −102 %), que infló el BPA a 3,75 USD [1]. La reestructuración se repite cada año. Lectura de los indicadores del motor: con patrimonio casi nulo y circulante muy negativo, Altman y ROE no significan nada; Beneish y Piotroski se leen con cuidado por el salto de caja y deuda de FY2026.',
    senales: [
      { senal: 'Remuneración en acciones alta', nivel: 'Alta', comentario: '123,4 M USD en FY2026 (10,4 % de las ventas) y 35,3 M en el 1T27; la empresa la excluye de su BPA [1, 2].' },
      { senal: 'Reestructuración recurrente', nivel: 'Media', comentario: 'Cargos todos los años desde FY2019 (32,2 M en FY2026, dos planes) que el no GAAP excluye [6, 1].' },
      { senal: 'Ingresos de licencia a plazo reconocidos al firmar', nivel: 'Media', comentario: 'La duración de los contratos adelanta o retrasa ingresos; la licencia a plazo creció un 1 % en el 1T27 [2].' },
      { senal: 'Cambio de métricas de ARR', nivel: 'Media', comentario: 'En abril de 2026 dejó de publicar el ARR total y redefinió el ARR de suscripción, tras fallar el ARR neto nuevo del 3T26 y con demandas colectivas abiertas por ello [3, 5].' },
      { senal: 'Liberación de provisión fiscal en FY2024', nivel: 'Baja', comentario: 'Tipo efectivo del −102 % en FY2024; BPA de 3,75 USD no repetible [1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo. La caja va a recompras: programa sin fecha de caducidad que el consejo «recompromete» por tramos de 250 M USD (abril de 2025, enero de 2026 y 15-abr-2026); quedaban 239,9 M a 30-jun-2026 [5, 1]. Guía de FY2027: recompras de ≈ 60 % del flujo libre (≈ 150-156 M) [2]. Compras pequeñas de tecnología (Clumio, Appranix, Satori) [1].',
    adquisiciones: [
      { anio: 'FY2020', objetivo: 'Hedvig (almacenamiento definido por software)', importe: 157.9, ev_ebitda: null, financiacion: 'Caja y acciones', resultado: 'Base de HyperScale y del almacenamiento distribuido; sin deterioros [6].' },
      { anio: 'FY2025', objetivo: 'Clumio (copia de datos nativa en AWS) y Appranix', importe: 70.2, ev_ebitda: null, financiacion: 'Caja (65,3 M) y acciones (4,9 M)', resultado: 'Clumio Backtrack y Clumio para Apache Iceberg; FedRAMP «ready» en septiembre de 2026 [1, 8].' },
      { anio: 'FY2026', objetivo: 'Satori Cyber (seguridad de datos e IA)', importe: 28.1, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada en la plataforma Commvault Cloud Unity (datos estructurados y de IA) [1, 3].' },
    ],
    comentario: 'La dirección ha devuelto toda la caja con recompras (1.250 M USD en FY2022-FY2026), pero las acciones diluidas solo bajaron de 47,2 M en FY2022 a 44,7 M en FY2026 y 41,9 M en el 1T27: buena parte de lo recomprado compensa la remuneración en acciones (≈ 100-125 M al año) [1, 6]. En FY2026 la empresa se endeudó con 900 M de convertibles al 0 % y recompró 446 M a ≈ 107 USD de media; luego la acción bajó a 71,75 en abril de 2026 [1]. Las compras son pequeñas y tecnológicas, sin deterioros. Veredicto: asignación correcta pero que sirve sobre todo para no diluir.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Licencia a plazo', descripcion: 'Licencias de software por plazo (1-3 años) para instalar en el centro de datos o en la nube del cliente; se reconocen casi enteras al firmar.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 303.0, resultado: null }, { periodo: 'FY2025', ingresos: 370.4, resultado: null }, { periodo: 'FY2026', ingresos: 435.3, resultado: null }] },
      { nombre: 'SaaS (Commvault Cloud, antes Metallic; Clumio)', descripcion: 'Copia y recuperación como servicio en la nube de Commvault (Azure, AWS).', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 126.2, resultado: null }, { periodo: 'FY2025', ingresos: 219.3, resultado: null }, { periodo: 'FY2026', ingresos: 333.0, resultado: null }] },
      { nombre: 'Soporte (de licencias a plazo y perpetuas)', descripcion: 'Mantenimiento y soporte; el de licencias perpetuas cae (118,3 M en FY2026, −15 %) y el de licencias a plazo sube (202,2 M, +19 %).', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 307.8, resultado: null }, { periodo: 'FY2025', ingresos: 307.6, resultado: null }, { periodo: 'FY2026', ingresos: 320.4, resultado: null }] },
      { nombre: 'Licencia perpetua y otros servicios', descripcion: 'Licencias perpetuas (residuales) y servicios profesionales.', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 102.3, resultado: null }, { periodo: 'FY2025', ingresos: 98.4, resultado: null }, { periodo: 'FY2026', ingresos: 95.0, resultado: null }] },
    ],
    geografias: [{ nombre: 'América (EE. UU., Canadá y Latinoamérica)', peso_pct: 59.4 }, { nombre: 'Internacional (EMEA, Asia-Pacífico)', peso_pct: 40.6 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'ARR de suscripción (M USD)', valor_anterior: '867,3 (jun-25)', valor_actual: '1.054,3 (jun-26)', variacion: '+22 %', comentario: 'Definición nueva desde abril de 2026; guía FY2027 1.200-1.210 [2].' },
      { kpi: 'ARR de SaaS (M USD)', valor_anterior: '306,9', valor_actual: '424,3', variacion: '+38 %', comentario: 'Más de 10.000 clientes de SaaS [2].' },
      { kpi: 'Ingresos por suscripción (M USD, trimestre)', valor_anterior: '229,3 (1T26)', valor_actual: '267,0 (1T27)', variacion: '+16 %', comentario: 'Incluye el soporte de licencias a plazo (definición nueva) [2].' },
      { kpi: 'Retención neta de ingresos de suscripción', valor_anterior: 'n.d.', valor_actual: '114 %', variacion: '—', comentario: 'Métrica nueva desde abril de 2026 [2].' },
      { kpi: 'Margen EBIT no GAAP', valor_anterior: '20,7 % (1T26)', valor_actual: '22,8 % (1T27)', variacion: '+2,1 pp', comentario: 'Excluye la remuneración en acciones; GAAP: 8,9 % y 8,2 % [2].' },
      { kpi: 'Flujo libre (M USD)', valor_anterior: '207,0 (FY2025, operativo)', valor_actual: '237,2 (FY2026)', variacion: '+15 %', comentario: 'Guía FY2027 250-260 M [3, 2].' },
    ],
    clientes: 'Más de 100.000 organizaciones usan la plataforma, con más de 10.000 clientes de SaaS [2]. No hay concentración relevante: ningún cliente llega al 10 % de los ingresos; la venta es sobre todo indirecta (revendedores, integradores, distribuidores, OEM y mercados de la nube), y los revendedores son el canal principal, con acuerdos anuales no exclusivos [1]. Retención neta de la suscripción del 114 % en el 1T27 [2]. El poder de precios es limitado y competido: el 10-K habla de «presión de precios continua» de los competidores y del paso a SaaS, y en el 1T27 la empresa lanzó una «iniciativa estratégica de precios» con 6,5 M USD de costes [1, 2]. El paso a SaaS sube el valor de por vida del cliente pero baja el ingreso por contrato a corto plazo (contratos más cortos y baratos), como mostró el 3T26 [8].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'transcripción de las dos últimas conferencias (preguntas de analistas)', tipo: 'Complemento', intentos: '1) Seeking Alpha (transcripción del 1T27 y del 4T26: registro obligatorio); 2) Quartr y StockTaper (registro y error 429); 3) resúmenes de prensa (Motley Fool, MarketBeat, StorageNewsletter): solo titulares', decision: 'Se usan las notas de resultados y la prensa; preguntas sin documentar' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K FY2026 de Commvault: negocio, competencia (Rubrik, Cohesity, Veeam, nubes), canales, riesgos', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-11', url: `${ED}/000116956126000017/cvlt-20260331.htm` },
  { id: 2, titulo: 'Data Center Backup and Recovery Software Market (10.620 M USD en 2024, 11.650 M en 2025, 26.790 M en 2034, TCAC del 9,69 %)', editor: 'Market Research Future', tipo: 'Sectorial', fecha: '2025', url: 'https://www.marketresearchfuture.com/reports/data-center-backup-and-recovery-software-market-31689' },
  { id: 3, titulo: 'Global Backup and Recovery Software Market (5.571,8 M USD en 2023, 10.800 M en 2030, TCAC del 9,8 %)', editor: 'Valuates Reports (PR Newswire)', tipo: 'Sectorial', fecha: '2025-11-27', url: 'https://tools.prnewswire.com/en-us/live/20823/release/20251127EN34661' },
  { id: 4, titulo: 'Veeam leads 2026 Gartner backup MQ by a whisker (Cohesity, Commvault, Rubrik y Veeam en líderes)', editor: 'Blocks & Files', tipo: 'Prensa', fecha: '2026-07-03', url: 'https://www.blocksandfiles.com/data-protection/2026/07/03/veeam-leads-2026-gartner-backup-mq-by-a-whisker/5266085' },
  { id: 5, titulo: 'Rubrik fiscal 2Q27 financial results (ingresos 427,3 M USD, +38 %; ARR de suscripción 1.660 M, +33 %; guía FY2027 1.685-1.693 M)', editor: 'StorageNewsletter', tipo: 'Prensa', fecha: '2026-08-28', url: 'https://www.storagenewsletter.com/2026/08/28/rubrik-fiscal-2q27-financial-results/' },
  { id: 6, titulo: 'Cohesity becomes number one in data protection by creating $7bn firm with Veritas (ingresos pro forma > 1.700 M USD, ARR 1.500 M)', editor: 'IT Europa', tipo: 'Prensa', fecha: '2024-12-10', url: 'https://iteuropa.com/news/cohesity-becomes-number-one-data-protection-creating-7bn-firm-veritas' },
  { id: 7, titulo: 'Fichas de competidores y comparables (ventas y márgenes de los últimos 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/RBRK' },
  { id: 8, titulo: 'Commvault Announces First Quarter Fiscal 2027 Financial Results (asociación con Microsoft Azure, Gartner)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000116956126000020/q1fy27pressrelease.htm` },
  { id: 9, titulo: 'Commvault Announces Fourth Quarter Fiscal 2026 Financial Results (alianzas con NetApp, Microsoft Security, CrowdStrike, Okta; compra de Satori)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-28', url: `${ED}/000116956126000013/q4fy26pressrelease.htm` },
];
const rb = Y.RBRK;
const B_ = {
  _estado: 'Completa. Sin ficha sectorial de protección de datos en el repo (la de software excluye ciberseguridad e infraestructura): tamaño con dos fuentes de pago resumidas en abierto, competidores con sus cifras públicas.',
  sector: {
    definicion: 'Mercado relevante: el software empresarial de protección de datos (copia, recuperación y ciberresiliencia) para centros de datos, nube pública y aplicaciones SaaS, en todo el mundo. Usamos la cifra de Market Research Future para el software de copia y recuperación de centros de datos, 11.650 M USD en 2025 con un 9,7 % anual hasta 2034 [2], porque cubre a los mismos proveedores (Veeam, Commvault, Dell, IBM, Veritas, Rubrik, Cohesity). Valuates da un perímetro más estrecho, 5.572 M en 2023 con un 9,8 % anual [3]: las dos coinciden en el crecimiento (≈ 10 %) y no en el tamaño, que depende de si se cuentan el soporte y el hardware asociado. Quedan fuera los equipos de almacenamiento y la seguridad de identidades, en los que Commvault entra con productos nuevos.',
    tamano: '≈ 11.650 M USD en 2025 (software de copia y recuperación de centros de datos, mundial) [2]; ≈ 5.570 M en 2023 con un perímetro más estrecho [3]',
    unidad_serie: 'millones de USD (Market Research Future; 2026e-2030e con su TCAC del 9,69 %)',
    serie: [{ anio: '2024', tamano: 10620 }, { anio: '2025', tamano: 11650 }, { anio: '2026e', tamano: 12779 }, { anio: '2027e', tamano: 14017 }, { anio: '2028e', tamano: 15376 }, { anio: '2030e', tamano: 18500 }],
    tcac_historico_pct: 9.7, tcac_previsto_pct: 9.7, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Ransomware y ciberresiliencia', efecto: '+', horizonte: 'Estructural', evidencia: 'La recuperación limpia tras un ataque es hoy el argumento de venta: Commvault integra detección con Microsoft Security y CrowdStrike y seguridad de identidades (Okta, Delinea) [9, 1].' },
      { driver: 'Paso a la nube y a SaaS', efecto: '+/−', horizonte: 'Estructural', evidencia: 'El SaaS de Commvault creció un 52 % en FY2026 (333,0 M USD), pero con contratos más cortos y baratos que hundieron el ARR neto nuevo del 3T26 [1, 9].' },
      { driver: 'Datos de IA (vectores, lagos de datos)', efecto: '+', horizonte: 'Estructural', evidencia: 'Más datos que proteger y gobernar: Clumio para Apache Iceberg, Satori (seguridad de datos e IA), Pinecone [1, 9].' },
      { driver: 'Ciclo de almacenamiento y presupuestos de TI', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'En el 1T27 los clientes acortaron contratos mientras revisaban sus planes de almacenamiento: licencia a plazo +1 % [8].' },
      { driver: 'Nubes públicas como competidoras', efecto: '−', horizonte: 'Estructural', evidencia: 'AWS, Azure y Google ofrecen copia nativa; Commvault compite y a la vez se asocia (servicio nativo en Azure desde 2026) [1, 8].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Cuatro líderes casi empatados en Gartner (Veeam, Cohesity, Commvault, Rubrik) [4]; Rubrik crece un 38 % frente al 11 % de Commvault [5, 8].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Sin cliente de más del 10 %, pero grandes empresas que licitan y revendedores no exclusivos que venden también a la competencia [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'El coste del SaaS es la nube (Azure, AWS): 118,3 M USD de coste del SaaS en FY2026 (35,5 % de sus ingresos) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Rubrik entró en 2014 y ya factura más que Commvault; las nubes y los fabricantes de almacenamiento empaquetan copia [5, 1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Copias inmutables de los fabricantes de almacenamiento y servicios nativos de nube sustituyen parte del uso [1].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en protección de datos aguanta mejor que el de almacenamiento: en 2009 cayeron las licencias nuevas y aguantó el soporte; en 2020 la demanda subió con el trabajo a distancia; en 2022 lo que cayó fueron los múltiplos. Hoy crece por el ransomware, pero el 1T27 mostró que los clientes alargan las decisiones cuando revisan su almacenamiento (precios de la memoria) [8, 1].' },
    regulacion: 'Normas que obligan a poder recuperarse: DORA en la banca europea (desde enero de 2025), NIS2 en la UE, las reglas de la SEC de comunicación de ciberincidentes (2023) y los requisitos de soberanía de datos (Commvault firmó con STACKIT en Europa) [9]. En el sector público de EE. UU., las autorizaciones FedRAMP High y GovRAMP de Commvault Cloud y FedRAMP «ready» de Clumio [1, 8].',
    tendencias: 'Tres tendencias: la convergencia de copia y seguridad (detección de amenazas, identidades, gobierno de datos), en la que Commvault se asocia con Microsoft, CrowdStrike, Okta y NetApp [9]; el paso a SaaS, que favorece a quien nació en la nube (Rubrik) [5]; y la IA, que crea más datos que proteger pero también puede automatizar la gestión de copias y abaratar la recuperación. Commvault gana con la primera, pierde terreno relativo en la segunda y está expuesta en las dos direcciones a la tercera.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 10.2, posicion: 'Uno de los cuatro líderes del cuadrante de Gartner (15 años seguidos); ≈ 10 % del software de copia y recuperación de centros de datos (1.184 M USD de ventas sobre ≈ 11.650 M, estimación propia) [2, 8]',
    competidores: [
      { nombre: 'Rubrik', pais: 'EE. UU.', ticker: 'RBRK', ingresos: Math.round(rb.ventas / 1e6), cuota_pct: r1(rb.ventas / 1e6 / 11650 * 100), margen_ebit_pct: null, comentario: `Nativo de la nube; ingresos +38 % en el 2T FY2027 (427,3 M USD), ARR de suscripción 1.660 M (+33 %); pérdidas GAAP (margen EBITDA ${r1(rb.margen_ebitda * 100)} % en 12 meses) [5, 7].` },
      { nombre: 'Veeam (Insight Partners)', pais: 'EE. UU./Suiza', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Primero por poco en Gartner 2026; fuerte en el mercado medio y en virtualización; compró Securiti AI por 1.725 M USD [4].' },
      { nombre: 'Cohesity (con el negocio de copia de Veritas)', pais: 'EE. UU.', ticker: null, ingresos: 1700, cuota_pct: 14.6, margen_ebit_pct: null, comentario: 'Ingresos pro forma de más de 1.700 M USD y ARR de 1.500 M (año a julio de 2024), 28 % de margen EBITDA en caja ajustado [6].' },
      { nombre: 'Dell Technologies (PowerProtect)', pais: 'EE. UU.', ticker: 'DELL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Copia ligada al almacenamiento; cerca de pasar a «aspirantes» en Gartner [4].' },
      { nombre: 'NetApp', pais: 'EE. UU.', ticker: 'NTAP', ingresos: Math.round(Y.NTAP.ventas / 1e6), cuota_pct: null, margen_ebit_pct: null, comentario: 'Almacenamiento con copias inmutables propias; aliado de Commvault desde 2026 [9, 7].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Integraciones con Microsoft, CrowdStrike, Okta y NetApp dan alcance, no efecto de red [9].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Las copias de años y las políticas de retención atan al cliente; retención neta del 114 % [8].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Líder de Gartner 15 años seguidos; FedRAMP High; más de 200 marcas registradas [8, 1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Margen bruto del 81 % pero ventas y marketing del 43,9 % de los ingresos en FY2026 [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Cuatro líderes con 1.200-2.000 M USD de ventas cada uno; nadie domina [4, 5, 6].' },
      ],
    },
    amenazas: 'La amenaza principal es Rubrik: con ingresos un 30 % mayores que los de Commvault en los últimos 12 meses y creciendo al 38 %, gana las cuentas grandes que pasan a la nube [5, 7]. La segunda, Veeam y Cohesity, con capital riesgo detrás y dispuestos a bajar precios (el 10-K habla de presión de precios continua) [1]. La tercera, las nubes públicas y los fabricantes de almacenamiento, que empaquetan copia nativa. Probabilidad alta de que Commvault siga perdiendo cuota relativa en SaaS; media de que eso le obligue a bajar márgenes.',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Commvault vende software para hacer copias de seguridad de los datos de una empresa, guardarlas aisladas y recuperarlas rápido y limpias tras un fallo o un ataque de ransomware, en el centro de datos propio, en la nube pública (AWS, Azure, Google) y en aplicaciones SaaS (Microsoft 365, Salesforce) [1]. Lo vende como licencia por plazo para instalar (435,3 M USD en FY2026), como servicio en su nube (SaaS, 333,0 M) y con soporte (320,4 M), sobre una plataforma única, Commvault Cloud [1]. Tiene ≈ 3.300 empleados (36 % en EE. UU., ≈ 40 % en India) y vende sobre todo a través de revendedores, integradores y mercados de la nube; el 59 % de las ventas es de América [1].',
    como_gana_dinero: 'Es un negocio de ingresos recurrentes: la suscripción (licencia a plazo, SaaS y su soporte) es ≈ 85 % de las ventas en la definición nueva de la empresa [8]. El margen bruto es del 81 %; el SaaS tiene un margen bruto menor (64 % en FY2026) porque paga la nube [1]. El beneficio depende de cuánto gasta en vender: ventas y marketing fue el 43,9 % de los ingresos en FY2026 [1]. La remuneración en acciones (10,4 % de las ventas) separa el margen GAAP (6,3 %) del que publica la empresa (20,1 %) [1, 9]. Cobra por adelantado: los ingresos diferidos (765 M USD) financian el circulante. Estacionalidad: el 3T y el 4T (oct-mar) son los trimestres más fuertes en licencias.',
  },
  huecos: [
    { seccion: 'sector', campo: 'cuota de los cinco primeros (CR5)', tipo: 'Complemento', intentos: '1) Gartner (cuadrante 2026, sin cuotas en abierto); 2) IDC (sin cifras en abierto); 3) prensa sectorial (Blocks & Files, IT Europa): cuotas con perímetros distintos', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, remuneración, accionistas, ratio de remuneración', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-24', url: `${ED}/000116956126000018/cvlt-20260624.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta del 6-ago-2026 (votos)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000116956126000027/cvlt-20260806.htm` },
  { id: 3, titulo: 'Form 8-K: Gary Merrill, director financiero, y Geoff Haydon, presidente de clientes y operaciones de campo (13-abr-2026)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-13', url: `${ED}/000116956126000008/pressrelease-geoffandgary2.htm` },
  { id: 4, titulo: 'Form 8-K: salida de la directora financiera Jen DiRico (4-dic-2025)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-04', url: `${ED}/000116956125000094/pressrelease-cforesignation.htm` },
  { id: 5, titulo: 'Form 8-K: David Morton entra en el consejo (24-sep-2026)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-09-24', url: `${ED}/000116956126000030/pressrelease-davidmorton20.htm` },
  { id: 6, titulo: 'Form 4 de directivos y consejeros de Commvault (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001169561&type=4' },
  { id: 7, titulo: 'Notas de resultados FY2026 y 1T FY2027 (guías y cumplimiento)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000116956126000020/q1fy27pressrelease.htm` },
  { id: 8, titulo: 'Form 10-Q del 1T FY2027: demandas colectivas de mayo y junio de 2026 (Nueva Jersey)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${ED}/000116956126000024/cvlt-20260630.htm` },
  { id: 9, titulo: 'Notas de resultados del 1T, 2T y 3T FY2026 (guías de ingresos, ARR, margen y flujo libre)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-27', url: `${ED}/000116956126000003/q3fy26pressrelease.htm` },
];
const C = {
  _estado: 'Completa. Proxy 2026, 8-K de la junta del 6-ago-2026 y de los cambios de directivos y consejo, Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Sanjay Mirchandani', cargo: 'Presidente ejecutivo de operaciones y consejero delegado', desde: '2019', participacion_pct: 0.58, trayectoria: 'Antes consejero delegado de Puppet y directivo de VMware y EMC. Con él la empresa pasó de licencia perpetua a suscripción: ingresos de 671 M USD en FY2020 a 1.184 M en FY2026 y margen EBIT no GAAP del 20 % [1, 7].' },
      { nombre: 'Gary Merrill', cargo: 'Director financiero', desde: '2026', participacion_pct: 0.03, trayectoria: 'Más de 20 años en Commvault; director financiero en 2022-2024 y director comercial en 2024-2026; vuelve a finanzas el 13-abr-2026 [3].' },
      { nombre: 'Geoff Haydon', cargo: 'Presidente de clientes y operaciones de campo', desde: '2026', participacion_pct: null, trayectoria: 'Ex consejero delegado de Ontinue (detección gestionada), con pasos por VMware, Secureworks, Absolute Software y RSA; consejero de Commvault de octubre de 2025 a abril de 2026 [3].' },
      { nombre: 'Danielle Abrahamsen', cargo: 'Directora de contabilidad', desde: '2023', participacion_pct: null, trayectoria: 'Controller desde 2022; llevó la oficina del director financiero con Kevin White entre la salida de DiRico (31-dic-2025) y la llegada de Merrill [4].' },
      { nombre: 'Nicola Adamo', cargo: 'Presidente del consejo (independiente)', desde: '2018', participacion_pct: 0.04, trayectoria: 'Fundador de Making a Mark; preside el consejo [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026 ingresos', guia: '1.161-1.165 M USD (julio de 2025)', real: '1.183,7 M', cumplida: 'Sí' },
      { anio: 'FY2026 flujo libre', guia: '210-215 M USD (julio de 2025)', real: '237,2 M', cumplida: 'Sí' },
      { anio: 'FY2026 margen EBIT no GAAP', guia: '≈ 20,5 % (julio de 2025), bajado a 19-20 % (enero de 2026)', real: '20,1 %', cumplida: 'Parcial' },
      { anio: 'FY2026 ARR neto nuevo del 2.º semestre', guia: '≈ 45 M USD por trimestre (según la demanda colectiva y la prensa)', real: '39 M en el 3T26', cumplida: 'No' },
      { anio: 'FY2026 ARR total', guia: '+18 % (julio de 2025)', real: '+21 % (+18 % a tipos constantes)', cumplida: 'Sí' },
      { anio: '1T FY2027', guia: 'Suscripción 263-265 M USD, margen EBIT no GAAP ≈ 19 %', real: '267,0 M y 22,8 %', cumplida: 'Sí' },
    ],
    comentario: 'La dirección cumple las guías de ingresos, flujo libre y margen casi siempre, pero falló en el indicador que el mercado más mira, el ARR neto nuevo del 3T26, y luego cambió las métricas que publica [7, 9]. Mirchandani lleva siete años y es el artífice de la transición; la rotación de directores financieros es alta (Merrill 2022-2024, DiRico 2024-2025, Merrill otra vez desde abril de 2026) [3, 4]. No hay plan de sucesión público para el consejero delegado. La entrada de Haydon (seguridad) en la red comercial responde a la pérdida de ritmo frente a Rubrik.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Nicola Adamo', cargo: 'Presidente del consejo', tipo: 'Independiente', desde: '2018', comisiones: 'Según el proxy de 2026' },
      { nombre: 'Sanjay Mirchandani', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2019', comisiones: '—' },
      { nombre: 'Martha Bejar', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Según el proxy de 2026' },
      { nombre: 'Keith Geeslin', cargo: 'Consejero', tipo: 'Independiente', desde: '1996', comisiones: 'Según el proxy de 2026' },
      { nombre: 'Vivie "YY" Lee', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Según el proxy de 2026' },
      { nombre: 'Chuck Moran', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Según el proxy de 2026' },
      { nombre: 'Shane Sanders', cargo: 'Consejero', tipo: 'Independiente', desde: '2022', comisiones: 'Según el proxy de 2026' },
      { nombre: 'David Morton', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Comisión de Operaciones (presidente)' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: 94.2, voto_remuneracion_contra_pct: 5.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 19.91, fijo: 0.69, variable_corto: 1.11, variable_largo: 18.05, ratio_salario_medio: 175 },
    remuneracion: 'El consejero delegado cobró 19,9 M USD en FY2026 (18,8 M en FY2025 y 12,1 M en FY2024): 0,69 M de fijo, 1,11 M de variable anual y 18,0 M en acciones [1]. El variable anual depende de los ingresos totales y del EBIT no GAAP (este último al 97,5 % del objetivo de 244 M) [1]. Las acciones de 2025 se reparten en un 40 % por tiempo, un 30 % por la rentabilidad para el accionista frente al Russell 3000 y un 30 % por el ARR total (cumplido al 102 %, pago del 111 %) [1]. Premia el crecimiento del ARR y el EBIT que excluye la remuneración en acciones: no castiga la dilución. Hay política de recuperación (clawback) [1]. Ratio frente al empleado mediano: 175 veces [1]. En la junta de 2026, 94,2 % a favor de la remuneración y 5,7 % en contra; en 2025, 96 % a favor [2, 1].',
    accionistas: [
      { nombre: 'BlackRock', pct: 13.9, tipo: 'Institucional', variacion: '13G/A de abril de 2025 (proxy 2026)' },
      { nombre: 'Vanguard (Portfolio Management y Capital Management)', pct: 14.4, tipo: 'Institucional', variacion: '8,8 % + 5,6 % (13G de abril de 2026)' },
      { nombre: 'Consejeros y directivos', pct: 0.9, tipo: 'Internos', variacion: 'Ventas de 18,0 M USD en 12 meses, sin compras' },
    ],
    insiders: [
      { fecha: '2026-08-17', persona: 'Sanjay Mirchandani (consejero delegado)', operacion: 'Venta', acciones: 24134, importe: 3.47 },
      { fecha: '2026-05-19', persona: 'Sanjay Mirchandani (consejero delegado)', operacion: 'Venta', acciones: 46004, importe: 4.81 },
      { fecha: '2026-05-19', persona: 'Gary Merrill (director financiero)', operacion: 'Venta', acciones: 15989, importe: 1.69 },
      { fecha: '2026-03-16', persona: 'Sanjay Mirchandani (consejero delegado)', operacion: 'Venta', acciones: 20390, importe: 1.62 },
      { fecha: '2025-11-17', persona: 'Sanjay Mirchandani (consejero delegado)', operacion: 'Venta', acciones: 27762, importe: 3.40 },
      { fecha: '2026-09-11', persona: 'Nicola Adamo (presidente del consejo)', operacion: 'Venta', acciones: 1530, importe: 0.20 },
    ],
    control_y_defensas: 'Sin accionista de control: BlackRock (13,9 %) y las dos gestoras de Vanguard (14,4 % juntas) son los mayores [1]. Una acción, un voto; consejo de siete elegido cada año (ocho con Morton desde septiembre de 2026), todos independientes salvo el consejero delegado, y presidente independiente separado [1, 5]. Sin operaciones vinculadas relevantes [1]. Keith Geeslin (Francisco Partners) lleva en el consejo desde 1996. En abril de 2026 Reuters informó de que la empresa estudiaba su venta con Goldman Sachs tras el interés de fondos (Thoma Bravo) y compradores industriales; no hay comunicado de la empresa ni cierre del proceso.',
    alertas: [
      'Ventas de directivos por 18,0 M USD en 12 meses (13,9 M del consejero delegado), 14,8 M con planes 10b5-1 y ninguna compra [6].',
      'Demandas colectivas de mayo y junio de 2026 por la información sobre el ARR del año fiscal 2026 (caída del 31 % del 27-ene-2026) [8].',
      'Rotación de directores financieros: DiRico se fue el 31-dic-2025 y Merrill vuelve al cargo el 13-abr-2026 [4, 3].',
      'Incidente de seguridad en 2025 (acceso de un actor estatal al entorno de Azure de Metallic): 1,8 M USD de costes legales y de consultoría en el 2T26 [7].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'comisiones de cada consejero', tipo: 'Complemento', intentos: '1) proxy 2026 (tabla gráfica que el texto no conserva); 2) web de gobierno corporativo de la empresa; 3) 8-K de nombramientos (solo Morton)', decision: 'Se indica «según el proxy de 2026»' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de CVLT, SPY e IGV (precio, rango, rentabilidades, beta, cierres de ejercicio): herramienta bolsa.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/CVLT/history' },
  { id: 2, titulo: 'Consenso de CVLT y comparables (BPA no GAAP y ventas, objetivos, recomendaciones, remuneración en acciones de 12 meses; sesión del 21-oct a las 10:43 de Nueva York): quoteSummary y fundamentals-timeseries', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CVLT/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Exclusive: Commvault explores sale after takeover interest, sources say (Goldman Sachs, Thoma Bravo)', editor: 'Reuters (vía Yahoo Finance)', tipo: 'Prensa', fecha: '2026-04-10', url: 'https://finance.yahoo.com/markets/stocks/articles/exclusive-commvault-explores-sale-takeover-165715528.html' },
  { id: 6, titulo: 'Titulares de Seeking Alpha sobre CVLT (Piper Sandler rebaja el 28-jul-2026, Jefferies «mantener», prima de compra del 30 %, resultados frente al consenso)', editor: 'Seeking Alpha', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://seekingalpha.com/api/sa/combined/CVLT.xml' },
  { id: 7, titulo: 'Noticias de CommVault Systems (subidas de objetivo de RBC, Mizuho y Scotiabank en octubre de 2026; fecha de resultados)', editor: 'MarketBeat', tipo: 'Analistas', fecha: '2026-10-18', url: 'https://www.marketbeat.com/stocks/NASDAQ/CVLT/news/' },
  { id: 8, titulo: 'Movimiento del precio de CVLT (1-12 meses, máximos, media de 200, caídas diarias de más del 5 %): herramientas movimiento.mjs y movimiento-precio.mjs', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/CVLT/history' },
  { id: 9, titulo: 'Form 4 de directivos (form4.mjs): ventas de 18,0 M USD en 12 meses, sin compras', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001169561&type=4' },
  { id: 10, titulo: 'Commvault Announces Second Quarter Fiscal Year 2027 Earnings Release Date (27-oct-2026)', editor: 'Commvault Systems, Inc. (vía Finviz)', tipo: 'Primaria', fecha: '2026-10-06', url: 'https://finviz.com/news/399246/commvault-announces-second-quarter-fiscal-year-2027-earnings-release-date' },
  { id: 11, titulo: 'Notas de resultados del 2T y 3T FY2026, 4T FY2026 y 1T FY2027 (8-K)', editor: 'Commvault Systems, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000116956126000020/q1fy27pressrelease.htm` },
  { id: 12, titulo: 'Kaseya-Datto: Datto Announces Fourth Quarter and Full Year 2021 Financial Results (ingresos de 618,7 M USD, EBITDA ajustado de 175,4 M) y compra por 6.200 M (35,50 USD por acción, prima del 52 %)', editor: 'Datto Holding Corp. / Kaseya', tipo: 'Primaria', fecha: '2022-04-11', url: 'https://www.kaseya.com/?p=14784' },
  { id: 13, titulo: 'OpenText to acquire Carbonite (valor empresa ≈ 1.420 M USD, ≈ 2,8 veces los ingresos de 12 meses, prima del 78 %)', editor: 'Carbonite, Inc. (SEC, SC 14D9-C)', tipo: 'Primaria', fecha: '2019-11-11', url: 'https://www.sec.gov/Archives/edgar/data/1340127/000119312519289310/d832010dex991.htm' },
  { id: 14, titulo: 'Cohesity becomes number one in data protection by creating $7bn firm with Veritas', editor: 'IT Europa', tipo: 'Prensa', fecha: '2024-12-10', url: 'https://iteuropa.com/news/cohesity-becomes-number-one-data-protection-creating-7bn-firm-veritas' },
  { id: 15, titulo: 'Form 10-Q del 1T FY2027 (demandas colectivas; convertibles; recompras)', editor: 'Commvault Systems, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-29', url: `${ED}/000116956126000024/cvlt-20260630.htm` },
  { id: 16, titulo: 'Why Commvault Stock Crashed Today (28-jul-2026)', editor: 'The Motley Fool', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.fool.com/investing/2026/07/28/why-commvault-stock-crashed-today/' },
  { id: 17, titulo: 'Imbert v. Commvault Systems (D.N.J. 26-cv-5654): ficha de la demanda colectiva (periodo 29-abr-2025 a 26-ene-2026, ARR neto nuevo de 39 M frente a ≈ 45 M)', editor: 'Bleichmar Fonti & Auld', tipo: 'Prensa', fecha: '2026-06', url: 'https://www.bfalaw.com/cases/commvault-systems-class-action-lawsuit' },
];
const c = Y.CVLT;
const t = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
const bol = B.bolsa;
// Comparables: Yahoo al cierre del 20-oct (cierre_previo), PER NTM con el BPA no GAAP de los analistas (forwardEps) [2].
// Base del informe (BPA con la remuneración en acciones como gasto): PER_conSBC = precio ÷ (BPA adelantado − SBC de 12 meses
// × (1 − 21 %) ÷ acciones diluidas). Estimación propia, para la regla a 12 meses (alcista) [2].
const lista = [['RBRK', 'US'], ['NTAP', 'US'], ['NTNX', 'US'], ['CHKP', 'IL'], ['QLYS', 'US'], ['FFIV', 'US'], ['DBX', 'US'], ['TENB', 'US'], ['AKAM', 'US'], ['GEN', 'US']];
const NOMBRES = { RBRK: 'Rubrik', NTAP: 'NetApp', NTNX: 'Nutanix', CHKP: 'Check Point Software', QLYS: 'Qualys', FFIV: 'F5', DBX: 'Dropbox', TENB: 'Tenable', AKAM: 'Akamai', GEN: 'Gen Digital' };
const comps = lista.map(([tk, pais]) => {
  const y = Y[tk]; const p = y.cierre_previo, k = p / y.precio;
  const tr = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const sbc = y.fund.trailingStockBasedCompensation?.valor, sh = y.fund.trailingDilutedAverageShares?.valor || y.acciones;
  const eps = y.bpa_adelantado, epsSbc = eps - sbc / sh * 0.79;
  const ev = y.ev - y.cap * (1 - k);
  return {
    nombre: NOMBRES[tk], ticker: tk, pais, capitalizacion: Math.round(y.cap * k / 1e6), ev_ventas: r2(ev / y.ventas),
    ev_ebitda_ltm: y.fund.trailingEBITDA?.valor > 0 ? r1(ev / y.fund.trailingEBITDA.valor) : null, ev_ebitda_ntm: null,
    per_ntm: eps > 0 && p / eps < 100 ? r1(p / eps) : null, crecimiento_pct: r1((tr['+1y']?.crec_ventas ?? 0) * 100),
    margen_ebitda_pct: r1(y.margen_ebitda * 100), roic_pct: null, dn_ebitda: null, fcf_yield_pct: y.fcf ? r1(y.fcf / (y.cap * k) * 100) : null,
    _per_con_sbc: epsSbc > 0 ? r1(p / epsSbc) : null,
  };
});
const med = (v) => { const s = v.filter((x) => x != null).sort((a, b) => a - b); const n = s.length; return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2; };
const perMed = med(comps.map((x) => x.per_ntm));
const perMedSbc = med(comps.map((x) => x._per_con_sbc));
const D = {
  _estado: `Completa. Precio de cierre del 20-oct-2026 (155,85 USD); la sesión del 21-oct estaba abierta (162,34 USD a las 14:43 UTC). Mediana del PER NTM de los comparables en BPA no GAAP: ${perMed}; con la remuneración en acciones como gasto: ${perMedSbc}.`,
  _per_mediana_comparables: perMed, _per_mediana_comparables_con_sbc: perMedSbc,
  identificacion: {
    nombre: 'Commvault Systems, Inc.', nombre_corto: 'Commvault', ticker: 'CVLT', isin: 'US2041661024', mercado: 'Nasdaq Global Select', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de sistemas', sede: 'Tinton Falls (Nueva Jersey)', fundacion: '1996', empleados: 3300, web: 'https://www.commvault.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 41.9, capitalizacion_publicada: Math.round(c.cap * (155.85 / c.precio) / 1e6), free_float_pct: 99.1,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía de FY2027 (a 31-mar-2027), dada el 28-abr-2026 y actualizada el 28-jul-2026: ingresos por suscripción de 1.119-1.129 M USD (antes 1.115-1.125), ARR de suscripción de 1.200-1.210 M, ingresos totales de 1.300-1.310 M (dados en abril; en julio la nota no los repite y la prensa dice que se mantienen), margen EBIT no GAAP ≈ 21 % (antes 20,5 %), flujo libre de 250-260 M, recompras ≈ 60 % del flujo libre y ≈ 42 M de acciones diluidas [11]. 2T FY2027: suscripción de 264-268 M y margen ≈ 20 % [11]. Resultados del 2T el 27-oct-2026 antes de la apertura [10].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: Math.round(t['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['0y'].n} analistas; BPA no GAAP (sin remuneración en acciones) [2]` },
      { periodo: 'FY2028e', ingresos: Math.round(t['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(t['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${t['+1y'].n} analistas; BPA no GAAP [2]` },
    ],
    recomendaciones: { n_analistas: c.reco.strongBuy + c.reco.buy + c.reco.hold + c.reco.sell + c.reco.strongSell, comprar: c.reco.strongBuy + c.reco.buy, mantener: c.reco.hold, vender: c.reco.sell + c.reco.strongSell, po_medio: r2(c.po_medio), po_min: c.po_min, po_max: c.po_max },
    revisiones: `El BPA no GAAP de FY2027 del consenso subió de ${n2(r2(t['0y'].bpa_hace90))} USD hace 90 días a ${n2(r2(t['0y'].bpa))} hoy, y el de FY2028 de ${n2(r2(t['+1y'].bpa_hace90))} a ${n2(r2(t['+1y'].bpa))}, tras subir la empresa el margen a ≈ 21 % el 28-jul [2, 11]; el del 3T FY2027 bajó de 1,42 a 1,38 [2]. Recomendaciones: ${c.reco.buy} comprar y ${c.reco.hold} mantener (hace tres meses, 10 y 8) [2]. Piper Sandler rebajó la acción el 28-jul por falta de catalizadores; Jefferies empezó en «mantener» en abril; en octubre subieron el objetivo RBC, Mizuho y Scotiabank [6, 7]. Objetivo medio de ${c.n_analistas} analistas: ${n2(r2(c.po_medio))} USD (${c.po_min}-${c.po_max}) [2]. El consenso usa BPA no GAAP, que excluye ≈ 2,4 USD por acción de remuneración en acciones después de impuestos; sin consenso gratuito de FY2029.`,
    base_ebitda: 'sin consenso de EBITDA (solo BPA no GAAP y ventas)', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...bol,
    beta: bol.beta, posicion_corta_pct: r1(c.corto_pct * 100),
    comentario: 'La acción es muy volátil para una empresa de software maduro: volatilidad del 63 % en el último año y caída máxima del 61,5 % en cinco años [1]. Subió un 89 % en 2024 por la aceleración de la suscripción, llegó a ≈ 198 USD en septiembre de 2025 y cayó a 71,75 el 9-abr-2026 tras tres resultados castigados (−16,3 % el 28-oct-2025, −31,1 % el 27-ene-2026) y la venta general de software por miedo a la IA [8, 6]. Desde abril ha doblado: el informe de Reuters sobre una posible venta (+10 % el 10-abr), los resultados del 4T (+10,8 % el 28-abr), el acuerdo con Microsoft (junio) y la recuperación de agosto-octubre, con otro tropiezo el 28-jul (−19,7 %) [5, 8]. Rentabilidad a un año del −10,9 % frente al +15,8 % del S&P 500; en tres años, +33,0 % anual frente al +23,7 % [1]. Posición corta del 9,8 % del capital flotante, en parte cobertura de los convertibles [2].',
    contexto: {
      movimiento: { fecha: '2026-10-21', var_1m_pct: 10.9, var_3m_pct: 15.1, var_6m_pct: 69.9, var_12m_pct: -7.9, dist_max_52s_pct: -7.1, dist_min_52s_pct: 116.0, dist_max_historico_pct: -16.9, tendencia: 'alcista', volatilidad_60d_pct: 46, avisos: ['P1 Subida fuerte (6 meses +69,9 %)'] },
      movimientos_fuertes: [
        { periodo: 'oct-nov 2025', var_pct: -16.3, causa: 'Resultados del 2T FY2026 (28-oct-2025): bate en BPA pero el mercado castiga el ARR y el margen; −16,3 % ese día y −5,3 % el 5-nov [11, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ene-feb 2026', var_pct: -31.1, causa: '3T FY2026 (27-ene-2026): ARR neto nuevo de 39 M USD frente a los ≈ 45 M apuntados, por el paso a SaaS; −31,1 % en un día y demandas colectivas después [17, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: 'feb-mar 2026', var_pct: -15.0, causa: 'Venta general del software por el miedo a que la IA sustituya aplicaciones (IGV −7 % en 12 meses) y salida de la directora financiera; mínimo de 71,75 USD el 9-abr [1, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr 2026', var_pct: 34.6, causa: 'Reuters (10-abr): Commvault estudia su venta con Goldman Sachs tras el interés de Thoma Bravo y otros (+10,2 %); nuevos director financiero y jefe comercial (13-abr); resultados del 4T por encima de la guía (+10,8 % el 28-abr) [5, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-jul 2026', var_pct: 52.6, causa: 'Recuperación tras el 4T y acuerdo plurianual con Microsoft para vender Commvault como servicio nativo de Azure (24-jun) [6, 11].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-ago 2026', var_pct: -19.9, causa: '1T FY2027 (28-jul): bate en BPA (1,42 frente a 1,16) pero guía del 2T por debajo de lo esperado y licencia a plazo +1 %; Piper Sandler rebaja; −19,7 % en un día [16, 6].', veredicto: 'no cambia', condicion: null },
        { periodo: 'ago-oct 2026', var_pct: 29.9, causa: 'Recuperación sin nota de la empresa: subidas de objetivo de RBC, Mizuho y Scotiabank en octubre; el mercado vuelve a hablar de compra («must be a buyout coming» en los foros); causa concreta no confirmada [7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-27', tipo: 'resultados', hecho: 'Resultados del 2T FY2027 el 27-oct-2026 antes de la apertura; guía de suscripción del trimestre de 264-268 M USD [10, 11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'recomendación', hecho: 'Subidas de objetivo de RBC (12-oct), Mizuho (15 y 17-oct) y Scotiabank (5-oct); objetivo medio de 17 analistas de 163,49 USD (130-200) [7, 2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-09-24', tipo: 'directivos', hecho: 'David Morton (director financiero de Intapp) entra en el consejo y preside la nueva comisión de Operaciones [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-17', tipo: 'directivos', hecho: 'Ventas de directivos de 18,0 M USD en 12 meses (13,9 M del consejero delegado), con planes 10b5-1 en su mayoría; ninguna compra [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-28', tipo: 'recomendación', hecho: 'Piper Sandler rebaja la recomendación por falta de catalizadores tras el 1T FY2027 [6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-06-30', tipo: 'demanda o regulador', hecho: 'Demandas colectivas (Imbert v. Commvault, D.N.J.) por la información sobre el ARR de abril de 2025 a enero de 2026; fase inicial, sin cuantía ni fecha [15, 17].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-10', tipo: 'fusión u oferta', hecho: 'Reuters: Commvault estudia su venta con Goldman Sachs tras el interés de fondos (Thoma Bravo, que ya había hecho una oferta) e industriales; un analista habló de una prima del 30 %; sin novedades públicas desde entonces [5, 6].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-04-15', tipo: 'deuda o capital', hecho: 'El consejo renueva el programa de recompras hasta 250 M USD (239,9 M disponibles a 30-jun) [15].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-10-27',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción ha subido un 70 % en seis meses y un 116 % desde el mínimo de abril, y está un 7 % por debajo de su máximo de 52 semanas; salta el aviso P1 (subida fuerte), que no cambia la señal pero obliga a explicar la causa: la posible venta (Reuters, 10-abr), los resultados del 4T y el acuerdo con Microsoft explican la mayor parte; la subida de agosto-octubre no tiene una causa concreta confirmada [5, 11, 7]. No hay colocaciones, ampliaciones ni decisiones judiciales con fecha que puedan mover el precio más de un 5 % en contra; las demandas colectivas están en fase inicial. El proceso de venta, si sigue vivo, es un riesgo a favor (prima), no en contra. Los resultados del 27-oct no retrasan nada (regla 11). Veredicto: no cambia.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((x) => anios.map((a) => 'FY' + a).includes(x.anio)).map((x) => ({ anio: x.anio, precio_cierre: x.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: ['FY2019', 'FY2020', 'FY2021', 'FY2023'].includes(x.anio) })),
    comentario: 'Precio de cierre de cada ejercicio (31 de marzo) de Yahoo [1]. Con el BPA GAAP, el PER de los últimos 12 meses no sirve en FY2019-FY2021 (beneficio casi nulo o pérdidas en la transición a suscripción) ni en FY2023 (pérdida por el deterioro de la antigua sede); en FY2024 el BPA está inflado por la liberación de provisión fiscal. El mercado ha valorado siempre a Commvault por su BPA no GAAP: ≈ 25-30 veces el adelantado en 2024-2025 y ≈ 26 hoy (6,19 USD de BPA no GAAP adelantado) [2]. En la base del informe (BPA con la remuneración en acciones como gasto) el múltiplo es mucho mayor, ≈ 50 veces, porque la remuneración en acciones se come casi la mitad del beneficio.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Software de infraestructura y seguridad de datos rentable, con modelo de suscripción y crecimiento de un dígito alto: Rubrik (rival directo, en pérdidas: sin PER), NetApp y Nutanix (almacenamiento e infraestructura híbrida), Check Point, Qualys, Tenable y F5 (seguridad), Dropbox (datos en la nube), Akamai (nube y seguridad) y Gen Digital (seguridad para particulares) [2]. Veeam y Cohesity no cotizan. Cifras de Yahoo al cierre del 20-oct-2026; PER con el BPA no GAAP de los analistas (excluye la remuneración en acciones, como el de Commvault).',
    empresas: comps.map(({ _per_con_sbc, ...e }) => e),
    comentario: `Commvault cotiza a ≈ 25 veces el BPA no GAAP de los próximos 12 meses, por encima de la mediana de los comparables (${n2(perMed)} veces) y en línea con Qualys (${n2(comps.find((x) => x.ticker === 'QLYS').per_ntm)}), F5 y Nutanix, con un crecimiento parecido (+11 %) [2]. Rubrik vale 15 veces las ventas porque crece al 38 %; Commvault, ≈ 5 [2]. Si se resta la remuneración en acciones (estimación propia con la de los últimos 12 meses de cada una), la mediana pasa a ${n2(perMedSbc)} veces y Commvault a ≈ 50: es de las que más pierden, porque la remuneración en acciones es el 10,6 % de sus ventas frente al 5-9 % de NetApp, F5 o Check Point [2]. Esa mediana con remuneración en acciones (${n2(perMedSbc)}) es la que usa la regla a 12 meses.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2022-04', objetivo: 'Datto (copia y gestión para proveedores de servicios)', comprador: 'Kaseya (Insight Partners, TPG, Temasek)', ev: 6200, ev_ventas: r2(6200 / 618.7), ev_ebitda: r1(6200 / 175.4), prima_pct: 52, excluir: false, comentario: '35,50 USD por acción; ingresos de 618,7 M y EBITDA ajustado de 175,4 M en 2021 [12].' },
      { fecha: '2019-11', objetivo: 'Carbonite (copia en la nube y Webroot)', comprador: 'OpenText', ev: 1420, ev_ventas: 2.8, ev_ebitda: null, prima_pct: 78, excluir: false, comentario: '≈ 2,8 veces los ingresos de 12 meses con Webroot anualizado [13].' },
      { fecha: '2024-12', objetivo: 'Cohesity + negocio de protección de datos de Veritas', comprador: 'Cohesity (fusión)', ev: 7000, ev_ventas: r2(7000 / 1700), ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valor de 7.000 M USD del conjunto y ingresos pro forma de más de 1.700 M [14].' },
      { fecha: '2020-03', objetivo: 'Veeam', comprador: 'Insight Partners', ev: 5000, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Valoración de ≈ 5.000 M USD con más de 1.000 M de ventas anuales (nota de Veeam, no abierta: múltiplo sin calcular).' },
    ],
    comentario: 'Las compras del sector se han pagado a 2,8-10 veces las ventas: barato el negocio maduro (Carbonite), caro el que crece (Datto, 35 veces el EBITDA ajustado) [12, 13, 14]. Commvault vale hoy ≈ 5,2 veces las ventas, dentro de ese rango. Es un objetivo plausible: sin accionista de control, 6.500 M USD de capitalización, caja neta, flujo libre de ≈ 255 M y un proceso de venta del que informó Reuters en abril de 2026 con Thoma Bravo como interesado [5]. Una prima del 30 % sobre el precio de entonces (≈ 85 USD) daba ≈ 110 USD, muy por debajo del precio actual: el mercado ya no descuenta solo una opa.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'consenso', campo: 'BPA GAAP y EBITDA del consenso; FY2029e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo BPA no GAAP de dos ejercicios); 2) MarketBeat (solo titulares); 3) MarketScreener no abre sin sesión', decision: 'Omitido; el BPA propio se calcula con la remuneración en acciones como gasto' },
    { seccion: 'bolsa', campo: 'causa de la subida de agosto-octubre de 2026', tipo: 'Complemento', intentos: '1) 8-K de la empresa (solo el nombramiento de Morton); 2) titulares de Seeking Alpha (RSS); 3) noticias de MarketBeat (subidas de objetivo)', decision: 'Se explica con las subidas de objetivo y la especulación de compra, sin causa confirmada' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $CVLT (jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/CVLT.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos sobre CVLT («Buy The Business, Respect The Print», 19-oct; «Recent Earnings Results Show Subscriber Growth», 1-ago; «The Hidden SaaS Strength Behind CVLT\'s Recent Dip», 2-jul; «Circling The Wagons On Takeover Interest», 14-abr)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://seekingalpha.com/symbol/CVLT/analysis' },
  { id: 3, titulo: 'MarketBeat: alertas y comentarios sobre CommVault (ago-oct 2026)', editor: 'MarketBeat', tipo: 'Foros y redes', fecha: '2026-10-18', url: 'https://www.marketbeat.com/stocks/NASDAQ/CVLT/news/' },
  { id: 4, titulo: 'Why Commvault Stock Crashed Today (y comentarios)', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-07-28', url: 'https://www.fool.com/investing/2026/07/28/why-commvault-stock-crashed-today/' },
];
const E = {
  _estado: 'Completa. Stocktwits (30 mensajes del 28-jul al 21-oct-2026), titulares y artículos de Seeking Alpha, MarketBeat y Motley Fool; Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits ($CVLT)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mezcla de análisis técnico (soporte en la media de 50 sesiones, «rompió y vendió fuerte»), especulación de compra («must be a buyout coming») y muchos mensajes de despachos sobre la demanda colectiva; comparaciones con Rubrik, a la que varios ven sobrevalorada frente a Commvault [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-10', n_comentarios: 6, tono: 'Positivo', resumen: 'Artículos alcistas con matices («compra el negocio, respeta el resultado», fuerza oculta del SaaS) frente a la rebaja de Piper Sandler por falta de catalizadores [2].' },
      { plataforma: 'MarketBeat', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: 'Subidas de objetivo de RBC, Mizuho y Scotiabank en octubre; ventas del director financiero y de la directora de contabilidad sin debate [3].' },
      { plataforma: 'Motley Fool', fecha: '2026-07', n_comentarios: 3, tono: 'Negativo', resumen: 'Tras el 1T27, «guía modesta» y una acción que «estaba cotizada para fuegos artificiales» tras subir un 92 % desde marzo [4].' },
    ],
    temas: [
      { tema: 'Posible compra por un fondo (Thoma Bravo)', postura: 'Alcista', peso: 'Alto', contraste: 'Hay un informe de Reuters (abril) pero ningún comunicado ni novedad en seis meses; el precio ya está por encima de lo que daba una prima del 30 % sobre el de abril [1].' },
      { tema: 'Rubrik frente a Commvault', postura: 'Dividida', peso: 'Alto', contraste: 'Rubrik crece al 38 % y Commvault al 11 %; Commvault es más barata por ventas (5 frente a 15 veces) pero pierde cuota en SaaS [1].' },
      { tema: 'Credibilidad del ARR y demandas', postura: 'Bajista', peso: 'Medio', contraste: 'El fallo del ARR neto nuevo del 3T26 y el cambio de métricas son reales; las demandas están en fase inicial [1].' },
      { tema: 'Resultados que baten y acción que cae', postura: 'Dividida', peso: 'Medio', contraste: 'Batió el BPA en los cuatro últimos trimestres y cayó en tres de ellos: el mercado mira el ARR y la guía, no el BPA [2, 4].' },
    ],
    lectura: 'El sentimiento es dividido y mejora: los particulares han pasado de la capitulación de abril (mínimo de 71,75 USD) a especular con una compra, y los analistas suben objetivos [1, 3]. No es euforia, pero la acción ha doblado y parte del precio descansa en una posible opa sin confirmar. El riesgo que señalan los foros y que el informe recoge es la competencia de Rubrik y la credibilidad del ARR. Opiniones, no datos: ninguna cifra sale de aquí.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. PER mediana comparables (no GAAP):', perMed, '· con SBC:', perMedSbc, comps.map((x) => `${x.ticker} ${x.per_ntm}/${x._per_con_sbc}`).join(', '));
