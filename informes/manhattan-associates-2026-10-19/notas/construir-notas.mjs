// Escribe las notas A-E de Manhattan Associates (corte 2026-10-19) a partir de los documentos de notas/docs (EDGAR y web),
// del XBRL de la SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 19-oct-2026, 16:04 UTC)
// y de la ficha sectorial de software (14-oct-2026). Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/manhattan-associates-2026-10-19/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/1056696';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K 2025 (cuentas, segmentos, RPO, competidores, riesgos de IA, plantilla, auditor)', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000119312526037138/manh-20251231.htm` },
  { id: 2, titulo: 'Manhattan Associates Reports Second Quarter Results (2T26; guía 2026; conciliación GAAP-ajustado; balance y flujos a 30-jun-2026)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000119312526320952/manh-ex99_1.htm` },
  { id: 3, titulo: 'Manhattan Associates Reports First Quarter Results (1T26; guía 2026 revisada)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-21', url: `${ED}/000119312526166709/manh-ex99_1.htm` },
  { id: 4, titulo: 'Manhattan Associates Reports Fourth Quarter Results (4T25 y año 2025; guía inicial 2026)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-27', url: `${ED}/000119312526024382/manh-ex99_1.htm` },
  { id: 5, titulo: 'Manhattan Associates Reports Third Quarter Results (3T25)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-21', url: `${ED}/000119312525245073/manh-ex99_1.htm` },
  { id: 6, titulo: 'Notas de resultados del 4T de 2018 a 2024 (BPA ajustado anual y trimestral, segmentos)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-01-28', url: `${ED}/000095017025009786/manh-ex99_1.htm` },
  { id: 7, titulo: 'Form 10-K 2023 (segmentos y tipos de ingreso 2021-2023)', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2024-02-06', url: `${ED}/000095017024011411/manh-20231231.htm` },
  { id: 8, titulo: 'Form 10-Q del 2T26 (acciones a 28-jul-2026, RPO, liquidez sin deuda ni líneas de crédito)', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000119312526327591/manh-20260630.htm` },
  { id: 9, titulo: 'Form 8-K: reducción de plantilla del ≈ 6 % (partida 2.05) y confirmación de la guía', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-06-01', url: `${ED}/000119312526251382/manh-20260601.htm` },
  { id: 10, titulo: 'XBRL de la SEC (companyfacts): cuenta, balance y flujos 2016-2025; pagos en acciones', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0001056696.json' },
  { id: 11, titulo: 'Manhattan Associates Q1 2026: guidance raise, cloud +24 %, win rate above 70 %, agents (resumen de la conferencia)', editor: 'FreightWaves', tipo: 'Prensa', fecha: '2026-04-22', url: 'https://www.freightwaves.com/?p=572449' },
  { id: 12, titulo: 'Titulares de Seeking Alpha sobre MANH (2T26: BPA 1,39 bate en 0,07 y ventas en 10 M; 1T26: bate en 0,13; guía de RPO 2.620-2.680 M; Active Editions)', editor: 'Seeking Alpha (RSS)', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://seekingalpha.com/api/sa/combined/MANH.xml' },
  { id: 13, titulo: 'Manhattan Associates Q2 2026 earnings call highlights (agentes en más del 10 % de la base Active; ingenieros desplegados)', editor: 'MarketBeat / Nasdaq', tipo: 'Prensa', fecha: '2026-07-28', url: 'https://www.marketbeat.com/instant-alerts/manhattan-associates-q2-earnings-call-highlights-2026-07-28/' },
];
const xc = Object.fromEntries(X.financieros.cuenta.map((c) => [c.periodo, c]));
const SBC = { 2022: 59.4, 2023: 71.6, 2024: 93.2, 2025: 111.3 };
// No recurrentes dentro del resultado operativo (positivo = gasto): reclamación sanitaria extraordinaria (2024: +7,0; 2025:
// −6,9 neto) y reestructuración (2025: 2,9) [A2, A4].
const NR = { 2024: 7.0, 2025: r1(2.937 - 6.882) };
const anios = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = anios.map((a) => ({
  ...Object.fromEntries(Object.entries(xc[a]).filter(([k]) => k !== 'fin')),
  gastos_financieros: 0, participadas_en_ebitda: null, no_recurrentes_en_ebitda: NR[a] ?? null, dpa: 0, dpa_extraordinario: null,
}));
const xb = Object.fromEntries(X.balance.historico.map((c) => [c.periodo, c]));
const balance = anios.map((a) => ({
  ...Object.fromEntries(Object.entries(xb[a]).filter(([k]) => k !== 'fin')),
  intangibles: 0, existencias: 0, activos_contrato: null, deuda_financiera: 0, arrendamientos: 0, minoritarios: 0,
}));
const xf = Object.fromEntries(X.flujos.historico.map((c) => [c.periodo, c]));
const flujos = anios.map((a) => ({
  ...Object.fromEntries(Object.entries(xf[a]).filter(([k]) => k !== 'fin')),
  pagos_arrendamientos: 0, adquisiciones: a === '2016' ? null : 0, desinversiones: 0, dividendos: 0, emision_acciones: 0,
}));
const A = {
  _estado: 'completa (analista, sin subagentes)',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 1126.2, ebitda: 280.7, ebit: 274.0, beneficio_neto: 210.2, bpa: 3.49, dpa: 0, dpa_extraordinario: null, fcf: 399.2, participadas_en_ebitda: null, no_recurrentes_en_ebitda: 2.0 },
    cambios_perimetro: [],
    comentario: 'Diez años sin compras de empresas: todo el crecimiento es orgánico [A1]. Las ventas pasaron de 586 M USD en 2020 a 1.081 M en 2025 (+13 % anual), con dos fases: 2021-2023, de +13-21 % al año por la subida de los servicios de implantación (+18 % y +24 %) y de la nube (+44 % dos años seguidos) [A7]; y 2024-2025, de +12 % y +4 %, cuando los servicios cayeron un 4 % en 2025 porque los clientes aplazaron proyectos y el mantenimiento bajó un 6 % al migrar la base instalada a la nube [A1]. La nube (408 M, +21 %) ya es el 38 % de las ventas y el 96 % de los ingresos de software [A1]. En 2026 vuelve a acelerar: +7,4 % en el 1T y +9,3 % en el 2T, nube +24 % y +26 % [A3, A2]. El margen operativo GAAP subió de 19,5 % en 2020 a 25,9 % en 2025 por la mezcla de nube y el apalancamiento; el ajustado (sin pagos en acciones) es del 35,8 % [A4]. Los pagos en acciones pasaron de 59 M (7,7 % de las ventas) en 2022 a 111 M (10,3 %) en 2025 [A10].',
    ajustes: 'La empresa publica un resultado y un BPA «ajustados» que excluyen todos los pagos en acciones (111 M USD en 2025, 1,57 USD por acción), la reclamación extraordinaria de un seguro médico (gasto de 7,0 M en 2024, recuperaciones netas de 6,9 M en 2025), la reestructuración (2,9 M en el 1T25 por unos 100 puestos y 8,3 M en el 2T26 por el ≈ 6 % de la plantilla) y el efecto fiscal de la entrega de acciones [A2, A4, A9]. BPA 2025: 3,60 USD GAAP frente a 5,06 ajustado. En este informe la cuenta, el EBITDA y el DCF son GAAP (con los pagos en acciones como coste); solo la reclamación y la reestructuración van como no recurrentes. El objetivo a 12 meses usa el BPA ajustado, la base del consenso y de la guía, en la misma base que la historia del PER.',
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '3T24', ingresos: 266.7, crecimiento_pct: 11.8, crecimiento_organico_pct: 11.8, ebitda: 76.8, margen_ebitda_pct: 28.8, bpa: 1.03, vs_consenso: null },
      { periodo: '4T24', ingresos: 255.8, crecimiento_pct: 7.4, crecimiento_organico_pct: 7.4, ebitda: 62.3, margen_ebitda_pct: 24.4, bpa: 0.77, vs_consenso: null },
      { periodo: '1T25', ingresos: 262.8, crecimiento_pct: 3.2, crecimiento_organico_pct: 3.2, ebitda: 64.7, margen_ebitda_pct: 24.6, bpa: 0.85, vs_consenso: null },
      { periodo: '2T25', ingresos: 272.4, crecimiento_pct: 2.7, crecimiento_organico_pct: 2.7, ebitda: 75.4, margen_ebitda_pct: 27.7, bpa: 0.93, vs_consenso: null },
      { periodo: '3T25', ingresos: 275.8, crecimiento_pct: 3.4, crecimiento_organico_pct: 3.4, ebitda: 77.5, margen_ebitda_pct: 28.1, bpa: 0.96, vs_consenso: null },
      { periodo: '4T25', ingresos: 270.4, crecimiento_pct: 5.7, crecimiento_organico_pct: 5.7, ebitda: 68.5, margen_ebitda_pct: 25.3, bpa: 0.86, vs_consenso: null },
      { periodo: '1T26', ingresos: 282.2, crecimiento_pct: 7.4, crecimiento_organico_pct: 7.4, ebitda: 66.8, margen_ebitda_pct: 23.7, bpa: 0.82, vs_consenso: 'Superior' },
      { periodo: '2T26', ingresos: 297.8, crecimiento_pct: 9.3, crecimiento_organico_pct: 9.3, ebitda: 67.9, margen_ebitda_pct: 22.8, bpa: 0.85, vs_consenso: 'Superior' },
    ],
    ultima_presentacion: 'Abril de 2026 (1T26): el consejero delegado, Eric Clark, habló de una demanda «amplia», de un 55 % de los nuevos contratos de nube con clientes nuevos y de una tasa de éxito en concursos por encima del 70 %; subió la guía de 2026 (ventas 1.147-1.157 M USD, BPA ajustado 5,29-5,37) y dijo que el efecto de los agentes de IA en las cuentas sería prudente en 2026 y «significativo» en 2027, con clientes que pagan el módulo tras justificarlo con menos horas extra [A11, A3]. Julio (2T26): tercer trimestre seguido de contratación récord, nube +26 %, RPO de 2.470 M (+23 %) y guía subida otra vez (ventas 1.160-1.166 M, BPA ajustado 5,44-5,50); los agentes Active llegan a más del 10 % de la base instalada en piloto o suscripción, y la empresa presenta las «Active Editions», paquetes que incluyen la IA, y fija un RPO de 2.620-2.680 M para final de año [A2, A12, A13]. Cambio de discurso: de «macro difícil» y servicios a la baja en 2025 a crecimiento que se acelera y ganancia de cuota en 2026. Los analistas preguntaron sobre todo por los servicios (planos, +3 %), la conversión de pilotos de IA en ingresos y si la IA abarata la implantación; la dirección no cuantificó los ingresos de IA ni el número de clientes que pagan por ella [A13, A11].',
    confianza: 'Media',
  },
  balance: {
    historico: balance,
    vencimientos: [],
    liquidez: 'Caja 186,1 M USD a 30-jun-2026 (328,7 M a 31-dic-2025), sin deuda financiera y sin líneas de crédito [A8, A2].',
    rating: 'Sin rating (no tiene deuda emitida)',
    coste_deuda_pct: null,
    vida_media_anios: null,
    otros_pasivos: 'Sin deuda, sin pensiones de prestación definida y sin compras pendientes de pago. Pasivos por arrendamiento operativo de oficinas: 61,1 M USD a cierre de 2025 (53,9 M a largo plazo en junio de 2026); en US GAAP su gasto ya está en el EBITDA, así que no se suman a la deuda [A1, A2]. El pasivo que importa son los cobros anticipados (ingresos diferidos) de 343,2 M a 30-jun-2026: la nube y el mantenimiento se facturan por adelantado y financian el circulante [A2]. Compromiso de recompra: quedaban 225 M de la autorización de 500 M aprobada en marzo de 2026 [A2]. Litigios: ninguno relevante declarado en el 10-K [A1].',
    comentario: 'El balance es de caja neta y circulante negativo: clientes 215 M, proveedores 22 M y cobros anticipados 337 M a cierre de 2025, un circulante comercial de −144 M (−13 % de las ventas), que se hace más negativo al crecer la nube [A1]. El patrimonio cayó de 315 M en diciembre de 2025 a 158 M en junio de 2026 por las recompras (306 M pagados en el semestre, más que la caja generada) y la caja bajó a 186 M [A2]. Con los cobros por adelantado y sin necesidad de inversión (capex del 1-1,5 % de las ventas), toda la caja libre vuelve al accionista vía recompras.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es alta y creciente: flujo operativo de 389,5 M USD en 2025 frente a un beneficio neto de 219,9 M (1,8 veces), porque los pagos en acciones (111 M) no son caja y los cobros anticipados de la nube suben (+59 M en 2025) [A1, A10]. El capex es mínimo (15,5 M, 1,4 % de las ventas; 2025 lleva la reforma de oficinas) [A1]. Caja libre de 374 M en 2025 y 399 M en los últimos doce meses a junio de 2026 [A2]. Toda va a recompras: 1.142 M en 2021-2025 frente a 1.296 M de flujo operativo; sin dividendos ni compras de empresas [A10]. Matiz: la caja libre que se ve incluye el ahorro de pagar en acciones; descontando los 111 M de pagos en acciones, la caja «económica» de 2025 es de ≈ 263 M (24 % de las ventas).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 24, opinion: 'Favorable (sin salvedades), también sobre el control interno',
    comentario: 'EY audita la empresa desde 2002 (24 años), sin salvedades [A1]. No hay capitalización de I+D: los 145 M de I+D de 2025 van a gasto [A1]. Los ingresos de nube se reconocen a lo largo del contrato (≥ 5 años) y los servicios a medida que se prestan; el RPO (2.200 M a cierre de 2025, más del 98 % de nube, 38 % a reconocer en 24 meses) da visibilidad [A1]. La partida que más distorsiona es la remuneración en acciones: 111 M en 2025, un 10,3 % de las ventas y el 51 % del beneficio neto GAAP; la empresa la excluye de su resultado ajustado y además recompra acciones para compensar la dilución [A2, A10]. El tipo impositivo efectivo subió del 18 % en 2024 al 23 % en 2025 y al 27 % en el 1S26 por el menor beneficio fiscal de las acciones entregadas [A2]. Lectura de los indicadores del motor: Altman alto porque no hay deuda; Piotroski y Beneish sin señales; el ROE y el ROIC salen enormes o sin sentido por el patrimonio pequeño y el capital invertido negativo, no por ninguna rareza contable.',
    senales: [
      { senal: 'Remuneración en acciones del 10,3 % de las ventas, creciendo más deprisa que las ventas', nivel: 'Media', comentario: '59 M (7,7 %) en 2022 → 111 M (10,3 %) en 2025; el BPA ajustado la ignora y el GAAP es un 29 % menor [A10, A4].' },
      { senal: 'Recompras por encima de la caja generada en 2026', nivel: 'Baja', comentario: '306 M pagados en el 1S26 frente a 175 M de flujo operativo: la caja bajó de 329 M a 186 M [A2].' },
      { senal: 'Cambio de director financiero tras 20 años', nivel: 'Baja', comentario: 'Dennis Story se jubila; le sucede Linda Pinne, interventora general y responsable contable desde 2016 (sucesión interna anunciada) [A1].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Sin dividendo. Prioridades declaradas: invertir en I+D (145 M USD en 2025, 13 % de las ventas) y en ventas, y devolver el resto con recompras [A1]. En marzo de 2026 el consejo subió la autorización de recompra de 100 M a 500 M; en el 1S26 se recompraron 1,92 millones de acciones por 275 M y quedaban 225 M [A2]. En diez años la empresa ha invertido más de 1.500 M en recompras y ha reducido las acciones en circulación un 15 % [A1].',
    adquisiciones: [],
    comentario: 'Asignación de capital disciplinada y simple: ninguna compra de empresas en diez años (la última relevante, GlobalBay en 2014), todo el crecimiento es orgánico y la caja va a recompras. El fondo de comercio de 62 M no se mueve desde hace una década [A1]. Las recompras han bajado las acciones diluidas de 72,1 M en 2016 a 61,1 M en 2025 (−1,6 % al año), pero buena parte solo compensa la emisión por la remuneración en acciones; y el ritmo de 2026 (275 M en seis meses a precios de 120-160 USD) ha sido oportuno, porque se hizo cerca de los mínimos [A2, A10]. Riesgo: recomprar a 40 veces beneficios ajustados rinde poco al accionista que se queda.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'América (Norte y Latinoamérica)', descripcion: 'Incluye todo el I+D y los pagos en acciones del grupo, por eso su margen es menor', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 526.2, resultado: 91.2 }, { periodo: '2022', ingresos: 603.9, resultado: 99.3 }, { periodo: '2023', ingresos: 719.2, resultado: 135.2 }, { periodo: '2024', ingresos: 802.5, resultado: 167.3 }, { periodo: '2025', ingresos: 810.4, resultado: 167.6 }] },
      { nombre: 'EMEA', descripcion: 'Europa, Oriente Medio y África', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 110.6, resultado: 34.7 }, { periodo: '2022', ingresos: 128.9, resultado: 40.0 }, { periodo: '2023', ingresos: 166.6, resultado: 56.7 }, { periodo: '2024', ingresos: 190.5, resultado: 72.5 }, { periodo: '2025', ingresos: 215.8, resultado: 88.1 }] },
      { nombre: 'Asia-Pacífico', descripcion: 'Japón, Australia, China, Sudeste asiático e India', tipo_resultado: 'EBIT', historico: [{ periodo: '2021', ingresos: 26.9, resultado: 8.4 }, { periodo: '2022', ingresos: 34.3, resultado: 13.4 }, { periodo: '2023', ingresos: 42.9, resultado: 18.0 }, { periodo: '2024', ingresos: 49.3, resultado: 21.8 }, { periodo: '2025', ingresos: 55.2, resultado: 24.2 }] },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 65 }, { nombre: 'EMEA', peso_pct: 20 }, { nombre: 'Asia-Pacífico, Canadá y Latinoamérica', peso_pct: 15 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ingresos de nube (M USD)', valor_anterior: '337,2 (2024)', valor_actual: '408,1 (2025); 126,7 en el 2T26', variacion: '+21 %; +26 % en el 2T26', comentario: 'Indicador principal según la empresa [A1, A2].' },
      { kpi: 'RPO, obligaciones pendientes (M USD)', valor_anterior: '≈ 1.760 (dic-2024)', valor_actual: '2.200 (dic-2025); 2.470 (jun-2026)', variacion: '+25 %; +23 % interanual en junio', comentario: 'Más del 98 % de nube; guía de 2.620-2.680 M a fin de 2026 [A1, A2, A12].' },
      { kpi: 'Mantenimiento (M USD)', valor_anterior: '138,3 (2024)', valor_actual: '130,0 (2025)', variacion: '−6 %', comentario: 'Base instalada que migra a la nube [A1].' },
      { kpi: 'Servicios (M USD)', valor_anterior: '525,5 (2024)', valor_actual: '503,0 (2025)', variacion: '−4 %; +3 % en el 2T26', comentario: '≈ 75 % ligados a implantaciones de nube [A1, A2].' },
      { kpi: 'Margen operativo ajustado', valor_anterior: '34,7 % (2024)', valor_actual: '35,8 % (2025); guía 35,0-35,2 % en 2026', variacion: '+1,1 puntos', comentario: 'Sin pagos en acciones ni no recurrentes [A4, A2].' },
      { kpi: 'Plantilla', valor_anterior: '≈ 4.580 (2024)', valor_actual: '≈ 4.370 (dic-2025); −6 % en junio de 2026', variacion: '−5 % y −6 %', comentario: 'Recortes de 2025 y 2026 por eficiencia [A1, A9].' },
    ],
    clientes: 'Proveedores, fabricantes, distribuidores, minoristas y operadores logísticos de muchos sectores; los cinco primeros clientes suman el 10 % de las ventas en 2025 (12 % en 2024) y ninguno pasa del 10 % [A1]. Los contratos de nube duran normalmente cinco años o más y no se pueden cancelar; el 56 % del valor de los nuevos contratos de nube de 2025 vino de clientes nuevos [A1]. Poder de precios: el paso de licencia y mantenimiento a nube multiplica el ingreso por cliente (los contratos «suben de alcance y precio» a lo largo del plazo) y el margen ajustado ha subido con la mezcla [A1]. La venta es larga (9-12 meses, a veces años) y depende de los presupuestos de los clientes, sobre todo de los minoristas [A1].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'trimestres', campo: 'vs_consenso de 3T24 a 4T25', tipo: 'Complemento', intentos: '1) notas de resultados (no dan el consenso); 2) titulares de Seeking Alpha del RSS (solo 1T26 y 2T26); 3) StockStory y MarketBeat (solo movimientos del día)', decision: 'Omitido' },
    { seccion: 'balance', campo: 'RPO de diciembre de 2024 exacto', tipo: 'Complemento', intentos: '1) 10-K 2025 (solo el crecimiento del 25 %); 2) nota del 4T24; 3) derivado: 2.200 ÷ 1,25 ≈ 1.760', decision: 'Calculado y marcado como estimación' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025: negocio, soluciones, competidores declarados, IA (Active Agents, Agent Foundry), Gartner', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-04', url: `${ED}/000119312526037138/manh-20251231.htm` },
  { id: 2, titulo: 'Supply Chain Management Market worth $58.42 billion by 2030 (38.510 M USD en 2025, +8,7 % anual)', editor: 'MarketsandMarkets', tipo: 'Sectorial', fecha: '2025-11', url: 'https://www.marketsandmarkets.com/PressReleases/supply-chain-management.asp' },
  { id: 3, titulo: 'Supply Chain Management Market to Reach USD 93.9 Billion by 2034 at 10.9 % CAGR (36.900 M USD en 2025)', editor: 'Allied Market Research (nota de prensa)', tipo: 'Sectorial', fecha: '2026-05', url: 'https://www.bolsamania.com/nota-de-prensa_amp/mercados/supply-chain-management-market-to-reach-usd-939-billion-globally-by-2034-at-109-cagr-allied-market-research--22482031.html' },
  { id: 4, titulo: 'Software de aplicaciones: ficha sectorial corta (mapa del riesgo de IA, márgenes, comparables)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 5, titulo: 'Our story and timeline (1990-2024)', editor: 'Manhattan Associates', tipo: 'Primaria', fecha: '2024', url: 'https://www.manh.com/en-au/about-us/our-story-and-timeline' },
  { id: 6, titulo: 'Yahoo Finance: ventas, márgenes operativos y EBITDA de los competidores cotizados (Descartes, Kinaxis, SPS Commerce, SAP, Oracle)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/DSGX/' },
  { id: 7, titulo: 'E2open Announces Acquisition by WiseTech Global (3,30 USD por acción; valor empresa 2.100 M USD)', editor: 'E2open (Business Wire)', tipo: 'Primaria', fecha: '2025-05-25', url: 'https://www.businesswire.com/news/home/20250525560328/en/E2open-Announces-Acquisition-by-WiseTech-Global-Concluding-Strategic-Review' },
  { id: 8, titulo: 'Autodesk, Paylocity, Rapid7, DigitalOcean, and Manhattan Associates Shares Plummet (Anthropic Managed Agents; MANH −7,3 %)', editor: 'StockStory (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-04-09', url: 'https://finance.yahoo.com/markets/stocks/articles/autodesk-paylocity-rapid7-digitalocean-manhattan-023747720.html' },
  { id: 9, titulo: 'Panasonic acquires supply chain software provider Blue Yonder (5.600 M por el 80 %; 8.500 M de valor del 100 %)', editor: 'ZDNet / SiliconAngle', tipo: 'Prensa', fecha: '2021-04-23', url: 'https://www.zdnet.com.au/article/panasonic-acquires-supply-chain-software-iot-provider-blue-yonder-in-7-1-billion-deal/' },
  { id: 10, titulo: 'Form 10-Q del 2T26 (riesgos actualizados, IA generativa y agéntica)', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000119312526327591/manh-20260630.htm` },
];
const ym = { DSGX: [775.2, 33.2], 'KXS.TO': [603.2, 15.4], SPSC: [772.5, 16.1] };
const B2 = {
  _estado: 'completa (analista)',
  sector: {
    definicion: 'Software de gestión de la cadena de suministro (SCM): ejecución (almacenes, WMS; transporte, TMS; mano de obra), comercio omnicanal (gestión de pedidos, tienda y punto de venta) y planificación (demanda, reposición, asignación), vendido como suscripción en la nube, licencia o servicios [B1]. Uso el perímetro de MarketsandMarkets (38.510 M USD en 2025), que lista a Manhattan entre los actores principales junto a SAP, Oracle, Infor, Blue Yonder, Körber, Descartes, Kinaxis y E2open [B2]; Allied Market Research da 36.900 M en 2025 [B3]. Es mundial, aunque Gartner estima, según la empresa, que más del 80 % del gasto está en Norteamérica y Europa [B1]. El nicho donde Manhattan es líder (WMS y gestión de pedidos) es una parte de este total.',
    tamano: '≈ 38.510 M USD en 2025 (MarketsandMarkets) [B2]; ≈ 36.900 M (Allied) [B3]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 38510 }, { anio: '2026e', tamano: 41860 }, { anio: '2027e', tamano: 45500 }, { anio: '2028e', tamano: 49460 }, { anio: '2029e', tamano: 53760 }, { anio: '2030e', tamano: 58420 }],
    tcac_historico_pct: null, tcac_previsto_pct: 8.7, cr5_pct: null, estructura: 'Moderadamente concentrada',
    drivers: [
      { driver: 'Comercio electrónico y omnicanal', efecto: '+', horizonte: 'Estructural', evidencia: 'Más pedidos pequeños y devoluciones exigen WMS y gestión de pedidos; el 56 % de la contratación de nube de Manhattan en 2025 fue con clientes nuevos [B1].' },
      { driver: 'Paso de la base instalada a la nube', efecto: '+', horizonte: 'Estructural', evidencia: 'Mantenimiento −6 % y nube +21 % en Manhattan en 2025; la nube ya es el 96 % de su software [B1].' },
      { driver: 'Automatización y robótica de almacenes', efecto: '+', horizonte: 'Estructural', evidencia: 'Manhattan Automation Network desde 2019 para integrar robots [B5].' },
      { driver: 'Aranceles y relocalización de cadenas', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Más complejidad (más centros, más rutas) pero presupuestos de proyecto aplazados: servicios −4 % en 2025 [B1].' },
      { driver: 'IA agéntica', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Agentes que automatizan tareas de planificación y operación; puede ser módulo de pago o abaratar alternativas [B1, B4].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Competencia de SAP, Oracle, Infor, Blue Yonder (Panasonic), Körber/Infios, E2open (WiseTech) y especialistas; Manhattan dice ganar más del 70 % de los concursos en 2026 [B1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Grandes minoristas y operadores logísticos, pero ninguno pasa del 10 % de las ventas; contratos de ≥ 5 años no cancelables [B1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'La nube se aloja en Google Cloud (socio declarado); el talento es el insumo crítico [B1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Hace falta experiencia de décadas en almacenes, integración con ERP y automatismos, y referencias; la propia empresa lo cita como barrera [B1].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Desarrollos propios de TI y, a futuro, agentes de IA generales que orquesten procesos; el mercado castigó al sector en febrero y abril de 2026 por ese miedo [B4, B8].' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'El gasto en software de cadena de suministro depende de la inversión de minoristas e industriales: en 2009 las licencias de Manhattan cayeron y el mantenimiento aguantó; en 2020-2021 el confinamiento disparó el comercio electrónico y la demanda; en 2025 la incertidumbre por aranceles retrasó proyectos y los servicios cayeron un 4 % [B1]. En 2026 la contratación vuelve a récords (tres trimestres seguidos) y las ventas aceleran al +9 %: fase de expansión, con el riesgo de que la macro vuelva a frenar los proyectos.' },
    regulacion: 'Poco regulado. Afectan la protección de datos (RGPD en Europa, leyes estatales en EE. UU.), los controles de exportación y sanciones, y la Ley de IA de la UE para los sistemas de alto riesgo [B1, B4]. Indirectamente, los aranceles y las normas de trazabilidad (alimentación, farmacia) aumentan la complejidad logística y la demanda de sistemas de control. Ningún cambio en tramitación con efecto directo sobre las cifras.',
    tendencias: 'Tres tendencias: (1) la nube, que sustituye las instalaciones propias y sube el ingreso por cliente; (2) la unificación de almacén, transporte y pedidos en una plataforma, que es la apuesta de Manhattan (Manhattan Active) frente a proveedores con productos sueltos [B1, B5]; (3) la IA agéntica, que Manhattan vende como módulo (Active Agents y Agent Foundry, 2026) y que el mercado teme que abarate el software por puesto [B1, B8]. Manhattan gana con las dos primeras; la tercera es mixta: el WMS es un sistema de registro y control en tiempo real, de riesgo de sustitución bajo-medio según la ficha sectorial [B4].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 2.8,
    posicion: 'Líder en WMS y en gestión de pedidos omnicanal (líder del cuadrante de Gartner en WMS desde 2005 y único líder de Forrester en gestión de pedidos en 2021 y 2023) [B5]; ≈ 2,8 % del mercado total de SCM de MarketsandMarkets (1.081 ÷ 38.510) [B2].',
    competidores: [
      { nombre: 'SAP (SCM, EWM)', pais: 'Alemania', ticker: 'SAP', ingresos: null, cuota_pct: null, margen_ebit_pct: 27.6, comentario: 'ERP dominante; vende su WMS (EWM) a su base instalada. Margen del grupo [B1, B6].' },
      { nombre: 'Oracle (SCM Cloud, WMS Cloud)', pais: 'EE. UU.', ticker: 'ORCL', ingresos: null, cuota_pct: null, margen_ebit_pct: 35.6, comentario: 'ERP y nube; integra almacén y transporte en su suite. Margen del grupo [B1, B6].' },
      { nombre: 'Blue Yonder (Panasonic)', pais: 'EE. UU./Japón', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Antigua JDA; planificación y ejecución; comprada por Panasonic en 2021 valorada en 8.500 M [B9].' },
      { nombre: 'Körber / Infios', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'WMS (antigua HighJump); no cotiza [B1].' },
      { nombre: 'Descartes Systems', pais: 'Canadá', ticker: 'DSGX', ingresos: ym.DSGX[0], cuota_pct: 2.0, margen_ebit_pct: ym.DSGX[1], comentario: 'Red logística, aduanas y rutas; comprador en serie [B6].' },
      { nombre: 'Kinaxis', pais: 'Canadá', ticker: 'KXS', ingresos: ym['KXS.TO'][0], cuota_pct: 1.6, margen_ebit_pct: ym['KXS.TO'][1], comentario: 'Planificación de la cadena de suministro (RapidResponse) [B6].' },
      { nombre: 'E2open (WiseTech)', pais: 'EE. UU./Australia', ticker: null, ingresos: 607.7, cuota_pct: 1.6, margen_ebit_pct: null, comentario: 'Red de colaboración y comercio global; ventas en caída, comprada por WiseTech en 2025 por 2.100 M de valor empresa [B7].' },
      { nombre: 'SPS Commerce', pais: 'EE. UU.', ticker: 'SPSC', ingresos: ym.SPSC[0], cuota_pct: 2.0, margen_ebit_pct: ym.SPSC[1], comentario: 'Red de intercambio electrónico con minoristas; complementario más que rival [B6].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Poco: la comunidad de clientes y socios (Accenture, Deloitte, Zebra, Honeywell) ayuda a vender, pero el valor de un cliente no depende de los demás [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'El WMS controla cada movimiento del almacén e integra robots y ERP; cambiar exige proyectos de 9-24 meses y riesgo operativo; contratos de nube de ≥ 5 años; Jockey es cliente desde 1991 [B1, B5].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 4, evidencia: 'Líder de Gartner en WMS desde 2005 y referencias en los mayores minoristas; plataforma nativa de nube única en el sector [B5, B1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Centro de I+D en Bangalore y una sola plataforma para todos los productos; margen operativo ajustado del 35 % frente al 15-33 % de los cotizados del sector [B6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Nicho de tamaño medio donde 4-6 proveedores especializados se reparten las grandes cuentas [B2].' },
      ],
    },
    amenazas: 'Tres amenazas: (1) la IA agéntica, que podría permitir a los clientes o a un integrador orquestar almacén y transporte con agentes sobre un ERP, o reducir los puestos de usuario; probabilidad baja-media a cinco años, porque el WMS es un sistema de control en tiempo real con integración física [B4, B8]; (2) los ERP (SAP, Oracle) que empaquetan su WMS a precio bajo en su base instalada; media; (3) un ciclo de proyectos más lento por aranceles o recesión, que ya restó un 4 % a los servicios en 2025; media [B1].',
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Manhattan Associates (Atlanta) diseña y vende software para gestionar almacenes, transporte, inventario y pedidos de empresas que mueven mercancía: minoristas, fabricantes de bienes de consumo, distribuidores de alimentación, operadores logísticos, industria, tecnología y farmacia [B1]. Su plataforma Manhattan Active, nativa de nube, une la ejecución (WMS, TMS, mano de obra), el comercio omnicanal (gestión de pedidos, tienda y punto de venta) y la planificación (demanda, reposición, asignación) [B1]. Desde 2026 vende agentes de IA (Active Agents) y una herramienta para que el cliente cree los suyos (Agent Foundry) [B1]. Vende sobre todo de forma directa y con socios integradores (Accenture, Deloitte, Cognizant) y de hardware (Zebra, Honeywell); el 65 % de las ventas es de EE. UU. [B1].',
    como_gana_dinero: 'Cinco ingresos en 2025: nube 38 % (suscripción de ≥ 5 años, recurrente), servicios de implantación 47 % (por horas, cíclicos), mantenimiento 12 % (licencias antiguas, en retirada), licencias 1 % y hardware 2 % [B1]. Lo recurrente (nube + mantenimiento) es el 50 % de las ventas sin hardware. El beneficio sale de la nube: margen bruto alto y creciente con la escala, mientras los servicios dejan un margen bajo y dependen de que los clientes arranquen proyectos. Cada cliente que pasa a la nube paga más que en mantenimiento y suma productos con el tiempo. No hay estacionalidad fuerte; el apalancamiento operativo viene de la nube y de la plantilla de I+D en India.',
  },
  huecos: [
    { seccion: 'sector', campo: 'cr5_pct y tcac_historico_pct', tipo: 'Complemento', intentos: '1) MarketsandMarkets (solo previsión y lista de actores); 2) Allied (previsión 2026-2034); 3) ficha sectorial de software (sin cifra de la cadena de suministro)', decision: 'Omitido' },
    { seccion: 'competencia', campo: 'ingresos de SAP, Oracle, Blue Yonder y Körber en cadena de suministro', tipo: 'Complemento', intentos: '1) informes anuales de SAP y Oracle (no desglosan SCM); 2) Panasonic Connect (Blue Yonder sin cuenta propia publicada); 3) Körber es privada', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B2);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración 2025, accionistas, ratio de remuneración', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: `${ED}/000119312526140024/manh-20260402.htm` },
  { id: 2, titulo: 'Form 8-K 5.07: votaciones de la junta de 2026', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-18', url: `${ED}/000119312526228194/manh-20260514.htm` },
  { id: 3, titulo: 'Form 8-K 5.07: votaciones de la junta de 2025', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-05-14', url: `${ED}/000095017025071356/manh-20250513.htm` },
  { id: 4, titulo: 'Form 8-K 5.02: sucesión del director financiero (Dennis Story → Linda Pinne)', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-26', url: `${ED}/000119312526073584/manh-20260225.htm` },
  { id: 5, titulo: 'Form 8-K 5.02 (en el 8-K del 3T25): el presidente Eddie Capel pasa a no ejecutivo desde el 1-ene-2026', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-21', url: `${ED}/000119312525245073/manh-20251021.htm` },
  { id: 6, titulo: 'Form 4 de consejeros y directivos (19-oct-2025 a 19-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001056696&type=4' },
  { id: 7, titulo: 'Notas de resultados con la guía anual 2021-2026 (4T de cada año y revisiones trimestrales)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000119312526320952/manh-ex99_1.htm` },
  { id: 8, titulo: 'Form 8-K 5.02: ampliación del plan de acciones 2020 en 3 millones de acciones', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-20', url: `${ED}/000119312526232142/manh-20260514.htm` },
  { id: 9, titulo: 'Form 8-K/A 5.02: remuneración de la nueva directora financiera', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-02', url: `${ED}/000119312526140163/manh-20260327.htm` },
];
const C = {
  _estado: 'completa (analista)',
  directivos: {
    equipo: [
      { nombre: 'Eric A. Clark', cargo: 'Presidente (President) y consejero delegado', desde: '2025', participacion_pct: 0.03, trayectoria: 'Consejero delegado de NTT Data North America (2024-2025) y de NTT Ltd. Americas (2022-2024); antes, director digital y de estrategia de NTT Data Services. Llegó en febrero de 2025 de fuera: desde entonces el crecimiento ha pasado del +3 % al +9 % y la contratación ha marcado tres récords trimestrales [C1, C7].' },
      { nombre: 'Linda C. Pinne', cargo: 'Directora financiera (desde abril de 2026)', desde: '2026', participacion_pct: null, trayectoria: 'En la empresa desde 2005; interventora general y responsable contable desde 2016. Sucede a Dennis Story, director financiero desde 2006 [C4, C1].' },
      { nombre: 'Eddie Capel', cargo: 'Presidente del consejo (no ejecutivo desde 2026)', desde: '2012', participacion_pct: 0.12, trayectoria: 'Consejero delegado de 2013 a febrero de 2025; con él las ventas se duplicaron y la empresa pasó a la nube. Presidente ejecutivo en 2025 y no ejecutivo desde el 1-ene-2026 [C1, C5].' },
      { nombre: 'Robert G. Howell', cargo: 'Vicepresidente ejecutivo y director comercial', desde: '2025', participacion_pct: 0.22, trayectoria: 'En la empresa desde 2006; dirigió América desde 2022 y ventas de Norteamérica desde 2013 [C1].' },
      { nombre: 'J. Stewart Gantt', cargo: 'Vicepresidente ejecutivo, servicios profesionales', desde: '2022', participacion_pct: 0.04, trayectoria: 'En la empresa desde 1995 (I+D, producto, soporte); lleva los servicios de implantación, el 47 % de las ventas [C1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Enero de 2025: ventas 1.060-1.070 M USD; BPA ajustado 4,45-4,55', real: 'Ventas 1.081,4 M; BPA ajustado 5,06', cumplida: 'Sí' },
      { anio: '2026', guia: 'Enero de 2026: ventas 1.133-1.153 M; BPA ajustado 5,04-5,20 (subida a 5,29-5,37 en abril y a 5,44-5,50 en julio)', real: 'En curso: 580,0 M y BPA ajustado 2,62 en el 1S26', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo en transición pero estable en lo operativo: consejero delegado nuevo desde febrero de 2025 (Eric Clark, de fuera), presidente que deja de ser ejecutivo en 2026 y directora financiera interna desde abril de 2026, tras 20 años de Dennis Story [C1, C4, C5]. La dirección suele dar una guía prudente y superarla: en 2025 dio 4,45-4,55 de BPA ajustado y logró 5,06; en 2026 ha subido la guía dos veces [C7]. El riesgo es que el nuevo equipo comercial gaste más en ventas (gastos comerciales +54 % en el 2T26) sin que la contratación récord llegue a ingresos.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Eddie Capel', cargo: 'Presidente', tipo: 'Otro externo', desde: '2012', comisiones: '—' },
      { nombre: 'Eric A. Clark', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2025', comisiones: '—' },
      { nombre: 'Thomas E. Noonan', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '1999', comisiones: 'Auditoría, Retribuciones, Nombramientos (presidente)' },
      { nombre: 'Edmond I. Eger III', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría, Retribuciones' },
      { nombre: 'Linda T. Hollembaek', cargo: 'Consejera', tipo: 'Independiente', desde: '2018', comisiones: 'Nombramientos' },
      { nombre: 'Kimberly A. Kuryea', cargo: 'Consejera (directora financiera de General Dynamics)', tipo: 'Independiente', desde: '2022', comisiones: 'Auditoría (presidenta)' },
      { nombre: 'Charles E. Moran', cargo: 'Consejero', tipo: 'Independiente', desde: '2017', comisiones: 'Retribuciones (presidente)' },
      { nombre: 'Danielle Sheer', cargo: 'Consejera', tipo: 'Independiente', desde: '2025', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 89.4, voto_remuneracion_contra_pct: 10.5, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 16.70, fijo: 0.71, variable_corto: 0.84, variable_largo: 13.00, ratio_salario_medio: 121 },
    remuneracion: 'El consejero delegado cobró 16,7 M USD en 2025: 0,71 M de sueldo, 2,1 M de bonificación de entrada, 0,84 M de variable anual y 13,0 M en acciones (la mitad sujetas a objetivos), por su primer año [C1]. El variable anual y la mitad de las acciones dependen de tres medidas: ingresos, nuevas contrataciones de nube y resultado operativo ajustado; no hay ninguna de rentabilidad sobre el capital, caja libre ni rentabilidad para el accionista [C1]. En 2025 se superaron los objetivos y el variable pagó por encima del objetivo. Hay política de recuperación (clawback) [C1]. Ratio con el empleado medio: 121 a 1 (216 a 1 sin ajustar por poder de compra) [C1]. En la junta de 2026 se amplió el plan de acciones en 3 millones de títulos (≈ 5 % del capital), con un 5 % de votos en contra [C2, C8].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 11, tipo: 'Fondo indexado', variacion: '13G/A de febrero de 2024' },
      { nombre: 'BlackRock', pct: 10, tipo: 'Gestora', variacion: '13G/A de julio de 2025' },
      { nombre: 'AllianceBernstein', pct: 5, tipo: 'Gestora', variacion: '13G/A de febrero de 2026' },
      { nombre: 'FMR (Fidelity)', pct: 5, tipo: 'Gestora', variacion: '13G/A de febrero de 2026' },
      { nombre: 'Consejeros y directivos (13 personas)', pct: 0.84, tipo: 'Internos', variacion: '501.191 acciones a 2-mar-2026' },
    ],
    insiders: [
      { fecha: '2026-08-11', persona: 'Eric A. Clark (consejero delegado)', operacion: 'Venta', acciones: 3000, importe: 0.59 },
      { fecha: '2026-08-06', persona: 'Linda T. Hollembaek (consejera)', operacion: 'Venta', acciones: 1579, importe: 0.30 },
      { fecha: '2026-07-30', persona: 'J. Stewart Gantt (vicepresidente ejecutivo)', operacion: 'Venta', acciones: 5139, importe: 1.00 },
      { fecha: '2026-06-10', persona: 'Eric A. Clark (consejero delegado)', operacion: 'Venta', acciones: 1000, importe: 0.15 },
      { fecha: '2026-04-24', persona: 'J. Stewart Gantt (vicepresidente ejecutivo)', operacion: 'Venta', acciones: 7300, importe: 1.02 },
      { fecha: '2025-11-28', persona: 'Eric A. Clark (consejero delegado)', operacion: 'Venta', acciones: 1600, importe: 0.28 },
    ],
    control_y_defensas: 'Sin accionista de control: los mayores son gestoras indexadas (Vanguard 11 %, BlackRock 10 %) y los internos tienen menos del 1 % [C1]. Una acción, un voto. Defensa principal: **consejo escalonado** en tres clases (cada consejero se elige para tres años), que hace más lenta una toma de control hostil [C2]. Sin operaciones vinculadas relevantes. El presidente, Eddie Capel, fue consejero delegado hasta 2025, así que no es independiente; por eso hay consejero coordinador independiente (Thomas Noonan, en el consejo desde 1999) [C1]. Seis de los ocho consejeros son independientes y las tres comisiones lo son al 100 % [C1].',
    alertas: [
      'Consejo escalonado (clasificado en tres clases): defensa frente a ofertas.',
      'Votos en contra altos en consejeros: Linda Hollembaek 24,6 % en 2026 y Thomas Noonan 19,2 % en 2025 (antigüedad desde 1999 y comisiones) [C2, C3].',
      'Ventas de directivos sin compras en 12 meses (3,3 M USD, ninguna con plan 10b5-1), pequeñas frente a su remuneración en acciones [C6].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios de MANH, SPY e IGV (herramienta bolsa.mjs) hasta el 16-oct-2026', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://finance.yahoo.com/quote/MANH/history/' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary: consenso de BPA y ventas 2026-2027, recomendaciones, objetivos, datos de los comparables', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://finance.yahoo.com/quote/MANH/analysis/' },
  { id: 3, titulo: 'Stock Analysis: previsiones de MANH (BPA 2026 5,41-5,66; objetivo medio 230,2; 11 recomendaciones)', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-19', url: 'https://stockanalysis.com/stocks/manh/forecast/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates (bono a 10 años: 5,09 % el 16-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Datos de mercado', fecha: '2026-10-16', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Manhattan Associates Reports Second Quarter Results (guía 2026)', editor: 'Manhattan Associates, Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-28', url: `${ED}/000119312526320952/manh-ex99_1.htm` },
  { id: 7, titulo: 'Form 10-Q del 2T26: 58.304.972 acciones a 28-jul-2026', editor: 'Manhattan Associates, Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000119312526327591/manh-20260630.htm` },
  { id: 8, titulo: 'Manhattan Associates Announces Date for Reporting Third Quarter 2026 Financial Results (27-oct-2026, tras el cierre)', editor: 'Manhattan Associates (Business Wire, vía Finviz)', tipo: 'Primaria', fecha: '2026-10-07', url: 'https://finviz.com/news/399827/manhattan-associates-announces-date-for-reporting-third-quarter-2026-financial-results' },
  { id: 9, titulo: 'E2open Announces Acquisition by WiseTech Global (valor empresa 2.100 M USD) y 10-K FY2025 de E2open (ventas 607,7 M)', editor: 'E2open (Business Wire; SEC)', tipo: 'Primaria', fecha: '2025-05-25', url: 'https://www.businesswire.com/news/home/20250525560328/en/E2open-Announces-Acquisition-by-WiseTech-Global-Concluding-Strategic-Review' },
  { id: 10, titulo: 'Coupa Software – Thoma Bravo investor presentation (8.000 M USD de valor empresa; 8,4 veces las ventas adelantadas)', editor: 'Coupa Software', tipo: 'Primaria', fecha: '2022-12-12', url: 'https://s201.q4cdn.com/341840168/files/doc_presentation/2022/12/Coupa-Software-Thoma-Bravo-Investor-Presentation.pdf' },
  { id: 11, titulo: 'Panasonic to acquire Blue Yonder (valor del 100 % de 8.500 M USD; ventas de 2020 de más de 1.000 M)', editor: 'ZDNet / SiliconAngle', tipo: 'Prensa', fecha: '2021-04-23', url: 'https://www.zdnet.com.au/article/panasonic-acquires-supply-chain-software-iot-provider-blue-yonder-in-7-1-billion-deal/' },
  { id: 12, titulo: 'Why Manhattan Associates (MANH) Stock Is Up Today (+22,6 % el 29-jul-2026 tras el 2T26)', editor: 'StockStory (Barchart, vía Webull)', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.webull.com/news/15312242971796480' },
  { id: 13, titulo: 'Titulares de MANH en FinancialContent (StockStory): mejora de Morgan Stanley (12-oct), caídas del sector por tipos (28-sep), subidas (13 y 27-ago)', editor: 'FinancialContent', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.financialcontent.com/quote/NQ:MANH/news' },
  { id: 14, titulo: 'Software stocks plummet after Anthropic launched Managed Agents (MANH −7,3 % el 9-abr-2026)', editor: 'StockStory (Yahoo Finance)', tipo: 'Prensa', fecha: '2026-04-09', url: 'https://finance.yahoo.com/markets/stocks/articles/autodesk-paylocity-rapid7-digitalocean-manhattan-023747720.html' },
  { id: 15, titulo: 'Software de aplicaciones: ficha sectorial corta (caída del 3-feb-2026 por las herramientas de Anthropic)', editor: 'Repositorio de análisis (sectores/software-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/software-2026-10-14.md' },
  { id: 16, titulo: 'Why Manhattan Associates (MANH) shares are sliding today (−5,2 % el 28-ene-2026 por la guía de 2026)', editor: 'StockStory', tipo: 'Prensa', fecha: '2026-01-28', url: 'https://business.minstercommunitypost.com/minstercommunitypost/article/stockstory-2026-1-28-why-manhattan-associates-manh-shares-are-sliding-today' },
  { id: 17, titulo: 'Stocktwits: resumen de la mejora de Morgan Stanley a Sobreponderar (objetivo 180 → 250 USD)', editor: 'Stocktwits', tipo: 'Prensa', fecha: '2026-10-12', url: 'https://stocktwits.com/symbol/MANH' },
  { id: 18, titulo: 'Form 4 (ventas de directivos, 12 meses) — form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-19', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001056696&type=4' },
];
const M = Y.MANH;
const trend = Object.fromEntries(M.trend.map((t) => [t.periodo, t]));
const comps = [['DSGX', 'Descartes Systems', 'CA'], ['KXS.TO', 'Kinaxis', 'CA'], ['SPSC', 'SPS Commerce', 'US'], ['TYL', 'Tyler Technologies', 'US'], ['BSY', 'Bentley Systems', 'US'], ['PTC', 'PTC', 'US'], ['GWRE', 'Guidewire', 'US'], ['ROP', 'Roper Technologies', 'US'], ['VEEV', 'Veeva Systems', 'US']];
const FX_CAD = 0.7095; // USD por CAD, 19-oct-2026 (Yahoo CADUSD=X)
const empresas = comps.map(([t, n, p]) => {
  const y = Y[t]; const fx = y.divisa === 'CAD' ? FX_CAD : 1;
  const tr = Object.fromEntries(y.trend.map((x) => [x.periodo, x]));
  const cap = y.cap * fx / 1e6, ev = y.ev * fx / 1e6;
  // Kinaxis publica en USD: ventas y EBITDA de Yahoo en USD; capitalización y valor empresa en CAD → USD.
  const ventas = y.ventas / 1e6, ebitda = y.ebitda / 1e6;
  const crec = tr['+1y']?.crec_ventas ?? null;
  return {
    nombre: n, ticker: t.replace('.TO', ''), pais: p, capitalizacion: Math.round(cap), ev_ventas: r2(ev / ventas), ev_ebitda_ltm: r1(ev / ebitda), ev_ebitda_ntm: null,
    per_ntm: r1(y.per_adelantado), crecimiento_pct: crec == null ? null : r1(crec * 100), margen_ebitda_pct: r1(ebitda / ventas * 100), roic_pct: null,
    dn_ebitda: r1((ev - cap) / ebitda), fcf_yield_pct: y.fcf ? r1(y.fcf * (y.divisa === 'CAD' ? 1 : 1) / 1e6 / cap * 100) : null,
  };
});
const perMed = (() => { const s = empresas.map((e) => e.per_ntm).sort((a, b) => a - b); return s[Math.floor(s.length / 2)]; })();
const D = {
  _estado: 'completa (analista)',
  _per_mediana_comparables: perMed,
  identificacion: {
    nombre: 'Manhattan Associates, Inc.', nombre_corto: 'Manhattan', ticker: 'MANH', isin: 'US5627501092', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Software de aplicaciones', sede: 'Atlanta (Georgia)', fundacion: '1990', empleados: 4370, web: 'https://www.manh.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 58.55, capitalizacion_publicada: Math.round(M.cap / 1e6), free_float_pct: 99.2,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${String(B.volumen_3m.importe_dia_millones).replace('.', ',')} M USD/día (3 meses)`, proximos_resultados: '2026-10-27',
  },
  consenso: {
    guidance: 'Guía 2026 del 28-jul-2026 (segunda subida del año): ventas 1.160-1.166 M USD (+7-8 %), margen operativo GAAP 24,2-24,4 % y ajustado 35,0-35,2 %, BPA GAAP 3,59-3,65 y ajustado 5,44-5,50 (+8-9 %); RPO de 2.620-2.680 M a fin de año [D6]. En enero la guía era de 1.133-1.153 M y 5,04-5,20, por debajo de lo que esperaba el mercado (la acción cayó un 5,2 %) [D16]. No hay plan a medio plazo publicado.',
    estimaciones: [
      { periodo: '2026e', ingresos: r1(trend['0y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(trend['0y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${trend['0y'].n} analistas; BPA ajustado (sin pagos en acciones) [D2]` },
      { periodo: '2027e', ingresos: r1(trend['+1y'].ventas / 1e6), ebitda: null, ebit: null, bpa: r2(trend['+1y'].bpa), dpa: 0, fuente: `Yahoo Finance, ${trend['+1y'].n} analistas; BPA ajustado [D2]` },
    ],
    recomendaciones: { n_analistas: 11, comprar: 9, mantener: 2, vender: 0, po_medio: M.po_medio, po_min: M.po_min, po_max: M.po_max },
    revisiones: `El BPA ajustado de 2026 del consenso ha subido de ${String(r2(trend['0y'].bpa_hace90)).replace('.', ',')} USD hace 90 días a ${String(r2(trend['0y'].bpa)).replace('.', ',')} y el de 2027 de ${String(r2(trend['+1y'].bpa_hace90)).replace('.', ',')} a ${String(r2(trend['+1y'].bpa)).replace('.', ',')} (+3 %), tras la subida de guía del 2T26 [D2]. En 12 meses la guía de BPA ajustado de 2026 ha pasado de 5,04-5,20 (enero) a 5,44-5,50 [D6]. Morgan Stanley subió la recomendación a Sobreponderar el 12-oct-2026 con objetivo de 250 USD (desde 180) por la aceleración de la contratación de nube y la IA, aunque solo ve un 1-2 % más de ventas que el consenso [D13, D17]. Stock Analysis da un BPA 2026 de 5,41-5,66 y un objetivo medio de 230,2 USD con 11 recomendaciones (9 de compra, 2 de mantener) [D3].`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(M.corto_pct * 100),
    comentario: 'La acción bajó un 61 % desde el máximo de diciembre de 2024 (≈ 312 USD) hasta el mínimo del 10-abr-2026 (119 USD): en 2025 por la caída de los servicios y la guía floja (−35,9 % en el año frente a +17,7 % del S&P 500), y en febrero-abril de 2026 por el miedo a que los agentes de IA sustituyan el software de aplicaciones (−10,0 % el 3-feb y −7,3 % el 9-abr con los anuncios de Anthropic) [D1, D14, D15]. Desde abril sube un 86 %: guía subida en abril (+5,9 %), resultados del 2T26 con nube +26 % y contratación récord (+21,3 % el 29-jul), y mejora de Morgan Stanley el 12-oct (+6,3 %) [D1, D12, D13]. En 2026 gana un 28 % frente al 13 % del S&P 500 y el −1 % del software (IGV), pero a 3 y 5 años sigue muy por detrás del índice [D1].',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: X.financieros.cuenta.map((c) => ({ anio: c.periodo, precio_cierre: (B.cierres_ejercicio.find((x) => x.anio === c.periodo) || {}).precio_cierre ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Con el BPA GAAP, Manhattan ha cotizado entre 30 y 80 veces sus beneficios de los últimos 12 meses en 2019-2025 [D1]: el múltiplo subió con la nube y los tipos bajos (2021) y volvió a bajar con la caída de 2025. Hoy, a 222,17 USD, cotiza a 64 veces el BPA GAAP de los últimos 12 meses (3,49) y a 37 veces el BPA ajustado de los próximos 12 meses, por debajo de la mediana de 46 veces de 2021-2025 en la misma base (precio de cierre ÷ BPA ajustado del año siguiente). Lo estructural que ha cambiado: el bono a 10 años en el 5,1 % frente al 1,5 % de 2021, y el miedo a la IA en el software de aplicaciones [D4, D15].',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Software vertical y de cadena de suministro con márgenes altos y cobro recurrente: Descartes, Kinaxis y SPS Commerce (cadena de suministro y logística, los más cercanos) y software vertical de calidad (Tyler, Bentley, PTC, Guidewire, Roper, Veeva). Fuera SAP y Oracle: son ERP y nube de propósito general (Oracle crece un 46 % por los centros de datos de IA) y el dato de Yahoo de SAP mezcla divisas; Blue Yonder, Körber e Infor no cotizan. Todos con datos de Yahoo del 19-oct-2026 (PER adelantado del ejercicio siguiente, en general ajustado; EV/EBITDA de los últimos 12 meses con EBITDA de Yahoo).',
    empresas,
    comentario: `Manhattan cotiza a ${String(r1(M.per_adelantado)).replace('.', ',')} veces el BPA ajustado de 2027 del consenso y a 44 veces el EBITDA de los últimos 12 meses, frente a una mediana de ${String(perMed).replace('.', ',')} veces de PER en los comparables: una prima del 57 % [D2]. Se justifica en parte por el ROIC (capital invertido negativo), el balance sin deuda, el margen ajustado del 35 % y un crecimiento de la nube del 26 %; pero las ventas totales crecen un 8-9 %, como Tyler, Bentley o Descartes, que cotizan a 23-26 veces. Kinaxis y Guidewire, que crecen más, cotizan a 25 y 32 veces. El múltiplo de los comparables no sirve para valorar a Manhattan por sí solo: usaría el PER para el contraste y le daría poco peso.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-05', objetivo: 'E2open (red de comercio y cadena de suministro)', comprador: 'WiseTech Global', ev: 2100, ev_ventas: 3.46, ev_ebitda: null, prima_pct: 28, excluir: false, comentario: '3,30 USD por acción en efectivo, prima del 28 % sobre el cierre del 23-may; ventas FY2025 de 607,7 M en caída [D9].' },
      { fecha: '2022-12', objetivo: 'Coupa Software (compras y cadena de suministro)', comprador: 'Thoma Bravo', ev: 8000, ev_ventas: 8.4, ev_ebitda: null, prima_pct: 77, excluir: false, comentario: '81 USD por acción; 8,4 veces las ventas de los próximos 12 meses del consenso según la propia presentación [D10].' },
      { fecha: '2021-04', objetivo: 'Blue Yonder (planificación y ejecución de la cadena de suministro)', comprador: 'Panasonic', ev: 8500, ev_ventas: 8.5, ev_ebitda: null, prima_pct: null, excluir: false, comentario: 'Panasonic compró el 80 % que no tenía por 5.600 M más deuda; valor del 100 % de 8.500 M y ventas de 2020 de algo más de 1.000 M (múltiplo aproximado, estimación propia) [D11].' },
    ],
    comentario: 'Las tres operaciones de cadena de suministro de los últimos cinco años se pagaron a 3,5-8,5 veces las ventas, frente a las 11,4 veces de Manhattan hoy (12.821 M de valor empresa de Yahoo sobre 1.126 M de ventas de los últimos 12 meses) [D2]. Es decir, el precio de bolsa ya está muy por encima de lo que pagaron compradores con prima de control por Blue Yonder o Coupa. Manhattan no tiene accionista de control y su consejo escalonado dificulta una oferta hostil; un comprador natural (SAP, Oracle, un fondo grande) tendría que pagar más de 13.000 M.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'estimaciones de 2028e y EBITDA del consenso', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (solo 2026 y 2027); 2) Stock Analysis (2027-2028 de pago); 3) MarketScreener (no abre sin sesión)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'múltiplos EV/EBITDA de las operaciones', tipo: 'Complemento', intentos: '1) notas de las operaciones (solo valor y prima); 2) presentación de Coupa (solo ventas); 3) prensa (sin EBITDA publicado)', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de MANH (≈ 30 mensajes de jul-oct 2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-12', url: 'https://api.stocktwits.com/api/2/streams/symbol/MANH.json' },
  { id: 2, titulo: 'Seeking Alpha, titulares de análisis de lectores sobre MANH («The Next Chapter Is Already Priced In», «Editions, Agents, And The Case For Patience», «A Tough Set-Up, With Or Without AI Threat»)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-07-30', url: 'https://seekingalpha.com/symbol/MANH/analysis' },
  { id: 3, titulo: 'StockStory: «3 Reasons MANH is Risky and 1 Stock to Buy Instead»', editor: 'StockStory (FinancialContent)', tipo: 'Foros y redes', fecha: '2026-09-25', url: 'https://www.financialcontent.com/quote/NQ:MANH/news' },
];
const E = {
  _estado: 'completa (analista)',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Positivo', resumen: 'Mensajes alcistas tras el 2T26 («aburrida» pero ganadora) y la mejora de Morgan Stanley; algunos recogen beneficios. Un resumen muy leído apunta que la mejora es más de sentimiento que de cifras (solo un 1-2 % más de ventas que el consenso) [E1].' },
      { plataforma: 'Seeking Alpha (artículos de lectores)', fecha: '2026-07', n_comentarios: 6, tono: 'Dividido', resumen: 'Tras el 2T26 conviven «el siguiente capítulo ya está en el precio» y «ediciones, agentes y paciencia»; en marzo se publicó «un mal momento, con o sin amenaza de IA» y en abril «el foso sigue siendo amplio» [E2].' },
      { plataforma: 'StockStory (análisis automatizado y comentarios)', fecha: '2026-09', n_comentarios: 3, tono: 'Negativo', resumen: 'Tres razones de riesgo: crecimiento de ventas modesto, múltiplo alto y servicios flojos, tras una subida del 61 % en seis meses [E3].' },
    ],
    temas: [
      { tema: 'IA: amenaza o motor', postura: 'Dividida', peso: 'Alto', contraste: 'La dirección dice que los agentes están en más del 10 % de la base y que pesarán en 2027; aún no hay ingresos publicados de IA. El informe lo trata como riesgo bajo-medio con opción al alza.' },
      { tema: 'Valoración tras subir un 86 % desde abril', postura: 'Bajista', peso: 'Alto', contraste: 'Tiene razón: 37 veces el BPA ajustado y 64 veces el GAAP; el DCF no justifica el precio.' },
      { tema: 'Aceleración de la nube y contratación récord', postura: 'Alcista', peso: 'Medio', contraste: 'Cierto: nube +26 % y RPO +23 % en el 2T26; los servicios siguen planos.' },
      { tema: 'Recompras', postura: 'Alcista', peso: 'Bajo', contraste: '275 M en el 1S26 a precios bajos; la autorización restante (225 M) es el 2 % de la capitalización.' },
    ],
    lectura: 'El sentimiento ha pasado de miedo (febrero-abril, la IA como amenaza) a entusiasmo moderado (julio-octubre), con la mejora de Morgan Stanley como sello. Los foros no dan argumentos que el análisis no tenga; el más útil es que la mejora reciente es de sentimiento más que de cifras, lo que coincide con el informe: el precio ya descuenta la aceleración. No hay euforia extrema ni capitulación.',
    confianza: 'Media',
  },
  huecos: [{ seccion: 'sentimiento', campo: 'Reddit y comentarios de lectores en prensa', tipo: 'Complemento', intentos: '1) Reddit (403); 2) comentarios de Motley Fool (sin hilo de MANH reciente); 3) MarketBeat (solo noticias)', decision: 'Omitido' }],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. PER mediana comparables:', perMed);
