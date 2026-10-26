// Nota B (Sector y competencia) de Eni, corte 2026-10-26. Cita solo con [n] de su propia lista.
// Ejecutar: node informes/eni-2026-10-26/notas/nota-b.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const E8 = 'https://www.sec.gov/Archives/edgar/data/1002242';
const ED = 'https://www.eni.com/content/dam/enicom/documents';
const usd = 1.1221; // EUR/USD del 23-oct-2026 (Yahoo)
const nok = 10.468; // EUR/NOK del 23-oct-2026 (Yahoo)

const fB = [
  { id: 1, titulo: 'Eni: results for the third quarter and nine months of 2026 (escenario, guía, segmentos)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/press-release/migrated/2026-en/10/PR-2026-third-quarter-results.pdf` },
  { id: 2, titulo: 'Futuros del Brent (BZ=F 116,72 USD el 23-oct y 109,76 el 26-oct; BZZ27 86,74; BZZ28 78,79), TTF (93,85 EUR/MWh) y EUR/USD 1,122, 23-oct-2026', editor: 'Yahoo Finance / ICE / NYMEX', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://finance.yahoo.com/quote/BZ%3DF/' },
  { id: 3, titulo: 'Annual Report on Form 20-F 2025 (plan 2026-2030, Brent de 70 USD reales, riesgos, regulación)', editor: 'Eni S.p.A. / SEC EDGAR', tipo: 'Primaria', fecha: '2026-03-23', url: `${E8}/000155485526000390/e-20251231.htm` },
  { id: 4, titulo: 'Estadísticas de TotalEnergies, Shell, BP, Equinor, Repsol y OMV (ventas, margen operativo y EBITDA de los últimos doce meses, ROIC), 23-oct-2026', editor: 'Stock Analysis', tipo: 'Datos de mercado', fecha: '2026-10-23', url: 'https://stockanalysis.com/quote/epa/TTE/statistics/' },
  { id: 5, titulo: '3Q 2026 results: presentación (escenario de la guía 2026: Brent 70 → 83 → 85 → 95 USD; SERM 6 → 18 USD/b)', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/eng/investor/presentations/2026/2026-third-quarter-results/2026-third-quarter-results.pdf` },
  { id: 6, titulo: 'ENI 3Q 2026 Results: transcripción de la conferencia', editor: 'Eni S.p.A.', tipo: 'Primaria', fecha: '2026-10-23', url: `${ED}/eng/investor/presentations/2026/2026-third-quarter-results/2026-third-quarter-results-Transcript.pdf` },
];

const B = {
  _estado: 'Completo con huecos (tamaño de mercado en dinero no aplicable: Eni tiene menos del 2 % de un mercado mundial; geografías).',
  historia: {
    resumen: 'Eni nace en 1953 como Ente Nazionale Idrocarburi, el holding estatal de Enrico Mattei para dar a Italia petróleo y gas propios. Se transforma en sociedad anónima en 1992 y sale a bolsa en 1995; el Estado conserva el control a través del Ministerio de Economía y Cassa Depositi e Prestiti. Con Claudio Descalzi (consejero delegado desde 2014) pasa a un modelo de exploración propia, venta anticipada de participaciones en los descubrimientos («dual exploration model») y, desde 2021, a «satélites»: filiales con socios financieros (Plenitude, Enilive, Vår Energi, Azule, Searah) que se financian solas. En 2026 desconsolida Plenitude (control conjunto con Ares) [3, 1].',
    hitos: [
      { anio: '1953', hito: 'Fundación de Eni por Enrico Mattei.' },
      { anio: '1995', hito: 'Salida a bolsa en Milán y Nueva York.' },
      { anio: '2011', hito: 'Descubrimiento de Mamba/Coral en Mozambique.' },
      { anio: '2015', hito: 'Descubrimiento de Zohr en Egipto, el mayor campo de gas del Mediterráneo.' },
      { anio: '2021', hito: 'Creación de Plenitude (renovables y clientes) y fusión de activos en Noruega en Vår Energi.' },
      { anio: '2022', hito: 'Sustitución del gas ruso por Argelia, Egipto y GNL tras la invasión de Ucrania.' },
      { anio: '2024', hito: 'Compra de Neptune Energy; JV Azule (Angola).' },
      { anio: '2025', hito: 'KKR compra el 30 % de Enilive; EIP y Ares entran en Plenitude.' },
      { anio: '2026', hito: 'Cierre de Ormuz (Brent de casi 140 USD en marzo-abril); JV Searah con Petronas; contrato de Junín 5 en Venezuela; Plenitude pasa a control conjunto con Ares y sale de la consolidación (30-sep) [1, 6].' },
    ],
    confianza: 'Media',
  },
  negocio: {
    descripcion: 'Eni es una petrolera integrada italiana: busca y produce petróleo y gas (1,83 millones de barriles equivalentes al día en el 3T26), compra y vende gas y gas natural licuado (GNL) en Europa (35,3 bcm en 9M26), refina y vende carburantes y biocarburantes (Enilive) y, hasta septiembre de 2026, consolidaba la venta de electricidad y gas a 10,8 millones de clientes con renovables propias (Plenitude, ahora participada al 65 %). El grueso del beneficio sale de la producción: E&P aportó 12.757 de los 14.905 M de EBIT ajustado proforma de 9M26 [1].',
    como_gana_dinero: 'Gana sobre todo con el precio del crudo y del gas: cada dólar de Brent mueve unos 110 M de flujo de caja al año, cada dólar de margen de refino 80 M y cada euro por MWh de gas europeo 30 M [1]. Una parte importante de la producción va en contratos de reparto de producción, que recuperan los costes en barriles y amortiguan la caída del precio [3]. El coste de descubrimiento es inferior a 1 USD por barril y la exploración, de las más rentables del sector (1.230 M de barriles descubiertos en 2026) [6]; parte del valor se cobra vendiendo participaciones antes de producir (Baleine, Kutei). El gas (GGP) gana con el arbitraje de contratos y GNL; Enilive aporta un EBITDA más estable (guía de 1.400 M en 2026) [1].',
    clientes: 'Vende a mercados de materias primas (crudo y gas sin concentración de clientes relevante), a distribuidoras y, a través de Enilive, a 5.000 estaciones de servicio. No tiene poder de precios en petróleo y gas: es tomadora de precios; su ventaja está en el coste y en los contratos de gas a largo plazo con Argelia, Egipto, Catar, Mozambique y ahora Indonesia y Chipre (3,4 Mt/año de GNL firmados en 2026) [1, 6]. En septiembre-octubre de 2026 topó el precio del gasóleo y la gasolina en sus estaciones italianas y ofreció descuentos en Plenitude («Eni for Italy»): el Estado accionista pesa en la política comercial doméstica [1].',
  },
  sector: {
    definicion: 'Petróleo y gas integrado mundial: producción, GNL, refino y comercialización. Eni produce cerca del 1,7 % del crudo y gas mundial; el tamaño del mercado en dinero depende sobre todo del precio, así que la prueba de cuota no es útil [1, 3].',
    tamano: null, unidad_serie: null, serie: [], tcac_historico_pct: null, tcac_previsto_pct: null, cr5_pct: null, estructura: 'Fragmentada (la OPEP+ fija la oferta marginal)',
    drivers: [
      { driver: 'Precio del Brent', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'Media de 97 USD en el 3T26 (69,1 un año antes); 116,7 USD el 23-oct-2026 y 109,8 el 26-oct, pero el futuro de diciembre de 2028 cotiza a 78,8 USD [1, 2].' },
      { driver: 'Crecimiento de la producción propia', efecto: '+', horizonte: 'Estructural', evidencia: '+7 % subyacente en el 3T26; guía de 2026 subida al 6-7 % (3-4 % en marzo) y unos 600 kbep/d nuevos en 2030 de los proyectos aprobados este año [1, 6].' },
      { driver: 'Precio del gas europeo (TTF) y del GNL', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'TTF de 63 EUR/MWh en el 3T26 y 93,9 el 23-oct; la guía usa 55 EUR/MWh [1, 2, 5].' },
      { driver: 'Márgenes de refino', efecto: '+/−', horizonte: 'Cíclico', evidencia: 'SERM de 28,1 USD/b en el 3T26 frente a 8,9 un año antes y 6 USD/b en el presupuesto del plan [1, 5].' },
      { driver: 'Transición energética (renovables, biocarburantes)', efecto: '+/−', horizonte: 'Estructural', evidencia: 'Demanda de crudo con pico hacia 2030 según la mayoría de previsiones; Eni crece en biorrefino (0,5 Mt/año más a final de 2026) y renovables con socios [1, 3].' },
      { driver: 'Tipo de cambio EUR/USD', efecto: '−', horizonte: 'Cíclico', evidencia: 'Los ingresos van en dólares y las cuentas en euros: 1,151 USD/EUR en el 3T26 y 1,122 el 23-oct [2, 5].' },
    ],
    porter: [
      { fuerza: 'Rivalidad', intensidad: 3, justificacion: 'Producto homogéneo y precio fijado por el mercado; la rivalidad se da en el acceso a recursos y en el coste.' },
      { fuerza: 'Poder de los clientes', intensidad: 3, justificacion: 'Mercados líquidos sin clientes dominantes; en el minorista, competencia de precios (Plenitude perdió margen en el 3T26 por la competencia) [1].' },
      { fuerza: 'Poder de los proveedores', intensidad: 3, justificacion: 'Los Estados anfitriones fijan impuestos y repartos de producción (tipo ajustado de E&P del 35-45 %) [1].' },
      { fuerza: 'Amenaza de entrada', intensidad: 2, justificacion: 'Barreras de capital y conocimiento técnico muy altas.' },
      { fuerza: 'Amenaza de sustitutos', intensidad: 4, justificacion: 'Electrificación del transporte y renovables reducen la demanda de crudo y gas a largo plazo.' },
    ],
    ciclo: { posicion: 'Expansión', comentario: 'Pico por choque de oferta: el Brent pasó de 69 USD de media en el 3T25 a 97 en el 3T26 y a 116,7 el 23-oct-2026 con el estrecho de Ormuz aún afectado, y la curva de futuros sigue muy invertida (86,7 USD en diciembre de 2027 y 78,8 en diciembre de 2028) [1, 2]. En 2008-09, 2014-16 y 2020 el beneficio ajustado de Eni cayó a la mitad o a pérdidas en uno o dos años; tras el pico de 2022 (13.301 M) bajó a 4.989 M en 2025 [3].' },
    regulacion: 'Impuestos extraordinarios sobre beneficios energéticos en Italia y en la UE (contribución de solidaridad de 2022-2023), reglas de metano de la UE para importaciones desde 2027, comercio de derechos de emisión y mandatos de biocarburantes que favorecen a Enilive [3]. En septiembre de 2026 el Gobierno rebajó impuestos especiales de los carburantes y Eni acompañó con topes de precio en sus estaciones [1].',
    tendencias: 'El sector reparte más caja (recompras ligadas al precio) y separa negocios de transición con socios financieros, como hace Eni con Plenitude y Enilive. La IA se usa en exploración y en operaciones (Eni tiene el superordenador HPC6) y aumenta la demanda de gas para electricidad [3].',
    confianza: 'Media',
  },
  competencia: {
    cuota_pct: null,
    posicion: 'Sexta petrolera integrada occidental por capitalización; líder en exploración por descubrimientos en la última década y primer importador de gas de Italia [3, 4].',
    competidores: [
      { nombre: 'TotalEnergies', pais: 'Francia', ticker: 'TTE', ingresos: 171890, cuota_pct: null, margen_ebit_pct: 13.6, comentario: 'Integrada con más GNL y electricidad; mayor tamaño [4].' },
      { nombre: 'Shell', pais: 'Reino Unido', ticker: 'SHEL', ingresos: Math.round(296600 / usd), cuota_pct: null, margen_ebit_pct: 13.3, comentario: 'Mayor cartera de GNL del mundo [4].' },
      { nombre: 'BP', pais: 'Reino Unido', ticker: 'BP', ingresos: Math.round(215470 / usd), cuota_pct: null, margen_ebit_pct: 10.8, comentario: 'En reestructuración, más deuda [4].' },
      { nombre: 'Equinor', pais: 'Noruega', ticker: 'EQNR', ingresos: Math.round(1130000 / nok), cuota_pct: null, margen_ebit_pct: 28.6, comentario: 'Gas de Noruega para Europa; estatal; margen de productor casi puro [4].' },
      { nombre: 'Repsol', pais: 'España', ticker: 'REP', ingresos: 54360, cuota_pct: null, margen_ebit_pct: 11.2, comentario: 'Más refino; tamaño menor [4].' },
      { nombre: 'OMV', pais: 'Austria', ticker: 'OMV', ingresos: 25610, cuota_pct: null, margen_ebit_pct: 15.7, comentario: 'Producción, refino y química (Borouge Group International) [4].' },
    ],
    foso: { veredicto: 'Estrecho', tendencia: 'Estable', fuentes: [
      { fuente: 'Efectos de red', puntuacion: 0, evidencia: 'No aplica a una productora de materias primas.' },
      { fuente: 'Costes de cambio', puntuacion: 1, evidencia: 'Solo en contratos de gas a largo plazo.' },
      { fuente: 'Intangibles (marca, patentes, licencias)', puntuacion: 3, evidencia: 'Licencias de exploración y relaciones con Estados productores (Egipto, Argelia, Libia, Congo, Mozambique, ahora Venezuela) de décadas [6].' },
      { fuente: 'Ventaja en costes', puntuacion: 3, evidencia: 'Coste de descubrimiento por debajo de 1 USD/bep y éxito comercial del 70 % en 2026 [6].' },
      { fuente: 'Escala eficiente', puntuacion: 2, evidencia: 'Infraestructura de gas hacia Italia (gasoductos de Argelia y Libia).' },
    ] },
    confianza: 'Media',
  },
  esg: { calificaciones: [], confianza: 'Baja' },
  fuentes: fB,
};

fs.writeFileSync(path.join(dir, 'B.json'), JSON.stringify(B, null, 2) + '\n', 'utf8');
console.log('Nota B escrita');
