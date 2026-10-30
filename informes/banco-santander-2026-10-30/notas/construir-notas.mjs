// Escribe las notas A, B y D de Banco Santander (SAN en la Bolsa de Madrid, corte 2026-10-30, precio de cierre del 29-oct-2026) a
// partir de: ESEF 2021-2025 (filings.xbrl.org, cuentas-xbrl.json), Informe Financiero, nota de prensa y presentación del 3T26 (6-K
// en la SEC del 28-oct-2026), 6-K de jul-oct 2026 (Webster, recompras, reducción de capital, dividendo a cuenta, SREP, oferta por
// Santander Brasil), bolsa.json, yahoo-datos.json, Bundesbank, Damodaran y prensa. Cada nota cita solo con [n] de su propia lista.
// Iteración 2 (la anterior, del 27-oct, es anterior al 3T26). Las notas C (gobierno) y E (sentimiento) las escriben subagentes.
// Ejecutar: node informes/banco-santander-2026-10-30/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/891478';
const ACC = 14406; // 14.556,5 M a 30-sep − 150,6 M de la recompra de 1.825 M terminada el 28-oct (Yahoo 14.418 M)

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Informe Financiero enero-septiembre 2026 (inglés): datos clave, cuenta ordinaria y estatutaria, segmentos primarios y secundarios, capital, riesgo, TNAV por acción', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000093/financieroq326ingles.htm` },
  { id: 2, titulo: 'Informes anuales ESEF 2021-2025 (cuenta, balance y flujos consolidados NIIF; XBRL)', editor: 'Banco Santander, S.A. (filings.xbrl.org, LEI 5493006QMFDDMYWIAM13)', tipo: 'Primaria', fecha: '2026-02-27', url: 'https://filings.xbrl.org/5493006QMFDDMYWIAM13/2025-12-31/ESEF/ES/0/5493006QMFDDMYWIAM13-2025-12-31-1-es.json' },
  { id: 3, titulo: 'Presentación de resultados del 3T26 (por país, capital, liquidez, calidad del crédito, objetivos de 2026 y 2028)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000095/q32026earningspresentati.htm` },
  { id: 4, titulo: 'Nota de prensa de resultados enero-septiembre 2026', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000091/q32026pr.htm` },
  { id: 5, titulo: 'Conclusión de la compra de Webster y ejecución de la ampliación de capital (329.846.438 acciones nuevas a 10,7896 €)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-20', url: `${ED}/000095010326012672/dp251664_6k.htm` },
  { id: 6, titulo: 'Fin del programa de recompra de 5.030 M € (462.683.139 acciones, 3,08 % del capital) y reducción de capital a 14.556.482.801 acciones', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-21', url: `${ED}/000095010326012763/dp252120_6k.htm` },
  { id: 7, titulo: 'Inscripción de la ampliación de Webster: capital de 15.019.165.940 acciones', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-09-01', url: `${ED}/000095010326013308/dp252656_6k.htm` },
  { id: 8, titulo: 'Programa de recompra de 1.825 M € con cargo al 1S26 (inicio el 24-ago, fin indicativo el 8-ene-2027)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-10', url: `${ED}/000095010326012104/dp251544_6k.htm` },
  { id: 9, titulo: 'Fin del programa de recompra de 1.825 M € (150.595.100 acciones, ≈ 1,03 % del capital, a amortizar)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000095010326016289/dp255721_6k.htm` },
  { id: 10, titulo: 'Dividendo a cuenta de 2026 de 12,7 céntimos (último día con derecho el 28-oct, pago el 2-nov) y política de remuneración 2026-2028', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-09-29', url: `${ED}/000095010326014666/dp254007_6k.htm` },
  { id: 11, titulo: 'Webster Reports Second Quarter 2026 EPS (TBV por acción 38,81 USD; 162,0 M de acciones; ROATCE 16,7 %)', editor: 'Webster Financial Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-20', url: 'https://sec.gov/Archives/edgar/data/801337/000080133726000021/exhibit991earningsrelease2.htm' },
  { id: 12, titulo: 'Decisión SREP del BCE para 2027: P2R del 1,65 % (1,74 % en 2026), al menos 0,93 % en CET1', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000095010326016265/dp255629_6k.htm` },
  { id: 13, titulo: 'Informe Financiero enero-junio 2026 (iteración anterior: cuenta ordinaria del 1S26 y del 2T26, segmentos del 1S)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000089147826000076/financieroq226ingles.htm` },
];

// Cuenta NIIF (ESEF) 2021-2025 adaptada al motor: «ingresos» = BAI − participadas + gastos de administración + amortización =
// margen bruto neto de deterioros, provisiones y otros resultados; «gastos_generales» = administración + amortización; ebit = ebitda.
// 2023 y 2024 son los reexpresados en el ESEF de 2025 (Polonia como actividad interrumpida); 2021-2022, los publicados entonces.
const filas = [
  // periodo, BAI, participadas, administración, amortización, impuestos, minoritarios, beneficio atribuido, BPA, DPA (efectivo con cargo al año), acciones
  ['2021', 14547, 432, 18659, 2756, 4894, 1529, 8124, 0.44, 0.10, 17341],
  ['2022', 15250, 702, 20918, 2985, 4486, 1159, 9605, 0.54, 0.1178, 16794],
  ['2023', 15005, 591, 21546, 3086, 3880, 1107, 11076, 0.65, 0.176, 16184],
  ['2024', 17347, 687, 21970, 3179, 4844, 1170, 12574, 0.77, 0.21, 15153],
  ['2025', 18681, 665, 21533, 3178, 4723, 1399, 14101, 0.90, 0.24, 14689],
];
const cuenta = filas.map(([p, bai, part, adm, am, imp, min, bn, bpa, dpa, acc]) => {
  const gg = adm + am;
  const ebit = bai - part;
  return { periodo: p, ingresos: ebit + gg, coste_ventas: null, gastos_generales: gg, ebitda: ebit, amortizaciones: 0, ebit, resultado_financiero: part, bai, impuestos: imp, minoritarios: min, beneficio_neto: bn, gastos_financieros: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa, dpa, dpa_extraordinario: 0, acciones_diluidas: acc };
});
// Balance NIIF (ESEF): activo, pasivo, patrimonio atribuido (= patrimonio total − minoritarios), minoritarios, fondo de comercio
// + intangibles. Caja y deuda a 0 a propósito (banco).
const filasBal = [
  ['2021', 1595835, 1498782, 86930, 10123, 16584],
  ['2022', 1734659, 1637074, 89104, 8481, 18645],
  ['2023', 1797062, 1692821, 95423, 8818, 19871],
  ['2024', 1837081, 1729754, 98601, 8726, 19259],
  ['2025', 1867515, 1754767, 103170, 9578, 17308],
];
const balance = filasBal.map(([p, at, pt, pn, mi, intg]) => ({ periodo: p, activo_total: at, activo_corriente: null, pasivo_corriente: null, pasivo_total: pt, fondo_comercio: 0, intangibles: intg, inmovilizado_material: null, existencias: 0, clientes: 0, proveedores: 0, activos_contrato: null, pasivos_contrato: null, caja: 0, deuda_financiera: 0, arrendamientos: 0, patrimonio_neto: pn, minoritarios: mi, reservas: null }));
const DIVS = { 2021: 1313, 2022: 1848, 2023: 2261, 2024: 3017, 2025: 3341 };
const RECOMPRAS = { 2021: null, 2022: null, 2023: 3109, 2024: 4038, 2025: 4081 };
const flujos = cuenta.map((c) => ({ periodo: c.periodo, flujo_operativo: c.beneficio_neto, capex: 0, pagos_arrendamientos: 0, adquisiciones: 0, desinversiones: 0, dividendos: DIVS[c.periodo], recompras: RECOMPRAS[c.periodo], emision_acciones: 0, intereses_en_financiacion: 0 }));

// Trimestres (cuenta ordinaria) [A1]
const trim = [
  { periodo: '1T26', ingresos: 15140, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.23, vs_consenso: null },
  { periodo: '2T26', ingresos: 15707, crecimiento_pct: 9.0, crecimiento_organico_pct: 6.0, ebitda: null, margen_ebitda_pct: null, bpa: 0.25, vs_consenso: 'Superior' },
  { periodo: '3T26', ingresos: 15960, crecimiento_pct: 12.0, crecimiento_organico_pct: 8.0, ebitda: null, margen_ebitda_pct: null, bpa: 0.26, vs_consenso: 'Superior' },
];

const A = {
  _estado: 'Completa. Serie anual NIIF del ESEF 2021-2025 adaptada al formato del motor; resultados recientes, RoTE, capital y riesgo con la cuenta ordinaria del Informe Financiero del 3T26 (28-oct-2026).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM dic-25 (NIIF)', fecha_fin: '2025-12-31', ingresos: cuenta[4].ingresos, ebitda: cuenta[4].ebit, ebit: cuenta[4].ebit, beneficio_neto: 14101, bpa: 0.90, dpa: 0.24, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [
      { periodo: '2026', descripcion: 'Venta del 49 % de Santander Bank Polska a Erste Group (9-ene-2026): Plusvalía neta de 1.895 M en el 1T26; Polonia sale de las cifras ordinarias (2025 reexpresado: 13.152 M en vez de 14.101) [1, 4].' },
      { periodo: '2026', descripcion: 'Compra de TSB (Reino Unido) a Banco Sabadell (30-abr-2026): Más de 4 M de clientes; −55 p.b. de CET1; 250 M de costes de reestructuración en el 2T26; al menos 400 M £ de sinergias de costes [1, 4].' },
      { periodo: '2026', descripcion: 'Compra de Webster Financial (EE. UU.) por 48,75 USD en efectivo + 2,0548 ADS por acción (20-ago-2026): 329,8 M de acciones nuevas (2,2 % del capital) y ≈ −150 p.b. de CET1 [3, 5].' },
    ],
    comentario: 'En NIIF (ESEF) el beneficio atribuido pasó de 8.124 M en 2021 a 14.101 M en 2025 (+14,8 % anual) y el BPA de 0,44 a 0,90 € (+19,6 % anual: las recompras redujeron las acciones de 17.341 M a 14.689 M) [2]. El margen de intereses fue de 42.348 M en 2025 (43.787 M en 2024), las comisiones de 17.387 M brutas y las pérdidas por deterioro de activos financieros de 12.546 M, estables en 12.100-12.300 M desde 2023 [2]. En la cuenta ordinaria de 9M26, ingresos de 46.807 M (+8 %; +7 % en euros constantes, +5 % sin TSB ni Webster), margen de intereses de 34.614 M (+10 %), comisiones de 10.349 M (+9 %), costes de 19.925 M (+2 %; −2 % en euros constantes sin compras), dotaciones de 10.060 M (+13 %, sobre todo Argentina) y beneficio ordinario de 11.176 M (+16 %; +14 % en euros constantes); el beneficio atribuido fue de 12.405 M (+20 %) con la plusvalía de Polonia (1.895 M) y −666 M de costes de integración y deterioros de TSB y Webster [1, 4]. RoTE ordinario del 16,0 % (14,9 % un año antes), eficiencia del 42,6 % (−2,8 puntos) y BPA ordinario de 0,74 € (+21 %) [1].',
    ajustes: 'Dos bases. Las cuentas oficiales (ESEF) son NIIF; el banco y el mercado siguen la cuenta «ordinaria» (underlying), que quita extraordinarios: en 9M26, +1.895 M de plusvalía de Polonia y −666 M de deterioros de intangibles y costes de integración de TSB y Webster (−416 M en el 3T26) [1]. En 2022-2025 el ordinario coincidía con el estatutario; en 2021 el ordinario fue de 8.654 M frente a 8.124 M [1, 2]. Desde el 1T26 la información se presenta con Polonia fuera: 2025 ordinario reexpresado de 13.152 M (BPA 0,84 €) frente a 14.101 M publicados (BPA 0,90-0,91) [1]. En la cuenta del motor, 2023-2024 vienen del ESEF de 2025 (reexpresados, con Polonia como actividad interrumpida: 1.542 M de resultado interrumpido en 2025), por eso BAI − impuestos − minoritarios no cuadra con el beneficio atribuido [2]. El BPA y el RoTE de la regla a 12 meses y del modelo bancario son ordinarios, por acción, netos de los cupones de AT1 [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: trim,
    ultima_presentacion: 'En el 3T26 (28-oct-2026, primer trimestre con Webster desde el 20-ago) el beneficio ordinario fue récord, 3.848 M (+19 % interanual; +2,1 % en el trimestre), con ingresos de 15.960 M (+12 %), margen de intereses de 11.903 M (+1,8 % en el trimestre), costes de 6.714 M y dotaciones de 3.486 M (+22 %, Argentina) [1, 4]. El beneficio atribuido bajó un 2 % (3.432 M) por −416 M de costes de integración. RoTE ordinario del 16,8 % en el trimestre (16,0 % en 9M26), BPA ordinario de 0,26 € (consenso ≈ 0,24 €, «+2 céntimos» según la prensa) y CET1 del 12,7 % tras restar 147 p.b. por Webster (+14 p.b. orgánicos en el trimestre) [1]. El banco reiteró los objetivos de 2026 (ingresos +MSD, costes a la baja en euros constantes, beneficio por encima de 14.100 M, CET1 del 12,8-13 % a fin de año) y de 2028 (RoTE > 20 %, beneficio > 20.000 M) [3, 4]. TNAV por acción de 5,92 € (6,32 en junio) por la compra de Webster [1].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Depósitos de clientes de 1.222.263 M y crédito a clientes de 1.206.887 M a sep-2026 (+7,8 % y +5,0 % en el trimestre por Webster: ≈ 62.000 M de depósitos y ≈ 50.000 M de crédito) [1]. Crédito neto sobre depósitos del 99 %; LCR del grupo del 145 % (154 % en junio; consolidado del 140 %), datos provisionales [1].',
    rating: 'Grado de inversión (sin leer la nota vigente de las agencias en este análisis)',
    coste_deuda_pct: null, vida_media_anios: null,
    otros_pasivos: 'Capital a sep-2026: CET1 del 12,7 % (phased-in) y capital total del 17,0 %, tras −147 p.b. de Webster; requisito de CET1 estimado del 9,9 % (desde el 1-oct el Banco de España activa un colchón anticíclico): distancia al MDA de 254 p.b. [1, 3]. El BCE baja el P2R para 2027 del 1,74 % al 1,65 % [12]. El banco mantiene el objetivo de cerrar 2026 en el 12,8-13 % [1]. Morosidad del 2,90 % (2,93 % en junio) con cobertura del 64 %; coste del riesgo del 1,16 % a 12 meses (1,08 % sin Argentina) y fondo de provisiones de 25.124 M [1, 3]. Provisiones adicionales por la financiación de automóviles en el Reino Unido (motor finance) de 245 M brutos en 9M26 (194 M netos), casi todo en el 1T26 [3].',
    comentario: 'Para un banco el motor no tiene sentido en deuda neta, circulante ni capital invertido: caja y deuda a 0, y el «capital invertido» queda igual al patrimonio atribuido NIIF. El activo pasó de 1.595.835 M (2021) a 1.867.515 M (2025), +4,0 % anual, y el patrimonio atribuido de 86.930 M a 103.170 M, +4,4 % anual, con recompras de 3.100-4.100 M al año desde 2023 [2]. El fondo de comercio e intangibles (17.308 M a dic-2025) sube con TSB y Webster: el TNAV por acción bajó de 6,32 € en junio a 5,92 € en septiembre, y el RoE ordinario (13,7 % en 9M26) queda 2,3 puntos por debajo del RoTE (16,0 %) [1, 2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'El estado de flujos de un banco no mide la caja del accionista: el flujo de explotación NIIF fue de 56.691 M en 2021, 27.706 M en 2022, 5.015 M en 2023, −24.155 M en 2024 y −14.835 M en 2025, porque mezcla depósitos, cartera y repos [2]. Se usa el beneficio atribuido como «flujo operativo» y capex 0. Remuneración: dividendos en efectivo pagados de 1.313 M (2021) a 3.341 M (2025) y compra de acciones propias de 3.109 M (2023), 4.038 M (2024) y 4.081 M (2025) [2]. Dividendo por acción con cargo al año: 0,10 € (2021), 0,1178 (2022), 0,176 (2023), 0,21 (2024) y 0,24 (2025: 11,5 + 12,5 céntimos) [2, 4]. En 2026: programa de 5.030 M terminado en agosto (462,7 M de acciones), programa de 1.825 M con cargo al 1S26 terminado el 28-oct (150,6 M de acciones, ≈ 1,03 % del capital, a amortizar) y dividendo a cuenta de 12,7 céntimos el 2-nov; remuneración con cargo al 1S26 de ≈ 3.660 M (+8 %, ≈ 50 % del beneficio ordinario) [4, 6, 8, 9, 10].',
    confianza: 'Media',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers Auditores, S.L.', anios_auditor: null, opinion: 'Favorable (cuentas consolidadas 2025)',
    comentario: 'Altman Z, Piotroski F y Beneish M no se interpretan en un banco. Lo que importa es la cartera: morosidad del 2,90 % con cobertura del 64 % y coste del riesgo del 1,16 % a 12 meses (1,13 % un año antes; 1,08 % sin Argentina) [1, 3]. Por país, el coste del riesgo es del 0,43 % en España, 0,12 % en el Reino Unido, 0,06 % en Portugal, 1,39 % en EE. UU., 2,73 % en México, 4,25 % en Brasil, 1,28 % en Chile y 10,80 % en Argentina (+455 p.b.) [3]. Tres señales: (1) Argentina explica casi toda la subida de dotaciones (+13 %; +6 % sin Argentina); (2) provisiones por la financiación de automóviles en el Reino Unido (245 M brutos en 9M26); (3) la cobertura baja de 67 % a 64 % en un año [1, 3].',
    senales: [
      { senal: 'Coste del riesgo de Argentina del 10,8 % (+4,6 puntos)', nivel: 'Media', comentario: 'Argentina pesa el 2,8 % del beneficio; sube las dotaciones del grupo del +6 % al +13 % [1, 3].' },
      { senal: 'Provisiones por la financiación de automóviles en el Reino Unido', nivel: 'Media', comentario: '245 M brutos en 9M26 (194 M netos), sobre todo en el 1T26 [3].' },

      { senal: 'Cobertura de la morosidad del 64 % (67 % un año antes)', nivel: 'Baja', comentario: 'Morosidad estable en el 2,9 % [1].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Retail & Commercial Banking', descripcion: 'Banca minorista y de empresas en los diez mercados del grupo (incluye TSB desde mayo y Webster desde el 20-ago-2026).', tipo_resultado: 'Beneficio ordinario', historico: [{ periodo: '9M25', ingresos: 24179, resultado: 5631 }, { periodo: '9M26', ingresos: 26277, resultado: 6445 }] },
      { nombre: 'Openbank (antes Digital Consumer Bank)', descripcion: 'Financiación al consumo y de automóviles y banca digital en Europa y América.', tipo_resultado: 'Beneficio ordinario', historico: [{ periodo: '9M25', ingresos: 9667, resultado: 1561 }, { periodo: '9M26', ingresos: 10062, resultado: 1407 }] },
      { nombre: 'Corporate & Investment Banking', descripcion: 'Banca mayorista, mercados y asesoramiento.', tipo_resultado: 'Beneficio ordinario', historico: [{ periodo: '9M25', ingresos: 6027, resultado: 2080 }, { periodo: '9M26', ingresos: 6936, resultado: 2433 }] },
      { nombre: 'Wealth Management & Insurance', descripcion: 'Banca privada, gestión de activos y seguros (588.000 M de activos bajo gestión).', tipo_resultado: 'Beneficio ordinario', historico: [{ periodo: '9M25', ingresos: 2895, resultado: 1376 }, { periodo: '9M26', ingresos: 3198, resultado: 1651 }] },
      { nombre: 'Payments', descripcion: 'Getnet, Ebury y plataformas de pago.', tipo_resultado: 'Beneficio ordinario', historico: [{ periodo: '9M25', ingresos: 994, resultado: 35 }, { periodo: '9M26', ingresos: 1175, resultado: 105 }] },
    ],
    geografias: [
      { nombre: 'España', peso_pct: 30.7 }, { nombre: 'Brasil', peso_pct: 13.3 }, { nombre: 'Estados Unidos', peso_pct: 12.6 }, { nombre: 'México', peso_pct: 11.6 },
      { nombre: 'Reino Unido', peso_pct: 10.6 }, { nombre: 'Portugal', peso_pct: 5.9 }, { nombre: 'Chile', peso_pct: 5.4 }, { nombre: 'Openbank Europa', peso_pct: 4.3 },
      { nombre: 'Argentina', peso_pct: 2.8 }, { nombre: 'Resto', peso_pct: 2.8 },
    ],
    geografias_criterio: 'beneficio ordinario de 9M26 por segmento secundario, sin el centro corporativo (−865 M) [1]',
    kpis: [
      { kpi: 'RoTE ordinario', valor_anterior: '14,9 % (9M25)', valor_actual: '16,0 % (9M26)', variacion: '+1,1 p.p.', comentario: '16,8 % en el 3T26; objetivo > 20 % en 2028 [1, 3].' },
      { kpi: 'CET1', valor_anterior: '13,1 % (sep-25)', valor_actual: '12,7 % (sep-26)', variacion: '−0,4 p.p.', comentario: '−147 p.b. por Webster; objetivo del 12,8-13 % a fin de 2026 [1].' },
      { kpi: 'Eficiencia', valor_anterior: '45,4 % (9M25)', valor_actual: '42,6 % (9M26)', variacion: '−2,8 p.p.', comentario: 'Objetivo ≈ 36 % en 2028 [1, 3].' },
      { kpi: 'Coste del riesgo (12 meses)', valor_anterior: '1,13 % (sep-25)', valor_actual: '1,16 % (sep-26)', variacion: '+0,03 p.p.', comentario: 'Sin Argentina, estable (1,08 % en Retail sin Argentina) [1, 3].' },
      { kpi: 'Morosidad', valor_anterior: '2,91 % (sep-25)', valor_actual: '2,90 % (sep-26)', variacion: '−0,01 p.p.', comentario: 'Cobertura del 64 % (67 % un año antes) [1].' },
      { kpi: 'Margen de intereses (9M)', valor_anterior: '31.599 M (9M25)', valor_actual: '34.614 M (9M26)', variacion: '+9,5 %', comentario: '+7 % sin TSB ni Webster; 11.903 M en el 3T26 [1].' },
      { kpi: 'TNAV por acción', valor_anterior: '5,56 € (sep-25)', valor_actual: '5,92 € (sep-26)', variacion: '+6,5 %', comentario: '+11 % con los dividendos; 6,32 € en junio, antes de Webster [1].' },
    ],
  },
  fuentes: fA,
  huecos: [
    { seccion: 'financieros', campo: 'cuenta ordinaria trimestral de 2025 (1T25-4T25) reexpresada sin Polonia', tipo: 'Complemento', intentos: '1) Informe Financiero del 2T26 (solo 1T26, 2T26, 1S25 y 2025); 2) presentación del 2T26 (gráficos sin tabla); 3) 6-K de reexpresión del 1-abr-2026 (no descargado por tiempo)', decision: 'Omitido' },
    { seccion: 'flujos', campo: 'recompras de 2021 y 2022', tipo: 'Complemento', intentos: '1) ESEF 2021 y 2023 (concepto no etiquetado en esos años); 2) informe anual (no leído); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Yahoo Finance quoteSummary de los bancos comparables (capitalización, ROE, P/VC, PER adelantado), 30-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-30', url: 'https://finance.yahoo.com/quote/SAN.MC/' },
  { id: 2, titulo: 'Informe Financiero enero-septiembre 2026 (modelo de negocio, segmentos, clientes)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000093/financieroq326ingles.htm` },
  { id: 3, titulo: 'Presentación de resultados del 3T26 (por país, RoTE y coste del riesgo por país, objetivos de 2028)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000095/q32026earningspresentati.htm` },
  { id: 4, titulo: 'Santander, BBVA y CaixaBank afrontan octubre de 2026 con resultados, dividendos y tipos (BCE +25 p.b. en septiembre, euríbor 3,247 %)', editor: 'DailyForex', tipo: 'Prensa', fecha: '2026-10-03', url: 'https://es.dailyforex.com/stock-market-today/2026/10/santander-bbva-y-caixabank-afrontan-octubre-2026-con-resultados-dividendos-ytipos/250330' },
  { id: 5, titulo: 'Santander gana un 31,3 % más en el primer semestre por la venta de Polonia y el negocio de TSB (declaraciones de Ana Botín y Héctor Grisi)', editor: 'El Debate', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.eldebate.com/economia/20260722/santander-gana-313-primer-semestre-venta-polonia-negocio-tsb_442216.html' },
  { id: 6, titulo: 'Banco Santander ante el duelo Lula-Bolsonaro: ¿qué escenario favorece más al banco? (Brasil, 16 % del beneficio de 2025 según Jefferies; sensibilidad a la Selic)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/banco-santander-ante-el-duelo-lula-bolsonaro-que-n-957101' },
];
const q = (t) => Y[t];
const Bn = {
  _estado: 'Completa con huecos de cuota y tamaño de mercado: banco multinacional con diez mercados; competidores con datos de mercado de Yahoo.',
  historia: {
    resumen: 'Banco Santander nació en 1857 en Santander y se hizo grande por compras: Banco Central Hispano (1999), Abbey National en el Reino Unido (2004), Banco Real en Brasil (2008, reparto de ABN AMRO), Sovereign en EE. UU. (2009), Banco Popular (2017, por un euro tras su resolución) y, en 2026, TSB (Reino Unido, abril) y Webster (EE. UU., agosto) [2]. En enero de 2026 vendió el 49 % de Santander Bank Polska a Erste [2]. Ana Botín preside el banco desde 2014; Héctor Grisi es consejero delegado desde 2023 [5]. En 2026 reorganizó el grupo en cinco negocios globales (Retail, Openbank, CIB, Wealth y Payments) con un modelo operativo común («ONE Transformation») [2].',
    hitos: [
      { anio: '1999', hito: 'Fusión con Banco Central Hispano (BSCH).' },
      { anio: '2004', hito: 'Compra de Abbey National (Reino Unido).' },
      { anio: '2008', hito: 'Banco Real (Brasil), en el reparto de ABN AMRO.' },
      { anio: '2017', hito: 'Compra de Banco Popular por un euro.' },
      { anio: '2020', hito: 'Pérdida estadística por deterioro del fondo de comercio (−8.771 M) [A2].' },
      { anio: '2026', hito: 'Venta de Polonia (ene), compra de TSB (abr) y de Webster (ago, 10.724 M € entre efectivo y acciones), oferta de canje por el 10 % de Santander Brasil (jul) [A1, A5].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Uno de los mayores bancos del mundo: 2,10 billones de euros de activo, 1,21 billones de crédito y 1,22 billones de depósitos a sep-2026 (con Webster), 189 M de clientes (111 M activos), 186.151 empleados y 6.548 oficinas [2]. Diez mercados principales: España (31 % del beneficio ordinario de los países en 9M26), Brasil (13 %), EE. UU. (13 %), México (12 %), Reino Unido (11 %), Portugal (6 %), Chile (5 %), Openbank Europa (4 %) y Argentina (3 %) [2].',
    como_gana_dinero: 'De 46.807 M de ingresos ordinarios en 9M26, el 74 % es margen de intereses (34.614 M) y el 22 % comisiones (10.349 M); el resto, resultados de operaciones financieras y otros [2]. ≈ 95 % de los ingresos está ligado a la actividad con clientes [2]. Después de costes (19.925 M; eficiencia del 42,6 %) y dotaciones (10.060 M; coste del riesgo del 1,16 %) quedan 15.771 M antes de impuestos y 11.176 M de beneficio ordinario [2]. El margen viene de la diversificación: España y Portugal ganan con tipos del BCE positivos (RoTE del 25,6 % y 29,8 %), México y Chile con diferenciales altos (21,2 % y 20,3 %), Brasil con coste del riesgo alto (4,25 %; RoTE del 13,9 %) y el Reino Unido y EE. UU. con RoTE más bajos (12,8 % y 12,6 %) que las compras de TSB y Webster deben subir (el banco apunta a ≈ 18 % en EE. UU. en 2028) [3].',
    clientes: 'Base muy dispersa (189 M de clientes, particulares y empresas en diez países). Poder de precio limitado en hipotecas en España, «uno de los mercados más competitivos de Europa» según el consejero delegado [5]; mayor en consumo y tarjetas en América Latina.',
  },
  sector: {
    definicion: 'El mercado relevante es la banca minorista y comercial de sus diez mercados (crédito y depósitos de particulares y empresas), con la banca mayorista y la gestión de patrimonios como negocios globales. No hay una serie única de tamaño de mercado que sume diez países en distintas divisas: el informe no la calcula y usa la cuota y la rentabilidad por país [2, 3].',
    tamano: null,
    unidad_serie: null, serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Tipos de interés en Europa', efecto: '+', horizonte: 'Cíclico', evidencia: 'El BCE subió 25 p.b. en septiembre de 2026 y el euríbor está en el 3,25 %: sostiene el margen de intereses en España y Portugal [4].' },
      { driver: 'Riesgo político y tipos en América Latina', efecto: '−', horizonte: 'Cíclico', evidencia: 'Brasil (13 % del beneficio en 9M26) es pasivo-sensible: −100 p.b. de Selic suben el margen ≈ 70 M €; la reelección de Lula del 25-oct retrasa esa bajada [6].' },
      { driver: 'Impuestos a la banca', efecto: '−', horizonte: 'Estructural', evidencia: 'El impuesto a la banca en España resta parte de la mejora del margen; Grisi lo llama contraproducente [4, 5].' },
      { driver: 'Escala y tecnología (ONE Transformation, IA)', efecto: '+', horizonte: 'Estructural', evidencia: 'Costes −2 % en euros constantes sin TSB ni Webster con ingresos +5 %; 194 M de valor de negocio por IA en 9M26 [2].' },
      { driver: 'Competencia digital', efecto: '−', horizonte: 'Estructural', evidencia: 'Neobancos y bancos digitales en consumo y pagos; Openbank es la respuesta propia [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'BBVA, CaixaBank y Sabadell en España; Itaú y Bradesco en Brasil; BBVA y Banorte en México; grandes bancos en el Reino Unido y EE. UU. [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Hipotecas muy competidas en España y el Reino Unido; portabilidad y pagos instantáneos.' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Depósitos de 1,13 billones, en su mayoría de particulares; coste ligado a los tipos oficiales [2].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Bancos digitales y tecnológicas en pagos y consumo; la licencia y el capital frenan la entrada en crédito.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Mercado de capitales y crédito privado para empresas; fintech para particulares.' },
    ],
    ciclo: { posicion: 'Madurez', comentario: 'En Europa el ciclo de tipos se ha estabilizado (el BCE volvió a subir en septiembre) con morosidad baja (España: coste del riesgo del 0,41 %); en Brasil y Argentina el ciclo de crédito es peor (4,1 % y 11,1 %) [3, 4].' },
    regulacion: 'Supervisión del BCE (MUS) y de los supervisores locales; requisito de CET1 del 9,83 % con colchón sistémico global [A3]. Abiertos con efecto en cifras: el impuesto a la banca en España, la remediación de la financiación de automóviles en el Reino Unido (FCA) y la posible subida de la ponderación de riesgo de las tarjetas en Brasil [4, 6].',
    tendencias: 'Tres cambios: (1) escala y plataforma común (Gravity, ONE Transformation) para bajar el coste por cliente (264 → 253 € y objetivo ≈ 220 en 2028); (2) compras en mercados donde ya estaba para ganar escala (TSB, Webster); (3) más peso de comisiones (Wealth, Payments, CIB) [2, 3]. Gana con las tres si ejecuta.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null, posicion: 'Mayor banco de la zona euro por capitalización junto a BNP Paribas; primero o segundo en España, Portugal y Chile, tercer banco privado en Brasil y entre los primeros en México [2].',
    competidores: [
      { nombre: 'BBVA', pais: 'España', ticker: 'BBVA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `España, México, Turquía; ROE ${r1(100 * q('BBVA.MC').roe)} %, P/VC ${r2(q('BBVA.MC').pvc)}x [1].` },
      { nombre: 'CaixaBank', pais: 'España', ticker: 'CABK', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `España y Portugal; ROE ${r1(100 * q('CABK.MC').roe)} %, P/VC ${r2(q('CABK.MC').pvc)}x [1].` },
      { nombre: 'BNP Paribas', pais: 'Francia', ticker: 'BNP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `Universal europeo; ROE ${r1(100 * q('BNP.PA').roe)} %, P/VC ${r2(q('BNP.PA').pvc)}x [1].` },
      { nombre: 'UniCredit', pais: 'Italia', ticker: 'UCG', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `ROE ${r1(100 * q('UCG.MI').roe)} %, P/VC ${r2(q('UCG.MI').pvc)}x [1].` },
      { nombre: 'ING', pais: 'Países Bajos', ticker: 'INGA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `ROE ${r1(100 * q('INGA.AS').roe)} %, P/VC ${r2(q('INGA.AS').pvc)}x [1].` },
      { nombre: 'HSBC', pais: 'Reino Unido', ticker: 'HSBA', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: `ROE ${r1(100 * q('HSBA.L').roe)} % [1].` },
      { nombre: 'Itaú Unibanco', pais: 'Brasil', ticker: 'ITUB4', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder privado en Brasil, rival de Santander Brasil (ver informe de Itaú del 27-oct).' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 2, evidencia: 'Getnet y Ebury en pagos; 189 M de clientes [2].' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Nómina, hipoteca y cuentas vinculadas; 58 meses seguidos ganando clientes netos en España [5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Marca global y licencias bancarias en diez países.' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Eficiencia del 42,6 % en 9M26, mejor que la media europea, con plataforma tecnológica común [2].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Cuotas del 15-20 % en varios mercados; RoTE del 26-30 % en España y Portugal [3].' },
      ],
    },
    amenazas: 'Lo que más erosiona: la política en América Latina (Brasil tras el 25-oct, Argentina), impuestos a la banca en España y una bajada de tipos en Europa. La diversificación amortigua: ningún país pasa de un tercio del beneficio.',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material es la conducta con clientes (financiación de automóviles en el Reino Unido) y el riesgo de crédito climático; no se ha encontrado una cifra que mueva la valoración [A3].',
    controversias: 'Provisiones por la remediación de la financiación de automóviles en el Reino Unido (245 M brutos en 9M26) [A3]; expediente de la CNMC sin cifras en la prensa leída [5].',
    confianza: 'Baja',
  },
  fuentes: fB,
  huecos: [
    { seccion: 'sector', campo: 'tamaño del mercado relevante y su serie', tipo: 'Núcleo', intentos: '1) informe financiero (cuotas por país sin tamaño total); 2) BCE y bancos centrales (diez países en distintas divisas: no suman); 3) sin ficha de sector de banca en sectores/', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones ESG', tipo: 'Complemento', intentos: '1) informe financiero (no las da); 2) web de accionistas (bloqueada por Incapsula); 3) prensa', decision: 'Omitido' },
  ],
};
guarda('B', Bn);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Santander gana un 31,3 % más en el primer semestre (Héctor Grisi, consejero delegado; Ana Botín, presidenta)', editor: 'El Debate', tipo: 'Prensa', fecha: '2026-07-22', url: 'https://www.eldebate.com/economia/20260722/santander-gana-313-primer-semestre-venta-polonia-negocio-tsb_442216.html' },
  { id: 2, titulo: 'Informe Financiero enero-junio 2026: gobierno corporativo (nombramientos del 23-jun) y accionistas', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000089147826000076/financieroq226ingles.htm` },
  { id: 3, titulo: 'Nota de prensa de resultados enero-junio 2026 (objetivos de 2026 y 2028)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-07-22', url: `${ED}/000089147826000069/q22026pr.htm` },
  { id: 4, titulo: 'Santander propone a Héctor Grisi como nuevo consejero delegado en sustitución de José Antonio Álvarez', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2022-06-17', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/santander-propone-a-hector-grisi-como-nuevo-consejero-n-535219' },
  { id: 5, titulo: 'Oferta de canje por Santander Brasil (press release, 30-jul-2026)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000095010326011481/dp250874_6k.htm` },
];
const C = {
  _estado: 'Parcial: equipo y objetivos; sin el consejo completo, votos de la junta ni operaciones de directivos (web de accionistas bloqueada).',
  directivos: {
    equipo: [
      { nombre: 'Ana Botín', cargo: 'Presidenta ejecutiva', desde: '2014', participacion_pct: null, trayectoria: 'Presidenta desde 2014; antes consejera delegada de Santander UK y de Banesto [1].' },
      { nombre: 'Héctor Grisi', cargo: 'Consejero delegado', desde: '2023', participacion_pct: null, trayectoria: 'Antes presidente ejecutivo de Santander México; propuesto en jun-2022 para sustituir a José Antonio Álvarez [1, 4].' },
      { nombre: 'José García Cantera', cargo: 'Director financiero', desde: null, participacion_pct: null, trayectoria: 'Firma los informes 6-K de resultados [2].' },
      { nombre: 'Matías Sánchez y Borja Oyarzábal', cargo: 'Responsables globales de Retail y de Commercial', desde: '2026', participacion_pct: null, trayectoria: 'Nombrados el 23-jun-2026 en sustitución de Daniel Barriuso [2].' },
    ],
    historial_guidance: [
      { anio: '2026', guia: 'Ingresos +MSD y costes a la baja en euros constantes; beneficio > 14.100 M; CET1 12,8-13 %', real: '1S26: ingresos +5 %, costes −2 % sin TSB, beneficio ordinario 7.328 M (+15 %), CET1 14,0 % antes de Webster', cumplida: 'Parcial' },
      { anio: '2025', guia: 'Beneficio récord y RoTE ≈ 16-17 %', real: 'Beneficio de 14.101 M (+12 %), RoTE estatutario del 16,3 %', cumplida: 'Sí' },
    ],
    comentario: 'Equipo estable (Botín desde 2014, Grisi desde 2023) que ha cumplido los objetivos de los últimos años y reitera los de 2026 y el plan de 2028 (RoTE > 20 %, beneficio > 20.000 M, eficiencia ≈ 36 %) [1, 3]. El plan exige ejecutar a la vez la integración de TSB y Webster: es ambicioso (RoTE ordinario del 15,6 % hoy).',
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Ana Botín', cargo: 'Presidenta ejecutiva', tipo: 'Ejecutivo', desde: '2014', comisiones: null },
      { nombre: 'Héctor Grisi', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2023', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: null,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 0,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    remuneracion: 'No leída en este análisis (informe anual de remuneraciones en la web de accionistas, bloqueada por Incapsula). El variable de los consejeros ejecutivos se liga al RoTE y a la creación de valor por acción según la política del banco (sin cifra leída).',
    accionistas: [
      { nombre: 'Capital flotante (3,5 M de accionistas)', pct: 100, tipo: 'Institucional y particulares', variacion: 'Sin accionista de control; el capital ha bajado de 17.341 M de acciones (2021) a ≈ 14.450 M por recompras, con 329,8 M nuevas por Webster [A6, A7].' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control y una acción, un voto. La presidenta es ejecutiva y procede de la familia fundadora; hay consejero coordinador independiente (sin nombre confirmado en las fuentes leídas). La oferta de canje por Santander Brasil (hasta el 1,1 % del capital) se hace con acciones nuevas sin voto de la junta adicional (ampliación ya autorizada) [5].',
    alertas: ['Presidenta ejecutiva (no separa del todo la supervisión de la gestión).', 'Tres operaciones corporativas grandes en 2026 a integrar (TSB, Webster, Santander Brasil).'],
    confianza: 'Baja',
  },
  fuentes: fC,
  huecos: [
    { seccion: 'gobierno', campo: 'consejo completo, votos de la junta de 2026, remuneración individual y operaciones de directivos', tipo: 'Complemento', intentos: '1) santander.com (Incapsula bloquea la descarga); 2) informe financiero del 2T26 (solo cambios de dirección); 3) CNMV (operaciones de directivos: no consultadas por tiempo)', decision: 'Omitido' },
  ],
};
// guarda('C', C); — la nota C la escribe el subagente C en esta iteración

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (SAN.MC, ^IBEX, EXV1.DE, ^STOXX) hasta el 29-oct-2026 (bolsa.mjs) y movimiento con la sesión del 30-oct (movimiento.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-30', url: 'https://finance.yahoo.com/quote/SAN.MC/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary (precio, consenso, objetivos, P/VC, ROE) de SAN.MC, SAN y comparables, 30-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-30', url: 'https://finance.yahoo.com/quote/SAN.MC/analysis/' },
  { id: 3, titulo: 'Rendimiento de los valores del Estado alemán a 10 años (serie BBSIS D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A): 3,42 % el 29-oct-2026 (3,40 % el 30-oct)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-30', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZST.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Country Default Spreads and Risk Premiums (ctryprem.xlsx, actualización de ene-2026)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-01-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/datasets/ctryprem.xlsx' },
  { id: 6, titulo: 'Santander anuncia su intención de lanzar una oferta de canje por las acciones de Santander Brasil (prima del 15 %, hasta 1.908 M €, hasta el 1,1 % del capital)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000095010326011481/dp250874_6k.htm` },
  { id: 7, titulo: 'Fato relevante: registro de las ofertas en la CVM, B3 y SEC (F-4) (Form 425)', editor: 'Banco Santander, S.A. (SEC)', tipo: 'Primaria', fecha: '2026-09-22', url: `${ED}/000095010326014284/dp253665_425.htm` },
  { id: 8, titulo: 'Nota de prensa de resultados enero-septiembre 2026 (beneficio ordinario 11.176 M, RoTE 16,0 %, CET1 12,7 %, objetivos reiterados)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000089147826000091/q32026pr.htm` },
  { id: 9, titulo: 'Aprobaciones y cierre previsto de la compra de Webster (OCC 12-jun, BCE 21-jul, Fed 4-ago; cierre el 20-ago)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-08-05', url: `${ED}/000095010326011921/dp250447_6k.htm` },
  { id: 10, titulo: 'Webster / Banco Santander: términos de la compra (75,59 USD por acción: 48,75 USD en efectivo + 2,0548 ADS; ≈ 12.300 M USD)', editor: 'Webster Financial Corporation (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-03', url: 'https://www.sec.gov/Archives/edgar/data/801337/000119312526035891/d101831dex991.htm' },
  { id: 11, titulo: 'Banco Santander ante el duelo Lula-Bolsonaro (Brasil, 16 % del beneficio de 2025 según Jefferies; −100 p.b. de Selic ≈ +70 M € de margen)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-10-06', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/banco-santander-ante-el-duelo-lula-bolsonaro-que-n-957101' },
  { id: 12, titulo: 'Santander, BBVA y CaixaBank afrontan octubre de 2026 (caída del 1-oct por el bono español y la primera vuelta en Brasil; objetivo 13,34 €)', editor: 'DailyForex', tipo: 'Prensa', fecha: '2026-10-03', url: 'https://es.dailyforex.com/stock-market-today/2026/10/santander-bbva-y-caixabank-afrontan-octubre-2026-con-resultados-dividendos-ytipos/250330' },
  { id: 13, titulo: 'Calendario de resultados del 3T2026 (Santander el 28-oct)', editor: 'Estrategias de Inversión', tipo: 'Prensa', fecha: '2026-10-26', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/calendario-de-resultados-del-3t2026-de-todas-las-n-959313' },
  { id: 14, titulo: 'Informe de Santander Brasil del 27-oct-2026 (precio de SANB11, valor de canje, reacción del 26-oct)', editor: 'Elaboración propia (informes/santander-brasil-2026-10-27/)', tipo: 'Primaria', fecha: '2026-10-27', url: null },
  { id: 15, titulo: 'Dividendo a cuenta de 2026 de 12,7 céntimos (último día con derecho el 28-oct)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-09-29', url: `${ED}/000095010326014666/dp254007_6k.htm` },
  { id: 16, titulo: 'Fin del programa de recompra de 1.825 M € (150.595.100 acciones, ≈ 1,03 % del capital)', editor: 'Banco Santander, S.A. (SEC, 6-K)', tipo: 'Primaria', fecha: '2026-10-28', url: `${ED}/000095010326016289/dp255721_6k.htm` },
  { id: 17, titulo: 'El repunte de los beneficios de Santander en el tercer trimestre se ve empañado por la debilidad de Brasil (traducción de Reuters)', editor: "GBM / Reuters", tipo: 'Prensa', fecha: '2026-10-28', url: "https://gbm.com/media/noticia/noticia-en-vivo-cion-3-el-repunte-de-los-beneficios-de-santander-en-el-tercer-trimestre-se-ve-empanado-por-la-debilidad-de-brasil/" },
  { id: 18, titulo: 'Banco Santander SA Stock (SAN) Moved Down by 4.17% on Oct 28: Key Drivers Unveiled', editor: "Mitrade", tipo: 'Prensa', fecha: '2026-10-28', url: "https://www.mitrade.com/insights/news/live-news/article-0-2204471-20261028" },
  { id: 19, titulo: "Eurozona: si muove sotto la parità l'EURO STOXX Banks", editor: "Teleborsa / Borsa Italiana", tipo: 'Datos de mercado', fecha: '2026-10-28', url: "https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/eurozona-si-muove-sotto-la-parita-l-euro-stoxx-banks-79_2026-10-28_TLB-1LINER.html?lang=it" },
  { id: 20, titulo: 'Banco Santander (SAN) news: cambios de recomendación y titulares 26-30 oct', editor: "MarketBeat", tipo: 'Prensa', fecha: '2026-10-30', url: "https://www.marketbeat.com/stocks/NYSE/SAN/news" },
  { id: 21, titulo: 'Banco Santander, S.A. — News and Analysis (RSS: «Non-GAAP EPS of €0.26 beats by €0.02, revenue of €15.89B misses by €370M»; «Santander trades lower as Q3 profit comes in lower on impairments, integration costs»; análisis de autores de agosto y septiembre)', editor: "Seeking Alpha", tipo: 'Prensa', fecha: '2026-10-28', url: "https://seekingalpha.com/api/sa/combined/SAN.xml" },
];
const san = Y['SAN.MC'], adr = Y.SAN;
const GBP = null;
const comp = (nombre, t, pais, roeNull = false) => {
  const x = Y[t];
  return { nombre, ticker: t, pais, capitalizacion: x.divisa === 'GBp' ? null : Math.round(x.cap / 1e6), ev_ventas: null, ev_ebitda_ltm: null, ev_ebitda_ntm: null, per_ntm: r1(x.per_adelantado), crecimiento_pct: null, margen_ebitda_pct: null, roic_pct: roeNull || x.roe == null ? null : r1(100 * x.roe), dn_ebitda: null, fcf_yield_pct: null };
};
const empresasComp = [comp('BBVA', 'BBVA.MC', 'ES'), comp('CaixaBank', 'CABK.MC', 'ES'), comp('Banco Sabadell', 'SAB.MC', 'ES'), comp('Bankinter', 'BKT.MC', 'ES'), comp('Unicaja', 'UNI.MC', 'ES'), comp('BNP Paribas', 'BNP.PA', 'FR'), comp('ING', 'INGA.AS', 'NL'), comp('UniCredit', 'UCG.MI', 'IT'), comp('Intesa Sanpaolo', 'ISP.MI', 'IT'), comp('HSBC', 'HSBA.L', 'GB'), comp('Lloyds', 'LLOY.L', 'GB'), comp('Barclays', 'BARC.L', 'GB'), comp('NatWest', 'NWG.L', 'GB')];
const pers = empresasComp.map((c) => c.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medPer = pers[Math.floor(pers.length / 2)];
const cierres = B.cierres_ejercicio;
const mov = { fecha: '2026-10-30', var_1m_pct: -13.9, var_3m_pct: -19.5, var_6m_pct: -3.9, var_12m_pct: 15.5, dist_max_52s_pct: -21.5, dist_min_52s_pct: 15.9, dist_max_historico_pct: -21.5, tendencia: 'lateral', volatilidad_60d_pct: 28, avisos: ['Cotización de la sesión del 30-oct (10,17 € a mediodía; cierre del 29-oct 10,512 €, ya sin el dividendo a cuenta de 0,127 €); mayor caída de 1 mes −15,0 % al 28-oct; a −9,8 % de la media de 200 sesiones'] };
const D = {
  _estado: 'Completa. Precio = SAN en Madrid al cierre del 29-oct-2026 (10,512 €, sin el dividendo a cuenta); consenso de Yahoo del 30-oct (16-18 analistas de BPA, 21 de objetivo); comparables bancarios europeos con PER, P/VC y ROE; compras del año (TSB, Webster, oferta por Santander Brasil) como transacciones.',
  identificacion: {
    nombre: 'Banco Santander, S.A.', nombre_corto: 'Banco Santander', ticker: 'SAN.MC', isin: 'ES0113900J37', mercado: 'Bolsa de Madrid (mercado continuo); ADS en la NYSE', indice_referencia: 'IBEX 35',
    pais: 'España', pais_iso: 'ES', sector: 'Financials', industria: 'Banks', sede: 'Santander (España)', fundacion: '1857', empleados: 186151, web: 'https://www.santander.com/es/accionistas-e-inversores',
    precio: 10.512, fecha_precio: '2026-10-29', acciones: ACC, capitalizacion_publicada: Math.round(10.512 * ACC), free_float_pct: 99.13,
    max_52s: 13.12, min_52s: 8.63, volumen_medio_diario: '≈ 269 M €/día (21,9 M de acciones, 3 meses)', proximos_resultados: '2027-02-03',
  },
  consenso: {
    guidance: 'Objetivos de 2026 (sin las compras): ingresos +MSD y costes a la baja en euros constantes, beneficio por encima de 14.100 M y CET1 del 12,8-13 % a fin de año; plan de 2028: RoTE > 20 %, beneficio > 20.000 M, eficiencia ≈ 36 %, BPA con crecimiento de doble dígito y reparto del 50 % del beneficio ordinario [A3, A4]. El 28-oct, con el 3T26, el banco dijo ir «holgadamente» camino de cumplir todos los objetivos de 2026 y reiteró el plan de 2028 [8]. Próximos resultados (4T26 y año): principios de febrero de 2027 (fecha sin confirmar; el 4T25 se publicó el 3-feb-2026).',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(san.trend[2].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(san.trend[2].bpa), dpa: null, fuente: `Yahoo Finance, ${san.trend[2].n} analistas, 30-oct-2026 [2]` },
      { periodo: '2027e', ingresos: Math.round(san.trend[3].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(san.trend[3].bpa), dpa: null, fuente: `Yahoo Finance, ${san.trend[3].n} analistas, 30-oct-2026 [2]` },
    ],
    recomendaciones: { n_analistas: 21, comprar: 16, mantener: 5, vender: 0, po_medio: r2(san.po_medio), po_min: san.po_min, po_max: san.po_max },
    revisiones: `El BPA de 2026 del consenso apenas cambia en 90 días (${r2(san.trend[2].bpa_hace90)} → ${r2(san.trend[2].bpa)} €) y el de 2027 sube un poco (${r2(san.trend[3].bpa_hace90)} → ${r2(san.trend[3].bpa)}) [2]. El BPA del 4T26 esperado es de ${r2(san.trend[0].bpa)} € (3 analistas; ${r2(san.trend[0].bpa_hace90)} hace 90 días). El 3T26 (0,26 € ordinario) superó el consenso en ≈ 2 céntimos. Recomendaciones: 6 compra fuerte, 10 comprar y 5 mantener; objetivo medio de ${r2(san.po_medio)} € (${san.n_analistas} analistas, ${san.po_min}-${san.po_max}; 13,85 € el 27-oct) [2]. En el ADS, objetivo medio de ${r2(adr.po_medio)} USD. Tras el 3T26, RBC reiteró «comprar» y AlphaValue/Baader subió a «añadir» [20]; Jefferies mantiene «Mantener» desde su rebaja del 26-oct y Erste rebajó el 30-oct [20].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: null,
    comentario: 'La acción ha ganado un 26,3 % anual a 5 años en precio frente al 15,8 % del IBEX 35 y el 20,7 % de la banca europea (EXV1) [1]; en 2025 subió un 125,6 % (de 4,46 a 10,07 €) con el RoTE al 16 % y las recompras, y en 2026 va en +4,4 % (máximo de 13,12 € el 13-ago; −20 % desde entonces) [1]. Beta mensual a 5 años de 1,20 frente al STOXX 600 (1,41 semanal) [1]. Rentabilidades de precio, sin dividendos (el IBEX y el STOXX no los llevan).',
    contexto: {
      movimiento: mov,
      movimientos_fuertes: [
        { periodo: '28-oct-2026', var_pct: -5.6, causa: 'Resultados del 3T26: el beneficio ordinario superó el consenso (3.848 M frente a ≈ 3.750 M), pero los ingresos quedaron ≈ 370 M por debajo de lo esperado y el margen de intereses en 11.830 M estatutarios frente a ≈ 12.000 M previstos; provisiones +22 % por Argentina; Brasil −15 % en euros con un coste del riesgo del 4,25 % (Santander Brasil −28 % en reales); CET1 del 12,7 % tras Webster, por debajo del rango de 12,8-13 % [17, 18, 21]. Fue propio del banco: el EURO STOXX Banks solo cedía un 0,6 % [19].', veredicto: 'no cambia', condicion: null },
        { periodo: '29-30-oct-2026', var_pct: -4.5, causa: '29-oct −1,2 %: la acción cotiza sin el dividendo a cuenta de 0,127 € (≈ −1,2 %), así que en la práctica se quedó plana; 30-oct ≈ −3 % a mediodía (10,17 €) (Erste Group rebajó la recomendación; sin otra causa confirmada en la prensa leída [20]) [1, 15].', veredicto: 'no cambia', condicion: null },
        { periodo: '26-oct-2026', var_pct: -3.1, causa: 'Reelección de Lula (25-oct): la banca brasileña cayó entre un 13 % y un 31 % en B3 y el real se depreció ≈ 7-9 % frente al euro [14]. Brasil pesa el 14 % del beneficio ordinario: la conversión a euros y una Selic alta más tiempo restan, y la oferta por Santander Brasil sube la exposición.', veredicto: 'no cambia', condicion: null },
        { periodo: '22-oct-2026', var_pct: -4.1, causa: 'Caída de la banca europea antes de los resultados del 3T26 y en la recta final de la campaña de Brasil (sin una causa propia localizada en las fuentes leídas) [1].', veredicto: 'no cambia', condicion: null },
        { periodo: '1-oct-2026', var_pct: -4.2, causa: 'Subida del bono español a 10 años (3,79 % → 4,17 % en un mes), temor a menos demanda de crédito y la primera vuelta en Brasil del 4-oct [12].', veredicto: 'no cambia', condicion: null },
        { periodo: '2/3-mar-2026', var_pct: -11.0, causa: 'Dos sesiones de −4,8 % y −6,4 % (sin causa propia localizada en las fuentes leídas; caída general de la banca) [1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jun-jul 2026 (+17,8 % en un mes al 7-jul)', var_pct: 17.8, causa: 'Recuperación tras marzo y antes de un 2T26 récord [1].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Resultados del 3T26: beneficio ordinario récord de 3.848 M (+19 %), RoTE ordinario del 16,8 % en el trimestre, CET1 del 12,7 % tras Webster; objetivos de 2026 y 2028 reiterados [8]. La acción cayó un 5,6 % ese día.', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-28', tipo: 'recompra', hecho: 'Fin de la recompra de 1.825 M (150,6 M de acciones, ≈ 1,03 % del capital, a amortizar) [16].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-28', tipo: 'resultados', hecho: 'Último día con derecho al dividendo a cuenta de 0,127 € (ex el 29-oct, pago el 2-nov) [15].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-20', tipo: 'fusión u oferta', hecho: 'Cierre de la compra de Webster: 329,8 M de acciones nuevas (2,2 %) y ≈ −150 p.b. de CET1 [9, 10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-07-30', tipo: 'fusión u oferta', hecho: 'Oferta de canje por el ≈ 10 % de Santander Brasil (hasta el 1,1 % del capital de SAN; registrada el 21-sep; cierre esperado en el 1S27) [6, 7].', veredicto: 'no cambia', condicion: null },

        { fecha: '2026-10-25', tipo: 'otros', hecho: 'Reelección de Lula en Brasil: bono a 10 años en reales del 12,98 % al 15,44 % el 26-oct [14].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2027-02-03',
      veredicto: 'no cambia',
      condicion: null,
      comentario: 'La acción ha caído un 14 % en un mes y un 20 % desde el máximo de agosto: bono español al alza, la reelección de Lula (26-oct) y la reacción a un 3T26 con más beneficio pero peor calidad (ingresos y margen de intereses por debajo de lo esperado, Brasil, Argentina y un CET1 del 12,7 %) [11, 12, 14, 17, 18]. Lo de Brasil afecta al 13 % del beneficio y al Ke (la prima de Brasil sube); el informe lo recoge en la sensibilidad del Ke (12,16 % con la prima de Brasil subida como su bono). Ninguna noticia cambia la conclusión, que ya es «no comprar» por calidad; la caída acerca el precio al valor intrínseco, pero no cambia la calidad. Próximos resultados en febrero de 2027.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: cierres.filter((c) => +c.anio >= 2021).map((c) => ({ anio: c.anio, precio_cierre: r2(c.precio_cierre), ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierre de SAN en Madrid (Yahoo) [1]. La historia que decide la regla a 12 meses es la del PER adelantado con el BPA ordinario (precio ÷ BPA del año siguiente): 5,4x (2020), 5,4x (2021), 4,3x (2022), 4,9x (2023), 5,3x (2024) y 10,0x (2025, sobre nuestro 2026e de 1,01). Hoy cotiza a ≈ 9,0x el BPA de 2027e y a 1,78 veces el valor tangible de septiembre: casi el doble de su múltiplo de 2020-2024, cuando la banca europea cotizaba con tipos negativos o cero.',
    confianza: 'Media',
  },
  comparables: {
    criterio: `Bancos cotizados de España, la zona euro y el Reino Unido con datos de Yahoo del 30-oct-2026 [2]. Para bancos solo tienen sentido el PER, el P/VC y el ROE: EV/EBITDA, margen EBITDA, DN/EBITDA y FCF quedan vacíos; el campo «ROIC» lleva el ROE. Los británicos cotizan en peniques: sin capitalización en euros (no se convierte). Mediana del PER adelantado: ${String(medPer).replace('.', ',')}x.`,
    empresas: empresasComp,
    comentario: `Santander cotiza a ${r1(san.per_adelantado)}x el BPA adelantado de Yahoo y a ${r2(san.pvc)}x el valor contable (ROE del ${r1(100 * san.roe)} %) [2]. Está algo por debajo de la mediana de los trece (${String(medPer).replace('.', ',')}x) y de los españoles domésticos (BBVA ${r1(q('BBVA.MC').per_adelantado)}x, CaixaBank ${r1(q('CABK.MC').per_adelantado)}x, Bankinter ${r1(q('BKT.MC').per_adelantado)}x), que tienen más ROE (16-19 %) y menos América Latina, y por encima de BNP (${r1(q('BNP.PA').per_adelantado)}x) y Barclays (${r1(q('BARC.L').per_adelantado)}x). Frente a sus pares no está caro para su ROE; frente a su coste del capital con la prima por país (RoTE − Ke ≈ 4,2 en 9M26), sí.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-02', objetivo: 'Webster Financial (EE. UU.)', comprador: 'Banco Santander', ev: 10724, ev_ventas: null, ev_ebitda: null, prima_pct: 16.0, excluir: false, comentario: '48,75 USD en efectivo + 2,0548 ADS por acción; contraprestación final de 12.509 M USD (10.724 M €; 65 % en efectivo y 35 % en acciones) [A1]; ≈ 1,95 veces su valor tangible (38,81 USD); ROATCE de Webster del 16,7 % [10, A11]. −147 p.b. de CET1 [A1].' },

      { fecha: '2025-07', objetivo: 'TSB (Reino Unido)', comprador: 'Banco Santander (a Banco Sabadell)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Cerrada el 30-abr-2026; −55 p.b. de CET1; ≥ 400 M £ de sinergias de costes [A1, A4].' },
      { fecha: '2026-07', objetivo: 'Santander Brasil (≈ 10 % de minoritarios)', comprador: 'Banco Santander (canje por acciones propias)', ev: 1908, ev_ventas: null, ev_ebitda: null, prima_pct: 15.0, excluir: false, comentario: '0,4056 acciones SAN por unit; ≈ 1,1 veces el valor contable de la filial [6].' },
      { fecha: '2025-05', objetivo: 'Santander Bank Polska (49 %)', comprador: 'Erste Group (venta)', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Cerrada el 9-ene-2026; plusvalía neta de 1.895 M; ≈ 50 % del capital liberado a recompras (3.200 M) [A4].' },
    ],
    comentario: 'Las operaciones del año son del propio Santander: compra bancos con fondo de comercio (Webster a ≈ 1,95 veces su valor tangible) y vende Polonia con plusvalía. No dan un múltiplo de control para valorar al grupo: peso 0 en el valor intrínseco.',
    confianza: 'Media',
  },
  fuentes: fD,
  huecos: [
    { seccion: 'bolsa', campo: 'posición corta', tipo: 'Complemento', intentos: '1) Yahoo (no la da para SAN.MC); 2) CNMV posiciones cortas (no consultada por tiempo); 3) prensa', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'precio de TSB', tipo: 'Complemento', intentos: '1) informe financiero del 2T26 (no da el precio); 2) nota de prensa; 3) prensa (no buscada por tiempo)', decision: 'Omitido' },
  ],
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Banco Santander ante el duelo Lula-Bolsonaro: ¿qué escenario favorece más al banco?', editor: 'Estrategias de Inversión', tipo: 'Foros y redes', fecha: '2026-10-06', url: 'https://www.estrategiasdeinversion.com/actualidad/noticias/bolsa-espana/banco-santander-ante-el-duelo-lula-bolsonaro-que-n-957101' },
  { id: 2, titulo: 'Santander, BBVA y CaixaBank afrontan octubre de 2026 con resultados, dividendos y tipos', editor: 'DailyForex', tipo: 'Foros y redes', fecha: '2026-10-03', url: 'https://es.dailyforex.com/stock-market-today/2026/10/santander-bbva-y-caixabank-afrontan-octubre-2026-con-resultados-dividendos-ytipos/250330' },
];
const E = {
  _estado: 'Parcial: lectura de prensa de inversión para particulares; sin foros (Rankia, Reddit, Stocktwits) en el tiempo del análisis.',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Estrategias de Inversión (análisis para particulares)', fecha: '2026-10', n_comentarios: null, tono: 'Dividido', resumen: 'Brasil como el riesgo del otoño: una victoria de Bolsonaro se veía mejor para Santander; con Lula, tipos altos más tiempo [1].' },
      { plataforma: 'DailyForex (análisis técnico y de dividendos)', fecha: '2026-10', n_comentarios: null, tono: 'Positivo', resumen: 'Dividendo a cuenta de 0,127 € (+10 %) y objetivo medio al alza (13,34 €), con la caída de octubre leída como técnica y de tipos [2].' },
    ],
    temas: [
      { tema: 'Remuneración al accionista (dividendo + recompras ≈ 50 % del beneficio)', postura: 'Alcista', peso: 'Alto', contraste: 'Cierto: 6.900 M de recompras en 2026 [A1].' },
      { tema: 'Brasil y la reelección de Lula', postura: 'Bajista', peso: 'Alto', contraste: 'Brasil es el 14 % del beneficio; el efecto en el Ke es de ≈ 0,3 puntos [P1].' },
      { tema: 'Plan de 2028 (RoTE > 20 %)', postura: 'Alcista', peso: 'Medio', contraste: 'Ambicioso frente al 15,6 % de hoy; el informe lo deja en el alcista.' },
    ],
    lectura: 'El consenso de analistas y la prensa son mayoritariamente positivos (16 de 21 en comprar). La diferencia con este informe está en el coste del capital: con la prima por país ponderada, el RoTE del 15,6 % apenas supera el Ke por 3,5 puntos. No aporta riesgos que el informe no recoja.',
    confianza: 'Baja',
  },
  fuentes: fE,
  huecos: [{ seccion: 'sentimiento', campo: 'foros de inversores (Rankia, Reddit, Stocktwits)', tipo: 'Complemento', intentos: '1) Rankia (no probado por tiempo); 2) Reddit (403 habitual); 3) prensa para particulares (usada)', decision: 'Omitido' }],
};
// guarda('E', E); — la nota E la escribe el subagente E en esta iteración
console.log('Notas A, B y D escritas; mediana PER comparables', medPer);
