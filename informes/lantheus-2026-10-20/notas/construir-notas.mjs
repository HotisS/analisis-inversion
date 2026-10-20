// Escribe las notas A-E de Lantheus Holdings (corte 2026-10-20) a partir de los documentos de notas/docs (EDGAR),
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 20-oct-2026),
// de movimiento.txt, noticias.txt y form4.txt. Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/lantheus-2026-10-20/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1521036';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025: cuentas, ingresos por producto, competencia, patentes, reembolso de Medicare, deuda, plantilla', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${ED}/000119312526073498/lnth-20251231.htm` },
  { id: 2, titulo: 'Form 10-Q del 2T26: balance a 30-jun-2026, cuenta y flujos del semestre, venta del negocio SPECT a SHINE, litigio de PNT2003', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000119312526336795/lnth-20260630.htm` },
  { id: 3, titulo: 'Lantheus Reports Second Quarter 2026 Financial Results (guía 2026 suspendida por la fusión)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000119312526336771/lnth-ex99_1.htm` },
  { id: 4, titulo: 'Lantheus Reports First Quarter 2026 Financial Results (PYLARIFY TruVu aprobado; guía 2026 reafirmada)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000119312526210369/lnth-ex99_1.htm` },
  { id: 5, titulo: 'Lantheus Reports Fourth Quarter and Full Year 2025 Financial Results (conciliación GAAP-ajustado, guía 2026)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-02-26', url: `${ED}/000119312526073439/lnth-ex99_1.htm` },
  { id: 6, titulo: 'Lantheus Reports Third Quarter 2025 Financial Results (guía 2025 rebajada; relevo del consejero delegado)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-06', url: `${ED}/000119312525268103/lnth-ex99_1.htm` },
  { id: 7, titulo: 'Lantheus Reports Second Quarter 2025 Financial Results (guía 2025 rebajada; compra de Life Molecular)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-06', url: `${ED}/000095017025103543/lnth-ex99_1.htm` },
  { id: 8, titulo: 'Notas de resultados anuales 2024 y 2023 (conciliaciones de BPA ajustado, ingresos por producto, flujo libre)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-02-26', url: `${ED}/000162828025007965/exhibit991q42024earningspr.htm` },
  { id: 9, titulo: 'Notas de resultados anuales 2022, 2021 y 2020 (conciliaciones de BPA ajustado, capex, ingresos por producto)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2023-02-23', url: `${ED}/000162828023004697/exhibit991q42022earningspr.htm` },
  { id: 10, titulo: 'Hechos XBRL de Lantheus Holdings (companyfacts): cuenta, balance y flujos 2016-2025', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001521036.json' },
  { id: 11, titulo: 'Proxy definitivo de la fusión con Curium (DEFM14A): proyecciones de la dirección 2026-2035 y por franquicia', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000119312526384284/d180727ddefm14a.htm` },
  { id: 12, titulo: 'Form 10-Q del 3T25 (compras de Evergreen y Life Molecular, contraprestación contingente)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2025-11-06', url: `${ED}/000119312525268113/lnth-20250930.htm` },
];
const anios = ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuentaX = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const balX = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fluX = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
// No recurrentes dentro del EBITDA (de las conciliaciones de la empresa [5, 8, 9]): deterioros, contraprestación contingente,
// licencias de I+D en curso compradas (PNT2002/2003 en 2022: 260 M; sublicencias de 2024: 66 M) y costes de compra,
// integración y venta (2025: 84,3 M + 21,8 M de licencias).
const noRec = { '2018': null, '2019': null, '2020': 29, '2021': 82, '2022': 301, '2023': 129, '2024': 66, '2025': 106 };
const cuenta = anios.map((a) => ({ ...cuentaX[a], fin: undefined, no_recurrentes_en_ebitda: noRec[a], dpa: 0, dpa_extraordinario: 0 }))
  .map(({ fin, ...r }) => r);
// Capex del estado de flujos (el XBRL lo trae incompleto o a cero de 2020 a 2025) [1, 8, 9].
const capex = { '2018': 20.1, '2019': 22.1, '2020': 12.5, '2021': 12.1, '2022': 18.3, '2023': 46.6, '2024': 51.6, '2025': 36.1 };
// Adquisiciones: compras de activos y licencias (2022: PNT2002/2003 260; 2023: 45,3; 2024: 80,9 de activos + 28 de opción + 83,2 en
// participaciones de Perspective y Radiopharm), Evergreen 268,9 y Life Molecular 306,7 en 2025 (+ 15,4 de I+D y participaciones) [1].
const adq = { '2018': 0, '2019': 0, '2020': 0, '2021': 0, '2022': 260, '2023': 45.3, '2024': 192.1, '2025': 591.1 };
const desinv = { '2018': 1, '2019': 0, '2020': 0, '2021': 15.8, '2022': 1.8, '2023': 97.8, '2024': 17.8, '2025': 0 };
const flujosH = anios.map((a) => ({
  periodo: a, flujo_operativo: fluX[a].flujo_operativo, capex: capex[a], pagos_arrendamientos: fluX[a].pagos_arrendamientos ?? 0,
  adquisiciones: adq[a], desinversiones: desinv[a], dividendos: 0, recompras: fluX[a].recompras ?? 0, emision_acciones: fluX[a].emision_acciones ?? 0, intereses_en_financiacion: 0,
}));
// Balance: arrendamientos a 0 (US GAAP: los operativos ya están en el EBITDA); minoritarios 0.
const balanceH = anios.map((a) => { const { fin, ...r } = balX[a]; return { ...r, arrendamientos: 0, minoritarios: 0 }; });

const A = {
  _estado: 'completo',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1556.3, ebitda: 390.8, ebit: 302.3, beneficio_neto: 275.3, bpa: 4.14, dpa: 0, dpa_extraordinario: 0, fcf: 387.7, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 85 },
    cambios_perimetro: [
      { periodo: '2020', descripcion: 'Progenics, comprada en junio de 2020 con acciones (aporta PYLARIFY, entonces en desarrollo): las acciones pasan de 40 a 67 M.' },
      { periodo: '2025', descripcion: 'Evergreen Theragnostics (1-abr-2025, 276 M) y Life Molecular Imaging (21-jul-2025, 353 M con Neuraceq): el balance las recoge enteras y la cuenta solo 9 y 5 meses.' },
    ],
    comentario: 'Los ingresos pasaron de 339 M USD en 2020 a 1.534 M en 2024 por PYLARIFY (de 43 M en 2021 a 1.058 M en 2024) y se pararon en 2025 (1.542 M, +0,5 %): PYLARIFY cayó un 6,5 %, hasta 989 M, por precio neto (fin del pago de transición de Medicare el 1-ene-2025 y más descuentos ante Illuccix, Gozellix y Posluma), mientras DEFINITY subía un 3,9 % (330 M) y entraban Neuraceq (51 M en 5 meses) y la fabricación para terceros de Evergreen [1, 5]. En el primer semestre de 2026, ya sin el negocio SPECT vendido a SHINE (TechneLite: 87 M en 2025), los ingresos suben un 2,0 % (765,5 M) gracias a Neuraceq (75 M) y DEFINITY (173 M, +6 %), con PYLARIFY −5,3 % [2, 3, 4]. El margen operativo ajustado de la empresa bajó del 41,9 % de 2024 al 36,0 % en 2025 y al 35,4 % en el semestre: el precio de PYLARIFY y los gastos de las dos compras [5, 3].',
    ajustes: 'Lantheus publica un BPA ajustado que quita la remuneración en acciones (85,6 M en 2025: 1,25 USD por acción antes de impuestos), la amortización de intangibles comprados (47,1 M), los costes de compras, integración y venta (84,3 M), las licencias estratégicas (21,8 M), el ajuste de la contraprestación contingente y la variación de valor de las participaciones en Radiopharm y Perspective [5]. El BPA ajustado fue 6,08 USD en 2025 frente a 3,41 GAAP. En este informe el BPA de referencia es el ajustado CON la remuneración en acciones (un coste real y recurrente): 5,12 USD en 2025, 5,94 en 2024 y 5,68 en 2023. En el EBITDA se devuelven como no recurrentes el deterioro de 2023 (138 M de RELISTOR y AZEDRA), las licencias de I+D compradas de 2022 (260 M, PNT2002/2003) y 2024 (66 M) y los costes de compra e integración de 2025 [5, 8, 9]. En el semestre de 2026 el GAAP lleva una plusvalía de 59,5 M por la venta del negocio SPECT y 31,8 M de bajada de la contraprestación contingente [2].',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 378.7, crecimiento_pct: 18.9, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.70, vs_consenso: null },
      { periodo: '4T24', ingresos: 391.1, crecimiento_pct: 10.5, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.59, vs_consenso: null },
      { periodo: '1T25', ingresos: 372.8, crecimiento_pct: 0.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.53, vs_consenso: null },
      { periodo: '2T25', ingresos: 378.0, crecimiento_pct: -4.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.57, vs_consenso: null },
      { periodo: '3T25', ingresos: 384.0, crecimiento_pct: 1.4, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.27, vs_consenso: null },
      { periodo: '4T25', ingresos: 406.8, crecimiento_pct: 4.0, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.67, vs_consenso: null },
      { periodo: '1T26', ingresos: 377.3, crecimiento_pct: 1.2, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.46, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 388.2, crecimiento_pct: 2.7, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.55, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'BPA ajustado de la empresa (sin remuneración en acciones). En el 2T26 no hubo conferencia: el 6-ago-2026, tres días después de firmar la venta a Curium, Lantheus publicó ingresos de 388,2 M (+2,7 %), PYLARIFY 240,4 M (−4,1 %), Neuraceq 39,6 M y DEFINITY 88,3 M (+5,2 %), y suspendió la guía de 2026 (1.400-1.450 M de ingresos y 5,00-5,25 USD de BPA ajustado, reafirmada en mayo) [3, 4]. En la conferencia del 1T26 la dirección (Mary Anne Heino, consejera delegada interina desde enero) centró el mensaje en el paso de PYLARIFY a la fórmula nueva TruVu desde el 4T26 (más dosis por lote, nuevo código de reembolso con pago de transición) y en la aprobación provisional de PNT2003 [4]. En febrero había anunciado que se concentra en el diagnóstico PET y busca alternativas para las terapias [5]. Las dos notas de 2026 batieron al consenso de Seeking Alpha (1,46 frente a 1,23 y 1,55 frente a 1,30 USD) según los titulares de esa web; la empresa no comentó el precio neto de PYLARIFY más allá de «descenso del precio neto» [2].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: '2026', importe: 0.7 }, { anio: '2027', importe: 575 }, { anio: '2028+', importe: 0 }],
    liquidez: 'Caja 593,3 M a 30-jun-2026 y línea de crédito no dispuesta de 750 M hasta dic-2029 [2, 3].',
    rating: 'Sin rating público localizado (la deuda es un bono convertible sin calificar).',
    coste_deuda_pct: 3.4,
    vida_media_anios: 1.5,
    otros_pasivos: 'Bonos convertibles de 575 M al 2,625 % con vencimiento el 15-dic-2027 y precio de conversión de 79,81 USD: a 100 USD están dentro del dinero, se pagan en efectivo el principal y en acciones el exceso (≈ 1,4 M de acciones) [1, 2]. Contraprestación contingente de las compras de Evergreen y Life Molecular: 51,1 M a largo plazo a 30-jun-2026 (73,3 M en diciembre; la bajada de 31,8 M pasó por la cuenta) [2]. Hitos y regalías por pagar en licencias (Life Molecular hasta 400 M en hitos, PNT2002/2003, NAV-4694, MK-6240 de Cerveau) que se registran cuando se cumplen [1]. Activos: participaciones en Radiopharm, Perspective e Illuminated (SHINE) por 119,0 M y pagarés de SHINE por 24,5 M [2]. Pasivos por retiro de activos y arrendamientos menores.',
    comentario: 'La caja cayó de 913 M (2024) a 359 M (2025) por las compras de Evergreen y Life Molecular (≈ 576 M netos) y 300 M de recompras, y volvió a 593 M en junio de 2026 con 217 M de flujo operativo en el semestre y 24 M de la venta a SHINE [1, 2]. La deuda neta es casi nula (575 M de convertible frente a 593 M de caja). El circulante comercial es alto para el sector, ≈ 23 % de las ventas, por los cobros a 80 días de los centros de PET y distribuidores [2].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'El flujo operativo pasó de 54 M en 2021 a 545 M en 2024 con PYLARIFY y bajó a 390 M en 2025 por el precio, los costes de compra y los impuestos; en el semestre de 2026 fueron 217 M [1, 2, 8, 9]. El capex es pequeño (2-4 % de las ventas: la producción de PYLARIFY y Neuraceq la hacen terceros en sus ciclotrones); en 2026 casi desaparece (5,6 M en el semestre) [2]. La caja se ha ido a comprar productos y licencias (260 M en 2022, ≈ 776 M entre 2024 y 2025 con Evergreen y Life Molecular) y a recompras (475 M de 2022 a 2025) [1]. Estimación propia: casi todo el capex es de mantenimiento; el crecimiento se compra con licencias y adquisiciones que no pasan por el capex.',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Deloitte & Touche LLP', anios_auditor: 19, opinion: 'Favorable',
    comentario: 'Deloitte audita desde 2007 [1]. Tres asuntos pesan en la lectura: la remuneración en acciones (85,6 M en 2025, 5,6 % de las ventas y 37 % del beneficio neto) que el BPA ajustado excluye; las licencias de I+D compradas que se llevan a gasto de una vez (260 M en 2022, 66 M en 2024) y que la empresa quita del ajustado aunque son su forma de crecer; y la contraprestación contingente, que sube y baja el resultado (−31,8 M de gasto en el semestre de 2026) [5, 2]. Las rebajas comerciales se dispararon: la provisión del año pasó de 63,5 M en 2024 a 167,6 M en 2025 por los contratos de PYLARIFY [1]. Los ingresos se reconocen en la entrega de cada dosis; no hay ingresos anticipados relevantes.',
    senales: [
      { senal: 'Remuneración en acciones alta y excluida del BPA ajustado', nivel: 'Media', comentario: '85,6 M en 2025 (1,25 USD por acción); este informe la cuenta como gasto [5].' },
      { senal: 'Rebajas comerciales de PYLARIFY en aumento', nivel: 'Media', comentario: 'Provisión anual 167,6 M en 2025 frente a 63,5 M en 2024: la caída de precio va por contratos [1].' },
      { senal: 'Contraprestación contingente en el resultado', nivel: 'Baja', comentario: 'Ajustes de valor de los pagos aplazados de Evergreen y Life Molecular (−31,8 M en el 1S26) [2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo. Recompras: 75 M en 2022, 100 M en 2024 y 300 M en 2025 (programa de 400 M aprobado en julio de 2025) [1, 7]. Desde el acuerdo con Curium (3-ago-2026) la empresa no puede recomprar ni pagar dividendos sin permiso del comprador [11]. La prioridad declarada hasta la venta era comprar o licenciar radiofármacos de diagnóstico y terapia [1].',
    adquisiciones: [
      { anio: '2020', objetivo: 'Progenics Pharmaceuticals (PYLARIFY, AZEDRA, RELISTOR, aPROMISE)', importe: null, ev_ebitda: null, financiacion: 'Acciones (≈ 26,7 M) más derechos contingentes', resultado: 'La mejor compra de la empresa: PYLARIFY llegó a 1.058 M de ventas en 2024; AZEDRA se retiró en 2024 con deterioro [1, 9].' },
      { anio: '2022', objetivo: 'Licencia de PNT2002 y PNT2003 (POINT Biopharma)', importe: 260, ev_ebitda: null, financiacion: 'Caja', resultado: 'PNT2002 no se lanzó (Lilly compró POINT); PNT2003 (Bravnesta, genérico de Lutathera) aprobado en septiembre de 2026 tras ganar el litigio de patentes en junio [2].' },
      { anio: '2023', objetivo: 'Cerveau Technologies (MK-6240, trazador de tau)', importe: 35, ev_ebitda: null, financiacion: 'Caja más hitos y regalías', resultado: 'MK-6240 aprobado por la FDA en agosto de 2026 (Tauklarify) [11].' },
      { anio: '2025', objetivo: 'Evergreen Theragnostics (fabricación de radiofármacos para terceros)', importe: 276, ev_ebitda: null, financiacion: 'Caja más contingente', resultado: 'Integrada; ingresos de fabricación en «Strategic partnerships» [1].' },
      { anio: '2025', objetivo: 'Life Molecular Imaging (Neuraceq, NAV-4694 y otros)', importe: 353, ev_ebitda: null, financiacion: 'Caja más hasta 400 M en hitos', resultado: 'Neuraceq vende ≈ 150 M al año (75 M en el 1S26), por encima de lo esperado; la dirección proyecta 290 M en neurología en 2028 [2, 11].' },
    ],
    comentario: 'La dirección ha sido buena asignadora cuando compró Progenics con acciones baratas en 2020: de esa compra salió casi todo el valor de la empresa. Desde 2022 las compras se pagan en caja y su retorno aún no se ve: ROIC del 32,7 % en 2024 frente a uno muy inferior en 2025 por los 600 M de Evergreen y Life Molecular y la caída de PYLARIFY. Las recompras de 300 M en 2025 a una media de ≈ 63 USD (7,24 M de acciones en autocartera a coste de 477 M) [1] quedan bien frente a los 102,50 de la oferta. La venta a Curium cierra la historia: el accionista recibe 102,50 USD en efectivo y hasta 12 USD en derechos contingentes [11].',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'PYLARIFY (PET de próstata, PSMA)', descripcion: 'Oncología radiofarmacéutica', tipo_resultado: null, historico: [['2021', 43.4], ['2022', 527.4], ['2023', 851.3], ['2024', 1057.8], ['2025', 989.1]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'DEFINITY (contraste de ecografía)', descripcion: 'Diagnóstico de precisión', tipo_resultado: null, historico: [['2021', 232.8], ['2022', 245.0], ['2023', 279.8], ['2024', 317.8], ['2025', 330.2]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'Neuraceq (PET de amiloide)', descripcion: 'Diagnóstico de precisión, desde jul-2025', tipo_resultado: null, historico: [['2021', 0], ['2022', 0], ['2023', 0], ['2024', 0], ['2025', 51.4]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'TechneLite y otros SPECT (vendidos a SHINE el 1-ene-2026)', descripcion: 'Diagnóstico de precisión', tipo_resultado: null, historico: [['2021', 118.3], ['2022', 111.7], ['2023', 110.4], ['2024', 119.7], ['2025', 111.4]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
      { nombre: 'Alianzas, regalías y otros', descripcion: 'Investigación clínica, regalías, fabricación para terceros', tipo_resultado: null, historico: [['2021', 30.7], ['2022', 51.0], ['2023', 54.9], ['2024', 38.6], ['2025', 59.4]].map(([p, i]) => ({ periodo: p, ingresos: i, resultado: null })) },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 94.6 }, { nombre: 'Resto del mundo', peso_pct: 5.4 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas de PYLARIFY (M USD)', valor_anterior: '1.057,8 (2024)', valor_actual: '989,1 (2025)', variacion: '−6,5 %', comentario: '1S26: 481,3 M (−5,3 %); el volumen sube y el precio neto baja [1, 3].' },
      { kpi: 'Ventas de DEFINITY (M USD)', valor_anterior: '317,8', valor_actual: '330,2', variacion: '+3,9 %', comentario: '1S26: 172,9 M (+6,0 %) [1, 3].' },
      { kpi: 'Ventas de Neuraceq (M USD)', valor_anterior: '—', valor_actual: '51,4 (5 meses)', variacion: 'n.a.', comentario: '1S26: 75,0 M; amiloide para elegir pacientes de los fármacos anti-amiloide [3, 4].' },
      { kpi: 'Margen operativo ajustado de la empresa', valor_anterior: '41,9 %', valor_actual: '36,0 %', variacion: '−5,9 pp', comentario: 'Sin remuneración en acciones ni amortización de intangibles; 35,4 % en el 1S26 [5, 3].' },
      { kpi: 'Provisión de rebajas comerciales (M USD)', valor_anterior: '63,5', valor_actual: '167,6', variacion: '×2,6', comentario: 'Contratos de PYLARIFY [1].' },
    ],
    clientes: 'Ningún cliente supera el 10 % de las ventas en 2023-2025 [1]. PYLARIFY se vende a hospitales, centros de imagen independientes y al Gobierno con contrato directo con Lantheus o con sus fabricantes PET (PMF), sin centrales de compras; DEFINITY va a hospitales y cardiólogos a través de distribuidores [1]. El poder de precio se ha invertido: con el fin del pago de transición de Medicare en 2025 y tres agentes de galio-68 y uno de flúor-18 compitiendo, Lantheus ha bajado el precio neto para defender volumen (la provisión de rebajas pasó de 63,5 a 167,6 M) [1]. DEFINITY sí mantiene precio, con más del 80 % del mercado de contraste ecocardiográfico de EE. UU. según la empresa [1].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'ebitda y vs_consenso de 3T24-4T25', tipo: 'Complemento', intentos: '1) Notas trimestrales (solo resultado operativo ajustado y GAAP); 2) 10-Q (D&A del semestre, no del trimestre); 3) titulares de Seeking Alpha (solo 2026)', decision: 'Omitido' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: competencia de PYLARIFY, DEFINITY y Neuraceq; patentes (Orange Book); reembolso de Medicare (OPPS 2025 y 2026)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${ED}/000119312526073498/lnth-20251231.htm` },
  { id: 2, titulo: 'DEFM14A: proyecciones por franquicia (próstata, neurología, DEFINITY) 2026-2030 y análisis de Morgan Stanley', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000119312526384284/d180727ddefm14a.htm` },
  { id: 3, titulo: 'Form 10-Q del 2T26: PYLARIFY TruVu, CRL de LNTH-2501, PNT2003, ventas por producto', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000119312526336795/lnth-20260630.htm` },
  { id: 4, titulo: 'Yahoo Finance quoteSummary: Telix, GE HealthCare y comparables (ingresos, EBITDA, consenso), 20-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/TLX' },
  { id: 5, titulo: 'FDA approves new Alzheimer’s PET imaging agent from Lantheus (Tauklarify, MK-6240)', editor: 'Radiology Business', tipo: 'Prensa', fecha: '2026-08-14', url: 'https://radiologybusiness.com/newsletter/2026-08-14/fda-approves-new-alzheimers-pet-imaging-agent-lantheus' },
  { id: 6, titulo: 'Titulares de Seeking Alpha sobre LNTH (Bravnesta aprobado; Bexlutry de Curium contra Lutathera; CRL de LNTH-2501)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-09-22', url: 'https://seekingalpha.com/api/sa/combined/LNTH.xml' },
];
const B_ = {
  _estado: 'completo',
  sector: {
    definicion: 'El mercado relevante es el de agentes de diagnóstico por imagen molecular en EE. UU. (95 % de las ventas de Lantheus): trazadores PET de cáncer de próstata (PSMA), de amiloide y tau para alzhéimer, y contrastes de ecografía cardiaca [1]. No hay una estadística pública fiable de su tamaño: las cifras de los informes de mercado mezclan equipos, isótopos y terapias. Por eso el informe mide la posición con las ventas de cada producto frente a las de sus rivales cotizados y con las proyecciones de la propia dirección [2, 4].',
    tamano: 'Sin cifra de mercado con dos fuentes independientes; como referencia, la franquicia de próstata de Lantheus (≈ 990 M USD en 2025) y la de Telix (≈ 890 M USD de ingresos del grupo en los últimos 12 meses, sobre todo Illuccix y Gozellix) [1, 4].',
    unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null,
    estructura: 'Concentrada',
    drivers: [
      { driver: 'Uso del PET PSMA en cáncer de próstata', efecto: '+', horizonte: 'Estructural', evidencia: 'PYLARIFY pasó de 43 M en 2021 a 1.058 M en 2024 y su volumen siguió subiendo en 2025 y 2026 [1, 3].' },
      { driver: 'Reembolso de Medicare (pago de transición y coste medio por unidad)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Desde el 1-ene-2025 PYLARIFY cobra por coste medio y sus rivales con pago de transición por precio medio +6 %; CMS mantiene el coste medio en 2026 [1].' },
      { driver: 'Fármacos anti-amiloide para alzhéimer', efecto: '+', horizonte: 'Estructural', evidencia: 'Neuraceq vende 75 M en el 1S26; la dirección proyecta 290 M en neurología en 2028 y 365 M en 2030 [3, 2].' },
      { driver: 'Genéricos y nuevas moléculas tras el fin de la exclusividad de PYLARIFY (mayo de 2026)', efecto: '−', horizonte: 'Estructural', evidencia: 'NCE-1 el 26-may-2025 y NCE el 26-may-2026; seis patentes hasta 2037 [1].' },
      { driver: 'Ecocardiografía con contraste', efecto: '+', horizonte: 'Estructural', evidencia: 'DEFINITY +3,9 % en 2025 y +6 % en el 1S26 con más del 80 % del mercado de EE. UU. [1, 3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 4, justificacion: 'En PSMA PET compiten Telix (Illuccix, Gozellix), Bracco (Posluma) y Novartis (Locametz); el precio neto de PYLARIFY baja desde 2025 [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Hospitales y centros de imagen negocian contratos y siguen el reembolso de Medicare; ningún cliente pesa más del 10 % [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Dependencia de los fabricantes PET con ciclotrón (PMF) y de Jubilant HollisterStier para DEFINITY (contrato hasta 2027) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 3, justificacion: 'Hace falta aprobación de la FDA por cada sitio de producción, pero tras mayo de 2026 caben genéricos (505(b)(2) o ANDA) [1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Imagen convencional (TAC, gammagrafía) y en alzhéimer los análisis de sangre de amiloide y tau [1].' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'No es un sector cíclico: el volumen de PET depende de la incidencia del cáncer y del reembolso, no de la economía. En 2020 la pandemia retrasó pruebas y los ingresos de Lantheus cayeron un 2 %; en 2008-09 la empresa (entonces privada, de Avista) dependía del tecnecio. El ciclo que importa es el del producto: PYLARIFY está en madurez y bajando de precio, y neurología empieza [1, 2].' },
    regulacion: 'Medicare paga los radiofármacos de diagnóstico aparte desde 2025 si cuestan más de 630 USD por día, por coste medio; los productos nuevos tienen tres años de pago de transición por precio medio +6 % (PYLARIFY lo tuvo de 2022 a 2024 y TruVu puede pedirlo) [1]. La FDA aprueba cada sitio de fabricación PET [1]. La fusión con Curium necesita el visto bueno de la FTC (el plazo HSR vence el 21-oct-2026) y de Alemania, Reino Unido y Suecia [6].',
    tendencias: 'El diagnóstico se acerca a la terapia (teranóstica: PSMA para Pluvicto, somatostatina para Lutathera), lo que valora la base instalada de PET. Llegan análisis de sangre para alzhéimer que pueden reducir los PET de cribado pero aumentar los de confirmación; la IA lee imágenes (aPROMISE de Lantheus) pero no sustituye al trazador [1, 5].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: '1.º en PET de próstata (PSMA) en EE. UU. por ventas, 1.º en contraste ecocardiográfico (más del 80 %), 3.º en PET de amiloide tras Lilly y GE (Neuraceq), y 2.º en tau (Tauklarify, aprobado en agosto de 2026, frente a Tauvid de Lilly) [1, 5].',
    competidores: [
      { nombre: 'Telix Pharmaceuticals (Illuccix, Gozellix)', pais: 'Australia', ticker: 'TLX', ingresos: 891, cuota_pct: null, margen_ebit_pct: null, comentario: 'Galio-68 en kit, más barato de producir; Gozellix con pago de transición [1, 4].' },
      { nombre: 'GE HealthCare (Flyrcado, Vizamyl, Optison)', pais: 'EE. UU.', ticker: 'GEHC', ingresos: 21266, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival en amiloide y contraste; socio de Lantheus en Flyrcado y en Japón [1, 4].' },
      { nombre: 'Bracco / Blue Earth Diagnostics (Posluma, Lumason)', pais: 'Italia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privada; PSMA de flúor-18 y contraste ecográfico [1].' },
      { nombre: 'Novartis (Locametz, Pluvicto, Lutathera)', pais: 'Suiza', ticker: 'NOVN', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'PSMA de galio-68 ligado a su terapia Pluvicto [1].' },
      { nombre: 'Eli Lilly (Amyvid, Tauvid)', pais: 'EE. UU.', ticker: 'LLY', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Líder en amiloide y tau; trazadores ligados a sus fármacos de alzhéimer [1].' },
      { nombre: 'Curium (comprador; Detectnet, Bexlutry)', pais: 'Francia', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Privado (CapVest); licenciatario de PYLARIFY en Europa (Pylclari) [1, 6].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Se estrecha',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'La red de fabricantes PET con ciclotrón da alcance en 48 estados, pero no crece con cada cliente [1].' },
        { fuente: 'Costes de cambio', puntuacion: 2, evidencia: 'Los centros cambian de trazador PSMA por precio: PYLARIFY baja de precio para conservar volumen [1].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Patentes de PYLARIFY y DEFINITY hasta 2037 y de Neuraceq hasta 2032; la exclusividad NCE de PYLARIFY venció en mayo de 2026 [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 2, evidencia: 'El flúor-18 permite lotes grandes; TruVu aumenta las dosis por lote [3].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Mercados pequeños con 3-4 rivales y aprobación de la FDA por sitio [1].' },
      ],
    },
    amenazas: 'La amenaza principal es el precio de PYLARIFY: con los rivales cobrando a precio medio +6 % por el pago de transición y PYLARIFY a coste medio, Lantheus descuenta, y desde mayo de 2026 caben genéricos de piflufolastat (la empresa no había recibido avisos de Paragraph IV a la fecha del 10-K) [1]. La dirección proyecta la franquicia de próstata en 946 M en 2026, máximo de 1.046 M en 2028 y 991 M en 2030 [2]. En neurología, los análisis de sangre y Lilly; en DEFINITY, un genérico posible de perflutren [1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Lantheus fabrica (con terceros) y vende agentes de diagnóstico por imagen en EE. UU.: PYLARIFY, un trazador PET de flúor-18 que localiza el cáncer de próstata (64 % de las ventas de 2025); DEFINITY, un contraste de microburbujas para ecocardiografía (21 %); y Neuraceq, un trazador PET de amiloide para alzhéimer comprado con Life Molecular en 2025. Acaba de lanzar Tauklarify (MK-6240, tau) y PYLARIFY TruVu (fórmula nueva), y tiene aprobado Bravnesta (genérico de Lutathera). Vendió en enero de 2026 el negocio SPECT (TechneLite) a SHINE [1, 3, 5, 6].',
    como_gana_dinero: 'Cobra por dosis: cada escáner PET usa una dosis de PYLARIFY o Neuraceq que fabrica un centro con ciclotrón y se inyecta en horas; DEFINITY es un vial. El margen bruto es alto (61 % en 2025, más sin amortizaciones) porque el coste es sobre todo el pago a los fabricantes PET; el margen depende del precio neto que negocia con hospitales y del reembolso de Medicare. Casi todo es recurrente (cada paciente es una venta nueva), sin estacionalidad marcada. El apalancamiento operativo es alto: un 10 % menos de precio de PYLARIFY son ≈ 100 M de EBIT menos [1].',
  },
  huecos: [
    { seccion: 'sector', campo: 'tamano, serie, tcac y cr5 del mercado', tipo: 'Núcleo', intentos: '1) 10-K y proxy de la fusión (no dan tamaño de mercado); 2) informes anuales de Telix y GE HealthCare (no separan PSMA en EE. UU.); 3) informes de mercado en prensa (mezclan equipos, isótopos y terapias, sin fuente primaria)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'cuota_pct y margen EBIT de los competidores', tipo: 'Complemento', intentos: '1) 10-K (solo «más del 80 %» en DEFINITY); 2) cuentas de Telix (sin desglose por producto en EE. UU.); 3) Yahoo (sin EBIT por segmento)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy de la junta 2026 (DEF 14A): consejo, comisiones, remuneración 2025, accionistas', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-03-20', url: `${ED}/000119312526117649/d61755ddef14a.htm` },
  { id: 2, titulo: 'DEFM14A de la fusión: antecedentes, intereses de consejeros y directivos, accionistas a 17-ago-2026', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000119312526384284/d180727ddefm14a.htm` },
  { id: 3, titulo: '8-K: resultados de la junta del 30-abr-2026 (consejo desclasificado, remuneración)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${ED}/000119312526201556/d16067d8k.htm` },
  { id: 4, titulo: '8-K: junta extraordinaria del 14-oct-2026 (fusión aprobada)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000119312526421732/d183496d8k.htm` },
  { id: 5, titulo: '8-K: acuerdo de fusión con Curium, derechos contingentes, bonos por la operación', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000119312526331138/d167446d8k.htm` },
  { id: 6, titulo: 'Form 4 de directivos y consejeros (20-oct-2025 a 20-oct-2026), herramientas/form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001521036&type=4' },
  { id: 7, titulo: 'Notas de resultados con la guía anual (2T25, 3T25, 4T25, 1T26)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-05-07', url: `${ED}/000119312526210369/lnth-ex99_1.htm` },
  { id: 8, titulo: '8-K: litigios y demandas por la información del proxy de la fusión', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-10-02', url: `${ED}/000119312526412563/d31891d8k.htm` },
];
const C = {
  _estado: 'completo',
  directivos: {
    equipo: [
      { nombre: 'Mary Anne Heino', cargo: 'Presidenta ejecutiva y consejera delegada (interina desde el 1-ene-2026)', desde: '2015', participacion_pct: 1.0, trayectoria: 'Consejera delegada de 2015 a 2025: llevó la empresa de 300 M de ventas a 1.500 M con la compra de Progenics y PYLARIFY. Volvió como presidenta ejecutiva en noviembre de 2025 tras la salida de Brian Markison y negoció la venta a Curium [1, 2].' },
      { nombre: 'Robert J. Marshall Jr.', cargo: 'Director financiero', desde: '2015', participacion_pct: 0.1, trayectoria: 'En la empresa desde 2015 en finanzas; director financiero desde 2019 [1].' },
      { nombre: 'Dr. Ludger Dinkelborg', cargo: 'Director de ciencia (I+D)', desde: '2025', participacion_pct: 0.02, trayectoria: 'Llegó con Life Molecular Imaging, de la que era consejero delegado; responsable del desarrollo de Neuraceq y NAV-4694 [1].' },
      { nombre: 'Amanda Morgan', cargo: 'Directora comercial', desde: '2023', participacion_pct: 0.04, trayectoria: 'Responsable de ventas de PYLARIFY y DEFINITY [1].' },
      { nombre: 'Daniel M. Niedzwiecki', cargo: 'Director administrativo y secretario general', desde: '2016', participacion_pct: 0.1, trayectoria: 'Abogado general; firma los 8-K de la fusión [1, 4].' },
    ],
    historial_guidance: [
      { anio: '2024', guia: 'Ingresos 1.510-1.530 M y BPA ajustado 6,50-6,60 USD (última guía)', real: '1.533,9 M y 6,76 USD', cumplida: 'Sí' },
      { anio: '2025', guia: 'Inicial (mayo): 1.550-1.585 M y 6,60-6,70 USD; rebajada en agosto a 1.475-1.510 M y 5,50-5,70', real: '1.541,6 M y 6,08 USD', cumplida: 'Parcial' },
      { anio: '2026', guia: '1.400-1.450 M y 5,00-5,25 USD (febrero, reafirmada en mayo; suspendida en agosto por la fusión)', real: '1S26: 765,5 M y 3,01 USD', cumplida: 'Parcial' },
    ],
    comentario: 'El equipo es de la casa, pero la cúpula se movió en 2025: Paul Blanchfield (presidente) se fue y el consejero delegado Brian Markison anunció su retiro en noviembre de 2025 tras rebajar dos veces la guía de 2025; volvió Heino como interina [2, 7]. La guía de 2025 se rebajó en agosto un 6 % en ingresos y un 16 % en BPA, y luego se batió; la de 2026 se superaba al ritmo del semestre [7]. No hay sucesor permanente: el consejo dejó de buscarlo con la venta. Tras el cierre, la gestión pasa a Curium.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Mary Anne Heino', cargo: 'Presidenta y consejera delegada', tipo: 'Ejecutivo', desde: '2015', comisiones: '—' },
      { nombre: 'Julie McHugh', cargo: 'Consejera independiente coordinadora', tipo: 'Independiente', desde: '2017', comisiones: 'Remuneración' },
      { nombre: 'Minnie Baylor-Henry', cargo: 'Consejera', tipo: 'Independiente', desde: '2022', comisiones: 'Nombramientos' },
      { nombre: 'Heinz Mäusli', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría' },
      { nombre: 'Dr. Phuong Khanh (P.K.) Morrow', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Ciencia y Tecnología' },
      { nombre: 'Gary J. Pruden', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Remuneración' },
      { nombre: 'Dr. James H. Thrall', cargo: 'Consejero', tipo: 'Independiente', desde: '2018', comisiones: 'Ciencia y Tecnología' },
      { nombre: 'Dr. Gérard Ber', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Ciencia y Tecnología' },
      { nombre: 'Julie Eastland', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría' },
      { nombre: 'Samuel Leno', cargo: 'Consejero', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría (presidente)' },
    ],
    presidente_ceo_separados: false, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: true,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 2,
    voto_remuneracion_pct: 85.8, voto_remuneracion_contra_pct: 13.7, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 13.70, fijo: null, variable_corto: null, variable_largo: null, ratio_salario_medio: 79 },
    remuneracion: 'El variable anual depende un 60 % de ingresos y «BPA de bonus» y un 40 % de objetivos estratégicos; el largo plazo, de acciones restringidas y PSU [1]. Brian Markison cobró ≈ 13,7 M USD como consejero delegado en 2025 (ratio de 79 veces el empleado medio) [1]. Con la venta: bolsa de 6 M de bonos por la operación (4 M para Heino y 0,5 M para Niedzwiecki), aceleración de opciones y unidades, y PSU convertidas a solo tiempo [5]. La retribución ligada a la fusión obtuvo un 13,7 % de votos en contra el 14-oct-2026 (49,1 M a favor y 7,8 M en contra); la retribución ordinaria, un 3,5 % en contra en abril [3, 4].',
    accionistas: [
      { nombre: 'BlackRock', pct: 13.2, tipo: 'Institucional', variacion: '13G de enero de 2024' },
      { nombre: 'Farallon Partners', pct: 8.6, tipo: 'Fondo de arbitraje de fusiones', variacion: 'Entra tras el anuncio de la venta' },
      { nombre: 'Janus Henderson', pct: 7.3, tipo: 'Institucional', variacion: '—' },
      { nombre: 'FMR (Fidelity)', pct: 6.7, tipo: 'Institucional', variacion: 'Sube (13G de nov-2025)' },
      { nombre: 'Vanguard', pct: 5.1, tipo: 'Institucional', variacion: '13G/A de jul-2026' },
      { nombre: 'Consejeros y directivos', pct: 1.8, tipo: 'Insiders', variacion: '—' },
      { nombre: 'Autocartera', pct: 10.0, tipo: 'Autocartera', variacion: '7,24 M de acciones (477 M a coste) tras las recompras de 2025' },
    ],
    insiders: [],
    control_y_defensas: 'Sin accionista de control: el mayor es BlackRock con el 13,2 % y los fondos de arbitraje (Farallon 8,6 %) han entrado tras el anuncio [2]. Una acción, un voto. El consejo, que era escalonado, se desclasifica en tres años desde la junta de 2026 [3]. La fusión fue aprobada el 14-oct-2026 por el 97 % de los votos emitidos (55,5 M a favor, 1,6 M en contra) [4]. Comisión de ruptura: 228 M a pagar por Lantheus si acepta una oferta mejor; 385 M o 100 M (regulatoria) a pagar por Curium [5].',
    alertas: [
      'Venta pendiente a Curium (102,50 USD en efectivo más hasta 12 USD en derechos contingentes), aprobada por los accionistas; falta la FTC y reguladores de Alemania, Reino Unido y Suecia [4, 5].',
      'Tres demandas de accionistas y dieciséis cartas por la información del proxy; la empresa publicó información adicional sin admitir culpa [8].',
      'Dos cambios de consejero delegado en 24 meses (Markison en 2025 y Heino como interina en 2026) [2].',
    ],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'remuneracion_ceo: desglose fijo y variable del consejero delegado', tipo: 'Complemento', intentos: '1) Tabla de remuneración del DEF 14A (desglose de Markison en una tabla que no se extrajo limpia); 2) DEFM14A (solo pagos ligados a la fusión); 3) total de la ratio de remuneración del DEF 14A (13,7 M)', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de LNTH, SPY y XLV (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/LNTH/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de LNTH y datos de comparables, 20-oct-2026 16:19 UTC', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/LNTH/analysis' },
  { id: 3, titulo: 'DEFM14A: análisis de Morgan Stanley (DCF 88,10-118,60 USD; comparables 7,9-10,5x EBITDA; primas pagadas; objetivos de analistas 98-129 USD), precio no afectado de 94,47 USD', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-09-08', url: `${ED}/000119312526384284/d180727ddefm14a.htm` },
  { id: 4, titulo: '8-K: acuerdo de fusión con Curium (102,50 USD + derechos contingentes de hasta 12 USD; comisiones; fecha límite 2-may-2027)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-08-04', url: `${ED}/000119312526331138/d167446d8k.htm` },
  { id: 5, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,15 % el 19-oct)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 6, titulo: 'Implied ERP by month (ERPbymonth.xlsx): 4,20 % en octubre de 2026', editor: 'A. Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 7, titulo: 'Movimiento del precio de LNTH (herramientas/movimiento.mjs, Yahoo)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/LNTH' },
  { id: 8, titulo: 'Titulares de Seeking Alpha sobre LNTH (rumor de Bloomberg del 22-may; Curium en conversaciones el 27-jul; resultados)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-20', url: 'https://seekingalpha.com/api/sa/combined/LNTH.xml' },
  { id: 9, titulo: '8-K: Curium retira y vuelve a presentar la notificación HSR; el plazo vence el 21-oct-2026; cierre esperado en el 1S27', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-09-21', url: `${ED}/000119312526396654/d148743d8k.htm` },
  { id: 10, titulo: '8-K: demandas de accionistas e información adicional del proxy', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-10-02', url: `${ED}/000119312526412563/d31891d8k.htm` },
  { id: 11, titulo: '8-K: la junta extraordinaria aprueba la fusión (14-oct-2026)', editor: 'Lantheus Holdings (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000119312526421732/d183496d8k.htm` },
  { id: 12, titulo: 'Noticias de 12 meses clasificadas (herramientas/noticias.mjs): financiación de 4.250 M para Curium (JPMorgan, 15-oct), demandas, HSR', editor: 'Bloomberg, Law360, Reuters vía noticias.mjs', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://www.bloomberg.com/news/articles/2026-10-15/banks-vie-for-4-25-billion-debt-financing-to-back-lantheus-deal' },
  { id: 13, titulo: 'Lantheus Reports Second Quarter 2026 Financial Results (guía suspendida)', editor: 'Lantheus Holdings (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-08-06', url: `${ED}/000119312526336771/lnth-ex99_1.htm` },
];
// Comparables: misma fuente y fecha (Yahoo, 20-oct-2026). PER de los próximos 12 meses = precio ÷ (2,5/12 BPA del ejercicio en curso
// + 9,5/12 del siguiente); crecimiento = ventas de los próximos 12 meses ÷ últimos 12 meses − 1.
const comps = [['GE HealthCare', 'GEHC', 'US'], ['Globus Medical', 'GMED', 'US'], ['Merit Medical', 'MMSI', 'US'], ['Haemonetics', 'HAE', 'US'], ['CONMED', 'CNMD', 'US'], ['Integra LifeSciences', 'IART', 'US'], ['Bruker', 'BRKR', 'US'], ['Telix Pharmaceuticals', 'TLX', 'AU']];
const empresas = comps.map(([n, t, p]) => {
  const d = Y[t]; const tr = Object.fromEntries(d.trend.map((x) => [x.periodo, x]));
  const w0 = 2.5 / 12, w1 = 9.5 / 12;
  const bpaNtm = tr['0y']?.bpa != null && tr['+1y']?.bpa != null ? w0 * tr['0y'].bpa + w1 * tr['+1y'].bpa : null;
  const vNtm = tr['0y']?.ventas != null && tr['+1y']?.ventas != null ? w0 * tr['0y'].ventas + w1 * tr['+1y'].ventas : null;
  return {
    nombre: n, ticker: t, pais: p, capitalizacion: Math.round(d.cap / 1e6), ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev / d.ebitda), ev_ebitda_ntm: null,
    per_ntm: bpaNtm > 0 && d.precio / bpaNtm < 100 ? r1(d.precio / bpaNtm) : null, /* Telix: beneficio casi nulo */ crecimiento_pct: vNtm ? r1((vNtm / d.ventas - 1) * 100) : null,
    margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: null, dn_ebitda: r1((d.ev - d.cap) / d.ebitda), fcf_yield_pct: null,
  };
});
const pers = empresas.map((e) => e.per_ntm).filter((x) => x != null).sort((a, b) => a - b);
const medPer = pers.length % 2 ? pers[(pers.length - 1) / 2] : r1((pers[pers.length / 2 - 1] + pers[pers.length / 2]) / 2);
const L = Y.LNTH;
const cierres = Object.fromEntries((B.cierres_ejercicio || []).map((c) => [c.anio, c.precio_cierre]));
const D = {
  _estado: 'completo',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Lantheus Holdings, Inc.', nombre_corto: 'Lantheus', ticker: 'LNTH', isin: 'US5165441032', mercado: 'Nasdaq Global Market', indice_referencia: 'S&P MidCap 400',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Salud', industria: 'Equipos y suministros sanitarios (radiofármacos de diagnóstico)', sede: 'Bedford, Massachusetts', fundacion: '1956', empleados: 1193, web: 'https://www.lantheus.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 67.5, capitalizacion_publicada: Math.round(L.cap / 1e6), free_float_pct: r1(58613282 / 65299875 * 100),
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-11-05',
  },
  consenso: {
    guidance: 'La guía de 2026 (ingresos de 1.400-1.450 M y BPA ajustado de 5,00-5,25 USD, dada en febrero y reafirmada el 7-may) quedó suspendida el 6-ago-2026 por la fusión, sin conferencia [13]. No hay plan a medio plazo público; el proxy de la fusión publica las proyecciones internas de la dirección: ingresos de 1.513 M en 2026, 1.621 M en 2027, 1.807 M en 2028 y 2.017 M en 2030, con un EBIT ajustado (sin remuneración en acciones) de 525, 592, 679 y 742 M [3].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(L.trend.find((x) => x.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(L.trend.find((x) => x.periodo === '0y').bpa), dpa: 0, fuente: 'Yahoo Finance, 9 analistas, BPA ajustado de la empresa [2]' },
      { periodo: '2027e', ingresos: Math.round(L.trend.find((x) => x.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(L.trend.find((x) => x.periodo === '+1y').bpa), dpa: 0, fuente: 'Yahoo Finance, 10 analistas [2]' },
      { periodo: '2028e', ingresos: 1807, ebitda: null, ebit: 679, bpa: null, dpa: 0, fuente: 'Proyección de la dirección en el proxy de la fusión (EBIT ajustado), no consenso [3]' },
    ],
    recomendaciones: { n_analistas: 10, comprar: 2, mantener: 8, vender: 0, po_medio: r2(L.po_medio), po_min: L.po_min, po_max: L.po_max },
    revisiones: 'Solo Yahoo publica gratis estimaciones completas; MarketScreener no se consultó. Las estimaciones apenas se mueven en 3 meses (BPA 2026 de 5,37 a 5,36; 2027 de 6,35 a 6,38) porque la mayoría de los analistas pasó a «mantener» al anunciarse la venta y fijó el objetivo en el precio de la oferta: el mínimo es 102,50 USD y el medio 106,99 con 8 objetivos [2]. Antes de la oferta los objetivos iban de 98 a 129 USD según el proxy [3].',
    base_ebitda: 'ajustado', ajuste_ebitda_pct_ventas: 5.0,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    beta: 0.81,
    posicion_corta_pct: r1(L.corto_pct * 100),
    comentario: 'La acción subió un 80 % en un año (frente al 17 % del S&P 500) en dos saltos: la recuperación desde el mínimo de 50,15 USD de noviembre de 2025 con los resultados que batían la guía, y la especulación sobre la venta (+24 % en mayo de 2026 tras el artículo de Bloomberg del 22-may) [1, 8]. Desde el anuncio (3-ago) cotiza pegada a la oferta: entre 96 y 101 USD, un 2-6 % por debajo de los 102,50 en efectivo [7]. La beta mensual de 5 años (0,01) no sirve; la semanal de 5 años ajustada es 0,81 [1]. La caída máxima de 5 años refleja la bajada de 2025 por el precio de PYLARIFY.',
    contexto: {
      movimiento: { fecha: '2026-10-20', var_1m_pct: -0.2, var_3m_pct: -4.3, var_6m_pct: 22.7, var_12m_pct: 80.0, dist_max_52s_pct: -9.8, dist_min_52s_pct: 97.5, dist_max_historico_pct: -19.0, tendencia: 'alcista', volatilidad_60d_pct: 13, avisos: [] },
      movimientos_fuertes: [
        { periodo: 'nov-2025', var_pct: -11.0, causa: 'Resultados del 3T25 (6-nov): BPA ajustado de 1,27 USD (−25 %), guía de 2025 rebajada y retiro del consejero delegado; −6,2 % y −4,9 % en dos sesiones, mínimo de 52 semanas el 10-nov [8, 1].', veredicto: 'no cambia', condicion: null },
        { periodo: 'dic-2025 a abr-2026', var_pct: 45.0, causa: 'Recuperación con la guía de 2026 por encima de lo temido y el 1T26 que bate (1,46 frente a 1,23 USD), más la aprobación de TruVu y de PNT2003 [8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'may-2026', var_pct: 24.4, causa: 'Bloomberg publica el 22-may que Lantheus estudia su venta tras una oferta (Curium); precio no afectado de 94,47 USD el 21-may [3, 8].', veredicto: 'no cambia', condicion: null },
        { periodo: 'jul-2026', var_pct: -9.0, causa: 'Recogida de beneficios desde el máximo de 111,86 USD (30-jun) y CRL de LNTH-2501 (26-jun); el 27-jul Bloomberg cifra la oferta en ≈ 7.000 M, por debajo de lo que descontaba el precio [8, 7].', veredicto: 'no cambia', condicion: null },
      ],
      noticias: [
        { fecha: '2026-08-03', tipo: 'fusión u oferta', hecho: 'Acuerdo de venta a Curium (CapVest) por 102,50 USD en efectivo más un derecho contingente de hasta 12 USD por ventas de 2028-2030; prima del 9 % sobre el precio no afectado; fecha límite 2-may-2027 (prorrogable a 30-nov-2027) [4, 3].', veredicto: 'descarta', condicion: 'El precio queda fijado por la oferta: la tesis independiente del informe no se puede cumplir mientras la venta siga viva; se rehace el informe solo si la operación se rompe.' },
        { fecha: '2026-10-21', tipo: 'demanda o regulador', hecho: 'Vence a las 23:59 (hora del Este) el plazo HSR de la FTC tras la retirada y nueva presentación del 17/21-sep; si la FTC pide más información (segunda solicitud) el cierre se retrasa; solapes posibles en PSMA (Cu-64 PSMA I&T de Curium), en genéricos de Lutathera (Bexlutry de Curium y Bravnesta de Lantheus) y en cardiología [9, 12].', veredicto: 'retrasa', condicion: 'Hasta que la FTC deje vencer el plazo o pida más información; una ruptura llevaría la acción hacia 70-80 USD (estimación propia con el DCF y los comparables).' },
        { fecha: '2026-10-14', tipo: 'fusión u oferta', hecho: 'La junta aprueba la fusión con el 97 % de los votos emitidos [11].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-15', tipo: 'fusión u oferta', hecho: 'Los bancos (JPMorgan) preparan 4.250 M de deuda para financiar a Curium; la operación no tiene condición de financiación [12, 4].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-10-02', tipo: 'demanda o regulador', hecho: 'Tres demandas de accionistas y dieciséis cartas por la información del proxy; la empresa amplía la información [10].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-14', tipo: 'resultados', hecho: 'La FDA aprueba Tauklarify (MK-6240), trazador PET de tau; el 22-sep, Bravnesta (PNT2003) [8].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-08-06', tipo: 'recomendación', hecho: 'Tras la oferta la mayoría de analistas baja a «mantener» con objetivo en el precio de la oferta: 2 comprar y 8 mantener; objetivo medio 106,99 USD [2].', veredicto: 'no cambia', condicion: null },
        { fecha: '2026-11-05', tipo: 'resultados', hecho: 'Resultados del 3T26 el 5-nov-2026 (sin conferencia previsible) [2].', veredicto: 'no cambia', condicion: null },
      ],
      proximos_resultados: '2026-11-05',
      veredicto: 'descarta',
      condicion: 'Mientras siga viva la venta a Curium (102,50 USD en efectivo más derechos contingentes) la acción no puede llegar a un objetivo independiente: no es una compra value. Si la FTC o la financiación rompen la operación, rehacer el informe con el precio de entonces.',
      comentario: 'Desde el 3-ago-2026 el precio lo fija la oferta de Curium: la acción cotiza a 99,92 USD (cierre del 19-oct), un 2,5 % por debajo de los 102,50 en efectivo, con una volatilidad de 60 sesiones del 13 %, propia de una acción en arbitraje [7, 4]. Lo que queda por resolver es regulatorio: el plazo HSR vence el 21-oct y Curium compite con Lantheus en genéricos de Lutathera y en PSMA, por eso la FTC pidió más tiempo; la empresa sigue esperando cerrar en el primer semestre de 2027 [9]. No hay ventas de directivos en mercado ni colocaciones. Veredicto global: descarta como compra value (el recorrido está topado por la oferta y el riesgo de ruptura es asimétrico a la baja); la decisión es de arbitraje, no de valor.',
    },
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ['2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'].map((a) => ({ anio: a, precio_cierre: cierres[a] ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: ['2020', '2021', '2022'].includes(a) })),
    comentario: 'Con el BPA GAAP el PER histórico no dice nada: 2020 y 2021 son años de pérdidas, 2022 lleva 260 M de licencias a gasto y 2023 un deterioro de 138 M; por eso se excluyen 2020-2022 de la mediana. En base ajustada con remuneración en acciones (la del objetivo a 12 meses), la acción cotizó entre 7 y 18 veces el beneficio del año siguiente de 2021 a 2025: el mercado nunca se creyó que PYLARIFY aguantara precio. Hoy, a 18,9 veces nuestro BPA de los próximos 12 meses, cotiza por encima de toda su historia salvo 2024, porque el precio es el de la oferta, no el del negocio.',
    confianza: 'Media',
  },
  comparables: {
    criterio: 'No hay radiofármacos de diagnóstico rentables y cotizados en EE. UU. aparte de Lantheus. Se usa el grupo de Morgan Stanley en el proxy (tecnología médica de tamaño parecido: Globus, Merit, Haemonetics, CONMED, Integra, Telix) más GE HealthCare (rival en diagnóstico farmacéutico) y Bruker (imagen preclínica) [3]. Elekta se quita porque cotiza en coronas y el ejercicio acaba en abril. Telix no tiene PER (beneficio casi nulo). Todas con datos de Yahoo del 20-oct-2026 [2].',
    empresas,
    comentario: `La mediana del PER de los próximos 12 meses del grupo es ${String(medPer).replace('.', ',')}x, y Morgan Stanley usó 7,9-10,5 veces el EBITDA ajustado de 2026, que daba 63,85-84,20 USD por acción [3]. Lantheus cotiza a ≈ 15,7 veces el BPA ajustado adelantado de Yahoo (sin remuneración en acciones) y a 18,9 veces el nuestro: por encima de los comparables con menos crecimiento (−3 % en 2026 por la venta del SPECT). La prima la explica la oferta, no el negocio: a los múltiplos del grupo la acción valdría 70-85 USD.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2026-08', objetivo: 'Lantheus Holdings', comprador: 'Curium (CapVest)', ev: 6800, ev_ventas: 4.37, ev_ebitda: 12.3, prima_pct: 8.5, excluir: false, comentario: 'Estimación propia: 102,50 USD × 67,5 M de acciones diluidas + 575 M de convertible − 593 M de caja − 119 M de participaciones; sin los derechos contingentes (hasta 12 USD, 3,51 de valor actual según Morgan Stanley). EBITDA ajustado de los últimos 12 meses ≈ 555 M (resultado operativo ajustado 529,6 + depreciación) [4, 3, 13].' },
      { fecha: '2025-07', objetivo: 'Life Molecular Imaging (Neuraceq)', comprador: 'Lantheus', ev: 353, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Más hasta 400 M en hitos; sin cifras de ventas publicadas de la comprada.' },
      { fecha: '2025-04', objetivo: 'Evergreen Theragnostics', comprador: 'Lantheus', ev: 276, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Fabricación de radiofármacos para terceros; sin cifras de ventas publicadas.' },
      { fecha: '2026-01', objetivo: 'Negocio SPECT (TechneLite y otros)', comprador: 'SHINE Technologies', ev: null, ev_ventas: null, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Pago en caja, pagarés y acciones de Illuminated; plusvalía de 59,5 M; sin precio total publicado.' },
      { fecha: '2023-10', objetivo: 'POINT Biopharma', comprador: 'Eli Lilly', ev: 1400, ev_ventas: null, ev_ebitda: null, prima_pct: 87, excluir: false, comentario: 'Radioterapias sin ventas (socio de Lantheus en PNT2002/2003).' },
    ],
    comentario: 'La única transacción con múltiplo es la propia venta a Curium: ≈ 12,3 veces el EBITDA ajustado de los últimos 12 meses y 4,4 veces las ventas, con una prima del 9 % sobre el precio no afectado (94,47 USD) frente al 26-42 % habitual en compras sanitarias de 4.000-20.000 M que cita Morgan Stanley [3]. La prima baja se explica por la subida previa (+80 % en un año) y porque el consejo solo encontró otro interesado (Parte A) que no ofertó [3]. Una oferta mejor es improbable: el proceso duró de febrero a agosto y nadie más pujó.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'transacciones', campo: 'múltiplos de otras compras de radiofármacos de diagnóstico', tipo: 'Complemento', intentos: '1) Proxy de la fusión (Morgan Stanley solo da primas, no múltiplos); 2) 10-K de Lantheus (sin ventas de las compradas); 3) notas de prensa de Lilly-POINT, Novartis-AAA y BMS-RayzeBio (empresas sin ventas o sin EBITDA)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de mensajes de $LNTH (30 últimos, ago-oct 2026)', editor: 'Stocktwits (API pública)', tipo: 'Foros y redes', fecha: '2026-10-04', url: 'https://api.stocktwits.com/api/2/streams/symbol/LNTH.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y titulares de LNTH (p. ej., «Why I Am Exiting Before The Merger Closes», 10-ago-2026)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-09-22', url: 'https://seekingalpha.com/api/sa/combined/LNTH.xml' },
];
const E = {
  _estado: 'completo',
  sentimiento: {
    tono: 'Negativo', tendencia: 'Empeora',
    revisadas: [
      { plataforma: 'Stocktwits ($LNTH)', fecha: '2026-10', n_comentarios: 30, tono: 'Negativo', resumen: 'Pequeños accionistas enfadados con la venta: «regalaron la empresa» y «paracaídas dorados»; algunos votaron en contra de la retribución ligada a la fusión. Otros solo comentan el calendario HSR [1].' },
      { plataforma: 'Seeking Alpha (artículos y titulares)', fecha: '2026-09', n_comentarios: 10, tono: 'Dividido', resumen: 'Antes de la oferta, «el giro funciona, pero el dinero fácil ya está hecho» (junio); después, «me salgo antes del cierre»: poco recorrido frente a 102,50 USD y riesgo regulatorio [2].' },
    ],
    temas: [
      { tema: 'Precio de la oferta bajo', postura: 'Bajista', peso: 'Alto', contraste: 'La prima es del 9 % sobre el precio no afectado frente al 26-42 % habitual; el DCF de Morgan Stanley llegaba a 118,60 USD y nuestro valor independiente queda por debajo de la oferta [D3]. La queja tiene base en la prima, no en el valor.' },
      { tema: 'Retribución de los directivos con la venta', postura: 'Bajista', peso: 'Medio', contraste: 'Bolsa de 6 M de bonos y aceleración de acciones; 13,7 % de votos en contra de la retribución ligada a la fusión [C4, C5].' },
      { tema: 'Riesgo regulatorio y calendario', postura: 'Dividida', peso: 'Medio', contraste: 'El plazo HSR vence el 21-oct; cierre esperado en el 1S27 [D9].' },
    ],
    lectura: 'El sentimiento no aporta información sobre el negocio: es el enfado habitual de los pequeños accionistas con una venta con poca prima. Sí confirma que el mercado trata la acción como arbitraje (comprar a 99-100 para cobrar 102,50 y la lotería del derecho contingente) y que el riesgo que vigila es la FTC.',
    confianza: 'Baja',
  },
  huecos: [
    { seccion: 'sentimiento', campo: 'revisadas: más de dos sitios con debate', tipo: 'Complemento', intentos: '1) Reddit (403 desde la nube); 2) Stocktwits web y MarketBeat (sin debate propio, solo titulares); 3) Motley Fool e interactive investor (sin artículos recientes de LNTH)', decision: 'Omitido' },
  ],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, pers);
