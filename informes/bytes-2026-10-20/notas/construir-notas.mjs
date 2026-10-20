// Escribe las notas A-E de Bytes Technology Group (corte 2026-10-20) a partir de los documentos de notas/docs
// (ESEF de filings.xbrl.org, RNS de Investegate, presentación HY27), de cuentas-xbrl.json y de bolsa.json.
// Cada nota cita solo con [n] de su propia lista de fuentes. Millones de GBP; precio y BPA en GBP.
// Ejecutar: node informes/bytes-2026-10-20/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const INV = 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit';
const ESEF = 'https://filings.xbrl.org/213800LA4DZLFBAC9O33';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report and Accounts 2025/26 (ejercicio a 28-feb-2026; ESEF): cuentas, notas 2-4, 11, 23, 27, revisión financiera, riesgos', editor: 'Bytes Technology Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2026-05-11', url: `${ESEF}/2026-02-28/ESEF/GB/0/213800LA4DZLFBAC9O33-2026-02-28/reports/213800LA4DZLFBAC9O33-2026-02-28-T01.xhtml` },
  { id: 2, titulo: 'Annual Report and Accounts 2024/25 (ejercicio a 28-feb-2025; ESEF)', editor: 'Bytes Technology Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2025-05-20', url: `${ESEF}/2025-02-28/ESEF/GB/0/213800LA4DZLFBAC9O33-2025-02-28/reports/213800LA4DZLFBAC9O33-2025-02-28-T01.xhtml` },
  { id: 3, titulo: 'Annual Report and Accounts 2023/24 (ejercicio a 29-feb-2024; ESEF)', editor: 'Bytes Technology Group plc (filings.xbrl.org)', tipo: 'Primaria', fecha: '2024-05-21', url: `${ESEF}/2024-02-29/ESEF/GB/0/213800LA4DZLFBAC9O33-2024-02-29/reports/213800LA4DZLFBAC9O33-2024-02-29-T01.xhtml` },
  { id: 4, titulo: 'Preliminary Results FY23 (ejercicio a 28-feb-2023), con el FY22 reexpresado (software como agente: −302 M de ventas y coste)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2023-05-23', url: 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit/preliminary-results/7538129' },
  { id: 5, titulo: 'Interim Results HY27 (seis meses a 31-ago-2026): cuenta, balance, flujos, BPA, guía FY27, Microsoft, CyberOne', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/interim-results/9819138` },
  { id: 6, titulo: 'Results for the six months ended 31 August 2026 (presentación a analistas)', editor: 'Bytes Technology Group plc', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/10/btg-hy27-results-presentation.pdf' },
  { id: 7, titulo: 'Interim Results HY26 (seis meses a 31-ago-2025)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2025-10-14', url: `${INV}/interim-results/9168725` },
  { id: 8, titulo: 'Audited Results FY26 (12-may-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-05-12', url: `${INV}/audited-results/9562912` },
  { id: 9, titulo: 'XBRL ESEF de los ejercicios FY2021-FY2026 (herramienta cuentas.mjs sobre filings.xbrl.org)', editor: 'filings.xbrl.org', tipo: 'Primaria', fecha: '2026-10-20', url: `${ESEF}/` },
  { id: 10, titulo: 'Total Voting Rights (230.109.146 acciones tras la recompra)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: `${INV}/total-voting-rights/9800150` },
];

// FY2022 reexpresado [4]; FY2023-FY2026 del XBRL [9] comprobado con las cuentas [1-3]. D&A = depreciación de inmovilizado
// + derechos de uso + amortización de intangibles comprados y de software propio (nota 4) [1-4].
// DPA por devengo: a cuenta + complementario ordinario; el extraordinario va aparte (dpa incluye los dos) [1-4].
const C = {
  FY2022: { ingresos: 145.8, coste_ventas: 38.4, gg: 65.2, amort: 2.61, ebit: 42.2, rf: -0.6, bai: 41.6, imp: 8.7, bn: 32.9, gf: 0.6, bpa: 0.1342, ord: 0.062, ext: 0.062, acc: 244.9 },
  FY2023: { ingresos: 184.4, coste_ventas: 54.8, gg: 78.7, amort: 2.48, ebit: 50.9, rf: -0.5, bai: 50.4, imp: 10.0, bn: 40.4, gf: 0.5, bpa: 0.1628, ord: 0.075, ext: 0.075, acc: 248.2 },
  FY2024: { ingresos: 207.0, coste_ventas: 61.2, gg: 89.1, amort: 2.38, ebit: 56.7, rf: 4.9, bai: 61.6, imp: 14.7, bn: 46.9, gf: 0.4, bpa: 0.1885, ord: 0.087, ext: 0.087, acc: 248.5 },
  FY2025: { ingresos: 217.1, coste_ventas: 53.9, gg: 96.8, amort: 2.64, ebit: 66.4, rf: 8.2, bai: 74.6, imp: 19.8, bn: 54.8, gf: 0.3, bpa: 0.2195, ord: 0.100, ext: 0.100, acc: 249.8 },
  FY2026: { ingresos: 220.6, coste_ventas: 53.3, gg: 104.6, amort: 3.11, ebit: 62.7, rf: 7.1, bai: 69.8, imp: 18.6, bn: 51.3, gf: 0.3, bpa: 0.2074, ord: 0.102, ext: 0, acc: 247.2 },
};
const r1 = (x) => Math.round(x * 10) / 10;
const cuenta = Object.entries(C).map(([p, c]) => ({
  periodo: p, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gg, ebitda: r1(c.ebit + c.amort), amortizaciones: c.amort,
  ebit: c.ebit, resultado_financiero: c.rf, bai: c.bai, impuestos: c.imp, minoritarios: 0, beneficio_neto: c.bn, gastos_financieros: c.gf,
  participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: r1((c.ord + c.ext) * 1000) / 1000, dpa_extraordinario: c.ext, acciones_diluidas: c.acc,
}));
const PN = { FY2022: 47.5, FY2023: 61.5, FY2024: 78.3, FY2025: 98.0, FY2026: 81.1 };
const INT = { FY2022: 42.8, FY2023: 41.5, FY2024: 40.6, FY2025: 43.5, FY2026: 46.5 };
const balance = X.balance.historico.filter((b) => PN[b.periodo]).map((b) => {
  const o = { ...b, fondo_comercio: 37.5, intangibles: r1(INT[b.periodo] - 37.5), deuda_financiera: 0, patrimonio_neto: PN[b.periodo], minoritarios: 0 };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => PN[f.periodo]).map((f) => {
  const o = { ...f, adquisiciones: f.adquisiciones ?? 0, desinversiones: 0, recompras: f.periodo === 'FY2026' ? 25.2 : (f.recompras ?? 0), intereses_en_financiacion: 0 };
  if (f.periodo === 'FY2025') o.capex = 10.1;
  delete o.fin; return o;
});

const A = {
  _estado: 'completa',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM ago-26', fecha_fin: '2026-08-31', ingresos: 240.8, ebitda: 68.5, ebit: 64.9, beneficio_neto: 52.2, bpa: 0.2144, dpa: 0.103, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Los ingresos contables de Bytes no miden la actividad: desde el FY2023 todo el software se contabiliza como agente (neto) y el hardware y los servicios propios como principal (bruto), así que las ventas mezclan beneficio bruto y facturación [4, 1]. El FY2022 va reexpresado (145,8 M en vez de 447,9 M; beneficio bruto y resultado sin cambios) y el FY2021 no se usa porque no hay cifra reexpresada [4]. La medida de actividad es el beneficio bruto: 107,4 M en el FY2022, 129,6 M en el FY2023, 145,8 M en el FY2024, 163,3 M en el FY2025 y 167,3 M en el FY2026 (+11,7 % anual), sobre una facturación bruta (GII) que pasó de 1.208 a 2.341 M [4, 3, 2, 1]. El FY2026 fue el primer año de caída del resultado operativo (−5,6 %, a 62,7 M): el beneficio bruto solo creció un 2,5 % por el recorte de incentivos de Microsoft en los acuerdos de empresa (EA) desde el 1-ene-2025 y la reorganización comercial del sector privado, mientras los gastos de personal subían un 5,1 % [1]. El primer semestre del FY2027 vuelve a crecer: beneficio bruto +17,8 % y resultado operativo +6,6 %, con 4,5 M de «normalización de costes» (bonus, pagos en acciones, software que se deja de activar) [5].',
    ajustes: 'Cifras publicadas. La empresa da un «resultado operativo ajustado» que suma los pagos en acciones y la amortización de intangibles comprados (72,4 M en el FY2025, 63,3 M en el FY2024) y un BPA ajustado para su plan de incentivos (22,64 peniques en el FY2026) [2, 3, 1]; no los usamos. En el FY2026 los pagos en acciones bajaron a 0,75 M (5,05 M en el FY2025) porque los planes no se cumplieron, lo que infló el resultado; en el FY2027 vuelven, y la empresa lo incluye en los 4,5 M de normalización [1, 5]. Se activaron 4,1 M de desarrollo de software en el FY2026 (3,7 M en el FY2025), que desde el FY2027 se amortizan [1].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 105.5, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 36.9, margen_ebitda_pct: 35.0, bpa: 0.1219, vs_consenso: null },
      { periodo: '2S25', ingresos: 111.6, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: 32.1, margen_ebitda_pct: 28.8, bpa: 0.0976, vs_consenso: 'En línea' },
      { periodo: '1S26', ingresos: 108.1, crecimiento_pct: 2.5, crecimiento_organico_pct: 2.5, ebitda: 34.5, margen_ebitda_pct: 31.9, bpa: 0.1162, vs_consenso: 'Inferior' },
      { periodo: '2S26', ingresos: 112.5, crecimiento_pct: 0.8, crecimiento_organico_pct: 0.8, ebitda: 31.3, margen_ebitda_pct: 27.8, bpa: 0.0912, vs_consenso: 'En línea' },
      { periodo: '1S27', ingresos: 128.3, crecimiento_pct: 18.7, crecimiento_organico_pct: 18.7, ebitda: 37.2, margen_ebitda_pct: 29.0, bpa: 0.1232, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'En la presentación del 13-oct-2026 la dirección cambió de tono frente a la de mayo: del «año de transición» y la normalización de costes a «crecimiento amplio» en los dos sectores (beneficio bruto público +23,1 %, privado +14,6 %) y con Microsoft creciendo «en línea con el grupo» [5, 6]. Mensajes: la guía del FY2027 subió el 17-sep (beneficio bruto +10-15 %, resultado operativo +1-5 %); los nuevos cambios de incentivos de Microsoft desde octubre (menos rebaja en productos antiguos, más premio en productos de crecimiento y en CSP) «están planificados e incluidos en la guía»; el resultado operativo crecerá en línea con el beneficio bruto desde el FY2028; y la compra de CyberOne (19,4 M iniciales y hasta 18 M variables) da a Bytes su propio centro de operaciones de seguridad [5, 6]. Lo que no se cuantificó: cuánto beneficio bruto depende de las rebajas y comisiones de Microsoft, el efecto neto de los cambios de octubre y por qué el margen de servicios cayó del 24 % al 19 % [5]. El segmento de grandes empresas, «aún centrado en acuerdos EA», avanza «más despacio» [5]. En mayo (resultados FY2026) la dirección había atribuido la caída del resultado a los «conocidos» cambios de incentivos de Microsoft [8].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja de 68,4 M a 31-ago-2026 (98,6 M a 28-feb-2026), sin deuda financiera, y una línea de crédito comprometida de 30 M con HSBC sin disponer, prorrogada en mayo de 2026 hasta el 17-may-2029 [5, 1].',
    rating: 'Sin rating',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda ni pensiones de prestación definida. El circulante es muy negativo: cuentas a cobrar de 299,9 M y a pagar de 359,2 M a 28-feb-2026 (circulante neto −79,8 M según la empresa), porque se cobra a 38-39 días y se paga a 43-48, con el 66-70 % de la facturación al sector público, que paga rápido [1, 5]. A 31-ago-2026 el circulante era de −54,6 M: es estacional (los grandes EA de Microsoft se renuevan en marzo-abril) [5]. Tras el cierre del semestre, CyberOne: 19,4 M en caja al completar (previsto antes de fin de octubre) y hasta 18,0 M de pagos variables en 16 meses [5]. Arrendamientos de 2,1 M [5]. Participación del 25,1 % en Cloud Bridge Technologies (3,0 M) [1].',
    comentario: 'El balance de Bytes es el de un intermediario que financia su actividad con los proveedores: la caja (98,6 M en febrero) es menor que el circulante negativo (−79,8 M), y la empresa dice que «tiene en cuenta» ese circulante para decidir cuánta caja guardar [1]. Por eso la caja «libre» es menor de lo que parece: si la facturación cayera o Microsoft acortara plazos de pago, parte de ella se iría. La caja bajó de 113,1 a 98,6 M en el FY2026 tras repartir 48,6 M de dividendos y recomprar 25,2 M, y a 68,4 M en agosto tras otro dividendo de 16,3 M y otra recompra de 25 M [1, 5].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión en caja es alta: el flujo operativo menos inversiones fue de 65,9 M en el FY2026 (105 % del resultado operativo) y de 75,5 M en el FY2025 (114 %) [1]. El flujo operativo publicado incluye los intereses cobrados (7,6 M en el FY2026) y resta los impuestos [1]. El primer semestre siempre convierte poco (46 % en el HY27, 34 % en el HY26) porque se pagan a Microsoft las renovaciones de marzo-abril; en doce meses a agosto pasó del 100 % [5]. La inversión es mínima: 1,8 M de inmovilizado y 4,1 M de software propio en el FY2026; el pico de 10,1 M del FY2025 fue la compra de oficinas [1, 2]. No hay capex de crecimiento relevante: el crecimiento lo financian los proveedores (circulante negativo).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP',
    anios_auditor: 6,
    opinion: 'Favorable',
    comentario: 'Cuentas sencillas: sin deuda, sin pensiones y con un fondo de comercio de 37,5 M (Phoenix y Bytes Software Services) sin deterioros [1]. Los dos juicios contables relevantes son el reconocimiento como agente o principal (cambió en el FY2023 por la decisión del Comité de Interpretaciones de las NIIF; recortó 302 M de ventas del FY2022 sin tocar el beneficio) y la activación de 4,1 M de software propio en el FY2026 [4, 1]. El resultado del FY2026 está favorecido por 4,3 M menos de pagos en acciones y por esa activación; ambas cosas se revierten en el FY2027 [1, 5]. La gran señal de gobierno contable fue la salida del consejero delegado Neil Murphy en febrero de 2024 por operaciones con acciones no comunicadas, que obligó a corregir las participaciones declaradas desde la salida a bolsa [3].',
    senales: [
      { senal: 'Operaciones con acciones no comunicadas del anterior consejero delegado (2024)', nivel: 'Media', comentario: 'Neil Murphy dimitió el 21-feb-2024; se reexpresaron sus participaciones desde 2020 [3]. Sin efecto en cuentas, pero dice algo de los controles de entonces.' },
      { senal: 'Resultado del FY2026 con pagos en acciones anormalmente bajos', nivel: 'Baja', comentario: '0,75 M frente a 5,05 M del FY2025; vuelven en el FY2027 [1, 5].' },
      { senal: 'Activación de costes de desarrollo propio', nivel: 'Baja', comentario: '4,1 M en el FY2026 y 3,7 M en el FY2025; terminó en el FY2027 y ahora se amortiza [1, 5].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo ordinario del 40-50 % del beneficio después de impuestos sin extraordinarios, a cuenta (3,3 peniques en el HY27) y complementario (7,0 peniques del FY2026) [5, 1]. El exceso de caja se devuelve con dividendos extraordinarios (6,2, 7,5, 8,7 y 10,0 peniques del FY2022 al FY2025) o recompras: 25 M en el FY2026 y otros 25 M terminados en agosto de 2026, amortizando las acciones [1, 5]. Prioridades declaradas: crecimiento orgánico, dividendo, compras (CyberOne) y devolución del exceso [6].',
    adquisiciones: [
      { anio: '2026', objetivo: 'CyberOne (servicios gestionados de ciberseguridad, Reino Unido; 9,5 M de ingresos a jul-26)', importe: 19.4, ev_ebitda: null, financiacion: 'Caja (más hasta 18,0 M variables en 16 meses)', resultado: 'Pendiente de autorización (NSI Act) a fin de octubre; la empresa espera que aumente el BPA desde el FY2028 [5].' },
      { anio: '2023', objetivo: '25,1 % de Cloud Bridge Technologies', importe: 3.0, ev_ebitda: null, financiacion: 'Caja', resultado: 'Pérdida atribuida de 0,2 M en el FY2026; valor contable 3,0 M [1].' },
      { anio: '2017', objetivo: 'Phoenix Software (en tiempos de Altron)', importe: null, ev_ebitda: null, financiacion: 'Altron', resultado: 'Hoy es la mitad pública del grupo; fondo de comercio de 22,7 M sin deterioros [1].' },
    ],
    comentario: 'Asignación de capital disciplinada y casi toda en efectivo para el accionista: en el FY2026 devolvió 74 M (48,6 M de dividendos y 25,2 M de recompra), más que el flujo libre de 65,9 M, y en el HY27 otros 41,3 M [1, 5]. El crecimiento no consume capital. La primera compra relevante en años, CyberOne, se paga a un múltiplo alto sobre ventas (≈ 2 veces las ventas con el pago inicial y hasta ≈ 3,9 veces con el variable completo) por un negocio de 9,5 M de ingresos [5]: es pequeña frente a la caja, pero marca el giro a servicios. Las recompras se hicieron a 3-4 libras, por debajo del precio de hoy.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Software', descripcion: 'Licencias, suscripciones y nube (Microsoft ≈ 50 % del beneficio bruto); ingresos como agente', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 130.4, resultado: null }, { periodo: 'FY2025', ingresos: 146.0, resultado: null }, { periodo: 'FY2026', ingresos: 145.2, resultado: null }] },
      { nombre: 'Hardware', descripcion: 'Servidores, portátiles y dispositivos; ingresos brutos', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 41.4, resultado: null }, { periodo: 'FY2025', ingresos: 33.2, resultado: null }, { periodo: 'FY2026', ingresos: 31.3, resultado: null }] },
      { nombre: 'Servicios propios', descripcion: 'Consultoría y servicios gestionados con personal propio; ingresos brutos', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 31.5, resultado: null }, { periodo: 'FY2025', ingresos: 34.0, resultado: null }, { periodo: 'FY2026', ingresos: 39.3, resultado: null }] },
      { nombre: 'Servicios de terceros', descripcion: 'Formación y consultoría subcontratadas; ingresos como agente', tipo_resultado: null, historico: [{ periodo: 'FY2024', ingresos: 3.7, resultado: null }, { periodo: 'FY2025', ingresos: 3.9, resultado: null }, { periodo: 'FY2026', ingresos: 4.8, resultado: null }] },
    ],
    geografias: [{ nombre: 'Reino Unido', peso_pct: 96.1 }, { nombre: 'Europa', peso_pct: 2.3 }, { nombre: 'Resto del mundo', peso_pct: 1.6 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Facturación bruta (GII)', valor_anterior: '2.099,8 M (FY2025)', valor_actual: '2.341,0 M (FY2026); 1.605,2 M en el HY27', variacion: '+11,5 %; HY27 +19,6 %', comentario: 'Volumen de compra de los clientes [1, 5]' },
      { kpi: 'Beneficio bruto', valor_anterior: '163,3 M (FY2025)', valor_actual: '167,3 M (FY2026); 97,1 M en el HY27', variacion: '+2,5 %; HY27 +17,8 %', comentario: 'La medida de actividad que usa la empresa [1, 5]' },
      { kpi: 'Beneficio bruto / GII', valor_anterior: '7,8 % (FY2025); 8,0 % (FY2024); 9,0 % (FY2023)', valor_actual: '7,1 % (FY2026); 6,0 % (HY27)', variacion: '−0,7 puntos', comentario: 'Cae por el paso de EA a CSP y los recortes de incentivos de Microsoft [1, 5]' },
      { kpi: 'Resultado operativo / beneficio bruto', valor_anterior: '40,7 % (FY2025)', valor_actual: '37,5 % (FY2026); 36,4 % (HY27)', variacion: '−3,2 puntos', comentario: 'Eficiencia operativa [1, 5]' },
      { kpi: 'Tasa de renovación (beneficio bruto de clientes existentes / total del año anterior)', valor_anterior: '109 % (FY2025)', valor_actual: '99 % (FY2026); 115,7 % (HY27)', variacion: '−10 puntos; repunte en el HY27', comentario: '[1, 5]' },
      { kpi: 'Clientes (más de 100 GBP de beneficio bruto)', valor_anterior: '5.913', valor_actual: '5.916', variacion: 'plano', comentario: 'Beneficio bruto medio por cliente 28.300 GBP [1]' },
      { kpi: 'Plantilla', valor_anterior: '1.245 (feb-25)', valor_actual: '1.331 (feb-26); 1.353 (ago-26)', variacion: '+7 %', comentario: '[1, 5]' },
    ],
  },
  huecos: [
    { seccion: 'balance', campo: 'vencimientos', tipo: 'Complemento', intentos: '1) Nota de deuda del informe anual: no hay deuda; 2) RNS HY27: línea de 30 M sin disponer; 3) no aplica', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Annual Report and Accounts 2025/26: mercado direccionable de ≈ 82.000 M GBP, cuota ≈ 3 %, Microsoft 68 % de la GII y 50 % del beneficio bruto, riesgos', editor: 'Bytes Technology Group plc', tipo: 'Primaria', fecha: '2026-05-11', url: `${ESEF}/2026-02-28/ESEF/GB/0/213800LA4DZLFBAC9O33-2026-02-28/reports/213800LA4DZLFBAC9O33-2026-02-28-T01.xhtml` },
  { id: 2, titulo: 'Interim Results HY27: Microsoft ≈ la mitad del beneficio bruto, cambios de incentivos de octubre de 2026, CyberOne, IA', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/interim-results/9819138` },
  { id: 3, titulo: 'Presentación HY27 (canal frente a venta directa, servicios, IA)', editor: 'Bytes Technology Group plc', tipo: 'Primaria', fecha: '2026-10-13', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/10/btg-hy27-results-presentation.pdf' },
  { id: 4, titulo: 'Gartner: gasto mundial en software de 1,44 billones USD en 2026 (+15,1 %)', editor: 'SaaStr (resumen de Gartner)', tipo: 'Sectorial', fecha: '2026-07-20', url: 'https://www.saastr.com/gartner-software-spend-now-1-44-trillion-in-2026-revised-back-up-to-15-1-the-slowdown-never-came-are-you-grabbing-it/' },
  { id: 5, titulo: "I designed Microsoft's $5B EA channel architecture in 2001. The 2026 transition is missing what made it work (comisiones LSP de EA: 2.500 M USD en 2023, 1.670 en 2024, 583 en 2025, cero en 2026; investigación SMS de la CMA)", editor: 'The Register', tipo: 'Prensa', fecha: '2026-06-01', url: 'https://www.theregister.com/os-platforms/2026/06/01/i-designed-microsofts-5b-ea-channel-architecture-in-2001-the-2026-transition-is-missing-what-made-it-work/5248235' },
  { id: 6, titulo: 'Yahoo Finance quoteSummary: ventas de los últimos 12 meses y margen operativo de Softcat, Computacenter, CDW, Bechtle, Insight, Cancom y Atea (tomado del expediente de Computacenter del 20-oct-2026)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SCT.L/' },
  { id: 7, titulo: 'Bytes Technology To Acquire UK-based CyberOne (mercado británico de servicios de ciberseguridad ≈ 5.200 M GBP en 2029)', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://www.rttnews.com/3698414/bytes-technology-to-acquire-uk-based-cyberone-for-initial-19-4-mln-in-cash-shares-down.aspx' },
  { id: 8, titulo: 'Bytes plunges as profit warning spooks market (julio de 2025)', editor: 'BusinessDay', tipo: 'Prensa', fecha: '2025-07-02', url: 'https://www.businessday.co.za/bd/companies/telecoms-and-technology/2025-07-02-bytes-plunges-as-profit-warning-spooks-market' },
  { id: 9, titulo: 'Preliminary Results FY23 (Microsoft: 65 % de la GII y más del 50 % del beneficio bruto; ningún cliente supera el 5 % de la GII)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2023-05-23', url: 'https://www.investegate.co.uk/announcement/rns/bytes-technology-group--byit/preliminary-results/7538129' },
];
const B_ = {
  _estado: 'completa',
  negocio: {
    descripcion: 'Bytes Technology Group (BTG) vende y gestiona software, nube, ciberseguridad y algo de hardware a unas 5.900 organizaciones del Reino Unido e Irlanda, a través de dos filiales: Bytes Software Services (sector privado) y Phoenix Software (sector público: NHS, ministerios, universidades), alineadas así desde julio de 2026 [2, 1]. Factura 2.341 M GBP al año (GII), el 95 % software; Microsoft supone el 68 % de la facturación y el 50 % del beneficio bruto, y el resto se reparte entre más de 40 fabricantes (Check Point, CrowdStrike, Zscaler, Palo Alto, Dell, HPE, AWS…) [1, 2]. Añade asesoría de licencias, herramientas propias de gestión de activos de software (Quantum, License Dashboard) y servicios técnicos y gestionados, que son la apuesta de crecimiento (GII de servicios +41 % en el HY27) [2].',
    como_gana_dinero: 'Cobra un margen sobre lo que el cliente compra a los fabricantes más las rebajas e incentivos que estos pagan por vender, renovar y desplegar: el beneficio bruto fue el 7,1 % de la facturación en el FY2026 (13,0 % en el sector privado y 4,1 % en el público) [1]. Microsoft paga una comisión directa en los acuerdos de empresa (EA, que factura Microsoft) y un margen cuando Bytes factura en el programa CSP; los cambios de esos incentivos mueven el beneficio sin que la empresa los controle [1, 2]. El 97-98 % del beneficio bruto viene de clientes del año anterior y ninguno pesa más del 1 % [1, 2]. El coste es casi todo personal (82 M de 105 M de gastos en el FY2026), con comisiones que suben con el beneficio bruto, así que el apalancamiento operativo es moderado [1]. Estacionalidad: marzo-abril (fin del año fiscal público) y junio y diciembre concentran las renovaciones [1].',
    clientes: 'Unas 5.916 organizaciones con más de 100 GBP de beneficio bruto; beneficio bruto medio de 28.300 GBP por cliente; ninguno supera el 1 % del beneficio bruto [1]. El sector público es el 70 % de la facturación y el 40 % del beneficio bruto (HY27) [2]. Los contratos públicos se ganan por concurso en marcos de compra y duran 3-5 años; el privado renueva EA de tres años o suscripciones CSP [1, 2]. Tasa de renovación del 99 % en el FY2026 y del 115,7 % en el HY27 [1, 2]. Poder de precios: limitado; los precios los fija el fabricante y el margen sobre facturación ha bajado del 9,0 % (FY2023) al 6,0 % (HY27) [1, 2]. Lo que sí demuestra es retención y venta cruzada: el beneficio bruto creció un 11,7 % anual entre el FY2022 y el FY2026.',
  },
  sector: {
    definicion: 'El mercado relevante es el gasto en software, nube, seguridad y servicios asociados de empresas y Administraciones del Reino Unido e Irlanda que pasa por revendedores con valor añadido. Bytes cifra su mercado direccionable en ≈ 82.000 M GBP (FY2026) y su cuota en ≈ 3 % (medida con su facturación bruta) [1]. No hay estadística oficial de ese perímetro; como contraste del crecimiento usamos la previsión de Gartner del gasto mundial en software (+15,1 % en 2026) [4]. La cuota se mide en facturación bruta, no en ingresos contables.',
    tamano: '≈ 82.000 M GBP de mercado direccionable en el FY2026 según la empresa [1]; el gasto mundial en software crece un 15,1 % en 2026 hasta 1,44 billones USD según Gartner [4].',
    unidad_serie: 'millones de GBP (mercado direccionable según la empresa)',
    serie: [{ anio: '2026', tamano: 82000 }],
    tcac_historico_pct: null,
    tcac_previsto_pct: 8.0,
    cr5_pct: null,
    estructura: 'Fragmentada',
    drivers: [
      { driver: 'Migración a la nube y suscripciones', efecto: '+', horizonte: 'Estructural', evidencia: 'GII de software +18,8 % en el HY27; Gartner: software +15,1 % en 2026 [2, 4].' },
      { driver: 'Ciberseguridad', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado británico de servicios de ciberseguridad ≈ 5.200 M GBP en 2029; «donde más crecen los presupuestos» [7, 2].' },
      { driver: 'IA (Copilot y consumo)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Copilot para ≈ 500.000 empleados del NHS; pero la IA se cobra por consumo y los nuevos proveedores venden directo o por marketplaces [2].' },
      { driver: 'Incentivos de Microsoft al canal', efecto: '−', horizonte: 'Estructural', evidencia: 'Comisiones LSP de EA: 2.500 M USD en 2023 → 583 M en 2025 → cero en 2026 según The Register; recortes en Bytes desde el 1-ene-2025 y nuevos cambios en octubre de 2026 [5, 2].' },
      { driver: 'Gasto público británico', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Público = 70 % de la GII; beneficio bruto público +23,1 % en el HY27 [2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'Softcat, Computacenter, CDW UK, SoftwareOne-Crayon y decenas de socios de Microsoft compiten por los mismos marcos públicos y renovaciones; margen público del 3,5-4,1 % de la facturación [1, 2].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Clientes atomizados (ninguno > 1 % del beneficio bruto), pero el sector público compra por concurso y presiona el margen [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 5, justificacion: 'Microsoft (50 % del beneficio bruto) fija precios e incentivos cada año y ha recortado los de EA desde 2025 [1, 5].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hacen falta acreditaciones de los fabricantes (22 especializaciones de Microsoft), marcos públicos y relaciones de años [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Venta directa del fabricante a grandes clientes (MCA-E de Microsoft), marketplaces de nube y proveedores de IA que venden directo [5, 2].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en software y seguridad sigue creciendo por encima del de TI (Gartner +15,1 % en software en 2026) y Bytes volvió a crecer a doble dígito en el HY27 tras un FY2026 plano [4, 2]. El negocio es poco cíclico: en 2020 y 2022 Bytes siguió creciendo (beneficio bruto +20,7 % en el FY2023), porque las licencias se renuevan por obligación [9]. Lo que sí le golpeó fue un factor no cíclico: el recorte de incentivos de Microsoft en 2025, que dejó el beneficio bruto plano un año [1].' },
    regulacion: 'La CMA británica abrió el 14-may-2026 una investigación de «estatus de mercado estratégico» (SMS) sobre el software empresarial de Microsoft, con sus licencias dentro del alcance; si lo designa, puede imponer condiciones sobre precios y licencias [5]. Para Bytes es de doble filo: menos agresividad de Microsoft con el canal, o licencias más baratas que reducen la facturación. Los marcos de compra pública británicos (Crown Commercial Service) fijan márgenes máximos en el sector público [1].',
    tendencias: 'Tres tendencias: (1) Microsoft lleva a los grandes clientes a contratos directos (MCA-E) y ha eliminado la comisión de los EA, y empuja a los socios hacia el programa CSP y los servicios [5, 2]; (2) la IA se cobra por consumo, más difícil de prever, lo que crea demanda de gestión de costes pero también abre la venta directa de los nuevos proveedores [2]; (3) los fabricantes pagan cada vez más por desplegar y adoptar, no por revender, y Bytes gira a servicios (CyberOne) [2]. Bytes gana con la seguridad y el CSP y pierde con la venta directa en grandes cuentas.',
  },
  competencia: {
    cuota_pct: 3.0,
    posicion: 'Uno de los mayores socios de Microsoft en el Reino Unido e Irlanda; ≈ 3 % de su mercado direccionable de ≈ 82.000 M GBP, medido con la facturación bruta [1].',
    competidores: [
      { nombre: 'Softcat', pais: 'Reino Unido', ticker: 'SCT.L', ingresos: 1975, cuota_pct: null, margen_ebit_pct: 10.7, comentario: 'Rival más directo: revendedor de software y nube del Reino Unido, más fuerte en medianas empresas; ventas netas parciales. Ventas y margen de los últimos 12 meses [6].' },
      { nombre: 'Computacenter', pais: 'Reino Unido', ticker: 'CCC.L', ingresos: 12050, cuota_pct: null, margen_ebit_pct: 2.8, comentario: 'Más hardware y servicios a grandes cuentas; compite en marcos públicos [6].' },
      { nombre: 'CDW Corporation', pais: 'EE. UU.', ticker: 'CDW', ingresos: 17603, cuota_pct: null, margen_ebit_pct: 7.3, comentario: 'Con CDW UK compite en grandes cuentas y sector público británico [6].' },
      { nombre: 'Bechtle', pais: 'Alemania', ticker: 'BC8.DE', ingresos: 5690, cuota_pct: null, margen_ebit_pct: 4.9, comentario: 'Gran socio europeo de Microsoft; poca presencia en el Reino Unido [6].' },
      { nombre: 'Insight Enterprises', pais: 'EE. UU.', ticker: 'NSIT', ingresos: 6427, cuota_pct: null, margen_ebit_pct: 6.2, comentario: 'Socio de Microsoft con negocio en el Reino Unido [6].' },
      { nombre: 'Cancom', pais: 'Alemania', ticker: 'COK.DE', ingresos: 1420, cuota_pct: null, margen_ebit_pct: 1.3, comentario: 'Revendedor y servicios con filial británica [6].' },
    ],
    foso: {
      veredicto: 'Estrecho',
      tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No hay: cada cliente compra por separado.' },
        { fuente: 'Costes de cambio', puntuacion: 3, evidencia: 'Renovación del 99-116 % y 97-98 % del beneficio bruto de clientes del año anterior; contratos públicos de 3-5 años; herramientas propias de licencias [1, 2].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: '22 especializaciones y 10 designaciones de Microsoft, socio «Frontier»; marcos públicos ganados (DEFRA, 167 M en tres años) [1, 2].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'Resultado operativo / beneficio bruto del 37-41 %, superior al de rivales con más hardware; sin capital invertido [1].' },
        { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Volumen con Microsoft que da acceso a fondos de inversión del fabricante (proyecto NHS Copilot) [2].' },
      ],
    },
    amenazas: 'La erosión viene del proveedor, no de los rivales: Microsoft decide cada año cuánto paga al canal, ha eliminado la comisión de los EA (cero en 2026 según The Register) y lleva a las mayores cuentas a contratos directos; Bytes lo ha compensado con CSP y servicios, pero su margen sobre facturación bajó del 9,0 % al 6,0 % en tres años [5, 1, 2]. Probabilidad alta de nuevos recortes en los próximos tres años; el efecto depende de que el beneficio bruto siga creciendo por volumen. Segunda amenaza: la IA vendida directamente por OpenAI, Anthropic o los marketplaces de nube.',
  },
  historia: {
    resumen: 'Bytes nació en 1982 como distribuidor de software en el Reino Unido. En 1998 la compró la sudafricana Altron, que en 2017 añadió Phoenix Software, especializada en el sector público. En diciembre de 2020 Altron la separó y la sacó a bolsa en Londres (cotización principal) y Johannesburgo (secundaria), lo que explica que sus mayores accionistas sean gestoras sudafricanas [1]. En 2023 cambió su criterio de ingresos (software como agente). En febrero de 2024 dimitió el consejero delegado Neil Murphy por operaciones con acciones no comunicadas; le sustituyó Sam Mudd, directora de Phoenix, en mayo de 2024 [1]. En 2025 sufrió el recorte de incentivos de Microsoft y un aviso de beneficios; en 2026 cambió de presidente y compró CyberOne [8, 2].',
    hitos: [
      { anio: '1982', hito: 'Fundación de Bytes como distribuidor de software en el Reino Unido.' },
      { anio: '2017', hito: 'Altron, su dueña, compra Phoenix Software (sector público).' },
      { anio: '2020', hito: 'Separación de Altron y salida a bolsa en Londres y Johannesburgo (diciembre) [1].' },
      { anio: '2023', hito: 'Todo el software pasa a contabilizarse como agente; las ventas del FY2022 se reexpresan de 448 a 146 M [9].' },
      { anio: '2024', hito: 'Dimite el consejero delegado Neil Murphy (operaciones con acciones no comunicadas); Sam Mudd, consejera delegada desde mayo [1].' },
      { anio: '2025', hito: 'Microsoft recorta los incentivos de los EA (1-ene); aviso de beneficios en la junta de julio: la acción cae un 29 % [8].' },
      { anio: '2026', hito: 'Primer año de caída del resultado operativo (FY2026, −5,6 %); nuevo presidente (Gavin Rochussen); compra de CyberOne; guía del FY2027 al alza [1, 2].' },
    ],
  },
  esg: {
    calificaciones: [],
    materialidad: 'Los asuntos que mueven cifras son tres: (1) seguridad de la información, porque gestiona licencias y datos de 5.900 clientes, muchos públicos, y una brecha le costaría acreditaciones; (2) retención y formación del personal, que es el 78 % del gasto (82 M de 105 M en el FY2026) [1]; y (3) gobierno, tras el caso Murphy de 2024 y la concentración del accionariado en gestoras sudafricanas [1]. Las emisiones son irrelevantes para las cifras.',
    controversias: 'Dimisión del consejero delegado en febrero de 2024 por operaciones con acciones no comunicadas, con reexpresión de sus participaciones desde 2020 [1]. Sin sanciones ni litigios materiales conocidos en los últimos tres años tras revisar los informes anuales y los RNS.',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie', tipo: 'Complemento', intentos: '1) Informe anual FY2026: solo la cifra de 82.000 M; 2) informes FY2024 y FY2025: sin cifra comparable; 3) Gartner solo da el gasto mundial', decision: 'Omitido' },
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe anual (ESG): sin calificaciones con fecha; 2) web de MSCI y Sustainalytics: no accesibles sin registro; 3) prensa: nada', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report and Accounts 2025/26: consejo, comités, remuneración (tabla única), ratio salarial, participaciones significativas a 30-abr-2026, votos de 2024 y 2025', editor: 'Bytes Technology Group plc', tipo: 'Primaria', fecha: '2026-05-11', url: `${ESEF}/2026-02-28/ESEF/GB/0/213800LA4DZLFBAC9O33-2026-02-28/reports/213800LA4DZLFBAC9O33-2026-02-28-T01.xhtml` },
  { id: 2, titulo: 'Result of AGM (9-jul-2026): votos por resolución', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-07-09', url: `${INV}/result-of-agm/9661816` },
  { id: 3, titulo: 'Retirement of Chair and Board appointments (Gavin Rochussen y Tapiwa Ngara)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-06-01', url: `${INV}/retirement-of-chair-and-board-appointments/9645686` },
  { id: 4, titulo: 'Directorate change (Rochussen presidente desde el 4-sep-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-03', url: `${INV}/directorate-change/9754933` },
  { id: 5, titulo: 'Board change: separación de los puestos de director financiero y de operaciones (Andrew Holden)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-05-12', url: `${INV}/board-change-/9562969` },
  { id: 6, titulo: 'Director/PDMR Shareholding: compras de Sam Mudd y Gavin Rochussen (13-jul-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-07-14', url: `${INV}/director-pdmr-shareholding/9667848` },
  { id: 7, titulo: 'Director/PDMR Shareholding: venta automática de 23 acciones de Andrew Holden (31-jul-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-08-03', url: `${INV}/director-pdmr-shareholding/9704874` },
  { id: 8, titulo: 'Holding(s) in Company: Coronation Fund Managers baja del 29,03 % al 22,55 % (jul-ago 2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-01', url: `${INV}/holding-s-in-company/9749105` },
  { id: 9, titulo: 'Holding(s) in Company: Camissa Asset Management baja del 15,25 % al 10,93 % (ago-oct 2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-12', url: `${INV}/holding-s-in-company/9818549` },
  { id: 10, titulo: 'Holding(s) in Company: Public Investment Corporation sube del 9,20 % al 11,06 % (jul-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-07-31', url: `${INV}/holding-s-in-company/9699240` },
  { id: 11, titulo: 'Annual Report and Accounts 2023/24: dimisión de Neil Murphy por operaciones no comunicadas', editor: 'Bytes Technology Group plc', tipo: 'Primaria', fecha: '2024-05-21', url: `${ESEF}/2024-02-29/ESEF/GB/0/213800LA4DZLFBAC9O33-2024-02-29/reports/213800LA4DZLFBAC9O33-2024-02-29-T01.xhtml` },
  { id: 12, titulo: 'Full Year Trading Update (24-mar-2026): guía FY2027', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-03-24', url: `${INV}/full-year-trading-update/9487892` },
  { id: 13, titulo: 'Bytes plunges as profit warning spooks market (guía FY2026 de doble dígito en beneficio bruto retirada)', editor: 'BusinessDay', tipo: 'Prensa', fecha: '2025-07-02', url: 'https://www.businessday.co.za/bd/companies/telecoms-and-technology/2025-07-02-bytes-plunges-as-profit-warning-spooks-market' },
  { id: 14, titulo: 'Interim Results HY27 (guía FY2027 subida, búsqueda de director financiero)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/interim-results/9819138` },
  { id: 15, titulo: 'Holding(s) in Company: Barclays Capital Securities 5,00 % (acciones e instrumentos, 21-sep-2026)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-09-21', url: `${INV}/holding-s-in-company/9782051` },
];
const Cn = {
  _estado: 'completa',
  directivos: {
    equipo: [
      { nombre: 'Sam Mudd', cargo: 'Consejera delegada', desde: '2024', participacion_pct: null, trayectoria: 'En Phoenix desde 2003 y su directora general desde 2014, la llevó a ser «socio del año» de Microsoft en el Reino Unido en 2021; consejera desde julio de 2023, interina en febrero de 2024 y consejera delegada desde el 10-may-2024 [1]. Con ella el grupo tuvo el aviso de julio de 2025 y la caída del FY2026, y la vuelta al doble dígito en el HY27 [13, 14]. Compró 25.000 acciones en julio de 2026 [6].' },
      { nombre: 'Andrew Holden', cargo: 'Director financiero y de operaciones', desde: '2021', participacion_pct: null, trayectoria: 'Venía de Altron; director de operaciones desde junio de 2021 y financiero desde octubre de 2021 [1]. En mayo de 2026 el consejo decidió separar los dos puestos: dejará la dirección financiera (y el consejo) cuando llegue un sustituto y seguirá como director de operaciones; la búsqueda «avanza» a octubre [5, 14].' },
      { nombre: 'Gavin Rochussen', cargo: 'Presidente', desde: '2026', participacion_pct: null, trayectoria: 'Ex consejero delegado de Polar Capital y de J O Hambro Capital Management; independiente al nombrarlo, consejero desde el 10-jul-2026 y presidente desde el 4-sep-2026 [3, 4]. Compró 100.000 acciones (≈ 0,42 M GBP) en julio [6].' },
      { nombre: 'Clare Metcalfe', cargo: 'Directora general de Phoenix Software', desde: '2024', participacion_pct: null, trayectoria: 'En Phoenix desde 1997; directora general desde el 10-may-2024 [1].' },
    ],
    historial_guidance: [
      { anio: 'FY2026', guia: 'Mayo de 2025: beneficio bruto +doble dígito y resultado operativo +un dígito alto', real: 'Beneficio bruto +2,5 %; resultado operativo −5,6 % (aviso en julio de 2025)', cumplida: 'No' },
      { anio: 'FY2026 (revisada)', guia: 'Octubre de 2025: beneficio bruto ≈ 167 M y resultado operativo ≈ 62 M', real: '167,3 M y 62,7 M', cumplida: 'Sí' },
      { anio: 'HY27', guia: 'Marzo de 2026: FY2027 beneficio bruto +un dígito alto a doble dígito bajo; resultado operativo plano', real: 'HY27 beneficio bruto +17,8 % y resultado operativo +6,6 %; guía subida el 17-sep', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Doble dígito en beneficio bruto y resultado operativo', real: 'Beneficio bruto +12,0 %; resultado operativo +17,1 %', cumplida: 'Sí' },
    ],
    comentario: 'Equipo de casa: la consejera delegada y la directora de Phoenix llevan más de 20 años en el grupo y conocen a Microsoft y al sector público mejor que nadie. La credibilidad sufrió en 2025: la guía de mayo (doble dígito) se retiró dos meses después con una caída del 29 % de la acción [13]; desde entonces la empresa ha cumplido o superado lo que dijo (FY2026 revisado y HY27 por encima) [1, 14]. La estabilidad es menor de lo que parece: nuevo presidente en septiembre de 2026, nuevo consejero dominical y un director financiero por nombrar [3, 4, 5]. La compra de acciones de la consejera delegada y del presidente en julio de 2026 es una señal de confianza [6].',
  },
  gobierno: {
    consejo: [
      { nombre: 'Gavin Rochussen', cargo: 'Presidente', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos (presidente), Retribuciones, ESG' },
      { nombre: 'Sam Mudd', cargo: 'Consejera delegada', tipo: 'Ejecutivo', desde: '2023', comisiones: '—' },
      { nombre: 'Andrew Holden', cargo: 'Director financiero', tipo: 'Ejecutivo', desde: '2021', comisiones: '—' },
      { nombre: 'Erika Schraner', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, Nombramientos, Retribuciones, ESG' },
      { nombre: 'Shruthi Chindalur', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Nombramientos, Retribuciones, ESG' },
      { nombre: 'Ross Paterson', cargo: 'Consejero', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría, Nombramientos, Retribuciones, ESG' },
      { nombre: 'Anna Vikström Persson', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Retribuciones, Nombramientos, ESG' },
      { nombre: 'Tapiwa Ngara', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 98.71, voto_remuneracion_contra_pct: 1.29, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2026', total: 0.51, fijo: 0.48, variable_corto: 0, variable_largo: 0.03, ratio_salario_medio: 9 },
    remuneracion: 'Salario de la consejera delegada de 459.000 GBP; bonus máximo del 125 % del salario, con el 72 % ligado al resultado operativo (umbral de 64,0 M en el FY2026, no alcanzado) y el resto a objetivos estratégicos; el comité decidió no pagar ningún bonus en el FY2026 aunque la fórmula daba un 25 % del máximo [1]. Plan a largo plazo (PSP) al 75 % por BPA ajustado y 25 % por rentabilidad total relativa al FTSE 250; el de 2023 consolidó solo el 16,2 % [1]. Total de la consejera delegada: 0,51 M GBP (1,01 M en el FY2025); 9 veces la mediana de la plantilla [1]. No hay métrica de rentabilidad sobre el capital (el capital invertido es negativo). Votos de remuneración: 99,61 % a favor en 2026, 98,83 % en 2025 y 98,71 % en la política de 2024 [2, 1].',
    accionistas: [
      { nombre: 'Coronation Fund Managers', pct: 22.55, tipo: 'Gestora (Sudáfrica)', variacion: 'Vendiendo: 28,41 % en abril y 29,03 % a mediados de julio → 22,55 % el 28-ago-2026 [1, 8]' },
      { nombre: 'Public Investment Corporation (PIC)', pct: 11.06, tipo: 'Fondo público de pensiones (Sudáfrica)', variacion: 'Comprando: 4,87 % en abril → 9,20 % → 11,06 % el 29-jul-2026 [1, 10]' },
      { nombre: 'Camissa Asset Management', pct: 10.93, tipo: 'Gestora (Sudáfrica)', variacion: 'Vendiendo: 15,59 % en abril → 15,25 % → 10,93 % el 12-oct-2026 [1, 9]' },
      { nombre: 'Biltron (Pty) Ltd', pct: 7.73, tipo: 'Inversor (Sudáfrica)', variacion: 'Sin cambios notificados desde abril [1]' },
      { nombre: 'BlackRock', pct: 5.81, tipo: 'Gestora', variacion: 'A 30-abr-2026 [1]' },
      { nombre: 'Barclays Capital Securities', pct: 5.0, tipo: 'Banco (acciones e instrumentos)', variacion: '5,00 % el 21-sep-2026 (3,27 % en acciones) [15]' },
      { nombre: 'Vanguard Group', pct: 4.19, tipo: 'Gestora', variacion: 'A 30-abr-2026 [1]' },
    ],
    insiders: [
      { fecha: '2026-07-13', persona: 'Gavin Rochussen (presidente)', operacion: 'Compra', acciones: 100000, importe: 0.42 },
      { fecha: '2026-07-13', persona: 'Sam Mudd (consejera delegada)', operacion: 'Compra', acciones: 25000, importe: 0.10 },
      { fecha: '2026-07-31', persona: 'Andrew Holden (director financiero)', operacion: 'Venta', acciones: 23, importe: 0.0 },
    ],
    control_y_defensas: 'Sin accionista de control, una acción un voto y sin blindajes [1]. El accionariado está muy concentrado en gestoras sudafricanas (herencia de Altron): a 30-abr-2026, Coronation 28,4 %, Camissa 15,6 %, Biltron 7,7 % y PIC 4,9 % [1]. Desde julio Coronation y Camissa venden con regularidad (−6,5 y −4,3 puntos) y PIC compra (+6,2 puntos) [8, 9, 10]. En la junta de 2026 los accionistas rechazaron la autorización para emitir acciones (45,6 % a favor) y la supresión del derecho de suscripción preferente (52,4 % y 55,0 %, por debajo del 75 % exigido); la empresa dice que «algunos de sus mayores accionistas» se oponen por política [2]. El nuevo consejero Tapiwa Ngara es directivo de Value Capital Partners, accionista de la empresa [3].',
    alertas: [
      'Ventas continuadas de los dos mayores accionistas (Coronation y Camissa) desde julio de 2026, ≈ 25 M de acciones en tres meses [8, 9].',
      'Director financiero por sustituir desde mayo de 2026 [5, 14].',
      'Rechazo en junta de las autorizaciones para emitir acciones y suprimir la suscripción preferente (julio de 2026) [2].',
      'Dimisión del anterior consejero delegado en 2024 por operaciones con acciones no comunicadas [11].',
    ],
  },
  huecos: [
    { seccion: 'directivos', campo: 'participacion_pct', tipo: 'Complemento', intentos: '1) Informe anual FY2026: tabla de participaciones sin texto legible en la extracción; 2) RNS de compras de julio de 2026: solo la operación; 3) informe FY2024: 137.855 acciones de Sam Mudd entonces (< 0,1 %)', decision: 'Omitido' },
  ],
  fuentes: fC,
};
guarda('C', Cn);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de BYIT.L, ^FTMC y EXV3.DE hasta el 19-oct-2026 (herramienta bolsa.mjs): precio, rango, betas, volatilidad, cierres de febrero', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/BYIT.L/history/' },
  { id: 2, titulo: 'Bytes Technology Group plc: estimaciones anuales FY2027-FY2029, objetivo medio de 11 analistas (4,72 GBP), máximo 5,25 y mínimo 3,65', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/BYTES-TECHNOLOGY-GROUP-PL-116485507/finances/' },
  { id: 3, titulo: 'Bytes Technology: consenso (6 comprar, 3 mantener, 2 vender; objetivo medio 472 peniques, 525 máximo y 365 mínimo)', editor: 'Investing.com UK', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://uk.investing.com/equities/bytes-technology-consensus-estimates' },
  { id: 4, titulo: 'Yahoo Finance quoteSummary de los comparables (capitalización, EV/ventas, EV/EBITDA, PER adelantado, márgenes, deuda neta y FCF), tomado del expediente de Computacenter del 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/SCT.L/' },
  { id: 5, titulo: 'Computacenter: informe value del 20-oct-2026 (precio 50,25 GBP, PER de los próximos 12 meses 18,1, EV/EBITDA 12,7 y 10,8)', editor: 'Repositorio de análisis (informes/computacenter-2026-10-20)', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'informes/computacenter-2026-10-20/datos.json' },
  { id: 6, titulo: 'Converge Technology Solutions to be Acquired by H.I.G. Capital (≈ 7,4 veces el EBITDA ajustado, prima del 56 %)', editor: 'Converge Technology Solutions', tipo: 'Primaria', fecha: '2025-02-07', url: 'https://convergetp.com/2025/02/07/converge-technology-solutions-to-be-acquired-by-h-i-g-capital/' },
  { id: 7, titulo: 'Computacenter 2026 Half Year Results (compras de GAI y AgreeYa con su EBITDA)', editor: 'Computacenter plc', tipo: 'Primaria', fecha: '2026-09-08', url: 'https://www.directorstalkinterviews.com/wp-content/uploads/2026/09/Computacenter-2026-Half-Year-Results.pdf' },
  { id: 8, titulo: 'Acquisition of CyberOne (19,4 M iniciales, hasta 18,0 M variables)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/acquisition-of-cyberone-/9819095` },
  { id: 9, titulo: 'Bytes Technology To Acquire UK-based CyberOne (ingresos de 9,5 M en 12 meses a jul-26)', editor: 'RTTNews', tipo: 'Prensa', fecha: '2026-10-13', url: 'https://www.rttnews.com/3698414/bytes-technology-to-acquire-uk-based-cyberone-for-initial-19-4-mln-in-cash-shares-down.aspx' },
  { id: 10, titulo: 'Rentabilidad nominal a 10 años de la deuda pública británica (serie IUDMNPY, 5,31 % el 15-oct-2026)', editor: 'Bank of England, Interactive Database', tipo: 'Primaria', fecha: '2026-10-15', url: 'https://www.bankofengland.co.uk/boeapps/database/' },
  { id: 11, titulo: 'Total Voting Rights (230.109.146 acciones)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-01', url: `${INV}/total-voting-rights/9800150` },
  { id: 12, titulo: 'Interim Results HY27 (balance a 31-ago-2026, acciones diluidas ponderadas 242,5 M, BPA diluido 12,32 peniques)', editor: 'Bytes Technology Group plc (RNS)', tipo: 'Primaria', fecha: '2026-10-13', url: `${INV}/interim-results/9819138` },
  { id: 13, titulo: 'MarketScreener: cambios de recomendación (JP Morgan infraponderar 7-sep; Deutsche Bank comprar 26-ago; UBS vender 27-jul; Berenberg comprar)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-20', url: 'https://www.marketscreener.com/quote/stock/BYTES-TECHNOLOGY-GROUP-PL-116485507/consensus/' },
  { id: 14, titulo: 'Damodaran, prima implícita del S&P 500 (ERP T12m with sustainable payout), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
];
const bols = B.bolsa;
const Dn = {
  _estado: 'completa',
  identificacion: {
    nombre: 'Bytes Technology Group plc', nombre_corto: 'Bytes', ticker: 'BYIT', isin: 'GB00BMH18Q19', mercado: 'London Stock Exchange (Main Market); secundaria en Johannesburgo (BYI)', indice_referencia: 'FTSE 250',
    pais: 'Reino Unido', pais_iso: 'GB', sector: 'Tecnología de la información', industria: 'Servicios de TI / distribución de software', sede: 'Leatherhead (Surrey)', fundacion: '1982', empleados: 1353, web: 'https://www.bytesplc.com',
    precio: 4.504, fecha_precio: '2026-10-19', acciones: 238.4, capitalizacion_publicada: null, free_float_pct: null,
    max_52s: 4.942, min_52s: 2.486, volumen_medio_diario: '≈ 3,2 M GBP/día (3 meses; 743.531 acciones)', proximos_resultados: '2027-05-11',
  },
  consenso: {
    guidance: 'Guía del FY2027 (a feb-2027), subida el 17-sep-2026 y confirmada el 13-oct: beneficio bruto +«diez y pocos a quince» por ciento y resultado operativo +«uno a cinco» por ciento, sin CyberOne; desde el FY2028, resultado operativo en línea con el beneficio bruto y apalancamiento operativo después [12]. La guía de marzo de 2026 era más baja (beneficio bruto +8-11 % y resultado plano) [12].',
    estimaciones: [
      { periodo: 'FY2027e', ingresos: 251.4, ebitda: 70.45, ebit: 65.92, bpa: 0.22, dpa: 0.1686, fuente: 'MarketScreener, 11 analistas [2]' },
      { periodo: 'FY2028e', ingresos: 276.1, ebitda: 78.76, ebit: 73.74, bpa: 0.2421, dpa: 0.1792, fuente: 'MarketScreener [2]' },
      { periodo: 'FY2029e', ingresos: 300.2, ebitda: 84.91, ebit: 79.95, bpa: 0.2594, dpa: 0.1888, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 11, comprar: 6, mantener: 3, vender: 2, po_medio: 4.72, po_min: 3.65, po_max: 5.25 },
    revisiones: 'Al alza en los últimos tres meses: la subida de guía del 17-sep llevó a Deutsche Bank y Berenberg a «comprar» y el objetivo medio a 4,72 GBP [2, 13]. En contra, UBS bajó a «vender» el 27-jul por el doble golpe de Microsoft (recorte de 5 puntos en los incentivos de Office 365, Exchange, OneDrive y SharePoint desde octubre) y JP Morgan empezó con «infraponderar» el 7-sep por el retraso en IA [13]. Solo una fuente (MarketScreener) da estimaciones completas; el objetivo y las recomendaciones se contrastan con Investing.com (472 peniques, 6/3/2) [3]. Los dividendos estimados de MarketScreener incluyen extraordinarios.',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
  },
  bolsa: {
    tipo_rentabilidad: bols.tipo_rentabilidad, rentabilidades: bols.rentabilidades, anual: bols.anual,
    beta: 0.68, volatilidad_pct: bols.volatilidad_pct, max_drawdown_pct: bols.max_drawdown_pct, posicion_corta_pct: null,
  },
  multiplos_historicos: {
    serie: B.cierres_ejercicio.filter((c) => ['FY2022', 'FY2023', 'FY2024', 'FY2025', 'FY2026'].includes(c.anio)).map((c) => ({ anio: c.anio, precio_cierre: Math.round(c.precio_cierre) / 100, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
  },
  comparables: {
    criterio: 'Revendedores de software y TI con servicios: Softcat (el rival británico más parecido), Computacenter, Bechtle, Cancom y Atea en Europa, y CDW, Insight y ePlus en EE. UU. [4, 5]. Bytes y Softcat publican el software como agente, así que su EV/ventas y su margen sobre ventas no son comparables con los demás (que facturan en bruto); la comparación útil es el PER y el EV/EBITDA. Fuera SoftwareOne (fusión con Crayon y pérdidas) y los mayoristas puros. Datos del 20-oct-2026, en millones de GBP convertidos por Yahoo [4].',
    empresas: [
      { nombre: 'Softcat', ticker: 'SCT.L', pais: 'GB', capitalizacion: 3650, ev_ventas: 1.63, ev_ebitda_ltm: 14.4, ev_ebitda_ntm: null, per_ntm: 18.8, crecimiento_pct: 20.2, margen_ebitda_pct: 11.3, roic_pct: null, dn_ebitda: -0.7, fcf_yield_pct: 3.9 },
      { nombre: 'Computacenter', ticker: 'CCC.L', pais: 'GB', capitalizacion: 5296, ev_ventas: 0.45, ev_ebitda_ltm: 12.7, ev_ebitda_ntm: 10.8, per_ntm: 18.1, crecimiento_pct: null, margen_ebitda_pct: 3.5, roic_pct: 37.2, dn_ebitda: -0.3, fcf_yield_pct: 5.1 },
      { nombre: 'Bechtle', ticker: 'BC8.DE', pais: 'DE', capitalizacion: 3730, ev_ventas: 0.74, ev_ebitda_ltm: 11.5, ev_ebitda_ntm: null, per_ntm: 16.1, crecimiento_pct: 7.8, margen_ebitda_pct: 6.4, roic_pct: null, dn_ebitda: 1.3, fcf_yield_pct: 0.1 },
      { nombre: 'Cancom', ticker: 'COK.DE', pais: 'DE', capitalizacion: 548, ev_ventas: 0.51, ev_ebitda_ltm: 16.6, ev_ebitda_ntm: null, per_ntm: 16.4, crecimiento_pct: 5.8, margen_ebitda_pct: 3.1, roic_pct: null, dn_ebitda: 4.0, fcf_yield_pct: 0.0 },
      { nombre: 'Atea', ticker: 'ATEA.OL', pais: 'NO', capitalizacion: 1409, ev_ventas: 0.52, ev_ebitda_ltm: 12.3, ev_ebitda_ntm: null, per_ntm: 13.9, crecimiento_pct: 7.2, margen_ebitda_pct: 4.2, roic_pct: null, dn_ebitda: 1.7, fcf_yield_pct: 1.7 },
      { nombre: 'CDW', ticker: 'CDW', pais: 'US', capitalizacion: 14295, ev_ventas: 1.07, ev_ebitda_ltm: 12.5, ev_ebitda_ntm: null, per_ntm: 12.9, crecimiento_pct: 6.5, margen_ebitda_pct: 8.6, roic_pct: null, dn_ebitda: 3.0, fcf_yield_pct: 3.5 },
      { nombre: 'Insight Enterprises', ticker: 'NSIT', pais: 'US', capitalizacion: 3599, ev_ventas: 0.72, ev_ebitda_ltm: 9.9, ev_ebitda_ntm: null, per_ntm: 12.5, crecimiento_pct: 6.1, margen_ebitda_pct: 7.3, roic_pct: null, dn_ebitda: 2.2, fcf_yield_pct: 9.1 },
      { nombre: 'ePlus', ticker: 'PLUS', pais: 'US', capitalizacion: 1791, ev_ventas: 0.83, ev_ebitda_ltm: 10.8, ev_ebitda_ntm: null, per_ntm: 16.0, crecimiento_pct: 7.2, margen_ebitda_pct: 7.7, roic_pct: null, dn_ebitda: -1.7, fcf_yield_pct: 1.6 },
    ],
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-10', objetivo: 'CyberOne (servicios gestionados de ciberseguridad, Reino Unido)', comprador: 'Bytes Technology Group', ev: 19.4, ev_ventas: 2.04, ev_ebitda: null, prima_pct: null, excluir: false, comentario: '19,4 M iniciales sobre 9,5 M de ingresos (hasta 37,4 M y ≈ 3,9 veces con todo el variable) [8, 9].' },
      { fecha: '2026-06', objetivo: 'GAI (Government Acquisitions Inc.)', comprador: 'Computacenter', ev: 68.9, ev_ventas: null, ev_ebitda: 11.5, prima_pct: null, excluir: false, comentario: 'Revendedor al sector público de EE. UU. [7].' },
      { fecha: '2026-01', objetivo: 'AgreeYa Solutions', comprador: 'Computacenter', ev: 89.9, ev_ventas: 1.0, ev_ebitda: 8.6, prima_pct: null, excluir: false, comentario: 'Servicios profesionales de TI [7].' },
      { fecha: '2025-02', objetivo: 'Converge Technology Solutions', comprador: 'H.I.G. Capital', ev: 727, ev_ventas: null, ev_ebitda: 7.4, prima_pct: 56, excluir: false, comentario: 'Revendedor y servicios de Canadá y EE. UU.; ≈ 1.300 M CAD convertidos a ≈ 1,79 CAD por GBP (estimación propia) [6].' },
    ],
  },
  huecos: [
    { seccion: 'bolsa', campo: 'posicion_corta_pct', tipo: 'Complemento', intentos: '1) Registro de posiciones cortas de la FCA: sin posiciones publicadas por encima del 0,5 % en la consulta; 2) Barclays declara 1,73 % en instrumentos (no es corta); 3) prensa: nada', decision: 'Omitido' },
    { seccion: 'multiplos_historicos', campo: 'ev_ebitda_ntm y per_ntm', tipo: 'Complemento', intentos: '1) MarketScreener: sin históricos gratuitos; 2) Yahoo: solo actuales; 3) se calcula la historia adelantada con el BPA real del año siguiente en el objetivo a 12 meses', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', Dn);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'BYIT: Reseller Margin Pressure And Slower Services Scaling Will Weigh On Long Term Earnings (narrativa de la comunidad, octubre de 2026)', editor: 'Simply Wall St (comunidad)', tipo: 'Foros y redes', fecha: '2026-10', url: 'https://simplywall.st/community/narratives/gb/software/lse-byit/bytes-technology-group-shares/azb7sibs-margin-and-microsoft-risk-will-curb-gains-yet-spark-hope' },
  { id: 2, titulo: 'Bytes Technology Holds Guidance as Profit Lags Growth and CyberOne Deal Lands', editor: 'AskTraders', tipo: 'Foros y redes', fecha: '2026-10-13', url: 'https://www.asktraders.com/analysis/bytes-technology-holds-guidance-as-profit-lags-growth-and-cyberone-deal-lands/' },
  { id: 3, titulo: 'Bytes focuses on AI, cybersecurity and cloud for growth (y comentarios en la prensa sudafricana)', editor: 'BusinessDay', tipo: 'Foros y redes', fecha: '2026-10-14', url: 'https://www.businessday.co.za/companies/2026-10-14-bytes-focuses-on-ai-cybersecurity-and-cloud-for-growth/' },
  { id: 4, titulo: 'Lectores y comentaristas sobre la transición de los EA de Microsoft (The Register)', editor: 'The Register', tipo: 'Foros y redes', fecha: '2026-06', url: 'https://www.theregister.com/os-platforms/2026/06/01/i-designed-microsofts-5b-ea-channel-architecture-in-2001-the-2026-transition-is-missing-what-made-it-work/5248235' },
];
const En = {
  _estado: 'parcial (foros británicos con poco debate abierto)',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Simply Wall St (narrativas de la comunidad)', fecha: '2026-10', n_comentarios: 5, tono: 'Negativo', resumen: 'La narrativa bajista pasa de un riesgo lejano (IA y venta directa) a uno inmediato: margen sobre facturación a la baja por Microsoft y resultado que crece menos que el beneficio bruto [1].' },
      { plataforma: 'AskTraders (análisis y comentarios de operadores)', fecha: '2026-10', n_comentarios: 3, tono: 'Dividido', resumen: 'Buen semestre, pero «el beneficio va por detrás del crecimiento»; la acción abrió +3,9 % el día de resultados y lo devolvió [2].' },
      { plataforma: 'BusinessDay (Sudáfrica, inversores de la cotización en Johannesburgo)', fecha: '2026-10', n_comentarios: 3, tono: 'Positivo', resumen: 'Se lee como recuperación tras el aviso de 2025 y apuesta por seguridad e IA [3].' },
      { plataforma: 'The Register (comentarios del canal de Microsoft)', fecha: '2026-06', n_comentarios: 10, tono: 'Negativo', resumen: 'El canal ve la eliminación de las comisiones de los EA como un cambio estructural sin puente para los socios [4].' },
    ],
    temas: [
      { tema: 'Dependencia de Microsoft y sus incentivos', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en el riesgo: el margen sobre facturación bajó del 9,0 % al 6,0 % y Microsoft es la mitad del beneficio bruto; pero el beneficio bruto de Microsoft creció en línea con el grupo (+17,8 %) en el HY27 [1, 4].' },
      { tema: 'El resultado crece menos que el beneficio bruto', postura: 'Bajista', peso: 'Alto', contraste: 'Cierto en el FY2026 y el HY27 (resultado / beneficio bruto del 40,7 % al 36,4 %); la empresa promete que crecerán igual desde el FY2028 [2].' },
      { tema: 'Recuperación tras el aviso de 2025', postura: 'Alcista', peso: 'Medio', contraste: 'Respaldado por las cifras: beneficio bruto +17,8 % y guía subida [3].' },
      { tema: 'IA: Copilot frente a venta directa', postura: 'Dividida', peso: 'Medio', contraste: 'Hay pruebas de las dos cosas: proyecto NHS Copilot y, a la vez, la rebaja de JP Morgan por «retraso en IA» [3].' },
    ],
    lectura: 'El sentimiento no es extremo: tras subir un 79 % desde el mínimo de marzo de 2026, el debate es si el crecimiento del beneficio bruto llegará al resultado. Los foros coinciden con el riesgo central del informe (Microsoft decide el margen) y no aportan uno nuevo. Hay poco debate abierto en los foros británicos (LSE Chat no abre); la base de inversores es en gran parte institucional y sudafricana, y su movimiento real se ve en las notificaciones de participaciones (Coronation y Camissa vendiendo), no en los foros.',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', En);
console.log('Notas A-E escritas');
