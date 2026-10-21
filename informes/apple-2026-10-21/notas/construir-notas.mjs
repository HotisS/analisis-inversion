// Escribe las notas A-E de Apple (corte 2026-10-21) a partir de los documentos de notas/docs (EDGAR), del XBRL de la
// SEC (cuentas-xbrl.json), de bolsa.json, de yahoo-datos.json (Yahoo quoteSummary del 21-oct-2026, 15:55 UTC) y de form4.json.
// Cada nota cita solo con [n] de su propia lista de fuentes.
// Ejecutar: node informes/apple-2026-10-21/notas/construir-notas.mjs
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
const ED = 'https://www.sec.gov/Archives/edgar/data/320193';
const ANIOS = ['FY2018', 'FY2019', 'FY2020', 'FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'];

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025 (cerrado el 27-sep-2025): cuentas, segmentos, deuda, arrendamientos, impuestos (State Aid), riesgos y litigios', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-31', url: `${ED}/000032019325000079/aapl-20250927.htm` },
  { id: 2, titulo: 'Form 10-Q del 3T del ejercicio 2026 (27-jun-2026): cuentas, segmentos, intangibles, deuda, recompras, aranceles, DMA, Epic y Google', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000032019326000020/aapl-20260627.htm` },
  { id: 3, titulo: 'Apple reports third quarter results (nota de resultados del 3T FY2026; reembolsos de aranceles)', editor: 'Apple Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000032019326000018/a8-kex991q3202606272026.htm` },
  { id: 4, titulo: 'Apple reports second quarter results (2T FY2026; recompra adicional de 100.000 M USD; dividendo +4 %)', editor: 'Apple Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-04-30', url: `${ED}/000032019326000011/a8-kex991q2202603282026.htm` },
  { id: 5, titulo: 'Apple reports first quarter results (1T FY2026; base instalada de más de 2.500 M de dispositivos)', editor: 'Apple Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-01-29', url: `${ED}/000032019326000005/a8-kex991q1202612272025.htm` },
  { id: 6, titulo: 'Apple reports fourth quarter results (4T FY2025 y ejercicio 2025)', editor: 'Apple Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2025-10-30', url: `${ED}/000032019325000077/a8-kex991q4202509272025.htm` },
  { id: 7, titulo: 'XBRL company facts de Apple (series anuales y trimestrales, valores negociables, pagos en acciones)', editor: 'SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://data.sec.gov/api/xbrl/companyfacts/CIK0000320193.json' },
  { id: 8, titulo: 'Forms 10-Q del 1T y 2T del ejercicio 2026', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-05-01', url: `${ED}/000032019326000013/aapl-20260328.htm` },
  { id: 9, titulo: 'Apple (AAPL) Q3 2026 earnings call transcript (guía del 4T: ventas +9-11 %, margen bruto 47-48 %, restricciones de memoria)', editor: 'Webull News (transcripción)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364638775387136' },
];
const fx = X.financieros.cuenta.filter((c) => ANIOS.includes(c.periodo));
const cuenta = fx.map((c) => ({
  periodo: c.periodo, ingresos: c.ingresos, coste_ventas: c.coste_ventas, gastos_generales: c.gastos_generales, ebitda: c.ebitda,
  amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos,
  minoritarios: 0, beneficio_neto: c.beneficio_neto, gastos_financieros: c.gastos_financieros ?? null, participadas_en_ebitda: null,
  no_recurrentes_en_ebitda: null, bpa: c.bpa, dpa: c.dpa, dpa_extraordinario: 0, acciones_diluidas: c.acciones_diluidas,
}));
// Valores negociables (corrientes + no corrientes) [A7]: se suman a la caja para que el capital invertido sea el OPERATIVO.
const vn = { FY2018: 40388 + 170799, FY2019: 51713 + 105341, FY2020: 52927 + 100887, FY2021: 27699 + 127877, FY2022: 24658 + 120805, FY2023: 31590 + 100544, FY2024: 35228 + 91479, FY2025: 18763 + 77723 };
const balanceH = X.balance.historico.filter((c) => ANIOS.includes(c.periodo)).map((b) => ({
  periodo: b.periodo, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total,
  fondo_comercio: 0, intangibles: b.periodo === 'FY2025' ? 11093 : null, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias,
  clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja + vn[b.periodo],
  deuda_financiera: b.deuda_financiera, arrendamientos: 0, patrimonio_neto: b.patrimonio_neto, minoritarios: 0, reservas: b.reservas,
}));
const flujosH = X.flujos.historico.filter((c) => ANIOS.includes(c.periodo)).map((f) => ({
  periodo: f.periodo, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: 0, adquisiciones: f.adquisiciones ?? 0,
  desinversiones: 0, dividendos: f.dividendos, recompras: f.recompras, emision_acciones: f.emision_acciones ?? 0, intereses_en_financiacion: 0,
}));
const tri = [
  ['4T24', 94930, 6.1, 29591 + 2911, 0.97, 'Superior'],
  ['1T25', 124300, 4.0, 42832 + 3080, 2.40, 'Superior'],
  ['2T25', 95359, 5.1, 29589 + 2661, 1.65, 'Superior'],
  ['3T25', 94036, 9.6, 28202 + 2830, 1.57, 'Superior'],
  ['4T25', 102466, 7.9, 32427 + 3127, 1.85, 'Superior'],
  ['1T26', 143756, 15.7, 50852 + 3214, 2.84, null],
  ['2T26', 111184, 16.6, 35885 + 3439, 2.01, null],
  ['3T26', 109417, 16.4, 35695 + 3320, 2.02, 'Superior'],
].map(([periodo, ingresos, c, e, bpa, vs]) => ({ periodo, ingresos, crecimiento_pct: c, crecimiento_organico_pct: null, ebitda: e, margen_ebitda_pct: r1(e / ingresos * 100), bpa, vs_consenso: vs }));

