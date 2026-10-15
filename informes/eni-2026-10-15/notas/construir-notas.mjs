// Escribe las notas A-E de Eni (corte 2026-10-15) a partir del XBRL ESEF (cuentas-xbrl.json), el 20-F 2025, 2022 y 2020
// (SEC), el informe consolidado intermedio a 30-jun-2026 (6-K del 31-jul-2026), los avisos de recompra (6-K del 14-oct-2026),
// bolsa.mjs, MarketScreener, Stock Analysis y prensa. Cada nota cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-15/notas/construir-notas.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const guarda = (letra, obj) => fs.writeFileSync(path.join(dir, `${letra}.json`), JSON.stringify(obj, null, 2) + '\n', 'utf8');
const X = JSON.parse(fs.readFileSync(path.join(dir, 'cuentas-xbrl.json'), 'utf8'));
const BOLSA = JSON.parse(fs.readFileSync(path.join(dir, 'bolsa.json'), 'utf8'));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';
const ANIOS = ['2020', '2021', '2022', '2023', '2024', '2025'];

// Partidas excluidas del resultado operativo ajustado (efecto inventario + partidas identificadas: deterioros, provisiones,
// plusvalías, derivados). Positivo = gasto neto dentro del EBIT/EBITDA publicado. Resultado operativo ajustado − publicado.
// 20-F 2025 (2023-2025), 20-F 2022 (2020-2022). Los deterioros de Eni no van en amortizaciones: están dentro del EBITDA del XBRL.
const noRec = { 2020: 5173, 2021: -2677, 2022: 2876, 2023: 5548, 2024: 5110, 2025: 3334 };
const dpa = { 2020: 0.36, 2021: 0.86, 2022: 0.88, 2023: 0.94, 2024: 1.0, 2025: 1.05 };
const accDil = { 2020: 3572.5, 2021: 3573.6, 2022: 3490.0, 2023: 3327.1, 2024: 3230.4, 2025: 3088.1 };
const gFin = { 2023: 1141, 2024: 1499, 2025: 1374 }; // intereses de bancos y bonos + intereses de arrendamientos

