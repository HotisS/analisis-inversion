// Escribe las notas A-E de Itaú Unibanco (línea de compra: ADR ITUB en NYSE, corte 2026-10-27, precio de cierre del
// 26-oct-2026) a partir de: XBRL de los 20-F 2022, 2023 y 2025 en la SEC (NIIF), MD&A del 2T26 y de los 4T anteriores
// (BR GAAP gerencial), nota de prensa del 2T26, 20-F 2025, bolsa.json, yahoo-datos.json, BCB (Focus, SGS, PTAX) y prensa.
// Cada nota cita solo con [n] de su propia lista. Ejecutar: node informes/itau-unibanco-2026-10-27/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const ED = 'https://www.sec.gov/Archives/edgar/data/1132597';
const TC = 5.4064; // BRL por USD, cierre del 26-oct-2026 (Yahoo BRL=X)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Management Discussion & Analysis and Complete Financial Statements, 2T26 (BR GAAP gerencial y contable): resultado recurrente, ROE, CET1, morosidad, coste del crédito, margen, segmentos, previsiones 2026', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-07', url: `${ED}/000113259726000223/managementdiscussionanal.htm` },
  { id: 2, titulo: 'Itaú Unibanco registra lucro de R$ 12,4 bilhões e ROE de 24,3 % no segundo trimestre de 2026 (nota de prensa)', editor: 'Itaú Unibanco', tipo: 'Primaria', fecha: '2026-08-04', url: 'https://www.itau.com.br/media/dam/m/4a2ea1e7879ff197/original/itau-unibanco-registra-lucro-de-12-4-bilhoes-e-roe1-24-3-no-segundo-trimestre-de-2026-04-08-26.pdf' },
  { id: 3, titulo: 'Form 20-F 2025 (NIIF): cuentas, gobierno (Item 6), accionistas (Item 7), auditor, payout del 72 %', editor: 'Itaú Unibanco Holding S.A. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000113259726000132/itub-20251231.htm` },
  { id: 4, titulo: 'XBRL del 20-F 2025 (cuenta, balance y flujos NIIF 2023-2025; CET1 y activos ponderados por riesgo)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000113259726000132/itub-20251231_htm.xml` },
  { id: 5, titulo: 'XBRL de los 20-F 2022 y 2023 y company facts (NIIF 2020-2023)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2024-04-29', url: `${ED}/000129281424001692/itubform20f_2023_htm.xml` },
  { id: 6, titulo: 'Complete Financial Statements in IFRS, 31-dic-2025 (resultado recurrente NIIF, BPA, VC y dividendo por acción reexpresados)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-02-06', url: `${ED}/000113259726000059/completefinancialstateme.htm` },
  { id: 7, titulo: 'Resultados del 4T23: resultado recurrente gerencial 2023 (35.618 M) y 2022 (30.786 M), ROE 21,0 % y 20,3 %', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2024-02-06', url: `${ED}/000129281424000317/ex99-1.htm` },
  { id: 8, titulo: 'Resultados del 4T21: resultado recurrente gerencial 2021 (26.879 M) y 2020 (18.536 M)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2022-02-11', url: `${ED}/000119312522035752/d294237dex991.htm` },
  { id: 9, titulo: 'MD&A del 4T20: resultado recurrente 2019 (28.363 M), cobertura de la morosidad 320 %', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2021-02-04', url: `${ED}/000119312521028105/d127419dex991.htm` },
  { id: 10, titulo: 'Itaú bate R$ 46,8 bilhões de lucro anual (resultado recurrente 2025, ROE 23,4 %, guía 2026)', editor: 'NeoFeed', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://neofeed.com.br/negocios/itau-bate-r-468-bilhoes-de-lucro-anual-e-atinge-o-maior-resultado-da-historia-de-um-banco-brasileiro/en/' },
  { id: 11, titulo: 'Material Fact: 2026 guidance (revisión de comisiones y seguros a +2,0-5,0 %)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000113259726000219/materialfact_2026guidanc.htm` },
  { id: 12, titulo: 'Material Fact: acquisition of all shares issued by NeoSpace (2.925 M BRL, pago en parte aplazado)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-26', url: `${ED}/000113259726000245/materialfact_neospace.htm` },
];

// Cuenta NIIF (20-F) 2021-2025, adaptada al formato del motor: «ingresos» = ingresos operativos netos de pérdidas esperadas
// (margen financiero + comisiones + seguros − pérdidas esperadas); «gastos_generales» = gastos no financieros; «ebit» = «ebitda»
// = ingresos − gastos no financieros − impuestos sobre ingresos (ISS, PIS, Cofins); «resultado_financiero» = participadas.
// La amortización va dentro de los gastos no financieros (no se separa: 5.064 M en 2021, 6.529 M en 2023 [4, 5]).
// 2021: ingresos derivados (BAI − participadas + gastos no financieros + otros impuestos), porque el XBRL de 2021 no los da.
const ACC = 11075; // acciones medias reexpresadas por las bonificaciones del 10 % (mar-2025) y del 3 % (dic-2025) [6]
const filasCuenta = [
  ['2021', 111995, 62549, 8379, 1164, 13847, 1624, 26760, null],
  ['2022', 114542, 68930, 9590, 672, 6452, 1035, 29207, null],
  ['2023', 124526, 75759, 9987, 920, 5823, 772, 33105, null],
  ['2024', 135739, 79416, 9814, 1047, 5428, 1043, 41085, 2.32],
  ['2025', 138947, 79176, 10938, 1417, 4401, 992, 44857, 2.87],
];
const cuenta = filasCuenta.map(([p, ing, gnf, otrosImp, part, imp, min, bn, dpa]) => {
  const ebit = ing - gnf - otrosImp;
  return { periodo: p, ingresos: ing, coste_ventas: null, gastos_generales: gnf, ebitda: ebit, amortizaciones: 0, ebit, resultado_financiero: part, bai: ebit + part, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: r2(bn / ACC), dpa, dpa_extraordinario: dpa == null ? null : 0, acciones_diluidas: ACC };
});
const filasBal = [
  ['2021', 2069206, 1904730, 152864, 11612, 21110],
  ['2022', 2321066, 2143959, 167717, 9390, 23114],
  ['2023', 2543100, 2344050, 190177, 8873, 23364],
  ['2024', 2854475, 2633191, 211090, 10194, 23997],
  ['2025', 3066169, 2851093, 204501, 10575, 24099],
];
// Caja y deuda a 0 a propósito: en un banco los depósitos y las emisiones son la materia prima y la caja es activo del
// negocio (encaje, liquidez regulatoria). Así el «capital invertido» del motor es el patrimonio y su «ROIC» se lee como ROE.
const balance = filasBal.map(([p, at, pt, pn, mi, intg]) => ({ periodo: p, activo_total: at, activo_corriente: null, pasivo_corriente: null, pasivo_total: pt, fondo_comercio: 0, intangibles: intg, inmovilizado_material: null, existencias: 0, clientes: 0, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: pn, minoritarios: mi, reservas: null }));
// Flujos: el flujo de explotación de un banco (depósitos, cartera, repos) no mide la caja del accionista (54.306 M en 2021,
// 129.633 M en 2022, 7.069 M en 2024 [4, 5]). Se usa el beneficio atribuido como «flujo operativo» y capex 0: el flujo del
// accionista es el beneficio menos la retención para crecer, que se ve en el modelo bancario.
const DIVS = { 2021: 6267, 2022: 6706, 2023: 10348, 2024: 21314, 2025: 48299 };
const RECOMPRAS = { 2021: null, 2022: null, 2023: 689, 2024: 1775, 2025: 3085 };
const flujos = cuenta.map((c) => ({ periodo: c.periodo, flujo_operativo: c.beneficio_neto, capex: 0, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: DIVS[c.periodo], recompras: RECOMPRAS[c.periodo], emision_acciones: 0, intereses_en_financiacion: 0 }));

// Trimestres (BR GAAP gerencial) [1, 2, 10]: ingresos operativos y resultado recurrente; 3T25 y 4T25 sin ingresos en las
// fuentes leídas; resultado recurrente del 3T25 por diferencia (46,8 mil M del año − 1S25 − 4T25: estimación).
const trim = [
  { periodo: '1T25', ingresos: 44794, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(11128 / 11102), vs_consenso: null },
  { periodo: '2T25', ingresos: 45828, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.04, vs_consenso: null },
  { periodo: '3T25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(11864 / 11050), vs_consenso: null },
  { periodo: '4T25', ingresos: null, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: r2(12300 / 11027), vs_consenso: 'En línea' },
  { periodo: '1T26', ingresos: 46822, crecimiento_pct: r1(100 * (46822 / 44794 - 1)), crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.11, vs_consenso: 'Inferior' },
  { periodo: '2T26', ingresos: 47985, crecimiento_pct: r1(100 * (47985 / 45828 - 1)), crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.13, vs_consenso: 'En línea' },
];

const A = {
  _estado: 'Completa. Serie anual NIIF del 20-F (XBRL de la SEC: 2021-2025) adaptada al formato del motor; resultados recientes, ROE, capital y riesgo en BR GAAP gerencial (MD&A del 2T26). La herramienta cuentas.mjs --sec solo encontró la serie US GAAP antigua (2007-2010): el XBRL NIIF se leyó a mano.',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM dic-25 (NIIF)', fecha_fin: '2025-12-31', ingresos: 138947, ebitda: 48833, ebit: 48833, beneficio_neto: 44857, bpa: r2(44857 / ACC), dpa: 2.87, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Avenue (corredora en EE. UU.) consolidada desde el 1T26 tras tomar el control; NeoSpace (inteligencia artificial, 2.925 M) firmada el 26-oct-2026, pendiente de CADE y del Banco Central.' }],
    comentario: 'En NIIF (20-F), el beneficio atribuido pasó de 26.760 M BRL en 2021 a 44.857 M en 2025 (+14,1 % anual), con los ingresos operativos netos de pérdidas esperadas de 111.995 M a 138.947 M (+5,5 % anual) y los gastos no financieros de 62.549 M a 79.176 M (+6,1 %) [4, 5]. La mejora del beneficio no viene del crecimiento de la cartera sino del coste del crédito y de los impuestos: las pérdidas esperadas bajaron de 32.311 M en 2024 a 28.833 M en 2025 y el impuesto sobre beneficios efectivo cayó del 32,8 % de 2021 al 8,8 % de 2025, por el JCP deducible y por la cobertura de las inversiones en el exterior, que en NIIF se contabiliza fuera de la línea de impuestos [4, 5]. En gerencial (BR GAAP), la referencia del mercado, el resultado recurrente fue de 26.879 M en 2021, 30.786 M en 2022, 35.618 M en 2023, unos 41.400 M en 2024 y 46.800 M en 2025, con el ROE recurrente subiendo del 19,3 % al 23,4 % [7, 8, 10]. En el 1S26, 24.689 M (+9,1 %) y ROE del 24,5 % [1].',
    ajustes: 'Dos bases. Las cuentas oficiales del 20-F son NIIF; el banco gestiona y el mercado sigue el «resultado recurrente gerencial» en BR GAAP, que quita partidas extraordinarias (amortización de fondo de comercio, provisiones de reestructuración, contingencias fiscales y civiles) y reclasifica el efecto fiscal de la cobertura de las inversiones en el exterior. En el 2T26 el contable fue 12.181 M y el recurrente 12.407 M (−226 M de extraordinarios); en el 1S26, 24.119 M frente a 24.689 M, con 783 M de reestructuración en el 1T26 [1]. La diferencia entre NIIF y gerencial es pequeña en el año (2025: 44.857 M NIIF frente a 46.800 M recurrente) [4, 10]. El BPA de la regla a 12 meses es el recurrente gerencial; la cuenta del informe, la NIIF.',
    confianza: 'Alta',
  },
  trimestres: {
    items: trim,
    ultima_presentacion: 'En el 2T26 (4-ago-2026) el resultado recurrente fue de 12.407 M BRL (+1,0 % en el trimestre, +7,8 % interanual), con ROE del 24,3 %, en línea con el consenso de 13 bancos (12.466 M) [1, 2]. La cartera creció un 2,7 % en el trimestre hasta 1,52 billones, con consignado privado +14,3 % y vivienda +3,9 %; la morosidad a más de 90 días se quedó en el 1,9 % por sexto trimestre seguido, aunque la de 15-90 días subió 0,1 puntos al 1,8 % por las pymes tras el fin de las carencias de los programas públicos [1]. La dirección **rebajó la guía de comisiones y seguros** de +5,0-9,0 % a +2,0-5,0 % por la volatilidad del mercado de capitales y por el ajuste de los paquetes de tarifas; mantuvo el resto (cartera +5,5-9,5 %, margen con clientes +5,0-9,0 %, coste del crédito 38.500-43.500 M, gastos +1,5-5,5 %, tipo efectivo 29,5-32,5 %) [1, 11]. El CFO insistió en la calidad de la concesión frente a las renegociaciones (cartera renegociada 36.300 M, 2,6 % del total) y el CEO en la inteligencia artificial propia (ia.i) [2]. En el 1T26 el resultado había quedado un 2 % por debajo de lo esperado antes de impuestos por provisiones y comisiones [1].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'LCR medio del 2T26: 202,0 %; NSFR: 122,1 %; cartera sobre captación: 80,3 % [1]. Depósitos de clientes 1.114.482 M a dic-2025 [4].',
    rating: 'Grado especulativo, limitado por el techo soberano de Brasil (no se ha leído la nota vigente de las agencias: ver huecos)',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Capital: CET1 del 12,3 % en jun-2026 (13,1 % un año antes), Tier 1 del 13,8 % y Basilea del 15,4 %, 3,8 puntos por encima del mínimo con colchones; la dirección gestiona con un CET1 objetivo del 11,5 % (con él, el ROE del 1S26 habría sido del 25,1 %) [1]. A dic-2025, activos ponderados por riesgo de 1.505.475 M y CET1 de 185.595 M [4]. Provisiones para pérdidas esperadas de 56.900 M en jun-2026 (58 % fase 3); cobertura de la fase 3 del 53,8 % [1]. Activos fiscales diferidos de 75.410 M (37 % del patrimonio), que dependen de beneficios futuros y de la normativa fiscal [4]. Compromiso de pago aplazado de NeoSpace (2.925 M en total, parte a cinco años) [12].',
    comentario: 'Para un banco, el motor no tiene sentido en deuda neta, circulante ni capital invertido: se ponen caja y deuda a 0 y el «capital invertido» queda igual al patrimonio. El patrimonio NIIF atribuido bajó de 211.090 M a 204.501 M en 2025 porque el banco repartió 48.299 M (dividendos ordinarios, extraordinarios y JCP) y recompró 3.085 M, más que el beneficio [4]: devolvió el capital por encima del objetivo, y el CET1 bajó del 13,7 % al 12,3 % [4]. El activo crece un 8 % al año desde 2021 [4, 5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El estado de flujos de un banco no mide la caja del accionista: el flujo de explotación NIIF fue de 54.306 M en 2021, 129.633 M en 2022, 77.493 M en 2023, 7.069 M en 2024 y 34.466 M en 2025 porque mezcla depósitos, cartera y repos [4, 5]. Por eso el informe usa el beneficio atribuido como «flujo operativo» y capex 0; el flujo libre para el accionista es el beneficio menos la retención que exige el capital regulatorio para crecer, y eso se calcula en el modelo bancario. Dividendos y JCP pagados: 6.267 M (2021), 6.706 M (2022), 10.348 M (2023), 21.314 M (2024) y 48.299 M (2025, con extraordinarios); recompras de 689 M, 1.775 M y 3.085 M en 2023-2025 [4, 5]. Payout de 2025 sobre el recurrente: 72,0 % [3].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Auditores Independentes Ltda.', anios_auditor: null, opinion: 'Favorable (cuentas NIIF y control interno a 31-dic-2025)',
    comentario: 'PwC firmó sin salvedades las cuentas NIIF de 2025 y el control interno el 29-abr-2026 [3]. Los indicadores del motor (Altman Z, Piotroski F, Beneish M) están pensados para empresas no financieras y no se interpretan en un banco. Lo que importa es la calidad de la cartera y de las provisiones: morosidad a más de 90 días estable en el 1,9 % (2,8 % a dic-2023), coste del crédito estable en el 2,7 % de la cartera, provisiones de 56.900 M, cartera renegociada del 2,6 % y bajas del 0,7 % [1, 7]. Dos puntos de atención: (1) el tipo efectivo NIIF muy bajo (8,8 % en 2025) depende del JCP deducible, que el Gobierno ha intentado limitar, y de la cobertura cambiaria de las inversiones en el exterior; (2) los créditos fiscales diferidos (75.410 M) [4]. Ventas de cartera fallida en el 2T26 por 2.200 M con efecto de 30,9 M en el resultado: pequeño [1].',
    senales: [
      { senal: 'Tipo impositivo efectivo NIIF del 8,8 % en 2025 (32,8 % en 2021)', nivel: 'Media', comentario: 'Depende del JCP deducible y de la contabilidad de la cobertura del capital en el exterior; un cambio legal del JCP subiría el tipo [4].' },
      { senal: 'Activos fiscales diferidos de 75.410 M (37 % del patrimonio)', nivel: 'Baja', comentario: 'Habitual en la banca brasileña; se recuperan con beneficios futuros [4].' },
      { senal: 'Morosidad de 15-90 días de pymes al alza (1,5 %)', nivel: 'Baja', comentario: 'Normalización tras el fin de las carencias de los programas públicos; la total sigue en el 1,9 % [1].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Banca minorista (Varejo)', descripcion: 'Particulares, Uniclass, Personnalité, micro y pequeñas empresas: crédito personal, vivienda, consignado, tarjetas, adquirencia, seguros, previsión.', tipo_resultado: 'EBIT', historico: [{ periodo: '2T25', ingresos: 28361, resultado: 4941 }, { periodo: '1T26', ingresos: 29439, resultado: 5493 }, { periodo: '2T26', ingresos: 30243, resultado: 5491 }] },
      { nombre: 'Banca mayorista (Atacado)', descripcion: 'Grandes empresas y medianas, banca de inversión, gestión de activos y banca privada, operaciones de América Latina.', tipo_resultado: 'EBIT', historico: [{ periodo: '2T25', ingresos: 15138, resultado: 5392 }, { periodo: '1T26', ingresos: 15094, resultado: 5646 }, { periodo: '2T26', ingresos: 15225, resultado: 5614 }] },
      { nombre: 'Mercado y corporación', descripcion: 'Tesorería, capital propio no asignado y gastos corporativos.', tipo_resultado: 'EBIT', historico: [{ periodo: '2T25', ingresos: 2330, resultado: 1175 }, { periodo: '1T26', ingresos: 2289, resultado: 1143 }, { periodo: '2T26', ingresos: 2517, resultado: 1302 }] },
    ],
    geografias: [{ nombre: 'Brasil (con unidades en el exterior fuera de América Latina)', peso_pct: 92.2 }, { nombre: 'América Latina (Chile, Colombia, Uruguay, Paraguay, Argentina)', peso_pct: 7.8 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Cartera de crédito con garantías y títulos privados (miles de millones BRL)', valor_anterior: '1.389 (jun-25)', valor_actual: '1.522 (jun-26)', variacion: '+9,6 %', comentario: 'Guía 2026: +5,5-9,5 % [1].' },
      { kpi: 'ROE recurrente', valor_anterior: '23,3 % (2T25)', valor_actual: '24,3 % (2T26)', variacion: '+1,0 p.p.', comentario: 'Brasil 25,7 %; América Latina 12,3 % [1].' },
      { kpi: 'Morosidad > 90 días', valor_anterior: '1,9 % (jun-25)', valor_actual: '1,9 % (jun-26)', variacion: 'estable', comentario: 'Particulares en Brasil 3,7 %; pymes 1,5 % [1].' },
      { kpi: 'Margen con clientes (anualizado, consolidado)', valor_anterior: '9,4 % (2T25)', valor_actual: '9,1 % (2T26)', variacion: '−0,3 p.p.', comentario: 'Ajustado por riesgo 6,2 %; Brasil 10,0 % [1].' },
      { kpi: 'Coste del crédito sobre cartera', valor_anterior: '2,7 % (2T25)', valor_actual: '2,7 % (2T26)', variacion: 'estable', comentario: '10.139 M en el trimestre [1].' },
      { kpi: 'Índice de eficiencia', valor_anterior: '38,0 % (2T25)', valor_actual: '37,4 % (2T26)', variacion: '−0,6 p.p.', comentario: 'Brasil 35,5 % [1, 2].' },
      { kpi: 'CET1', valor_anterior: '13,1 % (jun-25)', valor_actual: '12,3 % (jun-26)', variacion: '−0,8 p.p.', comentario: 'Objetivo de gestión 11,5 % [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'trimestres', campo: 'ingresos del 3T25 y 4T25 y BPA de 8 trimestres', tipo: 'Complemento', intentos: '1) MD&A del 2T26 (solo 2T26, 1T26 y 2T25); 2) nota de prensa del 4T25 en la web de RI (403); 3) NeoFeed y prensa (solo el resultado del 4T25)', decision: 'Omitido; el resultado del 3T25 se deriva y se marca como estimación' },
    { seccion: 'balance', campo: 'vencimientos y coste de la financiación', tipo: 'Complemento', intentos: '1) MD&A 2T26 (no los da en ese formato); 2) 20-F 2025 (notas de captación por plazo, no comparables con el motor); 3) no aplica a un banco', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Sistema Gerenciador de Séries Temporais, serie 20539: saldo de las operaciones de crédito del sistema financiero', editor: 'Banco Central do Brasil', tipo: 'Sectorial', fecha: '2026-10-27', url: 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.20539/dados?formato=json' },
  { id: 2, titulo: 'Management Discussion & Analysis 2T26', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-07', url: `${ED}/000113259726000223/managementdiscussionanal.htm` },
  { id: 3, titulo: 'Form 20-F 2025: historia, regulación (CMN, BCB, depósitos obligatorios, JCP), competencia', editor: 'Itaú Unibanco Holding S.A. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000113259726000132/itub-20251231.htm` },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los bancos comparables (capitalización, ROE, P/VC, PER adelantado), 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/ITUB/' },
  { id: 5, titulo: 'Expectativas de mercado (Focus): IPCA y Selic 2026-2030, 23-oct-2026', editor: 'Banco Central do Brasil', tipo: 'Sectorial', fecha: '2026-10-23', url: 'https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais' },
  { id: 6, titulo: 'Material Fact: acquisition of all shares issued by NeoSpace (2.925 M BRL)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-26', url: `${ED}/000113259726000245/materialfact_neospace.htm` },
];
const credito = { 2019: 3475816, 2020: 4021333, 2021: 4682852, 2022: 5366069, 2023: 5805157, 2024: 6464602, 2025: 7137252 };
const yb = (t) => Y[t];
const BBDC = yb('BBDC4.SA'), SANB = yb('SANB11.SA'), BBAS = yb('BBAS3.SA'), BTG = yb('BPAC11.SA'), NU = yb('NU');
const Bn = {
  _estado: 'Completa con huecos de cuota. Mercado = crédito del sistema financiero brasileño (BCB); competidores con datos de mercado de Yahoo.',
  historia: {
    resumen: 'Itaú Unibanco nace en 2008 de la fusión de Banco Itaú (fundado en 1945, de las familias Setubal y Villela) y Unibanco (1924, de la familia Moreira Salles). El control lo ejerce IUPAR, sociedad conjunta de Itaúsa y de Cia. E. Johnston (Moreira Salles), con el 51,71 % de las acciones ordinarias y el 26,35 % del capital [3]. Desde entonces ha comprado CorpBanca en Chile (2016, Itaú CorpBanca), una parte de XP (2017, luego escindida a los accionistas) y el control de Avenue (consolidada en 2026), y ha cerrado parte de su red de oficinas (2.210 a jun-2026, frente a 2.738 un año antes) para pasar a lo digital [2, 3]. Milton Maluhy Filho es consejero delegado desde 2021 [3].',
    hitos: [
      { anio: '1945', hito: 'Fundación del Banco Central de Crédito, origen de Banco Itaú [3].' },
      { anio: '2008', hito: 'Fusión de Itaú y Unibanco; IUPAR pasa a controlar el grupo [3].' },
      { anio: '2016', hito: 'Fusión de Banco Itaú Chile con CorpBanca (Itaú CorpBanca) [3].' },
      { anio: '2021', hito: 'Milton Maluhy Filho, consejero delegado; escisión de la participación en XP [3].' },
      { anio: '2025', hito: 'Bonificaciones de acciones del 10 % (marzo) y del 3 % (diciembre); payout del 72 % con dividendos extraordinarios [3].' },
      { anio: '2026', hito: 'Control de Avenue (1T26); lanzamiento del asistente de IA «ia.i»; compra de NeoSpace por 2.925 M (26-oct) [2, 6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Mayor banco privado de América Latina por activos (3,23 billones BRL a jun-2026) y por cartera de crédito (1,52 billones con garantías y títulos privados) [2]. Opera banca minorista (particulares por segmentos de renta, micro y pequeñas empresas), mayorista (grandes empresas, banca de inversión, gestión de activos, banca privada) y seguros y previsión, en Brasil (94,6 % del resultado del 2T26) y en Chile, Colombia, Uruguay, Paraguay y Argentina [2]. Tiene 90.429 empleados, 2.210 oficinas y 11.822 cajeros [2].',
    como_gana_dinero: 'El 70 % de los ingresos operativos del 2T26 es margen financiero (33.488 M de 47.985 M): 32.557 M con clientes (diferencial entre lo que cobra por los créditos y lo que paga por la captación, más la remuneración del capital propio a tipos de mercado) y 931 M de tesorería [2]. Comisiones (11.028 M) y seguros (3.469 M) son el 30 % restante [2]. Del margen se restan el coste del crédito (10.139 M, 2,7 % de la cartera) y los gastos (16.728 M; eficiencia del 37,4 %) [2]. Es sensible a la Selic por dos vías: el capital propio y los depósitos a la vista ganan más con tipos altos, pero el coste del riesgo sube con ellos, con un desfase de varios trimestres [2].',
    clientes: 'Base muy dispersa: ningún cliente relevante en el total. La cartera de jun-2026 es un 40 % de particulares en Brasil (613.900 M en banca minorista con pymes), grandes empresas y títulos privados en mayorista y un 14 % en América Latina [2]. Poder de precio: el margen con clientes ajustado por riesgo en Brasil (6,7 %) está por encima del de sus rivales privados y el ROE de Brasil (25,7 %) lo confirma; el límite es la regulación (tope de intereses de las tarjetas desde 2024, Desenrola) y la competencia de Nubank en tarjetas y cuentas [2].',
  },
  sector: {
    definicion: 'El mercado relevante es el crédito del sistema financiero de Brasil (saldo total de las operaciones de crédito, recursos libres y dirigidos, personas y empresas), donde se genera más del 90 % del resultado de Itaú [1, 2]. No se incluyen América Latina ni los seguros. La cuota de Itaú no se puede calcular con el mismo perímetro: su cartera incluye garantías prestadas y títulos privados que no están en la serie del BCB.',
    tamano: '≈ 7,40 billones BRL de crédito en ago-2026 (7,14 billones a dic-2025) [1]',
    unidad_serie: 'miles de millones de BRL', serie: Object.entries(credito).map(([a, v]) => ({ anio: a, tamano: Math.round(v / 1000) })),
    tcac_historico_pct: r1(100 * ((credito[2025] / credito[2020]) ** (1 / 5) - 1)), tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tipo de interés (Selic)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Selic del 13,75 % el 27-oct-2026; el Focus del 23-oct la veía en 13,25 % a fin de 2026 y 11,75 % en 2027, antes del giro del mercado tras las elecciones [1, 5].' },
      { driver: 'Política fiscal y prima de riesgo', efecto: '−', horizonte: 'Cíclico', evidencia: 'El bono a 10 años subió del 12,98 % al 15,44 % el 26-oct tras la reelección de Lula [5].' },
      { driver: 'Crecimiento del crédito', efecto: '+', horizonte: 'Estructural', evidencia: 'El crédito del sistema crece un 12,2 % anual desde 2020 [1].' },
      { driver: 'Digitalización e IA', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Itaú cerró 528 oficinas en un año y compra NeoSpace; Nubank compite con coste por cliente muy bajo [2, 6].' },
      { driver: 'Regulación de tarifas y del crédito rotativo', efecto: '−', horizonte: 'Estructural', evidencia: 'Ajuste de los paquetes de tarifas y rebaja de la guía de comisiones en el 2T26 [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Cinco grandes (Itaú, BB, Bradesco, Caixa, Santander) más Nubank, BTG e Inter; Itaú gana más que todos con ROE del 24 % frente al 11-14 % de Bradesco y Santander Brasil [2, 4].' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Clientes dispersos; el Pix y la portabilidad bajan los costes de cambio, pero la vinculación (nómina, inversión) sigue pesando.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'La materia prima es la captación: depósitos estables de 1,13 billones, con coste ligado al CDI [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Bancos digitales con licencia (Nubank, con ROE del 32 %) y fintech de pagos; la escala de capital y el riesgo de crédito siguen siendo barrera [4].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Mercado de capitales (debentures) para grandes empresas y crédito de fintech para particulares.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'La morosidad del sistema y de Itaú está en mínimos (1,9 % a más de 90 días) con la Selic al 13,75 %: el ciclo de crédito está maduro y la morosidad de pymes empieza a subir [1, 2]. En 2015-2016 (recesión) y en 2020 (pandemia) el ROE de Itaú cayó al 14,5 % (2020) y el banco siguió ganando dinero; en 2022-2023, con la Selic al 13,75 %, mantuvo el 20-21 % [4, 5 de la nota A].' },
    regulacion: 'Banco Central y Consejo Monetario Nacional fijan capital (Basilea III con colchones; CET1 mínimo con colchones ≈ 8-9,5 %), depósitos obligatorios y la contabilidad de pérdidas esperadas (Resolución 4.966, desde 2025) [3]. Asuntos abiertos con efecto en cifras: la deducibilidad del JCP (intereses sobre capital propio), que el Gobierno de Lula intentó limitar en 2025; los topes de intereses del crédito rotativo de tarjetas; y la posible subida de impuestos a la banca para cuadrar las cuentas públicas tras las elecciones de 2026 [3].',
    tendencias: 'Tres cambios: (1) Pix y open finance bajan los ingresos por tarifas y la vinculación (la guía de comisiones de 2026 pasó a +2-5 %) [2]; (2) la inteligencia artificial permite bajar costes (eficiencia del 35,5 % en Brasil) y mejorar el crédito; Itaú compra NeoSpace, que ya le entrenaba modelos con sus datos [2, 6]; (3) los bancos digitales ganan clientes de renta baja, donde Itaú se ha retirado en parte. Itaú gana con (2) y pierde algo con (1) y (3).',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null, posicion: '1.º banco privado de Brasil y de América Latina por activos y cartera; 2.º-3.º del sistema tras Banco do Brasil y Caixa (públicos) [2, 3].',
    competidores: [
      { nombre: 'Banco do Brasil', pais: 'Brasil', ticker: 'BBAS3', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Público, líder en agro; ROE ${r1(100 * BBAS.roe)} % y P/VC ${r2(BBAS.p_vc)}x; cayó un 27 % el 26-oct [4].` },
      { nombre: 'Bradesco', pais: 'Brasil', ticker: 'BBDC4', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Segundo privado, en reestructuración; ROE ${r1(100 * BBDC.roe)} %, P/VC ${r2(BBDC.p_vc)}x [4].` },
      { nombre: 'Santander Brasil', pais: 'Brasil', ticker: 'SANB11', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `ROE ${r1(100 * SANB.roe)} %, P/VC ${r2(SANB.p_vc)}x [4].` },
      { nombre: 'BTG Pactual', pais: 'Brasil', ticker: 'BPAC11', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Banca de inversión y patrimonios; ROE ${r1(100 * BTG.roe)} %, P/VC ${r2(BTG.p_vc)}x [4].` },
      { nombre: 'Nubank (Nu Holdings)', pais: 'Brasil/Islas Caimán', ticker: 'NU', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Banco digital con más de 100 M de clientes; ROE ${r1(100 * NU.roe)} %, P/VC ${r2(NU.p_vc)}x [4].` },
      { nombre: 'Caixa Econômica Federal', pais: 'Brasil', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Pública, no cotiza; líder en vivienda.' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Adquirencia y pagos con red propia, pero el Pix ha reducido la ventaja.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Nómina, inversión y crédito vinculados; renegociada solo el 2,6 % de la cartera [2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Marca de banco privado más valiosa de Brasil y licencias bancarias en seis países [3].' },
        { fuente: 'Ventaja en costes', puntuacion: 4, evidencia: 'Eficiencia del 37,4 % (Brasil 35,5 %), frente a más del 45 % en Bradesco y Santander Brasil (estimación sobre sus informes, no leídos aquí) [2].' },
        { fuente: 'Escala eficiente', puntuacion: 4, evidencia: 'Mayor cartera privada (1,52 billones) y ROE del 24 % sostenido diez años salvo 2020 [2].' },
      ],
    },
    amenazas: 'Lo que más erosionaría el foso: una subida de impuestos a la banca (JCP o CSLL) que baje el ROE de todos (probabilidad media tras la reelección), la competencia de Nubank en particulares de renta media (alta y gradual) y un tope a los intereses y tarifas (media). Ninguna rompe la ventaja de coste y de crédito de Itaú; todas bajan el nivel del ROE del sector.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'S&P Global (Dow Jones Sustainability Index World)', calificacion: 'Incluida por 24.º año seguido (2024)', fecha: '2024-02' }],
    materialidad: 'Lo material es la gestión del riesgo de crédito con criterios climáticos (agro, energía) y la inclusión financiera; el banco declara métricas de riesgo social, ambiental y climático en su marco de apetito de riesgo [3]. No se ha encontrado una cifra que mueva la valoración.',
    controversias: 'Sin sanciones relevantes localizadas en los últimos tres años en las fuentes leídas (20-F 2025, MD&A); el 20-F detalla contingencias fiscales y civiles que el banco provisiona y que en el 1T26 dieron un ajuste extraordinario de +667 M en el resultado gerencial [3].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'competencia', campo: 'cuota de mercado e ingresos y margen de los competidores', tipo: 'Complemento', intentos: '1) serie del BCB (no separa por banco); 2) MD&A de Itaú (cartera con garantías y títulos privados, perímetro distinto); 3) informes de los rivales (fuera de presupuesto; el margen EBIT no aplica a un banco)', decision: 'Omitido' },
    { seccion: 'sector', campo: 'crecimiento previsto del crédito y CR5', tipo: 'Complemento', intentos: '1) BCB (sin previsión oficial); 2) Febraban (no consultada a tiempo); 3) Relatório de Economia Bancária (no leído)', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Form 20-F 2025: Item 6 (consejo, comité ejecutivo, remuneración), Item 7 (IUPAR), Item 16G', editor: 'Itaú Unibanco Holding S.A. (SEC)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000113259726000132/itub-20251231.htm` },
  { id: 2, titulo: 'Material Fact: Stock Buyback Program (hasta 200 M de preferentes, feb-2026 a ago-2027)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000113259726000054/materialfact_stockbuybac.htm` },
  { id: 3, titulo: 'Resultados del 4T23 (guía 2023 frente a lo logrado) y MD&A 2T26 (guía 2026)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-07', url: `${ED}/000113259726000223/managementdiscussionanal.htm` },
  { id: 4, titulo: 'Itaú bate R$ 46,8 bilhões de lucro anual (guía 2026 publicada en feb-2026)', editor: 'NeoFeed', tipo: 'Prensa', fecha: '2026-02-05', url: 'https://neofeed.com.br/negocios/itau-bate-r-468-bilhoes-de-lucro-anual-e-atinge-o-maior-resultado-da-historia-de-um-banco-brasileiro/en/' },
];
const C = {
  _estado: 'Completa con huecos de votos y de operaciones de directivos (emisor extranjero: sin Form 4).',
  directivos: {
    equipo: [
      { nombre: 'Milton Maluhy Filho', cargo: 'Consejero delegado (CEO)', desde: '2021', participacion_pct: null, trayectoria: 'En el grupo desde 2002; vicepresidente de finanzas y riesgos (2019-2020) y consejero delegado de Itaú CorpBanca (2016-2018), donde hizo la fusión con CorpBanca. Con él, el ROE recurrente pasó del 19,3 % (2021) al 23,4 % (2025) [1, 3].' },
      { nombre: 'Gabriel Amado de Moura', cargo: 'Director financiero (CFO)', desde: '2024', participacion_pct: null, trayectoria: 'En el grupo desde 2000; director financiero y luego consejero delegado de Banco Itaú Chile (2016-2024) [1].' },
      { nombre: 'Pedro Moreira Salles', cargo: 'Copresidente no ejecutivo', desde: '2009', participacion_pct: null, trayectoria: 'Presidente de Unibanco (1997-2004) y su consejero delegado (2004-2008); presidente de IUPAR y de Cia. E. Johnston [1].' },
      { nombre: 'Roberto Egydio Setubal', cargo: 'Copresidente no ejecutivo', desde: '2017', participacion_pct: null, trayectoria: 'Consejero delegado de Banco Itaú (1994-2008) y de Itaú Unibanco (2008-2017); vicepresidente de Itaúsa [1].' },
      { nombre: 'André Luís Teixeira Rodrigues', cargo: 'Vicepresidente ejecutivo (banca minorista)', desde: '2005', participacion_pct: null, trayectoria: 'Director desde 2005 y socio del Programa de Socios desde 2010 [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Cartera +4,5-8,5 %; margen con clientes, coste del crédito y gastos dentro de rangos (publicada en feb-2025)', real: 'Cartera 1,49 billones (+6 %); resultado recurrente 46.800 M (+13,1 %)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Comisiones y seguros +5,0-9,0 % (feb-2026)', real: 'Rebajada a +2,0-5,0 % el 4-ago-2026; el resto se mantiene', cumplida: 'Parcial' },
      { anio: '2023', guia: 'Rangos de cartera, margen, coste del crédito y gastos (feb-2023)', real: 'Resultado recurrente 35.618 M (+15,7 %), eficiencia 39,9 %, mínimo histórico', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable y formado dentro del grupo (Programa de Socios): el consejero delegado y el director financiero vienen de dirigir Itaú Chile. La guía anual es de rangos amplios y se cumple casi siempre; en 2026 solo se ha rebajado la de comisiones y seguros [1, 3, 4]. Sucesión: no hay cambio anunciado; el consejero delegado lleva cinco años.',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Pedro Moreira Salles', cargo: 'Copresidente', tipo: 'Dominical', desde: '2009', comisiones: 'Nombramientos y gobierno, personas' },
      { nombre: 'Roberto Egydio Setubal', cargo: 'Copresidente', tipo: 'Dominical', desde: '2017', comisiones: 'Estrategia, personas' },
      { nombre: 'Ricardo Villela Marino', cargo: 'Vicepresidente', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Alfredo Egydio Setubal', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'João Moreira Salles', cargo: 'Consejero', tipo: 'Dominical', desde: null, comisiones: null },
      { nombre: 'Candido Botelho Bracher', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Cesar Nivaldo Gon', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Fabricio Bloisi Rocha', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Marcos Marinho Lutz', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Maria Helena dos Santos Fernandes de Santana', cargo: 'Consejera', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Paulo Antunes Veras', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
      { nombre: 'Pedro Luiz Bodin de Moraes', cargo: 'Consejero', tipo: 'Independiente', desde: null, comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: false,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'Política de la normativa bancaria brasileña: al menos el 50 % del variable en acciones o instrumentos ligados a ellas y al menos el 40 % diferido tres años, con «malus» si cae el resultado recurrente y «clawback» [1]. En 2025 el consejo (13 miembros) cobró 50,2 M BRL y los 48 miembros del comité de dirección 812,9 M en conjunto; el 20-F no da el desglose del consejero delegado [1]. El variable depende del resultado recurrente y de la creación de valor (resultado sobre el coste del capital), que es la métrica correcta para un banco [1].',
    accionistas: [
      { nombre: 'IUPAR (Itaúsa y Cia. E. Johnston / familias Setubal, Villela y Moreira Salles)', pct: 26.35, tipo: 'Control (51,71 % de las ordinarias)', variacion: 'Estable; dato a 31-dic-2025 [1]' },
      { nombre: 'Itaúsa (directo, además de IUPAR)', pct: null, tipo: 'Control', variacion: 'n.d.' },
      { nombre: 'Flotante (preferentes ITUB4 y ADR ITUB)', pct: null, tipo: 'Institucional y particulares', variacion: '—' },
    ],
    insiders: [],
    control_y_defensas: 'Itaú tiene dos clases: ordinarias con voto (ITUB3), de las que IUPAR tiene el 51,71 %, y preferentes sin voto (ITUB4, base del ADR), que reciben al menos el dividendo mínimo y tienen derecho de venta conjunta del 80 % en un cambio de control por estar en el Nivel 1 / con las protecciones del Nivel 2 de B3 que el 20-F describe [1]. El accionista del ADR no vota. El control familiar garantiza estabilidad y una cultura de capital prudente; el riesgo es que sus intereses (Itaúsa necesita dividendos) pesen en el payout. El consejo tiene 7 independientes de 13 (53,8 %) aunque la NYSE no lo exige a una sociedad controlada [1]. Programa de recompra de hasta 200 M de preferentes hasta ago-2027 [2].',
    alertas: ['Doble clase: el ADR (preferente) no tiene voto; el control lo tiene IUPAR con el 26,35 % del capital [1].', 'Los copresidentes son de las familias de control [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'votos de la junta sobre remuneración y remuneración individual del consejero delegado', tipo: 'Complemento', intentos: '1) 20-F 2025 (solo totales del consejo y de la dirección); 2) actas resumidas de la junta en 6-K (no traen el porcentaje); 3) Formulário de Referência 2025 (6-K del 6-ago-2026, no leído por tiempo)', decision: 'Omitido' },
    { seccion: 'gobierno', campo: 'operaciones de directivos de 12 meses', tipo: 'Complemento', intentos: '1) Form 4 (no aplica a un emisor extranjero); 2) informes mensuales de la CVM (art. 11, no leídos); 3) prensa (sin noticias de compras o ventas relevantes)', decision: 'Omitido' },
  ],
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (ITUB, EWZ, BBD; ITUB4.SA, ^BVSP) hasta el 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/ITUB/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary (precio, consenso, objetivos, P/VC, ROE) de ITUB, ITUB4.SA y comparables, 26-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://finance.yahoo.com/quote/ITUB4.SA/analysis/' },
  { id: 3, titulo: 'Brazil 10-Year Bond Yield (15,44 % el 26-oct-2026, +2,46 puntos)', editor: 'Trading Economics', tipo: 'Datos de mercado', fecha: '2026-10-27', url: 'https://tradingeconomics.com/brazil/government-bond-yield' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Ibovespa: caída del 13,7 % el 26-oct-2026 (Itaú −13,2 %, Bradesco −21,2 %, Banco do Brasil −27,3 %)', editor: 'Trading Economics', tipo: 'Prensa', fecha: '2026-10-27', url: 'https://tradingeconomics.com/brazil/stock-market' },
  { id: 6, titulo: 'Brazilian Assets Sold Off: Brazil ETFs Drop Over 27% as Lula’s Re-Election Shatters Fiscal Consolidation Expectations', editor: 'TradingKey', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.tradingkey.com/analysis/stocks/us-stocks/262239407-brazil-assets-selloff-lula-reelection-etf-banks-oil-stocks-tradingkey' },
  { id: 7, titulo: 'Cotação PTAX do dólar (5,5007 BRL el 26-oct-2026)', editor: 'Banco Central do Brasil', tipo: 'Datos de mercado', fecha: '2026-10-26', url: 'https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/' },
  { id: 8, titulo: 'Itaú (ITUB4): ação cai mais de 10 % desde máximas e analistas veem janela (objetivos de BTG, XP, Bradesco BBI, Genial y BofA)', editor: 'Money Times', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://www.moneytimes.com.br/itau-itub4-acao-cai-mais-10-desde-maximas-e-analistas-veem-janela-veja-potencial-rnda/' },
  { id: 9, titulo: 'Lula ou Flávio Bolsonaro? (Santander: Itaú, «la alternativa defensiva más natural», objetivo 51 BRL)', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://www.seudinheiro.com/2026/empresas/lula-ou-flavio-bolsonaro-veja-a-acao-que-pode-blindar-seus-investimentos-no-segundo-turno-davs/' },
  { id: 10, titulo: 'Temporada de balanços do 3T26: Itaú publica el 3-nov tras el cierre y conferencia el 4-nov a las 10:00', editor: 'Seu Dinheiro', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://www.seudinheiro.com/2026/economia/temporada-de-balancos-do-3t26-bate-a-porta-veja-as-datas-das-divulgacoes-e-das-teleconferencias-davs/' },
  { id: 11, titulo: 'Material Fact: acquisition of all shares issued by NeoSpace', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-26', url: `${ED}/000113259726000245/a6-k_itubx10262026.htm` },
  { id: 12, titulo: 'Management Discussion & Analysis 2T26 (acciones, VC por acción, capitalización)', editor: 'Itaú Unibanco Holding S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-07', url: `${ED}/000113259726000223/managementdiscussionanal.htm` },
  { id: 13, titulo: 'Expectativas de mercado (Focus) del 23-oct-2026', editor: 'Banco Central do Brasil', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://olinda.bcb.gov.br/olinda/servico/Expectativas/versao/v1/odata/ExpectativasMercadoAnuais' },
];
const it = Y['ITUB4.SA'], adr = Y.ITUB;
const comp = (nombre, t, pais, conv = 1) => {
  const q = Y[t];
  return { nombre, ticker: t, pais, capitalizacion: Math.round(q.cap / 1e6 * conv), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: r1(q.per_adelantado), crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: r1(100 * q.roe), dn_ebitda: null, fcf_yield_pct: null };
};
const empresasComp = [
  comp('Bradesco', 'BBDC4.SA', 'BR'), comp('Santander Brasil', 'SANB11.SA', 'BR'), comp('Banco do Brasil', 'BBAS3.SA', 'BR'), comp('BTG Pactual', 'BPAC11.SA', 'BR'),
  comp('Nu Holdings', 'NU', 'BR', TC), comp('Credicorp', 'BAP', 'PE', TC), comp('Banco de Chile', 'BCH', 'CL', TC), comp('Banco Santander Chile', 'BSAC', 'CL', TC), comp('Bancolombia', 'CIB', 'CO', TC),
];
const cierresB3 = lee('bolsa-b3.json').cierres_ejercicio;
const mov = { fecha: '2026-10-26', var_1m_pct: -5.1, var_3m_pct: -7.3, var_6m_pct: -12.5, var_12m_pct: 11.7, dist_max_52s_pct: -24.2, dist_min_52s_pct: 12.7, dist_max_historico_pct: -24.2, tendencia: 'lateral', volatilidad_60d_pct: 64, avisos: ['P3 Caída fuerte (−20,4 % el 26-oct-2026)'] };
const D = {
  _estado: 'Completa. Precio = ADR ITUB en NYSE al cierre del 26-oct-2026 (7,70 USD) convertido a BRL; consenso de Yahoo (10 analistas en B3); comparables bancarios con P/VC, PER y ROE.',
  identificacion: {
    nombre: 'Itaú Unibanco Holding S.A.', nombre_corto: 'Itaú Unibanco', ticker: 'ITUB', isin: 'US4655621062', mercado: 'NYSE (ADR, 1 ADR = 1 preferente ITUB4); principal: B3 (ITUB4)', indice_referencia: 'Ibovespa / MSCI Brazil (EWZ)',
    pais: 'Brasil', pais_iso: 'BR', sector: 'Financials', industria: 'Banks', sede: 'São Paulo', fundacion: '1945', empleados: 90429, web: 'https://www.itau.com.br/relacoes-com-investidores',
    precio: r2(7.70 * TC), fecha_precio: '2026-10-26', acciones: 11022, capitalizacion_publicada: Math.round(it.cap / 1e6), free_float_pct: null,
    max_52s: 50.85, min_52s: 37.08, volumen_medio_diario: '≈ 251 M USD/día en el ADR y ≈ 1.284 M BRL/día en ITUB4 (3 meses)', proximos_resultados: '2026-11-03',
  },
  consenso: {
    guidance: 'Previsiones 2026 (publicadas el 5-feb-2026, revisadas el 4-ago-2026): cartera total +5,5-9,5 % y en Brasil +6,5-10,5 %; margen con clientes +5,0-9,0 %; margen con el mercado 2.500-5.500 M; coste del crédito 38.500-43.500 M; comisiones y seguros +2,0-5,0 % (antes +5,0-9,0 %); gastos no financieros +1,5-5,5 %; tipo efectivo 29,5-32,5 % [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(it.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(it.trend[2].bpa), dpa: null, fuente: `Yahoo Finance, ${it.trend[2].n} analistas, 26-oct-2026; BPA recurrente gerencial [2]` },
      { periodo: '2027e', ingresos: Math.round(it.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(it.trend[3].bpa), dpa: null, fuente: `Yahoo Finance, ${it.trend[3].n} analistas, 26-oct-2026 [2]` },
    ],
    recomendaciones: { n_analistas: 13, comprar: 10, mantener: 3, vender: 0, po_medio: r2(it.po_medio), po_min: it.po_min, po_max: it.po_max },
    revisiones: `El BPA de 2027 del consenso baja de ${r2(it.trend[3].bpa_hace90)} BRL hace 90 días a ${r2(it.trend[3].bpa)} (−1,9 %) y el de 2026 de ${r2(it.trend[2].bpa_hace90)} a ${r2(it.trend[2].bpa)} [2]. Las cifras de Yahoo son anteriores a la reacción de los analistas a las elecciones del 25-oct: lo probable es que suban el Ke y bajen los objetivos más que el BPA. En mayo, tras el 1T26, BTG (52), XP (51), Genial (53), BofA (50) y Bradesco BBI (45) mantenían objetivos de 45-53 BRL [8]; Santander, 51 BRL el 5-oct [9]. En el ADR, 8 analistas con objetivo medio de ${r2(adr.po_medio)} USD [2].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'En dólares y con dividendos, el ADR ganó un 23,3 % anual a 5 años frente al 10,5 % del EWZ y al 2,2 % del ADR de Bradesco [1]: el mercado ha premiado el ROE de Itaú frente al resto de la banca brasileña. 2025 fue un año excepcional (+85,7 % en USD) por la caída de la Selic esperada y la apreciación del real. El 6-oct-2026, tras la primera vuelta en la que Flávio Bolsonaro quedó por delante, el ADR subió un 24,5 % en el mes hasta el máximo de 10,20 USD; el 26-oct, tras la victoria de Lula en la segunda vuelta, cayó un 20,4 % en el día (7,70 USD), suma de −13,2 % de la preferente en B3 y −7 % del real [1, 5].',
    contexto: {
      movimiento: mov,
      movimientos_fuertes: [
        { periodo: '26-oct-2026', var_pct: -20.4, causa: 'Reelección de Lula frente a Flávio Bolsonaro (51,78 % de los votos): el mercado deshace la apuesta por un ajuste fiscal; el bono a 10 años en reales sube del 12,98 % al 15,44 %, el real cae ≈ 7-9 %, el Ibovespa −13,7 % y la preferente de Itaú −13,2 % (Bradesco −21,2 %, BB −27,3 %); en preapertura el ADR llegó a caer más del 26 % [3, 5, 6].', veredicto: 'retrasa', condicion: 'Hasta que el nuevo Gobierno nombre ministro de Hacienda y presente el marco fiscal y el presupuesto de 2027, o hasta que el ADR baje del límite de compra de la regla (no se alcanza hoy: la calidad no pasa).' },
        { periodo: 'sep-oct 2026 (6-oct, +24,5 % en el mes)', var_pct: 24.5, causa: 'Primera vuelta del 4-oct: Flávio Bolsonaro supera a Lula contra las encuestas y los bancos brasileños lideran las subidas de la semana [1, 9].', veredicto: 'no cambia', condicion: null },
        { periodo: 'abr-may 2026 (−17,2 % en un mes al 19-may)', var_pct: -17.2, causa: 'Resultado del 1T26 un 2 % por debajo de lo esperado antes de impuestos (provisiones y comisiones) y caída del Ibovespa de 200.000 a 187.000 puntos [8].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-26', tipo: 'fusión u oferta', hecho: 'Compra de NeoSpace (modelos de IA entrenados con datos de Itaú) por 2.925 M BRL, parte aplazada a cinco años; pendiente de CADE y del Banco Central. Supone ≈ 0,27 BRL por acción y el 1,4 % del patrimonio [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-26', tipo: 'demanda o regulador', hecho: 'El Tesoro cancela las subastas de bonos fijos y ligados a la inflación del 27 y 29-oct; se reabre el debate fiscal (déficit primario, deuda pública) [3].', veredicto: 'retrasa', condicion: 'Marco fiscal del nuevo mandato.' },
        { fecha: '2026-10-05', tipo: 'recomendación', hecho: 'Santander elige a Itaú como banco preferido, «la alternativa defensiva más natural», con objetivo de 51 BRL [9].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-04', tipo: 'resultados', hecho: '2T26 en línea (12.407 M, ROE 24,3 %); rebaja de la guía de comisiones y seguros a +2-5 % [12].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-03', tipo: 'resultados', hecho: 'Resultados del 3T26 tras el cierre de B3; conferencia el 4-nov a las 10:00 [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-02-04', tipo: 'accionista de referencia', hecho: 'Nuevo programa de recompra de hasta 200 M de preferentes hasta el 4-ago-2027 (≈ 1,8 % de las acciones) [12].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-03',
      veredicto: 'retrasa',
      condicion: 'Hasta conocer el marco fiscal del nuevo mandato (ministro de Hacienda, presupuesto de 2027, tratamiento del JCP y de los impuestos a la banca). No cambia la conclusión de hoy, que ya es «no comprar» por calidad y por precio.',
      comentario: 'El −20,4 % del ADR del 26-oct no viene del negocio de Itaú sino de la prima de riesgo de Brasil: el bono a 10 años en reales sube 2,46 puntos y el real se deprecia [3, 5]. Para Itaú cambian tres cosas: (1) el coste del capital en reales sube 2,5 puntos (Ke del 19,0 % al 21,5 %); (2) la Selic baja más tarde de lo que el Focus esperaba (13,25 % a fin de 2026 y 11,75 % en 2027 antes de las elecciones [13]), lo que sostiene el margen del capital propio pero retrasa la bajada del coste del riesgo; (3) sube el riesgo de impuestos a la banca (JCP, CSLL). El veredicto es «retrasa» por el hecho pendiente con fecha (marco fiscal del nuevo Gobierno), aunque la señal ya es «no comprar». Los resultados del 3-nov no aplazan nada (regla 11).',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: cierresB3.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: r2(c.precio_cierre), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de la preferente ITUB4 en BRL (Yahoo, ajustado por las bonificaciones) [1]. El PER del motor se calcula con el BPA NIIF; la historia que decide la regla a 12 meses es la del PER adelantado con el BPA recurrente gerencial (precio ÷ BPA del año siguiente): 6,6x (2021), 6,8x (2022), 8,0x (2023), 6,4x (2024) y 8,6x (2025), mediana 6,8x [1]. Hoy cotiza a 8,5x el BPA de 2027e y a 2,2 veces el valor contable: por encima de su mediana de 5 años porque el ROE ha subido del 19 % al 24 %.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Bancos cotizados de Brasil (Bradesco, Santander Brasil, Banco do Brasil, BTG Pactual, Nubank) y grandes bancos andinos con ADR (Credicorp, Banco de Chile, Santander Chile, Bancolombia), todos con datos de Yahoo del 26-oct-2026 [2]. Para bancos solo tienen sentido el PER, el P/VC y el ROE: EV/EBITDA, margen EBITDA, DN/EBITDA y rentabilidad por FCF quedan vacíos. El campo «ROIC» lleva el ROE. Las capitalizaciones de los ADR se convierten a BRL a 5,4064.',
    empresas: empresasComp,
    comentario: `Itaú cotiza a ${r1(it.per_adelantado)}x el BPA adelantado de Yahoo y a ${r2(it.p_vc)}x el valor contable, con ROE del ${r1(100 * it.roe)} % [2]. Los bancos brasileños grandes están mucho más baratos (Bradesco ${r1(BBDC.per_adelantado)}x y ${r2(BBDC.p_vc)}x VC; Santander Brasil ${r1(SANB.per_adelantado)}x; BB ${r1(BBAS.per_adelantado)}x) porque su ROE es la mitad (11-14 %); BTG (${r1(BTG.per_adelantado)}x, ${r2(BTG.p_vc)}x VC, ROE ${r1(100 * BTG.roe)} %) y Nubank (${r1(NU.per_adelantado)}x, ${r2(NU.p_vc)}x VC, ROE ${r1(100 * NU.roe)} %) cotizan con prima por crecimiento. La relación P/VC frente a ROE ordena bien a todos: Itaú no está caro frente a sus rivales por su ROE, pero todos cotizan con un Ke implícito muy por debajo del bono brasileño. Mediana del PER adelantado de los nueve: 9,8x (Brasil sin Nubank ni BTG: 5,8x).`,
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones comparables con múltiplo (P/VC pagado)', tipo: 'Complemento', intentos: '1) 20-F 2025 (compras propias sin múltiplo publicado: Avenue, NeoSpace no es un banco); 2) prensa de fusiones bancarias en Brasil 2020-2026 (sin P/VC verificable en fuente primaria); 3) notas de las adquirentes (no leídas por tiempo)', decision: 'Omitido' },
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Yahoo (no la da para el ADR); 2) B3 (préstamo de acciones, no leído); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $ITUB (2 a 26-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://api.stocktwits.com/api/2/streams/symbol/ITUB.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares de análisis y noticias de ITUB (abr-oct 2026), incluido «Itaú Unibanco: Outstanding ROE Isn’t Enough To Beat A 14% Risk-Free Rate» (21-sep-2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-26', url: 'https://seekingalpha.com/api/sa/combined/ITUB.xml' },
  { id: 3, titulo: 'Money Times y Seu Dinheiro: notas con comentarios de analistas y lectores sobre ITUB4 (mayo y octubre de 2026)', editor: 'Money Times / Seu Dinheiro', tipo: 'Foros y redes', fecha: '2026-10-05', url: 'https://www.moneytimes.com.br/itau-itub4-acao-cai-mais-10-desde-maximas-e-analistas-veem-janela-veja-potencial-rnda/' },
];
const E = {
  _estado: 'Completa con pocas fuentes (Reddit y foros brasileños con debate abierto no se pudieron leer).',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($ITUB)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'El 26-oct domina la «compra en la caída» a corto plazo («descuento del lunes negro», «¿vuelve a 8 USD?») frente a quien lo vende; antes, euforia tras la primera vuelta. Mucho mensaje automático sin contenido [1].' },
      { plataforma: 'Seeking Alpha (titulares)', fecha: '2026-09', n_comentarios: 15, tono: 'Dividido', resumen: 'Dos líneas: «la ejecución justifica la prima» (abril) y «un ROE extraordinario no basta para batir una tasa libre del 14 %» (septiembre), que es la misma objeción que este informe [2].' },
      { plataforma: 'Prensa económica brasileña con comentarios', fecha: '2026-10', n_comentarios: 10, tono: 'Positivo', resumen: 'Analistas locales ven a Itaú como el banco defensivo ante cualquier resultado electoral; dudas por el 1T26 y por las comisiones [3].' },
    ],
    temas: [
      { tema: 'Comprar la caída tras la victoria de Lula', postura: 'Alcista', peso: 'Alto', contraste: 'La caída viene de la prima de riesgo, no del banco; pero el precio de antes (9,67 USD) ya cotizaba a 2,6 veces el valor contable con un bono al 13 %. Comprar la caída supone que el bono vuelva a bajar [1].' },
      { tema: 'El ROE frente a la tasa libre brasileña', postura: 'Bajista', peso: 'Medio', contraste: 'Coincide con el cálculo del informe: ROE recurrente − Ke = 1,9-3,0 puntos con el bono al 15,44 % [2].' },
      { tema: 'Itaú como banco defensivo de Brasil', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto en lo operativo (morosidad 1,9 %, CET1 12,3 %, ROE 24 %), y por eso cayó menos que Bradesco o BB el 26-oct [3].' },
    ],
    lectura: 'El inversor particular estadounidense trata a ITUB como una apuesta táctica a la política brasileña (subió un 24 % con la primera vuelta y cayó un 20 % con la segunda); el analista local lo ve como el refugio dentro de la banca. Nadie en las fuentes leídas discute la calidad del banco; la discusión es el precio frente al coste del capital en reales, que es la tesis de este informe. No hay capitulación: el día de la caída predominaban los mensajes de compra.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [],
};
guarda('E', E);
console.log('Notas A-E escritas');
