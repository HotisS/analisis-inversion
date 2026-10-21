// Escribe las notas A-E de Fastenal (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL de la
// SEC (cuentas-xbrl.json), de bolsa.json (Yahoo, cierre del 20-oct-2026), de yahoo-datos.json (Yahoo quoteSummary del
// 21-oct-2026, 13:42 UTC, sesión abierta), de form4.json y de la ficha sectorial de distribución industrial (14-oct-2026).
// Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/fastenal-2026-10-21/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const lee = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const r1 = (x) => (x == null ? null : Math.round(x * 10) / 10);
const r2 = (x) => (x == null ? null : Math.round(x * 100) / 100);
const r3 = (x) => (x == null ? null : Math.round(x * 1000) / 1000);
const X = lee('cuentas-xbrl.json');
const B = lee('bolsa.json');
const Y = lee('yahoo-datos.json').datos;
const F4 = lee('form4.json');
const ED = 'https://www.sec.gov/Archives/edgar/data/815556';

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cuentas, notas de ingresos por línea de producto, mercado final y geografía, deuda, riesgos, división de acciones 2×1 de mayo de 2025)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000081555626000009/fast-20251231.htm` },
  { id: 2, titulo: 'Fastenal Company Reports 2026 Third Quarter Earnings (8-K, anexo 99.1)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000081555626000046/ex_99109302026earningsrele.htm` },
  { id: 3, titulo: 'Form 10-Q del tercer trimestre de 2026 (30-sep-2026)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-19', url: `${ED}/000081555626000049/fast-20260930.htm` },
  { id: 4, titulo: 'Notas de resultados del 1T26 y 2T26 (8-K, anexos 99.1)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-07-14', url: `${ED}/000081555626000037/ex_99106302026earningsrele.htm` },
  { id: 5, titulo: 'Notas de resultados del 4T24, 3T25 y 4T25 / ejercicio 2025 (8-K, anexos 99.1)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-01-20', url: `${ED}/000081555626000003/ex_99112312025earningsrele.htm` },
  { id: 6, titulo: 'Form 10-K de 2023 y de 2021 (líneas de producto, mercados finales y dividendos extraordinarios de 2020 y 2023)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2024-02-06', url: `${ED}/000081555624000009/fast-20231231.htm` },
  { id: 7, titulo: 'XBRL company facts y cuentas de 2016-2025 (cuenta, balance y flujos)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000815556.json' },
  { id: 8, titulo: 'Form 8-K: nuevo crédito sindicado de 835 M USD hasta 2031 (Wells Fargo), covenants', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-06-23', url: `${ED}/000081555626000035/fast-20260618.htm` },
  { id: 9, titulo: 'Proxy statement 2026 (DEF 14A): cambio de auditor de KPMG a PwC desde 2025', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000081555626000017/fast-20260225.htm` },
  { id: 10, titulo: 'Resumen de la conferencia del 3T26 (margen bruto, 20 pb de efecto calendario, precio/coste, sin guía trimestral)', editor: 'Trefis', tipo: 'Prensa', fecha: '2026-10-19', url: 'https://www.trefis.com/stock/fast/articles/619186/the-open-question-under-fastenal-stocks-price/2026-10-19' },
  { id: 11, titulo: 'Fastenal stock slips 4% despite a Q3 beat (consenso del 3T26: 0,34 USD y 2.440 M; ventas de septiembre +14,4 %)', editor: 'TIKR', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://www.tikr.com/de/blog/fastenal-stock-slips-4-despite-a-q3-beat-heres-the-fuller-picture' },
  { id: 12, titulo: 'Resumen de la conferencia del 3T26 (preguntas sobre precio/coste, moderación de septiembre, productividad con IA en presupuestos)', editor: 'StockHub', tipo: 'Prensa', fecha: '2026-10-16', url: 'https://stockhub.kr/en/insights/view_1792114575632_ja2q596t0' },
  { id: 13, titulo: 'Fastenal posts in-line Q1 results as shares slip; margen bruto 44,6 % por precio/coste y mezcla de clientes', editor: 'Seeking Alpha / Nasdaq (Zacks)', tipo: 'Prensa', fecha: '2026-04-13', url: 'https://seekingalpha.com/news/4574412' },
];

// Cuenta del XBRL [7], comprobada con el 10-K [1] y las notas [5]. BPA, DPA y acciones pasados a las acciones de HOY
// (dos divisiones 2×1: mayo de 2019 y mayo de 2025). En el XBRL, 2016 viene antes de las dos, 2017-2022 en base 2019 y
// 2023-2025 ya en base 2025.
const factor = (a) => (a === '2016' ? 4 : +a <= 2022 ? 2 : 1);
const dpaExtra = { 2020: 0.20, 2023: 0.19 }; // especiales de dic-2020 (0,40 en base 2019) y dic-2023 (0,38 en base 2019) [6, 1]
const anios = ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'];
const cuenta = X.financieros.cuenta.filter((c) => anios.includes(c.periodo)).map((c) => {
  const f = factor(c.periodo);
  const o = { ...c, bpa: r3(c.beneficio_neto / (c.acciones_diluidas * f)), dpa: r3(c.dpa / f), acciones_diluidas: r1(c.acciones_diluidas * f), participadas_en_ebitda: null, no_recurrentes_en_ebitda: null, dpa_extraordinario: dpaExtra[c.periodo] ?? 0 };
  delete o.fin; return o;
});
// DPA de 2025: 0,875 pagado (0,215 + 3 × 0,22 en acciones de hoy; el XBRL redondea a 0,88) [1].
cuenta.find((c) => c.periodo === '2025').dpa = 0.875;
const balance = X.balance.historico.filter((b) => anios.includes(b.periodo)).map((b) => {
  const o = { ...b, arrendamientos: 0, fondo_comercio: null, intangibles: null, minoritarios: 0, activos_contrato: null, pasivos_contrato: null };
  delete o.fin; return o;
});
const flujos = X.flujos.historico.filter((f) => anios.includes(f.periodo)).map((f) => {
  const o = { ...f, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0, recompras: f.recompras ?? 0 };
  delete o.fin; return o;
});

// Trimestres: ventas, resultado de explotación y BPA publicados [2, 4, 5]; EBITDA = resultado de explotación + depreciación y
// amortización del estado de flujos (en 1T-2T de cada año, la del semestre repartida a partes iguales; 4T24 estimado con 44 M:
// estimación propia). BPA del 4T24 en acciones de hoy (0,46 publicado antes de la división).
const trim = (p, ing, g, oi, da, bpa, vs) => ({ periodo: p, ingresos: ing, crecimiento_pct: g, crecimiento_organico_pct: null, ebitda: r1(oi + da), margen_ebitda_pct: r2((oi + da) / ing * 100), bpa, vs_consenso: vs });
const items = [
  trim('4T24', 1824.5, 3.7, 344.8, 44.0, 0.23, 'En línea'),
  trim('1T25', 1959.4, 3.4, 393.9, 44.9, 0.26, 'En línea'),
  trim('2T25', 2080.3, 8.6, 436.1, 44.9, 0.29, 'En línea'),
  trim('3T25', 2133.3, 11.7, 441.5, 45.0, 0.29, 'En línea'),
  trim('4T25', 2027.4, 11.1, 384.3, 44.5, 0.26, 'En línea'),
  trim('1T26', 2201.7, 12.4, 447.6, 45.1, 0.30, 'En línea'),
  trim('2T26', 2386.9, 14.7, 501.8, 45.1, 0.33, 'En línea'),
  trim('3T26', 2463.3, 15.5, 530.8, 44.9, 0.35, 'Superior'),
];

const A = {
  _estado: 'Completa. Cuentas 2016-2025 del XBRL de la SEC comprobadas con el 10-K 2025 y las notas de resultados; BPA, DPA y acciones reexpresados a las acciones de hoy (divisiones 2×1 de 2019 y 2025). Arrendamientos operativos fuera de la deuda (US GAAP). Fondo de comercio e intangibles no se desglosan (dentro de «otros activos», 140 M en 2025).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM sep-26', fecha_fin: '2026-09-30', ingresos: 9079.3, ebitda: 2044.1, ebit: 1864.5, beneficio_neto: 1418.2, bpa: 1.23, dpa: 0.96, dpa_extraordinario: 0, fcf: 1176.8, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Diez años de crecimiento casi todo orgánico: ventas de 3.962 M USD en 2016 a 8.201 M en 2025 y 9.079 M en los doce meses a septiembre de 2026 [7, 2]. La única compra de peso fue Mansco (2020, 125 M en el estado de flujos) [7]. El margen de explotación se ha mantenido en el 20-21 % aunque el margen bruto bajó del 48-49 % de 2016-2018 al 45,0 % de 2025 y al 44,8 % del 3T26: los clientes grandes (contratos y emplazamientos de más de 50.000 USD al mes) compran con menos margen bruto, y el ahorro de gastos generales lo compensa (23,3 % de las ventas en el 3T26 frente al 24,6 % un año antes) [1, 2]. En 2025 el precio aportó 170-200 pb de crecimiento por los aranceles y la cuota el resto del 9,1 % de las ventas diarias, con el ISM manufacturero en 48,9 de media [1]. En 2026 las ventas diarias aceleran: +12,4 % en el 1T, +14,7 % en el 2T y +15,5 % en el 3T, con 240-350 pb de precio cada trimestre [4, 2]. 2020 lleva ventas extraordinarias de equipos de protección por la covid (seguridad, 25,5 % de las ventas frente al 21 % normal) [6].',
    ajustes: 'Fastenal publica cifras GAAP sin ajustes: no hay BPA «ajustado» ni partidas no recurrentes relevantes en 2016-2025 (el EBITDA es el resultado de explotación más depreciación y amortización del estado de flujos) [1, 7]. Lo único que distorsiona la serie es la reforma fiscal de 2018 (el tipo efectivo baja del 36-37 % al 23-24 %, que sube el BPA de 2018 un 15 % sin mejora del negocio) y los dividendos extraordinarios de diciembre de 2020 (0,20 USD por acción de hoy) y de diciembre de 2023 (0,19 USD), que van aparte como dividendo extraordinario [6, 1]. El 3T26 lleva unos 20 pb de margen bruto por efectos de calendario (devoluciones de aranceles, rappels de proveedores) que la dirección no espera que se repitan [2, 10].',
    confianza: 'Alta',
  },
  trimestres: {
    items,
    ultima_presentacion: 'En el 3T26 (14-oct-2026) las ventas diarias crecieron un 15,5 % (contratos +18,8 %, resto +7,8 %; fabricación pesada +20,2 %), con 240 pb de precio y una mejora «modesta» de la producción industrial [2]. El margen bruto cayó 40-50 pb hasta el 44,8 %: unos 50 pb por la mezcla hacia clientes grandes y 30 pb de precio/coste negativo (10 pb mejor que en el 2T), compensados en parte por compras directas, rappels y devoluciones de aranceles; 20 pb de ese beneficio son de calendario [2, 10]. El margen de explotación subió al 21,5 % por el apalancamiento de gastos [2]. La dirección (Jeff Watts, consejero delegado desde el 16-jul-2026, y Max Tunnicliff, director financiero) rebajó otra vez el objetivo de firmas de máquinas FMI (27.000-29.000, antes 28.000-30.000) y mantuvo una inversión neta de 310-330 M en 2026 [2]. Los analistas preguntaron sobre todo cuánto margen bruto es transitorio y cuándo se cierra el hueco de precio/coste: la dirección dijo que no se ensanchará en el 4T pero no dio fecha para la neutralidad; atribuyó la moderación de septiembre (+14,4 %) a la base de precios y no a la actividad, y explicó la productividad comercial con especialización y presupuestos con IA, no con un tope de plantilla [10, 11, 12]. Frente al 2T (14-jul), el discurso pasa de «precio/coste difícil» (el 1T restó 50 pb y la acción cayó un 6,9 % el 13-abr) a «mejora secuencial» [4, 13]. Fastenal no da guía trimestral ni anual [10].',
    confianza: 'Alta',
  },
  balance: {
    historico: balance,
    vencimientos: [{ anio: '2026', importe: 0 }, { anio: '2027', importe: 50 }, { anio: '2030', importe: 50 }],
    liquidez: 'Caja 211,9 M USD (30-sep-2026) + crédito sindicado comprometido de 835 M sin disponer (ampliable a 1.335 M, vencimiento junio de 2031) [3, 8].',
    rating: 'Sin rating público (deuda privada con aseguradoras bajo el Master Note Agreement) [1].',
    coste_deuda_pct: 2.6, vida_media_anios: 2.3,
    otros_pasivos: 'Deuda casi nula: 100 M USD de pagarés privados a tipo fijo (serie E, 2,72 %, mayo de 2027; serie H, 2,50 %, junio de 2030) y nada dispuesto del crédito; el nuevo crédito de junio de 2026 quita el covenant de EBITDA y deja solo una cobertura mínima de intereses [3, 8]. Arrendamientos operativos de 351,7 M (113,5 a corto) que, en US GAAP, no se suman a la deuda [3]. Cartas de crédito por 29,7 M (contingentes) [1]. Sin pensiones de prestación definida (plan 401(k)), sin pagos aplazados de compras ni factoring. Reservas de seguros propios (accidentes laborales y responsabilidad civil) de 25 M en gastos devengados [1].',
    comentario: 'El circulante comercial es el gran consumo de capital: existencias 1.776,6 M, clientes 1.615,2 M y proveedores 445,8 M a 30-sep-2026, 2.946 M (32 % de las ventas de doce meses) [2]. En el último año los clientes subieron un 19,9 % por la mezcla de clientes grandes, que pagan más tarde, mientras las existencias solo un 3,1 % pese a vender un 15,5 % más: la empresa ha liberado inventario tras el acopio de 2022 (1.708 M) y lo ha devuelto en 2023 [2, 7]. La deuda bajó de 555 M en 2022 a 100 M; el dividendo y las recompras se pagan con caja propia [3, 7].',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujos,
    comentario: 'La conversión de beneficio en caja es alta pero cíclica: flujo operativo del 128 % del beneficio en 2020 y del 124 % en 2023 (cuando se liberan existencias) y del 83 % en 2021 y 87 % en 2022 (acopio por la escasez y la inflación) [7]. En los nueve meses de 2026, 94,8 % (media de cinco años 96,4 %), por los clientes que pagan más tarde [2]. El capex es de máquinas expendedoras (FASTVend, FASTBin), naves logísticas y TI: 2,8 % de las ventas en 2025 y 310-330 M (≈ 3,4 %) en 2026 por la nueva nave de Atlanta, TI retrasada y camiones; media de diez años 3,1 % [2]. Estimación propia: mantenimiento ≈ la amortización (≈ 2,0-2,2 % de las ventas), crecimiento el resto. Pagan casi todo el beneficio: dividendos de 1.004 M en 2025 (80 % del beneficio) y recompras de 30 M en el 3T26, las primeras desde 2022 [7, 2].',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'PricewaterhouseCoopers LLP (desde el ejercicio 2025; KPMG hasta 2024)', anios_auditor: 2, opinion: 'Favorable, sin salvedades, también sobre el control interno (2025)',
    comentario: 'Cuentas sencillas: distribución con reconocimiento de ingresos al entregar, sin capitalización de I+D ni de intereses relevante, sin compras grandes ni fondo de comercio material y sin partidas no recurrentes en diez años [1]. Los pagos en acciones son mínimos (8,4 M en 2025, 0,7 % del beneficio) [1]. El cambio de auditor de KPMG a PwC se decidió en julio de 2024 tras un concurso, sin desacuerdos según la carta de KPMG [9]. Lo que más mueve la cifra es el valor de las existencias (provisión por lento movimiento) y las reservas de seguros propios, que la empresa considera estimaciones críticas sin desviaciones históricas [1]. Los indicadores del motor (Altman, Piotroski y Beneish) se leen con el balance sin deuda y el circulante alto: un Altman muy alto es esperable; si el Beneish se acercara a −1,78 sería por el salto de clientes de 2026 (cuentas a cobrar +19,9 % con ventas +15,5 %), explicado por la mezcla de clientes con plazos más largos y no por ventas adelantadas [2].',
    senales: [
      { senal: 'Cuentas a cobrar que crecen más que las ventas', nivel: 'Baja', comentario: '+19,9 % frente a +15,5 % en el 3T26; la empresa lo atribuye a los clientes grandes con plazos más largos; la provisión por insolvencias solo sube de 5,3 a 6,2 M [2, 3].' },
      { senal: 'Margen bruto con 20 pb de efectos de calendario en el 3T26', nivel: 'Baja', comentario: 'Devoluciones de aranceles y rappels que no se repetirán; la referencia de fondo es una caída de unos 60 pb [2, 10].' },
      { senal: 'Cambio de auditor (KPMG → PwC)', nivel: 'Baja', comentario: 'Por concurso en 2024, sin desacuerdos [9].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral creciente que reparte el 70-80 % del beneficio: 0,22 USD en 2025, 0,24 desde enero de 2026 y 0,26 desde julio de 2026 (+8,3 %); dividendos extraordinarios cuando sobra caja (diciembre de 2020 y de 2023) [1, 2]. Recompras oportunistas: autorización de 16 M de acciones de julio de 2022 sin caducidad, de la que quedan 10,675 M tras recomprar en 2026 [3]. Prioridades declaradas: crecimiento orgánico (máquinas FMI, naves, TI), dividendo y, después, deuda y recompras; compras pequeñas y escasas [1].',
    adquisiciones: [
      { anio: '2020', objetivo: 'Mansco (distribuidor de sujeciones de Texas) y activos de Apex Industrial (expendedoras)', importe: 125, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integradas sin deterioros; impacto pequeño en ventas [7, 6].' },
      { anio: '2017', objetivo: 'Activos de Mansco/Manufacturer\'s Supply (compras menores)', importe: 58.7, ev_ebitda: null, financiacion: 'Caja', resultado: 'Sin deterioros publicados [7].' },
    ],
    comentario: 'Asignación de capital conservadora y coherente durante diez años: casi todo el crecimiento es orgánico, la reinversión va a capex y circulante y el resto se reparte (el 80 % del beneficio en dividendos en 2025) [1, 7]. No hay compras caras ni deterioros, y la deuda es simbólica. Las recompras son pequeñas (30 M en el 3T26 a unos 46 USD de media según la empresa) y no reducen las acciones de forma apreciable: 1.147 M en circulación frente a 1.148 M a final de 2025 [3]. El límite de esta política es que, con la acción a más de 40 veces beneficios, recomprar crea poco valor; el dividendo creciente es la vía principal.',
    confianza: 'Alta',
  },
  negocio: {
    segmentos: [
      { nombre: 'Sujeciones (tornillería y suministros diversos)', descripcion: 'Línea original: tornillos, tuercas, anclajes y pequeña ferretería, sobre todo de producción (OEM).', tipo_resultado: null, historico: [['2021', 33.3], ['2022', 34.0], ['2023', 32.4], ['2024', 30.7], ['2025', 30.5]].map(([p, pct]) => ({ periodo: p, ingresos: r1(cuenta.find((c) => c.periodo === p).ingresos * pct / 100), resultado: null })) },
      { nombre: 'Seguridad', descripcion: 'Equipos de protección individual, guantes, ropa de trabajo (marca propia Body Guard).', tipo_resultado: null, historico: [['2021', 21.2], ['2022', 20.8], ['2023', 21.2], ['2024', 22.2], ['2025', 22.2]].map(([p, pct]) => ({ periodo: p, ingresos: r1(cuenta.find((c) => c.periodo === p).ingresos * pct / 100), resultado: null })) },
      { nombre: 'Otras líneas (herramientas, limpieza, corte, hidráulica, manutención, eléctrico, soldadura)', descripcion: 'Ocho líneas menores que se venden por el mismo canal y sobre todo en máquinas expendedoras.', tipo_resultado: null, historico: [['2021', 45.5], ['2022', 45.2], ['2023', 46.4], ['2024', 47.1], ['2025', 47.3]].map(([p, pct]) => ({ periodo: p, ingresos: r1(cuenta.find((c) => c.periodo === p).ingresos * pct / 100), resultado: null })) },
    ],
    geografias: [{ nombre: 'Estados Unidos', peso_pct: 83.2 }, { nombre: 'Canadá y México', peso_pct: 13.5 }, { nombre: 'Otros (23 países)', peso_pct: 3.3 }],
    geografias_criterio: 'origen',
    kpis: [
      { kpi: 'Ventas diarias (crecimiento interanual, 3T)', valor_anterior: '+11,7 % (3T25)', valor_actual: '+15,5 % (3T26)', variacion: '+3,8 pp', comentario: 'Contratos +18,8 %, resto +7,8 % [2].' },
      { kpi: 'Emplazamientos de más de 50.000 USD/mes (media del 3T)', valor_anterior: '2.771', valor_actual: '3.288', variacion: '+18,7 %', comentario: 'Venta media de 147.668 USD/mes por emplazamiento [2].' },
      { kpi: 'Máquinas FMI instaladas (MEU ponderadas, fin del periodo)', valor_anterior: '133.910', valor_actual: '143.878', variacion: '+7,4 %', comentario: 'Firmas de 2026 rebajadas a 27.000-29.000 MEU [2].' },
      { kpi: 'Ventas por canales digitales (Digital Footprint, % de ventas)', valor_anterior: '61,3 %', valor_actual: '61,4 %', variacion: '+0,1 pp', comentario: 'Objetivo de 2026: 66 % [1].' },
      { kpi: 'Margen bruto (3T)', valor_anterior: '45,3 %', valor_actual: '44,8 %', variacion: '−0,5 pp', comentario: 'Mezcla de clientes −50 pb, precio/coste −30 pb [2].' },
      { kpi: 'Margen de explotación (3T)', valor_anterior: '20,7 %', valor_actual: '21,5 %', variacion: '+0,8 pp', comentario: 'Gastos generales 23,3 % de las ventas [2].' },
      { kpi: 'Plantilla equivalente a tiempo completo', valor_anterior: '21.568', valor_actual: '21.749', variacion: '+0,8 %', comentario: 'Ventas +15,5 % con la misma plantilla [2].' },
    ],
    clientes: 'Ningún cliente llega al 5 % de las ventas [1]. El 76,5 % de las ventas del 3T26 es con clientes con contrato (nacionales, regionales y administraciones), que crecen al 18,8 %; el resto, al 7,8 % [2]. El 76,6 % de las ventas va a fabricación (44,6 % pesada) y el 8 % a construcción no residencial [2]. Los costes de cambio son reales en los clientes grandes: las máquinas expendedoras y los almacenes dentro de la planta (Onsite) llevan el inventario del cliente y sus datos de consumo [1]. Poder de precios demostrado con límites: en 2025 trasladó los aranceles con 170-200 pb de precio sin perder margen bruto en el año, pero en 2026 el precio/coste restó 30-50 pb por trimestre porque los costes con arancel llegaron antes que las subidas [1, 2, 13].',
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'balance', campo: 'fondo_comercio e intangibles', tipo: 'Complemento', intentos: '1) Balance del 10-K 2025 (no se desglosan); 2) nota 3 de activos a largo plazo (solo inmovilizado); 3) XBRL de la SEC (sin concepto de fondo de comercio)', decision: 'Omitido (inmaterial: dentro de «otros activos», 140 M)' },
  ],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K 2025 de Fastenal (mercado norteamericano de más de 140.000 M USD, competencia, aprovisionamiento en Asia, aranceles, historia)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000081555626000009/fast-20251231.htm` },
  { id: 2, titulo: 'Form 10-K 2018 de W.W. Grainger (mercado MRO de EE. UU. de 93.000 M USD y de Canadá de 12.000 M)', editor: 'W.W. Grainger (SEC)', tipo: 'Primaria', fecha: '2019-02-27', url: 'https://www.sec.gov/Archives/edgar/data/277135/000027713519000010/gww20181231-10k.htm' },
  { id: 3, titulo: 'Form 10-K 2025 de W.W. Grainger (resultado operativo, Zoro y MonotaRO, salida del Reino Unido)', editor: 'W.W. Grainger (SEC)', tipo: 'Primaria', fecha: '2026-02-20', url: 'https://www.sec.gov/Archives/edgar/data/277135/000027713526000011/gww-20251231.htm' },
  { id: 4, titulo: 'XBRL de la SEC: ventas y resultado de explotación de MSC Industrial (FY2025), Applied Industrial (FY2026), Wesco (2025) y Distribution Solutions Group (2025)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/' },
  { id: 5, titulo: 'Ficha sectorial: distribución industrial especializada (perímetro, economía, ciclo, comparables)', editor: 'Repositorio de análisis (sectores/distribucion-industrial-2026-10-14.md)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14.md' },
  { id: 6, titulo: 'Ficha sectorial: fijaciones y componentes metálicos (IMARC y Global Market Insights; CBAM; aranceles)', editor: 'Repositorio de análisis (sectores/componentes-fijaciones-2026-10-15.md)', tipo: 'Sectorial', fecha: '2026-10-15', url: 'sectores/componentes-fijaciones-2026-10-15.md' },
  { id: 7, titulo: 'Fastenal Company Reports 2026 Third Quarter Earnings (mercados finales, emplazamientos, centros de datos)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000081555626000046/ex_99109302026earningsrele.htm` },
  { id: 8, titulo: 'Proxy statement 2026 (EcoVadis plata, gobierno de riesgos ESG)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000081555626000017/fast-20260225.htm` },
  { id: 9, titulo: 'Form 10-K 2021 de Fastenal (historia del modelo Onsite: primero en 1992, motor de crecimiento desde 2014)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2022-02-07', url: `${ED}/000081555622000009/fast-20211231.htm` },
];
const B_ = {
  _estado: 'Completa. Mercado con dos fuentes (estimación propia de Fastenal en su 10-K 2025 y la de Grainger en su 10-K 2018, perímetros distintos); competidores con cifras de sus cuentas (XBRL).',
  historia: {
    resumen: 'Bob Kierlin y cuatro socios abrieron en 1967 una tienda de tornillos en Winona (Minnesota, 26.000 habitantes) con la idea de vender sujeciones en ciudades pequeñas mal atendidas por los grandes [1]. Creció abriendo sucursales y añadiendo desde 1993 otras líneas que usan el mismo canal [1]. En la última década cambió de modelo: máquinas expendedoras en la planta del cliente (FASTVend) y almacenes dedicados dentro de sus fábricas (Onsite, impulsados desde 2014), con menos sucursales abiertas al público [1, 9], lo que la acercó a los clientes grandes y le dio cuota en un mercado fragmentado [1]. Dan Florness (consejero delegado 2016-2026) llevó ese cambio; Jeff Watts le sucedió el 16-jul-2026 [1].',
    hitos: [
      { anio: '1967', hito: 'Fundación en Winona como tienda de tornillos [1].' },
      { anio: '1993', hito: 'Primeras líneas distintas de la tornillería; hoy son el 69,5 % de las ventas [1].' },
      { anio: '1992', hito: 'Primer Onsite (almacén dentro de la planta de un cliente), una opción local durante dos décadas [9].' },
      { anio: '2014', hito: 'Los Onsites pasan a ser motor de crecimiento, con inversión acelerada desde 2015 [9].' },
      { anio: '2019', hito: 'División de acciones 2×1 [1].' },
      { anio: '2023', hito: 'Marcas propias agrupadas en Body Guard y Fastenal; dividendo extraordinario [1].' },
      { anio: '2025', hito: 'Segunda división 2×1; aranceles trasladados a precios; nueva información por emplazamientos y por material directo/indirecto [1].' },
      { anio: '2026', hito: 'Jeff Watts, consejero delegado; ventas diarias +15,5 % en el 3T [7].' },
    ],
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Fastenal distribuye suministros industriales y de construcción: tornillería (30,5 % de las ventas de 2025), seguridad (22,2 %) y otras ocho líneas (herramientas, limpieza, corte, hidráulica, manutención, eléctrico, soldadura) [1]. Sirve a 90.759 emplazamientos de clientes (media del 3T26) desde 1.595 sucursales en 25 países, 15 centros de distribución en Norteamérica y 4 fuera, con 24.679 empleados [1, 7]. Sus herramientas propias son las máquinas expendedoras y los contenedores inteligentes en la planta (143.878 unidades ponderadas), los almacenes dedicados en la fábrica del cliente y el comercio electrónico integrado; el 61 % de las ventas pasa por canales digitales [7]. El 83 % de las ventas es en EE. UU. y el 77 % con fabricantes [1, 7].',
    como_gana_dinero: 'Compra a cientos de proveedores (sobre todo en Asia para la tornillería y la marca propia) y revende con un margen bruto del 45 %, muy por encima de un catálogo genérico, porque cobra la disponibilidad: el producto está en la planta del cliente cuando lo necesita [1]. Los gastos de personal son el 70-75 % de los gastos generales y llevan bonus mensuales ligados a las ventas y al beneficio, así que el coste se ajusta solo en las caídas [1, 7]. El margen de explotación (20-21,5 %) depende de tres cosas: la mezcla (clientes grandes, menos margen bruto pero más volumen por emplazamiento), el precio frente al coste del producto (aranceles y acero, con trimestres de retraso) y el apalancamiento de gastos [7]. Ventas casi todas recurrentes (consumo de las fábricas), con estacionalidad baja y sensibilidad a la producción industrial de EE. UU.',
    confianza: 'Alta',
  },
  sector: {
    definicion: 'Distribución de suministros MRO (mantenimiento, reparación y operaciones) y de componentes de producción de bajo valor (tornillería, consumibles, seguridad) a fábricas, obras y administraciones de Norteamérica. Usamos la estimación de Fastenal (más de 140.000 M USD al año en Norteamérica, incluido el material directo de producción), que es la que encaja con lo que vende [1]. La segunda fuente, Grainger, daba 105.000 M USD en 2018 solo para MRO en EE. UU. y Canadá, sin la tornillería de producción ni México [2]. Ninguna fuente independiente gratuita publica la serie; el crecimiento sale de la producción industrial más precio [5].',
    tamano: '> 140.000 M USD al año en Norteamérica (estimación de Fastenal, 10-K 2025) [1]; 105.000 M USD de MRO en EE. UU. y Canadá en 2018 (Grainger) [2]',
    unidad_serie: 'millones de USD', serie: [],
    tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentado',
    drivers: [
      { driver: 'Producción industrial de EE. UU. (ISM manufacturero)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'ISM de 48,9 de media en 2025, por debajo de 50 en 10 de 12 meses; producción +1,2 %; en 2026 «mejora modesta» [1, 7].' },
      { driver: 'Consolidación de proveedores por los clientes grandes', efecto: '+', horizonte: 'Estructural', evidencia: 'Contratos +18,8 % frente a +7,8 % del resto en el 3T26; emplazamientos de más de 50.000 USD/mes +18,7 % [7].' },
      { driver: 'Aranceles y acero (inflación de precios)', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Precio +240-350 pb por trimestre en 2026; precio/coste −30 a −50 pb en el margen bruto [7].' },
      { driver: 'Automatización del aprovisionamiento (expendedoras, contenedores con RFID, compras electrónicas)', efecto: '+', horizonte: 'Estructural', evidencia: 'Mercado potencial de 1,7 millones de expendedoras en Norteamérica según la empresa; 143.878 instaladas [1, 7].' },
      { driver: 'Relocalización industrial y centros de datos', efecto: '+', horizonte: 'Estructural', evidencia: 'Construcción no residencial con seis trimestres de crecimiento; centros de datos citados entre los «otros» mercados [7].' },
      { driver: 'Comercio electrónico de catálogo (Amazon Business, Zoro)', efecto: '−', horizonte: 'Estructural', evidencia: 'Los modelos de «surtido infinito» de Grainger (Zoro 13 millones de referencias, MonotaRO 29 millones) compiten en precio transparente en el cliente pequeño [3].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Fragmentado y competitivo, con grandes nacionales (Grainger, MSC) y miles de locales; la competencia es por servicio y precio [1].' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Ningún cliente supera el 5 %, pero los grandes negocian precio: su mezcla resta 50 pb de margen bruto [1, 7].' },
      { fuerza: 'Poder de los proveedores', intensidad: 2, justificacion: 'Cientos de proveedores; solo uno pasa del 5 % de las compras; la marca propia y la compra directa en Asia (FASTCO) reducen dependencia [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Escala logística, 1.595 sucursales y 144.000 máquinas instaladas son difíciles de replicar [1, 7].' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 3, justificacion: 'Venta directa del fabricante y mercados en línea en el catálogo estándar; menos en la reposición dentro de la planta [3].' },
    ],
    ciclo: { posicion: 'Recuperación', comentario: 'Tras dos años de ISM por debajo de 50 (2024-2025), 2026 muestra una mejora modesta de la producción y ventas de doble dígito por cuota y precio [1, 7]. Comportamiento histórico: en 2020, +5,9 % gracias a los equipos de protección; en 2022, +16 % por la inflación; en 2023-2024, +5 % y +3 % con la industria floja [7]. El precio de los aranceles infla las ventas de 2025-2026 y desaparecerá de la comparación en 2027.' },
    regulacion: 'Aranceles de EE. UU. desde febrero de 2025 sobre importaciones (China, y los del acero y el aluminio, con los mayores aumentos de coste), parte de ellos devueltos en 2026 (la empresa cita «devoluciones de aranceles» en el margen bruto del 3T26) [1, 7]. Fastenal importa una parte significativa de Asia (China y Taiwán), directa e indirectamente [1]. Cualquier alteración del comercio entre EE. UU., Canadá y México le afecta (13,5 % de las ventas en Canadá y México) [1]. Normas de seguridad laboral (OSHA) sostienen la demanda de equipos de protección. En Europa, el CBAM sobre el acero importado desde 2026 es irrelevante para Fastenal (3 % de ventas fuera de Norteamérica) [6].',
    tendencias: 'Tres tendencias favorecen a los grandes con servicio en planta: los clientes reducen proveedores, piden trazabilidad y datos de consumo, y automatizan la reposición (expendedoras, contenedores con RFID, compras electrónicas integradas) [1, 7]. La amenaza es el comercio electrónico de catálogo, que abarata la comparación de precios en el cliente pequeño (Zoro, Amazon Business, MonotaRO) [3], y la IA de compras, que puede convertir parte del catálogo estándar en mercancía. Fastenal gana con la primera y está protegida en la segunda en la parte de reposición dentro de la planta (el 61 % de sus ventas ya pasa por sus propios canales digitales) [7].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 5.9, posicion: '2.º distribuidor de suministros industriales de Norteamérica tras Grainger; ≈ 5,9 % del mercado de más de 140.000 M USD que estima la empresa (8.201 M de ventas en 2025) [1].',
    competidores: [
      { nombre: 'W.W. Grainger', pais: 'EE. UU.', ticker: 'GWW', ingresos: 17942, cuota_pct: null, margen_ebit_pct: 13.9, comentario: 'Líder en MRO con catálogo amplio y entrega al día siguiente; Zoro y MonotaRO en surtido infinito. Margen operativo ajustado del 15,0 % (2.691 M) [3].' },
      { nombre: 'MSC Industrial Direct', pais: 'EE. UU.', ticker: 'MSM', ingresos: 3770, cuota_pct: null, margen_ebit_pct: 8.0, comentario: 'Herramientas de corte y metalurgia; también expendedoras e implantes; más expuesta al ciclo y con margen a la baja (FY2025 a agosto) [4].' },
      { nombre: 'Applied Industrial Technologies', pais: 'EE. UU.', ticker: 'AIT', ingresos: 4967, cuota_pct: null, margen_ebit_pct: 11.1, comentario: 'Rodamientos, transmisión, hidráulica y automatización; crece con compras (FY2026 a junio) [4].' },
      { nombre: 'Wesco International', pais: 'EE. UU.', ticker: 'WCC', ingresos: 23511, cuota_pct: null, margen_ebit_pct: 5.2, comentario: 'Material eléctrico y de comunicaciones; competidor en la parte eléctrica y de centros de datos [4].' },
      { nombre: 'Distribution Solutions Group', pais: 'EE. UU.', ticker: 'DSGR', ingresos: 1980, cuota_pct: null, margen_ebit_pct: 4.0, comentario: 'Lawson Products (tornillería y consumibles con gestión de inventario en planta), el modelo más parecido a escala menor [4].' },
      { nombre: 'Würth (no cotiza)', pais: 'Alemania', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor grupo mundial de tornillería y montaje; en EE. UU. por filiales regionales [5].' },
    ],
    foso: {
      veredicto: 'Estrecho', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 1, evidencia: 'Los datos de consumo de las máquinas mejoran la reposición, pero no hay efecto de red entre clientes [1].' },
        { fuente: 'Costes de cambio', puntuacion: 4, evidencia: 'Máquinas y almacenes dentro de la planta del cliente con su inventario y sus datos; contratos con crecimiento del 18,8 % [7].' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 1, evidencia: 'Marcas propias (Body Guard) en seguridad; sin patentes relevantes [1].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Compra directa en Asia (FASTCO), 19 centros de distribución y camiones propios; margen de explotación del 20-21 % frente al 8-14 % de Grainger y MSC [1, 3, 4].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: '1.595 sucursales y 143.878 máquinas en un mercado fragmentado donde la densidad local abarata la entrega [1, 7].' },
      ],
    },
    amenazas: 'Tres amenazas, de más a menos probable: (1) la mezcla de clientes grandes que sigue bajando el margen bruto (−50 pb al año) y que el ahorro de gastos deje de compensar (probabilidad media) [7]; (2) el catálogo electrónico y la IA de compras que abaratan la comparación de precios en la parte estándar y en los clientes pequeños (sin contrato, 23,5 % de las ventas y creciendo al 7,8 %) (probabilidad media a cinco años) [3, 7]; (3) un competidor grande que replique el modelo de máquinas y almacenes en planta (Grainger y MSC ya lo tienen a menor escala; probabilidad baja) [3, 4].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [{ agencia: 'EcoVadis', calificacion: 'Medalla de plata (15 % mejor de las evaluadas)', fecha: '2025' }],
    materialidad: 'Lo que mueve cifras: (1) seguridad laboral en 19 centros de distribución y una flota propia de camiones (la empresa usa la tasa EMR del seguro de accidentes como indicador, por debajo de la media del sector) [1]; (2) cadena de suministro en Asia y cumplimiento de normas de origen y trabajo forzoso (importaciones de China y Taiwán) [1]; (3) ahorro de consumo de los clientes con las expendedoras (menos desperdicio de consumibles), que es parte de la propuesta comercial [1, 8].',
    controversias: 'No encontramos sanciones, litigios materiales ni incidentes relevantes en los últimos tres años en el 10-K 2025 (sin procedimientos legales materiales) ni en los 8-K de 2025-2026 [1].',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'sector', campo: 'serie de tamaño de mercado, TCAC y CR5', tipo: 'Complemento', intentos: '1) 10-K 2025 de Fastenal (solo «más de 140.000 M», sin serie); 2) 10-K de Grainger 2018 y 2025 (2018 con cifra, 2025 sin ella); 3) MDM y estudios de mercado (de pago)', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas, ratio de remuneración', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-25', url: `${ED}/000081555626000017/fast-20260225.htm` },
  { id: 2, titulo: 'Form 8-K: resultados de la junta de 2026 (votos de consejeros y de remuneración)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-04-24', url: `${ED}/000081555626000025/fast-20260423.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2025', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2025-04-25', url: `${ED}/000081555625000087/fast-20250424.htm` },
  { id: 4, titulo: 'Fastenal Announces CEO Transition (Florness deja el cargo el 16-jul-2026; le sucede Jeff Watts)', editor: 'Fastenal Company (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-12-22', url: `${ED}/000081555625000123/ex_99112222025ceo.htm` },
  { id: 5, titulo: 'Fastenal Names New Chief Financial Officer (Max Tunnicliff, desde el 10-nov-2025)', editor: 'Fastenal Company (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-11-03', url: `${ED}/000081555625000121/ex_99110302025cfo.htm` },
  { id: 6, titulo: 'Form 8-K: nombramiento de Vishal Talwar (FedEx) como consejero independiente', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-06-12', url: `${ED}/000081555626000033/fast-20260612.htm` },
  { id: 7, titulo: 'Form 4 de directivos y consejeros (21-oct-2025 a 21-oct-2026), herramienta form4.mjs', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000815556&type=4' },
  { id: 8, titulo: 'Form 10-K 2025 (directivos, trayectorias; objetivos de FMI y Digital Footprint de 2025)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-02-05', url: `${ED}/000081555626000009/fast-20251231.htm` },
  { id: 9, titulo: 'Notas de resultados del 3T26 y 2T26 (objetivos de 2026 de firmas FMI y capex)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000081555626000046/ex_99109302026earningsrele.htm` },
];
const ops = F4.operaciones.filter((o) => ['P', 'S'].includes(o.codigo) && o.fecha >= '2025-10-21').sort((a, b) => (a.fecha < b.fecha ? -1 : 1));
const C = {
  _estado: 'Completa. Proxy 2026, votos de las juntas de 2025 y 2026, 8-K de cambios en la cúpula y Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'Jeffery M. Watts', cargo: 'Consejero delegado (desde el 16-jul-2026); antes presidente y director comercial', desde: '2026', participacion_pct: 0.02, trayectoria: 'En Fastenal desde 1996; dirigió las ventas internacionales y desde agosto de 2024 fue presidente y director comercial: el periodo de las firmas de contratos que explican el +15,5 % de 2026 [4, 1].' },
      { nombre: 'Max H. Tunnicliff', cargo: 'Director financiero (desde el 10-nov-2025)', desde: '2025', participacion_pct: 0.0, trayectoria: 'Fichaje externo, raro en Fastenal: director financiero de Beko Europe y antes cargos financieros en Whirlpool (auditoría interna, estrategia, finanzas de Asia-Pacífico) [5].' },
      { nombre: 'Daniel L. Florness', cargo: 'Asesor estratégico del consejero delegado hasta principios de 2028 (consejero delegado 2016-2026)', desde: '1996', participacion_pct: 0.10, trayectoria: 'Director financiero 2002-2015 y consejero delegado 2016-2026: ventas de 3.962 a 8.201 M USD y margen de explotación del 20 % sostenido con el cambio a Onsites y expendedoras [4, 8].' },
      { nombre: 'Scott A. Satterlee', cargo: 'Presidente del consejo (independiente)', desde: '2009', participacion_pct: 0.01, trayectoria: 'Exdirector de transporte por carretera de C.H. Robinson; preside el consejo y dirige las sesiones de independientes [1].' },
      { nombre: 'Charles S. Miller', cargo: 'Vicepresidente ejecutivo sénior de ventas', desde: '2020', participacion_pct: 0.01, trayectoria: 'Responsable de las ventas y sucursales de EE. UU. e internacionales [8].' },
      { nombre: 'Sheryl A. Lisowski', cargo: 'Vicepresidenta ejecutiva, directora contable y tesorera', desde: '2015', participacion_pct: 0.0, trayectoria: 'Directora contable desde 2015; directora financiera interina en 2025 [8, 1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Firmas FMI de 25.000-26.000 MEU [8]', real: '25.892 MEU [8]', cumplida: 'Sí' },
      { anio: '2025', guia: 'Digital Footprint del 66-68 % de las ventas [8]', real: '62,4 % en diciembre [8]', cumplida: 'No' },
      { anio: '2025', guia: 'Inversión neta de 235-255 M USD [8]', real: '230,6 M (proyectos retrasados) [8]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Firmas FMI de 28.000-30.000 MEU, rebajado en octubre a 27.000-29.000 [9]', real: '21.428 en nueve meses [9]', cumplida: 'Parcial' },
      { anio: '2026', guia: 'Digital Footprint del 66 % [8]', real: '61,4 % en el 3T26 [9]', cumplida: 'No' },
      { anio: '2026', guia: 'Inversión neta de 310-330 M USD [9]', real: '190 M en nueve meses; se mantiene el rango [9]', cumplida: 'Parcial' },
    ],
    comentario: 'Equipo de la casa, con cultura de ascenso interno, bonus mensuales ligados al beneficio antes de impuestos y una sucesión ordenada: Watts fue nombrado presidente en agosto de 2024 y consejero delegado en julio de 2026, y Florness sigue de asesor hasta 2028 [4]. La novedad es un director financiero de fuera (Tunnicliff, ex Whirlpool y Beko) tras la salida de Holden Lewis en 2025 [5, 1]. La dirección cumple lo que controla (gasto, firmas en 2025) y falla en los objetivos de adopción digital y de máquinas, que lleva dos años rebajando [8, 9]: credibilidad media-alta en lo financiero, menor en los indicadores de crecimiento.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Scott A. Satterlee', cargo: 'Presidente', tipo: 'Independiente', desde: '2009', comisiones: 'Ninguna como miembro (preside el consejo)' },
      { nombre: 'Michael J. Ancius', cargo: 'Consejero', tipo: 'Independiente', desde: '2009', comisiones: 'Auditoría (presidente), nombramientos' },
      { nombre: 'Stephen L. Eastman', cargo: 'Consejero', tipo: 'Independiente', desde: '2015', comisiones: 'Auditoría, remuneración, nombramientos (presidente)' },
      { nombre: 'Brady D. Ericson', cargo: 'Consejero', tipo: 'Independiente', desde: '2025', comisiones: 'Remuneración, nombramientos' },
      { nombre: 'Jeffery M. Watts', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Rita J. Heise', cargo: 'Consejera', tipo: 'Independiente', desde: '2012', comisiones: 'Auditoría, remuneración, nombramientos' },
      { nombre: 'Hsenghung Sam Hsu', cargo: 'Consejero', tipo: 'Independiente', desde: '2020', comisiones: 'Auditoría, remuneración, nombramientos' },
      { nombre: 'Daniel L. Johnson', cargo: 'Consejero', tipo: 'Independiente', desde: '2016', comisiones: 'Remuneración (presidente desde feb-2026), nombramientos' },
      { nombre: 'Sarah N. Nielsen', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría, remuneración, nombramientos' },
      { nombre: 'Irene A. Quarshie', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: 'Remuneración, nombramientos' },
      { nombre: 'Reyne K. Wisecup', cargo: 'Consejera', tipo: 'Otro externo', desde: '2000', comisiones: '—' },
      { nombre: 'Vishal Talwar', cargo: 'Consejero', tipo: 'Independiente', desde: '2026', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: false, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 88.8, voto_remuneracion_contra_pct: 10.9, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: '2025', total: 4.18, fijo: 0.75, variable_corto: 2.57, variable_largo: 0.86, ratio_salario_medio: 88 },
    remuneracion: 'Modelo sencillo y barato para el tamaño: el consejero delegado cobró 4,18 M USD en 2025 (0,75 fijo, 2,57 de bonus en caja y 0,86 en opciones), 88 veces el empleado mediano [1]. El bonus se calcula con el crecimiento del beneficio antes de impuestos y se paga cada trimestre; no hay plan plurianual con ROIC ni rentabilidad para el accionista: las opciones (con cuatro-ocho años de consolidación) son el único incentivo a largo plazo [1]. Premia crecer el beneficio, no crecer a cualquier precio. Hay política de recuperación (clawback) conforme al Nasdaq desde 2023 y guías de tenencia de acciones para directivos y consejeros [1]. En 2026 la junta aprobó un plan de acciones restringidas para empleados y consejeros [2]. Voto en contra de la remuneración: 10,9 % en 2026 y 6,1 % en 2025 [2, 3].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 12.25, tipo: 'Institucional (fondos índice)', variacion: 'Estable (13G a dic-2023)' },
      { nombre: 'BlackRock, Inc.', pct: 8.02, tipo: 'Institucional (fondos índice)', variacion: 'Estable (13G a dic-2023)' },
      { nombre: 'Consejeros y directivos (22 personas)', pct: 0.28, tipo: 'Internos, con opciones', variacion: 'Ventas netas de 3,0 M USD en 12 meses' },
    ],
    insiders: ops.map((o) => ({ fecha: o.fecha, persona: `${o.persona} (${o.cargo})`, operacion: o.codigo === 'P' ? 'Compra' : 'Venta', acciones: o.acciones, importe: r2(o.importe / 1e6) })),
    control_y_defensas: 'Sin accionista de control: el mayor es Vanguard con el 12,25 % y los internos tienen menos del 1 % [1]. Una acción, un voto, sin clases; consejeros elegidos cada año por mayoría [1, 2]. Presidente independiente separado del consejero delegado; nueve de once (hoy diez de doce) consejeros independientes y comisiones solo de independientes [1, 6]. Sin operaciones vinculadas relevantes según la política del consejo [1]. Wisecup (consejera desde 2000) es exdirectiva de recursos humanos de Fastenal: no es independiente [1]. Defensas: ninguna relevante más allá de las de la ley de Minnesota.',
    alertas: ['Ninguna relevante detectada tras revisar el proxy 2026, los 8-K de 2025-2026 y los Form 4. Se anota: rotación de la cúpula financiera (Holden Lewis sale en 2025, Tunnicliff entra en noviembre) y relevo del consejero delegado en julio de 2026, ambos ordenados [4, 5].'],
    confianza: 'Alta',
  },
  huecos: [
    { seccion: 'gobierno', campo: 'voto de remuneración de la junta de 2024', tipo: 'Complemento', intentos: '1) 8-K de abril de 2024 (no descargado en esta iteración); 2) proxy 2025 (no lo recoge); 3) se usan las juntas de 2025 y 2026', decision: 'Omitido (dos juntas en vez de tres)' },
  ],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Yahoo Finance, históricos diarios (FAST, SPY, XLI) y cierres de cada ejercicio, hasta el 20-oct-2026 (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/FAST/history' },
  { id: 2, titulo: 'Yahoo Finance quoteSummary de Fastenal y comparables (consenso de BPA y ventas, recomendaciones, objetivos, valor empresa, EBITDA de 12 meses)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/FAST/analysis' },
  { id: 3, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/daily-treasury-rates.csv/2026/all?type=daily_treasury_yield_curve' },
  { id: 4, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 5, titulo: 'Form 10-Q del 3T26 de Fastenal (acciones en circulación 1.147,26 M; deuda y caja a 30-sep-2026)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-19', url: `${ED}/000081555626000049/fast-20260930.htm` },
  { id: 6, titulo: 'Home Depot: adquisición de SRS Distribution (18.250 M USD, ≈ 16,1x el EBITDA ajustado 2023e), presentación 8-K', editor: 'The Home Depot (SEC)', tipo: 'Primaria', fecha: '2024-03-28', url: 'https://www.sec.gov/Archives/edgar/data/354950/000110465924040163/tm2410002d1_ex99-2.htm' },
  { id: 7, titulo: 'Lowe\'s: acuerdo para comprar Foundation Building Materials (≈ 8.800 M USD; 6.500 M de ventas y 635 M de EBITDA ajustado pro forma 2024)', editor: 'Lowe\'s Companies (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-08-20', url: 'https://www.sec.gov/Archives/edgar/data/60667/000006066725000162/exhibit991-08012025fbm.htm' },
  { id: 8, titulo: 'GMS: acuerdo con Home Depot/SRS (110 USD por acción, valor empresa ≈ 5.500 M USD) y cuentas XBRL de FY2025 (ventas 5.514 M, EBITDA 422 M)', editor: 'GMS Inc. (SEC, 8-K y XBRL)', tipo: 'Primaria', fecha: '2025-06-30', url: 'https://www.sec.gov/Archives/edgar/data/1600438/000110465925063833/tm2519400d1_ex99-1.htm' },
  { id: 9, titulo: 'QXO to Acquire Beacon Roofing Supply for $11 Billion; cuentas XBRL de Beacon 2024 (ventas 9.763 M, EBITDA 867 M)', editor: 'QXO (Business Wire) y SEC EDGAR', tipo: 'Primaria', fecha: '2025-03-20', url: 'https://www.businesswire.com/news/home/20250320149865/en/QXO-to-Acquire-Beacon-Roofing-Supply-for-11-Billion' },
  { id: 10, titulo: 'Ficha sectorial de distribución industrial (ROIC, DN/EBITDA y rentabilidad por FCF de los comparables, 14-oct-2026)', editor: 'Repositorio de análisis (sectores/distribucion-industrial-2026-10-14-comparables.json)', tipo: 'Sectorial', fecha: '2026-10-14', url: 'sectores/distribucion-industrial-2026-10-14-comparables.json' },
  { id: 11, titulo: 'Tipos de cambio de referencia del BCE (20-oct-2026: 1,1215 USD y 0,84028 GBP por euro)', editor: 'Banco Central Europeo', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist-90d.xml' },
  { id: 12, titulo: 'Notas de resultados de Fastenal 2025 y 3T26 (BPA, dividendo de 0,26 USD trimestral desde julio de 2026)', editor: 'Fastenal Company (SEC)', tipo: 'Primaria', fecha: '2026-10-14', url: `${ED}/000081555626000046/ex_99109302026earningsrele.htm` },
];
const GBPUSD = 1.1215 / 0.84028;
const yf = (t) => Y[t];
const comp = (t, nombre, pais, ext = {}) => {
  const d = yf(t); const fx = d.divisa === 'GBp' ? GBPUSD : 1;
  const tr = d.trend.filter((x) => /y$/.test(x.periodo));
  // crecimiento de ventas próximo ejercicio sobre el anterior (Yahoo), como aproximación del NTM/LTM
  const g = tr[1]?.crec_ventas != null ? r1(tr[1].crec_ventas * 100) : null;
  const cap = d.cap ? d.cap / 1e6 * fx : null;
  return { nombre, ticker: t.replace('.L', ''), pais, capitalizacion: cap ? Math.round(cap) : null, ev_ventas: r2(d.ev / d.ventas), ev_ebitda_ltm: r1(d.ev_ebitda), ev_ebitda_ntm: null, per_ntm: r1(d.per_adelantado), crecimiento_pct: g, margen_ebitda_pct: r1(d.ebitda / d.ventas * 100), roic_pct: ext.roic ?? null, dn_ebitda: r1((d.ev - (d.cap || 0)) / d.ebitda), fcf_yield_pct: ext.fcf ?? null };
};
const comparables = [
  comp('GWW', 'W.W. Grainger', 'US', { roic: 33.2, fcf: 2.5 }),
  comp('MSM', 'MSC Industrial Direct', 'US', { roic: 13.6, fcf: 3.0 }),
  comp('AIT', 'Applied Industrial Technologies', 'US', { roic: 19.6, fcf: 3.7 }),
  comp('WCC', 'Wesco International', 'US'),
  comp('FERG', 'Ferguson Enterprises', 'US'),
  comp('WSO', 'Watsco', 'US'),
  comp('DPLM.L', 'Diploma', 'GB', { roic: 14.4 }),
  comp('RS1.L', 'RS Group', 'GB', { roic: 9.7, fcf: 6.8 }),
];
// MSC: Yahoo no da capitalización (0); se calcula con precio × 55,9 M acciones diluidas de FY2025 (XBRL de la SEC).
const msm = comparables.find((c) => c.ticker === 'MSM'); msm.capitalizacion = Math.round(yf('MSM').precio * 55.9); msm.dn_ebitda = r1((yf('MSM').ev / 1e6 - msm.capitalizacion) / (yf('MSM').ebitda / 1e6));
const pers = comparables.map((c) => c.per_ntm).sort((a, b) => a - b);
const medPer = r1((pers[3] + pers[4]) / 2);
const f = yf('FAST');
const cierres = B.cierres_ejercicio.filter((c) => anios.includes(c.anio));
const D = {
  _estado: 'Completa. Precio y bolsa de Yahoo (cierre del 20-oct-2026; el 21-oct la sesión estaba abierta), consenso y comparables de Yahoo quoteSummary del 21-oct-2026 a las 13:42 UTC, transacciones de los 8-K de los compradores con EBITDA del XBRL cuando el comunicado no da múltiplo.',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Fastenal Company', nombre_corto: 'Fastenal', ticker: 'FAST', isin: 'US3119001044', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Industria', industria: 'Distribuidores de comercio (GICS 201070)', sede: 'Winona (Minnesota)', fundacion: '1967', empleados: 24679, web: 'https://www.fastenal.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 1150.1, capitalizacion_publicada: Math.round(f.cap / 1e6), free_float_pct: 99.7,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones)} M USD/día (3 meses)`, proximos_resultados: '2027-01-19',
  },
  consenso: {
    guidance: 'Fastenal no da guía de ventas ni de beneficio, ni trimestral ni anual [12]. Sí da objetivos operativos de 2026, confirmados o cambiados el 14-oct-2026: firmas de máquinas FMI de 27.000-29.000 MEU (rebajado dos veces), inversión neta de 310-330 M USD (Atlanta, TI, camiones) y tipo fiscal del 24,6 % [12]. La dirección dijo en la conferencia que el hueco de precio/coste no se ensanchará en el 4T, sin fecha para la neutralidad [12].',
    estimaciones: [
      { periodo: '2026e', ingresos: Math.round(f.trend.find((x) => x.periodo === '0y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(f.trend.find((x) => x.periodo === '0y').bpa), dpa: 1.00, fuente: 'Yahoo Finance (14 analistas de BPA) [2]; DPA = dividendos declarados de 2026 [12]' },
      { periodo: '2027e', ingresos: Math.round(f.trend.find((x) => x.periodo === '+1y').ventas / 1e6), ebitda: null, ebit: null, bpa: r2(f.trend.find((x) => x.periodo === '+1y').bpa), dpa: null, fuente: 'Yahoo Finance (14 analistas) [2]' },
    ],
    recomendaciones: { n_analistas: 18, comprar: 6, mantener: 7, vender: 5, po_medio: r2(f.po_medio), po_min: f.po_min, po_max: f.po_max },
    revisiones: `BPA de 2026 del consenso: ${String(r2(f.trend[2]?.bpa_hace90 ?? 1.2576)).replace('.', ',')} USD hace 90 días, 1,26 hace 30 y 1,27 hoy; 2027: 1,39 hace 90 días y 1,40 hoy (+0,8 %) [2]. Las revisiones son pequeñas y al alza tras dos trimestres de ventas por encima de lo esperado, frenadas por el margen bruto. Recomendaciones de Yahoo: 6 comprar, 7 mantener, 2 vender y 3 venta fuerte (18); objetivo medio de 13 analistas 51,07 USD (39,90-60,00), por debajo del precio [2]. Solo una fuente gratuita con estimaciones completas (Yahoo); MarketScreener no abre sin sesión.`,
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...B.bolsa,
    posicion_corta_pct: r1(f.corto_pct * 100),
    comentario: 'Fastenal ha batido al S&P 500 a 1, 5 y 10 años (21,3 % anual con dividendos en diez años frente al 15,5 %) y en 2026 sube un 30,8 % frente al 13,7 % [1]. La subida de 2026 es de resultados (ventas de doble dígito y margen de explotación al alza) y de múltiplo: el PER de los doce meses pasa de unas 37 veces a final de 2025 a 42 veces [1, 2]. Los días de resultados mueven la acción: −6,9 % el 13-abr-2026 (margen bruto del 1T) y −4 % aprox. el 14-oct pese a batir, por la calidad del margen bruto [1]. Beta mensual de 5 años de 0,66 (semanal 0,79): defensiva para una industrial por su balance sin deuda y el dividendo [1].',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Precio de cierre de cada año ajustado por las dos divisiones (Yahoo) [1]. Fastenal cotizó a 20-30 veces beneficios en 2016-2019 y a 30-40 veces desde 2020, cuando el mercado premió su resistencia en la pandemia y el cambio a clientes grandes; con tipos al 5 % el múltiplo no bajó [1]. Hoy, a 42 veces el BPA de doce meses y unas 38 veces el de los próximos doce, está en lo más alto de su historia; la mediana adelantada de cinco años ronda las 32 veces (detalle en la regla a 12 meses).',
    confianza: 'Alta',
  },
  comparables: {
    criterio: 'Distribuidores industriales cotizados de EE. UU. y Reino Unido con modelo de servicio al cliente profesional: Grainger y MSC (competidores directos en MRO), Applied (componentes industriales), Wesco y Ferguson (eléctrico, fontanería), Watsco (climatización) y Diploma y RS (especialistas europeos). Fuera Würth (no cotiza), Bunzl (consumibles no industriales) y DSG (dos analistas, poco seguida). Todos con datos de Yahoo del 21-oct-2026 [2]; libras a dólares con el BCE [11]; ROIC y rentabilidad por FCF de la ficha sectorial del 14-oct cuando existen [10].',
    empresas: comparables,
    comentario: `Fastenal es la más cara del grupo con diferencia: unas 36-37 veces el BPA adelantado de consenso frente a una mediana de ${String(medPer).replace('.', ',')} veces, y 29 veces el EBITDA de doce meses frente a 14-26 [2]. Parte de la prima se justifica: margen EBITDA del 22,5 %, el más alto con Diploma, ROIC superior al 30 % (con Grainger), sin deuda y crecimiento del 14 % en 2026 [2, 10]. Pero Grainger, con ROIC parecido y crecimiento del 7-10 %, cotiza a 26 veces, y el crecimiento esperado de Fastenal para 2027 (+9,5 %) no es muy superior. Usaríamos el PER para comparar (mismo criterio GAAP en EE. UU.); el EV/EBITDA mezcla definiciones ajustadas en los europeos.`,
    confianza: 'Media',
  },
  transacciones: {
    operaciones: [
      { fecha: '2025-08', objetivo: 'Foundation Building Materials (distribución de materiales de interior)', comprador: 'Lowe\'s', ev: 8800, ev_ventas: r2(8800 / 6500), ev_ebitda: r1(8800 / 635), prima_pct: null, excluir: false, comentario: 'EBITDA ajustado pro forma 2024 de 635 M y ventas de 6.500 M; múltiplo calculado con esas cifras [7].' },
      { fecha: '2025-06', objetivo: 'GMS (distribución de placas de yeso y techos)', comprador: 'Home Depot (SRS)', ev: 5500, ev_ventas: r2(5500 / 5514), ev_ebitda: r1(5500 / 422), prima_pct: null, excluir: false, comentario: 'Valor empresa del comunicado; EBITDA GAAP de FY2025 (abril) del XBRL, que lleva cargos: el múltiplo sobre el ajustado sería menor [8].' },
      { fecha: '2025-03', objetivo: 'Beacon Roofing Supply (distribución de tejados)', comprador: 'QXO', ev: 11000, ev_ventas: r2(11000 / 9763), ev_ebitda: r1(11000 / 867), prima_pct: null, excluir: false, comentario: 'Valor con deuda del comunicado; EBITDA GAAP 2024 del XBRL [9].' },
      { fecha: '2024-03', objetivo: 'SRS Distribution (distribución especializada para profesionales)', comprador: 'Home Depot', ev: 18250, ev_ventas: null, ev_ebitda: 16.1, prima_pct: null, excluir: false, comentario: '≈ 16,1x el EBITDA ajustado 2023e según el comprador [6].' },
    ],
    comentario: 'Las compras recientes de distribuidores para profesionales en EE. UU. se pagaron a 12,7-16,1 veces el EBITDA, con control y sinergias [6-9]. Fastenal cotiza a 29 veces su EBITDA de doce meses sin prima de control: el mercado ya paga por ella el doble que un comprador estratégico por un distribuidor de construcción. No es objetivo de compra verosímil (59.000 M USD de capitalización, sin accionista de control) y su propia estrategia de compras es casi nula. Son de construcción, no de MRO: referencia lejana, sin peso en la valoración.',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'consenso', campo: 'EBITDA del consenso y BPA de 2028e', tipo: 'Complemento', intentos: '1) Yahoo quoteSummary (dos ejercicios, sin EBITDA); 2) MarketScreener (no abre sin sesión); 3) Nasdaq/Zacks (solo BPA del año y el siguiente)', decision: 'Omitido' },
    { seccion: 'transacciones', campo: 'compras de distribuidores MRO puros con múltiplo publicado', tipo: 'Complemento', intentos: '1) 8-K de Applied Industrial (Hydradyne) y DSG (sin múltiplo); 2) 10-K de Grainger (venta de Cromwell, sin múltiplo); 3) prensa sectorial (MDM, de pago)', decision: 'Se usan distribuidores de construcción, marcados como referencia lejana' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits, flujo de $FAST (30 mensajes, 20-sep a 20-oct-2026)', editor: 'Stocktwits', tipo: 'Foros y redes', fecha: '2026-10-20', url: 'https://api.stocktwits.com/api/2/streams/symbol/FAST.json' },
  { id: 2, titulo: 'Seeking Alpha: artículos y titulares sobre Fastenal (julio-octubre de 2026)', editor: 'Seeking Alpha', tipo: 'Foros y redes', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/FAST' },
  { id: 3, titulo: 'TIKR y Trefis: lectura de la reacción al 3T26', editor: 'TIKR / Trefis', tipo: 'Foros y redes', fecha: '2026-10-19', url: 'https://www.trefis.com/stock/fast/articles/619186/the-open-question-under-fastenal-stocks-price/2026-10-19' },
];
const E = {
  _estado: 'Completa. Stocktwits y titulares de Seeking Alpha; Reddit no abre.',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Estable',
    revisadas: [
      { plataforma: 'Stocktwits ($FAST)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Pocos mensajes marcados: alcistas de corto plazo («siempre oscila incluso con buenas cifras») frente a uno bajista («sobrevalorada»); se comenta la caída del 5 % antes de la apertura del 14-oct por el margen y que la recompra del 3T fue a unos 46 USD [1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-10', n_comentarios: 6, tono: 'Negativo', resumen: 'Tras el 3T predominan las tesis de valoración: «la matemática detrás de mi venta», «no veo razón para pagar más prima», «ni un 16 % de crecimiento basta a 39 veces»; admiran el negocio pero no el precio [2].' },
      { plataforma: 'TIKR y Trefis (blogs de análisis)', fecha: '2026-10', n_comentarios: 2, tono: 'Neutro', resumen: 'Centran la duda en cuánto margen bruto es transitorio (20 pb de calendario) y si los clientes grandes siguen sin erosionar el beneficio por venta [3].' },
    ],
    temas: [
      { tema: 'Valoración (PER de 37-43 veces)', postura: 'Bajista', peso: 'Alto', contraste: 'Los datos les dan la razón: 42 veces el BPA de doce meses y 36-37 el adelantado de consenso, por encima de su mediana histórica y de todos los comparables.' },
      { tema: 'Margen bruto y mezcla de clientes grandes', postura: 'Dividida', peso: 'Alto', contraste: 'Correcto que baja (−40/−50 pb) pero el margen de explotación sube 90 pb: la tesis de la empresa se cumple de momento.' },
      { tema: 'Crecimiento por cuota (contratos +18,8 %)', postura: 'Alcista', peso: 'Medio', contraste: 'Confirmado por los emplazamientos de más de 50.000 USD (+18,7 %); parte del crecimiento es precio por aranceles (240 pb).' },
      { tema: 'Operativa de corto plazo alrededor de resultados', postura: 'Dividida', peso: 'Bajo', contraste: 'Ruido sin relación con la tesis.' },
    ],
    lectura: 'Los particulares y los autores de Seeking Alpha coinciden con el análisis en lo esencial: el negocio es de calidad y el precio es exigente. No hay euforia ni capitulación; la acción sube por resultados con un coro escéptico sobre el múltiplo, y los analistas tampoco empujan (objetivo medio de 51 USD, por debajo del precio). El foro no aporta un riesgo que el informe no tenga; sí recuerda que los días de resultados castigan cualquier duda sobre el margen bruto (−7 % en abril, −4 % en octubre).',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, comparables.map((c) => `${c.ticker} ${c.per_ntm} cap ${c.capitalizacion} ev/ventas ${c.ev_ventas} g ${c.crecimiento_pct} m ${c.margen_ebitda_pct} dn ${c.dn_ebitda}`));