// ---------------------------------------------------------------- A. Cuentas
const fA = [
  { id: 1, titulo: 'Annual Report on Form 20-F 2025 (cuentas consolidadas auditadas, resultados ajustados 2023-2025, BPA y acciones, bonos híbridos, accionistas)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 2, titulo: 'Informe financiero ESEF (XBRL) 2021-2025: cuenta, balance y flujos', editor: 'Eni S.p.A. / filings.xbrl.org', tipo: 'Primaria', fecha: '2026-03-23', url: 'https://filings.xbrl.org/' },
  { id: 3, titulo: 'Interim Consolidated Report as of June 30, 2026 (6-K): resultados del 1S26, deuda neta, perspectivas', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000110465926091832/tm2622039d1_6k.htm` },
  { id: 4, titulo: 'Annual Report on Form 20-F 2022 (resultados ajustados 2020-2022 y acciones medias)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2023-04-05', url: `${E8}/000155485523000224/e-20221231.htm` },
  { id: 5, titulo: 'Annual Report on Form 20-F 2020 (resultados ajustados 2018-2020 y acciones medias)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2021-04-02', url: `${E8}/000110465921046015/tm215953-3_20f.htm` },
  { id: 6, titulo: 'Eni: report on the purchase of treasury shares (5-9 October 2026), 6-K', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: `${E8}/000110465926115802/tm2627588d1_6k.htm` },
];
const cx = Object.fromEntries(X.financieros.cuenta.map((r) => [r.periodo, r]));
const bx = Object.fromEntries(X.balance.historico.map((r) => [r.periodo, r]));
const fx = Object.fromEntries(X.flujos.historico.map((r) => [r.periodo, r]));
const cuenta = ANIOS.map((y) => {
  const c = cx[y];
  return { periodo: y, ingresos: c.ingresos, coste_ventas: null, gastos_generales: null, ebitda: c.ebitda, amortizaciones: c.amortizaciones, ebit: c.ebit, resultado_financiero: c.resultado_financiero, bai: c.bai, impuestos: c.impuestos, minoritarios: c.minoritarios, beneficio_neto: c.beneficio_neto, gastos_financieros: gFin[y] ?? null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: noRec[y], bpa: c.bpa, dpa: dpa[y], dpa_extraordinario: 0, acciones_diluidas: accDil[y] };
});
const historico = ANIOS.map((y) => {
  const b = bx[y];
  return { periodo: y, activo_total: b.activo_total, activo_corriente: b.activo_corriente, pasivo_corriente: b.pasivo_corriente, pasivo_total: b.pasivo_total, fondo_comercio: null, intangibles: null, inmovilizado_material: b.inmovilizado_material, existencias: b.existencias, clientes: b.clientes, proveedores: b.proveedores, activos_contrato: null, pasivos_contrato: null, caja: b.caja, deuda_financiera: b.deuda_financiera, arrendamientos: b.arrendamientos, patrimonio_neto: b.patrimonio_neto, minoritarios: b.minoritarios, reservas: null };
});
const flujos = ANIOS.map((y) => {
  const f = fx[y];
  return { periodo: y, flujo_operativo: f.flujo_operativo, capex: f.capex, pagos_arrendamientos: f.pagos_arrendamientos ?? 0, adquisiciones: f.adquisiciones ?? 0, desinversiones: f.desinversiones ?? 0, dividendos: f.dividendos ?? 0, recompras: f.recompras ?? 0, emision_acciones: 0, intereses_en_financiacion: 0 };
});
const A = {
  _estado: 'Completo. Cuentas 2020-2025 del XBRL ESEF comprobadas con los 20-F 2025, 2022 y 2020; LTM a junio de 2026 con el informe intermedio (en base ajustada).',
  negocio: {
    segmentos: [
      { nombre: 'Exploración y Producción (E&P)', descripcion: 'Petróleo y gas en unos 40 países (Egipto, Libia, Argelia, Congo, Angola vía Azule, Noruega vía Vår Energi, Indonesia y Malasia vía Searah, Golfo de México, Costa de Marfil); 1,79 Mbep/d en el 1S26', tipo_resultado: 'EBIT ajustado proforma (incluye JV)', historico: [{ periodo: '1S25', ingresos: null, resultado: 5730 }, { periodo: '1S26', ingresos: null, resultado: 8126 }] },
      { nombre: 'Gas y GNL global (GGP) y Power', descripcion: 'Compra y venta de gas por gasoducto y GNL (24,65 bcm vendidos en el 1S26), centrales de ciclo combinado en Italia', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '1S25', ingresos: null, resultado: 860 }, { periodo: '1S26', ingresos: null, resultado: 830 }] },
      { nombre: 'Negocios de transición (Enilive y Plenitude)', descripcion: 'Enilive: biorrefino (2,1 Mt/año) y 5.000 estaciones de servicio (KKR 30 %). Plenitude: renovables (6,1 GW), venta de gas y luz a 10 M de clientes y puntos de recarga (EIP y Ares ≈10-11 %)', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '1S25', ingresos: null, resultado: 598 }, { periodo: '1S26', ingresos: null, resultado: 872 }] },
      { nombre: 'Refino, Química (Versalis) y plantas en transformación', descripcion: 'Refinerías en Italia, participación en ADNOC Refining y química de Versalis en reestructuración', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '1S25', ingresos: null, resultado: -527 }, { periodo: '1S26', ingresos: null, resultado: -300 }] },
      { nombre: 'Corporación y ajustes', descripcion: 'Servicios centrales y eliminaciones', tipo_resultado: 'EBIT ajustado proforma', historico: [{ periodo: '1S25', ingresos: null, resultado: -299 }, { periodo: '1S26', ingresos: null, resultado: -617 }] },
    ],
    geografias: [],
    geografias_criterio: null,
    kpis: [
      { kpi: 'Producción de hidrocarburos (Mbep/d)', valor_anterior: '1,66 (1S25)', valor_actual: '1,793 (1S26)', variacion: '+8 % (+11 % subyacente)', comentario: 'Arranques en Noruega, Congo, México y Angola y la JV Searah con Petronas [3].' },
      { kpi: 'Ventas de gas (bcm)', valor_anterior: '21,1 (1S25)', valor_actual: '24,65 (1S26)', variacion: '+17 %', comentario: 'Más volumen en Italia (+27 %) y en el Benelux y Alemania [3].' },
      { kpi: 'Capacidad renovable instalada (GW)', valor_anterior: '4,6 (jun-25)', valor_actual: '6,1 (jun-26)', variacion: '+1,5 GW', comentario: 'Casi todo Plenitude; objetivo de 6,5 GW a final de 2026 [3].' },
      { kpi: 'Resultado neto ajustado (M EUR)', valor_anterior: '2.546 (1S25)', valor_actual: '3.635 (1S26)', variacion: '+43 %', comentario: 'Brent +29 % y más volumen; 2.330 M en el 2T26 [3].' },
      { kpi: 'Endeudamiento proforma (gearing)', valor_anterior: '15 % (dic-25)', valor_actual: '10 % (jun-26)', variacion: '−5 pp', comentario: 'En el mínimo del rango objetivo del 10-15 % [3].' },
    ],
  },
  financieros: {
    cuenta,
    ltm: { periodo: 'LTM jun-26', fecha_fin: '2026-06-30', ingresos: 88455, ebitda: 17138, ebit: 9789, beneficio_neto: 6078, bpa: 1.96, dpa: 1.08, dpa_extraordinario: 0, fcf: null, participadas_en_ebitda: null, no_recurrentes_en_ebitda: null },
    cambios_perimetro: [{ periodo: '2026', descripcion: 'Searah (JV 50/50 con Petronas, desde el 2T26): los activos de Indonesia y Malasia salen de la consolidación y pasan a participadas, con una plusvalía de 2.086 M en el 1S26 [3].' }],
    confianza: 'Alta',
  },
  trimestres: {
    items: [
      { periodo: '1S25', ingresos: 35752, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.83, vs_consenso: null },
      { periodo: '2S25', ingresos: 46399, crecimiento_pct: null, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 0.81, vs_consenso: null },
      { periodo: '1S26', ingresos: 42056, crecimiento_pct: 17.6, crecimiento_organico_pct: null, ebitda: null, margen_ebitda_pct: null, bpa: 1.24, vs_consenso: 'Superior' },
    ],
    confianza: 'Media',
  },
  balance: { historico, vencimientos: [], liquidez: 'Liquidez de 20.122 M a 30-jun-2026 (caja 2.495, equivalentes 5.870 y otros activos financieros corrientes 11.757) [3].', rating: 'S&P A- (perspectiva negativa); Moody\'s A3 (estable); Fitch A- (estable) [3]', coste_deuda_pct: 3.8, vida_media_anios: null, confianza: 'Alta' },
  flujos: { historico: flujos, confianza: 'Alta' },
  calidad: { auditor: 'PricewaterhouseCoopers SpA', anios_auditor: 7, opinion: 'Favorable (también sobre el control interno, por la cotización en Nueva York)', confianza: 'Alta' },
  capital: {
    politica: null,
    adquisiciones: [
      { anio: '2024', objetivo: 'Neptune Energy (activos fuera de Noruega)', importe: null, ev_ebitda: null, financiacion: 'Caja', resultado: 'Integrada; Noruega pasó a Vår Energi [1].' },
      { anio: '2026', objetivo: 'Searah (JV con Petronas en Indonesia y Malasia)', importe: null, ev_ebitda: null, financiacion: 'Aportación de activos', resultado: 'Plusvalía contable de 2.086 M en el 1S26 [3].' },
    ],
    confianza: 'Media',
  },
  fuentes: fA,
};

// ---------------------------------------------------------------- B. Sector y competencia
const fB = [
  { id: 1, titulo: 'Interim Consolidated Report as of June 30, 2026 (6-K): riesgos, escenario del crudo y del gas', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000110465926091832/tm2622039d1_6k.htm` },
  { id: 2, titulo: 'Futuros de Brent (BZ=F, BZZ27, BZZ28) y EUR/USD', editor: 'Yahoo Finance / NYMEX', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/BZ%3DF/' },
  { id: 3, titulo: 'Annual Report on Form 20-F 2025 (plan 2026-2030, Brent de 70 USD, inversión de 29.000 M)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 4, titulo: 'Comparables de petroleras integradas (MarketScreener y Stock Analysis, 15-oct-2026), recogidos en los análisis paralelos de TotalEnergies y Galp', editor: 'MarketScreener / Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/' },
];
const B = {
  _estado: 'Completo con huecos (tamaño de mercado en millones no aplicable: Eni tiene menos del 2 % de un mercado mundial).',
  historia: {
    resumen: 'Eni nace en 1953 como Ente Nazionale Idrocarburi, el holding estatal de Enrico Mattei para dar a Italia petróleo y gas propios. Se transforma en sociedad anónima en 1992 y sale a bolsa en 1995; el Estado conserva el control a través del Ministerio de Economía y Cassa Depositi e Prestiti. Con Claudio Descalzi (consejero delegado desde 2014) pasa a un modelo de exploración propia, venta anticipada de participaciones en los descubrimientos («dual exploration model») y, desde 2021, a «satélites»: filiales con socios financieros (Plenitude, Enilive, Vår Energi, Azule, Searah) que se financian solas [3].',
    hitos: [
      { anio: '1953', hito: 'Fundación de Eni por Enrico Mattei.' },
      { anio: '1995', hito: 'Salida a bolsa en Milán y Nueva York.' },
      { anio: '2011', hito: 'Descubrimiento de Mamba/Coral en Mozambique.' },
      { anio: '2015', hito: 'Descubrimiento de Zohr en Egipto, el mayor campo de gas del Mediterráneo.' },
      { anio: '2021', hito: 'Creación de Plenitude (renovables y clientes) y fusión de activos en Noruega en Vår Energi.' },
      { anio: '2022', hito: 'Sustitución del gas ruso por Argelia, Egipto y GNL tras la invasión de Ucrania.' },
      { anio: '2024', hito: 'Compra de Neptune Energy; JV Azule (Angola) ya consolidada como participada.' },
      { anio: '2025', hito: 'KKR compra el 30 % de Enilive; EIP y Ares entran en Plenitude.' },
      { anio: '2026', hito: 'JV Searah con Petronas (Indonesia y Malasia); Brent de casi 140 USD con el cierre de Ormuz en marzo-abril [1].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Eni es una petrolera integrada italiana: busca y produce petróleo y gas (1,79 millones de barriles equivalentes al día en el 1S26), compra y vende gas y gas natural licuado (GNL) en Europa, refina y vende carburantes y biocarburantes (Enilive), y vende electricidad y gas a hogares y empresas con renovables propias (Plenitude). El grueso del beneficio sale de la producción (E&P: 8.126 de los 8.911 M de EBIT ajustado proforma del 1S26) [1].',
    como_gana_dinero: 'Gana sobre todo con el precio del crudo y del gas: cada dólar de Brent mueve unos 110 M de flujo de caja al año y cada dólar de margen de refino, 80 M [1]. Un 60 % de la producción va en contratos de reparto de producción (PSA), que recuperan los costes en barriles y amortiguan la caída del precio [1]. El coste es bajo y la exploración propia, de las más rentables del sector; parte del valor se cobra vendiendo participaciones de los descubrimientos antes de producir. El gas (GGP) gana con el arbitraje de contratos y GNL, y Plenitude y Enilive aportan un EBITDA más estable (1.300 M cada una en 2026) [1].',
    clientes: 'Vende a mercados de materias primas (crudo y gas sin concentración de clientes relevante), a distribuidoras y a 10 millones de clientes minoristas de Plenitude. No tiene poder de precios en petróleo y gas: es tomadora de precios; su ventaja está en el coste y en los contratos de gas a largo plazo con Argelia, Egipto, Catar y Mozambique [1, 3].',
  },
  sector: {
    definicion: 'Petróleo y gas integrado mundial: producción, GNL, refino y comercialización. Eni produce cerca del 1,7 % del crudo y gas mundial; el tamaño del mercado en dinero depende sobre todo del precio, así que la prueba de cuota no es útil [1, 3].',
    tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada (la OPEP+ fija la oferta marginal)',
    drivers: [
      { driver: 'Precio del Brent', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Media del 1S26 de 93 USD, con picos de casi 140 USD en marzo-abril por el cierre de Ormuz y caída del 50 % en mayo-junio; 106 USD el 15-oct-2026 y 78,3 USD en el futuro de diciembre de 2028 [1, 2].' },
      { driver: 'Crecimiento de la producción propia', efecto: '+', horizonte: 'Estructural', evidencia: '+11 % subyacente en el 1S26; guía de ≈5 % en 2026 y del 3-4 % anual en el plan [1, 3].' },
      { driver: 'Precio del gas europeo (TTF) y del GNL', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Guía con TTF de 50 EUR/MWh; nueva oferta de GNL de EE. UU. y Catar empuja el precio a la baja a medio plazo [1].' },
      { driver: 'Márgenes de refino', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'SERM de 14 USD/b en la guía de 2026 frente a 6 USD/b del presupuesto [1].' },
      { driver: 'Transición energética (renovables, biocarburantes)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Demanda de crudo con pico hacia 2030 según la mayoría de previsiones; Eni crece en biorrefino y renovables con socios [3].' },
      { driver: 'Tipo de cambio EUR/USD', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los ingresos van en dólares y las cuentas en euros: el euro a 1,12-1,16 resta resultado [1, 2].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Producto homogéneo y precio fijado por el mercado; la rivalidad se da en el acceso a recursos y en el coste.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Mercados líquidos sin clientes dominantes; en el minorista, competencia de precios.' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Los Estados anfitriones fijan impuestos y repartos de producción (tipo efectivo ajustado del 44-52 %) [3].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras de capital y conocimiento técnico muy altas.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Electrificación del transporte y renovables reducen la demanda de crudo y gas a largo plazo.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pico por choque de oferta: Brent de 106 USD el 15-oct-2026 tras el cierre de Ormuz, con la curva de futuros en fuerte descenso (85,6 USD en diciembre de 2027 y 78,3 USD en diciembre de 2028) [2]. En 2008-09, 2014-16 y 2020 el beneficio ajustado de Eni cayó a la mitad o a pérdidas en uno o dos años; tras el pico de 2022 (13.301 M) bajó a 4.989 M en 2025 [3].' },
    regulacion: 'Impuestos extraordinarios sobre beneficios energéticos en Italia y en la UE (contribución de solidaridad de 2022-2023), reglas de metano de la UE para importaciones desde 2027, comercio de derechos de emisión y mandatos de biocarburantes que favorecen a Enilive [3].',
    tendencias: 'El sector reparte más caja (recompras ligadas al precio) y separa negocios de transición con socios financieros, como hace Eni con Plenitude y Enilive. La IA se usa en exploración y en operaciones (Eni tiene el superordenador HPC6) y aumenta la demanda de gas para electricidad [3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Sexta petrolera integrada occidental por capitalización; líder en exploración por descubrimientos en la última década y primer importador de gas de Italia [3, 4].',
    competidores: [
      { nombre: 'TotalEnergies', pais: 'Francia', ticker: 'TTE', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Integrada con más GNL y electricidad; mayor tamaño [4].' },
      { nombre: 'Shell', pais: 'Reino Unido', ticker: 'SHEL', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Mayor cartera de GNL del mundo [4].' },
      { nombre: 'BP', pais: 'Reino Unido', ticker: 'BP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'En reestructuración, más deuda [4].' },
      { nombre: 'Equinor', pais: 'Noruega', ticker: 'EQNR', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Gas de Noruega para Europa; estatal [4].' },
      { nombre: 'Repsol', pais: 'España', ticker: 'REP', ingresos: null, cuota_pct: null, margen_ebit_pct: null, comentario: 'Más refino; tamaño menor [4].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a una productora de materias primas.' },
      { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Solo en contratos de gas a largo plazo y en clientes de Plenitude.' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias de exploración y relaciones con Estados productores (Egipto, Argelia, Libia, Congo, Mozambique) de décadas.' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Exploración propia de bajo coste y PSA que recuperan costes en barriles [1].' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Infraestructura de gas hacia Italia (gasoductos de Argelia y Libia).' },
    ] },
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
};

// ---------------------------------------------------------------- C. Equipo y gobierno
const fC = [
  { id: 1, titulo: 'Annual Report on Form 20-F 2025 (Item 6: consejo, directivos y acciones; Item 7: accionistas; poderes especiales del Estado)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 2, titulo: 'Il Consiglio conferma Claudio Descalzi Amministratore Delegato e nomina i Comitati consiliari', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-05-07', url: 'https://www.eni.com/it-IT/media/comunicati-stampa/2026/05/cs-cda-nomina-claudio-descalzi-ad-componenti-comitati-consiliari-2026.html' },
  { id: 3, titulo: 'Claudio Descalzi amministratore delegato Eni fino al 2029, via al quinto mandato', editor: 'QuiFinanza', tipo: 'Prensa', fecha: '2026-05-06', url: 'https://quifinanza.it/attualita/claudio-descalzi-amministratore-delegato-eni-quinto-mandato/992534/' },
  { id: 4, titulo: 'Interim Consolidated Report as of June 30, 2026 (recompras y guía)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000110465926091832/tm2622039d1_6k.htm` },
];
const C = {
  _estado: 'Parcial: sin remuneración del consejero delegado de 2025 ni votos de la junta 2026 (huecos).',
  directivos: {
    equipo: [
      { nombre: 'Claudio Descalzi', cargo: 'Consejero delegado y director general', desde: '2014', participacion_pct: 0.02, trayectoria: 'En Eni desde 1981, ingeniero de yacimientos; dirigió E&P antes de ser consejero delegado. Bajo su mando la exploración aportó descubrimientos como Zohr y Coral y la empresa creó los satélites con socios. Reelegido en 2026 para un quinto mandato hasta 2029 [1, 3].' },
      { nombre: 'Giuseppina Di Foggia', cargo: 'Presidenta', desde: '2026', participacion_pct: null, trayectoria: 'Antes consejera delegada de Terna (2023-2026); sustituye a Giuseppe Zafarana en la presidencia [3].' },
      { nombre: 'Francesco Gattei', cargo: 'Director financiero', desde: '2020', participacion_pct: null, trayectoria: 'Antes responsable de relaciones con inversores y de planificación de E&P [1].' },
    ],
    historial_guidance: [
      { anio: '2025', guia: 'Recompra de 1.500 M ampliada con el flujo de caja; producción +2-3 %', real: 'Recompra de 1.896 M; producción +3 % (20-F)', cumplida: 'Sí' },
      { anio: '2026', guia: 'Producción +3-4 %; recompra de 1.500 M con el presupuesto (Brent 65-70 USD)', real: 'En curso: guía de producción subida a ≈5 % y recompra a 3.400 M (julio) [4]', cumplida: 'Sí' },
    ],
    confianza: 'Media',
  },
  gobierno: {
    consejo: [
      { nombre: 'Giuseppina Di Foggia', cargo: 'Presidenta', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Claudio Descalzi', cargo: 'Consejero delegado', tipo: 'Ejecutivo', desde: '2014', comisiones: null },
      { nombre: 'Stefano Cappiello', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Benedetta Fiorini', cargo: 'Consejera', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Emma Marcegaglia', cargo: 'Consejera', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Cristina Sgubin', cargo: 'Consejera', tipo: 'Dominical', desde: '2023', comisiones: null },
      { nombre: 'Matteo Petrella', cargo: 'Consejero', tipo: 'Dominical', desde: '2026', comisiones: null },
      { nombre: 'Carolyn Adele Dittmeier', cargo: 'Consejera', tipo: 'Independiente', desde: '2023', comisiones: null },
      { nombre: 'Raphael Louis L. Vermeir', cargo: 'Consejero', tipo: 'Independiente', desde: '2023', comisiones: null },
    ],
    presidente_ceo_separados: true, presidente_ejecutivo: false, consejero_coordinador: false, una_accion_un_voto: 'limite_legal',
    operaciones_vinculadas_relevantes: false, variable_ligado_rentabilidad: true, auditoria_independiente: true, insiders_sin_operaciones: false,
    accionista_control: true, presidente_vinculado_control: true, cambios_cupula_24m: 1,
    voto_remuneracion_pct: null, voto_remuneracion_contra_pct: null, voto_remuneracion_contra_libre_pct: null, voto_cupula_pct: null,
    remuneracion_ceo: null,
    accionistas: [
      { nombre: 'Cassa Depositi e Prestiti (82,77 % del Ministerio de Economía)', pct: 30.92, tipo: 'Control (Estado)', variacion: 'Sube sin comprar por la amortización de autocartera' },
      { nombre: 'Ministerio de Economía y Finanzas', pct: 2.17, tipo: 'Control (Estado)', variacion: 'Estable' },
      { nombre: 'BlackRock', pct: 4.98, tipo: 'Institucional', variacion: null },
      { nombre: 'Romano Minozzi', pct: 3.22, tipo: 'Particular', variacion: null },
      { nombre: 'Autocartera', pct: 5.55, tipo: 'Autocartera', variacion: '2,87 % en marzo de 2026; 5,55 % el 9-oct-2026 por la recompra [1, 4]' },
    ],
    insiders: [],
    alertas: ['El Estado (MEF y CDP, ≈33 % del capital) nombra la mayoría del consejo, al presidente y al consejero delegado, y conserva poderes especiales («golden power») [1].', 'Casos judiciales cerrados por corrupción internacional (Nigeria OPL 245, absuelta en 2021; Argelia) y demanda climática de Greenpeace y ReCommon ante el tribunal de Roma (2023) [1].'],
    confianza: 'Media',
  },
  fuentes: fC,
};

// ---------------------------------------------------------------- D. Mercado y valoración
const fD = [
  { id: 1, titulo: 'Históricos diarios de ENI.MI, FTSE MIB y STOXX Europe 600 Oil & Gas (EXH1.DE)', editor: 'Yahoo Finance', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://finance.yahoo.com/quote/ENI.MI/history/' },
  { id: 2, titulo: 'Eni S.p.A.: previsiones financieras 2026-2028 y consenso de 22 analistas', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ENI-S-P-A-413403/finances/' },
  { id: 3, titulo: 'Eni S.p.A.: consenso de precio objetivo y cambios de recomendación', editor: 'MarketScreener', tipo: 'Analistas', fecha: '2026-10-15', url: 'https://www.marketscreener.com/quote/stock/ENI-S-P-A-413403/consensus/' },
  { id: 4, titulo: 'Rendimiento del Bund a 10 años (serie BBSIS, 15-oct-2026: 3,42 %)', editor: 'Deutsche Bundesbank', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://api.statistiken.bundesbank.de/rest/data/BBSIS/D.I.ZAR.ZI.EUR.S1311.B.A604.R10XX.R.A.A._Z._Z.A' },
  { id: 5, titulo: 'Implied ERP by month (ERPbymonth.xlsx), octubre de 2026: 4,20 %', editor: 'Aswath Damodaran (NYU Stern)', tipo: 'Datos de mercado', fecha: '2026-10-01', url: 'https://pages.stern.nyu.edu/~adamodar/pc/implprem/ERPbymonth.xlsx' },
  { id: 6, titulo: 'Comparables (TotalEnergies, Repsol, Equinor, OMV: MarketScreener; Shell, BP: Stock Analysis), 15-oct-2026, recogidos en los análisis de Galp y TotalEnergies del mismo día', editor: 'MarketScreener / Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-15', url: 'https://www.marketscreener.com/' },
  { id: 7, titulo: 'Eni: report on the purchase of treasury shares (5-9 October 2026), 6-K', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-10-14', url: `${E8}/000110465926115802/tm2627588d1_6k.htm` },
  { id: 8, titulo: 'Eni alza guidance dopo raddoppio dell\'utile nel 2° trimestre, valuta dividendo straordinario', editor: 'Teleborsa / Borsa Italiana', tipo: 'Prensa', fecha: '2026-07-29', url: 'https://www.borsaitaliana.it/borsa/notizie/teleborsa/finanza/eni-alza-guidance-dopo-raddoppio-dell-utile-nel-2-trimestre-valuta-dividendo-straordinario-19_2026-07-29_TLB.html?lang=it' },
  { id: 9, titulo: 'Azioni Eni verso i massimi: petrolio sopra 100$, dividendo e conti del 22 ottobre', editor: 'Rankia Italia', tipo: 'Prensa', fecha: '2026-10-10', url: 'https://rankia.it/azioni-eni-previsioni/' },
  { id: 10, titulo: 'Azioni Eni ed Enel, 5 ottobre: Brent a 99 dollari, ecco la soglia che decide la cedola extra', editor: 'Economia Italia', tipo: 'Prensa', fecha: '2026-10-05', url: 'https://finanza.economia-italia.com/azioni-eni-azioni-enel-5-ottobre-2026-previsioni-analisi' },
  { id: 11, titulo: 'Interim Consolidated Report as of June 30, 2026 (6-K): deuda neta, participadas, minoritarios, híbridos', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-07-31', url: `${E8}/000110465926091832/tm2622039d1_6k.htm` },
  { id: 12, titulo: 'La riapertura di Hormuz sostiene le borse, scende il petrolio', editor: 'Websim', tipo: 'Prensa', fecha: '2026-07', url: 'https://www.websim.it/notizie/borsa-oggi/europa/la-riapertura-di-hormuz-sostiene-le-borse-scende-il-petrolio/' },
  { id: 13, titulo: 'La guerra in Iran alza il prezzo delle bollette e le azioni di Eni (+23 % in un mese)', editor: "L'Indipendente", tipo: 'Prensa', fecha: '2026-04-03', url: 'https://www.lindipendente.online/2026/04/03/la-guerra-in-iran-alza-il-prezzo-delle-bollette-e-le-azioni-di-eni-23-in-un-mese/' },
];
const tc = 1.12;
const D = {
  _estado: 'Completo: precio, bolsa, consenso, comparables (reutilizados del mismo día), tasa libre y prima de mercado. Sin transacciones con múltiplo (hueco).',
  identificacion: {
    nombre: 'Eni S.p.A.', nombre_corto: 'Eni', ticker: 'ENI.MI', isin: 'IT0003132476', mercado: 'Euronext Milan (Borsa Italiana); ADR en NYSE (E)', indice_referencia: 'FTSE MIB',
    pais: 'Italia', pais_iso: 'IT', sector: 'Energía', industria: 'Petróleo, gas y combustibles integrados', sede: 'Roma', fundacion: '1953', empleados: 32168, web: 'https://www.eni.com',
    precio: BOLSA.identificacion.precio, fecha_precio: BOLSA.identificacion.fecha_precio, acciones: 2862.1, capitalizacion_publicada: null, free_float_pct: 61.3,
    max_52s: BOLSA.identificacion.max_52s, min_52s: BOLSA.identificacion.min_52s, volumen_medio_diario: `≈ ${BOLSA.volumen_3m.importe_dia_millones.toFixed(0)} M EUR/día (3 meses)`, proximos_resultados: '2026-10-22',
  },
  consenso: {
    guidance: 'Guía de julio de 2026 (con Brent de 85 USD, SERM de 14 USD/b, TTF de 50 EUR/MWh y 1,16 USD/EUR): flujo de caja operativo ajustado de 15.000 M; producción +≈5 % subyacente; EBIT proforma de GGP por encima de 1.400 M; EBITDA proforma de 1.300 M en Enilive y en Plenitude; inversión bruta de 7.000 M y neta por debajo de 5.000 M; gearing en el 10 %; recompra de 3.400 M en 2026 y dividendo de 1,10 EUR. Política: devolver el 60 % del flujo de caja por encima del presupuesto (11.500 M) hasta 90 USD y el 100 % por encima; dividendo extraordinario a decidir en octubre si el margen de refino sigue por encima de 9 USD/b [11].',
    estimaciones: [
      { periodo: '2026e', ingresos: 101202, ebitda: 20451, ebit: 13270, bpa: 3.005, dpa: 1.197, fuente: 'MarketScreener, 22 analistas [2]' },
      { periodo: '2027e', ingresos: 91485, ebitda: 19155, ebit: 11601, bpa: 2.588, dpa: 1.142, fuente: 'MarketScreener [2]' },
      { periodo: '2028e', ingresos: 84171, ebitda: 18461, ebit: 10855, bpa: 2.438, dpa: 1.188, fuente: 'MarketScreener [2]' },
    ],
    recomendaciones: { n_analistas: 22, comprar: null, mantener: null, vender: null, po_medio: 26.37, po_min: 19, po_max: 32 },
    revisiones: 'Una sola fuente con estimaciones completas (MarketScreener, 22 analistas; consenso «Outperform») [2, 3]. El BPA de 2026e de consenso (3,005 EUR) casi cuadruplica el de 2025 (0,78 NIIF; ≈1,57 ajustado) por el Brent de la crisis de Ormuz, y el de 2028e (2,438) sigue un 55 % por encima del ajustado de 2025: los analistas suponen una normalización lenta y más recompras. Octubre trae cambios mixtos: Jefferies y UBS reiteran Comprar; BNP Paribas baja a Neutral (7-oct) y AlphaValue a Vender (6-oct); RBC se queda en Neutral [3].',
    base_ebitda: 'NIIF', ajuste_ebitda_pct_ventas: null,
    confianza: 'Media',
  },
  bolsa: {
    ...BOLSA.bolsa,
    posicion_corta_pct: null,
    confianza: 'Alta',
  },
  multiplos_historicos: {
    serie: ANIOS.map((y) => ({ anio: y, precio_cierre: BOLSA.cierres_ejercicio.find((c) => c.anio === y)?.precio_cierre ?? null, ev_ebitda_ntm: null, per_ntm: null, excluir: y === '2020' })),
    confianza: 'Media',
  },
  comparables: {
    criterio: 'Petroleras integradas europeas con producción, GNL, refino y comercialización: TotalEnergies, Shell, BP, Equinor, Repsol y OMV. Cifras del mismo día (15-oct-2026) y de dos proveedores (MarketScreener para TotalEnergies, Repsol, Equinor y OMV; Stock Analysis para Shell y BP, convertidas a 1,12 USD/EUR), tomadas de los análisis de Galp y TotalEnergies hechos hoy [6]. Fuera ExxonMobil y Chevron (prima estructural de EE. UU.) y Galp (tamaño). El PER de los próximos doce meses es el ajustado y recoge el pico de 2026-2027.',
    empresas: [
      { nombre: 'TotalEnergies', ticker: 'TTE', pais: 'FR', capitalizacion: 172422, ev_ventas: 1.17, ev_ebitda_ltm: 5.3, ev_ebitda_ntm: 4.3, per_ntm: 8.1, crecimiento_pct: null, margen_ebitda_pct: 22.2, roic_pct: null, dn_ebitda: 0.5, fcf_yield_pct: 10.2 },
      { nombre: 'Shell', ticker: 'SHEL', pais: 'GB', capitalizacion: Math.round(295100 / tc), ev_ventas: 1.13, ev_ebitda_ltm: 5.84, ev_ebitda_ntm: null, per_ntm: 9.1, crecimiento_pct: null, margen_ebitda_pct: 19.4, roic_pct: 11.4, dn_ebitda: 0.73, fcf_yield_pct: 10.73 },
      { nombre: 'BP', ticker: 'BP', pais: 'GB', capitalizacion: Math.round(124520 / tc), ev_ventas: 0.83, ev_ebitda_ltm: 4.54, ev_ebitda_ntm: null, per_ntm: 7.57, crecimiento_pct: null, margen_ebitda_pct: 18.2, roic_pct: 8.4, dn_ebitda: 1.35, fcf_yield_pct: 12.93 },
      { nombre: 'Equinor', ticker: 'EQNR', pais: 'NO', capitalizacion: 99789, ev_ventas: 1.16, ev_ebitda_ltm: 3.3, ev_ebitda_ntm: 2.6, per_ntm: 9.8, crecimiento_pct: null, margen_ebitda_pct: 35.4, roic_pct: null, dn_ebitda: 0.3, fcf_yield_pct: 8.8 },
      { nombre: 'Repsol', ticker: 'REP', pais: 'ES', capitalizacion: 33240, ev_ventas: 0.68, ev_ebitda_ltm: 5.1, ev_ebitda_ntm: 4.1, per_ntm: 7.1, crecimiento_pct: null, margen_ebitda_pct: 13.4, roic_pct: null, dn_ebitda: 0.8, fcf_yield_pct: 11.8 },
      { nombre: 'OMV', ticker: 'OMV', pais: 'AT', capitalizacion: 25763, ev_ventas: 1.17, ev_ebitda_ltm: 4.1, ev_ebitda_ntm: 3.6, per_ntm: 8.4, crecimiento_pct: null, margen_ebitda_pct: 28.3, roic_pct: null, dn_ebitda: 0.5, fcf_yield_pct: 8.9 },
    ],
    confianza: 'Media',
  },
  transacciones: null,
  fuentes: fD,
};

// ---------------------------------------------------------------- E. Sentimiento
const fE = [
  { id: 1, titulo: 'Azioni Eni verso i massimi: petrolio sopra 100$, dividendo e conti del 22 ottobre possono spingere ancora il titolo?', editor: 'Rankia Italia', tipo: 'Foros y redes', fecha: '2026-10-10', url: 'https://rankia.it/azioni-eni-previsioni/' },
  { id: 2, titulo: 'Azioni Eni ed Enel, 5 ottobre: Brent a 99 dollari, ecco la soglia che decide la cedola extra', editor: 'Economia Italia', tipo: 'Foros y redes', fecha: '2026-10-05', url: 'https://finanza.economia-italia.com/azioni-eni-azioni-enel-5-ottobre-2026-previsioni-analisi' },
  { id: 3, titulo: 'Azioni ENI e non solo, cosa succede ora con la volatilità del petrolio', editor: 'Money.it', tipo: 'Foros y redes', fecha: '2026-07', url: 'https://www.money.it/azioni-eni-e-non-solo-cosa-succede-ora-con-la-volatilita-del-petrolio-gli-analisti-rispondono-a-moneyit' },
  { id: 4, titulo: 'Eni vola in Borsa dopo la trimestrale: titolo a +4,5% con utile raddoppiato', editor: 'QuiFinanza', tipo: 'Foros y redes', fecha: '2026-07-29', url: 'https://quifinanza.it/economia/finanza/eni-vola-borsa-trimestrale-utile-buyback-dividendo-2026/1010238/' },
];
const E = {
  _estado: 'Parcial: blogs y comentario financiero italiano de julio-octubre; sin foros con debate abierto accesible (Reddit y FinanzaOnline no abren).',
  sentimiento: {
    tono: 'Positivo', tendencia: 'Mejora',
    revisadas: [
      { plataforma: 'Rankia Italia (artículo de previsión)', fecha: '2026-10', n_comentarios: 0, tono: 'Positivo', resumen: 'Ve la acción cerca de máximos con el Brent por encima de 100 USD, la recompra ampliada y el posible dividendo extraordinario del 22-oct; avisa de que el recorrido hasta el objetivo medio de los analistas ya es pequeño y de que es una cíclica [1].' },
      { plataforma: 'Economia Italia (blog de mercado)', fecha: '2026-10', n_comentarios: 0, tono: 'Positivo', resumen: 'Centra la conversación en el umbral del Brent que decide el dividendo extraordinario y en el precio del crudo como motor de la acción [2].' },
      { plataforma: 'Money.it (análisis con preguntas de lectores)', fecha: '2026-07', n_comentarios: 0, tono: 'Dividido', resumen: 'Pregunta qué pasa con la volatilidad del crudo tras el pico de Ormuz; los analistas consultados dudan de que el precio aguante [3].' },
      { plataforma: 'QuiFinanza (crónica de resultados)', fecha: '2026-07', n_comentarios: 0, tono: 'Positivo', resumen: 'Celebra el beneficio duplicado del 2T26 y la recompra de 3.400 M [4].' },
    ],
    temas: [
      { tema: 'Dividendo extraordinario en octubre', postura: 'Alcista', peso: 'Alto', contraste: 'Es real pero pequeño: la propia política devuelve el 100 % del exceso de caja por encima de 90 USD; la prensa habla de 0,14-0,38 EUR por acción, un 0,5-1,5 % del precio. No cambia el valor [1, 2].' },
      { tema: 'Brent por encima de 100 USD', postura: 'Alcista', peso: 'Alto', contraste: 'La curva de futuros ya descuenta 78 USD a finales de 2028; el informe proyecta con ella [1].' },
      { tema: 'Recorrido agotado tras el +75 % en un año', postura: 'Dividida', peso: 'Medio', contraste: 'Coincide con el informe: a 25,77 EUR la acción queda solo un 2 % por debajo del objetivo medio de los analistas (26,37 EUR) [1].' },
    ],
  },
  fuentes: fE,
};

guarda('A', A);
guarda('B', B);
guarda('C', C);
guarda('D', D);
guarda('E', E);
console.log('Notas A-E escritas');