const A = {
  _estado: 'Completa. Cuentas FY2018-FY2025 del XBRL de la SEC comprobadas con el 10-K de 2025; trimestres del XBRL y de las notas de resultados; LTM a 27-jun-2026 = FY2025 − 9M FY2025 + 9M FY2026. FY2016-FY2017 fuera: BPA y acciones sin el desdoblamiento 4:1 de 2020. Caja = efectivo + valores negociables corrientes y no corrientes. Arrendamientos operativos fuera (US GAAP).',
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-27', ingresos: 466823, ebitda: 167959, ebit: 154859, beneficio_neto: 128930, bpa: 8.72, dpa: 1.06, dpa_extraordinario: 0, fcf: 136683, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [],
    comentario: 'Apple facturó 416.161 M USD en el ejercicio 2025 (+6,4 %), con un margen EBITDA del 34,8 % y un margen operativo del 32,0 % [A1]. En cinco años (FY2020-FY2025) las ventas crecieron un 8,7 % anual, pero casi todo vino del salto de FY2021 (+33 %, ciclo del 5G y la pandemia); de FY2022 a FY2024 estuvieron planas (394.328, 383.285 y 391.035 M) [A1, A7]. El margen se ha ensanchado por la mezcla: Servicios pasó del 19,6 % de las ventas en FY2020 al 26,2 % en FY2025 con un margen bruto del 75,4 %, frente al 36,8 % de Productos [A1]. El ejercicio 2026 (cerrado el 26-sep-2026, aún sin publicar) va mucho mejor: en nueve meses las ventas suben un 16,2 % (364.357 M) con el iPhone 17 (+22 %) y Gran China (+30 %), y el margen bruto llega al 49,1 % [A2]. Parte es no recurrente: los reembolsos de aranceles IEEPA tras la sentencia del Supremo del 20-feb-2026 sumaron unos 2 puntos de margen bruto en el 3T (0,11 USD por acción) y la guía del 4T incluye otro punto [A3, A9].',
    ajustes: 'Cifras publicadas (US GAAP); Apple no publica cifras ajustadas salvo dos partidas que aquí se tratan aparte. (1) FY2024: cargo fiscal único de 10.200 M USD por la decisión de ayudas de Estado de la Comisión Europea confirmada por el Tribunal de Justicia de la UE el 10-sep-2024 (15.800 M pagados a Irlanda desde la cuenta de garantía, menos 4.800 M de crédito fiscal en EE. UU.) [A1]; el BPA de FY2024 (6,08 USD) sería ≈ 6,75 sin él, que es el que se usa en la historia del PER. (2) 3T y 4T FY2026: reembolsos de aranceles IEEPA registrados como menor coste de ventas (≈ 0,11 USD por acción en el 3T; ≈ 1 punto de margen bruto en la guía del 4T) [A3, A9]: no se repiten y la proyección de FY2027 no los incluye. El EBITDA es EBIT + amortización y depreciación del estado de flujos; no se suman los pagos en acciones (12.863 M en FY2025), que son un coste real.',
    confianza: 'Alta',
  },
  trimestres: {
    items: tri,
    ultima_presentacion: 'Trimestres del ejercicio fiscal de Apple (4T24 = julio-septiembre de 2024; 3T26 = abril-junio de 2026). En la conferencia del 3T26 (30-jul-2026), la última de Tim Cook como consejero delegado, la dirección dio una guía del 4T por debajo de lo esperado: ventas +9-11 % (el consenso esperaba ≈ +12 %), con un efecto divisa de −2,5 puntos y unas restricciones de suministro que «aumentarán de forma significativa»; iPhone +15 % aproximadamente; margen bruto del 47-48 %, que incluye ≈ 1 punto de reembolsos de aranceles; gastos operativos de 19.100-19.400 M y tipo fiscal del 16,5 % [A9]. Cook llamó al encarecimiento de la memoria una «inundación de las que pasan una vez cada cien años» y admitió que la falta de producto es «un problema de previsión de demanda». Las preguntas que más se repitieron: suministro y memoria (Evercore, Melius), coste de cómputo de Siri AI (Goldman), precios (Morgan Stanley) y despliegue de Siri AI en China y Europa (JPMorgan). La dirección evitó dar color sobre el trimestre de diciembre, no tiene «un plan completo» para el coste de cómputo y no dio fechas para China y la UE [A9]. En el 1T26 (enero) el discurso era el contrario: récord absoluto, «demanda sin precedentes» del iPhone 17 y 2.500 M de dispositivos activos [A5].',
    confianza: 'Alta',
  },
  balance: {
    historico: balanceH,
    vencimientos: [{ anio: 'FY2026', importe: 12393 }, { anio: 'FY2027', importe: 10078 }, { anio: 'FY2028', importe: 9300 }, { anio: 'FY2029', importe: 5235 }, { anio: 'FY2030', importe: 4972 }, { anio: 'FY2031+', importe: 49303 }],
    liquidez: 'Efectivo 39.544 M + valores negociables 106.973 M (22.855 corrientes y 84.118 no corrientes) = 146.517 M USD a 27-jun-2026, frente a una deuda financiera de 84.344 M (pagarés 1.997, bonos a corto 11.007 y a largo 71.340): caja neta de 62.173 M [A2].',
    rating: 'Moody\'s Aaa y S&P AA+ (perspectiva estable), según los folletos de emisión de bonos; sin comprobar en 2026',
    coste_deuda_pct: 3.4,
    vida_media_anios: null,
    otros_pasivos: 'Arrendamientos: 13.720 M a 27-sep-2025 (12.490 operativos y 1.230 financieros), plazo medio de 9,8 años [A1]; en US GAAP el alquiler operativo ya está en el EBITDA y no se suma a la deuda. Obligaciones de compra a fabricantes de 57.000 M (56.200 a 12 meses) y otras obligaciones de compra de 29.300 M a 27-jun-2026 [A2]. Pasivos fiscales no corrientes dentro de «otros pasivos no corrientes» (55.080 M a junio de 2026, +13.500 M en nueve meses) [A2]. Litigios: la Comisión Europea multó a Apple con 500 M EUR por la DMA (recurrida) y puede imponer hasta el 10 % de las ventas mundiales en la investigación del artículo 6(4); el Supremo de EE. UU. revisará el desacato del caso Epic [A2]. Un jurado de San Diego condenó a Apple a pagar 5.722 M USD a Taction por dos patentes del Taptic Engine el 25-sep-2026 (recurrida; sin provisión conocida). Sin pensiones de prestación definida relevantes.',
    comentario: 'El balance es de caja neta pese a recomprar más de lo que gana: la caja más los valores negociables bajó de 237.100 M en FY2018 a 132.420 M en FY2025 y la deuda financiera pasó de 114.483 a 98.657 M [A1, A7]; desde 2018 la dirección apunta a una posición «neutral de caja neta» y lo está cumpliendo despacio (caja neta de 62.173 M en junio de 2026) [A2]. El capital circulante comercial es muy negativo (existencias + clientes − proveedores = −24.365 M en FY2025, −5,9 % de las ventas): Apple cobra antes de pagar a sus fabricantes. En 2026 las existencias se duplicaron (5.718 → 11.092 M) por la compra anticipada de componentes, sobre todo memoria (7.645 M de componentes frente a 2.124) [A2]. El patrimonio neto es pequeño (73.733 M en FY2025; 107.520 en junio de 2026) porque las recompras se comieron las reservas, así que el ROE (150 %) no significa nada.',
    confianza: 'Alta',
  },
  flujos: {
    historico: flujosH,
    comentario: 'Conversión de beneficio en caja alta y estable: flujo operativo de 111.482 M en FY2025 (1,0 veces el beneficio neto) y capex de 12.715 M (3,1 % de las ventas), FCF de 98.767 M [A1]. FY2025 lleva el pago extraordinario de ≈ 15.800 M a Irlanda por las ayudas de Estado, por eso el flujo operativo bajó frente a FY2024 (118.254 M) [A1]. En los nueve meses de FY2026 el flujo operativo sube a 116.996 M (81.754 un año antes) y el capex baja a 6.799 M [A2]. Apple no separa el capex de mantenimiento: con una amortización de ≈ 11.700 M en FY2025, casi todo el capex es reposición y centros de datos; estimación propia: ≈ 70-80 % mantenimiento. El destino de la caja es la recompra: 90.711 M en FY2025 y 62.094 M en nueve meses de FY2026, más 15.421 M de dividendos [A1, A2]; las compras de empresas son pequeñas (menos de 1.600 M al año).',
    confianza: 'Alta',
  },
  calidad: {
    auditor: 'Ernst & Young LLP', anios_auditor: 17, opinion: 'Favorable (también sobre el control interno)',
    comentario: 'Cuentas sencillas y de alta calidad: ingresos casi todos de venta de producto en el momento de la entrega y de servicios a lo largo del contrato (ingresos diferidos de 14.900 M en junio de 2026) [A2]. Los pagos en acciones son el ajuste más grande: 12.863 M en FY2025 (11,5 % del beneficio neto) [A7]; Apple no los excluye de sus cifras y aquí tampoco. No hay fondo de comercio relevante ni deterioros. El tipo impositivo efectivo se mueve con partidas fiscales: 24,1 % en FY2024 por el cargo de las ayudas de Estado y 15,6 % en FY2025 [A1]. Los intangibles netos pasaron de 13.301 a 25.417 M en nueve meses de FY2026 (licencias y derechos de contenido y de propiedad intelectual, sin desglose), algo a vigilar porque su amortización irá al coste [A2]. Los indicadores del motor deben leerse con cuidado: el Altman Z sale alto por la capitalización; el Beneish M no capta nada raro; el Piotroski F es alto por márgenes y recompras.',
    senales: [
      { senal: 'Subida de intangibles de 12.100 M en nueve meses sin desglose', nivel: 'Baja', comentario: 'Probablemente licencias (IA, contenido) pagadas por adelantado; su amortización entra en el coste de ventas o en I+D [A2].' },
      { senal: 'Margen bruto del 3T26 con ≈ 2 puntos de reembolsos de aranceles', nivel: 'Media', comentario: 'No recurrente; la guía del 4T trae ≈ 1 punto más. Inflan el BPA de FY2026 en ≈ 0,16 USD [A3, A9].' },
      { senal: 'Existencias duplicadas (componentes de memoria)', nivel: 'Baja', comentario: 'Compras anticipadas ante la escasez de memoria; riesgo de depreciación si los precios de la memoria bajan [A2].' },
    ],
    confianza: 'Alta',
  },
  capital: {
    politica: 'Dividendo trimestral de 0,27 USD (subido un 4 % en abril de 2026) con la intención de subirlo cada año [A2, A4]. Recompras: programa de 100.000 M de mayo de 2025 (quedaban 38.000 M en junio de 2026) y otro de 100.000 M aprobado el 30-abr-2026 [A2]. En nueve meses de FY2026 recompró 215 M de acciones por 61.800 M [A2]. Objetivo declarado: llegar a una posición neutral de caja neta con el tiempo.',
    adquisiciones: [],
    comentario: 'Asignación de capital disciplinada: en ocho años (FY2018-FY2025) Apple ha recomprado unos 650.000 M USD y ha reducido las acciones diluidas de 20.000 a 15.005 M (−3,5 % anual) [A7]; casi no compra empresas (la mayor, Beats por 3.000 M en 2014) y desarrolla dentro (chips propios desde el M1 y el módem C1). La pregunta es el precio de las recompras: a 36 veces el beneficio, cada dólar recomprado rinde un 2,8 %, menos que el bono del Tesoro a 10 años (5,12 %). La dirección no ha dicho que vaya a frenar las recompras con el precio alto.',
    confianza: 'Alta',
  },
  negocio: {
    descripcion: 'Apple diseña y vende teléfonos (iPhone), ordenadores (Mac), tabletas (iPad), relojes, auriculares y accesorios, y cobra por los servicios que funcionan sobre esos aparatos (App Store, iCloud, publicidad, AppleCare, pagos y vídeo y música) [1]. En el ejercicio 2025 (cerrado el 27-sep-2025) vendió 416.161 M USD: iPhone 50 %, Servicios 26 %, Wearables 9 %, Mac 8 % e iPad 7 % [1]. No fabrica: diseña los chips (serie A y M, módem C1) y encarga el montaje a terceros, sobre todo en China e India [1]. La base instalada supera los 2.500 millones de aparatos activos [5].',
    como_gana_dinero: 'Gana dos veces con cada cliente: al vender el aparato (margen bruto de Productos del 36,8 % en FY2025) y después con los servicios que usa ese aparato (margen bruto del 75,4 %) [1]. Servicios es el 26 % de las ventas pero ≈ 42 % del beneficio bruto, y crece al 13-14 % anual [1, 2]. Dentro de Servicios, la publicidad incluye lo que Google paga por ser el buscador por defecto de Safari y la App Store cobra una comisión de hasta el 30 % a los desarrolladores; las dos están en litigio [1, 2]. El iPhone es la puerta de entrada: su ciclo de renovación arrastra a Servicios, Wearables y Mac.',
    clientes: 'Clientes muy repartidos: ningún cliente llega al 10 % de las ventas; vende directamente (tiendas propias y web) y a través de operadoras, mayoristas y distribuidores [1]. Poder de precios alto en la gama alta: el iPhone tiene ≈ 20 % de las unidades del mercado mundial y una parte mucho mayor de los ingresos [1]. La dependencia está en los proveedores: un puñado de fabricantes por contrato (Foxconn y otros) en China e India y proveedores únicos de algunos componentes, entre ellos la memoria, cuyo precio sube [1, 2].',
    confianza: 'Alta',
    segmentos: [
      ['iPhone', 'Teléfonos con iOS (iPhone 17, 17 Pro, Air, 17e y, desde el otoño de 2026, la gama nueva). Fabricados por terceros sobre todo en China e India.', [191973, 205489, 200583, 201183, 209586]],
      ['Mac', 'Ordenadores portátiles y de sobremesa con chips propios (M5, MacBook Neo).', [35190, 40177, 29357, 29984, 33708]],
      ['iPad', 'Tabletas.', [31862, 29292, 28300, 26694, 28023]],
      ['Wearables, Home and Accessories', 'Apple Watch, AirPods, Beats, Vision Pro, Apple TV, HomePod y accesorios.', [38367, 41241, 39845, 37005, 35686]],
      ['Servicios', 'Publicidad (incluido el acuerdo de búsqueda con Google), App Store, iCloud, AppleCare, Apple Music, Apple TV+, Apple Pay y otros.', [68425, 78129, 85200, 96169, 109158]],
    ].map(([nombre, descripcion, v]) => ({ nombre, descripcion, tipo_resultado: null, historico: ['FY2021', 'FY2022', 'FY2023', 'FY2024', 'FY2025'].map((p, i) => ({ periodo: p, ingresos: v[i], resultado: null })) })),
    geografias: [
      { nombre: 'Américas', peso_pct: 42.9 }, { nombre: 'Europa (con India, Oriente Medio y África)', peso_pct: 26.7 },
      { nombre: 'Gran China', peso_pct: 15.5 }, { nombre: 'Japón', peso_pct: 6.9 }, { nombre: 'Resto de Asia-Pacífico', peso_pct: 8.1 },
    ],
    geografias_criterio: 'destino',
    kpis: [
      { kpi: 'Dispositivos activos (base instalada)', valor_anterior: '> 2.350 M (ene-2025)', valor_actual: '> 2.500 M (ene-2026)', variacion: '+6 %', comentario: 'Récord en todas las categorías y regiones en el 3T26 [A3, A5].' },
      { kpi: 'Suscripciones de pago', valor_anterior: 'n.d.', valor_actual: '> 1.500 M (jul-2026)', variacion: 'n.d.', comentario: 'Dicho en la conferencia del 3T26 [A9].' },
      { kpi: 'Ventas de Servicios', valor_anterior: '96.169 M (FY2024)', valor_actual: '109.158 M (FY2025)', variacion: '+13,5 %', comentario: '9M FY2026: +14 % [A1, A2].' },
      { kpi: 'Margen bruto de Servicios', valor_anterior: '73,9 %', valor_actual: '75,4 %', variacion: '+1,5 pp', comentario: '76,3 % en 9M FY2026 [A1, A2].' },
      { kpi: 'Margen bruto de Productos', valor_anterior: '37,2 %', valor_actual: '36,8 %', variacion: '−0,4 pp', comentario: '39,9 % en 9M FY2026 con reembolsos de aranceles; la memoria empuja a la baja [A1, A2].' },
      { kpi: 'Ventas del iPhone', valor_anterior: '201.183 M', valor_actual: '209.586 M', variacion: '+4,2 %', comentario: '9M FY2026: 196.515 M, +22 % [A1, A2].' },
    ],
  },
  huecos: [],
  fuentes: fA,
};
guarda('A', A);

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Form 10-K del ejercicio 2025: negocio, competencia, fabricación, riesgos', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2025-10-31', url: `${ED}/000032019325000079/aapl-20250927.htm` },
  { id: 2, titulo: 'Apple leads global smartphone market with 20% share in 2025, says Counterpoint', editor: 'Deccan Chronicle (Reuters)', tipo: 'Sectorial', fecha: '2026-01-12', url: 'https://www.deccanchronicle.com/technology/apple-leads-global-smartphone-market-with-20-share-in-2025-says-counterpoint-1929963' },
  { id: 3, titulo: 'IDC: Smartphone shipments up 2.3% in Q4 2025, Apple is the clear winner (Apple 247,8 M de unidades y 19,7 % en 2025)', editor: 'GSMArena (IDC)', tipo: 'Sectorial', fecha: '2026-01-13', url: 'https://m.gsmarena.com/idc_smartphone_shipments_up_23_in_q4_2025_apple_is_the_clear_winner_-news-71096.php' },
  { id: 4, titulo: 'Apple led the global smartphone market in terms of revenue in Q3 2025 (Counterpoint: 43 % de los ingresos; 112.000 M USD del mercado)', editor: 'MacTech (Counterpoint Research)', tipo: 'Sectorial', fecha: '2025-10-31', url: 'https://www.mactech.com/2025/10/31/apple-led-the-global-smartphone-market-in-the-third-quarter-in-terms-of-revenue/amp/' },
  { id: 5, titulo: 'Global smartphone revenue Q4 2025: record 143.000 M USD (+13 %)', editor: 'Digitimes (Counterpoint Research)', tipo: 'Sectorial', fecha: '2026-01-14', url: 'https://www.digitimes.com/news/a20260114PD203.html?chid=12' },
  { id: 6, titulo: 'Form 10-Q del 3T FY2026: DMA, Epic, Google, aranceles, memoria', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000032019326000020/aapl-20260627.htm` },
  { id: 7, titulo: 'Smartphone market suffers record 22% Y/Y slump; Chinese players take biggest hit', editor: 'Seeking Alpha (noticias)', tipo: 'Prensa', fecha: '2026-10-15', url: 'https://seekingalpha.com/symbol/AAPL/news' },
  { id: 8, titulo: 'Datos de mercado de Samsung, Xiaomi, Alphabet, Microsoft y otros (márgenes y ventas)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/AAPL' },
  { id: 9, titulo: 'Google will power Apple\'s next Siri with Gemini AI in multi-year deal', editor: 'Gulf News', tipo: 'Prensa', fecha: '2026-01-12', url: 'https://gulfnews.com/technology/media/google-will-power-apples-next-siri-with-gemini-ai-in-multiyear-deal-1.500406234' },
];
const B_ = {
  _estado: 'Completa con lo esencial. Tamaño del mercado de smartphones en valor: suma propia de los trimestres de Counterpoint de 2025 (Q1 sin cifra en dólares: estimado). Competidores con datos de Yahoo y cuentas.',
  historia: {
    resumen: 'Apple nace en 1976 en Cupertino (Steve Jobs, Steve Wozniak y Ronald Wayne) y sale a bolsa en 1980. Tras perder el rumbo en los noventa, la vuelta de Jobs (1997) trae el iMac, el iPod (2001), iTunes, el iPhone (2007), la App Store (2008) y el iPad (2010) [B1]. Tim Cook le sucede en 2011 y convierte a la empresa en una máquina de caja: Servicios, Apple Watch, AirPods, chips propios (M1, 2020) y un programa de recompras sin precedente. En 2026 Cook pasa a presidente ejecutivo y John Ternus, jefe de ingeniería de hardware, es consejero delegado desde el 1-sep-2026; el mismo año Apple elige a Google Gemini como base de su nueva Siri [B9].',
    hitos: [
      { anio: '1976', hito: 'Fundación en Cupertino; Apple I.' }, { anio: '1984', hito: 'Macintosh.' }, { anio: '1997', hito: 'Vuelta de Steve Jobs tras la compra de NeXT.' },
      { anio: '2001', hito: 'iPod y primeras Apple Store.' }, { anio: '2007', hito: 'iPhone.' }, { anio: '2008', hito: 'App Store.' },
      { anio: '2011', hito: 'Tim Cook, consejero delegado.' }, { anio: '2014', hito: 'Compra de Beats (3.000 M USD) y Apple Pay.' },
      { anio: '2020', hito: 'Chip M1 propio en el Mac; desdoblamiento 4:1.' }, { anio: '2024', hito: 'Apple Intelligence; Tribunal de la UE confirma 13.000 M EUR de ayudas de Estado.' },
      { anio: '2026', hito: 'Acuerdo con Google para Gemini en Siri (enero); John Ternus consejero delegado (septiembre).' },
    ],
    confianza: 'Media',
  },
  sector: {
    definicion: 'El mercado relevante es el de los smartphones en valor (lo que pagan los consumidores por los teléfonos), donde está el 50 % de las ventas de Apple y casi todo su beneficio de productos; Servicios vive de la base instalada que crea ese teléfono. Perímetro mundial. Se usa Counterpoint (ingresos trimestrales del mercado) y, para unidades, Counterpoint e IDC [B2-B5]. Apple compite además en ordenadores personales (≈ 8 % de sus ventas), tabletas, relojes y auriculares, y en servicios digitales, cada uno con su mercado.',
    tamano: '≈ 460.000 M USD en 2025 (estimación propia: 2T > 100.000, 3T ≈ 112.000 y 4T 143.000 M de Counterpoint, más un 1T de ≈ 105.000) [B4, B5]',
    unidad_serie: 'millones de USD',
    serie: [{ anio: '2025', tamano: 460000 }],
    tcac_historico_pct: null, tcac_previsto_pct: 3.0,
    cr5_pct: 70.0, estructura: 'Concentrada',
    drivers: [
      { driver: 'Precio medio al alza (gama alta)', efecto: '+', horizonte: 'Estructural', evidencia: 'El precio medio del mercado superó por primera vez los 400 USD en el 4T25 (Counterpoint) [B5].' },
      { driver: 'Unidades estancadas', efecto: '−', horizonte: 'Estructural', evidencia: 'Envíos mundiales +2 % en 2025 [B2]; ciclos de renovación de 3-4 años.' },
      { driver: 'Memoria cara y escasa (centros de datos de IA)', efecto: '−', horizonte: 'Cíclico', evidencia: 'Mercado −22 % interanual en el 3T26 según los primeros datos; los fabricantes chinos, los más golpeados [B7, B6].' },
      { driver: 'IA en el dispositivo como motivo de renovación', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Siri AI con Gemini desde 2026 [B9]; sin datos aún de efecto en la renovación.' },
      { driver: 'Aranceles y relocalización de la fabricación', efecto: '−', horizonte: 'Cíclico', evidencia: 'Aranceles de 2025, IEEPA anulados en feb-2026; nuevas medidas de la sección 301 y 232 [B6].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Samsung y los chinos (Xiaomi, Huawei, Oppo, Vivo) compiten en precio; en la gama alta (> 800 USD) Apple tiene más de la mitad del mercado y solo Samsung y Huawei le disputan.' },
      { fuerza: 'Poder de los clientes', intensidad: 2, justificacion: 'Consumidores dispersos; las operadoras pesan (27 % de las cuentas a cobrar) pero no fijan el precio del iPhone [B6].' },
      { fuerza: 'Poder de los proveedores', intensidad: 4, justificacion: 'TSMC (chips avanzados) y los tres fabricantes de memoria tienen poder hoy: la memoria recortó la guía del 4T26 [B6].' },
      { fuerza: 'Amenaza de entrada', intensidad: 1, justificacion: 'Escala, sistema operativo y canal mundial: nadie ha entrado con éxito en la gama alta en diez años.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 2, justificacion: 'Dispositivos de IA (gafas, nuevos aparatos de OpenAI) aún sin volumen; el teléfono sigue siendo el centro.' },
    ],
    ciclo: { posicion: 'Madurez del ciclo', comentario: 'El mercado de smartphones es maduro (envíos +2 % en 2025) y en 2026 lo frena la escasez de memoria (−22 % interanual en el 3T26) [B2, B7]. Apple se ha comportado como defensiva: ventas −2 % en FY2023 y casi planas en FY2024, sin pérdida de margen; en 2020 subió por la demanda de la pandemia y en 2008-09 siguió creciendo [B1]. El ciclo del iPhone 17 (FY2026, +22 % en 9M) es el más fuerte desde el 5G.' },
    regulacion: 'La Ley de Mercados Digitales de la UE (DMA) obliga a permitir tiendas y pagos alternativos; multa de 500 M EUR en abril de 2025 y una investigación abierta que puede llegar al 10 % de las ventas mundiales [B6]. En EE. UU., la orden del caso Epic (2025) prohíbe cobrar comisión por las compras fuera de la app; el Supremo revisará el desacato tras aceptar el recurso el 30-jun-2026 [B6]. El acuerdo de búsqueda con Google depende de la apelación del caso antimonopolio de búsqueda (el Gobierno pide prohibir los pagos). Japón (ley de smartphones de 2025) y el Reino Unido (CMA) van en la misma línea.',
    tendencias: 'IA generativa: Apple va por detrás de Google, OpenAI y Samsung y ha optado por licenciar Gemini en vez de construir un modelo de frontera [B9]; si Siri AI funciona, puede adelantar renovaciones (la base de 2.500 M de dispositivos es la mayor ventaja). Nuevos formatos (plegables: la gama de 2026 incluye un modelo «Duo», según la prensa) suben el precio medio. Fabricación: India gana peso frente a China. Riesgo: que la interfaz pase del teléfono a un asistente de IA de terceros.',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: 43.0,
    posicion: '1.º mundial en smartphones por ingresos (≈ 43 % del valor del mercado en el 2T y el 3T de 2025, Counterpoint) y por unidades en 2025 (≈ 20 %, por delante de Samsung) [B2-B4]; 4.º en ordenadores personales por unidades; 1.º en tabletas y relojes inteligentes.',
    competidores: [
      { nombre: 'Samsung Electronics', pais: 'Corea del Sur', ticker: '005930.KS', ingresos: null, cuota_pct: 19.0, margen_ebit_pct: null, comentario: '2.º en unidades (19 % en 2025); Android, plegables; también fabricante de memoria (gana con la escasez) [B2].' },
      { nombre: 'Xiaomi', pais: 'China', ticker: '1810.HK', ingresos: null, cuota_pct: 13.0, margen_ebit_pct: null, comentario: '3.º en unidades (13 %), gama media y baja; también coches eléctricos [B2].' },
      { nombre: 'Huawei', pais: 'China', ticker: null, ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Rival principal en la gama alta china con HarmonyOS y chips propios; no cotiza.' },
      { nombre: 'Alphabet (Google)', pais: 'EE. UU.', ticker: 'GOOGL', ingresos: 445900, cuota_pct: null, margen_ebit_pct: null, comentario: 'Android y Pixel; a la vez socio (búsqueda, Gemini) y rival en IA [B8, B9].' },
      { nombre: 'Microsoft', pais: 'EE. UU.', ticker: 'MSFT', ingresos: 331800, cuota_pct: null, margen_ebit_pct: null, comentario: 'Windows frente al Mac; Copilot frente a Apple Intelligence [B8].' },
    ],
    foso: {
      veredicto: 'Amplio', tendencia: 'Estable',
      fuentes: [
        { fuente: 'Efectos de red', puntuacion: 4, evidencia: 'App Store y base instalada de 2.500 M de dispositivos: los desarrolladores lanzan primero en iOS porque ahí está el gasto [B1].' },
        { fuente: 'Costes de cambio', puntuacion: 5, evidencia: 'iMessage, iCloud, fotos, Watch y AirPods atan al usuario; la fidelidad del iPhone supera el 90 % según encuestas (sin fuente primaria).' },
        { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 5, evidencia: '≈ 43 % de los ingresos del mercado con ≈ 20 % de las unidades: la marca permite cobrar el doble del precio medio [B2, B4].' },
        { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Chips propios y compras a escala; pero depende de TSMC y de la memoria, que hoy le cuesta más [B6].' },
        { fuente: 'Escala eficiente', puntuacion: 3, evidencia: 'Margen operativo del 32 % frente al 6 % de Xiaomi y al 8-12 % de Dell y HP [B8].' },
      ],
    },
    amenazas: 'Las tres amenazas reales son regulatorias y tecnológicas, no de rivales directos. (1) La regulación de la App Store (DMA, Epic, Japón) erosiona la comisión del 15-30 % que sostiene el margen de Servicios; probabilidad alta de erosión lenta, baja de golpe brusco. (2) La sentencia contra Google puede acabar con ≈ 20.000 M USD anuales de pagos casi sin coste (≈ 15 % del beneficio operativo); probabilidad media-baja tras la decisión del juez Mehta de 2025, pendiente de apelación. (3) Si la IA mueve la relación con el usuario a un asistente que no es de Apple, el iPhone se vuelve un aparato más; probabilidad baja a cinco años, alta incertidumbre [B6, B9].',
    confianza: 'Media',
  },
  esg: {
    calificaciones: [],
    materialidad: 'Lo material para las cifras es la cadena de suministro: casi todo el ensamblaje lo hacen terceros en Asia, sobre todo en China e India [B1], con riesgo laboral (auditorías a proveedores) y geopolítico. Segundo, privacidad: es parte de la propuesta de valor y condiciona cómo despliega la IA (Private Cloud Compute). Tercero, emisiones: objetivo de neutralidad en carbono en toda la cadena para 2030; la mayor parte de la huella está en la fabricación de terceros.',
    controversias: 'Multa de 500 M EUR de la Comisión Europea por la DMA (abril de 2025, recurrida) [B6]; condena por desacato en el caso Epic (abril de 2025), en revisión en el Supremo [B6]; 13.000 M EUR de ayudas de Estado devueltos a Irlanda (2024) [B1]; condena de 5.722 M USD por patentes (Taction, septiembre de 2026, recurrida).',
    confianza: 'Media',
  },
  huecos: [
    { seccion: 'esg', campo: 'calificaciones', tipo: 'Complemento', intentos: '1) Informe de sostenibilidad de Apple (no publica calificaciones de terceros); 2) páginas públicas de MSCI y Sustainalytics (requieren registro o no abren); 3) prensa: sin una calificación fechada fiable', decision: 'Omitido' },
    { seccion: 'sector', campo: 'tcac_historico_pct', tipo: 'Complemento', intentos: '1) Counterpoint: solo trimestres sueltos en abierto; 2) IDC: solo unidades; 3) estimación: sin serie de cinco años en valor', decision: 'Omitido' },
  ],
  fuentes: fB,
};
guarda('B', B_);

// ---------------------------------------------------------------- C. Equipo y gobierno
const f4 = lee('form4.json');
const ventas = (f4.operaciones || []).filter((o) => o.codigo === 'S');
const porPersonaFecha = {};
for (const o of ventas) { const k = `${o.fecha}|${o.persona}`; porPersonaFecha[k] = porPersonaFecha[k] || { fecha: o.fecha, persona: o.persona, acciones: 0, importe: 0 }; porPersonaFecha[k].acciones += o.acciones; porPersonaFecha[k].importe += o.importe; }
const insiders = Object.values(porPersonaFecha).filter((x) => x.importe > 1e6).sort((a, b) => (a.fecha < b.fecha ? 1 : -1)).slice(0, 14)
  .map((x) => ({ fecha: x.fecha, persona: x.persona, operacion: 'Venta', acciones: x.acciones, importe: r2(x.importe / 1e6) }));
const fC = [
  { id: 1, titulo: 'Proxy statement 2026 (DEF 14A): consejo, comisiones, remuneración, accionistas', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-08', url: `${ED}/000130817926000008/aapl014016-def14a.htm` },
  { id: 2, titulo: 'Form 8-K: Tim Cook pasa a presidente ejecutivo y John Ternus es consejero delegado desde el 1-sep-2026', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-04-20', url: `${ED}/000114036126015711/ef20071035_8k.htm` },
  { id: 3, titulo: 'Form 8-K: resultados de la junta de 2026 (votos)', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-02-24', url: `${ED}/000114036126006577/ef20060722_8k.htm` },
  { id: 4, titulo: 'Form 8-K: resultados de la junta de 2025 (votos)', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2025-02-25', url: `${ED}/000114036125005876/ef20044022_8k.htm` },
  { id: 5, titulo: 'Form 8-K: Jennifer Newstead, nueva directora jurídica', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2025-12-05', url: `${ED}/000114036125044561/ef20060722_8k.htm` },
  { id: 6, titulo: 'Form 8-K: Ben Borders, nuevo responsable de contabilidad', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-01-02', url: `${ED}/000114036126000199/ef20060722_8k.htm` },
  { id: 7, titulo: 'Forms 4 de Apple (21-oct-2025 a 21-oct-2026)', editor: 'SEC EDGAR (herramientas/form4.mjs)', tipo: 'Primaria', fecha: '2026-10-21', url: 'https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000320193&type=4' },
  { id: 8, titulo: 'Notas de resultados de Apple FY2021-FY2026 (guía trimestral frente a lo real)', editor: 'Apple Inc. (SEC, 8-K)', tipo: 'Primaria', fecha: '2026-07-30', url: `${ED}/000032019326000018/a8-kex991q3202606272026.htm` },
  { id: 9, titulo: 'Apple (AAPL) Q3 2026 earnings call transcript', editor: 'Webull News (transcripción)', tipo: 'Prensa', fecha: '2026-07-30', url: 'https://www.webull.com/news/15364638775387136' },
];
const C = {
  _estado: 'Completa. Consejo y comisiones del proxy 2026 (antes de la entrada de Ternus); votos de 2025 y 2026; Form 4 de 12 meses.',
  directivos: {
    equipo: [
      { nombre: 'John Ternus', cargo: 'Consejero delegado (desde el 1-sep-2026)', desde: '2026', participacion_pct: 0.00, trayectoria: 'En Apple desde 2001; vicepresidente sénior de ingeniería de hardware desde 2021 (iPhone, iPad, Mac con chips propios, AirPods). Primer consejero delegado de producto desde Jobs [C2].' },
      { nombre: 'Tim Cook', cargo: 'Presidente ejecutivo (desde el 1-sep-2026); consejero delegado 2011-2026', desde: '2011', participacion_pct: 0.02, trayectoria: 'Con él, las ventas pasaron de 108.000 a 416.000 M USD (FY2011-FY2025) y Servicios a más de 100.000 M; la capitalización superó los 5 billones [C1, C2].' },
      { nombre: 'Kevan Parekh', cargo: 'Director financiero', desde: '2025', participacion_pct: 0.00, trayectoria: 'En Apple desde 2013; antes vicepresidente de planificación y análisis financiero; sustituyó a Luca Maestri el 1-ene-2025 [C1].' },
      { nombre: 'Art Levinson', cargo: 'Consejero independiente coordinador (presidente del consejo hasta el 1-sep-2026)', desde: '2000', participacion_pct: 0.03, trayectoria: 'Expresidente y consejero delegado de Genentech; en el consejo desde 2000 [C1].' },
      { nombre: 'Sabih Khan', cargo: 'Director de operaciones', desde: '2025', participacion_pct: 0.01, trayectoria: 'Responsable de la cadena de suministro y la diversificación hacia India [C1].' },
      { nombre: 'Jennifer Newstead', cargo: 'Directora jurídica y de asuntos públicos', desde: '2026', participacion_pct: 0.00, trayectoria: 'Exdirectora jurídica de Meta; entra en marzo de 2026 en plena lucha regulatoria (DMA, Epic, Google) [C5].' },
    ],
    historial_guidance: [
      { anio: '1T FY2026', guia: 'Ventas +10-12 % (dada en oct-2025)', real: '+15,7 %', cumplida: 'Sí' },
      { anio: '2T FY2026', guia: 'Ventas de doble dígito', real: '+16,6 %', cumplida: 'Sí' },
      { anio: '3T FY2026', guia: 'Ventas +14-17 %; margen bruto 47,5-48,5 %', real: '+16,4 %; 50,1 % (≈ 48,1 % sin reembolsos de aranceles)', cumplida: 'Sí' },
      { anio: 'FY2025', guia: 'Guía trimestral de crecimiento bajo o medio de un dígito', real: 'Ventas +6,4 %', cumplida: 'Sí' },
    ],
    comentario: 'Apple solo da guía de un trimestre y casi siempre la cumple o la supera: ninguna de las cuatro guías de 2026 se ha quedado corta [C8, C9]. La sucesión ha sido ordenada: se anunció en abril con cuatro meses y medio de antelación y Cook sigue como presidente ejecutivo, lo que da continuidad pero deja dudas sobre quién manda. El equipo cambió mucho en 18 meses (director financiero, director de operaciones, directora jurídica, responsable de contabilidad y consejero delegado) [C2, C5, C6]. Ternus viene del hardware: el reto que hereda es la IA, donde Apple va por detrás.',
    confianza: 'Alta',
  },
  gobierno: {
    consejo: [
      { nombre: 'Tim Cook', cargo: 'Presidente ejecutivo', tipo: 'Ejecutivo', desde: '2011', comisiones: '—' },
      { nombre: 'John Ternus', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2026', comisiones: '—' },
      { nombre: 'Art Levinson', cargo: 'Consejero independiente coordinador', tipo: 'Independiente', desde: '2000', comisiones: 'Personas y Remuneración' },
      { nombre: 'Wanda Austin', cargo: 'Consejera', tipo: 'Independiente', desde: '2024', comisiones: 'Auditoría y Finanzas' },
      { nombre: 'Alex Gorsky', cargo: 'Consejero', tipo: 'Independiente', desde: '2021', comisiones: 'Nombramientos; Personas y Remuneración' },
      { nombre: 'Andrea Jung', cargo: 'Consejera', tipo: 'Independiente', desde: '2008', comisiones: 'Nombramientos; Personas y Remuneración (presidenta)' },
      { nombre: 'Monica Lozano', cargo: 'Consejera', tipo: 'Independiente', desde: '2021', comisiones: 'Auditoría y Finanzas' },
      { nombre: 'Ron Sugar', cargo: 'Consejero', tipo: 'Independiente', desde: '2010', comisiones: 'Auditoría y Finanzas (presidente)' },
      { nombre: 'Sue Wagner', cargo: 'Consejera', tipo: 'Independiente', desde: '2014', comisiones: 'Nombramientos' },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: true, consejero_coordinador: true, una_accion_un_voto: true,
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: false, presidente_vinculado_control: false, cambios_cupula_24m: 1,
    voto_remuneracion_pct: 90.9, voto_remuneracion_contra_pct: 8.6, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: { anio: 'FY2025', total: 74.29, fijo: 3.00, variable_corto: 12.00, variable_largo: 57.54, ratio_salario_medio: 533 },
    remuneracion: 'El consejero delegado cobra un fijo de 3 M USD, un variable anual en efectivo (hasta 4 veces el fijo) ligado a ventas y beneficio operativo (en FY2025 se pagó el máximo, 12 M, con ventas de 416.200 M y beneficio operativo de 133.100 M) y acciones: la mitad por tiempo y la mitad por rentabilidad total para el accionista relativa al S&P 500 (máximo al percentil 85; tope del 100 % si el retorno es negativo) [C1]. El TSR relativo del último periodo quedó en el percentil 81,2 [C1]. Hay cláusulas de recuperación (obligatoria y discrecional). Ratio con el empleado mediano: 533 a 1 [C1]. Aprobación del voto consultivo: 90,9 % en 2026 y 91,9 % en 2025 [C3, C4].',
    accionistas: [
      { nombre: 'The Vanguard Group', pct: 9.63, tipo: 'Institucional (índices)', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 7.10, tipo: 'Institucional (índices)', variacion: 'Estable' },
      { nombre: 'Consejeros y directivos (12 personas)', pct: 0.06, tipo: 'Insiders', variacion: 'Ventas netas por vencimiento de acciones' },
    ],
    insiders,
    control_y_defensas: 'Sin accionista de control: los dos mayores son gestoras de índices (9,63 % y 7,10 %) [C1]. Una acción, un voto; consejo elegido cada año por mayoría; derecho de acceso de accionistas a la convocatoria (proxy access). Sin blindajes relevantes. Desde el 1-sep-2026 el presidente es ejecutivo (Cook) y hay un consejero independiente coordinador (Levinson), que antes era presidente independiente [C2]: un paso atrás formal en la separación de funciones. Levinson tiene 26 años en el consejo y es el consejero con más votos en contra (9 % en 2026) [C3].',
    alertas: [
      'Presidente ejecutivo (Tim Cook) desde el 1-sep-2026: se pierde el presidente independiente [C2].',
      'Rotación alta de la cúpula en 18 meses: director financiero (2025), director de operaciones (2025), directora jurídica (2026), responsable de contabilidad (2026) y consejero delegado (2026) [C2, C5, C6].',
      'Ventas de directivos de 207 M USD en 12 meses sin ninguna compra; la mayor, de Art Levinson (86,7 M en mayo de 2026, sin plan 10b5-1) [C7].',
    ],
    confianza: 'Alta',
  },
  huecos: [],
  fuentes: fC,
};
guarda('C', C);

// ---------------------------------------------------------------- D. Mercado y valoración
const a = Y.AAPL;
const tr = Object.fromEntries(a.trend.map((x) => [x.periodo, x]));
const fD = [
  { id: 1, titulo: 'Históricos diarios de AAPL, SPY y XLK (herramientas/bolsa.mjs)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-20', url: 'https://finance.yahoo.com/quote/AAPL/history' },
  { id: 2, titulo: 'Apple y comparables: precio, capitalización, valor empresa, consenso de BPA y ventas, recomendaciones y cambios de 12 meses (quoteSummary)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-21', url: 'https://finance.yahoo.com/quote/AAPL/analysis' },
  { id: 3, titulo: 'Apple Inc.: estimaciones anuales FY2026-FY2028 (ventas, EBITDA, EBIT, beneficio, BPA, dividendo, caja neta)', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-21', url: 'https://www.marketscreener.com/quote/stock/APPLE-INC-4849/finances/' },
  { id: 4, titulo: 'Daily Treasury Par Yield Curve Rates 2026 (10 años: 5,12 % el 20-oct-2026)', editor: 'U.S. Department of the Treasury', tipo: 'Primaria', fecha: '2026-10-20', url: 'https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value=2026' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx): octubre de 2026, 4,20 % (T12m with sustainable payout)', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Form 10-Q del 3T FY2026 (acciones en circulación a 17-jul-2026: 14.594 M; puente)', editor: 'Apple Inc. (SEC)', tipo: 'Primaria', fecha: '2026-07-31', url: `${ED}/000032019326000020/aapl-20260627.htm` },
  { id: 7, titulo: 'Apple to Announce Fiscal Q4 2026 Earnings on November 2', editor: 'MacTrast', tipo: 'Prensa', fecha: '2026-10-07', url: 'https://www.mactrast.com/2026/10/apple-to-announce-fiscal-q4-2026-earnings-on-november-2/' },
];
const comps = ['MSFT', 'GOOGL', 'META', 'AMZN', 'DELL', 'HPQ', 'LOGI', 'QCOM'];
const nombres = { MSFT: 'Microsoft', GOOGL: 'Alphabet', META: 'Meta Platforms', AMZN: 'Amazon', DELL: 'Dell Technologies', HPQ: 'HP Inc.', LOGI: 'Logitech', QCOM: 'Qualcomm' };
// meses que quedan del ejercicio en curso a 21-oct-2026, para el crecimiento NTM / LTM
const corte = new Date('2026-10-21');
const empresas = comps.map((t) => {
  const c = Y[t]; const T = Object.fromEntries(c.trend.map((x) => [x.periodo, x]));
  const fin0 = new Date(T['0y'].fin); const m = Math.max(0, Math.min(12, (fin0 - corte) / (30.44 * 864e5)));
  const ntm = (T['0y'].ventas * m + T['+1y'].ventas * (12 - m)) / 12;
  return {
    nombre: nombres[t], ticker: t, pais: t === 'LOGI' ? 'CH' : 'US', capitalizacion: Math.round(c.cap / 1e6), ev_ventas: r2(c.ev_ventas), ev_ebitda_ltm: r1(c.ev_ebitda), ev_ebitda_ntm: r1(c.ev / (c.ebitda * ntm / c.ventas)),
    per_ntm: r1(c.per_adelantado), crecimiento_pct: r1((ntm / c.ventas - 1) * 100), margen_ebitda_pct: r1(c.margen_ebitda * 100), roic_pct: null,
    dn_ebitda: r1((c.deuda - c.caja) / c.ebitda), fcf_yield_pct: c.fcf ? r1(c.fcf / c.cap * 100) : null,
  };
});
const pers = empresas.map((e) => e.per_ntm).sort((x, y) => x - y);
const medPer = r1((pers[3] + pers[4]) / 2);
const cierres = B.cierres_ejercicio.filter((c) => ANIOS.includes(c.anio) || c.anio === 'FY2026');
const D = {
  _estado: 'Completa. Precio = cierre del 20-oct-2026 (la sesión del 21-oct estaba abierta al hacer el análisis). Consenso de Yahoo (BPA y ventas FY2026-FY2027) y MarketScreener (FY2026-FY2028). Comparables de EE. UU. de Yahoo del 21-oct (PER = precio ÷ BPA del próximo ejercicio).',
  _per_mediana_comparables: medPer,
  identificacion: {
    nombre: 'Apple Inc.', nombre_corto: 'Apple', ticker: 'AAPL', isin: 'US0378331005', mercado: 'Nasdaq Global Select Market', indice_referencia: 'S&P 500',
    pais: 'Estados Unidos', pais_iso: 'US', sector: 'Tecnologías de la información', industria: 'Hardware, almacenamiento y periféricos (teléfonos y ordenadores)', sede: 'Cupertino (California)', fundacion: '1976', empleados: 166000, web: 'https://www.apple.com',
    precio: B.identificacion.precio, fecha_precio: B.identificacion.fecha_precio, acciones: 14652, capitalizacion_publicada: Math.round(a.cap / 1e6), free_float_pct: 99.9,
    max_52s: B.identificacion.max_52s, min_52s: B.identificacion.min_52s, volumen_medio_diario: `≈ ${Math.round(B.volumen_3m.importe_dia_millones / 100) / 10} mil M USD/día (3 meses)`.replace('.', ','), proximos_resultados: '2026-11-02',
  },
  consenso: {
    guidance: 'Apple solo da guía del trimestre siguiente. Para el 4T del ejercicio 2026 (julio-septiembre de 2026), dada el 30-jul-2026: ventas +9-11 % interanual (efecto divisa de −2,5 puntos y restricciones de suministro de memoria «significativamente mayores»), iPhone +15 % aproximadamente, margen bruto del 47-48 % con ≈ 1 punto de reembolsos de aranceles, gastos operativos de 19.100-19.400 M USD, otros ingresos de ≈ 350 M y tipo fiscal del 16,5 % [D2]. Sin objetivos a medio plazo. Los resultados del 4T y la guía del 1T FY2027 se publican el 2-nov-2026 [D7].',
    estimaciones: [
      { periodo: 'FY2026e', ingresos: 477621, ebitda: 169461, ebit: 156398, bpa: 8.82, dpa: 1.07, fuente: 'MarketScreener (44 analistas) y Yahoo (39 analistas: BPA 8,82; ventas 477.627) [D3, D2]' },
      { periodo: 'FY2027e', ingresos: 527258, ebitda: 179915, ebit: 166619, bpa: 9.56, dpa: 1.11, fuente: 'MarketScreener y Yahoo (40 analistas: BPA 9,56; ventas 527.288) [D3, D2]' },
      { periodo: 'FY2028e', ingresos: 572157, ebitda: 198922, ebit: 186347, bpa: 10.81, dpa: 1.17, fuente: 'MarketScreener [D3]' },
    ],
    recomendaciones: { n_analistas: 44, comprar: 24, mantener: 14, vender: 6, po_medio: r2(a.po_medio), po_min: a.po_min, po_max: a.po_max },
    revisiones: 'Tras la guía del 30-jul-2026 el consenso recortó el BPA de FY2027 de 9,71 USD (hace 90 días) a 9,56 (−1,5 %), por la memoria y las restricciones de suministro; el de FY2026 subió de 8,77 a 8,82 por los reembolsos de aranceles [D2]. El del 1T FY2027 bajó de 2,97 a 2,90. Los objetivos de precio se mueven en los dos sentidos: Loop Capital bajó a Mantener (370 → 330) y MoffettNathanson recortó a 283 el 20-oct; JP Morgan subió a 360 el 12-oct y Evercore a 380 en septiembre [D2]. El objetivo medio (328,35 USD) está un 3 % por debajo del precio. Estimaciones a tres años solo de MarketScreener; contrastadas en ventas y BPA de FY2026-FY2027 con Yahoo (diferencias de menos del 0,1 %).',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Alta',
  },
  bolsa: {
    tipo_rentabilidad: B.bolsa.tipo_rentabilidad,
    rentabilidades: B.bolsa.rentabilidades,
    anual: B.bolsa.anual,
    beta: B.bolsa.beta, volatilidad_pct: B.bolsa.volatilidad_pct, max_drawdown_pct: B.bolsa.max_drawdown_pct, posicion_corta_pct: r2(a.corto_pct * 100),
    comentario: 'Apple sube un 25,2 % en 2026 (total, con dividendos) frente al 13,7 % del S&P 500 y el 29,3 % del sector tecnológico (XLK) [D1]. A diez años ha rendido un 28,9 % anual, el doble que el índice. El año ha tenido tres fases: caída hasta el mínimo de 243 USD en enero (dudas sobre la IA y los aranceles), subida fuerte desde abril con el ciclo del iPhone 17, la aprobación de Apple Intelligence en China y la Siri nueva, y un récord el 13-oct (348 USD) tras superar los 5 billones de capitalización. La peor caída de cinco años fue del −33 % (diciembre de 2024 a abril de 2025, aranceles) [D1]. Beta de 1,08 (mensual, 5 años) frente al SPY.',
    contexto: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: cierres.map((c) => ({ anio: c.anio, precio_cierre: c.precio_cierre, ev_ebitda_ntm: null, per_ntm: null, excluir: false })),
    comentario: 'Cierre más cercano al final de cada ejercicio (último sábado de septiembre) de Yahoo [D1]. Apple cotizaba a 12-17 veces el beneficio en 2016-2019; la mezcla de Servicios y las recompras lo llevaron a 25-30 veces en 2021-2025 y hoy está en 36 veces el beneficio de FY2027e, el máximo de la serie. El cambio tiene una parte estructural (Servicios es ya el 26 % de las ventas y el 45 % del margen bruto) y otra de tipos y de prima de calidad en megacapitalizaciones, que no ha cambiado con el bono al 5,1 %.',
    confianza: 'Alta',
  },
  comparables: {
    criterio: `Plataformas tecnológicas de gran capitalización de EE. UU. (Microsoft, Alphabet, Meta, Amazon), que compiten con Apple por la relación con el usuario y por la IA, y fabricantes de hardware y componentes (Dell, HP, Logitech, Qualcomm). Fuera Samsung y Xiaomi: sus datos de Yahoo mezclan divisas en el valor empresa y Samsung está deformada por el ciclo de la memoria (PER de un dígito). Ninguno combina como Apple hardware de gama alta y servicios: por eso la mediana (${String(medPer).replace('.', ',')}x de PER) es una referencia baja. PER = precio ÷ BPA del próximo ejercicio fiscal de Yahoo [D2]. EV/EBITDA NTM estimado con el margen EBITDA actual y las ventas de consenso de los próximos 12 meses (no hay EBITDA de consenso en la fuente).`,
    empresas,
    comentario: null,
    confianza: 'Media',
  },
  transacciones: null,
  huecos: [
    { seccion: 'transacciones', campo: 'operaciones', tipo: 'Complemento', intentos: '1) Compras de Apple: ninguna de tamaño relevante (Beats, 3.000 M USD en 2014, sin múltiplo); 2) compras de fabricantes de dispositivos o plataformas comparables en 5-7 años: ninguna de una empresa parecida (las grandes de software, como Activision o VMware, no lo son); 3) bases de prensa: múltiplos sin fuente primaria', decision: 'Omitido' },
  ],
  fuentes: fD,
};
guarda('D', D);

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Stocktwits: flujo de mensajes de $AAPL (30 mensajes del 21-oct-2026)', editor: 'Stocktwits (API pública)', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://api.stocktwits.com/api/2/streams/symbol/AAPL.json' },
  { id: 2, titulo: 'Seeking Alpha: titulares y artículos de AAPL (12 al 21-oct-2026: «Apple\'s Stretched Valuation Is Getting Scary», «Apple: The Biggest AI Winner Isn\'t Building AI», «Apple Has A Consumer Problem Nobody Talks About»)', editor: 'Seeking Alpha (RSS)', tipo: 'Foros y redes', fecha: '2026-10-21', url: 'https://seekingalpha.com/api/sa/combined/AAPL.xml' },
  { id: 3, titulo: 'Apple is down 10%: should investors buy the dip?', editor: 'The Motley Fool', tipo: 'Foros y redes', fecha: '2026-08-04', url: 'https://www.fool.com/investing/2026/08/04/apple-is-down-10-should-investors-buy-the-dip/' },
  { id: 4, titulo: 'Apple shares sink as memory crunch clouds record quarter (comentarios de lectores)', editor: 'ChannelNews', tipo: 'Foros y redes', fecha: '2026-07-31', url: 'https://www.channelnews.com.au/apple-shares-sink-as-memory-crunch-clouds-record-quarter/' },
];
const E = {
  _estado: 'Completa con las fuentes que abren desde la nube (Reddit da 403).',
  sentimiento: {
    tono: 'Dividido', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Stocktwits', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Mucho operador de corto plazo; los que marcan sentimiento son más bajistas que alcistas (6 frente a 2) y repiten que «un PER de 40 con crecimiento de un dígito no se sostiene»; los alcistas hablan de Apple como «refugio» y de los pedidos del iPhone Duo [E1].' },
      { plataforma: 'Seeking Alpha (artículos)', fecha: '2026-10', n_comentarios: 30, tono: 'Dividido', resumen: 'Conviven tesis de «ganador de la IA sin construir IA» y de «6 billones en dos años» con avisos de valoración estirada y de un consumidor más débil [E2].' },
      { plataforma: 'The Motley Fool', fecha: '2026-08', n_comentarios: 10, tono: 'Positivo', resumen: 'Tras la caída del 31-jul se defendía comprar en la caída por el ciclo del iPhone 17 y Servicios [E3].' },
      { plataforma: 'ChannelNews (lectores)', fecha: '2026-07', n_comentarios: 8, tono: 'Negativo', resumen: 'Lectores escépticos con los precios del iPhone y con la memoria; dudas sobre la Siri nueva [E4].' },
    ],
    temas: [
      { tema: 'Valoración (PER de 36-40)', postura: 'Bajista', peso: 'Alto', contraste: 'Tienen razón en el dato: 36 veces el BPA de FY2027e del consenso, el máximo de diez años; el objetivo medio de los analistas (328 USD) está por debajo del precio.' },
      { tema: 'IA: Siri con Gemini', postura: 'Dividida', peso: 'Alto', contraste: 'Unos ven a Apple como distribuidor de la IA de otros (bueno para el margen); otros, como rezagada. El informe lo trata como riesgo mixto: motivo de renovación posible y dependencia de Google.' },
      { tema: 'Memoria y suministro', postura: 'Bajista', peso: 'Medio', contraste: 'Real: la guía del 4T26 se quedó corta por la memoria y el margen bruto baja del 50 % al 47-48 % según la propia guía de la empresa.' },
      { tema: 'Nuevos iPhone (Duo/plegable) y pedidos', postura: 'Alcista', peso: 'Medio', contraste: 'Los plazos de entrega hasta finales de enero se citan como prueba de demanda; puede ser también falta de memoria.' },
    ],
    lectura: 'El sentimiento de los particulares no es eufórico pese a los máximos: la discusión gira en torno a la valoración, y los que opinan con criterio coinciden con el informe en que el precio ya descuenta mucho. No anticipa un riesgo nuevo: la memoria, la IA y la valoración ya están en el análisis. Coincide con los analistas en una cosa: el objetivo medio (328 USD) está por debajo del precio. No cambia la recomendación.',
    confianza: 'Media',
  },
  huecos: [],
  fuentes: fE,
};
guarda('E', E);
console.log('Notas A-E escritas. Mediana PER comparables:', medPer, empresas.map((e) => `${e.ticker} ${e.per_ntm}`).join(', '));
